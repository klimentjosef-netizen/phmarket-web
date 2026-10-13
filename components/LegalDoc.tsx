import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import type { LegalSection } from "@/lib/legal/types";

export type LegalLang = {
  code: string;
  label: string;
  href: string;
  current?: boolean;
};

export type LegalDocProps = {
  /** Page title, e.g. "Všeobecné obchodní podmínky" */
  title: string;
  /** Short label under the title, e.g. "VOP a licenční ujednání pro koncového uživatele" */
  subtitle?: string;
  /** Effective-from date string, e.g. "1. června 2026" */
  effectiveDate: string;
  /** Intro paragraph(s) shown above the document */
  intro: string;
  /** Path to the canonical PDF in /public */
  pdfHref: string;
  /** Suggested download filename */
  downloadName: string;
  /** Document outline shown as a table of contents */
  toc: string[];
  /** Other language versions of this document */
  languages: LegalLang[];
  /** Contact e-mail shown in the operator block */
  contactEmail: string;
  /**
   * Full HTML version of the document. When provided, the readable text is
   * rendered inline (indexable, accessible) and the PDF is offered as the
   * binding copy to download. When omitted, the PDF is embedded instead.
   */
  sections?: LegalSection[];
};

export default function LegalDoc({
  title,
  subtitle,
  effectiveDate,
  intro,
  pdfHref,
  downloadName,
  toc,
  languages,
  contactEmail,
  sections,
}: LegalDocProps) {
  const t = useTranslations("legal");
  const hasHtml = Array.isArray(sections) && sections.length > 0;
  const navItems = hasHtml
    ? sections!.filter((s) => s.heading).map((s) => ({ id: s.id, label: s.heading as string }))
    : toc.map((label, i) => ({ id: `toc-${i}`, label }));
  return (
    <div>
      {/* Header */}
      <section className="border-b border-line">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <nav className="mb-6 font-mono text-xs text-muted" aria-label="Drobečková navigace">
            <Link href="/" className="transition-colors hover:text-accent">
              {t("breadcrumbHome")}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink">{title}</span>
          </nav>

          <p className="label mb-5">{t("effectiveFrom", { date: effectiveDate })}</p>

          <h1 className="h-page">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 font-mono text-base font-medium tracking-[-0.02em] text-accent md:text-lg">{subtitle}</p>
          )}
          <p className="lead mt-5 max-w-3xl">
            {intro}
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href={pdfHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
              {t("openPdf")}
            </a>
            <a
              href={pdfHref}
              download={downloadName}
              className="btn-outline"
            >
              <DownloadSimple className="h-5 w-5" aria-hidden="true" />
              {t("downloadPdf")}
            </a>
          </div>

          {/* Language versions */}
          {languages.length > 0 && (
            <div className="mt-7">
              <p className="mb-2.5 text-sm text-muted">
                {t("languageVersions")}
              </p>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <a
                    key={lang.code}
                    href={lang.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-current={lang.current ? "true" : undefined}
                    className={`inline-flex items-center gap-1.5 border px-3 py-1.5 text-sm font-medium transition-colors ${
                      lang.current
                        ? "border-accent bg-primary/10 text-accent"
                        : "border-line text-muted hover:border-accent hover:text-ink"
                    }`}
                  >
                    {lang.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Body: table of contents + embedded document */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10">
          {/* TOC */}
          <aside className="lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
            <h2 className="h-sub mb-4 text-base">{t("tableOfContents")}</h2>
            <ol className="border-l border-line">
              {navItems.map((item) => {
                const inner = (
                  <span className="-ml-px block border-l border-transparent px-4 py-1.5 text-sm leading-snug text-muted transition-colors hover:border-accent hover:text-ink">
                    {item.label}
                  </span>
                );
                return (
                  <li key={item.id}>
                    {hasHtml ? <a href={`#${item.id}`}>{inner}</a> : inner}
                  </li>
                );
              })}
            </ol>
          </aside>

          {/* Document */}
          <div>
            {hasHtml ? (
              <article className="legal-body max-w-none">
                {sections!.map((s) => (
                  <section key={s.id} id={s.id} className="scroll-mt-24 mb-8">
                    {s.heading && (
                      <h2 className="h-display mb-4 text-xl leading-snug md:text-2xl">
                        {s.heading}
                      </h2>
                    )}
                    <div
                      className="prose-body"
                      dangerouslySetInnerHTML={{ __html: s.html }}
                    />
                  </section>
                ))}
                <p className="mt-10 border-t border-line pt-6 text-sm text-muted">
                  {t("effectiveFrom", { date: effectiveDate })}.{" "}
                  <a href={pdfHref} target="_blank" rel="noopener noreferrer" className="font-medium text-accent hover:underline">
                    {t("openPdf")}
                  </a>
                </p>
              </article>
            ) : (
            <>
            {/* Inline viewer (desktop / tablet) */}
            <div className="hidden overflow-hidden border border-line bg-gray-50 md:block">
              <object
                data={`${pdfHref}#view=FitH`}
                type="application/pdf"
                className="w-full h-[78vh]"
                aria-label={`${title}: PDF`}
              >
                <div className="p-8 text-center text-gray-600">
                  {t("viewerFallbackBefore")}
                  <a href={pdfHref} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent underline">
                    {t("viewerFallbackLink")}
                  </a>
                  .
                </div>
              </object>
            </div>

            {/* Mobile prompt */}
            <div className="border border-line bg-surface p-6 text-center md:hidden">
              <p className="font-medium text-ink">
                {t("mobilePromptTitle")}
              </p>
              <p className="text-sm text-gray-500 mt-1 mb-5">
                {t("mobilePromptSubtitle")}
              </p>
              <a
                href={pdfHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full"
              >
                <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                {t("openPdf")}
              </a>
            </div>
            </>
            )}

            {/* Contact / operator */}
            <div className="mt-10 border border-line bg-surface p-6">
              <h2 className="h-sub mb-3 text-base">{t("operator")}</h2>
              <address className="not-italic text-sm text-gray-600 space-y-0.5">
                <p className="font-semibold text-ink">PHMarket s.r.o.</p>
                <p>Hlavní třída 87/2, 737 01 Český Těšín, Česká republika</p>
                <p>IČO: 04529031, DIČ: CZ04529031</p>
                <p>
                  {t("emailLabel")}:{" "}
                  <a href={`mailto:${contactEmail}`} className="font-medium text-accent hover:underline">
                    {contactEmail}
                  </a>
                </p>
              </address>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
