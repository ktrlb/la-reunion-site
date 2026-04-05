import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"
import { ADMIN_SESSION_COOKIE } from "@/lib/admin-session-constants"

function getSecretKey(): Uint8Array | null {
  const secret = process.env.NEON_AUTH_COOKIE_SECRET
  if (!secret?.trim()) return null
  return new TextEncoder().encode(secret)
}

export default async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin/login")) {
    return NextResponse.next()
  }

  const key = getSecretKey()
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value
  if (!key || !token) {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  try {
    await jwtVerify(token, key)
    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }
}

export const config = {
  matcher: ["/admin/:path*"],
}
