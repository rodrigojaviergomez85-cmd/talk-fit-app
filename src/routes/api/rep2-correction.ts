import { createFileRoute } from "@tanstack/react-router";
import { compareRep2, type Rep2Confidence } from "@/lib/rep2-match";
import type { ModuleId } from "@/lib/types";

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
const RATE_LIMIT = 30; // requests per user per hour
const RATE_WINDOW_SECONDS = 60 * 60;

const GROQ_URL = "https://api.groq.com/openai/v1/audio/transcriptions";
const MODEL_TURBO = "whisper-large-v3-turbo";
const MODEL_FALLBACK = "whisper-large-v3";

const ALLOWED_MODULES = new Set<ModuleId>(["simple-future"]);
const ALLOWED_DAYS = new Set([1, 2]);

type Metrics = {
  total: number;
  turboOnly: number;
  fallback: number;
  good: number;
  correct: number;
  uncertain: number;
};

let metrics: Metrics = { total: 0, turboOnly: 0, fallback: 0, good: 0, correct: 0, uncertain: 0 };

/**
 * Low-cost spoken correction for Rep 2.
 * Scope: BASIC 1 · FUTURE, Days 1–2 only.
 * Flow: auth → scope → upload validation → quota → STT (turbo) → local compare.
 * Optional single fallback to whisper-large-v3 only when the first result is uncertain.
 * No LLM is used for the comparison.
 */
export const Route = createFileRoute("/api/rep2-correction")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const startedAt = Date.now();
        metrics.total++;

        // 0) Authentication.
        const { verifyRequestUser, consumeQuota } = await import("@/lib/route-auth.server");
        const userId = await verifyRequestUser(request);
        if (!userId) {
          log({ outcome: "401", duration: Date.now() - startedAt });
          return json({ error: "Sign in to get corrections." }, 401);
        }

        const apiKey = process.env["GROQ_API_KEY"];

        // Scope guard before touching the upload or any paid call.
        const declared = Number(request.headers.get("content-length") ?? 0);
        if (declared > MAX_BYTES + 64 * 1024) {
          return json({ error: "Recording is too large." }, 413);
        }

        let file: File | null = null;
        let moduleId: string | null = null;
        let day: number | null = null;
        let chunkId: string | null = null;
        try {
          const form = await request.formData();
          file = form.get("file") instanceof File ? (form.get("file") as File) : null;
          moduleId = String(form.get("moduleId") ?? "");
          const rawDay = Number(form.get("day"));
          day = Number.isFinite(rawDay) ? rawDay : null;
          chunkId = String(form.get("chunkId") ?? "");
        } catch {
          file = null;
        }

        if (!moduleId || !ALLOWED_MODULES.has(moduleId as ModuleId)) {
          log({ outcome: "403-module", duration: Date.now() - startedAt });
          return json({ error: "Corrections are not enabled for this module yet." }, 403);
        }
        if (day === null || !ALLOWED_DAYS.has(day)) {
          log({ outcome: "403-day", duration: Date.now() - startedAt });
          return json({ error: "Corrections are not enabled for this day yet." }, 403);
        }
        if (!chunkId) {
          return json({ error: "Missing chunk id." }, 400);
        }

        if (!file || file.size < MIN_BYTES) {
          return json({ error: "Recording is empty or too short." }, 400);
        }
        if (file.size > MAX_BYTES) {
          return json({ error: "Recording is too large." }, 413);
        }

        const mime = (file.type || "audio/webm").split(";")[0]?.trim().toLowerCase() ?? "audio/webm";
        const ext = AUDIO_EXT[mime];
        if (!ext) {
          return json({ error: "Unsupported audio format." }, 415);
        }

        // Quota before any external API call.
        const quota = await consumeQuota(userId, "rep2-correction", RATE_LIMIT, RATE_WINDOW_SECONDS);
        if (!quota.allowed) {
          log({ outcome: "429", duration: Date.now() - startedAt });
          return json({ error: "Too many corrections. Try again later." }, 429);
        }

        if (!apiKey) {
          log({ outcome: "500-no-key", duration: Date.now() - startedAt });
          return json({ error: "Correction service is not configured." }, 500);
        }

        // Load the real curriculum target server-side; never trust the browser.
        const { CourseService } = await import("@/services/course-service");
        const { rep2Chunks, rep2ChunkText } = await import("@/lib/rep-structure");
        let target: string;
        try {
          const loaded = await CourseService.loadModule(moduleId as ModuleId);
          const courseDay = loaded.days.find((d) => d.day === day);
          if (!courseDay) throw new Error("Day not found");
          const chunk = rep2Chunks(courseDay).find((c) => c.id === chunkId);
          if (!chunk) throw new Error("Chunk not found");
          target = rep2ChunkText(chunk);
        } catch (err) {
          console.error("[rep2-correction] curriculum load failed", err);
          return json({ error: "Could not load the expected phrase." }, 400);
        }

        // Primary STT.
        let turbo = await transcribe(apiKey, file, ext, MODEL_TURBO, target);
        if (!turbo.ok) {
          const detail = await turbo.res.text().catch(() => "");
          console.error(`Groq ${MODEL_TURBO} failed [${turbo.res.status}]: ${detail}`);
          log({ outcome: `provider-${turbo.res.status}`, duration: Date.now() - startedAt });
          return json({ error: "Could not understand the recording." }, gatewayStatus(turbo.res.status));
        }

        let transcript = turbo.transcript;
        let confidence = turbo.confidence;
        let first = compareRep2(target, transcript, confidence);

        if (first.status === "uncertain") {
          // One retry with the larger model for genuinely uncertain audio.
          const fallback = await transcribe(apiKey, file, ext, MODEL_FALLBACK, target);
          if (fallback.ok) {
            metrics.fallback++;
            transcript = fallback.transcript;
            confidence = fallback.confidence;
            first = compareRep2(target, transcript, confidence);
          }
        } else {
          metrics.turboOnly++;
        }

        const outcome = first.status;
        if (outcome === "good") metrics.good++;
        else if (outcome === "correct") metrics.correct++;
        else metrics.uncertain++;

        log({
          outcome,
          usedFallback: metrics.fallback > 0,
          model: first.status === "uncertain" && metrics.fallback > 0 ? MODEL_FALLBACK : MODEL_TURBO,
          duration: Date.now() - startedAt,
        });

        return json({
          status: first.status,
          transcript,
          target,
          focus: first.focus,
          retryRecommended: first.retryRecommended,
        });
      },
    },
  },
});

async function transcribe(
  apiKey: string,
  file: File,
  ext: string,
  model: string,
  prompt: string,
): Promise<{ ok: true; transcript: string; confidence: Rep2Confidence } | { ok: false; res: Response }> {
  const form = new FormData();
  form.append("model", model);
  form.append("file", file, `take.${ext}`);
  form.append("language", "en");
  form.append("prompt", prompt);
  form.append("response_format", "verbose_json");

  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}` },
    body: form,
  });

  if (!res.ok) return { ok: false, res };

  const body = (await res.json().catch(() => null)) as {
    text?: unknown;
    segments?: Array<{ avg_logprob?: number; no_speech_prob?: number }>;
  } | null;
  const text = typeof body?.text === "string" ? body.text.trim() : "";
  let avgLogprob = 0;
  let noSpeechProb = 0;
  const segments = body?.segments ?? [];
  if (segments.length > 0) {
    avgLogprob = Math.min(...segments.map((s) => s.avg_logprob ?? 0));
    noSpeechProb = Math.max(...segments.map((s) => s.no_speech_prob ?? 0));
  }
  return { ok: true, transcript: text, confidence: { avgLogprob, noSpeechProb } };
}

function log(extra: Record<string, unknown>) {
  console.info("[rep2-correction]", { ...metrics, ...extra });
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}

function gatewayStatus(status: number) {
  return status === 429 || status === 402 || status === 403 ? status : 502;
}
