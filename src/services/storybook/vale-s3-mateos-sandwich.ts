import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s3-ep14/cover.jpg";
import s1 from "@/assets/storybook/vale-s3-ep14/s1.jpg";
import s2 from "@/assets/storybook/vale-s3-ep14/s2.jpg";
import s3 from "@/assets/storybook/vale-s3-ep14/s3.jpg";
import s4 from "@/assets/storybook/vale-s3-ep14/s4.jpg";
import s5 from "@/assets/storybook/vale-s3-ep14/s5.jpg";
import s6 from "@/assets/storybook/vale-s3-ep14/s6.jpg";
import s7 from "@/assets/storybook/vale-s3-ep14/s7.jpg";
import s8 from "@/assets/storybook/vale-s3-ep14/s8.jpg";
import s9 from "@/assets/storybook/vale-s3-ep14/s9.jpg";
import s10 from "@/assets/storybook/vale-s3-ep14/s10.jpg";

/**
 * Season 3 · Episode 14 — "Mateo's sandwich".
 * Basic 2 / Simple Present Week 3 Day 14: a simple process, short clear steps.
 */
export const VALE_S3_MATEOS_SANDWICH: StorybookEpisode = {
  id: "vale-s3-mateos-sandwich",
  moduleId: "simple-present",
  week: 3,
  title: "Mateo's sandwich",
  titleEs: "El sándwich de Mateo",
  episodeLabel: { en: "Season 3 · Episode 14", es: "Temporada 3 · Episodio 14" },
  previously: [
    { en: "Ana learned to order food with an app.", es: "Ana aprendió a pedir comida con una app." },
    { en: "Mateo promised the best sandwich.", es: "Mateo prometió el mejor sándwich." },
  ],
  reviewWords: [
    { word: "order", es: "pedir" },
    { word: "pay", es: "pagar" },
    { word: "wrong", es: "equivocado" },
  ],
  blurb: {
    en: "Mateo explains his famous sandwich, step by step.",
    es: "Mateo explica su famoso sándwich, paso a paso.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Mateo en la cocina de la oficina con pan y queso.",
      text: "Lunch time. Mateo puts bread, cheese and tomato on the table.",
      es: "Hora de almuerzo. Mateo pone pan, queso y tomate en la mesa.",
      speaker: "narrator",
      words: [
        { word: "Lunch", es: "almuerzo" },
        { word: "bread", es: "pan" },
        { word: "tomato", es: "tomate" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Mateo sostiene dos rebanadas de pan.",
      text: "Mateo says: \"First, you get two pieces of bread.\"",
      es: "Mateo dice: «Primero, tomas dos rebanadas de pan.»",
      speaker: "mateo",
      words: [
        { word: "get", es: "tomar" },
        { word: "pieces", es: "rebanadas / piezas" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Mateo pone queso sobre el pan.",
      text: "\"Then, you add cheese. Next, you add tomato and lettuce.\"",
      es: "«Luego, agregas queso. Después, agregas tomate y lechuga.»",
      speaker: "mateo",
      words: [
        { word: "lettuce", es: "lechuga" },
        { word: "add", es: "agregar" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale observa con atención y toma notas.",
      text: "Vale watches him. She writes the steps in her notebook.",
      es: "Vale lo observa. Ella escribe los pasos en su cuaderno.",
      speaker: "narrator",
      words: [
        { word: "watches", es: "observa" },
        { word: "writes", es: "escribe" },
        { word: "notebook", es: "cuaderno" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "El sándwich se cae de la mesa.",
      text: "Suddenly the sandwich falls on the floor. Everybody stops.",
      es: "De repente el sándwich se cae al suelo. Todos se detienen.",
      speaker: "narrator",
      words: [
        { word: "falls", es: "se cae" },
        { word: "floor", es: "suelo" },
        { word: "stops", es: "se detiene" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Mateo respira y sonríe otra vez.",
      text: "Mateo breathes and says: \"I am persistent. I start again.\"",
      es: "Mateo respira y dice: «Soy persistente. Empiezo otra vez.»",
      speaker: "mateo",
      words: [
        { word: "persistent", es: "persistente" },
        { word: "start again", es: "empezar otra vez" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Mateo hace un nuevo sándwich con cuidado.",
      text: "He makes a new one: \"After that, you close it with the bread.\"",
      es: "Él hace uno nuevo: «Después de eso, lo cierras con el pan.»",
      speaker: "mateo",
      words: [
        { word: "close", es: "cerrar" },
        { word: "new one", es: "uno nuevo" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Mateo corta el sándwich en dos.",
      text: "\"Finally, you cut it and you share it with a friend.\"",
      es: "«Finalmente, lo cortas y lo compartes con un amigo.»",
      speaker: "mateo",
      words: [
        { word: "cut", es: "cortar" },
        { word: "share", es: "compartir" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale prueba el sándwich y levanta el pulgar.",
      text: "Vale eats a piece: \"This sandwich is amazing, Mateo!\"",
      es: "Vale come un pedazo: «¡Este sándwich está increíble, Mateo!»",
      speaker: "vale",
      words: [
        { word: "eats", es: "come" },
        { word: "amazing", es: "increíble" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Mr. Reyes entra con una tarjeta grande en la mano.",
      text: "Mr. Reyes enters: \"Tomorrow, each person explains a process. Be ready.\"",
      es: "Mr. Reyes entra: «Mañana, cada persona explica un proceso. Prepárense.»",
      speaker: "boss",
      words: [
        { word: "each", es: "cada" },
        { word: "ready", es: "listo" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What do you get first for the sandwich?",
      questionEs: "¿Qué tomas primero para el sándwich?",
      options: [
        { label: "Two pieces of bread", emoji: "🍞" },
        { label: "The cheese", emoji: "🧀" },
        { label: "The plate", emoji: "🍽️" },
      ],
      answer: 0,
      sayIt: "First, you get two pieces of bread.",
      sayItEs: "Repite: «First, you get two pieces of bread.»",
      sayItCheck: { target: "First you get two pieces of bread" },
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "When do you eat lunch?",
      questionEs: "¿A qué hora almuerzas?",
      options: [
        { label: "I eat lunch at noon", emoji: "🕛" },
        { label: "I eat lunch at one", emoji: "🕐" },
        { label: "I eat lunch at two", emoji: "🕑" },
      ],
      answer: 0,
      sayIt: "I eat lunch at noon.",
      sayItEs: "Ejemplo: «I eat lunch at noon.»",
      sayItAskEn: "When do you eat lunch?",
      sayItAskEs: "¿A qué hora almuerzas?",
      sayItCheck: {
        target: "I eat lunch at *",
        altTargets: ["I eat at *", "At * I eat lunch"],
      },
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "Who do you share your food with?",
      questionEs: "¿Con quién compartes tu comida?",
      options: [
        { label: "I share with my family", emoji: "👨‍👩‍👧" },
        { label: "I share with my friends", emoji: "🧑‍🤝‍🧑" },
        { label: "I share with my team", emoji: "💼" },
      ],
      answer: 0,
      sayIt: "I share my food with my family.",
      sayItEs: "Ejemplo: «I share my food with my family.»",
      sayItAskEn: "Who do you share your food with?",
      sayItAskEs: "¿Con quién compartes tu comida?",
      sayItCheck: {
        target: "I share * with *",
        altTargets: ["I share with *", "With *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s6",
    phrase: "I am persistent.",
    es: "Soy persistente.",
  },
  continuePrompt: {
    en: "Explain how you make a sandwich. Use first, then, next, finally.",
    es: "Explica cómo haces un sándwich. Usa first, then, next, finally.",
  },
  continueWith: ["First, I get…", "Then, I add…", "Next, I close…", "Finally, I eat…"],
  cliffhanger: {
    en: "Episode 15: The process challenge. Everybody explains, and Vale goes last.",
    es: "Episodio 15: El reto de procesos. Todos explican, y Vale va de última.",
  },
};
