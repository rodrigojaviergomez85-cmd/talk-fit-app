import { PAST_STORIES_DAY_1 } from "./past-stories-day-1";
import { PAST_STORIES_DAY_2 } from "./past-stories-day-2";
import { PAST_STORIES_DAY_3 } from "./past-stories-day-3";
import { PAST_STORIES_DAY_4 } from "./past-stories-day-4";
import { PAST_STORIES_DAY_5 } from "./past-stories-day-5";
import type { GrammarQuiz } from "./types";

export * from "./types";

/**
 * Registro del piloto: Basic 3 (past-stories) · Semana 1 · días 1–5.
 * Agregar más días aquí basta para extender el Paso 3 sin tocar la mecánica.
 */
export const GRAMMAR_QUIZZES: GrammarQuiz[] = [
  PAST_STORIES_DAY_1,
  PAST_STORIES_DAY_2,
  PAST_STORIES_DAY_3,
  PAST_STORIES_DAY_4,
  PAST_STORIES_DAY_5,
];

export function getGrammarQuiz(moduleId: string, day: number): GrammarQuiz | undefined {
  return GRAMMAR_QUIZZES.find((q) => q.moduleId === moduleId && q.day === day);
}
