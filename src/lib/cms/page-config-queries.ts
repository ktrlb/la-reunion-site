import { eq } from "drizzle-orm"
import { cache } from "react"
import { getDb } from "@/db"
import { cmsPageConfigs } from "@/db/schema"
import { pageSectionsSchema, type PageSection } from "@/lib/cms/schemas"

const HOME_DEFAULT: PageSection[] = [
  { id: "s1", type: "hero", visible: true, order: 0 },
  { id: "s2", type: "servicesOverview", visible: true, order: 1 },
  { id: "s3", type: "cta", visible: true, order: 2 },
]

export const getPageSectionsCached = cache(async (routeKey: string): Promise<PageSection[]> => {
  const db = getDb()
  if (!db) {
    return routeKey === "/" ? HOME_DEFAULT : []
  }
  const row = await db
    .select()
    .from(cmsPageConfigs)
    .where(eq(cmsPageConfigs.routeKey, routeKey))
    .limit(1)
  if (!row[0]) {
    return routeKey === "/" ? HOME_DEFAULT : []
  }
  const parsed = pageSectionsSchema.safeParse(row[0].sections)
  if (!parsed.success) {
    return routeKey === "/" ? HOME_DEFAULT : []
  }
  return parsed.data.sort((a, b) => a.order - b.order)
})
