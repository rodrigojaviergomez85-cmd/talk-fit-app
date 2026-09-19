import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 1 · Día 10 — Their plans challenge: he's / she's / they're going to.
 * 8 ancla · 4 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Tomás escribió los planes de su familia. Toca la palabra equivocada.";
const CHISME = "Tomás dijo la frase en desorden. Ordénala.";

export const SIMPLE_FUTURE_DAY_10: GrammarQuiz = {
  moduleId: "simple-future",
  day: 10,
  title: { en: "Their Plans Challenge", es: "Reto: los planes de otros" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("sfg10-1", "My brother ___ going to start a new job next week.", "Mi hermano va a empezar un trabajo nuevo la próxima semana.", ["is", "are", "am"], 0, {
      en: "my brother = he: is.",
      es: "my brother → is going to.",
    }),
    mc("sfg10-2", "He's going to wake up ___ every day.", "Se va a despertar más temprano todos los días.", ["earlier", "more early", "early more"], 0, {
      en: "earlier = more early.",
      es: "earlier: más temprano. Early + -er.",
    }),
    mc("sfg10-3", "My parents ___ going to visit us in December.", "Mis papás nos van a visitar en diciembre.", ["are", "is", "am"], 0, {
      en: "parents: are.",
      es: "my parents = they → are going to.",
    }),
    mc("sfg10-4", "___ going to stay for two weeks.", "Se van a quedar dos semanas.", ["They're", "Their", "There"], 0, {
      en: "They're = They are.",
      es: "They're going to = They are going to.",
    }),
    mistake("sfg10-5", "He isn't going to works on weekends.", "works", "work", {
      en: "going to work.",
      es: "going to + work, verbo solo.",
    }, DETECTIVE),
    mistake("sfg10-6", "My sister are going to study English with me.", "are", "is", {
      en: "my sister = she: is.",
      es: "my sister → is going to.",
    }, DETECTIVE),
    rearrange(
      "sfg10-7",
      ["thirty minutes a day", "practice", "She's going to"],
      ["She's going to", "practice", "thirty minutes a day"],
      { en: "She's going to + verb + how long.", es: "She's going to + verbo + cuánto tiempo." },
      CHISME,
    ),
    rearrange(
      "sfg10-8",
      ["very busy", "Everybody is going to", "be"],
      ["Everybody is going to", "be", "very busy"],
      { en: "Everybody is going to + be + adjective.", es: "Everybody is going to + be + adjetivo." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("sfg10-9", "Next week, I ___ going to start a new job too.", "La próxima semana yo también voy a empezar un trabajo nuevo.", ["am", "is", "are"], 0, {
      en: "I am.",
      es: "I → am going to.",
    }),
    mc("sfg10-10", "My sister and I ___ going to practice every day.", "Mi hermana y yo vamos a practicar todos los días.", ["are", "am", "is"], 0, {
      en: "my sister and I = we: are.",
      es: "we → are going to.",
    }),
    mistake("sfg10-11", "My parents doesn't going to stay in a hotel.", "doesn't", "aren't", {
      en: "they aren't going to.",
      es: "Con going to, el negativo es aren't, no doesn't.",
    }, DETECTIVE),
    rearrange(
      "sfg10-12",
      ["visit us", "in December", "My cousins are going to"],
      ["My cousins are going to", "visit us", "in December"],
      { en: "Subject + are going to + verb + month.", es: "Sujeto + are going to + verbo + mes." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("sfg10-13", "___ are my parents. ___ names are Rosa and Luis.", "Estos son mis papás. Sus nombres son Rosa y Luis.", ["These / Their", "This / Their", "These / They"], 0, {
      en: "These (two people), their names.",
      es: "These para varios; their: de ellos.",
    }),
    mc("sfg10-14", "Maria isn't going to go out. ___ going to study.", "María no va a salir. Va a estudiar.", ["She's", "Her", "He's"], 0, {
      en: "Maria → She's.",
      es: "Maria → She's going to. Repaso del día 9.",
    }),
    mistake("sfg10-15", "My brother work at a bank.", "work", "works", {
      en: "he works.",
      es: "my brother = he → works, con -s.",
    }, DETECTIVE),
    mistake("sfg10-16", "My parents lives in Santa Ana.", "lives", "live", {
      en: "they live.",
      es: "my parents = they → live, sin -s.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("sfg10-17", "___ two weeks of vacation in December.", "Hay dos semanas de vacaciones en diciembre.", ["There are", "There is", "They are"], 0, {
      en: "two weeks: there are.",
      es: "there are: hay, plural.",
    }),
    mc("sfg10-18", "My parents are going to arrive ___ December ___ Monday.", "Mis papás van a llegar en diciembre, un lunes.", ["in / on", "on / in", "at / on"], 0, {
      en: "in December, on Monday.",
      es: "in con el mes, on con el día.",
    }),
    mistake("sfg10-19", "My sister needs practice English every day.", "needs", "needs to", {
      en: "needs to practice.",
      es: "needs to + verbo.",
    }, DETECTIVE),
    mistake("sfg10-20", "My brother's new job is close from our house.", "from", "to", {
      en: "close to our house.",
      es: "close to: cerca de.",
    }, DETECTIVE),
  ],
};
