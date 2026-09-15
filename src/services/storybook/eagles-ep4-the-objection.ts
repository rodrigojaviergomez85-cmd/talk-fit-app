import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/eagles-ep4-the-objection/cover.jpg";
import s1 from "@/assets/storybook/eagles-ep4-the-objection/s1.jpg";
import s2 from "@/assets/storybook/eagles-ep4-the-objection/s2.jpg";
import s3 from "@/assets/storybook/eagles-ep4-the-objection/s3.jpg";
import s4 from "@/assets/storybook/eagles-ep4-the-objection/s4.jpg";
import s5 from "@/assets/storybook/eagles-ep4-the-objection/s5.jpg";
import s6 from "@/assets/storybook/eagles-ep4-the-objection/s6.jpg";
import s7 from "@/assets/storybook/eagles-ep4-the-objection/s7.jpg";
import s8 from "@/assets/storybook/eagles-ep4-the-objection/s8.jpg";
import s9 from "@/assets/storybook/eagles-ep4-the-objection/s9.jpg";
import s10 from "@/assets/storybook/eagles-ep4-the-objection/s10.jpg";

/**
 * Season 6 (Eagles) Episode 4 — "The objection".
 * Eagles day 4: need to / don't have to — consultative selling.
 */
export const EAGLES_EP4_THE_OBJECTION: StorybookEpisode = {
  id: "eagles-ep4-the-objection",
  moduleId: "eagles-week-1",
  week: 1,
  title: "The objection",
  titleEs: "La objeción",
  episodeLabel: { en: "Season 6 · Episode 4", es: "Temporada 6 · Episodio 4" },
  previously: [
    { en: "Don Tito told Vale to sell people, not prices.", es: "Don Tito le dijo a Vale que vendiera personas, no precios." },
    { en: "Morgan's director asked for a Monday meeting.", es: "La directora de Morgan pidió una reunión el lunes." },
    { en: "The other school is still cheaper.", es: "La otra escuela sigue siendo más barata." },
  ],
  reviewWords: [
    { word: "meeting", es: "reunión" },
    { word: "budget", es: "presupuesto" },
    { word: "objection", es: "objeción" },
  ],
  blurb: {
    en: "In the Monday meeting the director says the price is too high. Vale explains what they need and what they don't.",
    es: "En la reunión del lunes la directora dice que el precio es muy alto. Vale explica qué necesitan y qué no.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale se prepara frente a la cámara antes de la videollamada del lunes.",
      text: "Monday, 9:00. A video call with Morgan and her director.",
      es: "Lunes, 9:00. Una videollamada con Morgan y su directora.",
      speaker: "narrator",
      lines: [
        { speaker: "narrator", text: "Monday, 9:00. A video call with Morgan and her director.", es: "Lunes, 9:00. Una videollamada con Morgan y su directora." },
        { speaker: "dani", text: "Remember, you don't have to answer fast. You need to answer well.", es: "«Recuerda, no tienes que responder rápido. Necesitas responder bien»." },
        { speaker: "vale", text: "Deep breath. Let's go.", es: "«Respiro profundo. Vamos»." },
      ],
      words: [
        { word: "call", es: "llamada" },
        { word: "remember", es: "recordar" },
        { word: "breath", es: "respiro" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Morgan aparece en pantalla desde su oficina con una carpeta abierta.",
      text: "Morgan starts the meeting.",
      es: "Morgan empieza la reunión.",
      speaker: "morgan",
      lines: [
        { speaker: "morgan", text: "Vale, my director read your proposal twice.", es: "«Vale, mi directora leyó tu propuesta dos veces»." },
        { speaker: "morgan", text: "She likes the plan. She doesn't like the number.", es: "«Le gusta el plan. No le gusta el número»." },
        { speaker: "vale", text: "Then let's talk about the number.", es: "«Entonces hablemos del número»." },
      ],
      words: [
        { word: "twice", es: "dos veces" },
        { word: "likes", es: "le gusta" },
        { word: "number", es: "número" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale escucha con atención y toma notas, sin interrumpir.",
      text: "The director speaks for two long minutes. Vale writes everything.",
      es: "La directora habla dos largos minutos. Vale escribe todo.",
      speaker: "narrator",
      lines: [
        { speaker: "narrator", text: "The director speaks for two long minutes. Vale writes everything.", es: "La directora habla dos largos minutos. Vale escribe todo." },
        { speaker: "morgan", text: "Her point is simple. The other school costs half.", es: "«Su punto es simple. La otra escuela cuesta la mitad»." },
        { speaker: "vale", text: "Can I ask what your team really needs in twelve weeks?", es: "«¿Puedo preguntar qué necesita realmente su equipo en doce semanas?»" },
      ],
      words: [
        { word: "minutes", es: "minutos" },
        { word: "simple", es: "simple" },
        { word: "half", es: "la mitad" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Morgan cuenta con los dedos tres necesidades del equipo.",
      text: "Morgan lists three real needs.",
      es: "Morgan enumera tres necesidades reales.",
      speaker: "morgan",
      lines: [
        { speaker: "morgan", text: "They need to answer hard questions on live calls.", es: "«Necesitan responder preguntas difíciles en llamadas en vivo»." },
        { speaker: "morgan", text: "They need to sound calm with angry clients.", es: "«Necesitan sonar tranquilos con clientes molestos»." },
        { speaker: "morgan", text: "And they don't have to write perfect emails. That's not their job.", es: "«Y no tienen que escribir correos perfectos. Ese no es su trabajo»." },
      ],
      words: [
        { word: "needs", es: "necesidades" },
        { word: "angry", es: "molestos" },
        { word: "emails", es: "correos" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale marca con un lápiz rojo las partes del plan que va a quitar.",
      text: "Vale crosses out two parts of her own plan.",
      es: "Vale tacha dos partes de su propio plan.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Then you don't have to pay for the writing module.", es: "«Entonces no tienen que pagar por el módulo de escritura»." },
        { speaker: "vale", text: "You don't have to pay for grammar videos either. They're free for my students.", es: "«Tampoco tienen que pagar por los videos de gramática. Son gratis para mis estudiantes»." },
        { speaker: "morgan", text: "Wait — you're taking things out?", es: "«Espera… ¿estás quitando cosas?»" },
      ],
      words: [
        { word: "pay", es: "pagar" },
        { word: "writing", es: "escritura" },
        { word: "free", es: "gratis" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale explica con las manos abiertas, tranquila y segura.",
      text: "Vale explains the idea behind the cut.",
      es: "Vale explica la idea detrás del recorte.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "You need to pay for the part that changes their voice on a call.", es: "«Necesitan pagar por la parte que cambia su voz en una llamada»." },
        { speaker: "vale", text: "You don't have to pay for the rest.", es: "«No tienen que pagar por el resto»." },
        { speaker: "morgan", text: "That's a different conversation. Keep going.", es: "«Esa es otra conversación. Sigue»." },
      ],
      words: [
        { word: "changes", es: "cambia" },
        { word: "rest", es: "resto" },
        { word: "conversation", es: "conversación" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Dani, fuera de cámara, levanta un papel con un número nuevo.",
      text: "Dani holds up a paper with a new number.",
      es: "Dani levanta un papel con un número nuevo.",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "Twenty-two percent less, same hours of speaking.", es: "«Veintidós por ciento menos, las mismas horas de habla»." },
        { speaker: "vale", text: "Morgan, the new price is twenty-two percent lower.", es: "«Morgan, el precio nuevo es veintidós por ciento más bajo»." },
        { speaker: "vale", text: "And nobody needs to cut a single minute of practice.", es: "«Y nadie necesita quitar ni un minuto de práctica»." },
      ],
      words: [
        { word: "percent", es: "por ciento" },
        { word: "lower", es: "más bajo" },
        { word: "minute", es: "minuto" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Morgan sonríe y escribe algo rápido en su cuaderno.",
      text: "Morgan takes a note and looks up.",
      es: "Morgan toma una nota y levanta la vista.",
      speaker: "morgan",
      lines: [
        { speaker: "morgan", text: "The other school never asked what we need.", es: "«La otra escuela nunca preguntó qué necesitamos»." },
        { speaker: "morgan", text: "They just sent a price list.", es: "«Solo enviaron una lista de precios»." },
        { speaker: "vale", text: "A price list is easy. A plan takes questions.", es: "«Una lista de precios es fácil. Un plan requiere preguntas»." },
      ],
      words: [
        { word: "note", es: "nota" },
        { word: "list", es: "lista" },
        { word: "easy", es: "fácil" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "La pantalla muestra a Morgan asintiendo mientras Vale respira aliviada.",
      text: "The director says one sentence, and Morgan repeats it.",
      es: "La directora dice una frase, y Morgan la repite.",
      speaker: "morgan",
      lines: [
        { speaker: "morgan", text: "She says we don't have to decide today.", es: "«Dice que no tenemos que decidir hoy»." },
        { speaker: "morgan", text: "But she needs to see one real class before Friday.", es: "«Pero necesita ver una clase real antes del viernes»." },
        { speaker: "vale", text: "Thursday at ten. Bring five people from the sales floor.", es: "«Jueves a las diez. Traigan cinco personas del área de ventas»." },
      ],
      words: [
        { word: "decide", es: "decidir" },
        { word: "class", es: "clase" },
        { word: "bring", es: "traer" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale cierra la laptop y mira a Dani y Camila con una sonrisa cansada.",
      text: "The call ends. Nobody celebrates yet.",
      es: "La llamada termina. Nadie celebra todavía.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "We don't have to win today. We need to be ready Thursday.", es: "«No tenemos que ganar hoy. Necesitamos estar listos el jueves»." },
        { speaker: "camila", text: "Five strangers, one hour, in English.", es: "«Cinco desconocidos, una hora, en inglés»." },
        { speaker: "dani", text: "That's our whole business in sixty minutes.", es: "«Ese es todo nuestro negocio en sesenta minutos»." },
      ],
      words: [
        { word: "win", es: "ganar" },
        { word: "strangers", es: "desconocidos" },
        { word: "business", es: "negocio" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What does Morgan's team need to do?",
      questionEs: "¿Qué necesita hacer el equipo de Morgan?",
      options: [
        { label: "Answer hard questions on live calls", emoji: "📞" },
        { label: "Write perfect emails", emoji: "✉️" },
        { label: "Travel to El Salvador", emoji: "✈️" },
      ],
      answer: 0,
      sayIt: "They need to answer hard questions on live calls.",
      sayItEs: "Ejemplo: «They need to answer hard questions on live calls.»",
      sayItAskEn: "What do you need to do this week? Say one thing that is really necessary.",
      sayItAskEs: "¿Qué necesitas hacer esta semana? Di una cosa que sea realmente necesaria.",
      sayItCheck: {
        target: "I need to *",
        altTargets: ["This week I need to *", "I need to study *"],
      },
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "What doesn't Northline have to pay for?",
      questionEs: "¿Por qué no tiene que pagar Northline?",
      options: [
        { label: "The writing module and the grammar videos", emoji: "🎬" },
        { label: "The live call practice", emoji: "🗣️" },
        { label: "The teacher's time", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "They don't have to pay for the writing module.",
      sayItEs: "Ejemplo: «They don't have to pay for the writing module.»",
      sayItAskEn: "Tell a nervous student one thing that is not necessary. Use: You don't have to…",
      sayItAskEs: "Dile a un estudiante nervioso una cosa que no es necesaria. Usa: You don't have to…",
      sayItCheck: {
        target: "You don't have to *",
        altTargets: ["You do not have to *", "You don't have to be *"],
      },
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "What does the director need before Friday?",
      questionEs: "¿Qué necesita ver la directora antes del viernes?",
      options: [
        { label: "One real class", emoji: "🏫" },
        { label: "A new contract", emoji: "📄" },
        { label: "A cheaper price list", emoji: "🏷️" },
      ],
      answer: 0,
      sayIt: "She needs to see one real class before Friday.",
      sayItEs: "Ejemplo: «She needs to see one real class before Friday.»",
      sayItAskEn: "What do you and your family need to do this month? Use: We need to…",
      sayItAskEs: "¿Qué necesitan hacer tú y tu familia este mes? Usa: We need to…",
      sayItCheck: {
        target: "We need to *",
        altTargets: ["This month we need to *", "We need to pay *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s5",
    phrase: "I am calm. I can do it.",
    es: "Estoy tranquila. Yo puedo hacerlo.",
  },
  habitCard: {
    afterScene: "s3",
    phrase: "I listen first. A real need is worth more than a fast answer.",
    es: "Escucho primero. Una necesidad real vale más que una respuesta rápida.",
    model: "vale",
    modelActionEs: "Vale escribe todo lo que dice la directora antes de responder.",
  },
  continuePrompt: {
    en: "Think about your English this month. What do you need to do? What don't you have to do? What do you and your friends need to practice?",
    es: "Piensa en tu inglés este mes. ¿Qué necesitas hacer? ¿Qué no tienes que hacer? ¿Qué necesitan practicar tú y tus amigos?",
  },
  continueWith: ["I need to ...", "I don't have to ...", "We need to ..."],
  cliffhanger: {
    en: "Episode 5: Thursday, ten o'clock. And Camila calls in sick.",
    es: "Episodio 5: Jueves, diez de la mañana. Y Camila llama diciendo que está enferma.",
  },
};
