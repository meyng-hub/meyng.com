# CLAUDE.md — MEYNG Website

## Project Overview

Corporate website for MEYNG, an AI company building accessibility products for underserved communities. Showcases 4 products (SangoAI, Obetrack, eNdara, ConnectZ) with bilingual content (EN/FR).

**Live site**: https://meyng.com
**Repo**: https://github.com/meyng-hub/meyng.com

## Tech Stack

- **Framework**: Next.js 16.1.6 (App Router, Turbopack)
- **React**: 19.2.3, TypeScript 5
- **Styling**: TailwindCSS 4 with `@theme inline` custom tokens
- **Animations**: Framer Motion 12 (respects `prefers-reduced-motion` via MotionConfig)
- **i18n**: next-intl 4.8.3 (EN/FR locales)
- **Icons**: Lucide React
- **Analytics**: Google Analytics 4 (G-FFEZSWMXDJ)
- **Hosting**: Vercel
- **Node**: 24.x on Vercel, local dev on 22.x

## Key Commands

```bash
npm run dev       # Dev server (Turbopack, port 3000)
npm run build     # Production build
npm run start     # Production server (run AFTER build)
npm run lint      # ESLint check
```

## Deployment

- **Vercel project**: `meyng-website`
- **Project ID**: `prj_mPZPHjHwpIBZjcNCR0NDWb2qXndn`
- **Team ID**: `team_wONuXem8DRnuW9clO8GDXkaZ`
- **Domains**: `meyng.com`, `www.meyng.com`

```bash
# Deploy to production
cd C:/meyng-website && npx vercel deploy --prod --yes
```

### Environment Variables (Vercel Dashboard)

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 Measurement ID |
| `NEXT_PUBLIC_FORMSPREE_URL` | Contact form endpoint (fallback hardcoded) |

## Project Structure

```
meyng-website/
├── src/
│   ├── app/
│   │   ├── [locale]/           # Dynamic locale routing
│   │   │   ├── layout.tsx      # Root layout (server component)
│   │   │   ├── page.tsx        # Home page
│   │   │   ├── about/          # About page
│   │   │   ├── products/       # Products page
│   │   │   ├── contact/        # Contact form (Formspree)
│   │   │   ├── privacy/        # Privacy policy
│   │   │   ├── terms/          # Terms of service
│   │   │   ├── loading.tsx     # Skeleton loading states
│   │   │   ├── not-found.tsx   # 404 page
│   │   │   ├── opengraph-image.tsx
│   │   │   └── twitter-image.tsx
│   │   ├── globals.css         # Theme tokens, focus-visible, reduced-motion
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── Providers.tsx       # NextIntlClientProvider + MotionConfig wrapper
│   │   ├── Navbar.tsx          # Fixed nav with mobile menu
│   │   ├── Footer.tsx          # Site footer with nav links
│   │   ├── BackToTop.tsx       # Floating scroll-to-top button
│   │   ├── GoogleAnalytics.tsx # GA4 script injection
│   │   ├── ParticleField.tsx   # Canvas particle animation (hero bg)
│   │   ├── AnimatedStats.tsx   # Counter animation for stats
│   │   ├── SectionHeading.tsx  # Reusable section header
│   │   ├── TranslationDemo.tsx # SangoAI translation demo
│   │   ├── PhoneMockup.tsx     # eNdara SMS mockup
│   │   ├── SMSConversation.tsx # SMS thread animation
│   │   ├── DashboardMockup.tsx # ConnectZ dashboard demo
│   │   ├── APIShowcase.tsx     # API code snippet display
│   │   ├── SocialIcons.tsx     # LinkedIn, X (Twitter) SVG icons
│   │   └── Skeleton.tsx        # Loading skeleton components
│   ├── i18n/
│   │   ├── routing.ts          # Locale definitions (en, fr)
│   │   ├── request.ts          # Server-side message loading
│   │   └── navigation.ts      # Type-safe Link, useRouter, usePathname
│   └── middleware.ts           # next-intl locale redirect middleware
├── messages/
│   ├── en.json                 # English translations
│   └── fr.json                 # French translations
├── public/images/              # Static assets (logo, OG images)
├── next.config.ts              # Next.js config with next-intl plugin
├── vercel.json                 # Vercel build config
└── tsconfig.json               # TypeScript strict mode
```

## Critical Patterns

### Server/Client Component Boundary (IMPORTANT)

The `[locale]/layout.tsx` is a **server component**. It passes data to client components via props. Server-only context (like next-intl locale inference) does NOT propagate through client component wrappers.

**Rule**: When wrapping `NextIntlClientProvider` inside another client component, you MUST pass `locale` explicitly. The provider cannot infer it from server context when nested in a client component.

```tsx
// layout.tsx (server component)
<Providers locale={locale} messages={messages}>  // locale MUST be explicit
  {children}
</Providers>

// Providers.tsx (client component)
<NextIntlClientProvider locale={locale} messages={messages}>  // passes it through
  <MotionConfig reducedMotion="user">{children}</MotionConfig>
</NextIntlClientProvider>
```

**Why**: `NextIntlClientProvider` uses server request context to infer locale when imported directly in a server component. When it's imported by another client component (`Providers.tsx`), that server context is lost. Omitting `locale` causes: `Error: Couldn't infer the 'locale' prop in NextIntlClientProvider`.

### i18n Architecture

```
next.config.ts → createNextIntlPlugin("./src/i18n/request.ts")
middleware.ts  → createMiddleware(routing) — redirects / → /en or /fr
request.ts     → getRequestConfig — loads messages/${locale}.json
routing.ts     → defineRouting({ locales: ["en", "fr"], defaultLocale: "en" })
navigation.ts  → createNavigation(routing) — type-safe Link, useRouter
```

- Use `useTranslations("namespace")` in client components
- Use `getTranslations({ locale, namespace })` in server components
- All translation keys are in `messages/en.json` and `messages/fr.json`
- Namespaces: `metadata`, `nav`, `hero`, `stats`, `homeProducts`, `products`, `common`, `api`, `values`, `cta`, `about`, `contact`, `notFound`, `privacy`, `terms`, `accessibility`, `footer`

### Accessibility Features

- **Skip-to-content link**: First element in `<body>`, visible on focus (`sr-only focus:not-sr-only`)
- **Focus-visible outlines**: 2px solid purple, 2px offset (globals.css)
- **Reduced motion**: CSS `@media (prefers-reduced-motion: reduce)` kills all animations; Framer Motion respects OS prefs via `MotionConfig reducedMotion="user"`
- **ParticleField**: Returns `null` when reduced motion preferred; responsive particle count (25 mobile / 45 tablet / 80 desktop)
- **ARIA**: `role="main"`, `aria-label`, `aria-expanded`, `aria-hidden` on decorative elements
- **Semantic HTML**: Proper heading hierarchy, landmark roles
- **Color contrast**: `--color-meyng-purple-a11y: #8B80FF` (5.45:1 ratio for text on dark bg)

### Design Tokens (globals.css)

```css
--color-meyng-purple: #7065EF     /* Primary brand */
--color-meyng-purple-a11y: #8B80FF /* WCAG AA accessible variant */
--color-meyng-deep: #28208C       /* Dark purple */
--color-meyng-dark: #0A0A0A       /* Background */
--color-meyng-card: #111111       /* Card background */
--color-meyng-border: #1a1a2e     /* Borders */
--color-meyng-silver: #C4C4C4     /* Secondary text */
--color-meyng-light: #E9E9E9      /* Primary text */
```

### Animation Pattern

All animated components use Framer Motion with this pattern:
- `motion.div` with `initial`, `whileInView`, `viewport={{ once: true }}`
- `AnimatePresence` for mount/unmount transitions (Navbar mobile menu, BackToTop)
- No direct `window`/`document` access outside `useEffect`

## Pre-Deploy Checklist

**CRITICAL**: Always run these steps before deploying. `npm run build` alone is NOT sufficient — it compiles but doesn't test runtime SSR.

```bash
# 1. Build
npm run build

# 2. Test production server (catches SSR errors that build misses)
npm run start &
sleep 3
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/en   # Must be 200
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/fr   # Must be 200
kill %1

# 3. Deploy
npx vercel deploy --prod --yes

# 4. Verify live
curl -s -L -o /dev/null -w "%{http_code}" https://www.meyng.com/en  # Must be 200
curl -s -L -o /dev/null -w "%{http_code}" https://www.meyng.com/fr  # Must be 200
```

## Known Issues

1. **Middleware deprecation warning**: `"middleware" file convention is deprecated. Please use "proxy" instead.` — Next.js 16 warns about `middleware.ts`; next-intl still uses the old convention. Non-breaking, monitor for next-intl updates.
2. **npm audit vulnerabilities**: 15 vulnerabilities (1 moderate, 14 high) — mostly in dev dependencies. Run `npm audit` periodically.
3. **Node version mismatch**: Vercel uses Node 24.x, local dev uses Node 22.x. Test SSR locally before deploying.

## Lessons Learned

### Feb 2026 — NextIntlClientProvider locale inference breaks in client component wrappers

**What happened**: Created `Providers.tsx` (client component) wrapping `NextIntlClientProvider` + `MotionConfig`. All pages returned HTTP 500 in production.

**Root cause**: `NextIntlClientProvider` infers `locale` from server request context when used directly in a server component. When nested inside another client component, that context is lost.

**Fix**: Pass `locale` explicitly: `<Providers locale={locale} messages={messages}>`.

**Prevention**: Always test with `npm run start` + `curl` before deploying. `npm run build` passes even when SSR will fail at runtime.

**General rule**: When moving a provider from a server component into a client component wrapper, audit ALL props that may rely on server-side context inference. Pass them explicitly.

### Feb 2026 — next/script appendChild SyntaxError in Next.js 16

**What happened**: Browser console showed `SyntaxError: Failed to execute 'appendChild' on 'Node': Invalid or unexpected token` from a Next.js chunk file. Appeared even in incognito mode.

**Root cause**: `next/script` with `afterInteractive` strategy (default) dynamically creates `<script>` elements and calls `document.body.appendChild()` during React hydration. This triggers a SyntaxError in Next.js 15+/16 — a known framework issue. The `@next/third-parties/google` GoogleAnalytics component uses `next/script` internally, so it has the same problem.

**Fix**: Replaced `@next/third-parties/google` with plain `<script>` tags in the server component (`GoogleAnalytics.tsx`). These are rendered directly into the HTML during SSR — no client-side `appendChild` at all.

**General rule**: For analytics and tracking scripts, prefer server-rendered `<script>` tags over `next/script` in App Router. Plain `<script>` tags in server components are rendered into the HTML during SSR and avoid hydration-related script injection issues.
