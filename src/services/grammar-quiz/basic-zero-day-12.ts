import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC ZERO · Día 12 — Tell me about a family member · extended family ·
 * She is my ___. She is from ___. · Yes/No questions in third person.
 * (Semana 3, día 2: TELL ME ABOUT A FAMILY MEMBER)
 * 10 ítems: ancla + transferencia + trampas. Aprueba con 7 de 10.
 */
const DETECTIVE = "Daniel presentó a su familia. Toca la palabra equivocada.";
const CHISME = "Daniel dijo la frase en desorden. Ordénala.";

export const BASIC_ZERO_DAY_12: GrammarQuiz = {
  moduleId: "basic-zero",
  day: 12,
  title: { en: "She Is My Aunt", es: "Ella es mi tía" },
  passScore: 7,
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("bzg12-1", "This is Carmen. ___ is my aunt.", "Esta es Carmen. Es mi tía.", ["She", "He", "Her"], 0, {
      en: "aunt = she.",
      es: "aunt es mujer → She is.",
    }),
    mc("bzg12-2", "She ___ from Mexico and she ___ in Guadalajara.", "Es de México y vive en Guadalajara.", ["is / lives", "is / live", "are / lives"], 0, {
      en: "she is, she lives (-s).",
      es: "she → is, she → lives, con -s.",
    }),
    mc("bzg12-3", "This is Pedro. He is my ___.", "Este es Pedro. Es mi abuelo.", ["grandfather", "grandmother", "aunt"], 0, {
      en: "grandfather = abuelo.",
      es: "grandfather: abuelo. grandmother: abuela.",
    }),
    mistake("bzg12-5", "This is my uncle. She is from Colombia.", "She", "He", {
      en: "uncle = he.",
      es: "uncle es hombre → He is.",
    }, DETECTIVE),
    rearrange(
      "bzg12-7",
      ["my aunt", "She", "is"],
      ["She", "is", "my aunt"],
      { en: "She + is + my aunt.", es: "She + is + my aunt." },
      CHISME,
    ),
    rearrange(
      "bzg12-8",
      ["your cousin?", "she", "Is"],
      ["Is", "she", "your cousin?"],
      { en: "Is + she + your cousin?", es: "Is + she + your cousin?" },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("bzg12-10", "___ your grandmother from Spain? · No, she isn't.", "¿Tu abuela es de España? · No.", ["Is", "Are", "Does"], 0, {
      en: "Is your grandmother ...?",
      es: "grandmother = she → Is.",
    }),
    mistake("bzg12-12", "Is your uncle from Peru? Yes, he are from Lima.", "are", "is", {
      en: "Yes, he is.",
      es: "he → is. La respuesta corta repite is.",
    }, DETECTIVE),

    // ── Repaso ─────────────────────────────────────────────────────────────

    // ── Trampas ────────────────────────────────────────────────────────────
    mc("bzg12-19", "Is your aunt from Mexico? · Yes, ___.", "¿Tu tía es de México? · Sí.", ["she is", "she's", "is"], 0, {
      en: "Yes, she is (no contraction in short answers).",
      es: "Yes, she is. En la respuesta corta no se acorta a she's.",
    }),
    mistake("bzg12-20", "My aunt is from Mexico and she has 47 years old.", "has", "is", {
      en: "she is 47.",
      es: "she is 47 years old. La edad nunca con has.",
    }, DETECTIVE),
  ],
};
