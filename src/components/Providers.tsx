"use client";

import { MotionConfig } from "framer-motion";
import { NextIntlClientProvider } from "next-intl";
import type { Messages } from "next-intl";

export function Providers({
  messages,
  children,
}: {
  messages: Messages;
  children: React.ReactNode;
}) {
  return (
    <NextIntlClientProvider messages={messages}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </NextIntlClientProvider>
  );
}
