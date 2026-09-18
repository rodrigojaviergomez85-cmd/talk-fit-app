import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced2-ep3-ninety-days/cover.jpg";
import s1 from "@/assets/storybook/advanced2-ep3-ninety-days/s1.jpg";
import s2 from "@/assets/storybook/advanced2-ep3-ninety-days/s2.jpg";
import s3 from "@/assets/storybook/advanced2-ep3-ninety-days/s3.jpg";
import s4 from "@/assets/storybook/advanced2-ep3-ninety-days/s4.jpg";
import s5 from "@/assets/storybook/advanced2-ep3-ninety-days/s5.jpg";
import s6 from "@/assets/storybook/advanced2-ep3-ninety-days/s6.jpg";
import s7 from "@/assets/storybook/advanced2-ep3-ninety-days/s7.jpg";
import s8 from "@/assets/storybook/advanced2-ep3-ninety-days/s8.jpg";
import s9 from "@/assets/storybook/advanced2-ep3-ninety-days/s9.jpg";

export const ADVANCED2_EP3_NINETY_DAYS: StorybookEpisode = {
  id: "advanced2-ep3-ninety-days",
  moduleId: "advanced-2",
  week: 1,
  title: "Ninety days",
  titleEs: "Noventa días",
  episodeLabel: {
    en: "Advanced 2 · Episode 3",
    es: "Advanced 2 · Episodio 3",
  },
  previously: [
    {
      en: "Mía's four words fixed the hotel calls.",
      es: "Las cuatro palabras de Mía arreglaron las llamadas del hotel.",
    },
    {
      en: "Barrett sent Dani the ninety-day policy.",
      es: "Barrett le mandó a Dani la política de noventa días.",
    },
    {
      en: "He has to explain it to the floor.",
      es: "Tiene que explicársela al piso.",
    },
  ],
  reviewWords: [
    { word: "policy", es: "política" },
    { word: "agent", es: "agente" },
    { word: "confirm", es: "confirmar" },
    { word: "delay", es: "retraso" },
    { word: "audit", es: "auditoría" },
  ],
  blurb: {
    en: "A customer wants to know where his package is. Dani explains it in four moves and it goes well. Then he has to use the same four moves on twenty agents, and the package is their job.",
    es: "Un cliente quiere saber dónde está su paquete. Dani lo explica en cuatro pasos y sale bien. Después tiene que usar los mismos cuatro pasos con veinte agentes, y el paquete es su trabajo.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Dani at his desk reading a long email on screen; the subject line visible; his coffee untouched.",
      text: "Wednesday, 7:02 a.m.",
      es: "Miércoles, 7:02 a.m.",
      speaker: "dani",
      cast: ["dani", "barrett"],
      lines: [
        {
          speaker: "dani",
          text: "Ninety days. Then Northline audits every agent's English, and the ones who don't pass don't stay.",
          es: "Noventa días. Después Northline audita el inglés de cada agente, y los que no pasan no se quedan.",
        },
        {
          speaker: "barrett",
          text: "You have the policy at seven in the morning so you can tell them before the rumor does.",
          es: "Tienes la política a las siete de la mañana para que se los digas antes que el rumor.",
        },
        {
          speaker: "dani",
          text: "Who runs the audit?",
          es: "¿Quién hace la auditoría?",
        },
        {
          speaker: "barrett",
          text: "Crown. They asked for an outside evaluator and Crown is the outside evaluator.",
          es: "Crown. Pidieron un evaluador externo y Crown es el evaluador externo.",
        },
        {
          speaker: "dani",
          text: "Crown is Lidia now.",
          es: "Crown ahora es Lidia.",
        },
      ],
      words: [
        { word: "audits", es: "audita" },
        { word: "rumor", es: "rumor" },
        { word: "evaluator", es: "evaluador" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Dani on a call with the delivery account screen open, tracking map on the monitor.",
      text: "9:30 a.m. The order.",
      es: "9:30 a.m. El pedido.",
      speaker: "dani",
      lines: [
        {
          speaker: "dani",
          text: "Let me explain what happened with your order. Your payment went through, so the order is confirmed.",
          es: "Déjeme explicarle qué pasó con su pedido. Su pago se procesó, así que el pedido está confirmado.",
        },
        {
          speaker: "caller",
          text: "Confirmed where? It's been four days.",
          es: "¿Confirmado dónde? Han pasado cuatro días.",
        },
        {
          speaker: "dani",
          text: "Right now the package is at the local delivery center. The thing is, there was a delay because of the rain on Sunday.",
          es: "Ahora mismo el paquete está en el centro de reparto local. La cosa es que hubo un retraso por la lluvia del domingo.",
        },
        {
          speaker: "caller",
          text: "And what have you actually done about it?",
          es: "¿Y qué ha hecho usted al respecto?",
        },
      ],
      words: [
        { word: "payment", es: "pago" },
        { word: "package", es: "paquete" },
        { word: "delay", es: "retraso" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Close on Dani's screen showing a note added to a delivery ticket; his other hand holding the notepad with four words.",
      text: "The next step.",
      es: "El siguiente paso.",
      speaker: "dani",
      lines: [
        {
          speaker: "dani",
          text: "What I've done is send a note to the delivery team while we've been talking. The next step is a new delivery attempt tomorrow morning.",
          es: "Lo que he hecho es mandar una nota al equipo de reparto mientras hablábamos. El siguiente paso es un nuevo intento de entrega mañana por la mañana.",
        },
        {
          speaker: "caller",
          text: "And if nobody comes tomorrow?",
          es: "¿Y si mañana no llega nadie?",
        },
        {
          speaker: "dani",
          text: "Then you call me back and I open a claim the same day. You'll get a message as soon as the driver is on the way.",
          es: "Entonces me llama de vuelta y abro un reclamo el mismo día. Va a recibir un mensaje en cuanto el repartidor salga.",
        },
        {
          speaker: "caller",
          text: "Okay. That's the first time someone told me where it actually is.",
          es: "Está bien. Es la primera vez que alguien me dice dónde está de verdad.",
        },
      ],
      words: [
        { word: "attempt", es: "intento" },
        { word: "claim", es: "reclamo" },
        { word: "driver", es: "repartidor" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Mía with her headset half off, leaning over the divider, serious for the first time; Nico turned around in his chair.",
      text: "The rumor arrives anyway.",
      es: "El rumor llega igual.",
      speaker: "mia",
      cast: ["mia", "nico", "dani"],
      lines: [
        {
          speaker: "mia",
          text: "Jefe. Somebody in the kitchen said there's a test in three months and people get fired.",
          es: "Jefe. Alguien en la cocina dijo que hay un examen en tres meses y que despiden gente.",
        },
        {
          speaker: "nico",
          text: "Is it true?",
          es: "¿Es cierto?",
        },
        {
          speaker: "dani",
          text: "Give me ten minutes and I'll tell all of you at once. Not in the kitchen.",
          es: "Denme diez minutos y se los digo a todos de una vez. No en la cocina.",
        },
        {
          speaker: "mia",
          text: "That's a yes.",
          es: "Eso es un sí.",
        },
      ],
      words: [
        { word: "kitchen", es: "cocina" },
        { word: "test", es: "examen" },
        { word: "fired", es: "despedidos" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Twenty agents standing between the desks, headsets off, all facing Dani, who has no slides and no papers.",
      text: "10:15 a.m. The floor.",
      es: "10:15 a.m. El piso.",
      speaker: "dani",
      cast: ["dani", "mia", "nico", "oscar"],
      lines: [
        {
          speaker: "dani",
          text: "Here's what's happening, in four parts, the same way we explain an order.",
          es: "Esto es lo que está pasando, en cuatro partes, igual que explicamos un pedido.",
        },
        {
          speaker: "dani",
          text: "What: in ninety days there's an English audit for every agent on this pilot. Where: here, on this floor, on real calls, not on paper.",
          es: "Qué: en noventa días hay una auditoría de inglés para cada agente de este piloto. Dónde: aquí, en este piso, en llamadas reales, no en papel.",
        },
        {
          speaker: "oscar",
          text: "And if we don't pass?",
          es: "¿Y si no pasamos?",
        },
        {
          speaker: "dani",
          text: "Then Northline doesn't keep you on the pilot. I'm not going to soften that.",
          es: "Entonces Northline no te mantiene en el piloto. No lo voy a suavizar.",
        },
      ],
      words: [
        { word: "parts", es: "partes" },
        { word: "real", es: "reales" },
        { word: "paper", es: "papel" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Dani writing two dates on the whiteboard with a marker while the agents watch; Óscar at the back with his headset in his hand.",
      text: "Action and next.",
      es: "Acción y siguiente paso.",
      speaker: "dani",
      cast: ["dani", "mia", "oscar"],
      lines: [
        {
          speaker: "dani",
          text: "Action: from today, eleven minutes of speaking per shift, on the floor, paid, with me sitting in the row.",
          es: "Acción: desde hoy, once minutos hablados por turno, en el piso, pagados, conmigo sentado en la fila.",
        },
        {
          speaker: "mia",
          text: "Paid? Say that part louder.",
          es: "¿Pagados? Esa parte dilo más fuerte.",
        },
        {
          speaker: "dani",
          text: "Paid. Next: every Friday you get your own numbers, and nobody finds out on day ninety what they could have known on day nine.",
          es: "Pagados. Siguiente: cada viernes reciben sus propios números, y nadie se entera el día noventa de lo que pudo saber el día nueve.",
        },
        {
          speaker: "oscar",
          text: "I've never spoken English for eleven minutes in my life.",
          es: "Nunca he hablado inglés once minutos en mi vida.",
        },
        {
          speaker: "dani",
          text: "Neither had I. That's why the number is eleven and not sixty.",
          es: "Yo tampoco. Por eso el número es once y no sesenta.",
        },
      ],
      words: [
        { word: "minutes", es: "minutos" },
        { word: "paid", es: "pagados" },
        { word: "numbers", es: "números" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "The agents going back to their desks; Nico standing still in the middle of the floor looking at Dani.",
      text: "Nico doesn't move.",
      es: "Nico no se mueve.",
      speaker: "nico",
      cast: ["nico", "dani"],
      lines: [
        {
          speaker: "nico",
          text: "So it's a test.",
          es: "Entonces es un examen.",
        },
        {
          speaker: "dani",
          text: "It's a test.",
          es: "Es un examen.",
        },
        {
          speaker: "nico",
          text: "My mom's rent is this job.",
          es: "La renta de mi mamá es este trabajo.",
        },
        {
          speaker: "dani",
          text: "I know. That's why you're getting the numbers every Friday and not a speech in March.",
          es: "Lo sé. Por eso vas a recibir los números cada viernes y no un discurso en marzo.",
        },
      ],
      words: [
        { word: "rent", es: "renta" },
        { word: "job", es: "trabajo" },
        { word: "speech", es: "discurso" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Camila on a laptop screen at Dani's desk in a video call, a spreadsheet visible beside her face.",
      text: "Camila calls.",
      es: "Camila llama.",
      speaker: "camila",
      cast: ["camila", "dani"],
      lines: [
        {
          speaker: "camila",
          text: "Eleven paid minutes times twenty agents times ninety days. I did the math before you asked.",
          es: "Once minutos pagados por veinte agentes por noventa días. Hice la cuenta antes de que preguntaras.",
        },
        {
          speaker: "dani",
          text: "And?",
          es: "¿Y?",
        },
        {
          speaker: "camila",
          text: "And it's cheaper than replacing six agents in March. Approved, in writing, so you can show it.",
          es: "Y sale más barato que reemplazar a seis agentes en marzo. Aprobado, por escrito, para que lo puedas mostrar.",
        },
        {
          speaker: "dani",
          text: "Thank you.",
          es: "Gracias.",
        },
        {
          speaker: "camila",
          text: "Don't thank me. Send me Friday's numbers on Friday, not on Monday.",
          es: "No me agradezcas. Mándame los números del viernes el viernes, no el lunes.",
        },
      ],
      words: [
        { word: "math", es: "cuenta, matemática" },
        { word: "cheaper", es: "más barato" },
        { word: "approved", es: "aprobado" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Night shift, the floor quieter; a printed bill on Dani's desk with one line circled in red; Camila's message still on the screen.",
      text: "9:40 p.m.",
      es: "9:40 p.m.",
      speaker: "dani",
      cast: ["dani", "nico"],
      lines: [
        {
          speaker: "dani",
          text: "Nico. Before you go. Tomorrow's account is billing, and there's a line on our own invoice nobody can explain.",
          es: "Nico. Antes de que te vayas. La cuenta de mañana es facturación, y hay una línea en nuestra propia factura que nadie puede explicar.",
        },
        {
          speaker: "nico",
          text: "Ours?",
          es: "¿La nuestra?",
        },
        {
          speaker: "dani",
          text: "Ours. Camila found it an hour ago.",
          es: "La nuestra. Camila la encontró hace una hora.",
        },
      ],
      words: [
        { word: "billing", es: "facturación" },
        { word: "invoice", es: "factura" },
        { word: "line", es: "línea" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s6",
      questionEn: "What does Dani promise the agents every Friday?",
      questionEs: "¿Qué les promete Dani a los agentes cada viernes?",
      options: [
        { label: "Their own speaking numbers, so nobody is surprised on day ninety", emoji: "📊" },
        { label: "A written English exam", emoji: "📝" },
        { label: "A meeting with Crown", emoji: "🏢" },
      ],
      answer: 0,
      sayIt: "Their own speaking numbers, so nobody is surprised on day ninety.",
      sayItEs: "Sus propios números de minutos hablados, para que nadie se sorprenda el día noventa.",
      sayItCheck: {
        target: "Their own speaking numbers",
        altTargets: ["Their own numbers", "Every Friday they get their numbers"],
      },
    },
    {
      id: "q2",
      afterScene: "s3",
      questionEn: "A customer asks what is happening with their order. Say what, where, what you did and what comes next.",
      questionEs: "Un cliente pregunta qué está pasando con su pedido. Di qué, dónde, qué hiciste y qué sigue.",
      options: [
        { label: "I am ready to answer", emoji: "🎧" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "Right now your order is at the delivery center. What I've done is send a note to the team, and the next step is a new attempt tomorrow morning.",
      sayItEs: "Ahora mismo su pedido está en el centro de reparto. Lo que he hecho es mandar una nota al equipo, y el siguiente paso es un nuevo intento mañana por la mañana.",
      sayItAskEn: "Start with \"Right now ...\", then \"What I've done is ...\", then \"The next step is ...\".",
      sayItAskEs: "Empieza con \"Right now …\", luego \"What I've done is …\" y luego \"The next step is …\".",
      sayItCheck: {
        target: "Right now *",
        altTargets: ["The next step is *", "What I've done is *", "What happened was *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s5",
    phrase: "Bad news early is not bad news. It's time.",
    es: "Una mala noticia temprano no es una mala noticia. Es tiempo.",
  },
  habitCard: {
    afterScene: "s6",
    phrase: "When I explain something hard, I say what, where, what I did and what comes next.",
    es: "Cuando explico algo difícil, digo qué, dónde, qué hice y qué sigue.",
    model: "dani",
    modelActionEs: "Dani usó el mismo marco con un cliente y con veinte agentes, y no suavizó la parte difícil.",
  },
  expressions: [
    {
      phrase: "go through",
      variants: ["went through", "goes through", "going through"],
      es: "procesarse, pasar (un pago)",
      kind: "phrasal",
      example: "Your payment went through, so the order is confirmed.",
      exampleEs: "Su pago se procesó, así que el pedido está confirmado.",
    },
    {
      phrase: "find out",
      variants: ["finds out", "found out", "finding out"],
      es: "enterarse",
      kind: "phrasal",
      example: "Nobody finds out on day ninety what they could have known on day nine.",
      exampleEs: "Nadie se entera el día noventa de lo que pudo saber el día nueve.",
    },
    {
      phrase: "on the way",
      variants: ["on his way", "on their way"],
      es: "en camino",
      kind: "idiom",
      example: "You'll get a message as soon as the driver is on the way.",
      exampleEs: "Va a recibir un mensaje en cuanto el repartidor salga.",
    },
    {
      phrase: "soften it",
      variants: ["soften that", "softening it"],
      es: "suavizarlo",
      kind: "idiom",
      example: "I'm not going to soften that.",
      exampleEs: "No lo voy a suavizar.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: explain a delay to someone who is waiting. Where it is, what you did about it, and what happens next.",
    es: "Treinta segundos: explica un retraso a alguien que está esperando. Dónde está, qué hiciste y qué pasa después.",
  },
  continueWith: [
    "Let me explain what happened.",
    "Right now ...",
    "What I've done is ...",
    "The next step is ...",
  ],
  cliffhanger: {
    en: "Tomorrow, two bills on one desk: a customer who doesn't recognize a charge, and one line on Northline's own invoice that nobody can explain.",
    es: "Mañana, dos facturas en un escritorio: un cliente que no reconoce un cargo, y una línea en la propia factura de Northline que nadie puede explicar.",
  },
};
