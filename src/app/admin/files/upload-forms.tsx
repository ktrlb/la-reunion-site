"use client"

import { useActionState } from "react"
import {
  addExternalPdfAction,
  uploadPdfAction,
} from "./actions"

export function UploadPdfForm() {
  const [state, action, pending] = useActionState(uploadPdfAction, {})
  return (
    <form action={action} className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          name="title"
          required
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">PDF file</label>
        <input
          name="file"
          type="file"
          accept="application/pdf"
          required
          className="mt-1 w-full text-sm"
        />
      </div>
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state?.ok && <p className="text-sm text-green-600">Uploaded.</p>}
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
      >
        {pending ? "Uploading…" : "Upload PDF"}
      </button>
    </form>
  )
}

export function ExternalPdfForm() {
  const [state, action, pending] = useActionState(addExternalPdfAction, {})
  return (
    <form action={action} className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          name="title"
          required
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Public URL</label>
        <input
          name="url"
          type="url"
          required
          placeholder="https://..."
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state?.ok && <p className="text-sm text-green-600">Added.</p>}
      <button
        type="submit"
        disabled={pending}
        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
      >
        {pending ? "Saving…" : "Add by URL"}
      </button>
    </form>
  )
}
