import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/** BASIC 3 · Día 4 — How Was Your Day? (was / were). */
export const PAST_STORIES_DAY_4: GrammarQuiz = {
  moduleId: "past-stories",
  day: 4,
  title: { en: "How Was Your Day?", es: "¿Cómo estuvo tu día?" },
  items: [
    mc("m3g4-1", "Yesterday ___ a busy day.", "Ayer fue un día ocupado.", ["were", "was", "is", "are"], 1, {
      en: "One day = singular: was.",
      es: "Un día es singular: was.",
    }),
    mc("m3g4-2", "I ___ tired in the morning.", "Estaba cansado en la mañana.", ["was", "were", "am", "be"], 0, {
      en: "I always takes was.",
      es: "Con I siempre va was.",
    }),
    mc("m3g4-3", "My coworkers ___ very busy too.", "Mis compañeros también estaban muy ocupados.", ["was", "is", "were", "are"], 2, {
      en: "Plural people take were.",
      es: "Con personas en plural va were.",
    }),
    mc("m3g4-4", "The office ___ full of people.", "La oficina estaba llena de gente.", ["were", "was", "are", "be"], 1, {
      en: "the office is singular: was.",
      es: "the office es singular: was.",
    }),
    mc("m3g4-5", "We ___ in a meeting in the morning.", "Estuvimos en una reunión en la mañana.", ["was", "were", "are", "is"], 1, {
      en: "we → were.",
      es: "Con we va were.",
    }),
    mc("m3g4-6", "My afternoon ___ much quieter.", "Mi tarde estuvo mucho más tranquila.", ["were", "was", "is", "did"], 1, {
      en: "my afternoon is singular: was.",
      es: "my afternoon es singular: was.",
    }),
    mc("m3g4-7", "___ you happy when you finished work?", "¿Estabas feliz cuando terminaste de trabajar?", ["Was", "Were", "Did", "Are"], 1, {
      en: "With you the past of be is were.",
      es: "Con you el pasado de be es were.",
    }),
    mc("m3g4-8", "They ___ not in the office yesterday.", "Ellos no estaban en la oficina ayer.", ["was", "did", "were", "are"], 2, {
      en: "they → were; the negative is were not / weren't.",
      es: "they → were; el negativo es were not / weren't.",
    }),
    mistake("m3g4-9", "My coworkers was very busy too.", "was", "were", {
      en: "Plural subject → were.",
      es: "Sujeto plural → were.",
    }),
    mistake("m3g4-10", "I were tired in the morning.", "were", "was", {
      en: "I → was.",
      es: "Con I va was.",
    }),
    mistake("m3g4-11", "The office were full of people.", "were", "was", {
      en: "the office is one thing → was.",
      es: "the office es una sola cosa → was.",
    }),
    mistake("m3g4-12", "We was in a meeting in the morning.", "was", "were", {
      en: "we → were.",
      es: "Con we va were.",
    }),
    mistake("m3g4-13", "Yesterday did a busy day.", "did", "was", {
      en: "be does not use did: Yesterday was a busy day.",
      es: "El verbo be no usa did: Yesterday was a busy day.",
    }),
    mistake("m3g4-14", "I was happy when I finish work.", "finish", "finished", {
      en: "Both verbs go to the past: when I finished work.",
      es: "Los dos verbos van en pasado: when I finished work.",
    }),
    rearrange(
      "m3g4-15",
      ["a busy day", "Yesterday", "was"],
      ["Yesterday", "was", "a busy day"],
      { en: "Time + was + description.", es: "Tiempo + was + descripción." },
    ),
    rearrange(
      "m3g4-16",
      ["in the morning", "I", "tired", "was"],
      ["I", "was", "tired", "in the morning"],
      { en: "Subject + was + adjective + time.", es: "Sujeto + was + adjetivo + tiempo." },
    ),
    rearrange(
      "m3g4-17",
      ["very busy", "My coworkers", "too", "were"],
      ["My coworkers", "were", "very busy", "too"],
      { en: "too closes the sentence.", es: "too cierra la oración." },
    ),
    rearrange(
      "m3g4-18",
      ["in a meeting", "were", "We", "in the morning"],
      ["We", "were", "in a meeting", "in the morning"],
      { en: "Place before time.", es: "El lugar va antes del tiempo." },
    ),
    rearrange(
      "m3g4-19",
      ["when I finished work", "happy", "I", "was"],
      ["I", "was", "happy", "when I finished work"],
      { en: "The when part goes at the end.", es: "La parte con when va al final." },
    ),
    rearrange(
      "m3g4-20",
      ["a good day", "it", "Overall,", "was"],
      ["Overall,", "it", "was", "a good day"],
      { en: "Overall + it + was.", es: "Overall + it + was." },
    ),
  ],
};
