import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced1-ep14-the-hour-about-money/cover.jpg";
import s1 from "@/assets/storybook/advanced1-ep14-the-hour-about-money/s1.jpg";
import s2 from "@/assets/storybook/advanced1-ep14-the-hour-about-money/s2.jpg";
import s3 from "@/assets/storybook/advanced1-ep14-the-hour-about-money/s3.jpg";
import s4 from "@/assets/storybook/advanced1-ep14-the-hour-about-money/s4.jpg";
import s5 from "@/assets/storybook/advanced1-ep14-the-hour-about-money/s5.jpg";
import s6 from "@/assets/storybook/advanced1-ep14-the-hour-about-money/s6.jpg";
import s7 from "@/assets/storybook/advanced1-ep14-the-hour-about-money/s7.jpg";
import s8 from "@/assets/storybook/advanced1-ep14-the-hour-about-money/s8.jpg";
import s9 from "@/assets/storybook/advanced1-ep14-the-hour-about-money/s9.jpg";

export const ADVANCED1_EP14_THE_HOUR_ABOUT_MONEY: StorybookEpisode = {
  id: "advanced1-ep14-the-hour-about-money",
  moduleId: "advanced-1",
  week: 3,
  title: "The hour about money",
  titleEs: "La hora del dinero",
  episodeLabel: {
    en: "Advanced 1 · Episode 14",
    es: "Advanced 1 · Episodio 14",
  },
  previously: [
    {
      en: "Vale won the \"why Northline\" round with their own numbers.",
      es: "Vale ganó la ronda de \"por qué Northline\" con los números de ellos.",
    },
    {
      en: "Rosa rejected Crown and stayed.",
      es: "Rosa rechazó a Crown y se quedó.",
    },
    {
      en: "Now finance wants the price cut by a third.",
      es: "Ahora finanzas quiere recortar el precio en un tercio.",
    },
  ],
  reviewWords: [
    { word: "price", es: "precio" },
    { word: "budget", es: "presupuesto" },
    { word: "schedule", es: "horario" },
    { word: "however", es: "sin embargo" },
    { word: "class size", es: "tamaño del grupo" },
  ],
  blurb: {
    en: "One hour, three pressures and no \"no\". Vale gives away what doesn't matter and protects what does.",
    es: "Una hora, tres presiones y ningún \"no\". Vale cede lo que no importa y protege lo que sí.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Camila hands Vale the returned contract while Dani reads over her shoulder.",
      text: "The contract comes back with a smaller number.",
      es: "El contrato regresa con un número más pequeño.",
      speaker: "camila",
      cast: ["camila", "vale", "dani"],
      lines: [
        {
          speaker: "camila",
          text: "Finance sent the contract back. Same scope, thirty per cent less money, and they want Saturday classes included.",
          es: "Finanzas devolvió el contrato. El mismo alcance, treinta por ciento menos dinero, y quieren clases de sábado incluidas.",
        },
        {
          speaker: "dani",
          text: "If we said yes to that, we'd be paying to teach by month four.",
          es: "Si dijéramos que sí a eso, estaríamos pagando por enseñar para el mes cuatro.",
        },
        {
          speaker: "vale",
          text: "Then we don't say no; we say what we can do. Nobody has ever won a negotiation by sounding offended.",
          es: "Entonces no decimos que no; decimos lo que sí podemos hacer. Nadie ha ganado una negociación sonando ofendido.",
        },
      ],
      words: [
        { word: "scope", es: "alcance" },
        { word: "negotiation", es: "negociación" },
        { word: "offended", es: "ofendido" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Camila writes three moves on a notepad as Vale rehearses the sentence.",
      text: "Three moves, and never repeat their number.",
      es: "Tres movimientos, y nunca repetir su número.",
      speaker: "camila",
      cast: ["vale", "camila"],
      lines: [
        {
          speaker: "camila",
          text: "Three moves: I understand, however, what I can do is. And you never repeat their number out loud.",
          es: "Tres movimientos: entiendo, sin embargo, lo que puedo hacer es. Y nunca repites su número en voz alta.",
        },
        {
          speaker: "vale",
          text: "I understand the budget was set before this round. However, the price is tied to teaching hours, not to my margin. What I can do is restructure the week to reduce the number of teaching hours.",
          es: "Entiendo que el presupuesto se fijó antes de esta ronda. Sin embargo, el precio está ligado a las horas de clase, no a mi margen. Lo que puedo hacer es reestructurar la semana para reducir el número de horas de clase.",
        },
      ],
      words: [
        { word: "tied", es: "ligado" },
        { word: "margin", es: "margen" },
        { word: "restructure", es: "reestructurar" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale, Dani and Rosa list what they can give up and what they cannot.",
      text: "What can be given up, and what cannot.",
      es: "Qué se puede ceder y qué no.",
      speaker: "dani",
      cast: ["vale", "dani", "rosa"],
      lines: [
        {
          speaker: "dani",
          text: "What are you willing to give up?",
          es: "¿A qué estás dispuesta a renunciar?",
        },
        {
          speaker: "vale",
          text: "Materials in print, the launch event, and my travel. Those are comfort. What I won't give up is class size, because above twelve the speaking minutes collapse.",
          es: "Materiales impresos, el evento de lanzamiento y mis viajes. Eso es comodidad. A lo que no renuncio es al tamaño del grupo, porque arriba de doce los minutos hablados se derrumban.",
        },
        {
          speaker: "rosa",
          text: "And Saturdays? My teachers already work five evenings.",
          es: "¿Y los sábados? Mis maestros ya trabajan cinco tardes.",
        },
        {
          speaker: "vale",
          text: "Saturdays are a scheduling question, not a price question. We'll treat them separately.",
          es: "Los sábados son una pregunta de horario, no de precio. Los trataremos aparte.",
        },
      ],
      words: [
        { word: "launch event", es: "evento de lanzamiento" },
        { word: "collapse", es: "se derrumban" },
        { word: "scheduling", es: "de horarios" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Barrett pushes the Crown quote across the table and Vale answers calmly.",
      text: "First pressure: Crown is cheaper.",
      es: "Primera presión: Crown es más barato.",
      speaker: "barrett",
      cast: ["barrett", "vale"],
      lines: [
        {
          speaker: "barrett",
          text: "Crown quoted thirty per cent under you for the same number of hours.",
          es: "Crown cotizó treinta por ciento por debajo de usted por el mismo número de horas.",
        },
        {
          speaker: "vale",
          text: "I understand the comparison, and on paper the hours look identical. However, their hour puts twenty-five agents in a room, and mine puts twelve, which is the difference between listening to English and speaking it.",
          es: "Entiendo la comparación, y en papel las horas se ven idénticas. Sin embargo, su hora pone veinticinco agentes en una sala, y la mía pone doce, que es la diferencia entre escuchar inglés y hablarlo.",
        },
        {
          speaker: "vale",
          text: "What I can do is drop the printed materials and the launch event. That cuts the cost by nine percent immediately and lets us keep the same class size.",
          es: "Lo que puedo hacer es quitar los materiales impresos y el evento de lanzamiento. Eso baja el costo un nueve por ciento de inmediato y nos deja mantener el mismo tamaño de grupo.",
        },
      ],
      words: [
        { word: "quoted", es: "cotizó" },
        { word: "identical", es: "idénticas" },
        { word: "printed", es: "impresos" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Barrett asks about Saturdays while Vale offers a separate weekend team.",
      text: "Second pressure: the Saturdays.",
      es: "Segunda presión: los sábados.",
      speaker: "barrett",
      cast: ["barrett", "vale"],
      lines: [
        {
          speaker: "barrett",
          text: "And the Saturdays? Our agents are available then.",
          es: "¿Y los sábados? Nuestros agentes están disponibles entonces.",
        },
        {
          speaker: "vale",
          text: "I understand why Saturday looks free to you. However, a teacher on a sixth day teaches a worse class, and you'd be buying the tired version of the method.",
          es: "Entiendo por qué el sábado les parece libre. Sin embargo, un maestro en un sexto día da una peor clase, y estarían comprando la versión cansada del método.",
        },
        {
          speaker: "vale",
          text: "What I can do is open two Saturday groups with a second team hired for weekends only, billed separately.",
          es: "Lo que puedo hacer es abrir dos grupos de sábado con un segundo equipo contratado solo para fines de semana, facturado aparte.",
        },
      ],
      words: [
        { word: "available", es: "disponibles" },
        { word: "hired", es: "contratado" },
        { word: "billed", es: "facturado" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Barrett agrees to the terms as Reed and Vale close the meeting.",
      text: "The deal, line by line.",
      es: "El acuerdo, línea por línea.",
      speaker: "barrett",
      cast: ["reed", "barrett", "vale"],
      lines: [
        {
          speaker: "barrett",
          text: "Nine per cent off, class size of twelve, Saturdays as a separate line. I can put that through this week.",
          es: "Nueve por ciento menos, grupos de doce, sábados como línea aparte. Puedo tramitarlo esta semana.",
        },
        {
          speaker: "reed",
          text: "For the record, she didn't give in on the only clause that protects the results you're buying.",
          es: "Para el registro, ella no cedió en la única cláusula que protege los resultados que están comprando.",
        },
        {
          speaker: "vale",
          text: "Because the day I sell you a class of twenty-five, you stop being able to tell me apart from Crown.",
          es: "Porque el día que les venda un grupo de veinticinco, dejan de poder distinguirme de Crown.",
        },
      ],
      words: [
        { word: "clause", es: "cláusula" },
        { word: "protects", es: "protege" },
        { word: "record", es: "registro" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Camila, Dani and Vale review the agreement in the corridor afterwards.",
      text: "Nine per cent, and the thing that matters kept.",
      es: "Nueve por ciento, y lo que importa se queda.",
      speaker: "camila",
      cast: ["camila", "dani", "vale"],
      lines: [
        {
          speaker: "camila",
          text: "You gave away nine per cent and kept the thing that makes the method work.",
          es: "Regalaste nueve por ciento y te quedaste con lo que hace que el método funcione.",
        },
        {
          speaker: "dani",
          text: "What I noticed is that you never once said the word \"no\".",
          es: "Lo que noté es que ni una vez dijiste la palabra \"no\".",
        },
        {
          speaker: "vale",
          text: "\"No\" ends a conversation. \"What I can do is\" keeps it open and still protects the line.",
          es: "\"No\" termina una conversación. \"Lo que puedo hacer es\" la mantiene abierta y aun así protege el límite.",
        },
      ],
      words: [
        { word: "kept", es: "conservaste" },
        { word: "conversation", es: "conversación" },
        { word: "line", es: "límite" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Reed warns Vale about Friday's hostile panel.",
      text: "Friday's panel will interrupt on purpose.",
      es: "El panel del viernes interrumpirá a propósito.",
      speaker: "reed",
      cast: ["reed", "vale"],
      lines: [
        {
          speaker: "reed",
          text: "One more round on Friday. The panel is Barrett plus two people who were not impressed by you, and they'll interrupt on purpose.",
          es: "Una ronda más el viernes. El panel es Barrett más dos personas a las que no impresionaste, y van a interrumpir a propósito.",
        },
        {
          speaker: "vale",
          text: "Then Friday isn't about being right. It's about not stopping.",
          es: "Entonces el viernes no se trata de tener razón. Se trata de no detenerse.",
        },
      ],
      words: [
        { word: "impressed", es: "impresionados" },
        { word: "interrupt", es: "interrumpir" },
        { word: "purpose", es: "propósito" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Camila tells Vale that Crown presents right after her on Friday.",
      text: "One more detail about Friday.",
      es: "Un detalle más sobre el viernes.",
      speaker: "camila",
      cast: ["camila", "vale"],
      lines: [
        {
          speaker: "camila",
          text: "One detail. Crown is presenting on Friday too — right after you, in the same room.",
          es: "Un detalle. Crown también presenta el viernes, justo después de ti, en la misma sala.",
        },
        {
          speaker: "vale",
          text: "Good. Let them follow us for once.",
          es: "Bien. Que nos sigan a nosotros por una vez.",
        },
      ],
      words: [
        { word: "detail", es: "detalle" },
        { word: "presenting", es: "presentando" },
        { word: "follow", es: "seguir" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What is the one thing Vale refuses to change?",
      questionEs: "¿Qué es lo único que Vale se niega a cambiar?",
      options: [
        { label: "The printed materials", emoji: "📚" },
        { label: "The launch event", emoji: "🎉" },
        { label: "The number of students in each class", emoji: "👥" },
      ],
      answer: 2,
      sayIt: "The number of students in each class.",
      sayItEs: "El número de estudiantes en cada clase.",
      sayItCheck: {
        target: "The number of students in each class",
        altTargets: ["The class size", "She refuses to change the class size"],
      },
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "A manager asks you to work every Saturday for the next three months. Disagree professionally: \"I understand… However… What I can do is…\"",
      questionEs: "Un jefe te pide trabajar todos los sábados los próximos tres meses. Discrepa profesionalmente: \"I understand… However… What I can do is…\"",
      options: [
        { label: "I am ready to answer", emoji: "🎤" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "I understand the team is behind and Saturdays would help. However, I study on Saturday mornings and I don't want to arrive tired on Monday. What I can do is work two Saturdays a month and stay late on Wednesdays.",
      sayItEs: "Entiendo que el equipo está atrasado y que los sábados ayudarían. Sin embargo, estudio los sábados por la mañana y no quiero llegar cansado el lunes. Lo que puedo hacer es trabajar dos sábados al mes y quedarme tarde los miércoles.",
      sayItAskEn: "Say it in three moves: I understand… However… What I can do is…",
      sayItAskEs: "Dilo en tres movimientos: I understand… However… What I can do is…",
      sayItCheck: {
        target: "I understand *",
        altTargets: ["However *", "What I can do is *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s6",
    phrase: "I can disagree without saying no.",
    es: "Puedo estar en desacuerdo sin decir que no.",
  },
  habitCard: {
    afterScene: "s2",
    phrase: "When I disagree at work, I say: I understand, however, what I can do is.",
    es: "Cuando estoy en desacuerdo en el trabajo digo: entiendo, sin embargo, lo que puedo hacer es.",
    model: "vale",
    modelActionEs: "Vale negoció una hora entera sin decir \"no\" una sola vez.",
  },
  expressions: [
    {
      phrase: "give in",
      variants: ["gives in", "gave in", "giving in"],
      es: "ceder",
      kind: "phrasal",
      example: "She didn't give in on the only clause that protects the results you're buying.",
      exampleEs: "Ella no cedió en la única cláusula que protege los resultados que están comprando.",
    },
    {
      phrase: "put through",
      variants: ["put that through", "puts through", "putting through"],
      es: "tramitar, hacer pasar un acuerdo",
      kind: "phrasal",
      example: "I can put that through this week.",
      exampleEs: "Puedo tramitarlo esta semana.",
    },
    {
      phrase: "give away",
      variants: ["gave away", "gives away", "giving away"],
      es: "soltar o regalar algo en una negociación",
      kind: "idiom",
      example: "You gave away nine per cent and kept the thing that makes the method work.",
      exampleEs: "Regalaste nueve por ciento y te quedaste con lo que hace que el método funcione.",
    },
    {
      phrase: "tell apart from",
      variants: ["tell me apart from", "tells apart from", "told apart from"],
      es: "distinguir a alguien de otro",
      kind: "idiom",
      example: "The day I sell you a class of twenty-five, you stop being able to tell me apart from Crown.",
      exampleEs: "El día que les venda un grupo de veinticinco, dejan de poder distinguirme de Crown.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: disagree with a request at work using I understand, however, what I can do is.",
    es: "Treinta segundos: discrepa con una petición del trabajo usando I understand, however, what I can do is.",
  },
  continueWith: [
    "I understand that ...",
    "However, ...",
    "What I can do is ...",
  ],
  cliffhanger: {
    en: "On Friday Vale faces a hostile panel, and Crown presents in the same room right after her.",
    es: "El viernes Vale enfrenta un panel hostil, y Crown presenta en la misma sala justo después de ella.",
  },
};
