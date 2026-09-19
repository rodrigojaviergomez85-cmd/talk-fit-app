import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 1 · Día 19 — What's going to happen? Evidencia: it's going to rain ·
 * there's going to be. 8 ancla · 4 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Ana escribió lo que ve en la calle. Toca la palabra equivocada.";
const CHISME = "Ana dijo la frase en desorden. Ordénala.";

export const SIMPLE_FUTURE_DAY_19: GrammarQuiz = {
  moduleId: "simple-future",
  day: 19,
  title: { en: "What's Going to Happen?", es: "¿Qué va a pasar?" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("sfg19-1", "Look at the sky. ___ going to rain soon.", "Mira el cielo. Va a llover pronto.", ["It's", "Its", "It"], 0, {
      en: "It's going to: evidence.",
      es: "It's = It is going to: lo veo venir.",
    }),
    mc("sfg19-2", "The streets are full. ___ going to be a lot of traffic.", "Las calles están llenas. Va a haber mucho tráfico.", ["There's", "It's", "They're"], 0, {
      en: "there's going to be = va a haber.",
      es: "There's going to be: va a haber.",
    }),
    mc("sfg19-3", "People are running, so ___ going to be late.", "La gente está corriendo, así que van a llegar tarde.", ["they're", "their", "they"], 0, {
      en: "they're = they are.",
      es: "they're going to = they are going to.",
    }),
    mc("sfg19-4", "If the traffic is bad, ___ walk.", "Si el tráfico está mal, camino.", ["I'll", "I'm going to", "I walk"], 0, {
      en: "if …, I'll.",
      es: "If + presente, I'll.",
    }),
    mistake("sfg19-5", "I'm going to leaving a little earlier.", "leaving", "leave", {
      en: "going to leave.",
      es: "going to + leave, verbo solo.",
    }, DETECTIVE),
    mistake("sfg19-6", "I'm not going to taking the bus today.", "taking", "take", {
      en: "not going to take.",
      es: "going to + take, verbo solo.",
    }, DETECTIVE),
    rearrange(
      "sfg19-7",
      ["a difficult afternoon", "I think", "it will be"],
      ["I think", "it will be", "a difficult afternoon"],
      { en: "I think + it will be + noun.", es: "I think + it will be + sustantivo." },
      CHISME,
    ),
    rearrange(
      "sfg19-8",
      ["in the end", "Everything", "will be fine"],
      ["Everything", "will be fine", "in the end"],
      { en: "Subject + will be + adjective + time.", es: "Sujeto + will be + adjetivo + tiempo." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("sfg19-9", "Look at Daniel. He's very tired. ___ going to sleep early.", "Mira a Daniel. Está muy cansado. Se va a dormir temprano.", ["He's", "His", "He"], 0, {
      en: "He's going to: evidence.",
      es: "He's = He is going to.",
    }),
    mc("sfg19-10", "The sky is dark. ___ going to be a storm.", "El cielo está oscuro. Va a haber una tormenta.", ["There's", "It's", "There"], 0, {
      en: "there's going to be.",
      es: "There's going to be: va a haber.",
    }),
    mistake("sfg19-11", "The bus looks full, so we is going to be late.", "is", "are", {
      en: "we are.",
      es: "we → are going to.",
    }, DETECTIVE),
    rearrange(
      "sfg19-12",
      ["take a taxi", "If the bus is late,", "we'll"],
      ["If the bus is late,", "we'll", "take a taxi"],
      { en: "If + present, we'll + verb.", es: "If + presente, we'll + verbo." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("sfg19-13", "Maria ___ going to start a new job. I think ___ learn fast.", "María va a empezar un trabajo nuevo. Creo que va a aprender rápido.", ["is / she'll", "will / she'll", "is / her"], 0, {
      en: "is going to; she'll.",
      es: "Plan → is going to; predicción → she'll. Repaso del día 18.",
    }),
    mc("sfg19-14", "Ana is 29. ___ from El Salvador and ___ job is in the city.", "Ana tiene 29. Es de El Salvador y su trabajo está en la ciudad.", ["She's / her", "Her / she's", "She's / his"], 0, {
      en: "She's from; her job.",
      es: "She's = She is; her antes del sustantivo.",
    }),
    mistake("sfg19-15", "Ana take the bus to work every day.", "take", "takes", {
      en: "she takes.",
      es: "Ana = she → takes.",
    }, DETECTIVE),
    mistake("sfg19-16", "This are my coworkers from the office.", "This", "These", {
      en: "These are: plural.",
      es: "Varios compañeros → These are. This es para uno.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("sfg19-17", "___ a lot of people on the bus.", "Hay mucha gente en el bus.", ["There are", "There is", "They are"], 0, {
      en: "a lot of people: there are.",
      es: "there are: people es plural.",
    }),
    mc("sfg19-18", "How ___ buses go to the city center? · Three.", "¿Cuántos buses van al centro? · Tres.", ["many", "much", "long"], 0, {
      en: "How many + buses.",
      es: "How many con cosas que se cuentan.",
    }),
    mistake("sfg19-19", "I need leave earlier today.", "need", "need to", {
      en: "need to leave.",
      es: "need to + verbo.",
    }, DETECTIVE),
    mistake("sfg19-20", "The bus stop is close from my office.", "from", "to", {
      en: "close to my office.",
      es: "close to: cerca de.",
    }, DETECTIVE),
  ],
};
