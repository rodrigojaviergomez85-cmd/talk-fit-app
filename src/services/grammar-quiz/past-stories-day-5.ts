import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/** BASIC 3 · Día 5 — My Yesterday Challenge (todo el día: mezcla de la semana). */
export const PAST_STORIES_DAY_5: GrammarQuiz = {
  moduleId: "past-stories",
  day: 5,
  title: { en: "My Yesterday Challenge", es: "Mi reto de ayer" },
  items: [
    mc("m3g5-1", "Yesterday ___ a normal day for me.", "Ayer fue un día normal para mí.", ["were", "was", "is", "did"], 1, {
      en: "One day → was.",
      es: "Un día → was.",
    }),
    mc("m3g5-2", "I woke up early and ___ a shower.", "Me desperté temprano y me bañé.", ["take", "taked", "took", "taking"], 2, {
      en: "Both verbs go in the past: woke up and took.",
      es: "Los dos verbos van en pasado: woke up and took.",
    }),
    mc("m3g5-3", "I ate breakfast and ___ some coffee.", "Desayuné y tomé café.", ["drink", "drank", "drinked", "drunk"], 1, {
      en: "drink → drank.",
      es: "drink → drank.",
    }),
    mc("m3g5-4", "Then, I ___ to work.", "Luego fui al trabajo.", ["goed", "go", "went", "gone"], 2, {
      en: "go → went.",
      es: "go → went.",
    }),
    mc("m3g5-5", "My coworkers ___ very busy.", "Mis compañeros estaban muy ocupados.", ["was", "were", "are", "is"], 1, {
      en: "Plural → were.",
      es: "Plural → were.",
    }),
    mc("m3g5-6", "After work, I ___ home and made dinner.", "Después del trabajo, llegué a casa e hice la cena.", ["comed", "come", "came", "coming"], 2, {
      en: "come → came.",
      es: "come → came.",
    }),
    mc("m3g5-7", "Later, I watched TV and ___ to bed.", "Más tarde vi televisión y me acosté.", ["go", "went", "gone", "goed"], 1, {
      en: "go to bed → went to bed.",
      es: "go to bed → went to bed.",
    }),
    mc("m3g5-8", "___ you talk to a lot of people yesterday?", "¿Hablaste con mucha gente ayer?", ["Did", "Was", "Were", "Do"], 0, {
      en: "Past questions with action verbs use Did + base form.",
      es: "Las preguntas en pasado con verbos de acción usan Did + verbo base.",
    }),
    mistake("m3g5-9", "Yesterday were a normal day for me.", "were", "was", {
      en: "One day → was.",
      es: "Un día → was.",
    }),
    mistake("m3g5-10", "I woke up early and take a shower.", "take", "took", {
      en: "The second verb also goes in the past: took.",
      es: "El segundo verbo también va en pasado: took.",
    }),
    mistake("m3g5-11", "Then, I goed to work.", "goed", "went", {
      en: "go → went.",
      es: "go → went.",
    }),
    mistake("m3g5-12", "After work, I comed home and made dinner.", "comed", "came", {
      en: "come → came.",
      es: "come → came.",
    }),
    mistake("m3g5-13", "Did you talked to a lot of people?", "talked", "talk", {
      en: "After Did the verb stays in its base form: Did you talk…?",
      es: "Después de Did el verbo queda en forma base: Did you talk…?",
    }),
    mistake("m3g5-14", "My coworkers was very busy yesterday.", "was", "were", {
      en: "Plural subject → were.",
      es: "Sujeto plural → were.",
    }),
    rearrange(
      "m3g5-15",
      ["a normal day", "Yesterday", "for me", "was"],
      ["Yesterday", "was", "a normal day", "for me"],
      { en: "for me closes the sentence.", es: "for me cierra la oración." },
    ),
    rearrange(
      "m3g5-16",
      ["and took a shower", "I", "early", "woke up"],
      ["I", "woke up", "early", "and took a shower"],
      { en: "First action, then the second one with and.", es: "Primero una acción, luego la otra con and." },
    ),
    rearrange(
      "m3g5-17",
      ["to work", "Then,", "went", "I"],
      ["Then,", "I", "went", "to work"],
      { en: "Then opens the next step.", es: "Then abre el siguiente paso." },
    ),
    rearrange(
      "m3g5-18",
      ["and made dinner", "I", "After work,", "came home"],
      ["After work,", "I", "came home", "and made dinner"],
      { en: "The time phrase opens the sentence.", es: "La frase de tiempo abre la oración." },
    ),
    rearrange(
      "m3g5-19",
      ["and went to bed", "Later,", "watched TV", "I"],
      ["Later,", "I", "watched TV", "and went to bed"],
      { en: "Later + subject + two past actions.", es: "Later + sujeto + dos acciones en pasado." },
    ),
    rearrange(
      "m3g5-20",
      ["a good day", "was", "Overall,", "it"],
      ["Overall,", "it", "was", "a good day"],
      { en: "Overall + it + was.", es: "Overall + it + was." },
    ),
  ],
};
