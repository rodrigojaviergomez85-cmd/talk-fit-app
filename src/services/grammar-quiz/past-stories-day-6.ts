import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 3 · Día 6 — My Mom Yesterday (pasado en tercera persona: she).
 * Historia del día: el sábado largo de la mamá de Vale.
 * Mezcla: 10 pasado de la semana · 3 repaso Basic 2 (presente con -s, doesn't)
 * · 5 básicos (preposiciones de tiempo, these/those, posesivo 's, edad con be)
 * · organizados en 8 ancla, 8 transferencia, 4 trampas.
 */
const DETECTIVE = "Vale escribió esto sobre su mamá. Toca el error antes de que lo publique.";
const CHISME = "Vale lo contó en desorden. Ordena la frase.";

export const PAST_STORIES_DAY_6: GrammarQuiz = {
  moduleId: "past-stories",
  day: 6,
  title: { en: "Mom's Long Saturday", es: "El sábado largo de mamá" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("m3g6-1", "Yesterday my mom ___ up at five.", "Ayer mi mamá se despertó a las cinco.", ["wakes", "woke", "woken", "waking"], 1, {
      en: "wake → woke. Same form for she.",
      es: "wake → woke. En pasado es igual para she: no lleva -s.",
    }),
    mc("m3g6-2", "She ___ very busy in the morning.", "Ella estaba muy ocupada en la mañana.", ["is", "was", "were", "did"], 1, {
      en: "she was.",
      es: "she was. did no va con adjetivos.",
    }),
    mc("m3g6-3", "She ___ breakfast for everyone.", "Ella hizo el desayuno para todos.", ["make", "makes", "made", "making"], 2, {
      en: "make → made.",
      es: "make → made. makes es presente (todos los días); made es ayer.",
    }),
    mc("m3g6-4", "She ___ lunch at home. She ate at the market.", "Ella no almorzó en casa. Comió en el mercado.", ["didn't eat", "didn't ate", "don't eat", "doesn't eat"], 0, {
      en: "Negative past: didn't + base verb.",
      es: "Negativo en pasado: didn't + verbo base. El pasado ya está en didn't.",
    }),
    mistake("m3g6-5", "She go to the market around eight.", "go", "went", {
      en: "The story is yesterday: went.",
      es: "La historia es de ayer: went. go sin cambiar suena a rutina.",
    }, DETECTIVE),
    mistake("m3g6-6", "She came home in the afternoon and cook dinner.", "cook", "cooked", {
      en: "Both verbs in the past: came ... and cooked.",
      es: "Los dos verbos en pasado: came ... and cooked. No se cambia a presente a mitad de frase.",
    }, DETECTIVE),
    rearrange(
      "m3g6-7",
      ["very busy", "in the morning", "My mom", "was"],
      ["My mom", "was", "very busy", "in the morning"],
      { en: "Subject + was + adjective + time.", es: "Sujeto + was + adjetivo + tiempo." },
      CHISME,
    ),
    rearrange(
      "m3g6-8",
      ["had", "she", "a long day", "Overall,"],
      ["Overall,", "she", "had", "a long day"],
      { en: "Overall opens the sentence; she had.", es: "Overall abre la oración; she had." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("m3g6-9", "Every Saturday my mom ___ tamales, but yesterday she ___ pupusas.", "Todos los sábados mi mamá hace tamales, pero ayer hizo pupusas.", ["makes / made", "make / made", "made / makes", "makes / make"], 0, {
      en: "Every Saturday = routine: makes. Yesterday = past: made.",
      es: "Every Saturday es rutina: makes (con -s). Yesterday es pasado: made. Las dos en la misma frase.",
    }),
    mc("m3g6-10", "Don Tito ___ by the house and ___ coffee with her.", "Don Tito pasó por la casa y tomó café con ella.", ["stop / drink", "stopped / drank", "stopped / drinked", "stops / drank"], 1, {
      en: "stopped (regular) + drank (irregular).",
      es: "stopped (regular) + drank (irregular). drink nunca lleva -ed.",
    }),
    mc("m3g6-11", "She went to the market ___ seven ___ the morning.", "Ella fue al mercado a las siete de la mañana.", ["at / in", "in / at", "on / in", "at / on"], 0, {
      en: "at + clock time, in + the morning.",
      es: "at con la hora (at seven), in con la parte del día (in the morning).",
    }),
    mistake("m3g6-12", "My mom don't like the new market.", "don't", "doesn't", {
      en: "she doesn't. don't is for I, you, we, they.",
      es: "she doesn't. don't es para I, you, we, they. Esto es presente: a ella no le gusta, hoy también.",
    }, DETECTIVE),
    mistake("m3g6-13", "She bought this tomatoes for the salad.", "this", "these", {
      en: "tomatoes is plural: these tomatoes.",
      es: "tomatoes es plural: these tomatoes. this es para una sola cosa.",
    }, DETECTIVE),
    rearrange(
      "m3g6-14",
      ["stopped by", "and", "At ten,", "drank coffee", "Don Tito"],
      ["At ten,", "Don Tito", "stopped by", "and", "drank coffee"],
      { en: "Time, subject, two past actions joined by and.", es: "Tiempo, sujeto, dos acciones en pasado unidas por and." },
      CHISME,
    ),
    rearrange(
      "m3g6-15",
      ["makes", "coffee for my dad", "Every morning", "she"],
      ["Every morning", "she", "makes", "coffee for my dad"],
      { en: "Routine: every morning + she makes.", es: "Rutina: every morning + she makes, con -s. Esto no es ayer, es todos los días." },
      CHISME,
    ),
    mc("m3g6-16", "That is my ___ apron. She wears it every day.", "Ese es el delantal de mi mamá. Lo usa todos los días.", ["mom", "moms", "mom's", "moms'"], 2, {
      en: "Possessive: my mom's apron.",
      es: "Posesivo: my mom's apron = el delantal de mi mamá. El 's va en la dueña, no en la cosa.",
    }),

    // ── Trampas ────────────────────────────────────────────────────────────
    mc("m3g6-17", "___ your mom rest yesterday? No, she ___.", "¿Tu mamá descansó ayer? No.", ["Did / didn't", "Does / doesn't", "Did / don't", "Do / didn't"], 0, {
      en: "Past question and short answer: Did ... ? No, she didn't.",
      es: "Pregunta y respuesta corta en pasado: Did ... ? No, she didn't. Las dos partes en pasado.",
    }),
    mistake("m3g6-18", "She didn't went to church on Sunday.", "went", "go", {
      en: "After didn't, base form: didn't go.",
      es: "Después de didn't el verbo va en forma base: didn't go. Es el error más común de la semana.",
    }, DETECTIVE),
    mistake("m3g6-19", "She went to the market by foot.", "by", "on", {
      en: "on foot. by is for vehicles: by bus, by car.",
      es: "on foot: a pie. by es para vehículos (by bus, by car). «By foot» es calco de «a pie».",
    }, DETECTIVE),
    mistake("m3g6-20", "My mom has 52 years old.", "has", "is", {
      en: "Age uses be: My mom is 52 years old.",
      es: "La edad se dice con be: My mom is 52 years old. «Has 52 years» es calco de «tiene 52 años».",
    }, DETECTIVE),
  ],
};
