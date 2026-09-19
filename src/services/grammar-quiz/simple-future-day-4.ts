import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 1 · Día 4 — My next vacation: going to · we're · not going to.
 * 8 ancla · 4 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Valeria escribió sus vacaciones. Toca la palabra equivocada.";
const CHISME = "Valeria dijo la frase en desorden. Ordénala.";

export const SIMPLE_FUTURE_DAY_4: GrammarQuiz = {
  moduleId: "simple-future",
  day: 4,
  title: { en: "My Next Vacation", es: "Mis próximas vacaciones" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("sfg4-1", "Next year, I'm going to ___ a vacation.", "El próximo año voy a tomar vacaciones.", ["take", "taking", "takes"], 0, {
      en: "going to take.",
      es: "going to + take.",
    }),
    mc("sfg4-2", "I'm going to travel ___ the beach.", "Voy a viajar a la playa.", ["to", "at", "in"], 0, {
      en: "travel to.",
      es: "to: dirección, a dónde.",
    }),
    mc("sfg4-3", "We're going to stay ___ one week.", "Nos vamos a quedar una semana.", ["for", "during", "by"], 0, {
      en: "for + length of time.",
      es: "for one week: for con cantidad de tiempo. «During one week» es calco.",
    }),
    mc("sfg4-4", "I'm not going to ___ my work email.", "No voy a revisar mi correo del trabajo.", ["check", "checking", "checks"], 0, {
      en: "not going to check.",
      es: "going to + check, verbo solo.",
    }),
    mistake("sfg4-5", "I'm going to go with my family and we is going to stay one week.", "is", "are", {
      en: "we are.",
      es: "we → are going to.",
    }, DETECTIVE),
    mistake("sfg4-6", "It's going to be a amazing trip.", "a", "an", {
      en: "an amazing trip.",
      es: "an amazing: vocal.",
    }, DETECTIVE),
    rearrange(
      "sfg4-7",
      ["one small suitcase", "I'm going to", "pack"],
      ["I'm going to", "pack", "one small suitcase"],
      { en: "I'm going to + verb + object.", es: "I'm going to + verbo + objeto." },
      CHISME,
    ),
    rearrange(
      "sfg4-8",
      ["a lot of good food", "eat", "We're going to"],
      ["We're going to", "eat", "a lot of good food"],
      { en: "We're going to + verb + object.", es: "We're going to + verbo + objeto." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("sfg4-9", "Next month, my sister ___ going to travel to Mexico.", "El próximo mes mi hermana va a viajar a México.", ["is", "are", "am"], 0, {
      en: "my sister = she: is.",
      es: "my sister → is going to.",
    }),
    mc("sfg4-10", "My parents ___ going to stay in a hotel.", "Mis papás se van a quedar en un hotel.", ["are", "is", "am"], 0, {
      en: "parents: are.",
      es: "my parents → are going to.",
    }),
    mistake("sfg4-11", "Lucia and her husband is going to visit Spain.", "is", "are", {
      en: "two people: are.",
      es: "Dos personas → are going to.",
    }, DETECTIVE),
    rearrange(
      "sfg4-12",
      ["to the mountains", "is going to", "Carlos", "travel"],
      ["Carlos", "is going to", "travel", "to the mountains"],
      { en: "Name + is going to + verb + where.", es: "Nombre + is going to + verbo + a dónde." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("sfg4-13", "___ Saturday, I'm going to meet my friends ___ the afternoon.", "El sábado voy a ver a mis amigos en la tarde.", ["On / in", "In / on", "At / in"], 0, {
      en: "on Saturday, in the afternoon.",
      es: "on con el día, in con la parte del día.",
    }),
    mc("sfg4-14", "Valeria is 19. ___ is from Peru and ___ favorite food is ceviche.", "Valeria tiene 19. Es de Perú y su comida favorita es el ceviche.", ["She / her", "Her / she", "She / his"], 0, {
      en: "She is; her favorite.",
      es: "she antes del verbo, her antes del sustantivo.",
    }),
    mistake("sfg4-15", "This weekend I'm going to resting at home.", "resting", "rest", {
      en: "going to rest.",
      es: "going to + rest, verbo solo.",
    }, DETECTIVE),
    mistake("sfg4-16", "My family have 5 people.", "have", "has", {
      en: "my family = it: has.",
      es: "my family es singular → has.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("sfg4-17", "How ___ days are you going to stay? · Seven days.", "¿Cuántos días te vas a quedar? · Siete días.", ["many", "much", "long"], 0, {
      en: "How many + plural noun (days).",
      es: "How many con cosas que se cuentan: days.",
    }),
    mc("sfg4-18", "How ___ money are you going to take? · Two hundred dollars.", "¿Cuánto dinero vas a llevar? · Doscientos dólares.", ["much", "many", "long"], 0, {
      en: "How much + money (uncountable).",
      es: "How much con cosas que no se cuentan: money.",
    }),
    mistake("sfg4-19", "I want travel to the beach next year.", "want", "want to", {
      en: "want to travel.",
      es: "want to + verbo.",
    }, DETECTIVE),
    mistake("sfg4-20", "We're going to stay in a hotel close of the beach.", "of", "to", {
      en: "close to the beach.",
      es: "close to: cerca de. «Close of» es calco.",
    }, DETECTIVE),
  ],
};
