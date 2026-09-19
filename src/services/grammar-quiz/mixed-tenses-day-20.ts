import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 4 · Día 20 — Mixed Tense Fluency Challenge (reto final del mes).
 * Historia: Vale cierra el mes con su vida en inglés, pasado, presente y futuro.
 * 6 ancla · 6 transferencia · 4 repaso · 4 básicos. Todo el mes en un examen.
 */
const DETECTIVE = "Vale escribió el cierre del mes para la clase. Toca el error antes de que lo lea.";
const CHISME = "Dani lo contó en desorden. Ordena la frase.";

export const MIXED_TENSES_DAY_20: GrammarQuiz = {
  moduleId: "mixed-tenses",
  day: 20,
  title: { en: "My Life in English", es: "Mi vida en inglés" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("m5g20-1", "Yesterday, I ___ my house and ___ dinner. Every day, I ___ English and ___.", "Ayer limpié la casa y cociné la cena. Todos los días practico inglés y hago ejercicio.", ["cleaned / cooked / practice / exercise", "clean / cook / practiced / exercised", "cleaned / cooked / practices / exercises", "cleaned / cook / practice / exercised"], 0, {
      en: "Yesterday: cleaned, cooked. Every day: practice, exercise.",
      es: "Yesterday: cleaned, cooked. Every day: practice, exercise, sin -s para I.",
    }),
    mc("m5g20-2", "Tomorrow, I ___ to my parents' house.", "Mañana voy a manejar a la casa de mis papás.", ["am going to drive", "drove", "drive", "was driving"], 0, {
      en: "Tomorrow: am going to drive.",
      es: "Tomorrow: am going to drive.",
    }),
    mc("m5g20-3", "Five years ago, I ___ a different person. Today, I ___ proud of my progress. In the future, I ___ completely fluent.", "Hace cinco años era una persona distinta. Hoy estoy orgullosa de mi progreso. En el futuro, voy a hablar con total fluidez.", ["was / am / will be", "am / was / will be", "was / was / am", "were / am / will be"], 0, {
      en: "was, am, will be.",
      es: "was, am, will be: los tres tiempos de be, en orden.",
    }),
    mistake("m5g20-4", "Last weekend were calm, but next weekend is going to be exciting.", "were", "was", {
      en: "last weekend = it: was.",
      es: "last weekend = it: was. Singular.",
    }, DETECTIVE),
    mistake("m5g20-5", "Every day I practices English and exercise.", "practices", "practice", {
      en: "I practice (no -s).",
      es: "I practice, sin -s. La -s no va con I.",
    }, DETECTIVE),
    rearrange(
      "m5g20-6",
      ["my life in English", "Past, present, future —"],
      ["Past, present, future —", "my life in English"],
      { en: "The three tenses, then the title.", es: "Los tres tiempos, y luego el título." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("m5g20-7", "Dani: Last month Camila ___ a course. Now she ___ the lessons every night, and next month she ___ the exam.", "Dani: El mes pasado Camila empezó un curso. Ahora estudia las lecciones todas las noches, y el próximo mes va a hacer el examen.", ["started / studies / is going to take", "starts / studied / takes", "started / study / took", "is starting / studies / takes"], 0, {
      en: "started (last month), studies (now, -s), is going to take (next month).",
      es: "started, el mes pasado; studies, ahora, con -s; is going to take, el próximo mes.",
    }),
    mc("m5g20-8", "Vale: When I started, I ___ at all. Now I ___ in meetings, and right now I ___ in English.", "Vale: Cuando empecé, no hablaba nada. Ahora hablo en reuniones, y ahora mismo estoy pensando en inglés.", ["didn't speak / speak / am thinking", "don't speak / spoke / think", "didn't speak / speaks / am thinking", "wasn't speak / speak / think"], 0, {
      en: "didn't speak (past), speak (now), am thinking (right now).",
      es: "didn't speak, pasado; speak, presente; am thinking, progresivo. Tres formas, una persona.",
    }),
    mc("m5g20-9", "Dani: ___ you ___ to open a second academy? · Vale: Yes, I ___. In two years.", "Dani: ¿Vas a abrir una segunda academia? · Vale: Sí. En dos años.", ["Are / going / am", "Do / going / do", "Did / go / did", "Are / go / am"], 0, {
      en: "Are you going to ...? Yes, I am.",
      es: "Are you going to ...? Yes, I am. Pregunta y respuesta corta de plan.",
    }),
    mistake("m5g20-10", "Camila don't practice every day, but she is improving.", "don't", "doesn't", {
      en: "Camila = she: doesn't.",
      es: "Camila = she: doesn't.",
    }, DETECTIVE),
    rearrange(
      "m5g20-11",
      ["a different person", "Five years ago,", "was", "Camila"],
      ["Five years ago,", "Camila", "was", "a different person"],
      { en: "Time + subject + was + noun.", es: "Tiempo + sujeto + was + sustantivo." },
      CHISME,
    ),
    rearrange(
      "m5g20-12",
      ["will be", "fluent", "In the future,", "completely", "we"],
      ["In the future,", "we", "will be", "completely", "fluent"],
      { en: "Time + we + will be + adverb + adjective.", es: "Tiempo + we + will be + adverbio + adjetivo." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("m5g20-13", "Vale: Yesterday at seven I ___ dinner when Dani ___ with the news.", "Vale: Ayer a las siete estaba cocinando cuando Dani llamó con la noticia.", ["was cooking / called", "cooked / was calling", "cook / called", "was cooking / calls"], 0, {
      en: "was cooking + called.",
      es: "was cooking, en progreso, + called, la interrupción. Repaso de Basic 3.",
    }),
    mc("m5g20-14", "Dani: What ___ you ___ last weekend? · Vale: I stayed home and rested.", "Dani: ¿Qué hiciste el fin de semana pasado? · Vale: Me quedé en casa y descansé.", ["did / do", "do / do", "did / did", "were / doing"], 0, {
      en: "last weekend: What did you do?",
      es: "last weekend: What did you do? Repaso de Basic 3.",
    }),
    mistake("m5g20-15", "Right now Dani is edit the video of the month.", "edit", "editing", {
      en: "is + editing.",
      es: "is + editing. Presente progresivo. Repaso de Basic 2.",
    }, DETECTIVE),
    mistake("m5g20-16", "I promise I will practicing every day next month.", "practicing", "practice", {
      en: "will + base verb: will practice.",
      es: "will + verbo base: will practice. Repaso de Basic 1.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("m5g20-17", "I practice ___ the morning, ___ home, and I drive ___ the academy ___ eight.", "Practico en la mañana, en casa, y manejo a la academia a las ocho.", ["in / at / to / at", "at / in / at / in", "in / in / to / on", "on / at / at / at"], 0, {
      en: "in the morning, at home, drive to the academy, at eight.",
      es: "in the morning, at home, to the academy, at eight. Cuatro preposiciones, cuatro usos.",
    }),
    mc("m5g20-18", "___ was a hard year. ___ is a better one. ___ are my plans for the next one.", "Ese fue un año duro. Este es mejor. Estos son mis planes para el siguiente.", ["That / This / These", "This / That / Those", "Those / These / This", "That / These / This"], 0, {
      en: "That (past), this (now), these (plural, near).",
      es: "That: el pasado, lejos. This: el de ahora. These: plural y cerca, los planes.",
    }),
    mistake("m5g20-19", "I am proud of my progress and of my students progress too.", "students", "students'", {
      en: "Plural possessive: my students' progress.",
      es: "Posesivo plural: my students' progress. El apóstrofo después de la s.",
    }, DETECTIVE),
    mistake("m5g20-20", "I have 25 years old and I speak English every day.", "have", "am", {
      en: "Age: I am 25.",
      es: "La edad con be: I am 25 years old. El calco más viejo del curso, para cerrar el mes sin él.",
    }, DETECTIVE),
  ],
};
