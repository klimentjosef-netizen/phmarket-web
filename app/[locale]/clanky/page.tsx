import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { articles } from "@/lib/articles";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, SITE_URL } from "@/lib/jsonld";
import type { Locale } from "@/i18n/routing";

// Intl date locale for each app locale
const DATE_LOCALE: Record<Locale, string> = {
  cs: "cs-CZ",
  sk: "sk-SK",
  pl: "pl-PL",
  en: "en-GB",
  de: "de-DE",
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
    alternates: { canonical: "/clanky" },
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
      <section className="bg-gradient-to-br from-gray-50 to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-dark">{t("title")}</h1>
          <p className="mt-4 text-lg text-gray-600">
            {t("heroSubtitle")}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map((article) => (
              <Link
                key={article.slug}
                href={`/clanky/${article.slug}`}
                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-primary/40 hover:shadow-lg transition-all"
              >
                <div className="h-48 relative overflow-hidden">
                  {article.coverImage ? (
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-primary/30"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                    <time dateTime={article.date}>
                      {formatDate(article.date, locale)}
                    </time>
                    <span>{article.timeToRead} {t("minRead")}</span>
                  </div>
                  <h2 className="text-lg font-semibold text-dark group-hover:text-primary transition-colors leading-snug">
                    {article.title}
                  </h2>
                  {article.seoDescription && (
                    <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                      {article.seoDescription}
                    </p>
                  )}
                  <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-primary">
                    {t("readMore")}
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
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
