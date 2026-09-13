import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s5-hard-month/cover.jpg";
import s1 from "@/assets/storybook/vale-s5-hard-month/s1.jpg";
import s2 from "@/assets/storybook/vale-s5-hard-month/s2.jpg";
import s3 from "@/assets/storybook/vale-s5-hard-month/s3.jpg";
import s4 from "@/assets/storybook/vale-s5-hard-month/s4.jpg";
import s5 from "@/assets/storybook/vale-s5-hard-month/s5.jpg";
import s6 from "@/assets/storybook/vale-s5-hard-month/s6.jpg";
import s7 from "@/assets/storybook/vale-s5-hard-month/s7.jpg";
import s8 from "@/assets/storybook/vale-s5-hard-month/s8.jpg";
import s9 from "@/assets/storybook/vale-s5-hard-month/s9.jpg";
import s10 from "@/assets/storybook/vale-s5-hard-month/s10.jpg";

/**
 * Season 5 Episode 14 - "The hard month".
 * Matches Basic 4 / Mixed Tenses Week 3:
 *   en: "Ask Questions - yes/no + WH across time",
 *   es: "Haz preguntas - si/no + WH en todos los tiempos"
 */
export const VALE_S5_HARD_MONTH: StorybookEpisode = {
  id: "vale-s5-hard-month",
  moduleId: "mixed-tenses",
  week: 3,
  title: "The hard month",
  titleEs: "El mes difícil",
  episodeLabel: { en: "Season 5 · Episode 14", es: "Temporada 5 · Episodio 14" },
  reviewWords: [
    { word: "hard", es: "difícil" },
    { word: "money", es: "dinero" },
    { word: "grateful", es: "agradecida" }
  ],
  blurb: {
    en: "Money is short and two students leave. Vale writes a gratitude list.",
    es: "Falta dinero y dos estudiantes se van. Vale escribe una lista de gratitud.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale mira facturas sobre su escritorio.",
      text: "The bills were bigger than the money.",
      es: "Las cuentas eran más grandes que el dinero.",
      words: [
        { word: "bills", es: "cuentas" },
        { word: "bigger", es: "más grandes" },
        { word: "money", es: "dinero" }
      ],
    }
,
    {
      id: "s2",
      image: s2,
      imageAlt: "Dos sillas quedan vacías en el salón.",
      text: "Two students left last month.",
      es: "Dos estudiantes se fueron el mes pasado.",
      words: [
        { word: "left", es: "se fueron" },
        { word: "last month", es: "el mes pasado" }
      ],
    }
,
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale se sienta sola en el salón vacío.",
      text: "Vale sat alone in the empty room.",
      es: "Vale se sentó sola en el salón vacío.",
      speaker: "vale",
      words: [
        { word: "alone", es: "sola" },
        { word: "empty", es: "vacío" },
        { word: "room", es: "salón" }
      ],
    }
,
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale abre su cuaderno en una página en blanco.",
      text: "She opened her notebook to a blank page.",
      es: "Abrió su cuaderno en una página en blanco.",
      speaker: "vale",
      words: [
        { word: "opened", es: "abrió" },
        { word: "blank", es: "en blanco" },
        { word: "page", es: "página" }
      ],
    }
,
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale escribe el número uno.",
      text: "Number one: I have a school, she wrote.",
      es: "«Número uno: tengo una escuela», escribió.",
      speaker: "vale",
      words: [
        { word: "number", es: "número" },
        { word: "school", es: "escuela" }
      ],
    }
,
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale escribe el número dos con una sonrisa pequeña.",
      text: "Number two: nine students still come.",
      es: "«Número dos: nueve estudiantes todavía vienen».",
      speaker: "vale",
      words: [
        { word: "still", es: "todavía" },
        { word: "come", es: "vienen" }
      ],
    }
,
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale escribe el número tres.",
      text: "Number three: my family believes in me.",
      es: "«Número tres: mi familia cree en mí».",
      speaker: "vale",
      words: [
        { word: "family", es: "familia" },
        { word: "believes", es: "cree" }
      ],
    }
,
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale mira la lista completa.",
      text: "The list was long. The problem felt smaller.",
      es: "La lista era larga. El problema se sintió más pequeño.",
      words: [
        { word: "list", es: "lista" },
        { word: "problem", es: "problema" },
        { word: "smaller", es: "más pequeño" }
      ],
    }
,
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale enciende la luz y prepara la clase.",
      text: "Vale turned on the light and prepared class.",
      es: "Vale encendió la luz y preparó la clase.",
      speaker: "vale",
      words: [
        { word: "turned on", es: "encendió" },
        { word: "light", es: "luz" },
        { word: "prepared", es: "preparó" }
      ],
    }
,
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale escribe en el pizarrón: I am grateful.",
      text: "Hard months end. Grateful people keep going.",
      es: "«Los meses difíciles terminan. La gente agradecida sigue».",
      speaker: "vale",
      words: [
        { word: "hard", es: "difíciles" },
        { word: "end", es: "terminan" },
        { word: "keep going", es: "seguir" }
      ],
    }

  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s2",
      questionEn: "How many students left?",
      questionEs: "¿Cuántos estudiantes se fueron?",
      options: [
        { label: "Two", emoji: "✌️" },
        { label: "Nine", emoji: "9️⃣" },
        { label: "Nobody", emoji: "🚫" }
      ],
      answer: 0,
      sayIt: "Two students left.",
      sayItEs: "Ejemplo: «Two students left.»",
      sayItAskEn: "What was hard for you last month?",
      sayItAskEs: "¿Qué fue difícil para ti el mes pasado?",
      sayItCheck: { target: "it was hard *",
        altTargets: ["last month *", "it was hard *"] },
    }
,
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "What did Vale write as number three?",
      questionEs: "¿Qué escribió Vale como número tres?",
      options: [
        { label: "My family believes in me", emoji: "❤️" },
        { label: "I need more bills", emoji: "🧾" },
        { label: "I want a new phone", emoji: "📱" }
      ],
      answer: 0,
      sayIt: "My family believes in me.",
      sayItEs: "Ejemplo: «My family believes in me.»",
      sayItAskEn: "Who believes in you?",
      sayItAskEs: "¿Quién cree en ti?",
      sayItCheck: { target: "* believes in me",
        altTargets: ["my * believes in me"] },
    }
,
    {
      id: "q3",
      afterScene: "s10",
      questionEn: "What do grateful people do?",
      questionEs: "¿Qué hace la gente agradecida?",
      options: [
        { label: "They keep going", emoji: "🔥" },
        { label: "They stop", emoji: "🛑" },
        { label: "They complain", emoji: "😤" }
      ],
      answer: 0,
      sayIt: "Grateful people keep going.",
      sayItEs: "Ejemplo: «Grateful people keep going.»",
      sayItAskEn: "What are you going to be grateful for tomorrow?",
      sayItAskEs: "¿Por qué vas a estar agradecido mañana?",
      sayItCheck: { target: "I am going to be grateful for *",
        altTargets: ["I'm going to be grateful for *"] },
    }

  ],
  habitCard: {
    afterScene: "s8",
    phrase: "When things are hard, I write three things I am grateful for.",
    es: "Cuando las cosas son difíciles, escribo tres cosas por las que estoy agradecida.",
    model: "vale",
    modelActionEs: "Vale abre su cuaderno y escribe tres cosas buenas antes de rendirse.",
  },
  continuePrompt: {
    en: "Tell us your story. What was hard last month? What do you do when you feel tired? What are you going to do next month?",
    es: "Cuéntanos tu historia. ¿Qué fue difícil el mes pasado? ¿Qué haces cuando te sientes cansado? ¿Qué vas a hacer el próximo mes?",
  },
  continueWith: [
    "Last month it was hard because ...",
    "When I feel tired I ...",
    "Next month I am going to ..."
  ],
  cliffhanger: {
    en: "Episode 15: Someone new knocks on the school door. Who is it?",
    es: "Episodio 15: Alguien nuevo toca la puerta de la escuela. ¿Quién es?",
  },
};
