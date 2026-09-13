import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s3-ep20/cover.jpg";
import s1 from "@/assets/storybook/vale-s3-ep20/s1.jpg";
import s2 from "@/assets/storybook/vale-s3-ep20/s2.jpg";
import s3 from "@/assets/storybook/vale-s3-ep20/s3.jpg";
import s4 from "@/assets/storybook/vale-s3-ep20/s4.jpg";
import s5 from "@/assets/storybook/vale-s3-ep20/s5.jpg";
import s6 from "@/assets/storybook/vale-s3-ep20/s6.jpg";
import s7 from "@/assets/storybook/vale-s3-ep20/s7.jpg";
import s8 from "@/assets/storybook/vale-s3-ep20/s8.jpg";
import s9 from "@/assets/storybook/vale-s3-ep20/s9.jpg";
import s10 from "@/assets/storybook/vale-s3-ep20/s10.jpg";

/**
 * Season 3 · Episode 20 — "Vale's first class".
 * Basic 2 / Simple Present Week 4 Day 20: present progressive challenge + Season 4 hook (simple past).
 */
export const VALE_S3_FIRST_CLASS: StorybookEpisode = {
  id: "vale-s3-first-class",
  moduleId: "simple-present",
  week: 4,
  title: "Vale's first class",
  titleEs: "La primera clase de Vale",
  episodeLabel: { en: "Season 3 · Episode 20", es: "Temporada 3 · Episodio 20" },
  previously: [
    { en: "Vale's mom gave her a notebook: \"Teacher Vale\".", es: "La mamá de Vale le regaló un cuaderno: «Teacher Vale»." },
    { en: "Tomorrow is her first demo class.", es: "Mañana es su primera clase demo." },
  ],
  reviewWords: [
    { word: "teaching", es: "enseñando" },
    { word: "notebook", es: "cuaderno" },
    { word: "persistent", es: "persistente" },
  ],
  blurb: {
    en: "An airport, a surprise guest and Vale in front of her first students.",
    es: "Un aeropuerto, un invitado sorpresa y Vale frente a sus primeros alumnos.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Una terminal de aeropuerto llena de gente.",
      text: "The airport is busy. People are walking, waiting and checking their phones.",
      es: "El aeropuerto está lleno. La gente está caminando, esperando y revisando sus teléfonos.",
      speaker: "narrator",
      words: [
        { word: "airport", es: "aeropuerto" },
        { word: "waiting", es: "esperando" },
        { word: "checking", es: "revisando" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale espera en la puerta de llegadas con un cartel.",
      text: "Vale is waiting at the gate. She is holding a small sign.",
      es: "Vale está esperando en la puerta. Está sosteniendo un cartel pequeño.",
      speaker: "narrator",
      words: [
        { word: "gate", es: "puerta" },
        { word: "holding", es: "sosteniendo" },
        { word: "sign", es: "cartel" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Un hombre mayor con maleta saluda a Vale.",
      text: "A guest teacher is arriving from the United States. Vale is his host today.",
      es: "Un maestro invitado está llegando de Estados Unidos. Vale es su anfitriona hoy.",
      speaker: "narrator",
      words: [
        { word: "guest", es: "invitado" },
        { word: "arriving", es: "llegando" },
        { word: "host", es: "anfitriona" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale y el maestro invitado hablan en el taxi.",
      text: "They talk in English all the way. Vale is not translating in her head.",
      es: "Hablan en inglés todo el camino. Vale no está traduciendo en su cabeza.",
      speaker: "narrator",
      words: [
        { word: "talk", es: "hablan" },
        { word: "translating", es: "traduciendo" },
        { word: "head", es: "cabeza" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Un salón pequeño con seis estudiantes esperando.",
      text: "Six students are waiting in a small classroom. This is her demo class.",
      es: "Seis estudiantes están esperando en un salón pequeño. Esta es su clase demo.",
      speaker: "narrator",
      words: [
        { word: "students", es: "estudiantes" },
        { word: "classroom", es: "salón" },
        { word: "demo", es: "demostración" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale respira profundo detrás de la puerta.",
      text: "Vale's hands are shaking. She says: \"I am amazing. I can do it.\"",
      es: "Las manos de Vale están temblando. Dice: «Soy increíble. Yo puedo hacerlo.»",
      speaker: "vale",
      words: [
        { word: "shaking", es: "temblando" },
        { word: "amazing", es: "increíble" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale enseña frente a la pizarra con energía.",
      text: "\"Good evening! My name is Vale, and today we are speaking English.\"",
      es: "«¡Buenas noches! Me llamo Vale, y hoy estamos hablando inglés.»",
      speaker: "vale",
      words: [
        { word: "evening", es: "noche" },
        { word: "speaking", es: "hablando" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Los estudiantes repiten frases y levantan la mano.",
      text: "The students are repeating, laughing and asking questions.",
      es: "Los estudiantes están repitiendo, riendo y haciendo preguntas.",
      speaker: "narrator",
      words: [
        { word: "repeating", es: "repitiendo" },
        { word: "asking", es: "preguntando" },
        { word: "questions", es: "preguntas" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Mr. Reyes, Kat, Mateo y Ana aplauden desde la puerta.",
      text: "At the door, the team is clapping. Mr. Reyes says: \"Teacher Vale.\"",
      es: "En la puerta, el equipo está aplaudiendo. Mr. Reyes dice: «Teacher Vale.»",
      speaker: "boss",
      words: [
        { word: "door", es: "puerta" },
        { word: "clapping", es: "aplaudiendo" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale escribe en su cuaderno de noche, feliz.",
      text: "That night Vale writes: \"Yesterday I was a student. Today I taught my first class.\"",
      es: "Esa noche Vale escribe: «Ayer era estudiante. Hoy di mi primera clase.»",
      speaker: "vale",
      words: [
        { word: "Yesterday", es: "ayer" },
        { word: "student", es: "estudiante" },
        { word: "taught", es: "enseñé" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s5",
      questionEn: "What are the students doing?",
      questionEs: "¿Qué están haciendo los estudiantes?",
      options: [
        { label: "They are waiting", emoji: "⏳" },
        { label: "They are swimming", emoji: "🏊" },
        { label: "They are cooking", emoji: "🍳" },
      ],
      answer: 0,
      sayIt: "They are waiting in the classroom.",
      sayItEs: "Repite: «They are waiting in the classroom.»",
      sayItCheck: { target: "They are waiting in the classroom" },
    },
    {
      id: "q2",
      afterScene: "s8",
      questionEn: "Why do you study English?",
      questionEs: "¿Por qué estudias inglés?",
      options: [
        { label: "Because I want a better job", emoji: "💼" },
        { label: "Because I want to travel", emoji: "✈️" },
        { label: "Because I want to teach", emoji: "👩‍🏫" },
      ],
      answer: 0,
      sayIt: "I study English because I want a better job.",
      sayItEs: "Ejemplo: «I study English because I want a better job.»",
      sayItAskEn: "Why do you study English?",
      sayItAskEs: "¿Por qué estudias inglés?",
      sayItCheck: {
        target: "I study English because *",
        altTargets: ["Because I *", "I study because *"],
      },
    },
    {
      id: "q3",
      afterScene: "s10",
      questionEn: "What are you doing to reach your dream?",
      questionEs: "¿Qué estás haciendo para alcanzar tu sueño?",
      options: [
        { label: "I am practicing every day", emoji: "🎙️" },
        { label: "I am saving money", emoji: "💰" },
        { label: "I am studying at night", emoji: "🌙" },
      ],
      answer: 0,
      sayIt: "I am practicing every day.",
      sayItEs: "Ejemplo: «I am practicing every day.»",
      sayItAskEn: "What are you doing to reach your dream?",
      sayItAskEs: "¿Qué estás haciendo para alcanzar tu sueño?",
      sayItCheck: {
        target: "I am *",
        altTargets: ["I'm *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s6",
    phrase: "I am amazing. I can do it.",
    es: "Soy increíble. Yo puedo hacerlo.",
  },
  continuePrompt: {
    en: "Tell us about your dream. What are you doing right now to reach it?",
    es: "Cuéntanos tu sueño. ¿Qué estás haciendo ahora mismo para alcanzarlo?",
  },
  continueWith: ["My dream is…", "I am…", "Every day I…", "I can do it."],
  cliffhanger: {
    en: "Season 4: Vale tells the story of everything that happened. The past begins.",
    es: "Temporada 4: Vale cuenta la historia de todo lo que pasó. Empieza el pasado.",
  },
};
