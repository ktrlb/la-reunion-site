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
    key: "volunteer.application",
    label: "Volunteer — Application (PDF)",
    pagePath: "/volunteer",
  },
  {
    key: "volunteer.backgroundCheck",
    label: "Volunteer — Background check (PDF)",
    pagePath: "/volunteer",
  },
  {
    key: "volunteer.confidentiality",
    label: "Volunteer — Confidentiality agreement (PDF)",
    pagePath: "/volunteer",
  },
  {
    key: "volunteer.forms",
    label: "Volunteer — Additional PDFs (legacy list)",
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
