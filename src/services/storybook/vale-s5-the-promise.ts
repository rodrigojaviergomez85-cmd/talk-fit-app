import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s5-the-promise/cover.jpg";
import s1 from "@/assets/storybook/vale-s5-the-promise/s1.jpg";
import s2 from "@/assets/storybook/vale-s5-the-promise/s2.jpg";
import s3 from "@/assets/storybook/vale-s5-the-promise/s3.jpg";
import s4 from "@/assets/storybook/vale-s5-the-promise/s4.jpg";
import s5 from "@/assets/storybook/vale-s5-the-promise/s5.jpg";
import s6 from "@/assets/storybook/vale-s5-the-promise/s6.jpg";
import s7 from "@/assets/storybook/vale-s5-the-promise/s7.jpg";
import s8 from "@/assets/storybook/vale-s5-the-promise/s8.jpg";
import s9 from "@/assets/storybook/vale-s5-the-promise/s9.jpg";
import s10 from "@/assets/storybook/vale-s5-the-promise/s10.jpg";

/**
 * Season 5 Episode 20 - "The promise".
 * Matches Basic 4 / Mixed Tenses Week 4:
 *   en: "Real Conversation - past, present & future together",
 *   es: "Conversacion real - pasado, presente y futuro juntos"
 */
export const VALE_S5_THE_PROMISE: StorybookEpisode = {
  id: "vale-s5-the-promise",
  moduleId: "mixed-tenses",
  week: 4,
  title: "The promise",
  titleEs: "La promesa",
  episodeLabel: { en: "Season 5 · Episode 20", es: "Temporada 5 · Episodio 20" },
  reviewWords: [
    { word: "promise", es: "promesa" },
    { word: "proud", es: "orgullosa" },
    { word: "future", es: "futuro" }
  ],
  blurb: {
    en: "The season ends with a full classroom, a signed contract, and a bigger dream.",
    es: "La temporada termina con un salón lleno, un contrato firmado y un sueño más grande.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "El salón está lleno de estudiantes felices.",
      text: "The classroom was full on the last day.",
      es: "El salón estaba lleno el último día.",
      words: [
        { word: "classroom", es: "salón" },
        { word: "full", es: "lleno" },
        { word: "last day", es: "último día" }
      ],
    }
,
    {
      id: "s2",
      image: s2,
      imageAlt: "Camila entrega certificados a los estudiantes.",
      text: "Camila gave the students their certificates.",
      es: "Camila entregó sus certificados a los estudiantes.",
      speaker: "camila",
      words: [
        { word: "gave", es: "entregó" },
        { word: "certificates", es: "certificados" }
      ],
    }
,
    {
      id: "s3",
      image: s3,
      imageAlt: "Dani cuenta que consiguió trabajo bilingüe.",
      text: "I got a bilingual job, Dani said proudly.",
      es: "«Conseguí un trabajo bilingüe», dijo Dani con orgullo.",
      speaker: "dani",
      words: [
        { word: "got", es: "conseguí" },
        { word: "bilingual", es: "bilingüe" },
        { word: "proudly", es: "con orgullo" }
      ],
    }
,
    {
      id: "s4",
      image: s4,
      imageAlt: "Todos aplauden a Dani.",
      text: "Everybody clapped for him.",
      es: "Todos aplaudieron por él.",
      words: [
        { word: "everybody", es: "todos" },
        { word: "clapped", es: "aplaudieron" }
      ],
    }
,
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale muestra el contrato firmado con la empresa.",
      text: "Vale showed the signed company contract.",
      es: "Vale mostró el contrato firmado con la empresa.",
      speaker: "vale",
      words: [
        { word: "showed", es: "mostró" },
        { word: "signed", es: "firmado" },
        { word: "contract", es: "contrato" }
      ],
    }
,
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale habla de los hábitos del año.",
      text: "We slept, we walked, we read, we tried again.",
      es: "«Dormimos, caminamos, leímos, intentamos otra vez».",
      speaker: "vale",
      words: [
        { word: "slept", es: "dormimos" },
        { word: "walked", es: "caminamos" },
        { word: "read", es: "leímos" },
        { word: "tried", es: "intentamos" }
      ],
    }
,
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale mira a cada estudiante a los ojos.",
      text: "Your habits built this room, she said.",
      es: "«Sus hábitos construyeron este salón», dijo ella.",
      speaker: "vale",
      words: [
        { word: "habits", es: "hábitos" },
        { word: "built", es: "construyeron" },
        { word: "room", es: "salón" }
      ],
    }
,
    {
      id: "s8",
      image: s8,
      imageAlt: "Los estudiantes repiten una frase juntos.",
      text: "Mistakes are part of the process!",
      es: "«¡Los errores son parte del proceso!».",
      words: [
        { word: "mistakes", es: "errores" },
        { word: "part", es: "parte" },
        { word: "process", es: "proceso" }
      ],
    }
,
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale escribe una meta nueva en el pizarrón.",
      text: "Next year: five cities in Latin America.",
      es: "«El próximo año: cinco ciudades en Latinoamérica».",
      speaker: "vale",
      words: [
        { word: "next year", es: "el próximo año" },
        { word: "cities", es: "ciudades" }
      ],
    }
,
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale apaga la luz con una sonrisa tranquila.",
      text: "I promise to keep growing. Are you coming with me?",
      es: "«Prometo seguir creciendo. ¿Vienen conmigo?».",
      speaker: "vale",
      words: [
        { word: "promise", es: "prometo" },
        { word: "keep", es: "seguir" },
        { word: "growing", es: "creciendo" }
      ],
    }

  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What did Dani get?",
      questionEs: "¿Qué consiguió Dani?",
      options: [
        { label: "A bilingual job", emoji: "💼" },
        { label: "A new phone", emoji: "📱" },
        { label: "A free class", emoji: "🎟️" }
      ],
      answer: 0,
      sayIt: "He got a bilingual job.",
      sayItEs: "Ejemplo: «He got a bilingual job.»",
      sayItAskEn: "What did you get this year that makes you proud?",
      sayItAskEs: "¿Qué conseguiste este año que te hace sentir orgulloso?",
      sayItCheck: { target: "I got *",
        altTargets: ["this year I got *"] },
    }
,
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "What built the classroom?",
      questionEs: "¿Qué construyó el salón?",
      options: [
        { label: "Their habits", emoji: "🧱" },
        { label: "Their phones", emoji: "📱" },
        { label: "Their luck", emoji: "🍀" }
      ],
      answer: 0,
      sayIt: "Your habits built this room.",
      sayItEs: "Ejemplo: «Your habits built this room.»",
      sayItAskEn: "Which habit do you do every day now?",
      sayItAskEs: "¿Qué hábito haces tú cada día ahora?",
      sayItCheck: { target: "Every day I *",
        altTargets: ["I *"] },
    }
,
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "What is Vale's goal for next year?",
      questionEs: "¿Cuál es la meta de Vale para el próximo año?",
      options: [
        { label: "Five cities in Latin America", emoji: "🌎" },
        { label: "One long vacation", emoji: "🏖️" },
        { label: "A smaller school", emoji: "🏚️" }
      ],
      answer: 0,
      sayIt: "Five cities in Latin America.",
      sayItEs: "Ejemplo: «Five cities in Latin America.»",
      sayItAskEn: "What is your goal for next year?",
      sayItAskEs: "¿Cuál es tu meta para el próximo año?",
      sayItCheck: { target: "Next year I am going to *",
        altTargets: ["I'm going to *", "my goal is to *"] },
    }

  ],
  habitCard: {
    afterScene: "s8",
    phrase: "Good habits build big dreams. I keep my promises to myself.",
    es: "Los buenos hábitos construyen sueños grandes. Cumplo las promesas que me hago.",
    model: "vale",
    modelActionEs: "Vale revisa su lista de hábitos del año y escribe la meta del próximo.",
  },
  continuePrompt: {
    en: "Tell us your own story. What did you achieve this season? What do you do every day now? What are you going to do next year?",
    es: "Cuéntanos tu historia. ¿Qué lograste esta temporada? ¿Qué haces cada día ahora? ¿Qué vas a hacer el próximo año?",
  },
  continueWith: [
    "This season I ...",
    "Every day I ...",
    "Next year I am going to ..."
  ],
  cliffhanger: {
    en: "Season 6: Vale takes her school to new cities. Corporate clients, real negotiations, and a bigger team are waiting.",
    es: "Temporada 6: Vale lleva su escuela a nuevas ciudades. Clientes corporativos, negociaciones reales y un equipo más grande la esperan.",
  },
};
