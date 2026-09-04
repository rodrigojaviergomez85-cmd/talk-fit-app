import { createFileRoute } from "@tanstack/react-router";

/**
 * Natural American English model voice.
 * Proxies Lovable AI text-to-speech and returns a plain MP3 the browser can
 * play (and cache) with an <audio> element.
 *
 * Generated clips are persisted in the public-read "course-audio" storage
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

async function clipKey(text: string, voice: string, tone: Tone): Promise<string> {
  const data = new TextEncoder().encode(`${voice}\u0000${tone}\u0000${text}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  const hex = Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `${tone}/${voice}/${hex}.mp3`;
}

function audioResponse(body: BodyInit, source: "store" | "generated", extra: Record<string, string> = {}) {
  return new Response(body, {
    headers: {
      "content-type": "audio/mpeg",
      "cache-control": "public, max-age=86400",
      "x-audio-source": source,
      ...extra,
    },
  });
}

export const Route = createFileRoute("/api/tts")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) {
          return new Response(JSON.stringify({ error: "Voice service is not configured." }), {
            status: 500,
            headers: { "content-type": "application/json" },
          });
        }

        let text = "";
        let voice = "alloy";
        let tone: Tone = "coach";
        try {
          const body = (await request.json()) as { text?: unknown; voice?: unknown; tone?: unknown };
          if (body.voice === "female") voice = "nova";
          else if (body.voice === "male") voice = "onyx";
          if (body.tone === "neutral" || body.tone === "tense") tone = body.tone;
          text = typeof body.text === "string" ? body.text.trim() : "";
        } catch {
          text = "";
        }
        if (!text) {
          return new Response(JSON.stringify({ error: "Missing text." }), {
            status: 400,
            headers: { "content-type": "application/json" },
          });
        }
        if (text.length > 3000) text = text.slice(0, 3000);

        const key = await clipKey(text, voice, tone);

        // 1. Stored clip? Serve it without touching the TTS API.
        const supabaseUrl = process.env["SUPABASE_URL"];
        const publicUrl = supabaseUrl ? `${supabaseUrl}/storage/v1/object/public/${BUCKET}/${key}` : null;
        if (publicUrl) {
          try {
            const stored = await fetch(publicUrl, { method: "GET" });
            if (stored.ok && stored.body) {
              return audioResponse(stored.body, "store");
            }
          } catch (error) {
            console.warn("course-audio lookup failed, generating instead:", error);
          }
        }

        // 2. Generate.
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
          return new Response(JSON.stringify({ error: detail || "Voice generation failed." }), {
            status,
            headers: { "content-type": "application/json" },
          });
        }

        const audio = await upstream.arrayBuffer();

        // 3. Persist for every future learner (best effort — never blocks playback).
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
