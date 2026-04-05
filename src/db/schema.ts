import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core"

/** Key-value settings (e.g. org_phone). */
export const siteSettings = pgTable("site_settings", {
  key: text("key").primaryKey(),
  value: text("value"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
})

export const documents = pgTable("documents", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  storageKind: text("storage_kind").notNull(),
  publicUrl: text("public_url").notNull(),
  blobPathname: text("blob_pathname"),
  originalFilename: text("original_filename"),
  mimeType: text("mime_type"),
  status: text("status").notNull().default("live"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  archivedAt: timestamp("archived_at", { withTimezone: true }),
})

export const documentPlacements = pgTable(
  "document_placements",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slotKey: text("slot_key").notNull(),
    documentId: uuid("document_id")
      .notNull()
      .references(() => documents.id, { onDelete: "cascade" }),
    sortOrder: integer("sort_order").notNull().default(0),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [unique().on(t.slotKey, t.documentId)]
)

export const cmsNavItems = pgTable("cms_nav_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  sortOrder: integer("sort_order").notNull().default(0),
  href: text("href").notNull(),
  labelEn: text("label_en").notNull(),
  labelEs: text("label_es").notNull(),
  visible: boolean("visible").notNull().default(true),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
})

export const cmsPageConfigs = pgTable("cms_page_configs", {
  routeKey: text("route_key").primaryKey(),
  sections: jsonb("sections").notNull().$type<unknown>(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
})

/** Cached Breeze calendar events (read from API). */
export const breezeEvents = pgTable("breeze_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  breezeId: text("breeze_id").notNull().unique(),
  name: text("name").notNull(),
  startUtc: timestamp("start_utc", { withTimezone: true }),
  endUtc: timestamp("end_utc", { withTimezone: true }),
  location: text("location"),
  description: text("description"),
  raw: jsonb("raw"),
  lastSyncedAt: timestamp("last_synced_at", { withTimezone: true }).defaultNow().notNull(),
})

export const breezePeople = pgTable("breeze_people", {
  id: uuid("id").primaryKey().defaultRandom(),
  breezeId: text("breeze_id").notNull().unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email"),
  raw: jsonb("raw"),
  lastSyncedAt: timestamp("last_synced_at", { withTimezone: true }).defaultNow().notNull(),
})

export const eventPersonLinks = pgTable("event_person_links", {
  id: uuid("id").primaryKey().defaultRandom(),
  eventId: uuid("event_id")
    .notNull()
    .references(() => breezeEvents.id, { onDelete: "cascade" }),
  personId: uuid("person_id")
    .notNull()
    .references(() => breezePeople.id, { onDelete: "cascade" }),
  role: text("role").notNull().default("connection"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
})
