import siteData from "@/data/site.json";
import SectionRenderer from "@/lib/sectionRenderer";

export default function ParentsPage() {
  const sections = siteData?.pages?.parents?.sections || [];
  return <SectionRenderer sections={sections} />;
}