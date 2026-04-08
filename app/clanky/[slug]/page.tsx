import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/lib/articles";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) return {};
  return {
    title: `${article.title} | PHMarket`,
    description: article.seoDescription || article.title,
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
          } pl-6 space-y-1 text-gray-600 leading-relaxed`}
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

    if (line.startsWith("### ")) {
      flushList();
      elements.push(
        <h3
          key={i}
          className="text-xl font-semibold text-dark mt-8 mb-3"
        >
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("## ")) {
      flushList();
      elements.push(
        <h2
          key={i}
          className="text-2xl font-bold text-dark mt-10 mb-4"
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
        <p key={i} className="text-gray-600 leading-relaxed">
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

  return (
    <article>
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/clanky"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline mb-6"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Zpět na články
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            <span>{article.timeToRead} min čtení</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {renderContent(article.content)}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Stáhni si PHMarket a začni šetřit
          </h2>
          <p className="mt-3 text-white/80">
            Slevové kódy na pohonné hmoty přímo v mobilu.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <Link
              href="https://apps.apple.com/pl/app/phmarket-obchod/id6753677131"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold px-5 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              App Store
            </Link>
            <Link
              href="https://play.google.com/store/apps/details?id=branded.m8391e3c5a7fa40ff980dd3ec24d7cd28.phmarket"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold px-5 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Google Play
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
