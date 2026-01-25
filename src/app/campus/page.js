import siteData from "@/data/site.json";
import SectionRenderer from "@/lib/sectionRenderer";

export default function CampusPage() {
  const sections = siteData?.pages?.campus?.sections || [];
  return <SectionRenderer sections={sections} />;
}
