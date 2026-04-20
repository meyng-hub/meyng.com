import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
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
