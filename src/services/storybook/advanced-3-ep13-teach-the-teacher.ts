import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced3-ep13-teach-the-teacher/cover.jpg";
import s1 from "@/assets/storybook/advanced3-ep13-teach-the-teacher/s1.jpg";
import s2 from "@/assets/storybook/advanced3-ep13-teach-the-teacher/s2.jpg";
import s3 from "@/assets/storybook/advanced3-ep13-teach-the-teacher/s3.jpg";
import s4 from "@/assets/storybook/advanced3-ep13-teach-the-teacher/s4.jpg";
import s5 from "@/assets/storybook/advanced3-ep13-teach-the-teacher/s5.jpg";
import s6 from "@/assets/storybook/advanced3-ep13-teach-the-teacher/s6.jpg";
import s7 from "@/assets/storybook/advanced3-ep13-teach-the-teacher/s7.jpg";
import s8 from "@/assets/storybook/advanced3-ep13-teach-the-teacher/s8.jpg";
import s9 from "@/assets/storybook/advanced3-ep13-teach-the-teacher/s9.jpg";

export const ADVANCED3_EP13_TEACH_THE_TEACHER: StorybookEpisode = {
  id: "advanced3-ep13-teach-the-teacher",
  moduleId: "advanced-3",
  week: 3,
  title: "Teach the teacher",
  titleEs: "Enseñarle al que enseña",
  episodeLabel: {
    en: "Advanced 3 · Episode 13",
    es: "Advanced 3 · Episodio 13",
  },
  previously: [
    {
      en: "Bogotá in the dark: one voice, forty lights, twenty cases. Julieta said 'we'.",
      es: "Bogotá a oscuras: una voz, cuarenta luces, veinte casos. Julieta dijo 'nosotros'.",
    },
    {
      en: "6:12 p.m., legal: the pilot is suspended in three countries. 'I'm not required to agree.'",
      es: "6:12 p.m., legal: el piloto queda suspendido en tres países. 'No estoy obligada a estar de acuerdo'.",
    },
    {
      en: "Nico: 'You made a plan this morning with no lights. Make that one.'",
      es: "Nico: 'Hiciste un plan esta mañana sin luces. Hacé ese'.",
    },
  ],
  reviewWords: [
    { word: "basically", es: "básicamente" },
    { word: "process", es: "proceso" },
    { word: "step", es: "paso" },
    { word: "file", es: "expediente" },
    { word: "strength", es: "fuerza" },
  ],
  blurb: {
    en: "Wednesday. Dani tells the seventeen in four sentences. At 9:30 Reed arrives in person: legal needs, for the file, an explanation of how the method works, from zero, in English. Dani explains it with Mía teaching live, and Mía makes Reed the student. That night, alone on bus 42, Dani asks for one thing, in Spanish. At home, his mother asks the question she has never asked.",
    es: "Miércoles. Dani se lo dice a los diecisiete en cuatro frases. A las 9:30 Reed llega en persona: legal necesita, para el expediente, una explicación de cómo funciona el método, desde cero, en inglés. Dani lo explica con Mía enseñando en vivo, y Mía convierte a Reed en el estudiante. Esa noche, solo en el bus 42, Dani pide una sola cosa, en español. En casa, su mamá hace la pregunta que nunca ha hecho.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Wednesday, 8:00 a.m.; the Northline training room; seventeen agents in black polos standing, not sitting, Mía and Nico at the front; Dani in front of the blank whiteboard with the printed email folded in his hand, not reading it.",
      text: "Wednesday, 8:00 a.m. Seventeen people. He doesn't read the email.",
      es: "Miércoles, 8:00 a.m. Diecisiete personas. No lee el correo.",
      speaker: "dani",
      cast: ["dani", "mia", "nico"],
      lines: [
        {
          speaker: "dani",
          text: "Basically, the pilot is suspended, in three countries, starting now. First, there's no Thursday block this week, and no class until legal closes the clip. Then your jobs continue exactly as they are; nobody loses a desk. After that, I don't know. If something goes wrong on a call, you call me. Same number.",
          es: "Básicamente, el piloto queda suspendido, en tres países, desde ahora. Primero, no hay bloque del jueves esta semana, ni clase hasta que legal cierre lo del clip. Luego, sus trabajos siguen exactamente igual; nadie pierde un escritorio. Después de eso, no sé. Si algo sale mal en una llamada, me llaman. Mismo número.",
        },
        {
          speaker: "mia",
          text: "For how long?",
          es: "¿Por cuánto tiempo?",
        },
        {
          speaker: "dani",
          text: "'Pending.' That's the only word they gave me, so it's the only one I'm giving you.",
          es: "'Pendiente'. Es la única palabra que me dieron, así que es la única que les doy.",
        },
      ],
      words: [
        { word: "basically", es: "básicamente" },
        { word: "continue", es: "continuar" },
        { word: "number", es: "número" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "The agents filing out past Dani; Nico the last one, stopping in front of him with his hood down, saying nothing; Mía at the door with her headset in her hand, not around her neck.",
      text: "8:06 a.m. Nobody argues. That's worse.",
      es: "8:06 a.m. Nadie discute. Eso es peor.",
      speaker: "nico",
      cast: ["nico", "dani", "mia"],
      lines: [
        {
          speaker: "nico",
          text: "Four sentences. You used the process voice on us.",
          es: "Cuatro frases. Usaste la voz de proceso con nosotros.",
        },
        {
          speaker: "dani",
          text: "It's the only voice that doesn't shake. I'll use the other one when I have something to say with it.",
          es: "Es la única voz que no tiembla. Usaré la otra cuando tenga algo que decir con ella.",
        },
        {
          speaker: "mia",
          text: "Reed's downstairs. In person. Barrett says he wants you at nine thirty and he brought a notebook.",
          es: "Reed está abajo. En persona. Barrett dice que te quiere a las nueve y media y que trajo un cuaderno.",
        },
      ],
      words: [
        { word: "argues", es: "discute" },
        { word: "shake", es: "temblar" },
        { word: "notebook", es: "cuaderno" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "9:30 a.m.; the glass meeting room; Mr. Reed in his navy suit with a paper notebook open and a pen, no tablet; Barrett standing by the wall; Dani sitting across from Reed with nothing in his hands.",
      text: "9:30 a.m. The man who signed it wants to know how it works.",
      es: "9:30 a.m. El hombre que lo firmó quiere saber cómo funciona.",
      speaker: "reed",
      cast: ["reed", "barrett", "dani"],
      lines: [
        {
          speaker: "reed",
          text: "Legal needs, for the file, a description of how your method works. From zero. In English, because I don't speak Spanish and I've never sat in a class. The file is what decides whether this comes back. I'm not here to be convinced. I'm here to write it down correctly.",
          es: "Legal necesita, para el expediente, una descripción de cómo funciona su método. Desde cero. En inglés, porque yo no hablo español y nunca me he sentado en una clase. El expediente es lo que decide si esto vuelve. No estoy aquí para que me convenzan. Estoy aquí para anotarlo correctamente.",
        },
        {
          speaker: "dani",
          text: "You suspended it at six and you want to learn it at nine thirty.",
          es: "Lo suspendió a las seis y quiere aprenderlo a las nueve y media.",
        },
        {
          speaker: "reed",
          text: "In that order, yes. Explain it like I'm a customer who doesn't know what he's buying. Because I am.",
          es: "En ese orden, sí. Explíquelo como si yo fuera un cliente que no sabe qué está comprando. Porque lo soy.",
        },
      ],
      words: [
        { word: "description", es: "descripción" },
        { word: "convinced", es: "convencido" },
        { word: "correctly", es: "correctamente" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Close on Dani, hands open on the table, explaining; Reed writing without looking up; Barrett's reflection in the glass behind them.",
      text: "Purpose, then steps. Like a customer who doesn't know what he's buying.",
      es: "Propósito, luego pasos. Como un cliente que no sabe qué está comprando.",
      speaker: "dani",
      cast: ["dani", "reed"],
      lines: [
        {
          speaker: "dani",
          text: "Basically, it's for one thing: getting a person to speak when they're afraid. Not to speak well. To speak. First, an agent gets a real case with a customer who won't say what's wrong. Then they have five seconds to answer, out loud, in front of one other person, and they're allowed to answer badly. After that, the other person tells them what they heard, not what was wrong. We repeat that every Thursday for ninety days. In the end, an outside auditor listens to real calls and counts.",
          es: "Básicamente, sirve para una cosa: lograr que una persona hable cuando tiene miedo. No que hable bien. Que hable. Primero, un agente recibe un caso real con un cliente que no dice qué le pasa. Luego tiene cinco segundos para responder, en voz alta, frente a otra persona, y se le permite responder mal. Después de eso, la otra persona le dice qué escuchó, no qué estuvo mal. Repetimos eso cada jueves durante noventa días. Al final, un auditor externo escucha llamadas reales y cuenta.",
        },
        {
          speaker: "reed",
          text: "'Allowed to answer badly.' I wrote that down. It's the part legal won't like and the part I understand.",
          es: "'Se le permite responder mal'. Lo anoté. Es la parte que a legal no le va a gustar y la parte que yo entiendo.",
        },
      ],
      words: [
        { word: "purpose", es: "propósito" },
        { word: "afraid", es: "con miedo" },
        { word: "allowed", es: "permitido" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "The training room, 10:00 a.m.; Mía standing at the tall table with her headset around her neck, running a five-minute round; Mr. Reed sitting on a stool as the student, his notebook closed on his knee; Dani leaning on the wall by the door, watching; Barrett in the doorway.",
      text: "10:00 a.m. The suspension starts tomorrow. Today is still allowed. Mía teaches the teacher.",
      es: "10:00 a.m. La suspensión empieza mañana. Hoy todavía se puede. Mía le enseña al que enseña.",
      speaker: "mia",
      cast: ["mia", "reed", "dani", "barrett"],
      lines: [
        {
          speaker: "mia",
          text: "Mr. Reed. You're the agent. I'm the customer. 'It doesn't work.' Five seconds. Don't think about it, just answer.",
          es: "Mr. Reed. Usted es el agente. Yo soy la clienta. 'No funciona'. Cinco segundos. No lo piense, solo responda.",
        },
        {
          speaker: "reed",
          text: "...What doesn't work? I mean, what exactly is it doing?",
          es: "...¿Qué es lo que no funciona? Digo, ¿qué está haciendo exactamente?",
        },
        {
          speaker: "mia",
          text: "Seven seconds, two questions in one, and you said 'I mean' in the middle. Congratulations. That's day one. Now tell me what you heard me say.",
          es: "Siete segundos, dos preguntas en una, y dijo 'digo' en medio. Felicidades. Ese es el día uno. Ahora dígame qué me escuchó decir.",
        },
        {
          speaker: "reed",
          text: "That it doesn't work. Nothing else. That's the problem, isn't it. There's nothing else.",
          es: "Que no funciona. Nada más. Ese es el problema, ¿verdad? No hay nada más.",
        },
      ],
      words: [
        { word: "customer", es: "cliente" },
        { word: "exactly", es: "exactamente" },
        { word: "congratulations", es: "felicidades" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Reed standing up from the stool, notebook open again, writing one more line; Mía with her arms crossed; Dani still by the wall; the whiteboard behind Mía with a single word: HEARD.",
      text: "10:08 a.m. If something goes wrong.",
      es: "10:08 a.m. Si algo sale mal.",
      speaker: "reed",
      cast: ["reed", "mia", "dani"],
      lines: [
        {
          speaker: "reed",
          text: "And if something goes wrong? On a real call, with a real customer, and the agent freezes the way I just did.",
          es: "¿Y si algo sale mal? En una llamada real, con un cliente real, y el agente se congela como yo acabo de hacerlo.",
        },
        {
          speaker: "dani",
          text: "If that happens, they do the same five seconds they did with you, except the customer is waiting. Then they say the wrong thing out loud and fix it in the next sentence. Frozen loses the customer. Wrong doesn't.",
          es: "Si eso pasa, hacen los mismos cinco segundos que hicieron con usted, solo que el cliente está esperando. Luego dicen lo incorrecto en voz alta y lo corrigen en la siguiente frase. Congelado pierde al cliente. Equivocado no.",
        },
        {
          speaker: "mia",
          text: "Then you'll be the first one here who never froze.",
          es: "Entonces usted será el primero aquí que nunca se congeló.",
        },
        {
          speaker: "reed",
          text: "It's in the file now. All of it, including the stool. I make no promises about what the file does.",
          es: "Ya está en el expediente. Todo, incluido el banco. No prometo nada sobre lo que haga el expediente.",
        },
      ],
      words: [
        { word: "freezes", es: "se congela" },
        { word: "fix", es: "corregir" },
        { word: "promises", es: "promesas" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "5:30 p.m.; the training room empty; Dani alone pushing the stool back under the tall table; the word HEARD still on the whiteboard; Mía in the doorway with her backpack.",
      text: "5:30 p.m. He puts the stool back. He doesn't erase the word.",
      es: "5:30 p.m. Devuelve el banco a su lugar. No borra la palabra.",
      speaker: "mia",
      cast: ["mia", "dani"],
      lines: [
        {
          speaker: "mia",
          text: "Was that the last one?",
          es: "¿Fue la última?",
        },
        {
          speaker: "dani",
          text: "Might be.",
          es: "Puede ser.",
        },
        {
          speaker: "mia",
          text: "Then the last student was a lawyer who signed the suspension and froze in seven seconds. If it ends, jefe, it ends funny.",
          es: "Entonces el último estudiante fue un abogado que firmó la suspensión y se congeló en siete segundos. Si se acaba, jefe, se acaba chistoso.",
        },
        {
          speaker: "dani",
          text: "Go home, Mía. You have class tonight. That one isn't suspended.",
          es: "Andate a tu casa, Mía. Tenés clase esta noche. Esa no está suspendida.",
        },
      ],
      words: [
        { word: "last", es: "última" },
        { word: "funny", es: "chistoso" },
        { word: "tonight", es: "esta noche" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Night; inside bus 42, almost empty; Dani alone in a window seat with his headset in his lap and his eyes closed, the city lights moving across his face; nobody looking at him for once.",
      text: "10:40 p.m. Bus 42. He says it in Spanish, once, and nobody hears it. This is what it means.",
      es: "10:40 p.m. Bus 42. Lo dice en español, una vez, y nadie lo oye. Esto es lo que dice.",
      speaker: "dani",
      cast: ["dani"],
      lines: [
        {
          speaker: "dani",
          text: "I'm not asking you to give it back. Give me the strength to do what I have to do tomorrow. And if I fall, to get up.",
          es: "No te pido que lo devuelvan. Dame fuerza para hacer mañana lo que toca. Y si me caigo, para levantarme.",
        },
      ],
      words: [
        { word: "strength", es: "fuerza" },
        { word: "fall", es: "caer" },
        { word: "tomorrow", es: "mañana" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "11:15 p.m.; a small kitchen at home, one light on; Doña Estela at the stove in her green blouse and cardigan, black hair with gray streaks in a low bun, a pot of soup; Dani in the doorway with his backpack, tired; the first time we see her.",
      text: "11:15 p.m. His mother, at the stove. The question she has never asked.",
      es: "11:15 p.m. Su mamá, en la estufa. La pregunta que nunca ha hecho.",
      speaker: "estela",
      cast: ["estela", "dani"],
      lines: [
        {
          speaker: "estela",
          text: "Did you pray?",
          es: "¿Oraste?",
        },
        {
          speaker: "dani",
          text: "Yes.",
          es: "Sí.",
        },
        {
          speaker: "estela",
          text: "Then eat.",
          es: "Entonces comé.",
        },
      ],
      words: [
        { word: "pray", es: "orar" },
        { word: "stove", es: "estufa" },
        { word: "eat", es: "comer" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "According to Dani, what is the method basically for?",
      questionEs: "Según Dani, ¿para qué sirve básicamente el método?",
      options: [
        { label: "Getting a person to speak when they're afraid", emoji: "🗣️" },
        { label: "Teaching perfect grammar in ninety days", emoji: "📚" },
        { label: "Passing the Crown audit with a script", emoji: "📋" },
      ],
      answer: 0,
      sayIt: "Basically, it's for getting a person to speak when they're afraid. First, a real case. Then five seconds to answer out loud. In the end, an outside auditor counts.",
      sayItEs: "Básicamente, sirve para lograr que una persona hable cuando tiene miedo. Primero, un caso real. Luego cinco segundos para responder en voz alta. Al final, un auditor externo cuenta.",
      sayItCheck: {
        target: "Basically, it's for *",
        altTargets: ["* speak when they're afraid *", "First, *", "In the end, *"],
      },
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "Explain a process you know to someone who has never done it. What it's for, the first steps, what happens after that, the result, and what happens if something goes wrong.",
      questionEs: "Explica un proceso que conoces a alguien que nunca lo ha hecho. Para qué sirve, los primeros pasos, qué pasa después, el resultado, y qué pasa si algo sale mal.",
      options: [
        { label: "I am ready to answer", emoji: "🎧" },
        { label: "I want to hear Dani's version again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "Basically, it's for returning something you bought online. First, you open the order and choose 'return'. Then you print the label and put it on the box. After that, you leave it at the post office. In the end, the refund arrives in five days. If something goes wrong, you call and ask them to review it.",
      sayItEs: "Básicamente, sirve para devolver algo que compraste en línea. Primero, abres el pedido y eliges 'devolver'. Luego imprimes la etiqueta y la pones en la caja. Después de eso, la dejas en el correo. Al final, el reembolso llega en cinco días. Si algo sale mal, llamas y pides que lo revisen.",
      sayItAskEn: "Start with \"Basically, it's for ...\", then \"First ... then ...\", then \"After that ...\", then \"In the end ...\", and close with \"If something goes wrong ...\".",
      sayItAskEs: "Empieza con \"Basically, it's for …\", luego \"First … then …\", después \"After that …\", luego \"In the end …\" y cierra con \"If something goes wrong …\".",
      sayItCheck: {
        target: "Basically, *",
        altTargets: ["It's for *", "First, *", "After that, *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s8",
    phrase: "When everything falls, I don't ask for it back. I ask for the strength to do tomorrow's work, and to get up if I fall again.",
    es: "Cuando todo se cae, no pido que me lo devuelvan. Pido fuerza para hacer el trabajo de mañana, y para levantarme si me vuelvo a caer.",
  },
  habitCard: {
    afterScene: "s1",
    phrase: "When I have to give bad news, I use the process voice: what it is, the first step, the next one, and what to do if something goes wrong.",
    es: "Cuando tengo que dar una mala noticia, uso la voz de proceso: qué es, el primer paso, el siguiente, y qué hacer si algo sale mal.",
    model: "dani",
    modelActionEs: "Dani les dijo a los diecisiete que el piloto estaba suspendido en cuatro frases con 'primero', 'luego', 'después de eso' y 'si algo sale mal', sin leer el correo.",
  },
  expressions: [
    {
      phrase: "give back",
      variants: ["gave back", "gives back", "giving it back"],
      es: "devolver",
      kind: "phrasal",
      example: "I'm not asking you to give it back.",
      exampleEs: "No te pido que lo devuelvan.",
    },
    {
      phrase: "get up",
      variants: ["got up", "gets up", "getting up"],
      es: "levantarse",
      kind: "phrasal",
      example: "And if I fall, to get up.",
      exampleEs: "Y si me caigo, para levantarme.",
    },
    {
      phrase: "for the file",
      variants: ["on file", "in the file"],
      es: "para el expediente, para que quede registrado",
      kind: "idiom",
      example: "Legal needs, for the file, a description of how your method works.",
      exampleEs: "Legal necesita, para el expediente, una descripción de cómo funciona su método.",
    },
    {
      phrase: "make no promises",
      variants: ["I make no promises", "no promises"],
      es: "no prometer nada",
      kind: "idiom",
      example: "I make no promises about what the file does.",
      exampleEs: "No prometo nada sobre lo que haga el expediente.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: explain how something works to someone who has never seen it. What it's basically for, the first two steps, what happens after that, the result, and what to do if something goes wrong.",
    es: "Treinta segundos: explica cómo funciona algo a alguien que nunca lo ha visto. Para qué sirve básicamente, los primeros dos pasos, qué pasa después, el resultado, y qué hacer si algo sale mal.",
  },
  continueWith: [
    "Basically, it's for ...",
    "First, ... Then ...",
    "After that, ... In the end, ...",
    "If something goes wrong, ...",
  ],
  cliffhanger: {
    en: "Thursday, no block at ten. Dani takes calls. At 12:10, Lidia calls with the question from the livestream: 'What if you had taken Crown's offer?'",
    es: "Jueves, sin bloque a las diez. Dani toma llamadas. A las 12:10, Lidia llama con la pregunta del en vivo: '¿Y si hubieras aceptado la oferta de Crown?'.",
  },
};
