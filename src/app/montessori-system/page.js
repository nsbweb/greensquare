import siteData from "@/data/site.json";
import SectionRenderer from "@/lib/sectionRenderer";

export default function MontessoriSystemPage() {
  const sections = siteData?.pages?.montessoriSystem?.sections || [];
  return <SectionRenderer sections={sections} />;
}
