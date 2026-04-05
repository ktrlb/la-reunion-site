import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { parseAdminSessionToken } from "@/lib/admin-session"
import { ADMIN_SESSION_COOKIE } from "@/lib/admin-session-constants"
import { isEmailAllowedAdmin } from "@/lib/admin-access"
import { AdminLoginForm } from "./login-form"

export default async function AdminLoginPage() {
  const token = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value
  if (token) {
    const session = await parseAdminSessionToken(token)
    if (session && isEmailAllowedAdmin(session.email)) {
      redirect("/admin")
    }
  }

  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-center text-xl font-semibold text-gray-900">Admin sign in</h1>
        <AdminLoginForm />
      </div>
    </div>
  )
}
