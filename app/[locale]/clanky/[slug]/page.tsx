import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { articles, formatArticleDate, getArticle } from "@/lib/articles";
import { HREFLANG, localePath, localizedAlternates, OG_LOCALE } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import {
  articleSchema,
  breadcrumbSchema,
  SITE_URL,
} from "@/lib/jsonld";
import AppStoreButtons from "@/components/AppStoreButtons";
import { CtaBand } from "@/components/sections";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

interface Props {
  params: Promise<{ locale: Locale; slug: string }>;
}

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticle(locale, slug);
  if (!article) return {};
  // Every article is translated into all languages under the same slug
  const alternates = localizedAlternates(locale, `/clanky/${article.slug}`);
  return {
    title: article.title,
    description: article.seoDescription || article.title,
    alternates,
    openGraph: {
      type: "article",
      locale: OG_LOCALE[locale],
      url: alternates.canonical,
      title: article.title,
      description: article.seoDescription || article.title,
      publishedTime: article.date,
      modifiedTime: article.updatedAt,
      images: article.coverImage
        ? [{ url: article.coverImage, alt: article.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.seoDescription || article.title,
      images: article.coverImage ? [article.coverImage] : undefined,
    },
  };
}

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];
  let listType: "ul" | "ol" | null = null;

  function flushList() {
    if (listItems.length > 0 && listType) {
      const Tag = listType === "ul" ? "ul" : "ol";
      elements.push(
        <Tag
          key={`list-${elements.length}`}
          className={`${
            listType === "ul" ? "list-disc" : "list-decimal"
          } pl-6 space-y-1.5 text-gray-700 leading-relaxed`}
        >
          {listItems.map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </Tag>
      );
      listItems = [];
      listType = null;
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("#### ")) {
      flushList();
      elements.push(
        <h4
          key={i}
          className="h-sub !mt-8"
        >
          {line.slice(5)}
        </h4>
      );
    } else if (line.startsWith("### ")) {
      flushList();
      elements.push(
        <h3
          key={i}
          className="h-sub !mt-10 text-xl"
        >
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("## ")) {
      flushList();
      elements.push(
        <h2
          key={i}
          className="h-display !mt-12 text-2xl md:text-[1.75rem]"
        >
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("- ")) {
      if (listType !== "ul") flushList();
      listType = "ul";
      listItems.push(line.slice(2));
    } else if (line.match(/^1\. /)) {
      if (listType !== "ol") flushList();
      listType = "ol";
      listItems.push(line.slice(3));
    } else if (line.trim() === "") {
      flushList();
    } else {
      flushList();
      elements.push(
        <p key={i} className="leading-relaxed text-gray-700">
          {line}
        </p>
      );
    }
  }
  flushList();

  return elements;
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const article = getArticle(locale, slug);
  if (!article) notFound();
  const t = await getTranslations("articlesPage");
  const tNav = await getTranslations("nav");

  const wordCount = article.content
    .split(/\s+/)
    .filter(Boolean).length;

  const schema = articleSchema({
    title: article.title,
    slug: article.slug,
    datePublished: article.date,
    dateModified: article.updatedAt,
    description: article.seoDescription || article.title,
    image: article.coverImage,
    wordCount,
    url: localePath(locale, `/clanky/${article.slug}`),
    inLanguage: HREFLANG[locale],
  });

  const breadcrumb = breadcrumbSchema([
    { name: tNav("home"), url: SITE_URL },
    { name: t("breadcrumb"), url: `${SITE_URL}/clanky` },
    { name: article.title },
  ]);

  return (
    <article>
      <JsonLd id="article-schema" data={schema} />
      <JsonLd id="breadcrumb-schema" data={breadcrumb} />
      {/* Header */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <Link
            href="/clanky"
            className="rise mb-8 inline-flex items-center gap-2 font-mono text-sm font-medium text-accent hover:underline"
          >
            <ArrowLeft className="h-4 w-4" weight="bold" aria-hidden="true" />
            {t("backToArticles")}
          </Link>
          <h1 className="h-display rise text-[1.75rem] leading-[1.15] sm:text-4xl lg:text-[2.75rem]">
            {article.title}
          </h1>
          <div className="rise mt-6 flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-xs text-muted">
            <time dateTime={article.date}>{formatArticleDate(article.date, locale)}</time>
            {article.updatedAt && (
              <span>
                {t("updated")}{" "}
                <time dateTime={article.updatedAt}>{formatArticleDate(article.updatedAt, locale)}</time>
              </span>
            )}
            <span>
              {article.timeToRead} {t("minRead")}
            </span>
          </div>
        </div>
      </section>

      {/* Cover image */}
      {article.coverImage && (
        <div className="mx-auto max-w-5xl px-4 pt-10 sm:px-6 lg:px-8">
          <div className="relative aspect-[1200/630] w-full overflow-hidden border border-line">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              sizes="(max-width: 1024px) 100vw, 960px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Content */}
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-3xl space-y-4 px-4 text-[17px] sm:px-6 lg:px-8">
          {renderContent(article.content)}
        </div>
      </section>

      {/* CTA */}
      <CtaBand
        title={t("ctaTitle")}
        text={t("ctaText")}
      >
        <AppStoreButtons tone="onBrand" />
      </CtaBand>
    </article>
  );
}
