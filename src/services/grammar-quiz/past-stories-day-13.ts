import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 3 · Día 13 — At the Park Yesterday (pasado progresivo: describir una escena).
 * Historia del día: el domingo de Beto y Dylan en el parque.
 * Mezcla: 10 pasado progresivo · 5 repaso Basic 1 y 2 (going to en primera y
 * tercera persona, presente simple con -s y sin -s) · 5 básicos (on the grass,
 * near, under, there were, those).
 * 8 ancla · 8 transferencia · 4 trampas.
 */
const DETECTIVE = "Beto describió el parque en su tarea. Toca el error antes de que la entregue.";
const CHISME = "Dylan lo contó en desorden. Ordena la frase.";

export const PAST_STORIES_DAY_13: GrammarQuiz = {
  moduleId: "past-stories",
  day: 13,
  title: { en: "Sunday at the Park", es: "Domingo en el parque" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("m3g13-1", "A boy ___ on the grass.", "Un niño estaba corriendo en el pasto.", ["was running", "were running", "runs", "running"], 0, {
      en: "a boy = he: was running.",
      es: "a boy = he: was running. Describimos la escena de ayer, en progreso.",
    }),
    mc("m3g13-2", "Two children ___ with a ball.", "Dos niños estaban jugando con una pelota.", ["was playing", "were playing", "playing", "played playing"], 1, {
      en: "two children = they: were playing.",
      es: "two children = they: were playing. children ya es plural (no lleva -s).",
    }),
    mc("m3g13-3", "A man ___ a book on a bench.", "Un hombre estaba leyendo un libro en una banca.", ["was reading", "were reading", "is reading", "read reading"], 0, {
      en: "he was reading.",
      es: "he was reading. Ayer: was, no is.",
    }),
    mc("m3g13-4", "A family ___ outside, near the trees.", "Una familia estaba comiendo afuera, cerca de los árboles.", ["was eating", "were eating", "eating", "eats"], 0, {
      en: "a family is singular: was eating.",
      es: "a family es singular en inglés: was eating. Aunque sean varias personas, la palabra family es una.",
    }),
    mistake("m3g13-5", "A dog were running near the path.", "were", "was", {
      en: "a dog = it: was running.",
      es: "a dog = it: was running. were es para plural.",
    }, DETECTIVE),
    mistake("m3g13-6", "Someone was ride a bicycle.", "ride", "riding", {
      en: "was + riding.",
      es: "was + riding. Con was/were el verbo lleva -ing. ride pierde la e: riding.",
    }, DETECTIVE),
    rearrange(
      "m3g13-7",
      ["together", "were talking", "Two people", "on a bench"],
      ["Two people", "were talking", "together", "on a bench"],
      { en: "Subject + were talking + together + place.", es: "Sujeto + were talking + together + lugar." },
      CHISME,
    ),
    rearrange(
      "m3g13-8",
      ["the afternoon", "Everyone", "was enjoying"],
      ["Everyone", "was enjoying", "the afternoon"],
      { en: "Everyone + was enjoying.", es: "Everyone + was enjoying. Singular." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("m3g13-9", "Beto: Next Sunday I ___ my bike to the park.", "Beto: El próximo domingo voy a llevar mi bici al parque.", ["am going to bring", "was bringing", "bring", "brought"], 0, {
      en: "A plan for next Sunday: am going to bring.",
      es: "Un plan para el próximo domingo: am going to bring. Repaso de Basic 1: I'm going to + verbo.",
    }),
    mc("m3g13-10", "Dylan's dog ___ every Sunday, but yesterday it ___ under a tree.", "El perro de Dylan corre todos los domingos, pero ayer estaba durmiendo debajo de un árbol.", ["runs / was sleeping", "run / was sleeping", "runs / were sleeping", "ran / sleeps"], 0, {
      en: "Every Sunday = runs (routine, -s). Yesterday = was sleeping (in progress).",
      es: "Every Sunday es rutina: runs, con -s. Yesterday: was sleeping, en progreso. Las dos en la misma frase.",
    }),
    mc("m3g13-11", "Beto: My cousin ___ to the park with us next weekend.", "Beto: Mi prima va a venir al parque con nosotros el próximo fin de semana.", ["is going to come", "was coming", "comes", "came"], 0, {
      en: "Her plan: is going to come.",
      es: "Su plan: is going to come. Repaso de Basic 1: he's going to play soccer, she's going to make breakfast.",
    }),
    mistake("m3g13-12", "Dylan and Beto was playing soccer at four.", "was", "were", {
      en: "Dylan and Beto = they: were playing.",
      es: "Dylan and Beto = they: were playing. Dos personas, were.",
    }, DETECTIVE),
    mistake("m3g13-13", "Beto usually walk to the park on Sundays.", "walk", "walks", {
      en: "Beto = he: walks.",
      es: "Beto = he: walks, con -s. Rutina en presente, tercera persona.",
    }, DETECTIVE),
    rearrange(
      "m3g13-14",
      ["under a tree", "were sitting", "and talking", "The girls"],
      ["The girls", "were sitting", "and talking", "under a tree"],
      { en: "Subject + were sitting and talking + place.", es: "Sujeto + were sitting and talking + lugar. Dos acciones con un solo were." },
      CHISME,
    ),
    rearrange(
      "m3g13-15",
      ["every Sunday", "I", "to the park", "go"],
      ["I", "go", "to the park", "every Sunday"],
      { en: "Routine with I: I go (no -s).", es: "Rutina con I: I go, sin -s. La -s es solo para he, she, it." },
      CHISME,
    ),
    mc("m3g13-16", "___ a lot of people at the park yesterday.", "Había mucha gente en el parque ayer.", ["There were", "There was", "It was", "There are"], 0, {
      en: "people is plural: there were.",
      es: "people es plural en inglés: there were a lot of people. Y ayer: were, no are.",
    }),

    // ── Trampas ────────────────────────────────────────────────────────────
    mc("m3g13-17", "A dog was running ___ the path and a boy was sitting ___ the grass.", "Un perro estaba corriendo cerca del camino y un niño estaba sentado en el pasto.", ["near / on", "next / in", "near / in", "under / at"], 0, {
      en: "near the path, on the grass.",
      es: "near the path (cerca del camino) y on the grass (sobre el pasto). «In the grass» es calco de «en el pasto».",
    }),
    mistake("m3g13-18", "Look at that kids playing with the ball.", "that", "those", {
      en: "kids is plural: those kids.",
      es: "kids es plural: those kids. that es para uno solo.",
    }, DETECTIVE),
    mistake("m3g13-19", "Next Sunday I am go to bring my dog.", "go", "going", {
      en: "I am going to bring. going to, never go to, after am/is/are.",
      es: "I am going to bring. Después de am/is/are es going to, nunca go to. Repaso de Basic 1.",
    }, DETECTIVE),
    mistake("m3g13-20", "The children was very happy yesterday.", "was", "were", {
      en: "the children = they: were.",
      es: "the children = they: were. children es plural aunque no termine en -s.",
    }, DETECTIVE),
  ],
};
