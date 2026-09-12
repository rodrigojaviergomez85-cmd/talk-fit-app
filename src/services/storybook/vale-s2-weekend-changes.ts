import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-ep17/cover.jpg";
import s1 from "@/assets/storybook/vale-ep17/s1.jpg";
import s2 from "@/assets/storybook/vale-ep17/s2.jpg";
import s3 from "@/assets/storybook/vale-ep17/s3.jpg";
import s4 from "@/assets/storybook/vale-ep17/s4.jpg";
import s5 from "@/assets/storybook/vale-ep17/s5.jpg";
import s6 from "@/assets/storybook/vale-ep17/s6.jpg";
import s7 from "@/assets/storybook/vale-ep17/s7.jpg";
import s8 from "@/assets/storybook/vale-ep17/s8.jpg";
import s9 from "@/assets/storybook/vale-ep17/s9.jpg";
import s10 from "@/assets/storybook/vale-ep17/s10.jpg";

/**
 * Season 2 · Episode 17 — "Weekend changes".
 * Basic 1 / Simple Future Week 4 Day 2: changing plans, going to + will mixed.
 */
export const VALE_S2_WEEKEND_CHANGES: StorybookEpisode = {
  id: "vale-s2-weekend-changes",
  moduleId: "simple-future",
  week: 4,
  title: "Weekend changes",
  titleEs: "Cambios de fin de semana",
  episodeLabel: { en: "Season 2 · Episode 17", es: "Temporada 2 · Episodio 17" },
  previously: [
    { en: "Vale went for Beto downtown.", es: "Vale fue por Beto al centro." },
    { en: "Mateo printed the posters.", es: "Mateo imprimió los carteles." },
    { en: "A message said the plan will change.", es: "Un mensaje dijo que el plan cambiará." },
  ],
  reviewWords: [
    { word: "decision", es: "decisión" },
    { word: "change", es: "cambiar" },
    { word: "quit", es: "rendirse" },
    { word: "agenda", es: "agenda" },
  ],
  blurb: {
    en: "The event moves to Sunday. The team changes every plan in one morning.",
    es: "El evento se mueve al domingo. El equipo cambia cada plan en una mañana.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale lee el mensaje temprano.",
      text: "The school moves the event to Sunday.",
      es: "La escuela mueve el evento al domingo.",
      words: [
        { word: "moves", es: "mueve" },
        { word: "Sunday", es: "domingo" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "El equipo reunido de emergencia.",
      text: "\"We aren’t going to panic,\" says Vale. \"We are going to change the plan.\"",
      es: "«No vamos a entrar en pánico», dice Vale. «Vamos a cambiar el plan.»",
      speaker: "vale",
      words: [
        { word: "panic", es: "pánico" },
        { word: "change", es: "cambiar" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Kat escribe mensajes.",
      text: "\"I'll write to the fifty people right now,\" says Kat.",
      es: "«Le escribiré a las cincuenta personas ahora mismo», dice Kat.",
      speaker: "kat",
      words: [{ word: "write", es: "escribir" }],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Mateo llama a su mamá.",
      text: "\"My mom is going to cook on Sunday now,\" says Mateo.",
      es: "«Mi mamá va a cocinar el domingo ahora», dice Mateo.",
      speaker: "mateo",
      words: [{ word: "cook", es: "cocinar" }],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Dylan cambia su horario.",
      text: "\"I won't work on Sunday morning. I'll be free,\" says Dylan.",
      es: "«No trabajaré el domingo en la mañana. Estaré libre», dice Dylan.",
      speaker: "dylan",
      words: [{ word: "free", es: "libre" }],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale actualiza la pizarra.",
      text: "Vale updates the board: \"New plan, same dream.\"",
      es: "Vale actualiza la pizarra: «Nuevo plan, mismo sueño.»",
      speaker: "vale",
      words: [
        { word: "updates", es: "actualiza" },
        { word: "board", es: "pizarra" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Luis llega con una noticia.",
      text: "Luis arrives: \"Three companies are going to send recruiters.\"",
      es: "Luis llega: «Tres empresas van a enviar reclutadores.»",
      speaker: "luis",
      words: [
        { word: "companies", es: "empresas" },
        { word: "recruiters", es: "reclutadores" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "El equipo celebra la noticia.",
      text: "The team shouts. The change is now good news.",
      es: "El equipo grita. El cambio ahora es buena noticia.",
      words: [
        { word: "shouts", es: "grita" },
        { word: "news", es: "noticia" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale escribe en su cuaderno.",
      text: "Vale writes: \"Plans change. I don't quit. I am amazing.\"",
      es: "Vale escribe: «Los planes cambian. Yo no me rindo. Soy increíble.»",
      speaker: "vale",
      words: [{ word: "plans", es: "planes" }],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Camila aparece en videollamada.",
      text: "Then Camila calls from Honduras: \"I have news about my future.\"",
      es: "Luego Camila llama desde Honduras: «Tengo noticias sobre mi futuro.»",
      speaker: "camila",
      words: [
        { word: "calls", es: "llama" },
        { word: "future", es: "futuro" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s2",
      questionEn: "What day is the event now?",
      questionEs: "¿Qué día es el evento ahora?",
      options: [
        { label: "Sunday", emoji: "📅" },
        { label: "Saturday", emoji: "🗓️" },
        { label: "Friday", emoji: "🕔" },
      ],
      answer: 0,
      sayIt: "The event is going to be on Sunday.",
      sayItEs: "Repite: «El evento va a ser el domingo.»",
    },
    {
      id: "q2",
      afterScene: "s5",
      questionEn: "Will Dylan work on Sunday morning?",
      questionEs: "¿Dylan trabajará el domingo en la mañana?",
      options: [
        { label: "No, he won't", emoji: "🙌" },
        { label: "Yes, he will", emoji: "💼" },
        { label: "Only one hour", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "He won't work on Sunday morning.",
      sayItEs: "Repite: «Él no trabajará el domingo en la mañana.»",
    },
    {
      id: "q3",
      afterScene: "s8",
      questionEn: "What are three companies going to send?",
      questionEs: "¿Qué van a enviar tres empresas?",
      options: [
        { label: "Recruiters", emoji: "🧑‍💼" },
        { label: "Food", emoji: "🍕" },
        { label: "Chairs", emoji: "🪑" },
      ],
      answer: 0,
      sayIt: "Three companies are going to send recruiters.",
      sayItEs: "Repite: «Tres empresas van a enviar reclutadores.»",
    },
  ],
  mindsetCard: {
    afterScene: "s9",
    phrase: "I am amazing.",
    es: "Soy increíble.",
  },
  continuePrompt: {
    en: "A plan of yours changes today. What are you going to do and what will you decide now?",
    es: "Un plan tuyo cambia hoy. ¿Qué vas a hacer y qué decidirás ahora?",
  },
  continueWith: [
    "My plan is going to change…",
    "Now I'll…",
    "I won't…",
    "We are going to…",
  ],
  cliffhanger: {
    en: "Episode 18: Camila's future — a decision from another country.",
    es: "Episodio 18: El futuro de Camila — una decisión desde otro país.",
  },
};
