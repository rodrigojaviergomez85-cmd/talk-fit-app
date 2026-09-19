import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 2 · Día 10 — Different people, different routines: he / she / they mezclados.
 * 8 ancla · 4 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Tomás escribió sobre una persona misteriosa. Toca la palabra equivocada.";
const CHISME = "Tomás dijo la frase en desorden. Ordénala.";

export const SIMPLE_PRESENT_DAY_10: GrammarQuiz = {
  moduleId: "simple-present",
  day: 10,
  title: { en: "Routines Challenge", es: "Reto: rutinas de otros" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("spg10-1", "This person ___ an interesting routine.", "Esta persona tiene una rutina interesante.", ["has", "have", "haves"], 0, {
      en: "this person = he/she: has.",
      es: "This person → has.",
    }),
    mc("spg10-2", "He usually ___ up before most people.", "Normalmente se levanta antes que la mayoría.", ["gets", "get", "getting"], 0, {
      en: "he gets up.",
      es: "he → gets, con -s.",
    }),
    mc("spg10-3", "He ___ repeat the same schedule every week.", "No repite el mismo horario cada semana.", ["doesn't", "don't", "isn't"], 0, {
      en: "he doesn't.",
      es: "he → doesn't.",
    }),
    mc("spg10-4", "She enjoys her routine because it ___ her motivated.", "Disfruta su rutina porque la mantiene motivada.", ["keeps", "keep", "keeping"], 0, {
      en: "it keeps.",
      es: "it → keeps, con -s.",
    }),
    mistake("spg10-5", "She work on something important every morning.", "work", "works", {
      en: "she works.",
      es: "she → works, con -s.",
    }, DETECTIVE),
    mistake("spg10-6", "He sometimes travel to other cities.", "travel", "travels", {
      en: "he travels.",
      es: "he → travels, con -s.",
    }, DETECTIVE),
    rearrange(
      "spg10-7",
      ["during the day", "meets different people", "She"],
      ["She", "meets different people", "during the day"],
      { en: "She + verb-s + object + when.", es: "She + verbo con -s + objeto + cuándo." },
      CHISME,
    ),
    rearrange(
      "spg10-8",
      ["a full and interesting life", "this person has", "Overall,"],
      ["Overall,", "this person has", "a full and interesting life"],
      { en: "Overall, + subject has + object.", es: "Overall, + sujeto has + objeto." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("spg10-9", "My coworkers ___ up before six.", "Mis compañeros se levantan antes de las seis.", ["get", "gets", "getting"], 0, {
      en: "they get up.",
      es: "my coworkers = they → get, sin -s.",
    }),
    mc("spg10-10", "I ___ travel to other cities for work.", "No viajo a otras ciudades por trabajo.", ["don't", "doesn't", "am not"], 0, {
      en: "I don't.",
      es: "I → don't.",
    }),
    mistake("spg10-11", "Tomas and Ana meets different people every day.", "meets", "meet", {
      en: "they meet.",
      es: "Dos personas = they → meet, sin -s.",
    }, DETECTIVE),
    rearrange(
      "spg10-12",
      ["the same schedule", "don't repeat", "My parents", "every week"],
      ["My parents", "don't repeat", "the same schedule", "every week"],
      { en: "Subject + don't + verb + object + how often.", es: "Sujeto + don't + verbo + objeto + cada cuánto." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("spg10-13", "Shakira ___ and dances. She ___ have the same schedule every day.", "Shakira canta y baila. No tiene el mismo horario todos los días.", ["sings / doesn't", "sing / don't", "sings / don't"], 0, {
      en: "she sings; she doesn't.",
      es: "she → -s y doesn't. Repaso del día 9.",
    }),
    mc("spg10-14", "___ your coworkers travel a lot? · Yes, they do.", "¿Tus compañeros viajan mucho? · Sí.", ["Do", "Does", "Are"], 0, {
      en: "Do + they.",
      es: "Do con they. Repaso del día 4.",
    }),
    mistake("spg10-15", "Tomas have 28 years old.", "have", "is", {
      en: "He is 28.",
      es: "Tomas is 28 years old.",
    }, DETECTIVE),
    mistake("spg10-16", "Next month this person are going to travel to Mexico.", "are", "is", {
      en: "this person: is.",
      es: "This person → is going to. Repaso de Basic 1.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("spg10-17", "___ many interesting people in my city.", "Hay mucha gente interesante en mi ciudad.", ["There are", "There is", "They are"], 0, {
      en: "many people: there are.",
      es: "there are: people es plural.",
    }),
    mc("spg10-18", "How ___ cities does he visit every month? · Two or three.", "¿Cuántas ciudades visita cada mes? · Dos o tres.", ["many", "much", "long"], 0, {
      en: "How many + cities.",
      es: "How many con cosas que se cuentan.",
    }),
    mistake("spg10-19", "She needs meet new people for her job.", "needs", "needs to", {
      en: "needs to meet.",
      es: "needs to + verbo.",
    }, DETECTIVE),
    mistake("spg10-20", "He gets up in five thirty every day.", "in", "at", {
      en: "at five thirty.",
      es: "at con la hora.",
    }, DETECTIVE),
  ],
};
