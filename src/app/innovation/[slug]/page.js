import siteData from "@/data/site.json";
import SectionRenderer from "@/lib/sectionRenderer";
import { notFound } from "next/navigation";

export const dynamicParams = false;

/* ---------- helpers ---------- */
const normalizeSlug = (v = "") =>
  String(v)
    .trim()
    .replace(/^\/+/, "")
    .replace(/\/+$/, "");

const getPage = (pages, slug) => {
  const s = normalizeSlug(slug);
  return pages?.[s] || pages?.[`${s}/`] || null;
};

/* ---------- static params ---------- */
export async function generateStaticParams() {
  const pages = siteData?.pages?.innovationDetail ?? {};
  return Object.keys(pages).map((k) => ({
    slug: normalizeSlug(k),
  }));
}

/* ---------- page ---------- */
export default async function InnovationDetailPage({ params }) {
  // ✅ Next 14/15: params may be a Promise
  const { slug } = await params;

  const pages = siteData?.pages?.innovationDetail ?? {};
  const page = getPage(pages, slug);

  if (!page?.sections) {
    notFound();
  }

  return <SectionRenderer sections={page.sections} />;
}
