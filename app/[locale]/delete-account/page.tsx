import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import AccountDeletion from "@/components/AccountDeletion";
import type { Locale } from "@/i18n/routing";

export const metadata: Metadata = {
  title: "Delete account",
  description:
    "Permanently delete your PHMarket account. Enter your e-mail, confirm via the link we send you, and your account will be irreversibly removed.",
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
