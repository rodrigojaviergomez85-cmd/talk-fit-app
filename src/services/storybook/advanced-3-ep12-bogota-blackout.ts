import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced3-ep12-bogota-blackout/cover.jpg";
import s1 from "@/assets/storybook/advanced3-ep12-bogota-blackout/s1.jpg";
import s2 from "@/assets/storybook/advanced3-ep12-bogota-blackout/s2.jpg";
import s3 from "@/assets/storybook/advanced3-ep12-bogota-blackout/s3.jpg";
import s4 from "@/assets/storybook/advanced3-ep12-bogota-blackout/s4.jpg";
import s5 from "@/assets/storybook/advanced3-ep12-bogota-blackout/s5.jpg";
import s6 from "@/assets/storybook/advanced3-ep12-bogota-blackout/s6.jpg";
import s7 from "@/assets/storybook/advanced3-ep12-bogota-blackout/s7.jpg";
import s8 from "@/assets/storybook/advanced3-ep12-bogota-blackout/s8.jpg";
import s9 from "@/assets/storybook/advanced3-ep12-bogota-blackout/s9.jpg";

export const ADVANCED3_EP12_BOGOTA_BLACKOUT: StorybookEpisode = {
  id: "advanced3-ep12-bogota-blackout",
  moduleId: "advanced-3",
  week: 3,
  title: "Bogotá, blackout",
  titleEs: "Bogotá, apagón",
  episodeLabel: {
    en: "Advanced 3 · Episode 12",
    es: "Advanced 3 · Episodio 12",
  },
  previously: [
    {
      en: "Vale's story: rows, a student who couldn't say his name, a circle. 'The whole thing is a chair.'",
      es: "La historia de Vale: filas, un estudiante que no podía decir su nombre, un círculo. 'Todo esto es una silla'.",
    },
    {
      en: "A key to the small room. 'The chairs don't belong to Northline.'",
      es: "Una llave del salón pequeño. 'Las sillas no son de Northline'.",
    },
    {
      en: "Tuesday, 8:00 a.m., Bogotá, forty agents. Julieta asked about the power.",
      es: "Martes, 8:00 a.m., Bogotá, cuarenta agentes. Julieta preguntó por la electricidad.",
    },
  ],
  reviewWords: [
    { word: "plan", es: "plan" },
    { word: "power", es: "electricidad" },
    { word: "instead", es: "en su lugar" },
    { word: "lights", es: "luces" },
    { word: "suspended", es: "suspendido" },
  ],
  blurb: {
    en: "The plan: forty agents in Bogotá, approved slides, Dani on the big screen. At 8:03 the whole block goes dark. Julieta calls from a phone in a black room. So instead of the slides, one voice on speaker and forty phone lights. It works. It's the first time Julieta says 'we'. At 6:30 p.m. Barrett brings an email she's required to read out loud.",
    es: "El plan: cuarenta agentes en Bogotá, diapositivas aprobadas, Dani en la pantalla grande. A las 8:03 toda la cuadra se apaga. Julieta llama desde un celular en una sala negra. Así que en vez de las diapositivas, una voz en altavoz y cuarenta luces de celular. Funciona. Es la primera vez que Julieta dice 'nosotros'. A las 6:30 p.m. Barrett trae un correo que está obligada a leer en voz alta.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Tuesday, 7:55 a.m.; Dani at his desk at Northline with the laptop open to a video call; on the screen, a bright training room in Bogotá with rows of agents and Julieta standing at the front in her white shirt and lanyard; the first slide ready in a corner; Camila beside Dani with her tablet.",
      text: "Tuesday, 7:55 a.m. The plan is on the screen.",
      es: "Martes, 7:55 a.m. El plan está en la pantalla.",
      speaker: "julieta",
      cast: ["dani", "julieta", "camila"],
      lines: [
        {
          speaker: "julieta",
          text: "Forty of forty. The screen's working, the slides are loaded, and I have a bad feeling about the sky.",
          es: "Cuarenta de cuarenta. La pantalla funciona, las diapositivas están cargadas, y tengo un mal presentimiento con el cielo.",
        },
        {
          speaker: "dani",
          text: "I was about to say good morning to Bogotá. Let me do that first and worry about the sky second.",
          es: "Estaba por darle los buenos días a Bogotá. Déjame hacer eso primero y preocuparme por el cielo después.",
        },
        {
          speaker: "camila",
          text: "Slide one in ten seconds. Legal approved all fourteen.",
          es: "Diapositiva uno en diez segundos. Legal aprobó las catorce.",
        },
      ],
      words: [
        { word: "feeling", es: "presentimiento" },
        { word: "sky", es: "cielo" },
        { word: "worry", es: "preocuparse" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "8:03 a.m.; the laptop screen gone black with a small 'reconnecting' circle; Dani's phone lighting up on the desk with JULIETA on it; Camila's hand frozen over her tablet.",
      text: "8:03 a.m. The interruption.",
      es: "8:03 a.m. La interrupción.",
      speaker: "dani",
      lines: [
        {
          speaker: "dani",
          text: "I was about to start the first case when suddenly the screen went black. Not the call. The room. Julieta?",
          es: "Estaba por empezar el primer caso cuando de repente la pantalla se puso negra. No la llamada. La sala. ¿Julieta?",
        },
        {
          speaker: "julieta",
          text: "Phone. The whole block is out, not just the building. The screen is dead, the router is dead, and I have forty people in a room with no windows.",
          es: "Teléfono. Toda la cuadra está sin luz, no solo el edificio. La pantalla está muerta, el router está muerto, y tengo cuarenta personas en una sala sin ventanas.",
        },
        {
          speaker: "julieta",
          text: "The generator is for the servers, not for us.",
          es: "El generador es para los servidores, no para nosotros.",
        },
        {
          speaker: "dani",
          text: "How long?",
          es: "¿Cuánto tiempo?",
        },
        {
          speaker: "julieta",
          text: "Last time, two hours. I'm not going to hold forty people for two hours in the dark.",
          es: "La última vez, dos horas. No voy a retener a cuarenta personas dos horas a oscuras.",
        },
      ],
      words: [
        { word: "suddenly", es: "de repente" },
        { word: "block", es: "cuadra" },
        { word: "generator", es: "generador" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Dani standing now with the phone on speaker flat on the desk; Mía leaning over the divider with her own phone's flashlight on, demonstrating; Camila already closing the slide deck.",
      text: "So instead.",
      es: "Así que en su lugar.",
      speaker: "dani",
      lines: [
        {
          speaker: "dani",
          text: "Don't hold them. Use them. So instead of the slides, put me on speaker and put the phone in the middle of the room. Everybody has a phone light. That's forty lights.",
          es: "No los retengas. Usalos. Así que en vez de las diapositivas, ponme en altavoz y pon el teléfono en medio de la sala. Todos tienen luz en el celular. Son cuarenta luces.",
        },
        {
          speaker: "dani",
          text: "Pairs, one case, the customer won't say what the problem is. No slides. Nobody needs to read anything.",
          es: "Parejas, un caso, el cliente no dice cuál es el problema. Sin diapositivas. Nadie necesita leer nada.",
        },
        {
          speaker: "julieta",
          text: "Forty minutes on a phone speaker.",
          es: "Cuarenta minutos en un altavoz de teléfono.",
        },
        {
          speaker: "mia",
          text: "Tell her the first cohort did it with one flashlight and a printer that never worked.",
          es: "Decile que la primera cohorte lo hizo con una linterna y una impresora que nunca funcionó.",
        },
        {
          speaker: "julieta",
          text: "I heard that. We can do forty minutes on a phone. We did it in week one.",
          es: "Escuché eso. Podemos hacer cuarenta minutos en un teléfono. Lo hicimos en la semana uno.",
        },
      ],
      words: [
        { word: "speaker", es: "altavoz" },
        { word: "pairs", es: "parejas" },
        { word: "flashlight", es: "linterna" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Close on Dani's phone on the desk, screen showing a call timer at 12:40 with JULIETA, on speaker; Dani's mouth close to it, one hand flat on the desk; the floor around him going about its morning.",
      text: "8:20 a.m. One voice, forty lights, a case nobody can read.",
      es: "8:20 a.m. Una voz, cuarenta luces, un caso que nadie puede leer.",
      speaker: "dani",
      lines: [
        {
          speaker: "dani",
          text: "Bogotá. You can't see me, so listen. The customer says 'it doesn't work'. That's all you get. Person on the left, you're the customer.",
          es: "Bogotá. No pueden verme, así que escuchen. El cliente dice 'no funciona'. Es todo lo que tienen. La persona de la izquierda es el cliente.",
        },
        {
          speaker: "dani",
          text: "Person on the right, find the problem in three questions. Go. I'll count.",
          es: "La de la derecha, encuentre el problema en tres preguntas. Vayan. Yo cuento.",
        },
        {
          speaker: "julieta",
          text: "They're standing. Twenty pairs. Forty lights pointed at the floor. It sounds like a market in here.",
          es: "Están de pie. Veinte parejas. Cuarenta luces apuntando al piso. Suena como un mercado aquí adentro.",
        },
        {
          speaker: "dani",
          text: "Good. A market is the right sound.",
          es: "Bien. Un mercado es el sonido correcto.",
        },
      ],
      words: [
        { word: "listen", es: "escuchar" },
        { word: "left", es: "izquierda" },
        { word: "market", es: "mercado" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Dani's phone held up in his hand showing a photo Julieta just sent: a black room with forty small phone lights, faces barely lit from below, people standing in pairs; Mía and Camila leaning in to see it.",
      text: "8:41 a.m. She sends one photo.",
      es: "8:41 a.m. Ella manda una foto.",
      speaker: "mia",
      cast: ["dani", "mia", "camila"],
      lines: [
        {
          speaker: "mia",
          text: "That's the best picture of this program anyone has ever taken and it's in the dark.",
          es: "Esa es la mejor foto que alguien ha tomado de este programa y está a oscuras.",
        },
        {
          speaker: "camila",
          text: "Forty lights. I'm going to put that in the budget somewhere. Zero dollars.",
          es: "Cuarenta luces. Voy a poner eso en el presupuesto en algún lado. Cero dólares.",
        },
        {
          speaker: "dani",
          text: "In the end it wasn't a session. It was the room finding out it didn't need the screen.",
          es: "Al final no fue una sesión. Fue la sala descubriendo que no necesitaba la pantalla.",
        },
      ],
      words: [
        { word: "picture", es: "foto" },
        { word: "budget", es: "presupuesto" },
        { word: "dark", es: "oscuridad" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "9:15 a.m.; the laptop screen back on: the Bogotá room lit again, agents applauding with their phones still in their hands, Julieta at the front looking straight into the camera, hair coming loose from the tie.",
      text: "9:15 a.m. The lights come back. She says the word.",
      es: "9:15 a.m. Vuelve la luz. Ella dice la palabra.",
      speaker: "julieta",
      cast: ["julieta", "dani"],
      lines: [
        {
          speaker: "julieta",
          text: "Power's back. Forty of forty, nobody left, twenty cases solved in the dark. We did that. We're keeping the lights off for the next cohort. I'm serious.",
          es: "Volvió la luz. Cuarenta de cuarenta, nadie se fue, veinte casos resueltos a oscuras. Eso lo hicimos nosotros. Vamos a dejar las luces apagadas para la próxima cohorte. Hablo en serio.",
        },
        {
          speaker: "dani",
          text: "You said 'we'.",
          es: "Dijiste 'nosotros'.",
        },
        {
          speaker: "julieta",
          text: "I noticed. Don't make it a thing. Send me the slides anyway, for the file.",
          es: "Me di cuenta. No lo hagás tema. Mandame las diapositivas de todas formas, para el expediente.",
        },
      ],
      words: [
        { word: "solved", es: "resueltos" },
        { word: "serious", es: "en serio" },
        { word: "noticed", es: "me di cuenta" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Ms. Barrett's office, 11:00 a.m.; Barrett behind her desk with her hands folded; Dani standing; on her monitor, the photo of the forty lights, forwarded.",
      text: "11:00 a.m. Barrett has the photo. She wants the sentence.",
      es: "11:00 a.m. Barrett tiene la foto. Quiere la frase.",
      speaker: "barrett",
      cast: ["barrett", "dani"],
      lines: [
        {
          speaker: "barrett",
          text: "Bogotá's director sent me this at nine. Plan, interruption, what you did, how it ended. In one breath, because I'm going to repeat it to someone who doesn't like you.",
          es: "El director de Bogotá me mandó esto a las nueve. Plan, interrupción, qué hiciste, cómo terminó. En una sola respiración, porque se lo voy a repetir a alguien a quien no le caés bien.",
        },
        {
          speaker: "dani",
          text: "I was about to run fourteen approved slides when the power went out. So instead of waiting, we ran the case on a phone speaker with forty phone lights.",
          es: "Estaba por correr catorce diapositivas aprobadas cuando se fue la luz. Así que en vez de esperar, corrimos el caso en un altavoz de teléfono con cuarenta luces de celular.",
        },
        {
          speaker: "dani",
          text: "In the end, twenty cases, nobody left, and the room learned it doesn't need the screen. What I learned is that the plan was the slides and the program was the pairs.",
          es: "Al final, veinte casos, nadie se fue, y la sala aprendió que no necesita la pantalla. Lo que aprendí es que el plan eran las diapositivas y el programa eran las parejas.",
        },
        {
          speaker: "barrett",
          text: "That's the sentence. I'll carry it. Go take a call. You look like someone who hasn't taken one in a while.",
          es: "Esa es la frase. La llevo. Andá a tomar una llamada. Parecés alguien que no ha tomado una en un buen rato.",
        },
      ],
      words: [
        { word: "breath", es: "respiración" },
        { word: "waiting", es: "esperar" },
        { word: "carry", es: "llevar" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "6:30 p.m.; the floor half empty; Barrett walking down the row with a single printed email, not her tablet; Dani at his desk with the headset around his neck; Mía two desks away, stopped mid-motion.",
      text: "6:30 p.m. She comes back with paper. She never uses paper.",
      es: "6:30 p.m. Vuelve con papel. Ella nunca usa papel.",
      speaker: "barrett",
      cast: ["barrett", "dani", "mia"],
      lines: [
        {
          speaker: "barrett",
          text: "From legal, six twelve p.m., all three countries. 'Effective tomorrow at eight a.m., the training pilot is suspended in San Salvador, Bogotá and Monterrey pending resolution of the public statement matter.'",
          es: "De legal, seis y doce p.m., los tres países. 'A partir de mañana a las ocho a.m., el piloto de entrenamiento queda suspendido en San Salvador, Bogotá y Monterrey hasta que se resuelva el asunto de la declaración pública'.",
        },
        {
          speaker: "barrett",
          text: "I'm required to read it to you. I'm not required to agree.",
          es: "Estoy obligada a leérselo. No estoy obligada a estar de acuerdo.",
        },
        {
          speaker: "dani",
          text: "Suspended. Today. The day the lights went out and it still worked.",
          es: "Suspendido. Hoy. El día que se fue la luz y aun así funcionó.",
        },
        {
          speaker: "barrett",
          text: "Reed signed it at six. He had the photo at nine. Both things are true. Tomorrow at eight you tell the seventeen yourself, before they read it in the kitchen.",
          es: "Reed lo firmó a las seis. Tenía la foto a las nueve. Las dos cosas son ciertas. Mañana a las ocho se lo decís a los diecisiete vos mismo, antes de que lo lean en la cocina.",
        },
      ],
      words: [
        { word: "effective", es: "a partir de" },
        { word: "suspended", es: "suspendido" },
        { word: "required", es: "obligada" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Night; the bus stop; Dani on the bench with the printed email on his knee; Nico arriving for the night shift with his hood down, reading the paper over Dani's shoulder without taking it.",
      text: "9:45 p.m. Nico reads it standing up.",
      es: "9:45 p.m. Nico lo lee de pie.",
      speaker: "nico",
      cast: ["nico", "dani"],
      lines: [
        {
          speaker: "nico",
          text: "Pending resolution. That's a not yet with a lawyer in it.",
          es: "Hasta que se resuelva. Es un todavía no con un abogado adentro.",
        },
        {
          speaker: "dani",
          text: "Tomorrow at eight I tell seventeen people that Thursday is cancelled. I was about to make a plan for that.",
          es: "Mañana a las ocho le digo a diecisiete personas que el jueves se cancela. Estaba por hacer un plan para eso.",
        },
        {
          speaker: "nico",
          text: "You made one this morning with no lights. Make that one.",
          es: "Hiciste uno esta mañana sin luces. Hacé ese.",
        },
      ],
      words: [
        { word: "pending", es: "pendiente" },
        { word: "lawyer", es: "abogado" },
        { word: "cancelled", es: "cancelado" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s6",
      questionEn: "What did Dani and Julieta do when the power went out?",
      questionEs: "¿Qué hicieron Dani y Julieta cuando se fue la luz?",
      options: [
        { label: "They ran the case on a phone speaker with forty phone lights", emoji: "🔦" },
        { label: "They waited two hours for the generator", emoji: "⏳" },
        { label: "They sent everyone home and rescheduled", emoji: "🏠" },
      ],
      answer: 0,
      sayIt: "I was about to start the first case when suddenly the power went out. So instead of the slides, they ran the case on a phone speaker with forty phone lights.",
      sayItEs: "Estaba por empezar el primer caso cuando de repente se fue la luz. Así que en vez de las diapositivas, corrieron el caso en un altavoz de teléfono con cuarenta luces de celular.",
      sayItCheck: {
        target: "* on a phone speaker *",
        altTargets: ["So instead of the slides *", "* forty phone lights", "I was about to *"],
      },
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "Something you were about to do when the plan changed. The plan, the interruption, what you did instead, how it ended, and what you learned.",
      questionEs: "Algo que estabas por hacer cuando el plan cambió. El plan, la interrupción, qué hiciste en su lugar, cómo terminó, y qué aprendiste.",
      options: [
        { label: "I am ready to answer", emoji: "🎧" },
        { label: "I want to hear Dani's version again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "I was about to start my presentation when suddenly the projector died. So instead of the slides, I told the story from memory and asked two questions. In the end, people remembered more than usual. What I learned is that the plan was the slides, but the presentation was me.",
      sayItEs: "Estaba por empezar mi presentación cuando de repente el proyector murió. Así que en vez de las diapositivas, conté la historia de memoria e hice dos preguntas. Al final, la gente recordó más que de costumbre. Lo que aprendí es que el plan eran las diapositivas, pero la presentación era yo.",
      sayItAskEn: "Start with \"I was about to ...\", then \"when suddenly ...\", then \"So instead, I ...\", then \"In the end ...\", and close with \"What I learned is ...\".",
      sayItAskEs: "Empieza con \"I was about to …\", luego \"when suddenly …\", después \"So instead, I …\", luego \"In the end …\" y cierra con \"What I learned is …\".",
      sayItCheck: {
        target: "I was about to *",
        altTargets: ["* when suddenly *", "So instead *", "In the end *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s5",
    phrase: "When the plan dies, I don't wait for it to come back. I find what's still working and I use that.",
    es: "Cuando el plan muere, no espero a que vuelva. Busco lo que todavía funciona y uso eso.",
  },
  habitCard: {
    afterScene: "s7",
    phrase: "When something goes wrong, I report it in one breath: plan, interruption, what I did, how it ended.",
    es: "Cuando algo sale mal, lo reporto en una sola respiración: plan, interrupción, qué hice, cómo terminó.",
    model: "dani",
    modelActionEs: "Dani le dio a Barrett el apagón completo en cuatro frases, sin excusas y sin adjetivos, y ella lo repitió tal cual.",
  },
  expressions: [
    {
      phrase: "go out",
      variants: ["went out", "goes out", "gone out"],
      es: "apagarse, irse (la luz)",
      kind: "phrasal",
      example: "I was about to run fourteen approved slides when the power went out.",
      exampleEs: "Estaba por correr catorce diapositivas aprobadas cuando se fue la luz.",
    },
    {
      phrase: "find out",
      variants: ["found out", "finding out", "finds out"],
      es: "descubrir, enterarse",
      kind: "phrasal",
      example: "It was the room finding out it didn't need the screen.",
      exampleEs: "Fue la sala descubriendo que no necesitaba la pantalla.",
    },
    {
      phrase: "in the dark",
      variants: ["kept in the dark", "left in the dark"],
      es: "a oscuras; sin información",
      kind: "idiom",
      example: "That's the best picture of this program anyone has ever taken and it's in the dark.",
      exampleEs: "Esa es la mejor foto que alguien ha tomado de este programa y está a oscuras.",
    },
    {
      phrase: "in one breath",
      variants: ["in the same breath", "in a single breath"],
      es: "de un tirón, sin pausa",
      kind: "idiom",
      example: "In one breath, because I'm going to repeat it to someone who doesn't like you.",
      exampleEs: "En una sola respiración, porque se lo voy a repetir a alguien a quien no le caés bien.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: a plan of yours that got interrupted. What you were about to do, what happened suddenly, what you did instead, how it ended, and what you learned.",
    es: "Treinta segundos: un plan tuyo que se interrumpió. Qué estabas por hacer, qué pasó de repente, qué hiciste en su lugar, cómo terminó, y qué aprendiste.",
  },
  continueWith: [
    "I was about to ... I was going to ...",
    "When suddenly ...",
    "So instead of ..., I ...",
    "In the end ... What I learned is ...",
  ],
  cliffhanger: {
    en: "Wednesday, 8:00 a.m.: Dani tells the seventeen. At 9:30, Reed arrives in person and asks him to explain, from zero, how the thing he just suspended works.",
    es: "Miércoles, 8:00 a.m.: Dani se lo dice a los diecisiete. A las 9:30, Reed llega en persona y le pide que explique, desde cero, cómo funciona lo que acaba de suspender.",
  },
};
