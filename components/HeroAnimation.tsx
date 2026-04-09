"use client";

import { useEffect, useState } from "react";

function Coin({ delay, x }: { delay: number; x: number }) {
  return (
    <div
      className="absolute text-lg animate-coin-fall"
      style={{
        left: `${x}%`,
        animationDelay: `${delay}s`,
        top: "-10px",
      }}
    >
      <div className="w-6 h-6 rounded-full bg-yellow-400 border-2 border-yellow-500 flex items-center justify-center shadow-md animate-coin-spin">
        <span className="text-[9px] font-bold text-yellow-700">Kč</span>
      </div>
    </div>
  );
}

function Car({ started }: { started: boolean }) {
  return (
    <div
      className={`absolute bottom-0 transition-all duration-[3000ms] ease-in-out ${
        started ? "left-[38%]" : "-left-[15%]"
      }`}
    >
      <svg width="90" height="36" viewBox="0 0 90 36" fill="none">
        {/* Body */}
        <rect x="10" y="14" width="70" height="16" rx="4" fill="#1A1A1A" />
        {/* Roof */}
        <path
          d="M25 14 L35 4 L60 4 L68 14"
          fill="#2A2A2A"
          stroke="#1A1A1A"
          strokeWidth="1"
        />
        {/* Windows */}
        <path d="M37 6 L34 12 L48 12 L48 6Z" fill="#87CEEB" opacity="0.6" />
        <path d="M50 6 L50 12 L64 12 L59 6Z" fill="#87CEEB" opacity="0.6" />
        {/* Wheels */}
        <circle cx="25" cy="30" r="6" fill="#333" />
        <circle cx="25" cy="30" r="3" fill="#666" />
        <circle cx="65" cy="30" r="6" fill="#333" />
        <circle cx="65" cy="30" r="3" fill="#666" />
        {/* Headlights */}
        <rect x="78" y="18" width="4" height="4" rx="1" fill="#FDE68A" />
        {/* Tail lights */}
        <rect x="8" y="18" width="3" height="4" rx="1" fill="#EF4444" />
      </svg>
    </div>
  );
}

function PriceTotem({
  phase,
}: {
  phase: "initial" | "scanning" | "discount" | "celebration";
}) {
  const originalPrice = "38,90";
  const discountedPrice = "36,40";
  const saving = "2,50";

  return (
    <div className="relative">
      {/* Totem pole */}
      <div className="w-44 sm:w-52">
        {/* Top sign */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Brand header */}
          <div className="bg-primary px-3 py-2 text-center">
            <span className="text-white text-xs font-bold tracking-wide">
              ČERPACÍ STANICE
            </span>
          </div>

          {/* Fuel prices */}
          <div className="p-3 space-y-2.5">
            {/* Natural 95 */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-gray-500">
                Natural 95
              </span>
              <div className="relative">
                <span
                  className={`text-lg font-bold tabular-nums transition-all duration-500 ${
                    phase === "discount" || phase === "celebration"
                      ? "text-gray-300 line-through text-sm"
                      : "text-dark"
                  }`}
                >
                  {originalPrice}
                </span>
                {(phase === "discount" || phase === "celebration") && (
                  <span className="absolute -bottom-5 right-0 text-lg font-bold text-primary animate-price-pop">
                    {discountedPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Diesel */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-gray-500">
                Diesel
              </span>
              <span className="text-sm font-bold text-dark tabular-nums">
                37,50
              </span>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100" />

            {/* PHMarket code */}
            <div
              className={`transition-all duration-500 ${
                phase === "scanning" ||
                phase === "discount" ||
                phase === "celebration"
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              }`}
            >
              <div
                className={`rounded-lg border-2 border-dashed p-2 text-center transition-all duration-500 ${
                  phase === "discount" || phase === "celebration"
                    ? "border-primary bg-primary/5"
                    : "border-gray-300 bg-gray-50"
                }`}
              >
                {phase === "scanning" && (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <span className="text-[11px] text-gray-500">
                      Ověřuji kód...
                    </span>
                  </div>
                )}
                {(phase === "discount" || phase === "celebration") && (
                  <div>
                    <div className="flex items-center justify-center gap-1">
                      <svg
                        className="w-3.5 h-3.5 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      <span className="text-[11px] font-semibold text-primary">
                        PHMarket sleva aktivní
                      </span>
                    </div>
                    <p className="text-primary font-bold text-base mt-0.5">
                      -{saving} Kč/l
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Pole */}
        <div className="w-3 h-16 bg-gray-300 mx-auto rounded-b" />
      </div>

      {/* Celebration badge */}
      {phase === "celebration" && (
        <div className="absolute -right-4 top-2 animate-bounce-in">
          <div className="bg-primary text-white text-[10px] font-bold px-2.5 py-1.5 rounded-full shadow-lg whitespace-nowrap">
            Ušetřeno 125 Kč! 🎉
          </div>
        </div>
      )}

      {/* Falling coins during celebration */}
      {phase === "celebration" && (
        <div className="absolute inset-x-0 top-0 h-full overflow-hidden pointer-events-none">
          <Coin delay={0} x={20} />
          <Coin delay={0.3} x={50} />
          <Coin delay={0.6} x={75} />
          <Coin delay={0.9} x={35} />
          <Coin delay={1.2} x={60} />
          <Coin delay={1.5} x={15} />
          <Coin delay={1.8} x={80} />
          <Coin delay={2.1} x={45} />
        </div>
      )}
    </div>
  );
}

export default function HeroAnimation() {
  const [phase, setPhase] = useState<
    "initial" | "scanning" | "discount" | "celebration"
  >("initial");
  const [carStarted, setCarStarted] = useState(false);

  useEffect(() => {
    function runSequence() {
      setPhase("initial");
      setCarStarted(false);

      // Car starts driving
      const t1 = setTimeout(() => setCarStarted(true), 300);
      // Car arrives, scanning starts
      const t2 = setTimeout(() => setPhase("scanning"), 2800);
      // Discount applied
      const t3 = setTimeout(() => setPhase("discount"), 4200);
      // Celebration with coins
      const t4 = setTimeout(() => setPhase("celebration"), 5000);
      // Reset for next loop
      const t5 = setTimeout(() => {
        setPhase("initial");
        setCarStarted(false);
      }, 9000);

      return [t1, t2, t3, t4, t5];
    }

    let timers = runSequence();
    const loop = setInterval(() => {
      timers.forEach(clearTimeout);
      timers = runSequence();
    }, 9500);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(loop);
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center">
      {/* Totem */}
      <PriceTotem phase={phase} />

      {/* Road with car */}
      <div className="relative w-full mt-2">
        {/* Road surface */}
        <div className="h-10 bg-gray-700 rounded-lg relative overflow-hidden">
          {/* Road lines */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-center gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="w-6 h-1 bg-yellow-400/60 rounded-full"
              />
            ))}
          </div>
          {/* Car */}
          <Car started={carStarted} />
        </div>
      </div>
    </div>
  );
}
