"use client";

import { useEffect, useRef, useState } from "react";

// Baseline values — set these to your real numbers at a known date
const BASELINE_DATE = new Date("2026-04-08T00:00:00Z").getTime();
const BASELINE_SAVINGS = 2_450_000; // Kč
const BASELINE_CODES = 15_200;
const BASELINE_USERS = 4_800;

// Growth rates per second (tweak to match your real growth)
const SAVINGS_PER_SEC = 0.35; // ~30 000 Kč/day
const CODES_PER_SEC = 0.006; // ~500/day
const USERS_PER_SEC = 0.0012; // ~100/day

function getLiveValue(baseline: number, perSec: number) {
  const elapsed = (Date.now() - BASELINE_DATE) / 1000;
  return baseline + Math.floor(elapsed * perSec);
}

function LiveNumber({
  baseline,
  perSec,
  suffix = "",
  prefix = "",
}: {
  baseline: number;
  perSec: number;
  suffix?: string;
  prefix?: string;
}) {
  const [value, setValue] = useState(0);
  const [visible, setVisible] = useState(false);
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Detect when in viewport
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Initial count-up animation
  useEffect(() => {
    if (!visible || animated) return;
    const target = getLiveValue(baseline, perSec);
    const duration = 2000;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setAnimated(true);
      }
    }
    requestAnimationFrame(tick);
  }, [visible, animated, baseline, perSec]);

  // After initial animation, tick live every second
  useEffect(() => {
    if (!animated) return;
    const id = setInterval(() => {
      setValue(getLiveValue(baseline, perSec));
    }, 1000);
    return () => clearInterval(id);
  }, [animated, baseline, perSec]);

  return (
    <div ref={ref}>
      <span className="tabular-nums">
        {prefix}
        {value.toLocaleString("cs-CZ")}
        {suffix}
      </span>
    </div>
  );
}

export default function SavingsCounter() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark">
            Kolik jsme už společně ušetřili
          </h2>
          <p className="mt-3 text-gray-600">
            Číslo roste v reálném čase — každou sekundu šetříme dál
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary">
              <LiveNumber
                baseline={BASELINE_SAVINGS}
                perSec={SAVINGS_PER_SEC}
                suffix=" Kč"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Celková úspora uživatelů
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary">
              <LiveNumber
                baseline={BASELINE_CODES}
                perSec={CODES_PER_SEC}
                suffix="+"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Využitých slevových kódů
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary">
              <LiveNumber
                baseline={BASELINE_USERS}
                perSec={USERS_PER_SEC}
                suffix="+"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Aktivních uživatelů
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
