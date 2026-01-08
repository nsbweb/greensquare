import siteData from "@/data/site.json";
import SectionRenderer from "@/lib/sectionRenderer";

export default function ResearchInstitutePage() {
  const sections = siteData?.pages?.researchInstitute?.sections || [];
  return <SectionRenderer sections={sections} />;
}
