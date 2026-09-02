/**
 * COURSE INDEX — lightweight, always-loaded module metadata.
 *
 * Contains module cards, week structure and a per-day outline (topic, week,
 * goals, sprint flag). It never imports a curriculum file, so Home, Progress,
 * placement, recordings and the journey math render without downloading any
 * lesson content. Full days are loaded on demand via CourseService.loadModule().
 */
import type { ModuleId } from "@/lib/types";
import { COURSE_OUTLINE } from "./course-outline";
import type { DayOutline, WeekOutline } from "./course-outline-shape";

export type { DayOutline, WeekOutline } from "./course-outline-shape";

function outline(id: ModuleId): { days: DayOutline[]; weeks: WeekOutline[] } {
  return COURSE_OUTLINE[id];
}

export type LearningModule = {
  /** Internal identity — used by progress, sessions and recordings. NEVER change. */
  id: ModuleId;
  /** Display order only. Never used to decide where a learner is. */
  order: number;
  /** Level caps shown above the title (e.g. "BASIC 2", "INTERMEDIO"). */
  label: string;
  /** Large display title (e.g. "SIMPLE PRESENT", "EAGLES"). */
  title: string;
  subtitle: string;
  subtitleEs: string;
  /** Small status line under the secondary text (e.g. "Semana 1 · 5 días"). */
  statusLine?: { en: string; es: string };
  description: string;
  descriptionEs: string;
  meta: string[];
  highlights?: { en: string; es: string }[];
  /** Lightweight per-day outline (no lesson content). Full days come from CourseService.loadModule(). */
  days: DayOutline[];
  weeks?: WeekOutline[];
  /** Standalone pilot: never auto-placed as the learner's "next" module. */
  pilot?: boolean;
  /** Not offered in self-placement: reached by finishing the previous module (or changing level later). */
  hiddenFromPlacement?: boolean;
  /** Extra line shown on the module intro (e.g. Test Ready Sprints). */
  extra?: { en: string; es: string };
  /** Module card CTA override. */
  cta?: { en: string; es: string };
  /**
   * ADVANCED family: cyclical, equivalent modules (A1 → A2 → A3 → A1). A learner
   * may enter at any cycle position — never a proficiency prerequisite.
   */
  family?: "advanced";
  cyclePosition?: number;
  /** Weeks actually built so far (out of 4). Below 4 = partial module: no "module complete" moment. */
  builtWeeks?: number;
};

/**
 * Presentation metadata only. Internal ids are frozen (see ModuleId); the
 * `order` here is the visual journey order and can change freely.
 */
export const MODULE_INDEX: LearningModule[] = [
  {
    id: "basic-zero",
    ...outline("basic-zero"),
    order: 1,
    label: "BASIC ZERO",
    title: "INTRODUCE YOURSELF & SOMEONE ELSE",
    subtitle: "Introduce Yourself & Someone Else",
    subtitleEs: "Preséntate y habla de otra persona",
    description: "Build your first English speaking foundation.",
    descriptionEs: "Construye tu primera base para hablar inglés.",
    meta: ["4 Weeks", "20 Days", "5 Fluency Reps per Day"],
  },
  {
    id: "simple-future",
    ...outline("simple-future"),
    order: 2,
    label: "BASIC 1",
    title: "SIMPLE FUTURE",
    subtitle: "Plans, Other People, Decisions & Predictions",
    subtitleEs: "Planes, otras personas, decisiones y predicciones",
    description: "Talk about plans, decisions and predictions.",
    descriptionEs: "Habla de planes, decisiones y predicciones.",
    meta: ["4 Weeks", "20 Days", "5 Fluency Reps per Day"],
  },
  {
    id: "simple-present",
    ...outline("simple-present"),
    order: 3,
    label: "BASIC 2",
    title: "SIMPLE PRESENT",
    subtitle: "Routines · Habits · Actions happening now",
    subtitleEs: "Rutinas · Hábitos · Acciones de ahora",
    description: "4-Week Fluency Journey.",
    descriptionEs: "Viaje de fluidez de 4 semanas.",
    meta: ["4 Weeks", "20 Days", "5 Fluency Reps per Day"],
  },
  {
    id: "past-stories",
    ...outline("past-stories"),
    order: 4,
    label: "BASIC 3",
    title: "SIMPLE PAST",
    subtitle: "Past Experiences & Stories",
    subtitleEs: "Experiencias pasadas e historias",
    description: "Talk about the past and tell a complete story.",
    descriptionEs: "Habla del pasado y cuenta una historia completa.",
    meta: ["4 Weeks", "20 Days", "5 Fluency Reps per Day"],
  },
  {
    id: "mixed-tenses",
    ...outline("mixed-tenses"),
    order: 5,
    label: "BASIC 4",
    title: "MIXED TENSES & QUESTIONS",
    subtitle: "Past · Present · Future · Questions — without freezing",
    subtitleEs: "Habla del pasado, presente y futuro — sin trabarte",
    description: "Move between past, present, future and questions in real conversation.",
    descriptionEs: "Cambia entre pasado, presente, futuro y preguntas en una conversación real.",
    meta: ["4 Weeks", "20 Days", "5 Fluency Reps per Day"],
    highlights: [
      { en: "Talk about what you do", es: "Hablar de lo que haces" },
      { en: "Tell what happened", es: "Contar lo que pasó" },
      { en: "Talk about your plans", es: "Hablar de tus planes" },
      { en: "Ask and answer questions", es: "Hacer y responder preguntas" },
      { en: "Switch tenses while you speak", es: "Cambiar de tiempo al hablar" },
    ],
  },
  {
    // Internal id is frozen: learners already have progress and recordings keyed to it.
    id: "eagles-week-1",
    ...outline("eagles-week-1"),
    order: 6,
    label: "INTERMEDIO",
    title: "EAGLES",
    subtitle: "English for Work & Real Conversation",
    subtitleEs: "Inglés para el trabajo y conversación real",
    statusLine: { en: "4 weeks · 20 days", es: "4 semanas · 20 días" },
    description: "Connect your ideas, solve problems, compare options and adapt when the situation changes.",
    descriptionEs: "Conecta tus ideas, resuelve problemas, compara opciones y adáptate cuando la situación cambia.",
    meta: ["4 Weeks", "20 Days", "100 Fluency Reps", "Test Ready Sprints"],
    highlights: [
      { en: "Connect your ideas with reasons and details", es: "Conectar tus ideas con razones y detalles" },
      { en: "Explain experiences and decisions", es: "Explicar experiencias y decisiones" },
      { en: "Compare options and justify your choice", es: "Comparar opciones y justificar tu elección" },
      { en: "Solve customer service situations", es: "Resolver situaciones de servicio al cliente" },
      { en: "Recommend, handle objections and close", es: "Recomendar, manejar objeciones y cerrar" },
      { en: "Respond with less preparation", es: "Responder con menos preparación" },
    ],
    extra: {
      en: "⚡ 20 TEST READY SPRINTS — practice listening and speaking under pressure.",
      es: "⚡ 20 TEST READY SPRINTS — para practicar listening y speaking bajo presión.",
    },
    cta: { en: "START EAGLES", es: "EMPEZAR EAGLES" },
    pilot: true,
  },
  {
    // Internal id is frozen from day one: progress and recordings will be keyed to it.
    id: "tigers",
    ...outline("tigers"),
    order: 7,
    label: "INTERMEDIO",
    title: "TIGERS",
    subtitle: "Explain, Defend & Respond",
    subtitleEs: "Explica, defiende y responde",
    statusLine: { en: "Month 2 · 4 weeks · 20 days", es: "Mes 2 · 4 semanas · 20 días" },
    description: "Don't just answer. Explain why, give evidence, compare alternatives and defend your decision.",
    descriptionEs: "No solo respondas. Explica por qué, da evidencia, compara alternativas y defiende tu decisión.",
    meta: ["4 Weeks", "20 Days", "100 Fluency Reps", "12 Test Ready Sprints"],
    highlights: [
      { en: "Explain why, not just what", es: "Explicar por qué, no solo qué" },
      { en: "Give examples and evidence", es: "Dar ejemplos y evidencia" },
      { en: "Compare options and trade-offs", es: "Comparar opciones y sus costos" },
      { en: "Pass a job interview in English", es: "Pasar una entrevista de trabajo en inglés" },
      { en: "Negotiate and respond to objections", es: "Negociar y responder a objeciones" },
      { en: "Defend a decision under pressure", es: "Defender una decisión bajo presión" },
    ],
    extra: {
      en: "⚡ 12 TEST READY SPRINTS — longer audio, two-speaker conversations, interview responses.",
      es: "⚡ 12 TEST READY SPRINTS — audios más largos, conversaciones a dos voces, respuestas de entrevista.",
    },
    cta: { en: "START TIGERS", es: "EMPEZAR TIGERS" },
    hiddenFromPlacement: true,
  },
  {
    // Internal id is frozen from day one: progress and recordings will be keyed to it.
    id: "sharks",
    ...outline("sharks"),
    order: 8,
    label: "INTERMEDIO",
    title: "SHARKS",
    subtitle: "Adapt, Improvise & Keep the Conversation Going",
    subtitleEs: "Adáptate, improvisa y mantén la conversación",
    statusLine: { en: "Month 3 · 4 weeks · 20 days", es: "Mes 3 · 4 semanas · 20 días" },
    description: "Respond when you don't know what's coming: react fast, clarify, rephrase, change your mind and keep talking under pressure.",
    descriptionEs: "Responde cuando no sabes qué viene: reacciona rápido, aclara, reformula, cambia de opinión y sigue hablando bajo presión.",
    meta: ["4 Weeks", "20 Days", "100 Fluency Reps", "12 Test Ready Sprints"],
    highlights: [
      { en: "React with 5–10 seconds of prep", es: "Reaccionar con 5–10 segundos de preparación" },
      { en: "Adapt when the information changes", es: "Adaptarte cuando cambia la información" },
      { en: "Ask for clarification and rephrase", es: "Pedir aclaración y reformular" },
      { en: "Argue, persuade and change your mind", es: "Argumentar, persuadir y cambiar de opinión" },
      { en: "Keep a conversation going by asking back", es: "Mantener la conversación preguntando de vuelta" },
      { en: "Improvise under pressure in the SHARKS Final", es: "Improvisar bajo presión en la Final SHARKS" },
    ],
    extra: {
      en: "⚡ 12 TEST READY SPRINTS — natural-speed audio, two-speaker listening, paraphrase, inference and Speak Now.",
      es: "⚡ 12 TEST READY SPRINTS — audio a velocidad natural, listening a dos voces, paráfrasis, inferencia y Speak Now.",
    },
    cta: { en: "START SHARKS", es: "EMPEZAR SHARKS" },
    hiddenFromPlacement: true,
  },
  {
    // Internal id is frozen from day one: progress and recordings will be keyed to it.
    // ADVANCED is cyclical: A1 / A2 / A3 are equivalent entry points, not levels.
    id: "advanced-1",
    ...outline("advanced-1"),
    order: 9,
    label: "AVANZADO · ADVANCED 1",
    title: "GET HIRED",
    subtitle: "Tell your story. Answer anything. Get the job.",
    subtitleEs: "Cuenta tu historia. Responde lo que sea. Consigue el trabajo.",
    statusLine: { en: "4 Weeks · 20 Days · 100 Fluency Reps", es: "4 semanas · 20 días · 100 Fluency Reps" },
    description: "Build answers with reusable frameworks: tell your story, prove it with real examples, survive the hard questions and perform under job pressure — recruiter, customer and sales.",
    descriptionEs: "Construye respuestas con estructuras reutilizables: cuenta tu historia, pruébala con ejemplos reales, sobrevive a las preguntas difíciles y rinde bajo presión laboral — reclutador, cliente y ventas.",
    meta: ["4 Weeks", "20 Days", "100 Fluency Reps", "Cyclical Advanced Module"],
    highlights: [
      { en: "Tell me about yourself — without sounding memorized", es: "Tell me about yourself — sin sonar memorizado/a" },
      { en: "Prove what you can do: challenge, mistake, difficult person", es: "Prueba lo que puedes hacer: reto, error, persona difícil" },
      { en: "Answer the hard questions: why you left, a failure, salary & schedule", es: "Responde las preguntas difíciles: por qué te fuiste, un fracaso, salario y horario" },
      { en: "Unexpected recruiter questions with 10 s to think", es: "Preguntas inesperadas del reclutador con 10 s para pensar" },
      { en: "Role switch: recruiter → angry customer → sell me this phone", es: "Cambio de rol: reclutador → cliente enojado → véndeme este teléfono" },
      { en: "Final Job Pressure Simulation — 8 Rounds", es: "Simulación final de presión laboral — 8 Rounds" },
    ],
    extra: {
      en: "⚡ 12 TEST READY SPRINTS — Listen & Repeat, Quick Answers, Listen & Respond, Describe the Scene, Speak Now, Mixed. Optional, never scored.",
      es: "⚡ 12 TEST READY SPRINTS — Listen & Repeat, Quick Answers, Listen & Respond, Describe the Scene, Speak Now, Mixed. Opcionales, nunca calificados.",
    },
    cta: { en: "START GET HIRED", es: "EMPEZAR GET HIRED" },
    hiddenFromPlacement: true,
    family: "advanced",
    cyclePosition: 1,
    builtWeeks: 4,
  },
];

/** Preview-only levels: not selectable, not routable, zero days, never in totals. */
export type UpcomingLevel = { key: string; label: string; title: string; note: { en: string; es: string } };
/** ADVANCED 1 now ships as a real module card; nothing is left in preview-only state. */
export const UPCOMING_LEVELS: UpcomingLevel[] = [];

export const DEFAULT_MODULE: ModuleId = "basic-zero";

export function isModuleId(value: unknown): value is ModuleId {
  return (
    value === "basic-zero" ||
    value === "simple-present" ||
    value === "past-stories" ||
    value === "simple-future" ||
    value === "mixed-tenses" ||
    value === "eagles-week-1" ||
    value === "tigers" ||
    value === "sharks" ||
    value === "advanced-1"
  );
}
