import { Plus } from "@phosphor-icons/react/dist/ssr";

/** Sdilene stavebni bloky podstranek: hlavicka, FAQ a zeleny zaverecny blok. */

export function PageHero({
  title,
  subtitle,
  intro,
  children,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  intro?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-line">
      <div className="container-page py-14 md:py-20">
        <div className="max-w-3xl">
          <h1 className="h-page rise">{title}</h1>
          {subtitle && (
            <p
              className="rise mt-5 font-mono text-base font-medium tracking-[-0.02em] text-accent md:text-lg"
              style={{ "--i": 1 } as React.CSSProperties}
            >
              {subtitle}
            </p>
          )}
          {intro && (
            <p className="lead rise mt-6" style={{ "--i": 2 } as React.CSSProperties}>
              {intro}
            </p>
          )}
          {children && (
            <div className="rise mt-8" style={{ "--i": 3 } as React.CSSProperties}>
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/** Sekce se nadpisem vlevo a obsahem vpravo, na mobilu pod sebou. */
export function SplitSection({
  title,
  children,
  tinted = false,
  id,
}: {
  title: string;
  children: React.ReactNode;
  tinted?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 border-b border-line py-14 md:py-20 ${tinted ? "bg-gray-50" : ""}`}
    >
      <div className="container-page grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.9fr] lg:gap-16">
        <h2 className="h-section reveal lg:sticky lg:top-28 lg:self-start">{title}</h2>
        <div className="reveal min-w-0">{children}</div>
      </div>
    </section>
  );
}

export function Faq({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="border-t border-line">
      {items.map((item) => (
        <details key={item.question} className="group border-b border-line">
          <summary className="flex items-start justify-between gap-6 py-5 transition-colors hover:text-accent">
            <h3 className="h-sub text-base text-inherit sm:text-lg">{item.question}</h3>
            <Plus className="faq-icon mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
          </summary>
          <p className="max-w-[68ch] pb-6 leading-relaxed text-gray-700">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function CtaBand({
  title,
  text,
  children,
}: {
  title: string;
  text?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="container-page py-14 md:py-20">
      <div className="reveal bg-gradient-to-br from-primary-dark via-primary to-[#3f9a4e] p-7 sm:p-10 lg:p-14">
        <h2 className="max-w-3xl font-mono text-2xl font-normal leading-[1.12] tracking-[-0.035em] text-white sm:text-3xl lg:text-4xl">
          {title}
        </h2>
        {text && <p className="mt-4 max-w-2xl leading-relaxed text-white/85 md:text-lg">{text}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
