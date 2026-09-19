import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 2 · Día 9 — A performer's day: she sings · she practices · she doesn't have.
 * 8 ancla · 4 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Rosa escribió la rutina de Shakira. Toca la palabra equivocada.";
const CHISME = "Rosa dijo la frase en desorden. Ordénala.";

export const SIMPLE_PRESENT_DAY_9: GrammarQuiz = {
  moduleId: "simple-present",
  day: 9,
  title: { en: "A Performer's Day", es: "El día de una artista" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("spg9-1", "Shakira usually ___ her day early.", "Shakira normalmente empieza su día temprano.", ["starts", "start", "starting"], 0, {
      en: "she starts.",
      es: "Shakira = she → starts.",
    }),
    mc("spg9-2", "She ___ and dances regularly.", "Canta y baila con regularidad.", ["sings", "sing", "singing"], 0, {
      en: "she sings.",
      es: "she → sings, con -s.",
    }),
    mc("spg9-3", "She ___ have the same schedule every day.", "No tiene el mismo horario todos los días.", ["doesn't", "don't", "isn't"], 0, {
      en: "she doesn't.",
      es: "she → doesn't.",
    }),
    mc("spg9-4", "She spends time with ___ family.", "Pasa tiempo con su familia.", ["her", "his", "she"], 0, {
      en: "she → her family.",
      es: "she → her: su (de ella).",
    }),
    mistake("spg9-5", "She practice music and works on new ideas.", "practice", "practices", {
      en: "she practices.",
      es: "she → practices, con -s.",
    }, DETECTIVE),
    mistake("spg9-6", "She sometimes exercise during the day.", "exercise", "exercises", {
      en: "she exercises.",
      es: "she → exercises, con -s.",
    }, DETECTIVE),
    rearrange(
      "spg9-7",
      ["because performing requires preparation", "a lot", "She practices"],
      ["She practices", "a lot", "because performing requires preparation"],
      { en: "She + verb-s + how much + because.", es: "She + verbo con -s + cuánto + because." },
      CHISME,
    ),
    rearrange(
      "spg9-8",
      ["a creative and active routine", "she has", "Overall,"],
      ["Overall,", "she has", "a creative and active routine"],
      { en: "Overall, + she has + object.", es: "Overall, + she has + objeto." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("spg9-9", "My cousin ___ in a band on weekends.", "Mi primo canta en una banda los fines de semana.", ["sings", "sing", "singing"], 0, {
      en: "he sings.",
      es: "my cousin = he → sings.",
    }),
    mc("spg9-10", "I ___ have the same schedule every day.", "No tengo el mismo horario todos los días.", ["don't", "doesn't", "am not"], 0, {
      en: "I don't.",
      es: "I → don't.",
    }),
    mistake("spg9-11", "Rosa and her sister dances every Saturday.", "dances", "dance", {
      en: "they dance.",
      es: "Dos personas = they → dance, sin -s.",
    }, DETECTIVE),
    rearrange(
      "spg9-12",
      ["during the day", "sometimes exercises", "My mom"],
      ["My mom", "sometimes exercises", "during the day"],
      { en: "Subject + sometimes + verb-s + when.", es: "Sujeto + sometimes + verbo con -s + cuándo." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("spg9-13", "Superman ___ as a reporter. He ___ tell everyone his secret.", "Superman trabaja como reportero. No le cuenta su secreto a todo el mundo.", ["works / doesn't", "work / don't", "works / don't"], 0, {
      en: "he works; he doesn't.",
      es: "he → -s y doesn't. Repaso del día 8.",
    }),
    mc("spg9-14", "Shakira is ___ singer. ___ from Colombia.", "Shakira es cantante. Es de Colombia.", ["a / She's", "an / She's", "a / Her"], 0, {
      en: "a singer; She's from.",
      es: "a singer: consonante; She's = She is.",
    }),
    mistake("spg9-15", "Next year Shakira are going to travel to many countries.", "are", "is", {
      en: "Shakira = she: is.",
      es: "Shakira → is going to. Repaso de Basic 1.",
    }, DETECTIVE),
    mistake("spg9-16", "Rosa have 33 years old.", "have", "is", {
      en: "She is 33.",
      es: "Rosa is 33 years old.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("spg9-17", "___ a concert in the city on Saturday.", "Hay un concierto en la ciudad el sábado.", ["There is", "There are", "It is"], 0, {
      en: "one concert: there is.",
      es: "there is: hay, una cosa.",
    }),
    mc("spg9-18", "What time does the concert start? · ___ eight ___ night.", "¿A qué hora empieza el concierto? · A las ocho de la noche.", ["At / at", "In / at", "At / in"], 0, {
      en: "at eight, at night.",
      es: "at con la hora y at night.",
    }),
    mistake("spg9-19", "Rosa wants sing in a band.", "wants", "wants to", {
      en: "wants to sing.",
      es: "wants to + verbo.",
    }, DETECTIVE),
    mistake("spg9-20", "The concert is close of my house.", "of", "to", {
      en: "close to my house.",
      es: "close to: cerca de.",
    }, DETECTIVE),
  ],
};
