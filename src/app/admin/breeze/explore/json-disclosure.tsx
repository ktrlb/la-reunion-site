export function JsonDisclosure({ label, value }: { label: string; value: unknown }) {
  if (value === null || value === undefined) return null
  return (
    <details className="mt-1 text-xs">
      <summary className="cursor-pointer font-medium text-red-700 hover:underline">{label}</summary>
      <pre className="mt-2 max-h-72 overflow-auto rounded border border-gray-200 bg-gray-950 p-3 font-mono text-[11px] leading-relaxed text-gray-100">
        {JSON.stringify(value, null, 2)}
      </pre>
    </details>
  )
}
