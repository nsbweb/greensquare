import siteData from "@/data/site.json";
import SectionRenderer from "@/lib/sectionRenderer";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export async function generateStaticParams() {
  const pages = siteData?.pages?.programDetails ?? {};
  return Object.keys(pages).map((slug) => ({ slug }));
}

export default function ProgramPage({ params }) {
  const slug = params?.slug;

  const page = siteData?.pages?.programDetails?.[slug];

  if (!page?.sections) {
    notFound();
  }

  return <SectionRenderer sections={page.sections} />;
}
