"use client";

import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { List, X } from "@phosphor-icons/react";
import LanguageSwitcher from "./LanguageSwitcher";
import DownloadAppButton from "./DownloadAppButton";

const NAV_LINKS = [
  { href: "/", key: "home" },
  { href: "/phmap", key: "phmap" },
  { href: "/clanky", key: "articles" },
  { href: "/tankujte-levneji", key: "tankujte" },
  { href: "/cisteni-nadrzi", key: "cisteni" },
  { href: "/mikrozavozy-motorove-nafty", key: "mikrozavozy" },
  { href: "/pro-cerpaci-stanice", key: "partneri" },
] as const;

export default function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="container-page">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/logo.png"
              alt="PHMarket logo"
              width={140}
              height={60}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center xl:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`relative px-3 py-2 text-sm font-medium transition-colors after:absolute after:inset-x-3 after:-bottom-[13px] after:h-0.5 after:origin-left after:bg-accent after:transition-transform after:duration-300 hover:text-ink ${
                  isActive(link.href)
                    ? "text-ink after:scale-x-100"
                    : "text-muted after:scale-x-0 hover:after:scale-x-100"
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
          </div>

          {/* Right side: language + CTA */}
          <div className="hidden items-center gap-2 xl:flex">
            <LanguageSwitcher />
            <DownloadAppButton label={t("downloadApp")} className="btn-primary !py-2.5" />
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-1 xl:hidden">
            <LanguageSwitcher />
            <button
              type="button"
              className="p-2 text-ink"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Zavřít menu" : "Otevřít menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <List className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-line bg-paper xl:hidden">
          <div className="container-page py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`block border-b border-line py-3.5 font-mono text-base tracking-[-0.02em] transition-colors ${
                  isActive(link.href) ? "text-accent" : "text-ink hover:text-accent"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {t(link.key)}
              </Link>
            ))}
            <DownloadAppButton
              label={t("downloadApp")}
              className="btn-primary mb-2 mt-5 w-full"
              onChosen={() => setMobileOpen(false)}
            />
          </div>
        </div>
      )}
    </nav>
  );
}
