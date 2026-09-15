import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/eagles-ep20-the-contract/cover.jpg";
import s1 from "@/assets/storybook/eagles-ep20-the-contract/s1.jpg";
import s2 from "@/assets/storybook/eagles-ep20-the-contract/s2.jpg";
import s3 from "@/assets/storybook/eagles-ep20-the-contract/s3.jpg";
import s4 from "@/assets/storybook/eagles-ep20-the-contract/s4.jpg";
import s5 from "@/assets/storybook/eagles-ep20-the-contract/s5.jpg";
import s6 from "@/assets/storybook/eagles-ep20-the-contract/s6.jpg";
import s7 from "@/assets/storybook/eagles-ep20-the-contract/s7.jpg";
import s8 from "@/assets/storybook/eagles-ep20-the-contract/s8.jpg";
import s9 from "@/assets/storybook/eagles-ep20-the-contract/s9.jpg";
import s10 from "@/assets/storybook/eagles-ep20-the-contract/s10.jpg";

/**
 * Season 6 (Eagles) Episode 20 — "The contract".
 * Eagles day 20: consultative sales — discover, compare, recommend,
 * handle the objection, close. Season finale.
 */
export const EAGLES_EP20_THE_CONTRACT: StorybookEpisode = {
  id: "eagles-ep20-the-contract",
  moduleId: "eagles-week-1",
  week: 4,
  title: "The contract",
  titleEs: "El contrato",
  episodeLabel: { en: "Season 6 · Episode 20", es: "Temporada 6 · Episodio 20" },
  previously: [
    { en: "Vale owned the mistake and solved it.", es: "Vale asumió el error y lo resolvió." },
    { en: "The director wrote to Morgan.", es: "El director le escribió a Morgan." },
    { en: "The contract meeting is today.", es: "La reunión del contrato es hoy." },
  ],
  reviewWords: [
    { word: "recommend", es: "recomiendo" },
    { word: "objection", es: "objeción" },
    { word: "close", es: "cerrar" },
  ],
  blurb: {
    en: "Miami, one table, two directors and a price. Vale sells the way she teaches: with questions.",
    es: "Miami, una mesa, dos directores y un precio. Vale vende como enseña: con preguntas.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale and Dani walk out of an airport with small suitcases.",
      text: "Miami, 8:20 a.m. The air is different.",
      es: "Miami, 8:20 a.m. El aire es diferente.",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "You have not said one word since the airplane.", es: "«No has dicho una palabra desde el avión»." },
        { speaker: "vale", text: "I am saving them. I have been preparing this for three weeks.", es: "«Las estoy guardando. Llevo tres semanas preparando esto»." },
        { speaker: "dani", text: "Then let's go sell a year of classes.", es: "«Entonces vamos a vender un año de clases»." },
      ],
      words: [
        { word: "airplane", es: "avión" },
        { word: "saving", es: "guardando" },
        { word: "sell", es: "vender" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Morgan greets Vale and Dani in a bright office lobby.",
      text: "Morgan is exactly like her voice.",
      es: "Morgan es exactamente como su voz.",
      speaker: "morgan",
      lines: [
        { speaker: "morgan", text: "Two directors, forty minutes. One of them says no to everything.", es: "«Dos directores, cuarenta minutos. Uno de ellos le dice que no a todo»." },
        { speaker: "vale", text: "Good. I have practiced with a person like that.", es: "«Bien. He practicado con una persona así»." },
        { speaker: "morgan", text: "Do not sell the classes. Sell what happens after them.", es: "«No vendas las clases. Vende lo que pasa después de ellas»." },
      ],
      words: [
        { word: "minutes", es: "minutos" },
        { word: "practiced", es: "practicado" },
        { word: "after", es: "después" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale starts the meeting by asking questions instead of presenting.",
      text: "9:00 a.m. Vale does not open her slides.",
      es: "9:00 a.m. Vale no abre sus diapositivas.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Before I show anything: what happens when a client asks for a supervisor in English?", es: "«Antes de mostrar algo: ¿qué pasa cuando un cliente pide un supervisor en inglés?»" },
        { speaker: "boss", text: "We transfer the call to Dallas and we lose eleven minutes.", es: "«Transferimos la llamada a Dallas y perdemos once minutos»." },
        { speaker: "vale", text: "Eleven minutes, how many times a day?", es: "«Once minutos, ¿cuántas veces al día?»" },
      ],
      words: [
        { word: "supervisor", es: "supervisor" },
        { word: "transfer", es: "transferir" },
        { word: "lose", es: "perder" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "A director writes a number on a notepad and turns it around.",
      text: "The director writes the number himself.",
      es: "El director escribe el número él mismo.",
      speaker: "boss",
      lines: [
        { speaker: "boss", text: "Nine times a day. Every day.", es: "«Nueve veces al día. Todos los días»." },
        { speaker: "vale", text: "So the question is not the price of the class. It is the price of those minutes.", es: "«Entonces la pregunta no es el precio de la clase. Es el precio de esos minutos»." },
        { speaker: "morgan", text: "Keep going.", es: "«Sigue»." },
      ],
      words: [
        { word: "times", es: "veces" },
        { word: "question", es: "pregunta" },
        { word: "price", es: "precio" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale plays student recordings on a laptop for the directors.",
      text: "Then she plays two recordings from the same person.",
      es: "Luego pone dos grabaciones de la misma persona.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Day one and day sixty. Same voice, same man, same job.", es: "«Día uno y día sesenta. La misma voz, el mismo hombre, el mismo trabajo»." },
        { speaker: "luis", text: "Hello, my name is Luis. How may I help you today?", es: "«Hola, me llamo Luis. ¿Cómo puedo ayudarle hoy?»" },
        { speaker: "boss", text: "That is one of my people.", es: "«Ese es uno de los míos»." },
      ],
      words: [
        { word: "voice", es: "voz" },
        { word: "sixty", es: "sesenta" },
        { word: "help", es: "ayudar" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale compares two simple options on one printed page.",
      text: "Two options, one page, no tricks.",
      es: "Dos opciones, una página, sin trucos.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Option one is cheaper and slower. Option two is the fastest for your calls.", es: "«La opción uno es más barata y más lenta. La opción dos es la más rápida para sus llamadas»." },
        { speaker: "boss", text: "Which one do you recommend?", es: "«¿Cuál recomienda?»" },
        { speaker: "vale", text: "I recommend option two, because your problem is time, not vocabulary.", es: "«Recomiendo la opción dos, porque su problema es el tiempo, no el vocabulario»." },
      ],
      words: [
        { word: "options", es: "opciones" },
        { word: "recommend", es: "recomiendo" },
        { word: "vocabulary", es: "vocabulario" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "The second director leans forward with a hard question.",
      text: "10:12 a.m. The objection arrives.",
      es: "10:12 a.m. Llega la objeción.",
      speaker: "boss",
      lines: [
        { speaker: "boss", text: "Your school is small. What happens if you get sick?", es: "«Su escuela es pequeña. ¿Qué pasa si usted se enferma?»" },
        { speaker: "vale", text: "Good question. Two teachers already teach the program, and Dani runs the online days.", es: "«Buena pregunta. Dos maestras ya dan el programa, y Dani lleva los días en línea»." },
        { speaker: "dani", text: "And every class is recorded, so nobody loses a week.", es: "«Y cada clase queda grabada, así nadie pierde una semana»." },
      ],
      words: [
        { word: "small", es: "pequeña" },
        { word: "sick", es: "enfermo" },
        { word: "recorded", es: "grabada" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale asks for the decision with her hands calm on the table.",
      text: "Vale closes the way she practiced in the mirror.",
      es: "Vale cierra como practicó en el espejo.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "If we start in two weeks, your team answers those calls in June. Do we start?", es: "«Si empezamos en dos semanas, su equipo contesta esas llamadas en junio. ¿Empezamos?»" },
        { speaker: "boss", text: "Twelve people first. Then the other floor.", es: "«Primero doce personas. Luego el otro piso»." },
        { speaker: "morgan", text: "That is a yes, in director language.", es: "«Eso es un sí, en idioma de director»." },
      ],
      words: [
        { word: "start", es: "empezar" },
        { word: "june", es: "junio" },
        { word: "floor", es: "piso" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale signs the contract while Dani films it on his phone.",
      text: "10:40 a.m. The pen is heavier than it looks.",
      es: "10:40 a.m. El lapicero pesa más de lo que parece.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Two years ago I could not order coffee in English.", es: "«Hace dos años no podía pedir un café en inglés»." },
        { speaker: "dani", text: "And today you signed a contract in English.", es: "«Y hoy firmaste un contrato en inglés»." },
        { speaker: "vale", text: "Say it with me: English is easy. I can do it.", es: "«Dilo conmigo: el inglés es fácil. Yo puedo hacerlo»." },
      ],
      words: [
        { word: "coffee", es: "café" },
        { word: "signed", es: "firmaste" },
        { word: "easy", es: "fácil" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale and Dani call the school team from a Miami street at night.",
      text: "8:00 p.m. The whole school answers the video call.",
      es: "8:00 p.m. Toda la escuela contesta la videollamada.",
      speaker: "camila",
      lines: [
        { speaker: "camila", text: "Did you sign it?", es: "«¿Lo firmaste?»" },
        { speaker: "vale", text: "We signed it. Twelve people, and then a whole floor.", es: "«Lo firmamos. Doce personas, y después un piso entero»." },
        { speaker: "narrator", text: "That same night, another school copies Vale's program word by word.", es: "Esa misma noche, otra escuela copia el programa de Vale palabra por palabra." },
      ],
      words: [
        { word: "sign", es: "firmar" },
        { word: "school", es: "escuela" },
        { word: "night", es: "noche" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What did Vale do before showing her slides?",
      questionEs: "¿Qué hizo Vale antes de mostrar sus diapositivas?",
      options: [
        { label: "She asked questions about their real problem", emoji: "❓" },
        { label: "She gave a discount", emoji: "🏷️" },
        { label: "She talked about grammar", emoji: "📘" },
      ],
      answer: 0,
      sayIt: "She asked questions first.",
      sayItEs: "Ejemplo: «She asked questions first.»",
      sayItAskEn: "Recommend something to a client and give the reason. Use: I recommend… because…",
      sayItAskEs: "Recomiéndale algo a un cliente y da la razón. Usa: I recommend… because…",
      sayItCheck: {
        target: "I recommend * because *",
        altTargets: ["I recommend *", "I would recommend * because *", "I recommend option *"],
      },
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "How did Vale answer the objection about the school being small?",
      questionEs: "¿Cómo respondió Vale a la objeción de que la escuela es pequeña?",
      options: [
        { label: "Two teachers and recorded classes", emoji: "🎥" },
        { label: "She lowered the price", emoji: "💸" },
        { label: "She said nothing", emoji: "🤐" },
      ],
      answer: 0,
      sayIt: "Two teachers teach and every class is recorded.",
      sayItEs: "Ejemplo: «Two teachers teach and every class is recorded.»",
      sayItAskEn: "A client says you are too expensive. Answer it. Use: I understand, and…",
      sayItAskEs: "Un cliente dice que eres muy caro. Respóndele. Usa: I understand, and…",
      sayItCheck: {
        target: "I understand and *",
        altTargets: ["I understand, and *", "I understand *", "I recommend * because *"],
      },
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "What did Vale say about two years ago?",
      questionEs: "¿Qué dijo Vale sobre hace dos años?",
      options: [
        { label: "She could not order coffee in English", emoji: "☕" },
        { label: "She already had two schools", emoji: "🏫" },
        { label: "She lived in Miami", emoji: "🌴" },
      ],
      answer: 0,
      sayIt: "She could not order coffee in English.",
      sayItEs: "Ejemplo: «She could not order coffee in English.»",
      sayItAskEn: "Close a sale with a next step. Use: If we start…, I recommend…",
      sayItAskEs: "Cierra una venta con un siguiente paso. Usa: If we start…, I recommend…",
      sayItCheck: {
        target: "If we start * I recommend *",
        altTargets: ["I recommend *", "If we start *", "I recommend we start *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s9",
    phrase: "English is easy. I can do it.",
    es: "El inglés es fácil. Yo puedo hacerlo.",
  },
  habitCard: {
    afterScene: "s3",
    phrase: "I ask questions before I give answers.",
    es: "Hago preguntas antes de dar respuestas.",
    model: "vale",
    modelActionEs: "Vale empieza la reunión preguntando, no presentando.",
  },
  continuePrompt: {
    en: "Sell something you know well: ask, compare, recommend and close.",
    es: "Vende algo que conozcas bien: pregunta, compara, recomienda y cierra.",
  },
  continueWith: ["I recommend ...", "because ...", "If we start ..."],
  cliffhanger: {
    en: "Season 7: Somebody is copying Vale's program word by word.",
    es: "Temporada 7: Alguien está copiando el programa de Vale palabra por palabra.",
  },
};
