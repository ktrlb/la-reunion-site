import { SlotDocumentsSection } from "@/components/documents/slot-documents"
import ServicesPageClient from "./services-client"

export default function ServicesPage() {
  return (
    <>
      <ServicesPageClient />
      <SlotDocumentsSection slotKey="services.resources" title="Resource PDFs" />
    </>
  )
}
