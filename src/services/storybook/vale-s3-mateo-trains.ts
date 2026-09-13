import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s3-ep7/cover.jpg";
import s1 from "@/assets/storybook/vale-s3-ep7/s1.jpg";
import s2 from "@/assets/storybook/vale-s3-ep7/s2.jpg";
import s3 from "@/assets/storybook/vale-s3-ep7/s3.jpg";
import s4 from "@/assets/storybook/vale-s3-ep7/s4.jpg";
import s5 from "@/assets/storybook/vale-s3-ep7/s5.jpg";
import s6 from "@/assets/storybook/vale-s3-ep7/s6.jpg";
import s7 from "@/assets/storybook/vale-s3-ep7/s7.jpg";
import s8 from "@/assets/storybook/vale-s3-ep7/s8.jpg";
import s9 from "@/assets/storybook/vale-s3-ep7/s9.jpg";
import s10 from "@/assets/storybook/vale-s3-ep7/s10.jpg";

/**
 * Season 3 · Episode 7 — "Mateo trains".
 * Basic 2 / Simple Present Week 2 Day 7: an athlete's routine, do/does questions.
 */
export const VALE_S3_MATEO_TRAINS: StorybookEpisode = {
  id: "vale-s3-mateo-trains",
  moduleId: "simple-present",
  week: 2,
  title: "Mateo trains",
  titleEs: "Mateo entrena",
  episodeLabel: { en: "Season 3 · Episode 7", es: "Temporada 3 · Episodio 7" },
  previously: [
    { en: "Vale learned her mom's routine.", es: "Vale aprendió la rutina de su mamá." },
    { en: "Mateo invited her to train at six.", es: "Mateo la invitó a entrenar a las seis." },
  ],
  reviewWords: [
    { word: "wakes up", es: "se despierta" },
    { word: "breakfast", es: "desayuno" },
    { word: "does not", es: "no (hace)" },
    { word: "every day", es: "todos los días" },
  ],
  blurb: {
    en: "Mateo plays soccer before work. Vale discovers his discipline.",
    es: "Mateo juega fútbol antes del trabajo. Vale descubre su disciplina.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Mateo corre en la cancha temprano.",
      text: "Mateo trains every morning at six o'clock.",
      es: "Mateo entrena todas las mañanas a las seis en punto.",
      speaker: "narrator",
      words: [
        { word: "trains", es: "entrena" },
        { word: "morning", es: "mañana" },
        { word: "six", es: "seis" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale llega con sueño a la cancha.",
      text: "Vale arrives with sleepy eyes and a big coffee.",
      es: "Vale llega con ojos de sueño y un café grande.",
      words: [
        { word: "arrives", es: "llega" },
        { word: "sleepy", es: "con sueño" },
        { word: "eyes", es: "ojos" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Mateo hace ejercicios de calentamiento.",
      text: "First, he stretches. Then he runs ten minutes.",
      es: "Primero, se estira. Luego corre diez minutos.",
      speaker: "mateo",
      words: [
        { word: "stretches", es: "se estira" },
        { word: "runs", es: "corre" },
        { word: "minutes", es: "minutos" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Mateo practica tiros con el balón.",
      text: "He practices with the ball for thirty minutes.",
      es: "Practica con el balón por treinta minutos.",
      words: [
        { word: "practices", es: "practica" },
        { word: "ball", es: "balón" },
        { word: "thirty", es: "treinta" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale intenta correr y se cansa.",
      text: "Vale runs, but she gets tired fast.",
      es: "Vale corre, pero se cansa rápido.",
      speaker: "vale",
      words: [
        { word: "tired", es: "cansada" },
        { word: "fast", es: "rápido" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Mateo anima a Vale.",
      text: "Mateo says: \"Mistakes are part of the process. Try again.\"",
      es: "Mateo dice: «Los errores son parte del proceso. Intenta otra vez.»",
      speaker: "mateo",
      words: [
        { word: "Mistakes", es: "errores" },
        { word: "process", es: "proceso" },
        { word: "again", es: "otra vez" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Mateo toma agua y no toma soda.",
      text: "He drinks water. He does not drink soda before a game.",
      es: "Él toma agua. No toma soda antes de un partido.",
      words: [
        { word: "drinks", es: "toma / bebe" },
        { word: "water", es: "agua" },
        { word: "game", es: "partido" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Mateo habla de su sueño mientras camina.",
      text: "Mateo says: \"Next year I am going to try for a real team.\"",
      es: "Mateo dice: «El próximo año voy a probar con un equipo real.»",
      speaker: "mateo",
      words: [
        { word: "Next year", es: "el próximo año" },
        { word: "going to", es: "voy a" },
        { word: "team", es: "equipo" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale y Mateo caminan al trabajo juntos.",
      text: "At seven thirty they walk to the office together.",
      es: "A las siete y media caminan juntos a la oficina.",
      words: [
        { word: "walk", es: "caminar" },
        { word: "together", es: "juntos" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Un guardia del barrio los saluda.",
      text: "A neighborhood guard says good morning. He works every day too.",
      es: "Un guardia del barrio les da los buenos días. Él también trabaja todos los días.",
      words: [
        { word: "neighborhood", es: "barrio" },
        { word: "guard", es: "guardia" },
        { word: "too", es: "también" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "When does Mateo train?",
      questionEs: "¿Cuándo entrena Mateo?",
      options: [
        { label: "At six in the morning", emoji: "🌅" },
        { label: "At night", emoji: "🌙" },
        { label: "On Sunday only", emoji: "📅" },
      ],
      answer: 0,
      sayIt: "He trains at six in the morning.",
      sayItEs: "Repite: «He trains at six in the morning.»",
      sayItCheck: { target: "He trains at six in the morning" },
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "Does Mateo drink soda before a game?",
      questionEs: "¿Mateo toma soda antes de un partido?",
      options: [
        { label: "No, he doesn't", emoji: "🚫" },
        { label: "Yes, he does", emoji: "🥤" },
        { label: "He drinks milk", emoji: "🥛" },
      ],
      answer: 0,
      sayIt: "No, I don't drink soda.",
      sayItEs: "Ejemplo: «No, I don't drink soda.»",
      sayItAskEn: "Do you drink soda every day?",
      sayItAskEs: "¿Tú tomas soda todos los días?",
      sayItCheck: {
        target: "No, I don't",
        altTargets: ["Yes, I do", "I don't drink soda", "I drink soda *"],
      },
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "How do Vale and Mateo go to the office?",
      questionEs: "¿Cómo van Vale y Mateo a la oficina?",
      options: [
        { label: "They walk", emoji: "🚶" },
        { label: "They fly", emoji: "✈️" },
        { label: "They swim", emoji: "🏊" },
      ],
      answer: 0,
      sayIt: "I go to work by bus.",
      sayItEs: "Ejemplo: «I go to work by bus.»",
      sayItAskEn: "How do you go to work or school?",
      sayItAskEs: "¿Cómo vas tú al trabajo o a la escuela?",
      sayItCheck: {
        target: "I go * by *",
        altTargets: ["I walk *", "I take the *", "I go by *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s6",
    phrase: "I love challenges.",
    es: "Amo los retos.",
  },
  continuePrompt: {
    en: "Talk about your morning. What do you do before work or school?",
    es: "Habla de tu mañana. ¿Qué haces antes del trabajo o la escuela?",
  },
  continueWith: [
    "I wake up at…",
    "First, I…",
    "Then I…",
    "I do not…",
  ],
  cliffhanger: {
    en: "Episode 8: the guard of the neighborhood has a secret routine.",
    es: "Episodio 8: el guardia del barrio tiene una rutina secreta.",
  },
};
