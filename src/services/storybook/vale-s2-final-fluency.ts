import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-ep20/cover.jpg";
import s1 from "@/assets/storybook/vale-ep20/s1.jpg";
import s2 from "@/assets/storybook/vale-ep20/s2.jpg";
import s3 from "@/assets/storybook/vale-ep20/s3.jpg";
import s4 from "@/assets/storybook/vale-ep20/s4.jpg";
import s5 from "@/assets/storybook/vale-ep20/s5.jpg";
import s6 from "@/assets/storybook/vale-ep20/s6.jpg";
import s7 from "@/assets/storybook/vale-ep20/s7.jpg";
import s8 from "@/assets/storybook/vale-ep20/s8.jpg";
import s9 from "@/assets/storybook/vale-ep20/s9.jpg";
import s10 from "@/assets/storybook/vale-ep20/s10.jpg";

/**
 * Season 2 · Episode 20 — "Final future fluency".
 * Basic 1 / Simple Future Week 4 Day 5: free production with going to + will.
 */
export const VALE_S2_FINAL_FLUENCY: StorybookEpisode = {
  id: "vale-s2-final-fluency",
  moduleId: "simple-future",
  week: 4,
  title: "Final future fluency",
  titleEs: "Fluidez futura final",
  episodeLabel: { en: "Season 2 · Episode 20", es: "Temporada 2 · Episodio 20" },
  previously: [
    { en: "The event started with rain and a long line.", es: "El evento empezó con lluvia y una fila larga." },
    { en: "Beto did his first interview.", es: "Beto hizo su primera entrevista." },
    { en: "The director called Vale to the front.", es: "El director llamó a Vale al frente." },
  ],
  reviewWords: [
    { word: "line", es: "fila" },
    { word: "recruiter", es: "reclutador" },
    { word: "project", es: "proyecto" },
    { word: "front", es: "frente" },
  ],
  blurb: {
    en: "Vale speaks in front of everybody and receives an offer she never expected.",
    es: "Vale habla frente a todos y recibe una oferta que nunca esperó.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale frente al micrófono.",
      text: "Vale takes the microphone. The room is silent.",
      es: "Vale toma el micrófono. La sala está en silencio.",
      words: [
        { word: "microphone", es: "micrófono" },
        { word: "silent", es: "en silencio" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale sonríe al público.",
      text: "Vale remembers her first day: \"I am nervous.\" Today she says: \"I am a leader.\"",
      es: "Vale recuerda su primer día: «Estoy nerviosa.» Hoy dice: «Soy una líder.»",
      speaker: "vale",
      words: [
        { word: "student", es: "estudiante" },
        { word: "leader", es: "líder" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale señala a los jóvenes.",
      text: "\"You are going to get a bilingual job. Some of you this month.\"",
      es: "«Ustedes van a conseguir un trabajo bilingüe. Algunos este mes.»",
      speaker: "vale",
      words: [
        { word: "get", es: "conseguir" },
        { word: "month", es: "mes" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale habla con energía.",
      text: "\"It won't be easy. But you will practice every day.\"",
      es: "«No será fácil. Pero practicarán todos los días.»",
      speaker: "vale",
      words: [
        { word: "easy", es: "fácil" },
        { word: "practice", es: "practicar" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "El público repite en voz alta.",
      text: "The room repeats together: \"English is easy. I can do it.\"",
      es: "La sala repite junta: «El inglés es fácil. Puedo hacerlo.»",
      words: [
        { word: "repeats", es: "repite" },
        { word: "together", es: "juntos" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Beto sale sonriendo de la entrevista.",
      text: "Beto runs to Vale. \"I'll start on Monday! I have the job!\"",
      es: "Beto corre hacia Vale. «¡Empiezo el lunes! ¡Tengo el trabajo!»",
      words: [
        { word: "Monday", es: "lunes" },
        { word: "job", es: "trabajo" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "El equipo abraza a Beto.",
      text: "The team hugs him. Twelve people get an interview today.",
      es: "El equipo lo abraza. Doce personas consiguen una entrevista hoy.",
      words: [
        { word: "hugs", es: "abraza" },
        { word: "twelve", es: "doce" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Ana habla con Vale en privado.",
      text: "Ana takes Vale aside: \"The company is going to open a new program.\"",
      es: "Ana lleva a Vale aparte: «La empresa va a abrir un nuevo programa.»",
      speaker: "ana",
      words: [
        { word: "aside", es: "aparte" },
        { word: "program", es: "programa" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale escucha sorprendida.",
      text: "\"And you will be the coordinator. Will you accept?\"",
      es: "«Y tú serás la coordinadora. ¿Aceptarás?»",
      speaker: "ana",
      words: [
        { word: "coordinator", es: "coordinadora" },
        { word: "accept", es: "aceptar" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale mira el cielo con una sonrisa grande.",
      text: "Vale looks up and breathes. \"Yes. I'll accept. And I'm going to keep learning.\"",
      es: "Vale mira arriba y respira. «Sí. Aceptaré. Y voy a seguir aprendiendo.»",
      speaker: "vale",
      words: [
        { word: "accept", es: "aceptar" },
        { word: "keep", es: "seguir" },
        { word: "learning", es: "aprendiendo" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What does Vale say about the future?",
      questionEs: "¿Qué dice Vale sobre el futuro?",
      options: [
        { label: "It won't be easy, but they will practice", emoji: "💪" },
        { label: "It will be easy for everybody", emoji: "😌" },
        { label: "Nobody will find a job", emoji: "😞" },
      ],
      answer: 0,
      sayIt: "It won't be easy. But I will practice every day.",
      sayItEs: "Repite: «No será fácil. Pero practicaré todos los días.»",
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "When will Beto start his job?",
      questionEs: "¿Cuándo empezará Beto su trabajo?",
      options: [
        { label: "On Monday", emoji: "📅" },
        { label: "Next year", emoji: "🗓️" },
        { label: "Never", emoji: "🚫" },
      ],
      answer: 0,
      sayIt: "He will start on Monday.",
      sayItEs: "Repite: «Él empezará el lunes.»",
    },
    {
      id: "q3",
      afterScene: "s10",
      questionEn: "What is Vale going to be?",
      questionEs: "¿Qué va a ser Vale?",
      options: [
        { label: "The coordinator of a new program", emoji: "🌟" },
        { label: "A student again", emoji: "🎒" },
        { label: "A recruiter in another country", emoji: "✈️" },
      ],
      answer: 0,
      sayIt: "I'll be the coordinator of the new program.",
      sayItEs: "Repite: «Seré la coordinadora del nuevo programa.»",
    },
  ],
  mindsetCard: {
    afterScene: "s5",
    phrase: "I am awesome.",
    es: "Soy genial.",
  },
  continuePrompt: {
    en: "This is your moment. What are you going to do with your English this year?",
    es: "Este es tu momento. ¿Qué vas a hacer con tu inglés este año?",
  },
  continueWith: [
    "This year I'm going to…",
    "I won't…",
    "I'll practice…",
    "In five years I'll…",
  ],
  cliffhanger: {
    en: "Season 3: Vale's new program starts… and her first student is a surprise.",
    es: "Temporada 3: El nuevo programa de Vale empieza… y su primer estudiante es una sorpresa.",
  },
};
