import JsonLd from "@/components/JsonLd";
import PartnerForm, { type PartnerFormContent } from "@/components/PartnerForm";
import { breadcrumbSchema, serviceSchema, SITE_URL } from "@/lib/jsonld";

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
  content: PartnerContent;
};

const FORM_ANCHOR = "formular";

/** Arrow-separated chips used for the two "A → B → C" flow lines */
function FlowLine({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
      {steps.map((step, i) => (
        <span key={step} className="flex items-center gap-2">
          <span className="rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary-dark">
            {step}
          </span>
          {i < steps.length - 1 && (
            <span className="text-primary/60" aria-hidden="true">
              &rarr;
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

export default function PartnerPage({
  breadcrumbName,
  schema,
  content: c,
}: PartnerPageProps) {
  const service = serviceSchema(schema);
  const breadcrumb = breadcrumbSchema([
    { name: breadcrumbName, url: SITE_URL },
    { name: breadcrumbName },
  ]);

  return (
    <>
      <JsonLd id="service-schema" data={service} />
      <JsonLd id="breadcrumb-schema" data={breadcrumb} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold leading-tight text-dark md:text-5xl">
              {c.heroTitlePre} <span className="text-primary">{c.heroTitleHl}</span>
            </h1>
            <p className="mt-4 text-lg font-medium text-gray-600">{c.heroSubtitle}</p>
            <p className="mt-6 text-lg leading-relaxed text-gray-700">{c.heroIntro}</p>
            <a
              href={`#${FORM_ANCHOR}`}
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              {c.heroCtaLabel}
            </a>
          </div>
        </div>
      </section>

      {/* Why: pay-for-performance marketing + partnership principles */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl space-y-4 px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-dark md:text-3xl">{c.whyTitle}</h2>
          <p className="leading-relaxed text-gray-700">{c.whyIntro}</p>
          <p className="text-lg font-semibold text-primary">{c.whyLead}</p>
          <p className="leading-relaxed text-gray-700">{c.whyOutro}</p>

          <h3 className="pt-4 text-xl font-semibold text-dark">{c.principlesTitle}</h3>
          <ol className="space-y-3">
            {c.principles.map((item, i) => (
              <li
                key={item.strong}
                className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-gray-700">
                  <strong className="text-dark">{item.strong}</strong> {item.text}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="mx-auto max-w-3xl space-y-4 px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-dark md:text-3xl">{c.howTitle}</h2>
          <p className="leading-relaxed text-gray-700">{c.howIntro}</p>
          <FlowLine steps={c.howFlow} />
          <ol className="list-decimal space-y-3 pl-6 pt-2 text-gray-700">
            {c.howSteps.map((item) => (
              <li key={item.strong}>
                <strong className="text-dark">{item.strong}</strong> {item.text}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl space-y-6 px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-dark md:text-3xl">{c.benefitsTitle}</h2>
          {c.benefits.map((block) => (
            <div key={block.title} className="space-y-2">
              <h3 className="text-xl font-semibold text-dark">{block.title}</h3>
              <p className="leading-relaxed text-gray-700">{block.body}</p>
              {block.items && (
                <ul className="list-disc space-y-1 pl-6 text-gray-700">
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Repeat visits */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="mx-auto max-w-3xl space-y-4 px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-dark md:text-3xl">{c.loyaltyTitle}</h2>
          <p className="leading-relaxed text-gray-700">{c.loyaltyBody}</p>
        </div>
      </section>

      {/* Audience */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl space-y-4 px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-dark md:text-3xl">{c.audienceTitle}</h2>
          <p className="leading-relaxed text-gray-700">{c.audienceIntro}</p>
          <ul className="space-y-3 text-gray-700">
            {c.audienceItems.map((item) => (
              <li key={item.strong}>
                <strong className="text-dark">{item.strong}</strong>
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Margins */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="mx-auto max-w-3xl space-y-4 px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-dark md:text-3xl">{c.marginsTitle}</h2>
          <p className="leading-relaxed text-gray-700">{c.marginsIntro}</p>
          <ul className="space-y-3 text-gray-700">
            {c.marginsItems.map((item) => (
              <li key={item.strong}>
                <strong className="text-dark">{item.strong}</strong> {item.text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* No operational disruption */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl space-y-4 px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-dark md:text-3xl">{c.opsTitle}</h2>
          <p className="leading-relaxed text-gray-700">{c.opsIntro}</p>
          <ul className="space-y-3 text-gray-700">
            {c.opsItems.map((item) => (
              <li key={item.strong}>
                <strong className="text-dark">{item.strong}</strong> {item.text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Network vision */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="mx-auto max-w-3xl space-y-4 px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-dark md:text-3xl">{c.networkTitle}</h2>
          <p className="leading-relaxed text-gray-700">{c.networkIntro}</p>
          <p className="font-medium text-gray-700">{c.networkFormulaLead}</p>
          <FlowLine steps={c.networkFormula} />
          <p className="leading-relaxed text-gray-700">{c.networkOutro}</p>
        </div>
      </section>

      {/* CTA + form */}
      <section id={FORM_ANCHOR} className="scroll-mt-20 py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-dark md:text-3xl">{c.ctaTitle}</h2>
          <p className="mt-4 leading-relaxed text-gray-700">{c.ctaIntro}</p>
          <div className="mt-8">
            <PartnerForm content={c.form} />
          </div>
        </div>
      </section>

      {/* Bespoke setups */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="mx-auto max-w-3xl space-y-4 px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-dark md:text-3xl">{c.customTitle}</h2>
          <p className="leading-relaxed text-gray-700">{c.customBody}</p>
        </div>
      </section>

      {/* Closing claim */}
      <section className="bg-primary py-14 md:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-2xl font-bold text-white">{c.closingClaim}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {c.closingBadges.map((badge) => (
              <span
                key={badge}
                className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
