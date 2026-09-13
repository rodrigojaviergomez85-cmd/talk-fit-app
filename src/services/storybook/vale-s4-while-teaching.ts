import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s4-ep13/cover.jpg";
import s1 from "@/assets/storybook/vale-s4-ep13/s1.jpg";
import s2 from "@/assets/storybook/vale-s4-ep13/s2.jpg";
import s3 from "@/assets/storybook/vale-s4-ep13/s3.jpg";
import s4 from "@/assets/storybook/vale-s4-ep13/s4.jpg";
import s5 from "@/assets/storybook/vale-s4-ep13/s5.jpg";
import s6 from "@/assets/storybook/vale-s4-ep13/s6.jpg";
import s7 from "@/assets/storybook/vale-s4-ep13/s7.jpg";
import s8 from "@/assets/storybook/vale-s4-ep13/s8.jpg";
import s9 from "@/assets/storybook/vale-s4-ep13/s9.jpg";
import s10 from "@/assets/storybook/vale-s4-ep13/s10.jpg";
import s11 from "@/assets/storybook/vale-s4-ep13/s11.jpg";
import s12 from "@/assets/storybook/vale-s4-ep13/s12.jpg";

/**
 * Season 4 · Episode 13 — "While Vale was teaching".
 * Basic 3 / Past Stories Week 3 Day 13: "while" + two past progressive actions.
 * Dani was practicing English on the bus and someone was listening.
 */
export const VALE_S4_WHILE_TEACHING: StorybookEpisode = {
  id: "vale-s4-while-teaching",
  moduleId: "past-stories",
  week: 3,
  title: "While Vale was teaching",
  titleEs: "Mientras Vale enseñaba",
  episodeLabel: { en: "Season 4 · Episode 13", es: "Temporada 4 · Episodio 13" },
  previously: [
    { en: "The lights went out while Mateo was cooking.", es: "Se fue la luz mientras Mateo cocinaba." },
    { en: "Ana asked him about teaching.", es: "Ana le preguntó sobre enseñar." },
    { en: "Mateo was already dreaming.", es: "Mateo ya estaba soñando." },
  ],
  reviewWords: [
    { word: "was cooking", es: "estaba cocinando" },
    { word: "Suddenly", es: "de repente" },
    { word: "candles", es: "candelas" },
    { word: "was dreaming", es: "estaba soñando" },
  ],
  blurb: {
    en: "Saturday morning. Vale was teaching. And on bus 42, Dani was practicing out loud. Someone was listening.",
    es: "Sábado en la mañana. Vale estaba enseñando. Y en el bus 42, Dani estaba practicando en voz alta. Alguien lo estaba escuchando.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale escribe en la pizarra frente a su clase de sábado.",
      text: "At nine Vale was teaching her Saturday class. Six students were listening.",
      es: "A las nueve Vale estaba enseñando su clase de sábado. Seis estudiantes estaban escuchando.",
      speaker: "vale",
      words: [
        { word: "was teaching", es: "estaba enseñando" },
        { word: "Saturday class", es: "clase de sábado" },
        { word: "were listening", es: "estaban escuchando" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale mira una silla vacía en el salón.",
      text: "But one chair was empty. Dani wasn't there.",
      es: "Pero una silla estaba vacía. Dani no estaba ahí.",
      speaker: "vale",
      words: [
        { word: "chair", es: "silla" },
        { word: "empty", es: "vacía" },
        { word: "wasn't there", es: "no estaba ahí" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Dani va sentado en un bus lleno, con su cuaderno.",
      text: "While Vale was teaching, Dani was traveling on bus 42.",
      es: "Mientras Vale estaba enseñando, Dani estaba viajando en el bus 42.",
      speaker: "dani",
      words: [
        { word: "While", es: "mientras" },
        { word: "was traveling", es: "estaba viajando" },
        { word: "bus", es: "bus" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "El bus está detenido en el tráfico bajo el sol.",
      text: "The bus wasn't moving. The traffic was terrible.",
      es: "El bus no estaba avanzando. El tráfico estaba terrible.",
      words: [
        { word: "wasn't moving", es: "no estaba avanzando" },
        { word: "traffic", es: "tráfico" },
        { word: "terrible", es: "terrible" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Dani repite frases mirando su cuaderno en el bus.",
      text: "Dani wasn't playing games. He was repeating his English sentences.",
      es: "Dani no estaba jugando videojuegos. Estaba repitiendo sus oraciones en inglés.",
      speaker: "dani",
      words: [
        { word: "wasn't playing", es: "no estaba jugando" },
        { word: "was repeating", es: "estaba repitiendo" },
        { word: "sentences", es: "oraciones" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Dani habla bajito con los ojos cerrados.",
      text: '"My name is Dani. I was studying last night," he said quietly.',
      es: "«My name is Dani. I was studying last night», dijo bajito.",
      speaker: "dani",
      words: [
        { word: "quietly", es: "bajito" },
        { word: "last night", es: "anoche" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Una señora mayor en el asiento de al lado lo mira con ternura.",
      text: "An older woman was sitting next to him. She was smiling.",
      es: "Una señora mayor estaba sentada a su lado. Estaba sonriendo.",
      words: [
        { word: "older woman", es: "señora mayor" },
        { word: "was sitting", es: "estaba sentada" },
        { word: "next to him", es: "a su lado" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "La señora le habla a Dani con amabilidad.",
      text: '"Were you speaking English?" she asked. Dani\'s face turned red.',
      es: "«¿Estabas hablando inglés?», preguntó. La cara de Dani se puso roja.",
      words: [
        { word: "Were you speaking", es: "¿estabas hablando?" },
        { word: "face", es: "cara" },
        { word: "turned red", es: "se puso roja" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Dani asiente tímido con su cuaderno en las manos.",
      text: '"Yes, ma\'am. I was practicing. My teacher says mistakes are normal."',
      es: "«Sí, señora. Estaba practicando. Mi maestra dice que los errores son normales».",
      speaker: "dani",
      words: [
        { word: "ma'am", es: "señora" },
        { word: "was practicing", es: "estaba practicando" },
        { word: "teacher", es: "maestra" },
        { word: "normal", es: "normal" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "La señora le muestra una foto de su nieta en el teléfono.",
      text: '"My granddaughter needs a teacher like that," the woman said.',
      es: "«Mi nieta necesita una maestra así», dijo la señora.",
      words: [
        { word: "granddaughter", es: "nieta" },
        { word: "like that", es: "así" },
      ],
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "Dani corre por la calle hacia el centro comunitario.",
      text: "At ten the bus moved. Dani ran two blocks to the class.",
      es: "A las diez el bus avanzó. Dani corrió dos cuadras hasta la clase.",
      speaker: "dani",
      words: [
        { word: "moved", es: "avanzó" },
        { word: "ran", es: "corrió" },
        { word: "blocks", es: "cuadras" },
      ],
    },
    {
      id: "s12",
      image: s12,
      imageAlt: "Dani entra al salón y Vale lo recibe con una sonrisa.",
      text: "He arrived late with a big smile — and with a new student's name.",
      es: "Llegó tarde con una gran sonrisa… y con el nombre de una nueva estudiante.",
      words: [
        { word: "arrived late", es: "llegó tarde" },
        { word: "big smile", es: "gran sonrisa" },
        { word: "new student", es: "nueva estudiante" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What was Dani doing while Vale was teaching?",
      questionEs: "¿Qué estaba haciendo Dani mientras Vale enseñaba?",
      options: [
        { label: "He was traveling on the bus", emoji: "🚌" },
        { label: "He was sleeping at home", emoji: "🛏️" },
        { label: "He was working", emoji: "💼" },
      ],
      answer: 0,
      sayIt: "He was traveling on the bus.",
      sayItEs: "Ejemplo: «He was traveling on the bus.»",
      sayItAskEn: "Where were you going last Saturday morning?",
      sayItAskEs: "¿Adónde ibas el sábado pasado en la mañana?",
      sayItCheck: {
        target: "I was going to *",
        altTargets: ["I was going *", "to *", "I was at home"],
      },
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "Was Dani playing games on the bus?",
      questionEs: "¿Dani estaba jugando videojuegos en el bus?",
      options: [
        { label: "No, he was practicing English", emoji: "🗣️" },
        { label: "Yes, all the time", emoji: "🎮" },
        { label: "No, he was sleeping", emoji: "😴" },
      ],
      answer: 0,
      sayIt: "He was practicing English.",
      sayItEs: "Ejemplo: «He was practicing English.»",
      sayItAskEn: "Were you practicing English yesterday?",
      sayItAskEs: "¿Estabas practicando inglés ayer?",
      sayItCheck: {
        target: "yes I was",
        altTargets: ["no I wasn't", "yes", "no", "I was practicing *"],
      },
    },
    {
      id: "q3",
      afterScene: "s10",
      questionEn: "Who was sitting next to Dani?",
      questionEs: "¿Quién estaba sentada al lado de Dani?",
      options: [
        { label: "An older woman", emoji: "👵" },
        { label: "His teacher Vale", emoji: "🧑‍🏫" },
        { label: "Mateo", emoji: "🧢" },
      ],
      answer: 0,
      sayIt: "An older woman was sitting next to him.",
      sayItEs: "Ejemplo: «An older woman was sitting next to him.»",
      sayItAskEn: "Who was sitting next to you yesterday?",
      sayItAskEs: "¿Quién estaba sentado a tu lado ayer?",
      sayItCheck: {
        target: "my * was sitting next to me",
        altTargets: ["* was sitting next to me", "my *", "nobody"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s9",
    phrase: "Mistakes are part of the process.",
    es: "Los errores son parte del proceso.",
  },
  continuePrompt: {
    en: "Your turn! Where do you practice English? Tell me what you were doing today.",
    es: "¡Tu turno! ¿Dónde practicas inglés? Cuéntame qué estabas haciendo hoy.",
  },
  continueWith: [
    "Today I was…",
    "I practice English when…",
    "Sometimes people…",
    "But I…",
  ],
  cliffhanger: {
    en: "Episode 14: Luis was working when one phone call changed his plan.",
    es: "Episodio 14: Luis estaba trabajando cuando una llamada cambió su plan.",
  },
};
