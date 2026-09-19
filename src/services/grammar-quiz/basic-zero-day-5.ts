import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC ZERO · Día 5 — Weekly evaluation: my introduction (semana 1).
 * (Semana 1, día 5: COACHING DAY / WEEKLY EVALUATION)
 * Todo lo de la semana: name, from, be, age, color, live/work/study.
 * 8 ancla · 6 transferencia · 4 repaso · 2 trampas.
 */
const DETECTIVE = "Andrés escribió su presentación completa. Toca la palabra equivocada.";
const CHISME = "Andrés dijo la frase en desorden. Ordénala.";

export const BASIC_ZERO_DAY_5: GrammarQuiz = {
  moduleId: "basic-zero",
  day: 5,
  title: { en: "My Introduction, Week 1", es: "Mi presentación, semana 1" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("bzg5-1", "Hello! My name ___ Andres.", "¡Hola! Me llamo Andrés.", ["is", "am", "are"], 0, {
      en: "My name is.",
      es: "My name is.",
    }),
    mc("bzg5-2", "I ___ 26 years old.", "Tengo 26 años.", ["am", "have", "is"], 0, {
      en: "I am 26.",
      es: "La edad con am.",
    }),
    mc("bzg5-3", "I ___ from Ecuador.", "Soy de Ecuador.", ["am", "is", "are"], 0, {
      en: "I am from.",
      es: "I am from Ecuador.",
    }),
    mc("bzg5-4", "I ___ in Quito.", "Vivo en Quito.", ["live", "am live", "lives"], 0, {
      en: "I live in.",
      es: "I live in Quito.",
    }),
    mistake("bzg5-5", "My favorite color are green.", "are", "is", {
      en: "It is.",
      es: "Un color → is.",
    }, DETECTIVE),
    mistake("bzg5-6", "I have 26 years old.", "have", "am", {
      en: "I am 26.",
      es: "I am 26 years old. Nunca have.",
    }, DETECTIVE),
    rearrange(
      "bzg5-7",
      ["from Ecuador", "I am", "and I live in Quito"],
      ["I am", "from Ecuador", "and I live in Quito"],
      { en: "I am from + and I live in.", es: "I am from + and I live in." },
      CHISME,
    ),
    rearrange(
      "bzg5-8",
      ["at a bank", "I", "work"],
      ["I", "work", "at a bank"],
      { en: "I + work + at.", es: "I + work + at." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("bzg5-9", "Hi! I ___ Lucia. I ___ from Spain.", "¡Hola! Soy Lucía. Soy de España.", ["am / am", "is / am", "am / is"], 0, {
      en: "I am, I am.",
      es: "I → am, las dos veces.",
    }),
    mc("bzg5-10", "Lucia ___ 31 years old and she ___ in Valencia.", "Lucía tiene 31 años y vive en Valencia.", ["is / lives", "has / live", "is / live"], 0, {
      en: "She is 31, she lives.",
      es: "she → is 31, she → lives, con -s.",
    }),
    mc("bzg5-11", "Where ___ you live? · I live in Lima.", "¿Dónde vives? · Vivo en Lima.", ["do", "are", "is"], 0, {
      en: "Where do you live?",
      es: "Where do you live? Con do, porque live es un verbo de acción.",
    }),
    mistake("bzg5-12", "Paola work at a call center.", "work", "works", {
      en: "Paola = she: works.",
      es: "Paola = she → works, con -s.",
    }, DETECTIVE),
    rearrange(
      "bzg5-13",
      ["is", "31 years old", "Lucia"],
      ["Lucia", "is", "31 years old"],
      { en: "Name + is + age.", es: "Nombre + is + edad." },
      CHISME,
    ),
    rearrange(
      "bzg5-14",
      ["do you", "Where", "work?"],
      ["Where", "do you", "work?"],
      { en: "Where + do you + work?", es: "Where + do you + work?" },
      CHISME,
    ),

    // ── Repaso de la semana ────────────────────────────────────────────────
    mc("bzg5-15", "Nice to ___ you, Andres.", "Mucho gusto, Andrés.", ["meet", "see", "know"], 0, {
      en: "Nice to meet you.",
      es: "Nice to meet you.",
    }),
    mc("bzg5-16", "Andres and Paola ___ from Ecuador and Honduras.", "Andrés y Paola son de Ecuador y Honduras.", ["are", "is", "am"], 0, {
      en: "They are.",
      es: "Dos personas → are.",
    }),
    mistake("bzg5-17", "Where is you from?", "is", "are", {
      en: "Where are you from?",
      es: "you → are.",
    }, DETECTIVE),
    mistake("bzg5-18", "I am of Ecuador and I live in Quito.", "of", "from", {
      en: "from.",
      es: "I am from Ecuador.",
    }, DETECTIVE),

    // ── Trampas ────────────────────────────────────────────────────────────
    mc("bzg5-19", "How old ___ Paola? · She ___ 24.", "¿Cuántos años tiene Paola? · Tiene 24.", ["is / is", "has / has", "is / has"], 0, {
      en: "How old is she? She is 24.",
      es: "La edad siempre con is: How old is Paola? She is 24.",
    }),
    mistake("bzg5-20", "I live on Quito and I work at a bank.", "on", "in", {
      en: "live in + city.",
      es: "live in Quito. Para ciudades, in. (work at sí está bien.)",
    }, DETECTIVE),
  ],
};
