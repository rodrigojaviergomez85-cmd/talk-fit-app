import type { CourseDay, ModuleId } from "@/lib/types";
import type { ReviewGuideCard, ReviewModule } from "@/lib/review-types";
import { SIMPLE_PRESENT_GUIDE, SIMPLE_PRESENT_COMMON_ERRORS } from "./review/simple-present-guide";
import { PRESENT_PROGRESSIVE_GUIDE, PRESENT_PROGRESSIVE_COMMON_ERRORS } from "./review/present-progressive-guide";
import { SIMPLE_PAST_GUIDE, SIMPLE_PAST_COMMON_ERRORS } from "./review/simple-past-guide";
import { PAST_PROGRESSIVE_GUIDE, PAST_PROGRESSIVE_COMMON_ERRORS } from "./review/past-progressive-guide";
import { SIMPLE_FUTURE_GUIDE, SIMPLE_FUTURE_COMMON_ERRORS } from "./review/simple-future-guide";
import { PRESENT_PERFECT_GUIDE, PRESENT_PERFECT_COMMON_ERRORS } from "./review/present-perfect-guide";
import {
  PRESENT_PERFECT_PROGRESSIVE_GUIDE,
  PRESENT_PERFECT_PROGRESSIVE_COMMON_ERRORS,
} from "./review/present-perfect-progressive-guide";
import { COMPARATIVES_GUIDE, COMPARATIVES_COMMON_ERRORS } from "./review/comparatives-guide";
import { MODALS_GUIDE, MODALS_COMMON_ERRORS } from "./review/modals-guide";
import { USED_TO_GUIDE, USED_TO_COMMON_ERRORS } from "./review/used-to-guide";
import { PAST_PERFECT_GUIDE, PAST_PERFECT_COMMON_ERRORS } from "./review/past-perfect-guide";
import { MODAL_PERFECTS_GUIDE, MODAL_PERFECTS_COMMON_ERRORS } from "./review/modal-perfects-guide";

/**
 * ENTIÉNDELO FÁCIL — grammar guide attached to each module day.
 *
 * The cards and the "errores típicos" list are reused verbatim from the Review
 * guides so learners see the same explanations whether they study in Review or
 * inside a module. Basic Zero has no formal grammar guide (its intro stays as-is).
 */

export type GuideErrors = ReviewModule["commonErrors"];

export type DayGuide = { title: string; titleEs: string; cards: ReviewGuideCard[]; errors: GuideErrors };

/** Keep the card count reasonable on mixed-tense days. */
const MIXED_CARD_LIMIT = 4;
/** Keep the mistake list short when several tenses are combined. */
const MIXED_ERROR_LIMIT = 6;

const SIMPLE_PRESENT: DayGuide = {
  title: "Simple Present",
  titleEs: "Presente Simple",
  cards: SIMPLE_PRESENT_GUIDE,
  errors: SIMPLE_PRESENT_COMMON_ERRORS,
};
const SIMPLE_PAST: DayGuide = {
  title: "Simple Past",
  titleEs: "Pasado Simple",
  cards: SIMPLE_PAST_GUIDE,
  errors: SIMPLE_PAST_COMMON_ERRORS,
};
const SIMPLE_FUTURE: DayGuide = {
  title: "Simple Future",
  titleEs: "Futuro Simple",
  cards: SIMPLE_FUTURE_GUIDE,
  errors: SIMPLE_FUTURE_COMMON_ERRORS,
};
const PRESENT_PROGRESSIVE: DayGuide = {
  title: "Present Progressive",
  titleEs: "Presente Progresivo",
  cards: PRESENT_PROGRESSIVE_GUIDE,
  errors: PRESENT_PROGRESSIVE_COMMON_ERRORS,
};
const PAST_PROGRESSIVE: DayGuide = {
  title: "Past Progressive",
  titleEs: "Pasado Progresivo",
  cards: PAST_PROGRESSIVE_GUIDE,
  errors: PAST_PROGRESSIVE_COMMON_ERRORS,
};
const PRESENT_PERFECT: DayGuide = {
  title: "Present Perfect",
  titleEs: "Presente Perfecto",
  cards: PRESENT_PERFECT_GUIDE,
  errors: PRESENT_PERFECT_COMMON_ERRORS,
};
const PRESENT_PERFECT_PROGRESSIVE: DayGuide = {
  title: "Present Perfect Progressive",
  titleEs: "Presente Perfecto Progresivo",
  cards: PRESENT_PERFECT_PROGRESSIVE_GUIDE,
  errors: PRESENT_PERFECT_PROGRESSIVE_COMMON_ERRORS,
};
const COMPARATIVES: DayGuide = {
  title: "Comparatives & Superlatives",
  titleEs: "Comparativos y Superlativos",
  cards: COMPARATIVES_GUIDE,
  errors: COMPARATIVES_COMMON_ERRORS,
};
const MODALS: DayGuide = {
  title: "Modals",
  titleEs: "Modales",
  cards: MODALS_GUIDE,
  errors: MODALS_COMMON_ERRORS,
};
const USED_TO: DayGuide = {
  title: "Used to",
  titleEs: "Used to",
  cards: USED_TO_GUIDE,
  errors: USED_TO_COMMON_ERRORS,
};
const PAST_PERFECT: DayGuide = {
  title: "Past Perfect",
  titleEs: "Pasado Perfecto",
  cards: PAST_PERFECT_GUIDE,
  errors: PAST_PERFECT_COMMON_ERRORS,
};
const MODAL_PERFECTS: DayGuide = {
  title: "Modal Perfects",
  titleEs: "Modales Perfectos",
  cards: MODAL_PERFECTS_GUIDE,
  errors: MODAL_PERFECTS_COMMON_ERRORS,
};

function pick(ids: string[], guide: ReviewGuideCard[]): ReviewGuideCard[] {
  return ids.map((id) => guide.find((c) => c.id === id)).filter(Boolean) as ReviewGuideCard[];
}

function take<T>(items: T[], n: number): T[] {
  return items.slice(0, n);
}

const MIXED_ERRORS: GuideErrors = take(
  [...SIMPLE_PRESENT_COMMON_ERRORS, ...SIMPLE_PAST_COMMON_ERRORS, ...SIMPLE_FUTURE_COMMON_ERRORS],
  MIXED_ERROR_LIMIT,
);

const MIXED_TENSES_CARDS: ReviewGuideCard[] = [
  ...pick(["g1-use", "g4-negative", "g5-questions"], SIMPLE_PRESENT_GUIDE),
  ...pick(["sp-past-1-use", "sp-past-4-negative", "sp-past-5-questions"], SIMPLE_PAST_GUIDE),
  ...pick(["sf-1-use", "sf-2-going-to", "sf-3-will"], SIMPLE_FUTURE_GUIDE),
];

function matches(text: string, ...terms: string[]): boolean {
  const t = text.toLowerCase();
  return terms.some((term) => t.includes(term));
}

function byKeyword(day: CourseDay): DayGuide | undefined {
  const f = `${day.focus} ${day.topic}`;

  if (matches(f, "modal perfect")) return MODAL_PERFECTS;
  if (matches(f, "past perfect")) return PAST_PERFECT;
  if (matches(f, "present perfect progressive")) return PRESENT_PERFECT_PROGRESSIVE;
  if (matches(f, "present perfect")) return PRESENT_PERFECT;
  if (matches(f, "past progressive")) return PAST_PROGRESSIVE;
  if (matches(f, "present progressive")) return PRESENT_PROGRESSIVE;
  if (matches(f, "used to")) return USED_TO;

  if (matches(f, "simple past", "pasado simple", "happened", "experience", "story", "incident", "what happened")) {
    return SIMPLE_PAST;
  }

  if (matches(f, "simple present review", "simple present", "routines", "habits", "everyday life")) {
    return SIMPLE_PRESENT;
  }

  if (matches(f, "future", "predict", "plan", "going to", "will ", "tomorrow")) {
    return SIMPLE_FUTURE;
  }

  if (matches(f, "comparative", "superlative", "compare", "option a", "option b", "trade-off")) {
    return COMPARATIVES;
  }

  if (matches(f, "modal", "should", "could", "would", "might", "must", "advice", "advise", "recommend", "if i were you")) {
    return MODALS;
  }

  return undefined;
}

function forMixedTenses(day: CourseDay): DayGuide | undefined {
  const f = `${day.focus} ${day.topic}`;

  if (matches(f, "present", "everyday", "routine")) return SIMPLE_PRESENT;
  if (matches(f, "past", "yesterday", "happened")) return SIMPLE_PAST;
  if (matches(f, "future", "tomorrow", "plan")) return SIMPLE_FUTURE;
  if (matches(f, "question")) {
    return {
      cards: [...SIMPLE_PRESENT_GUIDE, ...SIMPLE_PAST_GUIDE, ...SIMPLE_FUTURE_GUIDE],
      errors: MIXED_ERRORS,
    };
  }

  // Week 4 / mixed conversation: concise reference cards from all three tenses.
  return { cards: take(MIXED_TENSES_CARDS, MIXED_CARD_LIMIT), errors: MIXED_ERRORS };
}

export function guideForDay(moduleId: ModuleId, day: CourseDay): DayGuide | undefined {
  switch (moduleId) {
    case "basic-zero":
      // No formal grammar guide: the module builds spoken chunks directly.
      return undefined;

    case "simple-present":
      return SIMPLE_PRESENT;

    case "simple-future":
      return SIMPLE_FUTURE;

    case "past-stories":
      return SIMPLE_PAST;

    case "mixed-tenses":
      return forMixedTenses(day);

    case "eagles-week-1":
    case "tigers":
    case "sharks":
    case "advanced-1":
    case "advanced-2":
    case "advanced-3":
      return byKeyword(day);

    default: {
      const _exhaustive: never = moduleId;
      return undefined;
    }
  }
}

export function guideCardsForDay(moduleId: ModuleId, day: CourseDay): ReviewGuideCard[] | undefined {
  return guideForDay(moduleId, day)?.cards;
}

export function guideErrorsForDay(moduleId: ModuleId, day: CourseDay): GuideErrors | undefined {
  return guideForDay(moduleId, day)?.errors;
}
