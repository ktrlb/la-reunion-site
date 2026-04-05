export interface DocumentSlotDefinition {
  key: string
  label: string
  pagePath: string
}

export const DOCUMENT_SLOTS: DocumentSlotDefinition[] = [
  {
    key: "contact.forms",
    label: "Contact — Forms & PDFs",
    pagePath: "/contact",
  },
  {
    key: "volunteer.forms",
    label: "Volunteer — Forms & PDFs",
    pagePath: "/volunteer",
  },
  {
    key: "services.resources",
    label: "Services — Resource PDFs",
    pagePath: "/services",
  },
]

export function getSlotByKey(key: string): DocumentSlotDefinition | undefined {
  return DOCUMENT_SLOTS.find((s) => s.key === key)
}
