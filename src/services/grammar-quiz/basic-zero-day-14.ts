import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC ZERO · Día 14 — Adjectives with be (shy, hardworking, intelligent,
 * honest, funny) · Is she shy? Yes, she is / No, she isn't.
 * (Semana 3, día 4: ADJECTIVES / VERB TO BE)
 * 10 ítems: ancla + transferencia + trampas. Aprueba con 7 de 10.
 */
const DETECTIVE = "Andrés describió a su amigo. Toca la palabra equivocada.";
const CHISME = "Andrés dijo la frase en desorden. Ordénala.";

export const BASIC_ZERO_DAY_14: GrammarQuiz = {
  moduleId: "basic-zero",
  day: 14,
  title: { en: "He Is Funny", es: "Él es gracioso" },
  passScore: 7,
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("bzg14-1", "My friend Jorge ___ intelligent and hardworking.", "Mi amigo Jorge es inteligente y trabajador.", ["is", "are", "have"], 0, {
      en: "He is + adjective.",
      es: "Jorge = he → is + adjetivo.",
    }),
    mc("bzg14-2", "___ she shy? · No, she isn't. She is funny.", "¿Es tímida? · No. Es graciosa.", ["Is", "Are", "Does"], 0, {
      en: "Is she shy?",
      es: "she → Is.",
    }),
    mc("bzg14-3", "Are you honest? · Yes, I ___.", "¿Eres honesto? · Sí.", ["am", "is", "do"], 0, {
      en: "Yes, I am.",
      es: "Yes, I am.",
    }),
    mistake("bzg14-5", "He is intelligents and hardworking.", "intelligents", "intelligent", {
      en: "Adjectives never take -s.",
      es: "intelligent: los adjetivos nunca llevan -s en inglés, ni con plural.",
    }, DETECTIVE),
    rearrange(
      "bzg14-7",
      ["funny", "is", "She"],
      ["She", "is", "funny"],
      { en: "She + is + adjective.", es: "She + is + adjetivo." },
      CHISME,
    ),
    rearrange(
      "bzg14-8",
      ["shy?", "Is", "he"],
      ["Is", "he", "shy?"],
      { en: "Is + he + adjective?", es: "Is + he + adjetivo?" },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("bzg14-10", "Is Lucia funny? · No, she ___. She is serious.", "¿Lucía es graciosa? · No. Es seria.", ["isn't", "aren't", "doesn't"], 0, {
      en: "No, she isn't.",
      es: "she → isn't.",
    }),
    mistake("bzg14-12", "My brothers is very intelligent.", "is", "are", {
      en: "brothers: are.",
      es: "brothers es plural → are.",
    }, DETECTIVE),


    // ── Trampas ────────────────────────────────────────────────────────────
    mc("bzg14-19", "Jorge is ___ intelligent person.", "Jorge es una persona inteligente.", ["an", "a", "the"], 0, {
      en: "an intelligent person.",
      es: "an intelligent person: intelligent empieza con vocal, y person pide a/an.",
    }),
    mistake("bzg14-20", "She is very funny and very intelligents.", "intelligents.", "intelligent.", {
      en: "No -s on adjectives.",
      es: "intelligent, sin -s. Los adjetivos no cambian nunca.",
    }, DETECTIVE),
  ],
};
