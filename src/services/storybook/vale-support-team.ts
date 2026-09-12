import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-ep5/cover.jpg";
import s1 from "@/assets/storybook/vale-ep5/s1.jpg";
import s2 from "@/assets/storybook/vale-ep5/s2.jpg";
import s3 from "@/assets/storybook/vale-ep5/s3.jpg";
import s4 from "@/assets/storybook/vale-ep5/s4.jpg";
import s5 from "@/assets/storybook/vale-ep5/s5.jpg";
import s6 from "@/assets/storybook/vale-ep5/s6.jpg";
import s7 from "@/assets/storybook/vale-ep5/s7.jpg";
import s8 from "@/assets/storybook/vale-ep5/s8.jpg";
import s9 from "@/assets/storybook/vale-ep5/s9.jpg";
import s10 from "@/assets/storybook/vale-ep5/s10.jpg";

/**
 * Episode 5 — "The support team" / "El equipo de soporte"
 *
 * Basic Zero Week 1 review: every teammate uses the same self-introduction
 * chunks, and Vale introduces herself alone in front of the team.
 * Mindset card: "I believe in myself."
 *
 * Cast: Vale, Mateo, Kat, Dylan, Mr. Reyes (no new characters).
 */
export const VALE_SUPPORT_TEAM: StorybookEpisode = {
  id: "vale-support-team",
  moduleId: "basic-zero",
  week: 1,
  title: "The support team",
  titleEs: "El equipo de soporte",
  episodeLabel: { en: "Episode 5", es: "Episodio 5" },
  previously: [
    { en: "The mystery message was from Dylan, a client from Canada.", es: "El mensaje misterioso era de Dylan, un cliente de Canadá." },
    { en: 'Vale said "I can do it" before the call.', es: "Vale dijo «Yo puedo hacerlo» antes de la llamada." },
    { en: "Mr. Reyes invited the team to a big meeting.", es: "El señor Reyes invitó al equipo a una gran reunión." },
  ],
  reviewWords: [
    { word: "team", es: "equipo" },
    { word: "client", es: "cliente" },
    { word: "name", es: "nombre" },
    { word: "from", es: "de (origen)" },
    { word: "live", es: "vivir" },
    { word: "favorite", es: "favorito / favorita" },
    { word: "food", es: "comida" },
    { word: "hobbies", es: "pasatiempos" },
  ],
  blurb: {
    en: "Everybody introduces themselves. Today it is Vale's turn — alone.",
    es: "Todos se presentan. Hoy le toca a Vale — sola.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "La sala de reuniones con el equipo sentado.",
      text: "The meeting room is full. The support team is here.",
      es: "La sala de reuniones está llena. El equipo de soporte está aquí.",
      words: [
        { word: "meeting", es: "reunión" },
        { word: "room", es: "sala" },
        { word: "full", es: "llena" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Mr. Reyes de pie frente al equipo.",
      text: '"Today we practice our introductions," says Mr. Reyes.',
      es: "«Hoy practicamos nuestras presentaciones», dice el señor Reyes.",
      speaker: "boss",
      words: [
        { word: "practice", es: "practicar" },
        { word: "introductions", es: "presentaciones" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Kat se presenta con una sonrisa.",
      text: '"My name is Kat. I am twenty-one. My favorite food is pizza."',
      es: "«Me llamo Kat. Tengo veintiún años. Mi comida favorita es la pizza.»",
      speaker: "kat",
      words: [
        { word: "twenty-one", es: "veintiuno" },
        { word: "pizza", es: "pizza" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Mateo se presenta con su chaqueta de mezclilla.",
      text: '"My name is Mateo. I am from Guatemala. My hobbies are music and soccer."',
      es: "«Me llamo Mateo. Soy de Guatemala. Mis pasatiempos son la música y el fútbol.»",
      speaker: "mateo",
      words: [
        { word: "music", es: "música" },
        { word: "soccer", es: "fútbol" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Dylan saluda desde la pantalla de videollamada.",
      text: 'Dylan is on the screen. "My name is Dylan. I live in Toronto."',
      es: "Dylan está en la pantalla. «Me llamo Dylan. Vivo en Toronto.»",
      speaker: "dylan",
      words: [
        { word: "screen", es: "pantalla" },
        { word: "Toronto", es: "Toronto" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale nerviosa mira al equipo.",
      text: "Now it is Vale's turn. Everybody looks at her.",
      es: "Ahora es el turno de Vale. Todos la miran.",
      words: [
        { word: "turn", es: "turno" },
        { word: "everybody", es: "todos" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale cierra los ojos un segundo y respira.",
      text: 'Vale closes her eyes for one second. "I believe in myself," she thinks.',
      es: "Vale cierra los ojos un segundo. «Creo en mí misma», piensa.",
      speaker: "vale",
      words: [
        { word: "closes", es: "cierra" },
        { word: "eyes", es: "ojos" },
        { word: "believe", es: "creer" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale de pie presentándose al equipo.",
      text: '"Hello! My name is Vale. I am nineteen years old. I am from El Salvador."',
      es: "«¡Hola! Me llamo Vale. Tengo diecinueve años. Soy de El Salvador.»",
      speaker: "vale",
      words: [
        { word: "nineteen", es: "diecinueve" },
        { word: "hello", es: "hola" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale sigue hablando con más confianza.",
      text: '"I live in San Salvador. My favorite color is yellow. My hobbies are dancing and TikTok."',
      es: "«Vivo en San Salvador. Mi color favorito es el amarillo. Mis pasatiempos son bailar y TikTok.»",
      speaker: "vale",
      words: [
        { word: "yellow", es: "amarillo" },
        { word: "dancing", es: "bailar" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "El equipo aplaude a Vale.",
      text: 'The team claps. "You are awesome, Vale!" says Kat. Mr. Reyes has one more surprise.',
      es: "El equipo aplaude. «¡Eres increíble, Vale!», dice Kat. El señor Reyes tiene una sorpresa más.",
      speaker: "kat",
      words: [
        { word: "claps", es: "aplaude" },
        { word: "awesome", es: "genial / increíble" },
        { word: "surprise", es: "sorpresa" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What are Mateo's hobbies?",
      questionEs: "¿Cuáles son los pasatiempos de Mateo?",
      options: [
        { label: "Music and soccer", emoji: "🎵" },
        { label: "Pizza", emoji: "🍕" },
        { label: "TikTok", emoji: "📱" },
      ],
      answer: 0,
      sayIt: "My hobbies are…",
      sayItEs: "Ahora di los tuyos: «Mis pasatiempos son…»",
    },
    {
      id: "q2",
      afterScene: "s8",
      questionEn: "How old is Vale?",
      questionEs: "¿Cuántos años tiene Vale?",
      options: [
        { label: "Nineteen", emoji: "1️⃣9️⃣" },
        { label: "Twenty", emoji: "2️⃣0️⃣" },
        { label: "Twenty-one", emoji: "2️⃣1️⃣" },
      ],
      answer: 0,
      sayIt: "I am … years old.",
      sayItEs: "Ahora di tu edad: «Tengo … años.»",
    },
    {
      id: "q3",
      afterScene: "s10",
      questionEn: "How is Vale now?",
      questionEs: "¿Cómo está Vale ahora?",
      options: [
        { label: "Awesome", emoji: "🌟" },
        { label: "Sad", emoji: "😢" },
        { label: "Angry", emoji: "😠" },
      ],
      answer: 0,
      sayIt: "I am awesome.",
      sayItEs: "Ahora repite: «Soy increíble.»",
    },
  ],
  mindsetCard: {
    afterScene: "s7",
    phrase: "I believe in myself. I am awesome.",
    es: "Creo en mí misma. Soy increíble.",
  },
  continuePrompt: {
    en: "Now introduce yourself to the team. Use all your Week 1 chunks.",
    es: "Ahora preséntate ante el equipo. Usa todos tus chunks de la semana 1.",
  },
  continueWith: [
    "Hello! My name is…",
    "I am … years old",
    "I am from…",
    "I live in…",
    "My favorite color is…",
    "My favorite food is…",
    "My hobbies are…",
  ],
  cliffhanger: {
    en: "To be continued… Episode 6: Where are you from?",
    es: "Continuará… Episodio 6: ¿De dónde eres?",
  },
};
