import { sql } from "drizzle-orm"
import { getDb } from "@/db"
import { breezeEvents } from "@/db/schema"
import { resolveBreezeEventRange } from "@/lib/breeze/event-range"
import { listCachedEventsInRange } from "@/lib/breeze/sync"
import { requireAdmin } from "@/lib/require-admin"
import { BreezeEventRangeFilters } from "./event-range-filters"
import { SyncForms } from "./sync-forms"

export const dynamic = "force-dynamic"

export default async function AdminBreezePage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string; from?: string; to?: string }>
}) {
  await requireAdmin()
  const sp = await searchParams
  const resolved = resolveBreezeEventRange(sp)

  const db = getDb()
  const countRow =
    db ?
      await db.select({ c: sql<number>`count(*)::int` }).from(breezeEvents)
    : [{ c: 0 }]
  const count = countRow[0]?.c ?? 0

  const events = await listCachedEventsInRange({
    startInclusive: resolved.start,
    endInclusive: resolved.end,
    limit: 500,
  })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Breeze ChMS</h1>
        <p className="mt-1 text-gray-600">
          Sync calendar events and a sample of people from Breeze into Neon (read-only cache). Uses{" "}
          <code className="rounded bg-gray-100 px-1">BREEZE_SUBDOMAIN</code>,{" "}
          <code className="rounded bg-gray-100 px-1">BREEZE_API_KEY</code>, and{" "}
          <code className="rounded bg-gray-100 px-1">BREEZE_CALENDAR_NAME</code> (defaults to{" "}
          <span className="whitespace-nowrap">La Reunión</span>) for events, and{" "}
          <code className="rounded bg-gray-100 px-1">BREEZE_TAG_FOLDER_NAME</code> (defaults to the same) so
          people sync only includes profiles with any tag in that Breeze tag folder.
        </p>
        <p className="mt-2 text-sm text-gray-500">Cached events in database: {count}</p>
        <p className="mt-2 text-sm">
          <a
            href="/admin/breeze/explore"
            className="font-medium text-red-600 hover:text-red-700"
          >
            Open data explorer
          </a>{" "}
          — search people, events, volunteer roles, and signups from the cache.
        </p>
      </div>

      <SyncForms />

      <BreezeEventRangeFilters
        preset={resolved.preset}
        customFrom={sp.from}
        customTo={sp.to}
      />

      <section>
        <h2 className="text-lg font-semibold text-gray-900">Cached events</h2>
        <p className="mt-1 text-sm text-gray-600">
          {resolved.summary} · showing {events.length} event{events.length === 1 ? "" : "s"}
        </p>
        <div className="mt-4 overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-700">Name</th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">Start</th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {events.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 py-6 text-center text-gray-500">
                    No events in this range. Try another filter or run <strong>Sync events</strong>.
                  </td>
                </tr>
              ) : (
                events.map((e) => (
                  <tr key={e.id}>
                    <td className="px-4 py-2">{e.name}</td>
                    <td className="px-4 py-2 text-gray-600">
                      {e.startUtc ? e.startUtc.toLocaleString() : "—"}
                    </td>
                    <td className="px-4 py-2 text-gray-600">{e.location ?? "—"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
