import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC ZERO · Día 9 — Pronouns · singular / plural (man-men, child-children,
 * person-people) · this / that / these / those.
 * (Semana 2, día 4: PRONOUNS // THIS-THAT-THESE-THOSE)
 * 8 ancla · 6 transferencia · 4 repaso · 2 trampas.
 */
const DETECTIVE = "Paola escribió sus frases. Toca la palabra equivocada.";
const CHISME = "Paola dijo la frase en desorden. Ordénala.";

export const BASIC_ZERO_DAY_9: GrammarQuiz = {
  moduleId: "basic-zero",
  day: 9,
  title: { en: "This, That, These, Those", es: "This, that, these, those" },
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
    mc("bzg9-4", "One person, two ___.", "Una persona, dos personas.", ["people", "persons", "peoples"], 0, {
      en: "person → people.",
      es: "person → people. El plural de persona es people.",
    }),
    mistake("bzg9-5", "This are my books.", "This", "These", {
      en: "books, plural: these.",
      es: "books es plural → these.",
    }, DETECTIVE),
    mistake("bzg9-6", "That are my car over there.", "are", "is", {
      en: "That is my car (one car).",
      es: "That is my car: un carro → is.",
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
    mc("bzg9-9", "___ is my mother, and ___ are my brothers.", "Esta es mi mamá, y estos son mis hermanos.", ["This / these", "These / this", "This / this"], 0, {
      en: "this (one), these (many).",
      es: "this para una persona, these para varias.",
    }),
    mc("bzg9-10", "Look at ___ car over there. It is red.", "Mirá ese carro allá. Es rojo.", ["that", "this", "these"], 0, {
      en: "that: one, far.",
      es: "that: uno, lejos (over there).",
    }),
    mc("bzg9-11", "One child, three ___.", "Un niño, tres niños.", ["children", "childs", "childrens"], 0, {
      en: "child → children.",
      es: "child → children. Sin -s.",
    }),
    mistake("bzg9-12", "Sofia and Lucia are my friends. She are from Mexico and Spain.", "She", "They", {
      en: "Two people: they.",
      es: "Dos personas → They are.",
    }, DETECTIVE),
    rearrange(
      "bzg9-13",
      ["my sister", "is", "That"],
      ["That", "is", "my sister"],
      { en: "That + is + person (far).", es: "That + is + persona, lejos." },
      CHISME,
    ),
    rearrange(
      "bzg9-14",
      ["are", "These", "my keys"],
      ["These", "are", "my keys"],
      { en: "These + are + plural (near).", es: "These + are + plural, cerca." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("bzg9-15", "Paola ___ a nurse. She ___ 24 years old.", "Paola es enfermera. Tiene 24 años.", ["is / is", "is / has", "are / is"], 0, {
      en: "She is a nurse, she is 24.",
      es: "she → is, las dos veces. La edad también con is.",
    }),
    mc("bzg9-16", "My favorite food ___ pupusas.", "Mi comida favorita son las pupusas.", ["is", "are", "am"], 0, {
      en: "food is singular: is.",
      es: "El sujeto es food → is, aunque pupusas sea plural.",
    }),
    mistake("bzg9-17", "My birthday is on April.", "on", "in", {
      en: "in April.",
      es: "Solo el mes → in.",
    }, DETECTIVE),
    mistake("bzg9-18", "Paola is a artist.", "a", "an", {
      en: "an artist.",
      es: "an artist: vocal.",
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
