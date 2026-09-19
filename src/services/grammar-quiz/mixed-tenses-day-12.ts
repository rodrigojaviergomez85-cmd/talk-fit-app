import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 4 · Día 12 — Yes / No Questions (Did · Do · Are you going to · respuestas cortas).
 * Historia: Camila entrevista a Mateo con preguntas rápidas.
 * 6 ancla · 6 transferencia · 4 repaso (Does, Were, Was) · 4 básicos.
 */
const DETECTIVE = "Mateo copió las preguntas en su cuaderno. Toca el error.";
const CHISME = "Camila mezcló las tarjetas de preguntas. Ordena la frase.";

export const MIXED_TENSES_DAY_12: GrammarQuiz = {
  moduleId: "mixed-tenses",
  day: 12,
  title: { en: "Quick Questions", es: "Preguntas rápidas" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("m5g12-1", "Camila: ___ you cook yesterday? · Mateo: Yes, I ___. I cooked rice.", "Camila: ¿Cocinaste ayer? · Mateo: Sí. Cociné arroz.", ["Did / did", "Do / do", "Did / cooked", "Were / was"], 0, {
      en: "Did you cook? Yes, I did.",
      es: "Did you cook? Yes, I did. La respuesta corta repite did.",
    }),
    mc("m5g12-2", "Camila: ___ you exercise every day? · Mateo: No, I ___.", "Camila: ¿Haces ejercicio todos los días? · Mateo: No.", ["Do / don't", "Did / didn't", "Are / am not", "Do / didn't"], 0, {
      en: "every day: Do you exercise? No, I don't.",
      es: "every day es rutina: Do you exercise? No, I don't. Pregunta y respuesta en presente.",
    }),
    mc("m5g12-3", "Camila: ___ you going to travel this year? · Mateo: Yes, I ___.", "Camila: ¿Vas a viajar este año? · Mateo: Sí.", ["Are / am", "Do / do", "Did / did", "Are / do"], 0, {
      en: "Are you going to ...? Yes, I am.",
      es: "Are you going to ...? Yes, I am. La respuesta corta usa am, no going.",
    }),
    mistake("m5g12-4", "Did you drove to work today?", "drove", "drive", {
      en: "Did + base form: Did you drive?",
      es: "Did + forma base: Did you drive? El pasado ya está en Did.",
    }, DETECTIVE),
    mistake("m5g12-5", "No, I didn't. I walk because the weather was nice.", "walk", "walked", {
      en: "Still today's past: walked.",
      es: "Sigue en el pasado de hoy: walked. La razón (was nice) ya está en pasado.",
    }, DETECTIVE),
    rearrange(
      "m5g12-6",
      ["my cousins", "in June", "I'm going to", "visit"],
      ["I'm going to", "visit", "my cousins", "in June"],
      { en: "I'm going to + verb + object + when.", es: "I'm going to + verbo + objeto + cuándo." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("m5g12-7", "Camila: ___ Dani cook last night? · Mateo: No, he ___. He ordered pizza.", "Camila: ¿Dani cocinó anoche? · Mateo: No. Pidió pizza.", ["Did / didn't", "Does / doesn't", "Did / doesn't", "Was / wasn't"], 0, {
      en: "Did Dani cook? No, he didn't.",
      es: "Did Dani cook? No, he didn't. Tercera persona, mismo Did.",
    }),
    mc("m5g12-8", "Camila: ___ your sister exercise every day? · Mateo: Yes, she ___.", "Camila: ¿Tu hermana hace ejercicio todos los días? · Mateo: Sí.", ["Does / does", "Do / does", "Does / do", "Did / does"], 0, {
      en: "Does your sister exercise? Yes, she does.",
      es: "Does your sister exercise? Yes, she does. Tercera persona en presente: Does.",
    }),
    mc("m5g12-9", "Camila: ___ your parents going to travel this year? · Mateo: No, they ___.", "Camila: ¿Tus papás van a viajar este año? · Mateo: No.", ["Are / aren't", "Is / isn't", "Do / don't", "Are / don't"], 0, {
      en: "Are your parents going to ...? No, they aren't.",
      es: "Are your parents going to ...? No, they aren't. Plural, are.",
    }),
    mistake("m5g12-10", "Does Dani cook yesterday?", "Does", "Did", {
      en: "yesterday: Did Dani cook?",
      es: "yesterday: Did Dani cook? Does es presente; con yesterday va Did.",
    }, DETECTIVE),
    rearrange(
      "m5g12-11",
      ["exercise", "your brother", "Does", "every day?"],
      ["Does", "your brother", "exercise", "every day?"],
      { en: "Does + subject + base verb + time.", es: "Does + sujeto + verbo base + tiempo." },
      CHISME,
    ),
    rearrange(
      "m5g12-12",
      ["going to", "Is", "this year?", "Camila", "travel"],
      ["Is", "Camila", "going to", "travel", "this year?"],
      { en: "Is + subject + going to + verb + time.", es: "Is + sujeto + going to + verbo + tiempo." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("m5g12-13", "Camila: ___ you at home last night? · Mateo: Yes, I ___.", "Camila: ¿Estabas en casa anoche? · Mateo: Sí.", ["Were / was", "Did / was", "Was / were", "Are / am"], 0, {
      en: "No action verb: Were you at home? Yes, I was.",
      es: "Sin verbo de acción: Were you at home? Yes, I was. Repaso de Basic 3.",
    }),
    mc("m5g12-14", "Camila: ___ you working at nine yesterday? · Mateo: No, I ___.", "Camila: ¿Estabas trabajando ayer a las nueve? · Mateo: No.", ["Were / wasn't", "Did / didn't", "Was / wasn't", "Are / am not"], 0, {
      en: "Were you working? No, I wasn't.",
      es: "Were you working? No, I wasn't. Pasado progresivo en pregunta. Repaso de Basic 3.",
    }),
    mistake("m5g12-15", "Do your sister like pizza?", "Do", "Does", {
      en: "your sister = she: Does.",
      es: "your sister = she: Does. Repaso de Basic 2.",
    }, DETECTIVE),
    mistake("m5g12-16", "Will you traveling next year?", "traveling", "travel", {
      en: "will + base verb: Will you travel?",
      es: "will + verbo base: Will you travel? Nunca will + -ing. Repaso de Basic 1.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("m5g12-17", "Did you drive ___ work ___ Monday?", "¿Manejaste al trabajo el lunes?", ["to / on", "at / in", "to / in", "in / on"], 0, {
      en: "drive to work, on Monday.",
      es: "drive to work: dirección. on Monday: día.",
    }),
    mc("m5g12-18", "Are you going to visit ___ cousins or ___ parents?", "¿Vas a visitar a tus primos o a tus papás?", ["your / your", "you / you", "yours / yours", "your / yours"], 0, {
      en: "your + noun: your cousins, your parents.",
      es: "your + sustantivo: your cousins, your parents. yours va solo, sin sustantivo (Is this yours?).",
    }),
    mistake("m5g12-19", "Did you cook this vegetables?", "this", "these", {
      en: "vegetables is plural: these.",
      es: "vegetables es plural: these vegetables.",
    }, DETECTIVE),
    mistake("m5g12-20", "Yes, I am. I'm going to visit my cousins on June.", "on", "in", {
      en: "in + month: in June.",
      es: "in con los meses: in June. on es para días.",
    }, DETECTIVE),
  ],
};
