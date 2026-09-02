import type { CourseDay, ModelLine, PersonalPrompt } from "@/lib/types";
import parkScene from "@/assets/scene-park.jpg";
import beachScene from "@/assets/scene-beach.jpg";
import officeScene from "@/assets/scene-office.jpg";
import homeScene from "@/assets/scene-home.jpg";
import airportScene from "@/assets/scene-airport.jpg";

/**
 * SIMPLE PRESENT — Month 2, Weeks 2–4 (Days 6–20).
 * Week 1 (Days 1–5) is defined at the bottom of this file exactly as built.
 * Every day: exactly 8 core model sentences, recycled across Reps 1–4.
 */

const GOAL: [number, number] = [30, 45];

export const SIMPLE_PRESENT_WEEKS: {
  week: 1 | 2 | 3 | 4;
  title: string;
  subtitle: string;
  subtitleEs: string;
}[] = [
  { week: 1, title: "Simple Present Foundation", subtitle: "Routines, He/She, Negatives & Questions", subtitleEs: "Rutinas, He/She, negativos y preguntas" },
  { week: 2, title: "Different People, Different Routines", subtitle: "Talk about other people's routines", subtitleEs: "Habla de las rutinas de otras personas" },
  { week: 3, title: "Explain a Process", subtitle: "First, then, next, after that, finally", subtitleEs: "First, then, next, after that, finally" },
  { week: 4, title: "Present Progressive — What's Happening?", subtitle: "Describe what is happening right now", subtitleEs: "Describe lo que está pasando ahora" },
];

function line(id: string, text: string, es: string, chunks: string[]): ModelLine {
  return { id, text, es, chunks };
}

function prompt(id: string, question: string, questionEs: string, starter: string, starterEs: string, cue?: string): PersonalPrompt {
  return { id, question, questionEs, starter, starterEs, ...(cue ? { cue } : {}) };
}

type DayInput = {
  day: number;
  week: 2 | 3 | 4;
  topic: string;
  topicEs: string;
  intro: CourseDay["intro"];
  lines: ModelLine[];
  prompts: PersonalPrompt[];
  cues: string[];
  rep5Prompt: CourseDay["rep5Prompt"];
  rep5Tips?: { en: string; es: string };
  variants?: { id: string; label: string; labelEs: string }[];
  sceneImage?: { src: string; alt: string; altEs: string };
  speakerVoice?: "female" | "male";
};

function makeDay(input: DayInput): CourseDay {
  const week = SIMPLE_PRESENT_WEEKS.find((w) => w.week === input.week)!;
  return {
    day: input.day,
    week: input.week,
    weekTitle: week.title,
    weekTitleEs: week.subtitleEs,
    focus: week.title,
    focusEs: week.subtitleEs,
    topic: input.topic,
    topicEs: input.topicEs,
    goalSeconds: GOAL,
    estimatedMinutes: "5–8 min",
    intro: input.intro,
    lines: input.lines,
    prompts: input.prompts,
    cues: input.cues,
    rep5Prompt: input.rep5Prompt,
    ...(input.rep5Tips ? { rep5Tips: input.rep5Tips } : {}),
    ...(input.variants ? { variants: input.variants } : {}),
    ...(input.sceneImage ? { sceneImage: input.sceneImage } : {}),
    ...(input.speakerVoice ? { speakerVoice: input.speakerVoice } : {}),
    modelExample: {
      text: input.lines.map((l) => l.text).join(" "),
      es: input.lines.map((l) => l.es).join(" "),
    },
  };
}

/* ================================ WEEK 2 ================================= */

const day6 = makeDay({
  day: 6,
  week: 2,
  topic: "My Family Member's Routine",
  topicEs: "La rutina de un familiar",
  speakerVoice: "female",
  intro: {
    title: "SHE / HE + VERB",
    titleEs: "SHE / HE + VERBO",
    lead: "Today you talk about another person's day.",
    leadEs: "Hoy hablas del día de otra persona.",
    examples: ["She wakes up early.", "He works in the morning.", "She doesn't work late."],
    goal: "Speak 30+ seconds about a family member.",
    goalEs: "Habla 30+ segundos sobre un familiar.",
    cta: "START REP 1",
  },
  lines: [
    line("sp6-1", "My mom usually wakes up early.", "Mi mamá normalmente se levanta temprano.", ["My mom usually", "wakes up early."]),
    line("sp6-2", "She has breakfast at home.", "Ella desayuna en casa.", ["She has breakfast", "at home."]),
    line("sp6-3", "She starts her day around seven.", "Empieza su día como a las siete.", ["She starts her day", "around seven."]),
    line("sp6-4", "She usually works during the morning.", "Normalmente trabaja durante la mañana.", ["She usually works", "during the morning."]),
    line("sp6-5", "She talks to different people every day.", "Habla con diferentes personas todos los días.", ["She talks to different people", "every day."]),
    line("sp6-6", "She doesn't work late every day.", "No trabaja tarde todos los días.", ["She doesn't work late", "every day."]),
    line("sp6-7", "She likes her routine because she stays busy.", "Le gusta su rutina porque se mantiene ocupada.", ["She likes her routine", "because she stays busy."]),
    line("sp6-8", "Overall, she has a very active routine.", "En general, tiene una rutina muy activa.", ["Overall,", "she has a very active routine."]),
  ],
  variants: [
    { id: "mom", label: "MOM", labelEs: "MAMÁ" },
    { id: "dad", label: "DAD", labelEs: "PAPÁ" },
    { id: "brother", label: "BROTHER", labelEs: "HERMANO" },
    { id: "sister", label: "SISTER", labelEs: "HERMANA" },
    { id: "partner", label: "PARTNER", labelEs: "PAREJA" },
    { id: "friend", label: "FRIEND", labelEs: "AMIGO / AMIGA" },
    { id: "other", label: "OTHER", labelEs: "OTRA PERSONA" },
  ],
  prompts: [
    prompt("sp6-p1", "What time does he / she wake up?", "¿A qué hora se levanta él / ella?", "He / She wakes up…", "Él / Ella se levanta…", "WHEN"),
    prompt("sp6-p3", "What does he / she usually do during the day?", "¿Qué hace él / ella normalmente durante el día?", "He / She usually…", "Él / Ella normalmente…", "WHAT"),
    prompt("sp6-p4", "How often does he / she work?", "¿Con qué frecuencia trabaja él / ella?", "He / She works…", "Él / Ella trabaja…", "HOW OFTEN"),
    prompt("sp6-p6", "Why does he / she like the routine?", "¿Por qué le gusta la rutina?", "He / She likes it because…", "Le gusta porque…", "WHY"),
  ],
  cues: ["WHO?", "MORNING", "USUALLY", "DOESN'T", "BECAUSE", "OVERALL"],
  rep5Prompt: {
    question: "Tell me about a family member's routine. What does he / she do every day?",
    questionEs: "Háblame de la rutina de un familiar. ¿Qué hace él / ella todos los días?",
  },
  rep5Tips: {
    en: "Use he / she, usually, sometimes, doesn't and because. Finish with Overall…",
    es: "Usa he / she, usually, sometimes, doesn't y because. Termina con Overall…",
  },
});

const day7 = makeDay({
  day: 7,
  week: 2,
  topic: "An Athlete's Routine",
  topicEs: "La rutina de un atleta",
  speakerVoice: "male",
  intro: {
    title: "AN ATHLETE'S DAY",
    titleEs: "EL DÍA DE UN ATLETA",
    lead: "An English example inspired by a professional athlete's routine — not a real schedule.",
    leadEs: "Un ejemplo de inglés inspirado en la rutina de un atleta profesional — no es un horario real.",
    examples: ["He trains every day.", "He eats healthy food.", "He doesn't stay up late."],
    goal: "Speak 30+ seconds about an athlete.",
    goalEs: "Habla 30+ segundos sobre un atleta.",
    cta: "START REP 1",
  },
  lines: [
    line("sp7-1", "Cristiano usually wakes up early.", "Cristiano normalmente se levanta temprano.", ["Cristiano usually", "wakes up early."]),
    line("sp7-2", "He eats a healthy breakfast.", "Él desayuna saludable.", ["He eats", "a healthy breakfast."]),
    line("sp7-3", "He trains almost every day.", "Entrena casi todos los días.", ["He trains", "almost every day."]),
    line("sp7-4", "He exercises for several hours.", "Hace ejercicio por varias horas.", ["He exercises", "for several hours."]),
    line("sp7-5", "He spends time with his family.", "Pasa tiempo con su familia.", ["He spends time", "with his family."]),
    line("sp7-6", "He doesn't usually stay up very late.", "Normalmente no se desvela mucho.", ["He doesn't usually", "stay up very late."]),
    line("sp7-7", "He takes care of his body because his job is very demanding.", "Cuida su cuerpo porque su trabajo es muy exigente.", ["He takes care of his body", "because his job", "is very demanding."]),
    line("sp7-8", "Overall, he has a very disciplined routine.", "En general, tiene una rutina muy disciplinada.", ["Overall,", "he has a very disciplined routine."]),
  ],
  variants: [
    { id: "cr7", label: "CRISTIANO RONALDO", labelEs: "CRISTIANO RONALDO" },
    { id: "soccer", label: "ANOTHER SOCCER PLAYER", labelEs: "OTRO FUTBOLISTA" },
    { id: "runner", label: "A RUNNER", labelEs: "UN CORREDOR" },
    { id: "cyclist", label: "A CYCLIST", labelEs: "UN CICLISTA" },
    { id: "other-athlete", label: "ANOTHER ATHLETE", labelEs: "OTRO ATLETA" },
  ],
  prompts: [
    prompt("sp7-p1", "What time does the athlete wake up?", "¿A qué hora se levanta el atleta?", "He wakes up…", "Él se levanta…", "WHEN"),
    prompt("sp7-p3", "How often does he train?", "¿Con qué frecuencia entrena?", "He trains…", "Él entrena…", "HOW OFTEN"),
    prompt("sp7-p4", "What does he do with his family?", "¿Qué hace con su familia?", "He spends time…", "Él pasa tiempo…", "WHAT"),
    prompt("sp7-p6", "Why does he take care of his body?", "¿Por qué cuida su cuerpo?", "He takes care of his body because…", "Cuida su cuerpo porque…", "WHY"),
  ],
  cues: ["WAKES UP", "EATS", "TRAINS", "EXERCISES", "DOESN'T", "BECAUSE", "OVERALL"],
  rep5Prompt: {
    question: "Tell me about an athlete's routine. What does he / she do every day?",
    questionEs: "Háblame de la rutina de un atleta. ¿Qué hace él / ella todos los días?",
  },
  rep5Tips: {
    en: "Use trains, exercises, eats, doesn't and because. Finish with Overall…",
    es: "Usa trains, exercises, eats, doesn't y because. Termina con Overall…",
  },
});

const day8 = makeDay({
  day: 8,
  week: 2,
  topic: "A Superhero's Routine",
  topicEs: "La rutina de un superhéroe",
  speakerVoice: "male",
  intro: {
    title: "A SUPERHERO'S DAY",
    titleEs: "EL DÍA DE UN SUPERHÉROE",
    lead: "Same structure, more imagination.",
    leadEs: "La misma estructura, más imaginación.",
    examples: ["He flies.", "He helps people.", "He doesn't tell his secret."],
    goal: "Speak 30+ seconds about a superhero.",
    goalEs: "Habla 30+ segundos sobre un superhéroe.",
    cta: "START REP 1",
  },
  lines: [
    line("sp8-1", "Superman lives a very unusual life.", "Superman vive una vida muy poco común.", ["Superman lives", "a very unusual life."]),
    line("sp8-2", "He works as a reporter.", "Trabaja como reportero.", ["He works", "as a reporter."]),
    line("sp8-3", "He helps people every day.", "Ayuda a las personas todos los días.", ["He helps people", "every day."]),
    line("sp8-4", "He flies to different places.", "Vuela a diferentes lugares.", ["He flies", "to different places."]),
    line("sp8-5", "He saves people when they are in danger.", "Salva a las personas cuando están en peligro.", ["He saves people", "when they are in danger."]),
    line("sp8-6", "He doesn't tell everyone his secret.", "No le cuenta su secreto a todos.", ["He doesn't tell everyone", "his secret."]),
    line("sp8-7", "He helps people because he wants to protect them.", "Ayuda a la gente porque quiere protegerla.", ["He helps people", "because he wants", "to protect them."]),
    line("sp8-8", "Overall, Superman has a very busy routine.", "En general, Superman tiene una rutina muy ocupada.", ["Overall,", "Superman has a very busy routine."]),
  ],
  variants: [
    { id: "superman", label: "SUPERMAN", labelEs: "SUPERMAN" },
    { id: "other-hero", label: "ANOTHER SUPERHERO", labelEs: "OTRO SUPERHÉROE" },
    { id: "my-hero", label: "MY OWN SUPERHERO", labelEs: "MI PROPIO SUPERHÉROE" },
  ],
  prompts: [
    prompt("sp8-p1", "Who is your superhero?", "¿Quién es tu superhéroe?", "My superhero is…", "Mi superhéroe es…", "WHO"),
    prompt("sp8-p2", "What does he / she do for work?", "¿En qué trabaja?", "He / She works as…", "Él / Ella trabaja como…", "WHAT"),
    prompt("sp8-p4", "What special thing does he / she do?", "¿Qué cosa especial hace?", "He / She flies / runs / saves…", "Él / Ella vuela / corre / salva…", "HOW"),
    prompt("sp8-p6", "Why does he / she help people?", "¿Por qué ayuda a la gente?", "He / She helps people because…", "Ayuda a la gente porque…", "WHY"),
  ],
  cues: ["WHO?", "WORKS", "HELPS", "SPECIAL POWER", "DOESN'T", "BECAUSE", "OVERALL"],
  rep5Prompt: {
    question: "Tell me about a superhero's routine. What does he / she do every day?",
    questionEs: "Háblame de la rutina de un superhéroe. ¿Qué hace él / ella todos los días?",
  },
  rep5Tips: {
    en: "Use he / she + verb, doesn't and because. Finish with Overall…",
    es: "Usa he / she + verbo, doesn't y because. Termina con Overall…",
  },
});

const day9 = makeDay({
  day: 9,
  week: 2,
  topic: "A Singer's Routine",
  topicEs: "La rutina de una cantante",
  speakerVoice: "female",
  intro: {
    title: "A PERFORMER'S DAY",
    titleEs: "EL DÍA DE UNA ARTISTA",
    lead: "An English example inspired by a professional singer's life — not a real schedule.",
    leadEs: "Un ejemplo de inglés inspirado en la vida de una cantante profesional — no es un horario real.",
    examples: ["She practices music.", "She sings and dances.", "She doesn't have the same schedule."],
    goal: "Speak 30+ seconds about a singer or performer.",
    goalEs: "Habla 30+ segundos sobre una cantante o artista.",
    cta: "START REP 1",
  },
  lines: [
    line("sp9-1", "Shakira usually starts her day early.", "Shakira normalmente empieza su día temprano.", ["Shakira usually", "starts her day early."]),
    line("sp9-2", "She spends time with her family.", "Pasa tiempo con su familia.", ["She spends time", "with her family."]),
    line("sp9-3", "She practices music and works on new ideas.", "Practica música y trabaja en ideas nuevas.", ["She practices music", "and works on new ideas."]),
    line("sp9-4", "She sings and dances regularly.", "Canta y baila con frecuencia.", ["She sings and dances", "regularly."]),
    line("sp9-5", "She sometimes exercises during the day.", "A veces hace ejercicio durante el día.", ["She sometimes exercises", "during the day."]),
    line("sp9-6", "She doesn't have the same schedule every day.", "No tiene el mismo horario todos los días.", ["She doesn't have", "the same schedule", "every day."]),
    line("sp9-7", "She practices a lot because performing requires preparation.", "Practica mucho porque presentarse requiere preparación.", ["She practices a lot", "because performing", "requires preparation."]),
    line("sp9-8", "Overall, she has a creative and active routine.", "En general, tiene una rutina creativa y activa.", ["Overall,", "she has a creative", "and active routine."]),
  ],
  variants: [
    { id: "shakira", label: "SHAKIRA", labelEs: "SHAKIRA" },
    { id: "singer", label: "ANOTHER SINGER", labelEs: "OTRA CANTANTE" },
    { id: "musician", label: "A MUSICIAN", labelEs: "UN MÚSICO" },
    { id: "actor", label: "AN ACTOR", labelEs: "UN ACTOR" },
    { id: "performer", label: "ANOTHER PERFORMER", labelEs: "OTRO ARTISTA" },
  ],
  prompts: [
    prompt("sp9-p1", "Who is the performer?", "¿Quién es el / la artista?", "The singer is…", "El / La cantante es…", "WHO"),
    prompt("sp9-p2", "How does he / she start the day?", "¿Cómo empieza el día?", "He / She usually starts…", "Él / Ella normalmente empieza…", "HOW"),
    prompt("sp9-p3", "What does he / she practice?", "¿Qué practica?", "He / She practices…", "Él / Ella practica…", "WHAT"),
    prompt("sp9-p6", "Why does he / she practice a lot?", "¿Por qué practica mucho?", "He / She practices a lot because…", "Practica mucho porque…", "WHY"),
  ],
  cues: ["WHO?", "STARTS", "PRACTICES", "SOMETIMES", "DOESN'T", "BECAUSE", "OVERALL"],
  rep5Prompt: {
    question: "Tell me about a singer or performer's routine. What does he / she do every day?",
    questionEs: "Háblame de la rutina de una cantante o artista. ¿Qué hace él / ella todos los días?",
  },
  rep5Tips: {
    en: "Use practices, sings, sometimes, doesn't and because. Finish with Overall…",
    es: "Usa practices, sings, sometimes, doesn't y because. Termina con Overall…",
  },
});

const day10 = makeDay({
  day: 10,
  week: 2,
  topic: "Week 2 Fluency Challenge",
  topicEs: "Reto de fluidez — Semana 2",
  intro: {
    title: "DIFFERENT PEOPLE, DIFFERENT ROUTINES",
    titleEs: "DIFERENTES PERSONAS, DIFERENTES RUTINAS",
    lead: "Choose your person and talk about their day.",
    leadEs: "Elige a tu persona y habla de su día.",
    examples: ["He usually…", "She sometimes…", "He / She doesn't…"],
    goal: "Speak 30+ seconds with 5+ sentences.",
    goalEs: "Habla 30+ segundos con 5+ oraciones.",
    cta: "START REP 1",
  },
  variants: [
    { id: "family", label: "FAMILY MEMBER", labelEs: "UN FAMILIAR" },
    { id: "athlete", label: "ATHLETE", labelEs: "UN ATLETA" },
    { id: "superhero", label: "SUPERHERO", labelEs: "UN SUPERHÉROE" },
    { id: "singer", label: "SINGER / PERFORMER", labelEs: "CANTANTE / ARTISTA" },
  ],
  lines: [
    line("sp10-1", "This person has an interesting routine.", "Esta persona tiene una rutina interesante.", ["This person has", "an interesting routine."]),
    line("sp10-2", "He usually gets up before most people.", "Normalmente se levanta antes que la mayoría.", ["He usually gets up", "before most people."]),
    line("sp10-3", "She works on something important every morning.", "Trabaja en algo importante cada mañana.", ["She works on something important", "every morning."]),
    line("sp10-4", "He sometimes travels to other cities.", "A veces viaja a otras ciudades.", ["He sometimes travels", "to other cities."]),
    line("sp10-5", "She meets different people during the day.", "Conoce a diferentes personas durante el día.", ["She meets different people", "during the day."]),
    line("sp10-6", "He doesn't repeat the same schedule every week.", "No repite el mismo horario cada semana.", ["He doesn't repeat", "the same schedule", "every week."]),
    line("sp10-7", "She enjoys her routine because it keeps her motivated.", "Disfruta su rutina porque la mantiene motivada.", ["She enjoys her routine", "because it keeps her", "motivated."]),
    line("sp10-8", "Overall, this person has a full and interesting life.", "En general, esta persona tiene una vida llena e interesante.", ["Overall, this person has", "a full and interesting life."]),
  ],
  prompts: [
    prompt("sp10-p2", "What does he / she usually do every day?", "¿Qué hace él / ella normalmente todos los días?", "He / She usually…", "Él / Ella normalmente…", "WHAT"),
    prompt("sp10-p3", "What doesn't he / she do?", "¿Qué no hace?", "He / She doesn't…", "Él / Ella no…", "WHAT"),
    prompt("sp10-p4", "Ask ONE question about this person.", "Haz UNA pregunta sobre esta persona.", "What does…? / Does he / she…? / What time does…?", "What does…? / Does he / she…? / What time does…?", "ASK"),
  ],
  cues: ["WHO?", "MORNING", "WORK / ACTIVITY", "USUALLY", "SOMETIMES", "DOESN'T", "BECAUSE", "OVERALL"],
  rep5Prompt: {
    question: "Tell me about this person's routine.",
    questionEs: "Háblame de la rutina de esta persona.",
  },
  rep5Tips: {
    en: "Use usually, sometimes, doesn't and because. Finish with Overall…",
    es: "Usa usually, sometimes, doesn't y because. Termina con Overall…",
  },
});

/* ================================ WEEK 3 ================================= */

const processTips = {
  en: "Use First, Then, Next, After that and Finally to keep your steps in order.",
  es: "Usa First, Then, Next, After that y Finally para mantener tus pasos en orden.",
};

const day11 = makeDay({
  day: 11,
  week: 3,
  topic: "How to Download an App",
  topicEs: "Cómo descargar una app",
  intro: {
    title: "EXPLAIN A PROCESS",
    titleEs: "EXPLICA UN PROCESO",
    lead: "Put your ideas in order: first, then, next, after that, finally.",
    leadEs: "Ordena tus ideas: first, then, next, after that, finally.",
    examples: ["First, you open the app.", "Then, you search.", "Finally, it is ready."],
    goal: "Explain the steps in 30+ seconds.",
    goalEs: "Explica los pasos en 30+ segundos.",
    cta: "START REP 1",
  },
  lines: [
    line("sp11-1", "First, you open the App Store or Google Play.", "Primero, abres la App Store o Google Play.", ["First,", "you open the App Store", "or Google Play."]),
    line("sp11-2", "Then, you search for the app you want.", "Luego, buscas la app que quieres.", ["Then,", "you search for the app", "you want."]),
    line("sp11-3", "Next, you select the app.", "Después, seleccionas la app.", ["Next,", "you select the app."]),
    line("sp11-4", "You check the name and the information.", "Revisas el nombre y la información.", ["You check the name", "and the information."]),
    line("sp11-5", "After that, you tap the download button.", "Después de eso, tocas el botón de descarga.", ["After that,", "you tap the download button."]),
    line("sp11-6", "You wait for the app to download.", "Esperas a que la app se descargue.", ["You wait for the app", "to download."]),
    line("sp11-7", "Then, you open the app and create your account.", "Luego, abres la app y creas tu cuenta.", ["Then, you open the app", "and create your account."]),
    line("sp11-8", "Finally, the app is ready to use.", "Finalmente, la app está lista para usar.", ["Finally,", "the app is ready to use."]),
  ],
  prompts: [
    prompt("sp11-p1", "What's an app you downloaded recently?", "¿Qué app descargaste recientemente?", "I downloaded…", "Descargué…", "WHAT"),
    prompt("sp11-p2", "Why did you download it?", "¿Por qué la descargaste?", "I downloaded it because…", "La descargué porque…", "WHY"),
    prompt("sp11-p3", "How do you usually find new apps?", "¿Cómo encuentras normalmente apps nuevas?", "I usually find them…", "Normalmente las encuentro…", "HOW"),
    prompt("sp11-p4", "How often do you download new apps?", "¿Con qué frecuencia descargas apps nuevas?", "I download new apps…", "Descargo apps nuevas…", "HOW OFTEN"),
  ],
  cues: ["FIRST", "SEARCH", "SELECT", "CHECK", "DOWNLOAD", "WAIT", "OPEN", "FINALLY"],
  rep5Prompt: { question: "Explain how to download an app.", questionEs: "Explica cómo descargar una app." },
  rep5Tips: processTips,
});

const day12 = makeDay({
  day: 12,
  week: 3,
  topic: "How to Make a Pizza",
  topicEs: "Cómo hacer una pizza",
  intro: {
    title: "STEP BY STEP",
    titleEs: "PASO A PASO",
    lead: "Same sequencing words, new process.",
    leadEs: "Las mismas palabras de secuencia, un proceso nuevo.",
    examples: ["First, you prepare…", "Then, you add…", "Finally, you enjoy it."],
    goal: "Explain the steps in 30+ seconds.",
    goalEs: "Explica los pasos en 30+ segundos.",
    cta: "START REP 1",
  },
  lines: [
    line("sp12-1", "First, you prepare the pizza dough.", "Primero, preparas la masa de pizza.", ["First,", "you prepare the pizza dough."]),
    line("sp12-2", "Then, you put the dough on a tray.", "Luego, pones la masa en una bandeja.", ["Then,", "you put the dough", "on a tray."]),
    line("sp12-3", "Next, you add tomato sauce.", "Después, agregas salsa de tomate.", ["Next,", "you add tomato sauce."]),
    line("sp12-4", "You put cheese on the pizza.", "Pones queso en la pizza.", ["You put cheese", "on the pizza."]),
    line("sp12-5", "After that, you add your favorite toppings.", "Después de eso, agregas tus ingredientes favoritos.", ["After that,", "you add your favorite toppings."]),
    line("sp12-6", "Then, you put the pizza in the oven.", "Luego, metes la pizza al horno.", ["Then,", "you put the pizza", "in the oven."]),
    line("sp12-7", "You wait until the pizza is ready.", "Esperas hasta que la pizza esté lista.", ["You wait", "until the pizza is ready."]),
    line("sp12-8", "Finally, you cut the pizza and enjoy it.", "Finalmente, cortas la pizza y la disfrutas.", ["Finally,", "you cut the pizza", "and enjoy it."]),
  ],
  prompts: [
    prompt("sp12-p4", "What are your favorite pizza toppings?", "¿Cuáles son tus ingredientes favoritos de pizza?", "My favorite toppings are…", "Mis ingredientes favoritos son…", "WHAT"),
    prompt("sp12-p5", "How do you like to make or order pizza?", "¿Cómo te gusta hacer o pedir pizza?", "I usually…", "Normalmente…", "HOW"),
    prompt("sp12-p6", "How often do you eat pizza?", "¿Con qué frecuencia comes pizza?", "I eat pizza…", "Como pizza…", "HOW OFTEN"),
    prompt("sp12-p7", "Who do you usually eat pizza with?", "¿Con quién comes pizza normalmente?", "I usually eat pizza with…", "Normalmente como pizza con…", "WHO"),
  ],
  cues: ["FIRST", "DOUGH", "SAUCE", "CHEESE", "TOPPINGS", "OVEN", "WAIT", "FINALLY"],
  rep5Prompt: { question: "Explain how to make a pizza.", questionEs: "Explica cómo hacer una pizza." },
  rep5Tips: processTips,
});

const day13 = makeDay({
  day: 13,
  week: 3,
  topic: "How to Order Food",
  topicEs: "Cómo pedir comida",
  intro: {
    title: "USING A DELIVERY APP",
    titleEs: "USANDO UNA APP DE DELIVERY",
    lead: "Explain a process you probably do every week.",
    leadEs: "Explica un proceso que probablemente haces cada semana.",
    examples: ["First, you open the app.", "Then, you choose a restaurant."],
    goal: "Explain the steps in 30+ seconds.",
    goalEs: "Explica los pasos en 30+ segundos.",
    cta: "START REP 1",
  },
  lines: [
    line("sp13-1", "First, you open the delivery app.", "Primero, abres la app de delivery.", ["First,", "you open the delivery app."]),
    line("sp13-2", "Then, you choose a restaurant.", "Luego, eliges un restaurante.", ["Then,", "you choose a restaurant."]),
    line("sp13-3", "Next, you look at the menu.", "Después, ves el menú.", ["Next,", "you look at the menu."]),
    line("sp13-4", "You select the food you want.", "Seleccionas la comida que quieres.", ["You select the food", "you want."]),
    line("sp13-5", "After that, you add the food to your order.", "Después de eso, agregas la comida a tu pedido.", ["After that,", "you add the food", "to your order."]),
    line("sp13-6", "Then, you check your address and payment method.", "Luego, revisas tu dirección y método de pago.", ["Then, you check your address", "and payment method."]),
    line("sp13-7", "You confirm the order and wait for your food.", "Confirmas el pedido y esperas tu comida.", ["You confirm the order", "and wait for your food."]),
    line("sp13-8", "Finally, the delivery arrives and you receive your order.", "Finalmente, llega el repartidor y recibes tu pedido.", ["Finally, the delivery arrives", "and you receive your order."]),
  ],
  prompts: [
    prompt("sp13-p1", "Where do you usually order food from?", "¿De dónde pides comida normalmente?", "I usually order from…", "Normalmente pido de…", "WHERE"),
    prompt("sp13-p2", "How often do you order food online?", "¿Con qué frecuencia pides comida en línea?", "I order food…", "Pido comida…", "HOW OFTEN"),
    prompt("sp13-p4", "What do you usually order?", "¿Qué pides normalmente?", "I usually order…", "Normalmente pido…", "WHAT"),
    prompt("sp13-p6", "Why do you like ordering delivery?", "¿Por qué te gusta pedir a domicilio?", "I like it because…", "Me gusta porque…", "WHY"),
  ],
  cues: ["FIRST", "RESTAURANT", "MENU", "SELECT", "ADDRESS", "PAY", "CONFIRM", "FINALLY"],
  rep5Prompt: { question: "Explain how to order food on a delivery app.", questionEs: "Explica cómo pedir comida en una app de delivery." },
  rep5Tips: processTips,
});

const day14 = makeDay({
  day: 14,
  week: 3,
  topic: "How to Make a Sandwich",
  topicEs: "Cómo hacer un sándwich",
  intro: {
    title: "A SIMPLE PROCESS",
    titleEs: "UN PROCESO SIMPLE",
    lead: "Short steps, clear order.",
    leadEs: "Pasos cortos, orden claro.",
    examples: ["First, you get two pieces of bread.", "Then, you add cheese."],
    goal: "Explain the steps in 30+ seconds.",
    goalEs: "Explica los pasos en 30+ segundos.",
    cta: "START REP 1",
  },
  lines: [
    line("sp14-1", "First, you get two pieces of bread.", "Primero, tomas dos rebanadas de pan.", ["First,", "you get two pieces of bread."]),
    line("sp14-2", "Then, you add cheese.", "Luego, agregas queso.", ["Then,", "you add cheese."]),
    line("sp14-3", "Next, you add vegetables.", "Después, agregas vegetales.", ["Next,", "you add vegetables."]),
    line("sp14-4", "You add another ingredient you like.", "Agregas otro ingrediente que te guste.", ["You add another ingredient", "you like."]),
    line("sp14-5", "After that, you put the second piece of bread on top.", "Después de eso, pones la segunda rebanada de pan encima.", ["After that,", "you put the second piece of bread", "on top."]),
    line("sp14-6", "Then, you cut the sandwich in half.", "Luego, cortas el sándwich por la mitad.", ["Then,", "you cut the sandwich", "in half."]),
    line("sp14-7", "You put it on a plate.", "Lo pones en un plato.", ["You put it", "on a plate."]),
    line("sp14-8", "Finally, you eat and enjoy your sandwich.", "Finalmente, comes y disfrutas tu sándwich.", ["Finally, you eat", "and enjoy your sandwich."]),
  ],
  prompts: [
    prompt("sp14-p1", "What's your favorite sandwich?", "¿Cuál es tu sándwich favorito?", "My favorite sandwich is…", "Mi sándwich favorito es…", "WHAT"),
    prompt("sp14-p2", "What do you usually put on it?", "¿Qué le pones normalmente?", "I usually put…", "Normalmente le pongo…", "WHAT"),
    prompt("sp14-p6", "How often do you eat sandwiches?", "¿Con qué frecuencia comes sándwiches?", "I eat sandwiches…", "Como sándwiches…", "HOW OFTEN"),
    prompt("sp14-p7", "Who makes sandwiches in your house?", "¿Quién hace los sándwiches en tu casa?", "Usually,… makes them", "Normalmente, … los hace", "WHO"),
  ],
  cues: ["FIRST", "BREAD", "CHEESE", "VEGETABLES", "TOP", "CUT", "PLATE", "FINALLY"],
  rep5Prompt: { question: "Explain how to make a sandwich.", questionEs: "Explica cómo hacer un sándwich." },
  rep5Tips: processTips,
});

const day15 = makeDay({
  day: 15,
  week: 3,
  topic: "Process Challenge",
  topicEs: "Reto de procesos",
  intro: {
    title: "PROCESS CHALLENGE",
    titleEs: "RETO DE PROCESOS",
    lead: "Choose one process and explain it step by step.",
    leadEs: "Elige un proceso y explícalo paso a paso.",
    examples: ["First…", "Then…", "Next…", "After that…", "Finally…"],
    goal: "Explain your process in 30+ seconds.",
    goalEs: "Explica tu proceso en 30+ segundos.",
    cta: "START REP 1",
  },
  variants: [
    { id: "coffee", label: "MAKE COFFEE", labelEs: "HACER CAFÉ" },
    { id: "message", label: "SEND A MESSAGE", labelEs: "ENVIAR UN MENSAJE" },
    { id: "breakfast", label: "MAKE BREAKFAST", labelEs: "HACER EL DESAYUNO" },
    { id: "buy", label: "BUY SOMETHING ONLINE", labelEs: "COMPRAR EN LÍNEA" },
    { id: "ready", label: "GET READY FOR WORK / SCHOOL", labelEs: "ALISTARSE PARA EL TRABAJO / LA ESCUELA" },
  ],
  lines: [
    line("sp15-1", "First, you decide what you want to do.", "Primero, decides qué quieres hacer.", ["First,", "you decide what", "you want to do."]),
    line("sp15-2", "Then, you get everything you need.", "Luego, consigues todo lo que necesitas.", ["Then,", "you get everything", "you need."]),
    line("sp15-3", "Next, you start the first step.", "Después, empiezas el primer paso.", ["Next,", "you start the first step."]),
    line("sp15-4", "You check that everything is correct.", "Revisas que todo esté correcto.", ["You check", "that everything is correct."]),
    line("sp15-5", "After that, you continue with the next step.", "Después de eso, continúas con el siguiente paso.", ["After that,", "you continue", "with the next step."]),
    line("sp15-6", "Then, you wait a few minutes.", "Luego, esperas unos minutos.", ["Then,", "you wait a few minutes."]),
    line("sp15-7", "You finish the last part of the process.", "Terminas la última parte del proceso.", ["You finish the last part", "of the process."]),
    line("sp15-8", "Finally, everything is ready and you can enjoy it.", "Finalmente, todo está listo y puedes disfrutarlo.", ["Finally, everything is ready", "and you can enjoy it."]),
  ],
  prompts: [
    prompt("sp15-p1", "What process did you choose to explain?", "¿Qué proceso elegiste explicar?", "I chose to explain…", "Elegí explicar…", "WHAT"),
    prompt("sp15-p2", "Why did you choose this process?", "¿Por qué elegiste este proceso?", "I chose it because…", "Lo elegí porque…", "WHY"),
    prompt("sp15-p3", "How often do you do this process?", "¿Con qué frecuencia haces este proceso?", "I do it…", "Lo hago…", "HOW OFTEN"),
    prompt("sp15-p4", "How long does this process take you?", "¿Cuánto tiempo te toma este proceso?", "It takes me…", "Me toma…", "HOW"),
  ],
  cues: ["FIRST", "THEN", "NEXT", "AFTER THAT", "THEN", "FINALLY"],
  rep5Prompt: { question: "Explain the process step by step.", questionEs: "Explica el proceso paso a paso." },
  rep5Tips: processTips,
});

/* ================================ WEEK 4 ================================= */

const progressiveTips = {
  en: "Use is / are + verb-ing. Describe one person at a time, then finish with everyone.",
  es: "Usa is / are + verbo-ing. Describe a una persona a la vez y termina con todos.",
};

const day16 = makeDay({
  day: 16,
  week: 4,
  topic: "At the Park",
  topicEs: "En el parque",
  sceneImage: { src: parkScene, alt: "People doing different activities in a park", altEs: "Personas haciendo diferentes actividades en un parque" },
  intro: {
    title: "WHAT'S HAPPENING?",
    titleEs: "¿QUÉ ESTÁ PASANDO?",
    lead: "Look at the picture and say what is happening right now.",
    leadEs: "Mira la imagen y di lo que está pasando ahora.",
    examples: ["He is running.", "She is reading.", "They are playing."],
    goal: "Describe the picture for 30+ seconds.",
    goalEs: "Describe la imagen por 30+ segundos.",
    cta: "START REP 1",
  },
  lines: [
    line("sp16-1", "A boy is running in the park.", "Un niño está corriendo en el parque.", ["A boy", "is running", "in the park."]),
    line("sp16-2", "A woman is walking her dog.", "Una mujer está paseando a su perro.", ["A woman", "is walking her dog."]),
    line("sp16-3", "Two children are playing soccer.", "Dos niños están jugando fútbol.", ["Two children", "are playing soccer."]),
    line("sp16-4", "A man is reading a book.", "Un hombre está leyendo un libro.", ["A man", "is reading a book."]),
    line("sp16-5", "A girl is riding her bike.", "Una niña está montando su bicicleta.", ["A girl", "is riding her bike."]),
    line("sp16-6", "A family is having a picnic.", "Una familia está haciendo un picnic.", ["A family", "is having a picnic."]),
    line("sp16-7", "Two friends are talking.", "Dos amigos están conversando.", ["Two friends", "are talking."]),
    line("sp16-8", "Everyone is enjoying the park.", "Todos están disfrutando el parque.", ["Everyone", "is enjoying the park."]),
  ],
  prompts: [
    prompt("sp16-p1", "What is the boy doing?", "¿Qué está haciendo el niño?", "He is…", "Él está…", "WHAT"),
    prompt("sp16-p3", "What are the two children doing?", "¿Qué están haciendo los dos niños?", "They are…", "Ellos están…", "WHAT"),
    prompt("sp16-p2", "What is the family doing together?", "¿Qué está haciendo la familia juntos?", "They are…", "Ellos están…", "WHAT"),
    prompt("sp16-p6", "What is everyone doing?", "¿Qué están haciendo todos?", "Everyone is…", "Todos están…", "WHAT"),
  ],
  cues: ["RUNNING", "WALKING", "PLAYING", "READING", "RIDING", "TALKING", "EVERYONE"],
  rep5Prompt: { question: "Describe what is happening in the park.", questionEs: "Describe lo que está pasando en el parque." },
  rep5Tips: progressiveTips,
});

const day17 = makeDay({
  day: 17,
  week: 4,
  topic: "At the Beach",
  topicEs: "En la playa",
  sceneImage: { src: beachScene, alt: "People doing different activities at the beach", altEs: "Personas haciendo diferentes actividades en la playa" },
  intro: {
    title: "AT THE BEACH",
    titleEs: "EN LA PLAYA",
    lead: "Same pattern, new picture.",
    leadEs: "El mismo patrón, una imagen nueva.",
    examples: ["He is swimming.", "She is reading.", "They are playing volleyball."],
    goal: "Describe the picture for 30+ seconds.",
    goalEs: "Describe la imagen por 30+ segundos.",
    cta: "START REP 1",
  },
  lines: [
    line("sp17-1", "Two people are swimming in the ocean.", "Dos personas están nadando en el mar.", ["Two people", "are swimming", "in the ocean."]),
    line("sp17-2", "A child is building a sandcastle.", "Un niño está construyendo un castillo de arena.", ["A child", "is building a sandcastle."]),
    line("sp17-3", "A woman is reading a book.", "Una mujer está leyendo un libro.", ["A woman", "is reading a book."]),
    line("sp17-4", "Two friends are playing volleyball.", "Dos amigos están jugando voleibol.", ["Two friends", "are playing volleyball."]),
    line("sp17-5", "A man is drinking water.", "Un hombre está tomando agua.", ["A man", "is drinking water."]),
    line("sp17-6", "A couple is walking near the water.", "Una pareja está caminando cerca del agua.", ["A couple", "is walking", "near the water."]),
    line("sp17-7", "A photographer is taking pictures.", "Un fotógrafo está tomando fotos.", ["A photographer", "is taking pictures."]),
    line("sp17-8", "Everyone is having a great day at the beach.", "Todos están pasando un gran día en la playa.", ["Everyone is having", "a great day", "at the beach."]),
  ],
  prompts: [
    prompt("sp17-p1", "What are the people in the water doing?", "¿Qué están haciendo las personas en el agua?", "They are…", "Ellos están…", "WHAT"),
    prompt("sp17-p2", "What is the child doing?", "¿Qué está haciendo el niño?", "He is…", "Él está…", "WHAT"),
    prompt("sp17-p3", "What is the woman doing?", "¿Qué está haciendo la mujer?", "She is…", "Ella está…", "WHAT"),
    prompt("sp17-p6", "What is everyone doing?", "¿Qué están haciendo todos?", "Everyone is…", "Todos están…", "WHAT"),
  ],
  cues: ["SWIMMING", "BUILDING", "READING", "PLAYING", "DRINKING", "WALKING", "EVERYONE"],
  rep5Prompt: { question: "Describe what is happening at the beach.", questionEs: "Describe lo que está pasando en la playa." },
  rep5Tips: progressiveTips,
});

const day18 = makeDay({
  day: 18,
  week: 4,
  topic: "At the Office",
  topicEs: "En la oficina",
  sceneImage: { src: officeScene, alt: "People doing different activities in an office", altEs: "Personas haciendo diferentes actividades en una oficina" },
  intro: {
    title: "AT THE OFFICE",
    titleEs: "EN LA OFICINA",
    lead: "Describe a work scene happening right now.",
    leadEs: "Describe una escena de trabajo que está pasando ahora.",
    examples: ["She is talking on the phone.", "He is typing.", "They are having a meeting."],
    goal: "Describe the picture for 30+ seconds.",
    goalEs: "Describe la imagen por 30+ segundos.",
    cta: "START REP 1",
  },
  lines: [
    line("sp18-1", "A woman is talking on the phone.", "Una mujer está hablando por teléfono.", ["A woman", "is talking", "on the phone."]),
    line("sp18-2", "A man is typing on his computer.", "Un hombre está escribiendo en su computadora.", ["A man", "is typing", "on his computer."]),
    line("sp18-3", "Someone is drinking coffee.", "Alguien está tomando café.", ["Someone", "is drinking coffee."]),
    line("sp18-4", "A woman is writing in her notebook.", "Una mujer está escribiendo en su cuaderno.", ["A woman", "is writing", "in her notebook."]),
    line("sp18-5", "Two people are having a meeting.", "Dos personas están teniendo una reunión.", ["Two people", "are having a meeting."]),
    line("sp18-6", "A man is carrying some papers.", "Un hombre está cargando unos papeles.", ["A man", "is carrying", "some papers."]),
    line("sp18-7", "A woman is using the printer.", "Una mujer está usando la impresora.", ["A woman", "is using the printer."]),
    line("sp18-8", "Everyone is working right now.", "Todos están trabajando en este momento.", ["Everyone", "is working", "right now."]),
  ],
  prompts: [
    prompt("sp18-p1", "What is the woman doing?", "¿Qué está haciendo la mujer?", "She is…", "Ella está…", "WHAT"),
    prompt("sp18-p2", "What is the man doing?", "¿Qué está haciendo el hombre?", "He is…", "Él está…", "WHAT"),
    prompt("sp18-p4", "What are the two people in the meeting doing?", "¿Qué están haciendo las dos personas en la reunión?", "They are…", "Ellos están…", "WHAT"),
    prompt("sp18-p6", "What is everyone doing?", "¿Qué están haciendo todos?", "Everyone is…", "Todos están…", "WHAT"),
  ],
  cues: ["TALKING", "TYPING", "DRINKING", "WRITING", "MEETING", "CARRYING", "EVERYONE"],
  rep5Prompt: { question: "Describe what is happening in the office.", questionEs: "Describe lo que está pasando en la oficina." },
  rep5Tips: progressiveTips,
});

const day19 = makeDay({
  day: 19,
  week: 4,
  topic: "At Home",
  topicEs: "En casa",
  sceneImage: { src: homeScene, alt: "People doing different activities at home", altEs: "Personas haciendo diferentes actividades en casa" },
  intro: {
    title: "AT HOME",
    titleEs: "EN CASA",
    lead: "Describe what your family is doing right now.",
    leadEs: "Describe lo que tu familia está haciendo ahora.",
    examples: ["She is cooking.", "He is cleaning.", "They are watching TV."],
    goal: "Describe the picture for 30+ seconds.",
    goalEs: "Describe la imagen por 30+ segundos.",
    cta: "START REP 1",
  },
  lines: [
    line("sp19-1", "A woman is cooking in the kitchen.", "Una mujer está cocinando en la cocina.", ["A woman", "is cooking", "in the kitchen."]),
    line("sp19-2", "A man is cleaning the floor.", "Un hombre está limpiando el piso.", ["A man", "is cleaning the floor."]),
    line("sp19-3", "A child is doing his homework.", "Un niño está haciendo su tarea.", ["A child", "is doing his homework."]),
    line("sp19-4", "Someone is watching TV on the sofa.", "Alguien está viendo tele en el sofá.", ["Someone is watching TV", "on the sofa."]),
    line("sp19-5", "A woman is eating at the table.", "Una mujer está comiendo en la mesa.", ["A woman", "is eating", "at the table."]),
    line("sp19-6", "Another woman is washing the dishes.", "Otra mujer está lavando los platos.", ["Another woman", "is washing the dishes."]),
    line("sp19-7", "The cat is sleeping on the floor.", "El gato está durmiendo en el piso.", ["The cat", "is sleeping", "on the floor."]),
    line("sp19-8", "Everyone is doing something at home.", "Todos están haciendo algo en casa.", ["Everyone is doing something", "at home."]),
  ],
  prompts: [
    prompt("sp19-p1", "What is the woman in the kitchen doing?", "¿Qué está haciendo la mujer en la cocina?", "She is…", "Ella está…", "WHAT"),
    prompt("sp19-p2", "What is the man doing?", "¿Qué está haciendo el hombre?", "He is…", "Él está…", "WHAT"),
    prompt("sp19-p3", "What is the child doing?", "¿Qué está haciendo el niño?", "He is…", "Él está…", "WHAT"),
    prompt("sp19-p6", "What is everyone doing?", "¿Qué están haciendo todos?", "Everyone is…", "Todos están…", "WHAT"),
  ],
  cues: ["COOKING", "CLEANING", "HOMEWORK", "WATCHING", "EATING", "WASHING", "EVERYONE"],
  rep5Prompt: { question: "Describe what is happening at home.", questionEs: "Describe lo que está pasando en casa." },
  rep5Tips: progressiveTips,
});

const day20 = makeDay({
  day: 20,
  week: 4,
  topic: "What's Happening?",
  topicEs: "¿Qué está pasando?",
  sceneImage: { src: airportScene, alt: "People doing different activities in a busy airport terminal", altEs: "Personas haciendo diferentes actividades en una terminal de aeropuerto" },
  intro: {
    title: "PRESENT PROGRESSIVE CHALLENGE",
    titleEs: "RETO DE PRESENTE PROGRESIVO",
    lead: "A new place. Look carefully and describe everything you see.",
    leadEs: "Un lugar nuevo. Observa con atención y describe todo lo que ves.",
    examples: ["He is walking.", "She is checking her phone.", "They are waiting."],
    goal: "Describe the picture for 30+ seconds. Try 8 sentences.",
    goalEs: "Describe la imagen por 30+ segundos. Intenta 8 oraciones.",
    cta: "START REP 1",
  },
  lines: [
    line("sp20-1", "A man is pulling his suitcase.", "Un hombre está jalando su maleta.", ["A man", "is pulling his suitcase."]),
    line("sp20-2", "A woman is checking her phone.", "Una mujer está revisando su teléfono.", ["A woman", "is checking her phone."]),
    line("sp20-3", "A family is waiting in the chairs.", "Una familia está esperando en las sillas.", ["A family", "is waiting", "in the chairs."]),
    line("sp20-4", "A worker is cleaning the floor.", "Un trabajador está limpiando el piso.", ["A worker", "is cleaning the floor."]),
    line("sp20-5", "A young man is buying coffee.", "Un joven está comprando café.", ["A young man", "is buying coffee."]),
    line("sp20-6", "Two people are hugging goodbye.", "Dos personas se están abrazando para despedirse.", ["Two people", "are hugging goodbye."]),
    line("sp20-7", "A woman is talking to the agent at the desk.", "Una mujer está hablando con la agente en el mostrador.", ["A woman is talking", "to the agent", "at the desk."]),
    line("sp20-8", "A child is running across the terminal.", "Un niño está corriendo por la terminal.", ["A child is running", "across the terminal."]),
  ],
  prompts: [
    prompt("sp20-p1", "What is the man doing?", "¿Qué está haciendo el hombre?", "He is…", "Él está…", "WHAT"),
    prompt("sp20-p2", "What is the woman doing?", "¿Qué está haciendo la mujer?", "She is…", "Ella está…", "WHAT"),
    prompt("sp20-p3", "What are they doing near the gate?", "¿Qué están haciendo cerca de la puerta de embarque?", "They are…", "Ellos están…", "WHAT"),
    prompt("sp20-p6", "What is the child doing?", "¿Qué está haciendo el niño?", "He is…", "Él está…", "WHAT"),
  ],
  cues: ["PULLING", "CHECKING", "WAITING", "CLEANING", "BUYING", "HUGGING", "TALKING", "RUNNING"],
  rep5Prompt: { question: "Describe what is happening.", questionEs: "Describe lo que está pasando." },
  rep5Tips: {
    en: "Use is / are + verb-ing. Aim for 8 sentences if you can.",
    es: "Usa is / are + verbo-ing. Intenta llegar a 8 oraciones si puedes.",
  },
});

export const SIMPLE_PRESENT_EXTRA_DAYS: CourseDay[] = [
  day6,
  day7,
  day8,
  day9,
  day10,
  day11,
  day12,
  day13,
  day14,
  day15,
  day16,
  day17,
  day18,
  day19,
  day20,
];

/* ============================ WEEK 1 — DAYS 1–5 (moved from course-service.ts, content unchanged) ============================ */

const W1_GOAL: [number, number] = [35, 45];

function lineW1(id: string, text: string, es: string, chunks: string[], role?: "q" | "a"): ModelLine {
  return role ? { id, text, es, chunks, role } : { id, text, es, chunks };
}

const day1: CourseDay = {
  day: 1,
  focus: "I / You / We / They",
  focusEs: "Yo / Tú / Nosotros / Ellos",
  topic: "My Work Routine",
  topicEs: "Mi rutina de trabajo",
  goalSeconds: W1_GOAL,
  estimatedMinutes: "5–8 min",
  intro: {
    title: "SIMPLE PRESENT",
    titleEs: "PRESENTE SIMPLE",
    lead: "Use it for things you normally do.",
    leadEs: "Úsalo para las cosas que haces normalmente.",
    examples: ["I work.", "I study.", "I play."],
    goal: "Speak for 35–45 seconds.",
    goalEs: "Habla de 35 a 45 segundos.",
    cta: "START REP 1",
  },
  lines: [
    lineW1("d1-1", "I usually wake up around six thirty.", "Normalmente me levanto como a las seis y media.", ["I usually wake up", "around six thirty."]),
    lineW1("d1-2", "I have breakfast at home before I start work.", "Desayuno en casa antes de empezar a trabajar.", ["I have breakfast at home", "before I start work."]),
    lineW1("d1-3", "I start work at eight and I talk to customers every day.", "Empiezo a trabajar a las ocho y hablo con clientes todos los días.", ["I start work at eight", "and I talk to customers", "every day."]),
    lineW1("d1-4", "My coworkers and I usually have lunch together.", "Mis compañeros y yo normalmente almorzamos juntos.", ["My coworkers and I", "usually have lunch together."]),
    lineW1("d1-5", "We sometimes have very busy mornings.", "A veces tenemos mañanas muy ocupadas.", ["We sometimes have", "very busy mornings."]),
    lineW1("d1-6", "They usually help customers with different problems.", "Ellos normalmente ayudan a los clientes con diferentes problemas.", ["They usually help customers", "with different problems."]),
    lineW1("d1-7", "I like my job because I learn something new every week.", "Me gusta mi trabajo porque aprendo algo nuevo cada semana.", ["I like my job", "because I learn something new", "every week."]),
    lineW1("d1-8", "Overall, I really enjoy my routine.", "En general, disfruto mucho mi rutina.", ["Overall,", "I really enjoy my routine."]),
  ],
  prompts: [
    { id: "d1-p1", cue: "WHEN", question: "When do you usually wake up and start work?", questionEs: "¿Cuándo te levantas y empiezas a trabajar normalmente?", starter: "I usually wake up at… and I start…", starterEs: "Normalmente me levanto a las… y empiezo…" },
    { id: "d1-p3", cue: "WHERE", question: "Where do you work and what do you usually do there?", questionEs: "¿Dónde trabajas y qué haces normalmente ahí?", starter: "I work at… I usually…", starterEs: "Trabajo en… Normalmente…" },
    { id: "d1-p5", cue: "WHO", question: "Who do you work with and what do you do together?", questionEs: "¿Con quién trabajas y qué hacen juntos?", starter: "We usually…", starterEs: "Nosotros normalmente…" },
    { id: "d1-p7", cue: "WHAT", question: "What do other people do at your job?", questionEs: "¿Qué hacen las otras personas en tu trabajo?", starter: "They…", starterEs: "Ellos…" },
    { id: "d1-p8", cue: "WHY", question: "Why do you like your routine?", questionEs: "¿Por qué te gusta tu rutina?", starter: "I like ______ because…", starterEs: "Me gusta ______ porque…" },
  ],
  cues: ["ROUTINE", "WORK", "WE / THEY", "BECAUSE", "CONCLUSION"],
  rep5Prompt: {
    question: "What is your daily routine? / What do you do every day?",
    questionEs: "¿Cuál es tu rutina diaria? / ¿Qué haces todos los días?",
  },
  modelExample: {
    text: "I usually wake up around six thirty. I have breakfast at home before I start work. I start work at eight and I talk to customers every day. My coworkers and I usually have lunch together. We sometimes have very busy mornings. I like my job because I learn something new every week. Overall, I really enjoy my routine.",
    es: "Normalmente me levanto como a las seis y media. Desayuno en casa antes de empezar a trabajar. Empiezo a trabajar a las ocho y hablo con clientes todos los días. Mis compañeros y yo normalmente almorzamos juntos. A veces tenemos mañanas muy ocupadas. Me gusta mi trabajo porque aprendo algo nuevo cada semana. En general, disfruto mucho mi rutina.",
  },
};

const day2: CourseDay = {
  day: 2,
  focus: "He / She",
  focusEs: "Él / Ella",
  topic: "Someone I Know",
  topicEs: "Alguien que conozco",
  goalSeconds: W1_GOAL,
  estimatedMinutes: "5–8 min",
  intro: {
    title: "HE / SHE",
    titleEs: "ÉL / ELLA",
    lead: "Today we'll practice talking about another person.",
    leadEs: "Hoy vamos a practicar hablar de otra persona.",
    examples: ["He works.", "She works."],
    goal: "Speak for 35–45 seconds about another person.",
    goalEs: "Habla 35–45 segundos sobre otra persona.",
    cta: "START REP 1",
  },
  lines: [
    lineW1("d2-1", "My sister works from home.", "Mi hermana trabaja desde casa.", ["My sister", "works from home."]),
    lineW1("d2-2", "She usually starts work around seven.", "Ella normalmente empieza a trabajar como a las siete.", ["She usually starts work", "around seven."]),
    lineW1("d2-3", "She talks to customers every day.", "Ella habla con clientes todos los días.", ["She talks to customers", "every day."]),
    lineW1("d2-4", "My brother works in an office near his house.", "Mi hermano trabaja en una oficina cerca de su casa.", ["My brother works in an office", "near his house."]),
    lineW1("d2-5", "He usually starts at eight.", "Él normalmente empieza a las ocho.", ["He usually starts", "at eight."]),
    lineW1("d2-6", "She likes her job because it is flexible.", "A ella le gusta su trabajo porque es flexible.", ["She likes her job", "because it is flexible."]),
    lineW1("d2-7", "He sometimes works late because his team is busy.", "Él a veces trabaja hasta tarde porque su equipo está ocupado.", ["He sometimes works late", "because his team is busy."]),
    lineW1("d2-8", "Overall, they both enjoy their routines.", "En general, los dos disfrutan sus rutinas.", ["Overall,", "they both enjoy their routines."]),
  ],
  prompts: [
    { id: "d2-p1", cue: "WHO", question: "Who is someone you know, and where does he / she work?", questionEs: "¿Quién es alguien que conoces y dónde trabaja?", starter: "My ______ works at…", starterEs: "Mi ______ trabaja en…" },
    { id: "d2-p3", cue: "WHEN", question: "When does he / she start and finish?", questionEs: "¿Cuándo empieza y termina él / ella?", starter: "He starts at… and finishes…", starterEs: "Él empieza a las… y termina…" },
    { id: "d2-p4", cue: "WHAT", question: "What does he / she usually do at work?", questionEs: "¿Qué hace él / ella normalmente en el trabajo?", starter: "She usually…", starterEs: "Ella normalmente…" },
    { id: "d2-p5", cue: "HOW OFTEN", question: "How often does he / she do something different?", questionEs: "¿Con qué frecuencia hace algo diferente?", starter: "He sometimes… / Twice a week, she…", starterEs: "Él a veces… / Dos veces por semana, ella…" },
    { id: "d2-p6", cue: "WHY", question: "Why does he / she like the job?", questionEs: "¿Por qué le gusta el trabajo?", starter: "She likes it because…", starterEs: "Le gusta porque…" },
  ],
  cues: ["HE / SHE", "WORK", "USUALLY", "BECAUSE", "CONCLUSION"],
  rep5Prompt: {
    question: "Tell me about someone you know. What does he / she do every day?",
    questionEs: "Háblame de alguien que conoces. ¿Qué hace él / ella todos los días?",
  },
  modelExample: {
    text: "My sister works from home. She usually starts work around seven. She talks to customers every day. She likes her job because it is flexible. She sometimes works late because her team is busy. Overall, she really enjoys her routine.",
    es: "Mi hermana trabaja desde casa. Ella normalmente empieza a trabajar como a las siete. Habla con clientes todos los días. Le gusta su trabajo porque es flexible. A veces trabaja hasta tarde porque su equipo está ocupado. En general, disfruta mucho su rutina.",
  },
};

const day3: CourseDay = {
  day: 3,
  focus: "Don't / Doesn't",
  focusEs: "Don't / Doesn't (negativos)",
  topic: "Things We Do and Don't Do",
  topicEs: "Lo que hacemos y no hacemos",
  goalSeconds: W1_GOAL,
  estimatedMinutes: "5–8 min",
  intro: {
    title: "NEGATIVES",
    titleEs: "NEGATIVOS",
    lead: "Listen to the contrast.",
    leadEs: "Escucha el contraste.",
    examples: ["I don't work on Sundays.", "She doesn't work on Sundays."],
    goal: "Speak for 35–45 seconds using don't and doesn't.",
    goalEs: "Habla 35–45 segundos usando don't y doesn't.",
    cta: "START REP 1",
  },
  lines: [
    lineW1("d3-1", "I usually start work at eight.", "Normalmente empiezo a trabajar a las ocho.", ["I usually start work", "at eight."]),
    lineW1("d3-2", "I don't start work late.", "No empiezo a trabajar tarde.", ["I don't start work", "late."]),
    lineW1("d3-3", "We usually eat lunch together.", "Normalmente almorzamos juntos.", ["We usually eat lunch", "together."]),
    lineW1("d3-4", "We don't eat at our desks because we like to take a break.", "No comemos en nuestros escritorios porque nos gusta tomar un descanso.", ["We don't eat at our desks", "because we like", "to take a break."]),
    lineW1("d3-5", "My sister works from home.", "Mi hermana trabaja desde casa.", ["My sister", "works from home."]),
    lineW1("d3-6", "She doesn't work on Fridays.", "Ella no trabaja los viernes.", ["She doesn't work", "on Fridays."]),
    lineW1("d3-7", "My brother drinks coffee in the morning, but he doesn't drink it at night.", "Mi hermano toma café en la mañana, pero no lo toma en la noche.", ["My brother drinks coffee", "in the morning,", "but he doesn't drink it", "at night."]),
    lineW1("d3-8", "Overall, we all have different routines.", "En general, todos tenemos rutinas diferentes.", ["Overall,", "we all have", "different routines."]),
  ],
  prompts: [
    { id: "d3-p1", cue: "WHAT", question: "What do you usually do, and what don't you do?", questionEs: "¿Qué haces normalmente y qué no haces?", starter: "I usually… but I don't…", starterEs: "Normalmente yo… pero no…" },
    { id: "d3-p3", cue: "WHERE", question: "Where do you work, and what don't you do there?", questionEs: "¿Dónde trabajas y qué no haces ahí?", starter: "We usually… We don't…", starterEs: "Nosotros normalmente… No…" },
    { id: "d3-p5", cue: "WHO", question: "Who has a different routine? What does he / she do?", questionEs: "¿Quién tiene una rutina diferente? ¿Qué hace él / ella?", starter: "My ______ works… He / She doesn't…", starterEs: "Mi ______ trabaja… Él / Ella no…" },
    { id: "d3-p7", cue: "WHY", question: "Why don't you do something? Finish with overall.", questionEs: "¿Por qué no haces algo? Termina con overall.", starter: "I don't… because… Overall…", starterEs: "No… porque… En general…" },
  ],
  cues: ["I DON'T", "WE DON'T", "HE / SHE DOESN'T", "BECAUSE", "CONCLUSION"],
  rep5Prompt: {
    question: "What do you do — and what don't you do?",
    questionEs: "¿Qué haces — y qué no haces?",
  },
  modelExample: {
    text: "I usually start work at eight. I don't start work late. We usually eat lunch together, but we don't eat at our desks because we like to take a break. My sister works from home, but she doesn't work on Fridays. Overall, we all have different routines.",
    es: "Normalmente empiezo a trabajar a las ocho. No empiezo a trabajar tarde. Normalmente almorzamos juntos, pero no comemos en nuestros escritorios porque nos gusta tomar un descanso. Mi hermana trabaja desde casa, pero no trabaja los viernes. En general, todos tenemos rutinas diferentes.",
  },
};

const day4: CourseDay = {
  day: 4,
  focus: "Do / Does Questions",
  focusEs: "Preguntas con Do / Does",
  topic: "Ask & Answer",
  topicEs: "Preguntar y responder",
  goalSeconds: W1_GOAL,
  estimatedMinutes: "5–8 min",
  intro: {
    title: "QUESTIONS",
    titleEs: "PREGUNTAS",
    lead: "Today we ask and answer.",
    leadEs: "Hoy preguntamos y respondemos.",
    examples: ["Do you work?", "Does she work?"],
    goal: "Speak for 35–45 seconds asking and answering.",
    goalEs: "Habla 35–45 segundos preguntando y respondiendo.",
    cta: "START REP 1",
  },
  lines: [
    lineW1("d4-1q", "Do you work on Saturdays?", "¿Trabajas los sábados?", ["Do you work", "on Saturdays?"], "q"),
    lineW1("d4-1a", "No, I don't. I usually rest on Saturdays.", "No. Normalmente descanso los sábados.", ["No, I don't.", "I usually rest", "on Saturdays."], "a"),
    lineW1("d4-2q", "Where do you work?", "¿Dónde trabajas?", ["Where do you work?"], "q"),
    lineW1("d4-2a", "I work at a call center.", "Trabajo en un call center.", ["I work", "at a call center."], "a"),
    lineW1("d4-3q", "What time do you start work?", "¿A qué hora empiezas a trabajar?", ["What time", "do you start work?"], "q"),
    lineW1("d4-3a", "I usually start at eight.", "Normalmente empiezo a las ocho.", ["I usually start", "at eight."], "a"),
    lineW1("d4-4q", "Do you like your job?", "¿Te gusta tu trabajo?", ["Do you like", "your job?"], "q"),
    lineW1("d4-4a", "Yes, I do, because I learn new things.", "Sí, porque aprendo cosas nuevas.", ["Yes, I do,", "because I learn new things."], "a"),
    lineW1("d4-5q", "Does your sister work from home?", "¿Tu hermana trabaja desde casa?", ["Does your sister", "work from home?"], "q"),
    lineW1("d4-5a", "Yes, she does. She works from home three days a week.", "Sí. Trabaja desde casa tres días a la semana.", ["Yes, she does.", "She works from home", "three days a week."], "a"),
    lineW1("d4-6q", "Where does your brother work?", "¿Dónde trabaja tu hermano?", ["Where does", "your brother work?"], "q"),
    lineW1("d4-6a", "He works in an office.", "Trabaja en una oficina.", ["He works", "in an office."], "a"),
    lineW1("d4-7q", "What time does she start?", "¿A qué hora empieza ella?", ["What time", "does she start?"], "q"),
    lineW1("d4-7a", "She usually starts around seven.", "Ella normalmente empieza como a las siete.", ["She usually starts", "around seven."], "a"),
    lineW1("d4-8q", "Does he work on weekends?", "¿Él trabaja los fines de semana?", ["Does he work", "on weekends?"], "q"),
    lineW1("d4-8a", "No, he doesn't. He works Monday to Friday.", "No. Trabaja de lunes a viernes.", ["No, he doesn't.", "He works", "Monday to Friday."], "a"),
  ],
  prompts: [
    { id: "d4-p1", cue: "WHEN", question: "When do you work? Do you work on weekends?", questionEs: "¿Cuándo trabajas? ¿Trabajas los fines de semana?", starter: "I usually start at… No, I don't… / Yes, I do…", starterEs: "Normalmente empiezo a las… No… / Sí…" },
    { id: "d4-p3", cue: "WHERE", question: "Where do you work or study, and why do you like it?", questionEs: "¿Dónde trabajas o estudias y por qué te gusta?", starter: "I work at… I like it because…", starterEs: "Trabajo en… Me gusta porque…" },
    { id: "d4-p4", cue: "WHO", question: "Who in your family works from home? Does he / she like it?", questionEs: "¿Quién de tu familia trabaja desde casa? ¿Le gusta?", starter: "My ______ works from home. Yes, she does… / No, he doesn't…", starterEs: "Mi ______ trabaja desde casa. Sí… / No…" },
    { id: "d4-p5", cue: "ASK", question: "Ask a question using DO, then answer it.", questionEs: "Haz una pregunta con DO y respóndela.", starter: "Do you…? Yes, I do… / No, I don't…", starterEs: "¿Tú…? Sí… / No…" },
    { id: "d4-p6", cue: "ASK", question: "Ask a question using DOES, then answer it.", questionEs: "Haz una pregunta con DOES y respóndela.", starter: "Does he / she…? Yes, she does… / No, he doesn't…", starterEs: "¿Él / Ella…? Sí… / No…" },
  ],
  cues: ["DO YOU…?", "DOES HE / SHE…?", "YES, I DO", "NO, HE DOESN'T", "BECAUSE"],
  rep5Prompt: {
    question: "What do you do every day? Ask and answer your own questions.",
    questionEs: "¿Qué haces todos los días? Pregúntate y respóndete.",
  },
  modelExample: {
    text: "Do I work on Saturdays? No, I don't. I usually rest on Saturdays. Where do I work? I work at a call center. What time do I start? I usually start at eight. Do I like my job? Yes, I do, because I learn new things. Does my sister work from home? Yes, she does. She works from home three days a week.",
    es: "¿Trabajo los sábados? No. Normalmente descanso los sábados. ¿Dónde trabajo? Trabajo en un call center. ¿A qué hora empiezo? Normalmente empiezo a las ocho. ¿Me gusta mi trabajo? Sí, porque aprendo cosas nuevas. ¿Mi hermana trabaja desde casa? Sí. Trabaja desde casa tres días a la semana.",
  },
};

const day5: CourseDay = {
  day: 5,
  focus: "Fluency Challenge",
  focusEs: "Reto de fluidez",
  topic: "Simple Present Fluency Challenge",
  topicEs: "Reto de fluidez de presente simple",
  goalSeconds: W1_GOAL,
  estimatedMinutes: "6–10 min",
  intro: {
    title: "SIMPLE PRESENT CHALLENGE",
    titleEs: "RETO DE PRESENTE SIMPLE",
    lead: "Use everything you practiced this week.",
    leadEs: "Usa todo lo que practicaste esta semana.",
    examples: ["I usually…", "She doesn't…", "Do you…?"],
    goal: "Speak for 35–45 seconds in each challenge.",
    goalEs: "Habla 35–45 segundos en cada reto.",
    cta: "START CHALLENGE",
  },
  lines: [
    lineW1("d5-1", "I usually start my day early.", "Normalmente empiezo mi día temprano.", ["I usually start", "my day early."]),
    lineW1("d5-2", "We don't have the same schedule every day.", "No tenemos el mismo horario todos los días.", ["We don't have", "the same schedule", "every day."]),
    lineW1("d5-3", "My manager works from home twice a week.", "Mi jefe trabaja desde casa dos veces por semana.", ["My manager works from home", "twice a week."]),
    lineW1("d5-4", "She usually starts before the rest of the team.", "Ella normalmente empieza antes que el resto del equipo.", ["She usually starts", "before the rest of the team."]),
    lineW1("d5-5", "My brother doesn't work on Saturdays.", "Mi hermano no trabaja los sábados.", ["My brother doesn't work", "on Saturdays."]),
    lineW1("d5-6", "I like my routine because it keeps me busy.", "Me gusta mi rutina porque me mantiene ocupado.", ["I like my routine", "because it keeps me busy."]),
    lineW1("d5-7", "Do you usually work in the morning?", "¿Normalmente trabajas en la mañana?", ["Do you usually work", "in the morning?"], "q"),
    lineW1("d5-8", "Does your manager work from home?", "¿Tu jefe trabaja desde casa?", ["Does your manager", "work from home?"], "q"),
    lineW1("d5-9", "They sometimes work late because their customers need help.", "Ellos a veces trabajan tarde porque sus clientes necesitan ayuda.", ["They sometimes work late", "because their customers", "need help."]),
    lineW1("d5-10", "Overall, our routines are different, but they work well for us.", "En general, nuestras rutinas son diferentes, pero nos funcionan bien.", ["Overall, our routines are different,", "but they work well for us."]),
  ],
  prompts: [
    { id: "d5-p1", cue: "WHAT", question: "What is your daily routine, and what don't you do?", questionEs: "¿Cuál es tu rutina diaria y qué no haces?", starter: "I usually… I don't…", starterEs: "Normalmente yo… No…" },
    { id: "d5-p3", cue: "WHO", question: "Who has a different routine? What does he / she do and not do?", questionEs: "¿Quién tiene una rutina diferente? ¿Qué hace y qué no hace?", starter: "My ______ usually… She doesn't…", starterEs: "Mi ______ normalmente… Ella no…" },
    { id: "d5-p5", cue: "HOW OFTEN", question: "How often do you do something different? Why?", questionEs: "¿Con qué frecuencia haces algo diferente? ¿Por qué?", starter: "I sometimes… because…", starterEs: "A veces yo… porque…" },
    { id: "d5-p6", cue: "ASK", question: "Ask one question with DO or DOES, then answer it.", questionEs: "Haz una pregunta con DO o DOES y respóndela.", starter: "Do you…? / Does she…?", starterEs: "¿Tú…? / ¿Ella…?" },
  ],
  cues: ["ROUTINE", "HE / SHE", "DON'T / DOESN'T", "DO / DOES?", "BECAUSE"],
  rep5Prompt: {
    question: "What is your daily routine? / What do you do every day?",
    questionEs: "¿Cuál es tu rutina diaria? / ¿Qué haces todos los días?",
  },
  challenges: [
    {
      id: "c1",
      title: "TALK ABOUT YOUR ROUTINE",
      titleEs: "HABLA DE TU RUTINA",
      detail: "35–45 seconds. Use affirmatives, negatives, frequency words and because.",
      detailEs: "35–45 segundos. Usa afirmativos, negativos, palabras de frecuencia y because.",
      cues: ["I USUALLY", "I DON'T", "SOMETIMES", "BECAUSE"],
    },
    {
      id: "c2",
      title: "TALK ABOUT SOMEONE ELSE",
      titleEs: "HABLA DE OTRA PERSONA",
      detail: "35–45 seconds. Use He / She, third-person -S, doesn't and because.",
      detailEs: "35–45 segundos. Usa He / She, la -S de tercera persona, doesn't y because.",
      cues: ["HE / SHE", "WORKS", "DOESN'T", "BECAUSE"],
    },
    {
      id: "c3",
      title: "QUESTIONS & ANSWERS",
      titleEs: "PREGUNTAS Y RESPUESTAS",
      detail: "Ask and answer with Do and Does.",
      detailEs: "Pregunta y responde con Do y Does.",
      cues: ["DO YOU…?", "DOES HE…?", "YES, I DO", "NO, SHE DOESN'T"],
    },
  ],
  
  modelExample: {
    text: "I usually start my day early. We don't have the same schedule every day. My manager works from home twice a week. She usually starts before the rest of the team. My brother doesn't work on Saturdays. I like my routine because it keeps me busy. Overall, our routines are different, but they work well for us.",
    es: "Normalmente empiezo mi día temprano. No tenemos el mismo horario todos los días. Mi jefa trabaja desde casa dos veces por semana. Ella normalmente empieza antes que el resto del equipo. Mi hermano no trabaja los sábados. Me gusta mi rutina porque me mantiene ocupado. En general, nuestras rutinas son diferentes, pero nos funcionan bien.",
  },
};

const WEEK_1 = SIMPLE_PRESENT_WEEKS[0]!;

/** Week 1 (Days 1–5) exactly as built, tagged so Home can group it by week. */
const WEEK_1_DAYS: CourseDay[] = [day1, day2, day3, day4, day5].map((d) => ({
  ...d,
  week: 1 as const,
  weekTitle: WEEK_1.title,
  weekTitleEs: WEEK_1.subtitleEs,
}));

/** All 20 Simple Present days: Week 1 (built first) + Weeks 2–4. */
export const SIMPLE_PRESENT_DAYS: CourseDay[] = [...WEEK_1_DAYS, ...SIMPLE_PRESENT_EXTRA_DAYS];
