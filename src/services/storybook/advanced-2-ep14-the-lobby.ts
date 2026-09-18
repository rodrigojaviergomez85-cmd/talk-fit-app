import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced2-ep14-the-lobby/cover.jpg";
import s1 from "@/assets/storybook/advanced2-ep14-the-lobby/s1.jpg";
import s2 from "@/assets/storybook/advanced2-ep14-the-lobby/s2.jpg";
import s3 from "@/assets/storybook/advanced2-ep14-the-lobby/s3.jpg";
import s4 from "@/assets/storybook/advanced2-ep14-the-lobby/s4.jpg";
import s5 from "@/assets/storybook/advanced2-ep14-the-lobby/s5.jpg";
import s6 from "@/assets/storybook/advanced2-ep14-the-lobby/s6.jpg";
import s7 from "@/assets/storybook/advanced2-ep14-the-lobby/s7.jpg";
import s8 from "@/assets/storybook/advanced2-ep14-the-lobby/s8.jpg";
import s9 from "@/assets/storybook/advanced2-ep14-the-lobby/s9.jpg";

export const ADVANCED2_EP14_THE_LOBBY: StorybookEpisode = {
  id: "advanced2-ep14-the-lobby",
  moduleId: "advanced-2",
  week: 3,
  title: "The lobby",
  titleEs: "El lobby",
  episodeLabel: {
    en: "Advanced 2 · Episode 14",
    es: "Advanced 2 · Episodio 14",
  },
  previously: [
    {
      en: "Dani said no to Mía's clip and gave her the reason.",
      es: "Dani le dijo que no al clip de Mía y le dio la razón.",
    },
    {
      en: "The clip is still on her phone. 'Not yet.'",
      es: "El clip sigue en su celular. 'Todavía no'.",
    },
    {
      en: "Thursday: Miami, with Barrett, at the hotel Northline answers the phones for.",
      es: "Jueves: Miami, con Barrett, en el hotel al que Northline le contesta los teléfonos.",
    },
  ],
  reviewWords: [
    { word: "upset", es: "molesto" },
    { word: "lobby", es: "lobby" },
    { word: "validate", es: "validar" },
    { word: "patience", es: "paciencia" },
    { word: "quieter", es: "más tranquilo" },
  ],
  blurb: {
    en: "Miami. A guest in the hotel lobby has come downstairs three times and nobody has fixed anything. Barrett stands two steps behind Dani and says nothing. Dani says nothing either, for forty seconds. Then he fixes it, promises one thing too precisely, and has to carry a key upstairs himself.",
    es: "Miami. Una huésped en el lobby del hotel ha bajado tres veces y nadie ha arreglado nada. Barrett se queda dos pasos detrás de Dani y no dice nada. Dani tampoco dice nada, durante cuarenta segundos. Después lo arregla, promete una cosa con demasiada precisión, y tiene que subir una llave él mismo.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "A bright Miami hotel lobby, palms outside the glass; Morgan in a navy blazer at the front desk, one hand flat on the marble, mid-sentence; Dani in his light blue shirt two steps away, listening; Barrett behind him with her arms folded.",
      text: "Thursday, 3:00 p.m. Miami.",
      es: "Jueves, 3:00 p.m. Miami.",
      speaker: "morgan",
      cast: ["morgan", "dani", "barrett"],
      lines: [
        {
          speaker: "morgan",
          text: "Third time. Third time I've come down here. The room next to mine is being demolished, apparently, and the person before you told me to enjoy the pool.",
          es: "Tercera vez. Es la tercera vez que bajo. El cuarto de al lado lo están demoliendo, aparentemente, y la persona antes de usted me dijo que disfrutara la piscina.",
        },
        {
          speaker: "dani",
          text: "I'm listening. Please tell me everything that happened.",
          es: "La escucho. Por favor cuénteme todo lo que pasó.",
        },
        {
          speaker: "morgan",
          text: "I have a call with Chicago at four. I can't take it with a drill through the wall. We've paid for two rooms since Monday and nobody has offered us anything except the pool.",
          es: "Tengo una llamada con Chicago a las cuatro. No puedo tomarla con un taladro atravesando la pared. Hemos pagado dos cuartos desde el lunes y nadie nos ha ofrecido nada excepto la piscina.",
        },
      ],
      words: [
        { word: "demolished", es: "demolido" },
        { word: "drill", es: "taladro" },
        { word: "offered", es: "ofrecido" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Close on Dani's face, calm, mouth closed, eyes on Morgan; a lobby clock behind him; Barrett's reflection in the marble, not moving.",
      text: "He doesn't say anything for forty seconds. She isn't finished.",
      es: "No dice nada durante cuarenta segundos. Ella no ha terminado.",
      speaker: "morgan",
      cast: ["morgan", "dani"],
      lines: [
        {
          speaker: "morgan",
          text: "And I know it's not your fault personally. I know that. But somebody needs to stop saying 'I understand' and do something.",
          es: "Y sé que no es su culpa personalmente. Lo sé. Pero alguien tiene que dejar de decir 'entiendo' y hacer algo.",
        },
        {
          speaker: "dani",
          text: "You're right to be upset — that shouldn't have happened. Three trips down here is two too many. Thank you for telling me instead of just leaving.",
          es: "Tiene razón en estar molesta. Eso no debió pasar. Tres viajes hasta aquí son dos de más. Gracias por decírmelo en vez de simplemente irse.",
        },
        {
          speaker: "morgan",
          text: "I considered leaving.",
          es: "Consideré irme.",
        },
        {
          speaker: "dani",
          text: "I would have too.",
          es: "Yo también lo habría hecho.",
        },
      ],
      words: [
        { word: "fault", es: "culpa" },
        { word: "trips", es: "viajes" },
        { word: "leaving", es: "irse" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Dani behind the front desk now, on the hotel phone, a room map on the screen with the fifth floor highlighted on the side away from the construction; Morgan watching him with her arms still crossed.",
      text: "Then the fix. Before anything else.",
      es: "Luego el arreglo. Antes que nada.",
      speaker: "dani",
      cast: ["dani", "morgan"],
      lines: [
        {
          speaker: "dani",
          text: "Let me fix this right now, before anything else. I'm moving you to a quieter room on the fifth floor, on the side away from the work. Give me two minutes and I'll have the new key ready.",
          es: "Déjeme arreglar esto ahora mismo, antes que nada. La muevo a un cuarto más tranquilo en el quinto piso, del lado opuesto a la obra. Deme dos minutos y tendré la llave nueva lista.",
        },
        {
          speaker: "morgan",
          text: "Both rooms.",
          es: "Los dos cuartos.",
        },
        {
          speaker: "dani",
          text: "Both rooms. I've also added breakfast for both of you tomorrow. Your call with Chicago is at four; the key will be in your hand by 3:20.",
          es: "Los dos cuartos. También agregué desayuno para los dos mañana. Su llamada con Chicago es a las cuatro; la llave estará en su mano a las 3:20.",
        },
        {
          speaker: "morgan",
          text: "How do you know there are two of us?",
          es: "¿Cómo sabe que somos dos?",
        },
        {
          speaker: "dani",
          text: "You said 'we' twice. Again, I'm sorry — and thank you for your patience.",
          es: "Dijo 'nosotros' dos veces. De nuevo, lo lamento, y gracias por su paciencia.",
        },
      ],
      words: [
        { word: "quieter", es: "más tranquilo" },
        { word: "key", es: "llave" },
        { word: "patience", es: "paciencia" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Morgan walking toward the elevators with her phone already at her ear; Barrett and Dani alone by the desk; Barrett nodding once, very small.",
      text: "She leaves. Barrett hasn't said a word. She nods.",
      es: "Se va. Barrett no ha dicho una palabra. Asiente.",
      speaker: "barrett",
      cast: ["barrett", "dani"],
      lines: [
        {
          speaker: "barrett",
          text: "Forty seconds.",
          es: "Cuarenta segundos.",
        },
        {
          speaker: "dani",
          text: "I counted.",
          es: "Los conté.",
        },
        {
          speaker: "barrett",
          text: "I didn't see you count.",
          es: "No la vi contar.",
        },
        {
          speaker: "dani",
          text: "That's the point of counting. If she sees it, it's waiting. If she doesn't, it's listening.",
          es: "Ese es el punto de contar. Si ella lo ve, es esperar. Si no lo ve, es escuchar.",
        },
        {
          speaker: "barrett",
          text: "You know who that was.",
          es: "Sabe quién era.",
        },
        {
          speaker: "dani",
          text: "Her badge said Morgan. Her blazer said client.",
          es: "Su gafete decía Morgan. Su blazer decía clienta.",
        },
      ],
      words: [
        { word: "counted", es: "conté" },
        { word: "point", es: "punto" },
        { word: "badge", es: "gafete" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "The hotel phone at the front desk ringing; a lobby clock reading 3:34; Dani picking up with a key card still in his other hand; Barrett watching the clock, not him. Only Dani and Barrett are drawn; Morgan is a voice on the phone.",
      text: "3:34 p.m. The desk phone rings.",
      es: "3:34 p.m. Suena el teléfono del mostrador.",
      speaker: "dani",
      lines: [
        {
          speaker: "morgan",
          text: "You said 3:20. It's 3:34 and I'm standing in a hallway with two suitcases and a call in twenty-six minutes.",
          es: "Dijo 3:20. Son las 3:34 y estoy parada en un pasillo con dos maletas y una llamada en veintiséis minutos.",
        },
        {
          speaker: "dani",
          text: "You're right. It's 3:34. The key is in my hand and I'm bringing it up myself. Two minutes, and this time I mean the real two.",
          es: "Tiene razón. Son las 3:34. La llave está en mi mano y se la subo yo mismo. Dos minutos, y esta vez son los dos de verdad.",
        },
        {
          speaker: "morgan",
          text: "Fifth floor. Run.",
          es: "Quinto piso. Corra.",
        },
      ],
      words: [
        { word: "hallway", es: "pasillo" },
        { word: "suitcases", es: "maletas" },
        { word: "run", es: "correr" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "The fifth-floor hallway; Dani out of breath handing a key card to Morgan, who has her phone in one hand and a suitcase handle in the other; the wall behind them quiet.",
      text: "3:37 p.m. Fifth floor.",
      es: "3:37 p.m. Quinto piso.",
      speaker: "morgan",
      cast: ["morgan", "dani"],
      lines: [
        {
          speaker: "morgan",
          text: "You promised a time you didn't control. The desk controls the keys.",
          es: "Prometió una hora que no controlaba. El mostrador controla las llaves.",
        },
        {
          speaker: "dani",
          text: "I know. I learned that on Monday and forgot it on Thursday.",
          es: "Lo sé. Lo aprendí el lunes y lo olvidé el jueves.",
        },
        {
          speaker: "morgan",
          text: "Everything else you did right. Chicago in twenty-three minutes. Go away.",
          es: "Todo lo demás lo hizo bien. Chicago en veintitrés minutos. Váyase.",
        },
        {
          speaker: "dani",
          text: "Going away.",
          es: "Me voy.",
        },
      ],
      words: [
        { word: "promised", es: "prometió" },
        { word: "control", es: "controlar" },
        { word: "everything", es: "todo" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Hotel rooftop bar at sunset; Barrett and Dani at a small table with two sparkling waters; the ocean behind them; Barrett with her glasses off for once.",
      text: "6:15 p.m. Rooftop. Barrett takes her glasses off.",
      es: "6:15 p.m. Azotea. Barrett se quita los lentes.",
      speaker: "barrett",
      cast: ["barrett", "dani"],
      lines: [
        {
          speaker: "barrett",
          text: "Vale called me this morning. She wants next Thursday at ten for the committee. I told her to ask you.",
          es: "Vale me llamó esta mañana. Quiere el próximo jueves a las diez para el comité. Le dije que le preguntara a usted.",
        },
        {
          speaker: "dani",
          text: "Thursday at ten is audit prep with Mía and Nico. Why me?",
          es: "El jueves a las diez es la preparación de auditoría con Mía y Nico. ¿Por qué yo?",
        },
        {
          speaker: "barrett",
          text: "Because it's your Thursday to say no to. I've watched you say no to a guest, a recruiter and a twenty-year-old with a phone. You haven't said it to her.",
          es: "Porque es su jueves para decir que no. Lo he visto decirle que no a una huésped, a una reclutadora y a una veinteañera con un celular. No se lo ha dicho a ella.",
        },
        {
          speaker: "dani",
          text: "Nobody says no to Vale.",
          es: "Nadie le dice que no a Vale.",
        },
        {
          speaker: "barrett",
          text: "Then she's been waiting a long time for somebody to.",
          es: "Entonces lleva mucho tiempo esperando que alguien lo haga.",
        },
      ],
      words: [
        { word: "rooftop", es: "azotea" },
        { word: "recruiter", es: "reclutadora" },
        { word: "nobody", es: "nadie" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Dani's phone propped on the hotel room desk, a video call with Mía and Nico on the Northline floor, Mía close to the camera, Nico half in frame with his hood up.",
      text: "8:30 p.m. The floor calls.",
      es: "8:30 p.m. El piso llama.",
      speaker: "mia",
      cast: ["mia", "nico", "dani"],
      lines: [
        {
          speaker: "mia",
          text: "How was the lobby?",
          es: "¿Cómo estuvo el lobby?",
        },
        {
          speaker: "dani",
          text: "Forty seconds of nothing, then the fifth floor. Then I ran up five floors because I said a time the desk didn't own.",
          es: "Cuarenta segundos de nada, luego el quinto piso. Después subí cinco pisos corriendo porque dije una hora que el mostrador no controlaba.",
        },
        {
          speaker: "nico",
          text: "You waited forty seconds. Out loud?",
          es: "Esperaste cuarenta segundos. ¿En voz alta?",
        },
        {
          speaker: "dani",
          text: "In my head. I learned it from a guy who holds arms.",
          es: "En mi cabeza. Lo aprendí de un tipo que sostiene brazos.",
        },
        {
          speaker: "mia",
          text: "The training room clip is booked. Next Thursday, ten a.m. Barrett said mornings are free.",
          es: "La grabación en la sala de entrenamiento está reservada. El próximo jueves, diez a.m. Barrett dijo que las mañanas están libres.",
        },
        {
          speaker: "dani",
          text: "Next Thursday at ten is audit prep, Mía.",
          es: "El próximo jueves a las diez es la preparación de auditoría, Mía.",
        },
      ],
      words: [
        { word: "floors", es: "pisos" },
        { word: "booked", es: "reservada" },
        { word: "mornings", es: "mañanas" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "The hotel room at night, the window showing Miami lights; Dani alone on the edge of the bed with his phone to his ear, shoes still on. Only Dani is drawn; the caller is a voice on the phone.",
      text: "10:15 p.m. His mother.",
      es: "10:15 p.m. Su mamá.",
      speaker: "dani",
      lines: [
        {
          speaker: "estela",
          text: "Mijo, Miami? Did you eat?",
          es: "Mijo, ¿Miami? ¿Comiste?",
        },
        {
          speaker: "dani",
          text: "I gave a stranger breakfast for two, mamá. Does that count?",
          es: "Le regalé a una desconocida desayuno para dos, mamá. ¿Cuenta?",
        },
        {
          speaker: "estela",
          text: "No. Tomorrow Vale calls you. Your voice is doing the thing.",
          es: "No. Mañana te llama Vale. Tu voz está haciendo la cosa.",
        },
        {
          speaker: "dani",
          text: "What thing?",
          es: "¿Qué cosa?",
        },
        {
          speaker: "estela",
          text: "The thing it does before you say yes to something you shouldn't.",
          es: "La cosa que hace antes de que digas que sí a algo que no deberías.",
        },
      ],
      words: [
        { word: "stranger", es: "desconocida" },
        { word: "count", es: "contar" },
        { word: "shouldn't", es: "no deberías" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s2",
      questionEn: "What does Dani do during the first forty seconds with the upset guest?",
      questionEs: "¿Qué hace Dani durante los primeros cuarenta segundos con la huésped molesta?",
      options: [
        { label: "Nothing; he lets her finish", emoji: "🤫" },
        { label: "He apologizes three times", emoji: "🙏" },
        { label: "He explains that it's not his fault", emoji: "🙅" },
      ],
      answer: 0,
      sayIt: "Nothing; he lets her finish.",
      sayItEs: "Nada; la deja terminar.",
      sayItCheck: {
        target: "* lets her finish",
        altTargets: ["Nothing *", "He listens *", "He waits *"],
      },
    },
    {
      id: "q2",
      afterScene: "s3",
      questionEn: "Someone is upset in front of you. Let them finish, tell them they're right to be upset, and then fix it right now.",
      questionEs: "Alguien está molesto frente a ti. Déjalo terminar, dile que tiene razón en estar molesto, y luego arréglalo ahora mismo.",
      options: [
        { label: "I am ready to answer", emoji: "🎧" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "You're right to be upset — that shouldn't have happened. Thank you for telling me instead of just leaving. Let me fix this right now, before anything else.",
      sayItEs: "Tiene razón en estar molesto. Eso no debió pasar. Gracias por decírmelo en vez de simplemente irse. Déjeme arreglar esto ahora mismo, antes que nada.",
      sayItAskEn: "Start with \"You're right to be upset\", then \"Thank you for telling me ...\", and close with \"Let me fix this right now ...\".",
      sayItAskEs: "Empieza con \"You're right to be upset\", luego \"Thank you for telling me …\" y cierra con \"Let me fix this right now …\".",
      sayItCheck: {
        target: "You're right to be upset *",
        altTargets: ["Let me fix this right now *", "I understand *", "I'm listening *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s4",
    phrase: "If they see me waiting, it's waiting. If they don't, it's listening.",
    es: "Si me ven esperar, es esperar. Si no me ven, es escuchar.",
  },
  habitCard: {
    afterScene: "s6",
    phrase: "When I promise a time, I check first who actually controls it.",
    es: "Cuando prometo una hora, primero reviso quién la controla de verdad.",
    model: "morgan",
    modelActionEs: "Morgan le dijo a Dani que prometió una hora que no controlaba, porque el mostrador controla las llaves, y que todo lo demás lo hizo bien.",
  },
  expressions: [
    {
      phrase: "come down",
      variants: ["come down here", "came down", "coming down"],
      es: "bajar (a un lugar)",
      kind: "phrasal",
      example: "Third time. Third time I've come down here. The room next to mine is being demolished, apparently, and the person before you told me to enjoy the pool.",
      exampleEs: "Tercera vez. Es la tercera vez que bajo. El cuarto de al lado lo están demoliendo, aparentemente, y la persona antes de usted me dijo que disfrutara la piscina.",
    },
    {
      phrase: "bring up",
      variants: ["bringing it up", "brought up", "bring it up"],
      es: "subir algo (llevarlo arriba)",
      kind: "phrasal",
      example: "The key is in my hand and I'm bringing it up myself.",
      exampleEs: "La llave está en mi mano y se la subo yo mismo.",
    },
    {
      phrase: "two too many",
      variants: ["one too many"],
      es: "dos de más, dos de sobra",
      kind: "idiom",
      example: "Three trips down here is two too many.",
      exampleEs: "Tres viajes hasta aquí son dos de más.",
    },
    {
      phrase: "that's the point",
      variants: ["that's the whole point", "the point of"],
      es: "ese es el punto, de eso se trata",
      kind: "idiom",
      example: "That's the point of counting. If she sees it, it's waiting. If she doesn't, it's listening.",
      exampleEs: "Ese es el punto de contar. Si ella lo ve, es esperar. Si no lo ve, es escuchar.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: someone is upset with you in person. Let them finish, say they're right to be upset, fix one thing right now, and thank them for their patience.",
    es: "Treinta segundos: alguien está molesto contigo en persona. Déjalo terminar, dile que tiene razón en estar molesto, arregla una cosa ahora mismo, y agradécele su paciencia.",
  },
  continueWith: [
    "I'm listening. Please tell me everything that happened.",
    "You're right to be upset — that shouldn't have happened.",
    "Let me fix this right now, before anything else.",
    "Again, I'm sorry — and thank you for your patience.",
  ],
  cliffhanger: {
    en: "Tomorrow, 8 a.m., back on the floor: Vale asks for Thursday. Dani has never said no to Vale.",
    es: "Mañana, 8 a.m., de vuelta en el piso: Vale pide el jueves. Dani nunca le ha dicho que no a Vale.",
  },
};
