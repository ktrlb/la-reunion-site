import { config } from "dotenv"

config({ path: ".env.local" })

import { asc, eq, sql } from "drizzle-orm"
import { getDb } from "./index"
import { cmsNavItems, cmsPageConfigs } from "./schema"

const DEFAULT_HOME_SECTIONS = [
  { id: "s1", type: "hero", visible: true, order: 0 },
  { id: "s2", type: "servicesOverview", visible: true, order: 1 },
  { id: "s3", type: "cta", visible: true, order: 2 },
]

async function main() {
  const db = getDb()
  if (!db) {
    console.error("DATABASE_URL missing")
    process.exit(1)
  }

  const [navCount] = await db
    .select({ c: sql<number>`count(*)::int` })
    .from(cmsNavItems)

  if ((navCount?.c ?? 0) === 0) {
    await db.insert(cmsNavItems).values([
      { sortOrder: 0, href: "/", labelEn: "Home", labelEs: "Inicio", visible: true },
      { sortOrder: 1, href: "/about", labelEn: "About", labelEs: "Acerca de", visible: true },
      { sortOrder: 2, href: "/services", labelEn: "Services", labelEs: "Servicios", visible: true },
      { sortOrder: 3, href: "/volunteer", labelEn: "Volunteer", labelEs: "Voluntario", visible: true },
      { sortOrder: 4, href: "/contact", labelEn: "Contact", labelEs: "Contacto", visible: true },
    ])
    console.log("Seeded cms_nav_items")
  }

  const existing = await db
    .select()
    .from(cmsPageConfigs)
    .where(eq(cmsPageConfigs.routeKey, "/"))
    .limit(1)
  if (existing.length === 0) {
    await db.insert(cmsPageConfigs).values({
      routeKey: "/",
      sections: DEFAULT_HOME_SECTIONS,
    })
    console.log("Seeded cms_page_configs for /")
  }

  console.log("Done.")
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
