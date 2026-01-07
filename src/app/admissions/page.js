import siteData from "@/data/site.json";
import PageHero from "@/components/blocks/PageHero";
import SectionRenderer from "@/lib/sectionRenderer";

export default function AdmissionsPage() {
  const page = siteData.pages?.admissions;

  return (
    <>
      <PageHero
        title="Admissions"
        breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Admissions" }
        ]}
        bg={{
            base: "#F3E3CF",
            leftArc: "/ui/arc-left.png",
            rightArc: "/ui/arc-right.png"
        }}
        />
      <SectionRenderer sections={page?.sections || []} />
    </>
  );
}
