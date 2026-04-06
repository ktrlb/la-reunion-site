import { sql } from "drizzle-orm"
import { getDb } from "@/db"
import {
  breezeEvents,
  breezePeople,
  breezeVolunteerAssignments,
  breezeVolunteerRolesByEvent,
} from "@/db/schema"
import {
  listExploreAssignments,
  listExploreEventsWithVolunteerMeta,
  listExplorePeople,
} from "@/lib/breeze/explore-queries"
import { requireAdmin } from "@/lib/require-admin"
import { ExploreSearch } from "./explore-search"
import { ExploreTabs } from "./explore-tabs"
import { JsonDisclosure } from "./json-disclosure"

export const dynamic = "force-dynamic"

function tabFrom(s: string | undefined): "events" | "people" | "volunteers" {
  if (s === "people") return "people"
  if (s === "volunteers") return "volunteers"
  return "events"
}

export default async function AdminBreezeExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; q?: string }>
}) {
  await requireAdmin()
  const sp = await searchParams
  const tab = tabFrom(sp.tab)
  const q = sp.q ?? ""

  const db = getDb()
  const [peopleCount, eventCount, volCount, roleDefCount] = db ?
    await Promise.all([
      db.select({ c: sql<number>`count(*)::int` }).from(breezePeople),
      db.select({ c: sql<number>`count(*)::int` }).from(breezeEvents),
      db.select({ c: sql<number>`count(*)::int` }).from(breezeVolunteerAssignments),
      db.select({ c: sql<number>`count(*)::int` }).from(breezeVolunteerRolesByEvent),
    ])
  : [[{ c: 0 }], [{ c: 0 }], [{ c: 0 }], [{ c: 0 }]]

  const peopleTotal = peopleCount[0]?.c ?? 0
  const eventsTotal = eventCount[0]?.c ?? 0
  const volTotal = volCount[0]?.c ?? 0
  const roleDefTotal = roleDefCount[0]?.c ?? 0

  const peopleRows = tab === "people" ? await listExplorePeople(q || undefined) : []
  const eventRows = tab === "events" ? await listExploreEventsWithVolunteerMeta(q || undefined) : []
  const assignmentRows = tab === "volunteers" ? await listExploreAssignments(q || undefined) : []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Breeze data explorer</h1>
        <p className="mt-1 text-gray-600">
          Browse cached people, events, volunteer roles, and per-event volunteer signups. Run syncs on the main{" "}
          <a href="/admin/breeze" className="font-medium text-red-600 hover:text-red-700">
            Breeze
          </a>{" "}
          page to refresh data.
        </p>
        <dl className="mt-3 grid gap-2 text-sm text-gray-600 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="text-gray-500">People in cache</dt>
            <dd className="font-semibold text-gray-900">{peopleTotal}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Events in cache</dt>
            <dd className="font-semibold text-gray-900">{eventsTotal}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Volunteer assignments</dt>
            <dd className="font-semibold text-gray-900">{volTotal}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Events with role definitions</dt>
            <dd className="font-semibold text-gray-900">{roleDefTotal}</dd>
          </div>
        </dl>
      </div>

      <ExploreTabs active={tab} q={q} />

      <ExploreSearch tab={tab} initialQ={q} />

      {tab === "people" ? (
        <section>
          <h2 className="text-lg font-semibold text-gray-900">People</h2>
          <p className="mt-1 text-sm text-gray-600">
            From the La Reunión tag folder sync. Showing {peopleRows.length} row(s).
          </p>
          <div className="mt-4 overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left font-medium text-gray-700">Name</th>
                  <th className="px-3 py-2 text-left font-medium text-gray-700">Email</th>
                  <th className="px-3 py-2 text-left font-medium text-gray-700">Breeze person id</th>
                  <th className="px-3 py-2 text-left font-medium text-gray-700">Profile (raw)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {peopleRows.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                      No people match. Sync people or adjust search.
                    </td>
                  </tr>
                ) : (
                  peopleRows.map((p) => (
                    <tr key={p.id} className="align-top">
                      <td className="px-3 py-2">
                        {[p.firstName, p.lastName].filter(Boolean).join(" ") || "—"}
                      </td>
                      <td className="px-3 py-2 text-gray-700">{p.email ?? "—"}</td>
                      <td className="px-3 py-2 font-mono text-xs text-gray-600">{p.breezeId}</td>
                      <td className="max-w-md px-3 py-2">
                        <JsonDisclosure label="View JSON" value={p.raw} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {tab === "events" ? (
        <section>
          <h2 className="text-lg font-semibold text-gray-900">Events</h2>
          <p className="mt-1 text-sm text-gray-600">
            Calendar cache with volunteer counts from the last volunteer sync. Showing {eventRows.length} row(s).
          </p>
          <div className="mt-4 overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left font-medium text-gray-700">Name</th>
                  <th className="px-3 py-2 text-left font-medium text-gray-700">Start</th>
                  <th className="px-3 py-2 text-left font-medium text-gray-700">Location</th>
                  <th className="px-3 py-2 text-left font-medium text-gray-700">Instance id</th>
                  <th className="px-3 py-2 text-left font-medium text-gray-700">Volunteers</th>
                  <th className="px-3 py-2 text-left font-medium text-gray-700">Role slots</th>
                  <th className="px-3 py-2 text-left font-medium text-gray-700">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {eventRows.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                      No events match. Run event sync or adjust search.
                    </td>
                  </tr>
                ) : (
                  eventRows.map(({ event: e, volunteerCount, roleDefinitions }) => (
                    <tr key={e.id} className="align-top">
                      <td className="px-3 py-2 font-medium text-gray-900">{e.name}</td>
                      <td className="whitespace-nowrap px-3 py-2 text-gray-700">
                        {e.startUtc ? e.startUtc.toLocaleString() : "—"}
                      </td>
                      <td className="max-w-[180px] px-3 py-2 text-gray-700">{e.location ?? "—"}</td>
                      <td className="px-3 py-2 font-mono text-xs text-gray-600">{e.breezeId}</td>
                      <td className="px-3 py-2 text-gray-800">{volunteerCount}</td>
                      <td className="px-3 py-2 text-gray-700">
                        {Array.isArray(roleDefinitions) ? `${roleDefinitions.length} roles` : "—"}
                      </td>
                      <td className="max-w-md px-3 py-2">
                        <JsonDisclosure label="Event raw" value={e.raw} />
                        <JsonDisclosure label="Role definitions" value={roleDefinitions} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {tab === "volunteers" ? (
        <section>
          <h2 className="text-lg font-semibold text-gray-900">Volunteer assignments</h2>
          <p className="mt-1 text-sm text-gray-600">
            Stored in <code className="rounded bg-gray-100 px-1">breeze_volunteer_assignments</code> from Breeze{" "}
            <code className="rounded bg-gray-100 px-1">volunteers/list</code>, joined to cached events and people.
            Showing {assignmentRows.length} row(s).
          </p>
          <div className="mt-4 overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left font-medium text-gray-700">Event</th>
                  <th className="px-3 py-2 text-left font-medium text-gray-700">When</th>
                  <th className="px-3 py-2 text-left font-medium text-gray-700">Person</th>
                  <th className="px-3 py-2 text-left font-medium text-gray-700">Breeze signup id</th>
                  <th className="px-3 py-2 text-left font-medium text-gray-700">Role ids</th>
                  <th className="px-3 py-2 text-left font-medium text-gray-700">Created</th>
                  <th className="px-3 py-2 text-left font-medium text-gray-700">Raw row</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {assignmentRows.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                      No assignments in cache. Run <strong>Sync volunteers</strong> on the Breeze page.
                    </td>
                  </tr>
                ) : (
                  assignmentRows.map((r) => (
                    <tr key={r.assignmentId} className="align-top">
                      <td className="px-3 py-2 font-medium text-gray-900">{r.eventName ?? "—"}</td>
                      <td className="whitespace-nowrap px-3 py-2 text-gray-700">
                        {r.eventStart ? r.eventStart.toLocaleString() : "—"}
                      </td>
                      <td className="px-3 py-2 text-gray-800">
                        <div>
                          {[r.personFirst, r.personLast].filter(Boolean).join(" ") || "—"}
                        </div>
                        <div className="text-xs text-gray-500">{r.personEmail ?? ""}</div>
                        <div className="font-mono text-[11px] text-gray-500">{r.personBreezeId}</div>
                      </td>
                      <td className="px-3 py-2 font-mono text-[11px] text-gray-700">
                        {r.breezeSignupId ?? "—"}
                      </td>
                      <td className="px-3 py-2 font-mono text-xs text-gray-800">
                        {r.roleIds !== null && r.roleIds !== undefined
                          ? JSON.stringify(r.roleIds)
                          : "—"}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-gray-600">
                        {r.signupCreatedOn ? r.signupCreatedOn.toLocaleString() : "—"}
                      </td>
                      <td className="max-w-md px-3 py-2">
                        <JsonDisclosure label="Assignment JSON" value={r.raw} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}
    </div>
  )
}
