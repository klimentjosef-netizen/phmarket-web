"use client";

import { useEffect, useRef, useState } from "react";

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function AnimatedNumber({
  target,
  duration = 2000,
  suffix = "",
  prefix = "",
}: {
  target: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [started, target, duration]);

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
            A číslo stále roste — každý den přibývají noví uživatelé
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary">
              <AnimatedNumber target={2450000} suffix=" Kč" />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Celková úspora uživatelů
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary">
              <AnimatedNumber target={15200} prefix="" suffix="+" />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Využitých slevových kódů
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary">
              <AnimatedNumber target={4800} suffix="+" />
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
