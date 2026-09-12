import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-ep1/cover.jpg";
import s1 from "@/assets/storybook/vale-ep1/s1.jpg";
import s2 from "@/assets/storybook/vale-ep1/s2.jpg";
import s3 from "@/assets/storybook/vale-ep1/s3.jpg";
import s4 from "@/assets/storybook/vale-ep1/s4.jpg";
import s5 from "@/assets/storybook/vale-ep1/s5.jpg";
import s6 from "@/assets/storybook/vale-ep1/s6.jpg";
import s7 from "@/assets/storybook/vale-ep1/s7.jpg";
import s8 from "@/assets/storybook/vale-ep1/s8.jpg";
import s9 from "@/assets/storybook/vale-ep1/s9.jpg";
import s10 from "@/assets/storybook/vale-ep1/s10.jpg";

/**
 * Season 2 · Episode 1 — "She is ready".
 * Matches Basic 1 / Simple Future Week 1 Day 1: my plans with I'm going to.
 * Script-only first; illustrations will be generated and swapped in.
 */
export const VALE_S2_READY: StorybookEpisode = {
  id: "vale-s2-ready",
  moduleId: "simple-future",
  week: 1,
  title: "She is ready",
  titleEs: "Ella está lista",
  episodeLabel: { en: "Season 2 · Episode 1", es: "Temporada 2 · Episodio 1" },
  reviewWords: [
    { word: "ready", es: "lista / listo" },
    { word: "challenge", es: "reto / desafío" },
    { word: "team", es: "equipo" },
    { word: "diploma", es: "diploma" },
  ],
  blurb: {
    en: "Vale finished Level One. Now Ana has a new challenge for her.",
    es: "Vale terminó el Nivel Uno. Ahora Ana tiene un nuevo reto para ella.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale mira su teléfono con una noticia de Ana.",
      text: "Vale receives a message from Ana.",
      es: "Vale recibe un mensaje de Ana.",
      words: [
        { word: "receives", es: "recibe" },
        { word: "message", es: "mensaje" },
        { word: "from", es: "de" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Escena 2 del episodio.",
      text: "Ana says: \"You are ready for the next step.\"",
      es: "Ana dice: «Estás lista para el siguiente paso.»",
      speaker: "ana",
      words: [
        { word: "says", es: "dice" },
        { word: "ready", es: "lista / listo" },
        { word: "next", es: "siguiente" },
        { word: "step", es: "paso" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Escena 3 del episodio.",
      text: "Vale smiles. \"I am ready. I can do it.\"",
      es: "Vale sonríe. «Estoy lista. Puedo hacerlo.»",
      speaker: "vale",
      words: [
        { word: "smiles", es: "sonríe" },
        { word: "ready", es: "lista / listo" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Escena 4 del episodio.",
      text: "Ana explains the new project: \"We are going to help young people find their first bilingual job.\"",
      es: "Ana explica el nuevo proyecto: «Vamos a ayudar a jóvenes a conseguir su primer empleo bilingüe.»",
      speaker: "ana",
      words: [
        { word: "explains", es: "explica" },
        { word: "project", es: "proyecto" },
        { word: "help", es: "ayudar" },
        { word: "young", es: "jóvenes" },
        { word: "people", es: "gente / personas" },
        { word: "find", es: "encontrar" },
        { word: "first", es: "primer / primera" },
        { word: "bilingual", es: "bilingüe" },
        { word: "job", es: "trabajo" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Escena 5 del episodio.",
      text: "Vale thinks hard. \"I’m going to work hard every day.\"",
      es: "Vale piensa con fuerza. «Voy a trabajar duro todos los días.»",
      speaker: "vale",
      words: [
        { word: "thinks", es: "piensa" },
        { word: "hard", es: "duro / fuerte" },
        { word: "work", es: "trabajar" },
        { word: "every", es: "cada" },
        { word: "day", es: "día" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Escena 6 del episodio.",
      text: "Ana says: \"Tonight, you’re going to prepare your first idea.\"",
      es: "Ana dice: «Esta noche vas a preparar tu primera idea.»",
      speaker: "ana",
      words: [
        { word: "tonight", es: "esta noche" },
        { word: "prepare", es: "preparar" },
        { word: "idea", es: "idea" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Escena 7 del episodio.",
      text: "At home, Vale opens her notebook. \"I’m going to write three ideas.\"",
      es: "En casa, Vale abre su cuaderno. «Voy a escribir tres ideas.»",
      speaker: "vale",
      words: [
        { word: "opens", es: "abre" },
        { word: "notebook", es: "cuaderno" },
        { word: "write", es: "escribir" },
        { word: "ideas", es: "ideas" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Escena 8 del episodio.",
      text: "She looks at the clock. \"I’m not going to sleep late.\"",
      es: "Ella mira el reloj. «No voy a dormir tarde.»",
      speaker: "vale",
      words: [
        { word: "looks", es: "mira" },
        { word: "clock", es: "reloj" },
        { word: "sleep", es: "dormir" },
        { word: "late", es: "tarde" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Escena 9 del episodio.",
      text: "Vale writes: \"My plan is going to be clear.\"",
      es: "Vale escribe: «Mi plan va a ser claro.»",
      speaker: "vale",
      words: [
        { word: "plan", es: "plan" },
        { word: "clear", es: "claro" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Escena 10 del episodio.",
      text: "Her phone buzzes. Ana sends one more message: \"See you tomorrow.\"",
      es: "Su teléfono vibra. Ana envía un mensaje más: «Nos vemos mañana.»",
      words: [
        { word: "phone", es: "teléfono" },
        { word: "buzzes", es: "vibra" },
        { word: "sends", es: "envía" },
        { word: "more", es: "más" },
        { word: "tomorrow", es: "mañana" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What are Vale and Ana going to do?",
      questionEs: "¿Qué van a hacer Vale y Ana?",
      options: [
        { label: "Help young people find a bilingual job", emoji: "🤝" },
        { label: "Go on vacation", emoji: "🏖️" },
        { label: "Buy new phones", emoji: "📱" },
      ],
      answer: 0,
      sayIt: "We are going to help young people find a bilingual job.",
      sayItEs: "Repite: «Vamos a ayudar a jóvenes a conseguir su primer empleo bilingüe.»",
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "What is Vale going to write?",
      questionEs: "¿Qué va a escribir Vale?",
      options: [
        { label: "Three ideas", emoji: "📝" },
        { label: "A long letter", emoji: "✉️" },
        { label: "A shopping list", emoji: "🛒" },
      ],
      answer: 0,
      sayIt: "I’m going to write three ideas.",
      sayItEs: "Repite: «Voy a escribir tres ideas.»",
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "Is Vale going to sleep late?",
      questionEs: "¿Vale va a dormir tarde?",
      options: [
        { label: "No, she isn’t", emoji: "🌙" },
        { label: "Yes, she is", emoji: "😴" },
        { label: "Maybe", emoji: "🤷" },
      ],
      answer: 0,
      sayIt: "I’m not going to sleep late.",
      sayItEs: "Repite: «No voy a dormir tarde.»",
    },
  ],
  mindsetCard: {
    afterScene: "s5",
    phrase: "I can do it.",
    es: "Yo puedo hacerlo.",
  },
  continuePrompt: {
    en: "Now tell us your plan for tonight. What are you going to do?",
    es: "Ahora cuéntanos tu plan para esta noche. ¿Qué vas a hacer?",
  },
  continueWith: [
    "Tonight, I’m going to…",
    "I’m going to…",
    "I’m not going to…",
    "My plan is going to be…",
  ],
  cliffhanger: {
    en: "Episode 2: Tomorrow starts now — and Vale forgets something important.",
    es: "Episodio 2: Mañana empieza ahora — y Vale olvida algo importante.",
  },
};
