import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 3 · Día 3 — After Work Yesterday (went, watched, did · negativo con didn't).
 * 8 ancla · 8 transferencia · 4 trampas.
 */
export const PAST_STORIES_DAY_3: GrammarQuiz = {
  moduleId: "past-stories",
  day: 3,
  title: { en: "After Work Yesterday", es: "Después del trabajo ayer" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("m3g3-1", "I ___ home after work.", "Me fui a casa después del trabajo.", ["go", "goes", "went", "gone"], 2, {
      en: "go → went. gone is the participle.",
      es: "go → went. gone es el participio (have gone).",
    }),
    mc("m3g3-2", "I ___ some TV in the evening.", "Vi algo de tele en la noche.", ["watch", "watched", "watches", "watching"], 1, {
      en: "watch + ed = watched.",
      es: "watch + ed = watched.",
    }),
    mc("m3g3-3", "I ___ a few things around the house.", "Hice algunas cosas en la casa.", ["do", "did", "done", "does"], 1, {
      en: "do → did. done is the participle.",
      es: "do → did. done es el participio (have done).",
    }),
    mc("m3g3-4", "I ___ to bed around ten thirty.", "Me fui a la cama como a las diez y media.", ["go", "went", "gone", "going"], 1, {
      en: "go to bed → went to bed.",
      es: "go to bed → went to bed.",
    }),
    mistake("m3g3-5", "I eat dinner at home last night.", "eat", "ate", {
      en: "last night needs the past: ate.",
      es: "Con last night el verbo va en pasado: ate.",
    }),
    mistake("m3g3-6", "I talk to a friend on the phone after dinner.", "talk", "talked", {
      en: "The story is in the past: talked.",
      es: "La historia va en pasado: talked. Sin la -ed suena a rutina, no a ayer.",
    }),
    rearrange(
      "m3g3-7",
      ["on the phone", "to a friend", "talked", "I", "after dinner"],
      ["I", "talked", "to a friend", "on the phone", "after dinner"],
      { en: "Subject, verb, who, how, when.", es: "Sujeto, verbo, con quién, por dónde, cuándo." },
    ),
    rearrange(
      "m3g3-8",
      ["a relaxing evening", "I", "had", "Overall,"],
      ["Overall,", "I", "had", "a relaxing evening"],
      { en: "Overall opens the sentence.", es: "Overall abre la oración." },
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("m3g3-9", "My parents ___ to church on Sunday evening.", "Mis papás fueron a la iglesia el domingo en la noche.", ["go", "goes", "went", "gone"], 2, {
      en: "go → went, with they too.",
      es: "go → went, también con they. El pasado no cambia de persona.",
    }),
    mc("m3g3-10", "We ___ a movie and ___ popcorn.", "Vimos una película y comimos palomitas.", ["watch / eat", "watched / ate", "watched / eated", "watching / ate"], 1, {
      en: "Both verbs in the past: watched (regular), ate (irregular).",
      es: "Los dos en pasado: watched (regular), ate (irregular). Una frase puede mezclar los dos tipos.",
    }),
    mc("m3g3-11", "My brother ___ his homework before dinner.", "Mi hermano hizo su tarea antes de cenar.", ["do", "does", "did", "done"], 2, {
      en: "do → did.",
      es: "do → did. Does es presente de he/she; en pasado es did para todos.",
    }),
    mistake("m3g3-12", "She didn't watched the game last night.", "watched", "watch", {
      en: "After didn't, base form: didn't watch.",
      es: "Después de didn't el verbo va en forma base: didn't watch.",
    }),
    mistake("m3g3-13", "We goed to the mall after work.", "goed", "went", {
      en: "go → went. No -ed on go.",
      es: "go → went. go nunca lleva -ed.",
    }),
    rearrange(
      "m3g3-14",
      ["didn't", "TV", "watch", "I", "last night"],
      ["I", "didn't", "watch", "TV", "last night"],
      { en: "Subject + didn't + base verb + object + time.", es: "Sujeto + didn't + verbo base + objeto + tiempo." },
    ),
    rearrange(
      "m3g3-15",
      ["to bed", "went", "early", "My mom", "because", "she was tired"],
      ["My mom", "went", "to bed", "early", "because", "she was tired"],
      { en: "Main action, then because + reason.", es: "Acción principal, luego because + razón." },
    ),
    rearrange(
      "m3g3-16",
      ["at home", "we", "stayed", "and", "cooked", "Last night,"],
      ["Last night,", "we", "stayed", "at home", "and", "cooked"],
      { en: "Time, subject, verb, place, and + second verb.", es: "Tiempo, sujeto, verbo, lugar, and + segundo verbo." },
    ),

    // ── Trampas ────────────────────────────────────────────────────────────
    mc("m3g3-17", "I ___ go out last night. I was too tired.", "No salí anoche. Estaba muy cansado.", ["don't", "didn't", "no", "wasn't"], 1, {
      en: "Negative past action: didn't + go.",
      es: "Acción negativa en pasado: didn't + go. wasn't es para adjetivos (I wasn't tired), no para verbos de acción.",
    }),
    mistake("m3g3-18", "I went to home after the game.", "to", "back", {
      en: "go home has no to: I went home / I went back home.",
      es: "go home no lleva to: I went home, o I went back home. «Went to home» es calco de «fui a casa».",
    }),
    mistake("m3g3-19", "We talked in the phone for an hour.", "in", "on", {
      en: "on the phone, not in the phone.",
      es: "En inglés es on the phone. «In the phone» es calco de «en el teléfono».",
    }),
    mistake("m3g3-20", "Yesterday night I went to bed late.", "Yesterday", "Last", {
      en: "We say last night, not yesterday night.",
      es: "Se dice last night, no yesterday night. Yesterday va solo con morning y afternoon.",
    }),
  ],
};
