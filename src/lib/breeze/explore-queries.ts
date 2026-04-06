import { desc, eq, ilike, or, sql } from "drizzle-orm"
import { getDb } from "@/db"
import {
  breezeEvents,
  breezePeople,
  breezeVolunteerAssignments,
  breezeVolunteerRolesByEvent,
} from "@/db/schema"

function searchPattern(q: string): string {
  const safe = q.replace(/[%_\\]/g, "")
  return `%${safe}%`
}

export async function listExplorePeople(search: string | undefined, limit = 300) {
  const db = getDb()
  if (!db) return []
  const q = search?.trim()
  if (!q) {
    return db
      .select()
      .from(breezePeople)
      .orderBy(desc(breezePeople.lastSyncedAt))
      .limit(limit)
  }
  const p = searchPattern(q)
  return db
    .select()
    .from(breezePeople)
    .where(
      sql`(
        coalesce(${breezePeople.firstName}, '') ilike ${p}
        or coalesce(${breezePeople.lastName}, '') ilike ${p}
        or coalesce(${breezePeople.email}, '') ilike ${p}
        or ${breezePeople.breezeId} ilike ${p}
      )`,
    )
    .orderBy(desc(breezePeople.lastSyncedAt))
    .limit(limit)
}

export async function volunteerAssignmentCountsByInstance(): Promise<Map<string, number>> {
  const db = getDb()
  if (!db) return new Map()
  const rows = await db
    .select({
      instanceId: breezeVolunteerAssignments.instanceId,
      c: sql<number>`count(*)::int`,
    })
    .from(breezeVolunteerAssignments)
    .groupBy(breezeVolunteerAssignments.instanceId)
  return new Map(rows.map((r) => [r.instanceId, r.c]))
}

export async function listExploreAssignments(search: string | undefined, limit = 600) {
  const db = getDb()
  if (!db) return []
  const q = search?.trim()
  const base = db
    .select({
      assignmentId: breezeVolunteerAssignments.id,
      instanceId: breezeVolunteerAssignments.instanceId,
      personBreezeId: breezeVolunteerAssignments.personBreezeId,
      breezeSignupId: breezeVolunteerAssignments.breezeSignupId,
      response: breezeVolunteerAssignments.response,
      comment: breezeVolunteerAssignments.comment,
      signupCreatedOn: breezeVolunteerAssignments.signupCreatedOn,
      roleIds: breezeVolunteerAssignments.roleIds,
      raw: breezeVolunteerAssignments.raw,
      eventName: breezeEvents.name,
      eventStart: breezeEvents.startUtc,
      personFirst: breezePeople.firstName,
      personLast: breezePeople.lastName,
      personEmail: breezePeople.email,
    })
    .from(breezeVolunteerAssignments)
    .leftJoin(breezeEvents, eq(breezeEvents.breezeId, breezeVolunteerAssignments.instanceId))
    .leftJoin(breezePeople, eq(breezePeople.breezeId, breezeVolunteerAssignments.personBreezeId))
  if (!q) {
    return base.orderBy(desc(breezeEvents.startUtc)).limit(limit)
  }
  const p = searchPattern(q)
  return base
    .where(
      sql`(
        coalesce(${breezeEvents.name}, '') ilike ${p}
        or coalesce(${breezePeople.firstName}, '') ilike ${p}
        or coalesce(${breezePeople.lastName}, '') ilike ${p}
        or coalesce(${breezePeople.email}, '') ilike ${p}
        or ${breezeVolunteerAssignments.instanceId} ilike ${p}
        or ${breezeVolunteerAssignments.personBreezeId} ilike ${p}
        or coalesce(${breezeVolunteerAssignments.breezeSignupId}, '') ilike ${p}
      )`,
    )
    .orderBy(desc(breezeEvents.startUtc))
    .limit(limit)
}

/** Filter events by name / location / breeze id for explorer search. */
export async function listExploreEventsFiltered(search: string | undefined, limit = 400) {
  const db = getDb()
  if (!db) return []
  const q = search?.trim()
  if (!q) {
    return db
      .select()
      .from(breezeEvents)
      .orderBy(desc(breezeEvents.startUtc))
      .limit(limit)
  }
  const p = searchPattern(q)
  return db
    .select()
    .from(breezeEvents)
    .where(
      or(
        ilike(breezeEvents.name, p),
        ilike(breezeEvents.breezeId, p),
        ilike(breezeEvents.location, p),
      ),
    )
    .orderBy(desc(breezeEvents.startUtc))
    .limit(limit)
}

export async function listExploreEventsWithVolunteerMeta(
  search: string | undefined,
  limit = 400,
) {
  const db = getDb()
  if (!db) return []
  const events = await listExploreEventsFiltered(search, limit)
  const counts = await volunteerAssignmentCountsByInstance()
  const roleRows = await db.select().from(breezeVolunteerRolesByEvent)
  const roleMap = new Map(roleRows.map((r) => [r.instanceId, r.roles]))
  return events.map((e) => ({
    event: e,
    volunteerCount: counts.get(e.breezeId) ?? 0,
    roleDefinitions: roleMap.get(e.breezeId) ?? null,
  }))
}
