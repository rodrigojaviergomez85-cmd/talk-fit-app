import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 4 · Día 7 — Someone Else's Routine (Laura: antes y ahora, tercera persona).
 * Historia: Kat presenta a Laura, su amiga que cambió de vida.
 * 6 ancla · 6 transferencia · 4 repaso (futuro, preguntas) · 4 básicos.
 */
const DETECTIVE = "Kat escribió la historia de Laura. Toca el error antes de que la publique.";
const CHISME = "Mateo la contó en desorden. Ordena la frase.";

export const MIXED_TENSES_DAY_7: GrammarQuiz = {
  moduleId: "mixed-tenses",
  day: 7,
  title: { en: "This Is Laura", es: "Ella es Laura" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("m5g7-1", "This is Laura. She ___ every morning at six.", "Ella es Laura. Hace ejercicio todas las mañanas a las seis.", ["exercises", "exercise", "exercised", "is exercise"], 0, {
      en: "she + routine: exercises (-s).",
      es: "she + rutina: exercises, con -s.",
    }),
    mc("m5g7-2", "Before, she never ___. She ___ last year.", "Antes nunca hacía ejercicio. Empezó el año pasado.", ["exercised / started", "exercises / starts", "exercised / start", "exercise / started"], 0, {
      en: "Before: exercised (past habit). Last year: started.",
      es: "Before: exercised, hábito pasado. Last year: started.",
    }),
    mc("m5g7-3", "Two years ago, she ___ a big car. Now she ___ her bike to the office.", "Hace dos años manejaba un carro grande. Ahora va en bici a la oficina.", ["drove / rides", "drives / rode", "drove / ride", "drive / rides"], 0, {
      en: "Two years ago: drove. Now: rides (-s).",
      es: "Two years ago: drove. Now: rides, con -s.",
    }),
    mistake("m5g7-4", "She design websites for small businesses.", "design", "designs", {
      en: "she designs.",
      es: "she designs, con -s. Rutina en tercera persona.",
    }, DETECTIVE),
    mistake("m5g7-5", "Before that, she answer phones at a clinic.", "answer", "answered", {
      en: "Before that: answered (past).",
      es: "Before that: answered, pasado.",
    }, DETECTIVE),
    rearrange(
      "m5g7-6",
      ["for two hours", "read", "Yesterday,", "she"],
      ["Yesterday,", "she", "read", "for two hours"],
      { en: "Yesterday, + she + read + how long.", es: "Yesterday, + she + read + cuánto tiempo. read en pasado se escribe igual." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("m5g7-7", "Mateo: My uncle ___ a taxi five years ago. Now he ___ a small restaurant.", "Mateo: Mi tío manejaba un taxi hace cinco años. Ahora tiene un restaurante pequeño.", ["drove / has", "drives / had", "drove / have", "drive / has"], 0, {
      en: "five years ago: drove. now: has (-s).",
      es: "five years ago: drove. now: has, tercera persona.",
    }),
    mc("m5g7-8", "Kat: Laura ___ coffee anymore. She ___ tea now.", "Kat: Laura ya no toma café. Ahora toma té.", ["doesn't drink / drinks", "don't drink / drink", "didn't drink / drinks", "doesn't drink / drink"], 0, {
      en: "she doesn't drink ... she drinks.",
      es: "she doesn't drink ... she drinks. Negativo y afirmativo en tercera persona.",
    }),
    mc("m5g7-9", "Mateo: ___ Laura work at the clinic now? · Kat: No, she ___ there two years ago.", "Mateo: ¿Laura trabaja en la clínica ahora? · Kat: No, trabajó allí hace dos años.", ["Does / worked", "Did / works", "Does / works", "Do / worked"], 0, {
      en: "now: Does she work? two years ago: worked.",
      es: "now: Does she work? two years ago: worked. Presente y pasado en el mismo diálogo.",
    }),
    mistake("m5g7-10", "My aunt cleaned her kitchen every evening and reads.", "cleaned", "cleans", {
      en: "every evening: cleans (routine, like reads).",
      es: "every evening: cleans, rutina, igual que reads. Los dos verbos en presente.",
    }, DETECTIVE),
    rearrange(
      "m5g7-11",
      ["at a bank", "worked", "Before,", "my mom"],
      ["Before,", "my mom", "worked", "at a bank"],
      { en: "Before, + subject + past verb + place.", es: "Before, + sujeto + verbo en pasado + lugar." },
      CHISME,
    ),
    rearrange(
      "m5g7-12",
      ["her bike", "to the office", "rides", "every day", "She"],
      ["She", "rides", "her bike", "to the office", "every day"],
      { en: "She + rides + object + where + when.", es: "She + rides + objeto + a dónde + cuándo." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("m5g7-13", "Kat: Next year Laura ___ her own company.", "Kat: El próximo año Laura va a abrir su propia empresa.", ["is going to open", "opened", "opens", "was opening"], 0, {
      en: "Next year: is going to open.",
      es: "Next year: is going to open. Repaso de Basic 1.",
    }),
    mc("m5g7-14", "Mateo: What ___ she ___ before that? · Kat: She answered phones.", "Mateo: ¿Qué hacía antes de eso? · Kat: Contestaba teléfonos.", ["did / do", "does / do", "did / did", "was / do"], 0, {
      en: "Past question: What did she do?",
      es: "Pregunta en pasado: What did she do? Repaso de Basic 3.",
    }),
    mistake("m5g7-15", "Right now Laura is design a new website.", "design", "designing", {
      en: "is + designing.",
      es: "is + designing. Presente progresivo. Repaso de Basic 2.",
    }, DETECTIVE),
    mistake("m5g7-16", "Laura didn't liked her old job.", "liked", "like", {
      en: "didn't + base form: didn't like.",
      es: "didn't + forma base: didn't like. Repaso de Basic 3.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("m5g7-17", "She works ___ home ___ Mondays and ___ the office the rest of the week.", "Trabaja desde casa los lunes y en la oficina el resto de la semana.", ["from / on / at", "at / in / in", "from / in / at", "in / on / at"], 0, {
      en: "works from home, on Mondays, at the office.",
      es: "from home (desde casa), on Mondays, at the office.",
    }),
    mc("m5g7-18", "Laura designs websites for ___ small business near ___ office.", "Laura diseña sitios web para una empresa pequeña cerca de la oficina.", ["a / the", "an / a", "the / a", "a / a"], 0, {
      en: "a small business (one of many), the office (hers).",
      es: "a small business: una cualquiera. the office: la suya, ya se sabe cuál.",
    }),
    mistake("m5g7-19", "Laura has 30 years old.", "has", "is", {
      en: "Age: is 30 years old.",
      es: "La edad con be: is 30 years old. «Has 30 years» es calco.",
    }, DETECTIVE),
    mistake("m5g7-20", "She reads on the evening and goes to bed at ten.", "on", "in", {
      en: "in the evening.",
      es: "in the evening: in con las partes del día (morning, afternoon, evening). on es para días.",
    }, DETECTIVE),
  ],
};
