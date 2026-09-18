import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced2-ep6-keller-at-the-door/cover.jpg";
import s1 from "@/assets/storybook/advanced2-ep6-keller-at-the-door/s1.jpg";
import s2 from "@/assets/storybook/advanced2-ep6-keller-at-the-door/s2.jpg";
import s3 from "@/assets/storybook/advanced2-ep6-keller-at-the-door/s3.jpg";
import s4 from "@/assets/storybook/advanced2-ep6-keller-at-the-door/s4.jpg";
import s5 from "@/assets/storybook/advanced2-ep6-keller-at-the-door/s5.jpg";
import s6 from "@/assets/storybook/advanced2-ep6-keller-at-the-door/s6.jpg";
import s7 from "@/assets/storybook/advanced2-ep6-keller-at-the-door/s7.jpg";
import s8 from "@/assets/storybook/advanced2-ep6-keller-at-the-door/s8.jpg";
import s9 from "@/assets/storybook/advanced2-ep6-keller-at-the-door/s9.jpg";

export const ADVANCED2_EP6_KELLER_AT_THE_DOOR: StorybookEpisode = {
  id: "advanced2-ep6-keller-at-the-door",
  moduleId: "advanced-2",
  week: 2,
  title: "Keller at the door",
  titleEs: "Keller en la puerta",
  episodeLabel: {
    en: "Advanced 2 · Episode 6",
    es: "Advanced 2 · Episodio 6",
  },
  previously: [
    {
      en: "Nico took the best call of the month.",
      es: "Nico tomó la mejor llamada del mes.",
    },
    {
      en: "Every agent got their Friday numbers.",
      es: "Cada agente recibió sus números del viernes.",
    },
    {
      en: "And Keller from Crown is waiting in the parking lot.",
      es: "Y Keller, de Crown, está esperando en el estacionamiento.",
    },
  ],
  reviewWords: [
    { word: "agent", es: "agente" },
    { word: "audit", es: "auditoría" },
    { word: "priority", es: "prioridad" },
    { word: "offer", es: "oferta" },
    { word: "recommend", es: "recomendar" },
  ],
  blurb: {
    en: "Crown offers Mía a job before her shift starts. Dani wants to convince her to stay and realizes he has no idea what she actually wants. The account of the day teaches him to ask before he recommends, and he uses it on the wrong side of the desk.",
    es: "Crown le ofrece trabajo a Mía antes de que empiece su turno. Dani quiere convencerla de quedarse y se da cuenta de que no tiene idea de qué quiere ella. La cuenta del día le enseña a preguntar antes de recomendar, y lo usa del otro lado del escritorio.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "The Northline parking lot early Monday; Keller in a sharp navy blazer leaning on a white car; Mía with her headset around her neck, arms crossed, listening.",
      text: "Monday, 6:45 a.m.",
      es: "Lunes, 6:45 a.m.",
      speaker: "keller",
      cast: ["keller", "mia"],
      lines: [
        {
          speaker: "keller",
          text: "Crown is opening a night team in October. I need three agents who can already talk. You're one of the three.",
          es: "Crown abre un equipo nocturno en octubre. Necesito tres agentes que ya sepan hablar. Tú eres una de las tres.",
        },
        {
          speaker: "mia",
          text: "You watched my numbers.",
          es: "Viste mis números.",
        },
        {
          speaker: "keller",
          text: "I watch everybody's numbers. Fourteen minutes in week one is not normal. Twenty percent more than here, and you start on the phones, not in training.",
          es: "Veo los números de todos. Catorce minutos en la semana uno no es normal. Veinte por ciento más que aquí, y empiezas en los teléfonos, no en capacitación.",
        },
        {
          speaker: "mia",
          text: "I'll think about it.",
          es: "Lo voy a pensar.",
        },
        {
          speaker: "keller",
          text: "Think fast. The offer stays open until Friday.",
          es: "Piénsalo rápido. La oferta está abierta hasta el viernes.",
        },
      ],
      words: [
        { word: "night", es: "nocturno" },
        { word: "percent", es: "por ciento" },
        { word: "offer", es: "oferta" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Mía dropping into her chair on the floor, headset on, not looking at anyone; Dani at the next desk noticing; Nico with his hood up.",
      text: "7:05 a.m. She doesn't say good morning.",
      es: "7:05 a.m. No dice buenos días.",
      speaker: "dani",
      cast: ["dani", "mia", "nico"],
      lines: [
        {
          speaker: "dani",
          text: "You okay?",
          es: "¿Estás bien?",
        },
        {
          speaker: "mia",
          text: "Crown offered me a job in the parking lot. I'm telling you so you don't hear it from the kitchen.",
          es: "Crown me ofreció trabajo en el estacionamiento. Te lo digo para que no te enteres por la cocina.",
        },
        {
          speaker: "dani",
          text: "Okay. Thank you for telling me.",
          es: "Okay. Gracias por decirme.",
        },
        {
          speaker: "nico",
          text: "That's it? That's your whole reaction?",
          es: "¿Eso es todo? ¿Esa es toda tu reacción?",
        },
        {
          speaker: "dani",
          text: "For now. I have calls.",
          es: "Por ahora. Tengo llamadas.",
        },
      ],
      words: [
        { word: "okay", es: "bien" },
        { word: "reaction", es: "reacción" },
        { word: "kitchen", es: "cocina" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Dani on a call with the phone-plans account on the wall screen, a small notepad with two questions written on it.",
      text: "9:00 a.m. The account of the day.",
      es: "9:00 a.m. La cuenta del día.",
      speaker: "dani",
      lines: [
        {
          speaker: "caller",
          text: "I just want to know what you recommend. Which plan.",
          es: "Solo quiero saber qué me recomienda. Cuál plan.",
        },
        {
          speaker: "dani",
          text: "Before I recommend anything, can I ask you a couple of questions? How many people will be using the service?",
          es: "Antes de recomendarle algo, ¿le puedo hacer un par de preguntas? ¿Cuántas personas van a usar el servicio?",
        },
        {
          speaker: "caller",
          text: "Four. Me, my husband and two kids who are on the phone all day.",
          es: "Cuatro. Yo, mi esposo y dos niños que viven en el teléfono.",
        },
        {
          speaker: "dani",
          text: "And do you use it mostly for work or for family?",
          es: "¿Y lo usan más para trabajo o para la familia?",
        },
        {
          speaker: "caller",
          text: "Family. Work has its own phone.",
          es: "Familia. El trabajo tiene su propio teléfono.",
        },
      ],
      words: [
        { word: "recommend", es: "recomendar" },
        { word: "couple", es: "un par" },
        { word: "service", es: "servicio" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Close on Dani's screen showing two plan cards, one highlighted; Mía half-listening from the next desk with one ear of her headset pulled back.",
      text: "Match.",
      es: "Emparejar.",
      speaker: "dani",
      lines: [
        {
          speaker: "dani",
          text: "That's helpful. Based on what you told me, I have an idea. In that case, the family plan fits you better than the two accounts you have now.",
          es: "Eso ayuda. Basado en lo que me dijo, tengo una idea. En ese caso, el plan familiar le queda mejor que las dos cuentas que tiene ahora.",
        },
        {
          speaker: "caller",
          text: "Why better?",
          es: "¿Por qué mejor?",
        },
        {
          speaker: "dani",
          text: "It covers four people for a little more than you pay now, and the main benefit is you stop paying for two separate accounts. Would you like me to check the exact price for you?",
          es: "Cubre a cuatro personas por un poco más de lo que paga ahora, y el beneficio principal es que deja de pagar dos cuentas separadas. ¿Quiere que le revise el precio exacto?",
        },
        {
          speaker: "caller",
          text: "Yes. Nobody ever asked me how many people. They just sold me things.",
          es: "Sí. Nadie nunca me preguntó cuántas personas. Solo me vendían cosas.",
        },
      ],
      words: [
        { word: "helpful", es: "útil" },
        { word: "benefit", es: "beneficio" },
        { word: "separate", es: "separadas" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Break room with a coffee machine; Dani and Mía at a small table; her phone face down between them for once.",
      text: "11:30 a.m. The break room.",
      es: "11:30 a.m. La sala de descanso.",
      speaker: "dani",
      cast: ["dani", "mia"],
      lines: [
        {
          speaker: "dani",
          text: "I'm not going to tell you to stay. I don't know enough yet to tell you anything.",
          es: "No te voy a decir que te quedes. Todavía no sé lo suficiente para decirte nada.",
        },
        {
          speaker: "mia",
          text: "That's a weird opening, jefe.",
          es: "Qué apertura tan rara, jefe.",
        },
        {
          speaker: "dani",
          text: "Before I recommend anything, can I ask you a couple of questions? What do you actually want out of a job? Not the money. The thing under the money.",
          es: "Antes de recomendarte algo, ¿te puedo hacer un par de preguntas? ¿Qué quieres realmente de un trabajo? No el dinero. Lo que está debajo del dinero.",
        },
        {
          speaker: "mia",
          text: "Wait. Are you doing the phone-plan thing on me?",
          es: "Espera. ¿Me estás haciendo lo del plan de teléfono?",
        },
        {
          speaker: "dani",
          text: "Yes. It worked on her.",
          es: "Sí. Con ella funcionó.",
        },
      ],
      words: [
        { word: "opening", es: "apertura, inicio" },
        { word: "actually", es: "realmente" },
        { word: "under", es: "debajo" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Mía looking at the window instead of at Dani, hands around a paper cup; Dani listening, not writing anything.",
      text: "The thing under the money.",
      es: "Lo que está debajo del dinero.",
      speaker: "mia",
      cast: ["mia", "dani"],
      lines: [
        {
          speaker: "mia",
          text: "Okay. I want to start university in January. Nights. Which means I need a day shift, or a night shift that ends by six, and nobody offers that.",
          es: "Okay. Quiero entrar a la universidad en enero. De noche. O sea que necesito turno de día, o un turno de noche que termine a las seis, y nadie ofrece eso.",
        },
        {
          speaker: "dani",
          text: "Crown's offer is a night team.",
          es: "La oferta de Crown es un equipo nocturno.",
        },
        {
          speaker: "mia",
          text: "Crown's offer is twenty percent more money to not go to university. She didn't ask me either.",
          es: "La oferta de Crown es veinte por ciento más de dinero para no ir a la universidad. Ella tampoco me preguntó.",
        },
        {
          speaker: "dani",
          text: "So the money isn't the need.",
          es: "Entonces el dinero no es la necesidad.",
        },
        {
          speaker: "mia",
          text: "The money is nice. The schedule is the need.",
          es: "El dinero está bien. El horario es la necesidad.",
        },
      ],
      words: [
        { word: "university", es: "universidad" },
        { word: "schedule", es: "horario" },
        { word: "need", es: "necesidad" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Dani at his desk with the shift calendar open on the screen, moving a block with the mouse; Camila on a video call window in the corner.",
      text: "2:00 p.m. Based on what you told me.",
      es: "2:00 p.m. Basado en lo que me dijiste.",
      speaker: "dani",
      cast: ["dani", "camila"],
      lines: [
        {
          speaker: "dani",
          text: "Camila. If I move one agent from nights to the two-to-ten shift, does the budget change?",
          es: "Camila. Si muevo a una agente de la noche al turno de dos a diez, ¿cambia el presupuesto?",
        },
        {
          speaker: "camila",
          text: "No. Same hours, same pay. Why?",
          es: "No. Mismas horas, mismo pago. ¿Por qué?",
        },
        {
          speaker: "dani",
          text: "Because I asked somebody what she needed instead of guessing, and it turns out it costs nothing.",
          es: "Porque le pregunté a alguien qué necesitaba en vez de adivinar, y resulta que no cuesta nada.",
        },
        {
          speaker: "camila",
          text: "Those are my favorite words. Do it.",
          es: "Esas son mis palabras favoritas. Hazlo.",
        },
      ],
      words: [
        { word: "budget", es: "presupuesto" },
        { word: "pay", es: "pago" },
        { word: "guessing", es: "adivinando" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Mía at her desk reading a printed shift schedule with her name moved to a different row; Dani standing behind her, hands in his pockets.",
      text: "5:50 p.m.",
      es: "5:50 p.m.",
      speaker: "dani",
      cast: ["dani", "mia"],
      lines: [
        {
          speaker: "dani",
          text: "Based on what you told me, I have an idea. Two-to-ten shift, starting next week. Same pay. Classes at seven wouldn't work, but classes at six thirty in the morning would.",
          es: "Basado en lo que me dijiste, tengo una idea. Turno de dos a diez, desde la próxima semana. Mismo pago. Las clases a las siete no funcionarían, pero las de seis y media de la mañana sí.",
        },
        {
          speaker: "mia",
          text: "I'd have to wake up at five.",
          es: "Tendría que levantarme a las cinco.",
        },
        {
          speaker: "dani",
          text: "You would. I'm not recommending yet. I'm asking if this is closer to the need than what Crown offered.",
          es: "Sí. Todavía no te estoy recomendando. Te estoy preguntando si esto está más cerca de la necesidad que lo que ofreció Crown.",
        },
        {
          speaker: "mia",
          text: "It's closer. It's not a yes. But it's closer.",
          es: "Está más cerca. No es un sí. Pero está más cerca.",
        },
      ],
      words: [
        { word: "classes", es: "clases" },
        { word: "wake", es: "despertar" },
        { word: "closer", es: "más cerca" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Night; Nico and Dani at the bus stop; Nico's hood up; the Northline sign glowing behind them.",
      text: "9:30 p.m. The bus stop.",
      es: "9:30 p.m. La parada de bus.",
      speaker: "nico",
      cast: ["nico", "dani"],
      lines: [
        {
          speaker: "nico",
          text: "You didn't fight for her. You just asked questions.",
          es: "No peleaste por ella. Solo hiciste preguntas.",
        },
        {
          speaker: "dani",
          text: "That's what fighting for her looks like when the other side didn't ask any.",
          es: "Así se ve pelear por ella cuando el otro lado no hizo ninguna.",
        },
        {
          speaker: "nico",
          text: "Keller's going to come back with more money.",
          es: "Keller va a volver con más dinero.",
        },
        {
          speaker: "dani",
          text: "Probably. And tomorrow I have to sell Barrett something that isn't money either.",
          es: "Probablemente. Y mañana tengo que venderle a Barrett algo que tampoco es dinero.",
        },
      ],
      words: [
        { word: "fight", es: "pelear" },
        { word: "questions", es: "preguntas" },
        { word: "probably", es: "probablemente" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s6",
      questionEn: "What does Mía actually need from a job?",
      questionEs: "¿Qué necesita realmente Mía de un trabajo?",
      options: [
        { label: "A schedule that lets her study at university in January", emoji: "🎓" },
        { label: "Twenty percent more money", emoji: "💵" },
        { label: "A night team with no training", emoji: "🌙" },
      ],
      answer: 0,
      sayIt: "She needs a schedule that lets her study at university in January.",
      sayItEs: "Necesita un horario que le permita estudiar en la universidad en enero.",
      sayItCheck: {
        target: "She needs a schedule",
        altTargets: ["A schedule that lets her study", "The schedule is the need"],
      },
    },
    {
      id: "q2",
      afterScene: "s4",
      questionEn: "A customer asks what you recommend. Ask two questions first, then match your idea to what they told you.",
      questionEs: "Un cliente pregunta qué le recomiendas. Haz dos preguntas primero, y luego conecta tu idea con lo que te dijo.",
      options: [
        { label: "I am ready to answer", emoji: "🎧" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "Before I recommend anything, can I ask you a couple of questions? How many people will use it, and is it for work or for family? Based on what you told me, the family plan fits you better.",
      sayItEs: "Antes de recomendarle algo, ¿le puedo hacer un par de preguntas? ¿Cuántas personas lo van a usar, y es para trabajo o para la familia? Basado en lo que me dijo, el plan familiar le queda mejor.",
      sayItAskEn: "Start with \"Can I ask you a couple of questions?\" and close with \"Based on what you told me, ...\".",
      sayItAskEs: "Empieza con \"Can I ask you a couple of questions?\" y cierra con \"Based on what you told me, …\".",
      sayItCheck: {
        target: "Can I ask you * questions",
        altTargets: ["Based on what you told me *", "In that case *", "Before I recommend anything *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s5",
    phrase: "I don't recommend what I haven't asked about.",
    es: "No recomiendo lo que no he preguntado.",
  },
  habitCard: {
    afterScene: "s7",
    phrase: "Before I offer a solution, I ask what the person is actually trying to get.",
    es: "Antes de ofrecer una solución, pregunto qué es lo que la persona realmente busca.",
    model: "dani",
    modelActionEs: "Dani no le pidió a Mía que se quedara: le preguntó qué necesitaba, y la respuesta fue un horario, no dinero.",
  },
  expressions: [
    {
      phrase: "turn out",
      variants: ["turns out", "turned out", "it turns out"],
      es: "resultar (que)",
      kind: "phrasal",
      example: "It turns out it costs nothing.",
      exampleEs: "Resulta que no cuesta nada.",
    },
    {
      phrase: "come back with",
      variants: ["comes back with", "came back with", "coming back with"],
      es: "volver con (una oferta, una respuesta)",
      kind: "phrasal",
      example: "Keller's going to come back with more money.",
      exampleEs: "Keller va a volver con más dinero.",
    },
    {
      phrase: "the thing under the money",
      es: "lo que está debajo del dinero, la razón real",
      kind: "idiom",
      example: "Not the money. The thing under the money.",
      exampleEs: "No el dinero. Lo que está debajo del dinero.",
    },
    {
      phrase: "the offer stays open",
      variants: ["offer stays open"],
      es: "la oferta sigue en pie",
      kind: "idiom",
      example: "Think fast. The offer stays open until Friday.",
      exampleEs: "Piénsalo rápido. La oferta está abierta hasta el viernes.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: someone asks what you recommend. Ask two questions first, then say what fits them and why, based on what they told you.",
    es: "Treinta segundos: alguien te pregunta qué le recomiendas. Haz dos preguntas primero, y luego di qué le queda mejor y por qué, basado en lo que te dijo.",
  },
  continueWith: [
    "Before I recommend anything, can I ask you a couple of questions?",
    "Based on what you told me, ...",
    "In that case, ...",
    "Would you like me to check ...?",
  ],
  cliffhanger: {
    en: "Tomorrow Dani has to sell Barrett an upgrade to the pilot that isn't about money, and a guest who can't decide between two rooms.",
    es: "Mañana Dani tiene que venderle a Barrett una mejora al piloto que no es de dinero, y un huésped que no se decide entre dos habitaciones.",
  },
};
