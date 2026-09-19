import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 3 · Día 20 — Tell the Story (reto final del mes).
 * Historia del día: la clase cuenta el cuento completo, y Kat pregunta qué
 * harían ellos. Todo el mes en un solo examen: pasado simple, pasado
 * progresivo, when / while, conectores; repaso de Basic 1 y 2 en primera y
 * tercera persona (presente simple, don't / doesn't, going to, will, presente
 * progresivo); y básicos (preposiciones, this / that / these / those, a / the,
 * posesivo 's, edad con be).
 * 8 ancla · 8 transferencia · 4 trampas.
 */
const DETECTIVE = "La clase escribió el cuento entre todos. Toca el error antes de que Kat lo lea.";
const CHISME = "Kat mezcló las tarjetas del cuento. Ordena la frase.";

export const PAST_STORIES_DAY_20: GrammarQuiz = {
  moduleId: "past-stories",
  day: 20,
  title: { en: "The Whole Story", es: "El cuento completo" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("m3g20-1", "One day, a girl ___ her grandmother.", "Un día, una niña visitó a su abuela.", ["visited", "visits", "was visit", "visit"], 0, {
      en: "One day: visited (simple past).",
      es: "One day: visited, pasado simple. Así empieza un cuento.",
    }),
    mc("m3g20-2", "First, her mother ___ her a basket of food.", "Primero, su mamá le dio una canasta de comida.", ["gave", "gives", "given", "give"], 0, {
      en: "give → gave.",
      es: "give → gave. First: primer paso.",
    }),
    mc("m3g20-3", "While she ___ through the forest, she ___ a wolf.", "Mientras caminaba por el bosque, vio un lobo.", ["was walking / saw", "walked / was seeing", "was walking / sees", "walks / saw"], 0, {
      en: "While + was walking (long) + saw (short).",
      es: "While + was walking, la acción larga, + saw, la corta. La regla de la semana 3 dentro del cuento de la semana 4.",
    }),
    mc("m3g20-4", "The wolf ___ to her and ___ to the house.", "El lobo le habló y corrió a la casa.", ["talked / ran", "talks / runs", "talked / run", "was talk / ran"], 0, {
      en: "talked (regular) + ran (irregular).",
      es: "talked, regular, + ran, irregular. Los dos en pasado.",
    }),
    mistake("m3g20-5", "After that, the girl arrive at the house.", "arrive", "arrived", {
      en: "arrive + d = arrived.",
      es: "arrive + d = arrived. After that no cambia el tiempo: sigue en pasado.",
    }, DETECTIVE),
    mistake("m3g20-6", "Suddenly, she notice something strange.", "notice", "noticed", {
      en: "notice + d = noticed.",
      es: "notice + d = noticed. Suddenly marca el momento; el verbo va en pasado simple.",
    }, DETECTIVE),
    rearrange(
      "m3g20-7",
      ["everyone was safe", "helped them", "a woodsman", "Finally,", "and"],
      ["Finally,", "a woodsman", "helped them", "and", "everyone was safe"],
      { en: "Finally, + who + did what + and + result.", es: "Finally, + quién + qué hizo + and + resultado. Finally cierra el cuento." },
      CHISME,
    ),
    rearrange(
      "m3g20-8",
      ["a wolf", "she saw", "While she was walking,"],
      ["While she was walking,", "she saw", "a wolf"],
      { en: "While + long action, + short action.", es: "While + acción larga, + acción corta." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("m3g20-9", "Kat: What do you do when you see a dog on the street? · Dylan: I ___ calm. My sister ___; she runs.", "Kat: ¿Qué hacen cuando ven un perro en la calle? · Dylan: Yo me quedo tranquilo. Mi hermana no; ella corre.", ["stay / doesn't", "stays / doesn't", "stay / don't", "stayed / didn't"], 0, {
      en: "I stay (no -s). My sister doesn't (-s form of the negative).",
      es: "I stay, sin -s. My sister doesn't, la forma de tercera persona. Primera y tercera en la misma respuesta. Repaso de Basic 2.",
    }),
    mc("m3g20-10", "Kat: And you, Mateo? · Mateo: If I see a wolf, I ___ the police. I promise.", "Kat: ¿Y vos, Mateo? · Mateo: Si veo un lobo, llamo a la policía. Lo prometo.", ["will call", "called", "was calling", "calls"], 0, {
      en: "A promise: I'll call.",
      es: "Una promesa: I'll call. Primera persona, repaso de Basic 1: I promise I'll ...",
    }),
    mc("m3g20-11", "Kat: Next week we ___ a new story, and Mateo ___ the wolf again.", "Kat: La próxima semana vamos a leer un cuento nuevo, y Mateo va a hacer de lobo otra vez.", ["are going to read / is going to be", "were reading / was", "read / is", "are reading / was going to be"], 0, {
      en: "Plans: we are going to read, Mateo is going to be.",
      es: "Planes: we are going to read, Mateo is going to be. Primera persona plural y tercera. Repaso de Basic 1.",
    }),
    mistake("m3g20-12", "Right now the class are reading the last page.", "are", "is", {
      en: "the class is singular: is reading.",
      es: "the class es singular en inglés: is reading. Presente progresivo, ahora mismo.",
    }, DETECTIVE),
    mistake("m3g20-13", "Dylan don't like scary stories.", "don't", "doesn't", {
      en: "Dylan = he: doesn't.",
      es: "Dylan = he: doesn't. Repaso de Basic 2, tercera persona.",
    }, DETECTIVE),
    rearrange(
      "m3g20-14",
      ["the phone rang", "when", "I", "was reading the story"],
      ["I", "was reading the story", "when", "the phone rang"],
      { en: "was doing + when + simple past.", es: "was doing + when + pasado simple." },
      CHISME,
    ),
    rearrange(
      "m3g20-15",
      ["will read", "the story", "Tomorrow", "Ana", "to her son"],
      ["Tomorrow", "Ana", "will read", "the story", "to her son"],
      { en: "Tomorrow + subject + will + verb + object + who.", es: "Tomorrow + sujeto + will + verbo + objeto + a quién. Tercera persona, repaso de Basic 1." },
      CHISME,
    ),
    mc("m3g20-16", "The wolf was ___ the bed, and the basket was ___ the table, ___ the window.", "El lobo estaba en la cama, y la canasta estaba sobre la mesa, cerca de la ventana.", ["in / on / near", "on / in / near", "in / in / at", "at / on / in"], 0, {
      en: "in the bed, on the table, near the window.",
      es: "in the bed (dentro, tapado), on the table (encima), near the window (cerca). Tres preposiciones de lugar en una escena.",
    }),

    // ── Trampas ────────────────────────────────────────────────────────────
    mc("m3g20-17", "Little Red Riding Hood ___ seven years old, and her grandmother ___ seventy.", "Caperucita tiene siete años y su abuela tiene setenta.", ["is / is", "has / has", "is / has", "have / is"], 0, {
      en: "Age with be: is seven, is seventy.",
      es: "La edad con be: is seven, is seventy. «Has seven years» es calco de «tiene siete años».",
    }),
    mistake("m3g20-18", "The wolf said the girl that the forest was safe.", "said", "told", {
      en: "told the girl. tell + person.",
      es: "told the girl. Con la persona justo después va tell. «Said the girl» es calco de «le dijo a la niña».",
    }, DETECTIVE),
    mistake("m3g20-19", "Her grandmother house was in the forest.", "grandmother", "grandmother's", {
      en: "Possessive: her grandmother's house.",
      es: "Posesivo: her grandmother's house. Sin el 's, grandmother house no dice de quién es la casa.",
    }, DETECTIVE),
    mistake("m3g20-20", "Those was the end of the story.", "Those", "That", {
      en: "the end is singular: that was the end.",
      es: "the end es singular: That was the end. those es para plural. Y el verbo was ya lo decía.",
    }, DETECTIVE),
  ],
};
