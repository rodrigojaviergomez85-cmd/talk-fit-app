import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced3-ep4-mias-night/cover.jpg";
import s1 from "@/assets/storybook/advanced3-ep4-mias-night/s1.jpg";
import s2 from "@/assets/storybook/advanced3-ep4-mias-night/s2.jpg";
import s3 from "@/assets/storybook/advanced3-ep4-mias-night/s3.jpg";
import s4 from "@/assets/storybook/advanced3-ep4-mias-night/s4.jpg";
import s5 from "@/assets/storybook/advanced3-ep4-mias-night/s5.jpg";
import s6 from "@/assets/storybook/advanced3-ep4-mias-night/s6.jpg";
import s7 from "@/assets/storybook/advanced3-ep4-mias-night/s7.jpg";
import s8 from "@/assets/storybook/advanced3-ep4-mias-night/s8.jpg";
import s9 from "@/assets/storybook/advanced3-ep4-mias-night/s9.jpg";

export const ADVANCED3_EP4_MIAS_NIGHT: StorybookEpisode = {
  id: "advanced3-ep4-mias-night",
  moduleId: "advanced-3",
  week: 1,
  title: "Mía's night",
  titleEs: "La noche de Mía",
  episodeLabel: {
    en: "Advanced 3 · Episode 4",
    es: "Advanced 3 · Episodio 4",
  },
  previously: [
    {
      en: "Barrett offered Miami. Dani has a plan and no reason.",
      es: "Barrett ofreció Miami. Dani tiene un plan y ninguna razón.",
    },
    {
      en: "Month one of the plan: Mía runs the floor.",
      es: "Mes uno del plan: Mía maneja el piso.",
    },
    {
      en: "Vale: 'Tomorrow Mía is going to make your plan harder. Let her.'",
      es: "Vale: 'Mañana Mía te va a hacer el plan más difícil. Déjala'.",
    },
  ],
  reviewWords: [
    { word: "choice", es: "elección" },
    { word: "supervisor", es: "supervisora" },
    { word: "degree", es: "título universitario" },
    { word: "absolute", es: "absoluto" },
    { word: "convince", es: "convencer" },
  ],
  blurb: {
    en: "Barrett offers Mía the supervisor job: night team lead, thirty percent more. Mía says no, with a reason, an example and a close: the shift ends at eleven and her classes end at nine. Dani wants to convince her because his whole plan needs her yes. He starts the sentence and stops at the comma.",
    es: "Barrett le ofrece a Mía el puesto de supervisora: líder del equipo nocturno, treinta por ciento más. Mía dice que no, con una razón, un ejemplo y un cierre: el turno termina a las once y sus clases a las nueve. Dani quiere convencerla porque todo su plan necesita su sí. Empieza la frase y se detiene en la coma.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Thursday, 9:00 a.m.; Ms. Barrett's office; Mía seated across from Barrett with her headset around her neck, a one-page offer on the desk between them; Dani standing by the glass wall, not at the table.",
      text: "Thursday, 9:00 a.m. Barrett's office. Mía's turn.",
      es: "Jueves, 9:00 a.m. La oficina de Barrett. El turno de Mía.",
      speaker: "barrett",
      cast: ["barrett", "mia", "dani"],
      lines: [
        {
          speaker: "barrett",
          text: "Supervisor, night team. Two to eleven, thirty percent more, starting next month. Dani's plan has you running this floor in month one. I want to hear your choice, not his.",
          es: "Supervisora, equipo nocturno. De dos a once, treinta por ciento más, empezando el próximo mes. El plan de Dani te tiene manejando este piso en el mes uno. Quiero oír tu elección, no la de él.",
        },
        {
          speaker: "mia",
          text: "Can I take five seconds?",
          es: "¿Puedo tomarme cinco segundos?",
        },
        {
          speaker: "barrett",
          text: "Take ten.",
          es: "Tómate diez.",
        },
      ],
      words: [
        { word: "supervisor", es: "supervisora" },
        { word: "percent", es: "por ciento" },
        { word: "choice", es: "elección" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Close on Mía, hands flat on the desk the way Nico does it, looking at Barrett and not at Dani.",
      text: "Ten seconds. Then the choice, with everything attached.",
      es: "Diez segundos. Luego la elección, con todo lo que lleva.",
      speaker: "mia",
      cast: ["mia", "barrett"],
      lines: [
        {
          speaker: "mia",
          text: "For me, the better option is staying an agent. One reason is that the supervisor shift ends at eleven and my classes end at nine.",
          es: "Para mí, la mejor opción es seguir siendo agente. Una razón es que el turno de supervisora termina a las once y mis clases terminan a las nueve.",
        },
        {
          speaker: "mia",
          text: "I'd miss the last two hours of every class, every night, and the university doesn't have a two-to-ten option.",
          es: "Me perdería las últimas dos horas de cada clase, todas las noches, y la universidad no tiene opción de dos a diez.",
        },
        {
          speaker: "barrett",
          text: "Thirty percent is a lot of money for a class.",
          es: "Treinta por ciento es mucho dinero por una clase.",
        },
        {
          speaker: "mia",
          text: "For example, last week I taught fifteen people in Bogotá a process, and I got step three wrong and fixed it myself.",
          es: "Por ejemplo, la semana pasada le enseñé un proceso a quince personas en Bogotá, y me equivoqué en el paso tres y lo arreglé sola.",
        },
        {
          speaker: "mia",
          text: "I want to do that with a degree behind me, not instead of one.",
          es: "Quiero hacer eso con un título detrás, no en vez de uno.",
        },
      ],
      words: [
        { word: "classes", es: "clases" },
        { word: "miss", es: "perderme" },
        { word: "degree", es: "título" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Mía turning slightly toward Barrett with one hand open; Barrett writing; Dani by the glass with his mouth half open, one word out.",
      text: "The other side. Then the close. Then Dani opens his mouth.",
      es: "El otro lado. Luego el cierre. Luego Dani abre la boca.",
      speaker: "mia",
      cast: ["mia", "barrett", "dani"],
      lines: [
        {
          speaker: "mia",
          text: "On the other hand, I understand thirty percent is a lot for my family, and I understand the plan needs someone on this floor.",
          es: "Por otro lado, entiendo que treinta por ciento es mucho para mi familia, y entiendo que el plan necesita a alguien en este piso.",
        },
        {
          speaker: "mia",
          text: "So my choice isn't absolute: I'll take the supervisor job in two years, when I finish. Overall, I choose the degree first and the title second.",
          es: "Así que mi elección no es absoluta: acepto el puesto de supervisora en dos años, cuando termine. En general, elijo el título primero y el cargo segundo.",
        },
        {
          speaker: "dani",
          text: "Mía, if you take it, I can—",
          es: "Mía, si lo aceptas, yo puedo...",
        },
        {
          speaker: "mia",
          text: "Jefe.",
          es: "Jefe.",
        },
        {
          speaker: "dani",
          text: "...I stopped. That was about my plan, not your choice. It's your choice.",
          es: "...Me detuve. Eso era sobre mi plan, no sobre tu elección. Es tu elección.",
        },
        {
          speaker: "barrett",
          text: "Noted. Both of you.",
          es: "Anotado. Los dos.",
        },
      ],
      words: [
        { word: "family", es: "familia" },
        { word: "absolute", es: "absoluta" },
        { word: "stopped", es: "me detuve" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "The floor; Nico at his desk turning his chair toward Dani, who has just sat down heavily; Mía already back on a call two desks away.",
      text: "9:30 a.m. Nico saw the comma.",
      es: "9:30 a.m. Nico vio la coma.",
      speaker: "nico",
      cast: ["nico", "dani"],
      lines: [
        {
          speaker: "nico",
          text: "You almost made it about you.",
          es: "Casi lo hiciste sobre ti.",
        },
        {
          speaker: "dani",
          text: "I stopped.",
          es: "Me detuve.",
        },
        {
          speaker: "nico",
          text: "At the comma. That's late. It's not too late.",
          es: "En la coma. Eso es tarde. No es demasiado tarde.",
        },
        {
          speaker: "dani",
          text: "My whole month one was her. Bogotá month three, Monterrey month six, and none of it works if she isn't running this floor.",
          es: "Todo mi mes uno era ella. Bogotá mes tres, Monterrey mes seis, y nada funciona si ella no está manejando este piso.",
        },
        {
          speaker: "nico",
          text: "Then it's your plan that has to change, not her Thursday.",
          es: "Entonces es tu plan el que tiene que cambiar, no su jueves.",
        },
      ],
      words: [
        { word: "almost", es: "casi" },
        { word: "comma", es: "coma" },
        { word: "change", es: "cambiar" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Barrett at the end of Dani's row with Mía's signed page, the word DECLINED circled by hand; Dani standing.",
      text: "11:00 a.m. Barrett brings the page down herself.",
      es: "11:00 a.m. Barrett baja la hoja ella misma.",
      speaker: "barrett",
      cast: ["barrett", "dani"],
      lines: [
        {
          speaker: "barrett",
          text: "She turned it down with a reason, an example and a close. That's the best no I've heard on this floor, including yours. Your Miami plan had her in it.",
          es: "Lo rechazó con una razón, un ejemplo y un cierre. Es el mejor no que he oído en este piso, incluido el suyo. Su plan de Miami la tenía adentro.",
        },
        {
          speaker: "dani",
          text: "Then my plan changes. Not her.",
          es: "Entonces cambia mi plan. No ella.",
        },
        {
          speaker: "barrett",
          text: "That's the first thing you've said this week that sounded like a reason. Write it down before you lose it.",
          es: "Es lo primero que dice esta semana que suena a razón. Anótelo antes de perderlo.",
        },
      ],
      words: [
        { word: "reason", es: "razón" },
        { word: "including", es: "incluido" },
        { word: "lose", es: "perder" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "The training room; Dani at the whiteboard erasing MÍA from the month-one box of the three columns and writing a question mark; Óscar's small line still at the bottom.",
      text: "2:00 p.m. He erases a name and writes a question mark.",
      es: "2:00 p.m. Borra un nombre y escribe un signo de interrogación.",
      speaker: "dani",
      cast: ["dani"],
      lines: [
        {
          speaker: "dani",
          text: "Month one, San Salvador: question mark. Month three, Bogotá: Julieta's two candidates. Month six, Monterrey: nobody yet. And one line at the bottom that isn't mine.",
          es: "Mes uno, San Salvador: signo de interrogación. Mes tres, Bogotá: las dos candidatas de Julieta. Mes seis, Monterrey: nadie todavía. Y una línea abajo que no es mía.",
        },
        {
          speaker: "dani",
          text: "The plan had her in it because she was the easy answer. She's not the easy answer. She's a person with a Thursday.",
          es: "El plan la tenía adentro porque era la respuesta fácil. No es la respuesta fácil. Es una persona con un jueves.",
        },
      ],
      words: [
        { word: "erases", es: "borra" },
        { word: "question", es: "interrogación" },
        { word: "easy", es: "fácil" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Break room, 4:00 p.m.; Mía on the counter with a university folder on her lap, Dani leaning on the fridge, Nico in the doorway with a bag of chips.",
      text: "4:00 p.m. Break room. She brought the folder.",
      es: "4:00 p.m. Sala de descanso. Trajo la carpeta.",
      speaker: "mia",
      cast: ["mia", "dani", "nico"],
      lines: [
        {
          speaker: "mia",
          text: "Business administration. Nights. Four years. The first class is Monday at six. I've been an agent for four months and I said no to a title in front of Barrett.",
          es: "Administración de empresas. De noche. Cuatro años. La primera clase es el lunes a las seis. Llevo cuatro meses de agente y le dije que no a un cargo frente a Barrett.",
        },
        {
          speaker: "mia",
          text: "Was that the wrong choice, jefe?",
          es: "¿Fue la elección equivocada, jefe?",
        },
        {
          speaker: "dani",
          text: "It was your choice. That's the only kind that counts on a Thursday. You gave a reason, an example, the other side and a close.",
          es: "Fue tu elección. Es la única clase que cuenta un jueves. Diste una razón, un ejemplo, el otro lado y un cierre.",
        },
        {
          speaker: "dani",
          text: "I gave Barrett a plan with your name in it and no reason. Guess which one she wrote down.",
          es: "Yo le di a Barrett un plan con tu nombre adentro y ninguna razón. Adivina cuál anotó.",
        },
        {
          speaker: "nico",
          text: "Both. She said 'noted, both of you'.",
          es: "Los dos. Dijo 'anotado, los dos'.",
        },
        {
          speaker: "mia",
          text: "He was in the room, Nico. He knows.",
          es: "Él estaba en la sala, Nico. Lo sabe.",
        },
      ],
      words: [
        { word: "administration", es: "administración" },
        { word: "counts", es: "cuenta" },
        { word: "guess", es: "adivina" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Ms. Barrett alone in her office at 6:00 p.m., the Miami offer letter still on her desk, a second sticky note on it reading FRIDAY, 4 PM; the floor emptying through the glass.",
      text: "6:00 p.m. The offer is still on the desk. So is the livestream.",
      es: "6:00 p.m. La oferta sigue en el escritorio. El en vivo también.",
      speaker: "barrett",
      cast: ["barrett"],
      lines: [
        {
          speaker: "barrett",
          text: "Friday, four p.m. Three countries, a statement from legal, and a man with a plan that has a question mark in month one. This is going to be interesting.",
          es: "Viernes, cuatro p.m. Tres países, una declaración de legal, y un hombre con un plan que tiene un signo de interrogación en el mes uno. Esto va a estar interesante.",
        },
      ],
      words: [
        { word: "offer", es: "oferta" },
        { word: "countries", es: "países" },
        { word: "interesting", es: "interesante" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Night; the bus stop; Mía and Dani on the bench, Mía with the university folder on her knees, Dani with the notebook closed; the Northline sign lit behind them.",
      text: "9:40 p.m. Bus stop. Same bench, different folders.",
      es: "9:40 p.m. Parada de bus. La misma banca, carpetas distintas.",
      speaker: "mia",
      cast: ["mia", "dani"],
      lines: [
        {
          speaker: "mia",
          text: "If you go to Miami, who tells me when I'm wrong on Thursdays?",
          es: "Si te vas a Miami, ¿quién me dice cuando me equivoco los jueves?",
        },
        {
          speaker: "dani",
          text: "I don't know yet. That's the question mark.",
          es: "Todavía no sé. Ese es el signo de interrogación.",
        },
        {
          speaker: "mia",
          text: "Then it's the wrong question mark. The plan isn't who runs the floor. It's who does the Thursdays.",
          es: "Entonces es el signo de interrogación equivocado. El plan no es quién maneja el piso. Es quién hace los jueves.",
        },
        {
          speaker: "dani",
          text: "...Write that on the board tomorrow. Under Óscar's line.",
          es: "...Escribe eso en la pizarra mañana. Debajo de la línea de Óscar.",
        },
      ],
      words: [
        { word: "bench", es: "banca" },
        { word: "folders", es: "carpetas" },
        { word: "Thursdays", es: "jueves" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "Why does Mía turn down the supervisor job?",
      questionEs: "¿Por qué Mía rechaza el puesto de supervisora?",
      options: [
        { label: "The shift ends at eleven and her classes end at nine; she chooses the degree first", emoji: "🎓" },
        { label: "She wants to go to Miami with Dani", emoji: "✈️" },
        { label: "Thirty percent more isn't enough money", emoji: "💵" },
      ],
      answer: 0,
      sayIt: "The shift ends at eleven and her classes end at nine; she chooses the degree first.",
      sayItEs: "El turno termina a las once y sus clases a las nueve; elige el título primero.",
      sayItCheck: {
        target: "* the degree first *",
        altTargets: ["Because of her classes *", "The shift ends at eleven *", "* university *"],
      },
    },
    {
      id: "q2",
      afterScene: "s2",
      questionEn: "You have to choose between two real options this month. Say your choice, one reason, one example, the other side, and close.",
      questionEs: "Tienes que elegir entre dos opciones reales este mes. Di tu elección, una razón, un ejemplo, el otro lado, y cierra.",
      options: [
        { label: "I am ready to answer", emoji: "🎧" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "For me, the better option is working from home most of the week. One reason is that I concentrate much better in a quiet place. For example, last year I finished the same work in less time at home. On the other hand, I understand the office is better for new people. Overall, I choose focus first and contact second.",
      sayItEs: "Para mí, la mejor opción es trabajar desde casa la mayor parte de la semana. Una razón es que me concentro mucho mejor en un lugar tranquilo. Por ejemplo, el año pasado terminé el mismo trabajo en menos tiempo en casa. Por otro lado, entiendo que la oficina es mejor para la gente nueva. En general, elijo enfoque primero y contacto segundo.",
      sayItAskEn: "Start with \"For me, the better option is ...\", then \"One reason is ...\", then \"For example, ...\", then \"On the other hand, ...\", and close with \"Overall, I choose ...\".",
      sayItAskEs: "Empieza con \"For me, the better option is …\", luego \"One reason is …\", después \"For example, …\", luego \"On the other hand, …\" y cierra con \"Overall, I choose …\".",
      sayItCheck: {
        target: "For me, the better option is *",
        altTargets: ["One reason is *", "For example, *", "Overall, I choose *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s4",
    phrase: "When someone else's choice breaks my plan, it's my plan that changes.",
    es: "Cuando la elección de otra persona rompe mi plan, es mi plan el que cambia.",
  },
  habitCard: {
    afterScene: "s2",
    phrase: "When I say no, I bring the reason, one example, the other side and a close, in that order.",
    es: "Cuando digo que no, traigo la razón, un ejemplo, el otro lado y un cierre, en ese orden.",
    model: "mia",
    modelActionEs: "Mía le dijo que no a Barrett con una razón, un ejemplo de Bogotá, el otro lado de su familia y un cierre con fecha, sin mirar a Dani ni una vez.",
  },
  expressions: [
    {
      phrase: "turn down",
      variants: ["turned down", "turns down", "turning down"],
      es: "rechazar (una oferta)",
      kind: "phrasal",
      example: "She turned it down with a reason, an example and a close.",
      exampleEs: "Lo rechazó con una razón, un ejemplo y un cierre.",
    },
    {
      phrase: "write down",
      variants: ["write it down", "wrote down", "written down"],
      es: "anotar",
      kind: "phrasal",
      example: "That's the first thing you've said this week that sounded like a reason. Write it down before you lose it.",
      exampleEs: "Es lo primero que dice esta semana que suena a razón. Anótelo antes de perderlo.",
    },
    {
      phrase: "on the other hand",
      variants: ["on one hand", "on the other hand,"],
      es: "por otro lado",
      kind: "idiom",
      example: "On the other hand, I understand thirty percent is a lot for my family, and I understand the plan needs someone on this floor.",
      exampleEs: "Por otro lado, entiendo que treinta por ciento es mucho para mi familia, y entiendo que el plan necesita a alguien en este piso.",
    },
    {
      phrase: "the easy answer",
      variants: ["an easy answer", "no easy answer"],
      es: "la respuesta fácil",
      kind: "idiom",
      example: "The plan had her in it because she was the easy answer. She's not the easy answer. She's a person with a Thursday.",
      exampleEs: "El plan la tenía adentro porque era la respuesta fácil. No es la respuesta fácil. Es una persona con un jueves.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: a choice you made that someone else didn't like. Your choice, one reason, one example, what you understand about the other side, and your close.",
    es: "Treinta segundos: una elección que hiciste y a alguien no le gustó. Tu elección, una razón, un ejemplo, qué entiendes del otro lado, y tu cierre.",
  },
  continueWith: [
    "For me, the better option is ...",
    "One reason is that ... For example, ...",
    "On the other hand, I understand ...",
    "So my choice isn't absolute ... Overall, I choose ...",
  ],
  cliffhanger: {
    en: "Tomorrow, four p.m.: three countries live, legal's statement on a tablet, and a chat that asks whatever it wants. One question in it has no script at all.",
    es: "Mañana, cuatro p.m.: tres países en vivo, la declaración de legal en una tablet, y un chat que pregunta lo que quiere. Una pregunta no tiene guion alguno.",
  },
};
