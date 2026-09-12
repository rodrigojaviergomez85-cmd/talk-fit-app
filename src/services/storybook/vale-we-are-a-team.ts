import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-ep15/cover.jpg";
import s1 from "@/assets/storybook/vale-ep15/s1.jpg"; import s2 from "@/assets/storybook/vale-ep15/s2.jpg"; import s3 from "@/assets/storybook/vale-ep15/s3.jpg"; import s4 from "@/assets/storybook/vale-ep15/s4.jpg"; import s5 from "@/assets/storybook/vale-ep15/s5.jpg"; import s6 from "@/assets/storybook/vale-ep15/s6.jpg"; import s7 from "@/assets/storybook/vale-ep15/s7.jpg"; import s8 from "@/assets/storybook/vale-ep15/s8.jpg"; import s9 from "@/assets/storybook/vale-ep15/s9.jpg"; import s10 from "@/assets/storybook/vale-ep15/s10.jpg";

export const VALE_WE_ARE_A_TEAM: StorybookEpisode = {
  id: "vale-we-are-a-team", moduleId: "basic-zero", week: 4, title: "We are a team", titleEs: "Somos un equipo", episodeLabel: { en: "Episode 15", es: "Episodio 15" },
  previously: [{ en: "Dylan's computer is okay now.", es: "La computadora de Dylan ya está bien." }, { en: "Vale is calm and helps well.", es: "Vale está tranquila y ayuda bien." }, { en: "But fifty clients have the same problem!", es: "¡Pero cincuenta clientes tienen el mismo problema!" }],
  reviewWords: [{ word: "problem", es: "problema" }, { word: "help", es: "ayuda" }, { word: "calm", es: "calma" }],
  blurb: { en: "Fifty clients need help. One team, one answer.", es: "Cincuenta clientes necesitan ayuda. Un equipo, una respuesta." }, cover, voice: "girl",
  scenes: [
    { id: "s1", image: s1, imageAlt: "Ana muestra las alertas rojas al equipo.", text: '"Team, fifty clients need help today. We are one team," says Ana.', es: "«Equipo, cincuenta clientes necesitan ayuda hoy. Somos un solo equipo», dice Ana.", speaker: "ana", words: [{ word: "team", es: "equipo" }, { word: "today", es: "hoy" }] },
    { id: "s2", image: s2, imageAlt: "Vale motivada en su escritorio.", text: '"I am ready. I love challenges," says Vale.', es: "«Estoy lista. Amo los retos», dice Vale.", speaker: "vale", words: [{ word: "ready", es: "lista" }, { word: "love", es: "amo" }] },
    { id: "s3", image: s3, imageAlt: "Mateo y Kat trabajando rápido.", text: "Mateo and Kat work very fast. They are a good team.", es: "Mateo y Kat trabajan muy rápido. Son un buen equipo.", words: [{ word: "work", es: "trabajan" }, { word: "fast", es: "rápido" }] },
    { id: "s4", image: s4, imageAlt: "Camila saluda desde la videollamada.", text: '"Hello, friends! I am here from my home," says Camila.', es: "«¡Hola, amigos! Estoy aquí desde mi casa», dice Camila.", speaker: "camila", words: [{ word: "friends", es: "amigos" }, { word: "home", es: "casa" }] },
    { id: "s5", image: s5, imageAlt: "Vale atiende a un cliente con calma.", text: '"Hello, my name is Vale. I am here for you," says Vale.', es: "«Hola, me llamo Vale. Estoy aquí para ti», dice Vale.", speaker: "vale", words: [{ word: "name", es: "nombre" }, { word: "here", es: "aquí" }] },
    { id: "s6", image: s6, imageAlt: "Mateo encuentra la respuesta.", text: '"This is the answer! One green button," says Mateo.', es: "«¡Esta es la respuesta! Un botón verde», dice Mateo.", speaker: "mateo", words: [{ word: "answer", es: "respuesta" }, { word: "green", es: "verde" }] },
    { id: "s7", image: s7, imageAlt: "El equipo comparte la respuesta por chat.", text: "The team shares the answer. We help each other.", es: "El equipo comparte la respuesta. Nos ayudamos unos a otros.", words: [{ word: "shares", es: "comparte" }, { word: "each other", es: "unos a otros" }] },
    { id: "s8", image: s8, imageAlt: "Las alertas rojas se vuelven verdes.", text: "One, two, three… fifty clients are okay now. Good job!", es: "Uno, dos, tres… cincuenta clientes están bien ahora. ¡Buen trabajo!", words: [{ word: "now", es: "ahora" }, { word: "good job", es: "buen trabajo" }] },
    { id: "s9", image: s9, imageAlt: "Ana aplaude orgullosa al equipo.", text: '"Good job, team. You are amazing," says Ana.', es: "«Buen trabajo, equipo. Son increíbles», dice Ana.", speaker: "ana", words: [{ word: "proud", es: "orgullosa" }, { word: "amazing", es: "increíbles" }] },
    { id: "s10", image: s10, imageAlt: "Luis llama a Vale por teléfono.", text: '"Vale, it is Luis. Tomorrow is my big interview," says Luis.', es: "«Vale, soy Luis. Mañana es mi gran entrevista», dice Luis.", speaker: "luis", words: [{ word: "interview", es: "entrevista" }, { word: "tomorrow", es: "mañana" }] },
  ],
  quizzes: [
    { id: "q1", afterScene: "s2", questionEn: "How is Vale today?", questionEs: "¿Cómo está Vale hoy?", options: [{ label: "Ready", emoji: "💪" }, { label: "Scared", emoji: "😨" }, { label: "Sleepy", emoji: "😴" }], answer: 0, sayIt: "I am ready.", sayItEs: "Repite: «Estoy lista.»" },
    { id: "q2", afterScene: "s6", questionEn: "Who finds the answer?", questionEs: "¿Quién encuentra la respuesta?", options: [{ label: "Mateo", emoji: "👦" }, { label: "Ana", emoji: "👩‍💼" }, { label: "Dylan", emoji: "🧑" }], answer: 0, sayIt: "Mateo finds the answer.", sayItEs: "Repite: «Mateo encuentra la respuesta.»" },
    { id: "q3", afterScene: "s8", questionEn: "How many clients are okay now?", questionEs: "¿Cuántos clientes están bien ahora?", options: [{ label: "Fifty", emoji: "5️⃣0️⃣" }, { label: "Five", emoji: "5️⃣" }, { label: "One", emoji: "1️⃣" }], answer: 0, sayIt: "Fifty clients are okay now.", sayItEs: "Repite: «Cincuenta clientes están bien ahora.»" },
  ],
  mindsetCard: { afterScene: "s2", phrase: "I love challenges.", es: "Amo los retos." },
  continuePrompt: { en: "Your team needs you: say you are ready and you help each other.", es: "Tu equipo te necesita: di que estás listo/a y que se ayudan unos a otros." }, continueWith: ["I am ready.", "We are a team.", "We help each other.", "Good job!"],
  cliffhanger: { en: "Tomorrow is Luis's big day. Can he do it?", es: "Mañana es el gran día de Luis. ¿Podrá lograrlo?" },
};
