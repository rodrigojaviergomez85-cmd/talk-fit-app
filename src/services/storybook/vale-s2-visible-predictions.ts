import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-ep19/cover.jpg";
import s1 from "@/assets/storybook/vale-ep19/s1.jpg";
import s2 from "@/assets/storybook/vale-ep19/s2.jpg";
import s3 from "@/assets/storybook/vale-ep19/s3.jpg";
import s4 from "@/assets/storybook/vale-ep19/s4.jpg";
import s5 from "@/assets/storybook/vale-ep19/s5.jpg";
import s6 from "@/assets/storybook/vale-ep19/s6.jpg";
import s7 from "@/assets/storybook/vale-ep19/s7.jpg";
import s8 from "@/assets/storybook/vale-ep19/s8.jpg";
import s9 from "@/assets/storybook/vale-ep19/s9.jpg";
import s10 from "@/assets/storybook/vale-ep19/s10.jpg";

/**
 * Season 2 · Episode 19 — "Visible predictions".
 * Basic 1 / Simple Future Week 4 Day 4: going to for evidence-based predictions.
 */
export const VALE_S2_VISIBLE_PREDICTIONS: StorybookEpisode = {
  id: "vale-s2-visible-predictions",
  moduleId: "simple-future",
  week: 4,
  title: "Visible predictions",
  titleEs: "Predicciones visibles",
  episodeLabel: { en: "Season 2 · Episode 19", es: "Temporada 2 · Episodio 19" },
  previously: [
    { en: "Camila is going to take a bilingual job.", es: "Camila va a tomar un trabajo bilingüe." },
    { en: "The event is on Sunday.", es: "El evento es el domingo." },
    { en: "The sky was black on Saturday night.", es: "El cielo estaba negro el sábado en la noche." },
  ],
  reviewWords: [
    { word: "offer", es: "ofrecer / oferta" },
    { word: "grow", es: "crecer" },
    { word: "city", es: "ciudad" },
    { word: "country", es: "país" },
  ],
  blurb: {
    en: "Look at the sky, look at the line of people. You can see the future.",
    es: "Mira el cielo, mira la fila de gente. Puedes ver el futuro.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Nubes negras sobre la escuela el domingo.",
      text: "Sunday morning. Vale looks at the clouds.",
      es: "Domingo por la mañana. Vale mira las nubes.",
      words: [{ word: "clouds", es: "nubes" }],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale señala el cielo.",
      text: "\"Look at the sky. It's going to rain,\" she says.",
      es: "«Mira el cielo. Va a llover», dice ella.",
      speaker: "vale",
      words: [
        { word: "sky", es: "cielo" },
        { word: "rain", es: "llover" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "El equipo abre las carpas.",
      text: "The team opens the big umbrellas. Nobody panics.",
      es: "El equipo abre las sombrillas grandes. Nadie entra en pánico.",
      words: [
        { word: "umbrellas", es: "sombrillas" },
        { word: "panics", es: "entra en pánico" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Una fila larga de jóvenes en la entrada.",
      text: "Outside, there is a long line of young people.",
      es: "Afuera hay una fila larga de jóvenes.",
      words: [
        { word: "line", es: "fila" },
        { word: "young", es: "jóvenes" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Mateo cuenta a la gente.",
      text: "Mateo counts. \"Look at the line! More than fifty are going to come.\"",
      es: "Mateo cuenta. «¡Mira la fila! Van a venir más de cincuenta.»",
      speaker: "mateo",
      words: [
        { word: "counts", es: "cuenta" },
        { word: "more", es: "más" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Beto llega con camisa limpia.",
      text: "Beto arrives with a clean shirt. \"I'm going to do my first interview.\"",
      es: "Beto llega con camisa limpia. «Voy a hacer mi primera entrevista.»",
      words: [
        { word: "clean", es: "limpia" },
        { word: "shirt", es: "camisa" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Beto tiembla un poco.",
      text: "His hands shake. Vale says: \"Say it loud: English is easy for me.\"",
      es: "Sus manos tiemblan. Vale dice: «Dilo fuerte: el inglés es fácil para mí.»",
      speaker: "vale",
      words: [
        { word: "shake", es: "tiemblan" },
        { word: "loud", es: "fuerte" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Beto entra a la entrevista.",
      text: "Beto walks in. The recruiter smiles at him.",
      es: "Beto entra. El reclutador le sonríe.",
      words: [
        { word: "walks", es: "camina" },
        { word: "recruiter", es: "reclutador" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Ana y Vale miran la sala llena.",
      text: "Ana says: \"Look at this room. This project is going to be big.\"",
      es: "Ana dice: «Mira esta sala. Este proyecto va a ser grande.»",
      speaker: "ana",
      words: [
        { word: "room", es: "sala" },
        { word: "project", es: "proyecto" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "El director llama a Vale al frente.",
      text: "Then the director calls Vale to the front. \"Say a few words, please.\"",
      es: "Entonces el director llama a Vale al frente. «Di unas palabras, por favor.»",
      speaker: "boss",
      words: [
        { word: "front", es: "frente" },
        { word: "words", es: "palabras" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s2",
      questionEn: "Why does Vale say it's going to rain?",
      questionEs: "¿Por qué dice Vale que va a llover?",
      options: [
        { label: "She can see black clouds", emoji: "☁️" },
        { label: "Somebody told her", emoji: "🗣️" },
        { label: "It's a promise", emoji: "🤞" },
      ],
      answer: 0,
      sayIt: "Look at the sky. It's going to rain.",
      sayItEs: "Repite: «Mira el cielo. Va a llover.»",
    },
    {
      id: "q2",
      afterScene: "s5",
      questionEn: "How many people are going to come?",
      questionEs: "¿Cuántas personas van a venir?",
      options: [
        { label: "More than fifty", emoji: "👥" },
        { label: "Only five", emoji: "5️⃣" },
        { label: "Nobody", emoji: "0️⃣" },
      ],
      answer: 0,
      sayIt: "More than fifty people are going to come.",
      sayItEs: "Repite: «Más de cincuenta personas van a venir.»",
    },
    {
      id: "q3",
      afterScene: "s8",
      questionEn: "What is Beto going to do?",
      questionEs: "¿Qué va a hacer Beto?",
      options: [
        { label: "His first interview", emoji: "🧑‍💼" },
        { label: "Sell food", emoji: "🥟" },
        { label: "Play music", emoji: "🎵" },
      ],
      answer: 0,
      sayIt: "I'm going to do my first interview.",
      sayItEs: "Repite: «Voy a hacer mi primera entrevista.»",
    },
  ],
  mindsetCard: {
    afterScene: "s7",
    phrase: "I can do it.",
    es: "Yo puedo hacerlo.",
  },
  continuePrompt: {
    en: "Look around you right now. Make two predictions with \"going to\".",
    es: "Mira a tu alrededor ahora. Haz dos predicciones con «going to».",
  },
  continueWith: [
    "Look! It's going to…",
    "They are going to…",
    "I'm going to…",
    "I think it will…",
  ],
  cliffhanger: {
    en: "Episode 20: Final future fluency — Vale speaks and a new door opens.",
    es: "Episodio 20: Fluidez futura final — Vale habla y se abre una nueva puerta.",
  },
};
