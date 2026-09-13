import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s3-ep13/cover.jpg";
import s1 from "@/assets/storybook/vale-s3-ep13/s1.jpg";
import s2 from "@/assets/storybook/vale-s3-ep13/s2.jpg";
import s3 from "@/assets/storybook/vale-s3-ep13/s3.jpg";
import s4 from "@/assets/storybook/vale-s3-ep13/s4.jpg";
import s5 from "@/assets/storybook/vale-s3-ep13/s5.jpg";
import s6 from "@/assets/storybook/vale-s3-ep13/s6.jpg";
import s7 from "@/assets/storybook/vale-s3-ep13/s7.jpg";
import s8 from "@/assets/storybook/vale-s3-ep13/s8.jpg";
import s9 from "@/assets/storybook/vale-s3-ep13/s9.jpg";
import s10 from "@/assets/storybook/vale-s3-ep13/s10.jpg";

/**
 * Season 3 · Episode 13 — "The delivery problem".
 * Basic 2 / Simple Present Week 3 Day 13: how to order food with a delivery app.
 */
export const VALE_S3_ORDER_FOOD: StorybookEpisode = {
  id: "vale-s3-order-food",
  moduleId: "simple-present",
  week: 3,
  title: "The delivery problem",
  titleEs: "El problema del delivery",
  episodeLabel: { en: "Season 3 · Episode 13", es: "Temporada 3 · Episodio 13" },
  previously: [
    { en: "The team made pizza together.", es: "El equipo hizo pizza." },
    { en: "Ana saw something strange on her phone.", es: "Ana vio algo raro en su teléfono." },
  ],
  reviewWords: [
    { word: "add", es: "agregar" },
    { word: "cook", es: "cocinar" },
    { word: "process", es: "proceso" },
  ],
  blurb: {
    en: "Ana orders food with an app. Vale explains every step.",
    es: "Ana pide comida con una app. Vale explica cada paso.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Ana mira su teléfono con cara preocupada en la sala.",
      text: "Ana wants dinner, but she does not know the delivery app.",
      es: "Ana quiere cenar, pero no conoce la app de delivery.",
      speaker: "narrator",
      words: [
        { word: "wants", es: "quiere" },
        { word: "delivery", es: "entrega a domicilio" },
        { word: "does not know", es: "no conoce" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale se sienta junto a Ana y señala la pantalla.",
      text: "Vale says: \"First, you open the app. Then, you choose a restaurant.\"",
      es: "Vale dice: «Primero, abres la app. Luego, eliges un restaurante.»",
      speaker: "vale",
      words: [
        { word: "choose", es: "elegir" },
        { word: "restaurant", es: "restaurante" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Ana elige una hamburguesa en el menú.",
      text: "\"Next, you select the food. After that, you check the address.\"",
      es: "«Después, seleccionas la comida. Después de eso, revisas la dirección.»",
      speaker: "vale",
      words: [
        { word: "select", es: "seleccionar" },
        { word: "address", es: "dirección" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Ana presiona el botón de pagar con una sonrisa.",
      text: "\"Finally, you pay and you wait.\" Ana pays and smiles.",
      es: "«Finalmente, pagas y esperas.» Ana paga y sonríe.",
      speaker: "vale",
      words: [
        { word: "pay", es: "pagar" },
        { word: "wait", es: "esperar" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Un repartidor llega con una bolsa equivocada.",
      text: "The driver arrives. But the bag has the wrong order.",
      es: "El repartidor llega. Pero la bolsa tiene la orden equivocada.",
      speaker: "narrator",
      words: [
        { word: "driver", es: "repartidor" },
        { word: "bag", es: "bolsa" },
        { word: "wrong", es: "equivocado" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Ana se ve frustrada con la bolsa en la mano.",
      text: "Ana feels frustrated: \"I always have bad luck with apps.\"",
      es: "Ana se siente frustrada: «Siempre tengo mala suerte con las apps.»",
      speaker: "ana",
      words: [
        { word: "frustrated", es: "frustrada" },
        { word: "always", es: "siempre" },
        { word: "bad luck", es: "mala suerte" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale anima a Ana con una mano en el hombro.",
      text: "Vale says: \"Mistakes are part of the process. We fix it together.\"",
      es: "Vale dice: «Los errores son parte del proceso. Lo arreglamos juntas.»",
      speaker: "vale",
      words: [
        { word: "fix", es: "arreglar" },
        { word: "together", es: "juntas" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale escribe en el chat de soporte de la app.",
      text: "Vale writes in the chat: \"We report the problem. Then, they send help.\"",
      es: "Vale escribe en el chat: «Reportamos el problema. Luego, mandan ayuda.»",
      speaker: "vale",
      words: [
        { word: "report", es: "reportar" },
        { word: "problem", es: "problema" },
        { word: "send", es: "enviar" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Llega la comida correcta y Ana celebra.",
      text: "Twenty minutes later, the correct food arrives. Ana celebrates.",
      es: "Veinte minutos después, llega la comida correcta. Ana celebra.",
      speaker: "narrator",
      words: [
        { word: "correct", es: "correcta" },
        { word: "arrives", es: "llega" },
        { word: "celebrates", es: "celebra" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Mateo entra con pan y queso en las manos.",
      text: "Mateo enters with bread: \"Tomorrow I make the best sandwich. Watch me.\"",
      es: "Mateo entra con pan: «Mañana hago el mejor sándwich. Obsérvame.»",
      speaker: "mateo",
      words: [
        { word: "bread", es: "pan" },
        { word: "best", es: "mejor" },
        { word: "Watch", es: "observa" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What do you do after you select the food?",
      questionEs: "¿Qué haces después de seleccionar la comida?",
      options: [
        { label: "You check the address", emoji: "📍" },
        { label: "You cook it", emoji: "🍳" },
        { label: "You close the app", emoji: "❌" },
      ],
      answer: 0,
      sayIt: "After that, you check the address.",
      sayItEs: "Repite: «After that, you check the address.»",
      sayItCheck: { target: "After that you check the address" },
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "Where do you order food from?",
      questionEs: "¿De dónde pides comida?",
      options: [
        { label: "I order from a pizza place", emoji: "🍕" },
        { label: "I order from a burger place", emoji: "🍔" },
        { label: "I never order food", emoji: "🙅" },
      ],
      answer: 0,
      sayIt: "I order food from a pizza place.",
      sayItEs: "Ejemplo: «I order food from a pizza place.»",
      sayItAskEn: "Where do you order food from?",
      sayItAskEs: "¿De dónde pides comida?",
      sayItCheck: {
        target: "I order *",
        altTargets: ["I order food from *", "I never order *"],
      },
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "Why do you use apps every day?",
      questionEs: "¿Por qué usas apps todos los días?",
      options: [
        { label: "Because they save time", emoji: "⏱️" },
        { label: "Because they are easy", emoji: "👍" },
        { label: "Because I work with them", emoji: "💼" },
      ],
      answer: 0,
      sayIt: "I use apps because they save time.",
      sayItEs: "Ejemplo: «I use apps because they save time.»",
      sayItAskEn: "Why do you use apps every day?",
      sayItAskEs: "¿Por qué usas apps todos los días?",
      sayItCheck: {
        target: "I use apps because *",
        altTargets: ["Because *", "I use * because *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s7",
    phrase: "Mistakes are part of the process.",
    es: "Los errores son parte del proceso.",
  },
  continuePrompt: {
    en: "Explain how you order food with an app. Use first, then, next, finally.",
    es: "Explica cómo pides comida con una app. Usa first, then, next, finally.",
  },
  continueWith: ["First, I open…", "Then, I choose…", "Next, I pay…", "Finally, I wait…"],
  cliffhanger: {
    en: "Episode 14: Mateo makes the best sandwich in the office. Or not?",
    es: "Episodio 14: Mateo hace el mejor sándwich de la oficina. ¿O no?",
  },
};
