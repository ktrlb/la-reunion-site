import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Organization Info */}
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
            <p className="text-gray-300 text-sm">
              A community center providing social services, food assistance, and 
              after-school programs with dignity and care.
            </p>
            <div className="text-gray-300 text-sm">
              <p>2723 Maplewood St</p>
              <p>Granbury, TX 76048</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="text-gray-300 hover:text-white transition-colors">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-gray-300 hover:text-white transition-colors">
                  Donate
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>Email: info@la-reunion.org</p>
              <p>For immediate assistance or questions</p>
            </div>
            <div className="pt-4">
              <Link href="/donate">
                <button className="bg-gradient-to-r from-red-600 to-indigo-800 hover:from-red-700 hover:to-indigo-900 text-white px-6 py-2 rounded-md transition-colors">
                  Support Our Mission
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} La Reunión. All rights reserved.</p>
          <p className="mt-1">Serving our community with dignity and care.</p>
        </div>
      </div>
    </footer>
  )
}
