import { createFileRoute } from "@tanstack/react-router";

import { APP_BUILD_ID } from "@/lib/build-id";

/**
 * Tiny endpoint the running app polls to notice a new deploy.
 * No database, no auth, never cached.
 */
export const Route = createFileRoute("/api/public/version")({
  server: {
    handlers: {
      GET: async () =>
        new Response(JSON.stringify({ build: APP_BUILD_ID }), {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store, max-age=0",
          },
        }),
    },
  },
});
