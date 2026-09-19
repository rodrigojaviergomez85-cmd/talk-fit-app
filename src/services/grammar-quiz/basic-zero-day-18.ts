import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC ZERO · Día 18 — Feelings (love, like, hate) · object pronouns
 * (me, you, him, her, it, us, them): He is my father. I love him.
 * (Semana 4, día 3: FEELINGS / OBJECT PRONOUNS)
 * 10 ítems: ancla + transferencia + trampas. Aprueba con 7 de 10.
 */
const DETECTIVE = "Tomás escribió sobre su familia. Toca la palabra equivocada.";
const CHISME = "Tomás dijo la frase en desorden. Ordénala.";

export const BASIC_ZERO_DAY_18: GrammarQuiz = {
  moduleId: "basic-zero",
  day: 18,
  title: { en: "I Love Them", es: "Los quiero" },
  passScore: 7,
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("bzg18-1", "He is my father. I love ___.", "Él es mi papá. Lo quiero.", ["him", "he", "his"], 0, {
      en: "After love: him.",
      es: "Después del verbo va him: lo quiero a él.",
    }),
    mc("bzg18-2", "She is my aunt. I like ___.", "Ella es mi tía. Me cae bien.", ["her", "she", "hers"], 0, {
      en: "After like: her.",
      es: "Después del verbo va her.",
    }),
    mc("bzg18-3", "They are my cousins. I love ___.", "Ellos son mis primos. Los quiero.", ["them", "they", "their"], 0, {
      en: "After love: them.",
      es: "Después del verbo va them: a ellos.",
    }),
    mistake("bzg18-5", "He is my brother. I love he.", "he.", "him.", {
      en: "I love him.",
      es: "I love him. Después del verbo va him, no he.",
    }, DETECTIVE),
    rearrange(
      "bzg18-7",
      ["them", "I", "love"],
      ["I", "love", "them"],
      { en: "I + love + them.", es: "I + love + them." },
      CHISME,
    ),
    rearrange(
      "bzg18-8",
      ["I like", "and", "him", "He is my uncle"],
      ["He is my uncle", "and", "I like", "him"],
      { en: "He is my uncle and I like him.", es: "He is my uncle and I like him." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("bzg18-10", "We are a family. My parents love ___.", "Somos una familia. Mis papás nos quieren.", ["us", "we", "our"], 0, {
      en: "we → us after the verb.",
      es: "we → us después del verbo: nos quieren.",
    }),
    mistake("bzg18-12", "My grandmother is from Spain. I love she very much.", "she", "her", {
      en: "I love her.",
      es: "I love her: después de love va her.",
    }, DETECTIVE),


    // ── Trampas ────────────────────────────────────────────────────────────
    mc("bzg18-19", "They are my sisters. I love ___.", "Ellas son mis hermanas. Las quiero.", ["them", "her", "they"], 0, {
      en: "sisters (plural) → them.",
      es: "sisters es plural → them. her sería una sola hermana.",
    }),
    mistake("bzg18-20", "My mother loves I very much.", "I", "me", {
      en: "loves me.",
      es: "My mother loves me. Después del verbo va me, no I.",
    }, DETECTIVE),
  ],
};
