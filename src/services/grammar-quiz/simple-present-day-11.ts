import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 2 · Día 11 — How to download an app: you + verbo · first / then / next /
 * after that / finally. 8 ancla · 4 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Camila escribió cómo bajar una app. Toca la palabra equivocada.";
const CHISME = "Camila dijo el paso en desorden. Ordénalo.";

export const SIMPLE_PRESENT_DAY_11: GrammarQuiz = {
  moduleId: "simple-present",
  day: 11,
  title: { en: "How to Download an App", es: "Cómo bajar una app" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("spg11-1", "___, you open the App Store or Google Play.", "Primero, abres la App Store o Google Play.", ["First", "Firstly then", "One"], 0, {
      en: "First: step one.",
      es: "First: primero, el paso uno.",
    }),
    mc("spg11-2", "Then, you ___ for the app you want.", "Luego, buscas la app que quieres.", ["search", "searches", "searching"], 0, {
      en: "you search: base verb.",
      es: "Con you, el verbo va solo: search.",
    }),
    mc("spg11-3", "___, you tap the download button.", "Después de eso, tocas el botón de descarga.", ["After that", "After", "Later that"], 0, {
      en: "After that: next step.",
      es: "After that: después de eso.",
    }),
    mc("spg11-4", "___, the app is ready to use.", "Finalmente, la app está lista para usar.", ["Finally", "Final", "At the end of"], 0, {
      en: "Finally: last step.",
      es: "Finally: por último.",
    }),
    mistake("spg11-5", "Next, you selects the app.", "selects", "select", {
      en: "you select.",
      es: "Con you no hay -s: select.",
    }, DETECTIVE),
    mistake("spg11-6", "You waits for the app to download.", "waits", "wait", {
      en: "you wait.",
      es: "Con you no hay -s: wait.",
    }, DETECTIVE),
    rearrange(
      "spg11-7",
      ["the name and the information", "check", "You"],
      ["You", "check", "the name and the information"],
      { en: "You + verb + object.", es: "You + verbo + objeto." },
      CHISME,
    ),
    rearrange(
      "spg11-8",
      ["and create your account", "you open the app", "Then,"],
      ["Then,", "you open the app", "and create your account"],
      { en: "Then, + you + verb + and + verb.", es: "Then, + you + verbo + and + verbo." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("spg11-9", "First, I ___ the App Store on my phone.", "Primero, abro la App Store en mi teléfono.", ["open", "opens", "opening"], 0, {
      en: "I open: no -s.",
      es: "Con I, sin -s.",
    }),
    mc("spg11-10", "Then, my mom ___ for the app she wants.", "Luego, mi mamá busca la app que quiere.", ["searches", "search", "searching"], 0, {
      en: "she searches.",
      es: "my mom = she → searches, con -es.",
    }),
    mistake("spg11-11", "After that, Camila tap the download button.", "tap", "taps", {
      en: "she taps.",
      es: "Camila = she → taps, con -s.",
    }, DETECTIVE),
    rearrange(
      "spg11-12",
      ["we create", "our account", "Finally,"],
      ["Finally,", "we create", "our account"],
      { en: "Finally, + we + verb + object.", es: "Finally, + we + verbo + objeto." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("spg11-13", "This person ___ an interesting routine. He ___ repeat the same schedule.", "Esta persona tiene una rutina interesante. No repite el mismo horario.", ["has / doesn't", "have / don't", "has / don't"], 0, {
      en: "has; doesn't.",
      es: "he → has y doesn't. Repaso del día 10.",
    }),
    mc("spg11-14", "Camila is 26. ___ phone is new and ___ favorite app is Fluency.", "Camila tiene 26. Su teléfono es nuevo y su app favorita es Fluency.", ["Her / her", "His / her", "She / her"], 0, {
      en: "her phone, her favorite.",
      es: "Camila → her antes del sustantivo.",
    }),
    mistake("spg11-15", "Tonight I'm going to downloading a new app.", "downloading", "download", {
      en: "going to download.",
      es: "going to + verbo solo. Repaso de Basic 1.",
    }, DETECTIVE),
    mistake("spg11-16", "Camila have a new phone.", "have", "has", {
      en: "she has.",
      es: "Camila = she → has.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("spg11-17", "___ many apps in the App Store.", "Hay muchas apps en la App Store.", ["There are", "There is", "They are"], 0, {
      en: "many apps: there are.",
      es: "there are: hay, plural.",
    }),
    mc("spg11-18", "How ___ space does the app need? · About 200 megabytes.", "¿Cuánto espacio necesita la app? · Unos 200 megas.", ["much", "many", "long"], 0, {
      en: "How much + space.",
      es: "How much: space no se cuenta.",
    }),
    mistake("spg11-19", "I want download the Fluency app.", "want", "want to", {
      en: "want to download.",
      es: "want to + verbo.",
    }, DETECTIVE),
    mistake("spg11-20", "The download button is on the bottom of the screen.", "on", "at", {
      en: "at the bottom.",
      es: "at the bottom: en la parte de abajo.",
    }, DETECTIVE),
  ],
};
