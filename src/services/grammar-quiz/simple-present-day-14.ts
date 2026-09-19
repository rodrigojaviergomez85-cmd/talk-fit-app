import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 2 · Día 14 — How to make a sandwich: you + verbo · get / add / cut / put.
 * 8 ancla · 4 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Daniel escribió cómo hacer un sándwich. Toca la palabra equivocada.";
const CHISME = "Daniel dijo el paso en desorden. Ordénalo.";

export const SIMPLE_PRESENT_DAY_14: GrammarQuiz = {
  moduleId: "simple-present",
  day: 14,
  title: { en: "How to Make a Sandwich", es: "Cómo hacer un sándwich" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("spg14-1", "First, you ___ two pieces of bread.", "Primero, tomas dos rebanadas de pan.", ["get", "gets", "getting"], 0, {
      en: "you get.",
      es: "Con you, el verbo va solo.",
    }),
    mc("spg14-2", "Then, you ___ cheese.", "Luego, agregas queso.", ["add", "adds", "adding"], 0, {
      en: "you add.",
      es: "Con you no hay -s.",
    }),
    mc("spg14-3", "After that, you put the second piece of bread ___ top.", "Después de eso, pones la segunda rebanada encima.", ["on", "in", "at"], 0, {
      en: "on top.",
      es: "on top: encima.",
    }),
    mc("spg14-4", "Then, you cut the sandwich ___ half.", "Luego, cortas el sándwich por la mitad.", ["in", "on", "at"], 0, {
      en: "cut in half.",
      es: "in half: por la mitad.",
    }),
    mistake("spg14-5", "Next, you adds vegetables.", "adds", "add", {
      en: "you add.",
      es: "Con you no hay -s: add.",
    }, DETECTIVE),
    mistake("spg14-6", "You puts it on a plate.", "puts", "put", {
      en: "you put.",
      es: "Con you no hay -s: put.",
    }, DETECTIVE),
    rearrange(
      "spg14-7",
      ["another ingredient you like", "add", "You"],
      ["You", "add", "another ingredient you like"],
      { en: "You + verb + object.", es: "You + verbo + objeto." },
      CHISME,
    ),
    rearrange(
      "spg14-8",
      ["and enjoy your sandwich", "you eat", "Finally,"],
      ["Finally,", "you eat", "and enjoy your sandwich"],
      { en: "Finally, + you + verb + and + verb.", es: "Finally, + you + verbo + and + verbo." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("spg14-9", "First, my mom ___ two pieces of bread.", "Primero, mi mamá toma dos rebanadas de pan.", ["gets", "get", "getting"], 0, {
      en: "she gets.",
      es: "my mom = she → gets.",
    }),
    mc("spg14-10", "Then, we ___ cheese and tomato.", "Luego, agregamos queso y tomate.", ["add", "adds", "adding"], 0, {
      en: "we add.",
      es: "we → add, sin -s.",
    }),
    mistake("spg14-11", "After that, Daniel cut the sandwich in half.", "cut", "cuts", {
      en: "he cuts.",
      es: "Daniel = he → cuts, con -s.",
    }, DETECTIVE),
    rearrange(
      "spg14-12",
      ["puts it", "on a plate", "My sister"],
      ["My sister", "puts it", "on a plate"],
      { en: "Subject + verb-s + object + place.", es: "Sujeto + verbo con -s + objeto + lugar." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("spg14-13", "First, you open the delivery app. ___, you choose a restaurant.", "Primero, abres la app de delivery. Luego, eliges un restaurante.", ["Then", "Finally", "First"], 0, {
      en: "Then: next step.",
      es: "Then: luego. Repaso del día 13.",
    }),
    mc("spg14-14", "Daniel is 35. ___ a teacher and ___ lunch is always a sandwich.", "Daniel tiene 35. Es maestro y su almuerzo siempre es un sándwich.", ["He's / his", "His / he's", "He's / her"], 0, {
      en: "He's a teacher; his lunch.",
      es: "He's = He is; his antes del sustantivo.",
    }),
    mistake("spg14-15", "Tomorrow I'm going to making a sandwich for lunch.", "making", "make", {
      en: "going to make.",
      es: "going to + verbo solo. Repaso de Basic 1.",
    }, DETECTIVE),
    mistake("spg14-16", "Daniel have bread and cheese at home.", "have", "has", {
      en: "he has.",
      es: "Daniel = he → has.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("spg14-17", "___ bread in the kitchen.", "Hay pan en la cocina.", ["There is", "There are", "It is"], 0, {
      en: "bread (uncountable): there is.",
      es: "there is: bread no se cuenta.",
    }),
    mc("spg14-18", "How ___ pieces of bread do you need? · Two.", "¿Cuántas rebanadas de pan necesitas? · Dos.", ["many", "much", "long"], 0, {
      en: "How many + pieces.",
      es: "How many con cosas que se cuentan.",
    }),
    mistake("spg14-19", "I need buy bread and cheese.", "need", "need to", {
      en: "need to buy.",
      es: "need to + verbo.",
    }, DETECTIVE),
    mistake("spg14-20", "The bread is on the fridge.", "on", "in", {
      en: "in the fridge.",
      es: "in the fridge: dentro del refrigerador.",
    }, DETECTIVE),
  ],
};
