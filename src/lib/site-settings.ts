import { cache } from "react"
import { eq } from "drizzle-orm"
import { getDb } from "@/db"
import { siteSettings } from "@/db/schema"
import { siteConfig } from "@/lib/site-config"

const ORG_PHONE_KEY = "org_phone"

export async function getOrgPhone(): Promise<string | null> {
  const db = getDb()
  if (!db) {
    return siteConfig.contact.phone || null
  }
  const row = await db
    .select()
    .from(siteSettings)
    .where(eq(siteSettings.key, ORG_PHONE_KEY))
    .limit(1)
  const v = row[0]?.value?.trim()
  if (v) return v
  return siteConfig.contact.phone || null
}

export const getOrgPhoneCached = cache(getOrgPhone)
