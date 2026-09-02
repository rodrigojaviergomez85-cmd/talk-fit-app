import type { CourseDay, ModelLine, PersonalPrompt, StoryPanel, VerbCard } from "@/lib/types";

import wakeUp from "@/assets/module3/verb-wake-up.jpg";
import getUp from "@/assets/module3/verb-get-up.jpg";
import shower from "@/assets/module3/verb-shower.jpg";
import getDressed from "@/assets/module3/verb-get-dressed.jpg";
import eat from "@/assets/module3/verb-eat.jpg";
import drink from "@/assets/module3/verb-drink.jpg";
import leave from "@/assets/module3/verb-leave.jpg";
import arrive from "@/assets/module3/verb-arrive.jpg";
import meeting from "@/assets/module3/verb-meeting.jpg";
import talk from "@/assets/module3/verb-talk.jpg";
import answerEmails from "@/assets/module3/verb-answer-emails.jpg";
import help from "@/assets/module3/verb-help.jpg";
import lunch from "@/assets/module3/verb-lunch.jpg";
import finish from "@/assets/module3/verb-finish.jpg";
import goHome from "@/assets/module3/verb-go-home.jpg";
import watchTv from "@/assets/module3/verb-watch-tv.jpg";
import phoneCall from "@/assets/module3/verb-phone-call.jpg";
import housework from "@/assets/module3/verb-housework.jpg";
import goToBed from "@/assets/module3/verb-go-to-bed.jpg";
import makeBreakfast from "@/assets/module3/verb-make-breakfast.jpg";
import mall from "@/assets/module3/verb-mall.jpg";
import buy from "@/assets/module3/verb-buy.jpg";
import movie from "@/assets/module3/verb-movie.jpg";
import meet from "@/assets/module3/verb-meet.jpg";
import comeHome from "@/assets/module3/verb-come-home.jpg";
import tired from "@/assets/module3/verb-tired.jpg";
import happy from "@/assets/module3/verb-happy.jpg";

import sceneHomeNight from "@/assets/module3/scene-home-night.jpg";
import sceneOffice from "@/assets/module3/scene-office-yesterday.jpg";
import scenePark from "@/assets/module3/scene-park-yesterday.jpg";
import sceneWhen from "@/assets/module3/scene-when-something-happened.jpg";
import sceneRain from "@/assets/module3/scene-street-rain.jpg";

import story1 from "@/assets/module3/story-1-home.jpg";
import story2 from "@/assets/module3/story-2-basket.jpg";
import story3 from "@/assets/module3/story-3-forest.jpg";
import story4 from "@/assets/module3/story-4-wolf.jpg";
import story5 from "@/assets/module3/story-5-wolf-runs.jpg";
import story6 from "@/assets/module3/story-6-house.jpg";
import story7 from "@/assets/module3/story-7-surprise.jpg";
import story8 from "@/assets/module3/story-8-ending.jpg";

/**
 * MODULE 3 — PAST EXPERIENCES & STORIES (Days 1–20).
 * Simple Past → Did/Didn't → Past Progressive → Storytelling.
 * Every day: exactly 8 core model sentences, recycled across Reps 1–4.
 */

const GOAL: [number, number] = [30, 45];

export const PAST_STORIES_WEEKS: {
  week: 1 | 2 | 3 | 4;
  title: string;
  subtitle: string;
  subtitleEs: string;
}[] = [
  { week: 1, title: "My Day Yesterday", subtitle: "Simple Past", subtitleEs: "Pasado simple — mi día de ayer" },
  { week: 2, title: "Other People", subtitle: "Did / Didn't", subtitleEs: "Otras personas — Did / Didn't" },
  { week: 3, title: "What Was Happening?", subtitle: "Past Progressive", subtitleEs: "Pasado progresivo — qué estaba pasando" },
  { week: 4, title: "Tell a Story", subtitle: "Little Red Riding Hood", subtitleEs: "Cuenta una historia — Caperucita Roja" },
];

/** `l("id", "Yesterday, I woke up | at six thirty.", "…")` — `|` marks speaking chunks. */
function l(id: string, marked: string, es: string): ModelLine {
  const chunks = marked.split("|").map((chunk) => chunk.trim()).filter(Boolean);
  return { id, text: chunks.join(" "), es, chunks };
}

function p(id: string, question: string, questionEs: string, starter: string, starterEs: string, cue?: string): PersonalPrompt {
  return cue ? { id, question, questionEs, starter, starterEs, cue } : { id, question, questionEs, starter, starterEs };
}

function vc(
  id: string,
  src: string,
  alt: string,
  present: string,
  past: string,
  sentence: string,
  es: string,
  negative?: { sentence: string; es: string },
): VerbCard {
  return negative ? { id, src, alt, present, past, sentence, es, negative } : { id, src, alt, present, past, sentence, es };
}

function panel(id: string, src: string, alt: string, cue: string, caption: string, captionEs: string): StoryPanel {
  return { id, src, alt, cue, caption, captionEs };
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
  verbCards?: VerbCard[];
  storyPanels?: StoryPanel[];
  sceneImage?: { src: string; alt: string; altEs: string };
  variants?: { id: string; label: string; labelEs: string }[];
  goalSeconds?: [number, number];
  goalSentences?: number;
  hideModelText?: boolean;
};

function makeDay(input: DayInput): CourseDay {
  const week = PAST_STORIES_WEEKS.find((w) => w.week === input.week)!;
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
    ...(input.verbCards ? { verbCards: input.verbCards } : {}),
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

/* ============================ WEEK 1 — MY DAY YESTERDAY ============================ */

const d1 = makeDay({
  day: 1,
  week: 1,
  topic: "My Morning Yesterday",
  topicEs: "Mi mañana de ayer",
  intro: {
    title: "SIMPLE PAST",
    titleEs: "PASADO SIMPLE",
    lead: "Talk about yesterday. Look at the picture, hear the verb, say the sentence.",
    leadEs: "Habla de ayer. Mira la imagen, escucha el verbo y di la oración.",
    examples: ["wake up → woke up", "eat → ate", "leave → left"],
    goal: "Speak for 30+ seconds.",
    goalEs: "Habla 30 segundos o más.",
    cta: "START REP 1",
  },
  lines: [
    l("m3d1-1", "Yesterday, I woke up | at six thirty.", "Ayer me desperté a las seis y media."),
    l("m3d1-2", "I was | a little tired.", "Estaba un poco cansado."),
    l("m3d1-3", "I got out of bed | and took a shower.", "Me levanté de la cama y me bañé."),
    l("m3d1-4", "I got dressed | for work.", "Me vestí para el trabajo."),
    l("m3d1-5", "I ate breakfast | at home.", "Desayuné en casa."),
    l("m3d1-6", "I drank some coffee | before work.", "Tomé café antes del trabajo."),
    l("m3d1-7", "I left home | around seven thirty.", "Salí de casa como a las siete y media."),
    l("m3d1-8", "Overall, | I had a good morning.", "En general, tuve una buena mañana."),
  ],
  prompts: [
    p("m3d1-p1", "What time did you wake up?", "¿A qué hora te despertaste?", "Yesterday, I woke up…", "Ayer me desperté…", "WHEN"),
    p("m3d1-p3", "What did you do after you woke up?", "¿Qué hiciste después de despertarte?", "I got up and…", "Me levanté y…", "WHAT"),
    p("m3d1-p5", "What did you eat and drink?", "¿Qué comiste y tomaste?", "I ate… I drank…", "Comí… Tomé…", "WHAT"),
    p("m3d1-p7", "What time did you leave home?", "¿A qué hora saliste de casa?", "I left…", "Yo salí…", "WHEN"),
    p("m3d1-p8", "How was your morning?", "¿Cómo estuvo tu mañana?", "Overall…", "En general…", "HOW"),
  ],
  cues: ["WOKE UP", "SHOWER", "ATE", "DRANK", "LEFT", "OVERALL"],
  verbCards: [
    vc("wake", wakeUp, "A woman waking up in bed", "WAKE UP", "WOKE UP", "Yesterday, I woke up early.", "despertarse → me desperté"),
    vc("getup", getUp, "A man getting out of bed", "GET UP", "GOT UP", "I got out of bed at six thirty.", "levantarse → me levanté"),
    vc("shower", shower, "A person taking a shower", "TAKE A SHOWER", "TOOK A SHOWER", "I took a shower before work.", "bañarse → me bañé"),
    vc("dress", getDressed, "A man getting dressed", "GET DRESSED", "GOT DRESSED", "I got dressed for work.", "vestirse → me vestí"),
    vc("eat", eat, "A man eating breakfast", "EAT", "ATE", "I ate breakfast at home.", "comer → comí"),
    vc("drink", drink, "A man drinking coffee", "DRINK", "DRANK", "I drank some coffee.", "tomar → tomé"),
    vc("leave", leave, "A person leaving home", "LEAVE", "LEFT", "I left home around seven thirty.", "salir → salí"),
  ],
  rep5Prompt: {
    question: "Tell me about your morning yesterday.",
    questionEs: "Cuéntame sobre tu mañana de ayer.",
  },
  rep5Tips: {
    en: "Use the past: woke up, took, ate, drank, left. Connect ideas with then, after that and later.",
    es: "Usa el pasado: woke up, took, ate, drank, left. Conecta ideas con then, after that y later.",
  },
});

const d2 = makeDay({
  day: 2,
  week: 1,
  topic: "At Work Yesterday",
  topicEs: "En el trabajo ayer",
  intro: {
    title: "REGULAR PAST VERBS",
    titleEs: "VERBOS REGULARES EN PASADO",
    lead: "Many work verbs just add -ED.",
    leadEs: "Muchos verbos del trabajo solo agregan -ED.",
    examples: ["talk → talked", "help → helped", "finish → finished"],
    goal: "Speak for 30+ seconds.",
    goalEs: "Habla 30 segundos o más.",
    cta: "START REP 1",
  },
  lines: [
    l("m3d2-1", "I arrived at work | around eight.", "Llegué al trabajo como a las ocho."),
    l("m3d2-2", "I started my day | with a meeting.", "Empecé mi día con una reunión."),
    l("m3d2-3", "I talked | to several customers.", "Hablé con varios clientes."),
    l("m3d2-4", "I answered emails | during the morning.", "Respondí correos durante la mañana."),
    l("m3d2-5", "I helped a customer | with a problem.", "Ayudé a un cliente con un problema."),
    l("m3d2-6", "I had lunch | with my coworkers.", "Almorcé con mis compañeros."),
    l("m3d2-7", "I finished work | around five.", "Terminé de trabajar como a las cinco."),
    l("m3d2-8", "Overall, | it was a busy day.", "En general, fue un día ocupado."),
  ],
  prompts: [
    p("m3d2-p1", "What time did you arrive?", "¿A qué hora llegaste?", "I arrived…", "Yo llegué…", "WHEN"),
    p("m3d2-p3", "Who did you talk to, and how did you help someone?", "¿Con quién hablaste y a quién ayudaste?", "I talked to… I helped…", "Hablé con… Ayudé a…", "WHO"),
    p("m3d2-p6", "Who did you have lunch with?", "¿Con quién almorzaste?", "I had lunch with…", "Almorcé con…", "WHO"),
    p("m3d2-p7", "What time did you finish?", "¿A qué hora terminaste?", "I finished…", "Terminé…", "WHEN"),
    p("m3d2-p8", "How was your day?", "¿Cómo estuvo tu día?", "Overall…", "En general…", "HOW"),
  ],
  cues: ["ARRIVED", "MEETING", "TALKED", "HELPED", "LUNCH", "FINISHED"],
  verbCards: [
    vc("arrive", arrive, "A man arriving at the office", "ARRIVE", "ARRIVED", "I arrived at work around eight.", "llegar → llegué"),
    vc("start", meeting, "A small team meeting", "START", "STARTED", "I started my day with a meeting.", "empezar → empecé"),
    vc("talk", talk, "An agent talking to a customer", "TALK", "TALKED", "I talked to several customers.", "hablar → hablé"),
    vc("answer", answerEmails, "A man answering emails", "ANSWER", "ANSWERED", "I answered emails during the morning.", "responder → respondí"),
    vc("help", help, "An employee helping a customer", "HELP", "HELPED", "I helped a customer with a problem.", "ayudar → ayudé"),
    vc("have", lunch, "Coworkers having lunch", "HAVE", "HAD", "I had lunch with my coworkers.", "tener / tomar → tuve"),
    vc("finish", finish, "A person finishing work", "FINISH", "FINISHED", "I finished work around five.", "terminar → terminé"),
  ],
  rep5Prompt: {
    question: "Tell me about your day at work or school yesterday.",
    questionEs: "Cuéntame sobre tu día de trabajo o escuela ayer.",
  },
});

const d3 = makeDay({
  day: 3,
  week: 1,
  topic: "After Work Yesterday",
  topicEs: "Después del trabajo ayer",
  intro: {
    title: "MY EVENING",
    titleEs: "MI NOCHE",
    lead: "Now talk about the second part of your day.",
    leadEs: "Ahora habla de la segunda parte de tu día.",
    examples: ["go → went", "watch → watched", "do → did"],
    goal: "Speak for 30+ seconds.",
    goalEs: "Habla 30 segundos o más.",
    cta: "START REP 1",
  },
  lines: [
    l("m3d3-1", "I left work | around five.", "Salí del trabajo como a las cinco."),
    l("m3d3-2", "I went home | after work.", "Me fui a casa después del trabajo."),
    l("m3d3-3", "I ate dinner | at home.", "Cené en casa."),
    l("m3d3-4", "I watched | some TV.", "Vi un poco de televisión."),
    l("m3d3-5", "I talked to a friend | on the phone.", "Hablé con un amigo por teléfono."),
    l("m3d3-6", "I did a few things | around the house.", "Hice algunas cosas en la casa."),
    l("m3d3-7", "I went to bed | around ten thirty.", "Me acosté como a las diez y media."),
    l("m3d3-8", "Overall, | I had a relaxing evening.", "En general, tuve una noche relajada."),
  ],
  prompts: [
    p("m3d3-p1", "What time did you leave work?", "¿A qué hora saliste del trabajo?", "I left…", "Yo salí…", "WHEN"),
    p("m3d3-p2", "Where did you go, and what did you eat?", "¿A dónde fuiste y qué comiste?", "I went… I ate…", "Fui… Comí…", "WHERE"),
    p("m3d3-p6", "What did you do at home in the evening?", "¿Qué hiciste en casa en la noche?", "I watched… I did…", "Vi… Hice…", "WHAT"),
    p("m3d3-p7", "What time did you go to bed?", "¿A qué hora te acostaste?", "I went to bed…", "Me acosté…", "WHEN"),
    p("m3d3-p8", "How was your evening?", "¿Cómo estuvo tu noche?", "Overall…", "En general…", "HOW"),
  ],
  cues: ["LEFT", "WENT", "ATE", "WATCHED", "TALKED", "WENT TO BED"],
  verbCards: [
    vc("leave", leave, "A person leaving", "LEAVE", "LEFT", "I left work around five.", "salir → salí"),
    vc("go", goHome, "A man walking home", "GO", "WENT", "I went home after work.", "ir → fui"),
    vc("eat", eat, "A man eating", "EAT", "ATE", "I ate dinner at home.", "comer / cenar → cené"),
    vc("watch", watchTv, "A person watching TV", "WATCH", "WATCHED", "I watched some TV.", "ver → vi"),
    vc("talk", phoneCall, "A man talking on the phone", "TALK", "TALKED", "I talked to a friend on the phone.", "hablar → hablé"),
    vc("do", housework, "A person cleaning the kitchen", "DO", "DID", "I did a few things around the house.", "hacer → hice"),
    vc("bed", goToBed, "A person going to bed", "GO TO BED", "WENT TO BED", "I went to bed around ten thirty.", "acostarse → me acosté"),
  ],
  rep5Prompt: {
    question: "What did you do after work yesterday?",
    questionEs: "¿Qué hiciste ayer después del trabajo?",
  },
});

const d4 = makeDay({
  day: 4,
  week: 1,
  topic: "How Was Your Day?",
  topicEs: "¿Cómo estuvo tu día?",
  intro: {
    title: "WAS / WERE",
    titleEs: "WAS / WERE",
    lead: "I was. He was. She was. We were. They were.",
    leadEs: "I was. He was. She was. We were. They were.",
    examples: ["I was tired.", "The office was full.", "They were busy."],
    goal: "Speak for 30+ seconds.",
    goalEs: "Habla 30 segundos o más.",
    cta: "START REP 1",
  },
  lines: [
    l("m3d4-1", "Yesterday | was a busy day.", "Ayer fue un día ocupado."),
    l("m3d4-2", "I was tired | in the morning.", "Estaba cansado en la mañana."),
    l("m3d4-3", "My coworkers | were very busy too.", "Mis compañeros también estaban muy ocupados."),
    l("m3d4-4", "The office | was full of people.", "La oficina estaba llena de gente."),
    l("m3d4-5", "We were in a meeting | in the morning.", "Estuvimos en una reunión en la mañana."),
    l("m3d4-6", "My afternoon | was much quieter.", "Mi tarde estuvo mucho más tranquila."),
    l("m3d4-7", "I was happy | when I finished work.", "Estaba feliz cuando terminé de trabajar."),
    l("m3d4-8", "Overall, | it was a good day.", "En general, fue un buen día."),
  ],
  prompts: [
    p("m3d4-p2", "How were you and your coworkers in the morning?", "¿Cómo estaban tú y tus compañeros en la mañana?", "I was… They were…", "Yo estaba… Ellos estaban…", "HOW"),
    p("m3d4-p5", "Where were you in the morning?", "¿Dónde estabas en la mañana?", "We were…", "Nosotros estábamos…", "WHERE"),
    p("m3d4-p7", "When were you happy?", "¿Cuándo estuviste feliz?", "I was happy when…", "Estaba feliz cuando…", "WHEN"),
    p("m3d4-p8", "How was your day overall?", "¿Cómo estuvo tu día en general?", "Overall…", "En general…", "HOW"),
  ],
  cues: ["I WAS", "HE / SHE WAS", "WE WERE", "THEY WERE", "OVERALL"],
  verbCards: [
    vc("tired", tired, "A tired employee yawning at a desk", "I AM TIRED", "I WAS TIRED", "I was tired in the morning.", "estar cansado → estaba cansado"),
    vc("busy", meeting, "Busy coworkers in a meeting", "THEY ARE BUSY", "THEY WERE BUSY", "My coworkers were very busy too.", "estar ocupados → estaban ocupados"),
    vc("office", answerEmails, "A quiet office desk", "IT IS QUIET", "IT WAS QUIET", "My afternoon was much quieter.", "estar tranquilo → estaba tranquilo"),
    vc("happy", happy, "A happy employee in the office", "I AM HAPPY", "I WAS HAPPY", "I was happy when I finished work.", "estar feliz → estaba feliz"),
  ],
  rep5Prompt: {
    question: "How was your day yesterday?",
    questionEs: "¿Cómo estuvo tu día ayer?",
  },
  rep5Tips: {
    en: "Use was and were: I was… / it was… / they were… Add why with because.",
    es: "Usa was y were: I was… / it was… / they were… Agrega el porqué con because.",
  },
});

const d5 = makeDay({
  day: 5,
  week: 1,
  topic: "My Yesterday Challenge",
  topicEs: "Mi reto de ayer",
  intro: {
    title: "WEEK 1 CHALLENGE",
    titleEs: "RETO DE LA SEMANA 1",
    lead: "Put the whole day together: morning, work, evening.",
    leadEs: "Junta todo el día: mañana, trabajo, noche.",
    examples: ["First…", "Then…", "After that…"],
    goal: "Speak for 30+ seconds.",
    goalEs: "Habla 30 segundos o más.",
    cta: "START REP 1",
  },
  lines: [
    l("m3d5-1", "Yesterday | was a normal day for me.", "Ayer fue un día normal para mí."),
    l("m3d5-2", "I woke up early | and took a shower.", "Me desperté temprano y me bañé."),
    l("m3d5-3", "I ate breakfast | and drank some coffee.", "Desayuné y tomé café."),
    l("m3d5-4", "Then, I went to work | and talked to a lot of people.", "Luego fui al trabajo y hablé con mucha gente."),
    l("m3d5-5", "My coworkers | were very busy.", "Mis compañeros estaban muy ocupados."),
    l("m3d5-6", "After work, | I came home and made dinner.", "Después del trabajo, llegué a casa e hice la cena."),
    l("m3d5-7", "Later, I watched TV | and went to bed.", "Más tarde vi televisión y me acosté."),
    l("m3d5-8", "Overall, | it was a good day.", "En general, fue un buen día."),
  ],
  prompts: [
    p("m3d5-p1", "What did you do first yesterday morning?", "¿Qué hiciste primero ayer en la mañana?", "Yesterday, I…", "Ayer yo…", "WHAT"),
    p("m3d5-p3", "Where did you go for work, and who did you talk to?", "¿A dónde fuiste a trabajar y con quién hablaste?", "Then, I went… I talked to…", "Luego fui… Hablé con…", "WHERE"),
    p("m3d5-p6", "What did you do after work?", "¿Qué hiciste después del trabajo?", "After work, I…", "Después del trabajo, yo…", "WHAT"),
    p("m3d5-p8", "How was the day overall?", "¿Cómo estuvo el día en general?", "Overall…", "En general…", "HOW"),
  ],
  cues: ["MORNING", "BREAKFAST", "WORK", "PEOPLE", "AFTER WORK", "EVENING", "WAS / WERE", "OVERALL"],
  verbCards: [
    vc("wake", wakeUp, "Waking up", "WAKE UP", "WOKE UP", "I woke up early.", "despertarse → me desperté"),
    vc("eat", eat, "Eating breakfast", "EAT", "ATE", "I ate breakfast.", "comer → comí"),
    vc("arrive", arrive, "Arriving at work", "GO", "WENT", "I went to work.", "ir → fui"),
    vc("lunch", lunch, "Lunch with coworkers", "HAVE", "HAD", "I had lunch with my coworkers.", "tener → tuve"),
    vc("home", comeHome, "Coming home", "COME", "CAME", "I came home after work.", "venir / llegar → llegué"),
    vc("tv", watchTv, "Watching TV", "WATCH", "WATCHED", "I watched TV.", "ver → vi"),
  ],
  rep5Prompt: {
    question: "Tell me about your day yesterday.",
    questionEs: "Cuéntame sobre tu día de ayer.",
  },
  rep5Tips: {
    en: "Morning → work → after work → evening. Use then, after that and later. Aim for 8 sentences.",
    es: "Mañana → trabajo → después del trabajo → noche. Usa then, after that y later. Intenta 8 oraciones.",
  },
});

/* =========================== WEEK 2 — OTHER PEOPLE =========================== */

const d6 = makeDay({
  day: 6,
  week: 2,
  topic: "My Mom Yesterday",
  topicEs: "Mi mamá ayer",
  intro: {
    title: "HE / SHE + PAST",
    titleEs: "HE / SHE + PASADO",
    lead: "Past verbs do not change: I went. She went. He went.",
    leadEs: "El verbo en pasado no cambia: I went. She went. He went.",
    examples: ["She woke up early.", "She went to work.", "She didn't eat lunch."],
    goal: "Speak for 30+ seconds.",
    goalEs: "Habla 30 segundos o más.",
    cta: "START REP 1",
  },
  lines: [
    l("m3d6-1", "My mom woke up early | yesterday.", "Mi mamá se despertó temprano ayer."),
    l("m3d6-2", "She was very busy | in the morning.", "Ella estaba muy ocupada en la mañana."),
    l("m3d6-3", "She made breakfast | at home.", "Ella hizo el desayuno en casa."),
    l("m3d6-4", "She went to work | around eight.", "Ella se fue al trabajo como a las ocho."),
    l("m3d6-5", "She talked to several people | during the day.", "Ella habló con varias personas durante el día."),
    l("m3d6-6", "She didn't eat lunch | at home.", "Ella no almorzó en casa."),
    l("m3d6-7", "She came home | in the afternoon.", "Ella llegó a casa en la tarde."),
    l("m3d6-8", "Overall, | she had a busy day.", "En general, ella tuvo un día ocupado."),
  ],
  prompts: [
    p("m3d6-p1", "What time did this person wake up?", "¿A qué hora se despertó esta persona?", "She / He woke up…", "Ella / Él se despertó…", "WHEN"),
    p("m3d6-p4", "Where did this person go, and who did they talk to?", "¿A dónde fue y con quién habló?", "She / He went… and talked to…", "Ella / Él fue… y habló con…", "WHERE"),
    p("m3d6-p6", "What did this person NOT do?", "¿Qué NO hizo?", "She / He didn't…", "Ella / Él no…", "WHAT"),
    p("m3d6-p8", "How was the day for this person?", "¿Cómo estuvo su día?", "Overall…", "En general…", "HOW"),
  ],
  cues: ["WOKE", "MADE", "WENT", "TALKED", "DIDN'T EAT", "CAME"],
  variants: [
    { id: "mom", label: "Mom", labelEs: "Mamá" },
    { id: "dad", label: "Dad", labelEs: "Papá" },
    { id: "brother", label: "Brother", labelEs: "Hermano" },
    { id: "sister", label: "Sister", labelEs: "Hermana" },
    { id: "friend", label: "Friend", labelEs: "Amigo/a" },
    { id: "coworker", label: "Coworker", labelEs: "Compañero/a" },
  ],
  verbCards: [
    vc("wake", wakeUp, "Waking up", "WAKE", "WOKE", "She woke up early yesterday.", "despertarse → se despertó"),
    vc("make", makeBreakfast, "A woman making breakfast", "MAKE", "MADE", "She made breakfast at home.", "hacer → hizo"),
    vc("go", arrive, "Going to work", "GO", "WENT", "She went to work around eight.", "ir → fue"),
    vc("talk", talk, "Talking to people", "TALK", "TALKED", "She talked to several people.", "hablar → habló"),
    vc(
      "eat",
      lunch,
      "Lunch at a table",
      "EAT",
      "ATE",
      "She ate lunch at home.",
      "comer → comió",
      { sentence: "She didn't eat lunch at home.", es: "Ella no almorzó en casa." },
    ),
    vc("come", comeHome, "Coming home", "COME", "CAME", "She came home in the afternoon.", "venir → vino / llegó"),
  ],
  rep5Prompt: {
    question: "What did your mom (or another person) do yesterday?",
    questionEs: "¿Qué hizo tu mamá (u otra persona) ayer?",
  },
});

const d7 = makeDay({
  day: 7,
  week: 2,
  topic: "My Friend's Day",
  topicEs: "El día de mi amigo",
  intro: {
    title: "HE / SHE + IRREGULAR PAST",
    titleEs: "HE / SHE + PASADO IRREGULAR",
    lead: "Same verbs, different person.",
    leadEs: "Los mismos verbos, otra persona.",
    examples: ["meet → met", "buy → bought", "see → saw"],
    goal: "Speak for 30+ seconds.",
    goalEs: "Habla 30 segundos o más.",
    cta: "START REP 1",
  },
  lines: [
    l("m3d7-1", "My friend went to the mall | yesterday.", "Mi amigo fue al centro comercial ayer."),
    l("m3d7-2", "He met some friends | there.", "Él se encontró con unos amigos allí."),
    l("m3d7-3", "They ate lunch | together.", "Ellos almorzaron juntos."),
    l("m3d7-4", "He bought | a new shirt.", "Él compró una camisa nueva."),
    l("m3d7-5", "He saw a movie | in the afternoon.", "Él vio una película en la tarde."),
    l("m3d7-6", "He didn't stay | very late.", "Él no se quedó hasta muy tarde."),
    l("m3d7-7", "He came home | around seven.", "Él llegó a casa como a las siete."),
    l("m3d7-8", "Overall, | he had a great day.", "En general, él tuvo un gran día."),
  ],
  prompts: [
    p("m3d7-p1", "Where did your friend go, and who did they meet?", "¿A dónde fue tu amigo y con quién se encontró?", "He / She went… and met…", "Él / Ella fue… y se encontró con…", "WHERE"),
    p("m3d7-p4", "What did your friend buy or see?", "¿Qué compró o vio?", "He / She bought / saw…", "Él / Ella compró / vio…", "WHAT"),
    p("m3d7-p6", "What did your friend NOT do?", "¿Qué NO hizo?", "He / She didn't…", "Él / Ella no…", "WHAT"),
    p("m3d7-p7", "What time did your friend come home?", "¿A qué hora llegó a casa?", "He / She came home…", "Él / Ella llegó a casa…", "WHEN"),
    p("m3d7-p8", "How was the day?", "¿Cómo estuvo el día?", "Overall…", "En general…", "HOW"),
  ],
  cues: ["WENT", "MET", "ATE", "BOUGHT", "SAW", "DIDN'T STAY", "CAME"],
  verbCards: [
    vc("go", mall, "A person at the mall", "GO", "WENT", "My friend went to the mall.", "ir → fue"),
    vc("meet", meet, "Two friends meeting", "MEET", "MET", "He met some friends there.", "encontrarse → se encontró"),
    vc("eat", lunch, "Friends eating lunch", "EAT", "ATE", "They ate lunch together.", "comer → comieron"),
    vc("buy", buy, "A man buying a shirt", "BUY", "BOUGHT", "He bought a new shirt.", "comprar → compró"),
    vc("see", movie, "People watching a movie", "SEE", "SAW", "He saw a movie in the afternoon.", "ver → vio"),
    vc(
      "stay",
      mall,
      "A person at the mall",
      "STAY",
      "STAYED",
      "He stayed at the mall.",
      "quedarse → se quedó",
      { sentence: "He didn't stay very late.", es: "Él no se quedó hasta muy tarde." },
    ),
    vc("come", comeHome, "Coming home", "COME", "CAME", "He came home around seven.", "venir → vino / llegó"),
  ],
  rep5Prompt: {
    question: "Tell me about a friend's day yesterday.",
    questionEs: "Cuéntame sobre el día de un amigo ayer.",
  },
});

const d8 = makeDay({
  day: 8,
  week: 2,
  topic: "What Didn't Happen?",
  topicEs: "¿Qué no pasó?",
  intro: {
    title: "DIDN'T + BASE VERB",
    titleEs: "DIDN'T + VERBO BASE",
    lead: "After DIDN'T the verb goes back to the base form.",
    leadEs: "Después de DIDN'T el verbo vuelve a su forma base.",
    examples: ["went → didn't go", "ate → didn't eat", "watched → didn't watch"],
    goal: "Speak for 30+ seconds.",
    goalEs: "Habla 30 segundos o más.",
    cta: "START REP 1",
  },
  lines: [
    l("m3d8-1", "Yesterday, | I went to work early.", "Ayer fui al trabajo temprano."),
    l("m3d8-2", "I didn't go | to the gym.", "No fui al gimnasio."),
    l("m3d8-3", "I ate breakfast, | but I didn't eat lunch.", "Desayuné, pero no almorcé."),
    l("m3d8-4", "My sister worked | in the morning.", "Mi hermana trabajó en la mañana."),
    l("m3d8-5", "She didn't work | in the afternoon.", "Ella no trabajó en la tarde."),
    l("m3d8-6", "We watched a movie | at home.", "Vimos una película en casa."),
    l("m3d8-7", "We didn't watch | the news.", "No vimos las noticias."),
    l("m3d8-8", "Overall, | it was a quiet day.", "En general, fue un día tranquilo."),
  ],
  prompts: [
    p("m3d8-p1", "Where did you go, and where didn't you go?", "¿A dónde fuiste y a dónde NO fuiste?", "I went… I didn't go…", "Fui… No fui…", "WHERE"),
    p("m3d8-p3", "What did you eat, and what didn't you eat?", "¿Qué comiste y qué NO comiste?", "I ate… I didn't eat…", "Comí… No comí…", "WHAT"),
    p("m3d8-p5", "Who worked yesterday, and who didn't?", "¿Quién trabajó ayer y quién no?", "My… worked… He / She didn't…", "Mi… trabajó… Él / Ella no…", "WHO"),
    p("m3d8-p8", "What didn't you do yesterday?", "¿Qué NO hiciste ayer?", "I didn't…", "Yo no…", "WHAT"),
  ],
  cues: ["WENT / DIDN'T GO", "ATE / DIDN'T EAT", "WORKED / DIDN'T WORK", "WATCHED / DIDN'T WATCH"],
  verbCards: [
    vc(
      "go",
      arrive,
      "A woman going to work",
      "GO",
      "WENT",
      "She went to work.",
      "ir → fue",
      { sentence: "She didn't go to work.", es: "Ella no fue al trabajo." },
    ),
    vc(
      "eat",
      eat,
      "Eating a meal",
      "EAT",
      "ATE",
      "I ate lunch.",
      "comer → comí",
      { sentence: "I didn't eat lunch.", es: "No almorcé." },
    ),
    vc(
      "work",
      answerEmails,
      "Working at a desk",
      "WORK",
      "WORKED",
      "She worked in the morning.",
      "trabajar → trabajó",
      { sentence: "She didn't work in the afternoon.", es: "Ella no trabajó en la tarde." },
    ),
    vc(
      "watch",
      watchTv,
      "Watching TV",
      "WATCH",
      "WATCHED",
      "We watched a movie.",
      "ver → vimos",
      { sentence: "We didn't watch the news.", es: "No vimos las noticias." },
    ),
  ],
  rep5Prompt: {
    question: "What did you do yesterday, and what didn't you do?",
    questionEs: "¿Qué hiciste ayer y qué NO hiciste?",
  },
  rep5Tips: {
    en: "Mix positives and negatives: I went… but I didn't go… Remember: didn't + base verb.",
    es: "Mezcla positivo y negativo: I went… but I didn't go… Recuerda: didn't + verbo base.",
  },
});

const d9 = makeDay({
  day: 9,
  week: 2,
  topic: "Did You…?",
  topicEs: "¿Did you…?",
  intro: {
    title: "PAST QUESTIONS",
    titleEs: "PREGUNTAS EN PASADO",
    lead: "Ask with DID + base verb. Answer with the past verb.",
    leadEs: "Pregunta con DID + verbo base. Responde con el verbo en pasado.",
    examples: ["Did you work?", "Where did you go?", "What did he eat?"],
    goal: "Speak for 30+ seconds.",
    goalEs: "Habla 30 segundos o más.",
    cta: "START REP 1",
  },
  lines: [
    l("m3d9-1", "Did you work yesterday? | Yes, I did. | I worked in the morning.", "¿Trabajaste ayer? Sí. Trabajé en la mañana."),
    l("m3d9-2", "Did you eat breakfast? | Yes, I did. | I ate breakfast at home.", "¿Desayunaste? Sí. Desayuné en casa."),
    l("m3d9-3", "Where did you go after work? | I went home.", "¿A dónde fuiste después del trabajo? Fui a casa."),
    l("m3d9-4", "What did you do at night? | I watched TV.", "¿Qué hiciste en la noche? Vi televisión."),
    l("m3d9-5", "Did your sister work yesterday? | No, she didn't.", "¿Tu hermana trabajó ayer? No."),
    l("m3d9-6", "Where did she go? | She went to the mall.", "¿A dónde fue ella? Fue al centro comercial."),
    l("m3d9-7", "What did your friend eat? | He ate pizza.", "¿Qué comió tu amigo? Comió pizza."),
    l("m3d9-8", "Did he come home late? | No, he didn't.", "¿Llegó tarde a casa? No."),
  ],
  prompts: [
    p("m3d9-p3", "Where did you go after work, and what did you do at night?", "¿A dónde fuiste después del trabajo y qué hiciste en la noche?", "I went… I watched…", "Fui… Vi…", "WHERE"),
    p("m3d9-p6", "Where did someone in your family go yesterday?", "¿A dónde fue alguien de tu familia ayer?", "He / She went…", "Él / Ella fue…", "WHERE"),
    p("m3d9-p7", "What did your friend eat?", "¿Qué comió tu amigo?", "He / She ate…", "Él / Ella comió…", "WHAT"),
    p("m3d9-p8", "Now ASK a question using DID.", "Ahora HAZ una pregunta usando DID.", "Did you…?", "¿Did you…?", "TELL ME"),
  ],
  cues: ["DID YOU…?", "WHERE DID…?", "WHAT DID…?", "YES, I DID", "NO, SHE DIDN'T"],
  verbCards: [
    vc("work", answerEmails, "Working at a desk", "WORK", "WORKED", "Did you work yesterday?", "trabajar → trabajaste"),
    vc("eat", eat, "Breakfast", "EAT", "ATE", "Did you eat breakfast?", "comer → comiste"),
    vc("go", goHome, "Going home", "GO", "WENT", "Where did you go after work?", "ir → fuiste"),
    vc("watch", watchTv, "Watching TV", "WATCH", "WATCHED", "What did you do at night?", "ver → viste"),
    vc("mall", mall, "At the mall", "GO", "WENT", "Where did she go?", "ir → fue"),
    vc("come", comeHome, "Coming home", "COME", "CAME", "Did he come home late?", "venir → vino"),
  ],
  rep5Prompt: {
    question: "Answer: Did you work yesterday? Where did you go? What did you do at night?",
    questionEs: "Responde: ¿Trabajaste ayer? ¿A dónde fuiste? ¿Qué hiciste en la noche?",
  },
  rep5Tips: {
    en: "Answer each question with a full sentence, then ask one question with DID.",
    es: "Responde cada pregunta con una oración completa y luego haz una pregunta con DID.",
  },
});

const d10 = makeDay({
  day: 10,
  week: 2,
  topic: "Simple Past Challenge",
  topicEs: "Reto de pasado simple",
  intro: {
    title: "WEEK 2 CHALLENGE",
    titleEs: "RETO DE LA SEMANA 2",
    lead: "You, another person, DID and DIDN'T — all together.",
    leadEs: "Tú, otra persona, DID y DIDN'T — todo junto.",
    examples: ["I went…", "She didn't go…", "Did you…?"],
    goal: "Speak for 30+ seconds.",
    goalEs: "Habla 30 segundos o más.",
    cta: "START REP 1",
  },
  lines: [
    l("m3d10-1", "Yesterday, I woke up early | and went to work.", "Ayer me desperté temprano y fui al trabajo."),
    l("m3d10-2", "I was busy, | but the day was good.", "Estaba ocupado, pero el día estuvo bien."),
    l("m3d10-3", "My friend didn't work | yesterday.", "Mi amigo no trabajó ayer."),
    l("m3d10-4", "He went to the mall | and bought a new shirt.", "Él fue al centro comercial y compró una camisa nueva."),
    l("m3d10-5", "My sister made dinner | for the family.", "Mi hermana hizo la cena para la familia."),
    l("m3d10-6", "We ate together | and talked for an hour.", "Comimos juntos y hablamos una hora."),
    l("m3d10-7", "Did you do something special? | I didn't, but I was happy.", "¿Hiciste algo especial? Yo no, pero estaba feliz."),
    l("m3d10-8", "Overall, | it was a good day for everyone.", "En general, fue un buen día para todos."),
  ],
  prompts: [
    p("m3d10-p1", "TELL ME ABOUT YESTERDAY.", "CUÉNTAME SOBRE AYER.", "Yesterday, I…", "Ayer yo…", "TELL ME"),
    p("m3d10-p3", "TELL ME ABOUT SOMEONE ELSE'S DAY.", "CUÉNTAME EL DÍA DE OTRA PERSONA.", "My… went / did…", "Mi… fue / hizo…", "TELL ME"),
    p("m3d10-p5", "What did that person buy, make, or NOT do?", "¿Qué compró, hizo, o NO hizo esa persona?", "He / She bought / made… / didn't…", "Él / Ella compró / hizo… / no…", "WHAT"),
    p("m3d10-p6", "What did you do together?", "¿Qué hicieron juntos?", "We…", "Nosotros…", "WHAT"),
    p("m3d10-p8", "ASK a DID question about yesterday.", "HAZ una pregunta con DID sobre ayer.", "Did you…?", "¿Did you…?", "TELL ME"),
  ],
  cues: ["I", "HE / SHE", "WAS / WERE", "DIDN'T", "DID…?", "OVERALL"],
  verbCards: [
    vc("wake", wakeUp, "Waking up", "WAKE UP", "WOKE UP", "I woke up early.", "despertarse → me desperté"),
    vc("mall", mall, "At the mall", "GO", "WENT", "He went to the mall.", "ir → fue"),
    vc("buy", buy, "Buying a shirt", "BUY", "BOUGHT", "He bought a new shirt.", "comprar → compró"),
    vc("make", makeBreakfast, "Making food", "MAKE", "MADE", "She made dinner.", "hacer → hizo"),
    vc("eat", lunch, "Eating together", "EAT", "ATE", "We ate together.", "comer → comimos"),
    vc("talk", phoneCall, "Talking", "TALK", "TALKED", "We talked for an hour.", "hablar → hablamos"),
  ],
  rep5Prompt: {
    question: "Tell me about yesterday: your day, another person's day, and answer DID questions.",
    questionEs: "Cuéntame sobre ayer: tu día, el día de otra persona y responde preguntas con DID.",
  },
});

/* ======================= WEEK 3 — PAST PROGRESSIVE ======================= */

const d11 = makeDay({
  day: 11,
  week: 3,
  topic: "At Home Last Night",
  topicEs: "En casa anoche",
  intro: {
    title: "WAS / WERE + -ING",
    titleEs: "WAS / WERE + -ING",
    lead: "Describe actions in progress in the past.",
    leadEs: "Describe acciones que estaban pasando en el pasado.",
    examples: ["She was cooking.", "They were eating.", "The dog was sleeping."],
    goal: "Speak for 30+ seconds.",
    goalEs: "Habla 30 segundos o más.",
    cta: "START REP 1",
  },
  sceneImage: {
    src: sceneHomeNight,
    alt: "A family at home in the evening doing different activities",
    altEs: "Una familia en casa por la noche haciendo diferentes actividades",
  },
  lines: [
    l("m3d11-1", "My mom | was cooking dinner.", "Mi mamá estaba cocinando la cena."),
    l("m3d11-2", "My dad | was watching TV.", "Mi papá estaba viendo televisión."),
    l("m3d11-3", "A child | was doing homework.", "Un niño estaba haciendo la tarea."),
    l("m3d11-4", "My sister | was talking on the phone.", "Mi hermana estaba hablando por teléfono."),
    l("m3d11-5", "The dog | was sleeping.", "El perro estaba durmiendo."),
    l("m3d11-6", "Someone | was cleaning the kitchen.", "Alguien estaba limpiando la cocina."),
    l("m3d11-7", "We | were eating dinner.", "Nosotros estábamos cenando."),
    l("m3d11-8", "Everyone | was doing something different.", "Todos estaban haciendo algo diferente."),
  ],
  prompts: [
    p("m3d11-p1", "What was the woman in the kitchen doing?", "¿Qué estaba haciendo la mujer en la cocina?", "She was…", "Ella estaba…", "WHAT"),
    p("m3d11-p4", "Who was talking on the phone?", "¿Quién estaba hablando por teléfono?", "She was…", "Ella estaba…", "WHO"),
    p("m3d11-p5", "What was the dog doing?", "¿Qué estaba haciendo el perro?", "The dog was…", "El perro estaba…", "WHAT"),
    p("m3d11-p8", "What was happening in the house overall?", "¿Qué estaba pasando en la casa en general?", "Everyone was…", "Todos estaban…", "WHAT"),
  ],
  cues: ["WAS COOKING", "WAS WATCHING", "WAS TALKING", "WERE EATING"],
  rep5Prompt: {
    question: "Describe what was happening at home.",
    questionEs: "Describe qué estaba pasando en casa.",
  },
  rep5Tips: {
    en: "Look at the picture. Use was / were + -ing for each person.",
    es: "Mira la imagen. Usa was / were + -ing para cada persona.",
  },
});

const d12 = makeDay({
  day: 12,
  week: 3,
  topic: "At the Office Yesterday",
  topicEs: "En la oficina ayer",
  intro: {
    title: "WHAT WAS HAPPENING?",
    titleEs: "¿QUÉ ESTABA PASANDO?",
    lead: "Look at the office and describe every action.",
    leadEs: "Mira la oficina y describe cada acción.",
    examples: ["He was typing.", "They were having a meeting.", "She was reading."],
    goal: "Speak for 30+ seconds.",
    goalEs: "Habla 30 segundos o más.",
    cta: "START REP 1",
  },
  sceneImage: {
    src: sceneOffice,
    alt: "People doing different activities in an office",
    altEs: "Personas haciendo diferentes actividades en una oficina",
  },
  lines: [
    l("m3d12-1", "A woman | was typing on her laptop.", "Una mujer estaba escribiendo en su laptop."),
    l("m3d12-2", "A man | was talking on the phone.", "Un hombre estaba hablando por teléfono."),
    l("m3d12-3", "Two people | were having a meeting.", "Dos personas estaban en una reunión."),
    l("m3d12-4", "Someone | was drinking coffee.", "Alguien estaba tomando café."),
    l("m3d12-5", "A coworker | was writing in a notebook.", "Un compañero estaba escribiendo en un cuaderno."),
    l("m3d12-6", "A man | was walking to another desk.", "Un hombre estaba caminando a otro escritorio."),
    l("m3d12-7", "A woman | was reading a document.", "Una mujer estaba leyendo un documento."),
    l("m3d12-8", "Everyone | was working on something.", "Todos estaban trabajando en algo."),
  ],
  prompts: [
    p("m3d12-p1", "What was the woman with the laptop doing?", "¿Qué estaba haciendo la mujer con la laptop?", "She was…", "Ella estaba…", "WHAT"),
    p("m3d12-p2", "Who was talking on the phone?", "¿Quién estaba hablando por teléfono?", "He was…", "Él estaba…", "WHO"),
    p("m3d12-p3", "What were the people at the table doing?", "¿Qué estaban haciendo las personas en la mesa?", "They were…", "Ellos estaban…", "WHAT"),
    p("m3d12-p5", "What was the coworker writing?", "¿Qué estaba escribiendo el compañero?", "He / She was…", "Él / Ella estaba…", "WHAT"),
    p("m3d12-p8", "What was happening in the office overall?", "¿Qué estaba pasando en la oficina en general?", "Everyone was…", "Todos estaban…", "WHAT"),
  ],
  cues: ["WAS TYPING", "WAS TALKING", "WERE MEETING", "WAS READING"],
  rep5Prompt: {
    question: "Describe what was happening at the office.",
    questionEs: "Describe qué estaba pasando en la oficina.",
  },
});

const d13 = makeDay({
  day: 13,
  week: 3,
  topic: "At the Park Yesterday",
  topicEs: "En el parque ayer",
  intro: {
    title: "PEOPLE IN ACTION",
    titleEs: "PERSONAS EN ACCIÓN",
    lead: "One picture, many actions.",
    leadEs: "Una imagen, muchas acciones.",
    examples: ["He was running.", "They were playing.", "She was reading."],
    goal: "Speak for 30+ seconds.",
    goalEs: "Habla 30 segundos o más.",
    cta: "START REP 1",
  },
  sceneImage: {
    src: scenePark,
    alt: "People doing different activities in a park",
    altEs: "Personas haciendo diferentes actividades en un parque",
  },
  lines: [
    l("m3d13-1", "A boy | was running on the grass.", "Un niño estaba corriendo en el césped."),
    l("m3d13-2", "Two children | were playing with a ball.", "Dos niños estaban jugando con una pelota."),
    l("m3d13-3", "A dog | was running near the path.", "Un perro estaba corriendo cerca del camino."),
    l("m3d13-4", "A man | was reading on a bench.", "Un hombre estaba leyendo en una banca."),
    l("m3d13-5", "Someone | was riding a bicycle.", "Alguien estaba andando en bicicleta."),
    l("m3d13-6", "Two people | were talking together.", "Dos personas estaban platicando."),
    l("m3d13-7", "A family | was eating outside.", "Una familia estaba comiendo afuera."),
    l("m3d13-8", "Everyone | was enjoying the afternoon.", "Todos estaban disfrutando la tarde."),
  ],
  prompts: [
    p("m3d13-p1", "What was the boy doing, and what were the children doing?", "¿Qué estaba haciendo el niño y qué hacían los niños?", "He was… They were…", "Él estaba… Ellos estaban…", "WHAT"),
    p("m3d13-p5", "Who was riding a bicycle, and who was talking?", "¿Quién andaba en bicicleta y quién platicaba?", "Someone was… Two people were…", "Alguien estaba… Dos personas estaban…", "WHO"),
    p("m3d13-p7", "What was the family doing?", "¿Qué estaba haciendo la familia?", "They were…", "Ellos estaban…", "WHAT"),
    p("m3d13-p8", "What was happening in the park overall?", "¿Qué estaba pasando en el parque en general?", "Everyone was…", "Todos estaban…", "WHAT"),
  ],
  cues: ["WAS RUNNING", "WERE PLAYING", "WAS READING", "WERE EATING"],
  rep5Prompt: {
    question: "Describe what was happening in the park.",
    questionEs: "Describe qué estaba pasando en el parque.",
  },
});

const d14 = makeDay({
  day: 14,
  week: 3,
  topic: "When Something Happened",
  topicEs: "Cuando algo pasó",
  intro: {
    title: "WAS -ING + WHEN",
    titleEs: "WAS -ING + WHEN",
    lead: "Long action in progress + short event.",
    leadEs: "Acción larga en progreso + evento corto.",
    examples: ["I was working when my friend called."],
    goal: "Speak for 30+ seconds.",
    goalEs: "Habla 30 segundos o más.",
    cta: "START REP 1",
  },
  sceneImage: {
    src: sceneWhen,
    alt: "A woman cooking, and then the phone ringing",
    altEs: "Una mujer cocinando y luego el teléfono sonando",
  },
  lines: [
    l("m3d14-1", "I was working | when my friend called.", "Estaba trabajando cuando mi amigo llamó."),
    l("m3d14-2", "She was cooking | when the phone rang.", "Ella estaba cocinando cuando sonó el teléfono."),
    l("m3d14-3", "They were playing | when it started to rain.", "Ellos estaban jugando cuando empezó a llover."),
    l("m3d14-4", "He was driving | when he saw an accident.", "Él estaba manejando cuando vio un accidente."),
    l("m3d14-5", "I was sleeping | when my alarm went off.", "Estaba durmiendo cuando sonó mi alarma."),
    l("m3d14-6", "We were eating dinner | when my mom arrived.", "Estábamos cenando cuando llegó mi mamá."),
    l("m3d14-7", "My sister was studying | when the lights went out.", "Mi hermana estaba estudiando cuando se fue la luz."),
    l("m3d14-8", "Everything happened | very fast.", "Todo pasó muy rápido."),
  ],
  prompts: [
    p("m3d14-p1", "What were you doing when someone called you?", "¿Qué estabas haciendo cuando alguien te llamó?", "I was… when…", "Yo estaba… cuando…", "WHILE"),
    p("m3d14-p3", "What were they doing when it started to rain?", "¿Qué estaban haciendo cuando empezó a llover?", "They were…", "Ellos estaban…", "WHILE"),
    p("m3d14-p5", "What were you doing when your alarm went off?", "¿Qué hacías cuando sonó tu alarma?", "I was sleeping when…", "Estaba durmiendo cuando…", "WHILE"),
    p("m3d14-p8", "How did it all happen?", "¿Cómo pasó todo?", "Everything happened…", "Todo pasó…", "HOW"),
  ],
  cues: ["WAS -ING", "WHEN", "SUDDENLY", "THEN"],
  rep5Prompt: {
    question: "Tell me something that happened while you were doing something else.",
    questionEs: "Cuéntame algo que pasó mientras hacías otra cosa.",
  },
  rep5Tips: {
    en: "Use the pattern: I was ___ing when ___ happened.",
    es: "Usa el patrón: I was ___ing when ___ happened.",
  },
});

const d15 = makeDay({
  day: 15,
  week: 3,
  topic: "What Was Happening?",
  topicEs: "¿Qué estaba pasando?",
  intro: {
    title: "PAST PROGRESSIVE CHALLENGE",
    titleEs: "RETO DE PASADO PROGRESIVO",
    lead: "Describe the scene, then say what happened.",
    leadEs: "Describe la escena y luego di qué pasó.",
    examples: ["People were walking.", "Suddenly, it started to rain."],
    goal: "Speak for 30+ seconds.",
    goalEs: "Habla 30 segundos o más.",
    cta: "START REP 1",
  },
  sceneImage: {
    src: sceneRain,
    alt: "A busy city street when it suddenly starts to rain",
    altEs: "Una calle concurrida cuando de repente empieza a llover",
  },
  lines: [
    l("m3d15-1", "People | were walking on the street.", "La gente estaba caminando en la calle."),
    l("m3d15-2", "A woman | was opening her umbrella.", "Una mujer estaba abriendo su paraguas."),
    l("m3d15-3", "A man | was waiting for the bus.", "Un hombre estaba esperando el autobús."),
    l("m3d15-4", "Two people | were talking near a store.", "Dos personas estaban platicando cerca de una tienda."),
    l("m3d15-5", "Someone | was riding a bicycle very fast.", "Alguien estaba andando en bicicleta muy rápido."),
    l("m3d15-6", "A dog | was running across the street.", "Un perro estaba cruzando la calle corriendo."),
    l("m3d15-7", "Suddenly, | it started to rain.", "De repente, empezó a llover."),
    l("m3d15-8", "Everyone | ran for cover.", "Todos corrieron a cubrirse."),
  ],
  prompts: [
    p("m3d15-p1", "What were the people and the woman doing?", "¿Qué hacía la gente y la mujer?", "They were… She was…", "Ellos estaban… Ella estaba…", "WHAT"),
    p("m3d15-p4", "Who was talking, and who was riding a bicycle?", "¿Quién platicaba y quién andaba en bicicleta?", "Two people were… He was…", "Dos personas estaban… Él estaba…", "WHO"),
    p("m3d15-p7", "What happened suddenly?", "¿Qué pasó de repente?", "Suddenly…", "De repente…", "WHAT NEXT"),
    p("m3d15-p8", "What did everyone do next?", "¿Qué hizo todo el mundo después?", "Everyone…", "Todos…", "WHAT NEXT"),
  ],
  cues: ["WERE WALKING", "WAS WAITING", "SUDDENLY", "IT STARTED TO RAIN"],
  rep5Prompt: {
    question: "Describe the scene and what happened.",
    questionEs: "Describe la escena y lo que pasó.",
  },
  rep5Tips: {
    en: "First: what people were doing. Then: what suddenly happened.",
    es: "Primero: qué estaban haciendo. Luego: qué pasó de repente.",
  },
});

/* ========================= WEEK 4 — STORYTELLING ========================= */

const STORY: StoryPanel[] = [
  panel("s1", story1, "Little Red Riding Hood at home with her mother", "ONE DAY", "Little Red Riding Hood lived with her family.", "Caperucita Roja vivía con su familia."),
  panel("s2", story2, "The mother gives the basket to the girl", "FIRST", "Her mother gave her a basket of food.", "Su mamá le dio una canasta de comida."),
  panel("s3", story3, "The girl walking through the forest", "THEN", "She walked through the forest.", "Ella caminó por el bosque."),
  panel("s4", story4, "The girl meets the wolf", "SUDDENLY", "She saw a wolf on the path.", "Vio un lobo en el camino."),
  panel("s5", story5, "The wolf running to the cottage", "AFTER THAT", "The wolf ran to grandmother's house.", "El lobo corrió a la casa de la abuela."),
  panel("s6", story6, "The wolf at grandmother's door", "WHILE", "The wolf arrived while the girl was walking.", "El lobo llegó mientras la niña caminaba."),
  panel("s7", story7, "The girl surprised in grandmother's room", "LATER", "She noticed something was strange.", "Ella notó que algo era extraño."),
  panel("s8", story8, "Happy ending with grandmother and the woodsman", "FINALLY", "A woodsman helped them and the wolf ran away.", "Un leñador las ayudó y el lobo se fue corriendo."),
];

function storySlice(from: number, to: number): StoryPanel[] {
  return STORY.slice(from, to);
}

const d16 = makeDay({
  day: 16,
  week: 4,
  topic: "The Characters & The Beginning",
  topicEs: "Los personajes y el inicio",
  intro: {
    title: "ONE DAY…",
    titleEs: "ONE DAY…",
    lead: "Start a story in English.",
    leadEs: "Empieza una historia en inglés.",
    examples: ["One day…", "First…", "Then…"],
    goal: "Speak for 30+ seconds.",
    goalEs: "Habla 30 segundos o más.",
    cta: "START REP 1",
  },
  storyPanels: storySlice(0, 3),
  lines: [
    l("m3d16-1", "Little Red Riding Hood | lived with her family.", "Caperucita Roja vivía con su familia."),
    l("m3d16-2", "Her grandmother | lived in another house.", "Su abuela vivía en otra casa."),
    l("m3d16-3", "One day, | her mother prepared some food.", "Un día, su mamá preparó comida."),
    l("m3d16-4", "She gave the food | to Little Red Riding Hood.", "Le dio la comida a Caperucita Roja."),
    l("m3d16-5", "Her mother asked her | to visit her grandmother.", "Su mamá le pidió que visitara a su abuela."),
    l("m3d16-6", "Little Red Riding Hood | took the food.", "Caperucita Roja tomó la comida."),
    l("m3d16-7", "She left | her house.", "Ella salió de su casa."),
    l("m3d16-8", "Then, she walked | toward the forest.", "Luego caminó hacia el bosque."),
  ],
  prompts: [
    p("m3d16-p1", "Who is the story about, and where did the grandmother live?", "¿De quién es la historia y dónde vivía la abuela?", "Little Red Riding Hood lived… Her grandmother lived…", "Caperucita Roja vivía… Su abuela vivía…", "WHO"),
    p("m3d16-p3", "What did the mother prepare and give her?", "¿Qué preparó y dio la mamá?", "One day, her mother… She gave…", "Un día, su mamá… Ella le dio…", "WHAT"),
    p("m3d16-p5", "What did the mother ask her to do?", "¿Qué le pidió la mamá que hiciera?", "Her mother asked her…", "Su mamá le pidió…", "WHAT"),
    p("m3d16-p7", "What did she do next?", "¿Qué hizo después?", "She took… and left…", "Ella tomó… y salió…", "WHAT NEXT"),
    p("m3d16-p8", "Where did she walk?", "¿Hacia dónde caminó?", "Then, she walked…", "Luego caminó…", "WHERE"),
  ],
  cues: ["ONE DAY", "FIRST", "THEN"],
  rep5Prompt: {
    question: "Tell the beginning of the story.",
    questionEs: "Cuenta el inicio de la historia.",
  },
});

const d17 = makeDay({
  day: 17,
  week: 4,
  topic: "The Journey",
  topicEs: "El camino",
  intro: {
    title: "FIRST · THEN · AFTER THAT",
    titleEs: "FIRST · THEN · AFTER THAT",
    lead: "Put the events in order.",
    leadEs: "Pon los eventos en orden.",
    examples: ["First…", "Then…", "After that…"],
    goal: "Speak for 30+ seconds.",
    goalEs: "Habla 30 segundos o más.",
    cta: "START REP 1",
  },
  storyPanels: storySlice(1, 4),
  lines: [
    l("m3d17-1", "First, | she left her house with the basket.", "Primero, salió de su casa con la canasta."),
    l("m3d17-2", "Then, | she walked into the forest.", "Luego, entró al bosque."),
    l("m3d17-3", "The forest | was quiet and green.", "El bosque estaba tranquilo y verde."),
    l("m3d17-4", "She was walking slowly | and looking at the flowers.", "Ella caminaba despacio y miraba las flores."),
    l("m3d17-5", "After that, | she stopped near some trees.", "Después de eso, se detuvo cerca de unos árboles."),
    l("m3d17-6", "She didn't walk fast, | because she wasn't in a hurry.", "No caminó rápido, porque no tenía prisa."),
    l("m3d17-7", "Later, | she continued on the path.", "Más tarde, siguió por el camino."),
    l("m3d17-8", "The house of her grandmother | was still far away.", "La casa de su abuela todavía estaba lejos."),
  ],
  prompts: [
    p("m3d17-p1", "FIRST — what happened?", "PRIMERO — ¿qué pasó?", "First, she…", "Primero, ella…", "WHAT"),
    p("m3d17-p3", "How was the forest, and what was she doing?", "¿Cómo estaba el bosque y qué hacía ella?", "The forest was… She was…", "El bosque estaba… Ella estaba…", "HOW"),
    p("m3d17-p5", "AFTER THAT — what happened, and what didn't she do?", "DESPUÉS DE ESO — ¿qué pasó y qué no hizo?", "After that, she… She didn't…", "Después de eso, ella… Ella no…", "WHAT NEXT"),
    p("m3d17-p7", "LATER — what happened?", "MÁS TARDE — ¿qué pasó?", "Later, she…", "Más tarde, ella…", "WHAT NEXT"),
    p("m3d17-p8", "Where was she going?", "¿A dónde iba?", "She was going…", "Ella iba…", "WHERE"),
  ],
  cues: ["FIRST", "THEN", "AFTER THAT", "LATER"],
  rep5Prompt: {
    question: "Tell the story of her journey to the forest.",
    questionEs: "Cuenta la historia de su camino al bosque.",
  },
});

const d18 = makeDay({
  day: 18,
  week: 4,
  topic: "The Wolf",
  topicEs: "El lobo",
  intro: {
    title: "SUDDENLY…",
    titleEs: "SUDDENLY…",
    lead: "Mix WAS -ING and the Simple Past in one story.",
    leadEs: "Mezcla WAS -ING y el pasado simple en una historia.",
    examples: ["She was walking when she saw a wolf."],
    goal: "Speak for 30+ seconds.",
    goalEs: "Habla 30 segundos o más.",
    cta: "START REP 1",
  },
  storyPanels: storySlice(2, 6),
  lines: [
    l("m3d18-1", "She was walking through the forest | when she saw a wolf.", "Ella caminaba por el bosque cuando vio un lobo."),
    l("m3d18-2", "The wolf | talked to her.", "El lobo le habló."),
    l("m3d18-3", "He asked | where she was going.", "Le preguntó a dónde iba."),
    l("m3d18-4", "She told him | about her grandmother.", "Ella le contó sobre su abuela."),
    l("m3d18-5", "The wolf | had an idea.", "El lobo tuvo una idea."),
    l("m3d18-6", "He said goodbye | and ran away.", "Se despidió y se fue corriendo."),
    l("m3d18-7", "While she was walking, | the wolf was running.", "Mientras ella caminaba, el lobo corría."),
    l("m3d18-8", "He arrived | at the house first.", "Él llegó primero a la casa."),
  ],
  prompts: [
    p("m3d18-p1", "What was she doing when she saw the wolf?", "¿Qué hacía cuando vio al lobo?", "She was walking when…", "Ella caminaba cuando…", "WHILE"),
    p("m3d18-p2", "What did the wolf do and ask?", "¿Qué hizo y preguntó el lobo?", "The wolf… He asked…", "El lobo… Él preguntó…", "WHAT"),
    p("m3d18-p4", "What did she tell him?", "¿Qué le contó ella?", "She told him…", "Ella le contó…", "WHAT"),
    p("m3d18-p7", "WHILE — what were they doing?", "WHILE — ¿qué estaban haciendo?", "While she was…, the wolf was…", "Mientras ella…, el lobo…", "WHILE"),
    p("m3d18-p8", "Who arrived first?", "¿Quién llegó primero?", "He arrived…", "Él llegó…", "WHO"),
  ],
  cues: ["WAS WALKING", "SUDDENLY", "WHILE", "THEN"],
  rep5Prompt: {
    question: "Tell the part of the story with the wolf.",
    questionEs: "Cuenta la parte de la historia con el lobo.",
  },
});

const d19 = makeDay({
  day: 19,
  week: 4,
  topic: "Grandmother's House",
  topicEs: "La casa de la abuela",
  intro: {
    title: "AFTER THAT · FINALLY",
    titleEs: "AFTER THAT · FINALLY",
    lead: "Finish the story with a simple ending.",
    leadEs: "Termina la historia con un final sencillo.",
    examples: ["After that…", "Finally…"],
    goal: "Speak for 30+ seconds.",
    goalEs: "Habla 30 segundos o más.",
    cta: "START REP 1",
  },
  storyPanels: storySlice(4, 8),
  lines: [
    l("m3d19-1", "The wolf arrived | at grandmother's house.", "El lobo llegó a la casa de la abuela."),
    l("m3d19-2", "He knocked | on the door.", "Tocó la puerta."),
    l("m3d19-3", "After that, | he went inside the house.", "Después de eso, entró a la casa."),
    l("m3d19-4", "Later, | Little Red Riding Hood arrived too.", "Más tarde, Caperucita Roja también llegó."),
    l("m3d19-5", "She was talking to her grandmother | when she noticed something strange.", "Estaba hablando con su abuela cuando notó algo extraño."),
    l("m3d19-6", "Suddenly, | she understood everything.", "De repente, entendió todo."),
    l("m3d19-7", "A woodsman | heard them and helped them.", "Un leñador las escuchó y las ayudó."),
    l("m3d19-8", "Finally, | the wolf ran away and everyone was safe.", "Finalmente, el lobo huyó y todos estaban a salvo."),
  ],
  prompts: [
    p("m3d19-p1", "Where did the wolf arrive, and what did he do at the door?", "¿A dónde llegó el lobo y qué hizo en la puerta?", "The wolf arrived… He knocked…", "El lobo llegó… Él tocó…", "WHERE"),
    p("m3d19-p3", "AFTER THAT — what happened, and who arrived later?", "DESPUÉS — ¿qué pasó y quién llegó más tarde?", "After that, he… Later, she…", "Después, él… Más tarde, ella…", "WHAT NEXT"),
    p("m3d19-p5", "What was she doing when she noticed something strange?", "¿Qué hacía cuando notó algo extraño?", "She was… when…", "Ella estaba… cuando…", "WHILE"),
    p("m3d19-p7", "Who helped them?", "¿Quién las ayudó?", "A woodsman…", "Un leñador…", "WHO"),
    p("m3d19-p8", "FINALLY — how did it end?", "FINALMENTE — ¿cómo terminó?", "Finally…", "Finalmente…", "HOW"),
  ],
  cues: ["AFTER THAT", "LATER", "SUDDENLY", "FINALLY"],
  rep5Prompt: {
    question: "Tell the end of the story.",
    questionEs: "Cuenta el final de la historia.",
  },
});

const d20 = makeDay({
  day: 20,
  week: 4,
  topic: "Tell the Story",
  topicEs: "Cuenta la historia",
  intro: {
    title: "FINAL STORYTELLING CHALLENGE",
    titleEs: "RETO FINAL DE NARRACIÓN",
    lead: "Look at the pictures and tell the whole story.",
    leadEs: "Mira las imágenes y cuenta toda la historia.",
    examples: ["ONE DAY…", "THEN…", "SUDDENLY…", "FINALLY…"],
    goal: "Speak for 45+ seconds with 8+ ideas.",
    goalEs: "Habla 45 segundos o más con 8 ideas o más.",
    cta: "START REP 1",
  },
  storyPanels: STORY,
  hideModelText: true,
  goalSeconds: [45, 70],
  goalSentences: 8,
  lines: [
    l("m3d20-1", "One day, | a girl visited her grandmother.", "Un día, una niña visitó a su abuela."),
    l("m3d20-2", "First, | her mother gave her a basket of food.", "Primero, su mamá le dio una canasta de comida."),
    l("m3d20-3", "Then, | she walked through the forest.", "Luego, caminó por el bosque."),
    l("m3d20-4", "While she was walking, | she saw a wolf.", "Mientras caminaba, vio un lobo."),
    l("m3d20-5", "The wolf talked to her | and ran to the house.", "El lobo le habló y corrió a la casa."),
    l("m3d20-6", "After that, | the girl arrived at the house.", "Después de eso, la niña llegó a la casa."),
    l("m3d20-7", "Suddenly, | she noticed something strange.", "De repente, notó algo extraño."),
    l("m3d20-8", "Finally, | a woodsman helped them and everyone was safe.", "Finalmente, un leñador las ayudó y todos estaban a salvo."),
  ],
  prompts: [
    p("m3d20-p1", "ONE DAY — how does the story start?", "ONE DAY — ¿cómo empieza la historia?", "One day…", "Un día…", "WHAT"),
    p("m3d20-p2", "FIRST and THEN — what happened?", "FIRST y THEN — ¿qué pasó?", "First… Then…", "Primero… Luego…", "WHAT NEXT"),
    p("m3d20-p4", "WHILE — what was she doing when the wolf appeared?", "WHILE — ¿qué hacía cuando apareció el lobo?", "While she was…, the wolf…", "Mientras ella…, el lobo…", "WHILE"),
    p("m3d20-p6", "AFTER THAT and SUDDENLY — what happened?", "AFTER THAT y SUDDENLY — ¿qué pasó?", "After that… Suddenly…", "Después de eso… De repente…", "WHAT NEXT"),
    p("m3d20-p8", "FINALLY — how does it end?", "FINALLY — ¿cómo termina?", "Finally…", "Finalmente…", "HOW"),
  ],
  cues: ["ONE DAY", "THEN", "WHILE", "SUDDENLY", "AFTER THAT", "FINALLY"],
  rep5Prompt: {
    question: "Tell the whole story of Little Red Riding Hood.",
    questionEs: "Cuenta toda la historia de Caperucita Roja.",
  },
  rep5Tips: {
    en: "Use the pictures in order. Connect with One day, First, Then, While, Suddenly, After that, Finally. Goal: 45+ seconds and 8+ ideas.",
    es: "Usa las imágenes en orden. Conecta con One day, First, Then, While, Suddenly, After that, Finally. Meta: 45+ segundos y 8+ ideas.",
  },
});

export const PAST_STORIES_DAYS: CourseDay[] = [
  d1, d2, d3, d4, d5,
  d6, d7, d8, d9, d10,
  d11, d12, d13, d14, d15,
  d16, d17, d18, d19, d20,
];
