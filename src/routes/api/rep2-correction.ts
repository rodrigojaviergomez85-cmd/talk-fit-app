import { createFileRoute } from "@tanstack/react-router";
import { compareRep2, toPublicStatus, type Rep2Confidence } from "@/lib/rep2-match";
import { getRep2CorrectionProfile, hasRep2CorrectionRollout, isRep2CorrectionEnabledFor } from "@/lib/rep2-correction-profiles";
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
/** Neutral context only — must never contain the target sentence or the words we detect. */
const NEUTRAL_PROMPT = "English learner speaking about future plans.";


type Metrics = {
  total: number;
  turboOnly: number;
  fallback: number;
  good: number;
  correct: number;
  uncertain: number;
};

const metrics: Metrics = { total: 0, turboOnly: 0, fallback: 0, good: 0, correct: 0, uncertain: 0 };

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

        // Rollout is enforced server-side from the shared authoritative rule.
        if (!moduleId || !hasRep2CorrectionRollout(moduleId)) {
          log({ outcome: "403-module", duration: Date.now() - startedAt });
          return json({ error: "Corrections are not enabled for this module yet." }, 403);
        }
        if (day === null || !isRep2CorrectionEnabledFor(moduleId, day)) {
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

        // Load the real curriculum target + real module profile server-side;
        // the browser never supplies target, focus words or profile.
        const profile = getRep2CorrectionProfile(moduleId);
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

        // Primary STT. The target is NEVER sent to the provider — only a neutral
        // context prompt — so real learner mistakes are not normalised away.
        const turbo = await transcribe(apiKey, file, ext, MODEL_TURBO);
        if (!turbo.ok) {
          const detail = await turbo.res.text().catch(() => "");
          console.error(`Groq ${MODEL_TURBO} failed [${turbo.res.status}]: ${detail}`);
          log({ outcome: `provider-${turbo.res.status}`, duration: Date.now() - startedAt });
          return json({ error: "Could not understand the recording." }, gatewayStatus(turbo.res.status));
        }

        let transcript = turbo.transcript;
        let result = compareRep2(target, transcript, turbo.confidence, profile);
        let usedFallback = false; // per-request, never derived from cumulative metrics
        let model: string = MODEL_TURBO;

        if (result.status === "asr_uncertain") {
          // Only genuine ASR uncertainty (not a wrong sentence) earns one retry with the larger model.
          usedFallback = true;
          model = MODEL_FALLBACK;
          metrics.fallback++;
          const fallback = await transcribe(apiKey, file, ext, MODEL_FALLBACK);
          if (fallback.ok) {
            transcript = fallback.transcript;
            result = compareRep2(target, transcript, fallback.confidence, profile);
          }
        } else {
          metrics.turboOnly++;
        }

        const status = toPublicStatus(result.status);
        if (status === "good") metrics.good++;
        else if (status === "correct") metrics.correct++;
        else metrics.uncertain++;

        log({
          outcome: status,
          usedFallback,
          model,
          transcriptWords: transcript.split(/\s+/).filter(Boolean).length,
          duration: Date.now() - startedAt,
        });

        return json({
          status,
          transcript,
          target,
          focus: result.focus,
          retryRecommended: result.retryRecommended,
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
): Promise<{ ok: true; transcript: string; confidence: Rep2Confidence } | { ok: false; res: Response }> {
  const form = new FormData();
  form.append("model", model);
  form.append("file", file, `take.${ext}`);
  form.append("language", "en");
  form.append("prompt", NEUTRAL_PROMPT);
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
