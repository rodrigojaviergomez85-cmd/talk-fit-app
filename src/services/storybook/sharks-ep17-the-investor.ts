import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/sharks-ep17-the-investor/cover.jpg";
import s1 from "@/assets/storybook/sharks-ep17-the-investor/s1.jpg";
import s2 from "@/assets/storybook/sharks-ep17-the-investor/s2.jpg";
import s3 from "@/assets/storybook/sharks-ep17-the-investor/s3.jpg";
import s4 from "@/assets/storybook/sharks-ep17-the-investor/s4.jpg";
import s5 from "@/assets/storybook/sharks-ep17-the-investor/s5.jpg";
import s6 from "@/assets/storybook/sharks-ep17-the-investor/s6.jpg";
import s7 from "@/assets/storybook/sharks-ep17-the-investor/s7.jpg";
import s8 from "@/assets/storybook/sharks-ep17-the-investor/s8.jpg";
import s9 from "@/assets/storybook/sharks-ep17-the-investor/s9.jpg";
import s10 from "@/assets/storybook/sharks-ep17-the-investor/s10.jpg";
import s11 from "@/assets/storybook/sharks-ep17-the-investor/s11.jpg";

export const SHARKS_EP17_THE_INVESTOR: StorybookEpisode = {
  "id": "sharks-ep17-the-investor",
  "moduleId": "sharks",
  "week": 4,
  "title": "The investor",
  "titleEs": "El inversionista",
  "episodeLabel": {
    "en": "Season 8 · Episode 17",
    "es": "Temporada 8 · Episodio 17"
  },
  "previously": [
    {
      "en": "The team now works across three countries and three timezones, with one supervisor gone to the competitor.",
      "es": "El equipo ahora trabaja en tres países y tres husos horarios, con un supervisor que se fue con la competencia."
    }
  ],
  "reviewWords": [
    { "word": "growth", "es": "crecimiento" },
    { "word": "revenue", "es": "ingresos" },
    { "word": "contract", "es": "contrato" }
  ],
  "blurb": {
    "en": "Mr. Reed wants to buy twenty percent of the academy. Vale wants to keep the pedagogy. And Renata wants fifty percent of something else entirely.",
    "es": "El señor Reed quiere comprar el veinte por ciento de la academia. Vale quiere conservar la pedagogía. Y Renata quiere el cincuenta por ciento de otra cosa por completo."
  },
  "cover": cover,
  "voice": "girl",
  "scenes": [
    {
      "id": "s1",
      "image": s1,
      "imageAlt": "Mr. Reed appears on a video call screen offering to invest while Vale, Dani and Camila listen in the office.",
      "text": "Vale, your team handled Guatemala better than my own regional management. I want to invest in your academy.",
      "es": "Vale, su equipo manejó Guatemala mejor que mi propia gerencia regional. Quiero invertir en su academia.",
      "speaker": "reed",
      "cast": ["reed", "vale", "dani", "camila"],
      "lines": [
        {
          "speaker": "reed",
          "text": "Vale, your team handled Guatemala better than my own regional management. I want to invest in your academy.",
          "es": "Vale, su equipo manejó Guatemala mejor que mi propia gerencia regional. Quiero invertir en su academia."
        },
        {
          "speaker": "vale",
          "text": "Thank you, Mr. Reed. But 'invest' can mean many things. What kind of stake do you have in mind?",
          "es": "Gracias, señor Reed. Pero 'invertir' puede significar muchas cosas. ¿Qué tipo de participación tiene en mente?"
        },
        {
          "speaker": "reed",
          "text": "Money for growth, in exchange for equity in the company. We are talking about valuation, funding, and expansion.",
          "es": "Dinero para crecer, a cambio de participación en la empresa. Hablamos de valoración, financiamiento y expansión."
        }
      ],
      "words": [
        { "word": "stake", "es": "participación" },
        { "word": "equity", "es": "participación accionaria" },
        { "word": "valuation", "es": "valoración" }
      ]
    },
    {
      "id": "s2",
      "image": s2,
      "imageAlt": "Dani, Camila and Vale huddle privately after ending the call, discussing whether to accept the offer.",
      "text": "Scaling up sounds good, but if we give away too much equity, we lose control of decisions.",
      "es": "Escalar suena bien, pero si damos demasiada participación, perdemos el control de decisiones.",
      "speaker": "dani",
      "cast": ["dani", "camila", "vale"],
      "lines": [
        {
          "speaker": "dani",
          "text": "Scaling up sounds good, but if we give away too much equity, we lose control of decisions.",
          "es": "Escalar suena bien, pero si damos demasiada participación, perdemos el control de decisiones."
        },
        {
          "speaker": "camila",
          "text": "Exactly. The investor will ask for spreadsheets, but we still decide if a teaching method changes.",
          "es": "Exacto. El inversionista pedirá hojas de cálculo, pero nosotros seguimos decidiendo si cambia un método de enseñanza."
        },
        {
          "speaker": "vale",
          "text": "No investment is worth it if it stops being our academy. Ownership of the vision stays with us.",
          "es": "Ninguna inversión vale la pena si deja de ser nuestra academia. La propiedad de la visión se queda con nosotros."
        }
      ],
      "words": [
        { "word": "scale up", "es": "escalar / crecer" },
        { "word": "investor", "es": "inversionista" },
        { "word": "ownership", "es": "propiedad" }
      ]
    },
    {
      "id": "s3",
      "image": s3,
      "imageAlt": "Vale sits at her laptop calling Mr. Reed back to state her conditions for the deal.",
      "text": "Mr. Reed, I am interested, but with conditions. You invest, and I keep the final decision on pedagogy and teachers.",
      "es": "Señor Reed, estoy interesada, pero con condiciones. Usted invierte, y yo conservo la decisión final sobre pedagogía y maestros.",
      "speaker": "vale",
      "cast": ["vale", "reed"],
      "lines": [
        {
          "speaker": "vale",
          "text": "Mr. Reed, I am interested, but with conditions. You invest, and I keep the final decision on pedagogy and teachers.",
          "es": "Señor Reed, estoy interesada, pero con condiciones. Usted invierte, y yo conservo la decisión final sobre pedagogía y maestros."
        },
        {
          "speaker": "reed",
          "text": "That is not how it usually works, Vale. Money on the board usually buys a voice, sometimes even a veto.",
          "es": "Eso no es lo habitual, Vale. El dinero en la junta directiva suele comprar voz, a veces hasta un veto."
        },
        {
          "speaker": "vale",
          "text": "And my counteroffer is simple: you buy a seat at the table, not the whole table, and definitely not the veto.",
          "es": "Y mi contrapropuesta es simple: usted compra un asiento en la mesa, no la mesa entera, y definitivamente no el veto."
        }
      ],
      "words": [
        { "word": "board", "es": "junta directiva" },
        { "word": "veto", "es": "veto" },
        { "word": "conditions", "es": "condiciones" }
      ]
    },
    {
      "id": "s4",
      "image": s4,
      "imageAlt": "Mr. Reed leans back thoughtfully on the video screen, reconsidering Vale after her firm counteroffer.",
      "text": "I like that you did not say yes right away. Most entrepreneurs buy into the first big number they hear.",
      "es": "Me gusta que no dijera sí de inmediato. La mayoría de emprendedores se deja llevar por la primera cifra grande que escucha.",
      "speaker": "reed",
      "cast": ["reed", "vale"],
      "lines": [
        {
          "speaker": "reed",
          "text": "I like that you did not say yes right away. Most entrepreneurs buy into the first big number they hear.",
          "es": "Me gusta que no dijera sí de inmediato. La mayoría de emprendedores se deja llevar por la primera cifra grande que escucha."
        },
        {
          "speaker": "vale",
          "text": "My company is my legacy, not my lottery ticket, Mr. Reed.",
          "es": "Mi empresa es mi legado, no mi billete de lotería, señor Reed."
        },
        {
          "speaker": "reed",
          "text": "Send me the numbers, calculated honestly. If they are solid, we negotiate the percentage together.",
          "es": "Envíeme los números, calculados con honestidad. Si son sólidos, negociamos el porcentaje juntos."
        }
      ],
      "words": [
        { "word": "buy into", "es": "creerse algo sin cuestionar" },
        { "word": "legacy", "es": "legado" },
        { "word": "calculated", "es": "calculado" }
      ]
    },
    {
      "id": "s5",
      "image": s5,
      "imageAlt": "Camila reviews financial charts on her laptop while Dani and Vale look over her shoulder in the office.",
      "text": "We have six profitable months of growth, Vale. Our valuation is not fantasy, it is math.",
      "es": "Tenemos seis meses rentables de crecimiento, Vale. Nuestra valoración no es fantasía, es matemática.",
      "speaker": "camila",
      "cast": ["camila", "dani", "vale"],
      "lines": [
        {
          "speaker": "camila",
          "text": "We have six profitable months of growth, Vale. Our valuation is not fantasy, it is math.",
          "es": "Tenemos seis meses rentables de crecimiento, Vale. Nuestra valoración no es fantasía, es matemática."
        },
        {
          "speaker": "dani",
          "text": "But if we accept funding, how much money do we really need? Not everything they offer us.",
          "es": "Pero si aceptamos financiamiento, ¿cuánto dinero realmente necesitamos? No todo lo que nos ofrezcan."
        },
        {
          "speaker": "vale",
          "text": "Correct. We take only what accelerates the plan, not what distracts us from being decision-makers.",
          "es": "Correcto. Tomamos solo lo que acelera el plan, no lo que nos distrae de ser quienes deciden."
        }
      ],
      "words": [
        { "word": "profitable", "es": "rentable" },
        { "word": "funding", "es": "financiamiento" },
        { "word": "decision-makers", "es": "quienes toman las decisiones" }
      ]
    },
    {
      "id": "s6",
      "image": s6,
      "imageAlt": "Vale, Camila and Dani finalize the counterproposal on a whiteboard covered with numbers and percentages.",
      "text": "Let's put twenty percent equity on the table, with one board seat and zero veto power.",
      "es": "Pongamos veinte por ciento de participación sobre la mesa, con un asiento en la junta y cero poder de veto.",
      "speaker": "vale",
      "cast": ["vale", "camila", "dani"],
      "lines": [
        {
          "speaker": "vale",
          "text": "Let's put twenty percent equity on the table, with one board seat and zero veto power.",
          "es": "Pongamos veinte por ciento de participación sobre la mesa, con un asiento en la junta y cero poder de veto."
        },
        {
          "speaker": "camila",
          "text": "I will attach the spreadsheets: revenue, margins, and projected growth for the next two years.",
          "es": "Voy a adjuntar las hojas de cálculo: ingresos, márgenes y crecimiento proyectado para los próximos dos años."
        },
        {
          "speaker": "dani",
          "text": "If Mr. Reed truly believes in us, he should put his money where his mouth is and sign this week.",
          "es": "Si el señor Reed realmente cree en nosotros, debería demostrarlo con hechos y firmar esta semana."
        }
      ],
      "words": [
        { "word": "equity", "es": "participación" },
        { "word": "spreadsheets", "es": "hojas de cálculo" },
        { "word": "revenue", "es": "ingresos" }
      ]
    },
    {
      "id": "s7",
      "image": s7,
      "imageAlt": "Renata appears on a separate video call with Vale, wearing her crimson blazer, discussing Vale Kids Mexico.",
      "text": "Vale, I do not want to mix my offer with Reed's. Vale Kids in Mexico is a different project.",
      "es": "Vale, no quiero mezclar mi oferta con la de Reed. Vale Kids en México es otro proyecto.",
      "speaker": "renata",
      "cast": ["renata", "vale"],
      "lines": [
        {
          "speaker": "renata",
          "text": "Vale, I do not want to mix my offer with Reed's. Vale Kids in Mexico is a different project.",
          "es": "Vale, no quiero mezclar mi oferta con la de Reed. Vale Kids en México es otro proyecto."
        },
        {
          "speaker": "vale",
          "text": "Of course. Reed invests in the adult academy. You and I are talking about a partner for children.",
          "es": "Claro. Reed invierte en la academia de adultos. Tú y yo hablamos de una socia para niños."
        },
        {
          "speaker": "renata",
          "text": "Exactly. And I want a fifty percent stake in Vale Kids Mexico, not a silent partnership.",
          "es": "Exactamente. Y quiero una participación del cincuenta por ciento en Vale Kids México, no una sociedad silenciosa."
        }
      ],
      "words": [
        { "word": "mix", "es": "mezclar" },
        { "word": "partner", "es": "socia" },
        { "word": "stake", "es": "participación" }
      ]
    },
    {
      "id": "s8",
      "image": s8,
      "imageAlt": "Vale listens carefully to Renata on the video call, taking notes without committing to numbers.",
      "text": "I understand your ambition, Renata. But before we talk percentages, I need to see your schools and your teachers.",
      "es": "Entiendo tu ambición, Renata. Pero antes de hablar de porcentajes, necesito ver tus escuelas y tus maestros.",
      "speaker": "vale",
      "cast": ["vale", "renata"],
      "lines": [
        {
          "speaker": "vale",
          "text": "I understand your ambition, Renata. But before we talk percentages, I need to see your schools and your teachers.",
          "es": "Entiendo tu ambición, Renata. Pero antes de hablar de porcentajes, necesito ver tus escuelas y tus maestros."
        },
        {
          "speaker": "renata",
          "text": "That is fair. When do you travel to Monterrey to see the numbers for yourself?",
          "es": "Eso es justo. ¿Cuándo viajas a Monterrey para ver los números tú misma?"
        },
        {
          "speaker": "vale",
          "text": "As soon as we finish the proposal for Reed. One investor at a time, one contract at a time.",
          "es": "En cuanto terminemos la propuesta para Reed. Un inversionista a la vez, un contrato a la vez."
        }
      ],
      "words": [
        { "word": "ambition", "es": "ambición" },
        { "word": "percentages", "es": "porcentajes" },
        { "word": "contract", "es": "contrato" }
      ]
    },
    {
      "id": "s9",
      "image": s9,
      "imageAlt": "Renata smiles patiently on the video screen while Vale nods, agreeing on a timeline for the Mexico trip.",
      "text": "I trust your judgment, Vale, but do not make me wait too long. Growth does not wait for anyone.",
      "es": "Confío en tu juicio, Vale, pero no me hagas esperar demasiado. El crecimiento no espera a nadie.",
      "speaker": "renata",
      "cast": ["renata", "vale"],
      "lines": [
        {
          "speaker": "renata",
          "text": "I trust your judgment, Vale, but do not make me wait too long. Growth does not wait for anyone.",
          "es": "Confío en tu juicio, Vale, pero no me hagas esperar demasiado. El crecimiento no espera a nadie."
        },
        {
          "speaker": "vale",
          "text": "It will not wait, Renata. But it also should not be reckless. I calculated the timeline already: three weeks.",
          "es": "No esperará, Renata. Pero tampoco debe ser imprudente. Ya calculé el cronograma: tres semanas."
        },
        {
          "speaker": "renata",
          "text": "Three weeks. I will hold my team, and my patience, for exactly that long.",
          "es": "Tres semanas. Voy a contener a mi equipo, y mi paciencia, exactamente ese tiempo."
        }
      ],
      "words": [
        { "word": "trust", "es": "confiar" },
        { "word": "reckless", "es": "imprudente" },
        { "word": "timeline", "es": "cronograma" }
      ]
    },
    {
      "id": "s10",
      "image": s10,
      "imageAlt": "Dani, Vale and Camila sit together reflecting on the day's two offers in the quiet office.",
      "text": "We do not choose one or the other. We choose to grow with control. It is a different kind of investment.",
      "es": "No elegimos uno u otro. Elegimos crecer con control. Es un tipo diferente de inversión.",
      "speaker": "vale",
      "cast": ["dani", "vale", "camila"],
      "lines": [
        {
          "speaker": "dani",
          "text": "Vale, I never thought we would have to choose between growing and keeping control.",
          "es": "Vale, nunca pensé que tendríamos que elegir entre crecer y mantener el control."
        },
        {
          "speaker": "vale",
          "text": "We do not choose one or the other. We choose to grow with control. It is a different kind of investment.",
          "es": "No elegimos uno u otro. Elegimos crecer con control. Es un tipo diferente de inversión."
        },
        {
          "speaker": "camila",
          "text": "That is exactly what it takes to go from a small academy to a real company with real ownership.",
          "es": "Eso es exactamente lo que se necesita para pasar de una academia pequeña a una empresa real con propiedad real."
        }
      ],
      "words": [
        { "word": "choose", "es": "elegir" },
        { "word": "investment", "es": "inversión" },
        { "word": "ownership", "es": "propiedad" }
      ]
    },
    {
      "id": "s11",
      "image": s11,
      "imageAlt": "Mr. Reed reappears on the video screen looking serious as Vale answers, with Camila standing nearby.",
      "text": "Vale, I received your numbers. There is one thing in the spreadsheets that does not add up.",
      "es": "Vale, recibí sus números. Hay una cosa en las hojas de cálculo que no cuadra.",
      "speaker": "reed",
      "cast": ["reed", "vale", "camila"],
      "lines": [
        {
          "speaker": "reed",
          "text": "Vale, I received your numbers. There is one thing in the spreadsheets that does not add up.",
          "es": "Vale, recibí sus números. Hay una cosa en las hojas de cálculo que no cuadra."
        },
        {
          "speaker": "vale",
          "text": "Which number, Mr. Reed? Tell me now, and I will explain it or fix it before tomorrow.",
          "es": "¿Qué número, señor Reed? Dígame ahora, y lo explicaré o lo corregiré antes de mañana."
        },
        {
          "speaker": "reed",
          "text": "Tomorrow at nine. Bring Camila. This conversation needs someone who understands the accounting.",
          "es": "Mañana a las nueve. Traiga a Camila. Esta conversación necesita a alguien que entienda la contabilidad."
        }
      ],
      "words": [
        { "word": "add up", "es": "cuadrar / sumar correctamente" },
        { "word": "explain", "es": "explicar" },
        { "word": "accounting", "es": "contabilidad" }
      ]
    }
  ],
  "quizzes": [
    {
      "id": "q1",
      "afterScene": "s3",
      "questionEn": "What does Vale want to keep control of?",
      "questionEs": "¿De qué quiere Vale conservar el control?",
      "options": [
        { "label": "Pedagogy and teachers — the educational decisions.", "emoji": "🎓" },
        { "label": "The office furniture.", "emoji": "🪑" },
        { "label": "The company's social media.", "emoji": "📱" }
      ],
      "answer": 0,
      "sayIt": "She wants to keep the final decision on pedagogy and teachers.",
      "sayItEs": "Ejemplo: «She wants to keep the final decision on pedagogy and teachers.»",
      "sayItAskEn": "If someone invested in your project, what would you never let them control?",
      "sayItAskEs": "Si alguien invirtiera en tu proyecto, ¿qué nunca dejarías que controlara?",
      "sayItCheck": {
        "target": "I would never let them control *",
        "altTargets": [
          "I would keep control of *",
          "I would not give up *"
        ]
      }
    },
    {
      "id": "q2",
      "afterScene": "s7",
      "questionEn": "If you were Vale, would you accept Reed's money? Why or why not?",
      "questionEs": "Si fueras Vale, ¿aceptarías el dinero de Reed? ¿Por qué o por qué no?",
      "options": [
        { "label": "I would accept only if I keep control of educational decisions.", "emoji": "🤝" },
        { "label": "I would accept any amount, no conditions.", "emoji": "🤑" },
        { "label": "I would never accept outside money.", "emoji": "🚫" }
      ],
      "answer": 0,
      "sayIt": "I would accept only if I keep control of educational decisions, because the academy's quality is its value.",
      "sayItEs": "Ejemplo: «I would accept only if I keep control of educational decisions, because the academy's quality is its value.»",
      "sayItAskEn": "If you were Vale, would you accept Reed's money? Why or why not?",
      "sayItAskEs": "Si fueras Vale, ¿aceptarías el dinero de Reed? ¿Por qué o por qué no?",
      "sayItCheck": {
        "target": "I would accept only if *",
        "altTargets": [
          "I would accept because *",
          "I would not accept because *"
        ]
      }
    },
    {
      "id": "q3",
      "afterScene": "s10",
      "questionEn": "What does Renata want in Vale Kids Mexico?",
      "questionEs": "¿Qué quiere Renata en Vale Kids México?",
      "options": [
        { "label": "A fifty percent stake, not a silent partnership.", "emoji": "🇲🇽" },
        { "label": "Only to lend office space.", "emoji": "🏢" },
        { "label": "Nothing — she was just visiting.", "emoji": "🤷" }
      ],
      "answer": 0,
      "sayIt": "Renata wants a fifty percent stake in Vale Kids Mexico, not a silent partnership.",
      "sayItEs": "Ejemplo: «Renata wants a fifty percent stake in Vale Kids Mexico, not a silent partnership.»",
      "sayItAskEn": "Summarize both offers Vale received today, and what she decided about each one.",
      "sayItAskEs": "Resume las dos ofertas que recibió Vale hoy, y qué decidió sobre cada una.",
      "sayItCheck": {
        "target": "Reed offered *, and Renata offered *",
        "altTargets": [
          "First *, then *",
          "Vale decided to *"
        ]
      }
    }
  ],
  "mindsetCard": {
    "afterScene": "s4",
    "phrase": "I can grow without losing myself. Success does not require giving everything away.",
    "es": "Puedo crecer sin perderme a mí misma. El éxito no requiere darlo todo."
  },
  "habitCard": {
    "afterScene": "s6",
    "phrase": "English is easy when I say my conditions clearly and calmly.",
    "es": "El inglés es fácil cuando digo mis condiciones con claridad y calma.",
    "model": "vale",
    "modelActionEs": "Vale plantea su contraoferta con calma, sin apurarse a aceptar el dinero."
  },
  "expressions": [
    {
      "phrase": "scale up",
      "variants": ["scaling up"],
      "es": "escalar / hacer crecer una operación",
      "kind": "phrasal",
      "example": "Scaling up sounds good, but if we give away too much equity, we lose control of decisions.",
      "exampleEs": "Escalar suena bien, pero si damos demasiada participación, perdemos el control de decisiones."
    },
    {
      "phrase": "buy into",
      "es": "creerse algo / aceptar una idea sin cuestionarla",
      "kind": "phrasal",
      "example": "I like that you did not say yes right away. Most entrepreneurs buy into the first big number they hear.",
      "exampleEs": "Me gusta que no dijera sí de inmediato. La mayoría de emprendedores se deja llevar por la primera cifra grande que escucha."
    },
    {
      "phrase": "put your money where your mouth is",
      "variants": ["put his money where his mouth is"],
      "es": "demostrar con hechos lo que dices creer",
      "kind": "idiom",
      "example": "If Mr. Reed truly believes in us, he should put his money where his mouth is and sign this week.",
      "exampleEs": "Si el señor Reed realmente cree en nosotros, debería demostrarlo con hechos y firmar esta semana."
    }
  ],
  "finaleSeconds": 30,
  "continuePrompt": {
    "en": "Your turn, 30 seconds: describe an offer someone made you, and the one condition you would set before accepting.",
    "es": "Tu turno, 30 segundos: describe una oferta que alguien te hizo, y la condición que pondrías antes de aceptar."
  },
  "continueWith": [
    "Someone offered me ...",
    "My condition would be ...",
    "I would only accept if ..."
  ],
  "cliffhanger": {
    "en": "Tomorrow at nine. Bring Camila. This conversation needs someone who understands the accounting.",
    "es": "Mañana a las nueve. Traiga a Camila. Esta conversación necesita a alguien que entienda la contabilidad."
  }
};
