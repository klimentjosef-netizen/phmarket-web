import type { Metadata } from "next";
import AppStoreButtons from "@/components/AppStoreButtons";

export const metadata: Metadata = {
  title: "Tankujte levněji s PHMarket | PHMarket",
  description:
    "Tankujte levněji díky slevovým kódům v aplikaci PHMarket. Bez registrace, poplatků nebo plastových karet — vše v mobilu.",
};

export default function TankujteLevnejiPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-dark leading-tight">
              Tankujte <span className="text-primary">levněji</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              S aplikací PHMarket ušetříte na každém tankování. Stačí zobrazit
              slevový kód přímo na pokladně čerpací stanice a sleva se odečte
              okamžitě z ceny paliva.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-dark mb-12">
            Proč tankovat s PHMarket?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Úspora až 3 Kč na litr",
                desc: "Díky exkluzivním slevovým kódům ušetříte na každém tankování.",
              },
              {
                title: "Bez registrace",
                desc: "Žádné složité registrace ani vyplňování formulářů. Stáhni a tankuj.",
              },
              {
                title: "Žádné poplatky",
                desc: "Aplikace je kompletně zdarma. Žádné skryté poplatky ani předplatné.",
              },
              {
                title: "Bez plastových karet",
                desc: "Konec s věrnostními kartami. Vše máš pohodlně v mobilu.",
              },
              {
                title: "100+ stanic",
                desc: "Síť partnerských čerpacích stanic po celé České republice.",
              },
              {
                title: "Kvalitní palivo",
                desc: "Spolupracujeme pouze s prověřenými čerpacími stanicemi s kvalitním palivem.",
              },
            ].map((b) => (
              <div key={b.title} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="font-semibold text-dark text-lg">{b.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Začni šetřit ještě dnes
          </h2>
          <p className="mt-4 text-white/80 max-w-xl mx-auto">
            Stáhni si aplikaci PHMarket a uplatni svůj první slevový kód.
          </p>
          <AppStoreButtons className="mt-8 justify-center" />
        </div>
      </section>
    </>
  );
}
