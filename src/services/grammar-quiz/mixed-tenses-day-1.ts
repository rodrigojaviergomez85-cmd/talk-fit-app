import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 4 · Día 1 — Yesterday, Today & Tomorrow.
 * Historia: la semana de Vale en tres tiempos, contada a Camila.
 * Mezcla equilibrada: 6 ancla (las frases del día) · 6 transferencia (el mismo
 * mix con otras personas) · 4 repaso Basic 1-3 (didn't, was/were, presente
 * progresivo, Did) · 4 básicos (at/on/in, a/the, this/these, every).
 */
const DETECTIVE = "Vale escribió su semana en el chat. Toca el error antes de que lo mande.";
const CHISME = "Camila lo contó en desorden. Ordena la frase.";

export const MIXED_TENSES_DAY_1: GrammarQuiz = {
  moduleId: "mixed-tenses",
  day: 1,
  title: { en: "Three Days, Three Tenses", es: "Tres días, tres tiempos" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("m5g1-1", "Yesterday, I ___ my whole apartment.", "Ayer limpié todo mi apartamento.", ["cleaned", "clean", "am cleaning", "am going to clean"], 0, {
      en: "Yesterday: cleaned.",
      es: "Yesterday manda pasado: cleaned. La palabra de tiempo decide el verbo.",
    }),
    mc("m5g1-2", "Every day, I ___ a little bit.", "Todos los días limpio un poquito.", ["clean", "cleaned", "cleaning", "am going to clean"], 0, {
      en: "Every day: clean (present, routine).",
      es: "Every day es rutina: clean, presente simple, sin -s para I.",
    }),
    mc("m5g1-3", "Tomorrow, I ___ the kitchen.", "Mañana voy a limpiar la cocina.", ["am going to clean", "cleaned", "clean", "was cleaning"], 0, {
      en: "Tomorrow: am going to clean.",
      es: "Tomorrow es plan: am going to clean.",
    }),
    mistake("m5g1-4", "Last night, I cook pasta for dinner.", "cook", "cooked", {
      en: "Last night: cooked.",
      es: "Last night pide pasado: cooked.",
    }, DETECTIVE),
    mistake("m5g1-5", "Yesterday was busy, but today are calm.", "are", "is", {
      en: "today is (singular).",
      es: "today is: singular. Ayer was, hoy is.",
    }, DETECTIVE),
    rearrange(
      "m5g1-6",
      ["is going to be", "a great day", "Tomorrow"],
      ["Tomorrow", "is going to be", "a great day"],
      { en: "Tomorrow + is going to be + noun.", es: "Tomorrow + is going to be + sustantivo." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("m5g1-7", "Camila: Yesterday my brother ___ the car. Every Saturday he ___ it.", "Camila: Ayer mi hermano lavó el carro. Todos los sábados lo lava.", ["washed / washes", "washes / washed", "washed / wash", "wash / washes"], 0, {
      en: "Yesterday: washed. Every Saturday: washes (-s).",
      es: "Yesterday: washed. Every Saturday: washes, con -s para he.",
    }),
    mc("m5g1-8", "Vale: Usually I ___ simple meals, but this weekend I ___ for my friends.", "Vale: Normalmente cocino comidas simples, pero este fin de semana voy a cocinar para mis amigos.", ["cook / am going to cook", "cooked / cook", "cook / cooked", "am cooking / cook"], 0, {
      en: "Usually: cook. This weekend (plan): am going to cook.",
      es: "Usually: cook, rutina. This weekend es un plan: am going to cook.",
    }),
    mc("m5g1-9", "Camila's mom ___ the house yesterday, and tomorrow she ___ the garden.", "La mamá de Camila limpió la casa ayer, y mañana va a limpiar el jardín.", ["cleaned / is going to clean", "cleans / cleaned", "cleaned / cleans", "is cleaning / cleaned"], 0, {
      en: "yesterday: cleaned. tomorrow: is going to clean.",
      es: "yesterday: cleaned. tomorrow: is going to clean, tercera persona.",
    }),
    mistake("m5g1-10", "Every morning my dad drink coffee before work.", "drink", "drinks", {
      en: "my dad = he: drinks.",
      es: "my dad = he: drinks, con -s. Rutina en tercera persona.",
    }, DETECTIVE),
    rearrange(
      "m5g1-11",
      ["cooked", "Camila", "for her family", "Last night,"],
      ["Last night,", "Camila", "cooked", "for her family"],
      { en: "Time + subject + past verb + who for.", es: "Tiempo + sujeto + verbo en pasado + para quién." },
      CHISME,
    ),
    rearrange(
      "m5g1-12",
      ["is going to", "the kitchen", "Dani", "paint", "next week"],
      ["Dani", "is going to", "paint", "the kitchen", "next week"],
      { en: "Subject + is going to + verb + object + when.", es: "Sujeto + is going to + verbo + objeto + cuándo." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("m5g1-13", "Vale: Yesterday I ___ the bathroom. I was too tired.", "Vale: Ayer no limpié el baño. Estaba muy cansada.", ["didn't clean", "don't clean", "didn't cleaned", "not cleaned"], 0, {
      en: "Negative past: didn't clean.",
      es: "Negativo en pasado: didn't clean. Repaso de Basic 3.",
    }),
    mc("m5g1-14", "Camila: ___ you cook last night? · Vale: Yes, I did.", "Camila: ¿Cocinaste anoche? · Vale: Sí.", ["Did", "Do", "Were", "Are"], 0, {
      en: "Past question: Did you cook?",
      es: "Pregunta en pasado: Did you cook? Repaso de Basic 3.",
    }),
    mistake("m5g1-15", "Right now I cleaning the living room.", "cleaning", "am cleaning", {
      en: "Right now: I am cleaning.",
      es: "Right now: I am cleaning. Falta el am del presente progresivo. Repaso de Basic 2.",
    }, DETECTIVE),
    mistake("m5g1-16", "Yesterday at eight I were cooking dinner.", "were", "was", {
      en: "I was cooking.",
      es: "I was cooking. Con I es was. Repaso de Basic 3.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("m5g1-17", "I cleaned the kitchen ___ Saturday ___ the morning.", "Limpié la cocina el sábado en la mañana.", ["on / in", "in / on", "at / in", "on / at"], 0, {
      en: "on Saturday, in the morning.",
      es: "on con el día, in con la parte del día.",
    }),
    mc("m5g1-18", "Tomorrow I'm going to buy ___ new sofa for ___ living room.", "Mañana voy a comprar un sofá nuevo para la sala.", ["a / the", "the / a", "a / a", "an / the"], 0, {
      en: "a new sofa (one, not specific), the living room (the one in my house).",
      es: "a new sofa: uno cualquiera. the living room: la sala de mi casa, ya se sabe cuál.",
    }),
    mistake("m5g1-19", "I washed this dishes after dinner.", "this", "these", {
      en: "dishes is plural: these dishes.",
      es: "dishes es plural: these dishes.",
    }, DETECTIVE),
    mistake("m5g1-20", "Every days I practice English for twenty minutes.", "days", "day", {
      en: "every + singular: every day.",
      es: "every + singular: every day. «Every days» es calco de «todos los días».",
    }, DETECTIVE),
  ],
};
