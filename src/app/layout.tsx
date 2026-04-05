import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { TranslationProvider } from "@/contexts/translation-context"
import { getNavItemsCached } from "@/lib/cms/nav-queries"
import { getOrgPhoneCached } from "@/lib/site-settings"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "La Reunión in Oak Trail Shores",
  description:
    "La Reunión is a community center providing food assistance, after-school programs, resource connections, and community activities with dignity and care.",
  keywords: [
    "community center",
    "social services",
    "food pantry",
    "after-school program",
    "volunteer",
    "donate",
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/la-reunion-favicon.png",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [orgPhone, navItems] = await Promise.all([
    getOrgPhoneCached(),
    getNavItemsCached(),
  ])

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/la-reunion-favicon.png?v=2" />
        <link rel="icon" type="image/png" sizes="16x16" href="/la-reunion-favicon.png?v=2" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/la-reunion-favicon.png?v=2" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-gray-900 focus:shadow-lg focus:ring-2 focus:ring-red-600"
        >
          Skip to main content
        </a>
        <TranslationProvider>
          <Navigation navItems={navItems} />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer orgPhone={orgPhone} />
        </TranslationProvider>
      </body>
    </html>
  )
}
