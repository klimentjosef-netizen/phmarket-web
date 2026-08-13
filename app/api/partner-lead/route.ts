import { NextResponse } from "next/server";
import { Resend } from "resend";

// Where partner enquiries land, and which verified sender they come from.
// Both are overridable via env so the address can change without a redeploy.
const TO = process.env.PARTNER_LEAD_TO || "info@phmarket.cz";
const FROM = process.env.PARTNER_LEAD_FROM || "PHMarket web <formular@phmarket.cz>";

// Error codes the client maps to its own localized message.
type ErrorCode = "validation" | "config" | "send";

const FIELDS = ["name", "company", "station", "phone", "email"] as const;
type Field = (typeof FIELDS)[number];

const LABELS: Record<Field, string> = {
  name: "Jméno a příjmení odpovědné osoby",
  company: "Název společnosti / provozovatele",
  station: "Název a lokalita čerpací stanice",
  phone: "Telefonní kontakt",
  email: "E-mailová adresa",
};

const MAX_LEN: Record<Field, number> = {
  name: 120,
  company: 150,
  station: 200,
  phone: 40,
  email: 150,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const PHONE_RE = /^[+0-9][0-9\s()/.-]{5,}$/;

function fail(error: ErrorCode, status: number) {
  return NextResponse.json({ ok: false, error }, { status });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail("validation", 400);
  }
  if (typeof body !== "object" || body === null) return fail("validation", 400);
  const raw = body as Record<string, unknown>;

  // Honeypot: a hidden field only a bot fills in. Answer 200 so it does not retry.
  if (typeof raw.website === "string" && raw.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (raw.consent !== true) return fail("validation", 400);

  const values = {} as Record<Field, string>;
  for (const field of FIELDS) {
    const value = typeof raw[field] === "string" ? (raw[field] as string).trim() : "";
    if (value.length < 2 || value.length > MAX_LEN[field]) return fail("validation", 400);
    values[field] = value;
  }
  if (!EMAIL_RE.test(values.email)) return fail("validation", 400);
  if (!PHONE_RE.test(values.phone)) return fail("validation", 400);

  // Which language version the form was sent from — helps when replying.
  const locale = typeof raw.locale === "string" ? raw.locale.slice(0, 5) : "cs";

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[partner-lead] RESEND_API_KEY is not set");
    return fail("config", 500);
  }

  const rows = FIELDS.map(
    (field) =>
      `<tr><td style="padding:4px 12px 4px 0;color:#555;white-space:nowrap">${LABELS[field]}</td>` +
      `<td style="padding:4px 0"><strong>${escapeHtml(values[field])}</strong></td></tr>`,
  ).join("");

  const text = FIELDS.map((field) => `${LABELS[field]}: ${values[field]}`).join("\n");

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: FROM,
      to: [TO],
      replyTo: values.email,
      subject: `Nová poptávka partnerství: ${values.company} (${values.station})`,
      text: `${text}\n\nOdesláno z: /pro-cerpaci-stanice (${locale})`,
      html:
        `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#1A1A1A">` +
        `<h2 style="margin:0 0 16px">Nová poptávka partnerství čerpací stanice</h2>` +
        `<table style="border-collapse:collapse">${rows}</table>` +
        `<p style="margin-top:20px;color:#777;font-size:13px">` +
        `Odesláno z formuláře na /pro-cerpaci-stanice (jazyk: ${escapeHtml(locale)}).<br>` +
        `Odpovědí na tento e-mail píšete přímo odesílateli.</p></div>`,
    });

    if (error) {
      console.error("[partner-lead] Resend error:", error);
      return fail("send", 502);
    }
  } catch (err) {
    console.error("[partner-lead] send failed:", err);
    return fail("send", 502);
  }

  return NextResponse.json({ ok: true });
}
