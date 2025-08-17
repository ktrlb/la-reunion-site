import { Utensils, Users, Heart, BookOpen } from "lucide-react"

const services = [
  {
    name: "Anjelita 'Helen' Best Food Pantry",
    description: "Providing nutritious food assistance to families in need with dignity and respect. A member of the Tarrant Area Food Bank.",
    icon: Utensils,
    href: "/services#food-pantry"
  },
  {
    name: "After-School Program",
    description: "Supporting children's education and development through engaging activities and homework help.",
    icon: BookOpen,
    href: "/services#after-school"
  },
  {
    name: "Resource Connection",
    description: "Helping community members connect with available resources and support services.",
    icon: Heart,
    href: "/services#resources"
  },
  {
    name: "Community Activities",
    description: "Fostering connections and building community through various events and programs.",
    icon: Users,
    href: "/services#activities"
  }
]

export function ServicesOverview() {
  return (
    <div className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            La Reunión provides a range of essential services designed to support our community 
            and strengthen the bonds that make us stronger together.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            {services.map((service) => (
              <div key={service.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-red-600 to-indigo-900">
                    <service.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {service.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{service.description}</p>
                  <p className="mt-6">
                    <a 
                      href={service.href} 
                      className="text-sm font-semibold leading-6 bg-gradient-to-r from-red-600 to-indigo-900 bg-clip-text text-transparent hover:from-red-700 hover:to-indigo-900"
                    >
                      Learn more <span aria-hidden="true">→</span>
                    </a>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
