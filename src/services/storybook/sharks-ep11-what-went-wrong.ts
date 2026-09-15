import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/sharks-ep11-what-went-wrong/cover.jpg";
import s1 from "@/assets/storybook/sharks-ep11-what-went-wrong/s1.jpg";
import s2 from "@/assets/storybook/sharks-ep11-what-went-wrong/s2.jpg";
import s3 from "@/assets/storybook/sharks-ep11-what-went-wrong/s3.jpg";
import s4 from "@/assets/storybook/sharks-ep11-what-went-wrong/s4.jpg";
import s5 from "@/assets/storybook/sharks-ep11-what-went-wrong/s5.jpg";
import s6 from "@/assets/storybook/sharks-ep11-what-went-wrong/s6.jpg";
import s7 from "@/assets/storybook/sharks-ep11-what-went-wrong/s7.jpg";
import s8 from "@/assets/storybook/sharks-ep11-what-went-wrong/s8.jpg";
import s9 from "@/assets/storybook/sharks-ep11-what-went-wrong/s9.jpg";
import s10 from "@/assets/storybook/sharks-ep11-what-went-wrong/s10.jpg";
import s11 from "@/assets/storybook/sharks-ep11-what-went-wrong/s11.jpg";

export const SHARKS_EP11_WHAT_WENT_WRONG: StorybookEpisode = {
  "id": "sharks-ep11-what-went-wrong",
  "moduleId": "sharks",
  "week": 3,
  "title": "What went wrong",
  "titleEs": "Qué salió mal",
  "episodeLabel": {
    "en": "Season 8 · Episode 11",
    "es": "Temporada 8 · Episodio 11"
  },
  "previously": [
    {
      "en": "A failure is only a disaster when nobody explains it.",
      "es": "Una falla solo es un desastre cuando nadie la explica."
    }
  ],
  "reviewWords": [
    {
      "word": "outage",
      "es": "caída del servicio"
    },
    {
      "word": "refund",
      "es": "reembolso"
    },
    {
      "word": "deadline",
      "es": "fecha límite"
    }
  ],
  "blurb": {
    "en": "The platform was down for two hours and forty classes were affected. Renata read the report before we sent it.",
    "es": "La plataforma estuvo caída dos horas y cuarenta clases se vieron afectadas. Renata leyó el reporte antes de que lo enviáramos."
  },
  "cover": cover,
  "voice": "girl",
  "scenes": [
    {
      "id": "s1",
      "image": s1,
      "imageAlt": "Scene 1 of What went wrong.",
      "text": "The platform was down for two hours and forty classes were affected.",
      "es": "La plataforma estuvo caída dos horas y cuarenta clases se vieron afectadas.",
      "speaker": "lucia",
      "cast": [
        "lucia",
        "vale"
      ],
      "lines": [
        {
          "speaker": "lucia",
          "text": "The platform was down for two hours and forty classes were affected.",
          "es": "La plataforma estuvo caída dos horas y cuarenta clases se vieron afectadas."
        }
      ],
      "words": []
    },
    {
      "id": "s2",
      "image": s2,
      "imageAlt": "Scene 2 of What went wrong.",
      "text": "Okay. Before we apologize, I need the root cause, not a guess.",
      "es": "Bien. Antes de disculparnos, necesito la causa raíz, no una suposición.",
      "speaker": "vale",
      "cast": [
        "vale",
        "dani"
      ],
      "lines": [
        {
          "speaker": "vale",
          "text": "Okay. Before we apologize, I need the root cause, not a guess.",
          "es": "Bien. Antes de disculparnos, necesito la causa raíz, no una suposición."
        }
      ],
      "words": []
    },
    {
      "id": "s3",
      "image": s3,
      "imageAlt": "Scene 3 of What went wrong.",
      "text": "The glitch started in the new video server. The downtime was thirty minutes longer than we reported.",
      "es": "La falla empezó en el nuevo servidor de video. La caída duró treinta minutos más de lo que reportamos.",
      "speaker": "dani",
      "cast": [
        "dani",
        "camila"
      ],
      "lines": [
        {
          "speaker": "dani",
          "text": "The glitch started in the new video server. The downtime was thirty minutes longer than we reported.",
          "es": "La falla empezó en el nuevo servidor de video. La caída duró treinta minutos más de lo que reportamos."
        }
      ],
      "words": []
    },
    {
      "id": "s4",
      "image": s4,
      "imageAlt": "Scene 4 of What went wrong.",
      "text": "Three clients already asked for a refund, and Northline escalated it to their director.",
      "es": "Tres clientes ya pidieron reembolso, y Northline lo escaló a su director.",
      "speaker": "camila",
      "cast": [
        "camila",
        "vale"
      ],
      "lines": [
        {
          "speaker": "camila",
          "text": "Three clients already asked for a refund, and Northline escalated it to their director.",
          "es": "Tres clientes ya pidieron reembolso, y Northline lo escaló a su director."
        }
      ],
      "words": []
    },
    {
      "id": "s5",
      "image": s5,
      "imageAlt": "Scene 5 of What went wrong.",
      "text": "Then we own up to it today. A late apology costs more than an honest one.",
      "es": "Entonces lo asumimos hoy. Una disculpa tardía cuesta más que una honesta.",
      "speaker": "vale",
      "cast": [
        "vale",
        "lucia"
      ],
      "lines": [
        {
          "speaker": "vale",
          "text": "Then we own up to it today. A late apology costs more than an honest one.",
          "es": "Entonces lo asumimos hoy. Una disculpa tardía cuesta más que una honesta."
        }
      ],
      "words": []
    },
    {
      "id": "s6",
      "image": s6,
      "imageAlt": "Scene 6 of What went wrong.",
      "text": "I can look into every affected class and build the list by noon.",
      "es": "Puedo revisar cada clase afectada y armar la lista al mediodía.",
      "speaker": "lucia",
      "cast": [
        "lucia",
        "dani"
      ],
      "lines": [
        {
          "speaker": "lucia",
          "text": "I can look into every affected class and build the list by noon.",
          "es": "Puedo revisar cada clase afectada y armar la lista al mediodía."
        }
      ],
      "words": []
    },
    {
      "id": "s7",
      "image": s7,
      "imageAlt": "Scene 7 of What went wrong.",
      "text": "I dropped the ball on testing the server. That one is on me.",
      "es": "Fallé al probar el servidor. Esa es mía.",
      "speaker": "dani",
      "cast": [
        "dani",
        "vale"
      ],
      "lines": [
        {
          "speaker": "dani",
          "text": "I dropped the ball on testing the server. That one is on me.",
          "es": "Fallé al probar el servidor. Esa es mía."
        }
      ],
      "words": []
    },
    {
      "id": "s8",
      "image": s8,
      "imageAlt": "Scene 8 of What went wrong.",
      "text": "Thank you for saying it. Being accountable is faster than being perfect.",
      "es": "Gracias por decirlo. Ser responsable es más rápido que ser perfecto.",
      "speaker": "vale",
      "cast": [
        "vale",
        "camila"
      ],
      "lines": [
        {
          "speaker": "vale",
          "text": "Thank you for saying it. Being accountable is faster than being perfect.",
          "es": "Gracias por decirlo. Ser responsable es más rápido que ser perfecto."
        }
      ],
      "words": []
    },
    {
      "id": "s9",
      "image": s9,
      "imageAlt": "Scene 9 of What went wrong.",
      "text": "Do we offer a refund, or free classes for the affected students?",
      "es": "¿Ofrecemos reembolso, o clases gratis para los estudiantes afectados?",
      "speaker": "camila",
      "cast": [
        "camila",
        "vale"
      ],
      "lines": [
        {
          "speaker": "camila",
          "text": "Do we offer a refund, or free classes for the affected students?",
          "es": "¿Ofrecemos reembolso, o clases gratis para los estudiantes afectados?"
        }
      ],
      "words": []
    },
    {
      "id": "s10",
      "image": s10,
      "imageAlt": "Scene 10 of What went wrong.",
      "text": "Both options, and the client chooses. Send the report with the root cause attached.",
      "es": "Ambas opciones, y el cliente elige. Manda el reporte con la causa raíz adjunta.",
      "speaker": "vale",
      "cast": [
        "vale",
        "dani"
      ],
      "lines": [
        {
          "speaker": "vale",
          "text": "Both options, and the client chooses. Send the report with the root cause attached.",
          "es": "Ambas opciones, y el cliente elige. Manda el reporte con la causa raíz adjunta."
        }
      ],
      "words": []
    },
    {
      "id": "s11",
      "image": s11,
      "imageAlt": "Scene 11 of What went wrong.",
      "text": "Vale, one more thing. Renata read the report before we sent it.",
      "es": "Vale, una cosa más. Renata leyó el reporte antes de que lo enviáramos.",
      "speaker": "dani",
      "cast": [
        "dani"
      ],
      "lines": [
        {
          "speaker": "dani",
          "text": "Vale, one more thing. Renata read the report before we sent it.",
          "es": "Vale, una cosa más. Renata leyó el reporte antes de que lo enviáramos."
        }
      ],
      "words": []
    }
  ],
  "quizzes": [
    {
      "id": "q1",
      "afterScene": "s3",
      "questionEn": "What does Dani admit about the outage?",
      "questionEs": "¿Qué admite Dani sobre la caída?",
      "options": [
        {
          "label": "The glitch started in the new video server. The downtime was thirty minutes longer than we reported.",
          "emoji": "🎯"
        },
        {
          "label": "They lost the contract.",
          "emoji": "🛑"
        },
        {
          "label": "Nobody noticed the problem.",
          "emoji": "❓"
        }
      ],
      "answer": 0,
      "sayIt": "He should explain the root cause to the client.",
      "sayItEs": "Ejemplo: «He should explain the root cause to the client.»",
      "sayItAskEn": "What would you do first after a service failure?",
      "sayItAskEs": "¿Qué harías primero después de una falla del servicio?",
      "sayItCheck": {
        "target": "I would * first",
        "altTargets": [
          "First, I would *",
          "I would look into *"
        ]
      }
    },
    {
      "id": "q2",
      "afterScene": "s7",
      "questionEn": "How does Dani take responsibility?",
      "questionEs": "¿Cómo asume Dani la responsabilidad?",
      "options": [
        {
          "label": "I dropped the ball on testing the server. That one is on me.",
          "emoji": "💬"
        },
        {
          "label": "He blames the client.",
          "emoji": "🙈"
        },
        {
          "label": "He hides the report.",
          "emoji": "🚫"
        }
      ],
      "answer": 0,
      "sayIt": "He owns up to his mistake.",
      "sayItEs": "Ejemplo: «He owns up to his mistake.»",
      "sayItAskEn": "Tell about a time you owned up to a mistake.",
      "sayItAskEs": "Cuenta una vez que asumiste un error.",
      "sayItCheck": {
        "target": "I dropped the ball when *",
        "altTargets": [
          "Once I *",
          "I made a mistake when *"
        ]
      }
    },
    {
      "id": "q3",
      "afterScene": "s11",
      "questionEn": "What is the surprise at the end?",
      "questionEs": "¿Cuál es la sorpresa al final?",
      "options": [
        {
          "label": "Vale, one more thing. Renata read the report before we sent it.",
          "emoji": "⚡"
        },
        {
          "label": "The team goes home early.",
          "emoji": "😴"
        },
        {
          "label": "The platform is deleted.",
          "emoji": "🏖️"
        }
      ],
      "answer": 0,
      "sayIt": "Renata read the report before we sent it.",
      "sayItEs": "Ejemplo: «Renata read the report before we sent it.»",
      "sayItAskEn": "Summarize the failure, the response and the risk.",
      "sayItAskEs": "Resume la falla, la respuesta y el riesgo.",
      "sayItCheck": {
        "target": "The problem was *, so they *, and now *",
        "altTargets": [
          "First *, then *, finally *",
          "They had to *"
        ]
      }
    }
  ],
  "mindsetCard": {
    "afterScene": "s6",
    "phrase": "Mistakes are part of the process. I fix them out loud.",
    "es": "Los errores son parte del proceso. Los corrijo en voz alta."
  },
  "habitCard": {
    "afterScene": "s4",
    "phrase": "English is easy when I report the facts before the feelings.",
    "es": "El inglés es fácil cuando reporto los hechos antes que los sentimientos.",
    "model": "vale",
    "modelActionEs": "Vale reporta los hechos con calma."
  },
  "expressions": [
    {
      "phrase": "look into",
      "variants": [
        "look into"
      ],
      "es": "investigar a fondo",
      "kind": "phrasal",
      "example": "I can look into every affected class and build the list by noon.",
      "exampleEs": "Puedo revisar cada clase afectada y armar la lista al mediodía."
    },
    {
      "phrase": "own up to",
      "variants": [
        "own up to it"
      ],
      "es": "asumir la responsabilidad",
      "kind": "phrasal",
      "example": "Then we own up to it today. A late apology costs more than an honest one.",
      "exampleEs": "Entonces lo asumimos hoy. Una disculpa tardía cuesta más que una honesta."
    },
    {
      "phrase": "drop the ball",
      "variants": [
        "dropped the ball"
      ],
      "es": "fallar en algo que era tu responsabilidad",
      "kind": "idiom",
      "example": "I dropped the ball on testing the server. That one is on me.",
      "exampleEs": "Fallé al probar el servidor. Esa es mía."
    }
  ],
  "finaleSeconds": 30,
  "continuePrompt": {
    "en": "Your turn, 30 seconds: explain what went wrong, who was accountable, and how you fixed it.",
    "es": "Tu turno, 30 segundos: explica qué salió mal, quién fue responsable y cómo lo resolviste."
  },
  "continueWith": [
    "The root cause was ...",
    "We owned up to ...",
    "To prevent it, we will ..."
  ],
  "cliffhanger": {
    "en": "Vale, one more thing. Renata read the report before we sent it.",
    "es": "Vale, una cosa más. Renata leyó el reporte antes de que lo enviáramos."
  }
};
