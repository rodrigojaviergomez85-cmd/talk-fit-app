import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced3-ep8-nico-wants-to-quit/cover.jpg";
import s1 from "@/assets/storybook/advanced3-ep8-nico-wants-to-quit/s1.jpg";
import s2 from "@/assets/storybook/advanced3-ep8-nico-wants-to-quit/s2.jpg";
import s3 from "@/assets/storybook/advanced3-ep8-nico-wants-to-quit/s3.jpg";
import s4 from "@/assets/storybook/advanced3-ep8-nico-wants-to-quit/s4.jpg";
import s5 from "@/assets/storybook/advanced3-ep8-nico-wants-to-quit/s5.jpg";
import s6 from "@/assets/storybook/advanced3-ep8-nico-wants-to-quit/s6.jpg";
import s7 from "@/assets/storybook/advanced3-ep8-nico-wants-to-quit/s7.jpg";
import s8 from "@/assets/storybook/advanced3-ep8-nico-wants-to-quit/s8.jpg";
import s9 from "@/assets/storybook/advanced3-ep8-nico-wants-to-quit/s9.jpg";

export const ADVANCED3_EP8_NICO_WANTS_TO_QUIT: StorybookEpisode = {
  id: "advanced3-ep8-nico-wants-to-quit",
  moduleId: "advanced-3",
  week: 2,
  title: "Nico wants to quit",
  titleEs: "Nico quiere renunciar",
  episodeLabel: {
    en: "Advanced 3 · Episode 8",
    es: "Advanced 3 · Episodio 8",
  },
  previously: [
    {
      en: "The app for the repetitions, the room for the fear. Camila's budget came in cheaper.",
      es: "La app para las repeticiones, el salón para el miedo. El presupuesto de Camila salió más barato.",
    },
    {
      en: "Reed: 'A man who says no by reflex is not easy to defend.'",
      es: "Reed: 'Un hombre que dice que no por reflejo no es fácil de defender'.",
    },
    {
      en: "Nico has forty thousand followers and something to say tomorrow.",
      es: "Nico tiene cuarenta mil seguidores y algo que decir mañana.",
    },
  ],
  reviewWords: [
    { word: "advice", es: "consejo" },
    { word: "quit", es: "renunciar" },
    { word: "streaming", es: "transmisión en vivo" },
    { word: "consequence", es: "consecuencia" },
    { word: "hobby", es: "pasatiempo" },
  ],
  blurb: {
    en: "Nico wants to leave Northline to stream games to forty thousand strangers. Dani's first word is 'don't', and Mía reminds him whose Thursday it is. So he gives advice the way it's supposed to be given: what he understands, what Nico should do, why, and what happens if he does. Six months, with a plan. Nico: 'That's not what a boss says.' Dani: 'I know.'",
    es: "Nico quiere dejar Northline para transmitir videojuegos a cuarenta mil desconocidos. La primera palabra de Dani es 'no lo hagas', y Mía le recuerda de quién es el jueves. Entonces aconseja como se debe: qué entiende, qué debería hacer Nico, por qué, y qué pasa si lo hace. Seis meses, con un plan. Nico: 'Eso no es lo que dice un jefe'. Dani: 'Lo sé'.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Wednesday, 7:30 a.m., before the floor opens; Nico and Dani alone at their desks with the lights half on; Nico with his hood down and his phone face up showing a streaming channel: THE KID, 40.2K followers.",
      text: "Wednesday, 7:30 a.m. Before the floor opens. Nico says it.",
      es: "Miércoles, 7:30 a.m. Antes de que abra el piso. Nico lo dice.",
      speaker: "nico",
      cast: ["nico", "dani"],
      lines: [
        {
          speaker: "nico",
          text: "I want to leave Northline. Stream games full time. Forty thousand people since the clip, and last night two hundred of them paid to watch me lose. I make more in a good night than in a week here.",
          es: "Quiero dejar Northline. Transmitir videojuegos a tiempo completo. Cuarenta mil personas desde el clip, y anoche doscientas pagaron por verme perder. Gano más en una buena noche que en una semana aquí.",
        },
        {
          speaker: "dani",
          text: "Don't.",
          es: "No lo hagas.",
        },
        {
          speaker: "nico",
          text: "That's the reflex. I asked you not to.",
          es: "Ese es el reflejo. Te pedí que no.",
        },
      ],
      words: [
        { word: "stream", es: "transmitir" },
        { word: "paid", es: "pagaron" },
        { word: "reflex", es: "reflejo" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Mía arriving with her backpack, stopping at the end of the row, headset around her neck; Dani turning toward her; Nico not moving.",
      text: "Mía arrives in the middle of it. She knows whose Thursday it is.",
      es: "Mía llega en medio. Sabe de quién es el jueves.",
      speaker: "mia",
      cast: ["mia", "dani", "nico"],
      lines: [
        {
          speaker: "mia",
          text: "I heard 'don't' from the door. You told me my choice was mine, in Barrett's office, with a comma. His is his.",
          es: "Oí 'no lo hagas' desde la puerta. Me dijiste que mi elección era mía, en la oficina de Barrett, con una coma. La de él es de él.",
        },
        {
          speaker: "dani",
          text: "Fair. Once. Nico, let me start again, and this time I'm not going to tell you what to do until I've said what I understand.",
          es: "Justo. Una vez. Nico, empiezo otra vez, y esta vez no te voy a decir qué hacer hasta que haya dicho lo que entiendo.",
        },
        {
          speaker: "nico",
          text: "Go.",
          es: "Dale.",
        },
      ],
      words: [
        { word: "heard", es: "oí" },
        { word: "comma", es: "coma" },
        { word: "understand", es: "entiendo" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Close on the two of them at the desks, Dani turned fully toward Nico, hands open; on Nico's phone, the channel page with a schedule: 10 p.m. to 2 a.m.",
      text: "First, what he understands.",
      es: "Primero, lo que entiende.",
      speaker: "dani",
      cast: ["dani", "nico"],
      lines: [
        {
          speaker: "dani",
          text: "First of all, what I understand is this: you have forty thousand people who showed up because of forty seconds, you stream from ten to two after a full shift, and the money was real one night. And the thing you actually like isn't the money; it's that nobody there calls you the kid.",
          es: "Antes que nada, lo que entiendo es esto: tienes cuarenta mil personas que llegaron por cuarenta segundos, transmites de diez a dos después de un turno completo, y el dinero fue real una noche. Y lo que realmente te gusta no es el dinero; es que ahí nadie te dice el muchacho.",
        },
        {
          speaker: "nico",
          text: "They call me the kid. All of them. It's the channel name.",
          es: "Me dicen el muchacho. Todos. Es el nombre del canal.",
        },
        {
          speaker: "dani",
          text: "But you chose it.",
          es: "Pero lo elegiste tú.",
        },
        {
          speaker: "nico",
          text: "...Continue.",
          es: "...Continúa.",
        },
      ],
      words: [
        { word: "shift", es: "turno" },
        { word: "actually", es: "realmente" },
        { word: "chose", es: "elegiste" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Dani drawing a small calendar on a sticky note: six boxes, three of them shaded; sliding it across to Nico's side of the divider.",
      text: "Then the advice. Then why. Then what happens if he does it.",
      es: "Luego el consejo. Luego el porqué. Luego qué pasa si lo hace.",
      speaker: "dani",
      cast: ["dani", "nico"],
      lines: [
        {
          speaker: "dani",
          text: "I'd say you should try it for six months with a plan, not quit tomorrow without one. You could try streaming three nights a week instead of five, and keeping the two-to-ten shift. The reason is simple: the first months of anything pay nothing, and forty thousand people who came for a clip leave for the next clip.",
          es: "Diría que deberías intentarlo seis meses con un plan, no renunciar mañana sin uno. Podrías probar transmitir tres noches por semana en vez de cinco, y mantener el turno de dos a diez. La razón es simple: los primeros meses de cualquier cosa no pagan nada, y cuarenta mil personas que vinieron por un clip se van por el siguiente clip.",
        },
        {
          speaker: "nico",
          text: "And if I do that?",
          es: "¿Y si hago eso?",
        },
        {
          speaker: "dani",
          text: "If you do that, by March you'll know if it's a job or a hobby, and you'll know it with rent paid. That way the decision is yours in March, not the algorithm's in October.",
          es: "Si haces eso, para marzo vas a saber si es un trabajo o un pasatiempo, y lo vas a saber con la renta pagada. Así la decisión es tuya en marzo, no del algoritmo en octubre.",
        },
        {
          speaker: "nico",
          text: "That's not what a boss says.",
          es: "Eso no es lo que dice un jefe.",
        },
        {
          speaker: "dani",
          text: "I know.",
          es: "Lo sé.",
        },
      ],
      words: [
        { word: "quit", es: "renunciar" },
        { word: "hobby", es: "pasatiempo" },
        { word: "algorithm", es: "algoritmo" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "The floor, 10:00 a.m., full now; Óscar at the club's sign-up table by the door, no badge, with his cousin, a boy of about eighteen in a plain white T-shirt, both looking at Nico's channel on a phone.",
      text: "10:00 a.m. Óscar's cousin already follows him.",
      es: "10:00 a.m. El primo de Óscar ya lo sigue.",
      speaker: "oscar",
      cast: ["oscar", "nico"],
      lines: [
        {
          speaker: "oscar",
          text: "My cousin says you lost four games last night and two hundred people stayed anyway. He says that's the whole reason he stays: you don't pretend.",
          es: "Mi primo dice que anoche perdiste cuatro partidas y doscientas personas se quedaron igual. Dice que esa es toda la razón por la que se queda: no finges.",
        },
        {
          speaker: "nico",
          text: "I don't pretend here either. Nobody pays for it here.",
          es: "Aquí tampoco finjo. Aquí nadie paga por eso.",
        },
        {
          speaker: "oscar",
          text: "Northline does. Every two weeks.",
          es: "Northline sí. Cada dos semanas.",
        },
        {
          speaker: "nico",
          text: "...That's a fifth sentence. I wasn't ready for it.",
          es: "...Esa es una quinta frase. No estaba listo para ella.",
        },
      ],
      words: [
        { word: "pretend", es: "fingir" },
        { word: "stays", es: "se queda" },
        { word: "ready", es: "listo" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Ms. Barrett at the end of the row with a printed schedule, Nico standing in front of her with his hood down, Dani two desks away not looking.",
      text: "1:00 p.m. Barrett already knows. Barrett always knows.",
      es: "1:00 p.m. Barrett ya sabe. Barrett siempre sabe.",
      speaker: "barrett",
      cast: ["barrett", "nico", "dani"],
      lines: [
        {
          speaker: "barrett",
          text: "Three nights a week, two to ten kept, six months, then you tell me. Your manager wrote it on a sticky note. Sticky notes aren't contracts. This is. Sign it or don't.",
          es: "Tres noches por semana, el dos a diez se mantiene, seis meses, y después me dices. Tu gerente lo escribió en una nota adhesiva. Las notas adhesivas no son contratos. Esto sí. Fírmalo o no.",
        },
        {
          speaker: "nico",
          text: "You made a contract out of advice?",
          es: "¿Hizo un contrato de un consejo?",
        },
        {
          speaker: "barrett",
          text: "I made a contract out of the only agent on this floor who ends calls at the second warning. I'd rather keep you three nights than lose you five.",
          es: "Hice un contrato del único agente de este piso que termina llamadas a la segunda advertencia. Prefiero tenerte tres noches que perderte cinco.",
        },
      ],
      words: [
        { word: "contracts", es: "contratos" },
        { word: "sign", es: "firmar" },
        { word: "rather", es: "prefiero" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Break room; Mía on the counter, Nico at the table with the unsigned contract and a pen, Dani leaning on the fridge; the vending machine humming.",
      text: "3:00 p.m. The pen is on the table. Nobody touches it.",
      es: "3:00 p.m. El bolígrafo está en la mesa. Nadie lo toca.",
      speaker: "mia",
      cast: ["mia", "nico", "dani"],
      lines: [
        {
          speaker: "mia",
          text: "You should sign it. That way you get March. Without it you get October and a bad night.",
          es: "Deberías firmarlo. Así te queda marzo. Sin eso te queda octubre y una mala noche.",
        },
        {
          speaker: "nico",
          text: "You're giving me advice now.",
          es: "Ahora tú me estás aconsejando.",
        },
        {
          speaker: "mia",
          text: "I learned it this morning from a guy who said 'don't' first.",
          es: "Lo aprendí esta mañana de un tipo que dijo 'no lo hagas' primero.",
        },
        {
          speaker: "dani",
          text: "I'm not going to say anything. It's his pen.",
          es: "No voy a decir nada. Es su bolígrafo.",
        },
        {
          speaker: "nico",
          text: "That's four sentences you didn't say. I counted.",
          es: "Son cuatro frases que no dijiste. Las conté.",
        },
      ],
      words: [
        { word: "sign", es: "firmar" },
        { word: "advice", es: "consejo" },
        { word: "pen", es: "bolígrafo" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Dani's desk at 6:00 p.m.; a video call on the laptop with Julieta in her white shirt and badge; a sticky note on the monitor: FRIDAY, BOARD, 9 AM.",
      text: "6:00 p.m. Julieta, with a question for tomorrow.",
      es: "6:00 p.m. Julieta, con una pregunta para mañana.",
      speaker: "julieta",
      cast: ["julieta", "dani"],
      lines: [
        {
          speaker: "julieta",
          text: "The board is Friday, the offer expires the same day, and you still haven't compared them out loud. Tomorrow at seven, me and you, two columns. Miami and here. I'll do the rows. You do the honesty.",
          es: "La junta es el viernes, la oferta vence el mismo día, y todavía no las has comparado en voz alta. Mañana a las siete, tú y yo, dos columnas. Miami y aquí. Yo hago las filas. Tú pones la honestidad.",
        },
        {
          speaker: "dani",
          text: "Why you?",
          es: "¿Por qué tú?",
        },
        {
          speaker: "julieta",
          text: "Because I'm the only person in this story who has nothing to gain from either answer.",
          es: "Porque soy la única persona en esta historia que no gana nada con ninguna de las dos respuestas.",
        },
      ],
      words: [
        { word: "compared", es: "comparado" },
        { word: "columns", es: "columnas" },
        { word: "gain", es: "ganar" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Night; Mía's phone screen in the dark of the bus stop: Nico's stream, live, THE KID in the corner, Nico with his hood down looking into the camera; Mía alone on the bench watching it.",
      text: "10:02 p.m. His first stream since the contract. Mía watches from the bench.",
      es: "10:02 p.m. Su primera transmisión desde el contrato. Mía la ve desde la banca.",
      speaker: "mia",
      cast: ["mia", "nico"],
      lines: [
        {
          speaker: "nico",
          text: "Hi. I'm the kid. Three nights a week from now on. The other four I'm somewhere else, and it's not a secret, it's a job. If you leave, that's fine. Five seconds. Okay. Let's lose.",
          es: "Hola. Soy el muchacho. Tres noches por semana de ahora en adelante. Las otras cuatro estoy en otro lugar, y no es un secreto, es un trabajo. Si se van, está bien. Cinco segundos. Ok. Vamos a perder.",
        },
        {
          speaker: "mia",
          text: "He signed it.",
          es: "Lo firmó.",
        },
      ],
      words: [
        { word: "secret", es: "secreto" },
        { word: "leave", es: "irse" },
        { word: "signed", es: "firmó" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What does Dani advise Nico to do?",
      questionEs: "¿Qué le aconseja Dani a Nico?",
      options: [
        { label: "Try it six months with a plan: three nights a week, keep the shift, decide in March", emoji: "🗓️" },
        { label: "Quit Northline tomorrow and stream full time", emoji: "🎮" },
        { label: "Delete the channel and focus on the audit", emoji: "🗑️" },
      ],
      answer: 0,
      sayIt: "Try it six months with a plan: three nights a week, keep the shift, decide in March.",
      sayItEs: "Intentarlo seis meses con un plan: tres noches por semana, mantener el turno, decidir en marzo.",
      sayItCheck: {
        target: "* six months with a plan *",
        altTargets: ["Try it for six months *", "Three nights a week *", "* decide in March"],
      },
    },
    {
      id: "q2",
      afterScene: "s4",
      questionEn: "A friend is nervous about a big change. Say what you understand, what they should do, why, and what happens if they do it.",
      questionEs: "Un amigo está nervioso por un cambio grande. Di qué entiendes, qué debería hacer, por qué, y qué pasa si lo hace.",
      options: [
        { label: "I am ready to answer", emoji: "🎧" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "First of all, being nervous before a new job is completely normal. I'd say you should prepare three or four sentences you know you'll need. You could try writing them down and saying them out loud tonight. That way, people will remember that you communicate, not that you're perfect.",
      sayItEs: "Antes que nada, estar nervioso antes de un trabajo nuevo es completamente normal. Diría que deberías preparar tres o cuatro frases que sabes que vas a necesitar. Podrías probar escribirlas y decirlas en voz alta esta noche. Así, la gente va a recordar que te comunicas, no que eres perfecto.",
      sayItAskEn: "Start with \"First of all, ...\", then \"I'd say you should ...\", then \"You could try ...\", and close with \"That way, ...\".",
      sayItAskEs: "Empieza con \"First of all, …\", luego \"I'd say you should …\", después \"You could try …\" y cierra con \"That way, …\".",
      sayItCheck: {
        target: "* you should *",
        altTargets: ["You could try *", "That way *", "First of all *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s2",
    phrase: "Advice starts with what I understand, not with what I want.",
    es: "Un consejo empieza con lo que entiendo, no con lo que quiero.",
  },
  habitCard: {
    afterScene: "s4",
    phrase: "When I give advice, I end with what happens if they take it, and it has a date.",
    es: "Cuando doy un consejo, termino con qué pasa si lo toman, y tiene fecha.",
    model: "dani",
    modelActionEs: "Dani no le dijo a Nico que se quedara; le dio seis meses, tres noches y una fecha en marzo para saber si era trabajo o pasatiempo.",
  },
  expressions: [
    {
      phrase: "show up",
      variants: ["showed up", "shows up", "showing up"],
      es: "aparecer, presentarse",
      kind: "phrasal",
      example: "First of all, what I understand is this: you have forty thousand people who showed up because of forty seconds, you stream from ten to two after a full shift, and the money was real one night.",
      exampleEs: "Antes que nada, lo que entiendo es esto: tienes cuarenta mil personas que llegaron por cuarenta segundos, transmites de diez a dos después de un turno completo, y el dinero fue real una noche.",
    },
    {
      phrase: "make something out of",
      variants: ["made a contract out of", "make a job out of", "made something out of"],
      es: "convertir algo en otra cosa",
      kind: "phrasal",
      example: "I made a contract out of the only agent on this floor who ends calls at the second warning.",
      exampleEs: "Hice un contrato del único agente de este piso que termina llamadas a la segunda advertencia.",
    },
    {
      phrase: "that way",
      variants: ["that way,", "this way"],
      es: "así, de esa manera",
      kind: "idiom",
      example: "That way the decision is yours in March, not the algorithm's in October.",
      exampleEs: "Así la decisión es tuya en marzo, no del algoritmo en octubre.",
    },
    {
      phrase: "a job or a hobby",
      variants: ["job or hobby", "a hobby, not a job"],
      es: "un trabajo o un pasatiempo",
      kind: "idiom",
      example: "If you do that, by March you'll know if it's a job or a hobby, and you'll know it with rent paid.",
      exampleEs: "Si haces eso, para marzo vas a saber si es un trabajo o un pasatiempo, y lo vas a saber con la renta pagada.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: someone you care about wants to make a big change. What you understand about their situation, what they should do, why, and what happens if they do it, with a date.",
    es: "Treinta segundos: alguien que te importa quiere hacer un cambio grande. Qué entiendes de su situación, qué debería hacer, por qué, y qué pasa si lo hace, con fecha.",
  },
  continueWith: [
    "First of all, what I understand is ...",
    "I'd say you should ... You could try ...",
    "The reason is simple: ...",
    "If you do that, ... That way ...",
  ],
  cliffhanger: {
    en: "Tomorrow at seven: two columns with Julieta. Miami and here. She does the rows. He does the honesty. Then she asks the question Barrett didn't.",
    es: "Mañana a las siete: dos columnas con Julieta. Miami y aquí. Ella hace las filas. Él pone la honestidad. Después ella hace la pregunta que Barrett no hizo.",
  },
};
