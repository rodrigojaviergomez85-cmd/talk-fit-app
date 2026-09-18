import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced2-ep10-dont-make-it-weird/cover.jpg";
import s1 from "@/assets/storybook/advanced2-ep10-dont-make-it-weird/s1.jpg";
import s2 from "@/assets/storybook/advanced2-ep10-dont-make-it-weird/s2.jpg";
import s3 from "@/assets/storybook/advanced2-ep10-dont-make-it-weird/s3.jpg";
import s4 from "@/assets/storybook/advanced2-ep10-dont-make-it-weird/s4.jpg";
import s5 from "@/assets/storybook/advanced2-ep10-dont-make-it-weird/s5.jpg";
import s6 from "@/assets/storybook/advanced2-ep10-dont-make-it-weird/s6.jpg";
import s7 from "@/assets/storybook/advanced2-ep10-dont-make-it-weird/s7.jpg";
import s8 from "@/assets/storybook/advanced2-ep10-dont-make-it-weird/s8.jpg";
import s9 from "@/assets/storybook/advanced2-ep10-dont-make-it-weird/s9.jpg";

export const ADVANCED2_EP10_DONT_MAKE_IT_WEIRD: StorybookEpisode = {
  id: "advanced2-ep10-dont-make-it-weird",
  moduleId: "advanced-2",
  week: 2,
  title: "Don't make it weird",
  titleEs: "No lo hagas raro",
  episodeLabel: {
    en: "Advanced 2 · Episode 10",
    es: "Advanced 2 · Episodio 10",
  },
  previously: [
    {
      en: "Dani offered Northline a smaller second group instead of a lower price.",
      es: "Dani le ofreció a Northline un segundo grupo más pequeño en vez de un precio más bajo.",
    },
    {
      en: "Camila told him he gave the smaller option too early.",
      es: "Camila le dijo que dio la opción más pequeña demasiado pronto.",
    },
    {
      en: "It's Friday. Mía owes Crown an answer.",
      es: "Es viernes. Mía le debe una respuesta a Crown.",
    },
  ],
  reviewWords: [
    { word: "summarize", es: "resumir" },
    { word: "confirm", es: "confirmar" },
    { word: "payment", es: "pago" },
    { word: "version", es: "versión" },
    { word: "weird", es: "raro" },
  ],
  blurb: {
    en: "Friday is closing day. Dani closes a family plan, Óscar closes his first sale with an 'um' in it, and finance says yes to fifteen agents. Then Mía tells him her answer, and Dani tries to close it like a sale. She stops him with three words. The one step he forgets is the one that follows him to Bogotá.",
    es: "El viernes es día de cierre. Dani cierra un plan familiar, Óscar cierra su primera venta con un 'um' adentro, y finanzas dice que sí a quince agentes. Después Mía le da su respuesta, y Dani intenta cerrarla como una venta. Ella lo frena con tres palabras. El único paso que olvida es el que lo persigue hasta Bogotá.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Northline floor, Friday morning; the wall screen reads FAMILY PLAN, CLOSING; Dani on a call with a contract summary open on his screen and a calendar with the 5th circled. No customer is drawn.",
      text: "Friday, 9:00 a.m. Account of the day: family plan, closing.",
      es: "Viernes, 9:00 a.m. Cuenta del día: plan familiar, cierre.",
      speaker: "dani",
      lines: [
        {
          speaker: "dani",
          text: "So, to summarize, you're taking the family plan. That includes four lines and night support. Just to confirm, the first payment is on the fifth.",
          es: "Entonces, para resumir, se lleva el plan familiar. Eso incluye cuatro líneas y soporte nocturno. Solo para confirmar, el primer pago es el cinco.",
        },
        {
          speaker: "caller",
          text: "The fifth, yes. But my wife wants to read the contract before I say yes to anything.",
          es: "El cinco, sí. Pero mi esposa quiere leer el contrato antes de que yo diga que sí a algo.",
        },
        {
          speaker: "dani",
          text: "Of course, you can talk to your wife first. What happens next is I send everything to your email today. Take your time to read it before you sign anything. I'll keep this price for you until Friday.",
          es: "Claro, puede hablar con su esposa primero. Lo que sigue es que le mando todo a su correo hoy. Tómese su tiempo para leerlo antes de firmar algo. Le guardo este precio hasta el viernes.",
        },
        {
          speaker: "caller",
          text: "It is Friday.",
          es: "Hoy es viernes.",
        },
        {
          speaker: "dani",
          text: "Next Friday. Thank you for your time today. It was a pleasure helping you.",
          es: "El próximo viernes. Gracias por su tiempo hoy. Fue un placer ayudarle.",
        },
      ],
      words: [
        { word: "summarize", es: "resumir" },
        { word: "payment", es: "pago" },
        { word: "contract", es: "contrato" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Óscar on his own call, back very straight, one hand flat on the desk; Dani and Nico pretending not to listen from the next row. No customer is drawn.",
      text: "9:40 a.m. Óscar's first close.",
      es: "9:40 a.m. El primer cierre de Óscar.",
      speaker: "oscar",
      lines: [
        {
          speaker: "oscar",
          text: "So, to summarize, you're taking, um, the two lines.",
          es: "Entonces, para resumir, se lleva, um, las dos líneas.",
        },
        {
          speaker: "caller",
          text: "Three. My son is on it now.",
          es: "Tres. Mi hijo está ahora también.",
        },
        {
          speaker: "oscar",
          text: "Three. Just to confirm, three lines, and the first payment is on the tenth. What happens next is I send it to your email. Read through it before you sign anything.",
          es: "Tres. Solo para confirmar, tres líneas, y el primer pago es el diez. Lo que sigue es que se lo mando a su correo. Léalo completo antes de firmar algo.",
        },
        {
          speaker: "caller",
          text: "You're new, aren't you? That's fine. You listened.",
          es: "Eres nuevo, ¿verdad? Está bien. Escuchaste.",
        },
      ],
      words: [
        { word: "lines", es: "líneas" },
        { word: "tenth", es: "diez (del mes)" },
        { word: "listened", es: "escuchaste" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Óscar with his headset off, red in the face and smiling for the first time; Nico offering a fist bump without looking; Dani writing on a sticky note.",
      text: "He hangs up. He doesn't move for a second.",
      es: "Cuelga. No se mueve por un segundo.",
      speaker: "dani",
      cast: ["oscar", "nico", "dani"],
      lines: [
        {
          speaker: "nico",
          text: "You said 'um'.",
          es: "Dijiste 'um'.",
        },
        {
          speaker: "dani",
          text: "He said 'um', got the number wrong, corrected it out loud, and she stayed. That is the whole job, Óscar. 'Um' is allowed on a Friday.",
          es: "Dijo 'um', se equivocó en el número, lo corrigió en voz alta, y ella se quedó. Ese es todo el trabajo, Óscar. 'Um' está permitido los viernes.",
        },
        {
          speaker: "oscar",
          text: "She said I listened.",
          es: "Dijo que escuché.",
        },
        {
          speaker: "dani",
          text: "Write that on the note. Not the sale. That.",
          es: "Escribe eso en la nota. No la venta. Eso.",
        },
      ],
      words: [
        { word: "corrected", es: "corrigió" },
        { word: "allowed", es: "permitido" },
        { word: "note", es: "nota" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Ms. Barrett at the end of Dani's row with Camila beside her, Barrett holding a single printed page with a number circled by hand.",
      text: "11:10 a.m. Barrett and Camila, together.",
      es: "11:10 a.m. Barrett y Camila, juntas.",
      speaker: "barrett",
      cast: ["barrett", "camila", "dani"],
      lines: [
        {
          speaker: "barrett",
          text: "Finance counters. Not ten, not twenty. Fifteen agents, same price per head, starting in Bogotá in two weeks. Julieta's team handles the materials on their side.",
          es: "Finanzas contraoferta. Ni diez, ni veinte. Quince agentes, el mismo precio por cabeza, empezando en Bogotá en dos semanas. El equipo de Julieta se encarga de los materiales de su lado.",
        },
        {
          speaker: "camila",
          text: "I'll take fifteen.",
          es: "Acepto quince.",
        },
        {
          speaker: "dani",
          text: "Just to confirm, the materials go to Bogotá from us, and Julieta's team adapts them there.",
          es: "Solo para confirmar, los materiales salen de nosotros hacia Bogotá, y el equipo de Julieta los adapta allá.",
        },
        {
          speaker: "barrett",
          text: "Today. She wants them today. And they want your closing rate on this floor by Monday.",
          es: "Hoy. Los quiere hoy. Y ellos quieren tu tasa de cierre en este piso para el lunes.",
        },
        {
          speaker: "dani",
          text: "She'll have them today.",
          es: "Los va a tener hoy.",
        },
      ],
      words: [
        { word: "counters", es: "contraoferta" },
        { word: "materials", es: "materiales" },
        { word: "rate", es: "tasa" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Break room, 12:30; Mía sitting on the counter, phone face down beside her, looking at Dani who is leaning on the fridge; Nico in the doorway.",
      text: "12:30 p.m. It's Friday.",
      es: "12:30 p.m. Es viernes.",
      speaker: "mia",
      cast: ["mia", "dani", "nico"],
      lines: [
        {
          speaker: "mia",
          text: "Ask me.",
          es: "Pregúntame.",
        },
        {
          speaker: "dani",
          text: "I'm not going to ask you.",
          es: "No te voy a preguntar.",
        },
        {
          speaker: "mia",
          text: "Jefe. Ask me.",
          es: "Jefe. Pregúntame.",
        },
        {
          speaker: "dani",
          text: "So, to summarize, you're staying on the two-to-ten shift. That includes the club twice a week and the university in January. Just to confirm—",
          es: "Entonces, para resumir, te quedas en el turno de dos a diez. Eso incluye el club dos veces por semana y la universidad en enero. Solo para confirmar...",
        },
        {
          speaker: "mia",
          text: "Don't make it weird, jefe.",
          es: "No lo hagas raro, jefe.",
        },
        {
          speaker: "dani",
          text: "What happens next is—",
          es: "Lo que sigue es...",
        },
        {
          speaker: "mia",
          text: "Don't. Make it. Weird. I'm staying. I told Keller this morning.",
          es: "No. Lo hagas. Raro. Me quedo. Se lo dije a Keller esta mañana.",
        },
      ],
      words: [
        { word: "shift", es: "turno" },
        { word: "staying", es: "quedarse" },
        { word: "weird", es: "raro" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Close on Mía, serious now, turning the paper cup in her hands; Dani not moving; Nico looking at the floor.",
      text: "Then she says the thing under the money.",
      es: "Entonces dice la cosa debajo del dinero.",
      speaker: "mia",
      cast: ["mia", "dani", "nico"],
      lines: [
        {
          speaker: "mia",
          text: "She said the offer stays open. I said thank you. Then I told her the real reason. Crown pays more, and nobody there is going to tell me when I'm wrong. You do. Every day. It's annoying and I need it.",
          es: "Dijo que la oferta sigue abierta. Le dije gracias. Después le dije la razón real. Crown paga más, y nadie allá me va a decir cuando me equivoco. Tú sí. Todos los días. Es molesto y lo necesito.",
        },
        {
          speaker: "nico",
          text: "He's going to make it weird.",
          es: "Lo va a hacer raro.",
        },
        {
          speaker: "dani",
          text: "I'm not.",
          es: "No.",
        },
        {
          speaker: "dani",
          text: "Thank you for your time today. It was a pleasure helping you.",
          es: "Gracias por su tiempo hoy. Fue un placer ayudarle.",
        },
        {
          speaker: "mia",
          text: "There it is.",
          es: "Ahí está.",
        },
      ],
      words: [
        { word: "reason", es: "razón" },
        { word: "annoying", es: "molesto" },
        { word: "pleasure", es: "placer" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "4:05 p.m.; Julieta on the video screen at Dani's desk, white shirt and badge, arms crossed, an empty folder icon visible on her side of the screen.",
      text: "4:05 p.m. Bogotá calls first.",
      es: "4:05 p.m. Bogotá llama primero.",
      speaker: "julieta",
      cast: ["julieta", "dani"],
      lines: [
        {
          speaker: "julieta",
          text: "Dani. The materials are not in Bogotá. Your email said today. It's four o'clock, I have fifteen agents on Monday, and I have a summary.",
          es: "Dani. Los materiales no están en Bogotá. Tu correo decía hoy. Son las cuatro, tengo quince agentes el lunes, y tengo un resumen.",
        },
        {
          speaker: "dani",
          text: "I sent the summary at noon so your team could start—",
          es: "Mandé el resumen al mediodía para que tu equipo pudiera empezar...",
        },
        {
          speaker: "julieta",
          text: "A summary is not a next step. I need the files. In Bogotá we don't grade summaries.",
          es: "Un resumen no es un siguiente paso. Necesito los archivos. En Bogotá no calificamos resúmenes.",
        },
        {
          speaker: "dani",
          text: "That's on me. You'll have the files in an hour.",
          es: "Eso es mi culpa. Vas a tener los archivos en una hora.",
        },
      ],
      words: [
        { word: "summary", es: "resumen" },
        { word: "files", es: "archivos" },
        { word: "grade", es: "calificar" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Stairwell; Camila one step above Dani, tablet under her arm, Dani with his phone already open to a folder.",
      text: "The stairwell.",
      es: "La escalera.",
      speaker: "camila",
      cast: ["camila", "dani"],
      lines: [
        {
          speaker: "camila",
          text: "You closed the customer, you closed Óscar, you closed finance, you closed Mía. And you forgot the step after the close.",
          es: "Cerraste al cliente, cerraste a Óscar, cerraste a finanzas, cerraste a Mía. Y olvidaste el paso después del cierre.",
        },
        {
          speaker: "dani",
          text: "What happens next.",
          es: "Lo que sigue.",
        },
        {
          speaker: "camila",
          text: "That's the one. You say it to customers all day. Send the files now. Then eat something.",
          es: "Ese mismo. Se lo dices a los clientes todo el día. Manda los archivos ahora. Después come algo.",
        },
        {
          speaker: "dani",
          text: "You and my mother should never meet.",
          es: "Tú y mi mamá nunca deberían conocerse.",
        },
      ],
      words: [
        { word: "stairwell", es: "escalera" },
        { word: "forgot", es: "olvidaste" },
        { word: "step", es: "paso" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Night; the bus stop; Nico and Dani side by side, Dani reading a message on his phone, Nico eating from a bag of chips, the Northline sign lit behind them.",
      text: "10:40 p.m. Bus stop. One message from Bogotá.",
      es: "10:40 p.m. Parada de bus. Un mensaje de Bogotá.",
      speaker: "nico",
      cast: ["nico", "dani"],
      lines: [
        {
          speaker: "dani",
          text: "'Files received. Wrong version. See you Monday, seven a.m., Bogotá time.'",
          es: "'Archivos recibidos. Versión equivocada. Nos vemos el lunes, siete a.m., hora de Bogotá.'",
        },
        {
          speaker: "nico",
          text: "Wrong version.",
          es: "Versión equivocada.",
        },
        {
          speaker: "dani",
          text: "It's the one I sent Camila in June. Before the floor. Fourteen people showed up to the club tonight and I sent Bogotá the June files.",
          es: "Es la que le mandé a Camila en junio. Antes del piso. Catorce personas llegaron al club esta noche y yo le mandé a Bogotá los archivos de junio.",
        },
        {
          speaker: "nico",
          text: "So the summary was right and the file was wrong.",
          es: "O sea que el resumen estaba bien y el archivo estaba mal.",
        },
        {
          speaker: "dani",
          text: "Don't make it weird, Nico.",
          es: "No lo hagas raro, Nico.",
        },
        {
          speaker: "nico",
          text: "Too late.",
          es: "Muy tarde.",
        },
      ],
      words: [
        { word: "received", es: "recibidos" },
        { word: "version", es: "versión" },
        { word: "showed", es: "llegaron" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s6",
      questionEn: "Why does Mía say she is staying at Northline?",
      questionEs: "¿Por qué dice Mía que se queda en Northline?",
      options: [
        { label: "Because someone there tells her when she is wrong, every day", emoji: "🎧" },
        { label: "Because Crown took the offer back", emoji: "📵" },
        { label: "Because Northline matched Crown's twenty percent", emoji: "💵" },
      ],
      answer: 0,
      sayIt: "Because someone there tells her when she is wrong, every day.",
      sayItEs: "Porque alguien ahí le dice cuando se equivoca, todos los días.",
      sayItCheck: {
        target: "* tells her when she is wrong",
        altTargets: ["Because Dani tells her when she's wrong", "Someone tells her when she is wrong *", "Nobody at Crown will tell her *"],
      },
    },
    {
      id: "q2",
      afterScene: "s1",
      questionEn: "Close a sale in four moves: summarize what they're taking, confirm one detail, say what happens next, and thank them.",
      questionEs: "Cierra una venta en cuatro pasos: resume lo que se llevan, confirma un detalle, di qué sigue, y agradece.",
      options: [
        { label: "I am ready to answer", emoji: "🎧" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "So, to summarize, you're taking the family plan. Just to confirm, the first payment is on the fifth. What happens next is I send everything to your email today. Thank you for your time today.",
      sayItEs: "Entonces, para resumir, se lleva el plan familiar. Solo para confirmar, el primer pago es el cinco. Lo que sigue es que le mando todo a su correo hoy. Gracias por su tiempo hoy.",
      sayItAskEn: "Start with \"So, to summarize, you're taking ...\", then \"Just to confirm, ...\", then \"What happens next is ...\", and close with \"Thank you for your time today\".",
      sayItAskEs: "Empieza con \"So, to summarize, you're taking …\", luego \"Just to confirm, …\", después \"What happens next is …\" y cierra con \"Thank you for your time today\".",
      sayItCheck: {
        target: "So, to summarize, *",
        altTargets: ["Just to confirm, *", "What happens next is *", "To summarize, *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s3",
    phrase: "A close with an 'um' in it is still a close. A perfect close with no next step is not.",
    es: "Un cierre con un 'um' adentro sigue siendo un cierre. Un cierre perfecto sin paso siguiente, no.",
  },
  habitCard: {
    afterScene: "s8",
    phrase: "After every yes, I say out loud what happens next, and then I actually do it.",
    es: "Después de cada sí, digo en voz alta qué sigue, y después lo hago de verdad.",
    model: "camila",
    modelActionEs: "Camila le mostró a Dani que cerró cuatro veces en un día y olvidó el único paso que viene después del cierre.",
  },
  expressions: [
    {
      phrase: "read through",
      variants: ["reads through", "read it through", "reading through"],
      es: "leer completo, leer de principio a fin",
      kind: "phrasal",
      example: "Read through it before you sign anything.",
      exampleEs: "Léalo completo antes de firmar algo.",
    },
    {
      phrase: "show up",
      variants: ["showed up", "shows up", "showing up"],
      es: "presentarse, llegar",
      kind: "phrasal",
      example: "Fourteen people showed up to the club tonight and I sent Bogotá the June files.",
      exampleEs: "Catorce personas llegaron al club esta noche y yo le mandé a Bogotá los archivos de junio.",
    },
    {
      phrase: "make it weird",
      variants: ["don't make it weird", "made it weird", "making it weird"],
      es: "ponerlo incómodo, hacerlo raro",
      kind: "idiom",
      example: "Don't make it weird, jefe.",
      exampleEs: "No lo hagas raro, jefe.",
    },
    {
      phrase: "that's on me",
      variants: ["this is on me", "it's on me"],
      es: "es mi culpa, me hago responsable",
      kind: "idiom",
      example: "That's on me. You'll have the files in an hour.",
      exampleEs: "Eso es mi culpa. Vas a tener los archivos en una hora.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: close something. Summarize what the person is taking, confirm one detail, say what happens next, and thank them for their time.",
    es: "Treinta segundos: cierra algo. Resume lo que la persona se lleva, confirma un detalle, di qué sigue, y agradécele su tiempo.",
  },
  continueWith: [
    "So, to summarize, you're taking ...",
    "Just to confirm, ...",
    "What happens next is ...",
    "Thank you for your time today. It was a pleasure helping you.",
  ],
  cliffhanger: {
    en: "Monday, seven a.m., Bogotá time. Fifteen agents, the wrong files, and Julieta on the other side of the screen with a scorecard.",
    es: "Lunes, siete a.m., hora de Bogotá. Quince agentes, los archivos equivocados, y Julieta del otro lado de la pantalla con una hoja de calificación.",
  },
};
