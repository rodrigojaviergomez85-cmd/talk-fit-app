import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced2-ep13-no-phones-on-the-floor/cover.jpg";
import s1 from "@/assets/storybook/advanced2-ep13-no-phones-on-the-floor/s1.jpg";
import s2 from "@/assets/storybook/advanced2-ep13-no-phones-on-the-floor/s2.jpg";
import s3 from "@/assets/storybook/advanced2-ep13-no-phones-on-the-floor/s3.jpg";
import s4 from "@/assets/storybook/advanced2-ep13-no-phones-on-the-floor/s4.jpg";
import s5 from "@/assets/storybook/advanced2-ep13-no-phones-on-the-floor/s5.jpg";
import s6 from "@/assets/storybook/advanced2-ep13-no-phones-on-the-floor/s6.jpg";
import s7 from "@/assets/storybook/advanced2-ep13-no-phones-on-the-floor/s7.jpg";
import s8 from "@/assets/storybook/advanced2-ep13-no-phones-on-the-floor/s8.jpg";
import s9 from "@/assets/storybook/advanced2-ep13-no-phones-on-the-floor/s9.jpg";

export const ADVANCED2_EP13_NO_PHONES_ON_THE_FLOOR: StorybookEpisode = {
  id: "advanced2-ep13-no-phones-on-the-floor",
  moduleId: "advanced-2",
  week: 3,
  title: "No phones on the floor",
  titleEs: "Sin celulares en el piso",
  episodeLabel: {
    en: "Advanced 2 · Episode 13",
    es: "Advanced 2 · Episodio 13",
  },
  previously: [
    {
      en: "Bogotá's platform came back one step at a time.",
      es: "La plataforma de Bogotá volvió un paso a la vez.",
    },
    {
      en: "Mía filmed forty seconds of it from the break room door.",
      es: "Mía grabó cuarenta segundos desde la puerta de la sala de descanso.",
    },
    {
      en: "Nico is in the clip. He looked calm.",
      es: "Nico sale en el clip. Se veía calmado.",
    },
  ],
  reviewWords: [
    { word: "policy", es: "política" },
    { word: "reason", es: "razón" },
    { word: "instead", es: "en cambio" },
    { word: "review", es: "revisión" },
    { word: "delete", es: "borrar" },
  ],
  blurb: {
    en: "Mía wants to post the clip. Northline says no phones on the floor, and Dani has to say no, say why, and offer something else without hiding behind the rule. Nico says no to a refund the same way. And the clip stays on Mía's phone.",
    es: "Mía quiere publicar el clip. Northline dice sin celulares en el piso, y Dani tiene que decir que no, decir por qué, y ofrecer otra cosa sin esconderse detrás de la regla. Nico le dice que no a un reembolso de la misma manera. Y el clip se queda en el celular de Mía.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Wednesday morning at Dani's desk; Mía holding her phone sideways in front of him, a paused video on it showing the floor, a laptop and a hand on an arm; Dani not taking the phone.",
      text: "Wednesday, 8:10 a.m.",
      es: "Miércoles, 8:10 a.m.",
      speaker: "mia",
      cast: ["mia", "dani"],
      lines: [
        {
          speaker: "mia",
          text: "Forty seconds. You, the laptop, Nico's hand, 'one step at a time'. Northline agents doing English. It's the best training clip anyone here has ever made and I made it by accident.",
          es: "Cuarenta segundos. Tú, la laptop, la mano de Nico, 'un paso a la vez'. Agentes de Northline hablando inglés. Es el mejor clip de entrenamiento que alguien haya hecho aquí y lo hice por accidente.",
        },
        {
          speaker: "dani",
          text: "Where did you film it?",
          es: "¿Dónde lo grabaste?",
        },
        {
          speaker: "mia",
          text: "The floor. From the break room door. Yesterday, 7:09.",
          es: "El piso. Desde la puerta de la sala de descanso. Ayer, 7:09.",
        },
      ],
      words: [
        { word: "clip", es: "clip" },
        { word: "accident", es: "accidente" },
        { word: "film", es: "grabar" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Close on the paused clip on Mía's phone: behind Dani and the laptop, two agent monitors are visible with account screens open; Dani's finger pointing at one of them.",
      text: "He points at the background, not at her.",
      es: "Señala el fondo, no a ella.",
      speaker: "dani",
      cast: ["dani", "mia"],
      lines: [
        {
          speaker: "dani",
          text: "I wish I could say yes, but let me be honest with you. Unfortunately, we can't post anything filmed on the floor. Not you, not me, not Barrett.",
          es: "Ojalá pudiera decir que sí, pero déjame ser honesto contigo. Lamentablemente, no podemos publicar nada grabado en el piso. Ni tú, ni yo, ni Barrett.",
        },
        {
          speaker: "mia",
          text: "It's forty seconds of you being good at your job.",
          es: "Son cuarenta segundos de ti siendo bueno en tu trabajo.",
        },
        {
          speaker: "dani",
          text: "The reason is right there. Two customer screens behind me. Names, account numbers. Even blurred, that's their data on your phone.",
          es: "La razón está ahí mismo. Dos pantallas de clientes detrás de mí. Nombres, números de cuenta. Aunque estén borrosos, esos son sus datos en tu celular.",
        },
        {
          speaker: "mia",
          text: "So the rule is about the screens, not about me.",
          es: "O sea que la regla es sobre las pantallas, no sobre mí.",
        },
        {
          speaker: "dani",
          text: "The rule is about the screens. It says 'phones' because it can't tell the difference.",
          es: "La regla es sobre las pantallas. Dice 'celulares' porque no sabe distinguir.",
        },
      ],
      words: [
        { word: "blurred", es: "borrosos" },
        { word: "data", es: "datos" },
        { word: "difference", es: "diferencia" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Mía crossing her arms, phone against her chest; Dani drawing a rectangle in the air with both hands, the training room visible through the glass behind them.",
      text: "Then the other door.",
      es: "Luego la otra puerta.",
      speaker: "mia",
      cast: ["mia", "dani"],
      lines: [
        {
          speaker: "mia",
          text: "'I know that's not the answer you wanted.' Is that the next line?",
          es: "'Sé que no es la respuesta que querías'. ¿Esa es la siguiente línea?",
        },
        {
          speaker: "dani",
          text: "It was going to be.",
          es: "Iba a serlo.",
        },
        {
          speaker: "mia",
          text: "Skip it.",
          es: "Sáltatela.",
        },
        {
          speaker: "dani",
          text: "What we can do instead is film the same forty seconds in the training room, no screens, and put it on Northline's official account. Another possibility is I send it to Barrett for review first and she decides where it goes.",
          es: "Lo que podemos hacer en cambio es grabar los mismos cuarenta segundos en la sala de entrenamiento, sin pantallas, y ponerlo en la cuenta oficial de Northline. Otra posibilidad es que se lo mande a Barrett para revisión primero y ella decida adónde va.",
        },
        {
          speaker: "mia",
          text: "Northline's official account has forty followers and a photo of a plant.",
          es: "La cuenta oficial de Northline tiene cuarenta seguidores y una foto de una planta.",
        },
        {
          speaker: "dani",
          text: "Then it'll have forty-one. Either way, you'll get an answer this week.",
          es: "Entonces va a tener cuarenta y uno. De cualquier forma, tendrás una respuesta esta semana.",
        },
      ],
      words: [
        { word: "skip", es: "saltar" },
        { word: "official", es: "oficial" },
        { word: "followers", es: "seguidores" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Ms. Barrett's office; Barrett behind her desk with rimless glasses on, Dani standing, a printed page between them with the word POLICY at the top.",
      text: "10:00 a.m. Barrett's office.",
      es: "10:00 a.m. La oficina de Barrett.",
      speaker: "barrett",
      cast: ["barrett", "dani"],
      lines: [
        {
          speaker: "barrett",
          text: "You told her no. Good. Then you promised her the official account. That's mine to promise, not yours.",
          es: "Le dijiste que no. Bien. Después le prometiste la cuenta oficial. Eso me toca prometerlo a mí, no a ti.",
        },
        {
          speaker: "dani",
          text: "I said 'another possibility is review'.",
          es: "Dije 'otra posibilidad es revisión'.",
        },
        {
          speaker: "barrett",
          text: "You said 'forty-one'. She heard a yes. Don't walk it back to her; bring it to me first next time.",
          es: "Dijiste 'cuarenta y uno'. Ella oyó un sí. No se lo retractes a ella; tráemelo a mí primero la próxima vez.",
        },
        {
          speaker: "dani",
          text: "Fair. And the floor clip?",
          es: "Justo. ¿Y el clip del piso?",
        },
        {
          speaker: "barrett",
          text: "Gets deleted. Today. That's not a possibility, that's the policy.",
          es: "Se borra. Hoy. Eso no es una posibilidad, es la política.",
        },
      ],
      words: [
        { word: "promised", es: "prometiste" },
        { word: "possibility", es: "posibilidad" },
        { word: "deleted", es: "borrado" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "The wall screen reads SUBSCRIPTIONS, REFUNDS; Nico on a call, hood down, headset on, a customer account with a closed date on his screen; Dani and Óscar listening from the next row. No customer is drawn.",
      text: "11:20 a.m. Nico takes one.",
      es: "11:20 a.m. Nico toma una.",
      speaker: "nico",
      lines: [
        {
          speaker: "caller",
          text: "I want a refund. I didn't use the service for two months.",
          es: "Quiero un reembolso. No usé el servicio por dos meses.",
        },
        {
          speaker: "nico",
          text: "I wish I could say yes, but let me be honest with you. Unfortunately, we can't refund after thirty days. The reason is the account closes automatically at that point.",
          es: "Ojalá pudiera decir que sí, pero déjeme ser honesto con usted. Lamentablemente, no podemos reembolsar después de treinta días. La razón es que la cuenta se cierra automáticamente en ese momento.",
        },
        {
          speaker: "caller",
          text: "That's ridiculous.",
          es: "Eso es ridículo.",
        },
        {
          speaker: "nico",
          text: "What we can do instead is give you a credit for next month. Another possibility is to pause the service for sixty days.",
          es: "Lo que podemos hacer en cambio es darle un crédito para el próximo mes. Otra posibilidad es pausar el servicio por sesenta días.",
        },
        {
          speaker: "caller",
          text: "...The credit.",
          es: "...El crédito.",
        },
      ],
      words: [
        { word: "refund", es: "reembolso" },
        { word: "automatically", es: "automáticamente" },
        { word: "credit", es: "crédito" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Nico hanging up and pulling his hood back up in one movement; Óscar staring at him; Dani writing something small on his notepad.",
      text: "He hangs up. Hood up.",
      es: "Cuelga. Capucha arriba.",
      speaker: "oscar",
      cast: ["oscar", "nico", "dani"],
      lines: [
        {
          speaker: "oscar",
          text: "That's more words than you said all last week.",
          es: "Son más palabras de las que dijiste toda la semana pasada.",
        },
        {
          speaker: "nico",
          text: "They were in order. That's the only reason I said them.",
          es: "Estaban en orden. Esa es la única razón por la que las dije.",
        },
        {
          speaker: "dani",
          text: "You didn't apologize for the rule. You said the reason. She took the credit because the reason was real.",
          es: "No te disculpaste por la regla. Dijiste la razón. Tomó el crédito porque la razón era real.",
        },
        {
          speaker: "nico",
          text: "I learned it this morning. From a guy explaining screens to Mía.",
          es: "Lo aprendí esta mañana. De un tipo explicándole pantallas a Mía.",
        },
      ],
      words: [
        { word: "order", es: "orden" },
        { word: "rule", es: "regla" },
        { word: "real", es: "real" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Break room, afternoon; Mía on the counter with her phone face down beside her; Dani standing with his coffee, not close; the vending machine humming.",
      text: "3:15 p.m. He has to ask.",
      es: "3:15 p.m. Tiene que preguntar.",
      speaker: "dani",
      cast: ["dani", "mia"],
      lines: [
        {
          speaker: "dani",
          text: "Barrett asked me to ask you to delete the floor clip. So I'm asking.",
          es: "Barrett me pidió que te pidiera borrar el clip del piso. Así que te lo pido.",
        },
        {
          speaker: "mia",
          text: "I'll think about it.",
          es: "Lo voy a pensar.",
        },
        {
          speaker: "dani",
          text: "Mía.",
          es: "Mía.",
        },
        {
          speaker: "mia",
          text: "I said I'd think about it. That's not a no.",
          es: "Dije que lo iba a pensar. Eso no es un no.",
        },
        {
          speaker: "dani",
          text: "It's not a yes either.",
          es: "Tampoco es un sí.",
        },
        {
          speaker: "mia",
          text: "You taught me that one. On a napkin.",
          es: "Eso me lo enseñaste tú. En una servilleta.",
        },
      ],
      words: [
        { word: "delete", es: "borrar" },
        { word: "either", es: "tampoco" },
        { word: "napkin", es: "servilleta" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Camila and Dani at the end of the row at closing time, Camila with her tablet showing a calendar with next Thursday circled.",
      text: "6:30 p.m. Camila has a calendar.",
      es: "6:30 p.m. Camila tiene un calendario.",
      speaker: "camila",
      cast: ["camila", "dani"],
      lines: [
        {
          speaker: "camila",
          text: "Vale called me. She wants to move the committee meeting to next Thursday at ten.",
          es: "Vale me llamó. Quiere mover la reunión del comité al próximo jueves a las diez.",
        },
        {
          speaker: "dani",
          text: "Next Thursday at ten is audit prep. Mía and Nico. I put it there in week one.",
          es: "El próximo jueves a las diez es la preparación de la auditoría. Mía y Nico. Lo puse ahí en la semana uno.",
        },
        {
          speaker: "camila",
          text: "I know. She's calling you Friday morning. Say the conflict early, or she'll have booked the room before you say it.",
          es: "Lo sé. Te va a llamar el viernes en la mañana. Di el conflicto temprano, o va a haber reservado la sala antes de que lo digas.",
        },
        {
          speaker: "dani",
          text: "Tomorrow I'm in Miami with Barrett.",
          es: "Mañana estoy en Miami con Barrett.",
        },
        {
          speaker: "camila",
          text: "Then think about it on the plane.",
          es: "Entonces piénsalo en el avión.",
        },
      ],
      words: [
        { word: "committee", es: "comité" },
        { word: "audit", es: "auditoría" },
        { word: "plane", es: "avión" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Night; the bus stop; Mía sitting with her phone lit, the paused clip on it; Nico standing next to her with his hood up, not looking at the screen.",
      text: "9:40 p.m. She watches it twice.",
      es: "9:40 p.m. Lo ve dos veces.",
      speaker: "nico",
      cast: ["nico", "mia"],
      lines: [
        {
          speaker: "nico",
          text: "Did you delete it?",
          es: "¿Lo borraste?",
        },
        {
          speaker: "mia",
          text: "I'm thinking about it.",
          es: "Lo estoy pensando.",
        },
        {
          speaker: "nico",
          text: "That's a no.",
          es: "Eso es un no.",
        },
        {
          speaker: "mia",
          text: "That's a not yet.",
          es: "Eso es un todavía no.",
        },
      ],
      words: [
        { word: "twice", es: "dos veces" },
        { word: "thinking", es: "pensando" },
        { word: "yet", es: "todavía" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s2",
      questionEn: "Why can't Mía post the clip, according to Dani?",
      questionEs: "¿Por qué no puede Mía publicar el clip, según Dani?",
      options: [
        { label: "Because there are customer screens with their data in the background", emoji: "🖥️" },
        { label: "Because Dani doesn't want to be on TikTok", emoji: "🙈" },
        { label: "Because Nico didn't give permission", emoji: "✋" },
      ],
      answer: 0,
      sayIt: "Because there are customer screens with their data in the background.",
      sayItEs: "Porque hay pantallas de clientes con sus datos en el fondo.",
      sayItCheck: {
        target: "* customer screens *",
        altTargets: ["Because of the screens *", "Customer data *", "The screens behind him *"],
      },
    },
    {
      id: "q2",
      afterScene: "s5",
      questionEn: "Someone asks for something the rules don't allow. Say no honestly, give the reason, and offer what you can do instead.",
      questionEs: "Alguien pide algo que las reglas no permiten. Di que no con honestidad, da la razón, y ofrece lo que sí puedes hacer.",
      options: [
        { label: "I am ready to answer", emoji: "🎧" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "Unfortunately, we can't refund after thirty days. The reason is the account closes automatically at that point. What we can do instead is give you a credit for next month.",
      sayItEs: "Lamentablemente, no podemos reembolsar después de treinta días. La razón es que la cuenta se cierra automáticamente en ese momento. Lo que podemos hacer en cambio es darle un crédito para el próximo mes.",
      sayItAskEn: "Start with \"Unfortunately, we can't ...\", then \"The reason is ...\", and close with \"What we can do instead is ...\".",
      sayItAskEs: "Empieza con \"Unfortunately, we can't …\", luego \"The reason is …\" y cierra con \"What we can do instead is …\".",
      sayItCheck: {
        target: "Unfortunately, we can't *",
        altTargets: ["The reason is *", "What we can do instead *", "Another possibility is *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s3",
    phrase: "I don't hide behind the rule. I say the reason the rule exists.",
    es: "No me escondo detrás de la regla. Digo la razón por la que existe la regla.",
  },
  habitCard: {
    afterScene: "s6",
    phrase: "When I say no, the next sentence is always what I can do instead.",
    es: "Cuando digo que no, la siguiente frase siempre es lo que sí puedo hacer.",
    model: "nico",
    modelActionEs: "Nico dijo la regla, la razón y dos alternativas en orden, y la clienta tomó el crédito porque la razón era real.",
  },
  expressions: [
    {
      phrase: "walk back",
      variants: ["walk it back", "walked back", "walking back"],
      es: "retractarse, echarse para atrás",
      kind: "phrasal",
      example: "You said 'forty-one'. She heard a yes. Don't walk it back to her; bring it to me first next time.",
      exampleEs: "Dijiste 'cuarenta y uno'. Ella oyó un sí. No se lo retractes a ella; tráemelo a mí primero la próxima vez.",
    },
    {
      phrase: "think about it",
      variants: ["think it over", "thinking about it", "thought about it"],
      es: "pensarlo",
      kind: "phrasal",
      example: "I said I'd think about it. That's not a no.",
      exampleEs: "Dije que lo iba a pensar. Eso no es un no.",
    },
    {
      phrase: "either way",
      variants: ["one way or the other"],
      es: "de cualquier forma, en cualquier caso",
      kind: "idiom",
      example: "Then it'll have forty-one. Either way, you'll get an answer this week.",
      exampleEs: "Entonces va a tener cuarenta y uno. De cualquier forma, tendrás una respuesta esta semana.",
    },
    {
      phrase: "let me be honest with you",
      variants: ["to be honest with you", "let me be honest"],
      es: "déjame ser honesto contigo",
      kind: "idiom",
      example: "I wish I could say yes, but let me be honest with you. Unfortunately, we can't post anything filmed on the floor. Not you, not me, not Barrett.",
      exampleEs: "Ojalá pudiera decir que sí, pero déjame ser honesto contigo. Lamentablemente, no podemos publicar nada grabado en el piso. Ni tú, ni yo, ni Barrett.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: someone asks for something your rules don't allow. Say no without hiding behind the rule, give the real reason, and offer two other options.",
    es: "Treinta segundos: alguien pide algo que tus reglas no permiten. Di que no sin esconderte detrás de la regla, da la razón real, y ofrece dos opciones más.",
  },
  continueWith: [
    "I wish I could say yes, but let me be honest with you.",
    "Unfortunately, we can't ... The reason is ...",
    "What we can do instead is ...",
    "Another possibility is ... Either way, you'll get an answer this week.",
  ],
  cliffhanger: {
    en: "Tomorrow: Miami. A hotel lobby, a guest who has come downstairs three times, and Barrett standing two steps behind Dani saying nothing.",
    es: "Mañana: Miami. El lobby de un hotel, una huésped que ha bajado tres veces, y Barrett dos pasos detrás de Dani sin decir nada.",
  },
};
