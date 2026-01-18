import siteData from "@/data/site.json";
import SectionRenderer from "@/lib/sectionRenderer";
import { notFound } from "next/navigation";

export default async function InnovationDetailPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  const page = siteData?.pages?.innovationDetail?.[slug];

  if (!page?.sections) {
    notFound();
  }

  return <SectionRenderer sections={page.sections} />;
}