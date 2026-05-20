import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { organizationSchema, websiteSchema, SITE_URL } from "@/lib/jsonld";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "PHMarket — Šetři na každém tankování",
    template: "%s | PHMarket",
  },
  description:
    "PHMarket tě navede k čerpacím stanicím s kvalitním palivem, kde uplatníš slevové kódy. Bez registrace, poplatků nebo plastových karet.",
  applicationName: "PHMarket",
  authors: [{ name: "PHMarket s.r.o.", url: SITE_URL }],
  alternates: {
    canonical: "/",
    languages: { "cs-CZ": "/" },
  },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    siteName: "PHMarket",
    url: SITE_URL,
    title: "PHMarket — Šetři na každém tankování",
    description:
      "Slevové kódy na pohonné hmoty u partnerských čerpacích stanic v ČR. Bez registrace, bez plastových karet.",
    images: [{ url: "/logo.png", width: 384, height: 384, alt: "PHMarket logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PHMarket — Šetři na každém tankování",
    description:
      "Slevové kódy na pohonné hmoty u partnerských čerpacích stanic v ČR.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body className={`${inter.variable} font-sans antialiased`}>
        <JsonLd id="organization-schema" data={organizationSchema} />
        <JsonLd id="website-schema" data={websiteSchema} />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
