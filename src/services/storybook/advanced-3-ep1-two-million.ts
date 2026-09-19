import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced3-ep1-two-million/cover.jpg";
import s1 from "@/assets/storybook/advanced3-ep1-two-million/s1.jpg";
import s2 from "@/assets/storybook/advanced3-ep1-two-million/s2.jpg";
import s3 from "@/assets/storybook/advanced3-ep1-two-million/s3.jpg";
import s4 from "@/assets/storybook/advanced3-ep1-two-million/s4.jpg";
import s5 from "@/assets/storybook/advanced3-ep1-two-million/s5.jpg";
import s6 from "@/assets/storybook/advanced3-ep1-two-million/s6.jpg";
import s7 from "@/assets/storybook/advanced3-ep1-two-million/s7.jpg";
import s8 from "@/assets/storybook/advanced3-ep1-two-million/s8.jpg";
import s9 from "@/assets/storybook/advanced3-ep1-two-million/s9.jpg";

export const ADVANCED3_EP1_TWO_MILLION: StorybookEpisode = {
  id: "advanced3-ep1-two-million",
  moduleId: "advanced-3",
  week: 1,
  title: "Two million",
  titleEs: "Dos millones",
  episodeLabel: {
    en: "Advanced 3 · Episode 1",
    es: "Advanced 3 · Episodio 1",
  },
  previously: [
    {
      en: "Day ninety: seventeen of twenty passed. Óscar didn't. Dani didn't take the call for him.",
      es: "Día noventa: diecisiete de veinte pasaron. Óscar no. Dani no tomó la llamada por él.",
    },
    {
      en: "Mía posted forty seconds of Dani in Barrett's office saying the kid did the right thing.",
      es: "Mía publicó cuarenta segundos de Dani en la oficina de Barrett diciendo que el muchacho hizo lo correcto.",
    },
    {
      en: "By Monday it has two million views, and Northline's legal team wants a word.",
      es: "Para el lunes tiene dos millones de vistas, y el equipo legal de Northline quiere hablar.",
    },
  ],
  reviewWords: [
    { word: "views", es: "vistas" },
    { word: "legal", es: "legal" },
    { word: "meme", es: "meme" },
    { word: "statement", es: "declaración" },
    { word: "caption", es: "pie de foto, leyenda" },
  ],
  blurb: {
    en: "Monday. Dani finds out he's famous because his mother sends him the video with 'is this you'. Northline's legal team gives him eleven minutes to explain what happened, in order. He does, without naming Mía, and tells a lawyer 'that's how I work'. Then Vale asks the only question nobody has a script for.",
    es: "Lunes. Dani descubre que es famoso porque su mamá le manda el video con '¿este eres tú?'. El equipo legal de Northline le da once minutos para explicar qué pasó, en orden. Lo hace, sin nombrar a Mía, y le dice a un abogado 'así trabajo yo'. Después Vale hace la única pregunta para la que nadie tiene guion.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Monday, 6:40 a.m.; the bus stop outside the Northline building; Dani alone on the bench with his phone to his ear, the screen showing a paused video of himself and a number: 2,014,388. Only Dani is drawn; the caller is a voice on the phone.",
      text: "Monday, 6:40 a.m. His mother calls before the bus.",
      es: "Lunes, 6:40 a.m. Su mamá llama antes del bus.",
      speaker: "dani",
      lines: [
        {
          speaker: "estela",
          text: "Mijo. Your aunt sent me a video. Is this you? It says two million.",
          es: "Mijo. Tu tía me mandó un video. ¿Este eres tú? Dice dos millones.",
        },
        {
          speaker: "dani",
          text: "Two million what?",
          es: "¿Dos millones de qué?",
        },
        {
          speaker: "estela",
          text: "People, mijo. Two million people watched you say a boy did the right thing. Did you eat?",
          es: "Personas, mijo. Dos millones de personas te vieron decir que un muchacho hizo lo correcto. ¿Comiste?",
        },
      ],
      words: [
        { word: "aunt", es: "tía" },
        { word: "million", es: "millón" },
        { word: "watched", es: "vieron" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "The Northline floor at 8:00; Mía at her desk with her phone face down, Nico beside her with his hood up, Dani standing in front of both with his own phone in his hand, the paused video visible.",
      text: "8:00 a.m. The floor already knows.",
      es: "8:00 a.m. El piso ya sabe.",
      speaker: "mia",
      cast: ["mia", "nico", "dani"],
      lines: [
        {
          speaker: "mia",
          text: "You're a meme, jefe.",
          es: "Eres un meme, jefe.",
        },
        {
          speaker: "dani",
          text: "I'm a what.",
          es: "Soy un qué.",
        },
        {
          speaker: "nico",
          text: "A meme. 'The kid did the right thing.' That's the caption. I'm the kid. I didn't agree to that.",
          es: "Un meme. 'El muchacho hizo lo correcto'. Ese es el pie. Yo soy el muchacho. Yo no acepté eso.",
        },
        {
          speaker: "dani",
          text: "Who posted it? In front of the whole row, Mía. Who?",
          es: "¿Quién lo publicó? Frente a toda la fila, Mía. ¿Quién?",
        },
        {
          speaker: "mia",
          text: "Not the floor one. The office one. No screens. And I'll answer that in the break room, not here.",
          es: "No el del piso. El de la oficina. Sin pantallas. Y eso lo contesto en la sala de descanso, no aquí.",
        },
      ],
      words: [
        { word: "meme", es: "meme" },
        { word: "caption", es: "pie de foto" },
        { word: "posted", es: "publicó" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "9:00 a.m.; the glass meeting room; on the laptop screen, Mr. Reed in a dark navy suit with a Northline legal banner behind him; Dani alone at the table, hands flat.",
      text: "9:00 a.m. Legal. Eleven minutes.",
      es: "9:00 a.m. Legal. Once minutos.",
      speaker: "reed",
      cast: ["reed", "dani"],
      lines: [
        {
          speaker: "reed",
          text: "Mr. Dani. I have eleven minutes. Explain to me what happened. From the beginning, in order.",
          es: "Señor Dani. Tengo once minutos. Explíqueme qué pasó. Desde el principio, en orden.",
        },
        {
          speaker: "dani",
          text: "It was a normal Monday morning, a week ago. At 10:44 an agent ended a call with an abusive customer, after two warnings. What happened was that Ms.",
          es: "Era un lunes normal por la mañana, hace una semana. A las 10:44 un agente terminó una llamada con un cliente abusivo, después de dos advertencias. Lo que pasó fue que Ms.",
        },
        {
          speaker: "dani",
          text: "Barrett asked me for the incident report in her office, and I gave it: facts in one paragraph, my opinion in another, marked as opinion.",
          es: "Barrett me pidió el reporte del incidente en su oficina, y lo di: hechos en un párrafo, mi opinión en otro, marcada como opinión.",
        },
        {
          speaker: "reed",
          text: "And the video.",
          es: "Y el video.",
        },
        {
          speaker: "dani",
          text: "At first I didn't know it existed. I found out this morning at 6:40, when my mother sent it to me with the words 'is this you'.",
          es: "Al principio no sabía que existía. Me enteré esta mañana a las 6:40, cuando mi mamá me lo mandó con las palabras '¿este eres tú?'.",
        },
        {
          speaker: "dani",
          text: "In the end, it shows a Northline manager saying an agent did the right thing. That's the only sentence in it.",
          es: "Al final, muestra a un gerente de Northline diciendo que un agente hizo lo correcto. Esa es la única frase que tiene.",
        },
      ],
      words: [
        { word: "abusive", es: "abusivo" },
        { word: "existed", es: "existía" },
        { word: "manager", es: "gerente" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Close on the laptop: Mr. Reed leaning toward his camera, pen raised; Dani's reflection in the glass wall behind the screen.",
      text: "Then the question legal actually came for.",
      es: "Luego la pregunta por la que legal vino en realidad.",
      speaker: "reed",
      cast: ["reed", "dani"],
      lines: [
        {
          speaker: "reed",
          text: "Who filmed it?",
          es: "¿Quién lo grabó?",
        },
        {
          speaker: "dani",
          text: "An agent, through the glass, from outside the office. No customer screens are in it.",
          es: "Una agente, a través del vidrio, desde afuera de la oficina. No hay pantallas de clientes.",
        },
        {
          speaker: "dani",
          text: "I'm not going to say her name until I've talked to her, and I'll give it to you in writing today.",
          es: "No voy a decir su nombre hasta que haya hablado con ella, y se lo doy por escrito hoy.",
        },
        {
          speaker: "reed",
          text: "That is not how legal works, Mr. Dani.",
          es: "Así no funciona legal, señor Dani.",
        },
        {
          speaker: "dani",
          text: "It's how I work. You'll have the name by five.",
          es: "Así trabajo yo. Tendrá el nombre a las cinco.",
        },
        {
          speaker: "reed",
          text: "Legal will look into who filmed it, with or without you. And on Friday you read a statement. Ours.",
          es: "Legal va a investigar quién lo grabó, con usted o sin usted. Y el viernes lee una declaración. La nuestra.",
        },
      ],
      words: [
        { word: "filmed", es: "grabó" },
        { word: "writing", es: "escrito" },
        { word: "statement", es: "declaración" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Ms. Barrett's office; Barrett behind her desk with her laptop turned toward Dani, an inbox with hundreds of unread messages; Dani standing.",
      text: "9:15 a.m. Barrett was on the call, muted.",
      es: "9:15 a.m. Barrett estaba en la llamada, en silencio.",
      speaker: "barrett",
      cast: ["barrett", "dani"],
      lines: [
        {
          speaker: "barrett",
          text: "You told a lawyer 'it's how I work'. Reed wrote it down. That's going to cost you something later. Not today.",
          es: "Le dijo a un abogado 'así trabajo yo'. Reed lo anotó. Eso le va a costar algo después. Hoy no.",
        },
        {
          speaker: "dani",
          text: "I know.",
          es: "Lo sé.",
        },
        {
          speaker: "barrett",
          text: "Also: three hundred and twelve messages since seven. Bogotá, Monterrey, here. Agents. They want to know if the kid is real. Some want to know if you are.",
          es: "Además: trescientos doce mensajes desde las siete. Bogotá, Monterrey, aquí. Agentes. Quieren saber si el muchacho es real. Algunos quieren saber si usted lo es.",
        },
        {
          speaker: "dani",
          text: "What do I answer?",
          es: "¿Qué contesto?",
        },
        {
          speaker: "barrett",
          text: "Nothing yet. For once, the thing is not to say anything until you know what you want to say.",
          es: "Nada todavía. Por una vez, la cosa es no decir nada hasta que sepa qué quiere decir.",
        },
      ],
      words: [
        { word: "lawyer", es: "abogado" },
        { word: "messages", es: "mensajes" },
        { word: "real", es: "real" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Break room; Mía on the counter, arms not crossed for once; Dani standing at the right distance, coffee untouched on the table between them.",
      text: "12:30 p.m. Break room. He owes her one thing first.",
      es: "12:30 p.m. Sala de descanso. Primero le debe una cosa.",
      speaker: "dani",
      cast: ["dani", "mia"],
      lines: [
        {
          speaker: "dani",
          text: "This morning I asked 'who posted it' in front of the whole row. That was wrong. Once.",
          es: "Esta mañana pregunté 'quién lo publicó' frente a toda la fila. Eso estuvo mal. Una vez.",
        },
        {
          speaker: "mia",
          text: "Once. Okay. I posted it. Because nobody outside this floor knows this is what a jefe sounds like. I didn't think about two million. I thought about forty followers and a plant.",
          es: "Una vez. Ok. Yo lo publiqué. Porque nadie fuera de este piso sabe que así suena un jefe. No pensé en dos millones. Pensé en cuarenta seguidores y una planta.",
        },
        {
          speaker: "dani",
          text: "Legal wants your name by five. I told them I'd talk to you first. This is me talking to you first.",
          es: "Legal quiere tu nombre a las cinco. Les dije que hablaría contigo primero. Esto es hablar contigo primero.",
        },
        {
          speaker: "mia",
          text: "Give it to them. I'm not hiding. Mondays I'm at the university; the rest of the week I'm right here.",
          es: "Dáselos. No me estoy escondiendo. Los lunes estoy en la universidad; el resto de la semana estoy aquí mismo.",
        },
      ],
      words: [
        { word: "owes", es: "debe" },
        { word: "followers", es: "seguidores" },
        { word: "hiding", es: "escondiendo" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Camila at the end of the row with her tablet showing a follower count, 61,204, next to a photo of a plant; Nico holding up his phone with a picture of Bogotá agents in matching T-shirts; Mía laughing.",
      text: "3:00 p.m. Camila has numbers. Nico has a problem.",
      es: "3:00 p.m. Camila tiene números. Nico tiene un problema.",
      speaker: "camila",
      cast: ["camila", "nico", "mia"],
      lines: [
        {
          speaker: "camila",
          text: "Northline's account: forty followers on Friday, sixty-one thousand today. The plant is famous. Applications to the academy are up four hundred percent.",
          es: "La cuenta de Northline: cuarenta seguidores el viernes, sesenta y un mil hoy. La planta es famosa. Las solicitudes a la academia subieron cuatrocientos por ciento.",
        },
        {
          speaker: "nico",
          text: "Bogotá made T-shirts. They say THE KID. Julieta sent fifteen photos. I'm not the kid.",
          es: "Bogotá hizo camisetas. Dicen THE KID. Julieta mandó quince fotos. Yo no soy el muchacho.",
        },
        {
          speaker: "mia",
          text: "You're the kid.",
          es: "Eres el muchacho.",
        },
        {
          speaker: "nico",
          text: "If anything, I'm the agent. The kid is the caption.",
          es: "En todo caso, soy el agente. El muchacho es el pie de foto.",
        },
      ],
      words: [
        { word: "applications", es: "solicitudes" },
        { word: "famous", es: "famosa" },
        { word: "shirts", es: "camisetas" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Barrett handing Dani a single printed page with the Northline legal header and the word STATEMENT; Dani reading it without taking it from her hand.",
      text: "5:00 p.m. The name went to legal at 4:58. Legal sends something back.",
      es: "5:00 p.m. El nombre llegó a legal a las 4:58. Legal manda algo de vuelta.",
      speaker: "barrett",
      cast: ["barrett", "dani"],
      lines: [
        {
          speaker: "barrett",
          text: "Friday, four p.m. A livestream, three countries. You open with this. Approved by legal.",
          es: "Viernes, cuatro p.m. Un en vivo, tres países. Usted abre con esto. Aprobado por legal.",
        },
        {
          speaker: "dani",
          text: "A script.",
          es: "Un guion.",
        },
        {
          speaker: "barrett",
          text: "A statement.",
          es: "Una declaración.",
        },
        {
          speaker: "dani",
          text: "Then it isn't mine.",
          es: "Entonces no es mía.",
        },
        {
          speaker: "barrett",
          text: "Nothing you say this month is only yours. That's the room you're in now. Read it. Then decide how much of it you say.",
          es: "Nada de lo que diga este mes es solo suyo. Esa es la sala en la que está ahora. Léalo. Después decida cuánto de eso dice.",
        },
      ],
      words: [
        { word: "livestream", es: "en vivo" },
        { word: "approved", es: "aprobado" },
        { word: "decide", es: "decidir" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Night; Vale's small car parked outside the Northline building; Vale at the wheel, Dani in the passenger seat with the printed statement folded on his knee, neither of them looking at it.",
      text: "9:15 p.m. Vale doesn't ask about legal.",
      es: "9:15 p.m. Vale no pregunta por legal.",
      speaker: "vale",
      cast: ["vale", "dani"],
      lines: [
        {
          speaker: "vale",
          text: "Two million people, a lawyer, three hundred agents and a piece of paper. Everybody asked you something today. I'm asking the one nobody did. What do you want, Dani?",
          es: "Dos millones de personas, un abogado, trescientos agentes y una hoja de papel. Todos te preguntaron algo hoy. Yo te pregunto lo que nadie preguntó. ¿Qué quieres, Dani?",
        },
        {
          speaker: "dani",
          text: "...I don't know yet.",
          es: "...Todavía no sé.",
        },
        {
          speaker: "vale",
          text: "That's the first honest sentence anyone said to you today. Looking back, nobody asked you that on day one either. Take the week.",
          es: "Esa es la primera frase honesta que alguien te dijo hoy. Mirando atrás, nadie te preguntó eso el día uno tampoco. Tómate la semana.",
        },
      ],
      words: [
        { word: "paper", es: "papel" },
        { word: "honest", es: "honesta" },
        { word: "week", es: "semana" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What does Dani refuse to do in the eleven minutes with legal?",
      questionEs: "¿Qué se niega a hacer Dani en los once minutos con legal?",
      options: [
        { label: "Say who filmed it before talking to her himself", emoji: "🤐" },
        { label: "Explain what happened in order", emoji: "📋" },
        { label: "Admit that the video is real", emoji: "🎥" },
      ],
      answer: 0,
      sayIt: "Say who filmed it before talking to her himself.",
      sayItEs: "Decir quién lo grabó antes de hablar con ella él mismo.",
      sayItCheck: {
        target: "* who filmed it *",
        altTargets: ["Say her name *", "Name the agent *", "Give the name before talking to her"],
      },
    },
    {
      id: "q2",
      afterScene: "s3",
      questionEn: "Something unexpected happened to you. Tell it in order: the normal setting, what happened, what you did first, how it ended.",
      questionEs: "Te pasó algo inesperado. Cuéntalo en orden: la situación normal, qué pasó, qué hiciste primero, cómo terminó.",
      options: [
        { label: "I am ready to answer", emoji: "🎧" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "It was a normal Monday morning. What happened was that my mother sent me a video of myself with two million views. At first I didn't know what to do. In the end, I explained it in order and it was fine.",
      sayItEs: "Era un lunes normal por la mañana. Lo que pasó fue que mi mamá me mandó un video mío con dos millones de vistas. Al principio no sabía qué hacer. Al final, lo expliqué en orden y estuvo bien.",
      sayItAskEn: "Start with \"It was a normal ...\", then \"What happened was ...\", then \"At first ...\", and close with \"In the end, ...\".",
      sayItAskEs: "Empieza con \"It was a normal …\", luego \"What happened was …\", después \"At first …\" y cierra con \"In the end, …\".",
      sayItCheck: {
        target: "It was a normal *",
        altTargets: ["What happened was *", "In the end *", "Then *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s5",
    phrase: "When everyone wants a sentence from me, I don't give one until I know what I want to say.",
    es: "Cuando todos quieren una frase mía, no doy ninguna hasta saber qué quiero decir.",
  },
  habitCard: {
    afterScene: "s6",
    phrase: "Before I give someone's name to anyone, I talk to that person first.",
    es: "Antes de darle el nombre de alguien a cualquiera, hablo primero con esa persona.",
    model: "dani",
    modelActionEs: "Dani le dijo a legal que tendrían el nombre a las cinco, habló con Mía a las 12:30, y lo mandó a las 4:58.",
  },
  expressions: [
    {
      phrase: "find out",
      variants: ["found out", "finds out", "finding out"],
      es: "enterarse, descubrir",
      kind: "phrasal",
      example: "I found out this morning at 6:40, when my mother sent it to me with the words 'is this you'.",
      exampleEs: "Me enteré esta mañana a las 6:40, cuando mi mamá me lo mandó con las palabras '¿este eres tú?'.",
    },
    {
      phrase: "look into",
      variants: ["looked into", "looking into", "looks into"],
      es: "investigar, revisar a fondo",
      kind: "phrasal",
      example: "Legal will look into who filmed it, with or without you.",
      exampleEs: "Legal va a investigar quién lo grabó, con usted o sin usted.",
    },
    {
      phrase: "in writing",
      variants: ["put it in writing", "get it in writing"],
      es: "por escrito",
      kind: "idiom",
      example: "I'm not going to say her name until I've talked to her, and I'll give it to you in writing today.",
      exampleEs: "No voy a decir su nombre hasta que haya hablado con ella, y se lo doy por escrito hoy.",
    },
    {
      phrase: "if anything",
      variants: ["if anything,"],
      es: "en todo caso, más bien",
      kind: "idiom",
      example: "If anything, I'm the agent. The kid is the caption.",
      exampleEs: "En todo caso, soy el agente. El muchacho es el pie de foto.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: something you didn't plan happened this month. The normal setting, what happened, what you did first, how it ended, and one thing you learned looking back.",
    es: "Treinta segundos: este mes pasó algo que no planeaste. La situación normal, qué pasó, qué hiciste primero, cómo terminó, y una cosa que aprendiste mirando atrás.",
  },
  continueWith: [
    "It was a normal ... and I was ...",
    "What happened was that ...",
    "At first I didn't know what to do, so ...",
    "In the end, ... Looking back, ...",
  ],
  cliffhanger: {
    en: "Tomorrow a journalist asks Dani to describe the floor, live, in one minute. He describes Nico. Nico is listening.",
    es: "Mañana una periodista le pide a Dani que describa el piso, en vivo, en un minuto. Describe a Nico. Nico está escuchando.",
  },
};
