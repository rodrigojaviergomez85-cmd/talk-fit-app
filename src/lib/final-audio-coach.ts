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

/* ------------------------------------------------------------------------ */
/*  Multi-correction rollout (pilot)                                         */
/* ------------------------------------------------------------------------ */

export type CoachCorrectionCategory = "verb_tense" | "grammar" | "word_choice" | "naturalness" | "connector" | "development";
export const CORRECTION_CATEGORIES: readonly CoachCorrectionCategory[] = [
  "verb_tense",
  "grammar",
  "word_choice",
  "naturalness",
  "connector",
  "development",
];

/** One prioritized, transcript-grounded correction (server-validated). */
export type FinalAudioCoachCorrection = {
  category: CoachCorrectionCategory;
  said: string;
  betterVersion: string;
  whyEn: string;
  whyEs: string;
};

export type CoachLevelGroup = "basic" | "intermediate" | "advanced";

/**
 * Future rollout ceilings (NOT enabled yet). Changing the gate below plus the
 * prompt guidance is all a later rollout should need — the data shape is ready.
 */
export const MULTI_CORRECTION_MAX: Record<CoachLevelGroup, number> = { basic: 3, intermediate: 5, advanced: 5 };

/** Pilot gate — TRUE only for BASIC 3 · SIMPLE PAST · Day 1. Every other day keeps Final Coach v2. */
export function isMultiCorrectionPilot(moduleId: string, day: number): boolean {
  return moduleId === "past-stories" && day === 1;
}

/** Max corrections the coach may return for a day: 3 on the pilot day, 0 (= v2 single correction) elsewhere. */
export function maxCorrectionsFor(moduleId: string, day: number): number {
  return isMultiCorrectionPilot(moduleId, day) ? MULTI_CORRECTION_MAX.basic : 0;
}

export const FINAL_AUDIO_COACH_VERSION_V2 = "v2";
export const FINAL_AUDIO_COACH_VERSION_PILOT = "v3-pilot";

/** Durable cache/rubric version per request: pilot day only gets its own version, nothing else is invalidated. */
export function coachVersionFor(moduleId: string, day: number): string {
  return isMultiCorrectionPilot(moduleId, day) ? FINAL_AUDIO_COACH_VERSION_PILOT : FINAL_AUDIO_COACH_VERSION_V2;
}

/** Compact bilingual feedback returned by the single backend LLM call (v2 adds ONE grounded correction). */
export type FinalAudioCoachFeedback = {
  taskCompleted: boolean;
  targetLanguage: FinalAudioCoachRating;
  organization: FinalAudioCoachRating;
  strengthEn: string;
  strengthEs: string;
  nextStepEn: string;
  nextStepEs: string;
  /** At most one specific correction; when false every field below is null. */
  correctionNeeded: boolean;
  /** Short phrase the learner ACTUALLY said (server-verified against the transcript). */
  said: string | null;
  betterVersion: string | null;
  whyEn: string | null;
  whyEs: string | null;
  practicePhrase: string | null;
  /**
   * Multi-correction pilot only: 0–3 prioritized grounded corrections from the
   * SAME LLM response. Absent/empty on v2 days. corrections[0] mirrors the primary fields.
   */
  corrections?: FinalAudioCoachCorrection[];
};

/** Public JSON shapes of POST /api/final-audio-coach the UI cares about. */
export type FinalAudioCoachResponse =
  | {
      status: "ready";
      feedback: FinalAudioCoachFeedback;
      /** Pilot only, transient: fresh analysis → full text; cache replay → null; v2 days → absent. Never persisted. */
      transcript?: string | null;
    }
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
  | { status: "ready"; feedback: FinalAudioCoachFeedback; transcript?: string | null }
  | { status: "unclear" }
  | { status: "unavailable" };
