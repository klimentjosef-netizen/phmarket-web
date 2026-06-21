import Link from "next/link";
import JsonLd from "@/components/JsonLd";
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
      <section className="bg-gradient-to-br from-gray-50 to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-dark leading-tight">
              {c.heroTitlePre}{" "}
              <span className="text-primary">{c.heroTitleHl}</span>
            </h1>
            <p className="mt-6 text-lg text-gray-700 leading-relaxed">
              {c.heroIntro}
            </p>
            <Link
              href={`mailto:${email}?subject=${encodeURIComponent(c.heroMailtoSubject)}`}
              className="inline-flex items-center gap-2 mt-8 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              {c.heroCtaLabel}
            </Link>
          </div>
        </div>
      </section>

      {/* Definition */}
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-dark">{c.defTitle}</h2>
          <p className="text-gray-700 leading-relaxed">{c.defPara}</p>
          <h3 className="text-xl font-semibold text-dark pt-2">{c.doTitle}</h3>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            {c.doItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3 className="text-xl font-semibold text-dark pt-2">{c.dontTitle}</h3>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            {c.dontItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* For whom */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-dark">{c.whomTitle}</h2>
          <ul className="space-y-3 text-gray-700">
            {c.whomItems.map((item) => (
              <li key={item.strong}>
                <strong>{item.strong}</strong>
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Numbers */}
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-dark">{c.numbersTitle}</h2>
          <ul className="space-y-2 text-gray-700">
            {c.numbersItems.map((item) => (
              <li key={item.strong}>
                <strong>{item.strong}</strong> {item.text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How-to */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-dark">{c.howTitle}</h2>
          <ol className="list-decimal pl-6 space-y-3 text-gray-700">
            {c.howItems.map((item) => (
              <li key={item.strong}>
                <strong>{item.strong}</strong> {item.text}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-dark">{c.compTitle}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 pr-4 font-semibold text-dark">{c.compCols[0]}</th>
                  <th className="py-3 pr-4 font-semibold text-primary">{c.compCols[1]}</th>
                  <th className="py-3 pr-4 font-semibold text-gray-600">{c.compCols[2]}</th>
                  <th className="py-3 font-semibold text-gray-600">{c.compCols[3]}</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {c.compRows.map((row, i) => (
                  <tr
                    key={row[0]}
                    className={i < c.compRows.length - 1 ? "border-b border-gray-100" : undefined}
                  >
                    <td className="py-3 pr-4 font-medium">{row[0]}</td>
                    <td className="py-3 pr-4">{row[1]}</td>
                    <td className="py-3 pr-4">{row[2]}</td>
                    <td className="py-3">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-dark">{c.faqTitle}</h2>
          <div className="space-y-6">
            {faqItems.map((item) => (
              <div key={item.question}>
                <h3 className="text-lg font-semibold text-dark">{item.question}</h3>
                <p className="mt-2 text-gray-700 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">{c.ctaTitle}</h2>
          <p className="mt-4 text-white/90 max-w-xl mx-auto">{c.ctaPara}</p>
          <Link
            href={`mailto:${email}?subject=${encodeURIComponent(c.ctaMailtoSubject)}`}
            className="inline-flex items-center gap-2 mt-6 bg-white text-primary hover:bg-gray-100 font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            {c.ctaLabel}
          </Link>
        </div>
      </section>
    </>
  );
}
