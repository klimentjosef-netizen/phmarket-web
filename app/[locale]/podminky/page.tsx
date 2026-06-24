import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import LegalDoc from "@/components/LegalDoc";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, SITE_URL } from "@/lib/jsonld";
import { routing, type Locale } from "@/i18n/routing";
import { localizedAlternates } from "@/lib/seo";

const CONTACT_EMAIL = "legal@phmarket.cz";

// Official PDF (binding document) per language + suggested download filename
const PDF: Record<Locale, { href: string; download: string }> = {
  cs: { href: "/dokumenty/phmarket-obchodni-podminky-cz.pdf", download: "PHMarket-obchodni-podminky.pdf" },
  sk: { href: "/dokumenty/phmarket-obchodne-podmienky-sk.pdf", download: "PHMarket-obchodne-podmienky.pdf" },
  en: { href: "/dokumenty/phmarket-terms-of-service-en.pdf", download: "PHMarket-terms-of-service.pdf" },
  de: { href: "/dokumenty/phmarket-agb-de.pdf", download: "PHMarket-agb.pdf" },
  pl: { href: "/dokumenty/phmarket-regulamin-pl.pdf", download: "PHMarket-regulamin.pdf" },
  // Hungarian PDF not available yet — falls back to the English document.
  hu: { href: "/dokumenty/phmarket-terms-of-service-en.pdf", download: "PHMarket-terms-of-service.pdf" },
};

// Language switcher entries (label is always shown in the target language)
const LANG_LABEL: Record<Locale, string> = {
  cs: "🇨🇿 Čeština",
  sk: "🇸🇰 Slovenčina",
  en: "🇬🇧 English",
  de: "🇩🇪 Deutsch",
  pl: "🇵🇱 Polski",
  hu: "🇭🇺 Magyar",
};

type Content = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  subtitle: string;
  effectiveDate: string;
  intro: string;
  toc: string[];
};

const CONTENT_BASE = {
  cs: {
    metaTitle: "Všeobecné obchodní podmínky",
    metaDescription:
      "Všeobecné obchodní podmínky a licenční ujednání pro koncového uživatele mobilní aplikace PHMarket. Účinnost od 1. června 2026.",
    title: "Všeobecné obchodní podmínky",
    subtitle: "Licenční ujednání pro koncového uživatele mobilní aplikace PHMarket",
    effectiveDate: "1. června 2026",
    intro:
      "Tyto Všeobecné obchodní podmínky a licenční ujednání upravují práva a povinnosti mezi společností PHMarket s.r.o. a uživateli mobilní aplikace PHMarket. Před zahájením užívání aplikace si je prosím pečlivě přečtěte. Úplné a závazné znění naleznete v dokumentu níže.",
    toc: [
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
    ],
  },
  sk: {
    metaTitle: "Všeobecné obchodné podmienky",
    metaDescription:
      "Všeobecné obchodné podmienky a licenčné dojednanie pre koncového používateľa mobilnej aplikácie PHMarket. Účinnosť od 1. júna 2026.",
    title: "Všeobecné obchodné podmienky",
    subtitle: "Licenčné dojednanie pre koncového používateľa mobilnej aplikácie PHMarket",
    effectiveDate: "1. júna 2026",
    intro:
      "Tieto Všeobecné obchodné podmienky a licenčné dojednanie upravujú práva a povinnosti medzi spoločnosťou PHMarket s.r.o. a používateľmi mobilnej aplikácie PHMarket. Pred začatím používania aplikácie si ich, prosím, pozorne prečítajte. Úplné a záväzné znenie nájdete v dokumente nižšie.",
    toc: [
      "PREAMBULA",
      "ČLÁNOK 1: Definície a výklad pojmov",
      "ČLÁNOK 2: Spôsobilosť a vyhlásenia používateľa",
      "ČLÁNOK 3: Popis služby a jej dostupnosť",
      "ČLÁNOK 4: Používateľský účet a používanie bez registrácie",
      "ČLÁNOK 5: Licenčné dojednanie a obmedzenia používania",
      "ČLÁNOK 6: Zakázané konanie a nulová tolerancia nevhodného obsahu",
      "ČLÁNOK 7: Používateľský obsah a moderácia",
      "ČLÁNOK 8: Služba PusHMe",
      "ČLÁNOK 9: Komunitné hlásenia a komunitné stanice",
      "ČLÁNOK 10: Quality Program",
      "ČLÁNOK 10A: Hodnotenie kvality palív (Fuel Quality)",
      "ČLÁNOK 11: Flash Offers (PusHMe Drops)",
      "ČLÁNOK 12: Služby tretích strán a externé odkazy",
      "ČLÁNOK 13: Vernostný program PHM Cash",
      "ČLÁNOK 14: Push notifikácie a elektronická komunikácia",
      "ČLÁNOK 15: Budúce platené funkcie",
      "ČLÁNOK 16: Duševné vlastníctvo a spätná väzba",
      "ČLÁNOK 17: Vylúčenie záruk",
      "ČLÁNOK 18: Obmedzenie zodpovednosti",
      "ČLÁNOK 19: Odškodnenie",
      "ČLÁNOK 20: Vzdanie sa nárokov",
      "ČLÁNOK 21: Hlásenie nezákonného obsahu (DSA Notice-and-Action)",
      "ČLÁNOK 22: Bezpečnosť detí (CSAE Policy)",
      "ČLÁNOK 23: Ustanovenia špecifické pre Apple (iOS)",
      "ČLÁNOK 24: Ustanovenia špecifické pre Google (Android)",
      "ČLÁNOK 25: Rozhodné právo, jurisdikcia a riešenie sporov",
      "ČLÁNOK 26: Vyhlásenia a záruky používateľa",
      "ČLÁNOK 27: Zmeny podmienok",
      "ČLÁNOK 28: Záverečné ustanovenia",
      "ČLÁNOK 29: Kontaktné údaje prevádzkovateľa",
      "PRÍLOHA 1: Prevádzkové limity (Rate Limits a kvóty)",
    ],
  },
  en: {
    metaTitle: "Terms and Conditions",
    metaDescription:
      "General terms and conditions and end-user licence agreement for the PHMarket mobile app. Effective from 1 June 2026.",
    title: "Terms and Conditions",
    subtitle: "End-user licence agreement for the PHMarket mobile app",
    effectiveDate: "1 June 2026",
    intro:
      "These General Terms and Conditions and the end-user licence agreement govern the rights and obligations between PHMarket s.r.o. and users of the PHMarket mobile app. Please read them carefully before you start using the app. The complete and binding wording can be found in the document below.",
    toc: [
      "PREAMBLE",
      "ARTICLE 1: Definitions and interpretation",
      "ARTICLE 2: Eligibility and user representations",
      "ARTICLE 3: Description of the service and its availability",
      "ARTICLE 4: User account and use without registration",
      "ARTICLE 5: Licence agreement and usage restrictions",
      "ARTICLE 6: Prohibited conduct and zero tolerance for objectionable content",
      "ARTICLE 7: User content and moderation",
      "ARTICLE 8: The PusHMe service",
      "ARTICLE 9: Community reports and community stations",
      "ARTICLE 10: Quality Program",
      "ARTICLE 10A: Fuel Quality ratings",
      "ARTICLE 11: Flash Offers (PusHMe Drops)",
      "ARTICLE 12: Third-party services and external links",
      "ARTICLE 13: PHM Cash loyalty programme",
      "ARTICLE 14: Push notifications and electronic communication",
      "ARTICLE 15: Future paid features",
      "ARTICLE 16: Intellectual property and feedback",
      "ARTICLE 17: Disclaimer of warranties",
      "ARTICLE 18: Limitation of liability",
      "ARTICLE 19: Indemnification",
      "ARTICLE 20: Waiver of claims",
      "ARTICLE 21: Reporting illegal content (DSA Notice-and-Action)",
      "ARTICLE 22: Child safety (CSAE Policy)",
      "ARTICLE 23: Apple-specific provisions (iOS)",
      "ARTICLE 24: Google-specific provisions (Android)",
      "ARTICLE 25: Governing law, jurisdiction and dispute resolution",
      "ARTICLE 26: User representations and warranties",
      "ARTICLE 27: Changes to the terms",
      "ARTICLE 28: Final provisions",
      "ARTICLE 29: Operator contact details",
      "ANNEX 1: Operational limits (Rate Limits and quotas)",
    ],
  },
  de: {
    metaTitle: "Allgemeine Geschäftsbedingungen",
    metaDescription:
      "Allgemeine Geschäftsbedingungen und Endnutzer-Lizenzvereinbarung für die PHMarket-App. Gültig ab 1. Juni 2026.",
    title: "Allgemeine Geschäftsbedingungen",
    subtitle: "Endnutzer-Lizenzvereinbarung für die mobile App PHMarket",
    effectiveDate: "1. Juni 2026",
    intro:
      "Diese Allgemeinen Geschäftsbedingungen und die Endnutzer-Lizenzvereinbarung regeln die Rechte und Pflichten zwischen der PHMarket s.r.o. und den Nutzern der mobilen App PHMarket. Bitte lies sie sorgfältig, bevor du die App nutzt. Den vollständigen und verbindlichen Wortlaut findest du im Dokument unten.",
    toc: [
      "PRÄAMBEL",
      "ARTIKEL 1: Definitionen und Auslegung",
      "ARTIKEL 2: Berechtigung und Erklärungen des Nutzers",
      "ARTIKEL 3: Beschreibung des Dienstes und seine Verfügbarkeit",
      "ARTIKEL 4: Nutzerkonto und Nutzung ohne Registrierung",
      "ARTIKEL 5: Lizenzvereinbarung und Nutzungsbeschränkungen",
      "ARTIKEL 6: Verbotenes Verhalten und Nulltoleranz für anstößige Inhalte",
      "ARTIKEL 7: Nutzerinhalte und Moderation",
      "ARTIKEL 8: Der Dienst PusHMe",
      "ARTIKEL 9: Community-Meldungen und Community-Tankstellen",
      "ARTIKEL 10: Quality Program",
      "ARTIKEL 10A: Bewertung der Kraftstoffqualität (Fuel Quality)",
      "ARTIKEL 11: Flash Offers (PusHMe Drops)",
      "ARTIKEL 12: Dienste Dritter und externe Links",
      "ARTIKEL 13: Treueprogramm PHM Cash",
      "ARTIKEL 14: Push-Benachrichtigungen und elektronische Kommunikation",
      "ARTIKEL 15: Künftige kostenpflichtige Funktionen",
      "ARTIKEL 16: Geistiges Eigentum und Feedback",
      "ARTIKEL 17: Gewährleistungsausschluss",
      "ARTIKEL 18: Haftungsbeschränkung",
      "ARTIKEL 19: Freistellung",
      "ARTIKEL 20: Verzicht auf Ansprüche",
      "ARTIKEL 21: Meldung illegaler Inhalte (DSA Notice-and-Action)",
      "ARTIKEL 22: Kinderschutz (CSAE Policy)",
      "ARTIKEL 23: Apple-spezifische Bestimmungen (iOS)",
      "ARTIKEL 24: Google-spezifische Bestimmungen (Android)",
      "ARTIKEL 25: Anwendbares Recht, Gerichtsstand und Streitbeilegung",
      "ARTIKEL 26: Erklärungen und Zusicherungen des Nutzers",
      "ARTIKEL 27: Änderungen der Bedingungen",
      "ARTIKEL 28: Schlussbestimmungen",
      "ARTIKEL 29: Kontaktdaten des Betreibers",
      "ANHANG 1: Betriebsgrenzen (Rate Limits und Kontingente)",
    ],
  },
  pl: {
    metaTitle: "Regulamin",
    metaDescription:
      "Regulamin i umowa licencyjna dla użytkownika końcowego aplikacji mobilnej PHMarket. Obowiązuje od 1 czerwca 2026.",
    title: "Regulamin",
    subtitle: "Umowa licencyjna dla użytkownika końcowego aplikacji mobilnej PHMarket",
    effectiveDate: "1 czerwca 2026",
    intro:
      "Niniejszy Regulamin oraz umowa licencyjna dla użytkownika końcowego regulują prawa i obowiązki pomiędzy spółką PHMarket s.r.o. a użytkownikami aplikacji mobilnej PHMarket. Przed rozpoczęciem korzystania z aplikacji prosimy o uważne zapoznanie się z nimi. Pełną i wiążącą treść znajdziesz w dokumencie poniżej.",
    toc: [
      "PREAMBUŁA",
      "ARTYKUŁ 1: Definicje i wykładnia pojęć",
      "ARTYKUŁ 2: Zdolność i oświadczenia użytkownika",
      "ARTYKUŁ 3: Opis usługi i jej dostępność",
      "ARTYKUŁ 4: Konto użytkownika i korzystanie bez rejestracji",
      "ARTYKUŁ 5: Umowa licencyjna i ograniczenia korzystania",
      "ARTYKUŁ 6: Zakazane działania i zerowa tolerancja dla niewłaściwych treści",
      "ARTYKUŁ 7: Treści użytkownika i moderacja",
      "ARTYKUŁ 8: Usługa PusHMe",
      "ARTYKUŁ 9: Zgłoszenia społeczności i stacje społecznościowe",
      "ARTYKUŁ 10: Quality Program",
      "ARTYKUŁ 10A: Ocena jakości paliw (Fuel Quality)",
      "ARTYKUŁ 11: Flash Offers (PusHMe Drops)",
      "ARTYKUŁ 12: Usługi podmiotów trzecich i linki zewnętrzne",
      "ARTYKUŁ 13: Program lojalnościowy PHM Cash",
      "ARTYKUŁ 14: Powiadomienia push i komunikacja elektroniczna",
      "ARTYKUŁ 15: Przyszłe funkcje płatne",
      "ARTYKUŁ 16: Własność intelektualna i informacje zwrotne",
      "ARTYKUŁ 17: Wyłączenie gwarancji",
      "ARTYKUŁ 18: Ograniczenie odpowiedzialności",
      "ARTYKUŁ 19: Zwolnienie z odpowiedzialności",
      "ARTYKUŁ 20: Zrzeczenie się roszczeń",
      "ARTYKUŁ 21: Zgłaszanie nielegalnych treści (DSA Notice-and-Action)",
      "ARTYKUŁ 22: Bezpieczeństwo dzieci (CSAE Policy)",
      "ARTYKUŁ 23: Postanowienia specyficzne dla Apple (iOS)",
      "ARTYKUŁ 24: Postanowienia specyficzne dla Google (Android)",
      "ARTYKUŁ 25: Prawo właściwe, jurysdykcja i rozwiązywanie sporów",
      "ARTYKUŁ 26: Oświadczenia i gwarancje użytkownika",
      "ARTYKUŁ 27: Zmiany regulaminu",
      "ARTYKUŁ 28: Postanowienia końcowe",
      "ARTYKUŁ 29: Dane kontaktowe operatora",
      "ZAŁĄCZNIK 1: Limity operacyjne (Rate Limits i kwoty)",
    ],
  },
} satisfies Record<"cs" | "sk" | "pl" | "en" | "de", Content>;

// Hungarian chrome not translated yet (waiting for hu legal PDFs); fall back
// to the English content so /hu/podminky renders. TODO: translate + hu PDF.
const CONTENT: Record<Locale, Content> = { ...CONTENT_BASE, hu: CONTENT_BASE.en };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[locale];
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: localizedAlternates(locale, "/podminky"),
  };
}

export default async function PodminkyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = CONTENT[locale];

  const breadcrumb = breadcrumbSchema([
    { name: CONTENT[routing.defaultLocale].title, url: SITE_URL },
    { name: c.title },
  ]);

  const languages = routing.locales.map((l) => ({
    code: l,
    label: LANG_LABEL[l],
    href: PDF[l].href,
    current: l === locale,
  }));

  return (
    <>
      <JsonLd id="breadcrumb-podminky" data={breadcrumb} />
      <LegalDoc
        title={c.title}
        subtitle={c.subtitle}
        effectiveDate={c.effectiveDate}
        intro={c.intro}
        pdfHref={PDF[locale].href}
        downloadName={PDF[locale].download}
        toc={c.toc}
        languages={languages}
        contactEmail={CONTACT_EMAIL}
      />
    </>
  );
}
