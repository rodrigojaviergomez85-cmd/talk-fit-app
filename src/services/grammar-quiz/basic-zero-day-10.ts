import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC ZERO · Día 10 — Family members · possessive adjectives (my, your,
 * his, her, our, their) · Whose is it? This is her notebook.
 * (Semana 2, día 5: FAMILY MEMBERS / POSSESSIVE ADJECTIVES)
 * 10 ítems: ancla + transferencia + trampas. Aprueba con 7 de 10.
 */
const DETECTIVE = "Carlos presentó a su familia. Toca la palabra equivocada.";
const CHISME = "Carlos dijo la frase en desorden. Ordénala.";

export const BASIC_ZERO_DAY_10: GrammarQuiz = {
  moduleId: "basic-zero",
  day: 10,
  title: { en: "My, Your, His, Her", es: "My, your, his, her" },
  passScore: 7,
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("bzg10-1", "This is my mother. ___ name is Rosa.", "Esta es mi mamá. Su nombre es Rosa.", ["Her", "His", "She"], 0, {
      en: "mother = she → her name.",
      es: "mother es mujer → Her name. his es de él.",
    }),
    mc("bzg10-2", "This is my father. ___ name is Pedro.", "Este es mi papá. Su nombre es Pedro.", ["His", "Her", "He"], 0, {
      en: "father = he → his name.",
      es: "father es hombre → His name.",
    }),
    mc("bzg10-3", "I have two brothers. ___ names are Luis and Jorge.", "Tengo dos hermanos. Sus nombres son Luis y Jorge.", ["Their", "Her", "His"], 0, {
      en: "two brothers = they → their.",
      es: "Dos hermanos = they → Their names.",
    }),
    mistake("bzg10-5", "This is my sister. His name is Ana.", "His", "Her", {
      en: "sister → her.",
      es: "sister es mujer → Her name. Este es el error número uno del nivel.",
    }, DETECTIVE),
    rearrange(
      "bzg10-7",
      ["is", "Rosa", "Her name"],
      ["Her name", "is", "Rosa"],
      { en: "Her name + is + name.", es: "Her name + is + nombre." },
      CHISME,
    ),
    rearrange(
      "bzg10-8",
      ["my father", "This is"],
      ["This is", "my father"],
      { en: "This is + my + family member.", es: "This is + my + familiar." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("bzg10-10", "Carlos and I are students. ___ teacher is Lucia.", "Carlos y yo somos estudiantes. Nuestra maestra es Lucía.", ["Our", "Their", "My"], 0, {
      en: "Carlos and I = we → our.",
      es: "Carlos and I = we → Our teacher.",
    }),
    mistake("bzg10-12", "My parents are from Peru. His names are Pedro and Rosa.", "His", "Their", {
      en: "parents = they → their.",
      es: "parents = they → Their names.",
    }, DETECTIVE),
    rearrange(
      "bzg10-13",
      ["are", "Their names", "Luis and Jorge"],
      ["Their names", "are", "Luis and Jorge"],
      { en: "Their names + are + names.", es: "Their names + are + nombres. Plural, are." },
      CHISME,
    ),
    rearrange(
      "bzg10-14",
      ["your", "Is this", "notebook?"],
      ["Is this", "your", "notebook?"],
      { en: "Is this + your + noun?", es: "Is this + your + sustantivo?" },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────

    // ── Trampas ────────────────────────────────────────────────────────────
    mc("bzg10-19", "This is my mother. ___ is from Spain.", "Esta es mi mamá. Es de España.", ["She", "Her", "His"], 0, {
      en: "She is from: subject pronoun.",
      es: "She is from Spain: antes del verbo, she. her es solo antes de un sustantivo (her name).",
    }),
    mistake("bzg10-20", "This is my sister and she name is Ana.", "she", "her", {
      en: "her name.",
      es: "her name: antes de un sustantivo va her, no she. she es solo para «ella» antes del verbo.",
    }, DETECTIVE),
  ],
};
