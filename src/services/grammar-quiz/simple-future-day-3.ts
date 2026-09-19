import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 1 · Día 3 — This weekend: going to + días (on Saturday) · we're going to.
 * 8 ancla · 4 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Daniel escribió su fin de semana. Toca la palabra equivocada.";
const CHISME = "Daniel dijo la frase en desorden. Ordénala.";

export const SIMPLE_FUTURE_DAY_3: GrammarQuiz = {
  moduleId: "simple-future",
  day: 3,
  title: { en: "This Weekend", es: "Este fin de semana" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("sfg3-1", "This weekend, I'm going to ___ a lot.", "Este fin de semana voy a descansar mucho.", ["rest", "resting", "rests"], 0, {
      en: "going to rest.",
      es: "going to + rest, verbo solo.",
    }),
    mc("sfg3-2", "___ Saturday, I'm going to meet my friends.", "El sábado voy a ver a mis amigos.", ["On", "In", "At"], 0, {
      en: "on + day.",
      es: "on con los días: on Saturday.",
    }),
    mc("sfg3-3", "We ___ going to eat at a restaurant.", "Vamos a comer en un restaurante.", ["are", "is", "am"], 0, {
      en: "we are.",
      es: "we → are going to.",
    }),
    mc("sfg3-4", "It's going to be a ___ weekend.", "Va a ser un buen fin de semana.", ["good", "goods", "well"], 0, {
      en: "a good weekend.",
      es: "good, adjetivo, sin -s.",
    }),
    mistake("sfg3-5", "On Sunday, I'm going to staying home.", "staying", "stay", {
      en: "going to stay.",
      es: "Después de going to, verbo solo: stay.",
    }, DETECTIVE),
    mistake("sfg3-6", "I'm not going to working this weekend.", "working", "work", {
      en: "not going to work.",
      es: "going to work, verbo solo.",
    }, DETECTIVE),
    rearrange(
      "sfg3-7",
      ["go shopping", "In the afternoon,", "I'm going to"],
      ["In the afternoon,", "I'm going to", "go shopping"],
      { en: "Time + I'm going to + verb.", es: "Tiempo + I'm going to + verbo." },
      CHISME,
    ),
    rearrange(
      "sfg3-8",
      ["for one hour", "study English", "I'm going to"],
      ["I'm going to", "study English", "for one hour"],
      { en: "I'm going to + verb + how long.", es: "I'm going to + verbo + cuánto tiempo." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("sfg3-9", "This weekend, Lucia ___ going to visit her parents.", "Este fin de semana Lucía va a visitar a sus papás.", ["is", "are", "am"], 0, {
      en: "Lucia = she: is.",
      es: "Lucia → is going to.",
    }),
    mc("sfg3-10", "Andres and Paola ___ going to go to the beach.", "Andrés y Paola van a ir a la playa.", ["are", "is", "am"], 0, {
      en: "two people: are.",
      es: "Dos personas → are going to.",
    }),
    mistake("sfg3-11", "My brother are going to play soccer on Saturday.", "are", "is", {
      en: "my brother = he: is.",
      es: "my brother → is going to.",
    }, DETECTIVE),
    rearrange(
      "sfg3-12",
      ["on Sunday", "We're going to", "rest"],
      ["We're going to", "rest", "on Sunday"],
      { en: "We're going to + verb + day.", es: "We're going to + verbo + día." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("sfg3-13", "Tomorrow, I'm going to wake up ___ six ___ the morning.", "Mañana me voy a despertar a las seis de la mañana.", ["at / in", "in / at", "on / in"], 0, {
      en: "at six, in the morning.",
      es: "at con la hora, in con la parte del día. Repaso del día 2.",
    }),
    mc("sfg3-14", "Daniel is 35. He ___ in Medellín and he ___ an engineer.", "Daniel tiene 35. Vive en Medellín y es ingeniero.", ["lives / is", "live / is", "lives / has"], 0, {
      en: "lives, is.",
      es: "he → lives (con -s), is an engineer.",
    }),
    mistake("sfg3-15", "Tonight I going to relax at home.", "going", "am going", {
      en: "I am going to.",
      es: "Falta el am: I am going to relax.",
    }, DETECTIVE),
    mistake("sfg3-16", "These is my friends Andres and Paola.", "is", "are", {
      en: "These are.",
      es: "These are: plural.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("sfg3-17", "___ a good restaurant near my house.", "Hay un buen restaurante cerca de mi casa.", ["There is", "There are", "It is"], 0, {
      en: "one restaurant: there is.",
      es: "there is: hay, una cosa.",
    }),
    mc("sfg3-18", "What time is the movie? · It's at ___.", "¿A qué hora es la película? · Es a las siete y media.", ["seven thirty", "seven and half", "half seven"], 0, {
      en: "seven thirty.",
      es: "seven thirty: las siete y media. «Seven and half» es calco.",
    }),
    mistake("sfg3-19", "I want to go at the beach this weekend.", "at", "to", {
      en: "go to the beach.",
      es: "go to: ir a. Después de go va to.",
    }, DETECTIVE),
    mistake("sfg3-20", "We're going to eat in a restaurant of the city center.", "of", "in", {
      en: "a restaurant in the city center.",
      es: "in the city center. «Of the city center» es calco de «del centro».",
    }, DETECTIVE),
  ],
};
