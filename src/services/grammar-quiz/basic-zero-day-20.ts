import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC ZERO · Día 20 — Final challenge: tell me about yourself and about
 * someone else. Todo el nivel en un examen fácil.
 * (Semana 4, día 5: BASIC ZERO — FINAL CHALLENGE)
 * 10 ítems: ancla + transferencia + trampas. Aprueba con 7 de 10.
 */
const DETECTIVE = "Carlos escribió su presentación final. Toca la palabra equivocada.";
const CHISME = "Carlos dijo la frase en desorden. Ordénala.";

export const BASIC_ZERO_DAY_20: GrammarQuiz = {
  moduleId: "basic-zero",
  day: 20,
  title: { en: "Me and Someone Important", es: "Yo y alguien importante" },
  passScore: 7,
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("bzg20-1", "My name ___ Carlos. I ___ 22 years old.", "Me llamo Carlos. Tengo 22 años.", ["is / am", "am / have", "is / have"], 0, {
      en: "My name is; I am 22.",
      es: "My name is, I am 22. Nombre con is, edad con am.",
    }),
    mc("bzg20-2", "I ___ from El Salvador and I ___ in San Salvador.", "Soy de El Salvador y vivo en San Salvador.", ["am / live", "am / lives", "is / live"], 0, {
      en: "I am; I live.",
      es: "I am from, I live in. Sin -s.",
    }),
    mc("bzg20-3", "My favorite color ___ blue and my favorite food ___ pizza.", "Mi color favorito es el azul y mi comida favorita es la pizza.", ["is / is", "are / is", "is / are"], 0, {
      en: "is, is.",
      es: "color → is, food → is.",
    }),
    mistake("bzg20-5", "I have 22 years old and I am a student.", "have", "am", {
      en: "I am 22.",
      es: "I am 22 years old. La edad con am.",
    }, DETECTIVE),
    rearrange(
      "bzg20-7",
      ["a student", "I am", "and I live in San Salvador"],
      ["I am", "a student", "and I live in San Salvador"],
      { en: "I am + a student + and I live in.", es: "I am + a student + and I live in." },
      CHISME,
    ),
    rearrange(
      "bzg20-8",
      ["is", "my sister", "This", "Ana"],
      ["This", "is", "my sister", "Ana"],
      { en: "This + is + my sister + name.", es: "This + is + my sister + nombre." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("bzg20-10", "My parents ___ from Peru. ___ names are Pedro and Rosa, and I love ___.", "Mis papás son de Perú. Sus nombres son Pedro y Rosa, y los quiero.", ["are / Their / them", "is / His / they", "are / Their / they"], 0, {
      en: "are, their, them.",
      es: "parents → are; their names; I love them.",
    }),
    mistake("bzg20-12", "My best friend is a artist and he is very funny.", "a", "an", {
      en: "an artist.",
      es: "an artist: vocal.",
    }, DETECTIVE),


    // ── Trampas ────────────────────────────────────────────────────────────
    mc("bzg20-19", "Overall, I am ___ friendly and positive person.", "En general, soy una persona amable y positiva.", ["a", "an", "the"], 0, {
      en: "a friendly person.",
      es: "a friendly and positive person: person pide a, y friendly empieza con consonante.",
    }),
    mistake("bzg20-20", "I am a friendly person and my sister is friendly too. I love she.", "she.", "her.", {
      en: "I love her.",
      es: "I love her. Después del verbo va her, no she.",
    }, DETECTIVE),
  ],
};
