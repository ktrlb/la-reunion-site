import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-red-50 via-red-100 to-indigo-100">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
            Welcome to{" "}
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
            A community center dedicated to providing essential services, fostering connections, 
            and building a stronger, more supportive community for all.
          </p>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-200 rounded-full opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full opacity-20"></div>
      </div>
    </div>
  )
}
