import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced3-ep20-headset-on-again/cover.jpg";
import s1 from "@/assets/storybook/advanced3-ep20-headset-on-again/s1.jpg";
import s2 from "@/assets/storybook/advanced3-ep20-headset-on-again/s2.jpg";
import s3 from "@/assets/storybook/advanced3-ep20-headset-on-again/s3.jpg";
import s4 from "@/assets/storybook/advanced3-ep20-headset-on-again/s4.jpg";
import s5 from "@/assets/storybook/advanced3-ep20-headset-on-again/s5.jpg";
import s6 from "@/assets/storybook/advanced3-ep20-headset-on-again/s6.jpg";
import s7 from "@/assets/storybook/advanced3-ep20-headset-on-again/s7.jpg";
import s8 from "@/assets/storybook/advanced3-ep20-headset-on-again/s8.jpg";
import s9 from "@/assets/storybook/advanced3-ep20-headset-on-again/s9.jpg";

export const ADVANCED3_EP20_HEADSET_ON_AGAIN: StorybookEpisode = {
  id: "advanced3-ep20-headset-on-again",
  moduleId: "advanced-3",
  week: 4,
  title: "Headset on, again",
  titleEs: "La diadema, otra vez",
  episodeLabel: {
    en: "Advanced 3 · Episode 20",
    es: "Advanced 3 · Episodio 20",
  },
  previously: [
    {
      en: "Lidia, in person. 'I should have asked you to stay.' 'I wouldn't have stayed.' 'I know.' They're fine.",
      es: "Lidia, en persona. 'Debí pedirte que te quedaras'. 'No me habría quedado'. 'Ya sé'. Están bien.",
    },
    {
      en: "The key stays with Vale, for the girl in the chair, when she's ready to teach.",
      es: "La llave se queda con Vale, para la muchacha de la silla, cuando esté lista para enseñar.",
    },
    {
      en: "Friday, nine a.m. The last room. One word. Julieta lands at six.",
      es: "Viernes, nueve a.m. La última sala. Una palabra. Julieta aterriza a las seis.",
    },
  ],
  reviewWords: [
    { word: "conditions", es: "condiciones" },
    { word: "headset", es: "diadema" },
    { word: "shift", es: "turno" },
    { word: "yes", es: "sí" },
    { word: "sentence", es: "frase" },
  ],
  blurb: {
    en: "Friday. Julieta walks onto the floor in person: 'So this is you.' 'This is me.' At nine, the small room, everyone in the circle, one word from Barrett: Miami? Dani says yes, with two conditions, and then does the thing he did on day one of the pilot: he sits at the desk in the middle and puts the headset on. That evening, in the small room, a girl who knocked on Monday says her first full sentence in English, and Vale hears it from the door.",
    es: "Viernes. Julieta entra al piso en persona: 'Así que este sos vos'. 'Este soy yo'. A las nueve, el salón pequeño, todos en el círculo, una palabra de Barrett: ¿Miami? Dani dice que sí, con dos condiciones, y luego hace lo que hizo el día uno del piloto: se sienta en el escritorio del medio y se pone la diadema. Esa tarde, en el salón pequeño, una muchacha que tocó la puerta el lunes dice su primera frase completa en inglés, y Vale la oye desde la puerta.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Friday, 8:40 a.m.; the Northline floor; Julieta walking down the row in person for the first time, white shirt, Northline lanyard, a small suitcase; Reed a few steps behind her; Dani standing up from his desk; Mía and Nico turning in their chairs.",
      text: "Friday, 8:40 a.m. She's never been on this floor. She's run half of it from a screen.",
      es: "Viernes, 8:40 a.m. Nunca ha estado en este piso. Ha dirigido la mitad desde una pantalla.",
      speaker: "julieta",
      cast: ["julieta", "reed", "dani", "mia", "nico"],
      lines: [
        {
          speaker: "julieta",
          text: "So this is you.",
          es: "Así que este sos vos.",
        },
        {
          speaker: "dani",
          text: "This is me. Before you say anything else: you built half of Bogotá with a phone in the dark and nobody's told you. I'm telling you. Now you can say don't make it a thing.",
          es: "Este soy yo. Antes de que digás nada más: construiste media Bogotá con un teléfono a oscuras y nadie te lo ha dicho. Te lo digo yo. Ahora podés decir que no lo haga tema.",
        },
        {
          speaker: "julieta",
          text: "Don't make it a thing. Thank you. Where's the room?",
          es: "No lo hagás tema. Gracias. ¿Dónde está la sala?",
        },
        {
          speaker: "nico",
          text: "Not here. Barrett moved it. She wants the chairs.",
          es: "Aquí no. Barrett la movió. Quiere las sillas.",
        },
      ],
      words: [
        { word: "floor", es: "piso" },
        { word: "built", es: "construiste" },
        { word: "chairs", es: "sillas" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "9:00 a.m.; the small room at the academy; the circle of twelve chairs with eight people in it: Barrett, Reed, Vale in her mustard blouse, Camila with her tablet, Mía, Nico, Julieta, and Dani in the chair nearest the door; the whiteboard empty; the brass key on the ledge.",
      text: "9:00 a.m. The last room. The same one as the first time.",
      es: "9:00 a.m. La última sala. La misma que la primera vez.",
      speaker: "barrett",
      cast: ["barrett", "reed", "vale", "camila", "mia", "nico", "julieta", "dani"],
      lines: [
        {
          speaker: "dani",
          text: "Why here?",
          es: "¿Por qué aquí?",
        },
        {
          speaker: "barrett",
          text: "You asked me that three years ago and I answered. This time I'm the one asking, and it's one word. Miami?",
          es: "Me preguntó eso hace tres años y yo respondí. Esta vez la que pregunta soy yo, y es una palabra. ¿Miami?",
        },
        {
          speaker: "dani",
          text: "Yes.",
          es: "Sí.",
        },
        {
          speaker: "reed",
          text: "He said yes. Somebody write down the time.",
          es: "Dijo que sí. Que alguien anote la hora.",
        },
      ],
      words: [
        { word: "answered", es: "respondí" },
        { word: "asking", es: "preguntando" },
        { word: "time", es: "hora" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Close on Dani in the chair, one hand open toward Mía across the circle; Mía sitting up straight, headset around her neck; Barrett's pen not moving yet.",
      text: "Yes, with two conditions. The first one has a name.",
      es: "Sí, con dos condiciones. La primera tiene nombre.",
      speaker: "dani",
      cast: ["dani", "mia", "barrett"],
      lines: [
        {
          speaker: "dani",
          text: "With two conditions. You said maybe two. The first: the floor training in all three countries is led by Mía. The Thursday block, the trainers in Bogotá and Monterrey, the stool. Not reporting to me in Miami. Leading it here.",
          es: "Con dos condiciones. Usted dijo quizá dos. La primera: el entrenamiento del piso en los tres países lo dirige Mía. El bloque del jueves, los entrenadores de Bogotá y Monterrey, el banco. No reportándome a mí en Miami. Dirigiéndolo desde aquí.",
        },
        {
          speaker: "mia",
          text: "I have university at night.",
          es: "Tengo universidad de noche.",
        },
        {
          speaker: "dani",
          text: "Thursdays are at ten in the morning. Both things. You told me that in Barrett's office, with a comma.",
          es: "Los jueves son a las diez de la mañana. Las dos cosas. Vos me dijiste eso en la oficina de Barrett, con una coma.",
        },
        {
          speaker: "barrett",
          text: "Accepted. She's been running it since Thursday anyway. Second.",
          es: "Aceptado. Ella lo viene dirigiendo desde el jueves de todas formas. Segunda.",
        },
      ],
      words: [
        { word: "trainers", es: "entrenadores" },
        { word: "leading", es: "dirigiendo" },
        { word: "accepted", es: "aceptado" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Reed writing in his notebook; Camila typing a single line into her tablet; Nico with his hood down, almost smiling and stopping himself; Vale at the far side of the circle, hands folded.",
      text: "The second condition. Legal can write it. Camila already has.",
      es: "La segunda condición. Legal puede redactarla. Camila ya la escribió.",
      speaker: "dani",
      cast: ["dani", "reed", "camila", "nico", "vale"],
      lines: [
        {
          speaker: "dani",
          text: "The second: one shift a month I take calls. On this floor, at the desk in the middle, on the phones, with a headset. In the contract, not as a favor. A director who hasn't sat on the floor in a year can't fix it. I learned that from Ms. Barrett on day one.",
          es: "La segunda: un turno al mes tomo llamadas. En este piso, en el escritorio del medio, en los teléfonos, con diadema. En el contrato, no como favor. Un director que no se ha sentado en el piso en un año no puede arreglarlo. Eso lo aprendí de Ms. Barrett el día uno.",
        },
        {
          speaker: "reed",
          text: "Legal can write that. Legal has never been asked to write that.",
          es: "Legal puede redactar eso. A legal nunca le han pedido que redacte eso.",
        },
        {
          speaker: "camila",
          text: "One shift a month, zero dollars. I put it under the forty lights.",
          es: "Un turno al mes, cero dólares. Lo puse debajo de las cuarenta luces.",
        },
        {
          speaker: "nico",
          text: "Miami's not a room, jefe.",
          es: "Miami no es un salón, jefe.",
        },
        {
          speaker: "dani",
          text: "Miami is twenty rooms. This is the one I come back to, on the 42.",
          es: "Miami son veinte salones. Este es al que vuelvo, en el 42.",
        },
      ],
      words: [
        { word: "contract", es: "contrato" },
        { word: "favor", es: "favor" },
        { word: "twenty", es: "veinte" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Julieta and Dani across the circle from each other; Julieta with her hands off her knees for the first time, leaning forward the way she leans toward a camera; Vale watching them, not the others.",
      text: "Julieta didn't get a condition. She notices.",
      es: "Julieta no recibió una condición. Se da cuenta.",
      speaker: "julieta",
      cast: ["julieta", "dani", "vale"],
      lines: [
        {
          speaker: "julieta",
          text: "Two conditions and neither one has Bogotá in it.",
          es: "Dos condiciones y ninguna tiene a Bogotá.",
        },
        {
          speaker: "dani",
          text: "Bogotá is yours. It was yours in the dark, with forty lights and a phone. That's not a condition. It's already true; I just want it in the file.",
          es: "Bogotá es tuya. Fue tuya a oscuras, con cuarenta luces y un teléfono. Eso no es una condición. Ya es cierto; solo quiero que esté en el expediente.",
        },
        {
          speaker: "julieta",
          text: "We. It was ours in the dark.",
          es: "Nosotros. Fue nuestra a oscuras.",
        },
        {
          speaker: "vale",
          text: "For the record, I have nothing to add. The key stays here.",
          es: "Para que conste, no tengo nada que agregar. La llave se queda aquí.",
        },
      ],
      words: [
        { word: "neither", es: "ninguna" },
        { word: "ours", es: "nuestra" },
        { word: "stays", es: "se queda" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Northline, 10:30 a.m.; the floor; Barrett standing by the first row the way she stood on the first morning; Dani with his backpack walking to the desk in the middle; Mía and Nico already at theirs.",
      text: "10:30 a.m. Barrett says it the way she said it on day one.",
      es: "10:30 a.m. Barrett lo dice como lo dijo el día uno.",
      speaker: "barrett",
      cast: ["barrett", "dani", "mia", "nico"],
      lines: [
        {
          speaker: "barrett",
          text: "You're not in Miami until January. Until then, one rule: whoever trains, takes calls. Which desk is yours?",
          es: "No está en Miami hasta enero. Hasta entonces, una regla: quien entrena, toma llamadas. ¿Cuál escritorio es el suyo?",
        },
        {
          speaker: "dani",
          text: "The one in the middle. Where everyone can hear me.",
          es: "El del medio. Donde todos pueden oírme.",
        },
        {
          speaker: "mia",
          text: "I'm timing you.",
          es: "Te estoy tomando el tiempo.",
        },
        {
          speaker: "dani",
          text: "Time me.",
          es: "Tomame el tiempo.",
        },
      ],
      words: [
        { word: "rule", es: "regla" },
        { word: "whoever", es: "quien sea que" },
        { word: "middle", es: "medio" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Close on Dani at the desk in the middle with the headset on, one hand flat on the table, the call light green; Mía watching over the divider. The same shot as the first call, ninety-some days and three seasons ago.",
      text: "10:32 a.m. The first call, again. He counts five seconds before the customer speaks. Then he doesn't guess.",
      es: "10:32 a.m. La primera llamada, otra vez. Cuenta cinco segundos antes de que el cliente hable. Luego no adivina.",
      speaker: "dani",
      lines: [
        {
          speaker: "dani",
          text: "Thanks for calling Northline. How can I help you today?",
          es: "Gracias por llamar a Northline. ¿En qué puedo ayudarle hoy?",
        },
        {
          speaker: "caller",
          text: "It's not working. I've been trying since last night.",
          es: "No funciona. He estado intentando desde anoche.",
        },
        {
          speaker: "dani",
          text: "Okay. I'm not going to guess what 'it' is. Tell me the first thing you noticed last night, and I'll stay on the line until it works.",
          es: "Bien. No voy a adivinar qué es 'eso'. Dígame lo primero que notó anoche, y me quedo en la línea hasta que funcione.",
        },
      ],
      words: [
        { word: "guess", es: "adivinar" },
        { word: "noticed", es: "notó" },
        { word: "until", es: "hasta que" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "6:00 p.m.; the small room at the academy; Abril and Óscar in two chairs in the circle, Dani in a third with his backpack on the floor; the whiteboard with two words: WINDOW / AISLE; Vale in the doorway, arms folded, exactly where she stood three years ago.",
      text: "6:00 p.m. Two students, one room. Vale in the doorway, where she still can't come in.",
      es: "6:00 p.m. Dos estudiantes, un salón. Vale en la puerta, donde todavía no puede entrar.",
      speaker: "dani",
      cast: ["dani", "abril", "oscar", "vale"],
      lines: [
        {
          speaker: "dani",
          text: "Abril. You've been here five days and you've said yes, four seconds, and which chair. That's three sentences with one word each. Today you say a whole one. I'm the woman at the airport. Window or aisle?",
          es: "Abril. Llevás cinco días aquí y has dicho sí, cuatro segundos, y cuál silla. Son tres frases de una palabra. Hoy decís una completa. Yo soy la señora del aeropuerto. ¿Ventana o pasillo?",
        },
        {
          speaker: "oscar",
          text: "Five seconds. Wrong is allowed. I froze on this one for a month.",
          es: "Cinco segundos. Equivocarse está permitido. Yo me congelé en esta un mes.",
        },
      ],
      words: [
        { word: "whole", es: "completa" },
        { word: "airport", es: "aeropuerto" },
        { word: "allowed", es: "permitido" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Close on Vale in the doorway, one hand on the frame, listening to the room she isn't in; inside, out of focus, Abril in the chair with her mouth open, mid-sentence, Dani not moving. The last image of the season.",
      text: "She counts. Five seconds. Vale hears it from the door, the way she heard him.",
      es: "Ella cuenta. Cinco segundos. Vale lo oye desde la puerta, como lo oyó a él.",
      speaker: "abril",
      cast: ["abril", "vale", "dani"],
      lines: [
        {
          speaker: "abril",
          text: "...Window, please. I want to see where the bus goes.",
          es: "...Ventana, por favor. Quiero ver a dónde va el bus.",
        },
        {
          speaker: "dani",
          text: "That's a whole sentence. That's two.",
          es: "Esa es una frase completa. Son dos.",
        },
        {
          speaker: "abril",
          text: "It was four seconds.",
          es: "Fueron cuatro segundos.",
        },
      ],
      words: [
        { word: "window", es: "ventana" },
        { word: "please", es: "por favor" },
        { word: "goes", es: "va" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What are Dani's two conditions for saying yes to Miami?",
      questionEs: "¿Cuáles son las dos condiciones de Dani para decirle que sí a Miami?",
      options: [
        { label: "Mía leads the floor training, and he takes calls one shift a month", emoji: "🎧" },
        { label: "A bigger salary and a bigger office", emoji: "💵" },
        { label: "Julieta moves to Miami with him", emoji: "✈️" },
      ],
      answer: 0,
      sayIt: "He said yes with two conditions. The first is that Mía leads the floor training. The second is that he takes calls one shift a month, in the contract.",
      sayItEs: "Dijo que sí con dos condiciones. La primera es que Mía dirija el entrenamiento del piso. La segunda es que él tome llamadas un turno al mes, en el contrato.",
      sayItCheck: {
        target: "* two conditions *",
        altTargets: ["The first is *", "The second is *", "* one shift a month *"],
      },
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "No script. Something you believe today that you didn't believe before. What you used to think, what changed it, and what you believe now.",
      questionEs: "Sin guion. Algo que crees hoy y que antes no creías. Qué pensabas antes, qué lo cambió, y qué crees ahora.",
      options: [
        { label: "I am ready to answer", emoji: "🎧" },
        { label: "I want to hear the season one more time", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "I used to think I had to be ready before I spoke. What changed it was every call I lost by waiting. Now I believe that a wrong sentence said in five seconds is worth more than a perfect one said too late.",
      sayItEs: "Antes pensaba que tenía que estar listo antes de hablar. Lo que lo cambió fue cada llamada que perdí por esperar. Ahora creo que una frase equivocada dicha en cinco segundos vale más que una perfecta dicha demasiado tarde.",
      sayItAskEn: "Start with \"I used to think ...\", then \"What changed it was ...\", and close with \"Now I believe ...\".",
      sayItAskEs: "Empieza con \"I used to think …\", luego \"What changed it was …\" y cierra con \"Now I believe …\".",
      sayItCheck: {
        target: "I used to think *",
        altTargets: ["What changed it was *", "Now I believe *", "I believe *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s4",
    phrase: "I take the big job and I keep the small desk. Ambition with a headset on it.",
    es: "Tomo el puesto grande y me quedo con el escritorio pequeño. Ambición con una diadema puesta.",
  },
  habitCard: {
    afterScene: "s7",
    phrase: "When someone says 'it's not working', I don't guess what 'it' is. I ask for the first thing they noticed, and I stay on the line.",
    es: "Cuando alguien dice 'no funciona', no adivino qué es 'eso'. Pregunto por lo primero que notó, y me quedo en la línea.",
    model: "dani",
    modelActionEs: "En la primera llamada de la temporada, tres años después de la primera de todas, Dani no adivinó: pidió lo primero que el cliente notó y se quedó en la línea.",
  },
  expressions: [
    {
      phrase: "come back",
      variants: ["comes back", "came back", "coming back"],
      es: "volver, regresar",
      kind: "phrasal",
      example: "Miami is twenty rooms. This is the one I come back to, on the 42.",
      exampleEs: "Miami son veinte salones. Este es al que vuelvo, en el 42.",
    },
    {
      phrase: "stay on",
      variants: ["stayed on", "stays on", "staying on the line"],
      es: "quedarse (en la línea)",
      kind: "phrasal",
      example: "Tell me the first thing you noticed last night, and I'll stay on the line until it works.",
      exampleEs: "Dígame lo primero que notó anoche, y me quedo en la línea hasta que funcione.",
    },
    {
      phrase: "in the contract",
      variants: ["under contract", "put it in the contract"],
      es: "en el contrato, por escrito",
      kind: "idiom",
      example: "In the contract, not as a favor.",
      exampleEs: "En el contrato, no como favor.",
    },
    {
      phrase: "make it a thing",
      variants: ["don't make it a thing", "making it a thing"],
      es: "hacer de algo un tema, darle importancia",
      kind: "idiom",
      example: "Don't make it a thing. Thank you. Where's the room?",
      exampleEs: "No lo hagás tema. Gracias. ¿Dónde está la sala?",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds, no script, no shape given: a question arrives, you take one second, you choose the shape, and you start talking before the answer is perfect. Here it is: what do you want?",
    es: "Treinta segundos, sin guion, sin forma dada: llega una pregunta, te tomas un segundo, eliges la forma, y empiezas a hablar antes de que la respuesta sea perfecta. Aquí va: ¿qué quieres?",
  },
  continueWith: [
    "What I want is ...",
    "I used to think ... Now I believe ...",
    "The reason is ... For example, ...",
    "And if that doesn't work, I ...",
  ],
  cliffhanger: {
    en: "That's the end of Vale's world. Eleven seasons, one chair, one sentence. Whoever trains, takes calls. Put the headset on.",
    es: "Ese es el final del mundo de Vale. Once temporadas, una silla, una frase. Quien entrena, toma llamadas. Ponete la diadema.",
  },
};
