import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { articles } from "@/lib/articles";
import JsonLd from "@/components/JsonLd";
import { PageHero } from "@/components/sections";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { breadcrumbSchema, SITE_URL } from "@/lib/jsonld";
import type { Locale } from "@/i18n/routing";
import { localizedAlternates } from "@/lib/seo";

// Intl date locale for each app locale
const DATE_LOCALE: Record<Locale, string> = {
  cs: "cs-CZ",
  sk: "sk-SK",
  pl: "pl-PL",
  en: "en-GB",
  de: "de-DE",
  hu: "hu-HU",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "articlesPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: localizedAlternates(locale, "/clanky"),
  };
}

function formatDate(dateStr: string, locale: Locale) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(DATE_LOCALE[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ArticlesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("articlesPage");

  const breadcrumb = breadcrumbSchema([
    { name: t("breadcrumb"), url: SITE_URL },
    { name: t("breadcrumb") },
  ]);

  const sorted = [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <JsonLd id="breadcrumb-schema" data={breadcrumb} />
      <PageHero title={t("title")} intro={t("heroSubtitle")} />

      <section className="py-14 md:py-20">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {sorted.map((article, i) => (
              <Link
                key={article.slug}
                href={`/clanky/${article.slug}`}
                className={`reveal group flex flex-col ${
                  i === 0 ? "md:col-span-2 lg:col-span-3 lg:grid lg:grid-cols-[1.4fr_1fr] lg:gap-10" : ""
                }`}
              >
                <div
                  className={`relative overflow-hidden border border-line bg-gray-100 ${
                    i === 0 ? "aspect-[1200/630]" : "aspect-[1200/630]"
                  }`}
                >
                  {article.coverImage && (
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      sizes={i === 0 ? "(max-width: 1024px) 100vw, 720px" : "(max-width: 768px) 100vw, 400px"}
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  )}
                </div>
                <div className={i === 0 ? "pt-5 lg:self-center lg:pt-0" : "pt-5"}>
                  <div className="flex items-center gap-4 font-mono text-xs text-muted">
                    <time dateTime={article.date}>{formatDate(article.date, locale)}</time>
                    <span>
                      {article.timeToRead} {t("minRead")}
                    </span>
                  </div>
                  <h2
                    className={`mt-3 font-mono font-medium leading-snug tracking-[-0.03em] text-ink transition-colors group-hover:text-accent ${
                      i === 0 ? "text-2xl lg:text-3xl" : "text-lg"
                    }`}
                  >
                    {article.title}
                  </h2>
                  {article.seoDescription && (
                    <p className={`mt-2.5 leading-relaxed text-muted ${i === 0 ? "" : "line-clamp-2 text-sm"}`}>
                      {article.seoDescription}
                    </p>
                  )}
                  <span className="mt-4 inline-flex items-center gap-2 font-mono text-sm font-medium text-accent">
                    {t("readMore")}
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                      weight="bold"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
