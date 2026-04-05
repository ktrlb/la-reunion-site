import { eq } from "drizzle-orm"
import { getDb } from "@/db"
import { cmsPageConfigs } from "@/db/schema"
import { pageSectionsSchema } from "@/lib/cms/schemas"
import { requireAdmin } from "@/lib/require-admin"
import { SectionControls } from "./section-controls"

export const dynamic = "force-dynamic"

export default async function AdminHomeSectionsPage() {
  await requireAdmin()
  const db = getDb()
  let sections = null
  if (db) {
    const row = await db
      .select()
      .from(cmsPageConfigs)
      .where(eq(cmsPageConfigs.routeKey, "/"))
      .limit(1)
    if (row[0]) {
      const parsed = pageSectionsSchema.safeParse(row[0].sections)
      if (parsed.success) {
        sections = parsed.data.sort((a, b) => a.order - b.order)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Home page sections</h1>
        <p className="mt-1 text-gray-600">
          Control order and visibility for the homepage blocks (hero, services overview, CTA).
        </p>
      </div>
      {!sections || sections.length === 0 ? (
        <p className="text-gray-500">
          No config found. Run{" "}
          <code className="rounded bg-gray-100 px-1">npm run db:seed</code>.
        </p>
      ) : (
        <ul className="space-y-3">
          {sections.map((s, index) => (
            <li
              key={s.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white p-4"
            >
              <div>
                <p className="font-medium capitalize text-gray-900">
                  {s.type.replace(/([A-Z])/g, " $1").trim()}
                </p>
                <p className="text-xs text-gray-500">
                  Order {index + 1} · {s.visible ? "Visible" : "Hidden"}
                </p>
              </div>
              <SectionControls section={s} canUp={index > 0} canDown={index < sections!.length - 1} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
