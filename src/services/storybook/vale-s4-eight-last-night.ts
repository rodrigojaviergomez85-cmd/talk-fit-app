import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s4-ep12/cover.jpg";
import s1 from "@/assets/storybook/vale-s4-ep12/s1.jpg";
import s2 from "@/assets/storybook/vale-s4-ep12/s2.jpg";
import s3 from "@/assets/storybook/vale-s4-ep12/s3.jpg";
import s4 from "@/assets/storybook/vale-s4-ep12/s4.jpg";
import s5 from "@/assets/storybook/vale-s4-ep12/s5.jpg";
import s6 from "@/assets/storybook/vale-s4-ep12/s6.jpg";
import s7 from "@/assets/storybook/vale-s4-ep12/s7.jpg";
import s8 from "@/assets/storybook/vale-s4-ep12/s8.jpg";
import s9 from "@/assets/storybook/vale-s4-ep12/s9.jpg";
import s10 from "@/assets/storybook/vale-s4-ep12/s10.jpg";
import s11 from "@/assets/storybook/vale-s4-ep12/s11.jpg";
import s12 from "@/assets/storybook/vale-s4-ep12/s12.jpg";

/**
 * Season 4 · Episode 12 — "At eight last night".
 * Basic 3 / Past Stories Week 3 Day 12: past progressive interrupted by simple past.
 * Mateo was cooking for Ana when the lights went out.
 */
export const VALE_S4_EIGHT_LAST_NIGHT: StorybookEpisode = {
  id: "vale-s4-eight-last-night",
  moduleId: "past-stories",
  week: 3,
  title: "At eight last night",
  titleEs: "A las ocho de anoche",
  episodeLabel: { en: "Season 4 · Episode 12", es: "Temporada 4 · Episodio 12" },
  previously: [
    { en: "People were sharing Vale's article.", es: "La gente estaba compartiendo el artículo de Vale." },
    { en: "A woman was asking for classes.", es: "Una señora estaba pidiendo clases." },
    { en: "Vale said it out loud: I can do it.", es: "Vale lo dijo en voz alta: I can do it." },
  ],
  reviewWords: [
    { word: "was studying", es: "estaba estudiando" },
    { word: "were sharing", es: "estaban compartiendo" },
    { word: "out loud", es: "en voz alta" },
    { word: "link", es: "enlace" },
  ],
  blurb: {
    en: "Mateo wanted the perfect dinner for Ana. At eight the lights went out. Everything got funny.",
    es: "Mateo quería la cena perfecta para Ana. A las ocho se fue la luz. Todo se puso chistoso.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Mateo cocina en su cocina con una olla.",
      text: "At seven Mateo was cooking dinner. He wanted to surprise Ana.",
      es: "A las siete Mateo estaba cocinando la cena. Quería sorprender a Ana.",
      speaker: "mateo",
      words: [
        { word: "was cooking", es: "estaba cocinando" },
        { word: "dinner", es: "cena" },
        { word: "surprise", es: "sorprender" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Mateo mira una receta en su teléfono.",
      text: "He was following a recipe on his phone. Step one: cut the onion.",
      es: "Estaba siguiendo una receta en su teléfono. Paso uno: cortar la cebolla.",
      speaker: "mateo",
      words: [
        { word: "was following", es: "estaba siguiendo" },
        { word: "recipe", es: "receta" },
        { word: "cut", es: "cortar" },
        { word: "onion", es: "cebolla" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Mateo llora un poco por la cebolla.",
      text: "While he was cutting the onion, his eyes started to cry.",
      es: "Mientras estaba cortando la cebolla, sus ojos empezaron a llorar.",
      speaker: "mateo",
      words: [
        { word: "was cutting", es: "estaba cortando" },
        { word: "eyes", es: "ojos" },
        { word: "started", es: "empezaron" },
        { word: "cry", es: "llorar" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "La cocina a oscuras; solo se ve la ventana.",
      text: "At eight o'clock the lights went out. The whole street was dark.",
      es: "A las ocho se fue la luz. Toda la calle estaba oscura.",
      words: [
        { word: "lights went out", es: "se fue la luz" },
        { word: "whole street", es: "toda la calle" },
        { word: "dark", es: "oscura" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Mateo usa la linterna del teléfono en la cocina.",
      text: "Mateo wasn't calm. He was looking for candles with his phone light.",
      es: "Mateo no estaba tranquilo. Estaba buscando candelas con la luz de su teléfono.",
      speaker: "mateo",
      words: [
        { word: "wasn't calm", es: "no estaba tranquilo" },
        { word: "was looking for", es: "estaba buscando" },
        { word: "candles", es: "candelas" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Ana llega a la puerta con una bolsa.",
      text: "Ana arrived while he was looking under the table. \"Mateo? Where are you?\"",
      es: "Ana llegó mientras él estaba buscando debajo de la mesa. «¿Mateo? ¿Dónde estás?»",
      speaker: "ana",
      words: [
        { word: "arrived", es: "llegó" },
        { word: "under the table", es: "debajo de la mesa" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Mateo enciende dos candelas sobre la mesa.",
      text: "He found two candles. Suddenly the kitchen looked beautiful.",
      es: "Encontró dos candelas. De repente la cocina se veía hermosa.",
      speaker: "mateo",
      words: [
        { word: "found", es: "encontró" },
        { word: "Suddenly", es: "de repente" },
        { word: "beautiful", es: "hermosa" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Ana y Mateo se ríen frente a la comida a medio cocinar.",
      text: "The food wasn't ready, but they were laughing a lot.",
      es: "La comida no estaba lista, pero se estaban riendo mucho.",
      speaker: "ana",
      words: [
        { word: "wasn't ready", es: "no estaba lista" },
        { word: "were laughing", es: "se estaban riendo" },
        { word: "a lot", es: "mucho" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Comen pan y queso a la luz de las candelas.",
      text: "They ate bread and cheese. \"This is better than my recipe,\" Mateo said.",
      es: "Comieron pan y queso. «Esto es mejor que mi receta», dijo Mateo.",
      speaker: "mateo",
      words: [
        { word: "ate", es: "comieron" },
        { word: "bread", es: "pan" },
        { word: "cheese", es: "queso" },
        { word: "better", es: "mejor" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Ana le muestra su teléfono a Mateo con una foto.",
      text: "Ana took a photo. \"Vale was asking about you today,\" she said.",
      es: "Ana tomó una foto. «Vale estaba preguntando por ti hoy», dijo.",
      speaker: "ana",
      words: [
        { word: "took a photo", es: "tomó una foto" },
        { word: "was asking about", es: "estaba preguntando por" },
        { word: "today", es: "hoy" },
      ],
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "Mateo escucha con atención a la luz de las candelas.",
      text: '"She needs help on Saturdays. Were you thinking about teaching?"',
      es: "«Ella necesita ayuda los sábados. ¿Estabas pensando en enseñar?»",
      speaker: "ana",
      words: [
        { word: "needs help", es: "necesita ayuda" },
        { word: "Were you thinking", es: "¿estabas pensando?" },
        { word: "teaching", es: "enseñar" },
      ],
    },
    {
      id: "s12",
      image: s12,
      imageAlt: "Mateo sonríe mirando la candela, pensando.",
      text: "The lights came back at ten. But Mateo was already dreaming.",
      es: "La luz volvió a las diez. Pero Mateo ya estaba soñando.",
      words: [
        { word: "came back", es: "volvió" },
        { word: "already", es: "ya" },
        { word: "was dreaming", es: "estaba soñando" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What was Mateo doing when the lights went out?",
      questionEs: "¿Qué estaba haciendo Mateo cuando se fue la luz?",
      options: [
        { label: "He was cooking dinner", emoji: "🍲" },
        { label: "He was sleeping", emoji: "😴" },
        { label: "He was teaching", emoji: "🧑‍🏫" },
      ],
      answer: 0,
      sayIt: "He was cooking dinner.",
      sayItEs: "Ejemplo: «He was cooking dinner.»",
      sayItAskEn: "What were you doing at eight last night?",
      sayItAskEs: "¿Qué estabas haciendo a las ocho de anoche?",
      sayItCheck: {
        target: "I was *",
        altTargets: ["at eight I was *", "I was eating *", "I was working"],
      },
    },
    {
      id: "q2",
      afterScene: "s8",
      questionEn: "Was the food ready when Ana arrived?",
      questionEs: "¿Estaba lista la comida cuando llegó Ana?",
      options: [
        { label: "No, it wasn't ready", emoji: "🙅" },
        { label: "Yes, it was perfect", emoji: "🍽️" },
        { label: "There was no food", emoji: "❌" },
      ],
      answer: 0,
      sayIt: "No, it wasn't ready.",
      sayItEs: "Ejemplo: «It wasn't ready.»",
      sayItAskEn: "Were you cooking or eating yesterday at seven?",
      sayItAskEs: "¿Estabas cocinando o comiendo ayer a las siete?",
      sayItCheck: {
        target: "I was cooking",
        altTargets: ["I was eating", "I was eating *", "I was cooking *", "I was *"],
      },
    },
    {
      id: "q3",
      afterScene: "s11",
      questionEn: "What was Ana asking Mateo?",
      questionEs: "¿Qué le estaba preguntando Ana a Mateo?",
      options: [
        { label: "If he was thinking about teaching", emoji: "🧑‍🏫" },
        { label: "If he was buying candles", emoji: "🕯️" },
        { label: "If he was leaving the city", emoji: "✈️" },
      ],
      answer: 0,
      sayIt: "She was asking about teaching.",
      sayItEs: "Ejemplo: «She was asking about teaching.»",
      sayItAskEn: "Who was helping you last week?",
      sayItAskEs: "¿Quién te estaba ayudando la semana pasada?",
      sayItCheck: {
        target: "my * was helping me",
        altTargets: ["* was helping me", "my *", "nobody"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s7",
    phrase: "Mistakes are part of the process.",
    es: "Los errores son parte del proceso.",
  },
  continuePrompt: {
    en: "Your turn! Tell a small story: what were you doing when something funny happened?",
    es: "¡Tu turno! Cuenta una historia pequeña: ¿qué estabas haciendo cuando pasó algo chistoso?",
  },
  continueWith: [
    "I was…",
    "Suddenly…",
    "Then I…",
    "It was funny because…",
  ],
  cliffhanger: {
    en: "Episode 13: While Vale was teaching, Dani was practicing English on the bus.",
    es: "Episodio 13: Mientras Vale enseñaba, Dani estaba practicando inglés en el bus.",
  },
};
