import siteData from "@/data/site.json";
import SectionRenderer from "@/lib/sectionRenderer";
import { notFound } from "next/navigation";

export default async function ProgramPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  const page = siteData?.pages?.programDetails?.[slug];

  if (!page?.sections) {
    notFound();
  }

  return <SectionRenderer sections={page.sections} />;
}
