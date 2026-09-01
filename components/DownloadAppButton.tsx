"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
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

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {label}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={t("chooseTitle")}
            className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t("close")}
              className="absolute right-3 top-3 rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-lg font-bold text-dark pr-8">{t("chooseTitle")}</h2>
            <p className="mt-1 text-sm text-gray-600">{t("chooseSubtitle")}</p>

            <div className="mt-5 space-y-3">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleChoice}
                className="flex items-center gap-3 rounded-lg bg-dark px-5 py-3 text-white hover:bg-dark/90 transition-colors"
              >
                <AppleIcon />
                <span className="text-left">
                  <span className="block text-[10px] leading-tight">{t("downloadOn")}</span>
                  <span className="block text-sm font-semibold leading-tight">App Store</span>
                </span>
              </a>
              <a
                href={GOOGLE_PLAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleChoice}
                className="flex items-center gap-3 rounded-lg bg-dark px-5 py-3 text-white hover:bg-dark/90 transition-colors"
              >
                <GooglePlayIcon />
                <span className="text-left">
                  <span className="block text-[10px] leading-tight">{t("downloadOn")}</span>
                  <span className="block text-sm font-semibold leading-tight">Google Play</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
