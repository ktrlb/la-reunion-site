import { Heart, Users, Utensils, BookOpen, Mail } from "lucide-react"
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

      {/* Make a Donation Today */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Make a Donation Today
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Your generous support helps us continue providing essential services to our community. 
              Every donation makes a real difference in the lives of families and individuals we serve.
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              
              {/* Transitional Funding Information */}
              <div className="mb-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="text-sm text-gray-700">
                  <p className="font-medium mb-2 text-gray-900">About Your Donation</p>
                  <p>
                    We are currently in a transitional period as ownership of the nonprofit center transfers to its new entity. 
                    During this time, all donations will go to the designated fund at First Christian Church of Granbury, 
                    which can only be spent to support La Reunión&apos;s operations, programs and services. 
                    Your donation will continue to directly benefit our community center and its mission.
                  </p>
                </div>
              </div>

              {/* Donation Options */}
              <div className="text-center mb-8">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-red-600 to-indigo-900 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Support Our Mission
                </h3>
                <p className="text-gray-600 mb-6">
                  Make a secure donation through our trusted partner Aplos.
                </p>
                
                {/* Online Donation Button */}
                <div className="mb-8">
                  <a 
                    href="https://www.aplos.com/aws/give/fccgranbury/la-reunion"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-red-600 to-indigo-900 hover:from-red-700 hover:to-indigo-900 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 inline-flex items-center justify-center space-x-2"
                  >
                    <Heart className="h-5 w-5" />
                    <span>Donate Now</span>
                  </a>
                  
                  <p className="text-sm text-gray-500 mt-3">
                    Secure • Tax-deductible • Immediate confirmation
                  </p>
                </div>

                {/* Divider */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">or</span>
                  </div>
                </div>

                {/* Mail Donation Option */}
                <div className="text-center">
                  <p className="text-gray-600 mb-4 font-medium">
                    Donate by Mail
                  </p>
                  <div className="mb-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium text-gray-900 mb-2">Send checks to:</p>
                    <p className="font-mono text-gray-700">
                      First Christian Church of Granbury<br />
                      c/o La Reunión<br />
                      2109 W. US Hwy 377<br />
                      Granbury, TX 76048
                    </p>
                  </div>
                  <a
                    href="mailto:info@la-reunion.org?subject=Donation%20Inquiry"
                    className="inline-flex items-center text-red-600 hover:text-red-700 font-medium"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Contact us about donations
                  </a>
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
            Financial donations aren&apos;t the only way to help. There are many ways to support our mission.
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
      {/* Impact Areas */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Your Support Makes a Difference
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Here&apos;s how your generous donations help us serve our community every day.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {impactAreas.map((area, index) => (
              <div key={index} className="text-center">
                                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-r from-red-600 to-indigo-900 mb-4">
                  <area.icon className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {area.title}
                </h3>
                <p className="text-gray-600 mb-3">
                  {area.description}
                </p>
                <p className="text-sm bg-gradient-to-r from-red-600 to-indigo-900 bg-clip-text text-transparent font-medium">
                  {area.impact}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>




      {/* Contact CTA */}
      <div className="bg-gradient-to-r from-red-600 to-indigo-900 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Make a Difference?
          </h2>
          <p className="mt-4 text-lg text-red-100">
            Contact us today to learn more about how you can support La Reunión&apos;s mission.
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
