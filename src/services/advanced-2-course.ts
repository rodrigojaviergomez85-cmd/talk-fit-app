/**
 * ADVANCED 2 — DO THE JOB · WEEK 1: TAKE THE CALL (Days 1–5)
 *
 * Advanced is CYCLICAL: ADVANCED 1 / 2 / 3 are equivalent entry points, never
 * levels. ADVANCED 2 never requires ADVANCED 1.
 *
 * DATA SAFETY: the module id ("advanced-2"), the day numbers and every
 * `a2d*` id are persisted in learner progress and recordings. Never rename.
 *
 * Principle: DO NOT TEACH THE PERFECT ANSWER. TEACH HOW TO BUILD AN ANSWER.
 * Every customer / guest / manager turn is FIXED and prewritten — no
 * generative AI, no grading, no chatbot.
 *
 * Days 6–20 live in advanced-2-weeks-2-4-course.ts.
 */
import type { CourseDay, RepCopy, RolePlayTurn, TestReadySprint } from "@/lib/types";
import { l, q, chunks4, makeDay, type EaglesDayInput, type WeekMeta } from "./course-builders";

export const ADVANCED_2_WEEKS: (WeekMeta & { subtitle: string; behavior: string })[] = [
  {
    week: 1,
    title: "Take the Call",
    subtitle: "Understand · Reserve · Explain · Bill · Money transfer",
    subtitleEs: "Entiende · Reserva · Explica · Cobro · Transferencia",
    behavior: "HELP",
  },
  {
    week: 2,
    title: "Recommend & Sell",
    subtitle: "Discover the need · Upgrade · Compare · Objection · Close",
    subtitleEs: "Descubre la necesidad · Mejora · Compara · Objeción · Cierra",
    behavior: "GUIDE",
  },
  {
    week: 3,
    title: "Fix the Problem",
    subtitle: "Late delivery · Troubleshoot · Explain · Upset guest · Schedule",
    subtitleEs: "Entrega tarde · Diagnostica · Explica · Huésped molesto · Agenda",
    behavior: "SOLVE",
  },
  {
    week: 4,
    title: "Perform on the Job",
    subtitle: "Past incident · Your progress · Instructions · Bad call · Real Shift",
    subtitleEs: "Incidente pasado · Tu progreso · Instrucciones · Mala llamada · Turno real",
    behavior: "OWN IT",
  },
];

/** Spanish-first ADVANCED 2 instructions. Practice content stays in English. */
const ADVANCED_2_REP_COPY: RepCopy = {
  rep1: { es: ["ESCUCHA", "Escucha cómo se organiza la respuesta."], en: ["LISTEN", "Listen to how the answer is organized."] },
  rep2: { es: ["COPIA", "Escucha las ideas y grábalas juntas."], en: ["COPY", "Listen to the ideas and record them together."] },
  rep3: { es: ["SHADOWING", "Habla al mismo tiempo que el audio."], en: ["SHADOWING", "Speak at the same time as the audio."] },
  rep4: { es: ["PIENSA Y RESPONDE", "Construye tu propia respuesta con la estructura del día."], en: ["THINK & ANSWER", "Build your own answer with today's framework."] },
  rep5: { es: ["PRESSURE ROUND", "Responde sin memorizar."], en: ["PRESSURE ROUND", "Answer without memorizing."] },
};

type Advanced2DayInput = EaglesDayInput & { testReadyOptional?: boolean };

/** Every ADVANCED 2 Test Ready Sprint is optional extra practice — it never blocks the day. */
export function advanced2Day(input: Advanced2DayInput): CourseDay {
  const { testReadyOptional, ...rest } = input;
  const optional = testReadyOptional ?? Boolean(rest.testReady);
  return {
    ...makeDay({ estimatedMinutes: "8–12 min", ...rest }, ADVANCED_2_WEEKS),
    repCopy: ADVANCED_2_REP_COPY,
    ...(optional ? { testReadyOptional: true } : {}),
  };
}

export const START = "START REP 1";
export const CUSTOMER = { label: "CUSTOMER", labelEs: "CLIENTE" };
export const GUEST = { label: "GUEST", labelEs: "HUÉSPED" };
export const MANAGER = { label: "MANAGER", labelEs: "SUPERVISOR/A" };

/** ⚡ QUICK ≈ 15–30s · 🎤 DEVELOP ≈ 30–45s · 🔥 SUSTAIN ≈ 60s+. */
export const QUICK: [number, number] = [20, 30];
export const DEVELOP: [number, number] = [30, 45];
export const SUSTAIN: [number, number] = [50, 70];

export function turn(
  id: string,
  who: typeof CUSTOMER,
  text: string,
  es: string,
  voice: "female" | "male",
  extra: Partial<RolePlayTurn> = {},
): RolePlayTurn {
  return { id, label: who.label, labelEs: who.labelEs, text, es, voice, ...extra };
}

/* ---------------------------------------------------------------------- */
/* DELIBERATE REPAIR MOMENTS — exactly one per day, rotating by function.  */
/* Never scored: survival language, not a grammar exercise.                */
/* ---------------------------------------------------------------------- */

export const REPAIR_TIP = {
  es: "No tienes que entender todo. Pide que te lo repitan, confirma, o tómate un segundo — y responde.",
  text: "You don't have to understand everything. Ask for a repeat, confirm, or take a second — then answer.",
};

export type RepairKind = "time" | "catch" | "confirm" | "restart" | "mixed";

const REPAIR_CUES: Record<RepairKind, string[]> = {
  time: ["That's a good question —", "let me think for a moment.", "ANSWER"],
  catch: ["Sorry, could you repeat that?", "I didn't catch the last part.", "ANSWER"],
  confirm: ["So you're asking about…, right?", "Just to make sure I understood…", "ANSWER"],
  restart: ["Sorry, let me explain that again.", "What I mean is…", "ANSWER"],
  mixed: ["REPEAT · CONFIRM · TAKE A SECOND", "ANSWER"],
};

const REPAIR_FRAMEWORK: Record<RepairKind, { title: string; titleEs: string }> = {
  time: { title: "NEEDS TIME", titleEs: "TÓMATE UN SEGUNDO" },
  catch: { title: "DIDN'T CATCH IT", titleEs: "NO LO ESCUCHASTE BIEN" },
  confirm: { title: "CONFIRM", titleEs: "CONFIRMA" },
  restart: { title: "RESTART", titleEs: "EMPIEZA DE NUEVO" },
  mixed: { title: "REPAIR UNDER PRESSURE", titleEs: "REPARA BAJO PRESIÓN" },
};

/** One prewritten turn that REQUIRES a repair move before answering. */
export function repairTurn(
  id: string,
  kind: RepairKind,
  who: typeof CUSTOMER,
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
/* RECOGNITION TRAINING — "WHAT DOES THIS SITUATION NEED?"                 */
/* Days 5, 10, 15, 20. Never scored, never blocks recording.               */
/* ---------------------------------------------------------------------- */

export type SituationNeedId = "understand" | "explain" | "solve" | "recommend" | "recover";

export const SITUATION_NEEDS: Record<SituationNeedId, { label: string; labelEs: string; cues: string[] }> = {
  understand: { label: "UNDERSTAND", labelEs: "ENTENDER", cues: ["LISTEN", "CLARIFY", "CONFIRM"] },
  explain: { label: "EXPLAIN", labelEs: "EXPLICAR", cues: ["WHAT", "WHY", "NEXT"] },
  solve: { label: "SOLVE", labelEs: "RESOLVER", cues: ["CHECK", "ACTION", "VERIFY"] },
  recommend: { label: "RECOMMEND", labelEs: "RECOMENDAR", cues: ["NEED", "BENEFIT", "CLOSE"] },
  recover: { label: "RECOVER", labelEs: "RECUPERAR", cues: ["ACKNOWLEDGE", "SOLUTION", "CONFIRM"] },
};

export const SITUATION_ROUND = { title: "READ THE SITUATION", titleEs: "LEE LA SITUACIÓN" };

export const ALL_NEEDS: SituationNeedId[] = ["understand", "explain", "solve", "recommend", "recover"];

/**
 * One recognition turn: the learner taps what the situation needs BEFORE
 * speaking, then answers. `expected` is only shown as the best framework —
 * never as a wrong answer, never scored, never blocking.
 */
export function situationTurn(
  id: string,
  who: typeof CUSTOMER,
  text: string,
  es: string,
  voice: "female" | "male",
  options: SituationNeedId[],
  expected: SituationNeedId,
  extra: Partial<RolePlayTurn> = {},
): RolePlayTurn {
  return turn(id, who, text, es, voice, {
    targetSeconds: DEVELOP,
    recognition: {
      prompt: "WHAT DOES THIS SITUATION NEED?",
      promptEs: "¿QUÉ NECESITA ESTA SITUACIÓN?",
      options: options.map((oid) => ({ id: oid, ...SITUATION_NEEDS[oid] })),
      expected,
    },
    ...extra,
  });
}

/* ============================ DAY 1 — UNDERSTAND THE CUSTOMER ============================ */

const d1Sprint: TestReadySprint = {
  type: "repeat",
  title: "LISTEN & REPEAT",
  titleEs: "ESCUCHA Y REPITE",
  instruction: "Natural speed. Listen, then say the whole sentence.",
  instructionEs: "Velocidad natural. Escucha y di la oración completa.",
  items: [
    { id: "a2d1-tr1", audio: "Thanks for calling — how can I help you today?", maxSeconds: 10 },
    { id: "a2d1-tr2", audio: "Just to make sure I understood, the app stopped working this morning.", maxSeconds: 12 },
    { id: "a2d1-tr3", audio: "Let me check that for you — it will only take a moment.", maxSeconds: 12 },
    { id: "a2d1-tr4", audio: "So the problem started after you changed your password, right?", maxSeconds: 12 },
    { id: "a2d1-tr5", audio: "I understand why that's frustrating, and I'm going to help you fix it today.", maxSeconds: 14 },
  ],
};

const d1 = advanced2Day({
  day: 1,
  topic: "Understand the Customer",
  topicEs: "Entiende al cliente",
  focus: "Unclear problem — LISTEN → CLARIFY → CONFIRM",
  focusEs: "Problema poco claro — ESCUCHA → ACLARA → CONFIRMA",
  intro: {
    title: "UNDERSTAND THE CUSTOMER",
    titleEs: "ENTIENDE AL CLIENTE",
    lead: "Today you handle a customer who has a problem but doesn't explain it clearly. Don't guess — use a framework: LISTEN → CLARIFY → CONFIRM.",
    leadEs: "Hoy atiendes a un cliente que tiene un problema pero no lo explica bien. No adivines — usa una estructura: ESCUCHA → ACLARA → CONFIRMA.",
    examples: ["Let me check that for you.", "Just to make sure I understood…", "So you're saying…, right?"],
    goal: "Handle the call for 50–70 seconds, then adapt to a new detail.",
    goalEs: "Atiende la llamada 50–70 segundos y luego adáptate a un dato nuevo.",
    cta: START,
  },
  lines: [
    l("a2d1-1", "Thanks for calling. | How can I help you today?", "Gracias por llamar. ¿Cómo puedo ayudarle hoy?"),
    l("a2d1-2", "I understand why that's frustrating. | Let me check that for you.", "Entiendo por qué eso es frustrante. Déjeme revisarlo."),
    l("a2d1-3", "Just to make sure I understood, | the service stopped working yesterday.", "Solo para asegurarme de que entendí, el servicio dejó de funcionar ayer."),
    l("a2d1-4", "Can I ask you two quick questions | so I can find the problem?", "¿Puedo hacerle dos preguntas rápidas para encontrar el problema?"),
    l("a2d1-5", "So you're saying it works on your phone | but not on your computer, right?", "Entonces me dice que funciona en su teléfono pero no en su computadora, ¿verdad?"),
    l("a2d1-6", "Thank you. | That helps me a lot.", "Gracias. Eso me ayuda mucho."),
    l("a2d1-7", "What I can do is | check your account and confirm what's happening.", "Lo que puedo hacer es revisar su cuenta y confirmar qué está pasando."),
    l("a2d1-8", "I'll stay with you on the line | until we know the next step.", "Me quedo con usted en la línea hasta que sepamos el siguiente paso."),
  ],
  rep2Chunks: chunks4("a2d1"),
  prompts: [
    q("a2d1-p1", "A customer says the service isn't working. What do you say first?", "Un cliente dice que el servicio no funciona. ¿Qué dices primero?", "I understand why that's frustrating…", "Entiendo por qué eso es frustrante…", "LISTEN"),
    q("a2d1-p2", "What two questions do you ask to find the problem?", "¿Qué dos preguntas haces para encontrar el problema?", "Can I ask you two quick questions…", "¿Puedo hacerle dos preguntas rápidas…?", "CLARIFY"),
    q("a2d1-p3", "How do you confirm what you understood?", "¿Cómo confirmas lo que entendiste?", "Just to make sure I understood…", "Solo para asegurarme de que entendí…", "CONFIRM"),
    q("a2d1-p4", "The customer gives you a new detail. How do you react?", "El cliente te da un dato nuevo. ¿Cómo reaccionas?", "Thank you, that helps. So in that case…", "Gracias, eso ayuda. Entonces en ese caso…", "ADAPT", "react"),
    q("a2d1-p5", "How do you close the call?", "¿Cómo cierras la llamada?", "What I can do is…", "Lo que puedo hacer es…", "NEXT STEP"),
  ],
  cues: ["LISTEN", "CLARIFY", "CONFIRM", "NEXT STEP"],
  powerChunks: { core: ["Let me check that for you.", "Just to make sure I understood…"], stretch: "What I can do is…" },
  goalSeconds: [50, 70],
  goalSentences: 7,
  hideModelText: true,
  rep5Prompt: {
    question: "A customer calls with an unclear problem. Handle the call.",
    questionEs: "Un cliente llama con un problema poco claro. Atiende la llamada.",
  },
  rep5Tips: {
    en: "Use the framework, not the model: LISTEN → CLARIFY → CONFIRM → NEXT STEP.",
    es: "Usa la estructura, no el modelo: ESCUCHA → ACLARA → CONFIRMA → SIGUIENTE PASO.",
  },
  rep5Turns: [
    turn("a2d1-turn1", CUSTOMER, "Hi, something is wrong with my service. It just doesn't work.", "Hola, algo anda mal con mi servicio. Simplemente no funciona.", "female", {
      targetSeconds: DEVELOP,
      cues: ["LISTEN", "CLARIFY", "CONFIRM"],
      toolbox: ["I understand why that's frustrating.", "Can I ask you two quick questions?"],
    }),
    turn("a2d1-turn2", CUSTOMER, "Well, actually it works on my phone. It only fails on my laptop, and it started after an update.", "Bueno, en realidad sí funciona en mi teléfono. Solo falla en mi laptop, y empezó después de una actualización.", "female", {
      targetSeconds: DEVELOP,
      cues: ["CONFIRM", "NEXT STEP"],
      toolbox: ["So you're saying…, right?", "What I can do is…"],
    }),
    repairTurn("a2d1-repair", "time", CUSTOMER, "And how long has this problem been affecting other customers like me?", "¿Y cuánto tiempo lleva este problema afectando a otros clientes como yo?", "female"),
  ],
  speakerVoice: "female",
  testReady: d1Sprint,
});

/* ============================ DAY 2 — MAKE A RESERVATION ============================ */

const d2Sprint: TestReadySprint = {
  type: "listen-respond",
  title: "LISTEN & RESPOND",
  titleEs: "ESCUCHA Y RESPONDE",
  instruction: "Listen to the guest, then answer in one or two sentences.",
  instructionEs: "Escucha al huésped y responde en una o dos oraciones.",
  items: [
    { id: "a2d2-lr1", audio: "Do you have a room available for this weekend?", maxSeconds: 15 },
    { id: "a2d2-lr2", audio: "How much is the room per night?", maxSeconds: 15 },
    { id: "a2d2-lr3", audio: "Can I change my reservation to Friday instead?", maxSeconds: 15 },
    { id: "a2d2-lr4", audio: "Is breakfast included in that price?", maxSeconds: 15 },
    { id: "a2d2-lr5", audio: "Could you confirm everything for me, please?", maxSeconds: 18 },
  ],
};

const d2 = advanced2Day({
  day: 2,
  topic: "Make a Reservation",
  topicEs: "Haz una reservación",
  focus: "Hotel reservation — NEED → OPTIONS → CONFIRM",
  focusEs: "Reservación de hotel — NECESIDAD → OPCIONES → CONFIRMA",
  intro: {
    title: "MAKE A RESERVATION",
    titleEs: "HAZ UNA RESERVACIÓN",
    lead: "Today you take a hotel reservation — and the guest changes their mind. Framework: NEED → OPTIONS → CONFIRM.",
    leadEs: "Hoy tomas una reservación de hotel — y el huésped cambia de idea. Estructura: NECESIDAD → OPCIONES → CONFIRMA.",
    examples: ["Let me see what we have.", "The best option would be…", "Would that work for you?"],
    goal: "Take the reservation and adapt when the details change.",
    goalEs: "Toma la reservación y adáptate cuando cambien los detalles.",
    cta: START,
  },
  lines: [
    l("a2d2-1", "Thank you for calling. | How can I help you with your reservation?", "Gracias por llamar. ¿Cómo puedo ayudarle con su reservación?"),
    l("a2d2-2", "Let me see what we have | for those dates.", "Déjeme ver qué tenemos para esas fechas."),
    l("a2d2-3", "We have two options: | a standard room and a room with a city view.", "Tenemos dos opciones: una habitación estándar y una con vista a la ciudad."),
    l("a2d2-4", "The standard room is ninety dollars a night, | and breakfast is included.", "La habitación estándar cuesta noventa dólares por noche, y el desayuno está incluido."),
    l("a2d2-5", "In that case, | the best option would be the room with two beds.", "En ese caso, la mejor opción sería la habitación con dos camas."),
    l("a2d2-6", "No problem, | I can change the date for you.", "No hay problema, puedo cambiarle la fecha."),
    l("a2d2-7", "Just to confirm, | that's two nights for two guests, arriving Friday.", "Solo para confirmar, son dos noches para dos personas, llegando el viernes."),
    l("a2d2-8", "I'll send the confirmation to your email. | Would that work for you?", "Le envío la confirmación a su correo. ¿Le funciona así?"),
  ],
  rep2Chunks: chunks4("a2d2"),
  prompts: [
    q("a2d2-p1", "A guest wants a room this weekend. What do you ask?", "Un huésped quiere una habitación este fin de semana. ¿Qué preguntas?", "Let me see what we have…", "Déjeme ver qué tenemos…", "NEED"),
    q("a2d2-p2", "Give the guest two options.", "Dale dos opciones al huésped.", "We have two options:…", "Tenemos dos opciones:…", "OPTIONS"),
    q("a2d2-p3", "The guest changes the date. What do you say?", "El huésped cambia la fecha. ¿Qué dices?", "No problem, I can change…", "No hay problema, puedo cambiar…", "ADAPT", "react"),
    q("a2d2-p4", "The guest asks for a lower price. Answer professionally.", "El huésped pide un precio más bajo. Responde profesionalmente.", "In that case, the best option would be…", "En ese caso, la mejor opción sería…", "OPTIONS", "justify"),
    q("a2d2-p5", "Confirm the whole reservation.", "Confirma toda la reservación.", "Just to confirm, that's…", "Solo para confirmar, son…", "CONFIRM"),
  ],
  cues: ["NEED", "OPTIONS", "ADAPT", "CONFIRM"],
  powerChunks: { core: ["Let me see what we have.", "The best option would be…"], stretch: "Would that work for you?" },
  goalSeconds: [50, 70],
  goalSentences: 7,
  hideModelText: true,
  rep5Prompt: {
    question: "A guest calls to book a room — and keeps changing the details.",
    questionEs: "Un huésped llama para reservar — y sigue cambiando los detalles.",
  },
  rep5Tips: {
    en: "NEED → OPTIONS → CONFIRM. When the detail changes, confirm the new information out loud.",
    es: "NECESIDAD → OPCIONES → CONFIRMA. Cuando cambie un dato, confírmalo en voz alta.",
  },
  rep5Turns: [
    turn("a2d2-turn1", GUEST, "Hi, I'd like a room for two nights this weekend, please.", "Hola, quisiera una habitación para dos noches este fin de semana, por favor.", "male", {
      targetSeconds: DEVELOP,
      cues: ["NEED", "OPTIONS"],
      toolbox: ["Let me see what we have.", "We have two options:…"],
    }),
    turn("a2d2-turn2", GUEST, "Actually, make it three nights, and my wife is coming with me.", "De hecho, que sean tres noches, y mi esposa viene conmigo.", "male", {
      targetSeconds: DEVELOP,
      cues: ["ADAPT", "OPTIONS"],
      toolbox: ["No problem, I can change that.", "In that case, the best option would be…"],
    }),
    turn("a2d2-turn3", GUEST, "That's a little more than I wanted to spend. What else do you have?", "Es un poco más de lo que quería gastar. ¿Qué más tienen?", "male", {
      targetSeconds: DEVELOP,
      cues: ["OPTIONS", "CONFIRM"],
      toolbox: ["What I can do is…", "Would that work for you?"],
    }),
    repairTurn("a2d2-repair", "catch", GUEST, "And can you also add the airport shuttle for Saturday at six forty-five?", "¿Y puede agregar también el transporte al aeropuerto el sábado a las seis cuarenta y cinco?", "male"),
  ],
  speakerVoice: "female",
  testReady: d2Sprint,
});

/* ============================ DAY 3 — EXPLAIN WHAT IS HAPPENING ============================ */

const d3Sprint: TestReadySprint = {
  type: "describe-scene",
  title: "DESCRIBE THE SITUATION",
  titleEs: "DESCRIBE LA SITUACIÓN",
  instruction: "Read the situation and explain the status out loud: WHAT → WHERE → ACTION → NEXT.",
  instructionEs: "Lee la situación y explica el estado en voz alta: QUÉ → DÓNDE → ACCIÓN → SIGUIENTE.",
  items: [
    { id: "a2d3-ds1", text: "An order left the warehouse but is stuck at the delivery center.", textEs: "Un pedido salió del almacén pero está detenido en el centro de reparto.", maxSeconds: 40 },
    { id: "a2d3-ds2", text: "A payment was received but the account still shows as unpaid.", textEs: "Se recibió un pago pero la cuenta sigue como no pagada.", maxSeconds: 40 },
    { id: "a2d3-ds3", text: "A reservation exists, but the room type is not available anymore.", textEs: "La reservación existe, pero el tipo de habitación ya no está disponible.", maxSeconds: 40 },
  ],
};

const d3 = advanced2Day({
  day: 3,
  topic: "Explain What Is Happening",
  topicEs: "Explica qué está pasando",
  focus: "Service status — WHAT → WHERE → ACTION → NEXT",
  focusEs: "Estado del servicio — QUÉ → DÓNDE → ACCIÓN → SIGUIENTE",
  intro: {
    title: "EXPLAIN WHAT IS HAPPENING",
    titleEs: "EXPLICA QUÉ ESTÁ PASANDO",
    lead: "The customer wants to know the status of their order or account. Be clear and finish with a next step: WHAT → WHERE → ACTION → NEXT.",
    leadEs: "El cliente quiere saber el estado de su pedido o cuenta. Sé claro/a y termina con un siguiente paso: QUÉ → DÓNDE → ACCIÓN → SIGUIENTE.",
    examples: ["Let me explain what happened.", "Right now it's…", "The next step is…"],
    goal: "Explain the status clearly, then answer a follow-up question.",
    goalEs: "Explica el estado con claridad y luego responde una repregunta.",
    cta: START,
  },
  lines: [
    l("a2d3-1", "Let me explain what happened | with your order.", "Déjeme explicarle qué pasó con su pedido."),
    l("a2d3-2", "Your payment went through, | so the order is confirmed.", "Su pago se procesó, así que el pedido está confirmado."),
    l("a2d3-3", "Right now, | the package is at the local delivery center.", "Ahora mismo, el paquete está en el centro de reparto local."),
    l("a2d3-4", "The thing is, | there was a delay because of the weather.", "La cosa es que hubo un retraso por el clima."),
    l("a2d3-5", "What I've done is | send a note to the delivery team.", "Lo que hice fue enviar una nota al equipo de reparto."),
    l("a2d3-6", "The next step is | a new delivery attempt tomorrow morning.", "El siguiente paso es un nuevo intento de entrega mañana por la mañana."),
    l("a2d3-7", "You'll get a message | as soon as the driver is on the way.", "Usted recibirá un mensaje en cuanto el repartidor vaya en camino."),
    l("a2d3-8", "If it doesn't arrive tomorrow, | call us and I'll open a claim for you.", "Si no llega mañana, llámenos y yo abriré un reclamo por usted."),
  ],
  rep2Chunks: chunks4("a2d3"),
  prompts: [
    q("a2d3-p1", "A customer asks what is happening with their order. Start your answer.", "Un cliente pregunta qué pasa con su pedido. Empieza tu respuesta.", "Let me explain what happened…", "Déjeme explicarle qué pasó…", "WHAT"),
    q("a2d3-p2", "Where is it right now?", "¿Dónde está ahora mismo?", "Right now, it's…", "Ahora mismo está…", "WHERE"),
    q("a2d3-p3", "What have you already done?", "¿Qué ya hiciste?", "What I've done is…", "Lo que hice fue…", "ACTION"),
    q("a2d3-p4", "What is the next step and when?", "¿Cuál es el siguiente paso y cuándo?", "The next step is…", "El siguiente paso es…", "NEXT"),
    q("a2d3-p5", "The customer asks: 'And if it doesn't arrive?' Answer.", "El cliente pregunta: '¿Y si no llega?' Responde.", "If it doesn't arrive, I'll…", "Si no llega, yo…", "PROMISE", "explain"),
  ],
  cues: ["WHAT", "WHERE", "ACTION", "NEXT"],
  powerChunks: { core: ["Let me explain what happened.", "The next step is…"], stretch: "The thing is…" },
  goalSeconds: [50, 70],
  goalSentences: 7,
  hideModelText: true,
  rep5Prompt: {
    question: "A customer wants to know what is happening with their order.",
    questionEs: "Un cliente quiere saber qué está pasando con su pedido.",
  },
  rep5Tips: {
    en: "WHAT → WHERE → ACTION → NEXT. Never end without a concrete next step.",
    es: "QUÉ → DÓNDE → ACCIÓN → SIGUIENTE. Nunca termines sin un siguiente paso concreto.",
  },
  rep5Turns: [
    turn("a2d3-turn1", CUSTOMER, "Can you tell me what is happening with my order? I paid four days ago.", "¿Me puede decir qué está pasando con mi pedido? Pagué hace cuatro días.", "male", {
      targetSeconds: DEVELOP,
      cues: ["WHAT", "WHERE", "ACTION", "NEXT"],
      toolbox: ["Let me explain what happened.", "Right now, it's…"],
    }),
    turn("a2d3-turn2", CUSTOMER, "Sorry, I don't understand. Is my money gone or is the package coming?", "Perdón, no entiendo. ¿Se perdió mi dinero o el paquete viene en camino?", "male", {
      targetSeconds: DEVELOP,
      cues: ["CONFIRM", "NEXT"],
      toolbox: ["Let me explain that again, simply:", "So the situation is…"],
    }),
    repairTurn("a2d3-repair", "restart", CUSTOMER, "You lost me. Can you say that in a simpler way?", "Me perdí. ¿Me lo puede decir de forma más simple?", "male"),
  ],
  speakerVoice: "female",
  testReady: d3Sprint,
});

/* ============================ DAY 4 — EXPLAIN A BILL ============================ */

const d4Sprint: TestReadySprint = {
  type: "quick-answers",
  title: "QUICK ANSWERS",
  titleEs: "RESPUESTAS RÁPIDAS",
  instruction: "Answer each question in 10–15 seconds. Don't prepare — just answer.",
  instructionEs: "Responde cada pregunta en 10–15 segundos. No prepares — solo responde.",
  items: [
    { id: "a2d4-qa1", audio: "Why is my bill higher this month?", maxSeconds: 15 },
    { id: "a2d4-qa2", audio: "I don't recognize this charge. What is it?", maxSeconds: 15 },
    { id: "a2d4-qa3", audio: "Can you remove it?", maxSeconds: 15 },
    { id: "a2d4-qa4", audio: "When will I see the refund?", maxSeconds: 15 },
    { id: "a2d4-qa5", audio: "How do I stop this from happening again?", maxSeconds: 15 },
  ],
};

const d4 = advanced2Day({
  day: 4,
  topic: "Explain a Bill",
  topicEs: "Explica un cobro",
  focus: "Unexpected charge — CHARGE → REASON → OPTION → CONFIRM",
  focusEs: "Cobro inesperado — COBRO → RAZÓN → OPCIÓN → CONFIRMA",
  intro: {
    title: "EXPLAIN A BILL",
    titleEs: "EXPLICA UN COBRO",
    lead: "A customer doesn't recognize a charge. Stay calm, explain it clearly and offer an option: CHARGE → REASON → OPTION → CONFIRM.",
    leadEs: "Un cliente no reconoce un cobro. Mantén la calma, explícalo claro y ofrece una opción: COBRO → RAZÓN → OPCIÓN → CONFIRMA.",
    examples: ["Let me explain that charge.", "What happened was…", "What I can do is…"],
    goal: "Explain the charge and hold your explanation calmly when the customer pushes back.",
    goalEs: "Explica el cobro y sostén tu explicación con calma cuando el cliente insista.",
    cta: START,
  },
  lines: [
    l("a2d4-1", "I understand — | let me explain that charge.", "Le entiendo — déjeme explicarle ese cobro."),
    l("a2d4-2", "On your bill, | there are two charges from this month.", "En su factura hay dos cobros de este mes."),
    l("a2d4-3", "What happened was | your plan changed on the fifteenth.", "Lo que pasó fue que su plan cambió el día quince."),
    l("a2d4-4", "So this month | you were charged for both plans.", "Entonces este mes se le cobraron los dos planes."),
    l("a2d4-5", "I know that wasn't clear, | and I'm sorry about that.", "Sé que eso no fue claro, y lo lamento."),
    l("a2d4-6", "What I can do is | apply a credit for the difference.", "Lo que puedo hacer es aplicar un crédito por la diferencia."),
    l("a2d4-7", "You'll see it on your next bill, | in about five business days.", "Lo verá en su próxima factura, en unos cinco días hábiles."),
    l("a2d4-8", "Just to confirm, | your next payment will be the normal amount.", "Solo para confirmar, su próximo pago será el monto normal."),
  ],
  rep2Chunks: chunks4("a2d4"),
  prompts: [
    q("a2d4-p1", "A customer says: 'I don't recognize this charge.' First sentence?", "Un cliente dice: 'No reconozco este cobro'. ¿Primera oración?", "I understand — let me explain that charge.", "Le entiendo — déjeme explicarle ese cobro.", "CHARGE"),
    q("a2d4-p2", "Explain why the charge exists.", "Explica por qué existe el cobro.", "What happened was…", "Lo que pasó fue…", "REASON", "explain"),
    q("a2d4-p3", "The customer says your explanation is wrong. Respond calmly.", "El cliente dice que tu explicación está mal. Responde con calma.", "I hear you. Let me check it again with you.", "Le escucho. Revisémoslo juntos otra vez.", "STAY CALM", "react"),
    q("a2d4-p4", "Offer one concrete option.", "Ofrece una opción concreta.", "What I can do is…", "Lo que puedo hacer es…", "OPTION"),
    q("a2d4-p5", "Confirm what happens next.", "Confirma qué pasa después.", "Just to confirm…", "Solo para confirmar…", "CONFIRM"),
  ],
  cues: ["CHARGE", "REASON", "OPTION", "CONFIRM"],
  powerChunks: { core: ["Let me explain that charge.", "What happened was…"], stretch: "Just to confirm…" },
  goalSeconds: [50, 70],
  goalSentences: 7,
  hideModelText: true,
  rep5Prompt: {
    question: "A customer doesn't recognize a charge on their bill.",
    questionEs: "Un cliente no reconoce un cobro en su factura.",
  },
  rep5Tips: {
    en: "CHARGE → REASON → OPTION → CONFIRM. Don't argue — explain and offer.",
    es: "COBRO → RAZÓN → OPCIÓN → CONFIRMA. No discutas — explica y ofrece.",
  },
  rep5Turns: [
    turn("a2d4-turn1", CUSTOMER, "There's a charge here I don't recognize. I never agreed to this.", "Hay un cobro aquí que no reconozco. Yo nunca acepté esto.", "female", {
      targetSeconds: DEVELOP,
      cues: ["CHARGE", "REASON"],
      toolbox: ["Let me explain that charge.", "What happened was…"],
    }),
    turn("a2d4-turn2", CUSTOMER, "That's not what the other agent told me. Somebody is wrong here.", "Eso no es lo que me dijo el otro agente. Alguien está equivocado aquí.", "female", {
      targetSeconds: DEVELOP,
      cues: ["STAY CALM", "OPTION"],
      toolbox: ["I hear you.", "What I can do is…"],
    }),
    repairTurn("a2d4-repair", "confirm", CUSTOMER, "So are you telling me I'm paying twice for the same month?", "¿Entonces me está diciendo que estoy pagando dos veces el mismo mes?", "female"),
  ],
  speakerVoice: "female",
  testReady: d4Sprint,
});

/* ============================ DAY 5 — HANDLE A MONEY TRANSFER (WEEK 1 CHECKPOINT) ============================ */

const d5Sprint: TestReadySprint = {
  type: "mixed",
  title: "MIXED SPRINT",
  titleEs: "SPRINT MIXTO",
  instruction: "Five different drills. Optional practice — never scored.",
  instructionEs: "Cinco ejercicios distintos. Práctica opcional — nunca se califica.",
  items: [
    { id: "a2d5-m1", kind: "repeat", audio: "Let me verify that with the reference number you have.", maxSeconds: 12 },
    { id: "a2d5-m2", kind: "quick-answers", audio: "Where is my money right now?", maxSeconds: 15 },
    { id: "a2d5-m3", kind: "listen-respond", audio: "I sent it yesterday and my family still hasn't received it.", maxSeconds: 20 },
    { id: "a2d5-m4", kind: "speak-now", text: "Explain to a worried customer how you will check a transfer.", textEs: "Explica a un cliente preocupado cómo vas a revisar una transferencia.", thinkSeconds: 10, maxSeconds: 40 },
    { id: "a2d5-m5", kind: "quick-answers", audio: "So when exactly will it arrive?", maxSeconds: 15 },
  ],
};

const d5 = advanced2Day({
  day: 5,
  topic: "Handle a Money Transfer",
  topicEs: "Maneja una transferencia",
  focus: "Worried customer — VERIFY → EXPLAIN → SOLVE → CONFIRM",
  focusEs: "Cliente preocupado — VERIFICA → EXPLICA → RESUELVE → CONFIRMA",
  intro: {
    title: "HANDLE A MONEY TRANSFER",
    titleEs: "MANEJA UNA TRANSFERENCIA",
    lead: "Money makes people nervous. Slow down, verify, explain and commit to a next step: VERIFY → EXPLAIN → SOLVE → CONFIRM.",
    leadEs: "El dinero pone nerviosa a la gente. Baja el ritmo, verifica, explica y comprométete con un siguiente paso: VERIFICA → EXPLICA → RESUELVE → CONFIRMA.",
    examples: ["Let me verify that for you.", "In this case…", "Here's exactly what happens next."],
    goal: "Handle three customer turns without losing control of the conversation.",
    goalEs: "Maneja tres turnos del cliente sin perder el control de la conversación.",
    cta: START,
  },
  lines: [
    l("a2d5-1", "I understand — | money is important, and I'll help you with this.", "Le entiendo — el dinero es importante, y le voy a ayudar con esto."),
    l("a2d5-2", "Let me verify that for you | with your reference number.", "Déjeme verificarlo con su número de referencia."),
    l("a2d5-3", "I can see the transfer here, | and it was sent yesterday afternoon.", "Puedo ver la transferencia aquí, y se envió ayer por la tarde."),
    l("a2d5-4", "In this case, | the bank on the other side is still processing it.", "En este caso, el banco del otro lado todavía la está procesando."),
    l("a2d5-5", "That's normal | for international transfers on a weekend.", "Eso es normal en transferencias internacionales durante el fin de semana."),
    l("a2d5-6", "What I can do is | put a priority note on your transfer today.", "Lo que puedo hacer es poner una nota de prioridad en su transferencia hoy."),
    l("a2d5-7", "Here's exactly what happens next: | you'll get a text when the money is available.", "Esto es exactamente lo que sigue: recibirá un mensaje cuando el dinero esté disponible."),
    l("a2d5-8", "If it isn't there by Monday, | call me back and I'll open an investigation.", "Si no está para el lunes, llámeme y abriré una investigación."),
  ],
  rep2Chunks: chunks4("a2d5"),
  prompts: [
    q("a2d5-p1", "A customer says their money hasn't arrived. First response?", "Un cliente dice que su dinero no ha llegado. ¿Primera respuesta?", "I understand — let me verify that for you.", "Le entiendo — déjeme verificarlo.", "VERIFY"),
    q("a2d5-p2", "Explain why the transfer is delayed.", "Explica por qué la transferencia está retrasada.", "In this case…", "En este caso…", "EXPLAIN", "explain"),
    q("a2d5-p3", "Offer one action you can take today.", "Ofrece una acción que puedes hacer hoy.", "What I can do is…", "Lo que puedo hacer es…", "SOLVE"),
    q("a2d5-p4", "The customer asks exactly when. Answer without promising the impossible.", "El cliente pregunta exactamente cuándo. Responde sin prometer lo imposible.", "Here's exactly what happens next:…", "Esto es exactamente lo que sigue:…", "CONFIRM", "justify"),
    q("a2d5-p5", "Close the call so the customer feels safe.", "Cierra la llamada para que el cliente se sienta seguro.", "If it isn't there by…, I'll…", "Si no está para…, yo…", "PROMISE"),
  ],
  cues: ["VERIFY", "EXPLAIN", "SOLVE", "CONFIRM"],
  powerChunks: { core: ["Let me verify that for you.", "In this case…"], stretch: "Here's exactly what happens next:" },
  goalSeconds: [60, 80],
  goalSentences: 8,
  hideModelText: true,
  rep5Prompt: {
    question: "A worried customer says their money transfer hasn't arrived.",
    questionEs: "Un cliente preocupado dice que su transferencia no ha llegado.",
  },
  rep5Tips: {
    en: "VERIFY → EXPLAIN → SOLVE → CONFIRM. Calm voice, concrete next step.",
    es: "VERIFICA → EXPLICA → RESUELVE → CONFIRMA. Voz tranquila, siguiente paso concreto.",
  },
  rep5Turns: [
    situationTurn("a2d5-rec1", CUSTOMER, "My money hasn't arrived. My family is waiting for it.", "Mi dinero no ha llegado. Mi familia lo está esperando.", "female", ALL_NEEDS, "understand", {
      round: { n: 1, ...SITUATION_ROUND },
      cues: ["VERIFY", "EXPLAIN"],
      toolbox: ["I understand — let me verify that for you."],
    }),
    turn("a2d5-turn2", CUSTOMER, "But I sent it yesterday. Why isn't the money there?", "Pero la envié ayer. ¿Por qué no está el dinero?", "female", {
      targetSeconds: DEVELOP,
      cues: ["EXPLAIN", "SOLVE"],
      toolbox: ["In this case…", "What I can do is…"],
    }),
    turn("a2d5-turn3", CUSTOMER, "So when exactly will it arrive?", "¿Entonces cuándo exactamente va a llegar?", "female", {
      targetSeconds: QUICK,
      cues: ["CONFIRM"],
      toolbox: ["Here's exactly what happens next:"],
    }),
    repairTurn("a2d5-repair", "mixed", CUSTOMER, "And what is the reference number on the receipt you're looking at?", "¿Y cuál es el número de referencia del recibo que está viendo?", "female"),
  ],
  speakerVoice: "female",
  testReady: d5Sprint,
});

export const ADVANCED_2_WEEK_1_DAYS: CourseDay[] = [d1, d2, d3, d4, d5];
