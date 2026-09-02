/**
 * MODULE 4 — BASIC 1 · SIMPLE FUTURE (4 weeks / 20 days)
 * Week 1: GOING TO (I)          Week 2: GOING TO (he / she)
 * Week 3: WILL / WON'T          Week 4: mixed GOING TO + WILL
 *
 * Image-first: every day has one scene picture plus keyword cue cards
 * (rendered as the visual sequence) so learners speak from images, not text.
 */

import type { CourseDay, ModelLine, PersonalPrompt, StoryPanel } from "@/lib/types";

/* ------------------------------- images ------------------------------- */

import sceneTonight from "@/assets/module4/scene-w1d1-tonight.jpg";
import sceneTomorrow from "@/assets/module4/scene-w1d2-tomorrow.jpg";
import sceneWeekend from "@/assets/module4/scene-w1d3-weekend.jpg";
import sceneVacation from "@/assets/module4/scene-w1d4-vacation.jpg";
import sceneW1Challenge from "@/assets/module4/scene-w1d5-challenge.jpg";
import sceneFriendWeekend from "@/assets/module4/scene-w2d1-friend-weekend.jpg";
import sceneMomTomorrow from "@/assets/module4/scene-w2d2-mom-tomorrow.jpg";
import sceneBusyPerson from "@/assets/module4/scene-w2d3-busy-person.jpg";
import sceneTwoPeople from "@/assets/module4/scene-w2d4-two-people.jpg";
import sceneW2Challenge from "@/assets/module4/scene-w2d5-challenge.jpg";
import sceneDecisions from "@/assets/module4/scene-w3d1-decisions.jpg";
import scenePromises from "@/assets/module4/scene-w3d2-promises.jpg";
import scenePredictions from "@/assets/module4/scene-w3d3-predictions.jpg";
import sceneHerFuture from "@/assets/module4/scene-w3d4-her-future.jpg";
import sceneW3Challenge from "@/assets/module4/scene-w3d5-challenge.jpg";
import scenePlanOrDecision from "@/assets/module4/scene-w4d1-plan-or-decision.jpg";
import sceneMyWeekend from "@/assets/module4/scene-w4d2-my-weekend.jpg";
import sceneMariaFuture from "@/assets/module4/scene-w4d3-maria-future.jpg";
import sceneWhatsHappening from "@/assets/module4/scene-w4d4-whats-going-to-happen.jpg";
import sceneW4Challenge from "@/assets/module4/scene-w4d5-challenge.jpg";

import cueDinner from "@/assets/module4/cue-dinner.jpg";
import cueFamily from "@/assets/module4/cue-family.jpg";
import cueMovie from "@/assets/module4/cue-movie.jpg";
import cueStudy from "@/assets/module4/cue-study.jpg";
import cueSleep from "@/assets/module4/cue-sleep.jpg";
import cueExercise from "@/assets/module4/cue-exercise.jpg";
import cueWakeEarly from "@/assets/module4/cue-wake-early.jpg";
import cueWork from "@/assets/module4/cue-work.jpg";
import cueFriends from "@/assets/module4/cue-friends.jpg";
import cueRestaurant from "@/assets/module4/cue-restaurant.jpg";
import cueShopping from "@/assets/module4/cue-shopping.jpg";
import cueRelax from "@/assets/module4/cue-relax.jpg";
import cueBeach from "@/assets/module4/cue-beach.jpg";
import cueAirport from "@/assets/module4/cue-airport.jpg";
import cueSuitcase from "@/assets/module4/cue-suitcase.jpg";
import cuePhoneRinging from "@/assets/module4/cue-phone-ringing.jpg";
import cueHeavyBags from "@/assets/module4/cue-heavy-bags.jpg";
import cueDoorbell from "@/assets/module4/cue-doorbell.jpg";
import cueStorm from "@/assets/module4/cue-storm.jpg";
import cuePromise from "@/assets/module4/cue-promise.jpg";

/* ------------------------------- helpers ------------------------------- */

const GOAL: [number, number] = [30, 45];

export const SIMPLE_FUTURE_WEEKS: {
  week: 1 | 2 | 3 | 4;
  title: string;
  subtitle: string;
  subtitleEs: string;
}[] = [
  { week: 1, title: "My Future Plans", subtitle: "Going To — I", subtitleEs: "Mis planes — going to (yo)" },
  { week: 2, title: "Their Future Plans", subtitle: "Going To — He / She", subtitleEs: "Planes de otros — going to (él / ella)" },
  { week: 3, title: "Decisions, Promises & Predictions", subtitle: "Will / Won't", subtitleEs: "Decisiones, promesas y predicciones — will / won't" },
  { week: 4, title: "Future Fluency", subtitle: "Going To + Will", subtitleEs: "Fluidez del futuro — going to + will" },
];

/** `l("id", "I'm going to | eat dinner.", "…")` — `|` marks speaking chunks. */
function l(id: string, marked: string, es: string): ModelLine {
  const chunks = marked.split("|").map((chunk) => chunk.trim()).filter(Boolean);
  return { id, text: chunks.join(" "), es, chunks };
}

function p(id: string, question: string, questionEs: string, starter: string, starterEs: string, cue?: string): PersonalPrompt {
  return { id, question, questionEs, starter, starterEs, cue };
}

/** Keyword cue card: image + one short cue, no full sentence. */
function card(id: string, src: string, alt: string, cue: string): StoryPanel {
  return { id, src, alt, cue };
}

type DayInput = {
  day: number;
  week: 1 | 2 | 3 | 4;
  topic: string;
  topicEs: string;
  intro: CourseDay["intro"];
  lines: ModelLine[];
  prompts: PersonalPrompt[];
  cues: string[];
  rep5Prompt: CourseDay["rep5Prompt"];
  rep5Tips?: { en: string; es: string };
  storyPanels?: StoryPanel[];
  sceneImage?: { src: string; alt: string; altEs: string };
  variants?: { id: string; label: string; labelEs: string }[];
  goalSeconds?: [number, number];
  goalSentences?: number;
  hideModelText?: boolean;
};

function makeDay(input: DayInput): CourseDay {
  const week = SIMPLE_FUTURE_WEEKS.find((w) => w.week === input.week)!;
  return {
    day: input.day,
    week: input.week,
    weekTitle: week.title,
    weekTitleEs: week.subtitleEs,
    focus: week.title,
    focusEs: week.subtitleEs,
    topic: input.topic,
    topicEs: input.topicEs,
    goalSeconds: input.goalSeconds ?? GOAL,
    estimatedMinutes: "5–8 min",
    intro: input.intro,
    lines: input.lines,
    prompts: input.prompts,
    cues: input.cues,
    rep5Prompt: input.rep5Prompt,
    ...(input.rep5Tips ? { rep5Tips: input.rep5Tips } : {}),
    ...(input.storyPanels ? { storyPanels: input.storyPanels } : {}),
    ...(input.sceneImage ? { sceneImage: input.sceneImage } : {}),
    ...(input.variants ? { variants: input.variants } : {}),
    ...(input.goalSentences ? { goalSentences: input.goalSentences } : {}),
    ...(input.hideModelText ? { hideModelText: true } : {}),
    modelExample: {
      text: input.lines.map((line) => line.text).join(" "),
      es: input.lines.map((line) => line.es).join(" "),
    },
  };
}

const START = "START REP 1";

/* ========================= WEEK 1 — MY FUTURE PLANS ========================= */

const d1 = makeDay({
  day: 1,
  week: 1,
  topic: "Tonight",
  topicEs: "Esta noche",
  intro: {
    title: "GOING TO = MY PLAN",
    titleEs: "GOING TO = MI PLAN",
    lead: "A plan you already have. I + AM GOING TO + verb.",
    leadEs: "Un plan que ya tienes. I + AM GOING TO + verbo.",
    examples: ["I'm going to eat dinner.", "I'm not going to work late.", "I'm going to sleep early."],
    goal: "Speak for 30+ seconds.",
    goalEs: "Habla 30 segundos o más.",
    cta: START,
  },
  lines: [
    l("m4d1-1", "Tonight, | I'm going to go home | early.", "Esta noche voy a llegar a casa temprano."),
    l("m4d1-2", "I'm going to eat dinner | with my family.", "Voy a cenar con mi familia."),
    l("m4d1-3", "After dinner, | I'm going to watch a movie.", "Después de cenar voy a ver una película."),
    l("m4d1-4", "I'm going to study English | for twenty minutes.", "Voy a estudiar inglés veinte minutos."),
    l("m4d1-5", "I'm not going to work | tonight.", "No voy a trabajar esta noche."),
    l("m4d1-6", "I'm not going to use my phone | in bed.", "No voy a usar el teléfono en la cama."),
    l("m4d1-7", "I'm going to go to bed | around eleven.", "Me voy a acostar como a las once."),
    l("m4d1-8", "It's going to be | a relaxed night.", "Va a ser una noche tranquila."),
  ],
  prompts: [
    p("m4d1-p1", "What time are you going to go home?", "¿A qué hora vas a llegar a casa?", "Tonight, I'm going to…", "Esta noche voy a…", "WHEN"),
    p("m4d1-p2", "What are you going to eat?", "¿Qué vas a cenar?", "I'm going to eat…", "Voy a comer…", "WHAT"),
    p("m4d1-p3", "Who are you going to be with?", "¿Con quién vas a estar?", "I'm going to be with…", "Voy a estar con…", "WHO"),
    p("m4d1-p4", "What are you NOT going to do?", "¿Qué NO vas a hacer?", "I'm not going to…", "No voy a…", "WHAT"),
  ],
  cues: ["GO HOME", "DINNER", "MOVIE", "STUDY", "NOT WORK", "SLEEP"],
  sceneImage: { src: sceneTonight, alt: "A man arriving home for dinner with his family", altEs: "Un hombre llega a casa a cenar con su familia" },
  storyPanels: [
    card("m4d1-c1", cueDinner, "A dinner plate on the table", "DINNER"),
    card("m4d1-c2", cueFamily, "A family talking on the sofa", "FAMILY"),
    card("m4d1-c3", cueMovie, "A person watching a movie", "MOVIE"),
    card("m4d1-c4", cueStudy, "A person studying English", "STUDY"),
    card("m4d1-c5", cueSleep, "A person sleeping", "SLEEP EARLY"),
  ],
  rep5Prompt: { question: "What are you going to do tonight?", questionEs: "¿Qué vas a hacer esta noche?" },
  rep5Tips: {
    en: "Use I'm going to… and one I'm not going to… Connect with then, after that and later.",
    es: "Usa I'm going to… y una frase con I'm not going to… Conecta con then, after that y later.",
  },
});

const d2 = makeDay({
  day: 2,
  week: 1,
  topic: "Tomorrow",
  topicEs: "Mañana",
  intro: {
    title: "MY DAY TOMORROW",
    titleEs: "MI DÍA DE MAÑANA",
    lead: "Same plan form, a full day: morning, afternoon, night.",
    leadEs: "Misma forma, un día completo: mañana, tarde y noche.",
    examples: ["I'm going to wake up early.", "I'm going to work.", "I'm not going to stay late."],
    goal: "Speak for 30+ seconds.",
    goalEs: "Habla 30 segundos o más.",
    cta: START,
  },
  lines: [
    l("m4d2-1", "Tomorrow, | I'm going to wake up | at six.", "Mañana me voy a despertar a las seis."),
    l("m4d2-2", "I'm going to exercise | for thirty minutes.", "Voy a hacer ejercicio treinta minutos."),
    l("m4d2-3", "In the morning, | I'm going to work.", "En la mañana voy a trabajar."),
    l("m4d2-4", "I'm going to have lunch | with a coworker.", "Voy a almorzar con un compañero."),
    l("m4d2-5", "In the afternoon, | I'm going to study English.", "En la tarde voy a estudiar inglés."),
    l("m4d2-6", "I'm not going to stay | at the office late.", "No me voy a quedar tarde en la oficina."),
    l("m4d2-7", "At night, | I'm going to relax at home.", "En la noche voy a descansar en casa."),
    l("m4d2-8", "Tomorrow is going to be | a busy day.", "Mañana va a ser un día ocupado."),
  ],
  prompts: [
    p("m4d2-p1", "What time are you going to wake up?", "¿A qué hora te vas a despertar?", "I'm going to wake up…", "Me voy a despertar…", "WHEN"),
    p("m4d2-p3", "What are you going to do in the morning?", "¿Qué vas a hacer en la mañana?", "In the morning, I'm going to…", "En la mañana voy a…", "WHAT"),
    p("m4d2-p4", "Where are you going to have lunch?", "¿Dónde vas a almorzar?", "I'm going to have lunch…", "Voy a almorzar…", "WHERE"),
    p("m4d2-p5", "What are you going to do in the afternoon?", "¿Qué vas a hacer en la tarde?", "In the afternoon, I'm going to…", "En la tarde voy a…", "WHAT"),
    p("m4d2-p7", "What are you going to do at night?", "¿Qué vas a hacer en la noche?", "At night, I'm going to…", "En la noche voy a…", "WHAT"),
  ],
  cues: ["WAKE UP", "EXERCISE", "WORK", "LUNCH", "STUDY", "RELAX"],
  sceneImage: { src: sceneTomorrow, alt: "A woman's day: waking up, studying, exercising and eating with family", altEs: "El día de una mujer: despertarse, estudiar, hacer ejercicio y comer en familia" },
  storyPanels: [
    card("m4d2-c1", cueWakeEarly, "An alarm clock in the morning", "WAKE UP"),
    card("m4d2-c2", cueExercise, "A woman running", "EXERCISE"),
    card("m4d2-c3", cueWork, "A person working at a computer", "WORK"),
    card("m4d2-c4", cueRestaurant, "People eating at a restaurant", "LUNCH"),
    card("m4d2-c5", cueRelax, "A person relaxing on the sofa", "RELAX"),
  ],
  rep5Prompt: { question: "What are you going to do tomorrow?", questionEs: "¿Qué vas a hacer mañana?" },
  rep5Tips: {
    en: "Order your day: in the morning, in the afternoon, at night. Add one I'm not going to…",
    es: "Ordena tu día: in the morning, in the afternoon, at night. Agrega una frase con I'm not going to…",
  },
});

const d3 = makeDay({
  day: 3,
  week: 1,
  topic: "This Weekend",
  topicEs: "Este fin de semana",
  intro: {
    title: "MY WEEKEND PLANS",
    titleEs: "MIS PLANES DEL FIN DE SEMANA",
    lead: "Talk about Saturday and Sunday with going to.",
    leadEs: "Habla del sábado y del domingo con going to.",
    examples: ["On Saturday, I'm going to…", "On Sunday, I'm going to…", "I'm not going to work."],
    goal: "Speak for 30+ seconds.",
    goalEs: "Habla 30 segundos o más.",
    cta: START,
  },
  lines: [
    l("m4d3-1", "This weekend, | I'm going to rest | a lot.", "Este fin de semana voy a descansar mucho."),
    l("m4d3-2", "On Saturday, | I'm going to meet my friends.", "El sábado voy a ver a mis amigos."),
    l("m4d3-3", "We're going to eat | at a restaurant.", "Vamos a comer en un restaurante."),
    l("m4d3-4", "In the afternoon, | I'm going to go shopping.", "En la tarde voy a ir de compras."),
    l("m4d3-5", "On Sunday, | I'm going to stay home.", "El domingo me voy a quedar en casa."),
    l("m4d3-6", "I'm not going to work | this weekend.", "No voy a trabajar este fin de semana."),
    l("m4d3-7", "I'm going to study English | for one hour.", "Voy a estudiar inglés una hora."),
    l("m4d3-8", "It's going to be | a good weekend.", "Va a ser un buen fin de semana."),
  ],
  prompts: [
    p("m4d3-p2", "What are you going to do on Saturday?", "¿Qué vas a hacer el sábado?", "On Saturday, I'm going to…", "El sábado voy a…", "WHAT"),
    p("m4d3-p3", "Who are you going to see?", "¿A quién vas a ver?", "I'm going to see…", "Voy a ver a…", "WHO"),
    p("m4d3-p4", "Where are you going to eat?", "¿Dónde vas a comer?", "We're going to eat…", "Vamos a comer…", "WHERE"),
    p("m4d3-p5", "What are you going to do on Sunday?", "¿Qué vas a hacer el domingo?", "On Sunday, I'm going to…", "El domingo voy a…", "WHAT"),
  ],
  cues: ["SATURDAY", "FRIENDS", "RESTAURANT", "SHOPPING", "SUNDAY", "NOT WORK"],
  sceneImage: { src: sceneWeekend, alt: "Adults enjoying a weekend at an outdoor restaurant", altEs: "Adultos disfrutando el fin de semana en un restaurante al aire libre" },
  storyPanels: [
    card("m4d3-c1", cueFriends, "Two friends meeting", "FRIENDS"),
    card("m4d3-c2", cueRestaurant, "People eating at a restaurant", "RESTAURANT"),
    card("m4d3-c3", cueShopping, "A person shopping", "SHOPPING"),
    card("m4d3-c4", cueRelax, "A person relaxing at home", "STAY HOME"),
    card("m4d3-c5", cueStudy, "A person studying English", "STUDY"),
  ],
  rep5Prompt: { question: "What are you going to do this weekend?", questionEs: "¿Qué vas a hacer este fin de semana?" },
  rep5Tips: {
    en: "Separate the days: On Saturday… On Sunday… Add one negative plan.",
    es: "Separa los días: On Saturday… On Sunday… Agrega un plan en negativo.",
  },
});

const d4 = makeDay({
  day: 4,
  week: 1,
  topic: "My Next Vacation",
  topicEs: "Mis próximas vacaciones",
  intro: {
    title: "A BIGGER PLAN",
    titleEs: "UN PLAN MÁS GRANDE",
    lead: "Same form, bigger plan. Where, who, how long, what.",
    leadEs: "Misma forma, plan más grande. Dónde, con quién, cuánto tiempo, qué.",
    examples: ["I'm going to travel to…", "I'm going to stay for…", "I'm not going to work."],
    goal: "Speak for 30+ seconds.",
    goalEs: "Habla 30 segundos o más.",
    cta: START,
  },
  lines: [
    l("m4d4-1", "Next year, | I'm going to take a vacation.", "El próximo año voy a tomar vacaciones."),
    l("m4d4-2", "I'm going to travel | to the beach.", "Voy a viajar a la playa."),
    l("m4d4-3", "I'm going to go | with my family.", "Voy a ir con mi familia."),
    l("m4d4-4", "We're going to stay | for one week.", "Vamos a quedarnos una semana."),
    l("m4d4-5", "I'm going to pack | one small suitcase.", "Voy a empacar una maleta pequeña."),
    l("m4d4-6", "We're going to eat | a lot of good food.", "Vamos a comer mucha comida rica."),
    l("m4d4-7", "I'm not going to check | my work email.", "No voy a revisar el correo del trabajo."),
    l("m4d4-8", "It's going to be | an amazing trip.", "Va a ser un viaje increíble."),
  ],
  prompts: [
    p("m4d4-p1", "When are you going to take a vacation?", "¿Cuándo vas a tomar vacaciones?", "I'm going to take a vacation…", "Voy a tomar vacaciones…", "WHEN"),
    p("m4d4-p2", "Where are you going to travel?", "¿A dónde vas a viajar?", "I'm going to travel to…", "Voy a viajar a…", "WHERE"),
    p("m4d4-p3", "Who are you going to go with?", "¿Con quién vas a ir?", "I'm going to go with…", "Voy a ir con…", "WHO"),
    p("m4d4-p4", "How long are you going to stay?", "¿Cuánto tiempo te vas a quedar?", "We're going to stay…", "Vamos a quedarnos…", "HOW"),
    p("m4d4-p5", "What are you going to pack?", "¿Qué vas a empacar?", "I'm going to pack…", "Voy a empacar…", "WHAT"),
  ],
  cues: ["TRAVEL", "BEACH", "FAMILY", "SUITCASE", "ONE WEEK", "NOT WORK"],
  sceneImage: { src: sceneVacation, alt: "A couple with suitcases at the airport", altEs: "Una pareja con maletas en el aeropuerto" },
  storyPanels: [
    card("m4d4-c1", cueAirport, "An airplane at the gate", "AIRPORT"),
    card("m4d4-c2", cueSuitcase, "Packing a suitcase", "PACK"),
    card("m4d4-c3", cueBeach, "A tropical beach", "BEACH"),
    card("m4d4-c4", cueFamily, "A family together", "FAMILY"),
    card("m4d4-c5", cueRestaurant, "Eating at a restaurant", "GOOD FOOD"),
  ],
  variants: [
    { id: "beach", label: "BEACH", labelEs: "PLAYA" },
    { id: "city", label: "BIG CITY", labelEs: "CIUDAD" },
    { id: "family", label: "FAMILY VISIT", labelEs: "VISITA FAMILIAR" },
  ],
  rep5Prompt: { question: "Tell me about your next vacation.", questionEs: "Cuéntame de tus próximas vacaciones." },
  rep5Tips: {
    en: "Answer where, who with, how long and what you're going to do. Add one I'm not going to…",
    es: "Responde a dónde, con quién, cuánto tiempo y qué vas a hacer. Agrega una frase con I'm not going to…",
  },
});

const d5 = makeDay({
  day: 5,
  week: 1,
  topic: "My Plans Challenge",
  topicEs: "Reto de mis planes",
  intro: {
    title: "PUT IT ALL TOGETHER",
    titleEs: "JUNTA TODO",
    lead: "Tonight, tomorrow, this weekend and next month — all in one talk.",
    leadEs: "Esta noche, mañana, este fin de semana y el próximo mes — todo en una sola charla.",
    examples: ["Tonight, I'm going to…", "This weekend, I'm going to…", "Next month, I'm going to…"],
    goal: "Speak for 30–45 seconds.",
    goalEs: "Habla de 30 a 45 segundos.",
    cta: START,
  },
  lines: [
    l("m4d5-1", "Tonight, | I'm going to relax at home.", "Esta noche voy a descansar en casa."),
    l("m4d5-2", "Tomorrow, | I'm going to work | all day.", "Mañana voy a trabajar todo el día."),
    l("m4d5-3", "I'm going to study English | after work.", "Voy a estudiar inglés después del trabajo."),
    l("m4d5-4", "This weekend, | I'm going to see my friends.", "Este fin de semana voy a ver a mis amigos."),
    l("m4d5-5", "We're going to go | to a restaurant.", "Vamos a ir a un restaurante."),
    l("m4d5-6", "I'm not going to stay | in bed all day.", "No me voy a quedar en la cama todo el día."),
    l("m4d5-7", "Next month, | I'm going to take a short trip.", "El próximo mes voy a hacer un viaje corto."),
    l("m4d5-8", "My plans | are going to keep me busy.", "Mis planes me van a mantener ocupado."),
  ],
  prompts: [
    p("m4d5-p1", "What are you going to do tonight?", "¿Qué vas a hacer esta noche?", "Tonight, I'm going to…", "Esta noche voy a…", "WHAT"),
    p("m4d5-p2", "What are you going to do tomorrow?", "¿Qué vas a hacer mañana?", "Tomorrow, I'm going to…", "Mañana voy a…", "WHAT"),
    p("m4d5-p4", "What are your weekend plans?", "¿Cuáles son tus planes del fin de semana?", "This weekend, I'm going to…", "Este fin de semana voy a…", "WHAT"),
    p("m4d5-p7", "What are you going to do next month?", "¿Qué vas a hacer el próximo mes?", "Next month, I'm going to…", "El próximo mes voy a…", "WHAT"),
  ],
  cues: ["TONIGHT", "TOMORROW", "WEEKEND", "NEXT MONTH", "NOT…"],
  sceneImage: { src: sceneW1Challenge, alt: "A calendar, a phone and a plane ticket on a desk", altEs: "Un calendario, un teléfono y un boleto de avión sobre un escritorio" },
  storyPanels: [
    card("m4d5-c1", cueDinner, "Dinner at home", "TONIGHT"),
    card("m4d5-c2", cueWork, "Working at a computer", "TOMORROW"),
    card("m4d5-c3", cueFriends, "Friends meeting", "WEEKEND"),
    card("m4d5-c4", cueSuitcase, "Packing a suitcase", "NEXT MONTH"),
  ],
  goalSentences: 5,
  rep5Prompt: { question: "Tell me all your future plans: tonight, tomorrow, this weekend and next month.", questionEs: "Cuéntame todos tus planes: esta noche, mañana, este fin de semana y el próximo mes." },
  rep5Tips: {
    en: "Use time words to move forward: tonight, tomorrow, this weekend, next month. Include one negative.",
    es: "Usa palabras de tiempo para avanzar: tonight, tomorrow, this weekend, next month. Incluye una frase en negativo.",
  },
});

/* ======================= WEEK 2 — THEIR FUTURE PLANS ======================= */

const d6 = makeDay({
  day: 6,
  week: 2,
  topic: "My Friend's Weekend",
  topicEs: "El fin de semana de mi amigo",
  intro: {
    title: "HE IS GOING TO",
    titleEs: "HE IS GOING TO",
    lead: "For he, use IS: He is going to… / He isn't going to…",
    leadEs: "Para he usa IS: He is going to… / He isn't going to…",
    examples: ["He's going to play soccer.", "He isn't going to work.", "He's going to rest."],
    goal: "Speak for 30+ seconds.",
    goalEs: "Habla 30 segundos o más.",
    cta: START,
  },
  lines: [
    l("m4d6-1", "My friend Carlos | is going to have | a busy weekend.", "Mi amigo Carlos va a tener un fin de semana ocupado."),
    l("m4d6-2", "On Saturday, | he's going to play soccer.", "El sábado va a jugar fútbol."),
    l("m4d6-3", "He's going to meet | his teammates | at the park.", "Va a encontrarse con su equipo en el parque."),
    l("m4d6-4", "After the game, | he's going to eat with them.", "Después del partido va a comer con ellos."),
    l("m4d6-5", "He isn't going to work | on Saturday.", "No va a trabajar el sábado."),
    l("m4d6-6", "On Sunday, | he's going to visit his parents.", "El domingo va a visitar a sus papás."),
    l("m4d6-7", "He's going to sleep | early on Sunday night.", "Va a dormir temprano el domingo en la noche."),
    l("m4d6-8", "He's going to be | tired but happy.", "Va a estar cansado pero feliz."),
  ],
  prompts: [
    p("m4d6-p1", "What is your friend going to do?", "¿Qué va a hacer tu amigo?", "My friend is going to…", "Mi amigo va a…", "WHAT"),
    p("m4d6-p2", "What is he going to do on Saturday?", "¿Qué va a hacer el sábado?", "On Saturday, he's going to…", "El sábado él va a…", "WHAT"),
    p("m4d6-p3", "Who is he going to meet?", "¿A quién va a ver?", "He's going to meet…", "Él va a ver a…", "WHO"),
    p("m4d6-p5", "What isn't he going to do?", "¿Qué NO va a hacer?", "He isn't going to…", "Él no va a…", "WHAT"),
    p("m4d6-p6", "What is he going to do on Sunday?", "¿Qué va a hacer el domingo?", "On Sunday, he's going to…", "El domingo él va a…", "WHAT"),
  ],
  cues: ["HE'S GOING TO", "SOCCER", "FRIENDS", "EAT", "ISN'T GOING TO", "SLEEP"],
  sceneImage: { src: sceneFriendWeekend, alt: "A man playing soccer with friends in a park", altEs: "Un hombre jugando fútbol con amigos en un parque" },
  storyPanels: [
    card("m4d6-c1", cueExercise, "Playing sport", "PLAY"),
    card("m4d6-c2", cueFriends, "Meeting friends", "TEAM"),
    card("m4d6-c3", cueRestaurant, "Eating together", "EAT"),
    card("m4d6-c4", cueFamily, "Visiting family", "PARENTS"),
    card("m4d6-c5", cueSleep, "Sleeping", "SLEEP EARLY"),
  ],
  rep5Prompt: { question: "What is your friend going to do this weekend?", questionEs: "¿Qué va a hacer tu amigo este fin de semana?" },
  rep5Tips: {
    en: "Use he's going to… every time, and one he isn't going to…",
    es: "Usa he's going to… en cada idea, y una frase con he isn't going to…",
  },
});

const d7 = makeDay({
  day: 7,
  week: 2,
  topic: "My Mom's Tomorrow",
  topicEs: "El mañana de mi mamá",
  intro: {
    title: "SHE IS GOING TO",
    titleEs: "SHE IS GOING TO",
    lead: "Same form with she: She's going to… / She isn't going to…",
    leadEs: "Misma forma con she: She's going to… / She isn't going to…",
    examples: ["She's going to cook.", "She's going to go shopping.", "She isn't going to drive."],
    goal: "Speak for 30+ seconds.",
    goalEs: "Habla 30 segundos o más.",
    cta: START,
  },
  lines: [
    l("m4d7-1", "Tomorrow, | my mom is going to wake up | early.", "Mañana mi mamá se va a despertar temprano."),
    l("m4d7-2", "She's going to make breakfast | for everybody.", "Va a hacer el desayuno para todos."),
    l("m4d7-3", "In the morning, | she's going to go shopping.", "En la mañana va a ir de compras."),
    l("m4d7-4", "She's going to buy | fruit and vegetables.", "Va a comprar fruta y verduras."),
    l("m4d7-5", "In the afternoon, | she's going to cook lunch.", "En la tarde va a cocinar el almuerzo."),
    l("m4d7-6", "She isn't going to work | tomorrow.", "No va a trabajar mañana."),
    l("m4d7-7", "At night, | she's going to watch her show.", "En la noche va a ver su programa."),
    l("m4d7-8", "She's going to have | a calm day.", "Va a tener un día tranquilo."),
  ],
  prompts: [
    p("m4d7-p1", "What time is she going to wake up?", "¿A qué hora se va a despertar?", "She's going to wake up…", "Ella se va a despertar…", "WHEN"),
    p("m4d7-p2", "What is she going to make?", "¿Qué va a preparar?", "She's going to make…", "Ella va a hacer…", "WHAT"),
    p("m4d7-p4", "What is she going to buy?", "¿Qué va a comprar?", "She's going to buy…", "Ella va a comprar…", "WHAT"),
    p("m4d7-p6", "What isn't she going to do?", "¿Qué NO va a hacer?", "She isn't going to…", "Ella no va a…", "WHAT"),
    p("m4d7-p7", "What is she going to do at night?", "¿Qué va a hacer en la noche?", "At night, she's going to…", "En la noche ella va a…", "WHAT"),
  ],
  cues: ["SHE'S GOING TO", "BREAKFAST", "SHOPPING", "COOK", "ISN'T GOING TO", "TV"],
  sceneImage: { src: sceneMomTomorrow, alt: "A woman in her kitchen with shopping bags and car keys", altEs: "Una mujer en su cocina con bolsas de compras y llaves del carro" },
  storyPanels: [
    card("m4d7-c1", cueWakeEarly, "Waking up early", "WAKE UP"),
    card("m4d7-c2", cueShopping, "Shopping at the supermarket", "SHOPPING"),
    card("m4d7-c3", cueDinner, "Home-cooked food", "COOK"),
    card("m4d7-c4", cueFamily, "Family together", "FAMILY"),
    card("m4d7-c5", cueMovie, "Watching TV", "HER SHOW"),
  ],
  rep5Prompt: { question: "What is your mom (or another woman you know) going to do tomorrow?", questionEs: "¿Qué va a hacer tu mamá (u otra mujer que conozcas) mañana?" },
  rep5Tips: {
    en: "Say she's going to… for every idea, and include one she isn't going to…",
    es: "Di she's going to… en cada idea, e incluye una con she isn't going to…",
  },
});

const d8 = makeDay({
  day: 8,
  week: 2,
  topic: "A Busy Person's Weekend",
  topicEs: "El fin de semana de una persona ocupada",
  intro: {
    title: "A FULL SCHEDULE",
    titleEs: "UNA AGENDA LLENA",
    lead: "Describe another person's busy plans, hour by hour.",
    leadEs: "Describe los planes ocupados de otra persona, hora por hora.",
    examples: ["First, she's going to…", "Then she's going to…", "She isn't going to rest."],
    goal: "Speak for 30+ seconds.",
    goalEs: "Habla 30 segundos o más.",
    cta: START,
  },
  lines: [
    l("m4d8-1", "My boss | is going to have | a very busy weekend.", "Mi jefa va a tener un fin de semana muy ocupado."),
    l("m4d8-2", "First, | she's going to finish a report.", "Primero va a terminar un reporte."),
    l("m4d8-3", "Then | she's going to call three clients.", "Luego va a llamar a tres clientes."),
    l("m4d8-4", "In the afternoon, | she's going to travel | to another city.", "En la tarde va a viajar a otra ciudad."),
    l("m4d8-5", "She's going to stay | in a hotel | one night.", "Se va a quedar en un hotel una noche."),
    l("m4d8-6", "She isn't going to rest | very much.", "No va a descansar mucho."),
    l("m4d8-7", "On Sunday, | she's going to come back home.", "El domingo va a regresar a casa."),
    l("m4d8-8", "She's going to be | really tired | on Monday.", "El lunes va a estar muy cansada."),
  ],
  prompts: [
    p("m4d8-p2", "What is she going to do first?", "¿Qué va a hacer primero?", "First, she's going to…", "Primero ella va a…", "WHAT"),
    p("m4d8-p3", "Who is she going to call?", "¿A quién va a llamar?", "She's going to call…", "Ella va a llamar a…", "WHO"),
    p("m4d8-p4", "Where is she going to travel?", "¿A dónde va a viajar?", "She's going to travel…", "Ella va a viajar…", "WHERE"),
    p("m4d8-p6", "What isn't she going to do?", "¿Qué NO va a hacer?", "She isn't going to…", "Ella no va a…", "WHAT"),
    p("m4d8-p7", "When is she going to come back?", "¿Cuándo va a regresar?", "She's going to come back…", "Ella va a regresar…", "WHEN"),
  ],
  cues: ["FIRST", "THEN", "TRAVEL", "HOTEL", "ISN'T GOING TO", "TIRED"],
  sceneImage: { src: sceneBusyPerson, alt: "A busy professional woman walking through an office with a phone and documents", altEs: "Una mujer profesional ocupada camina por la oficina con teléfono y documentos" },
  storyPanels: [
    card("m4d8-c1", cueWork, "Working at a computer", "REPORT"),
    card("m4d8-c2", cuePhoneRinging, "A ringing phone", "CALLS"),
    card("m4d8-c3", cueAirport, "An airplane at the gate", "TRAVEL"),
    card("m4d8-c4", cueSuitcase, "Packing a suitcase", "ONE NIGHT"),
    card("m4d8-c5", cueSleep, "A tired person sleeping", "TIRED"),
  ],
  rep5Prompt: { question: "Describe a busy person's weekend. What is he or she going to do?", questionEs: "Describe el fin de semana de una persona ocupada. ¿Qué va a hacer?" },
  rep5Tips: {
    en: "Order the plans: first, then, after that, finally. Keep he's / she's going to…",
    es: "Ordena los planes: first, then, after that, finally. Mantén he's / she's going to…",
  },
});

const d9 = makeDay({
  day: 9,
  week: 2,
  topic: "Two Different People",
  topicEs: "Dos personas diferentes",
  intro: {
    title: "COMPARE TWO PLANS",
    titleEs: "COMPARA DOS PLANES",
    lead: "Maria and Carlos. Different plans, same form.",
    leadEs: "María y Carlos. Planes diferentes, misma forma.",
    examples: ["Maria is going to study.", "Carlos is going to travel.", "They aren't going to meet."],
    goal: "Speak for 30+ seconds.",
    goalEs: "Habla 30 segundos o más.",
    cta: START,
  },
  lines: [
    l("m4d9-1", "Maria and Carlos | are going to have | different weekends.", "María y Carlos van a tener fines de semana diferentes."),
    l("m4d9-2", "Maria is going to study | for an exam.", "María va a estudiar para un examen."),
    l("m4d9-3", "She's going to stay | at home | all Saturday.", "Se va a quedar en casa todo el sábado."),
    l("m4d9-4", "She isn't going to go out | with friends.", "No va a salir con amigos."),
    l("m4d9-5", "Carlos is going to travel | to the beach.", "Carlos va a viajar a la playa."),
    l("m4d9-6", "He's going to pack | his suitcase | tonight.", "Va a empacar su maleta esta noche."),
    l("m4d9-7", "He isn't going to study | this weekend.", "No va a estudiar este fin de semana."),
    l("m4d9-8", "They're going to see each other | on Monday.", "Se van a ver el lunes."),
  ],
  prompts: [
    p("m4d9-p2", "What is Maria going to do?", "¿Qué va a hacer María?", "Maria is going to…", "María va a…", "WHAT"),
    p("m4d9-p3", "Where is she going to stay?", "¿Dónde se va a quedar?", "She's going to stay…", "Ella se va a quedar…", "WHERE"),
    p("m4d9-p5", "What is Carlos going to do?", "¿Qué va a hacer Carlos?", "Carlos is going to…", "Carlos va a…", "WHAT"),
    p("m4d9-p6", "What is he going to pack?", "¿Qué va a empacar?", "He's going to pack…", "Él va a empacar…", "WHAT"),
    p("m4d9-p8", "When are they going to meet?", "¿Cuándo se van a ver?", "They're going to…", "Ellos van a…", "WHEN"),
  ],
  cues: ["MARIA", "STUDY", "CARLOS", "TRAVEL", "ISN'T GOING TO"],
  sceneImage: { src: sceneTwoPeople, alt: "Split image: a woman studying and a man packing a suitcase", altEs: "Imagen dividida: una mujer estudiando y un hombre empacando una maleta" },
  storyPanels: [
    card("m4d9-c1", cueStudy, "A person studying", "MARIA · STUDY"),
    card("m4d9-c2", cueRelax, "Staying home", "STAY HOME"),
    card("m4d9-c3", cueSuitcase, "Packing a suitcase", "CARLOS · PACK"),
    card("m4d9-c4", cueBeach, "A tropical beach", "BEACH"),
  ],
  variants: [
    { id: "maria", label: "MARIA", labelEs: "MARÍA" },
    { id: "carlos", label: "CARLOS", labelEs: "CARLOS" },
  ],
  rep5Prompt: { question: "Compare two people's plans. What is she going to do, and what is he going to do?", questionEs: "Compara los planes de dos personas. ¿Qué va a hacer ella y qué va a hacer él?" },
  rep5Tips: {
    en: "Talk about one person, then the other. Use but to contrast: She's going to study, but he's going to travel.",
    es: "Habla de una persona y luego de la otra. Usa but para contrastar: She's going to study, but he's going to travel.",
  },
});

const d10 = makeDay({
  day: 10,
  week: 2,
  topic: "Their Plans Challenge",
  topicEs: "Reto de los planes de otros",
  intro: {
    title: "THREE PEOPLE",
    titleEs: "TRES PERSONAS",
    lead: "Talk about three different people's plans without stopping.",
    leadEs: "Habla de los planes de tres personas diferentes sin parar.",
    examples: ["He's going to…", "She's going to…", "They're going to…"],
    goal: "Speak for 30–45 seconds.",
    goalEs: "Habla de 30 a 45 segundos.",
    cta: START,
  },
  lines: [
    l("m4d10-1", "My brother | is going to start a new job | next week.", "Mi hermano va a empezar un trabajo nuevo la próxima semana."),
    l("m4d10-2", "He's going to wake up | earlier | every day.", "Se va a despertar más temprano todos los días."),
    l("m4d10-3", "He isn't going to work | on weekends.", "No va a trabajar los fines de semana."),
    l("m4d10-4", "My sister | is going to study English | with me.", "Mi hermana va a estudiar inglés conmigo."),
    l("m4d10-5", "She's going to practice | thirty minutes a day.", "Va a practicar treinta minutos al día."),
    l("m4d10-6", "My parents | are going to visit us | in December.", "Mis papás nos van a visitar en diciembre."),
    l("m4d10-7", "They're going to stay | for two weeks.", "Se van a quedar dos semanas."),
    l("m4d10-8", "Everybody | is going to be | very busy.", "Todos van a estar muy ocupados."),
  ],
  prompts: [
    p("m4d10-p1", "What is your brother going to do?", "¿Qué va a hacer tu hermano?", "He's going to…", "Él va a…", "WHAT"),
    p("m4d10-p3", "What isn't he going to do?", "¿Qué NO va a hacer?", "He isn't going to…", "Él no va a…", "WHAT"),
    p("m4d10-p4", "What is your sister going to do?", "¿Qué va a hacer tu hermana?", "She's going to…", "Ella va a…", "WHAT"),
    p("m4d10-p6", "What are your parents going to do?", "¿Qué van a hacer tus papás?", "They're going to…", "Ellos van a…", "WHAT"),
    p("m4d10-p7", "How long are they going to stay?", "¿Cuánto tiempo se van a quedar?", "They're going to stay…", "Ellos se van a quedar…", "HOW"),
  ],
  cues: ["HE'S GOING TO", "SHE'S GOING TO", "THEY'RE GOING TO", "ISN'T / AREN'T"],
  sceneImage: { src: sceneW2Challenge, alt: "Three adults in an office lounge doing different things", altEs: "Tres adultos en una sala de oficina haciendo cosas diferentes" },
  storyPanels: [
    card("m4d10-c1", cueWork, "Working at a computer", "NEW JOB"),
    card("m4d10-c2", cueStudy, "Studying English", "STUDY"),
    card("m4d10-c3", cueFamily, "Family together", "VISIT"),
    card("m4d10-c4", cueAirport, "An airplane at the gate", "DECEMBER"),
  ],
  goalSentences: 5,
  rep5Prompt: { question: "Tell me about three people you know. What are they going to do?", questionEs: "Cuéntame de tres personas que conoces. ¿Qué van a hacer?" },
  rep5Tips: {
    en: "One person at a time. Use he's / she's / they're going to and at least one negative.",
    es: "Una persona a la vez. Usa he's / she's / they're going to y al menos una frase en negativo.",
  },
});

/* ============ WEEK 3 — DECISIONS, PROMISES & PREDICTIONS (WILL) ============ */

const d11 = makeDay({
  day: 11,
  week: 3,
  topic: "I'll Do It",
  topicEs: "Yo lo hago",
  intro: {
    title: "WILL = DECIDE NOW",
    titleEs: "WILL = DECIDIR AHORA",
    lead: "No plan before. You decide in the moment: I'll…",
    leadEs: "Sin plan previo. Decides en el momento: I'll…",
    examples: ["I'll answer it.", "I'll help you.", "I won't forget."],
    goal: "Speak for 30+ seconds.",
    goalEs: "Habla 30 segundos o más.",
    cta: START,
  },
  lines: [
    l("m4d11-1", "The phone is ringing. | I'll answer it.", "Está sonando el teléfono. Yo contesto."),
    l("m4d11-2", "Those bags look heavy. | I'll help you.", "Esas bolsas se ven pesadas. Yo te ayudo."),
    l("m4d11-3", "Someone is at the door. | I'll open it.", "Alguien está en la puerta. Yo abro."),
    l("m4d11-4", "You're tired. | I'll drive.", "Estás cansado. Yo manejo."),
    l("m4d11-5", "I'll call you | later today.", "Te llamo más tarde hoy."),
    l("m4d11-6", "Don't worry, | I won't forget.", "No te preocupes, no se me va a olvidar."),
    l("m4d11-7", "I won't be | late again.", "No voy a llegar tarde otra vez."),
    l("m4d11-8", "Okay, | I'll do it | right now.", "Está bien, lo hago ahora mismo."),
  ],
  prompts: [
    p("m4d11-p1", "The phone is ringing. What do you say?", "Suena el teléfono. ¿Qué dices?", "I'll…", "Yo…"),
    p("m4d11-p2", "Someone needs help with heavy bags.", "Alguien necesita ayuda con bolsas pesadas.", "I'll help…", "Yo ayudo…"),
    p("m4d11-p3", "Someone is at the door.", "Alguien está en la puerta.", "I'll…", "Yo…"),
    p("m4d11-p4", "Your friend is very tired.", "Tu amigo está muy cansado.", "I'll…", "Yo…"),
    p("m4d11-p5", "When are you going to call?", "¿Cuándo vas a llamar?", "I'll call you…", "Te llamo…"),
    p("m4d11-p6", "Promise you won't forget.", "Promete que no lo olvidarás.", "I won't…", "No voy a…"),
    p("m4d11-p7", "What won't you do again?", "¿Qué no vas a volver a hacer?", "I won't…", "No voy a…"),
    p("m4d11-p8", "When are you going to do it?", "¿Cuándo lo vas a hacer?", "I'll do it…", "Lo hago…"),
  ],
  cues: ["I'LL", "HELP", "ANSWER", "OPEN", "I WON'T"],
  sceneImage: { src: sceneDecisions, alt: "A man answering a ringing phone while a colleague carries heavy boxes", altEs: "Un hombre contesta el teléfono mientras un compañero carga cajas pesadas" },
  storyPanels: [
    card("m4d11-c1", cuePhoneRinging, "A ringing phone", "PHONE"),
    card("m4d11-c2", cueHeavyBags, "Heavy bags", "HEAVY BAGS"),
    card("m4d11-c3", cueDoorbell, "A doorbell", "DOOR"),
    card("m4d11-c4", cuePromise, "Two people making a promise", "I WON'T FORGET"),
  ],
  rep5Prompt: { question: "Someone needs help right now. What will you say and do?", questionEs: "Alguien necesita ayuda ahora mismo. ¿Qué dices y qué haces?" },
  rep5Tips: {
    en: "Use I'll for instant decisions and one I won't. Do NOT use going to today.",
    es: "Usa I'll para decisiones del momento y una frase con I won't. Hoy NO uses going to.",
  },
});

const d12 = makeDay({
  day: 12,
  week: 3,
  topic: "My Promises",
  topicEs: "Mis promesas",
  intro: {
    title: "WILL = PROMISE",
    titleEs: "WILL = PROMESA",
    lead: "Promises to other people and to yourself.",
    leadEs: "Promesas a otras personas y a ti mismo.",
    examples: ["I'll practice every day.", "I promise I'll call.", "I won't give up."],
    goal: "Speak for 30+ seconds.",
    goalEs: "Habla 30 segundos o más.",
    cta: START,
  },
  lines: [
    l("m4d12-1", "I promise | I'll practice English | every day.", "Prometo que voy a practicar inglés todos los días."),
    l("m4d12-2", "I'll speak | for five minutes | every morning.", "Voy a hablar cinco minutos cada mañana."),
    l("m4d12-3", "I won't give up | when it's difficult.", "No me voy a rendir cuando sea difícil."),
    l("m4d12-4", "I'll help my family | more this month.", "Voy a ayudar más a mi familia este mes."),
    l("m4d12-5", "I promise | I'll call my parents | every week.", "Prometo que voy a llamar a mis papás cada semana."),
    l("m4d12-6", "I won't say | I don't have time.", "No voy a decir que no tengo tiempo."),
    l("m4d12-7", "I'll be | more patient with myself.", "Voy a ser más paciente conmigo mismo."),
    l("m4d12-8", "I'll keep | my promises.", "Voy a cumplir mis promesas."),
  ],
  prompts: [
    p("m4d12-p1", "What do you promise about English?", "¿Qué prometes sobre el inglés?", "I promise I'll…", "Prometo que voy a…"),
    p("m4d12-p2", "How much are you going to speak?", "¿Cuánto vas a hablar?", "I'll speak…", "Voy a hablar…"),
    p("m4d12-p3", "What won't you do?", "¿Qué no vas a hacer?", "I won't…", "No voy a…"),
    p("m4d12-p4", "What will you do for your family?", "¿Qué vas a hacer por tu familia?", "I'll help…", "Voy a ayudar…"),
    p("m4d12-p5", "Who will you call?", "¿A quién vas a llamar?", "I'll call…", "Voy a llamar a…"),
    p("m4d12-p6", "What excuse won't you use?", "¿Qué excusa no vas a usar?", "I won't say…", "No voy a decir…"),
    p("m4d12-p7", "How will you treat yourself?", "¿Cómo te vas a tratar?", "I'll be…", "Voy a ser…"),
    p("m4d12-p8", "What will you keep?", "¿Qué vas a cumplir?", "I'll keep…", "Voy a cumplir…"),
  ],
  cues: ["I PROMISE", "I'LL", "EVERY DAY", "I WON'T", "GIVE UP"],
  sceneImage: { src: scenePromises, alt: "Two adults shaking hands over a desk", altEs: "Dos adultos se dan la mano sobre un escritorio" },
  storyPanels: [
    card("m4d12-c1", cuePromise, "Two people making a promise", "PROMISE"),
    card("m4d12-c2", cueStudy, "Studying English", "PRACTICE"),
    card("m4d12-c3", cueFamily, "Family together", "FAMILY"),
    card("m4d12-c4", cuePhoneRinging, "A ringing phone", "CALL"),
  ],
  rep5Prompt: { question: "What do you promise to do for your English and for your family?", questionEs: "¿Qué prometes hacer por tu inglés y por tu familia?" },
  rep5Tips: {
    en: "Use I'll and I promise I'll…, plus at least two I won't… sentences.",
    es: "Usa I'll y I promise I'll…, más al menos dos frases con I won't…",
  },
});

const d13 = makeDay({
  day: 13,
  week: 3,
  topic: "My Predictions",
  topicEs: "Mis predicciones",
  intro: {
    title: "WILL = PREDICTION",
    titleEs: "WILL = PREDICCIÓN",
    lead: "What you think about the future: I think it will…",
    leadEs: "Lo que crees del futuro: I think it will…",
    examples: ["I think it will rain.", "It won't be easy.", "I think I'll speak better."],
    goal: "Speak for 30+ seconds.",
    goalEs: "Habla 30 segundos o más.",
    cta: START,
  },
  lines: [
    l("m4d13-1", "I think | it will rain | this afternoon.", "Creo que va a llover esta tarde."),
    l("m4d13-2", "The traffic | will be terrible.", "El tráfico va a estar terrible."),
    l("m4d13-3", "I think | many people will work from home.", "Creo que mucha gente va a trabajar desde casa."),
    l("m4d13-4", "It won't be easy, | but it will be possible.", "No va a ser fácil, pero va a ser posible."),
    l("m4d13-5", "In one year, | I think I'll speak | much better English.", "En un año creo que voy a hablar mucho mejor inglés."),
    l("m4d13-6", "I won't be | nervous on the phone.", "No voy a estar nervioso en el teléfono."),
    l("m4d13-7", "I think | my job will change.", "Creo que mi trabajo va a cambiar."),
    l("m4d13-8", "The future | will be | very interesting.", "El futuro va a ser muy interesante."),
  ],
  prompts: [
    p("m4d13-p1", "What do you think about the weather?", "¿Qué crees del clima?", "I think it will…", "Creo que va a…"),
    p("m4d13-p2", "How will the traffic be?", "¿Cómo va a estar el tráfico?", "The traffic will be…", "El tráfico va a estar…"),
    p("m4d13-p3", "What will many people do?", "¿Qué va a hacer mucha gente?", "I think people will…", "Creo que la gente va a…"),
    p("m4d13-p4", "Will it be easy?", "¿Va a ser fácil?", "It won't be…", "No va a ser…"),
    p("m4d13-p5", "How will your English be in one year?", "¿Cómo va a estar tu inglés en un año?", "I think I'll…", "Creo que voy a…"),
    p("m4d13-p6", "What won't you be?", "¿Cómo NO vas a estar?", "I won't be…", "No voy a estar…"),
    p("m4d13-p7", "What will change in your job?", "¿Qué va a cambiar en tu trabajo?", "I think my job will…", "Creo que mi trabajo va a…"),
    p("m4d13-p8", "How will the future be?", "¿Cómo va a ser el futuro?", "The future will be…", "El futuro va a ser…"),
  ],
  cues: ["I THINK", "IT WILL", "IT WON'T", "RAIN", "BETTER"],
  sceneImage: { src: scenePredictions, alt: "Dark storm clouds over a city street", altEs: "Nubes de tormenta sobre una calle de la ciudad" },
  storyPanels: [
    card("m4d13-c1", cueStorm, "Dark rain clouds", "RAIN"),
    card("m4d13-c2", cueWork, "Working at a computer", "WORK"),
    card("m4d13-c3", cueStudy, "Studying English", "BETTER ENGLISH"),
    card("m4d13-c4", cuePhoneRinging, "A ringing phone", "PHONE CALLS"),
  ],
  rep5Prompt: { question: "What do you think will happen this year?", questionEs: "¿Qué crees que va a pasar este año?" },
  rep5Tips: {
    en: "Start ideas with I think… and use will and won't. Give a reason with because.",
    es: "Empieza tus ideas con I think… y usa will y won't. Da una razón con because.",
  },
});

const d14 = makeDay({
  day: 14,
  week: 3,
  topic: "His / Her Future",
  topicEs: "Su futuro (él / ella)",
  intro: {
    title: "WILL FOR OTHER PEOPLE",
    titleEs: "WILL PARA OTRAS PERSONAS",
    lead: "Will never changes: he will, she will, they will.",
    leadEs: "Will no cambia: he will, she will, they will.",
    examples: ["She'll find a good job.", "He won't quit.", "They'll be happy."],
    goal: "Speak for 30+ seconds.",
    goalEs: "Habla 30 segundos o más.",
    cta: START,
  },
  lines: [
    l("m4d14-1", "My friend Ana | will finish her studies | this year.", "Mi amiga Ana va a terminar sus estudios este año."),
    l("m4d14-2", "I think | she'll find | a good job.", "Creo que ella va a encontrar un buen trabajo."),
    l("m4d14-3", "She'll work | in a bilingual company.", "Va a trabajar en una empresa bilingüe."),
    l("m4d14-4", "She won't have | any problem with English.", "No va a tener ningún problema con el inglés."),
    l("m4d14-5", "Her brother | will start his own business.", "Su hermano va a empezar su propio negocio."),
    l("m4d14-6", "He won't work | for another company.", "No va a trabajar para otra empresa."),
    l("m4d14-7", "They'll help each other | a lot.", "Se van a ayudar mucho."),
    l("m4d14-8", "I think | they'll be | very successful.", "Creo que van a tener mucho éxito."),
  ],
  prompts: [
    p("m4d14-p1", "What will your friend finish?", "¿Qué va a terminar tu amiga?", "She'll finish…", "Ella va a terminar…"),
    p("m4d14-p2", "What do you think she'll find?", "¿Qué crees que va a encontrar?", "I think she'll…", "Creo que ella va a…"),
    p("m4d14-p3", "Where will she work?", "¿Dónde va a trabajar?", "She'll work…", "Ella va a trabajar…"),
    p("m4d14-p4", "What won't she have?", "¿Qué no va a tener?", "She won't have…", "Ella no va a tener…"),
    p("m4d14-p5", "What will her brother do?", "¿Qué va a hacer su hermano?", "He'll…", "Él va a…"),
    p("m4d14-p6", "What won't he do?", "¿Qué no va a hacer él?", "He won't…", "Él no va a…"),
    p("m4d14-p7", "How will they help each other?", "¿Cómo se van a ayudar?", "They'll…", "Ellos van a…"),
    p("m4d14-p8", "How will they be?", "¿Cómo les va a ir?", "I think they'll be…", "Creo que van a estar…"),
  ],
  cues: ["SHE'LL", "HE'LL", "THEY'LL", "WON'T", "I THINK"],
  sceneImage: { src: sceneHerFuture, alt: "A confident young woman looking toward her future career", altEs: "Una joven segura mirando hacia su futuro profesional" },
  storyPanels: [
    card("m4d14-c1", cueStudy, "Studying", "FINISH STUDIES"),
    card("m4d14-c2", cueWork, "Working at a computer", "GOOD JOB"),
    card("m4d14-c3", cueFriends, "Two people talking", "HELP EACH OTHER"),
    card("m4d14-c4", cuePromise, "Two people together", "SUCCESS"),
  ],
  rep5Prompt: { question: "Talk about someone you know. What do you think will happen in their future?", questionEs: "Habla de alguien que conoces. ¿Qué crees que va a pasar en su futuro?" },
  rep5Tips: {
    en: "Use he'll / she'll / they'll and at least two won't sentences. Start with I think…",
    es: "Usa he'll / she'll / they'll y al menos dos frases con won't. Empieza con I think…",
  },
});

const d15 = makeDay({
  day: 15,
  week: 3,
  topic: "Will Challenge",
  topicEs: "Reto de will",
  intro: {
    title: "DECISION · PROMISE · PREDICTION",
    titleEs: "DECISIÓN · PROMESA · PREDICCIÓN",
    lead: "All three uses of will in one talk.",
    leadEs: "Los tres usos de will en una sola charla.",
    examples: ["I'll help you. (decision)", "I promise I'll practice. (promise)", "It will be great. (prediction)"],
    goal: "Speak for 45 seconds.",
    goalEs: "Habla 45 segundos.",
    cta: START,
  },
  lines: [
    l("m4d15-1", "Someone needs help right now, | so I'll help.", "Alguien necesita ayuda ahora, así que yo ayudo."),
    l("m4d15-2", "The phone is ringing. | I'll answer it | in English.", "Suena el teléfono. Yo contesto en inglés."),
    l("m4d15-3", "I promise | I'll practice speaking | every single day.", "Prometo que voy a practicar hablar todos los días."),
    l("m4d15-4", "I won't stop | when it feels hard.", "No voy a parar cuando se sienta difícil."),
    l("m4d15-5", "I think | my English will improve | fast.", "Creo que mi inglés va a mejorar rápido."),
    l("m4d15-6", "In six months, | I'll speak | with more confidence.", "En seis meses voy a hablar con más confianza."),
    l("m4d15-7", "It won't be perfect, | but it will be clear.", "No va a ser perfecto, pero va a ser claro."),
    l("m4d15-8", "I know | this year will be | different.", "Sé que este año va a ser diferente."),
  ],
  prompts: [
    p("m4d15-p1", "Someone needs help. What do you say?", "Alguien necesita ayuda. ¿Qué dices?", "I'll…", "Yo…"),
    p("m4d15-p2", "The phone rings in English. What do you do?", "Suena el teléfono en inglés. ¿Qué haces?", "I'll answer…", "Yo contesto…"),
    p("m4d15-p3", "What do you promise?", "¿Qué prometes?", "I promise I'll…", "Prometo que voy a…"),
    p("m4d15-p4", "What won't you do?", "¿Qué no vas a hacer?", "I won't…", "No voy a…"),
    p("m4d15-p5", "What do you think will improve?", "¿Qué crees que va a mejorar?", "I think… will…", "Creo que… va a…"),
    p("m4d15-p6", "How will you speak in six months?", "¿Cómo vas a hablar en seis meses?", "I'll speak…", "Voy a hablar…"),
    p("m4d15-p7", "Will it be perfect?", "¿Va a ser perfecto?", "It won't be…, but…", "No va a ser…, pero…"),
    p("m4d15-p8", "How will this year be?", "¿Cómo va a ser este año?", "This year will be…", "Este año va a ser…"),
  ],
  cues: ["DECISION", "PROMISE", "PREDICTION", "I'LL", "I WON'T"],
  sceneImage: { src: sceneW3Challenge, alt: "A person standing on a road at sunrise looking to the future", altEs: "Una persona en un camino al amanecer mirando hacia el futuro" },
  storyPanels: [
    card("m4d15-c1", cuePhoneRinging, "A ringing phone", "DECISION"),
    card("m4d15-c2", cuePromise, "A promise", "PROMISE"),
    card("m4d15-c3", cueStorm, "Storm clouds", "PREDICTION"),
    card("m4d15-c4", cueStudy, "Studying English", "PRACTICE"),
  ],
  goalSeconds: [45, 60],
  goalSentences: 6,
  rep5Prompt: { question: "Make a decision, a promise and a prediction about your English.", questionEs: "Haz una decisión, una promesa y una predicción sobre tu inglés." },
  rep5Tips: {
    en: "Cover all three: I'll (decide), I promise I'll (promise), I think it will (predict). Add won't.",
    es: "Cubre los tres: I'll (decidir), I promise I'll (prometer), I think it will (predecir). Agrega won't.",
  },
});

/* ======================== WEEK 4 — FUTURE FLUENCY ======================== */

const d16 = makeDay({
  day: 16,
  week: 4,
  topic: "Plan or Decision?",
  topicEs: "¿Plan o decisión?",
  intro: {
    title: "GOING TO vs WILL",
    titleEs: "GOING TO vs WILL",
    lead: "PLAN before → GOING TO. DECISION now → WILL.",
    leadEs: "PLAN de antes → GOING TO. DECISIÓN ahora → WILL.",
    examples: ["I'm going to study tonight. (plan)", "The door! I'll open it. (decision)", "I think it will rain. (prediction)"],
    goal: "Speak for 30+ seconds.",
    goalEs: "Habla 30 segundos o más.",
    cta: START,
  },
  lines: [
    l("m4d16-1", "Tonight | I'm going to study English. | That's my plan.", "Esta noche voy a estudiar inglés. Ese es mi plan."),
    l("m4d16-2", "Oh, the doorbell! | I'll open it.", "¡Ah, el timbre! Yo abro."),
    l("m4d16-3", "Tomorrow | I'm going to work | from the office.", "Mañana voy a trabajar desde la oficina."),
    l("m4d16-4", "You need help? | I'll help you | right now.", "¿Necesitas ayuda? Te ayudo ahora mismo."),
    l("m4d16-5", "This weekend | I'm going to visit my family.", "Este fin de semana voy a visitar a mi familia."),
    l("m4d16-6", "I'm not going to travel | far.", "No voy a viajar lejos."),
    l("m4d16-7", "Look at the sky. | I think it will rain.", "Mira el cielo. Creo que va a llover."),
    l("m4d16-8", "It won't stop | my plans.", "No va a detener mis planes."),
  ],
  prompts: [
    p("m4d16-p1", "What is your plan for tonight?", "¿Cuál es tu plan para esta noche?", "Tonight I'm going to…", "Esta noche voy a…"),
    p("m4d16-p2", "The doorbell rings. What do you say?", "Suena el timbre. ¿Qué dices?", "I'll…", "Yo…"),
    p("m4d16-p3", "What is your plan for tomorrow?", "¿Cuál es tu plan para mañana?", "Tomorrow I'm going to…", "Mañana voy a…"),
    p("m4d16-p4", "Someone needs help now.", "Alguien necesita ayuda ahora.", "I'll help…", "Yo ayudo…"),
    p("m4d16-p5", "What is your weekend plan?", "¿Cuál es tu plan del fin de semana?", "This weekend I'm going to…", "Este fin de semana voy a…"),
    p("m4d16-p6", "What are you NOT going to do?", "¿Qué NO vas a hacer?", "I'm not going to…", "No voy a…"),
    p("m4d16-p7", "Look at the sky. What do you think?", "Mira el cielo. ¿Qué crees?", "I think it will…", "Creo que va a…"),
    p("m4d16-p8", "Will it stop your plans?", "¿Va a detener tus planes?", "It won't…", "No va a…"),
  ],
  cues: ["PLAN → GOING TO", "DECISION → WILL", "PREDICTION → WILL"],
  sceneImage: { src: scenePlanOrDecision, alt: "A person holding a planner while someone rings the doorbell", altEs: "Una persona con una agenda mientras alguien toca el timbre" },
  storyPanels: [
    card("m4d16-c1", cueStudy, "Studying English", "PLAN · STUDY"),
    card("m4d16-c2", cueDoorbell, "A doorbell", "DECISION · DOOR"),
    card("m4d16-c3", cueHeavyBags, "Heavy bags", "DECISION · HELP"),
    card("m4d16-c4", cueStorm, "Storm clouds", "PREDICTION · RAIN"),
  ],
  rep5Prompt: { question: "Tell me one plan, one instant decision and one prediction.", questionEs: "Dime un plan, una decisión del momento y una predicción." },
  rep5Tips: {
    en: "Plan = going to. Decision in the moment = will. Prediction = I think it will.",
    es: "Plan = going to. Decisión del momento = will. Predicción = I think it will.",
  },
});

const d17 = makeDay({
  day: 17,
  week: 4,
  topic: "My Weekend",
  topicEs: "Mi fin de semana",
  intro: {
    title: "PLANS + SURPRISES",
    titleEs: "PLANES + SORPRESAS",
    lead: "Your real weekend: what is planned, and what you'll decide later.",
    leadEs: "Tu fin de semana real: lo planeado y lo que decidirás después.",
    examples: ["I'm going to rest.", "If a friend calls, I'll go out.", "I think it will be relaxed."],
    goal: "Speak for 30–45 seconds.",
    goalEs: "Habla de 30 a 45 segundos.",
    cta: START,
  },
  lines: [
    l("m4d17-1", "This weekend | I'm going to rest | and recharge.", "Este fin de semana voy a descansar y recargar energía."),
    l("m4d17-2", "On Saturday morning | I'm going to exercise.", "El sábado en la mañana voy a hacer ejercicio."),
    l("m4d17-3", "I'm not going to check | my work messages.", "No voy a revisar los mensajes del trabajo."),
    l("m4d17-4", "If a friend calls me, | I'll go out for coffee.", "Si un amigo me llama, salgo por un café."),
    l("m4d17-5", "On Sunday | I'm going to cook | something special.", "El domingo voy a cocinar algo especial."),
    l("m4d17-6", "If I have time, | I'll study English too.", "Si tengo tiempo, también estudio inglés."),
    l("m4d17-7", "I think | it will be | a calm weekend.", "Creo que va a ser un fin de semana tranquilo."),
    l("m4d17-8", "On Monday | I won't feel tired.", "El lunes no me voy a sentir cansado."),
  ],
  prompts: [
    p("m4d17-p1", "What are you going to do this weekend?", "¿Qué vas a hacer este fin de semana?", "I'm going to…", "Voy a…"),
    p("m4d17-p2", "What is your Saturday plan?", "¿Cuál es tu plan del sábado?", "On Saturday I'm going to…", "El sábado voy a…"),
    p("m4d17-p3", "What are you NOT going to do?", "¿Qué NO vas a hacer?", "I'm not going to…", "No voy a…"),
    p("m4d17-p4", "If a friend calls you?", "¿Si un amigo te llama?", "If a friend calls, I'll…", "Si un amigo llama, yo…"),
    p("m4d17-p5", "What is your Sunday plan?", "¿Cuál es tu plan del domingo?", "On Sunday I'm going to…", "El domingo voy a…"),
    p("m4d17-p6", "If you have extra time?", "¿Si te sobra tiempo?", "If I have time, I'll…", "Si tengo tiempo, yo…"),
    p("m4d17-p7", "How do you think it will be?", "¿Cómo crees que va a ser?", "I think it will be…", "Creo que va a ser…"),
    p("m4d17-p8", "How will you feel on Monday?", "¿Cómo te vas a sentir el lunes?", "I won't feel…", "No me voy a sentir…"),
  ],
  cues: ["GOING TO", "IF… I'LL", "NOT GOING TO", "I THINK IT WILL"],
  sceneImage: { src: sceneMyWeekend, alt: "A person relaxing at home on a Saturday morning", altEs: "Una persona descansando en casa un sábado en la mañana" },
  storyPanels: [
    card("m4d17-c1", cueRelax, "Relaxing at home", "REST"),
    card("m4d17-c2", cueExercise, "Exercising", "EXERCISE"),
    card("m4d17-c3", cueFriends, "Friends meeting", "IF A FRIEND CALLS"),
    card("m4d17-c4", cueDinner, "Home-cooked food", "COOK"),
  ],
  rep5Prompt: { question: "Tell me your real plans for this weekend, and what you'll do if plans change.", questionEs: "Cuéntame tus planes reales para este fin de semana y qué harás si cambian." },
  rep5Tips: {
    en: "Plans with going to, surprises with if… I'll…, and finish with a prediction.",
    es: "Planes con going to, sorpresas con if… I'll…, y termina con una predicción.",
  },
});

const d18 = makeDay({
  day: 18,
  week: 4,
  topic: "Maria's Future",
  topicEs: "El futuro de María",
  intro: {
    title: "ANOTHER PERSON'S FUTURE",
    titleEs: "EL FUTURO DE OTRA PERSONA",
    lead: "Her plans (going to) and your predictions (will).",
    leadEs: "Sus planes (going to) y tus predicciones (will).",
    examples: ["She's going to start a new job.", "I think she'll do well.", "She won't be nervous."],
    goal: "Speak for 30–45 seconds.",
    goalEs: "Habla de 30 a 45 segundos.",
    cta: START,
  },
  lines: [
    l("m4d18-1", "Maria | is going to start | a new job | next month.", "María va a empezar un trabajo nuevo el próximo mes."),
    l("m4d18-2", "She's going to work | in a bilingual call center.", "Va a trabajar en un call center bilingüe."),
    l("m4d18-3", "She's going to practice English | every morning.", "Va a practicar inglés todas las mañanas."),
    l("m4d18-4", "She isn't going to change | cities.", "No se va a cambiar de ciudad."),
    l("m4d18-5", "I think | she'll learn | very fast.", "Creo que va a aprender muy rápido."),
    l("m4d18-6", "She won't be nervous | on the phone.", "No va a estar nerviosa en el teléfono."),
    l("m4d18-7", "In one year, | I think she'll be | a team leader.", "En un año creo que va a ser líder de equipo."),
    l("m4d18-8", "Her future | will be | very good.", "Su futuro va a ser muy bueno."),
  ],
  prompts: [
    p("m4d18-p1", "What is she going to start?", "¿Qué va a empezar?", "She's going to…", "Ella va a…"),
    p("m4d18-p2", "Where is she going to work?", "¿Dónde va a trabajar?", "She's going to work…", "Ella va a trabajar…"),
    p("m4d18-p3", "What is she going to practice?", "¿Qué va a practicar?", "She's going to practice…", "Ella va a practicar…"),
    p("m4d18-p4", "What isn't she going to do?", "¿Qué NO va a hacer?", "She isn't going to…", "Ella no va a…"),
    p("m4d18-p5", "What do you think she'll learn?", "¿Qué crees que va a aprender?", "I think she'll…", "Creo que ella va a…"),
    p("m4d18-p6", "What won't she be?", "¿Cómo NO va a estar?", "She won't be…", "Ella no va a estar…"),
    p("m4d18-p7", "What will she be in one year?", "¿Qué va a ser en un año?", "I think she'll be…", "Creo que va a ser…"),
    p("m4d18-p8", "How will her future be?", "¿Cómo va a ser su futuro?", "Her future will be…", "Su futuro va a ser…"),
  ],
  cues: ["SHE'S GOING TO", "SHE'LL", "ISN'T GOING TO", "WON'T"],
  sceneImage: { src: sceneMariaFuture, alt: "A young woman working with a headset in a call center", altEs: "Una joven trabajando con diadema en un call center" },
  storyPanels: [
    card("m4d18-c1", cueWork, "Working at a computer", "NEW JOB"),
    card("m4d18-c2", cuePhoneRinging, "A ringing phone", "CALLS"),
    card("m4d18-c3", cueStudy, "Studying English", "PRACTICE"),
    card("m4d18-c4", cuePromise, "Confident people", "TEAM LEADER"),
  ],
  rep5Prompt: { question: "Talk about another person: their plans and your predictions for them.", questionEs: "Habla de otra persona: sus planes y tus predicciones sobre ella." },
  rep5Tips: {
    en: "Plans = she's / he's going to. Predictions = I think she'll / he'll. Add one negative of each.",
    es: "Planes = she's / he's going to. Predicciones = I think she'll / he'll. Agrega un negativo de cada uno.",
  },
});

const d19 = makeDay({
  day: 19,
  week: 4,
  topic: "What's Going to Happen?",
  topicEs: "¿Qué va a pasar?",
  intro: {
    title: "READ THE SITUATION",
    titleEs: "LEE LA SITUACIÓN",
    lead: "You can see it coming → going to. You just think it → will.",
    leadEs: "Lo puedes ver venir → going to. Solo lo crees → will.",
    examples: ["Look at those clouds — it's going to rain.", "I think it will be a long week.", "It won't be quiet."],
    goal: "Speak for 30–45 seconds.",
    goalEs: "Habla de 30 a 45 segundos.",
    cta: START,
  },
  lines: [
    l("m4d19-1", "Look at the sky. | It's going to rain | soon.", "Mira el cielo. Va a llover pronto."),
    l("m4d19-2", "The streets are full. | There's going to be | a lot of traffic.", "Las calles están llenas. Va a haber mucho tráfico."),
    l("m4d19-3", "People are running, | so they're going to be late.", "La gente va corriendo, así que van a llegar tarde."),
    l("m4d19-4", "I think | it will be | a difficult afternoon.", "Creo que va a ser una tarde difícil."),
    l("m4d19-5", "I'm going to leave | a little earlier.", "Voy a salir un poco más temprano."),
    l("m4d19-6", "I'm not going to take | the bus today.", "Hoy no voy a tomar el bus."),
    l("m4d19-7", "If the traffic is bad, | I'll walk.", "Si el tráfico está mal, camino."),
    l("m4d19-8", "Everything | will be fine | in the end.", "Todo va a estar bien al final."),
  ],
  prompts: [
    p("m4d19-p1", "Look at the sky. What's going to happen?", "Mira el cielo. ¿Qué va a pasar?", "It's going to…", "Va a…"),
    p("m4d19-p2", "The streets are full. What's going to happen?", "Las calles están llenas. ¿Qué va a pasar?", "There's going to be…", "Va a haber…"),
    p("m4d19-p3", "People are running. Why?", "La gente corre. ¿Por qué?", "They're going to…", "Ellos van a…"),
    p("m4d19-p4", "What do you think about the afternoon?", "¿Qué crees de la tarde?", "I think it will be…", "Creo que va a ser…"),
    p("m4d19-p5", "What is your plan?", "¿Cuál es tu plan?", "I'm going to…", "Voy a…"),
    p("m4d19-p6", "What aren't you going to do?", "¿Qué NO vas a hacer?", "I'm not going to…", "No voy a…"),
    p("m4d19-p7", "If the traffic is bad?", "¿Si el tráfico está mal?", "I'll…", "Yo…"),
    p("m4d19-p8", "How will everything be?", "¿Cómo va a estar todo?", "Everything will be…", "Todo va a estar…"),
  ],
  cues: ["IT'S GOING TO", "THERE'S GOING TO BE", "I THINK IT WILL", "IF… I'LL"],
  sceneImage: { src: sceneWhatsHappening, alt: "A busy city street with people hurrying under a darkening sky", altEs: "Una calle concurrida con gente apurada bajo un cielo que se oscurece" },
  storyPanels: [
    card("m4d19-c1", cueStorm, "Storm clouds", "RAIN"),
    card("m4d19-c2", cueWork, "Working", "LATE"),
    card("m4d19-c3", cueDoorbell, "A door", "LEAVE EARLY"),
    card("m4d19-c4", cueFriends, "People on the street", "TRAFFIC"),
  ],
  rep5Prompt: { question: "Look around you. What's going to happen today, and what do you think will happen?", questionEs: "Mira a tu alrededor. ¿Qué va a pasar hoy y qué crees que va a pasar?" },
  rep5Tips: {
    en: "Evidence you can see = going to. Only your opinion = I think it will.",
    es: "Evidencia que puedes ver = going to. Solo tu opinión = I think it will.",
  },
});

const d20 = makeDay({
  day: 20,
  week: 4,
  topic: "Future Fluency Challenge",
  topicEs: "Reto de fluidez del futuro",
  intro: {
    title: "YOUR FUTURE, NO SCRIPT",
    titleEs: "TU FUTURO, SIN GUION",
    lead: "Plans, decisions, promises and predictions — all from the pictures.",
    leadEs: "Planes, decisiones, promesas y predicciones — todo desde las imágenes.",
    examples: ["I'm going to…", "I'll…", "I promise I'll…", "I think it will…"],
    goal: "Speak for 45–60 seconds, 8+ ideas.",
    goalEs: "Habla de 45 a 60 segundos, 8 ideas o más.",
    cta: START,
  },
  lines: [
    l("m4d20-1", "This year | I'm going to change | some things.", "Este año voy a cambiar algunas cosas."),
    l("m4d20-2", "I'm going to speak English | at work | every day.", "Voy a hablar inglés en el trabajo todos los días."),
    l("m4d20-3", "I'm not going to wait | until I feel ready.", "No voy a esperar hasta sentirme listo."),
    l("m4d20-4", "I promise | I'll practice | even on hard days.", "Prometo que voy a practicar incluso en los días difíciles."),
    l("m4d20-5", "If someone speaks to me in English, | I'll answer in English.", "Si alguien me habla en inglés, contesto en inglés."),
    l("m4d20-6", "I won't be afraid | of mistakes.", "No voy a tener miedo de los errores."),
    l("m4d20-7", "I think | my life will change | this year.", "Creo que mi vida va a cambiar este año."),
    l("m4d20-8", "In one year, | I'm going to speak | with confidence.", "En un año voy a hablar con confianza."),
  ],
  prompts: [
    p("m4d20-p1", "What are you going to change this year?", "¿Qué vas a cambiar este año?", "I'm going to…", "Voy a…"),
    p("m4d20-p2", "Where are you going to speak English?", "¿Dónde vas a hablar inglés?", "I'm going to speak…", "Voy a hablar…"),
    p("m4d20-p3", "What aren't you going to do?", "¿Qué NO vas a hacer?", "I'm not going to…", "No voy a…"),
    p("m4d20-p4", "What do you promise?", "¿Qué prometes?", "I promise I'll…", "Prometo que voy a…"),
    p("m4d20-p5", "If someone speaks to you in English?", "¿Si alguien te habla en inglés?", "I'll…", "Yo…"),
    p("m4d20-p6", "What won't you be afraid of?", "¿A qué no vas a tener miedo?", "I won't be afraid of…", "No voy a tener miedo de…"),
    p("m4d20-p7", "What do you think will change?", "¿Qué crees que va a cambiar?", "I think… will…", "Creo que… va a…"),
    p("m4d20-p8", "How are you going to speak in one year?", "¿Cómo vas a hablar en un año?", "I'm going to speak…", "Voy a hablar…"),
  ],
  cues: ["PLAN", "DECISION", "PROMISE", "PREDICTION", "NEGATIVE"],
  sceneImage: { src: sceneW4Challenge, alt: "A person looking out over a sunrise city skyline", altEs: "Una persona mirando el amanecer sobre la ciudad" },
  storyPanels: [
    card("m4d20-c1", cueWork, "Working", "PLAN · WORK"),
    card("m4d20-c2", cuePhoneRinging, "A ringing phone", "DECISION · ANSWER"),
    card("m4d20-c3", cuePromise, "A promise", "PROMISE · PRACTICE"),
    card("m4d20-c4", cueAirport, "An airplane", "PREDICTION · FUTURE"),
    card("m4d20-c5", cueStudy, "Studying English", "EVERY DAY"),
  ],
  goalSeconds: [45, 60],
  goalSentences: 8,
  hideModelText: true,
  rep5Prompt: { question: "Talk about your future: your plans, your promises and your predictions.", questionEs: "Habla de tu futuro: tus planes, tus promesas y tus predicciones." },
  rep5Tips: {
    en: "Speak only from the pictures. Use going to, will, won't and if… I'll. Aim for 8+ ideas.",
    es: "Habla solo con las imágenes. Usa going to, will, won't y if… I'll. Busca 8 ideas o más.",
  },
});

export const SIMPLE_FUTURE_DAYS: CourseDay[] = [
  d1, d2, d3, d4, d5,
  d6, d7, d8, d9, d10,
  d11, d12, d13, d14, d15,
  d16, d17, d18, d19, d20,
];
