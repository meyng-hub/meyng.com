import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      // ---------------------------------------------------------------------
      // /qr — the indirection layer for PRINTED QR codes. Keep it forever.
      //
      // A QR encoding a destination directly is frozen the moment it is printed;
      // one encoding a path we control can be re-aimed with a one-line edit. That
      // is not theoretical: on 2026-08-14 every printed code in the SangoAI event
      // kit was moved off a WhatsApp bot onto the website with a single redirect
      // change and ZERO regenerated artwork, because they encoded our own paths.
      // The MEYNG flyer's QR was the one that could NOT be re-aimed — it encoded
      // www.meyng.com/fr directly. This exists so that is never true again.
      //
      // ⚠️ permanent: false (307) is REQUIRED, not a default. A 308 is cached by
      // the browser indefinitely, which hands the freeze back to us through the
      // user's own cache and makes the whole indirection worthless.
      //
      // ⚠️ /qr is now a PERMANENTLY RESERVED path. It must never become a page
      // route under src/app/[locale]/.
      //
      // Ordering note: next.config redirects run BEFORE middleware (verified
      // against Next.js's calculateRoutes(), where fsChecker.redirects precedes
      // the middleware entry). So this fires before next-intl can rewrite /qr to
      // /en/qr — which is why no locale-prefixed twin is needed here, unlike the
      // /solutions and /projects pairs below.
      //
      // Points at /fr deliberately: the printed audience is francophone. Change
      // this line, not the artwork, to re-aim it.
      {
        source: "/qr",
        destination: "/fr",
        permanent: false,
      },
      {
        source: "/solutions",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/projects",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/:locale(en|fr)/solutions",
        destination: "/:locale/products",
        permanent: true,
      },
      {
        source: "/:locale(en|fr)/projects",
        destination: "/:locale/products",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
