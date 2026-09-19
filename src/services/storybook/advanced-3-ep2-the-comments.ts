import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced3-ep2-the-comments/cover.jpg";
import s1 from "@/assets/storybook/advanced3-ep2-the-comments/s1.jpg";
import s2 from "@/assets/storybook/advanced3-ep2-the-comments/s2.jpg";
import s3 from "@/assets/storybook/advanced3-ep2-the-comments/s3.jpg";
import s4 from "@/assets/storybook/advanced3-ep2-the-comments/s4.jpg";
import s5 from "@/assets/storybook/advanced3-ep2-the-comments/s5.jpg";
import s6 from "@/assets/storybook/advanced3-ep2-the-comments/s6.jpg";
import s7 from "@/assets/storybook/advanced3-ep2-the-comments/s7.jpg";
import s8 from "@/assets/storybook/advanced3-ep2-the-comments/s8.jpg";
import s9 from "@/assets/storybook/advanced3-ep2-the-comments/s9.jpg";

export const ADVANCED3_EP2_THE_COMMENTS: StorybookEpisode = {
  id: "advanced3-ep2-the-comments",
  moduleId: "advanced-3",
  week: 1,
  title: "The comments",
  titleEs: "Los comentarios",
  episodeLabel: {
    en: "Advanced 3 · Episode 2",
    es: "Advanced 3 · Episodio 2",
  },
  previously: [
    {
      en: "Two million views. Legal gave Dani eleven minutes and a statement for Friday.",
      es: "Dos millones de vistas. Legal le dio a Dani once minutos y una declaración para el viernes.",
    },
    {
      en: "Mía's name went to legal at 4:58. She isn't hiding.",
      es: "El nombre de Mía llegó a legal a las 4:58. No se está escondiendo.",
    },
    {
      en: "Vale asked what he wants. He doesn't know yet.",
      es: "Vale preguntó qué quiere. Todavía no sabe.",
    },
  ],
  reviewWords: [
    { word: "describe", es: "describir" },
    { word: "journalist", es: "periodista" },
    { word: "comments", es: "comentarios" },
    { word: "guess", es: "suposición" },
    { word: "tense", es: "tenso" },
  ],
  blurb: {
    en: "A journalist with a podcast about education asks Dani to describe the floor, live, in one minute: big picture, details, what people are doing, what may be happening. He does it well, and in the middle of it he describes Nico as the one who never smiles and never loses a customer. Nico is at the next desk. The comments notice before Dani does.",
    es: "Una periodista con un podcast sobre educación le pide a Dani que describa el piso, en vivo, en un minuto: panorama, detalles, qué hace la gente, qué puede estar pasando. Lo hace bien, y en medio describe a Nico como el que nunca sonríe y nunca pierde un cliente. Nico está en el escritorio de al lado. Los comentarios lo notan antes que Dani.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Tuesday, 10:00 a.m.; Dani at his desk with a laptop; on the screen, Renata Cruz in a crimson blazer in a podcast studio with a microphone; Mía at the next desk with her phone propped up, showing a live comment feed.",
      text: "Tuesday, 10:00 a.m. Renata Cruz has a podcast now.",
      es: "Martes, 10:00 a.m. Renata Cruz ahora tiene un podcast.",
      speaker: "renata",
      cast: ["renata", "dani", "mia"],
      lines: [
        {
          speaker: "renata",
          text: "Dani. Two million people saw forty seconds of an office. Nobody has seen the floor. Describe it for me, live, one minute. Don't sell it. Just tell me what you see.",
          es: "Dani. Dos millones de personas vieron cuarenta segundos de una oficina. Nadie ha visto el piso. Descríbemelo, en vivo, un minuto. No lo vendas. Solo dime qué ves.",
        },
        {
          speaker: "dani",
          text: "Okay. The first thing I notice is a busy floor at ten in the morning. There are about twenty people, and most of them are on calls.",
          es: "Ok. Lo primero que noto es un piso ocupado a las diez de la mañana. Hay como veinte personas, y la mayoría está en llamadas.",
        },
        {
          speaker: "mia",
          text: "Hang on, the comments are moving. Someone says 'twenty people and no windows'. There are windows.",
          es: "Espera, los comentarios se están moviendo. Alguien dice 'veinte personas y sin ventanas'. Hay ventanas.",
        },
      ],
      words: [
        { word: "podcast", es: "podcast" },
        { word: "describe", es: "describir" },
        { word: "windows", es: "ventanas" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Dani turning the laptop toward the floor: the wall screen reading BILLING, the rows of desks, headsets, two people writing, one hooded figure looking at his phone; Renata small in the corner of the screen.",
      text: "Big picture. Then details.",
      es: "Panorama. Luego detalles.",
      speaker: "dani",
      cast: ["dani", "renata"],
      lines: [
        {
          speaker: "dani",
          text: "In the front, a wall screen says today's account: billing. It's red, which means the queue is long.",
          es: "Al frente, una pantalla en la pared dice la cuenta de hoy: facturación. Está en rojo, lo que significa que la cola es larga.",
        },
        {
          speaker: "dani",
          text: "Two people are taking notes on paper, which we tell them not to do and they do anyway. One person is looking at his phone.",
          es: "Dos personas toman notas en papel, cosa que les decimos que no hagan y hacen igual. Una persona está mirando su celular.",
        },
        {
          speaker: "renata",
          text: "Which one is the kid?",
          es: "¿Cuál es el muchacho?",
        },
        {
          speaker: "dani",
          text: "The one looking at his phone. That's Nico. The one who never smiles and never loses a customer.",
          es: "El que mira su celular. Ese es Nico. El que nunca sonríe y nunca pierde un cliente.",
        },
        {
          speaker: "dani",
          text: "It looks like he's between calls; he might be reading the comments about himself, because he's not moving.",
          es: "Parece que está entre llamadas; puede que esté leyendo los comentarios sobre sí mismo, porque no se mueve.",
        },
      ],
      words: [
        { word: "queue", es: "cola" },
        { word: "notes", es: "notas" },
        { word: "smiles", es: "sonríe" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Close on Nico at the next desk, hood up, phone in hand, eyes on the screen, absolutely still; over the divider, the corner of Dani's laptop.",
      text: "Nico is at the next desk. He heard every word.",
      es: "Nico está en el escritorio de al lado. Oyó cada palabra.",
      speaker: "nico",
      cast: ["nico"],
      lines: [
        {
          speaker: "nico",
          text: "I lose customers. I lost one at 10:44 last Monday. It's in a report.",
          es: "Yo pierdo clientes. Perdí uno a las 10:44 el lunes pasado. Está en un reporte.",
        },
      ],
      words: [
        { word: "customers", es: "clientes" },
        { word: "heard", es: "oyó" },
        { word: "report", es: "reporte" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Dani half turned toward Nico's desk, one hand still on the laptop; Renata on the screen with her eyebrows up; Mía covering her mouth.",
      text: "He didn't lose it. Dani says so on air.",
      es: "No lo perdió. Dani lo dice al aire.",
      speaker: "dani",
      cast: ["dani", "renata", "mia"],
      lines: [
        {
          speaker: "dani",
          text: "He ended it. He didn't lose it. A customer who calls you a name after two warnings isn't a customer you lost; it's a call you closed. That's in the same report, paragraph two.",
          es: "La terminó. No la perdió. Un cliente que te insulta después de dos advertencias no es un cliente que perdiste; es una llamada que cerraste. Eso está en el mismo reporte, párrafo dos.",
        },
        {
          speaker: "renata",
          text: "The comments are asking me to tell you that the kid is listening.",
          es: "Los comentarios me piden que te diga que el muchacho está escuchando.",
        },
        {
          speaker: "dani",
          text: "The kid is always listening. It seems that the meeting is serious but not tense. Which is normal for a Tuesday here. That's my minute.",
          es: "El muchacho siempre está escuchando. Parece que la reunión es seria pero no tensa. Lo cual es normal para un martes aquí. Ese es mi minuto.",
        },
      ],
      words: [
        { word: "warnings", es: "advertencias" },
        { word: "closed", es: "cerraste" },
        { word: "serious", es: "seria" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Mía reading comments off her phone out loud, one hand raised; Dani rubbing his face; Renata laughing on the laptop screen.",
      text: "Then the comments do what comments do.",
      es: "Luego los comentarios hacen lo que hacen los comentarios.",
      speaker: "mia",
      cast: ["mia", "dani", "renata"],
      lines: [
        {
          speaker: "mia",
          text: "Okay, reading them out. 'Is the red-haired one single.' 'Is the plant real.' 'Does the kid have a name.' 'Is the boss a teacher or a manager.' 'Bogotá says hi.'",
          es: "Ok, los leo en voz alta. '¿La pelirroja es soltera?' '¿La planta es real?' '¿El muchacho tiene nombre?' '¿El jefe es maestro o gerente?' 'Bogotá saluda'.",
        },
        {
          speaker: "dani",
          text: "Tell them the plant is real, the kid has a name he'll give when he wants to, and the red-haired one is in university.",
          es: "Diles que la planta es real, que el muchacho tiene nombre y lo dará cuando quiera, y que la pelirroja está en la universidad.",
        },
        {
          speaker: "mia",
          text: "I can answer my own comments, jefe.",
          es: "Puedo contestar mis propios comentarios, jefe.",
        },
        {
          speaker: "renata",
          text: "And the last one? Teacher or manager?",
          es: "¿Y el último? ¿Maestro o gerente?",
        },
        {
          speaker: "dani",
          text: "If I had to guess, I'd say the comments already decided. I'm the boss in a video. The floor decides the other thing every day.",
          es: "Si tuviera que adivinar, diría que los comentarios ya decidieron. Soy el jefe en un video. El piso decide lo otro cada día.",
        },
      ],
      words: [
        { word: "single", es: "soltera" },
        { word: "university", es: "universidad" },
        { word: "decided", es: "decidieron" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Renata alone on the laptop screen now, the studio behind her, leaning back with a pen; Dani's hands on the desk in the foreground.",
      text: "Off the air. Renata keeps the camera on.",
      es: "Fuera del aire. Renata deja la cámara encendida.",
      speaker: "renata",
      cast: ["renata", "dani"],
      lines: [
        {
          speaker: "renata",
          text: "You described twenty people, a screen and a plant in one minute, and the only thing anyone will remember is one sentence about one agent. That's what describing is. You didn't list; you looked.",
          es: "Describiste veinte personas, una pantalla y una planta en un minuto, y lo único que alguien va a recordar es una frase sobre un agente. Eso es describir. No enlistaste; miraste.",
        },
        {
          speaker: "dani",
          text: "I also said it in front of him.",
          es: "También lo dije frente a él.",
        },
        {
          speaker: "renata",
          text: "If I had to guess, I'd say you don't want the interview I'm about to offer you.",
          es: "Si tuviera que adivinar, diría que no quieres la entrevista que estoy a punto de ofrecerte.",
        },
        {
          speaker: "dani",
          text: "I'd say you're right. Ask me again on Friday.",
          es: "Diría que tienes razón. Pregúntame otra vez el viernes.",
        },
      ],
      words: [
        { word: "remember", es: "recordar" },
        { word: "list", es: "enlistar" },
        { word: "interview", es: "entrevista" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Break room; Nico standing by the vending machine with his hood down, Dani in the doorway; nobody else; the machine humming.",
      text: "12:30 p.m. He has to say the thing he said, to the person he said it about.",
      es: "12:30 p.m. Tiene que decir lo que dijo, a la persona de la que lo dijo.",
      speaker: "dani",
      cast: ["dani", "nico"],
      lines: [
        {
          speaker: "dani",
          text: "'The one who never smiles and never loses a customer.' I said it live, about you, without asking you. That was wrong. Once.",
          es: "'El que nunca sonríe y nunca pierde un cliente'. Lo dije en vivo, sobre ti, sin preguntarte. Eso estuvo mal. Una vez.",
        },
        {
          speaker: "nico",
          text: "The first half is true. The second half you fixed on air. That's more than the caption did.",
          es: "La primera mitad es cierta. La segunda mitad la arreglaste al aire. Eso es más de lo que hizo el pie de foto.",
        },
        {
          speaker: "dani",
          text: "Do you want me to stop describing you?",
          es: "¿Quieres que deje de describirte?",
        },
        {
          speaker: "nico",
          text: "I want you to describe me right. You did, the second time. I'm fine.",
          es: "Quiero que me describas bien. Lo hiciste, la segunda vez. Estoy bien.",
        },
      ],
      words: [
        { word: "half", es: "mitad" },
        { word: "fixed", es: "arreglaste" },
        { word: "right", es: "bien" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Ms. Barrett at the end of the row with a printed page, a sticky note on it reading MIAMI; Dani reading the sticky note, not the page.",
      text: "5:30 p.m. Barrett has a sticky note.",
      es: "5:30 p.m. Barrett tiene una nota adhesiva.",
      speaker: "barrett",
      cast: ["barrett", "dani"],
      lines: [
        {
          speaker: "barrett",
          text: "Tomorrow, my office, nine. Bring a plan, not a minute of description. I want to know what you'd do with six months.",
          es: "Mañana, mi oficina, a las nueve. Traiga un plan, no un minuto de descripción. Quiero saber qué haría con seis meses.",
        },
        {
          speaker: "dani",
          text: "Six months of what?",
          es: "¿Seis meses de qué?",
        },
        {
          speaker: "barrett",
          text: "Read the note.",
          es: "Lea la nota.",
        },
      ],
      words: [
        { word: "sticky", es: "adhesiva" },
        { word: "plan", es: "plan" },
        { word: "months", es: "meses" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Night; the bus stop; Nico and Mía on the bench; Nico with his phone showing the comment feed, Mía reading over his shoulder; the Northline sign lit behind them.",
      text: "9:40 p.m. Nico reads the comments about himself. Once.",
      es: "9:40 p.m. Nico lee los comentarios sobre él. Una vez.",
      speaker: "nico",
      cast: ["nico", "mia"],
      lines: [
        {
          speaker: "nico",
          text: "'The kid didn't smile once.' Four thousand likes.",
          es: "'El muchacho no sonrió ni una vez'. Cuatro mil likes.",
        },
        {
          speaker: "mia",
          text: "You smiled once. Day ninety. I have it written down.",
          es: "Sonreíste una vez. Día noventa. Lo tengo anotado.",
        },
        {
          speaker: "nico",
          text: "That was a laugh. It's different.",
          es: "Eso fue una risa. Es distinto.",
        },
        {
          speaker: "mia",
          text: "Tomorrow he gets offered Miami. Six months. Read that comment.",
          es: "Mañana le ofrecen Miami. Seis meses. Lee ese comentario.",
        },
      ],
      words: [
        { word: "likes", es: "likes" },
        { word: "laugh", es: "risa" },
        { word: "offered", es: "ofrecen" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "How does Dani correct what he said about Nico, live?",
      questionEs: "¿Cómo corrige Dani, en vivo, lo que dijo de Nico?",
      options: [
        { label: "'He ended it. He didn't lose it.' A closed call is not a lost customer", emoji: "🎧" },
        { label: "He says Nico smiles all the time", emoji: "😄" },
        { label: "He asks Renata to cut that part", emoji: "✂️" },
      ],
      answer: 0,
      sayIt: "He ended it. He didn't lose it. A closed call is not a lost customer.",
      sayItEs: "La terminó. No la perdió. Una llamada cerrada no es un cliente perdido.",
      sayItCheck: {
        target: "He ended it *",
        altTargets: ["He didn't lose it *", "A closed call *", "It was a call he closed *"],
      },
    },
    {
      id: "q2",
      afterScene: "s2",
      questionEn: "Describe the room you're in right now: the big picture first, two details, what people are doing, and what may be happening.",
      questionEs: "Describe el lugar donde estás ahora: primero el panorama, dos detalles, qué hace la gente, y qué puede estar pasando.",
      options: [
        { label: "I am ready to answer", emoji: "🎧" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "The first thing I notice is a busy office in the middle of the day. Two people are taking notes. It looks like they're presenting some kind of report. They might be discussing results, because there are numbers on the screen.",
      sayItEs: "Lo primero que noto es una oficina ocupada a media mañana. Dos personas toman notas. Parece que están presentando algún tipo de reporte. Puede que estén discutiendo resultados, porque hay números en la pantalla.",
      sayItAskEn: "Start with \"The first thing I notice is ...\", give two details, then \"It looks like ...\", and close with \"They might be ..., because ...\".",
      sayItAskEs: "Empieza con \"The first thing I notice is …\", da dos detalles, luego \"It looks like …\" y cierra con \"They might be …, because …\".",
      sayItCheck: {
        target: "It looks like *",
        altTargets: ["They might be *", "It seems *", "The first thing I notice is *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s6",
    phrase: "Describing isn't listing. I say the big picture, then I look at one person and say what I see.",
    es: "Describir no es enlistar. Digo el panorama, luego miro a una persona y digo lo que veo.",
  },
  habitCard: {
    afterScene: "s7",
    phrase: "When I describe someone in public, I check with them in private the same day.",
    es: "Cuando describo a alguien en público, lo confirmo con esa persona en privado el mismo día.",
    model: "dani",
    modelActionEs: "Dani describió a Nico al aire sin preguntarle, lo corrigió al aire, y a las 12:30 fue a la sala de descanso a decírselo a él.",
  },
  expressions: [
    {
      phrase: "hang on",
      variants: ["hang on a second", "hold on"],
      es: "espera, un momento",
      kind: "phrasal",
      example: "Hang on, the comments are moving. Someone says 'twenty people and no windows'. There are windows.",
      exampleEs: "Espera, los comentarios se están moviendo. Alguien dice 'veinte personas y sin ventanas'. Hay ventanas.",
    },
    {
      phrase: "read out",
      variants: ["reading them out", "read them out", "reads out"],
      es: "leer en voz alta",
      kind: "phrasal",
      example: "Okay, reading them out. 'Is the red-haired one single.' 'Is the plant real.' 'Does the kid have a name.' 'Is the boss a teacher or a manager.' 'Bogotá says hi.'",
      exampleEs: "Ok, los leo en voz alta. '¿La pelirroja es soltera?' '¿La planta es real?' '¿El muchacho tiene nombre?' '¿El jefe es maestro o gerente?' 'Bogotá saluda'.",
    },
    {
      phrase: "if I had to guess",
      variants: ["if I had to guess,", "if I had to say"],
      es: "si tuviera que adivinar",
      kind: "idiom",
      example: "If I had to guess, I'd say the comments already decided. I'm the boss in a video. The floor decides the other thing every day.",
      exampleEs: "Si tuviera que adivinar, diría que los comentarios ya decidieron. Soy el jefe en un video. El piso decide lo otro cada día.",
    },
    {
      phrase: "on air",
      variants: ["on the air", "off the air", "live on air"],
      es: "al aire, en transmisión",
      kind: "idiom",
      example: "The first half is true. The second half you fixed on air. That's more than the caption did.",
      exampleEs: "La primera mitad es cierta. La segunda mitad la arreglaste al aire. Eso es más de lo que hizo el pie de foto.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: describe a place you know well as if someone can't see it. Big picture, two details, one person doing something, and your guess about what's going on.",
    es: "Treinta segundos: describe un lugar que conoces bien como si alguien no pudiera verlo. Panorama, dos detalles, una persona haciendo algo, y tu suposición de qué está pasando.",
  },
  continueWith: [
    "The first thing I notice is ...",
    "There are about ..., and most of them are ...",
    "It looks like ... They might be ..., because ...",
    "If I had to guess, I'd say ...",
  ],
  cliffhanger: {
    en: "Tomorrow at nine: Miami, six months, global training director. Dani has a goal, a plan and a timeline. He doesn't have the why.",
    es: "Mañana a las nueve: Miami, seis meses, director global de entrenamiento. Dani tiene meta, plan y fechas. No tiene el porqué.",
  },
};
