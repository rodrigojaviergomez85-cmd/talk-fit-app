import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC ZERO · Día 7 — When is your birthday? · months · ordinal numbers · favorite fruit.
 * (Semana 2, día 2: ORDINAL NUMBERS / BIRTHDAY / FAVORITE FRUIT)
 * 10 ítems: ancla + transferencia + trampas. Aprueba con 7 de 10.
 */
const DETECTIVE = "Andrés escribió su cumpleaños. Toca la palabra equivocada.";
const CHISME = "Andrés dijo la frase en desorden. Ordénala.";

export const BASIC_ZERO_DAY_7: GrammarQuiz = {
  moduleId: "basic-zero",
  day: 7,
  title: { en: "When Is Your Birthday?", es: "¿Cuándo es tu cumpleaños?" },
  passScore: 7,
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("bzg7-1", "When ___ your birthday?", "¿Cuándo es tu cumpleaños?", ["is", "are", "am"], 0, {
      en: "When is your birthday?",
      es: "your birthday = it → is.",
    }),
    mc("bzg7-2", "My birthday is ___ March.", "Mi cumpleaños es en marzo.", ["in", "on", "at"], 0, {
      en: "in + month.",
      es: "in con los meses: in March.",
    }),
    mc("bzg7-3", "My birthday is ___ March 25th.", "Mi cumpleaños es el 25 de marzo.", ["on", "in", "at"], 0, {
      en: "on + full date.",
      es: "on con la fecha completa: on March 25th.",
    }),
    mistake("bzg7-5", "My birthday is in March 25th.", "in", "on", {
      en: "on March 25th.",
      es: "Con la fecha completa va on. in es solo para el mes.",
    }, DETECTIVE),
    rearrange(
      "bzg7-7",
      ["is", "in March", "My birthday"],
      ["My birthday", "is", "in March"],
      { en: "My birthday + is + in + month.", es: "My birthday + is + in + mes." },
      CHISME,
    ),
    rearrange(
      "bzg7-8",
      ["your birthday?", "When", "is"],
      ["When", "is", "your birthday?"],
      { en: "When + is + your birthday?", es: "When + is + your birthday?" },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("bzg7-10", "January is the ___ month and December is the ___.", "Enero es el primer mes y diciembre es el último.", ["first / last", "one / twelve", "first / twelve"], 0, {
      en: "first, last.",
      es: "first: primero. last: último.",
    }),
    mistake("bzg7-12", "Daniel's birthday is on May.", "on", "in", {
      en: "in May.",
      es: "Solo el mes → in May.",
    }, DETECTIVE),

    // ── Trampas ────────────────────────────────────────────────────────────
    mc("bzg7-19", "My birthday is on the ___ of June.", "Mi cumpleaños es el dos de junio.", ["second", "two", "twoth"], 0, {
      en: "the second of June.",
      es: "the second of June: para fechas se usa el ordinal (second), no el número (two).",
    }),
    mistake("bzg7-20", "My birthday is at March and my favorite fruit is mango.", "at", "in", {
      en: "in March.",
      es: "in March: con los meses, in. at es para horas.",
    }, DETECTIVE),
  ],
};
