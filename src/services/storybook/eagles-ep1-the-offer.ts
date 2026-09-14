import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/eagles-ep1-the-offer/cover.jpg";
import s1 from "@/assets/storybook/eagles-ep1-the-offer/s1.jpg";
import s2 from "@/assets/storybook/eagles-ep1-the-offer/s2.jpg";
import s3 from "@/assets/storybook/eagles-ep1-the-offer/s3.jpg";
import s4 from "@/assets/storybook/eagles-ep1-the-offer/s4.jpg";
import s5 from "@/assets/storybook/eagles-ep1-the-offer/s5.jpg";
import s6 from "@/assets/storybook/eagles-ep1-the-offer/s6.jpg";
import s7 from "@/assets/storybook/eagles-ep1-the-offer/s7.jpg";
import s8 from "@/assets/storybook/eagles-ep1-the-offer/s8.jpg";
import s9 from "@/assets/storybook/eagles-ep1-the-offer/s9.jpg";
import s10 from "@/assets/storybook/eagles-ep1-the-offer/s10.jpg";
import s11 from "@/assets/storybook/eagles-ep1-the-offer/s11.jpg";

/**
 * Season 6 (Eagles) Episode 1 — "The offer".
 *
 * First sitcom-style episode: almost every scene is a real conversation with
 * 2-3 short replies instead of narration. Matches Eagles Week 1
 * ("Recommend, Advise & Sell"): offer options, give advice, recommend and
 * handle a first objection.
 */
export const EAGLES_EP1_THE_OFFER: StorybookEpisode = {
  id: "eagles-ep1-the-offer",
  moduleId: "eagles-week-1",
  week: 1,
  title: "The offer",
  titleEs: "La oferta",
  episodeLabel: { en: "Season 6 · Episode 1", es: "Temporada 6 · Episodio 1" },
  previously: [
    { en: "Vale opened her own English school.", es: "Vale abrió su propia escuela de inglés." },
    { en: "Camila became her first employee.", es: "Camila se convirtió en su primera empleada." },
    { en: "A company called and asked about classes.", es: "Una empresa llamó y preguntó por clases." },
  ],
  reviewWords: [
    { word: "company", es: "empresa" },
    { word: "team", es: "equipo" },
    { word: "contract", es: "contrato" },
  ],
  blurb: {
    en: "A US company wants English classes for its sales team. Vale has one call to recommend the right plan.",
    es: "Una empresa de Estados Unidos quiere clases de inglés para su equipo de ventas. Vale tiene una sola llamada para recomendar el plan correcto.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale y Dani preparan la oficina de la escuela antes de una llamada importante.",
      text: "Monday, 8:57 in the morning. The most important call of the year is about to start.",
      es: "Lunes, 8:57 de la mañana. La llamada más importante del año está por empezar.",
      speaker: "narrator",
      lines: [
        {
          speaker: "narrator",
          text: "Monday, 8:57 in the morning. The most important call of the year is about to start.",
          es: "Lunes, 8:57 de la mañana. La llamada más importante del año está por empezar.",
        },
        { speaker: "dani", text: "Vale, they call in three minutes. Are you ready?", es: "Vale, llaman en tres minutos. ¿Estás lista?" },
        { speaker: "vale", text: "I'm ready. Nervous, but ready.", es: "Estoy lista. Nerviosa, pero lista." },
      ],
      words: [
        { word: "ready", es: "lista / listo" },
        { word: "nervous", es: "nerviosa" },
        { word: "important", es: "importante" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale contesta el teléfono con voz profesional mientras Dani toma notas.",
      text: "Vale's English School, this is Vale speaking.",
      es: "«Escuela de inglés de Vale, habla Vale».",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Vale's English School, this is Vale speaking.", es: "«Escuela de inglés de Vale, habla Vale»." },
        { speaker: "morgan", text: "Hi Vale, I'm Morgan, from Northline Sales. Thanks for making time today.", es: "«Hola Vale, soy Morgan, de Northline Sales. Gracias por darme tiempo hoy»." },
        { speaker: "vale", text: "Of course. How can I help your team?", es: "«Claro. ¿Cómo puedo ayudar a su equipo?»" },
      ],
      words: [
        { word: "speaking", es: "habla (al teléfono)" },
        { word: "team", es: "equipo" },
        { word: "help", es: "ayudar" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Morgan habla desde su oficina en Estados Unidos con su equipo de ventas al fondo.",
      text: "We have thirty people on the sales floor, and half of them freeze on calls in English.",
      es: "«Tenemos treinta personas en ventas y la mitad se congela en las llamadas en inglés».",
      speaker: "morgan",
      lines: [
        { speaker: "morgan", text: "We have thirty people on the sales floor.", es: "«Tenemos treinta personas en el área de ventas»." },
        { speaker: "morgan", text: "Half of them freeze when a client speaks fast in English.", es: "«La mitad se congela cuando un cliente habla rápido en inglés»." },
        { speaker: "vale", text: "So the problem is speaking under pressure, not grammar.", es: "«Entonces el problema es hablar bajo presión, no la gramática»." },
      ],
      words: [
        { word: "freeze", es: "congelarse / quedarse en blanco" },
        { word: "pressure", es: "presión" },
        { word: "problem", es: "problema" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale hace preguntas y escribe en su cuaderno antes de recomendar algo.",
      text: "Before I recommend anything, can I ask you two quick questions?",
      es: "«Antes de recomendar algo, ¿puedo hacerle dos preguntas rápidas?»",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Before I recommend anything, can I ask you two quick questions?", es: "«Antes de recomendar algo, ¿puedo hacerle dos preguntas rápidas?»" },
        { speaker: "morgan", text: "Go ahead.", es: "«Adelante»." },
        { speaker: "vale", text: "How many hours can your team study, and when do they need results?", es: "«¿Cuántas horas puede estudiar su equipo y para cuándo necesitan resultados?»" },
      ],
      words: [
        { word: "recommend", es: "recomendar" },
        { word: "hours", es: "horas" },
        { word: "results", es: "resultados" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Morgan revisa su calendario mientras responde a Vale.",
      text: "Three hours a week, and we need results before the spring campaign.",
      es: "«Tres horas por semana, y necesitamos resultados antes de la campaña de primavera».",
      speaker: "morgan",
      lines: [
        { speaker: "morgan", text: "Three hours a week. That's all I can protect in their schedule.", es: "«Tres horas por semana. Es todo lo que puedo proteger en su horario»." },
        { speaker: "morgan", text: "And we need results before the spring campaign.", es: "«Y necesitamos resultados antes de la campaña de primavera»." },
        { speaker: "dani", text: "That's twelve weeks, Vale.", es: "«Son doce semanas, Vale»." },
      ],
      words: [
        { word: "schedule", es: "horario" },
        { word: "campaign", es: "campaña" },
        { word: "weeks", es: "semanas" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale presenta dos opciones con tarjetas en la pared de la oficina.",
      text: "I have two options for you, and I'll tell you which one I recommend.",
      es: "«Tengo dos opciones para usted y le diré cuál recomiendo».",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "I have two options for you.", es: "«Tengo dos opciones para usted»." },
        { speaker: "vale", text: "Option A is a general course. Option B is live call practice with real sales situations.", es: "«La opción A es un curso general. La opción B es práctica de llamadas en vivo con situaciones reales de ventas»." },
        { speaker: "vale", text: "I recommend option B, because your team doesn't need more theory. They need to speak.", es: "«Recomiendo la opción B, porque su equipo no necesita más teoría. Necesita hablar»." },
      ],
      words: [
        { word: "options", es: "opciones" },
        { word: "practice", es: "práctica" },
        { word: "theory", es: "teoría" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Morgan frunce el ceño y menciona el precio del plan.",
      text: "Honestly, option B sounds expensive for us right now.",
      es: "«Honestamente, la opción B suena cara para nosotros ahora».",
      speaker: "morgan",
      lines: [
        { speaker: "morgan", text: "Honestly, option B sounds expensive for us right now.", es: "«Honestamente, la opción B suena cara para nosotros ahora»." },
        { speaker: "vale", text: "I understand. Can I show you the other side of that number?", es: "«Lo entiendo. ¿Puedo mostrarle el otro lado de ese número?»" },
        { speaker: "morgan", text: "Please do.", es: "«Por favor»." },
      ],
      words: [
        { word: "expensive", es: "caro / cara" },
        { word: "understand", es: "entender" },
        { word: "number", es: "número" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale explica con calma y Dani le pasa una hoja con datos.",
      text: "One lost client costs more than the whole course.",
      es: "«Un cliente perdido cuesta más que todo el curso».",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Last year we trained a support team in San Salvador.", es: "«El año pasado entrenamos a un equipo de soporte en San Salvador»." },
        { speaker: "vale", text: "One lost client costs more than the whole course.", es: "«Un cliente perdido cuesta más que todo el curso»." },
        { speaker: "morgan", text: "That's a fair point.", es: "«Ese es un buen punto»." },
      ],
      words: [
        { word: "trained", es: "entrenamos" },
        { word: "costs", es: "cuesta" },
        { word: "fair", es: "justo / válido" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Morgan sonríe y pide una propuesta para el viernes.",
      text: "Send me a proposal by Friday, and I'll take it to my director.",
      es: "«Envíeme una propuesta para el viernes y se la llevo a mi director».",
      speaker: "morgan",
      lines: [
        { speaker: "morgan", text: "Alright. Send me a proposal by Friday.", es: "«Muy bien. Envíeme una propuesta para el viernes»." },
        { speaker: "morgan", text: "If my director likes it, we sign a six-month contract.", es: "«Si a mi director le gusta, firmamos un contrato de seis meses»." },
        { speaker: "vale", text: "You'll have it Thursday night.", es: "«La tendrá el jueves por la noche»." },
      ],
      words: [
        { word: "proposal", es: "propuesta" },
        { word: "contract", es: "contrato" },
        { word: "sign", es: "firmar" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale y Dani celebran en silencio después de colgar el teléfono.",
      text: "Vale hangs up, and the small office explodes in a quiet celebration.",
      es: "Vale cuelga y la pequeña oficina explota en una celebración silenciosa.",
      speaker: "narrator",
      lines: [
        { speaker: "dani", text: "Vale! Thirty students! Did you hear yourself? You sounded like a CEO.", es: "«¡Vale! ¡Treinta estudiantes! ¿Te escuchaste? Sonaste como una CEO»." },
        { speaker: "vale", text: "I was terrified. But I didn't stop.", es: "«Estaba aterrada. Pero no me detuve»." },
        { speaker: "vale", text: "Now we have four days to write the best proposal of our lives.", es: "«Ahora tenemos cuatro días para escribir la mejor propuesta de nuestras vidas»." },
      ],
      words: [
        { word: "terrified", es: "aterrada" },
        { word: "stop", es: "detenerse" },
        { word: "proposal", es: "propuesta" },
      ],
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "Vale le cuenta a Dani, paso a paso, cómo estuvo la llamada.",
      text: "Vale tells the whole story again, in the past, step by step.",
      es: "Vale cuenta toda la historia otra vez, en pasado, paso a paso.",
      speaker: "vale",
      lines: [
        { speaker: "dani", text: "Okay, tell me everything. What happened?", es: "«Bueno, cuéntame todo. ¿Qué pasó?»" },
        { speaker: "vale", text: "Morgan called at nine, and the whole meeting was in English — smooth and professional.", es: "«Morgan llamó a las nueve y toda la reunión fue en inglés: fluida y profesional»." },
        { speaker: "vale", text: "First, I asked two questions. After that, I recommended option B.", es: "«Primero hice dos preguntas. Después de eso, recomendé la opción B»." },
        { speaker: "vale", text: "She said it was expensive, but I explained the numbers and she listened.", es: "«Dijo que era caro, pero expliqué los números y me escuchó»." },
        { speaker: "vale", text: "Overall, it was the best call of my life.", es: "«En general, fue la mejor llamada de mi vida»." },
      ],
      words: [
        { word: "happened", es: "pasó" },
        { word: "asked", es: "pregunté" },
        { word: "explained", es: "expliqué" },
        { word: "overall", es: "en general" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What did Morgan say about her team?",
      questionEs: "¿Qué dijo Morgan sobre su equipo?",
      options: [
        { label: "Half of them froze on calls in English", emoji: "😰" },
        { label: "They didn't have computers", emoji: "💻" },
        { label: "They worked at night", emoji: "🌙" },
      ],
      answer: 0,
      sayIt: "Half of them froze on calls in English.",
      sayItEs: "Ejemplo: «Half of them froze on calls in English.»",
      sayItAskEn: "What happened in your day yesterday? Tell me one thing.",
      sayItAskEs: "¿Qué pasó en tu día ayer? Cuéntame una cosa.",
      sayItCheck: {
        target: "Yesterday I *",
        altTargets: ["Yesterday, I *", "I * yesterday", "Yesterday my *"],
      },
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "What did Vale recommend, and why?",
      questionEs: "¿Qué recomendó Vale y por qué?",
      options: [
        { label: "Option B, because they needed to speak", emoji: "🗣️" },
        { label: "Option A, because it was cheaper", emoji: "💸" },
        { label: "Nothing, she said no", emoji: "🚫" },
      ],
      answer: 0,
      sayIt: "Vale recommended option B, because they needed to speak.",
      sayItEs: "Ejemplo: «Vale recommended option B, because they needed to speak.»",
      sayItAskEn: "Why was yesterday a good day or a hard day for you?",
      sayItAskEs: "¿Por qué ayer fue un buen día o un día difícil para ti?",
      sayItCheck: {
        target: "It was * because *",
        altTargets: ["Yesterday was * because *", "It was a * day because *"],
      },
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "What did Morgan ask for before the contract?",
      questionEs: "¿Qué pidió Morgan antes del contrato?",
      options: [
        { label: "A proposal by Friday", emoji: "📄" },
        { label: "A free class that day", emoji: "🎁" },
        { label: "Thirty new laptops", emoji: "💼" },
      ],
      answer: 0,
      sayIt: "She asked for a proposal by Friday.",
      sayItEs: "Ejemplo: «She asked for a proposal by Friday.»",
      sayItAskEn: "What did you do after that? Tell me the next thing that happened.",
      sayItAskEs: "¿Qué hiciste después de eso? Cuéntame lo que pasó después.",
      sayItCheck: {
        target: "After that I *",
        altTargets: ["After that, I *", "Then I *", "Later I *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s7",
    phrase: "I can do it. Mistakes are part of the process.",
    es: "Yo puedo hacerlo. Los errores son parte del proceso.",
  },
  habitCard: {
    afterScene: "s4",
    phrase: "I ask questions before I recommend. Good questions sell better than good speeches.",
    es: "Hago preguntas antes de recomendar. Las buenas preguntas venden mejor que los buenos discursos.",
    model: "vale",
    modelActionEs: "Vale pregunta por horas y resultados antes de ofrecer un plan.",
  },
  continuePrompt: {
    en: "Tell us about an interesting day. What happened? What did you do after that? How was it overall?",
    es: "Cuéntanos de un día interesante. ¿Qué pasó? ¿Qué hiciste después de eso? ¿Cómo fue en general?",
  },
  continueWith: ["Yesterday I ...", "After that, I ...", "Overall, it was ..."],
  cliffhanger: {
    en: "Episode 2: Four days, one proposal — and a competitor calls Morgan first.",
    es: "Episodio 2: Cuatro días, una propuesta… y un competidor llama a Morgan primero.",
  },
};
