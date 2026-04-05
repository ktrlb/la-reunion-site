"use server"

import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"
import { getDb } from "@/db"
import { cmsPageConfigs } from "@/db/schema"
import { pageSectionsSchema, type PageSection } from "@/lib/cms/schemas"
import { requireAdmin } from "@/lib/require-admin"

const HOME = "/"

async function loadSections(): Promise<PageSection[]> {
  const db = getDb()
  if (!db) return []
  const row = await db
    .select()
    .from(cmsPageConfigs)
    .where(eq(cmsPageConfigs.routeKey, HOME))
    .limit(1)
  if (!row[0]) return []
  const parsed = pageSectionsSchema.safeParse(row[0].sections)
  return parsed.success ? parsed.data.sort((a, b) => a.order - b.order) : []
}

async function saveSections(sections: PageSection[]) {
  const db = getDb()
  if (!db) return
  const normalized = [...sections].sort((a, b) => a.order - b.order).map((s, i) => ({
    ...s,
    order: i,
  }))
  await db
    .insert(cmsPageConfigs)
    .values({ routeKey: HOME, sections: normalized })
    .onConflictDoUpdate({
      target: cmsPageConfigs.routeKey,
      set: { sections: normalized, updatedAt: new Date() },
    })
}

export async function toggleSectionVisibilityAction(formData: FormData) {
  await requireAdmin()
  const id = String(formData.get("id") ?? "")
  if (!id) return
  const sections = await loadSections()
  const next = sections.map((s) =>
    s.id === id ? { ...s, visible: !s.visible } : s
  )
  await saveSections(next)
  revalidatePath("/")
}

export async function moveSectionAction(formData: FormData) {
  await requireAdmin()
  const id = String(formData.get("id") ?? "")
  const dir = String(formData.get("direction") ?? "")
  if (!id || (dir !== "up" && dir !== "down")) return

  const sections = [...(await loadSections())].sort((a, b) => a.order - b.order)
  const idx = sections.findIndex((s) => s.id === id)
  if (idx < 0) return
  const swapWith = dir === "up" ? idx - 1 : idx + 1
  if (swapWith < 0 || swapWith >= sections.length) return
  ;[sections[idx], sections[swapWith]] = [sections[swapWith], sections[idx]]
  sections.forEach((s, i) => {
    s.order = i
  })
  await saveSections(sections)
  revalidatePath("/")
}
