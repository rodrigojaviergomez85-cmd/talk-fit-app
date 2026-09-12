import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-ep15/cover.jpg";
import s1 from "@/assets/storybook/vale-ep15/s1.jpg";
import s2 from "@/assets/storybook/vale-ep15/s2.jpg";
import s3 from "@/assets/storybook/vale-ep15/s3.jpg";
import s4 from "@/assets/storybook/vale-ep15/s4.jpg";
import s5 from "@/assets/storybook/vale-ep15/s5.jpg";
import s6 from "@/assets/storybook/vale-ep15/s6.jpg";
import s7 from "@/assets/storybook/vale-ep15/s7.jpg";
import s8 from "@/assets/storybook/vale-ep15/s8.jpg";
import s9 from "@/assets/storybook/vale-ep15/s9.jpg";
import s10 from "@/assets/storybook/vale-ep15/s10.jpg";

/**
 * Season 2 · Episode 15 — "The will challenge".
 * Basic 1 / Simple Future Week 3 Day 5: integration of will / won't.
 */
export const VALE_S2_WILL_CHALLENGE: StorybookEpisode = {
  id: "vale-s2-will-challenge",
  moduleId: "simple-future",
  week: 3,
  title: "The will challenge",
  titleEs: "El reto del will",
  episodeLabel: { en: "Season 2 · Episode 15", es: "Temporada 2 · Episodio 15" },
  previously: [
    { en: "Everybody shared their future.", es: "Todos compartieron su futuro." },
    { en: "Vale will open a free English school.", es: "Vale abrirá una escuela de inglés gratis." },
    { en: "Ana gave them a new challenge card.", es: "Ana les dio una nueva tarjeta de reto." },
  ],
  reviewWords: [
    { word: "dream", es: "sueño" },
    { word: "company", es: "empresa" },
    { word: "neighborhood", es: "colonia / barrio" },
    { word: "card", es: "tarjeta" },
  ],
  blurb: {
    en: "One full day in English. Every decision starts with \"I'll\".",
    es: "Un día completo en inglés. Cada decisión empieza con «I'll».",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "La tarjeta del reto sobre la mesa.",
      text: "The card says: \"English only. All day.\"",
      es: "La tarjeta dice: «Solo inglés. Todo el día.»",
      words: [
        { word: "only", es: "solo" },
        { word: "all", es: "todo" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale despierta temprano.",
      text: "Vale wakes up early. \"I'll start now.\"",
      es: "Vale despierta temprano. «Empezaré ahora.»",
      speaker: "vale",
      words: [
        { word: "wakes", es: "despierta" },
        { word: "early", es: "temprano" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale en el bus con audífonos.",
      text: "On the bus she thinks: \"I won't use Spanish at work.\"",
      es: "En el bus piensa: «No usaré español en el trabajo.»",
      speaker: "vale",
      words: [
        { word: "bus", es: "bus" },
        { word: "use", es: "usar" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Un cliente confundido en la llamada.",
      text: "A client has a problem. Vale answers fast: \"I'll check it for you.\"",
      es: "Un cliente tiene un problema. Vale responde rápido: «Lo revisaré para usted.»",
      speaker: "vale",
      words: [
        { word: "client", es: "cliente" },
        { word: "check", es: "revisar" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale se traba con una palabra.",
      text: "She forgets one word. Her face is red.",
      es: "Ella olvida una palabra. Su cara está roja.",
      words: [
        { word: "forgets", es: "olvida" },
        { word: "red", es: "roja" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale respira y continúa.",
      text: "She breathes. \"Mistakes are part of the process. I'll continue.\"",
      es: "Respira. «Los errores son parte del proceso. Continuaré.»",
      speaker: "vale",
      words: [
        { word: "breathes", es: "respira" },
        { word: "continue", es: "continuar" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Mateo también habla en inglés.",
      text: "Mateo says: \"I'll speak English at lunch too.\"",
      es: "Mateo dice: «Hablaré inglés en el almuerzo también.»",
      speaker: "mateo",
      words: [{ word: "lunch", es: "almuerzo" }],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "El equipo habla en inglés en la tarde.",
      text: "In the afternoon, nobody uses Spanish. The room sounds different.",
      es: "En la tarde, nadie usa español. La sala suena diferente.",
      words: [
        { word: "sounds", es: "suena" },
        { word: "different", es: "diferente" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Ana felicita al equipo con una medalla de papel.",
      text: "Ana claps: \"You won the challenge. You are champions.\"",
      es: "Ana aplaude: «Ganaron el reto. Son campeones.»",
      speaker: "ana",
      words: [
        { word: "won", es: "ganaron" },
        { word: "champions", es: "campeones" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Calendario marcando el sábado.",
      text: "Two days left. Some things are planned. Other things will be a surprise.",
      es: "Faltan dos días. Algunas cosas están planeadas. Otras serán una sorpresa.",
      words: [
        { word: "left", es: "faltan / quedan" },
        { word: "planned", es: "planeadas" },
        { word: "surprise", es: "sorpresa" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "Will Vale use Spanish at work?",
      questionEs: "¿Vale usará español en el trabajo?",
      options: [
        { label: "No, she won't", emoji: "🚫" },
        { label: "Yes, she will", emoji: "🗣️" },
        { label: "Only with Ana", emoji: "👩" },
      ],
      answer: 0,
      sayIt: "I won't use Spanish at work.",
      sayItEs: "Repite: «No usaré español en el trabajo.»",
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "What does Vale say after the mistake?",
      questionEs: "¿Qué dice Vale después del error?",
      options: [
        { label: "I'll continue", emoji: "🔥" },
        { label: "I'll stop", emoji: "🛑" },
        { label: "I'll go home", emoji: "🏠" },
      ],
      answer: 0,
      sayIt: "Mistakes are part of the process. I'll continue.",
      sayItEs: "Repite: «Los errores son parte del proceso. Continuaré.»",
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "Who won the challenge?",
      questionEs: "¿Quién ganó el reto?",
      options: [
        { label: "The whole team", emoji: "🏆" },
        { label: "Only Vale", emoji: "👩" },
        { label: "Nobody", emoji: "😶" },
      ],
      answer: 0,
      sayIt: "We won the challenge. We are champions.",
      sayItEs: "Repite: «Ganamos el reto. Somos campeones.»",
    },
  ],
  mindsetCard: {
    afterScene: "s6",
    phrase: "Mistakes are part of the process.",
    es: "Los errores son parte del proceso.",
  },
  continuePrompt: {
    en: "Do your own English challenge today. What will you do and what won't you do?",
    es: "Haz tu propio reto de inglés hoy. ¿Qué harás y qué no harás?",
  },
  continueWith: [
    "Today I'll…",
    "I won't…",
    "I'll practice…",
    "I'll continue…",
  ],
  cliffhanger: {
    en: "Episode 16: Plan vs decision — Vale learns the difference the hard way.",
    es: "Episodio 16: Plan vs decisión — Vale aprende la diferencia a la mala.",
  },
};
