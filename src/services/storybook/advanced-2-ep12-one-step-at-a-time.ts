import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced2-ep12-one-step-at-a-time/cover.jpg";
import s1 from "@/assets/storybook/advanced2-ep12-one-step-at-a-time/s1.jpg";
import s2 from "@/assets/storybook/advanced2-ep12-one-step-at-a-time/s2.jpg";
import s3 from "@/assets/storybook/advanced2-ep12-one-step-at-a-time/s3.jpg";
import s4 from "@/assets/storybook/advanced2-ep12-one-step-at-a-time/s4.jpg";
import s5 from "@/assets/storybook/advanced2-ep12-one-step-at-a-time/s5.jpg";
import s6 from "@/assets/storybook/advanced2-ep12-one-step-at-a-time/s6.jpg";
import s7 from "@/assets/storybook/advanced2-ep12-one-step-at-a-time/s7.jpg";
import s8 from "@/assets/storybook/advanced2-ep12-one-step-at-a-time/s8.jpg";
import s9 from "@/assets/storybook/advanced2-ep12-one-step-at-a-time/s9.jpg";

export const ADVANCED2_EP12_ONE_STEP_AT_A_TIME: StorybookEpisode = {
  id: "advanced2-ep12-one-step-at-a-time",
  moduleId: "advanced-2",
  week: 3,
  title: "One step at a time",
  titleEs: "Un paso a la vez",
  episodeLabel: {
    en: "Advanced 2 · Episode 12",
    es: "Advanced 2 · Episodio 12",
  },
  previously: [
    {
      en: "Dani apologized once to Julieta and gave her the facts.",
      es: "Dani se disculpó una vez con Julieta y le dio los hechos.",
    },
    {
      en: "The courier arrived at 2:40. Day one ran on paper.",
      es: "La mensajería llegó a las 2:40. El día uno corrió en papel.",
    },
    {
      en: "Bogotá's platform goes live at seven. What could go wrong.",
      es: "La plataforma de Bogotá sale en vivo a las siete. Qué podría salir mal.",
    },
  ],
  reviewWords: [
    { word: "frozen", es: "congelada" },
    { word: "step", es: "paso" },
    { word: "screen", es: "pantalla" },
    { word: "connected", es: "conectado" },
    { word: "update", es: "actualización" },
  ],
  blurb: {
    en: "The platform freezes in Bogotá with fifteen agents watching. Dani starts saying six fixes at once, and Nico puts a hand on his arm. One step. Check. Next step. It works, and on the floor Óscar fixes a router in four sentences. Then Mía films something she shouldn't.",
    es: "La plataforma se congela en Bogotá con quince agentes mirando. Dani empieza a decir seis arreglos al mismo tiempo, y Nico le pone una mano en el brazo. Un paso. Confirmar. Siguiente paso. Funciona, y en el piso Óscar arregla un router en cuatro frases. Después Mía graba algo que no debería.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Tuesday, 7:05 a.m.; Dani at his desk with the laptop, Julieta on the screen in front of a grey frozen login page; Nico in the next chair, hood up, one hand resting on Dani's forearm.",
      text: "Tuesday, 7:05 a.m. Bogotá time.",
      es: "Martes, 7:05 a.m. Hora de Bogotá.",
      speaker: "julieta",
      cast: ["julieta", "dani", "nico"],
      lines: [
        {
          speaker: "julieta",
          text: "It's frozen. Fifteen people looking at a grey screen. Their IT is in a meeting until eight.",
          es: "Está congelada. Quince personas mirando una pantalla gris. Su IT está en una reunión hasta las ocho.",
        },
        {
          speaker: "dani",
          text: "Okay, refresh it, clear the cache, log out, try another browser, restart the—",
          es: "Ok, refresca, limpia el caché, cierra sesión, prueba otro navegador, reinicia el...",
        },
        {
          speaker: "nico",
          text: "One.",
          es: "Uno.",
        },
        {
          speaker: "dani",
          text: "...Don't worry — we're going to check this together. First, could you tell me what you see on the screen?",
          es: "...No te preocupes, vamos a revisar esto juntos. Primero, ¿me podrías decir qué ves en la pantalla?",
        },
      ],
      words: [
        { word: "frozen", es: "congelada" },
        { word: "refresh", es: "refrescar" },
        { word: "browser", es: "navegador" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Close on Julieta's screen shared on the laptop: a grey page, a spinning circle, the Northline logo, a small button on the right side labeled SESSION.",
      text: "One step. Then check.",
      es: "Un paso. Luego confirmar.",
      speaker: "dani",
      cast: ["dani", "julieta"],
      lines: [
        {
          speaker: "julieta",
          text: "Grey. A spinning circle. The Northline logo. A button that says 'session'.",
          es: "Gris. Un círculo girando. El logo de Northline. Un botón que dice 'session'.",
        },
        {
          speaker: "dani",
          text: "Perfect. Now press the button on the right side, the session one. Let me know when you see the blue light on the header.",
          es: "Perfecto. Ahora presiona el botón del lado derecho, el de session. Avísame cuando veas la luz azul en el encabezado.",
        },
        {
          speaker: "julieta",
          text: "Pressed. Nothing.",
          es: "Presionado. Nada.",
        },
        {
          speaker: "dani",
          text: "If nothing happens, that tells me something useful. It means Friday's session is still open on their side.",
          es: "Si no pasa nada, eso me dice algo útil. Significa que la sesión del viernes sigue abierta de su lado.",
        },
      ],
      words: [
        { word: "spinning", es: "girando" },
        { word: "header", es: "encabezado" },
        { word: "useful", es: "útil" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "The same laptop screen, now with a blue bar across the top of the page; Julieta's face in the corner, eyebrows up; behind her, fifteen monitors coming to life.",
      text: "Next step.",
      es: "Siguiente paso.",
      speaker: "dani",
      cast: ["dani", "julieta"],
      lines: [
        {
          speaker: "dani",
          text: "Next step: log out, but don't close the window. Then log in again.",
          es: "Siguiente paso: cierra sesión, pero no cierres la ventana. Luego vuelve a entrar.",
        },
        {
          speaker: "julieta",
          text: "Logging out. Logging in. ...Blue light.",
          es: "Cerrando sesión. Entrando. ...Luz azul.",
        },
        {
          speaker: "dani",
          text: "Great — that means the device is connected. The last step is to open the app one more time. Does that work on all fifteen?",
          es: "Genial, eso significa que el dispositivo está conectado. El último paso es abrir la aplicación una vez más. ¿Funciona en las quince?",
        },
        {
          speaker: "julieta",
          text: "Fifteen screens. Fifteen. Why did it happen?",
          es: "Quince pantallas. Quince. ¿Por qué pasó?",
        },
        {
          speaker: "dani",
          text: "It happened because the last update didn't finish correctly on Friday. Same night as the files.",
          es: "Pasó porque la última actualización no terminó correctamente el viernes. La misma noche de los archivos.",
        },
      ],
      words: [
        { word: "window", es: "ventana" },
        { word: "device", es: "dispositivo" },
        { word: "update", es: "actualización" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Dani leaning back in his chair, breathing out; Nico taking his hand off Dani's arm and going back to his own monitor without a word; Mía arriving with her headset on.",
      text: "7:14 a.m. Nine minutes.",
      es: "7:14 a.m. Nueve minutos.",
      speaker: "mia",
      cast: ["mia", "dani", "nico"],
      lines: [
        {
          speaker: "mia",
          text: "You were going to say six things.",
          es: "Ibas a decir seis cosas.",
        },
        {
          speaker: "dani",
          text: "Seven.",
          es: "Siete.",
        },
        {
          speaker: "nico",
          text: "You said one. Then you waited. Waiting is the part. One step at a time. You know this.",
          es: "Dijiste una. Después esperaste. Esperar es la parte. Un paso a la vez. Eso lo sabes.",
        },
        {
          speaker: "dani",
          text: "I know it on the phone. At 7:05 with fifteen people watching, my mouth forgot.",
          es: "Lo sé en el teléfono. A las 7:05 con quince personas mirando, a mi boca se le olvidó.",
        },
      ],
      words: [
        { word: "waited", es: "esperaste" },
        { word: "forgot", es: "se le olvidó" },
        { word: "watching", es: "mirando" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "9:30 a.m.; the wall screen reads HOME INTERNET, TECHNICAL SUPPORT; Óscar on a call with a router diagram on his screen, one finger following the steps; Dani listening from his own desk. No customer is drawn.",
      text: "9:30 a.m. Óscar's turn.",
      es: "9:30 a.m. El turno de Óscar.",
      speaker: "oscar",
      lines: [
        {
          speaker: "caller",
          text: "The internet is dead. The other guy had me on the phone for forty minutes yesterday.",
          es: "El internet está muerto. El otro muchacho me tuvo cuarenta minutos al teléfono ayer.",
        },
        {
          speaker: "oscar",
          text: "Don't worry — we're going to check this together. First, could you tell me what you see on the router?",
          es: "No se preocupe, vamos a revisar esto juntos. Primero, ¿me podría decir qué ve en el router?",
        },
        {
          speaker: "caller",
          text: "A red light.",
          es: "Una luz roja.",
        },
        {
          speaker: "oscar",
          text: "Perfect. Now press the button on the right side and hold it for five seconds. Let me know when you see the blue light.",
          es: "Perfecto. Ahora presione el botón del lado derecho y manténgalo cinco segundos. Avíseme cuando vea la luz azul.",
        },
      ],
      words: [
        { word: "router", es: "router" },
        { word: "hold", es: "mantener" },
        { word: "seconds", es: "segundos" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Close on Óscar's hand, flat on the desk, not moving; the call timer at 3:50; Mía over the divider with her mouth open.",
      text: "He waits. He doesn't fill the silence.",
      es: "Espera. No llena el silencio.",
      speaker: "oscar",
      lines: [
        {
          speaker: "caller",
          text: "...It's blinking. Now it's blue.",
          es: "...Está parpadeando. Ahora está azul.",
        },
        {
          speaker: "oscar",
          text: "Great — that means the device is connected. The last step is to open the app one more time. Does that work?",
          es: "Genial, eso significa que el dispositivo está conectado. El último paso es abrir la aplicación una vez más. ¿Funciona?",
        },
        {
          speaker: "caller",
          text: "It works. That's it? Four minutes?",
          es: "Funciona. ¿Eso es todo? ¿Cuatro minutos?",
        },
        {
          speaker: "oscar",
          text: "The other guy did all the steps at once. I only did one.",
          es: "El otro muchacho hizo todos los pasos al mismo tiempo. Yo solo hice uno.",
        },
      ],
      words: [
        { word: "blinking", es: "parpadeando" },
        { word: "silence", es: "silencio" },
        { word: "minutes", es: "minutos" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Ms. Barrett at the end of the row holding her phone with an email open, Dani standing, Óscar still seated with his headset around his neck.",
      text: "11:00 a.m. Barrett has an email.",
      es: "11:00 a.m. Barrett tiene un correo.",
      speaker: "barrett",
      cast: ["barrett", "dani", "oscar"],
      lines: [
        {
          speaker: "barrett",
          text: "Bogotá IT wants to know who fixed their platform from San Salvador before their meeting ended.",
          es: "IT de Bogotá quiere saber quién arregló su plataforma desde San Salvador antes de que terminara su reunión.",
        },
        {
          speaker: "dani",
          text: "Julieta fixed it. I said the steps. Nico held my arm.",
          es: "Julieta la arregló. Yo dije los pasos. Nico me sostuvo el brazo.",
        },
        {
          speaker: "barrett",
          text: "I'm not writing that last part in the reply.",
          es: "Esa última parte no la voy a escribir en la respuesta.",
        },
        {
          speaker: "dani",
          text: "Write it. It's the useful part.",
          es: "Escríbala. Es la parte útil.",
        },
      ],
      words: [
        { word: "fixed", es: "arregló" },
        { word: "reply", es: "respuesta" },
        { word: "held", es: "sostuvo" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Break room; Mía holding her phone up horizontally, filming; Dani in the doorway with a coffee, one hand half raised; Nico behind Mía, not helping either side.",
      text: "12:40 p.m. Mía has her phone up.",
      es: "12:40 p.m. Mía tiene el celular arriba.",
      speaker: "mia",
      cast: ["mia", "dani", "nico"],
      lines: [
        {
          speaker: "mia",
          text: "Say the 'one step' thing again. For the camera. Slower.",
          es: "Di lo de 'un paso' otra vez. Para la cámara. Más lento.",
        },
        {
          speaker: "dani",
          text: "No cameras on the floor, Mía.",
          es: "Sin cámaras en el piso, Mía.",
        },
        {
          speaker: "mia",
          text: "It's the break room. And I already have the floor one from this morning.",
          es: "Es la sala de descanso. Y ya tengo la del piso de esta mañana.",
        },
        {
          speaker: "dani",
          text: "You have what?",
          es: "¿Tienes qué?",
        },
        {
          speaker: "nico",
          text: "Forty seconds. You, the laptop, my hand. I'm in it.",
          es: "Cuarenta segundos. Tú, la laptop, mi mano. Yo salgo.",
        },
      ],
      words: [
        { word: "camera", es: "cámara" },
        { word: "slower", es: "más lento" },
        { word: "morning", es: "mañana" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Night; Dani and Nico at the bus stop; Dani reading a message on his phone; the Northline sign lit behind them.",
      text: "9:50 p.m. Bogotá, again.",
      es: "9:50 p.m. Bogotá, otra vez.",
      speaker: "nico",
      cast: ["nico", "dani"],
      lines: [
        {
          speaker: "dani",
          text: "'Day two done. Fifteen. My agents want the man on the phone to come to Bogotá.'",
          es: "'Día dos listo. Quince. Mis agentes quieren que el hombre del teléfono venga a Bogotá.'",
        },
        {
          speaker: "nico",
          text: "Tell her you'll go one step at a time.",
          es: "Dile que irás un paso a la vez.",
        },
        {
          speaker: "dani",
          text: "Tomorrow I have to tell Mía she can't post you.",
          es: "Mañana tengo que decirle a Mía que no puede publicarte.",
        },
        {
          speaker: "nico",
          text: "Good. I looked calm. That's my whole brand.",
          es: "Bien. Me veía calmado. Esa es toda mi marca.",
        },
      ],
      words: [
        { word: "agents", es: "agentes" },
        { word: "post", es: "publicar" },
        { word: "calm", es: "calmado" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What did Nico do when Dani started listing six fixes at once?",
      questionEs: "¿Qué hizo Nico cuando Dani empezó a decir seis arreglos al mismo tiempo?",
      options: [
        { label: "He put a hand on his arm and said 'One'", emoji: "✋" },
        { label: "He took the laptop and fixed it himself", emoji: "💻" },
        { label: "He called Bogotá's IT team", emoji: "📞" },
      ],
      answer: 0,
      sayIt: "He put a hand on his arm and said 'One'.",
      sayItEs: "Le puso una mano en el brazo y dijo 'Uno'.",
      sayItCheck: {
        target: "* said one",
        altTargets: ["He put a hand on his arm *", "He slowed him down", "A hand on his arm *"],
      },
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "Someone's device isn't working. Calm them, ask what they see, give one step, and check before the next one.",
      questionEs: "El dispositivo de alguien no funciona. Cálmalo, pregunta qué ve, da un solo paso, y confirma antes del siguiente.",
      options: [
        { label: "I am ready to answer", emoji: "🎧" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "Don't worry — we're going to check this together. First, could you tell me what you see on the screen? Now press the button on the right side. Let me know when you see the blue light.",
      sayItEs: "No se preocupe, vamos a revisar esto juntos. Primero, ¿me podría decir qué ve en la pantalla? Ahora presione el botón del lado derecho. Avíseme cuando vea la luz azul.",
      sayItAskEn: "Start with \"Don't worry — we're going to check this together\", then \"First, could you tell me ...\", give one step, and close with \"Let me know when ...\".",
      sayItAskEs: "Empieza con \"Don't worry — we're going to check this together\", luego \"First, could you tell me …\", da un paso, y cierra con \"Let me know when …\".",
      sayItCheck: {
        target: "First, could you tell me *",
        altTargets: ["Let me know when *", "Does that work *", "Don't worry *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s3",
    phrase: "One step. Then I wait for the answer. The silence is where the fix happens.",
    es: "Un paso. Luego espero la respuesta. El silencio es donde ocurre el arreglo.",
  },
  habitCard: {
    afterScene: "s6",
    phrase: "After every step I give, I ask what they see before I give the next one.",
    es: "Después de cada paso que doy, pregunto qué ven antes de dar el siguiente.",
    model: "oscar",
    modelActionEs: "Óscar dio un paso, puso la mano plana en el escritorio y esperó la luz azul en vez de llenar el silencio.",
  },
  expressions: [
    {
      phrase: "log out",
      variants: ["log in", "logging out", "logged out", "log off"],
      es: "cerrar sesión (log in: iniciar sesión)",
      kind: "phrasal",
      example: "Next step: log out, but don't close the window. Then log in again.",
      exampleEs: "Siguiente paso: cierra sesión, pero no cierres la ventana. Luego vuelve a entrar.",
    },
    {
      phrase: "hold it",
      variants: ["hold it for", "held it", "hold the button"],
      es: "mantener presionado",
      kind: "phrasal",
      example: "Now press the button on the right side and hold it for five seconds.",
      exampleEs: "Ahora presione el botón del lado derecho y manténgalo cinco segundos.",
    },
    {
      phrase: "at once",
      variants: ["all at once"],
      es: "al mismo tiempo, todo junto",
      kind: "idiom",
      example: "The other guy did all the steps at once. I only did one.",
      exampleEs: "El otro muchacho hizo todos los pasos al mismo tiempo. Yo solo hice uno.",
    },
    {
      phrase: "one step at a time",
      variants: ["a step at a time", "one at a time"],
      es: "un paso a la vez",
      kind: "idiom",
      example: "Waiting is the part. One step at a time. You know this.",
      exampleEs: "Esperar es la parte. Un paso a la vez. Eso lo sabes.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: walk someone through a fix on the phone. Ask what they see, give exactly one step, wait for the answer, then the next step.",
    es: "Treinta segundos: guía a alguien por teléfono para arreglar algo. Pregunta qué ve, da exactamente un paso, espera la respuesta, y luego el siguiente.",
  },
  continueWith: [
    "Don't worry — we're going to check this together.",
    "First, could you tell me what you see on ...?",
    "Perfect. Now ... Let me know when you see ...",
    "Great — that means ... The last step is ...",
  ],
  cliffhanger: {
    en: "Tomorrow: Mía wants to post forty seconds of the floor. Northline's policy says no phones on the floor, and Dani has to say why without sounding like a policy.",
    es: "Mañana: Mía quiere publicar cuarenta segundos del piso. La política de Northline dice sin celulares en el piso, y Dani tiene que decir por qué sin sonar como una política.",
  },
};
