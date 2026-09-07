/**
 * Centralized learner-facing labels for AI Coach corrections.
 *
 * Internal categories (`verb_tense`, `grammar`, …) stay stable in the backend;
 * only the DISPLAY label is resolved here, using module context + the actual
 * error. A `verb_tense` correction is never labelled "PASADO" just because the
 * pilot started in Basic 3 — the module and the corrected sentence decide.
 */
import { isIntermediateCoachModule, type CoachCorrectionCategory } from "./final-audio-coach";

export type CorrectionLabelInput = {
  category: CoachCorrectionCategory;
  moduleId?: string | undefined;
  said?: string | undefined;
  betterVersion?: string | undefined;
  showEs: boolean;
};

type TenseLabel = "future" | "past" | "present" | "generic";

const FIXED_ES: Record<Exclude<CoachCorrectionCategory, "verb_tense">, string> = {
  task_relevance: "⚠️ RESPONDE LA PREGUNTA",
  grammar: "GRAMÁTICA",
  word_choice: "PALABRAS",
  naturalness: "MÁS NATURAL",
  connector: "CONEXIÓN",
  repetition: "VARÍA TU INGLÉS",
  development: "DESARROLLO",
};

const FIXED_EN: Record<Exclude<CoachCorrectionCategory, "verb_tense">, string> = {
  task_relevance: "⚠️ ANSWER THE QUESTION",
  grammar: "GRAMMAR",
  word_choice: "WORD CHOICE",
  naturalness: "NATURAL ENGLISH",
  connector: "CONNECTION",
  repetition: "ADD VARIETY",
  development: "DEVELOPMENT",
};

/**
 * INTERMEDIATE wording (Eagles / Tigers / Sharks). Same internal categories;
 * only the display copy is more action-oriented at this level. BASIC keeps its
 * approved labels unchanged.
 */
const INTERMEDIATE_ES: Partial<Record<CoachCorrectionCategory, string>> = {
  naturalness: "INGLÉS NATURAL",
  connector: "CONECTA TUS IDEAS",
  development: "DESARROLLA MÁS",
};

const INTERMEDIATE_EN: Partial<Record<CoachCorrectionCategory, string>> = {
  naturalness: "NATURAL ENGLISH",
  connector: "CONNECT YOUR IDEAS",
  development: "DEVELOP MORE",
};

const TENSE_ES: Record<TenseLabel, string> = {
  future: "FUTURO",
  past: "PASADO",
  present: "PRESENTE",
  generic: "TIEMPO VERBAL",
};

const TENSE_EN: Record<TenseLabel, string> = {
  future: "FUTURE",
  past: "PAST TENSE",
  present: "PRESENT",
  generic: "VERB TENSE",
};

const IRREGULAR_PAST =
  /\b(went|woke|ate|saw|took|made|got|came|said|had|did|was|were|left|felt|found|gave|told|thought|knew|began|drove|wrote|met|bought|brought|ran|slept|spoke|read)\b/;

/**
 * Markers that reveal the VERB CONSTRUCTION the speaker actually built
 * (not merely the time they were talking about).
 */
function formTense(text: string): TenseLabel | null {
  const t = ` ${text.toLowerCase()} `;
  if (/\b(will|won't|gonna|going)\b/.test(t)) return "future";
  if (/\b(didn't|did not|did|was|were|wasn't|weren't)\b/.test(t) || IRREGULAR_PAST.test(t) || /\b\w+ed\b/.test(t)) return "past";
  if (/\b(don't|doesn't|does|do|am|is|are|'m|'s|'re)\b/.test(t)) return "present";
  return null;
}

/** Time words say WHEN the learner meant, used only when no construction marker exists. */
function timeTense(text: string): TenseLabel | null {
  const t = ` ${text.toLowerCase()} `;
  if (/\b(tomorrow|next (week|month|year|day|time)|soon|later|tonight)\b/.test(t)) return "future";
  if (/\b(yesterday|last (night|week|month|year)|ago)\b/.test(t)) return "past";
  if (/\b(every day|usually|always|often|nowadays|these days)\b/.test(t)) return "present";
  return null;
}

function moduleTense(moduleId?: string): TenseLabel | null {
  if (moduleId === "simple-future") return "future";
  if (moduleId === "simple-present") return "present";
  if (moduleId === "past-stories") return "past";
  return null; // mixed-tenses / basic-zero / others: decided by the correction itself
}

/**
 * TRUE when the learner already picked the right construction and only broke
 * its internal structure ("I'm going play" → "I'm going to play"), which is a
 * grammar problem, not a tense-choice problem.
 */
export function isStructuralTenseError(said?: string, betterVersion?: string): boolean {
  if (!said || !betterVersion) return false;
  const a = formTense(said);
  const b = formTense(betterVersion);
  return a !== null && a === b;
}

export function correctionDisplayLabel(input: CorrectionLabelInput): string {
  const { category, moduleId, said, betterVersion, showEs } = input;
  if (category !== "verb_tense") {
    if (moduleId && isIntermediateCoachModule(moduleId)) {
      const intermediate = (showEs ? INTERMEDIATE_ES : INTERMEDIATE_EN)[category];
      if (intermediate) return intermediate;
    }
    return (showEs ? FIXED_ES : FIXED_EN)[category];
  }

  if (isStructuralTenseError(said, betterVersion)) return showEs ? FIXED_ES.grammar : FIXED_EN.grammar;

  const better = betterVersion ?? "";
  const tense =
    formTense(better) ??
    timeTense(better) ??
    timeTense(said ?? "") ??
    moduleTense(moduleId) ??
    (moduleId === "basic-zero" ? null : "generic");

  if (tense === null) return showEs ? FIXED_ES.grammar : FIXED_EN.grammar;
  return (showEs ? TENSE_ES : TENSE_EN)[tense];
}
