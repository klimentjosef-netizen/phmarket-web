export const SITE_URL = "https://phmarket.cz";
export const ORG_ID = `${SITE_URL}/#organization`;

const APP_STORE_URL = "https://apps.apple.com/pl/app/phmarket-obchod/id6753677131";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=branded.m8391e3c5a7fa40ff980dd3ec24d7cd28.phmarket";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: "PHMarket s.r.o.",
  alternateName: "PHMarket",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/logo.png`,
    width: 384,
    height: 384,
  },
  description:
    "Česká aplikace pro úspory na tankování pomocí slevových kódů na partnerských čerpacích stanicích. Bez registrace a plastových karet.",
  foundingDate: "2015",
  taxID: "04529031",
  vatID: "CZ04529031",
  legalName: "PHMarket s.r.o.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Hlavní třída 87/2",
    addressLocality: "Český Těšín",
    postalCode: "73701",
    addressCountry: "CZ",
  },
  sameAs: [
    "https://www.instagram.com/phmarket_cz/",
    "https://www.facebook.com/people/PHMarket/61577959808959/",
    "https://www.tiktok.com/@phmarket_cz",
    APP_STORE_URL,
    PLAY_STORE_URL,
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    areaServed: "CZ",
    availableLanguage: ["Czech", "Slovak", "Polish", "English", "German"],
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "PHMarket",
  inLanguage: "cs-CZ",
  publisher: { "@id": ORG_ID },
};

export const mobileApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: "PHMarket",
  operatingSystem: "iOS 14.0+, Android 8.0+",
  applicationCategory: "TravelApplication",
  applicationSubCategory: "Fuel Discount",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "CZK",
  },
  description:
    "Aplikace pro slevové kódy na tankování v ČR. Bez registrace a plastových karet.",
  downloadUrl: [APP_STORE_URL, PLAY_STORE_URL],
  publisher: { "@id": ORG_ID },
};

export type ServiceSchemaInput = {
  id: string;
  serviceType: string;
  name: string;
  description: string;
  audience?: string;
  priceDescription?: string;
};

export function serviceSchema(s: ServiceSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${s.id}`,
    serviceType: s.serviceType,
    name: s.name,
    description: s.description,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Česká republika" },
    ...(s.audience
      ? {
          audience: {
            "@type": "BusinessAudience",
            audienceType: s.audience,
          },
        }
      : {}),
    ...(s.priceDescription
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "CZK",
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "CZK",
              description: s.priceDescription,
            },
          },
        }
      : {}),
  };
}

export type FaqItem = { question: string; answer: string };

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.answer,
      },
    })),
  };
}

export type ArticleSchemaInput = {
  title: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  description: string;
  image?: string | null;
  wordCount?: number;
};

export function articleSchema(a: ArticleSchemaInput) {
  const url = `${SITE_URL}/clanky/${a.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    datePublished: a.datePublished,
    dateModified: a.dateModified || a.datePublished,
    inLanguage: "cs-CZ",
    author: {
      "@type": "Organization",
      name: "PHMarket",
      url: SITE_URL,
    },
    publisher: { "@id": ORG_ID },
    image: a.image
      ? {
          "@type": "ImageObject",
          url: a.image.startsWith("http") ? a.image : `${SITE_URL}${a.image}`,
        }
      : undefined,
    mainEntityOfPage: url,
    url,
    ...(a.wordCount ? { wordCount: a.wordCount } : {}),
  };
}

export type BreadcrumbItem = { name: string; url?: string };

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      ...(it.url ? { item: it.url } : {}),
    })),
  };
}
