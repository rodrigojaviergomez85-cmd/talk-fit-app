import { createFileRoute } from "@tanstack/react-router";

/**
 * Natural American English model voice.
 * Proxies Lovable AI text-to-speech and returns a plain MP3 the browser can
 * play (and cache) with an <audio> element.
 *
 * Generated clips are persisted in the private "course-audio" storage
 * bucket keyed by sha256(text + voice + tone), so a clip is generated once
 * across all learners and served from storage afterwards.
 */

type Tone = "coach" | "neutral" | "tense";

const TONE_INSTRUCTIONS: Record<Tone, string> = {
  coach:
    "Speak with a very energetic, cheerful and excited tone — like an enthusiastic bilingual call-center coach hyping up their team. Warm, upbeat, smiling while speaking, dynamic rhythm and lively intonation. Natural everyday American English accent, clear and conversational — not robotic, not flat, not over-enunciated.",
  neutral:
    "Speak in a calm, professional, conversational tone — like an experienced recruiter or interviewer in a real job interview. Neutral and composed, moderate pace, natural everyday American English accent, clear but not exaggerated. No excitement, no cheerfulness, no smiling delivery; steady and matter-of-fact, with natural connected speech.",
  tense:
    "Speak as a frustrated but controlled customer on a support call. Firm, clipped, impatient and a little tired of repeating yourself — tense and direct, but never shouting or theatrical. Slightly faster pace, short pauses, flat falling intonation. Natural everyday American English accent, realistic and conversational.",
};

const BUCKET = "course-audio";
const MAX_TEXT = 1500;
const VOICE_MAP: Record<string, string> = { neutral: "alloy", female: "nova", male: "onyx" };
const TONES: readonly Tone[] = ["coach", "neutral", "tense"];
const WINDOW_SECONDS = 60 * 60;
const REQUEST_LIMIT = 300; // any /api/tts request per user per hour (cache hits included)
const GENERATE_LIMIT = 30; // new paid generations per user per hour (cache misses only)

async function clipKey(text: string, voice: string, tone: Tone): Promise<string> {
  const data = new TextEncoder().encode(`${voice}\u0000${tone}\u0000${text}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  const hex = Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `${tone}/${voice}/${hex}.mp3`;
}

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

/**
 * Guarded flow: auth → validate → total request quota → cache lookup.
 * A cache hit returns immediately with no AI dependency. On a miss only:
 * require LOVABLE_API_KEY → generation quota → AI → persist.
 * Cache hits never consume the generation quota; quota failures fail closed.
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
        const text = typeof body.text === "string" ? body.text.trim() : "";
        if (!text) return json({ error: "Missing text." }, 400);
        if (text.length > MAX_TEXT) return json({ error: `Text is too long (max ${MAX_TEXT} characters).` }, 413);

        const voiceIn = body.voice === undefined || body.voice === null ? "neutral" : body.voice;
        const voice = typeof voiceIn === "string" ? VOICE_MAP[voiceIn] : undefined;
        if (!voice) return json({ error: "Unsupported voice." }, 400);

        const toneIn = body.tone === undefined || body.tone === null ? "coach" : body.tone;
        if (typeof toneIn !== "string" || !(TONES as readonly string[]).includes(toneIn)) {
          return json({ error: "Unsupported tone." }, 400);
        }
        const tone = toneIn as Tone;

        // 2) Total request quota (durable, fails closed).
        const total = await consumeQuota(userId, "tts-request", REQUEST_LIMIT, WINDOW_SECONDS);
        if (!total.allowed) return json({ error: "Too many voice requests. Try again later." }, 429);

        const key = await clipKey(text, voice, tone);

        // 3) Stored clip? Serve it without touching the TTS API or the generation quota.
        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const { data, error } = await supabaseAdmin.storage.from(BUCKET).download(key);
          if (data && !error) {
            return audioResponse(await data.arrayBuffer(), "store");
          }
        } catch (error) {
          console.warn("course-audio lookup failed, treating as miss:", error);
        }

        // 4) Cache miss → paid work. Only now require the AI key.
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) return json({ error: "Voice service is not configured." }, 500);

        const gen = await consumeQuota(userId, "tts-generate", GENERATE_LIMIT, WINDOW_SECONDS);
        if (!gen.allowed) return json({ error: "Voice generation limit reached. Try again later." }, 429);

        // 5) Generate.
        const upstream = await fetch("https://ai.gateway.lovable.dev/v1/audio/speech", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "openai/gpt-4o-mini-tts",
            input: text,
            voice,
            response_format: "mp3",
            instructions: TONE_INSTRUCTIONS[tone],
          }),
        });

        if (!upstream.ok) {
          const detail = await upstream.text().catch(() => "");
          console.error(`TTS failed [${upstream.status}]: ${detail}`);
          const status = upstream.status === 429 || upstream.status === 402 ? upstream.status : 502;
          return json({ error: "Voice generation failed." }, status);
        }

        const audio = await upstream.arrayBuffer();

        // 6) Persist for every future learner (best effort — never blocks playback).
        let stored = "no";
        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const { error } = await supabaseAdmin.storage
            .from(BUCKET)
            .upload(key, audio, { contentType: "audio/mpeg", cacheControl: "31536000", upsert: false });
          if (error && !/already exists|duplicate/i.test(error.message)) {
            console.error("course-audio upload failed:", error.message);
          } else {
            stored = "yes";
          }
        } catch (error) {
          console.error("course-audio upload threw:", error);
        }

        return audioResponse(audio, "generated", { "x-audio-stored": stored });
      },
    },
  },
});
