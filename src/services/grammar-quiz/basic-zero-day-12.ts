import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC ZERO · Día 12 — Tell me about a family member · extended family ·
 * She is my ___. She is from ___. · Yes/No questions in third person.
 * (Semana 3, día 2: TELL ME ABOUT A FAMILY MEMBER)
 * 8 ancla · 6 transferencia · 4 repaso · 2 trampas.
 */
const DETECTIVE = "Daniel presentó a su familia. Toca la palabra equivocada.";
const CHISME = "Daniel dijo la frase en desorden. Ordénala.";

export const BASIC_ZERO_DAY_12: GrammarQuiz = {
  moduleId: "basic-zero",
  day: 12,
  title: { en: "She Is My Aunt", es: "Ella es mi tía" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("bzg12-1", "This is Carmen. ___ is my aunt.", "Esta es Carmen. Es mi tía.", ["She", "He", "Her"], 0, {
      en: "aunt = she.",
      es: "aunt es mujer → She is.",
    }),
    mc("bzg12-2", "She ___ from Mexico and she ___ in Guadalajara.", "Es de México y vive en Guadalajara.", ["is / lives", "is / live", "are / lives"], 0, {
      en: "she is, she lives (-s).",
      es: "she → is, she → lives, con -s.",
    }),
    mc("bzg12-3", "This is Pedro. He is my ___.", "Este es Pedro. Es mi abuelo.", ["grandfather", "grandmother", "aunt"], 0, {
      en: "grandfather = abuelo.",
      es: "grandfather: abuelo. grandmother: abuela.",
    }),
    mc("bzg12-4", "___ she your cousin? · Yes, she is.", "¿Es tu prima? · Sí.", ["Is", "Are", "Does"], 0, {
      en: "Is she ...? Yes, she is.",
      es: "she → Is. Pregunta con be, sin does.",
    }),
    mistake("bzg12-5", "This is my uncle. She is from Colombia.", "She", "He", {
      en: "uncle = he.",
      es: "uncle es hombre → He is.",
    }, DETECTIVE),
    mistake("bzg12-6", "My aunt live in Medellín.", "live", "lives", {
      en: "she lives.",
      es: "my aunt = she → lives, con -s.",
    }, DETECTIVE),
    rearrange(
      "bzg12-7",
      ["my aunt", "She", "is"],
      ["She", "is", "my aunt"],
      { en: "She + is + my aunt.", es: "She + is + my aunt." },
      CHISME,
    ),
    rearrange(
      "bzg12-8",
      ["your cousin?", "she", "Is"],
      ["Is", "she", "your cousin?"],
      { en: "Is + she + your cousin?", es: "Is + she + your cousin?" },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("bzg12-9", "Jorge is my best friend. ___ is from Colombia and ___ name is Jorge.", "Jorge es mi mejor amigo. Es de Colombia y su nombre es Jorge.", ["He / his", "She / her", "He / her"], 0, {
      en: "friend (Jorge) = he, his.",
      es: "Jorge es hombre → He is, his name.",
    }),
    mc("bzg12-10", "___ your grandmother from Spain? · No, she isn't.", "¿Tu abuela es de España? · No.", ["Is", "Are", "Does"], 0, {
      en: "Is your grandmother ...?",
      es: "grandmother = she → Is.",
    }),
    mc("bzg12-11", "My nephew ___ 6 years old.", "Mi sobrino tiene 6 años.", ["is", "has", "have"], 0, {
      en: "He is 6.",
      es: "nephew = he → is 6. La edad con is.",
    }),
    mistake("bzg12-12", "Is your uncle from Peru? Yes, he are from Lima.", "are", "is", {
      en: "Yes, he is.",
      es: "he → is. La respuesta corta repite is.",
    }, DETECTIVE),
    rearrange(
      "bzg12-13",
      ["from Colombia", "My best friend", "is"],
      ["My best friend", "is", "from Colombia"],
      { en: "My best friend + is + from.", es: "My best friend + is + from." },
      CHISME,
    ),
    rearrange(
      "bzg12-14",
      ["in Medellín", "lives", "He"],
      ["He", "lives", "in Medellín"],
      { en: "He + lives + in.", es: "He + lives + in. Con -s." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("bzg12-15", "This is my aunt. ___ hair is long and ___ eyes are brown.", "Esta es mi tía. Su pelo es largo y sus ojos son cafés.", ["Her / her", "His / his", "Her / his"], 0, {
      en: "aunt → her, her.",
      es: "aunt → her, las dos veces.",
    }),
    mc("bzg12-16", "My cousins ___ from Peru. ___ names are Maria and Luis.", "Mis primos son de Perú. Sus nombres son María y Luis.", ["are / Their", "is / Their", "are / His"], 0, {
      en: "cousins = they: are, their.",
      es: "cousins = they → are, Their.",
    }),
    mistake("bzg12-17", "My grandmother have 70 years old.", "have", "is", {
      en: "She is 70.",
      es: "My grandmother is 70 years old.",
    }, DETECTIVE),
    mistake("bzg12-18", "This are my cousins.", "This", "These", {
      en: "cousins (plural): these.",
      es: "cousins es plural → These are.",
    }, DETECTIVE),

    // ── Trampas ────────────────────────────────────────────────────────────
    mc("bzg12-19", "Is your aunt from Mexico? · Yes, ___.", "¿Tu tía es de México? · Sí.", ["she is", "she's", "is"], 0, {
      en: "Yes, she is (no contraction in short answers).",
      es: "Yes, she is. En la respuesta corta no se acorta a she's.",
    }),
    mistake("bzg12-20", "My aunt is from Mexico and she has 47 years old.", "has", "is", {
      en: "she is 47.",
      es: "she is 47 years old. La edad nunca con has.",
    }, DETECTIVE),
  ],
};
