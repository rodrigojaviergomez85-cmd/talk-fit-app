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
  powerChunks: CourseDay["powerChunks"];
  rep5Turns?: CourseDay["rep5Turns"];
  rep5Toolbox?: string[];
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
    powerChunks: input.powerChunks,
    ...(input.rep5Turns ? { rep5Turns: input.rep5Turns } : {}),
    ...(input.rep5Toolbox ? { rep5Toolbox: input.rep5Toolbox } : {}),
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
    examples: ["I had a busy day because I had several things to do.", "After that, I had lunch with a friend.", "Overall, it was a good day."],
    goal: "Speak for 45–60 seconds. Connect 6–8 ideas.",
    goalEs: "Habla 45–60 segundos. Conecta 6–8 ideas.",
    cta: START,
  },
  lines: [
    l("e1-1", "Yesterday, I had a busy day | because I had several things to do.", "Ayer tuve un día ocupado porque tenía varias cosas que hacer."),
    l("e1-2", "I arrived early, | and I started working right away.", "Llegué temprano y empecé a trabajar de inmediato."),
    l("e1-3", "While I was there, | I talked to several people.", "Mientras estaba ahí, hablé con varias personas."),
    l("e1-4", "I also worked | on an important task.", "También trabajé en una tarea importante."),
    l("e1-5", "After that, | I had lunch with a friend.", "Después de eso, almorcé con un amigo."),
    l("e1-6", "We talked for a while, | and I learned something new.", "Hablamos un rato y aprendí algo nuevo."),
    l("e1-7", "Later, | I went home and relaxed.", "Más tarde, me fui a casa y descansé."),
    l("e1-8", "Overall, it was a good day | because I got a lot done.", "En general, fue un buen día porque logré hacer mucho."),
  ],
  rep2Chunks: [
    ["e1-1", "e1-2"],
    ["e1-3", "e1-4"],
    ["e1-5", "e1-6"],
    ["e1-7", "e1-8"],
  ],
  prompts: [
    p("e1-p1", "What happened?", "¿Qué pasó?", "Yesterday, I… because…", "Ayer, yo… porque…", "WHAT"),
    p("e1-p2", "Why was the day interesting?", "¿Por qué fue interesante el día?", "It was interesting because…", "Fue interesante porque…", "WHY"),
    p("e1-p3", "What happened after that?", "¿Qué pasó después de eso?", "After that, I…", "Después de eso, yo…", "THEN"),
    p("e1-p4", "Which part of the day was the most important?", "¿Qué parte del día fue la más importante?", "The most important part was… because…", "La parte más importante fue… porque…", "WHICH"),
    p("e1-p5", "Why? What did you learn from it?", "¿Por qué? ¿Qué aprendiste de eso?", "I learned that… That's why…", "Aprendí que… Por eso…", "EXPLAIN"),
  ],
  cues: ["WHEN?", "WHAT?", "WHO?", "AFTER THAT", "RESULT"],
  powerChunks: { core: ["because…", "after that…"], stretch: "while I was…" },
  sceneImage: { src: sceneBusyDay, alt: "A professional arriving at a busy office in the morning", altEs: "Un profesional llegando a una oficina ocupada por la mañana" },
  goalSeconds: [45, 60],
  goalSentences: 6,
  rep5Prompt: { question: "Tell me about an interesting day.", questionEs: "Cuéntame sobre un día interesante." },
  rep5Tips: {
    en: "Say when. Then connect what happened: because… · after that… Close with overall.",
    es: "Di cuándo. Luego conecta lo que pasó: because… · after that… Cierra con overall.",
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
    examples: ["Aria could save more money because traveling can be expensive.", "Another option is to look for a cheaper flight.", "That's why planning ahead could help her."],
    goal: "Speak for 45–60 seconds. Connect 6–8 ideas.",
    goalEs: "Habla 45–60 segundos. Conecta 6–8 ideas.",
    cta: START,
  },
  lines: [
    l("e2-1", "Aria could save more money | because traveling can be expensive.", "Aria podría ahorrar más dinero porque viajar puede ser caro."),
    l("e2-2", "Another option is | to look for a cheaper flight.", "Otra opción es buscar un vuelo más barato."),
    l("e2-3", "She might travel next month | if the prices are lower.", "Tal vez podría viajar el próximo mes si los precios están más bajos."),
    l("e2-4", "She could also stay with a friend | instead of paying for a hotel.", "También podría quedarse con una amiga en vez de pagar un hotel."),
    l("e2-5", "She should make a budget | before buying her ticket.", "Debería hacer un presupuesto antes de comprar su boleto."),
    l("e2-6", "She shouldn't spend money | on things she doesn't need.", "No debería gastar dinero en cosas que no necesita."),
    l("e2-7", "However, | she should compare different options | before making a decision.", "Sin embargo, debería comparar diferentes opciones antes de decidir."),
    l("e2-8", "Overall, that's why planning ahead | could help her travel for less money.", "En general, por eso planear con anticipación podría ayudarla a viajar por menos dinero."),
  ],
  rep2Chunks: [
    ["e2-1", "e2-2"],
    ["e2-3", "e2-4"],
    ["e2-5", "e2-6"],
    ["e2-7", "e2-8"],
  ],
  prompts: [
    p("e2-p1", "What could Aria do?", "¿Qué podría hacer Aria?", "Aria could… Another option is…", "Aria podría… Otra opción es…", "WHAT"),
    p("e2-p2", "Why would that help?", "¿Por qué ayudaría eso?", "That would help because…", "Eso ayudaría porque…", "WHY"),
    p("e2-p3", "Which option is better for her?", "¿Qué opción es mejor para ella?", "I think … is better because…", "Creo que … es mejor porque…", "COMPARE"),
    p("e2-p4", "What could she do if flights are still expensive?", "¿Qué podría hacer si los vuelos siguen caros?", "If flights are still expensive, she could…", "Si los vuelos siguen caros, podría…", "WHAT IF"),
    p("e2-p5", "Why would you recommend that option?", "¿Por qué recomendarías esa opción?", "I'd recommend it because… That's why…", "La recomendaría porque… Por eso…", "DEFEND"),
  ],
  cues: ["PROBLEM", "OPTION 1", "OPTION 2", "BEST OPTION", "WHY"],
  powerChunks: { core: ["another option is…", "that's why…"], stretch: "however…" },
  sceneImage: { src: sceneAriaPeru, alt: "Aria at her kitchen table planning a trip to Peru with a small budget", altEs: "Aria en su cocina planeando un viaje a Perú con poco presupuesto" },
  goalSeconds: [45, 60],
  goalSentences: 6,
  rep5Prompt: { question: "Give Aria your recommendation.", questionEs: "Dale tu recomendación a Aria." },
  rep5Tips: {
    en: "Problem in one sentence. 2–3 options: another option is… Give a reason for each. Close with that's why…",
    es: "El problema en una frase. 2–3 opciones: another option is… Da una razón para cada una. Cierra con that's why…",
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
    examples: ["If I were Carlos, I would practice speaking every day because communication is important.", "She shouldn't be afraid of making mistakes because mistakes are part of learning.", "In addition, she could practice listening every day."],
    goal: "Speak for 50–60 seconds. Connect 7–8 ideas.",
    goalEs: "Habla 50–60 segundos. Conecta 7–8 ideas.",
    cta: START,
  },
  lines: [
    l("e3-1", "Carlos wants a better job, | so he should practice his English more often.", "Carlos quiere un mejor trabajo, así que debería practicar su inglés más seguido."),
    l("e3-2", "If I were Carlos, | I would practice speaking every day | because communication is important.", "Si yo fuera Carlos, practicaría hablar todos los días porque la comunicación es importante."),
    l("e3-3", "He could also apply for more jobs | instead of waiting for one opportunity.", "También podría postularse a más trabajos en vez de esperar una sola oportunidad."),
    l("e3-4", "Maria wants to improve her English, | so she should speak as much as possible.", "Maria quiere mejorar su inglés, así que debería hablar lo más posible."),
    l("e3-5", "She shouldn't be afraid of making mistakes | because mistakes are part of learning.", "No debería tener miedo de equivocarse porque los errores son parte de aprender."),
    l("e3-6", "In addition, | she could practice listening every day.", "Además, podría practicar escucha todos los días."),
    l("e3-7", "David is always late, | so he should prepare everything the night before.", "David siempre llega tarde, así que debería preparar todo la noche anterior."),
    l("e3-8", "Overall, | small changes could help all of them improve.", "En general, pequeños cambios podrían ayudarlos a todos a mejorar."),
  ],
  rep2Chunks: [
    ["e3-1", "e3-2"],
    ["e3-3", "e3-4"],
    ["e3-5", "e3-6"],
    ["e3-7", "e3-8"],
  ],
  prompts: [
    p("e3-p1", "What should this person do?", "¿Qué debería hacer esta persona?", "If I were …, I would…", "Si yo fuera …, yo…", "WHAT"),
    p("e3-p2", "Why?", "¿Por qué?", "Because…", "Porque…", "WHY"),
    p("e3-p3", "Which piece of advice is most important?", "¿Qué consejo es el más importante?", "The most important thing is… because…", "Lo más importante es… porque…", "COMPARE"),
    p("e3-p4", "What could happen if they don't change?", "¿Qué podría pasar si no cambian?", "If they don't change, …", "Si no cambian, …", "WHAT IF"),
    p("e3-p5", "How would you convince them to follow your advice?", "¿Cómo los convencerías de seguir tu consejo?", "I would tell them that… In addition…", "Les diría que… Además…", "DEFEND"),
  ],
  cues: ["PROBLEM", "ADVICE", "WHY", "WHAT IF?", "RESULT"],
  powerChunks: { core: ["if I were you…", "because…"], stretch: "in addition…" },
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
  goalSeconds: [50, 60],
  goalSentences: 7,
  rep5Prompt: { question: "Choose one person. Give this person advice.", questionEs: "Elige una persona. Dale un consejo." },
  rep5Tips: {
    en: "Name the problem. If I were you… + because… for each piece of advice. Add one more with in addition…",
    es: "Di el problema. If I were you… + because… en cada consejo. Agrega uno más con in addition…",
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
    examples: ["Based on what they've told me, Phone A fits their budget.", "On the other hand, Phone B costs much more.", "That's why I'd recommend Phone A."],
    goal: "Sales role play: 3 customer turns. Speak 60–75 seconds in total.",
    goalEs: "Role play de ventas: 3 turnos del cliente. Habla 60–75 segundos en total.",
    cta: START,
  },
  lines: [
    l("e4-1", "First, I would ask the customer | what is most important to them.", "Primero, le preguntaría al cliente qué es lo más importante para él."),
    l("e4-2", "I would also ask | how much they want to spend.", "También le preguntaría cuánto quiere gastar."),
    l("e4-3", "Based on what they've told me, | Phone A fits their budget.", "Según lo que me ha dicho, el Teléfono A se ajusta a su presupuesto."),
    l("e4-4", "It also has a good camera, | which is important to the customer.", "También tiene una buena cámara, que es importante para el cliente."),
    l("e4-5", "Phone B is faster | and has more storage.", "El Teléfono B es más rápido y tiene más almacenamiento."),
    l("e4-6", "On the other hand, | it costs much more than the customer's budget.", "Por otro lado, cuesta mucho más que el presupuesto del cliente."),
    l("e4-7", "That's why I'd recommend Phone A | for this customer.", "Por eso le recomendaría el Teléfono A a este cliente."),
    l("e4-8", "Overall, it gives the customer what they need | without spending too much money.", "En general, le da al cliente lo que necesita sin gastar demasiado dinero."),
  ],
  rep2Chunks: [
    ["e4-1", "e4-2"],
    ["e4-3", "e4-4"],
    ["e4-5", "e4-6"],
    ["e4-7", "e4-8"],
  ],
  prompts: [
    p("e4-p1", "Which phone would you recommend?", "¿Qué teléfono recomendarías?", "Based on what you've told me, I'd recommend…", "Según lo que me ha dicho, le recomendaría…", "WHICH"),
    p("e4-p2", "Why?", "¿Por qué?", "Because…", "Porque…", "WHY"),
    p("e4-p3", "Why is that phone better for THIS customer?", "¿Por qué ese teléfono es mejor para ESTE cliente?", "It's better for this customer because… On the other hand, …", "Es mejor para este cliente porque… Por otro lado, …", "COMPARE"),
    p("e4-p4", "What if the customer says 64 GB is not enough?", "¿Y si el cliente dice que 64 GB no es suficiente?", "I understand your concern. …", "Entiendo su preocupación. …", "WHAT IF"),
    p("e4-p5", "How would you defend your recommendation?", "¿Cómo defenderías tu recomendación?", "That's why I'd recommend… Overall, …", "Por eso le recomendaría… En general, …", "DEFEND"),
  ],
  cues: ["BUDGET", "CAMERA", "COMPARE", "RECOMMEND", "WHY"],
  powerChunks: { core: ["based on what you've told me…", "that's why I'd recommend…"], stretch: "on the other hand…" },
  sceneImage: { src: scenePhones, alt: "Phone A for $350 with a good camera, 64 GB and long battery next to Phone B for $550 with an excellent camera, 256 GB and faster", altEs: "Teléfono A por $350 con buena cámara, 64 GB y batería larga junto al Teléfono B por $550 con cámara excelente, 256 GB y más rápido" },
  storyPanels: [
    card("e4-store", sceneStore, "A sales associate showing two phones to a customer", "DISCOVER → RECOMMEND"),
    card("e4-phones", scenePhones, "Phone A and Phone B comparison", "A $350 · B $550"),
  ],
  goalSeconds: [60, 75],
  goalSentences: 6,
  rep5Turns: [
    {
      id: "e4-turn1",
      label: "CUSTOMER",
      labelEs: "CLIENTE",
      text: "I want a phone with a good camera, but I don't want to spend more than 400 dollars. What do you recommend?",
      es: "Quiero un teléfono con buena cámara, pero no quiero gastar más de 400 dólares. ¿Qué me recomienda?",
      voice: "male",
    },
    {
      id: "e4-turn2",
      label: "CUSTOMER · OBJECTION",
      labelEs: "CLIENTE · OBJECIÓN",
      text: "I'm not sure. Phone A only has 64 gigabytes. Isn't that too little?",
      es: "No estoy seguro. El Teléfono A solo tiene 64 GB. ¿No es muy poco?",
      voice: "male",
    },
    {
      id: "e4-turn3",
      label: "CUSTOMER · OBJECTION",
      labelEs: "CLIENTE · OBJECIÓN",
      text: "Phone B looks much better. Why shouldn't I spend the extra money?",
      es: "El Teléfono B se ve mucho mejor. ¿Por qué no debería gastar el dinero extra?",
      voice: "male",
    },
  ],
  rep5Toolbox: ["Based on what you've told me…", "I understand your concern.", "On the other hand…", "That's why I'd recommend…"],
  rep5Prompt: { question: "Sales role play: listen to each customer turn and respond.", questionEs: "Role play de ventas: escucha cada turno del cliente y responde." },
  rep5Tips: {
    en: "Listen → understand → respond → adapt → defend. You don't have to convince the customer perfectly.",
    es: "Escucha → entiende → responde → adapta → defiende. No tienes que convencer al cliente perfectamente.",
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
    examples: ["If I won a million dollars, I would help my family first.", "However, I would think about my family before making a final decision.", "Overall, I would try to choose what is best for my future."],
    goal: "Final Week 1 target: speak for 60–90 seconds. Connect 8–10 ideas.",
    goalEs: "Meta final de la Week 1: habla 60–90 segundos. Conecta 8–10 ideas.",
    cta: START,
  },
  lines: [
    l("e5-1", "If I won a million dollars, | I would help my family first.", "Si ganara un millón de dólares, primero ayudaría a mi familia."),
    l("e5-2", "After that, I would probably travel | because I enjoy visiting new places.", "Después de eso, probablemente viajaría porque disfruto conocer lugares nuevos."),
    l("e5-3", "I would save some of the money | instead of spending everything.", "Ahorraría parte del dinero en vez de gastarlo todo."),
    l("e5-4", "If I got my dream job in another country, | I would seriously consider moving.", "Si consiguiera el trabajo de mis sueños en otro país, consideraría seriamente mudarme."),
    l("e5-5", "However, | I would think about my family | before making a final decision.", "Sin embargo, pensaría en mi familia antes de tomar una decisión final."),
    l("e5-6", "If that happened, | I would talk to them and compare my options.", "Si eso pasara, hablaría con ellos y compararía mis opciones."),
    l("e5-7", "I wouldn't make the decision | too quickly.", "No tomaría la decisión demasiado rápido."),
    l("e5-8", "Overall, | I would try to choose what is best for my future.", "En general, trataría de elegir lo mejor para mi futuro."),
  ],
  rep2Chunks: [
    ["e5-1", "e5-2"],
    ["e5-3", "e5-4"],
    ["e5-5", "e5-6"],
    ["e5-7", "e5-8"],
  ],
  prompts: [
    p("e5-p1", "What would you do?", "¿Qué harías?", "If that happened, I would…", "Si eso pasara, yo…", "WHAT"),
    p("e5-p2", "Why?", "¿Por qué?", "Because…", "Porque…", "WHY"),
    p("e5-p3", "What other option would you consider?", "¿Qué otra opción considerarías?", "Another option would be… However, …", "Otra opción sería… Sin embargo, …", "COMPARE"),
    p("e5-p4", "What if the situation changed?", "¿Y si la situación cambiara?", "If the situation changed, I would…", "Si la situación cambiara, yo…", "WHAT IF"),
    p("e5-p5", "How would that change your decision?", "¿Cómo cambiaría eso tu decisión?", "It would change my decision because… Overall, …", "Cambiaría mi decisión porque… En general, …", "DEFEND"),
  ],
  cues: ["DECISION", "REASON", "OPTION", "WHAT IF?", "RESULT"],
  powerChunks: { core: ["if that happened…", "overall…"], stretch: "however…" },
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
  goalSeconds: [60, 90],
  goalSentences: 8,
  rep5Prompt: {
    question: "Choose one. A: If you got your dream job in another country, what would you do? B: If a customer wanted a better product but had a limited budget, what would you recommend and why?",
    questionEs: "Elige una. A: Si consiguieras el trabajo de tus sueños en otro país, ¿qué harías? B: Si un cliente quisiera un mejor producto pero tuviera poco presupuesto, ¿qué le recomendarías y por qué?",
  },
  rep5Tips: {
    en: "Decision → reason → another option → what if? → result. Use because…, however…, if that happened…, overall…",
    es: "Decisión → razón → otra opción → ¿y si? → resultado. Usa because…, however…, if that happened…, overall…",
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
