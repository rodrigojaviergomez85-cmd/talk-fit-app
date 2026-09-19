import { mc, mistake, type GrammarQuiz } from "./types";

/**
 * EAGLES · Semana 1 · Día 3 — B2 LAB · ESTRUCTURA (estilo TOEFL ITP).
 * Tema del día: Give good advice (should / could / If I were… I would).
 * Sección 1: 10 oraciones incompletas con 4 opciones.
 * Sección 2: 6 identificación de error.
 * 16 ítems · aprueba con 12.
 */
const ERR = "Un compañero escribió estos consejos. Toca la palabra equivocada.";

export const EAGLES_LAB_DAY_3: GrammarQuiz = {
  moduleId: "eagles-week-1",
  day: 3,
  title: { en: "B2 Lab · Structure: Good Advice", es: "B2 Lab · Estructura: Buenos consejos" },
  passScore: 12,
  sections: [
    {
      id: "egl3-completion",
      label: { en: "Sentence completion", es: "Completar la oración" },
      instruction: { en: "Choose the word or phrase that best completes the sentence.", es: "Elige la palabra o frase que mejor completa la oración." },
      timeLimitSec: 480,
      itemIds: ["egl3-1", "egl3-2", "egl3-3", "egl3-4", "egl3-5", "egl3-6", "egl3-7", "egl3-8", "egl3-9", "egl3-10"],
    },
    {
      id: "egl3-errors",
      label: { en: "Error identification", es: "Identificar el error" },
      instruction: { en: "Tap the word that makes the sentence incorrect.", es: "Toca la palabra que hace que la oración esté mal." },
      timeLimitSec: 300,
      itemIds: ["egl3-11", "egl3-12", "egl3-13", "egl3-14", "egl3-15", "egl3-16"],
    },
  ],
  items: [
    // ── Completar ──────────────────────────────────────────────────────────
    mc(
      "egl3-1",
      "Carlos wants a better job, ___ he should practice his English more often.",
      "Carlos quiere un mejor trabajo, así que debería practicar su inglés más seguido.",
      ["so", "because", "although", "unless"],
      0,
      {
        en: "so = result (por eso). Because = reason.",
        es: "so = resultado (por eso). Because da la razón, no la consecuencia.",
      },
    ),
    mc(
      "egl3-2",
      "If I ___ Carlos, I would practice speaking every day.",
      "Si yo fuera Carlos, practicaría hablar todos los días.",
      ["were", "am", "would be", "was being"],
      0,
      {
        en: "Second conditional: If I were…, I would…",
        es: "Segundo condicional: If I were…, I would… (were para todas las personas).",
      },
    ),
    mc(
      "egl3-3",
      "If I were Maria, I ___ be afraid of making mistakes.",
      "Si yo fuera María, no tendría miedo de cometer errores.",
      ["wouldn't", "won't", "don't", "didn't"],
      0,
      {
        en: "Second conditional: would / wouldn't in the result.",
        es: "Segundo condicional: would / wouldn't en el resultado.",
      },
    ),
    mc(
      "egl3-4",
      "He could apply for more jobs instead of ___ for one opportunity.",
      "Podría aplicar a más trabajos en vez de esperar una sola oportunidad.",
      ["waiting", "wait", "to wait", "he waits"],
      0,
      {
        en: "instead of + -ing.",
        es: "instead of + verbo en -ing.",
      },
    ),
    mc(
      "egl3-5",
      "She shouldn't be afraid ___ making mistakes.",
      "No debería tener miedo de cometer errores.",
      ["of", "to", "for", "about"],
      0,
      {
        en: "afraid of + -ing.",
        es: "afraid of + -ing: «afraid to» va con verbo base, no con -ing.",
      },
    ),
    mc(
      "egl3-6",
      "Maria wants to improve her English, so she should speak ___ possible.",
      "María quiere mejorar su inglés, así que debería hablar lo más posible.",
      ["as much as", "as more as", "so much as", "the most as"],
      0,
      {
        en: "as much as possible: lo más posible.",
        es: "as much as possible: lo más posible. Fórmula fija as + adjetivo + as.",
      },
    ),
    mc(
      "egl3-7",
      "David is always late, so he should prepare everything ___ before.",
      "David siempre llega tarde, así que debería preparar todo la noche anterior.",
      ["the night", "in the night", "at night", "on the night"],
      0,
      {
        en: "the night before = la noche anterior, no preposition.",
        es: "the night before = la noche anterior, sin preposición.",
      },
    ),
    mc(
      "egl3-8",
      "___, she could practice listening every day.",
      "Además, podría practicar listening todos los días.",
      ["In addition", "However", "Instead", "Otherwise"],
      0,
      {
        en: "In addition = adding one more idea. However = contrast.",
        es: "In addition = además, suma una idea. However = contraste.",
      },
    ),
    mc(
      "egl3-9",
      "He should apply ___ the job before Friday.",
      "Debería aplicar al trabajo antes del viernes.",
      ["for", "to", "at", "in"],
      0,
      {
        en: "apply for a job / a position.",
        es: "apply for a job: aplicar a un trabajo. «Apply to» es para una empresa o universidad.",
      },
    ),
    mc(
      "egl3-10",
      "Overall, small changes ___ help all of them improve.",
      "En general, cambios pequeños podrían ayudarlos a todos a mejorar.",
      ["could", "could to", "can to", "could be"],
      0,
      {
        en: "could + base verb: could help.",
        es: "could + verbo base: could help.",
      },
    ),

    // ── Identificar el error ───────────────────────────────────────────────
    mistake("egl3-11", "If I were Carlos, I will practice speaking every day.", "will", "would", {
      en: "Second conditional: If I were…, I would… (not will).",
      es: "Segundo condicional: If I were…, I would… (no will).",
    }, ERR),
    mistake("egl3-12", "She should speaks as much as possible.", "speaks", "speak", {
      en: "should + base verb.",
      es: "should + verbo base, sin -s.",
    }, ERR),
    mistake("egl3-13", "He could also apply for more jobs instead of wait for one.", "wait", "waiting", {
      en: "instead of + -ing: instead of waiting.",
      es: "instead of + -ing: instead of waiting.",
    }, ERR),
    mistake("egl3-14", "Mistakes are part of learning, so she shouldn't be afraid to making them.", "to", "of", {
      en: "afraid of + -ing.",
      es: "afraid of + -ing: afraid of making.",
    }, ERR),
    mistake("egl3-15", "David is always late, so he should prepares everything the night before.", "prepares", "prepare", {
      en: "should + base verb.",
      es: "should + verbo base: should prepare.",
    }, ERR),
    mistake("egl3-16", "Carlos wants a better job, because he should practice his English more often.", "because", "so", {
      en: "Result → so. Because gives a reason.",
      es: "Consecuencia → so. Because da una razón, no el resultado.",
    }, ERR),
  ],
};
