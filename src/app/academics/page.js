import SectionRenderer from "@/lib/sectionRenderer";
import siteData from "@/data/site.json";

export default function AcademicsPage() {
  const sections = siteData?.pages?.academics?.sections ?? [];
  return <SectionRenderer sections={sections} />;
}
