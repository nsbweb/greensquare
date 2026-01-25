import siteData from "@/data/site.json";
import SectionRenderer from "@/lib/sectionRenderer";

export default function VideosPage() {
  const sections = siteData?.pages?.videos?.sections || [];
  return <SectionRenderer sections={sections} />;
}
