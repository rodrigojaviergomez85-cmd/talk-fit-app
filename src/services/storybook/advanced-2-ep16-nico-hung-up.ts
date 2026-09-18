import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced2-ep16-nico-hung-up/cover.jpg";
import s1 from "@/assets/storybook/advanced2-ep16-nico-hung-up/s1.jpg";
import s2 from "@/assets/storybook/advanced2-ep16-nico-hung-up/s2.jpg";
import s3 from "@/assets/storybook/advanced2-ep16-nico-hung-up/s3.jpg";
import s4 from "@/assets/storybook/advanced2-ep16-nico-hung-up/s4.jpg";
import s5 from "@/assets/storybook/advanced2-ep16-nico-hung-up/s5.jpg";
import s6 from "@/assets/storybook/advanced2-ep16-nico-hung-up/s6.jpg";
import s7 from "@/assets/storybook/advanced2-ep16-nico-hung-up/s7.jpg";
import s8 from "@/assets/storybook/advanced2-ep16-nico-hung-up/s8.jpg";
import s9 from "@/assets/storybook/advanced2-ep16-nico-hung-up/s9.jpg";

export const ADVANCED2_EP16_NICO_HUNG_UP: StorybookEpisode = {
  id: "advanced2-ep16-nico-hung-up",
  moduleId: "advanced-2",
  week: 4,
  title: "Nico hung up",
  titleEs: "Nico colgó",
  episodeLabel: {
    en: "Advanced 2 · Episode 16",
    es: "Advanced 2 · Episodio 16",
  },
  previously: [
    {
      en: "Dani told Vale 'not this Thursday' and moved the committee to Friday at 9:15.",
      es: "Dani le dijo a Vale 'este jueves no' y movió el comité al viernes a las 9:15.",
    },
    {
      en: "Friday at 9:15 is also day ninety. The audit.",
      es: "El viernes a las 9:15 también es el día noventa. La auditoría.",
    },
    {
      en: "Barrett wants Miami reported in order, with facts.",
      es: "Barrett quiere Miami reportado en orden, con hechos.",
    },
  ],
  reviewWords: [
    { word: "report", es: "reporte" },
    { word: "incident", es: "incidente" },
    { word: "warning", es: "advertencia" },
    { word: "recording", es: "grabación" },
    { word: "opinion", es: "opinión" },
  ],
  blurb: {
    en: "Monday of the last week. At 10:44 Nico hangs up on a customer, and Northline wants a report by two. Dani tells it in order, with times and facts, without adjectives and without throwing Nico under the bus. Barrett notices what he left out. Mía notices something else, through the glass.",
    es: "Lunes de la última semana. A las 10:44 Nico le cuelga a un cliente, y Northline quiere un reporte para las dos. Dani lo cuenta en orden, con horas y hechos, sin adjetivos y sin tirar a Nico debajo del bus. Barrett nota lo que dejó fuera. Mía nota otra cosa, a través del vidrio.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Monday, 8:00 a.m.; Ms. Barrett's office; Barrett behind her desk with a blank page in front of her, Dani standing, the wall clock showing eight; the floor visible through the glass wall behind him.",
      text: "Monday, 8:00 a.m. Barrett's office. Miami first.",
      es: "Lunes, 8:00 a.m. La oficina de Barrett. Miami primero.",
      speaker: "barrett",
      cast: ["barrett", "dani"],
      lines: [
        {
          speaker: "barrett",
          text: "Thursday, the lobby. For the committee. In order, with facts, under a minute.",
          es: "El jueves, el lobby. Para el comité. En orden, con hechos, en menos de un minuto.",
        },
        {
          speaker: "dani",
          text: "Thursday at three a guest came to the front desk for the third time about construction noise. What happened was the room next to hers was being demolished and nobody had moved her. I listened for forty seconds, then moved both rooms to the fifth floor and added breakfast. In the end, she took her four o'clock call from a quiet room.",
          es: "El jueves a las tres una huésped llegó al mostrador por tercera vez por ruido de construcción. Lo que pasó fue que el cuarto de al lado estaba en demolición y nadie la había movido. Escuché cuarenta segundos, luego moví los dos cuartos al quinto piso y agregué desayuno. Al final, tomó su llamada de las cuatro desde un cuarto tranquilo.",
        },
        {
          speaker: "barrett",
          text: "And the key.",
          es: "Y la llave.",
        },
        {
          speaker: "dani",
          text: "I promised the key by 3:20 and it was ready at 3:34, so I carried it up myself. Next time I'll check who controls the thing before I put a time on it.",
          es: "Prometí la llave para las 3:20 y estuvo lista a las 3:34, así que la subí yo mismo. La próxima vez reviso quién controla la cosa antes de ponerle una hora.",
        },
      ],
      words: [
        { word: "construction", es: "construcción" },
        { word: "noise", es: "ruido" },
        { word: "controls", es: "controla" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "10:44 a.m. on the floor; Nico at his desk with his headset on and his hand already on the button to end the call, face completely still; Mía at the next desk turning her head; the wall screen reads BILLING, DOUBLE CHARGES.",
      text: "10:44 a.m. The second report starts by itself.",
      es: "10:44 a.m. El segundo reporte empieza solo.",
      speaker: "nico",
      lines: [
        {
          speaker: "caller",
          text: "You people charged me twice and now I get the kid who can't even talk? Put someone with a brain on the line.",
          es: "Ustedes me cobraron dos veces y ahora me toca el niño que ni siquiera sabe hablar. Pónganme a alguien con cerebro en la línea.",
        },
        {
          speaker: "nico",
          text: "I can fix the double charge. If the language continues, I'll have to end the call.",
          es: "Puedo arreglar el cobro doble. Si el lenguaje continúa, voy a tener que terminar la llamada.",
        },
        {
          speaker: "caller",
          text: "Oh, you'll have to? Listen, you little—",
          es: "Ah, ¿vas a tener que? Escúchame, pedazo de...",
        },
        {
          speaker: "nico",
          text: "Second warning. The call ends now. Somebody will call you back.",
          es: "Segunda advertencia. La llamada termina ahora. Alguien le va a devolver la llamada.",
        },
      ],
      words: [
        { word: "charged", es: "cobraron" },
        { word: "brain", es: "cerebro" },
        { word: "warning", es: "advertencia" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Dani standing behind Nico's chair with his own headset on, dialing; Nico sitting very straight, hands flat on the desk; Mía half out of her chair.",
      text: "10:50 a.m. Dani calls the customer back.",
      es: "10:50 a.m. Dani devuelve la llamada.",
      speaker: "dani",
      lines: [
        {
          speaker: "dani",
          text: "This is Dani from Northline, calling about the double charge. I checked the account and confirmed both transactions. The second one is being refunded today.",
          es: "Habla Dani de Northline, por el cobro doble. Revisé la cuenta y confirmé las dos transacciones. La segunda se reembolsa hoy.",
        },
        {
          speaker: "caller",
          text: "...Fine. Is the kid in trouble?",
          es: "...Está bien. ¿El muchacho está en problemas?",
        },
        {
          speaker: "dani",
          text: "No. He warned you twice and then he did what the policy says. The refund is the part that matters to you. You'll see it by Wednesday.",
          es: "No. Le advirtió dos veces y después hizo lo que dice la política. El reembolso es la parte que le importa a usted. Lo va a ver el miércoles.",
        },
      ],
      words: [
        { word: "transactions", es: "transacciones" },
        { word: "refunded", es: "reembolsado" },
        { word: "trouble", es: "problemas" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Camila at the end of the row with her tablet showing an email from Northline with the subject INCIDENT REPORT, 2 PM; Dani reading it over her shoulder; Nico in the background not looking.",
      text: "11:30 a.m. Northline wants it in writing.",
      es: "11:30 a.m. Northline lo quiere por escrito.",
      speaker: "camila",
      cast: ["camila", "dani"],
      lines: [
        {
          speaker: "camila",
          text: "An agent hung up on a customer. Barrett has to send a report upstairs by two. She wants you to tell it, and she wants a second witness.",
          es: "Un agente le colgó a un cliente. Barrett tiene que mandar un reporte arriba a las dos. Quiere que tú lo cuentes, y quiere un segundo testigo.",
        },
        {
          speaker: "dani",
          text: "Mía was next to him.",
          es: "Mía estaba al lado.",
        },
        {
          speaker: "camila",
          text: "Then Mía goes second. And Dani: facts. Not what you feel about the customer. Not what you feel about Nico.",
          es: "Entonces Mía va segunda. Y Dani: hechos. No lo que sientes por el cliente. No lo que sientes por Nico.",
        },
        {
          speaker: "dani",
          text: "I know how to tell it. I learned on a package on Monday.",
          es: "Sé cómo contarlo. Lo aprendí con un paquete el lunes pasado.",
        },
      ],
      words: [
        { word: "witness", es: "testigo" },
        { word: "upstairs", es: "arriba" },
        { word: "facts", es: "hechos" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Barrett's office, 1:15 p.m.; Barrett typing on a laptop while Dani speaks, standing; through the glass wall behind Dani, Mía waiting outside on a chair with her phone in her lap.",
      text: "1:15 p.m. In order. With times.",
      es: "1:15 p.m. En orden. Con horas.",
      speaker: "dani",
      cast: ["dani", "barrett"],
      lines: [
        {
          speaker: "dani",
          text: "At 10:41 a customer called about a double charge. What happened was the system processed the payment twice. At 10:43 the customer used language about Nico that I'm not going to repeat; it's in the recording. Nico said that if the language continued, he would have to end the call. The customer continued. Nico gave a second warning and ended the call at 10:44.",
          es: "A las 10:41 un cliente llamó por un cobro doble. Lo que pasó fue que el sistema procesó el pago dos veces. A las 10:43 el cliente usó un lenguaje sobre Nico que no voy a repetir; está en la grabación. Nico dijo que si el lenguaje continuaba, tendría que terminar la llamada. El cliente continuó. Nico dio una segunda advertencia y terminó la llamada a las 10:44.",
        },
        {
          speaker: "barrett",
          text: "Then.",
          es: "Luego.",
        },
        {
          speaker: "dani",
          text: "So I decided to call the customer back myself at 10:50. I confirmed both transactions and refunded the second one. In the end, the customer asked whether Nico was in trouble, and I said no. Next time I'll take the call with the agent before he has to warn twice.",
          es: "Entonces decidí devolverle la llamada yo mismo a las 10:50. Confirmé las dos transacciones y reembolsé la segunda. Al final, el cliente preguntó si Nico estaba en problemas, y dije que no. La próxima vez tomo la llamada con el agente antes de que tenga que advertir dos veces.",
        },
      ],
      words: [
        { word: "processed", es: "procesó" },
        { word: "repeat", es: "repetir" },
        { word: "whether", es: "si" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Close on Barrett, fingers stopped over the keyboard, looking at Dani over her rimless glasses; Dani with his hands behind his back.",
      text: "She stops typing.",
      es: "Deja de escribir.",
      speaker: "barrett",
      cast: ["barrett", "dani"],
      lines: [
        {
          speaker: "barrett",
          text: "You left out what you think.",
          es: "Dejó fuera lo que piensa.",
        },
        {
          speaker: "dani",
          text: "You asked what happened.",
          es: "Usted preguntó qué pasó.",
        },
        {
          speaker: "barrett",
          text: "Now I'm asking what you think.",
          es: "Ahora le pregunto qué piensa.",
        },
        {
          speaker: "dani",
          text: "I think he did exactly what I would have done, one warning later than I'd have liked. And I think Northline should say so in writing, because he's going to read this report, and he doesn't smile.",
          es: "Pienso que hizo exactamente lo que yo habría hecho, una advertencia más tarde de lo que me habría gustado. Y pienso que Northline debería decirlo por escrito, porque él va a leer este reporte, y él no sonríe.",
        },
        {
          speaker: "barrett",
          text: "Two paragraphs. Facts first. Opinion second, marked as opinion. That's how it goes upstairs.",
          es: "Dos párrafos. Hechos primero. Opinión segundo, marcada como opinión. Así es como sube.",
        },
      ],
      words: [
        { word: "exactly", es: "exactamente" },
        { word: "writing", es: "escrito" },
        { word: "opinion", es: "opinión" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "The same office from outside the glass: Mía in the waiting chair with her phone raised just above her knee, screen toward the glass, recording; Dani inside with his back to her, Barrett facing the glass but looking at her laptop.",
      text: "Through the glass, Mía's phone is up. Nobody sees it.",
      es: "A través del vidrio, el celular de Mía está arriba. Nadie lo ve.",
      speaker: "mia",
      cast: ["mia"],
      lines: [
        {
          speaker: "mia",
          text: "Okay, jefe. That one I'm keeping.",
          es: "Ok, jefe. Ese me lo quedo.",
        },
      ],
      words: [
        { word: "glass", es: "vidrio" },
        { word: "keeping", es: "quedarse con" },
        { word: "nobody", es: "nadie" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Break room, 4:00 p.m.; Nico with a printed page in his hands, hood down, reading; Dani and Óscar at the table pretending to eat; Mía on the counter.",
      text: "4:00 p.m. The report comes back down, signed.",
      es: "4:00 p.m. El reporte baja, firmado.",
      speaker: "nico",
      cast: ["nico", "dani", "oscar", "mia"],
      lines: [
        {
          speaker: "nico",
          text: "'Paragraph two, opinion: the agent acted correctly.' Signed Barrett.",
          es: "'Párrafo dos, opinión: el agente actuó correctamente'. Firmado Barrett.",
        },
        {
          speaker: "oscar",
          text: "Paragraph one is just times. 10:41, 10:43, 10:44, 10:50.",
          es: "El párrafo uno son solo horas. 10:41, 10:43, 10:44, 10:50.",
        },
        {
          speaker: "dani",
          text: "Paragraph one is what happened. Paragraph two is what we think about it. If you mix them, upstairs stops believing paragraph one.",
          es: "El párrafo uno es lo que pasó. El párrafo dos es lo que pensamos. Si los mezclas, arriba deja de creer el párrafo uno.",
        },
        {
          speaker: "nico",
          text: "He said 'kid who can't talk'. It's in the recording.",
          es: "Dijo 'niño que no sabe hablar'. Está en la grabación.",
        },
        {
          speaker: "mia",
          text: "Paragraph two says otherwise. In writing.",
          es: "El párrafo dos dice lo contrario. Por escrito.",
        },
      ],
      words: [
        { word: "signed", es: "firmado" },
        { word: "paragraph", es: "párrafo" },
        { word: "otherwise", es: "lo contrario" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Night; Vale's small car outside the academy, engine off; Vale at the wheel with a folder on the dashboard labeled ONE-TO-ONE; Dani in the passenger seat looking at it.",
      text: "8:45 p.m. Vale has a folder.",
      es: "8:45 p.m. Vale tiene una carpeta.",
      speaker: "vale",
      cast: ["vale", "dani"],
      lines: [
        {
          speaker: "vale",
          text: "Tomorrow at nine you and I sit down. Results, one real challenge, next goal. Then you do the same with Mía and Nico.",
          es: "Mañana a las nueve tú y yo nos sentamos. Resultados, un reto real, siguiente meta. Después haces lo mismo con Mía y Nico.",
        },
        {
          speaker: "dani",
          text: "I know my results.",
          es: "Sé mis resultados.",
        },
        {
          speaker: "vale",
          text: "I know your results too. I want the challenge. The real one. Not the one that sounds good in a folder.",
          es: "Yo también sé tus resultados. Quiero el reto. El real. No el que suena bien en una carpeta.",
        },
      ],
      words: [
        { word: "folder", es: "carpeta" },
        { word: "challenge", es: "reto" },
        { word: "results", es: "resultados" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s6",
      questionEn: "How does Barrett want the report written for upstairs?",
      questionEs: "¿Cómo quiere Barrett que se escriba el reporte para arriba?",
      options: [
        { label: "Two paragraphs: facts first, then opinion marked as opinion", emoji: "📄" },
        { label: "Only facts, no opinion at all", emoji: "🔢" },
        { label: "Dani's opinion first, then the times", emoji: "💬" },
      ],
      answer: 0,
      sayIt: "Two paragraphs: facts first, then opinion marked as opinion.",
      sayItEs: "Dos párrafos: hechos primero, luego la opinión marcada como opinión.",
      sayItCheck: {
        target: "* facts first *",
        altTargets: ["Two paragraphs *", "Facts first, then opinion *", "* opinion second *"],
      },
    },
    {
      id: "q2",
      afterScene: "s5",
      questionEn: "Your supervisor asks what happened yesterday with a difficult customer. Tell it in order: what happened, what you decided, how it ended.",
      questionEs: "Tu supervisor pregunta qué pasó ayer con un cliente difícil. Cuéntalo en orden: qué pasó, qué decidiste, cómo terminó.",
      options: [
        { label: "I am ready to answer", emoji: "🎧" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "Yesterday afternoon a customer called about a double charge. What happened was the system processed the payment twice. So I decided to escalate it to the billing team. In the end, we refunded the customer the same day.",
      sayItEs: "Ayer por la tarde un cliente llamó por un cobro doble. Lo que pasó fue que el sistema procesó el pago dos veces. Entonces decidí escalarlo al equipo de facturación. Al final, reembolsamos al cliente el mismo día.",
      sayItAskEn: "Start with when it happened, then \"What happened was ...\", then \"So I decided to ...\", and close with \"In the end, ...\".",
      sayItAskEs: "Empieza con cuándo pasó, luego \"What happened was …\", después \"So I decided to …\" y cierra con \"In the end, …\".",
      sayItCheck: {
        target: "What happened was *",
        altTargets: ["So I decided to *", "In the end, *", "Yesterday * a customer called *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s6",
    phrase: "Facts in one paragraph. What I think in another. Never mixed.",
    es: "Los hechos en un párrafo. Lo que pienso en otro. Nunca mezclados.",
  },
  habitCard: {
    afterScene: "s8",
    phrase: "When I report an incident, I say the times before I say a single adjective.",
    es: "Cuando reporto un incidente, digo las horas antes de decir un solo adjetivo.",
    model: "dani",
    modelActionEs: "Dani contó la llamada de Nico con cuatro horas exactas y sin adjetivos, y guardó lo que pensaba para cuando Barrett lo pidió.",
  },
  expressions: [
    {
      phrase: "hang up",
      variants: ["hung up", "hangs up", "hanging up"],
      es: "colgar (una llamada)",
      kind: "phrasal",
      example: "An agent hung up on a customer. Barrett has to send a report upstairs by two.",
      exampleEs: "Un agente le colgó a un cliente. Barrett tiene que mandar un reporte arriba a las dos.",
    },
    {
      phrase: "call back",
      variants: ["call you back", "called back", "calling back", "call the customer back"],
      es: "devolver la llamada",
      kind: "phrasal",
      example: "So I decided to call the customer back myself at 10:50.",
      exampleEs: "Entonces decidí devolverle la llamada yo mismo a las 10:50.",
    },
    {
      phrase: "in the end",
      variants: ["at the end of the day"],
      es: "al final, finalmente",
      kind: "idiom",
      example: "In the end, the customer asked whether Nico was in trouble, and I said no.",
      exampleEs: "Al final, el cliente preguntó si Nico estaba en problemas, y dije que no.",
    },
    {
      phrase: "in trouble",
      variants: ["get in trouble", "be in trouble"],
      es: "en problemas",
      kind: "idiom",
      example: "...Fine. Is the kid in trouble?",
      exampleEs: "...Está bien. ¿El muchacho está en problemas?",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: report something that went wrong yesterday. Times, what happened, what you decided, how it ended. Save what you think for the last sentence.",
    es: "Treinta segundos: reporta algo que salió mal ayer. Horas, qué pasó, qué decidiste, cómo terminó. Guarda lo que piensas para la última frase.",
  },
  continueWith: [
    "Yesterday afternoon a customer called about ...",
    "What happened was ...",
    "So I decided to ...",
    "In the end, ... Next time I'll ...",
  ],
  cliffhanger: {
    en: "Tomorrow at nine: Vale wants the real challenge, not the one that sounds good in a folder. Dani has one. He hasn't said it out loud.",
    es: "Mañana a las nueve: Vale quiere el reto real, no el que suena bien en una carpeta. Dani tiene uno. No lo ha dicho en voz alta.",
  },
};
