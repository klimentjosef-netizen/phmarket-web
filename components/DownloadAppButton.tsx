"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { X } from "@phosphor-icons/react";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/lib/appLinks";
import { AppleIcon, GooglePlayIcon } from "./StoreIcons";

export default function DownloadAppButton({
  label,
  className = "",
  onChosen,
}: {
  label: string;
  className?: string;
  onChosen?: () => void;
}) {
  const t = useTranslations("appButtons");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const handleChoice = () => {
    setOpen(false);
    onChosen?.();
  };

  const stores = [
    { name: "App Store", href: APP_STORE_URL, Icon: AppleIcon },
    { name: "Google Play", href: GOOGLE_PLAY_URL, Icon: GooglePlayIcon },
  ];

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {label}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={t("chooseTitle")}
            className="relative w-full max-w-sm border border-line bg-surface p-6 shadow-2xl shadow-black/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t("close")}
              className="absolute right-3 top-3 p-1.5 text-muted transition-colors hover:text-ink"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <h2 className="h-sub pr-8">{t("chooseTitle")}</h2>
            <p className="mt-2 text-sm text-muted">{t("chooseSubtitle")}</p>

            <div className="mt-5 space-y-3">
              {stores.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleChoice}
                  className="flex items-center gap-3 bg-ink px-5 py-3 text-paper transition-colors hover:bg-accent hover:text-white"
                >
                  <Icon className="h-7 w-7 shrink-0" />
                  <span className="text-left">
                    <span className="block text-[11px] leading-tight opacity-75">
                      {t("downloadOn")}
                    </span>
                    <span className="block font-mono text-[15px] font-medium leading-tight tracking-[-0.02em]">
                      {name}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
