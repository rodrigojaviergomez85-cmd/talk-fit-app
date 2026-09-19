import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 3 · Día 5 — My Yesterday Challenge (toda la semana: regulares, irregulares,
 * was/were, didn't y preguntas con Did). 8 ancla · 8 transferencia · 4 trampas.
 */
export const PAST_STORIES_DAY_5: GrammarQuiz = {
  moduleId: "past-stories",
  day: 5,
  title: { en: "My Yesterday Challenge", es: "Mi reto de ayer" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("m3g5-1", "Yesterday ___ a normal day for me.", "Ayer fue un día normal para mí.", ["is", "was", "were", "did"], 1, {
      en: "Yesterday (it) was.",
      es: "Yesterday (it) was: singular y pasado.",
    }),
    mc("m3g5-2", "I woke up early and ___ a shower.", "Me desperté temprano y me bañé.", ["take", "took", "taken", "takes"], 1, {
      en: "Both verbs in the past: woke up and took.",
      es: "Los dos verbos en pasado: woke up and took. El segundo verbo también va en pasado.",
    }),
    mc("m3g5-3", "Then, I ___ to work and ___ to a lot of people.", "Luego fui al trabajo y hablé con mucha gente.", ["go / talk", "went / talked", "went / talk", "goed / talked"], 1, {
      en: "went (irregular) and talked (regular). Both past.",
      es: "went (irregular) y talked (regular). Los dos en pasado; el error típico es dejar el segundo en presente.",
    }),
    mc("m3g5-4", "___ you talk to a lot of people yesterday?", "¿Hablaste con mucha gente ayer?", ["Do", "Did", "Were", "Was"], 1, {
      en: "Past question with an action verb: Did you talk.",
      es: "Pregunta en pasado con verbo de acción: Did you talk.",
    }),
    mistake("m3g5-5", "After work, I came home and make dinner.", "make", "made", {
      en: "Second verb in the past too: came ... and made.",
      es: "El segundo verbo también en pasado: came ... and made.",
    }),
    mistake("m3g5-6", "My coworkers was very busy yesterday.", "was", "were", {
      en: "my coworkers = they: were.",
      es: "my coworkers = they: were.",
    }),
    rearrange(
      "m3g5-7",
      ["I", "watched TV", "and", "went to bed", "Later,"],
      ["Later,", "I", "watched TV", "and", "went to bed"],
      { en: "Later, + subject + action + and + action.", es: "Later, + sujeto + acción + and + acción." },
    ),
    rearrange(
      "m3g5-8",
      ["and drank", "ate breakfast", "I", "some coffee"],
      ["I", "ate breakfast", "and drank", "some coffee"],
      { en: "Two past actions joined by and.", es: "Dos acciones en pasado unidas por and." },
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("m3g5-9", "Last Saturday, my cousin ___ me a message and we ___ to the beach.", "El sábado pasado mi primo me mandó un mensaje y fuimos a la playa.", ["send / go", "sent / went", "sended / went", "sent / go"], 1, {
      en: "send → sent, go → went. Both irregular.",
      es: "send → sent, go → went. Los dos irregulares, los dos en pasado.",
    }),
    mc("m3g5-10", "She ___ the bus because she ___ late.", "Ella perdió el bus porque se despertó tarde.", ["missed / woke up", "miss / wakes up", "missed / wakes up", "missing / woke up"], 0, {
      en: "missed (regular) + woke up (irregular).",
      es: "missed (regular) + woke up (irregular). Una frase real mezcla los dos tipos.",
    }),
    mc("m3g5-11", "___ your team happy with the results?", "¿Tu equipo quedó contento con los resultados?", ["Did", "Was", "Were", "Do"], 1, {
      en: "your team = it: Was your team ...? No action verb, no Did.",
      es: "your team = it: Was your team ...? No hay verbo de acción, así que no lleva Did.",
    }),
    mistake("m3g5-12", "We didn't went to the party on Friday.", "went", "go", {
      en: "After didn't, base form: didn't go.",
      es: "Después de didn't el verbo va en forma base: didn't go.",
    }),
    mistake("m3g5-13", "Last week my mom visit my grandmother in Santa Ana.", "visit", "visited", {
      en: "Last week needs the past: visited.",
      es: "Con last week el verbo va en pasado: visited.",
    }),
    rearrange(
      "m3g5-14",
      ["did", "What", "you", "do", "last weekend?"],
      ["What", "did", "you", "do", "last weekend?"],
      { en: "Wh-word + did + subject + base verb.", es: "Palabra wh + did + sujeto + verbo base. do vuelve a la forma base porque did ya lleva el pasado." },
    ),
    rearrange(
      "m3g5-15",
      ["tired", "but", "happy", "we", "were", "After the game,"],
      ["After the game,", "we", "were", "tired", "but", "happy"],
      { en: "Time, subject, were, adjective, but, adjective.", es: "Tiempo, sujeto, were, adjetivo, but, adjetivo." },
    ),
    rearrange(
      "m3g5-16",
      ["didn't", "The customer", "so", "I", "understand", "repeated the question"],
      ["The customer", "didn't", "understand", "so", "I", "repeated the question"],
      { en: "Negative past + so + what you did.", es: "Negativo en pasado + so + lo que hiciste. Muy útil en llamadas." },
    ),

    // ── Trampas ────────────────────────────────────────────────────────────
    mc("m3g5-17", "___ you at home last night? I called you.", "¿Estabas en casa anoche? Te llamé.", ["Did", "Do", "Were", "Was"], 2, {
      en: "at home is a state, not an action: Were you at home?",
      es: "at home es un estado, no una acción: Were you at home? Did solo va con verbos de acción.",
    }),
    mistake("m3g5-18", "Yesterday I go to the gym and then I went home.", "go", "went", {
      en: "Both actions yesterday: went ... went.",
      es: "Las dos acciones fueron ayer: went ... went. Cambiar de pasado a presente a mitad de frase es el error más común al contar el día.",
    }),
    mistake("m3g5-19", "My supervisor said me that the call was good.", "said", "told", {
      en: "told me, not said me. say something / tell someone.",
      es: "told me, no said me. say va con la cosa dicha; tell va con la persona. «Said me» es calco de «me dijo».",
    }),
    mistake("m3g5-20", "Did you slept well last night?", "slept", "sleep", {
      en: "After Did, base form: Did you sleep well?",
      es: "Después de Did el verbo va en forma base: Did you sleep well? El pasado ya está en Did.",
    }),
  ],
};
