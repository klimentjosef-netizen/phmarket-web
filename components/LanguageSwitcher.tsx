"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { domainFor } from "@/i18n/domains";
import { useState, useRef, useEffect } from "react";
import { CaretDown, Globe } from "@phosphor-icons/react";

const LABELS: Record<Locale, string> = {
  cs: "Čeština",
  sk: "Slovenčina",
  pl: "Polski",
  en: "English",
  de: "Deutsch",
  hu: "Magyar",
};

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function switchTo(next: Locale) {
    setOpen(false);
    // Languages with their own country domain (phmarket.sk …) live there, not on this site.
    const d = domainFor(next);
    if (d && d.domain !== window.location.host) {
      window.location.href = `https://${d.domain}${pathname === "/" ? "" : pathname}`;
      return;
    }
    if (next === "cs" && window.location.host !== "www.phmarket.cz" && domainFor(locale)) {
      window.location.href = `https://www.phmarket.cz${pathname === "/" ? "" : pathname}`;
      return;
    }
    router.replace(pathname, { locale: next });
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1.5 px-2.5 py-2 font-mono text-sm font-medium text-muted transition-colors hover:text-ink"
        aria-label="Změnit jazyk"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Globe className="h-[18px] w-[18px]" aria-hidden="true" />
        <span className="uppercase">{locale}</span>
        <CaretDown
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
          weight="bold"
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-48 border border-line bg-surface py-1.5 shadow-xl shadow-black/10"
        >
          {routing.locales.map((l) => (
            <li key={l}>
              <button
                type="button"
                onClick={() => switchTo(l)}
                aria-selected={l === locale}
                className={`flex w-full items-center gap-3 px-3.5 py-2 text-left text-sm transition-colors ${
                  l === locale ? "bg-primary/10 font-semibold text-accent" : "text-ink hover:bg-gray-50"
                }`}
              >
                <span className="w-6 font-mono text-xs uppercase text-muted">{l}</span>
                {LABELS[l]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
