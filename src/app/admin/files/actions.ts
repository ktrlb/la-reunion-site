"use server"

import { del, put } from "@vercel/blob"
import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"
import { getDb } from "@/db"
import { documentPlacements, documents } from "@/db/schema"
import { DOCUMENT_SLOTS } from "@/lib/document-slots"
import { requireAdmin } from "@/lib/require-admin"
import { randomBytes } from "crypto"

function slugify(input: string): string {
  const s = input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
  return s || "document"
}

function makeSlug(title: string): string {
  const base = slugify(title)
  const suffix = randomBytes(4).toString("hex")
  return `${base}-${suffix}`
}

function revalidatePublic() {
  revalidatePath("/", "layout")
  revalidatePath("/contact")
  revalidatePath("/volunteer")
  revalidatePath("/services")
  revalidatePath("/admin/files")
}

export async function uploadPdfAction(
  _prev: { ok?: boolean; error?: string } | undefined,
  formData: FormData
): Promise<{ ok?: boolean; error?: string }> {
  await requireAdmin()
  const db = getDb()
  if (!db) return { error: "Database not configured." }

  const title = String(formData.get("title") ?? "").trim()
  const file = formData.get("file") as File | null
  if (!title) return { error: "Title is required." }
  if (!file || file.size === 0) return { error: "Choose a PDF file." }
  if (file.type !== "application/pdf") return { error: "Only PDF uploads are allowed." }

  const token = process.env.BLOB_READ_WRITE_TOKEN
  if (!token) {
    return { error: "BLOB_READ_WRITE_TOKEN is not set (add in Vercel / .env.local)." }
  }

  const slug = makeSlug(title)
  const bytes = Buffer.from(await file.arrayBuffer())
  const pathname = `org-forms/${slug}.pdf`
  const blob = await put(pathname, bytes, {
    access: "public",
    token,
    contentType: "application/pdf",
  })

  await db.insert(documents).values({
    title,
    slug,
    storageKind: "blob",
    publicUrl: blob.url,
    blobPathname: blob.pathname,
    originalFilename: file.name,
    mimeType: "application/pdf",
    status: "live",
  })

  revalidatePublic()
  return { ok: true }
}

export async function addExternalPdfAction(
  _prev: { ok?: boolean; error?: string } | undefined,
  formData: FormData
): Promise<{ ok?: boolean; error?: string }> {
  await requireAdmin()
  const db = getDb()
  if (!db) return { error: "Database not configured." }

  const title = String(formData.get("title") ?? "").trim()
  const url = String(formData.get("url") ?? "").trim()
  if (!title || !url) return { error: "Title and URL are required." }
  if (!/^https?:\/\//i.test(url)) return { error: "URL must start with http(s)." }

  const slug = makeSlug(title)
  await db.insert(documents).values({
    title,
    slug,
    storageKind: "url",
    publicUrl: url,
    mimeType: "application/pdf",
    status: "live",
  })

  revalidatePublic()
  return { ok: true }
}

export async function setDocumentStatusAction(formData: FormData) {
  await requireAdmin()
  const db = getDb()
  if (!db) return

  const id = String(formData.get("documentId") ?? "")
  const status = String(formData.get("status") ?? "") as "live" | "archived"
  if (!id || (status !== "live" && status !== "archived")) return

  await db
    .update(documents)
    .set({
      status,
      archivedAt: status === "archived" ? new Date() : null,
      updatedAt: new Date(),
    })
    .where(eq(documents.id, id))

  revalidatePublic()
}

export async function assignDocumentToSlotAction(formData: FormData) {
  await requireAdmin()
  const db = getDb()
  if (!db) return

  const documentId = String(formData.get("documentId") ?? "")
  const slotKey = String(formData.get("slotKey") ?? "")
  if (!documentId || !slotKey) return
  if (!DOCUMENT_SLOTS.some((s) => s.key === slotKey)) return

  const maxRow = await db
    .select({ sortOrder: documentPlacements.sortOrder })
    .from(documentPlacements)
    .where(eq(documentPlacements.slotKey, slotKey))

  const nextOrder =
    maxRow.length === 0
      ? 0
      : Math.max(...maxRow.map((r) => r.sortOrder)) + 1

  try {
    await db.insert(documentPlacements).values({
      slotKey,
      documentId,
      sortOrder: nextOrder,
    })
  } catch {
    /* unique (slot, document) */
  }

  revalidatePublic()
}

export async function removePlacementAction(formData: FormData) {
  await requireAdmin()
  const db = getDb()
  if (!db) return

  const placementId = String(formData.get("placementId") ?? "")
  if (!placementId) return

  await db
    .delete(documentPlacements)
    .where(eq(documentPlacements.id, placementId))

  revalidatePublic()
}

export async function deleteDocumentAction(formData: FormData) {
  await requireAdmin()
  const db = getDb()
  if (!db) return

  const id = String(formData.get("documentId") ?? "")
  if (!id) return

  const row = await db.select().from(documents).where(eq(documents.id, id)).limit(1)
  const doc = row[0]
  if (!doc) return

  if (doc.storageKind === "blob" && doc.blobPathname && process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      await del(doc.blobPathname, {
        token: process.env.BLOB_READ_WRITE_TOKEN,
      })
    } catch {
      /* continue DB delete */
    }
  }

  await db.delete(documents).where(eq(documents.id, id))
  revalidatePublic()
}
