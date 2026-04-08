import type { Metadata } from "next";
import AppStoreButtons from "@/components/AppStoreButtons";

export const metadata: Metadata = {
  title: "PHMap — Mapa čerpacích stanic | PHMarket",
  description:
    "PHMap ti ukáže nejbližší partnerské čerpací stanice se slevovými kódy na pohonné hmoty. Najdi stanici a ušetři.",
};

export default function PHMapPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-dark leading-tight">
              PH<span className="text-primary">Map</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Interaktivní mapa partnerských čerpacích stanic. Najdi nejbližší
              stanici s aktuálními slevovými kódy a naviguj se přímo k ní.
            </p>
            <AppStoreButtons className="mt-8" />
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center h-[400px] md:h-[500px]">
            <div className="text-center">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <p className="text-gray-400 font-medium">Mapa PHMap</p>
              <p className="text-sm text-gray-400 mt-1">
                Dostupná v mobilní aplikaci PHMarket
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-dark text-center mb-12">
            Co PHMap umí
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Nejbližší stanice",
                desc: "Zobrazí partnerské čerpací stanice ve tvém okolí seřazené podle vzdálenosti.",
              },
              {
                title: "Aktuální slevy",
                desc: "U každé stanice vidíš aktuální slevové kódy a výši úspory na litr.",
              },
              {
                title: "Navigace",
                desc: "Jedním kliknutím spustíš navigaci přímo k vybrané stanici.",
              },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-dark text-lg">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
