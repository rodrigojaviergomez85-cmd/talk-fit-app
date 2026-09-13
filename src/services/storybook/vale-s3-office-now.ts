import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s3-ep18/cover.jpg";
import s1 from "@/assets/storybook/vale-s3-ep18/s1.jpg";
import s2 from "@/assets/storybook/vale-s3-ep18/s2.jpg";
import s3 from "@/assets/storybook/vale-s3-ep18/s3.jpg";
import s4 from "@/assets/storybook/vale-s3-ep18/s4.jpg";
import s5 from "@/assets/storybook/vale-s3-ep18/s5.jpg";
import s6 from "@/assets/storybook/vale-s3-ep18/s6.jpg";
import s7 from "@/assets/storybook/vale-s3-ep18/s7.jpg";
import s8 from "@/assets/storybook/vale-s3-ep18/s8.jpg";
import s9 from "@/assets/storybook/vale-s3-ep18/s9.jpg";
import s10 from "@/assets/storybook/vale-s3-ep18/s10.jpg";

/**
 * Season 3 · Episode 18 — "Right now at the office".
 * Basic 2 / Simple Present Week 4 Day 18: present progressive at work.
 */
export const VALE_S3_OFFICE_NOW: StorybookEpisode = {
  id: "vale-s3-office-now",
  moduleId: "simple-present",
  week: 4,
  title: "Right now at the office",
  titleEs: "Ahora mismo en la oficina",
  episodeLabel: { en: "Season 3 · Episode 18", es: "Temporada 3 · Episodio 18" },
  previously: [
    { en: "Vale swam in the ocean for the first time.", es: "Vale nadó en el mar por primera vez." },
    { en: "Mr. Reyes announced a very difficult customer.", es: "Mr. Reyes anunció un cliente muy difícil." },
  ],
  reviewWords: [
    { word: "swimming", es: "nadando" },
    { word: "customer", es: "cliente" },
    { word: "difficult", es: "difícil" },
  ],
  blurb: {
    en: "Monday, 9 a.m. Everybody is working and one call changes the day.",
    es: "Lunes, 9 a.m. Todos están trabajando y una llamada cambia el día.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "La oficina del call center llena de actividad.",
      text: "Monday, nine o'clock. The office is full. Everybody is working.",
      es: "Lunes, nueve en punto. La oficina está llena. Todos están trabajando.",
      speaker: "narrator",
      words: [
        { word: "Monday", es: "lunes" },
        { word: "office", es: "oficina" },
        { word: "working", es: "trabajando" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Kat habla por teléfono y escribe.",
      text: "Kat is talking on the phone. She is typing at the same time.",
      es: "Kat está hablando por teléfono. Está escribiendo al mismo tiempo.",
      speaker: "narrator",
      words: [
        { word: "talking", es: "hablando" },
        { word: "typing", es: "escribiendo" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Mateo prepara café en la cocina de la oficina.",
      text: "Mateo is making coffee. Ana is printing a report.",
      es: "Mateo está haciendo café. Ana está imprimiendo un reporte.",
      speaker: "narrator",
      words: [
        { word: "making", es: "haciendo" },
        { word: "printing", es: "imprimiendo" },
        { word: "report", es: "reporte" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "La pantalla de Vale muestra una llamada entrante.",
      text: "The screen says: \"Priority call.\" Vale is breathing slowly.",
      es: "La pantalla dice: «Llamada prioritaria.» Vale está respirando despacio.",
      speaker: "narrator",
      words: [
        { word: "screen", es: "pantalla" },
        { word: "call", es: "llamada" },
        { word: "slowly", es: "despacio" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale contesta la llamada con la diadema.",
      text: "Vale answers: \"Good morning, my name is Vale. How can I help you?\"",
      es: "Vale contesta: «Buenos días, me llamo Vale. ¿En qué le puedo ayudar?»",
      speaker: "vale",
      words: [
        { word: "morning", es: "mañana" },
        { word: "help", es: "ayudar" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Un cliente enojado habla por teléfono.",
      text: "The customer is angry. \"Nobody is helping me today!\" he says.",
      es: "El cliente está enojado. «¡Nadie me está ayudando hoy!», dice.",
      speaker: "narrator",
      words: [
        { word: "angry", es: "enojado" },
        { word: "Nobody", es: "nadie" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale escucha con calma y toma notas.",
      text: "Vale listens. \"I am checking your order right now, sir.\"",
      es: "Vale escucha. «Estoy revisando su orden ahora mismo, señor.»",
      speaker: "vale",
      words: [
        { word: "listens", es: "escucha" },
        { word: "checking", es: "revisando" },
        { word: "order", es: "orden" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale sonríe: encontró la solución en la computadora.",
      text: "She finds the problem. \"Your package is arriving tomorrow.\"",
      es: "Encuentra el problema. «Su paquete está llegando mañana.»",
      speaker: "vale",
      words: [
        { word: "finds", es: "encuentra" },
        { word: "package", es: "paquete" },
        { word: "arriving", es: "llegando" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Mr. Reyes felicita a Vale frente al equipo.",
      text: "Mr. Reyes says: \"You are staying calm. That is a leader.\"",
      es: "Mr. Reyes dice: «Te mantienes tranquila. Eso es una líder.»",
      speaker: "boss",
      words: [
        { word: "staying", es: "manteniéndote" },
        { word: "calm", es: "tranquila" },
        { word: "leader", es: "líder" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale escribe en su cuaderno de noche en casa.",
      text: "That night Vale writes: \"I am studying every day. I am becoming a teacher.\"",
      es: "Esa noche Vale escribe: «Estoy estudiando todos los días. Me estoy convirtiendo en maestra.»",
      speaker: "vale",
      words: [
        { word: "studying", es: "estudiando" },
        { word: "becoming", es: "convirtiéndome" },
        { word: "teacher", es: "maestra" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What is Kat doing?",
      questionEs: "¿Qué está haciendo Kat?",
      options: [
        { label: "She is talking on the phone", emoji: "📞" },
        { label: "She is making coffee", emoji: "☕" },
        { label: "She is printing a report", emoji: "🖨️" },
      ],
      answer: 0,
      sayIt: "She is talking on the phone.",
      sayItEs: "Repite: «She is talking on the phone.»",
      sayItCheck: { target: "She is talking on the phone" },
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "When do you start your day?",
      questionEs: "¿A qué hora empiezas tu día?",
      options: [
        { label: "I start at six", emoji: "🕕" },
        { label: "I start at eight", emoji: "🕗" },
        { label: "I start at ten", emoji: "🕙" },
      ],
      answer: 0,
      sayIt: "I start my day at six.",
      sayItEs: "Ejemplo: «I start my day at six.»",
      sayItAskEn: "When do you start your day?",
      sayItAskEs: "¿A qué hora empiezas tu día?",
      sayItCheck: {
        target: "I start my day at *",
        altTargets: ["I start at *"],
      },
    },
    {
      id: "q3",
      afterScene: "s10",
      questionEn: "How do you stay calm in a difficult moment?",
      questionEs: "¿Cómo te mantienes tranquilo en un momento difícil?",
      options: [
        { label: "I breathe slowly", emoji: "😮‍💨" },
        { label: "I ask for help", emoji: "🙋" },
        { label: "I listen first", emoji: "👂" },
      ],
      answer: 0,
      sayIt: "I stay calm because I breathe slowly.",
      sayItEs: "Ejemplo: «I stay calm because I breathe slowly.»",
      sayItAskEn: "How do you stay calm in a difficult moment?",
      sayItAskEs: "¿Cómo te mantienes tranquilo en un momento difícil?",
      sayItCheck: {
        target: "I stay calm because *",
        altTargets: ["I breathe *", "I *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s7",
    phrase: "I am a champion.",
    es: "Soy un campeón.",
  },
  continuePrompt: {
    en: "Describe your workplace or your classroom. What is everybody doing right now?",
    es: "Describe tu trabajo o tu salón. ¿Qué está haciendo todo el mundo ahora mismo?",
  },
  continueWith: ["He is…", "She is…", "They are…", "I am…"],
  cliffhanger: {
    en: "Episode 19: At home. Vale's family has a surprise for her.",
    es: "Episodio 19: En casa. La familia de Vale tiene una sorpresa para ella.",
  },
};
