import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced3-ep19-what-i-didnt-say/cover.jpg";
import s1 from "@/assets/storybook/advanced3-ep19-what-i-didnt-say/s1.jpg";
import s2 from "@/assets/storybook/advanced3-ep19-what-i-didnt-say/s2.jpg";
import s3 from "@/assets/storybook/advanced3-ep19-what-i-didnt-say/s3.jpg";
import s4 from "@/assets/storybook/advanced3-ep19-what-i-didnt-say/s4.jpg";
import s5 from "@/assets/storybook/advanced3-ep19-what-i-didnt-say/s5.jpg";
import s6 from "@/assets/storybook/advanced3-ep19-what-i-didnt-say/s6.jpg";
import s7 from "@/assets/storybook/advanced3-ep19-what-i-didnt-say/s7.jpg";
import s8 from "@/assets/storybook/advanced3-ep19-what-i-didnt-say/s8.jpg";
import s9 from "@/assets/storybook/advanced3-ep19-what-i-didnt-say/s9.jpg";

export const ADVANCED3_EP19_WHAT_I_DIDNT_SAY: StorybookEpisode = {
  id: "advanced3-ep19-what-i-didnt-say",
  moduleId: "advanced-3",
  week: 4,
  title: "What I didn't say",
  titleEs: "Lo que no dije",
  episodeLabel: {
    en: "Advanced 3 · Episode 19",
    es: "Advanced 3 · Episodio 19",
  },
  previously: [
    {
      en: "'The signature is mine.' Suspension lifted at two. Tomás gets his Thursday back.",
      es: "'La firma es mía'. Suspensión levantada a las dos. Tomás recupera su jueves.",
    },
    {
      en: "Óscar, four fifty, passed. 'I heard the alarm. I talked anyway.'",
      es: "Óscar, cuatro cincuenta, aprobó. 'Oí la alarma. Hablé de todos modos'.",
    },
    {
      en: "Friday, nine a.m., the last room. Reed is bringing Julieta. Lidia comes Thursday at six.",
      es: "Viernes, nueve a.m., la última sala. Reed trae a Julieta. Lidia viene el jueves a las seis.",
    },
  ],
  reviewWords: [
    { word: "regret", es: "arrepentimiento" },
    { word: "consequence", es: "consecuencia" },
    { word: "should", es: "debería" },
    { word: "instead", es: "en vez de" },
    { word: "fine", es: "bien" },
  ],
  blurb: {
    en: "Thursday. The block is back at ten. At six, Lidia walks into the academy in person for the first time in three years, with Óscar's certificate. Dani tells her the thing he didn't say in the last room: he should have asked her to stay. Decision, consequence, what he'd do differently, what it taught him. Lidia doesn't come back. They're fine.",
    es: "Jueves. El bloque vuelve a las diez. A las seis, Lidia entra a la academia en persona por primera vez en tres años, con el certificado de Óscar. Dani le dice lo que no dijo en la última sala: debió pedirle que se quedara. Decisión, consecuencia, qué haría distinto, qué le enseñó. Lidia no vuelve. Están bien.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Thursday, 10:00 a.m.; the Northline training room full again, seventeen agents plus Óscar at the tall table, Mía running the first round, Nico timing on his phone; Dani standing by the wall, not teaching; the word HEARD still on the whiteboard.",
      text: "Thursday, 10:00 a.m. The block is back. He doesn't run it. Mía does.",
      es: "Jueves, 10:00 a.m. Vuelve el bloque. Él no lo dirige. Mía sí.",
      speaker: "mia",
      cast: ["mia", "nico", "oscar", "dani"],
      lines: [
        {
          speaker: "mia",
          text: "Round one. 'It doesn't work.' Five seconds, wrong answer allowed, then tell your partner what you heard. Óscar, you're the customer today.",
          es: "Ronda uno. 'No funciona'. Cinco segundos, se permite la respuesta equivocada, luego decile a tu pareja qué escuchaste. Óscar, hoy vos sos el cliente.",
        },
        {
          speaker: "nico",
          text: "Jefe's not teaching. Jefe's leaning on a wall.",
          es: "El jefe no está enseñando. El jefe está apoyado en una pared.",
        },
        {
          speaker: "dani",
          text: "Jefe's watching a room that doesn't need him. It took three years. Let me have the wall.",
          es: "El jefe está viendo un salón que no lo necesita. Tomó tres años. Dejame la pared.",
        },
      ],
      words: [
        { word: "round", es: "ronda" },
        { word: "partner", es: "pareja" },
        { word: "customer", es: "cliente" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "The floor, 11:30 a.m.; Camila at the end of the row with her tablet showing an airline confirmation; Dani reading it; Mía behind them with her headset on, pretending to be on a call.",
      text: "11:30 a.m. Camila can't keep a secret from a spreadsheet.",
      es: "11:30 a.m. Camila no puede guardarle un secreto a una hoja de cálculo.",
      speaker: "camila",
      cast: ["camila", "dani", "mia"],
      lines: [
        {
          speaker: "camila",
          text: "Reed's office booked a flight from Bogotá. Lands tomorrow at six. I'm not telling you. I'm showing you an expense.",
          es: "La oficina de Reed reservó un vuelo desde Bogotá. Aterriza mañana a las seis. No te lo estoy diciendo. Te estoy mostrando un gasto.",
        },
        {
          speaker: "dani",
          text: "She told me Tuesday. 'Don't tell Barrett, tell Barrett.'",
          es: "Me lo dijo el martes. 'No le digás a Barrett, decile a Barrett'.",
        },
        {
          speaker: "camila",
          text: "And Lidia's coming at six with Óscar's paper. Crown delivers retakes in person. She asked for the academy.",
          es: "Y Lidia viene a las seis con el papel de Óscar. Crown entrega los reintentos en persona. Pidió la academia.",
        },
      ],
      words: [
        { word: "flight", es: "vuelo" },
        { word: "expense", es: "gasto" },
        { word: "delivers", es: "entrega" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "6:00 p.m.; the front door of the academy; Lidia in person for the first time in three years, teal blazer over a grey top, hair in a low bun, an envelope in her hand; Vale holding the door; Dani in the corridor behind her, very still.",
      text: "6:00 p.m. Lidia, in person. Vale opens the door.",
      es: "6:00 p.m. Lidia, en persona. Vale abre la puerta.",
      speaker: "lidia",
      cast: ["lidia", "vale", "dani"],
      lines: [
        {
          speaker: "lidia",
          text: "I still have the key. I've never used it. It felt like coming in through a window.",
          es: "Todavía tengo la llave. Nunca la usé. Se sentía como entrar por una ventana.",
        },
        {
          speaker: "vale",
          text: "The chairs are in a circle now. You'll hate it.",
          es: "Las sillas están en círculo ahora. Lo vas a odiar.",
        },
        {
          speaker: "lidia",
          text: "I saw it on Tuesday, with forty-one thousand other people. I brought Óscar's certificate. Four fifty. I'd like to hand it to the person who didn't take his call.",
          es: "Lo vi el martes, con otras cuarenta y un mil personas. Traje el certificado de Óscar. Cuatro cincuenta. Quisiera entregárselo a la persona que no tomó su llamada.",
        },
      ],
      words: [
        { word: "window", es: "ventana" },
        { word: "certificate", es: "certificado" },
        { word: "hand", es: "entregar" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "The small room; Lidia and Dani sitting across from each other in the circle, the envelope on the chair between them; Vale gone from the doorway, on purpose.",
      text: "The circle. Vale leaves the doorway, for once.",
      es: "El círculo. Vale deja la puerta, por una vez.",
      speaker: "dani",
      cast: ["dani", "lidia"],
      lines: [
        {
          speaker: "dani",
          text: "Three years ago, in the last room, you said you'd signed with Crown. I said 'you could have said that at seven thirty'. That was my decision: a joke about the time. The consequence was that you left, I got the room, and I never told you I wanted you in it.",
          es: "Hace tres años, en la última sala, dijiste que habías firmado con Crown. Yo dije 'pudiste haberlo dicho a las siete y media'. Esa fue mi decisión: un chiste sobre la hora. La consecuencia fue que te fuiste, yo me quedé con el salón, y nunca te dije que te quería en él.",
        },
        {
          speaker: "lidia",
          text: "You said it on Tuesday. To forty-one thousand people. 'Lidia played me my worst call and didn't let me say but.'",
          es: "Lo dijiste el martes. A cuarenta y un mil personas. 'Lidia me puso mi peor llamada y no me dejó decir pero'.",
        },
        {
          speaker: "dani",
          text: "That's what you did. This is what I didn't.",
          es: "Eso es lo que hiciste vos. Esto es lo que yo no hice.",
        },
      ],
      words: [
        { word: "joke", es: "chiste" },
        { word: "consequence", es: "consecuencia" },
        { word: "decision", es: "decisión" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Close on Dani, elbows on his knees, looking at Lidia directly; Lidia's hands folded, the calm experienced face not moving.",
      text: "Should have. Could have. Shouldn't have.",
      es: "Debí. Pude. No debí.",
      speaker: "dani",
      cast: ["dani", "lidia"],
      lines: [
        {
          speaker: "dani",
          text: "Looking back, I should have asked you to stay. In the room, before the name. I could have said 'the pilot needs two teachers and one of them sounds like her students'. I shouldn't have made the joke; it was my five seconds and I spent them on it. It was Vale who gave up the room that day. It should have been me who asked you to share it.",
          es: "Mirando atrás, debí pedirte que te quedaras. En la sala, antes del nombre. Pude haber dicho 'el piloto necesita dos maestros y una de ellas suena como sus estudiantes'. No debí hacer el chiste; eran mis cinco segundos y me los gasté en eso. Fue Vale quien entregó el salón ese día. Debí ser yo quien te pidiera compartirlo.",
        },
        {
          speaker: "lidia",
          text: "I wouldn't have stayed.",
          es: "No me habría quedado.",
        },
        {
          speaker: "dani",
          text: "I know. That's not why I should have said it.",
          es: "Ya sé. No es por eso que debí decirlo.",
        },
      ],
      words: [
        { word: "share", es: "compartir" },
        { word: "spent", es: "gasté" },
        { word: "stayed", es: "quedado" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Lidia picking up the envelope and turning it over in her hands, looking at it instead of Dani for the first time; the empty whiteboard behind her.",
      text: "Lidia has one too. She's never said it either.",
      es: "Lidia también tiene uno. Ella tampoco lo ha dicho nunca.",
      speaker: "lidia",
      cast: ["lidia", "dani"],
      lines: [
        {
          speaker: "lidia",
          text: "Then mine. I should have played you your worst call before I left, here, as a teacher. Instead I did it a year later as Crown's auditor. What I regret is not the audit. It's that the first time I gave you something honest, I was being paid by the other side to do it.",
          es: "Entonces el mío. Debí ponerte tu peor llamada antes de irme, aquí, como maestra. En vez de eso lo hice un año después como auditora de Crown. Lo que lamento no es la auditoría. Es que la primera vez que te di algo honesto, me estaba pagando el otro lado para hacerlo.",
        },
        {
          speaker: "dani",
          text: "It counted anyway. I didn't say 'but'.",
          es: "Contó de todos modos. No dije 'pero'.",
        },
        {
          speaker: "lidia",
          text: "I know. I wrote that down. It's the only line of mine anyone framed.",
          es: "Ya sé. Lo anoté. Es la única línea mía que alguien enmarcó.",
        },
      ],
      words: [
        { word: "auditor", es: "auditora" },
        { word: "honest", es: "honesto" },
        { word: "framed", es: "enmarcó" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Dani and Lidia both standing now; Lidia handing him the envelope; Vale back in the doorway, arms folded, the way she stands when someone else is teaching.",
      text: "What it taught him. What he does now.",
      es: "Qué le enseñó. Qué hace ahora.",
      speaker: "dani",
      cast: ["dani", "lidia", "vale"],
      lines: [
        {
          speaker: "dani",
          text: "What I learned was that the thing I don't say doesn't disappear. It waits. Now, when I want someone to stay, I say it before they sign anything. I said it to a girl in this chair on Monday. Tomorrow at nine, I say it to a room.",
          es: "Lo que aprendí fue que lo que no digo no desaparece. Espera. Ahora, cuando quiero que alguien se quede, lo digo antes de que firme nada. Se lo dije a una muchacha en esta silla el lunes. Mañana a las nueve, se lo digo a una sala.",
        },
        {
          speaker: "lidia",
          text: "Say it to the one landing at six, too. The work thing, not the thing you think I mean. She built half of Bogotá with a phone in the dark and nobody's told her.",
          es: "Decíselo también a la que aterriza a las seis. Lo del trabajo, no lo que pensás que quiero decir. Construyó media Bogotá con un teléfono a oscuras y nadie se lo ha dicho.",
        },
        {
          speaker: "vale",
          text: "He's had the practice. Three years of it.",
          es: "Ya tiene la práctica. Tres años de práctica.",
        },
      ],
      words: [
        { word: "disappear", es: "desaparecer" },
        { word: "waits", es: "espera" },
        { word: "built", es: "construyó" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "The front door of the academy at dusk; Lidia on the step with her bag, the same spot where Abril knocked; Dani inside the door, Vale beside him; Lidia not looking back.",
      text: "7:10 p.m. She doesn't come back. They're fine.",
      es: "7:10 p.m. Ella no vuelve. Están bien.",
      speaker: "lidia",
      cast: ["lidia", "dani", "vale"],
      lines: [
        {
          speaker: "lidia",
          text: "I'm not coming back, Dani. Not to the academy, not to the pilot. I'm good where I am, and where I am has a girl who sounds like me and nobody who tells her that's fine. So that's my job now. We're fine.",
          es: "No voy a volver, Dani. Ni a la academia, ni al piloto. Estoy bien donde estoy, y donde estoy hay una muchacha que suena como yo y nadie que le diga que eso está bien. Así que ese es mi trabajo ahora. Estamos bien.",
        },
        {
          speaker: "dani",
          text: "We're fine.",
          es: "Estamos bien.",
        },
        {
          speaker: "lidia",
          text: "Keep the key, Vale. Give it to the girl in the chair when she's ready to teach.",
          es: "Quedate con la llave, Vale. Dásela a la muchacha de la silla cuando esté lista para enseñar.",
        },
      ],
      words: [
        { word: "coming", es: "volviendo" },
        { word: "sounds", es: "suena" },
        { word: "key", es: "llave" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Night; the bus stop; Nico and Dani on the bench; Nico with his hood down, arriving for the night shift; Dani holding Óscar's envelope, unopened, on his knee.",
      text: "9:40 p.m. Nico asks the way Nico asks.",
      es: "9:40 p.m. Nico pregunta como pregunta Nico.",
      speaker: "nico",
      cast: ["nico", "dani"],
      lines: [
        {
          speaker: "nico",
          text: "Did she come back?",
          es: "¿Volvió?",
        },
        {
          speaker: "dani",
          text: "No.",
          es: "No.",
        },
        {
          speaker: "nico",
          text: "You okay?",
          es: "¿Estás bien?",
        },
        {
          speaker: "dani",
          text: "I said a sentence three years late. Late counts. We're fine. Tomorrow at nine I say a yes with two conditions to a room with a lawyer in it, and Julieta lands at six and I'm supposed to not tell Barrett and tell Barrett.",
          es: "Dije una frase tres años tarde. Tarde cuenta. Estamos bien. Mañana a las nueve digo un sí con dos condiciones en una sala con un abogado adentro, y Julieta aterriza a las seis y se supone que no le diga a Barrett y le diga a Barrett.",
        },
        {
          speaker: "nico",
          text: "Tell Barrett.",
          es: "Decile a Barrett.",
        },
      ],
      words: [
        { word: "late", es: "tarde" },
        { word: "counts", es: "cuenta" },
        { word: "supposed", es: "se supone" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s5",
      questionEn: "What does Dani say he should have done three years ago?",
      questionEs: "¿Qué dice Dani que debió haber hecho hace tres años?",
      options: [
        { label: "Asked Lidia to stay, in the room, before the name", emoji: "🪑" },
        { label: "Taken Crown's offer himself", emoji: "🏢" },
        { label: "Given her the key to the academy", emoji: "🔑" },
      ],
      answer: 0,
      sayIt: "He should have asked her to stay. He could have said the pilot needed two teachers. What he learned was that the thing he doesn't say doesn't disappear. It waits.",
      sayItEs: "Debió pedirle que se quedara. Pudo haber dicho que el piloto necesitaba dos maestros. Lo que aprendió fue que lo que no dice no desaparece. Espera.",
      sayItCheck: {
        target: "He should have *",
        altTargets: ["He could have *", "What he learned was *", "* doesn't disappear *"],
      },
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "A decision you would make differently today. What you decided, the consequence, what you should have done instead, what you learned, and how you decide now.",
      questionEs: "Una decisión que hoy tomarías diferente. Qué decidiste, la consecuencia, qué debiste hacer en su lugar, qué aprendiste, y cómo decides ahora.",
      options: [
        { label: "I am ready to answer", emoji: "🎧" },
        { label: "I want to hear Dani's version again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "A few years ago I said no to a job because it scared me. The consequence was that I stayed two more years in the same place. Looking back, I should have said yes and learned inside the job. I could have asked for three months. What I learned was that waiting to feel ready is a slow way to grow. Now, when something scares me a little, I take it as information.",
      sayItEs: "Hace unos años dije que no a un trabajo porque me daba miedo. La consecuencia fue que me quedé dos años más en el mismo lugar. Mirando atrás, debí haber dicho que sí y aprender dentro del trabajo. Pude haber pedido tres meses. Lo que aprendí fue que esperar a sentirse listo es una forma lenta de crecer. Ahora, cuando algo me da un poco de miedo, lo tomo como información.",
      sayItAskEn: "Start with \"A few years ago I ...\", then \"The consequence was ...\", then \"I should have ... I could have ...\", then \"What I learned was ...\", and close with \"Now, when ...\".",
      sayItAskEs: "Empieza con \"A few years ago I …\", luego \"The consequence was …\", después \"I should have … I could have …\", luego \"What I learned was …\" y cierra con \"Now, when …\".",
      sayItCheck: {
        target: "I should have *",
        altTargets: ["I could have *", "The consequence was *", "What I learned was *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s7",
    phrase: "The thing I don't say doesn't disappear. It waits. So I say it before anyone signs anything. Late counts, but early is better.",
    es: "Lo que no digo no desaparece. Espera. Así que lo digo antes de que alguien firme nada. Tarde cuenta, pero temprano es mejor.",
  },
  habitCard: {
    afterScene: "s5",
    phrase: "When I talk about a regret, I say what I should have done and what I could have said, and I don't ask the other person to fix it.",
    es: "Cuando hablo de un arrepentimiento, digo qué debí hacer y qué pude decir, y no le pido a la otra persona que lo arregle.",
    model: "dani",
    modelActionEs: "Dani le dijo a Lidia 'debí pedirte que te quedaras' y, cuando ella dijo 'no me habría quedado', respondió 'ya sé, no es por eso que debí decirlo'.",
  },
  expressions: [
    {
      phrase: "come back",
      variants: ["came back", "coming back", "comes back"],
      es: "volver, regresar",
      kind: "phrasal",
      example: "I'm not coming back, Dani. Not to the academy, not to the pilot.",
      exampleEs: "No voy a volver, Dani. Ni a la academia, ni al piloto.",
    },
    {
      phrase: "give up",
      variants: ["gave up", "gives up", "giving up"],
      es: "renunciar a, entregar, ceder",
      kind: "phrasal",
      example: "It was Vale who gave up the room that day.",
      exampleEs: "Fue Vale quien entregó el salón ese día.",
    },
    {
      phrase: "looking back",
      variants: ["in hindsight", "looking back on it"],
      es: "mirando atrás, en retrospectiva",
      kind: "idiom",
      example: "Looking back, I should have asked you to stay.",
      exampleEs: "Mirando atrás, debí pedirte que te quedaras.",
    },
    {
      phrase: "we're fine",
      variants: ["we're good", "I'm good where I am"],
      es: "estamos bien, no hay problema entre nosotros",
      kind: "idiom",
      example: "So that's my job now. We're fine.",
      exampleEs: "Así que ese es mi trabajo ahora. Estamos bien.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: something you regret not saying. The decision, the consequence, what you should have done, what you learned, and what you do now.",
    es: "Treinta segundos: algo que te arrepientes de no haber dicho. La decisión, la consecuencia, qué debiste hacer, qué aprendiste, y qué haces ahora.",
  },
  continueWith: [
    "A few years ago I ... The consequence was ...",
    "Looking back, I should have ...",
    "I could have ... I shouldn't have ...",
    "What I learned was ... Now, when ...",
  ],
  cliffhanger: {
    en: "Friday, 9:00 a.m. The last room. Barrett, Vale, Camila, Mía, Nico, Reed, and Julieta in person for the first time. The question is one word. The answer is a yes with two conditions and a headset.",
    es: "Viernes, 9:00 a.m. La última sala. Barrett, Vale, Camila, Mía, Nico, Reed, y Julieta en persona por primera vez. La pregunta es una palabra. La respuesta es un sí con dos condiciones y una diadema.",
  },
};
