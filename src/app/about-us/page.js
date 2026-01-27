export const metadata = {
  title: "About Us",
  description:
    "Blue Blocks in Hyderabad: our Montessori roots, innovation ecosystem, and the journey from 0–18.",
  alternates: { canonical: "/about-us/" },
};

import siteData from "@/data/site.json";
import SectionRenderer from "@/lib/sectionRenderer";

export default function AboutUsPage() {
  const sections = siteData.pages?.aboutUs?.sections || [];
  return <SectionRenderer sections={sections} />;
}
