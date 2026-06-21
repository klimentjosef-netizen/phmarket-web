import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import AppStoreButtons from "@/components/AppStoreButtons";
import type { Locale } from "@/i18n/routing";

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
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-dark leading-tight">
              {t.rich("title", {
                hl: (chunks) => <span className="text-primary">{chunks}</span>,
              })}
            </h1>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-dark mb-12">
            {t("benefitsHeading")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((b) => (
              <div key={b.title} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="font-semibold text-dark text-lg">{b.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {t("ctaTitle")}
          </h2>
          <p className="mt-4 text-white/80 max-w-xl mx-auto">
            {t("ctaSubtitle")}
          </p>
          <AppStoreButtons className="mt-8 justify-center" />
        </div>
      </section>
    </>
  );
}
