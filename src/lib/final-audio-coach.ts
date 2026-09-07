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

export type CoachCorrectionCategory =
  | "task_relevance"
  | "verb_tense"
  | "grammar"
  | "word_choice"
  | "naturalness"
  | "connector"
  | "repetition"
  | "development";
/** Listed in the pilot's teaching priority order (relevance → target tense → … → development). */
export const CORRECTION_CATEGORIES: readonly CoachCorrectionCategory[] = [
  "task_relevance",
  "verb_tense",
  "grammar",
  "word_choice",
  "naturalness",
  "connector",
  "repetition",
  "development",
];

export type AnsweredTask = "yes" | "partly" | "no";

/** ONE short "sound more fluent" upgrade: `original` is a real fragment of the transcript. */
export type FinalAudioCoachFluencyUpgrade = { original: string; improved: string };

/** Another grounded occurrence of the SAME reusable rule as its parent correction. */
export type FinalAudioCoachRelatedOccurrence = { said: string; betterVersion: string };

/** Max extra occurrences shown under one correction ("also applies to"). Never a new slot. */
export const MAX_RELATED_OCCURRENCES = 2;

/** One prioritized, transcript-grounded correction (server-validated). */
export type FinalAudioCoachCorrection = {
  category: CoachCorrectionCategory;
  said: string;
  betterVersion: string;
  whyEn: string;
  whyEs: string;
  /**
   * Repeats of the SAME rule, grouped under this correction so they never
   * consume another correction slot. Absent/empty when the error happened once.
   */
  relatedOccurrences?: FinalAudioCoachRelatedOccurrence[] | undefined;
};

export type CoachLevelGroup = "basic" | "intermediate" | "advanced";

/**
 * Rollout ceilings. BASIC (max 3) and INTERMEDIATE (max 5) are live; advanced
 * keeps the v2 single-correction coach until its own rollout.
 */
export const MULTI_CORRECTION_MAX: Record<CoachLevelGroup, number> = { basic: 3, intermediate: 5, advanced: 5 };

/** Canonical BASIC module set for the coach (single source of truth). */
export const BASIC_MODULE_IDS: ReadonlySet<string> = new Set([
  "basic-zero",
  "simple-future",
  "simple-present",
  "past-stories",
  "mixed-tenses",
]);

/** Canonical INTERMEDIATE module set for the coach (single source of truth). */
export const INTERMEDIATE_MODULE_IDS: ReadonlySet<string> = new Set(["eagles-week-1", "tigers", "sharks"]);

export function isBasicCoachModule(moduleId: string): boolean {
  return BASIC_MODULE_IDS.has(moduleId);
}

export function isIntermediateCoachModule(moduleId: string): boolean {
  return INTERMEDIATE_MODULE_IDS.has(moduleId);
}

/** Level group of a coach module, or null when it is not rolled out (Advanced). */
export function coachLevelGroupFor(moduleId: string): CoachLevelGroup | null {
  if (isBasicCoachModule(moduleId)) return "basic";
  if (isIntermediateCoachModule(moduleId)) return "intermediate";
  return null;
}

/** Multi-correction gate — every day of every BASIC and INTERMEDIATE module. Advanced keeps v2. */
export function isMultiCorrectionPilot(moduleId: string, day: number): boolean {
  return coachLevelGroupFor(moduleId) !== null && Number.isInteger(day) && day > 0;
}

/** Max corrections the coach may return: 3 on BASIC, 5 on INTERMEDIATE, 0 (= v2) elsewhere. */
export function maxCorrectionsFor(moduleId: string, day: number): number {
  if (!isMultiCorrectionPilot(moduleId, day)) return 0;
  return MULTI_CORRECTION_MAX[coachLevelGroupFor(moduleId) as CoachLevelGroup];
}

export const FINAL_AUDIO_COACH_VERSION_V2 = "v2";
/** v3.2: multi-correction coach for every BASIC day (answeredTask, repetition/task_relevance, fluencyUpgrade). */
export const FINAL_AUDIO_COACH_VERSION_PILOT = "v3.2-basic";
/** v3.3: same compact coach for every INTERMEDIATE day, up to 5 adaptive corrections. */
export const FINAL_AUDIO_COACH_VERSION_INTERMEDIATE = "v3.3-intermediate";

/** Durable cache/rubric version per request; scoped per level so other levels are never invalidated. */
export function coachVersionFor(moduleId: string, day: number): string {
  if (!isMultiCorrectionPilot(moduleId, day)) return FINAL_AUDIO_COACH_VERSION_V2;
  return coachLevelGroupFor(moduleId) === "intermediate"
    ? FINAL_AUDIO_COACH_VERSION_INTERMEDIATE
    : FINAL_AUDIO_COACH_VERSION_PILOT;
}

/** Optional ONE retake (bonus improvement round) — still the original pilot only: BASIC 3 · Day 1. */
export function isRetakePilot(moduleId: string, day: number): boolean {
  return moduleId === "past-stories" && day === 1;
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
  /** Pilot only: did the learner answer TODAY'S exact question? Absent on v2 days. */
  answeredTask?: AnsweredTask | undefined;
  /** Pilot only: one short grounded "more fluent" upgrade (same LLM response). Null when none. */
  fluencyUpgrade?: FinalAudioCoachFluencyUpgrade | null | undefined;
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
  | { status: "rate_limited" }
  | { status: "unavailable" };

/* ------------------------------------------------------------------------ */
/*  Optional retake (pilot) — public shapes                                  */
/* ------------------------------------------------------------------------ */

/** What a retake claim refers to: a previous correction (by its category) or the previous development advice. */
export type RetakeSkill = CoachCorrectionCategory | "next_step" | "fluency_upgrade";
export const RETAKE_SKILLS: readonly RetakeSkill[] = [...CORRECTION_CATEGORIES, "next_step", "fluency_upgrade"];

export type RetakeApplied = {
  skill: RetakeSkill;
  /** Server-verified: true only when the retake transcript actually supports it. */
  applied: boolean;
  messageEn: string;
  messageEs: string;
};

/** Compact retake evaluation ("did they apply the previous feedback?"). Never contains the transcript. */
export type FinalCoachRetakeResult = {
  applied: RetakeApplied[];
  improvementEn: string;
  improvementEs: string;
  nextEn: string;
  nextEs: string;
};

export type FinalCoachRetakeResponse =
  | { status: "ready"; result: FinalCoachRetakeResult }
  | { status: "unclear" }
  | { status: "pending" }
  | { status: "already_used" }
  | { status: "no_feedback" }
  | { status: "not_available" }
  | { status: "error"; code?: string }
  | { status: "audio_too_large" }
  | { status: "rate_limited" };

/**
 * Learner-facing retake state (session only).
 * `retryable` = a TECHNICAL failure (provider/network) on the recording already made:
 * the same in-memory blob may be re-sent for comparison. It is never a second recording.
 */
export type FinalCoachRetakeState =
  | { status: "idle" }
  | { status: "recording" }
  | { status: "analyzing" }
  | { status: "ready"; result: FinalCoachRetakeResult }
  | { status: "unclear" }
  | { status: "retryable" }
  | { status: "unavailable" };
