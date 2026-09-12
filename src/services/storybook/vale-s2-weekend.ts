import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s2-ep3/cover.jpg";
import s1 from "@/assets/storybook/vale-s2-ep3/s1.jpg";
import s2 from "@/assets/storybook/vale-s2-ep3/s2.jpg";
import s3 from "@/assets/storybook/vale-s2-ep3/s3.jpg";
import s4 from "@/assets/storybook/vale-s2-ep3/s4.jpg";
import s5 from "@/assets/storybook/vale-s2-ep3/s5.jpg";
import s6 from "@/assets/storybook/vale-s2-ep3/s6.jpg";
import s7 from "@/assets/storybook/vale-s2-ep3/s7.jpg";
import s8 from "@/assets/storybook/vale-s2-ep3/s8.jpg";
import s9 from "@/assets/storybook/vale-s2-ep3/s9.jpg";
import s10 from "@/assets/storybook/vale-s2-ep3/s10.jpg";

/**
 * Season 2 · Episode 3 — "The weekend plan".
 * Matches Basic 1 / Simple Future Week 1 Day 3: weekend plans with I'm going to.
 */
export const VALE_S2_WEEKEND: StorybookEpisode = {
  id: "vale-s2-weekend",
  moduleId: "simple-future",
  week: 1,
  title: "The weekend plan",
  titleEs: "El plan del fin de semana",
  episodeLabel: { en: "Season 2 · Episode 3", es: "Temporada 2 · Episodio 3" },
  previously: [
    { en: "Vale forgot her notebook, but Mateo helped her.", es: "Vale olvidó su cuaderno, pero Mateo la ayudó." },
    { en: "Tomorrow, Vale is going to wake up early and study English.", es: "Mañana Vale se va a despertar temprano y a estudiar inglés." },
    { en: "The client wants the event this weekend.", es: "El cliente quiere el evento este fin de semana." },
  ],
  reviewWords: [
    { word: "early", es: "temprano" },
    { word: "study", es: "estudiar" },
    { word: "event", es: "evento" },
    { word: "weekend", es: "fin de semana" },
  ],
  blurb: {
    en: "The team meets at a cafe to plan a busy weekend.",
    es: "El equipo se reúne en un café para planear un fin de semana ocupado.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale, Mateo y Kat en un café con papeles en la mesa.",
      text: "The team meets at a cafe on Saturday.",
      es: "El equipo se reúne en un café el sábado.",
      words: [
        { word: "meets", es: "se reúne" },
        { word: "cafe", es: "café" },
        { word: "Saturday", es: "sábado" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Escena 2 del episodio.",
      text: "Vale says: \"We’re going to help young people practice English.\"",
      es: "Vale dice: «Vamos a ayudar a jóvenes a practicar inglés.»",
      speaker: "vale",
      words: [
        { word: "help", es: "ayudar" },
        { word: "young", es: "jóvenes" },
        { word: "practice", es: "practicar" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Escena 3 del episodio.",
      text: "Mateo says: \"I’m going to design the posters.\"",
      es: "Mateo dice: «Voy a diseñar los carteles.»",
      speaker: "mateo",
      words: [
        { word: "design", es: "diseñar" },
        { word: "posters", es: "carteles" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Escena 4 del episodio.",
      text: "Kat says: \"I’m going to invite my friends from college.\"",
      es: "Kat dice: «Voy a invitar a mis amigos de la universidad.»",
      speaker: "kat",
      words: [
        { word: "invite", es: "invitar" },
        { word: "friends", es: "amigos" },
        { word: "college", es: "universidad" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Escena 5 del episodio.",
      text: "Vale says: \"I’m going to prepare the activities.\"",
      es: "Vale dice: «Voy a preparar las actividades.»",
      speaker: "vale",
      words: [
        { word: "prepare", es: "preparar" },
        { word: "activities", es: "actividades" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Escena 6 del episodio.",
      text: "Mateo adds: \"I’m not going to forget the markers.\"",
      es: "Mateo agrega: «No voy a olvidar los marcadores.»",
      speaker: "mateo",
      words: [
        { word: "forget", es: "olvidar" },
        { word: "markers", es: "marcadores" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Escena 7 del episodio.",
      text: "Kat says: \"We’re going to post on social media.\"",
      es: "Kat dice: «Vamos a publicar en redes sociales.»",
      speaker: "kat",
      words: [
        { word: "post", es: "publicar" },
        { word: "social", es: "social" },
        { word: "media", es: "medios / redes" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Escena 8 del episodio.",
      text: "Vale smiles. \"It’s going to be a busy weekend.\"",
      es: "Vale sonríe. «Va a ser un fin de semana ocupado.»",
      speaker: "vale",
      words: [
        { word: "busy", es: "ocupado" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Escena 9 del episodio.",
      text: "A young man approaches the table. \"Can I join the team?\"",
      es: "Un joven se acerca a la mesa. «¿Puedo unirme al equipo?»",
      words: [
        { word: "approaches", es: "se acerca" },
        { word: "join", es: "unirse" },
        { word: "team", es: "equipo" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Escena 10 del episodio.",
      text: "Vale says: \"Yes! We’re going to need more help.\"",
      es: "Vale dice: «¡Sí! Vamos a necesitar más ayuda.»",
      speaker: "vale",
      words: [
        { word: "need", es: "necesitar" },
        { word: "more", es: "más" },
        { word: "help", es: "ayuda" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s2",
      questionEn: "What are they going to help young people practice?",
      questionEs: "¿Qué van a ayudar a practicar a los jóvenes?",
      options: [
        { label: "English", emoji: "🇬🇧" },
        { label: "Soccer", emoji: "⚽" },
        { label: "Cooking", emoji: "🍳" },
      ],
      answer: 0,
      sayIt: "We’re going to help young people practice English.",
      sayItEs: "Repite: «Vamos a ayudar a jóvenes a practicar inglés.»",
    },
    {
      id: "q2",
      afterScene: "s4",
      questionEn: "What is Kat going to do?",
      questionEs: "¿Qué va a hacer Kat?",
      options: [
        { label: "Invite her friends", emoji: "📩" },
        { label: "Design posters", emoji: "🎨" },
        { label: "Cook food", emoji: "🍲" },
      ],
      answer: 0,
      sayIt: "I’m going to invite my friends from college.",
      sayItEs: "Repite: «Voy a invitar a mis amigos de la universidad.»",
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "What does the young man want?",
      questionEs: "¿Qué quiere el joven?",
      options: [
        { label: "To join the team", emoji: "🤝" },
        { label: "To buy coffee", emoji: "☕" },
        { label: "To leave", emoji: "🚪" },
      ],
      answer: 0,
      sayIt: "Can I join the team?",
      sayItEs: "Repite: «¿Puedo unirme al equipo?»",
    },
  ],
  mindsetCard: {
    afterScene: "s8",
    phrase: "I love challenges.",
    es: "Amo los retos.",
  },
  continuePrompt: {
    en: "Tell us your weekend plan. What are you going to do?",
    es: "Cuéntanos tu plan para el fin de semana. ¿Qué vas a hacer?",
  },
  continueWith: [
    "On Saturday, I’m going to…",
    "On Sunday, I’m going to…",
    "I’m going to meet…",
    "I’m not going to…",
  ],
  cliffhanger: {
    en: "Episode 4: The team dreams bigger — they are going to travel to another city.",
    es: "Episodio 4: El equipo sueña en grande — van a viajar a otra ciudad.",
  },
};
