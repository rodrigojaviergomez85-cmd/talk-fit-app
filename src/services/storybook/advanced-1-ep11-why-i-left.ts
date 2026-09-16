import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced1-ep11-why-i-left/cover.jpg";
import s1 from "@/assets/storybook/advanced1-ep11-why-i-left/s1.jpg";
import s2 from "@/assets/storybook/advanced1-ep11-why-i-left/s2.jpg";
import s3 from "@/assets/storybook/advanced1-ep11-why-i-left/s3.jpg";
import s4 from "@/assets/storybook/advanced1-ep11-why-i-left/s4.jpg";
import s5 from "@/assets/storybook/advanced1-ep11-why-i-left/s5.jpg";
import s6 from "@/assets/storybook/advanced1-ep11-why-i-left/s6.jpg";
import s7 from "@/assets/storybook/advanced1-ep11-why-i-left/s7.jpg";
import s8 from "@/assets/storybook/advanced1-ep11-why-i-left/s8.jpg";
import s9 from "@/assets/storybook/advanced1-ep11-why-i-left/s9.jpg";

export const ADVANCED1_EP11_WHY_I_LEFT: StorybookEpisode = {
  id: "advanced1-ep11-why-i-left",
  moduleId: "advanced-1",
  week: 3,
  title: "Why I left",
  titleEs: "Por qué me fui",
  episodeLabel: {
    en: "Advanced 1 · Episode 11",
    es: "Advanced 1 · Episodio 11",
  },
  previously: [
    {
      en: "The committee interrupted every story, and the team kept talking.",
      es: "El comité interrumpió cada historia, y el equipo siguió hablando.",
    },
    {
      en: "Then Reed said the committee would fly in and speak to the students alone.",
      es: "Luego Reed dijo que el comité vendría en avión y hablaría con los estudiantes a solas.",
    },
    {
      en: "This morning a second name appeared on the finalist list.",
      es: "Esta mañana apareció un segundo nombre en la lista de finalistas.",
    },
  ],
  reviewWords: [
    { word: "committee", es: "comité" },
    { word: "finalist", es: "finalista" },
    { word: "decision", es: "decisión" },
    { word: "method", es: "método" },
    { word: "blame", es: "culpa" },
  ],
  blurb: {
    en: "A competitor turns Vale's past into an accusation. She answers with the fact, the frame and what she wants next.",
    es: "Un competidor convierte el pasado de Vale en una acusación. Ella responde con el hecho, el marco y lo que quiere ahora.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Camila shows Vale and Dani the finalist list on a laptop in the academy office.",
      text: "A second finalist appears on the list.",
      es: "Un segundo finalista aparece en la lista.",
      speaker: "camila",
      cast: ["vale", "camila", "dani"],
      lines: [
        {
          speaker: "camila",
          text: "There is a second finalist, Vale. Crown Language Group. Forty schools, three countries, and a marketing team bigger than our whole staff.",
          es: "Hay un segundo finalista, Vale. Crown Language Group. Cuarenta escuelas, tres países y un equipo de marketing más grande que todo nuestro personal.",
        },
        {
          speaker: "dani",
          text: "If they were only bigger, I wouldn't worry. What worries me is that they've hired someone to study us.",
          es: "Si solo fueran más grandes, no me preocuparía. Lo que me preocupa es que contrataron a alguien para estudiarnos.",
        },
        {
          speaker: "vale",
          text: "Then let them study us. What they'll find is a method that works, and a founder who can explain every decision she has ever made.",
          es: "Entonces que nos estudien. Lo que van a encontrar es un método que funciona, y una fundadora que puede explicar cada decisión que ha tomado.",
        },
      ],
      words: [
        { word: "finalist", es: "finalista" },
        { word: "staff", es: "personal" },
        { word: "founder", es: "fundadora" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Mr. Reed warns Vale in a quiet hallway before the committee arrives.",
      text: "Reed warns her about the personal question.",
      es: "Reed le avisa sobre la pregunta personal.",
      speaker: "reed",
      cast: ["reed", "vale"],
      lines: [
        {
          speaker: "reed",
          text: "Before the committee meets your students, they'll ask you one personal question: why you left your last job. Crown has already framed it as a failure.",
          es: "Antes de que el comité vea a tus estudiantes, te harán una pregunta personal: por qué dejaste tu último trabajo. Crown ya lo presentó como un fracaso.",
        },
        {
          speaker: "vale",
          text: "I spent three years in a call center and I resigned to build something of my own. That's not a failure; that's a decision.",
          es: "Pasé tres años en un call center y renuncié para construir algo propio. Eso no es un fracaso; es una decisión.",
        },
        {
          speaker: "reed",
          text: "Say it in three parts, then. The fact, the positive frame, and what you want next. What sinks candidates isn't the truth — it's the blame they add to it.",
          es: "Dilo en tres partes, entonces. El hecho, el marco positivo y lo que quieres ahora. Lo que hunde a los candidatos no es la verdad; es la culpa que le agregan.",
        },
      ],
      words: [
        { word: "framed", es: "presentó, enmarcó" },
        { word: "resigned", es: "renuncié" },
        { word: "blame", es: "culpa" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale rehearses with Camila at a table, a timer on the phone between them.",
      text: "Camila takes the fact first, with no defence.",
      es: "Camila toma primero el hecho, sin defensa.",
      speaker: "camila",
      cast: ["vale", "camila"],
      lines: [
        {
          speaker: "camila",
          text: "Give me the fact only. No context, no defence.",
          es: "Dame solo el hecho. Sin contexto, sin defensa.",
        },
        {
          speaker: "vale",
          text: "I worked three years in a call center, and I resigned to open an English academy for adults.",
          es: "Trabajé tres años en un call center, y renuncié para abrir una academia de inglés para adultos.",
        },
        {
          speaker: "camila",
          text: "Good. That's nine seconds and nobody is insulted. Now the frame.",
          es: "Bien. Son nueve segundos y nadie queda insultado. Ahora el marco.",
        },
        {
          speaker: "vale",
          text: "That job is the reason my method exists. I heard two hundred adults a week freeze on the phone, and I learned exactly where fluency breaks.",
          es: "Ese trabajo es la razón por la que existe mi método. Escuché a doscientos adultos a la semana trabarse al teléfono, y aprendí exactamente dónde se rompe la fluidez.",
        },
      ],
      words: [
        { word: "defence", es: "defensa" },
        { word: "insulted", es: "insultado" },
        { word: "fluency", es: "fluidez" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Dani listens as Vale says what she wants next, standing by the office window.",
      text: "The third part is the one candidates drop.",
      es: "La tercera parte es la que los candidatos se saltan.",
      speaker: "dani",
      cast: ["vale", "dani"],
      lines: [
        {
          speaker: "dani",
          text: "And the part candidates always drop: what you want next.",
          es: "Y la parte que los candidatos siempre se saltan: lo que quieres ahora.",
        },
        {
          speaker: "vale",
          text: "I want the method operating in three countries by next year, led by teachers I've trained. That's not ambition for ambition's sake; it's the only way to make sure the work outlives me.",
          es: "Quiero el método funcionando en tres países para el próximo año, dirigido por maestros que yo he formado. No es ambición por ambición; es la única forma de asegurar que el trabajo me sobreviva.",
        },
        {
          speaker: "dani",
          text: "Say that out loud in the room and Crown's forty schools become a number, not an argument.",
          es: "Di eso en voz alta en la sala y las cuarenta escuelas de Crown se vuelven un número, no un argumento.",
        },
      ],
      words: [
        { word: "ambition", es: "ambición" },
        { word: "outlives", es: "sobrevive a" },
        { word: "argument", es: "argumento" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Ms. Barrett reads Crown's letter aloud across the committee table while Vale listens.",
      text: "Crown attacks the three years she left behind.",
      es: "Crown ataca los tres años que ella dejó atrás.",
      speaker: "barrett",
      cast: ["barrett", "vale"],
      lines: [
        {
          speaker: "barrett",
          text: "Crown's letter says your finalist left her team behind. Their leaders stay ten years; yours left after three.",
          es: "La carta de Crown dice que su finalista dejó a su equipo atrás. Sus líderes se quedan diez años; la suya se fue a los tres.",
        },
        {
          speaker: "vale",
          text: "I worked three years in a call center and resigned to open an academy. Had I stayed, I would have kept reading other people's scripts instead of writing a method that now teaches eight hundred adults.",
          es: "Trabajé tres años en un call center y renuncié para abrir una academia. Si me hubiera quedado, habría seguido leyendo los guiones de otros en vez de escribir un método que hoy enseña a ochocientos adultos.",
        },
        {
          speaker: "vale",
          text: "What I took with me wasn't a client list. It was the reason adults go quiet on a call, and that reason is what I want to take to three countries with Northline.",
          es: "Lo que me llevé no fue una lista de clientes. Fue la razón por la que los adultos se quedan callados en una llamada, y esa razón es lo que quiero llevar a tres países con Northline.",
        },
      ],
      words: [
        { word: "leaders", es: "líderes" },
        { word: "scripts", es: "guiones" },
        { word: "client list", es: "lista de clientes" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Barrett writes a note while Reed leans back and Vale holds the room's attention.",
      text: "The committee writes something down.",
      es: "El comité anota algo.",
      speaker: "barrett",
      cast: ["barrett", "reed", "vale"],
      lines: [
        {
          speaker: "barrett",
          text: "You were given an open invitation to criticise a former employer and you didn't take it up. That's been noted.",
          es: "Se le dio una invitación abierta a criticar a un empleador anterior y no la aceptó. Eso queda anotado.",
        },
        {
          speaker: "reed",
          text: "Size is easy to buy, Barrett. A reason isn't.",
          es: "El tamaño es fácil de comprar, Barrett. Una razón no.",
        },
        {
          speaker: "vale",
          text: "Then I'll keep repeating my reason until the room can say it back to me.",
          es: "Entonces seguiré repitiendo mi razón hasta que la sala me la pueda repetir.",
        },
      ],
      words: [
        { word: "invitation", es: "invitación" },
        { word: "criticise", es: "criticar" },
        { word: "employer", es: "empleador" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Camila, Dani and Vale walk out of the meeting room into the bright corridor.",
      text: "Four minutes, and not one bad word.",
      es: "Cuatro minutos, y ni una mala palabra.",
      speaker: "camila",
      cast: ["camila", "dani", "vale"],
      lines: [
        {
          speaker: "camila",
          text: "You never used the word \"bad\" about them. Not once in four minutes.",
          es: "Nunca usaste la palabra \"malo\" sobre ellos. Ni una vez en cuatro minutos.",
        },
        {
          speaker: "dani",
          text: "And it still sounded honest, which is the part nobody believes is possible.",
          es: "Y aun así sonó honesto, que es la parte que nadie cree posible.",
        },
        {
          speaker: "vale",
          text: "It isn't a trick. It's respect for the version of me who answered that phone at midnight.",
          es: "No es un truco. Es respeto por la versión de mí que contestaba ese teléfono a medianoche.",
        },
      ],
      words: [
        { word: "honest", es: "honesto" },
        { word: "trick", es: "truco" },
        { word: "respect", es: "respeto" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Reed tells Vale and Elena that the committee will sit with students alone tomorrow.",
      text: "Tomorrow the committee sits with the students.",
      es: "Mañana el comité se sienta con los estudiantes.",
      speaker: "reed",
      cast: ["reed", "vale", "elena"],
      lines: [
        {
          speaker: "reed",
          text: "Tomorrow we sit with six of your students. You won't be in the room, and we won't tell you the questions.",
          es: "Mañana nos sentamos con seis de tus estudiantes. No estarás en la sala, y no te diremos las preguntas.",
        },
        {
          speaker: "elena",
          text: "Will they ask us hard things? Because I still get nervous when someone records me.",
          es: "¿Nos harán preguntas difíciles? Porque todavía me pongo nerviosa cuando alguien me graba.",
        },
        {
          speaker: "vale",
          text: "They'll ask what changed for you. That one you've already answered a hundred times, just never to a stranger.",
          es: "Te preguntarán qué cambió para ti. Esa ya la respondiste cien veces, solo que nunca a un desconocido.",
        },
      ],
      words: [
        { word: "nervous", es: "nerviosa" },
        { word: "records", es: "graba" },
        { word: "stranger", es: "desconocido" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Camila stops Vale at the door with news about an offer sent to Rosa.",
      text: "Crown didn't only send a letter.",
      es: "Crown no solo mandó una carta.",
      speaker: "camila",
      cast: ["camila", "vale"],
      lines: [
        {
          speaker: "camila",
          text: "Vale, before you go. Crown didn't only send a letter. They sent an offer — to Rosa.",
          es: "Vale, antes de que te vayas. Crown no solo mandó una carta. Mandaron una oferta: a Rosa.",
        },
        {
          speaker: "vale",
          text: "Rosa teaches half of our adult groups. How much?",
          es: "Rosa enseña la mitad de nuestros grupos de adultos. ¿Cuánto?",
        },
        {
          speaker: "camila",
          text: "Double. And they want an answer this week.",
          es: "El doble. Y quieren respuesta esta semana.",
        },
      ],
      words: [
        { word: "offer", es: "oferta" },
        { word: "adult", es: "adulto" },
        { word: "double", es: "el doble" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What are the three parts of Vale's answer about leaving her old job?",
      questionEs: "¿Cuáles son las tres partes de la respuesta de Vale sobre dejar su trabajo anterior?",
      options: [
        { label: "The problem, the manager, and the salary", emoji: "💸" },
        { label: "The fact, the positive frame, and what she wants next", emoji: "🎯" },
        { label: "The apology, the excuse, and the promise", emoji: "🙏" },
      ],
      answer: 1,
      sayIt: "The fact, the positive frame, and what she wants next.",
      sayItEs: "El hecho, el marco positivo y lo que quiere ahora.",
      sayItCheck: {
        target: "The fact, the positive frame, and what she wants next",
        altTargets: ["The fact, the frame, and what she wants next"],
      },
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "Why did you leave a job, a school, or a project? Give the fact, one positive thing it gave you, and what you want next.",
      questionEs: "¿Por qué dejaste un trabajo, una escuela o un proyecto? Da el hecho, una cosa positiva que te dejó y lo que quieres ahora.",
      options: [
        { label: "I am ready to answer", emoji: "🎤" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "I left my first job after two years because the work had stopped teaching me anything. It gave me my first real experience with clients, and what I want next is a team where I can train other people.",
      sayItEs: "Dejé mi primer trabajo después de dos años porque el trabajo había dejado de enseñarme algo. Me dio mi primera experiencia real con clientes, y lo que quiero ahora es un equipo donde pueda formar a otras personas.",
      sayItAskEn: "What did you leave, what did it give you, and what do you want next?",
      sayItAskEs: "¿Qué dejaste, qué te dio y qué quieres ahora?",
      sayItCheck: {
        target: "I left *",
        altTargets: ["What I want next is *", "It gave me *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s6",
    phrase: "I can tell the truth about my past without blaming anyone.",
    es: "Puedo decir la verdad sobre mi pasado sin culpar a nadie.",
  },
  habitCard: {
    afterScene: "s2",
    phrase: "When I explain a decision, I give the fact, the positive frame, and what I want next.",
    es: "Cuando explico una decisión, doy el hecho, el marco positivo y lo que quiero ahora.",
    model: "vale",
    modelActionEs: "Vale explicó por qué renunció en tres partes, sin hablar mal de nadie.",
  },
  expressions: [
    {
      phrase: "say out loud",
      variants: ["say that out loud", "said out loud", "saying out loud"],
      es: "decirlo en voz alta",
      kind: "phrasal",
      example: "Say that out loud in the room and Crown's forty schools become a number.",
      exampleEs: "Di eso en voz alta en la sala y las cuarenta escuelas de Crown se vuelven un número.",
    },
    {
      phrase: "take up",
      variants: ["take it up", "took up", "taking up"],
      es: "aceptar (una invitación u oferta)",
      kind: "phrasal",
      example: "You were given an open invitation to criticise a former employer and you didn't take it up.",
      exampleEs: "Se le dio una invitación abierta a criticar a un empleador anterior y no la aceptó.",
    },
    {
      phrase: "leave behind",
      variants: ["left her team behind", "left behind", "leaves behind"],
      es: "dejar atrás (a alguien)",
      kind: "idiom",
      example: "Crown's letter says your finalist left her team behind.",
      exampleEs: "La carta de Crown dice que su finalista dejó a su equipo atrás.",
    },
    {
      phrase: "for ambition's sake",
      variants: ["ambition for ambition's sake"],
      es: "por ambición misma, sin otro fin",
      kind: "idiom",
      example: "That's not ambition for ambition's sake; it's the only way to make sure the work outlives me.",
      exampleEs: "No es ambición por ambición; es la única forma de asegurar que el trabajo me sobreviva.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: say why you left something, what it gave you, and what you want next.",
    es: "Treinta segundos: di por qué dejaste algo, qué te dio y qué quieres ahora.",
  },
  continueWith: [
    "I worked there for ...",
    "What it gave me was ...",
    "What I want next is ...",
  ],
  cliffhanger: {
    en: "Crown has offered Rosa double her salary, and Rosa teaches half of the academy.",
    es: "Crown le ofreció a Rosa el doble de su salario, y Rosa enseña la mitad de la academia.",
  },
};
