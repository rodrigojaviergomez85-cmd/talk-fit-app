import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 2 · Día 16 — At the park: present progressive · is / are + verbo-ing.
 * 8 ancla · 4 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Andrés escribió lo que ve en el parque. Toca la palabra equivocada.";
const CHISME = "Andrés dijo la frase en desorden. Ordénala.";

export const SIMPLE_PRESENT_DAY_16: GrammarQuiz = {
  moduleId: "simple-present",
  day: 16,
  title: { en: "At the Park", es: "En el parque" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("spg16-1", "A boy ___ running in the park.", "Un niño está corriendo en el parque.", ["is", "are", "am"], 0, {
      en: "a boy = he: is.",
      es: "A boy → is + -ing.",
    }),
    mc("spg16-2", "A woman is ___ her dog.", "Una mujer está paseando a su perro.", ["walking", "walk", "walks"], 0, {
      en: "is + verb-ing.",
      es: "is + walking: está paseando.",
    }),
    mc("spg16-3", "Two children ___ playing soccer.", "Dos niños están jugando fútbol.", ["are", "is", "am"], 0, {
      en: "two children: are.",
      es: "Dos niños → are + -ing.",
    }),
    mc("spg16-4", "A girl is ___ her bike.", "Una niña está andando en bicicleta.", ["riding", "ride", "rides"], 0, {
      en: "is + riding.",
      es: "ride → riding: se quita la e.",
    }),
    mistake("spg16-5", "A man is read a book.", "read", "reading", {
      en: "is reading.",
      es: "is + reading: falta el -ing.",
    }, DETECTIVE),
    mistake("spg16-6", "Two friends is talking.", "is", "are", {
      en: "two friends: are.",
      es: "Two friends → are talking.",
    }, DETECTIVE),
    rearrange(
      "spg16-7",
      ["a picnic", "is having", "A family"],
      ["A family", "is having", "a picnic"],
      { en: "Subject + is + verb-ing + object.", es: "Sujeto + is + verbo-ing + objeto." },
      CHISME,
    ),
    rearrange(
      "spg16-8",
      ["the park", "is enjoying", "Everyone"],
      ["Everyone", "is enjoying", "the park"],
      { en: "Everyone + is + verb-ing + object.", es: "Everyone + is + verbo-ing + objeto." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("spg16-9", "I ___ walking my dog right now.", "Estoy paseando a mi perro ahora mismo.", ["am", "is", "are"], 0, {
      en: "I am + -ing.",
      es: "I → am walking.",
    }),
    mc("spg16-10", "My friends and I ___ playing soccer.", "Mis amigos y yo estamos jugando fútbol.", ["are", "is", "am"], 0, {
      en: "we are.",
      es: "My friends and I = we → are.",
    }),
    mistake("spg16-11", "Andres is sit on a bench.", "sit", "sitting", {
      en: "is sitting.",
      es: "sit → sitting: se dobla la t.",
    }, DETECTIVE),
    rearrange(
      "spg16-12",
      ["a book", "under a tree", "My sister is reading"],
      ["My sister is reading", "a book", "under a tree"],
      { en: "Subject + is + verb-ing + object + place.", es: "Sujeto + is + verbo-ing + objeto + lugar." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("spg16-13", "Every Sunday, a man ___ a book in the park. Today he ___ a newspaper.", "Cada domingo, un hombre lee un libro en el parque. Hoy está leyendo un periódico.", ["reads / is reading", "is reading / reads", "read / reading"], 0, {
      en: "routine: reads; now: is reading.",
      es: "Rutina → reads; ahora → is reading.",
    }),
    mc("spg16-14", "Andres is 30. ___ dog is small and ___ name is Max.", "Andrés tiene 30. Su perro es pequeño y su nombre es Max.", ["His / his", "Her / his", "He / his"], 0, {
      en: "his dog, his name.",
      es: "Andres → his antes del sustantivo.",
    }),
    mistake("spg16-15", "Tomorrow we're going to having a picnic.", "having", "have", {
      en: "going to have.",
      es: "going to + verbo solo. Repaso de Basic 1.",
    }, DETECTIVE),
    mistake("spg16-16", "Andres have a small dog.", "have", "has", {
      en: "he has.",
      es: "Andres = he → has.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("spg16-17", "___ many trees in the park.", "Hay muchos árboles en el parque.", ["There are", "There is", "They are"], 0, {
      en: "many trees: there are.",
      es: "there are: hay, plural.",
    }),
    mc("spg16-18", "How ___ children are playing soccer? · Two.", "¿Cuántos niños están jugando fútbol? · Dos.", ["many", "much", "long"], 0, {
      en: "How many + children.",
      es: "How many con personas.",
    }),
    mistake("spg16-19", "I want walk in the park every morning.", "want", "want to", {
      en: "want to walk.",
      es: "want to + verbo.",
    }, DETECTIVE),
    mistake("spg16-20", "The park is close of my house.", "of", "to", {
      en: "close to my house.",
      es: "close to: cerca de.",
    }, DETECTIVE),
  ],
};
