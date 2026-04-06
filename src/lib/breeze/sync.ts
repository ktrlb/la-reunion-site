import { and, asc, desc, eq, gte, isNotNull, lte, sql } from "drizzle-orm"
import { getDb } from "@/db"
import type { Db } from "@/db"
import {
  breezeEvents,
  breezePeople,
  breezeVolunteerAssignments,
  breezeVolunteerRolesByEvent,
  breezeEventPersonLinks,
} from "@/db/schema"

interface BreezeEventRow {
  id?: string | number
  name?: string
  start_datetime?: string
  end_datetime?: string
  location?: string
  details?: string
  instance_id?: string | number
  event_id?: string | number
  [key: string]: unknown
}

/**
 * Breeze `/api/events` rows use `id` as the event *instance* id (volunteers + attendance use this).
 * Prefer `id` over `instance_id` on the raw payload so we never send `event_id` (series id) by mistake.
 */
function volunteerInstanceIdFromCachedEvent(breezeId: string, raw: unknown): string {
  const r = raw as Record<string, unknown> | null | undefined
  if (r && typeof r === "object") {
    const inst = r.id ?? r.instance_id
    if (inst !== undefined && inst !== null) {
      const s = String(inst).trim()
      if (s) return s
    }
  }
  return breezeId.trim()
}

/**
 * Breeze `volunteers/list` normally returns a JSON array. Some responses return a single object;
 * our generic parser used `Object.values()` on that object, producing strings/numbers instead of rows
 * (so `person_id` was never found and nothing was inserted).
 */
function parseVolunteersListResponse(text: string): Record<string, unknown>[] {
  const trimmed = text.trim()
  if (!trimmed) return []
  let parsed: unknown
  try {
    parsed = JSON.parse(trimmed)
  } catch {
    try {
      parsed = JSON.parse(`[${trimmed}]`)
    } catch {
      return []
    }
  }
  if (parsed === false || parsed === null) return []
  if (Array.isArray(parsed)) return parsed as Record<string, unknown>[]
  if (typeof parsed === "object" && parsed !== null) {
    const o = parsed as Record<string, unknown>
    if (Array.isArray(o.data)) return o.data as Record<string, unknown>[]
    if (Array.isArray(o.volunteers)) return o.volunteers as Record<string, unknown>[]
    if ("person_id" in o || "instance_id" in o) return [o]
    return Object.values(parsed) as Record<string, unknown>[]
  }
  return []
}

/** Parse Breeze datetime strings like `2025-09-06 03:07:32` or invalid `0000-00-00`. */
function optionalBreezeTimestamp(value: unknown): Date | null {
  if (typeof value !== "string" || !value.trim()) return null
  const s = value.trim()
  if (s.startsWith("0000-00-00")) return null
  const normalized = s.includes("T") ? s : s.replace(" ", "T")
  const d = new Date(normalized)
  return Number.isNaN(d.getTime()) ? null : d
}

function parseBreezeJson<T>(text: string): T[] {
  const trimmed = text.trim()
  if (!trimmed) return []
  let parsed: unknown
  try {
    parsed = JSON.parse(trimmed)
  } catch {
    // Breeze sometimes returns comma-separated objects without an array wrapper.
    try {
      parsed = JSON.parse(`[${trimmed}]`)
    } catch {
      return []
    }
  }
  if (parsed === false || parsed === null) return []
  if (Array.isArray(parsed)) return parsed as T[]
  if (typeof parsed === "object") return Object.values(parsed) as T[]
  return []
}

/** Breeze’s official clients send the key in this header (not only ?api_key=). */
function breezeHeaders(apiKey: string): HeadersInit {
  return { "Api-key": apiKey.trim() }
}

async function breezeFetch(url: URL, apiKey: string): Promise<Response> {
  const u = new URL(url.toString())
  if (!u.searchParams.has("api_key")) {
    u.searchParams.set("api_key", apiKey.trim())
  }
  return fetch(u.toString(), {
    cache: "no-store",
    headers: breezeHeaders(apiKey),
  })
}

interface BreezeCalendarRow {
  id: string
  name: string
}

async function fetchBreezeCalendars(
  subdomain: string,
  apiKey: string,
): Promise<BreezeCalendarRow[]> {
  const url = new URL(`https://${subdomain}.breezechms.com/api/events/calendars/list`)
  const res = await breezeFetch(url, apiKey)
  const text = await res.text()
  if (!res.ok) {
    throw new Error(`Breeze calendars HTTP ${res.status}: ${text.slice(0, 200)}`)
  }
  const parsed = JSON.parse(text.trim()) as unknown
  const arr = Array.isArray(parsed) ? parsed : []
  return arr
    .map((c: unknown) => {
      const o = c as { id?: string | number; name?: string }
      return {
        id: String(o.id ?? ""),
        name: String(o.name ?? ""),
      }
    })
    .filter((c) => c.id !== "")
}

/** Match Breeze calendar name (trimmed, case-insensitive). */
function findCalendarIdByName(
  calendars: BreezeCalendarRow[],
  target: string,
): string | null {
  const t = target.trim().toLowerCase()
  if (!t) return null
  const hit = calendars.find((c) => c.name.trim().toLowerCase() === t)
  return hit?.id ?? null
}

/** Default calendar for event sync when BREEZE_CALENDAR_NAME is unset. */
const DEFAULT_BREEZE_CALENDAR_NAME = "La Reunión"

export async function syncBreezeEventsFromApi(): Promise<{
  ok: boolean
  upserted?: number
  error?: string
}> {
  const subdomain = process.env.BREEZE_SUBDOMAIN?.trim()
  const apiKey = process.env.BREEZE_API_KEY?.trim()
  if (!subdomain || !apiKey) {
    return { ok: false, error: "Set BREEZE_SUBDOMAIN and BREEZE_API_KEY." }
  }

  const calendarName =
    process.env.BREEZE_CALENDAR_NAME?.trim() || DEFAULT_BREEZE_CALENDAR_NAME

  let calendars: BreezeCalendarRow[]
  try {
    calendars = await fetchBreezeCalendars(subdomain, apiKey)
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : String(e),
    }
  }

  const categoryId = findCalendarIdByName(calendars, calendarName)
  if (!categoryId) {
    const names = calendars.map((c) => c.name).filter(Boolean)
    return {
      ok: false,
      error: `No Breeze calendar named "${calendarName}". Available: ${names.length ? names.join(", ") : "(none returned)"}. Set BREEZE_CALENDAR_NAME to match exactly (or rename the calendar in Breeze).`,
    }
  }

  // Wide window so admin “custom range” filters can include history and future.
  const start = new Date()
  start.setUTCFullYear(start.getUTCFullYear() - 2)
  const end = new Date()
  end.setUTCFullYear(end.getUTCFullYear() + 2)

  const url = new URL(`https://${subdomain}.breezechms.com/api/events`)
  url.searchParams.set("start", start.toISOString().slice(0, 10))
  url.searchParams.set("end", end.toISOString().slice(0, 10))
  url.searchParams.set("category_id", categoryId)
  url.searchParams.set("details", "1")
  url.searchParams.set("limit", "500")

  const res = await breezeFetch(url, apiKey)
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

  // Replace cache so events from other calendars (e.g. Main) do not linger.
  await db.delete(breezeEvents)

  let upserted = 0
  for (const ev of rows) {
    const breezeId =
      ev.id !== undefined && ev.id !== null ? String(ev.id).trim() : ""
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

interface BreezeFolderRow {
  id?: string | number
  name?: string
}

interface BreezeTagRow {
  id?: string | number
  name?: string
  folder_id?: string | number
}

const DEFAULT_BREEZE_TAG_FOLDER_NAME = "La Reunión"

async function fetchBreezeFolders(
  subdomain: string,
  apiKey: string,
): Promise<BreezeFolderRow[]> {
  const url = new URL(`https://${subdomain}.breezechms.com/api/tags/list_folders`)
  const res = await breezeFetch(url, apiKey)
  const text = await res.text()
  if (!res.ok) {
    throw new Error(`Breeze list_folders HTTP ${res.status}: ${text.slice(0, 200)}`)
  }
  const parsed = JSON.parse(text.trim()) as unknown
  const arr = Array.isArray(parsed) ? parsed : []
  return arr as BreezeFolderRow[]
}

function findFolderIdByName(
  folders: BreezeFolderRow[],
  target: string,
): string | null {
  const t = target.trim().toLowerCase()
  for (const f of folders) {
    const name = String(f.name ?? "")
    const id = f.id
    if (id === undefined || id === null) continue
    if (name.trim().toLowerCase() === t) return String(id)
  }
  return null
}

async function fetchTagsInFolder(
  subdomain: string,
  apiKey: string,
  folderId: string,
): Promise<BreezeTagRow[]> {
  const url = new URL(`https://${subdomain}.breezechms.com/api/tags/list_tags`)
  url.searchParams.set("folder_id", folderId)
  const res = await breezeFetch(url, apiKey)
  const text = await res.text()
  if (!res.ok) {
    throw new Error(`Breeze list_tags HTTP ${res.status}: ${text.slice(0, 200)}`)
  }
  const parsed = JSON.parse(text.trim()) as unknown
  const arr = Array.isArray(parsed) ? parsed : []
  return arr as BreezeTagRow[]
}

/** Breeze expects `y_<tag_id>` for tag_contains (see API docs). */
async function fetchPeopleWithTag(
  subdomain: string,
  apiKey: string,
  tagId: string,
): Promise<BreezePersonRow[]> {
  const filter = { tag_contains: `y_${tagId}` }
  const pageSize = 500
  let offset = 0
  const merged: BreezePersonRow[] = []

  while (true) {
    const url = new URL(`https://${subdomain}.breezechms.com/api/people`)
    url.searchParams.set("filter_json", JSON.stringify(filter))
    url.searchParams.set("details", "1")
    url.searchParams.set("limit", String(pageSize))
    url.searchParams.set("offset", String(offset))

    const res = await breezeFetch(url, apiKey)
    const text = await res.text()
    if (!res.ok) {
      throw new Error(`Breeze people HTTP ${res.status}: ${text.slice(0, 200)}`)
    }

    let batch: BreezePersonRow[]
    try {
      batch = parseBreezeJson(text) as BreezePersonRow[]
    } catch (e) {
      throw new Error(
        `Invalid JSON from Breeze people: ${e instanceof Error ? e.message : String(e)}`,
      )
    }

    merged.push(...batch)
    if (batch.length < pageSize) break
    offset += pageSize
  }

  return merged
}

/**
 * Loads people who have any tag inside the configured tag folder (Breeze “tag group”).
 * Replaces the entire `breeze_people` cache so only this cohort remains.
 */
export async function syncBreezePeopleFromTagFolder(): Promise<{
  ok: boolean
  upserted?: number
  error?: string
}> {
  const subdomain = process.env.BREEZE_SUBDOMAIN?.trim()
  const apiKey = process.env.BREEZE_API_KEY?.trim()
  if (!subdomain || !apiKey) {
    return { ok: false, error: "Set BREEZE_SUBDOMAIN and BREEZE_API_KEY." }
  }

  const folderName =
    process.env.BREEZE_TAG_FOLDER_NAME?.trim() || DEFAULT_BREEZE_TAG_FOLDER_NAME

  let folders: BreezeFolderRow[]
  try {
    folders = await fetchBreezeFolders(subdomain, apiKey)
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : String(e),
    }
  }

  const folderId = findFolderIdByName(folders, folderName)
  if (!folderId) {
    const names = folders.map((f) => String(f.name ?? "")).filter(Boolean)
    return {
      ok: false,
      error: `No tag folder named "${folderName}". Available folders: ${names.length ? names.join(", ") : "(none)"}. Set BREEZE_TAG_FOLDER_NAME to match, or create the folder in Breeze.`,
    }
  }

  let tags: BreezeTagRow[]
  try {
    tags = await fetchTagsInFolder(subdomain, apiKey, folderId)
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : String(e),
    }
  }

  if (tags.length === 0) {
    return {
      ok: false,
      error: `Tag folder "${folderName}" has no tags inside it. Add tags in Breeze under that folder, or assign people to those tags.`,
    }
  }

  const byPersonId = new Map<string, BreezePersonRow>()
  for (const tag of tags) {
    const tagId = String(tag.id ?? "")
    if (!tagId) continue
    try {
      const rows = await fetchPeopleWithTag(subdomain, apiKey, tagId)
      for (const p of rows) {
        const pid = String(p.id ?? "")
        if (pid) byPersonId.set(pid, p)
      }
    } catch (e) {
      return {
        ok: false,
        error: `Tag "${String(tag.name ?? tagId)}": ${e instanceof Error ? e.message : String(e)}`,
      }
    }
  }

  const rows = [...byPersonId.values()]
  const db = getDb()
  if (!db) return { ok: false, error: "DATABASE_URL not set." }

  await db.delete(breezePeople)

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

    await db.insert(breezePeople).values({
      breezeId,
      firstName,
      lastName,
      email,
      raw: p as object,
      lastSyncedAt: new Date(),
    })
    upserted += 1
  }

  return { ok: true, upserted }
}

const EVENT_PERSON_LINK_INSERT_CHUNK = 200

/**
 * Rebuilds `breeze_event_person_links` from cached volunteer assignments: only pairs where the person
 * exists in `breeze_people` (tag-folder sync) and the event exists in `breeze_events`.
 */
export async function rebuildEventPersonLinksFromVolunteerCache(db: Db): Promise<number> {
  await db.delete(breezeEventPersonLinks)
  const pairs = await db
    .select({
      eventId: breezeEvents.id,
      personId: breezePeople.id,
    })
    .from(breezeVolunteerAssignments)
    .innerJoin(breezeEvents, eq(breezeEvents.breezeId, breezeVolunteerAssignments.instanceId))
    .innerJoin(breezePeople, eq(breezePeople.breezeId, breezeVolunteerAssignments.personBreezeId))

  for (let i = 0; i < pairs.length; i += EVENT_PERSON_LINK_INSERT_CHUNK) {
    const chunk = pairs.slice(i, i + EVENT_PERSON_LINK_INSERT_CHUNK)
    await db.insert(breezeEventPersonLinks).values(
      chunk.map((p) => ({
        eventId: p.eventId,
        personId: p.personId,
        role: "volunteer",
      })),
    )
  }
  return pairs.length
}

/**
 * Fetches volunteer roles + assignments per event instance from Breeze (list_roles + volunteers/list).
 * Replaces cached volunteer rows. Only processes cached events (by start time window + limit) to cap API calls.
 */
export async function syncBreezeVolunteerData(): Promise<{
  ok: boolean
  eventsProcessed?: number
  assignmentsWritten?: number
  linksWritten?: number
  error?: string
  /** Explains 0 events / 0 assignments when sync technically succeeded */
  notice?: string
}> {
  const subdomain = process.env.BREEZE_SUBDOMAIN?.trim()
  const apiKey = process.env.BREEZE_API_KEY?.trim()
  if (!subdomain || !apiKey) {
    return { ok: false, error: "Set BREEZE_SUBDOMAIN and BREEZE_API_KEY." }
  }

  const db = getDb()
  if (!db) return { ok: false, error: "DATABASE_URL not set." }

  const maxEv = Math.min(
    Math.max(1, Number(process.env.BREEZE_VOLUNTEER_SYNC_MAX_EVENTS ?? "200") || 200),
    500,
  )

  const daysBack = Math.min(
    3650,
    Math.max(1, Number(process.env.BREEZE_VOLUNTEER_SYNC_DAYS_BACK ?? "730") || 730),
  )
  const daysForward = Math.min(
    3650,
    Math.max(1, Number(process.env.BREEZE_VOLUNTEER_SYNC_DAYS_FORWARD ?? "730") || 730),
  )

  const startBound = new Date()
  startBound.setUTCDate(startBound.getUTCDate() - daysBack)
  const endBound = new Date()
  endBound.setUTCDate(endBound.getUTCDate() + daysForward)

  const datedInCacheRow = await db
    .select({ c: sql<number>`count(*)::int` })
    .from(breezeEvents)
    .where(isNotNull(breezeEvents.startUtc))
  const datedEventsInCache = datedInCacheRow[0]?.c ?? 0

  const evRows = await db
    .select({ breezeId: breezeEvents.breezeId, raw: breezeEvents.raw })
    .from(breezeEvents)
    .where(
      and(
        isNotNull(breezeEvents.startUtc),
        gte(breezeEvents.startUtc, startBound),
        lte(breezeEvents.startUtc, endBound),
      ),
    )
    .orderBy(asc(breezeEvents.startUtc))
    .limit(maxEv)

  try {
    await db.delete(breezeVolunteerAssignments)
    await db.delete(breezeVolunteerRolesByEvent)
  } catch (err) {
    const m = err instanceof Error ? err.message : String(err)
    if (/does not exist|42P01|relation/i.test(m)) {
      return {
        ok: false,
        error:
          "Volunteer cache tables are missing in the database. Run `npm run db:push` against this environment (and production), then try again.",
      }
    }
    throw err
  }

  let eventsProcessed = 0
  let assignmentsWritten = 0
  const httpErrors: string[] = []
  let insertError: string | undefined

  if (evRows.length === 0) {
    let notice: string
    if (datedEventsInCache === 0) {
      notice =
        "No calendar events with a start date in the cache. Run Sync events first, then sync volunteers again."
    } else {
      notice = `No events fall in the volunteer sync window (last ${daysBack} days → next ${daysForward} days), or all are past the max of ${maxEv} events. ${datedEventsInCache} dated event(s) exist in cache—raise BREEZE_VOLUNTEER_SYNC_MAX_EVENTS or widen BREEZE_VOLUNTEER_SYNC_DAYS_BACK / DAYS_FORWARD if needed.`
    }
    let linksWritten = 0
    try {
      linksWritten = await rebuildEventPersonLinksFromVolunteerCache(db)
    } catch (e) {
      const m = e instanceof Error ? e.message : String(e)
      notice = `${notice} Could not refresh event–person links: ${m}`
    }
    return { ok: true, eventsProcessed: 0, assignmentsWritten: 0, linksWritten, notice }
  }

  for (const ev of evRows) {
    const instanceId = volunteerInstanceIdFromCachedEvent(ev.breezeId, ev.raw)
    if (!instanceId) continue
    eventsProcessed += 1

    try {
      const rolesUrl = new URL(
        `https://${subdomain}.breezechms.com/api/volunteers/list_roles`,
      )
      rolesUrl.searchParams.set("instance_id", instanceId)
      rolesUrl.searchParams.set("show_quantity", "1")
      const rolesRes = await breezeFetch(rolesUrl, apiKey)
      const rolesText = await rolesRes.text()
      if (!rolesRes.ok) {
        if (httpErrors.length < 5) {
          httpErrors.push(
            `list_roles instance ${instanceId}: HTTP ${rolesRes.status} ${rolesText.slice(0, 120)}`,
          )
        }
      } else if (rolesText.trim()) {
        let rolesPayload: unknown
        try {
          rolesPayload = JSON.parse(rolesText.trim())
        } catch {
          rolesPayload = []
        }
        if (rolesPayload === false || rolesPayload === null) {
          rolesPayload = []
        }
        try {
          await db.insert(breezeVolunteerRolesByEvent).values({
            instanceId,
            roles: rolesPayload as object,
            lastSyncedAt: new Date(),
          })
        } catch (e) {
          if (!insertError)
            insertError =
              e instanceof Error ? e.message : `list_roles insert: ${String(e)}`
        }
      }
    } catch (e) {
      if (!insertError)
        insertError = e instanceof Error ? e.message : String(e)
    }

    try {
      const volUrl = new URL(`https://${subdomain}.breezechms.com/api/volunteers/list`)
      volUrl.searchParams.set("instance_id", instanceId)
      const volRes = await breezeFetch(volUrl, apiKey)
      const volText = await volRes.text()
      if (!volRes.ok) {
        if (httpErrors.length < 5) {
          httpErrors.push(
            `volunteers/list instance ${instanceId}: HTTP ${volRes.status} ${volText.slice(0, 120)}`,
          )
        }
        continue
      }
      const volRows = parseVolunteersListResponse(volText)
      for (const row of volRows) {
        const rawPid = (row as { person_id?: string | number }).person_id
        const pid = rawPid !== undefined && rawPid !== null ? String(rawPid).trim() : ""
        if (!pid) continue
        const roleIds = (row as { role_ids?: unknown }).role_ids ?? null
        const br = row as {
          id?: string | number
          oid?: string | number
          response?: string
          comment?: string
          rsvped_on?: string
          created_on?: string
        }
        try {
          await db.insert(breezeVolunteerAssignments).values({
            instanceId,
            personBreezeId: pid,
            breezeSignupId:
              br.id !== undefined && br.id !== null ? String(br.id).trim() : null,
            breezeOid:
              br.oid !== undefined && br.oid !== null ? String(br.oid).trim() : null,
            response: br.response ?? null,
            comment: br.comment ?? null,
            rsvpedOn: optionalBreezeTimestamp(br.rsvped_on),
            signupCreatedOn: optionalBreezeTimestamp(br.created_on),
            roleIds,
            raw: row as object,
            lastSyncedAt: new Date(),
          })
          assignmentsWritten += 1
        } catch (e) {
          if (!insertError)
            insertError = e instanceof Error ? e.message : String(e)
        }
      }
    } catch (e) {
      if (!insertError)
        insertError = e instanceof Error ? e.message : String(e)
    }
  }

  let notice: string | undefined
  if (eventsProcessed > 0 && assignmentsWritten === 0 && httpErrors.length === 0 && !insertError) {
    notice =
      "Breeze returned no volunteer signups for these events (normal if nobody is scheduled yet). Role definitions may still be cached per event."
  }
  if (httpErrors.length > 0) {
    const extra = ` First API error(s): ${httpErrors.join(" | ")}`
    notice = notice ? notice + extra : extra.trim()
  }
  if (insertError) {
    const extra = ` Database insert: ${insertError}`
    notice = notice ? notice + extra : extra.trim()
  }

  let linksWritten = 0
  try {
    linksWritten = await rebuildEventPersonLinksFromVolunteerCache(db)
    const volCountRow = await db
      .select({ c: sql<number>`count(*)::int` })
      .from(breezeVolunteerAssignments)
    const volRowsTotal = volCountRow[0]?.c ?? 0
    if (volRowsTotal > linksWritten) {
      const skipped = volRowsTotal - linksWritten
      const extra = ` ${skipped} assignment(s) have no row in breeze_event_person_links (person not in tag-folder people cache). Volunteer rows still exist in breeze_volunteer_assignments.`
      notice = notice ? notice + extra : extra.trim()
    }
  } catch (e) {
    const m = e instanceof Error ? e.message : String(e)
    const extra = ` Could not rebuild event–person links: ${m}`
    notice = notice ? notice + extra : extra.trim()
  }

  return { ok: true, eventsProcessed, assignmentsWritten, linksWritten, notice }
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

export async function listCachedEventsInRange(params: {
  startInclusive: Date
  endInclusive: Date
  limit?: number
}) {
  const db = getDb()
  if (!db) return []
  const { startInclusive, endInclusive, limit = 500 } = params
  return db
    .select()
    .from(breezeEvents)
    .where(
      and(
        isNotNull(breezeEvents.startUtc),
        gte(breezeEvents.startUtc, startInclusive),
        lte(breezeEvents.startUtc, endInclusive),
      ),
    )
    .orderBy(desc(breezeEvents.startUtc))
    .limit(limit)
}
