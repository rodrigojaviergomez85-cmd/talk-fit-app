/**
 * EAGLES — WEEK 1 · RECOMMEND, ADVISE & SELL (standalone 5-day pilot)
 *
 * Job-oriented week: tell what happened → offer options → give advice →
 * recommend & sell → handle hypothetical situations.
 * Each day = the normal 5 Fluency Reps + a separate 3–5 min Test Ready Sprint.
 */
import type { CourseDay, ModelLine, PersonalPrompt, StoryPanel, TestReadySprint } from "@/lib/types";

import sceneBusyDay from "@/assets/eagles/scene-d1-busy-day.jpg";
import sceneAriaPeru from "@/assets/eagles/scene-d2-aria-peru.jpg";
import personCarlos from "@/assets/eagles/person-carlos.jpg";
import personMaria from "@/assets/eagles/person-maria.jpg";
import personDavid from "@/assets/eagles/person-david.jpg";
import scenePhones from "@/assets/eagles/scene-d4-phones.jpg";
import sceneStore from "@/assets/eagles/scene-d4-store.jpg";
import sceneDecision from "@/assets/eagles/scene-d5-decision.jpg";
import cueLottery from "@/assets/eagles/cue-lottery.jpg";
import cueJobAbroad from "@/assets/eagles/cue-job-abroad.jpg";
import cueLimitedBudget from "@/assets/eagles/cue-limited-budget.jpg";
import cueWorkFromHome from "@/assets/eagles/cue-work-from-home.jpg";
import cueScholarship from "@/assets/eagles/cue-scholarship.jpg";

export const EAGLES_WEEK_1_WEEKS: {
  week: 1 | 2 | 3 | 4;
  title: string;
  subtitle: string;
  subtitleEs: string;
}[] = [
  {
    week: 1,
    title: "Recommend, Advise & Sell",
    subtitle: "Tell · Offer options · Advise · Recommend · Respond",
    subtitleEs: "Contar · Ofrecer opciones · Aconsejar · Recomendar · Responder",
  },
];

function l(id: string, marked: string, es: string): ModelLine {
  const chunks = marked.split("|").map((c) => c.trim()).filter(Boolean);
  return { id, text: chunks.join(" "), es, chunks };
}

function p(id: string, question: string, questionEs: string, starter: string, starterEs: string, cue?: string): PersonalPrompt {
  return { id, question, questionEs, starter, starterEs, cue };
}

function card(id: string, src: string, alt: string, cue: string): StoryPanel {
  return { id, src, alt, cue };
}

type DayInput = {
  day: number;
  topic: string;
  topicEs: string;
  focus: string;
  focusEs: string;
  intro: CourseDay["intro"];
  lines: ModelLine[];
  prompts: PersonalPrompt[];
  cues: string[];
  rep5Prompt: CourseDay["rep5Prompt"];
  rep5Tips?: { en: string; es: string };
  rep5Audio?: CourseDay["rep5Audio"];
  storyPanels?: StoryPanel[];
  sceneImage?: { src: string; alt: string; altEs: string };
  variants?: CourseDay["variants"];
  goalSeconds?: [number, number];
  goalSentences?: number;
  rep2Chunks?: string[][];
  speakerVoice?: "female" | "male";
  testReady: TestReadySprint;
};

function makeDay(input: DayInput): CourseDay {
  const week = EAGLES_WEEK_1_WEEKS[0]!;
  return {
    day: input.day,
    week: 1,
    weekTitle: week.title,
    weekTitleEs: week.subtitleEs,
    focus: input.focus,
    focusEs: input.focusEs,
    topic: input.topic,
    topicEs: input.topicEs,
    goalSeconds: input.goalSeconds ?? [45, 60],
    estimatedMinutes: "6–9 min",
    intro: input.intro,
    lines: input.lines,
    prompts: input.prompts,
    cues: input.cues,
    rep5Prompt: input.rep5Prompt,
    ...(input.rep5Tips ? { rep5Tips: input.rep5Tips } : {}),
    ...(input.rep5Audio ? { rep5Audio: input.rep5Audio } : {}),
    ...(input.storyPanels ? { storyPanels: input.storyPanels } : {}),
    ...(input.sceneImage ? { sceneImage: input.sceneImage } : {}),
    ...(input.variants ? { variants: input.variants } : {}),
    ...(input.goalSentences ? { goalSentences: input.goalSentences } : {}),
    ...(input.rep2Chunks ? { rep2Chunks: input.rep2Chunks } : {}),
    ...(input.speakerVoice ? { speakerVoice: input.speakerVoice } : {}),
    testReady: input.testReady,
    // No modelExample on purpose: Rep 5 never shows a complete final speech.
  };
}

const START = "START REP 1";

/* ============================ DAY 1 — TELL WHAT HAPPENED ============================ */

const d1 = makeDay({
  day: 1,
  topic: "Tell Me What Happened",
  topicEs: "Cuéntame qué pasó",
  focus: "Simple past — tell a short story",
  focusEs: "Pasado simple — cuenta una historia corta",
  intro: {
    title: "TELL WHAT HAPPENED",
    titleEs: "CUENTA LO QUE PASÓ",
    lead: "At work, people ask: What happened? Answer with a short, clear story in the past.",
    leadEs: "En el trabajo te preguntan: ¿Qué pasó? Responde con una historia corta y clara en pasado.",
    examples: ["Yesterday, I had a busy day.", "I arrived early.", "I learned something new."],
    goal: "Speak for 45+ seconds. Connect 6 ideas.",
    goalEs: "Habla 45 segundos o más. Conecta 6 ideas.",
    cta: START,
  },
  lines: [
    l("e1-1", "Yesterday, | I had a busy day.", "Ayer tuve un día ocupado."),
    l("e1-2", "I arrived early.", "Llegué temprano."),
    l("e1-3", "I talked | to several people.", "Hablé con varias personas."),
    l("e1-4", "I worked | on an important task.", "Trabajé en una tarea importante."),
    l("e1-5", "I had lunch | with a friend.", "Almorcé con un amigo."),
    l("e1-6", "I learned | something new.", "Aprendí algo nuevo."),
    l("e1-7", "I went home | in the evening.", "Me fui a casa por la tarde."),
    l("e1-8", "Overall, | I had a good day.", "En general, tuve un buen día."),
  ],
  rep2Chunks: [
    ["e1-1", "e1-2"],
    ["e1-3", "e1-4"],
    ["e1-5", "e1-6"],
    ["e1-7", "e1-8"],
  ],
  prompts: [
    p("e1-p1", "What did you do?", "¿Qué hiciste?", "Yesterday, I…", "Ayer, yo…", "WHAT"),
    p("e1-p2", "Where did you go?", "¿A dónde fuiste?", "I went to…", "Fui a…", "WHERE"),
    p("e1-p3", "Who were you with?", "¿Con quién estabas?", "I was with…", "Estaba con…", "WHO"),
    p("e1-p4", "What happened?", "¿Qué pasó?", "Then, …", "Luego, …", "WHAT"),
    p("e1-p5", "Why was it interesting, good or difficult?", "¿Por qué fue interesante, bueno o difícil?", "It was … because…", "Fue … porque…", "WHY"),
  ],
  cues: ["YESTERDAY", "ARRIVED", "TALKED", "WORKED", "LEARNED", "OVERALL"],
  sceneImage: { src: sceneBusyDay, alt: "A professional arriving at a busy office in the morning", altEs: "Un profesional llegando a una oficina ocupada por la mañana" },
  goalSeconds: [45, 60],
  goalSentences: 6,
  rep5Prompt: { question: "Tell me about an interesting day.", questionEs: "Cuéntame sobre un día interesante." },
  rep5Tips: {
    en: "Start with when. Then say 4–5 things you did. Finish with overall.",
    es: "Empieza con cuándo. Luego di 4–5 cosas que hiciste. Termina con overall.",
  },
  speakerVoice: "male",
  testReady: {
    type: "repeat",
    title: "REPEAT IT",
    titleEs: "REPÍTELO",
    instruction: "Listen once. Remember. Repeat.",
    instructionEs: "Escucha una vez. Recuerda. Repite.",
    playOnce: true,
    items: [
      { id: "e1-tr1", audio: "The customer called yesterday.", maxSeconds: 10 },
      { id: "e1-tr2", audio: "The customer called because he had a problem.", maxSeconds: 10 },
      { id: "e1-tr3", audio: "Yesterday, the customer called because his internet wasn't working.", maxSeconds: 12 },
      { id: "e1-tr4", audio: "I talked to the customer and explained the next steps.", maxSeconds: 12 },
      { id: "e1-tr5", audio: "After the call, I sent an email and the customer thanked me for my help.", maxSeconds: 15 },
    ],
  },
});

/* ============================ DAY 2 — OFFER OPTIONS ============================ */

const d2 = makeDay({
  day: 2,
  topic: "What Could You Do?",
  topicEs: "¿Qué podrías hacer?",
  focus: "Modals — could · should · might · shouldn't",
  focusEs: "Modales — could · should · might · shouldn't",
  intro: {
    title: "OFFER OPTIONS",
    titleEs: "OFRECE OPCIONES",
    lead: "Aria wants to travel to Peru, but she doesn't have enough money. Help her see her options.",
    leadEs: "Aria quiere viajar a Perú, pero no tiene suficiente dinero. Ayúdala a ver sus opciones.",
    examples: ["She could save more money.", "She might travel next month.", "She should make a budget."],
    goal: "Speak for 45+ seconds. Connect 6 ideas.",
    goalEs: "Habla 45 segundos o más. Conecta 6 ideas.",
    cta: START,
  },
  lines: [
    l("e2-1", "Aria could | save more money.", "Aria podría ahorrar más dinero."),
    l("e2-2", "She could look for | a cheaper flight.", "Podría buscar un vuelo más barato."),
    l("e2-3", "She might travel | next month.", "Tal vez podría viajar el próximo mes."),
    l("e2-4", "She could stay | with a friend.", "Podría quedarse con una amiga."),
    l("e2-5", "She should | make a budget.", "Debería hacer un presupuesto."),
    l("e2-6", "She shouldn't spend | too much money.", "No debería gastar demasiado dinero."),
    l("e2-7", "She could compare | different options.", "Podría comparar diferentes opciones."),
    l("e2-8", "Overall, | she should choose the best option | for her budget.", "En general, debería elegir la mejor opción para su presupuesto."),
  ],
  prompts: [
    p("e2-p1", "What could she do?", "¿Qué podría hacer ella?", "She could…", "Ella podría…", "WHAT"),
    p("e2-p2", "Where could she stay?", "¿Dónde podría quedarse?", "She could stay…", "Podría quedarse…", "WHERE"),
    p("e2-p3", "When could she travel?", "¿Cuándo podría viajar?", "She might travel…", "Tal vez podría viajar…", "WHEN"),
    p("e2-p4", "Who could help her?", "¿Quién podría ayudarla?", "… could help her.", "… podría ayudarla.", "WHO"),
    p("e2-p5", "Why should she make a budget?", "¿Por qué debería hacer un presupuesto?", "She should make a budget because…", "Debería hacer un presupuesto porque…", "WHY"),
  ],
  cues: ["PERU", "FLIGHT", "BUDGET", "FRIEND", "NEXT MONTH", "OVERALL"],
  sceneImage: { src: sceneAriaPeru, alt: "Aria at her kitchen table planning a trip to Peru with a small budget", altEs: "Aria en su cocina planeando un viaje a Perú con poco presupuesto" },
  goalSeconds: [45, 60],
  goalSentences: 6,
  rep5Prompt: { question: "Give Aria your recommendation.", questionEs: "Dale tu recomendación a Aria." },
  rep5Tips: {
    en: "Say the problem in one sentence. Give 3–4 options with could / might. Close with should.",
    es: "Di el problema en una frase. Da 3–4 opciones con could / might. Cierra con should.",
  },
  speakerVoice: "female",
  testReady: {
    type: "quick-answers",
    title: "QUICK ANSWERS",
    titleEs: "RESPUESTAS RÁPIDAS",
    instruction: "Listen to the question. Answer fast. Short answers are fine.",
    instructionEs: "Escucha la pregunta. Responde rápido. Respuestas cortas están bien.",
    items: [
      { id: "e2-tr1", audio: "Where do people usually stay when they travel?", maxSeconds: 8 },
      { id: "e2-tr2", audio: "What do people use to buy a plane ticket?", maxSeconds: 8 },
      { id: "e2-tr3", audio: "Where can you exchange money?", maxSeconds: 8 },
      { id: "e2-tr4", audio: "What should you make before a big trip?", maxSeconds: 8 },
      { id: "e2-tr5", audio: "What could you do if a flight is too expensive?", maxSeconds: 8 },
      { id: "e2-tr6", audio: "Who could you stay with to save money?", maxSeconds: 8 },
    ],
  },
});

/* ============================ DAY 3 — GIVE ADVICE ============================ */

const d3 = makeDay({
  day: 3,
  topic: "Give Good Advice",
  topicEs: "Da un buen consejo",
  focus: "Modals for advice — should · shouldn't · could · must",
  focusEs: "Modales para aconsejar — should · shouldn't · could · must",
  intro: {
    title: "GIVE GOOD ADVICE",
    titleEs: "DA UN BUEN CONSEJO",
    lead: "Three people, three goals. Carlos wants a better job. Maria wants to improve her English. David is always late.",
    leadEs: "Tres personas, tres metas. Carlos quiere un mejor trabajo. Maria quiere mejorar su inglés. David siempre llega tarde.",
    examples: ["Carlos should practice his English.", "She shouldn't be afraid of mistakes.", "David must arrive on time."],
    goal: "Speak for 45–60 seconds. Connect 6–8 ideas.",
    goalEs: "Habla 45–60 segundos. Conecta 6–8 ideas.",
    cta: START,
  },
  lines: [
    l("e3-1", "Carlos should | practice his English.", "Carlos debería practicar su inglés."),
    l("e3-2", "He could apply | for more jobs.", "Podría postularse a más trabajos."),
    l("e3-3", "Maria should | speak English every day.", "Maria debería hablar inglés todos los días."),
    l("e3-4", "She shouldn't be afraid | of mistakes.", "No debería tener miedo de los errores."),
    l("e3-5", "David must | arrive on time.", "David debe llegar a tiempo."),
    l("e3-6", "He shouldn't | leave home late.", "No debería salir tarde de casa."),
    l("e3-7", "He could prepare everything | the night before.", "Podría preparar todo la noche anterior."),
    l("e3-8", "Overall, | they should make small changes | every day.", "En general, deberían hacer pequeños cambios cada día."),
  ],
  prompts: [
    p("e3-p1", "What should this person do?", "¿Qué debería hacer esta persona?", "He / She should…", "Él / Ella debería…", "WHAT"),
    p("e3-p2", "What shouldn't they do?", "¿Qué no debería hacer?", "He / She shouldn't…", "Él / Ella no debería…", "WHAT"),
    p("e3-p3", "Who could help them?", "¿Quién podría ayudarle?", "… could help.", "… podría ayudar.", "WHO"),
    p("e3-p4", "Why should they change?", "¿Por qué debería cambiar?", "Because…", "Porque…", "WHY"),
    p("e3-p5", "How often should they practice or do it?", "¿Con qué frecuencia debería practicarlo o hacerlo?", "Every day / Twice a week…", "Todos los días / Dos veces por semana…", "HOW OFTEN"),
  ],
  cues: ["SHOULD", "SHOULDN'T", "COULD", "MUST", "EVERY DAY"],
  storyPanels: [
    card("e3-carlos", personCarlos, "Carlos looking for a better job on his laptop", "CARLOS · BETTER JOB"),
    card("e3-maria", personMaria, "Maria studying English with headphones", "MARIA · ENGLISH"),
    card("e3-david", personDavid, "David rushing and checking his watch", "DAVID · ALWAYS LATE"),
  ],
  variants: [
    { id: "carlos", label: "CARLOS · BETTER JOB", labelEs: "CARLOS · MEJOR TRABAJO" },
    { id: "maria", label: "MARIA · ENGLISH", labelEs: "MARIA · INGLÉS" },
    { id: "david", label: "DAVID · ALWAYS LATE", labelEs: "DAVID · SIEMPRE TARDE" },
  ],
  goalSeconds: [45, 60],
  goalSentences: 6,
  rep5Prompt: { question: "Choose one person. Give this person advice.", questionEs: "Elige una persona. Dale un consejo." },
  rep5Tips: {
    en: "Name the problem. Then 3 things they should do, 1 thing they shouldn't, and why.",
    es: "Di el problema. Luego 3 cosas que debería hacer, 1 que no debería, y por qué.",
  },
  speakerVoice: "female",
  testReady: {
    type: "build-sentence",
    title: "BUILD THE SENTENCE",
    titleEs: "ARMA LA FRASE",
    instruction: "Look at the pieces. Say the complete sentence.",
    instructionEs: "Mira las piezas. Di la frase completa.",
    items: [
      { id: "e3-tr1", chunks: ["should", "practice English", "every day"], audio: "should — practice English — every day", maxSeconds: 10 },
      { id: "e3-tr2", chunks: ["customer", "could choose", "the cheaper plan"], audio: "customer — could choose — the cheaper plan", maxSeconds: 10 },
      { id: "e3-tr3", chunks: ["you", "shouldn't", "arrive late", "to work"], audio: "you — shouldn't — arrive late — to work", maxSeconds: 10 },
      { id: "e3-tr4", chunks: ["she", "must", "finish the report", "today"], audio: "she — must — finish the report — today", maxSeconds: 10 },
      { id: "e3-tr5", chunks: ["we", "could", "call the customer", "tomorrow morning"], audio: "we — could — call the customer — tomorrow morning", maxSeconds: 12 },
    ],
  },
});

/* ============================ DAY 4 — RECOMMEND & SELL ============================ */

const d4 = makeDay({
  day: 4,
  topic: "Help Me Choose — Sales #1",
  topicEs: "Ayúdame a elegir — Ventas #1",
  focus: "Semi-modals + modals — need to · don't have to · could · should",
  focusEs: "Semi-modales + modales — need to · don't have to · could · should",
  intro: {
    title: "RECOMMEND & SELL",
    titleEs: "RECOMIENDA Y VENDE",
    lead: "A customer needs a new phone. Discover → understand → recommend → explain why.",
    leadEs: "Un cliente necesita un teléfono nuevo. Descubre → entiende → recomienda → explica por qué.",
    examples: ["How much do you want to spend?", "You don't have to buy the most expensive phone.", "Based on what you told me, I recommend Phone A."],
    goal: "Speak for 45–60 seconds. Connect 6 ideas.",
    goalEs: "Habla 45–60 segundos. Conecta 6 ideas.",
    cta: START,
  },
  lines: [
    l("e4-1", "What do you need?", "¿Qué necesita?"),
    l("e4-2", "How much | do you want to spend?", "¿Cuánto quiere gastar?"),
    l("e4-3", "Do you need | a good camera?", "¿Necesita una buena cámara?"),
    l("e4-4", "You need to consider | the battery.", "Necesita considerar la batería."),
    l("e4-5", "You don't have to buy | the most expensive phone.", "No tiene que comprar el teléfono más caro."),
    l("e4-6", "You could choose | Phone A.", "Podría elegir el Teléfono A."),
    l("e4-7", "You should choose this one | because it has a good camera.", "Debería elegir este porque tiene una buena cámara."),
    l("e4-8", "Based on what you told me, | I recommend Phone A.", "Según lo que me dijo, le recomiendo el Teléfono A."),
  ],
  prompts: [
    p("e4-p1", "What does the customer need?", "¿Qué necesita el cliente?", "The customer needs…", "El cliente necesita…", "WHAT"),
    p("e4-p2", "How much does the customer want to spend?", "¿Cuánto quiere gastar el cliente?", "The customer wants to spend…", "El cliente quiere gastar…", "HOW MUCH"),
    p("e4-p3", "What feature is important?", "¿Qué característica es importante?", "… is important because…", "… es importante porque…", "WHAT"),
    p("e4-p4", "Which phone should the customer choose?", "¿Qué teléfono debería elegir el cliente?", "The customer should choose…", "El cliente debería elegir…", "WHICH"),
    p("e4-p5", "Why?", "¿Por qué?", "Because…", "Porque…", "WHY"),
  ],
  cues: ["BUDGET", "CAMERA", "RECOMMEND", "BECAUSE"],
  sceneImage: { src: scenePhones, alt: "Phone A for $350 with a good camera, 64 GB and long battery next to Phone B for $550 with an excellent camera, 256 GB and faster", altEs: "Teléfono A por $350 con buena cámara, 64 GB y batería larga junto al Teléfono B por $550 con cámara excelente, 256 GB y más rápido" },
  storyPanels: [
    card("e4-store", sceneStore, "A sales associate showing two phones to a customer", "DISCOVER → RECOMMEND"),
    card("e4-phones", scenePhones, "Phone A and Phone B comparison", "A $350 · B $550"),
  ],
  goalSeconds: [45, 60],
  goalSentences: 6,
  rep5Audio: {
    label: "LISTEN TO THE CUSTOMER",
    labelEs: "ESCUCHA AL CLIENTE",
    text: "I want a phone with a good camera, but I don't want to spend more than 400 dollars. What do you recommend?",
    es: "Quiero un teléfono con buena cámara, pero no quiero gastar más de 400 dólares. ¿Qué me recomienda?",
    voice: "male",
  },
  rep5Prompt: { question: "Record your recommendation for the customer.", questionEs: "Graba tu recomendación para el cliente." },
  rep5Tips: {
    en: "Acknowledge → Recommend → Benefit → Why. Start with: Based on what you told me…",
    es: "Reconoce → Recomienda → Beneficio → Por qué. Empieza con: Based on what you told me…",
  },
  speakerVoice: "female",
  testReady: {
    type: "listen-respond",
    title: "LISTEN & RESPOND",
    titleEs: "ESCUCHA Y RESPONDE",
    instruction: "Listen to the customer. Then answer 3 questions out loud.",
    instructionEs: "Escucha al cliente. Luego responde 3 preguntas en voz alta.",
    passage:
      "I bought a new phone yesterday. I need it for work, but the battery doesn't last very long. I'm thinking about changing it.",
    items: [
      { id: "e4-tr1", audio: "What did the customer buy?", text: "What did the customer buy?", textEs: "¿Qué compró el cliente?", maxSeconds: 12 },
      { id: "e4-tr2", audio: "Why does the customer need the phone?", text: "Why does the customer need the phone?", textEs: "¿Para qué necesita el teléfono?", maxSeconds: 12 },
      { id: "e4-tr3", audio: "What problem does the customer have?", text: "What problem does the customer have?", textEs: "¿Qué problema tiene el cliente?", maxSeconds: 12 },
    ],
  },
});

/* ============================ DAY 5 — HYPOTHETICAL SITUATIONS ============================ */

const d5 = makeDay({
  day: 5,
  topic: "What Would You Do?",
  topicEs: "¿Qué harías?",
  focus: "Second conditional — If I … , I would …",
  focusEs: "Segundo condicional — If I … , I would …",
  intro: {
    title: "HANDLE HYPOTHETICALS",
    titleEs: "RESPONDE SITUACIONES HIPOTÉTICAS",
    lead: "Imagine the situation. Say what you would do — and what you wouldn't.",
    leadEs: "Imagina la situación. Di qué harías — y qué no harías.",
    examples: ["If I won the lottery, I would travel.", "I wouldn't spend all the money.", "If a customer had a limited budget, I would recommend the cheaper option."],
    goal: "Speak for 45–60+ seconds. Connect 8 ideas.",
    goalEs: "Habla 45–60 segundos o más. Conecta 8 ideas.",
    cta: START,
  },
  lines: [
    l("e5-1", "If I won the lottery, | I would travel.", "Si ganara la lotería, viajaría."),
    l("e5-2", "I would help | my family.", "Ayudaría a mi familia."),
    l("e5-3", "I wouldn't spend | all the money.", "No gastaría todo el dinero."),
    l("e5-4", "If I got a job abroad, | I would move.", "Si consiguiera un trabajo en el extranjero, me mudaría."),
    l("e5-5", "If I worked from home, | I would save time.", "Si trabajara desde casa, ahorraría tiempo."),
    l("e5-6", "If a customer had a limited budget, | I would recommend | the cheaper option.", "Si un cliente tuviera un presupuesto limitado, le recomendaría la opción más barata."),
    l("e5-7", "I wouldn't recommend | something they didn't need.", "No le recomendaría algo que no necesitara."),
    l("e5-8", "Overall, | I would choose | what makes sense.", "En general, elegiría lo que tiene sentido."),
  ],
  prompts: [
    p("e5-p1", "What would you do?", "¿Qué harías?", "If I…, I would…", "Si yo…, yo…", "WHAT"),
    p("e5-p2", "Where would you go?", "¿A dónde irías?", "I would go to…", "Iría a…", "WHERE"),
    p("e5-p3", "Who would you help?", "¿A quién ayudarías?", "I would help…", "Ayudaría a…", "WHO"),
    p("e5-p4", "Why would you choose that?", "¿Por qué elegirías eso?", "Because…", "Porque…", "WHY"),
    p("e5-p5", "What wouldn't you do?", "¿Qué no harías?", "I wouldn't…", "No…", "WHAT"),
  ],
  cues: ["IF I …", "I WOULD", "I WOULDN'T", "BECAUSE"],
  sceneImage: { src: sceneDecision, alt: "A person standing at a crossroads in a city at sunset", altEs: "Una persona en una encrucijada en la ciudad al atardecer" },
  storyPanels: [
    card("e5-lottery", cueLottery, "A lottery ticket with cash", "WIN $1 MILLION"),
    card("e5-abroad", cueJobAbroad, "Passport and suitcase at an airport", "JOB ABROAD"),
    card("e5-budget", cueLimitedBudget, "A customer with a few bills in a store", "LIMITED BUDGET"),
    card("e5-home", cueWorkFromHome, "A cozy home office", "WORK FROM HOME"),
    card("e5-scholarship", cueScholarship, "A graduation cap on books", "SCHOLARSHIP"),
  ],
  variants: [
    { id: "personal", label: "A · DREAM JOB", labelEs: "A · TRABAJO SOÑADO" },
    { id: "sales", label: "B · CUSTOMER & BUDGET", labelEs: "B · CLIENTE Y PRESUPUESTO" },
  ],
  goalSeconds: [45, 60],
  goalSentences: 8,
  rep5Prompt: {
    question: "Choose one. A: If you got your dream job, what would you do? B: If a customer wanted a better product but had a limited budget, what would you recommend?",
    questionEs: "Elige una. A: Si consiguieras el trabajo de tus sueños, ¿qué harías? B: Si un cliente quisiera un mejor producto pero tuviera poco presupuesto, ¿qué le recomendarías?",
  },
  rep5Tips: {
    en: "Start with If I… Then 3–4 things you would do, 1–2 you wouldn't, and why.",
    es: "Empieza con If I… Luego 3–4 cosas que harías, 1–2 que no harías, y por qué.",
  },
  speakerVoice: "male",
  testReady: {
    type: "speak-now",
    title: "SPEAK NOW",
    titleEs: "HABLA AHORA",
    instruction: "10 seconds to think. Then speak for about 45 seconds.",
    instructionEs: "10 segundos para pensar. Luego habla unos 45 segundos.",
    thinkSeconds: 10,
    speakSeconds: 45,
    items: [
      {
        id: "e5-tr1",
        text: "Describe a difficult decision you made.",
        textEs: "Describe una decisión difícil que tomaste.",
        chunks: ["WHAT?", "WHY?", "WHAT DID YOU DO?", "RESULT?"],
        maxSeconds: 60,
      },
    ],
  },
});

export const EAGLES_WEEK_1_DAYS: CourseDay[] = [d1, d2, d3, d4, d5];
