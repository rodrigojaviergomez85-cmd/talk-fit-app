import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC ZERO · Día 11 — Possessive adjectives + be · body parts · basic
 * adjectives (Her hair is long. His eyes are brown.)
 * (Semana 3, día 1: POSSESSIVE ADJECTIVES / VERB TO BE / BODY PARTS)
 * 8 ancla · 6 transferencia · 4 repaso · 2 trampas.
 */
const DETECTIVE = "Sofía describió a su hermana Ana. Toca la palabra equivocada.";
const CHISME = "Sofía dijo la frase en desorden. Ordénala.";

export const BASIC_ZERO_DAY_11: GrammarQuiz = {
  moduleId: "basic-zero",
  day: 11,
  title: { en: "Her Hair Is Long", es: "Su pelo es largo" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("bzg11-1", "This is my sister Ana. ___ hair is long.", "Esta es mi hermana Ana. Su pelo es largo.", ["Her", "His", "She"], 0, {
      en: "sister → her hair.",
      es: "sister → Her hair.",
    }),
    mc("bzg11-2", "Her eyes ___ brown.", "Sus ojos son cafés.", ["are", "is", "am"], 0, {
      en: "eyes (two): are.",
      es: "eyes es plural (dos ojos) → are.",
    }),
    mc("bzg11-3", "Her nose ___ small.", "Su nariz es pequeña.", ["is", "are", "am"], 0, {
      en: "nose (one): is.",
      es: "nose, una → is.",
    }),
    mc("bzg11-4", "What color ___ her hair? · It is black.", "¿De qué color es su pelo? · Es negro.", ["is", "are", "am"], 0, {
      en: "What color is her hair?",
      es: "hair → is.",
    }),
    mistake("bzg11-5", "Her hair are black.", "are", "is", {
      en: "hair is.",
      es: "hair → is. En inglés hair es una sola cosa.",
    }, DETECTIVE),
    mistake("bzg11-6", "This is my brother. Her eyes are green.", "Her", "His", {
      en: "brother → his.",
      es: "brother → His eyes.",
    }, DETECTIVE),
    rearrange(
      "bzg11-7",
      ["is", "long", "Her hair"],
      ["Her hair", "is", "long"],
      { en: "Her hair + is + adjective.", es: "Her hair + is + adjetivo." },
      CHISME,
    ),
    rearrange(
      "bzg11-8",
      ["brown", "His eyes", "are"],
      ["His eyes", "are", "brown"],
      { en: "His eyes + are + color.", es: "His eyes + are + color. Plural, are." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("bzg11-9", "This is my father. ___ hair is short and ___ eyes are brown.", "Este es mi papá. Su pelo es corto y sus ojos son cafés.", ["His / his", "Her / her", "His / her"], 0, {
      en: "father → his, his.",
      es: "father → his, las dos veces. En inglés no cambia con la cosa (pelo, ojos), cambia con la persona.",
    }),
    mc("bzg11-10", "Is her hair black? · No, it ___. It is brown.", "¿Su pelo es negro? · No. Es café.", ["isn't", "aren't", "not"], 0, {
      en: "No, it isn't.",
      es: "No, it isn't. hair = it.",
    }),
    mc("bzg11-11", "What color ___ his eyes? · They are green.", "¿De qué color son sus ojos? · Son verdes.", ["are", "is", "am"], 0, {
      en: "eyes → are.",
      es: "eyes → are. Plural.",
    }),
    mistake("bzg11-12", "My mother's hands is small.", "is", "are", {
      en: "hands (two): are.",
      es: "hands es plural → are.",
    }, DETECTIVE),
    rearrange(
      "bzg11-13",
      ["her hair?", "What color", "is"],
      ["What color", "is", "her hair?"],
      { en: "What color + is + her hair?", es: "What color + is + her hair?" },
      CHISME,
    ),
    rearrange(
      "bzg11-14",
      ["is", "my mother", "This"],
      ["This", "is", "my mother"],
      { en: "This + is + my mother.", es: "This + is + my mother." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("bzg11-15", "This is my sister. ___ name is Ana and ___ is 25.", "Esta es mi hermana. Su nombre es Ana y tiene 25.", ["Her / she", "His / she", "Her / her"], 0, {
      en: "Her name; she is 25.",
      es: "Her name (antes de sustantivo), she is (antes de verbo).",
    }),
    mc("bzg11-16", "___ is my sister and ___ are my parents.", "Esta es mi hermana y estos son mis papás.", ["This / these", "These / this", "That / this"], 0, {
      en: "this (one), these (two).",
      es: "this para una, these para dos.",
    }),
    mistake("bzg11-17", "My sister have 25 years old.", "have", "is", {
      en: "She is 25.",
      es: "My sister is 25 years old. La edad con is.",
    }, DETECTIVE),
    mistake("bzg11-18", "Ana is a engineer.", "a", "an", {
      en: "an engineer.",
      es: "an engineer: vocal.",
    }, DETECTIVE),

    // ── Trampas ────────────────────────────────────────────────────────────
    mc("bzg11-19", "Her hair is long and ___.", "Su pelo es largo y negro.", ["black", "blacks", "the black"], 0, {
      en: "Adjectives have no plural: black.",
      es: "Los adjetivos no tienen plural ni artículo: black, no blacks ni the black.",
    }),
    mistake("bzg11-20", "Her hair is long and her eyes am brown.", "am", "are", {
      en: "eyes → are.",
      es: "her eyes → are, plural. am es solo para I.",
    }, DETECTIVE),
  ],
};
