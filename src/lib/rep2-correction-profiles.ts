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
 * A profile never enables rollout by itself; see the ROLLOUT section.
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
   * Lightweight, deterministic word-form checks applied to a single
   * REPLACEMENT (target word ↔ learner word). When exactly one replacement in
   * the attempt satisfies a check, that target word becomes the focus even if
   * small unrelated differences exist. No morphology engine — only obvious,
   * high-confidence surface relationships (e.g. work → works).
   */
  formChecks?: Array<(targetWord: string, learnerWord: string) => boolean>;
  /**
   * If the attempt has MORE differences than this, never name a specific
   * focus — the learner clearly said something else, so show the full target.
   * Unset = no cap (configured structures always win).
   */
  maxMismatchesForFocus?: number;
  /**
   * Fraction of target words that may differ while still qualifying as GOOD.
   * The engine additionally hard-caps this at 2 differences and never forgives
   * protected words (not / would / was …) or configured focus structures.
   *
   * undefined / 0 = exact match only.
   *
   * BASIC profiles do not use this and therefore retain current behavior.
   */
  maxWordErrorRateForGood?: number;
  /**
   * When false the engine never names a specific word — it always falls back
   * to showing the whole target. Useful for staged QA of a new module.
   */
  allowSpecificFocus: boolean;
};

/* ----------------------------- form checks -------------------------------- */

/** Obvious third-person -s / -es / -ies relationship: work→works, go→goes, study→studies. */
export function isThirdPersonSForm(targetWord: string, learnerWord: string): boolean {
  if (targetWord === learnerWord || learnerWord.length < 2) return false;
  return (
    targetWord === `${learnerWord}s` ||
    targetWord === `${learnerWord}es` ||
    (learnerWord.endsWith("y") && targetWord === `${learnerWord.slice(0, -1)}ies`)
  );
}

/* ------------------------------- profiles --------------------------------- */

/** No pedagogy: only an obvious single isolated difference may become a focus. */
export const GENERIC_PROFILE: Rep2CorrectionProfile = {
  moduleId: "generic",
  focusRules: [],
  allowSpecificFocus: true,
};

/**
 * BASIC ZERO. Curriculum audit: introductions (name / age / origin / favourite
 * things / hobbies). Repeated structures: am · is · are · have/has · like/likes.
 * Deliberately tiny: anything more complex shows the full target.
 */
export const BASIC_ZERO_PROFILE: Rep2CorrectionProfile = {
  moduleId: "basic-zero",
  allowSpecificFocus: true,
  maxMismatchesForFocus: 3,
  focusRules: [
    { phrase: ["am"], label: "AM" },
    { phrase: ["is"], label: "IS" },
    { phrase: ["are"], label: "ARE" },
    { phrase: ["has"], label: "HAS" },
    { phrase: ["have"], label: "HAVE" },
    { phrase: ["likes"], label: "LIKES" },
    { phrase: ["like"], label: "LIKE" },
  ],
};

/**
 * BASIC 1 · FUTURE. Priority mirrors the original MVP (am → going → to → not → will)
 * so the QA'd Day 1–2 behaviour is unchanged. "to" directly after "going" is
 * shown as the short phrase "going TO".
 */
export const SIMPLE_FUTURE_PROFILE: Rep2CorrectionProfile = {
  moduleId: "simple-future",
  allowSpecificFocus: true,
  focusRules: [
    { phrase: ["am"], label: "AM" },
    { phrase: ["is"], label: "IS" },
    { phrase: ["are"], label: "ARE" },
    { phrase: ["going"], label: "GOING" },
    { phrase: ["going", "to"], trigger: ["to"], label: "going TO" },
    { phrase: ["to"], label: "TO" },
    { phrase: ["not"], label: "NOT" },
    { phrase: ["will"], label: "WILL" },
  ],
};

/**
 * BASIC 2 · PRESENT. Curriculum audit: routines, do/does questions and
 * negatives, third-person -s (works, starts, has). Contractions are expanded
 * before comparison, so "doesn't" ≡ "does not".
 */
export const SIMPLE_PRESENT_PROFILE: Rep2CorrectionProfile = {
  moduleId: "simple-present",
  allowSpecificFocus: true,
  focusRules: [
    { phrase: ["does", "not"], trigger: ["does"], label: "DOES NOT" },
    { phrase: ["does"], label: "DOES" },
    { phrase: ["do", "not"], trigger: ["do"], label: "DO NOT" },
    { phrase: ["do"], label: "DO" },
    { phrase: ["not"], label: "NOT" },
  ],
  formChecks: [isThirdPersonSForm],
};

/**
 * BASIC 3 · PAST. Curriculum audit: was/were, did questions and negatives,
 * regular and irregular past verbs. Past-verb slips (go → went) are caught by
 * the generic "one obvious isolated difference" tier — no verb dictionary.
 */
export const PAST_STORIES_PROFILE: Rep2CorrectionProfile = {
  moduleId: "past-stories",
  allowSpecificFocus: true,
  focusRules: [
    { phrase: ["did", "not"], trigger: ["did"], label: "DID NOT" },
    { phrase: ["did"], label: "DID" },
    { phrase: ["was"], label: "WAS" },
    { phrase: ["were"], label: "WERE" },
    { phrase: ["not"], label: "NOT" },
  ],
};

/**
 * BASIC 4 · MIXED. Intentionally conservative: no grammar guessing. Only an
 * exact/equivalent match (GOOD) or ONE obvious isolated difference gets a
 * focus; anything else shows the complete target.
 */
export const MIXED_TENSES_PROFILE: Rep2CorrectionProfile = {
  moduleId: "mixed-tenses",
  allowSpecificFocus: true,
  focusRules: [],
};

/**
 * EAGLES / TIGERS / SHARKS / ADVANCED. STEP 2 is still COPY: reproduce a known
 * model. No grammar pedagogy — only deterministic comparison with a small,
 * hard-capped tolerance for one or two harmless differences on long chunks.
 * Protected words (not / would / will …) are never forgiven; see rep2-match.ts.
 */
function higherLevelProfile(moduleId: ModuleId): Rep2CorrectionProfile {
  return {
    moduleId,
    allowSpecificFocus: true,
    focusRules: [],
    maxMismatchesForFocus: 2,
    maxWordErrorRateForGood: 0.08,
  };
}

export const EAGLES_PROFILE: Rep2CorrectionProfile = higherLevelProfile("eagles-week-1");
export const TIGERS_PROFILE: Rep2CorrectionProfile = higherLevelProfile("tigers");
export const SHARKS_PROFILE: Rep2CorrectionProfile = higherLevelProfile("sharks");
export const ADVANCED_1_PROFILE: Rep2CorrectionProfile = higherLevelProfile("advanced-1");
export const ADVANCED_2_PROFILE: Rep2CorrectionProfile = higherLevelProfile("advanced-2");

/**
 * Profiles that exist. Adding an entry here does NOT enable the feature for
 * that module — rollout is decided separately below.
 */
const PROFILES: Partial<Record<ModuleId, Rep2CorrectionProfile>> = {
  "basic-zero": BASIC_ZERO_PROFILE,
  "simple-future": SIMPLE_FUTURE_PROFILE,
  "simple-present": SIMPLE_PRESENT_PROFILE,
  "past-stories": PAST_STORIES_PROFILE,
  "mixed-tenses": MIXED_TENSES_PROFILE,
  "eagles-week-1": EAGLES_PROFILE,
  tigers: TIGERS_PROFILE,
  sharks: SHARKS_PROFILE,
  "advanced-1": ADVANCED_1_PROFILE,
  "advanced-2": ADVANCED_2_PROFILE,
};

export function getRep2CorrectionProfile(moduleId: ModuleId | string): Rep2CorrectionProfile {
  return PROFILES[moduleId as ModuleId] ?? GENERIC_PROFILE;
}

/* ------------------------------ ROLLOUT ---------------------------------- */

/**
 * Modules where Rep 2 spoken correction is rolled out: all nine implemented
 * modules — the five BASIC modules plus Eagles, Tigers, Sharks and Advanced.
 *
 * The complete rule (module + real day + valid Rep 2 chunk) lives in
 * `isRep2CorrectionEnabled` (rep-structure.ts), shared by the Practice screen
 * and the `/api/rep2-correction` server guard.
 */
const ROLLOUT_MODULES: ReadonlySet<ModuleId> = new Set<ModuleId>([
  "basic-zero",
  "simple-future",
  "simple-present",
  "past-stories",
  "mixed-tenses",
  "eagles-week-1",
  "tigers",
  "sharks",
  "advanced-1",
  "advanced-2",
]);

export function hasRep2CorrectionRollout(moduleId: ModuleId | string): boolean {
  return ROLLOUT_MODULES.has(moduleId as ModuleId);
}
