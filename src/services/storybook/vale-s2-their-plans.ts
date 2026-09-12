import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-ep10/cover.jpg";
import s1 from "@/assets/storybook/vale-ep10/s1.jpg";
import s2 from "@/assets/storybook/vale-ep10/s2.jpg";
import s3 from "@/assets/storybook/vale-ep10/s3.jpg";
import s4 from "@/assets/storybook/vale-ep10/s4.jpg";
import s5 from "@/assets/storybook/vale-ep10/s5.jpg";
import s6 from "@/assets/storybook/vale-ep10/s6.jpg";
import s7 from "@/assets/storybook/vale-ep10/s7.jpg";
import s8 from "@/assets/storybook/vale-ep10/s8.jpg";
import s9 from "@/assets/storybook/vale-ep10/s9.jpg";
import s10 from "@/assets/storybook/vale-ep10/s10.jpg";

/**
 * Season 2 · Episode 10 — "Their plans challenge".
 * Basic 1 / Simple Future Week 2 Day 5: integration of he/she/they going to.
 */
export const VALE_S2_THEIR_PLANS: StorybookEpisode = {
  id: "vale-s2-their-plans",
  moduleId: "simple-future",
  week: 2,
  title: "Their plans challenge",
  titleEs: "El reto de sus planes",
  episodeLabel: { en: "Season 2 · Episode 10", es: "Temporada 2 · Episodio 10" },
  previously: [
    { en: "Kat is going to play music.", es: "Kat va a poner música." },
    { en: "Dylan is going to run the games.", es: "Dylan va a dirigir los juegos." },
    { en: "Ana asked Vale to explain every plan.", es: "Ana le pidió a Vale explicar cada plan." },
  ],
  reviewWords: [
    { word: "explain", es: "explicar" },
    { word: "both", es: "ambos / los dos" },
    { word: "games", es: "juegos" },
    { word: "music", es: "música" },
  ],
  blurb: {
    en: "Vale presents the plan of every person in front of the company.",
    es: "Vale presenta el plan de cada persona frente a la empresa.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale frente a una sala de reuniones.",
      text: "The meeting room is full. Vale stands in front.",
      es: "La sala de reuniones está llena. Vale se para al frente.",
      words: [
        { word: "meeting", es: "reunión" },
        { word: "full", es: "llena" },
        { word: "stands", es: "se para" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale respira profundo.",
      text: "Her hands shake. \"I can do it,\" she says quietly.",
      es: "Sus manos tiemblan. «Puedo hacerlo», dice en voz baja.",
      speaker: "vale",
      words: [
        { word: "hands", es: "manos" },
        { word: "shake", es: "tiemblan" },
        { word: "quietly", es: "en voz baja" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale muestra la primera diapositiva.",
      text: "\"Mateo is going to bring the posters.\"",
      es: "«Mateo va a traer los carteles.»",
      speaker: "vale",
      words: [{ word: "posters", es: "carteles" }],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Foto de la mamá de Mateo en la pantalla.",
      text: "\"His mom is going to sell food at the door.\"",
      es: "«Su mamá va a vender comida en la puerta.»",
      speaker: "vale",
      words: [{ word: "door", es: "puerta" }],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Kat y Dylan en la pantalla.",
      text: "\"Kat and Dylan are going to open the event with music and games.\"",
      es: "«Kat y Dylan van a abrir el evento con música y juegos.»",
      speaker: "vale",
      words: [{ word: "open", es: "abrir" }],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale señala una lista de invitados.",
      text: "\"Fifty young people are going to come.\"",
      es: "«Cincuenta jóvenes van a venir.»",
      speaker: "vale",
      words: [
        { word: "fifty", es: "cincuenta" },
        { word: "come", es: "venir" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Un director hace una pregunta.",
      text: "The director asks: \"Are they going to find a job?\"",
      es: "El director pregunta: «¿Ellos van a encontrar trabajo?»",
      speaker: "boss",
      words: [
        { word: "director", es: "director" },
        { word: "find", es: "encontrar" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale responde con seguridad.",
      text: "\"Some are going to find a job. All of them are going to start.\"",
      es: "«Algunos van a encontrar trabajo. Todos van a empezar.»",
      speaker: "vale",
      words: [
        { word: "some", es: "algunos" },
        { word: "start", es: "empezar" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "La sala aplaude.",
      text: "The room claps. Ana is proud.",
      es: "La sala aplaude. Ana está orgullosa.",
      words: [
        { word: "claps", es: "aplaude" },
        { word: "proud", es: "orgullosa" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "El teléfono de Vale suena con urgencia.",
      text: "Then the phone rings. The event place is not available. Vale must decide now.",
      es: "Entonces suena el teléfono. El lugar del evento no está disponible. Vale debe decidir ahora.",
      words: [
        { word: "rings", es: "suena" },
        { word: "place", es: "lugar" },
        { word: "available", es: "disponible" },
        { word: "decide", es: "decidir" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What is his mom going to sell?",
      questionEs: "¿Qué va a vender su mamá?",
      options: [
        { label: "Food", emoji: "🥟" },
        { label: "Posters", emoji: "📄" },
        { label: "Chairs", emoji: "🪑" },
      ],
      answer: 0,
      sayIt: "She is going to sell food at the door.",
      sayItEs: "Repite: «Ella va a vender comida en la puerta.»",
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "How many young people are going to come?",
      questionEs: "¿Cuántos jóvenes van a venir?",
      options: [
        { label: "Fifty", emoji: "5️⃣0️⃣" },
        { label: "Five", emoji: "5️⃣" },
        { label: "Five hundred", emoji: "💯" },
      ],
      answer: 0,
      sayIt: "Fifty young people are going to come.",
      sayItEs: "Repite: «Cincuenta jóvenes van a venir.»",
    },
    {
      id: "q3",
      afterScene: "s8",
      questionEn: "Who is going to start?",
      questionEs: "¿Quiénes van a empezar?",
      options: [
        { label: "All of them", emoji: "🌟" },
        { label: "Nobody", emoji: "🚫" },
        { label: "Only Vale", emoji: "👩" },
      ],
      answer: 0,
      sayIt: "All of them are going to start.",
      sayItEs: "Repite: «Todos van a empezar.»",
    },
  ],
  mindsetCard: {
    afterScene: "s2",
    phrase: "I can do it.",
    es: "Yo puedo hacerlo.",
  },
  continuePrompt: {
    en: "Present your own team. What is each person going to do?",
    es: "Presenta a tu equipo. ¿Qué va a hacer cada persona?",
  },
  continueWith: [
    "He is going to…",
    "She is going to…",
    "They are going to…",
    "We are going to…",
  ],
  cliffhanger: {
    en: "Episode 11: An instant decision — no time to plan.",
    es: "Episodio 11: Una decisión instantánea — no hay tiempo para planear.",
  },
};
