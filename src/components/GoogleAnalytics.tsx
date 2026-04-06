const GA_ID = process.env.NEXT_PUBLIC_GA_ID?.trim();

/**
 * Google Analytics 4 — server-rendered script tags with GDPR consent mode.
 *
 * Uses plain <script> tags instead of next/script or @next/third-parties
 * to avoid the client-side SyntaxError caused by next/script's dynamic
 * `document.body.appendChild()` during hydration (known Next.js 15+/16 issue).
 *
 * Consent mode v2: analytics_storage defaults to "denied". The CookieConsent
 * banner calls gtag('consent','update',{analytics_storage:'granted'}) when
 * the user accepts. GA4 respects this — no cookies are set until granted.
 */
export function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('consent','default',{analytics_storage:localStorage.getItem('meyng_cookie_consent')==='granted'?'granted':'denied'});`,
        }}
      />
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `gtag('js',new Date());gtag('config','${GA_ID}');`,
        }}
      />
    </>
  );
}
