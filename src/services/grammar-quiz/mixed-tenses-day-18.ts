import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 4 · Día 18 — Ask Me Anything (this morning · right now · usually · next Sunday).
 * Historia: Mateo responde preguntas en vivo para el canal de Dani.
 * 6 ancla · 6 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Dani escribió las preguntas del en vivo. Toca el error antes de leerlas.";
const CHISME = "Mateo mezcló las tarjetas. Ordena la frase.";

export const MIXED_TENSES_DAY_18: GrammarQuiz = {
  moduleId: "mixed-tenses",
  day: 18,
  title: { en: "Ask Me Anything", es: "Pregúntame lo que sea" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("m5g18-1", "Dani: What ___ this morning? · Mateo: I ___ late and ___ pancakes.", "Dani: ¿Qué hiciste esta mañana? · Mateo: Dormí hasta tarde e hice panqueques.", ["did you do / slept / made", "do you do / sleep / make", "did you do / sleep / make", "are you doing / slept / made"], 0, {
      en: "this morning (finished): did you do / slept / made.",
      es: "this morning ya pasó: did you do, slept, made. Pasado.",
    }),
    mc("m5g18-2", "Dani: What ___ right now? · Mateo: I ___ to you and ___ coffee.", "Dani: ¿Qué estás haciendo ahora mismo? · Mateo: Estoy hablando contigo y tomando café.", ["are you doing / 'm talking / drinking", "do you do / talk / drink", "did you do / talked / drank", "are you doing / talk / drink"], 0, {
      en: "right now: are you doing / 'm talking and drinking.",
      es: "right now: are you doing, y la respuesta 'm talking and drinking. Presente progresivo.",
    }),
    mc("m5g18-3", "Dani: What ___ on Sundays? · Mateo: I usually ___ my mom and ___ the house.", "Dani: ¿Qué haces normalmente los domingos? · Mateo: Normalmente llamo a mi mamá y limpio la casa.", ["do you usually do / call / clean", "did you do / called / cleaned", "are you doing / call / clean", "do you usually do / calls / cleans"], 0, {
      en: "usually: do you usually do / call / clean.",
      es: "usually: do you usually do, call, clean. Presente simple, sin -s para I.",
    }),
    mistake("m5g18-4", "Next Sunday I going to drive to the lake with my friends.", "going", "am going", {
      en: "I am going to drive.",
      es: "I am going to drive. Falta el am.",
    }, DETECTIVE),
    mistake("m5g18-5", "This morning I sleep late and made pancakes.", "sleep", "slept", {
      en: "This morning (finished): slept.",
      es: "This morning ya pasó: slept. Igual que made, que sí está en pasado.",
    }, DETECTIVE),
    rearrange(
      "m5g18-6",
      ["with my friends", "to the lake", "I'm going to", "drive"],
      ["I'm going to", "drive", "to the lake", "with my friends"],
      { en: "I'm going to + verb + where + who with.", es: "I'm going to + verbo + a dónde + con quién." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("m5g18-7", "Viewer: What ___ Kat ___ right now? · Mateo: She ___ the comments.", "Espectador: ¿Qué está haciendo Kat ahora mismo? · Mateo: Está leyendo los comentarios.", ["is / doing / is reading", "does / do / reads", "did / do / read", "is / do / is reading"], 0, {
      en: "right now, third person: is Kat doing / is reading.",
      es: "right now, tercera persona: What is Kat doing? She is reading.",
    }),
    mc("m5g18-8", "Viewer: What ___ Dani ___ on Sundays? · Mateo: He ___ videos.", "Espectador: ¿Qué hace Dani los domingos? · Mateo: Edita videos.", ["does / do / edits", "did / do / edited", "does / does / edits", "is / doing / edits"], 0, {
      en: "on Sundays (routine): does Dani do / edits.",
      es: "on Sundays, rutina: What does Dani do? He edits, con -s.",
    }),
    mc("m5g18-9", "Viewer: What ___ Mateo ___ this morning? · Dani: He ___ late, as always.", "Espectador: ¿Qué hizo Mateo esta mañana? · Dani: Durmió hasta tarde, como siempre.", ["did / do / slept", "does / do / sleeps", "did / did / slept", "was / do / slept"], 0, {
      en: "this morning: did Mateo do / slept.",
      es: "this morning: What did Mateo do? He slept.",
    }),
    mistake("m5g18-10", "Next Sunday Kat and Dani is going to drive to the lake too.", "is", "are", {
      en: "Kat and Dani = they: are going to.",
      es: "Kat and Dani = they: are going to. Plural.",
    }, DETECTIVE),
    rearrange(
      "m5g18-11",
      ["right now?", "are", "What", "doing", "you"],
      ["What", "are", "you", "doing", "right now?"],
      { en: "What + are + you + doing + right now.", es: "What + are + you + doing + right now." },
      CHISME,
    ),
    rearrange(
      "m5g18-12",
      ["and cleans the house", "his mom", "calls", "On Sundays,", "Mateo"],
      ["On Sundays,", "Mateo", "calls", "his mom", "and cleans the house"],
      { en: "Time + subject + verb-s + object + and + second verb-s.", es: "Tiempo + sujeto + verbo con -s + objeto + and + segundo verbo con -s." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("m5g18-13", "Viewer: What ___ Mateo ___ at nine this morning? · Dani: He was sleeping.", "Espectador: ¿Qué estaba haciendo Mateo a las nueve esta mañana? · Dani: Estaba durmiendo.", ["was / doing", "did / doing", "does / do", "is / doing"], 0, {
      en: "at nine this morning, in progress: was he doing.",
      es: "at nine this morning, en progreso: What was Mateo doing? Repaso de Basic 3.",
    }),
    mc("m5g18-14", "Mateo: I ___ pancakes every day. Only on Saturdays.", "Mateo: No hago panqueques todos los días. Solo los sábados.", ["don't make", "doesn't make", "didn't make", "am not make"], 0, {
      en: "every day, negative: I don't make.",
      es: "every day, negativo: I don't make. Repaso de Basic 2.",
    }),
    mistake("m5g18-15", "Did Mateo made pancakes this morning?", "made", "make", {
      en: "Did + base form: Did Mateo make?",
      es: "Did + forma base: Did Mateo make? Repaso de Basic 3.",
    }, DETECTIVE),
    mistake("m5g18-16", "I think it will rains at the lake on Sunday.", "rains", "rain", {
      en: "will + base verb: will rain.",
      es: "will + verbo base: will rain, sin -s. Repaso de Basic 1.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("m5g18-17", "I'm going to drive ___ the lake ___ Sunday ___ the morning.", "Voy a manejar al lago el domingo en la mañana.", ["to / on / in", "at / in / on", "to / in / at", "in / on / in"], 0, {
      en: "drive to the lake, on Sunday, in the morning.",
      es: "to: dirección. on Sunday: día. in the morning: parte del día.",
    }),
    mc("m5g18-18", "I usually call my mom and clean ___ house. Then I watch ___ movie.", "Normalmente llamo a mi mamá y limpio la casa. Luego veo una película.", ["the / a", "a / the", "the / the", "a / a"], 0, {
      en: "the house (mine, known), a movie (any).",
      es: "the house: la mía, ya se sabe cuál. a movie: una cualquiera.",
    }),
    mistake("m5g18-19", "My roommate and me made pancakes this morning.", "me", "I", {
      en: "Subject: my roommate and I made.",
      es: "Sujeto: my roommate and I made. me es objeto (for my roommate and me); antes del verbo va I.",
    }, DETECTIVE),
    mistake("m5g18-20", "This morning I woke up at nine of the morning.", "of", "in", {
      en: "nine in the morning.",
      es: "nine in the morning. «Nine of the morning» es calco de «nueve de la mañana».",
    }, DETECTIVE),
  ],
};
