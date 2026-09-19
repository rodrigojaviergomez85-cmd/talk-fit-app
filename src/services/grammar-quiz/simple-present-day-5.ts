import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 2 · Día 5 — Simple present challenge: I / she · don't / doesn't · do / does.
 * 8 ancla · 4 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Andrés escribió las rutinas de su equipo. Toca la palabra equivocada.";
const CHISME = "Andrés dijo la frase en desorden. Ordénala.";

export const SIMPLE_PRESENT_DAY_5: GrammarQuiz = {
  moduleId: "simple-present",
  day: 5,
  title: { en: "Simple Present Challenge", es: "Reto: presente simple" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("spg5-1", "I usually ___ my day early.", "Normalmente empiezo mi día temprano.", ["start", "starts", "starting"], 0, {
      en: "I start.",
      es: "Con I, sin -s.",
    }),
    mc("spg5-2", "My manager ___ from home twice a week.", "Mi jefa trabaja desde casa dos veces por semana.", ["works", "work", "working"], 0, {
      en: "she works.",
      es: "my manager = she → works.",
    }),
    mc("spg5-3", "My brother ___ work on Saturdays.", "Mi hermano no trabaja los sábados.", ["doesn't", "don't", "isn't"], 0, {
      en: "he doesn't.",
      es: "my brother = he → doesn't.",
    }),
    mc("spg5-4", "___ your manager start before the team? · Yes, she does.", "¿Tu jefa empieza antes que el equipo? · Sí.", ["Does", "Do", "Is"], 0, {
      en: "Does + she.",
      es: "Does con he/she.",
    }),
    mistake("spg5-5", "We doesn't have the same schedule every day.", "doesn't", "don't", {
      en: "we don't.",
      es: "we → don't.",
    }, DETECTIVE),
    mistake("spg5-6", "She usually start before the rest of the team.", "start", "starts", {
      en: "she starts.",
      es: "she → starts, con -s.",
    }, DETECTIVE),
    rearrange(
      "spg5-7",
      ["because it keeps me busy", "my routine", "I like"],
      ["I like", "my routine", "because it keeps me busy"],
      { en: "I like + object + because + reason.", es: "I like + objeto + because + razón." },
      CHISME,
    ),
    rearrange(
      "spg5-8",
      ["are different", "our routines", "Overall,"],
      ["Overall,", "our routines", "are different"],
      { en: "Overall, + subject + are + adjective.", es: "Overall, + sujeto + are + adjetivo." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("spg5-9", "___ you have the same schedule every day? · No, I don't.", "¿Tienes el mismo horario todos los días? · No.", ["Do", "Does", "Are"], 0, {
      en: "Do + you.",
      es: "Do con you.",
    }),
    mc("spg5-10", "My coworkers ___ work on Saturdays.", "Mis compañeros no trabajan los sábados.", ["don't", "doesn't", "aren't"], 0, {
      en: "they don't.",
      es: "my coworkers = they → don't.",
    }),
    mistake("spg5-11", "Does Andres works from home?", "works", "work", {
      en: "Does + base verb.",
      es: "Con Does, sin -s: work.",
    }, DETECTIVE),
    rearrange(
      "spg5-12",
      ["doesn't start", "My manager", "late"],
      ["My manager", "doesn't start", "late"],
      { en: "Subject + doesn't + verb + adverb.", es: "Sujeto + doesn't + verbo + adverbio." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("spg5-13", "Where ___ your brother work? · At a bank.", "¿Dónde trabaja tu hermano? · En un banco.", ["does", "do", "is"], 0, {
      en: "Where does he.",
      es: "Where + does + he. Repaso del día 4.",
    }),
    mc("spg5-14", "Next week, my manager ___ going to travel to Mexico.", "La próxima semana mi jefa va a viajar a México.", ["is", "are", "will"], 0, {
      en: "she is going to.",
      es: "my manager → is going to. Repaso de Basic 1.",
    }),
    mistake("spg5-15", "Andres have 30 years old.", "have", "is", {
      en: "He is 30.",
      es: "Andres is 30 years old.",
    }, DETECTIVE),
    mistake("spg5-16", "These is my coworkers Tomas and Ana.", "is", "are", {
      en: "These are.",
      es: "These are: plural.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("spg5-17", "___ five people on my team.", "Hay cinco personas en mi equipo.", ["There are", "There is", "They are"], 0, {
      en: "five people: there are.",
      es: "there are: hay, plural.",
    }),
    mc("spg5-18", "How ___ days a week does she work from home? · Two.", "¿Cuántos días a la semana trabaja desde casa? · Dos.", ["many", "much", "long"], 0, {
      en: "How many + days.",
      es: "How many con cosas que se cuentan.",
    }),
    mistake("spg5-19", "My brother needs work on Saturdays this month.", "needs", "needs to", {
      en: "needs to work.",
      es: "needs to + verbo.",
    }, DETECTIVE),
    mistake("spg5-20", "My manager works from home in Mondays.", "in", "on", {
      en: "on Mondays.",
      es: "on con los días.",
    }, DETECTIVE),
  ],
};
