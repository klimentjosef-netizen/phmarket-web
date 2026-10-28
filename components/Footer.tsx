import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import { localePath } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { socialFor } from "@/i18n/domains";
import { FacebookLogo, InstagramLogo, TiktokLogo } from "@phosphor-icons/react/dist/ssr";

// Instagram, Facebook and TikTok of the visitor's country (falls back to the Czech profiles).
function socialLinks(locale: Locale) {
  const s = socialFor(locale);
  return [
    { name: "Instagram", href: s.instagram, Icon: InstagramLogo },
    { name: "Facebook", href: s.facebook, Icon: FacebookLogo },
    { name: "TikTok", href: s.tiktok, Icon: TiktokLogo },
  ];
}

const NAV = [
  { href: "/phmap", key: "phmap" },
  { href: "/tankujte-levneji", key: "tankujte" },
  { href: "/cisteni-nadrzi", key: "cisteni" },
  { href: "/mikrozavozy-motorove-nafty", key: "mikrozavozy" },
  { href: "/pro-cerpaci-stanice", key: "partneri" },
  { href: "/clanky", key: "articles" },
] as const;

const linkClass = "text-muted transition-colors hover:text-accent";
const headingClass = "mb-4 font-mono text-sm font-medium text-ink";

export default async function Footer() {
  const t = await getTranslations("footer");
  const tn = await getTranslations("nav");
  const locale = (await getLocale()) as Locale;
  // The deletion page is localised at /smazat-ucet (per locale prefix); English
  // also has the dedicated /delete-account alias used for Google Play.
  const deleteAccountHref =
    locale === "en" ? "/delete-account" : localePath(locale, "/smazat-ucet");

  return (
    <footer className="border-t border-line bg-paper">
      <div className="container-page py-14 md:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="mb-4 inline-block">
              <Image
                src="/logo.png"
                alt="PHMarket logo"
                width={140}
                height={60}
                className="h-11 w-auto"
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted">{t("tagline")}</p>
            <div className="mt-5 flex items-center gap-2">
              {socialLinks(locale).map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center border border-line text-muted transition-colors hover:border-accent hover:text-accent"
                  aria-label={name}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className={headingClass}>{t("navHeading")}</h3>
            <ul className="space-y-2.5 text-sm">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {tn(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className={headingClass}>{t("legalHeading")}</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/podminky" className={linkClass}>
                  {t("terms")}
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className={linkClass}>
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <a href={deleteAccountHref} className={linkClass}>
                  {t("deleteAccount")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className={headingClass}>{t("contactHeading")}</h3>
            <address className="space-y-1 text-sm not-italic text-muted">
              <p className="font-medium text-ink">PHMarket s.r.o.</p>
              <p>Hlavní třída 87/2</p>
              <p>737 01 Český Těšín</p>
              <p>IČO: 04529031</p>
            </address>
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-6 text-sm text-muted">
          &copy; {new Date().getFullYear()} PHMarket s.r.o. {t("rights")}
        </div>
      </div>
    </footer>
  );
}
