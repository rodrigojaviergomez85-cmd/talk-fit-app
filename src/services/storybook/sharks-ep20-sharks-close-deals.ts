import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/sharks-ep20-sharks-close-deals/cover.jpg";
import s1 from "@/assets/storybook/sharks-ep20-sharks-close-deals/s1.jpg";
import s2 from "@/assets/storybook/sharks-ep20-sharks-close-deals/s2.jpg";
import s3 from "@/assets/storybook/sharks-ep20-sharks-close-deals/s3.jpg";
import s4 from "@/assets/storybook/sharks-ep20-sharks-close-deals/s4.jpg";
import s5 from "@/assets/storybook/sharks-ep20-sharks-close-deals/s5.jpg";
import s6 from "@/assets/storybook/sharks-ep20-sharks-close-deals/s6.jpg";
import s7 from "@/assets/storybook/sharks-ep20-sharks-close-deals/s7.jpg";
import s8 from "@/assets/storybook/sharks-ep20-sharks-close-deals/s8.jpg";
import s9 from "@/assets/storybook/sharks-ep20-sharks-close-deals/s9.jpg";
import s10 from "@/assets/storybook/sharks-ep20-sharks-close-deals/s10.jpg";
import s11 from "@/assets/storybook/sharks-ep20-sharks-close-deals/s11.jpg";

export const SHARKS_EP20_SHARKS_CLOSE_DEALS: StorybookEpisode = {
  "id": "sharks-ep20-sharks-close-deals",
  "moduleId": "sharks",
  "week": 4,
  "title": "Sharks close deals",
  "titleEs": "Los tiburones cierran tratos",
  "episodeLabel": {
    "en": "Season 8 · Episode 20 · Season Finale",
    "es": "Temporada 8 · Episodio 20 · Final de temporada"
  },
  "previously": [
    {
      "en": "A leak claimed Vale sold the whole academy to Mr. Reed before the Mexico deal was even signed.",
      "es": "Una filtración afirmó que Vale vendió toda la academia al señor Reed antes de firmar el acuerdo de México."
    },
    {
      "en": "Vale postponed the signing rather than sign next to false headlines.",
      "es": "Vale pospuso la firma en lugar de firmar junto a titulares falsos."
    }
  ],
  "reviewWords": [
    { "word": "deal", "es": "trato" },
    { "word": "growth", "es": "crecimiento" },
    { "word": "team", "es": "equipo" },
    { "word": "reputation", "es": "reputación" },
    { "word": "trained", "es": "capacitado" }
  ],
  "blurb": {
    "en": "One year ago, eight chairs and a rumor to fix. Today: Mexico signed, Dani steps up, and an international program is watching.",
    "es": "Hace un año, ocho sillas y un rumor que arreglar. Hoy: México firmado, Dani da un paso al frente, y un programa internacional está observando."
  },
  "cover": cover,
  "voice": "girl",
  "scenes": [
    {
      "id": "s1",
      "image": s1,
      "imageAlt": "Reporters push microphones toward Vale outside the academy while Renata and Camila stand beside her.",
      "text": "Miss Vale, did you or did you not sign an agreement with Reed?",
      "es": "Señorita Vale, ¿firmó o no un acuerdo con Reed?",
      "speaker": "narrator",
      "cast": ["vale", "renata", "camila"],
      "lines": [
        {
          "speaker": "narrator",
          "text": "Miss Vale, did you or did you not sign an agreement with Reed?",
          "es": "Señorita Vale, ¿firmó o no un acuerdo con Reed?"
        },
        {
          "speaker": "vale",
          "text": "I will confirm three things. First, yes, we are talking with Mr. Reed about an investment. Second, it is not signed yet.",
          "es": "Les confirmo tres cosas. Primera: sí, estamos conversando con el señor Reed sobre una inversión. Segunda: aún no está firmada."
        },
        {
          "speaker": "vale",
          "text": "Third, the Mexico agreement is only with Mexico, and it covers a clear phased plan for Renata's affiliated schools. It does not include Guatemala or a full buyout of our academy.",
          "es": "Tercera: el acuerdo con México solo es con México, y cubre un plan por etapas claro para las escuelas afiliadas de Renata. No incluye Guatemala ni una compra total de nuestra academia."
        }
      ],
      "words": [
        { "word": "confirm", "es": "confirmar" },
        { "word": "agreement", "es": "acuerdo" },
        { "word": "buyout", "es": "compra total" }
      ]
    },
    {
      "id": "s2",
      "image": s2,
      "imageAlt": "Vale answers a reporter's question calmly while Renata nods beside her in front of the academy.",
      "text": "Why did you cancel today's signing?",
      "es": "¿Por qué canceló la firma de hoy?",
      "speaker": "narrator",
      "cast": ["vale", "renata"],
      "lines": [
        {
          "speaker": "narrator",
          "text": "Why did you cancel today's signing?",
          "es": "¿Por qué canceló la firma de hoy?"
        },
        {
          "speaker": "vale",
          "text": "I did not cancel, I postponed. Signing while false information is public would be irresponsible.",
          "es": "No cancelé, pospuse. Firmar mientras hay información falsa en público sería irresponsable."
        },
        {
          "speaker": "renata",
          "text": "I support that decision. Our reputation is worth more than a date on a contract.",
          "es": "Yo apoyo esa decisión. Nuestra reputación vale más que una fecha en un contrato."
        }
      ],
      "words": [
        { "word": "postpone", "es": "posponer" },
        { "word": "irresponsible", "es": "irresponsable" },
        { "word": "support", "es": "apoyar" }
      ]
    },
    {
      "id": "s3",
      "image": s3,
      "imageAlt": "Camila closes her laptop with confidence while Vale and Renata listen in the academy hallway.",
      "text": "And when we sign, it will be with real numbers, not headlines.",
      "es": "Y cuando firmemos, será con cifras reales, no con titulares.",
      "speaker": "camila",
      "cast": ["camila", "vale", "renata"],
      "lines": [
        {
          "speaker": "camila",
          "text": "And when we sign, it will be with real numbers, not headlines.",
          "es": "Y cuando firmemos, será con cifras reales, no con titulares."
        },
        {
          "speaker": "vale",
          "text": "That is exactly it. Confidence comes from proof, not from a press release.",
          "es": "Exactamente. La confianza viene de las pruebas, no de un comunicado de prensa."
        },
        {
          "speaker": "renata",
          "text": "So let us finish this the right way. Are you ready to sign, Vale?",
          "es": "Entonces terminemos esto de la manera correcta. ¿Estás lista para firmar, Vale?"
        }
      ],
      "words": [
        { "word": "headlines", "es": "titulares" },
        { "word": "proof", "es": "prueba" },
        { "word": "confidence", "es": "confianza" }
      ]
    },
    {
      "id": "s4",
      "image": s4,
      "imageAlt": "Vale and Renata sign the Mexico contract together at a table with Camila watching and smiling.",
      "text": "Ready. But I want it on record: this is not the end, it is the first measurable step.",
      "es": "Lista. Pero quiero que quede grabado: este no es el final, es el primer paso medible.",
      "speaker": "vale",
      "cast": ["vale", "renata", "camila"],
      "lines": [
        {
          "speaker": "renata",
          "text": "Now that everything is clear, I am ready. And you, Vale?",
          "es": "Ahora que todo está claro, estoy lista. ¿Y tú, Vale?"
        },
        {
          "speaker": "vale",
          "text": "Ready. But I want it on record: this is not the end, it is the first measurable step.",
          "es": "Lista. Pero quiero que quede grabado: este no es el final, es el primer paso medible."
        },
        {
          "speaker": "renata",
          "text": "Twenty groups in September, forty in January. You train the teachers, I take care of the schools. This regional deal is signed.",
          "es": "Veinte grupos en septiembre, cuarenta en enero. Tú entrenas a los maestros, yo cuido las escuelas. Este acuerdo regional está firmado."
        }
      ],
      "words": [
        { "word": "on record", "es": "que quede constancia" },
        { "word": "measurable", "es": "medible" },
        { "word": "step", "es": "paso" }
      ]
    },
    {
      "id": "s5",
      "image": s5,
      "imageAlt": "Vale speaks with Dani in the academy office, offering him a folder about Mexico and Guatemala operations.",
      "text": "Dani, I want you to be the operation lead supporting Mexico and Guatemala from the academy.",
      "es": "Dani, quiero que seas el operation lead de apoyo a México y Guatemala desde la academia.",
      "speaker": "vale",
      "cast": ["vale", "dani"],
      "lines": [
        {
          "speaker": "vale",
          "text": "Dani, I want you to be the operation lead supporting Mexico and Guatemala from the academy.",
          "es": "Dani, quiero que seas el operation lead de apoyo a México y Guatemala desde la academia."
        },
        {
          "speaker": "dani",
          "text": "Me? Vale, that is a lot of responsibility for one person.",
          "es": "¿Yo? Vale, eso es mucha responsabilidad para una persona."
        },
        {
          "speaker": "vale",
          "text": "Yes, you. You already coordinated the Guatemala crisis. You know how to listen, delegate, talk to our providers, and ask for help.",
          "es": "Sí, tú. Ya coordinaste la crisis de Guatemala. Sabes escuchar, delegar, hablar con nuestros proveedores y pedir ayuda."
        }
      ],
      "words": [
        { "word": "operation", "es": "operación" },
        { "word": "responsibility", "es": "responsabilidad" },
        { "word": "delegate", "es": "delegar" }
      ]
    },
    {
      "id": "s6",
      "image": s6,
      "imageAlt": "Dani sits across from Vale, thoughtful, holding the folder while explaining his decision.",
      "text": "I accept. But I want to stay close to the classroom, the teachers, and the families.",
      "es": "Acepto. Pero quiero seguir cerca del salón de clases, los maestros y las familias.",
      "speaker": "dani",
      "cast": ["dani", "vale"],
      "lines": [
        {
          "speaker": "dani",
          "text": "I accept. But I want to stay close to the classroom, the teachers, and the families.",
          "es": "Acepto. Pero quiero seguir cerca del salón de clases, los maestros y las familias."
        },
        {
          "speaker": "vale",
          "text": "Why does that matter so much to you?",
          "es": "¿Por qué te importa tanto eso?"
        },
        {
          "speaker": "dani",
          "text": "Because working with them made me see that public service matters. I do not know if I will ever go into politics, but I want to help my community somehow.",
          "es": "Porque trabajar con ellos me hizo ver que el servicio público importa. No sé si algún día entre a política, pero quiero ayudar a mi comunidad de alguna forma."
        }
      ],
      "words": [
        { "word": "public service", "es": "servicio público" },
        { "word": "community", "es": "comunidad" },
        { "word": "matter", "es": "importar" }
      ]
    },
    {
      "id": "s7",
      "image": s7,
      "imageAlt": "Vale places a hand on Dani's shoulder in the office, reassuring him about his new role.",
      "text": "That does not take you out of the academy. It makes you more valuable here.",
      "es": "Eso no te saca de la academia. Te hace más valioso aquí.",
      "speaker": "vale",
      "cast": ["vale", "dani"],
      "lines": [
        {
          "speaker": "vale",
          "text": "That does not take you out of the academy. It makes you more valuable here.",
          "es": "Eso no te saca de la academia. Te hace más valioso aquí."
        },
        {
          "speaker": "dani",
          "text": "So I can take on this operation and still keep growing toward that other dream someday.",
          "es": "Entonces puedo asumir esta operación y seguir creciendo hacia ese otro sueño algún día."
        },
        {
          "speaker": "vale",
          "text": "Exactly. A career and a purpose can grow together, Dani.",
          "es": "Exacto. Una carrera y un propósito pueden crecer juntos, Dani."
        }
      ],
      "words": [
        { "word": "valuable", "es": "valioso" },
        { "word": "purpose", "es": "propósito" },
        { "word": "career", "es": "carrera" }
      ]
    },
    {
      "id": "s8",
      "image": s8,
      "imageAlt": "Mr. Reed speaks to Vale on a video call in the office, congratulating her on handling the leak.",
      "text": "Vale, you handled the leak like a top executive. My investment stays and goes up thirty percent.",
      "es": "Vale, manejó la filtración como una ejecutiva de primera. Mi inversión se mantiene y sube un treinta por ciento.",
      "speaker": "reed",
      "cast": ["reed", "vale"],
      "lines": [
        {
          "speaker": "reed",
          "text": "Vale, you handled the leak like a top executive. My investment stays and goes up thirty percent.",
          "es": "Vale, manejó la filtración como una ejecutiva de primera. Mi inversión se mantiene y sube un treinta por ciento."
        },
        {
          "speaker": "vale",
          "text": "Thank you, Mr. Reed. But the question is: with what conditions?",
          "es": "Gracias, señor Reed. Pero la pregunta es: ¿con qué condiciones?"
        },
        {
          "speaker": "reed",
          "text": "The same ones you asked for: a seat on the board, no veto over pedagogy. But there is something more.",
          "es": "Las mismas que usted pidió: un asiento en la junta, sin veto sobre pedagogía. Pero hay algo más."
        }
      ],
      "words": [
        { "word": "executive", "es": "ejecutiva" },
        { "word": "conditions", "es": "condiciones" },
        { "word": "seat on the board", "es": "asiento en la junta" }
      ]
    },
    {
      "id": "s9",
      "image": s9,
      "imageAlt": "Vale leans toward the video call screen, intrigued, as Mr. Reed explains the international program.",
      "text": "There is an international program looking for scalable educational models. I want you to present the academy to them.",
      "es": "Hay un programa internacional que busca modelos educativos escalables. Quiero que usted presente la academia ante ellos.",
      "speaker": "reed",
      "cast": ["reed", "vale"],
      "lines": [
        {
          "speaker": "reed",
          "text": "There is an international program looking for scalable educational models. I want you to present the academy to them.",
          "es": "Hay un programa internacional que busca modelos educativos escalables. Quiero que usted presente la academia ante ellos."
        },
        {
          "speaker": "vale",
          "text": "International? In what sense, exactly?",
          "es": "¿Internacional? ¿En qué sentido, exactamente?"
        },
        {
          "speaker": "reed",
          "text": "It is not a guaranteed expansion, it is a competition. If you win, you receive support to test your model in another country.",
          "es": "No es una expansión garantizada, es una competencia. Si gana, recibe apoyo para probar su modelo en otro país."
        }
      ],
      "words": [
        { "word": "scalable", "es": "escalable" },
        { "word": "competition", "es": "competencia" },
        { "word": "expansion", "es": "expansión" }
      ]
    },
    {
      "id": "s10",
      "image": s10,
      "imageAlt": "Vale stands tall, determined, closing her laptop after the call with Mr. Reed as Camila and Dani watch.",
      "text": "Then we have to earn it. They are not giving it to us.",
      "es": "Entonces tenemos que ganárnoslo. No me lo regalan.",
      "speaker": "vale",
      "cast": ["vale", "camila", "dani"],
      "lines": [
        {
          "speaker": "vale",
          "text": "Then we have to earn it. They are not giving it to us.",
          "es": "Entonces tenemos que ganárnoslo. No me lo regalan."
        },
        {
          "speaker": "camila",
          "text": "We have determination, real results, strong student retention, and a legacy of trained teachers. That achievement is a strong start.",
          "es": "Tenemos determinación, resultados reales, buena retención de estudiantes y un legado de maestros capacitados. Ese logro es un buen comienzo."
        },
        {
          "speaker": "dani",
          "text": "Let us wrap up today's work, then. Tomorrow we start preparing that presentation.",
          "es": "Cerremos el trabajo de hoy, entonces. Mañana empezamos a preparar esa presentación."
        }
      ],
      "words": [
        { "word": "earn", "es": "ganarse" },
        { "word": "determination", "es": "determinación" },
        { "word": "legacy", "es": "legado" }
      ]
    },
    {
      "id": "s11",
      "image": s11,
      "imageAlt": "Vale, Dani and Camila stand together outside the academy at dusk, looking forward with hope.",
      "text": "Ready? This does not end with Mexico or with two signed contracts. It begins with a global opportunity we have to earn.",
      "es": "¿Listos? Esto no termina con México ni con dos contratos firmados. Empieza con una oportunidad global que tenemos que ganar.",
      "speaker": "vale",
      "cast": ["vale", "dani", "camila"],
      "lines": [
        {
          "speaker": "vale",
          "text": "Ready? This does not end with Mexico or with two signed contracts. It begins with a global opportunity we have to earn.",
          "es": "¿Listos? Esto no termina con México ni con dos contratos firmados. Empieza con una oportunidad global que tenemos que ganar."
        },
        {
          "speaker": "dani",
          "text": "I am with you. And this time I know exactly what my role is.",
          "es": "Yo estoy contigo. Y esta vez sé exactamente cuál es mi papel."
        },
        {
          "speaker": "camila",
          "text": "Me too. But first we sleep, because the sky is the limit only if we build carefully.",
          "es": "Yo también. Pero primero dormimos, porque el cielo es el límite solo si construimos con cuidado."
        }
      ],
      "words": [
        { "word": "opportunity", "es": "oportunidad" },
        { "word": "role", "es": "papel" },
        { "word": "carefully", "es": "con cuidado" }
      ]
    }
  ],
  "quizzes": [
    {
      "id": "q1",
      "afterScene": "s2",
      "questionEn": "Why does Vale postpone the signing?",
      "questionEs": "¿Por qué pospone Vale la firma?",
      "options": [
        {
          "label": "Because false information was public and signing then would be irresponsible.",
          "emoji": "🎯"
        },
        {
          "label": "Because she does not trust Renata.",
          "emoji": "🚫"
        },
        {
          "label": "Because Mr. Reed asked her to cancel.",
          "emoji": "❓"
        }
      ],
      "answer": 0,
      "sayIt": "She postponed it because false information was public.",
      "sayItEs": "Ejemplo: «She postponed it because false information was public.»",
      "sayItAskEn": "Have you ever postponed something to protect your reputation? What happened?",
      "sayItAskEs": "¿Alguna vez pospusiste algo para proteger tu reputación? ¿Qué pasó?",
      "sayItCheck": {
        "target": "I postponed * because *",
        "altTargets": [
          "Yes, I postponed *",
          "I waited because *"
        ]
      }
    },
    {
      "id": "q2",
      "afterScene": "s6",
      "questionEn": "What does Dani discover about himself?",
      "questionEs": "¿Qué descubre Dani sobre sí mismo?",
      "options": [
        {
          "label": "That working with teachers and families made him care about public service.",
          "emoji": "💡"
        },
        {
          "label": "That he wants to leave the academy.",
          "emoji": "🚪"
        },
        {
          "label": "That he wants to become an investor.",
          "emoji": "💰"
        }
      ],
      "answer": 0,
      "sayIt": "He discovered that public service matters to him.",
      "sayItEs": "Ejemplo: «He discovered that public service matters to him.»",
      "sayItAskEn": "If you were Dani, would you accept the new responsibility? Why?",
      "sayItAskEs": "Si fueras Dani, ¿aceptarías la nueva responsabilidad? ¿Por qué?",
      "sayItCheck": {
        "target": "Yes, because *",
        "altTargets": [
          "I would accept because *",
          "No, because *"
        ]
      }
    },
    {
      "id": "q3",
      "afterScene": "s9",
      "questionEn": "What does Mr. Reed invite Vale to do?",
      "questionEs": "¿A qué invita el señor Reed a Vale?",
      "options": [
        {
          "label": "Compete in an international program for scalable educational models.",
          "emoji": "🌍"
        },
        {
          "label": "Sell the academy immediately.",
          "emoji": "🏷️"
        },
        {
          "label": "Close the Mexico office.",
          "emoji": "🛑"
        }
      ],
      "answer": 0,
      "sayIt": "He invited her to compete in an international program.",
      "sayItEs": "Ejemplo: «He invited her to compete in an international program.»",
      "sayItAskEn": "Forty-five seconds: imagine you are Vale. Tell the international program why your academy is ready to grow.",
      "sayItAskEs": "Cuarenta y cinco segundos: imagina que eres Vale. Cuéntale al programa internacional por qué tu academia está lista para crecer.",
      "sayItCheck": {
        "target": "My academy is ready because *",
        "altTargets": [
          "We are ready because *",
          "I am asking for a chance to *"
        ]
      }
    }
  ],
  "mindsetCard": {
    "afterScene": "s7",
    "phrase": "I can grow a career and a purpose at the same time.",
    "es": "Puedo hacer crecer una carrera y un propósito al mismo tiempo."
  },
  "habitCard": {
    "afterScene": "s3",
    "phrase": "English is easy when I answer with proof, not with promises.",
    "es": "El inglés es fácil cuando respondo con pruebas, no con promesas.",
    "model": "vale",
    "modelActionEs": "Vale responde a la prensa con hechos claros en lugar de reaccionar con miedo."
  },
  "expressions": [
    {
      "phrase": "wrap up",
      "variants": ["wrap up", "wrapped up"],
      "es": "cerrar o concluir algo",
      "kind": "phrasal",
      "example": "Let us wrap up today's work, then. Tomorrow we start preparing that presentation.",
      "exampleEs": "Cerremos el trabajo de hoy, entonces. Mañana empezamos a preparar esa presentación."
    },
    {
      "phrase": "take on",
      "variants": ["take on", "took on"],
      "es": "asumir una responsabilidad",
      "kind": "phrasal",
      "example": "So I can take on this operation and still keep growing toward that other dream someday.",
      "exampleEs": "Entonces puedo asumir esta operación y seguir creciendo hacia ese otro sueño algún día."
    },
    {
      "phrase": "the sky is the limit",
      "es": "no hay límite para lo que puedes lograr",
      "kind": "idiom",
      "example": "Me too. But first we sleep, because the sky is the limit only if we build carefully.",
      "exampleEs": "Yo también. Pero primero dormimos, porque el cielo es el límite solo si construimos con cuidado."
    }
  ],
  "finaleSeconds": 45,
  "continuePrompt": {
    "en": "Season checkpoint, 45 seconds: imagine you are Vale. Tell the international program why your academy is ready to grow.",
    "es": "Punto de control de temporada, 45 segundos: imagina que eres Vale. Cuéntale al programa internacional por qué tu academia está lista para crecer."
  },
  "continueWith": [
    "My academy is ready because ...",
    "We do not grow fast, we grow ...",
    "I am asking for a chance to ..."
  ],
  "cliffhanger": {
    "en": "Mr. Reed has opened the door: Vale must now compete for a spot in an international program, and the sky is the limit only if she earns it.",
    "es": "El señor Reed ha abierto la puerta: ahora Vale debe competir por un lugar en un programa internacional, y el cielo es el límite solo si se lo gana."
  }
};
