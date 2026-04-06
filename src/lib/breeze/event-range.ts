export type BreezeRangePreset = "30" | "60" | "90" | "custom"

export interface ResolvedBreezeEventRange {
  preset: BreezeRangePreset
  start: Date
  end: Date
  /** Human-readable description for the admin UI */
  summary: string
}

function parseYmd(s: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s.trim())
  if (!m) return null
  const y = Number(m[1])
  const mo = Number(m[2]) - 1
  const d = Number(m[3])
  const dt = new Date(Date.UTC(y, mo, d))
  if (Number.isNaN(dt.getTime())) return null
  return dt
}

function startOfUtcDay(d: Date): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0, 0))
}

function endOfUtcDay(d: Date): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 23, 59, 59, 999))
}

function addUtcDays(d: Date, n: number): Date {
  const x = new Date(d.getTime())
  x.setUTCDate(x.getUTCDate() + n)
  return x
}

/**
 * Resolves URL search params into a [start, end] UTC range for filtering cached events.
 * Default: today 00:00 UTC through today+30 days 23:59:59 UTC.
 */
export function resolveBreezeEventRange(sp: {
  range?: string
  from?: string
  to?: string
}): ResolvedBreezeEventRange {
  const now = new Date()

  if (sp.range === "custom" && sp.from && sp.to) {
    const fromD = parseYmd(sp.from)
    const toD = parseYmd(sp.to)
    if (fromD && toD && fromD.getTime() <= toD.getTime()) {
      return {
        preset: "custom",
        start: startOfUtcDay(fromD),
        end: endOfUtcDay(toD),
        summary: `${sp.from} → ${sp.to} (UTC dates)`,
      }
    }
  }

  const days =
    sp.range === "60" ? 60 : sp.range === "90" ? 90 : 30
  const preset: BreezeRangePreset =
    sp.range === "60" ? "60" : sp.range === "90" ? "90" : "30"

  const todayStart = startOfUtcDay(now)
  const start = todayStart
  const end = endOfUtcDay(addUtcDays(todayStart, days))

  return {
    preset,
    start,
    end,
    summary: `Next ${days} days (from today, UTC)`,
  }
}
