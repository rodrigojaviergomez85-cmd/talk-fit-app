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

export type ComparisonType = "week" | "module";

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
export function weekComparison(state: JourneyState, moduleId: ModuleId, week: number): Comparison | null {
  const days = CourseService.getDays(moduleId).filter((d) => (d.week ?? 1) === week);
  if (days.length < 2) return null;
  const first = days[0]!.day;
  const last = days[days.length - 1]!.day;
  return { type: "week", moduleId, week, start: side(state, moduleId, first), end: side(state, moduleId, last) };
}

/** First active day vs final active day of the module (never hard-coded to 20). */
export function moduleComparison(state: JourneyState, moduleId: ModuleId): Comparison | null {
  const days = CourseService.getDays(moduleId);
  if (days.length < 2) return null;
  const first = days[0]!.day;
  const last = days[days.length - 1]!.day;
  return { type: "module", moduleId, week: 0, start: side(state, moduleId, first), end: side(state, moduleId, last) };
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
  if (playable.length > 1) push("latest", { es: "MÁS RECIENTE", en: "LATEST" }, playable[playable.length - 1]!);
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
};

export const MODULE_EMOJI: Record<ModuleId, string> = {
  "basic-zero": "🏆",
  "simple-future": "🏆",
  "simple-present": "🏆",
  "past-stories": "🏆",
  "mixed-tenses": "🏆",
  "eagles-week-1": "🦅",
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
    promise: { es: "PASADO, PRESENTE Y FUTURO — SIN TRABARTE.", en: "PAST, PRESENT AND FUTURE — WITHOUT FREEZING." },
    items: [
      { es: "cambiar de tiempo mientras hablas", en: "switch tenses while you speak" },
      { es: "hacer y responder preguntas", en: "ask and answer questions" },
      { es: "hablar de tu vida completa", en: "talk about your whole life" },
      { es: "responder sin preparación", en: "answer without preparation" },
    ],
  },
  "eagles-week-1": {
    emoji: "🦅",
    promise: { es: "TU INGLÉS EMPIEZA A TRABAJAR PARA VOS.", en: "YOUR ENGLISH STARTS WORKING FOR YOU." },
    items: [
      { es: "resolver problemas", en: "solve problems" },
      { es: "hablar con clientes", en: "talk with customers" },
      { es: "recomendar opciones", en: "recommend options" },
      { es: "manejar situaciones de ventas", en: "handle sales situations" },
      { es: "prepararte para evaluaciones de inglés laboral", en: "prepare for workplace English evaluations" },
    ],
  },
};

/** Preview-only levels (not published): same shape, no CTA. */
export const UPCOMING_NEXT_UP: Record<string, NextUpCopy & { title: string; label: string }> = {
  tigers: {
    label: "INTERMEDIO ALTO",
    title: "TIGERS",
    emoji: "🐯",
    promise: { es: "NO SOLO RESPONDAS. EXPLICA Y DEFIENDE TUS IDEAS.", en: "DON'T JUST ANSWER. EXPLAIN AND DEFEND YOUR IDEAS." },
    items: [
      { es: "explicar mejor", en: "explain better" },
      { es: "comparar opciones", en: "compare options" },
      { es: "reaccionar a nuevas preguntas", en: "react to new questions" },
      { es: "justificar decisiones", en: "justify decisions" },
      { es: "defender tu punto de vista", en: "defend your point of view" },
    ],
  },
  sharks: {
    label: "AVANZADO",
    title: "SHARKS",
    emoji: "🦈",
    promise: { es: "RESPONDE CUANDO NO SABES QUÉ VIENE.", en: "RESPOND WHEN YOU DON'T KNOW WHAT'S COMING." },
    items: [
      { es: "improvisar", en: "improvise" },
      { es: "adaptarte", en: "adapt" },
      { es: "manejar conversaciones más rápidas", en: "handle faster conversations" },
      { es: "responder bajo presión", en: "respond under pressure" },
      { es: "sostener conversaciones por más tiempo", en: "sustain longer conversations" },
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
  const copy = UPCOMING_NEXT_UP.tigers;
  return copy ? { kind: "upcoming", copy } : null;
}

/** Stable identity for a comparison — used for reflection storage and revisits. */
export function comparisonKey(c: Pick<Comparison, "type" | "moduleId" | "week">): string {
  return `${c.type}:${c.moduleId}:${c.week}`;
}
