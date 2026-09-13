import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s4-ep20/cover.jpg";
import s1 from "@/assets/storybook/vale-s4-ep20/s1.jpg";
import s2 from "@/assets/storybook/vale-s4-ep20/s2.jpg";
import s3 from "@/assets/storybook/vale-s4-ep20/s3.jpg";
import s4 from "@/assets/storybook/vale-s4-ep20/s4.jpg";
import s5 from "@/assets/storybook/vale-s4-ep20/s5.jpg";
import s6 from "@/assets/storybook/vale-s4-ep20/s6.jpg";
import s7 from "@/assets/storybook/vale-s4-ep20/s7.jpg";
import s8 from "@/assets/storybook/vale-s4-ep20/s8.jpg";
import s9 from "@/assets/storybook/vale-s4-ep20/s9.jpg";
import s10 from "@/assets/storybook/vale-s4-ep20/s10.jpg";
import s11 from "@/assets/storybook/vale-s4-ep20/s11.jpg";
import s12 from "@/assets/storybook/vale-s4-ep20/s12.jpg";

/**
 * Season 4 · Episode 20 — "The storyteller" (season finale).
 * Basic 3 / Past Stories Week 4 Day 20: full narrative review + hook to Season 5.
 * Dani tells his own story and Vale decides to open her school.
 */
export const VALE_S4_STORYTELLER: StorybookEpisode = {
  id: "vale-s4-storyteller",
  moduleId: "past-stories",
  week: 4,
  title: "The storyteller",
  titleEs: "La narradora",
  episodeLabel: { en: "Season 4 · Episode 20", es: "Temporada 4 · Episodio 20" },
  previously: [
    { en: "Vale told her real story.", es: "Vale contó su historia real." },
    { en: "Dani listened with wet eyes.", es: "Dani escuchó con los ojos húmedos." },
    { en: "Vale stopped in front of an empty place.", es: "Vale se detuvo frente a un local vacío." },
  ],
  reviewWords: [
    { word: "constant", es: "constante" },
    { word: "interview", es: "entrevista" },
    { word: "was imagining", es: "estaba imaginando" },
    { word: "empty place", es: "local vacío" },
  ],
  blurb: {
    en: "Last class of the month. Dani tells his story in front of everybody. And Vale says three words that change everything.",
    es: "Última clase del mes. Dani cuenta su historia frente a todos. Y Vale dice tres palabras que cambian todo.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "El salón lleno de estudiantes el último sábado del mes.",
      text: "Last Saturday of the month. Twenty students were sitting in the room.",
      es: "Último sábado del mes. Veinte estudiantes estaban sentados en el salón.",
      words: [
        { word: "Last Saturday", es: "último sábado" },
        { word: "were sitting", es: "estaban sentados" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale invita a alguien a pasar al frente.",
      text: '"Today you are the storytellers," Vale said. "Who wants to start?"',
      es: "«Hoy ustedes son los narradores», dijo Vale. «¿Quién quiere empezar?»",
      speaker: "vale",
      words: [
        { word: "Who wants to start?", es: "¿quién quiere empezar?" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Dani levanta la mano con decisión.",
      text: "Dani raised his hand first. Four months ago he wasn't speaking at all.",
      es: "Dani levantó la mano primero. Hace cuatro meses no hablaba nada.",
      speaker: "dani",
      words: [
        { word: "raised his hand", es: "levantó la mano" },
        { word: "months ago", es: "meses atrás" },
        { word: "at all", es: "nada / para nada" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Dani de pie frente a la clase.",
      text: '"First," Dani said, "I was the quiet boy. I didn\'t like my voice."',
      es: "«Primero», dijo Dani, «yo era el muchacho callado. No me gustaba mi voz».",
      speaker: "dani",
      words: [
        { word: "quiet boy", es: "muchacho callado" },
        { word: "didn't like", es: "no me gustaba" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Dani señala la puerta del salón mientras cuenta.",
      text: '"Then, my mother brought me here. I didn\'t want to come."',
      es: "«Luego, mi mamá me trajo aquí. Yo no quería venir».",
      speaker: "dani",
      words: [
        { word: "brought me", es: "me trajo" },
        { word: "didn't want", es: "no quería" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Dani sonríe mientras recuerda algo.",
      text: '"After that, the teacher asked my name. I answered. Just my name."',
      es: "«Después de eso, la maestra preguntó mi nombre. Contesté. Solo mi nombre».",
      speaker: "dani",
      words: [
        { word: "asked my name", es: "preguntó mi nombre" },
        { word: "answered", es: "contesté" },
        { word: "Just", es: "solo" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Dani abre los brazos hablando con confianza.",
      text: '"Finally, today I am talking in front of twenty people. In English."',
      es: "«Finalmente, hoy estoy hablando frente a veinte personas. En inglés».",
      speaker: "dani",
      words: [
        { word: "in front of", es: "frente a" },
        { word: "twenty people", es: "veinte personas" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Toda la clase de pie aplaudiendo.",
      text: "Everybody stood up. The applause lasted one minute.",
      es: "Todos se pusieron de pie. El aplauso duró un minuto.",
      words: [
        { word: "stood up", es: "se pusieron de pie" },
        { word: "applause", es: "aplauso" },
        { word: "lasted", es: "duró" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Kat, Mateo y Luis abrazan a Vale.",
      text: "Kat, Mateo and Luis were waiting at the door with a small gift.",
      es: "Kat, Mateo y Luis estaban esperando en la puerta con un regalo pequeño.",
      speaker: "kat",
      words: [
        { word: "were waiting", es: "estaban esperando" },
        { word: "gift", es: "regalo" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale abre una caja con una llave adentro.",
      text: "Inside the box there was a key. The key of the empty place.",
      es: "Dentro de la caja había una llave. La llave del local vacío.",
      words: [
        { word: "Inside", es: "dentro" },
        { word: "box", es: "caja" },
        { word: "key", es: "llave" },
      ],
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "Vale mira la llave con los ojos llenos de lágrimas y sonríe.",
      text: '"We rented it for one month," Luis said. "Now it\'s your school."',
      es: "«Lo alquilamos por un mes», dijo Luis. «Ahora es tu escuela».",
      speaker: "luis",
      words: [
        { word: "rented", es: "alquilamos" },
        { word: "your school", es: "tu escuela" },
      ],
    },
    {
      id: "s12",
      image: s12,
      imageAlt: "Vale abre la puerta del local vacío con la llave en la mano.",
      text: 'Vale opened the door and said three words: "I can do it."',
      es: "Vale abrió la puerta y dijo tres palabras: «I can do it».",
      speaker: "vale",
      words: [
        { word: "opened the door", es: "abrió la puerta" },
        { word: "three words", es: "tres palabras" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "How was Dani four months ago?",
      questionEs: "¿Cómo era Dani hace cuatro meses?",
      options: [
        { label: "He was the quiet boy", emoji: "🤐" },
        { label: "He was the teacher", emoji: "🧑‍🏫" },
        { label: "He was living abroad", emoji: "✈️" },
      ],
      answer: 0,
      sayIt: "He was the quiet boy.",
      sayItEs: "Ejemplo: «He was the quiet boy.»",
      sayItAskEn: "How were you before you started English?",
      sayItAskEs: "¿Cómo eras antes de empezar inglés?",
      sayItCheck: {
        target: "I was *",
        altTargets: ["before I was *", "I wasn't *"],
      },
    },
    {
      id: "q2",
      afterScene: "s8",
      questionEn: "What did Dani do finally?",
      questionEs: "¿Qué hizo Dani finalmente?",
      options: [
        { label: "He spoke in front of twenty people", emoji: "🎤" },
        { label: "He left the class", emoji: "🚪" },
        { label: "He wrote a letter", emoji: "✉️" },
      ],
      answer: 0,
      sayIt: "He spoke in front of twenty people.",
      sayItEs: "Ejemplo: «He spoke in front of twenty people.»",
      sayItAskEn: "What did you finally do this month in English?",
      sayItAskEs: "¿Qué lograste hacer finalmente este mes en inglés?",
      sayItCheck: {
        target: "finally I *",
        altTargets: ["I *", "I spoke *", "I learned *"],
      },
    },
    {
      id: "q3",
      afterScene: "s11",
      questionEn: "What was inside the box?",
      questionEs: "¿Qué había dentro de la caja?",
      options: [
        { label: "A key", emoji: "🔑" },
        { label: "A cake", emoji: "🎂" },
        { label: "A book", emoji: "📕" },
      ],
      answer: 0,
      sayIt: "There was a key inside the box.",
      sayItEs: "Ejemplo: «There was a key.»",
      sayItAskEn: "Where were you one year ago?",
      sayItAskEs: "¿Dónde estabas hace un año?",
      sayItCheck: {
        target: "I was in *",
        altTargets: ["I was at *", "in *", "I was *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s7",
    phrase: "I can do it.",
    es: "Yo puedo hacerlo.",
  },
  continuePrompt: {
    en: "Your turn! Tell your month: first, then, after that, finally. What changed?",
    es: "¡Tu turno! Cuenta tu mes: first, then, after that, finally. ¿Qué cambió?",
  },
  continueWith: [
    "First, I was…",
    "Then, I practiced…",
    "After that, I…",
    "Finally, now I…",
  ],
  cliffhanger: {
    en: "Season 5: Vale opens her own school. New students, new problems, new dreams.",
    es: "Temporada 5: Vale abre su propia escuela. Nuevos estudiantes, nuevos problemas, nuevos sueños.",
  },
};
