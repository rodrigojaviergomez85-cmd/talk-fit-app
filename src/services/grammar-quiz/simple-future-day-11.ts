import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 1 · Día 11 — I'll do it: decisiones del momento · I'll · I won't.
 * 8 ancla · 4 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Camila escribió lo que dijo en la oficina. Toca la palabra equivocada.";
const CHISME = "Camila dijo la frase en desorden. Ordénala.";

export const SIMPLE_FUTURE_DAY_11: GrammarQuiz = {
  moduleId: "simple-future",
  day: 11,
  title: { en: "I'll Do It", es: "Yo lo hago" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("sfg11-1", "The phone is ringing. ___ answer it.", "El teléfono está sonando. Yo contesto.", ["I'll", "I'm", "I"], 0, {
      en: "I'll = I will: decision now.",
      es: "I'll = I will: decisión del momento.",
    }),
    mc("sfg11-2", "Those bags look heavy. I'll ___ you.", "Esas bolsas se ven pesadas. Te ayudo.", ["help", "helping", "to help"], 0, {
      en: "will + base verb.",
      es: "Después de will, verbo solo: help.",
    }),
    mc("sfg11-3", "Don't worry, I ___ forget.", "No te preocupes, no se me olvida.", ["won't", "don't", "not"], 0, {
      en: "won't = will not.",
      es: "won't = will not: no lo voy a olvidar.",
    }),
    mc("sfg11-4", "You're tired. I'll ___.", "Estás cansado. Yo manejo.", ["drive", "drives", "driving"], 0, {
      en: "I'll drive.",
      es: "I'll + drive, verbo solo.",
    }),
    mistake("sfg11-5", "Someone is at the door. I'll opening it.", "opening", "open", {
      en: "I'll open.",
      es: "Después de will, verbo solo: open.",
    }, DETECTIVE),
    mistake("sfg11-6", "I'll calls you later today.", "calls", "call", {
      en: "I'll call.",
      es: "will + call, sin -s.",
    }, DETECTIVE),
    rearrange(
      "sfg11-7",
      ["late again", "I won't", "be"],
      ["I won't", "be", "late again"],
      { en: "I won't + be + adjective.", es: "I won't + be + adjetivo." },
      CHISME,
    ),
    rearrange(
      "sfg11-8",
      ["right now", "I'll", "do it"],
      ["I'll", "do it", "right now"],
      { en: "I'll + verb + object + time.", es: "I'll + verbo + objeto + tiempo." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("sfg11-9", "The phone is ringing. Tomas says: ___ answer it.", "El teléfono está sonando. Tomás dice: yo contesto.", ["I'll", "He'll", "I'm"], 0, {
      en: "Tomas speaks: I'll.",
      es: "Tomás habla de sí mismo → I'll.",
    }),
    mc("sfg11-10", "Camila is tired, so Tomas says: ___ drive.", "Camila está cansada, entonces Tomás dice: yo manejo.", ["I'll", "She'll", "I"], 0, {
      en: "Tomas offers: I'll drive.",
      es: "Tomás se ofrece → I'll drive.",
    }),
    mistake("sfg11-11", "Those bags look heavy. We'll helps you.", "helps", "help", {
      en: "We'll help.",
      es: "will + help, sin -s.",
    }, DETECTIVE),
    rearrange(
      "sfg11-12",
      ["the door", "open", "Tomas says he'll"],
      ["Tomas says he'll", "open", "the door"],
      { en: "he'll + verb + object.", es: "he'll + verbo + objeto." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("sfg11-13", "Camila ___ 26 years old and ___ works at a call center.", "Camila tiene 26 años y trabaja en un call center.", ["is / she", "has / she", "is / her"], 0, {
      en: "is 26; she works.",
      es: "Edad con be; she antes del verbo.",
    }),
    mc("sfg11-14", "My brother ___ going to start a new job next week.", "Mi hermano va a empezar un trabajo nuevo la próxima semana.", ["is", "are", "will"], 0, {
      en: "is going to.",
      es: "my brother → is going to. Repaso del día 10.",
    }),
    mistake("sfg11-15", "Tomorrow I'm going to waking up early.", "waking", "wake", {
      en: "going to wake up.",
      es: "going to + wake, verbo solo.",
    }, DETECTIVE),
    mistake("sfg11-16", "Camila have a car, so she drives to work.", "have", "has", {
      en: "she has.",
      es: "Camila = she → has.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("sfg11-17", "___ someone at the door.", "Hay alguien en la puerta.", ["There is", "There are", "Is"], 0, {
      en: "someone: there is.",
      es: "there is: hay, una persona.",
    }),
    mc("sfg11-18", "What time is it? · It's ___ past two.", "¿Qué hora es? · Son las dos y cuarto.", ["a quarter", "fifteen minutes", "quarter of"], 0, {
      en: "a quarter past two = 2:15.",
      es: "a quarter past two: las dos y cuarto.",
    }),
    mistake("sfg11-19", "I want help you with those bags.", "want", "want to", {
      en: "want to help.",
      es: "want to + verbo.",
    }, DETECTIVE),
    mistake("sfg11-20", "The bags are in the table.", "in", "on", {
      en: "on the table.",
      es: "on the table: encima de la mesa.",
    }, DETECTIVE),
  ],
};
