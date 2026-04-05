import { getSlotDocuments } from "@/lib/documents-queries"
import { getOrgPhoneCached } from "@/lib/site-settings"
import { ContactContent } from "./contact-content"

export default async function ContactPage() {
  const [orgPhone, forms] = await Promise.all([
    getOrgPhoneCached(),
    getSlotDocuments("contact.forms"),
  ])

  return <ContactContent orgPhone={orgPhone} forms={forms} />
}
