import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced1-ep15-the-room-that-interrupts/cover.jpg";
import s1 from "@/assets/storybook/advanced1-ep15-the-room-that-interrupts/s1.jpg";
import s2 from "@/assets/storybook/advanced1-ep15-the-room-that-interrupts/s2.jpg";
import s3 from "@/assets/storybook/advanced1-ep15-the-room-that-interrupts/s3.jpg";
import s4 from "@/assets/storybook/advanced1-ep15-the-room-that-interrupts/s4.jpg";
import s5 from "@/assets/storybook/advanced1-ep15-the-room-that-interrupts/s5.jpg";
import s6 from "@/assets/storybook/advanced1-ep15-the-room-that-interrupts/s6.jpg";
import s7 from "@/assets/storybook/advanced1-ep15-the-room-that-interrupts/s7.jpg";
import s8 from "@/assets/storybook/advanced1-ep15-the-room-that-interrupts/s8.jpg";
import s9 from "@/assets/storybook/advanced1-ep15-the-room-that-interrupts/s9.jpg";

export const ADVANCED1_EP15_THE_ROOM_THAT_INTERRUPTS: StorybookEpisode = {
  id: "advanced1-ep15-the-room-that-interrupts",
  moduleId: "advanced-1",
  week: 3,
  title: "The room that interrupts",
  titleEs: "La sala que interrumpe",
  episodeLabel: {
    en: "Advanced 1 · Episode 15",
    es: "Advanced 1 · Episodio 15",
  },
  previously: [
    {
      en: "Vale negotiated an hour about money without saying \"no\".",
      es: "Vale negoció una hora sobre dinero sin decir \"no\".",
    },
    {
      en: "Friday's panel plans to interrupt her on purpose.",
      es: "El panel del viernes planea interrumpirla a propósito.",
    },
    {
      en: "Crown presents in the same room right after her.",
      es: "Crown presenta en la misma sala justo después de ella.",
    },
  ],
  reviewWords: [
    { word: "panel", es: "panel" },
    { word: "evidence", es: "evidencia" },
    { word: "assumption", es: "suposición" },
    { word: "pilot", es: "plan piloto" },
    { word: "pressure", es: "presión" },
  ],
  blurb: {
    en: "Three people interrupt her on purpose. Vale doesn't win the argument — she finishes it.",
    es: "Tres personas la interrumpen a propósito. Vale no gana la discusión: la termina.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Camila, Vale and Dani prepare for the hostile panel early in the morning.",
      text: "The rule for a room that interrupts.",
      es: "La regla para una sala que interrumpe.",
      speaker: "camila",
      cast: ["camila", "vale", "dani"],
      lines: [
        {
          speaker: "camila",
          text: "They're going to cut you off in the middle of a sentence. If you restart the sentence, you lose the room.",
          es: "Te van a cortar a mitad de una frase. Si reinicias la frase, pierdes la sala.",
        },
        {
          speaker: "vale",
          text: "Then I answer the interruption in one line and go back to where I stopped. \"That's a fair question, and here's the short answer — and coming back to the point I was making.\"",
          es: "Entonces respondo la interrupción en una línea y vuelvo a donde me quedé. \"Es una pregunta justa, y esta es la respuesta corta, y volviendo al punto que estaba haciendo\".",
        },
        {
          speaker: "dani",
          text: "And if they interrupt the answer to the interruption?",
          es: "¿Y si interrumpen la respuesta a la interrupción?",
        },
        {
          speaker: "vale",
          text: "Then I let them finish, and I answer both at once. Talking over people is how you look nervous.",
          es: "Entonces los dejo terminar y respondo las dos a la vez. Hablar encima de la gente es como te ves nervioso.",
        },
      ],
      words: [
        { word: "cut you off", es: "cortarte" },
        { word: "restart", es: "reiniciar" },
        { word: "nervous", es: "nervioso" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Barrett opens the panel with a hard question about evidence.",
      text: "First interruption: where is the evidence?",
      es: "Primera interrupción: ¿dónde está la evidencia?",
      speaker: "barrett",
      cast: ["barrett", "vale"],
      lines: [
        {
          speaker: "barrett",
          text: "You keep saying speaking minutes. Where is the evidence that minutes change performance on a real call?",
          es: "Usted sigue diciendo minutos hablados. ¿Dónde está la evidencia de que los minutos cambian el desempeño en una llamada real?",
        },
        {
          speaker: "vale",
          text: "That's a fair question, and the short answer is the pilot I ran with forty of your former agents: their call-handling time dropped by two minutes after six weeks. Coming back to the point I was making, minutes are the only variable I can control every week.",
          es: "Es una pregunta justa, y la respuesta corta es el piloto que hice con cuarenta de sus exagentes: su tiempo de atención de llamadas bajó dos minutos después de seis semanas. Volviendo al punto que estaba haciendo, los minutos son la única variable que puedo controlar cada semana.",
        },
      ],
      words: [
        { word: "evidence", es: "evidencia" },
        { word: "pilot", es: "piloto" },
        { word: "variable", es: "variable" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Barrett challenges Vale's assumption about who should be trained.",
      text: "Second interruption: the assumption.",
      es: "Segunda interrupción: la suposición.",
      speaker: "barrett",
      cast: ["barrett", "vale"],
      lines: [
        {
          speaker: "barrett",
          text: "You're assuming we want to train the agents we already have. We could simply hire people who already speak English.",
          es: "Está suponiendo que queremos formar a los agentes que ya tenemos. Podríamos simplemente contratar gente que ya hable inglés.",
        },
        {
          speaker: "vale",
          text: "You could, and some companies do. However, you've tried it for three years and your salary band doesn't reach those candidates, which is exactly why six hundred people leave before month four.",
          es: "Podrían, y algunas empresas lo hacen. Sin embargo, lo han intentado tres años y su banda salarial no alcanza a esos candidatos, que es exactamente por qué seiscientas personas se van antes del mes cuatro.",
        },
        {
          speaker: "vale",
          text: "What I'm proposing isn't cheaper than hiring; it's cheaper than replacing.",
          es: "Lo que propongo no es más barato que contratar; es más barato que reemplazar.",
        },
      ],
      words: [
        { word: "assuming", es: "suponiendo" },
        { word: "salary band", es: "banda salarial" },
        { word: "candidates", es: "candidatos" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Reed asks the personal question in front of the panel.",
      text: "Third interruption: the personal one.",
      es: "Tercera interrupción: la personal.",
      speaker: "reed",
      cast: ["reed", "vale"],
      lines: [
        {
          speaker: "reed",
          text: "Last one, and it's personal. You're one person with one academy. What happens to us if you get sick?",
          es: "La última, y es personal. Usted es una persona con una academia. ¿Qué nos pasa si usted se enferma?",
        },
        {
          speaker: "vale",
          text: "Nothing happens to you, because nothing in the programme depends on me being in the room. My senior teachers have run full cohorts without me for two years, and every lesson is documented to the minute.",
          es: "No les pasa nada, porque nada del programa depende de que yo esté en la sala. Mis maestras senior han llevado cohortes completas sin mí durante dos años, y cada lección está documentada al minuto.",
        },
        {
          speaker: "vale",
          text: "If the method only worked when I taught it, it wouldn't be a method. It would be a personality.",
          es: "Si el método solo funcionara cuando yo lo enseño, no sería un método. Sería una personalidad.",
        },
      ],
      words: [
        { word: "depends", es: "depende" },
        { word: "cohorts", es: "cohortes" },
        { word: "documented", es: "documentado" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Barrett closes her folder after the final exchange.",
      text: "The panel stops interrupting.",
      es: "El panel deja de interrumpir.",
      speaker: "barrett",
      cast: ["barrett", "vale"],
      lines: [
        {
          speaker: "barrett",
          text: "For the record, we interrupted you eleven times. You never restarted a sentence.",
          es: "Para el registro, la interrumpimos once veces. Usted nunca reinició una frase.",
        },
        {
          speaker: "vale",
          text: "I've taught teenagers at seven in the morning. Eleven interruptions is a quiet room.",
          es: "He dado clase a adolescentes a las siete de la mañana. Once interrupciones es una sala tranquila.",
        },
      ],
      words: [
        { word: "record", es: "registro" },
        { word: "interrupted", es: "interrumpieron" },
        { word: "quiet", es: "tranquila" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Reed and Barrett talk in the corridor after Crown's presentation.",
      text: "Crown presents next.",
      es: "Crown presenta después.",
      speaker: "reed",
      cast: ["reed", "barrett"],
      lines: [
        {
          speaker: "reed",
          text: "Crown used their slot to explain why she's too small.",
          es: "Crown usó su turno para explicar por qué ella es demasiado pequeña.",
        },
        {
          speaker: "barrett",
          text: "I noticed. They spent forty minutes on her and eight on us. That tells me which of them has been thinking through our problem.",
          es: "Lo noté. Pasaron cuarenta minutos en ella y ocho en nosotros. Eso me dice cuál de los dos ha estado analizando nuestro problema.",
        },
      ],
      words: [
        { word: "slot", es: "turno" },
        { word: "spent", es: "pasaron" },
        { word: "problem", es: "problema" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Camila, Dani and Vale sit down in the academy kitchen after the panel.",
      text: "After the hardest week.",
      es: "Después de la semana más dura.",
      speaker: "camila",
      cast: ["camila", "dani", "vale"],
      lines: [
        {
          speaker: "camila",
          text: "We went in with Elena's numbers, Lidia's classes and your mouth. That's the whole company.",
          es: "Entramos con los números de Elena, las clases de Lidia y tu boca. Esa es toda la empresa.",
        },
        {
          speaker: "dani",
          text: "Three weeks ago I couldn't explain a decision in English without apologising for it.",
          es: "Hace tres semanas yo no podía explicar una decisión en inglés sin pedir disculpas por ella.",
        },
        {
          speaker: "vale",
          text: "That's the part that actually pays off. Not the contract — the sentence you can now finish while somebody is interrupting you.",
          es: "Esa es la parte que de verdad vale la pena. No el contrato: la frase que ahora puedes terminar mientras alguien te interrumpe.",
        },
      ],
      words: [
        { word: "decision", es: "decisión" },
        { word: "apologising", es: "disculparse" },
        { word: "finish", es: "terminar" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Lidia reminds Dani how much has changed in three weeks.",
      text: "Lidia measures the change.",
      es: "Lidia mide el cambio.",
      speaker: "lidia",
      cast: ["lidia", "vale", "dani"],
      lines: [
        {
          speaker: "lidia",
          text: "Three weeks ago you couldn't say why you left your last job without looking at the floor.",
          es: "Hace tres semanas no podías decir por qué dejaste tu último trabajo sin mirar al suelo.",
        },
        {
          speaker: "dani",
          text: "Now I can say it in one sentence, with a number in it.",
          es: "Ahora puedo decirlo en una frase, con un número dentro.",
        },
        {
          speaker: "vale",
          text: "That's the whole week: why you left, what you'd fix, why here, what it costs, and how you hold the floor when they push.",
          es: "Eso es toda la semana: por qué te fuiste, qué arreglarías, por qué aquí, cuánto cuesta y cómo mantienes la palabra cuando te presionan.",
        },
      ],
      words: [
        { word: "floor", es: "suelo" },
        { word: "fix", es: "arreglar" },
        { word: "hold", es: "mantener" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Reed calls Vale with news about the decision date.",
      text: "The decision moves.",
      es: "La decisión se adelanta.",
      speaker: "reed",
      cast: ["reed", "vale"],
      lines: [
        {
          speaker: "reed",
          text: "The committee moved the decision to Monday. And they asked for one more thing: a written summary of your first ninety days.",
          es: "El comité movió la decisión al lunes. Y pidieron una cosa más: un resumen escrito de sus primeros noventa días.",
        },
        {
          speaker: "vale",
          text: "Then I'll write it tonight. Monday I'd rather be waiting than working.",
          es: "Entonces lo escribo esta noche. El lunes prefiero estar esperando que trabajando.",
        },
      ],
      words: [
        { word: "committee", es: "comité" },
        { word: "summary", es: "resumen" },
        { word: "waiting", es: "esperando" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What does Vale do every time the panel interrupts her?",
      questionEs: "¿Qué hace Vale cada vez que el panel la interrumpe?",
      options: [
        { label: "She starts her sentence again from the beginning", emoji: "🔁" },
        { label: "She answers in one line and returns to her point", emoji: "🎯" },
        { label: "She talks louder than the panel", emoji: "📢" },
      ],
      answer: 1,
      sayIt: "She answers in one line and returns to her point.",
      sayItEs: "Responde en una línea y vuelve a su punto.",
      sayItCheck: {
        target: "She answers in one line and returns to her point",
        altTargets: ["She answers and goes back to her point"],
      },
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "Someone interrupts you in a meeting. Answer the interruption in one line and go back to your point.",
      questionEs: "Alguien te interrumpe en una reunión. Responde la interrupción en una línea y vuelve a tu punto.",
      options: [
        { label: "I am ready to answer", emoji: "🎤" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "That's a fair question, and the short answer is that we tested it last month with twenty clients. Coming back to the point I was making, the problem isn't the price; it's the time we take to answer.",
      sayItEs: "Es una pregunta justa, y la respuesta corta es que lo probamos el mes pasado con veinte clientes. Volviendo al punto que estaba haciendo, el problema no es el precio; es el tiempo que tardamos en responder.",
      sayItAskEn: "Answer the interruption in one line, then say \"coming back to the point I was making\".",
      sayItAskEs: "Responde la interrupción en una línea y luego di \"coming back to the point I was making\".",
      sayItCheck: {
        target: "That's a fair question *",
        altTargets: ["Coming back to the point *", "The short answer is *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s6",
    phrase: "An interruption is not a stop sign.",
    es: "Una interrupción no es una señal de alto.",
  },
  habitCard: {
    afterScene: "s1",
    phrase: "When someone interrupts me, I answer in one line and finish my sentence.",
    es: "Cuando alguien me interrumpe, respondo en una línea y termino mi frase.",
    model: "vale",
    modelActionEs: "Vale fue interrumpida once veces y nunca reinició una frase.",
  },
  expressions: [
    {
      phrase: "cut off",
      variants: ["cut you off", "cuts off", "cutting off"],
      es: "interrumpir a alguien",
      kind: "phrasal",
      example: "They're going to cut you off in the middle of a sentence.",
      exampleEs: "Te van a cortar a mitad de una frase.",
    },
    {
      phrase: "think through",
      variants: ["thinking through", "thinks through", "thought through"],
      es: "analizar a fondo",
      kind: "phrasal",
      example: "That tells me which of them has been thinking through our problem.",
      exampleEs: "Eso me dice cuál de los dos ha estado analizando nuestro problema.",
    },
    {
      phrase: "pay off",
      variants: ["pays off", "paid off", "paying off"],
      es: "valer la pena",
      kind: "idiom",
      example: "That's the part that actually pays off.",
      exampleEs: "Esa es la parte que de verdad vale la pena.",
    },
    {
      phrase: "hold the floor",
      variants: ["holds the floor", "held the floor", "holding the floor"],
      es: "mantener la palabra",
      kind: "idiom",
      example: "How you hold the floor when they push.",
      exampleEs: "Cómo mantienes la palabra cuando te presionan.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: defend an idea while somebody interrupts you, and finish your point.",
    es: "Treinta segundos: defiende una idea mientras alguien te interrumpe, y termina tu punto.",
  },
  continueWith: [
    "That's a fair question, and ...",
    "Coming back to the point I was making, ...",
    "What I'm proposing is ...",
  ],
  cliffhanger: {
    en: "The decision comes on Monday, and the committee wants Vale's first ninety days in writing.",
    es: "La decisión llega el lunes, y el comité quiere los primeros noventa días de Vale por escrito.",
  },
};
