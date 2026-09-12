import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-ep16/cover.jpg";
import s1 from "@/assets/storybook/vale-ep16/s1.jpg";
import s2 from "@/assets/storybook/vale-ep16/s2.jpg";
import s3 from "@/assets/storybook/vale-ep16/s3.jpg";
import s4 from "@/assets/storybook/vale-ep16/s4.jpg";
import s5 from "@/assets/storybook/vale-ep16/s5.jpg";
import s6 from "@/assets/storybook/vale-ep16/s6.jpg";
import s7 from "@/assets/storybook/vale-ep16/s7.jpg";
import s8 from "@/assets/storybook/vale-ep16/s8.jpg";
import s9 from "@/assets/storybook/vale-ep16/s9.jpg";
import s10 from "@/assets/storybook/vale-ep16/s10.jpg";

/**
 * Season 2 · Episode 16 — "Plan vs decision".
 * Basic 1 / Simple Future Week 4 Day 1: going to (plan) vs will (decision).
 */
export const VALE_S2_PLAN_VS_DECISION: StorybookEpisode = {
  id: "vale-s2-plan-vs-decision",
  moduleId: "simple-future",
  week: 4,
  title: "Plan vs decision",
  titleEs: "Plan vs decisión",
  episodeLabel: { en: "Season 2 · Episode 16", es: "Temporada 2 · Episodio 16" },
  previously: [
    { en: "The team won the English challenge.", es: "El equipo ganó el reto de inglés." },
    { en: "Vale continued after her mistake.", es: "Vale continuó después de su error." },
    { en: "Two days before the big event.", es: "Faltan dos días para el gran evento." },
  ],
  reviewWords: [
    { word: "continue", es: "continuar" },
    { word: "surprise", es: "sorpresa" },
    { word: "champions", es: "campeones" },
    { word: "planned", es: "planeadas" },
  ],
  blurb: {
    en: "Some things are planned. Some things happen in one second.",
    es: "Algunas cosas están planeadas. Otras pasan en un segundo.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale revisa su agenda en la mañana.",
      text: "Vale checks her agenda. Everything is planned.",
      es: "Vale revisa su agenda. Todo está planeado.",
      words: [
        { word: "checks", es: "revisa" },
        { word: "agenda", es: "agenda" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale señala su lista.",
      text: "\"At ten, I’m going to visit the school. At two, I’m going to print the posters.\"",
      es: "«A las diez voy a visitar la escuela. A las dos voy a imprimir los carteles.»",
      speaker: "vale",
      words: [
        { word: "visit", es: "visitar" },
        { word: "print", es: "imprimir" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Suena el teléfono de repente.",
      text: "Suddenly, Beto calls. He is lost downtown.",
      es: "De repente, Beto llama. Está perdido en el centro.",
      words: [
        { word: "lost", es: "perdido" },
        { word: "downtown", es: "el centro" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale decide en el momento.",
      text: "Vale doesn't think twice. \"I'll go for you now.\"",
      es: "Vale no lo piensa dos veces. «Iré por ti ahora.»",
      speaker: "vale",
      words: [
        { word: "twice", es: "dos veces" },
        { word: "go", es: "ir" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Mateo toma la lista de Vale.",
      text: "\"I'll print the posters for you,\" says Mateo.",
      es: "«Yo imprimiré los carteles por ti», dice Mateo.",
      speaker: "mateo",
      words: [{ word: "posters", es: "carteles" }],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale en el bus hacia el centro.",
      text: "On the bus, Vale explains: \"A plan uses going to. A fast decision uses will.\"",
      es: "En el bus, Vale explica: «Un plan usa going to. Una decisión rápida usa will.»",
      speaker: "vale",
      words: [
        { word: "explains", es: "explica" },
        { word: "decision", es: "decisión" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale encuentra a Beto.",
      text: "She finds Beto near the park. He is cold and scared.",
      es: "Ella encuentra a Beto cerca del parque. Tiene frío y miedo.",
      words: [
        { word: "near", es: "cerca de" },
        { word: "cold", es: "frío" },
        { word: "scared", es: "asustado" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale compra un café para Beto.",
      text: "\"I'll buy you a coffee. Tomorrow we are going to practice together.\"",
      es: "«Te compraré un café. Mañana vamos a practicar juntos.»",
      speaker: "vale",
      words: [
        { word: "buy", es: "comprar" },
        { word: "coffee", es: "café" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Beto sonríe con alivio.",
      text: "Beto smiles. \"I am persistent. I won't quit.\"",
      es: "Beto sonríe. «Soy persistente. No me rendiré.»",
      words: [{ word: "quit", es: "rendirse" }],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Mensaje del clima en el teléfono.",
      text: "At night, a new message: the weekend plan is going to change.",
      es: "En la noche, un nuevo mensaje: el plan del fin de semana va a cambiar.",
      words: [
        { word: "change", es: "cambiar" },
        { word: "weekend", es: "fin de semana" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s2",
      questionEn: "What is Vale going to do at two?",
      questionEs: "¿Qué va a hacer Vale a las dos?",
      options: [
        { label: "Print the posters", emoji: "🖨️" },
        { label: "Visit the school", emoji: "🏫" },
        { label: "Sleep", emoji: "😴" },
      ],
      answer: 0,
      sayIt: "At two, I’m going to print the posters.",
      sayItEs: "Repite: «A las dos voy a imprimir los carteles.»",
    },
    {
      id: "q2",
      afterScene: "s5",
      questionEn: "Beto is lost. What does Vale say?",
      questionEs: "Beto está perdido. ¿Qué dice Vale?",
      options: [
        { label: "I'll go for you now", emoji: "🏃‍♀️" },
        { label: "I’m going to go next week", emoji: "📅" },
        { label: "I can't help", emoji: "🚫" },
      ],
      answer: 0,
      sayIt: "I'll go for you now.",
      sayItEs: "Repite: «Iré por ti ahora.»",
    },
    {
      id: "q3",
      afterScene: "s8",
      questionEn: "Which one is a plan?",
      questionEs: "¿Cuál es un plan?",
      options: [
        { label: "Tomorrow we are going to practice", emoji: "📒" },
        { label: "I'll buy you a coffee", emoji: "☕" },
        { label: "I'll go now", emoji: "🏃" },
      ],
      answer: 0,
      sayIt: "Tomorrow we are going to practice together.",
      sayItEs: "Repite: «Mañana vamos a practicar juntos.»",
    },
  ],
  mindsetCard: {
    afterScene: "s9",
    phrase: "I am persistent.",
    es: "Soy persistente.",
  },
  continuePrompt: {
    en: "Tell us one plan for tomorrow and one fast decision for right now.",
    es: "Cuéntanos un plan para mañana y una decisión rápida para ahora mismo.",
  },
  continueWith: [
    "Tomorrow I’m going to…",
    "Right now I'll…",
    "I won't…",
    "My plan is going to…",
  ],
  cliffhanger: {
    en: "Episode 17: Weekend changes — everything moves at the last minute.",
    es: "Episodio 17: Cambios de fin de semana — todo se mueve a última hora.",
  },
};
