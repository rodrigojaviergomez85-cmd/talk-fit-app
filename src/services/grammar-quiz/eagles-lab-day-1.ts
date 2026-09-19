import { mc, mistake, type GrammarQuiz } from "./types";

/**
 * EAGLES · Semana 1 · Día 1 — B2 LAB · LECTURA.
 * Tema del día: Tell me what happened (pasado simple, historia corta).
 * Sección 1: lectura de ~220 palabras + 6 preguntas tipo TOEFL
 * (idea principal · detalle · vocabulario en contexto · referencia ·
 * inferencia · inserción de oración). Sección 2: 4 ítems de estructura
 * (pasado simple / pasado continuo). 10 ítems · aprueba con 7.
 */
const PASSAGE = [
  "Carlos had a busy day at the call center yesterday because several things happened at the same time. He arrived early, at seven thirty, because his manager had asked him to prepare a short report before the morning meeting. He started working right away and finished the report in less than an hour.",
  "While he was in the meeting, his manager announced that two coworkers were sick, so the team had fewer people than usual. Carlos took more calls than normal. Most of the customers were calm, but one of them was upset about a late delivery. Carlos listened to the customer, apologized, and explained the next steps. By the end of the call, the customer thanked him.",
  "[A] After that, Carlos had lunch with Maria, a coworker from another team. [B] They talked for a while about a training program the company was offering. [C] Maria told him that the program could help him get a better position, and Carlos decided to apply. [D] Later, he went home, watched a movie, and relaxed. Overall, it was a long day, but he got a lot done and learned something new.",
];

export const EAGLES_LAB_DAY_1: GrammarQuiz = {
  moduleId: "eagles-week-1",
  day: 1,
  title: { en: "B2 Lab · Reading: A Busy Day", es: "B2 Lab · Lectura: Un día ocupado" },
  passScore: 7,
  sections: [
    {
      id: "egl1-reading",
      label: { en: "Reading", es: "Lectura" },
      instruction: {
        en: "Read the passage. Then answer 6 questions. You can look at the text while you answer.",
        es: "Lee el texto. Luego responde 6 preguntas. Puedes ver el texto mientras respondes.",
      },
      context: { kind: "reading", title: "A Busy Day", titleEs: "Un día ocupado", paragraphs: PASSAGE },
      timeLimitSec: 420,
      itemIds: ["egl1-1", "egl1-2", "egl1-3", "egl1-4", "egl1-5", "egl1-6"],
    },
    {
      id: "egl1-structure",
      label: { en: "Structure", es: "Estructura" },
      instruction: { en: "Choose the correct form or find the mistake.", es: "Elige la forma correcta o encuentra el error." },
      itemIds: ["egl1-7", "egl1-8", "egl1-9", "egl1-10"],
    },
  ],
  items: [
    // ── Lectura ────────────────────────────────────────────────────────────
    mc(
      "egl1-1",
      "What is the passage mainly about?",
      "¿De qué trata principalmente el texto?",
      [
        "A day when Carlos had more work than usual and handled it well",
        "The reasons why two of Carlos's coworkers were sick",
        "A training program that the company offers every year",
        "A customer who was angry about a late delivery",
      ],
      0,
      {
        en: "Main idea: the whole day, not one detail. The sick coworkers, the program and the customer are details.",
        es: "Idea principal: todo el día, no un detalle. Los compañeros enfermos, el programa y el cliente son detalles.",
      },
    ),
    mc(
      "egl1-2",
      "According to paragraph 1, why did Carlos arrive early?",
      "Según el párrafo 1, ¿por qué llegó Carlos temprano?",
      [
        "His manager asked him to prepare a report",
        "He wanted to have breakfast at the office",
        "Two coworkers were going to be absent",
        "He had a meeting with a customer",
      ],
      0,
      {
        en: "Detail: \"because his manager had asked him to prepare a short report\".",
        es: "Detalle: «because his manager had asked him to prepare a short report». La respuesta está en el texto.",
      },
    ),
    mc(
      "egl1-3",
      "The phrase \"right away\" in paragraph 1 is closest in meaning to",
      "La frase «right away» en el párrafo 1 significa casi lo mismo que",
      ["immediately", "slowly", "carefully", "later"],
      0,
      {
        en: "right away = immediately, with no delay.",
        es: "right away = de inmediato, sin esperar.",
      },
    ),
    mc(
      "egl1-4",
      "The word \"them\" in paragraph 2 refers to",
      "La palabra «them» en el párrafo 2 se refiere a",
      ["the customers", "the coworkers", "the calls", "the next steps"],
      0,
      {
        en: "\"Most of the customers were calm, but one of them…\" → them = the customers.",
        es: "«Most of the customers were calm, but one of them…» → them = los clientes.",
      },
    ),
    mc(
      "egl1-5",
      "What can be inferred about Carlos from paragraph 2?",
      "¿Qué se puede inferir sobre Carlos en el párrafo 2?",
      [
        "He stays calm with difficult customers",
        "He does not like taking calls",
        "He was late for the morning meeting",
        "He was sick the day before",
      ],
      0,
      {
        en: "Inference: he listened, apologized and explained, and the customer thanked him. The text never says he was late or sick.",
        es: "Inferencia: escuchó, se disculpó y explicó, y el cliente le agradeció. El texto nunca dice que llegó tarde ni que estaba enfermo.",
      },
    ),
    mc(
      "egl1-6",
      "Look at the four squares [A] [B] [C] [D] in paragraph 3. Where would this sentence fit best? \"It was the first time they had eaten together.\"",
      "Mira los cuatro cuadros [A] [B] [C] [D] del párrafo 3. ¿Dónde encaja mejor esta oración? «It was the first time they had eaten together.»",
      ["[B]", "[A]", "[C]", "[D]"],
      0,
      {
        en: "The sentence talks about eating together, so it goes right after \"Carlos had lunch with Maria\" → [B].",
        es: "La oración habla de comer juntos, así que va justo después de «Carlos had lunch with Maria» → [B].",
      },
    ),

    // ── Estructura ─────────────────────────────────────────────────────────
    mc(
      "egl1-7",
      "While I ___ in the meeting, my phone rang twice.",
      "Mientras estaba en la reunión, mi teléfono sonó dos veces.",
      ["was", "were", "am", "did"],
      0,
      {
        en: "While + past continuous (I was) for the background action.",
        es: "While + pasado continuo (I was) para la acción de fondo.",
      },
    ),
    mc(
      "egl1-8",
      "After that, I ___ lunch with a friend and we talked for a while.",
      "Después de eso, almorcé con un amigo y hablamos un rato.",
      ["had", "have", "has", "having"],
      0,
      {
        en: "Simple past: had.",
        es: "Pasado simple: had. Have es presente.",
      },
    ),
    mistake(
      "egl1-9",
      "Yesterday I arrive early and I started working right away.",
      "arrive",
      "arrived",
      {
        en: "Yesterday → simple past: arrived.",
        es: "Yesterday → pasado simple: arrived.",
      },
      "Carlos escribió su día. Toca la palabra equivocada.",
    ),
    mistake(
      "egl1-10",
      "Overall, it was a good day because I get a lot done.",
      "get",
      "got",
      {
        en: "The whole story is in the past: got.",
        es: "Toda la historia va en pasado: got.",
      },
      "Carlos escribió su día. Toca la palabra equivocada.",
    ),
  ],
};
