"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

type Phase = "arrival" | "fueling" | "celebration" | "leaving";

/* ------------------------------------------------------------------ */
/*  Gold Coin                                                          */
/* ------------------------------------------------------------------ */
function GoldCoin({ delay, x, size = 24 }: { delay: number; x: number; size?: number }) {
  return (
    <div
      className="absolute hero-coin-fall"
      style={{ left: `${x}%`, animationDelay: `${delay}s`, top: "-20px" }}
    >
      <div
        className="rounded-full bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600 border-2 border-yellow-500 flex items-center justify-center shadow-lg hero-coin-spin"
        style={{ width: size, height: size }}
      >
        <span className="font-bold text-yellow-800" style={{ fontSize: size * 0.38 }}>
          Kč
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Price Tag Card (glass-morphism)                                    */
/* ------------------------------------------------------------------ */
function PriceCard({ type, visible }: { type: "competitor" | "phmarket"; visible: boolean }) {
  const t = useTranslations("hero");
  const isCompetitor = type === "competitor";

  const posClass = isCompetitor
    ? "top-[2%] left-1 sm:left-2 lg:top-[14%] lg:left-[-60px]"
    : "top-[2%] right-1 sm:right-2 lg:top-[40%] lg:right-[-60px]";

  return (
    <div
      className={`hero-glass-card absolute z-30 ${posClass} transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
      } ${isCompetitor ? "hero-levitate-1" : "hero-levitate-2"}`}
    >
      <div
        className={`rounded-xl lg:rounded-2xl px-3 py-2 lg:px-5 lg:py-3 border ${
          isCompetitor ? "border-red-400/30 bg-red-500/10" : "border-emerald-400/30 bg-emerald-500/10"
        } backdrop-blur-xl shadow-2xl`}
      >
        <p className="text-[10px] lg:text-[11px] font-medium text-white/60 mb-0.5 lg:mb-1">
          {isCompetitor ? t("competitor") : t("phmarketDiscount")}
        </p>
        <p className={`text-base lg:text-xl font-bold ${isCompetitor ? "text-red-400" : "text-emerald-400"}`}>
          {isCompetitor ? "39,90 Kč/l" : "−3,50 Kč/l"}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Savings Badge                                                      */
/* ------------------------------------------------------------------ */
function SavingsBadge({ visible }: { visible: boolean }) {
  const t = useTranslations("hero");
  return (
    <div
      className={`absolute top-0 lg:-top-4 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ${
        visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-50 -translate-y-4"
      }`}
    >
      <div className="hero-glass-card rounded-full px-4 py-2 lg:px-5 lg:py-2.5 border border-emerald-400/40 bg-emerald-500/15 backdrop-blur-xl shadow-2xl whitespace-nowrap">
        <span className="text-xs lg:text-sm font-bold text-emerald-400">
          {t("saved")}
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Digital Road Lines (background layer)                              */
/* ------------------------------------------------------------------ */
function DigitalRoad({ active }: { active: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className={`absolute h-[2px] rounded-full transition-opacity duration-1000 ${active ? "opacity-100" : "opacity-0"}`}
          style={{
            background: "linear-gradient(90deg, transparent, #D4A017, transparent)",
            width: `${60 + i * 15}%`,
            left: `${20 - i * 5}%`,
            top: `${55 + i * 8}%`,
            animation: active ? `hero-road-slide ${3 + i * 0.5}s linear infinite` : "none",
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Car (premium SVG)                                                  */
/* ------------------------------------------------------------------ */
function CarSvg({ moving }: { moving: boolean }) {
  return (
    <svg width="108" height="44" viewBox="0 0 108 44" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="carBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1f3b2c" />
          <stop offset="55%" stopColor="#13261c" />
          <stop offset="100%" stopColor="#0b1812" />
        </linearGradient>
        <linearGradient id="carRoof" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#27523c" />
          <stop offset="100%" stopColor="#16302322" />
        </linearGradient>
      </defs>
      <rect x="12" y="17" width="84" height="17" rx="6" fill="url(#carBody)" stroke="#34d399" strokeOpacity="0.35" strokeWidth="1" />
      <path d="M30 17 L40 5 L66 5 L78 17 Z" fill="url(#carRoof)" stroke="#34d399" strokeOpacity="0.25" strokeWidth="1" />
      <path d="M41 7 L34.5 15 L50 15 L50 7 Z" fill="#9be7cf" opacity="0.45" />
      <path d="M53 7 L53 15 L70 15 L64 7 Z" fill="#9be7cf" opacity="0.45" />
      <line x1="54" y1="19" x2="54" y2="32" stroke="#0b1812" strokeWidth="0.8" strokeOpacity="0.6" />
      <rect x="92" y="21" width="4" height="5" rx="1.5" fill="#fde68a" />
      <circle cx="94" cy="23.5" r="3.5" fill="#fde68a" opacity="0.35" />
      <rect x="12" y="21" width="3" height="5" rx="1.5" fill="#34d399" />
      {/* Fuel cap (rear / left) */}
      <circle cx="18" cy="25" r="1.6" fill="#34d399" opacity="0.7" />

      {/* Rear wheel */}
      <circle cx="32" cy="34" r="7.5" fill="#15110f" stroke="#2c2c2c" strokeWidth="1" />
      <g className={moving ? "hero-wheel-spin" : ""} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <circle cx="32" cy="34" r="3.6" fill="#9aa0a6" />
        <line x1="32" y1="30.4" x2="32" y2="37.6" stroke="#3a3f44" strokeWidth="1.2" />
        <line x1="28.4" y1="34" x2="35.6" y2="34" stroke="#3a3f44" strokeWidth="1.2" />
      </g>
      {/* Front wheel */}
      <circle cx="76" cy="34" r="7.5" fill="#15110f" stroke="#2c2c2c" strokeWidth="1" />
      <g className={moving ? "hero-wheel-spin" : ""} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <circle cx="76" cy="34" r="3.6" fill="#9aa0a6" />
        <line x1="76" y1="30.4" x2="76" y2="37.6" stroke="#3a3f44" strokeWidth="1.2" />
        <line x1="72.4" y1="34" x2="79.6" y2="34" stroke="#3a3f44" strokeWidth="1.2" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Fuel Pump (dispenser)                                              */
/* ------------------------------------------------------------------ */
function FuelPump({ active, filled }: { active: boolean; filled: boolean }) {
  return (
    <div className="relative" style={{ width: 50, height: 84 }}>
      <svg width="50" height="84" viewBox="0 0 50 84" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="pumpBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#214034" />
            <stop offset="100%" stopColor="#0c1a13" />
          </linearGradient>
        </defs>
        {/* Base plinth */}
        <rect x="5" y="77" width="38" height="7" rx="2" fill="#0a1611" />
        {/* Body */}
        <rect x="9" y="18" width="30" height="60" rx="5" fill="url(#pumpBody)" stroke="#34d399" strokeOpacity="0.4" strokeWidth="1" />
        {/* Top cap */}
        <rect x="9" y="13" width="30" height="7" rx="3" fill="#1c8a52" />
        {/* Display frame */}
        <rect x="13" y="25" width="22" height="13" rx="2" fill="#04130c" stroke="#0f3a26" strokeWidth="1" />
        {/* Grille / buttons */}
        <rect x="13" y="44" width="22" height="2" rx="1" fill="#0f3a26" />
        <rect x="13" y="49" width="22" height="2" rx="1" fill="#0f3a26" />
        <circle cx="16" cy="58" r="2" fill="#0f3a26" />
        <circle cx="24" cy="58" r="2" fill="#0f3a26" />
        <circle cx="32" cy="58" r="2" fill="#0f3a26" />
        {/* PHM label */}
        <rect x="14" y="66" width="20" height="7" rx="1.5" fill="#1c8a52" opacity="0.5" />
        {/* Nozzle holster (right) */}
        <rect x="39" y="40" width="6" height="14" rx="2" fill="#15281e" stroke="#34d399" strokeOpacity="0.3" />
      </svg>

      {/* Animated fuel-fill bar inside the display */}
      <div className="absolute overflow-hidden rounded-[2px]" style={{ left: 15, top: 27, width: 18, height: 9 }}>
        <div
          className="h-full rounded-[2px] bg-gradient-to-r from-emerald-500 to-emerald-300"
          style={{
            width: filled ? "100%" : "6%",
            transition: "width 3.6s linear",
            boxShadow: "0 0 6px rgba(52,211,153,0.7)",
          }}
        />
      </div>

      {/* Pump glow when active */}
      {active && (
        <div className="absolute rounded-full bg-emerald-400/30 blur-md hero-pump-glow" style={{ left: 6, top: 20, width: 38, height: 24 }} />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Fuel Station scene (pump + car + hose), bottom of the scene        */
/* ------------------------------------------------------------------ */
function Station({ phase }: { phase: Phase }) {
  // Car enters on (re)mount, parks, and leaves on the "leaving" phase.
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const r = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(r);
  }, []);

  const leaving = phase === "leaving";
  const moving = !entered || leaving;
  const carTx = !entered ? -250 : leaving ? 300 : 0;
  const carTransition = !entered
    ? "none"
    : leaving
    ? "transform 1s cubic-bezier(0.5,0,0.75,0), opacity 1s ease-in"
    : "transform 2.4s cubic-bezier(0.33,0,0.2,1)";

  const fueling = phase === "fueling";
  const filled = phase === "fueling" || phase === "celebration";

  return (
    <div
      className="absolute bottom-[1%] left-1/2 z-20 origin-bottom scale-[0.82] sm:scale-95 lg:scale-110"
      style={{ width: 264, height: 90, transform: "translateX(-50%)" }}
    >
      {/* Ground shadow */}
      <div className="absolute left-[8px] right-[24px] bottom-[2px] h-[6px] rounded-full bg-black/30 blur-[3px]" />

      {/* Pump (left): car pulls up and parks with its rear next to it */}
      <div className="absolute bottom-0 left-[8px]">
        <FuelPump active={fueling} filled={filled} />
      </div>

      {/* Hose + nozzle from pump to the car's fuel cap (during fueling) */}
      <svg
        width="264"
        height="90"
        viewBox="0 0 264 90"
        fill="none"
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${fueling ? "opacity-100" : "opacity-0"}`}
        aria-hidden="true"
      >
        <path d="M52 52 C 60 64, 70 66, 80 64" stroke="#0f3a26" strokeWidth="3" strokeLinecap="round" />
        <path d="M52 52 C 60 64, 70 66, 80 64" stroke="#34d399" strokeWidth="1.6" strokeLinecap="round" className="hero-hose-flow" />
        {/* Nozzle into the fuel cap */}
        <rect x="78" y="61" width="7" height="5" rx="1.5" fill="#34d399" />
      </svg>

      {/* Fuel drop at the cap while fueling */}
      {fueling && (
        <div className="absolute hero-fuel-drop" style={{ left: 82, top: 66 }}>
          <div className="w-[3px] h-[4px] rounded-full bg-emerald-300" />
        </div>
      )}

      {/* Car (pulls in from the left, parks with rear toward the pump) */}
      <div
        className="absolute bottom-0"
        style={{
          left: 68,
          transform: `translateX(${carTx}px)`,
          opacity: leaving ? 0 : 1,
          transition: carTransition,
        }}
      >
        <div className={moving ? "hero-car-bob" : ""}>
          <CarSvg moving={moving} />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Phone Mockup                                                       */
/* ------------------------------------------------------------------ */
function PhoneMockup({ visible }: { visible: boolean }) {
  return (
    <div
      className={`relative z-10 transition-all duration-1000 ease-out ${
        visible ? "opacity-100 translate-y-0 rotate-[-3deg]" : "opacity-0 translate-y-12 rotate-[0deg]"
      }`}
    >
      <div className="relative w-[200px] h-[400px] sm:w-[240px] sm:h-[480px] lg:w-[280px] lg:h-[560px] xl:w-[310px] xl:h-[620px] rounded-[2.5rem] bg-gradient-to-b from-gray-800 to-gray-900 p-[6px] shadow-2xl shadow-black/40">
        <div className="relative w-full h-full rounded-[2.2rem] overflow-hidden bg-black">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-b-2xl z-20" />
          <Image
            src="/app-screenshot.png"
            alt="PHMarket aplikace"
            fill
            sizes="(max-width: 640px) 200px, (max-width: 1024px) 240px, (max-width: 1280px) 280px, 310px"
            className="object-cover object-top"
            priority
          />
        </div>
      </div>
      <div className="absolute -inset-8 bg-emerald-500/10 rounded-full blur-3xl -z-10 hero-phone-glow" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Animation Component                                           */
/* ------------------------------------------------------------------ */
export default function HeroRedesignAnimation() {
  const [phase, setPhase] = useState<Phase>("arrival");
  const [cycle, setCycle] = useState(0);
  const [phoneVisible, setPhoneVisible] = useState(false);

  useEffect(() => {
    function runSequence() {
      setPhase("arrival");
      setPhoneVisible(false);

      const t0 = setTimeout(() => setPhoneVisible(true), 200);
      const t1 = setTimeout(() => setPhase("fueling"), 3000);
      const t2 = setTimeout(() => setPhase("celebration"), 7000);
      const t3 = setTimeout(() => {
        setPhase("leaving");
        setPhoneVisible(false);
      }, 10000);

      return [t0, t1, t2, t3];
    }

    let timers = runSequence();
    const loop = setInterval(() => {
      timers.forEach(clearTimeout);
      setCycle((c) => c + 1);
      timers = runSequence();
    }, 11000);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(loop);
    };
  }, []);

  const showRoad = phase !== "leaving";
  const showCompetitor = phase === "fueling";
  const showPhmarket = phase === "fueling" || phase === "celebration";
  const showCoins = phase === "celebration";
  const showBadge = phase === "celebration";
  const showGlow = phase === "celebration";

  return (
    <div className="relative w-full h-full flex items-start justify-center pt-2 min-h-[500px] sm:min-h-[580px] lg:min-h-[660px] xl:min-h-[720px]">
      {/* Layer 1: Digital Road */}
      <DigitalRoad active={showRoad} />

      {/* Layer 2: Price Cards */}
      <PriceCard type="competitor" visible={showCompetitor} />
      <PriceCard type="phmarket" visible={showPhmarket} />

      {/* Layer 3: Phone */}
      <PhoneMockup visible={phoneVisible} />

      {/* Celebration glow aura */}
      {showGlow && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-64 h-64 bg-emerald-400/15 rounded-full blur-3xl hero-pulse-glow" />
        </div>
      )}

      {/* Savings Badge */}
      <SavingsBadge visible={showBadge} />

      {/* Layer 4: Fuel station (car + pump) */}
      <Station key={cycle} phase={phase} />

      {/* Layer 5: Falling Coins */}
      {showCoins && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-40">
          <GoldCoin delay={0} x={10} size={22} />
          <GoldCoin delay={0.2} x={25} size={18} />
          <GoldCoin delay={0.4} x={42} size={26} />
          <GoldCoin delay={0.6} x={58} size={20} />
          <GoldCoin delay={0.8} x={72} size={24} />
          <GoldCoin delay={1.0} x={88} size={18} />
          <GoldCoin delay={1.2} x={35} size={22} />
          <GoldCoin delay={1.4} x={65} size={20} />
          <GoldCoin delay={1.6} x={15} size={16} />
          <GoldCoin delay={1.8} x={80} size={24} />
        </div>
      )}
    </div>
  );
}
