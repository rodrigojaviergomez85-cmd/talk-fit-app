import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s5-mentor-book/cover.jpg";
import s1 from "@/assets/storybook/vale-s5-mentor-book/s1.jpg";
import s2 from "@/assets/storybook/vale-s5-mentor-book/s2.jpg";
import s3 from "@/assets/storybook/vale-s5-mentor-book/s3.jpg";
import s4 from "@/assets/storybook/vale-s5-mentor-book/s4.jpg";
import s5 from "@/assets/storybook/vale-s5-mentor-book/s5.jpg";
import s6 from "@/assets/storybook/vale-s5-mentor-book/s6.jpg";
import s7 from "@/assets/storybook/vale-s5-mentor-book/s7.jpg";
import s8 from "@/assets/storybook/vale-s5-mentor-book/s8.jpg";
import s9 from "@/assets/storybook/vale-s5-mentor-book/s9.jpg";
import s10 from "@/assets/storybook/vale-s5-mentor-book/s10.jpg";

/**
 * Season 5 Episode 10 - "The mentor's book".
 * Matches Basic 4 / Mixed Tenses Week 2:
 *   en: "Everyday Life - present + past",
 *   es: "La vida diaria - presente + pasado"
 */
export const VALE_S5_MENTOR_BOOK: StorybookEpisode = {
  id: "vale-s5-mentor-book",
  moduleId: "mixed-tenses",
  week: 2,
  title: "The mentor's book",
  titleEs: "El libro del mentor",
  episodeLabel: { en: "Season 5 · Episode 10", es: "Temporada 5 · Episodio 10" },
  reviewWords: [
    { word: "book", es: "libro" },
    { word: "read", es: "leer" },
    { word: "pages", es: "páginas" }
  ],
  blurb: {
    en: "Vale finds a book from Mr. Reyes and starts reading ten pages a day.",
    es: "Vale encuentra un libro de Mr. Reyes y empieza a leer diez páginas al día.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale ordena una caja vieja en su oficina.",
      text: "Vale cleaned an old box in her office.",
      es: "Vale limpió una caja vieja en su oficina.",
      speaker: "vale",
      words: [
        { word: "cleaned", es: "limpió" },
        { word: "box", es: "caja" },
        { word: "office", es: "oficina" }
      ],
    }
,
    {
      id: "s2",
      image: s2,
      imageAlt: "Encuentra un libro gastado con una nota adentro.",
      text: "She found a used book with a note inside.",
      es: "Encontró un libro usado con una nota adentro.",
      speaker: "vale",
      words: [
        { word: "found", es: "encontró" },
        { word: "used", es: "usado" },
        { word: "note", es: "nota" }
      ],
    }
,
    {
      id: "s3",
      image: s3,
      imageAlt: "La nota es de Mr. Reyes, su antiguo jefe.",
      text: "The note was from Mr. Reyes, her old boss.",
      es: "La nota era de Mr. Reyes, su antiguo jefe.",
      words: [
        { word: "note", es: "nota" },
        { word: "old boss", es: "antiguo jefe" }
      ],
    }
,
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale lee la nota en voz alta.",
      text: "Leaders read. Ten pages a day, it said.",
      es: "«Los líderes leen. Diez páginas al día», decía.",
      speaker: "vale",
      words: [
        { word: "leaders", es: "líderes" },
        { word: "read", es: "leen" },
        { word: "pages", es: "páginas" }
      ],
    }
,
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale mira el reloj y sonríe.",
      text: "Vale smiled. I have ten minutes right now.",
      es: "Vale sonrió. «Tengo diez minutos ahora mismo».",
      speaker: "vale",
      words: [
        { word: "smiled", es: "sonrió" },
        { word: "right now", es: "ahora mismo" }
      ],
    }
,
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale lee sentada junto a la ventana.",
      text: "She read next to the window every morning.",
      es: "Ella leía junto a la ventana cada mañana.",
      words: [
        { word: "read", es: "leía" },
        { word: "window", es: "ventana" }
      ],
    }
,
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale escribe una idea nueva en su cuaderno.",
      text: "She wrote one new idea in her notebook.",
      es: "Escribió una idea nueva en su cuaderno.",
      speaker: "vale",
      words: [
        { word: "new", es: "nueva" },
        { word: "idea", es: "idea" },
        { word: "notebook", es: "cuaderno" }
      ],
    }
,
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale comparte la idea con sus estudiantes.",
      text: "The next day she shared the idea in class.",
      es: "Al día siguiente compartió la idea en clase.",
      speaker: "vale",
      words: [
        { word: "shared", es: "compartió" },
        { word: "class", es: "clase" }
      ],
    }
,
    {
      id: "s9",
      image: s9,
      imageAlt: "Los estudiantes escuchan con atención.",
      text: "The students listened carefully.",
      es: "Los estudiantes escucharon con atención.",
      words: [
        { word: "listened", es: "escucharon" },
        { word: "carefully", es: "con atención" }
      ],
    }
,
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale coloca el libro en un estante nuevo.",
      text: "I am going to read ten pages every day, she said.",
      es: "«Voy a leer diez páginas cada día», dijo ella.",
      speaker: "vale",
      words: [
        { word: "read", es: "leer" },
        { word: "every day", es: "cada día" }
      ],
    }

  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What did the note say?",
      questionEs: "¿Qué decía la nota?",
      options: [
        { label: "Ten pages a day", emoji: "📖" },
        { label: "Ten hours of TV", emoji: "📺" },
        { label: "Ten cups of coffee", emoji: "☕" }
      ],
      answer: 0,
      sayIt: "Leaders read. Ten pages a day.",
      sayItEs: "Ejemplo: «Leaders read. Ten pages a day.»",
      sayItAskEn: "What book or article did you read this month?",
      sayItAskEs: "¿Qué libro o artículo leíste este mes?",
      sayItCheck: { target: "I read *",
        altTargets: ["this month I read *"] },
    }
,
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "What did Vale write in her notebook?",
      questionEs: "¿Qué escribió Vale en su cuaderno?",
      options: [
        { label: "One new idea", emoji: "💡" },
        { label: "Her address", emoji: "🏠" },
        { label: "A song", emoji: "🎵" }
      ],
      answer: 0,
      sayIt: "She wrote one new idea.",
      sayItEs: "Ejemplo: «She wrote one new idea.»",
      sayItAskEn: "What idea do you want to learn more about?",
      sayItAskEs: "¿Sobre qué idea quieres aprender más?",
      sayItCheck: { target: "I want to learn *",
        altTargets: ["I want to learn about *"] },
    }
,
    {
      id: "q3",
      afterScene: "s10",
      questionEn: "What is Vale going to do every day?",
      questionEs: "¿Qué va a hacer Vale cada día?",
      options: [
        { label: "Read ten pages", emoji: "📚" },
        { label: "Sleep at noon", emoji: "😴" },
        { label: "Buy a new box", emoji: "📦" }
      ],
      answer: 0,
      sayIt: "She is going to read ten pages every day.",
      sayItEs: "Ejemplo: «She is going to read ten pages every day.»",
      sayItAskEn: "What are you going to read this week?",
      sayItAskEs: "¿Qué vas a leer esta semana?",
      sayItCheck: { target: "I am going to read *",
        altTargets: ["I'm going to read *", "this week I am going to read *"] },
    }

  ],
  habitCard: {
    afterScene: "s10",
    phrase: "I read ten pages a day. Mentors teach me even when they are not here.",
    es: "Leo diez páginas al día. Los mentores me enseñan aunque no estén presentes.",
    model: "vale",
    modelActionEs: "Vale deja el libro en su mesa de noche y lee antes de dormir.",
  },
  continuePrompt: {
    en: "Tell us about learning. What did you learn last week? What do you read every week? What are you going to learn next month?",
    es: "Cuéntanos sobre aprender. ¿Qué aprendiste la semana pasada? ¿Qué lees cada semana? ¿Qué vas a aprender el próximo mes?",
  },
  continueWith: [
    "Last week I learned ...",
    "Every week I read ...",
    "Next month I am going to learn ..."
  ],
  cliffhanger: {
    en: "Episode 11: A student asks Vale how to use AI to study. What will she answer?",
    es: "Episodio 11: Un estudiante le pregunta a Vale cómo usar la IA para estudiar. ¿Qué responderá?",
  },
};
