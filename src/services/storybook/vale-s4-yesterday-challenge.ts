import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s4-ep5/cover.jpg";
import s1 from "@/assets/storybook/vale-s4-ep5/s1.jpg";
import s2 from "@/assets/storybook/vale-s4-ep5/s2.jpg";
import s3 from "@/assets/storybook/vale-s4-ep5/s3.jpg";
import s4 from "@/assets/storybook/vale-s4-ep5/s4.jpg";
import s5 from "@/assets/storybook/vale-s4-ep5/s5.jpg";
import s6 from "@/assets/storybook/vale-s4-ep5/s6.jpg";
import s7 from "@/assets/storybook/vale-s4-ep5/s7.jpg";
import s8 from "@/assets/storybook/vale-s4-ep5/s8.jpg";
import s9 from "@/assets/storybook/vale-s4-ep5/s9.jpg";
import s10 from "@/assets/storybook/vale-s4-ep5/s10.jpg";

/**
 * Season 4 · Episode 5 — "The yesterday challenge".
 * Matches Basic 3 / Past Stories Week 1 Day 5: simple past — telling a full day.
 */
export const VALE_S4_YESTERDAY_CHALLENGE: StorybookEpisode = {
  id: "vale-s4-yesterday-challenge",
  moduleId: "past-stories",
  week: 1,
  title: "The yesterday challenge",
  titleEs: "El reto de ayer",
  episodeLabel: { en: "Season 4 · Episode 5", es: "Temporada 4 · Episodio 5" },
  previously: [
    { en: "The team asked Vale: how was your day?", es: "El equipo le preguntó a Vale: ¿cómo estuvo tu día?" },
    { en: "Vale shared the news about the school.", es: "Vale compartió la noticia de la escuela." },
    { en: "Everyone clapped and felt proud.", es: "Todos aplaudieron y se sintieron orgullosos." },
  ],
  reviewWords: [
    { word: "great", es: "genial" },
    { word: "clapped", es: "aplaudió" },
    { word: "proud", es: "orgullosos" },
    { word: "thought", es: "pensó" },
  ],
  blurb: {
    en: "Vale confirms her Saturdays at the school — but first, the boss gives her a challenge: tell your whole day in English.",
    es: "Vale confirma sus sábados en la escuela — pero primero, el jefe le da un reto: cuenta todo tu día en inglés.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale llama por teléfono a la escuela y confirma.",
      text: "Vale called the school. \"Yes, every Saturday,\" she said.",
      es: "Vale llamó a la escuela. «Sí, todos los sábados», dijo.",
      speaker: "vale",
      words: [
        { word: "called", es: "llamó" },
        { word: "every Saturday", es: "todos los sábados" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale cuelga el teléfono y salta de alegría.",
      text: "She hung up and jumped. \"Every Saturday! I am a real teacher now!\"",
      es: "Colgó y saltó. «¡Todos los sábados! ¡Ahora soy una maestra de verdad!»",
      speaker: "vale",
      words: [
        { word: "hung up", es: "colgó (el teléfono)" },
        { word: "jumped", es: "saltó" },
        { word: "real", es: "de verdad / real" },
        { word: "teacher", es: "maestra" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "El jefe le propone un reto a Vale.",
      text: '"One challenge," said the boss. "Tell me your whole day. Only English."',
      es: "«Un reto», dijo el jefe. «Cuéntame todo tu día. Solo inglés».",
      speaker: "boss",
      words: [
        { word: "challenge", es: "reto" },
        { word: "whole", es: "todo / entero" },
        { word: "only", es: "solo / solamente" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale cierra los ojos y respira antes de hablar.",
      text: "Vale closed her eyes and breathed. \"I can do it.\"",
      es: "Vale cerró los ojos y respiró. «Yo puedo hacerlo».",
      speaker: "vale",
      words: [
        { word: "closed", es: "cerró" },
        { word: "eyes", es: "ojos" },
        { word: "breathed", es: "respiró" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale cuenta su mañana con las manos.",
      text: '"Yesterday I woke up at six. I cooked eggs and made coffee."',
      es: "«Ayer me desperté a las seis. Cociné huevos e hice café».",
      speaker: "vale",
      words: [
        { word: "woke up", es: "me desperté" },
        { word: "cooked", es: "cociné" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale cuenta su trabajo señalando los audífonos.",
      text: '"At work I answered calls. I fixed problems. I helped people."',
      es: "«En el trabajo contesté llamadas. Arreglé problemas. Ayudé a la gente».",
      speaker: "vale",
      words: [
        { word: "answered", es: "contesté" },
        { word: "fixed", es: "arreglé" },
        { word: "helped", es: "ayudé" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale cuenta su tarde con Luis y el mercado.",
      text: '"After work I walked with Luis. We bought mangoes at the market."',
      es: "«Después del trabajo caminé con Luis. Compramos mangos en el mercado».",
      speaker: "vale",
      words: [
        { word: "after work", es: "después del trabajo" },
        { word: "bought", es: "compramos" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale termina con una sonrisa enorme.",
      text: '"At night I hugged my mom. It was a beautiful day," she finished.',
      es: "«En la noche abracé a mi mamá. Fue un día hermoso», terminó.",
      speaker: "vale",
      words: [
        { word: "night", es: "noche" },
        { word: "beautiful", es: "hermoso / precioso" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "El jefe sonríe y le estrecha la mano.",
      text: '"Perfect," said the boss. "You told your whole day in English."',
      es: "«Perfecto», dijo el jefe. «Contaste todo tu día en inglés».",
      speaker: "boss",
      words: [
        { word: "perfect", es: "perfecto" },
        { word: "whole", es: "todo / entero" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale mira al frente, lista para su primer sábado como maestra.",
      text: "Saturday was close. Her first Saturday as the new teacher. Was she really ready?",
      es: "El sábado estaba cerca. Su primer sábado como la nueva maestra. ¿De verdad estaba lista?",
      words: [
        { word: "close", es: "cerca" },
        { word: "first", es: "primera" },
        { word: "class", es: "clase" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s2",
      questionEn: "What did Vale confirm to the school?",
      questionEs: "¿Qué le confirmó Vale a la escuela?",
      options: [
        { label: "Yes, every Saturday", emoji: "✅" },
        { label: "No, thanks", emoji: "❌" },
        { label: "Maybe next year", emoji: "🤔" },
      ],
      answer: 0,
      sayIt: "She said yes to every Saturday.",
      sayItEs: "Ejemplo: «She said yes to every Saturday.»",
      sayItAskEn: "What was the last big YES you said?",
      sayItAskEs: "¿Cuál fue tu último gran SÍ?",
      sayItCheck: {
        target: "I said yes to *",
        altTargets: ["I *"],
      },
    },
    {
      id: "q2",
      afterScene: "s4",
      questionEn: "What did Vale do before the challenge?",
      questionEs: "¿Qué hizo Vale antes del reto?",
      options: [
        { label: "She breathed and said: I can do it", emoji: "🌬️" },
        { label: "She ran away", emoji: "🏃‍♀️" },
        { label: "She cried", emoji: "😭" },
      ],
      answer: 0,
      sayIt: "She breathed and said: I can do it.",
      sayItEs: "Ejemplo: «She breathed and said: I can do it.»",
      sayItAskEn: "What do YOU say to yourself before a challenge?",
      sayItAskEs: "¿Qué te dices a ti mismo/a antes de un reto?",
      sayItCheck: {
        target: "I *",
        altTargets: ["I can do it", "I say *"],
      },
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "Did Vale tell her whole day in English?",
      questionEs: "¿Vale contó todo su día en inglés?",
      options: [
        { label: "Yes, she did", emoji: "🎉" },
        { label: "No, she gave up", emoji: "🙅" },
        { label: "She used Spanish", emoji: "🇪🇸" },
      ],
      answer: 0,
      sayIt: "Yes, she did. She told her whole day in English.",
      sayItEs: "Ejemplo: «Yes, she did. She told her whole day in English.»",
      sayItAskEn: "Can you tell YOUR whole day in English? Try now!",
      sayItAskEs: "¿Puedes contar TU día completo en inglés? ¡Inténtalo!",
      sayItCheck: {
        target: "I *",
        altTargets: ["yesterday I *", "yes"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s4",
    phrase: "I can do it.",
    es: "Yo puedo hacerlo.",
  },
  continuePrompt: {
    en: "Your turn! Tell your whole day yesterday in English, like Vale did.",
    es: "¡Tu turno! Cuenta tu día completo de ayer en inglés, como lo hizo Vale.",
  },
  continueWith: [
    "Yesterday I woke up at…",
    "At work/school I…",
    "After, I…",
    "At night I…",
  ],
  cliffhanger: {
    en: "Episode 6: Vale's first Saturday class. One student is not happy to see her.",
    es: "Episodio 6: La primera clase de Vale en sábado. Un estudiante no está feliz de verla.",
  },
};
