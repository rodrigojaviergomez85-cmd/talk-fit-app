/**
 * Días que tienen Paso 3 · Gramática. Módulo liviano y sin assets para que
 * la liga (cliente y servidor) pueda preguntarlo sin cargar el banco de ítems.
 */
export const GRAMMAR_QUIZ_DAYS: { moduleId: string; days: number[] }[] = [
  { moduleId: "basic-zero", days: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
  { moduleId: "simple-future", days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
  { moduleId: "simple-present", days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
  { moduleId: "past-stories", days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
  { moduleId: "mixed-tenses", days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
  // B2 Lab (lectura · listening · estructura · speaking · mock). Semana 1 por ahora.
  { moduleId: "eagles-week-1", days: [1, 2, 3, 4, 5] },
];

/**
 * B2 LAB · Datos mínimos para la tarjeta del día (título e ítems reales) sin
 * cargar el banco completo. Los módulos de gramática no viven acá.
 */
export const LAB_DAY_META: Record<string, Record<number, { items: number; en: string; es: string }>> = {
  "eagles-week-1": {
    1: { items: 10, en: "B2 Lab · Reading: A Busy Day", es: "B2 Lab · Lectura: Un día ocupado" },
    2: { items: 10, en: "B2 Lab · Listening: Aria's Trip", es: "B2 Lab · Listening: El viaje de Aria" },
    3: { items: 16, en: "B2 Lab · Structure: Good Advice", es: "B2 Lab · Estructura: Buenos consejos" },
    4: { items: 7, en: "B2 Lab · Speaking: Recommend a Phone", es: "B2 Lab · Speaking: Recomienda un teléfono" },
    5: { items: 14, en: "B2 Lab · Friday Mock", es: "B2 Lab · Mock del viernes" },
  },
};

/** Cuántos ítems tiene el Paso 3 de ese día (10 en Basic Zero, 20 en gramática). */
export function grammarItemCount(moduleId: string, day: number): number {
  const lab = LAB_DAY_META[moduleId]?.[day];
  if (lab) return lab.items;
  if (moduleId === "basic-zero") return 10;
  return 20;
}

export function isLabDay(moduleId: string, day: number): boolean {
  return Boolean(LAB_DAY_META[moduleId]?.[day]);
}

export function hasGrammarQuiz(moduleId: string, day: number): boolean {
  return GRAMMAR_QUIZ_DAYS.some((m) => m.moduleId === moduleId && m.days.includes(day));
}

/** Cuántos días de una semana del currículo tienen evaluación de gramática. */
export function grammarDaysInWeek(moduleId: string, week: number): number {
  const first = (Math.max(1, week) - 1) * 5 + 1;
  const days = [first, first + 1, first + 2, first + 3, first + 4];
  return days.filter((d) => hasGrammarQuiz(moduleId, d)).length;
}
