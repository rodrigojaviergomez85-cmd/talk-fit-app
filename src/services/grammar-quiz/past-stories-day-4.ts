import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 3 · Día 4 — How Was Your Day? (was / were, preguntas y negativo de be).
 * 8 ancla · 8 transferencia · 4 trampas.
 */
export const PAST_STORIES_DAY_4: GrammarQuiz = {
  moduleId: "past-stories",
  day: 4,
  title: { en: "How Was Your Day?", es: "¿Cómo estuvo tu día?" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("m3g4-1", "Yesterday ___ a busy day.", "Ayer fue un día ocupado.", ["is", "was", "were", "did"], 1, {
      en: "Yesterday (it) was: singular, past.",
      es: "Yesterday (it) was: singular y pasado. did no va con adjetivos ni sustantivos.",
    }),
    mc("m3g4-2", "My coworkers ___ very busy too.", "Mis compañeros también estaban muy ocupados.", ["was", "were", "are", "did"], 1, {
      en: "Plural subject: were.",
      es: "Sujeto plural (my coworkers = they): were.",
    }),
    mc("m3g4-3", "We ___ in a meeting in the morning.", "Estuvimos en una reunión en la mañana.", ["was", "are", "were", "been"], 2, {
      en: "we were.",
      es: "we were. been necesita have.",
    }),
    mc("m3g4-4", "___ you happy when you finished work?", "¿Estabas contento cuando terminaste de trabajar?", ["Did", "Was", "Were", "Are"], 2, {
      en: "Question with be in the past: Were you ...? No Did.",
      es: "Pregunta con be en pasado: Were you ...? No lleva Did, porque no hay verbo de acción.",
    }),
    mistake("m3g4-5", "The office were full of people.", "were", "was", {
      en: "The office is singular: was.",
      es: "The office es singular: was.",
    }),
    mistake("m3g4-6", "I were tired in the morning.", "were", "was", {
      en: "I was. were is for you, we, they.",
      es: "I was. were es para you, we, they.",
    }),
    rearrange(
      "m3g4-7",
      ["much quieter", "afternoon", "was", "My"],
      ["My", "afternoon", "was", "much quieter"],
      { en: "Subject + was + comparison.", es: "Sujeto + was + comparación." },
    ),
    rearrange(
      "m3g4-8",
      ["when I finished work", "happy", "I", "was"],
      ["I", "was", "happy", "when I finished work"],
      { en: "I was + adjective + when clause.", es: "I was + adjetivo + cláusula con when." },
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("m3g4-9", "The customer ___ angry, but the agent ___ calm.", "El cliente estaba enojado, pero el agente estaba tranquilo.", ["was / was", "were / were", "was / were", "did / did"], 0, {
      en: "Two singular subjects: was ... was.",
      es: "Dos sujetos singulares: was ... was. Cada sujeto lleva su propio was.",
    }),
    mc("m3g4-10", "The buses ___ late this morning.", "Los buses venían tarde esta mañana.", ["was", "were", "is", "did"], 1, {
      en: "buses is plural: were.",
      es: "buses es plural: were. Mirá el sustantivo, no solo el pronombre.",
    }),
    mc("m3g4-11", "___ your sister at the party on Saturday?", "¿Tu hermana estuvo en la fiesta el sábado?", ["Did", "Were", "Was", "Is"], 2, {
      en: "your sister = she: Was she ...?",
      es: "your sister = she: Was she ...? Pregunta con be, sin Did.",
    }),
    mistake("m3g4-12", "My parents was at home all weekend.", "was", "were", {
      en: "my parents = they: were.",
      es: "my parents = they: were.",
    }),
    mistake("m3g4-13", "Yesterday the weather were terrible.", "were", "was", {
      en: "the weather = it: was.",
      es: "the weather = it: was. No es plural aunque termine en -er.",
    }),
    rearrange(
      "m3g4-14",
      ["not", "at the office", "were", "They", "yesterday"],
      ["They", "were", "not", "at the office", "yesterday"],
      { en: "They were not + place + time.", es: "They were not + lugar + tiempo. not va después de were." },
    ),
    rearrange(
      "m3g4-15",
      ["the call", "Was", "difficult", "this morning?"],
      ["Was", "the call", "difficult", "this morning?"],
      { en: "Question: Was + subject + adjective.", es: "Pregunta: Was + sujeto + adjetivo. El verbo va primero." },
    ),
    rearrange(
      "m3g4-16",
      ["was", "The morning", "but", "the afternoon", "quiet", "busy", "was"],
      ["The morning", "was", "busy", "but", "the afternoon", "was", "quiet"],
      { en: "Two short sentences joined by but, each with its own was.", es: "Dos frases cortas unidas por but, cada una con su was." },
    ),

    // ── Trampas ────────────────────────────────────────────────────────────
    mc("m3g4-17", "I ___ at work yesterday. I was sick.", "No estuve en el trabajo ayer. Estaba enfermo.", ["didn't", "wasn't", "weren't", "no was"], 1, {
      en: "Negative of be in the past: wasn't. didn't is for action verbs.",
      es: "Negativo de be en pasado: wasn't. didn't es para verbos de acción (didn't go), no para estar.",
    }),
    mistake("m3g4-18", "I am very tired yesterday after the shift.", "am", "was", {
      en: "yesterday needs the past: was.",
      es: "Con yesterday: was. Dejar am en presente es de los errores más comunes al contar el día.",
    }),
    mistake("m3g4-19", "Did you at the meeting yesterday?", "Did", "Were", {
      en: "Questions with be don't use Did: Were you at the meeting?",
      es: "Las preguntas con be no usan Did: Were you at the meeting? Did solo va con verbos de acción.",
    }),
    mistake("m3g4-20", "The customers has a lot of questions yesterday.", "has", "had", {
      en: "yesterday: had. And the customers is plural anyway.",
      es: "Con yesterday: had. Además the customers es plural, así que has tampoco funcionaría en presente.",
    }),
  ],
};
