import { getTranslations } from "next-intl/server";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/lib/appLinks";
import { AppleIcon, GooglePlayIcon } from "./StoreIcons";

const TONE = {
  /** Na svetlem i tmavem podkladu stranky */
  default: "bg-ink text-paper hover:bg-accent hover:text-white",
  /** Na zelenem bloku */
  onBrand: "bg-white text-[#0f4a22] hover:bg-[#e6efe7]",
} as const;

export default async function AppStoreButtons({
  className = "",
  tone = "default",
}: {
  className?: string;
  tone?: keyof typeof TONE;
}) {
  const t = await getTranslations("appButtons");
  const stores = [
    { name: "App Store", href: APP_STORE_URL, Icon: AppleIcon },
    { name: "Google Play", href: GOOGLE_PLAY_URL, Icon: GooglePlayIcon },
  ];

  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      {stores.map(({ name, href, Icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center gap-3 px-5 py-3 transition-[background-color,color,transform] duration-200 active:translate-y-px ${TONE[tone]}`}
        >
          <Icon className="h-7 w-7 shrink-0" />
          <span className="text-left">
            <span className="block text-[11px] leading-tight opacity-75">{t("downloadOn")}</span>
            <span className="block font-mono text-[15px] font-medium leading-tight tracking-[-0.02em]">
              {name}
            </span>
          </span>
        </a>
      ))}
    </div>
  );
}
