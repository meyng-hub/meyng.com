import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-meyng-dark border-t border-meyng-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Image
              src="/images/logo-full.png"
              alt="MEYNG"
              width={120}
              height={44}
              className="h-10 w-auto mb-4"
            />
            <p className="text-meyng-silver text-sm leading-relaxed max-w-md">
              Building AI-driven products that bridge gaps in language,
              education, food sustainability, and community development across
              Africa.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-meyng-light font-semibold mb-4 text-sm uppercase tracking-wider">
              Navigate
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/products", label: "Products" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-meyng-silver hover:text-meyng-purple transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-meyng-light font-semibold mb-4 text-sm uppercase tracking-wider">
              Products
            </h4>
            <ul className="space-y-3">
              {["SangoAI", "KobeTrack", "eNdara", "ConnectZ"].map(
                (product) => (
                  <li key={product}>
                    <Link
                      href="/products"
                      className="text-meyng-silver hover:text-meyng-purple transition-colors text-sm"
                    >
                      {product}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="section-divider mt-12 mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-meyng-silver/60 text-xs">
            &copy; {new Date().getFullYear()} MEYNG. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/contact"
              className="text-meyng-silver/60 hover:text-meyng-purple text-xs transition-colors"
            >
              contact@meyng.com
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
