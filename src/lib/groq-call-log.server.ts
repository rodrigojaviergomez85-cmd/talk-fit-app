/**
 * Fire-and-forget Groq transcription cost log, shared by the routes that own
 * their private transcribe helper (rep2-correction, story-say-check).
 * Never throws and never delays the learner's response.
 */
import type { AiLogMeta } from "./ai-call-log.server";

export function logGroqCall(
  meta: AiLogMeta | undefined,
  endpoint: string,
  model: string,
  audioSeconds: number | null,
  ok: boolean,
  errorCode: string | null,
  latencyMs: number,
): void {
  if (!meta) return;
  void import("./ai-call-log.server")
    .then(({ logAiCall }) =>
      logAiCall({
        user_id: meta.userId,
        endpoint,
        provider: "groq",
        model,
        module_id: meta.moduleId ?? null,
        day: meta.day ?? null,
        audio_seconds: audioSeconds,
        ok,
        error_code: errorCode,
        latency_ms: latencyMs,
      }),
    )
    .catch(() => {});
}
