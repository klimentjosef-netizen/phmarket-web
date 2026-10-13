import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import AppStoreButtons from "@/components/AppStoreButtons";
import { CtaBand, PageHero } from "@/components/sections";
import type { Locale } from "@/i18n/routing";
import { localizedAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tankujtePage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: localizedAlternates(locale, "/tankujte-levneji"),
  };
}

export default async function TankujteLevnejiPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("tankujtePage");
  const benefits = t.raw("benefits") as { title: string; desc: string }[];

  return (
    <>
      <PageHero
        title={t.rich("title", {
          hl: (chunks) => <span className="text-accent">{chunks}</span>,
        })}
        intro={t("subtitle")}
      >
        <AppStoreButtons />
      </PageHero>

      {/* Benefits */}
      <section className="py-14 md:py-20">
        <div className="container-page">
          <h2 className="h-section reveal">{t("benefitsHeading")}</h2>
          <div className="mt-10 grid grid-cols-1 border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, i) => (
              <div
                key={b.title}
                className={`reveal border-b border-r border-line p-6 sm:p-8 ${
                  i === 0 ? "bg-primary text-white" : "bg-surface"
                }`}
              >
                <h3 className={`h-sub text-xl ${i === 0 ? "text-white" : ""}`}>{b.title}</h3>
                <p className={`mt-3 leading-relaxed ${i === 0 ? "text-white/85" : "text-muted"}`}>
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title={t("ctaTitle")} text={t("ctaSubtitle")}>
        <AppStoreButtons tone="onBrand" />
      </CtaBand>
    </>
  );
}
