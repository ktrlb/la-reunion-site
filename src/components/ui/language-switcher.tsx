'use client'

import { useTranslation } from '@/contexts/translation-context'
import { Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function LanguageSwitcher() {
  const { locale, changeLanguage, isEnglish } = useTranslation()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => changeLanguage(isEnglish ? 'es' : 'en')}
      className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
      aria-label="Switch language"
    >
      <Globe className="h-4 w-4" />
      <span className="font-medium">
        {isEnglish ? 'EN' : 'ES'}
      </span>
      <span className="text-xs text-gray-400">
        {isEnglish ? '→ ES' : '→ EN'}
      </span>
    </Button>
  )
}

