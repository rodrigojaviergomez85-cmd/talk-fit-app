import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 4 · Día 15 — Interview Challenge (reto de la semana 3).
 * Historia: la entrevista de Dylan para su primer trabajo, con Kat de reclutadora.
 * 6 ancla · 6 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Dylan escribió sus respuestas para practicar. Toca el error antes de la entrevista.";
const CHISME = "Kat mezcló las tarjetas de la entrevista. Ordena la frase.";

export const MIXED_TENSES_DAY_15: GrammarQuiz = {
  moduleId: "mixed-tenses",
  day: 15,
  title: { en: "Dylan's First Interview", es: "La primera entrevista de Dylan" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("m5g15-1", "Kat: Tell me about yourself. · Dylan: I'm a hard worker. I ___ English on my own.", "Kat: Háblame de ti. · Dylan: Soy trabajador. Aprendí inglés por mi cuenta.", ["learned", "learn", "am learning", "will learn"], 0, {
      en: "Something finished in the past: learned.",
      es: "Algo que ya pasó: learned. Ya lo aprendió.",
    }),
    mc("m5g15-2", "Kat: What ___ before this? · Dylan: I ___ computers at a small shop for two years.", "Kat: ¿Qué hacías antes de esto? · Dylan: Arreglaba computadoras en una tienda pequeña durante dos años.", ["did you do / fixed", "do you do / fix", "did you do / fix", "are you doing / fixed"], 0, {
      en: "before this: did you do / fixed.",
      es: "before this: did you do, y la respuesta fixed. Pasado en los dos lados.",
    }),
    mc("m5g15-3", "Kat: What ___ in your free time? · Dylan: I ___ English and I ___ in the park.", "Kat: ¿Qué haces en tu tiempo libre? · Dylan: Practico inglés y corro en el parque.", ["do you do / practice / run", "did you do / practiced / ran", "do you do / practices / runs", "are you doing / practice / run"], 0, {
      en: "free time = routine: do you do / practice / run.",
      es: "free time es rutina: do you do, practice, run. Presente, sin -s para I.",
    }),
    mistake("m5g15-4", "Where do you see yourself in two years? I see myself lead a team.", "lead", "leading", {
      en: "see myself + -ing: leading.",
      es: "see myself + verbo con -ing: leading a team.",
    }, DETECTIVE),
    mistake("m5g15-5", "I fixed computers at a small shop during two years.", "during", "for", {
      en: "for two years.",
      es: "for + cantidad de tiempo: for two years. «During two years» es calco.",
    }, DETECTIVE),
    rearrange(
      "m5g15-6",
      ["English", "every day", "speaking", "I see myself"],
      ["I see myself", "speaking", "English", "every day"],
      { en: "I see myself + verb-ing + object + frequency.", es: "I see myself + verbo con -ing + objeto + frecuencia." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("m5g15-7", "Kat: Where ___ you ___ last year? · Dylan: I ___ at my uncle's shop.", "Kat: ¿Dónde trabajaste el año pasado? · Dylan: Trabajé en la tienda de mi tío.", ["did / work / worked", "do / work / work", "did / worked / worked", "were / work / worked"], 0, {
      en: "last year: Where did you work? I worked.",
      es: "last year: Where did you work? I worked. did + base, y en la respuesta worked.",
    }),
    mc("m5g15-8", "Kat: ___ you ___ to study more English? · Dylan: Yes, I'm going to take a course in January.", "Kat: ¿Vas a estudiar más inglés? · Dylan: Sí, voy a tomar un curso en enero.", ["Are / going", "Do / going", "Did / go", "Are / go"], 0, {
      en: "Are you going to study?",
      es: "Are you going to study? Pregunta de plan.",
    }),
    mc("m5g15-9", "Kat: What ___ your uncle ___? · Dylan: He ___ a repair shop.", "Kat: ¿A qué se dedica tu tío? · Dylan: Tiene un taller de reparaciones.", ["does / do / has", "did / do / has", "does / does / has", "do / do / have"], 0, {
      en: "What does your uncle do? He has.",
      es: "What does your uncle do? He has. Does para he; el verbo en base; en la respuesta, -s.",
    }),
    mistake("m5g15-10", "Dylan fix computers at his uncle's shop last year.", "fix", "fixed", {
      en: "last year: fixed.",
      es: "last year: fixed, pasado.",
    }, DETECTIVE),
    rearrange(
      "m5g15-11",
      ["before this?", "did", "What", "do", "you"],
      ["What", "did", "you", "do", "before this?"],
      { en: "What + did + you + do + before this.", es: "What + did + you + do + before this. El do del final es el verbo hacer." },
      CHISME,
    ),
    rearrange(
      "m5g15-12",
      ["a course", "is going to", "in January", "Dylan", "take"],
      ["Dylan", "is going to", "take", "a course", "in January"],
      { en: "Subject + is going to + verb + object + when.", es: "Sujeto + is going to + verbo + objeto + cuándo." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("m5g15-13", "Kat: ___ you nervous right now? · Dylan: A little, but I ___ ready.", "Kat: ¿Estás nervioso ahora? · Dylan: Un poco, pero estoy listo.", ["Are / am", "Were / was", "Do / do", "Are / was"], 0, {
      en: "right now: Are you? I am.",
      es: "right now: Are you nervous? I am ready. Presente de be. Repaso de Basic 2.",
    }),
    mc("m5g15-14", "Dylan: When Kat called me, I ___ a computer for a customer.", "Dylan: Cuando Kat me llamó, estaba arreglando una computadora para un cliente.", ["was fixing", "fixed", "fix", "am fixing"], 0, {
      en: "In progress when she called: was fixing.",
      es: "En progreso cuando llamó: was fixing. Repaso de Basic 3.",
    }),
    mistake("m5g15-15", "Dylan don't have experience in a big company.", "don't", "doesn't", {
      en: "Dylan = he: doesn't.",
      es: "Dylan = he: doesn't. Repaso de Basic 2.",
    }, DETECTIVE),
    mistake("m5g15-16", "I think I will getting the job.", "getting", "get", {
      en: "will + base verb: will get.",
      es: "will + verbo base: will get. Nunca will + -ing. Repaso de Basic 1.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("m5g15-17", "I fixed computers ___ a small shop ___ my neighborhood.", "Arreglaba computadoras en una tienda pequeña en mi barrio.", ["at / in", "in / at", "on / in", "at / on"], 0, {
      en: "at a shop (workplace), in my neighborhood (area).",
      es: "at a shop: el lugar de trabajo. in my neighborhood: dentro de la zona.",
    }),
    mc("m5g15-18", "I'm ___ hard worker and I learned English on my ___.", "Soy trabajador y aprendí inglés por mi cuenta.", ["a / own", "an / own", "a / self", "the / own"], 0, {
      en: "a hard worker; on my own.",
      es: "a hard worker: sonido de consonante. on my own: por mi cuenta, expresión fija.",
    }),
    mistake("m5g15-19", "I practice English with mine friends on weekends.", "mine", "my", {
      en: "my + noun: my friends. mine goes alone.",
      es: "my + sustantivo: my friends. mine va solo, sin sustantivo (the book is mine).",
    }, DETECTIVE),
    mistake("m5g15-20", "I want this job because it is close of my house.", "of", "to", {
      en: "close to my house.",
      es: "close to: cerca de. «Close of» es calco de «cerca de».",
    }, DETECTIVE),
  ],
};
