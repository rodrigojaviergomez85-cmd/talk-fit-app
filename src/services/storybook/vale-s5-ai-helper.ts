import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s5-ai-helper/cover.jpg";
import s1 from "@/assets/storybook/vale-s5-ai-helper/s1.jpg";
import s2 from "@/assets/storybook/vale-s5-ai-helper/s2.jpg";
import s3 from "@/assets/storybook/vale-s5-ai-helper/s3.jpg";
import s4 from "@/assets/storybook/vale-s5-ai-helper/s4.jpg";
import s5 from "@/assets/storybook/vale-s5-ai-helper/s5.jpg";
import s6 from "@/assets/storybook/vale-s5-ai-helper/s6.jpg";
import s7 from "@/assets/storybook/vale-s5-ai-helper/s7.jpg";
import s8 from "@/assets/storybook/vale-s5-ai-helper/s8.jpg";
import s9 from "@/assets/storybook/vale-s5-ai-helper/s9.jpg";
import s10 from "@/assets/storybook/vale-s5-ai-helper/s10.jpg";

/**
 * Season 5 Episode 11 - "The AI helper".
 * Matches Basic 4 / Mixed Tenses Week 3:
 *   en: "Ask Questions - yes/no + WH across time",
 *   es: "Haz preguntas - si/no + WH en todos los tiempos"
 */
export const VALE_S5_AI_HELPER: StorybookEpisode = {
  id: "vale-s5-ai-helper",
  moduleId: "mixed-tenses",
  week: 3,
  title: "The AI helper",
  titleEs: "La ayuda de la IA",
  episodeLabel: { en: "Season 5 · Episode 11", es: "Temporada 5 · Episodio 11" },
  reviewWords: [
    { word: "ask", es: "preguntar" },
    { word: "help", es: "ayuda" },
    { word: "answer", es: "respuesta" }
  ],
  blurb: {
    en: "Dani asks how to use AI to practice. Vale teaches him to use it as a coach, not a shortcut.",
    es: "Dani pregunta cómo usar la IA para practicar. Vale le enseña a usarla como entrenador, no como atajo.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Dani levanta la mano con el teléfono en la otra mano.",
      text: "Teacher, can I ask a question? Dani said.",
      es: "«Teacher, ¿puedo hacer una pregunta?», dijo Dani.",
      speaker: "dani",
      words: [
        { word: "ask", es: "hacer" },
        { word: "question", es: "pregunta" }
      ],
    }
,
    {
      id: "s2",
      image: s2,
      imageAlt: "Dani muestra una app de IA en la pantalla.",
      text: "Did you use AI when you were a student?",
      es: "«¿Usaste IA cuando eras estudiante?».",
      speaker: "dani",
      words: [
        { word: "use", es: "usar" },
        { word: "student", es: "estudiante" }
      ],
    }
,
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale se ríe y asiente.",
      text: "Yes, I did. But I used it to practice, not to copy.",
      es: "«Sí. Pero la usé para practicar, no para copiar».",
      speaker: "vale",
      words: [
        { word: "practice", es: "practicar" },
        { word: "copy", es: "copiar" }
      ],
    }
,
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale escribe tres preguntas en el pizarrón.",
      text: "Vale wrote three questions on the board.",
      es: "Vale escribió tres preguntas en el pizarrón.",
      speaker: "vale",
      words: [
        { word: "wrote", es: "escribió" },
        { word: "questions", es: "preguntas" }
      ],
    }
,
    {
      id: "s5",
      image: s5,
      imageAlt: "Las preguntas dicen qué, cuándo y por qué.",
      text: "What? When? Why? Good questions open doors.",
      es: "«¿Qué? ¿Cuándo? ¿Por qué? Las buenas preguntas abren puertas».",
      speaker: "vale",
      words: [
        { word: "open", es: "abren" },
        { word: "doors", es: "puertas" }
      ],
    }
,
    {
      id: "s6",
      image: s6,
      imageAlt: "Dani escribe una pregunta larga en su cuaderno.",
      text: "Dani wrote a long question in his notebook.",
      es: "Dani escribió una pregunta larga en su cuaderno.",
      words: [
        { word: "long", es: "larga" },
        { word: "notebook", es: "cuaderno" }
      ],
    }
,
    {
      id: "s7",
      image: s7,
      imageAlt: "Dani lee la respuesta de la IA en voz alta.",
      text: "He read the answer out loud in English.",
      es: "Leyó la respuesta en voz alta en inglés.",
      speaker: "dani",
      words: [
        { word: "answer", es: "respuesta" },
        { word: "out loud", es: "en voz alta" }
      ],
    }
,
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale corrige una palabra con calma.",
      text: "Vale corrected one word with a smile.",
      es: "Vale corrigió una palabra con una sonrisa.",
      speaker: "vale",
      words: [
        { word: "corrected", es: "corrigió" },
        { word: "word", es: "palabra" },
        { word: "smile", es: "sonrisa" }
      ],
    }
,
    {
      id: "s9",
      image: s9,
      imageAlt: "Dani repite la frase correcta.",
      text: "Dani repeated the correct sentence.",
      es: "Dani repitió la oración correcta.",
      speaker: "dani",
      words: [
        { word: "repeated", es: "repitió" },
        { word: "correct", es: "correcta" },
        { word: "sentence", es: "oración" }
      ],
    }
,
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale escribe una regla en el pizarrón.",
      text: "Ask AI. Then speak it yourself, she said.",
      es: "«Pregúntale a la IA. Luego dilo tú», dijo ella.",
      speaker: "vale",
      words: [
        { word: "ask", es: "pregunta" },
        { word: "speak", es: "habla" },
        { word: "yourself", es: "tú mismo" }
      ],
    }

  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "Did Vale use AI to copy?",
      questionEs: "¿Usaba Vale la IA para copiar?",
      options: [
        { label: "No, to practice", emoji: "🗣️" },
        { label: "Yes, always", emoji: "📋" },
        { label: "She never used it", emoji: "🚫" }
      ],
      answer: 0,
      sayIt: "No. She used it to practice.",
      sayItEs: "Ejemplo: «No. She used it to practice.»",
      sayItAskEn: "How do you use AI to practice English?",
      sayItAskEs: "¿Cómo usas la IA para practicar inglés?",
      sayItCheck: { target: "I use it to *",
        altTargets: ["I use AI to *"] },
    }
,
    {
      id: "q2",
      afterScene: "s5",
      questionEn: "Which question words did Vale write?",
      questionEs: "¿Qué palabras de pregunta escribió Vale?",
      options: [
        { label: "What, When, Why", emoji: "❓" },
        { label: "Yes and No", emoji: "✅" },
        { label: "Hello and Bye", emoji: "👋" }
      ],
      answer: 0,
      sayIt: "What? When? Why?",
      sayItEs: "Ejemplo: «What? When? Why?»",
      sayItAskEn: "What question do you want to ask in English?",
      sayItAskEs: "¿Qué pregunta quieres hacer en inglés?",
      sayItCheck: { target: "I want to ask *",
        altTargets: ["how *", "what *", "when *", "why *"] },
    }
,
    {
      id: "q3",
      afterScene: "s10",
      questionEn: "What is Vale's rule?",
      questionEs: "¿Cuál es la regla de Vale?",
      options: [
        { label: "Ask AI, then speak it yourself", emoji: "🎙️" },
        { label: "Only read", emoji: "📖" },
        { label: "Never ask", emoji: "🙊" }
      ],
      answer: 0,
      sayIt: "Ask AI. Then speak it yourself.",
      sayItEs: "Ejemplo: «Ask AI. Then speak it yourself.»",
      sayItAskEn: "What are you going to ask AI tomorrow?",
      sayItAskEs: "¿Qué le vas a preguntar a la IA mañana?",
      sayItCheck: { target: "I am going to ask *",
        altTargets: ["I'm going to ask *", "tomorrow I am going to ask *"] },
    }

  ],
  habitCard: {
    afterScene: "s10",
    phrase: "I use AI to practice out loud, not to copy. I speak my own answer.",
    es: "Uso la IA para practicar en voz alta, no para copiar. Digo mi propia respuesta.",
    model: "vale",
    modelActionEs: "Vale pide una corrección a la IA y luego repite la frase con su propia voz.",
  },
  continuePrompt: {
    en: "Tell us about questions. What did you ask this week? What do you ask every day? What are you going to ask tomorrow?",
    es: "Cuéntanos sobre preguntas. ¿Qué preguntaste esta semana? ¿Qué preguntas cada día? ¿Qué vas a preguntar mañana?",
  },
  continueWith: [
    "This week I asked ...",
    "Every day I ask ...",
    "Tomorrow I am going to ask ..."
  ],
  cliffhanger: {
    en: "Episode 12: A student stops coming to class. Where is she?",
    es: "Episodio 12: Una estudiante deja de venir a clase. ¿Dónde está?",
  },
};
