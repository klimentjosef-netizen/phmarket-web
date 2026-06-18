import type { Metadata } from "next";
import LegalDoc from "@/components/LegalDoc";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, SITE_URL } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Zásady ochrany osobních údajů",
  description:
    "Zásady ochrany osobních údajů aplikace PHMarket — jaké údaje zpracováváme, za jakým účelem, jak dlouho a jaká máte práva podle GDPR. Účinnost od 1. června 2026.",
  alternates: { canonical: "/privacy-policy" },
};

const breadcrumb = breadcrumbSchema([
  { name: "Domů", url: SITE_URL },
  { name: "Zásady ochrany osobních údajů" },
]);

const toc = [
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
];

const languages = [
  { code: "cs", label: "🇨🇿 Čeština", href: "/dokumenty/phmarket-ochrana-osobnich-udaju-cz.pdf", current: true },
  { code: "sk", label: "🇸🇰 Slovenčina", href: "/dokumenty/phmarket-ochrana-osobnych-udajov-sk.pdf" },
  { code: "en", label: "🇬🇧 English", href: "/dokumenty/phmarket-privacy-policy-en.pdf" },
  { code: "de", label: "🇩🇪 Deutsch", href: "/dokumenty/phmarket-datenschutz-de.pdf" },
  { code: "pl", label: "🇵🇱 Polski", href: "/dokumenty/phmarket-prywatnosc-pl.pdf" },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd id="breadcrumb-privacy" data={breadcrumb} />
      <LegalDoc
        title="Zásady ochrany osobních údajů"
        subtitle="Jak PHMarket zpracovává a chrání vaše osobní údaje"
        effectiveDate="1. června 2026"
        intro="Tyto zásady popisují, jaké osobní údaje společnost PHMarket s.r.o. zpracovává v souvislosti s aplikací PHMarket, za jakým účelem a po jakou dobu, komu je předává a jaká máte práva podle obecného nařízení o ochraně osobních údajů (GDPR). Úplné znění naleznete v dokumentu níže."
        pdfHref="/dokumenty/phmarket-ochrana-osobnich-udaju-cz.pdf"
        downloadName="PHMarket-ochrana-osobnich-udaju.pdf"
        toc={toc}
        languages={languages}
        contactEmail="privacy@phmarket.cz"
      />
    </>
  );
}
