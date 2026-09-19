import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 2 · Día 1 — My work routine: I + verbo · usually / sometimes · every day.
 * 8 ancla · 4 transferencia · 4 repaso (Zero + Basic 1) · 4 básicos.
 */
const DETECTIVE = "Carlos escribió su rutina de trabajo. Toca la palabra equivocada.";
const CHISME = "Carlos dijo la frase en desorden. Ordénala.";

export const SIMPLE_PRESENT_DAY_1: GrammarQuiz = {
  moduleId: "simple-present",
  day: 1,
  title: { en: "My Work Routine", es: "Mi rutina de trabajo" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("spg1-1", "I usually ___ up around six thirty.", "Normalmente me despierto a eso de las seis y media.", ["wake", "wakes", "waking"], 0, {
      en: "I wake up: base verb.",
      es: "Con I, el verbo va solo: wake.",
    }),
    mc("spg1-2", "I ___ breakfast at home before I start work.", "Desayuno en casa antes de empezar a trabajar.", ["have", "has", "having"], 0, {
      en: "I have breakfast.",
      es: "I have breakfast: desayuno.",
    }),
    mc("spg1-3", "I start work ___ eight.", "Empiezo a trabajar a las ocho.", ["at", "in", "on"], 0, {
      en: "at + time.",
      es: "at con la hora.",
    }),
    mc("spg1-4", "I talk to customers ___ day.", "Hablo con clientes todos los días.", ["every", "all", "each of"], 0, {
      en: "every day.",
      es: "every day: todos los días.",
    }),
    mistake("spg1-5", "My coworkers and I usually has lunch together.", "has", "have", {
      en: "we have.",
      es: "My coworkers and I = we → have.",
    }, DETECTIVE),
    mistake("spg1-6", "I likes my job because I learn something new every week.", "likes", "like", {
      en: "I like.",
      es: "Con I no hay -s: I like.",
    }, DETECTIVE),
    rearrange(
      "spg1-7",
      ["very busy mornings", "sometimes have", "We"],
      ["We", "sometimes have", "very busy mornings"],
      { en: "Subject + sometimes + verb + object.", es: "Sujeto + sometimes + verbo + objeto." },
      CHISME,
    ),
    rearrange(
      "spg1-8",
      ["my routine", "I really enjoy", "Overall,"],
      ["Overall,", "I really enjoy", "my routine"],
      { en: "Overall, + I + verb + object.", es: "Overall, + I + verbo + objeto." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("spg1-9", "My coworkers ___ work at eight too.", "Mis compañeros también empiezan a trabajar a las ocho.", ["start", "starts", "starting"], 0, {
      en: "they start.",
      es: "my coworkers = they → start, sin -s.",
    }),
    mc("spg1-10", "We ___ lunch together at twelve.", "Almorzamos juntos a las doce.", ["have", "has", "having"], 0, {
      en: "we have lunch.",
      es: "we → have, sin -s.",
    }),
    mistake("spg1-11", "My friends and I talks to customers every day.", "talks", "talk", {
      en: "we talk.",
      es: "My friends and I = we → talk, sin -s.",
    }, DETECTIVE),
    rearrange(
      "spg1-12",
      ["at six thirty", "wake up", "We usually"],
      ["We usually", "wake up", "at six thirty"],
      { en: "We usually + verb + time.", es: "We usually + verbo + hora." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("spg1-13", "Tomorrow, I'm going to ___ up at six.", "Mañana me voy a despertar a las seis.", ["wake", "wakes", "waking"], 0, {
      en: "going to wake up.",
      es: "going to + verbo solo. Repaso de Basic 1.",
    }),
    mc("spg1-14", "My name is Carlos. I ___ 22 years old and I ___ at a call center.", "Me llamo Carlos. Tengo 22 años y trabajo en un call center.", ["am / work", "have / work", "am / works"], 0, {
      en: "I am 22, I work.",
      es: "Edad con am; work sin -s.",
    }),
    mistake("spg1-15", "The phone is ringing. I'll answering it.", "answering", "answer", {
      en: "I'll answer.",
      es: "will + verbo solo. Repaso de Basic 1.",
    }, DETECTIVE),
    mistake("spg1-16", "I have 22 years old.", "have", "am", {
      en: "I am 22.",
      es: "I am 22 years old.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("spg1-17", "___ many customers in the morning.", "Hay muchos clientes en la mañana.", ["There are", "There is", "They are"], 0, {
      en: "many customers: there are.",
      es: "there are: hay, plural.",
    }),
    mc("spg1-18", "What time do you start work? · ___ eight.", "¿A qué hora empiezas a trabajar? · A las ocho.", ["At", "In", "On"], 0, {
      en: "at eight.",
      es: "at con la hora.",
    }),
    mistake("spg1-19", "I need talk to customers in English.", "need", "need to", {
      en: "need to talk.",
      es: "need to + verbo.",
    }, DETECTIVE),
    mistake("spg1-20", "I have breakfast in home every day.", "in", "at", {
      en: "at home.",
      es: "at home: en casa.",
    }, DETECTIVE),
  ],
};
