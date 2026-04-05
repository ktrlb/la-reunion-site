import { SignJWT, jwtVerify } from "jose"

function getJwtSecretKey(): Uint8Array {
  const secret = process.env.NEON_AUTH_COOKIE_SECRET
  if (!secret?.trim()) {
    throw new Error("NEON_AUTH_COOKIE_SECRET is required for admin sessions")
  }
  return new TextEncoder().encode(secret)
}

export async function issueAdminSessionToken(email: string): Promise<string> {
  const normalized = email.trim().toLowerCase()
  return new SignJWT({ role: "admin", email: normalized })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(normalized)
    .setIssuedAt()
    .setExpirationTime("90d")
    .sign(getJwtSecretKey())
}

export interface AdminSessionPayload {
  email: string
}

export async function parseAdminSessionToken(
  token: string,
): Promise<AdminSessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey())
    const email =
      typeof payload.email === "string"
        ? payload.email.toLowerCase()
        : typeof payload.sub === "string"
          ? payload.sub.toLowerCase()
          : null
    if (!email) return null
    return { email }
  } catch {
    return null
  }
}
