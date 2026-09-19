import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 1 · Día 14 — His / her future: she'll · he won't · they'll.
 * 8 ancla · 4 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Daniel escribió el futuro de su amiga Ana. Toca la palabra equivocada.";
const CHISME = "Daniel dijo la frase en desorden. Ordénala.";

export const SIMPLE_FUTURE_DAY_14: GrammarQuiz = {
  moduleId: "simple-future",
  day: 14,
  title: { en: "Her Future", es: "El futuro de ella" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("sfg14-1", "My friend Ana ___ finish her studies this year.", "Mi amiga Ana va a terminar sus estudios este año.", ["will", "wills", "is"], 0, {
      en: "will: same for she.",
      es: "will no cambia con she.",
    }),
    mc("sfg14-2", "I think ___ find a good job.", "Creo que va a encontrar un buen trabajo.", ["she'll", "her", "she's"], 0, {
      en: "she'll = she will.",
      es: "she'll = she will find.",
    }),
    mc("sfg14-3", "She ___ have any problem with English.", "No va a tener ningún problema con el inglés.", ["won't", "doesn't", "isn't"], 0, {
      en: "won't = will not.",
      es: "won't have: no va a tener.",
    }),
    mc("sfg14-4", "___ brother will start his own business.", "Su hermano va a empezar su propio negocio.", ["Her", "His", "She"], 0, {
      en: "Ana → her brother.",
      es: "Ana → Her brother: su (de ella).",
    }),
    mistake("sfg14-5", "She'll works in a bilingual company.", "works", "work", {
      en: "will work.",
      es: "will + work, sin -s.",
    }, DETECTIVE),
    mistake("sfg14-6", "He won't works for another company.", "works", "work", {
      en: "won't work.",
      es: "won't + work, verbo solo.",
    }, DETECTIVE),
    rearrange(
      "sfg14-7",
      ["a lot", "help each other", "They'll"],
      ["They'll", "help each other", "a lot"],
      { en: "They'll + verb + how much.", es: "They'll + verbo + cuánto." },
      CHISME,
    ),
    rearrange(
      "sfg14-8",
      ["very successful", "I think", "they'll be"],
      ["I think", "they'll be", "very successful"],
      { en: "I think + they'll be + adjective.", es: "I think + they'll be + adjetivo." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("sfg14-9", "I think ___ finish my studies next year.", "Creo que voy a terminar mis estudios el próximo año.", ["I'll", "I'm", "I"], 0, {
      en: "I'll = I will.",
      es: "I'll finish: predicción sobre mí.",
    }),
    mc("sfg14-10", "My brother ___ start his own business too.", "Mi hermano también va a empezar su propio negocio.", ["will", "is", "wills"], 0, {
      en: "will start.",
      es: "will + start.",
    }),
    mistake("sfg14-11", "Ana and Daniel will finds good jobs.", "finds", "find", {
      en: "will find.",
      es: "will + find, sin -s.",
    }, DETECTIVE),
    rearrange(
      "sfg14-12",
      ["He'll", "next year", "start his business"],
      ["He'll", "start his business", "next year"],
      { en: "He'll + verb + object + time.", es: "He'll + verbo + objeto + tiempo." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("sfg14-13", "I think it ___ rain this afternoon.", "Creo que va a llover esta tarde.", ["will", "is", "goes"], 0, {
      en: "I think it will.",
      es: "I think + will: predicción. Repaso del día 13.",
    }),
    mc("sfg14-14", "Ana is 22. ___ studies at the university and ___ favorite class is English.", "Ana tiene 22. Estudia en la universidad y su clase favorita es inglés.", ["She / her", "Her / she", "She / his"], 0, {
      en: "She studies; her favorite.",
      es: "she antes del verbo, her antes del sustantivo.",
    }),
    mistake("sfg14-15", "Ana's brother are going to start a business.", "are", "is", {
      en: "brother = he: is.",
      es: "Ana's brother → is going to.",
    }, DETECTIVE),
    mistake("sfg14-16", "Ana study English every day.", "study", "studies", {
      en: "she studies.",
      es: "Ana = she → studies.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("sfg14-17", "___ many bilingual companies in the city.", "Hay muchas empresas bilingües en la ciudad.", ["There are", "There is", "They are"], 0, {
      en: "many companies: there are.",
      es: "there are: hay, plural.",
    }),
    mc("sfg14-18", "How ___ companies are in the city? · About twenty.", "¿Cuántas empresas hay en la ciudad? · Unas veinte.", ["many", "much", "long"], 0, {
      en: "How many + companies.",
      es: "How many con cosas que se cuentan.",
    }),
    mistake("sfg14-19", "Ana wants work in a bilingual company.", "wants", "wants to", {
      en: "wants to work.",
      es: "wants to + verbo.",
    }, DETECTIVE),
    mistake("sfg14-20", "Ana's university is close of my office.", "of", "to", {
      en: "close to my office.",
      es: "close to: cerca de.",
    }, DETECTIVE),
  ],
};
