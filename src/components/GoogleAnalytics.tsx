import { GoogleAnalytics as GA } from "@next/third-parties/google";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function GoogleAnalytics() {
  if (!GA_ID) return null;

  return <GA gaId={GA_ID} />;
}
