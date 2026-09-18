import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced2-ep15-not-this-thursday/cover.jpg";
import s1 from "@/assets/storybook/advanced2-ep15-not-this-thursday/s1.jpg";
import s2 from "@/assets/storybook/advanced2-ep15-not-this-thursday/s2.jpg";
import s3 from "@/assets/storybook/advanced2-ep15-not-this-thursday/s3.jpg";
import s4 from "@/assets/storybook/advanced2-ep15-not-this-thursday/s4.jpg";
import s5 from "@/assets/storybook/advanced2-ep15-not-this-thursday/s5.jpg";
import s6 from "@/assets/storybook/advanced2-ep15-not-this-thursday/s6.jpg";
import s7 from "@/assets/storybook/advanced2-ep15-not-this-thursday/s7.jpg";
import s8 from "@/assets/storybook/advanced2-ep15-not-this-thursday/s8.jpg";
import s9 from "@/assets/storybook/advanced2-ep15-not-this-thursday/s9.jpg";

export const ADVANCED2_EP15_NOT_THIS_THURSDAY: StorybookEpisode = {
  id: "advanced2-ep15-not-this-thursday",
  moduleId: "advanced-2",
  week: 3,
  title: "Not this Thursday",
  titleEs: "Este jueves no",
  episodeLabel: {
    en: "Advanced 2 · Episode 15",
    es: "Advanced 2 · Episodio 15",
  },
  previously: [
    {
      en: "In Miami, Dani waited forty seconds and then fixed it.",
      es: "En Miami, Dani esperó cuarenta segundos y después lo arregló.",
    },
    {
      en: "Vale wants next Thursday at ten for the committee.",
      es: "Vale quiere el próximo jueves a las diez para el comité.",
    },
    {
      en: "Thursday at ten is audit prep with Mía and Nico. Dani has never said no to Vale.",
      es: "El jueves a las diez es la preparación de auditoría con Mía y Nico. Dani nunca le ha dicho que no a Vale.",
    },
  ],
  reviewWords: [
    { word: "conflict", es: "conflicto" },
    { word: "calendar", es: "calendario" },
    { word: "option", es: "opción" },
    { word: "invitation", es: "invitación" },
    { word: "committee", es: "comité" },
  ],
  blurb: {
    en: "Vale comes to the floor in person with two coffees and one request: Thursday at ten. Dani checks both calendars, says the conflict early, and for the first time in his life tells Vale no. Then he brings options. Vale is quiet one second longer than normal.",
    es: "Vale llega al piso en persona con dos cafés y una petición: el jueves a las diez. Dani revisa los dos calendarios, dice el conflicto temprano, y por primera vez en su vida le dice que no a Vale. Después trae opciones. Vale se queda callada un segundo más de lo normal.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Friday, 7:55 a.m.; Dani arriving on the Northline floor with a small suitcase; Vale, in her mustard-yellow blouse, standing at the end of his row holding two coffees.",
      text: "Friday, 7:55 a.m. Straight from the airport.",
      es: "Viernes, 7:55 a.m. Directo del aeropuerto.",
      speaker: "vale",
      cast: ["vale", "dani"],
      lines: [
        {
          speaker: "vale",
          text: "Miami.",
          es: "Miami.",
        },
        {
          speaker: "dani",
          text: "One night. You came in person.",
          es: "Una noche. Viniste en persona.",
        },
        {
          speaker: "vale",
          text: "I need Thursday at ten. The committee can only do Thursday. If they see the pilot numbers before the audit, the second group is approved before anyone can say ninety days.",
          es: "Necesito el jueves a las diez. El comité solo puede el jueves. Si ven los números del piloto antes de la auditoría, el segundo grupo queda aprobado antes de que alguien diga noventa días.",
        },
        {
          speaker: "dani",
          text: "I know. Barrett told me. Camila told me. My mother almost told me.",
          es: "Lo sé. Barrett me dijo. Camila me dijo. Mi mamá casi me dice.",
        },
      ],
      words: [
        { word: "airport", es: "aeropuerto" },
        { word: "approved", es: "aprobado" },
        { word: "almost", es: "casi" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Dani at his desk with two calendars side by side on the screen, one Northline, one the academy's; Vale standing beside him, coffee in hand, reading the screen before he does.",
      text: "He opens both calendars. She's already reading them.",
      es: "Abre los dos calendarios. Ella ya los está leyendo.",
      speaker: "dani",
      cast: ["dani", "vale"],
      lines: [
        {
          speaker: "dani",
          text: "I can take care of that. Let me check both calendars first.",
          es: "Yo me encargo. Déjame revisar los dos calendarios primero.",
        },
        {
          speaker: "vale",
          text: "Dani. It's Thursday at ten. Say yes.",
          es: "Dani. Es el jueves a las diez. Di que sí.",
        },
        {
          speaker: "dani",
          text: "There is one conflict I need to mention. Thursday at ten is audit prep with Mía and Nico. It's the only block where both of them are off the phones. I put it there in week one.",
          es: "Hay un conflicto que necesito mencionar. El jueves a las diez es la preparación de auditoría con Mía y Nico. Es el único bloque donde los dos están fuera de los teléfonos. Lo puse ahí en la semana uno.",
        },
        {
          speaker: "vale",
          text: "Move it.",
          es: "Muévelo.",
        },
        {
          speaker: "dani",
          text: "Not this Thursday.",
          es: "Este jueves no.",
        },
      ],
      words: [
        { word: "calendars", es: "calendarios" },
        { word: "conflict", es: "conflicto" },
        { word: "block", es: "bloque" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Close on Vale's face, coffee halfway to her mouth, stopped; behind her the floor going on as normal; Dani not looking away.",
      text: "Vale is quiet one second longer than normal.",
      es: "Vale se queda callada un segundo más de lo normal.",
      speaker: "vale",
      cast: ["vale", "dani"],
      lines: [
        {
          speaker: "vale",
          text: "...Okay.",
          es: "...Okay.",
        },
        {
          speaker: "dani",
          text: "I have two other options available this week. We could move the committee to Thursday at two, after prep. Another possibility is Friday morning, and I bring Mía and Nico's numbers to the room one day fresher.",
          es: "Tengo otras dos opciones disponibles esta semana. Podríamos mover el comité al jueves a las dos, después de la preparación. Otra posibilidad es el viernes por la mañana, y llevo los números de Mía y Nico a la sala un día más frescos.",
        },
        {
          speaker: "vale",
          text: "Thursday at two, half the committee is on a plane.",
          es: "El jueves a las dos, la mitad del comité está en un avión.",
        },
        {
          speaker: "dani",
          text: "Then Friday morning. Whichever you prefer, I'll update the calendar today.",
          es: "Entonces el viernes por la mañana. La que prefieras, actualizo el calendario hoy.",
        },
      ],
      words: [
        { word: "options", es: "opciones" },
        { word: "fresher", es: "más frescos" },
        { word: "prefer", es: "preferir" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale sitting on the edge of the next desk now, coffee down, looking at Dani the way a teacher looks at a student who just finished; Dani with his hands still on the keyboard.",
      text: "She puts the coffee down.",
      es: "Deja el café.",
      speaker: "vale",
      cast: ["vale", "dani"],
      lines: [
        {
          speaker: "vale",
          text: "You've never said no to me.",
          es: "Nunca me habías dicho que no.",
        },
        {
          speaker: "dani",
          text: "I said 'not this Thursday'. It's smaller.",
          es: "Dije 'este jueves no'. Es más pequeño.",
        },
        {
          speaker: "vale",
          text: "It's not smaller.",
          es: "No es más pequeño.",
        },
        {
          speaker: "dani",
          text: "Mía chose here over twenty percent more because somebody tells her when she's wrong. Thursday at ten is where I do that. If I move it for a room with a committee in it, I'm Crown with a better logo.",
          es: "Mía eligió esto sobre veinte por ciento más porque alguien le dice cuando se equivoca. El jueves a las diez es donde hago eso. Si lo muevo por una sala con un comité adentro, soy Crown con mejor logo.",
        },
        {
          speaker: "vale",
          text: "Friday morning. Just to confirm, you'll move the meeting and send the updated invitation?",
          es: "Viernes por la mañana. Solo para confirmar, ¿vas a mover la reunión y mandar la invitación actualizada?",
        },
        {
          speaker: "dani",
          text: "Just to confirm, I'll move the meeting and send the updated invitation. Nine fifteen.",
          es: "Solo para confirmar, muevo la reunión y mando la invitación actualizada. Nueve y quince.",
        },
      ],
      words: [
        { word: "smaller", es: "más pequeño" },
        { word: "logo", es: "logo" },
        { word: "updated", es: "actualizada" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Mía and Nico at their desks with headsets around their necks, both very obviously having heard everything; Dani turning his chair to face them; Vale already walking toward the door.",
      text: "They heard everything. Of course they did.",
      es: "Escucharon todo. Por supuesto.",
      speaker: "mia",
      cast: ["mia", "nico", "dani"],
      lines: [
        {
          speaker: "mia",
          text: "You said no to Vale.",
          es: "Le dijiste que no a Vale.",
        },
        {
          speaker: "dani",
          text: "I said not this Thursday.",
          es: "Dije este jueves no.",
        },
        {
          speaker: "nico",
          text: "That's a no with a date on it.",
          es: "Eso es un no con fecha.",
        },
        {
          speaker: "mia",
          text: "Was that for us?",
          es: "¿Eso fue por nosotros?",
        },
        {
          speaker: "dani",
          text: "It was for Thursday.",
          es: "Fue por el jueves.",
        },
        {
          speaker: "mia",
          text: "Jefe.",
          es: "Jefe.",
        },
        {
          speaker: "dani",
          text: "...It was for you.",
          es: "...Fue por ustedes.",
        },
        {
          speaker: "nico",
          text: "Don't make it weird.",
          es: "No lo hagas raro.",
        },
      ],
      words: [
        { word: "heard", es: "escucharon" },
        { word: "date", es: "fecha" },
        { word: "weird", es: "raro" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "The wall screen reads INSTALLATIONS, SCHEDULING; Dani on a call with two calendars on his screen, one slot in red; Óscar at the next desk taking notes on how he does it. No customer is drawn.",
      text: "10:30 a.m. Account of the day: scheduling. He's had practice.",
      es: "10:30 a.m. Cuenta del día: agendar. Ya tiene práctica.",
      speaker: "dani",
      lines: [
        {
          speaker: "caller",
          text: "I need the installation moved to Wednesday at nine. My whole team is in that day.",
          es: "Necesito que la instalación se mueva al miércoles a las nueve. Todo mi equipo está ese día.",
        },
        {
          speaker: "dani",
          text: "I can take care of that. Let me check both calendars first. There is one conflict I need to mention: the technician already has another visit at that time.",
          es: "Yo me encargo. Déjeme revisar los dos calendarios primero. Hay un conflicto que necesito mencionar: el técnico ya tiene otra visita a esa hora.",
        },
        {
          speaker: "caller",
          text: "Then Wednesday doesn't work for me either. What else do we have?",
          es: "Entonces el miércoles tampoco me sirve. ¿Qué más tenemos?",
        },
        {
          speaker: "dani",
          text: "I have two other options available this week. We could move it to Thursday at two. Another possibility is Friday morning.",
          es: "Tengo otras dos opciones disponibles esta semana. Podríamos moverla al jueves a las dos. Otra posibilidad es el viernes por la mañana.",
        },
        {
          speaker: "caller",
          text: "Friday morning. Nine fifteen or nine fifty?",
          es: "Viernes por la mañana. ¿Nueve y quince o nueve y cincuenta?",
        },
        {
          speaker: "dani",
          text: "Nine fifteen. Just to confirm, I'll move the visit and send the updated invitation today.",
          es: "Nueve y quince. Solo para confirmar, muevo la visita y mando la invitación actualizada hoy.",
        },
      ],
      words: [
        { word: "installation", es: "instalación" },
        { word: "technician", es: "técnico" },
        { word: "visit", es: "visita" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Ms. Barrett at the end of the row with Mía, who is holding up her phone with a calendar on it; Dani between them; a small potted plant on Barrett's folder.",
      text: "1:00 p.m. Mía has moved something too.",
      es: "1:00 p.m. Mía también movió algo.",
      speaker: "mia",
      cast: ["mia", "barrett", "dani"],
      lines: [
        {
          speaker: "mia",
          text: "I moved the training room clip to Friday afternoon. There was one conflict I needed to mention, so I mentioned it. Early. Somebody taught me that this morning without knowing I was listening.",
          es: "Moví la grabación de la sala de entrenamiento al viernes por la tarde. Había un conflicto que necesitaba mencionar, así que lo mencioné. Temprano. Alguien me enseñó eso esta mañana sin saber que yo escuchaba.",
        },
        {
          speaker: "barrett",
          text: "Approved. Forty seconds, no screens, and my plant is in the background.",
          es: "Aprobado. Cuarenta segundos, sin pantallas, y mi planta sale en el fondo.",
        },
        {
          speaker: "dani",
          text: "The plant is a condition?",
          es: "¿La planta es una condición?",
        },
        {
          speaker: "barrett",
          text: "The plant is the forty-first follower.",
          es: "La planta es el seguidor cuarenta y uno.",
        },
      ],
      words: [
        { word: "moved", es: "moví" },
        { word: "condition", es: "condición" },
        { word: "background", es: "fondo" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Camila and Dani at the end of the row at closing time, Camila with her tablet showing the updated invitation: FRIDAY 9:15, SENT.",
      text: "6:00 p.m. The invitation went out at noon.",
      es: "6:00 p.m. La invitación salió al mediodía.",
      speaker: "camila",
      cast: ["camila", "dani"],
      lines: [
        {
          speaker: "camila",
          text: "Vale asked me if you were okay.",
          es: "Vale me preguntó si estabas bien.",
        },
        {
          speaker: "dani",
          text: "What did you say?",
          es: "¿Qué le dijiste?",
        },
        {
          speaker: "camila",
          text: "That you were finally doing what she does. She's said no to you every week for two years. You just called it homework.",
          es: "Que por fin estabas haciendo lo que ella hace. Te ha dicho que no cada semana durante dos años. Tú solo lo llamabas tarea.",
        },
        {
          speaker: "dani",
          text: "She said 'okay' like it cost her something.",
          es: "Dijo 'okay' como si le costara algo.",
        },
        {
          speaker: "camila",
          text: "It did. That's how you know it was a real okay.",
          es: "Le costó. Así sabes que fue un okay de verdad.",
        },
      ],
      words: [
        { word: "finally", es: "por fin" },
        { word: "homework", es: "tarea" },
        { word: "cost", es: "costar" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Night; Vale's small car parked outside the Northline building; Vale at the wheel, Dani in the passenger seat with the suitcase on his lap; the dashboard light on both faces.",
      text: "9:30 p.m. She gives him a ride. She hasn't started the car.",
      es: "9:30 p.m. Lo lleva a casa. No ha encendido el carro.",
      speaker: "vale",
      cast: ["vale", "dani"],
      lines: [
        {
          speaker: "vale",
          text: "The committee meets Friday at nine fifteen. I got the invitation at 12:02.",
          es: "El comité se reúne el viernes a las nueve y quince. Recibí la invitación a las 12:02.",
        },
        {
          speaker: "dani",
          text: "I said today. It went out at noon.",
          es: "Dije hoy. Salió al mediodía.",
        },
        {
          speaker: "vale",
          text: "When did you learn that? The conflict first, then the options.",
          es: "¿Cuándo aprendiste eso? El conflicto primero, luego las opciones.",
        },
        {
          speaker: "dani",
          text: "Monday. From a QA analyst in Bogotá who accepts one apology and no excuses.",
          es: "El lunes. De una analista de calidad en Bogotá que acepta una disculpa y ninguna excusa.",
        },
        {
          speaker: "vale",
          text: "Send me her number.",
          es: "Mándame su número.",
        },
      ],
      words: [
        { word: "invitation", es: "invitación" },
        { word: "ride", es: "aventón" },
        { word: "number", es: "número" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "Why does Dani refuse to move Thursday at ten for Vale?",
      questionEs: "¿Por qué Dani se niega a mover el jueves a las diez por Vale?",
      options: [
        { label: "Because it's the only block where he tells Mía and Nico when they're wrong", emoji: "🗓️" },
        { label: "Because the committee is too small", emoji: "👥" },
        { label: "Because he's still tired from Miami", emoji: "✈️" },
      ],
      answer: 0,
      sayIt: "Because it's the only block where he tells Mía and Nico when they're wrong.",
      sayItEs: "Porque es el único bloque donde les dice a Mía y a Nico cuando se equivocan.",
      sayItCheck: {
        target: "* the only block *",
        altTargets: ["Because it's the only block *", "* audit prep *", "* tells them when they're wrong"],
      },
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "Someone asks you to move a meeting to a time that's already taken. Say the conflict early, offer two options, and confirm.",
      questionEs: "Alguien te pide mover una reunión a una hora que ya está ocupada. Di el conflicto temprano, ofrece dos opciones, y confirma.",
      options: [
        { label: "I am ready to answer", emoji: "🎧" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "There is one conflict I need to mention. I have two other options available this week. We could move it to Thursday at two. Just to confirm, I'll move the meeting and send the updated invitation.",
      sayItEs: "Hay un conflicto que necesito mencionar. Tengo otras dos opciones disponibles esta semana. Podríamos moverla al jueves a las dos. Solo para confirmar, muevo la reunión y mando la invitación actualizada.",
      sayItAskEn: "Start with \"There is one conflict I need to mention\", then \"I have two other options ...\", and close with \"Just to confirm, I'll move the meeting ...\".",
      sayItAskEs: "Empieza con \"There is one conflict I need to mention\", luego \"I have two other options …\" y cierra con \"Just to confirm, I'll move the meeting …\".",
      sayItCheck: {
        target: "There is one conflict *",
        altTargets: ["Just to confirm, I'll move the meeting *", "I'll move the meeting *", "We could move it *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s3",
    phrase: "I say the conflict before they book the room. Then I bring the options.",
    es: "Digo el conflicto antes de que reserven la sala. Luego traigo las opciones.",
  },
  habitCard: {
    afterScene: "s8",
    phrase: "When I say no to someone I respect, I say it early, small, and with two options in my other hand.",
    es: "Cuando le digo que no a alguien que respeto, lo digo temprano, pequeño, y con dos opciones en la otra mano.",
    model: "dani",
    modelActionEs: "Dani le dijo 'este jueves no' a Vale antes de que reservara la sala, y en la misma frase le dio el jueves a las dos y el viernes por la mañana.",
  },
  expressions: [
    {
      phrase: "take care of",
      variants: ["take care of that", "took care of", "taking care of"],
      es: "encargarse de",
      kind: "phrasal",
      example: "I can take care of that. Let me check both calendars first.",
      exampleEs: "Yo me encargo. Déjame revisar los dos calendarios primero.",
    },
    {
      phrase: "go out",
      variants: ["went out", "goes out", "going out"],
      es: "salir, enviarse (una invitación, un correo)",
      kind: "phrasal",
      example: "I said today. It went out at noon.",
      exampleEs: "Dije hoy. Salió al mediodía.",
    },
    {
      phrase: "a no with a date on it",
      variants: ["with a date on it"],
      es: "un no con fecha (un no que deja la puerta abierta para otro día)",
      kind: "idiom",
      example: "That's a no with a date on it.",
      exampleEs: "Eso es un no con fecha.",
    },
    {
      phrase: "cost her something",
      variants: ["cost him something", "it cost me something", "cost you something"],
      es: "costarle a alguien (ser difícil de decir o de dar)",
      kind: "idiom",
      example: "She said 'okay' like it cost her something.",
      exampleEs: "Dijo 'okay' como si le costara algo.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: someone you respect asks you for a time you can't give. Say the conflict early, give two options, and confirm what you'll do today.",
    es: "Treinta segundos: alguien a quien respetas te pide una hora que no puedes dar. Di el conflicto temprano, da dos opciones, y confirma qué harás hoy.",
  },
  continueWith: [
    "I can take care of that. Let me check both calendars first.",
    "There is one conflict I need to mention.",
    "I have two other options available this week. We could move it to ... Another possibility is ...",
    "Just to confirm, I'll move the meeting and send the updated invitation.",
  ],
  cliffhanger: {
    en: "Monday: the committee wasn't in the lobby, so someone has to tell them what happened in Miami, in order, with facts. Barrett picks Dani. Then she picks Mía.",
    es: "Lunes: el comité no estaba en el lobby, así que alguien tiene que contarles qué pasó en Miami, en orden, con hechos. Barrett elige a Dani. Después elige a Mía.",
  },
};
