import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced2-ep9-too-expensive/cover.jpg";
import s1 from "@/assets/storybook/advanced2-ep9-too-expensive/s1.jpg";
import s2 from "@/assets/storybook/advanced2-ep9-too-expensive/s2.jpg";
import s3 from "@/assets/storybook/advanced2-ep9-too-expensive/s3.jpg";
import s4 from "@/assets/storybook/advanced2-ep9-too-expensive/s4.jpg";
import s5 from "@/assets/storybook/advanced2-ep9-too-expensive/s5.jpg";
import s6 from "@/assets/storybook/advanced2-ep9-too-expensive/s6.jpg";
import s7 from "@/assets/storybook/advanced2-ep9-too-expensive/s7.jpg";
import s8 from "@/assets/storybook/advanced2-ep9-too-expensive/s8.jpg";
import s9 from "@/assets/storybook/advanced2-ep9-too-expensive/s9.jpg";

export const ADVANCED2_EP9_TOO_EXPENSIVE: StorybookEpisode = {
  id: "advanced2-ep9-too-expensive",
  moduleId: "advanced-2",
  week: 2,
  title: "Too expensive",
  titleEs: "Muy caro",
  episodeLabel: {
    en: "Advanced 2 · Episode 9",
    es: "Advanced 2 · Episodio 9",
  },
  previously: [
    {
      en: "Dani compared Crown and Northline honestly, and lost two rows out of three.",
      es: "Dani comparó Crown y Northline con honestidad, y perdió dos filas de tres.",
    },
    {
      en: "Mía found out the night team ends at seven a.m.",
      es: "Mía descubrió que el equipo nocturno termina a las siete de la mañana.",
    },
    {
      en: "Northline's finance team thinks the pilot is too expensive.",
      es: "El equipo de finanzas de Northline cree que el piloto es muy caro.",
    },
  ],
  reviewWords: [
    { word: "expensive", es: "caro" },
    { word: "objection", es: "objeción" },
    { word: "package", es: "paquete" },
    { word: "escalation", es: "escalación" },
    { word: "defensible", es: "defendible" },
  ],
  blurb: {
    en: "A customer says the internet plan is too expensive and wants to cancel. Dani doesn't argue about the price; he changes what the price is for. Two hours later, Northline's finance team says the same thing about him, and he has to take the same call in a meeting room.",
    es: "Una clienta dice que el plan de internet es muy caro y quiere cancelar. Dani no discute el precio; cambia para qué sirve el precio. Dos horas después, el equipo de finanzas de Northline dice lo mismo de él, y tiene que tomar la misma llamada en una sala de reuniones.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Northline floor, Thursday morning; the wall screen reads HOME INTERNET, RETENTION; Dani at his desk with his headset on, Óscar listening in from the next chair with one earpiece. No customer is drawn.",
      text: "Thursday, 8:50 a.m. Account of the day: home internet, retention.",
      es: "Jueves, 8:50 a.m. Cuenta del día: internet de casa, retención.",
      speaker: "dani",
      lines: [
        {
          speaker: "caller",
          text: "I'm calling to cancel. It's too expensive. Sixty dollars a month for internet is crazy.",
          es: "Llamo para cancelar. Es muy caro. Sesenta dólares al mes por internet es una locura.",
        },
        {
          speaker: "dani",
          text: "I understand — price is important. You're right that it's more than the basic service. What is the internet used for at home?",
          es: "Entiendo, el precio es importante. Tiene razón en que es más que el servicio básico. ¿Para qué se usa el internet en casa?",
        },
        {
          speaker: "caller",
          text: "My two kids have online classes in the morning. I work from the kitchen. My mother watches her shows.",
          es: "Mis dos hijos tienen clases en línea en la mañana. Yo trabajo desde la cocina. Mi mamá ve sus programas.",
        },
        {
          speaker: "dani",
          text: "So four people at once, and two of them can't have the video freeze in class.",
          es: "O sea cuatro personas a la vez, y dos de ellas no pueden tener el video congelado en clase.",
        },
      ],
      words: [
        { word: "cancel", es: "cancelar" },
        { word: "expensive", es: "caro" },
        { word: "freeze", es: "congelarse" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Close on Dani's screen: two plan cards, BASIC and PLUS, with a small arrow drawn on his notepad from the smaller one to the bigger one.",
      text: "He doesn't defend the price. He changes what it's for.",
      es: "No defiende el precio. Cambia para qué sirve.",
      speaker: "dani",
      lines: [
        {
          speaker: "dani",
          text: "What you're really paying for is the time you save every week. Most of our customers tell me it pays for itself.",
          es: "Por lo que realmente paga es por el tiempo que ahorra cada semana. La mayoría de nuestros clientes me dicen que se paga solo.",
        },
        {
          speaker: "caller",
          text: "Can you come down on the price, then?",
          es: "¿Puede bajar el precio, entonces?",
        },
        {
          speaker: "dani",
          text: "I can't come down on this plan. That said, I don't want you to pay for something you won't use. Another option would be to start with the smaller package. You can move up later without any extra cost. Does that sound more comfortable for you?",
          es: "No puedo bajar este plan. Dicho eso, no quiero que pague por algo que no va a usar. Otra opción sería empezar con el paquete más pequeño. Puede subir después sin ningún costo extra. ¿Eso le suena más cómodo?",
        },
        {
          speaker: "caller",
          text: "The smaller one. For now. If the classes freeze, I'm calling you back.",
          es: "El más pequeño. Por ahora. Si las clases se congelan, lo vuelvo a llamar.",
        },
        {
          speaker: "dani",
          text: "For now is fine. And if you call back, ask for Dani.",
          es: "Por ahora está bien. Y si vuelve a llamar, pregunte por Dani.",
        },
      ],
      words: [
        { word: "package", es: "paquete" },
        { word: "comfortable", es: "cómodo" },
        { word: "extra", es: "extra" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Óscar pulling the earpiece out, frowning at Dani; Nico rolling his chair over from the next row, hood up.",
      text: "Óscar doesn't like it.",
      es: "A Óscar no le gusta.",
      speaker: "oscar",
      cast: ["oscar", "dani", "nico"],
      lines: [
        {
          speaker: "oscar",
          text: "You gave her the cheaper plan. Sixty became forty. Julieta is going to score that as a loss.",
          es: "Le diste el plan más barato. Sesenta se volvió cuarenta. Julieta va a puntuar eso como una pérdida.",
        },
        {
          speaker: "dani",
          text: "A cancel is a loss. Forty dollars is a customer. And she said 'for now' twice. She already knows the classes will freeze.",
          es: "Cancelar es una pérdida. Cuarenta dólares es una clienta. Y dijo 'por ahora' dos veces. Ya sabe que las clases se van a congelar.",
        },
        {
          speaker: "nico",
          text: "He never argued about the price. Not once.",
          es: "Nunca discutió el precio. Ni una vez.",
        },
        {
          speaker: "dani",
          text: "You don't win a price argument. Nobody does. You move the conversation to what the price buys.",
          es: "Una discusión de precio no se gana. Nadie la gana. Mueves la conversación a lo que el precio compra.",
        },
      ],
      words: [
        { word: "cheaper", es: "más barato" },
        { word: "loss", es: "pérdida" },
        { word: "argued", es: "discutió" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Camila in person at the end of the row, blazer over a Northline lanyard, tablet under her arm, waiting for Dani to finish a note.",
      text: "10:20 a.m. Camila is on the floor. In person.",
      es: "10:20 a.m. Camila está en el piso. En persona.",
      speaker: "camila",
      cast: ["camila", "dani"],
      lines: [
        {
          speaker: "camila",
          text: "Finance meeting at eleven. Room B. Their objection is simple: the online course they had last year cost a third of this pilot.",
          es: "Reunión con finanzas a las once. Sala B. Su objeción es simple: el curso en línea que tenían el año pasado costaba un tercio de este piloto.",
        },
        {
          speaker: "dani",
          text: "So it's the same account as this morning. Different customer.",
          es: "O sea que es la misma cuenta que esta mañana. Otro cliente.",
        },
        {
          speaker: "camila",
          text: "I have the numbers. Escalations, handle time, the survey. I need you to have the sentence.",
          es: "Yo tengo los números. Escalaciones, tiempo de llamada, la encuesta. Necesito que tú tengas la frase.",
        },
        {
          speaker: "dani",
          text: "I have the sentence. I used it this morning on a mother of two.",
          es: "Tengo la frase. La usé esta mañana con una mamá de dos hijos.",
        },
      ],
      words: [
        { word: "objection", es: "objeción" },
        { word: "third", es: "tercio" },
        { word: "survey", es: "encuesta" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Room B: Ms. Barrett at the head of a small table with a printed email, Camila with a tablet showing a bar chart, Dani with nothing in his hands.",
      text: "Room B. Barrett reads the email out loud.",
      es: "Sala B. Barrett lee el correo en voz alta.",
      speaker: "barrett",
      cast: ["barrett", "camila", "dani"],
      lines: [
        {
          speaker: "barrett",
          text: "Finance's line: the course cost a third, same number of agents. Why is your pilot three times the price? I'm asking as them, not as me.",
          es: "La línea de finanzas: el curso costaba un tercio, el mismo número de agentes. ¿Por qué su piloto cuesta tres veces más? Pregunto como ellos, no como yo.",
        },
        {
          speaker: "dani",
          text: "I understand — price is important. You're right that it's more than the course you had. What you're really paying for is the calls that don't get escalated. Camila.",
          es: "Entiendo, el precio es importante. Tienen razón en que es más que el curso que tenían. Por lo que realmente pagan es por las llamadas que no se escalan. Camila.",
        },
        {
          speaker: "camila",
          text: "Escalations on this floor are down twenty-two percent in eight weeks. Every escalation is a supervisor's hour. Finance can price that hour.",
          es: "Las escalaciones en este piso bajaron veintidós por ciento en ocho semanas. Cada escalación es una hora de supervisor. Finanzas puede ponerle precio a esa hora.",
        },
        {
          speaker: "barrett",
          text: "They'll say the course could have done that too.",
          es: "Van a decir que el curso también podría haber hecho eso.",
        },
        {
          speaker: "dani",
          text: "They had it a year. It didn't.",
          es: "Lo tuvieron un año. No lo hizo.",
        },
      ],
      words: [
        { word: "escalated", es: "escalado" },
        { word: "supervisor", es: "supervisor" },
        { word: "percent", es: "por ciento" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Same table; Dani leaning back, palms open, Barrett with her pen stopped over the email, Camila watching Dani sideways.",
      text: "Then he does the thing Óscar hated.",
      es: "Entonces hace lo que Óscar odió.",
      speaker: "dani",
      cast: ["dani", "barrett", "camila"],
      lines: [
        {
          speaker: "dani",
          text: "That said, I don't want Northline to pay for something it won't use. Another option would be to start the second group smaller. Ten agents instead of twenty. You can move up later without any extra cost per agent.",
          es: "Dicho eso, no quiero que Northline pague por algo que no va a usar. Otra opción sería empezar el segundo grupo más pequeño. Diez agentes en vez de veinte. Pueden subir después sin ningún costo extra por agente.",
        },
        {
          speaker: "barrett",
          text: "And if finance still says no?",
          es: "¿Y si finanzas igual dice que no?",
        },
        {
          speaker: "dani",
          text: "Then you keep the twenty-two percent, and I keep the eleven people at the club. Does that sound more comfortable for you?",
          es: "Entonces ustedes se quedan con el veintidós por ciento, y yo me quedo con las once personas del club. ¿Eso le suena más cómodo?",
        },
        {
          speaker: "barrett",
          text: "Comfortable is not the word. Defensible is. I'll take it to them this afternoon.",
          es: "Cómodo no es la palabra. Defendible sí. Se lo llevo esta tarde.",
        },
      ],
      words: [
        { word: "smaller", es: "más pequeño" },
        { word: "defensible", es: "defendible" },
        { word: "afternoon", es: "tarde" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Hallway outside Room B; Camila stopping Dani with a hand, tablet against her chest, her face not angry but not pleased.",
      text: "The hallway.",
      es: "El pasillo.",
      speaker: "camila",
      cast: ["camila", "dani"],
      lines: [
        {
          speaker: "camila",
          text: "You offered to shrink our own pilot before they asked for it.",
          es: "Ofreciste achicar nuestro propio piloto antes de que lo pidieran.",
        },
        {
          speaker: "dani",
          text: "Half a yes beats a whole no.",
          es: "Medio sí le gana a un no entero.",
        },
        {
          speaker: "camila",
          text: "Sometimes. But on the floor you waited for the 'come down on the price'. In there you didn't. Vale would have held the line at twenty and let them ask.",
          es: "A veces. Pero en el piso esperaste el 'bajen el precio'. Ahí adentro no. Vale habría mantenido la línea en veinte y los habría dejado pedir.",
        },
        {
          speaker: "dani",
          text: "Fair. I got nervous in a room with no headset.",
          es: "Justo. Me puse nervioso en una sala sin diadema.",
        },
      ],
      words: [
        { word: "shrink", es: "achicar" },
        { word: "hallway", es: "pasillo" },
        { word: "nervous", es: "nervioso" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Break room, 3 p.m.; Mía sitting on the counter with a paper cup, Nico standing with a vending-machine snack, Dani leaning on the fridge.",
      text: "3 p.m. Break room.",
      es: "3 p.m. Sala de descanso.",
      speaker: "mia",
      cast: ["mia", "nico", "dani"],
      lines: [
        {
          speaker: "mia",
          text: "So the pilot might get smaller.",
          es: "Entonces el piloto podría hacerse más pequeño.",
        },
        {
          speaker: "dani",
          text: "It might.",
          es: "Podría.",
        },
        {
          speaker: "mia",
          text: "Friday is tomorrow, jefe. Keller called me back. The offer stays open even after Friday.",
          es: "El viernes es mañana, jefe. Keller me devolvió la llamada. La oferta sigue abierta incluso después del viernes.",
        },
        {
          speaker: "dani",
          text: "Then she wants you more than she said on Monday.",
          es: "Entonces te quiere más de lo que dijo el lunes.",
        },
        {
          speaker: "mia",
          text: "Everybody wants me more than they say. It's exhausting.",
          es: "Todos me quieren más de lo que dicen. Es agotador.",
        },
        {
          speaker: "nico",
          text: "Not everybody.",
          es: "No todos.",
        },
      ],
      words: [
        { word: "tomorrow", es: "mañana" },
        { word: "exhausting", es: "agotador" },
        { word: "everybody", es: "todos" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Night; Dani alone at a bus stop with his phone to his ear, headset in his bag, the Northline sign lit behind him. Only Dani is drawn; the caller is a voice on the phone.",
      text: "9:30 p.m. His mother.",
      es: "9:30 p.m. Su mamá.",
      speaker: "dani",
      lines: [
        {
          speaker: "estela",
          text: "Mijo, did you eat?",
          es: "Mijo, ¿comiste?",
        },
        {
          speaker: "dani",
          text: "I offered to make my own job smaller today, mamá. In a meeting room.",
          es: "Hoy ofrecí hacer mi propio trabajo más pequeño, mamá. En una sala de reuniones.",
        },
        {
          speaker: "estela",
          text: "Did you eat, though?",
          es: "¿Pero comiste?",
        },
        {
          speaker: "dani",
          text: "Not yet.",
          es: "Todavía no.",
        },
        {
          speaker: "estela",
          text: "Then you didn't win anything yet. Go eat.",
          es: "Entonces todavía no ganaste nada. Ve a comer.",
        },
      ],
      words: [
        { word: "meeting", es: "reunión" },
        { word: "though", es: "aun así" },
        { word: "yet", es: "todavía" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s6",
      questionEn: "What does Dani offer when Northline's finance team says the pilot is too expensive?",
      questionEs: "¿Qué ofrece Dani cuando finanzas de Northline dice que el piloto es muy caro?",
      options: [
        { label: "A smaller second group, with the option to move up later", emoji: "📦" },
        { label: "A lower price for the same twenty agents", emoji: "💸" },
        { label: "To cancel the conversation club", emoji: "🚪" },
      ],
      answer: 0,
      sayIt: "A smaller second group, with the option to move up later.",
      sayItEs: "Un segundo grupo más pequeño, con la opción de subir después.",
      sayItCheck: {
        target: "A smaller * group",
        altTargets: ["Another option would be a smaller group", "Start smaller", "A smaller second group *"],
      },
    },
    {
      id: "q2",
      afterScene: "s2",
      questionEn: "Someone tells you your service is too expensive. Don't argue the price. Acknowledge it, say what they're really paying for, and give them a smaller option.",
      questionEs: "Alguien te dice que tu servicio es muy caro. No discutas el precio. Reconócelo, di por qué están pagando en realidad, y dales una opción más pequeña.",
      options: [
        { label: "I am ready to answer", emoji: "🎧" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "I understand — price is important. What you're really paying for is the time you save every week. That said, another option would be to start with the smaller package.",
      sayItEs: "Entiendo, el precio es importante. Por lo que realmente paga es por el tiempo que ahorra cada semana. Dicho eso, otra opción sería empezar con el paquete más pequeño.",
      sayItAskEn: "Start with \"I understand — price is important\", then \"What you're really paying for is ...\", and close with \"Another option would be ...\".",
      sayItAskEs: "Empieza con \"I understand — price is important\", luego \"What you're really paying for is …\" y cierra con \"Another option would be …\".",
      sayItCheck: {
        target: "I understand * price is important *",
        altTargets: ["What you're really paying for is *", "Another option would be *", "That said *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s3",
    phrase: "I don't defend the price. I say what the price buys.",
    es: "No defiendo el precio. Digo qué compra el precio.",
  },
  habitCard: {
    afterScene: "s7",
    phrase: "When someone says 'too expensive', I wait for the real objection before I offer the smaller option.",
    es: "Cuando alguien dice 'muy caro', espero la objeción real antes de ofrecer la opción más pequeña.",
    model: "camila",
    modelActionEs: "Camila le mostró a Dani que en el piso esperó el 'bajen el precio' y en la sala no, y que esa espera es la diferencia.",
  },
  expressions: [
    {
      phrase: "come down",
      variants: ["come down on the price", "came down", "coming down"],
      es: "bajar (un precio)",
      kind: "phrasal",
      example: "Can you come down on the price, then?",
      exampleEs: "¿Puede bajar el precio, entonces?",
    },
    {
      phrase: "move up",
      variants: ["moves up", "moved up", "moving up"],
      es: "subir (de plan o de nivel)",
      kind: "phrasal",
      example: "You can move up later without any extra cost.",
      exampleEs: "Puede subir después sin ningún costo extra.",
    },
    {
      phrase: "pays for itself",
      variants: ["pay for itself", "paid for itself"],
      es: "se paga solo",
      kind: "idiom",
      example: "Most of our customers tell me it pays for itself.",
      exampleEs: "La mayoría de nuestros clientes me dicen que se paga solo.",
    },
    {
      phrase: "hold the line",
      variants: ["held the line", "holds the line", "holding the line"],
      es: "mantenerse firme, no ceder",
      kind: "idiom",
      example: "Vale would have held the line at twenty and let them ask.",
      exampleEs: "Vale habría mantenido la línea en veinte y los habría dejado pedir.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: someone says your price is too high. Acknowledge it, tell them what they're really paying for, and offer a smaller option they can move up from later.",
    es: "Treinta segundos: alguien dice que tu precio es muy alto. Reconócelo, dile por qué está pagando en realidad, y ofrécele una opción más pequeña desde la que pueda subir después.",
  },
  continueWith: [
    "I understand — price is important.",
    "What you're really paying for is ...",
    "That said, I don't want you to pay for something you won't use.",
    "Another option would be ... Does that sound more comfortable for you?",
  ],
  cliffhanger: {
    en: "Tomorrow is Friday. Mía has to answer Crown. Finance has to answer Camila. And Dani has to close something he isn't selling.",
    es: "Mañana es viernes. Mía tiene que responderle a Crown. Finanzas tiene que responderle a Camila. Y Dani tiene que cerrar algo que no está vendiendo.",
  },
};
