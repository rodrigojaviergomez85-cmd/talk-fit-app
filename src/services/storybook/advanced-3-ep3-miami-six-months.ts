import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced3-ep3-miami-six-months/cover.jpg";
import s1 from "@/assets/storybook/advanced3-ep3-miami-six-months/s1.jpg";
import s2 from "@/assets/storybook/advanced3-ep3-miami-six-months/s2.jpg";
import s3 from "@/assets/storybook/advanced3-ep3-miami-six-months/s3.jpg";
import s4 from "@/assets/storybook/advanced3-ep3-miami-six-months/s4.jpg";
import s5 from "@/assets/storybook/advanced3-ep3-miami-six-months/s5.jpg";
import s6 from "@/assets/storybook/advanced3-ep3-miami-six-months/s6.jpg";
import s7 from "@/assets/storybook/advanced3-ep3-miami-six-months/s7.jpg";
import s8 from "@/assets/storybook/advanced3-ep3-miami-six-months/s8.jpg";
import s9 from "@/assets/storybook/advanced3-ep3-miami-six-months/s9.jpg";

export const ADVANCED3_EP3_MIAMI_SIX_MONTHS: StorybookEpisode = {
  id: "advanced3-ep3-miami-six-months",
  moduleId: "advanced-3",
  week: 1,
  title: "Miami, six months",
  titleEs: "Miami, seis meses",
  episodeLabel: {
    en: "Advanced 3 · Episode 3",
    es: "Advanced 3 · Episodio 3",
  },
  previously: [
    {
      en: "Dani described the floor live and described Nico. Nico was fine with the second version.",
      es: "Dani describió el piso en vivo y describió a Nico. A Nico le pareció bien la segunda versión.",
    },
    {
      en: "Barrett left a sticky note: MIAMI. Nine a.m. Bring a plan.",
      es: "Barrett dejó una nota adhesiva: MIAMI. Nueve a.m. Traiga un plan.",
    },
    {
      en: "Vale's question is still open.",
      es: "La pregunta de Vale sigue abierta.",
    },
  ],
  reviewWords: [
    { word: "goal", es: "meta" },
    { word: "timeline", es: "cronograma" },
    { word: "director", es: "director" },
    { word: "reason", es: "razón" },
    { word: "consistent", es: "constante" },
  ],
  blurb: {
    en: "Barrett offers the job: global training director, Miami, six months, three countries. Dani has the goal, the plan and the dates, month by month. What he doesn't have is the last part, the reason, and Barrett notices before he does. 'Come back when you have it.' His mother has a story about six months that turned into sixteen years.",
    es: "Barrett ofrece el puesto: director global de entrenamiento, Miami, seis meses, tres países. Dani tiene la meta, el plan y las fechas, mes por mes. Lo que no tiene es la última parte, la razón, y Barrett lo nota antes que él. 'Vuelva cuando la tenga'. Su mamá tiene una historia sobre seis meses que se volvieron dieciséis años.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Wednesday, 9:00 a.m.; Ms. Barrett's office; Barrett behind her desk with a single-page offer letter turned toward Dani, the words GLOBAL TRAINING DIRECTOR and MIAMI visible; Dani seated for once, a notebook on his knee.",
      text: "Wednesday, 9:00 a.m. The note said Miami. The page says six months.",
      es: "Miércoles, 9:00 a.m. La nota decía Miami. La hoja dice seis meses.",
      speaker: "barrett",
      cast: ["barrett", "dani"],
      lines: [
        {
          speaker: "barrett",
          text: "Global training director. Miami, six months, three countries: here, Bogotá, Monterrey. You start in three weeks. Legal already approved the title. I want to hear the plan before I hear a yes.",
          es: "Director global de entrenamiento. Miami, seis meses, tres países: aquí, Bogotá, Monterrey. Empieza en tres semanas. Legal ya aprobó el título. Quiero oír el plan antes de oír un sí.",
        },
        {
          speaker: "dani",
          text: "What I want to do in the next six months is train the trainers in three countries, so that in month seven none of the three floors needs me.",
          es: "Lo que quiero hacer en los próximos seis meses es entrenar a los entrenadores en tres países, para que en el mes siete ninguno de los tres pisos me necesite.",
        },
        {
          speaker: "barrett",
          text: "Go on.",
          es: "Continúe.",
        },
      ],
      words: [
        { word: "global", es: "global" },
        { word: "title", es: "título" },
        { word: "trainers", es: "entrenadores" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Close on Dani's notebook: three columns headed SAN SALVADOR, BOGOTÁ, MONTERREY, with months one to six written down the side and a name in each box; Barrett's pen tapping the empty last line at the bottom.",
      text: "The plan. Month by month.",
      es: "El plan. Mes por mes.",
      speaker: "dani",
      cast: ["dani", "barrett"],
      lines: [
        {
          speaker: "dani",
          text: "The plan is simple: two weeks in each city, one shift on the phones in each, and one person in each city who runs the floor when I leave.",
          es: "El plan es simple: dos semanas en cada ciudad, un turno en los teléfonos en cada una, y una persona en cada ciudad que maneje el piso cuando yo me vaya.",
        },
        {
          speaker: "dani",
          text: "In the first month, Mía runs San Salvador. By the third month, Bogotá has its own Mía; Julieta already has two candidates. By the sixth, Monterrey does.",
          es: "En el primer mes, Mía maneja San Salvador. Para el tercer mes, Bogotá tiene su propia Mía; Julieta ya tiene dos candidatas. Para el sexto, Monterrey también.",
        },
        {
          speaker: "dani",
          text: "I'm also going to record every training session so I can hear my own mistakes.",
          es: "También voy a grabar cada sesión de entrenamiento para oír mis propios errores.",
        },
        {
          speaker: "barrett",
          text: "That's a goal, a plan and a timeline. There's a fourth part.",
          es: "Eso es una meta, un plan y un cronograma. Hay una cuarta parte.",
        },
        {
          speaker: "dani",
          text: "The main reason is that it's a promotion.",
          es: "La razón principal es que es un ascenso.",
        },
        {
          speaker: "barrett",
          text: "You don't believe that. Try again.",
          es: "Usted no cree eso. Intente otra vez.",
        },
      ],
      words: [
        { word: "shift", es: "turno" },
        { word: "candidates", es: "candidatas" },
        { word: "promotion", es: "ascenso" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Barrett leaning back with her glasses in her hand; Dani looking at the notebook's empty last line; the floor visible through the glass behind him.",
      text: "He tries again. It's worse.",
      es: "Intenta otra vez. Es peor.",
      speaker: "dani",
      cast: ["dani", "barrett"],
      lines: [
        {
          speaker: "dani",
          text: "The main reason is that... you asked me.",
          es: "La razón principal es que... usted me lo pidió.",
        },
        {
          speaker: "barrett",
          text: "That's not a reason. That's a schedule with a hole in it. The difficult part won't be Bogotá or Monterrey; it'll be month four, when you're tired and nobody's watching.",
          es: "Eso no es una razón. Es un cronograma con un hueco. La parte difícil no va a ser Bogotá ni Monterrey; va a ser el mes cuatro, cuando esté cansado y nadie esté mirando.",
        },
        {
          speaker: "barrett",
          text: "A plan without a why doesn't survive month four.",
          es: "Un plan sin porqué no sobrevive el mes cuatro.",
        },
        {
          speaker: "dani",
          text: "If that happens, I'll do less, but I won't stop.",
          es: "Si eso pasa, haré menos, pero no voy a parar.",
        },
        {
          speaker: "barrett",
          text: "That's what everyone says in month one. Come back when you have the last part. The offer stays on my desk until Friday.",
          es: "Eso es lo que todos dicen en el mes uno. Vuelva cuando tenga la última parte. La oferta se queda en mi escritorio hasta el viernes.",
        },
      ],
      words: [
        { word: "hole", es: "hueco" },
        { word: "survive", es: "sobrevivir" },
        { word: "offer", es: "oferta" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "The floor; Mía and Nico at their desks with headsets around their necks, both looking at Dani, who is standing between the rows with the notebook closed against his chest.",
      text: "9:40 a.m. The floor knew before he walked out.",
      es: "9:40 a.m. El piso lo sabía antes de que saliera.",
      speaker: "mia",
      cast: ["mia", "nico", "dani"],
      lines: [
        {
          speaker: "mia",
          text: "Are you going?",
          es: "¿Te vas?",
        },
        {
          speaker: "dani",
          text: "I have a plan. Month one, you run this floor.",
          es: "Tengo un plan. Mes uno, tú manejas este piso.",
        },
        {
          speaker: "mia",
          text: "That's not what I asked, jefe.",
          es: "Eso no es lo que pregunté, jefe.",
        },
        {
          speaker: "nico",
          text: "He has a plan and no reason. Barrett sent him back. It's on his face.",
          es: "Tiene un plan y ninguna razón. Barrett lo devolvió. Se le nota en la cara.",
        },
        {
          speaker: "dani",
          text: "It's on my face?",
          es: "¿Se me nota en la cara?",
        },
        {
          speaker: "nico",
          text: "You describe people for a living now. Somebody has to describe you.",
          es: "Ahora describes gente para vivir. Alguien tiene que describirte a ti.",
        },
      ],
      words: [
        { word: "floor", es: "piso" },
        { word: "sent", es: "devolvió" },
        { word: "face", es: "cara" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Camila and Dani at the end of the row; Camila's tablet showing a budget with MIAMI at the top and a line for coffee at the bottom, approved.",
      text: "11:00 a.m. Camila already has the budget.",
      es: "11:00 a.m. Camila ya tiene el presupuesto.",
      speaker: "camila",
      cast: ["camila", "dani"],
      lines: [
        {
          speaker: "camila",
          text: "Six months, three cities, one apartment, twelve flights. I built it last night. It works. Vale saw it and didn't say anything, which is the loudest thing she does.",
          es: "Seis meses, tres ciudades, un apartamento, doce vuelos. Lo armé anoche. Funciona. Vale lo vio y no dijo nada, que es lo más ruidoso que hace.",
        },
        {
          speaker: "dani",
          text: "Barrett says I don't have the why.",
          es: "Barrett dice que no tengo el porqué.",
        },
        {
          speaker: "camila",
          text: "Barrett is right. The budget doesn't need a why. You do. I approve coffees, not reasons.",
          es: "Barrett tiene razón. El presupuesto no necesita un porqué. Tú sí. Yo apruebo cafés, no razones.",
        },
      ],
      words: [
        { word: "budget", es: "presupuesto" },
        { word: "flights", es: "vuelos" },
        { word: "loudest", es: "más ruidoso" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "The training room, empty except for Dani sitting on the tall table with the notebook open to the three columns, a marker in his hand, the whiteboard behind him blank.",
      text: "2:00 p.m. He tries to write the last line alone.",
      es: "2:00 p.m. Intenta escribir la última línea solo.",
      speaker: "dani",
      cast: ["dani"],
      lines: [
        {
          speaker: "dani",
          text: "Because I'm good at it. No. Because they need it. No, they have Mía. Because two million people... no.",
          es: "Porque soy bueno en esto. No. Porque lo necesitan. No, tienen a Mía. Porque dos millones de personas... no.",
        },
        {
          speaker: "dani",
          text: "Because I lose opportunities when I stay quiet. That one's true. It's not enough.",
          es: "Porque pierdo oportunidades cuando me quedo callado. Esa es cierta. No alcanza.",
        },
      ],
      words: [
        { word: "true", es: "cierta" },
        { word: "opportunities", es: "oportunidades" },
        { word: "enough", es: "suficiente" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Óscar in the doorway of the training room with his backpack, no badge, a folded club schedule in his hand; Dani looking up from the whiteboard.",
      text: "6:50 p.m. Club night. Óscar arrives early.",
      es: "6:50 p.m. Noche de club. Óscar llega temprano.",
      speaker: "oscar",
      cast: ["oscar", "dani"],
      lines: [
        {
          speaker: "oscar",
          text: "I'm not on the pilot, so I don't get the news. Are you going to Miami?",
          es: "No estoy en el piloto, así que no me llegan las noticias. ¿Te vas a Miami?",
        },
        {
          speaker: "dani",
          text: "I have a plan and no reason. Everybody keeps telling me.",
          es: "Tengo un plan y ninguna razón. Todos me lo siguen diciendo.",
        },
        {
          speaker: "oscar",
          text: "My cousin came to the club because of you. Not because of a plan. Is that a reason? I don't know. I say 'um' four times per call now. That's mine.",
          es: "Mi primo vino al club por ti. No por un plan. ¿Eso es una razón? No sé. Ahora digo 'um' cuatro veces por llamada. Esa es la mía.",
        },
        {
          speaker: "dani",
          text: "Write that on the board. Under my three columns. In small letters.",
          es: "Escribe eso en la pizarra. Debajo de mis tres columnas. En letra pequeña.",
        },
      ],
      words: [
        { word: "news", es: "noticias" },
        { word: "cousin", es: "primo" },
        { word: "letters", es: "letras" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Night; the bus stop; Dani alone on the bench with his phone to his ear, the notebook on his knee. Only Dani is drawn; the caller is a voice on the phone.",
      text: "9:30 p.m. His mother has a story about six months.",
      es: "9:30 p.m. Su mamá tiene una historia sobre seis meses.",
      speaker: "dani",
      lines: [
        {
          speaker: "estela",
          text: "Miami, six months. Your grandmother went to Los Angeles for six months in 1989, mijo. She came back in 2005.",
          es: "Miami, seis meses. Tu abuela se fue a Los Ángeles seis meses en 1989, mijo. Volvió en 2005.",
        },
        {
          speaker: "dani",
          text: "This is different, mamá.",
          es: "Esto es distinto, mamá.",
        },
        {
          speaker: "estela",
          text: "Everybody says that at the bus stop. I'm not telling you no. I'm telling you to know why before the plane knows.",
          es: "Todos dicen eso en la parada del bus. No te estoy diciendo que no. Te estoy diciendo que sepas por qué antes de que lo sepa el avión.",
        },
        {
          speaker: "dani",
          text: "That's what Barrett said. With fewer years in it.",
          es: "Eso dijo Barrett. Con menos años adentro.",
        },
      ],
      words: [
        { word: "grandmother", es: "abuela" },
        { word: "different", es: "distinto" },
        { word: "plane", es: "avión" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale's small car parked outside the Northline building at night; Vale at the wheel, Dani in the passenger seat holding the notebook open to the three columns and one small line at the bottom in Óscar's handwriting.",
      text: "9:50 p.m. Vale reads the small line at the bottom.",
      es: "9:50 p.m. Vale lee la línea pequeña de abajo.",
      speaker: "vale",
      cast: ["vale", "dani"],
      lines: [
        {
          speaker: "vale",
          text: "'My cousin came because of you.' That's not your handwriting.",
          es: "'Mi primo vino por ti'. Esa no es tu letra.",
        },
        {
          speaker: "dani",
          text: "Óscar's. It's the only line on the page I didn't write, and it's the only one that sounds like a reason.",
          es: "De Óscar. Es la única línea de la página que no escribí yo, y es la única que suena a razón.",
        },
        {
          speaker: "vale",
          text: "Then you don't have the why yet. You have where to look for it. Tomorrow Mía is going to make your plan harder. Let her.",
          es: "Entonces todavía no tienes el porqué. Tienes dónde buscarlo. Mañana Mía te va a hacer el plan más difícil. Déjala.",
        },
      ],
      words: [
        { word: "handwriting", es: "letra" },
        { word: "sounds", es: "suena" },
        { word: "harder", es: "más difícil" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What part of Dani's plan is missing, according to Barrett?",
      questionEs: "¿Qué parte del plan de Dani falta, según Barrett?",
      options: [
        { label: "The why: the reason that survives month four", emoji: "❓" },
        { label: "The timeline: he has no dates", emoji: "🗓️" },
        { label: "The budget: Camila hasn't approved it", emoji: "💵" },
      ],
      answer: 0,
      sayIt: "The why: the reason that survives month four.",
      sayItEs: "El porqué: la razón que sobrevive el mes cuatro.",
      sayItCheck: {
        target: "The why *",
        altTargets: ["The reason *", "The last part *", "* month four"],
      },
    },
    {
      id: "q2",
      afterScene: "s2",
      questionEn: "Explain a plan of yours for the next three months: the goal, how, by when, and the real reason.",
      questionEs: "Explica un plan tuyo para los próximos tres meses: la meta, cómo, para cuándo, y la razón real.",
      options: [
        { label: "I am ready to answer", emoji: "🎧" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "What I want to do in the next three months is speak English at work without preparing. The plan is simple: practice out loud every day, even for ten minutes. By the third month I want to explain problems without translating in my head. The main reason is that I lose opportunities when I stay quiet.",
      sayItEs: "Lo que quiero hacer en los próximos tres meses es hablar inglés en el trabajo sin preparar. El plan es simple: practicar en voz alta todos los días, aunque sean diez minutos. Para el tercer mes quiero explicar problemas sin traducir en mi cabeza. La razón principal es que pierdo oportunidades cuando me quedo callado.",
      sayItAskEn: "Start with \"What I want to do in the next ... is ...\", then \"The plan is ...\", give a date with \"By ...\", and close with \"The main reason is ...\".",
      sayItAskEs: "Empieza con \"What I want to do in the next … is …\", luego \"The plan is …\", da una fecha con \"By …\" y cierra con \"The main reason is …\".",
      sayItCheck: {
        target: "What I want to do *",
        altTargets: ["The plan is *", "The main reason is *", "Because *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s3",
    phrase: "A plan without a why doesn't survive month four. I find the why before I find the flight.",
    es: "Un plan sin porqué no sobrevive el mes cuatro. Encuentro el porqué antes de encontrar el vuelo.",
  },
  habitCard: {
    afterScene: "s6",
    phrase: "When I write a plan, the last line is the reason, and I don't leave it blank.",
    es: "Cuando escribo un plan, la última línea es la razón, y no la dejo en blanco.",
    model: "barrett",
    modelActionEs: "Barrett aceptó la meta, el plan y las fechas de Dani, y le devolvió la hoja por la única línea que estaba vacía.",
  },
  expressions: [
    {
      phrase: "come back",
      variants: ["came back", "comes back", "coming back"],
      es: "volver, regresar",
      kind: "phrasal",
      example: "That's what everyone says in month one. Come back when you have the last part. The offer stays on my desk until Friday.",
      exampleEs: "Eso es lo que todos dicen en el mes uno. Vuelva cuando tenga la última parte. La oferta se queda en mi escritorio hasta el viernes.",
    },
    {
      phrase: "go on",
      variants: ["went on", "goes on", "going on"],
      es: "continuar, seguir",
      kind: "phrasal",
      example: "Go on.",
      exampleEs: "Continúe.",
    },
    {
      phrase: "a hole in it",
      variants: ["with a hole in it", "has a hole in it"],
      es: "con un hueco, incompleto",
      kind: "idiom",
      example: "That's not a reason. That's a schedule with a hole in it.",
      exampleEs: "Eso no es una razón. Es un cronograma con un hueco.",
    },
    {
      phrase: "for a living",
      variants: ["do for a living", "make a living"],
      es: "como trabajo, para ganarse la vida",
      kind: "idiom",
      example: "You describe people for a living now. Somebody has to describe you.",
      exampleEs: "Ahora describes gente para vivir. Alguien tiene que describirte a ti.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: a plan you have for the next six months. Goal, how, by when, what will be hard, and the reason that would survive month four.",
    es: "Treinta segundos: un plan que tienes para los próximos seis meses. Meta, cómo, para cuándo, qué será difícil, y la razón que sobreviviría el mes cuatro.",
  },
  continueWith: [
    "What I want to do in the next six months is ...",
    "The plan is simple: ... By the third month ...",
    "The difficult part will be ... If that happens, I'll ...",
    "The main reason is that ...",
  ],
  cliffhanger: {
    en: "Tomorrow Barrett offers Mía the supervisor job, and Mía says no. Dani's whole month one was built on her yes.",
    es: "Mañana Barrett le ofrece a Mía el puesto de supervisora, y Mía dice que no. Todo el mes uno de Dani estaba construido sobre su sí.",
  },
};
