import siteData from "@/data/site.json";
import SectionRenderer from "@/lib/sectionRenderer";

export default function ContactPage() {
  const sections = siteData?.pages?.contact?.sections || [];
  return <SectionRenderer sections={sections} />;
}
