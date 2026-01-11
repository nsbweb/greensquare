import SectionRenderer from "@/lib/sectionRenderer";
import siteData from "@/data/site.json";

export default function ProgramsPage() {
  const sections = siteData?.pages?.programs?.sections ?? [];
  return <SectionRenderer sections={sections} />;
}
