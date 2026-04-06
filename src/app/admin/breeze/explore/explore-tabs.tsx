import Link from "next/link"

type Tab = "events" | "people" | "volunteers"

export function ExploreTabs({ active, q }: { active: Tab; q: string }) {
  const qParam = q.trim() ? `&q=${encodeURIComponent(q.trim())}` : ""
  const base = `/admin/breeze/explore`
  const cls = (t: Tab) =>
    `rounded-md px-3 py-1.5 text-sm font-medium ${
      active === t ? "bg-red-600 text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }`

  return (
    <div className="flex flex-wrap gap-2">
      <Link href={`${base}?tab=events${qParam}`} className={cls("events")}>
        Events
      </Link>
      <Link href={`${base}?tab=people${qParam}`} className={cls("people")}>
        People
      </Link>
      <Link href={`${base}?tab=volunteers${qParam}`} className={cls("volunteers")}>
        Volunteer assignments
      </Link>
    </div>
  )
}
