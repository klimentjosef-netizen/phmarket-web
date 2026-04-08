import Link from "next/link";

const APP_STORE_URL =
  "https://apps.apple.com/pl/app/phmarket-obchod/id6753677131";
const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=branded.m8391e3c5a7fa40ff980dd3ec24d7cd28.phmarket";

export default function AppStoreButtons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      <Link
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-dark px-5 py-3 text-white hover:bg-dark/90 transition-colors"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
        <div className="text-left">
          <div className="text-[10px] leading-tight">Stáhnout na</div>
          <div className="text-sm font-semibold leading-tight">App Store</div>
        </div>
      </Link>
      <Link
        href={GOOGLE_PLAY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-dark px-5 py-3 text-white hover:bg-dark/90 transition-colors"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M3.18 23.67c-.14-.04-.55-.15-.87-.65-.18-.28-.27-.6-.27-.95V1.93c0-.35.09-.67.27-.95.32-.5.73-.61.87-.65l9.78 9.78.91.89-.91.89-9.78 9.78zm1.55-.67L14.2 13.53l2.12 2.12L4.73 23zm10.47-10.47L13.53 14.2 4.73 1 16.32 8.35 13.2 12.53zm1.7-1.06l3.07-1.77c.56-.32.84-.72.84-1.2s-.28-.88-.84-1.2l-3.07-1.77-2.38 2.97 2.38 2.97z" />
        </svg>
        <div className="text-left">
          <div className="text-[10px] leading-tight">Stáhnout na</div>
          <div className="text-sm font-semibold leading-tight">Google Play</div>
        </div>
      </Link>
    </div>
  );
}
