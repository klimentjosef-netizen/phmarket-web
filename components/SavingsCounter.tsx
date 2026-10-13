"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

// Baseline values: set these to your real numbers at a known date
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
  const t = useTranslations("savings");
  return (
    <section className="py-16 md:py-24">
      <div className="container-page">
        <div className="reveal max-w-2xl">
          <h2 className="h-section">{t("title")}</h2>
          <p className="lead mt-4">{t("subtitle")}</p>
        </div>

        <div className="reveal mt-10 grid grid-cols-1 border border-line bg-surface lg:grid-cols-[1.7fr_1fr]">
          <div className="p-6 sm:p-10">
            <div className="font-mono text-[2.5rem] font-light leading-none tracking-[-0.05em] text-accent sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
              <LiveNumber baseline={BASELINE_SAVINGS} perSec={SAVINGS_PER_SEC} suffix=" Kč" />
            </div>
            <p className="mt-4 text-sm text-muted md:text-base">{t("totalSaved")}</p>
          </div>

          <div className="grid grid-cols-2 border-t border-line lg:grid-cols-1 lg:border-l lg:border-t-0">
            <div className="p-6 sm:px-10 lg:py-7">
              <div className="font-mono text-3xl font-light tracking-[-0.04em] text-ink md:text-4xl">
                <LiveNumber baseline={BASELINE_CODES} perSec={CODES_PER_SEC} suffix="+" />
              </div>
              <p className="mt-2 text-sm text-muted">{t("codesUsed")}</p>
            </div>
            <div className="border-l border-line p-6 sm:px-10 lg:border-l-0 lg:border-t lg:py-7">
              <div className="font-mono text-3xl font-light tracking-[-0.04em] text-ink md:text-4xl">
                <LiveNumber baseline={BASELINE_USERS} perSec={USERS_PER_SEC} suffix="+" />
              </div>
              <p className="mt-2 text-sm text-muted">{t("activeUsers")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
