import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 3 · Día 17 — The Journey (conectores: first, then, after that, later).
 * Historia del día: Caperucita en el bosque, con Dylan leyendo en voz alta.
 * Mezcla: 10 pasado simple y progresivo con conectores · 5 repaso Basic 1 y 2
 * (presente simple primera y tercera persona, going to en primera persona,
 * will en tercera) · 5 básicos (into / on / near, these, a / the).
 * 8 ancla · 8 transferencia · 4 trampas.
 */
const DETECTIVE = "Dylan copió el cuento en su cuaderno. Toca el error antes de que lo lea.";
const CHISME = "Dylan leyó el cuento en desorden. Ordena la frase.";

export const PAST_STORIES_DAY_17: GrammarQuiz = {
  moduleId: "past-stories",
  day: 17,
  title: { en: "Into the Forest", es: "Hacia el bosque" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("m3g17-1", "First, she ___ her house with the basket.", "Primero, salió de su casa con la canasta.", ["left", "leaves", "leave", "leaving"], 0, {
      en: "leave → left.",
      es: "leave → left. First marca el primer paso del cuento.",
    }),
    mc("m3g17-2", "Then, she ___ into the forest.", "Luego, entró caminando al bosque.", ["walked", "walks", "was walk", "walk"], 0, {
      en: "walk + ed = walked.",
      es: "walk + ed = walked. Then: el paso siguiente.",
    }),
    mc("m3g17-3", "The forest ___ quiet and green.", "El bosque estaba tranquilo y verde.", ["was", "were", "is", "did"], 0, {
      en: "the forest = it: was.",
      es: "the forest = it: was. Describir cómo era algo en el cuento: was + adjetivo.",
    }),
    mc("m3g17-4", "She ___ slowly and ___ at the flowers.", "Iba caminando despacio y mirando las flores.", ["was walking / looking", "walked / looks", "was walking / looked looking", "walks / looking"], 0, {
      en: "Two actions in progress with one was: was walking and looking.",
      es: "Dos acciones en progreso con un solo was: was walking and looking. El segundo verbo también lleva -ing.",
    }),
    mistake("m3g17-5", "After that, she stop near some trees.", "stop", "stopped", {
      en: "stop → stopped. Double p.",
      es: "stop → stopped. Se dobla la p. After that: otro paso del cuento.",
    }, DETECTIVE),
    mistake("m3g17-6", "She didn't walked fast, because she wasn't in a hurry.", "walked", "walk", {
      en: "didn't + base form: didn't walk.",
      es: "didn't + forma base: didn't walk. El pasado ya está en didn't.",
    }, DETECTIVE),
    rearrange(
      "m3g17-7",
      ["on the path", "she", "continued", "Later,"],
      ["Later,", "she", "continued", "on the path"],
      { en: "Later, + subject + verb + place.", es: "Later, + sujeto + verbo + lugar. Later dice que pasó tiempo." },
      CHISME,
    ),
    rearrange(
      "m3g17-8",
      ["was still", "far away", "Her grandmother's house"],
      ["Her grandmother's house", "was still", "far away"],
      { en: "Subject + was still + far away.", es: "Sujeto + was still + far away. still = todavía." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("m3g17-9", "Dylan: I ___ stories like this. My little sister ___ them too.", "Dylan: Me gustan los cuentos así. A mi hermanita también le gustan.", ["like / likes", "likes / likes", "like / like", "liked / likes"], 0, {
      en: "I like (no -s), my sister likes (-s).",
      es: "I like, sin -s; my sister likes, con -s. Primera y tercera persona juntas. Repaso de Basic 2.",
    }),
    mc("m3g17-10", "Little Red Riding Hood: These flowers are beautiful. I ___ some for Grandma.", "Caperucita: Estas flores son hermosas. Voy a cortar algunas para la abuela.", ["am going to pick", "was picking", "picked", "pick"], 0, {
      en: "A plan she makes right there: am going to pick.",
      es: "Un plan que hace en ese momento: am going to pick. Primera persona, repaso de Basic 1.",
    }),
    mc("m3g17-11", "Dylan: I think the wolf ___ her before she arrives.", "Dylan: Creo que el lobo va a encontrarla antes de que llegue.", ["will find", "found", "was finding", "finds"], 0, {
      en: "I think + will: prediction about him.",
      es: "I think + will: predicción sobre él. Tercera persona, repaso de Basic 1: I think she'll find a good job.",
    }),
    mistake("m3g17-12", "First, she picked some flowers, and then she sing a song.", "sing", "sang", {
      en: "sing → sang. Both steps in the past.",
      es: "sing → sang. Los dos pasos van en pasado; no se cambia a presente después de then.",
    }, DETECTIVE),
    mistake("m3g17-13", "My grandmother live near a forest too.", "live", "lives", {
      en: "my grandmother = she: lives.",
      es: "my grandmother = she: lives, con -s. Presente, tercera persona.",
    }, DETECTIVE),
    rearrange(
      "m3g17-14",
      ["she", "a small river", "After that,", "crossed"],
      ["After that,", "she", "crossed", "a small river"],
      { en: "After that, + subject + verb + object.", es: "After that, + sujeto + verbo + objeto." },
      CHISME,
    ),
    rearrange(
      "m3g17-15",
      ["read", "every night", "I", "a story", "to my sister"],
      ["I", "read", "a story", "to my sister", "every night"],
      { en: "Routine with I: I read (no -s) + object + who + when.", es: "Rutina con I: I read, sin -s, + objeto + a quién + cuándo." },
      CHISME,
    ),
    mc("m3g17-16", "She walked ___ the forest and stopped ___ a big tree.", "Entró caminando al bosque y se detuvo cerca de un árbol grande.", ["into / near", "in / next", "to / at", "into / on"], 0, {
      en: "into the forest (entering), near a tree.",
      es: "into the forest: entrar al bosque. near a tree: cerca de un árbol. on sería encima.",
    }),

    // ── Trampas ────────────────────────────────────────────────────────────
    mc("m3g17-17", "___, she left her house. ___, she walked into the forest. ___, she stopped near some trees.", "Primero salió de su casa. Luego entró al bosque. Después de eso, se detuvo cerca de unos árboles.", ["First / Then / After that", "Then / First / After that", "After that / First / Then", "Then / After that / First"], 0, {
      en: "The order of a story: First, Then, After that.",
      es: "El orden del cuento: First, Then, After that. First siempre abre; After that nunca va primero.",
    }),
    mistake("m3g17-18", "She was walking slowly and looking the flowers.", "looking", "looking at", {
      en: "look at something.",
      es: "look at: mirar algo. En inglés look siempre lleva at antes de la cosa. «Looking the flowers» es calco de «mirando las flores».",
    }, DETECTIVE),
    mistake("m3g17-19", "This flowers are for my grandmother.", "This", "These", {
      en: "flowers is plural: these flowers.",
      es: "flowers es plural: these flowers.",
    }, DETECTIVE),
    mistake("m3g17-20", "She walked during two hours.", "during", "for", {
      en: "for + length of time: for two hours.",
      es: "for + cantidad de tiempo: for two hours. during va con un nombre de momento (during the afternoon), no con números. «During two hours» es calco de «durante dos horas».",
    }, DETECTIVE),
  ],
};
