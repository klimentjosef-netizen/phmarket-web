import type { Metadata } from "next";
import LegalDoc from "@/components/LegalDoc";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, SITE_URL } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Všeobecné obchodní podmínky",
  description:
    "Všeobecné obchodní podmínky a licenční ujednání pro koncového uživatele mobilní aplikace PHMarket. Účinnost od 1. června 2026.",
  alternates: { canonical: "/podminky" },
};

const breadcrumb = breadcrumbSchema([
  { name: "Domů", url: SITE_URL },
  { name: "Všeobecné obchodní podmínky" },
]);

const toc = [
  "PREAMBULE",
  "ČLÁNEK 1: Definice a výklad pojmů",
  "ČLÁNEK 2: Způsobilost a prohlášení uživatele",
  "ČLÁNEK 3: Popis služby a její dostupnost",
  "ČLÁNEK 4: Uživatelský účet a užívání bez registrace",
  "ČLÁNEK 5: Licenční ujednání a omezení užívání",
  "ČLÁNEK 6: Zakázané jednání a nulová tolerance objektivního obsahu",
  "ČLÁNEK 7: Uživatelský obsah a moderace",
  "ČLÁNEK 8: Služba PusHMe",
  "ČLÁNEK 9: Komunitní hlášení a komunitní stanice",
  "ČLÁNEK 10: Quality Program",
  "ČLÁNEK 10A: Hodnocení kvality paliv (Fuel Quality)",
  "ČLÁNEK 11: Flash Offers (PusHMe Drops)",
  "ČLÁNEK 12: Služby třetích stran a externí odkazy",
  "ČLÁNEK 13: Věrnostní program PHM Cash",
  "ČLÁNEK 14: Push notifikace a elektronická komunikace",
  "ČLÁNEK 15: Budoucí placené funkce",
  "ČLÁNEK 16: Duševní vlastnictví a zpětná vazba",
  "ČLÁNEK 17: Vyloučení záruk",
  "ČLÁNEK 18: Omezení odpovědnosti",
  "ČLÁNEK 19: Indemnifikace",
  "ČLÁNEK 20: Vzdání se nároků",
  "ČLÁNEK 21: Hlášení nezákonného obsahu (DSA Notice-and-Action)",
  "ČLÁNEK 22: Bezpečnost dětí (CSAE Policy)",
  "ČLÁNEK 23: Ustanovení specifická pro Apple (iOS)",
  "ČLÁNEK 24: Ustanovení specifická pro Google (Android)",
  "ČLÁNEK 25: Rozhodné právo, jurisdikce a řešení sporů",
  "ČLÁNEK 26: Prohlášení a záruky uživatele",
  "ČLÁNEK 27: Změny podmínek",
  "ČLÁNEK 28: Závěrečná ustanovení",
  "ČLÁNEK 29: Kontaktní údaje provozovatele",
  "PŘÍLOHA 1: Provozní limity (Rate Limits a kvóty)",
];

const languages = [
  { code: "cs", label: "🇨🇿 Čeština", href: "/dokumenty/phmarket-obchodni-podminky-cz.pdf", current: true },
  { code: "sk", label: "🇸🇰 Slovenčina", href: "/dokumenty/phmarket-obchodne-podmienky-sk.pdf" },
  { code: "en", label: "🇬🇧 English", href: "/dokumenty/phmarket-terms-of-service-en.pdf" },
  { code: "de", label: "🇩🇪 Deutsch", href: "/dokumenty/phmarket-agb-de.pdf" },
  { code: "pl", label: "🇵🇱 Polski", href: "/dokumenty/phmarket-regulamin-pl.pdf" },
];

export default function PodminkyPage() {
  return (
    <>
      <JsonLd id="breadcrumb-podminky" data={breadcrumb} />
      <LegalDoc
        title="Všeobecné obchodní podmínky"
        subtitle="Licenční ujednání pro koncového uživatele mobilní aplikace PHMarket"
        effectiveDate="1. června 2026"
        intro="Tyto Všeobecné obchodní podmínky a licenční ujednání upravují práva a povinnosti mezi společností PHMarket s.r.o. a uživateli mobilní aplikace PHMarket. Před zahájením užívání aplikace si je prosím pečlivě přečtěte. Úplné a závazné znění naleznete v dokumentu níže."
        pdfHref="/dokumenty/phmarket-obchodni-podminky-cz.pdf"
        downloadName="PHMarket-obchodni-podminky.pdf"
        toc={toc}
        languages={languages}
        contactEmail="legal@phmarket.cz"
      />
    </>
  );
}
