import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/** BASIC 3 · Día 2 — At Work Yesterday (verbos regulares -ed). */
export const PAST_STORIES_DAY_2: GrammarQuiz = {
  moduleId: "past-stories",
  day: 2,
  title: { en: "At Work Yesterday", es: "En el trabajo ayer" },
  items: [
    mc("m3g2-1", "I ___ at work around eight.", "Llegué al trabajo como a las ocho.", ["arrive", "arrived", "arriveed", "arriving"], 1, {
      en: "arrive already ends in -e, so you only add -d.",
      es: "arrive ya termina en -e: solo se agrega -d → arrived.",
    }),
    mc("m3g2-2", "I ___ to several customers.", "Hablé con varios clientes.", ["talk", "talkd", "talked", "tolk"], 2, {
      en: "talk is regular: talk + ed.",
      es: "talk es regular: talk + ed = talked.",
    }),
    mc("m3g2-3", "I ___ emails during the morning.", "Respondí correos durante la mañana.", ["answered", "answerd", "answer", "answering"], 0, {
      en: "answer + ed = answered.",
      es: "answer + ed = answered.",
    }),
    mc("m3g2-4", "I ___ a customer with a problem.", "Ayudé a un cliente con un problema.", ["help", "helpped", "helped", "holp"], 2, {
      en: "help → helped, with one p.",
      es: "help → helped, con una sola p.",
    }),
    mc("m3g2-5", "I ___ work around five.", "Terminé de trabajar como a las cinco.", ["finish", "finished", "finishd", "finishing"], 1, {
      en: "finish → finished.",
      es: "finish → finished.",
    }),
    mc("m3g2-6", "I ___ my day with a meeting.", "Empecé mi día con una reunión.", ["started", "startd", "start", "starting"], 0, {
      en: "start → started.",
      es: "start → started.",
    }),
    mc("m3g2-7", "I ___ lunch with my coworkers.", "Almorcé con mis compañeros.", ["haved", "have", "had", "has"], 2, {
      en: "have is irregular even in a day of -ed verbs: have → had.",
      es: "have es irregular aunque el día sea de verbos -ed: have → had.",
    }),
    mc("m3g2-8", "Overall, it ___ a busy day.", "En general, fue un día ocupado.", ["was", "were", "is", "be"], 0, {
      en: "it → was.",
      es: "Con it se usa was.",
    }),
    mistake("m3g2-9", "I arrive at work around eight yesterday.", "arrive", "arrived", {
      en: "yesterday needs the past: arrived.",
      es: "yesterday pide pasado: arrived.",
    }),
    mistake("m3g2-10", "I talkd to several customers.", "talkd", "talked", {
      en: "The regular past ending is -ed: talked.",
      es: "La terminación regular es -ed: talked.",
    }),
    mistake("m3g2-11", "I helpped a customer with a problem.", "helpped", "helped", {
      en: "help does not double the p: helped.",
      es: "help no dobla la p: helped.",
    }),
    mistake("m3g2-12", "Yesterday I answer emails all morning.", "answer", "answered", {
      en: "yesterday needs the past: answered.",
      es: "yesterday pide pasado: answered.",
    }),
    mistake("m3g2-13", "I haved lunch with my coworkers.", "haved", "had", {
      en: "have → had, never haved.",
      es: "have → had, nunca haved.",
    }),
    mistake("m3g2-14", "Yesterday it were a busy day.", "were", "was", {
      en: "it takes was, not were.",
      es: "Con it se usa was, no were.",
    }),
    rearrange(
      "m3g2-15",
      ["around eight", "arrived", "I", "at work"],
      ["I", "arrived", "at work", "around eight"],
      { en: "Subject + past verb + place + time.", es: "Sujeto + verbo en pasado + lugar + hora." },
    ),
    rearrange(
      "m3g2-16",
      ["to several customers", "talked", "I"],
      ["I", "talked", "to several customers"],
      { en: "talk to + person.", es: "talk to + persona." },
    ),
    rearrange(
      "m3g2-17",
      ["emails", "during the morning", "answered", "I"],
      ["I", "answered", "emails", "during the morning"],
      { en: "What first, then when.", es: "Primero qué, luego cuándo." },
    ),
    rearrange(
      "m3g2-18",
      ["a customer", "with a problem", "helped", "I"],
      ["I", "helped", "a customer", "with a problem"],
      { en: "Person first, then the detail.", es: "Primero la persona, luego el detalle." },
    ),
    rearrange(
      "m3g2-19",
      ["with my coworkers", "I", "lunch", "had"],
      ["I", "had", "lunch", "with my coworkers"],
      { en: "have lunch with + people.", es: "have lunch with + personas." },
    ),
    rearrange(
      "m3g2-20",
      ["a busy day", "Overall,", "was", "it"],
      ["Overall,", "it", "was", "a busy day"],
      { en: "Overall + it + was.", es: "Overall + it + was." },
    ),
  ],
};
