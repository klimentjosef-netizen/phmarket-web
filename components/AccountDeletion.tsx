"use client";

import { useEffect, useState } from "react";
import { TEXTS, type Lang, type Texts } from "@/lib/accountDeletionTexts";

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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormResult =
  | { kind: "success" }
  | { kind: "passwordRequired" }
  | { kind: "invalidCredentials" }
  | { kind: "invalidEmail" }
  | { kind: "error" }
  | null;

type ConfirmState =
  | "idle"
  | "working"
  | "deleted"
  | "expired"
  | "failed"
  | "connError";

// Defined at module level (NOT inside AccountDeletion) so it is a stable
// component type across renders — otherwise inputs lose focus on every keystroke.
function Shell({ t, children }: { t: Texts; children: React.ReactNode }) {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-white min-h-[70vh] py-16 md:py-24">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-dark">{t.title}</h1>
        <div className="mt-8">{children}</div>
        <footer className="mt-12 pt-6 border-t border-gray-200 text-sm text-gray-500">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href={t.termsHref} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              {t.footerTerms}
            </a>
            <a href={t.privacyHref} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              {t.footerPrivacy}
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}

export default function AccountDeletion({ lang }: { lang: Lang }) {
  const t = TEXTS[lang];

  // Default to the form (so it is present in the SSR HTML); switch to the
  // confirm screen only if the URL carries a ?token= (email-link case).
  const [phase, setPhase] = useState<"form" | "confirm">("form");
  const [token, setToken] = useState<string | null>(null);
  const [confirmState, setConfirmState] = useState<ConfirmState>("idle");

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

  // RULE 1: On mount we ONLY read the token from the URL and switch to the
  // confirm screen. We do NOT call the server here — email clients (Gmail, ...)
  // prefetch links, which would otherwise trigger deletion without a click and
  // burn the one-time token. The actual deletion runs only from onConfirm().
  useEffect(() => {
    const tk = new URLSearchParams(window.location.search).get("token");
    if (tk) {
      setToken(tk);
      setPhase("confirm");
    }
  }, []);

  async function onConfirmDelete() {
    if (confirmState === "working") return; // guard against double submit
    if (!token) {
      setConfirmState("failed");
      return;
    }
    setConfirmState("working");
    try {
      const res = await fetch(DELETE_FN, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ANON_KEY}`,
          "Content-Type": "application/json",
        },
        // RULE 2: the body key MUST be exactly "deletion_token".
        body: JSON.stringify({ deletion_token: token }),
      });
      let data: { ok?: boolean; status?: string } = {};
      try {
        data = await res.json();
      } catch {
        /* non-JSON response */
      }

      if (res.ok && data.ok) {
        setConfirmState("deleted");
      } else if (res.status === 410 || data.status === "expired") {
        setConfirmState("expired");
      } else {
        setConfirmState("failed"); // re-enables the button
      }
    } catch {
      setConfirmState("connError"); // re-enables the button
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setClientError(null);
    setResult(null);

    if (!EMAIL_RE.test(email.trim())) {
      setClientError(t.invalidEmailClient);
      return;
    }
    if (!consent) {
      setClientError(t.mustConsent);
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
  /*  Confirmation screen (token flow) — click-driven, no auto-call    */
  /* ---------------------------------------------------------------- */
  if (phase === "confirm") {
    const buttonDisabled =
      confirmState === "working" ||
      confirmState === "deleted" ||
      confirmState === "expired";

    const statusText =
      confirmState === "working"
        ? t.deleting
        : confirmState === "deleted"
        ? t.deletedMsg
        : confirmState === "expired"
        ? t.expiredMsg
        : confirmState === "failed"
        ? t.failedMsg
        : confirmState === "connError"
        ? t.connErrorMsg
        : null;

    const statusTone =
      confirmState === "deleted"
        ? "bg-primary/5 border-primary/30 text-dark"
        : confirmState === "expired"
        ? "bg-amber-50 border-amber-200 text-amber-800"
        : confirmState === "failed" || confirmState === "connError"
        ? "bg-red-50 border-red-200 text-red-700"
        : "bg-gray-50 border-gray-200 text-gray-700";

    return (
      <Shell t={t}>
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-6">
          <p className="text-gray-800 leading-relaxed">{t.confirmIntro}</p>
        </div>

        <button
          type="button"
          onClick={onConfirmDelete}
          disabled={buttonDisabled}
          className="mt-6 w-full sm:w-auto inline-flex items-center justify-center bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          {t.confirmButton}
        </button>

        {statusText && (
          <p className={`mt-5 text-sm rounded-lg border px-4 py-3 ${statusTone}`} role="status">
            {statusText}
          </p>
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
      <Shell t={t}>
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
          <h2 className="text-lg font-semibold text-dark mb-1">{t.neutralSuccessTitle}</h2>
          <p className="text-gray-700 leading-relaxed">{t.neutralSuccess}</p>
        </div>
      </Shell>
    );
  }

  const inlineError =
    clientError ||
    (result?.kind === "passwordRequired" && t.passwordRequired) ||
    (result?.kind === "invalidCredentials" && t.invalidCredentials) ||
    (result?.kind === "invalidEmail" && t.invalidEmail) ||
    (result?.kind === "error" && t.genericError) ||
    null;

  return (
    <Shell t={t}>
      <p className="text-gray-600 leading-relaxed mb-8">{t.intro}</p>

      <form onSubmit={onSubmit} noValidate className="space-y-5">
        <div>
          <label htmlFor="ad-email" className="block text-sm font-medium text-dark mb-1">
            {t.emailLabel}
          </label>
          <input
            id="ad-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.emailPlaceholder}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          />
        </div>

        <div>
          <label htmlFor="ad-password" className="block text-sm font-medium text-dark mb-1">
            {t.passwordLabel}
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
          <p className="mt-1 text-xs text-gray-500">{t.passwordHint}</p>
        </div>

        <div>
          <label htmlFor="ad-reason" className="block text-sm font-medium text-dark mb-1">
            {t.reasonLabel}{" "}
            <span className="text-gray-400 font-normal">({t.reasonOptional})</span>
          </label>
          <select
            id="ad-reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          >
            {t.reasonOptions.map((opt, i) => (
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
          <span className="text-sm text-gray-700 leading-snug">{t.consent}</span>
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
          {submitting ? t.submitting : t.submit}
        </button>
      </form>
    </Shell>
  );
}
