import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/tigers-ep13-the-best-of-the-city/cover.jpg";
import s1 from "@/assets/storybook/tigers-ep13-the-best-of-the-city/s1.jpg";
import s2 from "@/assets/storybook/tigers-ep13-the-best-of-the-city/s2.jpg";
import s3 from "@/assets/storybook/tigers-ep13-the-best-of-the-city/s3.jpg";
import s4 from "@/assets/storybook/tigers-ep13-the-best-of-the-city/s4.jpg";
import s5 from "@/assets/storybook/tigers-ep13-the-best-of-the-city/s5.jpg";
import s6 from "@/assets/storybook/tigers-ep13-the-best-of-the-city/s6.jpg";
import s7 from "@/assets/storybook/tigers-ep13-the-best-of-the-city/s7.jpg";
import s8 from "@/assets/storybook/tigers-ep13-the-best-of-the-city/s8.jpg";
import s9 from "@/assets/storybook/tigers-ep13-the-best-of-the-city/s9.jpg";
import s10 from "@/assets/storybook/tigers-ep13-the-best-of-the-city/s10.jpg";
import s11 from "@/assets/storybook/tigers-ep13-the-best-of-the-city/s11.jpg";

/**
 * Season 7 (Tigers) Episode 13 — "The best in the city".
 * Matches Tigers Day 13 (superlatives: the + -est, the most..., the best/worst).
 */
export const TIGERS_EP13_THE_BEST_OF_THE_CITY: StorybookEpisode = {
  id: "tigers-ep13-the-best-of-the-city",
  moduleId: "tigers",
  week: 3,
  title: "The best in the city",
  titleEs: "La mejor de la ciudad",
  episodeLabel: { en: "Season 7 · Episode 13", es: "Temporada 7 · Episodio 13" },
  previously: [
    { en: "Vale defended the school with comparisons in front of Morgan.", es: "Vale defendió la escuela con comparaciones frente a Morgan." },
    { en: "The board decides the contract on Friday.", es: "La junta decide el contrato el viernes." },
    { en: "BigTalk also sent a proposal.", es: "BigTalk también mandó propuesta." },
  ],
  reviewWords: [
    { word: "cheaper", es: "más barato" },
    { word: "stronger", es: "más fuerte" },
    { word: "board", es: "junta directiva" },
  ],
  blurb: {
    en: "Friday: the board decides. And at the same time, an unexpected visitor walks into the school with a notebook.",
    es: "Viernes: la junta decide. Y al mismo tiempo, un visitante inesperado entra a la escuela con una libreta.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Viernes por la mañana: todos miran el teléfono de Vale, esperando la llamada.",
      text: "Friday morning. Everybody watched Vale's phone like it was a football final.",
      es: "Viernes por la mañana. Todos miraban el teléfono de Vale como si fuera una final de fútbol.",
      speaker: "narrator",
      lines: [
        { speaker: "dani", text: "It's nine. The board meets at nine. The meeting started. Why hasn't she called?", es: "«Son las nueve. La junta se reúne a las nueve. La reunión empezó. ¿Por qué no ha llamado?»" },
        { speaker: "camila", text: "Dani, it's nine oh two. Breathe.", es: "«Dani, son las nueve y dos. Respira»." },
        { speaker: "vale", text: "The board meeting is the longest hour of the year. That's normal.", es: "«La junta es la hora más larga del año. Es normal»." },
      ],
      words: [
        { word: "final", es: "final (deportiva)" },
        { word: "longest", es: "la más larga" },
        { word: "normal", es: "normal" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Un hombre elegante con libreta entra a la escuela y observa todo.",
      text: "While they waited, an elegant man with a notebook walked into the school.",
      es: "Mientras esperaban, un hombre elegante con una libreta entró a la escuela.",
      speaker: "narrator",
      lines: [
        { speaker: "dani", text: "Good morning! Welcome! Are you interested in English classes?", es: "«¡Buenos días! ¡Bienvenido! ¿Le interesan clases de inglés?»" },
        { speaker: "herrera", text: "Perhaps. May I… observe a class first?", es: "«Quizás. ¿Puedo… observar una clase primero?»" },
        { speaker: "dani", text: "Of course! The best class of the morning starts right now!", es: "«¡Claro! ¡La mejor clase de la mañana empieza ahora mismo!»" },
      ],
      words: [
        { word: "perhaps", es: "quizás" },
        { word: "observe", es: "observar" },
        { word: "right now", es: "ahora mismo" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Sofía da su primera clase oficial; el visitante toma notas.",
      text: "It was Sofía's first official class, and she was the calmest person in the room.",
      es: "Era la primera clase oficial de Sofía, y era la persona más tranquila del salón.",
      speaker: "narrator",
      lines: [
        { speaker: "sofia", text: "Good morning, everyone! Today, mistakes are welcome. Mistakes are part of the process.", es: "«¡Buenos días a todos! Hoy los errores son bienvenidos. Los errores son parte del proceso»." },
        { speaker: "camila", text: "She passed her demo, by the way. Vale hired her on Sunday.", es: "«Pasó su clase de prueba, por cierto. Vale la contrató el domingo»." },
        { speaker: "vale", text: "Best decision of the month. Watch her work.", es: "«La mejor decisión del mes. Mírenla trabajar»." },
      ],
      words: [
        { word: "official", es: "oficial" },
        { word: "calmest", es: "la más tranquila" },
        { word: "welcome", es: "bienvenidos" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Sofía enseña con un juego; los estudiantes ríen y participan.",
      text: "Sofía taught with a game, and the shyest student in the school raised his hand.",
      es: "Sofía enseñó con un juego, y el estudiante más tímido de la escuela levantó la mano.",
      speaker: "narrator",
      lines: [
        { speaker: "sofia", text: "Okay! Who can make the funniest sentence with 'yesterday'?", es: "«¡Bueno! ¿Quién puede hacer la oración más graciosa con 'yesterday'?»" },
        { speaker: "sofia", text: "Beto! The quietest student in this school! Tell us!", es: "«¡Beto! ¡El estudiante más callado de esta escuela! ¡Cuéntanos!»" },
        { speaker: "sofia", text: "'Yesterday my dog ate my homework, and he learned English.' Ha! The best answer of the day!", es: "«'Yesterday my dog ate my homework, and he learned English'. ¡Ja! ¡La mejor respuesta del día!»" },
      ],
      words: [
        { word: "funniest", es: "la más graciosa" },
        { word: "quietest", es: "el más callado" },
        { word: "raised", es: "levantó" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "El visitante escribe mucho en su libreta; Dani lo observa con sospecha.",
      text: "The visitor wrote a lot. Dani started to feel that this was not a normal student.",
      es: "El visitante escribía mucho. Dani empezó a sentir que este no era un estudiante normal.",
      speaker: "narrator",
      lines: [
        { speaker: "dani", text: "Excuse me, sir. You write more than our students. What do you do?", es: "«Disculpe, señor. Escribe más que nuestros estudiantes. ¿A qué se dedica?»" },
        { speaker: "herrera", text: "I… evaluate things. For a newspaper. A small newspaper.", es: "«Yo… evalúo cosas. Para un periódico. Un periódico pequeño»." },
        { speaker: "dani", text: "A newspaper! Vale! He is from a newspaper!", es: "«¡Un periódico! ¡Vale! ¡Es de un periódico!»" },
      ],
      words: [
        { word: "evaluate", es: "evaluar" },
        { word: "newspaper", es: "periódico" },
        { word: "small", es: "pequeño" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "El visitante se presenta: escribe la guía de escuelas de inglés de la ciudad.",
      text: "I write the city guide of English schools. And this is the most interesting school I have visited.",
      es: "«Escribo la guía de escuelas de inglés de la ciudad. Y esta es la escuela más interesante que he visitado».",
      speaker: "herrera",
      lines: [
        { speaker: "herrera", text: "I write the city guide of English schools. For the newspaper.", es: "«Escribo la guía de escuelas de inglés de la ciudad. Para el periódico»." },
        { speaker: "herrera", text: "And this is the most interesting school I have visited this year.", es: "«Y esta es la escuela más interesante que he visitado este año»." },
        { speaker: "herrera", text: "The smallest, yes. But also the warmest. And that teacher is the best surprise of my month.", es: "«La más pequeña, sí. Pero también la más cálida. Y esa maestra es la mejor sorpresa de mi mes»." },
      ],
      words: [
        { word: "guide", es: "guía" },
        { word: "visited", es: "visitado" },
        { word: "warmest", es: "la más cálida" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Dani no aguanta y pregunta por BigTalk; todos se ríen nerviosos.",
      text: "Dani couldn't wait. And… which school is the WORST in the city?",
      es: "Dani no pudo esperar. «Y… ¿cuál escuela es la PEOR de la ciudad?»",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "And… sorry… which school is the WORST in the city? Just asking. For a friend.", es: "«Y… perdón… ¿cuál escuela es la PEOR de la ciudad? Solo pregunto. Para un amigo»." },
        { speaker: "herrera", text: "Ha! I don't publish 'the worst'. But the most disappointing… has a very big sign.", es: "«¡Ja! No publico «la peor». Pero la más decepcionante… tiene un letrero muy grande»." },
        { speaker: "dani", text: "A very big sign. I see. I SEE.", es: "«Un letrero muy grande. Ya veo. YA VEO»." },
      ],
      words: [
        { word: "worst", es: "la peor" },
        { word: "disappointing", es: "decepcionante" },
        { word: "publish", es: "publicar" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "El teléfono de Vale suena: es Morgan; todos se quedan inmóviles.",
      text: "Then Vale's phone rang. Morgan. The whole room froze.",
      es: "Entonces sonó el teléfono de Vale. Morgan. Todo el salón se congeló.",
      speaker: "narrator",
      lines: [
        { speaker: "vale", text: "Hello, Morgan. …Yes. …Yes, I understand. …Thank you. Goodbye.", es: "«Hola, Morgan. …Sí. …Sí, entiendo. …Gracias. Adiós»." },
        { speaker: "dani", text: "AND?!", es: "«¡¿Y?!»" },
        { speaker: "vale", text: "They need one more week. The board couldn't decide. It's fifty-fifty.", es: "«Necesitan una semana más. La junta no pudo decidir. Es cincuenta-cincuenta»." },
      ],
      words: [
        { word: "rang", es: "sonó" },
        { word: "froze", es: "se congeló" },
        { word: "decide", es: "decidir" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "El visitante escucha todo y levanta la mano con una idea.",
      text: "The visitor raised his hand. Perhaps I can help with that decision.",
      es: "El visitante levantó la mano. «Quizás pueda ayudar con esa decisión».",
      speaker: "herrera",
      lines: [
        { speaker: "herrera", text: "Perhaps I can help. Next week, our newspaper publishes the school guide.", es: "«Quizás pueda ayudar. La próxima semana, nuestro periódico publica la guía de escuelas»." },
        { speaker: "herrera", text: "And I am going to write that this is the best small school in the city.", es: "«Y voy a escribir que esta es la mejor escuela pequeña de la ciudad»." },
        { speaker: "vale", text: "Sir, that… would be the best news of our year.", es: "«Señor, eso… sería la mejor noticia de nuestro año»." },
      ],
      words: [
        { word: "perhaps", es: "quizás" },
        { word: "news", es: "noticia" },
        { word: "year", es: "año" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Celebración contenida: el equipo sonríe; afuera, el letrero de BigTalk se ve enorme.",
      text: "The biggest sign in the city was across the street. The best school, apparently, was on this side.",
      es: "El letrero más grande de la ciudad estaba enfrente. La mejor escuela, aparentemente, estaba de este lado.",
      speaker: "narrator",
      lines: [
        { speaker: "camila", text: "The most expensive marketing in the city can't buy what we have.", es: "«El mercadeo más caro de la ciudad no puede comprar lo que tenemos»." },
        { speaker: "dani", text: "And what do we have?", es: "«¿Y qué tenemos?»" },
        { speaker: "camila", text: "The warmest welcome, the best teachers, and the happiest students.", es: "«La bienvenida más cálida, los mejores maestros y los estudiantes más felices»." },
      ],
      words: [
        { word: "apparently", es: "aparentemente" },
        { word: "welcome", es: "bienvenida" },
        { word: "happiest", es: "más felices" },
      ],
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "Vale cierra el día con la oración de superlativos frente al equipo.",
      text: "Vale closes the day with the superlative sentence.",
      es: "Vale cierra el día con la oración de superlativos.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "We are the smallest school in this neighborhood, that's true.", es: "«Somos la escuela más pequeña de este barrio, es cierto»." },
        { speaker: "vale", text: "But we are the warmest, the most personal, and the most honest.", es: "«Pero somos la más cálida, la más personal y la más honesta»." },
        { speaker: "vale", text: "And next week, the whole city is going to read it.", es: "«Y la próxima semana, toda la ciudad lo va a leer»." },
      ],
      words: [
        { word: "smallest", es: "la más pequeña" },
        { word: "most honest", es: "la más honesta" },
        { word: "whole", es: "toda" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "Who was the surprise star of Sofía's class?",
      questionEs: "¿Quién fue la estrella sorpresa de la clase de Sofía?",
      options: [
        { label: "Beto, the quietest student in the school", emoji: "🌟" },
        { label: "Dani, the coordinator", emoji: "📋" },
        { label: "Don Tito", emoji: "🫓" },
      ],
      answer: 0,
      sayIt: "The quietest student gave the best answer of the day.",
      sayItEs: "Ejemplo: «The quietest student gave the best answer of the day.»",
      sayItAskEn: "Who is the funniest person in your family? And the calmest?",
      sayItAskEs: "¿Quién es la persona más graciosa de tu familia? ¿Y la más tranquila?",
      sayItCheck: {
        target: "The *est person in my * is *",
        altTargets: ["The funniest * is *", "* is the most *", "My * is the *est"],
      },
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "What did the visitor say about the school?",
      questionEs: "¿Qué dijo el visitante sobre la escuela?",
      options: [
        { label: "The smallest, but the warmest and most interesting", emoji: "🏆" },
        { label: "The biggest school in the city", emoji: "🏢" },
        { label: "The worst school of the year", emoji: "👎" },
      ],
      answer: 0,
      sayIt: "This is the smallest school, but the warmest and the most interesting.",
      sayItEs: "Ejemplo: «This is the smallest school, but the warmest and the most interesting.»",
      sayItAskEn: "Describe something you love using three superlatives.",
      sayItAskEs: "Describe algo que amas usando tres superlativos.",
      sayItCheck: {
        target: "* is the *est *",
        altTargets: ["It is the most *", "* is the best *", "It is the *est and the most *"],
      },
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "What is going to happen next week in the newspaper?",
      questionEs: "¿Qué va a pasar la próxima semana en el periódico?",
      options: [
        { label: "They will publish that it's the best small school in the city", emoji: "📰" },
        { label: "They will publish photos of BigTalk", emoji: "🪧" },
        { label: "They will close the school", emoji: "🔒" },
      ],
      answer: 0,
      sayIt: "Next week, the newspaper will say this is the best small school in the city.",
      sayItEs: "Ejemplo: «Next week, the newspaper will say this is the best small school in the city.»",
      sayItAskEn: "What is the best thing that could happen to you next week?",
      sayItAskEs: "¿Qué es lo mejor que podría pasarte la próxima semana?",
      sayItCheck: {
        target: "The best thing would be *",
        altTargets: ["Next week, * will *", "The most exciting thing is *", "I hope *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s6",
    phrase: "Mistakes are part of the process — even the quietest student can give the best answer.",
    es: "Los errores son parte del proceso — hasta el estudiante más callado puede dar la mejor respuesta.",
  },
  habitCard: {
    afterScene: "s4",
    phrase: "I learn with games and laughter. The funniest sentence is the easiest to remember.",
    es: "Aprendo con juegos y risas. La oración más graciosa es la más fácil de recordar.",
    model: "sofia",
    modelActionEs: "Sofía enseñó superlativos con un juego y despertó al alumno más callado.",
  },
  continuePrompt: {
    en: "Describe your school, your job, or your family with three superlatives. Be proud!",
    es: "Describe tu escuela, tu trabajo o tu familia con tres superlativos. ¡Con orgullo!",
  },
  continueWith: ["The best thing about ... is ...", "The most interesting ...", "The ...est of all is ..."],
  cliffhanger: {
    en: "Episode 14: The newspaper comes out — and the phone doesn't stop ringing.",
    es: "Episodio 14: Sale el periódico — y el teléfono no deja de sonar.",
  },
};
