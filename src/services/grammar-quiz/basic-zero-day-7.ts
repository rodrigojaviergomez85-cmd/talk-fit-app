import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC ZERO · Día 7 — When is your birthday? · months · ordinal numbers · favorite fruit.
 * (Semana 2, día 2: ORDINAL NUMBERS / BIRTHDAY / FAVORITE FRUIT)
 * 8 ancla · 6 transferencia · 4 repaso · 2 trampas.
 */
const DETECTIVE = "Andrés escribió su cumpleaños. Toca la palabra equivocada.";
const CHISME = "Andrés dijo la frase en desorden. Ordénala.";

export const BASIC_ZERO_DAY_7: GrammarQuiz = {
  moduleId: "basic-zero",
  day: 7,
  title: { en: "When Is Your Birthday?", es: "¿Cuándo es tu cumpleaños?" },
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
    mc("bzg7-4", "March is the ___ month of the year.", "Marzo es el tercer mes del año.", ["third", "three", "thirds"], 0, {
      en: "third: ordinal.",
      es: "third: tercero. Para el orden se usa first, second, third.",
    }),
    mistake("bzg7-5", "My birthday is in March 25th.", "in", "on", {
      en: "on March 25th.",
      es: "Con la fecha completa va on. in es solo para el mes.",
    }, DETECTIVE),
    mistake("bzg7-6", "My favorite fruit are mango.", "are", "is", {
      en: "It is.",
      es: "Una fruta → is.",
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
    mc("bzg7-9", "When is Sofia's birthday? · It's ___ July 1st.", "¿Cuándo es el cumpleaños de Sofía? · Es el primero de julio.", ["on", "in", "at"], 0, {
      en: "on July 1st.",
      es: "Fecha completa → on.",
    }),
    mc("bzg7-10", "January is the ___ month and December is the ___.", "Enero es el primer mes y diciembre es el último.", ["first / last", "one / twelve", "first / twelve"], 0, {
      en: "first, last.",
      es: "first: primero. last: último.",
    }),
    mc("bzg7-11", "What is your favorite ___? · Mango.", "¿Cuál es tu fruta favorita? · El mango.", ["fruit", "fruits", "food"], 0, {
      en: "favorite fruit.",
      es: "favorite fruit, singular.",
    }),
    mistake("bzg7-12", "Daniel's birthday is on May.", "on", "in", {
      en: "in May.",
      es: "Solo el mes → in May.",
    }, DETECTIVE),
    rearrange(
      "bzg7-13",
      ["is", "mango", "My favorite fruit"],
      ["My favorite fruit", "is", "mango"],
      { en: "My favorite fruit + is + fruit.", es: "My favorite fruit + is + fruta." },
      CHISME,
    ),
    rearrange(
      "bzg7-14",
      ["on", "Her birthday is", "July 1st"],
      ["Her birthday is", "on", "July 1st"],
      { en: "Her birthday is + on + date.", es: "Her birthday is + on + fecha." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("bzg7-15", "Andres is ___ engineer and he ___ 26 years old.", "Andrés es ingeniero y tiene 26 años.", ["an / is", "a / has", "an / has"], 0, {
      en: "an engineer, he is 26.",
      es: "an engineer (vocal), he is 26 (edad con is).",
    }),
    mc("bzg7-16", "___ you tired? · No, I am not.", "¿Estás cansado? · No.", ["Are", "Is", "Do"], 0, {
      en: "Are you tired?",
      es: "you → Are.",
    }),
    mistake("bzg7-17", "I am a artist.", "a", "an", {
      en: "an artist.",
      es: "an artist: vocal.",
    }, DETECTIVE),
    mistake("bzg7-18", "I lives in Quito.", "lives", "live", {
      en: "I live.",
      es: "I live, sin -s.",
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
