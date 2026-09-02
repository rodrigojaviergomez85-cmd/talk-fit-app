/**
 * ADVANCED 1 — GET HIRED · WEEK 1: TELL YOUR STORY & GET HIRED (Days 1–5)
 *
 * Advanced is CYCLICAL: A1 / A2 / A3 are equivalent entry points, never levels.
 * Only Week 1 is built here. Weeks 2–4 do not exist yet (no placeholders).
 *
 * DATA SAFETY: the module id ("advanced-1"), the day numbers and every
 * `a1d*` id are persisted in learner progress and recordings. Never rename.
 *
 * Principle: DO NOT TEACH THE PERFECT ANSWER. TEACH HOW TO BUILD AN ANSWER.
 * Every recruiter / customer turn is FIXED and prewritten — no generative AI,
 * no grading, no coach.
 */
import type { CourseDay, RepCopy, RolePlayTurn, TestReadySprint } from "@/lib/types";
import { l, makeDay, type EaglesDayInput, type WeekMeta } from "./eagles-week-1-course";
import { q, chunks4 } from "./tigers-week-1-course";
import { bankQuestion } from "./advanced-question-bank";

import sceneD1 from "@/assets/advanced-1/scene-d01.jpg";
import sceneD2 from "@/assets/advanced-1/scene-d02.jpg";
import sceneD3 from "@/assets/advanced-1/scene-d03.jpg";
import sceneD4 from "@/assets/advanced-1/scene-d04.jpg";
import sceneD5 from "@/assets/advanced-1/scene-d05.jpg";
import testReadyScene from "@/assets/advanced-1/test-ready-scene.jpg";

export const ADVANCED_1_WEEKS: (WeekMeta & { subtitle: string; behavior: string })[] = [
  {
    week: 1,
    title: "Tell Your Story & Get Hired",
    subtitle: "Tell me about yourself · A real experience · Why hire you · Weakness & goals · Recruiter Pressure Round",
    subtitleEs: "Háblame de ti · Una experiencia real · Por qué contratarte · Debilidad y metas · Pressure Round del reclutador",
    behavior: "GET HIRED",
  },
];

/** Spanish-first Advanced instructions. Learning content stays in English. */
const ADVANCED_REP_COPY: RepCopy = {
  rep1: { es: ["ESCUCHA", "Escucha cómo se organiza la respuesta."], en: ["LISTEN", "Listen to how the answer is organized."] },
  rep2: { es: ["COPIA", "Escucha las 2 ideas y grábalas juntas."], en: ["COPY", "Listen to the 2 ideas and record them together."] },
  rep3: { es: ["SHADOWING", "Habla al mismo tiempo que el audio."], en: ["SHADOWING", "Speak at the same time as the audio."] },
  rep4: { es: ["PIENSA Y RESPONDE", "Desarrolla tu propia respuesta."], en: ["THINK & ANSWER", "Develop your own answer."] },
  rep5: { es: ["PRESSURE ROUND", "Responde sin memorizar."], en: ["PRESSURE ROUND", "Answer without memorizing."] },
};

type AdvancedDayInput = EaglesDayInput & { testReadyOptional?: boolean };

export function advancedDay(input: AdvancedDayInput): CourseDay {
  const { testReadyOptional, ...rest } = input;
  // Every ADVANCED Test Ready Sprint is optional extra practice — it never blocks the day.
  const optional = testReadyOptional ?? Boolean(rest.testReady);
  return {
    ...makeDay({ estimatedMinutes: "8–12 min", ...rest }, ADVANCED_1_WEEKS),
    repCopy: ADVANCED_REP_COPY,
    ...(optional ? { testReadyOptional: true } : {}),
  };
}

const START = "START REP 1";
const RECRUITER = { label: "RECRUITER", labelEs: "RECLUTADOR/A" };
const CUSTOMER = { label: "CUSTOMER", labelEs: "CLIENTE" };

/** ⚡ QUICK ≈ 15–30s · 🎤 DEVELOP ≈ 30–60s · 🔥 SUSTAIN ≈ 60–120s total. */
const QUICK: [number, number] = [20, 30];

function turn(
  id: string,
  who: typeof RECRUITER,
  text: string,
  es: string,
  voice: "female" | "male",
  extra: Partial<RolePlayTurn> = {},
): RolePlayTurn {
  return { id, label: who.label, labelEs: who.labelEs, text, es, voice, ...extra };
}

/* ============================ DAY 1 — TELL ME ABOUT YOURSELF ============================ */

const tmay = bankQuestion("tmay-1");

const d1 = advancedDay({
  day: 1,
  topic: "Tell Me About Yourself",
  topicEs: "Háblame de ti",
  focus: "Professional introduction — NOW → BACKGROUND → STRENGTH → GOAL",
  focusEs: "Presentación profesional — AHORA → EXPERIENCIA → FORTALEZA → META",
  intro: {
    title: "TELL ME ABOUT YOURSELF",
    titleEs: "HÁBLAME DE TI",
    lead: "Build a professional introduction without sounding memorized. Not your name, age or hobbies — use a framework: NOW → BACKGROUND → STRENGTH → GOAL.",
    leadEs: "Construye una presentación profesional sin sonar memorizado/a. No tu nombre, edad o hobbies — usa una estructura: AHORA → EXPERIENCIA → FORTALEZA → META.",
    examples: ["Right now, I'm focused on…", "One of my strengths is…", "What I'm looking for is…"],
    goal: "Answer for 60–75 seconds, then handle a surprise follow-up.",
    goalEs: "Responde 60–75 segundos y luego maneja una repregunta sorpresa.",
    cta: START,
  },
  lines: [
    l("a1d1-1", "I'm currently improving my English | because I want to work in an international environment.", "Actualmente estoy mejorando mi inglés porque quiero trabajar en un ambiente internacional."),
    l("a1d1-2", "I've had experience | working with different types of people.", "He tenido experiencia trabajando con diferentes tipos de personas."),
    l("a1d1-3", "One thing I've learned is | how important clear communication is.", "Algo que he aprendido es lo importante que es la comunicación clara."),
    l("a1d1-4", "One of my strengths is | that I learn quickly.", "Una de mis fortalezas es que aprendo rápido."),
    l("a1d1-5", "For example, when I need to learn something new, | I usually practice until I understand it well.", "Por ejemplo, cuando necesito aprender algo nuevo, normalmente practico hasta entenderlo bien."),
    l("a1d1-6", "Right now, | I'm focused on becoming a stronger communicator.", "Ahora mismo, estoy enfocado/a en convertirme en un/a mejor comunicador/a."),
    l("a1d1-7", "I'm also looking for an opportunity | where I can continue growing professionally.", "También estoy buscando una oportunidad donde pueda seguir creciendo profesionalmente."),
    l("a1d1-8", "Overall, I want to bring a positive attitude | and keep developing my skills.", "En general, quiero aportar una actitud positiva y seguir desarrollando mis habilidades."),
  ],
  rep2Chunks: chunks4("a1d1"),
  prompts: [
    q("a1d1-p1", "What are you doing right now?", "¿Qué estás haciendo ahora mismo?", "Right now, I'm focused on…", "Ahora mismo, estoy enfocado/a en…", "NOW"),
    q("a1d1-p2", "What experience do you have?", "¿Qué experiencia tienes?", "I've had experience…", "He tenido experiencia…", "BACKGROUND"),
    q("a1d1-p3", "What is one strength you have?", "¿Cuál es una fortaleza que tienes?", "One of my strengths is…", "Una de mis fortalezas es…", "STRENGTH"),
    q("a1d1-p4", "Can you give me a real example of that strength?", "¿Puedes darme un ejemplo real de esa fortaleza?", "For example, when…", "Por ejemplo, cuando…", "EVIDENCE", "justify"),
    q("a1d1-p5", "What are you looking for in your next opportunity?", "¿Qué buscas en tu próxima oportunidad?", "What I'm looking for is…", "Lo que busco es…", "GOAL"),
  ],
  cues: ["NOW", "BACKGROUND", "STRENGTH", "EXAMPLE", "GOAL"],
  powerChunks: { core: ["Right now, I'm focused on…", "One of my strengths is…"], stretch: "What I'm looking for is…" },
  sceneImage: { src: sceneD1, alt: "A candidate introducing herself to a recruiter in a modern office", altEs: "Una candidata presentándose a un reclutador en una oficina moderna" },
  goalSeconds: [75, 100],
  goalSentences: 8,
  hideModelText: true,
  rep5Prompt: { question: tmay.text, questionEs: tmay.es },
  rep5Tips: {
    en: "Use the framework, not the model: NOW → BACKGROUND → STRENGTH → EXAMPLE → GOAL. Real details from YOUR life.",
    es: "Usa la estructura, no el modelo: AHORA → EXPERIENCIA → FORTALEZA → EJEMPLO → META. Detalles reales de TU vida.",
  },
  rep5Turns: [
    turn("a1d1-turn1", RECRUITER, tmay.text, tmay.es, "female", { targetSeconds: [60, 75], cues: ["NOW", "BACKGROUND", "STRENGTH", "EXAMPLE", "GOAL"] }),
    turn("a1d1-turn2", RECRUITER, tmay.followUp!.text, tmay.followUp!.es, "female", { targetSeconds: QUICK }),
  ],
  speakerVoice: "female",
});

/* ============================ DAY 2 — TELL ME ABOUT A REAL EXPERIENCE ============================ */

const story = bankQuestion("story-1");

const d2Sprint: TestReadySprint = {
  type: "repeat",
  title: "LISTEN & REPEAT",
  titleEs: "ESCUCHA Y REPITE",
  instruction: "Natural speed. Listen, then say the whole sentence. Five sentences, each one a little longer.",
  instructionEs: "Velocidad natural. Escucha y di la oración completa. Cinco oraciones, cada una un poco más larga.",
  items: [
    { id: "a1d2-tr1", audio: "The customer called yesterday because her order had not arrived.", maxSeconds: 12 },
    { id: "a1d2-tr2", audio: "While I was training, my supervisor asked me to help a new coworker.", maxSeconds: 12 },
    { id: "a1d2-tr3", audio: "The new employee was helping a customer when the system suddenly stopped working.", maxSeconds: 14 },
    { id: "a1d2-tr4", audio: "At first I wasn't sure what to do, but I stayed calm and asked one quick question.", maxSeconds: 14 },
    { id: "a1d2-tr5", audio: "What I learned from that experience was that asking for help is better than pretending you know everything.", maxSeconds: 16 },
  ],
};

const d2 = advancedDay({
  day: 2,
  topic: "Tell Me About a Real Experience",
  topicEs: "Cuéntame una experiencia real",
  focus: "Simple past + past progressive — SETTING → ACTION → PROBLEM → REACTION → RESULT / LESSON",
  focusEs: "Pasado simple + pasado progresivo — ESCENA → ACCIÓN → PROBLEMA → REACCIÓN → RESULTADO / LECCIÓN",
  intro: {
    title: "A REAL EXPERIENCE",
    titleEs: "UNA EXPERIENCIA REAL",
    lead: "Behavioral interview storytelling. Any first day, new job, new class or unexpected situation works — the framework is what matters.",
    leadEs: "Historias para entrevistas conductuales. Sirve cualquier primer día, trabajo nuevo, clase nueva o situación inesperada — lo importante es la estructura.",
    examples: ["While I was…", "At first…", "What I learned from that experience was…"],
    goal: "Tell it in order for 60–75 seconds, then answer a follow-up.",
    goalEs: "Cuéntala en orden durante 60–75 segundos y luego responde una repregunta.",
    cta: START,
  },
  lines: [
    l("a1d2-1", "On my first day at a new job, | I was feeling nervous | because everything was unfamiliar.", "En mi primer día en un trabajo nuevo, me sentía nervioso/a porque todo era desconocido."),
    l("a1d2-2", "My supervisor was explaining my responsibilities | when a customer suddenly asked me for help.", "Mi supervisor estaba explicándome mis responsabilidades cuando de repente un cliente me pidió ayuda."),
    l("a1d2-3", "At first, | I wasn't sure what to do.", "Al principio, no estaba seguro/a de qué hacer."),
    l("a1d2-4", "However, I stayed calm | and listened carefully.", "Sin embargo, me mantuve tranquilo/a y escuché con atención."),
    l("a1d2-5", "I asked my supervisor one quick question | so I could understand the process.", "Le hice una pregunta rápida a mi supervisor para poder entender el proceso."),
    l("a1d2-6", "After that, | I helped the customer with the information I had.", "Después de eso, ayudé al cliente con la información que tenía."),
    l("a1d2-7", "In the end, | everything went well.", "Al final, todo salió bien."),
    l("a1d2-8", "What I learned from that experience was | that asking for help can be better | than pretending you know everything.", "Lo que aprendí de esa experiencia fue que pedir ayuda puede ser mejor que fingir que lo sabes todo."),
  ],
  rep2Chunks: chunks4("a1d2"),
  prompts: [
    q("a1d2-p1", "Where were you?", "¿Dónde estabas?", "On my first day at…, I was…", "En mi primer día en…, yo estaba…", "SETTING"),
    q("a1d2-p2", "What were you doing?", "¿Qué estabas haciendo?", "I was… when…", "Yo estaba… cuando…", "ACTION"),
    q("a1d2-p3", "What happened unexpectedly?", "¿Qué pasó inesperadamente?", "Suddenly, …", "De repente, …", "PROBLEM", "react"),
    q("a1d2-p4", "How did you react?", "¿Cómo reaccionaste?", "At first… However, I…", "Al principio… Sin embargo, yo…", "REACTION", "react"),
    q("a1d2-p5", "What did you learn?", "¿Qué aprendiste?", "What I learned from that experience was…", "Lo que aprendí de esa experiencia fue…", "LESSON", "explain"),
  ],
  cues: ["SETTING", "ACTION", "PROBLEM", "REACTION", "RESULT / LESSON"],
  powerChunks: { core: ["While I was…", "At first…"], stretch: "What I learned from that experience was…" },
  sceneImage: { src: sceneD2, alt: "A new employee on his first day while a supervisor explains and a customer approaches", altEs: "Un empleado nuevo en su primer día mientras un supervisor explica y un cliente se acerca" },
  goalSeconds: [80, 105],
  goalSentences: 8,
  hideModelText: true,
  rep5Prompt: { question: story.text, questionEs: story.es },
  rep5Tips: {
    en: "Your own story: SETTING → ACTION (was/were + -ing) → PROBLEM → REACTION → RESULT / LESSON.",
    es: "Tu propia historia: ESCENA → ACCIÓN (was/were + -ing) → PROBLEMA → REACCIÓN → RESULTADO / LECCIÓN.",
  },
  rep5Turns: [
    turn("a1d2-turn1", RECRUITER, story.text, story.es, "male", { targetSeconds: [60, 75], cues: ["SETTING", "ACTION", "PROBLEM", "REACTION", "LESSON"] }),
    turn("a1d2-turn2", RECRUITER, story.followUp!.text, story.followUp!.es, "male", { targetSeconds: QUICK }),
  ],
  speakerVoice: "male",
  testReady: d2Sprint,
});

/* ============================ DAY 3 — WHY SHOULD WE HIRE YOU? ============================ */

const hire = bankQuestion("hire-1");

const d3 = advancedDay({
  day: 3,
  topic: "Why Should We Hire You?",
  topicEs: "¿Por qué deberíamos contratarte?",
  focus: "Simple present + present progressive — CLAIM → EVIDENCE → VALUE",
  focusEs: "Presente simple + presente progresivo — AFIRMACIÓN → EVIDENCIA → VALOR",
  intro: {
    title: "WHY SHOULD WE HIRE YOU?",
    titleEs: "¿POR QUÉ DEBERÍAMOS CONTRATARTE?",
    lead: "Move from generic adjectives to proof. 'I'm responsible and hardworking' is not an answer — support the claim.",
    leadEs: "Pasa de adjetivos genéricos a pruebas. 'Soy responsable y trabajador/a' no es una respuesta — sostén la afirmación.",
    examples: ["One reason you should hire me is…", "For example…", "What I can bring to the team is…"],
    goal: "Answer for 60–75 seconds, then survive a tough follow-up with a NEW reason.",
    goalEs: "Responde 60–75 segundos y luego sobrevive una repregunta difícil con una razón NUEVA.",
    cta: START,
  },
  lines: [
    l("a1d3-1", "One reason you should hire me is | that I'm very adaptable.", "Una razón por la que deberían contratarme es que soy muy adaptable."),
    l("a1d3-2", "When something changes, | I try to stay calm | and understand the situation first.", "Cuando algo cambia, trato de mantener la calma y entender la situación primero."),
    l("a1d3-3", "For example, I've had situations | where I needed to learn a new process quickly.", "Por ejemplo, he tenido situaciones donde necesité aprender un proceso nuevo rápidamente."),
    l("a1d3-4", "Instead of getting frustrated, | I asked questions and practiced | until I understood it.", "En vez de frustrarme, hice preguntas y practiqué hasta entenderlo."),
    l("a1d3-5", "I'm also improving my English | every day.", "También estoy mejorando mi inglés todos los días."),
    l("a1d3-6", "Right now, | I'm focusing especially on speaking more confidently.", "Ahora mismo, me estoy enfocando especialmente en hablar con más confianza."),
    l("a1d3-7", "What I can bring to the team is | a positive attitude and willingness to learn.", "Lo que puedo aportar al equipo es una actitud positiva y disposición para aprender."),
    l("a1d3-8", "That's why I believe I could contribute | and continue growing in the role.", "Por eso creo que podría contribuir y seguir creciendo en el puesto."),
  ],
  rep2Chunks: chunks4("a1d3"),
  prompts: [
    q("a1d3-p1", "What is one real strength you have?", "¿Cuál es una fortaleza real que tienes?", "One reason you should hire me is…", "Una razón por la que deberían contratarme es…", "CLAIM"),
    q("a1d3-p2", "Can you give an example?", "¿Puedes dar un ejemplo?", "For example, I've had situations where…", "Por ejemplo, he tenido situaciones donde…", "EVIDENCE", "justify"),
    q("a1d3-p3", "What skill are you improving right now?", "¿Qué habilidad estás mejorando ahora mismo?", "Right now, I'm focusing on…", "Ahora mismo, me estoy enfocando en…", "NOW"),
    q("a1d3-p4", "How would that skill help a company?", "¿Cómo ayudaría esa habilidad a una empresa?", "That would help because…", "Eso ayudaría porque…", "VALUE", "explain"),
    q("a1d3-p5", "Why should a recruiter choose you?", "¿Por qué debería elegirte un reclutador?", "What I can bring to the team is…", "Lo que puedo aportar al equipo es…", "CLOSE", "defend"),
  ],
  cues: ["CLAIM", "EVIDENCE", "EXAMPLE", "VALUE", "CLOSE"],
  powerChunks: { core: ["One reason you should hire me is…", "For example…"], stretch: "What I can bring to the team is…" },
  sceneImage: { src: sceneD3, alt: "A candidate explaining an example of her strengths to two interviewers", altEs: "Una candidata explicando un ejemplo de sus fortalezas a dos entrevistadores" },
  goalSeconds: [90, 120],
  goalSentences: 8,
  hideModelText: true,
  rep5Prompt: { question: hire.text, questionEs: hire.es },
  rep5Tips: {
    en: "CLAIM → EVIDENCE → VALUE. If the recruiter pushes back: don't repeat your answer — add a new example, proof or result.",
    es: "AFIRMACIÓN → EVIDENCIA → VALOR. Si el reclutador insiste: no repitas tu respuesta — agrega un ejemplo, prueba o resultado nuevo.",
  },
  rep5Turns: [
    turn("a1d3-turn1", RECRUITER, hire.text, hire.es, "female", { targetSeconds: [60, 75], cues: ["CLAIM", "EVIDENCE", "VALUE"] }),
    turn("a1d3-turn2", RECRUITER, hire.followUp!.text, hire.followUp!.es, "female", { targetSeconds: [30, 45], cues: ["NEW REASON", "PROOF", "RESULT"] }),
  ],
  speakerVoice: "female",
});

/* ============================ DAY 4 — WHAT IS YOUR GREATEST WEAKNESS? ============================ */

const weak = bankQuestion("weak-1");
const goal = bankQuestion("goal-1");

const d4Sprint: TestReadySprint = {
  type: "describe-scene",
  title: "DESCRIBE THE SCENE",
  titleEs: "DESCRIBE LA ESCENA",
  instruction: "Look at the picture. You have 10 seconds to think, then speak for 45–60 seconds. Small cues only.",
  instructionEs: "Mira la imagen. Tienes 10 segundos para pensar y luego habla 45–60 segundos. Solo pistas pequeñas.",
  image: { src: testReadyScene, alt: "A busy airport customer service desk with a family and a line of travelers", altEs: "Un mostrador de servicio al cliente en un aeropuerto lleno, con una familia y una fila de viajeros" },
  thinkSeconds: 10,
  speakSeconds: 45,
  items: [
    {
      id: "a1d4-tr1",
      text: "Describe the scene.",
      textEs: "Describe la escena.",
      chunks: ["WHO?", "WHERE?", "WHAT IS HAPPENING?", "WHAT MIGHT HAPPEN NEXT?"],
      maxSeconds: 60,
    },
  ],
};

const d4 = advancedDay({
  day: 4,
  topic: "What Is Your Greatest Weakness?",
  topicEs: "¿Cuál es tu mayor debilidad?",
  focus: "Future + present perfect progressive — WEAKNESS → ACTION → PROGRESS → NEXT STEP · your professional goals",
  focusEs: "Futuro + presente perfecto progresivo — DEBILIDAD → ACCIÓN → PROGRESO → SIGUIENTE PASO · tus metas profesionales",
  intro: {
    title: "YOUR GREATEST WEAKNESS",
    titleEs: "TU MAYOR DEBILIDAD",
    lead: "Talk honestly about improvement. No fake scripted weakness ('I'm a perfectionist'). Show the ACTION and the PROGRESS.",
    leadEs: "Habla con honestidad sobre mejorar. Nada de debilidades falsas de guion ('soy perfeccionista'). Muestra la ACCIÓN y el PROGRESO.",
    examples: ["One thing I'm working on is…", "I've been trying to…", "To improve this, I'm going to…"],
    goal: "Answer for 45–60 seconds, then handle two recruiter follow-ups.",
    goalEs: "Responde 45–60 segundos y luego maneja dos repreguntas del reclutador.",
    cta: START,
  },
  lines: [
    l("a1d4-1", "One thing I'm working on is | making decisions faster.", "Algo en lo que estoy trabajando es tomar decisiones más rápido."),
    l("a1d4-2", "Sometimes I spend too much time thinking | because I want to make the best choice.", "A veces paso demasiado tiempo pensando porque quiero tomar la mejor decisión."),
    l("a1d4-3", "I've been trying to organize my priorities | more clearly.", "He estado tratando de organizar mis prioridades con más claridad."),
    l("a1d4-4", "For example, I now give myself a specific amount of time | to make smaller decisions.", "Por ejemplo, ahora me doy una cantidad específica de tiempo para tomar decisiones pequeñas."),
    l("a1d4-5", "I've already noticed | that this helps me act faster.", "Ya he notado que esto me ayuda a actuar más rápido."),
    l("a1d4-6", "However, | I still want to improve this skill.", "Sin embargo, todavía quiero mejorar esta habilidad."),
    l("a1d4-7", "To improve it, | I'm going to keep practicing how I prioritize tasks.", "Para mejorarla, voy a seguir practicando cómo priorizo tareas."),
    l("a1d4-8", "Overall, I think recognizing the problem | is helping me become better.", "En general, creo que reconocer el problema me está ayudando a mejorar."),
  ],
  rep2Chunks: chunks4("a1d4"),
  prompts: [
    q("a1d4-p1", "What is one real area you are working on?", "¿Cuál es un área real en la que estás trabajando?", "One thing I'm working on is…", "Algo en lo que estoy trabajando es…", "WEAKNESS"),
    q("a1d4-p2", "Why can it be difficult for you?", "¿Por qué puede ser difícil para ti?", "Sometimes I… because…", "A veces yo… porque…", "WHY", "explain"),
    q("a1d4-p3", "What have you been doing to improve it?", "¿Qué has estado haciendo para mejorarla?", "I've been trying to…", "He estado tratando de…", "ACTION"),
    q("a1d4-p4", "What progress have you noticed?", "¿Qué progreso has notado?", "I've already noticed that…", "Ya he notado que…", "PROGRESS"),
    q("a1d4-p5", "How could this affect you at work?", "¿Cómo podría afectarte esto en el trabajo?", "At work, this could… so I'm going to…", "En el trabajo, esto podría… así que voy a…", "AT WORK", "defend"),
  ],
  cues: ["WEAKNESS", "ACTION", "PROGRESS", "NEXT STEP"],
  powerChunks: { core: ["One thing I'm working on is…", "I've been trying to…"], stretch: "To improve this, I'm going to…" },
  sceneImage: { src: sceneD4, alt: "A professional organizing his priorities with a notebook, laptop and a timer", altEs: "Un profesional organizando sus prioridades con un cuaderno, una laptop y un temporizador" },
  goalSeconds: [105, 150],
  goalSentences: 8,
  hideModelText: true,
  rep5Prompt: { question: weak.text, questionEs: weak.es },
  rep5Tips: {
    en: "WEAKNESS → ACTION → PROGRESS → NEXT STEP. Then connect it to a call center, then your three concrete goals.",
    es: "DEBILIDAD → ACCIÓN → PROGRESO → SIGUIENTE PASO. Luego conéctala con un call center y después tus tres metas concretas.",
  },
  rep5Turns: [
    turn("a1d4-turn1", RECRUITER, weak.text, weak.es, "male", { targetSeconds: [45, 60], cues: ["WEAKNESS", "ACTION", "PROGRESS", "NEXT STEP"] }),
    turn("a1d4-turn2", RECRUITER, weak.followUp!.text, weak.followUp!.es, "male", { targetSeconds: [30, 45] }),
    turn("a1d4-turn3", RECRUITER, goal.text, goal.es, "male", { targetSeconds: [30, 45], cues: ["FIRST", "SECOND", "THIRD"] }),
  ],
  speakerVoice: "male",
  testReady: d4Sprint,
});

/* ============================ DAY 5 — RECRUITER PRESSURE ROUND ============================ */

const r1 = bankQuestion("tmay-1");
const r2 = bankQuestion("hire-2");
const r3 = bankQuestion("weak-2");
const r4 = bankQuestion("crazy-1");
const r5 = bankQuestion("cs-tour-1");

const d5Sprint: TestReadySprint = {
  type: "mixed",
  title: "MIXED SPRINT — PRÁCTICA EXTRA",
  titleEs: "MIXED SPRINT — PRÁCTICA EXTRA",
  instruction: "Optional extra practice. Five quick, different drills. No score.",
  instructionEs: "Práctica extra opcional. Cinco ejercicios rápidos y diferentes. Sin calificación.",
  items: [
    { id: "a1d5-tr1", kind: "repeat", audio: "One of my strengths is that I stay calm when something unexpected happens.", maxSeconds: 12 },
    { id: "a1d5-tr2", kind: "quick-answers", audio: "What are you focused on right now?", text: "What are you focused on right now?", textEs: "¿En qué estás enfocado/a ahora mismo?", maxSeconds: 20 },
    { id: "a1d5-tr3", kind: "build-sentence", chunks: ["WHAT I CAN BRING", "TO THE TEAM", "IS", "A POSITIVE ATTITUDE"], maxSeconds: 12 },
    { id: "a1d5-tr4", kind: "listen-respond", audio: "I've been waiting for twenty minutes and nobody has helped me. What are you going to do about it?", text: "Respond to the customer.", textEs: "Responde al cliente.", chunks: ["ACKNOWLEDGE", "SOLUTION"], maxSeconds: 30 },
    { id: "a1d5-tr5", kind: "speak-now", text: "What kind of coworker are you? Give one example.", textEs: "¿Qué tipo de compañero/a de trabajo eres? Da un ejemplo.", chunks: ["CLAIM", "EXAMPLE", "CLOSE"], thinkSeconds: 5, maxSeconds: 45 },
  ],
};

const d5 = advancedDay({
  day: 5,
  topic: "Recruiter Pressure Round",
  topicEs: "Pressure Round del reclutador",
  focus: "Week 1 challenge — switch between interview, behavioral reasoning, a crazy question and customer service",
  focusEs: "Reto de la Semana 1 — cambia entre entrevista, razonamiento, una pregunta loca y servicio al cliente",
  intro: {
    title: "RECRUITER PRESSURE ROUND",
    titleEs: "PRESSURE ROUND DEL RECLUTADOR",
    lead: "Week 1 challenge. Five Rounds. You won't see the next question until you finish the current answer. No new grammar — just your five frameworks under pressure.",
    leadEs: "Reto de la Semana 1. Cinco Rounds. No verás la siguiente pregunta hasta terminar la respuesta actual. Sin gramática nueva — solo tus cinco estructuras bajo presión.",
    examples: ["NOW → BACKGROUND → STRENGTH → GOAL", "CLAIM → EVIDENCE → VALUE", "CHOOSE → WHY → EXAMPLE → CLOSE"],
    goal: "About 4–6 minutes of speaking across all Rounds. Take your time between them.",
    goalEs: "Unos 4–6 minutos hablando en total. Tómate tu tiempo entre Rounds.",
    cta: START,
  },
  // Rep 1–3 recycle the week's five mental machines as a compact connected review.
  lines: [
    l("a1d5-1", "Right now, I'm focused on becoming a stronger communicator, | and I've had experience working with different types of people.", "Ahora mismo estoy enfocado/a en ser un/a mejor comunicador/a, y he tenido experiencia trabajando con distintos tipos de personas."),
    l("a1d5-2", "What I'm looking for is | an opportunity where I can keep growing.", "Lo que busco es una oportunidad donde pueda seguir creciendo."),
    l("a1d5-3", "One reason you should hire me is that I'm adaptable. | For example, when a process changed, I asked questions and practiced until I understood it.", "Una razón para contratarme es que soy adaptable. Por ejemplo, cuando cambió un proceso, hice preguntas y practiqué hasta entenderlo."),
    l("a1d5-4", "What I can bring to the team is | a positive attitude and real willingness to learn.", "Lo que puedo aportar al equipo es una actitud positiva y verdaderas ganas de aprender."),
    l("a1d5-5", "One thing I'm working on is making decisions faster, | and I've been giving myself a set time for small decisions.", "Algo en lo que estoy trabajando es decidir más rápido, y me he estado dando un tiempo fijo para decisiones pequeñas."),
    l("a1d5-6", "That won't stop me from doing the job well, | because I've already noticed real progress.", "Eso no me impedirá hacer bien el trabajo, porque ya he notado un progreso real."),
    l("a1d5-7", "If I had to choose one thing to do differently, | I would start learning English earlier, | because it opens more doors.", "Si tuviera que elegir algo para hacer diferente, empezaría a aprender inglés antes, porque abre más puertas."),
    l("a1d5-8", "I understand why you're frustrated. | Let me make sure I understand correctly, | and here's what I can do.", "Entiendo por qué está frustrado/a. Déjeme asegurarme de entender bien, y esto es lo que puedo hacer."),
  ],
  rep2Chunks: chunks4("a1d5"),
  prompts: [
    q("a1d5-p1", "In one sentence: what are you focused on right now and why?", "En una oración: ¿en qué estás enfocado/a ahora y por qué?", "Right now, I'm focused on… because…", "Ahora mismo estoy enfocado/a en… porque…", "NOW"),
    q("a1d5-p2", "Give me proof of one strength — a real result.", "Dame una prueba de una fortaleza — un resultado real.", "For example, … and as a result…", "Por ejemplo, … y como resultado…", "EVIDENCE", "justify"),
    q("a1d5-p3", "Why should your weakness not worry an employer?", "¿Por qué tu debilidad no debería preocupar a un empleador?", "It shouldn't worry you because I've been…", "No debería preocuparle porque he estado…", "DEFEND", "defend"),
    q("a1d5-p4", "An angry customer says the problem is your fault. What do you say first?", "Un cliente enojado dice que el problema es tu culpa. ¿Qué dices primero?", "I understand why you're frustrated. Let me…", "Entiendo por qué está frustrado/a. Déjeme…", "ACKNOWLEDGE", "react"),
    q("a1d5-p5", "Quick: choose one thing you'd change about your career so far, and why.", "Rápido: elige algo que cambiarías de tu carrera hasta ahora, y por qué.", "If I could, I would… because…", "Si pudiera, yo… porque…", "CHOOSE → WHY", "adapt"),
  ],
  cues: ["STORY", "VALUE", "WEAKNESS", "CRAZY QUESTION", "CUSTOMER"],
  powerChunks: { core: ["I understand why you're frustrated.", "Here's what I can do."], stretch: "Let me make sure I understand correctly." },
  sceneImage: { src: sceneD5, alt: "A candidate wearing a headset during a call center recruitment assessment while a recruiter observes", altEs: "Una candidata con diadema durante una evaluación de reclutamiento en un call center mientras una reclutadora observa" },
  goalSeconds: [240, 360],
  goalSentences: 8,
  hideModelText: true,
  rep5Prompt: { question: "Recruiter Pressure Round — 5 Rounds.", questionEs: "Pressure Round del reclutador — 5 Rounds." },
  rep5Tips: {
    en: "Each Round is revealed only after you finish the previous answer. Use the framework, not a script.",
    es: "Cada Round se revela solo cuando terminas la respuesta anterior. Usa la estructura, no un guion.",
  },
  rep5Turns: [
    // ROUND 1 — PROFESSIONAL STORY
    turn("a1d5-turn1", RECRUITER, r1.text, r1.es, "female", {
      round: { n: 1, title: "PROFESSIONAL STORY", titleEs: "HISTORIA PROFESIONAL" },
      targetSeconds: [55, 70],
      cues: ["NOW", "EXPERIENCE", "STRENGTH", "GOAL"],
    }),
    // ROUND 2 — PROVE YOUR VALUE
    turn("a1d5-turn2", RECRUITER, r2.text, r2.es, "female", {
      round: { n: 2, title: "PROVE YOUR VALUE", titleEs: "PRUEBA TU VALOR" },
      targetSeconds: [45, 60],
      cues: ["CLAIM", "EVIDENCE", "VALUE"],
    }),
    turn("a1d5-turn3", RECRUITER, r2.followUp!.text, r2.followUp!.es, "female", { targetSeconds: QUICK, cues: ["SITUATION", "WHAT YOU DID", "RESULT"] }),
    // ROUND 3 — HARD FOLLOW-UP
    turn("a1d5-turn4", RECRUITER, r3.text, r3.es, "female", {
      round: { n: 3, title: "HARD FOLLOW-UP", titleEs: "REPREGUNTA DIFÍCIL" },
      targetSeconds: [40, 50],
      cues: ["WEAKNESS", "ACTION", "PROGRESS"],
    }),
    turn("a1d5-turn5", RECRUITER, r3.followUp!.text, r3.followUp!.es, "female", { targetSeconds: QUICK }),
    // ROUND 4 — CRAZY RECRUITER QUESTION (shown only after Round 3)
    turn("a1d5-turn6", RECRUITER, r4.text, r4.es, "female", {
      round: { n: 4, title: "CRAZY RECRUITER QUESTION", titleEs: "PREGUNTA LOCA DEL RECLUTADOR" },
      prepSeconds: 10,
      targetSeconds: [45, 60],
      framework: { title: "THINK IN ENGLISH", titleEs: "PIENSA EN INGLÉS", steps: ["CHOOSE", "WHY", "EXAMPLE / CONSEQUENCE", "CLOSE"] },
    }),
    // ROUND 5 — CUSTOMER SERVICE SWITCH
    turn("a1d5-turn7", CUSTOMER, r5.text, r5.es, "male", {
      round: {
        n: 5,
        title: "CUSTOMER SERVICE SWITCH",
        titleEs: "CAMBIO A SERVICIO AL CLIENTE",
        situation: "A customer booked a family tour. The reservation has the wrong date.",
        situationEs: "Un cliente reservó un tour familiar. La reservación tiene la fecha equivocada.",
      },
      targetSeconds: [30, 45],
      cues: ["ACKNOWLEDGE", "CLARIFY", "SOLUTION", "CONFIRM"],
      toolbox: ["I understand why you're frustrated.", "Let me make sure I understand correctly.", "Here's what I can do."],
    }),
    turn("a1d5-turn8", CUSTOMER, r5.followUp!.text, r5.followUp!.es, "male", {
      targetSeconds: [30, 45],
      cues: ["SOLUTION", "CONFIRM"],
      toolbox: ["Here's what I can do.", "Does that work for you?"],
    }),
  ],
  speakerVoice: "female",
  testReady: d5Sprint,
  testReadyOptional: true,
});

export const ADVANCED_1_WEEK_1_DAYS: CourseDay[] = [d1, d2, d3, d4, d5];
