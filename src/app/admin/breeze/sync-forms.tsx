"use client"

import { useState } from "react"
import { syncEventsAction, syncPeopleAction, syncVolunteersAction } from "./actions"

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

  async function runVolunteers() {
    setPending("volunteers")
    setMsg(null)
    const r = await syncVolunteersAction()
    setPending(null)
    if (r.ok) {
      const parts = [
        `Volunteers synced: ${r.eventsProcessed ?? 0} event(s), ${r.assignmentsWritten ?? 0} assignment row(s), ${r.linksWritten ?? 0} event–person link(s).`,
      ]
      if (r.notice) parts.push(r.notice)
      setMsg(parts.join(" "))
    } else setMsg(r.error ?? "Error")
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
        {pending === "people" ? "Syncing…" : "Sync people (La Reunión tag folder)"}
      </button>
      <button
        type="button"
        onClick={runVolunteers}
        disabled={pending !== null}
        className="rounded-md border border-amber-600/40 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-950 hover:bg-amber-100 disabled:opacity-50"
      >
        {pending === "volunteers" ? "Syncing…" : "Sync volunteers (roles + signups)"}
      </button>
      {msg && <p className="w-full text-sm text-gray-700">{msg}</p>}
    </div>
  )
}
