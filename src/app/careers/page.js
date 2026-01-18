import siteData from "@/data/site.json";
import SectionRenderer from "@/lib/sectionRenderer";

export default function CareersPage() {
  const sections = siteData?.pages?.careers?.sections || [];
  return <SectionRenderer sections={sections} />;
}
