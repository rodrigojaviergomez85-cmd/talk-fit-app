import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-ep12/cover.jpg";
import s1 from "@/assets/storybook/vale-ep12/s1.jpg";
import s2 from "@/assets/storybook/vale-ep12/s2.jpg";
import s3 from "@/assets/storybook/vale-ep12/s3.jpg";
import s4 from "@/assets/storybook/vale-ep12/s4.jpg";
import s5 from "@/assets/storybook/vale-ep12/s5.jpg";
import s6 from "@/assets/storybook/vale-ep12/s6.jpg";
import s7 from "@/assets/storybook/vale-ep12/s7.jpg";
import s8 from "@/assets/storybook/vale-ep12/s8.jpg";
import s9 from "@/assets/storybook/vale-ep12/s9.jpg";
import s10 from "@/assets/storybook/vale-ep12/s10.jpg";

/**
 * Season 2 · Episode 12 — "A promise".
 * Basic 1 / Simple Future Week 3 Day 2: will for promises.
 */
export const VALE_S2_PROMISE: StorybookEpisode = {
  id: "vale-s2-promise",
  moduleId: "simple-future",
  week: 3,
  title: "A promise",
  titleEs: "Una promesa",
  episodeLabel: { en: "Season 2 · Episode 12", es: "Temporada 2 · Episodio 12" },
  previously: [
    { en: "The team saved the event in one hour.", es: "El equipo salvó el evento en una hora." },
    { en: "Vale decided fast with will.", es: "Vale decidió rápido con will." },
    { en: "A nervous boy asked for help.", es: "Un chico nervioso pidió ayuda." },
  ],
  reviewWords: [
    { word: "decisions", es: "decisiones" },
    { word: "address", es: "dirección" },
    { word: "challenges", es: "retos" },
    { word: "problem", es: "problema" },
  ],
  blurb: {
    en: "Vale promises something big to a scared teenager.",
    es: "Vale promete algo grande a un adolescente asustado.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Un chico nervioso frente a Vale.",
      text: "The boy is seventeen. His name is Beto.",
      es: "El chico tiene diecisiete años. Se llama Beto.",
      words: [
        { word: "seventeen", es: "diecisiete" },
        { word: "name", es: "nombre" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Beto mira el suelo.",
      text: "\"My English is bad. I won't find a job,\" he says.",
      es: "«Mi inglés es malo. No encontraré trabajo», dice él.",
      words: [
        { word: "bad", es: "malo" },
        { word: "job", es: "trabajo" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale se agacha para hablar con él.",
      text: "Vale looks at him. \"I'll help you every week. I promise.\"",
      es: "Vale lo mira. «Te ayudaré cada semana. Lo prometo.»",
      speaker: "vale",
      words: [
        { word: "every", es: "cada" },
        { word: "week", es: "semana" },
        { word: "promise", es: "prometo / promesa" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Beto levanta la mirada.",
      text: "\"Really? Will you practice with me?\" asks Beto.",
      es: "«¿De verdad? ¿Practicarás conmigo?», pregunta Beto.",
      words: [
        { word: "really", es: "de verdad" },
        { word: "practice", es: "practicar" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale sonríe con seguridad.",
      text: "\"Yes, I will. And I won't leave you alone.\"",
      es: "«Sí, lo haré. Y no te dejaré solo.»",
      speaker: "vale",
      words: [
        { word: "leave", es: "dejar" },
        { word: "alone", es: "solo" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale enseña una frase a Beto.",
      text: "She teaches him one phrase: \"English is easy for me.\"",
      es: "Ella le enseña una frase: «El inglés es fácil para mí.»",
      words: [
        { word: "teaches", es: "enseña" },
        { word: "easy", es: "fácil" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Beto repite la frase en voz alta.",
      text: "Beto repeats it loud. His voice is stronger.",
      es: "Beto la repite fuerte. Su voz es más fuerte.",
      words: [
        { word: "repeats", es: "repite" },
        { word: "loud", es: "fuerte" },
        { word: "voice", es: "voz" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Mateo observa orgulloso.",
      text: "Mateo whispers: \"She won't break her promise. Never.\"",
      es: "Mateo susurra: «Ella no romperá su promesa. Nunca.»",
      speaker: "mateo",
      words: [
        { word: "break", es: "romper" },
        { word: "never", es: "nunca" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale escribe la promesa en su cuaderno.",
      text: "Vale writes in her notebook: \"I am amazing when I keep my word.\"",
      es: "Vale escribe en su cuaderno: «Soy increíble cuando cumplo mi palabra.»",
      speaker: "vale",
      words: [
        { word: "keep", es: "cumplir / mantener" },
        { word: "word", es: "palabra" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Cielo gris sobre la escuela.",
      text: "That night, the sky is grey. Kat says: \"It will rain on Saturday.\"",
      es: "Esa noche, el cielo está gris. Kat dice: «Lloverá el sábado.»",
      speaker: "kat",
      words: [
        { word: "sky", es: "cielo" },
        { word: "grey", es: "gris" },
        { word: "rain", es: "llover / lluvia" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What does Vale promise?",
      questionEs: "¿Qué promete Vale?",
      options: [
        { label: "She'll help him every week", emoji: "🤝" },
        { label: "She'll give him money", emoji: "💵" },
        { label: "She'll find his family", emoji: "👨‍👩‍👦" },
      ],
      answer: 0,
      sayIt: "I'll help you every week. I promise.",
      sayItEs: "Repite: «Te ayudaré cada semana. Lo prometo.»",
    },
    {
      id: "q2",
      afterScene: "s5",
      questionEn: "Will she leave him alone?",
      questionEs: "¿Ella lo dejará solo?",
      options: [
        { label: "No, she won't", emoji: "💚" },
        { label: "Yes, she will", emoji: "😞" },
        { label: "Only on Monday", emoji: "📅" },
      ],
      answer: 0,
      sayIt: "I won't leave you alone.",
      sayItEs: "Repite: «No te dejaré solo.»",
    },
    {
      id: "q3",
      afterScene: "s8",
      questionEn: "What phrase does Beto repeat?",
      questionEs: "¿Qué frase repite Beto?",
      options: [
        { label: "English is easy for me", emoji: "🔥" },
        { label: "English is hard", emoji: "😩" },
        { label: "I am tired", emoji: "😴" },
      ],
      answer: 0,
      sayIt: "English is easy for me.",
      sayItEs: "Repite: «El inglés es fácil para mí.»",
    },
  ],
  mindsetCard: {
    afterScene: "s9",
    phrase: "I am amazing.",
    es: "Soy increíble.",
  },
  continuePrompt: {
    en: "Make a promise to yourself for this month. What will you do?",
    es: "Hazte una promesa para este mes. ¿Qué harás?",
  },
  continueWith: [
    "I promise I'll…",
    "I won't…",
    "Every week I'll…",
    "I'll practice…",
  ],
  cliffhanger: {
    en: "Episode 13: A prediction — will it rain on the big day?",
    es: "Episodio 13: Una predicción — ¿lloverá el gran día?",
  },
};
