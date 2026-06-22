"use client";

import { useEffect, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Config — Supabase project (anon key is public and safe on the      */
/*  frontend). Overridable via env, with a working fallback so the     */
/*  page works on deploy without extra setup.                          */
/* ------------------------------------------------------------------ */
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://amatkpwevtlhswamsctd.supabase.co";
const ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtYXRrcHdldnRsaHN3YW1zY3RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4NDA0MDEsImV4cCI6MjA4ODQxNjQwMX0.IOPr1i5b7_TsgLGFWcuvnFGhsSZgID9spCeVoVQCEwM";

const REQUEST_FN = `${SUPABASE_URL}/functions/v1/request-account-deletion`;
const DELETE_FN = `${SUPABASE_URL}/functions/v1/delete-account`;

const DOCS = "/dokumenty";

/* ------------------------------------------------------------------ */
/*  Localised copy (cs / en)                                           */
/* ------------------------------------------------------------------ */
type Lang = "cs" | "en";

const TEXTS = {
  cs: {
    title: "Smazání účtu",
    intro:
      "Tady si trvale smažete účet v aplikaci PHMarket. Z bezpečnostních důvodů probíhá mazání ve dvou krocích: nejdřív zadáte e-mail, pak potvrdíte smazání odkazem, který vám pošleme e-mailem.",
    emailLabel: "E-mail účtu",
    emailPlaceholder: "vas@email.cz",
    passwordLabel: "Heslo",
    passwordHint: "Vyplňte, jen pokud jste se registrovali e-mailem a heslem.",
    reasonLabel: "Důvod smazání",
    reasonOptional: "nepovinné",
    reasonOptions: [
      "Vyberte důvod (nepovinné)",
      "Už aplikaci nepoužívám",
      "Mám obavy o své soukromí",
      "Založil/a jsem si nový účet",
      "Jiný důvod",
    ],
    consent:
      "Beru na vědomí, že smazání je nevratné a všechny PHM Cash body propadnou.",
    submit: "Smazat účet",
    submitting: "Odesílám…",
    mustConsent: "Pro pokračování prosím potvrďte souhlas.",
    invalidEmailClient: "Zadejte prosím platný e-mail.",
    // Backend responses
    neutralSuccessTitle: "Zkontrolujte svou schránku",
    neutralSuccess:
      "Pokud účet s tímto e-mailem existuje, poslali jsme na něj odkaz pro potvrzení smazání. Odkaz je platný 24 hodin.",
    passwordRequired:
      "Tento účet je chráněný heslem. Vyplňte prosím heslo a odešlete znovu.",
    invalidCredentials: "Heslo nesouhlasí. Zkontrolujte ho prosím.",
    invalidEmail: "Zkontrolujte prosím formát e-mailu.",
    genericError:
      "Něco se nepovedlo. Zkuste to prosím za chvíli znovu, nebo nás kontaktujte.",
    // Confirmation (token) screen
    confirming: "Mažeme váš účet…",
    deletedTitle: "Účet byl smazán",
    deleted: "Váš účet PHMarket byl trvale smazán. Děkujeme, že jste byli s námi.",
    tokenExpiredTitle: "Odkaz vypršel",
    tokenExpired:
      "Tento odkaz už neplatí (platnost je 24 hodin). Zažádejte prosím o smazání znovu.",
    tokenUsedTitle: "Odkaz už byl použit",
    tokenUsed:
      "Tento odkaz pro smazání už byl jednou použit. Pokud váš účet stále existuje, zažádejte o smazání znovu.",
    invalidTokenTitle: "Neplatný odkaz",
    invalidToken:
      "Tento odkaz není platný. Zažádejte prosím o smazání znovu z formuláře.",
    backToForm: "Zpět na formulář",
    footerTerms: "Obchodní podmínky",
    footerPrivacy: "Ochrana osobních údajů",
    termsHref: `${DOCS}/phmarket-obchodni-podminky-cz.pdf`,
    privacyHref: `${DOCS}/phmarket-ochrana-osobnich-udaju-cz.pdf`,
    otherLangLabel: "English version",
    otherLangHref: "/delete-account",
  },
  en: {
    title: "Delete account",
    intro:
      "Here you can permanently delete your PHMarket account. For security, deletion happens in two steps: first you enter your e-mail, then you confirm via a link we send to your inbox.",
    emailLabel: "Account e-mail",
    emailPlaceholder: "you@email.com",
    passwordLabel: "Password",
    passwordHint: "Fill this in only if you registered with e-mail and password.",
    reasonLabel: "Reason for deletion",
    reasonOptional: "optional",
    reasonOptions: [
      "Select a reason (optional)",
      "I no longer use the app",
      "I have privacy concerns",
      "I created a new account",
      "Other reason",
    ],
    consent:
      "I understand that deletion is permanent and all my PHM Cash points will be forfeited.",
    submit: "Delete account",
    submitting: "Sending…",
    mustConsent: "Please confirm the acknowledgement to continue.",
    invalidEmailClient: "Please enter a valid e-mail address.",
    neutralSuccessTitle: "Check your inbox",
    neutralSuccess:
      "If an account with this e-mail exists, we have sent it a link to confirm deletion. The link is valid for 24 hours.",
    passwordRequired:
      "This account is protected by a password. Please enter your password and submit again.",
    invalidCredentials: "The password is incorrect. Please check it.",
    invalidEmail: "Please check the e-mail format.",
    genericError:
      "Something went wrong. Please try again shortly, or contact us.",
    confirming: "Deleting your account…",
    deletedTitle: "Account deleted",
    deleted:
      "Your PHMarket account has been permanently deleted. Thank you for having been with us.",
    tokenExpiredTitle: "Link expired",
    tokenExpired:
      "This link is no longer valid (it expires after 24 hours). Please request deletion again.",
    tokenUsedTitle: "Link already used",
    tokenUsed:
      "This deletion link has already been used. If your account still exists, request deletion again.",
    invalidTokenTitle: "Invalid link",
    invalidToken:
      "This link is not valid. Please request deletion again from the form.",
    backToForm: "Back to the form",
    footerTerms: "Terms and Conditions",
    footerPrivacy: "Privacy Policy",
    termsHref: `${DOCS}/phmarket-terms-of-service-en.pdf`,
    privacyHref: `${DOCS}/phmarket-privacy-policy-en.pdf`,
    otherLangLabel: "Česká verze",
    otherLangHref: "/smazat-ucet",
  },
} satisfies Record<Lang, Record<string, unknown>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormResult =
  | { kind: "success" }
  | { kind: "passwordRequired" }
  | { kind: "invalidCredentials" }
  | { kind: "invalidEmail" }
  | { kind: "error" }
  | null;

type ConfirmState =
  | "loading"
  | "deleted"
  | "tokenExpired"
  | "tokenUsed"
  | "invalidToken"
  | "error";

export default function AccountDeletion({ lang }: { lang: Lang }) {
  const t = TEXTS[lang];

  // Default to the form (so it is present in the SSR HTML); switch to the
  // confirm flow only if the URL carries a ?token= (email-link case).
  const [phase, setPhase] = useState<"form" | "confirm">("form");
  const [confirmState, setConfirmState] = useState<ConfirmState>("loading");

  // Form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reason, setReason] = useState("");
  const [consent, setConsent] = useState(false);

  // Form UI
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<FormResult>(null);
  const [clientError, setClientError] = useState<string | null>(null);
  const [passwordRequired, setPasswordRequired] = useState(false);

  // On mount: if there's a token in the URL, run the confirm flow and strip it.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (!token) return;
    // Remove the token from the URL (history + Referer hygiene)
    window.history.replaceState({}, "", window.location.pathname);
    setPhase("confirm");

    (async () => {
      try {
        const res = await fetch(DELETE_FN, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${ANON_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ deletion_token: token }),
        });
        let data: { ok?: boolean; error?: string } = {};
        try {
          data = await res.json();
        } catch {
          /* non-JSON response */
        }
        if (data.ok) setConfirmState("deleted");
        else if (data.error === "TOKEN_EXPIRED") setConfirmState("tokenExpired");
        else if (data.error === "TOKEN_ALREADY_USED")
          setConfirmState("tokenUsed");
        else if (data.error === "INVALID_TOKEN")
          setConfirmState("invalidToken");
        else setConfirmState("error");
      } catch {
        setConfirmState("error");
      }
    })();
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setClientError(null);
    setResult(null);

    if (!EMAIL_RE.test(email.trim())) {
      setClientError(t.invalidEmailClient as string);
      return;
    }
    if (!consent) {
      setClientError(t.mustConsent as string);
      return;
    }

    setSubmitting(true);
    try {
      const body: { email: string; password?: string } = {
        email: email.trim(),
      };
      if (password) body.password = password;

      const res = await fetch(REQUEST_FN, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ANON_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      let data: { ok?: boolean; error?: string } = {};
      try {
        data = await res.json();
      } catch {
        /* non-JSON response */
      }

      if (data.ok) {
        setResult({ kind: "success" });
      } else if (data.error === "PASSWORD_REQUIRED") {
        setPasswordRequired(true);
        setResult({ kind: "passwordRequired" });
      } else if (data.error === "INVALID_CREDENTIALS") {
        setResult({ kind: "invalidCredentials" });
      } else if (data.error === "INVALID_EMAIL") {
        setResult({ kind: "invalidEmail" });
      } else {
        setResult({ kind: "error" });
      }
    } catch {
      setResult({ kind: "error" });
    } finally {
      setSubmitting(false);
    }
  }

  /* ---------------------------------------------------------------- */
  /*  Shared shell                                                    */
  /* ---------------------------------------------------------------- */
  const Shell = ({ children }: { children: React.ReactNode }) => (
    <section className="bg-gradient-to-br from-gray-50 to-white min-h-[70vh] py-16 md:py-24">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-dark">{t.title}</h1>
        <div className="mt-8">{children}</div>
        <footer className="mt-12 pt-6 border-t border-gray-200 text-sm text-gray-500">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href={t.termsHref as string} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              {t.footerTerms as string}
            </a>
            <a href={t.privacyHref as string} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              {t.footerPrivacy as string}
            </a>
            <a href={t.otherLangHref as string} className="hover:text-primary ml-auto">
              {t.otherLangLabel as string}
            </a>
          </div>
        </footer>
      </div>
    </section>
  );

  /* ---------------------------------------------------------------- */
  /*  Confirmation screen (token flow)                                */
  /* ---------------------------------------------------------------- */
  if (phase === "confirm") {
    const map: Record<ConfirmState, { title?: string; body: string; tone: "info" | "ok" | "warn" }> = {
      loading: { body: t.confirming as string, tone: "info" },
      deleted: { title: t.deletedTitle as string, body: t.deleted as string, tone: "ok" },
      tokenExpired: { title: t.tokenExpiredTitle as string, body: t.tokenExpired as string, tone: "warn" },
      tokenUsed: { title: t.tokenUsedTitle as string, body: t.tokenUsed as string, tone: "warn" },
      invalidToken: { title: t.invalidTokenTitle as string, body: t.invalidToken as string, tone: "warn" },
      error: { body: t.genericError as string, tone: "warn" },
    };
    const s = map[confirmState];
    const showBack = confirmState !== "loading" && confirmState !== "deleted";
    return (
      <Shell>
        <div
          className={`rounded-xl border p-6 ${
            s.tone === "ok"
              ? "border-primary/30 bg-primary/5"
              : s.tone === "warn"
              ? "border-amber-300 bg-amber-50"
              : "border-gray-200 bg-white"
          }`}
        >
          {s.title && <h2 className="text-lg font-semibold text-dark mb-1">{s.title}</h2>}
          <p className="text-gray-700 leading-relaxed">{s.body}</p>
        </div>
        {showBack && (
          <a
            href={lang === "cs" ? "/smazat-ucet" : "/delete-account"}
            className="inline-block mt-6 text-primary font-medium hover:underline"
          >
            {t.backToForm as string}
          </a>
        )}
      </Shell>
    );
  }

  /* ---------------------------------------------------------------- */
  /*  Form screen (request flow)                                      */
  /* ---------------------------------------------------------------- */
  // Neutral success replaces the form entirely (anti-enumeration).
  if (result?.kind === "success") {
    return (
      <Shell>
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
          <h2 className="text-lg font-semibold text-dark mb-1">
            {t.neutralSuccessTitle as string}
          </h2>
          <p className="text-gray-700 leading-relaxed">{t.neutralSuccess as string}</p>
        </div>
      </Shell>
    );
  }

  const inlineError =
    clientError ||
    (result?.kind === "passwordRequired" && (t.passwordRequired as string)) ||
    (result?.kind === "invalidCredentials" && (t.invalidCredentials as string)) ||
    (result?.kind === "invalidEmail" && (t.invalidEmail as string)) ||
    (result?.kind === "error" && (t.genericError as string)) ||
    null;

  return (
    <Shell>
      <p className="text-gray-600 leading-relaxed mb-8">{t.intro as string}</p>

      <form onSubmit={onSubmit} noValidate className="space-y-5">
        <div>
          <label htmlFor="ad-email" className="block text-sm font-medium text-dark mb-1">
            {t.emailLabel as string}
          </label>
          <input
            id="ad-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.emailPlaceholder as string}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          />
        </div>

        <div>
          <label htmlFor="ad-password" className="block text-sm font-medium text-dark mb-1">
            {t.passwordLabel as string}
          </label>
          <input
            id="ad-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-1 focus:ring-primary ${
              passwordRequired ? "border-amber-400" : "border-gray-300 focus:border-primary"
            }`}
          />
          <p className="mt-1 text-xs text-gray-500">{t.passwordHint as string}</p>
        </div>

        <div>
          <label htmlFor="ad-reason" className="block text-sm font-medium text-dark mb-1">
            {t.reasonLabel as string}{" "}
            <span className="text-gray-400 font-normal">({t.reasonOptional as string})</span>
          </label>
          <select
            id="ad-reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          >
            {(t.reasonOptions as string[]).map((opt, i) => (
              <option key={i} value={i === 0 ? "" : opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span className="text-sm text-gray-700 leading-snug">{t.consent as string}</span>
        </label>

        {inlineError && (
          <p
            className={`text-sm rounded-lg px-3 py-2 ${
              result?.kind === "passwordRequired"
                ? "bg-amber-50 text-amber-800 border border-amber-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
            role="alert"
          >
            {inlineError}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          {submitting ? (t.submitting as string) : (t.submit as string)}
        </button>
      </form>
    </Shell>
  );
}
