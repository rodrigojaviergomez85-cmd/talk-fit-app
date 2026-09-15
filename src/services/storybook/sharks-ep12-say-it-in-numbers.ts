import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/sharks-ep12-say-it-in-numbers/cover.jpg";
import s1 from "@/assets/storybook/sharks-ep12-say-it-in-numbers/s1.jpg";
import s2 from "@/assets/storybook/sharks-ep12-say-it-in-numbers/s2.jpg";
import s3 from "@/assets/storybook/sharks-ep12-say-it-in-numbers/s3.jpg";
import s4 from "@/assets/storybook/sharks-ep12-say-it-in-numbers/s4.jpg";
import s5 from "@/assets/storybook/sharks-ep12-say-it-in-numbers/s5.jpg";
import s6 from "@/assets/storybook/sharks-ep12-say-it-in-numbers/s6.jpg";
import s7 from "@/assets/storybook/sharks-ep12-say-it-in-numbers/s7.jpg";
import s8 from "@/assets/storybook/sharks-ep12-say-it-in-numbers/s8.jpg";
import s9 from "@/assets/storybook/sharks-ep12-say-it-in-numbers/s9.jpg";
import s10 from "@/assets/storybook/sharks-ep12-say-it-in-numbers/s10.jpg";
import s11 from "@/assets/storybook/sharks-ep12-say-it-in-numbers/s11.jpg";

export const SHARKS_EP12_SAY_IT_IN_NUMBERS: StorybookEpisode = {
  "id": "sharks-ep12-say-it-in-numbers",
  "moduleId": "sharks",
  "week": 3,
  "title": "Say it in numbers",
  "titleEs": "Dilo con números",
  "episodeLabel": {
    "en": "Season 8 · Episode 12",
    "es": "Temporada 8 · Episodio 12"
  },
  "previously": [
    {
      "en": "The Guatemala class failed because the teacher was never trained.",
      "es": "La clase de Guatemala falló porque el maestro nunca fue capacitado."
    },
    {
      "en": "Vale paused new groups and prepared to apologize to the parents in person.",
      "es": "Vale pausó los grupos nuevos y se preparó para disculparse con los padres en persona."
    }
  ],
  "reviewWords": [
    {
      "word": "root cause",
      "es": "causa raíz"
    },
    {
      "word": "recovery",
      "es": "recuperación"
    },
    {
      "word": "reputation",
      "es": "reputación"
    }
  ],
  "blurb": {
    "en": "Camila breaks down the real numbers: revenue grows, but the margin is thin and retraining burns money. Then the spreadsheet reveals one more uncomfortable truth — a beloved teacher is falling behind.",
    "es": "Camila desglosa los números reales: los ingresos crecen, pero el margen es delgado y la recapacitación quema dinero. Luego la hoja de cálculo revela una verdad incómoda más: un maestro querido se está quedando atrás."
  },
  "cover": cover,
  "voice": "girl",
  "scenes": [
    {
      "id": "s1",
      "image": s1,
      "imageAlt": "Camila opens her spreadsheet on the office table while Vale and Dani sit down.",
      "text": "Sit down, both of you. I will break down the numbers by city, by program and by month, and nobody leaves until we all understand them.",
      "es": "Siéntense, los dos. Voy a desglosar los números por ciudad, por programa y por mes, y nadie se va hasta que todos los entendamos.",
      "speaker": "camila",
      "cast": ["camila", "vale", "dani"],
      "lines": [
        {
          "speaker": "camila",
          "text": "Sit down, both of you. I will break down the numbers by city, by program and by month, and nobody leaves until we all understand them.",
          "es": "Siéntense, los dos. Voy a desglosar los números por ciudad, por programa y por mes, y nadie se va hasta que todos los entendamos."
        },
        {
          "speaker": "vale",
          "text": "That sounds serious. How bad is it?",
          "es": "Eso suena serio. ¿Qué tan mal está?"
        },
        {
          "speaker": "camila",
          "text": "Northline pays well. The problem is what we spend to keep that quality.",
          "es": "Northline paga bien. El problema es lo que gastamos para mantener esa calidad."
        }
      ],
      "words": [
        { "word": "break down", "es": "desglosar" },
        { "word": "spend", "es": "gastar" },
        { "word": "quality", "es": "calidad" }
      ]
    },
    {
      "id": "s2",
      "image": s2,
      "imageAlt": "Camila points at the revenue line and then at the thin margin below it.",
      "text": "Revenue grew forty percent this quarter. Good news. But look at the margin.",
      "es": "Los ingresos crecieron cuarenta por ciento este trimestre. Buena noticia. Pero mira el margen.",
      "speaker": "camila",
      "cast": ["camila", "dani"],
      "lines": [
        {
          "speaker": "camila",
          "text": "Revenue grew forty percent this quarter. Good news. But look at the margin.",
          "es": "Los ingresos crecieron cuarenta por ciento este trimestre. Buena noticia. Pero mira el margen."
        },
        {
          "speaker": "dani",
          "text": "The margin is... thin. Where is the money going?",
          "es": "El margen está... delgado. ¿A dónde se está yendo el dinero?"
        },
        {
          "speaker": "camila",
          "text": "Retraining. Every class that fails costs us a refund, a free class, and a reputation repair that takes weeks of patience.",
          "es": "Recapacitación. Cada clase que falla nos cuesta un reembolso, una clase gratis y una reparación de reputación que toma semanas de paciencia."
        }
      ],
      "words": [
        { "word": "revenue", "es": "ingresos" },
        { "word": "margin", "es": "margen" },
        { "word": "retraining", "es": "recapacitación" }
      ]
    },
    {
      "id": "s3",
      "image": s3,
      "imageAlt": "Vale writes the average cost of one failed class on the whiteboard.",
      "text": "Give me the average. What does one failed class really cost?",
      "es": "Dame el promedio. ¿Cuánto cuesta realmente una clase fallida?",
      "speaker": "vale",
      "cast": ["vale", "camila"],
      "lines": [
        {
          "speaker": "vale",
          "text": "Give me the average. What does one failed class really cost?",
          "es": "Dame el promedio. ¿Cuánto cuesta realmente una clase fallida?"
        },
        {
          "speaker": "camila",
          "text": "My estimate: three hundred dollars, more or less. We had six failed or repeated classes last month alone.",
          "es": "Mi estimado: trescientos dólares, más o menos. Tuvimos seis clases fallidas o repetidas solo el mes pasado."
        },
        {
          "speaker": "vale",
          "text": "One thousand eight hundred dollars gone. That is a full teacher's salary, burned in one month.",
          "es": "Mil ochocientos dólares perdidos. Eso es el salario completo de un maestro, quemado en un mes."
        }
      ],
      "words": [
        { "word": "average", "es": "promedio" },
        { "word": "estimate", "es": "estimado" },
        { "word": "salary", "es": "salario" }
      ]
    },
    {
      "id": "s4",
      "image": s4,
      "imageAlt": "Dani leans over the laptop and asks whether growth is still good news.",
      "text": "Growth without retention is a bucket with a hole in the bottom. Our churn is twelve percent every month.",
      "es": "Crecimiento sin retención es un balde con un agujero en el fondo. Nuestra rotación es doce por ciento cada mes.",
      "speaker": "camila",
      "cast": ["dani", "camila", "vale"],
      "lines": [
        {
          "speaker": "dani",
          "text": "Okay, but growth is still good, right? More students, more invoices, more everything.",
          "es": "Okay, pero el crecimiento sigue siendo bueno, ¿no? Más estudiantes, más facturas, más todo."
        },
        {
          "speaker": "camila",
          "text": "Growth without retention is a bucket with a hole in the bottom. Our churn is twelve percent every month.",
          "es": "Crecimiento sin retención es un balde con un agujero en el fondo. Nuestra rotación es doce por ciento cada mes."
        },
        {
          "speaker": "vale",
          "text": "Twelve percent of students leave every month? That number just ruined my breakfast.",
          "es": "¿Doce por ciento de los estudiantes se va cada mes? Ese número acaba de arruinar mi desayuno."
        }
      ],
      "words": [
        { "word": "invoices", "es": "facturas" },
        { "word": "retention", "es": "retención" },
        { "word": "churn", "es": "rotación de clientes" }
      ]
    },
    {
      "id": "s5",
      "image": s5,
      "imageAlt": "Camila shows the quarterly forecast and the wall the budget will hit in March.",
      "text": "Here is the forecast: if nothing changes, we hit a wall in the quarterly budget by March.",
      "es": "Aquí está el pronóstico: si nada cambia, chocamos contra una pared en el presupuesto trimestral para marzo.",
      "speaker": "camila",
      "cast": ["camila", "vale"],
      "lines": [
        {
          "speaker": "camila",
          "text": "Here is the forecast: if nothing changes, we hit a wall in the quarterly budget by March.",
          "es": "Aquí está el pronóstico: si nada cambia, chocamos contra una pared en el presupuesto trimestral para marzo."
        },
        {
          "speaker": "vale",
          "text": "And if we invest in training first?",
          "es": "¿Y si invertimos primero en capacitación?"
        },
        {
          "speaker": "camila",
          "text": "Then growth slows for one quarter, but the numbers speak for themselves: the margin doubles and the refunds disappear.",
          "es": "Entonces el crecimiento se frena un trimestre, pero los números hablan por sí solos: el margen se duplica y los reembolsos desaparecen."
        }
      ],
      "words": [
        { "word": "forecast", "es": "pronóstico" },
        { "word": "budget", "es": "presupuesto" },
        { "word": "doubles", "es": "se duplica" }
      ]
    },
    {
      "id": "s6",
      "image": s6,
      "imageAlt": "Vale reads the spreadsheet line by line while Dani reacts to the strange expense names.",
      "text": "Show me the spreadsheet again. I want to understand every line, not just the scary ones.",
      "es": "Muéstrame la hoja de cálculo otra vez. Quiero entender cada línea, no solo las que asustan.",
      "speaker": "vale",
      "cast": ["vale", "camila", "dani"],
      "lines": [
        {
          "speaker": "vale",
          "text": "Show me the spreadsheet again. I want to understand every line, not just the scary ones.",
          "es": "Muéstrame la hoja de cálculo otra vez. Quiero entender cada línea, no solo las que asustan."
        },
        {
          "speaker": "camila",
          "text": "Line by line, then. Materials, salaries, marketing, insurance, and this one — emergency repairs to our reputation.",
          "es": "Línea por línea, entonces. Materiales, salarios, mercadeo, seguro, y esta — reparaciones de emergencia a nuestra reputación."
        },
        {
          "speaker": "dani",
          "text": "There is actually a line called reputation repair. That is both funny and sad.",
          "es": "De verdad existe una línea llamada reparación de reputación. Eso es gracioso y triste a la vez."
        }
      ],
      "words": [
        { "word": "spreadsheet", "es": "hoja de cálculo" },
        { "word": "materials", "es": "materiales" },
        { "word": "scary", "es": "que asustan" }
      ]
    },
    {
      "id": "s7",
      "image": s7,
      "imageAlt": "Vale stands and announces the decision to slow sales and invest in teacher training.",
      "text": "Decision: we slow new sales for sixty days and put that money into teacher training.",
      "es": "Decisión: frenamos las ventas nuevas por sesenta días y ponemos ese dinero en capacitación de maestros.",
      "speaker": "vale",
      "cast": ["vale", "dani"],
      "lines": [
        {
          "speaker": "vale",
          "text": "Decision: we slow new sales for sixty days and put that money into teacher training.",
          "es": "Decisión: frenamos las ventas nuevas por sesenta días y ponemos ese dinero en capacitación de maestros."
        },
        {
          "speaker": "dani",
          "text": "Sales will not love that. Neither will Renata — Monterrey is waiting.",
          "es": "A ventas no le va a encantar. A Renata tampoco — Monterrey está esperando."
        },
        {
          "speaker": "vale",
          "text": "Then we explain it to her honestly, with the spreadsheet open. A partner who fears real numbers is not a partner.",
          "es": "Entonces se lo explicamos honestamente, con la hoja de cálculo abierta. Una socia que le teme a los números reales no es socia."
        }
      ],
      "words": [
        { "word": "slow", "es": "frenar" },
        { "word": "sales", "es": "ventas" },
        { "word": "honestly", "es": "honestamente" }
      ]
    },
    {
      "id": "s8",
      "image": s8,
      "imageAlt": "Camila turns the laptop toward Vale, showing Guatemala's numbers separated by teacher.",
      "text": "One teacher's group has the worst attendance and the most complaints. Marco.",
      "es": "El grupo de un maestro tiene la peor asistencia y la mayoría de las quejas. Marco.",
      "speaker": "camila",
      "cast": ["camila", "vale"],
      "lines": [
        {
          "speaker": "camila",
          "text": "One more thing before we celebrate. Look at Guatemala's numbers by teacher.",
          "es": "Una cosa más antes de celebrar. Mira los números de Guatemala por maestro."
        },
        {
          "speaker": "vale",
          "text": "By teacher? That sounds like you already found something.",
          "es": "¿Por maestro? Eso suena a que ya encontraste algo."
        },
        {
          "speaker": "camila",
          "text": "I did. One teacher's group has the worst attendance and the most complaints. Marco.",
          "es": "Sí. El grupo de un maestro tiene la peor asistencia y la mayoría de las quejas. Marco."
        }
      ],
      "words": [
        { "word": "attendance", "es": "asistencia" },
        { "word": "complaints", "es": "quejas" },
        { "word": "worst", "es": "el peor" }
      ]
    },
    {
      "id": "s9",
      "image": s9,
      "imageAlt": "Dani defends Marco with emotion while Camila keeps the numbers on screen.",
      "text": "Love is not a metric, Dani. His students' scores do not add up — they are falling behind every single month.",
      "es": "El cariño no es una métrica, Dani. Las notas de sus estudiantes no cuadran — se están quedando atrás cada mes.",
      "speaker": "camila",
      "cast": ["dani", "camila", "vale"],
      "lines": [
        {
          "speaker": "dani",
          "text": "Marco? He has been with us since the garage days. Everybody loves Marco.",
          "es": "¿Marco? Ha estado con nosotros desde los días del garaje. Todos quieren a Marco."
        },
        {
          "speaker": "camila",
          "text": "Love is not a metric, Dani. His students' scores do not add up — they are falling behind every single month.",
          "es": "El cariño no es una métrica, Dani. Las notas de sus estudiantes no cuadran — se están quedando atrás cada mes."
        },
        {
          "speaker": "vale",
          "text": "Falling behind how much? Be precise, please. This is a person, not a column.",
          "es": "¿Quedándose atrás cuánto? Sé precisa, por favor. Esto es una persona, no una columna."
        }
      ],
      "words": [
        { "word": "garage days", "es": "los inicios humildes" },
        { "word": "add up", "es": "cuadrar / tener sentido" },
        { "word": "falling behind", "es": "quedándose atrás" }
      ]
    },
    {
      "id": "s10",
      "image": s10,
      "imageAlt": "Camila gives the precise delay while Dani looks down, worried about his friend.",
      "text": "His group is two months behind the plan, and the parents notice it clearly. Three already asked to change teachers.",
      "es": "Su grupo está dos meses atrás del plan, y los padres lo notan claramente. Tres ya pidieron cambiar de maestro.",
      "speaker": "camila",
      "cast": ["camila", "dani", "vale"],
      "lines": [
        {
          "speaker": "camila",
          "text": "His group is two months behind the plan, and the parents notice it clearly. Three already asked to change teachers.",
          "es": "Su grupo está dos meses atrás del plan, y los padres lo notan claramente. Tres ya pidieron cambiar de maestro."
        },
        {
          "speaker": "dani",
          "text": "So what, we just tell Marco he is failing? He trained half of us.",
          "es": "¿Entonces qué, solo le decimos a Marco que está fallando? Él capacitó a la mitad de nosotros."
        },
        {
          "speaker": "vale",
          "text": "Nobody is telling Marco anything today. But tomorrow, someone has to. Honestly.",
          "es": "Nadie le dice nada a Marco hoy. Pero mañana, alguien tiene que hacerlo. Honestamente."
        }
      ],
      "words": [
        { "word": "notice", "es": "notar" },
        { "word": "failing", "es": "fallando" },
        { "word": "tomorrow", "es": "mañana" }
      ]
    },
    {
      "id": "s11",
      "image": s11,
      "imageAlt": "Vale accepts the difficult task while Camila closes the laptop with a serious face.",
      "text": "Then prepare well, because this conversation is harder than any spreadsheet.",
      "es": "Entonces prepárate bien, porque esta conversación es más difícil que cualquier hoja de cálculo.",
      "speaker": "camila",
      "cast": ["dani", "vale", "camila"],
      "lines": [
        {
          "speaker": "dani",
          "text": "That someone is you, isn't it. You are going to tell him yourself.",
          "es": "Ese alguien eres tú, ¿verdad? Vas a decírselo tú misma."
        },
        {
          "speaker": "vale",
          "text": "He deserves to hear it from my mouth, with respect, with patience, and with a real plan to help him grow.",
          "es": "Merece escucharlo de mi boca, con respeto, con paciencia, y con un plan real para ayudarlo a crecer."
        },
        {
          "speaker": "camila",
          "text": "Then prepare well, because this conversation is harder than any spreadsheet.",
          "es": "Entonces prepárate bien, porque esta conversación es más difícil que cualquier hoja de cálculo."
        }
      ],
      "words": [
        { "word": "deserves", "es": "merece" },
        { "word": "respect", "es": "respeto" },
        { "word": "harder", "es": "más difícil" }
      ]
    }
  ],
  "quizzes": [
    {
      "id": "q1",
      "afterScene": "s3",
      "questionEn": "What is quietly eating the academy's money?",
      "questionEs": "¿Qué se está comiendo el dinero de la academia en silencio?",
      "options": [
        {
          "label": "Failed classes and retraining costs.",
          "emoji": "💸"
        },
        {
          "label": "Expensive coffee for the office.",
          "emoji": "☕"
        },
        {
          "label": "New furniture every month.",
          "emoji": "🛋️"
        }
      ],
      "answer": 0,
      "sayIt": "One failed class costs three hundred dollars.",
      "sayItEs": "Ejemplo: «One failed class costs three hundred dollars.»",
      "sayItAskEn": "How much does one failed class cost, according to Camila?",
      "sayItAskEs": "¿Cuánto cuesta una clase fallida, según Camila?",
      "sayItCheck": {
        "target": "It costs * dollars",
        "altTargets": [
          "One failed class costs *",
          "* dollars"
        ]
      }
    },
    {
      "id": "q2",
      "afterScene": "s7",
      "questionEn": "What decision comes from the numbers?",
      "questionEs": "¿Qué decisión nace de los números?",
      "options": [
        {
          "label": "Slow sales for sixty days and invest in teacher training.",
          "emoji": "📉"
        },
        {
          "label": "Sell the academy to Northline.",
          "emoji": "🏷️"
        },
        {
          "label": "Fire half the teachers tonight.",
          "emoji": "🔥"
        }
      ],
      "answer": 0,
      "sayIt": "I would invest in training because quality pays later.",
      "sayItEs": "Ejemplo: «I would invest in training because quality pays later.»",
      "sayItAskEn": "Would you slow down sales to fix quality? Why?",
      "sayItAskEs": "¿Frenarías las ventas para arreglar la calidad? ¿Por qué?",
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
      "questionEn": "What hard task does Vale accept at the end?",
      "questionEs": "¿Qué tarea difícil acepta Vale al final?",
      "options": [
        {
          "label": "Talking honestly with Marco about his results.",
          "emoji": "🗣️"
        },
        {
          "label": "Closing the academy for a year.",
          "emoji": "🔒"
        },
        {
          "label": "Moving the office to Houston.",
          "emoji": "✈️"
        }
      ],
      "answer": 0,
      "sayIt": "The numbers showed the real problems, so Vale decided to train teachers and talk to Marco.",
      "sayItEs": "Ejemplo: «The numbers showed the real problems, so Vale decided to train teachers and talk to Marco.»",
      "sayItAskEn": "Summarize what the numbers showed and what Vale decided.",
      "sayItAskEs": "Resume qué mostraron los números y qué decidió Vale.",
      "sayItCheck": {
        "target": "The numbers showed *, so Vale decided to *",
        "altTargets": [
          "Vale decided to * because *",
          "First *, then *"
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
    "model": "camila",
    "modelActionEs": "Camila trae datos reales en vez de opiniones y explica cada número con calma."
  },
  "expressions": [
    {
      "phrase": "break down",
      "variants": ["broke down"],
      "es": "desglosar / explicar por partes",
      "kind": "phrasal",
      "example": "Sit down, both of you. I will break down the numbers by city, by program and by month.",
      "exampleEs": "Siéntense, los dos. Voy a desglosar los números por ciudad, por programa y por mes."
    },
    {
      "phrase": "add up",
      "es": "cuadrar / tener sentido",
      "kind": "phrasal",
      "example": "Love is not a metric, Dani. His students' scores do not add up — they are falling behind.",
      "exampleEs": "El cariño no es una métrica, Dani. Las notas de sus estudiantes no cuadran — se están quedando atrás."
    },
    {
      "phrase": "the numbers speak for themselves",
      "es": "los números hablan por sí solos",
      "kind": "idiom",
      "example": "Then growth slows for one quarter, but the numbers speak for themselves: the margin doubles.",
      "exampleEs": "Entonces el crecimiento se frena un trimestre, pero los números hablan por sí solos: el margen se duplica."
    }
  ],
  "finaleSeconds": 30,
  "continuePrompt": {
    "en": "Your turn, 30 seconds: present the academy's numbers and defend the decision to invest in training.",
    "es": "Tu turno, 30 segundos: presenta los números de la academia y defiende la decisión de invertir en capacitación."
  },
  "continueWith": [
    "Revenue grew ..., but the margin ...",
    "The real problem is ...",
    "That is why we decided to ..."
  ],
  "cliffhanger": {
    "en": "Then prepare well, because this conversation is harder than any spreadsheet.",
    "es": "Entonces prepárate bien, porque esta conversación es más difícil que cualquier hoja de cálculo."
  }
};
