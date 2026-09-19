import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 3 · Día 7 — My Friend's Day (pasado en tercera persona: he / they).
 * Historia del día: Mateo y Dylan en el centro comercial, contado por chat con Kat.
 * Mezcla: 11 pasado de la semana · 4 repaso Basic 1 y 2 (going to, has)
 * · 5 básicos (this/these, on Saturday, a/an, wait for)
 * · organizados en 8 ancla, 8 transferencia, 4 trampas.
 */
const DETECTIVE = "Mateo le escribió esto a Kat. Toca el error antes de que lo mande.";
const CHISME = "Dylan lo contó en desorden. Ordena la frase.";

export const PAST_STORIES_DAY_7: GrammarQuiz = {
  moduleId: "past-stories",
  day: 7,
  title: { en: "Mateo at the Mall", es: "Mateo en el centro comercial" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("m3g7-1", "Mateo ___ to the mall with Dylan yesterday.", "Mateo fue al centro comercial con Dylan ayer.", ["go", "goes", "went", "gone"], 2, {
      en: "go → went.",
      es: "go → went. goes es presente de he; gone necesita have.",
    }),
    mc("m3g7-2", "They ___ some friends there.", "Se encontraron con unos amigos allí.", ["meet", "met", "meeted", "meets"], 1, {
      en: "meet → met. Irregular.",
      es: "meet → met. Irregular, no lleva -ed.",
    }),
    mc("m3g7-3", "Mateo ___ a new shirt. It was green, of course.", "Mateo compró una camisa nueva. Verde, claro.", ["buy", "buys", "bought", "buyed"], 2, {
      en: "buy → bought.",
      es: "buy → bought. Uno de los irregulares que más se usan.",
    }),
    mc("m3g7-4", "They ___ a movie in the afternoon.", "Vieron una película en la tarde.", ["see", "saw", "seen", "sees"], 1, {
      en: "see → saw. seen is the participle.",
      es: "see → saw. seen es el participio (have seen).",
    }),
    mistake("m3g7-5", "They eat lunch together at the food court.", "eat", "ate", {
      en: "Yesterday: ate.",
      es: "Fue ayer: ate. eat suena a rutina de todos los días.",
    }, DETECTIVE),
    mistake("m3g7-6", "Mateo didn't stayed very late.", "stayed", "stay", {
      en: "After didn't, base form: didn't stay.",
      es: "Después de didn't el verbo va en forma base: didn't stay.",
    }, DETECTIVE),
    rearrange(
      "m3g7-7",
      ["tired", "came home", "Around seven,", "he"],
      ["Around seven,", "he", "came home", "tired"],
      { en: "Time, subject, verb, how he felt.", es: "Tiempo, sujeto, verbo, cómo llegó." },
      CHISME,
    ),
    rearrange(
      "m3g7-8",
      ["a movie", "Dylan", "with Mateo", "saw"],
      ["Dylan", "saw", "a movie", "with Mateo"],
      { en: "Subject + verb + object + who with.", es: "Sujeto + verbo + objeto + con quién." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("m3g7-9", "Kat: ___ you go to the mall yesterday? · Mateo: Yes, I ___.", "Kat: ¿Fuiste al centro comercial ayer? · Mateo: Sí.", ["Did / did", "Do / do", "Did / went", "Were / was"], 0, {
      en: "Did you go ...? Yes, I did.",
      es: "Did you go ...? Yes, I did. La respuesta corta repite did, no el verbo.",
    }),
    mc("m3g7-10", "Mateo: Next Saturday we ___ to the beach.", "Mateo: El próximo sábado vamos a ir a la playa.", ["go", "went", "are going to go", "going"], 2, {
      en: "A plan for next Saturday: are going to go.",
      es: "Un plan para el próximo sábado: are going to go. Es futuro, no pasado.",
    }),
    mc("m3g7-11", "Kat: Is ___ your new shirt? · Mateo: Yes, do you like it?", "Kat: ¿Esta es tu camisa nueva? · Mateo: Sí, ¿te gusta?", ["this", "these", "those", "them"], 0, {
      en: "One shirt, here: this.",
      es: "Una camisa, aquí: this. these y those son para plural.",
    }),
    mistake("m3g7-12", "Dylan buyed a cap and two shirts.", "buyed", "bought", {
      en: "buy → bought. No -ed.",
      es: "buy → bought. buy es irregular; buyed no existe.",
    }, DETECTIVE),
    mistake("m3g7-13", "They met their friends in Saturday.", "in", "on", {
      en: "on + day: on Saturday.",
      es: "on con los días: on Saturday. in es para meses y años (in May, in 2026).",
    }, DETECTIVE),
    rearrange(
      "m3g7-14",
      ["buy", "anything", "Dylan", "didn't"],
      ["Dylan", "didn't", "buy", "anything"],
      { en: "Subject + didn't + base verb + anything.", es: "Sujeto + didn't + verbo base + anything. En negativo se usa anything, no nothing." },
      CHISME,
    ),
    rearrange(
      "m3g7-15",
      ["her sister", "is going to", "next weekend", "Kat", "visit"],
      ["Kat", "is going to", "visit", "her sister", "next weekend"],
      { en: "Plan: subject + is going to + verb + object + when.", es: "Plan: sujeto + is going to + verbo + objeto + cuándo. Repaso de Basic 1." },
      CHISME,
    ),
    mc("m3g7-16", "Dylan bought ___ orange cap and ___ new phone case.", "Dylan compró una gorra naranja y una funda nueva para el teléfono.", ["an / a", "a / a", "a / an", "the / an"], 0, {
      en: "an + vowel sound (an orange), a + consonant sound (a new).",
      es: "an antes de sonido de vocal (an orange), a antes de consonante (a new). Se mira el sonido de la palabra que sigue.",
    }),

    // ── Trampas ────────────────────────────────────────────────────────────
    mc("m3g7-17", "Kat: What ___ at the mall? · Mateo: We ate pizza.", "Kat: ¿Qué comieron en el centro comercial? · Mateo: Comimos pizza.", ["did you eat", "you ate", "did you ate", "you did eat"], 0, {
      en: "Wh-question in the past: What did you eat?",
      es: "Pregunta con wh en pasado: What did you eat? did + verbo base. «What you ate» es calco de «qué comiste».",
    }),
    mistake("m3g7-18", "Mateo waited to Dylan at the entrance.", "to", "for", {
      en: "wait for someone.",
      es: "wait for someone: esperar a alguien. «Wait to» es calco de «esperar a».",
    }, DETECTIVE),
    mistake("m3g7-19", "He have a new shirt now.", "have", "has", {
      en: "he has. Present, not past.",
      es: "he has. Esto es presente (now): con he/she es has. Repaso de Basic 2.",
    }, DETECTIVE),
    mistake("m3g7-20", "They saw a movie and then they go home.", "go", "went", {
      en: "Both actions yesterday: saw ... went.",
      es: "Las dos acciones fueron ayer: saw ... went. Cambiar a presente a mitad de frase es el error más común al contar el día.",
    }, DETECTIVE),
  ],
};
