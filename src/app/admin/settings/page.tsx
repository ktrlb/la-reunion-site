import { eq } from "drizzle-orm"
import { getDb } from "@/db"
import { siteSettings } from "@/db/schema"
import { requireAdmin } from "@/lib/require-admin"
import { PhoneSettingsForm } from "./phone-form"

const ORG_PHONE_KEY = "org_phone"

export const dynamic = "force-dynamic"

export default async function AdminSettingsPage() {
  await requireAdmin()
  const db = getDb()
  let phone = ""
  if (db) {
    const row = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.key, ORG_PHONE_KEY))
      .limit(1)
    phone = row[0]?.value ?? ""
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Site settings</h1>
        <p className="mt-1 text-gray-600">Organization phone and other global values.</p>
      </div>
      <section className="max-w-lg rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Organization phone</h2>
        <p className="mt-1 text-sm text-gray-500">
          Shown in the footer and contact areas when set. Format: (555) 123-4567
        </p>
        <div className="mt-4">
          <PhoneSettingsForm initialPhone={phone} />
        </div>
      </section>
    </div>
  )
}
