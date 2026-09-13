import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s3-ep17/cover.jpg";
import s1 from "@/assets/storybook/vale-s3-ep17/s1.jpg";
import s2 from "@/assets/storybook/vale-s3-ep17/s2.jpg";
import s3 from "@/assets/storybook/vale-s3-ep17/s3.jpg";
import s4 from "@/assets/storybook/vale-s3-ep17/s4.jpg";
import s5 from "@/assets/storybook/vale-s3-ep17/s5.jpg";
import s6 from "@/assets/storybook/vale-s3-ep17/s6.jpg";
import s7 from "@/assets/storybook/vale-s3-ep17/s7.jpg";
import s8 from "@/assets/storybook/vale-s3-ep17/s8.jpg";
import s9 from "@/assets/storybook/vale-s3-ep17/s9.jpg";
import s10 from "@/assets/storybook/vale-s3-ep17/s10.jpg";

/**
 * Season 3 · Episode 17 — "The beach day".
 * Basic 2 / Simple Present Week 4 Day 17: present progressive at the beach.
 */
export const VALE_S3_BEACH_DAY: StorybookEpisode = {
  id: "vale-s3-beach-day",
  moduleId: "simple-present",
  week: 4,
  title: "The beach day",
  titleEs: "El día de playa",
  episodeLabel: { en: "Season 3 · Episode 17", es: "Temporada 3 · Episodio 17" },
  previously: [
    { en: "The team spent Saturday at the park.", es: "El equipo pasó el sábado en el parque." },
    { en: "Kat wrote: \"We are going to the beach!\"", es: "Kat escribió: «¡Vamos a la playa!»" },
  ],
  reviewWords: [
    { word: "running", es: "corriendo" },
    { word: "reading", es: "leyendo" },
    { word: "playing", es: "jugando" },
  ],
  blurb: {
    en: "Sun, waves and one friend who does not want to swim.",
    es: "Sol, olas y un amigo que no quiere nadar.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "El equipo llega a la playa con sombrillas.",
      text: "Sunday morning. The team is arriving at the beach.",
      es: "Domingo por la mañana. El equipo está llegando a la playa.",
      speaker: "narrator",
      words: [
        { word: "Sunday", es: "domingo" },
        { word: "arriving", es: "llegando" },
        { word: "beach", es: "playa" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Kat nada en el mar.",
      text: "Kat is swimming. The water is cold, but she is happy.",
      es: "Kat está nadando. El agua está fría, pero ella está feliz.",
      speaker: "narrator",
      words: [
        { word: "swimming", es: "nadando" },
        { word: "cold", es: "fría" },
        { word: "happy", es: "feliz" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Mateo juega voleibol en la arena.",
      text: "Mateo is playing volleyball. \"I am winning!\" he shouts.",
      es: "Mateo está jugando voleibol. «¡Voy ganando!», grita.",
      speaker: "mateo",
      words: [
        { word: "volleyball", es: "voleibol" },
        { word: "winning", es: "ganando" },
        { word: "shouts", es: "grita" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Ana toma fotos del mar con su teléfono.",
      text: "Ana is taking photos. She is not swimming today.",
      es: "Ana está tomando fotos. Hoy no está nadando.",
      speaker: "narrator",
      words: [
        { word: "taking", es: "tomando" },
        { word: "photos", es: "fotos" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale mira el mar desde la arena, con dudas.",
      text: "Vale is sitting on the sand. She is scared of big waves.",
      es: "Vale está sentada en la arena. Le dan miedo las olas grandes.",
      speaker: "narrator",
      words: [
        { word: "sand", es: "arena" },
        { word: "scared", es: "con miedo" },
        { word: "waves", es: "olas" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Kat invita a Vale a entrar al agua.",
      text: "Kat calls her: \"Come on, Vale! We are all here with you.\"",
      es: "Kat la llama: «¡Vamos, Vale! Todos estamos aquí contigo.»",
      speaker: "kat",
      words: [
        { word: "calls", es: "llama" },
        { word: "Come on", es: "vamos" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale se levanta decidida.",
      text: "Vale stands up and says: \"I can do it.\"",
      es: "Vale se levanta y dice: «Yo puedo hacerlo.»",
      speaker: "vale",
      words: [
        { word: "stands up", es: "se levanta" },
        { word: "can", es: "puedo" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale entra al agua riendo con Kat.",
      text: "Now Vale is swimming too. She is laughing with her friends.",
      es: "Ahora Vale también está nadando. Está riendo con sus amigos.",
      speaker: "narrator",
      words: [
        { word: "too", es: "también" },
        { word: "laughing", es: "riendo" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "El grupo come pupusas en la playa al atardecer.",
      text: "In the evening they are eating together and telling jokes in English.",
      es: "Por la tarde están comiendo juntos y contando chistes en inglés.",
      speaker: "narrator",
      words: [
        { word: "evening", es: "tarde/noche" },
        { word: "eating", es: "comiendo" },
        { word: "jokes", es: "chistes" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Mr. Reyes envía un mensaje sobre el lunes.",
      text: "Mr. Reyes sends a message: \"Monday, a very difficult customer is calling us.\"",
      es: "Mr. Reyes manda un mensaje: «El lunes nos llama un cliente muy difícil.»",
      speaker: "boss",
      words: [
        { word: "message", es: "mensaje" },
        { word: "difficult", es: "difícil" },
        { word: "customer", es: "cliente" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What is Mateo doing?",
      questionEs: "¿Qué está haciendo Mateo?",
      options: [
        { label: "He is playing volleyball", emoji: "🏐" },
        { label: "He is taking photos", emoji: "📸" },
        { label: "He is sleeping", emoji: "😴" },
      ],
      answer: 0,
      sayIt: "He is playing volleyball.",
      sayItEs: "Repite: «He is playing volleyball.»",
      sayItCheck: { target: "He is playing volleyball" },
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "Who do you go to the beach with?",
      questionEs: "¿Con quién vas a la playa?",
      options: [
        { label: "I go with my family", emoji: "👨‍👩‍👧" },
        { label: "I go with my friends", emoji: "🧑‍🤝‍🧑" },
        { label: "I go alone", emoji: "🚶" },
      ],
      answer: 0,
      sayIt: "I go to the beach with my family.",
      sayItEs: "Ejemplo: «I go to the beach with my family.»",
      sayItAskEn: "Who do you go to the beach with?",
      sayItAskEs: "¿Con quién vas a la playa?",
      sayItCheck: {
        target: "I go with *",
        altTargets: ["I go to the beach with *", "I go alone"],
      },
    },
    {
      id: "q3",
      afterScene: "s10",
      questionEn: "Why do you like weekends?",
      questionEs: "¿Por qué te gustan los fines de semana?",
      options: [
        { label: "Because I rest", emoji: "😌" },
        { label: "Because I see my family", emoji: "🏡" },
        { label: "Because I study English", emoji: "📘" },
      ],
      answer: 0,
      sayIt: "I like weekends because I rest.",
      sayItEs: "Ejemplo: «I like weekends because I rest.»",
      sayItAskEn: "Why do you like weekends?",
      sayItAskEs: "¿Por qué te gustan los fines de semana?",
      sayItCheck: {
        target: "I like weekends because *",
        altTargets: ["Because I *", "I like * because *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s7",
    phrase: "I can do it.",
    es: "Yo puedo hacerlo.",
  },
  continuePrompt: {
    en: "Describe a day at the beach or at the park. What is everybody doing?",
    es: "Describe un día en la playa o en el parque. ¿Qué está haciendo todo el mundo?",
  },
  continueWith: ["She is…", "He is…", "They are…", "I am…"],
  cliffhanger: {
    en: "Episode 18: Monday at the office. The difficult customer is calling.",
    es: "Episodio 18: Lunes en la oficina. El cliente difícil está llamando.",
  },
};
