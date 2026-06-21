import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import LegalDoc from "@/components/LegalDoc";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, SITE_URL } from "@/lib/jsonld";
import { routing, type Locale } from "@/i18n/routing";
import { localizedAlternates } from "@/lib/seo";

const CONTACT_EMAIL = "privacy@phmarket.cz";

// Official PDF (binding document) per language + suggested download filename
const PDF: Record<Locale, { href: string; download: string }> = {
  cs: { href: "/dokumenty/phmarket-ochrana-osobnich-udaju-cz.pdf", download: "PHMarket-ochrana-osobnich-udaju.pdf" },
  sk: { href: "/dokumenty/phmarket-ochrana-osobnych-udajov-sk.pdf", download: "PHMarket-ochrana-osobnych-udajov.pdf" },
  en: { href: "/dokumenty/phmarket-privacy-policy-en.pdf", download: "PHMarket-privacy-policy.pdf" },
  de: { href: "/dokumenty/phmarket-datenschutz-de.pdf", download: "PHMarket-datenschutz.pdf" },
  pl: { href: "/dokumenty/phmarket-prywatnosc-pl.pdf", download: "PHMarket-prywatnosc.pdf" },
};

// Language switcher entries (label is always shown in the target language)
const LANG_LABEL: Record<Locale, string> = {
  cs: "🇨🇿 Čeština",
  sk: "🇸🇰 Slovenčina",
  en: "🇬🇧 English",
  de: "🇩🇪 Deutsch",
  pl: "🇵🇱 Polski",
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

const CONTENT: Record<Locale, Content> = {
  cs: {
    metaTitle: "Zásady ochrany osobních údajů",
    metaDescription:
      "Zásady ochrany osobních údajů aplikace PHMarket: jaké údaje zpracováváme, za jakým účelem, jak dlouho a jaká máte práva podle GDPR. Účinnost od 1. června 2026.",
    title: "Zásady ochrany osobních údajů",
    subtitle: "Jak PHMarket zpracovává a chrání vaše osobní údaje",
    effectiveDate: "1. června 2026",
    intro:
      "Tyto zásady popisují, jaké osobní údaje společnost PHMarket s.r.o. zpracovává v souvislosti s aplikací PHMarket, za jakým účelem a po jakou dobu, komu je předává a jaká máte práva podle obecného nařízení o ochraně osobních údajů (GDPR). Úplné znění naleznete v dokumentu níže.",
    toc: [
      "1. Úvod a kontakt na správce",
      "2. Rozsah působnosti a klíčové koncepty",
      "3. Kategorie zpracovávaných osobních údajů",
      "4. Účely zpracování a právní základy",
      "5. Doba uchování údajů",
      "6. Příjemci údajů a zpracovatelé",
      "7. Mezinárodní přenosy osobních údajů",
      "8. Vaše práva jako subjektu údajů",
      "9. Souhlasy v aplikaci a onboarding",
      "10. Cookies a podobné technologie",
      "11. Bezpečnost osobních údajů",
      "12. Děti a ochrana nezletilých",
      "13. Změny zásad",
      "14. Specifické informace pro platformu Apple (iOS)",
      "15. Specifické informace pro platformu Google (Android)",
      "16. Jak nás kontaktovat",
    ],
  },
  sk: {
    metaTitle: "Zásady ochrany osobných údajov",
    metaDescription:
      "Zásady ochrany osobných údajov aplikácie PHMarket: aké údaje spracúvame, za akým účelom, ako dlho a aké máte práva podľa GDPR. Účinnosť od 1. júna 2026.",
    title: "Zásady ochrany osobných údajov",
    subtitle: "Ako PHMarket spracúva a chráni vaše osobné údaje",
    effectiveDate: "1. júna 2026",
    intro:
      "Tieto zásady popisujú, aké osobné údaje spoločnosť PHMarket s.r.o. spracúva v súvislosti s aplikáciou PHMarket, za akým účelom a po akú dobu, komu ich odovzdáva a aké máte práva podľa všeobecného nariadenia o ochrane osobných údajov (GDPR). Úplné znenie nájdete v dokumente nižšie.",
    toc: [
      "1. Úvod a kontakt na správcu",
      "2. Rozsah pôsobnosti a kľúčové koncepty",
      "3. Kategórie spracúvaných osobných údajov",
      "4. Účely spracúvania a právne základy",
      "5. Doba uchovávania údajov",
      "6. Príjemcovia údajov a sprostredkovatelia",
      "7. Medzinárodné prenosy osobných údajov",
      "8. Vaše práva ako dotknutej osoby",
      "9. Súhlasy v aplikácii a onboarding",
      "10. Cookies a podobné technológie",
      "11. Bezpečnosť osobných údajov",
      "12. Deti a ochrana neplnoletých",
      "13. Zmeny zásad",
      "14. Špecifické informácie pre platformu Apple (iOS)",
      "15. Špecifické informácie pre platformu Google (Android)",
      "16. Ako nás kontaktovať",
    ],
  },
  en: {
    metaTitle: "Privacy Policy",
    metaDescription:
      "PHMarket privacy policy: what data we process, for what purpose, for how long and what rights you have under the GDPR. Effective from 1 June 2026.",
    title: "Privacy Policy",
    subtitle: "How PHMarket processes and protects your personal data",
    effectiveDate: "1 June 2026",
    intro:
      "This policy describes what personal data PHMarket s.r.o. processes in connection with the PHMarket app, for what purpose and for how long, to whom it is passed on and what rights you have under the General Data Protection Regulation (GDPR). The complete wording can be found in the document below.",
    toc: [
      "1. Introduction and controller contact",
      "2. Scope and key concepts",
      "3. Categories of personal data processed",
      "4. Purposes of processing and legal bases",
      "5. Data retention periods",
      "6. Data recipients and processors",
      "7. International transfers of personal data",
      "8. Your rights as a data subject",
      "9. Consents in the app and onboarding",
      "10. Cookies and similar technologies",
      "11. Security of personal data",
      "12. Children and protection of minors",
      "13. Changes to the policy",
      "14. Apple platform-specific information (iOS)",
      "15. Google platform-specific information (Android)",
      "16. How to contact us",
    ],
  },
  de: {
    metaTitle: "Datenschutzerklärung",
    metaDescription:
      "Datenschutzerklärung der PHMarket-App: welche Daten wir verarbeiten, zu welchem Zweck, wie lange und welche Rechte du nach der DSGVO hast. Gültig ab 1. Juni 2026.",
    title: "Datenschutzerklärung",
    subtitle: "Wie PHMarket deine personenbezogenen Daten verarbeitet und schützt",
    effectiveDate: "1. Juni 2026",
    intro:
      "Diese Erklärung beschreibt, welche personenbezogenen Daten die PHMarket s.r.o. im Zusammenhang mit der App PHMarket verarbeitet, zu welchem Zweck und für welche Dauer, an wen sie weitergegeben werden und welche Rechte du nach der Datenschutz-Grundverordnung (DSGVO) hast. Den vollständigen Wortlaut findest du im Dokument unten.",
    toc: [
      "1. Einleitung und Kontakt zum Verantwortlichen",
      "2. Geltungsbereich und Schlüsselbegriffe",
      "3. Kategorien der verarbeiteten personenbezogenen Daten",
      "4. Zwecke der Verarbeitung und Rechtsgrundlagen",
      "5. Speicherdauer der Daten",
      "6. Empfänger der Daten und Auftragsverarbeiter",
      "7. Internationale Übermittlung personenbezogener Daten",
      "8. Deine Rechte als betroffene Person",
      "9. Einwilligungen in der App und Onboarding",
      "10. Cookies und ähnliche Technologien",
      "11. Sicherheit personenbezogener Daten",
      "12. Kinder und Schutz Minderjähriger",
      "13. Änderungen der Erklärung",
      "14. Apple-plattformspezifische Informationen (iOS)",
      "15. Google-plattformspezifische Informationen (Android)",
      "16. Wie du uns kontaktierst",
    ],
  },
  pl: {
    metaTitle: "Polityka prywatności",
    metaDescription:
      "Polityka prywatności aplikacji PHMarket: jakie dane przetwarzamy, w jakim celu, jak długo i jakie masz prawa zgodnie z RODO. Obowiązuje od 1 czerwca 2026.",
    title: "Polityka prywatności",
    subtitle: "Jak PHMarket przetwarza i chroni Twoje dane osobowe",
    effectiveDate: "1 czerwca 2026",
    intro:
      "Niniejsza polityka opisuje, jakie dane osobowe spółka PHMarket s.r.o. przetwarza w związku z aplikacją PHMarket, w jakim celu i przez jaki czas, komu je przekazuje oraz jakie masz prawa zgodnie z ogólnym rozporządzeniem o ochronie danych (RODO). Pełną treść znajdziesz w dokumencie poniżej.",
    toc: [
      "1. Wprowadzenie i kontakt z administratorem",
      "2. Zakres obowiązywania i kluczowe pojęcia",
      "3. Kategorie przetwarzanych danych osobowych",
      "4. Cele przetwarzania i podstawy prawne",
      "5. Okres przechowywania danych",
      "6. Odbiorcy danych i podmioty przetwarzające",
      "7. Międzynarodowe przekazywanie danych osobowych",
      "8. Twoje prawa jako osoby, której dane dotyczą",
      "9. Zgody w aplikacji i onboarding",
      "10. Pliki cookie i podobne technologie",
      "11. Bezpieczeństwo danych osobowych",
      "12. Dzieci i ochrona małoletnich",
      "13. Zmiany polityki",
      "14. Informacje specyficzne dla platformy Apple (iOS)",
      "15. Informacje specyficzne dla platformy Google (Android)",
      "16. Jak się z nami skontaktować",
    ],
  },
};

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
    alternates: localizedAlternates(locale, "/privacy-policy"),
  };
}

export default async function PrivacyPolicyPage({
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
      <JsonLd id="breadcrumb-privacy" data={breadcrumb} />
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
