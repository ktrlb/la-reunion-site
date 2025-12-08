'use client'

import { Utensils, Users, Heart, BookOpen, Calendar, Phone, MapPin, Clock } from "lucide-react"
import Image from "next/image"
import { useTranslation } from "@/contexts/translation-context"

const serviceIds = [
  { id: "food-pantry", key: "foodPantry", icon: Utensils },
  { id: "after-school", key: "afterSchool", icon: BookOpen },
  { id: "resources", key: "resources", icon: Heart },
  { id: "activities", key: "activities", icon: Users }
]

export default function ServicesPage() {
  const { t } = useTranslation()
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-red-50 via-red-100 to-indigo-100">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
              {t('services.ourServicesAt')}{" "}
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
              {t('services.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="space-y-24">
              {serviceIds.map((service, index) => (
                <div key={service.id} id={service.id} className="scroll-mt-20">
                  <div className={`grid grid-cols-1 gap-12 lg:grid-cols-2 ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}>
                    <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-red-600 to-indigo-900">
                          <service.icon className="h-6 w-6 text-white" aria-hidden="true" />
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                          {t(`services.${service.key}.name`)}
                        </h2>
                      </div>
                      <p className="text-lg leading-8 text-gray-600 mb-6">
                        {t(`services.${service.key}.fullDescription`)}
                      </p>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">{t('services.whatWeOffer')}</h3>
                        <ul className="space-y-2">
                          {((t(`services.${service.key}.details`) as unknown) as string[]).map((detail: string, detailIndex: number) => (
                            <li key={detailIndex} className="flex items-start">
                              <div className="flex-shrink-0">
                                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-red-600 to-indigo-900 mt-2"></div>
                              </div>
                              <p className="ml-3 text-gray-600">{detail}</p>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <Calendar className="h-5 w-5 text-red-600 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-gray-900">{t('services.hours')}</h4>
                            <p className="text-gray-600">{t(`services.${service.key}.hours`)}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <Phone className="h-5 w-5 text-red-600 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-gray-900">{t('services.contact')}</h4>
                            <p className="text-gray-600">{t(`services.${service.key}.contact`)}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                      <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100">
                        {service.id === "food-pantry" ? (
                          <Image
                            src="/images/food pantry.jpg"
                            alt={t('services.foodPantry.name')}
                            width={600}
                            height={600}
                            className="h-full w-full object-cover"
                          />
                        ) : service.id === "after-school" ? (
                          <div className="flex items-center justify-center h-full">
                            <Image
                              src="/images/slime kids.jpg"
                              alt="Kids enjoying STEM activities at La Reunión's after-school program"
                              width={400}
                              height={500}
                              className="h-auto w-auto max-h-full max-w-full object-contain rounded-lg"
                            />
                          </div>
                        ) : service.id === "resources" ? (
                          <Image
                            src="/images/partnership library.jpg"
                            alt="Partnership with Hood County Library"
                            width={600}
                            height={600}
                            className="h-full w-full object-cover"
                          />
                        ) : service.id === "activities" ? (
                          <Image
                            src="/images/celebration.jpg"
                            alt="Community celebrations and activities at La Reunión"
                            width={600}
                            height={600}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                              <service.icon className="h-24 w-24 text-gray-400 mx-auto mb-4" />
                              <p className="text-gray-500 text-sm">Service illustration</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TAFB Partnership Section */}
      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('services.foodBankPartnership')}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {t('services.foodBankPartnershipSubtitle')}
            </p>
          </div>
          <div className="text-center">
            <a
              href="https://tafb.org/"
              target="_blank"
              rel="noopener noreferrer"
                              className="inline-flex items-center rounded-md bg-gradient-to-r from-red-600 to-indigo-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:from-red-700 hover:to-indigo-900"
            >
              {t('services.learnMoreAboutTAFB')}
            </a>
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('services.visitOurCenter')}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {t('services.visitOurCenterSubtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('common.communityCenter')}
              </h3>
              <div className="space-y-3 text-gray-600">
                <p className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-red-600" />
                  <span>{t('about.location.address')}</span>
                </p>
                <p className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-red-600" />
                  <span>{t('about.location.city')}</span>
                </p>
                <p className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-red-600" />
                  <span>{t('common.mondayFriday')}</span>
                </p>
                <p className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-red-600" />
                  <span>{t('contact.findUs.foodPantryHours')}</span>
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
                  {t('common.getDirections')}
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

      {/* Contact CTA */}
      <div className="bg-gradient-to-r from-red-600 to-indigo-900 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t('services.questionsAboutServices')}
          </h2>
          <p className="mt-4 text-lg text-red-100">
            {t('services.questionsAboutServicesSubtitle')}
          </p>
          <div className="mt-8">
            <a
              href="mailto:info@la-reunion.org"
              className="inline-flex items-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-red-600 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              {t('contact.getInTouch')}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
