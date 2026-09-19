import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 2 · Día 8 — A superhero's day: he works as · he helps · he doesn't tell.
 * 8 ancla · 4 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Ana escribió la rutina de Superman. Toca la palabra equivocada.";
const CHISME = "Ana dijo la frase en desorden. Ordénala.";

export const SIMPLE_PRESENT_DAY_8: GrammarQuiz = {
  moduleId: "simple-present",
  day: 8,
  title: { en: "A Superhero's Day", es: "El día de un superhéroe" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("spg8-1", "Superman ___ a very unusual life.", "Superman vive una vida muy poco común.", ["lives", "live", "living"], 0, {
      en: "he lives.",
      es: "Superman = he → lives.",
    }),
    mc("spg8-2", "He works ___ a reporter.", "Trabaja como reportero.", ["as", "like", "for"], 0, {
      en: "works as + job.",
      es: "works as: trabaja como. «Works like» es calco.",
    }),
    mc("spg8-3", "He ___ tell everyone his secret.", "No le cuenta su secreto a todo el mundo.", ["doesn't", "don't", "isn't"], 0, {
      en: "he doesn't.",
      es: "he → doesn't.",
    }),
    mc("spg8-4", "He helps people because he ___ to protect them.", "Ayuda a la gente porque quiere protegerla.", ["wants", "want", "wanting"], 0, {
      en: "he wants.",
      es: "he → wants, con -s.",
    }),
    mistake("spg8-5", "He help people every day.", "help", "helps", {
      en: "he helps.",
      es: "he → helps, con -s.",
    }, DETECTIVE),
    mistake("spg8-6", "He fly to different places.", "fly", "flies", {
      en: "he flies.",
      es: "fly → flies con he: la y cambia a -ies.",
    }, DETECTIVE),
    rearrange(
      "spg8-7",
      ["when they are in danger", "saves people", "He"],
      ["He", "saves people", "when they are in danger"],
      { en: "He + verb-s + object + when.", es: "He + verbo con -s + objeto + cuándo." },
      CHISME,
    ),
    rearrange(
      "spg8-8",
      ["a very busy routine", "Superman has", "Overall,"],
      ["Overall,", "Superman has", "a very busy routine"],
      { en: "Overall, + name has + object.", es: "Overall, + nombre has + objeto." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("spg8-9", "I ___ as a customer service agent.", "Trabajo como agente de servicio al cliente.", ["work", "works", "working"], 0, {
      en: "I work: no -s.",
      es: "Con I, sin -s.",
    }),
    mc("spg8-10", "My coworkers ___ people every day too.", "Mis compañeros también ayudan a la gente todos los días.", ["help", "helps", "helping"], 0, {
      en: "they help.",
      es: "my coworkers = they → help, sin -s.",
    }),
    mistake("spg8-11", "Ana don't tell everyone her plans.", "don't", "doesn't", {
      en: "she doesn't.",
      es: "Ana = she → doesn't.",
    }, DETECTIVE),
    rearrange(
      "spg8-12",
      ["as a nurse", "works", "My aunt"],
      ["My aunt", "works", "as a nurse"],
      { en: "Subject + works as + job.", es: "Sujeto + works as + profesión." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("spg8-13", "Cristiano ___ almost every day. He ___ usually stay up late.", "Cristiano entrena casi todos los días. Normalmente no se queda despierto hasta tarde.", ["trains / doesn't", "train / don't", "trains / don't"], 0, {
      en: "he trains; he doesn't.",
      es: "he → -s y doesn't. Repaso del día 7.",
    }),
    mc("spg8-14", "Superman is strong. ___ from Krypton and ___ job is at a newspaper.", "Superman es fuerte. Es de Krypton y su trabajo es en un periódico.", ["He's / his", "His / he's", "He's / her"], 0, {
      en: "He's from; his job.",
      es: "He's = He is; his antes del sustantivo.",
    }),
    mistake("spg8-15", "Look at the sky! Superman are going to fly.", "are", "is", {
      en: "Superman = he: is.",
      es: "Superman → is going to. Repaso de Basic 1.",
    }, DETECTIVE),
    mistake("spg8-16", "Ana is a agent in the city.", "a", "an", {
      en: "an agent.",
      es: "an agent: vocal.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("spg8-17", "___ many people in danger in the city.", "Hay mucha gente en peligro en la ciudad.", ["There are", "There is", "They are"], 0, {
      en: "many people: there are.",
      es: "there are: people es plural.",
    }),
    mc("spg8-18", "How ___ people does he save every day? · A lot.", "¿A cuántas personas salva cada día? · A muchas.", ["many", "much", "long"], 0, {
      en: "How many + people.",
      es: "How many con personas.",
    }),
    mistake("spg8-19", "He wants protect the city.", "wants", "wants to", {
      en: "wants to protect.",
      es: "wants to + verbo.",
    }, DETECTIVE),
    mistake("spg8-20", "He works in a newspaper close to the park.", "in", "at", {
      en: "works at a newspaper.",
      es: "at con el lugar de trabajo.",
    }, DETECTIVE),
  ],
};
