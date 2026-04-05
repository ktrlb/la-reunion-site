import { asc } from "drizzle-orm"
import { getDb } from "@/db"
import { cmsNavItems } from "@/db/schema"
import { requireAdmin } from "@/lib/require-admin"
import { NavRowForm } from "./nav-row-form"

export const dynamic = "force-dynamic"

export default async function AdminNavPage() {
  await requireAdmin()
  const db = getDb()
  const rows =
    db ?
      await db.select().from(cmsNavItems).orderBy(asc(cmsNavItems.sortOrder))
    : []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Navigation</h1>
        <p className="mt-1 text-gray-600">
          Labels support English and Spanish. Donate button stays separate on the public header.
        </p>
      </div>
      {rows.length === 0 ? (
        <p className="text-gray-500">
          No nav rows yet. Run{" "}
          <code className="rounded bg-gray-100 px-1">npm run db:seed</code>.
        </p>
      ) : (
        <div className="space-y-6">
          {rows.map((row) => (
            <NavRowForm key={row.id} row={row} />
          ))}
        </div>
      )}
    </div>
  )
}
