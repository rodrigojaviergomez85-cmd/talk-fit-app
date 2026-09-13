import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s5-real-lunch/cover.jpg";
import s1 from "@/assets/storybook/vale-s5-real-lunch/s1.jpg";
import s2 from "@/assets/storybook/vale-s5-real-lunch/s2.jpg";
import s3 from "@/assets/storybook/vale-s5-real-lunch/s3.jpg";
import s4 from "@/assets/storybook/vale-s5-real-lunch/s4.jpg";
import s5 from "@/assets/storybook/vale-s5-real-lunch/s5.jpg";
import s6 from "@/assets/storybook/vale-s5-real-lunch/s6.jpg";
import s7 from "@/assets/storybook/vale-s5-real-lunch/s7.jpg";
import s8 from "@/assets/storybook/vale-s5-real-lunch/s8.jpg";
import s9 from "@/assets/storybook/vale-s5-real-lunch/s9.jpg";
import s10 from "@/assets/storybook/vale-s5-real-lunch/s10.jpg";

/**
 * Season 5 Episode 9 - "A real lunch".
 * Matches Basic 4 / Mixed Tenses Week 2:
 *   en: "Everyday Life - present + past",
 *   es: "La vida diaria - presente + pasado"
 */
export const VALE_S5_REAL_LUNCH: StorybookEpisode = {
  id: "vale-s5-real-lunch",
  moduleId: "mixed-tenses",
  week: 2,
  title: "A real lunch",
  titleEs: "Un almuerzo de verdad",
  episodeLabel: { en: "Season 5 · Episode 9", es: "Temporada 5 · Episodio 9" },
  reviewWords: [
    { word: "lunch", es: "almuerzo" },
    { word: "plate", es: "plato" },
    { word: "vegetables", es: "verduras" }
  ],
  blurb: {
    en: "Vale eats fast food at her desk. Kat and Mateo show her a better plate.",
    es: "Vale come comida rápida en su escritorio. Kat y Mateo le muestran un mejor plato.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale come frente a la computadora.",
      text: "Vale ate lunch at her desk every day.",
      es: "Vale almorzaba en su escritorio cada día.",
      speaker: "vale",
      words: [
        { word: "ate", es: "comía" },
        { word: "lunch", es: "almuerzo" },
        { word: "desk", es: "escritorio" }
      ],
    }
,
    {
      id: "s2",
      image: s2,
      imageAlt: "Una bolsa de comida rápida está vacía sobre la mesa.",
      text: "Yesterday she ate fried chicken and soda.",
      es: "Ayer comió pollo frito y refresco.",
      words: [
        { word: "fried", es: "frito" },
        { word: "chicken", es: "pollo" },
        { word: "soda", es: "refresco" }
      ],
    }
,
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale bosteza a las tres de la tarde.",
      text: "At three o'clock she had no energy.",
      es: "A las tres no tenía energía.",
      speaker: "vale",
      words: [
        { word: "energy", es: "energía" },
        { word: "o'clock", es: "en punto" }
      ],
    }
,
    {
      id: "s4",
      image: s4,
      imageAlt: "Kat entra con dos platos de comida casera.",
      text: "Kat came in with two plates of home food.",
      es: "Kat entró con dos platos de comida casera.",
      speaker: "kat",
      words: [
        { word: "plates", es: "platos" },
        { word: "home food", es: "comida casera" }
      ],
    }
,
    {
      id: "s5",
      image: s5,
      imageAlt: "El plato tiene arroz, frijoles, pollo y verduras.",
      text: "Rice, beans, chicken, and vegetables.",
      es: "Arroz, frijoles, pollo y verduras.",
      words: [
        { word: "rice", es: "arroz" },
        { word: "beans", es: "frijoles" },
        { word: "vegetables", es: "verduras" }
      ],
    }
,
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale prueba la comida y abre los ojos.",
      text: "Vale tried the food. This is so good!",
      es: "Vale probó la comida. «¡Esto está buenísimo!».",
      speaker: "vale",
      words: [
        { word: "tried", es: "probó" },
        { word: "good", es: "bueno" }
      ],
    }
,
    {
      id: "s7",
      image: s7,
      imageAlt: "Kat explica su rutina de domingo.",
      text: "I cook on Sunday for the whole week, Kat said.",
      es: "«Cocino el domingo para toda la semana», dijo Kat.",
      speaker: "kat",
      words: [
        { word: "cook", es: "cocino" },
        { word: "Sunday", es: "domingo" },
        { word: "whole week", es: "toda la semana" }
      ],
    }
,
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale y Kat comen fuera, bajo un árbol.",
      text: "They ate outside under a tree.",
      es: "Comieron afuera bajo un árbol.",
      words: [
        { word: "outside", es: "afuera" },
        { word: "under", es: "bajo" },
        { word: "tree", es: "árbol" }
      ],
    }
,
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale regresa a clase con energía.",
      text: "Vale went back to class with energy.",
      es: "Vale volvió a clase con energía.",
      speaker: "vale",
      words: [
        { word: "went back", es: "volvió" },
        { word: "class", es: "clase" }
      ],
    }
,
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale escribe su plan de comidas en el pizarrón.",
      text: "Next Sunday I am going to cook too, she said.",
      es: "«El próximo domingo yo también voy a cocinar», dijo ella.",
      speaker: "vale",
      words: [
        { word: "next", es: "próximo" },
        { word: "cook", es: "cocinar" }
      ],
    }

  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s2",
      questionEn: "What did Vale eat yesterday?",
      questionEs: "¿Qué comió Vale ayer?",
      options: [
        { label: "Fried chicken and soda", emoji: "🍗" },
        { label: "Rice and vegetables", emoji: "🥗" },
        { label: "Only fruit", emoji: "🍎" }
      ],
      answer: 0,
      sayIt: "She ate fried chicken and soda.",
      sayItEs: "Ejemplo: «She ate fried chicken and soda.»",
      sayItAskEn: "What did you eat for lunch yesterday?",
      sayItAskEs: "¿Qué almorzaste ayer?",
      sayItCheck: { target: "I ate *",
        altTargets: ["yesterday I ate *"] },
    }
,
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "When does Kat cook?",
      questionEs: "¿Cuándo cocina Kat?",
      options: [
        { label: "On Sunday", emoji: "🍲" },
        { label: "At midnight", emoji: "🌙" },
        { label: "Never", emoji: "🚫" }
      ],
      answer: 0,
      sayIt: "She cooks on Sunday for the whole week.",
      sayItEs: "Ejemplo: «She cooks on Sunday for the whole week.»",
      sayItAskEn: "When do you cook or prepare your food?",
      sayItAskEs: "¿Cuándo cocinas o preparas tu comida?",
      sayItCheck: { target: "I cook *",
        altTargets: ["I prepare *", "on * I cook"] },
    }
,
    {
      id: "q3",
      afterScene: "s10",
      questionEn: "What is Vale going to do next Sunday?",
      questionEs: "¿Qué va a hacer Vale el próximo domingo?",
      options: [
        { label: "Cook for the week", emoji: "👩‍🍳" },
        { label: "Sleep all day", emoji: "😴" },
        { label: "Buy soda", emoji: "🥤" }
      ],
      answer: 0,
      sayIt: "She is going to cook for the week.",
      sayItEs: "Ejemplo: «She is going to cook for the week.»",
      sayItAskEn: "What healthy food are you going to eat this week?",
      sayItAskEs: "¿Qué comida saludable vas a comer esta semana?",
      sayItCheck: { target: "I am going to eat *",
        altTargets: ["I'm going to eat *", "this week I am going to eat *"] },
    }

  ],
  habitCard: {
    afterScene: "s8",
    phrase: "I eat real food and I eat away from my screen.",
    es: "Como comida de verdad y lejos de la pantalla.",
    model: "kat",
    modelActionEs: "Kat prepara sus platos el domingo y almuerza afuera, sin teléfono.",
  },
  continuePrompt: {
    en: "Tell us about your food. What did you eat yesterday? What do you eat every day? What are you going to cook this week?",
    es: "Cuéntanos de tu comida. ¿Qué comiste ayer? ¿Qué comes cada día? ¿Qué vas a cocinar esta semana?",
  },
  continueWith: [
    "Yesterday I ate ...",
    "Every day I eat ...",
    "This week I am going to cook ..."
  ],
  cliffhanger: {
    en: "Episode 10: Vale finds an old book from a mentor. What is inside?",
    es: "Episodio 10: Vale encuentra un libro viejo de un mentor. ¿Qué hay adentro?",
  },
};
