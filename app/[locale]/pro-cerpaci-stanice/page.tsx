import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import PartnerPage from "@/components/PartnerPage";
import type { Locale } from "@/i18n/routing";
import { localizedAlternates } from "@/lib/seo";
import { CONTENT } from "./content";

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
    alternates: localizedAlternates(locale, "/pro-cerpaci-stanice"),
  };
}

export default async function ProCerpaciStanicePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const data = CONTENT[locale];

  return (
    <PartnerPage
      breadcrumbName={data.breadcrumbName}
      schema={data.schema}
      content={data.content}
    />
  );
}
