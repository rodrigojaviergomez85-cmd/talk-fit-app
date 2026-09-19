import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC ZERO · Día 18 — Feelings (love, like, hate) · object pronouns
 * (me, you, him, her, it, us, them): He is my father. I love him.
 * (Semana 4, día 3: FEELINGS / OBJECT PRONOUNS)
 * 8 ancla · 6 transferencia · 4 repaso · 2 trampas.
 */
const DETECTIVE = "Tomás escribió sobre su familia. Toca la palabra equivocada.";
const CHISME = "Tomás dijo la frase en desorden. Ordénala.";

export const BASIC_ZERO_DAY_18: GrammarQuiz = {
  moduleId: "basic-zero",
  day: 18,
  title: { en: "I Love Them", es: "Los quiero" },
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
    mc("bzg18-4", "This is my dog. I love ___.", "Este es mi perro. Lo quiero.", ["it", "him", "its"], 0, {
      en: "an animal or thing: it.",
      es: "Un animal o cosa → it. (Con mascota con nombre también se usa him/her, pero aquí es it.)",
    }),
    mistake("bzg18-5", "He is my brother. I love he.", "he.", "him.", {
      en: "I love him.",
      es: "I love him. Después del verbo va him, no he.",
    }, DETECTIVE),
    mistake("bzg18-6", "She is my sister. I like she.", "she.", "her.", {
      en: "I like her.",
      es: "I like her. Después del verbo va her, no she.",
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
    mc("bzg18-9", "You are my friend. I like ___.", "Eres mi amigo. Me caes bien.", ["you", "your", "yours"], 0, {
      en: "you (object) is the same as you.",
      es: "you no cambia: I like you.",
    }),
    mc("bzg18-10", "We are a family. My parents love ___.", "Somos una familia. Mis papás nos quieren.", ["us", "we", "our"], 0, {
      en: "we → us after the verb.",
      es: "we → us después del verbo: nos quieren.",
    }),
    mc("bzg18-11", "I hate ___. (the rain)", "Odio la lluvia.", ["it", "him", "its"], 0, {
      en: "the rain = it.",
      es: "la lluvia = it.",
    }),
    mistake("bzg18-12", "My grandmother is from Spain. I love she very much.", "she", "her", {
      en: "I love her.",
      es: "I love her: después de love va her.",
    }, DETECTIVE),
    rearrange(
      "bzg18-13",
      ["us", "love", "My parents"],
      ["My parents", "love", "us"],
      { en: "My parents + love + us.", es: "My parents + love + us." },
      CHISME,
    ),
    rearrange(
      "bzg18-14",
      ["him", "very much", "I love"],
      ["I love", "him", "very much"],
      { en: "I love + him + very much.", es: "I love + him + very much." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("bzg18-15", "This is my mother. ___ is a nurse and ___ favorite fruit is pear.", "Esta es mi mamá. Es enfermera y su fruta favorita es la pera.", ["She / her", "Her / she", "She / she"], 0, {
      en: "She is; her favorite.",
      es: "she antes del verbo, her antes del sustantivo.",
    }),
    mc("bzg18-16", "My cousins ___ from Peru. ___ are police officers.", "Mis primos son de Perú. Son policías.", ["are / They", "is / They", "are / Them"], 0, {
      en: "They are.",
      es: "cousins → are. Y como sujeto, They, no Them.",
    }),
    mistake("bzg18-17", "My uncle have 40 years old.", "have", "is", {
      en: "He is 40.",
      es: "My uncle is 40 years old.",
    }, DETECTIVE),
    mistake("bzg18-18", "This is my aunt. His name is Carmen.", "His", "Her", {
      en: "aunt → her.",
      es: "aunt → Her name.",
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
