import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-ep13/cover.jpg";
import s1 from "@/assets/storybook/vale-ep13/s1.jpg";
import s2 from "@/assets/storybook/vale-ep13/s2.jpg";
import s3 from "@/assets/storybook/vale-ep13/s3.jpg";
import s4 from "@/assets/storybook/vale-ep13/s4.jpg";
import s5 from "@/assets/storybook/vale-ep13/s5.jpg";
import s6 from "@/assets/storybook/vale-ep13/s6.jpg";
import s7 from "@/assets/storybook/vale-ep13/s7.jpg";
import s8 from "@/assets/storybook/vale-ep13/s8.jpg";
import s9 from "@/assets/storybook/vale-ep13/s9.jpg";
import s10 from "@/assets/storybook/vale-ep13/s10.jpg";

/**
 * Season 2 · Episode 13 — "A prediction".
 * Basic 1 / Simple Future Week 3 Day 3: will for predictions.
 */
export const VALE_S2_PREDICTION: StorybookEpisode = {
  id: "vale-s2-prediction",
  moduleId: "simple-future",
  week: 3,
  title: "A prediction",
  titleEs: "Una predicción",
  episodeLabel: { en: "Season 2 · Episode 13", es: "Temporada 2 · Episodio 13" },
  previously: [
    { en: "Vale promised to help Beto.", es: "Vale prometió ayudar a Beto." },
    { en: "Beto repeated: English is easy for me.", es: "Beto repitió: el inglés es fácil para mí." },
    { en: "Kat said it will rain on Saturday.", es: "Kat dijo que lloverá el sábado." },
  ],
  reviewWords: [
    { word: "promise", es: "prometo / promesa" },
    { word: "voice", es: "voz" },
    { word: "rain", es: "llover / lluvia" },
    { word: "never", es: "nunca" },
  ],
  blurb: {
    en: "Rain or sun? The team predicts the future of the event.",
    es: "¿Lluvia o sol? El equipo predice el futuro del evento.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "El equipo mira el pronóstico del clima.",
      text: "The team watches the weather app. Clouds everywhere.",
      es: "El equipo mira la app del clima. Nubes por todas partes.",
      words: [
        { word: "weather", es: "clima" },
        { word: "clouds", es: "nubes" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Dylan preocupado.",
      text: "\"Nobody will come with rain,\" says Dylan.",
      es: "«Nadie vendrá con lluvia», dice Dylan.",
      speaker: "dylan",
      words: [{ word: "come", es: "venir" }],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale piensa positivo.",
      text: "Vale answers: \"I think they will come. They want a job.\"",
      es: "Vale responde: «Creo que vendrán. Ellos quieren un trabajo.»",
      speaker: "vale",
      words: [
        { word: "think", es: "pensar / creer" },
        { word: "want", es: "querer" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Kat prepara sombrillas.",
      text: "\"Maybe it will rain, but we'll be ready,\" says Kat.",
      es: "«Tal vez llueva, pero estaremos listos», dice Kat.",
      speaker: "kat",
      words: [
        { word: "maybe", es: "tal vez" },
        { word: "ready", es: "listos" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Mateo con carpas plásticas.",
      text: "Mateo brings big umbrellas. \"The event won't stop.\"",
      es: "Mateo trae sombrillas grandes. «El evento no se detendrá.»",
      speaker: "mateo",
      words: [
        { word: "umbrellas", es: "sombrillas" },
        { word: "stop", es: "detener" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale escribe tres predicciones.",
      text: "Vale writes three predictions in her notebook.",
      es: "Vale escribe tres predicciones en su cuaderno.",
      words: [
        { word: "three", es: "tres" },
        { word: "predictions", es: "predicciones" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Cuaderno con la lista.",
      text: "\"Fifty people will come. Ten will get an interview. Everybody will practice English.\"",
      es: "«Cincuenta personas vendrán. Diez tendrán una entrevista. Todos practicarán inglés.»",
      speaker: "vale",
      words: [
        { word: "get", es: "conseguir" },
        { word: "interview", es: "entrevista" },
        { word: "everybody", es: "todos" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Beto lee la lista.",
      text: "Beto reads the list. \"Will I get an interview?\"",
      es: "Beto lee la lista. «¿Yo tendré una entrevista?»",
      words: [{ word: "list", es: "lista" }],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale responde con energía.",
      text: "\"Yes, you will. You are awesome when you practice.\"",
      es: "«Sí, la tendrás. Eres increíble cuando practicas.»",
      speaker: "vale",
      words: [
        { word: "awesome", es: "increíble / genial" },
        { word: "practice", es: "practicar" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Ana mira al equipo con seriedad.",
      text: "Ana says: \"Tomorrow we will talk about your future. All of you.\"",
      es: "Ana dice: «Mañana hablaremos de su futuro. De todos ustedes.»",
      speaker: "ana",
      words: [
        { word: "future", es: "futuro" },
        { word: "talk", es: "hablar" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "Does Vale think people will come?",
      questionEs: "¿Vale cree que la gente vendrá?",
      options: [
        { label: "Yes, she thinks they will come", emoji: "🙌" },
        { label: "No, she thinks nobody will come", emoji: "🙅" },
        { label: "She doesn't care", emoji: "🤷" },
      ],
      answer: 0,
      sayIt: "I think they will come.",
      sayItEs: "Repite: «Creo que vendrán.»",
    },
    {
      id: "q2",
      afterScene: "s5",
      questionEn: "Will the event stop with rain?",
      questionEs: "¿El evento se detendrá con la lluvia?",
      options: [
        { label: "No, it won't", emoji: "☔" },
        { label: "Yes, it will", emoji: "🛑" },
        { label: "Only in the morning", emoji: "🌅" },
      ],
      answer: 0,
      sayIt: "The event won't stop.",
      sayItEs: "Repite: «El evento no se detendrá.»",
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "How many people will get an interview?",
      questionEs: "¿Cuántas personas tendrán una entrevista?",
      options: [
        { label: "Ten", emoji: "🔟" },
        { label: "Fifty", emoji: "5️⃣0️⃣" },
        { label: "Nobody", emoji: "0️⃣" },
      ],
      answer: 0,
      sayIt: "Ten people will get an interview.",
      sayItEs: "Repite: «Diez personas tendrán una entrevista.»",
    },
  ],
  mindsetCard: {
    afterScene: "s9",
    phrase: "I am awesome.",
    es: "Soy genial.",
  },
  continuePrompt: {
    en: "Make three predictions about your next month.",
    es: "Haz tres predicciones sobre tu próximo mes.",
  },
  continueWith: [
    "I think I will…",
    "I won't…",
    "Maybe it will…",
    "I will practice…",
  ],
  cliffhanger: {
    en: "Episode 14: Their future — Ana asks a hard question.",
    es: "Episodio 14: Su futuro — Ana hace una pregunta difícil.",
  },
};
