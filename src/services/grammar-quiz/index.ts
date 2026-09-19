import { PAST_STORIES_DAY_1 } from "./past-stories-day-1";
import { PAST_STORIES_DAY_2 } from "./past-stories-day-2";
import { PAST_STORIES_DAY_3 } from "./past-stories-day-3";
import { PAST_STORIES_DAY_4 } from "./past-stories-day-4";
import { PAST_STORIES_DAY_5 } from "./past-stories-day-5";
import { PAST_STORIES_DAY_6 } from "./past-stories-day-6";
import { PAST_STORIES_DAY_7 } from "./past-stories-day-7";
import { PAST_STORIES_DAY_8 } from "./past-stories-day-8";
import { PAST_STORIES_DAY_9 } from "./past-stories-day-9";
import { PAST_STORIES_DAY_10 } from "./past-stories-day-10";
import { PAST_STORIES_DAY_11 } from "./past-stories-day-11";
import { PAST_STORIES_DAY_12 } from "./past-stories-day-12";
import { PAST_STORIES_DAY_13 } from "./past-stories-day-13";
import { PAST_STORIES_DAY_14 } from "./past-stories-day-14";
import { PAST_STORIES_DAY_15 } from "./past-stories-day-15";
import { PAST_STORIES_DAY_16 } from "./past-stories-day-16";
import { PAST_STORIES_DAY_17 } from "./past-stories-day-17";
import { PAST_STORIES_DAY_18 } from "./past-stories-day-18";
import { PAST_STORIES_DAY_19 } from "./past-stories-day-19";
import { PAST_STORIES_DAY_20 } from "./past-stories-day-20";
import type { GrammarQuiz } from "./types";

export * from "./types";

/**
 * Registro del piloto: Basic 3 (past-stories) · Semanas 1 a 4 · días 1–20.
 * Agregar más días aquí basta para extender el Paso 3 sin tocar la mecánica.
 */
export const GRAMMAR_QUIZZES: GrammarQuiz[] = [
  PAST_STORIES_DAY_1,
  PAST_STORIES_DAY_2,
  PAST_STORIES_DAY_3,
  PAST_STORIES_DAY_4,
  PAST_STORIES_DAY_5,
  PAST_STORIES_DAY_6,
  PAST_STORIES_DAY_7,
  PAST_STORIES_DAY_8,
  PAST_STORIES_DAY_9,
  PAST_STORIES_DAY_10,
  PAST_STORIES_DAY_11,
  PAST_STORIES_DAY_12,
  PAST_STORIES_DAY_13,
  PAST_STORIES_DAY_14,
  PAST_STORIES_DAY_15,
  PAST_STORIES_DAY_16,
  PAST_STORIES_DAY_17,
  PAST_STORIES_DAY_18,
  PAST_STORIES_DAY_19,
  PAST_STORIES_DAY_20,
];

export function getGrammarQuiz(moduleId: string, day: number): GrammarQuiz | undefined {
  return GRAMMAR_QUIZZES.find((q) => q.moduleId === moduleId && q.day === day);
}
