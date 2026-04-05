import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { isEmailAllowedAdmin } from "@/lib/admin-access"
import { parseAdminSessionToken } from "@/lib/admin-session"
import { ADMIN_SESSION_COOKIE } from "@/lib/admin-session-constants"

export interface AdminUser {
  email: string
}

export async function requireAdmin(): Promise<AdminUser> {
  const token = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value
  if (!token) redirect("/admin/login")

  const session = await parseAdminSessionToken(token)
  if (!session) redirect("/admin/login")

  if (!isEmailAllowedAdmin(session.email)) {
    redirect("/admin/login?error=unauthorized")
  }

  return { email: session.email }
}
