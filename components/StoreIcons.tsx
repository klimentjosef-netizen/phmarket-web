import { AppleLogo, GooglePlayLogo } from "@phosphor-icons/react/dist/ssr";

export function AppleIcon({ className = "w-6 h-6" }: { className?: string }) {
  return <AppleLogo className={className} weight="fill" aria-hidden="true" />;
}

export function GooglePlayIcon({ className = "w-6 h-6" }: { className?: string }) {
  return <GooglePlayLogo className={className} weight="fill" aria-hidden="true" />;
}
