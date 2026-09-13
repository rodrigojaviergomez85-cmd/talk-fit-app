import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s3-ep8/cover.jpg";
import s1 from "@/assets/storybook/vale-s3-ep8/s1.jpg";
import s2 from "@/assets/storybook/vale-s3-ep8/s2.jpg";
import s3 from "@/assets/storybook/vale-s3-ep8/s3.jpg";
import s4 from "@/assets/storybook/vale-s3-ep8/s4.jpg";
import s5 from "@/assets/storybook/vale-s3-ep8/s5.jpg";
import s6 from "@/assets/storybook/vale-s3-ep8/s6.jpg";
import s7 from "@/assets/storybook/vale-s3-ep8/s7.jpg";
import s8 from "@/assets/storybook/vale-s3-ep8/s8.jpg";
import s9 from "@/assets/storybook/vale-s3-ep8/s9.jpg";
import s10 from "@/assets/storybook/vale-s3-ep8/s10.jpg";

/**
 * Season 3 · Episode 8 — "The neighborhood hero".
 * Basic 2 / Simple Present Week 2 Day 8: a service routine, WH questions.
 */
export const VALE_S3_NEIGHBORHOOD_HERO: StorybookEpisode = {
  id: "vale-s3-neighborhood-hero",
  moduleId: "simple-present",
  week: 2,
  title: "The neighborhood hero",
  titleEs: "El héroe del barrio",
  episodeLabel: { en: "Season 3 · Episode 8", es: "Temporada 3 · Episodio 8" },
  previously: [
    { en: "Vale trained with Mateo at six.", es: "Vale entrenó con Mateo a las seis." },
    { en: "A guard said good morning to them.", es: "Un guardia les dio los buenos días." },
  ],
  reviewWords: [
    { word: "trains", es: "entrena" },
    { word: "guard", es: "guardia" },
    { word: "neighborhood", es: "barrio" },
    { word: "together", es: "juntos" },
  ],
  blurb: {
    en: "Don Tito protects the street every night. Vale learns his story.",
    es: "Don Tito cuida la calle todas las noches. Vale conoce su historia.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Don Tito, guardia mayor, saluda en la esquina.",
      text: "Don Tito works as a guard in Vale's neighborhood.",
      es: "Don Tito trabaja como guardia en el barrio de Vale.",
      speaker: "narrator",
      words: [
        { word: "works", es: "trabaja" },
        { word: "as", es: "como" },
        { word: "guard", es: "guardia" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Don Tito llega a su puesto de noche.",
      text: "He starts at ten at night and finishes at six in the morning.",
      es: "Empieza a las diez de la noche y termina a las seis de la mañana.",
      words: [
        { word: "starts", es: "empieza" },
        { word: "finishes", es: "termina" },
        { word: "at night", es: "de noche" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Don Tito camina con su linterna.",
      text: "Every hour he walks around the block with his flashlight.",
      es: "Cada hora camina alrededor de la cuadra con su linterna.",
      words: [
        { word: "Every hour", es: "cada hora" },
        { word: "around", es: "alrededor" },
        { word: "flashlight", es: "linterna" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Don Tito ayuda a una señora con bolsas.",
      text: "He helps the neighbors with heavy bags.",
      es: "Ayuda a los vecinos con bolsas pesadas.",
      words: [
        { word: "helps", es: "ayuda" },
        { word: "neighbors", es: "vecinos" },
        { word: "heavy", es: "pesado" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Don Tito estudia inglés con un cuaderno viejo.",
      text: "He does not sleep much, but he studies English in his notebook.",
      es: "No duerme mucho, pero estudia inglés en su cuaderno.",
      words: [
        { word: "sleep", es: "dormir" },
        { word: "studies", es: "estudia" },
        { word: "notebook", es: "cuaderno" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale se sorprende y sonríe.",
      text: "Vale asks: \"Where do you study English?\"",
      es: "Vale pregunta: «¿Dónde estudias inglés?»",
      speaker: "vale",
      words: [
        { word: "Where", es: "dónde" },
        { word: "study", es: "estudias" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Don Tito muestra su teléfono con una app.",
      text: "He answers: \"I study on my phone. English is easy with practice.\"",
      es: "Él responde: «Estudio en mi teléfono. El inglés es fácil con práctica.»",
      speaker: "male",
      words: [
        { word: "phone", es: "teléfono" },
        { word: "easy", es: "fácil" },
        { word: "practice", es: "práctica" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Don Tito habla de su sueño.",
      text: "\"One day I will speak with tourists,\" he says.",
      es: "«Un día voy a hablar con turistas», dice.",
      speaker: "male",
      words: [
        { word: "One day", es: "un día" },
        { word: "will", es: "voy a / futuro" },
        { word: "tourists", es: "turistas" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale camina pensando con respeto.",
      text: "Vale thinks: \"He never gives up. I can do it too.\"",
      es: "Vale piensa: «Él nunca se rinde. Yo también puedo.»",
      speaker: "vale",
      words: [
        { word: "thinks", es: "piensa" },
        { word: "never", es: "nunca" },
        { word: "gives up", es: "se rinde" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Ana canta con audífonos en la oficina.",
      text: "At the office, Ana sings quietly. She practices for something big.",
      es: "En la oficina, Ana canta bajito. Practica para algo grande.",
      words: [
        { word: "sings", es: "canta" },
        { word: "quietly", es: "bajito" },
        { word: "big", es: "grande" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s2",
      questionEn: "When does Don Tito start work?",
      questionEs: "¿Cuándo empieza a trabajar Don Tito?",
      options: [
        { label: "At ten at night", emoji: "🌙" },
        { label: "At ten in the morning", emoji: "🌞" },
        { label: "At three in the afternoon", emoji: "🕒" },
      ],
      answer: 0,
      sayIt: "He starts at ten at night.",
      sayItEs: "Repite: «He starts at ten at night.»",
      sayItCheck: { target: "He starts at ten at night" },
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "Where does Don Tito study English?",
      questionEs: "¿Dónde estudia inglés Don Tito?",
      options: [
        { label: "On his phone", emoji: "📱" },
        { label: "At a university", emoji: "🎓" },
        { label: "In another country", emoji: "🌎" },
      ],
      answer: 0,
      sayIt: "I study English on my phone.",
      sayItEs: "Ejemplo: «I study English on my phone.»",
      sayItAskEn: "Where do you study English?",
      sayItAskEs: "¿Dónde estudias inglés tú?",
      sayItCheck: {
        target: "I study *",
        altTargets: ["I study English *", "At *", "On my *"],
      },
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "Who helps people in your neighborhood?",
      questionEs: "¿Quién ayuda a la gente en tu barrio?",
      options: [
        { label: "A neighbor", emoji: "🏠" },
        { label: "A guard", emoji: "🛡️" },
        { label: "My family", emoji: "👨‍👩‍👧" },
      ],
      answer: 0,
      sayIt: "My neighbor helps people.",
      sayItEs: "Ejemplo: «My neighbor helps people.»",
      sayItAskEn: "Who helps people in your neighborhood?",
      sayItAskEs: "¿Quién ayuda a la gente en tu barrio?",
      sayItCheck: {
        target: "* helps *",
        altTargets: ["My * helps people", "I help *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s5",
    phrase: "English is easy.",
    es: "El inglés es fácil.",
  },
  continuePrompt: {
    en: "Describe a hard worker you know. What does he or she do every day?",
    es: "Describe a alguien trabajador que conoces. ¿Qué hace todos los días?",
  },
  continueWith: [
    "He/She works as…",
    "He/She starts at…",
    "He/She helps…",
    "He/She never…",
  ],
  cliffhanger: {
    en: "Episode 9: Ana practices for a casting. Nobody knows yet.",
    es: "Episodio 9: Ana practica para un casting. Nadie lo sabe todavía.",
  },
};
