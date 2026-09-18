import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced2-ep1-headset-on/cover.jpg";
import s1 from "@/assets/storybook/advanced2-ep1-headset-on/s1.jpg";
import s2 from "@/assets/storybook/advanced2-ep1-headset-on/s2.jpg";
import s3 from "@/assets/storybook/advanced2-ep1-headset-on/s3.jpg";
import s4 from "@/assets/storybook/advanced2-ep1-headset-on/s4.jpg";
import s5 from "@/assets/storybook/advanced2-ep1-headset-on/s5.jpg";
import s6 from "@/assets/storybook/advanced2-ep1-headset-on/s6.jpg";
import s7 from "@/assets/storybook/advanced2-ep1-headset-on/s7.jpg";
import s8 from "@/assets/storybook/advanced2-ep1-headset-on/s8.jpg";
import s9 from "@/assets/storybook/advanced2-ep1-headset-on/s9.jpg";

export const ADVANCED2_EP1_HEADSET_ON: StorybookEpisode = {
  id: "advanced2-ep1-headset-on",
  moduleId: "advanced-2",
  week: 1,
  title: "Headset on",
  titleEs: "Diadema puesta",
  episodeLabel: {
    en: "Advanced 2 · Episode 1",
    es: "Advanced 2 · Episodio 1",
  },
  previously: [
    {
      en: "Dani leads the Northline pilot.",
      es: "Dani dirige el piloto de Northline.",
    },
    {
      en: "Barrett has one rule for him.",
      es: "Barrett tiene una regla para él.",
    },
    {
      en: "Whoever trains, takes calls.",
      es: "El que entrena, toma llamadas.",
    },
  ],
  reviewWords: [
    { word: "pilot", es: "plan piloto" },
    { word: "agent", es: "agente" },
    { word: "headset", es: "diadema" },
    { word: "customer", es: "cliente" },
    { word: "shift", es: "turno" },
  ],
  blurb: {
    en: "Twenty agents, one floor and a rule Dani did not expect: before he teaches anybody, he takes calls. His first customer will not say what is wrong, and the youngest person in the room is the one who fixes it.",
    es: "Veinte agentes, un piso y una regla que Dani no esperaba: antes de enseñarle a nadie, toma llamadas. Su primer cliente no dice qué le pasa, y quien lo resuelve es la persona más joven del piso.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "The Northline floor at 6:55 a.m., rows of empty desks with headsets; Barrett standing by the first row; Dani arriving with his backpack.",
      text: "Monday. Day one of the pilot.",
      es: "Lunes. Día uno del piloto.",
      speaker: "barrett",
      cast: ["barrett", "dani"],
      lines: [
        {
          speaker: "barrett",
          text: "Twenty agents start today. One rule before you teach any of them: whoever trains, takes calls.",
          es: "Hoy empiezan veinte agentes. Una regla antes de que le enseñes a alguno: el que entrena, toma llamadas.",
        },
        {
          speaker: "dani",
          text: "Real calls. Today.",
          es: "Llamadas reales. Hoy.",
        },
        {
          speaker: "barrett",
          text: "Real customers, real accounts. You can't fix a floor you've never sat on.",
          es: "Clientes reales, cuentas reales. No puedes arreglar un piso en el que nunca te has sentado.",
        },
        {
          speaker: "dani",
          text: "Which desk is mine?",
          es: "¿Cuál escritorio es el mío?",
        },
        {
          speaker: "barrett",
          text: "The one in the middle, where everyone can hear you.",
          es: "El del medio, donde todos puedan oírte.",
        },
      ],
      words: [
        { word: "agents", es: "agentes" },
        { word: "calls", es: "llamadas" },
        { word: "desk", es: "escritorio" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Mía sitting sideways on her chair with her headset on and her phone in her hand; Nico in the next cubicle, hood up, silent; Dani standing between them.",
      text: "The night shift arrives early.",
      es: "El turno de noche llega temprano.",
      speaker: "mia",
      cast: ["mia", "nico", "dani"],
      lines: [
        {
          speaker: "mia",
          text: "Morning, jefe. Everybody's asking if the boss really takes calls or if that was a speech.",
          es: "Buenos días, jefe. Todos preguntan si el jefe de verdad toma llamadas o si eso fue un discurso.",
        },
        {
          speaker: "dani",
          text: "It wasn't a speech.",
          es: "No fue un discurso.",
        },
        {
          speaker: "mia",
          text: "Okay. Then I'm timing you.",
          es: "Okay. Entonces te voy a cronometrar.",
        },
        {
          speaker: "nico",
          text: "She times everyone.",
          es: "Ella cronometra a todos.",
        },
        {
          speaker: "dani",
          text: "Great. No pressure.",
          es: "Perfecto. Cero presión.",
        },
      ],
      words: [
        { word: "shift", es: "turno" },
        { word: "timing", es: "cronometrando" },
        { word: "pressure", es: "presión" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Close on Dani at his desk with the headset on, one hand flat on the table, the call light green; Mía watching over the divider.",
      text: "7:20 a.m. The first call.",
      es: "7:20 a.m. La primera llamada.",
      speaker: "dani",
      lines: [
        {
          speaker: "dani",
          text: "Thanks for calling Northline. How can I help you today?",
          es: "Gracias por llamar a Northline. ¿En qué le puedo ayudar hoy?",
        },
        {
          speaker: "caller",
          text: "It's not working. I've been trying since last night and it's still not working.",
          es: "No funciona. Llevo desde anoche intentando y sigue sin funcionar.",
        },
        {
          speaker: "dani",
          text: "I'm sorry about that. So the app isn't opening on your phone, and I'll reset it right now.",
          es: "Lamento eso. Entonces la aplicación no abre en su teléfono, y la voy a reiniciar ahora mismo.",
        },
        {
          speaker: "caller",
          text: "I didn't say the app. I said it's not working. Are you even listening?",
          es: "No dije la aplicación. Dije que no funciona. ¿Me está escuchando?",
        },
      ],
      words: [
        { word: "working", es: "funcionando" },
        { word: "reset", es: "reiniciar" },
        { word: "listening", es: "escuchando" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Dani staring at a dead call screen, headset still on, shoulders down; Mía holding up her phone showing the timer.",
      text: "She hung up.",
      es: "Colgó.",
      speaker: "mia",
      cast: ["mia", "dani", "nico"],
      lines: [
        {
          speaker: "mia",
          text: "Fifty-one seconds.",
          es: "Cincuenta y un segundos.",
        },
        {
          speaker: "dani",
          text: "I know.",
          es: "Lo sé.",
        },
        {
          speaker: "mia",
          text: "No, but seriously, fifty-one. That's a record and not a good one.",
          es: "No, en serio, cincuenta y uno. Es un récord y no de los buenos.",
        },
        {
          speaker: "nico",
          text: "You guessed.",
          es: "Adivinaste.",
        },
        {
          speaker: "dani",
          text: "Say that again?",
          es: "¿Cómo dijiste?",
        },
      ],
      words: [
        { word: "hung", es: "colgó" },
        { word: "record", es: "récord" },
        { word: "guessed", es: "adivinaste" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Nico turned halfway in his chair, three fingers raised, not looking at Dani; Dani writing on the back of his hand.",
      text: "Three sentences.",
      es: "Tres frases.",
      speaker: "nico",
      cast: ["nico", "dani"],
      lines: [
        {
          speaker: "nico",
          text: "She never said what broke. You filled it in. Don't fill it in.",
          es: "Ella nunca dijo qué se dañó. Tú lo rellenaste. No lo rellenes.",
        },
        {
          speaker: "dani",
          text: "So what do I do instead?",
          es: "¿Y entonces qué hago?",
        },
        {
          speaker: "nico",
          text: "Listen. Clarify. Confirm. One question at a time, then repeat it back before you touch anything.",
          es: "Escucha. Aclara. Confirma. Una pregunta a la vez, y repítelo antes de tocar nada.",
        },
        {
          speaker: "dani",
          text: "That's it?",
          es: "¿Eso es todo?",
        },
        {
          speaker: "nico",
          text: "That's it. My mom calls people like me all the time. She hangs up when they guess.",
          es: "Eso es todo. Mi mamá llama a gente como yo todo el tiempo. Cuelga cuando adivinan.",
        },
      ],
      words: [
        { word: "clarify", es: "aclarar" },
        { word: "confirm", es: "confirmar" },
        { word: "repeat", es: "repetir" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Dani back at the desk, headset on, calm, writing one line on a notepad; Mía leaning in with her chin on the divider.",
      text: "7:48 a.m. The second call.",
      es: "7:48 a.m. La segunda llamada.",
      speaker: "dani",
      lines: [
        {
          speaker: "dani",
          text: "Thanks for calling Northline. How can I help you today?",
          es: "Gracias por llamar a Northline. ¿En qué le puedo ayudar hoy?",
        },
        {
          speaker: "caller",
          text: "Same thing as before. It's not working and nobody has fixed it.",
          es: "Lo mismo de antes. No funciona y nadie lo ha arreglado.",
        },
        {
          speaker: "dani",
          text: "I understand why that's frustrating. Let me check that for you. Can I ask you two quick questions so I can find the problem?",
          es: "Entiendo por qué eso es frustrante. Déjeme revisarlo. ¿Le puedo hacer dos preguntas rápidas para encontrar el problema?",
        },
        {
          speaker: "caller",
          text: "Fine. Two.",
          es: "Está bien. Dos.",
        },
        {
          speaker: "dani",
          text: "When it stopped, were you on your phone or on your computer? And does the same thing happen on both?",
          es: "Cuando dejó de funcionar, ¿estaba en su teléfono o en su computadora? ¿Y pasa lo mismo en los dos?",
        },
      ],
      words: [
        { word: "frustrating", es: "frustrante" },
        { word: "quick", es: "rápidas" },
        { word: "problem", es: "problema" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Close on the call screen turning from red to green; Dani's hand still on the notepad; Nico's face half visible over the divider, listening.",
      text: "The customer slows down.",
      es: "La clienta baja la velocidad.",
      speaker: "caller",
      lines: [
        {
          speaker: "caller",
          text: "The computer. On my phone it's fine. It's the reports page that won't load.",
          es: "La computadora. En el teléfono está bien. Es la página de reportes la que no carga.",
        },
        {
          speaker: "dani",
          text: "So you're saying it works on your phone but not on your computer, and it's the reports page, right?",
          es: "Entonces me dice que funciona en su teléfono pero no en su computadora, y es la página de reportes, ¿verdad?",
        },
        {
          speaker: "caller",
          text: "Yes. That's what I've been saying since last night.",
          es: "Sí. Eso es lo que llevo diciendo desde anoche.",
        },
        {
          speaker: "dani",
          text: "Thank you. That helps me a lot. What I can do is open your account and confirm what's happening, and I'll stay on the line until we know the next step.",
          es: "Gracias. Eso me ayuda mucho. Lo que puedo hacer es abrir su cuenta y confirmar qué está pasando, y me quedo en la línea hasta que sepamos el siguiente paso.",
        },
      ],
      words: [
        { word: "reports", es: "reportes" },
        { word: "account", es: "cuenta" },
        { word: "line", es: "línea" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Mía showing her phone timer to Dani with a flat face; Nico with his hood up pretending not to listen; the floor busy behind them.",
      text: "Six minutes, forty.",
      es: "Seis minutos, cuarenta.",
      speaker: "mia",
      cast: ["mia", "dani", "nico"],
      lines: [
        {
          speaker: "mia",
          text: "Six forty. And she said thank you at the end, which honestly never happens before nine.",
          es: "Seis cuarenta. Y dijo gracias al final, lo cual la verdad nunca pasa antes de las nueve.",
        },
        {
          speaker: "dani",
          text: "Nico gave me the three sentences.",
          es: "Nico me dio las tres frases.",
        },
        {
          speaker: "mia",
          text: "Wait. You're telling Barrett that? That the guy who's been here two weeks taught the director?",
          es: "Espera. ¿Le vas a decir eso a Barrett? ¿Que el que lleva dos semanas le enseñó al director?",
        },
        {
          speaker: "dani",
          text: "That's exactly what I'm telling her. It's true.",
          es: "Es exactamente lo que le voy a decir. Es verdad.",
        },
        {
          speaker: "nico",
          text: "Okay, that's weird. Good weird.",
          es: "Okay, eso es raro. Raro bueno.",
        },
      ],
      words: [
        { word: "honestly", es: "la verdad, honestamente" },
        { word: "director", es: "director" },
        { word: "weird", es: "raro" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "End of shift, the floor half empty; Dani hanging his headset on the monitor; Mía at the door with her jacket on; a screen behind them showing a hotel account name.",
      text: "End of shift.",
      es: "Fin del turno.",
      speaker: "dani",
      cast: ["dani", "mia"],
      lines: [
        {
          speaker: "dani",
          text: "Tomorrow is the hotel account. Reservations.",
          es: "Mañana es la cuenta de hoteles. Reservaciones.",
        },
        {
          speaker: "mia",
          text: "Oh, that one's fun. People change their mind three times in one call.",
          es: "Ah, esa es divertida. La gente cambia de opinión tres veces en una llamada.",
        },
        {
          speaker: "dani",
          text: "How do you not lose track when somebody changes the dates three times?",
          es: "¿Cómo no te pierdes cuando alguien cambia las fechas tres veces?",
        },
        {
          speaker: "mia",
          text: "I'll show you. But it costs a coffee, and Camila approves those now.",
          es: "Te enseño. Pero cuesta un café, y ahora Camila los aprueba.",
        },
      ],
      words: [
        { word: "reservations", es: "reservaciones" },
        { word: "mind", es: "opinión, mente" },
        { word: "track", es: "el hilo, la cuenta" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s5",
      questionEn: "What does Nico tell Dani to do instead of guessing?",
      questionEs: "¿Qué le dice Nico a Dani que haga en vez de adivinar?",
      options: [
        { label: "Listen, clarify and confirm, one question at a time", emoji: "👂" },
        { label: "Reset the app before the customer explains", emoji: "🔄" },
        { label: "Pass the call to the night shift", emoji: "📞" },
      ],
      answer: 0,
      sayIt: "Listen, clarify and confirm, one question at a time.",
      sayItEs: "Escuchar, aclarar y confirmar, una pregunta a la vez.",
      sayItCheck: {
        target: "Listen, clarify and confirm",
        altTargets: ["Listen clarify and confirm", "One question at a time"],
      },
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "A customer calls and does not explain the problem. Check what you understood before you fix anything.",
      questionEs: "Un cliente llama y no explica el problema. Confirma lo que entendiste antes de arreglar nada.",
      options: [
        { label: "I am ready to answer", emoji: "🎧" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "Just to make sure I understood, the payment went through but the receipt never arrived. Let me check that for you.",
      sayItEs: "Solo para asegurarme de que entendí, el pago se hizo pero el recibo nunca llegó. Déjeme revisarlo.",
      sayItAskEn: "Start with \"Just to make sure I understood, ...\" and then \"Let me check that for you.\"",
      sayItAskEs: "Empieza con \"Just to make sure I understood, …\" y luego \"Let me check that for you.\"",
      sayItCheck: {
        target: "Just to make sure I understood *",
        altTargets: ["Let me check that for you", "So you're saying *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s4",
    phrase: "A question I didn't ask is a problem I can't fix.",
    es: "Una pregunta que no hice es un problema que no puedo arreglar.",
  },
  habitCard: {
    afterScene: "s7",
    phrase: "Before I touch anything, I repeat the problem back in my own words.",
    es: "Antes de tocar nada, repito el problema con mis propias palabras.",
    model: "nico",
    modelActionEs: "Nico le enseñó a Dani a escuchar, aclarar y confirmar antes de actuar, porque su mamá cuelga cuando el agente adivina.",
  },
  expressions: [
    {
      phrase: "fill in",
      variants: ["filled it in", "fill it in", "filling in"],
      es: "rellenar, completar (lo que falta)",
      kind: "phrasal",
      example: "She never said what broke. You filled it in.",
      exampleEs: "Ella nunca dijo qué se dañó. Tú lo rellenaste.",
    },
    {
      phrase: "hang up",
      variants: ["hangs up", "hung up", "hung"],
      es: "colgar (el teléfono)",
      kind: "phrasal",
      example: "She hangs up when they guess.",
      exampleEs: "Ella cuelga cuando adivinan.",
    },
    {
      phrase: "lose track",
      variants: ["lose track of", "losing track"],
      es: "perder el hilo",
      kind: "idiom",
      example: "How do you not lose track?",
      exampleEs: "¿Cómo no te pierdes?",
    },
    {
      phrase: "no pressure",
      es: "cero presión (dicho con ironía)",
      kind: "idiom",
      example: "Great. No pressure.",
      exampleEs: "Perfecto. Cero presión.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: a customer calls and won't say what is wrong. Ask, repeat it back and confirm before you promise anything.",
    es: "Treinta segundos: un cliente llama y no dice qué pasa. Pregunta, repite lo que entendiste y confirma antes de prometer nada.",
  },
  continueWith: [
    "Let me check that for you.",
    "Just to make sure I understood, ...",
    "So you're saying ..., right?",
    "What I can do is ...",
  ],
  cliffhanger: {
    en: "Tomorrow: the hotel account, and a guest who changes the dates three times in one call.",
    es: "Mañana: la cuenta de hoteles, y un huésped que cambia las fechas tres veces en una llamada.",
  },
};
