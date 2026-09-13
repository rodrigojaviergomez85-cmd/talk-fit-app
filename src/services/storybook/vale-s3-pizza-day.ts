import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s3-ep12/cover.jpg";
import s1 from "@/assets/storybook/vale-s3-ep12/s1.jpg";
import s2 from "@/assets/storybook/vale-s3-ep12/s2.jpg";
import s3 from "@/assets/storybook/vale-s3-ep12/s3.jpg";
import s4 from "@/assets/storybook/vale-s3-ep12/s4.jpg";
import s5 from "@/assets/storybook/vale-s3-ep12/s5.jpg";
import s6 from "@/assets/storybook/vale-s3-ep12/s6.jpg";
import s7 from "@/assets/storybook/vale-s3-ep12/s7.jpg";
import s8 from "@/assets/storybook/vale-s3-ep12/s8.jpg";
import s9 from "@/assets/storybook/vale-s3-ep12/s9.jpg";
import s10 from "@/assets/storybook/vale-s3-ep12/s10.jpg";

/**
 * Season 3 · Episode 12 — "Pizza day".
 * Basic 2 / Simple Present Week 3 Day 12: how to make a pizza, step by step.
 */
export const VALE_S3_PIZZA_DAY: StorybookEpisode = {
  id: "vale-s3-pizza-day",
  moduleId: "simple-present",
  week: 3,
  title: "Pizza day",
  titleEs: "El día de la pizza",
  episodeLabel: { en: "Season 3 · Episode 12", es: "Temporada 3 · Episodio 12" },
  previously: [
    { en: "Vale learned the new app step by step.", es: "Vale aprendió la app nueva paso a paso." },
    { en: "Mr. Reyes promised a pizza celebration.", es: "Mr. Reyes prometió una celebración con pizza." },
  ],
  reviewWords: [
    { word: "First", es: "primero" },
    { word: "Then", es: "luego" },
    { word: "Finally", es: "finalmente" },
  ],
  blurb: {
    en: "The team makes pizza together. Vale explains the recipe.",
    es: "El equipo hace pizza. Vale explica la receta.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "La cocina de la oficina llena de ingredientes.",
      text: "The office kitchen is full of ingredients. Today the team makes pizza.",
      es: "La cocina de la oficina está llena de ingredientes. Hoy el equipo hace pizza.",
      speaker: "narrator",
      words: [
        { word: "kitchen", es: "cocina" },
        { word: "ingredients", es: "ingredientes" },
        { word: "makes", es: "hace" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale levanta la masa con las dos manos.",
      text: "Vale says: \"First, you prepare the dough. It is easy.\"",
      es: "Vale dice: «Primero, preparas la masa. Es fácil.»",
      speaker: "vale",
      words: [
        { word: "prepare", es: "preparar" },
        { word: "dough", es: "masa" },
        { word: "easy", es: "fácil" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Mateo agrega salsa de tomate con una cuchara.",
      text: "\"Then, you add the sauce. Next, you add the cheese.\"",
      es: "«Luego, agregas la salsa. Después, agregas el queso.»",
      speaker: "vale",
      words: [
        { word: "add", es: "agregar" },
        { word: "sauce", es: "salsa" },
        { word: "cheese", es: "queso" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Mateo pone demasiado queso y todos se ríen.",
      text: "Mateo adds a lot of cheese. Ana laughs: \"That is too much!\"",
      es: "Mateo agrega mucho queso. Ana se ríe: «¡Eso es demasiado!»",
      speaker: "ana",
      words: [
        { word: "a lot", es: "mucho" },
        { word: "too much", es: "demasiado" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "La pizza se ve desordenada sobre la mesa.",
      text: "The pizza looks strange. Vale feels nervous about the result.",
      es: "La pizza se ve rara. Vale se siente nerviosa por el resultado.",
      speaker: "narrator",
      words: [
        { word: "strange", es: "raro" },
        { word: "nervous", es: "nerviosa" },
        { word: "result", es: "resultado" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale sonríe con confianza junto al horno.",
      text: "Vale says: \"I can do it. After that, you cook it for ten minutes.\"",
      es: "Vale dice: «Yo puedo. Después de eso, la cocinas diez minutos.»",
      speaker: "vale",
      words: [
        { word: "cook", es: "cocinar" },
        { word: "minutes", es: "minutos" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "La pizza sale del horno y huele delicioso.",
      text: "\"Finally, you cut it and you eat it.\" The pizza smells delicious.",
      es: "«Finalmente, la cortas y te la comes.» La pizza huele deliciosa.",
      speaker: "vale",
      words: [
        { word: "cut", es: "cortar" },
        { word: "smells", es: "huele" },
        { word: "delicious", es: "delicioso" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "El equipo come pizza alrededor de la mesa.",
      text: "The team eats together. Mr. Reyes says: \"Vale teaches very well.\"",
      es: "El equipo come junto. Mr. Reyes dice: «Vale enseña muy bien.»",
      speaker: "boss",
      words: [
        { word: "eats", es: "come" },
        { word: "together", es: "juntos" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale piensa con una sonrisa mientras sostiene una rebanada.",
      text: "Vale thinks: \"Maybe one day I teach English like this.\"",
      es: "Vale piensa: «Quizá un día enseño inglés así.»",
      speaker: "vale",
      words: [
        { word: "thinks", es: "piensa" },
        { word: "Maybe", es: "quizá" },
        { word: "teach", es: "enseñar" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Ana mira su teléfono con cara de sorpresa.",
      text: "Ana looks at her phone: \"Nobody orders dinner tonight. Look at this.\"",
      es: "Ana mira su teléfono: «Nadie pide cena esta noche. Mira esto.»",
      speaker: "ana",
      words: [
        { word: "orders", es: "pide" },
        { word: "dinner", es: "cena" },
        { word: "tonight", es: "esta noche" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What do you add after the sauce?",
      questionEs: "¿Qué agregas después de la salsa?",
      options: [
        { label: "The cheese", emoji: "🧀" },
        { label: "The dough", emoji: "🫓" },
        { label: "The plate", emoji: "🍽️" },
      ],
      answer: 0,
      sayIt: "Then, you add the cheese.",
      sayItEs: "Repite: «Then, you add the cheese.»",
      sayItCheck: { target: "Then you add the cheese" },
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "What food do you cook at home?",
      questionEs: "¿Qué comida cocinas en casa?",
      options: [
        { label: "I cook eggs", emoji: "🍳" },
        { label: "I cook rice", emoji: "🍚" },
        { label: "I cook pupusas", emoji: "🫓" },
      ],
      answer: 0,
      sayIt: "I cook eggs at home.",
      sayItEs: "Ejemplo: «I cook eggs at home.»",
      sayItAskEn: "What food do you cook at home?",
      sayItAskEs: "¿Qué comida cocinas en casa?",
      sayItCheck: {
        target: "I cook *",
        altTargets: ["I make *", "At home I cook *"],
      },
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "Who cooks in your house?",
      questionEs: "¿Quién cocina en tu casa?",
      options: [
        { label: "My mom cooks", emoji: "👩" },
        { label: "I cook", emoji: "🙋" },
        { label: "My brother cooks", emoji: "👦" },
      ],
      answer: 0,
      sayIt: "My mom cooks in my house.",
      sayItEs: "Ejemplo: «My mom cooks in my house.»",
      sayItAskEn: "Who cooks in your house?",
      sayItAskEs: "¿Quién cocina en tu casa?",
      sayItCheck: {
        target: "* cooks",
        altTargets: ["I cook *", "My * cooks"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s6",
    phrase: "I can do it.",
    es: "Yo puedo hacerlo.",
  },
  continuePrompt: {
    en: "Explain how you make your favorite food. Use first, then, next, finally.",
    es: "Explica cómo haces tu comida favorita. Usa first, then, next, finally.",
  },
  continueWith: ["First, I prepare…", "Then, I add…", "Next, I cook…", "Finally, I eat…"],
  cliffhanger: {
    en: "Episode 13: Ana orders food with an app and something goes wrong.",
    es: "Episodio 13: Ana pide comida con una app y algo sale mal.",
  },
};
