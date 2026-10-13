"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SCREENS = ["/app-home.png", "/app-vyhodne.png", "/app-kvalita.png"];
const SCREEN_MS = 4200;

type Phase = "arrival" | "fueling" | "done" | "leaving";

/* ------------------------------------------------------------------ */
/*  Auto                                                               */
/* ------------------------------------------------------------------ */
function Wheel({ cx, moving }: { cx: number; moving: boolean }) {
  return (
    <>
      <circle cx={cx} cy="34" r="7.5" fill="#0b0f0c" />
      <g className={moving ? "scene-wheel-spin" : ""}>
        <circle cx={cx} cy="34" r="3.6" fill="#dfe6e0" />
        <line x1={cx} y1="30.4" x2={cx} y2="37.6" stroke="#5b665f" strokeWidth="1.2" />
        <line x1={cx - 3.6} y1="34" x2={cx + 3.6} y2="34" stroke="#5b665f" strokeWidth="1.2" />
      </g>
    </>
  );
}

function CarSvg({ moving }: { moving: boolean }) {
  return (
    <svg width="108" height="44" viewBox="0 0 108 44" fill="none" aria-hidden="true">
      <path d="M30 18 L40 5 L66 5 L78 18 Z" fill="#f4f7f4" />
      <rect x="12" y="17" width="84" height="17" rx="6" fill="#f4f7f4" />
      <rect x="12" y="28" width="84" height="6" rx="3" fill="#d5dcd6" />
      <path d="M41.5 7.5 L35 15.5 L50 15.5 L50 7.5 Z" fill="#0f4a22" />
      <path d="M53 7.5 L53 15.5 L70.5 15.5 L64.5 7.5 Z" fill="#0f4a22" />
      <line x1="54" y1="19" x2="54" y2="30" stroke="#c3ccc5" strokeWidth="0.8" />
      {/* Predni a zadni svetlo */}
      <rect x="92" y="21" width="4" height="5" rx="1.5" fill="#fde68a" />
      <rect x="12" y="21" width="3" height="5" rx="1.5" fill="#c8472a" />
      {/* Vicko nadrze */}
      <circle cx="19" cy="24" r="1.8" fill="#186e31" />
      <Wheel cx={32} moving={moving} />
      <Wheel cx={76} moving={moving} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Stojan                                                             */
/* ------------------------------------------------------------------ */
function FuelPump({ filled }: { filled: boolean }) {
  return (
    <div className="relative" style={{ width: 50, height: 84 }}>
      <svg width="50" height="84" viewBox="0 0 50 84" fill="none" aria-hidden="true">
        <rect x="5" y="78" width="38" height="6" rx="1.5" fill="#0b0f0c" opacity="0.55" />
        <rect x="9" y="16" width="30" height="62" rx="3" fill="#f4f7f4" />
        <rect x="9" y="12" width="30" height="8" rx="3" fill="#0f4a22" />
        <rect x="13" y="25" width="22" height="13" rx="1.5" fill="#0b0f0c" />
        <rect x="13" y="44" width="22" height="2" rx="1" fill="#d5dcd6" />
        <rect x="13" y="49" width="22" height="2" rx="1" fill="#d5dcd6" />
        <rect x="14" y="62" width="20" height="9" rx="1.5" fill="#186e31" />
        <rect x="39" y="40" width="6" height="14" rx="2" fill="#0b0f0c" />
      </svg>
      {/* Ukazatel tankovani na displeji */}
      <div
        className="absolute overflow-hidden"
        style={{ left: 15, top: 27, width: 18, height: 9 }}
      >
        <div
          className="h-full bg-[#68cc84]"
          style={{ width: filled ? "100%" : "6%", transition: "width 3.6s linear" }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Scena: auto prijede ke stojanu, natankuje a odjede                 */
/* ------------------------------------------------------------------ */
function Station({ phase, animate }: { phase: Phase; animate: boolean }) {
  const [entered, setEntered] = useState(!animate);
  useEffect(() => {
    if (!animate) return;
    const r = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(r);
  }, [animate]);

  const leaving = phase === "leaving";
  const moving = animate && (!entered || leaving || phase === "arrival");
  const carTx = !entered ? -360 : leaving ? 360 : 0;
  const carTransition = !entered
    ? "none"
    : leaving
    ? "transform 1.1s cubic-bezier(0.5,0,0.75,0)"
    : "transform 2.4s cubic-bezier(0.33,0,0.2,1)";

  const fueling = phase === "fueling";
  const filled = fueling || phase === "done";

  return (
    <div
      className="absolute bottom-3 left-1/2 origin-bottom"
      style={{ width: 264, height: 90, transform: "translateX(-50%) scale(1.3)" }}
    >
      <div className="absolute bottom-0 left-[8px]">
        <FuelPump filled={filled} />
      </div>

      {/* Hadice ze stojanu do nadrze */}
      <svg
        width="264"
        height="90"
        viewBox="0 0 264 90"
        fill="none"
        className={`pointer-events-none absolute inset-0 z-10 transition-opacity duration-500 ${
          fueling ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        <path d="M52 52 C 56 72, 72 78, 84 71" stroke="#0b0f0c" strokeWidth="3.4" strokeLinecap="round" />
        <path
          d="M52 52 C 56 72, 72 78, 84 71"
          stroke="#68cc84"
          strokeWidth="1.4"
          strokeLinecap="round"
          className="scene-hose-flow"
        />
        <rect x="81" y="67" width="8" height="5" rx="1.5" fill="#0b0f0c" />
      </svg>

      <div
        className="absolute bottom-0"
        style={{ left: 68, transform: `translateX(${carTx}px)`, transition: carTransition }}
      >
        <div className={moving ? "scene-car-bob" : ""}>
          <CarSvg moving={moving} />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Telefon                                                            */
/* ------------------------------------------------------------------ */
function Phone({ screen, label }: { screen: number; label: string }) {
  return (
    <div className="relative w-[232px] sm:w-[248px] lg:w-[262px]">
      {/* Bocni tlacitka */}
      <span className="absolute -left-[3px] top-[19%] h-[5%] w-[3px] rounded-l-sm bg-[#1c211d]" />
      <span className="absolute -left-[3px] top-[27%] h-[9%] w-[3px] rounded-l-sm bg-[#1c211d]" />
      <span className="absolute -left-[3px] top-[38%] h-[9%] w-[3px] rounded-l-sm bg-[#1c211d]" />
      <span className="absolute -right-[3px] top-[31%] h-[13%] w-[3px] rounded-r-sm bg-[#1c211d]" />

      {/* Ram: tenky kovovy okraj a cerny ramecek displeje */}
      <div
        className="relative aspect-[640/1391] rounded-[2.9rem] bg-gradient-to-b from-[#59625b] via-[#1d231f] to-[#3b433d] p-[2px]"
        style={{
          boxShadow:
            "0 44px 70px -30px rgba(4,20,9,0.75), 0 22px 36px -22px rgba(4,20,9,0.6), 0 0 0 1px rgba(4,20,9,0.35)",
        }}
      >
        <div className="h-full w-full rounded-[2.8rem] bg-[#070a08] p-[7px]">
          <div className="relative h-full w-full overflow-hidden rounded-[2.35rem] bg-[#f6f8f6]">
            {SCREENS.map((src, i) => (
              <Image
                key={src}
                src={src}
                alt={i === 0 ? label : ""}
                fill
                sizes="(max-width: 640px) 232px, (max-width: 1024px) 248px, 262px"
                className={`object-cover object-top transition-[opacity,transform] duration-700 ease-out ${
                  i === screen ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"
                }`}
                priority={i === 0}
              />
            ))}
            {/* Vyrez pro kameru */}
            <span className="absolute left-1/2 top-[1.5%] h-[3.6%] w-[30%] -translate-x-1/2 rounded-full bg-[#070a08]" />
            {/* Odlesk skla */}
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.14] via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Hero vizual: telefon se skutecnymi obrazovkami aplikace na zelenem bloku
 * a pod nim auto, ktere prijede ke stojanu, natankuje a odjede.
 */
export default function PhoneShowcase({ label }: { label: string }) {
  const [screen, setScreen] = useState(0);
  const [phase, setPhase] = useState<Phase>("arrival");
  const [cycle, setCycle] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Bez pohybu: auto stoji natankovane u stojanu, obrazovky se prepinaji jen kliknutim.
      setAnimate(false);
      setPhase("done");
      return;
    }

    const screens = setInterval(() => setScreen((s) => (s + 1) % SCREENS.length), SCREEN_MS);

    function runSequence() {
      setPhase("arrival");
      return [
        setTimeout(() => setPhase("fueling"), 2800),
        setTimeout(() => setPhase("done"), 6600),
        setTimeout(() => setPhase("leaving"), 8200),
      ];
    }
    let timers = runSequence();
    const loop = setInterval(() => {
      timers.forEach(clearTimeout);
      setCycle((c) => c + 1);
      timers = runSequence();
    }, 9800);

    return () => {
      clearInterval(screens);
      clearInterval(loop);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[440px]">
      {/* Zeleny blok, stejny prechod jako hlavicka v aplikaci */}
      <div className="absolute inset-x-0 bottom-0 top-12 overflow-hidden bg-gradient-to-b from-primary-dark via-primary to-[#3f9a4e]">
        {/* Vozovka */}
        <div className="absolute inset-x-0 bottom-0 h-[118px] bg-[#0b2a14]/55">
          <div className="absolute inset-x-0 bottom-3 h-px bg-white/25" />
          <Station key={cycle} phase={phase} animate={animate} />
        </div>
      </div>

      <div className="relative flex items-center justify-center gap-5 pb-[136px]">
        <Phone screen={screen} label={label} />

        {/* Prepinani obrazovek */}
        <div className="absolute right-4 top-1/2 flex -translate-y-1/2 flex-col gap-1 sm:right-7">
          {SCREENS.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setScreen(i)}
              aria-label={`${label} ${i + 1}`}
              aria-pressed={i === screen}
              className="group px-2 py-1"
            >
              <span
                className={`block w-1 transition-[height,background-color] duration-300 ${
                  i === screen ? "h-8 bg-white" : "h-4 bg-white/40 group-hover:bg-white/70"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
