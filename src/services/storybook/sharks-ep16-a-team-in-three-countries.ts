import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/sharks-ep16-a-team-in-three-countries/cover.jpg";
import s1 from "@/assets/storybook/sharks-ep16-a-team-in-three-countries/s1.jpg";
import s2 from "@/assets/storybook/sharks-ep16-a-team-in-three-countries/s2.jpg";
import s3 from "@/assets/storybook/sharks-ep16-a-team-in-three-countries/s3.jpg";
import s4 from "@/assets/storybook/sharks-ep16-a-team-in-three-countries/s4.jpg";
import s5 from "@/assets/storybook/sharks-ep16-a-team-in-three-countries/s5.jpg";
import s6 from "@/assets/storybook/sharks-ep16-a-team-in-three-countries/s6.jpg";
import s7 from "@/assets/storybook/sharks-ep16-a-team-in-three-countries/s7.jpg";
import s8 from "@/assets/storybook/sharks-ep16-a-team-in-three-countries/s8.jpg";
import s9 from "@/assets/storybook/sharks-ep16-a-team-in-three-countries/s9.jpg";
import s10 from "@/assets/storybook/sharks-ep16-a-team-in-three-countries/s10.jpg";
import s11 from "@/assets/storybook/sharks-ep16-a-team-in-three-countries/s11.jpg";

export const SHARKS_EP16_A_TEAM_IN_THREE_COUNTRIES: StorybookEpisode = {
  "id": "sharks-ep16-a-team-in-three-countries",
  "moduleId": "sharks",
  "week": 4,
  "title": "A team in three countries",
  "titleEs": "Un equipo en tres países",
  "episodeLabel": {
    "en": "Season 8 · Episode 16",
    "es": "Temporada 8 · Episodio 16"
  },
  "previously": [
    {
      "en": "Vale drove three hours to San Miguel, taught a live class, and won the client back with a free pilot month.",
      "es": "Vale manejó tres horas a San Miguel, dio una clase en vivo y recuperó al cliente con un mes piloto gratis."
    },
    {
      "en": "The team now operates in three countries with a staff built for only one city.",
      "es": "El equipo ahora opera en tres países con un personal hecho para una sola ciudad."
    }
  ],
  "reviewWords": [
    { "word": "commitment", "es": "compromiso" },
    { "word": "credibility", "es": "credibilidad" },
    { "word": "standards", "es": "estándares" },
    { "word": "reliable", "es": "confiable" }
  ],
  "blurb": {
    "en": "Three countries, three timezones, one whiteboard. When the Guatemala supervisor resigns mid-transition, Vale has to fix the system, not blame the person.",
    "es": "Tres países, tres husos horarios, una sola pizarra. Cuando el supervisor de Guatemala renuncia a medio camino, Vale tiene que arreglar el sistema, no culpar a la persona."
  },
  "cover": cover,
  "voice": "girl",
  "scenes": [
    {
      "id": "s1",
      "image": s1,
      "imageAlt": "Vale, Dani and Camila stand around one whiteboard in San Salvador with three countries listed on it.",
      "text": "Okay, we have active groups in three countries and only one whiteboard in San Salvador. How do we start?",
      "es": "Okay, tenemos grupos activos en tres países y una sola pizarra en San Salvador. ¿Cómo empezamos?",
      "speaker": "vale",
      "cast": ["vale", "dani", "camila"],
      "lines": [
        {
          "speaker": "vale",
          "text": "Okay, we have active groups in three countries and only one whiteboard in San Salvador. How do we start?",
          "es": "Okay, tenemos grupos activos en tres países y una sola pizarra en San Salvador. ¿Cómo empezamos?"
        },
        {
          "speaker": "camila",
          "text": "First, timezones. Mexico is one hour behind, and Guatemala matches us. My proposal: an overlap window from nine to eleven.",
          "es": "Primero, los husos horarios. México está una hora atrás, y Guatemala coincide con nosotros. Mi propuesta: una ventana de traslape de nueve a once."
        },
        {
          "speaker": "dani",
          "text": "And shared documents. If every country keeps its reports in a different folder, we lose control fast.",
          "es": "Y documentos compartidos. Si cada país guarda sus reportes en una carpeta distinta, perdemos el control rápido."
        }
      ],
      "words": [
        { "word": "timezone", "es": "huso horario" },
        { "word": "overlap", "es": "traslape" },
        { "word": "documents", "es": "documentos" }
      ]
    },
    {
      "id": "s2",
      "image": s2,
      "imageAlt": "Vale writes a short policy list on the whiteboard while Camila and Dani watch.",
      "text": "Good. One clear policy: one sheet per week, one check-in meeting, and zero \"who is doing this\" emails.",
      "es": "Bien. Una política clara: una hoja por semana, una reunión de seguimiento, y cero correos de \"¿quién hace esto?\".",
      "speaker": "vale",
      "cast": ["vale", "camila", "dani"],
      "lines": [
        {
          "speaker": "vale",
          "text": "Good. One clear policy: one sheet per week, one check-in meeting, and zero \"who is doing this\" emails.",
          "es": "Bien. Una política clara: una hoja por semana, una reunión de seguimiento, y cero correos de \"¿quién hace esto?\"."
        },
        {
          "speaker": "camila",
          "text": "That is delegating, not abandoning. Each country keeps a local leader, but the standard stays the same everywhere.",
          "es": "Eso es delegar, no abandonar. Cada país mantiene un líder local, pero el estándar sigue siendo el mismo en todos lados."
        },
        {
          "speaker": "dani",
          "text": "I can coordinate directly with Guatemala if they give me access to their calendar.",
          "es": "Puedo coordinar directamente con Guatemala si me dan acceso a su calendario."
        }
      ],
      "words": [
        { "word": "policy", "es": "política" },
        { "word": "delegate", "es": "delegar" },
        { "word": "leader", "es": "líder" }
      ]
    },
    {
      "id": "s3",
      "image": s3,
      "imageAlt": "Lucía appears on a laptop video call from her office in Guatemala looking worried while Vale and Camila listen.",
      "text": "Vale, I have bad news. Our supervisor resigned this morning. He says the workload is too high.",
      "es": "Vale, tengo malas noticias. Nuestro supervisor renunció esta mañana. Dice que la carga de trabajo es demasiado alta.",
      "speaker": "lucia",
      "cast": ["lucia", "vale", "camila"],
      "lines": [
        {
          "speaker": "lucia",
          "text": "Vale, I have bad news. Our supervisor resigned this morning. He says the workload is too high.",
          "es": "Vale, tengo malas noticias. Nuestro supervisor renunció esta mañana. Dice que la carga de trabajo es demasiado alta."
        },
        {
          "speaker": "vale",
          "text": "He resigned? With no transition, and no handoff of his files?",
          "es": "¿Renunció? ¿Sin transición y sin entregar sus archivos?"
        },
        {
          "speaker": "lucia",
          "text": "Exactly. He just told me to figure it out myself.",
          "es": "Exacto. Solo me dijo que yo me las arreglara."
        }
      ],
      "words": [
        { "word": "resigned", "es": "renunció" },
        { "word": "workload", "es": "carga de trabajo" },
        { "word": "transition", "es": "transición" }
      ]
    },
    {
      "id": "s4",
      "image": s4,
      "imageAlt": "Camila and Dani talk seriously in the office while Vale listens with her arms crossed, thinking.",
      "text": "This could fall apart. Guatemala is our newest country, and it just lost its only supervisor.",
      "es": "Esto podría desmoronarse. Guatemala es nuestro país más nuevo, y acaba de perder a su único supervisor.",
      "speaker": "camila",
      "cast": ["camila", "dani", "vale"],
      "lines": [
        {
          "speaker": "camila",
          "text": "This could fall apart. Guatemala is our newest country, and it just lost its only supervisor.",
          "es": "Esto podría desmoronarse. Guatemala es nuestro país más nuevo, y acaba de perder a su único supervisor."
        },
        {
          "speaker": "dani",
          "text": "It is not Lucía's fault. It is the system's fault: we gave her responsibility without any support.",
          "es": "No es culpa de Lucía. Es culpa del sistema: le dimos responsabilidad sin ningún apoyo."
        },
        {
          "speaker": "vale",
          "text": "Then let us fix the system, not blame the supervisor who left.",
          "es": "Entonces arreglemos el sistema, no culpemos al supervisor que se fue."
        }
      ],
      "words": [
        { "word": "fault", "es": "culpa" },
        { "word": "support", "es": "apoyo" },
        { "word": "responsibility", "es": "responsabilidad" }
      ]
    },
    {
      "id": "s5",
      "image": s5,
      "imageAlt": "Vale points at Lucía's video call window on the laptop screen with confidence while Dani and Camila stand beside her.",
      "text": "Lucía, you are the coordinator now. We are not leaving you alone. Dani will support you for two weeks.",
      "es": "Lucía, tú eres la coordinadora ahora. No te dejamos sola. Dani te apoyará durante dos semanas.",
      "speaker": "vale",
      "cast": ["vale", "dani", "camila"],
      "lines": [
        {
          "speaker": "vale",
          "text": "Lucía, you are the coordinator now. We are not leaving you alone. Dani will support you for two weeks.",
          "es": "Lucía, tú eres la coordinadora ahora. No te dejamos sola. Dani te apoyará durante dos semanas."
        },
        {
          "speaker": "dani",
          "text": "I travel tomorrow. We will review her onboarding, her reports, and her schedule together.",
          "es": "Yo viajo mañana. Revisamos juntos su incorporación, sus reportes y sus horarios."
        },
        {
          "speaker": "camila",
          "text": "And I will redesign the dashboard so everyone sees the same information in real time.",
          "es": "Y yo rediseño el panel para que todos vean la misma información en tiempo real."
        }
      ],
      "words": [
        { "word": "coordinator", "es": "coordinadora" },
        { "word": "onboarding", "es": "incorporación" },
        { "word": "dashboard", "es": "panel de datos" }
      ]
    },
    {
      "id": "s6",
      "image": s6,
      "imageAlt": "Lucía smiles with relief on the video call while Vale and Camila nod supportively from the San Salvador office.",
      "text": "Can Dani really come? Two weeks is a long time for one person to give away.",
      "es": "¿De verdad puede venir Dani? Dos semanas es mucho tiempo para que una persona lo dé.",
      "speaker": "lucia",
      "cast": ["lucia", "vale", "camila"],
      "lines": [
        {
          "speaker": "lucia",
          "text": "Can Dani really come? Two weeks is a long time for one person to give away.",
          "es": "¿De verdad puede venir Dani? Dos semanas es mucho tiempo para que una persona lo dé."
        },
        {
          "speaker": "vale",
          "text": "Yes. But you have to make the decisions, Lucía, not just receive the help.",
          "es": "Sí. Pero tú tienes que tomar las decisiones, Lucía, no solo recibir la ayuda."
        },
        {
          "speaker": "lucia",
          "text": "Understood. I will train my own internal replacement so this never depends on one single person again.",
          "es": "Entendido. Entrenaré a mi propio reemplazo interno para que esto nunca vuelva a depender de una sola persona."
        }
      ],
      "words": [
        { "word": "decisions", "es": "decisiones" },
        { "word": "replacement", "es": "reemplazo" },
        { "word": "depend", "es": "depender" }
      ]
    },
    {
      "id": "s7",
      "image": s7,
      "imageAlt": "Dani stands confidently in front of Vale and Camila in the San Salvador office, proposing a new rule.",
      "text": "Vale, I want to propose a rule: no country should ever have only one point of contact. Always two.",
      "es": "Vale, quiero proponer una regla: ningún país debería tener solo un punto de contacto. Siempre dos.",
      "speaker": "dani",
      "cast": ["dani", "vale", "camila"],
      "lines": [
        {
          "speaker": "dani",
          "text": "Vale, I want to propose a rule: no country should ever have only one point of contact. Always two.",
          "es": "Vale, quiero proponer una regla: ningún país debería tener solo un punto de contacto. Siempre dos."
        },
        {
          "speaker": "vale",
          "text": "That costs more headquarters time. But it stops one resignation from stopping the whole operation.",
          "es": "Eso cuesta más tiempo de la oficina central. Pero evita que una sola renuncia detenga toda la operación."
        },
        {
          "speaker": "camila",
          "text": "And that is exactly what companies that really grow end up doing.",
          "es": "Y eso es exactamente lo que terminan haciendo las empresas que realmente crecen."
        }
      ],
      "words": [
        { "word": "headquarters", "es": "oficina central" },
        { "word": "resignation", "es": "renuncia" },
        { "word": "operation", "es": "operación" }
      ]
    },
    {
      "id": "s8",
      "image": s8,
      "imageAlt": "Camila shows salary numbers on her laptop screen to Lucía while Vale looks at the dashboard nearby.",
      "text": "I can do it if Camila and I sort out the salary ranges for the new hires this week.",
      "es": "Puedo hacerlo si Camila y yo resolvemos los rangos salariales de las nuevas contrataciones esta semana.",
      "speaker": "lucia",
      "cast": ["lucia", "camila", "vale"],
      "lines": [
        {
          "speaker": "lucia",
          "text": "I can do it if Camila and I sort out the salary ranges for the new hires this week.",
          "es": "Puedo hacerlo si Camila y yo resolvemos los rangos salariales de las nuevas contrataciones esta semana."
        },
        {
          "speaker": "camila",
          "text": "We are on the same wavelength, Lucía. I already have the numbers ready on my laptop.",
          "es": "Estamos en la misma sintonía, Lucía. Ya tengo los números listos en mi laptop."
        },
        {
          "speaker": "vale",
          "text": "Send me the final policy tonight, and I will approve it before the Guatemala office opens tomorrow.",
          "es": "Envíame la política final esta noche, y la aprobaré antes de que abra la oficina de Guatemala mañana."
        }
      ],
      "words": [
        { "word": "salary", "es": "salario" },
        { "word": "sort out", "es": "resolver" },
        { "word": "approve", "es": "aprobar" }
      ]
    },
    {
      "id": "s9",
      "image": s9,
      "imageAlt": "Vale, Dani and Camila gather around the whiteboard again, now with a clear, organized plan written on it.",
      "text": "Let's be clear: we are not three separate countries anymore. We are one team in three timezones.",
      "es": "Que quede claro: ya no somos tres países separados. Somos un solo equipo en tres husos horarios.",
      "speaker": "vale",
      "cast": ["vale", "dani", "camila"],
      "lines": [
        {
          "speaker": "vale",
          "text": "Let's be clear: we are not three separate countries anymore. We are one team in three timezones.",
          "es": "Que quede claro: ya no somos tres países separados. Somos un solo equipo en tres husos horarios."
        },
        {
          "speaker": "dani",
          "text": "So tomorrow I have a flight to Guatemala. My bag is already packed.",
          "es": "Entonces mañana tengo un vuelo a Guatemala. Mi maleta ya está lista."
        },
        {
          "speaker": "camila",
          "text": "And I will send everyone the new dashboard before midnight, remote and coordinated at the same time.",
          "es": "Y yo les envío a todos el nuevo panel antes de medianoche, remoto y coordinado al mismo tiempo."
        }
      ],
      "words": [
        { "word": "remote", "es": "remoto" },
        { "word": "coordinate", "es": "coordinar" },
        { "word": "flight", "es": "vuelo" }
      ]
    },
    {
      "id": "s10",
      "image": s10,
      "imageAlt": "Dani checks his phone with a proud smile while Vale and Camila high-five near the whiteboard.",
      "text": "This is the first time we solve a crisis in three countries without one single person carrying it alone.",
      "es": "Esta es la primera vez que resolvemos una crisis en tres países sin que una sola persona la cargue sola.",
      "speaker": "dani",
      "cast": ["dani", "vale", "camila"],
      "lines": [
        {
          "speaker": "dani",
          "text": "This is the first time we solve a crisis in three countries without one single person carrying it alone.",
          "es": "Esta es la primera vez que resolvemos una crisis en tres países sin que una sola persona la cargue sola."
        },
        {
          "speaker": "vale",
          "text": "Good systems check in on people before people burn out, Dani. That is the whole point.",
          "es": "Los buenos sistemas se reportan con la gente antes de que la gente se agote, Dani. Ese es todo el punto."
        },
        {
          "speaker": "camila",
          "text": "Then let's document it, so the next resignation is a plan, not a panic.",
          "es": "Entonces documentémoslo, para que la próxima renuncia sea un plan, no un pánico."
        }
      ],
      "words": [
        { "word": "crisis", "es": "crisis" },
        { "word": "check in", "es": "reportarse" },
        { "word": "document", "es": "documentar" }
      ]
    },
    {
      "id": "s11",
      "image": s11,
      "imageAlt": "Lucía speaks urgently into her laptop camera from Guatemala while Vale leans in close to listen on the other end.",
      "text": "Vale, before we hang up... someone in Monterrey called our office asking about \"the academy that is growing fast.\" He sounded interested.",
      "es": "Vale, antes de colgar... alguien en Monterrey llamó a nuestra oficina preguntando por \"la academia que crece rápido\". Sonaba interesado.",
      "speaker": "lucia",
      "cast": ["lucia", "vale"],
      "lines": [
        {
          "speaker": "lucia",
          "text": "Vale, before we hang up... someone in Monterrey called our office asking about \"the academy that is growing fast.\" He sounded interested.",
          "es": "Vale, antes de colgar... alguien en Monterrey llamó a nuestra oficina preguntando por \"la academia que crece rápido\". Sonaba interesado."
        },
        {
          "speaker": "vale",
          "text": "Interested how? Did he leave a name, or just a number?",
          "es": "¿Interesado cómo? ¿Dejó un nombre, o solo un número?"
        },
        {
          "speaker": "lucia",
          "text": "Just a number, and one strange line: he said he represents a woman with money to invest.",
          "es": "Solo un número, y una frase extraña: dijo que representa a una mujer con dinero para invertir."
        }
      ],
      "words": [
        { "word": "interested", "es": "interesado" },
        { "word": "represents", "es": "representa" },
        { "word": "invest", "es": "invertir" }
      ]
    }
  ],
  "quizzes": [
    {
      "id": "q1",
      "afterScene": "s3",
      "questionEn": "Why does the Guatemalan supervisor resign?",
      "questionEs": "¿Por qué renuncia el supervisor de Guatemala?",
      "options": [
        { "label": "Because the workload is too high and he received no support.", "emoji": "😓" },
        { "label": "Because he got a better salary somewhere else.", "emoji": "💰" },
        { "label": "Because the office in Guatemala closed.", "emoji": "🚪" }
      ],
      "answer": 0,
      "sayIt": "He resigned because the workload was too high and there was no support.",
      "sayItEs": "Ejemplo: «He resigned because the workload was too high and there was no support.»",
      "sayItAskEn": "How would you organize a team spread across three countries?",
      "sayItAskEs": "¿Cómo organizarías un equipo repartido en tres países?",
      "sayItCheck": {
        "target": "I would *",
        "altTargets": [
          "First, I would *",
          "My plan would be to *"
        ]
      }
    },
    {
      "id": "q2",
      "afterScene": "s7",
      "questionEn": "What new rule does Dani propose for every country?",
      "questionEs": "¿Qué nueva regla propone Dani para cada país?",
      "options": [
        { "label": "No country should have only one point of contact — always two.", "emoji": "🤝" },
        { "label": "Every country should close on Fridays.", "emoji": "🚫" },
        { "label": "Every country should have its own separate app.", "emoji": "📱" }
      ],
      "answer": 0,
      "sayIt": "Dani proposes that every country should always have two points of contact.",
      "sayItEs": "Ejemplo: «Dani proposes that every country should always have two points of contact.»",
      "sayItAskEn": "What would you do if your best teammate resigned suddenly?",
      "sayItAskEs": "¿Qué harías si tu mejor compañero de equipo renunciara de repente?",
      "sayItCheck": {
        "target": "I would check *, redistribute *, and ask for *",
        "altTargets": [
          "First I would *, then I would *",
          "I would *"
        ]
      }
    },
    {
      "id": "q3",
      "afterScene": "s11",
      "questionEn": "What does Lucía say about the phone call from Monterrey?",
      "questionEs": "¿Qué dice Lucía sobre la llamada de Monterrey?",
      "options": [
        { "label": "Someone interested in the fast-growing academy called, saying he represents an investor.", "emoji": "📞" },
        { "label": "A student in Monterrey wants a refund.", "emoji": "😴" },
        { "label": "The Monterrey office is closing down.", "emoji": "🛑" }
      ],
      "answer": 0,
      "sayIt": "Someone from Monterrey called asking about the academy and said he represents an investor.",
      "sayItEs": "Ejemplo: «Someone from Monterrey called asking about the academy and said he represents an investor.»",
      "sayItAskEn": "Summarize the crisis, the decision, and the next step for the team.",
      "sayItAskEs": "Resume la crisis, la decisión y el siguiente paso del equipo.",
      "sayItCheck": {
        "target": "The problem was *, the decision was *, and next they *",
        "altTargets": [
          "First *, then *, finally *",
          "They decided *"
        ]
      }
    }
  ],
  "mindsetCard": {
    "afterScene": "s6",
    "phrase": "I can carry responsibility and still ask for help.",
    "es": "Puedo cargar con la responsabilidad y aun así pedir ayuda."
  },
  "habitCard": {
    "afterScene": "s5",
    "phrase": "English is easy when I confirm the plan out loud before I hang up.",
    "es": "El inglés es fácil cuando confirmo el plan en voz alta antes de colgar.",
    "model": "camila",
    "modelActionEs": "Camila repite el acuerdo del dashboard antes de cerrar la llamada."
  },
  "expressions": [
    {
      "phrase": "check in",
      "variants": ["check in", "checks in"],
      "es": "reportarse brevemente con el equipo",
      "kind": "phrasal",
      "example": "Good systems check in on people before people burn out, Dani. That is the whole point.",
      "exampleEs": "Los buenos sistemas se reportan con la gente antes de que la gente se agote, Dani. Ese es todo el punto."
    },
    {
      "phrase": "sort out",
      "variants": ["sort out", "sorts out"],
      "es": "resolver o poner en orden",
      "kind": "phrasal",
      "example": "I can do it if Camila and I sort out the salary ranges for the new hires this week.",
      "exampleEs": "Puedo hacerlo si Camila y yo resolvemos los rangos salariales de las nuevas contrataciones esta semana."
    },
    {
      "phrase": "on the same wavelength",
      "es": "pensar igual, entenderse sin explicar mucho",
      "kind": "idiom",
      "example": "We are on the same wavelength, Lucía. I already have the numbers ready on my laptop.",
      "exampleEs": "Estamos en la misma sintonía, Lucía. Ya tengo los números listos en mi laptop."
    }
  ],
  "finaleSeconds": 30,
  "continuePrompt": {
    "en": "Your turn, 30 seconds: describe your team, one problem you had, and how you coordinated to fix it.",
    "es": "Tu turno, 30 segundos: describe tu equipo, un problema que tuviste y cómo coordinaron para resolverlo."
  },
  "continueWith": [
    "My team works in ...",
    "The biggest problem was ...",
    "We coordinated it by ..."
  ],
  "cliffhanger": {
    "en": "Just a number, and one strange line: he said he represents a woman with money to invest.",
    "es": "Solo un número, y una frase extraña: dijo que representa a una mujer con dinero para invertir."
  }
};
