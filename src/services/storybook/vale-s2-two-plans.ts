import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-ep9/cover.jpg";
import s1 from "@/assets/storybook/vale-ep9/s1.jpg";
import s2 from "@/assets/storybook/vale-ep9/s2.jpg";
import s3 from "@/assets/storybook/vale-ep9/s3.jpg";
import s4 from "@/assets/storybook/vale-ep9/s4.jpg";
import s5 from "@/assets/storybook/vale-ep9/s5.jpg";
import s6 from "@/assets/storybook/vale-ep9/s6.jpg";
import s7 from "@/assets/storybook/vale-ep9/s7.jpg";
import s8 from "@/assets/storybook/vale-ep9/s8.jpg";
import s9 from "@/assets/storybook/vale-ep9/s9.jpg";
import s10 from "@/assets/storybook/vale-ep9/s10.jpg";

/**
 * Season 2 · Episode 9 — "Two different plans".
 * Basic 1 / Simple Future Week 2 Day 4: contrasting other people's plans.
 */
export const VALE_S2_TWO_PLANS: StorybookEpisode = {
  id: "vale-s2-two-plans",
  moduleId: "simple-future",
  week: 2,
  title: "Two different plans",
  titleEs: "Dos planes diferentes",
  episodeLabel: { en: "Season 2 · Episode 9", es: "Temporada 2 · Episodio 9" },
  previously: [
    { en: "The team divided Kat's long list.", es: "El equipo dividió la lista larga de Kat." },
    { en: "Everybody has five tasks.", es: "Todos tienen cinco tareas." },
    { en: "Kat and Dylan don't agree.", es: "Kat y Dylan no están de acuerdo." },
  ],
  reviewWords: [
    { word: "tasks", es: "tareas" },
    { word: "divide", es: "dividir" },
    { word: "chairs", es: "sillas" },
    { word: "schools", es: "escuelas" },
  ],
  blurb: {
    en: "Kat wants music. Dylan wants games. Vale listens to both.",
    es: "Kat quiere música. Dylan quiere juegos. Vale escucha a los dos.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Kat y Dylan hablan al mismo tiempo.",
      text: "Kat and Dylan talk at the same time.",
      es: "Kat y Dylan hablan al mismo tiempo.",
      words: [
        { word: "talk", es: "hablan" },
        { word: "same", es: "mismo" },
        { word: "time", es: "tiempo" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Kat señala una bocina.",
      text: "\"I’m going to play music all day,\" says Kat.",
      es: "«Voy a poner música todo el día», dice Kat.",
      speaker: "kat",
      words: [
        { word: "play", es: "poner / tocar" },
        { word: "music", es: "música" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Dylan muestra un juego.",
      text: "\"I’m going to prepare English games,\" says Dylan.",
      es: "«Voy a preparar juegos en inglés», dice Dylan.",
      speaker: "dylan",
      words: [{ word: "games", es: "juegos" }],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale piensa con calma.",
      text: "Vale listens. \"Her plan is fun. His plan is useful.\"",
      es: "Vale escucha. «Su plan es divertido. Su plan es útil.»",
      speaker: "vale",
      words: [
        { word: "listens", es: "escucha" },
        { word: "fun", es: "divertido" },
        { word: "useful", es: "útil" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale une las dos ideas en la pizarra.",
      text: "\"We are going to use both plans,\" says Vale.",
      es: "«Vamos a usar los dos planes», dice Vale.",
      speaker: "vale",
      words: [
        { word: "use", es: "usar" },
        { word: "both", es: "ambos / los dos" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Kat con su bocina en la mañana.",
      text: "\"She is going to play music in the morning.\"",
      es: "«Ella va a poner música en la mañana.»",
      speaker: "vale",
      words: [{ word: "morning", es: "mañana (la mañana)" }],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Dylan con sus juegos en la tarde.",
      text: "\"He is going to run the games in the afternoon.\"",
      es: "«Él va a dirigir los juegos en la tarde.»",
      speaker: "vale",
      words: [
        { word: "run", es: "dirigir / correr" },
        { word: "afternoon", es: "tarde" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Kat y Dylan chocan los cinco.",
      text: "Kat and Dylan smile. \"That is a good plan.\"",
      es: "Kat y Dylan sonríen. «Ese es un buen plan.»",
      words: [{ word: "good", es: "bueno / buena" }],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale escribe el plan final.",
      text: "Vale writes the final plan. \"I believe in myself and in my team.\"",
      es: "Vale escribe el plan final. «Creo en mí y en mi equipo.»",
      speaker: "vale",
      words: [
        { word: "final", es: "final" },
        { word: "believe", es: "creer" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Ana entra con una pregunta.",
      text: "Ana enters: \"Tomorrow, you are going to explain everyone's plan in English.\"",
      es: "Ana entra: «Mañana vas a explicar el plan de cada persona en inglés.»",
      speaker: "ana",
      words: [
        { word: "enters", es: "entra" },
        { word: "explain", es: "explicar" },
        { word: "everyone", es: "todos" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What is Dylan going to prepare?",
      questionEs: "¿Qué va a preparar Dylan?",
      options: [
        { label: "English games", emoji: "🎲" },
        { label: "Music", emoji: "🎧" },
        { label: "Food", emoji: "🍔" },
      ],
      answer: 0,
      sayIt: "He is going to prepare English games.",
      sayItEs: "Repite: «Él va a preparar juegos en inglés.»",
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "When is Kat going to play music?",
      questionEs: "¿Cuándo va a poner música Kat?",
      options: [
        { label: "In the morning", emoji: "🌅" },
        { label: "At night", emoji: "🌙" },
        { label: "On Monday", emoji: "📅" },
      ],
      answer: 0,
      sayIt: "She is going to play music in the morning.",
      sayItEs: "Repite: «Ella va a poner música en la mañana.»",
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "Are they going to use both plans?",
      questionEs: "¿Van a usar los dos planes?",
      options: [
        { label: "Yes, they are", emoji: "🤝" },
        { label: "No, they aren’t", emoji: "❌" },
        { label: "Only Kat's plan", emoji: "🎧" },
      ],
      answer: 0,
      sayIt: "Yes, they are going to use both plans.",
      sayItEs: "Repite: «Sí, van a usar los dos planes.»",
    },
  ],
  mindsetCard: {
    afterScene: "s9",
    phrase: "I believe in myself.",
    es: "Creo en mí.",
  },
  continuePrompt: {
    en: "Two friends, two plans. Tell us what each person is going to do.",
    es: "Dos amigos, dos planes. Cuéntanos qué va a hacer cada persona.",
  },
  continueWith: [
    "She is going to…",
    "He is going to…",
    "They are going to…",
    "We are going to use both…",
  ],
  cliffhanger: {
    en: "Episode 10: Their plans challenge — Vale speaks for the whole team.",
    es: "Episodio 10: El reto de sus planes — Vale habla por todo el equipo.",
  },
};
