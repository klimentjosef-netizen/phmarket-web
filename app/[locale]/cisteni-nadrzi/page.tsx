import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import ServicePage from "@/components/ServicePage";
import type { Locale } from "@/i18n/routing";
import { localizedAlternates } from "@/lib/seo";
import { CONTENT } from "./content";

const EMAIL = "info@phmarket.cz";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[locale];
  return {
    title: c.meta.title,
    description: c.meta.description,
    alternates: localizedAlternates(locale, "/cisteni-nadrzi"),
  };
}

export default async function CisteniNadrziPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const data = CONTENT[locale];

  return (
    <ServicePage
      email={EMAIL}
      breadcrumbName={data.breadcrumbName}
      schema={data.schema}
      faqItems={data.faqItems}
      content={data.content}
    />
  );
}
