import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 2 · Día 7 — An athlete's day: he trains · he eats · he doesn't usually.
 * 8 ancla · 4 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Paola escribió la rutina de Cristiano. Toca la palabra equivocada.";
const CHISME = "Paola dijo la frase en desorden. Ordénala.";

export const SIMPLE_PRESENT_DAY_7: GrammarQuiz = {
  moduleId: "simple-present",
  day: 7,
  title: { en: "An Athlete's Day", es: "El día de un atleta" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("spg7-1", "Cristiano usually ___ up early.", "Cristiano normalmente se despierta temprano.", ["wakes", "wake", "waking"], 0, {
      en: "he wakes up.",
      es: "Cristiano = he → wakes.",
    }),
    mc("spg7-2", "He ___ a healthy breakfast.", "Come un desayuno saludable.", ["eats", "eat", "eating"], 0, {
      en: "he eats.",
      es: "he → eats, con -s.",
    }),
    mc("spg7-3", "He ___ usually stay up very late.", "Normalmente no se queda despierto hasta muy tarde.", ["doesn't", "don't", "isn't"], 0, {
      en: "he doesn't.",
      es: "he → doesn't.",
    }),
    mc("spg7-4", "He takes care of ___ body because his job is demanding.", "Cuida su cuerpo porque su trabajo es exigente.", ["his", "her", "he"], 0, {
      en: "he → his body.",
      es: "he → his: su (de él).",
    }),
    mistake("spg7-5", "He train almost every day.", "train", "trains", {
      en: "he trains.",
      es: "he → trains, con -s.",
    }, DETECTIVE),
    mistake("spg7-6", "He spend time with his family.", "spend", "spends", {
      en: "he spends.",
      es: "he → spends, con -s.",
    }, DETECTIVE),
    rearrange(
      "spg7-7",
      ["for several hours", "exercises", "He"],
      ["He", "exercises", "for several hours"],
      { en: "He + verb-s + how long.", es: "He + verbo con -s + cuánto tiempo." },
      CHISME,
    ),
    rearrange(
      "spg7-8",
      ["a very disciplined routine", "he has", "Overall,"],
      ["Overall,", "he has", "a very disciplined routine"],
      { en: "Overall, + he has + object.", es: "Overall, + he has + objeto." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("spg7-9", "I ___ three times a week.", "Yo entreno tres veces por semana.", ["train", "trains", "training"], 0, {
      en: "I train: no -s.",
      es: "Con I, sin -s.",
    }),
    mc("spg7-10", "My friends ___ exercise every day.", "Mis amigos no hacen ejercicio todos los días.", ["don't", "doesn't", "aren't"], 0, {
      en: "they don't.",
      es: "my friends = they → don't.",
    }),
    mistake("spg7-11", "Paola eat a healthy breakfast every morning.", "eat", "eats", {
      en: "she eats.",
      es: "Paola = she → eats.",
    }, DETECTIVE),
    rearrange(
      "spg7-12",
      ["with her family", "spends time", "My sister", "on Sundays"],
      ["My sister", "spends time", "with her family", "on Sundays"],
      { en: "Subject + verb-s + with whom + day.", es: "Sujeto + verbo con -s + con quién + día." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("spg7-13", "My mom usually ___ up early and ___ breakfast at home.", "Mi mamá normalmente se despierta temprano y desayuna en casa.", ["wakes / has", "wake / have", "wakes / have"], 0, {
      en: "she wakes, she has.",
      es: "she → -s en los dos. Repaso del día 6.",
    }),
    mc("spg7-14", "I think Cristiano ___ play for many more years.", "Creo que Cristiano va a jugar muchos años más.", ["will", "is", "wills"], 0, {
      en: "I think + will.",
      es: "Predicción → will. Repaso de Basic 1.",
    }),
    mistake("spg7-15", "Cristiano is a athlete from Portugal.", "a", "an", {
      en: "an athlete.",
      es: "an athlete: vocal.",
    }, DETECTIVE),
    mistake("spg7-16", "Paola have 24 years old.", "have", "is", {
      en: "She is 24.",
      es: "Paola is 24 years old.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("spg7-17", "___ a gym close to my house.", "Hay un gimnasio cerca de mi casa.", ["There is", "There are", "It is"], 0, {
      en: "one gym: there is.",
      es: "there is: hay, una cosa.",
    }),
    mc("spg7-18", "How ___ hours does he train? · Several.", "¿Cuántas horas entrena? · Varias.", ["many", "much", "long"], 0, {
      en: "How many + hours.",
      es: "How many con cosas que se cuentan.",
    }),
    mistake("spg7-19", "I need exercise more this year.", "need", "need to", {
      en: "need to exercise.",
      es: "need to + verbo.",
    }, DETECTIVE),
    mistake("spg7-20", "He trains at the gym on the morning.", "on", "in", {
      en: "in the morning.",
      es: "in the morning: in con la parte del día.",
    }, DETECTIVE),
  ],
};
