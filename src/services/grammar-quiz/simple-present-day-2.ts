import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 2 · Día 2 — Someone I know: she works · he starts · -s de tercera persona.
 * 8 ancla · 4 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Sofía escribió la rutina de su hermana. Toca la palabra equivocada.";
const CHISME = "Sofía dijo la frase en desorden. Ordénala.";

export const SIMPLE_PRESENT_DAY_2: GrammarQuiz = {
  moduleId: "simple-present",
  day: 2,
  title: { en: "Someone I Know", es: "Alguien que conozco" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("spg2-1", "My sister ___ from home.", "Mi hermana trabaja desde casa.", ["works", "work", "working"], 0, {
      en: "she works: -s.",
      es: "my sister = she → works, con -s.",
    }),
    mc("spg2-2", "She usually ___ work around seven.", "Normalmente empieza a trabajar a eso de las siete.", ["starts", "start", "starting"], 0, {
      en: "she starts.",
      es: "she → starts, con -s.",
    }),
    mc("spg2-3", "She ___ her job because it is flexible.", "Le gusta su trabajo porque es flexible.", ["likes", "like", "liking"], 0, {
      en: "she likes.",
      es: "she → likes, con -s.",
    }),
    mc("spg2-4", "She sometimes works late because ___ team is busy.", "A veces trabaja tarde porque su equipo está ocupado.", ["her", "his", "she"], 0, {
      en: "she → her team.",
      es: "she → her: su (de ella).",
    }),
    mistake("spg2-5", "She talk to customers every day.", "talk", "talks", {
      en: "she talks.",
      es: "she → talks, con -s.",
    }, DETECTIVE),
    mistake("spg2-6", "Overall, she really enjoy her routine.", "enjoy", "enjoys", {
      en: "she enjoys.",
      es: "she → enjoys, con -s.",
    }, DETECTIVE),
    rearrange(
      "spg2-7",
      ["from home", "works", "My sister"],
      ["My sister", "works", "from home"],
      { en: "Subject + verb-s + place.", es: "Sujeto + verbo con -s + lugar." },
      CHISME,
    ),
    rearrange(
      "spg2-8",
      ["late", "She sometimes", "works"],
      ["She sometimes", "works", "late"],
      { en: "She sometimes + verb-s + adverb.", es: "She sometimes + verbo con -s + adverbio." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("spg2-9", "My brother ___ at a bank.", "Mi hermano trabaja en un banco.", ["works", "work", "working"], 0, {
      en: "he works.",
      es: "my brother = he → works.",
    }),
    mc("spg2-10", "I ___ from home too.", "Yo también trabajo desde casa.", ["work", "works", "working"], 0, {
      en: "I work: no -s.",
      es: "Con I no hay -s.",
    }),
    mistake("spg2-11", "Daniel like his job because it is flexible.", "like", "likes", {
      en: "he likes.",
      es: "Daniel = he → likes.",
    }, DETECTIVE),
    rearrange(
      "spg2-12",
      ["starts work", "at eight", "My dad usually"],
      ["My dad usually", "starts work", "at eight"],
      { en: "Subject usually + verb-s + time.", es: "Sujeto usually + verbo con -s + hora." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("spg2-13", "I usually ___ up at six and I ___ breakfast at home.", "Normalmente me despierto a las seis y desayuno en casa.", ["wake / have", "wakes / has", "wake / has"], 0, {
      en: "I wake, I have.",
      es: "Con I, sin -s. Repaso del día 1.",
    }),
    mc("spg2-14", "My sister is 30. ___ is ___ engineer.", "Mi hermana tiene 30. Es ingeniera.", ["She / an", "Her / an", "She / a"], 0, {
      en: "She is an engineer.",
      es: "she antes del verbo; an engineer, vocal.",
    }),
    mistake("spg2-15", "Tomorrow my sister are going to work late.", "are", "is", {
      en: "my sister = she: is.",
      es: "my sister → is going to. Repaso de Basic 1.",
    }, DETECTIVE),
    mistake("spg2-16", "My sister have 30 years old.", "have", "is", {
      en: "She is 30.",
      es: "My sister is 30 years old.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("spg2-17", "___ a computer in her room.", "Hay una computadora en su cuarto.", ["There is", "There are", "It is"], 0, {
      en: "one computer: there is.",
      es: "there is: hay, una cosa.",
    }),
    mc("spg2-18", "How ___ hours does she work? · Eight.", "¿Cuántas horas trabaja? · Ocho.", ["many", "much", "long"], 0, {
      en: "How many + hours.",
      es: "How many con cosas que se cuentan.",
    }),
    mistake("spg2-19", "She wants work from home every day.", "wants", "wants to", {
      en: "wants to work.",
      es: "wants to + verbo.",
    }, DETECTIVE),
    mistake("spg2-20", "She starts work in seven o'clock.", "in", "at", {
      en: "at seven o'clock.",
      es: "at con la hora.",
    }, DETECTIVE),
  ],
};
