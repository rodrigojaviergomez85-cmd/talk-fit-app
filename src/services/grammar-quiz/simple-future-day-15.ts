import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 1 · Día 15 — Will challenge: decisión · promesa · predicción.
 * 8 ancla · 4 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Valeria escribió su reto con will. Toca la palabra equivocada.";
const CHISME = "Valeria dijo la frase en desorden. Ordénala.";

export const SIMPLE_FUTURE_DAY_15: GrammarQuiz = {
  moduleId: "simple-future",
  day: 15,
  title: { en: "Will Challenge", es: "Reto: will" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("sfg15-1", "Someone needs help right now, so ___ help.", "Alguien necesita ayuda ahora, así que yo ayudo.", ["I'll", "I'm", "I"], 0, {
      en: "decision now: I'll.",
      es: "Decisión del momento → I'll.",
    }),
    mc("sfg15-2", "I promise I'll ___ speaking every single day.", "Prometo que voy a practicar hablar todos los días.", ["practice", "practicing", "practices"], 0, {
      en: "will + practice.",
      es: "Después de will, verbo solo.",
    }),
    mc("sfg15-3", "I think my English ___ improve fast.", "Creo que mi inglés va a mejorar rápido.", ["will", "is", "goes"], 0, {
      en: "prediction: will.",
      es: "I think + will: predicción.",
    }),
    mc("sfg15-4", "It ___ be perfect, but it will be clear.", "No va a ser perfecto, pero va a ser claro.", ["won't", "don't", "isn't"], 0, {
      en: "won't be.",
      es: "won't = will not.",
    }),
    mistake("sfg15-5", "The phone is ringing. I'll answering it in English.", "answering", "answer", {
      en: "I'll answer.",
      es: "will + answer, verbo solo.",
    }, DETECTIVE),
    mistake("sfg15-6", "I won't stopping when it feels hard.", "stopping", "stop", {
      en: "won't stop.",
      es: "won't + stop, verbo solo.",
    }, DETECTIVE),
    rearrange(
      "sfg15-7",
      ["with more confidence", "I'll speak", "In six months,"],
      ["In six months,", "I'll speak", "with more confidence"],
      { en: "Time + I'll + verb + how.", es: "Tiempo + I'll + verbo + cómo." },
      CHISME,
    ),
    rearrange(
      "sfg15-8",
      ["will be different", "I know", "this year"],
      ["I know", "this year", "will be different"],
      { en: "I know + subject + will be + adjective.", es: "I know + sujeto + will be + adjetivo." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("sfg15-9", "Valeria promises ___ practice every day.", "Valeria promete que va a practicar todos los días.", ["she'll", "she's", "her"], 0, {
      en: "she'll = she will.",
      es: "she'll practice: promesa de ella.",
    }),
    mc("sfg15-10", "I think my coworkers ___ speak with more confidence soon.", "Creo que mis compañeros van a hablar con más confianza pronto.", ["will", "are", "wills"], 0, {
      en: "they will speak.",
      es: "will es igual para they.",
    }),
    mistake("sfg15-11", "My brother won't stops when it feels hard.", "stops", "stop", {
      en: "won't stop.",
      es: "won't + stop, sin -s.",
    }, DETECTIVE),
    rearrange(
      "sfg15-12",
      ["it", "Daniel says", "he'll answer"],
      ["Daniel says", "he'll answer", "it"],
      { en: "Name says + he'll + verb + object.", es: "Nombre says + he'll + verbo + objeto." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("sfg15-13", "My friend Ana ___ finish her studies this year.", "Mi amiga Ana va a terminar sus estudios este año.", ["will", "wills", "is"], 0, {
      en: "will finish.",
      es: "will no cambia con she. Repaso del día 14.",
    }),
    mc("sfg15-14", "Valeria and Daniel ___ my coworkers. ___ very nice.", "Valeria y Daniel son mis compañeros. Son muy amables.", ["are / They're", "is / They're", "are / Their"], 0, {
      en: "are; They're = They are.",
      es: "Plural → are; They're = son.",
    }),
    mistake("sfg15-15", "Next month my sister are going to travel to Mexico.", "are", "is", {
      en: "my sister = she: is.",
      es: "my sister → is going to.",
    }, DETECTIVE),
    mistake("sfg15-16", "Valeria work at a call center in the afternoon.", "work", "works", {
      en: "she works.",
      es: "Valeria = she → works.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("sfg15-17", "___ a phone on my desk.", "Hay un teléfono en mi escritorio.", ["There is", "There are", "It is"], 0, {
      en: "one phone: there is.",
      es: "there is: hay, una cosa.",
    }),
    mc("sfg15-18", "What time do you start work? · ___ eight.", "¿A qué hora empiezas a trabajar? · A las ocho.", ["At", "In", "On"], 0, {
      en: "at eight.",
      es: "at con la hora.",
    }),
    mistake("sfg15-19", "I need practice speaking every day.", "need", "need to", {
      en: "need to practice.",
      es: "need to + verbo.",
    }, DETECTIVE),
    mistake("sfg15-20", "I'll answer the phone on the morning.", "on", "in", {
      en: "in the morning.",
      es: "in the morning: in con la parte del día.",
    }, DETECTIVE),
  ],
};
