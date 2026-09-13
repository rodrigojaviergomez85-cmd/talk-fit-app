import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s3-ep16/cover.jpg";
import s1 from "@/assets/storybook/vale-s3-ep16/s1.jpg";
import s2 from "@/assets/storybook/vale-s3-ep16/s2.jpg";
import s3 from "@/assets/storybook/vale-s3-ep16/s3.jpg";
import s4 from "@/assets/storybook/vale-s3-ep16/s4.jpg";
import s5 from "@/assets/storybook/vale-s3-ep16/s5.jpg";
import s6 from "@/assets/storybook/vale-s3-ep16/s6.jpg";
import s7 from "@/assets/storybook/vale-s3-ep16/s7.jpg";
import s8 from "@/assets/storybook/vale-s3-ep16/s8.jpg";
import s9 from "@/assets/storybook/vale-s3-ep16/s9.jpg";
import s10 from "@/assets/storybook/vale-s3-ep16/s10.jpg";

/**
 * Season 3 · Episode 16 — "A free Saturday".
 * Basic 2 / Simple Present Week 4 Day 16: present progressive at the park.
 */
export const VALE_S3_FREE_SATURDAY: StorybookEpisode = {
  id: "vale-s3-free-saturday",
  moduleId: "simple-present",
  week: 4,
  title: "A free Saturday",
  titleEs: "Un sábado libre",
  episodeLabel: { en: "Season 3 · Episode 16", es: "Temporada 3 · Episodio 16" },
  previously: [
    { en: "Vale explained her process to the whole team.", es: "Vale explicó su proceso a todo el equipo." },
    { en: "She said: \"I am going to teach my first class.\"", es: "Dijo: «Voy a dar mi primera clase.»" },
  ],
  reviewWords: [
    { word: "process", es: "proceso" },
    { word: "ready", es: "lista" },
    { word: "team", es: "equipo" },
  ],
  blurb: {
    en: "Saturday at the park. Everybody is doing something right now.",
    es: "Sábado en el parque. Todos están haciendo algo ahora mismo.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale camina hacia un parque con sol.",
      text: "Saturday. No calls, no headset. Vale is walking to the park.",
      es: "Sábado. Sin llamadas, sin diadema. Vale está caminando al parque.",
      speaker: "narrator",
      words: [
        { word: "Saturday", es: "sábado" },
        { word: "walking", es: "caminando" },
        { word: "park", es: "parque" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Mateo corre en el parque.",
      text: "Mateo is running. He is not tired. He is smiling.",
      es: "Mateo está corriendo. No está cansado. Está sonriendo.",
      speaker: "narrator",
      words: [
        { word: "running", es: "corriendo" },
        { word: "tired", es: "cansado" },
        { word: "smiling", es: "sonriendo" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Ana lee un libro en una banca.",
      text: "Ana is sitting on a bench. She is reading a book in English.",
      es: "Ana está sentada en una banca. Está leyendo un libro en inglés.",
      speaker: "narrator",
      words: [
        { word: "sitting", es: "sentada" },
        { word: "bench", es: "banca" },
        { word: "reading", es: "leyendo" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Niños juegan fútbol en el pasto.",
      text: "Two kids are playing soccer. A dog is running after the ball.",
      es: "Dos niños están jugando fútbol. Un perro está corriendo tras el balón.",
      speaker: "narrator",
      words: [
        { word: "kids", es: "niños" },
        { word: "playing", es: "jugando" },
        { word: "dog", es: "perro" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale intenta describir la escena y se traba.",
      text: "Vale tries to describe the park in English. She stops. \"He... run? He running?\"",
      es: "Vale intenta describir el parque en inglés. Se detiene. «¿Él... corre? ¿Él corriendo?»",
      speaker: "vale",
      words: [
        { word: "tries", es: "intenta" },
        { word: "describe", es: "describir" },
        { word: "stops", es: "se detiene" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale respira y repite una frase.",
      text: "She breathes and says: \"Mistakes are part of the process. He is running.\"",
      es: "Respira y dice: «Los errores son parte del proceso. Él está corriendo.»",
      speaker: "vale",
      words: [
        { word: "breathes", es: "respira" },
        { word: "mistakes", es: "errores" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Ana y Vale conversan en la banca.",
      text: "Ana asks: \"What are they doing?\" Vale answers: \"They are playing soccer.\"",
      es: "Ana pregunta: «¿Qué están haciendo?» Vale responde: «Están jugando fútbol.»",
      speaker: "ana",
      words: [
        { word: "What", es: "qué" },
        { word: "doing", es: "haciendo" },
        { word: "answers", es: "responde" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Mateo llega con una botella de agua.",
      text: "Mateo arrives. \"I am drinking water. I am not stopping today!\"",
      es: "Mateo llega. «Estoy tomando agua. ¡Hoy no me detengo!»",
      speaker: "mateo",
      words: [
        { word: "drinking", es: "tomando" },
        { word: "water", es: "agua" },
        { word: "stopping", es: "deteniéndome" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Los tres amigos sentados mirando el parque.",
      text: "The three friends look around and describe everything. English feels easy today.",
      es: "Los tres amigos miran alrededor y describen todo. Hoy el inglés se siente fácil.",
      speaker: "narrator",
      words: [
        { word: "friends", es: "amigos" },
        { word: "around", es: "alrededor" },
        { word: "easy", es: "fácil" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "El teléfono de Vale muestra un mensaje de Kat.",
      text: "Vale's phone rings. Kat writes: \"We are going to the beach tomorrow!\"",
      es: "Suena el teléfono de Vale. Kat escribe: «¡Vamos a la playa mañana!»",
      speaker: "narrator",
      words: [
        { word: "phone", es: "teléfono" },
        { word: "writes", es: "escribe" },
        { word: "beach", es: "playa" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What is Ana doing?",
      questionEs: "¿Qué está haciendo Ana?",
      options: [
        { label: "She is reading a book", emoji: "📖" },
        { label: "She is running", emoji: "🏃‍♀️" },
        { label: "She is cooking", emoji: "🍳" },
      ],
      answer: 0,
      sayIt: "She is reading a book.",
      sayItEs: "Repite: «She is reading a book.»",
      sayItCheck: { target: "She is reading a book" },
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "Where do you go on a free Saturday?",
      questionEs: "¿Adónde vas un sábado libre?",
      options: [
        { label: "I go to the park", emoji: "🌳" },
        { label: "I stay at home", emoji: "🏠" },
        { label: "I go to my friend's house", emoji: "🚪" },
      ],
      answer: 0,
      sayIt: "I go to the park on Saturday.",
      sayItEs: "Ejemplo: «I go to the park on Saturday.»",
      sayItAskEn: "Where do you go on a free Saturday?",
      sayItAskEs: "¿Adónde vas un sábado libre?",
      sayItCheck: {
        target: "I go to *",
        altTargets: ["I stay *", "On Saturday I *"],
      },
    },
    {
      id: "q3",
      afterScene: "s10",
      questionEn: "What are you doing right now?",
      questionEs: "¿Qué estás haciendo ahora mismo?",
      options: [
        { label: "I am studying English", emoji: "📘" },
        { label: "I am resting", emoji: "🛋️" },
        { label: "I am working", emoji: "💼" },
      ],
      answer: 0,
      sayIt: "I am studying English right now.",
      sayItEs: "Ejemplo: «I am studying English right now.»",
      sayItAskEn: "What are you doing right now?",
      sayItAskEs: "¿Qué estás haciendo ahora mismo?",
      sayItCheck: {
        target: "I am *",
        altTargets: ["I'm *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s6",
    phrase: "Mistakes are part of the process.",
    es: "Los errores son parte del proceso.",
  },
  continuePrompt: {
    en: "Look around you and describe what people are doing right now.",
    es: "Mira a tu alrededor y describe lo que la gente está haciendo ahora.",
  },
  continueWith: ["He is…", "She is…", "They are…", "I am…"],
  cliffhanger: {
    en: "Episode 17: The beach. Who is swimming and who is scared of the water?",
    es: "Episodio 17: La playa. ¿Quién está nadando y quién le tiene miedo al agua?",
  },
};
