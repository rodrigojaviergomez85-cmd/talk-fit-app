import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-ep8/cover.jpg";
import s1 from "@/assets/storybook/vale-ep8/s1.jpg";
import s2 from "@/assets/storybook/vale-ep8/s2.jpg";
import s3 from "@/assets/storybook/vale-ep8/s3.jpg";
import s4 from "@/assets/storybook/vale-ep8/s4.jpg";
import s5 from "@/assets/storybook/vale-ep8/s5.jpg";
import s6 from "@/assets/storybook/vale-ep8/s6.jpg";
import s7 from "@/assets/storybook/vale-ep8/s7.jpg";
import s8 from "@/assets/storybook/vale-ep8/s8.jpg";
import s9 from "@/assets/storybook/vale-ep8/s9.jpg";
import s10 from "@/assets/storybook/vale-ep8/s10.jpg";

/**
 * Season 2 · Episode 8 — "The busiest person".
 * Basic 1 / Simple Future Week 2 Day 3: they are going to + negatives.
 */
export const VALE_S2_BUSIEST: StorybookEpisode = {
  id: "vale-s2-busiest",
  moduleId: "simple-future",
  week: 2,
  title: "The busiest person",
  titleEs: "La persona más ocupada",
  episodeLabel: { en: "Season 2 · Episode 8", es: "Temporada 2 · Episodio 8" },
  previously: [
    { en: "Mateo's mom is going to sell food.", es: "La mamá de Mateo va a vender comida." },
    { en: "The team is going to prepare a space.", es: "El equipo va a preparar un espacio." },
    { en: "Kat arrived with a long list.", es: "Kat llegó con una lista larga." },
  ],
  reviewWords: [
    { word: "prepare", es: "preparar" },
    { word: "sell", es: "vender" },
    { word: "phrases", es: "frases" },
    { word: "list", es: "lista" },
  ],
  blurb: {
    en: "Kat has twenty tasks. Who is going to do them all?",
    es: "Kat tiene veinte tareas. ¿Quién las va a hacer todas?",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Kat muestra una lista larga.",
      text: "Kat shows her list. It has twenty tasks.",
      es: "Kat muestra su lista. Tiene veinte tareas.",
      words: [
        { word: "shows", es: "muestra" },
        { word: "tasks", es: "tareas" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "El equipo mira la lista sorprendido.",
      text: "\"We are going to do all of this?\" asks Dylan.",
      es: "«¿Vamos a hacer todo esto?», pregunta Dylan.",
      speaker: "dylan",
      words: [
        { word: "all", es: "todo" },
        { word: "this", es: "esto" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale organiza las tareas.",
      text: "Vale is calm. \"We are going to divide the list.\"",
      es: "Vale está tranquila. «Vamos a dividir la lista.»",
      speaker: "vale",
      words: [
        { word: "calm", es: "tranquila" },
        { word: "divide", es: "dividir" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Kat y Dylan reciben tareas.",
      text: "\"Kat and Dylan are going to call the schools,\" she says.",
      es: "«Kat y Dylan van a llamar a las escuelas», dice ella.",
      speaker: "vale",
      words: [
        { word: "call", es: "llamar" },
        { word: "schools", es: "escuelas" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Mateo y Luis con cajas.",
      text: "\"Mateo and Luis are going to carry the chairs.\"",
      es: "«Mateo y Luis van a cargar las sillas.»",
      speaker: "vale",
      words: [
        { word: "carry", es: "cargar" },
        { word: "chairs", es: "sillas" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale marca una tarea.",
      text: "\"They aren’t going to do everything today. Only five tasks.\"",
      es: "«Ellos no van a hacer todo hoy. Solo cinco tareas.»",
      speaker: "vale",
      words: [
        { word: "everything", es: "todo" },
        { word: "only", es: "solo" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Kat sonríe aliviada.",
      text: "Kat breathes. \"Now the list is easy.\"",
      es: "Kat respira. «Ahora la lista es fácil.»",
      speaker: "kat",
      words: [
        { word: "breathes", es: "respira" },
        { word: "easy", es: "fácil" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "El equipo levanta las manos juntos.",
      text: "The team says together: \"We are a champion team.\"",
      es: "El equipo dice junto: «Somos un equipo campeón.»",
      words: [
        { word: "together", es: "juntos" },
        { word: "champion", es: "campeón" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Ana observa desde la puerta.",
      text: "Ana watches from the door and smiles.",
      es: "Ana observa desde la puerta y sonríe.",
      words: [
        { word: "watches", es: "observa" },
        { word: "door", es: "puerta" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Kat y Dylan discuten dos ideas.",
      text: "But Kat and Dylan have two very different plans for Saturday.",
      es: "Pero Kat y Dylan tienen dos planes muy diferentes para el sábado.",
      words: [
        { word: "different", es: "diferentes" },
        { word: "plans", es: "planes" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What are Kat and Dylan going to do?",
      questionEs: "¿Qué van a hacer Kat y Dylan?",
      options: [
        { label: "Call the schools", emoji: "☎️" },
        { label: "Carry the chairs", emoji: "🪑" },
        { label: "Cook the food", emoji: "🍳" },
      ],
      answer: 0,
      sayIt: "They are going to call the schools.",
      sayItEs: "Repite: «Ellos van a llamar a las escuelas.»",
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "Are they going to do everything today?",
      questionEs: "¿Van a hacer todo hoy?",
      options: [
        { label: "No, they aren’t", emoji: "🙅" },
        { label: "Yes, they are", emoji: "💥" },
        { label: "Only Ana is", emoji: "👩" },
      ],
      answer: 0,
      sayIt: "They aren’t going to do everything today.",
      sayItEs: "Repite: «Ellos no van a hacer todo hoy.»",
    },
    {
      id: "q3",
      afterScene: "s8",
      questionEn: "How many tasks are they going to do?",
      questionEs: "¿Cuántas tareas van a hacer?",
      options: [
        { label: "Five tasks", emoji: "5️⃣" },
        { label: "Twenty tasks", emoji: "🔟" },
        { label: "Zero tasks", emoji: "0️⃣" },
      ],
      answer: 0,
      sayIt: "We are going to do five tasks today.",
      sayItEs: "Repite: «Vamos a hacer cinco tareas hoy.»",
    },
  ],
  mindsetCard: {
    afterScene: "s8",
    phrase: "I am a champion.",
    es: "Soy un campeón / una campeona.",
  },
  continuePrompt: {
    en: "Think about your friends or family. What are they going to do this week?",
    es: "Piensa en tus amigos o familia. ¿Qué van a hacer esta semana?",
  },
  continueWith: [
    "They are going to…",
    "They aren’t going to…",
    "We are going to…",
    "My friends are going to…",
  ],
  cliffhanger: {
    en: "Episode 9: Two different plans — Kat and Dylan don't agree.",
    es: "Episodio 9: Dos planes diferentes — Kat y Dylan no están de acuerdo.",
  },
};
