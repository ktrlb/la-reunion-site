"use client"

import { useActionState } from "react"
import type { InferSelectModel } from "drizzle-orm"
import { cmsNavItems } from "@/db/schema"
import { updateNavItemAction } from "./actions"

type Row = InferSelectModel<typeof cmsNavItems>

export function NavRowForm({ row }: { row: Row }) {
  const [state, action, pending] = useActionState(updateNavItemAction, {})

  return (
    <form
      action={action}
      className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
    >
      <input type="hidden" name="id" value={row.id} />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="text-xs font-medium text-gray-600">Href</label>
          <input
            name="href"
            defaultValue={row.href}
            className="mt-1 w-full rounded border border-gray-300 px-2 py-1.5 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-600">Label (EN)</label>
          <input
            name="labelEn"
            defaultValue={row.labelEn}
            className="mt-1 w-full rounded border border-gray-300 px-2 py-1.5 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-600">Label (ES)</label>
          <input
            name="labelEs"
            defaultValue={row.labelEs}
            className="mt-1 w-full rounded border border-gray-300 px-2 py-1.5 text-sm"
          />
        </div>
        <div className="flex items-end gap-2">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="visible" defaultChecked={row.visible} />
            Visible
          </label>
          <button
            type="submit"
            disabled={pending}
            className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
          >
            Save
          </button>
        </div>
      </div>
      {state?.error && <p className="mt-2 text-sm text-red-600">{state.error}</p>}
      {state?.ok && <p className="mt-2 text-sm text-green-600">Saved.</p>}
    </form>
  )
}
