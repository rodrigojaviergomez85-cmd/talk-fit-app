import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-ep16/cover.jpg";
import s1 from "@/assets/storybook/vale-ep16/s1.jpg"; import s2 from "@/assets/storybook/vale-ep16/s2.jpg"; import s3 from "@/assets/storybook/vale-ep16/s3.jpg"; import s4 from "@/assets/storybook/vale-ep16/s4.jpg"; import s5 from "@/assets/storybook/vale-ep16/s5.jpg"; import s6 from "@/assets/storybook/vale-ep16/s6.jpg"; import s7 from "@/assets/storybook/vale-ep16/s7.jpg"; import s8 from "@/assets/storybook/vale-ep16/s8.jpg"; import s9 from "@/assets/storybook/vale-ep16/s9.jpg"; import s10 from "@/assets/storybook/vale-ep16/s10.jpg";

export const VALE_LUIS_BIG_DAY: StorybookEpisode = {
  id: "vale-luis-big-day", moduleId: "basic-zero", week: 4, title: "Luis's big day", titleEs: "El gran día de Luis", episodeLabel: { en: "Episode 16", es: "Episodio 16" },
  previously: [{ en: "The team helped fifty clients together.", es: "El equipo ayudó a cincuenta clientes juntos." }, { en: "Ana says: good job, team!", es: "Ana dice: ¡buen trabajo, equipo!" }, { en: "Today is Luis's big interview.", es: "Hoy es la gran entrevista de Luis." }],
  reviewWords: [{ word: "interview", es: "entrevista" }, { word: "ready", es: "listo" }, { word: "team", es: "equipo" }],
  blurb: { en: "Luis has his big interview. The whole family believes in him.", es: "Luis tiene su gran entrevista. Toda la familia cree en él." }, cover, voice: "girl",
  scenes: [
    { id: "s1", image: s1, imageAlt: "Luis se prepara temprano frente al espejo.", text: "It is five in the morning. Luis is nervous, but he is ready.", es: "Son las cinco de la mañana. Luis está nervioso, pero está listo.", words: [{ word: "morning", es: "mañana" }, { word: "nervous", es: "nervioso" }] },
    { id: "s2", image: s2, imageAlt: "Vale anima a Luis en el desayuno.", text: '"You are ready, Luis. You can do it," says Vale.', es: "«Estás listo, Luis. Tú puedes», dice Vale.", speaker: "vale", words: [{ word: "can", es: "puedes" }, { word: "brother", es: "hermano" }] },
    { id: "s3", image: s3, imageAlt: "Luis espera el bus con su currículum.", text: "Luis waits for the bus. His interview is at nine.", es: "Luis espera el bus. Su entrevista es a las nueve.", words: [{ word: "bus", es: "bus" }, { word: "waits", es: "espera" }] },
    { id: "s4", image: s4, imageAlt: "Luis nervioso en la sala de espera.", text: "Luis is in the waiting room. His hands are cold.", es: "Luis está en la sala de espera. Sus manos están frías.", words: [{ word: "waiting room", es: "sala de espera" }, { word: "hands", es: "manos" }] },
    { id: "s5", image: s5, imageAlt: "Luis saluda a la entrevistadora.", text: '"Hello, my name is Luis. I am from El Salvador," says Luis.', es: "«Hola, me llamo Luis. Soy de El Salvador», dice Luis.", speaker: "luis", words: [{ word: "hello", es: "hola" }, { word: "from", es: "de" }] },
    { id: "s6", image: s6, imageAlt: "Luis habla con confianza.", text: '"I am disciplined. I practice every day," says Luis.', es: "«Soy disciplinado. Practico todos los días», dice Luis.", speaker: "luis", words: [{ word: "disciplined", es: "disciplinado" }, { word: "every day", es: "todos los días" }] },
    { id: "s7", image: s7, imageAlt: "La entrevista termina muy bien.", text: "The interviewer smiles. The interview is very good!", es: "La entrevistadora sonríe. ¡La entrevista es muy buena!", words: [{ word: "smiles", es: "sonríe" }, { word: "very", es: "muy" }] },
    { id: "s8", image: s8, imageAlt: "Vale y Mateo esperan el mensaje.", text: "At the office, Vale and Mateo wait for a message from Luis.", es: "En la oficina, Vale y Mateo esperan un mensaje de Luis.", words: [{ word: "wait", es: "esperan" }, { word: "message", es: "mensaje" }] },
    { id: "s9", image: s9, imageAlt: "Luis camina a casa feliz.", text: '"I believe in myself," says Luis with a big smile.', es: "«Creo en mí», dice Luis con una gran sonrisa.", speaker: "luis", words: [{ word: "believe", es: "creer" }, { word: "myself", es: "en mí" }] },
    { id: "s10", image: s10, imageAlt: "Luis recibe un mensaje y se emociona.", text: "At night, Luis's phone rings. It is a message from the company…", es: "Por la noche, el teléfono de Luis suena. Es un mensaje de la empresa…", words: [{ word: "night", es: "noche" }, { word: "company", es: "empresa" }] },
  ],
  quizzes: [
    { id: "q1", afterScene: "s2", questionEn: "Who has an interview today?", questionEs: "¿Quién tiene una entrevista hoy?", options: [{ label: "Luis", emoji: "🧔🏻" }, { label: "Vale", emoji: "👧" }, { label: "Mateo", emoji: "👦" }], answer: 0, sayIt: "Luis has an interview today.", sayItEs: "Repite: «Luis tiene una entrevista hoy.»" },
    { id: "q2", afterScene: "s5", questionEn: "Where is Luis from?", questionEs: "¿De dónde es Luis?", options: [{ label: "El Salvador", emoji: "🇸🇻" }, { label: "Canada", emoji: "🇨🇦" }, { label: "Honduras", emoji: "🇭🇳" }], answer: 0, sayIt: "He is from El Salvador.", sayItEs: "Repite: «Él es de El Salvador.»" },
    { id: "q3", afterScene: "s7", questionEn: "How is the interview?", questionEs: "¿Cómo es la entrevista?", options: [{ label: "Very good", emoji: "😄" }, { label: "Very bad", emoji: "😞" }, { label: "Boring", emoji: "🥱" }], answer: 0, sayIt: "The interview is very good.", sayItEs: "Repite: «La entrevista es muy buena.»" },
  ],
  mindsetCard: { afterScene: "s2", phrase: "I believe in myself.", es: "Creo en mí." },
  continuePrompt: { en: "Encourage someone today: tell them they are ready and they can do it.", es: "Anima a alguien hoy: dile que está listo/a y que puede lograrlo." }, continueWith: ["You are ready.", "You can do it.", "I believe in myself.", "Good luck!"],
  cliffhanger: { en: "Luis's phone rings at night. What does the message say?", es: "El teléfono de Luis suena por la noche. ¿Qué dice el mensaje?" },
};
