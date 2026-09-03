import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Regression tests for the contact route's misconfiguration path.
 *
 * Why this file exists: on 2026-08-29 the Resend delivery change shipped
 * without RESEND_API_KEY or CONTACT_FROM_EMAIL set in production. Every lead
 * got a 503 for five days. The daily smoke test caught it correctly, but only
 * against the live site — after the merge. These tests assert the same
 * contract at PR time.
 *
 * Two things are load-bearing and both are asserted here:
 *  1. an unconfigured deploy fails LOUD (503 + error log), never silently 200,
 *  2. the full lead is written to the error log, because that log is the only
 *     recovery net for leads submitted while delivery is down.
 *
 * route.ts reads its config into module-level consts at import time, so every
 * case must set env BEFORE importing and get a fresh copy of the module.
 */

const ENV_KEYS = [
  "RESEND_API_KEY",
  "CONTACT_FROM_EMAIL",
  "CONTACT_TO_EMAIL",
  "RESEND_API_BASE",
] as const;

let saved: Record<string, string | undefined>;

beforeEach(() => {
  saved = {};
  for (const k of ENV_KEYS) saved[k] = process.env[k];
  // Silence the route's own logging; individual tests spy where they assert.
  vi.spyOn(console, "log").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  for (const k of ENV_KEYS) {
    if (saved[k] === undefined) delete process.env[k];
    else process.env[k] = saved[k];
  }
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

/**
 * Load a fresh copy of the route with exactly the given env applied.
 * resetModules is what makes the module-level config consts re-evaluate.
 */
async function loadRoute(env: Partial<Record<(typeof ENV_KEYS)[number], string>>) {
  for (const k of ENV_KEYS) delete process.env[k];
  for (const [k, v] of Object.entries(env)) process.env[k] = v;
  vi.resetModules();
  return import("./route");
}

/** Distinct IP per request: the route rate-limits 5 per IP per 60s. */
let ipCounter = 0;
function leadRequest(body: Record<string, unknown> = {}) {
  ipCounter += 1;
  return new Request("https://www.meyng.com/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": `203.0.113.${ipCounter % 254}`,
    },
    body: JSON.stringify({
      name: "Ada Lovelace",
      email: "ada@example.com",
      subject: "Partnership",
      message: "We would like to talk about a Sango deployment.",
      locale: "en",
      ...body,
    }),
  });
}

const CONFIGURED = {
  RESEND_API_KEY: "re_test_key",
  CONTACT_FROM_EMAIL: "bot@meyng.com",
} as const;

describe("POST /api/contact when delivery is not configured", () => {
  it("returns 503 not_configured when both env vars are missing", async () => {
    const { POST } = await loadRoute({});

    const res = await POST(leadRequest());

    expect(res.status).toBe(503);
    await expect(res.json()).resolves.toEqual({ error: "not_configured" });
  });

  it("never answers 200 — a dropped lead must not look accepted", async () => {
    const { POST } = await loadRoute({});

    const res = await POST(leadRequest());

    // This is the whole point of the 503. The Aug 2026 incident was a silent
    // failure that looked fine from the browser.
    expect(res.ok).toBe(false);
    expect(res.status).not.toBe(200);
  });

  it("writes the full lead to the error log so it stays recoverable", async () => {
    const errorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const { POST } = await loadRoute({});

    await POST(leadRequest({ message: "A ten-plus character enquiry body." }));

    expect(errorSpy).toHaveBeenCalledTimes(1);
    const [message, lead] = errorSpy.mock.calls[0];
    expect(String(message)).toContain("LEAD NOT DELIVERED");
    // The recovery net: enough to chase the lead by hand.
    expect(lead).toMatchObject({
      name: "Ada Lovelace",
      email: "ada@example.com",
      subject: "Partnership",
      message: "A ten-plus character enquiry body.",
      locale: "en",
    });
  });

  it("does not call the mail provider when unconfigured", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    const { POST } = await loadRoute({});

    await POST(leadRequest());

    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it.each([
    ["only RESEND_API_KEY set", { RESEND_API_KEY: "re_test_key" }],
    ["only CONTACT_FROM_EMAIL set", { CONTACT_FROM_EMAIL: "bot@meyng.com" }],
  ])("still 503s with %s — both are required", async (_label, env) => {
    const { POST } = await loadRoute(env);

    const res = await POST(leadRequest());

    expect(res.status).toBe(503);
  });

  it("503s on config, not unconditionally — a configured deploy delivers", async () => {
    // Guards against the test passing because the handler always 503s.
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(JSON.stringify({ id: "msg_1" }), { status: 200 })),
    );
    const { POST } = await loadRoute(CONFIGURED);

    const res = await POST(leadRequest());

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true });
  });
});

describe("GET /api/contact liveness probe", () => {
  // The smoke test greps this body for '"configured":true'. If the shape ever
  // changes, the production alert silently stops meaning anything.
  it("reports configured:false when delivery config is missing", async () => {
    const { GET } = await loadRoute({});

    const res = await GET();

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true, configured: false });
  });

  it("reports configured:true when both env vars are set", async () => {
    const { GET } = await loadRoute(CONFIGURED);

    await expect((await GET()).json()).resolves.toEqual({
      ok: true,
      configured: true,
    });
  });
});
