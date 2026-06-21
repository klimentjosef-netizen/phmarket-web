import { defineRouting } from "next-intl/routing";

export const locales = ["cs", "sk", "pl", "en", "de"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "cs",
  // Czech stays at "/", other languages get a prefix ("/en", "/sk", ...)
  localePrefix: "as-needed",
});
