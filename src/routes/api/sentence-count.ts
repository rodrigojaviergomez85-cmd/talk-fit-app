import { createFileRoute } from "@tanstack/react-router";

/** Only the audio formats the app itself records/uploads. */
const AUDIO_EXT: Record<string, string> = {
  "audio/webm": "webm",
  "audio/mp4": "mp4",
  "audio/x-m4a": "m4a",
  "audio/mpeg": "mp3",
  "audio/wav": "wav",
  "audio/wave": "wav",
  "audio/ogg": "ogg",
};
const MAX_BYTES = 3 * 1024 * 1024;
const MIN_BYTES = 2048;
const RATE_LIMIT = 20; // requests per user
const RATE_WINDOW_SECONDS = 60 * 60; // per hour

/**
 * Estimates how many COMPLETE SPOKEN IDEAS (sentences) a learner produced.
 * Transcribes the audio, then asks a small model for a number only.
 * The transcript is never returned to the browser — no correction, no grading.
 *
 * Guarded (in order, before any paid AI call): learner auth → upload validation → per-user rate limit.
 */
export const Route = createFileRoute("/api/sentence-count")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // 0) Authentication — no session, no work.
        const { verifyRequestUser, consumeQuota } = await import("@/lib/route-auth.server");
        const userId = await verifyRequestUser(request);
        if (!userId) return json({ error: "Sign in to count sentences." }, 401);

        // Cheap header check before touching the body at all.
        const declared = Number(request.headers.get("content-length") ?? 0);
        if (declared > MAX_BYTES + 64 * 1024) {
          return json({ error: "Recording is too large." }, 413);
        }

        let file: File | null = null;
        let interviewAttemptId: string | null = null;
        try {
          const form = await request.formData();
          const value = form.get("file");
          if (value instanceof File) file = value;
          const attempt = form.get("interviewAttemptId");
          if (typeof attempt === "string" && attempt) interviewAttemptId = attempt;
        } catch {
          file = null;
        }

        // DAILY INTERVIEW CAP (2 runs per local day): interview answers must
        // belong to a run that already paid for a slot. The database trigger is
        // what enforces the cap; this only stops paid work for uncounted runs.
        if (interviewAttemptId) {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const { data: attempt } = await supabaseAdmin
            .from("interview_attempts")
            .select("id, first_recording_at")
            .eq("id", interviewAttemptId)
            .eq("user_id", userId)
            .maybeSingle();
          if (!attempt?.first_recording_at) {
            return json({ error: "Daily interview limit reached." }, 429);
          }
        }

        if (!file || file.size < MIN_BYTES) {
          return json({ error: "Recording is empty or too short." }, 400);
        }
        if (file.size > MAX_BYTES) {
          return json({ error: "Recording is too large." }, 413);
        }

        const mime = (file.type || "audio/webm").split(";")[0]?.trim().toLowerCase() ?? "audio/webm";
        if (!(mime in AUDIO_EXT)) {
          return json({ error: "Unsupported audio format." }, 415);
        }

        // Durable per-user limit (shared across server instances). Counted only for valid uploads.
        const quota = await consumeQuota(userId, "sentence-count", RATE_LIMIT, RATE_WINDOW_SECONDS);
        if (!quota.allowed) {
          return json({ error: "Too many requests. Try again later." }, 429);
        }

        // 1) Transcribe (server-side only; transcript never leaves this handler).
        const { transcribeFinalAudio } = await import("@/lib/final-coach-providers.server");
        const bytes = new Uint8Array(await file.arrayBuffer());
        const stt = await transcribeFinalAudio(bytes, mime, "sentence-count");
        if (!stt.ok) {
          return json({ error: "Could not analyze the recording." }, 502);
        }
        const transcript = stt.text.trim();
        if (!transcript) return json({ sentences: 0 });
        const transcriptWords = transcript.split(/\s+/).filter(Boolean).length;

        // 2) Deterministic local count first — most clear takes never reach an LLM.
        const { countCompleteIdeasLocal } = await import("@/lib/sentence-count-local");
        const local = countCompleteIdeasLocal(transcript);
        if (local.status === "confident") {
          console.info(
            `[sentence-count] path=local reason=${local.reason} words=${transcriptWords} sentences=${local.count}`,
          );
          return json({ sentences: local.count });
        }

        // 3) Ambiguous transcript only — fall back to the gateway counter.
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) {
          return json({ error: "Sentence counting is not configured." }, 500);
        }

        // Count complete spoken ideas — punctuation-independent.
        const chat = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-3.7-flash",
            messages: [
              {
                role: "system",
                content:
                  "You count how many COMPLETE SPOKEN IDEAS a beginner English learner produced in a transcript. " +
                  "Beginners pause a lot and speech-to-text punctuation is unreliable, so do NOT count punctuation marks. " +
                  "Count each self-contained idea that has a subject and a verb (for example 'my name is Carlos', " +
                  "'I live in Managua'). Ignore filler words, false starts, and repetitions of the same idea. " +
                  "Never judge grammar or pronunciation. Reply with the number only.",
              },
              { role: "user", content: transcript },
            ],
            response_format: {
              type: "json_schema",
              json_schema: {
                name: "sentence_count",
                strict: true,
                schema: {
                  type: "object",
                  additionalProperties: false,
                  required: ["sentences"],
                  properties: {
                    sentences: { type: "integer", description: "Number of complete spoken ideas." },
                  },
                },
              },
            },
          }),
        });

        if (!chat.ok) {
          const detail = await chat.text().catch(() => "");
          console.error(`Sentence count failed [${chat.status}]: ${detail}`);
          return json({ error: "Could not analyze the recording." }, gatewayStatus(chat.status));
        }

        const chatBody = (await chat.json().catch(() => null)) as
          | { choices?: Array<{ message?: { content?: unknown } }> }
          | null;
        const content = chatBody?.choices?.[0]?.message?.content;
        let sentences: number | null = null;
        if (typeof content === "string") {
          try {
            const parsed = JSON.parse(content) as { sentences?: unknown };
            if (typeof parsed.sentences === "number" && Number.isFinite(parsed.sentences)) {
              sentences = Math.max(0, Math.round(parsed.sentences));
            }
          } catch {
            const match = content.match(/\d+/);
            if (match) sentences = Number(match[0]);
          }
        }

        if (sentences === null) return json({ error: "Could not analyze the recording." }, 502);
        console.info(
          `[sentence-count] path=gemini reason=${local.reason} words=${transcriptWords} sentences=${sentences}`,
        );
        return json({ sentences });
      },
    },
  },
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}

/** Pass through terminal/retryable gateway statuses; everything else is 502. */
function gatewayStatus(status: number) {
  return status === 429 || status === 402 || status === 403 ? status : 502;
}
