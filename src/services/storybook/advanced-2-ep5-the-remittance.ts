import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced2-ep5-the-remittance/cover.jpg";
import s1 from "@/assets/storybook/advanced2-ep5-the-remittance/s1.jpg";
import s2 from "@/assets/storybook/advanced2-ep5-the-remittance/s2.jpg";
import s3 from "@/assets/storybook/advanced2-ep5-the-remittance/s3.jpg";
import s4 from "@/assets/storybook/advanced2-ep5-the-remittance/s4.jpg";
import s5 from "@/assets/storybook/advanced2-ep5-the-remittance/s5.jpg";
import s6 from "@/assets/storybook/advanced2-ep5-the-remittance/s6.jpg";
import s7 from "@/assets/storybook/advanced2-ep5-the-remittance/s7.jpg";
import s8 from "@/assets/storybook/advanced2-ep5-the-remittance/s8.jpg";
import s9 from "@/assets/storybook/advanced2-ep5-the-remittance/s9.jpg";

export const ADVANCED2_EP5_THE_REMITTANCE: StorybookEpisode = {
  id: "advanced2-ep5-the-remittance",
  moduleId: "advanced-2",
  week: 1,
  title: "The remittance",
  titleEs: "La remesa",
  episodeLabel: {
    en: "Advanced 2 · Episode 5",
    es: "Advanced 2 · Episodio 5",
  },
  previously: [
    {
      en: "Julieta found twelve hundred dollars on Northline's own bill.",
      es: "Julieta encontró mil doscientos dólares en la factura de Northline.",
    },
    {
      en: "Nico's mother sent money on Friday.",
      es: "La mamá de Nico mandó dinero el viernes.",
    },
    {
      en: "It still hasn't arrived.",
      es: "Todavía no llega.",
    },
  ],
  reviewWords: [
    { word: "transfer", es: "transferencia" },
    { word: "confirm", es: "confirmar" },
    { word: "charge", es: "cargo" },
    { word: "reference", es: "referencia" },
    { word: "priority", es: "prioridad" },
  ],
  blurb: {
    en: "The fintech account, Friday, and a woman in Houston whose money is somewhere between two banks. Nico takes the call, Dani sits next to him and says nothing, and the quietest agent on the floor turns out to be the best one.",
    es: "La cuenta de la fintech, viernes, y una señora en Houston cuyo dinero está en algún lugar entre dos bancos. Nico toma la llamada, Dani se sienta a la par y no dice nada, y el agente más callado del piso resulta ser el mejor.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Early Friday on the floor, the fintech account name on the wall screen; Dani pulling an empty chair next to Nico's desk.",
      text: "Friday, 7:40 a.m.",
      es: "Viernes, 7:40 a.m.",
      speaker: "dani",
      cast: ["dani", "nico", "mia"],
      lines: [
        {
          speaker: "dani",
          text: "I'm not taking it. You are. I'm just the chair.",
          es: "Yo no la tomo. La tomas tú. Yo solo soy la silla.",
        },
        {
          speaker: "nico",
          text: "And if it's her?",
          es: "¿Y si es ella?",
        },
        {
          speaker: "dani",
          text: "If your mother calls this line, you pass it to me. Any other mother, you take it.",
          es: "Si tu mamá llama a esta línea, me la pasas. Cualquier otra mamá, la tomas tú.",
        },
        {
          speaker: "nico",
          text: "Okay.",
          es: "Okay.",
        },
        {
          speaker: "mia",
          text: "He said okay. That's basically a speech from him.",
          es: "Dijo okay. Eso de él es prácticamente un discurso.",
        },
      ],
      words: [
        { word: "chair", es: "silla" },
        { word: "line", es: "línea" },
        { word: "mother", es: "mamá" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Nico with his headset on, hood down for once, both hands flat on the desk; the call timer starting at zero.",
      text: "8:06 a.m. The call.",
      es: "8:06 a.m. La llamada.",
      speaker: "nico",
      lines: [
        {
          speaker: "nico",
          text: "Thanks for calling. How can I help you today?",
          es: "Gracias por llamar. ¿En qué le puedo ayudar hoy?",
        },
        {
          speaker: "caller",
          text: "I sent money to my mother on Friday and it isn't there. She needs it for her medicine and I've called three times.",
          es: "Mandé dinero a mi mamá el viernes y no está. Lo necesita para su medicina y ya llamé tres veces.",
        },
        {
          speaker: "nico",
          text: "I understand. Money is important, and I'll help you with this.",
          es: "Entiendo. El dinero es importante, y le voy a ayudar con esto.",
        },
        {
          speaker: "caller",
          text: "The last person said the same sentence.",
          es: "La última persona dijo la misma frase.",
        },
        {
          speaker: "nico",
          text: "Then let me do the part they didn't. Do you have your reference number?",
          es: "Entonces déjeme hacer la parte que no hicieron. ¿Tiene su número de referencia?",
        },
      ],
      words: [
        { word: "medicine", es: "medicina" },
        { word: "important", es: "importante" },
        { word: "reference", es: "referencia" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Close on Nico's screen: a transfer record with a timestamp; his finger following the line; Dani beside him, hands in his lap, silent.",
      text: "Verify.",
      es: "Verificar.",
      speaker: "nico",
      lines: [
        {
          speaker: "nico",
          text: "Let me verify that for you with your reference number. One moment, please, I'm reading it now.",
          es: "Déjeme verificar eso con su número de referencia. Un momento, por favor, lo estoy leyendo ahora.",
        },
        {
          speaker: "nico",
          text: "I can see the transfer here, and it was sent Friday afternoon at four twenty.",
          es: "Puedo ver la transferencia aquí, y se envió el viernes por la tarde a las cuatro veinte.",
        },
        {
          speaker: "caller",
          text: "So where is it?",
          es: "¿Y dónde está?",
        },
        {
          speaker: "nico",
          text: "In this case, the bank on the other side is still processing it. That's normal for a weekend, and I know normal doesn't help your mother today.",
          es: "En este caso, el banco del otro lado todavía lo está procesando. Eso es normal en fin de semana, y sé que normal no le ayuda a su mamá hoy.",
        },
      ],
      words: [
        { word: "verify", es: "verificar" },
        { word: "transfer", es: "transferencia" },
        { word: "processing", es: "procesando" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Nico typing a priority note; Mía standing behind with two coffees, not interrupting.",
      text: "Solve.",
      es: "Resolver.",
      speaker: "nico",
      lines: [
        {
          speaker: "nico",
          text: "What I can do is put a priority note on your transfer today, and I'm doing it while we're on the line.",
          es: "Lo que puedo hacer es poner una nota de prioridad en su transferencia hoy, y la estoy poniendo mientras hablamos.",
        },
        {
          speaker: "caller",
          text: "Does that actually do anything or is that what you say?",
          es: "¿Eso de verdad sirve de algo o es lo que se dice?",
        },
        {
          speaker: "nico",
          text: "It moves you to the morning batch instead of the evening one. It's not magic. It's about six hours.",
          es: "La pasa al lote de la mañana en vez del de la tarde. No es magia. Son unas seis horas.",
        },
        {
          speaker: "caller",
          text: "Six hours is something.",
          es: "Seis horas es algo.",
        },
      ],
      words: [
        { word: "priority", es: "prioridad" },
        { word: "batch", es: "lote" },
        { word: "magic", es: "magia" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Close on the call timer at eleven minutes; Nico still on the line, listening, not speaking.",
      text: "He stays on the line.",
      es: "Se queda en la línea.",
      speaker: "nico",
      lines: [
        {
          speaker: "caller",
          text: "She's seventy-eight. She won't ask the neighbor for money, she'd rather not take the pills.",
          es: "Tiene setenta y ocho. No le va a pedir dinero a la vecina, prefiere no tomarse las pastillas.",
        },
        {
          speaker: "nico",
          text: "My mother is the same.",
          es: "Mi mamá es igual.",
        },
        {
          speaker: "caller",
          text: "You're not supposed to say that on a call, are you.",
          es: "No se supone que diga eso en una llamada, ¿verdad?",
        },
        {
          speaker: "nico",
          text: "Probably not. Here's exactly what happens next: you'll get a text when the money is available, and if it isn't there by Monday, you call and ask for me, and I open an investigation.",
          es: "Probablemente no. Esto es exactamente lo que sigue: va a recibir un mensaje cuando el dinero esté disponible, y si el lunes no está, llama y pregunta por mí, y abro una investigación.",
        },
      ],
      words: [
        { word: "pills", es: "pastillas" },
        { word: "available", es: "disponible" },
        { word: "investigation", es: "investigación" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "The call ended; Nico pulling his hood back up; Dani still sitting in the chair beside him, saying nothing.",
      text: "Thirteen minutes.",
      es: "Trece minutos.",
      speaker: "mia",
      cast: ["mia", "nico", "dani"],
      lines: [
        {
          speaker: "mia",
          text: "Thirteen minutes. The account target is six.",
          es: "Trece minutos. La meta de la cuenta es seis.",
        },
        {
          speaker: "dani",
          text: "I know what the target is.",
          es: "Sé cuál es la meta.",
        },
        {
          speaker: "mia",
          text: "I'm not complaining, jefe. I'm asking if you're going to defend it when somebody in Miami reads the report.",
          es: "No me estoy quejando, jefe. Pregunto si lo vas a defender cuando alguien en Miami lea el reporte.",
        },
        {
          speaker: "dani",
          text: "Yes.",
          es: "Sí.",
        },
        {
          speaker: "nico",
          text: "You didn't say anything the whole call.",
          es: "No dijiste nada en toda la llamada.",
        },
        {
          speaker: "dani",
          text: "You didn't need me to. That's the whole point of the chair.",
          es: "No me necesitabas. Ese es todo el punto de la silla.",
        },
      ],
      words: [
        { word: "target", es: "meta" },
        { word: "complaining", es: "quejando" },
        { word: "report", es: "reporte" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Julieta on the laptop screen at the end of the row, headset on, a scoring sheet open beside her face.",
      text: "Bogotá scored it.",
      es: "Bogotá la calificó.",
      speaker: "julieta",
      cast: ["julieta", "dani", "nico", "mia"],
      lines: [
        {
          speaker: "julieta",
          text: "I scored the eight-oh-six call. Thirteen minutes, and it's the best call on this account this month.",
          es: "Califiqué la llamada de las ocho cero seis. Trece minutos, y es la mejor llamada de esta cuenta este mes.",
        },
        {
          speaker: "dani",
          text: "Say that to him, not to me.",
          es: "Díselo a él, no a mí.",
        },
        {
          speaker: "julieta",
          text: "Nico. You verified before you explained, and you never promised a day you couldn't control. Keep the thirteen minutes.",
          es: "Nico. Verificaste antes de explicar, y nunca prometiste un día que no podías controlar. Quédate con los trece minutos.",
        },
        {
          speaker: "nico",
          text: "Okay.",
          es: "Okay.",
        },
        {
          speaker: "mia",
          text: "He's smiling. Nobody move.",
          es: "Está sonriendo. Que nadie se mueva.",
        },
      ],
      words: [
        { word: "scored", es: "califiqué" },
        { word: "promised", es: "prometiste" },
        { word: "smiling", es: "sonriendo" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Friday evening, Dani printing a single sheet with twenty rows of numbers; agents picking up their own row at the printer.",
      text: "6:00 p.m. Friday numbers.",
      es: "6:00 p.m. Números del viernes.",
      speaker: "dani",
      cast: ["dani", "oscar", "mia"],
      lines: [
        {
          speaker: "dani",
          text: "Week one. Everyone gets their own row, nobody gets anybody else's.",
          es: "Semana uno. Cada quien recibe su fila, nadie recibe la de otro.",
        },
        {
          speaker: "oscar",
          text: "Mine says four minutes.",
          es: "La mía dice cuatro minutos.",
        },
        {
          speaker: "dani",
          text: "Four in week one. The audit is in twelve weeks, and you know your number on a Friday instead of in March.",
          es: "Cuatro en la semana uno. La auditoría es en doce semanas, y sabes tu número un viernes en vez de en marzo.",
        },
        {
          speaker: "mia",
          text: "Mine says fourteen and I want that framed.",
          es: "La mía dice catorce y quiero eso enmarcado.",
        },
      ],
      words: [
        { word: "row", es: "fila" },
        { word: "week", es: "semana" },
        { word: "framed", es: "enmarcado" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Night, the street outside the Northline building; Nico looking at his phone with a bank message on it; Dani waiting at the bus stop a few steps away.",
      text: "9:15 p.m.",
      es: "9:15 p.m.",
      speaker: "nico",
      cast: ["nico", "dani"],
      lines: [
        {
          speaker: "nico",
          text: "It came in. Hers, I mean. My mom's.",
          es: "Llegó. La de ella, digo. La de mi mamá.",
        },
        {
          speaker: "dani",
          text: "Morning batch?",
          es: "¿Lote de la mañana?",
        },
        {
          speaker: "nico",
          text: "Somebody put a priority note on it on Wednesday. It wasn't me. I checked.",
          es: "Alguien le puso una nota de prioridad el miércoles. No fui yo. Revisé.",
        },
        {
          speaker: "dani",
          text: "Then somebody on this floor did their job. See you Monday.",
          es: "Entonces alguien en este piso hizo su trabajo. Nos vemos el lunes.",
        },
      ],
      words: [
        { word: "came", es: "llegó" },
        { word: "checked", es: "revisé" },
        { word: "Monday", es: "lunes" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What does the priority note actually do?",
      questionEs: "¿Qué hace realmente la nota de prioridad?",
      options: [
        { label: "It moves the transfer to the morning batch, about six hours earlier", emoji: "⏱️" },
        { label: "It sends the money immediately", emoji: "⚡" },
        { label: "It cancels the transfer and starts again", emoji: "↩️" },
      ],
      answer: 0,
      sayIt: "It moves the transfer to the morning batch, about six hours earlier.",
      sayItEs: "Pasa la transferencia al lote de la mañana, unas seis horas antes.",
      sayItCheck: {
        target: "It moves the transfer to the morning batch",
        altTargets: ["The morning batch", "About six hours earlier"],
      },
    },
    {
      id: "q2",
      afterScene: "s5",
      questionEn: "Someone is worried about their money. Verify first, explain what you see, and say exactly what happens next.",
      questionEs: "Alguien está preocupado por su dinero. Verifica primero, explica lo que ves y di exactamente qué pasa después.",
      options: [
        { label: "I am ready to answer", emoji: "🎧" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "Let me verify that for you with your reference number. I can see the transfer here, and here's exactly what happens next: you'll get a text when the money is available.",
      sayItEs: "Déjeme verificar eso con su número de referencia. Puedo ver la transferencia aquí, y esto es exactamente lo que sigue: va a recibir un mensaje cuando el dinero esté disponible.",
      sayItAskEn: "Start with \"Let me verify that for you ...\" and close with \"Here's exactly what happens next: ...\".",
      sayItAskEs: "Empieza con \"Let me verify that for you …\" y cierra con \"Here's exactly what happens next: …\".",
      sayItCheck: {
        target: "Let me verify that for you *",
        altTargets: ["Here's exactly what happens next *", "I can see the transfer", "Let me verify *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s3",
    phrase: "I check before I explain, and I explain before I promise.",
    es: "Reviso antes de explicar, y explico antes de prometer.",
  },
  habitCard: {
    afterScene: "s6",
    phrase: "When someone on my team is handling it, I stay in the chair and keep quiet.",
    es: "Cuando alguien de mi equipo lo está manejando, me quedo en la silla y me callo.",
    model: "dani",
    modelActionEs: "Dani se sentó trece minutos al lado de Nico sin decir una palabra y después defendió el tiempo de la llamada.",
  },
  expressions: [
    {
      phrase: "come in",
      variants: ["came in", "comes in", "coming in"],
      es: "entrar, llegar (dinero)",
      kind: "phrasal",
      example: "It came in. Hers, I mean.",
      exampleEs: "Llegó. La de ella, digo.",
    },
    {
      phrase: "hold on",
      variants: ["hold on a moment", "holding on"],
      es: "esperar en la línea",
      kind: "phrasal",
      example: "One moment, please, I'm reading it now.",
      exampleEs: "Un momento, por favor, lo estoy leyendo ahora.",
    },
    {
      phrase: "it's not magic",
      variants: ["It's not magic"],
      es: "no es magia",
      kind: "idiom",
      example: "It's not magic. It's about six hours.",
      exampleEs: "No es magia. Son unas seis horas.",
    },
    {
      phrase: "do your job",
      variants: ["did their job", "does his job"],
      es: "hacer su trabajo",
      kind: "idiom",
      example: "Then somebody on this floor did their job.",
      exampleEs: "Entonces alguien en este piso hizo su trabajo.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: someone is worried about money that hasn't arrived. Verify, explain what you can see, and say exactly what happens next.",
    es: "Treinta segundos: alguien está preocupado por dinero que no ha llegado. Verifica, explica lo que ves y di exactamente qué pasa después.",
  },
  continueWith: [
    "Let me verify that for you.",
    "I can see ...",
    "In this case, ...",
    "Here's exactly what happens next: ...",
  ],
  cliffhanger: {
    en: "Monday, in the parking lot: Keller from Crown is waiting for Mía, and she has an offer with her name on it.",
    es: "El lunes, en el estacionamiento: Keller, de Crown, está esperando a Mía, y trae una oferta con su nombre.",
  },
};
