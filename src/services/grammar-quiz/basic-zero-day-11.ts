import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC ZERO · Día 11 — Possessive adjectives + be · body parts · basic
 * adjectives (Her hair is long. His eyes are brown.)
 * (Semana 3, día 1: POSSESSIVE ADJECTIVES / VERB TO BE / BODY PARTS)
 * 10 ítems: ancla + transferencia + trampas. Aprueba con 7 de 10.
 */
const DETECTIVE = "Sofía describió a su hermana Ana. Toca la palabra equivocada.";
const CHISME = "Sofía dijo la frase en desorden. Ordénala.";

export const BASIC_ZERO_DAY_11: GrammarQuiz = {
  moduleId: "basic-zero",
  day: 11,
  title: { en: "Her Hair Is Long", es: "Su pelo es largo" },
  passScore: 7,
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
    mistake("bzg11-5", "Her hair are black.", "are", "is", {
      en: "hair is.",
      es: "hair → is. En inglés hair es una sola cosa.",
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
    mc("bzg11-10", "Is her hair black? · No, it ___. It is brown.", "¿Su pelo es negro? · No. Es café.", ["isn't", "aren't", "not"], 0, {
      en: "No, it isn't.",
      es: "No, it isn't. hair = it.",
    }),
    mistake("bzg11-12", "My mother's hands is small.", "is", "are", {
      en: "hands (two): are.",
      es: "hands es plural → are.",
    }, DETECTIVE),

    // ── Repaso ─────────────────────────────────────────────────────────────

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
