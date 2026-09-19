import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 1 · Día 12 — My promises: I promise I'll · I won't give up.
 * 8 ancla · 4 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Carlos escribió sus promesas. Toca la palabra equivocada.";
const CHISME = "Carlos dijo la frase en desorden. Ordénala.";

export const SIMPLE_FUTURE_DAY_12: GrammarQuiz = {
  moduleId: "simple-future",
  day: 12,
  title: { en: "My Promises", es: "Mis promesas" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("sfg12-1", "I promise ___ practice English every day.", "Prometo que voy a practicar inglés todos los días.", ["I'll", "I", "I'm"], 0, {
      en: "I promise I'll: promise.",
      es: "I promise I'll: promesa con will.",
    }),
    mc("sfg12-2", "I'll ___ for five minutes every morning.", "Voy a hablar cinco minutos cada mañana.", ["speak", "speaking", "speaks"], 0, {
      en: "will + speak.",
      es: "Después de will, verbo solo: speak.",
    }),
    mc("sfg12-3", "I ___ give up when it's difficult.", "No me voy a rendir cuando sea difícil.", ["won't", "don't", "no"], 0, {
      en: "won't = will not.",
      es: "won't give up: no me rendiré.",
    }),
    mc("sfg12-4", "I'll be more patient with ___.", "Voy a ser más paciente conmigo mismo.", ["myself", "me", "my"], 0, {
      en: "with myself.",
      es: "with myself: conmigo mismo.",
    }),
    mistake("sfg12-5", "I'll helps my family more this month.", "helps", "help", {
      en: "I'll help.",
      es: "will + help, sin -s.",
    }, DETECTIVE),
    mistake("sfg12-6", "I promise I'll calling my parents every week.", "calling", "call", {
      en: "I'll call.",
      es: "Después de will, verbo solo: call.",
    }, DETECTIVE),
    rearrange(
      "sfg12-7",
      ["I don't have time", "say", "I won't"],
      ["I won't", "say", "I don't have time"],
      { en: "I won't + say + what.", es: "I won't + say + qué." },
      CHISME,
    ),
    rearrange(
      "sfg12-8",
      ["my promises", "keep", "I'll"],
      ["I'll", "keep", "my promises"],
      { en: "I'll + verb + object.", es: "I'll + verbo + objeto." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("sfg12-9", "Carlos promises ___ practice every day.", "Carlos promete que va a practicar todos los días.", ["he'll", "his", "he"], 0, {
      en: "he'll = he will.",
      es: "he'll = he will practice.",
    }),
    mc("sfg12-10", "My sister and I promise we ___ speak English at home.", "Mi hermana y yo prometemos que vamos a hablar inglés en casa.", ["will", "are", "going"], 0, {
      en: "we will speak.",
      es: "we will: will es igual para todas las personas.",
    }),
    mistake("sfg12-11", "Sofia promises she will practices every morning.", "practices", "practice", {
      en: "will practice.",
      es: "will + practice, sin -s, aunque sea she.",
    }, DETECTIVE),
    rearrange(
      "sfg12-12",
      ["give up", "won't", "Carlos"],
      ["Carlos", "won't", "give up"],
      { en: "Name + won't + verb.", es: "Nombre + won't + verbo." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("sfg12-13", "Someone is at the door. ___ open it.", "Alguien está en la puerta. Yo abro.", ["I'll", "I'm going to", "I"], 0, {
      en: "decision now: I'll.",
      es: "Decisión del momento → I'll. Repaso del día 11.",
    }),
    mc("sfg12-14", "My parents are 55. ___ from Guatemala.", "Mis papás tienen 55. Son de Guatemala.", ["They're", "Their", "There"], 0, {
      en: "They're = They are.",
      es: "They're from: son de.",
    }),
    mistake("sfg12-15", "I have 30 years old and I'm from Honduras.", "have", "am", {
      en: "I am 30.",
      es: "I am 30 years old.",
    }, DETECTIVE),
    mistake("sfg12-16", "My parents is going to visit me in December.", "is", "are", {
      en: "parents: are.",
      es: "my parents → are going to. Repaso del día 10.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("sfg12-17", "___ five minutes for practice every morning.", "Hay cinco minutos para practicar cada mañana.", ["There are", "There is", "They are"], 0, {
      en: "five minutes: there are.",
      es: "there are: hay, plural.",
    }),
    mc("sfg12-18", "How ___ minutes are you going to practice? · Five.", "¿Cuántos minutos vas a practicar? · Cinco.", ["many", "much", "long"], 0, {
      en: "How many + minutes.",
      es: "How many con cosas que se cuentan.",
    }),
    mistake("sfg12-19", "I need practice more with my family.", "need", "need to", {
      en: "need to practice.",
      es: "need to + verbo.",
    }, DETECTIVE),
    mistake("sfg12-20", "I'll call my parents in Sunday.", "in", "on", {
      en: "on Sunday.",
      es: "on con los días.",
    }, DETECTIVE),
  ],
};
