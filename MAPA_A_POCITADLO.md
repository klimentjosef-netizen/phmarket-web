# Plán integrace mapy PHMap a počítadla úspor

## 1. Mapa PHMap

### Aktuální stav na phmarket.cz
- Wix web používá vlastní komponentu `PHMap` (pravděpodobně Wix Custom Element nebo Velo widget)
- Data stanic se načítají z Wix CMS / databáze
- Mapa zobrazuje partnerské čerpací stanice s cenami a slevovými kódy

### Možnosti implementace na novém webu

#### Varianta A: Google Maps API (doporučeno)
- **Google Maps JavaScript API** s vlastními markery
- Data stanic uložená v JSON souboru (`/data/stations.json`) nebo načítaná z API
- Vlastní design markerů s logem PHMarket a slevovou cenou
- Clustering pro velké množství stanic
- Geolokace uživatele pro "nejbližší stanice"
- **Náklady:** Google Maps má free tier (28 000 načtení/měsíc zdarma), poté $7/1000 načtení
- **Implementace:** React wrapper `@react-google-maps/api` nebo přímo `google.maps`

#### Varianta B: Leaflet + OpenStreetMap (zdarma)
- **Leaflet.js** s `react-leaflet` wrapperem
- OpenStreetMap tiles (kompletně zdarma, žádné API klíče)
- Stejné custom markery a clustering
- **Výhoda:** Nulové náklady, žádná závislost na Google
- **Nevýhoda:** Mírně horší vizuální kvalita map oproti Google

#### Varianta C: Mapbox (kompromis)
- Moderní design, dobrý free tier (50 000 načtení/měsíc)
- Vysoká kvalita vizuálu

### Co je potřeba:
1. **Data stanic** — export z aktuálního Wix CMS (JSON se jménem, GPS, palivy, slevami)
2. **API klíč** (pro Google Maps nebo Mapbox) nebo žádný (pro Leaflet)
3. **Design markerů** — custom SVG markery se slevou
4. Geolokace prohlížeče pro řazení dle vzdálenosti

### Doporučení:
Začít s **Leaflet + OpenStreetMap** (nulové náklady, rychlá implementace), data stanic v JSON souboru. Později přejít na Google Maps pokud bude potřeba lepší vizuál.

---

## 2. Počítadlo ušetřených peněz

### Jak to funguje
Animovaný counter, který ukazuje celkovou částku ušetřenou uživateli PHMarketu. Obvykle:
- Velké číslo s animací "counting up" (např. od 0 do 2 450 000 Kč)
- Aktualizuje se periodicky nebo při scrollu do viewportu

### Implementace

#### Statická verze (okamžitě implementovatelná)
- Pevně nastavené číslo, které se pravidelně ručně aktualizuje
- Animace počítání při scrollu do viewportu (`IntersectionObserver`)
- `"use client"` komponenta s `useState` + `useEffect`
- Easing funkce pro plynulou animaci (ease-out)

#### Dynamická verze (vyžaduje backend)
- API endpoint, který vrací aktuální celkovou úsporu
- Endpoint by se volal z klienta nebo by se číslo předgenerovalo při buildu
- Data by pocházela z databáze transakcí/použitých kódů

### Co je potřeba:
1. **Aktuální číslo** celkových úspor (z interních dat PHMarket)
2. Rozhodnutí: statické číslo s ruční aktualizací, nebo API?
3. Design: kam umístit (hero sekce? stats bar? vlastní sekce?)

### Doporučení:
Začít se **statickou verzí** — animovaný counter s pevným číslem v kódu. Umístit do stats baru nebo jako samostatnou sekci na homepage. Číslo aktualizovat při každém deployi.

---

## Shrnutí — co potřebuji od tebe:

1. **Data čerpacích stanic** (jméno, adresa, GPS souřadnice, typ paliva, výše slevy)
   - Ideálně export z Wix CMS nebo manuální seznam
2. **Celková úspora** — aktuální číslo pro počítadlo
3. **Preference mapy** — Google Maps (API klíč) nebo Leaflet (zdarma)?
4. **Kde umístit počítadlo** — homepage, PHMap stránka, obojí?
