import { requireAdmin } from "@/lib/require-admin"

export const dynamic = "force-dynamic"

export default async function GoogleCalendarPlaceholderPage() {
  await requireAdmin()
  return (
    <div className="max-w-2xl space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Google Calendar</h1>
      <p className="text-gray-600">
        Optional integration with Google Calendar is not implemented in this phase. The plan uses Breeze
        ChMS as the primary calendar source for events. If you need Google Calendar alongside Breeze later,
        add OAuth and a separate sync worker.
      </p>
    </div>
  )
}
