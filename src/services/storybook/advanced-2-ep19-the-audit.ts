import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced2-ep19-the-audit/cover.jpg";
import s1 from "@/assets/storybook/advanced2-ep19-the-audit/s1.jpg";
import s2 from "@/assets/storybook/advanced2-ep19-the-audit/s2.jpg";
import s3 from "@/assets/storybook/advanced2-ep19-the-audit/s3.jpg";
import s4 from "@/assets/storybook/advanced2-ep19-the-audit/s4.jpg";
import s5 from "@/assets/storybook/advanced2-ep19-the-audit/s5.jpg";
import s6 from "@/assets/storybook/advanced2-ep19-the-audit/s6.jpg";
import s7 from "@/assets/storybook/advanced2-ep19-the-audit/s7.jpg";
import s8 from "@/assets/storybook/advanced2-ep19-the-audit/s8.jpg";
import s9 from "@/assets/storybook/advanced2-ep19-the-audit/s9.jpg";

export const ADVANCED2_EP19_THE_AUDIT: StorybookEpisode = {
  id: "advanced2-ep19-the-audit",
  moduleId: "advanced-2",
  week: 4,
  title: "The audit",
  titleEs: "La auditoría",
  episodeLabel: {
    en: "Advanced 2 · Episode 19",
    es: "Advanced 2 · Episodio 19",
  },
  previously: [
    {
      en: "Mía taught the case process to Bogotá and fixed her own mistake.",
      es: "Mía le enseñó el proceso de casos a Bogotá y corrigió su propio error.",
    },
    {
      en: "Crown's auditor asked for one recording in advance: Dani's day one.",
      es: "La auditora de Crown pidió una grabación por adelantado: el día uno de Dani.",
    },
    {
      en: "The auditor is Lidia.",
      es: "La auditora es Lidia.",
    },
  ],
  reviewWords: [
    { word: "responsibility", es: "responsabilidad" },
    { word: "defend", es: "defender" },
    { word: "listen", es: "escuchar" },
    { word: "recording", es: "grabación" },
    { word: "eighty-nine", es: "ochenta y nueve" },
  ],
  blurb: {
    en: "Lidia, from Crown, sits down with the worst call Dani has ever taken, the one from day one, and presses play. He doesn't defend himself. He says what he lost, what he should have done, and what he does now. Lidia: 'That was day one. Show me day eighty-nine.' He takes a live call with her listening. Then it's Thursday at ten, and nobody moves it.",
    es: "Lidia, de Crown, se sienta con la peor llamada que Dani ha tomado, la del día uno, y le da play. Él no se defiende. Dice qué perdió, qué debió hacer, y qué hace ahora. Lidia: 'Eso fue el día uno. Muéstrame el día ochenta y nueve'. Toma una llamada en vivo con ella escuchando. Después es jueves a las diez, y nadie lo mueve.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Thursday, 9:00 a.m.; the small glass meeting room; Lidia in her deep teal blazer, hair in a low bun, a laptop open with an audio player on the screen; Dani across from her; a visitor badge on the table reading LIDIA, CROWN.",
      text: "Thursday, 9:00 a.m. Day eighty-nine.",
      es: "Jueves, 9:00 a.m. Día ochenta y nueve.",
      speaker: "lidia",
      cast: ["lidia", "dani"],
      lines: [
        {
          speaker: "lidia",
          text: "Hello, Dani.",
          es: "Hola, Dani.",
        },
        {
          speaker: "dani",
          text: "Hello, Lidia. You came to fail us.",
          es: "Hola, Lidia. Viniste a reprobarnos.",
        },
        {
          speaker: "lidia",
          text: "I came to listen. Don't put words in my mouth on day eighty-nine; you have enough of your own. This is your first morning. Four minutes. I play it, then you tell me about it.",
          es: "Vine a escuchar. No me pongas palabras en la boca el día ochenta y nueve; tienes suficientes tuyas. Esta es tu primera mañana. Cuatro minutos. La pongo, y después me hablas de ella.",
        },
      ],
      words: [
        { word: "fail", es: "reprobar" },
        { word: "mouth", es: "boca" },
        { word: "play", es: "reproducir" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Close on the laptop's audio player, the progress bar at 3:50; Dani's reflection in the screen, jaw tight; Lidia's hand flat next to the laptop, not moving.",
      text: "Four minutes. He hears himself guess what broke. He hears the click.",
      es: "Cuatro minutos. Se oye a sí mismo adivinar qué se rompió. Oye el clic.",
      speaker: "lidia",
      cast: ["lidia", "dani"],
      lines: [
        {
          speaker: "lidia",
          text: "Go.",
          es: "Dale.",
        },
        {
          speaker: "dani",
          text: "You're right — I lost control of that call. The customer was describing a problem and I started filling in what broke before she finished. I didn't listen enough before I answered.",
          es: "Tienes razón. Perdí el control de esa llamada. La clienta estaba describiendo un problema y yo empecé a completar qué se rompió antes de que terminara. No escuché lo suficiente antes de contestar.",
        },
        {
          speaker: "lidia",
          text: "What should you have done?",
          es: "¿Qué debiste hacer?",
        },
        {
          speaker: "dani",
          text: "What I should have done is let her finish first. I also gave her information I wasn't sure about: I told her the router was the problem. It wasn't. She hung up at 3:58 and she was right to.",
          es: "Lo que debí hacer fue dejarla terminar primero. También le di información de la que no estaba seguro: le dije que el router era el problema. No lo era. Colgó a las 3:58 y tenía razón en hacerlo.",
        },
      ],
      words: [
        { word: "control", es: "control" },
        { word: "describing", es: "describiendo" },
        { word: "information", es: "información" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Lidia writing one line on a scoring sheet, not looking up; Dani with both hands on the table, waiting.",
      text: "She writes one line. He waits for the rest.",
      es: "Escribe una línea. Él espera el resto.",
      speaker: "lidia",
      cast: ["lidia", "dani"],
      lines: [
        {
          speaker: "lidia",
          text: "And now?",
          es: "¿Y ahora?",
        },
        {
          speaker: "dani",
          text: "From now on, I take five seconds before I respond. I've done it on every call since day two. If it happens again, I ask for support in the chat instead of guessing. The five seconds are in my file. Mía counts them.",
          es: "De ahora en adelante, tomo cinco segundos antes de responder. Lo he hecho en cada llamada desde el día dos. Si vuelve a pasar, pido apoyo en el chat en vez de adivinar. Los cinco segundos están en mi expediente. Mía los cuenta.",
        },
        {
          speaker: "lidia",
          text: "You didn't say 'but'. Not once. Most people say 'but' in the second sentence.",
          es: "No dijiste 'pero'. Ni una vez. La mayoría dice 'pero' en la segunda frase.",
        },
        {
          speaker: "dani",
          text: "There's no 'but'. It was a bad call.",
          es: "No hay 'pero'. Fue una mala llamada.",
        },
        {
          speaker: "lidia",
          text: "That was day one. Show me day eighty-nine.",
          es: "Eso fue el día uno. Muéstrame el día ochenta y nueve.",
        },
      ],
      words: [
        { word: "respond", es: "responder" },
        { word: "support", es: "apoyo" },
        { word: "guessing", es: "adivinar" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "The floor; Dani at his desk with his headset on, the wall screen reading HOME INTERNET, TECHNICAL SUPPORT; Lidia in a chair beside him with a second headset, scoring sheet on her knee. No customer is drawn.",
      text: "9:40 a.m. A live call. Lidia listens.",
      es: "9:40 a.m. Una llamada en vivo. Lidia escucha.",
      speaker: "dani",
      lines: [
        {
          speaker: "caller",
          text: "The internet drops every night at nine. Every single night. Three calls, and every time somebody says router.",
          es: "El internet se cae todas las noches a las nueve. Todas. Tres llamadas, y cada vez alguien dice router.",
        },
        {
          speaker: "dani",
          text: "Thanks for calling — I'll take care of this with you. Let me check that for you before I say anything else.",
          es: "Gracias por llamar. Me encargo de esto con usted. Déjeme revisarlo antes de decir cualquier otra cosa.",
        },
        {
          speaker: "caller",
          text: "That's what the last one said.",
          es: "Eso dijo el último.",
        },
        {
          speaker: "dani",
          text: "Then I'll say something different. Just to confirm, the problem started on Monday, and it's always at nine, not at random hours?",
          es: "Entonces voy a decir algo distinto. Solo para confirmar, ¿el problema empezó el lunes, y es siempre a las nueve, no a horas aleatorias?",
        },
      ],
      words: [
        { word: "drops", es: "se cae" },
        { word: "single", es: "sola" },
        { word: "random", es: "aleatorias" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Close on Dani's screen: a scheduled maintenance window highlighted at 9:00 p.m. on the customer's building; Lidia's pen stopped above the sheet.",
      text: "Five seconds. Then the fact.",
      es: "Cinco segundos. Luego el hecho.",
      speaker: "dani",
      lines: [
        {
          speaker: "caller",
          text: "Always nine. Since Monday.",
          es: "Siempre a las nueve. Desde el lunes.",
        },
        {
          speaker: "dani",
          text: "Here's what I can see: your building has a maintenance window at nine p.m. that was scheduled Monday and never closed. It's not your router. I'm sorry this took three calls — that's on us. Here's what I'm going to do in the next ten minutes: I close that window and I stay on the line while it applies.",
          es: "Esto es lo que veo: su edificio tiene una ventana de mantenimiento a las nueve p.m. que se programó el lunes y nunca se cerró. No es su router. Lamento que esto tomara tres llamadas; es culpa nuestra. Esto es lo que voy a hacer en los próximos diez minutos: cierro esa ventana y me quedo en la línea mientras se aplica.",
        },
        {
          speaker: "caller",
          text: "Three people told me router.",
          es: "Tres personas me dijeron router.",
        },
        {
          speaker: "dani",
          text: "I know. I used to be one of them. Thank you for your patience — you'll hear from me before five, tonight, at 9:05, to confirm it held.",
          es: "Lo sé. Yo era uno de ellos. Gracias por su paciencia; tendrá noticias mías antes de las cinco, y esta noche, a las 9:05, para confirmar que aguantó.",
        },
      ],
      words: [
        { word: "maintenance", es: "mantenimiento" },
        { word: "scheduled", es: "programada" },
        { word: "applies", es: "se aplica" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Lidia taking off the second headset and writing a second line on the sheet; Dani not looking at the sheet; Mía and Nico watching from two desks away, badly pretending not to.",
      text: "She writes the second line.",
      es: "Escribe la segunda línea.",
      speaker: "lidia",
      cast: ["lidia", "dani"],
      lines: [
        {
          speaker: "lidia",
          text: "Day one, you guessed router in twenty seconds. Day eighty-nine, you said 'I used to be one of them'. That sentence isn't in any script.",
          es: "El día uno adivinaste router en veinte segundos. El día ochenta y nueve dijiste 'yo era uno de ellos'. Esa frase no está en ningún guion.",
        },
        {
          speaker: "dani",
          text: "It's in the recording from day one. I just admitted it out loud.",
          es: "Está en la grabación del día uno. Solo lo admití en voz alta.",
        },
        {
          speaker: "lidia",
          text: "Tomorrow I listen to twenty agents, not to you. I already know about you.",
          es: "Mañana escucho a veinte agentes, no a ti. De ti ya sé.",
        },
      ],
      words: [
        { word: "guessed", es: "adivinaste" },
        { word: "script", es: "guion" },
        { word: "admitted", es: "admití" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "10:00 a.m.; the training room; Mía and Nico at the tall table with headsets on, Dani standing between them with a stopwatch; through the glass, Óscar at his desk on the floor, alone, headset on, watching the clock.",
      text: "10:00 a.m. Thursday at ten. Nobody moved it.",
      es: "10:00 a.m. Jueves a las diez. Nadie lo movió.",
      speaker: "dani",
      cast: ["dani", "mia", "nico"],
      lines: [
        {
          speaker: "dani",
          text: "Last prep. Mía, an angry one. Five seconds before you answer, and slow. Nico, the sentence after you're right. One. Go.",
          es: "Última preparación. Mía, uno enojado. Cinco segundos antes de contestar, y lento. Nico, la frase después de tener razón. Una. Dale.",
        },
        {
          speaker: "mia",
          text: "You're right to be upset. That shouldn't have happened. Let me fix this right now, before anything else. Was that slow?",
          es: "Tiene razón en estar molesto. Eso no debió pasar. Déjeme arreglar esto ahora mismo, antes que nada. ¿Fue lento?",
        },
        {
          speaker: "dani",
          text: "It was slow. Nico.",
          es: "Fue lento. Nico.",
        },
        {
          speaker: "nico",
          text: "Unfortunately, we can't refund after thirty days. The reason is the account closes at that point. What we can do instead is a credit. That's three. The fourth is: does that work for you?",
          es: "Lamentablemente, no podemos reembolsar después de treinta días. La razón es que la cuenta se cierra en ese punto. Lo que podemos hacer en cambio es un crédito. Son tres. La cuarta es: ¿eso le funciona?",
        },
        {
          speaker: "mia",
          text: "He did four. Somebody write it down.",
          es: "Hizo cuatro. Que alguien lo anote.",
        },
      ],
      words: [
        { word: "prep", es: "preparación" },
        { word: "slow", es: "lento" },
        { word: "fourth", es: "cuarta" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Dani coming out of the training room; Óscar waiting by the door with his headset in his hands, a printed call log with times circled in red.",
      text: "10:35 a.m. Óscar waited outside the door again.",
      es: "10:35 a.m. Óscar esperó afuera de la puerta otra vez.",
      speaker: "oscar",
      cast: ["oscar", "dani"],
      lines: [
        {
          speaker: "oscar",
          text: "Six fifty. Six twenty. Six ten. It's going down. It's not going down enough.",
          es: "Seis cincuenta. Seis veinte. Seis diez. Está bajando. No está bajando lo suficiente.",
        },
        {
          speaker: "dani",
          text: "Tomorrow Lidia listens to the call, not to the timer. If it's six ten and she stayed, that's a call.",
          es: "Mañana Lidia escucha la llamada, no el cronómetro. Si son seis diez y la clienta se quedó, eso es una llamada.",
        },
        {
          speaker: "oscar",
          text: "And if it isn't enough?",
          es: "¿Y si no es suficiente?",
        },
        {
          speaker: "dani",
          text: "Then I'll tell you the truth, and I'll be the one who tells you. Not a sheet.",
          es: "Entonces te diré la verdad, y seré yo quien te la diga. No una hoja.",
        },
      ],
      words: [
        { word: "enough", es: "suficiente" },
        { word: "timer", es: "cronómetro" },
        { word: "truth", es: "verdad" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Night; the Northline parking lot; Lidia by a rental car with her badge in her hand, Dani a few steps away with his backpack; the building lit behind them.",
      text: "9:10 p.m. He confirmed the customer's internet held at 9:05. Then the parking lot.",
      es: "9:10 p.m. Confirmó que el internet de la clienta aguantó a las 9:05. Luego el estacionamiento.",
      speaker: "lidia",
      cast: ["lidia", "dani"],
      lines: [
        {
          speaker: "lidia",
          text: "Tomorrow I press play on twenty people. Some won't pass. You know that.",
          es: "Mañana le doy play a veinte personas. Algunos no van a pasar. Lo sabes.",
        },
        {
          speaker: "dani",
          text: "I know that.",
          es: "Lo sé.",
        },
        {
          speaker: "lidia",
          text: "Don't take those calls for them. Not tomorrow. That's the only note I have for you, and it's not on the sheet.",
          es: "No tomes esas llamadas por ellos. Mañana no. Es la única nota que tengo para ti, y no está en la hoja.",
        },
        {
          speaker: "dani",
          text: "Five seconds. Then I won't.",
          es: "Cinco segundos. Después no lo haré.",
        },
      ],
      words: [
        { word: "press", es: "presionar" },
        { word: "pass", es: "pasar" },
        { word: "note", es: "nota" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What does Lidia notice about how Dani talks about his bad call?",
      questionEs: "¿Qué nota Lidia sobre cómo Dani habla de su mala llamada?",
      options: [
        { label: "He never says 'but'; he doesn't defend himself", emoji: "🤐" },
        { label: "He blames the customer for hanging up", emoji: "📵" },
        { label: "He says the router really was the problem", emoji: "📡" },
      ],
      answer: 0,
      sayIt: "He never says 'but'; he doesn't defend himself.",
      sayItEs: "Nunca dice 'pero'; no se defiende.",
      sayItCheck: {
        target: "* never says but *",
        altTargets: ["He doesn't defend himself", "He didn't say but *", "No but *"],
      },
    },
    {
      id: "q2",
      afterScene: "s5",
      questionEn: "Your supervisor listened to a call that went badly. Own it, say what you should have done, and say what you'll do from now on.",
      questionEs: "Tu supervisor escuchó una llamada que salió mal. Asume la responsabilidad, di qué debiste hacer, y di qué harás de ahora en adelante.",
      options: [
        { label: "I am ready to answer", emoji: "🎧" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "You're right — I lost control of that call. I didn't listen enough before I answered. What I should have done is let him finish first. From now on, I'll take five seconds before I respond.",
      sayItEs: "Tienes razón. Perdí el control de esa llamada. No escuché lo suficiente antes de contestar. Lo que debí hacer fue dejarlo terminar primero. De ahora en adelante, tomaré cinco segundos antes de responder.",
      sayItAskEn: "Start with \"You're right — I lost control of that call\", then \"What I should have done is ...\", and close with \"From now on, I'll ...\".",
      sayItAskEs: "Empieza con \"You're right — I lost control of that call\", luego \"What I should have done is …\" y cierra con \"From now on, I'll …\".",
      sayItCheck: {
        target: "* I lost control of that call *",
        altTargets: ["What I should have done is *", "From now on, I'll *", "I take responsibility *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s3",
    phrase: "When I own a bad call, there is no 'but' in the second sentence.",
    es: "Cuando asumo una mala llamada, no hay 'pero' en la segunda frase.",
  },
  habitCard: {
    afterScene: "s6",
    phrase: "Five seconds before I respond. Every call. Someone counts them.",
    es: "Cinco segundos antes de responder. Cada llamada. Alguien los cuenta.",
    model: "dani",
    modelActionEs: "Dani tomó cinco segundos antes de decirle a la clienta lo que veía en el sistema, y por eso dijo el hecho y no el router.",
  },
  expressions: [
    {
      phrase: "fill in",
      variants: ["filling in", "filled in", "fill it in"],
      es: "completar, rellenar (con suposiciones)",
      kind: "phrasal",
      example: "You're right — I lost control of that call. The customer was describing a problem and I started filling in what broke before she finished. I didn't listen enough before I answered.",
      exampleEs: "Tienes razón. Perdí el control de esa llamada. La clienta estaba describiendo un problema y yo empecé a completar qué se rompió antes de que terminara. No escuché lo suficiente antes de contestar.",
    },
    {
      phrase: "hear from",
      variants: ["hear from me", "heard from", "you'll hear from me"],
      es: "tener noticias de (alguien)",
      kind: "phrasal",
      example: "I know. I used to be one of them. Thank you for your patience — you'll hear from me before five, tonight, at 9:05, to confirm it held.",
      exampleEs: "Lo sé. Yo era uno de ellos. Gracias por su paciencia; tendrá noticias mías antes de las cinco, y esta noche, a las 9:05, para confirmar que aguantó.",
    },
    {
      phrase: "put words in my mouth",
      variants: ["put words in someone's mouth", "putting words in my mouth"],
      es: "ponerme palabras en la boca, atribuirme algo que no dije",
      kind: "idiom",
      example: "I came to listen. Don't put words in my mouth on day eighty-nine; you have enough of your own. This is your first morning. Four minutes. I play it, then you tell me about it.",
      exampleEs: "Vine a escuchar. No me pongas palabras en la boca el día ochenta y nueve; tienes suficientes tuyas. Esta es tu primera mañana. Cuatro minutos. La pongo, y después me hablas de ella.",
    },
    {
      phrase: "that's on us",
      variants: ["that's on me", "this is on us"],
      es: "es culpa nuestra, nos hacemos responsables",
      kind: "idiom",
      example: "Here's what I can see: your building has a maintenance window at nine p.m. that was scheduled Monday and never closed. It's not your router. I'm sorry this took three calls — that's on us. Here's what I'm going to do in the next ten minutes: I close that window and I stay on the line while it applies.",
      exampleEs: "Esto es lo que veo: su edificio tiene una ventana de mantenimiento a las nueve p.m. que se programó el lunes y nunca se cerró. No es su router. Lamento que esto tomara tres llamadas; es culpa nuestra. Esto es lo que voy a hacer en los próximos diez minutos: cierro esa ventana y me quedo en la línea mientras se aplica.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: a call of yours went badly and someone listened to it. Own it without 'but', say what you should have done, and say what you do from now on.",
    es: "Treinta segundos: una llamada tuya salió mal y alguien la escuchó. Asúmela sin 'pero', di qué debiste hacer, y di qué haces de ahora en adelante.",
  },
  continueWith: [
    "You're right — I lost control of that call.",
    "I didn't listen enough before I answered.",
    "What I should have done is ...",
    "From now on, I'll ... If it happens again, I'll ...",
  ],
  cliffhanger: {
    en: "Tomorrow: day ninety. The committee at 9:15, twenty agents on live calls, Lidia listening to every one. Nobody is on a script. Not everyone stays.",
    es: "Mañana: día noventa. El comité a las 9:15, veinte agentes en llamadas reales, Lidia escuchando cada una. Nadie tiene guion. No todos se quedan.",
  },
};
