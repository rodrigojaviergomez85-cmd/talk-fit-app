import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 1 · Día 20 — Future fluency challenge: going to + will + if, todo junto.
 * 8 ancla · 4 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Rosa escribió su año nuevo en inglés. Toca la palabra equivocada.";
const CHISME = "Rosa dijo la frase en desorden. Ordénala.";

export const SIMPLE_FUTURE_DAY_20: GrammarQuiz = {
  moduleId: "simple-future",
  day: 20,
  title: { en: "Future Fluency Challenge", es: "Reto final: mi futuro" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("sfg20-1", "This year ___ change some things.", "Este año voy a cambiar algunas cosas.", ["I'm going to", "I'll to", "I going to"], 0, {
      en: "plan: I'm going to.",
      es: "Plan → I'm going to.",
    }),
    mc("sfg20-2", "I promise ___ practice even on hard days.", "Prometo que voy a practicar incluso en los días difíciles.", ["I'll", "I'm", "I"], 0, {
      en: "promise: I'll.",
      es: "Promesa → I'll.",
    }),
    mc("sfg20-3", "If someone speaks to me in English, ___ answer in English.", "Si alguien me habla en inglés, contesto en inglés.", ["I'll", "I'm going to", "I answer"], 0, {
      en: "if …, I'll.",
      es: "If + presente, I'll.",
    }),
    mc("sfg20-4", "I ___ be afraid of mistakes.", "No voy a tener miedo de los errores.", ["won't", "don't", "am not"], 0, {
      en: "won't be.",
      es: "won't = will not.",
    }),
    mistake("sfg20-5", "I'm not going to waiting until I feel ready.", "waiting", "wait", {
      en: "not going to wait.",
      es: "going to + wait, verbo solo.",
    }, DETECTIVE),
    mistake("sfg20-6", "I think my life will changes this year.", "changes", "change", {
      en: "will change.",
      es: "will + change, sin -s.",
    }, DETECTIVE),
    rearrange(
      "sfg20-7",
      ["at work every day", "speak English", "I'm going to"],
      ["I'm going to", "speak English", "at work every day"],
      { en: "I'm going to + verb + where + how often.", es: "I'm going to + verbo + dónde + cada cuánto." },
      CHISME,
    ),
    rearrange(
      "sfg20-8",
      ["with confidence", "I'm going to speak", "In one year,"],
      ["In one year,", "I'm going to speak", "with confidence"],
      { en: "Time + I'm going to + verb + how.", es: "Tiempo + I'm going to + verbo + cómo." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("sfg20-9", "This year my sister ___ going to change some things too.", "Este año mi hermana también va a cambiar algunas cosas.", ["is", "are", "will"], 0, {
      en: "my sister = she: is going to.",
      es: "my sister → is going to.",
    }),
    mc("sfg20-10", "Rosa promises ___ practice even on hard days.", "Rosa promete que va a practicar incluso en los días difíciles.", ["she'll", "she's", "her"], 0, {
      en: "she'll = she will.",
      es: "she'll practice: promesa de ella.",
    }),
    mistake("sfg20-11", "If someone speaks to us in English, we'll answers in English.", "answers", "answer", {
      en: "we'll answer.",
      es: "will + answer, sin -s.",
    }, DETECTIVE),
    rearrange(
      "sfg20-12",
      ["afraid of mistakes", "My coworkers", "won't be"],
      ["My coworkers", "won't be", "afraid of mistakes"],
      { en: "Subject + won't be + adjective.", es: "Sujeto + won't be + adjetivo." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("sfg20-13", "Look at the sky. ___ going to rain.", "Mira el cielo. Va a llover.", ["It's", "Its", "It"], 0, {
      en: "It's going to: evidence.",
      es: "It's = It is going to. Repaso del día 19.",
    }),
    mc("sfg20-14", "Oh, the phone! ___ answer it.", "¡Ah, el teléfono! Yo contesto.", ["I'll", "I'm going to", "I answer"], 0, {
      en: "decision now: I'll.",
      es: "Decisión del momento → I'll. Repaso del día 16.",
    }),
    mistake("sfg20-15", "Rosa have 33 years old and she is from Nicaragua.", "have", "is", {
      en: "She is 33.",
      es: "Rosa is 33 years old.",
    }, DETECTIVE),
    mistake("sfg20-16", "My coworkers is going to practice with me.", "is", "are", {
      en: "coworkers: are.",
      es: "my coworkers → are going to.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("sfg20-17", "___ twelve months in a year.", "Hay doce meses en un año.", ["There are", "There is", "They are"], 0, {
      en: "twelve months: there are.",
      es: "there are: hay, plural.",
    }),
    mc("sfg20-18", "How ___ English do you speak at work? · A little.", "¿Cuánto inglés hablas en el trabajo? · Un poco.", ["much", "many", "long"], 0, {
      en: "How much + English.",
      es: "How much: English no se cuenta.",
    }),
    mistake("sfg20-19", "I want speak with confidence next year.", "want", "want to", {
      en: "want to speak.",
      es: "want to + verbo.",
    }, DETECTIVE),
    mistake("sfg20-20", "I'm going to speak English in work every day.", "in", "at", {
      en: "at work.",
      es: "at work: en el trabajo.",
    }, DETECTIVE),
  ],
};
