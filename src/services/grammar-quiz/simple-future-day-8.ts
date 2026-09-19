import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 1 · Día 8 — A busy person's weekend: she's going to + first / then.
 * 8 ancla · 4 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Ana escribió la agenda de su jefa. Toca la palabra equivocada.";
const CHISME = "Ana dijo la frase en desorden. Ordénala.";

export const SIMPLE_FUTURE_DAY_8: GrammarQuiz = {
  moduleId: "simple-future",
  day: 8,
  title: { en: "A Busy Person's Weekend", es: "El fin de semana de mi jefa" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("sfg8-1", "My boss ___ going to have a very busy weekend.", "Mi jefa va a tener un fin de semana muy ocupado.", ["is", "are", "am"], 0, {
      en: "my boss = she: is.",
      es: "my boss → is going to.",
    }),
    mc("sfg8-2", "First, she's going to ___ a report.", "Primero va a terminar un informe.", ["finish", "finishing", "finishes"], 0, {
      en: "going to finish.",
      es: "going to + finish, verbo solo.",
    }),
    mc("sfg8-3", "___ she's going to call three clients.", "Luego va a llamar a tres clientes.", ["Then", "After", "Next to"], 0, {
      en: "Then: next step.",
      es: "Then: luego, el siguiente paso.",
    }),
    mc("sfg8-4", "She ___ going to rest very much.", "No va a descansar mucho.", ["isn't", "doesn't", "aren't"], 0, {
      en: "she isn't going to.",
      es: "isn't going to: no va a.",
    }),
    mistake("sfg8-5", "In the afternoon, she's going to travels to another city.", "travels", "travel", {
      en: "going to travel.",
      es: "Después de going to, verbo solo: travel.",
    }, DETECTIVE),
    mistake("sfg8-6", "She's going to stay on a hotel one night.", "on", "in", {
      en: "stay in a hotel.",
      es: "in a hotel: dentro de un lugar.",
    }, DETECTIVE),
    rearrange(
      "sfg8-7",
      ["come back home", "she's going to", "On Sunday,"],
      ["On Sunday,", "she's going to", "come back home"],
      { en: "Day + she's going to + verb.", es: "Día + she's going to + verbo." },
      CHISME,
    ),
    rearrange(
      "sfg8-8",
      ["be really tired", "on Monday", "She's going to"],
      ["She's going to", "be really tired", "on Monday"],
      { en: "She's going to + be + adjective + day.", es: "She's going to + be + adjetivo + día." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("sfg8-9", "My coworker Tomas ___ going to finish the report with her.", "Mi compañero Tomás va a terminar el informe con ella.", ["is", "are", "am"], 0, {
      en: "Tomas = he: is.",
      es: "Tomas → is going to.",
    }),
    mc("sfg8-10", "First, I ___ going to check my email.", "Primero voy a revisar mi correo.", ["am", "is", "are"], 0, {
      en: "I am.",
      es: "I → am going to.",
    }),
    mistake("sfg8-11", "The clients is going to call on Monday.", "is", "are", {
      en: "clients: are.",
      es: "The clients es plural → are going to.",
    }, DETECTIVE),
    rearrange(
      "sfg8-12",
      ["to another city", "We're going to", "travel", "on Friday"],
      ["We're going to", "travel", "to another city", "on Friday"],
      { en: "We're going to + verb + where + when.", es: "We're going to + verbo + a dónde + cuándo." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("sfg8-13", "My boss is ___ engineer. She is 40 years old.", "Mi jefa es ingeniera. Tiene 40 años.", ["an", "a", "the"], 0, {
      en: "an engineer.",
      es: "an engineer: vocal.",
    }),
    mc("sfg8-14", "Tomorrow, my mom ___ going to work. She's going to rest.", "Mañana mi mamá no va a trabajar. Va a descansar.", ["isn't", "doesn't", "not"], 0, {
      en: "she isn't going to.",
      es: "isn't going to. Repaso del día 7.",
    }),
    mistake("sfg8-15", "My boss have a very busy weekend every month.", "have", "has", {
      en: "she has.",
      es: "my boss = she → has.",
    }, DETECTIVE),
    mistake("sfg8-16", "This are my clients from Mexico.", "This", "These", {
      en: "These are: plural.",
      es: "Varios clientes → These are. This es para uno.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("sfg8-17", "___ three clients on the list.", "Hay tres clientes en la lista.", ["There are", "There is", "They are"], 0, {
      en: "three clients: there are.",
      es: "there are: hay, plural.",
    }),
    mc("sfg8-18", "What time is the meeting? · It's ___ nine ___ the morning.", "¿A qué hora es la reunión? · A las nueve de la mañana.", ["at / in", "in / at", "on / in"], 0, {
      en: "at nine, in the morning.",
      es: "at con la hora, in con la parte del día.",
    }),
    mistake("sfg8-19", "She needs finish the report today.", "needs", "needs to", {
      en: "needs to finish.",
      es: "needs to + verbo.",
    }, DETECTIVE),
    mistake("sfg8-20", "The hotel is close of the airport.", "of", "to", {
      en: "close to the airport.",
      es: "close to: cerca de.",
    }, DETECTIVE),
  ],
};
