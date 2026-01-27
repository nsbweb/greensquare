// src/app/sitemap.js
const SITE_URL = "https://blueblocks.in/";

export default function sitemap() {
  const routes = [
    "/",
    "/about-us/",
    "/programs/",
    "/admissions/",
    "/campus/",
    "/innovation/",
    "/parents/",
    "/research-institute/",
    "/videos/",
    "/faq/",
    "/contact-us/",
    "/privacy-policy/",
    "/terms/",
  ];

  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
