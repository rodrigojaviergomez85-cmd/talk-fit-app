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
      "en": "Vale and Renata agreed on rules: Kids together, corporate clients separate.",
      "es": "Vale y Renata acordaron reglas: Kids juntas, clientes corporativos separados."
    },
    {
      "en": "At night, Lucía called from Guatemala: a class went wrong and parents are upset.",
      "es": "Por la noche, Lucía llamó desde Guatemala: una clase salió mal y los padres están molestos."
    }
  ],
  "reviewWords": [
    {
      "word": "upset",
      "es": "molestos"
    },
    {
      "word": "method",
      "es": "método"
    },
    {
      "word": "teacher",
      "es": "maestro"
    }
  ],
  "blurb": {
    "en": "A class in Guatemala failed because the teacher never received training. Vale looks into the root cause, owns up to the mistake, and pauses growth until every teacher is ready.",
    "es": "Una clase en Guatemala falló porque el maestro nunca recibió capacitación. Vale investiga la causa raíz, admite el error y pausa el crecimiento hasta que cada maestro esté listo."
  },
  "cover": cover,
  "voice": "girl",
  "scenes": [
    {
      "id": "s1",
      "image": s1,
      "imageAlt": "Lucía explains from Guatemala by video call how the new teacher's class collapsed.",
      "text": "The class started at four. By four twenty, half the children had walked out with their parents.",
      "es": "La clase empezó a las cuatro. Para las cuatro y veinte, la mitad de los niños se había salido con sus padres.",
      "speaker": "lucia",
      "cast": ["lucia", "vale"],
      "lines": [
        {
          "speaker": "lucia",
          "text": "The class started at four. By four twenty, half the children had walked out with their parents.",
          "es": "La clase empezó a las cuatro. Para las cuatro y veinte, la mitad de los niños se había salido con sus padres."
        },
        {
          "speaker": "vale",
          "text": "Walked out? Lucía, who trained this teacher before we put him in front of twelve families?",
          "es": "¿Se salieron? Lucía, ¿quién capacitó a este maestro antes de ponerlo frente a doce familias?"
        },
        {
          "speaker": "lucia",
          "text": "Nobody, Vale. He was untrained. We hired him on Thursday and he taught alone on Monday.",
          "es": "Nadie, Vale. No estaba capacitado. Lo contratamos el jueves y enseñó solo el lunes."
        }
      ],
      "words": [
        { "word": "walked out", "es": "se salieron" },
        { "word": "untrained", "es": "sin capacitación" },
        { "word": "hired", "es": "contratamos" }
      ]
    },
    {
      "id": "s2",
      "image": s2,
      "imageAlt": "Vale takes responsibility at the office while Dani and Camila listen seriously.",
      "text": "Then this is not his fault, and it is not yours. It is mine. I approved a class without training.",
      "es": "Entonces no es culpa de él, ni tuya. Es mía. Yo aprobé una clase sin capacitación.",
      "speaker": "vale",
      "cast": ["vale", "dani", "camila"],
      "lines": [
        {
          "speaker": "vale",
          "text": "Then this is not his fault, and it is not yours. It is mine. I approved a class without training.",
          "es": "Entonces no es culpa de él, ni tuya. Es mía. Yo aprobé una clase sin capacitación."
        },
        {
          "speaker": "dani",
          "text": "You approved the calendar, yes, but all of us signed the plan. We dropped the ball together.",
          "es": "Tú aprobaste el calendario, sí, pero todos firmamos el plan. La regamos juntos."
        },
        {
          "speaker": "camila",
          "text": "Agreed. Now, before we apologize, let us look into what actually happened inside that classroom.",
          "es": "De acuerdo. Ahora, antes de disculparnos, investiguemos qué pasó realmente dentro de esa clase."
        }
      ],
      "words": [
        { "word": "fault", "es": "culpa" },
        { "word": "approved", "es": "aprobé" },
        { "word": "dropped the ball", "es": "la regamos / fallamos" }
      ]
    },
    {
      "id": "s3",
      "image": s3,
      "imageAlt": "Lucía shows the class recording on her screen while the team watches silently.",
      "text": "So the root cause is simple: we sent a teacher to do our method without ever teaching him the method.",
      "es": "Así que la causa raíz es simple: mandamos a un maestro a usar nuestro método sin haberle enseñado el método.",
      "speaker": "vale",
      "cast": ["lucia", "vale", "dani"],
      "lines": [
        {
          "speaker": "lucia",
          "text": "I watched the recording. He read from a book for forty minutes. No games, no movement, no smiles.",
          "es": "Vi la grabación. Leyó de un libro por cuarenta minutos. Sin juegos, sin movimiento, sin sonrisas."
        },
        {
          "speaker": "vale",
          "text": "So the root cause is simple: we sent a teacher to do our method without ever teaching him the method.",
          "es": "Así que la causa raíz es simple: mandamos a un maestro a usar nuestro método sin haberle enseñado el método."
        },
        {
          "speaker": "dani",
          "text": "And the parents paid for the method. They have every right to be angry.",
          "es": "Y los padres pagaron por el método. Tienen todo el derecho de estar enojados."
        }
      ],
      "words": [
        { "word": "recording", "es": "grabación" },
        { "word": "root cause", "es": "causa raíz" },
        { "word": "angry", "es": "enojados" }
      ]
    },
    {
      "id": "s4",
      "image": s4,
      "imageAlt": "Vale writes an apology plan on the whiteboard while Lucía nods from the screen.",
      "text": "First we own up to it, in person. Then we offer every family a free new class with our best teacher.",
      "es": "Primero lo admitimos, en persona. Luego ofrecemos a cada familia una clase nueva gratis con nuestra mejor maestra.",
      "speaker": "vale",
      "cast": ["vale", "lucia"],
      "lines": [
        {
          "speaker": "vale",
          "text": "First we own up to it, in person. Then we offer every family a free new class with our best teacher.",
          "es": "Primero lo admitimos, en persona. Luego ofrecemos a cada familia una clase nueva gratis con nuestra mejor maestra."
        },
        {
          "speaker": "lucia",
          "text": "The parents meet on Saturday morning. If you are serious, Vale, they want to hear it from you.",
          "es": "Los padres se reúnen el sábado por la mañana. Si hablas en serio, Vale, quieren escucharlo de ti."
        },
        {
          "speaker": "vale",
          "text": "Then I am on the bus Friday night. An apology on the phone is half an apology.",
          "es": "Entonces voy en el autobús del viernes por la noche. Una disculpa por teléfono es media disculpa."
        }
      ],
      "words": [
        { "word": "own up to", "es": "admitir la culpa" },
        { "word": "apology", "es": "disculpa" },
        { "word": "free", "es": "gratis" }
      ]
    },
    {
      "id": "s5",
      "image": s5,
      "imageAlt": "Dani raises a deeper concern about the system while Vale drinks her coffee.",
      "text": "We opened three groups in Guatemala in one month. We are growing faster than we can train people.",
      "es": "Abrimos tres grupos en Guatemala en un mes. Estamos creciendo más rápido de lo que podemos capacitar gente.",
      "speaker": "dani",
      "cast": ["dani", "vale"],
      "lines": [
        {
          "speaker": "dani",
          "text": "Going is good. But Vale, one apology does not fix the system that produced this.",
          "es": "Ir es bueno. Pero Vale, una disculpa no arregla el sistema que produjo esto."
        },
        {
          "speaker": "vale",
          "text": "Explain.",
          "es": "Explica."
        },
        {
          "speaker": "dani",
          "text": "We opened three groups in Guatemala in one month. We are growing faster than we can train people.",
          "es": "Abrimos tres grupos en Guatemala en un mes. Estamos creciendo más rápido de lo que podemos capacitar gente."
        }
      ],
      "words": [
        { "word": "system", "es": "sistema" },
        { "word": "produced", "es": "produjo" },
        { "word": "faster", "es": "más rápido" }
      ]
    },
    {
      "id": "s6",
      "image": s6,
      "imageAlt": "Camila counts cities on her fingers as the team realizes how fast they have grown.",
      "text": "He is right. In January we had one city. Today we have four, plus Kids, plus Monterrey soon.",
      "es": "Él tiene razón. En enero teníamos una ciudad. Hoy tenemos cuatro, más Kids, más Monterrey pronto.",
      "speaker": "camila",
      "cast": ["camila", "vale", "dani"],
      "lines": [
        {
          "speaker": "camila",
          "text": "He is right. In January we had one city. Today we have four, plus Kids, plus Monterrey soon.",
          "es": "Él tiene razón. En enero teníamos una ciudad. Hoy tenemos cuatro, más Kids, más Monterrey pronto."
        },
        {
          "speaker": "vale",
          "text": "And every new group needs a trained teacher, and training takes me two full weeks per person.",
          "es": "Y cada grupo nuevo necesita un maestro capacitado, y la capacitación me toma dos semanas completas por persona."
        },
        {
          "speaker": "camila",
          "text": "Two weeks you do not have. Your calendar is already full until the end of the month.",
          "es": "Dos semanas que no tienes. Tu calendario ya está lleno hasta fin de mes."
        }
      ],
      "words": [
        { "word": "soon", "es": "pronto" },
        { "word": "calendar", "es": "calendario" },
        { "word": "full", "es": "lleno" }
      ]
    },
    {
      "id": "s7",
      "image": s7,
      "imageAlt": "Vale announces a pause on new groups while Lucía reacts with surprise from Guatemala.",
      "text": "Then we pause. No new groups in Guatemala until every active teacher passes our training.",
      "es": "Entonces hacemos una pausa. Nada de grupos nuevos en Guatemala hasta que cada maestro activo pase nuestra capacitación.",
      "speaker": "vale",
      "cast": ["vale", "lucia"],
      "lines": [
        {
          "speaker": "vale",
          "text": "Then we pause. No new groups in Guatemala until every active teacher passes our training.",
          "es": "Entonces hacemos una pausa. Nada de grupos nuevos en Guatemala hasta que cada maestro activo pase nuestra capacitación."
        },
        {
          "speaker": "lucia",
          "text": "Some parents will ask for refunds. Pausing looks like weakness to them.",
          "es": "Algunos padres pedirán reembolsos. Pausar les va a parecer debilidad."
        },
        {
          "speaker": "vale",
          "text": "Pausing is honest. Selling classes we cannot deliver well — that is weakness.",
          "es": "Pausar es honesto. Vender clases que no podemos dar bien — eso sí es debilidad."
        }
      ],
      "words": [
        { "word": "pause", "es": "pausar" },
        { "word": "refunds", "es": "reembolsos" },
        { "word": "weakness", "es": "debilidad" }
      ]
    },
    {
      "id": "s8",
      "image": s8,
      "imageAlt": "Dani and Camila divide the recovery tasks at the office table.",
      "text": "I will reschedule the two new groups and call every family myself. In English, so they hear our level.",
      "es": "Voy a reprogramar los dos grupos nuevos y llamaré a cada familia yo mismo. En inglés, para que escuchen nuestro nivel.",
      "speaker": "dani",
      "cast": ["dani", "camila", "vale"],
      "lines": [
        {
          "speaker": "dani",
          "text": "I will reschedule the two new groups and call every family myself. In English, so they hear our level.",
          "es": "Voy a reprogramar los dos grupos nuevos y llamaré a cada familia yo mismo. En inglés, para que escuchen nuestro nivel."
        },
        {
          "speaker": "camila",
          "text": "And I will prepare a one-page report: what happened, why, and what changes on Monday.",
          "es": "Y yo prepararé un informe de una página: qué pasó, por qué, y qué cambia el lunes."
        },
        {
          "speaker": "vale",
          "text": "Add the recovery plan: free class, new teacher, and a parent meeting with me leading it.",
          "es": "Agrega el plan de recuperación: clase gratis, maestro nuevo, y una reunión de padres dirigida por mí."
        }
      ],
      "words": [
        { "word": "reschedule", "es": "reprogramar" },
        { "word": "report", "es": "informe" },
        { "word": "recovery", "es": "recuperación" }
      ]
    },
    {
      "id": "s9",
      "image": s9,
      "imageAlt": "Lucía smiles with relief on the screen after hearing the whole plan.",
      "text": "Thank you. I was afraid you would blame me from far away. You came closer instead.",
      "es": "Gracias. Temía que me culparas desde lejos. En cambio, te acercaste.",
      "speaker": "lucia",
      "cast": ["lucia", "vale"],
      "lines": [
        {
          "speaker": "lucia",
          "text": "Thank you. I was afraid you would blame me from far away. You came closer instead.",
          "es": "Gracias. Temía que me culparas desde lejos. En cambio, te acercaste."
        },
        {
          "speaker": "vale",
          "text": "Blame travels fast and helps nobody. Help travels slow, so we start early.",
          "es": "La culpa viaja rápido y no ayuda a nadie. La ayuda viaja lento, así que empezamos temprano."
        },
        {
          "speaker": "lucia",
          "text": "Then see you Saturday. I will have every parent in that room, I promise.",
          "es": "Entonces nos vemos el sábado. Tendré a cada padre en esa sala, lo prometo."
        }
      ],
      "words": [
        { "word": "blame", "es": "culpar" },
        { "word": "afraid", "es": "temerosa / con miedo" },
        { "word": "promise", "es": "prometer" }
      ]
    },
    {
      "id": "s10",
      "image": s10,
      "imageAlt": "Dani counts the cost of the week while Vale packs her bag for the bus trip.",
      "text": "Cheaper than a bad reputation. A reputation is the only currency we cannot print.",
      "es": "Más barato que una mala reputación. La reputación es la única moneda que no podemos imprimir.",
      "speaker": "vale",
      "cast": ["dani", "vale"],
      "lines": [
        {
          "speaker": "dani",
          "text": "You just paused growth, paid for free classes, and bought a bus ticket. Expensive Saturday.",
          "es": "Acabas de pausar el crecimiento, pagar clases gratis y comprar un boleto de autobús. Sábado caro."
        },
        {
          "speaker": "vale",
          "text": "Cheaper than a bad reputation. A reputation is the only currency we cannot print.",
          "es": "Más barato que una mala reputación. La reputación es la única moneda que no podemos imprimir."
        },
        {
          "speaker": "dani",
          "text": "That sounds like your grandmother again. Safe trip — and Vale, you are doing the right thing.",
          "es": "Eso suena a tu abuela otra vez. Buen viaje — y Vale, estás haciendo lo correcto."
        }
      ],
      "words": [
        { "word": "reputation", "es": "reputación" },
        { "word": "currency", "es": "moneda" },
        { "word": "the right thing", "es": "lo correcto" }
      ]
    },
    {
      "id": "s11",
      "image": s11,
      "imageAlt": "Camila stops Vale at the door with her laptop open, showing the real numbers.",
      "text": "That is the thing. It is not only this mistake. Sit down — you need to see this.",
      "es": "Ese es el punto. No es solo este error. Siéntate — necesitas ver esto.",
      "speaker": "camila",
      "cast": ["camila", "vale"],
      "lines": [
        {
          "speaker": "camila",
          "text": "Vale, before you pack. I finished the real numbers — Northline, Kids, everything.",
          "es": "Vale, antes de que empagues. Terminé los números reales: Northline, Kids, todo."
        },
        {
          "speaker": "vale",
          "text": "Give me the short version. How much is this mistake costing us?",
          "es": "Dame la versión corta. ¿Cuánto nos está costando este error?"
        },
        {
          "speaker": "camila",
          "text": "That is the thing. It is not only this mistake. Sit down — you need to see this.",
          "es": "Ese es el punto. No es solo este error. Siéntate — necesitas ver esto."
        }
      ],
      "words": [
        { "word": "pack", "es": "empacar" },
        { "word": "short version", "es": "versión corta" },
        { "word": "mistake", "es": "error" }
      ]
    }
  ],
  "quizzes": [
    {
      "id": "q1",
      "afterScene": "s3",
      "questionEn": "What was the root cause of the failed class in Guatemala?",
      "questionEs": "¿Cuál fue la causa raíz de la clase fallida en Guatemala?",
      "options": [
        {
          "label": "The teacher never received Vale's training.",
          "emoji": "🎯"
        },
        {
          "label": "The children were too tired to learn.",
          "emoji": "😴"
        },
        {
          "label": "The classroom was too small.",
          "emoji": "🚪"
        }
      ],
      "answer": 0,
      "sayIt": "She should apologize in person and retrain the teacher.",
      "sayItEs": "Ejemplo: «She should apologize in person and retrain the teacher.»",
      "sayItAskEn": "What should Vale do first to fix this?",
      "sayItAskEs": "¿Qué debería hacer Vale primero para arreglar esto?",
      "sayItCheck": {
        "target": "She should *",
        "altTargets": [
          "Vale should *",
          "First, she should *"
        ]
      }
    },
    {
      "id": "q2",
      "afterScene": "s7",
      "questionEn": "What difficult decision does Vale make?",
      "questionEs": "¿Qué decisión difícil toma Vale?",
      "options": [
        {
          "label": "Pause new groups until every active teacher passes the training.",
          "emoji": "⏸️"
        },
        {
          "label": "Open more groups to earn money faster.",
          "emoji": "💸"
        },
        {
          "label": "Close the academy in Guatemala forever.",
          "emoji": "🔒"
        }
      ],
      "answer": 0,
      "sayIt": "I agree because quality matters more than speed.",
      "sayItEs": "Ejemplo: «I agree because quality matters more than speed.»",
      "sayItAskEn": "Do you agree with pausing growth? Why or why not?",
      "sayItAskEs": "¿Estás de acuerdo con pausar el crecimiento? ¿Por qué?",
      "sayItCheck": {
        "target": "I agree because *",
        "altTargets": [
          "I disagree because *",
          "Yes, because *"
        ]
      }
    },
    {
      "id": "q3",
      "afterScene": "s11",
      "questionEn": "What does Camila announce at the end?",
      "questionEs": "¿Qué anuncia Camila al final?",
      "options": [
        {
          "label": "She finished the real numbers, and Vale needs to see them.",
          "emoji": "📊"
        },
        {
          "label": "She is going on vacation.",
          "emoji": "🏖️"
        },
        {
          "label": "She sold the academy.",
          "emoji": "🏷️"
        }
      ],
      "answer": 0,
      "sayIt": "Vale owned up to the mistake, paused growth, and went to Guatemala.",
      "sayItEs": "Ejemplo: «Vale owned up to the mistake, paused growth, and went to Guatemala.»",
      "sayItAskEn": "Summarize how Vale handled this mistake.",
      "sayItAskEs": "Resume cómo manejó Vale este error.",
      "sayItCheck": {
        "target": "Vale owned up to * and *",
        "altTargets": [
          "She apologized and *",
          "First she *, then *"
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
    "modelActionEs": "Vale admite el error de inmediato y convierte la disculpa en un plan."
  },
  "expressions": [
    {
      "phrase": "look into",
      "es": "investigar / revisar a fondo",
      "kind": "phrasal",
      "example": "Agreed. Now, before we apologize, let us look into what actually happened inside that classroom.",
      "exampleEs": "De acuerdo. Ahora, antes de disculparnos, investiguemos qué pasó realmente dentro de esa clase."
    },
    {
      "phrase": "own up to",
      "es": "admitir la culpa",
      "kind": "phrasal",
      "example": "First we own up to it, in person. Then we offer every family a free new class with our best teacher.",
      "exampleEs": "Primero lo admitimos, en persona. Luego ofrecemos a cada familia una clase nueva gratis con nuestra mejor maestra."
    },
    {
      "phrase": "drop the ball",
      "variants": ["dropped the ball"],
      "es": "fallar en una responsabilidad / regarla",
      "kind": "idiom",
      "example": "You approved the calendar, yes, but all of us signed the plan. We dropped the ball together.",
      "exampleEs": "Tú aprobaste el calendario, sí, pero todos firmamos el plan. La regamos juntos."
    }
  ],
  "finaleSeconds": 30,
  "continuePrompt": {
    "en": "Your turn, 30 seconds: explain what went wrong in Guatemala and what Vale decided to do about it.",
    "es": "Tu turno, 30 segundos: explica qué salió mal en Guatemala y qué decidió hacer Vale."
  },
  "continueWith": [
    "The class failed because ...",
    "Vale decided to ...",
    "In my opinion, her decision was ..."
  ],
  "cliffhanger": {
    "en": "That is the thing. It is not only this mistake. Sit down — you need to see this.",
    "es": "Ese es el punto. No es solo este error. Siéntate — necesitas ver esto."
  }
};
