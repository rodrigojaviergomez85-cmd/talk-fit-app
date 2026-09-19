import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 1 · Día 6 — My friend's weekend: he's going to · he isn't going to.
 * 8 ancla · 4 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Lucía escribió el fin de semana de Carlos. Toca la palabra equivocada.";
const CHISME = "Lucía dijo la frase en desorden. Ordénala.";

export const SIMPLE_FUTURE_DAY_6: GrammarQuiz = {
  moduleId: "simple-future",
  day: 6,
  title: { en: "My Friend's Weekend", es: "El fin de semana de mi amigo" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("sfg6-1", "My friend Carlos ___ going to have a busy weekend.", "Mi amigo Carlos va a tener un fin de semana ocupado.", ["is", "are", "am"], 0, {
      en: "Carlos = he: is.",
      es: "Carlos → is going to.",
    }),
    mc("sfg6-2", "On Saturday, ___ going to play soccer.", "El sábado va a jugar fútbol.", ["he's", "his", "he"], 0, {
      en: "he's = he is.",
      es: "he's going to = he is going to.",
    }),
    mc("sfg6-3", "He ___ going to work on Saturday.", "No va a trabajar el sábado.", ["isn't", "not", "doesn't"], 0, {
      en: "he isn't going to.",
      es: "isn't going to: no va a. Con going to, el negativo es isn't.",
    }),
    mc("sfg6-4", "He's going to meet ___ teammates at the park.", "Va a ver a sus compañeros en el parque.", ["his", "her", "he"], 0, {
      en: "he → his.",
      es: "he → his teammates: sus (de él).",
    }),
    mistake("sfg6-5", "After the game, he's going to eating with them.", "eating", "eat", {
      en: "going to eat.",
      es: "going to + eat, verbo solo.",
    }, DETECTIVE),
    mistake("sfg6-6", "On Sunday, he are going to visit his parents.", "are", "is", {
      en: "he is.",
      es: "he → is going to.",
    }, DETECTIVE),
    rearrange(
      "sfg6-7",
      ["sleep early", "He's going to", "on Sunday night"],
      ["He's going to", "sleep early", "on Sunday night"],
      { en: "He's going to + verb + time.", es: "He's going to + verbo + tiempo." },
      CHISME,
    ),
    rearrange(
      "sfg6-8",
      ["tired but happy", "He's going to", "be"],
      ["He's going to", "be", "tired but happy"],
      { en: "He's going to + be + adjective.", es: "He's going to + be + adjetivo." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("sfg6-9", "My friend Ana ___ going to play volleyball on Saturday.", "Mi amiga Ana va a jugar vóleibol el sábado.", ["is", "are", "am"], 0, {
      en: "Ana = she: is.",
      es: "Ana → is going to.",
    }),
    mc("sfg6-10", "On Sunday, I ___ going to visit my parents.", "El domingo voy a visitar a mis papás.", ["am", "is", "are"], 0, {
      en: "I am.",
      es: "I → am going to.",
    }),
    mistake("sfg6-11", "Carlos and his teammates is going to eat pizza.", "is", "are", {
      en: "Carlos and his teammates: are.",
      es: "Varias personas → are going to.",
    }, DETECTIVE),
    rearrange(
      "sfg6-12",
      ["with my friends", "I'm going to", "play soccer"],
      ["I'm going to", "play soccer", "with my friends"],
      { en: "I'm going to + verb + with whom.", es: "I'm going to + verbo + con quién." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("sfg6-13", "Carlos is my friend. ___ 24 years old.", "Carlos es mi amigo. Tiene 24 años.", ["He's", "He has", "His"], 0, {
      en: "He is 24.",
      es: "La edad va con be: He's 24 = He is 24.",
    }),
    mc("sfg6-14", "___ is Carlos and ___ are his teammates.", "Este es Carlos y estos son sus compañeros.", ["This / these", "These / this", "This / this"], 0, {
      en: "this (one), these (many).",
      es: "This para uno, these para varios.",
    }),
    mistake("sfg6-15", "Tomorrow I'm going to wake up at six on the morning.", "on", "in", {
      en: "in the morning.",
      es: "in the morning: in con la parte del día. Repaso del día 2.",
    }, DETECTIVE),
    mistake("sfg6-16", "Carlos live in San Salvador with his parents.", "live", "lives", {
      en: "he lives.",
      es: "Carlos = he → lives, con -s.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("sfg6-17", "___ a soccer game on Saturday at ten.", "Hay un partido de fútbol el sábado a las diez.", ["There is", "There are", "It has"], 0, {
      en: "one game: there is.",
      es: "there is: hay, una cosa.",
    }),
    mc("sfg6-18", "How ___ teammates does Carlos have? · Ten.", "¿Cuántos compañeros tiene Carlos? · Diez.", ["many", "much", "long"], 0, {
      en: "How many + teammates.",
      es: "How many con cosas que se cuentan.",
    }),
    mistake("sfg6-19", "The park is close of his house.", "of", "to", {
      en: "close to his house.",
      es: "close to: cerca de.",
    }, DETECTIVE),
    mistake("sfg6-20", "He wants play soccer every weekend.", "wants", "wants to", {
      en: "wants to play.",
      es: "wants to + verbo: quiere jugar.",
    }, DETECTIVE),
  ],
};
