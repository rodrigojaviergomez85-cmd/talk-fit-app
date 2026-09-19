import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 1 · Día 2 — Tomorrow: going to + partes del día (in the morning, at night).
 * 8 ancla · 4 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Sofía escribió su plan de mañana. Toca la palabra equivocada.";
const CHISME = "Sofía dijo la frase en desorden. Ordénala.";

export const SIMPLE_FUTURE_DAY_2: GrammarQuiz = {
  moduleId: "simple-future",
  day: 2,
  title: { en: "Tomorrow", es: "Mañana" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("sfg2-1", "Tomorrow, I'm going to ___ up at six.", "Mañana me voy a despertar a las seis.", ["wake", "wakes", "waking"], 0, {
      en: "going to wake up.",
      es: "going to + wake up, verbo solo.",
    }),
    mc("sfg2-2", "___ the morning, I'm going to work.", "En la mañana voy a trabajar.", ["In", "At", "On"], 0, {
      en: "in the morning.",
      es: "in the morning: in con las partes del día.",
    }),
    mc("sfg2-3", "I'm going to have lunch ___ a coworker.", "Voy a almorzar con un compañero.", ["with", "to", "for"], 0, {
      en: "have lunch with someone.",
      es: "with: con un compañero.",
    }),
    mc("sfg2-4", "I'm ___ going to stay at the office late.", "No me voy a quedar en la oficina hasta tarde.", ["not", "no", "don't"], 0, {
      en: "I'm not going to.",
      es: "I'm not going to: not después de am.",
    }),
    mistake("sfg2-5", "At night, I'm going to relaxing at home.", "relaxing", "relax", {
      en: "going to relax.",
      es: "Después de going to, verbo solo: relax.",
    }, DETECTIVE),
    mistake("sfg2-6", "Tomorrow is going to being a busy day.", "being", "be", {
      en: "going to be.",
      es: "going to be, con be en forma base.",
    }, DETECTIVE),
    rearrange(
      "sfg2-7",
      ["for thirty minutes", "I'm going to", "exercise"],
      ["I'm going to", "exercise", "for thirty minutes"],
      { en: "I'm going to + verb + how long.", es: "I'm going to + verbo + cuánto tiempo." },
      CHISME,
    ),
    rearrange(
      "sfg2-8",
      ["I'm going to", "In the afternoon,", "study English"],
      ["In the afternoon,", "I'm going to", "study English"],
      { en: "Time + I'm going to + verb.", es: "Tiempo + I'm going to + verbo." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("sfg2-9", "Tomorrow, Daniel ___ going to wake up at five.", "Mañana Daniel se va a despertar a las cinco.", ["is", "am", "are"], 0, {
      en: "Daniel = he: is.",
      es: "Daniel → is going to.",
    }),
    mc("sfg2-10", "Tomorrow, my parents ___ going to visit me.", "Mañana mis papás me van a visitar.", ["are", "is", "am"], 0, {
      en: "parents = they: are.",
      es: "my parents → are going to.",
    }),
    mistake("sfg2-11", "Tomorrow Sofia and I is going to have lunch together.", "is", "are", {
      en: "Sofia and I = we: are.",
      es: "Sofia and I = we → are going to.",
    }, DETECTIVE),
    rearrange(
      "sfg2-12",
      ["is going to", "Valeria", "at eight", "start work"],
      ["Valeria", "is going to", "start work", "at eight"],
      { en: "Name + is going to + verb + time.", es: "Nombre + is going to + verbo + hora." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("sfg2-13", "Tonight, I ___ going to go home early.", "Esta noche voy a ir a casa temprano.", ["am", "is", "are"], 0, {
      en: "I am going to.",
      es: "I → am going to. Repaso del día 1.",
    }),
    mc("sfg2-14", "Sofia is ___ engineer. She is 28 years old.", "Sofía es ingeniera. Tiene 28 años.", ["an", "a", "the"], 0, {
      en: "an engineer.",
      es: "an engineer: vocal. Repaso de Basic Zero.",
    }),
    mistake("sfg2-15", "Sofia have 28 years old.", "have", "is", {
      en: "She is 28.",
      es: "Sofia is 28 years old.",
    }, DETECTIVE),
    mistake("sfg2-16", "This is my coworker. Her name is Daniel.", "Her", "His", {
      en: "Daniel → his.",
      es: "Daniel es hombre → His name.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("sfg2-17", "I'm going to wake up ___ six ___ the morning.", "Me voy a despertar a las seis de la mañana.", ["at / in", "in / at", "on / in"], 0, {
      en: "at six, in the morning.",
      es: "at con la hora, in con la parte del día.",
    }),
    mc("sfg2-18", "___ two meetings tomorrow.", "Hay dos reuniones mañana.", ["There are", "There is", "Are"], 0, {
      en: "two meetings: there are.",
      es: "there are: hay, para varias cosas.",
    }),
    mistake("sfg2-19", "I need go to the office early.", "need", "need to", {
      en: "need to + verb.",
      es: "need to go: need siempre lleva to antes de otro verbo.",
    }, DETECTIVE),
    mistake("sfg2-20", "I'm going to have lunch in 12 o'clock.", "in", "at", {
      en: "at 12 o'clock.",
      es: "at con la hora: at 12 o'clock.",
    }, DETECTIVE),
  ],
};
