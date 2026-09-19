import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 1 · Día 5 — My plans challenge: repaso de la semana (tonight, tomorrow,
 * weekend, next month). 8 ancla · 4 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Andrés escribió sus planes de la semana. Toca la palabra equivocada.";
const CHISME = "Andrés dijo la frase en desorden. Ordénala.";

export const SIMPLE_FUTURE_DAY_5: GrammarQuiz = {
  moduleId: "simple-future",
  day: 5,
  title: { en: "My Plans Challenge", es: "Reto: mis planes" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("sfg5-1", "Tonight, I'm going to ___ at home.", "Esta noche voy a descansar en casa.", ["relax", "relaxing", "relaxes"], 0, {
      en: "going to relax.",
      es: "going to + relax, verbo solo.",
    }),
    mc("sfg5-2", "Tomorrow, I'm going to work ___ day.", "Mañana voy a trabajar todo el día.", ["all", "every", "whole"], 0, {
      en: "all day.",
      es: "all day: todo el día.",
    }),
    mc("sfg5-3", "I'm going to study English ___ work.", "Voy a estudiar inglés después del trabajo.", ["after", "later", "then"], 0, {
      en: "after work.",
      es: "after work: después del trabajo.",
    }),
    mc("sfg5-4", "___ month, I'm going to take a short trip.", "El próximo mes voy a hacer un viaje corto.", ["Next", "Other", "Following"], 0, {
      en: "next month.",
      es: "next month: el próximo mes.",
    }),
    mistake("sfg5-5", "This weekend I'm going to seeing my friends.", "seeing", "see", {
      en: "going to see.",
      es: "Después de going to, verbo solo: see.",
    }, DETECTIVE),
    mistake("sfg5-6", "My plans is going to keep me busy.", "is", "are", {
      en: "plans = they: are.",
      es: "My plans es plural → are going to.",
    }, DETECTIVE),
    rearrange(
      "sfg5-7",
      ["to a restaurant", "go", "We're going to"],
      ["We're going to", "go", "to a restaurant"],
      { en: "We're going to + go + place.", es: "We're going to + go + lugar." },
      CHISME,
    ),
    rearrange(
      "sfg5-8",
      ["stay in bed", "all day", "I'm not going to"],
      ["I'm not going to", "stay in bed", "all day"],
      { en: "I'm not going to + verb + time.", es: "I'm not going to + verbo + tiempo." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("sfg5-9", "Tonight, my mom ___ going to relax at home.", "Esta noche mi mamá va a descansar en casa.", ["is", "are", "am"], 0, {
      en: "my mom = she: is.",
      es: "my mom → is going to.",
    }),
    mc("sfg5-10", "Andres and I ___ going to study English after work.", "Andrés y yo vamos a estudiar inglés después del trabajo.", ["are", "am", "is"], 0, {
      en: "Andres and I = we: are.",
      es: "Andres and I = we → are going to.",
    }),
    mistake("sfg5-11", "Next month my parents are going to takes a short trip.", "takes", "take", {
      en: "going to take.",
      es: "going to + take, verbo solo, aunque sea they.",
    }, DETECTIVE),
    rearrange(
      "sfg5-12",
      ["is going to", "all day", "work", "Carlos"],
      ["Carlos", "is going to", "work", "all day"],
      { en: "Name + is going to + verb + time.", es: "Nombre + is going to + verbo + tiempo." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("sfg5-13", "Andres is 30 years old. ___ from Colombia.", "Andrés tiene 30 años. Es de Colombia.", ["He's", "His", "He"], 0, {
      en: "He is from.",
      es: "He's = He is: es de. His es «su».",
    }),
    mc("sfg5-14", "I ___ a brother and a sister.", "Tengo un hermano y una hermana.", ["have", "has", "am"], 0, {
      en: "I have.",
      es: "I have: tengo. Has es para he/she.",
    }),
    mistake("sfg5-15", "My sister have 25 years old.", "have", "is", {
      en: "She is 25.",
      es: "My sister is 25 years old: la edad va con be.",
    }, DETECTIVE),
    mistake("sfg5-16", "Tonight I going to go home early.", "going", "am going", {
      en: "I am going to.",
      es: "Falta el am: I am going to go.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("sfg5-17", "___ many people at the restaurant on Saturdays.", "Hay mucha gente en el restaurante los sábados.", ["There are", "There is", "They are"], 0, {
      en: "many people: there are.",
      es: "there are: hay, plural.",
    }),
    mc("sfg5-18", "What time are you going to wake up? · ___ six.", "¿A qué hora te vas a despertar? · A las seis.", ["At", "In", "On"], 0, {
      en: "at six.",
      es: "at con la hora.",
    }),
    mistake("sfg5-19", "I need study English after work.", "need", "need to", {
      en: "need to study.",
      es: "need to + verbo.",
    }, DETECTIVE),
    mistake("sfg5-20", "The restaurant is close from my office.", "from", "to", {
      en: "close to my office.",
      es: "close to: cerca de. «Close from» es calco.",
    }, DETECTIVE),
  ],
};
