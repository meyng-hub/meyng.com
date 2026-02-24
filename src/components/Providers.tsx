"use client";

import { MotionConfig } from "framer-motion";
import { NextIntlClientProvider } from "next-intl";
import type { Messages } from "next-intl";

export function Providers({
  locale,
  messages,
  children,
}: {
  locale: string;
  messages: Messages;
  children: React.ReactNode;
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </NextIntlClientProvider>
  );
}
