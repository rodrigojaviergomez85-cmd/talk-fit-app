import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced2-ep17-one-to-one/cover.jpg";
import s1 from "@/assets/storybook/advanced2-ep17-one-to-one/s1.jpg";
import s2 from "@/assets/storybook/advanced2-ep17-one-to-one/s2.jpg";
import s3 from "@/assets/storybook/advanced2-ep17-one-to-one/s3.jpg";
import s4 from "@/assets/storybook/advanced2-ep17-one-to-one/s4.jpg";
import s5 from "@/assets/storybook/advanced2-ep17-one-to-one/s5.jpg";
import s6 from "@/assets/storybook/advanced2-ep17-one-to-one/s6.jpg";
import s7 from "@/assets/storybook/advanced2-ep17-one-to-one/s7.jpg";
import s8 from "@/assets/storybook/advanced2-ep17-one-to-one/s8.jpg";
import s9 from "@/assets/storybook/advanced2-ep17-one-to-one/s9.jpg";

export const ADVANCED2_EP17_ONE_TO_ONE: StorybookEpisode = {
  id: "advanced2-ep17-one-to-one",
  moduleId: "advanced-2",
  week: 4,
  title: "One to one",
  titleEs: "Uno a uno",
  episodeLabel: {
    en: "Advanced 2 · Episode 17",
    es: "Advanced 2 · Episodio 17",
  },
  previously: [
    {
      en: "Nico hung up on a customer and the report went upstairs in two paragraphs.",
      es: "Nico le colgó a un cliente y el reporte subió en dos párrafos.",
    },
    {
      en: "Mía kept something on her phone. Again.",
      es: "Mía se guardó algo en el celular. Otra vez.",
    },
    {
      en: "Vale wants the real challenge, not the one that sounds good in a folder.",
      es: "Vale quiere el reto real, no el que suena bien en una carpeta.",
    },
  ],
  reviewWords: [
    { word: "progress", es: "progreso" },
    { word: "average", es: "promedio" },
    { word: "challenge", es: "reto" },
    { word: "goal", es: "meta" },
    { word: "feedback", es: "retroalimentación" },
  ],
  blurb: {
    en: "Three one-to-ones in one day. Vale with Dani: results, one real challenge, next goal, and the challenge is that he isn't sleeping great. Vale doesn't fix it; she asks what he's going to change. Then Dani with Mía, who won't let him say her numbers for her, and with Nico, whose goal is one sentence more per call.",
    es: "Tres uno a uno en un día. Vale con Dani: resultados, un reto real, siguiente meta, y el reto es que no está durmiendo bien. Vale no lo arregla; le pregunta qué va a cambiar. Después Dani con Mía, que no lo deja decir sus números por ella, y con Nico, cuya meta es una frase más por llamada.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Tuesday, 9:00 a.m.; a small glass meeting room at Northline; Vale in her mustard-yellow blouse on one side of the table with the ONE-TO-ONE folder closed; Dani on the other side with a coffee he hasn't touched.",
      text: "Tuesday, 9:00 a.m. Vale doesn't open the folder.",
      es: "Martes, 9:00 a.m. Vale no abre la carpeta.",
      speaker: "vale",
      cast: ["vale", "dani"],
      lines: [
        {
          speaker: "vale",
          text: "Results first. Yours, not the floor's.",
          es: "Resultados primero. Los tuyos, no los del piso.",
        },
        {
          speaker: "dani",
          text: "This month I've been working on saying things once. My average call went down from nine minutes to seven. I've also received good feedback from two customers and one QA analyst who doesn't give it.",
          es: "Este mes he estado trabajando en decir las cosas una sola vez. Mi llamada promedio bajó de nueve minutos a siete. También he recibido buena retroalimentación de dos clientes y de una analista de calidad que no la da.",
        },
        {
          speaker: "vale",
          text: "Good. Now the challenge. The real one.",
          es: "Bien. Ahora el reto. El real.",
        },
      ],
      words: [
        { word: "results", es: "resultados" },
        { word: "average", es: "promedio" },
        { word: "feedback", es: "retroalimentación" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Close on Dani, looking at the coffee instead of at Vale; his thumb on the edge of the cup; the floor blurred through the glass behind him.",
      text: "He looks at the coffee.",
      es: "Mira el café.",
      speaker: "dani",
      cast: ["dani", "vale"],
      lines: [
        {
          speaker: "dani",
          text: "The hardest part for me is the nights. Bogotá at six, the floor at eight, the club at seven, Julieta's messages at the bus stop. I'm not sleeping great.",
          es: "La parte más difícil para mí son las noches. Bogotá a las seis, el piso a las ocho, el club a las siete, los mensajes de Julieta en la parada. No estoy durmiendo bien.",
        },
        {
          speaker: "vale",
          text: "Okay.",
          es: "Okay.",
        },
        {
          speaker: "dani",
          text: "That's it? That's your whole reaction?",
          es: "¿Eso es todo? ¿Esa es toda tu reacción?",
        },
        {
          speaker: "vale",
          text: "You said that to Mía once. It's a good line. What are you going to change?",
          es: "Eso se lo dijiste a Mía una vez. Es una buena línea. ¿Qué vas a cambiar?",
        },
      ],
      words: [
        { word: "hardest", es: "más difícil" },
        { word: "nights", es: "noches" },
        { word: "sleeping", es: "durmiendo" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale finally opening the folder and writing one line in it; Dani counting on his fingers, two fingers up.",
      text: "She doesn't fix it. She writes.",
      es: "No lo arregla. Escribe.",
      speaker: "vale",
      cast: ["vale", "dani"],
      lines: [
        {
          speaker: "dani",
          text: "Two things. Bogotá moves from six to seven; Julieta already said yes. And I stop reading messages at the bus stop. My goal for next month is to handle the night shift of my own head alone.",
          es: "Dos cosas. Bogotá pasa de las seis a las siete; Julieta ya dijo que sí. Y dejo de leer mensajes en la parada. Mi meta para el próximo mes es manejar sola el turno nocturno de mi propia cabeza.",
        },
        {
          speaker: "vale",
          text: "That's a goal. It's written. I'll ask you about it on the fifteenth, and I won't ask nicely.",
          es: "Eso es una meta. Está escrita. Te voy a preguntar el quince, y no voy a preguntar con dulzura.",
        },
        {
          speaker: "dani",
          text: "You've never asked nicely.",
          es: "Nunca has preguntado con dulzura.",
        },
        {
          speaker: "vale",
          text: "That's my result for the month.",
          es: "Ese es mi resultado del mes.",
        },
      ],
      words: [
        { word: "goal", es: "meta" },
        { word: "written", es: "escrita" },
        { word: "nicely", es: "con dulzura" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "The same glass room, 11:00 a.m.; Mía across from Dani with her arms crossed and her headset around her neck; Dani with a printed sheet of her numbers, which she is not looking at.",
      text: "11:00 a.m. Mía. He starts with her numbers. Mistake.",
      es: "11:00 a.m. Mía. Empieza con los números de ella. Error.",
      speaker: "mia",
      cast: ["mia", "dani"],
      lines: [
        {
          speaker: "dani",
          text: "Okay, so this month your average went from twelve minutes to eight, your escalations are down, and Julieta scored you—",
          es: "Ok, entonces este mes tu promedio pasó de doce minutos a ocho, tus escalaciones bajaron, y Julieta te puntuó...",
        },
        {
          speaker: "mia",
          text: "It's my one-to-one, jefe. Let me say my numbers.",
          es: "Es mi uno a uno, jefe. Déjame decir mis números.",
        },
        {
          speaker: "dani",
          text: "...Fair. Go.",
          es: "...Justo. Dale.",
        },
        {
          speaker: "mia",
          text: "This month I've been working on my call handling time. My average went down from twelve minutes to eight. The hardest part for me is handling angry customers in English. When that happens, I sometimes speak too fast.",
          es: "Este mes he estado trabajando en mi tiempo de llamada. Mi promedio bajó de doce minutos a ocho. La parte más difícil para mí es manejar clientes enojados en inglés. Cuando pasa eso, a veces hablo demasiado rápido.",
        },
      ],
      words: [
        { word: "escalations", es: "escalaciones" },
        { word: "handling", es: "manejo" },
        { word: "fast", es: "rápido" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Mía leaning forward now, one finger on the table; Dani writing on the back of her numbers sheet.",
      text: "Then the goal.",
      es: "Luego la meta.",
      speaker: "mia",
      cast: ["mia", "dani"],
      lines: [
        {
          speaker: "mia",
          text: "What's helping me is practicing every day before my shift. Out loud. At the bus stop, which is embarrassing. My goal for next month is to handle escalations alone. I'd also like more feedback on my calls, from you, not just from Bogotá.",
          es: "Lo que me está ayudando es practicar todos los días antes de mi turno. En voz alta. En la parada, lo cual es vergonzoso. Mi meta para el próximo mes es manejar escalaciones sola. También me gustaría más retroalimentación de mis llamadas, de ti, no solo de Bogotá.",
        },
        {
          speaker: "dani",
          text: "Written down. Two calls a week, together, Thursdays at ten. That block is yours now. Nobody moves it.",
          es: "Anotado. Dos llamadas por semana, juntos, los jueves a las diez. Ese bloque es tuyo ahora. Nadie lo mueve.",
        },
        {
          speaker: "mia",
          text: "Not even Vale?",
          es: "¿Ni siquiera Vale?",
        },
        {
          speaker: "dani",
          text: "Especially not Vale.",
          es: "Especialmente Vale no.",
        },
      ],
      words: [
        { word: "embarrassing", es: "vergonzoso" },
        { word: "alone", es: "sola" },
        { word: "especially", es: "especialmente" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "The glass room, 2:00 p.m.; Nico across from Dani with his hood down, hands flat on the table; a single sheet between them with three numbers on it.",
      text: "2:00 p.m. Nico. Hood down.",
      es: "2:00 p.m. Nico. Capucha abajo.",
      speaker: "nico",
      cast: ["nico", "dani"],
      lines: [
        {
          speaker: "nico",
          text: "This month I've been working on saying more than one sentence per call. My average went up from one to three. I've also hung up on one customer, which is in a report with my name on it.",
          es: "Este mes he estado trabajando en decir más de una frase por llamada. Mi promedio subió de una a tres. También le colgué a un cliente, lo cual está en un reporte con mi nombre.",
        },
        {
          speaker: "dani",
          text: "Paragraph two says you were right.",
          es: "El párrafo dos dice que tenías razón.",
        },
        {
          speaker: "nico",
          text: "The hardest part for me is the part after I'm right. I don't know what to say next, so I stop talking.",
          es: "La parte más difícil para mí es la parte después de tener razón. No sé qué decir después, así que dejo de hablar.",
        },
        {
          speaker: "dani",
          text: "What's the goal?",
          es: "¿Cuál es la meta?",
        },
        {
          speaker: "nico",
          text: "My goal for next month is four. One more sentence. The one after I'm right.",
          es: "Mi meta para el próximo mes es cuatro. Una frase más. La que va después de tener razón.",
        },
      ],
      words: [
        { word: "sentence", es: "frase" },
        { word: "report", es: "reporte" },
        { word: "next", es: "después" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Óscar waiting outside the glass room with a folded sheet of paper, looking at the door; Dani coming out; the wall clock at 2:30.",
      text: "2:30 p.m. Óscar wasn't on the list.",
      es: "2:30 p.m. Óscar no estaba en la lista.",
      speaker: "oscar",
      cast: ["oscar", "dani"],
      lines: [
        {
          speaker: "oscar",
          text: "I know I'm not on the list. I wrote mine anyway. This month I've been working on saying 'um' less. It went from ten per call to four.",
          es: "Sé que no estoy en la lista. Escribí el mío igual. Este mes he estado trabajando en decir 'um' menos. Pasó de diez por llamada a cuatro.",
        },
        {
          speaker: "dani",
          text: "Who counted?",
          es: "¿Quién contó?",
        },
        {
          speaker: "oscar",
          text: "Nico. He counts everything. The hardest part for me is the audit on Friday. My calls are still two minutes too long.",
          es: "Nico. Él cuenta todo. La parte más difícil para mí es la auditoría del viernes. Mis llamadas siguen siendo dos minutos demasiado largas.",
        },
        {
          speaker: "dani",
          text: "Then that's your goal for this week, not next month. Two minutes. I can't give you Thursday at ten; that's Mía's. I can give you Wednesday at four.",
          es: "Entonces esa es tu meta para esta semana, no para el próximo mes. Dos minutos. No te puedo dar el jueves a las diez; es de Mía. Te puedo dar el miércoles a las cuatro.",
        },
      ],
      words: [
        { word: "list", es: "lista" },
        { word: "anyway", es: "igual" },
        { word: "long", es: "largas" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Camila and Dani at the end of the row; Camila holding up her tablet with a calendar where the six a.m. block has been moved to seven; a coffee in her other hand.",
      text: "6:00 p.m. Camila approves a coffee.",
      es: "6:00 p.m. Camila aprueba un café.",
      speaker: "camila",
      cast: ["camila", "dani"],
      lines: [
        {
          speaker: "camila",
          text: "Bogotá moved to seven. Vale told me. She also told me not to tell you she told me.",
          es: "Bogotá pasó a las siete. Vale me dijo. También me dijo que no te dijera que me dijo.",
        },
        {
          speaker: "dani",
          text: "She didn't fix it. She just asked what I'd change.",
          es: "No lo arregló. Solo preguntó qué cambiaría.",
        },
        {
          speaker: "camila",
          text: "That's fixing it. The other version is her moving your calendar without asking, and you'd have hated that. Coffee approved. Go home.",
          es: "Eso es arreglarlo. La otra versión es ella moviendo tu calendario sin preguntar, y eso lo habrías odiado. Café aprobado. Vete a casa.",
        },
      ],
      words: [
        { word: "moved", es: "pasó" },
        { word: "version", es: "versión" },
        { word: "approved", es: "aprobado" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Night; the bus stop; Dani alone on the bench with his phone face down on his knee, not reading it; the Northline sign lit behind him.",
      text: "9:20 p.m. Bus stop. The phone stays face down.",
      es: "9:20 p.m. Parada de bus. El celular se queda boca abajo.",
      speaker: "dani",
      lines: [
        {
          speaker: "estela",
          text: "Mijo. You didn't answer my message.",
          es: "Mijo. No contestaste mi mensaje.",
        },
        {
          speaker: "dani",
          text: "I'm not reading messages at the bus stop anymore, mamá. It's written in a folder.",
          es: "Ya no leo mensajes en la parada, mamá. Está escrito en una carpeta.",
        },
        {
          speaker: "estela",
          text: "Then how are you talking to me?",
          es: "¿Entonces cómo me estás hablando?",
        },
        {
          speaker: "dani",
          text: "You called. Calls are allowed. Did I eat? Yes. Camila approved it.",
          es: "Llamaste. Las llamadas están permitidas. ¿Que si comí? Sí. Camila lo aprobó.",
        },
      ],
      words: [
        { word: "message", es: "mensaje" },
        { word: "anymore", es: "ya no" },
        { word: "allowed", es: "permitidas" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What does Vale do when Dani says he isn't sleeping great?",
      questionEs: "¿Qué hace Vale cuando Dani dice que no está durmiendo bien?",
      options: [
        { label: "She asks what he's going to change, and writes the goal down", emoji: "📝" },
        { label: "She moves his calendar herself", emoji: "🗓️" },
        { label: "She tells him to take the week off", emoji: "🏖️" },
      ],
      answer: 0,
      sayIt: "She asks what he's going to change, and writes the goal down.",
      sayItEs: "Le pregunta qué va a cambiar, y escribe la meta.",
      sayItCheck: {
        target: "* what he's going to change *",
        altTargets: ["She asks what he will change *", "She writes the goal *", "She doesn't fix it *"],
      },
    },
    {
      id: "q2",
      afterScene: "s5",
      questionEn: "It's your one-to-one. Say one result from this month, one real challenge, and your goal for next month.",
      questionEs: "Es tu uno a uno. Di un resultado de este mes, un reto real, y tu meta para el próximo mes.",
      options: [
        { label: "I am ready to answer", emoji: "🎧" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "This month I've been working on my call handling time. The hardest part for me is handling angry customers in English. My goal for next month is to handle escalations alone.",
      sayItEs: "Este mes he estado trabajando en mi tiempo de llamada. La parte más difícil para mí es manejar clientes enojados en inglés. Mi meta para el próximo mes es manejar escalaciones sola.",
      sayItAskEn: "Start with \"This month I've been working on ...\", then \"The hardest part for me is ...\", and close with \"My goal for next month is ...\".",
      sayItAskEs: "Empieza con \"This month I've been working on …\", luego \"The hardest part for me is …\" y cierra con \"My goal for next month is …\".",
      sayItCheck: {
        target: "This month I've been working on *",
        altTargets: ["The hardest part for me is *", "My goal for next month is *", "This month I *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s2",
    phrase: "The real challenge is the one I'd rather not say in a room with glass walls.",
    es: "El reto real es el que preferiría no decir en una sala con paredes de vidrio.",
  },
  habitCard: {
    afterScene: "s5",
    phrase: "In a one-to-one, I let the other person say their own numbers before I say anything.",
    es: "En un uno a uno, dejo que la otra persona diga sus propios números antes de decir yo algo.",
    model: "mia",
    modelActionEs: "Mía frenó a Dani cuando empezó a recitar sus resultados por ella, y dijo sus números, su reto y su meta con sus propias palabras.",
  },
  expressions: [
    {
      phrase: "go down",
      variants: ["went down", "goes down", "going down"],
      es: "bajar (una cifra)",
      kind: "phrasal",
      example: "This month I've been working on my call handling time. My average went down from twelve minutes to eight.",
      exampleEs: "Este mes he estado trabajando en mi tiempo de llamada. Mi promedio bajó de doce minutos a ocho.",
    },
    {
      phrase: "write down",
      variants: ["writes it down", "wrote down", "written down"],
      es: "anotar, dejar por escrito",
      kind: "phrasal",
      example: "Written down. Two calls a week, together, Thursdays at ten.",
      exampleEs: "Anotado. Dos llamadas por semana, juntos, los jueves a las diez.",
    },
    {
      phrase: "not sleeping great",
      variants: ["sleeping great", "not sleeping well"],
      es: "no estar durmiendo bien",
      kind: "idiom",
      example: "I'm not sleeping great.",
      exampleEs: "No estoy durmiendo bien.",
    },
    {
      phrase: "ask nicely",
      variants: ["asked nicely", "asking nicely"],
      es: "pedir con dulzura, pedir por las buenas",
      kind: "idiom",
      example: "That's a goal. It's written. I'll ask you about it on the fifteenth, and I won't ask nicely.",
      exampleEs: "Eso es una meta. Está escrita. Te voy a preguntar el quince, y no voy a preguntar con dulzura.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: your own one-to-one. One result with a number, one challenge you'd rather not say, and a goal you can be asked about on the fifteenth.",
    es: "Treinta segundos: tu propio uno a uno. Un resultado con número, un reto que preferirías no decir, y una meta por la que te puedan preguntar el quince.",
  },
  continueWith: [
    "This month I've been working on ...",
    "My average went down from ... to ...",
    "The hardest part for me is ...",
    "My goal for next month is ... I'd also like ...",
  ],
  cliffhanger: {
    en: "Tomorrow: Mía teaches. Fifteen agents in Bogotá, one process, seven steps, and Dani has to sit next to her and not say a word.",
    es: "Mañana: Mía enseña. Quince agentes en Bogotá, un proceso, siete pasos, y Dani tiene que sentarse a su lado y no decir una palabra.",
  },
};
