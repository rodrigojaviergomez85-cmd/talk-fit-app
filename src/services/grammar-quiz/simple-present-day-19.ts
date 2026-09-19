import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 2 · Día 19 — At home: is / are + -ing · cooking, cleaning, sleeping.
 * 8 ancla · 4 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Ana escribió lo que pasa en su casa. Toca la palabra equivocada.";
const CHISME = "Ana dijo la frase en desorden. Ordénala.";

export const SIMPLE_PRESENT_DAY_19: GrammarQuiz = {
  moduleId: "simple-present",
  day: 19,
  title: { en: "At Home", es: "En casa" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("spg19-1", "A woman is ___ in the kitchen.", "Una mujer está cocinando en la cocina.", ["cooking", "cook", "cooks"], 0, {
      en: "is + cooking.",
      es: "is + cooking: está cocinando.",
    }),
    mc("spg19-2", "A man ___ cleaning the floor.", "Un hombre está limpiando el piso.", ["is", "are", "am"], 0, {
      en: "a man = he: is.",
      es: "A man → is cleaning.",
    }),
    mc("spg19-3", "A child is doing ___ homework.", "Un niño está haciendo su tarea.", ["his", "her", "he"], 0, {
      en: "a child (boy) → his.",
      es: "El niño → his homework.",
    }),
    mc("spg19-4", "The cat is ___ on the floor.", "El gato está durmiendo en el piso.", ["sleeping", "sleep", "sleeps"], 0, {
      en: "is + sleeping.",
      es: "is + sleeping: está durmiendo.",
    }),
    mistake("spg19-5", "Someone is watch TV on the sofa.", "watch", "watching", {
      en: "is watching.",
      es: "is + watching: falta el -ing.",
    }, DETECTIVE),
    mistake("spg19-6", "A woman are eating at the table.", "are", "is", {
      en: "a woman = she: is.",
      es: "A woman → is eating.",
    }, DETECTIVE),
    rearrange(
      "spg19-7",
      ["the dishes", "is washing", "Another woman"],
      ["Another woman", "is washing", "the dishes"],
      { en: "Subject + is + verb-ing + object.", es: "Sujeto + is + verbo-ing + objeto." },
      CHISME,
    ),
    rearrange(
      "spg19-8",
      ["at home", "is doing something", "Everyone"],
      ["Everyone", "is doing something", "at home"],
      { en: "Everyone + is + verb-ing + place.", es: "Everyone + is + verbo-ing + lugar." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("spg19-9", "I ___ cooking dinner right now.", "Estoy cocinando la cena ahora mismo.", ["am", "is", "are"], 0, {
      en: "I am + -ing.",
      es: "I → am cooking.",
    }),
    mc("spg19-10", "My brothers ___ cleaning the floor.", "Mis hermanos están limpiando el piso.", ["are", "is", "am"], 0, {
      en: "they are.",
      es: "my brothers = they → are.",
    }),
    mistake("spg19-11", "My dad is sleep on the sofa.", "sleep", "sleeping", {
      en: "is sleeping.",
      es: "is + sleeping: falta el -ing.",
    }, DETECTIVE),
    rearrange(
      "spg19-12",
      ["her homework", "at the table", "My sister is doing"],
      ["My sister is doing", "her homework", "at the table"],
      { en: "Subject + is + verb-ing + object + place.", es: "Sujeto + is + verbo-ing + objeto + lugar." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("spg19-13", "My mom ___ dinner every night. Right now she ___ pasta.", "Mi mamá cocina la cena cada noche. Ahora mismo está cocinando pasta.", ["cooks / is cooking", "is cooking / cooks", "cook / cooking"], 0, {
      en: "routine: cooks; now: is cooking.",
      es: "Rutina → cooks; ahora → is cooking.",
    }),
    mc("spg19-14", "A woman ___ talking on the phone and two people ___ having a meeting.", "Una mujer está hablando por teléfono y dos personas están en una reunión.", ["is / are", "are / is", "is / is"], 0, {
      en: "a woman is; two people are.",
      es: "Uno → is; plural → are. Repaso del día 18.",
    }),
    mistake("spg19-15", "Tonight my mom are going to cook pasta.", "are", "is", {
      en: "my mom = she: is.",
      es: "my mom → is going to. Repaso de Basic 1.",
    }, DETECTIVE),
    mistake("spg19-16", "Ana have a cat and a dog.", "have", "has", {
      en: "she has.",
      es: "Ana = she → has.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("spg19-17", "___ a sofa in the living room.", "Hay un sofá en la sala.", ["There is", "There are", "It is"], 0, {
      en: "one sofa: there is.",
      es: "there is: hay, una cosa.",
    }),
    mc("spg19-18", "How ___ people are at home right now? · Six.", "¿Cuántas personas están en casa ahora? · Seis.", ["many", "much", "long"], 0, {
      en: "How many + people.",
      es: "How many con personas.",
    }),
    mistake("spg19-19", "I need clean the kitchen tonight.", "need", "need to", {
      en: "need to clean.",
      es: "need to + verbo.",
    }, DETECTIVE),
    mistake("spg19-20", "The cat is sleeping in the floor.", "in", "on", {
      en: "on the floor.",
      es: "on the floor: en el piso.",
    }, DETECTIVE),
  ],
};
