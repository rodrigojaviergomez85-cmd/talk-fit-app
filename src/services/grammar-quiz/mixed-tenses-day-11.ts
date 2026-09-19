import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 4 · Día 11 — I Was, I Am, I Will Be (be en tres tiempos).
 * Historia: Vale se compara con la Vale de hace cinco años.
 * 6 ancla · 6 transferencia · 4 repaso (pasado, presente, going to) · 4 básicos.
 */
const DETECTIVE = "Vale escribió su antes y después. Toca el error antes de que lo publique.";
const CHISME = "Dani lo contó en desorden. Ordena la frase.";

export const MIXED_TENSES_DAY_11: GrammarQuiz = {
  moduleId: "mixed-tenses",
  day: 11,
  title: { en: "Five Years Ago, Today, In Two Years", es: "Hace cinco años, hoy, en dos años" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("m5g11-1", "Five years ago, I ___ a very shy person.", "Hace cinco años era una persona muy tímida.", ["was", "am", "will be", "were"], 0, {
      en: "Five years ago: was.",
      es: "Five years ago: was. Pasado de be con I.",
    }),
    mc("m5g11-2", "I ___ confident in English at all.", "No tenía nada de confianza en inglés.", ["wasn't", "am not", "won't be", "didn't"], 0, {
      en: "Still the past: wasn't.",
      es: "Sigue en el pasado: wasn't. didn't no va con adjetivos.",
    }),
    mc("m5g11-3", "Today, I ___ much more confident. In two years, I ___ completely fluent.", "Hoy tengo mucha más confianza. En dos años voy a hablar con total fluidez.", ["am / will be", "was / am", "am / am", "will be / am"], 0, {
      en: "Today: am. In two years: will be.",
      es: "Today: am. In two years: will be. Presente y futuro de be.",
    }),
    mistake("m5g11-4", "I am not perfect, but I am not afraid no more.", "no", "any", {
      en: "not ... anymore. One negative only.",
      es: "not ... anymore: un solo negativo. «Not afraid no more» es doble negativo, calco de «ya no».",
    }, DETECTIVE),
    mistake("m5g11-5", "I won't being a beginner anymore.", "being", "be", {
      en: "won't + base verb: won't be.",
      es: "won't + verbo base: won't be. Después de will o won't nunca va -ing.",
    }, DETECTIVE),
    rearrange(
      "m5g11-6",
      ["her teacher", "I", "Soon,", "will be"],
      ["Soon,", "I", "will be", "her teacher"],
      { en: "Soon, + I + will be + noun.", es: "Soon, + I + will be + sustantivo." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("m5g11-7", "Dani: Three years ago, my English ___ terrible. Now it ___ good, and next year it ___ excellent.", "Dani: Hace tres años mi inglés era terrible. Ahora es bueno, y el próximo año va a ser excelente.", ["was / is / will be", "is / was / will be", "was / was / is", "were / is / will be"], 0, {
      en: "was, is, will be: the three tenses of be.",
      es: "was, is, will be: los tres tiempos de be, con it.",
    }),
    mc("m5g11-8", "Vale: My sister ___ my first teacher. Now we ___ partners.", "Vale: Mi hermana fue mi primera maestra. Ahora somos socias.", ["was / are", "were / are", "was / were", "is / are"], 0, {
      en: "my sister: was. we: are.",
      es: "my sister: was, singular. we: are, presente plural.",
    }),
    mc("m5g11-9", "Dani: ___ you nervous on your first day? · Vale: Yes, I ___.", "Dani: ¿Estabas nerviosa tu primer día? · Vale: Sí.", ["Were / was", "Was / were", "Did / was", "Are / am"], 0, {
      en: "Were you ...? Yes, I was.",
      es: "Were you ...? Yes, I was. Pregunta con were, respuesta con was.",
    }),
    mistake("m5g11-10", "My parents was very proud of me last year.", "was", "were", {
      en: "my parents = they: were.",
      es: "my parents = they: were.",
    }, DETECTIVE),
    rearrange(
      "m5g11-11",
      ["shy", "wasn't", "Five years ago,", "Dani"],
      ["Five years ago,", "Dani", "wasn't", "shy"],
      { en: "Time + subject + wasn't + adjective.", es: "Tiempo + sujeto + wasn't + adjetivo." },
      CHISME,
    ),
    rearrange(
      "m5g11-12",
      ["fluent", "will be", "In two years,", "we", "both"],
      ["In two years,", "we", "will be", "both", "fluent"],
      { en: "Time + we + will be + both + adjective.", es: "Tiempo + we + will be + both (los dos) + adjetivo." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("m5g11-13", "Vale: Five years ago I ___ to speak in meetings. Now I ___ every week.", "Vale: Hace cinco años no hablaba en las reuniones. Ahora hablo todas las semanas.", ["didn't speak / speak", "don't speak / spoke", "didn't spoke / speak", "wasn't speak / speak"], 0, {
      en: "Five years ago: didn't speak. Now: speak.",
      es: "Five years ago: didn't speak. Now: speak. Repaso de Basic 3 y 2.",
    }),
    mc("m5g11-14", "Dani: Next month I ___ a course in Bogotá.", "Dani: El próximo mes voy a tomar un curso en Bogotá.", ["am going to take", "took", "take", "was taking"], 0, {
      en: "Next month: am going to take.",
      es: "Next month: am going to take. Repaso de Basic 1.",
    }),
    mistake("m5g11-15", "Vale's sister teach English at a school.", "teach", "teaches", {
      en: "her sister = she: teaches.",
      es: "her sister = she: teaches, con -es. Repaso de Basic 2.",
    }, DETECTIVE),
    mistake("m5g11-16", "Right now Vale is teach a class in the small room.", "teach", "teaching", {
      en: "is + teaching.",
      es: "is + teaching. Presente progresivo. Repaso de Basic 2.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("m5g11-17", "I was shy ___ work and quiet ___ parties.", "Era tímida en el trabajo y callada en las fiestas.", ["at / at", "in / in", "on / at", "at / in"], 0, {
      en: "at work, at parties.",
      es: "at work, at parties. Los dos con at: lugares y eventos donde uno está.",
    }),
    mc("m5g11-18", "___ was a difficult time, but ___ is a good time.", "Ese fue un tiempo difícil, pero este es un buen tiempo.", ["That / this", "This / that", "Those / these", "That / these"], 0, {
      en: "That (past, far), this (now).",
      es: "That: el pasado, lejos. This: ahora, cerca.",
    }),
    mistake("m5g11-19", "I was a very shy person and I had few friends, but them were good.", "them", "they", {
      en: "Subject: they were good.",
      es: "Sujeto: they were good. them es objeto (I called them); they es sujeto.",
    }, DETECTIVE),
    mistake("m5g11-20", "My sister was my first teacher when I have 15 years old.", "have", "was", {
      en: "Age in the past: when I was 15.",
      es: "La edad en pasado: when I was 15 years old. «I have 15 years» es calco, y además la historia es de antes.",
    }, DETECTIVE),
  ],
};
