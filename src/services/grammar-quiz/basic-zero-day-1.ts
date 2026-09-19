import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC ZERO · Día 1 — Greetings · My name is · Where are you from?
 * (Semana 1, día 1 de la currícula: GREETINGS + WHERE ARE YOU FROM?)
 * Fácil a propósito: 3 opciones, frases cortas, explicación en una línea.
 * 8 ancla · 6 transferencia · 4 repaso del día · 2 trampas.
 */
const DETECTIVE = "Carlos escribió su presentación. Toca la palabra equivocada.";
const CHISME = "Carlos dijo su presentación en desorden. Ordénala.";

export const BASIC_ZERO_DAY_1: GrammarQuiz = {
  moduleId: "basic-zero",
  day: 1,
  title: { en: "Hello, My Name Is", es: "Hola, me llamo" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("bzg1-1", "Hello! My name ___ Carlos.", "¡Hola! Me llamo Carlos.", ["is", "am", "are"], 0, {
      en: "My name is.",
      es: "My name is: el nombre siempre va con is.",
    }),
    mc("bzg1-2", "I ___ from El Salvador.", "Soy de El Salvador.", ["am", "is", "are"], 0, {
      en: "I am.",
      es: "I va con am. Siempre.",
    }),
    mc("bzg1-3", "Where ___ you from?", "¿De dónde eres?", ["are", "is", "am"], 0, {
      en: "you are → Are you? Where are you from?",
      es: "you va con are: Where are you from?",
    }),
    mc("bzg1-4", "Nice to ___ you.", "Mucho gusto.", ["meet", "see", "name"], 0, {
      en: "Nice to meet you.",
      es: "Nice to meet you: mucho gusto, cuando conocés a alguien.",
    }),
    mistake("bzg1-5", "My name am Carlos.", "am", "is", {
      en: "My name is.",
      es: "My name is. am es solo para I.",
    }, DETECTIVE),
    mistake("bzg1-6", "I is from El Salvador.", "is", "am", {
      en: "I am.",
      es: "I am. is es para he, she, it.",
    }, DETECTIVE),
    rearrange(
      "bzg1-7",
      ["Carlos", "My name", "is"],
      ["My name", "is", "Carlos"],
      { en: "My name + is + name.", es: "My name + is + el nombre." },
      CHISME,
    ),
    rearrange(
      "bzg1-8",
      ["from", "El Salvador", "I am"],
      ["I am", "from", "El Salvador"],
      { en: "I am + from + country.", es: "I am + from + el país." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("bzg1-9", "Hi! My name ___ Sofia. I ___ from Mexico.", "¡Hola! Me llamo Sofía. Soy de México.", ["is / am", "am / is", "is / is"], 0, {
      en: "My name is ... I am ...",
      es: "My name is, I am. Dos frases, dos formas de be.",
    }),
    mc("bzg1-10", "Where ___ you from? · I am from Colombia.", "¿De dónde eres? · Soy de Colombia.", ["are", "am", "is"], 0, {
      en: "Where are you from?",
      es: "you + are.",
    }),
    mc("bzg1-11", "Good ___! My name is Daniel.", "¡Buenos días! Me llamo Daniel.", ["morning", "night", "bye"], 0, {
      en: "Good morning is a greeting.",
      es: "Good morning es un saludo. Good night es para despedirse antes de dormir.",
    }),
    mistake("bzg1-12", "Hello, my name are Valeria.", "are", "is", {
      en: "My name is.",
      es: "My name is. are es para you, we, they.",
    }, DETECTIVE),
    rearrange(
      "bzg1-13",
      ["you from?", "Where", "are"],
      ["Where", "are", "you from?"],
      { en: "Where + are + you from?", es: "Where + are + you from?" },
      CHISME,
    ),
    rearrange(
      "bzg1-14",
      ["Sofia", "My name is", "Hello!"],
      ["Hello!", "My name is", "Sofia"],
      { en: "Greeting first, then the name.", es: "Primero el saludo, después el nombre." },
      CHISME,
    ),

    // ── Repaso del día ─────────────────────────────────────────────────────
    mc("bzg1-15", "___ to meet you, Carlos.", "Mucho gusto, Carlos.", ["Nice", "Good", "Hello"], 0, {
      en: "Nice to meet you.",
      es: "Nice to meet you. Siempre con Nice.",
    }),
    mc("bzg1-16", "I am ___ Peru.", "Soy de Perú.", ["from", "of", "in"], 0, {
      en: "from + country.",
      es: "from: de dónde sos. «I am of» es calco de «soy de».",
    }),
    mistake("bzg1-17", "I am of Guatemala.", "of", "from", {
      en: "I am from.",
      es: "I am from Guatemala. Para el país va from, nunca of.",
    }, DETECTIVE),
    mistake("bzg1-18", "Hello! I name is Andres.", "I", "My", {
      en: "My name is.",
      es: "My name is: mi nombre. I es «yo»; my es «mi».",
    }, DETECTIVE),

    // ── Trampas ────────────────────────────────────────────────────────────
    mc("bzg1-19", "Where are you from? · ___ from Honduras.", "¿De dónde eres? · Soy de Honduras.", ["I'm", "Am", "Is"], 0, {
      en: "I'm = I am.",
      es: "I'm es I am, corto. Am solo, sin I, no es una frase.",
    }),
    mistake("bzg1-20", "Nice to meet you. Me name is Lucia.", "Me", "My", {
      en: "My name.",
      es: "My name. «Me name» no existe: me es «a mí», my es «mi».",
    }, DETECTIVE),
  ],
};
