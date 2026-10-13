"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Check } from "@phosphor-icons/react";

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
        className="border border-accent bg-surface p-8 text-center"
        role="status"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center bg-primary text-white">
          <Check className="h-6 w-6" weight="bold" aria-hidden="true" />
        </div>
        <h3 className="h-sub mt-5 text-xl">{c.successTitle}</h3>
        <p className="mt-2 text-gray-700">{c.successText}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="border border-line bg-surface p-6 md:p-8"
    >
      <h3 className="h-sub text-xl">{c.title}</h3>
      <p className="mt-2 text-sm text-gray-600">{c.intro}</p>

      <div className="mt-6 space-y-5">
        {FIELDS.map((field) => (
          <div key={field}>
            <label
              htmlFor={`partner-${field}`}
              className="block text-sm font-medium text-ink"
            >
              {c.labels[field]} <span className="text-accent">*</span>
            </label>
            <input
              id={`partner-${field}`}
              name={field}
              type={INPUT_TYPE[field]}
              autoComplete={AUTOCOMPLETE[field]}
              required
              className="field mt-2"
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
          className="mt-0.5 h-4 w-4 shrink-0 accent-[#186E31]"
        />
        <span>
          {c.consentPre}{" "}
          <Link href="/privacy-policy" className="text-accent underline underline-offset-2">
            {c.consentLink}
          </Link>
          {c.consentPost}
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary mt-6 w-full"
      >
        {status === "sending" ? c.sendingLabel : c.submitLabel}
      </button>

      {status === "error" && (
        <p className="mt-3 text-sm text-red-600 dark:text-red-400" role="alert">
          {errorText}
        </p>
      )}
    </form>
  );
}
