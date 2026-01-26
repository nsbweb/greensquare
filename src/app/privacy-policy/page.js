import siteData from "@/data/site.json";
import SectionRenderer from "@/lib/sectionRenderer";

export default function PrivacyPolicyPage() {
  const sections = siteData?.pages?.privacyPolicy?.sections || [];
  return <SectionRenderer sections={sections} />;
}
