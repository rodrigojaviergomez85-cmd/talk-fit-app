import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC ZERO · Día 13 — Pets · possessive pronouns (mine, yours, his, hers,
 * ours, theirs) · How old is he/she?
 * (Semana 3, día 3: PETS / POSSESSIVE PRONOUNS / AGE 3RD PERSON)
 * 10 ítems: ancla + transferencia + trampas. Aprueba con 7 de 10.
 */
const DETECTIVE = "Valeria escribió sobre su mascota. Toca la palabra equivocada.";
const CHISME = "Valeria dijo la frase en desorden. Ordénala.";

export const BASIC_ZERO_DAY_13: GrammarQuiz = {
  moduleId: "basic-zero",
  day: 13,
  title: { en: "The Cat Is Mine", es: "El gato es mío" },
  passScore: 7,
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("bzg13-1", "This is my cat. The cat is ___.", "Este es mi gato. El gato es mío.", ["mine", "my", "me"], 0, {
      en: "mine goes alone, at the end.",
      es: "mine va solo, al final. my siempre lleva un sustantivo después (my cat).",
    }),
    mc("bzg13-2", "That is your dog. The dog is ___.", "Ese es tu perro. El perro es tuyo.", ["yours", "your", "you"], 0, {
      en: "yours, alone.",
      es: "yours: tuyo, va solo.",
    }),
    mc("bzg13-3", "The fish is Ana's. The fish is ___.", "El pez es de Ana. El pez es de ella.", ["hers", "her", "his"], 0, {
      en: "Ana → hers.",
      es: "Ana es mujer → hers, al final de la frase.",
    }),
    mistake("bzg13-5", "The hamster is my.", "my.", "mine.", {
      en: "mine at the end.",
      es: "The hamster is mine. Al final de la frase va mine, no my.",
    }, DETECTIVE),
    rearrange(
      "bzg13-7",
      ["mine", "The cat", "is"],
      ["The cat", "is", "mine"],
      { en: "The cat + is + mine.", es: "The cat + is + mine." },
      CHISME,
    ),
    rearrange(
      "bzg13-8",
      ["your dog?", "How old", "is"],
      ["How old", "is", "your dog?"],
      { en: "How old + is + your dog?", es: "How old + is + your dog?" },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("bzg13-10", "The parrot is Sofia's and mine. The parrot is ___.", "El loro es de Sofía y mío. El loro es nuestro.", ["ours", "our", "us"], 0, {
      en: "Sofia and I = we → ours.",
      es: "Sofia and I = we → ours, al final.",
    }),
    mistake("bzg13-12", "This is my turtle. The turtle is me.", "me.", "mine.", {
      en: "mine.",
      es: "The turtle is mine. me es «a mí», mine es «mío».",
    }, DETECTIVE),


    // ── Trampas ────────────────────────────────────────────────────────────
    mc("bzg13-19", "Is this your cat? · Yes, it is ___.", "¿Este es tu gato? · Sí, es mío.", ["mine", "my", "mine cat"], 0, {
      en: "it is mine.",
      es: "it is mine. Solo, sin cat después.",
    }),
    mistake("bzg13-20", "My pet is a dog. Her name is Bruno and he is 6 years old.", "Her", "His", {
      en: "Bruno (he) → his name.",
      es: "Bruno es macho (he) → His name. En la misma frase dice he.",
    }, DETECTIVE),
  ],
};
