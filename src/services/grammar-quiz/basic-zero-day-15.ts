import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC ZERO · Día 15 — Professions: What is his/her profession? She is a doctor.
 * (Semana 3, día 5: PROFESSIONS + WEEKLY EVALUATION)
 * 8 ancla · 6 transferencia · 4 repaso · 2 trampas.
 */
const DETECTIVE = "Lucía escribió las profesiones de su familia. Toca la palabra equivocada.";
const CHISME = "Lucía dijo la frase en desorden. Ordénala.";

export const BASIC_ZERO_DAY_15: GrammarQuiz = {
  moduleId: "basic-zero",
  day: 15,
  title: { en: "She Is a Doctor", es: "Ella es doctora" },
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
    mc("bzg15-4", "My cousins ___ police officers.", "Mis primos son policías.", ["are", "is", "am"], 0, {
      en: "cousins → are.",
      es: "cousins es plural → are. Y sin a: police officers, plural.",
    }),
    mistake("bzg15-5", "My mother is doctor.", "doctor.", "a doctor.", {
      en: "a doctor.",
      es: "My mother is a doctor. La profesión lleva a.",
    }, DETECTIVE),
    mistake("bzg15-6", "My brother is a engineer.", "a", "an", {
      en: "an engineer.",
      es: "an engineer: vocal.",
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
    mc("bzg15-9", "Tomas is my coworker. ___ is ___ secretary.", "Tomás es mi compañero. Es secretario.", ["He / a", "She / a", "He / an"], 0, {
      en: "Tomas → he; a secretary.",
      es: "Tomas → He is a secretary.",
    }),
    mc("bzg15-10", "What is your profession? · I ___ a cashier.", "¿Cuál es tu profesión? · Soy cajero.", ["am", "is", "have"], 0, {
      en: "I am a cashier.",
      es: "I → am.",
    }),
    mc("bzg15-11", "Is your mother a teacher? · No, she ___. She is a nurse.", "¿Tu mamá es maestra? · No. Es enfermera.", ["isn't", "aren't", "not"], 0, {
      en: "No, she isn't.",
      es: "she → isn't.",
    }),
    mistake("bzg15-12", "My parents is doctors.", "is", "are", {
      en: "parents → are.",
      es: "parents = they → are doctors.",
    }, DETECTIVE),
    rearrange(
      "bzg15-13",
      ["an", "My father is", "accountant"],
      ["My father is", "an", "accountant"],
      { en: "My father is + an + profession.", es: "My father is + an + profesión." },
      CHISME,
    ),
    rearrange(
      "bzg15-14",
      ["a nurse?", "Is", "your sister"],
      ["Is", "your sister", "a nurse?"],
      { en: "Is + your sister + a nurse?", es: "Is + your sister + a nurse?" },
      CHISME,
    ),

    // ── Repaso de la semana ────────────────────────────────────────────────
    mc("bzg15-15", "This is my aunt Carmen. ___ is 47 and ___ hair is short.", "Esta es mi tía Carmen. Tiene 47 y su pelo es corto.", ["She / her", "He / his", "She / his"], 0, {
      en: "aunt → she, her.",
      es: "aunt → She is, her hair.",
    }),
    mc("bzg15-16", "The dog is ___ and the cat is ___. (Ana / me)", "El perro es de Ana y el gato es mío.", ["hers / mine", "her / my", "his / mine"], 0, {
      en: "hers, mine.",
      es: "Ana → hers; yo → mine. Al final van solos.",
    }),
    mistake("bzg15-17", "Is he shy? No, he not.", "not.", "isn't.", {
      en: "No, he isn't.",
      es: "No, he isn't.",
    }, DETECTIVE),
    mistake("bzg15-18", "My nephew have 6 years old.", "have", "is", {
      en: "He is 6.",
      es: "My nephew is 6 years old.",
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
