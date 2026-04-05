import { sql } from "drizzle-orm"
import { getDb } from "@/db"
import { breezeEvents } from "@/db/schema"
import { listCachedEvents } from "@/lib/breeze/sync"
import { requireAdmin } from "@/lib/require-admin"
import { SyncForms } from "./sync-forms"

export const dynamic = "force-dynamic"

export default async function AdminBreezePage() {
  await requireAdmin()
  const db = getDb()
  const countRow =
    db ?
      await db.select({ c: sql<number>`count(*)::int` }).from(breezeEvents)
    : [{ c: 0 }]
  const count = countRow[0]?.c ?? 0

  const events = await listCachedEvents(40)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Breeze ChMS</h1>
        <p className="mt-1 text-gray-600">
          Sync calendar events and a sample of people from Breeze into Neon (read-only cache). Uses{" "}
          <code className="rounded bg-gray-100 px-1">BREEZE_SUBDOMAIN</code> and{" "}
          <code className="rounded bg-gray-100 px-1">BREEZE_API_KEY</code> server-side only.
        </p>
        <p className="mt-2 text-sm text-gray-500">Cached events in database: {count}</p>
      </div>

      <SyncForms />

      <section>
        <h2 className="text-lg font-semibold text-gray-900">Recent cached events</h2>
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
                    No events cached yet. Run sync above.
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
