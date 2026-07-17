import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
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

function ArrowDownTray() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  );
}

function ArrowTopRight() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  );
}

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
    <div className="bg-white">
      {/* Header */}
      <section className="hero-premium-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <nav className="text-sm text-white/50 mb-6" aria-label="Drobečková navigace">
            <Link href="/" className="hover:text-emerald-400 transition-colors">
              {t("breadcrumbHome")}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">{title}</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-400 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            {t("effectiveFrom", { date: effectiveDate })}
          </span>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 text-lg text-emerald-300/80 font-medium">{subtitle}</p>
          )}
          <p className="mt-5 text-base text-white/60 leading-relaxed max-w-3xl">
            {intro}
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href={pdfHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-5 py-3 transition-colors shadow-lg shadow-emerald-500/20"
            >
              <ArrowTopRight />
              {t("openPdf")}
            </a>
            <a
              href={pdfHref}
              download={downloadName}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 hover:border-emerald-400/60 text-white font-semibold px-5 py-3 transition-colors"
            >
              <ArrowDownTray />
              {t("downloadPdf")}
            </a>
          </div>

          {/* Language versions */}
          {languages.length > 0 && (
            <div className="mt-7">
              <p className="text-xs uppercase tracking-wider text-white/40 mb-2">
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
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                      lang.current
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40"
                        : "bg-white/5 text-white/70 border border-white/10 hover:border-white/30"
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
            <h2 className="text-lg font-bold text-dark mb-4">{t("tableOfContents")}</h2>
            <ol className="space-y-1.5">
              {navItems.map((item) => {
                const inner = (
                  <span className="block text-sm text-gray-600 leading-snug py-1.5 px-3 rounded-lg hover:bg-primary/5 hover:text-primary transition-colors">
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
                      <h2 className="text-xl md:text-2xl font-bold text-dark mb-4 leading-snug">
                        {s.heading}
                      </h2>
                    )}
                    <div
                      className="text-[15px] text-gray-700 leading-relaxed space-y-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-primary [&_a]:underline [&_strong]:text-dark"
                      dangerouslySetInnerHTML={{ __html: s.html }}
                    />
                  </section>
                ))}
                <p className="mt-10 text-sm text-gray-500 border-t border-gray-200 pt-6">
                  {t("effectiveFrom", { date: effectiveDate })}.{" "}
                  <a href={pdfHref} target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">
                    {t("openPdf")}
                  </a>
                </p>
              </article>
            ) : (
            <>
            {/* Inline viewer (desktop / tablet) */}
            <div className="hidden md:block rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-gray-50">
              <object
                data={`${pdfHref}#view=FitH`}
                type="application/pdf"
                className="w-full h-[78vh]"
                aria-label={`${title}: PDF`}
              >
                <div className="p-8 text-center text-gray-600">
                  {t("viewerFallbackBefore")}
                  <a href={pdfHref} target="_blank" rel="noopener noreferrer" className="text-primary font-semibold underline">
                    {t("viewerFallbackLink")}
                  </a>
                  .
                </div>
              </object>
            </div>

            {/* Mobile prompt */}
            <div className="md:hidden rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center">
              <p className="text-gray-700 font-medium">
                {t("mobilePromptTitle")}
              </p>
              <p className="text-sm text-gray-500 mt-1 mb-5">
                {t("mobilePromptSubtitle")}
              </p>
              <a
                href={pdfHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold px-5 py-3 transition-colors w-full"
              >
                <ArrowTopRight />
                {t("openPdf")}
              </a>
            </div>
            </>
            )}

            {/* Contact / operator */}
            <div className="mt-10 rounded-2xl bg-gray-50 border border-gray-200 p-6">
              <h2 className="text-base font-bold text-dark mb-3">{t("operator")}</h2>
              <address className="not-italic text-sm text-gray-600 space-y-0.5">
                <p className="font-semibold text-dark">PHMarket s.r.o.</p>
                <p>Hlavní třída 87/2, 737 01 Český Těšín, Česká republika</p>
                <p>IČO: 04529031 &middot; DIČ: CZ04529031</p>
                <p>
                  {t("emailLabel")}:{" "}
                  <a href={`mailto:${contactEmail}`} className="text-primary font-medium hover:underline">
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
