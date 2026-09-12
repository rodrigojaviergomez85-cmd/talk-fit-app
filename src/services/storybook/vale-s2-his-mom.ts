import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-ep7/cover.jpg";
import s1 from "@/assets/storybook/vale-ep7/s1.jpg";
import s2 from "@/assets/storybook/vale-ep7/s2.jpg";
import s3 from "@/assets/storybook/vale-ep7/s3.jpg";
import s4 from "@/assets/storybook/vale-ep7/s4.jpg";
import s5 from "@/assets/storybook/vale-ep7/s5.jpg";
import s6 from "@/assets/storybook/vale-ep7/s6.jpg";
import s7 from "@/assets/storybook/vale-ep7/s7.jpg";
import s8 from "@/assets/storybook/vale-ep7/s8.jpg";
import s9 from "@/assets/storybook/vale-ep7/s9.jpg";
import s10 from "@/assets/storybook/vale-ep7/s10.jpg";

/**
 * Season 2 · Episode 7 — "What is his mom going to do?".
 * Basic 1 / Simple Future Week 2 Day 2: she is going to / questions.
 */
export const VALE_S2_HIS_MOM: StorybookEpisode = {
  id: "vale-s2-his-mom",
  moduleId: "simple-future",
  week: 2,
  title: "What is his mom going to do?",
  titleEs: "¿Qué va a hacer su mamá?",
  episodeLabel: { en: "Season 2 · Episode 7", es: "Temporada 2 · Episodio 7" },
  previously: [
    { en: "Mateo is going to help at the event.", es: "Mateo va a ayudar en el evento." },
    { en: "His weekend is very busy.", es: "Su fin de semana está muy ocupado." },
    { en: "His mom sent a message.", es: "Su mamá le envió un mensaje." },
  ],
  reviewWords: [
    { word: "busy", es: "ocupado" },
    { word: "invite", es: "invitar" },
    { word: "posters", es: "carteles" },
    { word: "weekend", es: "fin de semana" },
  ],
  blurb: {
    en: "Mateo's mom has a plan too. Can the team help her?",
    es: "La mamá de Mateo también tiene un plan. ¿Puede el equipo ayudarla?",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Mateo lee el mensaje de su mamá.",
      text: "Mateo reads the message again. His mom needs help.",
      es: "Mateo lee el mensaje otra vez. Su mamá necesita ayuda.",
      words: [
        { word: "again", es: "otra vez" },
        { word: "needs", es: "necesita" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale pregunta a Mateo.",
      text: "Vale asks: \"What is your mom going to do?\"",
      es: "Vale pregunta: «¿Qué va a hacer tu mamá?»",
      speaker: "vale",
      words: [{ word: "mom", es: "mamá" }],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Mateo explica el plan de su mamá.",
      text: "\"She is going to open a small food shop,\" says Mateo.",
      es: "«Ella va a abrir una pequeña tienda de comida», dice Mateo.",
      speaker: "mateo",
      words: [
        { word: "open", es: "abrir" },
        { word: "small", es: "pequeña" },
        { word: "shop", es: "tienda" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale sonríe con una idea.",
      text: "Vale has an idea: \"She is going to sell food at our event!\"",
      es: "Vale tiene una idea: «¡Ella va a vender comida en nuestro evento!»",
      speaker: "vale",
      words: [
        { word: "sell", es: "vender" },
        { word: "event", es: "evento" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Ana escucha la idea.",
      text: "Ana asks: \"Is she going to need a table?\"",
      es: "Ana pregunta: «¿Ella va a necesitar una mesa?»",
      speaker: "ana",
      words: [{ word: "table", es: "mesa" }],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "El equipo organiza el espacio.",
      text: "\"Yes, she is. We are going to prepare a space for her.\"",
      es: "«Sí. Vamos a preparar un espacio para ella.»",
      speaker: "vale",
      words: [
        { word: "prepare", es: "preparar" },
        { word: "space", es: "espacio" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Mateo se ve nervioso.",
      text: "Mateo is nervous. \"She isn’t going to speak English.\"",
      es: "Mateo está nervioso. «Ella no va a hablar inglés.»",
      speaker: "mateo",
      words: [
        { word: "nervous", es: "nervioso" },
        { word: "speak", es: "hablar" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale anima a Mateo.",
      text: "Vale says: \"Mistakes are part of the process. We are going to teach her three phrases.\"",
      es: "Vale dice: «Los errores son parte del proceso. Vamos a enseñarle tres frases.»",
      speaker: "vale",
      words: [
        { word: "mistakes", es: "errores" },
        { word: "teach", es: "enseñar" },
        { word: "phrases", es: "frases" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "La familia practica en la cocina.",
      text: "That night, his mom practices: \"Hello. Welcome. Thank you.\"",
      es: "Esa noche, su mamá practica: «Hola. Bienvenido. Gracias.»",
      words: [
        { word: "practices", es: "practica" },
        { word: "welcome", es: "bienvenido" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Kat llega con una lista larga.",
      text: "Then Kat arrives with a long list. \"Who is the busiest person here?\"",
      es: "Luego Kat llega con una lista larga. «¿Quién es la persona más ocupada aquí?»",
      speaker: "kat",
      words: [
        { word: "arrives", es: "llega" },
        { word: "list", es: "lista" },
        { word: "busiest", es: "más ocupada" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What is his mom going to open?",
      questionEs: "¿Qué va a abrir su mamá?",
      options: [
        { label: "A small food shop", emoji: "🥘" },
        { label: "A big bank", emoji: "🏦" },
        { label: "A gym", emoji: "🏋️" },
      ],
      answer: 0,
      sayIt: "She is going to open a small food shop.",
      sayItEs: "Repite: «Ella va a abrir una pequeña tienda de comida.»",
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "Is she going to need a table?",
      questionEs: "¿Ella va a necesitar una mesa?",
      options: [
        { label: "Yes, she is", emoji: "🪑" },
        { label: "No, she isn’t", emoji: "🚫" },
        { label: "She is going to travel", emoji: "✈️" },
      ],
      answer: 0,
      sayIt: "Yes, she is going to need a table.",
      sayItEs: "Repite: «Sí, ella va a necesitar una mesa.»",
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "What are they going to teach her?",
      questionEs: "¿Qué le van a enseñar?",
      options: [
        { label: "Three phrases", emoji: "🗣️" },
        { label: "A long song", emoji: "🎵" },
        { label: "Nothing", emoji: "😶" },
      ],
      answer: 0,
      sayIt: "We are going to teach her three phrases.",
      sayItEs: "Repite: «Vamos a enseñarle tres frases.»",
    },
  ],
  mindsetCard: {
    afterScene: "s8",
    phrase: "Mistakes are part of the process.",
    es: "Los errores son parte del proceso.",
  },
  continuePrompt: {
    en: "Talk about your mom, dad or a family member. What is he or she going to do?",
    es: "Habla de tu mamá, papá o un familiar. ¿Qué va a hacer?",
  },
  continueWith: [
    "My mom is going to…",
    "She isn’t going to…",
    "He is going to…",
    "We are going to help…",
  ],
  cliffhanger: {
    en: "Episode 8: The busiest person — Kat's list has a surprise.",
    es: "Episodio 8: La persona más ocupada — la lista de Kat tiene una sorpresa.",
  },
};
