"use client"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="mx-auto max-w-2xl px-6 py-24 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Something went wrong
          </h1>
          <p className="mt-4 text-gray-600">
            We encountered an unexpected error. Please try again.
          </p>
          <button
            onClick={reset}
            className="mt-8 rounded-md bg-red-600 px-6 py-2 text-white hover:bg-red-700"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
