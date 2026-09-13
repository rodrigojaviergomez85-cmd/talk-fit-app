import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s4-ep15/cover.jpg";
import s1 from "@/assets/storybook/vale-s4-ep15/s1.jpg";
import s2 from "@/assets/storybook/vale-s4-ep15/s2.jpg";
import s3 from "@/assets/storybook/vale-s4-ep15/s3.jpg";
import s4 from "@/assets/storybook/vale-s4-ep15/s4.jpg";
import s5 from "@/assets/storybook/vale-s4-ep15/s5.jpg";
import s6 from "@/assets/storybook/vale-s4-ep15/s6.jpg";
import s7 from "@/assets/storybook/vale-s4-ep15/s7.jpg";
import s8 from "@/assets/storybook/vale-s4-ep15/s8.jpg";
import s9 from "@/assets/storybook/vale-s4-ep15/s9.jpg";
import s10 from "@/assets/storybook/vale-s4-ep15/s10.jpg";
import s11 from "@/assets/storybook/vale-s4-ep15/s11.jpg";
import s12 from "@/assets/storybook/vale-s4-ep15/s12.jpg";

/**
 * Season 4 · Episode 15 — "Past progressive challenge".
 * Basic 3 / Past Stories Week 3 Day 15: review of was/were + -ing with everyone.
 * The Saturday class plays a memory game about last Tuesday at eight.
 */
export const VALE_S4_PROGRESSIVE_CHALLENGE: StorybookEpisode = {
  id: "vale-s4-progressive-challenge",
  moduleId: "past-stories",
  week: 3,
  title: "The past progressive challenge",
  titleEs: "El reto del pasado progresivo",
  episodeLabel: { en: "Season 4 · Episode 15", es: "Temporada 4 · Episodio 15" },
  previously: [
    { en: "The company closed one floor.", es: "La empresa cerró un piso." },
    { en: "Vale offered her free Saturday class.", es: "Vale ofreció su clase gratis del sábado." },
    { en: "She was counting chairs all night.", es: "Estuvo contando sillas toda la noche." },
  ],
  reviewWords: [
    { word: "was preparing", es: "estaba preparando" },
    { word: "were losing", es: "estaban perdiendo" },
    { word: "opens doors", es: "abre puertas" },
    { word: "chairs", es: "sillas" },
  ],
  blurb: {
    en: "Saturday. Fourteen students, one game: what were you doing last Tuesday at eight? Nobody expects Dani's answer.",
    es: "Sábado. Catorce estudiantes, un juego: ¿qué estabas haciendo el martes a las ocho? Nadie espera la respuesta de Dani.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "El salón lleno de estudiantes el sábado por la mañana.",
      text: "Saturday. The room was full. Fourteen students were waiting for Vale.",
      es: "Sábado. El salón estaba lleno. Catorce estudiantes estaban esperando a Vale.",
      words: [
        { word: "full", es: "lleno" },
        { word: "were waiting", es: "estaban esperando" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale escribe la pregunta del juego en la pizarra.",
      text: '"Today we play," Vale said. "The question is: what were you doing?"',
      es: "«Hoy jugamos», dijo Vale. «La pregunta es: what were you doing?»",
      speaker: "vale",
      words: [
        { word: "we play", es: "jugamos" },
        { word: "question", es: "pregunta" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Kat levanta la mano sonriendo.",
      text: 'Kat started: "Last Tuesday at eight I was washing my dog."',
      es: "Kat empezó: «El martes pasado a las ocho estaba bañando a mi perro».",
      speaker: "kat",
      words: [
        { word: "Last Tuesday", es: "el martes pasado" },
        { word: "was washing", es: "estaba bañando" },
        { word: "dog", es: "perro" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Mateo habla y hace gestos, divertido.",
      text: 'Mateo laughed: "I was eating pupusas. I wasn\'t studying, sorry teacher."',
      es: "Mateo se rio: «Estaba comiendo pupusas. No estaba estudiando, perdón maestra».",
      speaker: "mateo",
      words: [
        { word: "was eating", es: "estaba comiendo" },
        { word: "wasn't studying", es: "no estaba estudiando" },
        { word: "sorry", es: "perdón" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Luis habla con calma frente al grupo.",
      text: 'Luis said: "I was helping my mother. She wasn\'t feeling well."',
      es: "Luis dijo: «Estaba ayudando a mi mamá. Ella no se estaba sintiendo bien».",
      speaker: "luis",
      words: [
        { word: "was helping", es: "estaba ayudando" },
        { word: "wasn't feeling well", es: "no se sentía bien" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Dos estudiantes nuevos escuchan con atención.",
      text: "Two new students were listening. They were the friends from the call center.",
      es: "Dos estudiantes nuevos estaban escuchando. Eran los amigos del call center.",
      words: [
        { word: "new students", es: "estudiantes nuevos" },
        { word: "call center", es: "call center" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Una estudiante nueva habla con nervios.",
      text: '"I was looking for a job," one of them said. "I was scared."',
      es: "«Estaba buscando trabajo», dijo una de ellos. «Tenía miedo».",
      words: [
        { word: "was looking for", es: "estaba buscando" },
        { word: "job", es: "trabajo" },
        { word: "scared", es: "con miedo" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale responde con calidez a la estudiante.",
      text: '"And now you are here," Vale said. "That is the answer."',
      es: "«Y ahora estás aquí», dijo Vale. «Esa es la respuesta».",
      speaker: "vale",
      words: [
        { word: "now", es: "ahora" },
        { word: "answer", es: "respuesta" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Dani se pone de pie con su cuaderno.",
      text: "Then Dani stood up. Last month he wasn't speaking in class.",
      es: "Luego Dani se puso de pie. El mes pasado no estaba hablando en clase.",
      speaker: "dani",
      words: [
        { word: "stood up", es: "se puso de pie" },
        { word: "Last month", es: "el mes pasado" },
        { word: "wasn't speaking", es: "no estaba hablando" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Dani habla frente a la clase con seguridad.",
      text: '"On Tuesday I was teaching my little sister. I was the teacher!"',
      es: "«El martes estaba enseñándole a mi hermanita. ¡Yo era el maestro!»",
      speaker: "dani",
      words: [
        { word: "little sister", es: "hermanita" },
        { word: "I was the teacher", es: "yo era el maestro" },
      ],
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "La clase aplaude a Dani.",
      text: "The class clapped. Vale wasn't crying. Okay — she was, a little.",
      es: "La clase aplaudió. Vale no estaba llorando. Bueno… sí, un poquito.",
      words: [
        { word: "clapped", es: "aplaudió" },
        { word: "wasn't crying", es: "no estaba llorando" },
      ],
    },
    {
      id: "s12",
      image: s12,
      imageAlt: "Vale ve el salón lleno desde la puerta.",
      text: "Fourteen chairs weren't enough. Next Saturday she needed twenty.",
      es: "Catorce sillas no eran suficientes. El próximo sábado necesitaba veinte.",
      words: [
        { word: "weren't enough", es: "no eran suficientes" },
        { word: "next Saturday", es: "el próximo sábado" },
        { word: "twenty", es: "veinte" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What was Mateo doing on Tuesday at eight?",
      questionEs: "¿Qué estaba haciendo Mateo el martes a las ocho?",
      options: [
        { label: "He was eating pupusas", emoji: "🫓" },
        { label: "He was studying", emoji: "📚" },
        { label: "He was washing a dog", emoji: "🐶" },
      ],
      answer: 0,
      sayIt: "He was eating pupusas.",
      sayItEs: "Ejemplo: «He was eating pupusas.»",
      sayItAskEn: "What were you eating last Tuesday night?",
      sayItAskEs: "¿Qué estabas comiendo el martes pasado en la noche?",
      sayItCheck: {
        target: "I was eating *",
        altTargets: ["I wasn't eating", "I was *"],
      },
    },
    {
      id: "q2",
      afterScene: "s8",
      questionEn: "What was the new student doing last week?",
      questionEs: "¿Qué estaba haciendo la estudiante nueva la semana pasada?",
      options: [
        { label: "She was looking for a job", emoji: "🔎" },
        { label: "She was traveling", emoji: "✈️" },
        { label: "She was teaching", emoji: "🧑‍🏫" },
      ],
      answer: 0,
      sayIt: "She was looking for a job.",
      sayItEs: "Ejemplo: «She was looking for a job.»",
      sayItAskEn: "What were you looking for last month?",
      sayItAskEs: "¿Qué estabas buscando el mes pasado?",
      sayItCheck: {
        target: "I was looking for *",
        altTargets: ["I was looking *", "a *"],
      },
    },
    {
      id: "q3",
      afterScene: "s11",
      questionEn: "Why did the class clap for Dani?",
      questionEs: "¿Por qué la clase aplaudió a Dani?",
      options: [
        { label: "He was teaching his little sister", emoji: "👧" },
        { label: "He was sleeping in class", emoji: "😴" },
        { label: "He was cooking", emoji: "🍳" },
      ],
      answer: 0,
      sayIt: "He was teaching his little sister.",
      sayItEs: "Ejemplo: «He was teaching his little sister.»",
      sayItAskEn: "Who were you helping last week?",
      sayItAskEs: "¿A quién estabas ayudando la semana pasada?",
      sayItCheck: {
        target: "I was helping my *",
        altTargets: ["I was helping *", "my *", "nobody"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s10",
    phrase: "I am amazing.",
    es: "Soy increíble.",
  },
  continuePrompt: {
    en: "Your turn! Play the game: what were you doing last Tuesday at eight?",
    es: "¡Tu turno! Juega el juego: ¿qué estabas haciendo el martes pasado a las ocho?",
  },
  continueWith: [
    "Last Tuesday at eight I was…",
    "My family was…",
    "I wasn't…",
    "Now I am…",
  ],
  cliffhanger: {
    en: "Episode 16: Once upon a time… Vale opens a very old book.",
    es: "Episodio 16: Érase una vez… Vale abre un libro muy viejo.",
  },
};
