"use client"

import { Mail, MapPin, Clock } from "lucide-react"
import Image from "next/image"
import { useTranslation } from "@/contexts/translation-context"

export default function ContactPage() {
  const { t } = useTranslation()
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-red-50 via-red-100 to-indigo-100">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
              {t('contact.title')}{" "}
              <div className="flex justify-center mt-4">
                <Image
                  src="/la-reunion-name.svg"
                  alt="La Reunión"
                  width={300}
                  height={80}
                  className="h-16 w-auto sm:h-20"
                />
              </div>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
                {t('contact.getInTouch')}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Mail className="h-8 w-8 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{t('contact.email.title')}</h3>
                    <p className="text-lg text-gray-600 mt-2">{t('contact.email.address')}</p>
                    <p className="text-gray-500 mt-2">
                      {t('contact.email.description')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Clock className="h-8 w-8 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{t('contact.officeHours.title')}</h3>
                    <p className="text-lg text-gray-600 mt-2">{t('contact.officeHours.hours')}</p>
                    <p className="text-gray-500 mt-2">
                      {t('contact.officeHours.foodPantry')}
                    </p>
                    <p className="text-gray-500">
                      {t('contact.officeHours.afterSchool')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <MapPin className="h-8 w-8 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{t('contact.location.title')}</h3>
                    <p className="text-lg text-gray-600 mt-2">{t('contact.location.address')}</p>
                    <p className="text-lg text-gray-600">{t('contact.location.city')}</p>
                    <p className="text-gray-500 mt-2">
                      {t('contact.location.description')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-red-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Need Immediate Assistance?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    If you need immediate help with food assistance or other urgent needs, 
                    please contact us directly at info@la-reunion.org or visit during our open hours.
                  </p>
                  <a
                    href="mailto:info@la-reunion.org"
                    className="inline-flex items-center rounded-md bg-gradient-to-r from-red-600 to-indigo-900 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:from-red-700 hover:to-indigo-900"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </a>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Quick Contact
                  </h3>
                  <p className="text-gray-600 mb-4">
                    The fastest way to reach us is by email. We typically respond within 24 hours.
                  </p>
                  <div className="space-y-2">
                    <a
                      href="mailto:info@la-reunion.org?subject=General%20Inquiry"
                      className="block text-red-600 hover:text-red-700 font-medium"
                    >
                      General Questions →
                    </a>
                    <a
                      href="mailto:info@la-reunion.org?subject=Volunteer%20Interest"
                      className="block text-red-600 hover:text-red-700 font-medium"
                    >
                      Volunteer Opportunities →
                    </a>
                    <a
                      href="mailto:info@la-reunion.org?subject=Service%20Information"
                      className="block text-red-600 hover:text-red-700 font-medium"
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

      {/* Map Section */}
      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Find Us
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Visit us at our community center in Oak Trail Shores, Texas.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                La Reunión Community Center
              </h3>
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
                  <MapPin className="h-4 w-4 mr-2" />
                  Get Directions
                </a>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-100 p-8 text-center">
                <div className="mb-4">
                  <MapPin className="h-16 w-16 text-red-600 mx-auto" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  La Reunión Community Center
                </h4>
                <p className="text-gray-600 mb-4">
                  2723 Maplewood St<br />
                  Granbury, TX 76048
                </p>
                <a
                  href="https://maps.google.com/?q=2723+Maplewood+St+Granbury+TX+76048"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md bg-gradient-to-r from-red-600 to-indigo-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:from-red-700 hover:to-indigo-900"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Contact Options */}
      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Other Ways to Connect
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            We&apos;re always looking for ways to better serve our community and build partnerships.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:info@la-reunion.org?subject=Partnership%20Inquiry"
              className="inline-flex items-center rounded-md bg-gradient-to-r from-red-600 to-indigo-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:from-red-700 hover:to-indigo-900"
            >
              Partnership Opportunities
            </a>
            <a
              href="mailto:info@la-reunion.org?subject=Volunteer%20Interest"
              className="inline-flex items-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-red-600 shadow-sm hover:bg-gray-50 border border-red-600"
            >
              Volunteer Interest
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
