import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced2-ep11-bogota-is-waiting/cover.jpg";
import s1 from "@/assets/storybook/advanced2-ep11-bogota-is-waiting/s1.jpg";
import s2 from "@/assets/storybook/advanced2-ep11-bogota-is-waiting/s2.jpg";
import s3 from "@/assets/storybook/advanced2-ep11-bogota-is-waiting/s3.jpg";
import s4 from "@/assets/storybook/advanced2-ep11-bogota-is-waiting/s4.jpg";
import s5 from "@/assets/storybook/advanced2-ep11-bogota-is-waiting/s5.jpg";
import s6 from "@/assets/storybook/advanced2-ep11-bogota-is-waiting/s6.jpg";
import s7 from "@/assets/storybook/advanced2-ep11-bogota-is-waiting/s7.jpg";
import s8 from "@/assets/storybook/advanced2-ep11-bogota-is-waiting/s8.jpg";
import s9 from "@/assets/storybook/advanced2-ep11-bogota-is-waiting/s9.jpg";

export const ADVANCED2_EP11_BOGOTA_IS_WAITING: StorybookEpisode = {
  id: "advanced2-ep11-bogota-is-waiting",
  moduleId: "advanced-2",
  week: 3,
  title: "Bogotá is waiting",
  titleEs: "Bogotá está esperando",
  episodeLabel: {
    en: "Advanced 2 · Episode 11",
    es: "Advanced 2 · Episodio 11",
  },
  previously: [
    {
      en: "Mía stayed. Finance said yes to fifteen agents in Bogotá.",
      es: "Mía se quedó. Finanzas dijo que sí a quince agentes en Bogotá.",
    },
    {
      en: "Dani sent Julieta a summary instead of the files, then the wrong files.",
      es: "Dani le mandó a Julieta un resumen en vez de los archivos, y después los archivos equivocados.",
    },
    {
      en: "Monday, seven a.m., Bogotá time.",
      es: "Lunes, siete a.m., hora de Bogotá.",
    },
  ],
  reviewWords: [
    { word: "apology", es: "disculpa" },
    { word: "facts", es: "hechos" },
    { word: "courier", es: "mensajería" },
    { word: "replacement", es: "reemplazo" },
    { word: "excuse", es: "excusa" },
  ],
  blurb: {
    en: "Fifteen agents in Bogotá, seven in the morning, and the wrong files. Julieta is furious and she's right. Dani wants to apologize five times and gets to apologize once; after that, only facts and what he's going to do. Then a customer with a late package gets exactly the same call.",
    es: "Quince agentes en Bogotá, siete de la mañana, y los archivos equivocados. Julieta está furiosa y tiene razón. Dani quiere disculparse cinco veces y le toca disculparse una; después, solo hechos y lo que va a hacer. Luego un cliente con un paquete atrasado recibe exactamente la misma llamada.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "The Northline floor before opening, lights half on; Dani alone at his desk in front of a laptop; on the screen, Julieta in a white shirt and badge with fifteen blurred agents behind her.",
      text: "Monday, 6:00 a.m. Seven in Bogotá.",
      es: "Lunes, 6:00 a.m. Las siete en Bogotá.",
      speaker: "julieta",
      cast: ["julieta", "dani"],
      lines: [
        {
          speaker: "julieta",
          text: "Fifteen agents. Seven a.m. The files from Friday night are the June version. The right ones came Saturday at eleven, so nobody printed them out. Go.",
          es: "Quince agentes. Siete a.m. Los archivos del viernes en la noche son la versión de junio. Los buenos llegaron el sábado a las once, así que nadie los imprimió. Adelante.",
        },
        {
          speaker: "dani",
          text: "I'm sorry about this — you should have received the right files on Friday.",
          es: "Lamento esto. Debiste haber recibido los archivos correctos el viernes.",
        },
        {
          speaker: "julieta",
          text: "One apology. Good. Now the facts.",
          es: "Una disculpa. Bien. Ahora los hechos.",
        },
      ],
      words: [
        { word: "version", es: "versión" },
        { word: "printed", es: "imprimió" },
        { word: "apology", es: "disculpa" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Close on Dani's laptop: an email thread with two attachments, one marked June, one marked Saturday 10:52 p.m.; Julieta's face small in the corner of the screen, not blinking.",
      text: "He wants to say sorry four more times. He doesn't.",
      es: "Quiere decir perdón cuatro veces más. No lo hace.",
      speaker: "dani",
      cast: ["dani", "julieta"],
      lines: [
        {
          speaker: "dani",
          text: "Here's what I can see in the system right now. The Friday email had the June folder. The Saturday email had the right folder, sent at 10:52 your time. Nobody opened it because it was Saturday night.",
          es: "Esto es lo que veo en el sistema ahora mismo. El correo del viernes tenía la carpeta de junio. El del sábado tenía la carpeta correcta, enviada a las 10:52 hora tuya. Nadie lo abrió porque era sábado en la noche.",
        },
        {
          speaker: "julieta",
          text: "That last part is not a fact. That's a reason for me to feel sorry for you. Take it out.",
          es: "Esa última parte no es un hecho. Es una razón para que yo sienta lástima por ti. Quítala.",
        },
        {
          speaker: "dani",
          text: "Taken out. I'm not going to promise you something I can't control. I can't print in Bogotá.",
          es: "Quitada. No te voy a prometer algo que no puedo controlar. No puedo imprimir en Bogotá.",
        },
        {
          speaker: "julieta",
          text: "Keep going.",
          es: "Sigue.",
        },
      ],
      words: [
        { word: "folder", es: "carpeta" },
        { word: "fact", es: "hecho" },
        { word: "control", es: "controlar" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Dani's phone on the desk, screen up, a folder of images uploading with a progress bar; his other hand on the laptop; Julieta on the screen already turning to her agents.",
      text: "Now what he's going to do.",
      es: "Ahora lo que va a hacer.",
      speaker: "dani",
      cast: ["dani", "julieta"],
      lines: [
        {
          speaker: "dani",
          text: "Here's what I'm going to do: I'm sending the first two days to your phone right now, as images, so you can put them on the big screen. The printed copies go to your office by courier today. You'll get a tracking number within the hour.",
          es: "Esto es lo que voy a hacer: te mando los primeros dos días a tu celular ahora mismo, como imágenes, para que los pongas en la pantalla grande. Las copias impresas salen a tu oficina por mensajería hoy. Tendrás un número de rastreo en menos de una hora.",
        },
        {
          speaker: "julieta",
          text: "And if the courier is late too?",
          es: "¿Y si la mensajería también llega tarde?",
        },
        {
          speaker: "dani",
          text: "Then Tuesday runs from the screen as well, and I'll follow this personally until it's finished.",
          es: "Entonces el martes también se trabaja desde la pantalla, y yo le doy seguimiento personalmente hasta que termine.",
        },
        {
          speaker: "julieta",
          text: "Send the images. I'm starting.",
          es: "Manda las imágenes. Empiezo.",
        },
      ],
      words: [
        { word: "images", es: "imágenes" },
        { word: "courier", es: "mensajería" },
        { word: "tracking", es: "rastreo" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "7:30 a.m.; the floor filling up; Camila in her visitor lanyard standing at Dani's desk with her tablet; Nico arriving behind her, hood up.",
      text: "Camila was listening from the door.",
      es: "Camila escuchaba desde la puerta.",
      speaker: "camila",
      cast: ["camila", "dani", "nico"],
      lines: [
        {
          speaker: "camila",
          text: "How many times did you apologize?",
          es: "¿Cuántas veces te disculpaste?",
        },
        {
          speaker: "dani",
          text: "Once. I wanted five.",
          es: "Una. Quería cinco.",
        },
        {
          speaker: "camila",
          text: "Which one did she accept?",
          es: "¿Cuál aceptó?",
        },
        {
          speaker: "dani",
          text: "The first one. The facts did the rest. She also cut an excuse out of me like a doctor.",
          es: "La primera. Los hechos hicieron el resto. También me sacó una excusa como un doctor.",
        },
        {
          speaker: "nico",
          text: "I heard the sorry. I didn't hear an excuse. So it worked.",
          es: "Oí el perdón. No oí una excusa. Entonces funcionó.",
        },
      ],
      words: [
        { word: "apologize", es: "disculparse" },
        { word: "accept", es: "aceptar" },
        { word: "excuse", es: "excusa" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "9:00 a.m.; the wall screen reads DELIVERY, LATE PACKAGES; Dani on a call, headset on, a tracking page on his screen with one step missing in the chain. No customer is drawn.",
      text: "9:00 a.m. Account of the day: late packages. Of course.",
      es: "9:00 a.m. Cuenta del día: paquetes atrasados. Por supuesto.",
      speaker: "dani",
      lines: [
        {
          speaker: "caller",
          text: "This is the third day I'm waiting. Nobody tells me anything!",
          es: "Es el tercer día que espero. ¡Nadie me dice nada!",
        },
        {
          speaker: "dani",
          text: "I'm sorry about this — you should have received it on Monday. Here's what I can see in the system right now. The package left our warehouse, but it was never scanned at the city center.",
          es: "Lamento esto. Debió haberlo recibido el lunes. Esto es lo que veo en el sistema ahora mismo. El paquete salió de nuestra bodega, pero nunca fue escaneado en el centro de la ciudad.",
        },
        {
          speaker: "caller",
          text: "I don't want explanations. I want my money back today.",
          es: "No quiero explicaciones. Quiero mi dinero de vuelta hoy.",
        },
      ],
      words: [
        { word: "waiting", es: "esperando" },
        { word: "warehouse", es: "bodega" },
        { word: "scanned", es: "escaneado" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Close on Dani opening a case form on his screen, the word URGENT selected; his voice calm; Óscar watching from the next desk with his own headset half on.",
      text: "Same call as six a.m. Different city.",
      es: "La misma llamada de las seis. Otra ciudad.",
      speaker: "dani",
      lines: [
        {
          speaker: "dani",
          text: "I'm not going to promise you something I can't control. Here's what I'm going to do: I'm opening an urgent case today. You'll get an answer within twenty-four hours. If the package doesn't appear, we send a replacement at no cost.",
          es: "No le voy a prometer algo que no puedo controlar. Esto es lo que voy a hacer: abro un caso urgente hoy. Tendrá una respuesta en menos de veinticuatro horas. Si el paquete no aparece, le enviamos un reemplazo sin costo.",
        },
        {
          speaker: "caller",
          text: "And who calls me? Nobody ever calls me.",
          es: "¿Y quién me llama? Nunca nadie me llama.",
        },
        {
          speaker: "dani",
          text: "I do. I'll follow this personally until it's finished. Tomorrow before this hour.",
          es: "Yo. Le doy seguimiento personalmente hasta que termine. Mañana antes de esta hora.",
        },
        {
          speaker: "caller",
          text: "You're the first one who said a time.",
          es: "Es el primero que dice una hora.",
        },
      ],
      words: [
        { word: "urgent", es: "urgente" },
        { word: "replacement", es: "reemplazo" },
        { word: "personally", es: "personalmente" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Break room; Mía on the counter, Óscar at the table with a sandwich, Nico by the vending machine, Dani in the doorway with his coffee.",
      text: "12:30 p.m. Break room.",
      es: "12:30 p.m. Sala de descanso.",
      speaker: "mia",
      cast: ["mia", "oscar", "nico", "dani"],
      lines: [
        {
          speaker: "mia",
          text: "You said sorry once to the package lady too. I counted.",
          es: "También le dijiste perdón una vez a la señora del paquete. Conté.",
        },
        {
          speaker: "dani",
          text: "Once is the whole apology. Twice is asking her to take care of me.",
          es: "Una vez es toda la disculpa. Dos veces es pedirle que me cuide a mí.",
        },
        {
          speaker: "oscar",
          text: "I say sorry like nine times per call.",
          es: "Yo digo perdón como nueve veces por llamada.",
        },
        {
          speaker: "nico",
          text: "Ten. I counted Friday.",
          es: "Diez. Conté el viernes.",
        },
        {
          speaker: "mia",
          text: "We all counted Friday, Óscar.",
          es: "Todos contamos el viernes, Óscar.",
        },
      ],
      words: [
        { word: "counted", es: "conté" },
        { word: "twice", es: "dos veces" },
        { word: "whole", es: "entera" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "4:00 p.m.; Julieta on the laptop screen again, calmer, a stack of printed pages visible on her desk, a courier envelope torn open beside them.",
      text: "4:00 p.m. Bogotá calls back.",
      es: "4:00 p.m. Bogotá vuelve a llamar.",
      speaker: "julieta",
      cast: ["julieta", "dani"],
      lines: [
        {
          speaker: "julieta",
          text: "The courier came at 2:40. The images worked until then. Two agents asked who the man on the phone was.",
          es: "La mensajería llegó a las 2:40. Las imágenes funcionaron hasta entonces. Dos agentes preguntaron quién era el hombre del teléfono.",
        },
        {
          speaker: "dani",
          text: "What did you tell them?",
          es: "¿Qué les dijiste?",
        },
        {
          speaker: "julieta",
          text: "That he sends the wrong file first and then follows it until it's finished. They wrote down the second part.",
          es: "Que manda el archivo equivocado primero y después le da seguimiento hasta que termina. Anotaron la segunda parte.",
        },
        {
          speaker: "dani",
          text: "I'll take the second part.",
          es: "Me quedo con la segunda parte.",
        },
      ],
      words: [
        { word: "courier", es: "mensajería" },
        { word: "worked", es: "funcionaron" },
        { word: "asked", es: "preguntaron" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Night; Camila and Dani at the end of the empty row, Camila closing her tablet, the wall screen behind them already showing tomorrow's account: BOGOTÁ PLATFORM, GO LIVE.",
      text: "7:40 p.m. Tomorrow's screen is already up.",
      es: "7:40 p.m. La pantalla de mañana ya está puesta.",
      speaker: "camila",
      cast: ["camila", "dani"],
      lines: [
        {
          speaker: "camila",
          text: "Bogotá's platform goes live tomorrow at seven. Their system, their IT, not ours.",
          es: "La plataforma de Bogotá sale en vivo mañana a las siete. Su sistema, su IT, no el nuestro.",
        },
        {
          speaker: "dani",
          text: "What could go wrong.",
          es: "Qué podría salir mal.",
        },
        {
          speaker: "camila",
          text: "Don't say that on a Monday.",
          es: "No digas eso un lunes.",
        },
      ],
      words: [
        { word: "platform", es: "plataforma" },
        { word: "system", es: "sistema" },
        { word: "wrong", es: "mal" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s2",
      questionEn: "Which part of Dani's answer did Julieta make him take out, and why?",
      questionEs: "¿Qué parte de la respuesta de Dani le hizo quitar Julieta, y por qué?",
      options: [
        { label: "'Nobody opened it because it was Saturday night', because it's an excuse, not a fact", emoji: "✂️" },
        { label: "'I'm sorry about this', because she doesn't want apologies", emoji: "🙅" },
        { label: "The time of the Saturday email, because it was wrong", emoji: "🕚" },
      ],
      answer: 0,
      sayIt: "The Saturday night part, because it's an excuse, not a fact.",
      sayItEs: "La parte del sábado en la noche, porque es una excusa, no un hecho.",
      sayItCheck: {
        target: "* Saturday night *",
        altTargets: ["Because it was an excuse *", "Nobody opened it *", "It's not a fact *"],
      },
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "A customer's delivery is three days late and they're angry. Apologize once, give the facts, and say what you're going to do.",
      questionEs: "La entrega de un cliente lleva tres días de retraso y está enojado. Discúlpate una vez, da los hechos, y di qué vas a hacer.",
      options: [
        { label: "I am ready to answer", emoji: "🎧" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "I'm sorry about this — you should have received it on Monday. Here's what I can see in the system right now. Here's what I'm going to do: I'm opening an urgent case today.",
      sayItEs: "Lamento esto. Debió haberlo recibido el lunes. Esto es lo que veo en el sistema ahora mismo. Esto es lo que voy a hacer: abro un caso urgente hoy.",
      sayItAskEn: "Start with \"I'm sorry about this\", then \"Here's what I can see ...\", and close with \"Here's what I'm going to do: ...\".",
      sayItAskEs: "Empieza con \"I'm sorry about this\", luego \"Here's what I can see …\" y cierra con \"Here's what I'm going to do: …\".",
      sayItCheck: {
        target: "I'm sorry about this *",
        altTargets: ["Here's what I'm going to do *", "Here's what I can see *", "I'm sorry *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s4",
    phrase: "One apology. Then facts. Then what I'm going to do. Nothing else.",
    es: "Una disculpa. Luego hechos. Luego lo que voy a hacer. Nada más.",
  },
  habitCard: {
    afterScene: "s6",
    phrase: "When I say what I'm going to do, I say a time, and then I'm the one who calls.",
    es: "Cuando digo lo que voy a hacer, digo una hora, y después soy yo quien llama.",
    model: "dani",
    modelActionEs: "Dani le dio a la clienta una hora exacta y su propio nombre, y ella le dijo que era el primero que decía una hora.",
  },
  expressions: [
    {
      phrase: "print out",
      variants: ["printed out", "prints out", "printing out", "printed them out"],
      es: "imprimir",
      kind: "phrasal",
      example: "The right ones came Saturday at eleven, so nobody printed them out.",
      exampleEs: "Los buenos llegaron el sábado a las once, así que nadie los imprimió.",
    },
    {
      phrase: "take out",
      variants: ["take it out", "taken out", "took out", "taking out"],
      es: "quitar, sacar (de un texto o una respuesta)",
      kind: "phrasal",
      example: "That's a reason for me to feel sorry for you. Take it out.",
      exampleEs: "Es una razón para que yo sienta lástima por ti. Quítala.",
    },
    {
      phrase: "at no cost",
      variants: ["at no extra cost", "no cost"],
      es: "sin costo",
      kind: "idiom",
      example: "If the package doesn't appear, we send a replacement at no cost.",
      exampleEs: "Si el paquete no aparece, le enviamos un reemplazo sin costo.",
    },
    {
      phrase: "what could go wrong",
      variants: ["what could possibly go wrong"],
      es: "qué podría salir mal (irónico)",
      kind: "idiom",
      example: "What could go wrong.",
      exampleEs: "Qué podría salir mal.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: something you were responsible for arrived late. Apologize once, say only the facts, and say what you're going to do with a time.",
    es: "Treinta segundos: algo de lo que eras responsable llegó tarde. Discúlpate una vez, di solo los hechos, y di qué vas a hacer con una hora.",
  },
  continueWith: [
    "I'm sorry about this — you should have received it on ...",
    "Here's what I can see in the system right now.",
    "I'm not going to promise you something I can't control.",
    "Here's what I'm going to do: ... You'll get an answer within ...",
  ],
  cliffhanger: {
    en: "Tomorrow at seven, Bogotá's platform goes live. At 7:05, fifteen agents are looking at a grey screen, and Dani is going to say six steps at once.",
    es: "Mañana a las siete, la plataforma de Bogotá sale en vivo. A las 7:05, quince agentes miran una pantalla gris, y Dani va a decir seis pasos al mismo tiempo.",
  },
};
