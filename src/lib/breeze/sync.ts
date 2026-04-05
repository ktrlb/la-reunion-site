import { desc } from "drizzle-orm"
import { getDb } from "@/db"
import { breezeEvents, breezePeople } from "@/db/schema"

interface BreezeEventRow {
  id?: string
  name?: string
  start_datetime?: string
  end_datetime?: string
  location?: string
  details?: string
  [key: string]: unknown
}

function parseBreezeJson<T>(text: string): T[] {
  const trimmed = text.trim()
  const parsed = JSON.parse(trimmed) as unknown
  if (Array.isArray(parsed)) return parsed as T[]
  if (parsed && typeof parsed === "object") return Object.values(parsed) as T[]
  return []
}

export async function syncBreezeEventsFromApi(): Promise<{
  ok: boolean
  upserted?: number
  error?: string
}> {
  const subdomain = process.env.BREEZE_SUBDOMAIN
  const apiKey = process.env.BREEZE_API_KEY
  if (!subdomain || !apiKey) {
    return { ok: false, error: "Set BREEZE_SUBDOMAIN and BREEZE_API_KEY." }
  }

  const start = new Date()
  start.setMonth(start.getMonth() - 1)
  const end = new Date()
  end.setFullYear(end.getFullYear() + 1)

  const url = new URL(`https://${subdomain}.breezechms.com/api/events`)
  url.searchParams.set("start", start.toISOString().slice(0, 10))
  url.searchParams.set("end", end.toISOString().slice(0, 10))
  url.searchParams.set("api_key", apiKey)
  url.searchParams.set("details", "1")
  url.searchParams.set("limit", "500")

  const res = await fetch(url.toString(), { cache: "no-store" })
  const text = await res.text()
  if (!res.ok) {
    return { ok: false, error: `Breeze HTTP ${res.status}: ${text.slice(0, 200)}` }
  }

  let rows: BreezeEventRow[]
  try {
    rows = parseBreezeJson(text)
  } catch (e) {
    return {
      ok: false,
      error: `Invalid JSON from Breeze: ${e instanceof Error ? e.message : String(e)}`,
    }
  }

  const db = getDb()
  if (!db) return { ok: false, error: "DATABASE_URL not set." }

  let upserted = 0
  for (const ev of rows) {
    const breezeId = String(ev.id ?? "")
    if (!breezeId) continue
    const name = String(ev.name ?? "Event")
    const startUtc = ev.start_datetime
      ? new Date(ev.start_datetime.replace(" ", "T"))
      : null
    const endUtc =
      ev.end_datetime && ev.end_datetime !== "0000-00-00 00:00:00"
        ? new Date(ev.end_datetime.replace(" ", "T"))
        : null
    const locRaw = ev.location
    const location =
      typeof locRaw === "string"
        ? locRaw
        : locRaw && typeof locRaw === "object"
          ? String((locRaw as { name?: string }).name ?? "")
          : null
    const desc =
      typeof ev.details === "string"
        ? ev.details
        : typeof (ev as { description?: string }).description === "string"
          ? (ev as { description?: string }).description
          : null

    await db
      .insert(breezeEvents)
      .values({
        breezeId,
        name,
        startUtc,
        endUtc,
        location: location || null,
        description: desc,
        raw: ev as object,
        lastSyncedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: breezeEvents.breezeId,
        set: {
          name,
          startUtc,
          endUtc,
          location: location || null,
          description: desc,
          raw: ev as object,
          lastSyncedAt: new Date(),
        },
      })
    upserted += 1
  }

  return { ok: true, upserted }
}

interface BreezePersonRow {
  id?: string
  first_name?: string
  last_name?: string
  [key: string]: unknown
}

export async function syncBreezePeopleSample(): Promise<{
  ok: boolean
  upserted?: number
  error?: string
}> {
  const subdomain = process.env.BREEZE_SUBDOMAIN
  const apiKey = process.env.BREEZE_API_KEY
  if (!subdomain || !apiKey) {
    return { ok: false, error: "Set BREEZE_SUBDOMAIN and BREEZE_API_KEY." }
  }

  const url = new URL(`https://${subdomain}.breezechms.com/api/people`)
  url.searchParams.set("api_key", apiKey)
  url.searchParams.set("limit", "200")
  url.searchParams.set("details", "0")

  const res = await fetch(url.toString(), { cache: "no-store" })
  const text = await res.text()
  if (!res.ok) {
    return { ok: false, error: `Breeze HTTP ${res.status}: ${text.slice(0, 200)}` }
  }

  let rows: BreezePersonRow[]
  try {
    rows = parseBreezeJson(text) as BreezePersonRow[]
  } catch (e) {
    return {
      ok: false,
      error: `Invalid JSON: ${e instanceof Error ? e.message : String(e)}`,
    }
  }

  const db = getDb()
  if (!db) return { ok: false, error: "DATABASE_URL not set." }

  let upserted = 0
  for (const p of rows) {
    const breezeId = String(p.id ?? "")
    if (!breezeId) continue
    const firstName = p.first_name ?? null
    const lastName = p.last_name ?? null
    const email =
      typeof (p as { email?: string }).email === "string"
        ? (p as { email?: string }).email
        : null

    await db
      .insert(breezePeople)
      .values({
        breezeId,
        firstName,
        lastName,
        email,
        raw: p as object,
        lastSyncedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: breezePeople.breezeId,
        set: {
          firstName,
          lastName,
          email,
          raw: p as object,
          lastSyncedAt: new Date(),
        },
      })
    upserted += 1
  }

  return { ok: true, upserted }
}

export async function listCachedEvents(limit = 50) {
  const db = getDb()
  if (!db) return []
  return db
    .select()
    .from(breezeEvents)
    .orderBy(desc(breezeEvents.startUtc))
    .limit(limit)
}
