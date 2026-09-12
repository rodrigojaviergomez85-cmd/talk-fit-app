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
 * Episode 1 — "El primer día de Vale".
 * Matches Basic Zero Week 1: introducing yourself (name, age, country, city,
 * favorite food, hobbies). Hand-written; no runtime AI.
 */
export const VALE_FIRST_DAY: StorybookEpisode = {
  id: "vale-first-day",
  moduleId: "basic-zero",
  week: 1,
  title: "Vale's First Day",
  titleEs: "El primer día de Vale",
  episodeLabel: { en: "Episode 1", es: "Episodio 1" },
  blurb: {
    en: "Vale's first day at a bilingual call center… and she has to introduce herself in English in front of everyone.",
    es: "El primer día de Vale en un call center bilingüe… y le toca presentarse en inglés frente a todos.",
  },
  cover,
  voice: "female",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale, nerviosa, mira el edificio de su nuevo trabajo.",
      text: "Today is Vale's first day at her new job.",
      es: "Hoy es el primer día de Vale en su nuevo trabajo.",
      words: [
        { word: "today", es: "hoy" },
        { word: "first", es: "primer / primera" },
        { word: "new", es: "nuevo / nueva" },
        { word: "job", es: "trabajo" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale entra tímidamente a la oficina del call center.",
      text: "The office is big. Everyone speaks English.",
      es: "La oficina es grande. Todos hablan inglés.",
      words: [
        { word: "office", es: "oficina" },
        { word: "big", es: "grande" },
        { word: "everyone", es: "todos" },
        { word: "speaks", es: "habla" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "El supervisor le pide a Vale que se presente frente al equipo.",
      text: "\"Introduce yourself,\" says the boss with a smile.",
      es: "«Preséntate», dice el jefe con una sonrisa.",
      speaker: "boss",
      words: [
        { word: "introduce", es: "presentar" },
        { word: "yourself", es: "a ti misma/o" },
        { word: "boss", es: "jefe" },
        { word: "smile", es: "sonrisa" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale se queda en blanco, sudando de los nervios.",
      text: "Vale is nervous. Her mind goes blank.",
      es: "Vale está nerviosa. Su mente se queda en blanco.",
      words: [
        { word: "nervous", es: "nerviosa" },
        { word: "mind", es: "mente" },
        { word: "blank", es: "en blanco" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale respira profundo con la mano en el pecho.",
      text: "She takes a deep breath.",
      es: "Ella respira profundo.",
      words: [
        { word: "takes", es: "toma" },
        { word: "deep", es: "profundo" },
        { word: "breath", es: "respiro / aliento" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale se presenta con confianza; su mochila tiene una bandera de El Salvador.",
      text: "\"My name is Vale. I am from El Salvador.\"",
      es: "«Me llamo Vale. Soy de El Salvador.»",
      speaker: "vale",
      words: [
        { word: "name", es: "nombre" },
        { word: "from", es: "de (origen)" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale imagina un plato de pupusas mientras sus compañeros ríen.",
      text: "\"I am nineteen years old, and my favorite food is pupusas.\"",
      es: "«Tengo diecinueve años y mi comida favorita son las pupusas.»",
      speaker: "vale",
      words: [
        { word: "nineteen", es: "diecinueve" },
        { word: "years", es: "años" },
        { word: "old", es: "de edad" },
        { word: "favorite", es: "favorita/o" },
        { word: "food", es: "comida" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale baila con su teléfono mientras el equipo aplaude.",
      text: "\"My hobbies are dancing and making videos.\"",
      es: "«Mis pasatiempos son bailar y hacer videos.»",
      speaker: "vale",
      words: [
        { word: "hobbies", es: "pasatiempos" },
        { word: "dancing", es: "bailar" },
        { word: "making", es: "hacer / crear" },
        { word: "videos", es: "videos" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale choca los cinco con su nueva amiga; todos aplauden.",
      text: "Everyone claps. Vale has a new friend.",
      es: "Todos aplauden. Vale tiene una nueva amiga.",
      words: [
        { word: "claps", es: "aplauden" },
        { word: "has", es: "tiene" },
        { word: "friend", es: "amiga/o" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "El teléfono suena con fuerza y Vale lo mira con los ojos abiertos.",
      text: "The phone rings.",
      es: "El teléfono suena.",
      words: [
        { word: "phone", es: "teléfono" },
        { word: "rings", es: "suena" },
      ],
    },
    {
      id: "s11",
      image: s10,
      imageAlt: "El teléfono suena con fuerza y Vale lo mira con los ojos abiertos.",
      text: "\"Your first call, Vale!\"",
      es: "«¡Tu primera llamada, Vale!»",
      speaker: "boss",
      words: [{ word: "call", es: "llamada" }],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s6",
      questionEn: "What is her name?",
      questionEs: "¿Cómo se llama ella?",
      options: [
        { label: "Vale", emoji: "⭐" },
        { label: "Ana", emoji: "👧" },
        { label: "Sofía", emoji: "👩" },
      ],
      answer: 0,
      sayIt: "What is your name?",
      sayItEs: "Ahora pregúntala tú: «¿Cómo te llamas?»",
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "What is Vale's favorite food?",
      questionEs: "¿Cuál es la comida favorita de Vale?",
      options: [
        { label: "Pupusas", emoji: "🫓" },
        { label: "Pizza", emoji: "🍕" },
        { label: "Tacos", emoji: "🌮" },
      ],
      answer: 0,
      sayIt: "What is your favorite food?",
      sayItEs: "Ahora pregúntala tú: «¿Cuál es tu comida favorita?»",
    },
    {
      id: "q3",
      afterScene: "s8",
      questionEn: "Where is Vale from?",
      questionEs: "¿De dónde es Vale?",
      options: [
        { label: "El Salvador", emoji: "🇸🇻" },
        { label: "Mexico", emoji: "🇲🇽" },
        { label: "Guatemala", emoji: "🇬🇹" },
      ],
      answer: 0,
      sayIt: "Where are you from?",
      sayItEs: "Ahora pregúntala tú: «¿De dónde eres?»",
    },
  ],
  continuePrompt: {
    en: "Now it's your first day. Introduce yourself out loud, like Vale did!",
    es: "Ahora es tu primer día. ¡Preséntate en voz alta, como lo hizo Vale!",
  },
  continueWith: [
    "My name is…",
    "I am … years old",
    "I am from…",
    "I live in…",
    "My favorite food is…",
    "My hobbies are…",
  ],
  cliffhanger: {
    en: "To be continued… Episode 2: Vale's first call.",
    es: "Continuará… Episodio 2: la primera llamada de Vale.",
  },
};
