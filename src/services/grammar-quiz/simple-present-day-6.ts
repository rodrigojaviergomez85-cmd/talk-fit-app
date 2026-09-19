import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 2 · Día 6 — A family member's routine: my mom wakes up · she has · doesn't.
 * 8 ancla · 4 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Lucía escribió la rutina de su mamá. Toca la palabra equivocada.";
const CHISME = "Lucía dijo la frase en desorden. Ordénala.";

export const SIMPLE_PRESENT_DAY_6: GrammarQuiz = {
  moduleId: "simple-present",
  day: 6,
  title: { en: "My Mom's Routine", es: "La rutina de mi mamá" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("spg6-1", "My mom usually ___ up early.", "Mi mamá normalmente se despierta temprano.", ["wakes", "wake", "waking"], 0, {
      en: "she wakes up.",
      es: "my mom = she → wakes, con -s.",
    }),
    mc("spg6-2", "She ___ breakfast at home.", "Desayuna en casa.", ["has", "have", "haves"], 0, {
      en: "she has.",
      es: "have → has con she.",
    }),
    mc("spg6-3", "She ___ work late every day.", "No trabaja tarde todos los días.", ["doesn't", "don't", "isn't"], 0, {
      en: "she doesn't.",
      es: "she → doesn't.",
    }),
    mc("spg6-4", "She likes her routine because she ___ busy.", "Le gusta su rutina porque se mantiene ocupada.", ["stays", "stay", "staying"], 0, {
      en: "she stays.",
      es: "she → stays, con -s.",
    }),
    mistake("spg6-5", "She start her day around seven.", "start", "starts", {
      en: "she starts.",
      es: "she → starts, con -s.",
    }, DETECTIVE),
    mistake("spg6-6", "She talk to different people every day.", "talk", "talks", {
      en: "she talks.",
      es: "she → talks, con -s.",
    }, DETECTIVE),
    rearrange(
      "spg6-7",
      ["during the morning", "She usually", "works"],
      ["She usually", "works", "during the morning"],
      { en: "She usually + verb-s + when.", es: "She usually + verbo con -s + cuándo." },
      CHISME,
    ),
    rearrange(
      "spg6-8",
      ["a very active routine", "she has", "Overall,"],
      ["Overall,", "she has", "a very active routine"],
      { en: "Overall, + she has + object.", es: "Overall, + she has + objeto." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("spg6-9", "My dad ___ up early too.", "Mi papá también se despierta temprano.", ["wakes", "wake", "waking"], 0, {
      en: "he wakes up.",
      es: "my dad = he → wakes.",
    }),
    mc("spg6-10", "My parents ___ breakfast together.", "Mis papás desayunan juntos.", ["have", "has", "haves"], 0, {
      en: "they have.",
      es: "my parents = they → have.",
    }),
    mistake("spg6-11", "My grandmother don't work late.", "don't", "doesn't", {
      en: "she doesn't.",
      es: "my grandmother = she → doesn't.",
    }, DETECTIVE),
    rearrange(
      "spg6-12",
      ["to different people", "My dad", "talks", "every day"],
      ["My dad", "talks", "to different people", "every day"],
      { en: "Subject + verb-s + to whom + how often.", es: "Sujeto + verbo con -s + a quién + cada cuánto." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("spg6-13", "___ your mom work on Saturdays? · No, she doesn't.", "¿Tu mamá trabaja los sábados? · No.", ["Does", "Do", "Is"], 0, {
      en: "Does + she.",
      es: "Does con he/she. Repaso del día 4.",
    }),
    mc("spg6-14", "My mom is 52. ___ hair is short and ___ favorite color is green.", "Mi mamá tiene 52. Su pelo es corto y su color favorito es el verde.", ["Her / her", "His / her", "She / her"], 0, {
      en: "her hair, her favorite.",
      es: "mom → her antes del sustantivo.",
    }),
    mistake("spg6-15", "Tomorrow my mom are going to make breakfast for everybody.", "are", "is", {
      en: "my mom = she: is.",
      es: "my mom → is going to. Repaso de Basic 1.",
    }, DETECTIVE),
    mistake("spg6-16", "My mom have 52 years old.", "have", "is", {
      en: "She is 52.",
      es: "My mom is 52 years old.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("spg6-17", "___ a small garden behind her house.", "Hay un jardín pequeño detrás de su casa.", ["There is", "There are", "It is"], 0, {
      en: "one garden: there is.",
      es: "there is: hay, una cosa.",
    }),
    mc("spg6-18", "What time does she wake up? · ___ five thirty.", "¿A qué hora se despierta? · A las cinco y media.", ["At", "In", "On"], 0, {
      en: "at five thirty.",
      es: "at con la hora.",
    }),
    mistake("spg6-19", "She wants have breakfast with the family.", "wants", "wants to", {
      en: "wants to have.",
      es: "wants to + verbo.",
    }, DETECTIVE),
    mistake("spg6-20", "She has breakfast in home every day.", "in", "at", {
      en: "at home.",
      es: "at home: en casa.",
    }, DETECTIVE),
  ],
};
