import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 4 · Día 13 — WH Questions Across Time (What did · Where do · When are you going to · Why).
 * Historia: Kat entrevista a Luis para el podcast del equipo.
 * 6 ancla · 6 transferencia · 4 repaso (was doing, will, Does) · 4 básicos.
 */
const DETECTIVE = "Kat escribió las preguntas del podcast. Toca el error antes de grabar.";
const CHISME = "Luis mezcló las tarjetas. Ordena la pregunta.";

export const MIXED_TENSES_DAY_13: GrammarQuiz = {
  moduleId: "mixed-tenses",
  day: 13,
  title: { en: "The Team Podcast", es: "El podcast del equipo" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("m5g13-1", "Kat: What ___ last night? · Luis: I painted my bedroom wall.", "Kat: ¿Qué hiciste anoche? · Luis: Pinté la pared de mi cuarto.", ["did you do", "do you do", "you did", "are you doing"], 0, {
      en: "last night: What did you do?",
      es: "last night: What did you do? Pasado.",
    }),
    mc("m5g13-2", "Kat: Where ___ your weekends? · Luis: At my parents' house.", "Kat: ¿Dónde pasas normalmente los fines de semana? · Luis: En casa de mis papás.", ["do you usually spend", "did you usually spend", "you usually spend", "are you spend"], 0, {
      en: "usually: Where do you spend?",
      es: "usually es rutina: Where do you spend? Presente.",
    }),
    mc("m5g13-3", "Kat: When ___ practice English today? · Luis: Right after dinner.", "Kat: ¿Cuándo vas a practicar inglés hoy? · Luis: Justo después de cenar.", ["are you going to", "did you", "do you going to", "you are going to"], 0, {
      en: "A plan: When are you going to practice?",
      es: "Un plan: When are you going to practice? are antes de you.",
    }),
    mistake("m5g13-4", "Why did you started learning English?", "started", "start", {
      en: "did + base form: did you start?",
      es: "did + forma base: Why did you start? El pasado ya está en did.",
    }, DETECTIVE),
    mistake("m5g13-5", "Because I want a better job and I need speak English.", "need", "need to", {
      en: "need to + verb.",
      es: "need to + verbo: I need to speak. need siempre lleva to antes de otro verbo.",
    }, DETECTIVE),
    rearrange(
      "m5g13-6",
      ["them", "usually", "at my parents' house", "I", "spend"],
      ["I", "usually", "spend", "them", "at my parents' house"],
      { en: "I + usually + verb + object + place.", es: "I + usually + verbo + objeto + lugar. usually va antes del verbo." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("m5g13-7", "Kat: Where ___ Ana ___ last weekend? · Luis: At the beach.", "Kat: ¿A dónde fue Ana el fin de semana pasado? · Luis: A la playa.", ["did / go", "does / go", "did / went", "was / go"], 0, {
      en: "last weekend: Where did Ana go?",
      es: "last weekend: Where did Ana go? did + base.",
    }),
    mc("m5g13-8", "Kat: What time ___ Mateo usually ___ work? · Luis: At eight.", "Kat: ¿A qué hora empieza Mateo normalmente a trabajar? · Luis: A las ocho.", ["does / start", "did / start", "does / starts", "is / start"], 0, {
      en: "usually: What time does Mateo start?",
      es: "usually: What time does Mateo start? Does para he; el verbo en base.",
    }),
    mc("m5g13-9", "Kat: Why ___ you ___ to move next year? · Luis: Because the rent is too high.", "Kat: ¿Por qué te vas a mudar el próximo año? · Luis: Porque el alquiler está muy caro.", ["are / going", "do / going", "did / go", "are / go"], 0, {
      en: "next year: Why are you going to move?",
      es: "next year: Why are you going to move?",
    }),
    mistake("m5g13-10", "When does Ana practice English yesterday?", "does", "did", {
      en: "yesterday: When did Ana practice?",
      es: "yesterday: When did Ana practice? does es presente; con yesterday va did.",
    }, DETECTIVE),
    rearrange(
      "m5g13-11",
      ["do", "Where", "you", "work?"],
      ["Where", "do", "you", "work?"],
      { en: "Wh-word + do + you + verb.", es: "Palabra wh + do + you + verbo." },
      CHISME,
    ),
    rearrange(
      "m5g13-12",
      ["Mateo", "last night?", "did", "What", "eat"],
      ["What", "did", "Mateo", "eat", "last night?"],
      { en: "What + did + subject + base verb + time.", es: "What + did + sujeto + verbo base + tiempo." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("m5g13-13", "Kat: What ___ at ten last night? · Luis: I was painting.", "Kat: ¿Qué estabas haciendo anoche a las diez? · Luis: Estaba pintando.", ["were you doing", "did you doing", "do you do", "you were doing"], 0, {
      en: "In progress at ten: were you doing.",
      es: "En progreso a las diez: were you doing. Repaso de Basic 3.",
    }),
    mc("m5g13-14", "Kat: ___ you finish the wall tonight? · Luis: I think I will.", "Kat: ¿Vas a terminar la pared esta noche? · Luis: Creo que sí.", ["Will", "Did", "Do", "Were"], 0, {
      en: "Prediction: Will you finish?",
      es: "Predicción: Will you finish? La respuesta lo confirma: I think I will. Repaso de Basic 1.",
    }),
    mistake("m5g13-15", "Luis practice English right after dinner every day.", "practice", "practices", {
      en: "Luis = he: practices.",
      es: "Luis = he: practices, con -s. Repaso de Basic 2.",
    }, DETECTIVE),
    mistake("m5g13-16", "Kat didn't asked about the weekend.", "asked", "ask", {
      en: "didn't + base form: didn't ask.",
      es: "didn't + forma base: didn't ask. Repaso de Basic 3.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("m5g13-17", "Where do you spend your weekends? ___ my parents' house, ___ the beach.", "¿Dónde pasas los fines de semana? En casa de mis papás, cerca de la playa.", ["At / near", "In / next", "On / near", "At / close"], 0, {
      en: "at my parents' house, near the beach.",
      es: "at para la casa de alguien; near para cerca de.",
    }),
    mc("m5g13-18", "I spend my weekends at my ___ house.", "Paso mis fines de semana en casa de mis papás.", ["parents'", "parents", "parent's", "parents's"], 0, {
      en: "Plural possessive: parents' house.",
      es: "Posesivo plural: parents' house. El apóstrofo va después de la s cuando son los dos papás.",
    }),
    mistake("m5g13-19", "Kat asked I about my weekend.", "I", "me", {
      en: "Object pronoun after the verb: asked me.",
      es: "Después del verbo va me, no I: asked me. I es solo sujeto.",
    }, DETECTIVE),
    mistake("m5g13-20", "I painted the wall and after I cleaned the brushes.", "after", "then", {
      en: "then, not after, to say what happened next.",
      es: "then para decir qué pasó después. after solo no funciona como «después»; necesita algo detrás (after that, after dinner).",
    }, DETECTIVE),
  ],
};
