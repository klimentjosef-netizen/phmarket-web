import { routing, type Locale } from "@/i18n/routing";

// hreflang code for each app locale (used in <link rel="alternate"> and sitemap)
export const HREFLANG: Record<Locale, string> = {
  cs: "cs-CZ",
  sk: "sk-SK",
  pl: "pl-PL",
  en: "en",
  de: "de-DE",
};

// Czech stays at the root ("/"), other locales get a prefix ("/en/phmap").
// Returns a root-relative path; metadataBase resolves it to an absolute URL.
export function localePath(locale: Locale, path = ""): string {
  return locale === routing.defaultLocale ? path || "/" : `/${locale}${path}`;
}

// Self-referencing canonical + full hreflang set (incl. x-default) for a page
// that exists in every locale. `path` is the locale-less route, e.g. "/phmap".
export function localizedAlternates(locale: Locale, path = "") {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[HREFLANG[l]] = localePath(l, path);
  languages["x-default"] = localePath(routing.defaultLocale, path);
  return { canonical: localePath(locale, path), languages };
}
