import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced1-ep19-now-you-ask/cover.jpg";
import s1 from "@/assets/storybook/advanced1-ep19-now-you-ask/s1.jpg";
import s2 from "@/assets/storybook/advanced1-ep19-now-you-ask/s2.jpg";
import s3 from "@/assets/storybook/advanced1-ep19-now-you-ask/s3.jpg";
import s4 from "@/assets/storybook/advanced1-ep19-now-you-ask/s4.jpg";
import s5 from "@/assets/storybook/advanced1-ep19-now-you-ask/s5.jpg";
import s6 from "@/assets/storybook/advanced1-ep19-now-you-ask/s6.jpg";
import s7 from "@/assets/storybook/advanced1-ep19-now-you-ask/s7.jpg";
import s8 from "@/assets/storybook/advanced1-ep19-now-you-ask/s8.jpg";
import s9 from "@/assets/storybook/advanced1-ep19-now-you-ask/s9.jpg";

export const ADVANCED1_EP19_NOW_YOU_ASK: StorybookEpisode = {
  id: "advanced1-ep19-now-you-ask",
  moduleId: "advanced-1",
  week: 4,
  title: "Three chairs",
  titleEs: "Tres sillas",
  episodeLabel: {
    en: "Advanced 1 · Episode 19",
    es: "Advanced 1 · Episodio 19",
  },
  previously: [
    {
      en: "Barrett interviewed Dani in the parking lot at 6:50 a.m.",
      es: "Barrett entrevistó a Dani en el estacionamiento a las 6:50 a.m.",
    },
    {
      en: "Mía said the honest thing: Lidia is the better teacher.",
      es: "Mía dijo lo honesto: Lidia es mejor maestra.",
    },
    {
      en: "Friday: three chairs, and a client complaint about Lidia.",
      es: "Viernes: tres sillas, y una queja de un cliente sobre Lidia.",
    },
  ],
  reviewWords: [
    { word: "candidate", es: "candidato" },
    { word: "complaint", es: "queja" },
    { word: "solution", es: "solución" },
    { word: "accent", es: "acento" },
    { word: "measured", es: "medido" },
  ],
  blurb: {
    en: "The person who leads the pilot will interview, calm an angry client and sell a seat on the same day. So the interview is three chairs. The client on the phone has called three times, and what he wants changed is Lidia.",
    es: "Quien dirija el piloto va a entrevistar, calmar a un cliente enojado y vender un cupo el mismo día. Así que la entrevista son tres sillas. El cliente al teléfono ya llamó tres veces, y lo que quiere cambiar es a Lidia.",
  },
  cover,
  voice: "male",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "A Northline meeting room with three empty chairs in a row facing Barrett's table; a speakerphone in the middle; Camila seated at the side with a laptop; Mía on a stool by the wall.",
      text: "Friday, 9:00 a.m.",
      es: "Viernes, 9:00 a.m.",
      speaker: "barrett",
      cast: ["barrett", "camila", "mia"],
      lines: [
        {
          speaker: "barrett",
          text: "The person who leads this pilot will interview a teacher, calm a client and sell a seat, all on the same day. So today the interview is three chairs.",
          es: "Quien dirija este piloto va a entrevistar a un maestro, calmar a un cliente y vender un cupo, todo el mismo día. Así que hoy la entrevista son tres sillas.",
        },
        {
          speaker: "camila",
          text: "I brought the numbers in case someone lies about them.",
          es: "Traje los números por si alguien miente sobre ellos.",
        },
        {
          speaker: "barrett",
          text: "Nobody's going to lie. They're going to switch roles without switching who they are. That's harder.",
          es: "Nadie va a mentir. Van a cambiar de rol sin cambiar quiénes son. Eso es más difícil.",
        },
        {
          speaker: "mia",
          text: "Is the third chair the electric one?",
          es: "¿La tercera silla es la eléctrica?",
        },
        {
          speaker: "barrett",
          text: "The third chair is sales. So yes.",
          es: "La tercera silla es ventas. Así que sí.",
        },
      ],
      words: [
        { word: "chairs", es: "sillas" },
        { word: "switch", es: "cambiar" },
        { word: "seat", es: "cupo, lugar" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Dani in the first chair, sitting straight, Barrett across from him with her pen ready.",
      text: "Chair one: candidate.",
      es: "Silla uno: candidato.",
      speaker: "barrett",
      cast: ["barrett", "dani"],
      lines: [
        {
          speaker: "barrett",
          text: "Tell me why you're a strong candidate.",
          es: "Dime por qué eres un candidato fuerte.",
        },
        {
          speaker: "dani",
          text: "I'm a strong candidate because I've run every schedule in this academy for a year, and none of the fifty-three students who left, left because of a room, a time or a missing teacher. I have the list.",
          es: "Soy un candidato fuerte porque he manejado cada horario de esta academia durante un año, y ninguno de los cincuenta y tres estudiantes que se fueron se fue por un salón, un horario o un maestro ausente. Tengo la lista.",
        },
        {
          speaker: "barrett",
          text: "That's a fact. Give me the other one.",
          es: "Eso es un hecho. Dame el otro.",
        },
        {
          speaker: "dani",
          text: "I know what a first day feels like from the wrong side of the desk. I was the student who couldn't finish a sentence in that small room. That's not on the list. It's why the list exists.",
          es: "Sé cómo se siente un primer día desde el lado equivocado del escritorio. Yo fui el estudiante que no podía terminar una frase en ese salón pequeño. Eso no está en la lista. Es la razón por la que la lista existe.",
        },
      ],
      words: [
        { word: "schedule", es: "horario" },
        { word: "missing", es: "ausente, que falta" },
        { word: "desk", es: "escritorio" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Dani in the second chair with the speakerphone lit in front of him; Barrett watching; Camila's hand paused over her keyboard.",
      text: "Chair two: the client.",
      es: "Silla dos: el cliente.",
      speaker: "morgan",
      cast: ["morgan", "dani", "barrett", "camila"],
      lines: [
        {
          speaker: "morgan",
          text: "I've called three times and nobody has fixed my problem.",
          es: "He llamado tres veces y nadie ha resuelto mi problema.",
        },
        {
          speaker: "dani",
          text: "You've called three times and you're talking to the fourth person. That ends now. I'm taking over your case, and you have my name: Dani.",
          es: "Ha llamado tres veces y está hablando con la cuarta persona. Eso se acaba ahora. Me hago cargo de su caso, y tiene mi nombre: Dani.",
        },
        {
          speaker: "morgan",
          text: "My group's teacher has an accent. I asked for a native teacher three weeks ago. That's the problem.",
          es: "La maestra de mi grupo tiene acento. Pedí una maestra nativa hace tres semanas. Ese es el problema.",
        },
        {
          speaker: "dani",
          text: "I understand. You want your team to sound confident on calls, and you're not seeing it yet. Is that right?",
          es: "Entiendo. Quiere que su equipo suene seguro en las llamadas, y todavía no lo está viendo. ¿Es correcto?",
        },
        {
          speaker: "morgan",
          text: "I don't want another apology. I want a solution.",
          es: "No quiero otra disculpa. Quiero una solución.",
        },
      ],
      words: [
        { word: "case", es: "caso" },
        { word: "native", es: "nativo" },
        { word: "confident", es: "seguro, con confianza" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Close on Dani speaking into the speakerphone, calm, one finger on the table; Camila writing fast; Mía leaning in from her stool.",
      text: "The solution.",
      es: "La solución.",
      speaker: "dani",
      cast: ["dani", "morgan", "camila"],
      lines: [
        {
          speaker: "dani",
          text: "Here's exactly what happens next. Your group keeps its teacher for two weeks. Every class, I send you the speaking minutes per agent, measured, before and after. If the minutes don't go up, I'll call you back myself and we change teachers that day.",
          es: "Esto es exactamente lo que sigue. Su grupo conserva a su maestra dos semanas. Cada clase, le envío los minutos hablados por agente, medidos, antes y después. Si los minutos no suben, le llamo yo mismo y cambiamos de maestra ese día.",
        },
        {
          speaker: "morgan",
          text: "And if I say I want the change today?",
          es: "¿Y si le digo que quiero el cambio hoy?",
        },
        {
          speaker: "dani",
          text: "Then I'd be selling you a voice instead of a result, and you'd notice in month two. A native accent isn't one size fits all. Your agents need someone who learned this the way they're learning it.",
          es: "Entonces le estaría vendiendo una voz en vez de un resultado, y usted lo notaría en el segundo mes. Un acento nativo no le sirve a todos por igual. Sus agentes necesitan a alguien que aprendió esto de la forma en que ellos lo están aprendiendo.",
        },
        {
          speaker: "morgan",
          text: "Two weeks. Send me the first numbers Monday.",
          es: "Dos semanas. Mándeme los primeros números el lunes.",
        },
        {
          speaker: "camila",
          text: "Monday, 8 a.m. I'm writing it down so it's real.",
          es: "Lunes, 8 a.m. Lo estoy anotando para que sea real.",
        },
      ],
      words: [
        { word: "exactly", es: "exactamente" },
        { word: "measured", es: "medidos" },
        { word: "notice", es: "notar" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Dani in the third chair; Barrett holding up her own phone across the table; Camila and Mía in the background.",
      text: "Chair three: sales.",
      es: "Silla tres: ventas.",
      speaker: "barrett",
      cast: ["barrett", "dani"],
      lines: [
        {
          speaker: "barrett",
          text: "Sell me this phone.",
          es: "Véndeme este teléfono.",
        },
        {
          speaker: "dani",
          text: "You already own it. So let me sell you the thing you don't: the pilot. What makes it different is that every agent speaks for eleven minutes per class, and you get the minutes, not a report about the minutes.",
          es: "Ya es suyo. Así que déjeme venderle lo que no tiene: el piloto. Lo que lo hace diferente es que cada agente habla once minutos por clase, y usted recibe los minutos, no un reporte sobre los minutos.",
        },
        {
          speaker: "barrett",
          text: "It's too expensive. Why would I pay that?",
          es: "Es muy caro. ¿Por qué pagaría eso?",
        },
        {
          speaker: "dani",
          text: "Because you lose six hundred agents a year who freeze on calls, and each one costs you more than a month of this. Start with one group in October. If the minutes don't move, you've paid for one month, not for a year.",
          es: "Porque usted pierde seiscientos agentes al año que se congelan en las llamadas, y cada uno le cuesta más que un mes de esto. Empiece con un grupo en octubre. Si los minutos no se mueven, pagó un mes, no un año.",
        },
      ],
      words: [
        { word: "own", es: "ser dueño de" },
        { word: "expensive", es: "caro" },
        { word: "freeze", es: "congelarse, quedarse en blanco" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "The hallway outside the meeting room; Lidia walking in past Dani, who is leaning against the wall; Camila beside him with two paper cups.",
      text: "Lidia's turn.",
      es: "El turno de Lidia.",
      speaker: "camila",
      cast: ["camila", "dani", "lidia"],
      lines: [
        {
          speaker: "camila",
          text: "You didn't say her name once in there.",
          es: "No dijiste su nombre ni una vez ahí adentro.",
        },
        {
          speaker: "dani",
          text: "It wasn't about her name.",
          es: "No era sobre su nombre.",
        },
        {
          speaker: "camila",
          text: "It was, though.",
          es: "Sí lo era.",
        },
        {
          speaker: "dani",
          text: "Not funny, Camila.",
          es: "No es gracioso, Camila.",
        },
        {
          speaker: "camila",
          text: "I know. That's why I said it quietly.",
          es: "Lo sé. Por eso lo dije bajito.",
        },
      ],
      words: [
        { word: "once", es: "ni una vez" },
        { word: "though", es: "sin embargo, aunque" },
        { word: "quietly", es: "bajito, en voz baja" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Lidia coming out of the meeting room, stopping in front of Dani in the hallway; both serious; the door half open behind her.",
      text: "Forty minutes later.",
      es: "Cuarenta minutos después.",
      speaker: "lidia",
      cast: ["lidia", "dani"],
      lines: [
        {
          speaker: "lidia",
          text: "Barrett told me. The client asked for a native.",
          es: "Barrett me lo dijo. El cliente pidió una nativa.",
        },
        {
          speaker: "dani",
          text: "He asked for a result. He used the wrong word for it.",
          es: "Pidió un resultado. Usó la palabra equivocada.",
        },
        {
          speaker: "lidia",
          text: "Did you defend me, or the pilot?",
          es: "¿Me defendiste a mí, o al piloto?",
        },
        {
          speaker: "dani",
          text: "Yes.",
          es: "Sí.",
        },
        {
          speaker: "lidia",
          text: "I gave him the same two weeks. Then I told him my accent is the reason his agents will trust me. You didn't say that part.",
          es: "Yo le di las mismas dos semanas. Después le dije que mi acento es la razón por la que sus agentes van a confiar en mí. Tú no dijiste esa parte.",
        },
        {
          speaker: "dani",
          text: "It wasn't mine to say.",
          es: "No me tocaba a mí decirlo.",
        },
      ],
      words: [
        { word: "defend", es: "defender" },
        { word: "reason", es: "razón" },
        { word: "trust", es: "confiar" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Barrett and Vale in the emptied meeting room, the three chairs still in a row; Vale standing, Barrett gathering her folder.",
      text: "After.",
      es: "Después.",
      speaker: "barrett",
      cast: ["barrett", "vale"],
      lines: [
        {
          speaker: "barrett",
          text: "She handled the client better than he did. He sold better than she did. And they both offered two weeks of numbers without talking to each other.",
          es: "Ella manejó al cliente mejor que él. Él vendió mejor que ella. Y los dos ofrecieron dos semanas de números sin hablar entre ellos.",
        },
        {
          speaker: "vale",
          text: "So?",
          es: "¿Entonces?",
        },
        {
          speaker: "barrett",
          text: "So on Monday I don't choose the better one. I choose the one the pilot needs. Those are different questions and I've been pretending they're the same.",
          es: "Entonces el lunes no elijo al mejor. Elijo al que el piloto necesita. Son preguntas distintas y he estado fingiendo que son la misma.",
        },
        {
          speaker: "vale",
          text: "Monday, then. In the small room.",
          es: "El lunes, entonces. En el salón pequeño.",
        },
      ],
      words: [
        { word: "handled", es: "manejó" },
        { word: "pretending", es: "fingiendo" },
        { word: "different", es: "distintas" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Dani and Mía on the academy's front steps in the afternoon; Mía with her headset on one ear, Dani with his sleeves rolled up.",
      text: "The steps, again.",
      es: "Las gradas, otra vez.",
      speaker: "mia",
      cast: ["mia", "dani"],
      lines: [
        {
          speaker: "mia",
          text: "Jefe. The client. Would you really change the teacher after two weeks?",
          es: "Jefe. El cliente. ¿De verdad cambiarías a la maestra después de dos semanas?",
        },
        {
          speaker: "dani",
          text: "If the minutes didn't move? Yes.",
          es: "¿Si los minutos no se movieran? Sí.",
        },
        {
          speaker: "mia",
          text: "Cold.",
          es: "Frío.",
        },
        {
          speaker: "dani",
          text: "Honest. She'd do the same to me. That's why the two weeks mean something.",
          es: "Honesto. Ella me haría lo mismo. Por eso las dos semanas significan algo.",
        },
        {
          speaker: "mia",
          text: "Okay. But if you ever call me back yourself, I'm recording it.",
          es: "Okay. Pero si algún día me llamas de vuelta tú mismo, lo voy a grabar.",
        },
      ],
      words: [
        { word: "really", es: "de verdad" },
        { word: "cold", es: "frío" },
        { word: "recording", es: "grabando" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What does Dani promise the client?",
      questionEs: "¿Qué le promete Dani al cliente?",
      options: [
        { label: "Two weeks of measured speaking minutes, and a call back from Dani himself if they don't go up", emoji: "📊" },
        { label: "A native teacher starting on Monday", emoji: "🗣️" },
        { label: "A discount and a written apology", emoji: "💸" },
      ],
      answer: 0,
      sayIt: "Two weeks of measured speaking minutes, and he will call back himself if they don't go up.",
      sayItEs: "Dos semanas de minutos hablados medidos, y él mismo llamará de vuelta si no suben.",
      sayItCheck: {
        target: "Two weeks of measured speaking minutes",
        altTargets: ["He will call back himself", "Two weeks of minutes"],
      },
    },
    {
      id: "q2",
      afterScene: "s5",
      questionEn: "Sell me something you know well in thirty seconds: their need, one difference, close. Then answer: it's too expensive.",
      questionEs: "Véndeme algo que conozcas bien en treinta segundos: su necesidad, una diferencia, cierre. Luego responde: es muy caro.",
      options: [
        { label: "I am ready to answer", emoji: "🎤" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "You need a phone that lasts two days without charging. What makes this one different is the battery: forty-eight hours, tested. Start with the basic plan and change it any time. And if it's too expensive, compare it with buying two chargers a year.",
      sayItEs: "Usted necesita un teléfono que dure dos días sin cargar. Lo que hace diferente a este es la batería: cuarenta y ocho horas, probadas. Empiece con el plan básico y cámbielo cuando quiera. Y si es muy caro, compárelo con comprar dos cargadores al año.",
      sayItAskEn: "Start with \"You need ...\", then \"What makes this different is ...\", then close with \"Start with ...\".",
      sayItAskEs: "Empieza con \"You need …\", luego \"What makes this different is …\" y cierra con \"Start with …\".",
      sayItCheck: {
        target: "What makes * different is *",
        altTargets: ["You need *", "Start with *", "What makes it different is *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s1",
    phrase: "I can switch roles without switching who I am.",
    es: "Puedo cambiar de rol sin cambiar quién soy.",
  },
  habitCard: {
    afterScene: "s4",
    phrase: "I say \"I'm the person\" before I say \"I'm sorry\".",
    es: "Digo \"yo soy la persona\" antes de decir \"lo siento\".",
    model: "dani",
    modelActionEs: "Dani no se disculpó por las tres llamadas anteriores: se hizo cargo del caso, dio su nombre y luego dio la solución con fechas.",
  },
  expressions: [
    {
      phrase: "take over",
      variants: ["taking over", "took over", "takes over"],
      es: "hacerse cargo, tomar el control",
      kind: "phrasal",
      example: "I'm taking over your case, and you have my name: Dani.",
      exampleEs: "Me hago cargo de su caso, y tiene mi nombre: Dani.",
    },
    {
      phrase: "call back",
      variants: ["call you back", "call me back", "called back", "calling back"],
      es: "devolver la llamada",
      kind: "phrasal",
      example: "I'll call you back myself and we change teachers that day.",
      exampleEs: "Le llamo yo mismo y cambiamos de maestra ese día.",
    },
    {
      phrase: "the wrong side of the desk",
      variants: ["the other side of the desk"],
      es: "el lado del que recibe, no del que decide",
      kind: "idiom",
      example: "I know what a first day feels like from the wrong side of the desk.",
      exampleEs: "Sé cómo se siente un primer día desde el lado equivocado del escritorio.",
    },
    {
      phrase: "one size fits all",
      variants: ["one-size-fits-all"],
      es: "igual para todos, sin adaptar",
      kind: "idiom",
      example: "A native accent isn't one size fits all.",
      exampleEs: "Un acento nativo no le sirve a todos por igual.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds, two chairs: first, a customer has called three times about the same problem — take ownership and give the solution. Then switch: why are you a strong candidate?",
    es: "Treinta segundos, dos sillas: primero, un cliente ha llamado tres veces por el mismo problema; hazte cargo y da la solución. Luego cambia: ¿por qué eres un candidato fuerte?",
  },
  continueWith: [
    "That ends now. I'm the person ...",
    "Here's exactly what happens next: ...",
    "I'm a strong candidate because ...",
  ],
  cliffhanger: {
    en: "Monday: the small room. Barrett chooses. Crown calls Lidia one more time. And Vale gives away the thing she loves most.",
    es: "Lunes: el salón pequeño. Barrett elige. Crown llama a Lidia una vez más. Y Vale regala lo que más ama.",
  },
};
