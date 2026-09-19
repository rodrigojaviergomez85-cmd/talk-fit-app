import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 2 · Día 20 — What's happening? Reto final en el aeropuerto: -ing · rutina
 * vs ahora. 8 ancla · 4 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Rosa escribió lo que ve en el aeropuerto. Toca la palabra equivocada.";
const CHISME = "Rosa dijo la frase en desorden. Ordénala.";

export const SIMPLE_PRESENT_DAY_20: GrammarQuiz = {
  moduleId: "simple-present",
  day: 20,
  title: { en: "What's Happening?", es: "Reto final: ¿qué está pasando?" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("spg20-1", "A man is ___ his suitcase.", "Un hombre está jalando su maleta.", ["pulling", "pull", "pulls"], 0, {
      en: "is + pulling.",
      es: "is + pulling: está jalando.",
    }),
    mc("spg20-2", "A woman ___ checking her phone.", "Una mujer está revisando su teléfono.", ["is", "are", "am"], 0, {
      en: "a woman = she: is.",
      es: "A woman → is checking.",
    }),
    mc("spg20-3", "A family ___ waiting in the chairs.", "Una familia está esperando en las sillas.", ["is", "are", "am"], 0, {
      en: "a family = it: is.",
      es: "A family es singular → is waiting.",
    }),
    mc("spg20-4", "Two people are ___ goodbye.", "Dos personas se están abrazando para despedirse.", ["hugging", "hug", "hugs"], 0, {
      en: "hug → hugging.",
      es: "hug → hugging: se dobla la g.",
    }),
    mistake("spg20-5", "A worker is clean the floor.", "clean", "cleaning", {
      en: "is cleaning.",
      es: "is + cleaning: falta el -ing.",
    }, DETECTIVE),
    mistake("spg20-6", "A young man are buying coffee.", "are", "is", {
      en: "a young man = he: is.",
      es: "A young man → is buying.",
    }, DETECTIVE),
    rearrange(
      "spg20-7",
      ["to the agent at the desk", "is talking", "A woman"],
      ["A woman", "is talking", "to the agent at the desk"],
      { en: "Subject + is + verb-ing + to whom.", es: "Sujeto + is + verbo-ing + con quién." },
      CHISME,
    ),
    rearrange(
      "spg20-8",
      ["across the terminal", "is running", "A child"],
      ["A child", "is running", "across the terminal"],
      { en: "Subject + is + verb-ing + where.", es: "Sujeto + is + verbo-ing + por dónde." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("spg20-9", "I ___ waiting for my flight right now.", "Estoy esperando mi vuelo ahora mismo.", ["am", "is", "are"], 0, {
      en: "I am + -ing.",
      es: "I → am waiting.",
    }),
    mc("spg20-10", "Rosa and I ___ buying coffee.", "Rosa y yo estamos comprando café.", ["are", "is", "am"], 0, {
      en: "Rosa and I = we: are.",
      es: "we → are buying.",
    }),
    mistake("spg20-11", "My parents is checking their phones.", "is", "are", {
      en: "parents: are.",
      es: "my parents → are checking.",
    }, DETECTIVE),
    rearrange(
      "spg20-12",
      ["his suitcase", "near the door", "My brother is pulling"],
      ["My brother is pulling", "his suitcase", "near the door"],
      { en: "Subject + is + verb-ing + object + place.", es: "Sujeto + is + verbo-ing + objeto + lugar." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("spg20-13", "Rosa ___ to the airport twice a year. Today she ___ for a flight to Mexico.", "Rosa va al aeropuerto dos veces al año. Hoy está esperando un vuelo a México.", ["goes / is waiting", "is going / waits", "go / waiting"], 0, {
      en: "routine: goes; now: is waiting.",
      es: "Rutina → goes; ahora → is waiting.",
    }),
    mc("spg20-14", "___ your brother travel a lot? · No, he ___.", "¿Tu hermano viaja mucho? · No.", ["Does / doesn't", "Do / don't", "Is / isn't"], 0, {
      en: "Does he…? No, he doesn't.",
      es: "Does con he; respuesta corta doesn't. Repaso de la semana 1.",
    }),
    mistake("spg20-15", "Look at the sky! It are going to rain.", "are", "is", {
      en: "It is going to.",
      es: "It → is going to. Repaso de Basic 1.",
    }, DETECTIVE),
    mistake("spg20-16", "Rosa have 33 years old and she is from Nicaragua.", "have", "is", {
      en: "She is 33.",
      es: "Rosa is 33 years old.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("spg20-17", "___ a lot of people at the airport today.", "Hay mucha gente en el aeropuerto hoy.", ["There are", "There is", "They are"], 0, {
      en: "a lot of people: there are.",
      es: "there are: people es plural.",
    }),
    mc("spg20-18", "What time is your flight? · It's ___ three ___ the afternoon.", "¿A qué hora es tu vuelo? · A las tres de la tarde.", ["at / in", "in / at", "on / in"], 0, {
      en: "at three, in the afternoon.",
      es: "at con la hora, in con la parte del día.",
    }),
    mistake("spg20-19", "I want buy a coffee before my flight.", "want", "want to", {
      en: "want to buy.",
      es: "want to + verbo.",
    }, DETECTIVE),
    mistake("spg20-20", "The coffee shop is close of the gate.", "of", "to", {
      en: "close to the gate.",
      es: "close to: cerca de.",
    }, DETECTIVE),
  ],
};
