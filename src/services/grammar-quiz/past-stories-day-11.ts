import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 3 · Día 11 — At Home Last Night (pasado progresivo: was / were + -ing).
 * Historia del día: la casa de Vale a las ocho de la noche.
 * Mezcla: 10 pasado progresivo · 5 repaso Basic 1 y 2 (presente simple en
 * primera y tercera persona, will en primera persona) · 5 básicos
 * (preposiciones de lugar, there was / there were, these).
 * 8 ancla · 8 transferencia · 4 trampas.
 */
const DETECTIVE = "Vale describió su casa en el chat. Toca el error antes de que lo mande.";
const CHISME = "Camila lo contó en desorden. Ordena la frase.";

export const PAST_STORIES_DAY_11: GrammarQuiz = {
  moduleId: "past-stories",
  day: 11,
  title: { en: "Vale's House at Eight", es: "La casa de Vale a las ocho" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("m3g11-1", "At eight last night, my mom ___ dinner.", "A las ocho anoche, mi mamá estaba cocinando la cena.", ["was cooking", "cooked", "is cooking", "were cooking"], 0, {
      en: "An action in progress at a moment in the past: was cooking.",
      es: "Una acción en progreso en un momento del pasado: was cooking. cooked dice que terminó; was cooking dice que estaba en eso.",
    }),
    mc("m3g11-2", "My dad ___ TV on the sofa.", "Mi papá estaba viendo tele en el sofá.", ["was watching", "were watching", "watching", "was watch"], 0, {
      en: "he was + watching.",
      es: "he was + watching. Siempre was/were + verbo con -ing.",
    }),
    mc("m3g11-3", "We ___ dinner in the kitchen.", "Estábamos cenando en la cocina.", ["was eating", "were eating", "eating", "ate eating"], 1, {
      en: "we were + eating.",
      es: "we were + eating. were es para you, we, they.",
    }),
    mc("m3g11-4", "The dog ___ under the table.", "El perro estaba durmiendo debajo de la mesa.", ["was sleeping", "were sleeping", "slept sleeping", "is sleeping"], 0, {
      en: "the dog = it: was sleeping.",
      es: "the dog = it: was sleeping. Anoche, no ahora: was, no is.",
    }),
    mistake("m3g11-5", "My sister were talking on the phone.", "were", "was", {
      en: "my sister = she: was talking.",
      es: "my sister = she: was talking. were es para plural.",
    }, DETECTIVE),
    mistake("m3g11-6", "Someone was clean the kitchen.", "clean", "cleaning", {
      en: "was + cleaning. The -ing is not optional.",
      es: "was + cleaning. Con was/were el verbo siempre lleva -ing.",
    }, DETECTIVE),
    rearrange(
      "m3g11-7",
      ["was doing", "A child", "homework", "at the table"],
      ["A child", "was doing", "homework", "at the table"],
      { en: "Subject + was doing + object + place.", es: "Sujeto + was doing + objeto + lugar." },
      CHISME,
    ),
    rearrange(
      "m3g11-8",
      ["something different", "was doing", "Everyone"],
      ["Everyone", "was doing", "something different"],
      { en: "Everyone is singular: was doing.", es: "Everyone es singular: was doing, aunque sean muchas personas." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("m3g11-9", "Every night my mom ___ dinner at seven, but last night she ___ at eight.", "Todas las noches mi mamá cocina a las siete, pero anoche estaba cocinando a las ocho.", ["cooks / was cooking", "cook / was cooking", "cooks / were cooking", "cooked / cooks"], 0, {
      en: "Every night = routine, she cooks. Last night at eight = in progress, was cooking.",
      es: "Every night es rutina: she cooks, con -s (Basic 2). Last night at eight es acción en progreso: was cooking.",
    }),
    mc("m3g11-10", "Vale: I usually ___ at night, but last night I ___ TV with my dad.", "Vale: Normalmente estudio de noche, pero anoche estaba viendo tele con mi papá.", ["study / was watching", "studies / was watching", "study / were watching", "studied / watch"], 0, {
      en: "I usually study (present, no -s for I). Last night I was watching.",
      es: "I usually study: presente sin -s para I. Last night I was watching: pasado progresivo.",
    }),
    mc("m3g11-11", "Camila ___ to Vale when the pizza arrived.", "Camila estaba hablando con Vale cuando llegó la pizza.", ["was talking", "talks", "were talking", "is talking"], 0, {
      en: "Camila = she: was talking.",
      es: "Camila = she: was talking. La pizza llegó (arrived) en medio de esa acción.",
    }),
    mistake("m3g11-12", "My mom always cook dinner at seven.", "cook", "cooks", {
      en: "Routine with she: cooks.",
      es: "Rutina con she: cooks, con -s. Repaso de Basic 2: siempre, todos los días, normalmente.",
    }, DETECTIVE),
    mistake("m3g11-13", "The kids was playing in the living room.", "was", "were", {
      en: "the kids = they: were playing.",
      es: "the kids = they: were playing. Plural lleva were.",
    }, DETECTIVE),
    rearrange(
      "m3g11-14",
      ["at nine", "were", "the news", "watching", "My parents"],
      ["My parents", "were", "watching", "the news", "at nine"],
      { en: "Subject + were + verb-ing + object + time.", es: "Sujeto + were + verbo con -ing + objeto + hora." },
      CHISME,
    ),
    rearrange(
      "m3g11-15",
      ["wash", "tonight", "I'll", "the dishes"],
      ["I'll", "wash", "the dishes", "tonight"],
      { en: "A decision or promise right now: I'll + base verb.", es: "Una decisión o promesa en el momento: I'll + verbo base. Repaso de Basic 1: I'll do it." },
      CHISME,
    ),
    mc("m3g11-16", "The dog was ___ the table and the cat was ___ the sofa.", "El perro estaba debajo de la mesa y el gato estaba en el sofá.", ["under / on", "on / under", "in / at", "under / in"], 0, {
      en: "under the table, on the sofa.",
      es: "under = debajo de; on = sobre, encima. El gato está on the sofa, no in.",
    }),

    // ── Trampas ────────────────────────────────────────────────────────────
    mc("m3g11-17", "___ a lot of noise in the house last night.", "Había mucho ruido en la casa anoche.", ["There was", "There were", "It was", "There is"], 0, {
      en: "noise is uncountable: there was.",
      es: "noise no se cuenta: there was. There were es para plural (there were three dogs).",
    }),
    mistake("m3g11-18", "My dad was watching TV in the sofa.", "in", "on", {
      en: "on the sofa.",
      es: "on the sofa: sentado sobre el sofá. «In the sofa» es calco de «en el sofá».",
    }, DETECTIVE),
    mistake("m3g11-19", "My brother was playing with this cars.", "this", "these", {
      en: "cars is plural: these cars.",
      es: "cars es plural: these cars.",
    }, DETECTIVE),
    mistake("m3g11-20", "Last night at eight I am watching a movie.", "am", "was", {
      en: "Last night: I was watching.",
      es: "Last night es pasado: I was watching. am watching es ahora mismo. Mezclar los dos es el error más común de la semana.",
    }, DETECTIVE),
  ],
};
