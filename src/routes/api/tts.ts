import { createFileRoute } from "@tanstack/react-router";

/**
 * Natural American English model voice.
 * Proxies Lovable AI text-to-speech and returns a plain MP3 the browser can
 * play (and cache) with an <audio> element.
 *
 * Generated clips are persisted in the private "course-audio" storage
 * bucket keyed by sha256(text + voice + tone), so a clip is generated once
 * across all learners and served from storage afterwards. The shared logic
 * (cache identity, storage safety, durable single-flight lock, generation)
 * lives in src/lib/course-audio.server.ts and is reused by the admin warm-up.
 */

const WINDOW_SECONDS = 60 * 60;
const REQUEST_LIMIT = 300; // any /api/tts request per user per hour (cache hits included)
const GENERATE_LIMIT = 30; // new paid generations per user per hour (cache misses only)

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

function audioResponse(body: BodyInit, source: "store" | "generated", extra: Record<string, string> = {}) {
  return new Response(body, {
    headers: {
      "content-type": "audio/mpeg",
      "cache-control": "private, max-age=86400",
      "x-audio-source": source,
      ...extra,
    },
  });
}

const TEMPORARY = "Voice cache is temporarily unavailable. Try again later.";

/**
 * Guarded flow: auth → validate → total request quota → cache lookup.
 * A cache hit returns immediately with no AI dependency. On a confirmed miss
 * only: durable single-flight lock → re-check → LOVABLE_API_KEY → generation
 * quota (generator only) → AI once → persist. Waiters never generate and never
 * consume the generation quota. Uncertain storage state → 503, never AI.
 */
export const Route = createFileRoute("/api/tts")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // 0) Authentication — no session, no work.
        const { verifyRequestUser, consumeQuota } = await import("@/lib/route-auth.server");
        const userId = await verifyRequestUser(request);
        if (!userId) return json({ error: "Sign in to use the model voice." }, 401);

        // 1) Strict input validation. Server controls model/instructions/format.
        let body: { text?: unknown; voice?: unknown; tone?: unknown };
        try {
          body = (await request.json()) as typeof body;
        } catch {
          return json({ error: "Invalid JSON body." }, 400);
        }
        const audio = await import("@/lib/course-audio.server");
        const normalized = audio.normalizeSpec(body);
        if (!normalized.ok) return json({ error: normalized.error }, normalized.status);
        const spec = normalized.spec;

        // 2) Total request quota (durable, fails closed).
        const total = await consumeQuota(userId, "tts-request", REQUEST_LIMIT, WINDOW_SECONDS);
        if (!total.allowed) return json({ error: "Too many voice requests. Try again later." }, 429);

        // 3) Cache → single-flight → generate. Generation quota only for the real generator.
        const key = await audio.clipKey(spec);
        const result = await audio.resolveClip(spec, key, {
          waitForOther: true,
          beforeGenerate: async () => {
            const gen = await consumeQuota(userId, "tts-generate", GENERATE_LIMIT, WINDOW_SECONDS);
            return gen.allowed;
          },
        });

        switch (result.status) {
          case "hit":
            return audioResponse(result.audio, "store");
          case "generated":
            return audioResponse(result.audio, "generated", { "x-audio-stored": result.stored ? "yes" : "no" });
          case "storage-error":
            return json({ error: TEMPORARY }, 503);
          case "busy":
            return json({ error: "Voice is being prepared. Try again in a moment." }, 503);
          case "not-configured":
            return json({ error: "Voice service is not configured." }, 500);
          case "not-eligible":
            return json({ error: "Voice generation limit reached. Try again later." }, 429);
          case "ai-error":
            return json({ error: "Voice generation failed." }, result.httpStatus);
        }
      },
    },
  },
});
