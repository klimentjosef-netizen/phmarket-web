import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import AccountDeletion from "@/components/AccountDeletion";
import type { Locale } from "@/i18n/routing";

export const metadata: Metadata = {
  title: "Smazání účtu",
  description:
    "Trvalé smazání uživatelského účtu aplikace PHMarket. Zadejte e-mail, potvrďte odkazem z e-mailu a účet bude nevratně odstraněn.",
  alternates: { canonical: "/smazat-ucet" },
  robots: { index: false, follow: true },
};

export default async function SmazatUcetPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AccountDeletion lang="cs" />;
}
