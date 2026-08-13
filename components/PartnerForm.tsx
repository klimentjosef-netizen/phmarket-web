"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

const FIELDS = ["name", "company", "station", "phone", "email"] as const;
type Field = (typeof FIELDS)[number];

export type PartnerFormContent = {
  title: string;
  intro: string;
  labels: Record<Field, string>;
  /** Consent sentence split around the inline link to the privacy policy */
  consentPre: string;
  consentLink: string;
  consentPost: string;
  submitLabel: string;
  sendingLabel: string;
  successTitle: string;
  successText: string;
  errorValidation: string;
  errorSend: string;
};

const INPUT_TYPE: Record<Field, string> = {
  name: "text",
  company: "text",
  station: "text",
  phone: "tel",
  email: "email",
};

const AUTOCOMPLETE: Record<Field, string> = {
  name: "name",
  company: "organization",
  station: "off",
  phone: "tel",
  email: "email",
};

type Status = "idle" | "sending" | "sent" | "error";

export default function PartnerForm({ content: c }: { content: PartnerFormContent }) {
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const [errorText, setErrorText] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload: Record<string, unknown> = { locale, consent: data.get("consent") === "on" };
    for (const field of FIELDS) payload[field] = String(data.get(field) ?? "");
    payload.website = String(data.get("website") ?? "");

    setStatus("sending");
    setErrorText("");
    try {
      const res = await fetch("/api/partner-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => null);
      if (res.ok && json?.ok) {
        setStatus("sent");
        form.reset();
        return;
      }
      setStatus("error");
      setErrorText(json?.error === "validation" ? c.errorValidation : c.errorSend);
    } catch {
      setStatus("error");
      setErrorText(c.errorSend);
    }
  }

  if (status === "sent") {
    return (
      <div
        className="rounded-xl border border-primary/30 bg-white p-8 text-center shadow-sm"
        role="status"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <svg
            className="h-6 w-6 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="mt-4 text-xl font-bold text-dark">{c.successTitle}</h3>
        <p className="mt-2 text-gray-700">{c.successText}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8"
    >
      <h3 className="text-xl font-bold text-dark">{c.title}</h3>
      <p className="mt-2 text-sm text-gray-600">{c.intro}</p>

      <div className="mt-6 space-y-4">
        {FIELDS.map((field) => (
          <div key={field}>
            <label
              htmlFor={`partner-${field}`}
              className="block text-sm font-medium text-dark"
            >
              {c.labels[field]} <span className="text-primary">*</span>
            </label>
            <input
              id={`partner-${field}`}
              name={field}
              type={INPUT_TYPE[field]}
              autoComplete={AUTOCOMPLETE[field]}
              required
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-dark outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        ))}
      </div>

      {/* Honeypot: hidden from users, bots tend to fill every field in */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="partner-website">Web</label>
        <input id="partner-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="mt-5 flex items-start gap-3 text-sm text-gray-600">
        <input
          name="consent"
          type="checkbox"
          required
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 text-primary focus:ring-primary"
        />
        <span>
          {c.consentPre}{" "}
          <Link href="/privacy-policy" className="text-primary underline hover:text-primary-dark">
            {c.consentLink}
          </Link>
          {c.consentPost}
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 w-full rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? c.sendingLabel : c.submitLabel}
      </button>

      {status === "error" && (
        <p className="mt-3 text-sm text-red-600" role="alert">
          {errorText}
        </p>
      )}
    </form>
  );
}
