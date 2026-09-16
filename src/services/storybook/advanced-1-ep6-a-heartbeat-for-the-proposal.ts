import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced1-ep6-a-heartbeat-for-the-proposal/cover.jpg";
import s1 from "@/assets/storybook/advanced1-ep6-a-heartbeat-for-the-proposal/s1.jpg";
import s2 from "@/assets/storybook/advanced1-ep6-a-heartbeat-for-the-proposal/s2.jpg";
import s3 from "@/assets/storybook/advanced1-ep6-a-heartbeat-for-the-proposal/s3.jpg";
import s4 from "@/assets/storybook/advanced1-ep6-a-heartbeat-for-the-proposal/s4.jpg";
import s5 from "@/assets/storybook/advanced1-ep6-a-heartbeat-for-the-proposal/s5.jpg";
import s6 from "@/assets/storybook/advanced1-ep6-a-heartbeat-for-the-proposal/s6.jpg";
import s7 from "@/assets/storybook/advanced1-ep6-a-heartbeat-for-the-proposal/s7.jpg";
import s8 from "@/assets/storybook/advanced1-ep6-a-heartbeat-for-the-proposal/s8.jpg";
import s9 from "@/assets/storybook/advanced1-ep6-a-heartbeat-for-the-proposal/s9.jpg";

export const ADVANCED1_EP6_HEARTBEAT_PROPOSAL: StorybookEpisode = {
  id: "advanced1-ep6-a-heartbeat-for-the-proposal",
  moduleId: "advanced-1",
  week: 2,
  title: "A heartbeat for the proposal",
  titleEs: "Un latido para la propuesta",
  episodeLabel: {
    en: "Advanced 1 · Episode 6",
    es: "Advanced 1 · Episodio 6",
  },
  previously: [
    {
      en: "The team survived a pressure round with fast questions and interruptions.",
      es: "El equipo sobrevivió una ronda de presión con preguntas rápidas e interrupciones.",
    },
    {
      en: "Then Reed read the written proposal and called it boring.",
      es: "Luego Reed leyó la propuesta escrita y la llamó aburrida.",
    },
    {
      en: "They have one weekend to give it a heartbeat.",
      es: "Tienen un fin de semana para darle un latido.",
    },
  ],
  reviewWords: [
    { word: "proposal", es: "propuesta" },
    { word: "draft", es: "borrador" },
    { word: "committee", es: "comité" },
    { word: "evidence", es: "evidencia" },
    { word: "honest", es: "honesto" },
  ],
  blurb: {
    en: "The proposal has budgets, schedules and retention rates, and no human being inside it. Vale rewrites it around one real challenge.",
    es: "La propuesta tiene presupuestos, horarios y tasas de retención, y ningún ser humano dentro. Vale la reescribe alrededor de un reto real.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale, Dani and Camila read the printed proposal on the office table on a Saturday morning.",
      text: "Saturday morning. The proposal is perfect, and nobody wants to read it.",
      es: "Sábado por la mañana. La propuesta es perfecta, y nadie quiere leerla.",
      speaker: "vale",
      cast: ["vale", "dani", "camila"],
      lines: [
        {
          speaker: "vale",
          text: "Reed is right, and that is what annoys me. This proposal sounds like a bank wrote it. Where is the person inside all these numbers?",
          es: "Reed tiene razón, y eso es lo que me molesta. Esta propuesta suena como si la hubiera escrito un banco. ¿Dónde está la persona dentro de todos estos números?",
        },
        {
          speaker: "dani",
          text: "It has everything, though: budgets, schedules, retention rates. What exactly is missing?",
          es: "Pero lo tiene todo: presupuestos, horarios, tasas de retención. ¿Qué falta exactamente?",
        },
        {
          speaker: "camila",
          text: "A heartbeat. What we handed in was a report, and reports are what this committee has been reading for six weeks.",
          es: "Un latido. Lo que entregamos fue un reporte, y reportes es lo que este comité lleva seis semanas leyendo.",
        },
      ],
      words: [
        { word: "heartbeat", es: "latido" },
        { word: "budgets", es: "presupuestos" },
        { word: "retention", es: "retención" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Mr. Reed explains the four parts of a challenge story from the laptop screen while Vale writes them down.",
      text: "Reed gives them the shape of a challenge story.",
      es: "Reed les da la forma de una historia de reto.",
      speaker: "reed",
      cast: ["vale", "reed"],
      lines: [
        {
          speaker: "reed",
          text: "A challenge story has four parts. Situation: what was happening. Action: what you did. Result: what changed. Lesson: what you learned. If one part is missing, the story is decoration.",
          es: "Una historia de reto tiene cuatro partes. Situación: lo que estaba pasando. Acción: lo que hiciste. Resultado: lo que cambió. Lección: lo que aprendiste. Si falta una parte, la historia es decoración.",
        },
        {
          speaker: "vale",
          text: "We have plenty of challenges. The question is which one belongs in a document this committee will read twice.",
          es: "Tenemos muchos retos. La pregunta es cuál pertenece a un documento que este comité leerá dos veces.",
        },
        {
          speaker: "reed",
          text: "The one that shows who you are when nothing is working. Not the one where everything was easy.",
          es: "El que muestra quién eres cuando nada funciona. No aquel en el que todo fue fácil.",
        },
      ],
      words: [
        { word: "situation", es: "situación" },
        { word: "lesson", es: "lección" },
        { word: "decoration", es: "decoración" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "The three of them argue in front of a whiteboard with two story options written on it.",
      text: "Two stories on the board. Only one of them is still dangerous.",
      es: "Dos historias en la pizarra. Solo una sigue siendo peligrosa.",
      speaker: "dani",
      cast: ["vale", "dani", "camila"],
      lines: [
        {
          speaker: "dani",
          text: "What about the night Northline almost left? If that is not a real challenge, nothing is.",
          es: "¿Y la noche que Northline casi se va? Si eso no es un reto real, nada lo es.",
        },
        {
          speaker: "camila",
          text: "Or the first children's class. Three kids, one microphone, and a broken chair; it was filmed by me and it was a disaster.",
          es: "O la primera clase de niños. Tres niños, un micrófono y una silla rota; fue filmada por mí y fue un desastre.",
        },
        {
          speaker: "vale",
          text: "The Northline story is strong, although it has been told to them already. The children's class has never left this office, and what it shows is risk. We take that one.",
          es: "La historia de Northline es fuerte, aunque ya se la contamos. La clase de niños nunca ha salido de esta oficina, y lo que muestra es riesgo. Nos quedamos con esa.",
        },
      ],
      words: [
        { word: "microphone", es: "micrófono" },
        { word: "broken", es: "rota" },
        { word: "risk", es: "riesgo" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale dictates while Camila types the first paragraph of the new proposal on a laptop.",
      text: "Situation first. The honest version, not the elegant one.",
      es: "Primero la situación. La versión honesta, no la elegante.",
      speaker: "camila",
      cast: ["vale", "camila"],
      lines: [
        {
          speaker: "camila",
          text: "Situation first. What was happening in this academy before that first children's class?",
          es: "Primero la situación. ¿Qué estaba pasando en esta academia antes de esa primera clase de niños?",
        },
        {
          speaker: "vale",
          text: "Parents had been asking for classes for their children for months, and our method had been designed for adults. Honestly, we were afraid that if we touched it, we would break the only thing that worked.",
          es: "Los padres llevaban meses pidiendo clases para sus hijos, y nuestro método había sido diseñado para adultos. Honestamente, teníamos miedo de que si lo tocábamos, romperíamos lo único que funcionaba.",
        },
        {
          speaker: "camila",
          text: "Keep that fear in the text. What makes a situation believable is the part nobody writes down.",
          es: "Deja ese miedo en el texto. Lo que hace creíble una situación es la parte que nadie escribe.",
        },
      ],
      words: [
        { word: "parents", es: "padres" },
        { word: "designed", es: "diseñado" },
        { word: "believable", es: "creíble" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "The team writes action, result and lesson on the whiteboard with coffee cups everywhere.",
      text: "Action, result, lesson. Written in one weekend, like the class itself.",
      es: "Acción, resultado, lección. Escritas en un fin de semana, como la clase misma.",
      speaker: "dani",
      cast: ["vale", "dani", "camila"],
      lines: [
        {
          speaker: "dani",
          text: "Action: we had one weekend to come up with a better opening, so the first lesson was redesigned. Camila filmed short games, I scheduled the teachers, and four families agreed to test it.",
          es: "Acción: teníamos un fin de semana para idear una mejor apertura, así que la primera lección fue rediseñada. Camila filmó juegos cortos, yo organicé a los maestros, y cuatro familias aceptaron probarla.",
        },
        {
          speaker: "vale",
          text: "Result: the children spoke in their first class. Not perfect sentences, but real words, and their parents heard them.",
          es: "Resultado: los niños hablaron en su primera clase. No oraciones perfectas, sino palabras reales, y sus padres las escucharon.",
        },
        {
          speaker: "camila",
          text: "Lesson: if you listen to what families actually need, your method can grow without losing its soul. That being said, it only grows if somebody is brave enough to test it.",
          es: "Lección: si escuchas lo que las familias realmente necesitan, tu método puede crecer sin perder su alma. Dicho eso, solo crece si alguien es lo bastante valiente para probarlo.",
        },
      ],
      words: [
        { word: "redesigned", es: "rediseñada" },
        { word: "soul", es: "alma" },
        { word: "brave", es: "valiente" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale reads the new opening of the proposal aloud while Reed listens from the screen.",
      text: "Monday. Vale reads the new opening out loud.",
      es: "Lunes. Vale lee la nueva apertura en voz alta.",
      speaker: "vale",
      cast: ["vale", "dani", "camila", "reed"],
      lines: [
        {
          speaker: "vale",
          text: "Six months ago, parents asked us for children's classes. Our method had been built for adults, and we were afraid of breaking it. In one weekend the lesson was redesigned, the games were filmed, and four families tested it. The children spoke real words in their first class.",
          es: "Hace seis meses, unos padres nos pidieron clases para niños. Nuestro método había sido construido para adultos, y teníamos miedo de romperlo. En un fin de semana la lección fue rediseñada, los juegos fueron filmados, y cuatro familias la probaron. Los niños hablaron palabras reales en su primera clase.",
        },
        {
          speaker: "reed",
          text: "That is a heartbeat. I can see the children; I can see the fear. Keep going.",
          es: "Eso es un latido. Puedo ver a los niños; puedo ver el miedo. Sigue.",
        },
        {
          speaker: "dani",
          text: "Same numbers as before; however, now they arrive after a story, so they mean something.",
          es: "Los mismos números de antes; sin embargo, ahora llegan después de una historia, así que significan algo.",
        },
      ],
      words: [
        { word: "children", es: "niños" },
        { word: "fear", es: "miedo" },
        { word: "tested", es: "probaron" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale listens to the committee's reaction through the laptop speakers, notebook open.",
      text: "The committee answers in two lines, and they are the right two.",
      es: "El comité responde en dos líneas, y son las dos correctas.",
      speaker: "narrator",
      cast: ["vale"],
      lines: [
        {
          speaker: "narrator",
          text: "A committee member writes back: most proposals begin with numbers; yours began with a child speaking, and that is rare.",
          es: "Un miembro del comité responde: la mayoría de las propuestas empiezan con números; la suya empezó con un niño hablando, y eso es raro.",
        },
        {
          speaker: "vale",
          text: "The numbers are still there. What has changed is that now you know why they matter.",
          es: "Los números siguen ahí. Lo que ha cambiado es que ahora usted sabe por qué importan.",
        },
        {
          speaker: "narrator",
          text: "The committee replies again: we will read the rest tonight, and we would ask you to keep this honesty.",
          es: "El comité responde otra vez: leeremos el resto esta noche, y les pediríamos que mantengan esta honestidad.",
        },
      ],
      words: [
        { word: "rare", es: "raro; poco común" },
        { word: "honesty", es: "honestidad" },
        { word: "matter", es: "importar" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "The three of them sit back, tired and satisfied, the printed proposal marked with notes.",
      text: "The weekend is over. Something in the document is alive.",
      es: "El fin de semana terminó. Algo en el documento está vivo.",
      speaker: "camila",
      cast: ["vale", "dani", "camila"],
      lines: [
        {
          speaker: "dani",
          text: "Reed said it has a heartbeat now, and for once I could hear it too.",
          es: "Reed dijo que ahora tiene un latido, y por una vez yo también pude escucharlo.",
        },
        {
          speaker: "camila",
          text: "The lesson is my favourite part. We did not simply survive that challenge; we were changed by it.",
          es: "La lección es mi parte favorita. No solo sobrevivimos ese reto; fuimos cambiados por él.",
        },
        {
          speaker: "vale",
          text: "And now the committee knows we are not a bank. We are people who fix what breaks.",
          es: "Y ahora el comité sabe que no somos un banco. Somos gente que arregla lo que se rompe.",
        },
      ],
      words: [
        { word: "survive", es: "sobrevivir" },
        { word: "favourite", es: "favorita" },
        { word: "fix", es: "arreglar" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Reed gives the next assignment from the screen and Vale's smile disappears.",
      text: "Reed has already sent the next assignment.",
      es: "Reed ya envió la siguiente tarea.",
      speaker: "reed",
      cast: ["vale", "reed"],
      lines: [
        {
          speaker: "reed",
          text: "Vale, the committee wants the next section by Wednesday: a story about a mistake you fixed. Not a typo. A real error, with your name on it.",
          es: "Vale, el comité quiere la siguiente sección para el miércoles: una historia sobre un error que corrigieron. No una errata. Un error real, con tu nombre en él.",
        },
        {
          speaker: "vale",
          text: "A real error, in front of nine competing academies. Wonderful.",
          es: "Un error real, frente a nueve academias competidoras. Maravilloso.",
        },
        {
          speaker: "vale",
          text: "Camila, Dani: bring coffee. We are going to dig through our worst week.",
          es: "Camila, Dani: traigan café. Vamos a escarbar en nuestra peor semana.",
        },
      ],
      words: [
        { word: "mistake", es: "error" },
        { word: "typo", es: "errata" },
        { word: "dig", es: "escarbar" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s5",
      questionEn: "What was wrong with the first version of the proposal?",
      questionEs: "¿Qué estaba mal con la primera versión de la propuesta?",
      options: [
        { label: "It had numbers but no real story, so it sounded like a bank wrote it", emoji: "🏦" },
        { label: "It was too short for the committee", emoji: "📄" },
        { label: "It was written in the wrong language", emoji: "🌐" },
      ],
      answer: 0,
      sayIt: "It had numbers but no real story, so it sounded like a bank wrote it.",
      sayItEs: "Tenía números pero ninguna historia real, así que sonaba como si la hubiera escrito un banco.",
      sayItCheck: {
        target: "It had numbers but no real story",
        altTargets: ["It sounded like a bank wrote it", "It had numbers but no story"],
      },
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "Your turn: tell me about a challenge you faced. Give the situation, the action you took, the result, and the lesson you learned.",
      questionEs: "Tu turno: cuéntame sobre un reto que enfrentaste. Da la situación, la acción que tomaste, el resultado y la lección que aprendiste.",
      options: [
        { label: "I am ready to answer", emoji: "🎤" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "Last year I was terrified of speaking in meetings. I joined a speaking club and practised every week, and although I still get nervous, last month a whole discussion was led by me. What I learned is that confidence is built, not born.",
      sayItEs: "El año pasado me aterraba hablar en reuniones. Entré a un club de conversación y practiqué cada semana y, aunque todavía me pongo nervioso, el mes pasado una discusión entera fue dirigida por mí. Lo que aprendí es que la confianza se construye, no se nace con ella.",
      sayItAskEn: "What was the situation, what did you do, what was the result, and what did you learn?",
      sayItAskEs: "¿Cuál fue la situación, qué hiciste, cuál fue el resultado y qué aprendiste?",
      sayItCheck: {
        target: "Last year *",
        altTargets: ["The situation was *", "What I learned is *", "I learned *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s7",
    phrase: "Numbers explain what happened. A story explains why it matters.",
    es: "Los números explican qué pasó. Una historia explica por qué importa.",
  },
  habitCard: {
    afterScene: "s2",
    phrase: "When I tell a challenge, I give the situation, the action, the result and the lesson.",
    es: "Cuando cuento un reto, doy la situación, la acción, el resultado y la lección.",
    model: "vale",
    modelActionEs: "Vale reescribió la propuesta con las cuatro partes en lugar de llenarla de datos.",
  },
  expressions: [
    {
      phrase: "come up with",
      variants: ["came up with", "comes up with", "coming up with"],
      es: "idear; se le ocurre",
      kind: "phrasal",
      example: "We had one weekend to come up with a better opening.",
      exampleEs: "Teníamos un fin de semana para idear una mejor apertura.",
    },
    {
      phrase: "hand in",
      variants: ["handed in", "hands in", "handing in"],
      es: "entregar (un documento)",
      kind: "phrasal",
      example: "What we handed in was a report.",
      exampleEs: "Lo que entregamos fue un reporte.",
    },
    {
      phrase: "a bank wrote it",
      es: "suena frío y sin alma, como un documento de banco",
      kind: "idiom",
      example: "This proposal sounds like a bank wrote it.",
      exampleEs: "Esta propuesta suena como si la hubiera escrito un banco.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: tell a challenge of your own with situation, action, result and lesson.",
    es: "Treinta segundos: cuenta un reto tuyo con situación, acción, resultado y lección.",
  },
  continueWith: [
    "The situation was ...",
    "What I did was ...",
    "The result was ...",
    "What I learned is ...",
  ],
  cliffhanger: {
    en: "The committee wants a story about a real mistake by Wednesday, with Vale's name on it.",
    es: "El comité quiere para el miércoles una historia sobre un error real, con el nombre de Vale.",
  },
};
