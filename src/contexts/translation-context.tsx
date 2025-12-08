'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import enTranslations from '@/translations/en.json'
import esTranslations from '@/translations/es.json'

type Locale = 'en' | 'es'

interface TranslationContextType {
  locale: Locale
  changeLanguage: (newLocale: Locale) => void
  t: (key: string) => string
  isEnglish: boolean
  isSpanish: boolean
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

const translations = {
  en: enTranslations,
  es: esTranslations,
}

function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj) || path
}

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en')

  useEffect(() => {
    // Load saved language preference from localStorage
    const savedLocale = localStorage.getItem('locale') as Locale
    if (savedLocale && (savedLocale === 'en' || savedLocale === 'es')) {
      setLocale(savedLocale)
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split('-')[0]
      if (browserLang === 'es') {
        setLocale('es')
      }
    }
  }, [])

  const changeLanguage = (newLocale: Locale) => {
    setLocale(newLocale)
    localStorage.setItem('locale', newLocale)
    // Update HTML lang attribute
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLocale
    }
  }

  const t = (key: string): any => {
    const translation = translations[locale]
    const value = getNestedValue(translation, key)
    return value !== undefined ? value : key
  }

  return (
    <TranslationContext.Provider
      value={{
        locale,
        changeLanguage,
        t,
        isEnglish: locale === 'en',
        isSpanish: locale === 'es',
      }}
    >
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider')
  }
  return context
}

