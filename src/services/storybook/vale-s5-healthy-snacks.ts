import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s5-healthy-snacks/cover.jpg";
import s1 from "@/assets/storybook/vale-s5-healthy-snacks/s1.jpg";
import s2 from "@/assets/storybook/vale-s5-healthy-snacks/s2.jpg";
import s3 from "@/assets/storybook/vale-s5-healthy-snacks/s3.jpg";
import s4 from "@/assets/storybook/vale-s5-healthy-snacks/s4.jpg";
import s5 from "@/assets/storybook/vale-s5-healthy-snacks/s5.jpg";
import s6 from "@/assets/storybook/vale-s5-healthy-snacks/s6.jpg";
import s7 from "@/assets/storybook/vale-s5-healthy-snacks/s7.jpg";
import s8 from "@/assets/storybook/vale-s5-healthy-snacks/s8.jpg";
import s9 from "@/assets/storybook/vale-s5-healthy-snacks/s9.jpg";
import s10 from "@/assets/storybook/vale-s5-healthy-snacks/s10.jpg";

/**
 * Season 5 Episode 5 - "Healthy snacks".
 * Matches Basic 4 / Mixed Tenses Week 1:
 *   en: "Yesterday & Tomorrow - past + future",
 *   es: "Ayer y manana - pasado + futuro"
 */
export const VALE_S5_HEALTHY_SNACKS: StorybookEpisode = {
  id: "vale-s5-healthy-snacks",
  moduleId: "mixed-tenses",
  week: 1,
  title: "Healthy snacks",
  titleEs: "Snacks saludables",
  episodeLabel: { en: "Season 5 · Episode 5", es: "Temporada 5 · Episodio 5" },
  reviewWords: [
    { word: "snacks", es: "snacks" },
    { word: "healthy", es: "saludable" },
    { word: "fruit", es: "fruta" }
  ],
  blurb: {
    en: "Kat brings apples and nuts. Vale sees how healthy food fuels the brain.",
    es: "Kat trae manzanas y nueces. Vale ve cómo la comida saludable alimenta el cerebro.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Es la hora de la merienda en la escuela.",
      text: "It was snack time at the school.",
      es: "Era la hora de la merienda en la escuela.",
      words: [
        { word: "snack", es: "merienda" },
        { word: "school", es: "escuela" }
      ],
    }
,
    {
      id: "s2",
      image: s2,
      imageAlt: "Kat abre su bolsa de almuerzo con manzanas y nueces.",
      text: "Kat opened her lunch bag. Inside there were apples and nuts.",
      es: "Kat abrió su bolsa de almuerzo. Dentro había manzanas y nueces.",
      speaker: "kat",
      words: [
        { word: "lunch", es: "almuerzo" },
        { word: "apples", es: "manzanas" },
        { word: "nuts", es: "nueces" }
      ],
    }
,
    {
      id: "s3",
      image: s3,
      imageAlt: "Kat dice que siempre trae snacks saludables.",
      text: "I always bring healthy snacks, she said.",
      es: "«Siempre traigo snacks saludables», dijo ella.",
      speaker: "kat",
      words: [
        { word: "bring", es: "traigo" },
        { word: "healthy", es: "saludable" },
        { word: "snacks", es: "snacks" }
      ],
    }
,
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale toma una galleta de su escritorio.",
      text: "Vale took a cookie from her desk.",
      es: "Vale tomó una galleta de su escritorio.",
      speaker: "vale",
      words: [
        { word: "took", es: "tomó" },
        { word: "cookie", es: "galleta" },
        { word: "desk", es: "escritorio" }
      ],
    }
,
    {
      id: "s5",
      image: s5,
      imageAlt: "Kat explica que la fruta le da energía.",
      text: "Cookies taste good, but fruit gives me energy, Kat said.",
      es: "«Las galletas saben rico, pero la fruta me da energía», dijo Kat.",
      speaker: "kat",
      words: [
        { word: "taste", es: "saben" },
        { word: "fruit", es: "fruta" },
        { word: "gives", es: "me da" }
      ],
    }
,
    {
      id: "s6",
      image: s6,
      imageAlt: "Los estudiantes miran las manzanas de Kat.",
      text: "The students looked at Kat's apples.",
      es: "Los estudiantes miraron las manzanas de Kat.",
      words: [
        { word: "looked at", es: "miraron" },
        { word: "apples", es: "manzanas" }
      ],
    }
,
    {
      id: "s7",
      image: s7,
      imageAlt: "Un estudiante pregunta si puede comer una manzana.",
      text: "One boy asked, Can I have one?",
      es: "Un chico preguntó: «¿Puedo tener una?».",
      words: [
        { word: "asked", es: "preguntó" }
      ],
    }
,
    {
      id: "s8",
      image: s8,
      imageAlt: "Kat comparte una manzana con él.",
      text: "Kat shared an apple with him.",
      es: "Kat compartió una manzana con él.",
      speaker: "kat",
      words: [
        { word: "shared", es: "compartió" },
        { word: "apple", es: "manzana" }
      ],
    }
,
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale come una manzana y sonríe.",
      text: "Vale ate an apple too. This is sweet and strong.",
      es: "Vale también comió una manzana. «Esto es dulce y fuerte».",
      speaker: "vale",
      words: [
        { word: "ate", es: "comió" },
        { word: "sweet", es: "dulce" },
        { word: "strong", es: "fuerte" }
      ],
    }
,
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale dice que la comida saludable la ayuda a pensar.",
      text: "Healthy food helps me think, Vale said.",
      es: "«La comida saludable me ayuda a pensar», dijo Vale.",
      speaker: "vale",
      words: [
        { word: "food", es: "comida" },
        { word: "helps", es: "ayuda" },
        { word: "think", es: "pensar" }
      ],
    }

  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What does Kat bring?",
      questionEs: "¿Qué trae Kat?",
      options: [
        { label: "Healthy snacks", emoji: "🍎" },
        { label: "Pizza", emoji: "🍕" },
        { label: "Soda", emoji: "🥤" }
      ],
      answer: 0,
      sayIt: "I always bring healthy snacks.",
      sayItEs: "Ejemplo: «I always bring healthy snacks.»",
      sayItAskEn: "What do you bring to school or work?",
      sayItAskEs: "¿Qué traes tú a la escuela o al trabajo?",
      sayItCheck: { target: "I bring *" },
    }
,
    {
      id: "q2",
      afterScene: "s5",
      questionEn: "What gives Kat energy?",
      questionEs: "¿Qué le da energía a Kat?",
      options: [
        { label: "Fruit", emoji: "🍎" },
        { label: "Cookies", emoji: "🍪" },
        { label: "Coffee", emoji: "☕" }
      ],
      answer: 0,
      sayIt: "Fruit gives me energy.",
      sayItEs: "Ejemplo: «Fruit gives me energy.»",
      sayItAskEn: "What gives you energy?",
      sayItAskEs: "¿Qué te da energía a ti?",
      sayItCheck: { target: "* gives me energy" },
    }
,
    {
      id: "q3",
      afterScene: "s10",
      questionEn: "What does healthy food help Vale do?",
      questionEs: "¿Qué ayuda a hacer a Vale la comida saludable?",
      options: [
        { label: "Think", emoji: "🧠" },
        { label: "Sleep", emoji: "😴" },
        { label: "Run", emoji: "🏃" }
      ],
      answer: 0,
      sayIt: "Healthy food helps me think.",
      sayItEs: "Ejemplo: «Healthy food helps me think.»",
      sayItAskEn: "What does healthy food help you do?",
      sayItAskEs: "¿En qué te ayuda la comida saludable?",
      sayItCheck: { target: "It helps me *" },
    }

  ],
  habitCard: {
    afterScene: "s10",
    phrase: "I choose healthy snacks to fuel my brain.",
    es: "Elijo snacks saludables para alimentar mi cerebro.",
    model: "kat",
    modelActionEs: "Kat abre su bolsa y saca una manzana.",
  },
  continuePrompt: {
    en: "What do you usually eat for a snack? What did you eat yesterday? What healthy food are you going to choose tomorrow?",
    es: "¿Qué sueles comer de merienda? ¿Qué comiste ayer? ¿Qué comida saludable vas a elegir mañana?",
  },
  continueWith: [
    "I usually eat ...",
    "Yesterday I ate ...",
    "Tomorrow I am going to choose ..."
  ],
  cliffhanger: {
    en: "Episode 6: Mateo runs every morning. Will Vale join him?",
    es: "Episodio 6: Mateo corre cada mañana. ¿Se unirá Vale?",
  },
};
