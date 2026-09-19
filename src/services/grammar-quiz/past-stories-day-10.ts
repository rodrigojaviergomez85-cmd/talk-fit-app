import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 3 · Día 10 — Simple Past Challenge (reto de la semana).
 * Historia del día: el lunes completo de Ana, con lo que hizo, lo que hace
 * y lo que va a hacer.
 * Mezcla: 10 pasado de la semana · 6 repaso Basic 1 y 2 (will, going to,
 * present progressive, rutina con -s) · 4 básicos (on / at, edad con be,
 * take a photo, those) · organizados en 8 ancla, 8 transferencia, 4 trampas.
 */
const DETECTIVE = "Ana escribió esto en el chat del equipo. Toca el error antes de que lo mande.";
const CHISME = "Kat lo contó en desorden. Ordena la frase.";

export const PAST_STORIES_DAY_10: GrammarQuiz = {
  moduleId: "past-stories",
  day: 10,
  title: { en: "Ana's Whole Monday", es: "El lunes completo de Ana" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("m3g10-1", "Yesterday Ana ___ up early and ___ to work.", "Ayer Ana se despertó temprano y fue al trabajo.", ["woke / went", "wakes / goes", "woke / go", "waked / went"], 0, {
      en: "Both irregular, both past: woke ... went.",
      es: "Los dos irregulares, los dos en pasado: woke ... went.",
    }),
    mc("m3g10-2", "She ___ busy, but the day ___ good.", "Estaba ocupada, pero el día estuvo bien.", ["was / was", "were / was", "was / were", "is / was"], 0, {
      en: "she was, the day was.",
      es: "she was, the day was. Dos sujetos singulares, dos was.",
    }),
    mc("m3g10-3", "Her friend Kat ___ yesterday. It was her day off.", "Su amiga Kat no trabajó ayer. Era su día libre.", ["didn't work", "doesn't work", "didn't worked", "not worked"], 0, {
      en: "Yesterday, negative: didn't work.",
      es: "Ayer, en negativo: didn't work. doesn't work sería «no trabaja» en general.",
    }),
    mc("m3g10-4", "Ana's sister ___ dinner for the family.", "La hermana de Ana hizo la cena para la familia.", ["make", "made", "makes", "making"], 1, {
      en: "make → made.",
      es: "make → made. Ana's sister = she, y en pasado es made para todos.",
    }),
    mistake("m3g10-5", "They ate together and talk for an hour.", "talk", "talked", {
      en: "Both in the past: ate ... talked.",
      es: "Los dos en pasado: ate ... talked. El segundo verbo también lleva pasado.",
    }, DETECTIVE),
    mistake("m3g10-6", "Ana didn't did anything special.", "did", "do", {
      en: "didn't + base form: didn't do.",
      es: "didn't + forma base: didn't do. El pasado ya está en didn't; el segundo did sobra.",
    }, DETECTIVE),
    rearrange(
      "m3g10-7",
      ["a good day", "Overall,", "for everyone", "it was"],
      ["Overall,", "it was", "a good day", "for everyone"],
      { en: "Overall, it was ... for everyone.", es: "Overall, it was ... for everyone." },
      CHISME,
    ),
    rearrange(
      "m3g10-8",
      ["do", "yesterday?", "you", "something special", "Did"],
      ["Did", "you", "do", "something special", "yesterday?"],
      { en: "Did + you + do + object + time.", es: "Did + you + do + objeto + tiempo. Este do es el verbo hacer." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("m3g10-9", "Ana: Yesterday I worked ten hours. Today I ___ only six.", "Ana: Ayer trabajé diez horas. Hoy estoy trabajando solo seis.", ["am working", "worked", "works", "work"], 0, {
      en: "Today, right now: am working (present progressive).",
      es: "Hoy, en este momento: am working (presente progresivo). Repaso de Basic 2 semana 4.",
    }),
    mc("m3g10-10", "Ana: Tomorrow I ___ rest. I promise.", "Ana: Mañana voy a descansar. Lo prometo.", ["will", "did", "was", "do"], 0, {
      en: "A promise about tomorrow: will.",
      es: "Una promesa sobre mañana: will. Repaso de Basic 1: I'll do it.",
    }),
    mc("m3g10-11", "Every Monday Ana ___ at eight. Last Monday she ___ at six.", "Todos los lunes Ana empieza a las ocho. El lunes pasado empezó a las seis.", ["starts / started", "start / started", "started / starts", "starts / start"], 0, {
      en: "Every Monday = starts (routine). Last Monday = started (past).",
      es: "Every Monday es rutina: starts, con -s. Last Monday es pasado: started.",
    }),
    mistake("m3g10-12", "Right now Ana is talk to a customer.", "talk", "talking", {
      en: "Right now: is talking.",
      es: "Right now: is talking. be + verbo con -ing para lo que pasa en este momento.",
    }, DETECTIVE),
    mistake("m3g10-13", "Next week she is going to visits her mom.", "visits", "visit", {
      en: "After going to, base form: going to visit.",
      es: "Después de going to el verbo va en forma base: going to visit. Sin -s.",
    }, DETECTIVE),
    rearrange(
      "m3g10-14",
      ["tonight", "Ana", "cook", "is going to"],
      ["Ana", "is going to", "cook", "tonight"],
      { en: "Plan: subject + is going to + verb + when.", es: "Plan: sujeto + is going to + verbo + cuándo." },
      CHISME,
    ),
    rearrange(
      "m3g10-15",
      ["dinner", "last night", "Her sister", "made"],
      ["Her sister", "made", "dinner", "last night"],
      { en: "Subject + verb + object + time.", es: "Sujeto + verbo + objeto + tiempo." },
      CHISME,
    ),
    mc("m3g10-16", "The meeting was ___ Monday ___ 9:30.", "La reunión fue el lunes a las 9:30.", ["on / at", "in / at", "at / on", "on / in"], 0, {
      en: "on + day, at + time.",
      es: "on con el día (on Monday), at con la hora (at 9:30).",
    }),

    // ── Trampas ────────────────────────────────────────────────────────────
    mc("m3g10-17", "Ana: I ___ 32 years old, and my sister ___ 28.", "Ana: Tengo 32 años y mi hermana tiene 28.", ["am / is", "have / has", "has / has", "am / has"], 0, {
      en: "Age uses be: I am 32, she is 28.",
      es: "La edad va con be: I am 32, she is 28. «I have 32 years» es calco de «tengo 32 años».",
    }),
    mistake("m3g10-18", "Ana made a photo with the team.", "made", "took", {
      en: "take a photo.",
      es: "take a photo: tomar una foto. «Make a photo» es calco de «hacer una foto».",
    }, DETECTIVE),
    mistake("m3g10-19", "Look at that clouds. It's going to rain.", "that", "those", {
      en: "clouds is plural: those clouds.",
      es: "clouds es plural: those clouds. Y la predicción con going to está bien: es Basic 1.",
    }, DETECTIVE),
    mistake("m3g10-20", "Ana has a meeting in Monday morning.", "in", "on", {
      en: "on Monday morning.",
      es: "on Monday morning. Cuando hay un día, gana on, aunque después diga morning.",
    }, DETECTIVE),
  ],
};
