import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { routing, type Locale } from "@/i18n/routing";
import { absoluteUrl, domainFor, COUNTRY_DOMAINS } from "@/i18n/domains";
import { headers } from "next/headers";

const BASE_URL = "https://www.phmarket.cz";

// hreflang code for each locale (matches layout.tsx HREFLANG map)
const HREFLANG: Record<string, string> = {
  cs: "cs-CZ",
  sk: "sk-SK",
  pl: "pl-PL",
  en: "en",
  de: "de",
  hu: "hu-HU",
};

// Czech stays at root, other languages get a prefix (localePrefix: "as-needed")
// (or on its own country domain once that is live, see i18n/domains.ts)
function localeUrl(locale: string, path: string) {
  if (locale !== routing.defaultLocale && domainFor(locale as Locale)) return absoluteUrl(locale as Locale, path);
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

const SITE_PATHS: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
  }[] = [
  { path: "", changeFrequency: "weekly", priority: 1.0 },
  { path: "/phmap", changeFrequency: "daily", priority: 0.9 },
  { path: "/tankujte-levneji", changeFrequency: "monthly", priority: 0.9 },
  { path: "/cisteni-nadrzi", changeFrequency: "monthly", priority: 0.8 },
  { path: "/mikrozavozy-motorove-nafty", changeFrequency: "monthly", priority: 0.8 },
  { path: "/pro-cerpaci-stanice", changeFrequency: "monthly", priority: 0.8 },
  { path: "/clanky", changeFrequency: "weekly", priority: 0.8 },
  { path: "/podminky", changeFrequency: "yearly", priority: 0.3 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  // A country domain lists only its own language; phmarket.cz lists Czech (+ languages without a domain).
  const host = headers().get("host")?.replace(/^(?!www\.)/, "www.") ?? "";
  const own = COUNTRY_DOMAINS.find((d) => d.live && d.domain === host && d.locale !== "cs");
  if (own) {
    return SITE_PATHS.map((p) => ({
      url: absoluteUrl(own.locale, p.path),
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
      alternates: { languages: languagesFor(p.path) },
    }));
  }

  const staticPaths = SITE_PATHS;


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
