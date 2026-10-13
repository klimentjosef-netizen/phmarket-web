import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/lib/articles";
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
  params: { slug: string };
}

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) return {};
  // Czech-only article served under all locale prefixes: consolidate every
  // variant onto the single cs URL (no hreflang — these are not translations).
  const url = `/clanky/${article.slug}`;
  return {
    title: article.title,
    description: article.seoDescription || article.title,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "cs_CZ",
      url,
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

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
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

export default function ArticlePage({ params }: Props) {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) notFound();

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
  });

  const breadcrumb = breadcrumbSchema([
    { name: "Domů", url: SITE_URL },
    { name: "Články", url: `${SITE_URL}/clanky` },
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
            Zpět na články
          </Link>
          <h1 className="h-display rise text-[1.75rem] leading-[1.15] sm:text-4xl lg:text-[2.75rem]">
            {article.title}
          </h1>
          <div className="rise mt-6 flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-xs text-muted">
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            {article.updatedAt && (
              <span>
                aktualizováno{" "}
                <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time>
              </span>
            )}
            <span>{article.timeToRead} min čtení</span>
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
        title="Stáhni si PHMarket a začni šetřit"
        text="Slevové kódy na pohonné hmoty přímo v mobilu."
      >
        <AppStoreButtons tone="onBrand" />
      </CtaBand>
    </article>
  );
}
