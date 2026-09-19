import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC ZERO · Día 3 — Colors · numbers · How old are you? · favorite color.
 * (Semana 1, día 3: COLORS + NUMBERS + HOW OLD ARE YOU?)
 * 8 ancla · 6 transferencia · 4 repaso (días 1-2) · 2 trampas.
 */
const DETECTIVE = "Daniel escribió su edad y su color favorito. Toca la palabra equivocada.";
const CHISME = "Daniel dijo la frase en desorden. Ordénala.";

export const BASIC_ZERO_DAY_3: GrammarQuiz = {
  moduleId: "basic-zero",
  day: 3,
  title: { en: "How Old Are You?", es: "¿Cuántos años tienes?" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("bzg3-1", "I ___ 35 years old.", "Tengo 35 años.", ["am", "have", "is"], 0, {
      en: "Age with be: I am 35.",
      es: "La edad va con be: I am 35. No con have.",
    }),
    mc("bzg3-2", "How old ___ you?", "¿Cuántos años tienes?", ["are", "is", "have"], 0, {
      en: "How old are you?",
      es: "How old are you? Con are, nunca con have.",
    }),
    mc("bzg3-3", "My favorite color ___ blue.", "Mi color favorito es el azul.", ["is", "are", "am"], 0, {
      en: "My favorite color is.",
      es: "My favorite color is: un color, is.",
    }),
    mc("bzg3-4", "What is your favorite ___?", "¿Cuál es tu color favorito?", ["color", "colors", "old"], 0, {
      en: "favorite color.",
      es: "What is your favorite color? Un solo color: singular.",
    }),
    mistake("bzg3-5", "I have 35 years old.", "have", "am", {
      en: "I am 35 years old.",
      es: "I am 35 years old. «I have 35 years» es calco de «tengo 35 años».",
    }, DETECTIVE),
    mistake("bzg3-6", "My favorite color are green.", "are", "is", {
      en: "My favorite color is.",
      es: "Un color, is. are es para plural.",
    }, DETECTIVE),
    rearrange(
      "bzg3-7",
      ["35 years old", "I am"],
      ["I am", "35 years old"],
      { en: "I am + age + years old.", es: "I am + edad + years old." },
      CHISME,
    ),
    rearrange(
      "bzg3-8",
      ["is", "My favorite color", "blue"],
      ["My favorite color", "is", "blue"],
      { en: "My favorite color + is + color.", es: "My favorite color + is + color." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("bzg3-9", "Sofia ___ 28 years old.", "Sofía tiene 28 años.", ["is", "has", "are"], 0, {
      en: "She is 28.",
      es: "Sofia = she → is 28. No has.",
    }),
    mc("bzg3-10", "How old ___ Carlos? · He is 22.", "¿Cuántos años tiene Carlos? · Tiene 22.", ["is", "are", "has"], 0, {
      en: "How old is he?",
      es: "How old is Carlos? Carlos = he → is.",
    }),
    mc("bzg3-11", "Her favorite color ___ red.", "Su color favorito es el rojo.", ["is", "are", "am"], 0, {
      en: "It is.",
      es: "Un color → is.",
    }),
    mistake("bzg3-12", "Valeria has 19 years old.", "has", "is", {
      en: "Valeria is 19.",
      es: "Valeria is 19 years old. La edad va con is, no con has.",
    }, DETECTIVE),
    rearrange(
      "bzg3-13",
      ["are you?", "How old"],
      ["How old", "are you?"],
      { en: "How old + are you?", es: "How old + are you?" },
      CHISME,
    ),
    rearrange(
      "bzg3-14",
      ["is", "Carlos", "22 years old"],
      ["Carlos", "is", "22 years old"],
      { en: "Name + is + age.", es: "Nombre + is + edad." },
      CHISME,
    ),

    // ── Repaso de los días 1 y 2 ───────────────────────────────────────────
    mc("bzg3-15", "My name ___ Daniel and I ___ from Colombia.", "Me llamo Daniel y soy de Colombia.", ["is / am", "am / is", "is / is"], 0, {
      en: "My name is, I am.",
      es: "My name is, I am.",
    }),
    mc("bzg3-16", "Sofia and Valeria ___ from Mexico and Peru.", "Sofía y Valeria son de México y Perú.", ["are", "is", "am"], 0, {
      en: "They are.",
      es: "Dos personas → are.",
    }),
    mistake("bzg3-17", "Where is you from?", "is", "are", {
      en: "Where are you from?",
      es: "you → are.",
    }, DETECTIVE),
    mistake("bzg3-18", "He are from Guatemala.", "are", "is", {
      en: "He is.",
      es: "he → is.",
    }, DETECTIVE),

    // ── Trampas ────────────────────────────────────────────────────────────
    mc("bzg3-19", "I am 35 ___.", "Tengo 35 años.", ["years old", "years", "old years"], 0, {
      en: "35 years old, in that order.",
      es: "35 years old, en ese orden. years solo suena incompleto.",
    }),
    mistake("bzg3-20", "I am 35 years olds and my favorite color is blue.", "olds", "old", {
      en: "years old, no -s on old.",
      es: "years old: old nunca lleva -s. La -s va en years.",
    }, DETECTIVE),
  ],
};
