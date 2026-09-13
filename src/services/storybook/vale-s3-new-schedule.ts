import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s3-ep1/cover.jpg";
import s1 from "@/assets/storybook/vale-s3-ep1/s1.jpg";
import s2 from "@/assets/storybook/vale-s3-ep1/s2.jpg";
import s3 from "@/assets/storybook/vale-s3-ep1/s3.jpg";
import s4 from "@/assets/storybook/vale-s3-ep1/s4.jpg";
import s5 from "@/assets/storybook/vale-s3-ep1/s5.jpg";
import s6 from "@/assets/storybook/vale-s3-ep1/s6.jpg";
import s7 from "@/assets/storybook/vale-s3-ep1/s7.jpg";
import s8 from "@/assets/storybook/vale-s3-ep1/s8.jpg";
import s9 from "@/assets/storybook/vale-s3-ep1/s9.jpg";
import s10 from "@/assets/storybook/vale-s3-ep1/s10.jpg";

/**
 * Season 3 · Episode 1 — "Vale's new schedule".
 * Matches Basic 2 / Simple Present Week 1 Day 1: daily routines (I / my schedule).
 */
export const VALE_S3_NEW_SCHEDULE: StorybookEpisode = {
  id: "vale-s3-new-schedule",
  moduleId: "simple-present",
  week: 1,
  title: "Vale's new schedule",
  titleEs: "El nuevo horario de Vale",
  episodeLabel: { en: "Season 3 · Episode 1", es: "Temporada 3 · Episodio 1" },
  reviewWords: [
    { word: "ready", es: "lista / listo" },
    { word: "plan", es: "plan" },
    { word: "job", es: "trabajo" },
    { word: "team", es: "equipo" },
  ],
  blurb: {
    en: "Vale starts Basic 2. Today she shows her daily routine at the call center.",
    es: "Vale empieza Básico 2. Hoy muestra su rutina diaria en el call center.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale mira su teléfono con el nuevo horario.",
      text: "It is Monday. Vale has a new schedule.",
      es: "Es lunes. Vale tiene un nuevo horario.",
      words: [
        { word: "Monday", es: "lunes" },
        { word: "schedule", es: "horario" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale se despierta con el despertador a las 6:00.",
      text: "She wakes up at six o'clock.",
      es: "Ella se despierta a las seis en punto.",
      words: [
        { word: "wakes up", es: "se despierta" },
        { word: "six", es: "seis" },
        { word: "o'clock", es: "en punto" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale se viste y desayuna rápido.",
      text: "She gets dressed and eats breakfast.",
      es: "Ella se viste y desayuna.",
      words: [
        { word: "gets dressed", es: "se viste" },
        { word: "eats", es: "come" },
        { word: "breakfast", es: "desayuno" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale aborda el autobús.",
      text: "At six forty-five she takes the bus.",
      es: "A las seis cuarenta y cinco toma el autobús.",
      words: [
        { word: "forty-five", es: "cuarenta y cinco" },
        { word: "takes", es: "toma" },
        { word: "bus", es: "autobús" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale llega a la oficina.",
      text: "She arrives at the office at seven thirty.",
      es: "Ella llega a la oficina a las siete treinta.",
      words: [
        { word: "arrives", es: "llega" },
        { word: "office", es: "oficina" },
        { word: "seven", es: "siete" },
        { word: "thirty", es: "treinta" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "El jefe le indica a Vale su hora de entrada.",
      text: '"Your shift starts at eight," says the boss.',
      es: "«Tu turno empieza a las ocho», dice el jefe.",
      speaker: "boss",
      words: [
        { word: "shift", es: "turno" },
        { word: "starts", es: "empieza" },
        { word: "eight", es: "ocho" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale enciende su computadora y abre el chat.",
      text: "Vale turns on her computer and opens the chat.",
      es: "Vale enciende su computadora y abre el chat.",
      speaker: "vale",
      words: [
        { word: "turns on", es: "enciende" },
        { word: "computer", es: "computadora" },
        { word: "opens", es: "abre" },
        { word: "chat", es: "chat" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale almuerza con Kat al mediodía.",
      text: "At twelve o'clock she eats lunch with Kat.",
      es: "A las doce en punto almuerza con Kat.",
      words: [
        { word: "twelve", es: "doce" },
        { word: "lunch", es: "almuerzo" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale termina su turno a las cuatro.",
      text: "She finishes work at four o'clock.",
      es: "Ella termina el trabajo a las cuatro en punto.",
      words: [
        { word: "finishes", es: "termina" },
        { word: "work", es: "trabajo" },
        { word: "four", es: "cuatro" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale sonríe feliz con su rutina.",
      text: '"I like my new routine," says Vale.',
      es: "«Me gusta mi nueva rutina», dice Vale.",
      speaker: "vale",
      words: [
        { word: "routine", es: "rutina" },
        { word: "new", es: "nuevo / nueva" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What time does Vale wake up?",
      questionEs: "¿A qué hora se despierta Vale?",
      options: [
        { label: "At six o'clock", emoji: "🕕" },
        { label: "At seven thirty", emoji: "🕢" },
        { label: "At four o'clock", emoji: "🕓" },
      ],
      answer: 0,
      sayIt: "She wakes up at six o'clock.",
      sayItEs: "Ejemplo: «She wakes up at six o'clock.»",
      sayItAskEn: "What time do you wake up?",
      sayItAskEs: "¿A qué hora te despiertas tú?",
      sayItCheck: {
        target: "I wake up at *",
        altTargets: ["at *", "* o'clock"],
      },
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "What time does Vale's shift start?",
      questionEs: "¿A qué hora empieza el turno de Vale?",
      options: [
        { label: "At eight o'clock", emoji: "🕗" },
        { label: "At six o'clock", emoji: "🕕" },
        { label: "At twelve o'clock", emoji: "🕛" },
      ],
      answer: 0,
      sayIt: "Her shift starts at eight o'clock.",
      sayItEs: "Ejemplo: «Her shift starts at eight o'clock.»",
      sayItAskEn: "What time do you start work or school?",
      sayItAskEs: "¿A qué hora empiezas tú el trabajo o la escuela?",
      sayItCheck: {
        target: "I start at *",
        altTargets: ["at *"],
      },
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "Does Vale finish work at four o'clock?",
      questionEs: "¿Vale termina el trabajo a las cuatro en punto?",
      options: [
        { label: "Yes, she does", emoji: "✅" },
        { label: "No, she doesn't", emoji: "❌" },
        { label: "She eats lunch", emoji: "🍱" },
      ],
      answer: 0,
      sayIt: "Yes, she does.",
      sayItEs: "Ejemplo: «Yes, she does.»",
      sayItAskEn: "What time do you finish work or school?",
      sayItAskEs: "¿A qué hora terminas tú el trabajo o la escuela?",
      sayItCheck: {
        target: "I finish at *",
        altTargets: ["at *", "yes"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s5",
    phrase: "I am disciplined.",
    es: "Yo soy disciplinada/o.",
  },
  continuePrompt: {
    en: "Now tell us about your daily routine. What time do you wake up, start and finish?",
    es: "Ahora cuéntanos tu rutina diaria. ¿A qué hora te despiertas, empiezas y terminas?",
  },
  continueWith: [
    "I wake up at…",
    "I eat breakfast at…",
    "I start work/school at…",
    "I finish at…",
  ],
  cliffhanger: {
    en: "Episode 2: Kat's routine — she arrives early, but why?",
    es: "Episodio 2: La rutina de Kat — ella llega temprano, ¿pero por qué?",
  },
};
