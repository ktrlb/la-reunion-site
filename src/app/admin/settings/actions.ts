"use server"

import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"
import { getDb } from "@/db"
import { siteSettings } from "@/db/schema"
import { requireAdmin } from "@/lib/require-admin"

const ORG_PHONE_KEY = "org_phone"

export async function updateOrgPhoneAction(
  _prev: { ok?: boolean; error?: string } | undefined,
  formData: FormData
): Promise<{ ok?: boolean; error?: string }> {
  await requireAdmin()
  const db = getDb()
  if (!db) return { error: "Database is not configured (DATABASE_URL)." }

  const phone = String(formData.get("phone") ?? "").trim()

  await db
    .insert(siteSettings)
    .values({ key: ORG_PHONE_KEY, value: phone || null })
    .onConflictDoUpdate({
      target: siteSettings.key,
      set: { value: phone || null, updatedAt: new Date() },
    })

  revalidatePath("/", "layout")
  revalidatePath("/contact")
  return { ok: true }
}
