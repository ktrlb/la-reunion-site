import { AdminAuthShell } from "@/components/admin/admin-auth-shell"

export const dynamic = "force-dynamic"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminAuthShell>{children}</AdminAuthShell>
}
