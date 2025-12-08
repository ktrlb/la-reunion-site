'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/contexts/translation-context"

export function CTA() {
  const { t } = useTranslation()
  
  return (
    <div className="bg-gradient-to-r from-red-600 to-indigo-900">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t('cta.title')}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-red-100">
            {t('cta.subtitle')}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/volunteer">
              <Button variant="outline" size="lg" className="bg-white text-red-600 hover:bg-gray-50 border-white">
                {t('cta.volunteer')}
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" size="lg" className="text-white hover:bg-red-700 hover:text-white">
                {t('cta.getInTouch')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
