"use client"

import Link from "next/link"
import type { BreezeRangePreset } from "@/lib/breeze/event-range"

export function BreezeEventRangeFilters({
  preset,
  customFrom,
  customTo,
}: {
  preset: BreezeRangePreset
  customFrom?: string
  customTo?: string
}) {
  const base = "/admin/breeze"

  function linkCls(active: boolean) {
    return `rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
      active ? "bg-red-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    }`
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-gray-50/80 p-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Date range</span>
        <Link href={`${base}?range=30`} className={linkCls(preset === "30")}>
          Next 30 days
        </Link>
        <Link href={`${base}?range=60`} className={linkCls(preset === "60")}>
          Next 60 days
        </Link>
        <Link href={`${base}?range=90`} className={linkCls(preset === "90")}>
          Next 90 days
        </Link>
      </div>
      <form method="get" action={base} className="flex flex-wrap items-end gap-3">
        <input type="hidden" name="range" value="custom" />
        <div>
          <label htmlFor="breeze-from" className="mb-1 block text-xs font-medium text-gray-600">
            From (UTC date)
          </label>
          <input
            id="breeze-from"
            name="from"
            type="date"
            defaultValue={customFrom ?? ""}
            className="rounded-md border border-gray-300 px-2 py-1.5 text-sm text-gray-900 shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="breeze-to" className="mb-1 block text-xs font-medium text-gray-600">
            To (UTC date)
          </label>
          <input
            id="breeze-to"
            name="to"
            type="date"
            defaultValue={customTo ?? ""}
            className="rounded-md border border-gray-300 px-2 py-1.5 text-sm text-gray-900 shadow-sm"
          />
        </div>
        <button
          type="submit"
          className={`rounded-md px-3 py-1.5 text-sm font-medium ${
            preset === "custom"
              ? "bg-indigo-900 text-white"
              : "border border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
          }`}
        >
          Apply custom range
        </button>
      </form>
      <p className="text-xs text-gray-500">
        Presets use UTC midnight boundaries. Custom range filters by event start time in the cache. Run{" "}
        <strong>Sync events</strong> after widening the Breeze sync window if you need older history.
      </p>
    </div>
  )
}
