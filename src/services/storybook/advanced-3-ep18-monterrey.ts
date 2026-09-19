import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced3-ep18-monterrey/cover.jpg";
import s1 from "@/assets/storybook/advanced3-ep18-monterrey/s1.jpg";
import s2 from "@/assets/storybook/advanced3-ep18-monterrey/s2.jpg";
import s3 from "@/assets/storybook/advanced3-ep18-monterrey/s3.jpg";
import s4 from "@/assets/storybook/advanced3-ep18-monterrey/s4.jpg";
import s5 from "@/assets/storybook/advanced3-ep18-monterrey/s5.jpg";
import s6 from "@/assets/storybook/advanced3-ep18-monterrey/s6.jpg";
import s7 from "@/assets/storybook/advanced3-ep18-monterrey/s7.jpg";
import s8 from "@/assets/storybook/advanced3-ep18-monterrey/s8.jpg";
import s9 from "@/assets/storybook/advanced3-ep18-monterrey/s9.jpg";

export const ADVANCED3_EP18_MONTERREY: StorybookEpisode = {
  id: "advanced3-ep18-monterrey",
  moduleId: "advanced-3",
  week: 4,
  title: "Monterrey",
  titleEs: "Monterrey",
  episodeLabel: {
    en: "Advanced 3 · Episode 18",
    es: "Advanced 3 · Episodio 18",
  },
  previously: [
    {
      en: "Two minutes in the chair. Four falls, six names, and the order he does it in.",
      es: "Dos minutos en la silla. Cuatro caídas, seis nombres, y el orden en que lo hace.",
    },
    {
      en: "Forty-one thousand people and nobody typing. One message: 'Comé.'",
      es: "Cuarenta y un mil personas y nadie escribiendo. Un mensaje: 'Comé'.",
    },
    {
      en: "Wednesday, nine a.m.: the hearing, the stool, and Tomás in Monterrey.",
      es: "Miércoles, nueve a.m.: la audiencia, el banco, y Tomás en Monterrey.",
    },
  ],
  reviewWords: [
    { word: "responsibility", es: "responsabilidad" },
    { word: "signature", es: "firma" },
    { word: "impact", es: "impacto" },
    { word: "condition", es: "condición" },
    { word: "passed", es: "aprobó" },
  ],
  blurb: {
    en: "Wednesday, 9:00 a.m. The hearing. Reed lifts the suspension on one condition: someone takes responsibility, in writing, for the Monterrey schedule that made Tomás fail on a Friday. Barrett offered. Reed wants Dani to define the word first. Dani doesn't bring a definition; he brings the schedule with his signature on it, and then he calls Tomás himself. The same afternoon, Óscar retakes the audit.",
    es: "Miércoles, 9:00 a.m. La audiencia. Reed levanta la suspensión con una condición: que alguien asuma la responsabilidad, por escrito, del horario de Monterrey que hizo que Tomás reprobara un viernes. Barrett se ofreció. Reed quiere que Dani defina la palabra primero. Dani no trae una definición; trae el horario con su firma, y luego llama a Tomás él mismo. Esa misma tarde, Óscar vuelve a tomar la auditoría.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Wednesday, 9:00 a.m.; the glass meeting room at Northline; Mr. Reed in his navy suit with the paper notebook; Barrett beside him; Camila with her tablet; Dani across from them with a single printed schedule; the stool from the training room placed at the end of the table, empty.",
      text: "Wednesday, 9:00 a.m. The hearing. Somebody brought the stool.",
      es: "Miércoles, 9:00 a.m. La audiencia. Alguien trajo el banco.",
      speaker: "reed",
      cast: ["reed", "barrett", "camila", "dani"],
      lines: [
        {
          speaker: "reed",
          text: "The file says the method works.",
          es: "El expediente dice que el método funciona.",
        },
        {
          speaker: "reed",
          text: "It also says an agent in Monterrey named Tomás failed his audit on a Friday, after his Thursday session was moved by a schedule signed in San Salvador.",
          es: "También dice que un agente en Monterrey llamado Tomás reprobó su auditoría un viernes, después de que su sesión del jueves fue movida por un horario firmado en San Salvador.",
        },
        {
          speaker: "reed",
          text: "Legal lifts the suspension if someone takes responsibility for that in writing. Ms. Barrett has offered. Before I accept, I'd like you to define the word. Not the dictionary. You.",
          es: "Legal levanta la suspensión si alguien asume la responsabilidad por escrito. Ms. Barrett se ofreció. Antes de aceptar, quiero que defina la palabra. No el diccionario. Usted.",
        },
        {
          speaker: "barrett",
          text: "I signed the budget that forced the move. I'm not being generous. I'm being accurate.",
          es: "Yo firmé el presupuesto que forzó el cambio. No estoy siendo generosa. Estoy siendo precisa.",
        },
      ],
      words: [
        { word: "hearing", es: "audiencia" },
        { word: "accept", es: "aceptar" },
        { word: "accurate", es: "precisa" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Close on Dani sliding the printed schedule across the table toward Reed; at the bottom of the page, his own signature and a date six weeks earlier; Reed's pen stopping.",
      text: "He doesn't bring a definition. He brings the page.",
      es: "No trae una definición. Trae la página.",
      speaker: "dani",
      cast: ["dani", "reed", "barrett"],
      lines: [
        {
          speaker: "dani",
          text: "To me, it means the thing with my name at the bottom is mine, whatever was above it.",
          es: "Para mí, significa que lo que tiene mi nombre al pie es mío, sin importar lo que hubiera arriba.",
        },
        {
          speaker: "dani",
          text: "Barrett gave me a number, Camila a budget, and I gave Monterrey a Friday without calling Monterrey. In practice, it starts with owning up out loud before someone finds the page.",
          es: "Barrett me dio un número, Camila un presupuesto, y yo le di a Monterrey un viernes sin llamar a Monterrey. En la práctica, empieza por asumirlo en voz alta antes de que alguien encuentre la página.",
        },
        {
          speaker: "dani",
          text: "The signature is mine.",
          es: "La firma es mía.",
        },
        {
          speaker: "reed",
          text: "Ms. Barrett just told me the budget forced it.",
          es: "Ms. Barrett acaba de decirme que el presupuesto lo forzó.",
        },
        {
          speaker: "dani",
          text: "The budget forced a decision. It didn't force me to make it without asking the room. That part has no number on it.",
          es: "El presupuesto forzó una decisión. No me forzó a tomarla sin preguntarle a la sala. Esa parte no tiene ningún número.",
        },
      ],
      words: [
        { word: "whatever", es: "sin importar" },
        { word: "practice", es: "práctica" },
        { word: "signature", es: "firma" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Camila's tablet showing the Monterrey calendar with Thursday crossed out and Friday circled; Camila's face tight; Dani looking at Reed, not at the tablet.",
      text: "A clear example. Why it matters. The impact.",
      es: "Un ejemplo claro. Por qué importa. El impacto.",
      speaker: "dani",
      cast: ["dani", "camila", "reed"],
      lines: [
        {
          speaker: "dani",
          text: "A clear example is this page. Nobody in Monterrey was watching when I signed it; that's exactly why it matters. Tomás doesn't have a clip. He has a Friday.",
          es: "Un ejemplo claro es esta página. Nadie en Monterrey estaba mirando cuando la firmé; exactamente por eso importa. Tomás no tiene un clip. Tiene un viernes.",
        },
        {
          speaker: "dani",
          text: "The impact is that a man who could have passed on a Thursday failed, and his name is in a legal file because of a line I moved to save four hundred dollars.",
          es: "El impacto es que un hombre que pudo haber pasado un jueves reprobó, y su nombre está en un expediente legal por una línea que moví para ahorrar cuatrocientos dólares.",
        },
        {
          speaker: "camila",
          text: "Three hundred and eighty.",
          es: "Trescientos ochenta.",
        },
        {
          speaker: "dani",
          text: "Three hundred and eighty. Thank you, Camila.",
          es: "Trescientos ochenta. Gracias, Camila.",
        },
      ],
      words: [
        { word: "exactly", es: "exactamente" },
        { word: "impact", es: "impacto" },
        { word: "save", es: "ahorrar" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Reed writing in his notebook, then closing it; Barrett looking at Dani with something close to approval; the stool still empty at the end of the table.",
      text: "9:25 a.m. Reed writes. Then the only question left.",
      es: "9:25 a.m. Reed escribe. Luego la única pregunta que queda.",
      speaker: "reed",
      cast: ["reed", "dani", "barrett"],
      lines: [
        {
          speaker: "reed",
          text: "Suspension lifted, effective two p.m., three countries, with one condition: the Monterrey schedule is Monterrey's from today. One more thing. Who calls Tomás?",
          es: "Suspensión levantada, efectiva a las dos p.m., tres países, con una condición: el horario de Monterrey es de Monterrey desde hoy. Una cosa más. ¿Quién llama a Tomás?",
        },
        {
          speaker: "barrett",
          text: "Human resources.",
          es: "Recursos humanos.",
        },
        {
          speaker: "dani",
          text: "I do. Today, before two. Not Barrett, not Camila, not a letter. If my name is at the bottom of the page, my voice is on the phone.",
          es: "Yo. Hoy, antes de las dos. No Barrett, no Camila, no una carta. Si mi nombre está al pie de la página, mi voz está en el teléfono.",
        },
        {
          speaker: "reed",
          text: "For the file: I froze in seven seconds on that stool. I'm not removing it.",
          es: "Para el expediente: me congelé en siete segundos en ese banco. No lo voy a quitar.",
        },
      ],
      words: [
        { word: "lifted", es: "levantada" },
        { word: "condition", es: "condición" },
        { word: "removing", es: "quitar" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "11:00 a.m.; Dani at his desk with the phone to his ear, the Monterrey schedule in front of him, a pen; Mía at the next desk with her headset on, not taking a call. Only Dani is drawn; Tomás is a voice on the phone.",
      text: "11:00 a.m. Tomás. Dani says it the way he'd want to hear it.",
      es: "11:00 a.m. Tomás. Dani lo dice como querría oírlo él.",
      speaker: "dani",
      cast: ["dani", "mia"],
      lines: [
        {
          speaker: "dani",
          text: "Tomás, this is Dani, from San Salvador. Six weeks ago I moved your Thursday to a Friday without asking you. You failed on that Friday. That's mine, not yours.",
          es: "Tomás, soy Dani, de San Salvador. Hace seis semanas moví tu jueves a un viernes sin preguntarte. Reprobaste ese viernes. Eso es mío, no tuyo.",
        },
        {
          speaker: "dani",
          text: "Your schedule is yours again from today. You retake it in two weeks, on a Thursday, and I'll be on the line the whole time, listening. That's not a favor.",
          es: "Tu horario es tuyo otra vez desde hoy. Lo volvés a tomar en dos semanas, un jueves, y voy a estar en la línea todo el tiempo, escuchando. No es un favor.",
        },
        {
          speaker: "dani",
          text: "It's what I owe you.",
          es: "Es lo que te debo.",
        },
        {
          speaker: "mia",
          text: "What did he say?",
          es: "¿Qué dijo?",
        },
        {
          speaker: "dani",
          text: "He said 'okay', then 'jefe'. Monterrey says jefe too.",
          es: "Dijo 'okay', y después 'jefe'. En Monterrey también dicen jefe.",
        },
      ],
      words: [
        { word: "retake", es: "volver a tomar" },
        { word: "favor", es: "favor" },
        { word: "owe", es: "deber" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "2:00 p.m.; the training room; Óscar alone at the tall table with a headset on, taking a real call, the wall screen reading REAL SHIFT, ALL ACCOUNTS; through the glass, Mía and Nico watching; Dani not in the room, only his back visible far down the corridor.",
      text: "2:00 p.m. Óscar retakes the audit. Dani isn't allowed in the room. He doesn't try.",
      es: "2:00 p.m. Óscar vuelve a tomar la auditoría. Dani no puede estar en la sala. No lo intenta.",
      speaker: "mia",
      cast: ["mia", "nico", "oscar"],
      lines: [
        {
          speaker: "mia",
          text: "Lidia's listening from Crown. Six ten last time. He's at three forty and hasn't frozen once.",
          es: "Lidia está escuchando desde Crown. Seis diez la vez pasada. Va en tres cuarenta y no se ha congelado ni una vez.",
        },
        {
          speaker: "nico",
          text: "He froze at two twenty. Four seconds. Then he said the wrong plan and fixed it in the next sentence.",
          es: "Se congeló en el dos veinte. Cuatro segundos. Luego dijo el plan equivocado y lo corrigió en la siguiente frase.",
        },
        {
          speaker: "mia",
          text: "That's not freezing. That's the method.",
          es: "Eso no es congelarse. Eso es el método.",
        },
      ],
      words: [
        { word: "listening", es: "escuchando" },
        { word: "frozen", es: "congelado" },
        { word: "fixed", es: "corrigió" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "The corridor; Óscar coming out of the training room with the headset in his hand and a scoring sheet, his face open; Dani halfway down the corridor, stopped; Mía and Nico behind Óscar.",
      text: "2:19 p.m. Four minutes fifty. Óscar comes out with the sheet.",
      es: "2:19 p.m. Cuatro minutos cincuenta. Óscar sale con la hoja.",
      speaker: "oscar",
      cast: ["oscar", "dani", "mia", "nico"],
      lines: [
        {
          speaker: "oscar",
          text: "Passed. Four fifty. She wrote one line at the bottom: 'He heard it and talked anyway.'",
          es: "Aprobé. Cuatro cincuenta. Escribió una línea al pie: 'La oyó y habló de todos modos'.",
        },
        {
          speaker: "dani",
          text: "Say it in your words. Not hers.",
          es: "Decilo con tus palabras. No con las de ella.",
        },
        {
          speaker: "oscar",
          text: "I heard the alarm. I talked anyway.",
          es: "Oí la alarma. Hablé de todos modos.",
        },
        {
          speaker: "nico",
          text: "Frame that one.",
          es: "Enmarcá esa.",
        },
      ],
      words: [
        { word: "passed", es: "aprobó" },
        { word: "bottom", es: "pie" },
        { word: "frame", es: "enmarcar" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Ms. Barrett's office, 4:00 p.m.; Barrett holding a printed email with one line highlighted; Dani standing; the plant; on the shelf behind her, the stool, brought back from the meeting room.",
      text: "4:00 p.m. The email that lifts it, and the note at the bottom.",
      es: "4:00 p.m. El correo que la levanta, y la nota al pie.",
      speaker: "barrett",
      cast: ["barrett", "dani"],
      lines: [
        {
          speaker: "barrett",
          text: "Lifted, three countries, two p.m., Monterrey condition signed. Thursday block is back tomorrow at ten. Reed's note at the bottom, for the record: 'Keep the stool.' Nobody sits on it.",
          es: "Levantada, tres países, dos p.m., condición de Monterrey firmada. El bloque del jueves vuelve mañana a las diez. La nota de Reed al pie, para que conste: 'Conserven el banco'. Nadie se sienta en él.",
        },
        {
          speaker: "dani",
          text: "And the Miami letter?",
          es: "¿Y la carta de Miami?",
        },
        {
          speaker: "barrett",
          text: "Friday, nine a.m. The last room. Reed's coming, and he's bringing Julieta, which he thinks is a surprise. Bring an answer this time. Not a list of conditions. Well. Maybe two.",
          es: "Viernes, nueve a.m. La última sala. Reed viene, y trae a Julieta, lo cual cree que es una sorpresa. Traiga una respuesta esta vez. No una lista de condiciones. Bueno. Quizá dos.",
        },
      ],
      words: [
        { word: "record", es: "acta" },
        { word: "surprise", es: "sorpresa" },
        { word: "conditions", es: "condiciones" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Night; the bus stop; Óscar and Dani on the bench, Óscar holding the scoring sheet flat on his knees so it won't fold; bus 42 arriving with the number lit.",
      text: "9:45 p.m. Óscar won't fold the sheet. He asks the question from the morning.",
      es: "9:45 p.m. Óscar no dobla la hoja. Hace la pregunta de la mañana.",
      speaker: "oscar",
      cast: ["oscar", "dani"],
      lines: [
        {
          speaker: "oscar",
          text: "Mía said Reed asked you what responsibility means. What did you say?",
          es: "Mía dijo que Reed te preguntó qué significa responsabilidad. ¿Qué dijiste?",
        },
        {
          speaker: "dani",
          text: "That the page with my name on it is mine. And that Tomás gets his Thursday back.",
          es: "Que la página con mi nombre es mía. Y que Tomás recupera su jueves.",
        },
        {
          speaker: "oscar",
          text: "Who's Tomás?",
          es: "¿Quién es Tomás?",
        },
        {
          speaker: "dani",
          text: "You, in Monterrey. He retakes it in two weeks, and I'm going to tell him what you said today. Get on the bus. Don't fold that.",
          es: "Vos, en Monterrey. La vuelve a tomar en dos semanas, y le voy a contar lo que dijiste hoy. Subite al bus. No doblés eso.",
        },
      ],
      words: [
        { word: "fold", es: "doblar" },
        { word: "mine", es: "mía" },
        { word: "weeks", es: "semanas" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What does responsibility mean to Dani?",
      questionEs: "¿Qué significa la responsabilidad para Dani?",
      options: [
        { label: "The page with his name at the bottom is his, whatever was above it", emoji: "✍️" },
        { label: "Never making a mistake", emoji: "🚫" },
        { label: "Letting the manager sign for him", emoji: "📋" },
      ],
      answer: 0,
      sayIt: "To me, it means the page with my name at the bottom is mine. A clear example is the Monterrey schedule. The impact is that a man failed on a Friday.",
      sayItEs: "Para mí, significa que la página con mi nombre al pie es mía. Un ejemplo claro es el horario de Monterrey. El impacto es que un hombre reprobó un viernes.",
      sayItCheck: {
        target: "To me, it means *",
        altTargets: ["It means *", "A clear example is *", "The impact is *"],
      },
    },
    {
      id: "q2",
      afterScene: "s5",
      questionEn: "What does being responsible at work mean to you? Define it, say what it looks like in practice, give a clear example, and say why it matters when nobody is watching.",
      questionEs: "¿Qué significa para ti ser responsable en el trabajo? Defínelo, di cómo se ve en la práctica, da un ejemplo claro, y di por qué importa cuando nadie está mirando.",
      options: [
        { label: "I am ready to answer", emoji: "🎧" },
        { label: "I want to hear Dani's version again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "To me, it means doing what I said I would do, even when it's inconvenient. In practice, it's being clear about what I can and can't finish. A clear example is when I break something by accident and report it immediately. It matters when nobody is watching because the problem doesn't disappear. The impact is that people can plan around me.",
      sayItEs: "Para mí, significa hacer lo que dije que haría, incluso cuando es incómodo. En la práctica, es ser claro sobre lo que puedo y no puedo terminar. Un ejemplo claro es cuando rompo algo por accidente y lo reporto de inmediato. Importa cuando nadie está mirando porque el problema no desaparece. El impacto es que la gente puede planear contando conmigo.",
      sayItAskEn: "Start with \"To me, it means ...\", then \"In practice, it's ...\", then \"A clear example is ...\", then \"It matters because ...\", and close with \"The impact is ...\".",
      sayItAskEs: "Empieza con \"To me, it means …\", luego \"In practice, it's …\", después \"A clear example is …\", luego \"It matters because …\" y cierra con \"The impact is …\".",
      sayItCheck: {
        target: "To me, it means *",
        altTargets: ["In practice, *", "A clear example is *", "The impact is *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s5",
    phrase: "If my name is at the bottom of the page, my voice is on the phone. Nobody makes that call for me.",
    es: "Si mi nombre está al pie de la página, mi voz está en el teléfono. Nadie hace esa llamada por mí.",
  },
  habitCard: {
    afterScene: "s2",
    phrase: "When something I signed goes wrong, I say it out loud before anyone finds the page. Then I fix what I can, myself.",
    es: "Cuando algo que firmé sale mal, lo digo en voz alta antes de que alguien encuentre la página. Luego arreglo lo que puedo, yo mismo.",
    model: "dani",
    modelActionEs: "Dani puso el horario de Monterrey con su firma sobre la mesa antes de que Reed lo pidiera, y llamó a Tomás él mismo antes de las dos.",
  },
  expressions: [
    {
      phrase: "own up",
      variants: ["owned up", "owns up to", "owning up"],
      es: "asumir la responsabilidad, admitir",
      kind: "phrasal",
      example: "In practice, it starts with owning up out loud before someone finds the page.",
      exampleEs: "En la práctica, empieza por asumirlo en voz alta antes de que alguien encuentre la página.",
    },
    {
      phrase: "come out",
      variants: ["came out", "comes out", "coming out"],
      es: "salir",
      kind: "phrasal",
      example: "Passed. Four fifty. She wrote one line at the bottom: 'He heard it and talked anyway.'",
      exampleEs: "Aprobé. Cuatro cincuenta. Escribió una línea al pie: 'La oyó y habló de todos modos'.",
    },
    {
      phrase: "in writing",
      variants: ["put it in writing", "get it in writing"],
      es: "por escrito",
      kind: "idiom",
      example: "Legal lifts the suspension if someone takes responsibility for that in writing.",
      exampleEs: "Legal levanta la suspensión si alguien asume la responsabilidad por escrito.",
    },
    {
      phrase: "at the bottom of the page",
      variants: ["at the bottom", "the bottom line"],
      es: "al pie de la página, al final",
      kind: "idiom",
      example: "If my name is at the bottom of the page, my voice is on the phone.",
      exampleEs: "Si mi nombre está al pie de la página, mi voz está en el teléfono.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: what responsibility means to you at work. Your definition, what it looks like day to day, a clear example, why it matters when nobody is watching, and the impact.",
    es: "Treinta segundos: qué significa para ti la responsabilidad en el trabajo. Tu definición, cómo se ve en el día a día, un ejemplo claro, por qué importa cuando nadie está mirando, y el impacto.",
  },
  continueWith: [
    "To me, it means ...",
    "In practice, it's ...",
    "A clear example is ...",
    "It matters because ... The impact is ...",
  ],
  cliffhanger: {
    en: "Thursday, 10:00 a.m.: the block is back. At 6:00 p.m., Lidia walks into the academy in person for the first time in three years, with Óscar's certificate and nothing else to say. Dani has something.",
    es: "Jueves, 10:00 a.m.: vuelve el bloque. A las 6:00 p.m., Lidia entra a la academia en persona por primera vez en tres años, con el certificado de Óscar y nada más que decir. Dani sí tiene algo.",
  },
};
