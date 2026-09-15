import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/sharks-ep10-partner-or-rival/cover.jpg";
import s1 from "@/assets/storybook/sharks-ep10-partner-or-rival/s1.jpg";
import s2 from "@/assets/storybook/sharks-ep10-partner-or-rival/s2.jpg";
import s3 from "@/assets/storybook/sharks-ep10-partner-or-rival/s3.jpg";
import s4 from "@/assets/storybook/sharks-ep10-partner-or-rival/s4.jpg";
import s5 from "@/assets/storybook/sharks-ep10-partner-or-rival/s5.jpg";
import s6 from "@/assets/storybook/sharks-ep10-partner-or-rival/s6.jpg";
import s7 from "@/assets/storybook/sharks-ep10-partner-or-rival/s7.jpg";
import s8 from "@/assets/storybook/sharks-ep10-partner-or-rival/s8.jpg";
import s9 from "@/assets/storybook/sharks-ep10-partner-or-rival/s9.jpg";
import s10 from "@/assets/storybook/sharks-ep10-partner-or-rival/s10.jpg";
import s11 from "@/assets/storybook/sharks-ep10-partner-or-rival/s11.jpg";

export const SHARKS_EP10_PARTNER_OR_RIVAL: StorybookEpisode = {
  "id": "sharks-ep10-partner-or-rival",
  "moduleId": "sharks",
  "week": 2,
  "title": "A partner or a rival",
  "titleEs": "¿Socia o rival?",
  "episodeLabel": {
    "en": "Season 8 · Episode 10",
    "es": "Temporada 8 · Episodio 10"
  },
  "previously": [
    {
      "en": "The first Vale Kids class filled the community center with twelve laughing children.",
      "es": "La primera clase de Vale Kids llenó el centro comunitario con doce niños felices."
    },
    {
      "en": "Renata called from Monterrey: she wants a Kids program too — and her schools serve corporate clients.",
      "es": "Renata llamó desde Monterrey: también quiere un programa Kids, y sus escuelas atienden clientes corporativos."
    }
  ],
  "reviewWords": [
    {
      "word": "recipe",
      "es": "receta"
    },
    {
      "word": "corporate",
      "es": "corporativo"
    },
    {
      "word": "training plan",
      "es": "plan de capacitación"
    }
  ],
  "blurb": {
    "en": "Renata's schools touch the same market as Northline. Before anyone else defines this relationship, Vale's team defines it themselves — three options, one honest call, and rules written from day one.",
    "es": "Las escuelas de Renata tocan el mismo mercado que Northline. Antes de que alguien más defina esta relación, el equipo de Vale la define: tres opciones, una llamada honesta y reglas escritas desde el primer día."
  },
  "cover": cover,
  "voice": "girl",
  "scenes": [
    {
      "id": "s1",
      "image": s1,
      "imageAlt": "Camila finds Vale at the office early in the morning with coffee and tired eyes.",
      "text": "I could not sleep. Renata's last sentence kept me awake: corporate clients, in Mexico.",
      "es": "No pude dormir. La última frase de Renata me tuvo despierta: clientes corporativos, en México.",
      "speaker": "vale",
      "cast": ["camila", "vale", "dani"],
      "lines": [
        {
          "speaker": "camila",
          "text": "You were up late. I can tell because you answered my messages at one in the morning.",
          "es": "Te acostaste tarde. Lo sé porque respondiste mis mensajes a la una de la mañana."
        },
        {
          "speaker": "vale",
          "text": "I could not sleep. Renata's last sentence kept me awake: corporate clients, in Mexico.",
          "es": "No pude dormir. La última frase de Renata me tuvo despierta: clientes corporativos, en México."
        },
        {
          "speaker": "dani",
          "text": "The same sentence that sounded like good news at first and like a warning by midnight.",
          "es": "La misma frase que al principio sonó a buena noticia y a medianoche sonó a advertencia."
        }
      ],
      "words": [
        { "word": "awake", "es": "despierta" },
        { "word": "warning", "es": "advertencia" },
        { "word": "at first", "es": "al principio" }
      ]
    },
    {
      "id": "s2",
      "image": s2,
      "imageAlt": "Dani draws a simple map of Mexico and the Northline contract on the office whiteboard.",
      "text": "And now a possible partner teaches their competitors. If Northline finds out, they will ask questions.",
      "es": "Y ahora una posible socia enseña a sus competidores. Si Northline se entera, hará preguntas.",
      "speaker": "camila",
      "cast": ["dani", "camila", "vale"],
      "lines": [
        {
          "speaker": "dani",
          "text": "Let me understand the problem. Northline pays us to train their people, and Mexico is part of that map.",
          "es": "Déjame entender el problema. Northline nos paga por capacitar a su gente, y México es parte de ese mapa."
        },
        {
          "speaker": "camila",
          "text": "And now a possible partner teaches their competitors. If Northline finds out, they will ask questions.",
          "es": "Y ahora una posible socia enseña a sus competidores. Si Northline se entera, hará preguntas."
        },
        {
          "speaker": "vale",
          "text": "So before anyone else defines this relationship, we define it ourselves, today.",
          "es": "Así que antes de que alguien más defina esta relación, la definimos nosotros, hoy."
        }
      ],
      "words": [
        { "word": "train", "es": "capacitar" },
        { "word": "finds out", "es": "se entera" },
        { "word": "define", "es": "definir" }
      ]
    },
    {
      "id": "s3",
      "image": s3,
      "imageAlt": "Dani, Camila and Vale stand around the whiteboard comparing three possible options.",
      "text": "Or option three: everything together, and we all figure out the rules before we start.",
      "es": "O la opción tres: todo junto, y todos definimos las reglas antes de empezar.",
      "speaker": "vale",
      "cast": ["dani", "camila", "vale"],
      "lines": [
        {
          "speaker": "dani",
          "text": "Option one: we say no to Renata and lose the biggest door into Mexico we have ever seen.",
          "es": "Opción uno: le decimos que no a Renata y perdemos la puerta más grande a México que hemos visto."
        },
        {
          "speaker": "camila",
          "text": "Option two: we work with her on Kids and stay away from her corporate clients completely.",
          "es": "Opción dos: trabajamos con ella en Kids y nos mantenemos lejos de sus clientes corporativos por completo."
        },
        {
          "speaker": "vale",
          "text": "Or option three: everything together, and we all figure out the rules before we start.",
          "es": "O la opción tres: todo junto, y todos definimos las reglas antes de empezar."
        }
      ],
      "words": [
        { "word": "option", "es": "opción" },
        { "word": "stay away", "es": "mantenerse lejos" },
        { "word": "rules", "es": "reglas" }
      ]
    },
    {
      "id": "s4",
      "image": s4,
      "imageAlt": "Vale proposes the brave option while Dani leans on the desk, worried about the risk.",
      "text": "There is a fourth option nobody said: tell Mr. Reed ourselves, before he hears it from someone else.",
      "es": "Hay una cuarta opción que nadie dijo: decírselo nosotros al señor Reed, antes de que lo escuche de otra persona.",
      "speaker": "vale",
      "cast": ["vale", "dani"],
      "lines": [
        {
          "speaker": "vale",
          "text": "There is a fourth option nobody said: tell Mr. Reed ourselves, before he hears it from someone else.",
          "es": "Hay una cuarta opción que nadie dijo: decírselo nosotros al señor Reed, antes de que lo escuche de otra persona."
        },
        {
          "speaker": "dani",
          "text": "That is brave. And risky. He could cancel the contract the moment he hears the word Mexico.",
          "es": "Eso es valiente. Y arriesgado. Podría cancelar el contrato en el momento en que escuche la palabra México."
        },
        {
          "speaker": "vale",
          "text": "He could also respect us more. Secrets are expensive, Dani. I learned that the hard way.",
          "es": "También podría respetarnos más. Los secretos cuestan caro, Dani. Eso lo aprendí a las malas."
        }
      ],
      "words": [
        { "word": "brave", "es": "valiente" },
        { "word": "risky", "es": "arriesgado" },
        { "word": "the hard way", "es": "a las malas" }
      ]
    },
    {
      "id": "s5",
      "image": s5,
      "imageAlt": "Renata appears on the video call screen from Monterrey with a direct, playful smile.",
      "text": "Good morning, partners-to-be. Or should I say rivals? I read your silence all weekend.",
      "es": "Buenos días, futuros socios. ¿O debería decir rivales? Leí su silencio todo el fin de semana.",
      "speaker": "renata",
      "cast": ["renata", "vale"],
      "lines": [
        {
          "speaker": "renata",
          "text": "Good morning, partners-to-be. Or should I say rivals? I read your silence all weekend.",
          "es": "Buenos días, futuros socios. ¿O debería decir rivales? Leí su silencio todo el fin de semana."
        },
        {
          "speaker": "vale",
          "text": "You read it wrong. We spent the weekend working, not worrying. Can I be direct with you?",
          "es": "Lo leyó mal. Pasamos el fin de semana trabajando, no preocupándonos. ¿Puedo ser directa con usted?"
        },
        {
          "speaker": "renata",
          "text": "Please. I built six schools on direct conversations. Vague people do not last in this business.",
          "es": "Por favor. Construí seis escuelas a base de conversaciones directas. La gente vaga no dura en este negocio."
        }
      ],
      "words": [
        { "word": "silence", "es": "silencio" },
        { "word": "direct", "es": "directa" },
        { "word": "vague", "es": "vago / poco claro" }
      ]
    },
    {
      "id": "s6",
      "image": s6,
      "imageAlt": "Renata raises one hand on screen to stop Vale and clarify her real intentions.",
      "text": "What I mean is simple: I do not want Northline's contract, and I never will.",
      "es": "Lo que quiero decir es simple: no quiero el contrato de Northline, y nunca lo querré.",
      "speaker": "renata",
      "cast": ["renata", "vale"],
      "lines": [
        {
          "speaker": "vale",
          "text": "Then here it is. Kids, yes, together. Corporate clients in Mexico, separate, at least for now.",
          "es": "Entonces aquí va. Kids, sí, juntas. Clientes corporativos en México, separados, al menos por ahora."
        },
        {
          "speaker": "renata",
          "text": "What I mean is simple: I do not want Northline's contract, and I never will.",
          "es": "Lo que quiero decir es simple: no quiero el contrato de Northline, y nunca lo querré."
        },
        {
          "speaker": "vale",
          "text": "Why not? It is the biggest contract in the region. Most schools would fight for it.",
          "es": "¿Por qué no? Es el contrato más grande de la región. La mayoría de las escuelas pelearían por él."
        }
      ],
      "words": [
        { "word": "separate", "es": "separados" },
        { "word": "region", "es": "región" },
        { "word": "fight for", "es": "pelear por" }
      ]
    },
    {
      "id": "s7",
      "image": s7,
      "imageAlt": "Vale writes three rules on the whiteboard while Renata follows along from the screen.",
      "text": "Two: my corporate clients stay mine, your Northline stays yours, and nobody poaches anybody.",
      "es": "Dos: mis clientes corporativos se quedan conmigo, tu Northline se queda contigo, y nadie le roba clientes a nadie.",
      "speaker": "renata",
      "cast": ["vale", "renata"],
      "lines": [
        {
          "speaker": "vale",
          "text": "Then let us write the rules today. One: Kids in Monterrey follows our method and our training.",
          "es": "Entonces escribamos las reglas hoy. Una: Kids en Monterrey sigue nuestro método y nuestra capacitación."
        },
        {
          "speaker": "renata",
          "text": "Two: my corporate clients stay mine, your Northline stays yours, and nobody poaches anybody.",
          "es": "Dos: mis clientes corporativos se quedan conmigo, tu Northline se queda contigo, y nadie le roba clientes a nadie."
        },
        {
          "speaker": "vale",
          "text": "Three: we tell Mr. Reed together, on one call, so the story is honest from day one.",
          "es": "Tres: se lo decimos al señor Reed juntas, en una llamada, para que la historia sea honesta desde el día uno."
        }
      ],
      "words": [
        { "word": "poaches", "es": "roba (clientes o talento)" },
        { "word": "honest", "es": "honesta" },
        { "word": "day one", "es": "el primer día" }
      ]
    },
    {
      "id": "s8",
      "image": s8,
      "imageAlt": "Renata laughs on screen, impressed by how firmly Vale negotiates the new rules.",
      "text": "My grandmother, every Sunday. So — are we on the same page, Renata?",
      "es": "Mi abuela, todos los domingos. Entonces, ¿estamos en la misma página, Renata?",
      "speaker": "vale",
      "cast": ["renata", "vale"],
      "lines": [
        {
          "speaker": "renata",
          "text": "You negotiate like someone twice your age. Did anyone ever tell you that?",
          "es": "Negocias como alguien con el doble de tu edad. ¿Alguien te lo ha dicho alguna vez?"
        },
        {
          "speaker": "vale",
          "text": "My grandmother, every Sunday. So — are we on the same page, Renata?",
          "es": "Mi abuela, todos los domingos. Entonces, ¿estamos en la misma página, Renata?"
        },
        {
          "speaker": "renata",
          "text": "We are on the same page, and it is a good page. Send me the training plan tonight.",
          "es": "Estamos en la misma página, y es una buena página. Envíame el plan de capacitación esta noche."
        }
      ],
      "words": [
        { "word": "twice", "es": "el doble" },
        { "word": "negotiate", "es": "negociar" },
        { "word": "tonight", "es": "esta noche" }
      ]
    },
    {
      "id": "s9",
      "image": s9,
      "imageAlt": "Dani and Camila celebrate quietly in the office after the call ends well.",
      "text": "I cannot believe it. Last night she was a threat, and today she is teaming up with us.",
      "es": "No lo puedo creer. Anoche era una amenaza, y hoy se está aliando con nosotros.",
      "speaker": "dani",
      "cast": ["dani", "camila", "vale"],
      "lines": [
        {
          "speaker": "dani",
          "text": "I cannot believe it. Last night she was a threat, and today she is teaming up with us.",
          "es": "No lo puedo creer. Anoche era una amenaza, y hoy se está aliando con nosotros."
        },
        {
          "speaker": "camila",
          "text": "That is what a good conversation does. It turns a wall into a door.",
          "es": "Eso es lo que hace una buena conversación. Convierte una pared en una puerta."
        },
        {
          "speaker": "vale",
          "text": "A door with rules, Camila. Rules first, trust second, celebration third.",
          "es": "Una puerta con reglas, Camila. Reglas primero, confianza segundo, celebración tercero."
        }
      ],
      "words": [
        { "word": "threat", "es": "amenaza" },
        { "word": "teaming up", "es": "aliándose / uniéndose" },
        { "word": "wall", "es": "pared" }
      ]
    },
    {
      "id": "s10",
      "image": s10,
      "imageAlt": "Vale assigns tasks for the night while Camila opens her laptop with the numbers ready.",
      "text": "Tomorrow I call Mr. Reed with Renata. Tonight, I want the Kids training plan finished.",
      "es": "Mañana llamo al señor Reed con Renata. Esta noche quiero el plan de capacitación de Kids terminado.",
      "speaker": "vale",
      "cast": ["vale", "dani", "camila"],
      "lines": [
        {
          "speaker": "vale",
          "text": "Tomorrow I call Mr. Reed with Renata. Tonight, I want the Kids training plan finished.",
          "es": "Mañana llamo al señor Reed con Renata. Esta noche quiero el plan de capacitación de Kids terminado."
        },
        {
          "speaker": "dani",
          "text": "I will have the plan ready by nine. Camila, can you review the numbers section?",
          "es": "Tendré el plan listo para las nueve. Camila, ¿puedes revisar la sección de números?"
        },
        {
          "speaker": "camila",
          "text": "Already done. You two dream big; I make sure the dreams can pay rent.",
          "es": "Ya está hecho. Ustedes dos sueñan en grande; yo me aseguro de que los sueños puedan pagar el alquiler."
        }
      ],
      "words": [
        { "word": "finished", "es": "terminado" },
        { "word": "review", "es": "revisar" },
        { "word": "rent", "es": "alquiler" }
      ]
    },
    {
      "id": "s11",
      "image": s11,
      "imageAlt": "Vale answers a late call from Lucía and her face changes as she hears the news from Guatemala.",
      "text": "Vale, sorry to call this late. Something went wrong in a class today, and parents are upset.",
      "es": "Vale, perdón por llamar tan tarde. Algo salió mal en una clase hoy, y los padres están molestos.",
      "speaker": "lucia",
      "cast": ["vale", "lucia"],
      "lines": [
        {
          "speaker": "lucia",
          "text": "Vale, sorry to call this late. Something went wrong in a class today, and parents are upset.",
          "es": "Vale, perdón por llamar tan tarde. Algo salió mal en una clase hoy, y los padres están molestos."
        },
        {
          "speaker": "vale",
          "text": "Slow down, Lucía. Which class, which teacher, and how upset are the parents?",
          "es": "Más despacio, Lucía. ¿Qué clase, qué maestro, y qué tan molestos están los padres?"
        },
        {
          "speaker": "lucia",
          "text": "The new teacher in zone two. Half the class walked out. I think we need you here.",
          "es": "El maestro nuevo de la zona dos. La mitad de la clase se salió. Creo que te necesitamos aquí."
        }
      ],
      "words": [
        { "word": "upset", "es": "molestos" },
        { "word": "walked out", "es": "se salieron" },
        { "word": "late", "es": "tarde" }
      ]
    }
  ],
  "quizzes": [
    {
      "id": "q1",
      "afterScene": "s3",
      "questionEn": "What options does the team discuss?",
      "questionEs": "¿Qué opciones discute el equipo?",
      "options": [
        {
          "label": "Say no, work together only on Kids, or do everything with clear rules.",
          "emoji": "📋"
        },
        {
          "label": "Close the academy and move abroad.",
          "emoji": "✈️"
        },
        {
          "label": "Ignore Renata until she disappears.",
          "emoji": "🙈"
        }
      ],
      "answer": 0,
      "sayIt": "I would choose option three because clear rules protect everyone.",
      "sayItEs": "Ejemplo: «I would choose option three because clear rules protect everyone.»",
      "sayItAskEn": "Which option would you choose, and why?",
      "sayItAskEs": "¿Qué opción elegirías y por qué?",
      "sayItCheck": {
        "target": "I would choose * because *",
        "altTargets": [
          "I would pick *",
          "The best option is * because *"
        ]
      }
    },
    {
      "id": "q2",
      "afterScene": "s7",
      "questionEn": "What rules do Vale and Renata agree on?",
      "questionEs": "¿En qué reglas acuerdan Vale y Renata?",
      "options": [
        {
          "label": "Kids together, corporate clients separate, and one honest call with Mr. Reed.",
          "emoji": "✍️"
        },
        {
          "label": "No rules at all — only trust.",
          "emoji": "🤞"
        },
        {
          "label": "Renata takes over Northline.",
          "emoji": "🏴"
        }
      ],
      "answer": 0,
      "sayIt": "I think telling Mr. Reed is smart because secrets are expensive.",
      "sayItEs": "Ejemplo: «I think telling Mr. Reed is smart because secrets are expensive.»",
      "sayItAskEn": "Do you think telling Mr. Reed is a good idea? Why?",
      "sayItAskEs": "¿Crees que decirle al señor Reed es buena idea? ¿Por qué?",
      "sayItCheck": {
        "target": "I think * because *",
        "altTargets": [
          "Yes, because *",
          "I believe * because *"
        ]
      }
    },
    {
      "id": "q3",
      "afterScene": "s11",
      "questionEn": "What happens at the very end of the episode?",
      "questionEs": "¿Qué pasa al final del episodio?",
      "options": [
        {
          "label": "Lucía calls: a class in Guatemala went wrong and parents are upset.",
          "emoji": "📞"
        },
        {
          "label": "The team goes on vacation to rest.",
          "emoji": "🏖️"
        },
        {
          "label": "Renata cancels the whole partnership.",
          "emoji": "❌"
        }
      ],
      "answer": 0,
      "sayIt": "Vale has to help Guatemala because the new teacher's class went wrong.",
      "sayItEs": "Ejemplo: «Vale has to help Guatemala because the new teacher's class went wrong.»",
      "sayItAskEn": "Summarize the new problem Vale faces now.",
      "sayItAskEs": "Resume el nuevo problema que Vale enfrenta ahora.",
      "sayItCheck": {
        "target": "Vale has to * because *",
        "altTargets": [
          "The problem is *",
          "Vale needs to *"
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
    "modelActionEs": "Vale elige la honestidad y habla claro incluso cuando hay riesgo."
  },
  "expressions": [
    {
      "phrase": "figure out",
      "es": "resolver / descifrar",
      "kind": "phrasal",
      "example": "Or option three: everything together, and we all figure out the rules before we start.",
      "exampleEs": "O la opción tres: todo junto, y todos definimos las reglas antes de empezar."
    },
    {
      "phrase": "team up",
      "variants": ["teaming up"],
      "es": "aliarse / unir fuerzas",
      "kind": "phrasal",
      "example": "I cannot believe it. Last night she was a threat, and today she is teaming up with us.",
      "exampleEs": "No lo puedo creer. Anoche era una amenaza, y hoy se está aliando con nosotros."
    },
    {
      "phrase": "on the same page",
      "es": "de acuerdo / entendiendo lo mismo",
      "kind": "idiom",
      "example": "My grandmother, every Sunday. So — are we on the same page, Renata?",
      "exampleEs": "Mi abuela, todos los domingos. Entonces, ¿estamos en la misma página, Renata?"
    }
  ],
  "finaleSeconds": 45,
  "continuePrompt": {
    "en": "Your turn, 45 seconds: explain the problem with Renata, the rules the team wrote, and what you think about telling Mr. Reed.",
    "es": "Tu turno, 45 segundos: explica el problema con Renata, las reglas que escribió el equipo y qué opinas de decirle al señor Reed."
  },
  "continueWith": [
    "The problem was ...",
    "They wrote three rules: ...",
    "In my opinion, telling Mr. Reed is ..."
  ],
  "cliffhanger": {
    "en": "The new teacher in zone two. Half the class walked out. I think we need you here.",
    "es": "El maestro nuevo de la zona dos. La mitad de la clase se salió. Creo que te necesitamos aquí."
  }
};
