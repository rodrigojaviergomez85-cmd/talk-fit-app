import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-ep2/cover.jpg";
import s1 from "@/assets/storybook/vale-ep2/s1.jpg";
import s2 from "@/assets/storybook/vale-ep2/s2.jpg";
import s3 from "@/assets/storybook/vale-ep2/s3.jpg";
import s4 from "@/assets/storybook/vale-ep2/s4.jpg";
import s5 from "@/assets/storybook/vale-ep2/s5.jpg";
import s6 from "@/assets/storybook/vale-ep2/s6.jpg";
import s7 from "@/assets/storybook/vale-ep2/s7.jpg";
import s8 from "@/assets/storybook/vale-ep2/s8.jpg";
import s9 from "@/assets/storybook/vale-ep2/s9.jpg";
import s10 from "@/assets/storybook/vale-ep2/s10.jpg";

/**
 * Season 2 · Episode 2 — "Tomorrow starts now".
 * Matches Basic 1 / Simple Future Week 1 Day 2: my day tomorrow with I'm going to.
 */
export const VALE_S2_TOMORROW: StorybookEpisode = {
  id: "vale-s2-tomorrow",
  moduleId: "simple-future",
  week: 1,
  title: "Tomorrow starts now",
  titleEs: "Mañana empieza ahora",
  episodeLabel: { en: "Season 2 · Episode 2", es: "Temporada 2 · Episodio 2" },
  previously: [
    { en: "Ana invited Vale to a new project.", es: "Ana invitó a Vale a un nuevo proyecto." },
    { en: "Vale is going to help young people find bilingual jobs.", es: "Vale va a ayudar a jóvenes a conseguir empleos bilingües." },
    { en: "Tonight, Vale is going to write three ideas.", es: "Esta noche Vale va a escribir tres ideas." },
  ],
  reviewWords: [
    { word: "project", es: "proyecto" },
    { word: "idea", es: "idea" },
    { word: "plan", es: "plan" },
    { word: "tomorrow", es: "mañana" },
  ],
  blurb: {
    en: "Vale has a plan for tomorrow, but her notebook is missing.",
    es: "Vale tiene un plan para mañana, pero su cuaderno no está.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale revisa su mochila en la parada del bus.",
      text: "Vale opens her backpack at the bus stop. Her notebook is not there.",
      es: "Vale abre su mochila en la parada del bus. Su cuaderno no está ahí.",
      words: [
        { word: "opens", es: "abre" },
        { word: "backpack", es: "mochila" },
        { word: "notebook", es: "cuaderno" },
        { word: "there", es: "ahí" },
      ],
    },
    {
      id: "s2",
      image: s2,
      text: "Vale says: \"I’m going to call Mateo.\"",
      es: "Vale dice: «Voy a llamar a Mateo.»",
      speaker: "vale",
      words: [
        { word: "call", es: "llamar" },
      ],
    },
    {
      id: "s3",
      image: s3,
      text: "Mateo answers: \"I’m going to bring your notebook to the office.\"",
      es: "Mateo contesta: «Voy a llevar tu cuaderno a la oficina.»",
      speaker: "mateo",
      words: [
        { word: "answers", es: "contesta" },
        { word: "bring", es: "traer / llevar" },
        { word: "office", es: "oficina" },
      ],
    },
    {
      id: "s4",
      image: s4,
      text: "On the bus, Vale thinks about tomorrow. \"I’m going to wake up early.\"",
      es: "En el bus, Vale piensa en mañana. «Voy a despertarme temprano.»",
      speaker: "vale",
      words: [
        { word: "bus", es: "bus" },
        { word: "wake", es: "despertar" },
        { word: "early", es: "temprano" },
      ],
    },
    {
      id: "s5",
      image: s5,
      text: "\"I’m going to exercise before work,\" she says.",
      es: "«Voy a hacer ejercicio antes del trabajo», dice ella.",
      speaker: "vale",
      words: [
        { word: "exercise", es: "ejercicio / hacer ejercicio" },
        { word: "before", es: "antes" },
      ],
    },
    {
      id: "s6",
      image: s6,
      text: "\"After lunch, I’m going to study English.\"",
      es: "«Después del almuerzo, voy a estudiar inglés.»",
      speaker: "vale",
      words: [
        { word: "after", es: "después" },
        { word: "lunch", es: "almuerzo" },
        { word: "study", es: "estudiar" },
      ],
    },
    {
      id: "s7",
      image: s7,
      text: "\"I’m not going to stay at the office late.\"",
      es: "«No me voy a quedar tarde en la oficina.»",
      speaker: "vale",
      words: [
        { word: "stay", es: "quedarse" },
        { word: "office", es: "oficina" },
        { word: "late", es: "tarde" },
      ],
    },
    {
      id: "s8",
      image: s8,
      text: "\"At night, I’m going to relax at home.\"",
      es: "«En la noche voy a descansar en casa.»",
      speaker: "vale",
      words: [
        { word: "night", es: "noche" },
        { word: "relax", es: "descansar / relajarse" },
      ],
    },
    {
      id: "s9",
      image: s9,
      text: "At the team meeting, Vale says: \"We’re going to plan the first event.\"",
      es: "En la reunión del equipo, Vale dice: «Vamos a planear el primer evento.»",
      speaker: "vale",
      words: [
        { word: "meeting", es: "reunión" },
        { word: "plan", es: "planear" },
        { word: "event", es: "evento" },
      ],
    },
    {
      id: "s10",
      image: s10,
      text: "Ana looks serious. \"But the client wants the event this weekend!\"",
      es: "Ana se ve seria. «¡Pero el cliente quiere el evento este fin de semana!»",
      speaker: "ana",
      words: [
        { word: "serious", es: "seria / serio" },
        { word: "client", es: "cliente" },
        { word: "wants", es: "quiere" },
        { word: "weekend", es: "fin de semana" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "When is Vale going to wake up?",
      questionEs: "¿Cuándo se va a despertar Vale?",
      options: [
        { label: "Early tomorrow", emoji: "🌅" },
        { label: "At noon", emoji: "🕛" },
        { label: "Never", emoji: "🚫" },
      ],
      answer: 0,
      sayIt: "Tomorrow, I’m going to wake up early.",
      sayItEs: "Repite: «Mañana me voy a despertar temprano.»",
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "What is Vale going to study after lunch?",
      questionEs: "¿Qué va a estudiar Vale después del almuerzo?",
      options: [
        { label: "English", emoji: "🇬🇧" },
        { label: "Math", emoji: "🔢" },
        { label: "Cooking", emoji: "🍳" },
      ],
      answer: 0,
      sayIt: "After lunch, I’m going to study English.",
      sayItEs: "Repite: «Después del almuerzo voy a estudiar inglés.»",
    },
    {
      id: "q3",
      afterScene: "s10",
      questionEn: "When does the client want the event?",
      questionEs: "¿Cuándo quiere el cliente el evento?",
      options: [
        { label: "This weekend", emoji: "📅" },
        { label: "Next year", emoji: "🎆" },
        { label: "Never", emoji: "🙅" },
      ],
      answer: 0,
      sayIt: "The client wants the event this weekend.",
      sayItEs: "Repite: «El cliente quiere el evento este fin de semana.»",
    },
  ],
  mindsetCard: {
    afterScene: "s1",
    phrase: "I am persistent.",
    es: "Soy persistente.",
  },
  continuePrompt: {
    en: "Tell us what you are going to do tomorrow.",
    es: "Cuéntanos qué vas a hacer mañana.",
  },
  continueWith: [
    "Tomorrow, I’m going to wake up…",
    "I’m going to exercise…",
    "After lunch, I’m going to…",
    "I’m not going to…",
  ],
  cliffhanger: {
    en: "Episode 3: Vale, Mateo and Kat plan the weekend at a cafe.",
    es: "Episodio 3: Vale, Mateo y Kat planean el fin de semana en un café.",
  },
};
