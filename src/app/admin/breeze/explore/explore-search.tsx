"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type Tab = "events" | "people" | "volunteers"

export function ExploreSearch({
  tab,
  initialQ,
}: {
  tab: Tab
  initialQ: string
}) {
  const router = useRouter()
  const [q, setQ] = useState(initialQ)

  useEffect(() => {
    setQ(initialQ)
  }, [initialQ])

  function apply(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    params.set("tab", tab)
    if (q.trim()) params.set("q", q.trim())
    router.push(`/admin/breeze/explore?${params.toString()}`)
  }

  return (
    <form onSubmit={apply} className="flex flex-wrap items-end gap-2">
      <div className="min-w-[200px] flex-1">
        <label htmlFor="explore-q" className="mb-1 block text-xs font-medium text-gray-600">
          Search (current tab)
        </label>
        <input
          id="explore-q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Filter rows…"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm"
        />
      </div>
      <button
        type="submit"
        className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
      >
        Search
      </button>
      <button
        type="button"
        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        onClick={() => {
          setQ("")
          router.push(`/admin/breeze/explore?tab=${tab}`)
        }}
      >
        Clear
      </button>
    </form>
  )
}
