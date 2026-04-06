"use client"

import { FileText } from "lucide-react"
import { useTranslation } from "@/contexts/translation-context"
import type { PublicDocument } from "@/lib/documents-queries"

interface VolunteerApplicationFormsProps {
  application: PublicDocument | null
  backgroundCheck: PublicDocument | null
  confidentiality: PublicDocument | null
  /** Either full legacy slot list (when no named slots), or extra PDFs not assigned to a named slot. */
  legacyList: PublicDocument[]
}

export function VolunteerApplicationForms({
  application,
  backgroundCheck,
  confidentiality,
  legacyList,
}: VolunteerApplicationFormsProps) {
  const { t } = useTranslation()

  const namedRows: { label: string; doc: PublicDocument }[] = []
  if (application) {
    namedRows.push({ label: t("volunteer.formsSection.links.application"), doc: application })
  }
  if (backgroundCheck) {
    namedRows.push({
      label: t("volunteer.formsSection.links.backgroundCheck"),
      doc: backgroundCheck,
    })
  }
  if (confidentiality) {
    namedRows.push({
      label: t("volunteer.formsSection.links.confidentiality"),
      doc: confidentiality,
    })
  }

  const legacyOnly = namedRows.length === 0 && legacyList.length > 0
  const showAdditional = namedRows.length > 0 && legacyList.length > 0

  if (namedRows.length === 0 && legacyList.length === 0) return null

  return (
    <section className="border-y border-red-100 bg-gradient-to-br from-red-50/90 via-white to-indigo-50/50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t("volunteer.formsSection.title")}
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">{t("volunteer.formsSection.subtitle")}</p>
          <ul className="mt-8 space-y-3 border-t border-gray-200 pt-8">
            {legacyOnly
              ? legacyList.map((d) => (
                  <li key={d.id}>
                    <a
                      href={d.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-medium text-red-600 hover:text-red-700"
                    >
                      <FileText className="h-5 w-5 shrink-0" aria-hidden />
                      {d.title}
                    </a>
                  </li>
                ))
              : namedRows.map(({ label, doc }) => (
                  <li key={doc.id}>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-2"
                    >
                      <span className="inline-flex items-center gap-2 font-semibold text-gray-900">
                        <FileText className="h-5 w-5 shrink-0 text-red-600" aria-hidden />
                        {label}
                      </span>
                      <span className="text-sm font-normal text-gray-500 group-hover:text-red-700 sm:truncate">
                        ({doc.title})
                      </span>
                    </a>
                  </li>
                ))}
            {showAdditional ? (
              <>
                <li className="list-none pt-4">
                  <p className="text-sm font-semibold text-gray-800">
                    {t("volunteer.formsSection.additionalHeading")}
                  </p>
                </li>
                {legacyList.map((d) => (
                  <li key={d.id}>
                    <a
                      href={d.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-medium text-red-600 hover:text-red-700"
                    >
                      <FileText className="h-5 w-5 shrink-0" aria-hidden />
                      {d.title}
                    </a>
                  </li>
                ))}
              </>
            ) : null}
          </ul>
          <p className="mt-4 text-xs text-gray-500">{t("volunteer.formsSection.opensNewTab")}</p>
        </div>
      </div>
    </section>
  )
}
