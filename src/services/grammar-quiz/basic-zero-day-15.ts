import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC ZERO · Día 15 — Professions: What is his/her profession? She is a doctor.
 * (Semana 3, día 5: PROFESSIONS + WEEKLY EVALUATION)
 * 10 ítems: ancla + transferencia + trampas. Aprueba con 7 de 10.
 */
const DETECTIVE = "Lucía escribió las profesiones de su familia. Toca la palabra equivocada.";
const CHISME = "Lucía dijo la frase en desorden. Ordénala.";

export const BASIC_ZERO_DAY_15: GrammarQuiz = {
  moduleId: "basic-zero",
  day: 15,
  title: { en: "She Is a Doctor", es: "Ella es doctora" },
  passScore: 7,
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("bzg15-1", "What ___ her profession? · She is a doctor.", "¿Cuál es su profesión? · Es doctora.", ["is", "are", "does"], 0, {
      en: "What is her profession?",
      es: "her profession = it → is.",
    }),
    mc("bzg15-2", "Her name is Ana. She is 35 years old. She is ___ nurse.", "Su nombre es Ana. Tiene 35 años. Es enfermera.", ["a", "an", "the"], 0, {
      en: "a nurse.",
      es: "a nurse: consonante, y la profesión lleva a.",
    }),
    mc("bzg15-3", "My father is ___ accountant.", "Mi papá es contador.", ["an", "a", "the"], 0, {
      en: "an accountant.",
      es: "an accountant: vocal.",
    }),
    mistake("bzg15-5", "My mother is doctor.", "doctor.", "a doctor.", {
      en: "a doctor.",
      es: "My mother is a doctor. La profesión lleva a.",
    }, DETECTIVE),
    rearrange(
      "bzg15-7",
      ["a", "She is", "doctor"],
      ["She is", "a", "doctor"],
      { en: "She is + a + profession.", es: "She is + a + profesión." },
      CHISME,
    ),
    rearrange(
      "bzg15-8",
      ["his profession?", "What", "is"],
      ["What", "is", "his profession?"],
      { en: "What + is + his profession?", es: "What + is + his profession?" },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("bzg15-10", "What is your profession? · I ___ a cashier.", "¿Cuál es tu profesión? · Soy cajero.", ["am", "is", "have"], 0, {
      en: "I am a cashier.",
      es: "I → am.",
    }),
    mistake("bzg15-12", "My parents is doctors.", "is", "are", {
      en: "parents → are.",
      es: "parents = they → are doctors.",
    }, DETECTIVE),


    // ── Trampas ────────────────────────────────────────────────────────────
    mc("bzg15-19", "My mother is a doctor and my father is ___ doctor too.", "Mi mamá es doctora y mi papá es doctor también.", ["a", "an", "the"], 0, {
      en: "a doctor, again.",
      es: "a doctor, otra vez. En inglés doctor no cambia por hombre o mujer: siempre a doctor.",
    }),
    mistake("bzg15-20", "My sister is a doctora in a hospital.", "doctora", "doctor", {
      en: "doctor: no feminine form.",
      es: "doctor: en inglés no hay doctora. Sirve para hombres y mujeres.",
    }, DETECTIVE),
  ],
};
