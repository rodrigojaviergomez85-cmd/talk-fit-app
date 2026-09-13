import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s5-sleepy-student/cover.jpg";
import s1 from "@/assets/storybook/vale-s5-sleepy-student/s1.jpg";
import s2 from "@/assets/storybook/vale-s5-sleepy-student/s2.jpg";
import s3 from "@/assets/storybook/vale-s5-sleepy-student/s3.jpg";
import s4 from "@/assets/storybook/vale-s5-sleepy-student/s4.jpg";
import s5 from "@/assets/storybook/vale-s5-sleepy-student/s5.jpg";
import s6 from "@/assets/storybook/vale-s5-sleepy-student/s6.jpg";
import s7 from "@/assets/storybook/vale-s5-sleepy-student/s7.jpg";
import s8 from "@/assets/storybook/vale-s5-sleepy-student/s8.jpg";
import s9 from "@/assets/storybook/vale-s5-sleepy-student/s9.jpg";
import s10 from "@/assets/storybook/vale-s5-sleepy-student/s10.jpg";

/**
 * Season 5 Episode 8 - "The sleepy student".
 * Matches Basic 4 / Mixed Tenses Week 2:
 *   en: "Everyday Life - present + past",
 *   es: "La vida diaria - presente + pasado"
 */
export const VALE_S5_SLEEPY_STUDENT: StorybookEpisode = {
  id: "vale-s5-sleepy-student",
  moduleId: "mixed-tenses",
  week: 2,
  title: "The sleepy student",
  titleEs: "El estudiante dormido",
  episodeLabel: { en: "Season 5 · Episode 8", es: "Temporada 5 · Episodio 8" },
  reviewWords: [
    { word: "asleep", es: "dormido" },
    { word: "routine", es: "rutina" },
    { word: "night", es: "noche" }
  ],
  blurb: {
    en: "Dani falls asleep in class. Vale helps him build a night routine.",
    es: "Dani se duerme en clase. Vale lo ayuda a crear una rutina de noche.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Dani apoya la cabeza sobre el pupitre.",
      text: "Dani put his head on the desk.",
      es: "Dani puso la cabeza sobre el pupitre.",
      words: [
        { word: "put", es: "puso" },
        { word: "head", es: "cabeza" },
        { word: "desk", es: "pupitre" }
      ],
    }
,
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale se acerca despacio y sonríe.",
      text: "Vale walked over quietly. Dani, are you okay?",
      es: "Vale se acercó en silencio. «Dani, ¿estás bien?».",
      speaker: "vale",
      words: [
        { word: "quietly", es: "en silencio" },
        { word: "okay", es: "bien" }
      ],
    }
,
    {
      id: "s3",
      image: s3,
      imageAlt: "Dani se despierta avergonzado.",
      text: "I slept two hours last night, he said.",
      es: "«Dormí dos horas anoche», dijo él.",
      speaker: "dani",
      words: [
        { word: "slept", es: "dormí" },
        { word: "hours", es: "horas" },
        { word: "last night", es: "anoche" }
      ],
    }
,
    {
      id: "s4",
      image: s4,
      imageAlt: "Dani muestra su teléfono lleno de videos.",
      text: "I watched videos until three in the morning.",
      es: "«Vi videos hasta las tres de la mañana».",
      speaker: "dani",
      words: [
        { word: "watched", es: "vi" },
        { word: "videos", es: "videos" },
        { word: "until", es: "hasta" }
      ],
    }
,
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale se sienta a su lado con calma.",
      text: "Vale sat next to him. Your body is not lazy.",
      es: "Vale se sentó a su lado. «Tu cuerpo no es perezoso».",
      speaker: "vale",
      words: [
        { word: "sat", es: "se sentó" },
        { word: "body", es: "cuerpo" },
        { word: "lazy", es: "perezoso" }
      ],
    }
,
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale dibuja un reloj sencillo en una hoja.",
      text: "She drew a simple clock on a piece of paper.",
      es: "Ella dibujó un reloj sencillo en una hoja.",
      speaker: "vale",
      words: [
        { word: "drew", es: "dibujó" },
        { word: "clock", es: "reloj" },
        { word: "paper", es: "hoja" }
      ],
    }
,
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale señala las diez de la noche en el reloj.",
      text: "Phone off at ten. Sleep at ten thirty.",
      es: "«Teléfono apagado a las diez. Dormir a las diez y media».",
      speaker: "vale",
      words: [
        { word: "phone", es: "teléfono" },
        { word: "off", es: "apagado" },
        { word: "sleep", es: "dormir" }
      ],
    }
,
    {
      id: "s8",
      image: s8,
      imageAlt: "Dani guarda su teléfono en la mochila.",
      text: "That night, Dani put his phone in a drawer.",
      es: "Esa noche, Dani puso su teléfono en un cajón.",
      words: [
        { word: "that night", es: "esa noche" },
        { word: "drawer", es: "cajón" }
      ],
    }
,
    {
      id: "s9",
      image: s9,
      imageAlt: "Dani llega despierto y con energía a clase.",
      text: "The next day, he arrived awake and ready.",
      es: "Al día siguiente, llegó despierto y listo.",
      words: [
        { word: "next day", es: "al día siguiente" },
        { word: "awake", es: "despierto" },
        { word: "ready", es: "listo" }
      ],
    }
,
    {
      id: "s10",
      image: s10,
      imageAlt: "Dani levanta la mano por primera vez.",
      text: "For the first time, Dani raised his hand.",
      es: "Por primera vez, Dani levantó la mano.",
      words: [
        { word: "first time", es: "primera vez" },
        { word: "raised", es: "levantó" },
        { word: "hand", es: "mano" }
      ],
    }

  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "How many hours did Dani sleep?",
      questionEs: "¿Cuántas horas durmió Dani?",
      options: [
        { label: "Two hours", emoji: "😵" },
        { label: "Nine hours", emoji: "😴" },
        { label: "Six hours", emoji: "🕕" }
      ],
      answer: 0,
      sayIt: "He slept two hours last night.",
      sayItEs: "Ejemplo: «He slept two hours last night.»",
      sayItAskEn: "How many hours did you sleep last night?",
      sayItAskEs: "¿Cuántas horas dormiste anoche?",
      sayItCheck: { target: "I slept *",
        altTargets: ["last night I slept *"] },
    }
,
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "What time does Vale turn the phone off?",
      questionEs: "¿A qué hora apaga el teléfono Vale?",
      options: [
        { label: "At ten", emoji: "🕙" },
        { label: "At noon", emoji: "🕛" },
        { label: "At three", emoji: "🕒" }
      ],
      answer: 0,
      sayIt: "Phone off at ten.",
      sayItEs: "Ejemplo: «Phone off at ten.»",
      sayItAskEn: "What time do you turn your phone off?",
      sayItAskEs: "¿A qué hora apagas tú tu teléfono?",
      sayItCheck: { target: "I turn *",
        altTargets: ["at * I turn my phone off", "I turn my phone off at *"] },
    }
,
    {
      id: "q3",
      afterScene: "s10",
      questionEn: "What did Dani do the next day?",
      questionEs: "¿Qué hizo Dani al día siguiente?",
      options: [
        { label: "He raised his hand", emoji: "✋" },
        { label: "He slept again", emoji: "😴" },
        { label: "He left early", emoji: "🚪" }
      ],
      answer: 0,
      sayIt: "He raised his hand.",
      sayItEs: "Ejemplo: «He raised his hand.»",
      sayItAskEn: "What are you going to do tonight to sleep better?",
      sayItAskEs: "¿Qué vas a hacer esta noche para dormir mejor?",
      sayItCheck: { target: "I am going to *",
        altTargets: ["tonight I am going to *", "I'm going to *"] },
    }

  ],
  habitCard: {
    afterScene: "s8",
    phrase: "I turn my phone off early. Rest is part of my success.",
    es: "Apago mi teléfono temprano. El descanso es parte de mi éxito.",
    model: "dani",
    modelActionEs: "Dani guarda su teléfono en un cajón a las diez de la noche.",
  },
  continuePrompt: {
    en: "Tell us about your nights. What did you do last night? What do you do every night? What are you going to change tonight?",
    es: "Cuéntanos de tus noches. ¿Qué hiciste anoche? ¿Qué haces cada noche? ¿Qué vas a cambiar esta noche?",
  },
  continueWith: [
    "Last night I ...",
    "Every night I ...",
    "Tonight I am going to ..."
  ],
  cliffhanger: {
    en: "Episode 9: Vale eats lunch at her desk every day. Kat has an idea.",
    es: "Episodio 9: Vale almuerza en su escritorio cada día. Kat tiene una idea.",
  },
};
