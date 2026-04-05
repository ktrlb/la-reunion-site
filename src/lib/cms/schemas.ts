import { z } from "zod"

export const sectionTypeSchema = z.enum(["hero", "servicesOverview", "cta"])

export const pageSectionSchema = z.object({
  id: z.string(),
  type: sectionTypeSchema,
  visible: z.boolean(),
  order: z.number(),
  props: z.record(z.string(), z.unknown()).optional(),
})

export const pageSectionsSchema = z.array(pageSectionSchema)

export type PageSection = z.infer<typeof pageSectionSchema>
export type SectionType = z.infer<typeof sectionTypeSchema>
