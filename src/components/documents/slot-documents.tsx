import { FileText } from "lucide-react"
import { getSlotDocuments } from "@/lib/documents-queries"

export async function SlotDocumentsSection({
  slotKey,
  title,
}: {
  slotKey: string
  title: string
}) {
  const docs = await getSlotDocuments(slotKey)
  if (docs.length === 0) return null

  return (
    <section className="border-t border-gray-200 bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
        <ul className="mt-6 space-y-3">
          {docs.map((d) => (
            <li key={d.id}>
              <a
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
              >
                <FileText className="h-5 w-5 shrink-0" aria-hidden />
                {d.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
