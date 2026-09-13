import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s4-ep18/cover.jpg";
import s1 from "@/assets/storybook/vale-s4-ep18/s1.jpg";
import s2 from "@/assets/storybook/vale-s4-ep18/s2.jpg";
import s3 from "@/assets/storybook/vale-s4-ep18/s3.jpg";
import s4 from "@/assets/storybook/vale-s4-ep18/s4.jpg";
import s5 from "@/assets/storybook/vale-s4-ep18/s5.jpg";
import s6 from "@/assets/storybook/vale-s4-ep18/s6.jpg";
import s7 from "@/assets/storybook/vale-s4-ep18/s7.jpg";
import s8 from "@/assets/storybook/vale-s4-ep18/s8.jpg";
import s9 from "@/assets/storybook/vale-s4-ep18/s9.jpg";
import s10 from "@/assets/storybook/vale-s4-ep18/s10.jpg";
import s11 from "@/assets/storybook/vale-s4-ep18/s11.jpg";
import s12 from "@/assets/storybook/vale-s4-ep18/s12.jpg";

/**
 * Season 4 · Episode 18 — "Little Red Riding Hood".
 * Basic 3 / Past Stories Week 4 Day 18: end of the classic tale, storytelling connectors.
 * Part 2: the house, the wolf and a very brave girl.
 */
export const VALE_S4_RED_RIDING_HOOD: StorybookEpisode = {
  id: "vale-s4-red-riding-hood",
  moduleId: "past-stories",
  week: 4,
  title: "Little Red Riding Hood",
  titleEs: "Caperucita Roja",
  episodeLabel: { en: "Season 4 · Episode 18", es: "Temporada 4 · Episodio 18" },
  previously: [
    { en: "Little Red was walking to grandma's house.", es: "Little Red iba caminando a la casa de su abuela." },
    { en: "The wolf was watching her.", es: "El lobo la estaba observando." },
    { en: "Somebody knocked on the door.", es: "Alguien tocó la puerta." },
  ],
  reviewWords: [
    { word: "basket", es: "canasta" },
    { word: "was watching", es: "estaba observando" },
    { word: "shorter road", es: "camino más corto" },
    { word: "knocked", es: "tocó la puerta" },
  ],
  blurb: {
    en: "The end of the story. A strange voice, big eyes, and one very brave girl.",
    es: "El final de la historia. Una voz extraña, ojos grandes y una niña muy valiente.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale abre el libro otra vez frente a la clase.",
      text: 'Vale opened the book again. "Where were we? Ah — the door."',
      es: "Vale abrió el libro otra vez. «¿Dónde íbamos? Ah… la puerta».",
      speaker: "vale",
      words: [
        { word: "again", es: "otra vez" },
        { word: "Where were we?", es: "¿dónde íbamos?" },
        { word: "door", es: "puerta" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "La niña con chaqueta roja llega a la casita del bosque.",
      text: "Little Red arrived at the house. The door was open.",
      es: "Little Red llegó a la casa. La puerta estaba abierta.",
      words: [
        { word: "arrived at", es: "llegó a" },
        { word: "house", es: "casa" },
        { word: "was open", es: "estaba abierta" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Interior oscuro, una figura tapada en la cama.",
      text: "Somebody was lying in the bed. The room was very dark.",
      es: "Alguien estaba acostado en la cama. El cuarto estaba muy oscuro.",
      words: [
        { word: "Somebody", es: "alguien" },
        { word: "was lying", es: "estaba acostado" },
        { word: "dark", es: "oscuro" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "La niña mira con dudas hacia la cama.",
      text: '"Grandma, what big eyes you have!" she said slowly.',
      es: "«¡Abuela, qué ojos tan grandes tienes!», dijo despacio.",
      words: [
        { word: "big eyes", es: "ojos grandes" },
        { word: "slowly", es: "despacio" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "El lobo con gorro asoma la cara en la cama.",
      text: '"To see you better," a strange voice answered.',
      es: "«Para verte mejor», contestó una voz extraña.",
      words: [
        { word: "To see you better", es: "para verte mejor" },
        { word: "strange voice", es: "voz extraña" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "La niña retrocede un paso, alerta.",
      text: "Little Red wasn't stupid. She was walking back to the door.",
      es: "Little Red no era tonta. Estaba caminando de regreso a la puerta.",
      words: [
        { word: "wasn't stupid", es: "no era tonta" },
        { word: "walking back", es: "caminando de regreso" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "La niña grita pidiendo ayuda desde la puerta.",
      text: 'Then she shouted: "Help! Help!" Her voice was strong.',
      es: "Luego gritó: «¡Ayuda! ¡Ayuda!» Su voz era fuerte.",
      words: [
        { word: "Help", es: "ayuda" },
        { word: "voice", es: "voz" },
        { word: "strong", es: "fuerte" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Un leñador llega corriendo con un hacha en la mano.",
      text: "A woodcutter was working near the house. He heard her and ran.",
      es: "Un leñador estaba trabajando cerca de la casa. La escuchó y corrió.",
      words: [
        { word: "woodcutter", es: "leñador" },
        { word: "near", es: "cerca" },
        { word: "heard", es: "escuchó" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "El lobo escapa por la ventana hacia el bosque.",
      text: "The wolf jumped through the window and ran into the forest.",
      es: "El lobo saltó por la ventana y corrió hacia el bosque.",
      words: [
        { word: "jumped", es: "saltó" },
        { word: "window", es: "ventana" },
        { word: "ran into", es: "corrió hacia" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "La abuela sale del armario, despeinada pero bien.",
      text: "The grandma was fine. She was hiding in the closet all the time.",
      es: "La abuela estaba bien. Estuvo escondida en el armario todo el tiempo.",
      words: [
        { word: "was fine", es: "estaba bien" },
        { word: "was hiding", es: "estaba escondida" },
        { word: "closet", es: "armario" },
      ],
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "Comen pan juntos en la casita.",
      text: "Finally, they ate the bread together and laughed.",
      es: "Finalmente, comieron el pan juntos y se rieron.",
      words: [
        { word: "together", es: "juntos" },
        { word: "laughed", es: "se rieron" },
      ],
    },
    {
      id: "s12",
      image: s12,
      imageAlt: "Vale cierra el libro y mira a sus estudiantes.",
      text: '"She saved herself with her voice," Vale said. "Like you, in English."',
      es: "«Ella se salvó con su voz», dijo Vale. «Como ustedes, en inglés».",
      speaker: "vale",
      words: [
        { word: "saved herself", es: "se salvó" },
        { word: "with her voice", es: "con su voz" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s5",
      questionEn: "Who was in grandma's bed?",
      questionEs: "¿Quién estaba en la cama de la abuela?",
      options: [
        { label: "The wolf", emoji: "🐺" },
        { label: "The grandma", emoji: "👵" },
        { label: "The woodcutter", emoji: "🪓" },
      ],
      answer: 0,
      sayIt: "The wolf was in the bed.",
      sayItEs: "Ejemplo: «The wolf was in the bed.»",
      sayItAskEn: "Who was at your house last night?",
      sayItAskEs: "¿Quién estaba en tu casa anoche?",
      sayItCheck: {
        target: "my * was at my house",
        altTargets: ["my *", "* was there", "nobody"],
      },
    },
    {
      id: "q2",
      afterScene: "s8",
      questionEn: "What was the woodcutter doing near the house?",
      questionEs: "¿Qué estaba haciendo el leñador cerca de la casa?",
      options: [
        { label: "He was working", emoji: "🪓" },
        { label: "He was sleeping", emoji: "😴" },
        { label: "He was cooking", emoji: "🍲" },
      ],
      answer: 0,
      sayIt: "He was working near the house.",
      sayItEs: "Ejemplo: «He was working near the house.»",
      sayItAskEn: "Why were you happy last weekend?",
      sayItAskEs: "¿Por qué estabas feliz el fin de semana pasado?",
      sayItCheck: {
        target: "because I was *",
        altTargets: ["because *", "I was *"],
      },
    },
    {
      id: "q3",
      afterScene: "s11",
      questionEn: "How did Little Red save herself?",
      questionEs: "¿Cómo se salvó Little Red?",
      options: [
        { label: "She used her voice", emoji: "📢" },
        { label: "She ran to the river", emoji: "🏞️" },
        { label: "She called her mother", emoji: "📞" },
      ],
      answer: 0,
      sayIt: "She saved herself with her voice.",
      sayItEs: "Ejemplo: «She used her voice.»",
      sayItAskEn: "When were you brave in English?",
      sayItAskEs: "¿Cuándo fuiste valiente en inglés?",
      sayItCheck: {
        target: "I was brave when *",
        altTargets: ["when I *", "I was *", "yesterday"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s7",
    phrase: "I am a champion.",
    es: "Soy un campeón.",
  },
  continuePrompt: {
    en: "Your turn! Tell the end of the story with first, then, after that, finally.",
    es: "¡Tu turno! Cuenta el final de la historia con first, then, after that, finally.",
  },
  continueWith: [
    "First, she arrived…",
    "Then, the wolf…",
    "After that, a woodcutter…",
    "Finally, they…",
  ],
  cliffhanger: {
    en: "Episode 19: Now Vale tells the hardest story — her own.",
    es: "Episodio 19: Ahora Vale cuenta la historia más difícil: la suya.",
  },
};
