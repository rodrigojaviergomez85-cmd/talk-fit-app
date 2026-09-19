import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 2 · Día 13 — How to order food: you + verbo · choose / select / confirm.
 * 8 ancla · 4 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Sofía escribió cómo pedir comida por la app. Toca la palabra equivocada.";
const CHISME = "Sofía dijo el paso en desorden. Ordénalo.";

export const SIMPLE_PRESENT_DAY_13: GrammarQuiz = {
  moduleId: "simple-present",
  day: 13,
  title: { en: "How to Order Food", es: "Cómo pedir comida" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("spg13-1", "First, you ___ the delivery app.", "Primero, abres la app de delivery.", ["open", "opens", "opening"], 0, {
      en: "you open.",
      es: "Con you, el verbo va solo.",
    }),
    mc("spg13-2", "Then, you ___ a restaurant.", "Luego, eliges un restaurante.", ["choose", "chooses", "choosing"], 0, {
      en: "you choose.",
      es: "Con you no hay -s.",
    }),
    mc("spg13-3", "Next, you look ___ the menu.", "Después, miras el menú.", ["at", "to", "in"], 0, {
      en: "look at.",
      es: "look at: mirar algo.",
    }),
    mc("spg13-4", "___, the delivery arrives and you receive your order.", "Finalmente, llega el delivery y recibes tu pedido.", ["Finally", "Final", "At last of"], 0, {
      en: "Finally: last step.",
      es: "Finally: por último.",
    }),
    mistake("spg13-5", "You selects the food you want.", "selects", "select", {
      en: "you select.",
      es: "Con you no hay -s: select.",
    }, DETECTIVE),
    mistake("spg13-6", "Then, you checks your address and payment method.", "checks", "check", {
      en: "you check.",
      es: "Con you no hay -s: check.",
    }, DETECTIVE),
    rearrange(
      "spg13-7",
      ["to your order", "you add the food", "After that,"],
      ["After that,", "you add the food", "to your order"],
      { en: "After that, + you + verb + object + to.", es: "After that, + you + verbo + objeto + a dónde." },
      CHISME,
    ),
    rearrange(
      "spg13-8",
      ["and wait for your food", "confirm the order", "You"],
      ["You", "confirm the order", "and wait for your food"],
      { en: "You + verb + object + and + verb.", es: "You + verbo + objeto + and + verbo." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("spg13-9", "First, my brother ___ the delivery app.", "Primero, mi hermano abre la app de delivery.", ["opens", "open", "opening"], 0, {
      en: "he opens.",
      es: "my brother = he → opens.",
    }),
    mc("spg13-10", "Then, I ___ a restaurant and look at the menu.", "Luego, elijo un restaurante y miro el menú.", ["choose", "chooses", "choosing"], 0, {
      en: "I choose: no -s.",
      es: "Con I, sin -s.",
    }),
    mistake("spg13-11", "After that, Sofia confirm the order.", "confirm", "confirms", {
      en: "she confirms.",
      es: "Sofia = she → confirms, con -s.",
    }, DETECTIVE),
    rearrange(
      "spg13-12",
      ["our food", "we receive", "Finally,"],
      ["Finally,", "we receive", "our food"],
      { en: "Finally, + we + verb + object.", es: "Finally, + we + verbo + objeto." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("spg13-13", "First, you prepare the dough. Then, you ___ the dough on a tray.", "Primero, preparas la masa. Luego, pones la masa en una bandeja.", ["put", "puts", "putting"], 0, {
      en: "you put.",
      es: "Con you, verbo solo. Repaso del día 12.",
    }),
    mc("spg13-14", "Sofia ___ 28 years old. ___ favorite food is sushi.", "Sofía tiene 28 años. Su comida favorita es el sushi.", ["is / Her", "has / Her", "is / His"], 0, {
      en: "is 28; her favorite.",
      es: "Edad con be; Sofia → her.",
    }),
    mistake("spg13-15", "Tonight we're going to ordering food.", "ordering", "order", {
      en: "going to order.",
      es: "going to + verbo solo. Repaso de Basic 1.",
    }, DETECTIVE),
    mistake("spg13-16", "Sofia have a delivery app on her phone.", "have", "has", {
      en: "she has.",
      es: "Sofia = she → has.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("spg13-17", "___ many restaurants in the app.", "Hay muchos restaurantes en la app.", ["There are", "There is", "They are"], 0, {
      en: "many restaurants: there are.",
      es: "there are: hay, plural.",
    }),
    mc("spg13-18", "How ___ does the delivery cost? · Three dollars.", "¿Cuánto cuesta el delivery? · Tres dólares.", ["much", "many", "long"], 0, {
      en: "How much + cost.",
      es: "How much: precio.",
    }),
    mistake("spg13-19", "I want order a pizza tonight.", "want", "want to", {
      en: "want to order.",
      es: "want to + verbo.",
    }, DETECTIVE),
    mistake("spg13-20", "The restaurant is in the corner of my street.", "in", "on", {
      en: "on the corner.",
      es: "on the corner: en la esquina.",
    }, DETECTIVE),
  ],
};
