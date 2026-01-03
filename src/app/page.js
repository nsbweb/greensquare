import siteData from "@/data/site.json";
import SectionRenderer from "@/lib/sectionRenderer";

export default function HomePage() {
  const sections = siteData?.pages?.home?.sections || [];
  return <SectionRenderer sections={sections} />;
}
