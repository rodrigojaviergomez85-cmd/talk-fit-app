import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-ep6/cover.jpg";
import s1 from "@/assets/storybook/vale-ep6/s1.jpg";
import s2 from "@/assets/storybook/vale-ep6/s2.jpg";
import s3 from "@/assets/storybook/vale-ep6/s3.jpg";
import s4 from "@/assets/storybook/vale-ep6/s4.jpg";
import s5 from "@/assets/storybook/vale-ep6/s5.jpg";
import s6 from "@/assets/storybook/vale-ep6/s6.jpg";
import s7 from "@/assets/storybook/vale-ep6/s7.jpg";
import s8 from "@/assets/storybook/vale-ep6/s8.jpg";
import s9 from "@/assets/storybook/vale-ep6/s9.jpg";
import s10 from "@/assets/storybook/vale-ep6/s10.jpg";

/**
 * Season 2 · Episode 6 — "Mateo's big weekend".
 * Basic 1 / Simple Future Week 2 Day 1: other people's plans (he is going to).
 * Script-only: illustrations are temporary placeholders.
 */
export const VALE_S2_MATEO_WEEKEND: StorybookEpisode = {
  id: "vale-s2-mateo-weekend",
  moduleId: "simple-future",
  week: 2,
  title: "Mateo's big weekend",
  titleEs: "El gran fin de semana de Mateo",
  episodeLabel: { en: "Season 2 · Episode 6", es: "Temporada 2 · Episodio 6" },
  previously: [
    { en: "Vale presented her plan to the team.", es: "Vale presentó su plan al equipo." },
    { en: "Ana said the project is real.", es: "Ana dijo que el proyecto es real." },
    { en: "Now the team needs volunteers.", es: "Ahora el equipo necesita voluntarios." },
  ],
  reviewWords: [
    { word: "plan", es: "plan" },
    { word: "event", es: "evento" },
    { word: "team", es: "equipo" },
    { word: "ready", es: "lista / listo" },
  ],
  blurb: {
    en: "Mateo has a busy weekend. Vale tells everyone what he is going to do.",
    es: "Mateo tiene un fin de semana ocupado. Vale cuenta qué va a hacer él.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Mateo habla con Vale en la oficina.",
      text: "Mateo runs to Vale with big news.",
      es: "Mateo corre hacia Vale con una gran noticia.",
      words: [
        { word: "runs", es: "corre" },
        { word: "news", es: "noticia" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Mateo sonríe emocionado.",
      text: "\"I’m going to help you this weekend!\" says Mateo.",
      es: "«¡Voy a ayudarte este fin de semana!», dice Mateo.",
      speaker: "mateo",
      words: [
        { word: "help", es: "ayudar" },
        { word: "weekend", es: "fin de semana" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale escribe en su cuaderno.",
      text: "Vale writes it down: \"Mateo is going to help me.\"",
      es: "Vale lo escribe: «Mateo va a ayudarme.»",
      speaker: "vale",
      words: [
        { word: "writes", es: "escribe" },
        { word: "down", es: "abajo / apuntar" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Mateo muestra su teléfono con una lista.",
      text: "\"On Saturday, he is going to bring the posters,\" she tells Ana.",
      es: "«El sábado, él va a traer los carteles», le dice a Ana.",
      speaker: "vale",
      words: [
        { word: "Saturday", es: "sábado" },
        { word: "bring", es: "traer" },
        { word: "posters", es: "carteles" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Ana revisa la lista del equipo.",
      text: "Ana asks: \"Is he going to invite his friends?\"",
      es: "Ana pregunta: «¿Él va a invitar a sus amigos?»",
      speaker: "ana",
      words: [
        { word: "asks", es: "pregunta" },
        { word: "invite", es: "invitar" },
        { word: "friends", es: "amigos" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Mateo levanta el pulgar.",
      text: "\"Yes, he is,\" says Vale. \"He is going to invite ten young people.\"",
      es: "«Sí», dice Vale. «Él va a invitar a diez jóvenes.»",
      speaker: "vale",
      words: [
        { word: "young", es: "jóvenes" },
        { word: "people", es: "gente / personas" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Mateo se ve preocupado por el tiempo.",
      text: "Then Mateo is quiet. \"My weekend is very busy.\"",
      es: "Luego Mateo se queda callado. «Mi fin de semana está muy ocupado.»",
      speaker: "mateo",
      words: [
        { word: "quiet", es: "callado" },
        { word: "busy", es: "ocupado" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale anima a Mateo.",
      text: "Vale smiles: \"One step at a time. You are persistent.\"",
      es: "Vale sonríe: «Un paso a la vez. Eres persistente.»",
      speaker: "vale",
      words: [
        { word: "step", es: "paso" },
        { word: "persistent", es: "persistente" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "El equipo organiza tareas en una pizarra.",
      text: "The team writes the plan: \"He isn’t going to work alone.\"",
      es: "El equipo escribe el plan: «Él no va a trabajar solo.»",
      words: [
        { word: "alone", es: "solo" },
        { word: "work", es: "trabajar" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Mateo mira su teléfono sorprendido.",
      text: "Suddenly, Mateo reads a message from his mom. His face changes.",
      es: "De repente, Mateo lee un mensaje de su mamá. Su cara cambia.",
      words: [
        { word: "suddenly", es: "de repente" },
        { word: "reads", es: "lee" },
        { word: "face", es: "cara" },
        { word: "changes", es: "cambia" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What is Mateo going to bring on Saturday?",
      questionEs: "¿Qué va a traer Mateo el sábado?",
      options: [
        { label: "The posters", emoji: "📄" },
        { label: "The food", emoji: "🍕" },
        { label: "His dog", emoji: "🐕" },
      ],
      answer: 0,
      sayIt: "He is going to bring the posters.",
      sayItEs: "Repite: «Él va a traer los carteles.»",
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "Is Mateo going to invite his friends?",
      questionEs: "¿Mateo va a invitar a sus amigos?",
      options: [
        { label: "Yes, he is", emoji: "🙌" },
        { label: "No, he isn’t", emoji: "🙅" },
        { label: "We don’t know", emoji: "❓" },
      ],
      answer: 0,
      sayIt: "Yes, he is going to invite his friends.",
      sayItEs: "Repite: «Sí, él va a invitar a sus amigos.»",
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "Is Mateo going to work alone?",
      questionEs: "¿Mateo va a trabajar solo?",
      options: [
        { label: "No, he isn’t", emoji: "🤝" },
        { label: "Yes, he is", emoji: "😰" },
        { label: "Only on Monday", emoji: "📅" },
      ],
      answer: 0,
      sayIt: "He isn’t going to work alone.",
      sayItEs: "Repite: «Él no va a trabajar solo.»",
    },
  ],
  mindsetCard: {
    afterScene: "s8",
    phrase: "I am persistent.",
    es: "Soy persistente.",
  },
  continuePrompt: {
    en: "Tell us about a friend. What is he or she going to do this weekend?",
    es: "Cuéntanos de un amigo o amiga. ¿Qué va a hacer este fin de semana?",
  },
  continueWith: [
    "He is going to…",
    "She is going to…",
    "He isn’t going to…",
    "They are going to…",
  ],
  cliffhanger: {
    en: "Episode 7: What is his mom going to do?",
    es: "Episodio 7: ¿Qué va a hacer su mamá?",
  },
};
