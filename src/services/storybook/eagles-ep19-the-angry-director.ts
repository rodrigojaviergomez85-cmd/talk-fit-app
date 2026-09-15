import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/eagles-ep19-the-angry-director/cover.jpg";
import s1 from "@/assets/storybook/eagles-ep19-the-angry-director/s1.jpg";
import s2 from "@/assets/storybook/eagles-ep19-the-angry-director/s2.jpg";
import s3 from "@/assets/storybook/eagles-ep19-the-angry-director/s3.jpg";
import s4 from "@/assets/storybook/eagles-ep19-the-angry-director/s4.jpg";
import s5 from "@/assets/storybook/eagles-ep19-the-angry-director/s5.jpg";
import s6 from "@/assets/storybook/eagles-ep19-the-angry-director/s6.jpg";
import s7 from "@/assets/storybook/eagles-ep19-the-angry-director/s7.jpg";
import s8 from "@/assets/storybook/eagles-ep19-the-angry-director/s8.jpg";
import s9 from "@/assets/storybook/eagles-ep19-the-angry-director/s9.jpg";
import s10 from "@/assets/storybook/eagles-ep19-the-angry-director/s10.jpg";

/**
 * Season 6 (Eagles) Episode 19 — "The angry director".
 * Eagles day 19: customer service #2 — acknowledge, summarize, own, solve, confirm.
 */
export const EAGLES_EP19_THE_ANGRY_DIRECTOR: StorybookEpisode = {
  id: "eagles-ep19-the-angry-director",
  moduleId: "eagles-week-1",
  week: 4,
  title: "The angry director",
  titleEs: "El director molesto",
  episodeLabel: { en: "Season 6 · Episode 19", es: "Temporada 6 · Episodio 19" },
  previously: [
    { en: "Dani told his two-year story.", es: "Dani contó su historia de dos años." },
    { en: "Morgan invited him to Miami.", es: "Morgan lo invitó a Miami." },
    { en: "A director called at midnight.", es: "Un director llamó a medianoche." },
  ],
  reviewWords: [
    { word: "sorry", es: "lo siento" },
    { word: "solve", es: "resolver" },
    { word: "confirm", es: "confirmar" },
  ],
  blurb: {
    en: "One angry call, five steps and no excuses. Vale handles the worst conversation of the contract.",
    es: "Una llamada molesta, cinco pasos y cero excusas. Vale maneja la peor conversación del contrato.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale answers the phone at midnight in a dark kitchen.",
      text: "11:59 p.m. Vale answers on the second ring.",
      es: "11:59 p.m. Vale contesta al segundo timbre.",
      speaker: "boss",
      lines: [
        { speaker: "boss", text: "Six of my people missed the evening session. Nobody told me.", es: "«Seis de mi gente faltó a la sesión de la tarde. Nadie me avisó»." },
        { speaker: "vale", text: "I understand. That should not happen, and it is my responsibility.", es: "«Entiendo. Eso no debería pasar, y es mi responsabilidad»." },
        { speaker: "boss", text: "So what happened?", es: "«¿Entonces qué pasó?»" },
      ],
      words: [
        { word: "missed", es: "faltó" },
        { word: "session", es: "sesión" },
        { word: "responsibility", es: "responsabilidad" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale takes notes on paper while listening on the phone.",
      text: "Vale writes while he talks. She does not interrupt.",
      es: "Vale escribe mientras él habla. No lo interrumpe.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Let me summarize: six people, the evening group, and no message from us.", es: "«Déjeme resumir: seis personas, el grupo de la tarde y ningún aviso de nosotros»." },
        { speaker: "boss", text: "Correct. And my report goes out tomorrow.", es: "«Correcto. Y mi reporte sale mañana»." },
        { speaker: "vale", text: "Then I will give you the facts before your report.", es: "«Entonces le voy a dar los datos antes de su reporte»." },
      ],
      words: [
        { word: "summarize", es: "resumir" },
        { word: "message", es: "aviso" },
        { word: "facts", es: "datos" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale calls Luis at midnight and he answers from his bed.",
      text: "12:14 a.m. Vale calls Luis.",
      es: "12:14 a.m. Vale llama a Luis.",
      speaker: "luis",
      lines: [
        { speaker: "luis", text: "The company moved our shift yesterday. Six of us worked until nine.", es: "«La empresa movió nuestro turno ayer. Seis trabajamos hasta las nueve»." },
        { speaker: "vale", text: "Did anybody tell the school?", es: "«¿Alguien le avisó a la escuela?»" },
        { speaker: "luis", text: "We thought their office told you. I am sorry.", es: "«Pensamos que su oficina les avisó. Lo siento»." },
      ],
      words: [
        { word: "moved", es: "movió" },
        { word: "shift", es: "turno" },
        { word: "office", es: "oficina" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale and Dani prepare a one-page report early in the morning.",
      text: "5:30 a.m. One page, no blame.",
      es: "5:30 a.m. Una página, sin culpar a nadie.",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "You can write that their office changed the shift.", es: "«Puedes escribir que su oficina cambió el turno»." },
        { speaker: "vale", text: "I can. But first I own my part: we did not confirm attendance.", es: "«Puedo. Pero primero asumo mi parte: no confirmamos la asistencia»." },
        { speaker: "dani", text: "That sentence is going to cost us.", es: "«Esa frase nos va a costar»." },
      ],
      words: [
        { word: "blame", es: "culpa" },
        { word: "attendance", es: "asistencia" },
        { word: "cost", es: "costar" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale speaks on a morning video call with the director.",
      text: "7:00 a.m. The second call.",
      es: "7:00 a.m. La segunda llamada.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "I am sorry for the confusion last night. Here is what happened and what I will do.", es: "«Lamento la confusión de anoche. Esto es lo que pasó y lo que voy a hacer»." },
        { speaker: "boss", text: "Continue.", es: "«Continúe»." },
        { speaker: "vale", text: "Two solutions: a recovery class Saturday and attendance confirmed every morning.", es: "«Dos soluciones: una clase de recuperación el sábado y asistencia confirmada cada mañana»." },
      ],
      words: [
        { word: "confusion", es: "confusión" },
        { word: "recovery", es: "recuperación" },
        { word: "solutions", es: "soluciones" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "The director listens with his arms crossed on the screen.",
      text: "The director tests the promise.",
      es: "El director pone a prueba la promesa.",
      speaker: "boss",
      lines: [
        { speaker: "boss", text: "And if my office changes the shift again?", es: "«¿Y si mi oficina cambia el turno otra vez?»" },
        { speaker: "vale", text: "Then Luis writes one message to us, and we move the class the same day.", es: "«Entonces Luis nos manda un mensaje y movemos la clase el mismo día»." },
        { speaker: "boss", text: "You are not blaming my office. Why not?", es: "«No está culpando a mi oficina. ¿Por qué no?»" },
      ],
      words: [
        { word: "changes", es: "cambia" },
        { word: "same", es: "mismo" },
        { word: "blaming", es: "culpando" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale answers calmly in front of her laptop.",
      text: "Vale gives the honest answer.",
      es: "Vale da la respuesta honesta.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Because blame does not teach anybody English.", es: "«Porque la culpa no le enseña inglés a nadie»." },
        { speaker: "boss", text: "Saturday works. Confirm it in writing.", es: "«El sábado funciona. Confírmelo por escrito»." },
        { speaker: "vale", text: "You will have it in ten minutes. Thank you for calling me directly.", es: "«Lo tendrá en diez minutos. Gracias por llamarme directamente»." },
      ],
      words: [
        { word: "teach", es: "enseñar" },
        { word: "writing", es: "escrito" },
        { word: "minutes", es: "minutos" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Saturday recovery class with six students in the school.",
      text: "Saturday, 9:00 a.m. Six chairs, six people.",
      es: "Sábado, 9:00 a.m. Seis sillas, seis personas.",
      speaker: "kat",
      lines: [
        { speaker: "kat", text: "You did not have to open on Saturday.", es: "«No tenías que abrir el sábado»." },
        { speaker: "vale", text: "I said I would solve it. Saying it is half of solving it.", es: "«Dije que lo iba a resolver. Decirlo es la mitad de resolverlo»." },
        { speaker: "luis", text: "That is why we are here at nine on a Saturday.", es: "«Por eso estamos aquí a las nueve un sábado»." },
      ],
      words: [
        { word: "saturday", es: "sábado" },
        { word: "solve", es: "resolver" },
        { word: "half", es: "mitad" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Morgan reads the director's short email on her phone, smiling.",
      text: "Monday. The director writes to Morgan.",
      es: "Lunes. El director le escribe a Morgan.",
      speaker: "morgan",
      lines: [
        { speaker: "morgan", text: "He wrote four words: \"She owns her mistakes.\"", es: "«Escribió cuatro palabras: “Ella asume sus errores”»." },
        { speaker: "vale", text: "That was the worst call of my year.", es: "«Esa fue la peor llamada de mi año»." },
        { speaker: "morgan", text: "And the reason your contract is on the table tomorrow.", es: "«Y la razón por la que tu contrato está en la mesa mañana»." },
      ],
      words: [
        { word: "wrote", es: "escribió" },
        { word: "owns", es: "asume" },
        { word: "contract", es: "contrato" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale packs a small suitcase next to a printed proposal.",
      text: "9:30 p.m. The suitcase and the proposal wait by the door.",
      es: "9:30 p.m. La maleta y la propuesta esperan junto a la puerta.",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "Tomorrow they decide the whole year in one meeting.", es: "«Mañana deciden todo el año en una reunión»." },
        { speaker: "vale", text: "Then tomorrow I sell like I teach: with questions.", es: "«Entonces mañana vendo como enseño: con preguntas»." },
        { speaker: "narrator", text: "One table. Two directors. One price to defend.", es: "Una mesa. Dos directores. Un precio que defender." },
      ],
      words: [
        { word: "suitcase", es: "maleta" },
        { word: "decide", es: "deciden" },
        { word: "sell", es: "vender" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s2",
      questionEn: "What did Vale do before answering the director?",
      questionEs: "¿Qué hizo Vale antes de responderle al director?",
      options: [
        { label: "She summarized the problem", emoji: "📝" },
        { label: "She blamed the students", emoji: "👉" },
        { label: "She ended the call", emoji: "📵" },
      ],
      answer: 0,
      sayIt: "She summarized the problem.",
      sayItEs: "Ejemplo: «She summarized the problem.»",
      sayItAskEn: "A client is angry with you. Start the answer. Use: I understand… I'm sorry…",
      sayItAskEs: "Un cliente está molesto contigo. Empieza la respuesta. Usa: I understand… I'm sorry…",
      sayItCheck: {
        target: "I understand *",
        altTargets: ["I'm sorry *", "I am sorry *", "I understand and I'm sorry *"],
      },
    },
    {
      id: "q2",
      afterScene: "s5",
      questionEn: "What two solutions did Vale offer?",
      questionEs: "¿Qué dos soluciones ofreció Vale?",
      options: [
        { label: "A Saturday class and daily attendance confirmation", emoji: "✅" },
        { label: "A discount and a new teacher", emoji: "💵" },
        { label: "More homework for everybody", emoji: "📚" },
      ],
      answer: 0,
      sayIt: "A Saturday class and daily confirmation.",
      sayItEs: "Ejemplo: «A Saturday class and daily confirmation.»",
      sayItAskEn: "Offer a solution to an upset customer. Use: I will…",
      sayItAskEs: "Ofrece una solución a un cliente molesto. Usa: I will…",
      sayItCheck: {
        target: "I will *",
        altTargets: ["I'll *", "I will solve *", "I will send *"],
      },
    },
    {
      id: "q3",
      afterScene: "s7",
      questionEn: "Why did Vale not blame the director's office?",
      questionEs: "¿Por qué Vale no culpó a la oficina del director?",
      options: [
        { label: "Because blame does not teach anybody English", emoji: "🎯" },
        { label: "Because she was afraid of him", emoji: "😨" },
        { label: "Because the office paid her", emoji: "💰" },
      ],
      answer: 0,
      sayIt: "Because blame does not teach anybody English.",
      sayItEs: "Ejemplo: «Because blame does not teach anybody English.»",
      sayItAskEn: "Close the conversation and confirm the next step. Use: I will confirm…",
      sayItAskEs: "Cierra la conversación y confirma el siguiente paso. Usa: I will confirm…",
      sayItCheck: {
        target: "I will confirm *",
        altTargets: ["I'll confirm *", "I will send you *", "I will call you *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s8",
    phrase: "I own my mistakes. Mistakes are part of the process.",
    es: "Asumo mis errores. Los errores son parte del proceso.",
  },
  habitCard: {
    afterScene: "s2",
    phrase: "I listen completely before I answer.",
    es: "Escucho completo antes de responder.",
    model: "vale",
    modelActionEs: "Vale toma notas y resume antes de contestar al director.",
  },
  continuePrompt: {
    en: "Somebody is upset with your work. Answer in five steps: understand, summarize, own it, solve it, confirm.",
    es: "Alguien está molesto con tu trabajo. Responde en cinco pasos: entiende, resume, asume, resuelve, confirma.",
  },
  continueWith: ["I understand ...", "I'm sorry ...", "I will ..."],
  cliffhanger: {
    en: "Episode 20: The contract meeting — one table, two directors, one price to defend.",
    es: "Episodio 20: La reunión del contrato: una mesa, dos directores, un precio que defender.",
  },
};
