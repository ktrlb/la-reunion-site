'use client'

import { Utensils, Users, Heart, BookOpen } from "lucide-react"
import Image from "next/image"
import { useTranslation } from "@/contexts/translation-context"

const serviceKeys = [
  { key: 'foodPantry', icon: Utensils, href: "/services#food-pantry" },
  { key: 'afterSchool', icon: BookOpen, href: "/services#after-school" },
  { key: 'resources', icon: Heart, href: "/services#resources" },
  { key: 'activities', icon: Users, href: "/services#activities" }
]

export function ServicesOverview() {
  const { t } = useTranslation()
  
  return (
    <div className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('services.title')}
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t('services.subtitle')}
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            {serviceKeys.map((service) => (
              <div key={service.key} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-red-600 to-indigo-900">
                    <service.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {t(`services.${service.key}.name`)}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{t(`services.${service.key}.description`)}</p>
                  
                  <p className="mt-6">
                    <a 
                      href={service.href} 
                      className="text-sm font-semibold leading-6 bg-gradient-to-r from-red-600 to-indigo-900 bg-clip-text text-transparent hover:from-red-700 hover:to-indigo-900"
                    >
                      {t('services.learnMore')} <span aria-hidden="true">→</span>
                    </a>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      
      {/* Community Photo Gallery */}
      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('services.communityInAction')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Food Pantry */}
            <div className="group overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/images/food pantry.jpg"
                alt={t('services.foodPantry.name')}
                width={400}
                height={300}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            
            {/* Helen Hug */}
            <div className="group overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/images/helen hug.jpg"
                alt="Helen embracing a community member, showing care and connection"
                width={400}
                height={300}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            
            {/* STEM Kids */}
            <div className="group overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/images/slime kids.jpg"
                alt="Kids enjoying STEM activities and learning together"
                width={400}
                height={300}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            
            {/* Tie Dye */}
            <div className="group overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/images/tie die.jpg"
                alt="Kids tie-dying shirts with volunteer support"
                width={400}
                height={300}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            
            {/* Celebration */}
            <div className="group overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/images/celebration.jpg"
                alt="Community celebrations and events at La Reunión"
                width={400}
                height={300}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
