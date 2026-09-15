import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/tigers-ep7-your-experience/cover.jpg";
import s1 from "@/assets/storybook/tigers-ep7-your-experience/s1.jpg";
import s2 from "@/assets/storybook/tigers-ep7-your-experience/s2.jpg";
import s3 from "@/assets/storybook/tigers-ep7-your-experience/s3.jpg";
import s4 from "@/assets/storybook/tigers-ep7-your-experience/s4.jpg";
import s5 from "@/assets/storybook/tigers-ep7-your-experience/s5.jpg";
import s6 from "@/assets/storybook/tigers-ep7-your-experience/s6.jpg";
import s7 from "@/assets/storybook/tigers-ep7-your-experience/s7.jpg";
import s8 from "@/assets/storybook/tigers-ep7-your-experience/s8.jpg";
import s9 from "@/assets/storybook/tigers-ep7-your-experience/s9.jpg";
import s10 from "@/assets/storybook/tigers-ep7-your-experience/s10.jpg";
import s11 from "@/assets/storybook/tigers-ep7-your-experience/s11.jpg";

/**
 * Season 7 (Tigers) Episode 7 — "Tell me about your experience".
 * Matches Tigers Day 7 (present perfect: experiences + a concrete example).
 */
export const TIGERS_EP7_YOUR_EXPERIENCE: StorybookEpisode = {
  id: "tigers-ep7-your-experience",
  moduleId: "tigers",
  week: 2,
  title: "Tell me about your experience",
  titleEs: "Cuéntame tu experiencia",
  episodeLabel: { en: "Season 7 · Episode 7", es: "Temporada 7 · Episodio 7" },
  previously: [
    { en: "Vale said no to BigTalk's offer to buy the school.", es: "Vale dijo no a la oferta de BigTalk para comprar la escuela." },
    { en: "An old photo reminded everyone where they started.", es: "Una foto vieja les recordó a todos dónde empezaron." },
    { en: "The free workshop is about to start.", es: "El taller gratis está por empezar." },
  ],
  reviewWords: [
    { word: "photo", es: "foto" },
    { word: "practicing", es: "practicando" },
    { word: "wall", es: "pared" },
  ],
  blurb: {
    en: "At the first free workshop, Bryan shows up with a potential client and a trap: 'Have you ever taught a company?'",
    es: "En el primer taller gratis, Bryan aparece con un cliente potencial y una trampa: «¿Alguna vez has enseñado a una empresa?»",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "El salón lleno de vecinos en el primer taller gratis de conversación.",
      text: "First Saturday of the month. Twenty-two neighbors filled the classroom for the free workshop.",
      es: "Primer sábado del mes. Veintidós vecinos llenaron el salón para el taller gratis.",
      speaker: "narrator",
      lines: [
        { speaker: "camila", text: "Twenty-two people, Vale. The chairs weren't enough.", es: "«Veintidós personas, Vale. Las sillas no fueron suficientes»." },
        { speaker: "vale", text: "That's the best problem in the world. Let's start.", es: "«Es el mejor problema del mundo. Empecemos»." },
        { speaker: "dani", text: "Wait… Vale. Bryan just walked in. And he's not alone.", es: "«Espera… Vale. Bryan acaba de entrar. Y no viene solo»." },
      ],
      words: [
        { word: "neighbors", es: "vecinos" },
        { word: "enough", es: "suficientes" },
        { word: "alone", es: "solo" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Bryan presenta a un hombre de camisa blanca: el dueño de una empresa de logística.",
      text: "This is Mr. Herrera. He owns a logistics company and he needs English training.",
      es: "«Este es el señor Herrera. Es dueño de una empresa de logística y necesita entrenamiento en inglés».",
      speaker: "bryan",
      lines: [
        { speaker: "bryan", text: "Good morning, everyone. Don't mind me, I came to learn.", es: "«Buenos días a todos. No se preocupen por mí, vine a aprender»." },
        { speaker: "bryan", text: "This is Mr. Herrera. He owns a logistics company and needs English training.", es: "«Este es el señor Herrera. Es dueño de una empresa de logística y necesita entrenamiento en inglés»." },
        { speaker: "vale", text: "Welcome, Mr. Herrera. Please, sit anywhere.", es: "«Bienvenido, señor Herrera. Por favor, siéntese donde quiera»." },
      ],
      words: [
        { word: "owns", es: "es dueño de" },
        { word: "logistics", es: "logística" },
        { word: "training", es: "entrenamiento" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Bryan levanta la mano con una sonrisa de tiburón y lanza la pregunta trampa.",
      text: "One question, teacher Vale. Have you ever taught a real company?",
      es: "«Una pregunta, maestra Vale. ¿Alguna vez has enseñado a una empresa de verdad?»",
      speaker: "bryan",
      lines: [
        { speaker: "bryan", text: "One question, teacher Vale. For my friend here.", es: "«Una pregunta, maestra Vale. Para mi amigo aquí»." },
        { speaker: "bryan", text: "Have you ever taught a real company? With managers, deadlines, pressure?", es: "«¿Alguna vez has enseñado a una empresa de verdad? Con gerentes, fechas límite, presión?»" },
        { speaker: "dani", text: "That's a trap…", es: "«Es una trampa…»" },
        { speaker: "vale", text: "It's a fair question. And I have a fair answer.", es: "«Es una pregunta justa. Y tengo una respuesta justa»." },
      ],
      words: [
        { word: "trap", es: "trampa" },
        { word: "deadlines", es: "fechas límite" },
        { word: "fair", es: "justa" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale se pone de pie frente al grupo y cuenta su experiencia con Northline.",
      text: "Yes, I have. I have taught the sales team at Northline for six months.",
      es: "«Sí, lo he hecho. He enseñado al equipo de ventas de Northline por seis meses».",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Yes, I have. I have taught the sales team at Northline for six months.", es: "«Sí, lo he hecho. He enseñado al equipo de ventas de Northline por seis meses»." },
        { speaker: "vale", text: "Thirty people, three hours a week, live call practice.", es: "«Treinta personas, tres horas por semana, práctica de llamadas en vivo»." },
        { speaker: "bryan", text: "One client. We have taught forty companies.", es: "«Un cliente. Nosotros hemos enseñado a cuarenta empresas»." },
        { speaker: "vale", text: "True. So let me give you a concrete example.", es: "«Cierto. Entonces déjame darte un ejemplo concreto»." },
      ],
      words: [
        { word: "taught", es: "enseñado" },
        { word: "live", es: "en vivo" },
        { word: "concrete", es: "concreto" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale cuenta la historia de una vendedora que se congelaba en las llamadas.",
      text: "In week one, a salesperson named Rosario froze on every call. In week ten, she closed a client in English.",
      es: "«En la semana uno, una vendedora llamada Rosario se congelaba en cada llamada. En la semana diez, cerró un cliente en inglés».",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "In week one, a salesperson named Rosario froze on every call.", es: "«En la semana uno, una vendedora llamada Rosario se congelaba en cada llamada»." },
        { speaker: "vale", text: "I have seen that fear a hundred times. So we practiced real calls, every session.", es: "«He visto ese miedo cien veces. Así que practicamos llamadas reales, cada sesión»." },
        { speaker: "vale", text: "In week ten, Rosario closed a client in English. Her manager cried.", es: "«En la semana diez, Rosario cerró un cliente en inglés. Su gerente lloró»." },
      ],
      words: [
        { word: "froze", es: "se congelaba" },
        { word: "closed", es: "cerró (una venta)" },
        { word: "cried", es: "lloró" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "El señor Herrera toma notas, impresionado; Bryan mira hacia otro lado.",
      text: "I have taught thirty people at Northline, and I have learned something from every single one.",
      es: "«He enseñado a treinta personas en Northline y he aprendido algo de cada una».",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "I have taught thirty people at Northline, and I have learned something from every single one.", es: "«He enseñado a treinta personas en Northline y he aprendido algo de cada una»." },
        { speaker: "vale", text: "Forty companies is a number. Rosario is a person. I know every person in my classes.", es: "«Cuarenta empresas es un número. Rosario es una persona. Yo conozco a cada persona en mis clases»." },
        { speaker: "herrera", text: "How do you measure progress, Miss Vale?", es: "«¿Cómo mide el progreso, señorita Vale?»" },
      ],
      words: [
        { word: "learned", es: "aprendido" },
        { word: "number", es: "número" },
        { word: "measure", es: "medir" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale explica su sistema de mediciones con grabaciones y listas.",
      text: "Every student records answers in week one and week ten. We compare them together.",
      es: "«Cada estudiante graba respuestas en la semana uno y en la semana diez. Las comparamos juntos».",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Every student records answers in week one and week ten.", es: "«Cada estudiante graba respuestas en la semana uno y en la semana diez»." },
        { speaker: "vale", text: "Then we compare them together. They hear their own progress.", es: "«Luego las comparamos juntos. Escuchan su propio progreso»." },
        { speaker: "herrera", text: "And have you ever lost a student?", es: "«¿Y alguna vez ha perdido a un estudiante?»" },
        { speaker: "vale", text: "I have. Two people left last year. I called both, and one came back.", es: "«Sí. Dos personas se fueron el año pasado. Llamé a las dos y una regresó»." },
      ],
      words: [
        { word: "records", es: "graba" },
        { word: "compare", es: "comparamos" },
        { word: "progress", es: "progreso" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "El taller continúa con los vecinos practicando frases en parejas.",
      text: "The workshop went on. Neighbors practiced introductions in pairs, and the room got loud.",
      es: "El taller continuó. Los vecinos practicaron presentaciones en parejas y el salón se llenó de ruido.",
      speaker: "narrator",
      lines: [
        { speaker: "camila", text: "Okay everyone, pairs! Tell your partner: where have you worked?", es: "«Bueno todos, ¡en parejas! Díganle a su compañero: ¿dónde han trabajado?»" },
        { speaker: "dani", text: "I have delivered food, I have fixed computers, and now I work here!", es: "«¡He repartido comida, he arreglado computadoras y ahora trabajo aquí!»" },
        { speaker: "vale", text: "Perfect, Dani! Experience plus an example.", es: "«¡Perfecto, Dani! Experiencia más un ejemplo»." },
      ],
      words: [
        { word: "pairs", es: "parejas" },
        { word: "partner", es: "compañero" },
        { word: "fixed", es: "arreglado" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Al final, el señor Herrera se acerca a Vale con su tarjeta.",
      text: "I have visited four academies this month. Yours is the first one with a soul.",
      es: "«He visitado cuatro academias este mes. La suya es la primera con alma».",
      speaker: "narrator",
      lines: [
        { speaker: "narrator", text: "At the end, Mr. Herrera walked to Vale and gave her his card.", es: "Al final, el señor Herrera se acercó a Vale y le dio su tarjeta." },
        { speaker: "vale", text: "Thank you, Mr. Herrera. That means a lot.", es: "«Gracias, señor Herrera. Eso significa mucho»." },
        { speaker: "bryan", text: "We'll call you, Vale. Come on, Herrera, the car is waiting.", es: "«Te llamaremos, Vale. Vamos, Herrera, el carro espera»." },
      ],
      words: [
        { word: "soul", es: "alma" },
        { word: "card", es: "tarjeta" },
        { word: "means", es: "significa" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Los vecinos se van contentos y el equipo recoge las sillas.",
      text: "Three neighbors signed up for regular classes before they left.",
      es: "Tres vecinos se inscribieron a clases regulares antes de irse.",
      speaker: "narrator",
      lines: [
        { speaker: "camila", text: "Three new students, Vale. The workshop worked.", es: "«Tres estudiantes nuevos, Vale. El taller funcionó»." },
        { speaker: "dani", text: "And you destroyed Bryan with kindness. It was beautiful.", es: "«Y destruiste a Bryan con amabilidad. Fue hermoso»." },
        { speaker: "vale", text: "I didn't destroy anyone. I answered a fair question with real experience.", es: "«No destruí a nadie. Respondí una pregunta justa con experiencia real»." },
      ],
      words: [
        { word: "signed up", es: "se inscribieron" },
        { word: "kindness", es: "amabilidad" },
        { word: "destroyed", es: "destruiste" },
      ],
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "Vale practica la respuesta de experiencia una vez más con Camila.",
      text: "Vale repeats her answer one more time, step by step.",
      es: "Vale repite su respuesta una vez más, paso a paso.",
      speaker: "vale",
      lines: [
        { speaker: "camila", text: "Teach me the formula, boss. Experience, example, result.", es: "«Enséñame la fórmula, jefa. Experiencia, ejemplo, resultado»." },
        { speaker: "vale", text: "First the experience: I have taught a company for six months.", es: "«Primero la experiencia: he enseñado a una empresa por seis meses»." },
        { speaker: "vale", text: "Then a concrete example: Rosario froze in week one and closed a client in week ten.", es: "«Luego un ejemplo concreto: Rosario se congelaba en la semana uno y cerró un cliente en la semana diez»." },
        { speaker: "vale", text: "And the result: her team now sells in English every day.", es: "«Y el resultado: su equipo ahora vende en inglés todos los días»." },
      ],
      words: [
        { word: "formula", es: "fórmula" },
        { word: "example", es: "ejemplo" },
        { word: "result", es: "resultado" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What trap question did Bryan ask in front of the client?",
      questionEs: "¿Qué pregunta trampa hizo Bryan frente al cliente?",
      options: [
        { label: "Have you ever taught a real company?", emoji: "🪤" },
        { label: "How much money do you make?", emoji: "💰" },
        { label: "Why is your school so small?", emoji: "🐜" },
      ],
      answer: 0,
      sayIt: "Have you ever taught a real company?",
      sayItEs: "Ejemplo: «Have you ever taught a real company?»",
      sayItAskEn: "Have you ever done something difficult? Tell me one experience.",
      sayItAskEs: "¿Alguna vez has hecho algo difícil? Cuéntame una experiencia.",
      sayItCheck: {
        target: "I have *",
        altTargets: ["Yes, I have. I have *", "I've *", "I have never *"],
      },
    },
    {
      id: "q2",
      afterScene: "s5",
      questionEn: "What concrete example did Vale give?",
      questionEs: "¿Qué ejemplo concreto dio Vale?",
      options: [
        { label: "Rosario froze in week one and closed a client in week ten", emoji: "🌟" },
        { label: "She taught forty companies", emoji: "🏢" },
        { label: "She wrote a book about English", emoji: "📖" },
      ],
      answer: 0,
      sayIt: "In week one she froze on every call. In week ten, she closed a client in English.",
      sayItEs: "Ejemplo: «In week one she froze on every call. In week ten, she closed a client in English.»",
      sayItAskEn: "Give me one concrete example of something you have done well.",
      sayItAskEs: "Dame un ejemplo concreto de algo que has hecho bien.",
      sayItCheck: {
        target: "I have *, for example *",
        altTargets: ["For example, I *", "One example: I *", "I have *. For example, *"],
      },
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "Why did Mr. Herrera give Vale his card?",
      questionEs: "¿Por qué el señor Herrera le dio su tarjeta a Vale?",
      options: [
        { label: "Her school was the first one with a soul", emoji: "❤️" },
        { label: "It was the cheapest academy", emoji: "🏷️" },
        { label: "Bryan told him to do it", emoji: "🗣️" },
      ],
      answer: 0,
      sayIt: "I have visited four academies, and yours is the first one with a soul.",
      sayItEs: "Ejemplo: «I have visited four academies, and yours is the first one with a soul.»",
      sayItAskEn: "What was the result of your experience? How did it end?",
      sayItAskEs: "¿Cuál fue el resultado de tu experiencia? ¿Cómo terminó?",
      sayItCheck: {
        target: "The result was *",
        altTargets: ["In the end, *", "As a result, *", "Finally, *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s4",
    phrase: "I can do it. My experience is real, and I can talk about it.",
    es: "Yo puedo hacerlo. Mi experiencia es real y puedo hablar de ella.",
  },
  habitCard: {
    afterScene: "s7",
    phrase: "I answer hard questions with facts, not fear. Experience, example, result.",
    es: "Respondo preguntas difíciles con hechos, no con miedo. Experiencia, ejemplo, resultado.",
    model: "vale",
    modelActionEs: "Vale responde la trampa de Bryan con calma, datos y un ejemplo concreto.",
  },
  continuePrompt: {
    en: "Tell me about your experience. What have you done? Give one concrete example. What was the result?",
    es: "Cuéntame tu experiencia. ¿Qué has hecho? Da un ejemplo concreto. ¿Cuál fue el resultado?",
  },
  continueWith: ["I have ...", "For example, ...", "The result was ..."],
  cliffhanger: {
    en: "Episode 8: A new teacher wants to work at the school — meet Sofía.",
    es: "Episodio 8: Una maestra nueva quiere trabajar en la escuela — conoce a Sofía.",
  },
};
