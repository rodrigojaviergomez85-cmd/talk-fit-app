import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/** BASIC 3 · Día 3 — After Work Yesterday (went, watched, did). */
export const PAST_STORIES_DAY_3: GrammarQuiz = {
  moduleId: "past-stories",
  day: 3,
  title: { en: "After Work Yesterday", es: "Después del trabajo ayer" },
  items: [
    mc("m3g3-1", "I ___ home after work.", "Me fui a casa después del trabajo.", ["goed", "went", "go", "gone"], 1, {
      en: "go → went. gone is the participle.",
      es: "go → went. «gone» es participio, no pasado simple.",
    }),
    mc("m3g3-2", "I ___ some TV.", "Vi un poco de televisión.", ["watch", "watchd", "watched", "wached"], 2, {
      en: "watch → watched.",
      es: "watch → watched.",
    }),
    mc("m3g3-3", "I ___ a few things around the house.", "Hice algunas cosas en la casa.", ["did", "done", "do", "doed"], 0, {
      en: "do → did.",
      es: "do → did. «done» es participio.",
    }),
    mc("m3g3-4", "I ___ dinner at home.", "Cené en casa.", ["eated", "eat", "ate", "eaten"], 2, {
      en: "eat → ate.",
      es: "eat → ate.",
    }),
    mc("m3g3-5", "I ___ to a friend on the phone.", "Hablé con un amigo por teléfono.", ["talked", "talk", "tolked", "talking"], 0, {
      en: "talk → talked.",
      es: "talk → talked.",
    }),
    mc("m3g3-6", "I ___ to bed around ten thirty.", "Me acosté como a las diez y media.", ["go", "goed", "went", "gone"], 2, {
      en: "go to bed → went to bed.",
      es: "go to bed → went to bed.",
    }),
    mc("m3g3-7", "I ___ work around five.", "Salí del trabajo como a las cinco.", ["leaved", "leave", "left", "leaves"], 2, {
      en: "leave → left.",
      es: "leave → left.",
    }),
    mc("m3g3-8", "Overall, I ___ a relaxing evening.", "En general, tuve una noche relajada.", ["have", "had", "haved", "has"], 1, {
      en: "have → had.",
      es: "have → had.",
    }),
    mistake("m3g3-9", "I goed home after work.", "goed", "went", {
      en: "go → went.",
      es: "go → went, nunca goed.",
    }),
    mistake("m3g3-10", "I done a few things around the house.", "done", "did", {
      en: "The simple past of do is did.",
      es: "El pasado simple de do es did.",
    }),
    mistake("m3g3-11", "I watch some TV last night.", "watch", "watched", {
      en: "last night needs the past: watched.",
      es: "last night pide pasado: watched.",
    }),
    mistake("m3g3-12", "I went to bed at ten thirty yesterday night.", "yesterday", "last", {
      en: "We say last night, not yesterday night.",
      es: "Se dice last night, no yesterday night.",
    }),
    mistake("m3g3-13", "I didn't watched TV last night.", "watched", "watch", {
      en: "After didn't the verb goes back to its base form: didn't watch.",
      es: "Después de didn't el verbo vuelve a su forma base: didn't watch.",
    }),
    mistake("m3g3-14", "I eated dinner at home.", "eated", "ate", {
      en: "eat → ate.",
      es: "eat → ate.",
    }),
    rearrange(
      "m3g3-15",
      ["after work", "went", "home", "I"],
      ["I", "went", "home", "after work"],
      { en: "go home has no to.", es: "go home no lleva to." },
    ),
    rearrange(
      "m3g3-16",
      ["some TV", "watched", "I", "in the evening"],
      ["I", "watched", "some TV", "in the evening"],
      { en: "What first, then when.", es: "Primero qué, luego cuándo." },
    ),
    rearrange(
      "m3g3-17",
      ["on the phone", "talked", "to a friend", "I"],
      ["I", "talked", "to a friend", "on the phone"],
      { en: "Person first, then how.", es: "Primero la persona, luego el cómo." },
    ),
    rearrange(
      "m3g3-18",
      ["around the house", "did", "a few things", "I"],
      ["I", "did", "a few things", "around the house"],
      { en: "Subject + did + what + where.", es: "Sujeto + did + qué + dónde." },
    ),
    rearrange(
      "m3g3-19",
      ["to bed", "around ten thirty", "went", "I"],
      ["I", "went", "to bed", "around ten thirty"],
      { en: "went to bed stays together.", es: "went to bed va junto." },
    ),
    rearrange(
      "m3g3-20",
      ["a relaxing evening", "I", "Overall,", "had"],
      ["Overall,", "I", "had", "a relaxing evening"],
      { en: "Overall opens the closing sentence.", es: "Overall abre la oración de cierre." },
    ),
  ],
};
