import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/sharks-ep3-first-dollar-contract/cover.jpg";
import s1 from "@/assets/storybook/sharks-ep3-first-dollar-contract/s1.jpg";
import s2 from "@/assets/storybook/sharks-ep3-first-dollar-contract/s2.jpg";
import s3 from "@/assets/storybook/sharks-ep3-first-dollar-contract/s3.jpg";
import s4 from "@/assets/storybook/sharks-ep3-first-dollar-contract/s4.jpg";
import s5 from "@/assets/storybook/sharks-ep3-first-dollar-contract/s5.jpg";
import s6 from "@/assets/storybook/sharks-ep3-first-dollar-contract/s6.jpg";
import s7 from "@/assets/storybook/sharks-ep3-first-dollar-contract/s7.jpg";
import s8 from "@/assets/storybook/sharks-ep3-first-dollar-contract/s8.jpg";
import s9 from "@/assets/storybook/sharks-ep3-first-dollar-contract/s9.jpg";
import s10 from "@/assets/storybook/sharks-ep3-first-dollar-contract/s10.jpg";
import s11 from "@/assets/storybook/sharks-ep3-first-dollar-contract/s11.jpg";

export const SHARKS_EP3_FIRST_DOLLAR_CONTRACT: StorybookEpisode = {
  "id": "sharks-ep3-first-dollar-contract",
  "moduleId": "sharks",
  "week": 1,
  "title": "The first dollar contract",
  "titleEs": "El primer contrato en dólares",
  "episodeLabel": {
    "en": "Season 8 · Episode 3",
    "es": "Temporada 8 · Episodio 3"
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
    "en": "The payment clause says ninety days. We should look over every line before we sign. Agreed. Now tell your team: the launch date just moved forward.",
    "es": "La cláusula de pago dice noventa días. Deberíamos revisar cada línea antes de firmar. De acuerdo. Ahora dígale a su equipo: la fecha de lanzamiento se adelantó."
  },
  "cover": cover,
  "voice": "girl",
  "scenes": [
    {
      "id": "s1",
      "image": s1,
      "imageAlt": "Vale and Dani read the Northline contract together early in the morning at the academy office.",
      "text": "The payment clause says ninety days. We should look over every line before we sign.",
      "es": "La cláusula de pago dice noventa días. Deberíamos revisar cada línea antes de firmar.",
      "speaker": "vale",
      "cast": ["vale", "dani"],
      "lines": [
        {
          "speaker": "dani",
          "text": "The contract from Houston arrived last night, Vale. Did you read the payment section before this meeting?",
          "es": "El contrato de Houston llegó anoche, Vale. ¿Leíste la sección de pago antes de esta reunión?"
        },
        {
          "speaker": "vale",
          "text": "The payment clause says ninety days. We should look over every line before we sign.",
          "es": "La cláusula de pago dice noventa días. Deberíamos revisar cada línea antes de firmar."
        },
        {
          "speaker": "dani",
          "text": "Ninety days? That means we pay our teachers three times before Northline sends us a single dollar.",
          "es": "¿Noventa días? Eso significa que pagamos a nuestros maestros tres veces antes de que Northline nos envíe un solo dólar."
        }
      ],
      "words": [
        { "word": "clause", "es": "cláusula" },
        { "word": "payment", "es": "pago" },
        { "word": "sign", "es": "firmar" }
      ]
    },
    {
      "id": "s2",
      "image": s2,
      "imageAlt": "Dani and Camila review the school budget on a laptop while discussing the ninety-day payment term.",
      "text": "You should push back. A small school cannot finance a global company for three months.",
      "es": "Deberías oponerte. Una escuela pequeña no puede financiar una empresa global por tres meses.",
      "speaker": "dani",
      "cast": ["dani", "camila"],
      "lines": [
        {
          "speaker": "dani",
          "text": "You should push back. A small school cannot finance a global company for three months.",
          "es": "Deberías oponerte. Una escuela pequeña no puede financiar una empresa global por tres meses."
        },
        {
          "speaker": "camila",
          "text": "He is right. Our savings cover six weeks of salaries, not twelve weeks of waiting for money.",
          "es": "Él tiene razón. Nuestros ahorros cubren seis semanas de salarios, no doce semanas esperando el dinero."
        },
        {
          "speaker": "dani",
          "text": "So ask them for thirty days, and explain clearly why that number protects both companies, not only ours.",
          "es": "Entonces pídeles treinta días y explica con claridad por qué ese número protege a ambas empresas, no solo a la nuestra."
        }
      ],
      "words": [
        { "word": "finance", "es": "financiar" },
        { "word": "savings", "es": "ahorros" },
        { "word": "salaries", "es": "salarios" }
      ]
    },
    {
      "id": "s3",
      "image": s3,
      "imageAlt": "Camila points at the contract while Mr. Reed appears on the video call screen to open the negotiation.",
      "text": "Read the fine print. They can delay payment if one report is late.",
      "es": "Lee la letra pequeña. Pueden retrasar el pago si un informe llega tarde.",
      "speaker": "camila",
      "cast": ["camila", "reed", "vale"],
      "lines": [
        {
          "speaker": "camila",
          "text": "Read the fine print. They can delay payment if one report is late.",
          "es": "Lee la letra pequeña. Pueden retrasar el pago si un informe llega tarde."
        },
        {
          "speaker": "reed",
          "text": "Good morning. I am Mr. Reed, Northline's director. I understand you have questions about the contract.",
          "es": "Buenos días. Soy el señor Reed, director de Northline. Entiendo que tienen preguntas sobre el contrato."
        },
        {
          "speaker": "vale",
          "text": "Good morning, Mr. Reed. Yes, we have two questions: the payment term and the report deadline.",
          "es": "Buenos días, señor Reed. Sí, tenemos dos preguntas: el plazo de pago y la fecha límite del informe."
        }
      ],
      "words": [
        { "word": "delay", "es": "retrasar" },
        { "word": "director", "es": "director" },
        { "word": "deadline", "es": "fecha límite" }
      ]
    },
    {
      "id": "s4",
      "image": s4,
      "imageAlt": "Mr. Reed answers firmly from Houston on the video call while Vale listens and takes notes.",
      "text": "Houston uses one contract worldwide. You will have to adapt.",
      "es": "Houston usa un contrato en todo el mundo. Tendrán que adaptarse.",
      "speaker": "reed",
      "cast": ["reed", "vale"],
      "lines": [
        {
          "speaker": "vale",
          "text": "Ninety days is a long time for a school that pays its teachers every two weeks, Mr. Reed.",
          "es": "Noventa días es mucho tiempo para una escuela que paga a sus maestros cada dos semanas, señor Reed."
        },
        {
          "speaker": "reed",
          "text": "Houston uses one contract worldwide. You will have to adapt.",
          "es": "Houston usa un contrato en todo el mundo. Tendrán que adaptarse."
        },
        {
          "speaker": "vale",
          "text": "I understand the policy, but that standard should still work for the partner your company chose.",
          "es": "Entiendo la política, pero ese estándar también debería funcionar para el socio que su empresa eligió."
        }
      ],
      "words": [
        { "word": "worldwide", "es": "en todo el mundo" },
        { "word": "adapt", "es": "adaptarse" },
        { "word": "policy", "es": "política" }
      ]
    },
    {
      "id": "s5",
      "image": s5,
      "imageAlt": "Vale makes a concrete counter-offer on the call while Dani watches the numbers on the screen.",
      "text": "We can adapt, but you should change this clause to thirty days.",
      "es": "Podemos adaptarnos, pero debería cambiar esta cláusula a treinta días.",
      "speaker": "vale",
      "cast": ["vale", "reed", "dani"],
      "lines": [
        {
          "speaker": "reed",
          "text": "What exactly are you proposing? Be specific, please. I do not negotiate with vague ideas.",
          "es": "¿Qué está proponiendo exactamente? Sea específica, por favor. No negocio con ideas vagas."
        },
        {
          "speaker": "vale",
          "text": "We can adapt, but you should change this clause to thirty days.",
          "es": "Podemos adaptarnos, pero debería cambiar esta cláusula a treinta días."
        },
        {
          "speaker": "reed",
          "text": "Thirty days is aggressive. I can take sixty days to my finance team, and I promise nothing.",
          "es": "Treinta días es agresivo. Puedo llevar sesenta días a mi equipo de finanzas, y no prometo nada."
        }
      ],
      "words": [
        { "word": "proposing", "es": "proponiendo" },
        { "word": "specific", "es": "específico" },
        { "word": "negotiate", "es": "negociar" }
      ]
    },
    {
      "id": "s6",
      "image": s6,
      "imageAlt": "Dani and Camila talk quietly with the call on mute while they decide their limit.",
      "text": "If they refuse, we should not risk the teachers salaries.",
      "es": "Si se niegan, no deberíamos arriesgar los salarios de los maestros.",
      "speaker": "dani",
      "cast": ["dani", "camila"],
      "lines": [
        {
          "speaker": "camila",
          "text": "He put the call on mute. Sixty days is better than ninety, but it still hurts our cash.",
          "es": "Puso la llamada en silencio. Sesenta días es mejor que noventa, pero aun así golpea nuestro efectivo."
        },
        {
          "speaker": "dani",
          "text": "If they refuse, we should not risk the teachers salaries.",
          "es": "Si se niegan, no deberíamos arriesgar los salarios de los maestros."
        },
        {
          "speaker": "camila",
          "text": "Then decide your limit now, Vale. Know the lowest offer you can accept before you speak again.",
          "es": "Entonces decide tu límite ahora, Vale. Conoce la oferta más baja que puedes aceptar antes de volver a hablar."
        }
      ],
      "words": [
        { "word": "refuse", "es": "negarse" },
        { "word": "risk", "es": "arriesgar" },
        { "word": "limit", "es": "límite" }
      ]
    },
    {
      "id": "s7",
      "image": s7,
      "imageAlt": "Camila advises Vale in the office while Vale prepares to return to the negotiation.",
      "text": "You must protect cash flow, but you should keep the conversation open.",
      "es": "Debes proteger el flujo de caja, pero deberías mantener abierta la conversación.",
      "speaker": "camila",
      "cast": ["camila", "vale"],
      "lines": [
        {
          "speaker": "vale",
          "text": "If I demand thirty days and he walks away, we lose the biggest contract of the year.",
          "es": "Si exijo treinta días y él se va, perdemos el contrato más grande del año."
        },
        {
          "speaker": "camila",
          "text": "You must protect cash flow, but you should keep the conversation open.",
          "es": "Debes proteger el flujo de caja, pero deberías mantener abierta la conversación."
        },
        {
          "speaker": "vale",
          "text": "So I say no to the clause, not to the client. That difference changes everything, thank you.",
          "es": "Entonces le digo que no a la cláusula, no al cliente. Esa diferencia lo cambia todo, gracias."
        }
      ],
      "words": [
        { "word": "demand", "es": "exigir" },
        { "word": "protect", "es": "proteger" },
        { "word": "client", "es": "cliente" }
      ]
    },
    {
      "id": "s8",
      "image": s8,
      "imageAlt": "Vale speaks calmly and directly to the camera during the hardest moment of the negotiation.",
      "text": "Mr. Reed, I am not rejecting the deal. I am asking for a workable deal.",
      "es": "Señor Reed, no estoy rechazando el trato. Estoy pidiendo un trato viable.",
      "speaker": "vale",
      "cast": ["vale", "reed"],
      "lines": [
        {
          "speaker": "vale",
          "text": "Mr. Reed, I am not rejecting the deal. I am asking for a workable deal.",
          "es": "Señor Reed, no estoy rechazando el trato. Estoy pidiendo un trato viable."
        },
        {
          "speaker": "reed",
          "text": "Explain it in numbers. Why should Northline change a clause it already uses in twelve countries?",
          "es": "Explíquelo con números. ¿Por qué debería Northline cambiar una cláusula que ya usa en doce países?"
        },
        {
          "speaker": "vale",
          "text": "Because a partner who cannot pay teachers cannot deliver classes. Faster payment protects your quality too.",
          "es": "Porque un socio que no puede pagar a sus maestros no puede dar clases. Un pago más rápido también protege su calidad."
        }
      ],
      "words": [
        { "word": "rejecting", "es": "rechazando" },
        { "word": "workable", "es": "viable" },
        { "word": "deliver", "es": "entregar / cumplir" }
      ]
    },
    {
      "id": "s9",
      "image": s9,
      "imageAlt": "Mr. Reed leans forward with a small nod of respect while Dani listens beside Vale.",
      "text": "You push back without making it personal. I respect that.",
      "es": "Usted se opone sin hacerlo personal. Respeto eso.",
      "speaker": "reed",
      "cast": ["reed", "vale", "dani"],
      "lines": [
        {
          "speaker": "reed",
          "text": "You push back without making it personal. I respect that.",
          "es": "Usted se opone sin hacerlo personal. Respeto eso."
        },
        {
          "speaker": "vale",
          "text": "Thank you. I want a long relationship with Northline, not one contract and a broken team.",
          "es": "Gracias. Quiero una relación larga con Northline, no un contrato y un equipo roto."
        },
        {
          "speaker": "reed",
          "text": "Then bring me one number and one condition. If both are reasonable, I will sign this deal today.",
          "es": "Entonces tráigame un número y una condición. Si ambos son razonables, firmaré este trato hoy."
        }
      ],
      "words": [
        { "word": "respect", "es": "respetar" },
        { "word": "relationship", "es": "relación" },
        { "word": "condition", "es": "condición" }
      ]
    },
    {
      "id": "s10",
      "image": s10,
      "imageAlt": "Vale and Camila write their two final conditions on the whiteboard before answering Mr. Reed.",
      "text": "Then let us use thirty days and automatic approval for reports.",
      "es": "Entonces usemos treinta días y aprobación automática para los informes.",
      "speaker": "vale",
      "cast": ["vale", "camila"],
      "lines": [
        {
          "speaker": "vale",
          "text": "Then let us use thirty days and automatic approval for reports.",
          "es": "Entonces usemos treinta días y aprobación automática para los informes."
        },
        {
          "speaker": "camila",
          "text": "And if a report arrives late, Northline still pays, and we correct the report within forty-eight hours.",
          "es": "Y si un informe llega tarde, Northline paga igual, y nosotros corregimos el informe en cuarenta y ocho horas."
        },
        {
          "speaker": "vale",
          "text": "That is fair for both sides. Mr. Reed, those are our two conditions, clearly written here.",
          "es": "Eso es justo para ambas partes. Señor Reed, esas son nuestras dos condiciones, escritas claramente aquí."
        }
      ],
      "words": [
        { "word": "automatic", "es": "automático" },
        { "word": "approval", "es": "aprobación" },
        { "word": "fair", "es": "justo" }
      ]
    },
    {
      "id": "s11",
      "image": s11,
      "imageAlt": "Mr. Reed accepts the terms on screen and announces the new launch date to Vale.",
      "text": "Agreed. Now tell your team: the launch date just moved forward.",
      "es": "De acuerdo. Ahora dígale a su equipo: la fecha de lanzamiento se adelantó.",
      "speaker": "reed",
      "cast": ["reed", "vale"],
      "lines": [
        {
          "speaker": "reed",
          "text": "My finance team accepts thirty days. You defended your school well, and your numbers support the request.",
          "es": "Mi equipo de finanzas acepta treinta días. Defendió bien su escuela, y sus números respaldan la petición."
        },
        {
          "speaker": "vale",
          "text": "Thank you. We will send the signed contract this afternoon and start planning the first classes.",
          "es": "Gracias. Enviaremos el contrato firmado esta tarde y empezaremos a planificar las primeras clases."
        },
        {
          "speaker": "reed",
          "text": "Agreed. Now tell your team: the launch date just moved forward.",
          "es": "De acuerdo. Ahora dígale a su equipo: la fecha de lanzamiento se adelantó."
        }
      ],
      "words": [
        { "word": "accepts", "es": "acepta" },
        { "word": "signed", "es": "firmado" },
        { "word": "launch", "es": "lanzamiento" }
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
          "label": "Read the fine print. They can delay payment if one report is late.",
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
          "label": "You must protect cash flow, but you should keep the conversation open.",
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
          "label": "Agreed. Now tell your team: the launch date just moved forward.",
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
      "sayIt": "Agreed. Now tell your team: the launch date just moved forward.",
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
      "phrase": "look over",
      "es": "revisar cuidadosamente",
      "kind": "phrasal",
      "example": "The payment clause says ninety days. We should look over every line before we sign.",
      "exampleEs": "La cláusula de pago dice noventa días. Deberíamos revisar cada línea antes de firmar."
    },
    {
      "phrase": "push back",
      "es": "oponerse / cuestionar",
      "kind": "phrasal",
      "example": "You should push back. A small school cannot finance a global company for three months.",
      "exampleEs": "Deberías oponerte. Una escuela pequeña no puede financiar una empresa global por tres meses."
    },
    {
      "phrase": "read the fine print",
      "es": "leer la letra pequeña",
      "kind": "idiom",
      "example": "Read the fine print. They can delay payment if one report is late.",
      "exampleEs": "Lee la letra pequeña. Pueden retrasar el pago si un informe llega tarde."
    }
  ],
  "finaleSeconds": 30,
  "continuePrompt": {
    "en": "Your turn, 30 seconds: explain the problem, compare the options, and defend your decision.",
    "es": "Tu turno, 30 segundos: explica el problema, compara las opciones y defiende tu decisión."
  },
  "continueWith": [
    "The main issue is ...",
    "If I were responsible, I would ...",
    "The best option is ... because ..."
  ],
  "cliffhanger": {
    "en": "Agreed. Now tell your team: the launch date just moved forward.",
    "es": "De acuerdo. Ahora dígale a su equipo: la fecha de lanzamiento se adelantó."
  }
};
