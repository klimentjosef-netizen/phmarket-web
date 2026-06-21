import type { Locale } from "@/i18n/routing";
import type {
  ServiceContent,
  ServiceSchemaData,
  FaqItem,
} from "@/components/ServicePage";

export type ServiceLocaleData = {
  meta: { title: string; description: string };
  breadcrumbName: string;
  schema: ServiceSchemaData;
  faqItems: FaqItem[];
  content: ServiceContent;
};

const cs: ServiceLocaleData = {
  meta: {
    title: "Čištění palivových nádrží v ČR",
    description:
      "Profesionální čištění palivových nádrží čerpacích stanic a firemních vozových parků v celé ČR. Odstranění biokalů, vody a sedimentů. Působnost po celé České republice.",
  },
  breadcrumbName: "Čištění nádrží",
  schema: {
    id: "/cisteni-nadrzi#service",
    serviceType: "Profesionální čištění palivových nádrží",
    name: "Čištění palivových nádrží",
    description:
      "Odstranění biokalů, sedimentů a vody z palivových nádrží čerpacích stanic, firemních vozových parků, generátorových soustav a zemědělské techniky. Působnost po celé České republice.",
    audience:
      "Čerpací stanice, dopravní firmy, vlastníci vozových parků, zemědělci, provozovatelé záložních generátorů",
    priceDescription:
      "Cena na vyžádání podle objemu nádrže, typu kontaminace a vzdálenosti.",
  },
  faqItems: [
    {
      question: "Jak často je třeba čistit palivovou nádrž?",
      answer:
        "U podzemních nádrží čerpacích stanic s palivem B7 (s biosložkou) doporučujeme inspekci jednou ročně a fyzické čištění zpravidla každé 2 až 3 roky. U nádrží s naftou bez biosložky (B0) postačí čistění při výměně paliva nebo jednou za 3 až 5 let. U firemních vozových parků a nadzemních provozních nádrží závisí frekvence na obrátkovosti, minimálně však jednou za 2 roky.",
    },
    {
      question: "Co se v nádrži ukládá a proč to vadí?",
      answer:
        "Hlavními kontaminanty jsou: voda (kondenzace + hygroskopicita biosložky MEŘO), biokaly (slizovité usazeniny z degradace MEŘO), železné rezné částice z koroze stěn, prach a mikroorganismy. Tyto usazeniny ucpávají sání čerpadla, palivový filtr a v krajním případě poškozují vstřikovače, jejichž oprava se u moderních dieselů pohybuje v desítkách tisíc korun.",
    },
    {
      question: "Jak dlouho čištění trvá a musíme zavřít provoz?",
      answer:
        "Standardní podzemní nádrž 30 až 50 m³ obvykle zvládneme za 8 až 24 hodin podle stavu. Pro čerpací stanice plánujeme zásah na nejnižší obrátkový čas (typicky noc / pondělí ráno) tak, aby dotčená stanice nemusela uzavřít celý provoz, čistíme jednu nádrž v cyklu, ostatní zůstávají v provozu.",
    },
    {
      question: "Co se stane s odčerpaným palivem?",
      answer:
        "Palivo, které lze rekuperovat, přefiltrujeme a vrátíme do nádrže. Nepoužitelná část (voda + kaly) je odvezena jako nebezpečný odpad (kód 13 07 03* dle Katalogu odpadů) do certifikované likvidace. O likvidaci dostanete protokol pro vaše SEPNO hlášení.",
    },
    {
      question: "Děláte i nadzemní provozní nádrže a kontejnery (IBC)?",
      answer:
        "Ano. Čistíme nadzemní nádrže (typicky 1 až 10 m³) pro vozové parky, zemědělské provozy a generátory, stejně tak menší kontejnery IBC 1 000 l. Postup je rychlejší než u podzemních nádrží, často hotovo do 4 hodin.",
    },
    {
      question: "Působíte jen v Moravskoslezském kraji, nebo po celé ČR?",
      answer:
        "Působíme po celé České republice. Naše zázemí je v Českém Těšíně, ale výjezd Praha, Brno, Plzeň nebo do pohraničí pravidelně realizujeme.",
    },
  ],
  content: {
    heroTitlePre: "Čištění palivových",
    heroTitleHl: "nádrží",
    heroIntro:
      "Profesionální čištění palivových nádrží čerpacích stanic, firemních vozových parků, zemědělských provozů a záložních generátorů po celé České republice. Odstraníme biokaly z MEŘO, vodu a sedimenty, odvezeme nebezpečný odpad k certifikované likvidaci a předáme protokol. Výjezd typicky do 5 pracovních dnů, cena na vyžádání.",
    heroCtaLabel: "Nezávazná poptávka: info@phmarket.cz",
    heroMailtoSubject: "Poptávka čištění nádrže",
    defTitle: "Co je čištění palivové nádrže",
    defPara:
      "Čištění palivové nádrže je technologický proces, při kterém se z podzemní nebo nadzemní nádrže odstraní voda, biokaly, sedimenty a rezné částice nahromaděné na dně a stěnách. Cílem je obnovit čistotu paliva podle ČSN EN 590 (motorová nafta) nebo ČSN EN 228 (benzín) a zabránit poškození vstřikovacího systému koncových uživatelů.",
    doTitle: "Co konkrétně děláme",
    doItems: [
      "Odčerpání paliva do dočasné nádrže s mezifiltrací",
      "Odstranění usazenin na dně (mechanicky + odsávací technika)",
      "Vysušení nádrže a vizuální kontrola stěn",
      "Zpětné napuštění přefiltrovaného paliva (nebo dodání nového)",
      "Odvoz nebezpečného odpadu certifikované likvidaci + protokol",
    ],
    dontTitle: "Co neděláme",
    dontItems: [
      "Stavební opravy nádrží a obetonování",
      "Cejchování a metrologii (předáváme partnerské firmě)",
      "Demontáž nádrže ze země",
    ],
    whomTitle: "Pro koho je služba určena",
    whomItems: [
      {
        strong: "Provozovatelé čerpacích stanic",
        text: ": podzemní nádrže 30 až 50 m³ s naftou B7, benzínem nebo prémiovými palivy. Pravidelná kontrola jako prevence kontaminace zákaznických nádrží.",
      },
      {
        strong: "Dopravní firmy a vozové parky",
        text: ": nadzemní skladovací nádrže 5 až 20 m³, ze kterých tankují kamiony nebo autobusy. Riziko: ucpané filtry, výpadky vozidel.",
      },
      {
        strong: "Zemědělské provozy",
        text: ": sezónní stanice (kombajny, traktory) s několikaměsíčním stáním paliva. Riziko: degradace MEŘO v naftě B7, biokaly při startu sezóny.",
      },
      {
        strong: "Provozovatelé záložních generátorů",
        text: ": datová centra, nemocnice, průmysl. Riziko: nádrž stojí roky a při skutečném výpadku motor odmítne nastartovat na zkažené palivo.",
      },
      {
        strong: "Vlastníci sezónní techniky",
        text: ": obytné vozy, lodě, veteráni s drahým vstřikovacím systémem.",
      },
    ],
    numbersTitle: "Čísla a fakta",
    numbersItems: [
      { strong: "Objemy:", text: "nádrže 1 až 60 m³ (podzemní i nadzemní)" },
      {
        strong: "Doba čištění:",
        text: "nadzemní 1 až 10 m³ obvykle 2 až 6 h, podzemní 30 až 50 m³ obvykle 8 až 24 h",
      },
      {
        strong: "Výjezd:",
        text: "typicky do 5 pracovních dnů od potvrzení objednávky, havarijní zásah do 48 hodin (dle vytížení)",
      },
      {
        strong: "Pokrytí:",
        text: "celá Česká republika; zázemí Český Těšín, výjezdy Praha / Brno / Plzeň běžně",
      },
      {
        strong: "Odpad:",
        text: "likvidace pod kódem 13 07 03* (jiná kapalná paliva) v certifikované likvidaci, protokol pro SEPNO",
      },
      {
        strong: "Cena:",
        text: "na vyžádání podle objemu, stupně kontaminace a vzdálenosti",
      },
    ],
    howTitle: "Jak postupujeme krok za krokem",
    howItems: [
      {
        strong: "Kontakt a posouzení.",
        text: "Pošlete nám fotografii nádrže, údaje o objemu, typu paliva a poslední kontrole. Do 24 hodin se ozveme.",
      },
      {
        strong: "Cenová nabídka.",
        text: "Připravíme rozpočet s pevnou cenou pro standardní rozsah a sazbou za extra hodiny při nadstandardní kontaminaci.",
      },
      {
        strong: "Plánování výjezdu.",
        text: "Termín volíme tak, aby čerpací stanice mohla provozovat ostatní nádrže, typicky pondělí ráno nebo víkendová noc.",
      },
      {
        strong: "Odčerpání paliva.",
        text: "Palivo přečerpáme do mobilní odsávací nádrže s předfiltrací 5 μm a 25 μm.",
      },
      {
        strong: "Mechanické čištění.",
        text: "Sedimenty a kaly odstraníme z dna a stěn. U podzemních nádrží používáme kameru pro vizuální kontrolu po vyčištění.",
      },
      {
        strong: "Zpětné napuštění.",
        text: "Přefiltrované palivo vracíme zpět; nepoužitelnou frakci odvážíme.",
      },
      {
        strong: "Předání a dokumentace.",
        text: "Předáme protokol o vyčištění + doklad o předání nebezpečného odpadu pro vaše SEPNO hlášení.",
      },
    ],
    compTitle: "Srovnání s alternativami",
    compCols: [
      "Kritérium",
      "PHMarket: profesionální čištění",
      "Interní čištění svépomocí",
      "Výměna nádrže",
    ],
    compRows: [
      ["Doba", "8 až 24 h (50 m³)", "2 až 5 dnů (riziko prodlevy)", "2 až 6 týdnů + stavba"],
      ["Riziko BOZP", "Nízké, certifikovaný postup", "Vysoké (výpary, výbušná atmosféra)", "Nízké, ale rozsáhlá stavba"],
      ["Likvidace odpadu", "Certifikovaná, vč. protokolu SEPNO", "Riziko, bez protokolu hrozí pokuta", "Součást demontáže"],
      ["Náklady", "Jednorázová cena na vyžádání", "Skryté náklady (čas, riziko)", "Statisíce až milion+"],
    ],
    faqTitle: "Časté dotazy",
    ctaTitle: "Pošlete nezávaznou poptávku",
    ctaPara:
      "Napište nám objem nádrže, typ paliva a lokalitu. Do 24 hodin se ozveme s konkrétní cenou a termínem.",
    ctaLabel: "info@phmarket.cz",
    ctaMailtoSubject: "Poptávka čištění nádrže",
  },
};

import sk from "./locale/sk.json";
import pl from "./locale/pl.json";
import en from "./locale/en.json";
import de from "./locale/de.json";

export const CONTENT: Record<Locale, ServiceLocaleData> = {
  cs,
  sk: sk as ServiceLocaleData,
  pl: pl as ServiceLocaleData,
  en: en as ServiceLocaleData,
  de: de as ServiceLocaleData,
};
