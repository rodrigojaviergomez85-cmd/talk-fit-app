import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced2-ep7-value-first/cover.jpg";
import s1 from "@/assets/storybook/advanced2-ep7-value-first/s1.jpg";
import s2 from "@/assets/storybook/advanced2-ep7-value-first/s2.jpg";
import s3 from "@/assets/storybook/advanced2-ep7-value-first/s3.jpg";
import s4 from "@/assets/storybook/advanced2-ep7-value-first/s4.jpg";
import s5 from "@/assets/storybook/advanced2-ep7-value-first/s5.jpg";
import s6 from "@/assets/storybook/advanced2-ep7-value-first/s6.jpg";
import s7 from "@/assets/storybook/advanced2-ep7-value-first/s7.jpg";
import s8 from "@/assets/storybook/advanced2-ep7-value-first/s8.jpg";
import s9 from "@/assets/storybook/advanced2-ep7-value-first/s9.jpg";

export const ADVANCED2_EP7_VALUE_FIRST: StorybookEpisode = {
  id: "advanced2-ep7-value-first",
  moduleId: "advanced-2",
  week: 2,
  title: "Value first",
  titleEs: "Primero el valor",
  episodeLabel: {
    en: "Advanced 2 · Episode 7",
    es: "Advanced 2 · Episodio 7",
  },
  previously: [
    {
      en: "Keller offered Mía twenty percent more.",
      es: "Keller le ofreció a Mía veinte por ciento más.",
    },
    {
      en: "Dani asked what she needed: a schedule, not money.",
      es: "Dani preguntó qué necesitaba: un horario, no dinero.",
    },
    {
      en: "The offer stays open until Friday.",
      es: "La oferta sigue abierta hasta el viernes.",
    },
  ],
  reviewWords: [
    { word: "offer", es: "oferta" },
    { word: "recommend", es: "recomendar" },
    { word: "schedule", es: "horario" },
    { word: "upgrade", es: "mejora" },
    { word: "value", es: "valor" },
  ],
  blurb: {
    en: "A guest who can't decide between two rooms, and a boss who thinks the pilot is fine as it is. Same lesson twice: say what they get before you say what it costs, and let them choose.",
    es: "Un huésped que no se decide entre dos habitaciones, y una jefa que cree que el piloto está bien como está. La misma lección dos veces: decí qué reciben antes de decir cuánto cuesta, y dejá que elijan.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "The floor at 8 a.m. with the hotel account on the wall screen; Óscar at his desk reading a laminated card of room options; Dani beside him.",
      text: "Tuesday. Hotel day again.",
      es: "Martes. Otra vez día de hotel.",
      speaker: "oscar",
      cast: ["oscar", "dani"],
      lines: [
        {
          speaker: "oscar",
          text: "The manager wants us to offer the upgrade on every call. I hate that part. It feels like selling.",
          es: "El gerente quiere que ofrezcamos la mejora en cada llamada. Odio esa parte. Se siente como vender.",
        },
        {
          speaker: "dani",
          text: "It is selling. The question is whether you say the price first or the value first.",
          es: "Es vender. La pregunta es si dices primero el precio o primero el valor.",
        },
        {
          speaker: "oscar",
          text: "What's the difference?",
          es: "¿Cuál es la diferencia?",
        },
        {
          speaker: "dani",
          text: "Price first sounds like a trick. Value first sounds like help. Watch one and then take one.",
          es: "Primero el precio suena a truco. Primero el valor suena a ayuda. Mira una y después toma una.",
        },
      ],
      words: [
        { word: "manager", es: "gerente" },
        { word: "upgrade", es: "mejora" },
        { word: "trick", es: "truco" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Dani on a call, headset on, the two room options on his screen; Óscar leaning in from the next desk to listen.",
      text: "8:20 a.m. The guest.",
      es: "8:20 a.m. El huésped.",
      speaker: "dani",
      lines: [
        {
          speaker: "caller",
          text: "The standard room is fine. I think. I don't know. Is it fine?",
          es: "La habitación estándar está bien. Creo. No sé. ¿Está bien?",
        },
        {
          speaker: "dani",
          text: "The standard room is a good room, and it's ready for you. There's one more option I'd like to mention, and then you decide.",
          es: "La habitación estándar es buena, y está lista para usted. Hay una opción más que me gustaría mencionar, y después usted decide.",
        },
        {
          speaker: "caller",
          text: "Here it comes.",
          es: "Ya viene.",
        },
        {
          speaker: "dani",
          text: "For a few dollars more, you can get the room with the balcony. That means you get late checkout and free breakfast. Most guests tell me the late checkout is the best part.",
          es: "Por unos dólares más, puede tener la habitación con balcón. Eso significa que tiene salida tardía y desayuno gratis. La mayoría de los huéspedes me dicen que la salida tardía es lo mejor.",
        },
      ],
      words: [
        { word: "standard", es: "estándar" },
        { word: "balcony", es: "balcón" },
        { word: "checkout", es: "salida (del hotel)" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Close on Dani's hand resting flat on the desk, relaxed; the screen showing both rooms side by side with the price difference.",
      text: "Then the price. Then the choice.",
      es: "Después el precio. Después la elección.",
      speaker: "dani",
      lines: [
        {
          speaker: "caller",
          text: "How much more is a few dollars?",
          es: "¿Cuánto es unos dólares más?",
        },
        {
          speaker: "dani",
          text: "The difference is about fifteen dollars per night. It's completely up to you; both rooms are ready today.",
          es: "La diferencia es de unos quince dólares por noche. Es completamente su decisión; las dos habitaciones están listas hoy.",
        },
        {
          speaker: "caller",
          text: "I'll stay with the standard. My flight is at seven in the morning anyway.",
          es: "Me quedo con la estándar. Mi vuelo es a las siete de la mañana de todos modos.",
        },
        {
          speaker: "dani",
          text: "No problem at all. I'll keep the standard room for you, and if you change your mind, just tell me when you arrive.",
          es: "No hay problema. Le dejo la habitación estándar, y si cambia de opinión, solo dígamelo cuando llegue.",
        },
      ],
      words: [
        { word: "difference", es: "diferencia" },
        { word: "completely", es: "completamente" },
        { word: "arrive", es: "llegar" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Óscar turning to Dani with his headset half off, confused; Mía rolling her chair over from two desks away.",
      text: "He said no. So?",
      es: "Dijo que no. ¿Y?",
      speaker: "oscar",
      cast: ["oscar", "dani", "mia"],
      lines: [
        {
          speaker: "oscar",
          text: "He said no. Doesn't that mean it didn't work?",
          es: "Dijo que no. ¿Eso no significa que no funcionó?",
        },
        {
          speaker: "dani",
          text: "He said no with a reason. Flight at seven. That's a real no, and he's coming back to this hotel because nobody pushed him.",
          es: "Dijo que no con una razón. Vuelo a las siete. Ese es un no real, y va a volver a este hotel porque nadie lo presionó.",
        },
        {
          speaker: "mia",
          text: "Also he heard 'late checkout' before he heard 'fifteen dollars'. Next time he stays two nights he'll remember the balcony.",
          es: "Además oyó 'salida tardía' antes de oír 'quince dólares'. La próxima vez que se quede dos noches va a acordarse del balcón.",
        },
        {
          speaker: "oscar",
          text: "So the order matters more than the yes.",
          es: "Entonces el orden importa más que el sí.",
        },
        {
          speaker: "dani",
          text: "Today it does.",
          es: "Hoy sí.",
        },
      ],
      words: [
        { word: "reason", es: "razón" },
        { word: "pushed", es: "presionó" },
        { word: "order", es: "orden" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Óscar on his own call, sitting straighter, one finger on the laminated card; Dani pretending to look at his own screen.",
      text: "Óscar's turn.",
      es: "El turno de Óscar.",
      speaker: "oscar",
      lines: [
        {
          speaker: "oscar",
          text: "There's one more option I'd like to mention. For a few dollars more, you can get the room with the balcony, and that means late checkout and free breakfast.",
          es: "Hay una opción más que me gustaría mencionar. Por unos dólares más, puede tener la habitación con balcón, y eso significa salida tardía y desayuno gratis.",
        },
        {
          speaker: "caller",
          text: "Free breakfast? For how many?",
          es: "¿Desayuno gratis? ¿Para cuántos?",
        },
        {
          speaker: "oscar",
          text: "For two. The difference is about fifteen dollars per night, and it's completely up to you.",
          es: "Para dos. La diferencia es de unos quince dólares por noche, y es completamente su decisión.",
        },
        {
          speaker: "caller",
          text: "Two breakfasts is more than fifteen dollars where I live. Give me the balcony.",
          es: "Dos desayunos cuestan más de quince dólares donde yo vivo. Deme el balcón.",
        },
      ],
      words: [
        { word: "breakfast", es: "desayuno" },
        { word: "free", es: "gratis" },
        { word: "night", es: "noche" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Barrett's small office at Northline with the door open; Dani standing with a single sheet of paper; Barrett behind her desk, not looking up yet.",
      text: "3:00 p.m. Barrett.",
      es: "3:00 p.m. Barrett.",
      speaker: "barrett",
      cast: ["barrett", "dani"],
      lines: [
        {
          speaker: "barrett",
          text: "If this is a request for money, the answer is the same as last week.",
          es: "Si esto es una solicitud de dinero, la respuesta es la misma que la semana pasada.",
        },
        {
          speaker: "dani",
          text: "It isn't. There's one more option I'd like to mention for the pilot, and then you decide.",
          es: "No lo es. Hay una opción más que me gustaría mencionar para el piloto, y después usted decide.",
        },
        {
          speaker: "barrett",
          text: "You're using the hotel script on me.",
          es: "Estás usando el guion del hotel conmigo.",
        },
        {
          speaker: "dani",
          text: "I'm using the order. Value first.",
          es: "Estoy usando el orden. Primero el valor.",
        },
      ],
      words: [
        { word: "request", es: "solicitud" },
        { word: "option", es: "opción" },
        { word: "script", es: "guion" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Close on the single sheet on Barrett's desk: a simple chart of speaking minutes per agent by hour of the day, with a peak circled at 7 p.m.",
      text: "The value.",
      es: "El valor.",
      speaker: "dani",
      cast: ["dani", "barrett"],
      lines: [
        {
          speaker: "dani",
          text: "Agents speak the most at seven at night, after the calls slow down. That's when the minutes happen. A thirty-minute conversation club at seven, twice a week, means every agent gets ninety more minutes before the audit.",
          es: "Los agentes hablan más a las siete de la noche, cuando bajan las llamadas. Ahí es cuando pasan los minutos. Un club de conversación de treinta minutos a las siete, dos veces por semana, significa que cada agente tiene noventa minutos más antes de la auditoría.",
        },
        {
          speaker: "barrett",
          text: "And the price?",
          es: "¿Y el precio?",
        },
        {
          speaker: "dani",
          text: "One hour of my week and a room that's already empty at seven. It's completely up to you. The pilot works without it; it works better with it.",
          es: "Una hora de mi semana y una sala que ya está vacía a las siete. Es completamente su decisión. El piloto funciona sin esto; funciona mejor con esto.",
        },
        {
          speaker: "barrett",
          text: "You said the value, then the price, then you gave me the exit. Fine. Twice a week. Report the minutes.",
          es: "Dijiste el valor, después el precio, y después me diste la salida. Bien. Dos veces por semana. Reporta los minutos.",
        },
      ],
      words: [
        { word: "conversation", es: "conversación" },
        { word: "twice", es: "dos veces" },
        { word: "empty", es: "vacía" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Mía and Nico at their desks at 6:55 p.m., the floor half empty; Dani walking past with a marker toward the small meeting room.",
      text: "6:55 p.m. The first club.",
      es: "6:55 p.m. El primer club.",
      speaker: "mia",
      cast: ["mia", "nico", "dani"],
      lines: [
        {
          speaker: "mia",
          text: "A conversation club. At seven. On a Tuesday. Jefe, this is how people find out you're a teacher.",
          es: "Un club de conversación. A las siete. Un martes. Jefe, así es como la gente descubre que eres maestro.",
        },
        {
          speaker: "dani",
          text: "It's thirty minutes and it's optional.",
          es: "Son treinta minutos y es opcional.",
        },
        {
          speaker: "nico",
          text: "Is it, though.",
          es: "¿Sí lo es?",
        },
        {
          speaker: "dani",
          text: "It's completely up to you. Both chairs are ready.",
          es: "Es completamente su decisión. Las dos sillas están listas.",
        },
        {
          speaker: "mia",
          text: "He did the hotel thing again. I'm going in just to see if he can keep it up.",
          es: "Volvió a hacer lo del hotel. Voy a entrar solo para ver si lo puede sostener.",
        },
      ],
      words: [
        { word: "optional", es: "opcional" },
        { word: "teacher", es: "maestro" },
        { word: "chairs", es: "sillas" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "The small meeting room at 7:30 p.m., eleven agents in a circle of chairs, most of them laughing; Dani at the door checking his watch.",
      text: "7:30 p.m.",
      es: "7:30 p.m.",
      speaker: "dani",
      cast: ["dani", "oscar"],
      lines: [
        {
          speaker: "dani",
          text: "Eleven people. On a Tuesday. Nobody had to come.",
          es: "Once personas. Un martes. Nadie tenía que venir.",
        },
        {
          speaker: "oscar",
          text: "You said free breakfast was worth more than fifteen dollars. Thirty free minutes is worth more than a Tuesday.",
          es: "Dijiste que el desayuno gratis valía más de quince dólares. Treinta minutos gratis valen más que un martes.",
        },
        {
          speaker: "dani",
          text: "Friday, Mía has to choose between here and Crown. And tomorrow she's going to ask me to compare them out loud.",
          es: "El viernes Mía tiene que elegir entre aquí y Crown. Y mañana me va a pedir que las compare en voz alta.",
        },
      ],
      words: [
        { word: "eleven", es: "once" },
        { word: "worth", es: "vale" },
        { word: "compare", es: "comparar" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "Why does Dani say the first guest's no still counts as a good call?",
      questionEs: "¿Por qué dice Dani que el no del primer huésped sigue siendo una buena llamada?",
      options: [
        { label: "He said no with a real reason and nobody pushed him, so he'll come back", emoji: "🔁" },
        { label: "He paid for the balcony anyway", emoji: "🌅" },
        { label: "The call was under two minutes", emoji: "⏱️" },
      ],
      answer: 0,
      sayIt: "He said no with a real reason and nobody pushed him, so he'll come back.",
      sayItEs: "Dijo que no con una razón real y nadie lo presionó, así que va a volver.",
      sayItCheck: {
        target: "He said no with a real reason",
        altTargets: ["Nobody pushed him", "He'll come back"],
      },
    },
    {
      id: "q2",
      afterScene: "s3",
      questionEn: "Offer someone an upgrade: say what they get first, then the price, then leave the choice to them.",
      questionEs: "Ofrécele a alguien una mejora: di qué recibe primero, luego el precio, y deja la decisión en sus manos.",
      options: [
        { label: "I am ready to answer", emoji: "🎧" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "For a few dollars more, you can get the bigger plan. That means you get night support and no extra fees. The difference is about ten dollars a month, and it's completely up to you.",
      sayItEs: "Por unos dólares más, puede tener el plan más grande. Eso significa que tiene soporte nocturno y sin cargos extra. La diferencia es de unos diez dólares al mes, y es completamente su decisión.",
      sayItAskEn: "Start with \"For a few dollars more, ...\", then \"That means you get ...\", and close with \"It's completely up to you.\"",
      sayItAskEs: "Empieza con \"For a few dollars more, …\", luego \"That means you get …\" y cierra con \"It's completely up to you.\"",
      sayItCheck: {
        target: "For a few dollars more *",
        altTargets: ["That means you get *", "It's completely up to you", "Would you like *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s4",
    phrase: "A no with a reason is not a lost sale. It's a customer who trusts me.",
    es: "Un no con razón no es una venta perdida. Es un cliente que confía en mí.",
  },
  habitCard: {
    afterScene: "s7",
    phrase: "I say what they get, then what it costs, then I give them the exit.",
    es: "Digo qué reciben, luego cuánto cuesta, y luego les doy la salida.",
    model: "dani",
    modelActionEs: "Dani le vendió el club de conversación a Barrett en ese orden exacto: minutos primero, una hora de su semana después, y 'es completamente su decisión' al final.",
  },
  expressions: [
    {
      phrase: "keep up",
      variants: ["keep it up", "keeps up", "kept up"],
      es: "sostener, mantener el ritmo",
      kind: "phrasal",
      example: "I'm going in just to see if he can keep it up.",
      exampleEs: "Voy a entrar solo para ver si lo puede sostener.",
    },
    {
      phrase: "slow down",
      variants: ["slows down", "slowed down", "slowing down"],
      es: "bajar el ritmo, disminuir",
      kind: "phrasal",
      example: "Agents speak the most at seven at night, after the calls slow down.",
      exampleEs: "Los agentes hablan más a las siete de la noche, cuando bajan las llamadas.",
    },
    {
      phrase: "up to you",
      variants: ["completely up to you", "it's up to you"],
      es: "es tu decisión",
      kind: "idiom",
      example: "It's completely up to you; both rooms are ready today.",
      exampleEs: "Es completamente su decisión; las dos habitaciones están listas hoy.",
    },
    {
      phrase: "here it comes",
      es: "ahí viene (lo que me temía)",
      kind: "idiom",
      example: "Here it comes.",
      exampleEs: "Ya viene.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: offer someone a better option. Value first, then the price, then the choice. And if they say no, keep the door open.",
    es: "Treinta segundos: ofrécele a alguien una mejor opción. Primero el valor, luego el precio, luego la decisión. Y si dice que no, deja la puerta abierta.",
  },
  continueWith: [
    "There's one more option I'd like to mention.",
    "For a few dollars more, ...",
    "That means you get ...",
    "It's completely up to you.",
  ],
  cliffhanger: {
    en: "Tomorrow Mía asks Dani to compare Crown and Northline out loud, honestly, and the honest answer favors Crown twice out of three.",
    es: "Mañana Mía le pide a Dani que compare Crown y Northline en voz alta, con honestidad, y la respuesta honesta favorece a Crown en dos de tres.",
  },
};
