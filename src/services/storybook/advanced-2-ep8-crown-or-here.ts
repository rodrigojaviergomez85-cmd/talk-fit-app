import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced2-ep8-crown-or-here/cover.jpg";
import s1 from "@/assets/storybook/advanced2-ep8-crown-or-here/s1.jpg";
import s2 from "@/assets/storybook/advanced2-ep8-crown-or-here/s2.jpg";
import s3 from "@/assets/storybook/advanced2-ep8-crown-or-here/s3.jpg";
import s4 from "@/assets/storybook/advanced2-ep8-crown-or-here/s4.jpg";
import s5 from "@/assets/storybook/advanced2-ep8-crown-or-here/s5.jpg";
import s6 from "@/assets/storybook/advanced2-ep8-crown-or-here/s6.jpg";
import s7 from "@/assets/storybook/advanced2-ep8-crown-or-here/s7.jpg";
import s8 from "@/assets/storybook/advanced2-ep8-crown-or-here/s8.jpg";
import s9 from "@/assets/storybook/advanced2-ep8-crown-or-here/s9.jpg";

export const ADVANCED2_EP8_CROWN_OR_HERE: StorybookEpisode = {
  id: "advanced2-ep8-crown-or-here",
  moduleId: "advanced-2",
  week: 2,
  title: "Crown or here",
  titleEs: "Crown o aquí",
  episodeLabel: {
    en: "Advanced 2 · Episode 8",
    es: "Advanced 2 · Episodio 8",
  },
  previously: [
    {
      en: "Eleven agents showed up to the first conversation club.",
      es: "Once agentes llegaron al primer club de conversación.",
    },
    {
      en: "Mía has until Friday to answer Crown.",
      es: "Mía tiene hasta el viernes para responderle a Crown.",
    },
    {
      en: "Today she wants the comparison out loud.",
      es: "Hoy quiere la comparación en voz alta.",
    },
  ],
  reviewWords: [
    { word: "offer", es: "oferta" },
    { word: "schedule", es: "horario" },
    { word: "upgrade", es: "mejora" },
    { word: "compare", es: "comparar" },
    { word: "honest", es: "honesto" },
  ],
  blurb: {
    en: "A customer can't choose between two plans, and Dani compares them cleanly. Then Mía asks him to do the same with Crown and Northline, honestly, and the honest comparison loses two points out of three. He says it anyway.",
    es: "Un cliente no puede elegir entre dos planes, y Dani los compara limpiamente. Después Mía le pide que haga lo mismo con Crown y Northline, con honestidad, y la comparación honesta pierde dos puntos de tres. Lo dice igual.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Dani on a call with two plan cards side by side on his screen, one hand holding a pen over a notepad with two columns drawn.",
      text: "Wednesday, 9:15 a.m.",
      es: "Miércoles, 9:15 a.m.",
      speaker: "dani",
      lines: [
        {
          speaker: "caller",
          text: "I've read both plans three times. I still can't choose. Just tell me.",
          es: "He leído los dos planes tres veces. Sigo sin poder elegir. Solo dígame.",
        },
        {
          speaker: "dani",
          text: "Let me compare them for you in simple terms. The first option is cheaper, but it has fewer features. The second one costs more; however, it includes support at night.",
          es: "Déjeme compararlos en términos simples. La primera opción es más barata, pero tiene menos funciones. La segunda cuesta más; sin embargo, incluye soporte de noche.",
        },
        {
          speaker: "caller",
          text: "I don't care about features. I care about it working.",
          es: "No me importan las funciones. Me importa que funcione.",
        },
        {
          speaker: "dani",
          text: "Then the main difference between them is the response time. The first one answers in a day. The second one answers in an hour, including Saturday.",
          es: "Entonces la diferencia principal entre ellos es el tiempo de respuesta. El primero responde en un día. El segundo responde en una hora, incluido el sábado.",
        },
      ],
      words: [
        { word: "cheaper", es: "más barata" },
        { word: "features", es: "funciones" },
        { word: "response", es: "respuesta" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Close on the notepad: two columns, one with a circle around 'Saturday'; Dani's pen tapping it.",
      text: "Recommend, then close.",
      es: "Recomendar, y luego cerrar.",
      speaker: "dani",
      lines: [
        {
          speaker: "caller",
          text: "I work weekends. Saturday is when everything breaks.",
          es: "Trabajo los fines de semana. El sábado es cuando todo se rompe.",
        },
        {
          speaker: "dani",
          text: "Because you told me you work on weekends, that matters. If I were you, I would take the second one. That said, the first one is still a good choice if the price is the problem.",
          es: "Como me dijo que trabaja los fines de semana, eso importa. Si yo fuera usted, tomaría el segundo. Dicho eso, el primero sigue siendo una buena opción si el precio es el problema.",
        },
        {
          speaker: "caller",
          text: "The second one. You're the first person who used the word Saturday.",
          es: "El segundo. Es la primera persona que usa la palabra sábado.",
        },
        {
          speaker: "dani",
          text: "Which one would you like me to set up? I'll do it now.",
          es: "¿Cuál quiere que le configure? Lo hago ahora.",
        },
      ],
      words: [
        { word: "weekends", es: "fines de semana" },
        { word: "choice", es: "opción, elección" },
        { word: "matters", es: "importa" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "The break room; Mía sitting on the table instead of a chair, headset in her lap; Dani in the doorway with two coffees.",
      text: "12:10 p.m. The break room.",
      es: "12:10 p.m. La sala de descanso.",
      speaker: "mia",
      cast: ["mia", "dani"],
      lines: [
        {
          speaker: "mia",
          text: "Do me like the customer. Crown versus here. Simple terms. And if you lie, I'll know, because I've read both plans three times.",
          es: "Hazme lo mismo que al cliente. Crown contra aquí. Términos simples. Y si mientes, lo voy a saber, porque he leído los dos planes tres veces.",
        },
        {
          speaker: "dani",
          text: "You want me to sell against my own floor.",
          es: "Quieres que venda en contra de mi propio piso.",
        },
        {
          speaker: "mia",
          text: "I want you to compare. Selling is your problem.",
          es: "Quiero que compares. Vender es tu problema.",
        },
        {
          speaker: "dani",
          text: "Okay. Let me compare them for you in simple terms.",
          es: "Okay. Déjame compararlas en términos simples.",
        },
      ],
      words: [
        { word: "versus", es: "contra" },
        { word: "lie", es: "mentir" },
        { word: "terms", es: "términos" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Dani writing on a napkin with two columns, Crown and Northline, three rows; Mía reading it upside down.",
      text: "Three rows.",
      es: "Tres filas.",
      speaker: "dani",
      cast: ["dani", "mia"],
      lines: [
        {
          speaker: "dani",
          text: "Money. Crown pays twenty percent more. That's not close; that's a real difference and I'm not going to pretend it isn't.",
          es: "Dinero. Crown paga veinte por ciento más. No está cerca; es una diferencia real y no voy a fingir que no lo es.",
        },
        {
          speaker: "mia",
          text: "Row one, Crown.",
          es: "Fila uno, Crown.",
        },
        {
          speaker: "dani",
          text: "Phones. At Crown you start on real calls day one. Here you're on real calls too, but with a ninety-day audit hanging over you. Crown doesn't audit its own night team.",
          es: "Teléfonos. En Crown empiezas en llamadas reales desde el día uno. Aquí también estás en llamadas reales, pero con una auditoría de noventa días encima. Crown no audita a su propio equipo nocturno.",
        },
        {
          speaker: "mia",
          text: "Row two, Crown. You're losing, jefe.",
          es: "Fila dos, Crown. Vas perdiendo, jefe.",
        },
        {
          speaker: "dani",
          text: "I'm comparing. You decide who's losing.",
          es: "Estoy comparando. Tú decides quién va perdiendo.",
        },
      ],
      words: [
        { word: "pretend", es: "fingir" },
        { word: "row", es: "fila" },
        { word: "losing", es: "perdiendo" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Close on the napkin's third row: the word 'schedule' underlined twice; Mía's hand flat next to it.",
      text: "Row three.",
      es: "Fila tres.",
      speaker: "dani",
      cast: ["dani", "mia"],
      lines: [
        {
          speaker: "dani",
          text: "Schedule. Crown is nights, period. Here you have the two-to-ten shift starting Monday, which is the only version of this job that fits a university in January.",
          es: "Horario. Crown es de noche, punto. Aquí tienes el turno de dos a diez desde el lunes, que es la única versión de este trabajo que cabe con una universidad en enero.",
        },
        {
          speaker: "mia",
          text: "One row out of three.",
          es: "Una fila de tres.",
        },
        {
          speaker: "dani",
          text: "The main difference between them is the schedule. Because you told me you want to study, that row matters more than the other two. If I were you, I would stay. That said, Crown is a real job with real money, and if the university isn't real yet, Crown is the better choice.",
          es: "La diferencia principal entre ellos es el horario. Como me dijiste que quieres estudiar, esa fila importa más que las otras dos. Si yo fuera tú, me quedaría. Dicho eso, Crown es un trabajo real con dinero real, y si la universidad todavía no es real, Crown es la mejor opción.",
        },
        {
          speaker: "mia",
          text: "You just sold against yourself. Twice.",
          es: "Acabas de vender en tu contra. Dos veces.",
        },
        {
          speaker: "dani",
          text: "I compared. You decide.",
          es: "Comparé. Tú decides.",
        },
      ],
      words: [
        { word: "period", es: "punto (y ya)" },
        { word: "stay", es: "quedarse" },
        { word: "decide", es: "decidir" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Nico standing in the break room doorway with a sandwich, having heard the end; Mía folding the napkin into her pocket.",
      text: "Nico heard the end.",
      es: "Nico oyó el final.",
      speaker: "nico",
      cast: ["nico", "mia", "dani"],
      lines: [
        {
          speaker: "nico",
          text: "He said Crown twice in one answer. Is that allowed?",
          es: "Dijo Crown dos veces en una respuesta. ¿Eso está permitido?",
        },
        {
          speaker: "mia",
          text: "It's the only reason I'm still listening to him.",
          es: "Es la única razón por la que todavía lo escucho.",
        },
        {
          speaker: "dani",
          text: "If I'd said we win all three rows, you'd have taken the napkin to Keller and asked her to check my math.",
          es: "Si hubiera dicho que ganamos las tres filas, le habrías llevado la servilleta a Keller para que revisara mis cuentas.",
        },
        {
          speaker: "mia",
          text: "I would have. I still might.",
          es: "Lo habría hecho. Todavía puede que lo haga.",
        },
      ],
      words: [
        { word: "allowed", es: "permitido" },
        { word: "napkin", es: "servilleta" },
        { word: "math", es: "cuentas" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Julieta on the laptop screen, scoring sheet open, headset on; Dani alone at his desk after the shift.",
      text: "6:30 p.m. Bogotá.",
      es: "6:30 p.m. Bogotá.",
      speaker: "julieta",
      cast: ["julieta", "dani"],
      lines: [
        {
          speaker: "julieta",
          text: "Your nine-fifteen call. You said 'that said, the first one is still a good choice' after you recommended the second. Why give the customer a way out?",
          es: "Tu llamada de las nueve y cuarto. Dijiste 'dicho eso, el primero sigue siendo una buena opción' después de recomendar el segundo. ¿Por qué darle una salida al cliente?",
        },
        {
          speaker: "dani",
          text: "Because a recommendation without a way out is pressure, and pressure makes people hang up and think about it.",
          es: "Porque una recomendación sin salida es presión, y la presión hace que la gente cuelgue y lo piense.",
        },
        {
          speaker: "julieta",
          text: "Nico said that last week.",
          es: "Nico dijo eso la semana pasada.",
        },
        {
          speaker: "dani",
          text: "Nico said it first. I'm just repeating it to Bogotá.",
          es: "Nico lo dijo primero. Yo solo se lo repito a Bogotá.",
        },
        {
          speaker: "julieta",
          text: "Noted. Top score for the call. Also for the honesty about Nico.",
          es: "Anotado. Puntaje máximo para la llamada. También por la honestidad sobre Nico.",
        },
      ],
      words: [
        { word: "recommendation", es: "recomendación" },
        { word: "pressure", es: "presión" },
        { word: "honesty", es: "honestidad" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Night; Mía alone on the front steps of the Northline building, phone to her ear, headset still around her neck; the street quiet. Only Mía is drawn; the person she calls is a voice on the phone.",
      text: "8:40 p.m. Mía calls someone.",
      es: "8:40 p.m. Mía llama a alguien.",
      speaker: "mia",
      lines: [
        {
          speaker: "mia",
          text: "Ms. Keller. Quick question, and I need the honest version. Does the night team let anybody study in the morning?",
          es: "Ms. Keller. Pregunta rápida, y necesito la versión honesta. ¿El equipo nocturno deja que alguien estudie en la mañana?",
        },
        {
          speaker: "keller",
          text: "The night team ends at seven a.m. Nobody studies after that. Why?",
          es: "El equipo nocturno termina a las siete de la mañana. Nadie estudia después de eso. ¿Por qué?",
        },
        {
          speaker: "mia",
          text: "Because somebody compared you to here and you lost the only row that matters. Thank you for answering straight.",
          es: "Porque alguien te comparó con aquí y perdiste la única fila que importa. Gracias por contestar directo.",
        },
      ],
      words: [
        { word: "honest", es: "honesta" },
        { word: "morning", es: "mañana" },
        { word: "straight", es: "directo" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Camila's face on a laptop screen at Dani's desk, late, a Northline finance spreadsheet beside her with one cell in red.",
      text: "9:05 p.m. Camila.",
      es: "9:05 p.m. Camila.",
      speaker: "camila",
      cast: ["camila", "dani"],
      lines: [
        {
          speaker: "camila",
          text: "Northline finance just emailed. They think the pilot is too expensive for what it delivers, and they want an answer tomorrow.",
          es: "Finanzas de Northline acaba de escribir. Creen que el piloto es muy caro para lo que entrega, y quieren una respuesta mañana.",
        },
        {
          speaker: "dani",
          text: "Too expensive is the account of the day tomorrow. On the floor.",
          es: "Muy caro es la cuenta del día mañana. En el piso.",
        },
        {
          speaker: "camila",
          text: "Then take that call twice.",
          es: "Entonces toma esa llamada dos veces.",
        },
      ],
      words: [
        { word: "finance", es: "finanzas" },
        { word: "expensive", es: "caro" },
        { word: "delivers", es: "entrega" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s5",
      questionEn: "Which row does Dani say matters most for Mía, and why?",
      questionEs: "¿Qué fila dice Dani que importa más para Mía, y por qué?",
      options: [
        { label: "The schedule, because she told him she wants to study in January", emoji: "🗓️" },
        { label: "The money, because Crown pays twenty percent more", emoji: "💵" },
        { label: "The phones, because Crown has no audit", emoji: "🎧" },
      ],
      answer: 0,
      sayIt: "The schedule, because she told him she wants to study in January.",
      sayItEs: "El horario, porque ella le dijo que quiere estudiar en enero.",
      sayItCheck: {
        target: "The schedule",
        altTargets: ["The main difference is the schedule", "Because she wants to study"],
      },
    },
    {
      id: "q2",
      afterScene: "s2",
      questionEn: "Compare two options for someone who can't decide, then recommend one with a reason from what they told you.",
      questionEs: "Compara dos opciones para alguien que no se decide, y luego recomienda una con una razón que salga de lo que te dijo.",
      options: [
        { label: "I am ready to answer", emoji: "🎧" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "The main difference between them is the response time. Because you told me you work on weekends, that matters. If I were you, I would take the second one.",
      sayItEs: "La diferencia principal entre ellos es el tiempo de respuesta. Como me dijo que trabaja los fines de semana, eso importa. Si yo fuera usted, tomaría el segundo.",
      sayItAskEn: "Start with \"The main difference between them is ...\", then \"Because you told me ...\", and close with \"If I were you, I would ...\".",
      sayItAskEs: "Empieza con \"The main difference between them is …\", luego \"Because you told me …\" y cierra con \"If I were you, I would …\".",
      sayItCheck: {
        target: "The main difference between them is *",
        altTargets: ["If I were you, I would *", "The difference is *", "Because you told me *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s6",
    phrase: "An honest comparison I lose is worth more than a pitch I win.",
    es: "Una comparación honesta que pierdo vale más que un discurso que gano.",
  },
  habitCard: {
    afterScene: "s5",
    phrase: "When I compare, I say the rows I lose out loud before the one I win.",
    es: "Cuando comparo, digo en voz alta las filas que pierdo antes de la que gano.",
    model: "dani",
    modelActionEs: "Dani le dio a Crown las dos primeras filas sin fingir, y por eso Mía le creyó la tercera.",
  },
  expressions: [
    {
      phrase: "set up",
      variants: ["set it up", "sets up", "setting up"],
      es: "configurar, activar",
      kind: "phrasal",
      example: "Which one would you like me to set up? I'll do it now.",
      exampleEs: "¿Cuál quiere que le configure? Lo hago ahora.",
    },
    {
      phrase: "hang over",
      variants: ["hanging over", "hangs over", "hung over"],
      es: "pender sobre, tener encima (una amenaza)",
      kind: "phrasal",
      example: "With a ninety-day audit hanging over you.",
      exampleEs: "Con una auditoría de noventa días encima.",
    },
    {
      phrase: "a way out",
      variants: ["way out"],
      es: "una salida",
      kind: "idiom",
      example: "Why give the customer a way out?",
      exampleEs: "¿Por qué darle una salida al cliente?",
    },
    {
      phrase: "that said",
      es: "dicho eso, aun así",
      kind: "idiom",
      example: "That said, the first one is still a good choice if the price is the problem.",
      exampleEs: "Dicho eso, el primero sigue siendo una buena opción si el precio es el problema.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: compare two options honestly, name the difference that matters for this person, and recommend one without hiding the other.",
    es: "Treinta segundos: compara dos opciones con honestidad, nombra la diferencia que importa para esta persona, y recomienda una sin esconder la otra.",
  },
  continueWith: [
    "Let me compare them for you in simple terms.",
    "The main difference between them is ...",
    "Because you told me ..., that matters.",
    "If I were you, I would ... That said, ...",
  ],
  cliffhanger: {
    en: "Tomorrow: 'too expensive', twice. A customer on the floor, and Northline's finance team about the whole pilot.",
    es: "Mañana: 'muy caro', dos veces. Un cliente en el piso, y el equipo de finanzas de Northline sobre el piloto entero.",
  },
};
