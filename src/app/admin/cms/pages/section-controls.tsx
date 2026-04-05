"use client"

import { moveSectionAction, toggleSectionVisibilityAction } from "./actions"
import type { PageSection } from "@/lib/cms/schemas"

export function SectionControls({
  section,
  canUp,
  canDown,
}: {
  section: PageSection
  canUp: boolean
  canDown: boolean
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <form action={toggleSectionVisibilityAction}>
        <input type="hidden" name="id" value={section.id} />
        <button
          type="submit"
          className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm hover:bg-gray-50"
        >
          {section.visible ? "Hide" : "Show"}
        </button>
      </form>
      <form action={moveSectionAction}>
        <input type="hidden" name="id" value={section.id} />
        <input type="hidden" name="direction" value="up" />
        <button
          type="submit"
          disabled={!canUp}
          className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm hover:bg-gray-50 disabled:opacity-40"
        >
          Up
        </button>
      </form>
      <form action={moveSectionAction}>
        <input type="hidden" name="id" value={section.id} />
        <input type="hidden" name="direction" value="down" />
        <button
          type="submit"
          disabled={!canDown}
          className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm hover:bg-gray-50 disabled:opacity-40"
        >
          Down
        </button>
      </form>
    </div>
  )
}
