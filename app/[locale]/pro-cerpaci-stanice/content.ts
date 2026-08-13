import type { Locale } from "@/i18n/routing";
import type { PartnerContent, PartnerSchemaData } from "@/components/PartnerPage";

export type PartnerLocaleData = {
  meta: { title: string; description: string };
  breadcrumbName: string;
  schema: PartnerSchemaData;
  content: PartnerContent;
};

const cs: PartnerLocaleData = {
  meta: {
    title: "Partnerství pro čerpací stanice",
    description:
      "Přivádíme na vaši čerpací stanici nové řidiče i firemní flotily. Bez vstupních poplatků a bez plateb za reklamu, odměna se počítá až z ověřených a zaplacených nákupů.",
  },
  breadcrumbName: "Pro čerpací stanice",
  schema: {
    id: "/pro-cerpaci-stanice#service",
    serviceType: "Partnerský program pro čerpací stanice",
    name: "Partnerství čerpacích stanic PHMarket",
    description:
      "Partnerský program pro provozovatele čerpacích stanic. PHMarket přivádí na partnerské stanice řidiče a firemní flotily přes mobilní aplikaci, B2B spolupráci a cílenou propagaci. Bez vstupních poplatků, odměna se počítá z ověřených a zaplacených transakcí.",
    audience:
      "Provozovatelé čerpacích stanic, majitelé sítí čerpacích stanic, nezávislé lokální stanice",
    priceDescription:
      "Bez zápisného, licenčních a administrativních poplatků. Odměna partnera vychází výhradně z reálně uskutečněných, ověřených a zaplacených transakcí.",
  },
  content: {
    heroTitlePre: "Zaplňte své stojany",
    heroTitleHl: "novými řidiči",
    heroSubtitle: "Bez reklamních poplatků, bez rizika a bez zásahu do provozu.",
    heroIntro:
      "PHMarket propojuje čerpací stanice s řidiči i firemními flotilami, kteří aktivně hledají výhodnější tankování. Přivádíme vám reálné zákazníky a podporujeme jejich opakované návraty. Platíte pouze z prověřených a uskutečněných nákupů.",
    heroCtaLabel: "Chci se stát partnerem PHMarket",

    whyTitle: "Marketing, který nestojí peníze předem, ale přináší výsledky",
    whyIntro:
      "Provozujete čerpací stanici a chcete zvýšit výtoč, ale běžné marketingové balíčky, platby za proklik nebo předražená reklama bez garance výsledku pro vás nemají smysl? Většina marketingových modelů vyžaduje investice ještě předtím, než na vaši stanici dorazí první auto.",
    whyLead: "PHMarket mění pravidla hry.",
    whyOutro:
      "Budujeme rostoucí síť partnerských čerpacích stanic a přivádíme k nim řidiče i firemní zákazníky prostřednictvím moderní mobilní aplikace, B2B partnerství, digitálních benefitů a cílené propagace.",
    principlesTitle: "Hlavní zásady našeho partnerství",
    principles: [
      {
        strong: "Žádné poplatky za vstup do sítě:",
        text: "Neplatíte žádné zápisné, licenční ani administrativní poplatky za připojení.",
      },
      {
        strong: "Žádné platby za zobrazení či reklamu:",
        text: "Neúčtujeme vám žádné částky za to, že je vaše logo vidět v aplikaci nebo na webu.",
      },
      {
        strong: "Odměna až ze skutečného prodeje:",
        text: "Výše odměny se odvíjí výhradně od reálně uskutečněných, ověřených a zaplacených transakcí.",
      },
    ],

    howTitle: "Jak funguje model PHMarket v praxi?",
    howIntro:
      "Celý systém je navržený tak, aby byl maximálně transparentní, rychlý a srozumitelný jak pro vás jako partnera, tak pro řidiče za volantem.",
    howFlow: [
      "PHMarket přivede zákazníka",
      "Zákazník natankuje",
      "Nákup se ověří",
      "Získáváte odměnu a tržbu",
    ],
    howSteps: [
      {
        strong: "Oslovení řidiče skrze aplikaci nebo B2B síť:",
        text: "Řidič vyhledá v aplikaci PHMarket nejbližší partnerskou stanici na své trase nebo vyrazí na doporučení v rámci firemní spolupráce.",
      },
      {
        strong: "Příjezd a tankování:",
        text: "Zákazník přijede na vaši čerpací stanici, natankuje palivo, případně nakoupí v doplňkovém prodeji.",
      },
      {
        strong: "Snadná identifikace:",
        text: "Při platbě u pokladny se zákazník prokáže unikátním QR kódem nebo 10místným čárovým kódem přímo z displeje mobilního telefonu.",
      },
      {
        strong: "Ověření a evidence:",
        text: "Systém zaznamená a ověří transakci. Nákup se přiřadí k profilu zákazníka a započítá do měsíčního vyhodnocení.",
      },
      {
        strong: "Vyhodnocení bez dohadů:",
        text: "Na konci měsíce proběhne transparentní vyúčtování. Odměna partnera i náš nárok vychází pouze z potvrzených dat.",
      },
    ],

    benefitsTitle: "Proč je partnerství s PHMarket výhodné pro vaši čerpací stanici?",
    benefits: [
      {
        title: "Platíte výhradně za doložitelný výkon",
        body: "Zatímco tradiční marketing vás stojí peníze bez ohledu na to, zda k vám někdo přijel, u PHMarketu neriskujete ani korunu. Pokud k vám řidiče nepřivedeme, nic neplatíte. Výpočet odměny vychází z ověřených dat, takže máte stoprocentní kontrolu nad tím, jaké hodnoty vám systém přináší.",
      },
      {
        title: "Přístup k silné B2B klientele (zemědělství a stavebnictví)",
        body: "Disponujeme celorepublikovou působností v oblasti závozů pohonných hmot přímo do nádrží a strojů zemědělských a stavebních firem. Tyto silné firemní partnery a jejich vozové parky aktivně propojujeme s naší sítí čerpacích stanic, čímž vám zajišťujeme přísun objemově významných zákazníků.",
      },
      {
        title: "Bezplatná propagace na moderních kanálech",
        body: "Vstupem do sítě získáváte přístup k ucelenému marketingovému aparátu PHMarketu. O vaší stanici dáme vědět široké komunitě řidičů, aniž byste museli zakládat vlastní reklamní účty, najímat agentury nebo tvořit drahé vizuály. Všechnu propagaci zajišťujeme my.",
      },
      {
        title: "Vlastní prezentace v mobilní aplikaci",
        body: "Každý partner získá v aplikaci PHMarket dedikovaný profil (medailonek). Řidiči přímo ve svém telefonu přehledně uvidí:",
        items: [
          "Přesnou navigaci a polohu vaší čerpací stanice.",
          "Aktuální informace o otevírací době a poskytovaných službách (myčka, kompresor, bistro, doplňkový prodej).",
          "Ceny a dostupnost paliv podle technických možností systému.",
          "Speciální akce a benefity platné na vaší stanici.",
          "Jasné označení, že jste oficiálním partnerským místem sítě.",
        ],
      },
    ],

    loyaltyTitle: "Systém postavený na opakovaných návštěvách",
    loyaltyBody:
      "PHMarket není jednorázový slevový portál. Naším cílem je vybudovat dlouhodobý zákaznický ekosystém, který řidiče naučí jezdit k vám pravidelně. Věrnostní mechanismy v aplikaci motivují zákazníky, aby při plánování svých cest preferovali právě partnerské stanice.",

    audienceTitle: "Pro jaké zákazníky a firmy budete první volbou?",
    audienceIntro:
      "Aplikace PHMarket a náš ekosystém nesměřují pouze na běžné motoristy, ale propojují vás s rozsáhlou B2B i B2C klientelou:",
    audienceItems: [
      {
        strong: "Zemědělské podniky a stavební firmy:",
        text: " V rámci celorepublikové působnosti zavážíme pohonné hmoty přímo do palivových nádrží, zásobníků a strojů zemědělců i stavebních společností. Tyto firmy a jejich řidiče aktivně propojujeme s naší sítí partnerských čerpacích stanic pro tankování na cestách.",
      },
      {
        strong: "Firemní flotily a živnostníci:",
        text: " Správci vozových parků a řidiči užitkových vozidel, kteří využívají systém PHMarket pro efektivní řízení nákladů na pohonné hmoty.",
      },
      {
        strong: "Běžní řidiči a rodiny:",
        text: " Lidé, kteří chtějí mít své provozní náklady pod kontrolou a ocení digitální benefity při běžných nákupech.",
      },
      {
        strong: "Pendleři a tranzitní doprava:",
        text: " Řidiči, kteří denně dojíždějí za prací nebo pravidelně křižují ČR i Evropu po dálničních a tranzitních tepnách.",
      },
      {
        strong: "Aktivní vyhledávači výhod:",
        text: " Zákazníci, kteří preferují moderní technologie a cíleně vyhledávají nabídky přinášející přidanou hodnotu.",
      },
    ],

    marginsTitle: "Chraňte své marže: benefity financujeme my",
    marginsIntro:
      "Jedním z největších úskalí klasických věrnostních programů je nutnost dotovat slevy přímo z vlastní marže. U PHMarketu je přístup odlišný:",
    marginsItems: [
      {
        strong: "Zákaznické benefity drží PHMarket:",
        text: "Hlavní výhody, které motivují řidiče k příjezdu, financuje PHMarket a jeho partnerský systém. Nemusíte se obávat plošného snižování vašich ziskových marží.",
      },
      {
        strong: "Dobrovolné zapojení vlastní nabídky:",
        text: "Pokud se rozhodnete podpořit prodej na své stanici ještě více (například akcí na kávu, mycí linku nebo doplňkový sortiment), můžete do systému přidat i vlastní benefit. Je to však zcela na vašem rozhodnutí, nikoli podmínkou.",
      },
    ],

    opsTitle: "Nulové provozní komplikace: nemusíte měnit své procesy",
    opsIntro:
      "Víme, že provoz čerpací stanice vyžaduje hladký průběh a každá zbytečná sekunda u pokladny tvoří fronty. Proto je celé technologické řešení PHMarket navrženo s důrazem na jednoduchost a kompatibilitu.",
    opsItems: [
      {
        strong: "Bez nutnosti drahého hardwaru:",
        text: "Nemusíte nakupovat žádné složité nové terminály ani měnit stávající vybavení čerpací stanice.",
      },
      {
        strong: "Kompatibilita se stávajícími systémy:",
        text: "Vývoj našeho řešení probíhá s ohledem na běžně používané pokladní a odbavovací systémy čerpacích stanic.",
      },
      {
        strong: "Rychlé odbavení u pokladny:",
        text: "Identifikace přes QR nebo 10místný čárový kód zabere pokladnímu pouze okamžik a nenarušuje plynulost obsluhy.",
      },
    ],

    networkTitle: "Budujte s námi nejsilnější síť čerpacích stanic",
    networkIntro:
      "PHMarket nezůstává na místě. Naší vizí je vybudovat rozsáhlou a provázanou síť partnerských čerpacích stanic v rámci celé České republiky a postupně i na klíčových evropských tranzitních tepnách.",
    networkFormulaLead: "V tomto modelu platí jednoduchá přímá úměra:",
    networkFormula: [
      "Více partnerů",
      "Více řidičů a firem v síti",
      "Vyšší četnost tankování",
      "Vyšší tržby pro vás",
    ],
    networkOutro:
      "Jako partner se nestáváte pouze další položkou v reklamním letáku. Stáváte se rovnocennou součástí rostoucího zákaznického ekosystému, který vám dlouhodobě zajišťuje přísun nových i vracejících se zákazníků.",

    ctaTitle: "Připojte svou stanici k síti PHMarket ještě dnes",
    ctaIntro:
      "Chcete zvýšit objem prodaného paliva a přivést na svou stanici nové řidiče bez rizika a marnění financí za neúčinnou reklamu? Vyplňte nezávazný formulář a náš tým se vám brzy ozve s konkrétním návrhem spolupráce.",
    form: {
      title: "Kontaktní formulář pro partnery",
      intro: "Všechna pole jsou povinná. Odesláním formuláře vám nevzniká žádný závazek.",
      labels: {
        name: "Jméno a příjmení odpovědné osoby",
        company: "Název společnosti / provozovatele",
        station: "Název a lokalita čerpací stanice",
        phone: "Telefonní kontakt",
        email: "E-mailová adresa",
      },
      consentPre:
        "Souhlasím se zpracováním uvedených údajů za účelem vyřízení této poptávky. Více v",
      consentLink: "zásadách ochrany osobních údajů",
      consentPost: ".",
      submitLabel: "Odeslat nezávaznou poptávku",
      sendingLabel: "Odesílám...",
      successTitle: "Poptávka odeslána",
      successText:
        "Děkujeme. Náš tým se vám brzy ozve s konkrétním návrhem spolupráce.",
      errorValidation: "Zkontrolujte prosím vyplněná pole, něco není v pořádku.",
      errorSend:
        "Odeslání se nezdařilo. Zkuste to prosím znovu, nebo nám napište přímo na info@phmarket.cz.",
    },

    customTitle: "Máte specifické požadavky nebo provozujete celou síť stanic?",
    customBody:
      "Jsme plně otevřeni individuálnímu nastavení spolupráce na míru vašim potřebám. Ať už spravujete jedinou lokální stanici, nebo rozsáhlou síť čerpacích stanic, rádi s vámi probereme možnosti integrace.",

    closingClaim: "PHMarket propojuje čerpací stanice se zákazníky.",
    closingBadges: [
      "Partnerství bez vstupních poplatků",
      "Odměny založené na reálných nákupech",
      "Marketing plně v režii PHMarketu",
    ],
  },
};

import sk from "./locale/sk.json";
import pl from "./locale/pl.json";
import en from "./locale/en.json";
import de from "./locale/de.json";
import hu from "./locale/hu.json";

export const CONTENT: Record<Locale, PartnerLocaleData> = {
  cs,
  sk: sk as PartnerLocaleData,
  pl: pl as PartnerLocaleData,
  en: en as PartnerLocaleData,
  de: de as PartnerLocaleData,
  hu: hu as PartnerLocaleData,
};
