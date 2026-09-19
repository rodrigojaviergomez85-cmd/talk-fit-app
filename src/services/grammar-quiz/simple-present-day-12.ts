import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 2 · Día 12 — How to make a pizza: you + verbo · secuencia · put / add.
 * 8 ancla · 4 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Carlos escribió su receta de pizza. Toca la palabra equivocada.";
const CHISME = "Carlos dijo el paso en desorden. Ordénalo.";

export const SIMPLE_PRESENT_DAY_12: GrammarQuiz = {
  moduleId: "simple-present",
  day: 12,
  title: { en: "How to Make a Pizza", es: "Cómo hacer una pizza" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("spg12-1", "First, you ___ the pizza dough.", "Primero, preparas la masa de la pizza.", ["prepare", "prepares", "preparing"], 0, {
      en: "you prepare.",
      es: "Con you, el verbo va solo.",
    }),
    mc("spg12-2", "Then, you put the dough ___ a tray.", "Luego, pones la masa en una bandeja.", ["on", "in", "at"], 0, {
      en: "on a tray: on top.",
      es: "on a tray: encima de la bandeja.",
    }),
    mc("spg12-3", "___, you add tomato sauce.", "Después, agregas salsa de tomate.", ["Next", "Nextly", "The next"], 0, {
      en: "Next: following step.",
      es: "Next: después, el siguiente paso.",
    }),
    mc("spg12-4", "Then, you put the pizza ___ the oven.", "Luego, metes la pizza al horno.", ["in", "on", "at"], 0, {
      en: "in the oven: inside.",
      es: "in the oven: dentro del horno.",
    }),
    mistake("spg12-5", "You puts cheese on the pizza.", "puts", "put", {
      en: "you put.",
      es: "Con you no hay -s: put.",
    }, DETECTIVE),
    mistake("spg12-6", "After that, you adds your favorite toppings.", "adds", "add", {
      en: "you add.",
      es: "Con you no hay -s: add.",
    }, DETECTIVE),
    rearrange(
      "spg12-7",
      ["until the pizza is ready", "wait", "You"],
      ["You", "wait", "until the pizza is ready"],
      { en: "You + verb + until + clause.", es: "You + verbo + until + hasta que…" },
      CHISME,
    ),
    rearrange(
      "spg12-8",
      ["and enjoy it", "you cut the pizza", "Finally,"],
      ["Finally,", "you cut the pizza", "and enjoy it"],
      { en: "Finally, + you + verb + and + verb.", es: "Finally, + you + verbo + and + verbo." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("spg12-9", "First, my dad ___ the dough.", "Primero, mi papá prepara la masa.", ["prepares", "prepare", "preparing"], 0, {
      en: "he prepares.",
      es: "my dad = he → prepares.",
    }),
    mc("spg12-10", "Then, we ___ cheese and tomato sauce.", "Luego, agregamos queso y salsa de tomate.", ["add", "adds", "adding"], 0, {
      en: "we add.",
      es: "we → add, sin -s.",
    }),
    mistake("spg12-11", "After that, Carlos put the pizza in the oven.", "put", "puts", {
      en: "he puts.",
      es: "Carlos = he → puts, con -s.",
    }, DETECTIVE),
    rearrange(
      "spg12-12",
      ["my sister cuts", "the pizza", "Finally,"],
      ["Finally,", "my sister cuts", "the pizza"],
      { en: "Finally, + subject + verb-s + object.", es: "Finally, + sujeto + verbo con -s + objeto." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("spg12-13", "First, you open the App Store. ___, you search for the app.", "Primero, abres la App Store. Luego, buscas la app.", ["Then", "Finally", "After"], 0, {
      en: "Then: next step.",
      es: "Then: luego. Repaso del día 11.",
    }),
    mc("spg12-14", "Carlos is ___ cook. ___ pizza is delicious.", "Carlos es cocinero. Su pizza es deliciosa.", ["a / His", "an / His", "a / Her"], 0, {
      en: "a cook; his pizza.",
      es: "a cook: consonante; Carlos → his.",
    }),
    mistake("spg12-15", "Tonight we is going to make a pizza.", "is", "are", {
      en: "we are.",
      es: "we → are going to. Repaso de Basic 1.",
    }, DETECTIVE),
    mistake("spg12-16", "My favorite food are pizza.", "are", "is", {
      en: "food → is.",
      es: "Una comida → is.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("spg12-17", "___ cheese in the fridge.", "Hay queso en el refrigerador.", ["There is", "There are", "It is"], 0, {
      en: "cheese (uncountable): there is.",
      es: "there is: cheese no se cuenta.",
    }),
    mc("spg12-18", "How ___ cheese do you need? · A lot.", "¿Cuánto queso necesitas? · Mucho.", ["much", "many", "long"], 0, {
      en: "How much + cheese.",
      es: "How much: cheese no se cuenta.",
    }),
    mistake("spg12-19", "I want make a pizza tonight.", "want", "want to", {
      en: "want to make.",
      es: "want to + verbo.",
    }, DETECTIVE),
    mistake("spg12-20", "The oven is close of the window.", "of", "to", {
      en: "close to the window.",
      es: "close to: cerca de.",
    }, DETECTIVE),
  ],
};
