"use client"

import { useState } from "react"
import { syncEventsAction, syncPeopleAction } from "./actions"

export function SyncForms() {
  const [msg, setMsg] = useState<string | null>(null)
  const [pending, setPending] = useState<string | null>(null)

  async function runEvents() {
    setPending("events")
    setMsg(null)
    const r = await syncEventsAction()
    setPending(null)
    if (r.ok) setMsg(`Events synced: ${r.upserted ?? 0} rows.`)
    else setMsg(r.error ?? "Error")
  }

  async function runPeople() {
    setPending("people")
    setMsg(null)
    const r = await syncPeopleAction()
    setPending(null)
    if (r.ok) setMsg(`People synced: ${r.upserted ?? 0} rows.`)
    else setMsg(r.error ?? "Error")
  }

  return (
    <div className="flex flex-wrap gap-4">
      <button
        type="button"
        onClick={runEvents}
        disabled={pending !== null}
        className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
      >
        {pending === "events" ? "Syncing…" : "Sync events"}
      </button>
      <button
        type="button"
        onClick={runPeople}
        disabled={pending !== null}
        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
      >
        {pending === "people" ? "Syncing…" : "Sync people (sample)"}
      </button>
      {msg && <p className="w-full text-sm text-gray-700">{msg}</p>}
    </div>
  )
}
