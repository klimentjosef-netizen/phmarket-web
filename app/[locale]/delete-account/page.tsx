import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import AccountDeletion from "@/components/AccountDeletion";
import { TEXTS } from "@/lib/accountDeletionTexts";
import type { Locale } from "@/i18n/routing";

// Dedicated English alias (the URL provided to Google Play); always English.
export const metadata: Metadata = {
  title: TEXTS.en.metaTitle,
  description: TEXTS.en.metaDescription,
  alternates: { canonical: "/delete-account" },
  robots: { index: false, follow: true },
};

export default async function DeleteAccountPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AccountDeletion lang="en" />;
}
