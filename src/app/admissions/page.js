import siteData from "@/data/site.json";
import SectionRenderer from "@/lib/sectionRenderer";

export default function AdmissionsPage() {
  const sections = siteData?.pages?.admissions?.sections || [];
  return <SectionRenderer sections={sections} />;
}
