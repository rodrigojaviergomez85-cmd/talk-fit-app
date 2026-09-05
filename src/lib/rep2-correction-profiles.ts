import type { ModuleId } from "@/lib/types";

/**
 * Module-specific PEDAGOGY for the spoken-correction engine.
 *
 * The generic diff engine (`rep2-match.ts`) knows nothing about grammar. A
 * profile tells it which target structures are worth turning into the ONE
 * correction focus when the learner drops or changes them.
 *
 * Two separate concepts — keep them separate:
 *   PROFILE EXISTS  → we know how to prioritise corrections for a module.
 *   FEATURE ENABLED → the learner actually receives spoken correction.
 * A profile never enables rollout by itself; see `isRep2CorrectionEnabledFor`.
 */

/**
 * One high-value structure, expressed as a short contiguous token sequence in
 * the NORMALIZED target (lower-case, contractions expanded, numbers as words).
 *
 * Examples: ["to"], ["going", "to"], ["do", "not"], ["was"].
 */
export type CorrectionFocusRule = {
  /** Contiguous target tokens that form the structure. */
  phrase: string[];
  /**
   * Which tokens of the phrase, when dropped/changed by the learner, trigger
   * this rule. Defaults to every token in `phrase`.
   */
  trigger?: string[];
  /**
   * Label shown/highlighted to the learner. Defaults to the phrase in upper
   * case. Keep it a substring of the natural target text where possible so the
   * UI can highlight it (e.g. "going TO").
   */
  label?: string;
};

export type Rep2CorrectionProfile = {
  moduleId: ModuleId | "generic";
  /**
   * Rules in PRIORITY order. The first rule whose structure exists in the
   * target and whose trigger token the learner missed becomes the focus.
   */
  focusRules: CorrectionFocusRule[];
  /**
   * When false the engine never names a specific word — it always falls back
   * to showing the whole target. Useful for staged QA of a new module.
   */
  allowSpecificFocus: boolean;
};

/** No pedagogy: only an obvious single isolated difference may become a focus. */
export const GENERIC_PROFILE: Rep2CorrectionProfile = {
  moduleId: "generic",
  focusRules: [],
  allowSpecificFocus: true,
};

/**
 * BASIC 1 · FUTURE. Priority mirrors the original MVP (am → going → to → not → will)
 * so Day 1–2 behaviour is unchanged. "to" directly after "going" is shown as
 * the short phrase "going TO".
 */
export const SIMPLE_FUTURE_PROFILE: Rep2CorrectionProfile = {
  moduleId: "simple-future",
  allowSpecificFocus: true,
  focusRules: [
    { phrase: ["am"], label: "AM" },
    { phrase: ["going"], label: "GOING" },
    { phrase: ["going", "to"], trigger: ["to"], label: "going TO" },
    { phrase: ["to"], label: "TO" },
    { phrase: ["not"], label: "NOT" },
    { phrase: ["will"], label: "WILL" },
  ],
};

/**
 * Profiles that exist. Adding an entry here does NOT enable the feature for
 * that module — rollout is decided separately below.
 * Prompt 2 will add and QA profiles for the other Basic modules.
 */
const PROFILES: Partial<Record<ModuleId, Rep2CorrectionProfile>> = {
  "simple-future": SIMPLE_FUTURE_PROFILE,
};

export function getRep2CorrectionProfile(moduleId: ModuleId | string): Rep2CorrectionProfile {
  return PROFILES[moduleId as ModuleId] ?? GENERIC_PROFILE;
}

/* ------------------------------ ROLLOUT ---------------------------------- */

/**
 * The ONE authoritative rollout rule, shared by the Practice screen and the
 * `/api/rep2-correction` server guard. Currently: BASIC 1 · FUTURE, Days 1–2 only.
 */
const ROLLOUT: Partial<Record<ModuleId, ReadonlySet<number>>> = {
  "simple-future": new Set([1, 2]),
};

/** Does any day of this module have spoken correction rolled out? */
export function hasRep2CorrectionRollout(moduleId: ModuleId | string): boolean {
  return (ROLLOUT[moduleId as ModuleId]?.size ?? 0) > 0;
}

export function isRep2CorrectionEnabledFor(moduleId: ModuleId | string, day: number): boolean {
  return ROLLOUT[moduleId as ModuleId]?.has(day) ?? false;
}
