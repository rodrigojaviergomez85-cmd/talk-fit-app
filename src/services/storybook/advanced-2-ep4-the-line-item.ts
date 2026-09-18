import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced2-ep4-the-line-item/cover.jpg";
import s1 from "@/assets/storybook/advanced2-ep4-the-line-item/s1.jpg";
import s2 from "@/assets/storybook/advanced2-ep4-the-line-item/s2.jpg";
import s3 from "@/assets/storybook/advanced2-ep4-the-line-item/s3.jpg";
import s4 from "@/assets/storybook/advanced2-ep4-the-line-item/s4.jpg";
import s5 from "@/assets/storybook/advanced2-ep4-the-line-item/s5.jpg";
import s6 from "@/assets/storybook/advanced2-ep4-the-line-item/s6.jpg";
import s7 from "@/assets/storybook/advanced2-ep4-the-line-item/s7.jpg";
import s8 from "@/assets/storybook/advanced2-ep4-the-line-item/s8.jpg";
import s9 from "@/assets/storybook/advanced2-ep4-the-line-item/s9.jpg";

export const ADVANCED2_EP4_THE_LINE_ITEM: StorybookEpisode = {
  id: "advanced2-ep4-the-line-item",
  moduleId: "advanced-2",
  week: 1,
  title: "The line item",
  titleEs: "La línea de la factura",
  episodeLabel: {
    en: "Advanced 2 · Episode 4",
    es: "Advanced 2 · Episodio 4",
  },
  previously: [
    {
      en: "The floor knows about the ninety-day audit.",
      es: "El piso ya sabe de la auditoría de noventa días.",
    },
    {
      en: "Camila approved eleven paid speaking minutes.",
      es: "Camila aprobó once minutos hablados pagados.",
    },
    {
      en: "And she found a line nobody can explain.",
      es: "Y encontró una línea que nadie puede explicar.",
    },
  ],
  reviewWords: [
    { word: "invoice", es: "factura" },
    { word: "policy", es: "política" },
    { word: "confirm", es: "confirmar" },
    { word: "credit", es: "crédito, abono" },
    { word: "charge", es: "cargo" },
  ],
  blurb: {
    en: "Two bills, two rooms, one frame. A customer was charged twice for a plan he changed, and Northline was charged for something nobody ordered. Dani explains one and then has to explain the other to the person who signs the checks.",
    es: "Dos facturas, dos salas, un mismo marco. A un cliente le cobraron dos veces un plan que cambió, y a Northline le cobraron algo que nadie pidió. Dani explica una y luego tiene que explicarle la otra a quien firma los cheques.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "A printed invoice on Dani's desk with one line circled in red marker; Camila's face on the laptop screen beside it.",
      text: "Thursday, 7:30 a.m.",
      es: "Jueves, 7:30 a.m.",
      speaker: "camila",
      cast: ["camila", "dani"],
      lines: [
        {
          speaker: "camila",
          text: "Line fourteen. Four hundred dollars, every month, since the pilot started. It's called platform support and nobody here ordered platform support.",
          es: "Línea catorce. Cuatrocientos dólares cada mes desde que empezó el piloto. Se llama soporte de plataforma y aquí nadie pidió soporte de plataforma.",
        },
        {
          speaker: "dani",
          text: "Northline is charging us for their own system?",
          es: "¿Northline nos está cobrando por su propio sistema?",
        },
        {
          speaker: "camila",
          text: "Somebody is charging somebody. I want to know which of those two sentences is true before I pay it.",
          es: "Alguien le está cobrando a alguien. Quiero saber cuál de esas dos frases es verdad antes de pagarlo.",
        },
        {
          speaker: "dani",
          text: "Give me the day. I'll take the billing account on the floor and then I'll take that call.",
          es: "Dame el día. Tomo la cuenta de facturación en el piso y después tomo esa llamada.",
        },
      ],
      words: [
        { word: "support", es: "soporte" },
        { word: "ordered", es: "pidió, ordenó" },
        { word: "billing", es: "facturación" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "The floor with the billing account on the wall screen; Mía at her desk already on a call; Óscar sitting very straight with his headset on.",
      text: "8:00 a.m. Billing day.",
      es: "8:00 a.m. Día de facturación.",
      speaker: "mia",
      cast: ["mia", "dani", "oscar"],
      lines: [
        {
          speaker: "mia",
          text: "Billing is the account where people cry, jefe. Fair warning.",
          es: "Facturación es la cuenta donde la gente llora, jefe. Aviso justo.",
        },
        {
          speaker: "oscar",
          text: "I took one yesterday and I said sorry eleven times.",
          es: "Ayer tomé una y dije perdón once veces.",
        },
        {
          speaker: "dani",
          text: "Eleven sorrys is ten too many. Say it once and then explain the charge.",
          es: "Once perdones son diez de más. Dilo una vez y después explica el cargo.",
        },
        {
          speaker: "oscar",
          text: "What if I don't understand the charge?",
          es: "¿Y si no entiendo el cargo?",
        },
        {
          speaker: "dani",
          text: "Then you say that, out loud, and you find out with them on the line. Watch.",
          es: "Entonces lo dices, en voz alta, y lo averiguas con ellos en la línea. Mira.",
        },
      ],
      words: [
        { word: "cry", es: "llorar" },
        { word: "charge", es: "cargo" },
        { word: "sorry", es: "perdón" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Close on Dani's monitor showing a customer bill with two plan charges; his finger on the screen.",
      text: "The customer's bill.",
      es: "La factura del cliente.",
      speaker: "dani",
      lines: [
        {
          speaker: "dani",
          text: "I understand, and let me explain that charge. On your bill there are two charges from this month.",
          es: "Entiendo, y déjeme explicarle ese cargo. En su factura hay dos cargos de este mes.",
        },
        {
          speaker: "caller",
          text: "Two. I have one plan. One.",
          es: "Dos. Yo tengo un plan. Uno.",
        },
        {
          speaker: "dani",
          text: "You do. What happened was your plan changed on the fifteenth, so this month you were charged for both plans, the old one and the new one.",
          es: "Así es. Lo que pasó fue que su plan cambió el quince, así que este mes le cobraron los dos planes, el viejo y el nuevo.",
        },
        {
          speaker: "caller",
          text: "Nobody told me that would happen.",
          es: "Nadie me dijo que eso iba a pasar.",
        },
        {
          speaker: "dani",
          text: "I know that wasn't clear, and I'm sorry about that.",
          es: "Sé que eso no estuvo claro, y lo lamento.",
        },
      ],
      words: [
        { word: "bill", es: "factura" },
        { word: "plan", es: "plan" },
        { word: "clear", es: "claro" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Dani typing while he speaks, calm; Óscar leaning over from the next desk to read the screen.",
      text: "The option.",
      es: "La opción.",
      speaker: "dani",
      lines: [
        {
          speaker: "dani",
          text: "What I can do is apply a credit for the difference. You'll see it on your next bill, in about five business days.",
          es: "Lo que puedo hacer es aplicar un crédito por la diferencia. Lo verá en su próxima factura, en unos cinco días hábiles.",
        },
        {
          speaker: "caller",
          text: "And next month? Is this going to happen again?",
          es: "¿Y el próximo mes? ¿Va a pasar otra vez?",
        },
        {
          speaker: "dani",
          text: "Just to confirm, your next payment will be the normal amount, one plan only. I'm putting that in the note now so the next person sees it.",
          es: "Solo para confirmar, su próximo pago será el monto normal, un solo plan. Lo estoy poniendo en la nota ahora para que la próxima persona lo vea.",
        },
        {
          speaker: "oscar",
          text: "You wrote the note while you were still talking.",
          es: "Escribiste la nota mientras seguías hablando.",
        },
      ],
      words: [
        { word: "credit", es: "crédito, abono" },
        { word: "difference", es: "diferencia" },
        { word: "amount", es: "monto" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Óscar at his own desk with his headset on, notepad in front of him with four words written in big letters.",
      text: "Óscar's turn.",
      es: "El turno de Óscar.",
      speaker: "oscar",
      cast: ["oscar", "dani"],
      lines: [
        {
          speaker: "oscar",
          text: "I understand, and let me explain that charge. What happened was… the date. Your date changed.",
          es: "Entiendo, y déjeme explicarle ese cargo. Lo que pasó fue… la fecha. Su fecha cambió.",
        },
        {
          speaker: "oscar",
          text: "Sorry. My English is— sorry.",
          es: "Perdón. Mi inglés está— perdón.",
        },
        {
          speaker: "dani",
          text: "Don't apologize for the language. Finish the sentence you started. What can you do for them?",
          es: "No te disculpes por el idioma. Termina la frase que empezaste. ¿Qué puedes hacer por ellos?",
        },
        {
          speaker: "oscar",
          text: "What I can do is apply a credit, and you will see it in about five business days.",
          es: "Lo que puedo hacer es aplicar un crédito, y lo verá en unos cinco días hábiles.",
        },
        {
          speaker: "dani",
          text: "That's the call. That's exactly the call.",
          es: "Esa es la llamada. Esa es exactamente la llamada.",
        },
      ],
      words: [
        { word: "date", es: "fecha" },
        { word: "apologize", es: "disculparse" },
        { word: "sentence", es: "frase" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "A video call window on the big screen of a small meeting room: Julieta in Bogotá with a headset, a spreadsheet open next to her face; Dani and Camila on the other side of the table.",
      text: "2:00 p.m. Bogotá calls.",
      es: "2:00 p.m. Bogotá llama.",
      speaker: "julieta",
      cast: ["julieta", "dani", "camila"],
      lines: [
        {
          speaker: "julieta",
          text: "Julieta, quality for the region. I listen to your calls and I score them, so you'll be hearing from me a lot.",
          es: "Julieta, calidad de la región. Escucho sus llamadas y las califico, así que me van a oír bastante.",
        },
        {
          speaker: "camila",
          text: "Then you're the person who can tell me what platform support is on our invoice.",
          es: "Entonces tú eres la persona que me puede decir qué es soporte de plataforma en nuestra factura.",
        },
        {
          speaker: "julieta",
          text: "Line fourteen. I flagged it in July and nobody answered me.",
          es: "Línea catorce. La marqué en julio y nadie me respondió.",
        },
        {
          speaker: "dani",
          text: "You flagged our bill before we did?",
          es: "¿Marcaste nuestra factura antes que nosotros?",
        },
        {
          speaker: "julieta",
          text: "I flag everything. It's the job.",
          es: "Marco todo. Es el trabajo.",
        },
      ],
      words: [
        { word: "quality", es: "calidad" },
        { word: "score", es: "calificar" },
        { word: "flagged", es: "marqué, señalé" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Close on the shared screen: the invoice line highlighted, with a start date in July; Camila writing the date on her hand.",
      text: "Same frame, bigger bill.",
      es: "Mismo marco, factura más grande.",
      speaker: "julieta",
      cast: ["julieta", "camila", "dani"],
      lines: [
        {
          speaker: "julieta",
          text: "What happened was the pilot was set up under the old contract template, and that template includes platform support by default.",
          es: "Lo que pasó fue que el piloto se configuró con la plantilla del contrato viejo, y esa plantilla incluye soporte de plataforma por defecto.",
        },
        {
          speaker: "camila",
          text: "So we've been paying for a default.",
          es: "O sea que hemos estado pagando por algo que venía marcado.",
        },
        {
          speaker: "julieta",
          text: "What I can do is send the correction to contracts today with my note from July attached. That makes it two people, not one.",
          es: "Lo que puedo hacer es enviar la corrección a contratos hoy con mi nota de julio adjunta. Así somos dos personas, no una.",
        },
        {
          speaker: "dani",
          text: "Just to confirm: four hundred a month, three months, credited back, and the line comes off in October.",
          es: "Solo para confirmar: cuatrocientos al mes, tres meses, devueltos, y la línea se quita en octubre.",
        },
        {
          speaker: "julieta",
          text: "Confirmed. In writing, before I log off.",
          es: "Confirmado. Por escrito, antes de desconectarme.",
        },
      ],
      words: [
        { word: "template", es: "plantilla" },
        { word: "default", es: "por defecto" },
        { word: "correction", es: "corrección" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Camila closing her laptop with a small smile; Dani still looking at the empty video call window.",
      text: "After the call.",
      es: "Después de la llamada.",
      speaker: "camila",
      cast: ["camila", "dani"],
      lines: [
        {
          speaker: "camila",
          text: "Twelve hundred dollars, found by a twenty-four-year-old in another country who wrote a note nobody read.",
          es: "Mil doscientos dólares, encontrados por una muchacha de veinticuatro años en otro país que escribió una nota que nadie leyó.",
        },
        {
          speaker: "dani",
          text: "She said it like it was normal.",
          es: "Lo dijo como si fuera normal.",
        },
        {
          speaker: "camila",
          text: "It should be normal. That's the point.",
          es: "Debería ser normal. Ese es el punto.",
        },
        {
          speaker: "dani",
          text: "You're going to tell her that, right? Not just me.",
          es: "Se lo vas a decir a ella, ¿verdad? No solo a mí.",
        },
      ],
      words: [
        { word: "found", es: "encontrados" },
        { word: "normal", es: "normal" },
        { word: "point", es: "punto" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Night on the floor; Nico at his desk with his hood up, a phone screen glowing with a message from his mother; Dani stopping beside him.",
      text: "10:20 p.m.",
      es: "10:20 p.m.",
      speaker: "nico",
      cast: ["nico", "dani"],
      lines: [
        {
          speaker: "nico",
          text: "My mom sent money on Friday. It hasn't arrived.",
          es: "Mi mamá mandó dinero el viernes. No ha llegado.",
        },
        {
          speaker: "dani",
          text: "From Houston?",
          es: "¿Desde Houston?",
        },
        {
          speaker: "nico",
          text: "She calls the fintech every day and they tell her to wait. Tomorrow that account is ours.",
          es: "Llama a la fintech todos los días y le dicen que espere. Mañana esa cuenta es nuestra.",
        },
        {
          speaker: "dani",
          text: "Then tomorrow you take that call, and I'll sit next to you.",
          es: "Entonces mañana tomas esa llamada, y yo me siento a la par.",
        },
      ],
      words: [
        { word: "money", es: "dinero" },
        { word: "arrived", es: "llegado" },
        { word: "wait", es: "esperar" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s7",
      questionEn: "Why was Northline charging for platform support?",
      questionEs: "¿Por qué Northline cobraba soporte de plataforma?",
      options: [
        { label: "The pilot was set up with the old contract template, which includes it by default", emoji: "📄" },
        { label: "Camila approved it in July", emoji: "✅" },
        { label: "The agents asked for extra support", emoji: "🎧" },
      ],
      answer: 0,
      sayIt: "The pilot was set up with the old contract template, which includes it by default.",
      sayItEs: "El piloto se configuró con la plantilla del contrato viejo, que lo incluye por defecto.",
      sayItCheck: {
        target: "The pilot was set up with the old contract template",
        altTargets: ["The old contract template", "It includes it by default"],
      },
    },
    {
      id: "q2",
      afterScene: "s4",
      questionEn: "A customer doesn't recognize a charge. Explain it, give one option and confirm what happens next month.",
      questionEs: "Un cliente no reconoce un cargo. Explícalo, da una opción y confirma qué pasa el próximo mes.",
      options: [
        { label: "I am ready to answer", emoji: "🎧" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "What happened was your plan changed in the middle of the month. What I can do is apply a credit for the difference, and just to confirm, your next payment will be the normal amount.",
      sayItEs: "Lo que pasó fue que su plan cambió a mitad de mes. Lo que puedo hacer es aplicar un crédito por la diferencia, y solo para confirmar, su próximo pago será el monto normal.",
      sayItAskEn: "Start with \"What happened was ...\", then \"What I can do is ...\", then confirm the next charge.",
      sayItAskEs: "Empieza con \"What happened was …\", luego \"What I can do is …\" y confirma el próximo cobro.",
      sayItCheck: {
        target: "What happened was *",
        altTargets: ["What I can do is *", "Let me explain that charge", "Just to confirm *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s5",
    phrase: "I apologize once, then I explain.",
    es: "Me disculpo una vez, y después explico.",
  },
  habitCard: {
    afterScene: "s4",
    phrase: "I write the note while the customer is still on the line, so the next person doesn't start from zero.",
    es: "Escribo la nota mientras el cliente sigue en la línea, para que la próxima persona no empiece de cero.",
    model: "dani",
    modelActionEs: "Dani dejó la nota escrita durante la llamada y por eso el cliente no va a tener que explicar todo otra vez el próximo mes.",
  },
  expressions: [
    {
      phrase: "set up",
      variants: ["was set up", "sets up", "setting up"],
      es: "configurar, montar",
      kind: "phrasal",
      example: "The pilot was set up under the old contract template.",
      exampleEs: "El piloto se configuró con la plantilla del contrato viejo.",
    },
    {
      phrase: "come off",
      variants: ["comes off", "came off"],
      es: "quitarse, salir (de la factura)",
      kind: "phrasal",
      example: "The line comes off in October.",
      exampleEs: "La línea se quita en octubre.",
    },
    {
      phrase: "fair warning",
      es: "aviso justo, te lo advierto",
      kind: "idiom",
      example: "Billing is the account where people cry, jefe. Fair warning.",
      exampleEs: "Facturación es la cuenta donde la gente llora, jefe. Aviso justo.",
    },
    {
      phrase: "that's the point",
      variants: ["That's the point"],
      es: "de eso se trata",
      kind: "idiom",
      example: "It should be normal. That's the point.",
      exampleEs: "Debería ser normal. Ese es el punto.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: explain a charge someone doesn't recognize. Say what happened, offer one option, and confirm the next payment.",
    es: "Treinta segundos: explica un cargo que alguien no reconoce. Di qué pasó, ofrece una opción y confirma el próximo pago.",
  },
  continueWith: [
    "Let me explain that charge.",
    "What happened was ...",
    "What I can do is ...",
    "Just to confirm, ...",
  ],
  cliffhanger: {
    en: "Friday: the money transfer account, a mother in Houston, and the call Nico has been dreading all week.",
    es: "Viernes: la cuenta de transferencias, una mamá en Houston, y la llamada que Nico lleva toda la semana temiendo.",
  },
};
