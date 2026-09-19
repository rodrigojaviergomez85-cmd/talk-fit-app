import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC ZERO · Día 19 — Prepositions of place: in, on, under, next to, behind,
 * in front of · Where is ...? · there is / there are.
 * (Semana 4, día 4: la currícula pide agregar PREPOSITIONS OF PLACE)
 * 8 ancla · 6 transferencia · 4 repaso · 2 trampas.
 */
const DETECTIVE = "Rosa describió su cocina. Toca la palabra equivocada.";
const CHISME = "Rosa dijo la frase en desorden. Ordénala.";

export const BASIC_ZERO_DAY_19: GrammarQuiz = {
  moduleId: "basic-zero",
  day: 19,
  title: { en: "Where Is the Cat?", es: "¿Dónde está el gato?" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("bzg19-1", "The cat is inside. The cat is ___ the box.", "El gato está dentro de la caja.", ["in", "on", "under"], 0, {
      en: "in: inside.",
      es: "in: adentro.",
    }),
    mc("bzg19-2", "The book is on top. The book is ___ the table.", "El libro está sobre la mesa.", ["on", "in", "under"], 0, {
      en: "on: on top of.",
      es: "on: encima, sobre.",
    }),
    mc("bzg19-3", "The dog is below. The dog is ___ the bed.", "El perro está debajo de la cama.", ["under", "on", "in"], 0, {
      en: "under: below.",
      es: "under: debajo de.",
    }),
    mc("bzg19-4", "Where ___ my keys? · They are on the table.", "¿Dónde están mis llaves? · Están sobre la mesa.", ["are", "is", "am"], 0, {
      en: "keys (plural): are.",
      es: "keys es plural → Where are.",
    }),
    mistake("bzg19-5", "The phone is in the table.", "in", "on", {
      en: "on the table.",
      es: "on the table: sobre la mesa. «In the table» es calco de «en la mesa».",
    }, DETECTIVE),
    mistake("bzg19-6", "The shoes is under the bed.", "is", "are", {
      en: "shoes → are.",
      es: "shoes es plural → are.",
    }, DETECTIVE),
    rearrange(
      "bzg19-7",
      ["under", "The cat", "the bed", "is"],
      ["The cat", "is", "under", "the bed"],
      { en: "The cat + is + under + the bed.", es: "The cat + is + under + the bed." },
      CHISME,
    ),
    rearrange(
      "bzg19-8",
      ["is", "Where", "the dog?"],
      ["Where", "is", "the dog?"],
      { en: "Where + is + the dog?", es: "Where + is + the dog?" },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("bzg19-9", "My mother is ___ the kitchen.", "Mi mamá está en la cocina.", ["in", "on", "under"], 0, {
      en: "in the kitchen: inside a room.",
      es: "in the kitchen: dentro del cuarto.",
    }),
    mc("bzg19-10", "The bank is ___ the school.", "El banco está al lado de la escuela.", ["next to", "in", "on"], 0, {
      en: "next to: beside.",
      es: "next to: al lado de.",
    }),
    mc("bzg19-11", "___ a cat under the table.", "Hay un gato debajo de la mesa.", ["There is", "There are", "Is"], 0, {
      en: "one cat: there is.",
      es: "there is: hay, para una cosa.",
    }),
    mistake("bzg19-12", "There is two dogs in the garden.", "is", "are", {
      en: "two dogs: there are.",
      es: "two dogs, plural → There are.",
    }, DETECTIVE),
    rearrange(
      "bzg19-13",
      ["in the kitchen", "My father", "is"],
      ["My father", "is", "in the kitchen"],
      { en: "My father + is + in + room.", es: "My father + is + in + cuarto." },
      CHISME,
    ),
    rearrange(
      "bzg19-14",
      ["on the table", "There are", "three apples"],
      ["There are", "three apples", "on the table"],
      { en: "There are + plural + place.", es: "There are + plural + lugar." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("bzg19-15", "This is my mother. ___ is in the kitchen and I love ___.", "Esta es mi mamá. Está en la cocina y la quiero.", ["She / her", "Her / she", "She / she"], 0, {
      en: "She is; love her.",
      es: "she antes del verbo, her después del verbo.",
    }),
    mc("bzg19-16", "My parents ___ in the living room. ___ are watching TV.", "Mis papás están en la sala. Están viendo tele.", ["are / They", "is / They", "are / Them"], 0, {
      en: "They are.",
      es: "parents → are, y como sujeto They.",
    }),
    mistake("bzg19-17", "Is your brother in the house? Yes, he are in the kitchen.", "are", "is", {
      en: "Yes, he is.",
      es: "he → is.",
    }, DETECTIVE),
    mistake("bzg19-18", "The cat is Ana's. The cat is her.", "her.", "hers.", {
      en: "hers at the end.",
      es: "The cat is hers. Al final va hers.",
    }, DETECTIVE),

    // ── Trampas ────────────────────────────────────────────────────────────
    mc("bzg19-19", "The picture is ___ the wall.", "El cuadro está en la pared.", ["on", "in", "at"], 0, {
      en: "on the wall.",
      es: "on the wall: en inglés las cosas están sobre la pared, on. «In the wall» sería adentro de la pared.",
    }),
    mistake("bzg19-20", "My sister is sitting in the sofa with the cat.", "in", "on", {
      en: "on the sofa.",
      es: "on the sofa: sobre el sofá. «In the sofa» es calco de «en el sofá».",
    }, DETECTIVE),
  ],
};
