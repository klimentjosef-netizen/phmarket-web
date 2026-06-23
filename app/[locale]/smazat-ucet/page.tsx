import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import AccountDeletion from "@/components/AccountDeletion";
import { TEXTS } from "@/lib/accountDeletionTexts";
import { localePath } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = TEXTS[locale];
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: localePath(locale, "/smazat-ucet") },
    robots: { index: false, follow: true },
  };
}

export default async function SmazatUcetPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AccountDeletion lang={locale} />;
}
