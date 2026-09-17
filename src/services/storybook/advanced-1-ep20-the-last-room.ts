import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced1-ep20-the-last-room/cover.jpg";
import s1 from "@/assets/storybook/advanced1-ep20-the-last-room/s1.jpg";
import s2 from "@/assets/storybook/advanced1-ep20-the-last-room/s2.jpg";
import s3 from "@/assets/storybook/advanced1-ep20-the-last-room/s3.jpg";
import s4 from "@/assets/storybook/advanced1-ep20-the-last-room/s4.jpg";
import s5 from "@/assets/storybook/advanced1-ep20-the-last-room/s5.jpg";
import s6 from "@/assets/storybook/advanced1-ep20-the-last-room/s6.jpg";
import s7 from "@/assets/storybook/advanced1-ep20-the-last-room/s7.jpg";
import s8 from "@/assets/storybook/advanced1-ep20-the-last-room/s8.jpg";
import s9 from "@/assets/storybook/advanced1-ep20-the-last-room/s9.jpg";

export const ADVANCED1_EP20_THE_LAST_ROOM: StorybookEpisode = {
  id: "advanced1-ep20-the-last-room",
  moduleId: "advanced-1",
  week: 4,
  title: "The last room",
  titleEs: "La última sala",
  episodeLabel: {
    en: "Advanced 1 · Episode 20",
    es: "Advanced 1 · Episodio 20",
  },
  previously: [
    {
      en: "The first pilot group starts on Monday.",
      es: "El primer grupo del piloto arranca el lunes.",
    },
    {
      en: "The board will watch the session from the back.",
      es: "La junta verá la sesión desde atrás.",
    },
    {
      en: "And they will question Vale at the end of it.",
      es: "Y al final interrogarán a Vale.",
    },
  ],
  reviewWords: [
    { word: "pilot", es: "plan piloto" },
    { word: "board", es: "junta directiva" },
    { word: "measurement", es: "medición" },
    { word: "operation", es: "operación" },
    { word: "quarterly", es: "trimestral" },
  ],
  blurb: {
    en: "Nineteen students, two countries, and a board with hard questions. The last room of Advanced 1.",
    es: "Diecinueve estudiantes, dos países y una junta con preguntas duras. La última sala de Advanced 1.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Lidia and Vale look at the full classroom five minutes before the pilot starts.",
      text: "Monday, 8:55.",
      es: "Lunes, 8:55.",
      speaker: "lidia",
      cast: ["lidia", "vale"],
      lines: [
        {
          speaker: "lidia",
          text: "Nineteen students, two countries, and the board watching from the back. No pressure.",
          es: "Diecinueve estudiantes, dos países y la junta mirando desde atrás. Nada de presión.",
        },
        {
          speaker: "vale",
          text: "Teach the class you'd teach if nobody were watching. They're here to see students speak, not to see us perform.",
          es: "Da la clase que darías si nadie mirara. Vinieron a ver estudiantes hablando, no a vernos actuar.",
        },
        {
          speaker: "lidia",
          text: "Easy to say from the back of the room.",
          es: "Fácil decirlo desde el fondo de la sala.",
        },
        {
          speaker: "vale",
          text: "I'm not at the back. I'm in the second row, and I'm not saying a word for fifty minutes.",
          es: "No estoy al fondo. Estoy en la segunda fila, y no voy a decir una palabra en cincuenta minutos.",
        },
        {
          speaker: "lidia",
          text: "That's the first promise of yours I don't believe.",
          es: "Esa es la primera promesa tuya que no me creo.",
        },
      ],
      words: [
        { word: "pressure", es: "presión" },
        { word: "perform", es: "actuar" },
        { word: "watching", es: "mirando" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Elena speaks in class while Lidia guides her.",
      text: "The class.",
      es: "La clase.",
      speaker: "elena",
      cast: ["elena", "lidia"],
      lines: [
        {
          speaker: "elena",
          text: "I've been studying for eleven months, and today is the first time I've been asked a question by someone from another country.",
          es: "Llevo once meses estudiando, y hoy es la primera vez que alguien de otro país me hace una pregunta.",
        },
        {
          speaker: "lidia",
          text: "Answer it the way we practised: answer, reason, example.",
          es: "Respóndela como practicamos: respuesta, razón, ejemplo.",
        },
        {
          speaker: "elena",
          text: "My hands are shaking.",
          es: "Me tiemblan las manos.",
        },
        {
          speaker: "lidia",
          text: "Let them shake. Start with the answer and the rest will follow.",
          es: "Que tiemblen. Empieza por la respuesta y lo demás viene solo.",
        },
        {
          speaker: "elena",
          text: "Yes, we do handle refunds — because the client calls us first, and last week I took six of those calls myself.",
          es: "Sí, manejamos reembolsos, porque el cliente nos llama primero, y la semana pasada yo misma atendí seis de esas llamadas.",
        },
      ],
      words: [
        { word: "practised", es: "practicamos" },
        { word: "reason", es: "razón" },
        { word: "example", es: "ejemplo" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Barrett opens the board's questions after the session.",
      text: "The board begins.",
      es: "La junta empieza.",
      speaker: "barrett",
      cast: ["barrett", "vale"],
      lines: [
        {
          speaker: "barrett",
          text: "Round one. In one sentence, what did we just buy?",
          es: "Ronda uno. En una frase, ¿qué acabamos de comprar?",
        },
        {
          speaker: "vale",
          text: "Nineteen adults who will be answering clients in English by March, and the measurements that prove it.",
          es: "Diecinueve adultos que estarán respondiéndole a clientes en inglés para marzo, y las mediciones que lo prueban.",
        },
        {
          speaker: "barrett",
          text: "By March, or you hope by March?",
          es: "¿Para marzo, o esperas que para marzo?",
        },
        {
          speaker: "vale",
          text: "By March. If it slips, you'll hear it from me in week six, not in month four.",
          es: "Para marzo. Si se atrasa, lo sabrás por mí en la semana seis, no en el mes cuatro.",
        },
        {
          speaker: "barrett",
          text: "Write that down. Round two.",
          es: "Anota eso. Ronda dos.",
        },
      ],
      words: [
        { word: "measurements", es: "mediciones" },
        { word: "prove", es: "probar" },
        { word: "round", es: "ronda" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Barrett asks the hostile question about the method depending on Vale.",
      text: "Round two, the hostile one.",
      es: "Ronda dos, la hostil.",
      speaker: "barrett",
      cast: ["barrett", "vale"],
      lines: [
        {
          speaker: "barrett",
          text: "Crown says this method is teacher-dependent. If you disappeared tomorrow, what happens?",
          es: "Crown dice que este método depende de la maestra. Si desaparecieras mañana, ¿qué pasa?",
        },
        {
          speaker: "vale",
          text: "Lidia teaches Monday, Dani runs the operation, and the measurement doesn't change. That's why the plan names people instead of naming me.",
          es: "Lidia enseña el lunes, Dani dirige la operación y la medición no cambia. Por eso el plan nombra personas en vez de nombrarme a mí.",
        },
        {
          speaker: "barrett",
          text: "Crown would say you're protecting your own job with that answer.",
          es: "Crown diría que con esa respuesta proteges tu propio puesto.",
        },
        {
          speaker: "vale",
          text: "Crown offered me a job three weeks ago. I said no, and the reason is sitting in this room teaching without me.",
          es: "Crown me ofreció un puesto hace tres semanas. Dije que no, y la razón está en esta sala enseñando sin mí.",
        },
        {
          speaker: "barrett",
          text: "That's on the record now.",
          es: "Eso queda en acta.",
        },
      ],
      words: [
        { word: "teacher-dependent", es: "dependiente de la maestra" },
        { word: "disappeared", es: "desaparecieras" },
        { word: "operation", es: "operación" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Reed asks about expanding the pilot to Mexico by June.",
      text: "Round three, the money.",
      es: "Ronda tres, el dinero.",
      speaker: "reed",
      cast: ["reed", "vale"],
      lines: [
        {
          speaker: "reed",
          text: "If the pilot works, Northline wants it in Mexico by June. Can you step up that fast?",
          es: "Si el piloto funciona, Northline lo quiere en México para junio. ¿Puedes dar ese paso tan rápido?",
        },
        {
          speaker: "vale",
          text: "Only if we hire teachers in February, so the answer is yes with a date attached, not yes to be polite.",
          es: "Solo si contratamos maestros en febrero, así que la respuesta es sí con una fecha, no un sí por cortesía.",
        },
        {
          speaker: "reed",
          text: "And if February is too early for our budget?",
          es: "¿Y si febrero es muy pronto para nuestro presupuesto?",
        },
        {
          speaker: "vale",
          text: "Then June becomes September, and I'd rather tell you that today than apologise for it in July.",
          es: "Entonces junio se vuelve septiembre, y prefiero decírtelo hoy que disculparme en julio.",
        },
        {
          speaker: "reed",
          text: "You've changed since the first time we met.",
          es: "Has cambiado desde la primera vez que nos vimos.",
        },
        {
          speaker: "vale",
          text: "No. You're just hearing the same person with the budget in the room.",
          es: "No. Solo estás oyendo a la misma persona con el presupuesto en la sala.",
        },
      ],
      words: [
        { word: "step up", es: "dar el paso, subir de nivel" },
        { word: "attached", es: "adjunta, al lado" },
        { word: "polite", es: "cortés" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Camila speaks to the board about the service side of the pilot.",
      text: "Round four, Camila.",
      es: "Ronda cuatro, Camila.",
      speaker: "camila",
      cast: ["camila", "barrett"],
      lines: [
        {
          speaker: "camila",
          text: "My side is the part nobody asks about, so I'll say it before you do. In the first month, complaints go up, not down, because students are suddenly being asked to speak and some of them hate it.",
          es: "Mi parte es la que nadie pregunta, así que la digo antes de que lo hagan. En el primer mes las quejas suben, no bajan, porque de pronto les piden hablar y a algunos les molesta.",
        },
        {
          speaker: "barrett",
          text: "You're telling a board that complaints will rise.",
          es: "Le estás diciendo a una junta que las quejas van a subir.",
        },
        {
          speaker: "camila",
          text: "I'd rather tell you now than let you discover it in the quarterly report.",
          es: "Prefiero decírtelo ahora que dejar que lo descubras en el reporte trimestral.",
        },
        {
          speaker: "barrett",
          text: "Then what do you do about it?",
          es: "¿Y qué hacen al respecto?",
        },
        {
          speaker: "camila",
          text: "We call every person who misses twice, in their language, within forty-eight hours. Last year that single habit carried over into the corporate groups and cut cancellations by a third, and it costs nothing except the discipline to make the call when we're busy.",
          es: "Llamamos a cada persona que falta dos veces, en su idioma, en menos de cuarenta y ocho horas. El año pasado ese solo hábito se trasladó a los grupos corporativos y redujo las cancelaciones en un tercio, y no cuesta nada salvo la disciplina de llamar cuando estamos ocupados.",
        },
        {
          speaker: "barrett",
          text: "Who makes those calls when you're in three countries?",
          es: "¿Quién hace esas llamadas cuando estén en tres países?",
        },
        {
          speaker: "camila",
          text: "A team I haven't been given yet. That's my ask.",
          es: "Un equipo que todavía no me han dado. Esa es mi petición.",
        },
      ],
      words: [
        { word: "carried over", es: "se trasladó, se extendió" },
        { word: "cancellations", es: "cancelaciones" },
        { word: "discipline", es: "disciplina" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Dani speaks personally to the board while Barrett listens.",
      text: "Round five, Dani says the quiet thing.",
      es: "Ronda cinco, Dani dice lo que nadie dice.",
      speaker: "dani",
      cast: ["dani", "barrett"],
      lines: [
        {
          speaker: "dani",
          text: "May I add something personal? I didn't study business. Four years ago, I was answering phones here, and I learned most of this on the job, often by being corrected in public.",
          es: "¿Puedo agregar algo personal? No estudié negocios. Hace cuatro años contestaba llamadas aquí, y gran parte de lo que sé lo aprendí trabajando, muchas veces después de que me corrigieran frente a otros.",
        },
        {
          speaker: "barrett",
          text: "And where do you want that to take you?",
          es: "¿Y hasta dónde quieres llegar con eso?",
        },
        {
          speaker: "dani",
          text: "I want to oversee several branches one day, and after that, I want to be part of the decisions that shape how the company operates.",
          es: "Quiero llegar a supervisar varias sedes algún día y, después, quiero formar parte de las decisiones que definen cómo funciona la empresa.",
        },
        {
          speaker: "barrett",
          text: "Most people say that in private.",
          es: "La mayoría dice eso en privado.",
        },
        {
          speaker: "dani",
          text: "I know it sounds ambitious. I'm saying it anyway, because on Friday I learned that waiting to be noticed isn't a plan.",
          es: "Sé que suena ambicioso. Aun así lo digo, porque el viernes aprendí que esperar a que te noten no es un plan.",
        },
        {
          speaker: "barrett",
          text: "Then we'll see whether you can do it with an upset client on the line.",
          es: "Entonces veremos si puedes hacerlo con un cliente molesto en la línea.",
        },
      ],
      words: [
        { word: "oversee", es: "supervisar" },
        { word: "branches", es: "sedes, sucursales" },
        { word: "ambitious", es: "ambicioso" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale gives the learner the final challenge while Elena closes her own loop.",
      text: "Your turn, and Elena closes the loop.",
      es: "Tu turno, y Elena cierra el ciclo.",
      speaker: "vale",
      cast: ["vale", "elena"],
      lines: [
        {
          speaker: "vale",
          text: "Your turn, and this is the last one of the module. Five rounds in one answer: who you are, what you've done, why it matters, what you're still improving, and where you'll be in two years.",
          es: "Tu turno, y este es el último del módulo. Cinco rondas en una respuesta: quién eres, qué has hecho, por qué importa, qué sigues mejorando y dónde estarás en dos años.",
        },
        {
          speaker: "elena",
          text: "A year ago I couldn't hold my own in a meeting in Spanish, never mind English. This morning I answered a stranger in Bogotá.",
          es: "Hace un año no podía defenderme en una reunión en español, mucho menos en inglés. Esta mañana le respondí a un desconocido en Bogotá.",
        },
        {
          speaker: "vale",
          text: "Did he understand you?",
          es: "¿Te entendió?",
        },
        {
          speaker: "elena",
          text: "He asked me a second question. That's how I knew.",
          es: "Me hizo una segunda pregunta. Así supe que sí.",
        },
        {
          speaker: "vale",
          text: "That's the only measurement that was ever really mine.",
          es: "Esa es la única medición que de verdad fue mía.",
        },
      ],
      words: [
        { word: "hold my own", es: "defenderme, arreglármelas" },
        { word: "stranger", es: "desconocido" },
        { word: "improving", es: "mejorando" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Barrett announces the board's decision and Vale looks ahead with Dani.",
      text: "The decision.",
      es: "La decisión.",
      speaker: "barrett",
      cast: ["barrett", "vale", "dani"],
      lines: [
        {
          speaker: "barrett",
          text: "The board approves the pilot for three countries, twelve months, with quarterly review.",
          es: "La junta aprueba el piloto para tres países, doce meses, con revisión trimestral.",
        },
        {
          speaker: "vale",
          text: "Conditions?",
          es: "¿Condiciones?",
        },
        {
          speaker: "barrett",
          text: "Two. Lidia stays in the classroom, and Camila's service team is funded separately.",
          es: "Dos. Lidia se queda en el salón, y el equipo de servicio de Camila se financia aparte.",
        },
        {
          speaker: "vale",
          text: "You just gave Camila the team she asked for.",
          es: "Acabas de darle a Camila el equipo que pidió.",
        },
        {
          speaker: "barrett",
          text: "Because what we saw this morning wasn't a language product; it was a service that happens to teach English. We'll close the loop in ninety days with the numbers you promised.",
          es: "Porque lo que vimos esta mañana no fue un producto de idiomas; fue un servicio que además enseña inglés. Cerraremos el ciclo en noventa días con los números que prometiste.",
        },
        {
          speaker: "vale",
          text: "Then from tomorrow the hard part stops being the interview and starts being the work.",
          es: "Entonces desde mañana la parte difícil deja de ser la entrevista y empieza a ser el trabajo.",
        },
        {
          speaker: "dani",
          text: "And when the region opens, somebody will have to defend it in public, without a script.",
          es: "Y cuando la región abra, alguien tendrá que defenderlo en público, sin guion.",
        },
        {
          speaker: "vale",
          text: "That's Advanced 2 and Advanced 3. You got hired; now you have to be worth it.",
          es: "Eso es Advanced 2 y Advanced 3. Ya te contrataron; ahora tienes que valerlo.",
        },
      ],
      words: [
        { word: "close the loop", es: "cerrar el ciclo" },
        { word: "quarterly", es: "trimestral" },
        { word: "funded", es: "financiado" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s5",
      questionEn: "What is Vale's answer about opening in Mexico by June?",
      questionEs: "¿Cuál es la respuesta de Vale sobre abrir en México para junio?",
      options: [
        { label: "Yes, but only if they hire teachers in February", emoji: "🗓️" },
        { label: "No, it is impossible before next year", emoji: "🚫" },
        { label: "Yes, with no conditions at all", emoji: "👍" },
      ],
      answer: 0,
      sayIt: "Yes, but only if we hire teachers in February.",
      sayItEs: "Sí, pero solo si contratamos maestros en febrero.",
      sayItCheck: {
        target: "Yes, but only if we hire teachers in February",
        altTargets: ["Only if we hire teachers in February", "Yes with a date attached"],
      },
    },
    {
      id: "q2",
      afterScene: "s8",
      questionEn: "Final simulation: who you are, what you've done, why it matters, what you're improving, and where you'll be in two years.",
      questionEs: "Simulación final: quién eres, qué has hecho, por qué importa, qué estás mejorando y dónde estarás en dos años.",
      options: [
        { label: "I am ready to answer", emoji: "🎤" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "I'm an agent with three years on live calls, I've trained six new people, and that matters because the team keeps clients instead of losing them. I'm still improving my speed under pressure, and in two years I want to be running a small team of my own.",
      sayItEs: "Soy agente con tres años en llamadas en vivo, he capacitado a seis personas nuevas, y eso importa porque el equipo conserva clientes en vez de perderlos. Sigo mejorando mi velocidad bajo presión, y en dos años quiero dirigir un equipo pequeño.",
      sayItAskEn: "One continuous turn: who, what, why it matters, what you're improving, where you'll be.",
      sayItAskEs: "Un solo turno continuo: quién, qué, por qué importa, qué estás mejorando y dónde estarás.",
      sayItCheck: {
        target: "I'm *",
        altTargets: ["I am *", "In two years *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s9",
    phrase: "I got hired by being understood, not by being perfect.",
    es: "Me contrataron por hacerme entender, no por ser perfecto.",
  },
  habitCard: {
    afterScene: "s5",
    phrase: "I say yes with a date, never yes to be polite.",
    es: "Digo sí con una fecha, nunca sí por cortesía.",
    model: "vale",
    modelActionEs: "Vale aceptó la expansión solo con una condición y una fecha concreta.",
  },
  expressions: [
    {
      phrase: "step up",
      variants: ["steps up", "stepped up", "stepping up"],
      es: "dar el paso, responder a la altura",
      kind: "phrasal",
      example: "Can you step up that fast?",
      exampleEs: "¿Puedes dar ese paso tan rápido?",
    },
    {
      phrase: "carry over",
      variants: ["carried over", "carries over", "carrying over"],
      es: "trasladarse, extenderse a otra parte",
      kind: "phrasal",
      example: "That single habit carried over into the corporate groups.",
      exampleEs: "Ese solo hábito se trasladó a los grupos corporativos.",
    },
    {
      phrase: "hold my own",
      variants: ["hold your own", "held my own", "holds his own"],
      es: "defenderse, arreglárselas bien",
      kind: "idiom",
      example: "A year ago I couldn't hold my own in a meeting.",
      exampleEs: "Hace un año no podía defenderme en una reunión.",
    },
    {
      phrase: "close the loop",
      variants: ["closed the loop", "closes the loop", "closing the loop"],
      es: "cerrar el ciclo, dar el cierre final",
      kind: "idiom",
      example: "We'll close the loop in ninety days with the numbers you promised.",
      exampleEs: "Cerraremos el ciclo en noventa días con los números que prometiste.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds, the final one: who you are, what you've done, and where you'll be in two years.",
    es: "Treinta segundos, el último: quién eres, qué has hecho y dónde estarás en dos años.",
  },
  continueWith: [
    "I'm ...",
    "What I've done is ...",
    "In two years ...",
  ],
  cliffhanger: {
    en: "Advanced 2: the clients are on the phone now — faster English, and somebody upset on the other end.",
    es: "Advanced 2: ahora los clientes están al teléfono — inglés más rápido y alguien molesto del otro lado.",
  },
};
