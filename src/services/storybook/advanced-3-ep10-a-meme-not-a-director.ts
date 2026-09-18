import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced3-ep10-a-meme-not-a-director/cover.jpg";
import s1 from "@/assets/storybook/advanced3-ep10-a-meme-not-a-director/s1.jpg";
import s2 from "@/assets/storybook/advanced3-ep10-a-meme-not-a-director/s2.jpg";
import s3 from "@/assets/storybook/advanced3-ep10-a-meme-not-a-director/s3.jpg";
import s4 from "@/assets/storybook/advanced3-ep10-a-meme-not-a-director/s4.jpg";
import s5 from "@/assets/storybook/advanced3-ep10-a-meme-not-a-director/s5.jpg";
import s6 from "@/assets/storybook/advanced3-ep10-a-meme-not-a-director/s6.jpg";
import s7 from "@/assets/storybook/advanced3-ep10-a-meme-not-a-director/s7.jpg";
import s8 from "@/assets/storybook/advanced3-ep10-a-meme-not-a-director/s8.jpg";
import s9 from "@/assets/storybook/advanced3-ep10-a-meme-not-a-director/s9.jpg";

export const ADVANCED3_EP10_A_MEME_NOT_A_DIRECTOR: StorybookEpisode = {
  id: "advanced3-ep10-a-meme-not-a-director",
  moduleId: "advanced-3",
  week: 2,
  title: "A meme, not a director",
  titleEs: "Un meme, no un director",
  episodeLabel: {
    en: "Advanced 3 · Episode 10",
    es: "Advanced 3 · Episodio 10",
  },
  previously: [
    {
      en: "Two columns with Julieta. Row four, the choice, is still empty.",
      es: "Dos columnas con Julieta. La fila cuatro, la elección, sigue vacía.",
    },
    {
      en: "'It's harder, but you don't have to choose only one.' He's never said it to himself.",
      es: "'Es más difícil, pero no tienes que elegir solo una'. Nunca se lo ha dicho a sí mismo.",
    },
    {
      en: "Friday, nine a.m. The board. The offer expires at five.",
      es: "Viernes, nueve a.m. La junta. La oferta vence a las cinco.",
    },
  ],
  reviewWords: [
    { word: "claim", es: "afirmación" },
    { word: "board", es: "junta directiva" },
    { word: "respond", es: "responder" },
    { word: "fair", es: "justo" },
    { word: "vote", es: "voto" },
  ],
  blurb: {
    en: "The board, in person. Reed says the sentence he had ready: 'You're a meme, not a director.' Dani doesn't have to win; he has to respond. Claim, reason, example, and an answer to the fair point. He gets one number wrong and Camila fixes it in front of everyone. The board votes no. Barrett: 'You didn't win.' Dani: 'I didn't need to.'",
    es: "La junta, en persona. Reed dice la frase que tenía lista: 'Eres un meme, no un director'. Dani no tiene que ganar; tiene que responder. Afirmación, razón, ejemplo, y una respuesta al punto justo. Se equivoca en un número y Camila lo corrige frente a todos. La junta vota que no. Barrett: 'No ganaste'. Dani: 'No necesitaba ganar'.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Friday, 9:00 a.m.; a larger boardroom at Northline with a long table; Mr. Reed at the head in his navy suit, Barrett to his right, Camila with her tablet, Vale at the far end in her mustard blouse, two generic Northline directors in dark suits with their backs mostly to camera; Dani standing at the near end with Julieta's two columns printed on one page.",
      text: "Friday, 9:00 a.m. The board. Vale at the far end, saying nothing.",
      es: "Viernes, 9:00 a.m. La junta. Vale al fondo, sin decir nada.",
      speaker: "reed",
      cast: ["reed", "barrett", "camila", "vale", "dani"],
      lines: [
        {
          speaker: "reed",
          text: "Mr. Dani. Two million views, a podcast, a livestream, and a board that has to decide whether to give you three countries. I'll say what I think so you can push back on it. You're a meme, not a director. A video doesn't make a training program.",
          es: "Señor Dani. Dos millones de vistas, un podcast, un en vivo, y una junta que tiene que decidir si le da tres países. Voy a decir lo que pienso para que pueda rebatirlo. Es un meme, no un director. Un video no hace un programa de entrenamiento.",
        },
        {
          speaker: "dani",
          text: "That's fair. Let me respond to it.",
          es: "Es justo. Déjeme responder.",
        },
      ],
      words: [
        { word: "decide", es: "decidir" },
        { word: "whether", es: "si" },
        { word: "program", es: "programa" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Close on Dani, the printed page flat on the table under his hand, not reading it; Reed's face across the table, unreadable.",
      text: "Claim first. Then the reason.",
      es: "Primero la afirmación. Luego la razón.",
      speaker: "dani",
      cast: ["dani", "reed"],
      lines: [
        {
          speaker: "dani",
          text: "I'd say the floor made the program, and the video only showed forty seconds of it. My main reason is the number: seventeen of twenty agents passed an audit run by Crown, not by us, on real calls, on day ninety. That number existed before the video and it doesn't care about the video.",
          es: "Diría que el piso hizo el programa, y el video solo mostró cuarenta segundos de él. Mi razón principal es el número: diecisiete de veinte agentes pasaron una auditoría hecha por Crown, no por nosotros, en llamadas reales, el día noventa. Ese número existía antes del video y al video no le importa.",
        },
        {
          speaker: "reed",
          text: "Seventeen of twenty on one floor. I'm being asked about three.",
          es: "Diecisiete de veinte en un piso. Me están preguntando por tres.",
        },
      ],
      words: [
        { word: "claim", es: "afirmación" },
        { word: "audit", es: "auditoría" },
        { word: "existed", es: "existía" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Camila's tablet on the table, a chart of escalations sliding down; Camila's finger on the last bar; Dani mid-sentence looking at Reed, not at the chart.",
      text: "The example. And the number he gets wrong.",
      es: "El ejemplo. Y el número en el que se equivoca.",
      speaker: "dani",
      cast: ["dani", "camila", "reed"],
      lines: [
        {
          speaker: "dani",
          text: "For example, Bogotá learned the case process from an agent, not from me, in forty minutes, and their escalations went down twenty percent in the first week.",
          es: "Por ejemplo, Bogotá aprendió el proceso de casos de una agente, no de mí, en cuarenta minutos, y sus escalaciones bajaron veinte por ciento la primera semana.",
        },
        {
          speaker: "camila",
          text: "Twenty-two. Bogotá is twenty-two. Twenty was here in week eight.",
          es: "Veintidós. Bogotá es veintidós. Veinte fue aquí en la semana ocho.",
        },
        {
          speaker: "dani",
          text: "Camila's right. Twenty-two. I'd rather be corrected in this room than trusted with the wrong number in three.",
          es: "Camila tiene razón. Veintidós. Prefiero que me corrijan en esta sala a que me confíen el número equivocado en tres.",
        },
      ],
      words: [
        { word: "escalations", es: "escalaciones" },
        { word: "corrected", es: "corregido" },
        { word: "trusted", es: "confiado" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Reed leaning forward with both hands on the table; Barrett very still beside him; Vale at the far end with her chin on her hand, watching Dani, not Reed.",
      text: "Reed pushes back. Dani doesn't have to win.",
      es: "Reed presiona. Dani no tiene que ganar.",
      speaker: "reed",
      cast: ["reed", "dani", "barrett", "vale"],
      lines: [
        {
          speaker: "reed",
          text: "A director doesn't get corrected by his finance person in front of a board. A director doesn't tell legal 'it's how I work'. A director doesn't put a lawyer's statement face down on the floor in front of four hundred people.",
          es: "Un director no es corregido por su persona de finanzas frente a una junta. Un director no le dice a legal 'así trabajo yo'. Un director no pone la declaración de un abogado boca abajo en el piso frente a cuatrocientas personas.",
        },
        {
          speaker: "dani",
          text: "That's a fair point about the statement, and I'm not saying I'd do it differently. But I still think the question isn't whether I'm a director. It's whether the floor works without me. Seventeen of twenty says it does. Bogotá says it does. What I mean is: if the program only worked with me in the room, it wouldn't be a program.",
          es: "Es un punto justo sobre la declaración, y no digo que lo haría distinto. Pero sigo pensando que la pregunta no es si soy un director. Es si el piso funciona sin mí. Diecisiete de veinte dice que sí. Bogotá dice que sí. Lo que quiero decir es: si el programa solo funcionara conmigo en la sala, no sería un programa.",
        },
      ],
      words: [
        { word: "differently", es: "distinto" },
        { word: "question", es: "pregunta" },
        { word: "works", es: "funciona" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "The boardroom from the door: Dani outside in the corridor now, standing by the glass; inside, the board members' heads turned toward each other, Barrett speaking, Vale still, Reed writing.",
      text: "9:40 a.m. They vote without him in the room. It takes eleven minutes.",
      es: "9:40 a.m. Votan sin él en la sala. Toma once minutos.",
      speaker: "barrett",
      cast: ["barrett", "reed", "vale"],
      lines: [
        {
          speaker: "barrett",
          text: "For the record: he answered every point. He didn't win any of them. That's the job.",
          es: "Para que conste: respondió cada punto. No ganó ninguno. Ese es el trabajo.",
        },
        {
          speaker: "reed",
          text: "For the record: the global role is on hold until legal closes the clip matter. Not a no. A not yet. Ms. Barrett's floor continues as is.",
          es: "Para que conste: el puesto global queda en espera hasta que legal cierre el asunto del clip. No es un no. Es un todavía no. El piso de Ms. Barrett continúa como está.",
        },
        {
          speaker: "vale",
          text: "For the record: I have nothing to add.",
          es: "Para que conste: no tengo nada que agregar.",
        },
      ],
      words: [
        { word: "record", es: "acta" },
        { word: "hold", es: "espera" },
        { word: "continues", es: "continúa" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "The corridor; Barrett coming out of the boardroom, closing the door behind her; Dani by the glass with the printed page folded in his pocket.",
      text: "9:52 a.m. Barrett comes out first.",
      es: "9:52 a.m. Barrett sale primero.",
      speaker: "barrett",
      cast: ["barrett", "dani"],
      lines: [
        {
          speaker: "barrett",
          text: "On hold. Not a no. Reed used the words 'not yet', which from Reed is a compliment. You didn't win.",
          es: "En espera. No es un no. Reed usó las palabras 'todavía no', que viniendo de Reed es un cumplido. No ganó.",
        },
        {
          speaker: "dani",
          text: "I didn't need to.",
          es: "No necesitaba ganar.",
        },
        {
          speaker: "barrett",
          text: "You corrected yourself in front of six people who were looking for a reason to say no. Three of them wrote that down instead of the twenty. The letter on my desk is on hold too. Nobody has to answer anything by five.",
          es: "Se corrigió frente a seis personas que buscaban una razón para decir que no. Tres de ellas anotaron eso en vez del veinte. La carta en mi escritorio también queda en espera. Nadie tiene que contestar nada a las cinco.",
        },
      ],
      words: [
        { word: "compliment", es: "cumplido" },
        { word: "reason", es: "razón" },
        { word: "letter", es: "carta" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "The floor at 11:00; Mía and Nico at their desks, both with headsets around their necks, both very obviously waiting; Dani walking down the row with the folded page.",
      text: "11:00 a.m. The floor wants a verdict. There isn't one.",
      es: "11:00 a.m. El piso quiere un veredicto. No hay.",
      speaker: "mia",
      cast: ["mia", "nico", "dani"],
      lines: [
        {
          speaker: "mia",
          text: "So? Miami?",
          es: "¿Entonces? ¿Miami?",
        },
        {
          speaker: "dani",
          text: "On hold. Not a no. Not a yes. Reed's words.",
          es: "En espera. No es un no. No es un sí. Palabras de Reed.",
        },
        {
          speaker: "nico",
          text: "That's a not yet. You gave me one of those on a sticky note.",
          es: "Eso es un todavía no. Me diste uno de esos en una nota adhesiva.",
        },
        {
          speaker: "mia",
          text: "Did you lose, jefe?",
          es: "¿Perdiste, jefe?",
        },
        {
          speaker: "dani",
          text: "I got a number wrong and Camila fixed it. I said 'that's a fair point' to a man who called me a meme. And I still have Thursdays. So: yes, I lost, and I'm still here.",
          es: "Me equivoqué en un número y Camila lo corrigió. Le dije 'es un punto justo' a un hombre que me llamó meme. Y todavía tengo los jueves. Así que: sí, perdí, y sigo aquí.",
        },
      ],
      words: [
        { word: "verdict", es: "veredicto" },
        { word: "lose", es: "perder" },
        { word: "still", es: "todavía" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale's small car parked outside Northline in daylight, engine off; Vale at the wheel, Dani in the passenger seat; the folded page on the dashboard between them, unfolded now.",
      text: "6:00 p.m. Vale said nothing in the room. She says it here.",
      es: "6:00 p.m. Vale no dijo nada en la sala. Lo dice aquí.",
      speaker: "vale",
      cast: ["vale", "dani"],
      lines: [
        {
          speaker: "vale",
          text: "'I'd rather be corrected in this room than trusted with the wrong number in three.' Three directors wrote that down. I watched their pens.",
          es: "'Prefiero que me corrijan en esta sala a que me confíen el número equivocado en tres'. Tres directores lo anotaron. Vi sus bolígrafos.",
        },
        {
          speaker: "dani",
          text: "You had nothing to add.",
          es: "No tenías nada que agregar.",
        },
        {
          speaker: "vale",
          text: "I had nine years to add. I didn't, because the point of nine years is that you don't need me in the room anymore. Monday, the small room. I'm going to tell you how it was before you. You've never heard it.",
          es: "Tenía nueve años que agregar. No lo hice, porque el punto de nueve años es que ya no me necesitas en la sala. El lunes, el salón pequeño. Te voy a contar cómo era antes de ti. Nunca lo has oído.",
        },
      ],
      words: [
        { word: "pens", es: "bolígrafos" },
        { word: "anymore", es: "ya no" },
        { word: "before", es: "antes" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Night; the bus stop; Dani alone with his phone to his ear; the Northline sign lit; his headset around his neck for the first time this week. Only Dani is drawn; the caller is a voice on the phone.",
      text: "9:30 p.m. His mother. He didn't wait for her to ask.",
      es: "9:30 p.m. Su mamá. No esperó a que preguntara.",
      speaker: "dani",
      lines: [
        {
          speaker: "dani",
          text: "I ate, mamá. And I lost a meeting today. On purpose, a little.",
          es: "Comí, mamá. Y hoy perdí una reunión. A propósito, un poco.",
        },
        {
          speaker: "estela",
          text: "Mijo. Your grandmother lost every argument in this house for forty years and won every single thing that mattered. Come home. There's soup.",
          es: "Mijo. Tu abuela perdió todas las discusiones en esta casa durante cuarenta años y ganó todas las cosas que importaban. Vente a la casa. Hay sopa.",
        },
      ],
      words: [
        { word: "purpose", es: "propósito" },
        { word: "argument", es: "discusión" },
        { word: "soup", es: "sopa" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "How does Dani respond to 'you're a meme, not a director'?",
      questionEs: "¿Cómo responde Dani a 'eres un meme, no un director'?",
      options: [
        { label: "He admits the fair point and says the real question is whether the floor works without him", emoji: "🎯" },
        { label: "He says the video proves he's a director", emoji: "🎥" },
        { label: "He apologizes and withdraws from the role", emoji: "🙇" },
      ],
      answer: 0,
      sayIt: "He admits the fair point and says the real question is whether the floor works without him.",
      sayItEs: "Admite el punto justo y dice que la pregunta real es si el piso funciona sin él.",
      sayItCheck: {
        target: "* whether the floor works without him",
        altTargets: ["He admits the fair point *", "The real question is *", "That's a fair point *"],
      },
    },
    {
      id: "q2",
      afterScene: "s4",
      questionEn: "Someone pushes back on your opinion. Give your claim, your reason, an example, admit their fair point, and hold your position.",
      questionEs: "Alguien cuestiona tu opinión. Da tu afirmación, tu razón, un ejemplo, admite su punto justo, y mantén tu posición.",
      options: [
        { label: "I am ready to answer", emoji: "🎧" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "I'd say social media does more harm than good for most young people. My main reason is that it's designed to keep your attention. That's a fair point about businesses, and I'm not saying it's useless. But I still think we need clearer limits.",
      sayItEs: "Diría que las redes sociales hacen más daño que bien a la mayoría de los jóvenes. Mi razón principal es que están diseñadas para retener tu atención. Es un punto justo sobre los negocios, y no digo que sean inútiles. Pero sigo pensando que necesitamos límites más claros.",
      sayItAskEn: "Start with \"I'd say ...\", then \"My main reason is ...\", then \"That's a fair point about ...\", and close with \"But I still think ...\".",
      sayItAskEs: "Empieza con \"I'd say …\", luego \"My main reason is …\", después \"That's a fair point about …\" y cierra con \"But I still think …\".",
      sayItCheck: {
        target: "That's a fair point *",
        altTargets: ["I still think *", "What I mean is *", "Fair point *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s6",
    phrase: "I don't have to win the room. I have to respond to it, and be corrected in it without flinching.",
    es: "No tengo que ganar la sala. Tengo que responderle, y dejar que me corrijan en ella sin inmutarme.",
  },
  habitCard: {
    afterScene: "s3",
    phrase: "When someone corrects my number in public, I say their name and the right number in the same breath.",
    es: "Cuando alguien corrige mi número en público, digo su nombre y el número correcto en la misma frase.",
    model: "dani",
    modelActionEs: "Dani dijo veinte, Camila dijo veintidós, y Dani dijo 'Camila tiene razón, veintidós' frente a la junta sin defenderse.",
  },
  expressions: [
    {
      phrase: "push back",
      variants: ["pushes back", "pushed back", "pushing back"],
      es: "cuestionar, oponerse, presionar en contra",
      kind: "phrasal",
      example: "I'll say what I think so you can push back on it.",
      exampleEs: "Voy a decir lo que pienso para que pueda rebatirlo.",
    },
    {
      phrase: "write down",
      variants: ["wrote that down", "written down", "writes down"],
      es: "anotar",
      kind: "phrasal",
      example: "Three of them wrote that down instead of the twenty.",
      exampleEs: "Tres de ellas anotaron eso en vez del veinte.",
    },
    {
      phrase: "on hold",
      variants: ["put on hold", "is on hold"],
      es: "en espera, en pausa",
      kind: "idiom",
      example: "On hold. Not a no. Reed used the words 'not yet', which from Reed is a compliment. You didn't win.",
      exampleEs: "En espera. No es un no. Reed usó las palabras 'todavía no', que viniendo de Reed es un cumplido. No ganó.",
    },
    {
      phrase: "for the record",
      variants: ["for the record,", "off the record"],
      es: "para que conste",
      kind: "idiom",
      example: "For the record: he answered every point. He didn't win any of them. That's the job.",
      exampleEs: "Para que conste: respondió cada punto. No ganó ninguno. Ese es el trabajo.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: someone with more power than you says you're wrong. Your claim, one reason, one example, the part of their point that's fair, and what you still think.",
    es: "Treinta segundos: alguien con más poder que tú dice que estás equivocado. Tu afirmación, una razón, un ejemplo, la parte de su punto que es justa, y lo que sigues pensando.",
  },
  continueWith: [
    "I'd say ... My main reason is ...",
    "For example, ...",
    "That's a fair point about ..., and I'm not saying ...",
    "But I still think ... What I mean is ...",
  ],
  cliffhanger: {
    en: "Monday: the small room, the chairs in a circle, and Vale telling Dani how the academy was before him. She's never told anyone.",
    es: "Lunes: el salón pequeño, las sillas en círculo, y Vale contándole a Dani cómo era la academia antes de él. Nunca se lo ha contado a nadie.",
  },
};
