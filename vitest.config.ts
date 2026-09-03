import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // The contact route is a server-side handler; it needs Node globals
    // (fetch, Request, AbortSignal), not a DOM.
    environment: "node",
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    // Each file gets a fresh module registry. route.ts reads its config into
    // module-level consts at import time, so tests that vary the config must
    // not share a loaded copy of it.
    restoreMocks: true,
  },
});
