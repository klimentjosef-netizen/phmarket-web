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
  title: "Čištění palivových nádrží v ČR | PHMarket",
  description:
    "Profesionální čištění palivových nádrží čerpacích stanic a firemních vozových parků v celé ČR. Odstranění biokalů, vody a sedimentů. Působnost po celé České republice.",
  alternates: { canonical: "/cisteni-nadrzi" },
};

const service = serviceSchema({
  id: "/cisteni-nadrzi#service",
  serviceType: "Profesionální čištění palivových nádrží",
  name: "Čištění palivových nádrží",
  description:
    "Odstranění biokalů, sedimentů a vody z palivových nádrží čerpacích stanic, firemních vozových parků, generátorových soustav a zemědělské techniky. Působnost po celé České republice.",
  audience:
    "Čerpací stanice, dopravní firmy, vlastníci vozových parků, zemědělci, provozovatelé záložních generátorů",
  priceDescription:
    "Cena na vyžádání podle objemu nádrže, typu kontaminace a vzdálenosti.",
});

const breadcrumb = breadcrumbSchema([
  { name: "Domů", url: SITE_URL },
  { name: "Čištění nádrží" },
]);

const faqItems = [
  {
    question: "Jak často je třeba čistit palivovou nádrž?",
    answer:
      "U podzemních nádrží čerpacích stanic s palivem B7 (s biosložkou) doporučujeme inspekci jednou ročně a fyzické čištění zpravidla každé 2–3 roky. U nádrží s naftou bez biosložky (B0) postačí čistění při výměně paliva nebo jednou za 3–5 let. U firemních vozových parků a nadzemních provozních nádrží závisí frekvence na obrátkovosti — minimálně však jednou za 2 roky.",
  },
  {
    question: "Co se v nádrži ukládá a proč to vadí?",
    answer:
      "Hlavními kontaminanty jsou: voda (kondenzace + hygroskopicita biosložky MEŘO), biokaly (slizovité usazeniny z degradace MEŘO), železné rezné částice z koroze stěn, prach a mikroorganismy. Tyto usazeniny ucpávají sání čerpadla, palivový filtr a v krajním případě poškozují vstřikovače, jejichž oprava se u moderních dieselů pohybuje v desítkách tisíc korun.",
  },
  {
    question: "Jak dlouho čištění trvá a musíme zavřít provoz?",
    answer:
      "Standardní podzemní nádrž 30–50 m³ obvykle zvládneme za 8–24 hodin podle stavu. Pro čerpací stanice plánujeme zásah na nejnižší obrátkový čas (typicky noc / pondělí ráno) tak, aby dotčená stanice nemusela uzavřít celý provoz — čistíme jednu nádrž v cyklu, ostatní zůstávají v provozu.",
  },
  {
    question: "Co se stane s odčerpaným palivem?",
    answer:
      "Palivo, které lze rekuperovat, přefiltrujeme a vrátíme do nádrže. Nepoužitelná část (voda + kaly) je odvezena jako nebezpečný odpad (kód 13 07 03* dle Katalogu odpadů) do certifikované likvidace. O likvidaci dostanete protokol pro vaše SEPNO hlášení.",
  },
  {
    question: "Děláte i nadzemní provozní nádrže a kontejnery (IBC)?",
    answer:
      "Ano. Čistíme nadzemní nádrže (typicky 1–10 m³) pro vozové parky, zemědělské provozy a generátory, stejně tak menší kontejnery IBC 1 000 l. Postup je rychlejší než u podzemních nádrží, často hotovo do 4 hodin.",
  },
  {
    question: "Působíte jen v Moravskoslezském kraji, nebo po celé ČR?",
    answer:
      "Působíme po celé České republice. Naše zázemí je v Českém Těšíně, ale výjezd Praha, Brno, Plzeň nebo do pohraničí pravidelně realizujeme.",
  },
];

const faq = faqSchema(faqItems);

export default function CisteniNadrziPage() {
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
              Čištění palivových <span className="text-primary">nádrží</span>
            </h1>
            <p className="mt-6 text-lg text-gray-700 leading-relaxed">
              Profesionální čištění palivových nádrží čerpacích stanic,
              firemních vozových parků, zemědělských provozů a záložních
              generátorů po celé České republice. Odstraníme biokaly z MEŘO,
              vodu a sedimenty, odvezeme nebezpečný odpad k certifikované
              likvidaci a předáme protokol. Výjezd typicky do 5 pracovních
              dnů, cena na vyžádání.
            </p>
            <Link
              href="mailto:info@phmarket.cz"
              className="inline-flex items-center gap-2 mt-8 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Nezávazná poptávka — info@phmarket.cz
            </Link>
          </div>
        </div>
      </section>

      {/* Definition */}
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-dark">
            Co je čištění palivové nádrže
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Čištění palivové nádrže je technologický proces, při kterém se z
            podzemní nebo nadzemní nádrže odstraní voda, biokaly, sedimenty a
            rezné částice nahromaděné na dně a stěnách. Cílem je obnovit
            čistotu paliva podle ČSN EN 590 (motorová nafta) nebo ČSN EN 228
            (benzín) a zabránit poškození vstřikovacího systému koncových
            uživatelů.
          </p>
          <h3 className="text-xl font-semibold text-dark pt-2">
            Co konkrétně děláme
          </h3>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>Odčerpání paliva do dočasné nádrže s mezifiltrací</li>
            <li>Odstranění usazenin na dně (mechanicky + odsávací technika)</li>
            <li>Vysušení nádrže a vizuální kontrola stěn</li>
            <li>
              Zpětné napuštění přefiltrovaného paliva (nebo dodání nového)
            </li>
            <li>
              Odvoz nebezpečného odpadu certifikované likvidaci + protokol
            </li>
          </ul>
          <h3 className="text-xl font-semibold text-dark pt-2">
            Co neděláme
          </h3>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>Stavební opravy nádrží a obetonování</li>
            <li>Cejchování a metrologii (předáváme partnerské firmě)</li>
            <li>Demontáž nádrže ze země</li>
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
              <strong>Provozovatelé čerpacích stanic</strong> — podzemní nádrže
              30–50 m³ s naftou B7, benzínem nebo prémiovými palivy. Pravidelná
              kontrola jako prevence kontaminace zákaznických nádrží.
            </li>
            <li>
              <strong>Dopravní firmy a vozové parky</strong> — nadzemní
              skladovací nádrže 5–20 m³, ze kterých tankují kamiony nebo
              autobusy. Riziko: ucpané filtry, výpadky vozidel.
            </li>
            <li>
              <strong>Zemědělské provozy</strong> — sezónní stanice (kombajny,
              traktory) s několikaměsíčním stáním paliva. Riziko: degradace
              MEŘO v naftě B7, biokaly při startu sezóny.
            </li>
            <li>
              <strong>Provozovatelé záložních generátorů</strong> — datová
              centra, nemocnice, průmysl. Riziko: nádrž stojí roky a při
              skutečném výpadku motor odmítne nastartovat na zkažené palivo.
            </li>
            <li>
              <strong>Vlastníci sezónní techniky</strong> — obytné vozy, lodě,
              veteráni s drahým vstřikovacím systémem.
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
              <strong>Objemy:</strong> nádrže 1–60 m³ (podzemní i nadzemní)
            </li>
            <li>
              <strong>Doba čištění:</strong> nadzemní 1–10 m³ obvykle 2–6 h,
              podzemní 30–50 m³ obvykle 8–24 h
            </li>
            <li>
              <strong>Výjezd:</strong> typicky do 5 pracovních dnů od potvrzení
              objednávky, havarijní zásah do 48 hodin (dle vytížení)
            </li>
            <li>
              <strong>Pokrytí:</strong> celá Česká republika; zázemí Český
              Těšín, výjezdy Praha / Brno / Plzeň běžně
            </li>
            <li>
              <strong>Odpad:</strong> likvidace pod kódem 13 07 03* (jiná
              kapalná paliva) v certifikované likvidaci, protokol pro SEPNO
            </li>
            <li>
              <strong>Cena:</strong> na vyžádání podle objemu, stupně
              kontaminace a vzdálenosti
            </li>
          </ul>
        </div>
      </section>

      {/* How-to */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-dark">
            Jak postupujeme — krok za krokem
          </h2>
          <ol className="list-decimal pl-6 space-y-3 text-gray-700">
            <li>
              <strong>Kontakt a posouzení.</strong> Pošlete nám fotografii
              nádrže, údaje o objemu, typu paliva a poslední kontrole. Do 24
              hodin se ozveme.
            </li>
            <li>
              <strong>Cenová nabídka.</strong> Připravíme rozpočet s pevnou
              cenou pro standardní rozsah a sazbou za extra hodiny při
              nadstandardní kontaminaci.
            </li>
            <li>
              <strong>Plánování výjezdu.</strong> Termín volíme tak, aby
              čerpací stanice mohla provozovat ostatní nádrže — typicky
              pondělí ráno nebo víkendová noc.
            </li>
            <li>
              <strong>Odčerpání paliva.</strong> Palivo přečerpáme do mobilní
              odsávací nádrže s předfiltrací 5 μm a 25 μm.
            </li>
            <li>
              <strong>Mechanické čištění.</strong> Sedimenty a kaly odstraníme
              z dna a stěn. U podzemních nádrží používáme kameru pro vizuální
              kontrolu po vyčištění.
            </li>
            <li>
              <strong>Zpětné napuštění.</strong> Přefiltrované palivo vracíme
              zpět; nepoužitelnou frakci odvážíme.
            </li>
            <li>
              <strong>Předání a dokumentace.</strong> Předáme protokol o
              vyčištění + doklad o předání nebezpečného odpadu pro vaše SEPNO
              hlášení.
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
                    PHMarket — profesionální čištění
                  </th>
                  <th className="py-3 pr-4 font-semibold text-gray-600">
                    Interní čištění svépomocí
                  </th>
                  <th className="py-3 font-semibold text-gray-600">
                    Výměna nádrže
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4 font-medium">Doba</td>
                  <td className="py-3 pr-4">8–24 h (50 m³)</td>
                  <td className="py-3 pr-4">2–5 dnů (riziko prodlevy)</td>
                  <td className="py-3">2–6 týdnů + stavba</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4 font-medium">Riziko BOZP</td>
                  <td className="py-3 pr-4">Nízké — certifikovaný postup</td>
                  <td className="py-3 pr-4">
                    Vysoké — výpary, výbušná atmosféra
                  </td>
                  <td className="py-3">Nízké, ale rozsáhlá stavba</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4 font-medium">Likvidace odpadu</td>
                  <td className="py-3 pr-4">
                    Certifikovaná, vč. protokolu SEPNO
                  </td>
                  <td className="py-3 pr-4">
                    Riziko — bez protokolu hrozí pokuta
                  </td>
                  <td className="py-3">Součást demontáže</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium">Náklady</td>
                  <td className="py-3 pr-4">Jednorázová cena na vyžádání</td>
                  <td className="py-3 pr-4">Skryté náklady (čas, riziko)</td>
                  <td className="py-3">Statisíce — milion+</td>
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
            Pošlete nezávaznou poptávku
          </h2>
          <p className="mt-4 text-white/90 max-w-xl mx-auto">
            Napište nám objem nádrže, typ paliva a lokalitu. Do 24 hodin se
            ozveme s konkrétní cenou a termínem.
          </p>
          <Link
            href="mailto:info@phmarket.cz?subject=Pop%C3%A1vka%20%C4%8Di%C5%A1t%C4%9Bn%C3%AD%20n%C3%A1dr%C5%BEe"
            className="inline-flex items-center gap-2 mt-6 bg-white text-primary hover:bg-gray-100 font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            info@phmarket.cz
          </Link>
        </div>
      </section>
    </>
  );
}
