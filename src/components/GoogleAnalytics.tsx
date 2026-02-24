const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Google Analytics 4 — server-rendered script tags.
 *
 * Uses plain <script> tags instead of next/script or @next/third-parties
 * to avoid the client-side SyntaxError caused by next/script's dynamic
 * `document.body.appendChild()` during hydration (known Next.js 15+/16 issue).
 *
 * These tags are rendered into the HTML during SSR — no client-side
 * script injection occurs.
 */
export function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');`,
        }}
      />
    </>
  );
}
