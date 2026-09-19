import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 4 · Día 3 — What I Did Yesterday (pasado regular · secuencia).
 * Historia: la tarde productiva de Luis, contada al Boss.
 * 6 ancla · 6 transferencia · 4 repaso (presente, futuro) · 4 básicos.
 */
const DETECTIVE = "Luis escribió su tarde en el reporte. Toca el error antes de que lo mande.";
const CHISME = "Kat lo contó en desorden. Ordena la frase.";

export const MIXED_TENSES_DAY_3: GrammarQuiz = {
  moduleId: "mixed-tenses",
  day: 3,
  title: { en: "Luis's Productive Evening", es: "La tarde productiva de Luis" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("m5g3-1", "Yesterday after work, I ___ the living room.", "Ayer después del trabajo limpié la sala.", ["cleaned", "clean", "am cleaning", "cleaning"], 0, {
      en: "Yesterday: cleaned.",
      es: "Yesterday: cleaned, pasado regular.",
    }),
    mc("m5g3-2", "Then I ___ rice and chicken for dinner.", "Luego cociné arroz con pollo para la cena.", ["cooked", "cook", "cooks", "am going to cook"], 0, {
      en: "Then continues the past: cooked.",
      es: "Then sigue en pasado: cooked.",
    }),
    mc("m5g3-3", "I ___ my old bike in the garage.", "Arreglé mi bici vieja en el garaje.", ["fixed", "fix", "fixes", "fixing"], 0, {
      en: "fix + ed = fixed.",
      es: "fix + ed = fixed.",
    }),
    mistake("m5g3-4", "After dinner, I wash all the dishes.", "wash", "washed", {
      en: "Still yesterday: washed.",
      es: "Seguimos en ayer: washed. No se vuelve al presente a mitad de la historia.",
    }, DETECTIVE),
    mistake("m5g3-5", "I invited my neighbor for a coffee and we enjoy a long conversation.", "enjoy", "enjoyed", {
      en: "Both verbs in the past: invited ... enjoyed.",
      es: "Los dos verbos en pasado: invited ... enjoyed.",
    }, DETECTIVE),
    rearrange(
      "m5g3-6",
      ["a productive evening", "It", "was"],
      ["It", "was", "a productive evening"],
      { en: "It was + noun phrase.", es: "It was + frase nominal. Así se cierra el resumen de un día." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("m5g3-7", "Kat: Yesterday my roommate ___ the kitchen and ___ a cake.", "Kat: Ayer mi compañera de casa limpió la cocina y horneó un pastel.", ["cleaned / baked", "cleans / bakes", "cleaned / bakes", "clean / baked"], 0, {
      en: "Both in the past: cleaned, baked.",
      es: "Las dos en pasado: cleaned, baked. Misma persona, mismo día.",
    }),
    mc("m5g3-8", "Boss: How long ___ you practice English last night? · Luis: Twenty minutes.", "Boss: ¿Cuánto tiempo practicaste inglés anoche? · Luis: Veinte minutos.", ["did", "do", "were", "was"], 0, {
      en: "Past question: did you practice.",
      es: "Pregunta en pasado: How long did you practice?",
    }),
    mc("m5g3-9", "Luis: My neighbor ___ me for lunch on Sunday, and we ___ for two hours.", "Luis: Mi vecino me invitó a almorzar el domingo, y hablamos dos horas.", ["invited / talked", "invites / talk", "invited / talk", "invite / talked"], 0, {
      en: "on Sunday (last Sunday): invited, talked.",
      es: "on Sunday, el domingo pasado: invited, talked.",
    }),
    mistake("m5g3-10", "Kat fix her bike last weekend too.", "fix", "fixed", {
      en: "last weekend: fixed.",
      es: "last weekend: fixed. Kat es she, pero en pasado no importa: fixed para todos.",
    }, DETECTIVE),
    rearrange(
      "m5g3-11",
      ["for forty minutes", "practiced", "Luis", "English", "Last night,"],
      ["Last night,", "Luis", "practiced", "English", "for forty minutes"],
      { en: "Time + subject + verb + object + how long.", es: "Tiempo + sujeto + verbo + objeto + cuánto tiempo." },
      CHISME,
    ),
    rearrange(
      "m5g3-12",
      ["the dishes", "Then", "washed", "she", "and cleaned the table"],
      ["Then", "she", "washed", "the dishes", "and cleaned the table"],
      { en: "Then + subject + two past actions.", es: "Then + sujeto + dos acciones en pasado." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("m5g3-13", "Luis: Every evening I ___ English, but yesterday I ___ for longer.", "Luis: Todas las tardes practico inglés, pero ayer practiqué más tiempo.", ["practice / practiced", "practiced / practice", "practices / practiced", "practice / practices"], 0, {
      en: "Every evening: practice. Yesterday: practiced.",
      es: "Every evening: practice, rutina. Yesterday: practiced. Repaso de Basic 2 y 3 en una frase.",
    }),
    mc("m5g3-14", "Boss: ___ you going to fix the printer tomorrow? · Luis: Yes, I am.", "Boss: ¿Vas a arreglar la impresora mañana? · Luis: Sí.", ["Are", "Do", "Did", "Will"], 0, {
      en: "Are you going to ...?",
      es: "Are you going to ...? Pregunta con going to. Repaso de Basic 1.",
    }),
    mistake("m5g3-15", "Luis's neighbor don't drink coffee at night.", "don't", "doesn't", {
      en: "the neighbor = he: doesn't.",
      es: "the neighbor = he: doesn't. Repaso de Basic 2.",
    }, DETECTIVE),
    mistake("m5g3-16", "Tomorrow I going to fix my sister's bike.", "going", "am going", {
      en: "I am going to fix.",
      es: "I am going to fix. Falta el am. Repaso de Basic 1.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("m5g3-17", "I fixed my bike ___ the garage and read ___ the sofa.", "Arreglé mi bici en el garaje y leí en el sofá.", ["in / on", "on / in", "at / at", "in / in"], 0, {
      en: "in the garage, on the sofa.",
      es: "in the garage: dentro. on the sofa: encima.",
    }),
    mc("m5g3-18", "I invited ___ neighbor for ___ coffee.", "Invité a mi vecino a un café.", ["my / a", "the / the", "a / my", "my / an"], 0, {
      en: "my neighbor, a coffee.",
      es: "my neighbor: el mío. a coffee: un café, sonido de consonante.",
    }),
    mistake("m5g3-19", "I washed all the dish after dinner.", "dish", "dishes", {
      en: "all the dishes: plural.",
      es: "all the dishes: plural. all pide plural o algo que no se cuenta.",
    }, DETECTIVE),
    mistake("m5g3-20", "I practiced English during twenty minutes.", "during", "for", {
      en: "for + length of time: for twenty minutes.",
      es: "for + cantidad de tiempo. «During twenty minutes» es calco de «durante veinte minutos».",
    }, DETECTIVE),
  ],
};
