import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced2-ep18-mia-teaches/cover.jpg";
import s1 from "@/assets/storybook/advanced2-ep18-mia-teaches/s1.jpg";
import s2 from "@/assets/storybook/advanced2-ep18-mia-teaches/s2.jpg";
import s3 from "@/assets/storybook/advanced2-ep18-mia-teaches/s3.jpg";
import s4 from "@/assets/storybook/advanced2-ep18-mia-teaches/s4.jpg";
import s5 from "@/assets/storybook/advanced2-ep18-mia-teaches/s5.jpg";
import s6 from "@/assets/storybook/advanced2-ep18-mia-teaches/s6.jpg";
import s7 from "@/assets/storybook/advanced2-ep18-mia-teaches/s7.jpg";
import s8 from "@/assets/storybook/advanced2-ep18-mia-teaches/s8.jpg";
import s9 from "@/assets/storybook/advanced2-ep18-mia-teaches/s9.jpg";

export const ADVANCED2_EP18_MIA_TEACHES: StorybookEpisode = {
  id: "advanced2-ep18-mia-teaches",
  moduleId: "advanced-2",
  week: 4,
  title: "Mía teaches",
  titleEs: "Mía enseña",
  episodeLabel: {
    en: "Advanced 2 · Episode 18",
    es: "Advanced 2 · Episodio 18",
  },
  previously: [
    {
      en: "Three one-to-ones. Dani's goal is written in a folder.",
      es: "Tres uno a uno. La meta de Dani está escrita en una carpeta.",
    },
    {
      en: "Mía's goal: escalations alone, and more feedback from Dani.",
      es: "La meta de Mía: escalaciones sola, y más retroalimentación de Dani.",
    },
    {
      en: "Wednesday: Bogotá's fifteen agents learn the case process. Mía is teaching it.",
      es: "Miércoles: los quince agentes de Bogotá aprenden el proceso de casos. Mía lo enseña.",
    },
  ],
  reviewWords: [
    { word: "instructions", es: "instrucciones" },
    { word: "verify", es: "verificar" },
    { word: "identity", es: "identidad" },
    { word: "mistake", es: "error" },
    { word: "confirmation", es: "confirmación" },
  ],
  blurb: {
    en: "Dani hands Mía the training. Fifteen agents in Bogotá, Julieta's screen, seven steps in order. Mía gets step three wrong, hears it herself, and fixes it without looking at Dani. Dani's hand moves toward the laptop once. Nico holds his arm. Payoff of week one: what they said, and under it, what they need.",
    es: "Dani le entrega el entrenamiento a Mía. Quince agentes en Bogotá, la pantalla de Julieta, siete pasos en orden. Mía se equivoca en el paso tres, lo oye ella misma y lo corrige sin mirar a Dani. La mano de Dani se mueve hacia la laptop una vez. Nico le sostiene el brazo. Payoff de la semana uno: lo que dijeron, y debajo, lo que necesitan.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Wednesday, 7:00 a.m.; the Northline training room with no screens on the walls; Mía standing in front of a laptop on a tall table, headset off, a single index card in her hand; Dani and Nico seated at the back; on the laptop, Julieta with fifteen blurred agents behind her.",
      text: "Wednesday, 7:00 a.m. Bogotá at seven, not six.",
      es: "Miércoles, 7:00 a.m. Bogotá a las siete, no a las seis.",
      speaker: "dani",
      cast: ["dani", "mia", "nico", "julieta"],
      lines: [
        {
          speaker: "julieta",
          text: "Fifteen agents, day one of the second group. Who's teaching the case process?",
          es: "Quince agentes, día uno del segundo grupo. ¿Quién enseña el proceso de casos?",
        },
        {
          speaker: "dani",
          text: "Mía. I'm in the back with Nico. If I talk, Nico has permission to hold my arm.",
          es: "Mía. Yo estoy atrás con Nico. Si hablo, Nico tiene permiso de sostenerme el brazo.",
        },
        {
          speaker: "mia",
          text: "Okay. Hi, Bogotá. I'll walk you through it one step at a time. There are seven steps. You're going to say them back to me at the end, so count.",
          es: "Ok. Hola, Bogotá. Los voy a guiar un paso a la vez. Son siete pasos. Al final me los van a repetir, así que cuenten.",
        },
      ],
      words: [
        { word: "process", es: "proceso" },
        { word: "permission", es: "permiso" },
        { word: "count", es: "contar" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Close on Mía's index card: seven numbered lines in her handwriting; her thumb covering line three; the laptop's camera light on.",
      text: "Step one. Step two.",
      es: "Paso uno. Paso dos.",
      speaker: "mia",
      cast: ["mia"],
      lines: [
        {
          speaker: "mia",
          text: "The first thing you do is verify the customer's identity. Name, account number, one security question. Not two, not zero. One.",
          es: "Lo primero que hacen es verificar la identidad del cliente. Nombre, número de cuenta, una pregunta de seguridad. No dos, no cero. Una.",
        },
        {
          speaker: "mia",
          text: "After that, you open a case in the system. Before you type anything else. If the call drops, the case exists.",
          es: "Después de eso, abren un caso en el sistema. Antes de escribir cualquier otra cosa. Si la llamada se cae, el caso existe.",
        },
      ],
      words: [
        { word: "verify", es: "verificar" },
        { word: "identity", es: "identidad" },
        { word: "security", es: "seguridad" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Mía mid-sentence, one hand up; at the back of the room Dani leaning forward in his chair, one hand lifting off his knee toward the laptop; Nico's hand landing on Dani's forearm without Nico looking.",
      text: "Step three. She gets it wrong.",
      es: "Paso tres. Se equivoca.",
      speaker: "mia",
      cast: ["mia", "dani", "nico"],
      lines: [
        {
          speaker: "mia",
          text: "After that, you send the confirmation email and— no. No. That's the last step, not the third. Sorry, Bogotá. Delete that. Step three is: make sure you write what the customer actually said.",
          es: "Después de eso, mandan el correo de confirmación y... no. No. Ese es el último paso, no el tercero. Perdón, Bogotá. Borren eso. El paso tres es: asegúrense de escribir lo que el cliente realmente dijo.",
        },
        {
          speaker: "nico",
          text: "Sit.",
          es: "Sentate.",
        },
        {
          speaker: "dani",
          text: "I'm sitting.",
          es: "Estoy sentado.",
        },
        {
          speaker: "nico",
          text: "Your hand isn't.",
          es: "Tu mano no.",
        },
      ],
      words: [
        { word: "confirmation", es: "confirmación" },
        { word: "delete", es: "borrar" },
        { word: "actually", es: "realmente" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Mía drawing two lines on the whiteboard with a marker: the top one labeled SAID, the bottom one labeled NEED; the laptop turned to show it to Bogotá.",
      text: "Then she adds the line nobody taught her.",
      es: "Luego agrega la línea que nadie le enseñó.",
      speaker: "mia",
      cast: ["mia"],
      lines: [
        {
          speaker: "mia",
          text: "Write what the customer actually said. Their words, not yours. Then, under it, one more line: what they need. Someone taught me that in my first week, and he was right, and it took me a month to admit it.",
          es: "Escriban lo que el cliente realmente dijo. Sus palabras, no las de ustedes. Luego, debajo, una línea más: lo que necesita. Alguien me enseñó eso en mi primera semana, y tenía razón, y me tomó un mes admitirlo.",
        },
        {
          speaker: "mia",
          text: "The most common mistake is closing the case too early. If you're not sure, ask before you escalate. Finally, you send the confirmation email. That's seven.",
          es: "El error más común es cerrar el caso demasiado pronto. Si no están seguros, pregunten antes de escalar. Finalmente, mandan el correo de confirmación. Son siete.",
        },
      ],
      words: [
        { word: "admit", es: "admitir" },
        { word: "common", es: "común" },
        { word: "escalate", es: "escalar" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "The laptop screen: Julieta with her arms crossed and a very small smile, one agent in the blurred background with a hand raised.",
      text: "Then the check.",
      es: "Luego la comprobación.",
      speaker: "mia",
      cast: ["mia", "julieta"],
      lines: [
        {
          speaker: "mia",
          text: "Does that make sense so far? Tell me the steps back to me. Someone. Anyone. The one with the hand up.",
          es: "¿Tiene sentido hasta aquí? Repítanme los pasos. Alguien. Quien sea. El de la mano levantada.",
        },
        {
          speaker: "julieta",
          text: "He says: verify identity, open the case, write what they said and what they need, don't close early, ask before you escalate, send the email. He counted six.",
          es: "Dice: verificar identidad, abrir el caso, escribir lo que dijeron y lo que necesitan, no cerrar temprano, preguntar antes de escalar, mandar el correo. Contó seis.",
        },
        {
          speaker: "mia",
          text: "He merged three and four. That's fine. That's the two lines. Tell him he passed and I want him on my floor.",
          es: "Juntó el tres y el cuatro. Está bien. Son las dos líneas. Dile que pasó y que lo quiero en mi piso.",
        },
      ],
      words: [
        { word: "sense", es: "sentido" },
        { word: "merged", es: "juntó" },
        { word: "passed", es: "pasó" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "The training room after the call; Mía sitting on the tall table with the index card, Dani and Nico standing; Nico's hand finally off Dani's arm.",
      text: "7:40 a.m. Off the call.",
      es: "7:40 a.m. Fuera de la llamada.",
      speaker: "dani",
      cast: ["dani", "mia", "nico"],
      lines: [
        {
          speaker: "dani",
          text: "You got step three wrong.",
          es: "Te equivocaste en el paso tres.",
        },
        {
          speaker: "mia",
          text: "I heard it. I fixed it. You didn't have to.",
          es: "Lo oí. Lo arreglé. No tuviste que hacerlo tú.",
        },
        {
          speaker: "dani",
          text: "That's the part I'm going to write in your file. Not the mistake. The three seconds after.",
          es: "Esa es la parte que voy a escribir en tu expediente. No el error. Los tres segundos después.",
        },
        {
          speaker: "nico",
          text: "Write that his hand moved. For the file.",
          es: "Escribe que su mano se movió. Para el expediente.",
        },
        {
          speaker: "mia",
          text: "It's in paragraph two.",
          es: "Está en el párrafo dos.",
        },
      ],
      words: [
        { word: "file", es: "expediente" },
        { word: "seconds", es: "segundos" },
        { word: "moved", es: "se movió" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "The floor, 4:00 p.m.; Dani and Óscar at Óscar's desk with a call timer paused at 7:58 on the screen; Óscar's headset around his neck, a stopwatch app open on his phone beside the keyboard.",
      text: "4:00 p.m. Óscar's Wednesday.",
      es: "4:00 p.m. El miércoles de Óscar.",
      speaker: "oscar",
      cast: ["oscar", "dani"],
      lines: [
        {
          speaker: "oscar",
          text: "Seven fifty-eight. Two minutes over. Again.",
          es: "Siete cincuenta y ocho. Dos minutos de más. Otra vez.",
        },
        {
          speaker: "dani",
          text: "Where do the two minutes go?",
          es: "¿Adónde se van los dos minutos?",
        },
        {
          speaker: "oscar",
          text: "I explain the reason twice. Once before they ask and once after.",
          es: "Explico la razón dos veces. Una antes de que pregunten y una después.",
        },
        {
          speaker: "dani",
          text: "Then the first thing you do tomorrow is say it once and wait. If they ask again, they didn't hear it. If they don't, you're done two minutes early. Does that make sense?",
          es: "Entonces lo primero que haces mañana es decirla una vez y esperar. Si vuelven a preguntar, no la oyeron. Si no, terminas dos minutos antes. ¿Tiene sentido?",
        },
        {
          speaker: "oscar",
          text: "It makes sense. Friday it has to make sense out loud.",
          es: "Tiene sentido. El viernes tiene que tener sentido en voz alta.",
        },
      ],
      words: [
        { word: "over", es: "de más" },
        { word: "twice", es: "dos veces" },
        { word: "early", es: "antes" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Ms. Barrett at the end of the row with a visitor badge in her hand, blank, the name line empty; Dani reading it.",
      text: "5:30 p.m. Barrett has a visitor badge with no name on it yet.",
      es: "5:30 p.m. Barrett tiene un gafete de visita todavía sin nombre.",
      speaker: "barrett",
      cast: ["barrett", "dani"],
      lines: [
        {
          speaker: "barrett",
          text: "Tomorrow, nine a.m. Crown's auditor arrives to listen to calls before Friday. She asked for one recording in advance. She asked for yours. Day one.",
          es: "Mañana, nueve a.m. La auditora de Crown llega a escuchar llamadas antes del viernes. Pidió una grabación por adelantado. Pidió la suya. El día uno.",
        },
        {
          speaker: "dani",
          text: "The one where the customer hung up on me.",
          es: "En la que la clienta me colgó.",
        },
        {
          speaker: "barrett",
          text: "That one. The auditor's name is Lidia. I believe you've met.",
          es: "Esa. La auditora se llama Lidia. Creo que se conocen.",
        },
      ],
      words: [
        { word: "auditor", es: "auditora" },
        { word: "recording", es: "grabación" },
        { word: "advance", es: "adelantado" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Night; the bus stop; Mía and Nico on the bench, Mía with her index card, reading it to herself; Nico with his eyes closed, hood up.",
      text: "9:30 p.m. She's still reading the card.",
      es: "9:30 p.m. Sigue leyendo la tarjeta.",
      speaker: "nico",
      cast: ["nico", "mia"],
      lines: [
        {
          speaker: "nico",
          text: "You already taught it.",
          es: "Ya lo enseñaste.",
        },
        {
          speaker: "mia",
          text: "Tomorrow Lidia listens to us. Thursday at ten is the last prep. And Friday is the whole thing.",
          es: "Mañana Lidia nos escucha. El jueves a las diez es la última preparación. Y el viernes es todo.",
        },
        {
          speaker: "nico",
          text: "You got step three wrong and fifteen people learned it anyway. Friday's fine.",
          es: "Te equivocaste en el paso tres y quince personas lo aprendieron igual. El viernes está bien.",
        },
        {
          speaker: "mia",
          text: "That's four sentences, Nico.",
          es: "Son cuatro frases, Nico.",
        },
        {
          speaker: "nico",
          text: "Don't count.",
          es: "No cuentes.",
        },
      ],
      words: [
        { word: "taught", es: "enseñaste" },
        { word: "prep", es: "preparación" },
        { word: "anyway", es: "igual" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What does Mía add under 'what the customer actually said'?",
      questionEs: "¿Qué agrega Mía debajo de 'lo que el cliente realmente dijo'?",
      options: [
        { label: "One more line: what they need", emoji: "📝" },
        { label: "The agent's opinion of the customer", emoji: "💬" },
        { label: "The confirmation email", emoji: "📧" },
      ],
      answer: 0,
      sayIt: "One more line: what they need.",
      sayItEs: "Una línea más: lo que necesita.",
      sayItCheck: {
        target: "* what they need",
        altTargets: ["One more line *", "What the customer needs", "Their need *"],
      },
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "A new teammate needs a process. Give the first two steps in order, one warning, and check that they understood.",
      questionEs: "Un compañero nuevo necesita un proceso. Da los dos primeros pasos en orden, una advertencia, y comprueba que entendió.",
      options: [
        { label: "I am ready to answer", emoji: "🎧" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "The first thing you do is verify the customer's identity. After that, you open a case in the system. The most common mistake is closing the case too early. Does that make sense so far?",
      sayItEs: "Lo primero que haces es verificar la identidad del cliente. Después de eso, abres un caso en el sistema. El error más común es cerrar el caso demasiado pronto. ¿Tiene sentido hasta aquí?",
      sayItAskEn: "Start with \"The first thing you do is ...\", then \"After that, ...\", add \"The most common mistake is ...\", and close with \"Does that make sense so far?\".",
      sayItAskEs: "Empieza con \"The first thing you do is …\", luego \"After that, …\", agrega \"The most common mistake is …\" y cierra con \"Does that make sense so far?\".",
      sayItCheck: {
        target: "The first thing you do is *",
        altTargets: ["After that, *", "Does that make sense *", "First, *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s6",
    phrase: "When someone I trained gets a step wrong, the three seconds after are theirs, not mine.",
    es: "Cuando alguien que entrené se equivoca en un paso, los tres segundos después son de esa persona, no míos.",
  },
  habitCard: {
    afterScene: "s5",
    phrase: "After I explain a process, I make them say the steps back to me before we move on.",
    es: "Después de explicar un proceso, hago que me repitan los pasos antes de seguir.",
    model: "mia",
    modelActionEs: "Mía terminó los siete pasos y pidió que se los repitieran; el agente contó seis porque juntó dos, y ella supo que había entendido.",
  },
  expressions: [
    {
      phrase: "walk through",
      variants: ["walk you through", "walked through", "walking through"],
      es: "guiar paso a paso, explicar en orden",
      kind: "phrasal",
      example: "Okay. Hi, Bogotá. I'll walk you through it one step at a time.",
      exampleEs: "Ok. Hola, Bogotá. Los voy a guiar un paso a la vez.",
    },
    {
      phrase: "say back",
      variants: ["say them back", "tell me the steps back", "said it back"],
      es: "repetir (lo que te dijeron) para confirmar",
      kind: "phrasal",
      example: "There are seven steps. You're going to say them back to me at the end, so count.",
      exampleEs: "Son siete pasos. Al final me los van a repetir, así que cuenten.",
    },
    {
      phrase: "make sense",
      variants: ["makes sense", "does that make sense", "made sense"],
      es: "tener sentido",
      kind: "idiom",
      example: "It makes sense. Friday it has to make sense out loud.",
      exampleEs: "Tiene sentido. El viernes tiene que tener sentido en voz alta.",
    },
    {
      phrase: "in your file",
      variants: ["in his file", "in her file", "on file"],
      es: "en tu expediente",
      kind: "idiom",
      example: "That's the part I'm going to write in your file. Not the mistake. The three seconds after.",
      exampleEs: "Esa es la parte que voy a escribir en tu expediente. No el error. Los tres segundos después.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: teach someone a process you know. Steps in order, the most common mistake, and make them say the steps back to you.",
    es: "Treinta segundos: enséñale a alguien un proceso que conoces. Pasos en orden, el error más común, y haz que te repita los pasos.",
  },
  continueWith: [
    "I'll walk you through it one step at a time.",
    "The first thing you do is ... After that, ...",
    "The most common mistake is ...",
    "Does that make sense so far? Tell me the steps back to me.",
  ],
  cliffhanger: {
    en: "Tomorrow at nine, Lidia sits down with Dani's worst call and presses play. It's the one from day one. She wants to hear him talk about it before she hears him talk.",
    es: "Mañana a las nueve, Lidia se sienta con la peor llamada de Dani y le da play. Es la del día uno. Quiere oírlo hablar de ella antes de oírlo hablar.",
  },
};
