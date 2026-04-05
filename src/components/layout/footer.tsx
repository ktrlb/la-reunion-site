import Link from "next/link"
import Image from "next/image"
import { siteConfig } from "@/lib/site-config"

interface FooterProps {
  orgPhone?: string | null
}

export function Footer({ orgPhone }: FooterProps) {
  const email = siteConfig.contact.email

  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-4">
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
            <p className="text-sm text-gray-300">
              A community center providing social services, food assistance, and after-school programs with
              dignity and care.
            </p>
            <div className="text-sm text-gray-300">
              <p>{siteConfig.address.street}</p>
              <p>
                {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-300 transition-colors hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 transition-colors hover:text-white">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="text-gray-300 transition-colors hover:text-white">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-gray-300 transition-colors hover:text-white">
                  Donate
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>Email: {email}</p>
              {orgPhone ? (
                <p>
                  Phone:{" "}
                  <a href={`tel:${orgPhone.replace(/\s/g, "")}`} className="hover:text-white">
                    {orgPhone}
                  </a>
                </p>
              ) : null}
              <p>For immediate assistance or questions</p>
            </div>
            <div className="pt-4">
              <Link href="/donate">
                <button className="rounded-md bg-gradient-to-r from-red-600 to-indigo-900 px-6 py-2 text-white transition-colors hover:from-red-700 hover:to-indigo-900">
                  Support Our Mission
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} La Reunión. All rights reserved.</p>
          <p className="mt-1">Serving our community with dignity and care.</p>
        </div>
      </div>
    </footer>
  )
}
