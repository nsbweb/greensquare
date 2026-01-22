import siteData from "@/data/site.json";
import SectionRenderer from "@/lib/sectionRenderer";
import { notFound } from "next/navigation";

export const dynamicParams = false; // only build known slugs from generateStaticParams

export async function generateStaticParams() {
  const pages = siteData?.pages?.aboutUsDetail ?? {};
  return Object.keys(pages).map((slug) => ({ slug }));
}

export default function AboutUsPage({ params }) {
  const slug = params?.slug;

  const page = siteData?.pages?.aboutUsDetail?.[slug];

  if (!page?.sections) {
    notFound();
  }

  return <SectionRenderer sections={page.sections} />;
}
