import siteData from "@/data/site.json";
import SectionRenderer from "@/lib/sectionRenderer";

export default function FaqPage() {
  const sections = siteData?.pages?.faq?.sections || [];
  return <SectionRenderer sections={sections} />;
}
