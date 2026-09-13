import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s5-try-again/cover.jpg";
import s1 from "@/assets/storybook/vale-s5-try-again/s1.jpg";
import s2 from "@/assets/storybook/vale-s5-try-again/s2.jpg";
import s3 from "@/assets/storybook/vale-s5-try-again/s3.jpg";
import s4 from "@/assets/storybook/vale-s5-try-again/s4.jpg";
import s5 from "@/assets/storybook/vale-s5-try-again/s5.jpg";
import s6 from "@/assets/storybook/vale-s5-try-again/s6.jpg";
import s7 from "@/assets/storybook/vale-s5-try-again/s7.jpg";
import s8 from "@/assets/storybook/vale-s5-try-again/s8.jpg";
import s9 from "@/assets/storybook/vale-s5-try-again/s9.jpg";
import s10 from "@/assets/storybook/vale-s5-try-again/s10.jpg";

/**
 * Season 5 Episode 17 - "Try again".
 * Matches Basic 4 / Mixed Tenses Week 4:
 *   en: "Real Conversation - past, present & future together",
 *   es: "Conversacion real - pasado, presente y futuro juntos"
 */
export const VALE_S5_TRY_AGAIN: StorybookEpisode = {
  id: "vale-s5-try-again",
  moduleId: "mixed-tenses",
  week: 4,
  title: "Try again",
  titleEs: "Intenta otra vez",
  episodeLabel: { en: "Season 5 · Episode 17", es: "Temporada 5 · Episodio 17" },
  reviewWords: [
    { word: "no", es: "no" },
    { word: "again", es: "otra vez" },
    { word: "step", es: "paso" }
  ],
  blurb: {
    en: "Dani gets a no. Vale teaches him that a no is a step, not a wall.",
    es: "Dani recibe un no. Vale le enseña que un no es un paso, no una pared.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Dani entra con la mirada baja.",
      text: "Dani came in with his eyes down.",
      es: "Dani entró con la mirada baja.",
      words: [
        { word: "came in", es: "entró" },
        { word: "eyes", es: "ojos" },
        { word: "down", es: "abajo" }
      ],
    }
,
    {
      id: "s2",
      image: s2,
      imageAlt: "Dani muestra el correo en su teléfono.",
      text: "They said no, he said quietly.",
      es: "«Dijeron que no», dijo en voz baja.",
      speaker: "dani",
      words: [
        { word: "said", es: "dijeron" },
        { word: "quietly", es: "en voz baja" }
      ],
    }
,
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale se sienta a su lado sin prisa.",
      text: "Vale sat next to him without hurry.",
      es: "Vale se sentó a su lado sin prisa.",
      speaker: "vale",
      words: [
        { word: "next to", es: "al lado de" },
        { word: "hurry", es: "prisa" }
      ],
    }
,
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale hace una pregunta directa.",
      text: "How many interviews did you do? she asked.",
      es: "«¿Cuántas entrevistas hiciste?», preguntó.",
      speaker: "vale",
      words: [
        { word: "how many", es: "cuántas" },
        { word: "interviews", es: "entrevistas" }
      ],
    }
,
    {
      id: "s5",
      image: s5,
      imageAlt: "Dani responde que solo una.",
      text: "Only one, he answered.",
      es: "«Solo una», respondió.",
      speaker: "dani",
      words: [
        { word: "only", es: "solo" },
        { word: "one", es: "una" }
      ],
    }
,
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale escribe el número veinte en el pizarrón.",
      text: "Vale wrote the number twenty on the board.",
      es: "Vale escribió el número veinte en el pizarrón.",
      speaker: "vale",
      words: [
        { word: "wrote", es: "escribió" },
        { word: "number", es: "número" },
        { word: "twenty", es: "veinte" }
      ],
    }
,
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale explica su propia historia con calma.",
      text: "I did nine interviews before my first yes.",
      es: "«Hice nueve entrevistas antes de mi primer sí».",
      speaker: "vale",
      words: [
        { word: "did", es: "hice" },
        { word: "before", es: "antes de" },
        { word: "first", es: "primer" }
      ],
    }
,
    {
      id: "s8",
      image: s8,
      imageAlt: "Dani levanta la cabeza y escucha.",
      text: "Dani lifted his head and listened.",
      es: "Dani levantó la cabeza y escuchó.",
      words: [
        { word: "lifted", es: "levantó" },
        { word: "head", es: "cabeza" },
        { word: "listened", es: "escuchó" }
      ],
    }
,
    {
      id: "s9",
      image: s9,
      imageAlt: "Dani escribe su nueva meta en el cuaderno.",
      text: "He wrote: twenty interviews this month.",
      es: "Escribió: «veinte entrevistas este mes».",
      speaker: "dani",
      words: [
        { word: "wrote", es: "escribió" },
        { word: "this month", es: "este mes" }
      ],
    }
,
    {
      id: "s10",
      image: s10,
      imageAlt: "Dani sale con la mochila al hombro.",
      text: "A no is a step. I am going to try again.",
      es: "«Un no es un paso. Voy a intentar otra vez».",
      speaker: "dani",
      words: [
        { word: "step", es: "paso" },
        { word: "try", es: "intentar" },
        { word: "again", es: "otra vez" }
      ],
    }

  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s5",
      questionEn: "How many interviews did Dani do?",
      questionEs: "¿Cuántas entrevistas hizo Dani?",
      options: [
        { label: "Only one", emoji: "1️⃣" },
        { label: "Twenty", emoji: "2️⃣0️⃣" },
        { label: "None", emoji: "🚫" }
      ],
      answer: 0,
      sayIt: "He did only one interview.",
      sayItEs: "Ejemplo: «He did only one interview.»",
      sayItAskEn: "What did you try recently, even if it was hard?",
      sayItAskEs: "¿Qué intentaste hace poco, aunque fue difícil?",
      sayItCheck: { target: "I tried *",
        altTargets: ["recently I tried *"] },
    }
,
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "How many interviews did Vale do before her first yes?",
      questionEs: "¿Cuántas entrevistas hizo Vale antes de su primer sí?",
      options: [
        { label: "Nine", emoji: "9️⃣" },
        { label: "One", emoji: "1️⃣" },
        { label: "Zero", emoji: "0️⃣" }
      ],
      answer: 0,
      sayIt: "She did nine interviews before her first yes.",
      sayItEs: "Ejemplo: «She did nine interviews before her first yes.»",
      sayItAskEn: "What do you do when someone says no?",
      sayItAskEs: "¿Qué haces cuando alguien te dice que no?",
      sayItCheck: { target: "I *",
        altTargets: ["when someone says no I *"] },
    }
,
    {
      id: "q3",
      afterScene: "s10",
      questionEn: "What is Dani going to do?",
      questionEs: "¿Qué va a hacer Dani?",
      options: [
        { label: "Try again", emoji: "🔁" },
        { label: "Stop forever", emoji: "🛑" },
        { label: "Sleep more", emoji: "😴" }
      ],
      answer: 0,
      sayIt: "He is going to try again.",
      sayItEs: "Ejemplo: «He is going to try again.»",
      sayItAskEn: "What are you going to try again this week?",
      sayItAskEs: "¿Qué vas a intentar otra vez esta semana?",
      sayItCheck: { target: "I am going to try *",
        altTargets: ["I'm going to try *"] },
    }

  ],
  habitCard: {
    afterScene: "s9",
    phrase: "A no is not a wall. It is a step. I try again.",
    es: "Un no no es una pared. Es un paso. Intento otra vez.",
    model: "dani",
    modelActionEs: "Dani escribe una meta nueva el mismo día que recibe el no.",
  },
  continuePrompt: {
    en: "Tell us your story. When did you fail and try again? What do you do every time you fail? What are you going to try next?",
    es: "Cuéntanos tu historia. ¿Cuándo fallaste y volviste a intentar? ¿Qué haces cada vez que fallas? ¿Qué vas a intentar después?",
  },
  continueWith: [
    "Once I failed and then I ...",
    "Every time I fail I ...",
    "Next I am going to ..."
  ],
  cliffhanger: {
    en: "Episode 18: Vale needs help. Will she hire her first employee?",
    es: "Episodio 18: Vale necesita ayuda. ¿Contratará a su primera empleada?",
  },
};
