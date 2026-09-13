import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s3-ep9/cover.jpg";
import s1 from "@/assets/storybook/vale-s3-ep9/s1.jpg";
import s2 from "@/assets/storybook/vale-s3-ep9/s2.jpg";
import s3 from "@/assets/storybook/vale-s3-ep9/s3.jpg";
import s4 from "@/assets/storybook/vale-s3-ep9/s4.jpg";
import s5 from "@/assets/storybook/vale-s3-ep9/s5.jpg";
import s6 from "@/assets/storybook/vale-s3-ep9/s6.jpg";
import s7 from "@/assets/storybook/vale-s3-ep9/s7.jpg";
import s8 from "@/assets/storybook/vale-s3-ep9/s8.jpg";
import s9 from "@/assets/storybook/vale-s3-ep9/s9.jpg";
import s10 from "@/assets/storybook/vale-s3-ep9/s10.jpg";

/**
 * Season 3 · Episode 9 — "Ana rehearses".
 * Basic 2 / Simple Present Week 2 Day 9: a singer's routine, how often + WH questions.
 */
export const VALE_S3_ANA_REHEARSES: StorybookEpisode = {
  id: "vale-s3-ana-rehearses",
  moduleId: "simple-present",
  week: 2,
  title: "Ana rehearses",
  titleEs: "Ana ensaya",
  episodeLabel: { en: "Season 3 · Episode 9", es: "Temporada 3 · Episodio 9" },
  previously: [
    { en: "Vale met Don Tito, the night guard.", es: "Vale conoció a Don Tito, el guardia nocturno." },
    { en: "Ana sings quietly at the office.", es: "Ana canta bajito en la oficina." },
  ],
  reviewWords: [
    { word: "practice", es: "práctica" },
    { word: "never", es: "nunca" },
    { word: "sings", es: "canta" },
    { word: "studies", es: "estudia" },
  ],
  blurb: {
    en: "Ana has a secret: she practices for a big casting in English.",
    es: "Ana tiene un secreto: practica para un gran casting en inglés.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Ana canta con audífonos en su escritorio.",
      text: "Ana sings every day. She listens to music in English.",
      es: "Ana canta todos los días. Escucha música en inglés.",
      speaker: "narrator",
      words: [
        { word: "sings", es: "canta" },
        { word: "listens", es: "escucha" },
        { word: "music", es: "música" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale descubre a Ana cantando.",
      text: "Vale asks: \"How often do you practice?\"",
      es: "Vale pregunta: «¿Con qué frecuencia practicas?»",
      speaker: "vale",
      words: [
        { word: "How often", es: "con qué frecuencia" },
        { word: "practice", es: "practicar" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Ana cuenta con los dedos.",
      text: "Ana answers: \"I practice three times a week.\"",
      es: "Ana responde: «Practico tres veces por semana.»",
      speaker: "female",
      words: [
        { word: "three times", es: "tres veces" },
        { word: "a week", es: "por semana" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Ana calienta la voz frente al espejo.",
      text: "First, she warms up her voice. Then she repeats the song.",
      es: "Primero, calienta la voz. Luego repite la canción.",
      words: [
        { word: "warms up", es: "calienta" },
        { word: "repeats", es: "repite" },
        { word: "song", es: "canción" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Ana escribe la letra en un cuaderno.",
      text: "She writes the words. She does not memorize everything fast.",
      es: "Ella escribe las palabras. No memoriza todo rápido.",
      words: [
        { word: "writes", es: "escribe" },
        { word: "memorize", es: "memorizar" },
        { word: "everything", es: "todo" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Ana se pone nerviosa y respira.",
      text: "Ana says: \"I get nervous, but I believe in myself.\"",
      es: "Ana dice: «Me pongo nerviosa, pero creo en mí misma.»",
      speaker: "female",
      words: [
        { word: "nervous", es: "nerviosa" },
        { word: "believe", es: "creer" },
        { word: "myself", es: "mí misma" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Ana muestra el volante del casting.",
      text: "\"Next Friday I am going to sing at a casting,\" she says.",
      es: "«El próximo viernes voy a cantar en un casting», dice.",
      speaker: "female",
      words: [
        { word: "Next Friday", es: "el próximo viernes" },
        { word: "going to", es: "voy a" },
        { word: "casting", es: "casting / audición" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale ayuda a Ana con la pronunciación.",
      text: "Vale helps her with the pronunciation of every word.",
      es: "Vale la ayuda con la pronunciación de cada palabra.",
      speaker: "vale",
      words: [
        { word: "pronunciation", es: "pronunciación" },
        { word: "every", es: "cada" },
        { word: "word", es: "palabra" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Ana y Vale chocan las manos.",
      text: "Ana smiles: \"You will be a great teacher one day.\"",
      es: "Ana sonríe: «Un día vas a ser una gran maestra.»",
      speaker: "female",
      words: [
        { word: "smiles", es: "sonríe" },
        { word: "great", es: "grande / genial" },
        { word: "teacher", es: "maestra" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Mr. Reyes llama al equipo a una reunión.",
      text: "Then Mr. Reyes calls the team. Tomorrow there is a routine challenge.",
      es: "Luego Mr. Reyes llama al equipo. Mañana hay un reto de rutinas.",
      speaker: "boss",
      words: [
        { word: "calls", es: "llama" },
        { word: "challenge", es: "reto" },
        { word: "Tomorrow", es: "mañana" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "How often does Ana practice?",
      questionEs: "¿Con qué frecuencia practica Ana?",
      options: [
        { label: "Three times a week", emoji: "🎤" },
        { label: "Once a year", emoji: "📆" },
        { label: "Never", emoji: "🚫" },
      ],
      answer: 0,
      sayIt: "She practices three times a week.",
      sayItEs: "Repite: «She practices three times a week.»",
      sayItCheck: { target: "She practices three times a week" },
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "What does Ana do when she is nervous?",
      questionEs: "¿Qué hace Ana cuando está nerviosa?",
      options: [
        { label: "She believes in herself", emoji: "💪" },
        { label: "She stops singing", emoji: "🛑" },
        { label: "She goes home", emoji: "🏠" },
      ],
      answer: 0,
      sayIt: "I practice every night.",
      sayItEs: "Ejemplo: «I practice every night.»",
      sayItAskEn: "When do you practice English?",
      sayItAskEs: "¿Cuándo practicas inglés tú?",
      sayItCheck: {
        target: "I practice *",
        altTargets: ["I study English *", "Every *"],
      },
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "What kind of music do you listen to?",
      questionEs: "¿Qué tipo de música escuchas?",
      options: [
        { label: "Music in English", emoji: "🎧" },
        { label: "Reggaeton", emoji: "🔥" },
        { label: "Romantic music", emoji: "💗" },
      ],
      answer: 0,
      sayIt: "I listen to music in English.",
      sayItEs: "Ejemplo: «I listen to music in English.»",
      sayItAskEn: "What music do you listen to every day?",
      sayItAskEs: "¿Qué música escuchas todos los días?",
      sayItCheck: {
        target: "I listen to *",
        altTargets: ["I listen *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s6",
    phrase: "I believe in myself.",
    es: "Creo en mí misma.",
  },
  continuePrompt: {
    en: "Talk about your practice. How often do you study English and how do you do it?",
    es: "Habla de tu práctica. ¿Con qué frecuencia estudias inglés y cómo lo haces?",
  },
  continueWith: [
    "I practice…",
    "First, I…",
    "Then I…",
    "I do not…",
  ],
  cliffhanger: {
    en: "Episode 10: the routine challenge. Who knows the team best?",
    es: "Episodio 10: el reto de rutinas. ¿Quién conoce mejor al equipo?",
  },
};
