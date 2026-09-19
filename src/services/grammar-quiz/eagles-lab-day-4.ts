import { mc, speak, type GrammarQuiz } from "./types";

/**
 * EAGLES · Semana 1 · Día 4 — B2 LAB · SPEAKING INTEGRADO (estilo TOEFL iBT).
 * Tema del día: Recommend & sell (Phone A vs Phone B).
 * Sección 1: lee la ficha de los dos teléfonos (~110 palabras).
 * Sección 2: escucha a la clienta (~45 s, 2 reproducciones) y responde 6
 * preguntas de comprensión y lenguaje. Sección 3: 20 s para pensar, 60 s
 * para hablar con una plantilla. 7 ítems · aprueba con 6 · hablar es
 * obligatorio.
 */
const SHEET = [
  "Phone A — $280. 6.1-inch screen, 128 GB of storage, 48-megapixel camera with night mode. Battery: about a day and a half with normal use. Two-year warranty. Available in black and blue.",
  "Phone B — $520. 6.7-inch screen, 256 GB of storage, 50-megapixel camera with night mode and optical zoom. Faster processor, good for games and video editing. Battery: about two days. Two-year warranty. Available in black only.",
];

const CUSTOMER: { voice: "female" | "male"; text: string }[] = [
  {
    voice: "female",
    text: "Hi, I'm looking for a new phone, but I don't want to spend more than three hundred dollars. The most important thing for me is the camera, because I take a lot of pictures of my kids, and many of them are at night, at home. I don't play games and I don't edit videos. I just use WhatsApp, the camera, and a few apps. Oh, and I'd love a blue one if that's possible, but it's not a big deal.",
  },
];

export const EAGLES_LAB_DAY_4: GrammarQuiz = {
  moduleId: "eagles-week-1",
  day: 4,
  title: { en: "B2 Lab · Speaking: Recommend a Phone", es: "B2 Lab · Speaking: Recomienda un teléfono" },
  passScore: 6,
  sections: [
    {
      id: "egl4-read",
      label: { en: "Read", es: "Lee" },
      instruction: {
        en: "Read the product sheet. You will use it to make a recommendation.",
        es: "Lee la ficha de los dos teléfonos. La vas a usar para recomendar uno.",
      },
      context: { kind: "reading", title: "Two phones", titleEs: "Dos teléfonos", paragraphs: SHEET },
      timeLimitSec: 120,
      itemIds: [],
    },
    {
      id: "egl4-listen",
      label: { en: "Listen", es: "Escucha" },
      instruction: {
        en: "Listen to the customer (two plays only). Then answer 6 questions.",
        es: "Escucha a la clienta (solo dos veces). Luego responde 6 preguntas.",
      },
      context: { kind: "listening", title: "The customer", titleEs: "La clienta", parts: CUSTOMER, plays: 2 },
      timeLimitSec: 240,
      itemIds: ["egl4-1", "egl4-2", "egl4-3", "egl4-4", "egl4-5", "egl4-6"],
    },
    {
      id: "egl4-speak",
      label: { en: "Speak", es: "Habla" },
      instruction: {
        en: "Recommend one phone to this customer. 20 seconds to think, 60 seconds to speak.",
        es: "Recomiéndale un teléfono a esta clienta. 20 segundos para pensar, 60 para hablar.",
      },
      itemIds: ["egl4-7"],
    },
  ],
  items: [
    // ── Comprensión ────────────────────────────────────────────────────────
    mc(
      "egl4-1",
      "What is most important to the customer?",
      "¿Qué es lo más importante para la clienta?",
      ["The camera", "The screen size", "The processor", "The color"],
      0,
      {
        en: "\"The most important thing for me is the camera\".",
        es: "«The most important thing for me is the camera».",
      },
    ),
    mc(
      "egl4-2",
      "How much does the customer want to spend?",
      "¿Cuánto quiere gastar la clienta?",
      ["No more than $300", "About $520", "Between $300 and $500", "She did not say"],
      0,
      {
        en: "\"I don't want to spend more than three hundred dollars\".",
        es: "«I don't want to spend more than three hundred dollars».",
      },
    ),
    mc(
      "egl4-3",
      "Which phone fits the customer's budget?",
      "¿Qué teléfono cabe en el presupuesto de la clienta?",
      ["Phone A", "Phone B", "Both phones", "Neither phone"],
      0,
      {
        en: "Phone A is $280 (under $300). Phone B is $520.",
        es: "Phone A cuesta $280 (menos de $300). Phone B cuesta $520.",
      },
    ),
    mc(
      "egl4-4",
      "Which feature of Phone B is NOT useful for this customer?",
      "¿Qué característica de Phone B NO le sirve a esta clienta?",
      ["The faster processor for games and video editing", "The camera with night mode", "The two-year warranty", "The battery"],
      0,
      {
        en: "She said: \"I don't play games and I don't edit videos\".",
        es: "Ella dijo: «I don't play games and I don't edit videos».",
      },
    ),
    mc(
      "egl4-5",
      "Based on what she said, Phone A fits her needs ___ it has a good camera with night mode.",
      "Según lo que dijo, Phone A cubre sus necesidades porque tiene buena cámara con modo nocturno.",
      ["because", "although", "unless", "so"],
      0,
      {
        en: "because = reason for the recommendation.",
        es: "because = la razón de la recomendación.",
      },
    ),
    mc(
      "egl4-6",
      "Phone B has a better camera. ___, it costs much more than her budget.",
      "Phone B tiene mejor cámara. Por otro lado, cuesta mucho más que su presupuesto.",
      ["On the other hand", "In addition", "That's why", "For example"],
      0,
      {
        en: "On the other hand = contrast between two sides.",
        es: "On the other hand = por otro lado, contraste entre dos lados.",
      },
    ),

    // ── Hablar ─────────────────────────────────────────────────────────────
    speak(
      "egl4-7",
      "Which phone would you recommend to this customer, and why? Use the product sheet and what she said.",
      "¿Qué teléfono le recomendarías a esta clienta y por qué? Usa la ficha y lo que ella dijo.",
      [
        "Based on what you've told me, I'd recommend Phone ___.",
        "First, it fits your budget because…",
        "It also has…, which is important to you because…",
        "Phone ___ is…; on the other hand, it…",
        "Overall, Phone ___ gives you what you need without…",
      ],
      { prepSeconds: 20, speakSeconds: 60, minSeconds: 40 },
      {
        en: "Talk for at least 40 seconds: recommendation + two reasons + one contrast + closing.",
        es: "Habla al menos 40 segundos: recomendación + dos razones + un contraste + cierre.",
      },
    ),
  ],
};
