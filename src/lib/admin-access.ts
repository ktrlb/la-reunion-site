function parseCommaList(value: string | undefined): string[] {
  if (!value?.trim()) return []
  const stripped = value.trim().replace(/^\[/, "").replace(/\]$/, "").trim()
  return stripped
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
}

export function getSeededAdminEmails(): string[] {
  const keys = parseCommaList(process.env.ADMINS).map((k) => k.toUpperCase())
  const emails: string[] = []
  for (const key of keys) {
    const raw = process.env[`EMAIL_${key}`]
    const email = raw?.trim()
    if (email) emails.push(email.toLowerCase())
  }
  return emails
}

function getLegacyAdminEmails(): string[] {
  return parseCommaList(process.env.ADMIN_EMAILS).map((e) => e.toLowerCase())
}

export function getAllowedAdminEmails(): string[] {
  const fromSeeds = getSeededAdminEmails()
  const fromLegacy = getLegacyAdminEmails()
  return [...new Set([...fromLegacy, ...fromSeeds])]
}

export function isEmailAllowedAdmin(email: string | undefined): boolean {
  if (!email) return false
  const allowed = getAllowedAdminEmails()
  if (allowed.length === 0) return true
  return allowed.includes(email.toLowerCase())
}
