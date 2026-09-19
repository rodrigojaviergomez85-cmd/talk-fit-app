import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 2 · Día 3 — Negatives: I don't · we don't · she doesn't + verbo solo.
 * 8 ancla · 4 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Daniel escribió lo que no hace. Toca la palabra equivocada.";
const CHISME = "Daniel dijo la frase en desorden. Ordénala.";

export const SIMPLE_PRESENT_DAY_3: GrammarQuiz = {
  moduleId: "simple-present",
  day: 3,
  title: { en: "Don't and Doesn't", es: "Don't y doesn't" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("spg3-1", "I ___ start work late.", "No empiezo a trabajar tarde.", ["don't", "doesn't", "not"], 0, {
      en: "I don't.",
      es: "I → don't.",
    }),
    mc("spg3-2", "My sister ___ work on Fridays.", "Mi hermana no trabaja los viernes.", ["doesn't", "don't", "isn't"], 0, {
      en: "she doesn't.",
      es: "my sister = she → doesn't.",
    }),
    mc("spg3-3", "We don't ___ at our desks.", "No comemos en nuestros escritorios.", ["eat", "eats", "eating"], 0, {
      en: "don't + base verb.",
      es: "Después de don't, verbo solo: eat.",
    }),
    mc("spg3-4", "She doesn't ___ late every day.", "No trabaja tarde todos los días.", ["work", "works", "working"], 0, {
      en: "doesn't + base verb.",
      es: "Después de doesn't, el verbo va sin -s: work.",
    }),
    mistake("spg3-5", "My sister don't work on Fridays.", "don't", "doesn't", {
      en: "she doesn't.",
      es: "my sister = she → doesn't.",
    }, DETECTIVE),
    mistake("spg3-6", "She doesn't works on Fridays.", "works", "work", {
      en: "doesn't work.",
      es: "Después de doesn't, sin -s: work.",
    }, DETECTIVE),
    rearrange(
      "spg3-7",
      ["at our desks", "eat", "We don't"],
      ["We don't", "eat", "at our desks"],
      { en: "We don't + verb + place.", es: "We don't + verbo + lugar." },
      CHISME,
    ),
    rearrange(
      "spg3-8",
      ["the same schedule", "have", "We don't"],
      ["We don't", "have", "the same schedule"],
      { en: "Subject + don't + verb + object.", es: "Sujeto + don't + verbo + objeto." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("spg3-9", "My brother ___ eat breakfast at home.", "Mi hermano no desayuna en casa.", ["doesn't", "don't", "isn't"], 0, {
      en: "he doesn't.",
      es: "my brother = he → doesn't.",
    }),
    mc("spg3-10", "My coworkers ___ work on weekends.", "Mis compañeros no trabajan los fines de semana.", ["don't", "doesn't", "aren't"], 0, {
      en: "they don't.",
      es: "my coworkers = they → don't.",
    }),
    mistake("spg3-11", "Daniel doesn't likes to work late.", "likes", "like", {
      en: "doesn't like.",
      es: "Después de doesn't, sin -s: like.",
    }, DETECTIVE),
    rearrange(
      "spg3-12",
      ["on Saturdays", "doesn't work", "Sofia"],
      ["Sofia", "doesn't work", "on Saturdays"],
      { en: "Name + doesn't + verb + day.", es: "Nombre + doesn't + verbo + día." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("spg3-13", "My sister ___ from home. She ___ her job.", "Mi hermana trabaja desde casa. Le gusta su trabajo.", ["works / likes", "work / like", "works / like"], 0, {
      en: "she works, she likes.",
      es: "she → -s en los dos. Repaso del día 2.",
    }),
    mc("spg3-14", "I ___ going to work on Friday. I'm going to rest.", "No voy a trabajar el viernes. Voy a descansar.", ["am not", "don't", "not"], 0, {
      en: "I am not going to.",
      es: "Con going to, el negativo es am not. Repaso de Basic 1.",
    }),
    mistake("spg3-15", "Daniel have 35 years old.", "have", "is", {
      en: "He is 35.",
      es: "Daniel is 35 years old.",
    }, DETECTIVE),
    mistake("spg3-16", "This is my sister. His name is Ana.", "His", "Her", {
      en: "sister → her.",
      es: "sister → Her name.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("spg3-17", "___ any meetings on Fridays.", "No hay reuniones los viernes.", ["There aren't", "There isn't", "They aren't"], 0, {
      en: "meetings (plural): there aren't.",
      es: "there aren't: no hay, plural.",
    }),
    mc("spg3-18", "How ___ coffee do you drink at work? · Not much.", "¿Cuánto café tomas en el trabajo? · No mucho.", ["much", "many", "long"], 0, {
      en: "How much + coffee.",
      es: "How much: coffee no se cuenta.",
    }),
    mistake("spg3-19", "I don't want work on Fridays.", "want", "want to", {
      en: "want to work.",
      es: "want to + verbo.",
    }, DETECTIVE),
    mistake("spg3-20", "We don't eat lunch in our desks.", "in", "at", {
      en: "at our desks.",
      es: "at our desks: en el escritorio.",
    }, DETECTIVE),
  ],
};
