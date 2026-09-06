/**
 * Client-safe helpers and PUBLIC types for the STEP 5 Final Audio Coach.
 * The coach itself runs server-side (see final-audio-coach.server.ts) — never
 * import that module from React code. Only the learner-facing result shape
 * lives here: no transcript, hashes, storage paths or provider details.
 */
import type { CourseDay } from "./types";

/**
 * Resolves which Rep 5 turn a take answered, ONE-BASED.
 *  - null                → classic STEP 5 (rep5Prompt)
 *  - n                   → rep5Turns[n - 1]
 * Retry slots carry the local label `turn:<zeroBasedIndex>`; that index is the
 * source of truth for which turn is being retried, whatever the take number is.
 */
export function sourceTurnNumberFor(
  day: Pick<CourseDay, "rep5Turns">,
  takeIndex: number,
  label?: string | null,
): number | null {
  const turns = day.rep5Turns;
  if (!turns || turns.length === 0) return null;
  const fromLabel = /^turn:(\d+)$/.exec(label ?? "");
  if (fromLabel) {
    const idx = Number(fromLabel[1]);
    if (Number.isInteger(idx) && idx >= 0 && idx < turns.length) return idx + 1;
  }
  if (takeIndex >= 0 && takeIndex < turns.length) return takeIndex + 1;
  return null;
}

export type FinalAudioCoachRating = "good" | "developing";

/** Compact bilingual feedback returned by the single backend LLM call. */
export type FinalAudioCoachFeedback = {
  taskCompleted: boolean;
  targetLanguage: FinalAudioCoachRating;
  organization: FinalAudioCoachRating;
  strengthEn: string;
  strengthEs: string;
  nextStepEn: string;
  nextStepEs: string;
};

/** Public JSON shapes of POST /api/final-audio-coach the UI cares about. */
export type FinalAudioCoachResponse =
  | { status: "ready"; feedback: FinalAudioCoachFeedback }
  | { status: "unclear" }
  | { status: "pending" }
  | { status: "final_audio_not_ready" }
  | { status: "error"; code?: string }
  | { status: "not_found" }
  | { status: "audio_too_large" }
  | { status: "rate_limited" };

/** Learner-facing coach state owned by the practice flow (never persisted). */
export type FinalCoachState =
  | { status: "idle" }
  | { status: "preparing" }
  | { status: "analyzing" }
  | { status: "ready"; feedback: FinalAudioCoachFeedback }
  | { status: "unclear" }
  | { status: "unavailable" };
