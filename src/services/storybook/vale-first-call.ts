import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-ep2/cover.jpg";
import s1 from "@/assets/storybook/vale-ep2/s1.jpg";
import s2 from "@/assets/storybook/vale-ep2/s2.jpg";
import s3 from "@/assets/storybook/vale-ep2/s3.jpg";
import s4 from "@/assets/storybook/vale-ep2/s4.jpg";
import s5 from "@/assets/storybook/vale-ep2/s5.jpg";
import s6 from "@/assets/storybook/vale-ep2/s6.jpg";
import s7 from "@/assets/storybook/vale-ep2/s7.jpg";
import s8 from "@/assets/storybook/vale-ep2/s8.jpg";
import s9 from "@/assets/storybook/vale-ep2/s9.jpg";
import s10 from "@/assets/storybook/vale-ep2/s10.jpg";

/**
 * Episode 2 — "La primera llamada".
 * Matches Basic Zero Week 2: the same introduction language, now connected and
 * said out loud to a real person. Hand-written; no runtime AI.
 */
export const VALE_FIRST_CALL: StorybookEpisode = {
  id: "vale-first-call",
  moduleId: "basic-zero",
  week: 2,
  title: "The First Call",
  titleEs: "La primera llamada",
  episodeLabel: { en: "Episode 2", es: "Episodio 2" },
  previously: [
    { en: "Vale started her first day at the call center.", es: "Vale empezó su primer día en el call center." },
    { en: "She said her name in English in front of everyone.", es: "Dijo su nombre en inglés frente a todos." },
    { en: "Then the phone rang…", es: "Y entonces sonó el teléfono…" },
  ],
  reviewWords: [
    { word: "job", es: "trabajo" },
    { word: "office", es: "oficina" },
    { word: "name", es: "nombre" },
    { word: "favorite", es: "favorito / favorita" },
  ],
  blurb: {
    en: "Vale takes her very first call in English. One customer. One minute. No script.",
    es: "Vale contesta su primera llamada en inglés. Un cliente. Un minuto. Sin guion.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale se pone los audífonos en su escritorio.",
      text: "Vale is at her desk. Her headset is on.",
      es: "Vale está en su escritorio. Sus audífonos están puestos.",
      words: [
        { word: "desk", es: "escritorio" },
        { word: "headset", es: "audífonos con micrófono" },
        { word: "on", es: "puesto / encendido" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "La pantalla del teléfono se ilumina con una llamada.",
      text: "The phone rings. It is her first call.",
      es: "El teléfono suena. Es su primera llamada.",
      speaker: "narrator",
      words: [
        { word: "phone", es: "teléfono" },
        { word: "rings", es: "suena" },
        { word: "first", es: "primera" },
        { word: "call", es: "llamada" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale saluda con una sonrisa mientras contesta.",
      text: "Hello! My name is Vale. How are you today?",
      es: "¡Hola! Mi nombre es Vale. ¿Cómo estás hoy?",
      speaker: "vale",
      words: [
        { word: "hello", es: "hola" },
        { word: "name", es: "nombre" },
        { word: "how", es: "cómo" },
        { word: "today", es: "hoy" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Panel dividido: Vale en la oficina y Dylan en la calle nevada.",
      text: "The customer is a young man. He is in Canada.",
      es: "El cliente es un chico joven. Él está en Canadá.",
      words: [
        { word: "customer", es: "cliente" },
        { word: "young", es: "joven" },
        { word: "man", es: "hombre / chico" },
        { word: "Canada", es: "Canadá" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Dylan sonríe mientras habla por teléfono en la nieve.",
      text: "Hi, Vale. I am Dylan. I am from Canada.",
      es: "Hola, Vale. Yo soy Dylan. Soy de Canadá.",
      speaker: "dylan",
      words: [
        { word: "hi", es: "hola" },
        { word: "am", es: "soy / estoy" },
        { word: "from", es: "de (origen)" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale señala la bandera de El Salvador en su monitor.",
      text: "Nice to meet you, Dylan. I am from El Salvador.",
      es: "Mucho gusto, Dylan. Yo soy de El Salvador.",
      speaker: "vale",
      words: [
        { word: "nice", es: "agradable / qué gusto" },
        { word: "meet", es: "conocer" },
        { word: "you", es: "tú / usted" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale habla con calma, con los ojos cerrados.",
      text: "Vale speaks slowly. Her voice is calm.",
      es: "Vale habla despacio. Su voz es tranquila.",
      words: [
        { word: "speaks", es: "habla" },
        { word: "slowly", es: "despacio" },
        { word: "voice", es: "voz" },
        { word: "calm", es: "tranquila" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Dylan ríe y levanta el pulgar.",
      text: "Your English is very good, Vale!",
      es: "¡Tu inglés es muy bueno, Vale!",
      speaker: "dylan",
      words: [
        { word: "your", es: "tu / tuyo" },
        { word: "English", es: "inglés" },
        { word: "very", es: "muy" },
        { word: "good", es: "bueno" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Kat felicita a Vale con los pulgares arriba.",
      text: "Thank you! I am happy. This is my favorite day.",
      es: "¡Gracias! Estoy feliz. Este es mi día favorito.",
      speaker: "vale",
      words: [
        { word: "thank", es: "agradecer" },
        { word: "happy", es: "feliz" },
        { word: "favorite", es: "favorito" },
        { word: "day", es: "día" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Mr. Reyes llama a Vale a su oficina con cara seria.",
      text: "Vale, come to my office, please.",
      es: "Vale, ven a mi oficina, por favor.",
      speaker: "boss",
      words: [
        { word: "come", es: "ven / venir" },
        { word: "office", es: "oficina" },
        { word: "please", es: "por favor" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s5",
      questionEn: "Where is Dylan from?",
      questionEs: "¿De dónde es Dylan?",
      options: [
        { label: "Canada", emoji: "🇨🇦" },
        { label: "El Salvador", emoji: "🇸🇻" },
        { label: "Mexico", emoji: "🇲🇽" },
      ],
      answer: 0,
      sayIt: "Where are you from?",
      sayItEs: "¿De dónde eres tú?",
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "How is Vale's voice?",
      questionEs: "¿Cómo es la voz de Vale?",
      options: [
        { label: "Calm", emoji: "😌" },
        { label: "Very fast", emoji: "💨" },
        { label: "Angry", emoji: "😠" },
      ],
      answer: 0,
      sayIt: "My voice is calm.",
      sayItEs: "Mi voz es tranquila.",
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "How is Vale today?",
      questionEs: "¿Cómo está Vale hoy?",
      options: [
        { label: "Happy", emoji: "😄" },
        { label: "Tired", emoji: "😴" },
        { label: "Sad", emoji: "😢" },
      ],
      answer: 0,
      sayIt: "I am happy today.",
      sayItEs: "Yo estoy feliz hoy.",
    },
  ],
  continuePrompt: {
    en: "Now you answer the call: greet the customer and introduce yourself.",
    es: "Ahora contesta tú la llamada: saluda al cliente y preséntate.",
  },
  continueWith: [
    "Hello! My name is…",
    "I am from…",
    "I live in…",
    "Nice to meet you.",
    "How are you today?",
  ],
  cliffhanger: {
    en: "Mr. Reyes is serious. Why? Next episode: \"Who is he?\"",
    es: "Mr. Reyes está serio. ¿Por qué? Próximo episodio: «¿Quién es él?»",
  },
};
