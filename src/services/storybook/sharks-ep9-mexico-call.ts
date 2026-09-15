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
  "id": "sharks-ep9-mexico-call",
  "moduleId": "sharks",
  "week": 2,
  "title": "The Mexico call",
  "titleEs": "La llamada de México",
  "episodeLabel": {
    "en": "Season 8 · Episode 9",
    "es": "Temporada 8 · Episodio 9"
  },
  "previously": [
    {
      "en": "Vale decided to open Vale Kids: one small Saturday group at the community center.",
      "es": "Vale decidió abrir Vale Kids: un pequeño grupo de sábado en el centro comunitario."
    },
    {
      "en": "At the end of a long week, a message arrived from Mexico asking for a call.",
      "es": "Al final de una semana larga, llegó un mensaje de México pidiendo una llamada."
    }
  ],
  "reviewWords": [
    {
      "word": "quality",
      "es": "calidad"
    },
    {
      "word": "training",
      "es": "capacitación"
    },
    {
      "word": "client",
      "es": "cliente"
    }
  ],
  "blurb": {
    "en": "Twelve kids, a box of puppets, and the first Vale Kids class ever. Then the phone rings: a school in Monterrey saw the video and wants to know how Vale does it.",
    "es": "Doce niños, una caja de títeres y la primera clase de Vale Kids. Luego suena el teléfono: una escuela en Monterrey vio el video y quiere saber cómo lo hace Vale."
  },
  "cover": cover,
  "voice": "girl",
  "scenes": [
    {
      "id": "s1",
      "image": s1,
      "imageAlt": "Vale and Dani arrange small chairs inside the community center before the children arrive.",
      "text": "Because in one hour, twelve kids walk through that door for the first Vale Kids class ever.",
      "es": "Porque en una hora, doce niños van a entrar por esa puerta para la primera clase de Vale Kids.",
      "speaker": "vale",
      "cast": ["vale", "dani"],
      "lines": [
        {
          "speaker": "dani",
          "text": "Eight o'clock on a Saturday, Vale. Tell me again why we are moving chairs instead of sleeping.",
          "es": "Ocho de la mañana un sábado, Vale. Dime otra vez por qué movemos sillas en vez de dormir."
        },
        {
          "speaker": "vale",
          "text": "Because in one hour, twelve kids walk through that door for the first Vale Kids class ever.",
          "es": "Porque en una hora, doce niños van a entrar por esa puerta para la primera clase de Vale Kids."
        },
        {
          "speaker": "dani",
          "text": "Twelve kids, one teacher, and a box of puppets. This is either brilliant or completely crazy.",
          "es": "Doce niños, una maestra y una caja de títeres. Esto es brillante o completamente loco."
        }
      ],
      "words": [
        { "word": "instead", "es": "en lugar de" },
        { "word": "puppets", "es": "títeres" },
        { "word": "either", "es": "o... o / ya sea" }
      ]
    },
    {
      "id": "s2",
      "image": s2,
      "imageAlt": "Vale leads the children in a movement game while Dani watches from the back of the room.",
      "text": "Okay, team! When I say jump, you jump. When I say stop, you freeze like statues.",
      "es": "¡Muy bien, equipo! Cuando yo diga salta, saltan. Cuando diga alto, se congelan como estatuas.",
      "speaker": "vale",
      "cast": ["vale", "dani"],
      "lines": [
        {
          "speaker": "vale",
          "text": "Okay, team! When I say jump, you jump. When I say stop, you freeze like statues.",
          "es": "¡Muy bien, equipo! Cuando yo diga salta, saltan. Cuando diga alto, se congelan como estatuas."
        },
        {
          "speaker": "dani",
          "text": "They understand every word. Look at the little one in front — she is leading the whole group.",
          "es": "Entienden cada palabra. Mira a la pequeña de adelante: está guiando a todo el grupo."
        },
        {
          "speaker": "vale",
          "text": "That is the method: the body learns first, and the words follow the movement.",
          "es": "Ese es el método: el cuerpo aprende primero, y las palabras siguen al movimiento."
        }
      ],
      "words": [
        { "word": "freeze", "es": "congelarse" },
        { "word": "statues", "es": "estatuas" },
        { "word": "leading", "es": "guiando" }
      ]
    },
    {
      "id": "s3",
      "image": s3,
      "imageAlt": "Camila records a short video of the dinosaur game on her phone while Vale plays with the children.",
      "text": "Vale, give me thirty seconds. I am filming the dinosaur game for our social media.",
      "es": "Vale, dame treinta segundos. Estoy grabando el juego del dinosaurio para nuestras redes.",
      "speaker": "camila",
      "cast": ["camila", "vale"],
      "lines": [
        {
          "speaker": "camila",
          "text": "Vale, give me thirty seconds. I am filming the dinosaur game for our social media.",
          "es": "Vale, dame treinta segundos. Estoy grabando el juego del dinosaurio para nuestras redes."
        },
        {
          "speaker": "vale",
          "text": "Film the part where they roar in English. Parents need to see their kids speaking, not just listening.",
          "es": "Graba la parte donde rugen en inglés. Los padres necesitan ver a sus hijos hablando, no solo escuchando."
        },
        {
          "speaker": "camila",
          "text": "Got it. This video is going to travel further than any advertisement we could pay for.",
          "es": "Listo. Este video va a viajar más lejos que cualquier anuncio que pudiéramos pagar."
        }
      ],
      "words": [
        { "word": "filming", "es": "grabando" },
        { "word": "roar", "es": "rugir" },
        { "word": "advertisement", "es": "anuncio publicitario" }
      ]
    },
    {
      "id": "s4",
      "image": s4,
      "imageAlt": "Dani counts registration forms at the door while happy children leave with their parents.",
      "text": "Twelve kids signed up for next Saturday before their parents even reached the door.",
      "es": "Doce niños se inscribieron para el próximo sábado antes de que sus padres llegaran a la puerta.",
      "speaker": "dani",
      "cast": ["dani", "vale"],
      "lines": [
        {
          "speaker": "dani",
          "text": "Twelve kids signed up for next Saturday before their parents even reached the door.",
          "es": "Doce niños se inscribieron para el próximo sábado antes de que sus padres llegaran a la puerta."
        },
        {
          "speaker": "vale",
          "text": "I spent three weeks designing this class, and the kids made it better in ten minutes.",
          "es": "Pasé tres semanas diseñando esta clase, y los niños la mejoraron en diez minutos."
        },
        {
          "speaker": "dani",
          "text": "That is what a good class does. You build the road, and they run on it.",
          "es": "Eso es lo que hace una buena clase. Tú construyes el camino, y ellos corren sobre él."
        }
      ],
      "words": [
        { "word": "signed up", "es": "se inscribieron" },
        { "word": "designing", "es": "diseñando" },
        { "word": "build", "es": "construir" }
      ]
    },
    {
      "id": "s5",
      "image": s5,
      "imageAlt": "Vale answers her phone in the empty community center while Dani packs the puppets away.",
      "text": "Renata Fuentes, from Monterrey. I run an English school here, and this morning I saw your video.",
      "es": "Renata Fuentes, de Monterrey. Dirijo una escuela de inglés aquí, y esta mañana vi su video.",
      "speaker": "renata",
      "cast": ["vale", "renata"],
      "lines": [
        {
          "speaker": "vale",
          "text": "Hello? Yes, this is Vale speaking... I am sorry, who did you say is calling?",
          "es": "¿Bueno? Sí, habla Vale... Perdón, ¿quién dijo que llama?"
        },
        {
          "speaker": "renata",
          "text": "Renata Fuentes, from Monterrey. I run an English school here, and this morning I saw your video.",
          "es": "Renata Fuentes, de Monterrey. Dirijo una escuela de inglés aquí, y esta mañana vi su video."
        },
        {
          "speaker": "vale",
          "text": "The video from today? We posted it two hours ago. The internet works fast, Ms. Fuentes.",
          "es": "¿El video de hoy? Lo publicamos hace dos horas. El internet trabaja rápido, señora Fuentes."
        }
      ],
      "words": [
        { "word": "run", "es": "dirigir (un negocio)" },
        { "word": "posted", "es": "publicamos" },
        { "word": "fast", "es": "rápido" }
      ]
    },
    {
      "id": "s6",
      "image": s6,
      "imageAlt": "Renata speaks from her school office in Monterrey during the phone call with Vale.",
      "text": "That is why I am calling you instead of copying you. I want to open a Kids program the right way.",
      "es": "Por eso la llamo en vez de copiarla. Quiero abrir un programa para niños de la manera correcta.",
      "speaker": "renata",
      "cast": ["renata", "vale"],
      "lines": [
        {
          "speaker": "renata",
          "text": "Two hundred people shared it in Mexico already. My teachers asked me: why don't we do this?",
          "es": "Doscientas personas ya lo compartieron en México. Mis maestros me preguntaron: ¿por qué nosotros no hacemos esto?"
        },
        {
          "speaker": "vale",
          "text": "Because it looks easy on video, and it is not. Every game has a language goal behind it.",
          "es": "Porque se ve fácil en video, y no lo es. Cada juego tiene una meta de idioma detrás."
        },
        {
          "speaker": "renata",
          "text": "Exactly. That is why I am calling you instead of copying you. I want to open a Kids program the right way.",
          "es": "Exacto. Por eso la llamo en vez de copiarla. Quiero abrir un programa para niños de la manera correcta."
        }
      ],
      "words": [
        { "word": "shared", "es": "compartieron" },
        { "word": "copying", "es": "copiando" },
        { "word": "the right way", "es": "de la manera correcta" }
      ]
    },
    {
      "id": "s7",
      "image": s7,
      "imageAlt": "Vale sits on the edge of a small table and smiles as she understands what Renata is really asking.",
      "text": "In other words, you are not asking me for permission. You are asking me for the recipe.",
      "es": "En otras palabras, no me está pidiendo permiso. Me está pidiendo la receta.",
      "speaker": "vale",
      "cast": ["vale", "renata"],
      "lines": [
        {
          "speaker": "renata",
          "text": "So here is my question, Vale: what do I need to open something like this in Monterrey?",
          "es": "Entonces aquí está mi pregunta, Vale: ¿qué necesito para abrir algo así en Monterrey?"
        },
        {
          "speaker": "vale",
          "text": "In other words, you are not asking me for permission. You are asking me for the recipe.",
          "es": "En otras palabras, no me está pidiendo permiso. Me está pidiendo la receta."
        },
        {
          "speaker": "renata",
          "text": "I am asking for both, honestly. I would rather work with you than compete with you.",
          "es": "Le pido ambas, honestamente. Prefiero trabajar con usted que competir con usted."
        }
      ],
      "words": [
        { "word": "permission", "es": "permiso" },
        { "word": "recipe", "es": "receta" },
        { "word": "rather", "es": "preferiría / antes que" }
      ]
    },
    {
      "id": "s8",
      "image": s8,
      "imageAlt": "Vale explains the training model with her notebook open while Renata listens on speakerphone.",
      "text": "Let me spell out the model, and please do not cut corners: trained teachers, one method, weekly quality checks.",
      "es": "Déjeme explicar el modelo con claridad, y por favor no ahorre en lo esencial: maestros capacitados, un método, controles de calidad semanales.",
      "speaker": "vale",
      "cast": ["vale", "renata"],
      "lines": [
        {
          "speaker": "vale",
          "text": "Let me spell out the model, and please do not cut corners: trained teachers, one method, weekly quality checks.",
          "es": "Déjeme explicar el modelo con claridad, y por favor no ahorre en lo esencial: maestros capacitados, un método, controles de calidad semanales."
        },
        {
          "speaker": "renata",
          "text": "And the money side? What does a program like this cost in its first three months?",
          "es": "¿Y el lado del dinero? ¿Cuánto cuesta un programa así en sus primeros tres meses?"
        },
        {
          "speaker": "vale",
          "text": "Less than you think, but more than zero. Cut corners on training and the whole program falls apart.",
          "es": "Menos de lo que piensa, pero más que cero. Ahorre en la capacitación y todo el programa se cae a pedazos."
        }
      ],
      "words": [
        { "word": "model", "es": "modelo" },
        { "word": "cost", "es": "costo" },
        { "word": "falls apart", "es": "se cae a pedazos" }
      ]
    },
    {
      "id": "s9",
      "image": s9,
      "imageAlt": "Vale and Renata agree on the next call while Dani writes the date on the board.",
      "text": "And if something is not clear on that call, stop me and we will clear that up together.",
      "es": "Y si algo no queda claro en esa llamada, deténgame y lo aclaramos juntas.",
      "speaker": "renata",
      "cast": ["vale", "renata", "dani"],
      "lines": [
        {
          "speaker": "vale",
          "text": "Here is what I propose: we talk next week with numbers on the table, both schools, no promises yet.",
          "es": "Esto es lo que propongo: hablamos la próxima semana con números sobre la mesa, ambas escuelas, sin promesas todavía."
        },
        {
          "speaker": "renata",
          "text": "Agreed. And if something is not clear on that call, stop me and we will clear that up together.",
          "es": "De acuerdo. Y si algo no queda claro en esa llamada, deténgame y lo aclaramos juntas."
        },
        {
          "speaker": "vale",
          "text": "Deal. Send me your school's numbers before Friday, and I will send you our training plan.",
          "es": "Trato hecho. Envíeme los números de su escuela antes del viernes, y yo le envío nuestro plan de capacitación."
        }
      ],
      "words": [
        { "word": "propose", "es": "proponer" },
        { "word": "promises", "es": "promesas" },
        { "word": "deal", "es": "trato" }
      ]
    },
    {
      "id": "s10",
      "image": s10,
      "imageAlt": "Dani turns around from the board with wide eyes as Vale finishes the call with a big smile.",
      "text": "The director of a school in Monterrey. She wants to open a Kids program and asked how we do it.",
      "es": "La directora de una escuela en Monterrey. Quiere abrir un programa para niños y preguntó cómo lo hacemos.",
      "speaker": "vale",
      "cast": ["dani", "vale"],
      "lines": [
        {
          "speaker": "dani",
          "text": "Okay. You smiled for the whole second half of that call. Who was she?",
          "es": "Bueno. Sonreíste durante toda la segunda mitad de esa llamada. ¿Quién era?"
        },
        {
          "speaker": "vale",
          "text": "The director of a school in Monterrey. She wants to open a Kids program and asked how we do it.",
          "es": "La directora de una escuela en Monterrey. Quiere abrir un programa para niños y preguntó cómo lo hacemos."
        },
        {
          "speaker": "dani",
          "text": "Mexico. Two weeks after the first class. Vale, this thing is growing faster than we are.",
          "es": "México. Dos semanas después de la primera clase. Vale, esto está creciendo más rápido que nosotros."
        }
      ],
      "words": [
        { "word": "second half", "es": "segunda mitad" },
        { "word": "growing", "es": "creciendo" },
        { "word": "faster", "es": "más rápido" }
      ]
    },
    {
      "id": "s11",
      "image": s11,
      "imageAlt": "Vale holds the phone in surprise as Renata adds one last important detail before hanging up.",
      "text": "One more thing before I go, Vale. My schools also serve corporate clients here in Mexico.",
      "es": "Una cosa más antes de irme, Vale. Mis escuelas también atienden clientes corporativos aquí en México.",
      "speaker": "renata",
      "cast": ["vale", "renata", "dani"],
      "lines": [
        {
          "speaker": "renata",
          "text": "One more thing before I go, Vale. My schools also serve corporate clients here in Mexico.",
          "es": "Una cosa más antes de irme, Vale. Mis escuelas también atienden clientes corporativos aquí en México."
        },
        {
          "speaker": "vale",
          "text": "Corporate clients? Like Northline? Then we need to talk very carefully next week.",
          "es": "¿Clientes corporativos? ¿Como Northline? Entonces tenemos que hablar con mucho cuidado la próxima semana."
        },
        {
          "speaker": "dani",
          "text": "What did she say at the end? You look like someone just moved your chess pieces.",
          "es": "¿Qué dijo al final? Tienes cara de que alguien acaba de mover tus piezas de ajedrez."
        }
      ],
      "words": [
        { "word": "serve", "es": "atender (clientes)" },
        { "word": "carefully", "es": "con cuidado" },
        { "word": "chess pieces", "es": "piezas de ajedrez" }
      ]
    }
  ],
  "quizzes": [
    {
      "id": "q1",
      "afterScene": "s3",
      "questionEn": "What is Camila doing during the first class?",
      "questionEs": "¿Qué hace Camila durante la primera clase?",
      "options": [
        {
          "label": "She is filming the kids' game for social media.",
          "emoji": "🎬"
        },
        {
          "label": "She is selling tickets at the door.",
          "emoji": "🎟️"
        },
        {
          "label": "She is teaching the class herself.",
          "emoji": "👩‍🏫"
        }
      ],
      "answer": 0,
      "sayIt": "I would film the kids playing and speaking English.",
      "sayItEs": "Ejemplo: «I would film the kids playing and speaking English.»",
      "sayItAskEn": "What moment of this class would you film, and why?",
      "sayItAskEs": "¿Qué momento de esta clase grabarías y por qué?",
      "sayItCheck": {
        "target": "I would film *",
        "altTargets": [
          "I would record *",
          "I would film the *"
        ]
      }
    },
    {
      "id": "q2",
      "afterScene": "s7",
      "questionEn": "What does Renata really want?",
      "questionEs": "¿Qué quiere Renata en realidad?",
      "options": [
        {
          "label": "To open a Kids program in Monterrey with Vale's help.",
          "emoji": "🤝"
        },
        {
          "label": "To buy Vale's whole academy.",
          "emoji": "💰"
        },
        {
          "label": "To close Vale's new program.",
          "emoji": "🚫"
        }
      ],
      "answer": 0,
      "sayIt": "I would help her because helping grows faster than competing.",
      "sayItEs": "Ejemplo: «I would help her because helping grows faster than competing.»",
      "sayItAskEn": "If you were Vale, would you share your method? Why?",
      "sayItAskEs": "Si fueras Vale, ¿compartirías tu método? ¿Por qué?",
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
      "questionEn": "Why does Vale say they must talk carefully next week?",
      "questionEs": "¿Por qué dice Vale que deben hablar con cuidado la próxima semana?",
      "options": [
        {
          "label": "Because Renata's schools also serve corporate clients in Mexico.",
          "emoji": "♟️"
        },
        {
          "label": "Because Renata hung up angrily.",
          "emoji": "📵"
        },
        {
          "label": "Because the kids were too loud.",
          "emoji": "🔊"
        }
      ],
      "answer": 0,
      "sayIt": "Vale taught her first Kids class, and then Mexico called with a big opportunity.",
      "sayItEs": "Ejemplo: «Vale taught her first Kids class, and then Mexico called with a big opportunity.»",
      "sayItAskEn": "Summarize what happened in this episode.",
      "sayItAskEs": "Resume lo que pasó en este episodio.",
      "sayItCheck": {
        "target": "Vale taught *, and then *",
        "altTargets": [
          "First Vale *, then *",
          "Vale opened *"
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
    "modelActionEs": "Vale escucha la pregunta completa de Renata antes de responder."
  },
  "expressions": [
    {
      "phrase": "spell out",
      "es": "explicar con total claridad",
      "kind": "phrasal",
      "example": "Let me spell out the model, and please do not cut corners: trained teachers, one method, weekly quality checks.",
      "exampleEs": "Déjeme explicar el modelo con claridad, y por favor no ahorre en lo esencial: maestros capacitados, un método, controles de calidad semanales."
    },
    {
      "phrase": "clear up",
      "variants": ["clear that up"],
      "es": "aclarar / resolver una confusión",
      "kind": "phrasal",
      "example": "And if something is not clear on that call, stop me and we will clear that up together.",
      "exampleEs": "Y si algo no queda claro en esa llamada, deténgame y lo aclaramos juntas."
    },
    {
      "phrase": "cut corners",
      "es": "ahorrar en lo esencial / hacer las cosas a medias",
      "kind": "idiom",
      "example": "Let me spell out the model, and please do not cut corners: trained teachers, one method, weekly quality checks.",
      "exampleEs": "Déjeme explicar el modelo con claridad, y por favor no ahorre en lo esencial: maestros capacitados, un método, controles de calidad semanales."
    }
  ],
  "finaleSeconds": 30,
  "continuePrompt": {
    "en": "Your turn, 30 seconds: explain how the first Kids class went and what the Mexico call means.",
    "es": "Tu turno, 30 segundos: explica cómo salió la primera clase de Kids y qué significa la llamada de México."
  },
  "continueWith": [
    "The first class went ...",
    "In other words, ...",
    "Next week, Vale has to ..."
  ],
  "cliffhanger": {
    "en": "My schools also serve corporate clients here in Mexico.",
    "es": "Mis escuelas también atienden clientes corporativos aquí en México."
  }
};
