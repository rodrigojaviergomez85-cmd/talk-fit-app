import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 2 · Día 4 — Questions: Do you…? Does she…? · Where / What time · short answers.
 * 8 ancla · 4 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Valeria escribió sus preguntas y respuestas. Toca la palabra equivocada.";
const CHISME = "Valeria dijo la frase en desorden. Ordénala.";

export const SIMPLE_PRESENT_DAY_4: GrammarQuiz = {
  moduleId: "simple-present",
  day: 4,
  title: { en: "Do and Does", es: "Do y does" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("spg4-1", "___ you work on Saturdays? · No, I don't.", "¿Trabajas los sábados? · No.", ["Do", "Does", "Are"], 0, {
      en: "Do + you.",
      es: "Do con you: ¿trabajas?",
    }),
    mc("spg4-2", "___ your sister work from home? · Yes, she does.", "¿Tu hermana trabaja desde casa? · Sí.", ["Does", "Do", "Is"], 0, {
      en: "Does + she.",
      es: "Does con he/she: your sister.",
    }),
    mc("spg4-3", "Where ___ you work? · At a call center.", "¿Dónde trabajas? · En un call center.", ["do", "does", "are"], 0, {
      en: "Where do you.",
      es: "Where + do + you.",
    }),
    mc("spg4-4", "Do you like your job? · Yes, ___.", "¿Te gusta tu trabajo? · Sí.", ["I do", "I like", "I am"], 0, {
      en: "Yes, I do.",
      es: "Respuesta corta: Yes, I do.",
    }),
    mistake("spg4-5", "Does your sister works from home?", "works", "work", {
      en: "Does + base verb.",
      es: "Con Does, el verbo va sin -s: work.",
    }, DETECTIVE),
    mistake("spg4-6", "Do your sister work from home?", "Do", "Does", {
      en: "Does + she.",
      es: "your sister = she → Does.",
    }, DETECTIVE),
    rearrange(
      "spg4-7",
      ["you start?", "What time", "do"],
      ["What time", "do", "you start?"],
      { en: "Wh + do + you + verb.", es: "Pregunta + do + you + verbo." },
      CHISME,
    ),
    rearrange(
      "spg4-8",
      ["from home", "three days a week", "She works"],
      ["She works", "from home", "three days a week"],
      { en: "She works + where + how often.", es: "She works + dónde + cada cuánto." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("spg4-9", "___ your parents live in the city? · Yes, they do.", "¿Tus papás viven en la ciudad? · Sí.", ["Do", "Does", "Are"], 0, {
      en: "Do + they.",
      es: "Do con they: your parents.",
    }),
    mc("spg4-10", "Does Valeria like her job? · Yes, ___.", "¿A Valeria le gusta su trabajo? · Sí.", ["she does", "she do", "she likes"], 0, {
      en: "Yes, she does.",
      es: "Respuesta corta: Yes, she does.",
    }),
    mistake("spg4-11", "Does your brother works on Saturdays?", "works", "work", {
      en: "Does + base verb.",
      es: "Con Does, sin -s: work.",
    }, DETECTIVE),
    rearrange(
      "spg4-12",
      ["your brother", "Where", "does", "work?"],
      ["Where", "does", "your brother", "work?"],
      { en: "Where + does + subject + verb.", es: "Where + does + sujeto + verbo." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("spg4-13", "I ___ work on Saturdays. My sister ___ work on Fridays.", "No trabajo los sábados. Mi hermana no trabaja los viernes.", ["don't / doesn't", "doesn't / don't", "don't / don't"], 0, {
      en: "I don't; she doesn't.",
      es: "I → don't; she → doesn't. Repaso del día 3.",
    }),
    mc("spg4-14", "Valeria is 26. ___ works at a bank and ___ job is good.", "Valeria tiene 26. Trabaja en un banco y su trabajo es bueno.", ["She / her", "Her / she", "She / his"], 0, {
      en: "She works; her job.",
      es: "she antes del verbo, her antes del sustantivo.",
    }),
    mistake("spg4-15", "Next week I going to start a new job.", "going", "am going", {
      en: "I am going to.",
      es: "Falta el am. Repaso de Basic 1.",
    }, DETECTIVE),
    mistake("spg4-16", "Valeria have two brothers.", "have", "has", {
      en: "she has.",
      es: "Valeria = she → has.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("spg4-17", "___ a break at ten? · Yes, there is.", "¿Hay un descanso a las diez? · Sí.", ["Is there", "There is", "Are there"], 0, {
      en: "Is there…? question.",
      es: "Pregunta: Is there a break?",
    }),
    mc("spg4-18", "What time is it? · It's ___.", "¿Qué hora es? · Son las ocho y media.", ["eight thirty", "eight and half", "half eight"], 0, {
      en: "eight thirty.",
      es: "eight thirty: las ocho y media.",
    }),
    mistake("spg4-19", "Do you want work from home?", "want", "want to", {
      en: "want to work.",
      es: "want to + verbo.",
    }, DETECTIVE),
    mistake("spg4-20", "Where do you work? · At a bank close of my house.", "of", "to", {
      en: "close to my house.",
      es: "close to: cerca de.",
    }, DETECTIVE),
  ],
};
