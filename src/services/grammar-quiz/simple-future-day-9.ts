import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 1 · Día 9 — Two different people: Maria is / Carlos is / they're · isn't.
 * 8 ancla · 4 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Rosa escribió los planes de María y Carlos. Toca la palabra equivocada.";
const CHISME = "Rosa dijo la frase en desorden. Ordénala.";

export const SIMPLE_FUTURE_DAY_9: GrammarQuiz = {
  moduleId: "simple-future",
  day: 9,
  title: { en: "Two Different People", es: "Dos personas diferentes" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("sfg9-1", "Maria and Carlos ___ going to have different weekends.", "María y Carlos van a tener fines de semana diferentes.", ["are", "is", "am"], 0, {
      en: "two people: are.",
      es: "Dos personas → are going to.",
    }),
    mc("sfg9-2", "Maria ___ going to study for an exam.", "María va a estudiar para un examen.", ["is", "are", "am"], 0, {
      en: "Maria = she: is.",
      es: "Maria → is going to.",
    }),
    mc("sfg9-3", "She ___ going to go out with friends.", "No va a salir con amigos.", ["isn't", "aren't", "doesn't"], 0, {
      en: "she isn't going to.",
      es: "isn't going to: no va a.",
    }),
    mc("sfg9-4", "___ going to see each other on Monday.", "Se van a ver el lunes.", ["They're", "Their", "They"], 0, {
      en: "They're = They are.",
      es: "They're going to = They are going to.",
    }),
    mistake("sfg9-5", "Carlos are going to travel to the beach.", "are", "is", {
      en: "Carlos = he: is.",
      es: "Carlos → is going to.",
    }, DETECTIVE),
    mistake("sfg9-6", "He's going to pack her suitcase tonight.", "her", "his", {
      en: "he → his.",
      es: "Carlos → his suitcase: su (de él).",
    }, DETECTIVE),
    rearrange(
      "sfg9-7",
      ["all Saturday", "stay at home", "She's going to"],
      ["She's going to", "stay at home", "all Saturday"],
      { en: "She's going to + verb + time.", es: "She's going to + verbo + tiempo." },
      CHISME,
    ),
    rearrange(
      "sfg9-8",
      ["this weekend", "He isn't going to", "study"],
      ["He isn't going to", "study", "this weekend"],
      { en: "He isn't going to + verb + time.", es: "He isn't going to + verbo + tiempo." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("sfg9-9", "Rosa and I ___ going to have the same weekend.", "Rosa y yo vamos a tener el mismo fin de semana.", ["are", "am", "is"], 0, {
      en: "Rosa and I = we: are.",
      es: "Rosa and I = we → are going to.",
    }),
    mc("sfg9-10", "I ___ going to travel this weekend. I'm going to study.", "No voy a viajar este fin de semana. Voy a estudiar.", ["am not", "isn't", "don't"], 0, {
      en: "I am not going to.",
      es: "I am not going to: I no lleva isn't.",
    }),
    mistake("sfg9-11", "My friends is going to go to the beach on Saturday.", "is", "are", {
      en: "friends: are.",
      es: "my friends = they → are going to.",
    }, DETECTIVE),
    rearrange(
      "sfg9-12",
      ["is going to", "for an exam", "My cousin", "study"],
      ["My cousin", "is going to", "study", "for an exam"],
      { en: "Subject + is going to + verb + for what.", es: "Sujeto + is going to + verbo + para qué." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("sfg9-13", "Maria is my friend. ___ is 23 and ___ favorite color is blue.", "María es mi amiga. Tiene 23 y su color favorito es el azul.", ["She / her", "Her / she", "She / his"], 0, {
      en: "She is; her favorite.",
      es: "she antes del verbo, her antes del sustantivo.",
    }),
    mc("sfg9-14", "First, my boss is going to finish a report. ___ she's going to call a client.", "Primero mi jefa va a terminar un informe. Luego va a llamar a un cliente.", ["Then", "After", "Next to"], 0, {
      en: "Then: next step.",
      es: "Then: luego. Repaso del día 8.",
    }),
    mistake("sfg9-15", "Carlos and Maria has 23 years old.", "has", "are", {
      en: "They are 23.",
      es: "La edad va con be: Carlos and Maria are 23.",
    }, DETECTIVE),
    mistake("sfg9-16", "Maria study English at the university.", "study", "studies", {
      en: "she studies.",
      es: "Maria = she → studies.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("sfg9-17", "___ an exam on Monday.", "Hay un examen el lunes.", ["There is", "There are", "It is"], 0, {
      en: "one exam: there is.",
      es: "there is: hay, una cosa.",
    }),
    mc("sfg9-18", "How ___ time does Maria need to study? · Two hours.", "¿Cuánto tiempo necesita estudiar María? · Dos horas.", ["much", "many", "long"], 0, {
      en: "How much + time.",
      es: "How much time: el tiempo no se cuenta.",
    }),
    mistake("sfg9-19", "Carlos wants go to the beach every weekend.", "wants", "wants to", {
      en: "wants to go.",
      es: "wants to + verbo.",
    }, DETECTIVE),
    mistake("sfg9-20", "Maria is going to study at the library in Saturday.", "in", "on", {
      en: "on Saturday.",
      es: "on con los días.",
    }, DETECTIVE),
  ],
};
