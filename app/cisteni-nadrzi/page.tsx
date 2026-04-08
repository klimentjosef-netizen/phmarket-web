import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Čištění nádrží | PHMarket",
  description:
    "Profesionální čištění palivových nádrží pro čerpací stanice a firemní zákazníky. Spolehlivý servis od PHMarket.",
};

export default function CisteniNadrziPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-dark leading-tight">
              Čištění <span className="text-primary">nádrží</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Nabízíme profesionální čištění palivových nádrží pro čerpací
              stanice i firemní zákazníky. Zajistíme kvalitu paliva a
              dlouhodobou životnost vašich nádrží.
            </p>
            <Link
              href="mailto:info@phmarket.cz"
              className="inline-flex items-center gap-2 mt-8 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Kontaktujte nás
            </Link>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-dark mb-12">
            Proč čistit palivové nádrže?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Kvalita paliva",
                desc: "Čisté nádrže zajistí, že palivo zůstane bez nečistot a vody.",
              },
              {
                title: "Životnost zařízení",
                desc: "Pravidelné čištění prodlužuje životnost nádrží a čerpací techniky.",
              },
              {
                title: "Legislativní požadavky",
                desc: "Splnění zákonných povinností pro provozovatele čerpacích stanic.",
              },
              {
                title: "Prevence poruch",
                desc: "Předejděte nákladným opravám a výpadkům provozu čerpací stanice.",
              },
              {
                title: "Odborný tým",
                desc: "Náš zkušený tým provede čištění rychle a s minimálním narušením provozu.",
              },
              {
                title: "Certifikovaný postup",
                desc: "Používáme certifikované technologie a postupy pro čištění palivových nádrží.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="font-semibold text-dark text-lg">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-dark">
            Máte zájem o čištění nádrží?
          </h2>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            Kontaktujte nás a rádi vám připravíme nezávaznou nabídku.
          </p>
          <Link
            href="mailto:info@phmarket.cz"
            className="inline-flex items-center gap-2 mt-6 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            info@phmarket.cz
          </Link>
        </div>
      </section>
    </>
  );
}
