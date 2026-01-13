import siteData from "@/data/site.json";
import SectionRenderer from "@/lib/sectionRenderer";

export default function AboutUsPage() {
  const sections = siteData.pages?.aboutUs?.sections || [];
  return <SectionRenderer sections={sections} />;
}
