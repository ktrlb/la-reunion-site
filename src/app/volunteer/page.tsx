import { Users, Clock, Star, Mail, MapPin } from "lucide-react"
import Image from "next/image"

const volunteerOpportunities = [
  {
    title: "Anjelita 'Helen' Best Food Pantry Support",
    description: "Help organize and distribute food items from the Tarrant Area Food Bank, assist with client check-ins, and maintain pantry organization.",
    timeCommitment: "Thursdays 9:00 AM - 4:00 PM (Prep 9-12, Distribution 1-4)",
    skills: "Organization, customer service, compassion"
  },
  {
    title: "After-School Program Assistant",
    description: "Support children with homework, lead educational activities, and provide supervision during program hours.",
    timeCommitment: "Monday through Friday, 3:00 PM - 6:00 PM (School Year)",
    skills: "Patience, creativity, experience with children"
  },
  {
    title: "Grounds Maintenance Team",
    description: "Help maintain our community center grounds through mowing, weeding, power washing, and landscaping.",
    timeCommitment: "Flexible scheduling, typically 2-4 hours per week",
    skills: "Landscaping, maintenance, physical ability"
  },
  {
    title: "Administrative Support",
    description: "Assist with office tasks, data entry, phone calls, and general administrative duties.",
    timeCommitment: "Flexible, 2-6 hours per week",
    skills: "Organization, computer skills, attention to detail"
  },
  {
    title: "Event Planning & Support",
    description: "Help plan and coordinate community events, fundraisers, and special programs.",
    timeCommitment: "Varies by event",
    skills: "Event planning, communication, creativity"
  },
  {
    title: "Teen Program Support",
    description: "Support teen programs by providing healthy snacks, helping with activities, and creating a welcoming environment.",
    timeCommitment: "Varies by program, typically 2-3 hours per event",
    skills: "Youth engagement, creativity, organization"
  },
  {
    title: "Special Projects",
    description: "Contribute your unique skills and talents to help us better serve our community.",
    timeCommitment: "Varies by project",
    skills: "Your unique talents and interests"
  }
]

const benefits = [
  "Make a meaningful difference in your community",
  "Gain valuable experience and skills",
  "Meet new people and build relationships",
  "Learn about social services and community needs",
  "Contribute to positive change",
  "Flexible scheduling options"
]

export default function VolunteerPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-red-50 via-red-100 to-indigo-100">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
              Volunteer With{" "}
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
              Join our team of dedicated volunteers and help us serve our community with dignity, 
              respect, and care. Every hour you give makes a difference.
            </p>
          </div>
        </div>
      </div>

      {/* Why Volunteer */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Volunteer With Us?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Volunteering with La Reunión is more than just giving your time—it&apos;s about 
              building a stronger, more connected community together.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-red-600 to-indigo-800 mb-4">
                  <Star className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="text-gray-900">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Volunteer Opportunities */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Volunteer Opportunities
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We have various volunteer positions available to match your interests, skills, and schedule.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {volunteerOpportunities.map((opportunity, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {opportunity.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {opportunity.description}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-gray-600">
                      <strong>Time:</strong> {opportunity.timeCommitment}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-gray-600">
                      <strong>Skills:</strong> {opportunity.skills}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How to Get Started */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How to Get Started
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Ready to make a difference? Here&apos;s how you can begin volunteering with La Reunión.
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
                    Send us an email at info@la-reunion.org expressing your interest in volunteering. 
                    Tell us about your interests, skills, and availability.
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
                  <h3 className="text-lg font-semibold text-gray-900">Schedule a Meeting</h3>
                  <p className="text-gray-600">
                    We&apos;ll arrange a time to meet with you, discuss opportunities, and answer any questions 
                    you might have about volunteering with us.
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
                  <h3 className="text-lg font-semibold text-gray-900">Begin Volunteering</h3>
                  <p className="text-gray-600">
                    Once we find the right fit, you&apos;ll receive orientation and training, then begin 
                    making a difference in our community!
                  </p>
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
              Where We&apos;re Located
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Join us at our community center in Oak Trail Shores, Texas, where all our volunteer opportunities are based.
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
                  <span>Food Pantry: Thursdays 9:00 AM - 4:00 PM</span>
                </p>
              </div>
              
              <div className="mt-6 space-y-3">
                <a
                  href="https://maps.google.com/?q=2723+Maplewood+St+Granbury+TX+76048"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md bg-gradient-to-r from-red-600 to-indigo-800 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:from-red-700 hover:to-indigo-900"
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

      {/* Contact CTA */}
      <div className="bg-gradient-to-r from-red-600 to-indigo-800 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-lg text-red-100">
            We&apos;d love to hear from you and discuss how you can contribute to our mission.
          </p>
          <div className="mt-8">
            <a
              href="mailto:info@la-reunion.org?subject=Volunteer%20Interest"
              className="inline-flex items-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-red-600 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              <Mail className="h-4 w-4 mr-2" />
              Contact Us About Volunteering
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
