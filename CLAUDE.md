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
- **Forms**: Formspree (contact form)
- **Hosting**: Vercel

## Key Commands

```bash
npm run dev      # Dev server (port 3000)
npm run build    # Production build
npm run start    # Local production server (verify SSR before deploy)
npm run lint     # ESLint check
```

## Deployment

```bash
cd C:\meyng-website && npx vercel deploy --prod --yes
```

- **Vercel project**: `meyng-website` on team `meyng-webs-projects`
- **Project ID**: `prj_mPZPHjHwpIBZjcNCR0NDWb2qXndn`
- **Team ID**: `team_wONuXem8DRnuW9clO8GDXkaZ`
- Direct deploy — no copy-to-tmp workaround needed (unlike SangoAI)
- Always run `npm run start` + verify HTTP 200 before deploying (SSR can fail even if build passes)

## Project Structure

```
meyng-website/
├── messages/
│   ├── en.json              # English content (source of truth)
│   └── fr.json              # French translation (must match en.json structure)
├── src/
│   ├── app/[locale]/        # Pages (home, about, products, contact, privacy, terms)
│   ├── components/          # Shared components (Navbar, Footer, AnimatedStats, APIShowcase, etc.)
│   ├── data/products.ts     # Product metadata (SangoAI, eNdara, Obetrack)
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
- Products: SangoAI (flagship), eNdara (deployment proof), Obetrack (portfolio)
- ConnectZ was removed — do not re-add

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
