import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/sharks-ep14-losing-a-client/cover.jpg";
import s1 from "@/assets/storybook/sharks-ep14-losing-a-client/s1.jpg";
import s2 from "@/assets/storybook/sharks-ep14-losing-a-client/s2.jpg";
import s3 from "@/assets/storybook/sharks-ep14-losing-a-client/s3.jpg";
import s4 from "@/assets/storybook/sharks-ep14-losing-a-client/s4.jpg";
import s5 from "@/assets/storybook/sharks-ep14-losing-a-client/s5.jpg";
import s6 from "@/assets/storybook/sharks-ep14-losing-a-client/s6.jpg";
import s7 from "@/assets/storybook/sharks-ep14-losing-a-client/s7.jpg";
import s8 from "@/assets/storybook/sharks-ep14-losing-a-client/s8.jpg";
import s9 from "@/assets/storybook/sharks-ep14-losing-a-client/s9.jpg";
import s10 from "@/assets/storybook/sharks-ep14-losing-a-client/s10.jpg";
import s11 from "@/assets/storybook/sharks-ep14-losing-a-client/s11.jpg";

export const SHARKS_EP14_LOSING_A_CLIENT: StorybookEpisode = {
  "id": "sharks-ep14-losing-a-client",
  "moduleId": "sharks",
  "week": 3,
  "title": "Losing a client",
  "titleEs": "Perder un cliente",
  "episodeLabel": {
    "en": "Season 8 · Episode 14",
    "es": "Temporada 8 · Episodio 14"
  },
  "previously": [
    {
      "en": "Vale told Marco the truth, and he accepted the co-teaching plan.",
      "es": "Vale le dijo la verdad a Marco, y él aceptó el plan de co-enseñanza."
    },
    {
      "en": "Then an email arrived: the Northline office in San Miguel is cancelling its contract.",
      "es": "Entonces llegó un correo: la oficina de Northline en San Miguel está cancelando su contrato."
    }
  ],
  "reviewWords": [
    {
      "word": "contract",
      "es": "contrato"
    },
    {
      "word": "price",
      "es": "precio"
    },
    {
      "word": "feedback",
      "es": "comentarios"
    }
  ],
  "blurb": {
    "en": "A competitor offered half the price, and San Miguel is leaving. Vale's first real defeat becomes something else: thirty days, one free pilot month, and a promise to listen before arguing.",
    "es": "Un competidor ofreció la mitad del precio, y San Miguel se va. La primera derrota real de Vale se convierte en otra cosa: treinta días, un mes piloto gratis y la promesa de escuchar antes de discutir."
  },
  "cover": cover,
  "voice": "girl",
  "scenes": [
    {
      "id": "s1",
      "image": s1,
      "imageAlt": "Camila reads the short cancellation email out loud at the office.",
      "text": "The email is short: thirty days' notice, thank you for everything, decision already made.",
      "es": "El correo es corto: treinta días de aviso, gracias por todo, decisión ya tomada.",
      "speaker": "camila",
      "cast": ["camila", "vale"],
      "lines": [
        {
          "speaker": "camila",
          "text": "The email is short: thirty days' notice, thank you for everything, decision already made.",
          "es": "El correo es corto: treinta días de aviso, gracias por todo, decisión ya tomada."
        },
        {
          "speaker": "vale",
          "text": "Thirty days. After eight months of classes. Did they give a reason, Camila?",
          "es": "Treinta días. Después de ocho meses de clases. ¿Dieron una razón, Camila?"
        },
        {
          "speaker": "camila",
          "text": "A competitor offered them half our price. Their message says the decision is financial.",
          "es": "Un competidor les ofreció la mitad de nuestro precio. Su mensaje dice que la decisión es financiera."
        }
      ],
      "words": [
        { "word": "notice", "es": "aviso" },
        { "word": "reason", "es": "razón" },
        { "word": "financial", "es": "financiera" }
      ]
    },
    {
      "id": "s2",
      "image": s2,
      "imageAlt": "Dani calculates what matching the competitor's price would mean for salaries.",
      "text": "Half our price. We cannot match that without cutting teacher salaries in half too.",
      "es": "La mitad de nuestro precio. No podemos igualar eso sin cortar los salarios de los maestros a la mitad también.",
      "speaker": "dani",
      "cast": ["dani", "vale"],
      "lines": [
        {
          "speaker": "dani",
          "text": "Half our price. We cannot match that without cutting teacher salaries in half too.",
          "es": "La mitad de nuestro precio. No podemos igualar eso sin cortar los salarios de los maestros a la mitad también."
        },
        {
          "speaker": "vale",
          "text": "Then we do not match it. Nobody wins a race to the bottom, Dani.",
          "es": "Entonces no lo igualamos. Nadie gana una carrera hacia el fondo, Dani."
        },
        {
          "speaker": "dani",
          "text": "So we just accept it? That branch is eleven percent of our revenue, Vale.",
          "es": "¿Así que solo lo aceptamos? Esa sucursal es once por ciento de nuestros ingresos, Vale."
        }
      ],
      "words": [
        { "word": "match", "es": "igualar (precio)" },
        { "word": "branch", "es": "sucursal" },
        { "word": "revenue", "es": "ingresos" }
      ]
    },
    {
      "id": "s3",
      "image": s3,
      "imageAlt": "Mr. Reed appears on the video call from Houston to talk about San Miguel.",
      "text": "Vale, I am calling about San Miguel. I am disappointed, and I want you to hear it from me.",
      "es": "Vale, llamo por lo de San Miguel. Estoy decepcionado, y quiero que lo escuche de mí.",
      "speaker": "reed",
      "cast": ["reed", "vale"],
      "lines": [
        {
          "speaker": "reed",
          "text": "Vale, I am calling about San Miguel. I am disappointed, and I want you to hear it from me.",
          "es": "Vale, llamo por lo de San Miguel. Estoy decepcionado, y quiero que lo escuche de mí."
        },
        {
          "speaker": "vale",
          "text": "I appreciate that, Mr. Reed. Was it only the price, or did we fail you somewhere?",
          "es": "Se lo agradezco, señor Reed. ¿Fue solo el precio, o le fallamos en algo?"
        },
        {
          "speaker": "reed",
          "text": "Two complaints about teacher changes, then the feedback in the survey dropped. Price was the excuse.",
          "es": "Dos quejas por cambios de maestro, luego bajaron los comentarios en la encuesta. El precio fue la excusa."
        }
      ],
      "words": [
        { "word": "disappointed", "es": "decepcionado" },
        { "word": "complaints", "es": "quejas" },
        { "word": "survey", "es": "encuesta" }
      ]
    },
    {
      "id": "s4",
      "image": s4,
      "imageAlt": "Vale listens calmly instead of arguing, which surprises Mr. Reed.",
      "text": "So the competitor did not beat us. We gave them the door, and they just walked through it.",
      "es": "Así que el competidor no nos ganó. Nosotros les dejamos la puerta abierta, y ellos solo entraron.",
      "speaker": "vale",
      "cast": ["vale", "reed"],
      "lines": [
        {
          "speaker": "vale",
          "text": "So the competitor did not beat us. We gave them the door, and they just walked through it.",
          "es": "Así que el competidor no nos ganó. Nosotros les dejamos la puerta abierta, y ellos solo entraron."
        },
        {
          "speaker": "reed",
          "text": "That is honest. Most schools argue with me. You are listening instead.",
          "es": "Eso es honesto. La mayoría de las escuelas discute conmigo. Usted está escuchando."
        },
        {
          "speaker": "vale",
          "text": "Listening is free, Mr. Reed. Learning from it costs a little more, but we will pay.",
          "es": "Escuchar es gratis, señor Reed. Aprender de ello cuesta un poco más, pero pagaremos."
        }
      ],
      "words": [
        { "word": "beat", "es": "vencer / ganar" },
        { "word": "argue", "es": "discutir" },
        { "word": "listening", "es": "escuchando" }
      ]
    },
    {
      "id": "s5",
      "image": s5,
      "imageAlt": "Mr. Reed explains that the cancellation is already signed.",
      "text": "The cancellation is signed, Vale. I cannot reverse it from Houston today.",
      "es": "La cancelación está firmada, Vale. No puedo revertirla desde Houston hoy.",
      "speaker": "reed",
      "cast": ["reed", "vale"],
      "lines": [
        {
          "speaker": "reed",
          "text": "The cancellation is signed, Vale. I cannot reverse it from Houston today.",
          "es": "La cancelación está firmada, Vale. No puedo revertirla desde Houston hoy."
        },
        {
          "speaker": "vale",
          "text": "I am not asking you to reverse it. I am asking for thirty days to show you something.",
          "es": "No le pido que la revierta. Le pido treinta días para mostrarle algo."
        },
        {
          "speaker": "reed",
          "text": "Show me what? The contract ends either way.",
          "es": "¿Mostrarme qué? El contrato termina de cualquier manera."
        }
      ],
      "words": [
        { "word": "cancellation", "es": "cancelación" },
        { "word": "reverse", "es": "revertir" },
        { "word": "either way", "es": "de cualquier manera" }
      ]
    },
    {
      "id": "s6",
      "image": s6,
      "imageAlt": "Vale offers a free pilot month while Reed raises an eyebrow on screen.",
      "text": "Show you that your San Miguel team still learns better with us. One pilot month, our cost.",
      "es": "Mostrarle que su equipo de San Miguel aún aprende mejor con nosotros. Un mes piloto, a nuestro costo.",
      "speaker": "vale",
      "cast": ["vale", "reed"],
      "lines": [
        {
          "speaker": "vale",
          "text": "Show you that your San Miguel team still learns better with us. One pilot month, our cost.",
          "es": "Mostrarle que su equipo de San Miguel aún aprende mejor con nosotros. Un mes piloto, a nuestro costo."
        },
        {
          "speaker": "reed",
          "text": "You would teach for free for a month? That is either confidence or madness.",
          "es": "¿Enseñaría gratis por un mes? Eso es confianza o locura."
        },
        {
          "speaker": "vale",
          "text": "It is satisfaction insurance, Mr. Reed. If they are not happier, we leave quietly.",
          "es": "Es un seguro de satisfacción, señor Reed. Si no están más contentos, nos vamos en silencio."
        }
      ],
      "words": [
        { "word": "pilot", "es": "piloto / de prueba" },
        { "word": "madness", "es": "locura" },
        { "word": "satisfaction", "es": "satisfacción" }
      ]
    },
    {
      "id": "s7",
      "image": s7,
      "imageAlt": "Mr. Reed gives Vale thirty days and one serious warning.",
      "text": "You have your thirty days. Do not make me regret this unusual decision.",
      "es": "Tiene sus treinta días. No haga que me arrepienta de esta decisión inusual.",
      "speaker": "reed",
      "cast": ["reed", "vale"],
      "lines": [
        {
          "speaker": "reed",
          "text": "You have your thirty days. Do not make me regret this unusual decision.",
          "es": "Tiene sus treinta días. No haga que me arrepienta de esta decisión inusual."
        },
        {
          "speaker": "vale",
          "text": "You will not regret it. And thank you for telling me the real reasons today.",
          "es": "No se arrepentirá. Y gracias por decirme las razones reales hoy."
        },
        {
          "speaker": "reed",
          "text": "Consider this your wake-up call, Vale. Quality kept you here; never forget that.",
          "es": "Considere esto su llamado de atención, Vale. La calidad la mantuvo aquí; nunca lo olvide."
        }
      ],
      "words": [
        { "word": "regret", "es": "arrepentirse" },
        { "word": "unusual", "es": "inusual" },
        { "word": "wake-up call", "es": "llamado de atención" }
      ]
    },
    {
      "id": "s8",
      "image": s8,
      "imageAlt": "Dani and Camila react to the cost of a free month after the call ends.",
      "text": "This is not a fight. It is a follow up. We listen, we fix, and then we show results.",
      "es": "Esto no es una pelea. Es un seguimiento. Escuchamos, arreglamos y luego mostramos resultados.",
      "speaker": "vale",
      "cast": ["dani", "camila", "vale"],
      "lines": [
        {
          "speaker": "dani",
          "text": "A free month. Camila is going to need another spreadsheet for this.",
          "es": "Un mes gratis. Camila va a necesitar otra hoja de cálculo para esto."
        },
        {
          "speaker": "camila",
          "text": "Already calculating. It hurts, but pulling out without a fight hurts more.",
          "es": "Ya estoy calculando. Duele, pero retirarse sin pelear duele más."
        },
        {
          "speaker": "vale",
          "text": "This is not a fight. It is a follow up. We listen, we fix, and then we show results.",
          "es": "Esto no es una pelea. Es un seguimiento. Escuchamos, arreglamos y luego mostramos resultados."
        }
      ],
      "words": [
        { "word": "calculating", "es": "calculando" },
        { "word": "pulling out", "es": "retirarse" },
        { "word": "results", "es": "resultados" }
      ]
    },
    {
      "id": "s9",
      "image": s9,
      "imageAlt": "Dani summarizes the heavy week while locking the office door.",
      "text": "Heavy weeks build strong companies, Dani. Easy weeks only build comfortable ones.",
      "es": "Las semanas pesadas construyen empresas fuertes, Dani. Las semanas fáciles solo construyen empresas cómodas.",
      "speaker": "vale",
      "cast": ["dani", "vale"],
      "lines": [
        {
          "speaker": "dani",
          "text": "The unhappy parents in Guatemala, the hard talk with Marco, and now San Miguel. Heavy week.",
          "es": "Los padres molestos en Guatemala, la charla difícil con Marco, y ahora San Miguel. Semana pesada."
        },
        {
          "speaker": "vale",
          "text": "Heavy weeks build strong companies, Dani. Easy weeks only build comfortable ones.",
          "es": "Las semanas pesadas construyen empresas fuertes, Dani. Las semanas fáciles solo construyen empresas cómodas."
        },
        {
          "speaker": "dani",
          "text": "Comfortable sounds nice right now, I am not going to lie.",
          "es": "Cómodo suena bonito ahorita, no voy a mentir."
        }
      ],
      "words": [
        { "word": "unhappy", "es": "molestos / insatisfechos" },
        { "word": "heavy", "es": "pesada / dura" },
        { "word": "comfortable", "es": "cómodas" }
      ]
    },
    {
      "id": "s10",
      "image": s10,
      "imageAlt": "Camila asks the practical question while preparing the attendance dashboard at night.",
      "text": "I go. A client this big deserves to see my face, not another email.",
      "es": "Voy yo. Un cliente así de grande merece ver mi cara, no otro correo.",
      "speaker": "vale",
      "cast": ["camila", "vale"],
      "lines": [
        {
          "speaker": "camila",
          "text": "Practical question: who goes to San Miguel? It is three hours away by car.",
          "es": "Pregunta práctica: ¿quién va a San Miguel? Está a tres horas en carro."
        },
        {
          "speaker": "vale",
          "text": "I go. A client this big deserves to see my face, not another email.",
          "es": "Voy yo. Un cliente así de grande merece ver mi cara, no otro correo."
        },
        {
          "speaker": "camila",
          "text": "Then I am preparing the attendance dashboard tonight. You will need proof, not promises.",
          "es": "Entonces preparo el panel de asistencia esta noche. Necesitarás pruebas, no promesas."
        }
      ],
      "words": [
        { "word": "deserves", "es": "merece" },
        { "word": "dashboard", "es": "panel de datos" },
        { "word": "proof", "es": "pruebas" }
      ]
    },
    {
      "id": "s11",
      "image": s11,
      "imageAlt": "Vale and Dani pack boxes of class materials for the trip to San Miguel.",
      "text": "Pack the materials. Tomorrow we win back San Miguel, one class at a time.",
      "es": "Empaca los materiales. Mañana recuperamos San Miguel, una clase a la vez.",
      "speaker": "vale",
      "cast": ["dani", "vale"],
      "lines": [
        {
          "speaker": "dani",
          "text": "What if we do everything right and they still leave?",
          "es": "¿Y si hacemos todo bien y aun así se van?"
        },
        {
          "speaker": "vale",
          "text": "Then we leave better than we arrived. But they will not leave, Dani.",
          "es": "Entonces nos iremos mejores de lo que llegamos. Pero no se van a ir, Dani."
        },
        {
          "speaker": "vale",
          "text": "Pack the materials. Tomorrow we win back San Miguel, one class at a time.",
          "es": "Empaca los materiales. Mañana recuperamos San Miguel, una clase a la vez."
        }
      ],
      "words": [
        { "word": "materials", "es": "materiales" },
        { "word": "win back", "es": "recuperar / reconquistar" },
        { "word": "one at a time", "es": "uno a la vez" }
      ]
    }
  ],
  "quizzes": [
    {
      "id": "q1",
      "afterScene": "s3",
      "questionEn": "Why did the San Miguel office really cancel?",
      "questionEs": "¿Por qué canceló realmente la oficina de San Miguel?",
      "options": [
        {
          "label": "Complaints and low survey scores made the cheap offer attractive.",
          "emoji": "📉"
        },
        {
          "label": "They moved their office to another country.",
          "emoji": "🌎"
        },
        {
          "label": "They closed the whole company.",
          "emoji": "🏚️"
        }
      ],
      "answer": 0,
      "sayIt": "They should listen first and fix the real problem.",
      "sayItEs": "Ejemplo: «They should listen first and fix the real problem.»",
      "sayItAskEn": "How should a business react when a client leaves?",
      "sayItAskEs": "¿Cómo debería reaccionar un negocio cuando un cliente se va?",
      "sayItCheck": {
        "target": "They should *",
        "altTargets": [
          "They should listen and *",
          "First, they should *"
        ]
      }
    },
    {
      "id": "q2",
      "afterScene": "s7",
      "questionEn": "What does Vale ask Mr. Reed for?",
      "questionEs": "¿Qué le pide Vale al señor Reed?",
      "options": [
        {
          "label": "Thirty days and a free pilot month to prove the quality.",
          "emoji": "🗓️"
        },
        {
          "label": "More money for the same classes.",
          "emoji": "💰"
        },
        {
          "label": "A cheaper competitor's phone number.",
          "emoji": "📇"
        }
      ],
      "answer": 0,
      "sayIt": "I would offer a free month because proof beats promises.",
      "sayItEs": "Ejemplo: «I would offer a free month because proof beats promises.»",
      "sayItAskEn": "Would you offer a free month to save a client? Why?",
      "sayItAskEs": "¿Ofrecerías un mes gratis para salvar un cliente? ¿Por qué?",
      "sayItCheck": {
        "target": "I would * because *",
        "altTargets": [
          "Yes, because *",
          "No, because *"
        ]
      }
    },
    {
      "id": "q3",
      "afterScene": "s11",
      "questionEn": "What will Vale do next?",
      "questionEs": "¿Qué hará Vale a continuación?",
      "options": [
        {
          "label": "Travel to San Miguel in person to win the client back.",
          "emoji": "🚗"
        },
        {
          "label": "Send an email and wait at home.",
          "emoji": "📧"
        },
        {
          "label": "Close the San Miguel classes forever.",
          "emoji": "🔒"
        }
      ],
      "answer": 0,
      "sayIt": "Vale listened, offered a free pilot month, and decided to go in person.",
      "sayItEs": "Ejemplo: «Vale listened, offered a free pilot month, and decided to go in person.»",
      "sayItAskEn": "Summarize how Vale responded to losing the client.",
      "sayItAskEs": "Resume cómo respondió Vale a perder el cliente.",
      "sayItCheck": {
        "target": "Vale listened, offered *, and *",
        "altTargets": [
          "She * and then *",
          "Vale decided to *"
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
    "modelActionEs": "Vale escucha las razones reales del cliente antes de defender su trabajo."
  },
  "expressions": [
    {
      "phrase": "pull out",
      "variants": ["pulling out"],
      "es": "retirarse / salirse",
      "kind": "phrasal",
      "example": "Already calculating. It hurts, but pulling out without a fight hurts more.",
      "exampleEs": "Ya estoy calculando. Duele, pero retirarse sin pelear duele más."
    },
    {
      "phrase": "follow up",
      "es": "dar seguimiento",
      "kind": "phrasal",
      "example": "This is not a fight. It is a follow up. We listen, we fix, and then we show results.",
      "exampleEs": "Esto no es una pelea. Es un seguimiento. Escuchamos, arreglamos y luego mostramos resultados."
    },
    {
      "phrase": "a wake-up call",
      "variants": ["your wake-up call"],
      "es": "un llamado de atención",
      "kind": "idiom",
      "example": "Consider this your wake-up call, Vale. Quality kept you here; never forget that.",
      "exampleEs": "Considere esto su llamado de atención, Vale. La calidad la mantuvo aquí; nunca lo olvide."
    }
  ],
  "finaleSeconds": 30,
  "continuePrompt": {
    "en": "Your turn, 30 seconds: explain why San Miguel cancelled and what Vale decided to do about it.",
    "es": "Tu turno, 30 segundos: explica por qué canceló San Miguel y qué decidió hacer Vale."
  },
  "continueWith": [
    "The client cancelled because ...",
    "Vale asked for ...",
    "Tomorrow she is going to ..."
  ],
  "cliffhanger": {
    "en": "Pack the materials. Tomorrow we win back San Miguel, one class at a time.",
    "es": "Empaca los materiales. Mañana recuperamos San Miguel, una clase a la vez."
  }
};
