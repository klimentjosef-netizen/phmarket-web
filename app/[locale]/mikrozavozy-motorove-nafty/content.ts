import type { Locale } from "@/i18n/routing";
import type { ServiceLocaleData } from "../cisteni-nadrzi/content";

const cs: ServiceLocaleData = {
  meta: {
    title: "Mikrozávozy motorové nafty v ČR",
    description:
      "Mikrozávozy motorové nafty (200 až 3 000 l) přímo k zákazníkovi v České republice. Stavby, zemědělství, vozové parky, generátory. Cena dle aktuální velkoobchodní cenovky, dodávka typicky do 72 hodin.",
  },
  breadcrumbName: "Mikrozávozy motorové nafty",
  schema: {
    id: "/mikrozavozy-motorove-nafty#service",
    serviceType: "Mikrozávozy motorové nafty",
    name: "Mikrozávozy motorové nafty",
    description:
      "Dovoz motorové nafty (typicky 200 až 3 000 litrů) přímo na adresu zákazníka v celé České republice. Pro stavby, zemědělské provozy, dopravní firmy, záložní generátory a vlastníky nadzemních provozních nádrží.",
    audience:
      "Stavební firmy, zemědělci, dopravní firmy, vozové parky, provozovatelé záložních generátorů",
    priceDescription:
      "Cena dle aktuální velkoobchodní cenovky paliva + doprava podle vzdálenosti a objemu.",
  },
  faqItems: [
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
  ],
  content: {
    heroTitlePre: "Mikrozávozy",
    heroTitleHl: "motorové nafty",
    heroIntro:
      "Dovoz motorové nafty 200 až 3 000 litrů přímo na adresu zákazníka v celé České republice. Pro stavby, zemědělské provozy, dopravní firmy, vozové parky, záložní generátory a vlastníky nadzemních provozních nádrží. Palivo třídy B7 podle ČSN EN 590, na vyžádání i bezbiosložková nafta B0. Cena dle aktuální velkoobchodní cenovky, standardní dodávka do 72 hodin.",
    heroCtaLabel: "Poptávka: info@phmarket.cz",
    heroMailtoSubject: "Poptávka mikrozávoz",
    defTitle: "Co je mikrozávoz motorové nafty",
    defPara:
      "Mikrozávoz je dodávka malého objemu motorové nafty (typicky 200 až 3 000 litrů) přímo na adresu zákazníka pomocí cisterny nebo přepravního IBC. Liší se od velkozávozu k čerpacím stanicím (10 000+ l) tím, že obsluhuje koncové firemní spotřebitele: stavby, zemědělce, dopravce, generátorové soustavy.",
    doTitle: "Co dodáváme",
    doItems: [
      "Motorovou naftu třídy B7 (s biosložkou do 7 % MEŘO), ČSN EN 590",
      "Naftu bez biosložky B0, pro generátory, sezónní techniku a dlouhodobé skladování",
      "Zimní třídy D a F (CFPP −20 °C, resp. −32 °C) v období listopad až březen",
    ],
    dontTitle: "Co neděláme",
    dontItems: [
      "Benzín (Natural 95, 98, 100)",
      "LPG, CNG, AdBlue jako samostatnou dodávku",
      "Mikrozávozy fyzickým osobám pro osobní potřebu",
    ],
    whomTitle: "Pro koho je služba určena",
    whomItems: [
      {
        strong: "Stavební firmy",
        text: ": bagrové, drtiče, jeřáby a další stroje na stavbě. Místo objíždění čerpací stanice dovezeme naftu přímo na staveniště, často mimo dohled (klíčový prvek prevence krádeží paliva).",
      },
      {
        strong: "Zemědělci",
        text: ": sezónní spotřeba (jaro: setí, sklizeň). Mikrozávoz pokryje krátkodobý nárůst spotřeby bez nutnosti budovat vlastní velkoobjemovou nádrž.",
      },
      {
        strong: "Dopravní firmy a vozové parky",
        text: ": vlastní skladovací nádrž 5 až 20 m³, pravidelný plánovaný závoz po vyčerpání zásob.",
      },
      {
        strong: "Datová centra, nemocnice, průmysl",
        text: ": náplň záložních generátorů; periodická obnova paliva, aby se v nádrži netvořily biokaly.",
      },
      {
        strong: "Provozovatelé nadzemních nádrží",
        text: ": drobné firmy s lokální nádrží 1 až 5 m³, kterým by se nevyplatil velkozávoz.",
      },
    ],
    numbersTitle: "Čísla a fakta",
    numbersItems: [
      { strong: "Rozsah dodávky:", text: "200 až 3 000 litrů na jeden výjezd" },
      {
        strong: "Standardní dodací doba:",
        text: "do 72 hodin od potvrzení (typicky následující pracovní den)",
      },
      { strong: "Havarijní dodávka:", text: "do 24 hodin podle vytížení" },
      { strong: "Pokrytí:", text: "celá Česká republika; zázemí Český Těšín" },
      {
        strong: "Cena:",
        text: "aktuální velkoobchodní cena ČEPRO/Unipetrol + doprava + marže (transparentně rozepsáno na faktuře)",
      },
      {
        strong: "Metrologie:",
        text: "cisterna s počítačem cejchovaným podle zákona č. 505/1990 Sb., dodací list s objemem při 15 °C",
      },
      {
        strong: "Norma paliva:",
        text: "ČSN EN 590 (standardní B7), na vyžádání B0 nebo zimní třídy",
      },
    ],
    howTitle: "Jak postupujeme krok za krokem",
    howItems: [
      {
        strong: "Poptávka.",
        text: "Pošlete nám objem, typ (B7 / B0 / zimní), místo dodání a požadovaný termín. Email info@phmarket.cz.",
      },
      {
        strong: "Cenová nabídka.",
        text: "Do několika hodin (pracovní den) potvrdíme dostupnost, aktuální cenu a termín.",
      },
      {
        strong: "Potvrzení dodávky.",
        text: "Vystavíme zálohovou fakturu (první odběr) nebo potvrdíme termín pro stávajícího zákazníka.",
      },
      {
        strong: "Výjezd cisterny.",
        text: "Cisterna dorazí v dohodnutém čase. Řidič zkontroluje přístupnost nádrže a začne stáčet.",
      },
      {
        strong: "Stočení a dodací list.",
        text: "Při výdeji se odečte objem podle cejchovaného počítače, vystaví se dodací list s datem, časem a podpisem.",
      },
      {
        strong: "Faktura.",
        text: "Daňový doklad vystavíme do 5 pracovních dnů od dodávky, splatnost dle dohody.",
      },
    ],
    compTitle: "Srovnání s alternativami",
    compCols: [
      "Kritérium",
      "Mikrozávoz PHMarket",
      "Veřejná ČS (kanystry / firemní karta)",
      "Velkozávoz (10 000+ l)",
    ],
    compRows: [
      ["Cena za litr", "Velkoobchodní + doprava", "Maloobchodní (vyšší)", "Nejnižší (vyžaduje větší nádrž)"],
      ["Minimální objem", "200 l", "Bez minima", "Typicky 10 000+ l"],
      ["Čas obsluhy", "0, dovezeme", "Cesta k pumpě + manipulace s kanystry", "0, dovezeme"],
      ["Riziko krádeže", "Nízké (přímo do nádrže)", "Vysoké (kanystry na stavbě)", "Nízké"],
      ["Potřeba vlastní nádrže", "Doporučená (1+ m³)", "Ne", "Nutná (10+ m³)"],
    ],
    faqTitle: "Časté dotazy",
    ctaTitle: "Potřebujete dovoz nafty?",
    ctaPara:
      "Napište nám objem, typ paliva (B7 / B0 / zimní), místo a požadovaný termín. Připravíme cenovou nabídku v pracovních hodinách.",
    ctaLabel: "info@phmarket.cz",
    ctaMailtoSubject: "Poptávka mikrozávoz nafty",
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
