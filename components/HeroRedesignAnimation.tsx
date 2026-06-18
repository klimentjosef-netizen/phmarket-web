"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  Gold Coin                                                          */
/* ------------------------------------------------------------------ */
function GoldCoin({ delay, x, size = 24 }: { delay: number; x: number; size?: number }) {
  return (
    <div
      className="absolute hero-coin-fall"
      style={{
        left: `${x}%`,
        animationDelay: `${delay}s`,
        top: "-20px",
      }}
    >
      <div
        className="rounded-full bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600 border-2 border-yellow-500 flex items-center justify-center shadow-lg hero-coin-spin"
        style={{ width: size, height: size }}
      >
        <span
          className="font-bold text-yellow-800"
          style={{ fontSize: size * 0.38 }}
        >
          Kc
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Price Tag Card (glass-morphism)                                    */
/* ------------------------------------------------------------------ */
function PriceCard({
  type,
  visible,
}: {
  type: "competitor" | "phmarket";
  visible: boolean;
}) {
  const isCompetitor = type === "competitor";

  return (
    <div
      className={`hero-glass-card absolute transition-all duration-700 ${
        visible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-4 scale-95"
      } ${isCompetitor ? "hero-levitate-1" : "hero-levitate-2"}`}
      style={{
        ...(isCompetitor
          ? { top: "15%", left: "-70px" }
          : { bottom: "20%", right: "-70px" }),
      }}
    >
      <div
        className={`rounded-2xl px-5 py-3 border ${
          isCompetitor
            ? "border-red-400/30 bg-red-500/10"
            : "border-emerald-400/30 bg-emerald-500/10"
        } backdrop-blur-xl shadow-2xl`}
      >
        <p className="text-[11px] font-medium text-white/60 mb-1">
          {isCompetitor ? "Konkurence" : "PHMarket Sleva"}
        </p>
        <p
          className={`text-xl font-bold ${
            isCompetitor ? "text-red-400" : "text-emerald-400"
          }`}
        >
          {isCompetitor ? "39,90 Kc/l" : "-3,50 Kc/l"}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Savings Badge                                                      */
/* ------------------------------------------------------------------ */
function SavingsBadge({ visible }: { visible: boolean }) {
  return (
    <div
      className={`absolute -top-4 left-1/2 -translate-x-1/2 z-20 transition-all duration-500 ${
        visible
          ? "opacity-100 scale-100 translate-y-0"
          : "opacity-0 scale-50 -translate-y-4"
      }`}
    >
      <div className="hero-glass-card rounded-full px-5 py-2.5 border border-emerald-400/40 bg-emerald-500/15 backdrop-blur-xl shadow-2xl whitespace-nowrap">
        <span className="text-sm font-bold text-emerald-400">
          Usetfeno: 175 Kc na nadrzi
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
      {/* Perspective road lines */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className={`absolute h-[2px] rounded-full transition-opacity duration-1000 ${
            active ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(90deg, transparent, #D4A017, transparent)",
            width: `${60 + i * 15}%`,
            left: `${20 - i * 5}%`,
            top: `${55 + i * 8}%`,
            animationDelay: `${i * 0.8}s`,
            animation: active
              ? `hero-road-slide ${3 + i * 0.5}s linear infinite`
              : "none",
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Driving Car (premium SVG)                                          */
/* ------------------------------------------------------------------ */
function Car() {
  return (
    <div className="absolute bottom-[2%] z-20 hero-car-drive pointer-events-none">
      <div className="relative hero-car-bob">
        {/* Headlight beam (driving direction → right) */}
        <div className="absolute right-0 top-[42%] -translate-y-1/2 translate-x-full w-16 h-7 bg-gradient-to-r from-amber-200/35 to-transparent blur-md rounded-full" />
        {/* Emerald underglow / motion shadow */}
        <div className="absolute inset-x-2 -bottom-1 h-3 bg-emerald-400/30 blur-md rounded-full" />

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

          {/* Body */}
          <rect x="12" y="17" width="84" height="17" rx="6" fill="url(#carBody)" stroke="#34d399" strokeOpacity="0.35" strokeWidth="1" />
          {/* Cabin / roof */}
          <path d="M30 17 L40 5 L66 5 L78 17 Z" fill="url(#carRoof)" stroke="#34d399" strokeOpacity="0.25" strokeWidth="1" />
          {/* Windows */}
          <path d="M41 7 L34.5 15 L50 15 L50 7 Z" fill="#9be7cf" opacity="0.45" />
          <path d="M53 7 L53 15 L70 15 L64 7 Z" fill="#9be7cf" opacity="0.45" />
          {/* Door seam */}
          <line x1="54" y1="19" x2="54" y2="32" stroke="#0b1812" strokeWidth="0.8" strokeOpacity="0.6" />
          {/* Headlight (front / right) */}
          <rect x="92" y="21" width="4" height="5" rx="1.5" fill="#fde68a" />
          <circle cx="94" cy="23.5" r="3.5" fill="#fde68a" opacity="0.35" />
          {/* Tail light (rear / left) */}
          <rect x="12" y="21" width="3" height="5" rx="1.5" fill="#34d399" />

          {/* Rear wheel */}
          <circle cx="32" cy="34" r="7.5" fill="#15110f" stroke="#2c2c2c" strokeWidth="1" />
          <g className="hero-wheel-spin" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
            <circle cx="32" cy="34" r="3.6" fill="#9aa0a6" />
            <line x1="32" y1="30.4" x2="32" y2="37.6" stroke="#3a3f44" strokeWidth="1.2" />
            <line x1="28.4" y1="34" x2="35.6" y2="34" stroke="#3a3f44" strokeWidth="1.2" />
          </g>
          {/* Front wheel */}
          <circle cx="76" cy="34" r="7.5" fill="#15110f" stroke="#2c2c2c" strokeWidth="1" />
          <g className="hero-wheel-spin" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
            <circle cx="76" cy="34" r="3.6" fill="#9aa0a6" />
            <line x1="76" y1="30.4" x2="76" y2="37.6" stroke="#3a3f44" strokeWidth="1.2" />
            <line x1="72.4" y1="34" x2="79.6" y2="34" stroke="#3a3f44" strokeWidth="1.2" />
          </g>
        </svg>
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
        visible
          ? "opacity-100 translate-y-0 rotate-[-3deg]"
          : "opacity-0 translate-y-12 rotate-[0deg]"
      }`}
    >
      {/* Phone frame */}
      <div className="relative w-[220px] h-[440px] sm:w-[260px] sm:h-[520px] lg:w-[300px] lg:h-[600px] xl:w-[340px] xl:h-[680px] rounded-[2.5rem] bg-gradient-to-b from-gray-800 to-gray-900 p-[6px] shadow-2xl shadow-black/40">
        {/* Screen bezel */}
        <div className="relative w-full h-full rounded-[2.2rem] overflow-hidden bg-black">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-b-2xl z-20" />

          {/* App screenshot */}
          <Image
            src="/app-screenshot.png"
            alt="PHMarket aplikace"
            fill
            sizes="(max-width: 640px) 220px, (max-width: 1024px) 260px, (max-width: 1280px) 300px, 340px"
            className="object-cover object-top"
            priority
          />
        </div>
      </div>

      {/* Phone glow */}
      <div className="absolute -inset-8 bg-emerald-500/10 rounded-full blur-3xl -z-10 hero-phone-glow" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Animation Component                                           */
/* ------------------------------------------------------------------ */
export default function HeroRedesignAnimation() {
  const [phase, setPhase] = useState<
    "arrival" | "comparison" | "celebration" | "reset"
  >("arrival");
  const [phoneVisible, setPhoneVisible] = useState(false);

  useEffect(() => {
    function runSequence() {
      setPhase("arrival");
      setPhoneVisible(false);

      // Phone appears
      const t0 = setTimeout(() => setPhoneVisible(true), 200);
      // Road lines start with phone (handled by phase)

      // Comparison phase (3s in)
      const t1 = setTimeout(() => setPhase("comparison"), 3000);

      // Celebration phase (7s in)
      const t2 = setTimeout(() => setPhase("celebration"), 7000);

      // Reset (10s in)
      const t3 = setTimeout(() => {
        setPhase("reset");
        setPhoneVisible(false);
      }, 10000);

      return [t0, t1, t2, t3];
    }

    let timers = runSequence();
    const loop = setInterval(() => {
      timers.forEach(clearTimeout);
      timers = runSequence();
    }, 10500);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(loop);
    };
  }, []);

  const showRoad = phase !== "reset";
  const showCompetitor = phase === "comparison";
  const showPhmarket = phase === "comparison" || phase === "celebration";
  const showCoins = phase === "celebration";
  const showBadge = phase === "celebration";
  const showGlow = phase === "celebration";

  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[480px] sm:min-h-[560px] lg:min-h-[640px] xl:min-h-[720px]">
      {/* Layer 1: Digital Road */}
      <DigitalRoad active={showRoad} />

      {/* Layer 1b: Driving Car */}
      <Car />

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

      {/* Layer 3: Falling Coins */}
      {showCoins && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-30">
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
