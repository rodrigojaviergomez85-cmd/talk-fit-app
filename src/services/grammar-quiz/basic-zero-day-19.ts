import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC ZERO · Día 19 — Prepositions of place: in, on, under, next to, behind,
 * in front of · Where is ...? · there is / there are.
 * (Semana 4, día 4: la currícula pide agregar PREPOSITIONS OF PLACE)
 * 10 ítems: ancla + transferencia + trampas. Aprueba con 7 de 10.
 */
const DETECTIVE = "Rosa describió su cocina. Toca la palabra equivocada.";
const CHISME = "Rosa dijo la frase en desorden. Ordénala.";

export const BASIC_ZERO_DAY_19: GrammarQuiz = {
  moduleId: "basic-zero",
  day: 19,
  title: { en: "Where Is the Cat?", es: "¿Dónde está el gato?" },
  passScore: 7,
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
    mistake("bzg19-5", "The phone is in the table.", "in", "on", {
      en: "on the table.",
      es: "on the table: sobre la mesa. «In the table» es calco de «en la mesa».",
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
    mc("bzg19-10", "The bank is ___ the school.", "El banco está al lado de la escuela.", ["next to", "in", "on"], 0, {
      en: "next to: beside.",
      es: "next to: al lado de.",
    }),
    mistake("bzg19-12", "There is two dogs in the garden.", "is", "are", {
      en: "two dogs: there are.",
      es: "two dogs, plural → There are.",
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
