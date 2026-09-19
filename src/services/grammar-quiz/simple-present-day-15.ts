import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 2 · Día 15 — Process challenge: first / then / next / after that / finally.
 * 8 ancla · 4 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Valeria escribió los pasos de un proceso. Toca la palabra equivocada.";
const CHISME = "Valeria dijo el paso en desorden. Ordénalo.";

export const SIMPLE_PRESENT_DAY_15: GrammarQuiz = {
  moduleId: "simple-present",
  day: 15,
  title: { en: "Process Challenge", es: "Reto: un proceso" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("spg15-1", "___, you decide what you want to do.", "Primero, decides qué quieres hacer.", ["First", "Finally", "After that"], 0, {
      en: "First: step one.",
      es: "First: primero.",
    }),
    mc("spg15-2", "Then, you ___ everything you need.", "Luego, consigues todo lo que necesitas.", ["get", "gets", "getting"], 0, {
      en: "you get.",
      es: "Con you, el verbo va solo.",
    }),
    mc("spg15-3", "___, you continue with the next step.", "Después de eso, continúas con el siguiente paso.", ["After that", "After", "Later of that"], 0, {
      en: "After that: next step.",
      es: "After that: después de eso.",
    }),
    mc("spg15-4", "___, everything is ready and you can enjoy it.", "Finalmente, todo está listo y puedes disfrutarlo.", ["Finally", "First", "Next"], 0, {
      en: "Finally: last step.",
      es: "Finally: por último.",
    }),
    mistake("spg15-5", "Next, you starts the first step.", "starts", "start", {
      en: "you start.",
      es: "Con you no hay -s: start.",
    }, DETECTIVE),
    mistake("spg15-6", "You checks that everything is correct.", "checks", "check", {
      en: "you check.",
      es: "Con you no hay -s: check.",
    }, DETECTIVE),
    rearrange(
      "spg15-7",
      ["a few minutes", "you wait", "Then,"],
      ["Then,", "you wait", "a few minutes"],
      { en: "Then, + you + verb + how long.", es: "Then, + you + verbo + cuánto tiempo." },
      CHISME,
    ),
    rearrange(
      "spg15-8",
      ["of the process", "finish the last part", "You"],
      ["You", "finish the last part", "of the process"],
      { en: "You + verb + object + of.", es: "You + verbo + objeto + de qué." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("spg15-9", "First, my boss ___ what she wants to do.", "Primero, mi jefa decide qué quiere hacer.", ["decides", "decide", "deciding"], 0, {
      en: "she decides.",
      es: "my boss = she → decides.",
    }),
    mc("spg15-10", "Then, we ___ everything we need.", "Luego, conseguimos todo lo que necesitamos.", ["get", "gets", "getting"], 0, {
      en: "we get.",
      es: "we → get, sin -s.",
    }),
    mistake("spg15-11", "After that, Valeria continue with the next step.", "continue", "continues", {
      en: "she continues.",
      es: "Valeria = she → continues, con -s.",
    }, DETECTIVE),
    rearrange(
      "spg15-12",
      ["the last part", "my coworkers finish", "Finally,"],
      ["Finally,", "my coworkers finish", "the last part"],
      { en: "Finally, + subject + verb + object.", es: "Finally, + sujeto + verbo + objeto." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("spg15-13", "First, you get two pieces of bread. Then, you ___ cheese.", "Primero, tomas dos rebanadas de pan. Luego, agregas queso.", ["add", "adds", "adding"], 0, {
      en: "you add.",
      es: "Con you, verbo solo. Repaso del día 14.",
    }),
    mc("spg15-14", "Valeria ___ at a bank. She ___ work on Saturdays.", "Valeria trabaja en un banco. No trabaja los sábados.", ["works / doesn't", "work / don't", "works / don't"], 0, {
      en: "she works; she doesn't.",
      es: "she → -s y doesn't. Repaso de la semana 1.",
    }),
    mistake("spg15-15", "I promise I'll finishing the process today.", "finishing", "finish", {
      en: "I'll finish.",
      es: "will + verbo solo. Repaso de Basic 1.",
    }, DETECTIVE),
    mistake("spg15-16", "Valeria have 19 years old.", "have", "is", {
      en: "She is 19.",
      es: "Valeria is 19 years old.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("spg15-17", "___ five steps in this process.", "Hay cinco pasos en este proceso.", ["There are", "There is", "They are"], 0, {
      en: "five steps: there are.",
      es: "there are: hay, plural.",
    }),
    mc("spg15-18", "How ___ steps does the process have? · Five.", "¿Cuántos pasos tiene el proceso? · Cinco.", ["many", "much", "long"], 0, {
      en: "How many + steps.",
      es: "How many con cosas que se cuentan.",
    }),
    mistake("spg15-19", "You need check that everything is correct.", "need", "need to", {
      en: "need to check.",
      es: "need to + verbo.",
    }, DETECTIVE),
    mistake("spg15-20", "You wait a few minutes and then you continue in the next step.", "in", "with", {
      en: "continue with the next step.",
      es: "continue with: continuar con.",
    }, DETECTIVE),
  ],
};
