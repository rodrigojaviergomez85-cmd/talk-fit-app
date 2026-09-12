import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-ep14/cover.jpg";
import s1 from "@/assets/storybook/vale-ep14/s1.jpg";
import s2 from "@/assets/storybook/vale-ep14/s2.jpg";
import s3 from "@/assets/storybook/vale-ep14/s3.jpg";
import s4 from "@/assets/storybook/vale-ep14/s4.jpg";
import s5 from "@/assets/storybook/vale-ep14/s5.jpg";
import s6 from "@/assets/storybook/vale-ep14/s6.jpg";
import s7 from "@/assets/storybook/vale-ep14/s7.jpg";
import s8 from "@/assets/storybook/vale-ep14/s8.jpg";
import s9 from "@/assets/storybook/vale-ep14/s9.jpg";
import s10 from "@/assets/storybook/vale-ep14/s10.jpg";

/**
 * Season 2 · Episode 14 — "Their future".
 * Basic 1 / Simple Future Week 3 Day 4: will with other people + questions.
 */
export const VALE_S2_THEIR_FUTURE: StorybookEpisode = {
  id: "vale-s2-their-future",
  moduleId: "simple-future",
  week: 3,
  title: "Their future",
  titleEs: "Su futuro",
  episodeLabel: { en: "Season 2 · Episode 14", es: "Temporada 2 · Episodio 14" },
  previously: [
    { en: "Vale wrote three predictions.", es: "Vale escribió tres predicciones." },
    { en: "The team got ready for the rain.", es: "El equipo se preparó para la lluvia." },
    { en: "Ana wants to talk about the future.", es: "Ana quiere hablar del futuro." },
  ],
  reviewWords: [
    { word: "predictions", es: "predicciones" },
    { word: "interview", es: "entrevista" },
    { word: "future", es: "futuro" },
    { word: "weather", es: "clima" },
  ],
  blurb: {
    en: "Ana asks each person: where will you be in five years?",
    es: "Ana pregunta a cada uno: ¿dónde estarás en cinco años?",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "El equipo sentado en círculo.",
      text: "The team sits in a circle. Ana has one question.",
      es: "El equipo se sienta en círculo. Ana tiene una pregunta.",
      words: [
        { word: "sits", es: "se sienta" },
        { word: "circle", es: "círculo" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Ana pregunta al grupo.",
      text: "\"Where will you be in five years?\" she asks.",
      es: "«¿Dónde estarás en cinco años?», pregunta ella.",
      speaker: "ana",
      words: [
        { word: "where", es: "dónde" },
        { word: "years", es: "años" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Mateo responde con energía.",
      text: "\"I'll be a supervisor. I won't stop studying,\" says Mateo.",
      es: "«Seré supervisor. No dejaré de estudiar», dice Mateo.",
      speaker: "mateo",
      words: [
        { word: "supervisor", es: "supervisor" },
        { word: "studying", es: "estudiando" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Kat sueña en grande.",
      text: "\"I'll open my own small company,\" says Kat.",
      es: "«Abriré mi propia empresa pequeña», dice Kat.",
      speaker: "kat",
      words: [
        { word: "own", es: "propia" },
        { word: "company", es: "empresa" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Dylan habla del futuro.",
      text: "\"I'll teach English to young people,\" says Dylan.",
      es: "«Enseñaré inglés a jóvenes», dice Dylan.",
      speaker: "dylan",
      words: [{ word: "teach", es: "enseñar" }],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Luis habla con seguridad.",
      text: "\"I'll travel and work with international clients,\" says Luis.",
      es: "«Viajaré y trabajaré con clientes internacionales», dice Luis.",
      speaker: "luis",
      words: [
        { word: "travel", es: "viajar" },
        { word: "clients", es: "clientes" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale piensa en silencio.",
      text: "Vale is quiet. Her dream is very big.",
      es: "Vale está callada. Su sueño es muy grande.",
      words: [
        { word: "quiet", es: "callada" },
        { word: "dream", es: "sueño" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale habla frente al grupo.",
      text: "\"I'll open a free English school in my neighborhood.\"",
      es: "«Abriré una escuela de inglés gratis en mi colonia.»",
      speaker: "vale",
      words: [
        { word: "free", es: "gratis" },
        { word: "neighborhood", es: "colonia / barrio" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "El grupo aplaude a Vale.",
      text: "Ana smiles: \"Then you won't stop now.\"",
      es: "Ana sonríe: «Entonces no te detendrás ahora.»",
      speaker: "ana",
      words: [{ word: "stop", es: "detener" }],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Ana entrega tarjetas al equipo.",
      text: "Ana gives them a card: \"Tomorrow, the will challenge. No Spanish.\"",
      es: "Ana les da una tarjeta: «Mañana, el reto del will. Sin español.»",
      speaker: "ana",
      words: [
        { word: "gives", es: "da" },
        { word: "card", es: "tarjeta" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What will Kat open?",
      questionEs: "¿Qué abrirá Kat?",
      options: [
        { label: "Her own company", emoji: "🏢" },
        { label: "A restaurant", emoji: "🍽️" },
        { label: "A school", emoji: "🏫" },
      ],
      answer: 0,
      sayIt: "She will open her own company.",
      sayItEs: "Repite: «Ella abrirá su propia empresa.»",
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "What will Luis do?",
      questionEs: "¿Qué hará Luis?",
      options: [
        { label: "Travel and work with clients", emoji: "✈️" },
        { label: "Teach children", emoji: "🧒" },
        { label: "Sell food", emoji: "🥘" },
      ],
      answer: 0,
      sayIt: "He will travel and work with international clients.",
      sayItEs: "Repite: «Él viajará y trabajará con clientes internacionales.»",
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "What will Vale open?",
      questionEs: "¿Qué abrirá Vale?",
      options: [
        { label: "A free English school", emoji: "📚" },
        { label: "A big hotel", emoji: "🏨" },
        { label: "A music school", emoji: "🎶" },
      ],
      answer: 0,
      sayIt: "I'll open a free English school in my neighborhood.",
      sayItEs: "Repite: «Abriré una escuela de inglés gratis en mi colonia.»",
    },
  ],
  mindsetCard: {
    afterScene: "s8",
    phrase: "I believe in myself.",
    es: "Creo en mí.",
  },
  continuePrompt: {
    en: "Where will you be in five years? Think big.",
    es: "¿Dónde estarás en cinco años? Piensa en grande.",
  },
  continueWith: [
    "In five years, I'll…",
    "I won't…",
    "I'll work…",
    "My family will…",
  ],
  cliffhanger: {
    en: "Episode 15: The will challenge — one day in English only.",
    es: "Episodio 15: El reto del will — un día solo en inglés.",
  },
};
