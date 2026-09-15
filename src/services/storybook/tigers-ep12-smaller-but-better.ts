import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/tigers-ep12-smaller-but-better/cover.jpg";
import s1 from "@/assets/storybook/tigers-ep12-smaller-but-better/s1.jpg";
import s2 from "@/assets/storybook/tigers-ep12-smaller-but-better/s2.jpg";
import s3 from "@/assets/storybook/tigers-ep12-smaller-but-better/s3.jpg";
import s4 from "@/assets/storybook/tigers-ep12-smaller-but-better/s4.jpg";
import s5 from "@/assets/storybook/tigers-ep12-smaller-but-better/s5.jpg";
import s6 from "@/assets/storybook/tigers-ep12-smaller-but-better/s6.jpg";
import s7 from "@/assets/storybook/tigers-ep12-smaller-but-better/s7.jpg";
import s8 from "@/assets/storybook/tigers-ep12-smaller-but-better/s8.jpg";
import s9 from "@/assets/storybook/tigers-ep12-smaller-but-better/s9.jpg";
import s10 from "@/assets/storybook/tigers-ep12-smaller-but-better/s10.jpg";
import s11 from "@/assets/storybook/tigers-ep12-smaller-but-better/s11.jpg";

/**
 * Season 7 (Tigers) Episode 12 — "Smaller, but better".
 * Matches Tigers Day 12 (comparatives: short adjectives -er, long adjectives
 * more..., irregular better/worse).
 */
export const TIGERS_EP12_SMALLER_BUT_BETTER: StorybookEpisode = {
  id: "tigers-ep12-smaller-but-better",
  moduleId: "tigers",
  week: 3,
  title: "Smaller, but better",
  titleEs: "Más pequeña, pero mejor",
  episodeLabel: { en: "Season 7 · Episode 12", es: "Temporada 7 · Episodio 12" },
  previously: [
    { en: "The team walked into the Northline renewal meeting.", es: "El equipo entró a la reunión de renovación con Northline." },
    { en: "Don Tito showed photos of how the street used to be.", es: "Don Tito mostró fotos de cómo era la calle antes." },
    { en: "Vale took an old photo into the meeting as her opening.", es: "Vale llevó una foto vieja a la reunión como apertura." },
  ],
  reviewWords: [
    { word: "used to", es: "antes / solía" },
    { word: "growth", es: "crecimiento" },
    { word: "renewal", es: "renovación" },
  ],
  blurb: {
    en: "Inside the meeting, Morgan opens a surprise: BigTalk also sent a proposal. Vale must compare the two schools — and win.",
    es: "Dentro de la reunión, Morgan abre una sorpresa: BigTalk también mandó propuesta. Vale debe comparar las dos escuelas — y ganar.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Sala de juntas de Northline: Morgan al frente, Vale y Dani sentados con su carpeta.",
      text: "The meeting room was cold and enormous. Morgan stood at the front.",
      es: "La sala de juntas estaba fría y era enorme. Morgan estaba al frente.",
      speaker: "narrator",
      lines: [
        { speaker: "morgan", text: "Good afternoon. Before you present, I have to be transparent.", es: "«Buenas tardes. Antes de que presentes, tengo que ser transparente»." },
        { speaker: "morgan", text: "We received two proposals this year: yours, and one from BigTalk.", es: "«Recibimos dos propuestas este año: la tuya y una de BigTalk»." },
        { speaker: "dani", text: "Of course. Of course BigTalk sent a proposal.", es: "«Claro. Claro que BigTalk mandó propuesta»." },
      ],
      words: [
        { word: "transparent", es: "transparente" },
        { word: "received", es: "recibimos" },
        { word: "proposals", es: "propuestas" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Morgan pone las dos propuestas lado a lado en la pantalla.",
      text: "So let's compare them. Bigger is not always better. Convince me.",
      es: "«Así que comparemos. Más grande no siempre es mejor. Convénzame».",
      speaker: "morgan",
      lines: [
        { speaker: "morgan", text: "Let's compare the two schools. Bigger is not always better.", es: "«Comparemos las dos escuelas. Más grande no siempre es mejor»." },
        { speaker: "morgan", text: "BigTalk is bigger and cheaper. Convince me that you are the better option.", es: "«BigTalk es más grande y más barato. Convénzame de que ustedes son la mejor opción»." },
        { speaker: "vale", text: "With pleasure. Let's look at the whole picture.", es: "«Con gusto. Miremos el panorama completo»." },
      ],
      words: [
        { word: "compare", es: "comparar" },
        { word: "cheaper", es: "más barato" },
        { word: "option", es: "opción" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale presenta: nuestras clases son más pequeñas y más personales.",
      text: "Our classes are smaller. And smaller classes are more personal.",
      es: "«Nuestras clases son más pequeñas. Y las clases más pequeñas son más personales».",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "First: our classes are smaller than BigTalk's. Eight students, not thirty.", es: "«Primero: nuestras clases son más pequeñas que las de BigTalk. Ocho estudiantes, no treinta»." },
        { speaker: "vale", text: "Smaller classes are more personal. Every student speaks in every class.", es: "«Las clases más pequeñas son más personales. Cada estudiante habla en cada clase»." },
        { speaker: "morgan", text: "That is true. Your completion rate was higher than theirs, too.", es: "«Eso es cierto. Su tasa de finalización también fue más alta que la de ellos»." },
      ],
      words: [
        { word: "smaller", es: "más pequeñas" },
        { word: "personal", es: "personales" },
        { word: "higher", es: "más alta" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale señala datos: nuestros resultados son mejores y más rápidos.",
      text: "Our results are better, and our students improve faster.",
      es: "«Nuestros resultados son mejores y nuestros estudiantes mejoran más rápido».",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Second: results. Our test scores are better than BigTalk's national average.", es: "«Segundo: resultados. Nuestras calificaciones son mejores que el promedio nacional de BigTalk»." },
        { speaker: "vale", text: "And our students improve faster, because they speak more in class.", es: "«Y nuestros estudiantes mejoran más rápido, porque hablan más en clase»." },
        { speaker: "dani", text: "Your own report says it, page twelve.", es: "«Su propio informe lo dice, página doce»." },
      ],
      words: [
        { word: "scores", es: "calificaciones" },
        { word: "average", es: "promedio" },
        { word: "faster", es: "más rápido" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Morgan cruza los brazos: pero BigTalk es más barato.",
      text: "But BigTalk is cheaper. Money is money, Vale.",
      es: "«Pero BigTalk es más barato. El dinero es dinero, Vale».",
      speaker: "morgan",
      lines: [
        { speaker: "morgan", text: "But BigTalk is cheaper. Money is money, Vale.", es: "«Pero BigTalk es más barato. El dinero es dinero, Vale»." },
        { speaker: "vale", text: "Cheaper per class, yes. But more expensive per result.", es: "«Más barato por clase, sí. Pero más caro por resultado»." },
        { speaker: "vale", text: "If half of the students quit, the cheaper school becomes the more expensive one.", es: "«Si la mitad de los estudiantes abandona, la escuela más barata se vuelve la más cara»." },
      ],
      words: [
        { word: "money", es: "dinero" },
        { word: "expensive", es: "caro" },
        { word: "quit", es: "abandona" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Dani presenta el servicio: más cercano, más humano, más flexible.",
      text: "And our service is closer. When a student has a problem, they call… me.",
      es: "«Y nuestro servicio es más cercano. Cuando un estudiante tiene un problema, llama… a mí».",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "And our service is closer and more human.", es: "«Y nuestro servicio es más cercano y más humano»." },
        { speaker: "dani", text: "At BigTalk you talk to a machine. Here, you talk to me. I am friendlier than a machine.", es: "«En BigTalk hablas con una máquina. Aquí hablas conmigo. Soy más amable que una máquina»." },
        { speaker: "morgan", text: "Most people are friendlier than machines, Dani.", es: "«La mayoría de las personas son más amables que las máquinas, Dani»." },
      ],
      words: [
        { word: "closer", es: "más cercano" },
        { word: "machine", es: "máquina" },
        { word: "friendlier", es: "más amable" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Morgan sonríe por primera vez y toma notas.",
      text: "For the first time, Morgan smiled and wrote something down.",
      es: "Por primera vez, Morgan sonrió y escribió algo.",
      speaker: "narrator",
      lines: [
        { speaker: "morgan", text: "Let me summarize: you are smaller, more personal, and your results are better.", es: "«Déjenme resumir: son más pequeños, más personales, y sus resultados son mejores»." },
        { speaker: "morgan", text: "But you are also more expensive. That is a real problem for my bosses.", es: "«Pero también son más caros. Ese es un problema real para mis jefes»." },
        { speaker: "vale", text: "Then let's talk about flexibility. We are more flexible than any chain.", es: "«Entonces hablemos de flexibilidad. Somos más flexibles que cualquier cadena»." },
      ],
      words: [
        { word: "summarize", es: "resumir" },
        { word: "bosses", es: "jefes" },
        { word: "flexible", es: "flexibles" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale ofrece un plan más flexible: horarios, niveles y reportes a la medida.",
      text: "BigTalk has one system for everyone. We build a system for you.",
      es: "«BigTalk tiene un sistema para todos. Nosotros construimos un sistema para ustedes».",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "BigTalk has one system for a thousand schools. We build one system for you.", es: "«BigTalk tiene un sistema para mil escuelas. Nosotros construimos un sistema para ustedes»." },
        { speaker: "vale", text: "Schedules, levels, reports — more flexible, faster to change, easier to manage.", es: "«Horarios, niveles, reportes: más flexibles, más rápidos de cambiar, más fáciles de manejar»." },
        { speaker: "morgan", text: "A custom program… my bosses like that word.", es: "«Un programa a la medida… a mis jefes les gusta esa palabra»." },
      ],
      words: [
        { word: "system", es: "sistema" },
        { word: "flexible", es: "flexible" },
        { word: "custom", es: "a la medida" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Morgan hace la última pregunta difícil: por qué no ustedes son peores en algo.",
      text: "One last hard question: what is one thing BigTalk does better than you?",
      es: "«Una última pregunta difícil: ¿qué es algo que BigTalk hace mejor que ustedes?»",
      speaker: "morgan",
      lines: [
        { speaker: "morgan", text: "Last hard question. Honesty check: what does BigTalk do better than you?", es: "«Última pregunta difícil. Prueba de honestidad: ¿qué hace BigTalk mejor que ustedes?»" },
        { speaker: "vale", text: "Marketing. Their marketing is much better than ours. Their sign is bigger, too.", es: "«Mercadeo. Su mercadeo es mucho mejor que el nuestro. Su letrero también es más grande»." },
        { speaker: "vale", text: "But teaching is not marketing. And in teaching, we are simply better.", es: "«Pero enseñar no es mercadeo. Y enseñando, simplemente somos mejores»." },
      ],
      words: [
        { word: "honesty", es: "honestidad" },
        { word: "marketing", es: "mercadeo" },
        { word: "simply", es: "simplemente" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Morgan cierra la carpeta: decisión el viernes; todos contienen la respiración.",
      text: "Morgan closed the folder. I will present both options to the board on Friday.",
      es: "Morgan cerró la carpeta. «Presentaré ambas opciones a la junta el viernes».",
      speaker: "morgan",
      lines: [
        { speaker: "morgan", text: "I will present both options to the board this Friday.", es: "«Presentaré ambas opciones a la junta este viernes»." },
        { speaker: "morgan", text: "You made a stronger case than I expected, Vale. A much stronger case.", es: "«Hiciste un caso más fuerte de lo que esperaba, Vale. Mucho más fuerte»." },
        { speaker: "vale", text: "Thank you, Morgan. We'll wait for Friday.", es: "«Gracias, Morgan. Esperaremos al viernes»." },
      ],
      words: [
        { word: "board", es: "junta directiva" },
        { word: "stronger", es: "más fuerte" },
        { word: "expected", es: "esperaba" },
      ],
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "En la calle, Dani y Vale resumen la comparación con una oración final.",
      text: "Outside, Dani and Vale summarize the comparison in one final sentence.",
      es: "Afuera, Dani y Vale resumen la comparación en una oración final.",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "So, final sentence. BigTalk is bigger and cheaper…", es: "«Entonces, oración final. BigTalk es más grande y más barato…»" },
        { speaker: "vale", text: "…but we are smaller, better, and more personal.", es: "«…pero nosotros somos más pequeños, mejores y más personales»." },
        { speaker: "dani", text: "And their sign is bigger, but our students are happier.", es: "«Y su letrero es más grande, pero nuestros estudiantes son más felices»." },
      ],
      words: [
        { word: "final", es: "final" },
        { word: "happier", es: "más felices" },
        { word: "sign", es: "letrero" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "Why are smaller classes better, according to Vale?",
      questionEs: "¿Por qué las clases más pequeñas son mejores, según Vale?",
      options: [
        { label: "They are more personal and every student speaks", emoji: "🗣️" },
        { label: "They are colder", emoji: "🥶" },
        { label: "They finish earlier", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "Our classes are smaller, and smaller classes are more personal.",
      sayItEs: "Ejemplo: «Our classes are smaller, and smaller classes are more personal.»",
      sayItAskEn: "Compare two things in your life. Which one is better? Why?",
      sayItAskEs: "Compara dos cosas de tu vida. ¿Cuál es mejor? ¿Por qué?",
      sayItCheck: {
        target: "* is *er than *",
        altTargets: ["* is better than *", "* is more * than *", "I think * is better because *"],
      },
    },
    {
      id: "q2",
      afterScene: "s5",
      questionEn: "How did Vale answer when Morgan said BigTalk is cheaper?",
      questionEs: "¿Cómo respondió Vale cuando Morgan dijo que BigTalk es más barato?",
      options: [
        { label: "Cheaper per class, but more expensive per result", emoji: "⚖️" },
        { label: "She offered a discount immediately", emoji: "🏷️" },
        { label: "She left the meeting", emoji: "🚪" },
      ],
      answer: 0,
      sayIt: "BigTalk is cheaper per class, but more expensive per result.",
      sayItEs: "Ejemplo: «BigTalk is cheaper per class, but more expensive per result.»",
      sayItAskEn: "Is cheaper always better? Give me your opinion with a comparison.",
      sayItAskEs: "¿Lo más barato siempre es mejor? Dame tu opinión con una comparación.",
      sayItCheck: {
        target: "* is cheaper, but * is better",
        altTargets: ["Cheaper is not always better because *", "* is more expensive, but *", "I think *"],
      },
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "What did Vale say BigTalk does better?",
      questionEs: "¿Qué dijo Vale que BigTalk hace mejor?",
      options: [
        { label: "Marketing — their sign is bigger too", emoji: "🪧" },
        { label: "Teaching", emoji: "📚" },
        { label: "Customer service", emoji: "🤝" },
      ],
      answer: 0,
      sayIt: "Their marketing is better than ours, but in teaching, we are better.",
      sayItEs: "Ejemplo: «Their marketing is better than ours, but in teaching, we are better.»",
      sayItAskEn: "Tell me something you do better than other people, and something you do worse. Be honest.",
      sayItAskEs: "Dime algo que haces mejor que otras personas y algo que haces peor. Sé honesto.",
      sayItCheck: {
        target: "I am better at *, but *",
        altTargets: ["I am worse at *, but better at *", "My * is better than *, but my * is worse", "Honestly, I *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s5",
    phrase: "I can do it, even against a giant. Comparisons are just words in the right order.",
    es: "Puedo hacerlo, aun contra un gigante. Las comparaciones solo son palabras en el orden correcto.",
  },
  habitCard: {
    afterScene: "s8",
    phrase: "I compare honestly: better, worse, bigger, smaller. Honesty makes my argument stronger.",
    es: "Comparo con honestidad: mejor, peor, más grande, más pequeño. La honestidad hace mi argumento más fuerte.",
    model: "vale",
    modelActionEs: "Vale admitió lo que BigTalk hace mejor — y eso hizo su caso más fuerte.",
  },
  continuePrompt: {
    en: "Compare two options in your life — two jobs, two phones, two schools. Which is better and why?",
    es: "Compara dos opciones de tu vida — dos trabajos, dos teléfonos, dos escuelas. ¿Cuál es mejor y por qué?",
  },
  continueWith: ["A is bigger than B, but ...", "B is better because ...", "For me, the better option is ..."],
  cliffhanger: {
    en: "Episode 13: Friday arrives — the board decides… and someone from BigTalk visits the school.",
    es: "Episodio 13: Llega el viernes — la junta decide… y alguien de BigTalk visita la escuela.",
  },
};
