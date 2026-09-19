import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 3 · Día 9 — Did You…? (preguntas en pasado · contraste con Do / Does).
 * Historia del día: el Boss interroga a Mateo sobre el lunes.
 * Mezcla: 12 preguntas en pasado · 4 repaso Basic 2 (Do / Does, Were)
 * · 4 básicos (these / They, arrive at, have)
 * · organizados en 8 ancla, 8 transferencia, 4 trampas.
 */
const DETECTIVE = "Mateo escribió la pregunta del Boss en su cuaderno. Toca el error.";
const CHISME = "Mateo recuerda la pregunta en desorden. Ordénala.";

export const PAST_STORIES_DAY_9: GrammarQuiz = {
  moduleId: "past-stories",
  day: 9,
  title: { en: "The Boss Has Questions", es: "El jefe tiene preguntas" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("m3g9-1", "Boss: ___ you work yesterday? · Mateo: Yes, I ___.", "Boss: ¿Trabajaste ayer? · Mateo: Sí.", ["Did / did", "Do / do", "Did / worked", "Were / was"], 0, {
      en: "Did you work? Yes, I did.",
      es: "Did you work? Yes, I did. La respuesta corta repite did, no el verbo.",
    }),
    mc("m3g9-2", "Boss: Where ___ after work? · Mateo: I went home.", "Boss: ¿A dónde fuiste después del trabajo? · Mateo: Fui a casa.", ["did you go", "you went", "did you went", "you go"], 0, {
      en: "Where did you go? did + base verb.",
      es: "Where did you go? did + verbo base. «Where you went» es calco de «a dónde fuiste».",
    }),
    mc("m3g9-3", "Boss: ___ Kat come late? · Mateo: No, she ___.", "Boss: ¿Kat llegó tarde? · Mateo: No.", ["Did / didn't", "Does / doesn't", "Did / didn't come", "Do / didn't"], 0, {
      en: "Did Kat come late? No, she didn't.",
      es: "Did Kat come late? No, she didn't. La respuesta corta termina en didn't, sin repetir el verbo.",
    }),
    mc("m3g9-4", "Boss: What ___ at night? · Mateo: I watched the game.", "Boss: ¿Qué hiciste en la noche? · Mateo: Vi el partido.", ["did you do", "you did", "did you did", "do you did"], 0, {
      en: "What did you do? The first did asks, the second do is the verb.",
      es: "What did you do? El primer did hace la pregunta; el do del final es el verbo hacer, en forma base.",
    }),
    mistake("m3g9-5", "Did you ate breakfast this morning?", "ate", "eat", {
      en: "After Did, base form: Did you eat?",
      es: "Después de Did el verbo va en forma base: Did you eat? El pasado ya está en Did.",
    }, DETECTIVE),
    mistake("m3g9-6", "Where did Kat went yesterday?", "went", "go", {
      en: "Where did Kat go?",
      es: "Where did Kat go? Con did, el verbo vuelve a la base.",
    }, DETECTIVE),
    rearrange(
      "m3g9-7",
      ["work", "yesterday?", "Did", "your sister"],
      ["Did", "your sister", "work", "yesterday?"],
      { en: "Did + subject + base verb + time.", es: "Did + sujeto + verbo base + tiempo." },
      CHISME,
    ),
    rearrange(
      "m3g9-8",
      ["eat", "did", "for lunch?", "What", "Dylan"],
      ["What", "did", "Dylan", "eat", "for lunch?"],
      { en: "Wh-word + did + subject + base verb.", es: "Palabra wh + did + sujeto + verbo base." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("m3g9-9", "Boss: ___ Kat work on Saturdays? · Mateo: Yes, she does.", "Boss: ¿Kat trabaja los sábados? · Mateo: Sí.", ["Does", "Do", "Did", "Is"], 0, {
      en: "A routine question: Does Kat work ...?",
      es: "Pregunta de rutina (los sábados en general): Does Kat work ...? Presente, con Does para she.",
    }),
    mc("m3g9-10", "Boss: ___ she work last Saturday? · Mateo: Yes, she did.", "Boss: ¿Trabajó el sábado pasado? · Mateo: Sí.", ["Did", "Does", "Do", "Was"], 0, {
      en: "last Saturday = past: Did she work?",
      es: "last Saturday es pasado: Did she work? Compará con el ítem anterior: misma pregunta, otro tiempo.",
    }),
    mc("m3g9-11", "Boss: What time ___ the meeting start yesterday? · Kat: At nine.", "Boss: ¿A qué hora empezó la reunión ayer? · Kat: A las nueve.", ["did", "does", "was", "do"], 0, {
      en: "Past action: did the meeting start.",
      es: "Acción en pasado: did the meeting start. was solo va con adjetivos o lugares (was the meeting long?).",
    }),
    mistake("m3g9-12", "Does Mateo come late yesterday?", "Does", "Did", {
      en: "yesterday: Did Mateo come late?",
      es: "Con yesterday: Did Mateo come late? Does es presente; el verbo en base (come) ya estaba bien.",
    }, DETECTIVE),
    mistake("m3g9-13", "Did they finished the report?", "finished", "finish", {
      en: "Did they finish? Base form after Did.",
      es: "Did they finish? Forma base después de Did.",
    }, DETECTIVE),
    rearrange(
      "m3g9-14",
      ["at night?", "Luis", "Does", "work"],
      ["Does", "Luis", "work", "at night?"],
      { en: "Present routine question: Does + he + base verb.", es: "Pregunta de rutina en presente: Does + he + verbo base. Repaso de Basic 2." },
      CHISME,
    ),
    rearrange(
      "m3g9-15",
      ["did", "leave early", "Why", "yesterday?", "you"],
      ["Why", "did", "you", "leave early", "yesterday?"],
      { en: "Why + did + you + base verb + time.", es: "Why + did + you + verbo base + tiempo." },
      CHISME,
    ),
    mc("m3g9-16", "Boss: Are ___ your keys on my desk? · Mateo: Yes, ___ are mine, sorry.", "Boss: ¿Estas llaves en mi escritorio son tuyas? · Mateo: Sí, son mías, perdón.", ["these / they", "this / they", "these / this", "that / they"], 0, {
      en: "keys is plural and near: these. Then: they are mine.",
      es: "keys es plural y está cerca: these. Para responder: they are mine (son mías).",
    }),

    // ── Trampas ────────────────────────────────────────────────────────────
    mc("m3g9-17", "Boss: ___ you at the meeting yesterday? · Mateo: Yes, I was.", "Boss: ¿Estabas en la reunión ayer? · Mateo: Sí.", ["Were", "Did", "Was", "Are"], 0, {
      en: "No action verb, just a place: Were you at ...?",
      es: "No hay verbo de acción, solo un lugar: Were you at ...? Did solo va con verbos de acción.",
    }),
    mistake("m3g9-18", "Did you called the client this morning?", "called", "call", {
      en: "Did you call? Base form.",
      es: "Did you call? Con Did, el verbo va en base.",
    }, DETECTIVE),
    mistake("m3g9-19", "Did Kat arrive to the office late?", "to", "at", {
      en: "arrive at a place.",
      es: "arrive at: llegar a un lugar. «Arrive to» es calco de «llegar a».",
    }, DETECTIVE),
    mistake("m3g9-20", "Did Luis has a good day?", "has", "have", {
      en: "Did Luis have a good day? Base form, even with he.",
      es: "Did Luis have a good day? Forma base, aunque sea he. Con Did, nunca has ni had.",
    }, DETECTIVE),
  ],
};
