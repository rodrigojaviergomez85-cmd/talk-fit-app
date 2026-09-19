import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 1 · Día 18 — Maria's future: she's going to + I think she'll.
 * 8 ancla · 4 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Paola escribió el futuro de María. Toca la palabra equivocada.";
const CHISME = "Paola dijo la frase en desorden. Ordénala.";

export const SIMPLE_FUTURE_DAY_18: GrammarQuiz = {
  moduleId: "simple-future",
  day: 18,
  title: { en: "Maria's Future", es: "El futuro de María" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("sfg18-1", "Maria ___ going to start a new job next month.", "María va a empezar un trabajo nuevo el próximo mes.", ["is", "are", "will"], 0, {
      en: "Maria = she: is going to.",
      es: "Maria → is going to.",
    }),
    mc("sfg18-2", "She's going to work ___ a bilingual call center.", "Va a trabajar en un call center bilingüe.", ["in", "on", "to"], 0, {
      en: "work in a call center.",
      es: "in a call center: dentro de un lugar.",
    }),
    mc("sfg18-3", "I think ___ learn very fast.", "Creo que va a aprender muy rápido.", ["she'll", "she's", "her"], 0, {
      en: "I think she'll.",
      es: "she'll = she will: predicción.",
    }),
    mc("sfg18-4", "___ future will be very good.", "Su futuro va a ser muy bueno.", ["Her", "His", "She"], 0, {
      en: "Maria → her.",
      es: "Maria → Her future.",
    }),
    mistake("sfg18-5", "She's going to practices English every morning.", "practices", "practice", {
      en: "going to practice.",
      es: "going to + practice, verbo solo.",
    }, DETECTIVE),
    mistake("sfg18-6", "She doesn't going to change cities.", "doesn't", "isn't", {
      en: "she isn't going to.",
      es: "Con going to, el negativo es isn't.",
    }, DETECTIVE),
    rearrange(
      "sfg18-7",
      ["on the phone", "She won't be", "nervous"],
      ["She won't be", "nervous", "on the phone"],
      { en: "She won't be + adjective + where.", es: "She won't be + adjetivo + dónde." },
      CHISME,
    ),
    rearrange(
      "sfg18-8",
      ["a team leader", "I think she'll be", "In one year,"],
      ["In one year,", "I think she'll be", "a team leader"],
      { en: "Time + I think she'll be + noun.", es: "Tiempo + I think she'll be + sustantivo." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("sfg18-9", "My cousin Tomas ___ going to start a new job too.", "Mi primo Tomás también va a empezar un trabajo nuevo.", ["is", "are", "will"], 0, {
      en: "Tomas = he: is.",
      es: "Tomas → is going to.",
    }),
    mc("sfg18-10", "I think ___ learn fast too. I'm going to practice every day.", "Creo que yo también voy a aprender rápido. Voy a practicar todos los días.", ["I'll", "I'm", "I"], 0, {
      en: "I'll = I will.",
      es: "I'll learn: predicción sobre mí.",
    }),
    mistake("sfg18-11", "Maria and Tomas is going to work in the same company.", "is", "are", {
      en: "two people: are.",
      es: "Dos personas → are going to.",
    }, DETECTIVE),
    rearrange(
      "sfg18-12",
      ["won't be nervous", "I think", "they"],
      ["I think", "they", "won't be nervous"],
      { en: "I think + subject + won't be + adjective.", es: "I think + sujeto + won't be + adjetivo." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("sfg18-13", "If a friend calls me, ___ go out for coffee.", "Si un amigo me llama, salgo a tomar café.", ["I'll", "I'm going to", "I go"], 0, {
      en: "if …, I'll.",
      es: "If + presente, I'll. Repaso del día 17.",
    }),
    mc("sfg18-14", "Maria is 24 years old. ___ a student and ___ favorite class is English.", "María tiene 24 años. Es estudiante y su clase favorita es inglés.", ["She's / her", "Her / she", "She's / his"], 0, {
      en: "She's a student; her favorite.",
      es: "She's = She is; her antes del sustantivo.",
    }),
    mistake("sfg18-15", "Maria have 24 years old.", "have", "is", {
      en: "She is 24.",
      es: "Maria is 24 years old.",
    }, DETECTIVE),
    mistake("sfg18-16", "Maria work at a call center now.", "work", "works", {
      en: "she works.",
      es: "Maria = she → works.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("sfg18-17", "___ many bilingual call centers in the city.", "Hay muchos call centers bilingües en la ciudad.", ["There are", "There is", "They are"], 0, {
      en: "many call centers: there are.",
      es: "there are: hay, plural.",
    }),
    mc("sfg18-18", "What time does Maria start work? · ___ seven ___ the morning.", "¿A qué hora empieza a trabajar María? · A las siete de la mañana.", ["At / in", "In / at", "On / in"], 0, {
      en: "at seven, in the morning.",
      es: "at con la hora, in con la parte del día.",
    }),
    mistake("sfg18-19", "Maria wants be a team leader.", "wants", "wants to", {
      en: "wants to be.",
      es: "wants to + verbo.",
    }, DETECTIVE),
    mistake("sfg18-20", "The call center is close of her house.", "of", "to", {
      en: "close to her house.",
      es: "close to: cerca de.",
    }, DETECTIVE),
  ],
};
