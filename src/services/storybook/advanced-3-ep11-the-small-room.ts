import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced3-ep11-the-small-room/cover.jpg";
import s1 from "@/assets/storybook/advanced3-ep11-the-small-room/s1.jpg";
import s2 from "@/assets/storybook/advanced3-ep11-the-small-room/s2.jpg";
import s3 from "@/assets/storybook/advanced3-ep11-the-small-room/s3.jpg";
import s4 from "@/assets/storybook/advanced3-ep11-the-small-room/s4.jpg";
import s5 from "@/assets/storybook/advanced3-ep11-the-small-room/s5.jpg";
import s6 from "@/assets/storybook/advanced3-ep11-the-small-room/s6.jpg";
import s7 from "@/assets/storybook/advanced3-ep11-the-small-room/s7.jpg";
import s8 from "@/assets/storybook/advanced3-ep11-the-small-room/s8.jpg";
import s9 from "@/assets/storybook/advanced3-ep11-the-small-room/s9.jpg";

export const ADVANCED3_EP11_THE_SMALL_ROOM: StorybookEpisode = {
  id: "advanced3-ep11-the-small-room",
  moduleId: "advanced-3",
  week: 3,
  title: "The small room",
  titleEs: "El salón pequeño",
  episodeLabel: {
    en: "Advanced 3 · Episode 11",
    es: "Advanced 3 · Episodio 11",
  },
  previously: [
    {
      en: "The board voted. On hold. Not a no, a not yet.",
      es: "La junta votó. En espera. No es un no, es un todavía no.",
    },
    {
      en: "Vale, in the car: 'Monday, the small room. I'm going to tell you how it was before you.'",
      es: "Vale, en el carro: 'El lunes, el salón pequeño. Te voy a contar cómo era antes de ti'.",
    },
    {
      en: "Doña Estela: 'Come home. There's soup.'",
      es: "Doña Estela: 'Vente a la casa. Hay sopa'.",
    },
  ],
  reviewWords: [
    { word: "rows", es: "filas" },
    { word: "circle", es: "círculo" },
    { word: "changed", es: "cambió" },
    { word: "habit", es: "hábito" },
    { word: "still", es: "todavía" },
  ],
  blurb: {
    en: "Monday, 7:00 a.m. The small room at the academy, the chairs in a circle. Vale tells the story she has never told: how she used to teach, what changed it, and what she does now. It takes her four sentences. Then she asks Dani for his. He gives it in five, with the part that hasn't changed at the end.",
    es: "Lunes, 7:00 a.m. El salón pequeño de la academia, las sillas en círculo. Vale cuenta la historia que nunca ha contado: cómo enseñaba antes, qué lo cambió y qué hace ahora. Le toma cuatro frases. Luego le pide a Dani la suya. Él la da en cinco, con la parte que no ha cambiado al final.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Monday, 7:00 a.m.; the small classroom at Vale's academy; twelve chairs in a circle, a whiteboard with nothing on it; Vale already sitting in one chair in her mustard blouse; Dani in the doorway with his backpack, not yet inside.",
      text: "Monday, 7:00 a.m. The small room. She got there first.",
      es: "Lunes, 7:00 a.m. El salón pequeño. Ella llegó primero.",
      speaker: "vale",
      cast: ["vale", "dani"],
      lines: [
        {
          speaker: "vale",
          text: "Sit anywhere. That's the point of a circle. Nine years ago there wasn't one.",
          es: "Sentate donde quieras. Ese es el punto de un círculo. Hace nueve años no había uno.",
        },
        {
          speaker: "dani",
          text: "You said you'd tell me how it was before me.",
          es: "Dijiste que me ibas a contar cómo era antes de mí.",
        },
        {
          speaker: "vale",
          text: "I'm going to. It's short. Nobody's ever heard it because it isn't a good story.",
          es: "Lo voy a hacer. Es corto. Nadie lo ha oído porque no es una buena historia.",
        },
      ],
      words: [
        { word: "circle", es: "círculo" },
        { word: "anywhere", es: "donde sea" },
        { word: "short", es: "corto" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale in her chair, looking at the empty whiteboard, not at Dani; behind her, faint marks on the floor where chair legs used to stand in straight rows.",
      text: "How it was.",
      es: "Cómo era.",
      speaker: "vale",
      cast: ["vale", "dani"],
      lines: [
        {
          speaker: "vale",
          text: "I used to put the chairs in rows. Six rows of four. I used to talk for fifty minutes and the students used to write. I didn't use to let anyone speak until week three, because I thought speaking too early made mistakes permanent.",
          es: "Antes ponía las sillas en filas. Seis filas de cuatro. Hablaba cincuenta minutos y los estudiantes escribían. No dejaba hablar a nadie hasta la semana tres, porque creía que hablar demasiado pronto hacía permanentes los errores.",
        },
        {
          speaker: "dani",
          text: "Did it work?",
          es: "¿Funcionaba?",
        },
        {
          speaker: "vale",
          text: "They passed the tests. They couldn't order a coffee. I knew it and I kept the rows, because the rows were mine.",
          es: "Pasaban los exámenes. No podían pedir un café. Lo sabía y mantuve las filas, porque las filas eran mías.",
        },
      ],
      words: [
        { word: "rows", es: "filas" },
        { word: "permanent", es: "permanente" },
        { word: "tests", es: "exámenes" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Close on Vale, finally looking at Dani; Dani sitting very still in the chair nearest the door, the same chair from the interview in the last room.",
      text: "What changed it.",
      es: "Qué lo cambió.",
      speaker: "vale",
      cast: ["vale", "dani"],
      lines: [
        {
          speaker: "vale",
          text: "What changed was a Tuesday. A student came in late, sat in the last row, and when I asked his name he opened his mouth and nothing came out. Twenty-three people turned around to look. He came back Wednesday. That's the whole story.",
          es: "Lo que cambió fue un martes. Un estudiante entró tarde, se sentó en la última fila, y cuando le pregunté su nombre abrió la boca y no salió nada. Veintitrés personas se voltearon a mirarlo. Volvió el miércoles. Esa es toda la historia.",
        },
        {
          speaker: "dani",
          text: "That was me.",
          es: "Ese era yo.",
        },
        {
          speaker: "vale",
          text: "That was you. I didn't put the chairs in a circle for you. I did it because I couldn't see your face from the front, and I needed to know if you'd come back a third time.",
          es: "Ese eras vos. No puse las sillas en círculo por vos. Lo hice porque no podía ver tu cara desde el frente, y necesitaba saber si ibas a volver una tercera vez.",
        },
      ],
      words: [
        { word: "late", es: "tarde" },
        { word: "mouth", es: "boca" },
        { word: "face", es: "cara" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "The room from above: the circle of twelve chairs, Vale and Dani the only two people in it, sitting across from each other; morning light on the floor.",
      text: "How it is now. And the result.",
      es: "Cómo es ahora. Y el resultado.",
      speaker: "vale",
      cast: ["vale", "dani"],
      lines: [
        {
          speaker: "vale",
          text: "Now nobody sits in the back, because there is no back. Now they speak on day one, badly, and I write nothing down. The result is that they still pass the tests, and they can also order the coffee. Three hundred students. One chair.",
          es: "Ahora nadie se sienta atrás, porque no hay atrás. Ahora hablan el día uno, mal, y yo no anoto nada. El resultado es que siguen pasando los exámenes, y también pueden pedir el café. Trescientos estudiantes. Una silla.",
        },
        {
          speaker: "dani",
          text: "And what hasn't changed?",
          es: "¿Y qué no ha cambiado?",
        },
        {
          speaker: "vale",
          text: "I still stand by the door. When someone else is teaching, I still can't come in. You've seen it. Twice this month.",
          es: "Todavía me quedo parada en la puerta. Cuando alguien más está enseñando, todavía no puedo entrar. Lo has visto. Dos veces este mes.",
        },
      ],
      words: [
        { word: "back", es: "atrás" },
        { word: "result", es: "resultado" },
        { word: "still", es: "todavía" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale standing now, one hand on the back of a chair; Dani still seated, looking up at her; the whiteboard behind them with nothing on it.",
      text: "Then she asks for his.",
      es: "Entonces ella pide la de él.",
      speaker: "vale",
      cast: ["vale", "dani"],
      lines: [
        {
          speaker: "vale",
          text: "Now yours. Not the version from the livestream. A habit you used to have and don't have now.",
          es: "Ahora la tuya. No la versión del en vivo. Un hábito que tenías y ya no tenés.",
        },
        {
          speaker: "dani",
          text: "I used to translate every sentence in my head before I said it. Spanish first, then English, then out loud. It took four seconds and by then the customer had already asked the next question.",
          es: "Antes traducía cada frase en mi cabeza antes de decirla. Primero español, luego inglés, luego en voz alta. Tomaba cuatro segundos y para entonces el cliente ya había hecho la siguiente pregunta.",
        },
        {
          speaker: "vale",
          text: "What changed?",
          es: "¿Qué cambió?",
        },
      ],
      words: [
        { word: "habit", es: "hábito" },
        { word: "translate", es: "traducir" },
        { word: "sentence", es: "frase" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Close on Dani in the chair, one hand open on his knee, counting nothing; Vale's shadow across the floor.",
      text: "Change, now, result, and the honest part.",
      es: "Cambio, ahora, resultado, y la parte honesta.",
      speaker: "dani",
      cast: ["dani", "vale"],
      lines: [
        {
          speaker: "dani",
          text: "What changed was a call on my first day on the floor. I translated, the customer hung up, and I lost him in four minutes. After that, I decided to count five seconds and say the wrong thing instead of the late thing. Now I count, then I answer in the language the question came in. The result is that I make more mistakes and lose fewer customers.",
          es: "Lo que cambió fue una llamada en mi primer día en el piso. Traduje, el cliente colgó, y lo perdí en cuatro minutos. Después de eso, decidí contar cinco segundos y decir lo incorrecto en vez de lo tardío. Ahora cuento, y luego respondo en el idioma en que vino la pregunta. El resultado es que cometo más errores y pierdo menos clientes.",
        },
        {
          speaker: "vale",
          text: "And what hasn't changed?",
          es: "¿Y qué no ha cambiado?",
        },
        {
          speaker: "dani",
          text: "I still rehearse on the bus. Out loud. People still stare.",
          es: "Todavía ensayo en el bus. En voz alta. La gente todavía se me queda viendo.",
        },
      ],
      words: [
        { word: "count", es: "contar" },
        { word: "mistakes", es: "errores" },
        { word: "stare", es: "quedarse viendo" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Northline, 11:30 a.m.; Camila at the end of the row with her tablet showing a launch checklist titled BOGOTÁ, TUESDAY 8:00; Dani reading it over her shoulder; Mía at her desk, headset on, half listening.",
      text: "11:30 a.m. Northline. Tomorrow is Bogotá.",
      es: "11:30 a.m. Northline. Mañana es Bogotá.",
      speaker: "camila",
      cast: ["camila", "dani", "mia"],
      lines: [
        {
          speaker: "camila",
          text: "Second cohort in Bogotá, forty agents, eight a.m. tomorrow, you on the big screen from here, Julieta in the room. Slides are approved. Legal approved them on Friday, before the vote. I'm not asking what that means.",
          es: "Segunda cohorte en Bogotá, cuarenta agentes, ocho de la mañana, vos en la pantalla grande desde aquí, Julieta en la sala. Las diapositivas están aprobadas. Legal las aprobó el viernes, antes del voto. No estoy preguntando qué significa eso.",
        },
        {
          speaker: "dani",
          text: "It means the slides are approved. Forty agents. Is the building's power reliable?",
          es: "Significa que las diapositivas están aprobadas. Cuarenta agentes. ¿La electricidad del edificio es confiable?",
        },
        {
          speaker: "mia",
          text: "Why would you ask that?",
          es: "¿Por qué preguntarías eso?",
        },
        {
          speaker: "dani",
          text: "Because Julieta asked me the same thing on Friday, and she doesn't ask things for no reason.",
          es: "Porque Julieta me preguntó lo mismo el viernes, y ella no pregunta cosas sin razón.",
        },
      ],
      words: [
        { word: "cohort", es: "cohorte" },
        { word: "slides", es: "diapositivas" },
        { word: "reliable", es: "confiable" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "The academy again, 6:00 p.m.; Vale at the door of the small room handing Dani a single old brass key; the circle of chairs behind them, one chair pulled slightly out.",
      text: "6:00 p.m. Back at the academy. A key.",
      es: "6:00 p.m. De vuelta en la academia. Una llave.",
      speaker: "vale",
      cast: ["vale", "dani"],
      lines: [
        {
          speaker: "vale",
          text: "This room is yours on Thursdays. It was already yours, but now it has a key. Whatever Northline decides about the pilot, the chairs don't belong to Northline.",
          es: "Este salón es tuyo los jueves. Ya era tuyo, pero ahora tiene llave. Decida lo que decida Northline sobre el piloto, las sillas no son de Northline.",
        },
        {
          speaker: "dani",
          text: "You think they're going to decide something.",
          es: "Pensás que van a decidir algo.",
        },
        {
          speaker: "vale",
          text: "I think legal approved your slides before a vote it knew it was going to lose. Take the key.",
          es: "Pienso que legal aprobó tus diapositivas antes de un voto que sabía que iba a perder. Agarrá la llave.",
        },
      ],
      words: [
        { word: "key", es: "llave" },
        { word: "belong", es: "pertenecer" },
        { word: "decide", es: "decidir" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Night; the bus stop; Nico and Dani on the bench; Nico with his hood down, arriving for the night shift, a coffee in each hand; the Northline sign lit behind them.",
      text: "9:40 p.m. Nico, going in as Dani goes out.",
      es: "9:40 p.m. Nico entrando mientras Dani sale.",
      speaker: "nico",
      cast: ["nico", "dani"],
      lines: [
        {
          speaker: "nico",
          text: "Mía says Vale told you the origin story. The circle.",
          es: "Mía dice que Vale te contó la historia del origen. El círculo.",
        },
        {
          speaker: "dani",
          text: "It wasn't a method. She couldn't see my face from the front. So she moved the chairs.",
          es: "No era un método. No podía ver mi cara desde el frente. Así que movió las sillas.",
        },
        {
          speaker: "nico",
          text: "So the whole thing is a chair.",
          es: "Entonces todo esto es una silla.",
        },
        {
          speaker: "dani",
          text: "The whole thing is a chair. Drink your coffee. Tomorrow is Bogotá.",
          es: "Todo esto es una silla. Tomate tu café. Mañana es Bogotá.",
        },
      ],
      words: [
        { word: "origin", es: "origen" },
        { word: "moved", es: "movió" },
        { word: "chair", es: "silla" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "Why did Vale change the rows into a circle?",
      questionEs: "¿Por qué Vale cambió las filas por un círculo?",
      options: [
        { label: "Because she couldn't see Dani's face from the front", emoji: "👀" },
        { label: "Because a book recommended it", emoji: "📘" },
        { label: "Because the room was too small for rows", emoji: "📏" },
      ],
      answer: 0,
      sayIt: "What changed was a student who couldn't say his name. She put the chairs in a circle because she couldn't see his face from the front.",
      sayItEs: "Lo que cambió fue un estudiante que no podía decir su nombre. Puso las sillas en círculo porque no podía ver su cara desde el frente.",
      sayItCheck: {
        target: "* couldn't see his face *",
        altTargets: ["What changed was *", "She put the chairs in a circle *", "* see his face from the front"],
      },
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "A habit you used to have and don't have now. How it was, what changed it, what you do now, the result, and what hasn't changed yet.",
      questionEs: "Un hábito que tenías y ya no tienes. Cómo era, qué lo cambió, qué haces ahora, el resultado, y qué no ha cambiado todavía.",
      options: [
        { label: "I am ready to answer", emoji: "🎧" },
        { label: "I want to hear Dani's version again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "I used to translate every sentence in my head before speaking. What changed was a call where I froze. Now I count five seconds and answer in English. The result is that I make more mistakes and lose fewer people. I still rehearse on the bus.",
      sayItEs: "Antes traducía cada frase en mi cabeza antes de hablar. Lo que cambió fue una llamada en la que me quedé en blanco. Ahora cuento cinco segundos y respondo en inglés. El resultado es que cometo más errores y pierdo menos gente. Todavía ensayo en el bus.",
      sayItAskEn: "Start with \"I used to ...\", then \"What changed was ...\", then \"Now I ...\", then \"The result is ...\", and close with \"I still ...\".",
      sayItAskEs: "Empieza con \"I used to …\", luego \"What changed was …\", después \"Now I …\", luego \"The result is …\" y cierra con \"I still …\".",
      sayItCheck: {
        target: "I used to *",
        altTargets: ["What changed was *", "Now I *", "The result is *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s3",
    phrase: "The thing that changed my life wasn't a method. It was one person who moved a chair so she could see my face.",
    es: "Lo que me cambió la vida no fue un método. Fue una persona que movió una silla para poder ver mi cara.",
  },
  habitCard: {
    afterScene: "s6",
    phrase: "When I tell how something changed, I end with what hasn't changed yet. The honest part goes last.",
    es: "Cuando cuento cómo cambió algo, termino con lo que no ha cambiado todavía. La parte honesta va al final.",
    model: "dani",
    modelActionEs: "Dani contó el cambio en cuatro frases y cerró con 'todavía ensayo en el bus, la gente todavía se me queda viendo'.",
  },
  expressions: [
    {
      phrase: "come back",
      variants: ["came back", "comes back", "coming back"],
      es: "volver, regresar",
      kind: "phrasal",
      example: "He came back Wednesday. That's the whole story.",
      exampleEs: "Volvió el miércoles. Esa es toda la historia.",
    },
    {
      phrase: "turn around",
      variants: ["turned around", "turns around", "turning around"],
      es: "voltearse, darse la vuelta",
      kind: "phrasal",
      example: "Twenty-three people turned around to look.",
      exampleEs: "Veintitrés personas se voltearon a mirarlo.",
    },
    {
      phrase: "for no reason",
      variants: ["for a reason", "not for no reason"],
      es: "sin razón, porque sí",
      kind: "idiom",
      example: "Julieta asked me the same thing on Friday, and she doesn't ask things for no reason.",
      exampleEs: "Julieta me preguntó lo mismo el viernes, y ella no pregunta cosas sin razón.",
    },
    {
      phrase: "the whole story",
      variants: ["that's the whole story", "not the whole story"],
      es: "toda la historia, eso es todo",
      kind: "idiom",
      example: "He came back Wednesday. That's the whole story.",
      exampleEs: "Volvió el miércoles. Esa es toda la historia.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: something about the way you work or learn that changed. How it used to be, what changed it, what you do now, the result, and one thing that hasn't changed.",
    es: "Treinta segundos: algo de tu forma de trabajar o aprender que cambió. Cómo era, qué lo cambió, qué haces ahora, el resultado, y una cosa que no ha cambiado.",
  },
  continueWith: [
    "I used to ... I didn't use to ...",
    "What changed was ... After that, ...",
    "Now I ... The result is ...",
    "I still ...",
  ],
  cliffhanger: {
    en: "Tuesday, 8:00 a.m.: forty agents in Bogotá, Dani on the big screen, and Julieta's question about the power. She wasn't asking for no reason.",
    es: "Martes, 8:00 a.m.: cuarenta agentes en Bogotá, Dani en la pantalla grande, y la pregunta de Julieta sobre la electricidad. No la hizo sin razón.",
  },
};
