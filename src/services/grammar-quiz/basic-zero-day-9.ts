import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC ZERO · Día 9 — Pronouns · singular / plural (man-men, child-children,
 * person-people) · this / that / these / those.
 * (Semana 2, día 4: PRONOUNS // THIS-THAT-THESE-THOSE)
 * 10 ítems: ancla + transferencia + trampas. Aprueba con 7 de 10.
 */
const DETECTIVE = "Paola escribió sus frases. Toca la palabra equivocada.";
const CHISME = "Paola dijo la frase en desorden. Ordénala.";

export const BASIC_ZERO_DAY_9: GrammarQuiz = {
  moduleId: "basic-zero",
  day: 9,
  title: { en: "This, That, These, Those", es: "This, that, these, those" },
  passScore: 7,
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("bzg9-1", "___ is an apple in my hand.", "Esta es una manzana en mi mano.", ["This", "These", "Those"], 0, {
      en: "this: one thing, near.",
      es: "this: una cosa, cerca.",
    }),
    mc("bzg9-2", "___ are apples in my hands.", "Estas son manzanas en mis manos.", ["These", "This", "That"], 0, {
      en: "these: many, near.",
      es: "these: varias cosas, cerca.",
    }),
    mc("bzg9-3", "___ is a man and ___ are men.", "Él es un hombre y ellos son hombres.", ["He / they", "He / he", "They / he"], 0, {
      en: "one man = he; men = they.",
      es: "un hombre = he; hombres = they. Y ojo: man → men, sin -s.",
    }),
    mistake("bzg9-5", "This are my books.", "This", "These", {
      en: "books, plural: these.",
      es: "books es plural → these.",
    }, DETECTIVE),
    rearrange(
      "bzg9-7",
      ["an apple", "This", "is"],
      ["This", "is", "an apple"],
      { en: "This + is + an apple.", es: "This + is + an apple." },
      CHISME,
    ),
    rearrange(
      "bzg9-8",
      ["are", "my friends", "Those"],
      ["Those", "are", "my friends"],
      { en: "Those + are + plural.", es: "Those + are + plural, lejos." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("bzg9-10", "Look at ___ car over there. It is red.", "Mirá ese carro allá. Es rojo.", ["that", "this", "these"], 0, {
      en: "that: one, far.",
      es: "that: uno, lejos (over there).",
    }),
    mistake("bzg9-12", "Sofia and Lucia are my friends. She are from Mexico and Spain.", "She", "They", {
      en: "Two people: they.",
      es: "Dos personas → They are.",
    }, DETECTIVE),

    // ── Trampas ────────────────────────────────────────────────────────────
    mc("bzg9-19", "___ people are my coworkers.", "Esas personas son mis compañeros de trabajo.", ["Those", "That", "This"], 0, {
      en: "people is plural: those.",
      es: "people es plural → those. that es para uno.",
    }),
    mistake("bzg9-20", "These is my favorite fruit.", "These", "This", {
      en: "one fruit: this.",
      es: "Una fruta → This is. these es para varias.",
    }, DETECTIVE),
  ],
};
