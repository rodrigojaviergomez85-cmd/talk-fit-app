import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/eagles-ep7-have-you-ever/cover.jpg";
import s1 from "@/assets/storybook/eagles-ep7-have-you-ever/s1.jpg";
import s2 from "@/assets/storybook/eagles-ep7-have-you-ever/s2.jpg";
import s3 from "@/assets/storybook/eagles-ep7-have-you-ever/s3.jpg";
import s4 from "@/assets/storybook/eagles-ep7-have-you-ever/s4.jpg";
import s5 from "@/assets/storybook/eagles-ep7-have-you-ever/s5.jpg";
import s6 from "@/assets/storybook/eagles-ep7-have-you-ever/s6.jpg";
import s7 from "@/assets/storybook/eagles-ep7-have-you-ever/s7.jpg";
import s8 from "@/assets/storybook/eagles-ep7-have-you-ever/s8.jpg";
import s9 from "@/assets/storybook/eagles-ep7-have-you-ever/s9.jpg";
import s10 from "@/assets/storybook/eagles-ep7-have-you-ever/s10.jpg";

/**
 * Season 6 (Eagles) Episode 7 — "Have you ever?".
 * Eagles day 7: present perfect for experiences (+ one concrete example).
 */
export const EAGLES_EP7_HAVE_YOU_EVER: StorybookEpisode = {
  id: "eagles-ep7-have-you-ever",
  moduleId: "eagles-week-1",
  week: 2,
  title: "Have you ever?",
  titleEs: "¿Alguna vez?",
  episodeLabel: { en: "Season 6 · Episode 7", es: "Temporada 6 · Episodio 7" },
  previously: [
    { en: "The contract is signed.", es: "El contrato está firmado." },
    { en: "Thirty students, three groups.", es: "Treinta estudiantes, tres grupos." },
    { en: "The first class starts Monday.", es: "La primera clase empieza el lunes." },
  ],
  reviewWords: [
    { word: "ever", es: "alguna vez" },
    { word: "never", es: "nunca" },
    { word: "experience", es: "experiencia" },
  ],
  blurb: {
    en: "The first corporate class begins. One student has never said a full sentence in English out loud.",
    es: "Empieza la primera clase corporativa. Un estudiante nunca ha dicho una oración completa en inglés en voz alta.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Monday morning in a bright classroom with ten adults in work clothes.",
      text: "Monday, 8:00. Ten adults in work clothes. Nobody is smiling.",
      es: "Lunes, 8:00. Diez adultos con ropa de trabajo. Nadie sonríe.",
      speaker: "narrator",
      lines: [
        { speaker: "narrator", text: "Monday, 8:00. Ten adults in work clothes. Nobody is smiling.", es: "Lunes, 8:00. Diez adultos con ropa de trabajo. Nadie sonríe." },
        { speaker: "vale", text: "Good morning. Have you ever studied English before?", es: "«Buenos días. ¿Alguna vez han estudiado inglés antes?»" },
        { speaker: "kat", text: "I have studied twice. I have never finished.", es: "«He estudiado dos veces. Nunca he terminado»." },
      ],
      words: [
        { word: "morning", es: "mañana" },
        { word: "studied", es: "estudiado" },
        { word: "finished", es: "terminado" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale stands next to a whiteboard talking to the corporate class.",
      text: "Vale asks the question of the day.",
      es: "Vale hace la pregunta del día.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Have you ever spoken English with a client?", es: "«¿Alguna vez han hablado inglés con un cliente?»" },
        { speaker: "boss", text: "I have. Once. It was three minutes and I sweated for an hour.", es: "«Yo sí. Una vez. Fueron tres minutos y sudé una hora»." },
        { speaker: "vale", text: "Perfect. That's an experience. Today we use it.", es: "«Perfecto. Eso es una experiencia. Hoy la usamos»." },
      ],
      words: [
        { word: "spoken", es: "hablado" },
        { word: "client", es: "cliente" },
        { word: "minutes", es: "minutos" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "A shy young man in a company shirt looks down at his desk.",
      text: "One student says nothing.",
      es: "Un estudiante no dice nada.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "And you? Have you ever said a full sentence in English?", es: "«¿Y tú? ¿Alguna vez has dicho una oración completa en inglés?»" },
        { speaker: "beto", text: "No. I have never said one out loud.", es: "«No. Nunca he dicho una en voz alta»." },
        { speaker: "vale", text: "You just did. That was a full sentence.", es: "«Acabas de hacerlo. Esa fue una oración completa»." },
      ],
      words: [
        { word: "full", es: "completa" },
        { word: "sentence", es: "oración" },
        { word: "loud", es: "fuerte / en voz alta" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "The class laughs and the shy student smiles for the first time.",
      text: "The room changes temperature.",
      es: "El salón cambia de temperatura.",
      speaker: "kat",
      lines: [
        { speaker: "kat", text: "He has spoken more than me today.", es: "«Él ha hablado más que yo hoy»." },
        { speaker: "beto", text: "I have decided something. I am going to try.", es: "«He decidido algo. Voy a intentarlo»." },
        { speaker: "vale", text: "English is easy when you start with one sentence.", es: "«El inglés es fácil cuando empiezas con una oración»." },
      ],
      words: [
        { word: "more", es: "más" },
        { word: "decided", es: "decidido" },
        { word: "try", es: "intentar" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Dani writes student answers on a flipchart at the back of the room.",
      text: "Dani collects the experiences on paper.",
      es: "Dani recoge las experiencias en papel.",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "Three people have travelled. Two have worked with Americans.", es: "«Tres personas han viajado. Dos han trabajado con estadounidenses»." },
        { speaker: "dani", text: "Nobody has practiced speaking every day.", es: "«Nadie ha practicado hablar todos los días»." },
        { speaker: "vale", text: "That's our job for six months.", es: "«Ese es nuestro trabajo por seis meses»." },
      ],
      words: [
        { word: "travelled", es: "viajado" },
        { word: "worked", es: "trabajado" },
        { word: "practiced", es: "practicado" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Morgan joins the class on a laptop screen at the side of the room.",
      text: "Morgan joins for two minutes.",
      es: "Morgan se conecta dos minutos.",
      speaker: "morgan",
      lines: [
        { speaker: "morgan", text: "Have you ever had a class at eight in the morning?", es: "«¿Alguna vez han tenido clase a las ocho de la mañana?»" },
        { speaker: "boss", text: "We have now. And it has been better than the coffee.", es: "«Ahora sí. Y ha estado mejor que el café»." },
        { speaker: "morgan", text: "Good. I have seen many programs. This one is different.", es: "«Bien. He visto muchos programas. Este es diferente»." },
      ],
      words: [
        { word: "class", es: "clase" },
        { word: "coffee", es: "café" },
        { word: "programs", es: "programas" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Camila hands out small cards with question prompts to the students.",
      text: "Camila gives each student a card.",
      es: "Camila le da una tarjeta a cada estudiante.",
      speaker: "camila",
      lines: [
        { speaker: "camila", text: "Ask your partner: have you ever worked on a weekend?", es: "«Pregúntale a tu compañero: have you ever worked on a weekend?»" },
        { speaker: "kat", text: "I have worked on twenty weekends this year.", es: "«He trabajado veinte fines de semana este año»." },
        { speaker: "beto", text: "I have worked on one. It was enough.", es: "«He trabajado uno. Fue suficiente»." },
      ],
      words: [
        { word: "partner", es: "compañero" },
        { word: "weekend", es: "fin de semana" },
        { word: "enough", es: "suficiente" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale listens closely to a student while the class works in pairs.",
      text: "Vale walks between the desks.",
      es: "Vale camina entre los escritorios.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Don't translate. Give me one example.", es: "«No traduzcas. Dame un ejemplo»." },
        { speaker: "beto", text: "I have called a hotel in Miami. I said three words.", es: "«He llamado a un hotel en Miami. Dije tres palabras»." },
        { speaker: "vale", text: "Three words is a start. Mistakes are part of the process.", es: "«Tres palabras es un inicio. Los errores son parte del proceso»." },
      ],
      words: [
        { word: "example", es: "ejemplo" },
        { word: "called", es: "llamado" },
        { word: "words", es: "palabras" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale and Dani talk in the hallway after the class ends.",
      text: "Nine fifteen. The first class is over.",
      es: "Nueve y cuarto. Termina la primera clase.",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "Have you ever taught a company before?", es: "«¿Alguna vez habías enseñado a una empresa?»" },
        { speaker: "vale", text: "Never. I have taught teenagers, neighbors and my mom.", es: "«Nunca. He enseñado a adolescentes, vecinos y a mi mamá»." },
        { speaker: "dani", text: "Then today you have done something new.", es: "«Entonces hoy has hecho algo nuevo»." },
      ],
      words: [
        { word: "taught", es: "enseñado" },
        { word: "teenagers", es: "adolescentes" },
        { word: "new", es: "nuevo" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "The shy student stops Vale at the door with a serious face.",
      text: "One student waits at the door.",
      es: "Un estudiante espera en la puerta.",
      speaker: "beto",
      lines: [
        { speaker: "beto", text: "Teacher. I have a problem with Thursday.", es: "«Maestra. Tengo un problema con el jueves»." },
        { speaker: "beto", text: "My manager has moved my shift to the morning.", es: "«Mi jefe ha movido mi turno a la mañana»." },
        { speaker: "vale", text: "Then we have a new problem to solve.", es: "«Entonces tenemos un problema nuevo que resolver»." },
      ],
      words: [
        { word: "problem", es: "problema" },
        { word: "manager", es: "jefe" },
        { word: "shift", es: "turno" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What has Beto never done before today?",
      questionEs: "¿Qué nunca había hecho Beto antes de hoy?",
      options: [
        { label: "He has never said a full sentence in English out loud", emoji: "🤐" },
        { label: "He has never used a computer", emoji: "💻" },
        { label: "He has never worked at night", emoji: "🌙" },
      ],
      answer: 0,
      sayIt: "He has never said a full sentence out loud.",
      sayItEs: "Ejemplo: «He has never said a full sentence out loud.»",
      sayItAskEn: "Tell me one thing you have never done. Use: I have never…",
      sayItAskEs: "Dime algo que nunca has hecho. Usa: I have never…",
      sayItCheck: {
        target: "I have never *",
        altTargets: ["I've never *", "I have never traveled *", "I have never spoken *"],
      },
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "What did Morgan say about the program?",
      questionEs: "¿Qué dijo Morgan del programa?",
      options: [
        { label: "She has seen many programs and this one is different", emoji: "⭐" },
        { label: "She has never seen a class", emoji: "🙈" },
        { label: "She wants to cancel the classes", emoji: "❌" },
      ],
      answer: 0,
      sayIt: "She has seen many programs, and this one is different.",
      sayItEs: "Ejemplo: «She has seen many programs, and this one is different.»",
      sayItAskEn: "Tell me one thing you have done this year. Use: I have…",
      sayItAskEs: "Dime algo que has hecho este año. Usa: I have…",
      sayItCheck: {
        target: "I have *",
        altTargets: ["I've *", "This year I have *", "I have studied *"],
      },
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "Has Vale taught a company before?",
      questionEs: "¿Vale había enseñado a una empresa antes?",
      options: [
        { label: "No, she has taught teenagers, neighbors and her mom", emoji: "🏫" },
        { label: "Yes, she has taught ten companies", emoji: "🏢" },
        { label: "No, she has never taught anybody", emoji: "🚫" },
      ],
      answer: 0,
      sayIt: "She has never taught a company before today.",
      sayItEs: "Ejemplo: «She has never taught a company before today.»",
      sayItAskEn: "Have you ever spoken English with a stranger? Answer with: I have… or I have never…",
      sayItAskEs: "¿Alguna vez has hablado inglés con un desconocido? Responde con: I have… o I have never…",
      sayItCheck: {
        target: "I have *",
        altTargets: ["I have never *", "I've *", "Yes, I have *", "No, I have never *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s4",
    phrase: "English is easy. I can do it.",
    es: "El inglés es fácil. Yo puedo.",
  },
  habitCard: {
    afterScene: "s8",
    phrase: "I speak before I feel ready. Three words today is better than a perfect sentence never.",
    es: "Hablo antes de sentirme lista. Tres palabras hoy valen más que una oración perfecta nunca.",
    model: "vale",
    modelActionEs: "Vale acepta las tres palabras de Beto y las celebra.",
  },
  continuePrompt: {
    en: "Talk about your experience with English. What have you done? What have you never done? Give one example.",
    es: "Habla de tu experiencia con el inglés. ¿Qué has hecho? ¿Qué nunca has hecho? Da un ejemplo.",
  },
  continueWith: ["I have ...", "I have never ...", "For example, ..."],
  cliffhanger: {
    en: "Episode 8: Beto's shift moves — and Vale has been losing sleep over the schedule.",
    es: "Episodio 8: Cambian el turno de Beto… y Vale ha estado perdiendo el sueño por el horario.",
  },
};
