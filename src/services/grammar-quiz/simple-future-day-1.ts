import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 1 · Día 1 — Tonight: I'm going to + verb · I'm not going to.
 * Fácil: 3 opciones, frases cortas. 8 ancla · 4 transferencia · 4 repaso
 * (Basic Zero) · 4 básicos (there is / what time / want to / preposiciones).
 */
const DETECTIVE = "Carlos escribió sus planes de esta noche. Toca la palabra equivocada.";
const CHISME = "Carlos dijo la frase en desorden. Ordénala.";

export const SIMPLE_FUTURE_DAY_1: GrammarQuiz = {
  moduleId: "simple-future",
  day: 1,
  title: { en: "Tonight", es: "Esta noche" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("sfg1-1", "Tonight, I'm going ___ go home early.", "Esta noche voy a ir a casa temprano.", ["to", "for", "at"], 0, {
      en: "going to + verb.",
      es: "going to + verbo: voy a. Siempre con to.",
    }),
    mc("sfg1-2", "I'm going to ___ dinner with my family.", "Voy a cenar con mi familia.", ["eat", "eating", "eats"], 0, {
      en: "After going to: base verb.",
      es: "Después de going to, el verbo va solo: eat.",
    }),
    mc("sfg1-3", "I ___ going to work tonight.", "No voy a trabajar esta noche.", ["am not", "not", "no"], 0, {
      en: "I am not going to.",
      es: "I am not going to: el not va después de am.",
    }),
    mc("sfg1-4", "It's going to ___ a relaxed night.", "Va a ser una noche relajada.", ["be", "is", "being"], 0, {
      en: "going to be.",
      es: "going to be: va a ser. be en forma base.",
    }),
    mistake("sfg1-5", "I'm going to watching a movie tonight.", "watching", "watch", {
      en: "going to watch.",
      es: "Después de going to, el verbo va solo: watch.",
    }, DETECTIVE),
    mistake("sfg1-6", "I going to study English tonight.", "going", "am going", {
      en: "I am going to.",
      es: "Falta el am: I am going to study.",
    }, DETECTIVE),
    rearrange(
      "sfg1-7",
      ["go to bed", "I'm going to", "around eleven"],
      ["I'm going to", "go to bed", "around eleven"],
      { en: "I'm going to + verb + time.", es: "I'm going to + verbo + hora." },
      CHISME,
    ),
    rearrange(
      "sfg1-8",
      ["use my phone", "I'm not going to", "in bed"],
      ["I'm not going to", "use my phone", "in bed"],
      { en: "I'm not going to + verb + place.", es: "I'm not going to + verbo + lugar." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("sfg1-9", "Tonight, Sofia ___ going to cook pasta.", "Esta noche Sofía va a cocinar pasta.", ["is", "am", "are"], 0, {
      en: "Sofia = she: is going to.",
      es: "Sofia = she → is going to.",
    }),
    mc("sfg1-10", "We ___ going to watch a movie tonight.", "Vamos a ver una película esta noche.", ["are", "is", "am"], 0, {
      en: "we are going to.",
      es: "we → are going to.",
    }),
    mistake("sfg1-11", "Tonight my friends is going to visit me.", "is", "are", {
      en: "my friends = they: are going to.",
      es: "my friends → are going to. Plural.",
    }, DETECTIVE),
    rearrange(
      "sfg1-12",
      ["is going to", "Daniel", "relax at home", "tonight"],
      ["Daniel", "is going to", "relax at home", "tonight"],
      { en: "Name + is going to + verb + time.", es: "Nombre + is going to + verbo + tiempo." },
      CHISME,
    ),

    // ── Repaso de Basic Zero ───────────────────────────────────────────────
    mc("sfg1-13", "My name is Carlos. I ___ 22 years old and I ___ from El Salvador.", "Me llamo Carlos. Tengo 22 años y soy de El Salvador.", ["am / am", "have / am", "am / is"], 0, {
      en: "I am 22, I am from.",
      es: "La edad y el país, los dos con am.",
    }),
    mc("sfg1-14", "This is my sister. ___ name is Ana.", "Esta es mi hermana. Su nombre es Ana.", ["Her", "His", "She"], 0, {
      en: "sister → her.",
      es: "sister → Her name.",
    }),
    mistake("sfg1-15", "I have 22 years old.", "have", "am", {
      en: "I am 22.",
      es: "I am 22 years old.",
    }, DETECTIVE),
    mistake("sfg1-16", "My favorite food are pizza.", "are", "is", {
      en: "food → is.",
      es: "Una comida → is.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("sfg1-17", "___ a movie on TV tonight.", "Hay una película en la tele esta noche.", ["There is", "There are", "Is"], 0, {
      en: "one movie: there is.",
      es: "there is: hay, para una cosa.",
    }),
    mc("sfg1-18", "What time ___? · It's eight o'clock.", "¿Qué hora es? · Son las ocho.", ["is it", "it is", "are it"], 0, {
      en: "What time is it?",
      es: "What time is it? Pregunta: is antes de it.",
    }),
    mistake("sfg1-19", "I want go home early tonight.", "want", "want to", {
      en: "want to + verb.",
      es: "want to go: want siempre lleva to antes de otro verbo.",
    }, DETECTIVE),
    mistake("sfg1-20", "Tonight I'm going to stay in home.", "in", "at", {
      en: "stay at home.",
      es: "at home: en casa. «In home» es calco.",
    }, DETECTIVE),
  ],
};
