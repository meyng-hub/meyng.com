import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Server-side contact endpoint.
 *
 * The browser never talks to the mail provider directly. That buys three things:
 *  1. the API key and provider stay out of the client bundle,
 *  2. every lead is logged here BEFORE delivery is attempted, so a provider outage
 *     costs latency instead of a lead,
 *  3. delivery failures are loud (502 + error log) instead of a silent client-side 404.
 *
 * Aug 2026: the previous provider account went dead and every lead was dropped for an
 * unknown period. Hence: no hardcoded fallbacks, unset config fails loudly, and the
 * full payload is written to logs on every delivery failure.
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL;
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "contact@meyng.com";
// Overridable only so delivery can be exercised against a stub in tests.
const RESEND_API_BASE = process.env.RESEND_API_BASE ?? "https://api.resend.com";

const PROVIDER_TIMEOUT_MS = 8000;

const MAX_LENGTHS = {
  name: 120,
  email: 200,
  subject: 60,
  message: 2000,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Per-instance flood guard. Serverless instances are ephemeral and horizontally
// scaled, so this is a speed bump for naive bots, not a real rate limiter.
// If abuse becomes real, move this to a shared store.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 1000) hits.clear();
  return recent.length > RATE_LIMIT_MAX;
}

function clientIp(req: Request): string {
  return (req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
}

function isConfigured(): boolean {
  return Boolean(RESEND_API_KEY && FROM_EMAIL);
}

type Lead = {
  name: string;
  email: string;
  subject: string;
  message: string;
  locale: string;
};

function parseLead(body: unknown): { lead: Lead } | { error: string } {
  if (typeof body !== "object" || body === null) return { error: "invalid_body" };
  const raw = body as Record<string, unknown>;

  // Honeypot: a real user never sees this field, bots fill everything.
  if (typeof raw.company === "string" && raw.company.trim() !== "") {
    return { error: "honeypot" };
  }

  const get = (key: keyof typeof MAX_LENGTHS) =>
    typeof raw[key] === "string" ? (raw[key] as string).trim() : "";

  // name and subject end up in the email Subject header. Strip CR/LF and other
  // control characters so a crafted value can't shape headers, whatever the
  // provider does downstream.
  const getHeaderSafe = (key: "name" | "subject") =>
    get(key).replace(/[\u0000-\u001f\u007f]+/g, " ").trim();

  const lead: Lead = {
    name: getHeaderSafe("name"),
    email: get("email"),
    subject: getHeaderSafe("subject") || "general",
    message: get("message"),
    locale: typeof raw.locale === "string" ? raw.locale.slice(0, 5) : "en",
  };

  if (!lead.name) return { error: "name_required" };
  if (!EMAIL_RE.test(lead.email)) return { error: "email_invalid" };
  if (lead.message.length < 10) return { error: "message_too_short" };

  for (const [key, max] of Object.entries(MAX_LENGTHS)) {
    if (lead[key as keyof typeof MAX_LENGTHS].length > max) {
      return { error: `${key}_too_long` };
    }
  }

  return { lead };
}

// The lead is attacker-controlled text landing in an HTML email body.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderEmail(lead: Lead) {
  const text = [
    `Name:    ${lead.name}`,
    `Email:   ${lead.email}`,
    `Subject: ${lead.subject}`,
    `Locale:  ${lead.locale}`,
    "",
    lead.message,
  ].join("\n");

  const html = [
    "<div style=\"font-family:system-ui,sans-serif;font-size:15px;line-height:1.6\">",
    `<p><strong>Name:</strong> ${escapeHtml(lead.name)}<br>`,
    `<strong>Email:</strong> ${escapeHtml(lead.email)}<br>`,
    `<strong>Subject:</strong> ${escapeHtml(lead.subject)}<br>`,
    `<strong>Locale:</strong> ${escapeHtml(lead.locale)}</p>`,
    "<hr>",
    `<p style="white-space:pre-wrap">${escapeHtml(lead.message)}</p>`,
    "</div>",
  ].join("");

  return { text, html };
}

export async function POST(req: Request) {
  const ip = clientIp(req);

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const parsed = parseLead(body);
  if ("error" in parsed) {
    // Honeypot hits get a 200 so bots don't learn they were caught.
    if (parsed.error === "honeypot") {
      console.warn("[contact] honeypot triggered", { ip });
      return NextResponse.json({ ok: true }, { status: 200 });
    }
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const { lead } = parsed;

  // Redacted breadcrumb on every lead: enough to know one arrived and who to chase,
  // without putting the message body in logs on the happy path.
  console.log("[contact] lead received", {
    email: lead.email,
    subject: lead.subject,
    locale: lead.locale,
    messageLength: lead.message.length,
  });

  if (!isConfigured()) {
    // Misconfiguration must be loud. The lead is preserved in full below.
    console.error(
      "[contact] LEAD NOT DELIVERED - RESEND_API_KEY or CONTACT_FROM_EMAIL is unset",
      lead,
    );
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const { text, html } = renderEmail(lead);

  try {
    const res = await fetch(`${RESEND_API_BASE}/emails`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        // So hitting Reply in the inbox answers the lead, not the robot.
        reply_to: lead.email,
        subject: `[meyng.com] ${lead.subject} - ${lead.name}`,
        text,
        html,
      }),
      signal: AbortSignal.timeout(PROVIDER_TIMEOUT_MS),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      // Full payload here is the recovery net: the lead is retrievable from logs.
      console.error("[contact] LEAD DELIVERY FAILED", {
        status: res.status,
        detail: detail.slice(0, 500),
        lead,
      });
      return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
    }

    const sent = (await res.json().catch(() => ({}))) as { id?: string };
    console.log("[contact] lead delivered", { id: sent.id, email: lead.email });
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[contact] LEAD DELIVERY THREW", {
      error: err instanceof Error ? err.message : String(err),
      lead,
    });
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }
}

export async function GET() {
  // Cheap liveness probe for the smoke test: reports whether delivery is configured
  // without exposing the key or the recipient.
  return NextResponse.json({ ok: true, configured: isConfigured() });
}
