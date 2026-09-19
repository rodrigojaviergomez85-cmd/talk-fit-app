import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 3 · Día 18 — The Wolf (while / when · said, asked, told · ran, arrived).
 * Historia del día: el lobo aparece, y Mateo hace de lobo en clase.
 * Mezcla: 10 pasado del cuento · 5 repaso Basic 1 y 2 (going to y will en
 * tercera persona, presente simple con -s y doesn't) · 5 básicos (him / her,
 * that / those, at / to, a / the).
 * 8 ancla · 8 transferencia · 4 trampas.
 */
const DETECTIVE = "Mateo escribió la parte del lobo. Toca el error antes de que la actúe.";
const CHISME = "Mateo contó la parte del lobo en desorden. Ordena la frase.";

export const PAST_STORIES_DAY_18: GrammarQuiz = {
  moduleId: "past-stories",
  day: 18,
  title: { en: "Enter the Wolf", es: "Entra el lobo" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("m3g18-1", "She ___ through the forest when she ___ a wolf.", "Iba caminando por el bosque cuando vio un lobo.", ["was walking / saw", "walked / was seeing", "was walking / see", "walks / saw"], 0, {
      en: "was walking (in progress) + saw (the moment).",
      es: "was walking, en progreso, + saw, el momento. El lobo aparece en pasado simple.",
    }),
    mc("m3g18-2", "The wolf ___ where she was going.", "El lobo preguntó a dónde iba.", ["asked", "asks", "was ask", "ask"], 0, {
      en: "ask + ed = asked.",
      es: "ask + ed = asked.",
    }),
    mc("m3g18-3", "She ___ him about her grandmother.", "Ella le contó sobre su abuela.", ["told", "said", "tell", "tells"], 0, {
      en: "tell + person: told him. said would need no him.",
      es: "tell + persona: told him. said no lleva persona directa (said that ...).",
    }),
    mc("m3g18-4", "The wolf ___ an idea and ___ away.", "El lobo tuvo una idea y se fue corriendo.", ["had / ran", "has / runs", "had / run", "have / ran"], 0, {
      en: "have → had, run → ran.",
      es: "have → had, run → ran. Los dos irregulares.",
    }),
    mistake("m3g18-5", "He say goodbye and ran to the house.", "say", "said", {
      en: "say → said.",
      es: "say → said. Las dos acciones en pasado: said ... and ran.",
    }, DETECTIVE),
    mistake("m3g18-6", "The wolf arrived to the house first.", "to", "at", {
      en: "arrive at a place.",
      es: "arrive at: llegar a un lugar. «Arrive to» es calco de «llegar a».",
    }, DETECTIVE),
    rearrange(
      "m3g18-7",
      ["the wolf", "was running", "While she was walking,"],
      ["While she was walking,", "the wolf", "was running"],
      { en: "While + one long action, + the other long action.", es: "While + una acción larga, + la otra acción larga. Las dos con was porque pasan al mismo tiempo." },
      CHISME,
    ),
    rearrange(
      "m3g18-8",
      ["to her", "The wolf", "talked"],
      ["The wolf", "talked", "to her"],
      { en: "talk to someone.", es: "talk to someone: hablar con alguien. Y her, no she, después de to." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("m3g18-9", "Mateo: The wolf ___ to the house first. I know this story.", "Mateo: El lobo va a llegar a la casa primero. Me sé este cuento.", ["is going to get", "got", "was getting", "get"], 0, {
      en: "A prediction with evidence (he knows the story): is going to get.",
      es: "Predicción con evidencia (se sabe el cuento): is going to get. Tercera persona, repaso de Basic 1.",
    }),
    mc("m3g18-10", "Kat: A wolf ___ meat. It ___ eat flowers.", "Kat: Un lobo come carne. No come flores.", ["eats / doesn't", "eat / doesn't", "eats / don't", "ate / didn't"], 0, {
      en: "A general fact: eats (-s), doesn't eat.",
      es: "Un hecho general, en presente: eats, con -s, y doesn't eat. Repaso de Basic 2, tercera persona.",
    }),
    mc("m3g18-11", "Dylan: Don't worry. The woodsman ___ them at the end.", "Dylan: Tranquilos. El leñador los va a salvar al final.", ["will save", "saved", "was saving", "saves"], 0, {
      en: "A prediction about the ending: will save.",
      es: "Una predicción sobre el final: will save. Tercera persona, repaso de Basic 1.",
    }),
    mistake("m3g18-12", "The wolf asked she about the basket.", "she", "her", {
      en: "asked her. Object pronoun after the verb.",
      es: "asked her. Después del verbo va her (objeto), no she (sujeto).",
    }, DETECTIVE),
    mistake("m3g18-13", "Mateo always play the wolf in class.", "play", "plays", {
      en: "Mateo = he: plays.",
      es: "Mateo = he: plays, con -s. Presente, rutina, tercera persona.",
    }, DETECTIVE),
    rearrange(
      "m3g18-14",
      ["saw", "when she", "She", "a wolf", "was picking flowers"],
      ["She", "was picking flowers", "when she", "saw", "a wolf"],
      { en: "was doing + when + simple past.", es: "was doing + when + pasado simple. El fondo largo, luego la interrupción corta." },
      CHISME,
    ),
    rearrange(
      "m3g18-15",
      ["but my brother does", "scary stories,", "I don't like"],
      ["I don't like", "scary stories,", "but my brother does"],
      { en: "I don't (first person) ... my brother does (third person).", es: "I don't, primera persona, ... my brother does, tercera. Repaso de Basic 2 en una sola frase." },
      CHISME,
    ),
    mc("m3g18-16", "The wolf ran ___ the house and waited ___ the door.", "El lobo corrió a la casa y esperó en la puerta.", ["to / at", "at / to", "to / on", "in / at"], 0, {
      en: "ran to (direction), waited at (position).",
      es: "ran to: corrió hacia; waited at: esperó en un punto. to es dirección, at es lugar.",
    }),

    // ── Trampas ────────────────────────────────────────────────────────────
    mc("m3g18-17", "The wolf ___ her that the flowers were beautiful.", "El lobo le dijo que las flores eran hermosas.", ["told", "said", "says", "tells"], 0, {
      en: "told her. said her does not exist.",
      es: "told her. «Said her» es calco de «le dijo». say va con lo dicho (said that); tell va con la persona (told her).",
    }),
    mistake("m3g18-18", "The wolf said her that he was a friend.", "said", "told", {
      en: "told her. tell + person.",
      es: "told her. tell + persona. say no lleva la persona justo después.",
    }, DETECTIVE),
    mistake("m3g18-19", "Look at that teeth! What big teeth you have!", "that", "those", {
      en: "teeth is plural: those teeth.",
      es: "teeth es plural (tooth → teeth): those teeth. that es para uno.",
    }, DETECTIVE),
    mistake("m3g18-20", "While she was walking, the wolf run to the house.", "run", "ran", {
      en: "run → ran. The story is in the past.",
      es: "run → ran. El cuento va en pasado; run es presente.",
    }, DETECTIVE),
  ],
};
