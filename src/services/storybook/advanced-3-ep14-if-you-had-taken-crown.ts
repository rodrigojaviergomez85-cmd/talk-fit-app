import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced3-ep14-if-you-had-taken-crown/cover.jpg";
import s1 from "@/assets/storybook/advanced3-ep14-if-you-had-taken-crown/s1.jpg";
import s2 from "@/assets/storybook/advanced3-ep14-if-you-had-taken-crown/s2.jpg";
import s3 from "@/assets/storybook/advanced3-ep14-if-you-had-taken-crown/s3.jpg";
import s4 from "@/assets/storybook/advanced3-ep14-if-you-had-taken-crown/s4.jpg";
import s5 from "@/assets/storybook/advanced3-ep14-if-you-had-taken-crown/s5.jpg";
import s6 from "@/assets/storybook/advanced3-ep14-if-you-had-taken-crown/s6.jpg";
import s7 from "@/assets/storybook/advanced3-ep14-if-you-had-taken-crown/s7.jpg";
import s8 from "@/assets/storybook/advanced3-ep14-if-you-had-taken-crown/s8.jpg";
import s9 from "@/assets/storybook/advanced3-ep14-if-you-had-taken-crown/s9.jpg";

export const ADVANCED3_EP14_IF_YOU_HAD_TAKEN_CROWN: StorybookEpisode = {
  id: "advanced3-ep14-if-you-had-taken-crown",
  moduleId: "advanced-3",
  week: 3,
  title: "If you had taken Crown",
  titleEs: "Si hubieras aceptado Crown",
  episodeLabel: {
    en: "Advanced 3 · Episode 14",
    es: "Advanced 3 · Episodio 14",
  },
  previously: [
    {
      en: "Four sentences to the seventeen. 'Pending' is the only word they gave him.",
      es: "Cuatro frases a los diecisiete. 'Pendiente' es la única palabra que le dieron.",
    },
    {
      en: "Reed on a stool, seven seconds, frozen. 'It's in the file now. All of it, including the stool.'",
      es: "Reed en un banco, siete segundos, congelado. 'Ya está en el expediente. Todo, incluido el banco'.",
    },
    {
      en: "Bus 42, in Spanish, once. At home: 'Did you pray?' 'Yes.' 'Then eat.'",
      es: "Bus 42, en español, una vez. En casa: '¿Oraste?' 'Sí'. 'Entonces comé'.",
    },
  ],
  reviewWords: [
    { word: "situation", es: "situación" },
    { word: "offer", es: "oferta" },
    { word: "risk", es: "riesgo" },
    { word: "safe", es: "a salvo" },
    { word: "especially", es: "especialmente" },
  ],
  blurb: {
    en: "Thursday. No block at ten. Dani puts the headset on and takes calls like day one. Nico: 'You still count the five seconds.' 'Especially now.' At 12:10, Lidia calls from Crown with the question he owed her: what if he had taken Crown's offer, before hers? He answers it honestly, with the consequence, and the risk. Then she tells him Crown wants to buy what Northline just suspended.",
    es: "Jueves. Sin bloque a las diez. Dani se pone la diadema y toma llamadas como el día uno. Nico: 'Todavía contás los cinco segundos'. 'Especialmente ahora'. A las 12:10, Lidia llama desde Crown con la pregunta que le debía: ¿y si hubiera aceptado la oferta de Crown, antes que la de ella? La responde con honestidad, con la consecuencia y con el riesgo. Luego ella le dice que Crown quiere comprar lo que Northline acaba de suspender.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Thursday, 8:10 a.m.; Dani at his old desk on the floor with the headset on, mid-call, the customer only a voice; the training room behind him dark, door closed; Mía at the next desk watching him instead of her screen.",
      text: "Thursday, 8:10 a.m. No block today. He does what's left.",
      es: "Jueves, 8:10 a.m. Hoy no hay bloque. Hace lo que queda.",
      speaker: "caller",
      lines: [
        {
          speaker: "caller",
          text: "Transferred three times. I don't even remember what I called about.",
          es: "Transferido tres veces. Ya ni me acuerdo por qué llamé.",
        },
        {
          speaker: "dani",
          text: "Then let's find it together. Tell me the first thing that went wrong today, not the third. I'll stay on the line the whole time.",
          es: "Entonces encontrémoslo juntos. Dígame lo primero que salió mal hoy, no lo tercero. Me quedo en la línea todo el tiempo.",
        },
        {
          speaker: "caller",
          text: "The first thing. Okay. You sound like you've done this before.",
          es: "Lo primero. Bueno. Suena como si ya hubiera hecho esto antes.",
        },
        {
          speaker: "dani",
          text: "Once, badly. Every day since, a little better.",
          es: "Una vez, mal. Cada día desde entonces, un poco mejor.",
        },
      ],
      words: [
        { word: "transferred", es: "transferido" },
        { word: "together", es: "juntos" },
        { word: "badly", es: "mal" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "10:00 a.m.; the training room seen through its glass door, dark, the stool under the tall table, HEARD still on the whiteboard; Nico and Dani at their desks in front of it, headsets around their necks; Nico looking at the wall clock.",
      text: "10:00 a.m. Nobody moves toward the room.",
      es: "10:00 a.m. Nadie se mueve hacia el salón.",
      speaker: "nico",
      cast: ["nico", "dani"],
      lines: [
        {
          speaker: "nico",
          text: "It's ten.",
          es: "Son las diez.",
        },
        {
          speaker: "dani",
          text: "I know what time it is.",
          es: "Sé qué hora es.",
        },
        {
          speaker: "nico",
          text: "Your phone's face down. You ate. Barrett asked you a question at nine and you waited before you answered. You still count the five seconds.",
          es: "Tu celular está boca abajo. Comiste. Barrett te hizo una pregunta a las nueve y esperaste antes de contestar. Todavía contás los cinco segundos.",
        },
        {
          speaker: "dani",
          text: "Especially now.",
          es: "Especialmente ahora.",
        },
      ],
      words: [
        { word: "moves", es: "se mueve" },
        { word: "waited", es: "esperaste" },
        { word: "especially", es: "especialmente" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "12:10 p.m.; the break room; Dani alone at the table with his phone to his ear, lunch untouched; the vending machine; through the window, rain. Only Dani is drawn; Lidia is a voice on the phone.",
      text: "12:10 p.m. Lidia. The question from the livestream, in a room with no chat.",
      es: "12:10 p.m. Lidia. La pregunta del en vivo, en una sala sin chat.",
      speaker: "dani",
      lines: [
        {
          speaker: "lidia",
          text: "Two weeks ago you told four hundred people that somebody deserved the first version of an answer. Keller tells everyone she offered you the training job before me. It's her favorite story.",
          es: "Hace dos semanas le dijiste a cuatrocientas personas que alguien merecía la primera versión de una respuesta. Keller le cuenta a todos que te ofreció el puesto de entrenamiento antes que a mí. Es su historia favorita.",
        },
        {
          speaker: "lidia",
          text: "So: what if you had taken Crown's offer?",
          es: "Así que: ¿y si hubieras aceptado la oferta de Crown?",
        },
        {
          speaker: "dani",
          text: "In that situation, I would have a title in Bogotá, a script approved by someone else, and no Thursdays.",
          es: "En esa situación, tendría un título en Bogotá, un guion aprobado por alguien más, y ningún jueves.",
        },
        {
          speaker: "dani",
          text: "If that had happened, the clip wouldn't exist, because nobody at Crown films the floor. And nothing would be suspended today, because there'd be nothing to suspend.",
          es: "Si eso hubiera pasado, el clip no existiría, porque nadie en Crown filma el piso. Y hoy no habría nada suspendido, porque no habría nada que suspender.",
        },
      ],
      words: [
        { word: "deserved", es: "merecía" },
        { word: "favorite", es: "favorita" },
        { word: "title", es: "título" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Close on Dani in the break room, phone at his ear, the other hand flat on the table, counting nothing; the rain harder on the window.",
      text: "The reason. The consequence. The risk.",
      es: "La razón. La consecuencia. El riesgo.",
      speaker: "dani",
      lines: [
        {
          speaker: "lidia",
          text: "So you'd be safe.",
          es: "Entonces estarías a salvo.",
        },
        {
          speaker: "dani",
          text: "I'd be safe, and Mía would be on Crown's night team with no university, and seventeen people would still be where I was on day one.",
          es: "Estaría a salvo, y Mía estaría en el equipo nocturno de Crown sin universidad, y diecisiete personas seguirían donde yo estaba el día uno.",
        },
        {
          speaker: "dani",
          text: "The reason I said no in the parking lot is that the offer had a room with no chairs in it. The risk of saying no was exactly this week. I knew.",
          es: "La razón por la que dije que no en el estacionamiento es que la oferta tenía una sala sin sillas adentro. El riesgo de decir que no era exactamente esta semana. Lo sabía.",
        },
        {
          speaker: "dani",
          text: "I'd say it again.",
          es: "Lo diría otra vez.",
        },
        {
          speaker: "lidia",
          text: "That's the answer I wanted. It's not the one Keller wanted, which is why I'm calling and she isn't.",
          es: "Esa es la respuesta que quería. No es la que Keller quería, y por eso llamo yo y no ella.",
        },
      ],
      words: [
        { word: "safe", es: "a salvo" },
        { word: "parking", es: "estacionamiento" },
        { word: "risk", es: "riesgo" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Dani standing up in the break room, phone still at his ear, looking at the closed door of the training room across the floor; Mía visible far away at her desk, half turned.",
      text: "12:18 p.m. Then she says why she's really calling.",
      es: "12:18 p.m. Entonces ella dice por qué llama de verdad.",
      speaker: "dani",
      lines: [
        {
          speaker: "lidia",
          text: "Crown read the suspension at seven. By nine, Keller had a proposal: Crown licenses the program, you run it from Bogotá, your seventeen stay here, first cohort in March.",
          es: "Crown leyó la suspensión a las siete. A las nueve, Keller tenía una propuesta: Crown licencia el programa, vos lo dirigís desde Bogotá, tus diecisiete se quedan aquí, primera cohorte en marzo.",
        },
        {
          speaker: "lidia",
          text: "Keller calls you Monday. I'm calling today so you have the weekend.",
          es: "Keller te llama el lunes. Yo llamo hoy para que tengás el fin de semana.",
        },
        {
          speaker: "dani",
          text: "What would you do? In my situation.",
          es: "¿Qué harías vos? En mi situación.",
        },
        {
          speaker: "lidia",
          text: "I'd ask where the chairs are. You already know how to ask that. Eat your lunch.",
          es: "Preguntaría dónde están las sillas. Ya sabés hacer esa pregunta. Comete tu almuerzo.",
        },
      ],
      words: [
        { word: "proposal", es: "propuesta" },
        { word: "licenses", es: "licencia" },
        { word: "weekend", es: "fin de semana" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Ms. Barrett's office, 2:00 p.m.; Barrett behind her desk with the printed suspension email and a second printed page beside it; Dani standing; the plant.",
      text: "2:00 p.m. Barrett already knows. She asks the same what-if from the other side.",
      es: "2:00 p.m. Barrett ya sabe. Hace el mismo 'qué harías si' desde el otro lado.",
      speaker: "barrett",
      cast: ["barrett", "dani"],
      lines: [
        {
          speaker: "barrett",
          text: "Keller copied me. Professional courtesy, she calls it. What would you do if Crown offered to take the pilot while we have it on ice?",
          es: "Keller me copió. Cortesía profesional, le dice ella. ¿Qué haría si Crown ofreciera llevarse el piloto mientras nosotros lo tenemos en hielo?",
        },
        {
          speaker: "dani",
          text: "Lidia asked me at twelve. If that happened, I'd give the answer I gave in the parking lot. Not without the room. And the room is Vale's.",
          es: "Lidia me preguntó a las doce. Si eso pasara, daría la respuesta que di en el estacionamiento. No sin el salón. Y el salón es de Vale.",
        },
        {
          speaker: "barrett",
          text: "That's not an answer Reed can put in a file. It's the only one that would make him reopen it. Monday is four days away, and Reed reads his email on Sundays.",
          es: "Esa no es una respuesta que Reed pueda poner en un expediente. Es la única que lo haría reabrirlo. El lunes está a cuatro días, y Reed lee su correo los domingos.",
        },
      ],
      words: [
        { word: "courtesy", es: "cortesía" },
        { word: "ice", es: "hielo" },
        { word: "reopen", es: "reabrir" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale's academy, 5:30 p.m.; the corridor outside the small room; Vale with a clipboard of names, Elena beside her in her cream apron over the rust blouse, holding a paper bag of bread; Dani arriving with the brass key in his hand.",
      text: "5:30 p.m. The academy. Vale has a list. Elena has bread.",
      es: "5:30 p.m. La academia. Vale tiene una lista. Elena tiene pan.",
      speaker: "vale",
      cast: ["vale", "elena", "dani"],
      lines: [
        {
          speaker: "vale",
          text: "Twelve parents of your agents want a talk. Tomorrow, six p.m., this room. They read the suspension in a group chat and want to know what their kids did on Thursdays. Elena started the list.",
          es: "Doce padres de tus agentes quieren una charla. Mañana, seis p.m., este salón. Leyeron la suspensión en un chat de grupo y quieren saber qué hacían sus hijos los jueves. Elena empezó la lista.",
        },
        {
          speaker: "elena",
          text: "My nephew passed your audit and still can't order a coffee at the airport. If that room is closed, I want to know what was inside it.",
          es: "Mi sobrino pasó tu auditoría y todavía no puede pedir un café en el aeropuerto. Si ese salón está cerrado, quiero saber qué había adentro.",
        },
        {
          speaker: "elena",
          text: "And I brought bread, because nobody explains anything well hungry.",
          es: "Y traje pan, porque nadie explica nada bien con hambre.",
        },
        {
          speaker: "dani",
          text: "Tomorrow at six. I'll explain the coffee.",
          es: "Mañana a las seis. Voy a explicar lo del café.",
        },
      ],
      words: [
        { word: "parents", es: "padres" },
        { word: "nephew", es: "sobrino" },
        { word: "hungry", es: "con hambre" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Night; the bus stop; Nico and Dani on the bench; Nico with his hood down and his phone dark in his hand for once, arriving for the night shift.",
      text: "9:40 p.m. Nico's what-if.",
      es: "9:40 p.m. El 'qué harías si' de Nico.",
      speaker: "nico",
      cast: ["nico", "dani"],
      lines: [
        {
          speaker: "nico",
          text: "What would you do if I quit tomorrow? No March. Just gone.",
          es: "¿Qué harías si renunciara mañana? Sin marzo. Solo me voy.",
        },
        {
          speaker: "dani",
          text: "If that happened, I'd watch the stream. Then again in March, and I'd count how many of the forty thousand were still there. That way, one of us would know if it was a job.",
          es: "Si eso pasara, vería el stream. Luego otra vez en marzo, y contaría cuántos de los cuarenta mil seguían ahí. De esa forma, uno de los dos sabría si era un trabajo.",
        },
        {
          speaker: "nico",
          text: "You'd count.",
          es: "Contarías.",
        },
        {
          speaker: "dani",
          text: "I count everything now. It's a problem.",
          es: "Ahora cuento todo. Es un problema.",
        },
      ],
      words: [
        { word: "quit", es: "renunciar" },
        { word: "gone", es: "ido" },
        { word: "everything", es: "todo" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Inside bus 42 at night, half full; Dani in a window seat talking quietly to himself, lips moving; a woman across the aisle staring at him; he doesn't notice.",
      text: "10:30 p.m. Bus 42. He rehearses Monday out loud. Someone stares. He doesn't notice.",
      es: "10:30 p.m. Bus 42. Ensaya el lunes en voz alta. Alguien se le queda viendo. No lo nota.",
      speaker: "dani",
      cast: ["dani"],
      lines: [
        {
          speaker: "dani",
          text: "Ms. Keller. In that situation, I would ask one question before the salary, before Bogotá, before March. Where are the chairs? If the answer is a screen, the answer is no.",
          es: "Ms. Keller. En esa situación, haría una pregunta antes del salario, antes de Bogotá, antes de marzo. ¿Dónde están las sillas? Si la respuesta es una pantalla, la respuesta es no.",
        },
        {
          speaker: "dani",
          text: "If the answer is a room, I'd need to know whose.",
          es: "Si la respuesta es un salón, necesitaría saber de quién.",
        },
      ],
      words: [
        { word: "rehearses", es: "ensaya" },
        { word: "salary", es: "salario" },
        { word: "whose", es: "de quién" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What does Dani say would have happened if he had taken Crown's offer?",
      questionEs: "¿Qué dice Dani que habría pasado si hubiera aceptado la oferta de Crown?",
      options: [
        { label: "He'd be safe, but the clip, the Thursdays and the seventeen wouldn't exist", emoji: "🪑" },
        { label: "He'd have the same program with more money", emoji: "💵" },
        { label: "Nothing would be different", emoji: "🤷" },
      ],
      answer: 0,
      sayIt: "In that situation, he would have a title and no Thursdays. If that had happened, the clip wouldn't exist and seventeen people would still be where he was on day one.",
      sayItEs: "En esa situación, tendría un título y ningún jueves. Si eso hubiera pasado, el clip no existiría y diecisiete personas seguirían donde él estaba el día uno.",
      sayItCheck: {
        target: "In that situation, *",
        altTargets: ["If that had happened, *", "* no Thursdays *", "* where he was on day one"],
      },
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "What would you do if your manager asked you to do something you didn't know how to do? Your choice, the reason, the consequence, and the risk.",
      questionEs: "¿Qué harías si tu jefe te pidiera hacer algo que no sabes hacer? Tu decisión, la razón, la consecuencia y el riesgo.",
      options: [
        { label: "I am ready to answer", emoji: "🎧" },
        { label: "I want to hear Dani's version again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "In that situation, I would ask two questions to understand the goal, and then say honestly that I haven't done it before. The reason is that saying yes without preparing creates a bigger problem later. That way, the work gets done and I learn something. The risk is that it takes more time at the beginning.",
      sayItEs: "En esa situación, haría dos preguntas para entender el objetivo, y luego diría honestamente que no lo he hecho antes. La razón es que decir que sí sin prepararme crea un problema más grande después. De esa forma, el trabajo se hace y aprendo algo. El riesgo es que toma más tiempo al principio.",
      sayItAskEn: "Start with \"In that situation, I would ...\", then \"The reason is ...\", then \"That way ...\", and close with \"The risk is ...\".",
      sayItAskEs: "Empieza con \"In that situation, I would …\", luego \"The reason is …\", después \"That way …\" y cierra con \"The risk is …\".",
      sayItCheck: {
        target: "In that situation, I would *",
        altTargets: ["If that happened, I'd *", "The reason is *", "That way, *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s4",
    phrase: "The risk of the right decision was always this week. I knew it when I chose. I'd choose it again.",
    es: "El riesgo de la decisión correcta siempre fue esta semana. Lo sabía cuando elegí. La volvería a elegir.",
  },
  habitCard: {
    afterScene: "s2",
    phrase: "On the worst day, I keep the smallest habits: phone face down, eat, five seconds before I answer.",
    es: "En el peor día, mantengo los hábitos más pequeños: celular boca abajo, comer, cinco segundos antes de responder.",
    model: "dani",
    modelActionEs: "Con el piloto suspendido, Nico notó que Dani seguía con el celular boca abajo, había comido y contó cinco segundos antes de contestarle a Barrett. 'Especialmente ahora'.",
  },
  expressions: [
    {
      phrase: "stay on",
      variants: ["stayed on", "stays on", "staying on"],
      es: "quedarse (en la línea, en un lugar)",
      kind: "phrasal",
      example: "I'll stay on the line the whole time.",
      exampleEs: "Me quedo en la línea todo el tiempo.",
    },
    {
      phrase: "go wrong",
      variants: ["went wrong", "goes wrong", "gone wrong"],
      es: "salir mal",
      kind: "phrasal",
      example: "Tell me the first thing that went wrong today, not the third.",
      exampleEs: "Dígame lo primero que salió mal hoy, no lo tercero.",
    },
    {
      phrase: "on ice",
      variants: ["put on ice", "kept on ice"],
      es: "en pausa, congelado",
      kind: "idiom",
      example: "What would you do if Crown offered to take the pilot while we have it on ice?",
      exampleEs: "¿Qué haría si Crown ofreciera llevarse el piloto mientras nosotros lo tenemos en hielo?",
    },
    {
      phrase: "professional courtesy",
      variants: ["as a courtesy", "out of courtesy"],
      es: "cortesía profesional",
      kind: "idiom",
      example: "Keller copied me. Professional courtesy, she calls it.",
      exampleEs: "Keller me copió. Cortesía profesional, le dice ella.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: what would you do if you had to speak in English in front of fifty people tomorrow? Your choice, the reason, what would happen after that, and the risk.",
    es: "Treinta segundos: ¿qué harías si tuvieras que hablar en inglés frente a cincuenta personas mañana? Tu decisión, la razón, qué pasaría después, y el riesgo.",
  },
  continueWith: [
    "In that situation, I would ...",
    "If that happened, I'd ... The reason is ...",
    "That way, ...",
    "The risk, of course, is ...",
  ],
  cliffhanger: {
    en: "Friday, 6:00 p.m., the small room: twelve parents, Elena's bread, and one question. Why does someone who passed the audit still freeze at the airport?",
    es: "Viernes, 6:00 p.m., el salón pequeño: doce padres, el pan de Elena, y una pregunta. ¿Por qué alguien que pasó la auditoría todavía se congela en el aeropuerto?",
  },
};
