import siteData from "@/data/site.json";
import SectionRenderer from "@/lib/sectionRenderer";

export default function InnovationPage() {
  const sections = siteData.pages?.innovation?.sections || [];
  return <SectionRenderer sections={sections} />;
}
