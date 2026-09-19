import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 4 · Día 10 — Every Day, Yesterday & Tomorrow (reto de la semana 2).
 * Historia: Dani y su hermano se turnan para cocinar.
 * 6 ancla · 6 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Dani escribió la semana en el chat de la casa. Toca el error antes de que lo mande.";
const CHISME = "Camila lo contó en desorden. Ordena la frase.";

export const MIXED_TENSES_DAY_10: GrammarQuiz = {
  moduleId: "mixed-tenses",
  day: 10,
  title: { en: "Past, Present, Future", es: "Pasado, presente, futuro" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("m5g10-1", "Every day, I ___ for thirty minutes. Yesterday, I ___ twice.", "Todos los días hago ejercicio treinta minutos. Ayer hice dos veces.", ["exercise / exercised", "exercised / exercise", "exercises / exercised", "exercise / exercise"], 0, {
      en: "Every day: exercise. Yesterday: exercised.",
      es: "Every day: exercise. Yesterday: exercised.",
    }),
    mc("m5g10-2", "Tomorrow, I ___ my legs.", "Mañana voy a descansar las piernas.", ["am going to rest", "rested", "rest", "was resting"], 0, {
      en: "Tomorrow: am going to rest.",
      es: "Tomorrow: am going to rest.",
    }),
    mc("m5g10-3", "Usually, I ___ something simple. Yesterday, I ___ a special dinner.", "Normalmente cocino algo simple. Ayer cociné una cena especial.", ["cook / cooked", "cooked / cook", "cooks / cooked", "cook / am cooking"], 0, {
      en: "Usually: cook. Yesterday: cooked.",
      es: "Usually: cook. Yesterday: cooked.",
    }),
    mistake("m5g10-4", "Tomorrow, my brother is going to cooks for me.", "cooks", "cook", {
      en: "going to + base form: cook.",
      es: "going to + forma base: cook, sin -s.",
    }, DETECTIVE),
    mistake("m5g10-5", "Every week are different, but my habits stay.", "are", "is", {
      en: "every week is singular.",
      es: "every week es singular: is.",
    }, DETECTIVE),
    rearrange(
      "m5g10-6",
      ["I can talk", "about all three", "Past, present, future —"],
      ["Past, present, future —", "I can talk", "about all three"],
      { en: "The three tenses, then the claim.", es: "Los tres tiempos, y luego la afirmación." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("m5g10-7", "Camila: My brother ___ dinner on Mondays. Last Monday he ___ pasta, and next Monday he ___ tacos.", "Camila: Mi hermano cocina los lunes. El lunes pasado hizo pasta, y el próximo va a hacer tacos.", ["cooks / made / is going to make", "cooked / makes / made", "cooks / makes / makes", "cook / made / makes"], 0, {
      en: "Routine: cooks. Last Monday: made. Next Monday: is going to make.",
      es: "Rutina: cooks. Last Monday: made. Next Monday: is going to make. Tres tiempos, una persona.",
    }),
    mc("m5g10-8", "Dani: ___ you ___ tomorrow, or ___ you ___ yesterday?", "Dani: ¿Vas a cocinar mañana, o cocinaste ayer?", ["Are / going to cook / did / cook", "Did / cook / are / going to cook", "Do / cook / did / cook", "Are / cooking / do / cook"], 0, {
      en: "tomorrow: Are you going to cook? yesterday: did you cook?",
      es: "tomorrow: Are you going to cook? yesterday: did you cook? La palabra de tiempo decide la pregunta.",
    }),
    mc("m5g10-9", "Camila: Vale ___ every morning, but yesterday she ___ because she ___ late.", "Camila: Vale corre todas las mañanas, pero ayer no corrió porque se despertó tarde.", ["runs / didn't run / woke up", "run / didn't ran / wakes up", "runs / doesn't run / woke up", "ran / didn't run / wakes up"], 0, {
      en: "runs (routine), didn't run (yesterday), woke up (yesterday).",
      es: "runs, rutina; didn't run, ayer; woke up, ayer. Todo lo de ayer en pasado.",
    }),
    mistake("m5g10-10", "Yesterday my brother cook a special dinner for me.", "cook", "cooked", {
      en: "Yesterday: cooked.",
      es: "Yesterday: cooked. Pasado, aunque sea he.",
    }, DETECTIVE),
    rearrange(
      "m5g10-11",
      ["is going to", "next weekend", "My brother", "rest"],
      ["My brother", "is going to", "rest", "next weekend"],
      { en: "Subject + is going to + verb + time.", es: "Sujeto + is going to + verbo + tiempo." },
      CHISME,
    ),
    rearrange(
      "m5g10-12",
      ["twice", "exercised", "Yesterday,", "Camila"],
      ["Yesterday,", "Camila", "exercised", "twice"],
      { en: "Time + subject + past verb + twice.", es: "Tiempo + sujeto + verbo en pasado + twice." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("m5g10-13", "Dani: At seven yesterday I ___ dinner when my brother ___.", "Dani: Ayer a las siete estaba cocinando cuando llegó mi hermano.", ["was cooking / arrived", "cooked / was arriving", "cook / arrived", "was cooking / arrive"], 0, {
      en: "was cooking (in progress) + arrived (interruption).",
      es: "was cooking, en progreso, + arrived, la interrupción. Repaso de Basic 3.",
    }),
    mc("m5g10-14", "Camila: I think next week ___ easier. I promise I ___ complain.", "Camila: Creo que la próxima semana va a ser más fácil. Prometo que no me voy a quejar.", ["will be / won't", "was / didn't", "is / don't", "will be / don't"], 0, {
      en: "I think + will be. Promise: I won't complain.",
      es: "I think + will be, predicción. Promesa: I won't complain. Repaso de Basic 1.",
    }),
    mistake("m5g10-15", "Right now my brother cooking and I am resting.", "cooking", "is cooking", {
      en: "Right now: is cooking.",
      es: "Right now: is cooking. Falta el is; el segundo verbo (am resting) sí lo tiene. Repaso de Basic 2.",
    }, DETECTIVE),
    mistake("m5g10-16", "My brother don't exercise. He only cooks.", "don't", "doesn't", {
      en: "my brother = he: doesn't.",
      es: "my brother = he: doesn't. Repaso de Basic 2.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("m5g10-17", "I exercise ___ the morning, ___ six, ___ Monday to Friday.", "Hago ejercicio en la mañana, a las seis, de lunes a viernes.", ["in / at / from", "at / in / from", "in / in / on", "on / at / from"], 0, {
      en: "in the morning, at six, from Monday to Friday.",
      es: "in the morning, at six, from Monday to Friday. Tres preposiciones de tiempo en una frase.",
    }),
    mc("m5g10-18", "My brother is ___ good cook, but I'm ___ better one.", "Mi hermano es buen cocinero, pero yo soy mejor.", ["a / a", "a / the", "the / a", "an / a"], 0, {
      en: "a good cook, a better one.",
      es: "a good cook, a better one. Sonido de consonante en los dos.",
    }),
    mistake("m5g10-19", "This are my habits: exercise, cook, practice.", "This", "These", {
      en: "habits is plural: these habits.",
      es: "habits es plural: these. Y el verbo are ya avisaba.",
    }, DETECTIVE),
    mistake("m5g10-20", "I have 26 years old and I live with my brother.", "have", "am", {
      en: "Age: I am 26 years old.",
      es: "La edad con be: I am 26 years old. «I have 26 years» es calco de «tengo 26 años».",
    }, DETECTIVE),
  ],
};
