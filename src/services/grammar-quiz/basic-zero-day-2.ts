import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC ZERO · Día 2 — Verb to be (am / is / are) · alphabet.
 * (Semana 1, día 2: VERB TO BE + ALPHABET)
 * 8 ancla · 6 transferencia · 4 repaso (día 1) · 2 trampas.
 */
const DETECTIVE = "Sofía escribió sus frases con be. Toca la palabra equivocada.";
const CHISME = "Sofía dijo la frase en desorden. Ordénala.";

export const BASIC_ZERO_DAY_2: GrammarQuiz = {
  moduleId: "basic-zero",
  day: 2,
  title: { en: "Am, Is, Are", es: "Am, is, are" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("bzg2-1", "I ___ Sofia.", "Soy Sofía.", ["am", "is", "are"], 0, {
      en: "I am.",
      es: "I → am.",
    }),
    mc("bzg2-2", "You ___ my friend.", "Eres mi amigo.", ["are", "is", "am"], 0, {
      en: "You are.",
      es: "you → are.",
    }),
    mc("bzg2-3", "He ___ from Colombia.", "Él es de Colombia.", ["is", "are", "am"], 0, {
      en: "He is.",
      es: "he → is.",
    }),
    mc("bzg2-4", "We ___ students.", "Somos estudiantes.", ["are", "is", "am"], 0, {
      en: "We are.",
      es: "we → are.",
    }),
    mistake("bzg2-5", "She am from Mexico.", "am", "is", {
      en: "She is.",
      es: "she → is. am es solo para I.",
    }, DETECTIVE),
    mistake("bzg2-6", "They is my friends.", "is", "are", {
      en: "They are.",
      es: "they → are. Plural.",
    }, DETECTIVE),
    rearrange(
      "bzg2-7",
      ["from Peru", "is", "She"],
      ["She", "is", "from Peru"],
      { en: "She + is + from.", es: "She + is + from." },
      CHISME,
    ),
    rearrange(
      "bzg2-8",
      ["are", "students", "We"],
      ["We", "are", "students"],
      { en: "We + are + noun.", es: "We + are + sustantivo." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("bzg2-9", "Carlos and Daniel ___ from El Salvador.", "Carlos y Daniel son de El Salvador.", ["are", "is", "am"], 0, {
      en: "Two people = they: are.",
      es: "Dos personas = they → are.",
    }),
    mc("bzg2-10", "My teacher ___ from Spain.", "Mi maestra es de España.", ["is", "are", "am"], 0, {
      en: "My teacher = she: is.",
      es: "my teacher = she → is.",
    }),
    mc("bzg2-11", "It ___ a good day.", "Es un buen día.", ["is", "are", "am"], 0, {
      en: "It is.",
      es: "it → is.",
    }),
    mistake("bzg2-12", "You is from Ecuador.", "is", "are", {
      en: "You are.",
      es: "you → are, siempre.",
    }, DETECTIVE),
    rearrange(
      "bzg2-13",
      ["my friend", "You", "are"],
      ["You", "are", "my friend"],
      { en: "You + are + noun.", es: "You + are + sustantivo." },
      CHISME,
    ),
    rearrange(
      "bzg2-14",
      ["is", "from Colombia", "Daniel"],
      ["Daniel", "is", "from Colombia"],
      { en: "Name + is + from.", es: "Nombre + is + from." },
      CHISME,
    ),

    // ── Repaso del día 1 ───────────────────────────────────────────────────
    mc("bzg2-15", "Hello! My name ___ Andres.", "¡Hola! Me llamo Andrés.", ["is", "am", "are"], 0, {
      en: "My name is.",
      es: "My name is.",
    }),
    mc("bzg2-16", "Where ___ you from?", "¿De dónde eres?", ["are", "is", "am"], 0, {
      en: "Where are you from?",
      es: "you → are.",
    }),
    mistake("bzg2-17", "I am of Ecuador.", "of", "from", {
      en: "I am from.",
      es: "from, no of, para el país.",
    }, DETECTIVE),
    mistake("bzg2-18", "Nice to meet you. I name is Paola.", "I", "My", {
      en: "My name is.",
      es: "My name: mi nombre.",
    }, DETECTIVE),

    // ── Trampas ────────────────────────────────────────────────────────────
    mc("bzg2-19", "Sofia and I ___ friends.", "Sofía y yo somos amigas.", ["are", "am", "is"], 0, {
      en: "Sofia and I = we: are.",
      es: "Sofia and I = we → are. Aunque diga I, son dos personas.",
    }),
    mistake("bzg2-20", "My friends is from Honduras.", "is", "are", {
      en: "My friends = they: are.",
      es: "my friends = they → are. friends es plural.",
    }, DETECTIVE),
  ],
};
