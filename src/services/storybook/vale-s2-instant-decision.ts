import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-ep11/cover.jpg";
import s1 from "@/assets/storybook/vale-ep11/s1.jpg";
import s2 from "@/assets/storybook/vale-ep11/s2.jpg";
import s3 from "@/assets/storybook/vale-ep11/s3.jpg";
import s4 from "@/assets/storybook/vale-ep11/s4.jpg";
import s5 from "@/assets/storybook/vale-ep11/s5.jpg";
import s6 from "@/assets/storybook/vale-ep11/s6.jpg";
import s7 from "@/assets/storybook/vale-ep11/s7.jpg";
import s8 from "@/assets/storybook/vale-ep11/s8.jpg";
import s9 from "@/assets/storybook/vale-ep11/s9.jpg";
import s10 from "@/assets/storybook/vale-ep11/s10.jpg";

/**
 * Season 2 · Episode 11 — "An instant decision".
 * Basic 1 / Simple Future Week 3 Day 1: will for immediate decisions.
 */
export const VALE_S2_INSTANT_DECISION: StorybookEpisode = {
  id: "vale-s2-instant-decision",
  moduleId: "simple-future",
  week: 3,
  title: "An instant decision",
  titleEs: "Una decisión instantánea",
  episodeLabel: { en: "Season 2 · Episode 11", es: "Temporada 2 · Episodio 11" },
  previously: [
    { en: "Vale presented the team plan.", es: "Vale presentó el plan del equipo." },
    { en: "Everybody clapped.", es: "Todos aplaudieron." },
    { en: "Then the event place said no.", es: "Luego el lugar del evento dijo que no." },
  ],
  reviewWords: [
    { word: "place", es: "lugar" },
    { word: "decide", es: "decidir" },
    { word: "proud", es: "orgullosa" },
    { word: "start", es: "empezar" },
  ],
  blurb: {
    en: "No plan, no time. Vale decides in one second: \"I'll fix it.\"",
    es: "Sin plan, sin tiempo. Vale decide en un segundo: «Yo lo arreglo.»",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale escucha la mala noticia por teléfono.",
      text: "The call is short and bad. The place is closed on Saturday.",
      es: "La llamada es corta y mala. El lugar está cerrado el sábado.",
      words: [
        { word: "short", es: "corta" },
        { word: "closed", es: "cerrado" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "El equipo mira a Vale en silencio.",
      text: "The team looks at Vale. Nobody speaks.",
      es: "El equipo mira a Vale. Nadie habla.",
      words: [
        { word: "nobody", es: "nadie" },
        { word: "speaks", es: "habla" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale toma su teléfono con decisión.",
      text: "Vale takes her phone. \"OK. I'll call the school right now.\"",
      es: "Vale toma su teléfono. «OK. Llamaré a la escuela ahora mismo.»",
      speaker: "vale",
      words: [
        { word: "takes", es: "toma" },
        { word: "right", es: "justo / mismo" },
        { word: "now", es: "ahora" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Kat se levanta rápido.",
      text: "\"I'll help you,\" says Kat. \"I'll write the new address.\"",
      es: "«Te ayudaré», dice Kat. «Escribiré la nueva dirección.»",
      speaker: "kat",
      words: [
        { word: "write", es: "escribir" },
        { word: "address", es: "dirección" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Dylan levanta la mano.",
      text: "\"I'll send the message to the fifty people,\" says Dylan.",
      es: "«Yo enviaré el mensaje a las cincuenta personas», dice Dylan.",
      speaker: "dylan",
      words: [
        { word: "send", es: "enviar" },
        { word: "message", es: "mensaje" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Mateo corre hacia la puerta.",
      text: "\"I'll talk to my mom. She has a van,\" says Mateo.",
      es: "«Hablaré con mi mamá. Ella tiene una van», dice Mateo.",
      speaker: "mateo",
      words: [
        { word: "talk", es: "hablar" },
        { word: "van", es: "camioneta / van" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale al teléfono con la escuela.",
      text: "The school says yes. Vale closes her eyes and smiles.",
      es: "La escuela dice que sí. Vale cierra los ojos y sonríe.",
      words: [
        { word: "closes", es: "cierra" },
        { word: "eyes", es: "ojos" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "El equipo celebra en la oficina.",
      text: "\"A problem is not the end. I love challenges,\" says Vale.",
      es: "«Un problema no es el final. Amo los retos», dice Vale.",
      speaker: "vale",
      words: [
        { word: "problem", es: "problema" },
        { word: "end", es: "final" },
        { word: "challenges", es: "retos" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Ana felicita al equipo.",
      text: "Ana says: \"Fast decisions with will. That is real leadership.\"",
      es: "Ana dice: «Decisiones rápidas con will. Eso es liderazgo real.»",
      speaker: "ana",
      words: [
        { word: "fast", es: "rápidas" },
        { word: "decisions", es: "decisiones" },
        { word: "leadership", es: "liderazgo" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale promete algo a un joven.",
      text: "Outside, a nervous boy asks: \"Will you help me too?\"",
      es: "Afuera, un chico nervioso pregunta: «¿Tú también me ayudarás?»",
      words: [
        { word: "outside", es: "afuera" },
        { word: "boy", es: "chico" },
        { word: "too", es: "también" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What will Vale do right now?",
      questionEs: "¿Qué hará Vale ahora mismo?",
      options: [
        { label: "She'll call the school", emoji: "☎️" },
        { label: "She'll go home", emoji: "🏠" },
        { label: "She'll cancel the event", emoji: "❌" },
      ],
      answer: 0,
      sayIt: "I'll call the school right now.",
      sayItEs: "Repite: «Llamaré a la escuela ahora mismo.»",
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "Who will send the message?",
      questionEs: "¿Quién enviará el mensaje?",
      options: [
        { label: "Dylan", emoji: "📱" },
        { label: "Mateo", emoji: "🚐" },
        { label: "Ana", emoji: "👩" },
      ],
      answer: 0,
      sayIt: "Dylan will send the message.",
      sayItEs: "Repite: «Dylan enviará el mensaje.»",
    },
    {
      id: "q3",
      afterScene: "s8",
      questionEn: "What does Vale say about problems?",
      questionEs: "¿Qué dice Vale sobre los problemas?",
      options: [
        { label: "A problem is not the end", emoji: "💪" },
        { label: "A problem is the end", emoji: "😢" },
        { label: "Problems are boring", emoji: "😴" },
      ],
      answer: 0,
      sayIt: "A problem is not the end. I love challenges.",
      sayItEs: "Repite: «Un problema no es el final. Amo los retos.»",
    },
  ],
  mindsetCard: {
    afterScene: "s8",
    phrase: "I love challenges.",
    es: "Amo los retos.",
  },
  continuePrompt: {
    en: "There is a problem today. Decide now. What will you do?",
    es: "Hay un problema hoy. Decide ahora. ¿Qué harás?",
  },
  continueWith: [
    "I'll…",
    "I won't…",
    "I'll call…",
    "I'll help…",
  ],
  cliffhanger: {
    en: "Episode 12: A promise — Vale gives her word.",
    es: "Episodio 12: Una promesa — Vale da su palabra.",
  },
};
