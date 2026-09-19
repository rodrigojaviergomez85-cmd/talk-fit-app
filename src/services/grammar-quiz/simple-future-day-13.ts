import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 1 · Día 13 — My predictions: I think it will · it won't be.
 * 8 ancla · 4 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Sofía escribió sus predicciones. Toca la palabra equivocada.";
const CHISME = "Sofía dijo la frase en desorden. Ordénala.";

export const SIMPLE_FUTURE_DAY_13: GrammarQuiz = {
  moduleId: "simple-future",
  day: 13,
  title: { en: "My Predictions", es: "Mis predicciones" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("sfg13-1", "I think it ___ rain this afternoon.", "Creo que va a llover esta tarde.", ["will", "is", "goes"], 0, {
      en: "I think it will: prediction.",
      es: "I think + will: predicción.",
    }),
    mc("sfg13-2", "The traffic will ___ terrible.", "El tráfico va a estar terrible.", ["be", "is", "being"], 0, {
      en: "will be.",
      es: "will be: be en forma base.",
    }),
    mc("sfg13-3", "It ___ be easy, but it will be possible.", "No va a ser fácil, pero va a ser posible.", ["won't", "don't", "isn't"], 0, {
      en: "won't be.",
      es: "won't = will not. No va a ser.",
    }),
    mc("sfg13-4", "In one year, I think ___ speak much better English.", "En un año, creo que voy a hablar mucho mejor inglés.", ["I'll", "I", "I'm"], 0, {
      en: "I'll = I will.",
      es: "I'll speak: predicción sobre mí.",
    }),
    mistake("sfg13-5", "I think many people will works from home.", "works", "work", {
      en: "will work.",
      es: "will + work, sin -s.",
    }, DETECTIVE),
    mistake("sfg13-6", "I think my job will changes soon.", "changes", "change", {
      en: "will change.",
      es: "Después de will, verbo solo: change.",
    }, DETECTIVE),
    rearrange(
      "sfg13-7",
      ["nervous", "on the phone", "I won't be"],
      ["I won't be", "nervous", "on the phone"],
      { en: "I won't be + adjective + where.", es: "I won't be + adjetivo + dónde." },
      CHISME,
    ),
    rearrange(
      "sfg13-8",
      ["very interesting", "The future", "will be"],
      ["The future", "will be", "very interesting"],
      { en: "Subject + will be + adjective.", es: "Sujeto + will be + adjetivo." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("sfg13-9", "I think Sofia ___ speak better English next year.", "Creo que Sofía va a hablar mejor inglés el próximo año.", ["will", "wills", "is"], 0, {
      en: "will: same for she.",
      es: "will no cambia con she: Sofia will speak.",
    }),
    mc("sfg13-10", "I think my parents ___ be happy with the news.", "Creo que mis papás van a estar felices con la noticia.", ["will", "are", "going"], 0, {
      en: "they will be.",
      es: "will be: van a estar.",
    }),
    mistake("sfg13-11", "I think my brother won't is nervous at the interview.", "is", "be", {
      en: "won't be.",
      es: "won't + be: forma base.",
    }, DETECTIVE),
    rearrange(
      "sfg13-12",
      ["will be", "I think", "difficult", "the exam"],
      ["I think", "the exam", "will be", "difficult"],
      { en: "I think + subject + will be + adjective.", es: "I think + sujeto + will be + adjetivo." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("sfg13-13", "I promise ___ practice every day. I won't give up.", "Prometo que voy a practicar todos los días. No me rendiré.", ["I'll", "I'm", "I"], 0, {
      en: "I promise I'll.",
      es: "Promesa → I'll. Repaso del día 12.",
    }),
    mc("sfg13-14", "Sofia works ___ a bank. She is ___ accountant.", "Sofía trabaja en un banco. Es contadora.", ["at / an", "in / a", "at / a"], 0, {
      en: "works at a bank, an accountant.",
      es: "at con el lugar de trabajo; an accountant, vocal.",
    }),
    mistake("sfg13-15", "This weekend my friends is going to travel to the beach.", "is", "are", {
      en: "friends: are.",
      es: "my friends → are going to.",
    }, DETECTIVE),
    mistake("sfg13-16", "Sofia have 28 years old.", "have", "is", {
      en: "She is 28.",
      es: "Sofia is 28 years old.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("sfg13-17", "___ a lot of traffic in the afternoon.", "Hay mucho tráfico en la tarde.", ["There is", "There are", "It is"], 0, {
      en: "traffic (uncountable): there is.",
      es: "there is: traffic no se cuenta.",
    }),
    mc("sfg13-18", "How ___ rain will we have this week? · A lot.", "¿Cuánta lluvia vamos a tener esta semana? · Mucha.", ["much", "many", "long"], 0, {
      en: "How much + rain.",
      es: "How much: rain no se cuenta.",
    }),
    mistake("sfg13-19", "I want speak better English next year.", "want", "want to", {
      en: "want to speak.",
      es: "want to + verbo.",
    }, DETECTIVE),
    mistake("sfg13-20", "I think it will rain on the afternoon.", "on", "in", {
      en: "in the afternoon.",
      es: "in the afternoon: in con la parte del día.",
    }, DETECTIVE),
  ],
};
