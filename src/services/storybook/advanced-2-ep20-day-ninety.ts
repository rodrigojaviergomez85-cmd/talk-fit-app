import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced2-ep20-day-ninety/cover.jpg";
import s1 from "@/assets/storybook/advanced2-ep20-day-ninety/s1.jpg";
import s2 from "@/assets/storybook/advanced2-ep20-day-ninety/s2.jpg";
import s3 from "@/assets/storybook/advanced2-ep20-day-ninety/s3.jpg";
import s4 from "@/assets/storybook/advanced2-ep20-day-ninety/s4.jpg";
import s5 from "@/assets/storybook/advanced2-ep20-day-ninety/s5.jpg";
import s6 from "@/assets/storybook/advanced2-ep20-day-ninety/s6.jpg";
import s7 from "@/assets/storybook/advanced2-ep20-day-ninety/s7.jpg";
import s8 from "@/assets/storybook/advanced2-ep20-day-ninety/s8.jpg";
import s9 from "@/assets/storybook/advanced2-ep20-day-ninety/s9.jpg";

export const ADVANCED2_EP20_DAY_NINETY: StorybookEpisode = {
  id: "advanced2-ep20-day-ninety",
  moduleId: "advanced-2",
  week: 4,
  title: "Day ninety",
  titleEs: "Día noventa",
  episodeLabel: {
    en: "Advanced 2 · Episode 20",
    es: "Advanced 2 · Episodio 20",
  },
  previously: [
    {
      en: "Lidia played Dani's day-one call. He didn't say 'but'.",
      es: "Lidia puso la llamada del día uno de Dani. Él no dijo 'pero'.",
    },
    {
      en: "'Don't take those calls for them. Not tomorrow.'",
      es: "'No tomes esas llamadas por ellos. Mañana no'.",
    },
    {
      en: "Friday. Day ninety. The committee at 9:15, then the floor.",
      es: "Viernes. Día noventa. El comité a las 9:15, luego el piso.",
    },
  ],
  reviewWords: [
    { word: "audit", es: "auditoría" },
    { word: "shift", es: "turno" },
    { word: "pass", es: "pasar" },
    { word: "truth", es: "verdad" },
    { word: "views", es: "vistas" },
  ],
  blurb: {
    en: "Day ninety. No script. Twenty agents on live calls with Lidia listening. Mía passes first. Nico says four sentences and passes. Óscar's call is six minutes and ten seconds, and it isn't enough, and Dani can't take it for him. He walks him to the door and tells him the truth. Then Mía, at the bus stop, presses post.",
    es: "Día noventa. Sin guion. Veinte agentes en llamadas reales con Lidia escuchando. Mía pasa primera. Nico dice cuatro frases y pasa. La llamada de Óscar dura seis minutos con diez segundos, y no es suficiente, y Dani no puede tomarla por él. Lo acompaña a la puerta y le dice la verdad. Después Mía, en la parada, presiona publicar.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Friday, 9:15 a.m.; the glass meeting room; Vale, Ms. Barrett and Camila on one side of the table; Dani standing with one printed page; through the glass, the floor already full, every agent with a headset on.",
      text: "Friday, 9:15 a.m. The committee. Under a minute.",
      es: "Viernes, 9:15 a.m. El comité. En menos de un minuto.",
      speaker: "dani",
      cast: ["dani", "vale", "barrett", "camila"],
      lines: [
        {
          speaker: "dani",
          text: "Ninety days ago twenty agents started this pilot and I took the first call. What happened was I lost it in four minutes. Since then, average handle time is down from eleven minutes to seven, escalations are down twenty-two percent, and fifteen agents in Bogotá learned the case process from an agent of ours. In the end, the number that matters is on the floor right now, and Crown is listening.",
          es: "Hace noventa días veinte agentes empezaron este piloto y yo tomé la primera llamada. Lo que pasó fue que la perdí en cuatro minutos. Desde entonces, el tiempo promedio de llamada bajó de once minutos a siete, las escalaciones bajaron veintidós por ciento, y quince agentes en Bogotá aprendieron el proceso de casos de una agente nuestra. Al final, el número que importa está en el piso ahora mismo, y Crown está escuchando.",
        },
        {
          speaker: "barrett",
          text: "Fifty-eight seconds.",
          es: "Cincuenta y ocho segundos.",
        },
        {
          speaker: "vale",
          text: "Go downstairs. We'll wait for the other number.",
          es: "Baja. Esperamos el otro número.",
        },
      ],
      words: [
        { word: "pilot", es: "piloto" },
        { word: "since", es: "desde" },
        { word: "downstairs", es: "abajo" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "The floor at 9:30; Lidia at a small desk at the end of the row with a headset and a stack of twenty scoring sheets; the wall screen reading REAL SHIFT, ALL ACCOUNTS; Mía on a call in the foreground, calm, one hand flat on the desk.",
      text: "9:30 a.m. All accounts. Mía goes first.",
      es: "9:30 a.m. Todas las cuentas. Mía va primera.",
      speaker: "mia",
      lines: [
        {
          speaker: "caller",
          text: "I've been paying since Monday for a service that has not worked one single day. Cancel it and give me the money.",
          es: "He estado pagando desde el lunes por un servicio que no ha funcionado ni un solo día. Cancélenlo y denme el dinero.",
        },
        {
          speaker: "mia",
          text: "Thanks for calling — I'll take care of this with you. Let me check that for you before I say anything else. Just to confirm, the problem started on Monday, and it's the internet, not the phone line?",
          es: "Gracias por llamar. Me encargo de esto con usted. Déjeme revisarlo antes de decir cualquier otra cosa. Solo para confirmar, ¿el problema empezó el lunes, y es el internet, no la línea telefónica?",
        },
        {
          speaker: "caller",
          text: "The internet. Since Monday.",
          es: "El internet. Desde el lunes.",
        },
        {
          speaker: "mia",
          text: "I'm sorry this took so long — that's on us. Here's what I'm going to do in the next ten minutes: I open the credit for the days it didn't work. Another option, if you prefer, is to keep the service and pause the billing until it's fixed. Whatever you decide, I'll send you the confirmation today.",
          es: "Lamento que esto tomara tanto; es culpa nuestra. Esto es lo que voy a hacer en los próximos diez minutos: abro el crédito por los días que no funcionó. Otra opción, si prefiere, es mantener el servicio y pausar el cobro hasta que se arregle. Decida lo que decida, le mando la confirmación hoy.",
        },
      ],
      words: [
        { word: "cancel", es: "cancelar" },
        { word: "billing", es: "cobro" },
        { word: "whatever", es: "lo que sea" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Lidia writing on the first sheet and sliding it face down to the side; Mía hanging up and looking at nobody; Dani at his own desk two rows away, hands flat, not moving.",
      text: "Four minutes and twelve seconds. Lidia turns the sheet over.",
      es: "Cuatro minutos y doce segundos. Lidia voltea la hoja.",
      speaker: "lidia",
      cast: ["lidia", "mia", "dani"],
      lines: [
        {
          speaker: "lidia",
          text: "Next.",
          es: "Siguiente.",
        },
        {
          speaker: "mia",
          text: "That's it? That's the whole reaction?",
          es: "¿Eso es todo? ¿Esa es toda la reacción?",
        },
        {
          speaker: "lidia",
          text: "You'll get the reaction at five, with everybody. But you can stop holding your breath. Next.",
          es: "La reacción la tendrás a las cinco, con todos. Pero ya puedes dejar de aguantar la respiración. Siguiente.",
        },
      ],
      words: [
        { word: "sheet", es: "hoja" },
        { word: "reaction", es: "reacción" },
        { word: "breath", es: "respiración" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Nico on a call, hood down, headset on, four fingers of his left hand resting on the desk; Lidia listening with her eyes closed.",
      text: "10:20 a.m. Nico. Four fingers on the desk.",
      es: "10:20 a.m. Nico. Cuatro dedos sobre el escritorio.",
      speaker: "nico",
      lines: [
        {
          speaker: "caller",
          text: "I want a refund. I don't care about your thirty days.",
          es: "Quiero un reembolso. No me importan sus treinta días.",
        },
        {
          speaker: "nico",
          text: "Unfortunately, we can't refund after thirty days. The reason is the account closes automatically at that point. What we can do instead is a credit for next month, or pause the service for sixty days. Does that work for you?",
          es: "Lamentablemente, no podemos reembolsar después de treinta días. La razón es que la cuenta se cierra automáticamente en ese punto. Lo que podemos hacer en cambio es un crédito para el próximo mes, o pausar el servicio por sesenta días. ¿Eso le funciona?",
        },
        {
          speaker: "caller",
          text: "...The pause. Sixty days.",
          es: "...La pausa. Sesenta días.",
        },
        {
          speaker: "nico",
          text: "Sixty days. Just to confirm, I'll send the confirmation to your email today. Thank you for your patience.",
          es: "Sesenta días. Solo para confirmar, le mando la confirmación a su correo hoy. Gracias por su paciencia.",
        },
      ],
      words: [
        { word: "care", es: "importar" },
        { word: "pause", es: "pausa" },
        { word: "patience", es: "paciencia" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Óscar on a call, back very straight, both hands flat; the call timer on his screen at 6:10; Dani at his desk with his hand gripping the edge of it; Lidia writing without looking up.",
      text: "11:05 a.m. Óscar. Six minutes and ten seconds.",
      es: "11:05 a.m. Óscar. Seis minutos con diez segundos.",
      speaker: "oscar",
      lines: [
        {
          speaker: "oscar",
          text: "Just to confirm, you're taking the family plan. That includes four lines. The first payment is on the fifth. What happens next is I send everything to your email today.",
          es: "Solo para confirmar, se lleva el plan familiar. Eso incluye cuatro líneas. El primer pago es el cinco. Lo que sigue es que le mando todo a su correo hoy.",
        },
        {
          speaker: "caller",
          text: "You said the fifth already. Twice.",
          es: "Ya dijo el cinco. Dos veces.",
        },
        {
          speaker: "oscar",
          text: "I did. Sorry. Thank you for your time today. It was a pleasure helping you.",
          es: "Sí. Perdón. Gracias por su tiempo hoy. Fue un placer ayudarle.",
        },
      ],
      words: [
        { word: "includes", es: "incluye" },
        { word: "already", es: "ya" },
        { word: "pleasure", es: "placer" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "5:00 p.m.; the training room; Lidia standing with the stack of sheets; twenty agents seated, Mía, Nico and Óscar in the front row; Dani standing at the back wall by the door; Barrett in the doorway.",
      text: "5:00 p.m. The training room. Twenty sheets.",
      es: "5:00 p.m. La sala de entrenamiento. Veinte hojas.",
      speaker: "lidia",
      cast: ["lidia", "mia", "nico", "oscar", "dani", "barrett"],
      lines: [
        {
          speaker: "lidia",
          text: "Seventeen of twenty stay on the pilot. Mía, first sheet, highest score on the floor. Nico, four sentences and a customer who chose the pause. Three agents don't pass today. I'll say their names to them, not to the room.",
          es: "Diecisiete de veinte se quedan en el piloto. Mía, primera hoja, el puntaje más alto del piso. Nico, cuatro frases y un cliente que eligió la pausa. Tres agentes no pasan hoy. Sus nombres se los digo a ellos, no a la sala.",
        },
        {
          speaker: "mia",
          text: "Say mine, then.",
          es: "Di el mío, entonces.",
        },
        {
          speaker: "lidia",
          text: "I just did. Twice.",
          es: "Ya lo dije. Dos veces.",
        },
        {
          speaker: "nico",
          text: "Ha.",
          es: "Ja.",
        },
        {
          speaker: "mia",
          text: "He laughed. Somebody write down that he laughed.",
          es: "Se rio. Que alguien anote que se rio.",
        },
      ],
      words: [
        { word: "seventeen", es: "diecisiete" },
        { word: "highest", es: "más alto" },
        { word: "laughed", es: "se rio" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "The Northline lobby at 5:30; Óscar with his backpack and his badge in his hand; Dani walking beside him toward the glass doors, not ahead of him; the floor visible behind them through the glass.",
      text: "5:30 p.m. Dani walks Óscar to the door. Not ahead of him. Beside him.",
      es: "5:30 p.m. Dani acompaña a Óscar a la puerta. No adelante. A su lado.",
      speaker: "dani",
      cast: ["dani", "oscar"],
      lines: [
        {
          speaker: "oscar",
          text: "Six ten. She said six ten and two cases closed early. You could have taken that call for me.",
          es: "Seis diez. Dijo seis diez y dos casos cerrados temprano. Pudiste haber tomado esa llamada por mí.",
        },
        {
          speaker: "dani",
          text: "I could have. Then you'd be on the floor Monday with a number that isn't yours. Here's the truth: you're out of the pilot. You're not out of English.",
          es: "Pude. Entonces estarías en el piso el lunes con un número que no es tuyo. Esta es la verdad: estás fuera del piloto. No estás fuera del inglés.",
        },
        {
          speaker: "oscar",
          text: "What's the difference?",
          es: "¿Cuál es la diferencia?",
        },
        {
          speaker: "dani",
          text: "The pilot audits. The club doesn't. Tuesday at seven, the room is still empty and the chair is still yours. Bring your cousin. In three months you take this audit again, and I don't take the call for you then either.",
          es: "El piloto audita. El club no. El martes a las siete, la sala sigue vacía y la silla sigue siendo tuya. Trae a tu primo. En tres meses tomas esta auditoría otra vez, y tampoco tomo la llamada por ti entonces.",
        },
        {
          speaker: "oscar",
          text: "That's the whole truth?",
          es: "¿Esa es toda la verdad?",
        },
        {
          speaker: "dani",
          text: "That's the whole truth. And it's me saying it, not a sheet.",
          es: "Esa es toda la verdad. Y lo digo yo, no una hoja.",
        },
      ],
      words: [
        { word: "cases", es: "casos" },
        { word: "audits", es: "audita" },
        { word: "cousin", es: "primo" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "The empty floor at 7:00 p.m.; Vale and Dani at the end of his row; Vale holding one sheet of paper with a number circled; Lidia's desk cleared behind them.",
      text: "7:00 p.m. The other number.",
      es: "7:00 p.m. El otro número.",
      speaker: "vale",
      cast: ["vale", "dani"],
      lines: [
        {
          speaker: "vale",
          text: "Seventeen of twenty. Northline signs the second group Monday. Crown's auditor wrote one line at the bottom of your sheet that isn't a score.",
          es: "Diecisiete de veinte. Northline firma el segundo grupo el lunes. La auditora de Crown escribió una línea al pie de tu hoja que no es un puntaje.",
        },
        {
          speaker: "dani",
          text: "What does it say?",
          es: "¿Qué dice?",
        },
        {
          speaker: "vale",
          text: "'He didn't take the call for the one who failed.' Underlined. I'm framing it.",
          es: "'No tomó la llamada por el que reprobó'. Subrayado. Lo voy a enmarcar.",
        },
        {
          speaker: "dani",
          text: "Frame the seventeen.",
          es: "Enmarca los diecisiete.",
        },
        {
          speaker: "vale",
          text: "I'm framing the three. Those are the ones you'll remember.",
          es: "Voy a enmarcar los tres. Esos son los que vas a recordar.",
        },
      ],
      words: [
        { word: "signs", es: "firma" },
        { word: "bottom", es: "pie" },
        { word: "remember", es: "recordar" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Night; the bus stop; Mía alone on the bench, headset around her neck, her phone lit with a forty-second video paused on Dani standing in Barrett's office; her thumb over the word POST.",
      text: "9:40 p.m. She doesn't tell anyone. She presses post.",
      es: "9:40 p.m. No le dice a nadie. Presiona publicar.",
      speaker: "mia",
      cast: ["mia"],
      lines: [
        {
          speaker: "mia",
          text: "Not the floor one. This one. Him, in an office, saying the kid did the right thing. No screens. Just a jefe.",
          es: "No el del piso. Este. Él, en una oficina, diciendo que el muchacho hizo lo correcto. Sin pantallas. Solo un jefe.",
        },
        {
          speaker: "mia",
          text: "Posted.",
          es: "Publicado.",
        },
      ],
      words: [
        { word: "office", es: "oficina" },
        { word: "screens", es: "pantallas" },
        { word: "posted", es: "publicado" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s7",
      questionEn: "Why doesn't Dani take Óscar's audit call for him?",
      questionEs: "¿Por qué Dani no toma la llamada de auditoría de Óscar por él?",
      options: [
        { label: "Because then Óscar would pass with a number that isn't his", emoji: "🔢" },
        { label: "Because Lidia wouldn't let him near the desk", emoji: "🚫" },
        { label: "Because he was in the committee meeting", emoji: "🗓️" },
      ],
      answer: 0,
      sayIt: "Because then Óscar would pass with a number that isn't his.",
      sayItEs: "Porque entonces Óscar pasaría con un número que no es suyo.",
      sayItCheck: {
        target: "* a number that isn't his",
        altTargets: ["Because it wouldn't be his call", "Because the number wouldn't be his", "Because Lidia told him not to *"],
      },
    },
    {
      id: "q2",
      afterScene: "s2",
      questionEn: "A real call, no script. Take care of it: check first, confirm one fact, own the delay, and say what you'll do in the next ten minutes.",
      questionEs: "Una llamada real, sin guion. Encárgate: revisa primero, confirma un hecho, asume la demora, y di qué harás en los próximos diez minutos.",
      options: [
        { label: "I am ready to answer", emoji: "🎧" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "Thanks for calling — I'll take care of this with you. Let me check that for you before I say anything else. Just to confirm, the problem started on Monday. I'm sorry this took so long — that's on us. Here's what I'm going to do in the next ten minutes.",
      sayItEs: "Gracias por llamar. Me encargo de esto con usted. Déjeme revisarlo antes de decir cualquier otra cosa. Solo para confirmar, el problema empezó el lunes. Lamento que esto tomara tanto; es culpa nuestra. Esto es lo que voy a hacer en los próximos diez minutos.",
      sayItAskEn: "Start with \"Thanks for calling — I'll take care of this with you\", then \"Just to confirm, ...\", then \"I'm sorry this took so long — that's on us\", and close with \"Here's what I'm going to do in the next ten minutes\".",
      sayItAskEs: "Empieza con \"Thanks for calling — I'll take care of this with you\", luego \"Just to confirm, …\", después \"I'm sorry this took so long — that's on us\" y cierra con \"Here's what I'm going to do in the next ten minutes\".",
      sayItCheck: {
        target: "Thanks for calling *",
        altTargets: ["I'll take care of this with you *", "Just to confirm, *", "Here's what I'm going to do *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s7",
    phrase: "I don't take the call for them. Not on the day it counts. That's the only way the number is theirs.",
    es: "No tomo la llamada por ellos. No el día que cuenta. Es la única forma de que el número sea suyo.",
  },
  habitCard: {
    afterScene: "s3",
    phrase: "On a real call, I check before I say anything else, and I confirm one fact before I promise one thing.",
    es: "En una llamada real, reviso antes de decir cualquier otra cosa, y confirmo un hecho antes de prometer una cosa.",
    model: "mia",
    modelActionEs: "Mía revisó primero, confirmó que era el internet desde el lunes, asumió la demora y ofreció dos salidas en cuatro minutos con doce segundos.",
  },
  expressions: [
    {
      phrase: "take care of",
      variants: ["take care of this", "took care of", "taking care of"],
      es: "encargarse de",
      kind: "phrasal",
      example: "Thanks for calling — I'll take care of this with you.",
      exampleEs: "Gracias por llamar. Me encargo de esto con usted.",
    },
    {
      phrase: "write down",
      variants: ["write it down", "wrote down", "written down"],
      es: "anotar",
      kind: "phrasal",
      example: "He laughed. Somebody write down that he laughed.",
      exampleEs: "Se rio. Que alguien anote que se rio.",
    },
    {
      phrase: "hold your breath",
      variants: ["holding your breath", "held my breath", "stop holding your breath"],
      es: "aguantar la respiración (esperar con ansiedad)",
      kind: "idiom",
      example: "You'll get the reaction at five, with everybody. But you can stop holding your breath. Next.",
      exampleEs: "La reacción la tendrás a las cinco, con todos. Pero ya puedes dejar de aguantar la respiración. Siguiente.",
    },
    {
      phrase: "the whole truth",
      variants: ["whole truth", "the truth"],
      es: "toda la verdad",
      kind: "idiom",
      example: "That's the whole truth. And it's me saying it, not a sheet.",
      exampleEs: "Esa es toda la verdad. Y lo digo yo, no una hoja.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds, no script: a customer with a real problem. Read it, check first, confirm one fact, own the delay, and say what you'll do in the next ten minutes.",
    es: "Treinta segundos, sin guion: un cliente con un problema real. Léelo, revisa primero, confirma un hecho, asume la demora, y di qué harás en los próximos diez minutos.",
  },
  continueWith: [
    "Thanks for calling — I'll take care of this with you.",
    "Let me check that for you before I say anything else. Just to confirm, ...",
    "I'm sorry this took so long — that's on us.",
    "Here's what I'm going to do in the next ten minutes. Whatever you decide, I'll send you the confirmation today.",
  ],
  cliffhanger: {
    en: "By Monday it has two million views, and Northline's legal team wants a word.",
    es: "Para el lunes tiene dos millones de vistas, y el equipo legal de Northline quiere hablar.",
  },
};
