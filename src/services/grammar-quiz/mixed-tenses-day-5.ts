import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 4 · Día 5 — Last Weekend & Next Weekend (reto de la semana 1).
 * Historia: Camila cuenta el fin de semana pasado y el próximo, con acampada.
 * 6 ancla · 6 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Camila escribió sus dos fines de semana en el chat. Toca el error antes de que lo mande.";
const CHISME = "Vale lo contó en desorden. Ordena la frase.";

export const MIXED_TENSES_DAY_5: GrammarQuiz = {
  moduleId: "mixed-tenses",
  day: 5,
  title: { en: "Two Weekends", es: "Dos fines de semana" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("m5g5-1", "Last weekend, I ___ home and ___.", "El fin de semana pasado me quedé en casa y descansé.", ["stayed / relaxed", "stay / relax", "stayed / relax", "am staying / relaxed"], 0, {
      en: "Last weekend: stayed, relaxed.",
      es: "Last weekend: stayed, relaxed. Las dos en pasado.",
    }),
    mc("m5g5-2", "On Saturday, I ___ a big lunch for my family.", "El sábado cociné un almuerzo grande para mi familia.", ["cooked", "cook", "am going to cook", "cooks"], 0, {
      en: "That Saturday (last weekend): cooked.",
      es: "Ese sábado, el pasado: cooked.",
    }),
    mc("m5g5-3", "Next weekend ___ totally different.", "El próximo fin de semana va a ser totalmente distinto.", ["is going to be", "was", "is being", "be"], 0, {
      en: "Next weekend: is going to be.",
      es: "Next weekend: is going to be. Futuro.",
    }),
    mistake("m5g5-4", "My friends and I is going to camp near a lake.", "is", "are", {
      en: "My friends and I = we: are going to.",
      es: "My friends and I = we: are going to. Plural.",
    }, DETECTIVE),
    mistake("m5g5-5", "We're going to swim and cooked outside.", "cooked", "cook", {
      en: "going to swim and cook: base form for both.",
      es: "going to swim and cook: los dos verbos en base, comparten el going to.",
    }, DETECTIVE),
    rearrange(
      "m5g5-6",
      ["an amazing weekend", "will be", "I think", "it"],
      ["I think", "it", "will be", "an amazing weekend"],
      { en: "I think + it + will be + noun.", es: "I think + it + will be + sustantivo. Predicción." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("m5g5-7", "Vale: Last weekend Dani ___ his room, and next weekend he ___ his car.", "Vale: El fin de semana pasado Dani limpió su cuarto, y el próximo va a lavar su carro.", ["cleaned / is going to wash", "cleans / washed", "cleaned / washes", "is cleaning / washed"], 0, {
      en: "last weekend: cleaned. next weekend: is going to wash.",
      es: "last weekend: cleaned. next weekend: is going to wash. Pasado y futuro con la misma persona.",
    }),
    mc("m5g5-8", "Camila: ___ you ___ anything special last weekend?", "Camila: ¿Hiciste algo especial el fin de semana pasado?", ["Did / do", "Do / did", "Did / did", "Are / doing"], 0, {
      en: "Did you do? The second do is the verb.",
      es: "Did you do? El primer did pregunta; el do es el verbo hacer, en base.",
    }),
    mc("m5g5-9", "Vale: Next weekend my parents ___ us at the lake. I think they ___ it.", "Vale: El próximo fin de semana mis papás nos van a visitar en el lago. Creo que les va a encantar.", ["are going to visit / will love", "visited / loved", "visit / love", "are visiting / loved"], 0, {
      en: "Plan: are going to visit. Prediction: will love.",
      es: "Plan: are going to visit. Predicción con I think: will love.",
    }),
    mistake("m5g5-10", "Last Sunday we practice English and cleaned the house.", "practice", "practiced", {
      en: "Last Sunday: practiced ... cleaned.",
      es: "Last Sunday: practiced ... cleaned. Los dos en pasado.",
    }, DETECTIVE),
    rearrange(
      "m5g5-11",
      ["together", "the afternoon", "We", "enjoyed"],
      ["We", "enjoyed", "the afternoon", "together"],
      { en: "Subject + enjoyed + object + together.", es: "Sujeto + enjoyed + objeto + together." },
      CHISME,
    ),
    rearrange(
      "m5g5-12",
      ["near a lake", "are going to", "Next weekend", "we", "camp"],
      ["Next weekend", "we", "are going to", "camp", "near a lake"],
      { en: "Time + subject + are going to + verb + place.", es: "Tiempo + sujeto + are going to + verbo + lugar." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("m5g5-13", "Camila: I ___ home every weekend. I like my house.", "Camila: Me quedo en casa todos los fines de semana. Me gusta mi casa.", ["stay", "stayed", "stays", "am going to stay"], 0, {
      en: "every weekend: stay (routine).",
      es: "every weekend: stay, rutina, sin -s para I. Repaso de Basic 2.",
    }),
    mc("m5g5-14", "Vale: At noon on Saturday, Camila ___ lunch for eight people.", "Vale: El sábado al mediodía, Camila estaba cocinando almuerzo para ocho personas.", ["was cooking", "cooks", "is cooking", "cooked"], 0, {
      en: "At noon on Saturday = in progress: was cooking.",
      es: "At noon on Saturday, en progreso: was cooking. Repaso de Basic 3.",
    }),
    mistake("m5g5-15", "Camila's family visit her every Sunday.", "visit", "visits", {
      en: "Camila's family = it: visits.",
      es: "Camila's family = it, singular: visits, con -s. Repaso de Basic 2.",
    }, DETECTIVE),
    mistake("m5g5-16", "We didn't went out last weekend.", "went", "go", {
      en: "didn't + base form: didn't go.",
      es: "didn't + forma base: didn't go. Repaso de Basic 3.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("m5g5-17", "We're going to camp ___ a lake ___ Saturday night.", "Vamos a acampar cerca de un lago el sábado en la noche.", ["near / on", "next / in", "near / in", "close / at"], 0, {
      en: "near a lake, on Saturday night.",
      es: "near a lake: cerca del lago. on Saturday night: cuando hay un día, gana on.",
    }),
    mc("m5g5-18", "___ weekend was calm. ___ weekend is going to be exciting.", "Ese fin de semana fue tranquilo. Este fin de semana va a ser emocionante.", ["That / This", "This / That", "Those / These", "That / These"], 0, {
      en: "That weekend (past, far), this weekend (now, near).",
      es: "That weekend: el pasado, lejos. This weekend: el que viene, cerca.",
    }),
    mistake("m5g5-19", "We're going to cook outside and eat with the hands.", "the", "our", {
      en: "eat with our hands.",
      es: "eat with our hands. En inglés las partes del cuerpo llevan posesivo. «With the hands» es calco de «con las manos».",
    }, DETECTIVE),
    mistake("m5g5-20", "I cooked a big lunch for eight persons on Saturday.", "persons", "people", {
      en: "eight people. people is the normal plural of person.",
      es: "eight people. people es el plural normal de person; persons casi no se usa.",
    }, DETECTIVE),
  ],
};
