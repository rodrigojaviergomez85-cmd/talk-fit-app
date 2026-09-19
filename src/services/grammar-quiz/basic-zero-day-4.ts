import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC ZERO · Día 4 — Live / work / study · numbers and prices.
 * (Semana 1, día 4: PRICES + LIVE/WORK/STUDY)
 * 8 ancla · 6 transferencia · 4 repaso (días 1-3) · 2 trampas.
 */
const DETECTIVE = "Valeria escribió dónde vive y trabaja. Toca la palabra equivocada.";
const CHISME = "Valeria dijo la frase en desorden. Ordénala.";

export const BASIC_ZERO_DAY_4: GrammarQuiz = {
  moduleId: "basic-zero",
  day: 4,
  title: { en: "I Live, I Work, I Study", es: "Vivo, trabajo, estudio" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("bzg4-1", "I ___ in Lima.", "Vivo en Lima.", ["live", "am live", "lives"], 0, {
      en: "I live in.",
      es: "I live in Lima. live sin nada antes.",
    }),
    mc("bzg4-2", "I ___ at a call center.", "Trabajo en un call center.", ["work", "am work", "works"], 0, {
      en: "I work at.",
      es: "I work at a call center.",
    }),
    mc("bzg4-3", "I ___ English at night.", "Estudio inglés en la noche.", ["study", "am study", "studies"], 0, {
      en: "I study.",
      es: "I study English.",
    }),
    mc("bzg4-4", "Where do you ___?", "¿Dónde vives?", ["live", "lives", "living"], 0, {
      en: "Where do you live?",
      es: "Where do you live? Después de do, el verbo va solo.",
    }),
    mistake("bzg4-5", "I lives in Lima.", "lives", "live", {
      en: "I live.",
      es: "I live. La -s no va con I.",
    }, DETECTIVE),
    mistake("bzg4-6", "I study English in the night.", "in", "at", {
      en: "at night.",
      es: "at night: en la noche. «In the night» es calco.",
    }, DETECTIVE),
    rearrange(
      "bzg4-7",
      ["in Lima", "I", "live"],
      ["I", "live", "in Lima"],
      { en: "I + live + in + city.", es: "I + live + in + ciudad." },
      CHISME,
    ),
    rearrange(
      "bzg4-8",
      ["at a call center", "work", "I"],
      ["I", "work", "at a call center"],
      { en: "I + work + at + place.", es: "I + work + at + lugar." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("bzg4-9", "Where do you work? · I ___ at a hospital.", "¿Dónde trabajas? · Trabajo en un hospital.", ["work", "am work", "works"], 0, {
      en: "I work at.",
      es: "I work at a hospital.",
    }),
    mc("bzg4-10", "I live ___ San Salvador.", "Vivo en San Salvador.", ["in", "on", "at"], 0, {
      en: "live in + city.",
      es: "live in: para ciudades y países siempre in.",
    }),
    mc("bzg4-11", "The book is ___ dollars.", "El libro cuesta diez dólares.", ["ten", "tens", "ten of"], 0, {
      en: "ten dollars.",
      es: "ten dollars. El número no cambia.",
    }),
    mistake("bzg4-12", "I study English on the university.", "on", "at", {
      en: "at the university.",
      es: "at the university. Para el lugar donde estudiás, at.",
    }, DETECTIVE),
    rearrange(
      "bzg4-13",
      ["do you", "Where", "live?"],
      ["Where", "do you", "live?"],
      { en: "Where + do you + live?", es: "Where + do you + live?" },
      CHISME,
    ),
    rearrange(
      "bzg4-14",
      ["English", "study", "I", "at night"],
      ["I", "study", "English", "at night"],
      { en: "I + study + English + when.", es: "I + study + English + cuándo." },
      CHISME,
    ),

    // ── Repaso de los días 1 a 3 ───────────────────────────────────────────
    mc("bzg4-15", "My name is Valeria. I ___ 19 years old.", "Me llamo Valeria. Tengo 19 años.", ["am", "have", "is"], 0, {
      en: "I am 19.",
      es: "La edad con am.",
    }),
    mc("bzg4-16", "Valeria and Carlos ___ students.", "Valeria y Carlos son estudiantes.", ["are", "is", "am"], 0, {
      en: "They are.",
      es: "Dos personas → are.",
    }),
    mistake("bzg4-17", "I am of Peru.", "of", "from", {
      en: "from.",
      es: "I am from Peru.",
    }, DETECTIVE),
    mistake("bzg4-18", "My favorite color are yellow.", "are", "is", {
      en: "It is.",
      es: "Un color → is.",
    }, DETECTIVE),

    // ── Trampas ────────────────────────────────────────────────────────────
    mc("bzg4-19", "I ___ in a small house.", "Vivo en una casa pequeña.", ["live", "am living in", "live in"], 0, {
      en: "I live in a small house.",
      es: "I live + in a small house. Con «live in» repetirías el in.",
    }),
    mistake("bzg4-20", "I work in a call center of San Salvador.", "of", "in", {
      en: "a call center in San Salvador.",
      es: "a call center in San Salvador. «Of» es calco de «de».",
    }, DETECTIVE),
  ],
};
