import { Hero } from "@/components/sections/hero"
import { ServicesOverview } from "@/components/sections/services-overview"
import { CTA } from "@/components/sections/cta"
import type { PageSection } from "@/lib/cms/schemas"

export function renderHomeSection(section: PageSection) {
  if (!section.visible) return null
  switch (section.type) {
    case "hero":
      return <Hero key={section.id} />
    case "servicesOverview":
      return <ServicesOverview key={section.id} />
    case "cta":
      return <CTA key={section.id} />
    default:
      return null
  }
}

export function HomeSections({ sections }: { sections: PageSection[] }) {
  return (
    <>
      {sections.map((s) => renderHomeSection(s))}
    </>
  )
}
