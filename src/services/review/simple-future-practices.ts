import type { ReviewPractice } from "@/lib/review-types";
import sceneSf1 from "@/assets/review/scene-sfut1-daniel.jpg";
import sceneSf3 from "@/assets/review/scene-sfut3-paola.jpg";
import sceneSf5 from "@/assets/review/scene-sfut5-marcos.jpg";

/**
 * REVIEW · SIMPLE FUTURE (will + be going to) — five static practices.
 *
 * Person of the learner's MAIN answers alternates: 3rd · 1st · 3rd · 1st · 3rd.
 * Every practice mixes BE GOING TO (plans) and WILL (predictions, promises,
 * decisions) on purpose. Daniel, Paola and Marcos are fictional characters.
 * All content is hand-written: nothing here is generated at load.
 */
export const SIMPLE_FUTURE_PRACTICES: ReviewPractice[] = [
  {
    number: 1,
    id: "sfut-1-daniel",
    title: "Daniel's plans for tomorrow",
    titleEs: "Los planes de Daniel para mañana",
    person: "third",
    character: "Daniel",
    focus: "Third person plans with is going to + base verb, plus will for predictions.",
    focusEs: "Planes en tercera persona con is going to + verbo base, y will para predicciones.",
    reminder: {
      en: "Going to always needs am / is / are. After will the verb never changes: he will work.",
      es: "Going to siempre necesita am / is / are. Después de will el verbo nunca cambia: he will work.",
    },
    showFullGuide: true,
    instructions: {
      en: "Daniel already planned his day tomorrow. Tell his plans in the future.",
      es: "Daniel ya planeó su día de mañana. Cuenta sus planes en futuro.",
    },
    vocabulary: ["tomorrow", "is going to", "will", "in the morning", "at noon", "later", "tonight", "early"],
    lines: [
      { id: "sfut1-l1", text: "Daniel is going to wake up at five thirty tomorrow.", es: "Daniel se va a despertar a las cinco y media mañana.", chunks: ["Daniel is going to wake up", "at five thirty", "tomorrow."] },
      { id: "sfut1-l2", text: "He is going to take the first bus to the office.", es: "Va a tomar el primer bus a la oficina.", chunks: ["He is going to take", "the first bus", "to the office."] },
      { id: "sfut1-l3", text: "In the morning he is going to answer emails and call two clients.", es: "En la mañana va a contestar correos y llamar a dos clientes.", chunks: ["In the morning", "he is going to answer emails", "and call two clients."] },
      { id: "sfut1-l4", text: "He is going to have lunch with his team at the new restaurant.", es: "Va a almorzar con su equipo en el restaurante nuevo.", chunks: ["He is going to have lunch", "with his team", "at the new restaurant."] },
      { id: "sfut1-l5", text: "The meeting will be long, but it won't be difficult.", es: "La reunión será larga, pero no será difícil.", chunks: ["The meeting will be long,", "but it won't be difficult."] },
      { id: "sfut1-l6", text: "He isn't going to work late tomorrow.", es: "No va a trabajar hasta tarde mañana.", chunks: ["He isn't going to", "work late", "tomorrow."] },
      { id: "sfut1-l7", text: "After work he is going to study English for one hour.", es: "Después del trabajo va a estudiar inglés por una hora.", chunks: ["After work", "he is going to study English", "for one hour."] },
      { id: "sfut1-l8", text: "I think he will feel tired, but he will be happy with his day.", es: "Creo que se sentirá cansado, pero estará contento con su día.", chunks: ["I think he will feel tired,", "but he will be happy", "with his day."] },
    ],
    questions: [
      { id: "sfut1-q1", question: "What is Daniel going to do in the morning?", questionEs: "¿Qué va a hacer Daniel en la mañana?", hint: "He is going to…", hintEs: "Usa is going to + verbo base." },
      { id: "sfut1-q2", question: "Where is he going to have lunch?", questionEs: "¿Dónde va a almorzar?", hint: "He is going to have lunch at…", hintEs: "Di el lugar." },
      { id: "sfut1-q3", question: "What time is he going to wake up?", questionEs: "¿A qué hora se va a despertar?", hint: "He is going to wake up at…", hintEs: "Di la hora." },
      { id: "sfut1-q4", question: "What isn't he going to do tomorrow?", questionEs: "¿Qué no va a hacer mañana?", hint: "He isn't going to…", hintEs: "La negativa va con isn't going to." },
      { id: "sfut1-q5", question: "How will he feel at the end of the day?", questionEs: "¿Cómo se sentirá al final del día?", hint: "He will feel…", hintEs: "Will + verbo base, sin -s." },
      { id: "sfut1-q6", question: "Why will the meeting be easy?", questionEs: "¿Por qué será fácil la reunión?", hint: "Because it will…", hintEs: "Usa because + will." },
    ],
    finalPrompt: {
      question: "Tell me about Daniel's day tomorrow, from the morning to the night.",
      questionEs: "Cuéntame el día de Daniel mañana, desde la mañana hasta la noche.",
      tips: {
        en: "Use at least four sentences with is going to and two with will, and one negative.",
        es: "Usa al menos cuatro oraciones con is going to y dos con will, y una negativa.",
      },
    },
    grammarGoals: [
      "third person plans with is going to + base verb",
      "will for predictions, with no -s and no to",
      "negatives: isn't going to / won't",
    ],
  },
  {
    number: 2,
    id: "sfut-2-your-weekend",
    title: "Your plans for the weekend",
    titleEs: "Tus planes para el fin de semana",
    person: "first",
    character: null,
    focus: "First person plans with am going to, negatives and promises with will.",
    focusEs: "Planes en primera persona con am going to, negativas y promesas con will.",
    reminder: {
      en: "Say I am going to, never I going to. Won't = will not.",
      es: "Di I am going to, nunca I going to. Won't = will not.",
    },
    showFullGuide: false,
    instructions: {
      en: "Talk about your next weekend: your plans, what you aren't going to do, and one promise.",
      es: "Habla de tu próximo fin de semana: tus planes, qué no vas a hacer y una promesa.",
    },
    vocabulary: ["this weekend", "next week", "am going to", "won't", "later", "probably", "early", "rest"],
    lines: [
      { id: "sfut2-l1", text: "This weekend I am going to rest and see my family.", es: "Este fin de semana voy a descansar y ver a mi familia.", chunks: ["This weekend", "I am going to rest", "and see my family."] },
      { id: "sfut2-l2", text: "On Saturday morning I am going to clean my apartment.", es: "El sábado en la mañana voy a limpiar mi apartamento.", chunks: ["On Saturday morning", "I am going to clean", "my apartment."] },
      { id: "sfut2-l3", text: "In the afternoon I am going to practice English for one hour.", es: "En la tarde voy a practicar inglés por una hora.", chunks: ["In the afternoon", "I am going to practice English", "for one hour."] },
      { id: "sfut2-l4", text: "I am not going to work on Sunday.", es: "No voy a trabajar el domingo.", chunks: ["I am not going to work", "on Sunday."] },
      { id: "sfut2-l5", text: "I think the weather will be nice, so we will walk in the park.", es: "Creo que el clima estará agradable, así que caminaremos en el parque.", chunks: ["I think the weather will be nice,", "so we will walk", "in the park."] },
      { id: "sfut2-l6", text: "I won't stay on my phone all day.", es: "No me voy a quedar en el teléfono todo el día.", chunks: ["I won't stay", "on my phone", "all day."] },
      { id: "sfut2-l7", text: "On Sunday night I am going to prepare my week.", es: "El domingo en la noche voy a preparar mi semana.", chunks: ["On Sunday night", "I am going to prepare", "my week."] },
      { id: "sfut2-l8", text: "Next week I will speak English every single day.", es: "La próxima semana hablaré inglés todos los días.", chunks: ["Next week", "I will speak English", "every single day."] },
    ],
    questions: [
      { id: "sfut2-q1", question: "What are you going to do this weekend?", questionEs: "¿Qué vas a hacer este fin de semana?", hint: "I am going to…", hintEs: "Empieza con I am going to." },
      { id: "sfut2-q2", question: "How often are you going to practice English next week?", questionEs: "¿Con qué frecuencia vas a practicar inglés la próxima semana?", hint: "I am going to practice… times a week.", hintEs: "Di una frecuencia: twice, three times." },
      { id: "sfut2-q3", question: "Who are you going to spend time with?", questionEs: "¿Con quién vas a pasar tiempo?", hint: "I am going to spend time with…", hintEs: "Di una persona." },
      { id: "sfut2-q4", question: "What aren't you going to do this weekend?", questionEs: "¿Qué no vas a hacer este fin de semana?", hint: "I am not going to…", hintEs: "Usa am not going to." },
      { id: "sfut2-q5", question: "Where will you go on Sunday?", questionEs: "¿Adónde irás el domingo?", hint: "I will go to…", hintEs: "Will + verbo base." },
      { id: "sfut2-q6", question: "When will you start your week?", questionEs: "¿Cuándo empezarás tu semana?", hint: "I will start…", hintEs: "Di el momento." },
    ],
    finalPrompt: {
      question: "Tell me about your next weekend: your plans, what you aren't going to do, and one promise for next week.",
      questionEs: "Cuéntame tu próximo fin de semana: tus planes, qué no vas a hacer y una promesa para la próxima semana.",
      tips: {
        en: "Use am going to for plans, one negative, and at least two sentences with will.",
        es: "Usa am going to para los planes, una negativa y al menos dos oraciones con will.",
      },
    },
    grammarGoals: [
      "first person plans with am going to + base verb",
      "negatives with am not going to and won't",
      "will for promises and predictions",
    ],
  },
  {
    number: 3,
    id: "sfut-3-paola",
    title: "Paola's new job",
    titleEs: "El nuevo trabajo de Paola",
    person: "third",
    character: "Paola",
    focus: "Talking about someone else's future plans and predictions.",
    focusEs: "Hablar de los planes y predicciones de otra persona en futuro.",
    reminder: {
      en: "She is going to… for the plan. She will… for what you believe.",
      es: "She is going to… para el plan. She will… para lo que tú crees.",
    },
    showFullGuide: false,
    instructions: {
      en: "Paola starts a new job next month. Tell her plans and your predictions.",
      es: "Paola empieza un trabajo nuevo el próximo mes. Cuenta sus planes y tus predicciones.",
    },
    vocabulary: ["next month", "is going to", "will", "training", "team", "probably", "at first", "soon"],
    lines: [
      { id: "sfut3-l1", text: "Paola is going to start a new job next month.", es: "Paola va a empezar un trabajo nuevo el próximo mes.", chunks: ["Paola is going to start", "a new job", "next month."] },
      { id: "sfut3-l2", text: "She is going to work in a call center in the city center.", es: "Va a trabajar en un call center en el centro de la ciudad.", chunks: ["She is going to work", "in a call center", "in the city center."] },
      { id: "sfut3-l3", text: "First she is going to train for three weeks.", es: "Primero va a entrenar por tres semanas.", chunks: ["First she is going to train", "for three weeks."] },
      { id: "sfut3-l4", text: "The first days will be difficult, but she will learn fast.", es: "Los primeros días serán difíciles, pero aprenderá rápido.", chunks: ["The first days will be difficult,", "but she will learn fast."] },
      { id: "sfut3-l5", text: "She isn't going to move to another city.", es: "No se va a mudar a otra ciudad.", chunks: ["She isn't going to move", "to another city."] },
      { id: "sfut3-l6", text: "Her team is going to help her with the new system.", es: "Su equipo la va a ayudar con el sistema nuevo.", chunks: ["Her team is going to help her", "with the new system."] },
      { id: "sfut3-l7", text: "I think she will be a good agent very soon.", es: "Creo que será una buena agente muy pronto.", chunks: ["I think she will be", "a good agent", "very soon."] },
      { id: "sfut3-l8", text: "In one year she is going to apply for a better position.", es: "En un año va a aplicar a una mejor posición.", chunks: ["In one year", "she is going to apply", "for a better position."] },
    ],
    questions: [
      { id: "sfut3-q1", question: "When is Paola going to start her new job?", questionEs: "¿Cuándo va a empezar Paola su trabajo nuevo?", hint: "She is going to start…", hintEs: "Di el momento." },
      { id: "sfut3-q2", question: "How long is she going to train?", questionEs: "¿Cuánto tiempo va a entrenar?", hint: "She is going to train for…", hintEs: "Usa for + tiempo." },
      { id: "sfut3-q3", question: "Why will the first days be difficult?", questionEs: "¿Por qué serán difíciles los primeros días?", hint: "Because she will…", hintEs: "Usa because + will." },
      { id: "sfut3-q4", question: "Where is she going to work?", questionEs: "¿Dónde va a trabajar?", hint: "She is going to work in…", hintEs: "Di el lugar." },
      { id: "sfut3-q5", question: "What isn't she going to do?", questionEs: "¿Qué no va a hacer?", hint: "She isn't going to…", hintEs: "Negativa con isn't going to." },
      { id: "sfut3-q6", question: "Who is going to help her?", questionEs: "¿Quién la va a ayudar?", hint: "Her team is going to…", hintEs: "Di quién." },
    ],
    finalPrompt: {
      question: "Tell me about Paola's new job: her plans and your predictions.",
      questionEs: "Cuéntame del nuevo trabajo de Paola: sus planes y tus predicciones.",
      tips: {
        en: "Use is going to for her plans and will for your predictions, plus one negative.",
        es: "Usa is going to para sus planes y will para tus predicciones, más una negativa.",
      },
    },
    grammarGoals: [
      "third person plans with is going to",
      "predictions with will and I think… will",
      "negatives with isn't going to",
    ],
  },
  {
    number: 4,
    id: "sfut-4-your-future",
    title: "Your life in five years",
    titleEs: "Tu vida en cinco años",
    person: "first",
    character: null,
    focus: "Predictions about your own future with will and won't.",
    focusEs: "Predicciones sobre tu propio futuro con will y won't.",
    reminder: {
      en: "Will is the same for everybody and the verb never changes: I will live, she will live.",
      es: "Will es igual para todos y el verbo nunca cambia: I will live, she will live.",
    },
    showFullGuide: false,
    instructions: {
      en: "Imagine your life in five years. Say what will change and what won't change.",
      es: "Imagina tu vida en cinco años. Di qué va a cambiar y qué no va a cambiar.",
    },
    vocabulary: ["in five years", "next year", "will", "won't", "probably", "maybe", "better", "goal"],
    lines: [
      { id: "sfut4-l1", text: "In five years I will speak English with confidence.", es: "En cinco años hablaré inglés con confianza.", chunks: ["In five years", "I will speak English", "with confidence."] },
      { id: "sfut4-l2", text: "I will probably work in an international company.", es: "Probablemente trabajaré en una empresa internacional.", chunks: ["I will probably work", "in an international company."] },
      { id: "sfut4-l3", text: "I am going to finish my English course this year.", es: "Voy a terminar mi curso de inglés este año.", chunks: ["I am going to finish", "my English course", "this year."] },
      { id: "sfut4-l4", text: "I won't stop practicing, because practice makes the difference.", es: "No dejaré de practicar, porque la práctica hace la diferencia.", chunks: ["I won't stop practicing,", "because practice", "makes the difference."] },
      { id: "sfut4-l5", text: "Maybe I will live in another city, but I will visit my family often.", es: "Tal vez viviré en otra ciudad, pero visitaré a mi familia seguido.", chunks: ["Maybe I will live", "in another city,", "but I will visit my family often."] },
      { id: "sfut4-l6", text: "I am going to save money for a trip next year.", es: "Voy a ahorrar dinero para un viaje el próximo año.", chunks: ["I am going to save money", "for a trip", "next year."] },
      { id: "sfut4-l7", text: "My English won't be perfect, but it will be strong.", es: "Mi inglés no será perfecto, pero será fuerte.", chunks: ["My English won't be perfect,", "but it will be strong."] },
      { id: "sfut4-l8", text: "I will be proud of everything I will do.", es: "Estaré orgulloso de todo lo que haré.", chunks: ["I will be proud", "of everything", "I will do."] },
    ],
    questions: [
      { id: "sfut4-q1", question: "Where will you live in five years?", questionEs: "¿Dónde vivirás en cinco años?", hint: "I will live in…", hintEs: "Will + verbo base." },
      { id: "sfut4-q2", question: "What will you do differently next year?", questionEs: "¿Qué harás diferente el próximo año?", hint: "Next year I will…", hintEs: "Empieza con la expresión de tiempo." },
      { id: "sfut4-q3", question: "How will your English change?", questionEs: "¿Cómo va a cambiar tu inglés?", hint: "My English will…", hintEs: "Usa will + verbo base." },
      { id: "sfut4-q4", question: "What won't you do?", questionEs: "¿Qué no harás?", hint: "I won't…", hintEs: "Won't = will not." },
      { id: "sfut4-q5", question: "When are you going to finish your course?", questionEs: "¿Cuándo vas a terminar tu curso?", hint: "I am going to finish it…", hintEs: "Usa am going to." },
      { id: "sfut4-q6", question: "Who will help you with your goals?", questionEs: "¿Quién te ayudará con tus metas?", hint: "My… will help me.", hintEs: "Di una persona." },
    ],
    finalPrompt: {
      question: "Tell me about your life in five years. What will change and what won't change?",
      questionEs: "Cuéntame tu vida en cinco años. ¿Qué va a cambiar y qué no va a cambiar?",
      tips: {
        en: "Use at least four sentences with will, one with won't, and one plan with going to.",
        es: "Usa al menos cuatro oraciones con will, una con won't y un plan con going to.",
      },
    },
    grammarGoals: [
      "predictions with will and won't",
      "will never takes -s and never takes to",
      "one real plan with am going to",
    ],
  },
  {
    number: 5,
    id: "sfut-5-marcos",
    title: "Marcos is going to travel",
    titleEs: "Marcos va a viajar",
    person: "third",
    character: "Marcos",
    focus: "A complete future story: plans, predictions, negatives and questions.",
    focusEs: "Una historia completa en futuro: planes, predicciones, negativas y preguntas.",
    reminder: {
      en: "Mix both forms: is going to for the plan, will for what you believe about it.",
      es: "Mezcla las dos formas: is going to para el plan, will para lo que crees sobre él.",
    },
    showFullGuide: false,
    instructions: {
      en: "Marcos is going to travel to Canada next month. Tell the whole plan.",
      es: "Marcos va a viajar a Canadá el próximo mes. Cuenta todo el plan.",
    },
    vocabulary: ["next month", "flight", "two weeks", "is going to", "will", "cold", "visit", "come back"],
    lines: [
      { id: "sfut5-l1", text: "Marcos is going to travel to Canada next month.", es: "Marcos va a viajar a Canadá el próximo mes.", chunks: ["Marcos is going to travel", "to Canada", "next month."] },
      { id: "sfut5-l2", text: "His flight is going to leave on Friday at night.", es: "Su vuelo va a salir el viernes en la noche.", chunks: ["His flight is going to leave", "on Friday", "at night."] },
      { id: "sfut5-l3", text: "He is going to stay with his cousin for two weeks.", es: "Se va a quedar con su primo por dos semanas.", chunks: ["He is going to stay", "with his cousin", "for two weeks."] },
      { id: "sfut5-l4", text: "On the first day he is going to rest and walk around the city.", es: "El primer día va a descansar y caminar por la ciudad.", chunks: ["On the first day", "he is going to rest", "and walk around the city."] },
      { id: "sfut5-l5", text: "It will be very cold, so he is going to buy a warm jacket.", es: "Va a hacer mucho frío, así que va a comprar una chaqueta abrigada.", chunks: ["It will be very cold,", "so he is going to buy", "a warm jacket."] },
      { id: "sfut5-l6", text: "He isn't going to work during the trip.", es: "No va a trabajar durante el viaje.", chunks: ["He isn't going to work", "during the trip."] },
      { id: "sfut5-l7", text: "I think he will practice a lot of English there.", es: "Creo que practicará mucho inglés allá.", chunks: ["I think he will practice", "a lot of English", "there."] },
      { id: "sfut5-l8", text: "He is going to come back on the twentieth and he will tell us everything.", es: "Va a regresar el veinte y nos contará todo.", chunks: ["He is going to come back", "on the twentieth", "and he will tell us everything."] },
    ],
    questions: [
      { id: "sfut5-q1", question: "Where is Marcos going to travel?", questionEs: "¿Adónde va a viajar Marcos?", hint: "He is going to travel to…", hintEs: "Di el país." },
      { id: "sfut5-q2", question: "What is he going to do on the first day?", questionEs: "¿Qué va a hacer el primer día?", hint: "He is going to…", hintEs: "Dos acciones con going to." },
      { id: "sfut5-q3", question: "How long is he going to stay?", questionEs: "¿Cuánto tiempo se va a quedar?", hint: "He is going to stay for…", hintEs: "Usa for + tiempo." },
      { id: "sfut5-q4", question: "Why is he going to buy a jacket?", questionEs: "¿Por qué va a comprar una chaqueta?", hint: "Because it will be…", hintEs: "Usa because + will." },
      { id: "sfut5-q5", question: "When is he going to come back?", questionEs: "¿Cuándo va a regresar?", hint: "He is going to come back on…", hintEs: "Di la fecha." },
      { id: "sfut5-q6", question: "What won't he do during the trip?", questionEs: "¿Qué no va a hacer durante el viaje?", hint: "He won't…", hintEs: "Usa won't o isn't going to." },
    ],
    finalPrompt: {
      question: "Tell me the complete plan of Marcos's trip, from the flight to his return.",
      questionEs: "Cuéntame el plan completo del viaje de Marcos, desde el vuelo hasta su regreso.",
      tips: {
        en: "Use is going to for the plan, will for your predictions, one negative and future time words.",
        es: "Usa is going to para el plan, will para tus predicciones, una negativa y palabras de tiempo futuro.",
      },
    },
    grammarGoals: [
      "a complete future story mixing is going to and will",
      "negatives with isn't going to and won't",
      "future time expressions: next month, on Friday, for two weeks",
    ],
  },
];
