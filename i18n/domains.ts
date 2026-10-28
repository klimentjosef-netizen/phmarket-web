import type { Locale } from "./routing";

/**
 * Country domains. Each one serves its language at "/" (phmarket.sk → Slovak, phmarket.at → German …).
 * A domain only goes live once its DNS points to Vercel: switch `live` to true, otherwise
 * phmarket.cz/sk would redirect to a parked domain. Until then the language stays at phmarket.cz/<locale>.
 * Apex domains (phmarket.sk) are redirected to www in the Vercel project settings.
 */
export type CountryDomain = {
  domain: string;
  locale: Locale;
  live: boolean;
};

export const COUNTRY_DOMAINS: CountryDomain[] = [
  { domain: "www.phmarket.cz", locale: "cs", live: true },
  { domain: "www.phmarket.sk", locale: "sk", live: false },
  { domain: "www.phmarket.pl", locale: "pl", live: false },
  { domain: "www.phmarket.at", locale: "de", live: false },
  { domain: "www.phmarket.hu", locale: "hu", live: false },
  { domain: "www.phmarket.eu", locale: "en", live: false },
];

const MAIN = "https://www.phmarket.cz";

/** Live domain serving a locale, if any (Czech always lives on phmarket.cz). */
export function domainFor(locale: Locale): CountryDomain | undefined {
  return COUNTRY_DOMAINS.find((d) => d.live && d.locale === locale);
}

/**
 * Absolute URL of a page in a given locale: on its own country domain when live
 * ("https://www.phmarket.sk/phmap"), otherwise as a prefix on phmarket.cz ("https://www.phmarket.cz/sk/phmap").
 */
export function absoluteUrl(locale: Locale, path = ""): string {
  if (locale === "cs") return `${MAIN}${path || "/"}`;
  const d = domainFor(locale);
  if (d) return `https://${d.domain}${path || "/"}`;
  return `${MAIN}/${locale}${path}`;
}

/**
 * Local social profiles per language (Instagram, Facebook, TikTok of the given country).
 * A language without its own profiles falls back to the Czech ones. Fill in once the accounts exist.
 */
export type SocialProfiles = { instagram: string; facebook: string; tiktok: string };
export const SOCIAL: Partial<Record<Locale, Partial<SocialProfiles>>> = {
  cs: {
    instagram: "https://www.instagram.com/phmarket_cz/",
    facebook: "https://www.facebook.com/people/PHMarket/61577959808959/#",
    tiktok: "https://www.tiktok.com/@phmarket_cz",
  },
};
export function socialFor(locale: Locale): SocialProfiles {
  return { ...(SOCIAL.cs as SocialProfiles), ...(SOCIAL[locale] ?? {}) };
}
