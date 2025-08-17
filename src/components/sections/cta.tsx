import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <div className="bg-gradient-to-r from-red-600 to-indigo-800">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Join Us in Building a Stronger Community
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-red-100">
            Whether you&apos;re looking for support, want to volunteer, or hope to partner with us, 
            we&apos;d love to connect. Together, we can make a difference.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/volunteer">
              <Button variant="outline" size="lg" className="bg-white text-red-600 hover:bg-gray-50 border-white">
                Volunteer With Us
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" size="lg" className="text-white hover:bg-red-700 hover:text-white">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
