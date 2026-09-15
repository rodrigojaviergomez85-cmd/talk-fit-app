import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/sharks-ep1-tell-the-story/cover.jpg";
import s1 from "@/assets/storybook/sharks-ep1-tell-the-story/s1.jpg";
import s2 from "@/assets/storybook/sharks-ep1-tell-the-story/s2.jpg";
import s3 from "@/assets/storybook/sharks-ep1-tell-the-story/s3.jpg";
import s4 from "@/assets/storybook/sharks-ep1-tell-the-story/s4.jpg";
import s5 from "@/assets/storybook/sharks-ep1-tell-the-story/s5.jpg";
import s6 from "@/assets/storybook/sharks-ep1-tell-the-story/s6.jpg";
import s7 from "@/assets/storybook/sharks-ep1-tell-the-story/s7.jpg";
import s8 from "@/assets/storybook/sharks-ep1-tell-the-story/s8.jpg";
import s9 from "@/assets/storybook/sharks-ep1-tell-the-story/s9.jpg";
import s10 from "@/assets/storybook/sharks-ep1-tell-the-story/s10.jpg";
import s11 from "@/assets/storybook/sharks-ep1-tell-the-story/s11.jpg";

/**
 * Season 8 (Sharks) Episode 1 — "Tell the story". B2 pilot.
 * Matches Sharks Day 1 (simple past: tell a memorable experience and react to
 * the unexpected). Longer natural lines, open opinion turns and a 45-second
 * final monologue instead of the 15-second finale.
 */
export const SHARKS_EP1_TELL_THE_STORY: StorybookEpisode = {
  id: "sharks-ep1-tell-the-story",
  moduleId: "sharks",
  week: 1,
  title: "Tell the story",
  titleEs: "Cuenta la historia",
  episodeLabel: { en: "Season 8 · Episode 1", es: "Temporada 8 · Episodio 1" },
  previously: [
    { en: "Vale won the Northline contract and hired Bryan from BigTalk.", es: "Vale ganó el contrato de Northline y contrató a Bryan de BigTalk." },
    { en: "Morgan said a sister company in the United States was watching.", es: "Morgan dijo que una empresa hermana en Estados Unidos estaba observando." },
    { en: "They want a proposal — in English, before the end of the month.", es: "Quieren una propuesta — en inglés, antes de fin de mes." },
  ],
  reviewWords: [
    { word: "proposal", es: "propuesta" },
    { word: "decision", es: "decisión" },
    { word: "leader", es: "líder" },
  ],
  blurb: {
    en: "Friday something unexpected happened, and on Monday Vale tells the whole story: the American call, the impossible deadline and the man who wanted her price cut in half.",
    es: "El viernes pasó algo inesperado, y el lunes Vale cuenta toda la historia: la llamada americana, el plazo imposible y el hombre que quería su precio a la mitad.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Lunes por la mañana: el equipo rodea a Vale en la sala de la escuela, con café y curiosidad.",
      text: "Monday morning. Five people, three coffees and one story that nobody had heard yet.",
      es: "Lunes por la mañana. Cinco personas, tres cafés y una historia que nadie había escuchado todavía.",
      speaker: "narrator",
      lines: [
        { speaker: "dani", text: "Okay, everybody is here, so start from the beginning and please do not skip anything.", es: "«Bien, ya estamos todos, así que empieza desde el principio y por favor no te saltes nada»." },
        { speaker: "vale", text: "Alright. On Friday afternoon I was closing the office, and at first everything was completely normal.", es: "«Está bien. El viernes por la tarde estaba cerrando la oficina, y al principio todo era completamente normal»." },
        { speaker: "camila", text: "Normal until the phone rang, I imagine. Nothing interesting ever happens before the phone rings.", es: "«Normal hasta que sonó el teléfono, imagino. Nunca pasa nada interesante antes de que suene el teléfono»." },
      ],
      words: [
        { word: "beginning", es: "principio" },
        { word: "closing", es: "cerrando" },
        { word: "normal", es: "normal" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Viernes en la memoria de Vale: ella sola en la oficina contestando una llamada con número extranjero.",
      text: "The screen showed a number from the United States, and my hands were already shaking.",
      es: "La pantalla mostró un número de Estados Unidos, y mis manos ya estaban temblando.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "The screen showed a number from the United States. I looked at it for three full seconds.", es: "«La pantalla mostró un número de Estados Unidos. Lo miré por tres segundos completos»." },
        { speaker: "vale", text: "Then I answered in my calmest voice, and a man said: this is Northline International, from Houston.", es: "«Luego contesté con mi voz más calmada, y un hombre dijo: habla Northline International, desde Houston»." },
        { speaker: "dani", text: "No way. The sister company called you directly, without an email first? That never happens.", es: "«No puede ser. ¿La empresa hermana te llamó directamente, sin un correo primero? Eso nunca pasa»." },
      ],
      words: [
        { word: "screen", es: "pantalla" },
        { word: "shaking", es: "temblando" },
        { word: "directly", es: "directamente" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale contando la historia con las manos; el equipo escucha en silencio.",
      text: "He asked me one question, and my answer changed the rest of the weekend.",
      es: "Él me hizo una pregunta, y mi respuesta cambió el resto del fin de semana.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "He asked me one simple question: can your school train three of our offices at the same time?", es: "«Me hizo una pregunta simple: ¿puede tu escuela capacitar a tres de nuestras oficinas al mismo tiempo?»" },
        { speaker: "vale", text: "I did not say maybe. I said yes, we can, and then I explained exactly how we would do it.", es: "«No dije tal vez. Dije sí, podemos, y luego expliqué exactamente cómo lo haríamos»." },
        { speaker: "dani", text: "You said yes? Three offices? In another country? I love it and it terrifies me at the same time.", es: "«¿Dijiste que sí? ¿Tres oficinas? ¿En otro país? Me encanta y me aterra al mismo tiempo»." },
      ],
      words: [
        { word: "train", es: "capacitar / entrenar" },
        { word: "explained", es: "expliqué" },
        { word: "terrifies", es: "aterra" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale escribe una fecha en la pizarra; el equipo reacciona sorprendido.",
      text: "Then came the unexpected part: a deadline nobody in the room liked.",
      es: "Luego vino la parte inesperada: un plazo que a nadie en la sala le gustó.",
      speaker: "narrator",
      lines: [
        { speaker: "vale", text: "Before I could celebrate, he added one sentence: we need your full proposal in five days.", es: "«Antes de que pudiera celebrar, él agregó una frase: necesitamos tu propuesta completa en cinco días»." },
        { speaker: "camila", text: "Five days? For three offices, in dollars, in English? That is not a proposal, that is a marathon.", es: "«¿Cinco días? ¿Para tres oficinas, en dólares, en inglés? Eso no es una propuesta, es un maratón»." },
        { speaker: "vale", text: "That was my first reaction too. Then I remembered that I have run marathons before.", es: "«Esa fue mi primera reacción también. Luego recordé que ya he corrido maratones antes»." },
      ],
      words: [
        { word: "deadline", es: "fecha límite / plazo" },
        { word: "reaction", es: "reacción" },
        { word: "marathon", es: "maratón" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Mateo con la laptop y Camila con una calculadora, trabajando en los números.",
      text: "By Saturday the whole team was working, and the numbers finally started to make sense.",
      es: "Para el sábado todo el equipo estaba trabajando, y los números por fin empezaron a tener sentido.",
      speaker: "narrator",
      lines: [
        { speaker: "mateo", text: "I built the platform version for three offices on Saturday. It took eleven hours and two pupusas.", es: "«Construí la versión de la plataforma para tres oficinas el sábado. Me tomó once horas y dos pupusas»." },
        { speaker: "camila", text: "I calculated the cost per student, and honestly, our margin is small but it is healthy.", es: "«Calculé el costo por estudiante y, honestamente, nuestro margen es pequeño pero es sano»." },
        { speaker: "vale", text: "Small and healthy is fine. I did not build this school to be the cheapest one on the list.", es: "«Pequeño y sano está bien. No construí esta escuela para ser la más barata de la lista»." },
      ],
      words: [
        { word: "platform", es: "plataforma" },
        { word: "margin", es: "margen (de ganancia)" },
        { word: "cheapest", es: "la más barata" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Videollamada: en la pantalla aparece Mr. Reed, ejecutivo estadounidense serio, traje oscuro.",
      text: "On Sunday night the video call opened, and the shark appeared on the screen.",
      es: "El domingo por la noche se abrió la videollamada, y el tiburón apareció en la pantalla.",
      speaker: "narrator",
      lines: [
        { speaker: "reed", text: "Good evening. I am Mr. Reed. I read your proposal twice, and I have exactly one problem with it.", es: "«Buenas noches. Soy el señor Reed. Leí su propuesta dos veces, y tengo exactamente un problema con ella»." },
        { speaker: "vale", text: "Good evening, Mr. Reed. Tell me the problem, and I will tell you what we can do about it.", es: "«Buenas noches, señor Reed. Dígame el problema, y le diré qué podemos hacer al respecto»." },
        { speaker: "reed", text: "Your price. I received three offers this week, and yours is the most expensive one on my desk.", es: "«Su precio. Recibí tres ofertas esta semana, y la suya es la más cara de mi escritorio»." },
      ],
      words: [
        { word: "evening", es: "noche (temprano)" },
        { word: "problem", es: "problema" },
        { word: "expensive", es: "cara / costosa" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale escucha con calma mientras Reed presiona; Dani y Camila observan fuera de cámara.",
      text: "He pushed hard, the way sharks do when they smell a small company.",
      es: "Él presionó fuerte, como hacen los tiburones cuando huelen una empresa pequeña.",
      speaker: "narrator",
      lines: [
        { speaker: "reed", text: "I can find a bigger provider tomorrow for half of your price. Convince me why I should not.", es: "«Puedo encontrar un proveedor más grande mañana por la mitad de su precio. Convénzame de por qué no debería»." },
        { speaker: "dani", text: "He is bluffing. Nobody calls a school in El Salvador on a Friday to say no on a Sunday.", es: "«Está fanfarroneando. Nadie llama a una escuela en El Salvador un viernes para decir que no un domingo»." },
        { speaker: "vale", text: "Maybe he is. But I did not prepare a discount tonight. I prepared a story with results.", es: "«Tal vez sí. Pero no preparé un descuento esta noche. Preparé una historia con resultados»." },
      ],
      words: [
        { word: "provider", es: "proveedor" },
        { word: "convince", es: "convencer" },
        { word: "discount", es: "descuento" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale comparte pantalla con las gráficas de Northline y habla con seguridad.",
      text: "So I told him the story of last year, and I told it in order.",
      es: "Así que le conté la historia del año pasado, y se la conté en orden.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Last year Northline gave us twelve employees who never spoke English in a meeting. Not one word.", es: "«El año pasado Northline nos dio doce empleados que nunca hablaban inglés en una reunión. Ni una palabra»." },
        { speaker: "vale", text: "In four months, eleven of them presented to their director in English. Their manager wrote me a letter.", es: "«En cuatro meses, once de ellos presentaron a su director en inglés. Su gerente me escribió una carta»." },
        { speaker: "vale", text: "The cheap provider will sell you classes, Mr. Reed. I am selling you employees who finally speak.", es: "«El proveedor barato le venderá clases, señor Reed. Yo le estoy vendiendo empleados que por fin hablan»." },
      ],
      words: [
        { word: "employees", es: "empleados" },
        { word: "presented", es: "presentaron" },
        { word: "letter", es: "carta" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Reed se queda pensativo frente a la cámara, con el bolígrafo detenido.",
      text: "For the first time that night, the shark stopped writing.",
      es: "Por primera vez esa noche, el tiburón dejó de escribir.",
      speaker: "narrator",
      lines: [
        { speaker: "reed", text: "Nobody answered me like that this week. Everybody else immediately offered me a lower number.", es: "«Nadie me respondió así esta semana. Todos los demás me ofrecieron inmediatamente un número más bajo»." },
        { speaker: "vale", text: "I am not everybody else. My price protects the quality you are actually buying.", es: "«Yo no soy todos los demás. Mi precio protege la calidad que en realidad está comprando»." },
        { speaker: "reed", text: "Interesting. I am not saying yes tonight. But I am not saying no either, and that is unusual.", es: "«Interesante. No estoy diciendo que sí esta noche. Pero tampoco estoy diciendo que no, y eso es inusual»." },
      ],
      words: [
        { word: "immediately", es: "inmediatamente" },
        { word: "quality", es: "calidad" },
        { word: "unusual", es: "inusual" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "De vuelta al lunes: el equipo aplaude en la sala mientras Don Tito llega con pupusas.",
      text: "And that, said Vale on Monday, is the complete story of my weekend.",
      es: "Y esa, dijo Vale el lunes, es la historia completa de mi fin de semana.",
      speaker: "narrator",
      lines: [
        { speaker: "camila", text: "You defended your price to an American executive on a Sunday night. In English. Alone.", es: "«Defendiste tu precio ante un ejecutivo americano un domingo por la noche. En inglés. Sola»." },
        { speaker: "tito", text: "Mija, three years ago you could not order a coffee in English. Now you argue with sharks.", es: "«Mija, hace tres años no podías pedir un café en inglés. Ahora discutes con tiburones»." },
        { speaker: "vale", text: "I still get nervous, Don Tito. The difference is that now I speak anyway.", es: "«Todavía me pongo nerviosa, Don Tito. La diferencia es que ahora hablo de todos modos»." },
      ],
      words: [
        { word: "defended", es: "defendiste" },
        { word: "executive", es: "ejecutivo" },
        { word: "nervous", es: "nerviosa" },
      ],
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "El teléfono de Vale muestra un correo nuevo de Mr. Reed; el equipo se acerca a leerlo.",
      text: "Then her phone buzzed, and the story got a second part nobody expected.",
      es: "Entonces su teléfono vibró, y la historia tuvo una segunda parte que nadie esperaba.",
      speaker: "narrator",
      lines: [
        { speaker: "vale", text: "It is from Mr. Reed. He wants a second meeting. Not a call this time — in person.", es: "«Es del señor Reed. Quiere una segunda reunión. Esta vez no una llamada — en persona»." },
        { speaker: "dani", text: "In person? Here? Should I clean the office or should I panic first?", es: "«¿En persona? ¿Aquí? ¿Debo limpiar la oficina o debo entrar en pánico primero?»" },
        { speaker: "vale", text: "Not here. In Guatemala. On Friday. He lands at seven in the morning, and he hates late people.", es: "«Aquí no. En Guatemala. El viernes. Aterriza a las siete de la mañana, y odia a la gente impuntual»." },
      ],
      words: [
        { word: "meeting", es: "reunión" },
        { word: "person", es: "persona" },
        { word: "lands", es: "aterriza" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What did the man from Houston ask Vale?",
      questionEs: "¿Qué le preguntó el hombre de Houston a Vale?",
      options: [
        { label: "If her school could train three offices at the same time", emoji: "🏢" },
        { label: "If she wanted to sell her school", emoji: "🏷️" },
        { label: "If she spoke Portuguese", emoji: "🇧🇷" },
      ],
      answer: 0,
      sayIt: "He asked me if my school could train three offices at the same time.",
      sayItEs: "Ejemplo: «He asked me if my school could train three offices at the same time.»",
      sayItAskEn: "Tell a short story: something unexpected happened to you. What happened first?",
      sayItAskEs: "Cuenta una historia corta: algo inesperado te pasó. ¿Qué pasó primero?",
      sayItCheck: {
        target: "At first, *",
        altTargets: ["First, *", "One day *", "Last week *", "It started when *"],
      },
    },
    {
      id: "q2",
      afterScene: "s8",
      questionEn: "How did Vale answer the pressure about her price?",
      questionEs: "¿Cómo respondió Vale a la presión sobre su precio?",
      options: [
        { label: "She told the story of last year's results instead of giving a discount", emoji: "📈" },
        { label: "She cut her price in half immediately", emoji: "✂️" },
        { label: "She ended the video call", emoji: "📵" },
      ],
      answer: 0,
      sayIt: "I did not prepare a discount. I prepared a story with results.",
      sayItEs: "Ejemplo: «I did not prepare a discount. I prepared a story with results.»",
      sayItAskEn: "Was Vale right to keep her price? Say what you think and why — two sentences.",
      sayItAskEs: "¿Hizo bien Vale en mantener su precio? Di lo que piensas y por qué — dos oraciones.",
      sayItCheck: {
        target: "I think * because *",
        altTargets: ["She was right because *", "She was wrong because *", "In my opinion, * because *", "I agree because *"],
      },
    },
    {
      id: "q3",
      afterScene: "s10",
      questionEn: "What did Don Tito notice about Vale?",
      questionEs: "¿Qué notó Don Tito sobre Vale?",
      options: [
        { label: "Three years ago she could not order a coffee; now she argues with sharks", emoji: "☕" },
        { label: "She finally bought a new phone", emoji: "📱" },
        { label: "She stopped teaching on Saturdays", emoji: "📅" },
      ],
      answer: 0,
      sayIt: "I still get nervous. The difference is that now I speak anyway.",
      sayItEs: "Ejemplo: «I still get nervous. The difference is that now I speak anyway.»",
      sayItAskEn: "What could you not do in English before, and what can you do now?",
      sayItAskEs: "¿Qué no podías hacer en inglés antes, y qué puedes hacer ahora?",
      sayItCheck: {
        target: "Before I could not *, and now I can *",
        altTargets: ["I could not * before", "Now I can *", "Two years ago I could not *, but now *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s7",
    phrase: "I can do it. Pressure is not a reason to stop — it is a reason to speak clearly.",
    es: "Puedo hacerlo. La presión no es razón para parar — es razón para hablar con claridad.",
  },
  habitCard: {
    afterScene: "s9",
    phrase: "English is easy. Mistakes are part of the process. I tell my story in order, out loud.",
    es: "El inglés es fácil. Los errores son parte del proceso. Cuento mi historia en orden, en voz alta.",
    model: "vale",
    modelActionEs: "Vale contó los resultados del año pasado en orden, sin bajar su precio.",
  },
  finaleSeconds: 45,
  continuePrompt: {
    en: "Your turn, 45 seconds: tell the story of something difficult you did. What happened at first, what changed, and what you would do again.",
    es: "Tu turno, 45 segundos: cuenta la historia de algo difícil que hiciste. Qué pasó al principio, qué cambió y qué volverías a hacer.",
  },
  continueWith: ["At first, ...", "Then something changed: ...", "Looking back, I would ..."],
  cliffhanger: {
    en: "Episode 2 — Guatemala, Friday, seven in the morning. Mr. Reed hates late people.",
    es: "Episodio 2 — Guatemala, viernes, siete de la mañana. El señor Reed odia a la gente impuntual.",
  },
};
