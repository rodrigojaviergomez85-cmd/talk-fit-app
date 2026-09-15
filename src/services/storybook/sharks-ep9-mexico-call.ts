import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/sharks-ep9-mexico-call/cover.jpg";
import s1 from "@/assets/storybook/sharks-ep9-mexico-call/s1.jpg";
import s2 from "@/assets/storybook/sharks-ep9-mexico-call/s2.jpg";
import s3 from "@/assets/storybook/sharks-ep9-mexico-call/s3.jpg";
import s4 from "@/assets/storybook/sharks-ep9-mexico-call/s4.jpg";
import s5 from "@/assets/storybook/sharks-ep9-mexico-call/s5.jpg";
import s6 from "@/assets/storybook/sharks-ep9-mexico-call/s6.jpg";
import s7 from "@/assets/storybook/sharks-ep9-mexico-call/s7.jpg";
import s8 from "@/assets/storybook/sharks-ep9-mexico-call/s8.jpg";
import s9 from "@/assets/storybook/sharks-ep9-mexico-call/s9.jpg";
import s10 from "@/assets/storybook/sharks-ep9-mexico-call/s10.jpg";
import s11 from "@/assets/storybook/sharks-ep9-mexico-call/s11.jpg";

export const SHARKS_EP9_MEXICO_CALL: StorybookEpisode = {
  id: "sharks-ep9-mexico-call",
  moduleId: "sharks",
  week: 2,
  title: "The Mexico call",
  titleEs: "La llamada de México",
  episodeLabel: {
    en: "Season 8 · Episode 9",
    es: "Temporada 8 · Episodio 9"
  },
  previously: [
    {
      en: "Vale won an international contract, but every new opportunity brings a harder decision.",
      es: "Vale ganó un contrato internacional, pero cada oportunidad trae una decisión más difícil."
    }
  ],
  reviewWords: [
    { word: "contract", es: "contrato" },
    { word: "quality", es: "calidad" },
    { word: "deadline", es: "fecha límite" }
  ],
  blurb: {
    en: "So you want me to buy your brand and run it exactly your way. Good. You should also know that I own six schools that compete with you.",
    es: "Entonces quiere que compre su marca y la maneje exactamente a su manera. Bien. También debe saber que tengo seis escuelas que compiten con ustedes."
  },
  cover: cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Renata speaks from Mexico on the academy's video screen while Dani watches.",
      text: "So you want me to buy your brand and run it exactly your way.",
      es: "Entonces quiere que compre su marca y la maneje exactamente a su manera.",
      speaker: "renata",
      cast: ["renata", "dani", "vale"],
      lines: [
        {
          speaker: "renata",
          text: "So you want me to buy your brand and run it exactly your way.",
          es: "Entonces quiere que compre su marca y la maneje exactamente a su manera."
        },
        {
          speaker: "dani",
          text: "She sounds worried. Vale, she thinks this is a sale, not an alliance. I heard it in her voice from the first word.",
          es: "Suena preocupada. Vale, cree que esto es una venta, no una alianza. Lo escuché en su voz desde la primera palabra."
        },
        {
          speaker: "vale",
          text: "Then let us fix that idea first. Renata, thank you for saying it directly.",
          es: "Entonces arreglemos esa idea primero. Renata, gracias por decirlo directamente."
        }
      ],
      words: [
        { word: "brand", es: "marca" },
        { word: "exactly", es: "exactamente" },
        { word: "alliance", es: "alianza" }
      ]
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale explains the model calmly while Camila takes notes beside her.",
      text: "Not exactly. Let me spell out the model before we get our wires crossed.",
      es: "No exactamente. Déjeme explicar claramente el modelo antes de que nos confundamos.",
      speaker: "vale",
      cast: ["vale", "camila"],
      lines: [
        {
          speaker: "vale",
          text: "Not exactly. Let me spell out the model before we get our wires crossed.",
          es: "No exactamente. Déjeme explicar claramente el modelo antes de que nos confundamos."
        },
        {
          speaker: "camila",
          text: "That is smart. If we define the model first, the price conversation gets easier, and nobody feels pressured.",
          es: "Es inteligente. Si definimos el modelo primero, la conversación del precio se vuelve más fácil, y nadie se siente presionado."
        },
        {
          speaker: "vale",
          text: "Exactly. Nobody should sign something they do not understand.",
          es: "Exacto. Nadie debería firmar algo que no entiende."
        }
      ],
      words: [
        { word: "model", es: "modelo" },
        { word: "define", es: "definir" },
        { word: "sign", es: "firmar" }
      ]
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Renata explains on the video call that she builds schools instead of buying franchises.",
      text: "Please do, because I do not buy franchises. I build schools.",
      es: "Por favor, porque yo no compro franquicias. Yo construyo escuelas.",
      speaker: "renata",
      cast: ["renata", "vale"],
      lines: [
        {
          speaker: "renata",
          text: "Please do, because I do not buy franchises. I build schools.",
          es: "Por favor, porque yo no compro franquicias. Yo construyo escuelas."
        },
        {
          speaker: "vale",
          text: "And that is exactly why we called you. Builders understand quality.",
          es: "Y esa es exactamente la razón por la que la llamamos. Quienes construyen entienden la calidad."
        },
        {
          speaker: "renata",
          text: "Good answer. Keep going, I am listening, and my partners in Monterrey are waiting for my report.",
          es: "Buena respuesta. Continúe, la escucho, y mis socios en Monterrey esperan mi reporte."
        }
      ],
      words: [
        { word: "franchise", es: "franquicia" },
        { word: "build", es: "construir" },
        { word: "quality", es: "calidad" }
      ]
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Dani suggests a simple comparison to help everyone understand the model.",
      text: "Vale, compare it to a shared kitchen, not a franchise.",
      es: "Vale, compáralo con una cocina compartida, no con una franquicia.",
      speaker: "dani",
      cast: ["dani", "vale", "renata"],
      lines: [
        {
          speaker: "dani",
          text: "Vale, compare it to a shared kitchen, not a franchise.",
          es: "Vale, compáralo con una cocina compartida, no con una franquicia."
        },
        {
          speaker: "vale",
          text: "I like that. Renata, imagine every cook keeps their own restaurant but shares the same professional kitchen.",
          es: "Me gusta. Renata, imagine que cada cocinero conserva su propio restaurante pero comparte la misma cocina profesional."
        },
        {
          speaker: "renata",
          text: "That comparison makes sense. My school stays mine, with my name on the door.",
          es: "Esa comparación tiene sentido. Mi escuela sigue siendo mía, con mi nombre en la puerta."
        }
      ],
      words: [
        { word: "compare", es: "comparar" },
        { word: "shared", es: "compartida" },
        { word: "kitchen", es: "cocina" }
      ]
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale describes what the academy provides while Dani shows the platform on a laptop.",
      text: "In other words, you keep your school. We provide the curriculum, training, and platform.",
      es: "En otras palabras, usted conserva su escuela. Nosotros damos el currículo, capacitación y plataforma.",
      speaker: "vale",
      cast: ["vale", "dani", "renata"],
      lines: [
        {
          speaker: "vale",
          text: "In other words, you keep your school. We provide the curriculum, training, and platform.",
          es: "En otras palabras, usted conserva su escuela. Nosotros damos el currículo, capacitación y plataforma."
        },
        {
          speaker: "dani",
          text: "Your teachers learn our method, but they stay on your payroll and follow your schedule.",
          es: "Sus maestros aprenden nuestro método, pero siguen en su nómina y con su horario."
        },
        {
          speaker: "renata",
          text: "That part I like. My teachers are loyal to me, not to a brand, and their students trust them completely.",
          es: "Esa parte me gusta. Mis maestros son leales a mí, no a una marca, y sus estudiantes confían plenamente en ellos."
        }
      ],
      words: [
        { word: "curriculum", es: "currículo" },
        { word: "training", es: "capacitación" },
        { word: "payroll", es: "nómina" }
      ]
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Renata asks about the cost while Camila prepares the price document.",
      text: "Are you saying I would pay you for every student forever?",
      es: "¿Está diciendo que le pagaría por cada estudiante para siempre?",
      speaker: "renata",
      cast: ["renata", "camila"],
      lines: [
        {
          speaker: "renata",
          text: "Are you saying I would pay you for every student forever?",
          es: "¿Está diciendo que le pagaría por cada estudiante para siempre?"
        },
        {
          speaker: "camila",
          text: "No, and it is a fair question. Forever payments scare every serious owner.",
          es: "No, y es una pregunta justa. Los pagos eternos asustan a cualquier dueña seria."
        },
        {
          speaker: "renata",
          text: "They should. I worked twenty years for what I have, and I do not sign away my future.",
          es: "Así debería ser. Trabajé veinte años por lo que tengo, y no firmo lejos mi futuro."
        }
      ],
      words: [
        { word: "forever", es: "para siempre" },
        { word: "fair", es: "justa" },
        { word: "owner", es: "dueña" }
      ]
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale explains the annual license while Renata listens on the screen.",
      text: "Let me clear that up. The license is annual, and support is based on active students.",
      es: "Déjeme aclarar eso. La licencia es anual, y el soporte se basa en estudiantes activos.",
      speaker: "vale",
      cast: ["vale", "renata"],
      lines: [
        {
          speaker: "vale",
          text: "Let me clear that up. The license is annual, and support is based on active students.",
          es: "Déjeme aclarar eso. La licencia es anual, y el soporte se basa en estudiantes activos."
        },
        {
          speaker: "renata",
          text: "So if a student leaves, I stop paying for that student?",
          es: "Entonces, si un estudiante se va, ¿dejo de pagar por ese estudiante?"
        },
        {
          speaker: "vale",
          text: "Correct. You only pay for the students who are actually learning in your classrooms each month.",
          es: "Correcto. Solo paga por los estudiantes que realmente están aprendiendo en sus salones cada mes."
        }
      ],
      words: [
        { word: "license", es: "licencia" },
        { word: "annual", es: "anual" },
        { word: "support", es: "soporte" }
      ]
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Camila describes the partnership idea while Vale nods in agreement.",
      text: "Think of it as a partnership with shared tools, not a new owner.",
      es: "Piénselo como una alianza con herramientas compartidas, no como un nuevo dueño.",
      speaker: "camila",
      cast: ["camila", "vale"],
      lines: [
        {
          speaker: "camila",
          text: "Think of it as a partnership with shared tools, not a new owner.",
          es: "Piénselo como una alianza con herramientas compartidas, no como un nuevo dueño."
        },
        {
          speaker: "vale",
          text: "We grow when you grow. If your school fails, our model fails too.",
          es: "Nosotras crecemos cuando usted crece. Si su escuela fracasa, nuestro modelo también fracasa."
        },
        {
          speaker: "camila",
          text: "That is why we protect quality in every classroom, yours and ours, because one bad class hurts both names.",
          es: "Por eso protegemos la calidad en cada salón, el suyo y el nuestro, porque una mala clase daña ambos nombres."
        }
      ],
      words: [
        { word: "partnership", es: "alianza" },
        { word: "tools", es: "herramientas" },
        { word: "grow", es: "crecer" }
      ]
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Renata relaxes on the call and admits she misunderstood the offer.",
      text: "That is much clearer. I thought you wanted control of my classrooms.",
      es: "Eso está mucho más claro. Pensé que quería controlar mis salones.",
      speaker: "renata",
      cast: ["renata", "dani"],
      lines: [
        {
          speaker: "renata",
          text: "That is much clearer. I thought you wanted control of my classrooms.",
          es: "Eso está mucho más claro. Pensé que quería controlar mis salones."
        },
        {
          speaker: "dani",
          text: "Control stays with you. We only visit to train and to audit quality.",
          es: "El control se queda con usted. Nosotros solo visitamos para capacitar y auditar la calidad."
        },
        {
          speaker: "renata",
          text: "Audit, not command. I can live with that, and so can my teachers.",
          es: "Auditar, no mandar. Con eso sí puedo vivir, y mis maestros también."
        }
      ],
      words: [
        { word: "clearer", es: "más claro" },
        { word: "control", es: "control" },
        { word: "audit", es: "auditar" }
      ]
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale smiles and explains how both sides combine their strengths.",
      text: "No. You know Mexico; we know the system. Together we can adapt it.",
      es: "No. Usted conoce México; nosotros conocemos el sistema. Juntas podemos adaptarlo.",
      speaker: "vale",
      cast: ["vale", "camila", "renata"],
      lines: [
        {
          speaker: "vale",
          text: "No. You know Mexico; we know the system. Together we can adapt it.",
          es: "No. Usted conoce México; nosotros conocemos el sistema. Juntas podemos adaptarlo."
        },
        {
          speaker: "camila",
          text: "For example, your market prefers evening classes. Our platform adapts the schedule without changing the method.",
          es: "Por ejemplo, su mercado prefiere clases nocturnas. Nuestra plataforma adapta el horario sin cambiar el método."
        },
        {
          speaker: "renata",
          text: "Good, because my students work during the day, and that detail matters more than any marketing.",
          es: "Bien, porque mis estudiantes trabajan de día, y ese detalle importa más que cualquier marketing."
        }
      ],
      words: [
        { word: "together", es: "juntas" },
        { word: "adapt", es: "adaptar" },
        { word: "schedule", es: "horario" }
      ]
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "Renata reveals a surprise that changes the whole conversation.",
      text: "Good. You should also know that I own six schools that compete with you.",
      es: "Bien. También debe saber que tengo seis escuelas que compiten con ustedes.",
      speaker: "renata",
      cast: ["renata", "vale"],
      lines: [
        {
          speaker: "renata",
          text: "Good. You should also know that I own six schools that compete with you.",
          es: "Bien. También debe saber que tengo seis escuelas que compiten con ustedes."
        },
        {
          speaker: "vale",
          text: "I did not expect that. Why tell us now?",
          es: "No me lo esperaba. ¿Por qué decirnos ahora?"
        },
        {
          speaker: "renata",
          text: "Because honest partners start with honest numbers. Think about it, and call me tomorrow. I want to see how you think under pressure.",
          es: "Porque los socios honestos empiezan con números honestos. Piénselo y llámeme mañana. Quiero ver cómo piensa bajo presión."
        }
      ],
      words: [
        { word: "own", es: "tener / ser dueña de" },
        { word: "compete", es: "competir" },
        { word: "honest", es: "honestos" }
      ]
    }
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What does Renata think Vale wants at the beginning?",
      questionEs: "¿Qué cree Renata que Vale quiere al principio?",
      options: [
        {
          label: "That Renata buys the brand and runs it Vale's way.",
          emoji: "🏷️"
        },
        {
          label: "That Renata closes her schools.",
          emoji: "🚪"
        },
        {
          label: "That Renata moves to Houston.",
          emoji: "✈️"
        }
      ],
      answer: 0,
      sayIt: "She thinks Vale wants to sell her the brand.",
      sayItEs: "Ejemplo: «She thinks Vale wants to sell her the brand.»",
      sayItAskEn: "What does Renata believe at first?",
      sayItAskEs: "¿Qué cree Renata al principio?",
      sayItCheck: {
        target: "She thinks *",
        altTargets: [
          "Renata thinks *",
          "She believes *",
          "Vale wants *"
        ]
      }
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "How does the payment model work?",
      questionEs: "¿Cómo funciona el modelo de pago?",
      options: [
        {
          label: "An annual license, and support based on active students.",
          emoji: "📋"
        },
        {
          label: "A payment for every student forever.",
          emoji: "♾️"
        },
        {
          label: "One payment and no support.",
          emoji: "💸"
        }
      ],
      answer: 0,
      sayIt: "The license is annual, and support is based on active students.",
      sayItEs: "Ejemplo: «The license is annual, and support is based on active students.»",
      sayItAskEn: "Explain the payment model in your own words.",
      sayItAskEs: "Explica el modelo de pago con tus propias palabras.",
      sayItCheck: {
        target: "The license is *",
        altTargets: [
          "They pay *",
          "It is *",
          "She pays *"
        ]
      }
    },
    {
      id: "q3",
      afterScene: "s11",
      questionEn: "What surprise does Renata reveal at the end?",
      questionEs: "¿Qué sorpresa revela Renata al final?",
      options: [
        {
          label: "She owns six schools that compete with Vale.",
          emoji: "⚡"
        },
        {
          label: "She wants to close the academy.",
          emoji: "🔒"
        },
        {
          label: "She already signed with BigTalk.",
          emoji: "✍️"
        }
      ],
      answer: 0,
      sayIt: "Renata owns six schools that compete with the academy.",
      sayItEs: "Ejemplo: «Renata owns six schools that compete with the academy.»",
      sayItAskEn: "What does Renata reveal, and why does she say it?",
      sayItAskEs: "¿Qué revela Renata y por qué lo dice?",
      sayItCheck: {
        target: "She owns *",
        altTargets: [
          "Renata owns *",
          "She has *",
          "Because honest *"
        ]
      }
    }
  ],
  mindsetCard: {
    afterScene: "s6",
    phrase: "I can do hard things. Mistakes are part of the process.",
    es: "Puedo hacer cosas difíciles. Los errores son parte del proceso."
  },
  habitCard: {
    afterScene: "s4",
    phrase: "English is easy when I listen, clarify, and speak again.",
    es: "El inglés es fácil cuando escucho, aclaro y vuelvo a hablar.",
    model: "vale",
    modelActionEs: "Vale escucha, aclara y responde con calma."
  },
  expressions: [
    {
      phrase: "spell out",
      es: "explicar con total claridad",
      kind: "phrasal",
      example: "Not exactly. Let me spell out the model before we get our wires crossed.",
      exampleEs: "No exactamente. Déjeme explicar claramente el modelo antes de que nos confundamos."
    },
    {
      phrase: "clear up",
      variants: ["clear that up"],
      es: "aclarar / resolver una confusión",
      kind: "phrasal",
      example: "Let me clear that up. The license is annual, and support is based on active students.",
      exampleEs: "Déjeme aclarar eso. La licencia es anual, y el soporte se basa en estudiantes activos."
    },
    {
      phrase: "get our wires crossed",
      es: "confundir lo que cada persona quiso decir",
      kind: "idiom",
      example: "Not exactly. Let me spell out the model before we get our wires crossed.",
      exampleEs: "No exactamente. Déjeme explicar claramente el modelo antes de que nos confundamos."
    }
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Your turn, 30 seconds: explain the problem, compare the options, and defend your decision.",
    es: "Tu turno, 30 segundos: explica el problema, compara las opciones y defiende tu decisión."
  },
  continueWith: [
    "The main issue is ...",
    "If I were responsible, I would ...",
    "The best option is ... because ..."
  ],
  cliffhanger: {
    en: "Good. You should also know that I own six schools that compete with you.",
    es: "Bien. También debe saber que tengo seis escuelas que compiten con ustedes."
  }
};
