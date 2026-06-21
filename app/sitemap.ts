import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { routing } from "@/i18n/routing";

const BASE_URL = "https://phmarket.cz";

// hreflang code for each locale (matches layout.tsx HREFLANG map)
const HREFLANG: Record<string, string> = {
  cs: "cs-CZ",
  sk: "sk-SK",
  pl: "pl-PL",
  en: "en",
  de: "de-DE",
};

// Czech stays at root, other languages get a prefix (localePrefix: "as-needed")
function localeUrl(locale: string, path: string) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${BASE_URL}${prefix}${path}`;
}

// Build the hreflang alternates map for a given path across all locales
function languagesFor(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[HREFLANG[locale]] = localeUrl(locale, path);
  }
  languages["x-default"] = localeUrl(routing.defaultLocale, path);
  return languages;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths: {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }[] = [
    { path: "", changeFrequency: "weekly", priority: 1.0 },
    { path: "/phmap", changeFrequency: "daily", priority: 0.9 },
    { path: "/tankujte-levneji", changeFrequency: "monthly", priority: 0.9 },
    { path: "/cisteni-nadrzi", changeFrequency: "monthly", priority: 0.8 },
    { path: "/mikrozavozy-motorove-nafty", changeFrequency: "monthly", priority: 0.8 },
    { path: "/clanky", changeFrequency: "weekly", priority: 0.8 },
    { path: "/podminky", changeFrequency: "yearly", priority: 0.3 },
    { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  ];

  const staticPages: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${BASE_URL}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
    alternates: { languages: languagesFor(p.path) },
  }));

  // Articles are Czech-only content (served under all locale prefixes but
  // canonicalised to the cs URL), so we list only the cs URL with no hreflang.
  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE_URL}/clanky/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...articlePages];
}
