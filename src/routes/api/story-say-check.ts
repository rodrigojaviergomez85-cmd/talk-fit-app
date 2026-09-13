import { createFileRoute } from "@tanstack/react-router";
import { compareStorySay } from "@/lib/story-say-match";
import type { Rep2Confidence } from "@/lib/rep2-match";
import { getStorybookEpisode } from "@/services/storybook";

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

const MAX_BYTES = 1_500_000; // ~8-10 s of compressed voice
const MIN_BYTES = 2048;
const RATE_LIMIT = 30; // requests per user per hour
const RATE_WINDOW_SECONDS = 60 * 60;
const DAILY_LIMIT_FALLBACK = 30;
const DAILY_SECTION_KEY = "storybook";

const GROQ_URL = "https://api.groq.com/openai/v1/audio/transcriptions";
const MODEL_TURBO = "whisper-large-v3-turbo";
/** Neutral context only — must never contain the expected sentence or target words. */
const NEUTRAL_PROMPT = "English learner speaking in English.";

const AVG_LOGPROB_THRESHOLD = -0.7;
const NO_SPEECH_THRESHOLD = 0.5;

type Metrics = {
  total: number;
  good: number;
  tryAgain: number;
  uncertain: number;
};

const metrics: Metrics = { total: 0, good: 0, tryAgain: 0, uncertain: 0 };

/**
 * Low-cost spoken check for storybook "Ahora dilo tú" follow-ups.
 *
 * Scope: one short sentence per quick-question slide. The browser only sends
 * the story + quiz ids; the server loads the authoritative target from the
 * episode registry. One Whisper Turbo transcription, one local wildcard match,
 * no LLM, no fallback model, and strict per-user quotas.
 */
export const Route = createFileRoute("/api/story-say-check")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const startedAt = Date.now();
        metrics.total++;

        const { verifyRequestUser, consumeQuota, sectionDailyLimit } = await import(
          "@/lib/route-auth.server"
        );
        const userId = await verifyRequestUser(request);
        if (!userId) {
          log({ outcome: "401", duration: Date.now() - startedAt });
          return json({ error: "Sign in to practice speaking." }, 401);
        }

        const apiKey = process.env["GROQ_API_KEY"];

        const declared = Number(request.headers.get("content-length") ?? 0);
        if (declared > MAX_BYTES + 64 * 1024) {
          return json({ error: "Recording is too large." }, 413);
        }

        let file: File | null = null;
        let storyId: string | null = null;
        let quizId: string | null = null;
        try {
          const form = await request.formData();
          file = form.get("file") instanceof File ? (form.get("file") as File) : null;
          storyId = String(form.get("storyId") ?? "");
          quizId = String(form.get("quizId") ?? "");
        } catch {
          file = null;
        }

        if (!storyId || !quizId) {
          return json({ error: "Missing story or quiz id." }, 400);
        }

        const episode = getStorybookEpisode(storyId);
        if (!episode) {
          return json({ error: "Story not found." }, 404);
        }
        const quiz = episode.quizzes.find((q) => q.id === quizId);
        if (!quiz?.sayItCheck) {
          return json({ error: "This prompt is not checked yet." }, 400);
        }
        const target = quiz.sayItCheck.target;

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

        const dailyLimit = await sectionDailyLimit(userId, DAILY_SECTION_KEY, DAILY_LIMIT_FALLBACK);
        const dailyQuota = await consumeQuota(
          userId,
          `${DAILY_SECTION_KEY}-daily`,
          dailyLimit,
          24 * 60 * 60,
        );
        if (!dailyQuota.allowed) {
          log({ outcome: "429-daily", duration: Date.now() - startedAt });
          return json({ error: "Daily story speaking limit reached. Continue tomorrow." }, 429);
        }

        const hourlyQuota = await consumeQuota(
          userId,
          "story-say-check",
          RATE_LIMIT,
          RATE_WINDOW_SECONDS,
        );
        if (!hourlyQuota.allowed) {
          log({ outcome: "429-hourly", duration: Date.now() - startedAt });
          return json({ error: "Too many checks. Try again later." }, 429);
        }

        if (!apiKey) {
          log({ outcome: "500-no-key", duration: Date.now() - startedAt });
          return json({ error: "Speaking check is not configured." }, 500);
        }

        const stt = await transcribe(apiKey, file, ext);
        if (!stt.ok) {
          const detail = await stt.res.text().catch(() => "");
          console.error(`Groq ${MODEL_TURBO} failed [${stt.res.status}]: ${detail}`);
          log({ outcome: `provider-${stt.res.status}`, duration: Date.now() - startedAt });
          return json({ error: "Could not understand the recording." }, gatewayStatus(stt.res.status));
        }

        // ASR uncertainty is its own status so the UI can ask for a clean retry
        // without counting it as a failed attempt.
        if (
          stt.transcript.length === 0 ||
          (stt.confidence.avgLogprob < AVG_LOGPROB_THRESHOLD || stt.confidence.noSpeechProb > NO_SPEECH_THRESHOLD)
        ) {
          metrics.uncertain++;
          log({ outcome: "uncertain", duration: Date.now() - startedAt });
          return json({ status: "uncertain", transcript: stt.transcript }, 200);
        }

        const result = compareStorySay(target, stt.transcript, {
          allowShortAnswer: quiz.sayItCheck.allowShortAnswer === true,
          altTargets: quiz.sayItCheck.altTargets ?? [],
        });
        if (result.status === "good") metrics.good++;
        else metrics.tryAgain++;

        log({
          outcome: result.status,
          storyId,
          quizId,
          transcriptWords: stt.transcript.split(/\s+/).filter(Boolean).length,
          duration: Date.now() - startedAt,
        });

        return json(
          {
            status: result.status,
            // Show the learner what we heard on tryAgain so they can self-correct.
            transcript: result.status === "good" ? undefined : stt.transcript,
          },
          200,
        );
      },
    },
  },
});

async function transcribe(
  apiKey: string,
  file: File,
  ext: string,
): Promise<{ ok: true; transcript: string; confidence: Rep2Confidence } | { ok: false; res: Response }> {
  const form = new FormData();
  form.append("model", MODEL_TURBO);
  form.append("file", file, `take.${ext}`);
  form.append("language", "en");
  form.append("prompt", NEUTRAL_PROMPT);
  form.append("response_format", "json");

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
  console.info("[story-say-check]", { ...metrics, ...extra });
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
