import Link from "next/link"

export function AdminAuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4 lg:px-8">
          <Link href="/admin" className="text-xl font-semibold text-gray-900">
            La Reunión Admin
          </Link>
          <nav className="flex flex-wrap gap-4 text-sm font-medium text-gray-600">
            <Link href="/admin/settings" className="hover:text-red-600">
              Settings
            </Link>
            <Link href="/admin/files" className="hover:text-red-600">
              Files
            </Link>
            <Link href="/admin/cms/nav" className="hover:text-red-600">
              Navigation
            </Link>
            <Link href="/admin/cms/pages" className="hover:text-red-600">
              Home sections
            </Link>
            <Link href="/admin/breeze" className="hover:text-red-600">
              Breeze
            </Link>
            <Link href="/admin/google-calendar" className="hover:text-red-600">
              Google (info)
            </Link>
            <Link href="/" className="hover:text-gray-900">
              View site
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-8 lg:px-8">{children}</main>
    </div>
  )
}
