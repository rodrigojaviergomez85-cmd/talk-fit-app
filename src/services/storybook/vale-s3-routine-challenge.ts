import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s3-ep10/cover.jpg";
import s1 from "@/assets/storybook/vale-s3-ep10/s1.jpg";
import s2 from "@/assets/storybook/vale-s3-ep10/s2.jpg";
import s3 from "@/assets/storybook/vale-s3-ep10/s3.jpg";
import s4 from "@/assets/storybook/vale-s3-ep10/s4.jpg";
import s5 from "@/assets/storybook/vale-s3-ep10/s5.jpg";
import s6 from "@/assets/storybook/vale-s3-ep10/s6.jpg";
import s7 from "@/assets/storybook/vale-s3-ep10/s7.jpg";
import s8 from "@/assets/storybook/vale-s3-ep10/s8.jpg";
import s9 from "@/assets/storybook/vale-s3-ep10/s9.jpg";
import s10 from "@/assets/storybook/vale-s3-ep10/s10.jpg";

/**
 * Season 3 · Episode 10 — "The routine challenge".
 * Basic 2 / Simple Present Week 2 Day 10: week review + weekly future plans scene.
 */
export const VALE_S3_ROUTINE_CHALLENGE: StorybookEpisode = {
  id: "vale-s3-routine-challenge",
  moduleId: "simple-present",
  week: 2,
  title: "The routine challenge",
  titleEs: "El reto de rutinas",
  episodeLabel: { en: "Season 3 · Episode 10", es: "Temporada 3 · Episodio 10" },
  previously: [
    { en: "Ana practices for a big casting.", es: "Ana practica para un gran casting." },
    { en: "Mr. Reyes announced a routine challenge.", es: "Mr. Reyes anunció un reto de rutinas." },
  ],
  reviewWords: [
    { word: "routine", es: "rutina" },
    { word: "practices", es: "practica" },
    { word: "helps", es: "ayuda" },
    { word: "never", es: "nunca" },
  ],
  blurb: {
    en: "Who knows the team best? Today Vale describes everybody's routine.",
    es: "¿Quién conoce mejor al equipo? Hoy Vale describe la rutina de todos.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "El equipo se reúne en la sala con globos.",
      text: "The team meets in the big room. Today there is a friendly game.",
      es: "El equipo se reúne en la sala grande. Hoy hay un juego amistoso.",
      speaker: "narrator",
      words: [
        { word: "meets", es: "se reúne" },
        { word: "room", es: "sala" },
        { word: "friendly", es: "amistoso" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Mr. Reyes explica las reglas del juego.",
      text: "Mr. Reyes says: \"Describe a person. We guess who it is.\"",
      es: "Mr. Reyes dice: «Describe a una persona. Nosotros adivinamos quién es.»",
      speaker: "boss",
      words: [
        { word: "Describe", es: "describe" },
        { word: "guess", es: "adivinar" },
        { word: "person", es: "persona" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale describe a Kat con confianza.",
      text: "Vale says: \"She arrives at seven. She checks the queue.\"",
      es: "Vale dice: «Ella llega a las siete. Revisa la cola.»",
      speaker: "vale",
      words: [
        { word: "arrives", es: "llega" },
        { word: "checks", es: "revisa" },
        { word: "queue", es: "cola" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Kat levanta la mano riendo.",
      text: "Everybody shouts: \"Kat!\" Kat laughs a lot.",
      es: "Todos gritan: «¡Kat!» Kat se ríe mucho.",
      words: [
        { word: "shouts", es: "gritan" },
        { word: "laughs", es: "se ríe" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Mateo describe a alguien deportista.",
      text: "Mateo says: \"He trains at six. He does not drink soda.\"",
      es: "Mateo dice: «Él entrena a las seis. No toma soda.»",
      speaker: "mateo",
      words: [
        { word: "trains", es: "entrena" },
        { word: "does not", es: "no" },
        { word: "soda", es: "soda / refresco" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Ana describe a Vale con cariño.",
      text: "Ana says: \"She studies English every night. She never gives up.\"",
      es: "Ana dice: «Ella estudia inglés todas las noches. Nunca se rinde.»",
      speaker: "ana",
      words: [
        { word: "studies", es: "estudia" },
        { word: "never", es: "nunca" },
        { word: "gives up", es: "se rinde" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale se emociona al escuchar su descripción.",
      text: "Vale feels proud. Her routine is now a good example.",
      es: "Vale se siente orgullosa. Su rutina ahora es un buen ejemplo.",
      words: [
        { word: "proud", es: "orgullosa" },
        { word: "example", es: "ejemplo" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "El equipo habla de sus planes del fin de semana.",
      text: "Mr. Reyes asks: \"What are you going to do this weekend?\"",
      es: "Mr. Reyes pregunta: «¿Qué van a hacer este fin de semana?»",
      speaker: "boss",
      words: [
        { word: "going to", es: "van a" },
        { word: "weekend", es: "fin de semana" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Cada compañero dice su plan.",
      text: "Kat says: \"I am going to rest.\" Mateo says: \"I will play soccer.\"",
      es: "Kat dice: «Voy a descansar.» Mateo dice: «Voy a jugar fútbol.»",
      words: [
        { word: "rest", es: "descansar" },
        { word: "play", es: "jugar" },
        { word: "soccer", es: "fútbol" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Ana invita a Vale al casting con un volante.",
      text: "Then Ana looks at Vale: \"Come with me to the casting. I need you.\"",
      es: "Luego Ana mira a Vale: «Ven conmigo al casting. Te necesito.»",
      speaker: "ana",
      words: [
        { word: "Come with me", es: "ven conmigo" },
        { word: "need", es: "necesitar" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "Who arrives at seven and checks the queue?",
      questionEs: "¿Quién llega a las siete y revisa la cola?",
      options: [
        { label: "Kat", emoji: "🧡" },
        { label: "Mateo", emoji: "⚽" },
        { label: "Mr. Reyes", emoji: "👔" },
      ],
      answer: 0,
      sayIt: "Kat arrives at seven.",
      sayItEs: "Repite: «Kat arrives at seven.»",
      sayItCheck: { target: "Kat arrives at seven" },
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "What do you do every night?",
      questionEs: "¿Qué haces todas las noches?",
      options: [
        { label: "I study English", emoji: "📘" },
        { label: "I watch videos", emoji: "📱" },
        { label: "I rest", emoji: "🛏️" },
      ],
      answer: 0,
      sayIt: "I study English every night.",
      sayItEs: "Ejemplo: «I study English every night.»",
      sayItAskEn: "What do you do every night?",
      sayItAskEs: "¿Qué haces todas las noches?",
      sayItCheck: {
        target: "I * every night",
        altTargets: ["I study English *", "Every night I *"],
      },
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "What are you going to do this weekend?",
      questionEs: "¿Qué vas a hacer este fin de semana?",
      options: [
        { label: "I am going to rest", emoji: "😌" },
        { label: "I am going to study", emoji: "📚" },
        { label: "I am going to work", emoji: "💼" },
      ],
      answer: 0,
      sayIt: "I am going to rest this weekend.",
      sayItEs: "Ejemplo: «I am going to rest this weekend.»",
      sayItAskEn: "What are you going to do this weekend?",
      sayItAskEs: "¿Qué vas a hacer este fin de semana?",
      sayItCheck: {
        target: "I am going to *",
        altTargets: ["I'm going to *", "I will *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s6",
    phrase: "I am a champion.",
    es: "Soy un campeón.",
  },
  continuePrompt: {
    en: "Describe a person from your work or school. What does he or she do every day?",
    es: "Describe a alguien de tu trabajo o escuela. ¿Qué hace todos los días?",
  },
  continueWith: [
    "He/She arrives at…",
    "He/She works…",
    "He/She does not…",
    "This weekend I am going to…",
  ],
  cliffhanger: {
    en: "Episode 11: Mr. Reyes teaches Vale a new app, step by step.",
    es: "Episodio 11: Mr. Reyes le enseña a Vale una app nueva, paso a paso.",
  },
};
