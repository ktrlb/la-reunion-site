import Image from "next/image"
import { MapPin } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-red-50 via-red-100 to-indigo-100">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
              About{" "}
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
              A community center dedicated to serving our neighbors with dignity, respect, and care.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Values */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              {/* Mission */}
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Our Mission
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  La Reunión exists to strengthen our community by providing essential services, 
                  fostering meaningful connections, and supporting individuals and families in times of need. 
                  We believe that every person deserves to be treated with dignity and respect.
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  As a faith-based organization, we are guided by our values of compassion, 
                  service, and community. However, we serve everyone regardless of their 
                  background, beliefs, or circumstances.
                </p>
              </div>

              {/* Values */}
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Our Values
                </h2>
                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Dignity</h3>
                    <p className="mt-2 text-gray-600">
                      We believe every person has inherent worth and deserves to be treated with respect.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Community</h3>
                    <p className="mt-2 text-gray-600">
                      We foster connections and build relationships that strengthen our neighborhood.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Service</h3>
                    <p className="mt-2 text-gray-600">
                      We are committed to meeting the real needs of our community with compassion and care.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Partnership</h3>
                    <p className="mt-2 text-gray-600">
                      We work collaboratively with other organizations and community members to maximize our impact.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Location
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Located in the heart of Granbury, Texas, we serve our community from our 
              welcoming community center on Maplewood Street.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                La Reunión Community Center
              </h3>
              <div className="space-y-3 text-gray-600">
                <p>2723 Maplewood St</p>
                <p>Granbury, TX 76048</p>
                <p className="mt-4 text-sm text-gray-500">
                  We're conveniently located in Oak Trail Shores. 
                  Our center serves as a welcoming space for all 
                  community members seeking support, connection, and resources.
                </p>
              </div>
              
              <div className="mt-6">
                <a
                  href="/contact"
                  className="inline-flex items-center rounded-md bg-gradient-to-r from-red-600 to-indigo-800 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:from-red-700 hover:to-indigo-900"
                >
                  Get Directions & Contact Info
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
                  className="inline-flex items-center rounded-md bg-gradient-to-r from-red-600 to-indigo-800 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:from-red-700 hover:to-indigo-900"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* History */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center mb-16">
              Our Story
            </h2>
            <div className="prose prose-lg mx-auto text-gray-600 max-w-4xl">
              <p>
                La Reunión has a rich history rooted in serving the uninsured and underserved 
                communities of Hood County, Texas. Our story begins with Ruth's Place Outreach Center, 
                which was originally part of the larger Ruth's Place organization.
              </p>
              
              <p>
                Initially located in Oak Trail Shores, Ruth's Place provided both medical and 
                non-medical services to the community. In 2019, the medical clinic (now known as 
                Ken Hill Health Center) moved to central Granbury, while the Outreach Center 
                remained in Oak Trail Shores, continuing to focus on essential non-medical programs.
              </p>
              
              <p>
                These vital programs included a food pantry, after-school activities, and ESL classes, 
                all designed to support and strengthen our community. The Outreach Center became a 
                cornerstone of Oak Trail Shores, providing essential services to families and 
                individuals in need.
              </p>
              
              <p>
                Recently, Ruth's Place partnered with First Christian Church of Granbury, which 
                will take over the Outreach Center's functions. This transition ensures the 
                continuation of these vital services in our community while marking the beginning 
                of a new chapter.
              </p>
              
              <p>
                <strong>Now, Ruth's Place Outreach Center is becoming La Reunión</strong> - a 
                community center dedicated to serving our neighbors with dignity, respect, and care. 
                We continue the legacy of providing essential social services, food assistance, 
                after-school programs, and community activities that make our community stronger.
              </p>
              
              <p>
                Today, La Reunión stands as a beacon of hope and support in our community, 
                building on the foundation of service established by Ruth's Place while creating 
                new opportunities to serve, connect, and strengthen the bonds that make us 
                a stronger, more resilient community.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-gradient-to-r from-red-600 to-indigo-800 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Want to Learn More?
          </h2>
          <p className="mt-4 text-lg text-red-100">
            We'd love to tell you more about our work and how you can get involved.
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
