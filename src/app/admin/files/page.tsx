import Link from "next/link"
import {
  assignDocumentToSlotAction,
  removePlacementAction,
  setDocumentStatusAction,
} from "./actions"
import { UploadPdfForm, ExternalPdfForm } from "./upload-forms"
import { listAllDocumentsForAdmin, listLiveSiteLinks } from "@/lib/documents-queries"
import { DOCUMENT_SLOTS } from "@/lib/document-slots"
import { requireAdmin } from "@/lib/require-admin"

export const dynamic = "force-dynamic"

function Badge({
  children,
  variant,
}: {
  children: React.ReactNode
  variant: "live" | "archived" | "neutral"
}) {
  const cls =
    variant === "live"
      ? "bg-green-100 text-green-800"
      : variant === "archived"
        ? "bg-gray-200 text-gray-700"
        : "bg-blue-50 text-blue-800"
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${cls}`}>
      {children}
    </span>
  )
}

export default async function AdminFilesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>
}) {
  await requireAdmin()
  const sp = await searchParams
  const q = sp.q
  const status = (sp.status as "all" | "live" | "archived") || "all"

  const [liveLinks, allDocs] = await Promise.all([
    listLiveSiteLinks(),
    listAllDocumentsForAdmin({ q, status }),
  ])

  const liveDocs = allDocs.filter((d) => d.status === "live")

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Files & PDFs</h1>
        <p className="mt-1 text-gray-600">
          Upload documents, assign them to site slots, and manage the full library.
        </p>
      </div>

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Upload</h2>
        <div className="mt-4 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-medium text-gray-700">Upload PDF (Vercel Blob)</h3>
            <p className="mt-1 text-xs text-gray-500">
              Requires <code className="rounded bg-gray-100 px-1">BLOB_READ_WRITE_TOKEN</code>
            </p>
            <div className="mt-3">
              <UploadPdfForm />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700">Add external PDF URL</h3>
            <p className="mt-1 text-xs text-gray-500">No blob token required.</p>
            <div className="mt-3">
              <ExternalPdfForm />
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-900">Live site links</h2>
        <p className="mt-1 text-sm text-gray-600">
          Files currently placed on the public site (live documents only).
        </p>
        <div className="mt-4 overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-700">Slot</th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">Page</th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">Document</th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">Updated</th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">Link</th>
                <th className="px-4 py-2" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {liveLinks.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                    No placements yet. Assign a document to a slot below.
                  </td>
                </tr>
              ) : (
                liveLinks.map((row) => (
                  <tr key={row.placementId}>
                    <td className="px-4 py-2">{row.slotLabel}</td>
                    <td className="px-4 py-2">
                      <Link href={row.pagePath} className="text-red-600 hover:underline">
                        {row.pagePath}
                      </Link>
                    </td>
                    <td className="px-4 py-2">{row.title}</td>
                    <td className="px-4 py-2 text-gray-600">
                      {row.updatedAt.toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      <a
                        href={row.publicUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 hover:underline"
                      >
                        Open
                      </a>
                    </td>
                    <td className="px-4 py-2">
                      <form action={removePlacementAction}>
                        <input type="hidden" name="placementId" value={row.placementId} />
                        <button
                          type="submit"
                          className="text-xs text-gray-600 hover:text-red-600"
                        >
                          Remove
                        </button>
                      </form>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-900">Assign to site slot</h2>
        <form action={assignDocumentToSlotAction} className="mt-4 flex flex-wrap items-end gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700">Document</label>
            <select
              name="documentId"
              required
              className="mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="">Select…</option>
              {liveDocs.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700">Slot</label>
            <select
              name="slotKey"
              required
              className="mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
            >
              {DOCUMENT_SLOTS.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Assign
          </button>
        </form>
      </section>

      <section>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">All files</h2>
            <p className="mt-1 text-sm text-gray-600">Search and filter the full store.</p>
          </div>
          <form method="get" className="flex flex-wrap gap-2">
            <input
              type="search"
              name="q"
              defaultValue={q ?? ""}
              placeholder="Search title or slug…"
              className="rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
            <select name="status" defaultValue={status} className="rounded-md border border-gray-300 px-3 py-2 text-sm">
              <option value="all">All statuses</option>
              <option value="live">Live</option>
              <option value="archived">Archived</option>
            </select>
            <button
              type="submit"
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              Apply
            </button>
          </form>
        </div>

        <div className="mt-4 overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-700">Title</th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">Status</th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">Created</th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">Updated</th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">Slots</th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">Link</th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {allDocs.map((d) => (
                <tr key={d.id}>
                  <td className="px-4 py-2 font-medium">{d.title}</td>
                  <td className="px-4 py-2">
                    <Badge variant={d.status === "live" ? "live" : "archived"}>
                      {d.status === "live" ? "Live" : "Archived"}
                    </Badge>
                  </td>
                  <td className="px-4 py-2 text-gray-600">
                    {d.createdAt.toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-gray-600">
                    {d.updatedAt.toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex flex-wrap gap-1">
                      {d.placementKeys.length === 0 ? (
                        <span className="text-gray-400">—</span>
                      ) : (
                        d.placementKeys.map((k) => (
                          <Badge key={k} variant="neutral">
                            {k}
                          </Badge>
                        ))
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <a
                      href={d.publicUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 hover:underline"
                    >
                      Open
                    </a>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex flex-col gap-1">
                      {d.status === "live" ? (
                        <form action={setDocumentStatusAction}>
                          <input type="hidden" name="documentId" value={d.id} />
                          <input type="hidden" name="status" value="archived" />
                          <button type="submit" className="text-xs text-gray-600 hover:text-amber-700">
                            Archive
                          </button>
                        </form>
                      ) : (
                        <form action={setDocumentStatusAction}>
                          <input type="hidden" name="documentId" value={d.id} />
                          <input type="hidden" name="status" value="live" />
                          <button type="submit" className="text-xs text-gray-600 hover:text-green-700">
                            Restore live
                          </button>
                        </form>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
