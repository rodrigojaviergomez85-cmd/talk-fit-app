/**
 * REVIEW — refuerzo independiente del curso de 11 módulos.
 *
 * Review NO es curriculum: su identidad es explícita y separada (`ReviewModuleId`)
 * para que su progreso jamás se mezcle con el `ModuleId` real "simple-present".
 * Completar o repetir Review no completa días, no desbloquea niveles y no cambia
 * el hábito de 66 días.
 */

export const REVIEW_MODULE_IDS = [
  "review-simple-present",
  "review-present-progressive",
  "review-simple-past",
  "review-past-progressive",
  "review-simple-future",
] as const;
export type ReviewModuleId = (typeof REVIEW_MODULE_IDS)[number];

export function isReviewModuleId(value: unknown): value is ReviewModuleId {
  return typeof value === "string" && (REVIEW_MODULE_IDS as readonly string[]).includes(value);
}

/** Exactly five practices per Review module. */
export const REVIEW_PRACTICE_COUNT = 5;
export type ReviewPracticeNumber = 1 | 2 | 3 | 4 | 5;

export function isReviewPracticeNumber(value: unknown): value is ReviewPracticeNumber {
  return Number.isInteger(value) && (value as number) >= 1 && (value as number) <= REVIEW_PRACTICE_COUNT;
}

/**
 * STEP 5 has exactly five audio positions:
 *  1–3 rehearsals (no transcription, no AI)
 *  4   the answer evaluated by the AI coach
 *  5   the retake bound to the feedback of audio 4 (never a sixth audio)
 */
export const REVIEW_TAKE_SLOTS = 5;
export const REVIEW_REHEARSAL_SLOTS = 3;
export const REVIEW_EVALUATED_TAKE = 4;
export const REVIEW_RETAKE_TAKE = 5;

/** Orientative speaking goal for every practice (indicator, never a grade). */
export const REVIEW_GOAL_SECONDS: [number, number] = [30, 45];
export const REVIEW_GOAL_SENTENCES = 5;

/** Grammatical person of the learner's MAIN answers. */
export type ReviewPerson = "first" | "third";

export type ReviewExample = { en: string; es: string };

/** One card of the "Entiéndelo fácil" grammar guide. */
export type ReviewGuideCard = {
  id: string;
  title: string;
  titleEs: string;
  /** Plain-Spanish explanation. */
  explanationEs: string;
  explanation: string;
  examples: ReviewExample[];
  /** Optional reference illustration for the card (static asset URL). */
  image?: { src: string; alt: string; altEs: string } | undefined;
  /** Small spoken check between cards (say it out loud, no AI). */
  check?: { promptEs: string; prompt: string; answer: string } | undefined;
};

export type ReviewLine = {
  id: string;
  text: string;
  es: string;
  chunks: string[];
};

export type ReviewQuestion = {
  id: string;
  question: string;
  questionEs: string;
  hint: string;
  hintEs: string;
};

export type ReviewPractice = {
  number: ReviewPracticeNumber;
  id: string;
  title: string;
  titleEs: string;
  /** Person of the learner's main answers: 3rd · 1st · 3rd · 1st · 3rd. */
  person: ReviewPerson;
  /** Fictional practice character, when the practice is about someone else. */
  character: string | null;
  focus: string;
  focusEs: string;
  /** Step 1 reminder (practices 2–5 open with this instead of the full guide). */
  reminder: { en: string; es: string };
  /** Full 7-card guide inline in Step 1 (practice 1 only). */
  showFullGuide: boolean;
  instructions: { en: string; es: string };
  vocabulary: string[];
  /** Eight model sentences with translation and speaking chunks. */
  lines: ReviewLine[];
  /** At least five guided questions. */
  questions: ReviewQuestion[];
  /** Practice 5: key facts instead of a full model monologue. */
  factSheet?: ReviewExample[] | undefined;
  /** Reference illustration of the scene the learner is describing (3rd person). */
  sceneImage?: { src: string; alt: string; altEs: string } | undefined;
  finalPrompt: { question: string; questionEs: string; tips: { en: string; es: string } };
  /** What the AI feedback evaluates for this practice. */
  grammarGoals: string[];
};

export type ReviewModule = {
  id: ReviewModuleId;
  label: string;
  title: string;
  titleEs: string;
  subtitle: string;
  subtitleEs: string;
  guide: ReviewGuideCard[];
  /** Module-specific typical mistakes shown at the end of the guide. */
  commonErrors: { wrong: string; right: string; es: string }[];
  practices: ReviewPractice[];
};
