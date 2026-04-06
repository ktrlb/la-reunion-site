import { VolunteerApplicationForms } from "@/components/documents/volunteer-application-forms"
import { getFirstSlotDocument, getSlotDocuments } from "@/lib/documents-queries"
import VolunteerPageClient from "./volunteer-client"

export default async function VolunteerPage() {
  const [application, backgroundCheck, confidentiality, legacyForms] = await Promise.all([
    getFirstSlotDocument("volunteer.application"),
    getFirstSlotDocument("volunteer.backgroundCheck"),
    getFirstSlotDocument("volunteer.confidentiality"),
    getSlotDocuments("volunteer.forms"),
  ])

  const hasNamedSlots = Boolean(application || backgroundCheck || confidentiality)
  const legacyOnly = !hasNamedSlots && legacyForms.length > 0
  const shownIds = new Set(
    [application?.id, backgroundCheck?.id, confidentiality?.id].filter(Boolean) as string[],
  )
  const extraLegacy = legacyForms.filter((d) => !shownIds.has(d.id))

  const formsSection =
    hasNamedSlots || legacyOnly || extraLegacy.length > 0 ? (
      <VolunteerApplicationForms
        application={application}
        backgroundCheck={backgroundCheck}
        confidentiality={confidentiality}
        legacyList={legacyOnly ? legacyForms : extraLegacy}
      />
    ) : null

  return <VolunteerPageClient formsSection={formsSection} />
}
