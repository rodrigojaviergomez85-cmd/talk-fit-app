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
 * Episode 4 — "Who is D?" / "¿Quién es D?"
 *
 * Basic Zero Week 1. The mystery message from episode 3 is Dylan, the Canadian
 * client. Reviews name / age / country / city and models "His name is…".
 * Mindset card: "I can do it."
 *
 * Cast: Vale, Mateo, Kat, Dylan, Mr. Reyes (no new characters).
 */
export const VALE_WHO_IS_D: StorybookEpisode = {
  id: "vale-who-is-d",
  moduleId: "basic-zero",
  week: 1,
  title: "Who is D?",
  titleEs: "¿Quién es D?",
  episodeLabel: { en: "Episode 4", es: "Episodio 4" },
  previously: [
    { en: "Vale met Mateo, the new teammate from Guatemala.", es: "Vale conoció a Mateo, el nuevo compañero de Guatemala." },
    { en: "Vale forgot her name, but she tried again.", es: "Vale olvidó su nombre, pero lo intentó otra vez." },
    { en: 'A mystery message arrived: "Tomorrow we talk again. — D."', es: "Llegó un mensaje misterioso: «Mañana hablamos otra vez. — D.»" },
  ],
  reviewWords: [
    { word: "message", es: "mensaje" },
    { word: "phone", es: "teléfono" },
    { word: "tomorrow", es: "mañana" },
    { word: "name", es: "nombre" },
    { word: "from", es: "de (origen)" },
    { word: "live", es: "vivir" },
    { word: "challenges", es: "retos" },
    { word: "mistakes", es: "errores" },
  ],
  blurb: {
    en: "The mystery message has a name. Can Vale find out who D is?",
    es: "El mensaje misterioso tiene un nombre. ¿Podrá Vale descubrir quién es D?",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale mira su teléfono en la mañana, con el mensaje de D.",
      text: "It is morning. Vale looks at her phone again. The message is still there.",
      es: "Es de mañana. Vale mira su teléfono otra vez. El mensaje sigue ahí.",
      words: [
        { word: "morning", es: "mañana (parte del día)" },
        { word: "looks", es: "mira" },
        { word: "still", es: "todavía" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale llega a la oficina con su mochila.",
      text: '"Who is D?" Vale thinks. "I am curious."',
      es: "«¿Quién es D?», piensa Vale. «Tengo curiosidad.»",
      speaker: "vale",
      words: [
        { word: "thinks", es: "piensa" },
        { word: "curious", es: "curiosa / curioso" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale le muestra el mensaje a Mateo en la oficina.",
      text: 'Vale shows the message to Mateo. "Look! Who is D?"',
      es: "Vale le muestra el mensaje a Mateo. «¡Mira! ¿Quién es D?»",
      speaker: "vale",
      words: [
        { word: "shows", es: "muestra" },
        { word: "look", es: "mira" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Mateo se ríe y le dice que no sabe.",
      text: '"I don\'t know," says Mateo. "Ask Kat. Kat knows everyone."',
      es: "«No sé», dice Mateo. «Pregúntale a Kat. Kat conoce a todos.»",
      speaker: "mateo",
      words: [
        { word: "know", es: "saber / conocer" },
        { word: "ask", es: "preguntar" },
        { word: "everyone", es: "todos" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Kat sonríe con una taza de café.",
      text: 'Kat smiles. "D is a client. He is very friendly."',
      es: "Kat sonríe. «D es un cliente. Él es muy amable.»",
      speaker: "kat",
      words: [
        { word: "client", es: "cliente" },
        { word: "friendly", es: "amable / amigable" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Suena el teléfono de Vale en su escritorio.",
      text: "The phone rings. Vale's heart is fast. The call is for her.",
      es: "El teléfono suena. El corazón de Vale va rápido. La llamada es para ella.",
      words: [
        { word: "rings", es: "suena" },
        { word: "heart", es: "corazón" },
        { word: "fast", es: "rápido" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale respira y contesta con su diadema puesta.",
      text: 'Vale breathes. "I can do it," she says. Then she answers the call.',
      es: "Vale respira. «Yo puedo hacerlo», dice. Luego contesta la llamada.",
      speaker: "vale",
      words: [
        { word: "breathes", es: "respira" },
        { word: "answers", es: "contesta" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Dylan habla por videollamada con su sudadera verde.",
      text: '"Hi, Vale! My name is Dylan. I am from Canada. I live in Toronto."',
      es: "«¡Hola, Vale! Me llamo Dylan. Soy de Canadá. Vivo en Toronto.»",
      speaker: "dylan",
      words: [
        { word: "Dylan", es: "Dylan" },
        { word: "Canada", es: "Canadá" },
        { word: "Toronto", es: "Toronto" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale sonríe aliviada: D es Dylan.",
      text: 'Vale laughs. "D is Dylan! His name is Dylan."',
      es: "Vale se ríe. «¡D es Dylan! Su nombre es Dylan.»",
      speaker: "vale",
      words: [
        { word: "laughs", es: "se ríe" },
        { word: "his", es: "su (de él)" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Mr. Reyes anuncia algo al equipo.",
      text: '"Good news, team," says Mr. Reyes. "Tomorrow you meet the whole support team."',
      es: "«Buenas noticias, equipo», dice el señor Reyes. «Mañana conocen a todo el equipo de soporte.»",
      speaker: "boss",
      words: [
        { word: "news", es: "noticias" },
        { word: "team", es: "equipo" },
        { word: "meet", es: "conocer" },
        { word: "whole", es: "todo / entero" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s5",
      questionEn: "Who is D?",
      questionEs: "¿Quién es D?",
      options: [
        { label: "A client", emoji: "🎧" },
        { label: "A teacher", emoji: "📚" },
        { label: "Vale's mom", emoji: "👩" },
      ],
      answer: 0,
      sayIt: "He is a client.",
      sayItEs: "Ahora repite: «Él es un cliente.»",
    },
    {
      id: "q2",
      afterScene: "s8",
      questionEn: "Where is Dylan from?",
      questionEs: "¿De dónde es Dylan?",
      options: [
        { label: "Canada", emoji: "🇨🇦" },
        { label: "Guatemala", emoji: "🇬🇹" },
        { label: "El Salvador", emoji: "🇸🇻" },
      ],
      answer: 0,
      sayIt: "He is from Canada.",
      sayItEs: "Ahora repite: «Él es de Canadá.»",
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "What is his name?",
      questionEs: "¿Cómo se llama él?",
      options: [
        { label: "Dylan", emoji: "🟢" },
        { label: "Mateo", emoji: "👋" },
        { label: "Kat", emoji: "🧡" },
      ],
      answer: 0,
      sayIt: "His name is Dylan.",
      sayItEs: "Ahora repite: «Su nombre es Dylan.»",
    },
  ],
  mindsetCard: {
    afterScene: "s7",
    phrase: "I can do it. English is easy.",
    es: "Yo puedo hacerlo. El inglés es fácil.",
  },
  continuePrompt: {
    en: "Now answer Dylan. Say your name, your age, your country and your city.",
    es: "Ahora contéstale a Dylan. Di tu nombre, tu edad, tu país y tu ciudad.",
  },
  continueWith: [
    "Hi, Dylan!",
    "My name is…",
    "I am … years old",
    "I am from…",
    "I live in…",
    "Nice to meet you.",
  ],
  cliffhanger: {
    en: "To be continued… Episode 5: The support team.",
    es: "Continuará… Episodio 5: El equipo de soporte.",
  },
};
