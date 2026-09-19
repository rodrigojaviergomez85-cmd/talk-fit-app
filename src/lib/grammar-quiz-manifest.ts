/**
 * Días que tienen Paso 3 · Gramática. Módulo liviano y sin assets para que
 * la liga (cliente y servidor) pueda preguntarlo sin cargar el banco de ítems.
 */
export const GRAMMAR_QUIZ_DAYS: { moduleId: string; days: number[] }[] = [
  { moduleId: "basic-zero", days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
  { moduleId: "past-stories", days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
  { moduleId: "mixed-tenses", days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
];

export function hasGrammarQuiz(moduleId: string, day: number): boolean {
  return GRAMMAR_QUIZ_DAYS.some((m) => m.moduleId === moduleId && m.days.includes(day));
}

/** Cuántos días de una semana del currículo tienen evaluación de gramática. */
export function grammarDaysInWeek(moduleId: string, week: number): number {
  const first = (Math.max(1, week) - 1) * 5 + 1;
  const days = [first, first + 1, first + 2, first + 3, first + 4];
  return days.filter((d) => hasGrammarQuiz(moduleId, d)).length;
}
