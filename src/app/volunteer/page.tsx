import { SlotDocumentsSection } from "@/components/documents/slot-documents"
import VolunteerPageClient from "./volunteer-client"

export default function VolunteerPage() {
  return (
    <>
      <VolunteerPageClient />
      <SlotDocumentsSection slotKey="volunteer.forms" title="Forms & PDFs" />
    </>
  )
}
