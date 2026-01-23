import siteData from "@/data/site.json";
import SectionRenderer from "@/lib/sectionRenderer";
import { notFound } from "next/navigation";

export const dynamicParams = false;

const normalizeSlug = (v) =>
  String(v || "")
    .trim()
    .replace(/^\/+/, "")
    .replace(/\/+$/, "");

const getPageBySlug = (pages, slug) => {
  const s = normalizeSlug(slug);
  return pages?.[s] || pages?.[`${s}/`] || null;
};

export async function generateStaticParams() {
  const pages = siteData?.pages?.aboutUsDetail ?? {};
  return Object.keys(pages).map((k) => ({ slug: normalizeSlug(k) }));
}

export default async function AboutUsPage({ params }) {
  // ✅ Next 15: params may be a Promise
  const { slug } = await params;

  const pages = siteData?.pages?.aboutUsDetail ?? {};
  const page = getPageBySlug(pages, slug);

  if (!page?.sections) notFound();

  return <SectionRenderer sections={page.sections} />;
}