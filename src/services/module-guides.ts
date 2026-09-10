import type { CourseDay, ModuleId } from "@/lib/types";
import type { ReviewGuideCard } from "@/lib/review-types";
import { SIMPLE_PRESENT_GUIDE } from "./review/simple-present-guide";
import { PRESENT_PROGRESSIVE_GUIDE } from "./review/present-progressive-guide";
import { SIMPLE_PAST_GUIDE } from "./review/simple-past-guide";
import { PAST_PROGRESSIVE_GUIDE } from "./review/past-progressive-guide";
import { SIMPLE_FUTURE_GUIDE } from "./review/simple-future-guide";
import { PRESENT_PERFECT_GUIDE } from "./review/present-perfect-guide";
import { PRESENT_PERFECT_PROGRESSIVE_GUIDE } from "./review/present-perfect-progressive-guide";
import { COMPARATIVES_GUIDE } from "./review/comparatives-guide";
import { MODALS_GUIDE } from "./review/modals-guide";
import { USED_TO_GUIDE } from "./review/used-to-guide";
import { PAST_PERFECT_GUIDE } from "./review/past-perfect-guide";
import { MODAL_PERFECTS_GUIDE } from "./review/modal-perfects-guide";

/**
 * ENTIÉNDELO FÁCIL — grammar guide attached to each module day.
 *
 * The cards are reused verbatim from the Review guides so learners see the
 * same explanations whether they study in Review or inside a module.
 * Basic Zero has no formal grammar guide (its intro stays as-is).
 */

/** Keep the card count reasonable on mixed-tense days. */
const MIXED_CARD_LIMIT = 4;

function pick(ids: string[], guide: ReviewGuideCard[]): ReviewGuideCard[] {
  return ids.map((id) => guide.find((c) => c.id === id)).filter(Boolean) as ReviewGuideCard[];
}

function take(guide: ReviewGuideCard[], n: number): ReviewGuideCard[] {
  return guide.slice(0, n);
}

const MIXED_TENSES_GUIDE: ReviewGuideCard[] = [
  ...pick(["g1-use", "g4-negative", "g5-questions"], SIMPLE_PRESENT_GUIDE),
  ...pick(["sp-past-1-use", "sp-past-4-negative", "sp-past-5-questions"], SIMPLE_PAST_GUIDE),
  ...pick(["sf-1-use", "sf-2-going-to", "sf-3-will"], SIMPLE_FUTURE_GUIDE),
];

function matches(text: string, ...terms: string[]): boolean {
  const t = text.toLowerCase();
  return terms.some((term) => t.includes(term));
}

function byKeyword(day: CourseDay): ReviewGuideCard[] | undefined {
  const f = `${day.focus} ${day.topic}`;

  if (matches(f, "modal perfect")) return MODAL_PERFECTS_GUIDE;
  if (matches(f, "past perfect")) return PAST_PERFECT_GUIDE;
  if (matches(f, "present perfect progressive")) return PRESENT_PERFECT_PROGRESSIVE_GUIDE;
  if (matches(f, "present perfect")) return PRESENT_PERFECT_GUIDE;
  if (matches(f, "past progressive")) return PAST_PROGRESSIVE_GUIDE;
  if (matches(f, "present progressive")) return PRESENT_PROGRESSIVE_GUIDE;
  if (matches(f, "used to")) return USED_TO_GUIDE;

  if (matches(f, "simple past", "pasado simple", "happened", "experience", "story", "incident", "what happened")) {
    return SIMPLE_PAST_GUIDE;
  }

  if (matches(f, "simple present review", "simple present", "routines", "habits", "everyday life")) {
    return SIMPLE_PRESENT_GUIDE;
  }

  if (matches(f, "future", "predict", "plan", "going to", "will ", "tomorrow")) {
    return SIMPLE_FUTURE_GUIDE;
  }

  if (matches(f, "comparative", "superlative", "compare", "option a", "option b", "trade-off")) {
    return COMPARATIVES_GUIDE;
  }

  if (matches(f, "modal", "should", "could", "would", "might", "must", "advice", "advise", "recommend", "if i were you")) {
    return MODALS_GUIDE;
  }

  return undefined;
}

function forMixedTenses(day: CourseDay): ReviewGuideCard[] | undefined {
  const f = `${day.focus} ${day.topic}`;

  if (matches(f, "present", "everyday", "routine")) return SIMPLE_PRESENT_GUIDE;
  if (matches(f, "past", "yesterday", "happened")) return SIMPLE_PAST_GUIDE;
  if (matches(f, "future", "tomorrow", "plan")) return SIMPLE_FUTURE_GUIDE;
  if (matches(f, "question")) return [...SIMPLE_PRESENT_GUIDE, ...SIMPLE_PAST_GUIDE, ...SIMPLE_FUTURE_GUIDE];

  // Week 4 / mixed conversation: concise reference cards from all three tenses.
  return take(MIXED_TENSES_GUIDE, MIXED_CARD_LIMIT);
}

export function guideCardsForDay(moduleId: ModuleId, day: CourseDay): ReviewGuideCard[] | undefined {
  switch (moduleId) {
    case "basic-zero":
      // No formal grammar guide: the module builds spoken chunks directly.
      return undefined;

    case "simple-present":
      return SIMPLE_PRESENT_GUIDE;

    case "simple-future":
      return SIMPLE_FUTURE_GUIDE;

    case "past-stories":
      return SIMPLE_PAST_GUIDE;

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
