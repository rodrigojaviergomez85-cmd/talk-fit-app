import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 1 · Día 7 — My mom's tomorrow: she's going to · she isn't going to.
 * 8 ancla · 4 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Paola escribió el día de su mamá. Toca la palabra equivocada.";
const CHISME = "Paola dijo la frase en desorden. Ordénala.";

export const SIMPLE_FUTURE_DAY_7: GrammarQuiz = {
  moduleId: "simple-future",
  day: 7,
  title: { en: "My Mom's Tomorrow", es: "El día de mi mamá" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("sfg7-1", "Tomorrow, my mom ___ going to wake up early.", "Mañana mi mamá se va a despertar temprano.", ["is", "are", "am"], 0, {
      en: "my mom = she: is.",
      es: "my mom → is going to.",
    }),
    mc("sfg7-2", "___ going to make breakfast for everybody.", "Va a hacer el desayuno para todos.", ["She's", "Her", "She"], 0, {
      en: "She's = She is.",
      es: "She's going to = She is going to.",
    }),
    mc("sfg7-3", "She ___ going to work tomorrow.", "No va a trabajar mañana.", ["isn't", "doesn't", "not"], 0, {
      en: "she isn't going to.",
      es: "isn't going to: no va a.",
    }),
    mc("sfg7-4", "At night, she's going to watch ___ show.", "En la noche va a ver su programa.", ["her", "his", "she"], 0, {
      en: "she → her.",
      es: "she → her show: su (de ella).",
    }),
    mistake("sfg7-5", "In the morning, she's going to goes shopping.", "goes", "go", {
      en: "going to go shopping.",
      es: "going to + go, verbo solo.",
    }, DETECTIVE),
    mistake("sfg7-6", "She's going to buys fruit and vegetables.", "buys", "buy", {
      en: "going to buy.",
      es: "Después de going to, verbo solo: buy.",
    }, DETECTIVE),
    rearrange(
      "sfg7-7",
      ["cook lunch", "she's going to", "In the afternoon,"],
      ["In the afternoon,", "she's going to", "cook lunch"],
      { en: "Time + she's going to + verb.", es: "Tiempo + she's going to + verbo." },
      CHISME,
    ),
    rearrange(
      "sfg7-8",
      ["a calm day", "She's going to", "have"],
      ["She's going to", "have", "a calm day"],
      { en: "She's going to + have + object.", es: "She's going to + have + objeto." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("sfg7-9", "Tomorrow, my dad ___ going to wake up early too.", "Mañana mi papá también se va a despertar temprano.", ["is", "are", "am"], 0, {
      en: "my dad = he: is.",
      es: "my dad → is going to.",
    }),
    mc("sfg7-10", "My parents ___ going to work tomorrow.", "Mis papás no van a trabajar mañana.", ["aren't", "isn't", "don't"], 0, {
      en: "they aren't going to.",
      es: "my parents = they → aren't going to.",
    }),
    mistake("sfg7-11", "Tomorrow I'm going to make breakfast for my mom. He's going to be happy.", "He's", "She's", {
      en: "mom → she.",
      es: "Mi mamá es mujer → She's going to.",
    }, DETECTIVE),
    rearrange(
      "sfg7-12",
      ["is going to", "My brother", "at night", "watch a movie"],
      ["My brother", "is going to", "watch a movie", "at night"],
      { en: "Subject + is going to + verb + time.", es: "Sujeto + is going to + verbo + tiempo." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("sfg7-13", "My mom is 50 years old. ___ hair is long.", "Mi mamá tiene 50 años. Su pelo es largo.", ["Her", "His", "She"], 0, {
      en: "mom → her.",
      es: "mom → Her hair.",
    }),
    mc("sfg7-14", "My mom ___ a teacher. She ___ at a school.", "Mi mamá es maestra. Trabaja en una escuela.", ["is / works", "is / work", "has / works"], 0, {
      en: "is a teacher, works.",
      es: "she → is, works con -s.",
    }),
    mistake("sfg7-15", "On Saturday, my friend Carlos are going to play soccer.", "are", "is", {
      en: "Carlos = he: is.",
      es: "Carlos → is going to. Repaso del día 6.",
    }, DETECTIVE),
    mistake("sfg7-16", "My mom have three sisters.", "have", "has", {
      en: "she has.",
      es: "my mom = she → has.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("sfg7-17", "___ fruit and vegetables in the kitchen.", "Hay frutas y verduras en la cocina.", ["There are", "There is", "Are there"], 0, {
      en: "fruit and vegetables: there are.",
      es: "there are: hay, plural.",
    }),
    mc("sfg7-18", "How ___ fruit is she going to buy? · A lot.", "¿Cuánta fruta va a comprar? · Mucha.", ["much", "many", "long"], 0, {
      en: "How much + fruit.",
      es: "How much: fruit no se cuenta.",
    }),
    mistake("sfg7-19", "She needs buy milk and eggs.", "needs", "needs to", {
      en: "needs to buy.",
      es: "needs to + verbo.",
    }, DETECTIVE),
    mistake("sfg7-20", "The supermarket is in the corner of my street.", "in", "on", {
      en: "on the corner.",
      es: "on the corner: en la esquina.",
    }, DETECTIVE),
  ],
};
