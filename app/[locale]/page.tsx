import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Drop, GasPump, Truck } from "@phosphor-icons/react/dist/ssr";
import { getTranslations, setRequestLocale } from "next-intl/server";
import AppStoreButtons from "@/components/AppStoreButtons";
import SavingsCounter from "@/components/SavingsCounter";
import PhoneShowcase from "@/components/PhoneShowcase";
import JsonLd from "@/components/JsonLd";
import CoverageMap from "@/components/CoverageMap";
import { mobileApplicationSchema } from "@/lib/jsonld";
import { COVERAGE, type CoverageCode } from "@/lib/coverage";
import type { Locale } from "@/i18n/routing";

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */
const delay = (i: number) => ({ "--i": i }) as React.CSSProperties;

async function Hero() {
  const t = await getTranslations("hero");
  return (
    <section className="overflow-x-clip">
      <div className="container-page pb-14 pt-10 md:pb-20 md:pt-14 lg:pt-16">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
          <div>
            <p className="label rise">{t("badge")}</p>

            <h1 className="h-hero rise mt-5" style={delay(1)}>
              {t("titleLine1")} <span className="text-accent">{t("titleHighlight")}</span>
            </h1>

            <p className="lead rise mt-6 max-w-xl" style={delay(2)}>
              {t("subtitle")}
            </p>

            <div className="rise mt-9" style={delay(3)}>
              <AppStoreButtons />
            </div>
          </div>

          <div className="rise" style={delay(2)}>
            <PhoneShowcase label={t("sceneAria")} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Stats bar                                                          */
/* ------------------------------------------------------------------ */
async function StatsBar() {
  const t = await getTranslations("stats");
  const stats = [
    { value: t("stationsValue"), label: t("stationsLabel") },
    { value: t("savingValue"), label: t("savingLabel") },
    { value: t("feeValue"), label: t("feeLabel") },
    { value: t("mapValue"), label: t("mapLabel") },
  ];

  return (
    <section className="border-y border-line bg-surface">
      <div className="container-page">
        <dl className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col-reverse justify-end py-6 md:py-8 ${
                i % 2 === 1 ? "border-l border-line pl-5" : "pr-5"
              } ${i >= 2 ? "border-t border-line md:border-t-0" : ""} ${
                i > 0 ? "md:border-l md:pl-6" : ""
              }`}
            >
              <dt className="mt-1.5 text-sm text-muted">{stat.label}</dt>
              <dd className="font-mono text-2xl font-normal tracking-[-0.04em] text-ink md:text-[2rem]">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Jak to funguje                                                     */
/* ------------------------------------------------------------------ */
async function HowItWorks() {
  const t = await getTranslations("howItWorks");
  const steps = t.raw("steps") as { title: string; description: string }[];

  return (
    <section className="border-t border-line py-16 md:py-24">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
          <div className="reveal lg:sticky lg:top-28 lg:self-start">
            <h2 className="h-section">{t("title")}</h2>
            <p className="lead mt-4 max-w-md">{t("subtitle")}</p>
          </div>

          <ol className="border-t border-line">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="reveal grid grid-cols-[3.25rem_1fr] items-baseline gap-4 border-b border-line py-6 sm:grid-cols-[5rem_1fr] sm:py-8"
              >
                <span
                  aria-hidden
                  className="font-mono text-4xl font-light leading-none tracking-[-0.05em] text-accent sm:text-5xl"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="h-sub sm:text-xl">{step.title}</h3>
                  <p className="mt-1.5 text-muted">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Další služby                                                       */
/* ------------------------------------------------------------------ */
async function Services() {
  const t = await getTranslations("services");
  const featured = {
    title: t("partneri.title"),
    description: t("partneri.description"),
    href: "/pro-cerpaci-stanice",
  };
  const others = [
    {
      title: t("cisteni.title"),
      description: t("cisteni.description"),
      href: "/cisteni-nadrzi",
      Icon: Drop,
    },
    {
      title: t("mikrozavozy.title"),
      description: t("mikrozavozy.description"),
      href: "/mikrozavozy-motorove-nafty",
      Icon: Truck,
    },
  ];

  return (
    <section className="border-t border-line bg-gray-50 py-16 md:py-24">
      <div className="container-page">
        <h2 className="h-section reveal">{t("title")}</h2>

        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-[1.25fr_1fr]">
          <Link
            href={featured.href}
            className="reveal group flex min-h-[20rem] flex-col justify-between bg-gradient-to-br from-primary-dark via-primary to-[#3f9a4e] p-7 text-white sm:p-10"
          >
            <GasPump className="h-12 w-12" weight="light" aria-hidden="true" />
            <div>
              <h3 className="font-mono text-2xl font-normal tracking-[-0.03em] sm:text-3xl">
                {featured.title}
              </h3>
              <p className="mt-3 max-w-md leading-relaxed text-white/85">{featured.description}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-mono text-sm font-medium">
                {t("learnMore")}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                  weight="bold"
                  aria-hidden="true"
                />
              </span>
            </div>
          </Link>

          <div className="grid grid-cols-1 gap-4">
            {others.map(({ title, description, href, Icon }) => (
              <Link
                key={href}
                href={href}
                className="reveal group flex flex-col border border-line bg-surface p-7 transition-colors duration-300 hover:border-accent"
              >
                <Icon className="h-9 w-9 text-accent" weight="light" aria-hidden="true" />
                <h3 className="h-sub mt-5 sm:text-xl">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-mono text-sm font-medium text-accent">
                  {t("learnMore")}
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                    weight="bold"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Kde působíme                                                       */
/* ------------------------------------------------------------------ */
async function Coverage() {
  const t = await getTranslations("coverage");
  const names = Object.fromEntries(
    COVERAGE.map((iso) => [iso, t(`countries.${iso}`)])
  ) as Record<CoverageCode, string>;

  return (
    <section className="border-t border-line py-16 md:py-24">
      <div className="container-page">
        <div className="reveal mb-10 max-w-2xl">
          <h2 className="h-section">{t("title")}</h2>
          <p className="lead mt-4">{t("subtitle")}</p>
        </div>

        <CoverageMap names={names} ariaLabel={t("mapAria")} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA                                                                */
/* ------------------------------------------------------------------ */
async function CtaSection() {
  const t = await getTranslations("homeCta");
  return (
    <section className="container-page pb-16 md:pb-24">
      <div className="reveal grid grid-cols-1 overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-[#3f9a4e] md:grid-cols-[1.5fr_1fr]">
        <div className="p-7 sm:p-10 lg:p-14">
          <h2 className="font-mono text-3xl font-normal leading-[1.1] tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-lg leading-relaxed text-white/85 md:text-lg">{t("subtitle")}</p>
          <AppStoreButtons className="mt-8" tone="onBrand" />
        </div>
        <div className="relative hidden min-h-[20rem] md:block">
          <Image
            src="/app-screenshot.png"
            alt=""
            width={1206}
            height={2622}
            sizes="320px"
            className="absolute left-1/2 top-12 w-[270px] max-w-none -translate-x-1/2 shadow-2xl shadow-black/40"
          />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd id="mobile-application-schema" data={mobileApplicationSchema} />
      <Hero />
      <StatsBar />
      <SavingsCounter />
      <HowItWorks />
      <Services />
      <Coverage />
      <CtaSection />
    </>
  );
}
