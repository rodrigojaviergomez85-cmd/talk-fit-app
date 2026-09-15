import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/sharks-ep5-counter-offer/cover.jpg";
import s1 from "@/assets/storybook/sharks-ep5-counter-offer/s1.jpg";
import s2 from "@/assets/storybook/sharks-ep5-counter-offer/s2.jpg";
import s3 from "@/assets/storybook/sharks-ep5-counter-offer/s3.jpg";
import s4 from "@/assets/storybook/sharks-ep5-counter-offer/s4.jpg";
import s5 from "@/assets/storybook/sharks-ep5-counter-offer/s5.jpg";
import s6 from "@/assets/storybook/sharks-ep5-counter-offer/s6.jpg";
import s7 from "@/assets/storybook/sharks-ep5-counter-offer/s7.jpg";
import s8 from "@/assets/storybook/sharks-ep5-counter-offer/s8.jpg";
import s9 from "@/assets/storybook/sharks-ep5-counter-offer/s9.jpg";
import s10 from "@/assets/storybook/sharks-ep5-counter-offer/s10.jpg";
import s11 from "@/assets/storybook/sharks-ep5-counter-offer/s11.jpg";

export const SHARKS_EP5_COUNTER_OFFER: StorybookEpisode = {
  "id": "sharks-ep5-counter-offer",
  "moduleId": "sharks",
  "week": 1,
  "title": "The counter-offer",
  "titleEs": "La contraoferta",
  "episodeLabel": {
    "en": "Season 8 · Episode 5",
    "es": "Temporada 8 · Episodio 5"
  },
  "previously": [
    {
      "en": "Vale won an international contract, but every new opportunity brings a harder decision.",
      "es": "Vale ganó un contrato internacional, pero cada oportunidad trae una decisión más difícil."
    }
  ],
  "reviewWords": [
    {
      "word": "contract",
      "es": "contrato"
    },
    {
      "word": "quality",
      "es": "calidad"
    },
    {
      "word": "deadline",
      "es": "fecha límite"
    }
  ],
  "blurb": {
    "en": "Houston will sign today if you launch Monday and lower the setup fee. One more condition: hire a local coordinator in Guatemala by tomorrow.",
    "es": "Houston firmará hoy si lanzan el lunes y bajan la tarifa de instalación. Una condición más: contraten una coordinadora local en Guatemala para mañana."
  },
  "cover": cover,
  "voice": "girl",
  "scenes": [
    {
      "id": "s1",
      "image": s1,
      "imageAlt": "Mr. Reed presents Houston's counteroffer on the call while Dani reads it on the screen.",
      "text": "Houston will sign today if you launch Monday and lower the setup fee.",
      "es": "Houston firmará hoy si lanzan el lunes y bajan la tarifa de instalación.",
      "speaker": "reed",
      "cast": [
        "reed",
        "dani"
      ],
      "lines": [
        {
          "speaker": "dani",
          "text": "Good morning, Mr. Reed. We received your counteroffer last night, and it surprised the whole team. Nobody expected Houston to change two conditions at once.",
          "es": "Buenos días, señor Reed. Recibimos su contraoferta anoche, y sorprendió a todo el equipo. Nadie esperaba que Houston cambiara dos condiciones a la vez."
        },
        {
          "speaker": "reed",
          "text": "Houston will sign today if you launch Monday and lower the setup fee.",
          "es": "Houston firmará hoy si lanzan el lunes y bajan la tarifa de instalación."
        },
        {
          "speaker": "dani",
          "text": "Monday is four days away, and that fee already covers the training for twelve teachers.",
          "es": "El lunes es en cuatro días, y esa tarifa ya cubre la capacitación de doce maestros."
        }
      ],
      "words": [
        { "word": "sign", "es": "firmar" },
        { "word": "launch", "es": "lanzamiento" },
        { "word": "fee", "es": "tarifa" }
      ]
    },
    {
      "id": "s2",
      "image": s2,
      "imageAlt": "Camila reviews the budget alone and shows the loss the counteroffer would cause.",
      "text": "If we accepted that, we would lose money during the first month.",
      "es": "Si aceptáramos eso, perderíamos dinero durante el primer mes.",
      "speaker": "camila",
      "cast": [
        "camila"
      ],
      "lines": [
        {
          "speaker": "camila",
          "text": "I ran the numbers twice this morning, and both times the result looked exactly the same, even after I used the new prices Houston sent us.",
          "es": "Corrí los números dos veces esta mañana, y las dos veces el resultado se vio exactamente igual, incluso usando los precios nuevos que envió Houston."
        },
        {
          "speaker": "camila",
          "text": "If we accepted that, we would lose money during the first month.",
          "es": "Si aceptáramos eso, perderíamos dinero durante el primer mes."
        },
        {
          "speaker": "camila",
          "text": "Around two thousand dollars, and that amount is what pays our new teachers in Guatemala.",
          "es": "Unos dos mil dólares, y esa cantidad es la que paga a nuestros nuevos maestros en Guatemala."
        }
      ],
      "words": [
        { "word": "accepted", "es": "aceptado" },
        { "word": "lose", "es": "perder" },
        { "word": "amount", "es": "cantidad" }
      ]
    },
    {
      "id": "s3",
      "image": s3,
      "imageAlt": "Dani warns about rushing the launch while Mr. Reed listens from Houston.",
      "text": "And if we rushed the launch, quality would drop.",
      "es": "Y si apresuráramos el lanzamiento, la calidad bajaría.",
      "speaker": "dani",
      "cast": [
        "dani",
        "reed"
      ],
      "lines": [
        {
          "speaker": "dani",
          "text": "Money is only half of the problem. Honestly, the calendar worries me more than the fee.",
          "es": "El dinero es solo la mitad del problema. Honestamente, el calendario me preocupa más que la tarifa."
        },
        {
          "speaker": "dani",
          "text": "And if we rushed the launch, quality would drop.",
          "es": "Y si apresuráramos el lanzamiento, la calidad bajaría."
        },
        {
          "speaker": "reed",
          "text": "Every provider tells me the same thing. Explain what would actually break if you launched Monday.",
          "es": "Todos los proveedores me dicen lo mismo. Explique qué se rompería realmente si lanzaran el lunes."
        }
      ],
      "words": [
        { "word": "rushed", "es": "apresurado" },
        { "word": "quality", "es": "calidad" },
        { "word": "provider", "es": "proveedor" }
      ]
    },
    {
      "id": "s4",
      "image": s4,
      "imageAlt": "Vale stands alone by the window deciding whether to reject the offer as written.",
      "text": "We may have to turn down the offer as written.",
      "es": "Quizás tengamos que rechazar la oferta tal como está.",
      "speaker": "vale",
      "cast": [
        "vale"
      ],
      "lines": [
        {
          "speaker": "vale",
          "text": "Three teachers would teach without training, and the first class always defines the client's opinion. We cannot repair a first impression with a discount later.",
          "es": "Tres maestros darían clase sin capacitación, y la primera clase siempre define la opinión del cliente. No podemos reparar una primera impresión con un descuento después."
        },
        {
          "speaker": "vale",
          "text": "We may have to turn down the offer as written.",
          "es": "Quizás tengamos que rechazar la oferta tal como está."
        },
        {
          "speaker": "vale",
          "text": "That sentence is difficult to say to Northline, but a bad launch would damage us longer.",
          "es": "Esa frase es difícil de decirle a Northline, pero un mal lanzamiento nos dañaría más tiempo."
        }
      ],
      "words": [
        { "word": "training", "es": "capacitación" },
        { "word": "opinion", "es": "opinión" },
        { "word": "damage", "es": "dañar" }
      ]
    },
    {
      "id": "s5",
      "image": s5,
      "imageAlt": "Mr. Reed mentions another provider while Dani defends the team's experience.",
      "text": "Another provider said yes. Why should I wait for you?",
      "es": "Otro proveedor dijo que sí. ¿Por qué debería esperarlos?",
      "speaker": "reed",
      "cast": [
        "reed",
        "dani"
      ],
      "lines": [
        {
          "speaker": "reed",
          "text": "Let me be direct with you. My board wants this program running before the quarter closes.",
          "es": "Permítame ser directo. Mi junta quiere este programa funcionando antes de que cierre el trimestre."
        },
        {
          "speaker": "reed",
          "text": "Another provider said yes. Why should I wait for you?",
          "es": "Otro proveedor dijo que sí. ¿Por qué debería esperarlos?"
        },
        {
          "speaker": "dani",
          "text": "Because that provider has never trained a team in three countries during the same week.",
          "es": "Porque ese proveedor nunca ha capacitado a un equipo en tres países durante la misma semana."
        }
      ],
      "words": [
        { "word": "board", "es": "junta directiva" },
        { "word": "quarter", "es": "trimestre" },
        { "word": "trained", "es": "capacitado" }
      ]
    },
    {
      "id": "s6",
      "image": s6,
      "imageAlt": "Vale and Camila prepare a counter-proposal with numbers on the office table.",
      "text": "Because a failed launch costs more than a careful one. Let us work out better terms.",
      "es": "Porque un lanzamiento fallido cuesta más que uno cuidadoso. Busquemos mejores términos.",
      "speaker": "vale",
      "cast": [
        "vale",
        "camila"
      ],
      "lines": [
        {
          "speaker": "camila",
          "text": "Vale, answer his question with numbers. He respects evidence far more than promises.",
          "es": "Vale, responde su pregunta con números. Él respeta la evidencia mucho más que las promesas."
        },
        {
          "speaker": "vale",
          "text": "Because a failed launch costs more than a careful one. Let us work out better terms.",
          "es": "Porque un lanzamiento fallido cuesta más que uno cuidadoso. Busquemos mejores términos."
        },
        {
          "speaker": "camila",
          "text": "Then offer something real. A refusal without an alternative sounds exactly like a no.",
          "es": "Entonces ofrece algo real. Una negativa sin alternativa suena exactamente como un no."
        }
      ],
      "words": [
        { "word": "failed", "es": "fallido" },
        { "word": "terms", "es": "términos" },
        { "word": "evidence", "es": "evidencia" }
      ]
    },
    {
      "id": "s7",
      "image": s7,
      "imageAlt": "Camila offers the advance-payment discount while Mr. Reed considers it on screen.",
      "text": "We could reduce the fee if Houston paid the first month in advance.",
      "es": "Podríamos reducir la tarifa si Houston pagara el primer mes por adelantado.",
      "speaker": "camila",
      "cast": [
        "camila",
        "reed"
      ],
      "lines": [
        {
          "speaker": "camila",
          "text": "We could reduce the fee if Houston paid the first month in advance.",
          "es": "Podríamos reducir la tarifa si Houston pagara el primer mes por adelantado."
        },
        {
          "speaker": "reed",
          "text": "Paying in advance is unusual for us, but it is possible if the discount is real.",
          "es": "Pagar por adelantado es inusual para nosotros, pero es posible si el descuento es real."
        },
        {
          "speaker": "camila",
          "text": "Fifteen percent lower, and your teachers keep the same training hours we promised before. That protects our quality and improves your cash position.",
          "es": "Quince por ciento menos, y sus maestros conservan las mismas horas de capacitación que prometimos antes. Eso protege nuestra calidad y mejora su posición de efectivo."
        }
      ],
      "words": [
        { "word": "reduce", "es": "reducir" },
        { "word": "advance", "es": "adelantado" },
        { "word": "discount", "es": "descuento" }
      ]
    },
    {
      "id": "s8",
      "image": s8,
      "imageAlt": "Dani proposes a staged launch to Vale using the three-office calendar.",
      "text": "And we could start one office Monday, then add the other two Friday.",
      "es": "Y podríamos empezar una oficina el lunes y agregar las otras dos el viernes.",
      "speaker": "dani",
      "cast": [
        "dani",
        "vale"
      ],
      "lines": [
        {
          "speaker": "vale",
          "text": "The fee is solved. Now we still have the calendar, and Monday has not moved.",
          "es": "La tarifa está resuelta. Todavía tenemos el calendario, y el lunes no se ha movido."
        },
        {
          "speaker": "dani",
          "text": "And we could start one office Monday, then add the other two Friday.",
          "es": "Y podríamos empezar una oficina el lunes y agregar las otras dos el viernes."
        },
        {
          "speaker": "vale",
          "text": "One office gives us a real test with real students before the other two open.",
          "es": "Una oficina nos da una prueba real con estudiantes reales antes de que abran las otras dos."
        }
      ],
      "words": [
        { "word": "office", "es": "oficina" },
        { "word": "calendar", "es": "calendario" },
        { "word": "test", "es": "prueba" }
      ]
    },
    {
      "id": "s9",
      "image": s9,
      "imageAlt": "Vale and Dani agree on the middle point that protects the program.",
      "text": "That is how we meet halfway without risking the program.",
      "es": "Así llegamos a un punto medio sin arriesgar el programa.",
      "speaker": "vale",
      "cast": [
        "vale",
        "dani"
      ],
      "lines": [
        {
          "speaker": "dani",
          "text": "So Houston gets its Monday, and we get the time our teachers actually need.",
          "es": "Así Houston tiene su lunes, y nosotros tenemos el tiempo que nuestros maestros realmente necesitan."
        },
        {
          "speaker": "vale",
          "text": "That is how we meet halfway without risking the program.",
          "es": "Así llegamos a un punto medio sin arriesgar el programa."
        },
        {
          "speaker": "dani",
          "text": "Say it to him exactly like that, calmly, and let him decide with the full picture.",
          "es": "Díselo exactamente así, con calma, y deja que él decida con el panorama completo."
        }
      ],
      "words": [
        { "word": "risking", "es": "arriesgando" },
        { "word": "program", "es": "programa" },
        { "word": "decide", "es": "decidir" }
      ]
    },
    {
      "id": "s10",
      "image": s10,
      "imageAlt": "Mr. Reed accepts the final terms while Camila writes them down.",
      "text": "One office Monday, payment in advance, all three by Friday. Deal.",
      "es": "Una oficina el lunes, pago por adelantado, las tres para el viernes. Trato.",
      "speaker": "reed",
      "cast": [
        "reed",
        "camila"
      ],
      "lines": [
        {
          "speaker": "camila",
          "text": "Mr. Reed, that is our complete proposal, and every number in it is written here.",
          "es": "Señor Reed, esa es nuestra propuesta completa, y cada número está escrito aquí."
        },
        {
          "speaker": "reed",
          "text": "One office Monday, payment in advance, all three by Friday. Deal.",
          "es": "Una oficina el lunes, pago por adelantado, las tres para el viernes. Trato."
        },
        {
          "speaker": "camila",
          "text": "Thank you. I will send the revised contract within the hour so nothing stays verbal.",
          "es": "Gracias. Enviaré el contrato revisado dentro de una hora para que nada quede verbal."
        }
      ],
      "words": [
        { "word": "payment", "es": "pago" },
        { "word": "proposal", "es": "propuesta" },
        { "word": "revised", "es": "revisado" }
      ]
    },
    {
      "id": "s11",
      "image": s11,
      "imageAlt": "Mr. Reed adds a last condition from Houston about hiring a coordinator in Guatemala.",
      "text": "One more condition: hire a local coordinator in Guatemala by tomorrow.",
      "es": "Una condición más: contraten una coordinadora local en Guatemala para mañana.",
      "speaker": "reed",
      "cast": [
        "reed"
      ],
      "lines": [
        {
          "speaker": "reed",
          "text": "Before you celebrate, there is one detail my operations team asked me to include. Please listen carefully before anybody signs anything today.",
          "es": "Antes de que celebren, hay un detalle que mi equipo de operaciones me pidió incluir. Por favor escuchen con atención antes de que alguien firme algo hoy."
        },
        {
          "speaker": "reed",
          "text": "One more condition: hire a local coordinator in Guatemala by tomorrow.",
          "es": "Una condición más: contraten una coordinadora local en Guatemala para mañana."
        },
        {
          "speaker": "reed",
          "text": "Nobody in Houston can supervise that office from here, so I need somebody on the ground.",
          "es": "Nadie en Houston puede supervisar esa oficina desde aquí, así que necesito a alguien en el terreno."
        }
      ],
      "words": [
        { "word": "condition", "es": "condición" },
        { "word": "coordinator", "es": "coordinador" },
        { "word": "supervise", "es": "supervisar" }
      ]
    }
  ],
  "quizzes": [
    {
      "id": "q1",
      "afterScene": "s3",
      "questionEn": "What is the main problem the team identifies?",
      "questionEs": "¿Cuál es el problema principal que identifica el equipo?",
      "options": [
        {
          "label": "And if we rushed the launch, quality would drop.",
          "emoji": "🎯"
        },
        {
          "label": "They decide to stop working.",
          "emoji": "🛑"
        },
        {
          "label": "They forget the meeting.",
          "emoji": "❓"
        }
      ],
      "answer": 0,
      "sayIt": "The main problem is clear, so we should act.",
      "sayItEs": "Ejemplo: «The main problem is clear, so we should act.»",
      "sayItAskEn": "What advice would you give the team?",
      "sayItAskEs": "¿Qué consejo le darías al equipo?",
      "sayItCheck": {
        "target": "They should *",
        "altTargets": [
          "They could *",
          "I would *",
          "They must *"
        ]
      }
    },
    {
      "id": "q2",
      "afterScene": "s7",
      "questionEn": "How does the team respond under pressure?",
      "questionEs": "¿Cómo responde el equipo bajo presión?",
      "options": [
        {
          "label": "We could reduce the fee if Houston paid the first month in advance.",
          "emoji": "💬"
        },
        {
          "label": "They ignore the problem.",
          "emoji": "🙈"
        },
        {
          "label": "They cancel every class.",
          "emoji": "🚫"
        }
      ],
      "answer": 0,
      "sayIt": "They respond clearly and protect the result.",
      "sayItEs": "Ejemplo: «They respond clearly and protect the result.»",
      "sayItAskEn": "Describe how you would respond in this situation.",
      "sayItAskEs": "Describe cómo responderías en esta situación.",
      "sayItCheck": {
        "target": "I would * because *",
        "altTargets": [
          "First, I would *",
          "I would try to *"
        ]
      }
    },
    {
      "id": "q3",
      "afterScene": "s11",
      "questionEn": "What changes at the end of the episode?",
      "questionEs": "¿Qué cambia al final del episodio?",
      "options": [
        {
          "label": "One more condition: hire a local coordinator in Guatemala by tomorrow.",
          "emoji": "⚡"
        },
        {
          "label": "Nothing changes.",
          "emoji": "😴"
        },
        {
          "label": "Everyone goes on vacation.",
          "emoji": "🏖️"
        }
      ],
      "answer": 0,
      "sayIt": "One more condition: hire a local coordinator in Guatemala by tomorrow.",
      "sayItEs": "Cuenta el cambio final con tus propias palabras.",
      "sayItAskEn": "Summarize the problem, the response, and the result.",
      "sayItAskEs": "Resume el problema, la respuesta y el resultado.",
      "sayItCheck": {
        "target": "The problem was *, so they *, and *",
        "altTargets": [
          "First *, then *, finally *",
          "They had to *"
        ]
      }
    }
  ],
  "mindsetCard": {
    "afterScene": "s6",
    "phrase": "I can do hard things. Mistakes are part of the process.",
    "es": "Puedo hacer cosas difíciles. Los errores son parte del proceso."
  },
  "habitCard": {
    "afterScene": "s4",
    "phrase": "English is easy when I listen, clarify, and speak again.",
    "es": "El inglés es fácil cuando escucho, aclaro y vuelvo a hablar.",
    "model": "vale",
    "modelActionEs": "Vale escucha, aclara y responde con calma."
  },
  "expressions": [
    {
      "phrase": "turn down",
      "variants": [
        "turned down"
      ],
      "es": "rechazar",
      "kind": "phrasal",
      "example": "We may have to turn down the offer as written.",
      "exampleEs": "Quizás tengamos que rechazar la oferta tal como está."
    },
    {
      "phrase": "work out",
      "variants": [
        "worked out"
      ],
      "es": "resolver / acordar",
      "kind": "phrasal",
      "example": "Because a failed launch costs more than a careful one. Let us work out better terms.",
      "exampleEs": "Porque un lanzamiento fallido cuesta más que uno cuidadoso. Busquemos mejores términos."
    },
    {
      "phrase": "meet halfway",
      "es": "llegar a un punto medio",
      "kind": "idiom",
      "example": "That is how we meet halfway without risking the program.",
      "exampleEs": "Así llegamos a un punto medio sin arriesgar el programa."
    }
  ],
  "finaleSeconds": 45,
  "continuePrompt": {
    "en": "Your turn, 45 seconds: explain the problem, compare the options, and defend your decision.",
    "es": "Tu turno, 45 segundos: explica el problema, compara las opciones y defiende tu decisión."
  },
  "continueWith": [
    "The main issue is ...",
    "If I were responsible, I would ...",
    "The best option is ... because ..."
  ],
  "cliffhanger": {
    "en": "One more condition: hire a local coordinator in Guatemala by tomorrow.",
    "es": "Una condición más: contraten una coordinadora local en Guatemala para mañana."
  }
};
