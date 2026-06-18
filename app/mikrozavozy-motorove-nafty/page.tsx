import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import {
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
  SITE_URL,
} from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Mikrozávozy motorové nafty v ČR | PHMarket",
  description:
    "Mikrozávozy motorové nafty (200 až 3 000 l) přímo k zákazníkovi v České republice. Stavby, zemědělství, vozové parky, generátory. Cena dle aktuální velkoobchodní cenovky, dodávka typicky do 72 hodin.",
  alternates: { canonical: "/mikrozavozy-motorove-nafty" },
};

const service = serviceSchema({
  id: "/mikrozavozy-motorove-nafty#service",
  serviceType: "Mikrozávozy motorové nafty",
  name: "Mikrozávozy motorové nafty",
  description:
    "Dovoz motorové nafty (typicky 200 až 3 000 litrů) přímo na adresu zákazníka v celé České republice. Pro stavby, zemědělské provozy, dopravní firmy, záložní generátory a vlastníky nadzemních provozních nádrží.",
  audience:
    "Stavební firmy, zemědělci, dopravní firmy, vozové parky, provozovatelé záložních generátorů",
  priceDescription:
    "Cena dle aktuální velkoobchodní cenovky paliva + doprava podle vzdálenosti a objemu.",
});

const breadcrumb = breadcrumbSchema([
  { name: "Domů", url: SITE_URL },
  { name: "Mikrozávozy motorové nafty" },
]);

const faqItems = [
  {
    question: "Jaký je minimální a maximální objem dodávky?",
    answer:
      "Typický rozsah mikrozávozu je 200 až 3 000 litrů na jednu dodávku. Menší objemy (od 200 l) řešíme pomocí přepravního IBC nebo cisterny s menším výdejem; větší objemy (3 000+ l) předáváme partnerské cisterně. Pro pravidelné odběry (např. zemědělci v sezóně) domlouváme cyklický závoz na měsíční nebo týdenní bázi.",
  },
  {
    question: "Jak je stanovena cena nafty?",
    answer:
      "Cena se odvíjí od aktuální velkoobchodní ceny motorové nafty (referenčně Čepro nebo Unipetrol) v den dodání. K ní se připočítává doprava (kalkulovaná podle vzdálenosti od skladu a objemu) a marže. Před dodáním vždy potvrzujeme finální cenu. Pro pravidelné odběratele nabízíme cenovou indexaci k Brentu nebo ČEPRO ceníku.",
  },
  {
    question: "Tankuje se přímo do mé nádrže nebo se nafta jen předá v kanystru?",
    answer:
      "Cisterna stočí naftu přímo do vaší nadzemní nebo podzemní nádrže přes výdejní hadici s počítačem (cejchovaným podle zákona č. 505/1990 Sb. o metrologii). Vystavíme dodací list s objemem v litrech při 15 °C, datem a podpisem řidiče. Není to ‚nafta v kanystru‘. Jde o standardní velkoobchodní dodávku.",
  },
  {
    question: "Jaké palivo dovážíte? Splňuje ČSN EN 590?",
    answer:
      "Dodáváme motorovou naftu třídy B7 (s povinnou biosložkou do 7 % MEŘO) podle normy ČSN EN 590. Na vyžádání zajistíme i naftu bez biosložky (B0), ta je vhodná pro stroje s dlouhým stáním (zemědělství, generátory, sezónní technika), protože nevytváří biokaly. V zimním období dodáváme zimní třídu D (CFPP do −20 °C) nebo arktickou (CFPP −32 °C) podle aktuálního období.",
  },
  {
    question: "Jak rychle dorazí dodávka?",
    answer:
      "Standardní dodávka při potvrzení do 10:00 ráno: typicky následující pracovní den, jinak do 72 hodin. Havarijní dovoz pro generátory a dopravu (do 24 hodin) řešíme individuálně podle vytížení.",
  },
  {
    question: "Vystavíte fakturu s DPH a jakou platbu přijímáte?",
    answer:
      "Standardně fakturujeme jako plátci DPH (sazba 21 %), splatnost 7 až 14 dní pro stálé zákazníky, pro první odběr požadujeme platbu předem nebo dobírkou. Akceptujeme bankovní převod; v hotovosti pouze do limitu 270 000 Kč podle § 4 zákona o omezení plateb v hotovosti.",
  },
  {
    question: "Působíte po celé ČR?",
    answer:
      "Ano. Zázemí máme v Českém Těšíně (Moravskoslezský kraj), ale pravidelně dovážíme do celé České republiky. Logisticky nejvýhodnější je východní polovina ČR; pro Plzeňský a Karlovarský kraj plánujeme dodávky s kratším předstihem (typicky 3 až 5 dnů).",
  },
];

const faq = faqSchema(faqItems);

export default function MikrozavozyPage() {
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
              Mikrozávozy{" "}
              <span className="text-primary">motorové nafty</span>
            </h1>
            <p className="mt-6 text-lg text-gray-700 leading-relaxed">
              Dovoz motorové nafty 200 až 3 000 litrů přímo na adresu zákazníka v
              celé České republice. Pro stavby, zemědělské provozy, dopravní
              firmy, vozové parky, záložní generátory a vlastníky nadzemních
              provozních nádrží. Palivo třídy B7 podle ČSN EN 590, na
              vyžádání i bezbiosložková nafta B0. Cena dle aktuální
              velkoobchodní cenovky, standardní dodávka do 72 hodin.
            </p>
            <Link
              href="mailto:info@phmarket.cz?subject=Pop%C3%A1vka%20mikrozavoz"
              className="inline-flex items-center gap-2 mt-8 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Poptávka: info@phmarket.cz
            </Link>
          </div>
        </div>
      </section>

      {/* Definition */}
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-dark">
            Co je mikrozávoz motorové nafty
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Mikrozávoz je dodávka malého objemu motorové nafty (typicky 200 až 3
            000 litrů) přímo na adresu zákazníka pomocí cisterny nebo
            přepravního IBC. Liší se od velkozávozu k čerpacím stanicím (10
            000+ l) tím, že obsluhuje koncové firemní spotřebitele: stavby,
            zemědělce, dopravce, generátorové soustavy.
          </p>
          <h3 className="text-xl font-semibold text-dark pt-2">
            Co dodáváme
          </h3>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>
              Motorovou naftu třídy B7 (s biosložkou do 7 % MEŘO), ČSN EN 590
            </li>
            <li>
              Naftu bez biosložky B0, pro generátory, sezónní techniku a
              dlouhodobé skladování
            </li>
            <li>
              Zimní třídy D a F (CFPP −20 °C, resp. −32 °C) v období
              listopad až březen
            </li>
          </ul>
          <h3 className="text-xl font-semibold text-dark pt-2">Co neděláme</h3>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>Benzín (Natural 95, 98, 100)</li>
            <li>LPG, CNG, AdBlue jako samostatnou dodávku</li>
            <li>Mikrozávozy fyzickým osobám pro osobní potřebu</li>
          </ul>
        </div>
      </section>

      {/* For whom */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-dark">
            Pro koho je služba určena
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <strong>Stavební firmy</strong>: bagrové, drtiče, jeřáby a
              další stroje na stavbě. Místo objíždění čerpací stanice
              dovezeme naftu přímo na staveniště, často mimo dohled (klíčový
              prvek prevence krádeží paliva).
            </li>
            <li>
              <strong>Zemědělci</strong>: sezónní spotřeba (jaro: setí,
              sklizeň). Mikrozávoz pokryje krátkodobý nárůst spotřeby bez
              nutnosti budovat vlastní velkoobjemovou nádrž.
            </li>
            <li>
              <strong>Dopravní firmy a vozové parky</strong>: vlastní
              skladovací nádrž 5 až 20 m³, pravidelný plánovaný závoz po
              vyčerpání zásob.
            </li>
            <li>
              <strong>Datová centra, nemocnice, průmysl</strong>: náplň
              záložních generátorů; periodická obnova paliva, aby se v
              nádrži netvořily biokaly.
            </li>
            <li>
              <strong>Provozovatelé nadzemních nádrží</strong>: drobné firmy
              s lokální nádrží 1 až 5 m³, kterým by se nevyplatil velkozávoz.
            </li>
          </ul>
        </div>
      </section>

      {/* Numbers */}
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-dark">
            Čísla a fakta
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li>
              <strong>Rozsah dodávky:</strong> 200 až 3 000 litrů na jeden
              výjezd
            </li>
            <li>
              <strong>Standardní dodací doba:</strong> do 72 hodin od
              potvrzení (typicky následující pracovní den)
            </li>
            <li>
              <strong>Havarijní dodávka:</strong> do 24 hodin podle vytížení
            </li>
            <li>
              <strong>Pokrytí:</strong> celá Česká republika; zázemí Český
              Těšín
            </li>
            <li>
              <strong>Cena:</strong> aktuální velkoobchodní cena ČEPRO/Unipetrol
              + doprava + marže (transparentně rozepsáno na faktuře)
            </li>
            <li>
              <strong>Metrologie:</strong> cisterna s počítačem cejchovaným
              podle zákona č. 505/1990 Sb., dodací list s objemem při 15 °C
            </li>
            <li>
              <strong>Norma paliva:</strong> ČSN EN 590 (standardní B7), na
              vyžádání B0 nebo zimní třídy
            </li>
          </ul>
        </div>
      </section>

      {/* How-to */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-dark">
            Jak postupujeme krok za krokem
          </h2>
          <ol className="list-decimal pl-6 space-y-3 text-gray-700">
            <li>
              <strong>Poptávka.</strong> Pošlete nám objem, typ (B7 / B0 /
              zimní), místo dodání a požadovaný termín. Email
              info@phmarket.cz.
            </li>
            <li>
              <strong>Cenová nabídka.</strong> Do několika hodin (pracovní
              den) potvrdíme dostupnost, aktuální cenu a termín.
            </li>
            <li>
              <strong>Potvrzení dodávky.</strong> Vystavíme zálohovou fakturu
              (první odběr) nebo potvrdíme termín pro stávajícího zákazníka.
            </li>
            <li>
              <strong>Výjezd cisterny.</strong> Cisterna dorazí v dohodnutém
              čase. Řidič zkontroluje přístupnost nádrže a začne stáčet.
            </li>
            <li>
              <strong>Stočení a dodací list.</strong> Při výdeji se odečte
              objem podle cejchovaného počítače, vystaví se dodací list s
              datem, časem a podpisem.
            </li>
            <li>
              <strong>Faktura.</strong> Daňový doklad vystavíme do 5
              pracovních dnů od dodávky, splatnost dle dohody.
            </li>
          </ol>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-dark">
            Srovnání s alternativami
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 pr-4 font-semibold text-dark">
                    Kritérium
                  </th>
                  <th className="py-3 pr-4 font-semibold text-primary">
                    Mikrozávoz PHMarket
                  </th>
                  <th className="py-3 pr-4 font-semibold text-gray-600">
                    Veřejná ČS (kanystry / firemní karta)
                  </th>
                  <th className="py-3 font-semibold text-gray-600">
                    Velkozávoz (10 000+ l)
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4 font-medium">Cena za litr</td>
                  <td className="py-3 pr-4">Velkoobchodní + doprava</td>
                  <td className="py-3 pr-4">Maloobchodní (vyšší)</td>
                  <td className="py-3">Nejnižší (vyžaduje větší nádrž)</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4 font-medium">Minimální objem</td>
                  <td className="py-3 pr-4">200 l</td>
                  <td className="py-3 pr-4">Bez minima</td>
                  <td className="py-3">Typicky 10 000+ l</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4 font-medium">Čas obsluhy</td>
                  <td className="py-3 pr-4">0, dovezeme</td>
                  <td className="py-3 pr-4">
                    Cesta k pumpě + manipulace s kanystry
                  </td>
                  <td className="py-3">0, dovezeme</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4 font-medium">Riziko krádeže</td>
                  <td className="py-3 pr-4">Nízké (přímo do nádrže)</td>
                  <td className="py-3 pr-4">Vysoké (kanystry na stavbě)</td>
                  <td className="py-3">Nízké</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium">Potřeba vlastní nádrže</td>
                  <td className="py-3 pr-4">Doporučená (1+ m³)</td>
                  <td className="py-3 pr-4">Ne</td>
                  <td className="py-3">Nutná (10+ m³)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-dark">
            Časté dotazy
          </h2>
          <div className="space-y-6">
            {faqItems.map((item) => (
              <div key={item.question}>
                <h3 className="text-lg font-semibold text-dark">
                  {item.question}
                </h3>
                <p className="mt-2 text-gray-700 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">
            Potřebujete dovoz nafty?
          </h2>
          <p className="mt-4 text-white/90 max-w-xl mx-auto">
            Napište nám objem, typ paliva (B7 / B0 / zimní), místo a požadovaný
            termín. Připravíme cenovou nabídku v pracovních hodinách.
          </p>
          <Link
            href="mailto:info@phmarket.cz?subject=Pop%C3%A1vka%20mikrozavoz%20nafty"
            className="inline-flex items-center gap-2 mt-6 bg-white text-primary hover:bg-gray-100 font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            info@phmarket.cz
          </Link>
        </div>
      </section>
    </>
  );
}
