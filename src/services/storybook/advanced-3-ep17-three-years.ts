import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced3-ep17-three-years/cover.jpg";
import s1 from "@/assets/storybook/advanced3-ep17-three-years/s1.jpg";
import s2 from "@/assets/storybook/advanced3-ep17-three-years/s2.jpg";
import s3 from "@/assets/storybook/advanced3-ep17-three-years/s3.jpg";
import s4 from "@/assets/storybook/advanced3-ep17-three-years/s4.jpg";
import s5 from "@/assets/storybook/advanced3-ep17-three-years/s5.jpg";
import s6 from "@/assets/storybook/advanced3-ep17-three-years/s6.jpg";
import s7 from "@/assets/storybook/advanced3-ep17-three-years/s7.jpg";
import s8 from "@/assets/storybook/advanced3-ep17-three-years/s8.jpg";
import s9 from "@/assets/storybook/advanced3-ep17-three-years/s9.jpg";

export const ADVANCED3_EP17_THREE_YEARS: StorybookEpisode = {
  id: "advanced3-ep17-three-years",
  moduleId: "advanced-3",
  week: 4,
  title: "Three years",
  titleEs: "Tres años",
  episodeLabel: {
    en: "Advanced 3 · Episode 17",
    es: "Advanced 3 · Episodio 17",
  },
  previously: [
    {
      en: "A knock. Abril, seventeen, Nico's face. 'Do you want to learn?' Five seconds. 'Yes.'",
      es: "Un toque en la puerta. Abril, diecisiete, la cara de Nico. '¿Querés aprender?' Cinco segundos. 'Sí'.",
    },
    {
      en: "A scholarship signed on the wrong line, on purpose. Keller: 'It's a platform.' Dani: 'Not without the room.'",
      es: "Una beca firmada en la línea equivocada, a propósito. Keller: 'Es una plataforma'. Dani: 'No sin el salón'.",
    },
    {
      en: "Reed: hearing Wednesday, nine a.m. 'Bring the finance person. Bring the stool.'",
      es: "Reed: audiencia el miércoles, nueve a.m. 'Traigan a la persona de finanzas. Traigan el banco'.",
    },
  ],
  reviewWords: [
    { word: "progress", es: "progreso" },
    { word: "couldn't", es: "no podía" },
    { word: "since", es: "desde" },
    { word: "fell", es: "me caí" },
    { word: "typing", es: "escribiendo" },
  ],
  blurb: {
    en: "Tuesday, 8:00 p.m. The second livestream, organized by the agents, not Northline: Nico's channel, Mía's phone, the small room. No question from the chat this time. Dani sits in the chair where he couldn't finish a sentence and says, once, in the first person, where he started, how many times he fell, who picked him up, and what he does when he can't. Two minutes. Nobody types.",
    es: "Martes, 8:00 p.m. El segundo en vivo, organizado por los agentes, no por Northline: el canal de Nico, el celular de Mía, el salón pequeño. Esta vez no hay pregunta del chat. Dani se sienta en la silla donde no podía terminar una frase y dice, una vez, en primera persona, dónde empezó, cuántas veces se cayó, quién lo levantó y qué hace cuando no puede más. Dos minutos. Nadie escribe.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Tuesday, 7:50 p.m.; the small room at the academy; the circle of chairs full: Mía, Nico, Óscar, Abril and a few agents in black polos; Mía balancing her phone on a stack of books on a chair, pointed at the one empty chair in the middle; Vale in the doorway; Dani standing by the whiteboard, not yet sitting.",
      text: "Tuesday, 7:50 p.m. Not a Northline stream. Barrett is at home with the volume up.",
      es: "Martes, 7:50 p.m. No es un en vivo de Northline. Barrett está en su casa con el volumen alto.",
      speaker: "mia",
      cast: ["mia", "nico", "oscar", "abril", "dani", "vale"],
      lines: [
        {
          speaker: "mia",
          text: "Nico's channel, my phone, Vale's chairs. Legal can't approve it because legal wasn't invited. Forty-one thousand people know it starts at eight. Jefe, sit in the chair.",
          es: "El canal de Nico, mi celular, las sillas de Vale. Legal no puede aprobarlo porque legal no fue invitado. Cuarenta y un mil personas saben que empieza a las ocho. Jefe, sentate en la silla.",
        },
        {
          speaker: "dani",
          text: "There's no question this time.",
          es: "Esta vez no hay pregunta.",
        },
        {
          speaker: "nico",
          text: "There's one. Mine. 'How are you different from three years ago?' I'm not going to ask it. You're going to answer it.",
          es: "Hay una. La mía. '¿En qué sos diferente a hace tres años?' No la voy a hacer. Vos la vas a responder.",
        },
      ],
      words: [
        { word: "approve", es: "aprobar" },
        { word: "invited", es: "invitado" },
        { word: "different", es: "diferente" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Close on Mía's phone screen: THE KID, LIVE, a viewer count at 41,204 climbing; in the frame, the middle chair with Dani sitting down in it, headset around his neck, hands on his knees.",
      text: "8:00 p.m. Live. He sits down in the chair from the interview, from the Tuesday, from everything.",
      es: "8:00 p.m. En vivo. Se sienta en la silla de la entrevista, del martes, de todo.",
      speaker: "nico",
      cast: ["nico", "dani", "mia"],
      lines: [
        {
          speaker: "nico",
          text: "This is THE KID. No games tonight. This is my boss, in the chair where it started. Two minutes. Don't type, just listen.",
          es: "Este es THE KID. Hoy no hay juegos. Este es mi jefe, en la silla donde empezó. Dos minutos. No escriban, solo escuchen.",
        },
        {
          speaker: "dani",
          text: "Three years ago I couldn't finish a sentence in this chair. I'm sitting in it. That's the whole update, but Nico gave me two minutes, so I'll use them.",
          es: "Hace tres años no podía terminar una frase en esta silla. Estoy sentado en ella. Esa es toda la actualización, pero Nico me dio dos minutos, así que los voy a usar.",
        },
        {
          speaker: "mia",
          text: "Timer's running.",
          es: "El cronómetro corre.",
        },
      ],
      words: [
        { word: "games", es: "juegos" },
        { word: "sentence", es: "frase" },
        { word: "update", es: "actualización" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Dani in the chair, looking at the phone, one hand open; behind him the circle: Óscar leaning forward, Abril very still, Mía holding her breath.",
      text: "Where he started. What he did.",
      es: "Dónde empezó. Qué hizo.",
      speaker: "dani",
      cast: ["dani", "oscar", "abril", "mia", "nico"],
      lines: [
        {
          speaker: "dani",
          text: "Three years ago I was a student who came in late on a Tuesday and couldn't say his name. I understood everything and I couldn't answer anything.",
          es: "Hace tres años era un estudiante que llegó tarde un martes y no pudo decir su nombre. Entendía todo y no podía responder nada.",
        },
        {
          speaker: "nico",
          text: "Keep going. 1:40.",
          es: "Seguí. 1:40.",
        },
        {
          speaker: "dani",
          text: "Since then, I've rehearsed on bus 42 out loud, every day, with strangers staring. I took a headset. I lost my first call in four minutes.",
          es: "Desde entonces, he ensayado en el bus 42 en voz alta, todos los días, con desconocidos mirándome. Tomé una diadema. Perdí mi primera llamada en cuatro minutos.",
        },
        {
          speaker: "dani",
          text: "I taught the people who trained me. I've also started counting five seconds before I answer, which my mother says makes me slow at dinner.",
          es: "Le enseñé a la gente que me entrenó. También empecé a contar cinco segundos antes de responder, lo cual, según mi mamá, me hace lento en la cena.",
        },
      ],
      words: [
        { word: "understood", es: "entendía" },
        { word: "strangers", es: "desconocidos" },
        { word: "slow", es: "lento" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Close on Dani's hands counting on his fingers, four fingers up; his face calm; the phone light on him; Óscar's face at the edge of the frame.",
      text: "How many times he fell. He counts them on his hand.",
      es: "Cuántas veces se cayó. Las cuenta con la mano.",
      speaker: "dani",
      cast: ["dani", "oscar"],
      lines: [
        {
          speaker: "dani",
          text: "I fell four times that count. Day one, the customer hung up. Day ninety, three people failed and one of them is in this room.",
          es: "Me caí cuatro veces que cuenten. El día uno, el cliente colgó. El día noventa, tres personas reprobaron y una de ellas está en este salón.",
        },
        {
          speaker: "oscar",
          text: "That's me.",
          es: "Ese soy yo.",
        },
        {
          speaker: "dani",
          text: "That's you, and you're in the room. A board told me I was a meme, and they were right about the meme part.",
          es: "Ese sos vos, y estás en el salón. Una junta me dijo que era un meme, y tenían razón en la parte del meme.",
        },
        {
          speaker: "dani",
          text: "And two weeks ago a lawyer suspended the thing I built, and I had to say it to seventeen people in four sentences.",
          es: "Y hace dos semanas un abogado suspendió lo que construí, y tuve que decírselo a diecisiete personas en cuatro frases.",
        },
        {
          speaker: "dani",
          text: "I'm not going to make that sound smaller than it was.",
          es: "No voy a hacer que eso suene más pequeño de lo que fue.",
        },
      ],
      words: [
        { word: "fell", es: "me caí" },
        { word: "lawyer", es: "abogado" },
        { word: "smaller", es: "más pequeño" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "The circle from Dani's point of view: Vale in the doorway, Nico with his hood down, Mía, Óscar, Abril; the phone in the foreground, out of focus.",
      text: "Who picked him up. He doesn't say 'mentor'. He says names.",
      es: "Quién lo levantó. No dice 'mentor'. Dice nombres.",
      speaker: "dani",
      cast: ["dani", "vale", "nico", "mia", "oscar", "abril"],
      lines: [
        {
          speaker: "dani",
          text: "Every time, somebody picked me up, and none of them made a speech. Vale moved a chair so she could see my face.",
          es: "Cada vez, alguien me levantó, y ninguno hizo un discurso. Vale movió una silla para poder ver mi cara.",
        },
        {
          speaker: "dani",
          text: "Lidia played me my worst call and didn't let me say 'but'. Nico put his hand on my arm in a room where I was about to talk.",
          es: "Lidia me puso mi peor llamada y no me dejó decir 'pero'. Nico me puso la mano en el brazo en una sala donde estaba por hablar.",
        },
        {
          speaker: "dani",
          text: "Mía changed the way she says 'jefe'. Camila corrected my number in front of a board.",
          es: "Mía cambió la forma en que dice 'jefe'. Camila corrigió mi número frente a una junta.",
        },
        {
          speaker: "dani",
          text: "And my mother asked if I ate, and then, on the worst night, asked if I'd prayed.",
          es: "Y mi mamá me preguntó si había comido, y después, la peor noche, si había orado.",
        },
        {
          speaker: "mia",
          text: "Camila's not here and you said her name anyway.",
          es: "Camila no está aquí y dijiste su nombre de todos modos.",
        },
        {
          speaker: "dani",
          text: "She's watching. If I got the number wrong she'd correct it from her couch.",
          es: "Está viendo. Si me equivoqué en el número lo corregiría desde su sofá.",
        },
      ],
      words: [
        { word: "picked", es: "levantó" },
        { word: "speech", es: "discurso" },
        { word: "worst", es: "peor" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Close on Dani, looking down for the first time, then back up; Nico's hand visible on the edge of the frame holding the phone steady now.",
      text: "What he does when he can't.",
      es: "Qué hace cuando no puede más.",
      speaker: "dani",
      cast: ["dani", "nico"],
      lines: [
        {
          speaker: "dani",
          text: "When I can't, I take bus 42 home. I count five seconds, and if five isn't enough I ask for strength, not results. Then I eat, because somebody asks.",
          es: "Cuando no puedo más, tomo el bus 42 a la casa. Cuento cinco segundos, y si cinco no alcanzan pido fuerza, no resultados. Luego como, porque alguien pregunta.",
        },
        {
          speaker: "dani",
          text: "Then I get up. That's not a method. It's just the order I do it in.",
          es: "Luego me levanto. No es un método. Es solo el orden en que lo hago.",
        },
        {
          speaker: "nico",
          text: "Thirty seconds.",
          es: "Treinta segundos.",
        },
      ],
      words: [
        { word: "enough", es: "suficiente" },
        { word: "results", es: "resultados" },
        { word: "order", es: "orden" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Dani standing up from the chair, headset still around his neck; the phone timer on Mía's screen at 1:58; Abril looking at Nico, not at Dani.",
      text: "Now, still, next. 1:58.",
      es: "Ahora, todavía, lo siguiente. 1:58.",
      speaker: "dani",
      cast: ["dani", "abril", "nico", "mia"],
      lines: [
        {
          speaker: "dani",
          text: "Now I can say what I think in a room that doesn't want to hear it. I still need to improve at not translating when I'm scared; it comes back.",
          es: "Ahora puedo decir lo que pienso en una sala que no lo quiere oír. Todavía necesito mejorar en no traducir cuando tengo miedo; vuelve.",
        },
        {
          speaker: "dani",
          text: "Next, the room. Not Miami, not Crown. Whatever happens tomorrow with the lawyer, there's a chair in this room with a girl in it who knocked yesterday.",
          es: "Lo siguiente, el salón. No Miami, no Crown. Pase lo que pase mañana con el abogado, hay una silla en este salón con una muchacha que tocó la puerta ayer.",
        },
        {
          speaker: "dani",
          text: "The real change is that I don't wait to be ready anymore. That was two minutes. Nico, stop it.",
          es: "El cambio real es que ya no espero a estar listo. Eso fueron dos minutos. Nico, cortá.",
        },
        {
          speaker: "abril",
          text: "Which chair?",
          es: "¿Cuál silla?",
        },
        {
          speaker: "dani",
          text: "The one you're in.",
          es: "En la que estás.",
        },
      ],
      words: [
        { word: "scared", es: "asustado" },
        { word: "whatever", es: "lo que sea" },
        { word: "ready", es: "listo" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Mía's phone screen after the stream: 41,900 viewers, and the chat completely empty for the whole two minutes; then one message at the bottom from an account called Estela, one word: 'Comé.'",
      text: "8:03 p.m. Nico doesn't stop it. Nobody typed. Then one person does.",
      es: "8:03 p.m. Nico no lo corta. Nadie escribió. Luego una persona sí.",
      speaker: "nico",
      cast: ["nico", "mia", "dani"],
      lines: [
        {
          speaker: "nico",
          text: "Nobody's typing. Forty-one thousand people and nobody's typing. I've never seen that.",
          es: "Nadie está escribiendo. Cuarenta y un mil personas y nadie escribe. Nunca había visto eso.",
        },
        {
          speaker: "mia",
          text: "One message. Account name Estela. It says 'Comé'. That's it. That's the whole chat.",
          es: "Un mensaje. Nombre de cuenta Estela. Dice 'Comé'. Eso es todo. Ese es todo el chat.",
        },
        {
          speaker: "dani",
          text: "Cut it now, Nico. Please.",
          es: "Cortalo ahora, Nico. Por favor.",
        },
      ],
      words: [
        { word: "typing", es: "escribiendo" },
        { word: "account", es: "cuenta" },
        { word: "message", es: "mensaje" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Night; the bus stop; Dani alone on the bench looking at his phone: a message from Julieta: 'Landing Friday 6 a.m. Don't tell Barrett. Tell Barrett.'; bus 42 approaching down the street.",
      text: "9:50 p.m. One more message, not in the chat.",
      es: "9:50 p.m. Un mensaje más, no en el chat.",
      speaker: "dani",
      cast: ["dani"],
      lines: [
        {
          speaker: "dani",
          text: "'Landing Friday, six a.m. Don't tell Barrett. Tell Barrett.' Julieta. She watched. She never says she watched.",
          es: "'Aterrizo el viernes, seis a.m. No le digás a Barrett. Decile a Barrett'. Julieta. Lo vio. Nunca dice que lo vio.",
        },
      ],
      words: [
        { word: "landing", es: "aterrizando" },
        { word: "watched", es: "vio" },
        { word: "never", es: "nunca" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s6",
      questionEn: "What does Dani do when he can't go on?",
      questionEs: "¿Qué hace Dani cuando no puede más?",
      options: [
        { label: "Bus 42, five seconds, asks for strength, eats, gets up", emoji: "🚌" },
        { label: "He calls Barrett for a decision", emoji: "📞" },
        { label: "He posts a video about it", emoji: "🎥" },
      ],
      answer: 0,
      sayIt: "Three years ago he couldn't finish a sentence. Since then, he's rehearsed on the bus every day. Now he can say what he thinks in a room that doesn't want to hear it.",
      sayItEs: "Hace tres años no podía terminar una frase. Desde entonces, ha ensayado en el bus todos los días. Ahora puede decir lo que piensa en una sala que no lo quiere oír.",
      sayItCheck: {
        target: "* couldn't finish a sentence *",
        altTargets: ["Since then, *", "Now he can *", "Three years ago *"],
      },
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "How are you different from a year ago? What you couldn't do, what you've done since then, what you can do now, what you still need, and the real change.",
      questionEs: "¿En qué eres diferente a hace un año? Qué no podías hacer, qué has hecho desde entonces, qué puedes hacer ahora, qué te falta, y el cambio real.",
      options: [
        { label: "I am ready to answer", emoji: "🎧" },
        { label: "I want to hear Dani's version again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "A year ago I couldn't answer a question in English without preparing it first. Since then, I've practiced out loud almost every day. Now I can explain a problem at work without translating. I still need to improve when people speak fast. The real change is that I don't avoid speaking anymore.",
      sayItEs: "Hace un año no podía responder una pregunta en inglés sin prepararla antes. Desde entonces, he practicado en voz alta casi todos los días. Ahora puedo explicar un problema en el trabajo sin traducir. Todavía necesito mejorar cuando la gente habla rápido. El cambio real es que ya no evito hablar.",
      sayItAskEn: "Start with \"A year ago I couldn't ...\", then \"Since then, I've ...\", then \"Now I can ...\", then \"I still need to ...\", and close with \"The real change is ...\".",
      sayItAskEs: "Empieza con \"A year ago I couldn't …\", luego \"Since then, I've …\", después \"Now I can …\", luego \"I still need to …\" y cierra con \"The real change is …\".",
      sayItCheck: {
        target: "A year ago I couldn't *",
        altTargets: ["Since then, *", "Now I can *", "The real change is *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s6",
    phrase: "When I can't: five seconds, ask for strength, eat, get up. It's not a method. It's the order I do it in.",
    es: "Cuando no puedo más: cinco segundos, pedir fuerza, comer, levantarme. No es un método. Es el orden en que lo hago.",
  },
  habitCard: {
    afterScene: "s5",
    phrase: "When I talk about my progress, I say the names of the people who picked me up. Names, not the word 'mentor'.",
    es: "Cuando hablo de mi progreso, digo los nombres de las personas que me levantaron. Nombres, no la palabra 'mentor'.",
    model: "dani",
    modelActionEs: "Dani nombró a Vale, Lidia, Nico, Mía, Camila y a su mamá, con lo que hizo cada uno, y no usó ni una vez la palabra 'mentor'.",
  },
  expressions: [
    {
      phrase: "pick up",
      variants: ["picked me up", "picks up", "picking up"],
      es: "levantar (a alguien), recoger",
      kind: "phrasal",
      example: "Every time, somebody picked me up, and none of them made a speech.",
      exampleEs: "Cada vez, alguien me levantó, y ninguno hizo un discurso.",
    },
    {
      phrase: "get up",
      variants: ["got up", "gets up", "getting up"],
      es: "levantarse",
      kind: "phrasal",
      example: "Then I get up. That's not a method.",
      exampleEs: "Luego me levanto. No es un método.",
    },
    {
      phrase: "make a speech",
      variants: ["made a speech", "give a speech", "no speeches"],
      es: "dar un discurso",
      kind: "idiom",
      example: "Every time, somebody picked me up, and none of them made a speech.",
      exampleEs: "Cada vez, alguien me levantó, y ninguno hizo un discurso.",
    },
    {
      phrase: "the real change",
      variants: ["the real difference", "the real thing"],
      es: "el cambio real, el cambio de fondo",
      kind: "idiom",
      example: "The real change is that I don't wait to be ready anymore.",
      exampleEs: "El cambio real es que ya no espero a estar listo.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds, first person, no script: what you couldn't do a year ago, what you've done since then, what you can do now, what you still need, and the real change.",
    es: "Treinta segundos, en primera persona, sin guion: qué no podías hacer hace un año, qué has hecho desde entonces, qué puedes hacer ahora, qué te falta, y el cambio real.",
  },
  continueWith: [
    "A year ago I couldn't ...",
    "Since then, I've ...",
    "Now I can ... I still need to ...",
    "The real change is ...",
  ],
  cliffhanger: {
    en: "Wednesday, 9:00 a.m.: the hearing. Reed, the stool, and a man in Monterrey named Tomás who failed on a Friday because of a schedule Dani signed.",
    es: "Miércoles, 9:00 a.m.: la audiencia. Reed, el banco, y un hombre en Monterrey llamado Tomás que reprobó un viernes por un horario que Dani firmó.",
  },
};
