import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced1-ep9-in-their-own-words/cover.jpg";
import s1 from "@/assets/storybook/advanced1-ep9-in-their-own-words/s1.jpg";
import s2 from "@/assets/storybook/advanced1-ep9-in-their-own-words/s2.jpg";
import s3 from "@/assets/storybook/advanced1-ep9-in-their-own-words/s3.jpg";
import s4 from "@/assets/storybook/advanced1-ep9-in-their-own-words/s4.jpg";
import s5 from "@/assets/storybook/advanced1-ep9-in-their-own-words/s5.jpg";
import s6 from "@/assets/storybook/advanced1-ep9-in-their-own-words/s6.jpg";
import s7 from "@/assets/storybook/advanced1-ep9-in-their-own-words/s7.jpg";
import s8 from "@/assets/storybook/advanced1-ep9-in-their-own-words/s8.jpg";
import s9 from "@/assets/storybook/advanced1-ep9-in-their-own-words/s9.jpg";

export const ADVANCED1_EP9_IN_THEIR_OWN_WORDS: StorybookEpisode = {
  id: "advanced1-ep9-in-their-own-words",
  moduleId: "advanced-1",
  week: 2,
  title: "In their own words",
  titleEs: "En sus propias palabras",
  episodeLabel: {
    en: "Advanced 1 · Episode 9",
    es: "Advanced 1 · Episodio 9",
  },
  previously: [
    {
      en: "Dani and Camila disagreed hard, and Vale built a third plan from both ideas.",
      es: "Dani y Camila discutieron fuerte, y Vale construyó un tercer plan con ambas ideas.",
    },
    {
      en: "Reed noticed one voice was missing: the students.",
      es: "Reed notó que faltaba una voz: los estudiantes.",
    },
    {
      en: "So the team spends Saturday listening instead of selling.",
      es: "Así que el equipo pasa el sábado escuchando en lugar de vender.",
    },
  ],
  reviewWords: [
    { word: "customer", es: "cliente" },
    { word: "evidence", es: "evidencia" },
    { word: "depth", es: "profundidad" },
    { word: "promise", es: "promesa" },
    { word: "trust", es: "confianza" },
  ],
  blurb: {
    en: "Three students say why they really study English, and not one of them mentions grammar.",
    es: "Tres estudiantes dicen por qué estudian inglés de verdad, y ninguno menciona la gramática.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale, Dani and Camila set up two chairs and a recorder in a quiet classroom.",
      text: "Saturday, nine in the morning. Two chairs, one recorder, no slides.",
      es: "Sábado, nueve de la mañana. Dos sillas, una grabadora, sin diapositivas.",
      speaker: "vale",
      cast: ["vale", "dani", "camila"],
      lines: [
        {
          speaker: "vale",
          text: "Rules for today: we ask, they talk. Nobody sells anything, and nobody corrects their English.",
          es: "Reglas de hoy: nosotros preguntamos, ellos hablan. Nadie vende nada, y nadie corrige su inglés.",
        },
        {
          speaker: "dani",
          text: "What if they say something we do not want to hear?",
          es: "¿Y si dicen algo que no queremos escuchar?",
        },
        {
          speaker: "camila",
          text: "Then we write it down word for word. The complaint we avoid today becomes the client we lose in June.",
          es: "Entonces lo escribimos palabra por palabra. La queja que evitamos hoy se convierte en el cliente que perdemos en junio.",
        },
      ],
      words: [
        { word: "recorder", es: "grabadora" },
        { word: "complaint", es: "queja" },
        { word: "avoid", es: "evitar" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Marta, a woman in her thirties, sits in front of Vale and speaks with her hands.",
      text: "Marta comes in first. She has been studying for eleven months.",
      es: "Marta entra primero. Lleva once meses estudiando.",
      speaker: "marta",
      cast: ["vale", "marta"],
      lines: [
        {
          speaker: "vale",
          text: "Marta, forget the academy for a second. Why are you really learning English?",
          es: "Marta, olvida la academia por un segundo. ¿Por qué estás aprendiendo inglés de verdad?",
        },
        {
          speaker: "marta",
          text: "Because my daughter was born there and she is starting school. If I cannot talk to her teachers, somebody else will have to explain my own child to me.",
          es: "Porque mi hija nació allá y está empezando la escuela. Si no puedo hablar con sus maestras, alguien más tendrá que explicarme a mi propia hija.",
        },
        {
          speaker: "vale",
          text: "So it is not about work at all. It is about not being left outside a conversation that belongs to you.",
          es: "Entonces no se trata del trabajo en absoluto. Se trata de no quedar fuera de una conversación que te pertenece.",
        },
      ],
      words: [
        { word: "daughter", es: "hija" },
        { word: "teachers", es: "maestras" },
        { word: "outside", es: "fuera" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Nelson, a young man in a delivery company uniform, talks to Camila with a nervous laugh.",
      text: "Nelson has been promoted twice and refused once.",
      es: "A Nelson lo ascendieron dos veces y una vez lo rechazó.",
      speaker: "nelson",
      cast: ["camila", "nelson"],
      lines: [
        {
          speaker: "camila",
          text: "Nelson, your English is better than you think. What are you still afraid of?",
          es: "Nelson, tu inglés es mejor de lo que crees. ¿A qué le sigues teniendo miedo?",
        },
        {
          speaker: "nelson",
          text: "The phone. In a meeting I can watch faces, but on a call I only hear a voice that never slows down, and my head goes empty.",
          es: "El teléfono. En una reunión puedo ver las caras, pero en una llamada solo escucho una voz que nunca baja la velocidad, y mi cabeza se queda vacía.",
        },
        {
          speaker: "nelson",
          text: "I turned down a supervisor job last year because of that. If calls had been part of my training, I would have said yes.",
          es: "Rechacé un puesto de supervisor el año pasado por eso. Si las llamadas hubieran sido parte de mi entrenamiento, habría dicho que sí.",
        },
      ],
      words: [
        { word: "empty", es: "vacía" },
        { word: "supervisor", es: "supervisor" },
        { word: "training", es: "entrenamiento" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Elena, a woman around fifty, speaks calmly to Dani while he writes fast.",
      text: "Elena is the one Dani did not expect.",
      es: "Elena es la que Dani no esperaba.",
      speaker: "elena",
      cast: ["dani", "elena"],
      lines: [
        {
          speaker: "dani",
          text: "Elena, you run your own bakery. Nobody is asking you for English.",
          es: "Elena, usted tiene su propia panadería. Nadie le está pidiendo inglés.",
        },
        {
          speaker: "elena",
          text: "Nobody asks, but everybody notices. Two tourists came in last month, and I pointed at the bread like a woman who had lost her voice.",
          es: "Nadie lo pide, pero todos lo notan. El mes pasado entraron dos turistas y yo señalé el pan como una mujer que había perdido la voz.",
        },
        {
          speaker: "elena",
          text: "I have been selling for thirty years. That afternoon I sold nothing, although the bread was the same bread.",
          es: "Llevo treinta años vendiendo. Esa tarde no vendí nada, aunque el pan era el mismo pan.",
        },
      ],
      words: [
        { word: "bakery", es: "panadería" },
        { word: "tourists", es: "turistas" },
        { word: "bread", es: "pan" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "The team reads the three quotes written on the whiteboard after the interviews.",
      text: "Three interviews, three sentences on the board, and not one of them is grammar.",
      es: "Tres entrevistas, tres frases en la pizarra, y ninguna es de gramática.",
      speaker: "camila",
      cast: ["vale", "dani", "camila"],
      lines: [
        {
          speaker: "camila",
          text: "Nobody said past perfect. They said my daughter, the phone, and two tourists at the door.",
          es: "Nadie dijo pasado perfecto. Dijeron mi hija, el teléfono y dos turistas en la puerta.",
        },
        {
          speaker: "dani",
          text: "Which means our four-week intensive is being sold with the wrong words. What they are buying is not speed; it is not being left outside.",
          es: "Lo que significa que nuestro intensivo de cuatro semanas se está vendiendo con las palabras equivocadas. Lo que compran no es velocidad; es no quedarse afuera.",
        },
        {
          speaker: "vale",
          text: "Exactly. If we describe the course in their language instead of ours, half of the objections disappear before anyone raises them.",
          es: "Exacto. Si describimos el curso en su lenguaje en vez del nuestro, la mitad de las objeciones desaparece antes de que alguien las plantee.",
        },
      ],
      words: [
        { word: "objections", es: "objeciones" },
        { word: "disappear", es: "desaparecen" },
        { word: "describe", es: "describir" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Camila adds a phone-call module to the plan on the screen while Vale nods.",
      text: "One interview changes the actual course.",
      es: "Una entrevista cambia el curso de verdad.",
      speaker: "vale",
      cast: ["vale", "dani", "camila"],
      lines: [
        {
          speaker: "camila",
          text: "Nelson's fear is not unusual. I would add a weekly call module: no faces, no video, only voices.",
          es: "El miedo de Nelson no es raro. Yo agregaría un módulo semanal de llamadas: sin caras, sin video, solo voces.",
        },
        {
          speaker: "vale",
          text: "Add it and make it uncomfortable on purpose. A learner who has only practised with a friendly face is not ready for a real client.",
          es: "Agrégalo y hazlo incómodo a propósito. Un estudiante que solo ha practicado con una cara amable no está listo para un cliente real.",
        },
        {
          speaker: "dani",
          text: "I will bring it to Northline like this: your staff will not freeze on the phone, because freezing is what costs you contracts.",
          es: "Se lo llevaré a Northline así: su personal no se congelará en el teléfono, porque congelarse es lo que les cuesta contratos.",
        },
      ],
      words: [
        { word: "module", es: "módulo" },
        { word: "purpose", es: "propósito" },
        { word: "freeze", es: "congelarse" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale plays the students' recorded voices to the committee on the call.",
      text: "Monday. Vale brings their words, not her summary.",
      es: "Lunes. Vale trae sus palabras, no su resumen.",
      speaker: "narrator",
      cast: ["vale", "reed"],
      lines: [
        {
          speaker: "vale",
          text: "You asked for their voices, so I brought three. A mother, a driver and a baker; none of them mentioned grammar once.",
          es: "Pidieron sus voces, así que traje tres. Una madre, un repartidor y una panadera; ninguno mencionó la gramática ni una vez.",
        },
        {
          speaker: "narrator",
          text: "A committee member asks: and what did you change because of them?",
          es: "Un miembro del comité pregunta: ¿y qué cambiaron por ellos?",
        },
        {
          speaker: "vale",
          text: "A phone-call module was added and our whole description was rewritten in their language. Had we skipped these interviews, we would have sold a course nobody actually asked for.",
          es: "Se agregó un módulo de llamadas y toda nuestra descripción fue reescrita en su lenguaje. Si nos hubiéramos saltado estas entrevistas, habríamos vendido un curso que nadie pidió.",
        },
      ],
      words: [
        { word: "driver", es: "repartidor; conductor" },
        { word: "baker", es: "panadera" },
        { word: "skipped", es: "saltado; omitido" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Reed answers from the screen with an unusual half smile.",
      text: "Reed says the quiet part out loud.",
      es: "Reed dice en voz alta la parte silenciosa.",
      speaker: "reed",
      cast: ["vale", "reed"],
      lines: [
        {
          speaker: "reed",
          text: "Nine academies sent us a market analysis. You sent us a woman who could not talk to her daughter's teacher.",
          es: "Nueve academias nos enviaron un análisis de mercado. Ustedes nos enviaron a una mujer que no podía hablar con la maestra de su hija.",
        },
        {
          speaker: "vale",
          text: "Because a market does not sit in my classroom on a Saturday. Marta does.",
          es: "Porque un mercado no se sienta en mi salón un sábado. Marta sí.",
        },
        {
          speaker: "reed",
          text: "Keep that sentence. You will need it on Friday, when they stop asking questions and start pushing back.",
          es: "Guarda esa frase. La vas a necesitar el viernes, cuando dejen de hacer preguntas y empiecen a poner resistencia.",
        },
      ],
      words: [
        { word: "analysis", es: "análisis" },
        { word: "classroom", es: "salón de clases" },
        { word: "pushing", es: "empujando; presionando" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "The team stands around the board with the three student quotes and Friday circled.",
      text: "Friday is circled on the board, and nobody laughs about it.",
      es: "El viernes está marcado en la pizarra, y nadie se ríe de eso.",
      speaker: "dani",
      cast: ["vale", "dani", "camila"],
      lines: [
        {
          speaker: "dani",
          text: "Friday is the behavioural round. Four stories, and they can interrupt whenever they want.",
          es: "El viernes es la ronda conductual. Cuatro historias, y pueden interrumpir cuando quieran.",
        },
        {
          speaker: "camila",
          text: "Interruptions are what I hate most. That being said, real clients interrupt too, so we might as well get used to it.",
          es: "Las interrupciones son lo que más odio. Dicho eso, los clientes reales también interrumpen, así que más vale acostumbrarnos.",
        },
        {
          speaker: "vale",
          text: "Then we practise with the door closed until interruptions stop scaring us. Monday, eight o'clock, all three of us.",
          es: "Entonces practicamos con la puerta cerrada hasta que las interrupciones dejen de asustarnos. Lunes, ocho en punto, los tres.",
        },
      ],
      words: [
        { word: "behavioural", es: "conductual" },
        { word: "interrupt", es: "interrumpir" },
        { word: "scaring", es: "asustando" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s5",
      questionEn: "Why is Nelson afraid of phone calls in English?",
      questionEs: "¿Por qué Nelson le tiene miedo a las llamadas en inglés?",
      options: [
        { label: "Because he cannot see faces and the voice never slows down", emoji: "📞" },
        { label: "Because he does not know enough vocabulary", emoji: "📕" },
        { label: "Because his phone has bad signal", emoji: "📶" },
      ],
      answer: 0,
      sayIt: "Because he cannot see faces and the voice never slows down.",
      sayItEs: "Porque no puede ver las caras y la voz nunca baja la velocidad.",
      sayItCheck: {
        target: "Because he cannot see faces",
        altTargets: ["He cannot see faces and the voice never slows down", "Because the voice never slows down"],
      },
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "Your turn: think like a customer. Why do you really need English, and what should a course include because of that?",
      questionEs: "Tu turno: piensa como cliente. ¿Por qué necesitas inglés de verdad y qué debería incluir un curso por eso?",
      options: [
        { label: "I am ready to answer", emoji: "🎤" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "What I really need is to handle calls without freezing, because my clients never write, they phone. So a course for me should include weekly calls with no video, even if they feel uncomfortable.",
      sayItEs: "Lo que realmente necesito es manejar llamadas sin congelarme, porque mis clientes nunca escriben, llaman. Así que un curso para mí debería incluir llamadas semanales sin video, aunque se sientan incómodas.",
      sayItAskEn: "Why do you really need English, and what should the course include?",
      sayItAskEs: "¿Por qué necesitas inglés de verdad y qué debería incluir el curso?",
      sayItCheck: {
        target: "What I really need is *",
        altTargets: ["I really need English because *", "I need English to *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s7",
    phrase: "A market does not sit in my classroom. A person does.",
    es: "Un mercado no se sienta en mi salón. Una persona sí.",
  },
  habitCard: {
    afterScene: "s2",
    phrase: "Before I offer a solution, I ask what the person is actually afraid of.",
    es: "Antes de ofrecer una solución, pregunto a qué le teme realmente la persona.",
    model: "vale",
    modelActionEs: "Vale entrevistó a tres estudiantes y escuchó sin vender nada.",
  },
  expressions: [
    {
      phrase: "turn down",
      variants: ["turned down", "turns down", "turning down"],
      es: "rechazar (una oferta)",
      kind: "phrasal",
      example: "I turned down a supervisor job last year because of that.",
      exampleEs: "Rechacé un puesto de supervisor el año pasado por eso.",
    },
    {
      phrase: "write down",
      variants: ["wrote down", "writes down", "writing down"],
      es: "anotar",
      kind: "phrasal",
      example: "Then we write it down word for word.",
      exampleEs: "Entonces lo anotamos palabra por palabra.",
    },
    {
      phrase: "left outside",
      variants: ["being left outside", "leave me outside"],
      es: "quedar excluido de algo que te pertenece",
      kind: "idiom",
      example: "It is about not being left outside a conversation that belongs to you.",
      exampleEs: "Se trata de no quedar excluido de una conversación que te pertenece.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: explain what a customer really needs and how you would solve it.",
    es: "Treinta segundos: explica qué necesita de verdad un cliente y cómo lo resolverías.",
  },
  continueWith: [
    "What they really need is ...",
    "The reason is ...",
    "So I would ...",
  ],
  cliffhanger: {
    en: "Friday is the behavioural round, and this time the committee is allowed to interrupt.",
    es: "El viernes es la ronda conductual, y esta vez el comité puede interrumpir.",
  },
};
