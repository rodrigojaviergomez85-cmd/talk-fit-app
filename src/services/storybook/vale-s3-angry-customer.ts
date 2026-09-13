import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s3-ep4/cover.jpg";
import s1 from "@/assets/storybook/vale-s3-ep4/s1.jpg";
import s2 from "@/assets/storybook/vale-s3-ep4/s2.jpg";
import s3 from "@/assets/storybook/vale-s3-ep4/s3.jpg";
import s4 from "@/assets/storybook/vale-s3-ep4/s4.jpg";
import s5 from "@/assets/storybook/vale-s3-ep4/s5.jpg";
import s6 from "@/assets/storybook/vale-s3-ep4/s6.jpg";
import s7 from "@/assets/storybook/vale-s3-ep4/s7.jpg";
import s8 from "@/assets/storybook/vale-s3-ep4/s8.jpg";
import s9 from "@/assets/storybook/vale-s3-ep4/s9.jpg";
import s10 from "@/assets/storybook/vale-s3-ep4/s10.jpg";

/**
 * Season 3 · Episode 4 — "The angry customer".
 * Matches Basic 2 / Simple Present Week 1 Day 4: do/does questions.
 */
export const VALE_S3_ANGRY_CUSTOMER: StorybookEpisode = {
  id: "vale-s3-angry-customer",
  moduleId: "simple-present",
  week: 1,
  title: "The angry customer",
  titleEs: "El cliente enojado",
  episodeLabel: { en: "Season 3 · Episode 4", es: "Temporada 3 · Episodio 4" },
  previously: [
    { en: "Luis arrived late and the team explained the rules.", es: "Luis llegó tarde y el equipo le explicó las reglas." },
    { en: "They don't give up when things are hard.", es: "Ellos no se rinden cuando las cosas están difíciles." },
  ],
  reviewWords: [
    { word: "don't", es: "no" },
    { word: "doesn't", es: "no" },
    { word: "rules", es: "reglas" },
    { word: "give up", es: "rendirse" },
  ],
  blurb: {
    en: "An angry customer arrives. The team asks questions and finds a solution.",
    es: "Llega un cliente enojado. El equipo hace preguntas y encuentra una solución.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Un cliente enojado entra a la oficina.",
      text: "An angry customer walks into the office.",
      es: "Un cliente enojado entra a la oficina.",
      words: [
        { word: "angry", es: "enojado" },
        { word: "customer", es: "cliente" },
        { word: "walks into", es: "entra a" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Mr. Reyes le pregunta al cliente si tiene cita.",
      text: "Mr. Reyes asks: \"Do you have an appointment?\"",
      es: "Mr. Reyes pregunta: «¿Tiene usted cita?»",
      speaker: "boss",
      words: [
        { word: "asks", es: "pregunta" },
        { word: "appointment", es: "cita" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "El cliente niega con la cabeza.",
      text: "The customer shakes his head. \"No, I don't,\" he says.",
      es: "El cliente niega con la cabeza. «No, no tengo», dice.",
      words: [
        { word: "shakes", es: "sacude" },
        { word: "head", es: "cabeza" },
        { word: "No, I don't", es: "No, no" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale le pregunta a Kat sobre el cliente.",
      text: "Vale asks Kat: \"Does he need help with his bill?\"",
      es: "Vale le pregunta a Kat: «¿Él necesita ayuda con su factura?»",
      speaker: "vale",
      words: [
        { word: "need", es: "necesitar" },
        { word: "help", es: "ayuda" },
        { word: "bill", es: "factura" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Kat revisa el sistema y asiente.",
      text: "Kat checks the system. \"Yes, he does,\" she answers.",
      es: "Kat revisa el sistema. «Sí, él sí», responde.",
      speaker: "kat",
      words: [
        { word: "checks", es: "revisa" },
        { word: "system", es: "sistema" },
        { word: "answers", es: "responde" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Luis le pregunta al cliente si quiere una solución.",
      text: "Luis asks: \"Do you want a quick solution?\"",
      es: "Luis pregunta: «¿Quiere una solución rápida?»",
      speaker: "luis",
      words: [
        { word: "quick", es: "rápida/o" },
        { word: "solution", es: "solución" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Ana pregunta si el cliente habla español.",
      text: "Ana asks: \"Does anyone here speak Spanish?\"",
      es: "Ana pregunta: «¿Alguien aquí habla español?»",
      speaker: "ana",
      words: [
        { word: "anyone", es: "alguien" },
        { word: "here", es: "aquí" },
        { word: "speak", es: "hablar" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale levanta la mano y sonríe.",
      text: "Vale raises her hand. \"I do,\" she says.",
      es: "Vale levanta la mano. «Yo sí», dice.",
      speaker: "vale",
      words: [
        { word: "raises", es: "levanta" },
        { word: "hand", es: "mano" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "El cliente se tranquiliza y agradece.",
      text: "The customer calms down. \"Thank you,\" he says.",
      es: "El cliente se tranquiliza. «Gracias», dice.",
      words: [
        { word: "calms down", es: "se tranquiliza" },
        { word: "Thank you", es: "gracias" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "El equipo celebra pequeñamente en la oficina.",
      text: "The team smiles. Questions solve problems.",
      es: "El equipo sonríe. Las preguntas resuelven problemas.",
      words: [
        { word: "smiles", es: "sonríe" },
        { word: "Questions", es: "preguntas" },
        { word: "solve", es: "resuelven" },
        { word: "problems", es: "problemas" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "Does the customer have an appointment?",
      questionEs: "¿El cliente tiene cita?",
      options: [
        { label: "No, he doesn't", emoji: "❌" },
        { label: "Yes, he does", emoji: "✅" },
        { label: "Maybe", emoji: "🤷" },
      ],
      answer: 0,
      sayIt: "No, he doesn't.",
      sayItEs: "Ejemplo: «No, he doesn't.»",
      sayItAskEn: "Do you have an appointment today?",
      sayItAskEs: "¿Tienes tú una cita hoy?",
      sayItCheck: {
        target: "No, I don't",
        altTargets: ["Yes, I do"],
      },
    },
    {
      id: "q2",
      afterScene: "s5",
      questionEn: "Does the customer need help with his bill?",
      questionEs: "¿El cliente necesita ayuda con su factura?",
      options: [
        { label: "Yes, he does", emoji: "✅" },
        { label: "No, he doesn't", emoji: "❌" },
        { label: "He wants coffee", emoji: "☕" },
      ],
      answer: 0,
      sayIt: "Yes, he does.",
      sayItEs: "Ejemplo: «Yes, he does.»",
      sayItAskEn: "Do you need help with anything today?",
      sayItAskEs: "¿Necesitas tú ayuda con algo hoy?",
      sayItCheck: {
        target: "Yes, I do",
        altTargets: ["No, I don't", "I need help with *"],
      },
    },
    {
      id: "q3",
      afterScene: "s8",
      questionEn: "Who speaks Spanish with the customer?",
      questionEs: "¿Quién habla español con el cliente?",
      options: [
        { label: "Vale", emoji: "🙋‍♀️" },
        { label: "Luis", emoji: "👨" },
        { label: "Mr. Reyes", emoji: "👔" },
      ],
      answer: 0,
      sayIt: "Vale speaks Spanish.",
      sayItEs: "Ejemplo: «Vale speaks Spanish.»",
      sayItAskEn: "Do you speak Spanish?",
      sayItAskEs: "¿Tú hablas español?",
      sayItCheck: {
        target: "Yes, I do",
        altTargets: ["No, I don't", "I speak *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s10",
    phrase: "Mistakes are part of the process.",
    es: "Los errores son parte del proceso.",
  },
  continuePrompt: {
    en: "Now ask three questions about your own day. For example: Do you wake up early? Does your best friend work? Do your classmates study English?",
    es: "Ahora haz tres preguntas sobre tu propio día. Por ejemplo: ¿Te despiertas temprano? ¿Tu mejor amigo/a trabaja? ¿Tus compañeros estudian inglés?",
  },
  continueWith: [
    "Do you wake up early?",
    "Does your friend work?",
    "Do your classmates study English?",
    "Yes, I do / No, I don't",
  ],
  cliffhanger: {
    en: "Episode 5: The team routine challenge — can Vale lead the shift?",
    es: "Episodio 5: El reto de la rutina del equipo — ¿podrá Vale liderar el turno?",
  },
};
