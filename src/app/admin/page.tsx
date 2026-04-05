import { redirect } from "next/navigation"
import Link from "next/link"
import { requireAdmin } from "@/lib/require-admin"
import { signOut } from "./actions"

export const dynamic = "force-dynamic"

export default async function AdminDashboardPage() {
  const user = await requireAdmin()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin dashboard</h1>
        <p className="mt-2 text-gray-600">Signed in as {user.email}</p>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2">
        <li className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="font-semibold text-gray-900">Site settings</h2>
          <p className="mt-1 text-sm text-gray-600">Organization phone</p>
          <Link
            href="/admin/settings"
            className="mt-3 inline-block text-sm font-medium text-red-600 hover:text-red-700"
          >
            Open →
          </Link>
        </li>
        <li className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="font-semibold text-gray-900">Files & PDFs</h2>
          <p className="mt-1 text-sm text-gray-600">Uploads, placements, library</p>
          <Link
            href="/admin/files"
            className="mt-3 inline-block text-sm font-medium text-red-600 hover:text-red-700"
          >
            Open →
          </Link>
        </li>
        <li className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="font-semibold text-gray-900">Navigation</h2>
          <p className="mt-1 text-sm text-gray-600">Labels and visibility</p>
          <Link
            href="/admin/cms/nav"
            className="mt-3 inline-block text-sm font-medium text-red-600 hover:text-red-700"
          >
            Open →
          </Link>
        </li>
        <li className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="font-semibold text-gray-900">Home page sections</h2>
          <p className="mt-1 text-sm text-gray-600">Order and visibility</p>
          <Link
            href="/admin/cms/pages"
            className="mt-3 inline-block text-sm font-medium text-red-600 hover:text-red-700"
          >
            Open →
          </Link>
        </li>
        <li className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="font-semibold text-gray-900">Breeze</h2>
          <p className="mt-1 text-sm text-gray-600">Events sync & cache</p>
          <Link
            href="/admin/breeze"
            className="mt-3 inline-block text-sm font-medium text-red-600 hover:text-red-700"
          >
            Open →
          </Link>
        </li>
        <li className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="font-semibold text-gray-900">Google Calendar</h2>
          <p className="mt-1 text-sm text-gray-600">Optional — not wired yet</p>
          <Link
            href="/admin/google-calendar"
            className="mt-3 inline-block text-sm font-medium text-red-600 hover:text-red-700"
          >
            Open →
          </Link>
        </li>
      </ul>

      <form action={signOut}>
        <button type="submit" className="text-sm font-medium text-gray-600 hover:text-gray-900">
          Sign out
        </button>
      </form>
    </div>
  )
}
