"use client"

import { ExternalLink, FileText, Globe } from "lucide-react"
import { useTranslation } from "@/contexts/translation-context"
import type { PublicDocument } from "@/lib/documents-queries"
import { siteConfig } from "@/lib/site-config"

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
  const hasDownloadableForms = namedRows.length > 0 || legacyList.length > 0

  return (
    <section className="border-y border-red-100 bg-gradient-to-br from-red-50/90 via-white to-indigo-50/50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t("volunteer.formsSection.title")}
          </h2>

          <div className="mt-8 overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 to-indigo-900 p-8 shadow-xl ring-4 ring-red-200/60 sm:p-10">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/15 ring-2 ring-white/30">
                <Globe className="h-8 w-8 text-white" aria-hidden="true" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-2xl font-bold text-white sm:text-3xl">
                  {t("volunteer.formsSection.onlineApplication.title")}
                </h3>
                <p className="mt-3 text-base leading-7 text-red-100">
                  {t("volunteer.formsSection.onlineApplication.description")}
                </p>
                <div className="mt-6 flex flex-col items-center gap-2 sm:items-start">
                  <a
                    href={siteConfig.links.volunteerApplicationOnline}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-md bg-white px-6 py-3 text-base font-semibold text-red-600 shadow-sm transition-colors hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {t("volunteer.formsSection.onlineApplication.button")}
                    <ExternalLink className="ml-2 h-5 w-5" aria-hidden="true" />
                  </a>
                  <p className="text-xs text-red-100/80">
                    {t("volunteer.formsSection.onlineApplication.opensNewTab")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {hasDownloadableForms ? (
            <>
              <h3 className="mt-12 text-xl font-semibold text-gray-900">
                {t("volunteer.formsSection.downloadHeading")}
              </h3>
              <p className="mt-3 text-lg leading-8 text-gray-600">
                {t("volunteer.formsSection.subtitle")}
              </p>
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
            </>
          ) : null}
        </div>
      </div>
    </section>
  )
}
