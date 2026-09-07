/**
 * ADVANCED 3 — BEYOND THE SCRIPT · WEEK 1: ORGANIZE YOUR THOUGHTS (Days 1–5)
 *
 * Advanced is CYCLICAL: ADVANCED 1 / 2 / 3 are equivalent entry points, never
 * levels. ADVANCED 3 never requires ADVANCED 1 or ADVANCED 2.
 *
 * DATA SAFETY: the module id ("advanced-3"), the day numbers and every
 * `a3d*` id are persisted in learner progress and recordings. Never rename.
 *
 * Principle: DO NOT TEACH THE PERFECT ANSWER. TEACH HOW TO BUILD AN ANSWER.
 * Every questioner turn is FIXED and prewritten — no generative AI, no
 * grading, no chatbot, no extra model calls.
 *
 * Days 6–20 live in advanced-3-weeks-2-4-course.ts.
 */
import type { CourseDay, RepCopy, RolePlayTurn, TestReadySprint } from "@/lib/types";
import { l, q, chunks4, makeDay, type EaglesDayInput, type WeekMeta } from "./course-builders";

export const ADVANCED_3_WEEKS: (WeekMeta & { subtitle: string; behavior: string })[] = [
  {
    week: 1,
    title: "Organize Your Thoughts",
    subtitle: "Unexpected experience · Describe · Future plan · A choice · No preparation",
    subtitleEs: "Experiencia inesperada · Describe · Plan futuro · Una decisión · Sin preparación",
    behavior: "ORGANIZE",
  },
  {
    week: 2,
    title: "Take a Position",
    subtitle: "Opinion · Both sides · Advice · Compare & choose · Defend",
    subtitleEs: "Opinión · Los dos lados · Consejo · Compara y elige · Defiende",
    behavior: "DECIDE",
  },
  {
    week: 3,
    title: "Handle the Unfamiliar",
    subtitle: "How it changed · Interrupted plan · How it works · What-if · Explain something difficult",
    subtitleEs: "Cómo cambió · Plan interrumpido · Cómo funciona · Qué harías si · Explica algo difícil",
    behavior: "ADAPT",
  },
  {
    week: 4,
    title: "Reflect & Connect",
    subtitle: "Life lesson · Your progress · Responsibility · A regret · Beyond the Script",
    subtitleEs: "Lección de vida · Tu progreso · Responsabilidad · Un arrepentimiento · Más allá del guion",
    behavior: "REFLECT",
  },
];

/** Spanish-first ADVANCED 3 instructions. Practice content stays in English. */
const ADVANCED_3_REP_COPY: RepCopy = {
  rep1: { es: ["ESCUCHA", "Escucha cómo se organiza la respuesta."], en: ["LISTEN", "Listen to how the answer is organized."] },
  rep2: { es: ["COPIA", "Escucha las ideas y grábalas juntas."], en: ["COPY", "Listen to the ideas and record them together."] },
  rep3: { es: ["SHADOWING", "Habla al mismo tiempo que el audio."], en: ["SHADOWING", "Speak at the same time as the audio."] },
  rep4: { es: ["PIENSA Y RESPONDE", "No busques la respuesta perfecta. Usa la estructura del día."], en: ["THINK & ANSWER", "Don't look for the perfect answer. Use today's framework."] },
  rep5: { es: ["PRESSURE ROUND", "Responde sin memorizar."], en: ["PRESSURE ROUND", "Answer without memorizing."] },
};

type Advanced3DayInput = EaglesDayInput & { testReadyOptional?: boolean };

/** Every ADVANCED 3 Test Ready Sprint is optional extra practice — it never blocks the day. */
export function advanced3Day(input: Advanced3DayInput): CourseDay {
  const { testReadyOptional, ...rest } = input;
  const optional = testReadyOptional ?? Boolean(rest.testReady);
  return {
    ...makeDay({ estimatedMinutes: "8–12 min", ...rest }, ADVANCED_3_WEEKS),
    repCopy: ADVANCED_3_REP_COPY,
    ...(optional ? { testReadyOptional: true } : {}),
  };
}

export const START = "START REP 1";

/** The single interlocutor of ADVANCED 3. The transcript is always visible. */
export const QUESTIONER = { label: "QUESTIONER", labelEs: "QUIEN PREGUNTA" };

/** ⚡ QUICK ≈ 15–30s · 🎤 DEVELOP ≈ 30–45s · 🔥 SUSTAIN ≈ 60s+. */
export const QUICK: [number, number] = [20, 30];
export const DEVELOP: [number, number] = [30, 45];
export const SUSTAIN: [number, number] = [50, 70];

export function turn(
  id: string,
  who: typeof QUESTIONER,
  text: string,
  es: string,
  voice: "female" | "male",
  extra: Partial<RolePlayTurn> = {},
): RolePlayTurn {
  return { id, label: who.label, labelEs: who.labelEs, text, es, voice, ...extra };
}

/* ---------------------------------------------------------------------- */
/* DELIBERATE REPAIR MOMENTS — exactly one per day, rotating by function.  */
/* Never scored: survival language for when you don't know what to say.    */
/* ---------------------------------------------------------------------- */

export const REPAIR_TIP = {
  es: "No tienes que saber la respuesta de inmediato. Gana tiempo, pide que te lo repitan o explícalo de otra forma — y sigue hablando.",
  text: "You don't have to know the answer right away. Buy time, ask for a repeat, or explain it another way — then keep talking.",
};

export type RepairKind = "time" | "catch" | "confirm" | "restart" | "mixed";

const REPAIR_CUES: Record<RepairKind, string[]> = {
  time: ["That's an interesting question —", "let me think.", "ANSWER"],
  catch: ["Sorry, could you say that another way?", "I didn't catch the last part.", "ANSWER"],
  confirm: ["If I understand the question correctly…", "You're asking about…, right?", "ANSWER"],
  restart: ["Let me explain that differently.", "What I mean is…", "ANSWER"],
  mixed: ["THINK · CONFIRM · REPHRASE", "ANSWER"],
};

const REPAIR_FRAMEWORK: Record<RepairKind, { title: string; titleEs: string }> = {
  time: { title: "NEEDS TIME", titleEs: "GANA TIEMPO" },
  catch: { title: "DIDN'T CATCH IT", titleEs: "NO LO ESCUCHASTE BIEN" },
  confirm: { title: "CONFIRM", titleEs: "CONFIRMA" },
  restart: { title: "RESTART", titleEs: "EXPLÍCALO DE OTRA FORMA" },
  mixed: { title: "REPAIR UNDER PRESSURE", titleEs: "REPARA BAJO PRESIÓN" },
};

/** One prewritten turn that REQUIRES a repair move before answering. */
export function repairTurn(
  id: string,
  kind: RepairKind,
  who: typeof QUESTIONER,
  text: string,
  es: string,
  voice: "female" | "male",
  extra: Partial<RolePlayTurn> = {},
): RolePlayTurn {
  const meta = REPAIR_FRAMEWORK[kind];
  return turn(id, who, text, es, voice, {
    targetSeconds: QUICK,
    cues: REPAIR_CUES[kind],
    framework: { title: meta.title, titleEs: meta.titleEs, steps: REPAIR_CUES[kind].slice(0, -1) },
    repairTip: REPAIR_TIP,
    ...extra,
  });
}

/* ---------------------------------------------------------------------- */
/* RECOGNITION — "WHAT KIND OF ANSWER DO YOU NEED?"                        */
/* Days 5, 10, 15, 20. Never scored, never pass/fail, never blocking.      */
/* ---------------------------------------------------------------------- */

export type AnswerTypeId = "story" | "explain" | "opinion" | "hypothetical" | "reflect";

export const ANSWER_TYPES: Record<AnswerTypeId, { label: string; labelEs: string; cues: string[] }> = {
  story: { label: "STORY", labelEs: "HISTORIA", cues: ["SITUATION", "ACTION", "RESULT", "LESSON"] },
  explain: { label: "EXPLAIN", labelEs: "EXPLICAR", cues: ["IDEA", "DETAILS", "EXAMPLE", "CHECK"] },
  opinion: { label: "OPINION", labelEs: "OPINIÓN", cues: ["POSITION", "WHY", "EXAMPLE", "CLOSE"] },
  hypothetical: { label: "HYPOTHETICAL", labelEs: "HIPOTÉTICO", cues: ["CHOICE", "WHY", "CONSEQUENCE"] },
  reflect: { label: "REFLECT", labelEs: "REFLEXIONAR", cues: ["EXPERIENCE", "LESSON", "NOW"] },
};

export const ALL_ANSWER_TYPES: AnswerTypeId[] = ["story", "explain", "opinion", "hypothetical", "reflect"];

/**
 * One recognition turn: the learner taps WHAT KIND OF ANSWER the question
 * needs BEFORE speaking, then answers. `expected` is only the best framework —
 * never a wrong answer, never scored, never blocking.
 */
export function answerTypeTurn(
  id: string,
  who: typeof QUESTIONER,
  text: string,
  es: string,
  voice: "female" | "male",
  options: AnswerTypeId[],
  expected: AnswerTypeId,
  extra: Partial<RolePlayTurn> = {},
): RolePlayTurn {
  return turn(id, who, text, es, voice, {
    targetSeconds: DEVELOP,
    recognition: {
      prompt: "WHAT KIND OF ANSWER DO YOU NEED?",
      promptEs: "¿QUÉ TIPO DE RESPUESTA NECESITAS?",
      options: options.map((oid) => ({ id: oid, ...ANSWER_TYPES[oid] })),
      expected,
    },
    ...extra,
  });
}

/* ============================ DAY 1 — EXPLAIN AN UNEXPECTED EXPERIENCE ============================ */

const d1Sprint: TestReadySprint = {
  type: "story-retell",
  title: "STORY RETELL",
  titleEs: "CUENTA LA HISTORIA",
  instruction: "Listen to the short story, then retell it in your own words.",
  instructionEs: "Escucha la historia corta y vuelve a contarla con tus palabras.",
  items: [
    { id: "a3d1-sr1", audio: "I was going to the airport when the taxi broke down on the highway. I called another car, but I still missed my flight by ten minutes.", maxSeconds: 45 },
    { id: "a3d1-sr2", audio: "The meeting was at nine, but the office was closed. Nobody told me the location had changed, so I waited outside for half an hour.", maxSeconds: 45 },
    { id: "a3d1-sr3", audio: "We arrived at the hotel and the reservation was for the wrong week. They gave us a smaller room, and honestly, it was fine.", maxSeconds: 45 },
  ],
};

const d1 = advanced3Day({
  day: 1,
  topic: "Explain an Unexpected Experience",
  topicEs: "Explica una experiencia inesperada",
  focus: "Something didn't go as planned — SETTING → WHAT HAPPENED → REACTION → RESULT",
  focusEs: "Algo no salió como planeaste — SITUACIÓN → QUÉ PASÓ → REACCIÓN → RESULTADO",
  intro: {
    title: "EXPLAIN AN UNEXPECTED EXPERIENCE",
    titleEs: "EXPLICA UNA EXPERIENCIA INESPERADA",
    lead: "Today the question is open: something didn't go according to plan. Don't look for the perfect story — use a framework: SETTING → WHAT HAPPENED → REACTION → RESULT.",
    leadEs: "Hoy la pregunta es abierta: algo no salió según el plan. No busques la historia perfecta — usa una estructura: SITUACIÓN → QUÉ PASÓ → REACCIÓN → RESULTADO.",
    examples: ["It was a normal morning, and then…", "What happened was…", "In the end…"],
    goal: "Tell the story for 50–70 seconds, then adapt to two follow-up questions.",
    goalEs: "Cuenta la historia 50–70 segundos y adáptate a dos preguntas de seguimiento.",
    cta: START,
  },
  lines: [
    l("a3d1-1", "It was a normal Monday morning, | and I was going to an important meeting.", "Era un lunes normal por la mañana y iba a una reunión importante."),
    l("a3d1-2", "I left early | because I didn't want to arrive late.", "Salí temprano porque no quería llegar tarde."),
    l("a3d1-3", "What happened was | that the bus stopped after two blocks and never moved again.", "Lo que pasó fue que el bus se detuvo después de dos cuadras y ya no avanzó."),
    l("a3d1-4", "At first I didn't know what to do, | so I took a moment and thought about my options.", "Al principio no sabía qué hacer, así que me tomé un momento y pensé en mis opciones."),
    l("a3d1-5", "I called the office | and told them exactly what was happening.", "Llamé a la oficina y les dije exactamente qué estaba pasando."),
    l("a3d1-6", "Then I walked to the next street | and found another way to get there.", "Luego caminé a la siguiente calle y encontré otra forma de llegar."),
    l("a3d1-7", "In the end I arrived fifteen minutes late, | but the meeting was still useful.", "Al final llegué quince minutos tarde, pero la reunión igual fue útil."),
    l("a3d1-8", "Looking back, | I learned that a plan B is never a waste of time.", "Mirando atrás, aprendí que un plan B nunca es una pérdida de tiempo."),
  ],
  rep2Chunks: chunks4("a3d1"),
  prompts: [
    q("a3d1-p1", "Set the scene: when and where did it happen?", "Ubica la escena: ¿cuándo y dónde pasó?", "It was a normal…", "Era un… normal", "SETTING"),
    q("a3d1-p2", "What exactly went wrong?", "¿Qué salió mal exactamente?", "What happened was…", "Lo que pasó fue…", "WHAT HAPPENED"),
    q("a3d1-p3", "What did you do first?", "¿Qué hiciste primero?", "The first thing I did was…", "Lo primero que hice fue…", "REACTION"),
    q("a3d1-p4", "How did it end?", "¿Cómo terminó?", "In the end…", "Al final…", "RESULT", "explain"),
    q("a3d1-p5", "What did you learn from it?", "¿Qué aprendiste de eso?", "Looking back…", "Mirando atrás…", "LESSON", "react"),
  ],
  cues: ["SETTING", "WHAT HAPPENED", "REACTION", "RESULT"],
  powerChunks: { core: ["What happened was…", "At first I didn't know what to do."], stretch: "Looking back…" },
  goalSeconds: SUSTAIN,
  goalSentences: 7,
  hideModelText: true,
  rep5Prompt: {
    question: "Tell me about a time something unexpected happened.",
    questionEs: "Cuéntame de una vez que pasó algo inesperado.",
  },
  rep5Tips: {
    en: "Use the framework, not the model: SETTING → WHAT HAPPENED → REACTION → RESULT.",
    es: "Usa la estructura, no el modelo: SITUACIÓN → QUÉ PASÓ → REACCIÓN → RESULTADO.",
  },
  rep5Turns: [
    turn("a3d1-turn1", QUESTIONER, "Tell me about a time something unexpected happened.", "Cuéntame de una vez que pasó algo inesperado.", "female", {
      targetSeconds: SUSTAIN,
      cues: ["SETTING", "WHAT HAPPENED", "REACTION", "RESULT"],
      toolbox: ["It was a normal…", "What happened was…", "In the end…"],
    }),
    turn("a3d1-turn2", QUESTIONER, "What did you do first?", "¿Qué hiciste primero?", "female", {
      targetSeconds: DEVELOP,
      cues: ["ACTION", "WHY"],
      toolbox: ["The first thing I did was…", "I decided to…"],
    }),
    repairTurn("a3d1-repair", "time", QUESTIONER, "And what did you learn from it?", "¿Y qué aprendiste de eso?", "female"),
  ],
  speakerVoice: "female",
  testReady: d1Sprint,
});

/* ============================ DAY 2 — DESCRIBE WHAT YOU SEE ============================ */

const d2Sprint: TestReadySprint = {
  type: "describe-scene",
  title: "DESCRIBE THE SCENE",
  titleEs: "DESCRIBE LA ESCENA",
  instruction: "Describe the situation: big picture, details, actions, and what may be happening.",
  instructionEs: "Describe la situación: panorama, detalles, acciones y qué podría estar pasando.",
  items: [
    { id: "a3d2-ds1", text: "A crowded train station in the morning.", textEs: "Una estación de tren llena por la mañana.", maxSeconds: 45 },
    { id: "a3d2-ds2", text: "A team meeting where one person is presenting and two people look confused.", textEs: "Una reunión donde una persona presenta y dos se ven confundidas.", maxSeconds: 45 },
    { id: "a3d2-ds3", text: "A family cooking together in a small kitchen.", textEs: "Una familia cocinando junta en una cocina pequeña.", maxSeconds: 45 },
  ],
};

const d2 = advanced3Day({
  day: 2,
  topic: "Describe What You See",
  topicEs: "Describe lo que ves",
  focus: "Beyond naming objects — BIG PICTURE → DETAILS → ACTION → INTERPRETATION",
  focusEs: "Más que nombrar objetos — PANORAMA → DETALLES → ACCIÓN → INTERPRETACIÓN",
  intro: {
    title: "DESCRIBE WHAT YOU SEE",
    titleEs: "DESCRIBE LO QUE VES",
    lead: "Describing is not listing objects. Say the big picture first, then details, then what people are doing — and finish with what may be happening. You don't need to be sure.",
    leadEs: "Describir no es enumerar objetos. Di primero el panorama, luego los detalles, luego qué hacen las personas — y termina con lo que podría estar pasando. No necesitas estar seguro/a.",
    examples: ["It looks like…", "They might be…", "It seems that…"],
    goal: "Describe the scene for 45–60 seconds and interpret it without guessing wildly.",
    goalEs: "Describe la escena 45–60 segundos e interprétala sin inventar de más.",
    cta: START,
  },
  lines: [
    l("a3d2-1", "The first thing I notice is | a busy office in the middle of the day.", "Lo primero que noto es una oficina ocupada a media jornada."),
    l("a3d2-2", "There are about six people, | and most of them are sitting around one table.", "Hay unas seis personas y la mayoría está sentada alrededor de una mesa."),
    l("a3d2-3", "In the front, | a woman is standing and pointing at a screen.", "Al frente, una mujer está de pie señalando una pantalla."),
    l("a3d2-4", "Two people are taking notes, | and one person is looking at his phone.", "Dos personas toman notas y una persona mira su teléfono."),
    l("a3d2-5", "It looks like | they're presenting some kind of report.", "Parece que están presentando algún tipo de reporte."),
    l("a3d2-6", "They might be discussing results, | because there are numbers on the screen.", "Podrían estar hablando de resultados, porque hay números en la pantalla."),
    l("a3d2-7", "It seems that the meeting is serious | but not tense.", "Parece que la reunión es seria pero no tensa."),
    l("a3d2-8", "If I had to guess, | I'd say they're planning the next month.", "Si tuviera que adivinar, diría que están planeando el próximo mes."),
  ],
  rep2Chunks: chunks4("a3d2"),
  prompts: [
    q("a3d2-p1", "Start with the big picture: where is this?", "Empieza con el panorama: ¿dónde es esto?", "The first thing I notice is…", "Lo primero que noto es…", "BIG PICTURE"),
    q("a3d2-p2", "Give three details you can see.", "Da tres detalles que puedes ver.", "There are…", "Hay…", "DETAILS"),
    q("a3d2-p3", "What are the people doing?", "¿Qué están haciendo las personas?", "One person is…", "Una persona está…", "ACTION"),
    q("a3d2-p4", "What do you think is happening?", "¿Qué crees que está pasando?", "It looks like…", "Parece que…", "INTERPRETATION", "explain"),
    q("a3d2-p5", "What might happen next?", "¿Qué podría pasar después?", "They might…", "Podrían…", "GUESS", "adapt"),
  ],
  cues: ["BIG PICTURE", "DETAILS", "ACTION", "INTERPRETATION"],
  powerChunks: { core: ["It looks like…", "They might be…"], stretch: "If I had to guess…" },
  goalSeconds: [45, 60],
  goalSentences: 7,
  hideModelText: true,
  rep5Prompt: {
    question: "Describe a busy street market on a Saturday morning.",
    questionEs: "Describe un mercado callejero lleno un sábado por la mañana.",
  },
  rep5Tips: {
    en: "BIG PICTURE → DETAILS → ACTION → INTERPRETATION. You don't need certainty.",
    es: "PANORAMA → DETALLES → ACCIÓN → INTERPRETACIÓN. No necesitas certeza.",
  },
  rep5Turns: [
    turn("a3d3-placeholder-unused", QUESTIONER, "", "", "female"),
  ],
  speakerVoice: "female",
  testReady: d2Sprint,
});

/* ============================ DAY 3 — EXPLAIN A FUTURE PLAN ============================ */

const d3Sprint: TestReadySprint = {
  type: "speak-now",
  title: "SPEAK NOW",
  titleEs: "HABLA AHORA",
  instruction: "10 seconds to think, then speak for 30 seconds.",
  instructionEs: "10 segundos para pensar y luego habla 30 segundos.",
  thinkSeconds: 10,
  speakSeconds: 30,
  items: [
    { id: "a3d3-sn1", text: "A goal you want to reach this year.", textEs: "Una meta que quieres alcanzar este año.", maxSeconds: 35 },
    { id: "a3d3-sn2", text: "Something you want to change about your routine.", textEs: "Algo que quieres cambiar de tu rutina.", maxSeconds: 35 },
    { id: "a3d3-sn3", text: "A plan you have for the next three months.", textEs: "Un plan que tienes para los próximos tres meses.", maxSeconds: 35 },
  ],
};

const d3 = advanced3Day({
  day: 3,
  topic: "Explain a Future Plan",
  topicEs: "Explica un plan futuro",
  focus: "A real plan — GOAL → PLAN → TIMELINE → WHY",
  focusEs: "Un plan real — META → PLAN → TIEMPO → POR QUÉ",
  intro: {
    title: "EXPLAIN A FUTURE PLAN",
    titleEs: "EXPLICA UN PLAN FUTURO",
    lead: "A plan is not one sentence. Say the goal, how you'll do it, when, and why it matters to you. Framework: GOAL → PLAN → TIMELINE → WHY.",
    leadEs: "Un plan no es una sola oración. Di la meta, cómo lo harás, cuándo y por qué te importa. Estructura: META → PLAN → TIEMPO → POR QUÉ.",
    examples: ["What I want to do is…", "The plan is to…", "The main reason is…"],
    goal: "Explain the plan for 45–60 seconds and handle two follow-ups.",
    goalEs: "Explica el plan 45–60 segundos y maneja dos preguntas de seguimiento.",
    cta: START,
  },
  lines: [
    l("a3d3-1", "What I want to do in the next three months | is speak English at work without preparing.", "Lo que quiero hacer en los próximos tres meses es hablar inglés en el trabajo sin prepararme."),
    l("a3d3-2", "The plan is simple: | practice out loud every day, even for ten minutes.", "El plan es simple: practicar en voz alta todos los días, aunque sean diez minutos."),
    l("a3d3-3", "I'm also going to record myself | so I can hear my own mistakes.", "También voy a grabarme para poder escuchar mis propios errores."),
    l("a3d3-4", "In the first month | I want to be comfortable in short conversations.", "En el primer mes quiero sentirme cómodo/a en conversaciones cortas."),
    l("a3d3-5", "By the third month | I want to explain problems without translating in my head.", "Para el tercer mes quiero explicar problemas sin traducir en mi cabeza."),
    l("a3d3-6", "The main reason is | that I lose opportunities when I stay quiet.", "La razón principal es que pierdo oportunidades cuando me quedo callado/a."),
    l("a3d3-7", "The difficult part will be | staying consistent when I'm tired.", "La parte difícil va a ser mantener la constancia cuando esté cansado/a."),
    l("a3d3-8", "If that happens, | I'll practice less time, but I won't stop.", "Si eso pasa, practicaré menos tiempo, pero no voy a parar."),
  ],
  rep2Chunks: chunks4("a3d3"),
  prompts: [
    q("a3d3-p1", "What do you want to accomplish in the next three months?", "¿Qué quieres lograr en los próximos tres meses?", "What I want to do is…", "Lo que quiero hacer es…", "GOAL"),
    q("a3d3-p2", "How exactly will you do it?", "¿Cómo lo vas a hacer exactamente?", "The plan is to…", "El plan es…", "PLAN"),
    q("a3d3-p3", "When do you want the first result?", "¿Cuándo quieres el primer resultado?", "In the first month…", "En el primer mes…", "TIMELINE"),
    q("a3d3-p4", "Why does this matter to you?", "¿Por qué te importa esto?", "The main reason is…", "La razón principal es…", "WHY", "explain"),
    q("a3d3-p5", "What could make it difficult?", "¿Qué podría hacerlo difícil?", "The difficult part will be…", "La parte difícil será…", "OBSTACLE", "adapt"),
  ],
  cues: ["GOAL", "PLAN", "TIMELINE", "WHY"],
  powerChunks: { core: ["The plan is to…", "The main reason is…"], stretch: "If that happened, I would…" },
  goalSeconds: [45, 60],
  goalSentences: 7,
  hideModelText: true,
  rep5Prompt: {
    question: "What is something you want to accomplish in the next three months?",
    questionEs: "¿Qué es algo que quieres lograr en los próximos tres meses?",
  },
  rep5Tips: {
    en: "GOAL → PLAN → TIMELINE → WHY. Don't memorize — build it.",
    es: "META → PLAN → TIEMPO → POR QUÉ. No memorices — constrúyelo.",
  },
  rep5Turns: [
    turn("a3d3-turn1", QUESTIONER, "What is something you want to accomplish in the next three months?", "¿Qué es algo que quieres lograr en los próximos tres meses?", "male", {
      targetSeconds: DEVELOP,
      cues: ["GOAL", "PLAN", "TIMELINE", "WHY"],
      toolbox: ["What I want to do is…", "The plan is to…", "The main reason is…"],
    }),
    turn("a3d3-turn2", QUESTIONER, "What could make that difficult?", "¿Qué podría hacer eso difícil?", "male", {
      targetSeconds: DEVELOP,
      cues: ["OBSTACLE", "WHY"],
      toolbox: ["The difficult part will be…", "Honestly, the risk is…"],
    }),
    repairTurn("a3d3-repair", "confirm", QUESTIONER, "And what will you do if your first plan doesn't work?", "¿Y qué harás si tu primer plan no funciona?", "male"),
  ],
  speakerVoice: "male",
  testReady: d3Sprint,
});

/* ============================ DAY 4 — EXPLAIN A CHOICE ============================ */

const d4Sprint: TestReadySprint = {
  type: "quick-answers",
  title: "QUICK ANSWERS",
  titleEs: "RESPUESTAS RÁPIDAS",
  instruction: "Listen and answer in one or two sentences. Give the choice and one reason.",
  instructionEs: "Escucha y responde en una o dos oraciones. Da la decisión y una razón.",
  items: [
    { id: "a3d4-qa1", audio: "Do you prefer working from home or working at the office?", maxSeconds: 20 },
    { id: "a3d4-qa2", audio: "Would you rather live in a big city or a smaller town?", maxSeconds: 20 },
    { id: "a3d4-qa3", audio: "Do you study better alone or with other people?", maxSeconds: 20 },
    { id: "a3d4-qa4", audio: "Is it better to save money or spend it on an experience?", maxSeconds: 20 },
    { id: "a3d4-qa5", audio: "Would you rather learn quickly with pressure or slowly with comfort?", maxSeconds: 20 },
  ],
};

const d4 = advanced3Day({
  day: 4,
  topic: "Explain a Choice",
  topicEs: "Explica una decisión",
  focus: "Support your choice — CHOICE → REASON → EXAMPLE → CLOSE",
  focusEs: "Sostén tu decisión — DECISIÓN → RAZÓN → EJEMPLO → CIERRE",
  intro: {
    title: "EXPLAIN A CHOICE",
    titleEs: "EXPLICA UNA DECISIÓN",
    lead: "There is no correct choice today. What matters is how you support it: CHOICE → REASON → EXAMPLE → CLOSE.",
    leadEs: "Hoy no hay una decisión correcta. Lo que importa es cómo la sostienes: DECISIÓN → RAZÓN → EJEMPLO → CIERRE.",
    examples: ["For me, the better option is…", "One reason is…", "For example…"],
    goal: "Give a clear choice and support it for 45–60 seconds.",
    goalEs: "Da una decisión clara y sostenla 45–60 segundos.",
    cta: START,
  },
  lines: [
    l("a3d4-1", "For me, | the better option is working from home most of the week.", "Para mí, la mejor opción es trabajar desde casa la mayor parte de la semana."),
    l("a3d4-2", "One reason is | that I concentrate much better in a quiet place.", "Una razón es que me concentro mucho mejor en un lugar tranquilo."),
    l("a3d4-3", "For example, | last year I finished the same work in less time at home.", "Por ejemplo, el año pasado terminé el mismo trabajo en menos tiempo en casa."),
    l("a3d4-4", "I also save around two hours a day, | and I use that time for family.", "También ahorro como dos horas al día y uso ese tiempo para la familia."),
    l("a3d4-5", "On the other hand, | I understand the office is better for new people.", "Por otro lado, entiendo que la oficina es mejor para los que van empezando."),
    l("a3d4-6", "When you're learning, | it helps to have someone next to you.", "Cuando estás aprendiendo, ayuda tener a alguien al lado."),
    l("a3d4-7", "So my choice isn't absolute — | I'd go to the office once or twice a week.", "Así que mi decisión no es absoluta: iría a la oficina una o dos veces por semana."),
    l("a3d4-8", "Overall, | I choose focus first and contact second.", "En general, elijo concentración primero y contacto después."),
  ],
  rep2Chunks: chunks4("a3d4"),
  prompts: [
    q("a3d4-p1", "City or smaller town — what's your choice?", "¿Ciudad o pueblo pequeño? ¿Cuál eliges?", "For me, the better option is…", "Para mí, la mejor opción es…", "CHOICE"),
    q("a3d4-p2", "Give one strong reason.", "Da una razón fuerte.", "One reason is…", "Una razón es…", "REASON"),
    q("a3d4-p3", "Give a real example.", "Da un ejemplo real.", "For example…", "Por ejemplo…", "EXAMPLE"),
    q("a3d4-p4", "What's the disadvantage of your choice?", "¿Cuál es la desventaja de tu decisión?", "On the other hand…", "Por otro lado…", "BALANCE", "justify"),
    q("a3d4-p5", "Close your answer in one sentence.", "Cierra tu respuesta en una oración.", "Overall…", "En general…", "CLOSE"),
  ],
  cues: ["CHOICE", "REASON", "EXAMPLE", "CLOSE"],
  powerChunks: { core: ["One reason is…", "For example…"], stretch: "Overall…" },
  goalSeconds: [45, 60],
  goalSentences: 7,
  hideModelText: true,
  rep5Prompt: {
    question: "Studying alone or studying with other people — which do you choose and why?",
    questionEs: "¿Estudiar solo/a o con otras personas? ¿Qué eliges y por qué?",
  },
  rep5Tips: {
    en: "CHOICE → REASON → EXAMPLE → CLOSE. Any position is fine if you support it.",
    es: "DECISIÓN → RAZÓN → EJEMPLO → CIERRE. Cualquier posición vale si la sostienes.",
  },
  rep5Turns: [
    turn("a3d4-turn1", QUESTIONER, "Studying alone or studying with other people — which one works better for you?", "¿Estudiar solo/a o con otras personas? ¿Cuál te funciona mejor?", "female", {
      targetSeconds: DEVELOP,
      cues: ["CHOICE", "REASON", "EXAMPLE", "CLOSE"],
      toolbox: ["For me, the better option is…", "One reason is…", "For example…"],
    }),
    turn("a3d4-turn2", QUESTIONER, "And would you make the same choice if you had only one week to prepare for something important?", "¿Y tomarías la misma decisión si tuvieras solo una semana para prepararte para algo importante?", "female", {
      targetSeconds: DEVELOP,
      cues: ["CHOICE", "WHY"],
      toolbox: ["In that situation, I would…", "It depends on…"],
    }),
    repairTurn("a3d4-repair", "restart", QUESTIONER, "Sorry — could you explain that reason in a different way?", "Perdón, ¿podrías explicar esa razón de otra forma?", "female"),
  ],
  speakerVoice: "female",
  testReady: d4Sprint,
});

/* ============================ DAY 5 — ANSWER WITHOUT PREPARING (CHECKPOINT) ============================ */

const d5Sprint: TestReadySprint = {
  type: "mixed",
  title: "WEEK 1 MIXED SPRINT",
  titleEs: "SPRINT MIXTO SEMANA 1",
  instruction: "Five different question types. Recognize the answer type first, then speak.",
  instructionEs: "Cinco tipos de pregunta. Reconoce primero el tipo de respuesta y luego habla.",
  items: [
    { id: "a3d5-m1", kind: "quick-answers", audio: "Do you think weekends should be three days long?", maxSeconds: 20 },
    { id: "a3d5-m2", kind: "story-retell", audio: "Last week my phone died right before an important call, and I had to find a solution in two minutes.", maxSeconds: 40 },
    { id: "a3d5-m3", kind: "speak-now", text: "Explain how you organize your week.", textEs: "Explica cómo organizas tu semana.", thinkSeconds: 10, maxSeconds: 35 },
    { id: "a3d5-m4", kind: "listen-respond", audio: "What would you do if you had to move to another country next month?", maxSeconds: 35 },
    { id: "a3d5-m5", kind: "speak-now", text: "Something you have learned about yourself this year.", textEs: "Algo que aprendiste sobre ti este año.", thinkSeconds: 10, maxSeconds: 35 },
  ],
};

const d5 = advanced3Day({
  day: 5,
  topic: "Answer Without Preparing",
  topicEs: "Responde sin prepararte",
  focus: "Checkpoint — recognize the answer type, then speak",
  focusEs: "Checkpoint — reconoce el tipo de respuesta y luego habla",
  intro: {
    title: "ANSWER WITHOUT PREPARING",
    titleEs: "RESPONDE SIN PREPARARTE",
    lead: "Today the questions are unfamiliar on purpose. First recognize what kind of answer the question needs — STORY, EXPLAIN, OPINION, HYPOTHETICAL or REFLECT — and then speak.",
    leadEs: "Hoy las preguntas son desconocidas a propósito. Primero reconoce qué tipo de respuesta necesita la pregunta — HISTORIA, EXPLICAR, OPINIÓN, HIPOTÉTICO o REFLEXIONAR — y luego habla.",
    examples: ["That's an interesting question — let me think.", "The way I see it…", "Looking back…"],
    goal: "Answer four unfamiliar questions using the right framework.",
    goalEs: "Responde cuatro preguntas desconocidas usando la estructura correcta.",
    cta: START,
  },
  lines: [
    l("a3d5-1", "When I hear a question I didn't prepare, | the first thing I do is decide what kind of answer it needs.", "Cuando escucho una pregunta que no preparé, lo primero que hago es decidir qué tipo de respuesta necesita."),
    l("a3d5-2", "If it starts with 'tell me about a time', | it's a story: situation, action, result, lesson.", "Si empieza con 'cuéntame de una vez', es una historia: situación, acción, resultado, lección."),
    l("a3d5-3", "If it asks 'what do you think', | it's an opinion: position, why, example, close.", "Si pregunta 'qué piensas', es una opinión: posición, por qué, ejemplo, cierre."),
    l("a3d5-4", "If it asks 'how does it work', | it's an explanation: idea, details, example, check.", "Si pregunta 'cómo funciona', es una explicación: idea, detalles, ejemplo, confirmación."),
    l("a3d5-5", "If it asks 'what would you do', | it's hypothetical: choice, why, consequence.", "Si pregunta 'qué harías', es hipotético: decisión, por qué, consecuencia."),
    l("a3d5-6", "And if it asks how something changed, | I reflect: experience, lesson, now.", "Y si pregunta cómo cambió algo, reflexiono: experiencia, lección, ahora."),
    l("a3d5-7", "I don't need the perfect answer. | I need a clear structure.", "No necesito la respuesta perfecta. Necesito una estructura clara."),
    l("a3d5-8", "So I take one second, choose the shape, | and start talking.", "Así que me tomo un segundo, elijo la forma y empiezo a hablar."),
  ],
  rep2Chunks: chunks4("a3d5"),
  prompts: [
    q("a3d5-p1", "'Tell me about a difficult week.' What kind of answer is it?", "'Cuéntame de una semana difícil.' ¿Qué tipo de respuesta es?", "That's a story, so…", "Es una historia, así que…", "STORY"),
    q("a3d5-p2", "'Do you think people read less today?'", "'¿Crees que la gente lee menos hoy?'", "The way I see it…", "Como yo lo veo…", "OPINION"),
    q("a3d5-p3", "'How does your favorite app work?'", "'¿Cómo funciona tu app favorita?'", "Basically, it…", "Básicamente…", "EXPLAIN"),
    q("a3d5-p4", "'What would you do with one free month?'", "'¿Qué harías con un mes libre?'", "If that happened, I would…", "Si eso pasara, yo…", "HYPOTHETICAL", "adapt"),
    q("a3d5-p5", "'How have you changed in two years?'", "'¿Cómo has cambiado en dos años?'", "Looking back…", "Mirando atrás…", "REFLECT", "explain"),
  ],
  cues: ["RECOGNIZE", "ORGANIZE", "SPEAK"],
  powerChunks: { core: ["That's an interesting question — let me think.", "The way I see it…"], stretch: "I haven't thought about that before, but…" },
  goalSeconds: DEVELOP,
  goalSentences: 6,
  hideModelText: true,
  rep5Prompt: {
    question: "Four unfamiliar questions. Recognize the answer type, then speak.",
    questionEs: "Cuatro preguntas desconocidas. Reconoce el tipo de respuesta y luego habla.",
  },
  rep5Tips: {
    en: "First recognize: STORY · EXPLAIN · OPINION · HYPOTHETICAL · REFLECT.",
    es: "Primero reconoce: HISTORIA · EXPLICAR · OPINIÓN · HIPOTÉTICO · REFLEXIONAR.",
  },
  rep5Turns: [
    answerTypeTurn("a3d5-turn1", QUESTIONER, "Tell me about a day that started badly and ended well.", "Cuéntame de un día que empezó mal y terminó bien.", "female", ALL_ANSWER_TYPES, "story", {
      cues: ["SITUATION", "ACTION", "RESULT", "LESSON"],
      toolbox: ["It started when…", "In the end…"],
    }),
    answerTypeTurn("a3d5-turn2", QUESTIONER, "Do you think people work better under pressure?", "¿Crees que la gente trabaja mejor bajo presión?", "female", ALL_ANSWER_TYPES, "opinion", {
      cues: ["POSITION", "WHY", "EXAMPLE", "CLOSE"],
    }),
    answerTypeTurn("a3d5-turn3", QUESTIONER, "What would you do if you had to give a presentation in English tomorrow?", "¿Qué harías si tuvieras que dar una presentación en inglés mañana?", "female", ALL_ANSWER_TYPES, "hypothetical", {
      cues: ["CHOICE", "WHY", "CONSEQUENCE"],
    }),
    repairTurn("a3d5-repair", "mixed", QUESTIONER, "How would you explain your daily work to someone who has never done it?", "¿Cómo explicarías tu trabajo diario a alguien que nunca lo ha hecho?", "female"),
  ],
  speakerVoice: "female",
  testReady: d5Sprint,
});

export const ADVANCED_3_WEEK_1_DAYS: CourseDay[] = [d1, d2, d3, d4, d5];
