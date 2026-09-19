import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 1 · Día 16 — Plan or decision? going to (plan) vs will (ahora / predicción).
 * 8 ancla · 4 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Andrés escribió su día de planes y sorpresas. Toca la palabra equivocada.";
const CHISME = "Andrés dijo la frase en desorden. Ordénala.";

export const SIMPLE_FUTURE_DAY_16: GrammarQuiz = {
  moduleId: "simple-future",
  day: 16,
  title: { en: "Plan or Decision?", es: "¿Plan o decisión?" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("sfg16-1", "Tonight ___ study English. That's my plan.", "Esta noche voy a estudiar inglés. Ese es mi plan.", ["I'm going to", "I'll", "I will to"], 0, {
      en: "a plan: going to.",
      es: "Plan que ya tenía → going to.",
    }),
    mc("sfg16-2", "Oh, the doorbell! ___ open it.", "¡Ah, el timbre! Yo abro.", ["I'll", "I'm going to", "I go to"], 0, {
      en: "decision now: I'll.",
      es: "Decisión en el momento → I'll.",
    }),
    mc("sfg16-3", "Look at the sky. I think it ___ rain.", "Mira el cielo. Creo que va a llover.", ["will", "is", "goes"], 0, {
      en: "I think + will.",
      es: "I think + will: predicción.",
    }),
    mc("sfg16-4", "You need help? ___ help you right now.", "¿Necesitas ayuda? Te ayudo ahora mismo.", ["I'll", "I'm going to", "I help"], 0, {
      en: "offer now: I'll.",
      es: "Ofrecimiento del momento → I'll.",
    }),
    mistake("sfg16-5", "Tomorrow I'm going to working from the office.", "working", "work", {
      en: "going to work.",
      es: "going to + work, verbo solo.",
    }, DETECTIVE),
    mistake("sfg16-6", "I'm not going to travel far. It won't stops my plans.", "stops", "stop", {
      en: "won't stop.",
      es: "won't + stop, verbo solo.",
    }, DETECTIVE),
    rearrange(
      "sfg16-7",
      ["visit my family", "I'm going to", "This weekend,"],
      ["This weekend,", "I'm going to", "visit my family"],
      { en: "Time + I'm going to + verb.", es: "Tiempo + I'm going to + verbo." },
      CHISME,
    ),
    rearrange(
      "sfg16-8",
      ["it will rain", "I think", "Look at the sky."],
      ["Look at the sky.", "I think", "it will rain"],
      { en: "Evidence + I think + it will + verb.", es: "Evidencia + I think + it will + verbo." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("sfg16-9", "Andres has a plan: ___ study English tonight.", "Andrés tiene un plan: va a estudiar inglés esta noche.", ["he's going to", "he'll", "he will to"], 0, {
      en: "plan: he's going to.",
      es: "Plan → he's going to.",
    }),
    mc("sfg16-10", "The phone is ringing. Sofia says: ___ answer it.", "El teléfono está sonando. Sofía dice: yo contesto.", ["I'll", "I'm going to", "I answer"], 0, {
      en: "decision now: I'll.",
      es: "Decisión del momento → I'll.",
    }),
    mistake("sfg16-11", "My parents is going to visit us this weekend.", "is", "are", {
      en: "parents: are.",
      es: "my parents → are going to.",
    }, DETECTIVE),
    rearrange(
      "sfg16-12",
      ["will be", "I think", "sunny", "tomorrow"],
      ["I think", "tomorrow", "will be", "sunny"],
      { en: "I think + subject + will be + adjective.", es: "I think + sujeto + will be + adjetivo." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("sfg16-13", "I promise ___ practice every day.", "Prometo que voy a practicar todos los días.", ["I'll", "I'm", "I"], 0, {
      en: "promise: I'll.",
      es: "Promesa → I'll. Repaso del día 12.",
    }),
    mc("sfg16-14", "Andres ___ from Colombia. ___ family lives in Bogotá.", "Andrés es de Colombia. Su familia vive en Bogotá.", ["is / His", "is / Her", "has / His"], 0, {
      en: "is from; his family.",
      es: "is from: es de; Andres → his.",
    }),
    mistake("sfg16-15", "Andres have two brothers and one sister.", "have", "has", {
      en: "he has.",
      es: "Andres = he → has.",
    }, DETECTIVE),
    mistake("sfg16-16", "Those is my books for the English class.", "is", "are", {
      en: "Those are.",
      es: "Those are: plural.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("sfg16-17", "___ someone at the door.", "Hay alguien en la puerta.", ["There is", "There are", "Is"], 0, {
      en: "someone: there is.",
      es: "there is: hay, una persona.",
    }),
    mc("sfg16-18", "What time is it? · It's ___ to five.", "¿Qué hora es? · Son las cinco menos diez.", ["ten", "ten minutes before", "five less ten"], 0, {
      en: "ten to five = 4:50.",
      es: "ten to five: las cinco menos diez.",
    }),
    mistake("sfg16-19", "I want visit my family this weekend.", "want", "want to", {
      en: "want to visit.",
      es: "want to + verbo.",
    }, DETECTIVE),
    mistake("sfg16-20", "Tomorrow I'm going to work at the office on the morning.", "on", "in", {
      en: "in the morning.",
      es: "in the morning: in con la parte del día.",
    }, DETECTIVE),
  ],
};
