import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s3-ep3/cover.jpg";
import s1 from "@/assets/storybook/vale-s3-ep3/s1.jpg";
import s2 from "@/assets/storybook/vale-s3-ep3/s2.jpg";
import s3 from "@/assets/storybook/vale-s3-ep3/s3.jpg";
import s4 from "@/assets/storybook/vale-s3-ep3/s4.jpg";
import s5 from "@/assets/storybook/vale-s3-ep3/s5.jpg";
import s6 from "@/assets/storybook/vale-s3-ep3/s6.jpg";
import s7 from "@/assets/storybook/vale-s3-ep3/s7.jpg";
import s8 from "@/assets/storybook/vale-s3-ep3/s8.jpg";
import s9 from "@/assets/storybook/vale-s3-ep3/s9.jpg";
import s10 from "@/assets/storybook/vale-s3-ep3/s10.jpg";

/**
 * Season 3 · Episode 3 — "Team rules".
 * Matches Basic 2 / Simple Present Week 1 Day 3: negatives (don't / doesn't).
 */
export const VALE_S3_TEAM_RULES: StorybookEpisode = {
  id: "vale-s3-team-rules",
  moduleId: "simple-present",
  week: 1,
  title: "Team rules",
  titleEs: "Reglas del equipo",
  episodeLabel: { en: "Season 3 · Episode 3", es: "Temporada 3 · Episodio 3" },
  previously: [
    { en: "Kat arrives early and checks the call queue.", es: "Kat llega temprano y revisa la cola de llamadas." },
    { en: "She helps new agents and does not eat at her desk.", es: "Ella ayuda a los nuevos agentes y no come en su escritorio." },
  ],
  reviewWords: [
    { word: "arrives", es: "llega" },
    { word: "checks", es: "revisa" },
    { word: "helps", es: "ayuda" },
    { word: "leaves", es: "sale" },
  ],
  blurb: {
    en: "Luis is late. The team explains the office rules to him.",
    es: "Luis llega tarde. El equipo le explica las reglas de la oficina.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Luis llega tarde y se disculpa.",
      text: "Luis arrives late. His team is waiting.",
      es: "Luis llega tarde. Su equipo lo está esperando.",
      words: [
        { word: "late", es: "tarde" },
        { word: "team", es: "equipo" },
        { word: "waiting", es: "esperando" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Ana le muestra las reglas en un pizarrón.",
      text: "Ana says: \"We don't eat at our desks.\"",
      es: "Ana dice: «No comemos en nuestros escritorios.»",
      speaker: "ana",
      words: [
        { word: "rules", es: "reglas" },
        { word: "don't", es: "no" },
        { word: "desks", es: "escritorios" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Luis asiente mientras Ana habla.",
      text: "\"We don't use phones during calls,\" says Kat.",
      es: "«No usamos teléfonos durante las llamadas», dice Kat.",
      speaker: "kat",
      words: [
        { word: "use", es: "usar" },
        { word: "phones", es: "teléfonos" },
        { word: "during", es: "durante" },
        { word: "calls", es: "llamadas" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Mr. Reyes explica que él no acepta llegar tarde.",
      text: "Mr. Reyes adds: \"I don't accept late arrivals.\"",
      es: "Mr. Reyes agrega: «No acepto llegadas tarde.»",
      speaker: "boss",
      words: [
        { word: "adds", es: "agrega" },
        { word: "accept", es: "acepto" },
        { word: "arrivals", es: "llegadas" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Luis mira su teléfono con culpa.",
      text: "Luis looks at his phone. \"I don't check it at work,\" he says.",
      es: "Luis mira su teléfono. «No lo reviso en el trabajo», dice.",
      speaker: "luis",
      words: [
        { word: "looks at", es: "mira" },
        { word: "phone", es: "teléfono" },
        { word: "check", es: "revisar" },
        { word: "work", es: "trabajo" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale sonríe y levanta su mano para hablar.",
      text: "Vale says: \"We don't give up when things are hard.\"",
      es: "Vale dice: «No nos rendimos cuando las cosas están difíciles.»",
      speaker: "vale",
      words: [
        { word: "give up", es: "rendirse" },
        { word: "things", es: "cosas" },
        { word: "hard", es: "difíciles" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "El equipo se da la mano y sonríe.",
      text: "The team agrees: \"We don't leave anyone behind.\"",
      es: "El equipo acuerda: «No dejamos a nadie atrás.»",
      words: [
        { word: "agrees", es: "acuerda" },
        { word: "leave behind", es: "dejar atrás" },
        { word: "anyone", es: "nadie" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Luis practica su respuesta en voz alta.",
      text: "Luis practices out loud: \"I am persistent.\"",
      es: "Luis practica en voz alta: «Soy persistente.»",
      speaker: "luis",
      words: [
        { word: "practices", es: "practica" },
        { word: "out loud", es: "en voz alta" },
        { word: "persistent", es: "persistente" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale y Luis caminan juntos por el pasillo.",
      text: "Vale walks with him. \"Mistakes are part of the process,\" she says.",
      es: "Vale camina con él. «Los errores son parte del proceso», dice.",
      speaker: "vale",
      words: [
        { word: "walks", es: "camina" },
        { word: "mistakes", es: "errores" },
        { word: "process", es: "proceso" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Un cliente enojado aparece en la puerta.",
      text: "But a customer at the door looks very upset.",
      es: "Pero un cliente en la puerta se ve muy molesto.",
      words: [
        { word: "customer", es: "cliente" },
        { word: "door", es: "puerta" },
        { word: "upset", es: "molesto / enojado" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What don't they do during calls?",
      questionEs: "¿Qué no hacen durante las llamadas?",
      options: [
        { label: "Use phones", emoji: "📵" },
        { label: "Drink water", emoji: "💧" },
        { label: "Take notes", emoji: "📝" },
      ],
      answer: 0,
      sayIt: "We don't use phones during calls.",
      sayItEs: "Repite: «We don't use phones during calls.»",
      sayItCheck: { target: "We don't use phones during calls" },
    },
    {
      id: "q2",
      afterScene: "s4",
      questionEn: "Does Mr. Reyes accept late arrivals?",
      questionEs: "¿Mr. Reyes acepta llegadas tarde?",
      options: [
        { label: "No, he doesn't", emoji: "❌" },
        { label: "Yes, he does", emoji: "✅" },
        { label: "Sometimes", emoji: "🤷" },
      ],
      answer: 0,
      sayIt: "No, he doesn't.",
      sayItEs: "Ejemplo: «No, he doesn't.»",
      sayItAskEn: "What don't you do at work or school?",
      sayItAskEs: "¿Qué no haces tú en el trabajo o la escuela?",
      sayItCheck: {
        target: "I don't *",
      },
    },
    {
      id: "q3",
      afterScene: "s6",
      questionEn: "What don't Vale and her team do when things are hard?",
      questionEs: "¿Qué no hacen Vale y su equipo cuando las cosas están difíciles?",
      options: [
        { label: "Give up", emoji: "💪" },
        { label: "Work together", emoji: "🤝" },
        { label: "Ask questions", emoji: "❓" },
      ],
      answer: 0,
      sayIt: "We don't give up.",
      sayItEs: "Ejemplo: «We don't give up.»",
      sayItAskEn: "What don't you do when English feels difficult?",
      sayItAskEs: "¿Qué no haces tú cuando el inglés se siente difícil?",
      sayItCheck: {
        target: "I don't give up",
        altTargets: ["I don't *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s8",
    phrase: "I am persistent.",
    es: "Yo soy persistente.",
  },
  continuePrompt: {
    en: "Now name two things you don't do at work or school, and one thing you don't do when learning gets hard.",
    es: "Ahora di dos cosas que no haces en el trabajo o la escuela, y una que no haces cuando el aprendizaje se pone difícil.",
  },
  continueWith: [
    "I don't eat at my desk.",
    "I don't use my phone during class/work.",
    "I don't give up when it's hard.",
    "I am persistent.",
  ],
  cliffhanger: {
    en: "Episode 4: The angry customer — what does he want?",
    es: "Episodio 4: El cliente enojado — ¿qué quiere él?",
  },
};
