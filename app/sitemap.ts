import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";

const BASE_URL = "https://phmarket.cz";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/phmap`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/tankujte-levneji`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/cisteni-nadrzi`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/mikrozavozy-motorove-nafty`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/clanky`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE_URL}/clanky/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...articlePages];
}
