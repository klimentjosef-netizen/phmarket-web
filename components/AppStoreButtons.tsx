import { getTranslations } from "next-intl/server";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/lib/appLinks";
import { AppleIcon, GooglePlayIcon } from "./StoreIcons";

export default async function AppStoreButtons({ className = "" }: { className?: string }) {
  const t = await getTranslations("appButtons");
  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-dark px-5 py-3 text-white hover:bg-dark/90 transition-colors"
      >
        <AppleIcon />
        <div className="text-left">
          <div className="text-[10px] leading-tight">{t("downloadOn")}</div>
          <div className="text-sm font-semibold leading-tight">App Store</div>
        </div>
      </a>
      <a
        href={GOOGLE_PLAY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-dark px-5 py-3 text-white hover:bg-dark/90 transition-colors"
      >
        <GooglePlayIcon />
        <div className="text-left">
          <div className="text-[10px] leading-tight">{t("downloadOn")}</div>
          <div className="text-sm font-semibold leading-tight">Google Play</div>
        </div>
      </a>
    </div>
  );
}
