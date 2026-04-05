import { HomeSections } from "@/components/cms/home-sections"
import { getPageSectionsCached } from "@/lib/cms/page-config-queries"

export default async function Home() {
  const sections = await getPageSectionsCached("/")
  return <HomeSections sections={sections} />
}
