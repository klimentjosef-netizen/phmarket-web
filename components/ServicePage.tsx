import Link from "next/link";
import { Check, EnvelopeSimple, X } from "@phosphor-icons/react/dist/ssr";
import JsonLd from "@/components/JsonLd";
import { CtaBand, Faq, PageHero, SplitSection } from "@/components/sections";
import {
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
  SITE_URL,
} from "@/lib/jsonld";

export type StrongItem = { strong: string; text: string };
export type FaqItem = { question: string; answer: string };

export type ServiceContent = {
  /** Hero heading split into a plain prefix and a highlighted part */
  heroTitlePre: string;
  heroTitleHl: string;
  heroIntro: string;
  /** Hero CTA button label and the mailto subject (already URL-encoded) */
  heroCtaLabel: string;
  heroMailtoSubject: string;

  defTitle: string;
  defPara: string;
  doTitle: string;
  doItems: string[];
  dontTitle: string;
  dontItems: string[];

  whomTitle: string;
  whomItems: StrongItem[];

  numbersTitle: string;
  numbersItems: StrongItem[];

  howTitle: string;
  howItems: StrongItem[];

  compTitle: string;
  compCols: [string, string, string, string];
  compRows: [string, string, string, string][];

  faqTitle: string;

  ctaTitle: string;
  ctaPara: string;
  ctaLabel: string;
  ctaMailtoSubject: string;
};

export type ServiceSchemaData = {
  id: string;
  serviceType: string;
  name: string;
  description: string;
  audience: string;
  priceDescription: string;
};

export type ServicePageProps = {
  email: string;
  breadcrumbName: string;
  schema: ServiceSchemaData;
  faqItems: FaqItem[];
  content: ServiceContent;
};

export default function ServicePage({
  email,
  breadcrumbName,
  schema,
  faqItems,
  content: c,
}: ServicePageProps) {
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

      {/* Hero + Answer capsule */}
      <PageHero
        title={
          <>
            {c.heroTitlePre} <span className="text-accent">{c.heroTitleHl}</span>
          </>
        }
        intro={c.heroIntro}
      >
        <Link
          href={`mailto:${email}?subject=${encodeURIComponent(c.heroMailtoSubject)}`}
          className="btn-primary"
        >
          <EnvelopeSimple className="h-5 w-5 shrink-0" aria-hidden="true" />
          {c.heroCtaLabel}
        </Link>
      </PageHero>

      {/* Definition */}
      <SplitSection title={c.defTitle}>
        <p className="max-w-[68ch] leading-relaxed text-gray-700 md:text-lg">{c.defPara}</p>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="border border-line bg-surface p-6">
            <h3 className="h-sub">{c.doTitle}</h3>
            <ul className="mt-4 space-y-3 text-gray-700">
              {c.doItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-accent" weight="bold" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-line p-6">
            <h3 className="h-sub">{c.dontTitle}</h3>
            <ul className="mt-4 space-y-3 text-gray-700">
              {c.dontItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <X className="mt-1 h-4 w-4 shrink-0 text-gray-400" weight="bold" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SplitSection>

      {/* For whom */}
      <section className="border-b border-line bg-gray-50 py-14 md:py-20">
        <div className="container-page">
          <h2 className="h-section reveal max-w-3xl">{c.whomTitle}</h2>
          <ul className="mt-10 grid grid-cols-1 gap-x-12 md:grid-cols-2">
            {c.whomItems.map((item) => (
              <li key={item.strong} className="reveal border-t border-line py-6">
                <h3 className="h-sub">{item.strong}</h3>
                <p className="mt-2 leading-relaxed text-gray-700">
                  {item.text.replace(/^\s*:\s*/, "")}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Numbers */}
      <section className="border-b border-line py-14 md:py-20">
        <div className="container-page">
          <h2 className="h-section reveal">{c.numbersTitle}</h2>
          <dl className="mt-10 grid grid-cols-1 border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {c.numbersItems.map((item) => (
              <div key={item.strong} className="reveal border-b border-r border-line bg-surface p-6">
                <dt className="label">{item.strong.replace(/:\s*$/, "")}</dt>
                <dd className="mt-3 leading-relaxed text-ink">{item.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* How-to */}
      <SplitSection title={c.howTitle} tinted>
        <ol className="border-t border-line">
          {c.howItems.map((item, i) => (
            <li
              key={item.strong}
              className="grid grid-cols-[2.75rem_1fr] items-baseline gap-4 border-b border-line py-6 sm:grid-cols-[4rem_1fr]"
            >
              <span
                aria-hidden
                className="font-mono text-3xl font-light leading-none tracking-[-0.05em] text-accent sm:text-4xl"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="h-sub">{item.strong}</h3>
                <p className="mt-1.5 leading-relaxed text-gray-700">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </SplitSection>

      {/* Comparison */}
      <section className="border-b border-line py-14 md:py-20">
        <div className="container-page">
          <h2 className="h-section reveal max-w-3xl">{c.compTitle}</h2>
          <div className="reveal mt-10 overflow-x-auto border border-line bg-surface">
            <table className="w-full min-w-[640px] border-collapse text-left text-[15px]">
              <thead>
                <tr className="border-b border-line font-mono text-sm">
                  <th className="px-5 py-4 font-medium text-muted">{c.compCols[0]}</th>
                  <th className="bg-primary px-5 py-4 font-medium text-white">{c.compCols[1]}</th>
                  <th className="px-5 py-4 font-medium text-muted">{c.compCols[2]}</th>
                  <th className="px-5 py-4 font-medium text-muted">{c.compCols[3]}</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {c.compRows.map((row, i) => (
                  <tr
                    key={row[0]}
                    className={i < c.compRows.length - 1 ? "border-b border-line" : undefined}
                  >
                    <td className="px-5 py-4 font-medium text-ink">{row[0]}</td>
                    <td className="bg-primary/10 px-5 py-4 font-medium text-ink">{row[1]}</td>
                    <td className="px-5 py-4">{row[2]}</td>
                    <td className="px-5 py-4">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <SplitSection title={c.faqTitle}>
        <Faq items={faqItems} />
      </SplitSection>

      {/* CTA */}
      <CtaBand title={c.ctaTitle} text={c.ctaPara}>
        <Link
          href={`mailto:${email}?subject=${encodeURIComponent(c.ctaMailtoSubject)}`}
          className="btn-onbrand"
        >
          <EnvelopeSimple className="h-5 w-5 shrink-0" aria-hidden="true" />
          {c.ctaLabel}
        </Link>
      </CtaBand>
    </>
  );
}
