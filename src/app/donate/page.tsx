import { Heart, Users, Utensils, BookOpen, DollarSign, Mail } from "lucide-react"
import Image from "next/image"

const impactAreas = [
  {
    title: "Anjelita 'Helen' Best Food Pantry",
    description: "Help us provide nutritious food to families in need through our partnership with the Tarrant Area Food Bank.",
    icon: Utensils,
    impact: "Every $25 provides a week's worth of groceries for a family"
  },
  {
    title: "After-School Programs",
    description: "Support children's education and development through our enrichment programs.",
    icon: BookOpen,
    impact: "Every $50 provides a month of after-school support for a child"
  },
  {
    title: "Community Building",
    description: "Help us create spaces and opportunities for community connection and growth.",
    icon: Users,
    impact: "Every $100 helps us host community events and activities"
  },
  {
    title: "Resource Connection",
    description: "Support our efforts to connect community members with vital resources and services.",
    icon: Heart,
    impact: "Every $75 helps us provide resource navigation for 10 families"
  }
]

const donationLevels = [
  {
    amount: "$25",
    title: "Community Supporter",
    description: "Provides a week of groceries for a family in need"
  },
  {
    amount: "$50",
    title: "Program Partner",
    description: "Supports a child in our after-school program for a month"
  },
  {
    amount: "$100",
    title: "Community Builder",
    description: "Helps us host community events and activities"
  },
  {
    amount: "$250",
    title: "Impact Champion",
    description: "Provides comprehensive support for multiple families"
  },
  {
    amount: "$500",
    title: "Mission Partner",
    description: "Sustains our core programs and services"
  }
]

export default function DonatePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-red-50 via-red-100 to-indigo-100">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
              Support{" "}
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
              Your donation helps La Reunión provide essential services, build community connections, 
              and support families in need. Every gift makes a difference.
            </p>
          </div>
        </div>
      </div>

      {/* Impact Areas */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Your Support Makes a Difference
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Here's how your generous donations help us serve our community every day.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {impactAreas.map((area, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-r from-red-600 to-indigo-800 mb-4">
                  <area.icon className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {area.title}
                </h3>
                <p className="text-gray-600 mb-3">
                  {area.description}
                </p>
                <p className="text-sm bg-gradient-to-r from-red-600 to-indigo-800 bg-clip-text text-transparent font-medium">
                  {area.impact}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TAFB Partnership Section */}
      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Food Bank Partnership
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We're proud to be a member of the Tarrant Area Food Bank network, ensuring our community 
              has access to fresh, nutritious food through our Anjelita "Helen" Best Food Pantry.
            </p>
          </div>
          <div className="text-center">
            <a
              href="https://tafb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md bg-gradient-to-r from-red-600 to-indigo-800 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:from-red-700 hover:to-indigo-900"
            >
              Learn More About TAFB
            </a>
          </div>
        </div>
      </div>

      {/* Donation Levels */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Choose Your Impact Level
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Select a donation amount that fits your budget and see the direct impact of your generosity.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {donationLevels.map((level, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-red-600 to-indigo-800 bg-clip-text text-transparent mb-2">
                  {level.amount}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {level.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {level.description}
                </p>
                <a
                  href={`mailto:info@la-reunion.org?subject=Donation%20-%20${encodeURIComponent(level.title)}&body=I%20would%20like%20to%20donate%20${encodeURIComponent(level.amount)}%20to%20support%20La%20Reuni%C3%B3n's%20mission.`}
                  className="inline-flex items-center rounded-md bg-gradient-to-r from-red-600 to-indigo-800 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:from-red-700 hover:to-indigo-900"
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  Donate {level.amount}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How to Donate */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How to Donate
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We're currently setting up our donation system. For now, please contact us directly 
              to make a donation or learn about other ways to support our mission.
            </p>
          </div>

          <div className="mx-auto max-w-3xl">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-indigo-800 text-white font-semibold">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Contact Us</h3>
                  <p className="text-gray-600">
                    Send us an email at info@la-reunion.org expressing your interest in donating. 
                    Include the amount you'd like to donate and any specific program you'd like to support.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-indigo-800 text-white font-semibold">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">We'll Get Back to You</h3>
                  <p className="text-gray-600">
                    We'll respond within 24 hours with donation instructions and answer any 
                    questions you might have about how your gift will be used.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-indigo-800 text-white font-semibold">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Complete Your Donation</h3>
                  <p className="text-gray-600">
                    We'll provide you with secure donation options and confirm receipt of your gift. 
                    You'll also receive updates on how your donation is making a difference.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Other Ways to Support */}
      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Other Ways to Support
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Financial donations aren't the only way to help. There are many ways to support our mission.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Users className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Volunteer</h3>
              <p className="text-gray-600 mb-4">
                Give your time and talents to help us serve our community.
              </p>
              <a
                href="/volunteer"
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Learn More →
              </a>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Heart className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Spread the Word</h3>
              <p className="text-gray-600 mb-4">
                Tell others about our services and mission.
              </p>
              <a
                href="/contact"
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Contact Us →
              </a>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Mail className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Partnership</h3>
              <p className="text-gray-600 mb-4">
                Explore ways your organization can partner with us.
              </p>
              <a
                href="mailto:info@la-reunion.org?subject=Partnership%20Inquiry"
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Get in Touch →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-gradient-to-r from-red-600 to-indigo-800 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Make a Difference?
          </h2>
          <p className="mt-4 text-lg text-red-100">
            Contact us today to learn more about how you can support La Reunión's mission.
          </p>
          <div className="mt-8">
            <a
              href="mailto:info@la-reunion.org?subject=Donation%20Inquiry"
              className="inline-flex items-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-red-600 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              <Mail className="h-4 w-4 mr-2" />
              Contact Us About Donating
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
