import type { DayRecord, JourneyState, ModuleId } from "@/lib/types";
import { CourseService, type LearningModule } from "@/services/course-service";
import { JourneyService } from "@/services/journey-service";

/**
 * Progress Moments — pure helpers that pair two existing saved Final Reps so the
 * learner can hear their own change. Nothing here copies, renames or re-signs
 * audio: every side is just a reference to a `DayRecord` that already exists.
 *
 * A "comparison" is intentionally generic (start/end + optional records) so
 * future milestones (day 20 / 40 / 60 / 100) are just another pair.
 */

export type ComparisonType = "week" | "module" | "journey";

export type ComparisonSide = {
  /** Day number inside the module. */
  day: number;
  /** Saved record when the day is complete; null when never completed. */
  record: DayRecord | null;
  /** True when a Final Rep audio can actually be played. */
  playable: boolean;
};

export type Comparison = {
  type: ComparisonType;
  moduleId: ModuleId;
  /** Week number (week comparisons only; 0 for module). */
  week: number;
  start: ComparisonSide;
  end: ComparisonSide;
};

function side(state: JourneyState, moduleId: ModuleId, day: number): ComparisonSide {
  const record = JourneyService.getRecord(state, moduleId, day) ?? null;
  return { day, record, playable: Boolean(record && (record.finalUrl || record.recordingPath)) };
}

/** Week day 1 vs week day 5 — by position inside the week, never calendar. */
export function weekComparison(
  state: JourneyState,
  moduleId: ModuleId,
  week: number,
): Comparison | null {
  const days = CourseService.getDays(moduleId).filter((d) => (d.week ?? 1) === week);
  if (days.length < 2) return null;
  const first = days[0]!.day;
  const last = days[days.length - 1]!.day;
  return {
    type: "week",
    moduleId,
    week,
    start: side(state, moduleId, first),
    end: side(state, moduleId, last),
  };
}

/** First active day vs final active day of the module (never hard-coded to 20). */
export function moduleComparison(state: JourneyState, moduleId: ModuleId): Comparison | null {
  const days = CourseService.getDays(moduleId);
  if (days.length < 2) return null;
  const first = days[0]!.day;
  const last = days[days.length - 1]!.day;
  return {
    type: "module",
    moduleId,
    week: 0,
    start: side(state, moduleId, first),
    end: side(state, moduleId, last),
  };
}

/** The Intermediate journey (EAGLES → TIGERS → SHARKS), in order. */
export const INTERMEDIATE_JOURNEY: ModuleId[] = ["eagles-week-1", "tigers", "sharks"];

/**
 * 60-day moment: the earliest saved Intermediate Final Rep (EAGLES Day 1 when it
 * exists, otherwise the learner's real first Intermediate recording — a learner
 * placed later never gets a fabricated start) vs the SHARKS final day.
 * Both sides are references to existing records; nothing is copied.
 */
export function journeyComparison(state: JourneyState): Comparison | null {
  const finalModule: ModuleId = "sharks";
  const days = CourseService.getDays(finalModule);
  const last = days[days.length - 1];
  if (!last) return null;
  const end = side(state, finalModule, last.day);
  const startRecord =
    INTERMEDIATE_JOURNEY.flatMap((m) => JourneyService.moduleRecords(state, m))
      .filter((r) => r.recordingPath || r.finalUrl)
      .sort((a, b) => a.completedAt.localeCompare(b.completedAt))[0] ?? null;
  // The start must be a different recording than the end, or there is nothing to hear.
  if (!startRecord || (startRecord.moduleId === finalModule && startRecord.day === last.day)) return null;
  return {
    type: "journey",
    moduleId: finalModule,
    week: 0,
    start: { day: startRecord.day, record: startRecord, playable: true },
    end,
  };
}

/** Objective numbers across the whole Intermediate journey. Only derived from saved data. */
export function journeyMetrics(state: JourneyState) {
  const records = INTERMEDIATE_JOURNEY.flatMap((m) => JourneyService.moduleRecords(state, m));
  const totalDays = INTERMEDIATE_JOURNEY.reduce((n, m) => n + CourseService.getDays(m).length, 0);
  const seconds = records.reduce((total, r) => total + (r.practiceSeconds || 0), 0);
  return {
    days: records.length,
    totalDays,
    /** Only claim the full rep count when every journey day is actually complete. */
    reps: records.length >= totalDays ? totalDays * 5 : null,
    minutes: Math.round(seconds / 60),
    finalReps: records.filter((r) => r.recordingPath || r.finalUrl).length,
  };
}

/** First saved Final Rep vs the most recent one (by completion date). */
export function firstVsLatest(state: JourneyState): { first: DayRecord; latest: DayRecord } | null {
  const playable = JourneyService.playableRecords(state);
  if (playable.length < 2) return null;
  return { first: playable[0]!, latest: playable[playable.length - 1]! };
}

export type Milestone = {
  key: string;
  label: { es: string; en: string };
  record: DayRecord;
};

/** Meaningful points in the learner's real journey (never assumed day numbers). */
export function milestones(state: JourneyState): Milestone[] {
  const playable = JourneyService.playableRecords(state);
  if (playable.length === 0) return [];
  const list: Milestone[] = [];
  const seen = new Set<string>();
  const push = (key: string, label: Milestone["label"], record: DayRecord) => {
    const id = `${record.moduleId}:${record.day}`;
    if (seen.has(id)) return;
    seen.add(id);
    list.push({ key, label, record });
  };

  push("first", { es: "PRIMERA GRABACIÓN", en: "FIRST RECORDING" }, playable[0]!);
  for (const module of CourseService.modules()) {
    if (!JourneyService.moduleComplete(state, module.id)) continue;
    const days = CourseService.getDays(module.id);
    const last = days[days.length - 1];
    if (!last) continue;
    const record = JourneyService.getRecord(state, module.id, last.day);
    if (record && (record.finalUrl || record.recordingPath)) {
      push(`end:${module.id}`, { es: `FIN ${module.label}`, en: `${module.label} END` }, record);
    }
  }
  if (playable.length > 1)
    push("latest", { es: "MÁS RECIENTE", en: "LATEST" }, playable[playable.length - 1]!);
  return list;
}

/** Objective, already-stored numbers for a module. Anything unreliable is omitted by the caller. */
export function moduleMetrics(state: JourneyState, moduleId: ModuleId) {
  const records = JourneyService.moduleRecords(state, moduleId);
  const seconds = records.reduce((total, r) => total + (r.practiceSeconds || 0), 0);
  return {
    days: records.length,
    reps: records.length * 5,
    minutes: Math.round(seconds / 60),
    finalReps: records.filter((r) => r.recordingPath || r.finalUrl).length,
  };
}

/* ------------------------------------------------------------------ */
/* Copy maps                                                           */
/* ------------------------------------------------------------------ */

export type ReflectionOption = { id: string; es: string; en: string };

export const WEEK_REFLECTIONS: ReflectionOption[] = [
  { id: "longer", es: "HABLO MÁS TIEMPO", en: "I SPEAK LONGER" },
  { id: "connect", es: "CONECTO MÁS IDEAS", en: "I CONNECT MORE IDEAS" },
  { id: "pauses", es: "TENGO MENOS PAUSAS", en: "I PAUSE LESS" },
  { id: "english", es: "USO MÁS INGLÉS", en: "I USE MORE ENGLISH" },
  { id: "confident", es: "ME SIENTO MÁS SEGURO/A", en: "I FEEL MORE CONFIDENT" },
];

export const MODULE_REFLECTIONS: ReflectionOption[] = [
  { id: "longer", es: "HABLO POR MÁS TIEMPO", en: "I SPEAK FOR LONGER" },
  { id: "connect", es: "CONECTO MEJOR MIS IDEAS", en: "I CONNECT MY IDEAS BETTER" },
  { id: "easier", es: "RESPONDO CON MÁS FACILIDAD", en: "I ANSWER MORE EASILY" },
  { id: "confident", es: "ME SIENTO MÁS SEGURO/A", en: "I FEEL MORE CONFIDENT" },
  { id: "listening", es: "ENTIENDO MEJOR CUANDO ESCUCHO", en: "I UNDERSTAND BETTER WHEN I LISTEN" },
];

/** What each module helped the learner practice — concise, no scores. */
export const TRANSFORMATION: Record<ModuleId, { es: string; en: string }> = {
  "basic-zero": {
    es: "Ahora puedes presentarte y hablar de otra persona.",
    en: "You can now introduce yourself and talk about someone else.",
  },
  "simple-future": {
    es: "Ahora puedes hablar de planes y del futuro.",
    en: "You can now talk about plans and the future.",
  },
  "simple-present": {
    es: "Ahora puedes hablar de rutinas, hábitos y acciones.",
    en: "You can now talk about routines, habits and actions.",
  },
  "past-stories": {
    es: "Ahora puedes contar experiencias e historias en pasado.",
    en: "You can now tell past experiences and stories.",
  },
  "mixed-tenses": {
    es: "Ahora puedes mezclar pasado, presente y futuro y responder preguntas.",
    en: "You can now mix past, present and future and answer questions.",
  },
  "eagles-week-1": {
    es: "Ahora puedes conectar mejor tus ideas, comparar opciones, resolver situaciones y dar recomendaciones.",
    en: "You can now connect your ideas better, compare options, solve situations and give recommendations.",
  },
  tigers: {
    es: "Ahora puedes desarrollar tus respuestas, dar ejemplos, comparar opciones, responder a objeciones y defender una decisión.",
    en: "You can now develop your answers, give examples, compare options, respond to objections and defend a decision.",
  },
  sharks: {
    es: "Ahora puedes adaptarte, improvisar, pedir aclaración, reformular y mantener una conversación bajo presión.",
    en: "You can now adapt, improvise, ask for clarification, rephrase and keep a conversation going under pressure.",
  },
};

export const MODULE_EMOJI: Record<ModuleId, string> = {
  "basic-zero": "🏆",
  "simple-future": "🏆",
  "simple-present": "🏆",
  "past-stories": "🏆",
  "mixed-tenses": "🏆",
  "eagles-week-1": "🦅",
  tigers: "🐯",
  sharks: "🦈",
};

/** Extra completion detail for a module: level line + "AHORA PUEDES PRACTICAR CÓMO:" list. */
export const MODULE_COMPLETION: Partial<
  Record<
    ModuleId,
    {
      levelLine: { es: string; en: string };
      /** Optional journey line: "COMPLETASTE TU VIAJE: 🦅 EAGLES · 🐯 TIGERS · 🦈 SHARKS". */
      journeyLine?: { es: string; en: string };
      canNow: { es: string; en: string }[];
    }
  >
> = {
  tigers: {
    levelLine: { es: "INTERMEDIO · MES 2 ✓", en: "INTERMEDIATE · MONTH 2 ✓" },
    canNow: [
      { es: "desarrollar mejor tus respuestas", en: "develop your answers better" },
      { es: "dar ejemplos", en: "give examples" },
      { es: "comparar opciones", en: "compare options" },
      { es: "explicar ventajas y desventajas", en: "explain advantages and disadvantages" },
      { es: "responder a objeciones", en: "respond to objections" },
      { es: "defender una decisión", en: "defend a decision" },
      { es: "reaccionar con menos preparación", en: "react with less preparation" },
    ],
  },
  sharks: {
    levelLine: { es: "INTERMEDIO · MES 3 ✓", en: "INTERMEDIATE · MONTH 3 ✓" },
    journeyLine: {
      es: "COMPLETASTE TU VIAJE: 🦅 EAGLES · 🐯 TIGERS · 🦈 SHARKS",
      en: "YOU COMPLETED YOUR JOURNEY: 🦅 EAGLES · 🐯 TIGERS · 🦈 SHARKS",
    },
    canNow: [
      { es: "responder con menos preparación", en: "respond with less preparation" },
      { es: "explicar y defender tus ideas", en: "explain and defend your ideas" },
      { es: "pedir aclaración", en: "ask for clarification" },
      { es: "reformular cuando lo necesitas", en: "rephrase when you need to" },
      { es: "cambiar tu respuesta cuando cambia la información", en: "change your answer when the information changes" },
      { es: "mantener una conversación por más tiempo", en: "keep a conversation going for longer" },
      { es: "responder bajo más presión", en: "respond under more pressure" },
    ],
  },
};

export type NextUpCopy = {
  emoji: string;
  promise: { es: string; en: string };
  items: { es: string; en: string }[];
};

/** Teaser copy keyed by the module that comes NEXT. */
export const NEXT_UP: Record<ModuleId, NextUpCopy> = {
  "basic-zero": {
    emoji: "🌱",
    promise: { es: "TUS PRIMERAS PALABRAS EN VOZ ALTA.", en: "YOUR FIRST WORDS OUT LOUD." },
    items: [
      { es: "presentarte con confianza", en: "introduce yourself with confidence" },
      { es: "hablar de otra persona", en: "talk about someone else" },
      { es: "responder preguntas básicas", en: "answer basic questions" },
    ],
  },
  "simple-future": {
    emoji: "🗓️",
    promise: { es: "HABLA DE LO QUE VIENE.", en: "TALK ABOUT WHAT'S COMING." },
    items: [
      { es: "hablar de tus planes", en: "talk about your plans" },
      { es: "tomar decisiones en inglés", en: "make decisions in English" },
      { es: "hacer predicciones", en: "make predictions" },
      { es: "hablar del futuro de otras personas", en: "talk about other people's future" },
    ],
  },
  "simple-present": {
    emoji: "☀️",
    promise: { es: "CUENTA TU DÍA SIN PENSARLO.", en: "DESCRIBE YOUR DAY WITHOUT THINKING." },
    items: [
      { es: "hablar de rutinas y hábitos", en: "talk about routines and habits" },
      { es: "describir a otras personas", en: "describe other people" },
      { es: "explicar un proceso simple", en: "explain a simple process" },
      { es: "decir qué está pasando ahora", en: "say what is happening now" },
    ],
  },
  "past-stories": {
    emoji: "📖",
    promise: { es: "CUENTA LO QUE PASÓ.", en: "TELL WHAT HAPPENED." },
    items: [
      { es: "contar lo que hiciste ayer", en: "tell what you did yesterday" },
      { es: "hablar del pasado de otras personas", en: "talk about other people's past" },
      { es: "describir qué estaba pasando", en: "describe what was happening" },
      { es: "contar una historia completa", en: "tell a complete story" },
    ],
  },
  "mixed-tenses": {
    emoji: "🔀",
    promise: {
      es: "PASADO, PRESENTE Y FUTURO — SIN TRABARTE.",
      en: "PAST, PRESENT AND FUTURE — WITHOUT FREEZING.",
    },
    items: [
      { es: "cambiar de tiempo mientras hablas", en: "switch tenses while you speak" },
      { es: "hacer y responder preguntas", en: "ask and answer questions" },
      { es: "hablar de tu vida completa", en: "talk about your whole life" },
      { es: "responder sin preparación", en: "answer without preparation" },
    ],
  },
  "eagles-week-1": {
    emoji: "🦅",
    promise: {
      es: "TU INGLÉS EMPIEZA A TRABAJAR PARA VOS.",
      en: "YOUR ENGLISH STARTS WORKING FOR YOU.",
    },
    items: [
      { es: "resolver problemas", en: "solve problems" },
      { es: "hablar con clientes", en: "talk with customers" },
      { es: "recomendar opciones", en: "recommend options" },
      { es: "manejar situaciones de ventas", en: "handle sales situations" },
      {
        es: "prepararte para evaluaciones de inglés laboral",
        en: "prepare for workplace English evaluations",
      },
    ],
  },
  tigers: {
    emoji: "🐯",
    promise: {
      es: "NO SOLO RESPONDAS. EXPLICA Y DEFIENDE TUS IDEAS.",
      en: "DON'T JUST ANSWER. EXPLAIN AND DEFEND YOUR IDEAS.",
    },
    items: [
      { es: "explicar por qué", en: "explain why" },
      { es: "dar ejemplos y evidencia", en: "give examples and evidence" },
      { es: "comparar opciones", en: "compare options" },
      { es: "responder a objeciones", en: "respond to objections" },
      { es: "defender una decisión", en: "defend a decision" },
    ],
  },
  sharks: {
    emoji: "🦈",
    promise: {
      es: "ADAPT & IMPROVISE — RESPONDE CUANDO NO SABES QUÉ VIENE.",
      en: "ADAPT & IMPROVISE — RESPOND WHEN YOU DON'T KNOW WHAT'S COMING.",
    },
    items: [
      { es: "improvisar", en: "improvise" },
      { es: "adaptarte a nueva información", en: "adapt to new information" },
      { es: "pedir aclaración y reformular", en: "ask for clarification and rephrase" },
      { es: "responder bajo presión", en: "respond under pressure" },
      { es: "sostener conversaciones por más tiempo", en: "sustain longer conversations" },
    ],
  },
};

/** Preview-only levels (not published): same shape, no CTA. */
export const UPCOMING_NEXT_UP: Record<string, NextUpCopy & { title: string; label: string }> = {
  advanced: {
    label: "AVANZADO",
    title: "ADVANCED",
    emoji: "🎯",
    promise: {
      es: "CONSOLIDATE & MASTER — AHORA VAMOS A HACER TU INGLÉS MÁS PRECISO, NATURAL Y CONSISTENTE.",
      en: "CONSOLIDATE & MASTER — NOW WE'LL MAKE YOUR ENGLISH MORE PRECISE, NATURAL AND CONSISTENT.",
    },
    items: [
      { es: "conversaciones más largas", en: "longer conversations" },
      { es: "listening más exigente", en: "more demanding listening" },
      { es: "vocabulario más preciso", en: "more precise vocabulary" },
      { es: "respuestas más naturales", en: "more natural answers" },
      { es: "mayor control gramatical", en: "stronger grammar control" },
      { es: "comunicación B2 más consistente", en: "more consistent B2 communication" },
    ],
  },
};

export type NextStage =
  | { kind: "module"; module: LearningModule; copy: NextUpCopy }
  | { kind: "upcoming"; copy: NextUpCopy & { title: string; label: string } }
  | null;

/**
 * What comes after a module in the visual journey. Published modules route;
 * unpublished levels render as PRÓXIMAMENTE with no CTA.
 */
export function nextModuleAfter(moduleId: ModuleId): NextStage {
  const modules = CourseService.modules();
  const index = modules.findIndex((m) => m.id === moduleId);
  const next = index >= 0 ? modules[index + 1] : undefined;
  if (next) return { kind: "module", module: next, copy: NEXT_UP[next.id] };
  // Nothing published after this module yet: preview the next level, no CTA.
  const copy = UPCOMING_NEXT_UP["advanced"];
  return copy ? { kind: "upcoming", copy } : null;
}

/** Stable identity for a comparison — used for reflection storage and revisits. */
export function comparisonKey(c: Pick<Comparison, "type" | "moduleId" | "week">): string {
  return `${c.type}:${c.moduleId}:${c.week}`;
}
