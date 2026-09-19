import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC ZERO · Día 13 — Pets · possessive pronouns (mine, yours, his, hers,
 * ours, theirs) · How old is he/she?
 * (Semana 3, día 3: PETS / POSSESSIVE PRONOUNS / AGE 3RD PERSON)
 * 8 ancla · 6 transferencia · 4 repaso · 2 trampas.
 */
const DETECTIVE = "Valeria escribió sobre su mascota. Toca la palabra equivocada.";
const CHISME = "Valeria dijo la frase en desorden. Ordénala.";

export const BASIC_ZERO_DAY_13: GrammarQuiz = {
  moduleId: "basic-zero",
  day: 13,
  title: { en: "The Cat Is Mine", es: "El gato es mío" },
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
    mc("bzg13-4", "How old ___ your dog? · He ___ 3 years old.", "¿Cuántos años tiene tu perro? · Tiene 3.", ["is / is", "has / has", "is / has"], 0, {
      en: "How old is he? He is 3.",
      es: "La edad con is, también para mascotas: How old is he? He is 3.",
    }),
    mistake("bzg13-5", "The hamster is my.", "my.", "mine.", {
      en: "mine at the end.",
      es: "The hamster is mine. Al final de la frase va mine, no my.",
    }, DETECTIVE),
    mistake("bzg13-6", "My cat have 5 years old.", "have", "is", {
      en: "My cat is 5.",
      es: "My cat is 5 years old. La edad con is.",
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
    mc("bzg13-9", "The rabbit is Luis's. The rabbit is ___.", "El conejo es de Luis. El conejo es de él.", ["his", "hers", "him"], 0, {
      en: "Luis → his.",
      es: "Luis es hombre → his. his sirve con sustantivo (his rabbit) y solo (it is his).",
    }),
    mc("bzg13-10", "The parrot is Sofia's and mine. The parrot is ___.", "El loro es de Sofía y mío. El loro es nuestro.", ["ours", "our", "us"], 0, {
      en: "Sofia and I = we → ours.",
      es: "Sofia and I = we → ours, al final.",
    }),
    mc("bzg13-11", "How old ___ Ana? · ___ is 25.", "¿Cuántos años tiene Ana? · Tiene 25.", ["is / She", "has / She", "is / Her"], 0, {
      en: "How old is Ana? She is 25.",
      es: "How old is Ana? She is 25. Antes del verbo va she.",
    }),
    mistake("bzg13-12", "This is my turtle. The turtle is me.", "me.", "mine.", {
      en: "mine.",
      es: "The turtle is mine. me es «a mí», mine es «mío».",
    }, DETECTIVE),
    rearrange(
      "bzg13-13",
      ["hers", "is", "The fish"],
      ["The fish", "is", "hers"],
      { en: "The fish + is + hers.", es: "The fish + is + hers." },
      CHISME,
    ),
    rearrange(
      "bzg13-14",
      ["is", "6 years old", "My dog"],
      ["My dog", "is", "6 years old"],
      { en: "My dog + is + age.", es: "My dog + is + edad." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("bzg13-15", "This is my aunt. ___ name is Carmen and ___ is 47.", "Esta es mi tía. Su nombre es Carmen y tiene 47.", ["Her / she", "His / she", "Her / her"], 0, {
      en: "Her name; she is.",
      es: "Her name; she is 47.",
    }),
    mc("bzg13-16", "___ your dog big? · No, he isn't. He is small.", "¿Tu perro es grande? · No. Es pequeño.", ["Is", "Are", "Does"], 0, {
      en: "Is your dog big?",
      es: "dog = he → Is.",
    }),
    mistake("bzg13-17", "My pets is a cat and a dog.", "is", "are", {
      en: "pets (plural): are.",
      es: "pets es plural → are.",
    }, DETECTIVE),
    mistake("bzg13-18", "My cat's eyes is green.", "is", "are", {
      en: "eyes: are.",
      es: "eyes es plural → are.",
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
