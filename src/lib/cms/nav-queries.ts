import { asc } from "drizzle-orm"
import { cache } from "react"
import { getDb } from "@/db"
import { cmsNavItems } from "@/db/schema"

export interface NavItemRow {
  id: string
  href: string
  labelEn: string
  labelEs: string
  visible: boolean
  sortOrder: number
}

const FALLBACK: NavItemRow[] = [
  { id: "fb-home", href: "/", labelEn: "Home", labelEs: "Inicio", visible: true, sortOrder: 0 },
  { id: "fb-about", href: "/about", labelEn: "About", labelEs: "Acerca de", visible: true, sortOrder: 1 },
  { id: "fb-services", href: "/services", labelEn: "Services", labelEs: "Servicios", visible: true, sortOrder: 2 },
  { id: "fb-volunteer", href: "/volunteer", labelEn: "Volunteer", labelEs: "Voluntario", visible: true, sortOrder: 3 },
  { id: "fb-contact", href: "/contact", labelEn: "Contact", labelEs: "Contacto", visible: true, sortOrder: 4 },
]

async function loadNav(): Promise<NavItemRow[]> {
  const db = getDb()
  if (!db) return FALLBACK
  const rows = await db
    .select()
    .from(cmsNavItems)
    .orderBy(asc(cmsNavItems.sortOrder))
  if (rows.length === 0) return FALLBACK
  return rows.map((r) => ({
    id: r.id,
    href: r.href,
    labelEn: r.labelEn,
    labelEs: r.labelEs,
    visible: r.visible,
    sortOrder: r.sortOrder,
  }))
}

export const getNavItemsCached = cache(loadNav)

export async function getVisibleNavForLocale(locale: "en" | "es"): Promise<
  { href: string; label: string; key: string }[]
> {
  const items = await getNavItemsCached()
  return items
    .filter((i) => i.visible)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((i) => ({
      href: i.href,
      label: locale === "es" ? i.labelEs : i.labelEn,
      key: i.id,
    }))
}
