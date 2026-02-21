import type { MetadataRoute } from "next";

const BASE_URL = "https://meyng.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["en", "fr"];
  const pages = ["", "/products", "/about", "/contact", "/privacy", "/terms"];

  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1.0 : 0.8,
        alternates: {
          languages: {
            en: `${BASE_URL}/en${page}`,
            fr: `${BASE_URL}/fr${page}`,
          },
        },
      });
    }
  }

  return entries;
}
