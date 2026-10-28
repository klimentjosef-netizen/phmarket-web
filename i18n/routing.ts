import { defineRouting } from "next-intl/routing";
import { COUNTRY_DOMAINS } from "./domains";

export const locales = ["cs", "sk", "pl", "en", "de", "hu"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "cs",
  // Czech stays at "/", other languages get a prefix ("/en", "/sk", ...)
  localePrefix: "as-needed",
  // No Accept-Language auto-redirect: every URL is deterministic for crawlers,
  // language is chosen explicitly via the switcher / hreflang.
  localeDetection: false,
  // Country domains (phmarket.sk, phmarket.at …) serve their language at "/". Only live ones,
  // see i18n/domains.ts. Locales without a live domain stay as a prefix on phmarket.cz.
  ...(COUNTRY_DOMAINS.some((d) => d.live && d.locale !== "cs")
    ? {
        domains: COUNTRY_DOMAINS.filter((d) => d.live).map((d) => ({
          domain: d.domain,
          defaultLocale: d.locale,
          // phmarket.cz keeps every language without its own domain as /<locale>
          locales:
            d.locale === "cs"
              ? locales.filter((l) => l === "cs" || !COUNTRY_DOMAINS.some((x) => x.live && x.locale === l))
              : [d.locale],
        })),
      }
    : {}),
});
