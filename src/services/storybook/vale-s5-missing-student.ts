import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s5-missing-student/cover.jpg";
import s1 from "@/assets/storybook/vale-s5-missing-student/s1.jpg";
import s2 from "@/assets/storybook/vale-s5-missing-student/s2.jpg";
import s3 from "@/assets/storybook/vale-s5-missing-student/s3.jpg";
import s4 from "@/assets/storybook/vale-s5-missing-student/s4.jpg";
import s5 from "@/assets/storybook/vale-s5-missing-student/s5.jpg";
import s6 from "@/assets/storybook/vale-s5-missing-student/s6.jpg";
import s7 from "@/assets/storybook/vale-s5-missing-student/s7.jpg";
import s8 from "@/assets/storybook/vale-s5-missing-student/s8.jpg";
import s9 from "@/assets/storybook/vale-s5-missing-student/s9.jpg";
import s10 from "@/assets/storybook/vale-s5-missing-student/s10.jpg";

/**
 * Season 5 Episode 12 - "The missing student".
 * Matches Basic 4 / Mixed Tenses Week 3:
 *   en: "Ask Questions - yes/no + WH across time",
 *   es: "Haz preguntas - si/no + WH en todos los tiempos"
 */
export const VALE_S5_MISSING_STUDENT: StorybookEpisode = {
  id: "vale-s5-missing-student",
  moduleId: "mixed-tenses",
  week: 3,
  title: "The missing student",
  titleEs: "La estudiante que faltó",
  episodeLabel: { en: "Season 5 · Episode 12", es: "Temporada 5 · Episodio 12" },
  reviewWords: [
    { word: "missing", es: "ausente" },
    { word: "why", es: "por qué" },
    { word: "because", es: "porque" }
  ],
  blurb: {
    en: "A student disappears for a week. Vale asks questions instead of judging.",
    es: "Una estudiante desaparece una semana. Vale hace preguntas en vez de juzgar.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Una silla vacía en el salón de clases.",
      text: "One chair was empty for a week.",
      es: "Una silla estuvo vacía por una semana.",
      words: [
        { word: "chair", es: "silla" },
        { word: "empty", es: "vacía" },
        { word: "week", es: "semana" }
      ],
    }
,
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale revisa la lista de asistencia.",
      text: "Where is Camila? Vale asked the class.",
      es: "«¿Dónde está Camila?», preguntó Vale a la clase.",
      speaker: "vale",
      words: [
        { word: "where", es: "dónde" },
        { word: "asked", es: "preguntó" }
      ],
    }
,
    {
      id: "s3",
      image: s3,
      imageAlt: "Un estudiante levanta los hombros.",
      text: "Nobody knew the answer.",
      es: "Nadie sabía la respuesta.",
      words: [
        { word: "nobody", es: "nadie" },
        { word: "knew", es: "sabía" },
        { word: "answer", es: "respuesta" }
      ],
    }
,
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale llama por teléfono después de clase.",
      text: "After class, Vale called her.",
      es: "Después de clase, Vale la llamó.",
      speaker: "vale",
      words: [
        { word: "called", es: "llamó" },
        { word: "after", es: "después de" }
      ],
    }
,
    {
      id: "s5",
      image: s5,
      imageAlt: "Camila contesta con voz baja.",
      text: "Why did you stop coming? Vale asked kindly.",
      es: "«¿Por qué dejaste de venir?», preguntó Vale con cariño.",
      speaker: "vale",
      words: [
        { word: "stop", es: "dejar de" },
        { word: "coming", es: "venir" },
        { word: "kindly", es: "con cariño" }
      ],
    }
,
    {
      id: "s6",
      image: s6,
      imageAlt: "Camila explica que empezó un trabajo nuevo.",
      text: "Because I started a new job, Camila said.",
      es: "«Porque empecé un trabajo nuevo», dijo Camila.",
      speaker: "camila",
      words: [
        { word: "because", es: "porque" },
        { word: "started", es: "empecé" },
        { word: "job", es: "trabajo" }
      ],
    }
,
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale escucha y toma notas.",
      text: "Vale listened and took notes.",
      es: "Vale escuchó y tomó notas.",
      speaker: "vale",
      words: [
        { word: "listened", es: "escuchó" },
        { word: "took notes", es: "tomó notas" }
      ],
    }
,
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale propone una clase de sábado.",
      text: "Can you come on Saturday morning? she asked.",
      es: "«¿Puedes venir el sábado en la mañana?», preguntó.",
      speaker: "vale",
      words: [
        { word: "come", es: "venir" },
        { word: "Saturday", es: "sábado" }
      ],
    }
,
    {
      id: "s9",
      image: s9,
      imageAlt: "Camila sonríe aliviada al teléfono.",
      text: "Yes, I can! Camila answered.",
      es: "«¡Sí, puedo!», respondió Camila.",
      speaker: "camila",
      words: [
        { word: "yes", es: "sí" },
        { word: "can", es: "puedo" },
        { word: "answered", es: "respondió" }
      ],
    }
,
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale escribe una nueva clase en su calendario.",
      text: "Ask first. Judge never, Vale wrote.",
      es: "«Pregunta primero. Nunca juzgues», escribió Vale.",
      speaker: "vale",
      words: [
        { word: "ask", es: "pregunta" },
        { word: "first", es: "primero" },
        { word: "judge", es: "juzgar" }
      ],
    }

  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s6",
      questionEn: "Why did Camila stop coming?",
      questionEs: "¿Por qué dejó de venir Camila?",
      options: [
        { label: "She started a new job", emoji: "💼" },
        { label: "She moved to Canada", emoji: "✈️" },
        { label: "She lost her book", emoji: "📕" }
      ],
      answer: 0,
      sayIt: "Because she started a new job.",
      sayItEs: "Ejemplo: «Because she started a new job.»",
      sayItAskEn: "Why do you study English?",
      sayItAskEs: "¿Por qué estudias inglés tú?",
      sayItCheck: { target: "Because *",
        altTargets: ["I study English because *"] },
    }
,
    {
      id: "q2",
      afterScene: "s8",
      questionEn: "What did Vale offer?",
      questionEs: "¿Qué ofreció Vale?",
      options: [
        { label: "A Saturday class", emoji: "📅" },
        { label: "A free phone", emoji: "📱" },
        { label: "A new school", emoji: "🏫" }
      ],
      answer: 0,
      sayIt: "She offered a Saturday class.",
      sayItEs: "Ejemplo: «She offered a Saturday class.»",
      sayItAskEn: "When can you practice English every week?",
      sayItAskEs: "¿Cuándo puedes practicar inglés cada semana?",
      sayItCheck: { target: "I can practice *",
        altTargets: ["I can practice on *"] },
    }
,
    {
      id: "q3",
      afterScene: "s10",
      questionEn: "What did Vale write?",
      questionEs: "¿Qué escribió Vale?",
      options: [
        { label: "Ask first. Judge never.", emoji: "🤝" },
        { label: "Close the door.", emoji: "🚪" },
        { label: "Buy more chairs.", emoji: "🪑" }
      ],
      answer: 0,
      sayIt: "Ask first. Judge never.",
      sayItEs: "Ejemplo: «Ask first. Judge never.»",
      sayItAskEn: "Who are you going to ask about their day tomorrow?",
      sayItAskEs: "¿A quién le vas a preguntar por su día mañana?",
      sayItCheck: { target: "I am going to ask *",
        altTargets: ["I'm going to ask *"] },
    }

  ],
  habitCard: {
    afterScene: "s9",
    phrase: "I ask before I judge. Questions build people up.",
    es: "Pregunto antes de juzgar. Las preguntas levantan a las personas.",
    model: "vale",
    modelActionEs: "Vale llama a su estudiante y escucha su historia completa antes de opinar.",
  },
  continuePrompt: {
    en: "Tell us about people. Who did you help last week? Who do you talk to every day? Who are you going to call tomorrow?",
    es: "Cuéntanos de la gente. ¿A quién ayudaste la semana pasada? ¿Con quién hablas cada día? ¿A quién vas a llamar mañana?",
  },
  continueWith: [
    "Last week I helped ...",
    "Every day I talk to ...",
    "Tomorrow I am going to call ..."
  ],
  cliffhanger: {
    en: "Episode 13: Vale has a noisy week. Where will she find quiet?",
    es: "Episodio 13: Vale tiene una semana ruidosa. ¿Dónde encontrará silencio?",
  },
};
