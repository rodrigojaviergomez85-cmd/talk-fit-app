import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC ZERO · Día 14 — Adjectives with be (shy, hardworking, intelligent,
 * honest, funny) · Is she shy? Yes, she is / No, she isn't.
 * (Semana 3, día 4: ADJECTIVES / VERB TO BE)
 * 8 ancla · 6 transferencia · 4 repaso · 2 trampas.
 */
const DETECTIVE = "Andrés describió a su amigo. Toca la palabra equivocada.";
const CHISME = "Andrés dijo la frase en desorden. Ordénala.";

export const BASIC_ZERO_DAY_14: GrammarQuiz = {
  moduleId: "basic-zero",
  day: 14,
  title: { en: "He Is Funny", es: "Él es gracioso" },
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
    mc("bzg14-4", "My parents ___ very funny.", "Mis papás son muy graciosos.", ["are", "is", "am"], 0, {
      en: "parents (they): are.",
      es: "parents = they → are.",
    }),
    mistake("bzg14-5", "He is intelligents and hardworking.", "intelligents", "intelligent", {
      en: "Adjectives never take -s.",
      es: "intelligent: los adjetivos nunca llevan -s en inglés, ni con plural.",
    }, DETECTIVE),
    mistake("bzg14-6", "Is she shy? No, she not.", "not.", "isn't.", {
      en: "No, she isn't.",
      es: "No, she isn't. El no corto lleva el verbo: isn't.",
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
    mc("bzg14-9", "Are your friends hardworking? · Yes, they ___.", "¿Tus amigos son trabajadores? · Sí.", ["are", "is", "do"], 0, {
      en: "Yes, they are.",
      es: "they → are.",
    }),
    mc("bzg14-10", "Is Lucia funny? · No, she ___. She is serious.", "¿Lucía es graciosa? · No. Es seria.", ["isn't", "aren't", "doesn't"], 0, {
      en: "No, she isn't.",
      es: "she → isn't.",
    }),
    mc("bzg14-11", "I am shy, but my sister ___ not shy.", "Soy tímido, pero mi hermana no es tímida.", ["is", "are", "am"], 0, {
      en: "my sister is not.",
      es: "my sister = she → is not.",
    }),
    mistake("bzg14-12", "My brothers is very intelligent.", "is", "are", {
      en: "brothers: are.",
      es: "brothers es plural → are.",
    }, DETECTIVE),
    rearrange(
      "bzg14-13",
      ["honest", "are", "My parents", "and funny"],
      ["My parents", "are", "honest", "and funny"],
      { en: "My parents + are + adjective + and + adjective.", es: "My parents + are + adjetivo + and + adjetivo." },
      CHISME,
    ),
    rearrange(
      "bzg14-14",
      ["they", "hardworking?", "Are"],
      ["Are", "they", "hardworking?"],
      { en: "Are + they + adjective?", es: "Are + they + adjetivo?" },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("bzg14-15", "This is my friend Jorge. ___ is 27 and ___ eyes are brown.", "Este es mi amigo Jorge. Tiene 27 y sus ojos son cafés.", ["He / his", "She / her", "He / her"], 0, {
      en: "Jorge → he, his.",
      es: "Jorge → He is, his eyes.",
    }),
    mc("bzg14-16", "The dog is mine and the cat is ___. (Ana)", "El perro es mío y el gato es de ella (Ana).", ["hers", "her", "his"], 0, {
      en: "Ana → hers.",
      es: "Ana → hers, al final.",
    }),
    mistake("bzg14-17", "My friend have 27 years old.", "have", "is", {
      en: "He is 27.",
      es: "My friend is 27 years old.",
    }, DETECTIVE),
    mistake("bzg14-18", "Jorge is a honest person.", "a", "an", {
      en: "an honest: the h is silent.",
      es: "an honest person: la h no suena, así que va an.",
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
