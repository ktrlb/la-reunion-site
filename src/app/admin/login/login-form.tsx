"use client"

import { useActionState } from "react"
import { loginWithAdminCredentials } from "./actions"

export function AdminLoginForm() {
  const [state, formAction, isPending] = useActionState(loginWithAdminCredentials, null)

  return (
    <form action={formAction} className="space-y-4">
      {state?.error ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
          {state.error}
        </p>
      ) : null}
      <div>
        <label htmlFor="admin-email" className="mb-1 block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="admin-email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
          disabled={isPending}
        />
        <p className="mt-2 text-xs text-gray-500">
          Use an address listed in <code className="rounded bg-gray-100 px-1">ADMIN_EMAILS</code> or{" "}
          <code className="rounded bg-gray-100 px-1">ADMINS</code> / <code className="rounded bg-gray-100 px-1">EMAIL_*</code>.
        </p>
      </div>
      <div>
        <label htmlFor="admin-password" className="mb-1 block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
          disabled={isPending}
        />
        <p className="mt-2 text-xs text-gray-500">
          Use the value from <code className="rounded bg-gray-100 px-1">ADMIN_PW_SAMPLE</code> in your environment.
        </p>
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
      >
        {isPending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  )
}
