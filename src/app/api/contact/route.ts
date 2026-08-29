import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Server-side contact endpoint.
 *
 * The browser never talks to the form provider directly. That buys three things:
 *  1. the provider endpoint stays out of the client bundle (bots can't scrape and spam it),
 *  2. every lead is logged here BEFORE delivery is attempted, so a provider outage
 *     costs latency instead of a lead,
 *  3. delivery failures are loud (502 + error log) instead of a silent client-side 404.
 */

const PROVIDER_ENDPOINT = process.env.CONTACT_FORM_ENDPOINT;
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

  const lead: Lead = {
    name: get("name"),
    email: get("email"),
    subject: get("subject") || "general",
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

  if (!PROVIDER_ENDPOINT) {
    // Misconfiguration must be loud. The lead is preserved in full below.
    console.error("[contact] LEAD NOT DELIVERED - CONTACT_FORM_ENDPOINT is unset", lead);
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  try {
    const res = await fetch(PROVIDER_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: lead.name,
        email: lead.email,
        subject: lead.subject,
        message: lead.message,
        _subject: `[meyng.com] ${lead.subject} - ${lead.name}`,
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
  // without exposing the endpoint itself.
  return NextResponse.json({
    ok: true,
    configured: Boolean(PROVIDER_ENDPOINT),
  });
}
