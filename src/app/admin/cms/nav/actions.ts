"use server"

import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"
import { getDb } from "@/db"
import { cmsNavItems } from "@/db/schema"
import { requireAdmin } from "@/lib/require-admin"

export async function updateNavItemAction(
  _prev: unknown,
  formData: FormData
): Promise<{ ok?: boolean; error?: string }> {
  await requireAdmin()
  const db = getDb()
  if (!db) return { error: "No database." }

  const id = String(formData.get("id") ?? "")
  const labelEn = String(formData.get("labelEn") ?? "").trim()
  const labelEs = String(formData.get("labelEs") ?? "").trim()
  const href = String(formData.get("href") ?? "").trim()
  const visible = formData.get("visible") === "on"

  if (!id || !labelEn || !labelEs || !href) {
    return { error: "All fields required." }
  }

  await db
    .update(cmsNavItems)
    .set({ labelEn, labelEs, href, visible, updatedAt: new Date() })
    .where(eq(cmsNavItems.id, id))

  revalidatePath("/", "layout")
  return { ok: true }
}
