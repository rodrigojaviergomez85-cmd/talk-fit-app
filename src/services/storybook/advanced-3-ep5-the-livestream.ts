import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced3-ep5-the-livestream/cover.jpg";
import s1 from "@/assets/storybook/advanced3-ep5-the-livestream/s1.jpg";
import s2 from "@/assets/storybook/advanced3-ep5-the-livestream/s2.jpg";
import s3 from "@/assets/storybook/advanced3-ep5-the-livestream/s3.jpg";
import s4 from "@/assets/storybook/advanced3-ep5-the-livestream/s4.jpg";
import s5 from "@/assets/storybook/advanced3-ep5-the-livestream/s5.jpg";
import s6 from "@/assets/storybook/advanced3-ep5-the-livestream/s6.jpg";
import s7 from "@/assets/storybook/advanced3-ep5-the-livestream/s7.jpg";
import s8 from "@/assets/storybook/advanced3-ep5-the-livestream/s8.jpg";
import s9 from "@/assets/storybook/advanced3-ep5-the-livestream/s9.jpg";

export const ADVANCED3_EP5_THE_LIVESTREAM: StorybookEpisode = {
  id: "advanced3-ep5-the-livestream",
  moduleId: "advanced-3",
  week: 1,
  title: "The livestream",
  titleEs: "El en vivo",
  episodeLabel: {
    en: "Advanced 3 · Episode 5",
    es: "Advanced 3 · Episodio 5",
  },
  previously: [
    {
      en: "Mía turned down the supervisor job. Dani's plan has a question mark in month one.",
      es: "Mía rechazó el puesto de supervisora. El plan de Dani tiene un signo de interrogación en el mes uno.",
    },
    {
      en: "Legal's statement is on a tablet. Barrett said: decide how much of it you say.",
      es: "La declaración de legal está en una tablet. Barrett dijo: decida cuánto de eso dice.",
    },
    {
      en: "Friday, four p.m. Three countries. The chat asks whatever it wants.",
      es: "Viernes, cuatro p.m. Tres países. El chat pregunta lo que quiere.",
    },
  ],
  reviewWords: [
    { word: "livestream", es: "en vivo" },
    { word: "script", es: "guion" },
    { word: "structure", es: "estructura" },
    { word: "hypothetical", es: "hipotético" },
    { word: "accent", es: "acento" },
  ],
  blurb: {
    en: "Four p.m., three countries, four hundred agents in a chat. Dani reads the first line of legal's statement and the chat writes 'script' in three languages. He puts the tablet down. From then on, every question gets one second to decide what kind of answer it needs, and then an answer. The last question in the chat is the one nobody prepared him for.",
    es: "Cuatro p.m., tres países, cuatrocientos agentes en un chat. Dani lee la primera línea de la declaración de legal y el chat escribe 'guion' en tres idiomas. Baja la tablet. De ahí en adelante, cada pregunta recibe un segundo para decidir qué tipo de respuesta necesita, y luego una respuesta. La última pregunta del chat es la que nadie le preparó.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Friday, 3:58 p.m.; the training room set up as a small studio: a camera on a tripod, a ring light, a laptop showing a grid of Bogotá, Monterrey and San Salvador feeds and a scrolling chat; Dani on a stool with a tablet in his hands; Mía beside the laptop with headphones; Barrett and Mr. Reed watching through the glass.",
      text: "Friday, 3:58 p.m. Four hundred agents in the chat. Reed behind the glass.",
      es: "Viernes, 3:58 p.m. Cuatrocientos agentes en el chat. Reed detrás del vidrio.",
      speaker: "mia",
      cast: ["mia", "dani", "barrett", "reed"],
      lines: [
        {
          speaker: "mia",
          text: "Bogotá is in. Monterrey is in. Four hundred and twelve. The chat is already asking if the plant is coming.",
          es: "Bogotá está. Monterrey está. Cuatrocientos doce. El chat ya pregunta si viene la planta.",
        },
        {
          speaker: "dani",
          text: "The plant is behind me. Tell them.",
          es: "La planta está detrás de mí. Diles.",
        },
        {
          speaker: "mia",
          text: "Told them. Sixty seconds. Read the tablet or don't, jefe. Decide now.",
          es: "Dicho. Sesenta segundos. Lee la tablet o no, jefe. Decide ahora.",
        },
      ],
      words: [
        { word: "plant", es: "planta" },
        { word: "seconds", es: "segundos" },
        { word: "chat", es: "chat" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Close on the tablet in Dani's hands: a paragraph under the Northline legal header, the first sentence highlighted; his thumb on the edge of the screen.",
      text: "4:00 p.m. He reads the first line. Exactly one.",
      es: "4:00 p.m. Lee la primera línea. Exactamente una.",
      speaker: "dani",
      cast: ["dani"],
      lines: [
        {
          speaker: "dani",
          text: "'Northline values the professionalism of every agent and is proud of the conduct shown in the recent—'",
          es: "'Northline valora el profesionalismo de cada agente y está orgullosa de la conducta mostrada en el reciente...'",
        },
        {
          speaker: "dani",
          text: "...That's not me. That's a page. Let me put this down.",
          es: "...Ese no soy yo. Es una hoja. Déjenme bajar esto.",
        },
      ],
      words: [
        { word: "values", es: "valora" },
        { word: "professionalism", es: "profesionalismo" },
        { word: "conduct", es: "conducta" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "The laptop screen full of chat: the word SCRIPT repeated in English, GUION in Spanish, over and over, then a wave of hearts as the tablet leaves the frame; Mía's hand on the trackpad.",
      text: "The chat wrote 'script' in two languages. Then it stopped.",
      es: "El chat escribió 'guion' en dos idiomas. Luego se detuvo.",
      speaker: "mia",
      cast: ["mia", "dani"],
      lines: [
        {
          speaker: "mia",
          text: "They could tell. Four hundred people can tell a page from a person. Okay, they're sending questions now. First one, from Monterrey: 'Tell us about a time you froze on a call.'",
          es: "Se dieron cuenta. Cuatrocientas personas distinguen una hoja de una persona. Ok, ahora mandan preguntas. La primera, de Monterrey: 'Cuéntanos de una vez que te congelaste en una llamada'.",
        },
        {
          speaker: "dani",
          text: "Let me think. That one starts with 'tell us about a time', so it's a story. Day one of this floor, 9:40 in the morning. A customer described a problem and I filled in what broke before she finished. She hung up at 3:58. What I learned was to take five seconds before I answer. I still count them.",
          es: "Déjame pensar. Esa empieza con 'cuéntanos de una vez', así que es una historia. Día uno de este piso, 9:40 de la mañana. Una clienta describió un problema y yo completé qué se había roto antes de que terminara. Colgó a las 3:58. Lo que aprendí fue tomar cinco segundos antes de contestar. Todavía los cuento.",
        },
      ],
      words: [
        { word: "froze", es: "te congelaste" },
        { word: "story", es: "historia" },
        { word: "learned", es: "aprendí" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Dani on the stool, tablet face down on the floor beside him, hands open; on the laptop, the Bogotá feed showing a row of agents in matching THE KID T-shirts.",
      text: "Second question. Opinion. He takes one second to know it.",
      es: "Segunda pregunta. Opinión. Toma un segundo para saberlo.",
      speaker: "mia",
      cast: ["mia", "dani"],
      lines: [
        {
          speaker: "mia",
          text: "Bogotá: 'What do you think about replacing trainers with an AI tutor?'",
          es: "Bogotá: '¿Qué piensas de reemplazar entrenadores con un tutor de IA?'",
        },
        {
          speaker: "dani",
          text: "Interesting question. That's a 'what do you think', so it's an opinion, and I'll give you the position first. The way I see it, an app is for the repetitions and a room is for the fear. You can practice a phrase two hundred times alone. You can't practice being afraid alone. I'll say more about that next week, when someone asks me on purpose.",
          es: "Interesante pregunta. Es un 'qué piensas', así que es una opinión, y les doy la posición primero. Como yo lo veo, una app es para las repeticiones y un salón es para el miedo. Puedes practicar una frase doscientas veces solo. No puedes practicar tener miedo solo. Diré más de eso la próxima semana, cuando alguien me lo pregunte a propósito.",
        },
        {
          speaker: "mia",
          text: "Monterrey says 'the room is for the fear' is going on a T-shirt.",
          es: "Monterrey dice que 'el salón es para el miedo' va en una camiseta.",
        },
      ],
      words: [
        { word: "replacing", es: "reemplazar" },
        { word: "opinion", es: "opinión" },
        { word: "repetitions", es: "repeticiones" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Through the glass: Barrett with her arms folded and the smallest nod; Mr. Reed beside her with his phone out, typing; inside, Dani mid-sentence.",
      text: "Third question. Hypothetical. Reed is typing.",
      es: "Tercera pregunta. Hipotética. Reed está escribiendo.",
      speaker: "mia",
      cast: ["mia", "dani", "barrett", "reed"],
      lines: [
        {
          speaker: "mia",
          text: "San Salvador, and it's Óscar, I can see his name: 'What would you do if you had taken Crown's offer?'",
          es: "San Salvador, y es Óscar, veo su nombre: '¿Qué harías si hubieras aceptado la oferta de Crown?'",
        },
        {
          speaker: "dani",
          text: "That's a 'what would you do', so it's hypothetical: choice, why, consequence. And I'm going to do something I don't usually do, which is not answer it today. Somebody's going to ask me that in a room with no chat, and she deserves the first version. Óscar, ask me again in two weeks.",
          es: "Es un 'qué harías', así que es hipotética: elección, porqué, consecuencia. Y voy a hacer algo que no suelo hacer, que es no contestarla hoy. Alguien me la va a hacer en una sala sin chat, y ella merece la primera versión. Óscar, pregúntamelo otra vez en dos semanas.",
        },
        {
          speaker: "mia",
          text: "The chat says that's a dodge.",
          es: "El chat dice que eso es una evasiva.",
        },
        {
          speaker: "dani",
          text: "The chat is right. It's a dodge with a date on it.",
          es: "El chat tiene razón. Es una evasiva con fecha.",
        },
      ],
      words: [
        { word: "hypothetical", es: "hipotética" },
        { word: "deserves", es: "merece" },
        { word: "dodge", es: "evasiva" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Nico stepping into the frame from the side, hood down, taking the second stool without being asked; the chat on the laptop exploding with THE KID.",
      text: "Fourth question. Reflection. Nico sits down without being asked.",
      es: "Cuarta pregunta. Reflexión. Nico se sienta sin que nadie se lo pida.",
      speaker: "nico",
      cast: ["nico", "dani", "mia"],
      lines: [
        {
          speaker: "mia",
          text: "Bogotá: 'How has the kid changed since day one?' They want him, not you.",
          es: "Bogotá: '¿Cómo ha cambiado el muchacho desde el día uno?' Lo quieren a él, no a ti.",
        },
        {
          speaker: "nico",
          text: "That's a 'how has something changed', so it's a reflection. Day one I said one sentence per call. Day ninety I said four. Looking back, the one that changed everything was the sentence after I'm right. Now I say it. That's the whole change. I'm not the kid.",
          es: "Es un 'cómo ha cambiado algo', así que es una reflexión. El día uno decía una frase por llamada. El día noventa dije cuatro. Mirando atrás, la que lo cambió todo fue la frase después de tener razón. Ahora la digo. Ese es todo el cambio. No soy el muchacho.",
        },
        {
          speaker: "dani",
          text: "He sat down and did the shape before I did. In front of four hundred people.",
          es: "Se sentó e hizo la forma antes que yo. Frente a cuatrocientas personas.",
        },
        {
          speaker: "nico",
          text: "You explained it to Mía on a napkin once. I was there.",
          es: "Se lo explicaste a Mía en una servilleta una vez. Yo estaba ahí.",
        },
      ],
      words: [
        { word: "reflection", es: "reflexión" },
        { word: "changed", es: "cambió" },
        { word: "shape", es: "forma" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Close on the laptop's chat: one question pinned at the top by a moderator, in Spanish and English, the rest of the chat suddenly quiet; Mía's face reflected in the screen, not reading it out yet.",
      text: "4:41 p.m. The last question. Mía doesn't read it out. Then she does.",
      es: "4:41 p.m. La última pregunta. Mía no la lee. Luego la lee.",
      speaker: "mia",
      cast: ["mia", "dani"],
      lines: [
        {
          speaker: "mia",
          text: "Pinned. Monterrey. 'Is it true that a Northline customer asked to have a teacher removed because of her accent, and the company did it?'",
          es: "Fijada. Monterrey. '¿Es cierto que un cliente de Northline pidió que quitaran a una maestra por su acento, y la empresa lo hizo?'",
        },
        {
          speaker: "dani",
          text: "Let me think.",
          es: "Déjame pensar.",
        },
        {
          speaker: "mia",
          text: "Jefe. That one doesn't have a shape.",
          es: "Jefe. Esa no tiene forma.",
        },
        {
          speaker: "dani",
          text: "It does. It's a 'what do you think' pretending to be a 'is it true'. I'm going to answer the one it's pretending to be.",
          es: "Sí tiene. Es un 'qué piensas' fingiendo ser un 'es cierto'. Voy a contestar la que finge ser.",
        },
      ],
      words: [
        { word: "pinned", es: "fijada" },
        { word: "removed", es: "quitaran" },
        { word: "pretending", es: "fingiendo" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Through the glass: Mr. Reed's hand flat on the door, half open; Barrett's hand on his arm, stopping him; inside, Dani looking straight at the camera.",
      text: "Reed reaches for the door. Barrett stops him.",
      es: "Reed alcanza la puerta. Barrett lo detiene.",
      speaker: "barrett",
      cast: ["barrett", "reed"],
      lines: [
        {
          speaker: "reed",
          text: "He's about to answer a legal question on a livestream.",
          es: "Está a punto de contestar una pregunta legal en un en vivo.",
        },
        {
          speaker: "barrett",
          text: "He's about to answer the question the way I hired him to. If it's wrong, it's on me. Let him.",
          es: "Está a punto de contestar la pregunta como lo contraté para que lo hiciera. Si sale mal, es mi responsabilidad. Déjelo.",
        },
        {
          speaker: "reed",
          text: "This will be in writing, Ms. Barrett.",
          es: "Esto va a quedar por escrito, Ms. Barrett.",
        },
        {
          speaker: "barrett",
          text: "Everything is.",
          es: "Todo queda.",
        },
      ],
      words: [
        { word: "reaches", es: "alcanza" },
        { word: "hired", es: "contraté" },
        { word: "everything", es: "todo" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Dani alone on the stool, the tablet face down on the floor, the ring light on his face, looking into the camera, mouth just opening; the chat behind him frozen on the pinned question.",
      text: "4:42 p.m. Four hundred people. No page.",
      es: "4:42 p.m. Cuatrocientas personas. Sin hoja.",
      speaker: "dani",
      cast: ["dani"],
      lines: [
        {
          speaker: "dani",
          text: "Personally, I think—",
          es: "Personalmente, pienso que...",
        },
      ],
      words: [
        { word: "hundred", es: "cien" },
        { word: "page", es: "hoja" },
        { word: "personally", es: "personalmente" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What does Dani do with legal's statement on the livestream?",
      questionEs: "¿Qué hace Dani con la declaración de legal en el en vivo?",
      options: [
        { label: "He reads one line, says 'that's not me', and puts the tablet down", emoji: "📵" },
        { label: "He reads the whole statement and then takes questions", emoji: "📄" },
        { label: "He gives the tablet to Mía to read", emoji: "🎧" },
      ],
      answer: 0,
      sayIt: "He reads one line, says 'that's not me', and puts the tablet down.",
      sayItEs: "Lee una línea, dice 'ese no soy yo', y baja la tablet.",
      sayItCheck: {
        target: "* puts the tablet down",
        altTargets: ["He reads one line *", "He puts it down *", "That's not me *"],
      },
    },
    {
      id: "q2",
      afterScene: "s4",
      questionEn: "Someone asks you a question you didn't prepare. Take one second, say what kind of answer it needs, and give the position first.",
      questionEs: "Alguien te hace una pregunta que no preparaste. Toma un segundo, di qué tipo de respuesta necesita, y da la posición primero.",
      options: [
        { label: "I am ready to answer", emoji: "🎧" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "Interesting question. Let me think. That's an opinion, so I'll give you the position first. The way I see it, an app is for the repetitions and a room is for the fear.",
      sayItEs: "Interesante pregunta. Déjame pensar. Es una opinión, así que doy la posición primero. Como yo lo veo, una app es para las repeticiones y un salón es para el miedo.",
      sayItAskEn: "Start with \"Interesting question\" or \"Let me think\", say what kind of answer it is, then \"The way I see it, ...\" or \"Looking back, ...\".",
      sayItAskEs: "Empieza con \"Interesting question\" o \"Let me think\", di qué tipo de respuesta es, luego \"The way I see it, …\" o \"Looking back, …\".",
      sayItCheck: {
        target: "Let me think *",
        altTargets: ["Interesting question *", "The way I see it *", "Looking back *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s2",
    phrase: "Four hundred people can tell a page from a person. I'd rather be the person.",
    es: "Cuatrocientas personas distinguen una hoja de una persona. Prefiero ser la persona.",
  },
  habitCard: {
    afterScene: "s6",
    phrase: "Before I answer a question I didn't prepare, I take one second to decide what kind of answer it needs.",
    es: "Antes de contestar una pregunta que no preparé, tomo un segundo para decidir qué tipo de respuesta necesita.",
    model: "nico",
    modelActionEs: "Nico oyó 'cómo ha cambiado', dijo que era una reflexión, y contestó con el día uno, el día noventa y lo que cambió, frente a cuatrocientas personas.",
  },
  expressions: [
    {
      phrase: "put down",
      variants: ["put this down", "put it down", "puts down", "putting down"],
      es: "bajar, soltar (algo que se tiene en la mano)",
      kind: "phrasal",
      example: "...That's not me. That's a page. Let me put this down.",
      exampleEs: "...Ese no soy yo. Es una hoja. Déjenme bajar esto.",
    },
    {
      phrase: "sit down",
      variants: ["sat down", "sits down", "sitting down"],
      es: "sentarse",
      kind: "phrasal",
      example: "He sat down and did the shape before I did. In front of four hundred people.",
      exampleEs: "Se sentó e hizo la forma antes que yo. Frente a cuatrocientas personas.",
    },
    {
      phrase: "the way I see it",
      variants: ["the way I see it,", "as I see it"],
      es: "como yo lo veo",
      kind: "idiom",
      example: "The way I see it, an app is for the repetitions and a room is for the fear.",
      exampleEs: "Como yo lo veo, una app es para las repeticiones y un salón es para el miedo.",
    },
    {
      phrase: "a dodge",
      variants: ["dodge the question", "that's a dodge"],
      es: "una evasiva",
      kind: "idiom",
      example: "The chat is right. It's a dodge with a date on it.",
      exampleEs: "El chat tiene razón. Es una evasiva con fecha.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: someone asks you 'what do you think about ...' with no warning. Take one second, name the kind of answer, position first, one reason, close.",
    es: "Treinta segundos: alguien te pregunta 'qué piensas de…' sin aviso. Toma un segundo, nombra el tipo de respuesta, posición primero, una razón, cierre.",
  },
  continueWith: [
    "Interesting question. Let me think.",
    "That's an opinion, so the position first: the way I see it, ...",
    "One reason is ... For example, ...",
    "Looking back, ...",
  ],
  cliffhanger: {
    en: "Next week: the accent question, answered in forty seconds, in a podcast, by the man who learned English as an adult on bus 42. And a director who thinks he's a meme.",
    es: "La próxima semana: la pregunta del acento, contestada en cuarenta segundos, en un podcast, por el hombre que aprendió inglés de adulto en el bus 42. Y un director que cree que es un meme.",
  },
};
