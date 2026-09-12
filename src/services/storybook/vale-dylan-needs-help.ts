import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-ep14/cover.jpg";
import s1 from "@/assets/storybook/vale-ep14/s1.jpg"; import s2 from "@/assets/storybook/vale-ep14/s2.jpg"; import s3 from "@/assets/storybook/vale-ep14/s3.jpg"; import s4 from "@/assets/storybook/vale-ep14/s4.jpg"; import s5 from "@/assets/storybook/vale-ep14/s5.jpg"; import s6 from "@/assets/storybook/vale-ep14/s6.jpg"; import s7 from "@/assets/storybook/vale-ep14/s7.jpg"; import s8 from "@/assets/storybook/vale-ep14/s8.jpg"; import s9 from "@/assets/storybook/vale-ep14/s9.jpg"; import s10 from "@/assets/storybook/vale-ep14/s10.jpg";

export const VALE_DYLAN_NEEDS_HELP: StorybookEpisode = {
  id: "vale-dylan-needs-help", moduleId: "basic-zero", week: 4, title: "Dylan needs help", titleEs: "Dylan necesita ayuda", episodeLabel: { en: "Episode 14", es: "Episodio 14" },
  previously: [{ en: "Ana is the new supervisor.", es: "Ana es la nueva supervisora." }, { en: "Vale is a candidate for the leaders program.", es: "Vale es candidata para el programa de líderes." }, { en: "A difficult client calls today.", es: "Hoy llama un cliente difícil." }],
  reviewWords: [{ word: "supervisor", es: "supervisora" }, { word: "difficult", es: "difícil" }, { word: "client", es: "cliente" }],
  blurb: { en: "An angry client calls. Vale stays calm.", es: "Llama un cliente enojado. Vale se mantiene tranquila." }, cover, voice: "girl",
  scenes: [
    { id: "s1", image: s1, imageAlt: "El teléfono de Vale suena.", text: "It is nine o'clock. The phone rings.", es: "Son las nueve. El teléfono suena.", words: [{ word: "phone", es: "teléfono" }, { word: "rings", es: "suena" }] },
    { id: "s2", image: s2, imageAlt: "Dylan molesto frente a su laptop.", text: "The client is Dylan. His computer is not okay.", es: "El cliente es Dylan. Su computadora no está bien.", words: [{ word: "computer", es: "computadora" }, { word: "okay", es: "bien" }] },
    { id: "s3", image: s3, imageAlt: "Dylan pide ayuda en la videollamada.", text: '"Hello. I need help. I am angry," says Dylan.', es: "«Hola. Necesito ayuda. Estoy enojado», dice Dylan.", speaker: "dylan", words: [{ word: "help", es: "ayuda" }, { word: "angry", es: "enojado" }] },
    { id: "s4", image: s4, imageAlt: "Vale escucha y toma notas.", text: '"My name is Vale. I am here for you. What is the problem?" says Vale.', es: "«Me llamo Vale. Estoy aquí para ti. ¿Cuál es el problema?», dice Vale.", speaker: "vale", words: [{ word: "problem", es: "problema" }, { word: "here", es: "aquí" }] },
    { id: "s5", image: s5, imageAlt: "Dylan habla rápido y enojado en la pantalla.", text: "Dylan speaks very fast. Vale is a little lost.", es: "Dylan habla muy rápido. Vale está un poco perdida.", words: [{ word: "fast", es: "rápido" }, { word: "lost", es: "perdida" }] },
    { id: "s6", image: s6, imageAlt: "Ana anima a Vale con un pulgar arriba.", text: '"You are okay, Vale. Slow and calm," says Ana.', es: "«Estás bien, Vale. Despacio y con calma», dice Ana.", speaker: "ana", words: [{ word: "slow", es: "despacio" }, { word: "calm", es: "calma" }] },
    { id: "s7", image: s7, imageAlt: "Vale respira profundo y sonríe.", text: '"I am calm. I can do it. I love challenges," says Vale.', es: "«Estoy tranquila. Yo puedo. Amo los retos», dice Vale.", speaker: "vale", words: [{ word: "challenges", es: "retos" }, { word: "can", es: "puedo" }] },
    { id: "s8", image: s8, imageAlt: "Mateo ayuda a Vale con la computadora.", text: '"This button is the answer," says Mateo. Vale and Mateo are a team.', es: "«Este botón es la respuesta», dice Mateo. Vale y Mateo son un equipo.", speaker: "mateo", words: [{ word: "button", es: "botón" }, { word: "answer", es: "respuesta" }] },
    { id: "s9", image: s9, imageAlt: "Dylan feliz con su laptop funcionando.", text: '"My computer is okay now. Thank you, Vale! You are amazing," says Dylan.', es: "«Mi computadora ya está bien. ¡Gracias, Vale! Eres increíble», dice Dylan.", speaker: "dylan", words: [{ word: "thank you", es: "gracias" }, { word: "amazing", es: "increíble" }] },
    { id: "s10", image: s10, imageAlt: "Ana muestra muchas alertas rojas en la pantalla.", text: '"Look, Vale. Fifty clients have the same problem," says Ana.', es: "«Mira, Vale. Cincuenta clientes tienen el mismo problema», dice Ana.", speaker: "ana", words: [{ word: "fifty", es: "cincuenta" }, { word: "same", es: "mismo" }] },
  ],
  quizzes: [
    { id: "q1", afterScene: "s3", questionEn: "How is Dylan today?", questionEs: "¿Cómo está Dylan hoy?", options: [{ label: "Angry", emoji: "😠" }, { label: "Happy", emoji: "😄" }, { label: "Tired", emoji: "😴" }], answer: 0, sayIt: "He is angry.", sayItEs: "Repite: «Él está enojado.»" },
    { id: "q2", afterScene: "s7", questionEn: "What does Vale say to herself?", questionEs: "¿Qué se dice Vale a sí misma?", options: [{ label: "I can do it", emoji: "💪" }, { label: "I am lost", emoji: "🥲" }, { label: "I am done", emoji: "🚪" }], answer: 0, sayIt: "I am calm. I can do it.", sayItEs: "Repite: «Estoy tranquila. Yo puedo.»" },
    { id: "q3", afterScene: "s9", questionEn: "How is Dylan at the end?", questionEs: "¿Cómo está Dylan al final?", options: [{ label: "Happy", emoji: "😄" }, { label: "Angry", emoji: "😠" }, { label: "Sad", emoji: "😢" }], answer: 0, sayIt: "He is happy now.", sayItEs: "Repite: «Él está feliz ahora.»" },
  ],
  mindsetCard: { afterScene: "s7", phrase: "I am calm. I can do it. I love challenges.", es: "Estoy tranquila. Yo puedo. Amo los retos." },
  continuePrompt: { en: "Help a client: say your name, ask the problem, and calm the person.", es: "Ayuda a un cliente: di tu nombre, pregunta el problema y calma a la persona." }, continueWith: ["Hello, my name is…", "I am here for you.", "What is the problem?", "You are okay."],
  cliffhanger: { en: "Fifty clients, one team. Tomorrow: We are a team.", es: "Cincuenta clientes, un equipo. Mañana: Somos un equipo." },
};
