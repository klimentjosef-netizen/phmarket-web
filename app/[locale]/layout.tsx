import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { localePath, localizedAlternates } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { organizationSchema, websiteSchema, SITE_URL } from "@/lib/jsonld";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

const OG_LOCALE: Record<Locale, string> = {
  cs: "cs_CZ",
  sk: "sk_SK",
  pl: "pl_PL",
  en: "en_US",
  de: "de_DE",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t("homeTitle"), template: "%s | PHMarket" },
    description: t("homeDescription"),
    applicationName: "PHMarket",
    authors: [{ name: "PHMarket s.r.o.", url: SITE_URL }],
    alternates: localizedAlternates(locale, ""),
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale],
      siteName: "PHMarket",
      url: SITE_URL + localePath(locale),
      title: t("homeTitle"),
      description: t("ogDescription"),
      images: [{ url: "/logo.png", width: 384, height: 384, alt: "PHMarket logo" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("homeTitle"),
      description: t("ogDescription"),
      images: ["/logo.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <JsonLd id="organization-schema" data={organizationSchema} />
          <JsonLd id="website-schema" data={websiteSchema} />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
