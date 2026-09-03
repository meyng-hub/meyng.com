# CLAUDE.md - MEYNG Corporate Website

## Overview

Corporate website for MEYNG — an African language AI infrastructure company.

**Live site**: https://meyng.com
**Repo**: https://github.com/meyng-hub/meyng.com

## Tech Stack

- **Framework**: Next.js 16.1.6 (App Router, Turbopack)
- **UI**: React 19, TailwindCSS 4 (`@theme inline` custom tokens), Framer Motion 12
- **i18n**: next-intl 4.8.3 (EN/FR bilingual)
- **Analytics**: Google Analytics 4 (G-FFEZSWMXDJ)
- **Forms**: contact form posts to `/api/contact` (own route handler), which sends via Resend server-side (`RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`)
- **Hosting**: Vercel

## User-level standards

Truly cross-project content (`printf`-vs-`echo` Vercel gotcha, WebFetch 15-min cache, AI-fabricates-numbers audit rule, `git reset --mixed` pattern, commit-checkpoint rule, worktree discipline, MEYNG multi-brand OPSEC scope) lives in `~/.claude/CLAUDE.md` on the dev machine and loads automatically into every Claude Code session. Don't duplicate those rules in this file.

This file focuses on what's **specific to this repo** — Next.js 16 + next-intl idioms, the server/client boundary pattern, the Google Analytics `next/script` incident, and the `.trim()` env-var rule that matters here because GA is injected via inline `<script>`. The Next.js-specific entries under "Lessons Learned" below are load-bearing and should stay.

**Sibling projects** — each has its own `CLAUDE.md` with its own stack / patterns:

- SangoAI: `C:\ndaraAI\CLAUDE.md` (React + Vite + Python Lambda)
- eNdara: `C:\eNdara\CLAUDE.md` (Moodle + Flask SMS + WhatsApp)
- Obêtrack: **RETIRED from MEYNG portfolio (May 2026) — do not re-add to this site**

## Key Commands

```bash
npm run dev      # Dev server (port 3000)
npm run build    # Production build
npm run start    # Local production server (verify SSR before deploy)
npm run lint     # ESLint check
```

## Deployment

**The Vercel Git integration owns production deploys (measured 2026-08-08).** A merge/push
to `main` auto-deploys Production, and PRs get preview deployments — verified on PR #6:
Production deployment for the squash SHA appeared ~30 s after merge with **no CLI call**,
and the prior merge (#5, `500b653`) shows the same pattern. Unlike SangoAI, `vercel.json`
here has **no** `"git": { "deploymentEnabled": false }` guard — the integration is fully on.

- **Normal flow: branch → PR (preview deploy is the CI check) → merge to `main` → done.**
  Do NOT also run `npx vercel deploy --prod` after a merge — that's a double deploy.
- Manual CLI deploy is the fallback only (e.g. Vercel webhook outage), and only from a
  clean `main` checkout: `cd C:\meyng-website && npx vercel deploy --prod --yes`
- **Vercel project**: `meyng-website` on team `meyng-webs-projects`
- **Project ID**: `prj_mPZPHjHwpIBZjcNCR0NDWb2qXndn`
- **Team ID**: `team_wONuXem8DRnuW9clO8GDXkaZ`
- Always run `npm run start` + verify HTTP 200 before merging (SSR can fail even if build passes)
- Verify after merge: GitHub Deployments shows Production `success` for the merge SHA, then
  curl the live page (**expect 307** — apex `meyng.com` redirects to `www.meyng.com`; use
  `curl -L`, and grep for the changed content, not just HTTP 200)

## Project Structure

```
meyng-website/
├── messages/
│   ├── en.json              # English content (source of truth)
│   └── fr.json              # French translation (must match en.json structure)
├── src/
│   ├── app/[locale]/        # Pages (home, about, products, contact, privacy, terms)
│   ├── components/          # Shared components (Navbar, Footer, AnimatedStats, APIShowcase, etc.)
│   ├── data/products.ts     # Product metadata (SangoAI, eNdara only — Obêtrack retired)
│   ├── i18n/                # next-intl config (routing, request, navigation)
│   ├── middleware.ts         # Locale routing middleware
│   └── types/gtag.d.ts      # GA type declarations
├── next.config.ts           # Next.js config with next-intl plugin
├── eslint.config.mjs        # ESLint flat config
└── postcss.config.mjs       # PostCSS with TailwindCSS
```

## Critical Rules

### OPSEC — Never Expose Infrastructure

- **NEVER** put AWS, Lambda, DynamoDB, Bedrock, API Gateway, Claude Sonnet, Anthropic, HuggingFace, npm package names, phone numbers on the public site
- Use abstracted labels: "Cloud Platform", "Foundation AI", "Open Research", "Advanced language models"
- After content changes, grep `messages/` and `src/` for sensitive terms before deploying
- The "Built On" section uses abstracted labels — do NOT revert to specific provider names

### Content Updates

- Always update BOTH `messages/en.json` AND `messages/fr.json` — they must have identical structure
- Products: **SangoAI** (flagship) + **eNdara** (deployment proof) — two products only
- Obêtrack: **RETIRED** — removed from site May 2026. Do not re-add.
- ConnectZ: removed — do not re-add

### Design Tokens

Custom TailwindCSS 4 tokens defined via `@theme inline`:
- `meyng-purple`: #7065ef (primary brand)
- `meyng-deep`: #28208c (dark purple)
- `meyng-dark`: #0a0a0a (background)
- `meyng-card`: #111111 (card surfaces)

## Known Gotchas

- **`npm run build` does NOT catch SSR failures** — always verify with `npm run start` + curl before deploying
- **`next/script` breaks hydration** in Next.js 16 — use plain `<script>` tags for analytics
- **Env vars with trailing newlines** — always use `printf` (not `echo`) when piping to `vercel env add`
- **Always `.trim()` env vars** before interpolating into inline `<script>` tags
- **`Providers.tsx` is a client component** — server context (like locale) must be passed as explicit props
- **WebFetch has a 15-min cache** — when verifying a fresh deploy, fetch a page not previously accessed in the session
- **Never give the contact form a hardcoded fallback endpoint.** Aug 2026: `page.tsx` had
  `process.env.NEXT_PUBLIC_FORMSPREE_URL || "https://formspree.io/f/xdkodznp"`, the env var was
  never set in Vercel, and the fallback ID 404'd (`FORM_NOT_FOUND`). Every lead was dropped, for
  an unknown period, while the daily smoke test ran green — the page rendered fine. A plausible
  default turns "misconfigured" into "confidently broken". `CONTACT_FORM_ENDPOINT` is now
  server-side only (no `NEXT_PUBLIC_`, so bots can't scrape it from the bundle), unset = loud 503,
  and every lead is logged before delivery is attempted so an outage costs latency, not a lead.
  The account turned out to be dead, so delivery moved to Resend (Aug 2026) — same handler, same
  invariants, `RESEND_API_KEY` + `CONTACT_FROM_EMAIL` replace `CONTACT_FORM_ENDPOINT`.
- **Resend needs a verified domain.** `CONTACT_FROM_EMAIL` must be on a domain verified in Resend
  (SPF + DKIM DNS records) or every send 403s. Sending from an unverified domain is the single
  most likely reason a correctly-wired form still delivers nothing.
- **Instrument the revenue path, not just the HTML.** The smoke test asserted hero copy and OPSEC
  strings on a page whose only lead channel was dead. It now checks `GET /api/contact` for
  `"configured":true` daily and posts a real canary lead weekly (Mondays — free-tier quota).

## Health Stack

Used by `/gstack-health`. Pinned so every run measures the same thing and the
score history stays comparable.

- typecheck: `npx tsc --noEmit`
- lint: `npx eslint src next.config.ts`
- build: `npm run build`
- test: `npm test` (vitest 3, `environment: node`, matches `src/**/*.test.ts`)

  Pinned to vitest **3**, not 5: vitest 5 requires `@types/node ^22 || >=24`
  and this repo pins `^20`. Bumping it is a reasonable change, just not one to
  make as a side effect of adding a test.

  Node versions here differ on purpose, and an earlier version of this file got
  it wrong by naming only one. **Vercel builds and runs production on 24.x**
  (`vercel project inspect meyng-website` → `Node.js Version 24.x`); the dev
  laptop runs 22.19. CI follows the deploy runtime, so
  `.github/workflows/test.yml` pins **24**. Read a Node version off the Vercel
  project, never off `node -v`.

  Coverage today is one file: `src/app/api/contact/route.test.ts`, covering
  the misconfigured-delivery path. Everything else is still untested.

  `.github/workflows/test.yml` runs `npm test` on every pull request to `main`
  (and on push to `main`), so the suite now runs *before* a change lands — but
  it is **not a required status check** until someone sets it as one in branch
  protection, so a red run does not block the merge button on its own. The
  post-merge gates remain `production-smoke-test.yml` (daily, curls the live
  site) and `scripts/pre-deploy-check.sh`.

  Writing tests for `route.ts` has one trap: it reads `RESEND_API_KEY` and
  friends into module-level consts at **import** time, and keeps the rate
  limiter's `hits` Map at module scope too. A test that varies config must set
  env, then `vi.resetModules()`, then `await import("./route")` — in that
  order. Give each request a distinct `x-forwarded-for`; the route drops the
  6th hit from one IP inside 60s with a 429.
- deadcode: knip not installed
- shell: shellcheck not installed (`scripts/pre-deploy-check.sh` would be checked)

**Lint must be scoped to `src`, not `npm run lint`.** Bare `eslint` walks the
repo root, and `.claude/worktrees/` can hold a second full copy of the app.
Measured 2026-09-03: `npm run lint` reported **7,126 problems in 81s**, of which
110 of the 117 affected files were a stale worktree; the real number was
**8 problems in 6-15s**. `.claude/**` is now in `globalIgnores` and `.claude/` is
in `.gitignore`, but keep the scoped command — a lint total large enough to
scroll past is a lint total nobody reads.
