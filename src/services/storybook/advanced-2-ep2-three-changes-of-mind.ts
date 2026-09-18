import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced2-ep2-three-changes-of-mind/cover.jpg";
import s1 from "@/assets/storybook/advanced2-ep2-three-changes-of-mind/s1.jpg";
import s2 from "@/assets/storybook/advanced2-ep2-three-changes-of-mind/s2.jpg";
import s3 from "@/assets/storybook/advanced2-ep2-three-changes-of-mind/s3.jpg";
import s4 from "@/assets/storybook/advanced2-ep2-three-changes-of-mind/s4.jpg";
import s5 from "@/assets/storybook/advanced2-ep2-three-changes-of-mind/s5.jpg";
import s6 from "@/assets/storybook/advanced2-ep2-three-changes-of-mind/s6.jpg";
import s7 from "@/assets/storybook/advanced2-ep2-three-changes-of-mind/s7.jpg";
import s8 from "@/assets/storybook/advanced2-ep2-three-changes-of-mind/s8.jpg";
import s9 from "@/assets/storybook/advanced2-ep2-three-changes-of-mind/s9.jpg";

export const ADVANCED2_EP2_THREE_CHANGES_OF_MIND: StorybookEpisode = {
  id: "advanced2-ep2-three-changes-of-mind",
  moduleId: "advanced-2",
  week: 1,
  title: "Three changes of mind",
  titleEs: "Tres cambios de opinión",
  episodeLabel: {
    en: "Advanced 2 · Episode 2",
    es: "Advanced 2 · Episodio 2",
  },
  previously: [
    {
      en: "Dani's first call lasted fifty-one seconds.",
      es: "La primera llamada de Dani duró cincuenta y un segundos.",
    },
    {
      en: "Nico taught him to listen before he fixes.",
      es: "Nico le enseñó a escuchar antes de arreglar.",
    },
    {
      en: "Today: the hotel account.",
      es: "Hoy: la cuenta de hoteles.",
    },
  ],
  reviewWords: [
    { word: "customer", es: "cliente" },
    { word: "confirm", es: "confirmar" },
    { word: "problem", es: "problema" },
    { word: "reservation", es: "reservación" },
    { word: "guest", es: "huésped" },
  ],
  blurb: {
    en: "A guest changes the dates, then the room, then the number of people, all in one call. Dani writes faster and understands less, until Mía passes him a sticky note with four words on it.",
    es: "Un huésped cambia las fechas, luego el cuarto, luego el número de personas, todo en una llamada. Dani escribe más rápido y entiende menos, hasta que Mía le pasa un papelito con cuatro palabras.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "The Northline floor in the morning with the hotel account name on the wall screen; Dani at his desk with a fresh notepad; Mía spinning slowly in her chair.",
      text: "Tuesday. The hotel account.",
      es: "Martes. La cuenta de hoteles.",
      speaker: "mia",
      cast: ["mia", "dani"],
      lines: [
        {
          speaker: "mia",
          text: "Rule of this account: nobody knows what they want until minute four.",
          es: "Regla de esta cuenta: nadie sabe lo que quiere hasta el minuto cuatro.",
        },
        {
          speaker: "dani",
          text: "So I write everything down.",
          es: "Entonces anoto todo.",
        },
        {
          speaker: "mia",
          text: "You can try. Everybody tries that on day one.",
          es: "Puedes intentarlo. Todos lo intentan el primer día.",
        },
        {
          speaker: "dani",
          text: "That sounded like a warning.",
          es: "Eso sonó a advertencia.",
        },
        {
          speaker: "mia",
          text: "It was. Last month a guy wrote down every word and then read the whole page back to the guest. She cancelled.",
          es: "Lo era. El mes pasado un muchacho anotó cada palabra y después le leyó la página entera al huésped. Ella canceló.",
        },
      ],
      words: [
        { word: "account", es: "cuenta" },
        { word: "warning", es: "advertencia" },
        { word: "minute", es: "minuto" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Dani on the call, headset on, pen moving; the notepad already has three crossed-out lines.",
      text: "9:10 a.m.",
      es: "9:10 a.m.",
      speaker: "dani",
      lines: [
        {
          speaker: "dani",
          text: "Thank you for calling. How can I help you with your reservation?",
          es: "Gracias por llamar. ¿En qué le puedo ayudar con su reservación?",
        },
        {
          speaker: "caller",
          text: "Two nights, Friday and Saturday. Actually, make it Thursday to Saturday.",
          es: "Dos noches, viernes y sábado. Bueno, mejor de jueves a sábado.",
        },
        {
          speaker: "dani",
          text: "Thursday to Saturday, of course.",
          es: "De jueves a sábado, claro.",
        },
        {
          speaker: "caller",
          text: "And one bed. No, two. My sister is coming now.",
          es: "Y una cama. No, dos. Ahora viene mi hermana.",
        },
        {
          speaker: "dani",
          text: "Two beds. Thursday to Saturday. One moment.",
          es: "Dos camas. De jueves a sábado. Un momento.",
        },
      ],
      words: [
        { word: "nights", es: "noches" },
        { word: "beds", es: "camas" },
        { word: "sister", es: "hermana" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Close on the notepad: arrows, crossed-out dates, a question mark; Dani's jaw tight.",
      text: "The third change.",
      es: "El tercer cambio.",
      speaker: "caller",
      lines: [
        {
          speaker: "caller",
          text: "And can we arrive Friday after all? My flight moved.",
          es: "¿Y podemos llegar el viernes después de todo? Mi vuelo se movió.",
        },
        {
          speaker: "dani",
          text: "Friday. So that's… one night? Two nights? With two beds, and your sister.",
          es: "Viernes. Entonces, ¿una noche? ¿Dos noches? Con dos camas, y su hermana.",
        },
        {
          speaker: "caller",
          text: "You tell me. You're the one with the system.",
          es: "Dígame usted. Usted es el del sistema.",
        },
        {
          speaker: "dani",
          text: "Give me one second, please. I want to read you back what I have, because right now I have three different weekends on this page.",
          es: "Un segundo, por favor. Quiero leerle lo que tengo, porque ahora mismo tengo tres fines de semana distintos en esta página.",
        },
        {
          speaker: "caller",
          text: "Three? I only changed it twice.",
          es: "¿Tres? Solo lo cambié dos veces.",
        },
      ],
      words: [
        { word: "arrive", es: "llegar" },
        { word: "flight", es: "vuelo" },
        { word: "system", es: "sistema" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "A yellow sticky note flying over the divider and landing on Dani's keyboard; Mía's hand pulling back; four words written on the note.",
      text: "The sticky note.",
      es: "El papelito.",
      speaker: "mia",
      cast: ["mia", "dani", "nico"],
      lines: [
        {
          speaker: "mia",
          text: "Read it.",
          es: "Léelo.",
        },
        {
          speaker: "dani",
          text: "Need. Options. Adapt. Confirm.",
          es: "Necesidad. Opciones. Adaptar. Confirmar.",
        },
        {
          speaker: "mia",
          text: "Stop writing what they say. Write what they need. Then give two options, not six.",
          es: "Deja de escribir lo que dicen. Escribe lo que necesitan. Después da dos opciones, no seis.",
        },
        {
          speaker: "nico",
          text: "Six options is how you lose a booking. People don't decide when there are six; they hang up and think about it.",
          es: "Seis opciones es como se pierde una reserva. La gente no decide cuando hay seis; cuelga y lo piensa.",
        },
      ],
      words: [
        { word: "options", es: "opciones" },
        { word: "adapt", es: "adaptar" },
        { word: "booking", es: "reserva" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Dani turning the notepad to a clean page and writing two lines only; the call still active.",
      text: "One clean page.",
      es: "Una página limpia.",
      speaker: "dani",
      lines: [
        {
          speaker: "dani",
          text: "Thank you for waiting. Let me see what we have for those dates.",
          es: "Gracias por esperar. Déjeme ver qué tenemos para esas fechas.",
        },
        {
          speaker: "caller",
          text: "Please.",
          es: "Por favor.",
        },
        {
          speaker: "dani",
          text: "We have two options: a standard room with two beds, or a room with a city view and two beds for twenty dollars more.",
          es: "Tenemos dos opciones: una habitación estándar con dos camas, o una con vista a la ciudad y dos camas por veinte dólares más.",
        },
        {
          speaker: "caller",
          text: "The city view. My sister will like that.",
          es: "La de la vista. A mi hermana le va a gustar.",
        },
      ],
      words: [
        { word: "standard", es: "estándar" },
        { word: "view", es: "vista" },
        { word: "dollars", es: "dólares" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Dani speaking calmly with one finger on each of his two written lines; Mía nodding slowly behind the divider.",
      text: "The confirmation.",
      es: "La confirmación.",
      speaker: "dani",
      lines: [
        {
          speaker: "dani",
          text: "Just to confirm, that's two nights for two guests, arriving Friday, one room with two beds and a city view.",
          es: "Solo para confirmar, son dos noches para dos personas, llegando el viernes, una habitación con dos camas y vista a la ciudad.",
        },
        {
          speaker: "caller",
          text: "Yes. Finally.",
          es: "Sí. Por fin.",
        },
        {
          speaker: "dani",
          text: "I'll send the confirmation to your email. Would that work for you?",
          es: "Le envío la confirmación a su correo. ¿Le funciona así?",
        },
        {
          speaker: "caller",
          text: "That works. Sorry I changed everything.",
          es: "Sí me funciona. Perdón por cambiar todo.",
        },
        {
          speaker: "dani",
          text: "You didn't change everything. You figured out what you wanted while we talked.",
          es: "No cambió todo. Fue descubriendo lo que quería mientras hablábamos.",
        },
      ],
      words: [
        { word: "guests", es: "huéspedes" },
        { word: "email", es: "correo" },
        { word: "sorry", es: "perdón" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Mía sitting on the edge of Dani's desk with her headset around her neck, phone face down for once.",
      text: "After the call.",
      es: "Después de la llamada.",
      speaker: "dani",
      cast: ["dani", "mia"],
      lines: [
        {
          speaker: "dani",
          text: "Where did you learn that? Need, options, adapt, confirm.",
          es: "¿Dónde aprendiste eso? Necesidad, opciones, adaptar, confirmar.",
        },
        {
          speaker: "mia",
          text: "TikTok, honestly. A girl in Manila who does hotel calls. Four hundred videos, no certificate.",
          es: "TikTok, la verdad. Una chica en Manila que hace llamadas de hotel. Cuatrocientos videos, ningún certificado.",
        },
        {
          speaker: "dani",
          text: "And it works better than the manual.",
          es: "Y funciona mejor que el manual.",
        },
        {
          speaker: "mia",
          text: "I was waiting for you to say it doesn't count because it's a phone app and not a training manual.",
          es: "Estaba esperando que dijeras que no cuenta porque es una app del teléfono y no un manual de capacitación.",
        },
        {
          speaker: "dani",
          text: "It counts. I'm writing it down.",
          es: "Cuenta. Lo estoy anotando.",
        },
      ],
      words: [
        { word: "certificate", es: "certificado" },
        { word: "manual", es: "manual" },
        { word: "count", es: "contar, valer" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Dani standing at the whiteboard on the floor writing four words in large letters while agents watch from their desks.",
      text: "Four words on the board.",
      es: "Cuatro palabras en la pizarra.",
      speaker: "dani",
      cast: ["dani", "mia", "nico"],
      lines: [
        {
          speaker: "dani",
          text: "Everyone. Four words for this account, and they're not mine. Need, options, adapt, confirm.",
          es: "Todos. Cuatro palabras para esta cuenta, y no son mías. Necesidad, opciones, adaptar, confirmar.",
        },
        {
          speaker: "nico",
          text: "Whose are they?",
          es: "¿De quién son?",
        },
        {
          speaker: "dani",
          text: "Mía's. She got them from a girl in Manila and she was right.",
          es: "De Mía. Los sacó de una chica en Manila y tenía razón.",
        },
        {
          speaker: "mia",
          text: "Say that again, slower, I'm recording.",
          es: "Repítelo más despacio, lo estoy grabando.",
        },
        {
          speaker: "dani",
          text: "No, you're not.",
          es: "No, no lo estás grabando.",
        },
      ],
      words: [
        { word: "board", es: "pizarra" },
        { word: "right", es: "razón" },
        { word: "recording", es: "grabando" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "End of the shift; Barrett standing in the doorway of the floor with a printed page in her hand; Dani turning to see her.",
      text: "6:05 p.m.",
      es: "6:05 p.m.",
      speaker: "barrett",
      cast: ["barrett", "dani"],
      lines: [
        {
          speaker: "barrett",
          text: "Your bookings went up today, and so did your call time. I'll take that trade.",
          es: "Tus reservas subieron hoy, y tu tiempo de llamada también. Acepto ese cambio.",
        },
        {
          speaker: "dani",
          text: "Minute four is where people decide.",
          es: "El minuto cuatro es donde la gente decide.",
        },
        {
          speaker: "barrett",
          text: "Tomorrow you'll need that patience. I'm sending you the ninety-day policy, and you're the one who explains it to the floor.",
          es: "Mañana vas a necesitar esa paciencia. Te voy a mandar la política de noventa días, y tú se la explicas al piso.",
        },
      ],
      words: [
        { word: "bookings", es: "reservas" },
        { word: "patience", es: "paciencia" },
        { word: "policy", es: "política" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What four words does Mía write on the sticky note?",
      questionEs: "¿Qué cuatro palabras escribe Mía en el papelito?",
      options: [
        { label: "Need, options, adapt, confirm", emoji: "📝" },
        { label: "Listen, clarify, confirm, close", emoji: "👂" },
        { label: "Charge, reason, option, confirm", emoji: "💳" },
      ],
      answer: 0,
      sayIt: "Need, options, adapt, confirm.",
      sayItEs: "Necesidad, opciones, adaptar, confirmar.",
      sayItCheck: {
        target: "Need, options, adapt, confirm",
        altTargets: ["Need options adapt confirm"],
      },
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "A customer keeps changing the details. Offer two options and then confirm the final plan.",
      questionEs: "Un cliente cambia los detalles todo el tiempo. Ofrece dos opciones y luego confirma el plan final.",
      options: [
        { label: "I am ready to answer", emoji: "🎧" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "The best option would be the later class, and the second option is Saturday morning. Just to confirm, that's Saturday at nine. Would that work for you?",
      sayItEs: "La mejor opción sería la clase más tarde, y la segunda opción es el sábado por la mañana. Solo para confirmar, es el sábado a las nueve. ¿Le funciona así?",
      sayItAskEn: "Start with \"The best option would be ...\", then close with \"Just to confirm, ... Would that work for you?\"",
      sayItAskEs: "Empieza con \"The best option would be …\" y cierra con \"Just to confirm, … Would that work for you?\"",
      sayItCheck: {
        target: "The best option would be *",
        altTargets: ["Would that work for you", "Just to confirm *", "Let me see what we have"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s5",
    phrase: "Two clear options beat six perfect ones.",
    es: "Dos opciones claras le ganan a seis perfectas.",
  },
  habitCard: {
    afterScene: "s4",
    phrase: "I write what the customer needs, not every word they say.",
    es: "Escribo lo que el cliente necesita, no cada palabra que dice.",
    model: "mia",
    modelActionEs: "Mía le pasó a Dani cuatro palabras en un papelito y le quitó de encima tres páginas de notas tachadas.",
  },
  expressions: [
    {
      phrase: "change your mind",
      variants: ["changes their mind", "changed her mind", "change of mind"],
      es: "cambiar de opinión",
      kind: "idiom",
      example: "People change their mind three times in one call.",
      exampleEs: "La gente cambia de opinión tres veces en una llamada.",
    },
    {
      phrase: "figure out",
      variants: ["figured out", "figures out", "figuring out"],
      es: "darse cuenta, resolver",
      kind: "phrasal",
      example: "You figured out what you wanted while we talked.",
      exampleEs: "Fue descubriendo lo que quería mientras hablábamos.",
    },
    {
      phrase: "write down",
      variants: ["writing it down", "wrote down", "writes down"],
      es: "anotar",
      kind: "phrasal",
      example: "It counts. I'm writing it down.",
      exampleEs: "Cuenta. Lo estoy anotando.",
    },
    {
      phrase: "take that trade",
      variants: ["I'll take that trade"],
      es: "acepto ese intercambio",
      kind: "idiom",
      example: "Your bookings went up today, and so did your call time. I'll take that trade.",
      exampleEs: "Tus reservas subieron hoy, y tu tiempo de llamada también. Acepto ese cambio.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: a customer changes the details twice. Say what you understood, give two options, and confirm the final plan.",
    es: "Treinta segundos: un cliente cambia los detalles dos veces. Di lo que entendiste, da dos opciones y confirma el plan final.",
  },
  continueWith: [
    "Let me see what we have.",
    "The best option would be ...",
    "Just to confirm, ...",
    "Would that work for you?",
  ],
  cliffhanger: {
    en: "Tomorrow Barrett sends the ninety-day policy, and Dani has to explain it to twenty agents who don't know it exists.",
    es: "Mañana Barrett manda la política de noventa días, y Dani tiene que explicársela a veinte agentes que no saben que existe.",
  },
};
