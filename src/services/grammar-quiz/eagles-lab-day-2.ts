import { mc, mistake, type GrammarQuiz } from "./types";

/**
 * EAGLES · Semana 1 · Día 2 — B2 LAB · LISTENING.
 * Tema del día: Offer options (could / might / should — el viaje de Aria).
 * Sección 1: conversación de dos voces (~90 s), se puede oír 2 veces,
 * 5 preguntas (propósito · detalle · actitud · qué hará después · vocabulario).
 * Sección 2: 5 ítems de estructura (modales de consejo y opciones).
 * 10 ítems · aprueba con 7.
 */
const CONVERSATION: { voice: "female" | "male"; text: string }[] = [
  { voice: "female", text: "Hi Diego, do you have a minute? I need some advice. I really want to visit my cousin in Peru in December, but flights are so expensive right now." },
  { voice: "male", text: "Sure. How much are they?" },
  { voice: "female", text: "Around six hundred dollars. And that's before the hotel. I looked at a few places, and a decent hotel is about seventy dollars a night." },
  { voice: "male", text: "Okay, first question: does your cousin have space? You could stay with her instead of paying for a hotel. That would save you at least five hundred dollars for the week." },
  { voice: "female", text: "That's true, I hadn't thought about that. She has a small apartment, but she offered before." },
  { voice: "male", text: "And second, are you sure about December? Everybody travels in December. If you went in February, the same flight might cost half." },
  { voice: "female", text: "Hmm, February… my cousin's birthday is in December, though. That's the whole point of the trip." },
  { voice: "male", text: "Then you should make a budget this week and start saving now. You shouldn't wait until November to buy the ticket; the price only goes up." },
  { voice: "female", text: "You're right. I'll compare a couple of airlines tonight and I'll message my cousin about staying with her." },
  { voice: "male", text: "Good plan. And Aria, don't buy anything you don't need until the trip. That's how you'll get there." },
];

export const EAGLES_LAB_DAY_2: GrammarQuiz = {
  moduleId: "eagles-week-1",
  day: 2,
  title: { en: "B2 Lab · Listening: Aria's Trip", es: "B2 Lab · Listening: El viaje de Aria" },
  passScore: 7,
  sections: [
    {
      id: "egl2-listening",
      label: { en: "Listening", es: "Listening" },
      instruction: {
        en: "Listen to the conversation. You can play it only twice. Then answer 5 questions.",
        es: "Escucha la conversación. Solo puedes reproducirla dos veces. Luego responde 5 preguntas.",
      },
      context: { kind: "listening", title: "Aria asks Diego for advice", titleEs: "Aria le pide consejo a Diego", parts: CONVERSATION, plays: 2 },
      timeLimitSec: 300,
      itemIds: ["egl2-1", "egl2-2", "egl2-3", "egl2-4", "egl2-5"],
    },
    {
      id: "egl2-structure",
      label: { en: "Structure", es: "Estructura" },
      instruction: { en: "Choose the correct form or find the mistake.", es: "Elige la forma correcta o encuentra el error." },
      itemIds: ["egl2-6", "egl2-7", "egl2-8", "egl2-9", "egl2-10"],
    },
  ],
  items: [
    // ── Listening ──────────────────────────────────────────────────────────
    mc(
      "egl2-1",
      "Why does Aria talk to Diego?",
      "¿Por qué Aria habla con Diego?",
      [
        "To get advice about an expensive trip",
        "To invite him to Peru in December",
        "To ask him to lend her money",
        "To tell him about her cousin's new apartment",
      ],
      0,
      {
        en: "Purpose: \"I need some advice… flights are so expensive\".",
        es: "Propósito: «I need some advice… flights are so expensive».",
      },
    ),
    mc(
      "egl2-2",
      "According to Diego, how could Aria save at least five hundred dollars?",
      "Según Diego, ¿cómo podría Aria ahorrar al menos quinientos dólares?",
      [
        "By staying with her cousin instead of a hotel",
        "By buying the ticket in November",
        "By choosing a cheaper hotel",
        "By traveling for only three days",
      ],
      0,
      {
        en: "Detail: \"You could stay with her instead of paying for a hotel. That would save you at least five hundred dollars\".",
        es: "Detalle: «You could stay with her instead of paying for a hotel. That would save you at least five hundred dollars».",
      },
    ),
    mc(
      "egl2-3",
      "How does Aria feel about traveling in February?",
      "¿Qué piensa Aria de viajar en febrero?",
      [
        "She prefers December because of her cousin's birthday",
        "She thinks February is a great idea",
        "She is angry that Diego suggested it",
        "She does not care when she travels",
      ],
      0,
      {
        en: "Attitude: \"my cousin's birthday is in December, though. That's the whole point of the trip\".",
        es: "Actitud: «my cousin's birthday is in December, though. That's the whole point of the trip».",
      },
    ),
    mc(
      "egl2-4",
      "What will Aria probably do tonight?",
      "¿Qué hará Aria probablemente esta noche?",
      [
        "Compare airlines and message her cousin",
        "Buy the ticket to Peru",
        "Book a hotel for a week",
        "Call Diego again for more advice",
      ],
      0,
      {
        en: "\"I'll compare a couple of airlines tonight and I'll message my cousin\".",
        es: "«I'll compare a couple of airlines tonight and I'll message my cousin».",
      },
    ),
    mc(
      "egl2-5",
      "When Diego says \"the price only goes up\", he means that",
      "Cuando Diego dice «the price only goes up», quiere decir que",
      [
        "waiting will make the ticket more expensive",
        "the ticket is already at its highest price",
        "the airline changes prices every hour",
        "hotels are more expensive than flights",
      ],
      0,
      {
        en: "Meaning in context: if she waits, the ticket gets more expensive, so she should buy early.",
        es: "Sentido en contexto: si espera, el boleto sube, por eso debe comprar temprano.",
      },
    ),

    // ── Estructura ─────────────────────────────────────────────────────────
    mc(
      "egl2-6",
      "Aria ___ stay with her cousin instead of paying for a hotel.",
      "Aria podría quedarse con su prima en vez de pagar un hotel.",
      ["could", "can to", "could to", "coulds"],
      0,
      {
        en: "could + base verb, no \"to\".",
        es: "could + verbo base, sin «to».",
      },
    ),
    mc(
      "egl2-7",
      "She ___ spend money on things she doesn't need.",
      "No debería gastar dinero en cosas que no necesita.",
      ["shouldn't", "doesn't should", "should not to", "shouldn't to"],
      0,
      {
        en: "shouldn't + base verb.",
        es: "shouldn't + verbo base. «Doesn't should» no existe.",
      },
    ),
    mc(
      "egl2-8",
      "She could stay with a friend instead of ___ for a hotel.",
      "Podría quedarse con una amiga en vez de pagar un hotel.",
      ["paying", "pay", "to pay", "paid"],
      0,
      {
        en: "instead of + -ing.",
        es: "instead of + verbo en -ing.",
      },
    ),
    mistake(
      "egl2-9",
      "She might travels next month if the prices are lower.",
      "travels",
      "travel",
      {
        en: "might + base verb: might travel.",
        es: "might + verbo base: might travel, sin -s.",
      },
      "Diego escribió su consejo. Toca la palabra equivocada.",
    ),
    mistake(
      "egl2-10",
      "She should makes a budget before buying her ticket.",
      "makes",
      "make",
      {
        en: "should + base verb: should make.",
        es: "should + verbo base: should make, sin -s.",
      },
      "Diego escribió su consejo. Toca la palabra equivocada.",
    ),
  ],
};
