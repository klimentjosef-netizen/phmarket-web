import { ArrowDown, ArrowRight, Check } from "@phosphor-icons/react/dist/ssr";
import JsonLd from "@/components/JsonLd";
import { CtaBand, Faq, PageHero, SplitSection } from "@/components/sections";
import PartnerForm, { type PartnerFormContent } from "@/components/PartnerForm";
import {
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
  SITE_URL,
  type FaqItem,
} from "@/lib/jsonld";

export type StrongItem = { strong: string; text: string };
export type BenefitBlock = { title: string; body: string; items?: string[] };

export type PartnerContent = {
  heroTitlePre: string;
  heroTitleHl: string;
  heroSubtitle: string;
  heroIntro: string;
  heroCtaLabel: string;

  whyTitle: string;
  whyIntro: string;
  whyLead: string;
  whyOutro: string;
  principlesTitle: string;
  principles: StrongItem[];

  howTitle: string;
  howIntro: string;
  howFlow: string[];
  howSteps: StrongItem[];

  benefitsTitle: string;
  benefits: BenefitBlock[];

  loyaltyTitle: string;
  loyaltyBody: string;

  audienceTitle: string;
  audienceIntro: string;
  audienceItems: StrongItem[];

  marginsTitle: string;
  marginsIntro: string;
  marginsItems: StrongItem[];

  opsTitle: string;
  opsIntro: string;
  opsItems: StrongItem[];

  networkTitle: string;
  networkIntro: string;
  networkFormulaLead: string;
  networkFormula: string[];
  networkOutro: string;

  faqTitle: string;

  ctaTitle: string;
  ctaIntro: string;
  form: PartnerFormContent;

  customTitle: string;
  customBody: string;

  closingClaim: string;
  closingBadges: string[];
};

export type PartnerSchemaData = {
  id: string;
  serviceType: string;
  name: string;
  description: string;
  audience: string;
  priceDescription: string;
};

export type PartnerPageProps = {
  breadcrumbName: string;
  schema: PartnerSchemaData;
  faqItems: FaqItem[];
  content: PartnerContent;
};

const FORM_ANCHOR = "formular";

/** Kroky za sebou se sipkami, pouzito pro dve linky typu "A, potom B, potom C" */
function FlowLine({ steps }: { steps: string[] }) {
  return (
    <ol className="grid grid-cols-1 border-l border-t border-line sm:grid-cols-2 xl:grid-cols-4">
      {steps.map((step, i) => (
        <li
          key={step}
          className="flex items-start gap-3 border-b border-r border-line bg-surface p-4"
        >
          <span aria-hidden className="font-mono text-sm font-medium text-accent">
            {i + 1}
          </span>
          <span className="font-mono text-sm font-medium leading-snug tracking-[-0.02em] text-ink">
            {step}
          </span>
          {i < steps.length - 1 && (
            <ArrowRight
              className="ml-auto mt-0.5 hidden h-4 w-4 shrink-0 text-accent sm:block"
              aria-hidden="true"
            />
          )}
        </li>
      ))}
    </ol>
  );
}

/** Polozky "tucny nazev + vysvetleni" jako radky oddelene linkou */
function StrongRows({ items }: { items: StrongItem[] }) {
  return (
    <ul className="border-t border-line">
      {items.map((item) => (
        <li key={item.strong} className="border-b border-line py-5">
          <h3 className="h-sub">{item.strong.replace(/:\s*$/, "")}</h3>
          <p className="mt-2 max-w-[68ch] leading-relaxed text-gray-700">{item.text.trim()}</p>
        </li>
      ))}
    </ul>
  );
}

const bodyClass = "max-w-[68ch] leading-relaxed text-gray-700";

export default function PartnerPage({
  breadcrumbName,
  schema,
  faqItems,
  content: c,
}: PartnerPageProps) {
  const service = serviceSchema(schema);
  const breadcrumb = breadcrumbSchema([
    { name: breadcrumbName, url: SITE_URL },
    { name: breadcrumbName },
  ]);
  const faq = faqSchema(faqItems);

  return (
    <>
      <JsonLd id="service-schema" data={service} />
      <JsonLd id="breadcrumb-schema" data={breadcrumb} />
      <JsonLd id="faq-schema" data={faq} />

      {/* Hero */}
      <PageHero
        title={
          <>
            {c.heroTitlePre} <span className="text-accent">{c.heroTitleHl}</span>
          </>
        }
        subtitle={c.heroSubtitle}
        intro={c.heroIntro}
      >
        <a href={`#${FORM_ANCHOR}`} className="btn-primary">
          {c.heroCtaLabel}
          <ArrowDown className="h-4 w-4 shrink-0" weight="bold" aria-hidden="true" />
        </a>
      </PageHero>

      {/* Why: pay-for-performance marketing + partnership principles */}
      <SplitSection title={c.whyTitle}>
        <p className={bodyClass}>{c.whyIntro}</p>
        <p className="my-7 max-w-[30ch] font-mono text-xl font-normal leading-snug tracking-[-0.03em] text-accent md:text-2xl">
          {c.whyLead}
        </p>
        <p className={bodyClass}>{c.whyOutro}</p>
      </SplitSection>

      {/* Partnership principles */}
      <section className="border-b border-line bg-gray-50 py-14 md:py-20">
        <div className="container-page">
          <h2 className="h-section reveal max-w-3xl">{c.principlesTitle}</h2>
          <ol className="mt-10 grid grid-cols-1 border-l border-t border-line md:grid-cols-3">
            {c.principles.map((item, i) => (
              <li key={item.strong} className="reveal border-b border-r border-line bg-surface p-6 sm:p-8">
                <span
                  aria-hidden
                  className="font-mono text-4xl font-light leading-none tracking-[-0.05em] text-accent"
                >
                  {i + 1}
                </span>
                <h3 className="h-sub mt-5">{item.strong.replace(/:\s*$/, "")}</h3>
                <p className="mt-2 leading-relaxed text-gray-700">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-line py-14 md:py-20">
        <div className="container-page">
          <div className="reveal max-w-3xl">
            <h2 className="h-section">{c.howTitle}</h2>
            <p className={`mt-5 ${bodyClass}`}>{c.howIntro}</p>
          </div>
          <div className="reveal mt-8">
            <FlowLine steps={c.howFlow} />
          </div>
          <ol className="mt-10 grid grid-cols-1 gap-x-12 md:grid-cols-2">
            {c.howSteps.map((item, i) => (
              <li
                key={item.strong}
                className="reveal grid grid-cols-[2.75rem_1fr] items-baseline gap-3 border-t border-line py-6"
              >
                <span
                  aria-hidden
                  className="font-mono text-3xl font-light leading-none tracking-[-0.05em] text-accent"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="h-sub">{item.strong.replace(/:\s*$/, "")}</h3>
                  <p className="mt-1.5 leading-relaxed text-gray-700">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Benefits */}
      <SplitSection title={c.benefitsTitle} tinted>
        <div className="space-y-4">
          {c.benefits.map((block) => (
            <div key={block.title} className="border border-line bg-surface p-6 sm:p-8">
              <h3 className="h-sub sm:text-xl">{block.title}</h3>
              <p className={`mt-3 ${bodyClass}`}>{block.body}</p>
              {block.items && (
                <ul className="mt-4 space-y-2.5 text-gray-700">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <Check
                        className="mt-1 h-4 w-4 shrink-0 text-accent"
                        weight="bold"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </SplitSection>

      {/* Repeat visits */}
      <section className="border-b border-line py-14 md:py-20">
        <div className="container-page reveal max-w-4xl">
          <h2 className="h-section">{c.loyaltyTitle}</h2>
          <p className="mt-6 text-lg leading-relaxed text-gray-700 md:text-xl">{c.loyaltyBody}</p>
        </div>
      </section>

      {/* Audience */}
      <SplitSection title={c.audienceTitle} tinted>
        <p className={`mb-8 ${bodyClass}`}>{c.audienceIntro}</p>
        <StrongRows items={c.audienceItems} />
      </SplitSection>

      {/* Margins + No operational disruption */}
      <section className="border-b border-line py-14 md:py-20">
        <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-16">
          <div className="reveal">
            <h2 className="h-section">{c.marginsTitle}</h2>
            <p className={`mb-8 mt-5 ${bodyClass}`}>{c.marginsIntro}</p>
            <StrongRows items={c.marginsItems} />
          </div>
          <div className="reveal">
            <h2 className="h-section">{c.opsTitle}</h2>
            <p className={`mb-8 mt-5 ${bodyClass}`}>{c.opsIntro}</p>
            <StrongRows items={c.opsItems} />
          </div>
        </div>
      </section>

      {/* Network vision */}
      <section className="border-b border-line bg-gray-50 py-14 md:py-20">
        <div className="container-page">
          <div className="reveal max-w-3xl">
            <h2 className="h-section">{c.networkTitle}</h2>
            <p className={`mt-5 ${bodyClass}`}>{c.networkIntro}</p>
            <p className="mt-6 font-medium text-ink">{c.networkFormulaLead}</p>
          </div>
          <div className="reveal mt-5">
            <FlowLine steps={c.networkFormula} />
          </div>
          <p className={`reveal mt-8 ${bodyClass}`}>{c.networkOutro}</p>
        </div>
      </section>

      {/* FAQ: covers the question-form long-tail queries, feeds FAQPage schema */}
      <SplitSection title={c.faqTitle}>
        <Faq items={faqItems} />
      </SplitSection>

      {/* CTA + form */}
      <section id={FORM_ANCHOR} className="scroll-mt-20 border-b border-line bg-gray-50 py-14 md:py-20">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div className="reveal lg:sticky lg:top-28 lg:self-start">
            <h2 className="h-section">{c.ctaTitle}</h2>
            <p className={`mt-5 ${bodyClass}`}>{c.ctaIntro}</p>
            <div className="mt-10 border-t border-line pt-8">
              <h3 className="h-sub">{c.customTitle}</h3>
              <p className={`mt-3 ${bodyClass}`}>{c.customBody}</p>
            </div>
          </div>
          <div className="reveal">
            <PartnerForm content={c.form} />
          </div>
        </div>
      </section>

      {/* Closing claim */}
      <CtaBand title={c.closingClaim}>
        <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {c.closingBadges.map((badge) => (
            <li
              key={badge}
              className="flex items-center gap-2.5 border border-white/30 px-4 py-2.5 text-sm font-medium text-white"
            >
              <Check className="h-4 w-4 shrink-0" weight="bold" aria-hidden="true" />
              {badge}
            </li>
          ))}
        </ul>
      </CtaBand>
    </>
  );
}
