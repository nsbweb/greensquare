import siteData from "@/data/site.json";
import SectionRenderer from "@/lib/sectionRenderer";

export default function TermsPage() {
  const sections = siteData?.pages?.terms?.sections || [];
  return <SectionRenderer sections={sections} />;
}
