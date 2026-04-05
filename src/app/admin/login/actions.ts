"use server"

import { timingSafeEqual } from "node:crypto"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getAllowedAdminEmails, isEmailAllowedAdmin } from "@/lib/admin-access"
import { issueAdminSessionToken } from "@/lib/admin-session"
import { ADMIN_SESSION_COOKIE } from "@/lib/admin-session-constants"

function timingSafeEqualStrings(a: string, b: string): boolean {
  const ba = Buffer.from(a)
  const bb = Buffer.from(b)
  if (ba.length !== bb.length) return false
  return timingSafeEqual(ba, bb)
}

const INVALID_CREDENTIALS = "Invalid email or password."

export async function loginWithAdminCredentials(
  _prev: { error?: string } | null,
  formData: FormData,
): Promise<{ error?: string }> {
  const emailRaw = formData.get("email")
  const password = formData.get("password")
  if (typeof emailRaw !== "string" || !emailRaw.trim()) {
    return { error: "Email is required." }
  }
  if (typeof password !== "string") {
    return { error: "Password is required." }
  }

  const email = emailRaw.trim().toLowerCase()
  const expectedPw = process.env.ADMIN_PW_SAMPLE
  if (!expectedPw?.length) {
    return {
      error:
        "ADMIN_PW_SAMPLE is not set on the server. Add it to your environment to enable admin login.",
    }
  }

  const allowed = getAllowedAdminEmails()
  if (allowed.length === 0) {
    return {
      error:
        "No admin emails are configured. Set ADMIN_EMAILS or ADMINS / EMAIL_* in your environment.",
    }
  }

  if (!isEmailAllowedAdmin(email)) {
    return { error: INVALID_CREDENTIALS }
  }

  if (!timingSafeEqualStrings(password, expectedPw)) {
    return { error: INVALID_CREDENTIALS }
  }

  let token: string
  try {
    token = await issueAdminSessionToken(email)
  } catch {
    return {
      error:
        "Could not create a session. Ensure NEON_AUTH_COOKIE_SECRET is set.",
    }
  }

  const store = await cookies()
  store.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 90,
  })

  redirect("/admin")
}
