import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/sharks-ep18-say-no-with-respect/cover.jpg";
import s1 from "@/assets/storybook/sharks-ep18-say-no-with-respect/s1.jpg";
import s2 from "@/assets/storybook/sharks-ep18-say-no-with-respect/s2.jpg";
import s3 from "@/assets/storybook/sharks-ep18-say-no-with-respect/s3.jpg";
import s4 from "@/assets/storybook/sharks-ep18-say-no-with-respect/s4.jpg";
import s5 from "@/assets/storybook/sharks-ep18-say-no-with-respect/s5.jpg";
import s6 from "@/assets/storybook/sharks-ep18-say-no-with-respect/s6.jpg";
import s7 from "@/assets/storybook/sharks-ep18-say-no-with-respect/s7.jpg";
import s8 from "@/assets/storybook/sharks-ep18-say-no-with-respect/s8.jpg";
import s9 from "@/assets/storybook/sharks-ep18-say-no-with-respect/s9.jpg";
import s10 from "@/assets/storybook/sharks-ep18-say-no-with-respect/s10.jpg";
import s11 from "@/assets/storybook/sharks-ep18-say-no-with-respect/s11.jpg";

export const SHARKS_EP18_SAY_NO_WITH_RESPECT: StorybookEpisode = {
  "id": "sharks-ep18-say-no-with-respect",
  "moduleId": "sharks",
  "week": 4,
  "title": "Say no with respect",
  "titleEs": "Decir no con respeto",
  "episodeLabel": {
    "en": "Season 8 · Episode 18",
    "es": "Temporada 8 · Episodio 18"
  },
  "previously": [
    {
      "en": "Renata's investment came with real ownership, a seat on the board, and a veto.",
      "es": "La inversión de Renata llegó con propiedad real, un asiento en la junta y un veto."
    },
    {
      "en": "Now Renata wants speed. Vale has to decide how far she will stretch to keep her happy.",
      "es": "Ahora Renata quiere velocidad. Vale tiene que decidir hasta dónde estirarse para mantenerla contenta."
    }
  ],
  "reviewWords": [
    {
      "word": "capacity",
      "es": "capacidad"
    },
    {
      "word": "decision",
      "es": "decisión"
    },
    {
      "word": "trained",
      "es": "capacitado"
    }
  ],
  "blurb": {
    "en": "Fifty new groups in September. Honestly, that is more than they can deliver with quality — so Vale says no, and offers twenty instead.",
    "es": "Cincuenta grupos nuevos en septiembre. Honestamente, es más de lo que pueden entregar con calidad, así que Vale dice que no y ofrece veinte."
  },
  "cover": cover,
  "voice": "girl",
  "scenes": [
    {
      "id": "s1",
      "image": s1,
      "imageAlt": "Vale meets Renata in a bright Monterrey office as Renata spreads out a growth plan for Vale Kids.",
      "text": "Vale, I have everything ready to open fifty Vale Kids groups in September.",
      "es": "Vale, tengo todo listo para abrir cincuenta grupos de Vale Kids en septiembre.",
      "speaker": "renata",
      "cast": ["renata", "vale"],
      "lines": [
        {
          "speaker": "renata",
          "text": "Vale, I have everything ready to open fifty Vale Kids groups in September.",
          "es": "Vale, tengo todo listo para abrir cincuenta grupos de Vale Kids en septiembre."
        },
        {
          "speaker": "vale",
          "text": "Fifty... in how many schools? That number sounds huge for one single month.",
          "es": "Cincuenta… ¿en cuántas escuelas? Ese número suena enorme para un solo mes."
        },
        {
          "speaker": "renata",
          "text": "Twenty. Two and a half groups per school, on average.",
          "es": "Veinte. Dos grupos y medio por escuela, en promedio."
        }
      ],
      "words": [
        { "word": "ready", "es": "listo" },
        { "word": "groups", "es": "grupos" },
        { "word": "average", "es": "promedio" }
      ]
    },
    {
      "id": "s2",
      "image": s2,
      "imageAlt": "Vale sits across from Renata and speaks carefully, holding her tablet with both hands.",
      "text": "Renata, this is exciting, but I have to be honest. That request is more than we can deliver with quality.",
      "es": "Renata, esto es emocionante, pero tengo que ser honesta. Esa petición es más de lo que podemos entregar con calidad.",
      "speaker": "vale",
      "cast": ["vale", "renata"],
      "lines": [
        {
          "speaker": "vale",
          "text": "Renata, this is exciting, but I have to be honest. That request is more than we can deliver with quality.",
          "es": "Renata, esto es emocionante, pero tengo que ser honesta. Esa petición es más de lo que podemos entregar con calidad."
        },
        {
          "speaker": "renata",
          "text": "Are you telling me no?",
          "es": "¿Me estás diciendo que no?"
        },
        {
          "speaker": "vale",
          "text": "I am telling you I am saying no for now, not no forever.",
          "es": "Te estoy diciendo que digo no por ahora, no no para siempre."
        }
      ],
      "words": [
        { "word": "honest", "es": "honesta" },
        { "word": "quality", "es": "calidad" },
        { "word": "request", "es": "petición" }
      ]
    },
    {
      "id": "s3",
      "image": s3,
      "imageAlt": "Renata frowns slightly while Vale keeps a calm, respectful posture explaining her boundary.",
      "text": "If we open fifty groups without enough trained teachers, we harm the children, the teachers and our reputation.",
      "es": "Si abrimos cincuenta grupos sin suficientes maestros capacitados, dañamos a los niños, a los maestros y a nuestra reputación.",
      "speaker": "vale",
      "cast": ["vale", "renata"],
      "lines": [
        {
          "speaker": "vale",
          "text": "If we open fifty groups without enough trained teachers, we harm the children, the teachers and our reputation.",
          "es": "Si abrimos cincuenta grupos sin suficientes maestros capacitados, dañamos a los niños, a los maestros y a nuestra reputación."
        },
        {
          "speaker": "renata",
          "text": "But the competition will not wait. BigTalk could copy us next month.",
          "es": "Pero la competencia no espera. BigTalk podría copiarnos el próximo mes."
        },
        {
          "speaker": "vale",
          "text": "BigTalk can copy our speed. They cannot copy our preparation.",
          "es": "BigTalk puede copiar nuestra velocidad. No pueden copiar nuestra preparación."
        }
      ],
      "words": [
        { "word": "trained", "es": "capacitados" },
        { "word": "reputation", "es": "reputación" },
        { "word": "preparation", "es": "preparación" }
      ]
    },
    {
      "id": "s4",
      "image": s4,
      "imageAlt": "Vale draws a simple timeline on the whiteboard while Renata watches with crossed arms.",
      "text": "My proposal: twenty groups in September, a review in November. If the results are solid, we scale to forty in January.",
      "es": "Mi propuesta: veinte grupos en septiembre, una revisión en noviembre. Si los resultados son sólidos, escalamos a cuarenta en enero.",
      "speaker": "vale",
      "cast": ["vale", "renata"],
      "lines": [
        {
          "speaker": "vale",
          "text": "My proposal: twenty groups in September, a review in November. If the results are solid, we scale to forty in January.",
          "es": "Mi propuesta: veinte grupos en septiembre, una revisión en noviembre. Si los resultados son sólidos, escalamos a cuarenta en enero."
        },
        {
          "speaker": "renata",
          "text": "That is slower than I dreamed of.",
          "es": "Eso es más lento de lo que soñaba."
        },
        {
          "speaker": "vale",
          "text": "It is slower than you dreamed, but it is faster than repairing a failure.",
          "es": "Es más lento de lo que soñaste, pero más rápido que reparar un fracaso."
        }
      ],
      "words": [
        { "word": "proposal", "es": "propuesta" },
        { "word": "solid", "es": "sólidos" },
        { "word": "failure", "es": "fracaso" }
      ]
    },
    {
      "id": "s5",
      "image": s5,
      "imageAlt": "Renata leans forward, weighing Vale's ambition against the risk of moving too fast, near a window over Monterrey.",
      "text": "If we bite off more than we can chew with fifty groups at once, the whole brand pays for it.",
      "es": "Si abarcamos más de lo que podemos con cincuenta grupos a la vez, toda la marca lo paga.",
      "speaker": "vale",
      "cast": ["vale", "renata"],
      "lines": [
        {
          "speaker": "vale",
          "text": "If we bite off more than we can chew with fifty groups at once, the whole brand pays for it.",
          "es": "Si abarcamos más de lo que podemos con cincuenta grupos a la vez, toda la marca lo paga."
        },
        {
          "speaker": "renata",
          "text": "I admire your ambition, Vale, but ambition without capacity is just a nice-sounding promise.",
          "es": "Admiro tu ambición, Vale, pero la ambición sin capacidad es solo una promesa que suena bonita."
        },
        {
          "speaker": "vale",
          "text": "Exactly. A smaller, trained team beats a bigger, tired one every single time.",
          "es": "Exacto. Un equipo más pequeño y capacitado le gana a uno más grande y agotado todas las veces."
        }
      ],
      "words": [
        { "word": "ambition", "es": "ambición" },
        { "word": "capacity", "es": "capacidad" },
        { "word": "smaller", "es": "más pequeño" }
      ]
    },
    {
      "id": "s6",
      "image": s6,
      "imageAlt": "Renata sets a printed agreement on the table and looks straight at Vale, negotiating a measurable condition.",
      "text": "I accept twenty groups, but with a measurable date. If we do not reach certain numbers by November, I decide whether we continue or not.",
      "es": "Acepto veinte grupos, pero con una fecha medible. Si no alcanzamos ciertos números para noviembre, yo decido si seguimos o no.",
      "speaker": "renata",
      "cast": ["renata", "vale"],
      "lines": [
        {
          "speaker": "renata",
          "text": "I accept twenty groups, but with a measurable date. If we do not reach certain numbers by November, I decide whether we continue or not.",
          "es": "Acepto veinte grupos, pero con una fecha medible. Si no alcanzamos ciertos números para noviembre, yo decido si seguimos o no."
        },
        {
          "speaker": "vale",
          "text": "Fair. We define those numbers together before we sign anything.",
          "es": "Justo. Definimos esos números juntas antes de firmar nada."
        },
        {
          "speaker": "renata",
          "text": "And I want you to train the first teachers yourself. Not a video, you, in person, from day one.",
          "es": "Y quiero que seas tú quien capacite a los primeros maestros. No un video, tú, en persona, desde el primer día."
        }
      ],
      "words": [
        { "word": "measurable", "es": "medible" },
        { "word": "define", "es": "definir" },
        { "word": "sign", "es": "firmar" }
      ]
    },
    {
      "id": "s7",
      "image": s7,
      "imageAlt": "Vale and Renata shake hands over the table while Camila listens nearby taking notes on her tablet.",
      "text": "That means Vale Kids Mexico is a partnership, not an automatic subsidiary.",
      "es": "Eso significa que Vale Kids México es una sociedad, no una filial automática.",
      "speaker": "vale",
      "cast": ["vale", "renata", "camila"],
      "lines": [
        {
          "speaker": "vale",
          "text": "That means Vale Kids Mexico is a partnership, not an automatic subsidiary.",
          "es": "Eso significa que Vale Kids México es una sociedad, no una filial automática."
        },
        {
          "speaker": "renata",
          "text": "That is exactly how I want it. Each partner has clear responsibilities.",
          "es": "Así es exactamente como lo quiero. Cada socia tiene responsabilidades claras."
        },
        {
          "speaker": "vale",
          "text": "I like that. But I also need Camila to review the operational side. She is my eyes in Mexico.",
          "es": "Me parece bien. Pero también necesito que Camila revise la parte operativa. Ella es mis ojos en México."
        }
      ],
      "words": [
        { "word": "partnership", "es": "sociedad" },
        { "word": "responsibilities", "es": "responsabilidades" },
        { "word": "operational", "es": "operativa" }
      ]
    },
    {
      "id": "s8",
      "image": s8,
      "imageAlt": "Camila nods and checks her notes as Vale explains the plan for Vale Kids Mexico, with Renata still present.",
      "text": "I will review every provider and every classroom myself before we sign the final decision.",
      "es": "Revisaré cada proveedor y cada salón yo misma antes de que firmemos la decisión final.",
      "speaker": "camila",
      "cast": ["camila", "vale", "renata"],
      "lines": [
        {
          "speaker": "camila",
          "text": "I will review every provider and every classroom myself before we sign the final decision.",
          "es": "Revisaré cada proveedor y cada salón yo misma antes de que firmemos la decisión final."
        },
        {
          "speaker": "vale",
          "text": "Thank you, Camila. I would rather apologize for going slow than apologize for a mistake in twenty classrooms.",
          "es": "Gracias, Camila. Prefiero disculparme por ir lento que disculparme por un error en veinte salones."
        },
        {
          "speaker": "renata",
          "text": "Most people say yes to everything and apologize later. You two set a boundary first. I respect that.",
          "es": "La mayoría dice que sí a todo y se disculpa después. Ustedes dos ponen un límite primero. Respeto eso."
        }
      ],
      "words": [
        { "word": "provider", "es": "proveedor" },
        { "word": "decision", "es": "decisión" },
        { "word": "boundary", "es": "límite" }
      ]
    },
    {
      "id": "s9",
      "image": s9,
      "imageAlt": "Dani appears on a laptop video call from Guatemala, smiling as he reports good news to Vale and Renata.",
      "text": "Vale, Guatemala now has two coordinators and the onboarding is ready.",
      "es": "Vale, Guatemala ya tiene dos coordinadores y el proceso de inducción está listo.",
      "speaker": "dani",
      "cast": ["dani", "vale", "renata"],
      "lines": [
        {
          "speaker": "dani",
          "text": "Vale, Guatemala now has two coordinators and the onboarding is ready.",
          "es": "Vale, Guatemala ya tiene dos coordinadores y el proceso de inducción está listo."
        },
        {
          "speaker": "vale",
          "text": "Excellent. And how do you feel leading from there, so far from us, Dani?",
          "es": "Excelente. ¿Y cómo te sientes liderando desde allá, tan lejos de nosotras, Dani?"
        },
        {
          "speaker": "dani",
          "text": "At first I felt alone. Now I realize I do not have to know everything, I just have to know who to ask.",
          "es": "Al principio me sentía solo. Ahora me doy cuenta de que no tengo que saberlo todo, solo tengo que saber a quién preguntarle."
        }
      ],
      "words": [
        { "word": "coordinators", "es": "coordinadores" },
        { "word": "leading", "es": "liderando" },
        { "word": "alone", "es": "solo" }
      ]
    },
    {
      "id": "s10",
      "image": s10,
      "imageAlt": "Renata signs a provisional page on the table while Vale and Camila look on, sealing a careful agreement.",
      "text": "So we agree: twenty groups, a review in November, and you train the teachers yourself.",
      "es": "Entonces quedamos: veinte grupos, revisión en noviembre, y tú capacitas a los maestros tú misma.",
      "speaker": "renata",
      "cast": ["renata", "vale", "camila"],
      "lines": [
        {
          "speaker": "renata",
          "text": "So we agree: twenty groups, a review in November, and you train the teachers yourself.",
          "es": "Entonces quedamos: veinte grupos, revisión en noviembre, y tú capacitas a los maestros tú misma."
        },
        {
          "speaker": "vale",
          "text": "We agree to talk about that. We still need to review the numbers with Camila and Mr. Reed.",
          "es": "Quedamos en hablar de eso. Todavía necesitamos revisar los números con Camila y el señor Reed."
        },
        {
          "speaker": "camila",
          "text": "And if it turns out we cannot deliver in September, I would rather turn down the extra ten groups than pass on quality.",
          "es": "Y si resulta que no podemos entregar en septiembre, prefiero rechazar los diez grupos extra que dejar pasar la calidad."
        }
      ],
      "words": [
        { "word": "agree", "es": "acordar" },
        { "word": "review", "es": "revisar" },
        { "word": "deliver", "es": "entregar" }
      ]
    },
    {
      "id": "s11",
      "image": s11,
      "imageAlt": "Camila reads an urgent email out loud on her phone while Vale and Renata lean in, both surprised by the news.",
      "text": "Vale, an email just arrived from Mr. Reed. It says: 'I found the inconsistency. It is not a mistake, it is an opportunity.'",
      "es": "Vale, acaba de llegar un correo del señor Reed. Dice: «Encontré la inconsistencia. No es un error, es una oportunidad.»",
      "speaker": "camila",
      "cast": ["camila", "vale", "renata"],
      "lines": [
        {
          "speaker": "renata",
          "text": "Okay. But do not delay, Vale. BigTalk never sleeps.",
          "es": "Está bien. Pero no te demores, Vale. BigTalk nunca duerme."
        },
        {
          "speaker": "vale",
          "text": "We will not delay, Renata. September starts the moment every contract is fully signed.",
          "es": "No nos demoraremos, Renata. Septiembre empieza en el momento en que cada contrato quede firmado."
        },
        {
          "speaker": "camila",
          "text": "Vale, an email just arrived from Mr. Reed. It says: 'I found the inconsistency. It is not a mistake, it is an opportunity.'",
          "es": "Vale, acaba de llegar un correo del señor Reed. Dice: «Encontré la inconsistencia. No es un error, es una oportunidad.»"
        }
      ],
      "words": [
        { "word": "delay", "es": "demorarse" },
        { "word": "contracts", "es": "contratos" },
        { "word": "inconsistency", "es": "inconsistencia" }
      ]
    }
  ],
  "quizzes": [
    {
      "id": "q1",
      "afterScene": "s3",
      "questionEn": "Why does Vale say no to fifty groups in September?",
      "questionEs": "¿Por qué dice Vale que no a los cincuenta grupos en septiembre?",
      "options": [
        {
          "label": "Because they do not have enough trained teachers, and it would damage quality and reputation.",
          "emoji": "🎯"
        },
        {
          "label": "Because she does not like working with Renata.",
          "emoji": "🛑"
        },
        {
          "label": "Because Vale Kids is closing in Mexico.",
          "emoji": "❓"
        }
      ],
      "answer": 0,
      "sayIt": "If we open fifty groups without enough trained teachers, we harm the children, the teachers and our reputation.",
      "sayItEs": "Ejemplo: «If we open fifty groups without enough trained teachers, we harm the children, the teachers and our reputation.»",
      "sayItAskEn": "Say no politely to a request that is bigger than your real capacity right now.",
      "sayItAskEs": "Di que no con respeto a una petición que es más grande que tu capacidad real ahora mismo.",
      "sayItCheck": {
        "target": "I would love to, but *",
        "altTargets": [
          "Honestly, that is more than I can *",
          "I have to say no for now because *"
        ]
      }
    },
    {
      "id": "q2",
      "afterScene": "s6",
      "questionEn": "What condition does Renata add before she accepts twenty groups?",
      "questionEs": "¿Qué condición añade Renata antes de aceptar los veinte grupos?",
      "options": [
        {
          "label": "A measurable date in November, and Vale must train the first teachers in person.",
          "emoji": "📅"
        },
        {
          "label": "She cancels Vale Kids completely.",
          "emoji": "🚫"
        },
        {
          "label": "She asks for a full refund of her investment.",
          "emoji": "💸"
        }
      ],
      "answer": 0,
      "sayIt": "I accept twenty groups, but with a measurable date. If we do not reach certain numbers by November, I decide whether we continue or not.",
      "sayItEs": "Ejemplo: «I accept twenty groups, but with a measurable date. If we do not reach certain numbers by November, I decide whether we continue or not.»",
      "sayItAskEn": "Have you ever had to say no to something exciting? What did you say?",
      "sayItAskEs": "¿Alguna vez tuviste que decir que no a algo emocionante? ¿Qué dijiste?",
      "sayItCheck": {
        "target": "I once had to say no to *",
        "altTargets": [
          "I said, I would love to, but *",
          "Yes, because *"
        ]
      }
    },
    {
      "id": "q3",
      "afterScene": "s11",
      "questionEn": "What does Mr. Reed's email say about the inconsistency?",
      "questionEs": "¿Qué dice el correo del señor Reed sobre la inconsistencia?",
      "options": [
        {
          "label": "It is not a mistake, it is an opportunity.",
          "emoji": "⚡"
        },
        {
          "label": "It is a serious accounting error that ends the partnership.",
          "emoji": "😴"
        },
        {
          "label": "Nothing, the email is empty.",
          "emoji": "🏖️"
        }
      ],
      "answer": 0,
      "sayIt": "I found the inconsistency. It is not a mistake, it is an opportunity.",
      "sayItEs": "Ejemplo: «I found the inconsistency. It is not a mistake, it is an opportunity.»",
      "sayItAskEn": "Summarize today's deal: the request, your boundary, and your alternative.",
      "sayItAskEs": "Resume el acuerdo de hoy: la petición, tu límite y tu alternativa.",
      "sayItCheck": {
        "target": "They asked for *, my boundary was *, so I offered *",
        "altTargets": [
          "In short, we agreed on *",
          "I said no to *, but yes to *"
        ]
      }
    }
  ],
  "mindsetCard": {
    "afterScene": "s5",
    "phrase": "I can do it. A respectful no protects the quality I promised.",
    "es": "Puedo hacerlo. Un no respetuoso protege la calidad que prometí."
  },
  "habitCard": {
    "afterScene": "s4",
    "phrase": "English is easy when I say no, explain my reason, and offer an alternative.",
    "es": "El inglés es fácil cuando digo no, explico mi razón y ofrezco una alternativa.",
    "model": "vale",
    "modelActionEs": "Vale dice que no con respeto y propone veinte grupos en vez de cincuenta."
  },
  "expressions": [
    {
      "phrase": "turn down",
      "variants": ["turn down", "turned down"],
      "es": "rechazar una oferta o petición",
      "kind": "phrasal",
      "example": "I would rather turn down the extra ten groups than pass on quality.",
      "exampleEs": "Prefiero rechazar los diez grupos extra que dejar pasar la calidad."
    },
    {
      "phrase": "pass on",
      "variants": ["pass on"],
      "es": "dejar pasar una oportunidad",
      "kind": "phrasal",
      "example": "I would rather turn down the extra ten groups than pass on quality.",
      "exampleEs": "Prefiero rechazar los diez grupos extra que dejar pasar la calidad."
    },
    {
      "phrase": "bite off more than you can chew",
      "variants": ["bite off more than we can chew"],
      "es": "aceptar más de lo que puedes cumplir",
      "kind": "idiom",
      "example": "If we bite off more than we can chew with fifty groups at once, the whole brand pays for it.",
      "exampleEs": "Si abarcamos más de lo que podemos con cincuenta grupos a la vez, toda la marca lo paga."
    }
  ],
  "finaleSeconds": 30,
  "continuePrompt": {
    "en": "Your turn, 30 seconds: say no with respect, explain your reason, and offer a smaller alternative.",
    "es": "Tu turno, 30 segundos: di que no con respeto, explica tu razón y ofrece una alternativa más pequeña."
  },
  "continueWith": [
    "Honestly, that is more than I can do right now.",
    "The reason is...",
    "Instead, I can offer..."
  ],
  "cliffhanger": {
    "en": "Vale, an email just arrived from Mr. Reed. It says: 'I found the inconsistency. It is not a mistake, it is an opportunity.'",
    "es": "Vale, acaba de llegar un correo del señor Reed. Dice: «Encontré la inconsistencia. No es un error, es una oportunidad.»"
  }
};
