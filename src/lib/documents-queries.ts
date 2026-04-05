import { and, asc, desc, eq, ilike, or } from "drizzle-orm"
import { getDb } from "@/db"
import { documentPlacements, documents } from "@/db/schema"
import { getSlotByKey } from "@/lib/document-slots"

export interface PublicDocument {
  id: string
  title: string
  slug: string
  url: string
}

export async function getSlotDocuments(slotKey: string): Promise<PublicDocument[]> {
  const db = getDb()
  if (!db) return []
  const rows = await db
    .select({
      id: documents.id,
      title: documents.title,
      slug: documents.slug,
      publicUrl: documents.publicUrl,
      status: documents.status,
      sortOrder: documentPlacements.sortOrder,
    })
    .from(documentPlacements)
    .innerJoin(documents, eq(documentPlacements.documentId, documents.id))
    .where(
      and(eq(documentPlacements.slotKey, slotKey), eq(documents.status, "live"))
    )
    .orderBy(asc(documentPlacements.sortOrder), asc(documents.title))

  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    slug: r.slug,
    url: r.publicUrl,
  }))
}

export interface LiveSiteLinkRow {
  placementId: string
  slotKey: string
  slotLabel: string
  pagePath: string
  documentId: string
  title: string
  slug: string
  publicUrl: string
  status: string
  updatedAt: Date
}

export async function listLiveSiteLinks(): Promise<LiveSiteLinkRow[]> {
  const db = getDb()
  if (!db) return []
  const rows = await db
    .select({
      placementId: documentPlacements.id,
      slotKey: documentPlacements.slotKey,
      placementUpdated: documentPlacements.updatedAt,
      documentId: documents.id,
      docTitle: documents.title,
      docSlug: documents.slug,
      publicUrl: documents.publicUrl,
      docStatus: documents.status,
      docUpdated: documents.updatedAt,
    })
    .from(documentPlacements)
    .innerJoin(documents, eq(documentPlacements.documentId, documents.id))
    .where(eq(documents.status, "live"))

  return rows
    .map((r) => {
      const slot = getSlotByKey(r.slotKey)
      return {
        placementId: r.placementId,
        slotKey: r.slotKey,
        slotLabel: slot?.label ?? r.slotKey,
        pagePath: slot?.pagePath ?? "—",
        documentId: r.documentId,
        title: r.docTitle,
        slug: r.docSlug,
        publicUrl: r.publicUrl,
        status: r.docStatus,
        updatedAt: r.docUpdated ?? r.placementUpdated,
      }
    })
    .sort((a, b) => {
      const bySlot = a.slotLabel.localeCompare(b.slotLabel)
      if (bySlot !== 0) return bySlot
      return a.title.localeCompare(b.title)
    })
}

export interface AdminDocumentRow {
  id: string
  title: string
  slug: string
  publicUrl: string
  storageKind: string
  status: string
  mimeType: string | null
  createdAt: Date
  updatedAt: Date
  archivedAt: Date | null
  placementKeys: string[]
}

export async function listAllDocumentsForAdmin(options: {
  q?: string
  status?: "all" | "live" | "archived"
}): Promise<AdminDocumentRow[]> {
  const db = getDb()
  if (!db) return []
  const q = options.q?.trim()
  const statusFilter = options.status ?? "all"

  const conditions = []
  if (q) {
    conditions.push(
      or(ilike(documents.title, `%${q}%`), ilike(documents.slug, `%${q}%`))
    )
  }
  if (statusFilter === "live") conditions.push(eq(documents.status, "live"))
  if (statusFilter === "archived") conditions.push(eq(documents.status, "archived"))

  const baseQuery = db.select().from(documents).orderBy(desc(documents.updatedAt))

  const rows =
    conditions.length > 0
      ? await baseQuery.where(and(...conditions))
      : await baseQuery

  const placements = await db.select().from(documentPlacements)
  const byDoc = new Map<string, string[]>()
  for (const p of placements) {
    const list = byDoc.get(p.documentId) ?? []
    list.push(p.slotKey)
    byDoc.set(p.documentId, list)
  }

  return rows.map((d) => ({
    id: d.id,
    title: d.title,
    slug: d.slug,
    publicUrl: d.publicUrl,
    storageKind: d.storageKind,
    status: d.status,
    mimeType: d.mimeType,
    createdAt: d.createdAt,
    updatedAt: d.updatedAt,
    archivedAt: d.archivedAt,
    placementKeys: byDoc.get(d.id) ?? [],
  }))
}
