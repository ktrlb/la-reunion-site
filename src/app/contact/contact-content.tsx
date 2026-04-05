"use client"

import { Clock, FileText, Mail, MapPin, Phone } from "lucide-react"
import Image from "next/image"
import { useTranslation } from "@/contexts/translation-context"
import type { PublicDocument } from "@/lib/documents-queries"
import { siteConfig } from "@/lib/site-config"

interface ContactContentProps {
  orgPhone: string | null
  forms: PublicDocument[]
}

export function ContactContent({ orgPhone, forms }: ContactContentProps) {
  const { t } = useTranslation()
  const email = siteConfig.contact.email

  return (
    <div className="bg-white">
      <div className="bg-gradient-to-br from-red-50 via-red-100 to-indigo-100">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {t("contact.title")}{" "}
              <div className="mt-4 flex justify-center">
                <Image
                  src="/la-reunion-name.svg"
                  alt="La Reunión"
                  width={300}
                  height={80}
                  className="h-16 w-auto sm:h-20"
                />
              </div>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">{t("contact.subtitle")}</p>
          </div>
        </div>
      </div>

      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-16 text-center">
              <h2 className="mb-8 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {t("contact.getInTouch")}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Mail className="h-8 w-8 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{t("contact.email.title")}</h3>
                    <p className="mt-2 text-lg text-gray-600">{t("contact.email.address")}</p>
                    <p className="mt-2 text-gray-500">{t("contact.email.description")}</p>
                  </div>
                </div>

                {orgPhone ? (
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Phone className="h-8 w-8 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">Phone</h3>
                      <p className="mt-2 text-lg text-gray-600">
                        <a href={`tel:${orgPhone.replace(/\s/g, "")}`} className="text-red-600 hover:text-red-700">
                          {orgPhone}
                        </a>
                      </p>
                    </div>
                  </div>
                ) : null}

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Clock className="h-8 w-8 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{t("contact.officeHours.title")}</h3>
                    <p className="mt-2 text-lg text-gray-600">{t("contact.officeHours.hours")}</p>
                    <p className="mt-2 text-gray-500">{t("contact.officeHours.foodPantry")}</p>
                    <p className="text-gray-500">{t("contact.officeHours.afterSchool")}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <MapPin className="h-8 w-8 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{t("contact.location.title")}</h3>
                    <p className="mt-2 text-lg text-gray-600">{t("contact.location.address")}</p>
                    <p className="text-lg text-gray-600">{t("contact.location.city")}</p>
                    <p className="mt-2 text-gray-500">{t("contact.location.description")}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="rounded-lg bg-red-50 p-6">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">Need Immediate Assistance?</h3>
                  <p className="mb-4 text-gray-600">
                    If you need immediate help with food assistance or other urgent needs, please contact us
                    directly at {email}
                    {orgPhone ? ` or ${orgPhone}` : ""} or visit during our open hours.
                  </p>
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center rounded-md bg-gradient-to-r from-red-600 to-indigo-900 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:from-red-700 hover:to-indigo-900"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Send Email
                  </a>
                </div>

                <div className="rounded-lg bg-gray-50 p-6">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">Quick Contact</h3>
                  <p className="mb-4 text-gray-600">
                    The fastest way to reach us is by email. We typically respond within 24 hours.
                  </p>
                  <div className="space-y-2">
                    <a
                      href={`mailto:${email}?subject=General%20Inquiry`}
                      className="block font-medium text-red-600 hover:text-red-700"
                    >
                      General Questions →
                    </a>
                    <a
                      href={`mailto:${email}?subject=Volunteer%20Interest`}
                      className="block font-medium text-red-600 hover:text-red-700"
                    >
                      Volunteer Opportunities →
                    </a>
                    <a
                      href={`mailto:${email}?subject=Service%20Information`}
                      className="block font-medium text-red-600 hover:text-red-700"
                    >
                      Service Information →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {forms.length > 0 ? (
        <div className="border-t border-gray-200 bg-white py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Forms & PDFs</h2>
            <ul className="mt-6 space-y-3">
              {forms.map((d) => (
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
            </ul>
          </div>
        </div>
      ) : null}

      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Find Us</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Visit us at our community center in Oak Trail Shores, Texas.
            </p>
          </div>

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900">La Reunión Community Center</h3>
              <div className="space-y-3 text-gray-600">
                <p className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-red-600" />
                  <span>2723 Maplewood St</span>
                </p>
                <p className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-red-600" />
                  <span>Granbury, TX 76048</span>
                </p>
                <p className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-red-600" />
                  <span>Monday - Friday: 9:00 AM - 5:00 PM</span>
                </p>
                <p className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-red-600" />
                  <span>Food Pantry: Thursdays 1:00 PM - 4:00 PM</span>
                </p>
              </div>

              <div className="mt-6 space-y-3">
                <a
                  href="https://maps.google.com/?q=2723+Maplewood+St+Granbury+TX+76048"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md bg-gradient-to-r from-red-600 to-indigo-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:from-red-700 hover:to-indigo-900"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Get Directions
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg bg-white shadow-sm">
              <div className="bg-gray-100 p-8 text-center">
                <div className="mb-4">
                  <MapPin className="mx-auto h-16 w-16 text-red-600" />
                </div>
                <h4 className="mb-2 text-lg font-semibold text-gray-900">La Reunión Community Center</h4>
                <p className="mb-4 text-gray-600">
                  2723 Maplewood St
                  <br />
                  Granbury, TX 76048
                </p>
                <a
                  href="https://maps.google.com/?q=2723+Maplewood+St+Granbury+TX+76048"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md bg-gradient-to-r from-red-600 to-indigo-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:from-red-700 hover:to-indigo-900"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Other Ways to Connect</h2>
          <p className="mt-4 text-lg text-gray-600">
            We&apos;re always looking for ways to better serve our community and build partnerships.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={`mailto:${email}?subject=Partnership%20Inquiry`}
              className="inline-flex items-center rounded-md bg-gradient-to-r from-red-600 to-indigo-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:from-red-700 hover:to-indigo-900"
            >
              Partnership Opportunities
            </a>
            <a
              href={`mailto:${email}?subject=Volunteer%20Interest`}
              className="inline-flex items-center rounded-md border border-red-600 bg-white px-6 py-3 text-sm font-semibold text-red-600 shadow-sm hover:bg-gray-50"
            >
              Volunteer Interest
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
