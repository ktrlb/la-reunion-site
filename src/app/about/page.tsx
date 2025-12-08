'use client'

import Image from "next/image"
import { MapPin } from "lucide-react"
import { useTranslation } from "@/contexts/translation-context"

export default function AboutPage() {
  const { t } = useTranslation()
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-red-50 via-red-100 to-indigo-100">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
              {t('about.title')}{" "}
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
              {t('about.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Values */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              {/* Mission */}
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {t('about.mission.title')}
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  {t('about.mission.p1')}
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  {t('about.mission.p2')}
                </p>
              </div>

              {/* Values */}
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {t('about.values.title')}
                </h2>
                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{t('about.values.dignity.title')}</h3>
                    <p className="mt-2 text-gray-600">
                      {t('about.values.dignity.description')}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{t('about.values.community.title')}</h3>
                    <p className="mt-2 text-gray-600">
                      {t('about.values.community.description')}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{t('about.values.service.title')}</h3>
                    <p className="mt-2 text-gray-600">
                      {t('about.values.service.description')}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{t('about.values.partnership.title')}</h3>
                    <p className="mt-2 text-gray-600">
                      {t('about.values.partnership.description')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Community Photo Banner */}
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl shadow-xl">
            <Image
              src="/images/helen hug.jpg"
              alt="Helen embracing a community member at La Reunión"
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('about.location.title')}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {t('about.location.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('common.communityCenter')}
              </h3>
              <div className="space-y-3 text-gray-600">
                <p>{t('about.location.address')}</p>
                <p>{t('about.location.city')}</p>
                <p className="mt-4 text-sm text-gray-500">
                  {t('about.location.description')}
                </p>
              </div>
              
              <div className="mt-6">
                <a
                  href="/contact"
                  className="inline-flex items-center rounded-md bg-gradient-to-r from-red-600 to-indigo-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:from-red-700 hover:to-indigo-900"
                >
                  {t('about.location.getDirections')}
                </a>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-100 p-8 text-center">
                <div className="mb-4">
                  <MapPin className="h-16 w-16 text-red-600 mx-auto" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('common.communityCenter')}
                </h4>
                <p className="text-gray-600 mb-4">
                  {t('about.location.address')}<br />
                  {t('about.location.city')}
                </p>
                <a
                  href="https://maps.google.com/?q=2723+Maplewood+St+Granbury+TX+76048"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md bg-gradient-to-r from-red-600 to-indigo-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:from-red-700 hover:to-indigo-900"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  {t('common.viewOnGoogleMaps')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* History */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center mb-16">
              {t('about.story.title')}
            </h2>
            <div className="prose prose-lg mx-auto text-gray-600 max-w-4xl">
              <p>{t('about.story.p1')}</p>
              <p>{t('about.story.p2')}</p>
              <p>{t('about.story.p3')}</p>
              <p>{t('about.story.p4')}</p>
              <p><strong>{t('about.story.p5')}</strong></p>
              <p>{t('about.story.p6')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-gradient-to-r from-red-600 to-indigo-900 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t('about.wantToLearnMore.title')}
          </h2>
          <p className="mt-4 text-lg text-red-100">
            {t('about.wantToLearnMore.subtitle')}
          </p>
          <div className="mt-8">
            <a
              href="mailto:info@la-reunion.org"
              className="inline-flex items-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-red-600 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              {t('about.wantToLearnMore.contactUs')}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
