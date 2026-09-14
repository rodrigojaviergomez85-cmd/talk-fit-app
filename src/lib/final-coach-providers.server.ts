/**
 * Provider adapters shared by the Final Audio Coach route and the pilot's
 * optional retake route. One Groq Whisper Turbo transcription (verbose_json
 * confidence, no large-v3 fallback) and one small text-model JSON call.
 * Server-only: keys are read inside the functions, never at module scope.
 */
import type { SttConfidence, SttResult } from "./final-audio-coach.server";
import type { AiLogMeta } from "./ai-call-log.server";

const GROQ_URL = "https://api.groq.com/openai/v1/audio/transcriptions";
const GROQ_MODEL = "whisper-large-v3-turbo";
const GATEWAY_CHAT = "https://ai.gateway.lovable.dev/v1/chat/completions";
export const COACH_TEXT_MODEL = "google/gemini-3.7-flash";

export const AUDIO_EXT: Record<string, string> = {
  "audio/webm": "webm",
  "audio/mp4": "mp4",
  "audio/x-m4a": "m4a",
  "audio/mpeg": "mp3",
  "audio/wav": "wav",
  "audio/wave": "wav",
  "audio/ogg": "ogg",
};

export async function transcribeFinalAudio(
  audio: Uint8Array,
  mime: string | null,
  tag = "final-audio-coach",
  meta?: AiLogMeta,
): Promise<SttResult> {
  const apiKey = process.env["GROQ_API_KEY"];
  if (!apiKey) {
    console.error(`[${tag}] GROQ_API_KEY missing`);
    return { ok: false };
  }
  const base = (mime ?? "audio/webm").split(";")[0]?.trim().toLowerCase() ?? "audio/webm";
  const ext = AUDIO_EXT[base] ?? "webm";
  const form = new FormData();
  form.append("model", GROQ_MODEL);
  form.append("file", new Blob([audio as BlobPart], { type: base }), `final.${ext}`);
  form.append("language", "en");
  form.append("response_format", "verbose_json");
  const startedAt = Date.now();
  try {
    const res = await fetch(GROQ_URL, { method: "POST", headers: { Authorization: `Bearer ${apiKey}` }, body: form });
    if (!res.ok) {
      console.error(`[${tag}] STT failed [${res.status}]`);
      logStt(meta, tag, null, false, String(res.status), Date.now() - startedAt);
      return { ok: false };
    }
    const data = (await res.json().catch(() => null)) as {
      text?: unknown;
      duration?: unknown;
      segments?: Array<{ avg_logprob?: unknown; no_speech_prob?: unknown }>;
    } | null;
    const text = typeof data?.text === "string" ? data.text : "";
    const seconds = typeof data?.duration === "number" && Number.isFinite(data.duration) ? data.duration : null;
    logStt(meta, tag, seconds, true, null, Date.now() - startedAt);
    return { ok: true, text, confidence: segmentConfidence(data?.segments) };
  } catch (err) {
    console.error(`[${tag}] STT error`, err instanceof Error ? err.message : err);
    logStt(meta, tag, null, false, "network", Date.now() - startedAt);
    return { ok: false };
  }
}

/** Fire-and-forget cost log; never affects the caller. */
function logStt(
  meta: AiLogMeta | undefined,
  tag: string,
  seconds: number | null,
  ok: boolean,
  errorCode: string | null,
  latencyMs: number,
): void {
  if (!meta) return;
  void import("./ai-call-log.server").then(({ logAiCall }) =>
    logAiCall({
      user_id: meta.userId,
      endpoint: tag,
      provider: "groq",
      model: GROQ_MODEL,
      module_id: meta.moduleId ?? null,
      day: meta.day ?? null,
      audio_seconds: seconds,
      ok,
      error_code: errorCode,
      latency_ms: latencyMs,
    }),
  ).catch(() => {});
}

/** Conservative aggregate: min avg_logprob, max no_speech_prob. Null when metadata is absent — never throws. */
export function segmentConfidence(segments: unknown): SttConfidence | null {
  if (!Array.isArray(segments) || segments.length === 0) return null;
  let avgLogprob = Number.POSITIVE_INFINITY;
  let noSpeechProb = Number.NEGATIVE_INFINITY;
  let seen = false;
  for (const s of segments as Array<{ avg_logprob?: unknown; no_speech_prob?: unknown }>) {
    const lp = typeof s?.avg_logprob === "number" && Number.isFinite(s.avg_logprob) ? s.avg_logprob : null;
    const ns = typeof s?.no_speech_prob === "number" && Number.isFinite(s.no_speech_prob) ? s.no_speech_prob : null;
    if (lp !== null) {
      avgLogprob = Math.min(avgLogprob, lp);
      seen = true;
    }
    if (ns !== null) {
      noSpeechProb = Math.max(noSpeechProb, ns);
      seen = true;
    }
  }
  if (!seen) return null;
  return {
    avgLogprob: Number.isFinite(avgLogprob) ? avgLogprob : 0,
    noSpeechProb: Number.isFinite(noSpeechProb) ? noSpeechProb : 0,
  };
}

type ChatMessage = { role: "system" | "user"; content: string };

/** One small text-model call with a strict JSON schema. Null on any failure (caller decides). */
export async function coachChatJson(
  messages: ChatMessage[],
  jsonSchema: unknown,
  tag = "final-audio-coach",
  meta?: AiLogMeta,
): Promise<unknown | null> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) {
    console.error(`[${tag}] LOVABLE_API_KEY missing`);
    return null;
  }
  const startedAt = Date.now();
  const res = await fetch(GATEWAY_CHAT, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: COACH_TEXT_MODEL,
      messages,
      response_format: { type: "json_schema", json_schema: jsonSchema },
    }),
  });
  if (!res.ok) {
    console.error(`[${tag}] coach model failed [${res.status}]`);
    logChat(meta, tag, null, null, false, String(res.status), Date.now() - startedAt);
    return null;
  }
  const body = (await res.json().catch(() => null)) as {
    choices?: Array<{ message?: { content?: unknown } }>;
    usage?: { prompt_tokens?: unknown; completion_tokens?: unknown };
  } | null;
  logChat(
    meta,
    tag,
    typeof body?.usage?.prompt_tokens === "number" ? body.usage.prompt_tokens : null,
    typeof body?.usage?.completion_tokens === "number" ? body.usage.completion_tokens : null,
    true,
    null,
    Date.now() - startedAt,
  );
  const content = body?.choices?.[0]?.message?.content;
  if (typeof content !== "string") return null;
  try {
    return JSON.parse(content) as unknown;
  } catch {
    return null;
  }
}

/** Fire-and-forget cost log for the coach text call. */
function logChat(
  meta: AiLogMeta | undefined,
  tag: string,
  inputTokens: number | null,
  outputTokens: number | null,
  ok: boolean,
  errorCode: string | null,
  latencyMs: number,
): void {
  if (!meta) return;
  void import("./ai-call-log.server").then(({ logAiCall }) =>
    logAiCall({
      user_id: meta.userId,
      endpoint: tag,
      provider: "lovable-gateway",
      model: COACH_TEXT_MODEL,
      module_id: meta.moduleId ?? null,
      day: meta.day ?? null,
      input_tokens: inputTokens,
      output_tokens: outputTokens,
      ok,
      error_code: errorCode,
      latency_ms: latencyMs,
    }),
  ).catch(() => {});
}
