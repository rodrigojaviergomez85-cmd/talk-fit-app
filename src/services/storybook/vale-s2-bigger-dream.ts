import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-ep4/cover.jpg";
import s1 from "@/assets/storybook/vale-ep4/s1.jpg";
import s2 from "@/assets/storybook/vale-ep4/s2.jpg";
import s3 from "@/assets/storybook/vale-ep4/s3.jpg";
import s4 from "@/assets/storybook/vale-ep4/s4.jpg";
import s5 from "@/assets/storybook/vale-ep4/s5.jpg";
import s6 from "@/assets/storybook/vale-ep4/s6.jpg";
import s7 from "@/assets/storybook/vale-ep4/s7.jpg";
import s8 from "@/assets/storybook/vale-ep4/s8.jpg";
import s9 from "@/assets/storybook/vale-ep4/s9.jpg";
import s10 from "@/assets/storybook/vale-ep4/s10.jpg";

/**
 * Season 2 · Episode 4 — "A bigger dream".
 * Matches Basic 1 / Simple Future Week 1 Day 4: bigger plans with I'm going to.
 */
export const VALE_S2_BIGGER_DREAM: StorybookEpisode = {
  id: "vale-s2-bigger-dream",
  moduleId: "simple-future",
  week: 1,
  title: "A bigger dream",
  titleEs: "Un sueño más grande",
  episodeLabel: { en: "Season 2 · Episode 4", es: "Temporada 2 · Episodio 4" },
  previously: [
    { en: "The team met at a cafe on Saturday.", es: "El equipo se reunió en un café el sábado." },
    { en: "Mateo is going to design posters. Kat is going to invite friends.", es: "Mateo va a diseñar carteles. Kat va a invitar amigos." },
    { en: "A young man wants to join the team.", es: "Un joven quiere unirse al equipo." },
  ],
  reviewWords: [
    { word: "posters", es: "carteles" },
    { word: "invite", es: "invitar" },
    { word: "team", es: "equipo" },
    { word: "help", es: "ayudar" },
  ],
  blurb: {
    en: "The team wants to take the project to another city.",
    es: "El equipo quiere llevar el proyecto a otra ciudad.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "El equipo habla frente a un mapa en la pared de la oficina.",
      text: "The team talks about the next city.",
      es: "El equipo habla de la siguiente ciudad.",
      words: [
        { word: "talks", es: "habla" },
        { word: "next", es: "siguiente" },
        { word: "city", es: "ciudad" },
      ],
    },
    {
      id: "s2",
      image: s2,
      text: "Vale says: \"We’re going to travel to Santa Ana.\"",
      es: "Vale dice: «Vamos a viajar a Santa Ana.»",
      speaker: "vale",
      words: [
        { word: "travel", es: "viajar" },
      ],
    },
    {
      id: "s3",
      image: s3,
      text: "Mateo says: \"I’m going to call the bus company.\"",
      es: "Mateo dice: «Voy a llamar a la empresa de buses.»",
      speaker: "mateo",
      words: [
        { word: "call", es: "llamar" },
        { word: "bus", es: "bus / autobús" },
        { word: "company", es: "empresa" },
      ],
    },
    {
      id: "s4",
      image: s4,
      text: "Kat says: \"We’re going to visit a job fair.\"",
      es: "Kat dice: «Vamos a visitar una feria de empleo.»",
      speaker: "kat",
      words: [
        { word: "visit", es: "visitar" },
        { word: "job", es: "trabajo" },
        { word: "fair", es: "feria" },
      ],
    },
    {
      id: "s5",
      image: s5,
      text: "Vale says: \"I’m going to speak with the organizers.\"",
      es: "Vale dice: «Voy a hablar con los organizadores.»",
      speaker: "vale",
      words: [
        { word: "speak", es: "hablar" },
        { word: "organizers", es: "organizadores" },
      ],
    },
    {
      id: "s6",
      image: s6,
      text: "Ana says: \"You’re going to present your idea to the director.\"",
      es: "Ana dice: «Van a presentar su idea al director.»",
      speaker: "ana",
      words: [
        { word: "present", es: "presentar" },
        { word: "director", es: "director / directora" },
      ],
    },
    {
      id: "s7",
      image: s7,
      text: "Vale says: \"I’m going to practice my presentation.\"",
      es: "Vale dice: «Voy a practicar mi presentación.»",
      speaker: "vale",
      words: [
        { word: "practice", es: "practicar" },
        { word: "presentation", es: "presentación" },
      ],
    },
    {
      id: "s8",
      image: s8,
      text: "Vale looks at the mirror. \"I’m not going to be nervous.\"",
      es: "Vale mira el espejo. «No voy a estar nerviosa.»",
      speaker: "vale",
      words: [
        { word: "mirror", es: "espejo" },
        { word: "nervous", es: "nerviosa / nervioso" },
      ],
    },
    {
      id: "s9",
      image: s9,
      text: "The team cheers: \"Our dream is going to help many people!\"",
      es: "El equipo celebra: «¡Nuestro sueño va a ayudar a muchas personas!»",
      words: [
        { word: "dream", es: "sueño" },
        { word: "many", es: "muchas / muchos" },
      ],
    },
    {
      id: "s10",
      image: s10,
      text: "The phone rings. \"The director wants to meet tomorrow!\"",
      es: "El teléfono suena. «¡El director quiere reunirse mañana!»",
      words: [
        { word: "rings", es: "suena" },
        { word: "director", es: "director / directora" },
        { word: "meet", es: "reunirse / conocer" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s2",
      questionEn: "Where are they going to travel?",
      questionEs: "¿A dónde van a viajar?",
      options: [
        { label: "Santa Ana", emoji: "🚌" },
        { label: "Toronto", emoji: "🍁" },
        { label: "Guatemala", emoji: "🇬🇹" },
      ],
      answer: 0,
      sayIt: "We’re going to travel to Santa Ana.",
      sayItEs: "Repite: «Vamos a viajar a Santa Ana.»",
    },
    {
      id: "q2",
      afterScene: "s4",
      questionEn: "What are they going to visit?",
      questionEs: "¿Qué van a visitar?",
      options: [
        { label: "A job fair", emoji: "💼" },
        { label: "A beach", emoji: "🏖️" },
        { label: "A museum", emoji: "🏛️" },
      ],
      answer: 0,
      sayIt: "We’re going to visit a job fair.",
      sayItEs: "Repite: «Vamos a visitar una feria de empleo.»",
    },
    {
      id: "q3",
      afterScene: "s6",
      questionEn: "Who is Vale going to present to?",
      questionEs: "¿A quién va a presentar Vale?",
      options: [
        { label: "The director", emoji: "👔" },
        { label: "Her mom", emoji: "👩" },
        { label: "A stranger", emoji: "🧍" },
      ],
      answer: 0,
      sayIt: "I’m going to present my idea to the director.",
      sayItEs: "Repite: «Voy a presentar mi idea al director.»",
    },
  ],
  mindsetCard: {
    afterScene: "s8",
    phrase: "I believe in myself.",
    es: "Creo en mí misma.",
  },
  continuePrompt: {
    en: "Tell us your bigger plan. Where are you going to go?",
    es: "Cuéntanos tu plan más grande. ¿A dónde vas a ir?",
  },
  continueWith: [
    "I’m going to travel to…",
    "I’m going to visit…",
    "I’m going to speak with…",
    "I’m not going to be nervous.",
  ],
  cliffhanger: {
    en: "Episode 5: Vale presents her plan — but another team wants the same grant.",
    es: "Episodio 5: Vale presenta su plan — pero otro equipo quiere el mismo apoyo.",
  },
};
