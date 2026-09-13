import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s4-ep1/cover.jpg";
import s1 from "@/assets/storybook/vale-s4-ep1/s1.jpg";
import s2 from "@/assets/storybook/vale-s4-ep1/s2.jpg";
import s3 from "@/assets/storybook/vale-s4-ep1/s3.jpg";
import s4 from "@/assets/storybook/vale-s4-ep1/s4.jpg";
import s5 from "@/assets/storybook/vale-s4-ep1/s5.jpg";
import s6 from "@/assets/storybook/vale-s4-ep1/s6.jpg";
import s7 from "@/assets/storybook/vale-s4-ep1/s7.jpg";
import s8 from "@/assets/storybook/vale-s4-ep1/s8.jpg";
import s9 from "@/assets/storybook/vale-s4-ep1/s9.jpg";
import s10 from "@/assets/storybook/vale-s4-ep1/s10.jpg";

/**
 * Season 4 · Episode 1 — "Yesterday morning".
 * Matches Basic 3 / Past Stories Week 1 Day 1: simple past — my morning yesterday.
 * Camila, now a local blogger, interviews Vale about her story.
 */
export const VALE_S4_YESTERDAY_MORNING: StorybookEpisode = {
  id: "vale-s4-yesterday-morning",
  moduleId: "past-stories",
  week: 1,
  title: "Yesterday morning",
  titleEs: "La mañana de ayer",
  episodeLabel: { en: "Season 4 · Episode 1", es: "Temporada 4 · Episodio 1" },
  reviewWords: [
    { word: "schedule", es: "horario" },
    { word: "routine", es: "rutina" },
    { word: "wakes up", es: "se despierta" },
    { word: "shift", es: "turno" },
  ],
  blurb: {
    en: "Camila is a blogger now. She visits Vale: 'Tell me everything. How was your day yesterday?'",
    es: "Camila ahora es bloguera. Visita a Vale: «Cuéntamelo todo. ¿Cómo fue tu día ayer?»",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Camila llega a la casa de Vale con una libreta.",
      text: "Camila knocked on Vale's door with a notebook.",
      es: "Camila tocó la puerta de Vale con una libreta.",
      words: [
        { word: "knocked", es: "tocó (la puerta)" },
        { word: "door", es: "puerta" },
        { word: "notebook", es: "libreta" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Camila sonríe y le muestra su blog a Vale.",
      text: '"I write a blog now. I want your story," she said.',
      es: "«Ahora escribo un blog. Quiero tu historia», dijo ella.",
      speaker: "camila",
      words: [
        { word: "write", es: "escribo / escribir" },
        { word: "blog", es: "blog" },
        { word: "want", es: "quiero" },
        { word: "story", es: "historia" },
        { word: "said", es: "dijo" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale se ríe y acepta la entrevista.",
      text: "Vale laughed. \"Okay! Ask me about yesterday.\"",
      es: "Vale se rió. «¡Okay! Pregúntame sobre ayer».",
      speaker: "vale",
      words: [
        { word: "laughed", es: "se rió" },
        { word: "ask", es: "preguntar" },
        { word: "yesterday", es: "ayer" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Flashback: Vale se despierta y apaga la alarma.",
      text: '"Yesterday I woke up at six. I stopped the alarm."',
      es: "«Ayer me desperté a las seis. Apagué la alarma».",
      speaker: "vale",
      words: [
        { word: "woke up", es: "me desperté" },
        { word: "stopped", es: "apagué / detuve" },
        { word: "alarm", es: "alarma" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Flashback: Vale se cepilla los dientes y se peina.",
      text: '"I brushed my teeth and combed my long hair."',
      es: "«Me cepillé los dientes y me peiné mi cabello largo».",
      speaker: "vale",
      words: [
        { word: "brushed", es: "cepillé" },
        { word: "teeth", es: "dientes" },
        { word: "combed", es: "peiné" },
        { word: "hair", es: "cabello" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Flashback: Vale cocina huevos y café en la cocina.",
      text: '"I cooked eggs and made coffee. It smelled so good."',
      es: "«Cociné huevos e hice café. Olía muy rico».",
      speaker: "vale",
      words: [
        { word: "cooked", es: "cociné" },
        { word: "eggs", es: "huevos" },
        { word: "made", es: "hice / preparé" },
        { word: "coffee", es: "café" },
        { word: "smelled", es: "olía" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Flashback: Vale desayuna con su mamá.",
      text: '"I ate breakfast with my mom. We talked and laughed."',
      es: "«Desayuné con mi mamá. Hablamos y nos reímos».",
      speaker: "vale",
      words: [
        { word: "ate", es: "comí" },
        { word: "mom", es: "mamá" },
        { word: "talked", es: "hablamos" },
        { word: "laughed", es: "nos reímos" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Flashback: Vale corre hacia la parada del autobús.",
      text: '"Then I walked fast to the bus stop."',
      es: "«Luego caminé rápido a la parada del autobús».",
      speaker: "vale",
      words: [
        { word: "then", es: "luego / entonces" },
        { word: "walked", es: "caminé" },
        { word: "fast", es: "rápido" },
        { word: "bus stop", es: "parada del autobús" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Camila escribe todo rápido en su libreta.",
      text: "Camila wrote everything down. \"This is gold,\" she said.",
      es: "Camila escribió todo. «Esto es oro», dijo.",
      speaker: "camila",
      words: [
        { word: "wrote", es: "escribió" },
        { word: "everything", es: "todo" },
        { word: "down", es: "anotado (write down = anotar)" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Camila le pregunta a Vale por el trabajo.",
      text: '"Great morning! And what happened at work?"',
      es: "«¡Qué buena mañana! ¿Y qué pasó en el trabajo?»",
      speaker: "camila",
      words: [
        { word: "happened", es: "pasó" },
        { word: "work", es: "trabajo" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What time did Vale wake up yesterday?",
      questionEs: "¿A qué hora se despertó Vale ayer?",
      options: [
        { label: "At six o'clock", emoji: "🕕" },
        { label: "At eight o'clock", emoji: "🕗" },
        { label: "At twelve o'clock", emoji: "🕛" },
      ],
      answer: 0,
      sayIt: "She woke up at six o'clock.",
      sayItEs: "Ejemplo: «She woke up at six o'clock.»",
      sayItAskEn: "What time did you wake up yesterday?",
      sayItAskEs: "¿A qué hora te despertaste ayer tú?",
      sayItCheck: {
        target: "I woke up at *",
        altTargets: ["at *", "* o'clock"],
      },
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "What did Vale cook yesterday morning?",
      questionEs: "¿Qué cocinó Vale ayer en la mañana?",
      options: [
        { label: "Eggs and coffee", emoji: "🍳" },
        { label: "Pizza", emoji: "🍕" },
        { label: "A sandwich", emoji: "🥪" },
      ],
      answer: 0,
      sayIt: "She cooked eggs and made coffee.",
      sayItEs: "Ejemplo: «She cooked eggs and made coffee.»",
      sayItAskEn: "What did you eat yesterday morning?",
      sayItAskEs: "¿Qué comiste ayer en la mañana tú?",
      sayItCheck: {
        target: "I ate *",
        altTargets: ["I cooked *", "I made *"],
      },
    },
    {
      id: "q3",
      afterScene: "s8",
      questionEn: "Where did Vale walk fast?",
      questionEs: "¿A dónde caminó rápido Vale?",
      options: [
        { label: "To the bus stop", emoji: "🚌" },
        { label: "To the beach", emoji: "🏖️" },
        { label: "To the park", emoji: "🌳" },
      ],
      answer: 0,
      sayIt: "She walked fast to the bus stop.",
      sayItEs: "Ejemplo: «She walked fast to the bus stop.»",
      sayItAskEn: "Where did you go yesterday?",
      sayItAskEs: "¿A dónde fuiste ayer tú?",
      sayItCheck: {
        target: "I went to *",
        altTargets: ["I walked to *", "to *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s5",
    phrase: "I can do it.",
    es: "Yo puedo hacerlo.",
  },
  continuePrompt: {
    en: "Now tell us about YOUR yesterday morning. What did you do?",
    es: "Ahora cuéntanos TU mañana de ayer. ¿Qué hiciste?",
  },
  continueWith: [
    "Yesterday I woke up at…",
    "I ate…",
    "I made…",
    "I walked to…",
  ],
  cliffhanger: {
    en: "Episode 2: Vale's day at work — a call she will never forget.",
    es: "Episodio 2: El día de Vale en el trabajo — una llamada que nunca olvidará.",
  },
};
