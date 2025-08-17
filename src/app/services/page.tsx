import { Utensils, Users, Heart, BookOpen, Calendar, Phone, MapPin, Clock } from "lucide-react"
import Image from "next/image"

const services = [
  {
    id: "food-pantry",
    name: "Anjelita 'Helen' Best Food Pantry",
    description: "We provide nutritious food assistance to families and individuals in need through our partnership with the Tarrant Area Food Bank.",
    icon: Utensils,
    details: [
      "Fresh produce and non-perishable items from Tarrant Area Food Bank",
      "No appointment necessary during open hours",
      "Serving all community members with dignity and respect",
      "Member of the Tarrant Area Food Bank network"
    ],
    hours: "Every Thursday: 9:00 AM - 4:00 PM (Prep 9-12, Distribution 1-4)",
    contact: "For questions about food assistance, please contact us at info@la-reunion.org"
  },
  {
    id: "after-school",
    name: "After-School Program",
    description: "Supporting children's education and development through engaging activities.",
    icon: BookOpen,
    details: [
      "Homework help and tutoring support",
      "Educational enrichment activities",
      "Safe, supervised environment for children",
      "Partnerships with local schools and educators"
    ],
    hours: "Monday through Friday, 3:00 PM - 6:00 PM (School Year)",
    contact: "For enrollment information, please contact us at info@la-reunion.org"
  },
  {
    id: "resources",
    name: "Resource Connection",
    description: "Helping community members connect with available resources and support services.",
    icon: Heart,
    details: [
      "Information about local social services",
      "Referrals to healthcare providers",
      "Housing and employment resources",
      "Legal and financial assistance information"
    ],
    hours: "Available during all center hours",
    contact: "For resource information, please contact us at info@la-reunion.org"
  },
  {
    id: "activities",
    name: "Community Activities",
    description: "Fostering connections and building community through various events and programs.",
    icon: Users,
    details: [
      "Community gatherings and celebrations",
      "Educational workshops and classes",
      "Cultural events and activities",
      "Volunteer opportunities and service projects"
    ],
    hours: "Various times - check our calendar for upcoming events",
    contact: "For event information, please contact us at info@la-reunion.org"
  }
]

export default function ServicesPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-red-50 via-red-100 to-indigo-100">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
              Our Services at{" "}
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
              La Reunión provides a range of essential services designed to support our community 
              and strengthen the bonds that make us stronger together.
            </p>
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="space-y-24">
              {services.map((service, index) => (
                <div key={service.id} id={service.id} className="scroll-mt-20">
                  <div className={`grid grid-cols-1 gap-12 lg:grid-cols-2 ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}>
                    <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-red-600 to-indigo-900">
                          <service.icon className="h-6 w-6 text-white" aria-hidden="true" />
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                          {service.name}
                        </h2>
                      </div>
                      <p className="text-lg leading-8 text-gray-600 mb-6">
                        {service.description}
                      </p>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">What We Offer:</h3>
                        <ul className="space-y-2">
                          {service.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-start">
                              <div className="flex-shrink-0">
                                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-red-600 to-indigo-900 mt-2"></div>
                              </div>
                              <p className="ml-3 text-gray-600">{detail}</p>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <Calendar className="h-5 w-5 text-red-600 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-gray-900">Hours:</h4>
                            <p className="text-gray-600">{service.hours}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <Phone className="h-5 w-5 text-red-600 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-gray-900">Contact:</h4>
                            <p className="text-gray-600">{service.contact}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                      <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100">
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center">
                            <service.icon className="h-24 w-24 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500 text-sm">Service illustration</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
              We&apos;re proud to be a member of the Tarrant Area Food Bank network, ensuring our community 
              has access to fresh, nutritious food.
            </p>
          </div>
          <div className="text-center">
            <a
              href="https://tafb.org/"
              target="_blank"
              rel="noopener noreferrer"
                              className="inline-flex items-center rounded-md bg-gradient-to-r from-red-600 to-indigo-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:from-red-700 hover:to-indigo-900"
            >
              Learn More About TAFB
            </a>
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Visit Our Center
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              All our services are available at our community center in Oak Trail Shores, Texas.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                La Reunión Community Center
              </h3>
              <div className="space-y-3 text-gray-600">
                <p className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-red-600" />
                  <span>2723 Maplewood St</span>
                </p>
                <p className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-red-600" />
                  <span>Granbury, TX 76048</span>
                </p>
                <p className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-red-600" />
                  <span>Monday - Friday: 9:00 AM - 5:00 PM</span>
                </p>
                <p className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-red-600" />
                  <span>Food Pantry: Thursdays 1:00 PM - 4:00 PM</span>
                </p>
              </div>
              
              <div className="mt-6 space-y-3">
                <a
                  href="https://maps.google.com/?q=2723+Maplewood+St+Granbury+TX+76048"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md bg-gradient-to-r from-red-600 to-indigo-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:from-red-700 hover:to-indigo-900"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Get Directions
                </a>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-100 p-8 text-center">
                <div className="mb-4">
                  <MapPin className="h-16 w-16 text-red-600 mx-auto" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  La Reunión Community Center
                </h4>
                <p className="text-gray-600 mb-4">
                  2723 Maplewood St<br />
                  Granbury, TX 76048
                </p>
                <a
                  href="https://maps.google.com/?q=2723+Maplewood+St+Granbury+TX+76048"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md bg-gradient-to-r from-red-600 to-indigo-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:from-red-700 hover:to-indigo-900"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-gradient-to-r from-red-600 to-indigo-900 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Questions About Our Services?
          </h2>
          <p className="mt-4 text-lg text-red-100">
            We&apos;re here to help and would love to hear from you.
          </p>
          <div className="mt-8">
            <a
              href="mailto:info@la-reunion.org"
              className="inline-flex items-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-red-600 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
