/**
 * MODULE 5 — BASIC 4 · MIXED TENSES & QUESTIONS (4 weeks / 20 days)
 * Week 1: YESTERDAY & TOMORROW (past + future)   Week 2: EVERYDAY LIFE (present + past)
 * Week 3: ASK QUESTIONS (yes/no + WH across time) Week 4: REAL CONVERSATION (transfer)
 *
 * Fresh-vocabulary rule: core verbs here are NEW for the learner — nothing
 * already drilled in Modules 1–4 (no wake up / work / study / call / eat…).
 * New regular verbs: cleaned, cooked, painted, fixed, washed, invited,
 *   enjoyed, practiced.
 * New irregular verbs: drove, slept, wrote, read, swam, spent, forgot, lost.
 *
 * Image-first: one scene picture per day + keyword cue cards. The shared
 * timeline graphic (past ← today → future) recurs on timeline days.
 */

import type { CourseDay, ModelLine, PersonalPrompt, StoryPanel } from "@/lib/types";

/* ------------------------------- images ------------------------------- */

import timeline from "@/assets/module5/timeline.jpg";

import sceneThreeDays from "@/assets/module5/scene-w1d1-three-days.jpg";
import sceneWeekendPlans from "@/assets/module5/scene-w1d2-weekend-plans.jpg";
import sceneRegularVerbs from "@/assets/module5/scene-w1d3-regular-verbs.jpg";
import sceneInterestingDay from "@/assets/module5/scene-w1d4-interesting-day.jpg";
import sceneWeekends from "@/assets/module5/scene-w1d5-weekends.jpg";
import sceneRoutine from "@/assets/module5/scene-w2d1-routine.jpg";
import sceneHerRoutine from "@/assets/module5/scene-w2d2-her-routine.jpg";
import sceneOffice from "@/assets/module5/scene-w2d3-office.jpg";
import sceneAna from "@/assets/module5/scene-w2d4-ana.jpg";
import sceneThreeTimes from "@/assets/module5/scene-w2d5-three-times.jpg";
import sceneToBe from "@/assets/module5/scene-w3d1-to-be.jpg";
import sceneYesNo from "@/assets/module5/scene-w3d2-yes-no.jpg";
import sceneWh from "@/assets/module5/scene-w3d3-wh.jpg";
import sceneListen from "@/assets/module5/scene-w3d4-listen.jpg";
import sceneInterview from "@/assets/module5/scene-w3d5-interview.jpg";
import sceneMyLife from "@/assets/module5/scene-w4d1-my-life.jpg";
import sceneSofia from "@/assets/module5/scene-w4d2-sofia.jpg";
import sceneSundays from "@/assets/module5/scene-w4d3-sundays.jpg";
import sceneCoworker from "@/assets/module5/scene-w4d4-coworker.jpg";
import sceneChallenge from "@/assets/module5/scene-w4d5-challenge.jpg";

import cueYesterday from "@/assets/module5/cue-yesterday.jpg";
import cueToday from "@/assets/module5/cue-today.jpg";
import cueTomorrow from "@/assets/module5/cue-tomorrow.jpg";
import cueEveryDay from "@/assets/module5/cue-every-day.jpg";
import cueRightNow from "@/assets/module5/cue-right-now.jpg";
import cueLastWeekend from "@/assets/module5/cue-last-weekend.jpg";
import cueNextWeekend from "@/assets/module5/cue-next-weekend.jpg";
import cueQuestion from "@/assets/module5/cue-question.jpg";
import cueFamily from "@/assets/module5/cue-family.jpg";
import cueWork from "@/assets/module5/cue-work.jpg";
import cueGym from "@/assets/module5/cue-gym.jpg";

/* ------------------------------- helpers ------------------------------- */

const GOAL: [number, number] = [30, 45];

export const MIXED_TENSES_WEEKS: {
  week: 1 | 2 | 3 | 4;
  title: string;
  subtitle: string;
  subtitleEs: string;
}[] = [
  { week: 1, title: "Yesterday & Tomorrow", subtitle: "Past + Future", subtitleEs: "Ayer y mañana — pasado + futuro" },
  { week: 2, title: "Everyday Life", subtitle: "Present + Past", subtitleEs: "La vida diaria — presente + pasado" },
  { week: 3, title: "Ask Questions", subtitle: "Yes/No + WH across time", subtitleEs: "Haz preguntas — sí/no + WH en todos los tiempos" },
  { week: 4, title: "Real Conversation", subtitle: "Past · Present · Future together", subtitleEs: "Conversación real — pasado, presente y futuro juntos" },
];

/** `l("id", "I usually exercise. | Yesterday, I exercised.", "…")` — `|` marks speaking chunks. */
function l(id: string, marked: string, es: string, role?: "q" | "a"): ModelLine {
  const chunks = marked.split("|").map((chunk) => chunk.trim()).filter(Boolean);
  const base = { id, text: chunks.join(" "), es, chunks };
  return role ? { ...base, role } : base;
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
  goalSeconds?: [number, number];
  goalSentences?: number;
  hideModelText?: boolean;
};

function makeDay(input: DayInput): CourseDay {
  const week = MIXED_TENSES_WEEKS.find((w) => w.week === input.week)!;
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
    ...(input.goalSentences ? { goalSentences: input.goalSentences } : {}),
    ...(input.hideModelText ? { hideModelText: true } : {}),
    modelExample: {
      text: input.lines.map((line) => line.text).join(" "),
      es: input.lines.map((line) => line.es).join(" "),
    },
  };
}

const START = "START REP 1";

const TIME_CARDS = (prefix: string): StoryPanel[] => [
  card(`${prefix}-y`, cueYesterday, "A calendar page being torn off", "YESTERDAY"),
  card(`${prefix}-t`, cueToday, "A bright sun over a house", "TODAY"),
  card(`${prefix}-tm`, cueTomorrow, "A calendar page flipping forward", "TOMORROW"),
];

/* ==================== WEEK 1 — YESTERDAY & TOMORROW ==================== */

const d1 = makeDay({
  day: 1,
  week: 1,
  topic: "Yesterday, Today & Tomorrow",
  topicEs: "Ayer, hoy y mañana",
  intro: {
    title: "MOVE THROUGH TIME",
    titleEs: "MUÉVETE EN EL TIEMPO",
    lead: "Same life, three moments: yesterday (past), every day (present), tomorrow (future).",
    leadEs: "La misma vida en tres momentos: ayer (pasado), todos los días (presente), mañana (futuro).",
    examples: ["Yesterday, I cleaned.", "Every day, I clean.", "Tomorrow, I'm going to clean."],
    goal: "Speak for 45+ seconds.",
    goalEs: "Habla 45 segundos o más.",
    cta: START,
  },
  lines: [
    l("m5d1-1", "Yesterday, | I cleaned | my whole apartment.", "Ayer limpié todo mi apartamento."),
    l("m5d1-2", "Every day, | I clean | a little bit.", "Todos los días limpio un poco."),
    l("m5d1-3", "Tomorrow, | I'm going to clean | the kitchen.", "Mañana voy a limpiar la cocina."),
    l("m5d1-4", "Last night, | I cooked | pasta for dinner.", "Anoche cociné pasta para la cena."),
    l("m5d1-5", "Usually, | I cook | simple meals.", "Normalmente cocino comidas sencillas."),
    l("m5d1-6", "This weekend, | I'm going to cook | for my friends.", "Este fin de semana voy a cocinar para mis amigos."),
    l("m5d1-7", "Yesterday was busy, | but today | is calm.", "Ayer fue un día ocupado, pero hoy está tranquilo."),
    l("m5d1-8", "Tomorrow | is going to be | a great day.", "Mañana va a ser un gran día."),
  ],
  prompts: [
    p("m5d1-p1", "What did you do yesterday?", "¿Qué hiciste ayer?", "Yesterday, I…", "Ayer, yo…", "WHEN"),
    p("m5d1-p2", "What do you do every day?", "¿Qué haces todos los días?", "Every day, I…", "Todos los días, yo…", "WHAT"),
    p("m5d1-p3", "What are you going to do tomorrow?", "¿Qué vas a hacer mañana?", "Tomorrow, I'm going to…", "Mañana voy a…", "WHEN"),
    p("m5d1-p4", "What did you cook last time? What are you going to cook next?", "¿Qué cocinaste la última vez? ¿Qué vas a cocinar la próxima?", "Last time, I cooked… Next, I'm going to cook…", "La última vez cociné… La próxima voy a cocinar…", "WHAT"),
  ],
  cues: ["YESTERDAY", "TODAY", "TOMORROW", "CLEAN", "COOK"],
  sceneImage: { src: sceneThreeDays, alt: "The same person cleaning yesterday, relaxing today and planning tomorrow", altEs: "La misma persona limpiando ayer, descansando hoy y planeando mañana" },
  storyPanels: TIME_CARDS("m5d1"),
  goalSeconds: [45, 45],
  goalSentences: 6,
  rep5Prompt: { question: "Talk about yesterday, today and tomorrow. What changed?", questionEs: "Habla de ayer, hoy y mañana. ¿Qué cambió?" },
  rep5Tips: {
    en: "One idea for yesterday, one for today, one for tomorrow — then keep going. Use cleaned / clean / going to clean.",
    es: "Una idea de ayer, una de hoy, una de mañana — y sigue. Usa cleaned / clean / going to clean.",
  },
});

const d2 = makeDay({
  day: 2,
  week: 1,
  topic: "My Future Plans",
  topicEs: "Mis planes a futuro",
  intro: {
    title: "PLANS ACROSS TIME",
    titleEs: "PLANES EN EL TIEMPO",
    lead: "Review going to + will with new plans: a trip, a move, a project.",
    leadEs: "Repasa going to + will con planes nuevos: un viaje, una mudanza, un proyecto.",
    examples: ["I'm going to travel.", "I'll pack tomorrow.", "We're going to move."],
    goal: "Speak for 30+ seconds.",
    goalEs: "Habla 30 segundos o más.",
    cta: START,
  },
  lines: [
    l("m5d2-1", "Next month, | I'm going to travel | to the beach.", "El próximo mes voy a viajar a la playa."),
    l("m5d2-2", "I'll pack | my bag | the night before.", "Voy a empacar mi maleta la noche anterior."),
    l("m5d2-3", "My sister is going to pick me up | on Saturday morning.", "Mi hermana me va a recoger el sábado en la mañana."),
    l("m5d2-4", "We're going to drive | for three hours.", "Vamos a manejar por tres horas."),
    l("m5d2-5", "Next year, | I'm going to move | to a bigger apartment.", "El próximo año me voy a mudar a un apartamento más grande."),
    l("m5d2-6", "I'll paint the walls | myself.", "Yo mismo voy a pintar las paredes."),
    l("m5d2-7", "I'm not going to buy | new furniture.", "No voy a comprar muebles nuevos."),
    l("m5d2-8", "I think | the move will be | easy and fun.", "Creo que la mudanza va a ser fácil y divertida."),
  ],
  prompts: [
    p("m5d2-p1", "Where are you going to travel next?", "¿A dónde vas a viajar la próxima vez?", "I'm going to travel to…", "Voy a viajar a…", "WHERE"),
    p("m5d2-p2", "Who is going to go with you?", "¿Quién va a ir contigo?", "… is going to go with me.", "… va a ir conmigo.", "WHO"),
    p("m5d2-p5", "What are you going to change at home?", "¿Qué vas a cambiar en tu casa?", "I'm going to…", "Voy a…", "WHAT"),
    p("m5d2-p8", "What do you think will happen this year?", "¿Qué crees que va a pasar este año?", "I think… will…", "Creo que… va a…", "WHAT"),
  ],
  cues: ["TRAVEL", "PACK", "PICK UP", "MOVE", "PAINT"],
  sceneImage: { src: sceneWeekendPlans, alt: "A woman packing a bag with a calendar showing the weekend", altEs: "Una mujer empacando una maleta con un calendario mostrando el fin de semana" },
  storyPanels: [
    card("m5d2-c1", cueNextWeekend, "A camping tent", "TRAVEL"),
    card("m5d2-c2", cueTomorrow, "A calendar flipping forward", "PACK"),
    card("m5d2-c3", cueFamily, "A family together", "MY SISTER"),
    card("m5d2-c4", cueToday, "A house in the sun", "MOVE"),
    card("m5d2-c5", cueRightNow, "A hand pointing at a clock", "PAINT · MYSELF"),
  ],
  rep5Prompt: { question: "What are your plans for the next months?", questionEs: "¿Cuáles son tus planes para los próximos meses?" },
  rep5Tips: {
    en: "Use I'm going to…, I'll… and one I'm not going to…. Connect with then and after that.",
    es: "Usa I'm going to…, I'll… y una con I'm not going to…. Conecta con then y after that.",
  },
});

const d3 = makeDay({
  day: 3,
  week: 1,
  topic: "What I Did Yesterday",
  topicEs: "Lo que hice ayer",
  intro: {
    title: "YESTERDAY = -ED",
    titleEs: "AYER = -ED",
    lead: "New regular verbs for your evening: cleaned, cooked, painted, fixed, washed, practiced.",
    leadEs: "Verbos regulares nuevos para tu tarde: cleaned, cooked, painted, fixed, washed, practiced.",
    examples: ["I cleaned the kitchen.", "I fixed my bike.", "I practiced English."],
    goal: "Speak for 30+ seconds.",
    goalEs: "Habla 30 segundos o más.",
    cta: START,
  },
  lines: [
    l("m5d3-1", "Yesterday after work, | I cleaned | the living room.", "Ayer después del trabajo limpié la sala."),
    l("m5d3-2", "Then I cooked | rice and chicken | for dinner.", "Luego cociné arroz con pollo para la cena."),
    l("m5d3-3", "After dinner, | I washed | all the dishes.", "Después de cenar lavé todos los platos."),
    l("m5d3-4", "I fixed | my old bike | in the garage.", "Arreglé mi bicicleta vieja en el garaje."),
    l("m5d3-5", "I practiced English | for twenty minutes.", "Practiqué inglés por veinte minutos."),
    l("m5d3-6", "I invited my neighbor | for a coffee.", "Invité a mi vecino a un café."),
    l("m5d3-7", "We enjoyed | a long conversation.", "Disfrutamos una conversación larga."),
    l("m5d3-8", "It was | a productive evening.", "Fue una tarde productiva."),
  ],
  prompts: [
    p("m5d3-p1", "What did you clean yesterday?", "¿Qué limpiaste ayer?", "Yesterday, I cleaned…", "Ayer limpié…", "WHAT"),
    p("m5d3-p2", "What did you cook for dinner?", "¿Qué cocinaste para la cena?", "I cooked…", "Cociné…", "WHAT"),
    p("m5d3-p4", "What did you fix or organize?", "¿Qué arreglaste u organizaste?", "I fixed…", "Arreglé…", "WHAT"),
    p("m5d3-p5", "What did you practice?", "¿Qué practicaste?", "I practiced…", "Practiqué…", "WHAT"),
    p("m5d3-p7", "Who did you enjoy time with?", "¿Con quién disfrutaste tiempo?", "I enjoyed time with…", "Disfruté tiempo con…", "WHO"),
  ],
  cues: ["CLEANED", "COOKED", "WASHED", "FIXED", "PRACTICED"],
  sceneImage: { src: sceneRegularVerbs, alt: "A man mopping, cooking pasta, painting a wall and washing dishes", altEs: "Un hombre trapeando, cocinando pasta, pintando una pared y lavando platos" },
  storyPanels: [
    card("m5d3-c1", cueYesterday, "A calendar page torn off", "YESTERDAY"),
    card("m5d3-c2", cueWork, "A laptop and a coffee", "CLEANED"),
    card("m5d3-c3", cueFamily, "A family together", "COOKED · INVITED"),
    card("m5d3-c4", cueEveryDay, "An alarm clock in a circle", "PRACTICED"),
    card("m5d3-c5", cueToday, "A house in the sun", "PRODUCTIVE"),
  ],
  rep5Prompt: { question: "Tell me about your evening yesterday. What did you do?", questionEs: "Cuéntame tu tarde de ayer. ¿Qué hiciste?" },
  rep5Tips: {
    en: "Chain verbs with then and after that: cleaned → cooked → washed → practiced. Aim for 5+ actions.",
    es: "Encadena verbos con then y after that: cleaned → cooked → washed → practiced. Busca 5 acciones o más.",
  },
});

const d4 = makeDay({
  day: 4,
  week: 1,
  topic: "An Interesting Day",
  topicEs: "Un día interesante",
  intro: {
    title: "SPECIAL PAST VERBS",
    titleEs: "VERBOS ESPECIALES DEL PASADO",
    lead: "New irregular verbs: drove, slept, wrote, read, swam, spent, forgot, lost.",
    leadEs: "Verbos irregulares nuevos: drove, slept, wrote, read, swam, spent, forgot, lost.",
    examples: ["I drove downtown.", "I swam at the pool.", "I forgot my keys."],
    goal: "Speak for 30+ seconds.",
    goalEs: "Habla 30 segundos o más.",
    cta: START,
  },
  lines: [
    l("m5d4-1", "Last Saturday, | I drove downtown | early in the morning.", "El sábado pasado manejé al centro temprano en la mañana."),
    l("m5d4-2", "I slept badly | the night before, | but I felt excited.", "Dormí mal la noche anterior, pero me sentía emocionada."),
    l("m5d4-3", "I swam | at the public pool | for an hour.", "Nadé en la piscina pública por una hora."),
    l("m5d4-4", "Then I read | my favorite book | in the park.", "Luego leí mi libro favorito en el parque."),
    l("m5d4-5", "I wrote | a long message | to an old friend.", "Le escribí un mensaje largo a una vieja amiga."),
    l("m5d4-6", "I spent | the whole afternoon | outside.", "Pasé toda la tarde afuera."),
    l("m5d4-7", "I forgot | my sunglasses | at the pool.", "Olvidé mis lentes de sol en la piscina."),
    l("m5d4-8", "I almost lost | my phone, | but a man found it.", "Casi pierdo mi teléfono, pero un señor lo encontró."),
  ],
  prompts: [
    p("m5d4-p1", "Where did you drive or go recently?", "¿A dónde manejaste o fuiste recientemente?", "I drove to…", "Manejé a…", "WHERE"),
    p("m5d4-p3", "What sport did you do?", "¿Qué deporte hiciste?", "I swam / I played…", "Nadé / Jugué…", "WHAT"),
    p("m5d4-p5", "Who did you write to or call?", "¿A quién le escribiste o llamaste?", "I wrote to…", "Le escribí a…", "WHO"),
    p("m5d4-p6", "How did you spend your free time?", "¿Cómo pasaste tu tiempo libre?", "I spent…", "Pasé…", "HOW"),
    p("m5d4-p7", "What did you forget or lose once?", "¿Qué olvidaste o perdiste alguna vez?", "I forgot / lost…", "Olvidé / Perdí…", "WHAT"),
  ],
  cues: ["DROVE", "SLEPT", "SWAM", "WROTE", "FORGOT"],
  sceneImage: { src: sceneInterestingDay, alt: "A woman driving downtown, swimming and reading in a park", altEs: "Una mujer manejando al centro, nadando y leyendo en un parque" },
  storyPanels: [
    card("m5d4-c1", cueLastWeekend, "A barbecue grill looking back", "LAST SATURDAY"),
    card("m5d4-c2", cueGym, "A dumbbell", "SWAM"),
    card("m5d4-c3", cueEveryDay, "An alarm clock", "READ"),
    card("m5d4-c4", cueQuestion, "A question bubble", "FORGOT?"),
    card("m5d4-c5", cueToday, "A house in the sun", "GREAT DAY"),
  ],
  rep5Prompt: { question: "Tell me about an interesting day you had. What happened?", questionEs: "Cuéntame un día interesante que tuviste. ¿Qué pasó?" },
  rep5Tips: {
    en: "Use the new verbs: drove, slept, swam, read, wrote, spent, forgot. Add one problem and how it ended.",
    es: "Usa los verbos nuevos: drove, slept, swam, read, wrote, spent, forgot. Agrega un problema y cómo terminó.",
  },
});

const d5 = makeDay({
  day: 5,
  week: 1,
  topic: "Last Weekend & Next Weekend",
  topicEs: "El fin de semana pasado y el próximo",
  intro: {
    title: "PAST ↔ FUTURE CHALLENGE",
    titleEs: "RETO PASADO ↔ FUTURO",
    lead: "Compare two weekends: what you did and what you're going to do.",
    leadEs: "Compara dos fines de semana: lo que hiciste y lo que vas a hacer.",
    examples: ["Last weekend, I relaxed.", "Next weekend, I'm going to camp."],
    goal: "Speak for 45–60 seconds.",
    goalEs: "Habla de 45 a 60 segundos.",
    cta: START,
  },
  lines: [
    l("m5d5-1", "Last weekend, | I stayed home | and relaxed.", "El fin de semana pasado me quedé en casa y descansé."),
    l("m5d5-2", "On Saturday, | I cooked | a big lunch for my family.", "El sábado cociné un almuerzo grande para mi familia."),
    l("m5d5-3", "We enjoyed | the afternoon together.", "Disfrutamos la tarde juntos."),
    l("m5d5-4", "On Sunday, | I practiced English | and cleaned my room.", "El domingo practiqué inglés y limpié mi cuarto."),
    l("m5d5-5", "Next weekend | is going to be | totally different.", "El próximo fin de semana va a ser totalmente diferente."),
    l("m5d5-6", "My friends and I | are going to camp | near a lake.", "Mis amigos y yo vamos a acampar cerca de un lago."),
    l("m5d5-7", "We're going to swim | and cook outside.", "Vamos a nadar y cocinar afuera."),
    l("m5d5-8", "I think | it will be | an amazing weekend.", "Creo que va a ser un fin de semana increíble."),
  ],
  prompts: [
    p("m5d5-p1", "What did you do last weekend?", "¿Qué hiciste el fin de semana pasado?", "Last weekend, I…", "El fin de semana pasado, yo…", "WHAT"),
    p("m5d5-p2", "Who did you spend time with?", "¿Con quién pasaste tiempo?", "I spent time with…", "Pasé tiempo con…", "WHO"),
    p("m5d5-p5", "What are you going to do next weekend?", "¿Qué vas a hacer el próximo fin de semana?", "Next weekend, I'm going to…", "El próximo fin de semana voy a…", "WHAT"),
    p("m5d5-p8", "Which weekend will be better? Why?", "¿Cuál fin de semana será mejor? ¿Por qué?", "I think… because…", "Creo que… porque…", "WHY"),
  ],
  cues: ["LAST WEEKEND", "RELAXED", "NEXT WEEKEND", "CAMP", "WILL BE"],
  sceneImage: { src: sceneWeekends, alt: "A man looking at last weekend's photos and planning next weekend with a map", altEs: "Un hombre mirando fotos del fin de semana pasado y planeando el próximo con un mapa" },
  storyPanels: [
    card("m5d5-c1", cueLastWeekend, "A barbecue grill looking back", "LAST WEEKEND"),
    card("m5d5-c2", cueFamily, "A family together", "FAMILY"),
    card("m5d5-c3", cueNextWeekend, "A camping tent", "NEXT WEEKEND"),
    card("m5d5-c4", cueGym, "A dumbbell", "SWIM"),
    card("m5d5-c5", cueTomorrow, "A calendar flipping forward", "WILL BE"),
  ],
  goalSeconds: [45, 60],
  goalSentences: 8,
  rep5Prompt: { question: "Compare last weekend and next weekend. Which one is better?", questionEs: "Compara el fin de semana pasado con el próximo. ¿Cuál es mejor?" },
  rep5Tips: {
    en: "Half past, half future. Use Last weekend I… and Next weekend I'm going to…. Aim for 8 ideas.",
    es: "Mitad pasado, mitad futuro. Usa Last weekend I… y Next weekend I'm going to…. Busca 8 ideas.",
  },
});

/* ====================== WEEK 2 — EVERYDAY LIFE ====================== */

const d6 = makeDay({
  day: 6,
  week: 2,
  topic: "My Routine",
  topicEs: "Mi rutina",
  intro: {
    title: "EVERY DAY + YESTERDAY",
    titleEs: "TODOS LOS DÍAS + AYER",
    lead: "Say your routine, then say how yesterday was different — new verbs: run, exercise, drive, practice.",
    leadEs: "Di tu rutina y luego di cómo ayer fue diferente — verbos nuevos: run, exercise, drive, practice.",
    examples: ["I usually run in the morning.", "Yesterday, I ran in the afternoon."],
    goal: "Speak for 30+ seconds.",
    goalEs: "Habla 30 segundos o más.",
    cta: START,
  },
  lines: [
    l("m5d6-1", "Every day, | I run | for twenty minutes.", "Todos los días corro por veinte minutos."),
    l("m5d6-2", "Yesterday, | I didn't run | because it rained.", "Ayer no corrí porque llovió."),
    l("m5d6-3", "Usually, | I exercise | at the gym after work.", "Normalmente hago ejercicio en el gimnasio después del trabajo."),
    l("m5d6-4", "Yesterday, | I exercised | at home instead.", "Ayer hice ejercicio en casa en vez de eso."),
    l("m5d6-5", "I usually drive | to the office.", "Normalmente manejo a la oficina."),
    l("m5d6-6", "Yesterday, | I walked | because my car was in the shop.", "Ayer caminé porque mi carro estaba en el taller."),
    l("m5d6-7", "Every night, | I practice English | before bed.", "Todas las noches practico inglés antes de dormir."),
    l("m5d6-8", "Last night, | I practiced | for a full hour.", "Anoche practiqué por una hora completa."),
  ],
  prompts: [
    p("m5d6-p1", "What exercise do you usually do? What about yesterday?", "¿Qué ejercicio haces normalmente? ¿Y ayer?", "I usually… Yesterday, I…", "Normalmente… Ayer, yo…", "WHAT"),
    p("m5d6-p5", "How do you usually get to work? How about yesterday?", "¿Cómo llegas al trabajo normalmente? ¿Y ayer?", "I usually drive / walk… Yesterday, I…", "Normalmente manejo / camino… Ayer, yo…", "HOW"),
    p("m5d6-p7", "What do you practice every day?", "¿Qué practicas todos los días?", "Every day, I practice…", "Todos los días practico…", "WHAT"),
    p("m5d6-p2", "What didn't you do yesterday?", "¿Qué no hiciste ayer?", "Yesterday, I didn't…", "Ayer no…", "WHAT"),
  ],
  cues: ["EVERY DAY", "YESTERDAY", "RUN", "EXERCISE", "PRACTICE"],
  sceneImage: { src: sceneRoutine, alt: "A man running, cooking, driving and practicing guitar in one day", altEs: "Un hombre corriendo, cocinando, manejando y practicando guitarra en un día" },
  storyPanels: [
    card("m5d6-c1", cueEveryDay, "An alarm clock in a circle", "EVERY DAY"),
    card("m5d6-c2", cueGym, "A dumbbell", "RUN · EXERCISE"),
    card("m5d6-c3", cueYesterday, "A calendar page torn off", "YESTERDAY"),
    card("m5d6-c4", cueWork, "A laptop and a coffee", "OFFICE"),
    card("m5d6-c5", cueRightNow, "A hand pointing at a clock", "PRACTICE"),
  ],
  rep5Prompt: { question: "What is your normal routine, and how was yesterday different?", questionEs: "¿Cuál es tu rutina normal y en qué fue diferente ayer?" },
  rep5Tips: {
    en: "Pair every habit with yesterday: I usually… / Yesterday, I…. That gives you 8 ideas fast.",
    es: "Empareja cada hábito con ayer: I usually… / Yesterday, I…. Así consigues 8 ideas rápido.",
  },
});

const d7 = makeDay({
  day: 7,
  week: 2,
  topic: "Someone Else's Routine",
  topicEs: "La rutina de otra persona",
  intro: {
    title: "HER DAY: NOW + BEFORE",
    titleEs: "SU DÍA: AHORA + ANTES",
    lead: "Talk about a woman you know — her routine today and how it was before. She exercises, she rides, she designs.",
    leadEs: "Habla de una mujer que conoces — su rutina hoy y cómo era antes. She exercises, she rides, she designs.",
    examples: ["She exercises every morning.", "Before, she drove to work. Now she rides her bike."],
    goal: "Speak for 30+ seconds.",
    goalEs: "Habla 30 segundos o más.",
    cta: START,
  },
  lines: [
    l("m5d7-1", "This is Laura. | She exercises | every morning at six.", "Esta es Laura. Ella hace ejercicio todas las mañanas a las seis."),
    l("m5d7-2", "Before, | she never exercised. | She started last year.", "Antes nunca hacía ejercicio. Empezó el año pasado."),
    l("m5d7-3", "She rides her bike | to the office | every day.", "Ella va en bicicleta a la oficina todos los días."),
    l("m5d7-4", "Two years ago, | she drove | a big car.", "Hace dos años manejaba un carro grande."),
    l("m5d7-5", "She designs websites | for small businesses.", "Diseña sitios web para pequeños negocios."),
    l("m5d7-6", "Before that, | she answered phones | at a clinic.", "Antes de eso contestaba teléfonos en una clínica."),
    l("m5d7-7", "In the evening, | she cleans her kitchen | and reads.", "En la noche limpia su cocina y lee."),
    l("m5d7-8", "Yesterday, | she read | for two hours.", "Ayer leyó por dos horas."),
  ],
  prompts: [
    p("m5d7-p1", "What does she do every morning?", "¿Qué hace ella cada mañana?", "She…", "Ella…", "WHAT"),
    p("m5d7-p3", "How does she get to work now? And before?", "¿Cómo va al trabajo ahora? ¿Y antes?", "Now she… Before, she…", "Ahora ella… Antes, ella…", "HOW"),
    p("m5d7-p5", "What does she do for work? What did she do before?", "¿En qué trabaja ella? ¿En qué trabajaba antes?", "She designs… Before, she…", "Ella diseña… Antes, ella…", "WHAT"),
    p("m5d7-p7", "What does she do in the evening?", "¿Qué hace ella en la noche?", "In the evening, she…", "En la noche, ella…", "WHEN"),
  ],
  cues: ["SHE", "EVERY DAY", "BEFORE", "NOW", "EVENING"],
  sceneImage: { src: sceneHerRoutine, alt: "A woman exercising, riding her bike, designing on a computer and cleaning", altEs: "Una mujer haciendo ejercicio, andando en bicicleta, diseñando en la computadora y limpiando" },
  storyPanels: [
    card("m5d7-c1", cueGym, "A dumbbell", "EXERCISES"),
    card("m5d7-c2", cueYesterday, "A calendar page torn off", "BEFORE"),
    card("m5d7-c3", cueWork, "A laptop and a coffee", "DESIGNS"),
    card("m5d7-c4", cueToday, "A house in the sun", "NOW"),
    card("m5d7-c5", cueEveryDay, "An alarm clock", "READS"),
  ],
  rep5Prompt: { question: "Describe a woman in your life: her routine now and how it was before.", questionEs: "Describe a una mujer en tu vida: su rutina ahora y cómo era antes." },
  rep5Tips: {
    en: "Keep she consistent. Pair Now she… with Before, she…. Use exercises, rides, designs, cleans, reads.",
    es: "Mantén she consistente. Empareja Now she… con Before, she…. Usa exercises, rides, designs, cleans, reads.",
  },
});

const d8 = makeDay({
  day: 8,
  week: 2,
  topic: "What Was Happening?",
  topicEs: "¿Qué estaba pasando?",
  intro: {
    title: "ONE SCENE, MANY ACTIONS",
    titleEs: "UNA ESCENA, MUCHAS ACCIONES",
    lead: "Look at the office. Say what people do every day — and what they were doing at 3 pm yesterday.",
    leadEs: "Mira la oficina. Di qué hace la gente todos los días — y qué estaba haciendo ayer a las 3 pm.",
    examples: ["Maria types reports every day.", "Yesterday at 3, she was typing a long email."],
    goal: "Speak for 30–45 seconds.",
    goalEs: "Habla de 30 a 45 segundos.",
    cta: START,
  },
  lines: [
    l("m5d8-1", "Maria types reports | every morning.", "María escribe reportes todas las mañanas."),
    l("m5d8-2", "Yesterday at three, | she was typing | a very long email.", "Ayer a las tres estaba escribiendo un correo muy largo."),
    l("m5d8-3", "Carlos usually talks | to clients on the phone.", "Carlos normalmente habla con clientes por teléfono."),
    l("m5d8-4", "At that moment, | he was talking | to an angry customer.", "En ese momento estaba hablando con un cliente enojado."),
    l("m5d8-5", "The two designers | laugh together | at lunch every day.", "Las dos diseñadoras ríen juntas en el almuerzo todos los días."),
    l("m5d8-6", "Yesterday, | they were laughing | about a funny video.", "Ayer se estaban riendo de un video gracioso."),
    l("m5d8-7", "The manager carries papers | from desk to desk.", "El gerente lleva papeles de escritorio en escritorio."),
    l("m5d8-8", "At three, | he was carrying | a heavy box of files.", "A las tres estaba cargando una caja pesada de archivos."),
  ],
  prompts: [
    p("m5d8-p1", "What does Maria do every day? What was she doing at 3?", "¿Qué hace María todos los días? ¿Qué estaba haciendo a las 3?", "She types… She was typing…", "Ella escribe… Estaba escribiendo…", "WHO"),
    p("m5d8-p3", "What was Carlos doing?", "¿Qué estaba haciendo Carlos?", "He was…", "Él estaba…", "WHAT"),
    p("m5d8-p5", "What were the designers doing?", "¿Qué estaban haciendo las diseñadoras?", "They were…", "Ellas estaban…", "WHAT"),
    p("m5d8-p7", "What was the manager carrying?", "¿Qué estaba cargando el gerente?", "He was carrying…", "Estaba cargando…", "WHAT"),
  ],
  cues: ["EVERY DAY", "YESTERDAY 3 PM", "WAS TYPING", "WAS TALKING", "WAS CARRYING"],
  sceneImage: { src: sceneOffice, alt: "A busy office: a woman typing, a man on the phone, two coworkers laughing, a manager carrying a box", altEs: "Una oficina ocupada: una mujer escribiendo, un hombre al teléfono, dos compañeras riéndose, un gerente cargando una caja" },
  storyPanels: [
    card("m5d8-c1", cueWork, "A laptop and a coffee", "MARIA · TYPING"),
    card("m5d8-c2", cueQuestion, "A question bubble", "CARLOS · PHONE"),
    card("m5d8-c3", cueFamily, "People together", "DESIGNERS · LAUGHING"),
    card("m5d8-c4", cueRightNow, "A hand pointing at a clock", "AT 3 PM"),
    card("m5d8-c5", cueEveryDay, "An alarm clock", "EVERY DAY"),
  ],
  rep5Prompt: { question: "Describe the office scene: what people do every day and what they were doing at 3 pm.", questionEs: "Describe la oficina: qué hace la gente todos los días y qué estaba haciendo a las 3 pm." },
  rep5Tips: {
    en: "Go person by person: every day + at 3 pm yesterday. Use was/were + -ing for the scene.",
    es: "Ve persona por persona: todos los días + ayer a las 3 pm. Usa was/were + -ing para la escena.",
  },
});

const d9 = makeDay({
  day: 9,
  week: 2,
  topic: "Listen & Respond",
  topicEs: "Escucha y responde",
  intro: {
    title: "LISTEN, THEN ANSWER",
    titleEs: "ESCUCHA, LUEGO RESPONDE",
    lead: "Listen to Ana's day. In Rep 4 you will answer questions about her — out loud.",
    leadEs: "Escucha el día de Ana. En el Rep 4 vas a responder preguntas sobre ella — en voz alta.",
    examples: ["Ana starts at eight.", "Yesterday she finished late."],
    goal: "Speak for 30+ seconds.",
    goalEs: "Habla 30 segundos o más.",
    cta: START,
  },
  lines: [
    l("m5d9-1", "Ana works | at a bilingual call center.", "Ana trabaja en un call center bilingüe."),
    l("m5d9-2", "Every morning, | she drinks coffee | and checks her headset.", "Cada mañana toma café y revisa sus audífonos."),
    l("m5d9-3", "She usually answers | forty calls a day.", "Normalmente contesta cuarenta llamadas al día."),
    l("m5d9-4", "Yesterday, | she answered | fifty-five calls.", "Ayer contestó cincuenta y cinco llamadas."),
    l("m5d9-5", "She always smiles | when she talks.", "Siempre sonríe cuando habla."),
    l("m5d9-6", "Yesterday, | one customer | thanked her twice.", "Ayer un cliente le agradeció dos veces."),
    l("m5d9-7", "After her shift, | she practices English | for twenty minutes.", "Después de su turno practica inglés por veinte minutos."),
    l("m5d9-8", "Tomorrow, | she is going to practice | with a new app.", "Mañana va a practicar con una app nueva."),
  ],
  prompts: [
    p("m5d9-p1", "Where does Ana work?", "¿Dónde trabaja Ana?", "She works at…", "Ella trabaja en…", "WHERE"),
    p("m5d9-p3", "How many calls does she usually answer? How many yesterday?", "¿Cuántas llamadas contesta normalmente? ¿Cuántas ayer?", "She usually answers… Yesterday, she…", "Normalmente contesta… Ayer, ella…", "HOW MANY"),
    p("m5d9-p5", "What does she always do when she talks?", "¿Qué hace siempre cuando habla?", "She always…", "Ella siempre…", "WHAT"),
    p("m5d9-p8", "What is she going to do tomorrow?", "¿Qué va a hacer mañana?", "Tomorrow, she is going to…", "Mañana, ella va a…", "WHEN"),
  ],
  cues: ["LISTEN", "CALL CENTER", "USUALLY", "YESTERDAY", "TOMORROW"],
  sceneImage: { src: sceneAna, alt: "Ana wearing a headset at her call-center desk, smiling", altEs: "Ana con audífonos en su escritorio del call center, sonriendo" },
  storyPanels: [
    card("m5d9-c1", cueWork, "A laptop and a coffee", "CALL CENTER"),
    card("m5d9-c2", cueEveryDay, "An alarm clock", "40 CALLS"),
    card("m5d9-c3", cueYesterday, "A calendar page torn off", "55 CALLS"),
    card("m5d9-c4", cueRightNow, "A hand pointing at a clock", "SMILES"),
    card("m5d9-c5", cueTomorrow, "A calendar flipping forward", "NEW APP"),
  ],
  rep5Prompt: { question: "Retell Ana's day — then compare it with your own day.", questionEs: "Vuelve a contar el día de Ana — y luego compáralo con tu día." },
  rep5Tips: {
    en: "First retell: usually, yesterday, tomorrow. Then add: In my case, I… Compare 3 things.",
    es: "Primero vuelve a contar: usually, yesterday, tomorrow. Luego agrega: In my case, I… Compara 3 cosas.",
  },
});

const d10 = makeDay({
  day: 10,
  week: 2,
  topic: "Every Day, Yesterday & Tomorrow",
  topicEs: "Todos los días, ayer y mañana",
  intro: {
    title: "THREE TIMES, ONE STORY",
    titleEs: "TRES TIEMPOS, UNA HISTORIA",
    lead: "The full mix: your habits, your yesterday, your tomorrow — in one answer.",
    leadEs: "La mezcla completa: tus hábitos, tu ayer, tu mañana — en una sola respuesta.",
    examples: ["Every day I exercise. Yesterday I exercised twice. Tomorrow I'm going to rest."],
    goal: "Speak for 45–60 seconds.",
    goalEs: "Habla de 45 a 60 segundos.",
    cta: START,
  },
  lines: [
    l("m5d10-1", "Every day, | I exercise | for thirty minutes.", "Todos los días hago ejercicio por treinta minutos."),
    l("m5d10-2", "Yesterday, | I exercised | twice.", "Ayer hice ejercicio dos veces."),
    l("m5d10-3", "Tomorrow, | I'm going to rest | my legs.", "Mañana voy a descansar las piernas."),
    l("m5d10-4", "Usually, | I cook | something simple.", "Normalmente cocino algo sencillo."),
    l("m5d10-5", "Yesterday, | I cooked | a special dinner.", "Ayer cociné una cena especial."),
    l("m5d10-6", "Tomorrow, | my brother | is going to cook for me.", "Mañana mi hermano va a cocinar para mí."),
    l("m5d10-7", "Every week | is different, | but my habits stay.", "Cada semana es diferente, pero mis hábitos se quedan."),
    l("m5d10-8", "Past, present, future — | I can talk | about all three.", "Pasado, presente, futuro — puedo hablar de los tres."),
  ],
  prompts: [
    p("m5d10-p1", "What do you do every day?", "¿Qué haces todos los días?", "Every day, I…", "Todos los días, yo…", "WHAT"),
    p("m5d10-p2", "What did you do yesterday that was different?", "¿Qué hiciste ayer que fue diferente?", "Yesterday, I…", "Ayer, yo…", "WHAT"),
    p("m5d10-p3", "What are you going to do tomorrow?", "¿Qué vas a hacer mañana?", "Tomorrow, I'm going to…", "Mañana voy a…", "WHEN"),
    p("m5d10-p6", "Who is going to do something for you soon?", "¿Quién va a hacer algo por ti pronto?", "… is going to…", "… va a…", "WHO"),
  ],
  cues: ["EVERY DAY", "YESTERDAY", "TOMORROW", "DIFFERENT", "ALL THREE"],
  sceneImage: { src: sceneThreeTimes, alt: "The same person exercising yesterday, drinking coffee today and reading tomorrow", altEs: "La misma persona haciendo ejercicio ayer, tomando café hoy y leyendo mañana" },
  storyPanels: TIME_CARDS("m5d10"),
  goalSeconds: [45, 60],
  goalSentences: 8,
  rep5Prompt: { question: "Talk about your life in three times: every day, yesterday and tomorrow.", questionEs: "Habla de tu vida en tres tiempos: todos los días, ayer y mañana." },
  rep5Tips: {
    en: "Follow the timeline: habit → yesterday → tomorrow, then repeat with a new topic. 8+ ideas.",
    es: "Sigue la línea de tiempo: hábito → ayer → mañana, y repite con un tema nuevo. 8 ideas o más.",
  },
});

/* ====================== WEEK 3 — ASK QUESTIONS ====================== */

const d11 = makeDay({
  day: 11,
  week: 3,
  topic: "I Was, I Am, I Will Be",
  topicEs: "Yo era, yo soy, yo seré",
  intro: {
    title: "TO BE ACROSS TIME",
    titleEs: "TO BE EN EL TIEMPO",
    lead: "Was → am → will be. Talk about who you were, who you are, who you will be — with negatives too.",
    leadEs: "Was → am → will be. Habla de quién eras, quién eres, quién serás — con negativos también.",
    examples: ["I was shy.", "I am more confident now.", "I will be fluent."],
    goal: "Speak for 30–45 seconds.",
    goalEs: "Habla de 30 a 45 segundos.",
    cta: START,
  },
  lines: [
    l("m5d11-1", "Five years ago, | I was | a very shy person.", "Hace cinco años era una persona muy tímida."),
    l("m5d11-2", "I wasn't | confident | in English at all.", "No tenía nada de confianza en inglés."),
    l("m5d11-3", "Today, | I am | much more confident.", "Hoy soy mucho más seguro de mí mismo."),
    l("m5d11-4", "I am not perfect, | but I am | not afraid anymore.", "No soy perfecto, pero ya no tengo miedo."),
    l("m5d11-5", "In two years, | I will be | completely fluent.", "En dos años seré completamente fluido."),
    l("m5d11-6", "I won't be | a beginner | anymore.", "Ya no seré principiante."),
    l("m5d11-7", "My sister was | my first teacher.", "Mi hermana fue mi primera maestra."),
    l("m5d11-8", "Soon, | I will be | her teacher.", "Pronto yo seré su maestro."),
  ],
  prompts: [
    p("m5d11-p1", "Who were you five years ago?", "¿Quién eras hace cinco años?", "Five years ago, I was…", "Hace cinco años, yo era…", "WHO"),
    p("m5d11-p2", "What weren't you good at?", "¿En qué no eras bueno?", "I wasn't good at…", "No era bueno en…", "WHAT"),
    p("m5d11-p3", "Who are you today?", "¿Quién eres hoy?", "Today, I am…", "Hoy, yo soy…", "WHO"),
    p("m5d11-p5", "Who will you be in two years?", "¿Quién serás en dos años?", "In two years, I will be…", "En dos años, seré…", "WHEN"),
    p("m5d11-p7", "Who was important in your life?", "¿Quién fue importante en tu vida?", "… was my…", "… fue mi…", "WHO"),
  ],
  cues: ["WAS", "WASN'T", "AM", "WILL BE", "WON'T BE"],
  sceneImage: { src: sceneToBe, alt: "A woman as a child, as a young professional today, and speaking on stage in the future", altEs: "Una mujer de niña, como profesional hoy y hablando en un escenario en el futuro" },
  storyPanels: [
    card("m5d11-c1", cueYesterday, "A calendar page torn off", "WAS"),
    card("m5d11-c2", cueToday, "A house in the sun", "AM"),
    card("m5d11-c3", cueTomorrow, "A calendar flipping forward", "WILL BE"),
    card("m5d11-c4", cueFamily, "A family together", "MY SISTER"),
    card("m5d11-c5", cueQuestion, "A question bubble", "NOT AFRAID"),
  ],
  rep5Prompt: { question: "Tell me about who you were, who you are, and who you will be.", questionEs: "Cuéntame quién eras, quién eres y quién serás." },
  rep5Tips: {
    en: "Use all five forms: was, wasn't, am, will be, won't be. Give a reason for each change.",
    es: "Usa las cinco formas: was, wasn't, am, will be, won't be. Da una razón para cada cambio.",
  },
});

const d12 = makeDay({
  day: 12,
  week: 3,
  topic: "Yes / No Questions",
  topicEs: "Preguntas de sí / no",
  intro: {
    title: "ASK AND ANSWER",
    titleEs: "PREGUNTA Y RESPONDE",
    lead: "Yes/No questions across time: Did you…? Do you…? Are you going to…? Answer yes/no + one extra idea.",
    leadEs: "Preguntas de sí/no en todos los tiempos: Did you…? Do you…? Are you going to…? Responde sí/no + una idea extra.",
    examples: ["Did you cook yesterday? — Yes, I cooked pasta."],
    goal: "Speak for 30+ seconds.",
    goalEs: "Habla 30 segundos o más.",
    cta: START,
  },
  lines: [
    l("m5d12-1", "Did you cook | yesterday?", "¿Cocinaste ayer?", "q"),
    l("m5d12-2", "Yes, I did. | I cooked | rice and vegetables.", "Sí, cociné. Cociné arroz con vegetales.", "a"),
    l("m5d12-3", "Do you exercise | every day?", "¿Haces ejercicio todos los días?", "q"),
    l("m5d12-4", "No, I don't. | I exercise | three times a week.", "No. Hago ejercicio tres veces por semana.", "a"),
    l("m5d12-5", "Are you going to travel | this year?", "¿Vas a viajar este año?", "q"),
    l("m5d12-6", "Yes, I am. | I'm going to visit | my cousins in June.", "Sí. Voy a visitar a mis primos en junio.", "a"),
    l("m5d12-7", "Did you drive | to work today?", "¿Manejaste al trabajo hoy?", "q"),
    l("m5d12-8", "No, I didn't. | I walked | because the weather was nice.", "No. Caminé porque el clima estaba lindo.", "a"),
  ],
  prompts: [
    p("m5d12-p1", "Did you cook yesterday? (yes/no + one idea)", "¿Cocinaste ayer? (sí/no + una idea)", "Yes, I did. I… / No, I didn't. I…", "Sí. Yo… / No. Yo…", "DID"),
    p("m5d12-p3", "Do you exercise every day?", "¿Haces ejercicio todos los días?", "Yes, I do. I… / No, I don't. I…", "Sí. Yo… / No. Yo…", "DO"),
    p("m5d12-p5", "Are you going to travel this year?", "¿Vas a viajar este año?", "Yes, I am. I'm going to… / No, I'm not.", "Sí. Voy a… / No.", "GOING TO"),
    p("m5d12-p7", "Did you drive today?", "¿Manejaste hoy?", "Yes, I did. / No, I didn't. I…", "Sí. / No. Yo…", "DID"),
  ],
  cues: ["DID YOU?", "DO YOU?", "ARE YOU GOING TO?", "YES + IDEA", "NO + IDEA"],
  sceneImage: { src: sceneYesNo, alt: "Two friends at a cafe, one asking and the other answering with a thumbs up", altEs: "Dos amigas en un café, una pregunta y la otra responde con el pulgar arriba" },
  storyPanels: [
    card("m5d12-c1", cueQuestion, "A question bubble", "DID YOU?"),
    card("m5d12-c2", cueYesterday, "A calendar page torn off", "YESTERDAY"),
    card("m5d12-c3", cueEveryDay, "An alarm clock", "EVERY DAY"),
    card("m5d12-c4", cueNextWeekend, "A camping tent", "THIS YEAR"),
    card("m5d12-c5", cueToday, "A house in the sun", "TODAY"),
  ],
  rep5Prompt: { question: "Ask yourself 5 yes/no questions about your life and answer each one with an extra idea.", questionEs: "Hazte 5 preguntas de sí/no sobre tu vida y responde cada una con una idea extra." },
  rep5Tips: {
    en: "Every answer = yes/no + one more sentence. Never stop at just yes or no.",
    es: "Cada respuesta = sí/no + una frase más. Nunca pares en solo sí o no.",
  },
});

const d13 = makeDay({
  day: 13,
  week: 3,
  topic: "WH Questions Across Time",
  topicEs: "Preguntas WH en el tiempo",
  intro: {
    title: "WHAT · WHERE · WHEN",
    titleEs: "QUÉ · DÓNDE · CUÁNDO",
    lead: "Ask WH questions about the past, the present and the future — then answer them.",
    leadEs: "Haz preguntas WH sobre el pasado, el presente y el futuro — y luego respóndelas.",
    examples: ["Where did you go?", "What do you do?", "When are you going to travel?"],
    goal: "Speak for 30–45 seconds.",
    goalEs: "Habla de 30 a 45 segundos.",
    cta: START,
  },
  lines: [
    l("m5d13-1", "What did you do | last night?", "¿Qué hiciste anoche?", "q"),
    l("m5d13-2", "Last night, | I painted | my bedroom wall.", "Anoche pinté la pared de mi cuarto.", "a"),
    l("m5d13-3", "Where do you usually | spend your weekends?", "¿Dónde pasas normalmente los fines de semana?", "q"),
    l("m5d13-4", "I usually spend them | at my parents' house.", "Normalmente los paso en casa de mis papás.", "a"),
    l("m5d13-5", "When are you going to | practice English today?", "¿Cuándo vas a practicar inglés hoy?", "q"),
    l("m5d13-6", "I'm going to practice | right after dinner.", "Voy a practicar justo después de cenar.", "a"),
    l("m5d13-7", "Why did you start | learning English?", "¿Por qué empezaste a aprender inglés?", "q"),
    l("m5d13-8", "Because I want | a better job.", "Porque quiero un mejor trabajo.", "a"),
  ],
  prompts: [
    p("m5d13-p1", "What did you do last night?", "¿Qué hiciste anoche?", "Last night, I…", "Anoche, yo…", "WHAT"),
    p("m5d13-p3", "Where do you usually spend your weekends?", "¿Dónde pasas normalmente los fines de semana?", "I usually spend them…", "Normalmente los paso…", "WHERE"),
    p("m5d13-p5", "When are you going to practice today?", "¿Cuándo vas a practicar hoy?", "I'm going to practice…", "Voy a practicar…", "WHEN"),
    p("m5d13-p7", "Why did you start learning English?", "¿Por qué empezaste a aprender inglés?", "Because I want…", "Porque quiero…", "WHY"),
  ],
  cues: ["WHAT + PAST", "WHERE + PRESENT", "WHEN + FUTURE", "WHY", "BECAUSE"],
  sceneImage: { src: sceneWh, alt: "A curious man surrounded by question bubbles with icons", altEs: "Un hombre curioso rodeado de burbujas de preguntas con íconos" },
  storyPanels: [
    card("m5d13-c1", cueQuestion, "A question bubble", "WHAT?"),
    card("m5d13-c2", cueEveryDay, "An alarm clock", "WHERE?"),
    card("m5d13-c3", cueTomorrow, "A calendar flipping forward", "WHEN?"),
    card("m5d13-c4", cueYesterday, "A calendar page torn off", "WHY?"),
    card("m5d13-c5", cueFamily, "A family together", "BECAUSE"),
  ],
  rep5Prompt: { question: "Interview yourself: ask and answer 5 WH questions — past, present and future.", questionEs: "Entrevístate: haz y responde 5 preguntas WH — pasado, presente y futuro." },
  rep5Tips: {
    en: "Say the question, then answer it: What did I do last night? I…. Mix the three times.",
    es: "Di la pregunta y luego respóndela: What did I do last night? I…. Mezcla los tres tiempos.",
  },
});

const d14 = makeDay({
  day: 14,
  week: 3,
  topic: "Listen, Understand & Answer",
  topicEs: "Escucha, entiende y responde",
  intro: {
    title: "UNDERSTAND ANY TENSE",
    titleEs: "ENTIENDE CUALQUIER TIEMPO",
    lead: "Listen to Marcos' story — it jumps between past, present and future. In Rep 4, answer out loud.",
    leadEs: "Escucha la historia de Marcos — salta entre pasado, presente y futuro. En el Rep 4 responde en voz alta.",
    examples: ["He moved last year.", "He designs now.", "He's going to open a studio."],
    goal: "Speak for 30+ seconds.",
    goalEs: "Habla 30 segundos o más.",
    cta: START,
  },
  lines: [
    l("m5d14-1", "Marcos moved | to this city | three years ago.", "Marcos se mudó a esta ciudad hace tres años."),
    l("m5d14-2", "At first, | he washed dishes | in a hotel.", "Al principio lavaba platos en un hotel."),
    l("m5d14-3", "Now, | he designs | menus for restaurants.", "Ahora diseña menús para restaurantes."),
    l("m5d14-4", "He works | from a small studio | downtown.", "Trabaja desde un pequeño estudio en el centro."),
    l("m5d14-5", "Last month, | a famous restaurant | chose his design.", "El mes pasado un restaurante famoso eligió su diseño."),
    l("m5d14-6", "Right now, | he is saving money | for new equipment.", "Ahora mismo está ahorrando dinero para equipo nuevo."),
    l("m5d14-7", "Next year, | he's going to open | his own studio.", "El próximo año va a abrir su propio estudio."),
    l("m5d14-8", "He believes | his life will change | completely.", "Él cree que su vida va a cambiar por completo."),
  ],
  prompts: [
    p("m5d14-p1", "When did Marcos move to this city?", "¿Cuándo se mudó Marcos a esta ciudad?", "He moved…", "Se mudó…", "WHEN"),
    p("m5d14-p2", "What did he do at first?", "¿Qué hacía al principio?", "At first, he…", "Al principio, él…", "WHAT"),
    p("m5d14-p3", "What does he do now?", "¿Qué hace ahora?", "Now, he…", "Ahora, él…", "WHAT"),
    p("m5d14-p5", "What happened last month?", "¿Qué pasó el mes pasado?", "Last month, …", "El mes pasado, …", "WHAT"),
    p("m5d14-p7", "What is he going to do next year?", "¿Qué va a hacer el próximo año?", "Next year, he's going to…", "El próximo año, va a…", "WHEN"),
  ],
  cues: ["MOVED", "AT FIRST", "NOW", "LAST MONTH", "NEXT YEAR"],
  sceneImage: { src: sceneListen, alt: "A woman with headphones listening, ready to speak into a microphone", altEs: "Una mujer con audífonos escuchando, lista para hablar en un micrófono" },
  storyPanels: [
    card("m5d14-c1", cueYesterday, "A calendar page torn off", "3 YEARS AGO"),
    card("m5d14-c2", cueWork, "A laptop and a coffee", "DESIGNS NOW"),
    card("m5d14-c3", cueRightNow, "A hand pointing at a clock", "SAVING"),
    card("m5d14-c4", cueTomorrow, "A calendar flipping forward", "NEXT YEAR"),
    card("m5d14-c5", cueQuestion, "A question bubble", "ANSWER!"),
  ],
  rep5Prompt: { question: "Retell Marcos' story from start to future — then say one thing about your own plans.", questionEs: "Vuelve a contar la historia de Marcos del inicio al futuro — y agrega algo de tus planes." },
  rep5Tips: {
    en: "Use the time markers to stay ordered: three years ago → now → last month → next year.",
    es: "Usa los marcadores de tiempo para mantener el orden: three years ago → now → last month → next year.",
  },
});

const d15 = makeDay({
  day: 15,
  week: 3,
  topic: "Interview Challenge",
  topicEs: "Reto de entrevista",
  intro: {
    title: "ANSWER LIKE A PRO",
    titleEs: "RESPONDE COMO UN PROFESIONAL",
    lead: "A friendly interview about your past, your present and your future — like a real call-center interview.",
    leadEs: "Una entrevista amigable sobre tu pasado, tu presente y tu futuro — como una entrevista real de call center.",
    examples: ["Tell me about yourself.", "Why should we hire you?"],
    goal: "Speak for ~60 seconds.",
    goalEs: "Habla unos 60 segundos.",
    cta: START,
  },
  lines: [
    l("m5d15-1", "Tell me | about yourself.", "Cuéntame sobre ti.", "q"),
    l("m5d15-2", "I'm a hard worker. | I learned English | on my own.", "Soy muy trabajador. Aprendí inglés por mi cuenta.", "a"),
    l("m5d15-3", "What did you do | before this?", "¿Qué hacías antes de esto?", "q"),
    l("m5d15-4", "I fixed computers | at a small shop | for two years.", "Arreglaba computadoras en una tienda pequeña por dos años.", "a"),
    l("m5d15-5", "What do you do | in your free time?", "¿Qué haces en tu tiempo libre?", "q"),
    l("m5d15-6", "I practice English | and I run | in the park.", "Practico inglés y corro en el parque.", "a"),
    l("m5d15-7", "Where do you see yourself | in two years?", "¿Dónde te ves en dos años?", "q"),
    l("m5d15-8", "I see myself | leading a team | and speaking English | every day.", "Me veo liderando un equipo y hablando inglés todos los días.", "a"),
  ],
  prompts: [
    p("m5d15-p1", "Tell me about yourself.", "Cuéntame sobre ti.", "I'm… I learned…", "Soy… Aprendí…", "PAST"),
    p("m5d15-p3", "What did you do before?", "¿Qué hacías antes?", "I… for…", "Yo… por…", "PAST"),
    p("m5d15-p5", "What do you do in your free time?", "¿Qué haces en tu tiempo libre?", "I…", "Yo…", "PRESENT"),
    p("m5d15-p7", "Where do you see yourself in two years?", "¿Dónde te ves en dos años?", "I see myself…", "Me veo…", "FUTURE"),
    p("m5d15-p8", "Why should they hire you?", "¿Por qué deberían contratarte?", "Because I…", "Porque yo…", "WHY"),
  ],
  cues: ["YOURSELF", "BEFORE", "FREE TIME", "TWO YEARS", "HIRE YOU"],
  sceneImage: { src: sceneInterview, alt: "A confident woman answering questions in a friendly job interview", altEs: "Una mujer segura respondiendo preguntas en una entrevista de trabajo amigable" },
  storyPanels: [
    card("m5d15-c1", cueQuestion, "A question bubble", "ABOUT YOU"),
    card("m5d15-c2", cueYesterday, "A calendar page torn off", "BEFORE"),
    card("m5d15-c3", cueEveryDay, "An alarm clock", "FREE TIME"),
    card("m5d15-c4", cueTomorrow, "A calendar flipping forward", "2 YEARS"),
    card("m5d15-c5", cueWork, "A laptop and a coffee", "HIRE ME"),
  ],
  goalSeconds: [45, 60],
  goalSentences: 8,
  rep5Prompt: { question: "Answer the full interview: about you, your past, your free time and your future.", questionEs: "Responde la entrevista completa: sobre ti, tu pasado, tu tiempo libre y tu futuro." },
  rep5Tips: {
    en: "Answer each question with 2 sentences. Smile while you speak — it changes your voice.",
    es: "Responde cada pregunta con 2 frases. Sonríe al hablar — cambia tu voz.",
  },
});

/* ==================== WEEK 4 — REAL CONVERSATION ==================== */

const d16 = makeDay({
  day: 16,
  week: 4,
  topic: "My Life: Past, Present & Future",
  topicEs: "Mi vida: pasado, presente y futuro",
  intro: {
    title: "YOUR WHOLE STORY",
    titleEs: "TODA TU HISTORIA",
    lead: "One answer, three times: where you were, where you are, where you're going.",
    leadEs: "Una respuesta, tres tiempos: dónde estabas, dónde estás, a dónde vas.",
    examples: ["I lived in a small town.", "Now I live in the city.", "I'm going to move again."],
    goal: "Speak for 45+ seconds.",
    goalEs: "Habla 45 segundos o más.",
    cta: START,
  },
  lines: [
    l("m5d16-1", "When I was a kid, | I lived | in a small town.", "Cuando era niño vivía en un pueblo pequeño."),
    l("m5d16-2", "I rode my bike | everywhere.", "Andaba en bicicleta por todos lados."),
    l("m5d16-3", "Now, | I live | in the city.", "Ahora vivo en la ciudad."),
    l("m5d16-4", "I drive | to the office | every morning.", "Manejo a la oficina todas las mañanas."),
    l("m5d16-5", "These days, | I'm learning | to design websites.", "Estos días estoy aprendiendo a diseñar sitios web."),
    l("m5d16-6", "Next year, | I'm going to move | to a quieter place.", "El próximo año me voy a mudar a un lugar más tranquilo."),
    l("m5d16-7", "I think | I'll miss | the city a little.", "Creo que voy a extrañar la ciudad un poco."),
    l("m5d16-8", "But my future | is going to be | calmer and better.", "Pero mi futuro va a ser más tranquilo y mejor."),
  ],
  prompts: [
    p("m5d16-p1", "Where did you live when you were a kid?", "¿Dónde vivías cuando eras niño?", "When I was a kid, I lived…", "Cuando era niño vivía…", "WHERE"),
    p("m5d16-p3", "Where do you live now?", "¿Dónde vives ahora?", "Now, I live…", "Ahora vivo…", "WHERE"),
    p("m5d16-p5", "What are you learning these days?", "¿Qué estás aprendiendo estos días?", "These days, I'm learning…", "Estos días estoy aprendiendo…", "WHAT"),
    p("m5d16-p6", "Where are you going to live in the future?", "¿Dónde vas a vivir en el futuro?", "I'm going to live…", "Voy a vivir…", "WHERE"),
  ],
  cues: ["KID", "NOW", "THESE DAYS", "NEXT YEAR", "FUTURE"],
  sceneImage: { src: sceneMyLife, alt: "A confident man with his childhood behind him and his goals ahead", altEs: "Un hombre seguro con su infancia detrás y sus metas adelante" },
  storyPanels: TIME_CARDS("m5d16"),
  rep5Prompt: { question: "Tell me the story of your life: past, present and future.", questionEs: "Cuéntame la historia de tu vida: pasado, presente y futuro." },
  rep5Tips: {
    en: "Three blocks: When I was a kid… / Now… / In the future…. Add one detail per block, then one more.",
    es: "Tres bloques: When I was a kid… / Now… / In the future…. Agrega un detalle por bloque, y luego uno más.",
  },
});

const d17 = makeDay({
  day: 17,
  week: 4,
  topic: "Someone Else's Story",
  topicEs: "La historia de otra persona",
  intro: {
    title: "TELL SOFIA'S STORY",
    titleEs: "CUENTA LA HISTORIA DE SOFIA",
    lead: "Sofia changed her life. Tell her story — and guess her future.",
    leadEs: "Sofia cambió su vida. Cuenta su historia — y adivina su futuro.",
    examples: ["Sofia drove a delivery truck.", "Now she designs websites.", "She'll start her own business."],
    goal: "Speak for 45+ seconds.",
    goalEs: "Habla 45 segundos o más.",
    cta: START,
  },
  lines: [
    l("m5d17-1", "Three years ago, | Sofia drove | a delivery truck.", "Hace tres años, Sofia manejaba un camión de reparto."),
    l("m5d17-2", "She woke up | at four every morning.", "Se despertaba a las cuatro todas las mañanas."),
    l("m5d17-3", "She saved money | and took an online course.", "Ahorró dinero y tomó un curso en línea."),
    l("m5d17-4", "Now, | she designs websites | from home.", "Ahora diseña sitios web desde casa."),
    l("m5d17-5", "She earns more | and she sleeps better.", "Gana más y duerme mejor."),
    l("m5d17-6", "Right now, | she is learning | marketing.", "Ahora mismo está aprendiendo mercadeo."),
    l("m5d17-7", "Next year, | she's going to start | her own business.", "El próximo año va a empezar su propio negocio."),
    l("m5d17-8", "I think | she'll be | very successful.", "Creo que va a ser muy exitosa."),
  ],
  prompts: [
    p("m5d17-p1", "What did Sofia do three years ago?", "¿Qué hacía Sofia hace tres años?", "Three years ago, she…", "Hace tres años, ella…", "PAST"),
    p("m5d17-p3", "How did she change her life?", "¿Cómo cambió su vida?", "She saved… and took…", "Ahorró… y tomó…", "HOW"),
    p("m5d17-p4", "What does she do now?", "¿Qué hace ahora?", "Now, she…", "Ahora, ella…", "PRESENT"),
    p("m5d17-p7", "What is she going to do next year?", "¿Qué va a hacer el próximo año?", "She's going to…", "Ella va a…", "FUTURE"),
    p("m5d17-p8", "What do you think will happen to her?", "¿Qué crees que le va a pasar?", "I think she'll…", "Creo que ella va a…", "OPINION"),
  ],
  cues: ["3 YEARS AGO", "SAVED", "NOW", "LEARNING", "SHE'LL BE"],
  sceneImage: { src: sceneSofia, alt: "Sofia driving a delivery truck, then designing at home, then planning her business", altEs: "Sofia manejando un camión de reparto, luego diseñando en casa, luego planeando su negocio" },
  storyPanels: [
    card("m5d17-c1", cueYesterday, "A calendar page torn off", "DROVE A TRUCK"),
    card("m5d17-c2", cueEveryDay, "An alarm clock", "ONLINE COURSE"),
    card("m5d17-c3", cueWork, "A laptop and a coffee", "DESIGNS NOW"),
    card("m5d17-c4", cueRightNow, "A hand pointing at a clock", "LEARNING"),
    card("m5d17-c5", cueTomorrow, "A calendar flipping forward", "OWN BUSINESS"),
  ],
  rep5Prompt: { question: "Tell Sofia's whole story — past, present and future — and add your opinion.", questionEs: "Cuenta toda la historia de Sofia — pasado, presente y futuro — y agrega tu opinión." },
  rep5Tips: {
    en: "Narrate with she. End with your opinion: I think she'll…. Compare with your own life for extra ideas.",
    es: "Narra con she. Termina con tu opinión: I think she'll…. Compara con tu vida para ideas extra.",
  },
});

const d18 = makeDay({
  day: 18,
  week: 4,
  topic: "Ask Me Anything",
  topicEs: "Pregúntame lo que sea",
  intro: {
    title: "SUNDAY QUESTIONS",
    titleEs: "PREGUNTAS DE DOMINGO",
    lead: "A lazy Sunday chat: questions about yesterday, today and next week — all mixed.",
    leadEs: "Una charla de domingo: preguntas sobre ayer, hoy y la próxima semana — todas mezcladas.",
    examples: ["What did you cook?", "What are you doing now?", "What are you going to do?"],
    goal: "Speak for 30–45 seconds.",
    goalEs: "Habla de 30 a 45 segundos.",
    cta: START,
  },
  lines: [
    l("m5d18-1", "What did you do | this morning?", "¿Qué hiciste esta mañana?", "q"),
    l("m5d18-2", "I slept late | and made pancakes.", "Dormí hasta tarde e hice panqueques.", "a"),
    l("m5d18-3", "What are you doing | right now?", "¿Qué estás haciendo ahora mismo?", "q"),
    l("m5d18-4", "I'm talking to you | and drinking coffee.", "Estoy hablando contigo y tomando café.", "a"),
    l("m5d18-5", "What do you usually do | on Sundays?", "¿Qué haces normalmente los domingos?", "q"),
    l("m5d18-6", "I usually call my mom | and clean the house.", "Normalmente llamo a mi mamá y limpio la casa.", "a"),
    l("m5d18-7", "What are you going to do | next Sunday?", "¿Qué vas a hacer el próximo domingo?", "q"),
    l("m5d18-8", "I'm going to drive | to the lake | with my friends.", "Voy a manejar al lago con mis amigos.", "a"),
  ],
  prompts: [
    p("m5d18-p1", "What did you do this morning?", "¿Qué hiciste esta mañana?", "This morning, I…", "Esta mañana, yo…", "PAST"),
    p("m5d18-p3", "What are you doing right now?", "¿Qué estás haciendo ahora mismo?", "Right now, I'm…", "Ahora mismo estoy…", "NOW"),
    p("m5d18-p5", "What do you usually do on Sundays?", "¿Qué haces normalmente los domingos?", "On Sundays, I usually…", "Los domingos normalmente…", "HABIT"),
    p("m5d18-p7", "What are you going to do next Sunday?", "¿Qué vas a hacer el próximo domingo?", "Next Sunday, I'm going to…", "El próximo domingo voy a…", "FUTURE"),
  ],
  cues: ["THIS MORNING", "RIGHT NOW", "SUNDAYS", "NEXT SUNDAY", "MIXED"],
  sceneImage: { src: sceneSundays, alt: "A woman relaxing on a sofa with pancakes, coffee and her phone", altEs: "Una mujer descansando en un sofá con panqueques, café y su teléfono" },
  storyPanels: [
    card("m5d18-c1", cueYesterday, "A calendar page torn off", "THIS MORNING"),
    card("m5d18-c2", cueRightNow, "A hand pointing at a clock", "RIGHT NOW"),
    card("m5d18-c3", cueEveryDay, "An alarm clock", "SUNDAYS"),
    card("m5d18-c4", cueNextWeekend, "A camping tent", "NEXT SUNDAY"),
    card("m5d18-c5", cueFamily, "A family together", "MY MOM"),
  ],
  rep5Prompt: { question: "Answer all four Sunday questions in one smooth answer — past, now, habit and future.", questionEs: "Responde las cuatro preguntas de domingo en una sola respuesta fluida — pasado, ahora, hábito y futuro." },
  rep5Tips: {
    en: "Don't pause between tenses. This morning…, right now…, on Sundays…, next Sunday….",
    es: "No pares entre tiempos. This morning…, right now…, on Sundays…, next Sunday….",
  },
});

const d19 = makeDay({
  day: 19,
  week: 4,
  topic: "Real Conversation Challenge",
  topicEs: "Reto de conversación real",
  intro: {
    title: "MEET SOMEONE NEW",
    titleEs: "CONOCE A ALGUIEN NUEVO",
    lead: "You just met a new coworker. Have a real conversation — questions and answers across all tenses.",
    leadEs: "Acabas de conocer a un compañero nuevo. Ten una conversación real — preguntas y respuestas en todos los tiempos.",
    examples: ["Where did you work before?", "Do you like it here?", "What are you going to do tonight?"],
    goal: "Speak for 45–60 seconds.",
    goalEs: "Habla de 45 a 60 segundos.",
    cta: START,
  },
  lines: [
    l("m5d19-1", "Hi, I'm Daniel. | Where did you work | before this?", "Hola, soy Daniel. ¿Dónde trabajabas antes de esto?", "q"),
    l("m5d19-2", "Nice to meet you. | I answered phones | at a hotel.", "Mucho gusto. Contestaba teléfonos en un hotel.", "a"),
    l("m5d19-3", "Do you like | your new job?", "¿Te gusta tu nuevo trabajo?", "q"),
    l("m5d19-4", "Yes, I love it. | Everyone is | really friendly.", "Sí, me encanta. Todos son muy amables.", "a"),
    l("m5d19-5", "What are you doing | this weekend?", "¿Qué vas a hacer este fin de semana?", "q"),
    l("m5d19-6", "I'm going to visit | my parents | on Saturday.", "Voy a visitar a mis papás el sábado.", "a"),
    l("m5d19-7", "Did you move here | recently?", "¿Te mudaste aquí recientemente?", "q"),
    l("m5d19-8", "Yes, I moved | two months ago. | I'm still exploring the city.", "Sí, me mudé hace dos meses. Todavía estoy conociendo la ciudad.", "a"),
  ],
  prompts: [
    p("m5d19-p1", "Where did you work before this?", "¿Dónde trabajabas antes de esto?", "Before this, I…", "Antes de esto, yo…", "PAST"),
    p("m5d19-p3", "Do you like your job? Why?", "¿Te gusta tu trabajo? ¿Por qué?", "Yes / No, because…", "Sí / No, porque…", "PRESENT"),
    p("m5d19-p5", "What are you doing this weekend?", "¿Qué vas a hacer este fin de semana?", "This weekend, I'm going to…", "Este fin de semana voy a…", "FUTURE"),
    p("m5d19-p7", "Did you move recently?", "¿Te mudaste recientemente?", "Yes, I moved… / No, I…", "Sí, me mudé… / No, yo…", "PAST"),
    p("m5d19-p9", "What question would YOU ask a new coworker?", "¿Qué pregunta le harías TÚ a un compañero nuevo?", "I would ask: …?", "Yo preguntaría: …?", "YOUR TURN"),
  ],
  cues: ["BEFORE", "LIKE IT?", "WEEKEND", "MOVED?", "YOUR QUESTION"],
  sceneImage: { src: sceneCoworker, alt: "Two professionals shaking hands at the office kitchen with coffee", altEs: "Dos profesionales dándose la mano en la cocina de la oficina con café" },
  storyPanels: [
    card("m5d19-c1", cueWork, "A laptop and a coffee", "BEFORE"),
    card("m5d19-c2", cueQuestion, "A question bubble", "DO YOU LIKE?"),
    card("m5d19-c3", cueNextWeekend, "A camping tent", "WEEKEND"),
    card("m5d19-c4", cueYesterday, "A calendar page torn off", "MOVED"),
    card("m5d19-c5", cueFamily, "A family together", "PARENTS"),
  ],
  goalSeconds: [45, 60],
  goalSentences: 8,
  rep5Prompt: { question: "Have the full conversation: answer the questions AND ask your own.", questionEs: "Ten la conversación completa: responde las preguntas Y haz las tuyas." },
  rep5Tips: {
    en: "Answer, then ask back: And you? A real conversation goes in two directions.",
    es: "Responde y luego pregunta de vuelta: And you? Una conversación real va en dos direcciones.",
  },
});

const d20 = makeDay({
  day: 20,
  week: 4,
  topic: "Mixed Tense Fluency Challenge",
  topicEs: "Reto final de fluidez",
  intro: {
    title: "TELL ME ABOUT YOUR LIFE",
    titleEs: "CUÉNTAME DE TU VIDA",
    lead: "The final challenge: one minute about your life — past, present and future. No script.",
    leadEs: "El reto final: un minuto sobre tu vida — pasado, presente y futuro. Sin guion.",
    examples: ["Yesterday…", "Every day…", "Tomorrow…"],
    goal: "Speak for 60+ seconds.",
    goalEs: "Habla 60 segundos o más.",
    cta: START,
  },
  lines: [
    l("m5d20-1", "Yesterday, | I cleaned my house | and cooked dinner.", "Ayer limpié mi casa y cociné la cena."),
    l("m5d20-2", "Every day, | I practice English | and exercise.", "Todos los días practico inglés y hago ejercicio."),
    l("m5d20-3", "Tomorrow, | I'm going to drive | to my parents' house.", "Mañana voy a manejar a casa de mis papás."),
    l("m5d20-4", "Five years ago, | I was | a different person.", "Hace cinco años era una persona diferente."),
    l("m5d20-5", "Today, | I am | proud of my progress.", "Hoy estoy orgulloso de mi progreso."),
    l("m5d20-6", "In the future, | I will be | completely fluent.", "En el futuro seré completamente fluido."),
    l("m5d20-7", "Last weekend | was calm, | but next weekend | is going to be exciting.", "El fin de semana pasado fue tranquilo, pero el próximo va a ser emocionante."),
    l("m5d20-8", "Past, present, future — | my life | in English.", "Pasado, presente, futuro — mi vida en inglés."),
  ],
  prompts: [
    p("m5d20-p1", "What did you do yesterday?", "¿Qué hiciste ayer?", "Yesterday, I…", "Ayer, yo…", "YESTERDAY"),
    p("m5d20-p2", "What do you do every day?", "¿Qué haces todos los días?", "Every day, I…", "Todos los días, yo…", "TODAY"),
    p("m5d20-p3", "What are you going to do tomorrow?", "¿Qué vas a hacer mañana?", "Tomorrow, I'm going to…", "Mañana voy a…", "TOMORROW"),
  ],
  cues: ["YESTERDAY", "TODAY", "TOMORROW", "I WAS", "I WILL BE"],
  sceneImage: { src: sceneChallenge, alt: "A champion with a microphone on a podium with confetti", altEs: "Un campeón con micrófono en un podio con confeti" },
  storyPanels: TIME_CARDS("m5d20"),
  goalSeconds: [60, 90],
  goalSentences: 10,
  hideModelText: true,
  rep5Prompt: { question: "TELL ME ABOUT YOUR LIFE — yesterday, today and tomorrow.", questionEs: "CUÉNTAME DE TU VIDA — ayer, hoy y mañana." },
  rep5Tips: {
    en: "Speak only from the three cue cards: YESTERDAY · TODAY · TOMORROW. Aim for 10+ ideas and 60 seconds.",
    es: "Habla solo con las tres tarjetas: YESTERDAY · TODAY · TOMORROW. Busca 10 ideas o más y 60 segundos.",
  },
});

export const MIXED_TENSES_DAYS: CourseDay[] = [
  d1, d2, d3, d4, d5,
  d6, d7, d8, d9, d10,
  d11, d12, d13, d14, d15,
  d16, d17, d18, d19, d20,
];
