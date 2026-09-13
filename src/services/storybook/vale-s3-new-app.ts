import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s3-ep11/cover.jpg";
import s1 from "@/assets/storybook/vale-s3-ep11/s1.jpg";
import s2 from "@/assets/storybook/vale-s3-ep11/s2.jpg";
import s3 from "@/assets/storybook/vale-s3-ep11/s3.jpg";
import s4 from "@/assets/storybook/vale-s3-ep11/s4.jpg";
import s5 from "@/assets/storybook/vale-s3-ep11/s5.jpg";
import s6 from "@/assets/storybook/vale-s3-ep11/s6.jpg";
import s7 from "@/assets/storybook/vale-s3-ep11/s7.jpg";
import s8 from "@/assets/storybook/vale-s3-ep11/s8.jpg";
import s9 from "@/assets/storybook/vale-s3-ep11/s9.jpg";
import s10 from "@/assets/storybook/vale-s3-ep11/s10.jpg";

/**
 * Season 3 · Episode 11 — "The new app".
 * Basic 2 / Simple Present Week 3 Day 11: explain a process (first, then, next, finally).
 */
export const VALE_S3_NEW_APP: StorybookEpisode = {
  id: "vale-s3-new-app",
  moduleId: "simple-present",
  week: 3,
  title: "The new app",
  titleEs: "La app nueva",
  episodeLabel: { en: "Season 3 · Episode 11", es: "Temporada 3 · Episodio 11" },
  previously: [
    { en: "Vale described the team's routines.", es: "Vale describió las rutinas del equipo." },
    { en: "Ana invited Vale to the casting.", es: "Ana invitó a Vale al casting." },
  ],
  reviewWords: [
    { word: "routine", es: "rutina" },
    { word: "checks", es: "revisa" },
    { word: "never", es: "nunca" },
  ],
  blurb: {
    en: "Mr. Reyes teaches Vale a new app, step by step.",
    es: "Mr. Reyes le enseña a Vale una app nueva, paso a paso.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale llega a la oficina y ve una computadora nueva.",
      text: "Monday morning. The team has a new app for customers.",
      es: "Lunes por la mañana. El equipo tiene una app nueva para los clientes.",
      speaker: "narrator",
      words: [
        { word: "Monday", es: "lunes" },
        { word: "app", es: "aplicación" },
        { word: "customers", es: "clientes" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Mr. Reyes señala la pantalla con una guía.",
      text: "Mr. Reyes says: \"First, you open the app. It is very simple.\"",
      es: "Mr. Reyes dice: «Primero, abres la app. Es muy simple.»",
      speaker: "boss",
      words: [
        { word: "First", es: "primero" },
        { word: "open", es: "abrir" },
        { word: "simple", es: "simple" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale escribe el nombre del cliente en la pantalla.",
      text: "\"Then, you write the customer's name. Next, you press search.\"",
      es: "«Luego, escribes el nombre del cliente. Después, presionas buscar.»",
      speaker: "boss",
      words: [
        { word: "Then", es: "luego" },
        { word: "Next", es: "después" },
        { word: "press", es: "presionar" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale mira la pantalla confundida.",
      text: "Vale does not understand. The screen shows a red message.",
      es: "Vale no entiende. La pantalla muestra un mensaje rojo.",
      speaker: "narrator",
      words: [
        { word: "does not understand", es: "no entiende" },
        { word: "screen", es: "pantalla" },
        { word: "message", es: "mensaje" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale respira profundo con los ojos cerrados.",
      text: "Vale breathes. She says: \"Mistakes are part of the process.\"",
      es: "Vale respira. Ella dice: «Los errores son parte del proceso.»",
      speaker: "vale",
      words: [
        { word: "breathes", es: "respira" },
        { word: "Mistakes", es: "errores" },
        { word: "process", es: "proceso" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Mr. Reyes explica con calma otra vez.",
      text: "Mr. Reyes explains again: \"After that, you check the order.\"",
      es: "Mr. Reyes explica otra vez: «Después de eso, revisas la orden.»",
      speaker: "boss",
      words: [
        { word: "explains", es: "explica" },
        { word: "After that", es: "después de eso" },
        { word: "order", es: "orden / pedido" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale sonríe porque la app funciona.",
      text: "\"Finally, you save it.\" Vale saves the order. It works!",
      es: "«Finalmente, la guardas.» Vale guarda la orden. ¡Funciona!",
      speaker: "boss",
      words: [
        { word: "Finally", es: "finalmente" },
        { word: "save", es: "guardar" },
        { word: "works", es: "funciona" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale explica los pasos a Mateo.",
      text: "Vale teaches Mateo: \"First, you open the app. Then, you search.\"",
      es: "Vale le enseña a Mateo: «Primero, abres la app. Luego, buscas.»",
      speaker: "vale",
      words: [
        { word: "teaches", es: "enseña" },
        { word: "search", es: "buscar" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Mateo levanta el pulgar y sonríe.",
      text: "Mateo smiles: \"You explain it better than the manual!\"",
      es: "Mateo sonríe: «¡Lo explicas mejor que el manual!»",
      speaker: "mateo",
      words: [
        { word: "explain", es: "explicar" },
        { word: "better", es: "mejor" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Mr. Reyes anuncia algo con una caja de pizza en la mano.",
      text: "Mr. Reyes opens the door: \"Tomorrow we celebrate with pizza.\"",
      es: "Mr. Reyes abre la puerta: «Mañana celebramos con pizza.»",
      speaker: "boss",
      words: [
        { word: "celebrate", es: "celebrar" },
        { word: "pizza", es: "pizza" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What do you do first with the app?",
      questionEs: "¿Qué haces primero con la app?",
      options: [
        { label: "You open it", emoji: "📱" },
        { label: "You save it", emoji: "💾" },
        { label: "You close it", emoji: "❌" },
      ],
      answer: 0,
      sayIt: "First, you open the app.",
      sayItEs: "Repite: «First, you open the app.»",
      sayItCheck: { target: "First you open the app" },
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "Which app do you open every day?",
      questionEs: "¿Qué app abres todos los días?",
      options: [
        { label: "I open TikTok", emoji: "🎵" },
        { label: "I open WhatsApp", emoji: "💬" },
        { label: "I open YouTube", emoji: "▶️" },
      ],
      answer: 0,
      sayIt: "I open TikTok every day.",
      sayItEs: "Ejemplo: «I open TikTok every day.»",
      sayItAskEn: "Which app do you open every day?",
      sayItAskEs: "¿Qué app abres todos los días?",
      sayItCheck: {
        target: "I open * every day",
        altTargets: ["I open *", "Every day I open *"],
      },
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "How do you learn something new?",
      questionEs: "¿Cómo aprendes algo nuevo?",
      options: [
        { label: "I practice step by step", emoji: "🪜" },
        { label: "I ask a friend", emoji: "🙋" },
        { label: "I watch a video", emoji: "📺" },
      ],
      answer: 0,
      sayIt: "I learn step by step.",
      sayItEs: "Ejemplo: «I learn step by step.»",
      sayItAskEn: "How do you learn something new?",
      sayItAskEs: "¿Cómo aprendes algo nuevo?",
      sayItCheck: {
        target: "I learn *",
        altTargets: ["I practice *", "I study *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s5",
    phrase: "Mistakes are part of the process.",
    es: "Los errores son parte del proceso.",
  },
  continuePrompt: {
    en: "Explain how you open and use your favorite app. Use first, then, next, finally.",
    es: "Explica cómo abres y usas tu app favorita. Usa first, then, next, finally.",
  },
  continueWith: ["First, I open…", "Then, I…", "Next, I…", "Finally, I…"],
  cliffhanger: {
    en: "Episode 12: Pizza day at the office. But who knows the recipe?",
    es: "Episodio 12: Día de pizza en la oficina. ¿Pero quién sabe la receta?",
  },
};
