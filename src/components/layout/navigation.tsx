"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { useTranslation } from "@/contexts/translation-context"
import type { NavItemRow } from "@/lib/cms/nav-queries"

const FALLBACK_NAV: NavItemRow[] = [
  { id: "fb-home", href: "/", labelEn: "Home", labelEs: "Inicio", visible: true, sortOrder: 0 },
  { id: "fb-about", href: "/about", labelEn: "About", labelEs: "Acerca de", visible: true, sortOrder: 1 },
  { id: "fb-services", href: "/services", labelEn: "Services", labelEs: "Servicios", visible: true, sortOrder: 2 },
  { id: "fb-volunteer", href: "/volunteer", labelEn: "Volunteer", labelEs: "Voluntario", visible: true, sortOrder: 3 },
  { id: "fb-contact", href: "/contact", labelEn: "Contact", labelEs: "Contacto", visible: true, sortOrder: 4 },
]

interface NavigationProps {
  navItems?: NavItemRow[]
}

export function Navigation({ navItems }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t, locale } = useTranslation()

  const items = (navItems?.length ? navItems : FALLBACK_NAV)
    .filter((i) => i.visible)
    .sort((a, b) => a.sortOrder - b.sortOrder)

  const label = (row: NavItemRow) => (locale === "es" ? row.labelEs : row.labelEn)

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">La Reunión</span>
            <div className="flex items-center space-x-3">
              <Image
                src="/la-reunion-logo.svg"
                alt="La Reunión Logo"
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <Image
                src="/la-reunion-name.svg"
                alt="La Reunión"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </div>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(true)}
            className="text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900 transition-colors hover:text-red-600"
            >
              {label(item)}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-4">
          <LanguageSwitcher />
          <Link href="/donate">
            <Button className="bg-gradient-to-r from-red-600 to-indigo-900 text-white hover:from-red-700 hover:to-indigo-900">
              {t("nav.donate")}
            </Button>
          </Link>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">La Reunión</span>
                <div className="flex items-center space-x-3">
                  <Image
                    src="/la-reunion-logo.svg"
                    alt="La Reunión Logo"
                    width={32}
                    height={32}
                    className="h-8 w-8"
                  />
                  <Image
                    src="/la-reunion-name.svg"
                    alt="La Reunión"
                    width={100}
                    height={28}
                    className="h-7 w-auto"
                  />
                </div>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-800/10">
                <div className="space-y-2 py-6">
                  {items.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {label(item)}
                    </Link>
                  ))}
                </div>
                <div className="space-y-3 py-6">
                  <div className="px-3">
                    <LanguageSwitcher />
                  </div>
                  <Link href="/donate">
                    <Button className="w-full bg-gradient-to-r from-red-600 to-indigo-900 text-white hover:from-red-700 hover:to-indigo-900">
                      {t("nav.donate")}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
