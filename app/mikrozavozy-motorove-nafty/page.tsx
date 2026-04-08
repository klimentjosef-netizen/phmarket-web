import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mikrozávozy motorové nafty | PHMarket",
  description:
    "Dovoz motorové nafty přímo k zákazníkovi. Rychle, pohodlně a za výhodné ceny. Mikrozávozy nafty od PHMarket.",
};

export default function MikrozavozyPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-dark leading-tight">
              Mikrozávozy{" "}
              <span className="text-primary">motorové nafty</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Dovoz motorové nafty přímo k vám — na stavbu, do firmy nebo na
              farmu. Rychle, pohodlně a za výhodné ceny.
            </p>
            <Link
              href="mailto:info@phmarket.cz"
              className="inline-flex items-center gap-2 mt-8 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Poptávka
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-dark mb-12">
            Jak to funguje
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Poptejte dodávku",
                desc: "Kontaktujte nás s požadavkem na množství a místo dodání.",
              },
              {
                step: "2",
                title: "Domluvíme termín",
                desc: "Ozveme se vám a domluvíme termín a podrobnosti dodávky.",
              },
              {
                step: "3",
                title: "Dovezeme naftu",
                desc: "Naftu dovezeme přímo na vaše místo v dohodnutém termínu.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold text-lg mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-dark text-lg">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-dark mb-12">
            Proč mikrozávozy od PHMarket?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: "Výhodné ceny",
                desc: "Konkurenceschopné ceny motorové nafty s transparentním ceníkem.",
              },
              {
                title: "Flexibilní dodávky",
                desc: "Dovoz od malých objemů — přizpůsobíme se vašim potřebám.",
              },
              {
                title: "Kvalitní palivo",
                desc: "Nafta od prověřených dodavatelů splňující všechny normy.",
              },
              {
                title: "Spolehlivý servis",
                desc: "Dodržujeme dohodnuté termíny a zajistíme bezproblémovou dodávku.",
              },
            ].map((b) => (
              <div key={b.title} className="bg-white rounded-xl p-6 border border-gray-200">
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
            Potřebujete dovoz nafty?
          </h2>
          <p className="mt-4 text-white/80 max-w-xl mx-auto">
            Kontaktujte nás a rádi vám připravíme nabídku na míru.
          </p>
          <Link
            href="mailto:info@phmarket.cz"
            className="inline-flex items-center gap-2 mt-6 bg-white text-primary hover:bg-gray-100 font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Napište nám
          </Link>
        </div>
      </section>
    </>
  );
}
