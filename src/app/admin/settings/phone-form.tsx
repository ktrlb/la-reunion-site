"use client"

import { useActionState } from "react"
import { updateOrgPhoneAction } from "./actions"

export function PhoneSettingsForm({ initialPhone }: { initialPhone: string }) {
  const [state, formAction, pending] = useActionState(updateOrgPhoneAction, {})

  return (
    <form action={formAction} className="space-y-3">
      <input
        type="tel"
        name="phone"
        defaultValue={initialPhone}
        placeholder="(555) 555-5555"
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
      />
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state?.ok && <p className="text-sm text-green-600">Saved.</p>}
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
      >
        {pending ? "Saving…" : "Save phone"}
      </button>
    </form>
  )
}
