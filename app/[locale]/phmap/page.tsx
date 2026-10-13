import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import AppStoreButtons from "@/components/AppStoreButtons";
import StationMap from "@/components/StationMap";
import { MapPin, NavigationArrow, Tag } from "@phosphor-icons/react/dist/ssr";
import type { Locale } from "@/i18n/routing";
import { localizedAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "phmapPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: localizedAlternates(locale, "/phmap"),
  };
}

// Icons keyed by feature order (text comes from translations)
const FEATURE_ICONS = [MapPin, Tag, NavigationArrow];

export default async function PHMapPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("phmapPage");
  const features = t.raw("features") as { title: string; desc: string }[];

  return (
    <>
      {/* Hero */}
      <section className="border-b border-line">
        <div className="container-page py-12 md:py-16">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="h-page rise">
                PH<span className="text-accent">Map</span>
              </h1>
              <p className="lead rise mt-5 max-w-2xl" style={{ "--i": 1 } as React.CSSProperties}>
                {t("subtitle")}
              </p>
            </div>
            <AppStoreButtons className="rise shrink-0" />
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-8 md:py-12">
        <div className="container-page">
          <StationMap />
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-line bg-gray-50 py-14 md:py-20">
        <div className="container-page">
          <h2 className="h-section reveal">{t("featuresHeading")}</h2>
          <div className="mt-10 grid grid-cols-1 gap-x-12 md:grid-cols-3">
            {features.map((f, i) => {
              const Icon = FEATURE_ICONS[i];
              return (
                <div key={f.title} className="reveal border-t border-line py-7">
                  <Icon className="h-9 w-9 text-accent" weight="light" aria-hidden="true" />
                  <h3 className="h-sub mt-5 text-xl">{f.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
