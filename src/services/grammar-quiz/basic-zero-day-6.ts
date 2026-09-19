import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC ZERO · Día 6 — A / an + professions · Are you tired? Yes, I am.
 * (Semana 2, día 1: A/AN + PROFESSIONS + ARE YOU...?)
 * 8 ancla · 6 transferencia · 4 repaso (semana 1) · 2 trampas.
 */
const DETECTIVE = "Sofía escribió su profesión. Toca la palabra equivocada.";
const CHISME = "Sofía dijo la frase en desorden. Ordénala.";

export const BASIC_ZERO_DAY_6: GrammarQuiz = {
  moduleId: "basic-zero",
  day: 6,
  title: { en: "I Am a Teacher", es: "Soy maestra" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("bzg6-1", "I am ___ teacher.", "Soy maestra.", ["a", "an", "the"], 0, {
      en: "a teacher: consonant sound.",
      es: "a teacher: la t es consonante. Y en inglés la profesión lleva a.",
    }),
    mc("bzg6-2", "Daniel is ___ engineer.", "Daniel es ingeniero.", ["an", "a", "the"], 0, {
      en: "an engineer: vowel sound.",
      es: "an engineer: empieza con vocal. an antes de a, e, i, o, u.",
    }),
    mc("bzg6-3", "___ you tired? · Yes, I am.", "¿Estás cansado? · Sí.", ["Are", "Is", "Do"], 0, {
      en: "Are you tired? Yes, I am.",
      es: "Are you tired? Con are, porque tired va con be.",
    }),
    mc("bzg6-4", "Are you hungry? · No, I ___.", "¿Tienes hambre? · No.", ["am not", "not", "don't"], 0, {
      en: "No, I am not.",
      es: "No, I am not. La respuesta corta repite am.",
    }),
    mistake("bzg6-5", "I am teacher.", "teacher.", "a teacher.", {
      en: "I am a teacher.",
      es: "I am a teacher. En inglés la profesión siempre lleva a.",
    }, DETECTIVE),
    mistake("bzg6-6", "She is a accountant.", "a", "an", {
      en: "an accountant.",
      es: "an accountant: empieza con vocal.",
    }, DETECTIVE),
    rearrange(
      "bzg6-7",
      ["a", "nurse", "I am"],
      ["I am", "a", "nurse"],
      { en: "I am + a + profession.", es: "I am + a + profesión." },
      CHISME,
    ),
    rearrange(
      "bzg6-8",
      ["tired?", "Are", "you"],
      ["Are", "you", "tired?"],
      { en: "Are + you + adjective?", es: "Are + you + adjetivo?" },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("bzg6-9", "Carlos is ___ student and Lucia is ___ doctor.", "Carlos es estudiante y Lucía es doctora.", ["a / a", "an / a", "a / an"], 0, {
      en: "a student, a doctor.",
      es: "a student, a doctor: las dos empiezan con consonante.",
    }),
    mc("bzg6-10", "___ Valeria cold? · Yes, she is.", "¿Valeria tiene frío? · Sí.", ["Is", "Are", "Does"], 0, {
      en: "Is Valeria cold?",
      es: "Valeria = she → Is.",
    }),
    mc("bzg6-11", "Are you sleepy? · Yes, ___.", "¿Tienes sueño? · Sí.", ["I am", "I'm", "am"], 0, {
      en: "Yes, I am (full form in short answers).",
      es: "Yes, I am. En la respuesta corta no se acorta: I am, no I'm.",
    }),
    mistake("bzg6-12", "Andres is a artist.", "a", "an", {
      en: "an artist.",
      es: "an artist: vocal.",
    }, DETECTIVE),
    rearrange(
      "bzg6-13",
      ["an", "engineer", "Daniel is"],
      ["Daniel is", "an", "engineer"],
      { en: "Daniel is + an + profession.", es: "Daniel is + an + profesión." },
      CHISME,
    ),
    rearrange(
      "bzg6-14",
      ["hungry?", "Is", "Sofia"],
      ["Is", "Sofia", "hungry?"],
      { en: "Is + name + adjective?", es: "Is + nombre + adjetivo?" },
      CHISME,
    ),

    // ── Repaso de la semana 1 ──────────────────────────────────────────────
    mc("bzg6-15", "I ___ 28 years old and I ___ from Mexico.", "Tengo 28 años y soy de México.", ["am / am", "have / am", "am / is"], 0, {
      en: "I am, I am.",
      es: "La edad y el país, los dos con am.",
    }),
    mc("bzg6-16", "Sofia ___ in Guadalajara.", "Sofía vive en Guadalajara.", ["lives", "live", "is live"], 0, {
      en: "She lives.",
      es: "Sofia = she → lives, con -s.",
    }),
    mistake("bzg6-17", "My favorite color are purple.", "are", "is", {
      en: "It is.",
      es: "Un color → is.",
    }, DETECTIVE),
    mistake("bzg6-18", "Where is you from?", "is", "are", {
      en: "Where are you from?",
      es: "you → are.",
    }, DETECTIVE),

    // ── Trampas ────────────────────────────────────────────────────────────
    mc("bzg6-19", "Are you hot? · No, I'm not. I ___ cold.", "¿Tienes calor? · No. Tengo frío.", ["am", "have", "is"], 0, {
      en: "I am cold. Not I have cold.",
      es: "I am cold. «Tengo frío» en inglés va con be, no con have.",
    }),
    mistake("bzg6-20", "I am a teacher and I have hungry now.", "have", "am", {
      en: "I am hungry.",
      es: "I am hungry. Hambre, sueño, frío y calor van con be.",
    }, DETECTIVE),
  ],
};
