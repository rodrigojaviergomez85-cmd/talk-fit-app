import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/** BASIC 3 · Día 1 — My Morning Yesterday (pasado simple, verbos irregulares). */
export const PAST_STORIES_DAY_1: GrammarQuiz = {
  moduleId: "past-stories",
  day: 1,
  title: { en: "My Morning Yesterday", es: "Mi mañana de ayer" },
  items: [
    mc("m3g1-1", "Yesterday, I ___ up at six thirty.", "Ayer me desperté a las seis y media.", ["wake", "woke", "waked", "waking"], 1, {
      en: "wake is irregular: wake → woke.",
      es: "wake es irregular: wake → woke. No existe «waked».",
    }),
    mc("m3g1-2", "I ___ a shower before work.", "Me bañé antes del trabajo.", ["take", "taked", "took", "takes"], 2, {
      en: "take → took (irregular).",
      es: "take → took. Es irregular, no lleva -ed.",
    }),
    mc("m3g1-3", "I ___ breakfast at home.", "Desayuné en casa.", ["eat", "eated", "ate", "eaten"], 2, {
      en: "eat → ate in the simple past.",
      es: "eat → ate en pasado simple. «eaten» es participio.",
    }),
    mc("m3g1-4", "I ___ some coffee before work.", "Tomé café antes del trabajo.", ["drinked", "drank", "drink", "drunk"], 1, {
      en: "drink → drank.",
      es: "drink → drank en pasado simple.",
    }),
    mc("m3g1-5", "I ___ home around seven thirty.", "Salí de casa como a las siete y media.", ["leaved", "leave", "left", "leaves"], 2, {
      en: "leave → left.",
      es: "leave → left. Es irregular.",
    }),
    mc("m3g1-6", "I ___ dressed for work.", "Me vestí para el trabajo.", ["got", "getted", "get", "gets"], 0, {
      en: "get → got: I got dressed.",
      es: "get → got: I got dressed.",
    }),
    mc("m3g1-7", "Overall, I ___ a good morning.", "En general, tuve una buena mañana.", ["have", "haved", "had", "has"], 2, {
      en: "have → had.",
      es: "have → had en pasado.",
    }),
    mc("m3g1-8", "I ___ a little tired in the morning.", "Estaba un poco cansado en la mañana.", ["was", "were", "am", "is"], 0, {
      en: "With I the past of be is was.",
      es: "Con I el pasado de be es was.",
    }),
    mistake("m3g1-9", "Yesterday I waked up at six.", "waked", "woke", {
      en: "wake is irregular: woke, not waked.",
      es: "wake es irregular: woke, no waked.",
    }),
    mistake("m3g1-10", "I eated breakfast at home.", "eated", "ate", {
      en: "eat → ate.",
      es: "eat → ate. No se agrega -ed a los irregulares.",
    }),
    mistake("m3g1-11", "I taked a shower before work.", "taked", "took", {
      en: "take → took.",
      es: "take → took.",
    }),
    mistake("m3g1-12", "I leaved home around seven thirty.", "leaved", "left", {
      en: "leave → left.",
      es: "leave → left.",
    }),
    mistake("m3g1-13", "I drinked some coffee.", "drinked", "drank", {
      en: "drink → drank.",
      es: "drink → drank.",
    }),
    mistake("m3g1-14", "I was get out of bed at six thirty.", "get", "got", {
      en: "One past verb is enough: I got out of bed.",
      es: "Un solo verbo en pasado: I got out of bed.",
    }),
    rearrange(
      "m3g1-15",
      ["at six thirty", "Yesterday", "woke up", "I"],
      ["Yesterday", "I", "woke up", "at six thirty"],
      { en: "Time word + subject + past verb + time.", es: "Palabra de tiempo + sujeto + verbo en pasado + hora." },
    ),
    rearrange(
      "m3g1-16",
      ["a shower", "I", "took", "before work"],
      ["I", "took", "a shower", "before work"],
      { en: "Subject + verb + object + time.", es: "Sujeto + verbo + objeto + tiempo." },
    ),
    rearrange(
      "m3g1-17",
      ["breakfast", "ate", "at home", "I"],
      ["I", "ate", "breakfast", "at home"],
      { en: "Subject + verb + what + where.", es: "Sujeto + verbo + qué + dónde." },
    ),
    rearrange(
      "m3g1-18",
      ["around seven thirty", "left", "home", "I"],
      ["I", "left", "home", "around seven thirty"],
      { en: "The time goes at the end.", es: "La hora va al final." },
    ),
    rearrange(
      "m3g1-19",
      ["tired", "I", "in the morning", "was"],
      ["I", "was", "tired", "in the morning"],
      { en: "was comes right after I.", es: "was va justo después de I." },
    ),
    rearrange(
      "m3g1-20",
      ["a good morning", "Overall,", "had", "I"],
      ["Overall,", "I", "had", "a good morning"],
      { en: "Overall opens the sentence.", es: "Overall abre la oración." },
    ),
  ],
};
