import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/tigers-ep17-the-visit/cover.jpg";
import s1 from "@/assets/storybook/tigers-ep17-the-visit/s1.jpg";
import s2 from "@/assets/storybook/tigers-ep17-the-visit/s2.jpg";
import s3 from "@/assets/storybook/tigers-ep17-the-visit/s3.jpg";
import s4 from "@/assets/storybook/tigers-ep17-the-visit/s4.jpg";
import s5 from "@/assets/storybook/tigers-ep17-the-visit/s5.jpg";
import s6 from "@/assets/storybook/tigers-ep17-the-visit/s6.jpg";
import s7 from "@/assets/storybook/tigers-ep17-the-visit/s7.jpg";
import s8 from "@/assets/storybook/tigers-ep17-the-visit/s8.jpg";
import s9 from "@/assets/storybook/tigers-ep17-the-visit/s9.jpg";
import s10 from "@/assets/storybook/tigers-ep17-the-visit/s10.jpg";
import s11 from "@/assets/storybook/tigers-ep17-the-visit/s11.jpg";

/**
 * Season 7 (Tigers) Episode 17 — "The visit".
 * Matches Tigers Day 17 (present perfect progressive review: what we have
 * been doing — reflection and reporting under observation).
 */
export const TIGERS_EP17_THE_VISIT: StorybookEpisode = {
  id: "tigers-ep17-the-visit",
  moduleId: "tigers",
  week: 4,
  title: "The visit",
  titleEs: "La visita",
  episodeLabel: { en: "Season 7 · Episode 17", es: "Temporada 7 · Episodio 17" },
  previously: [
    { en: "The team filled a wall with the year's achievements.", es: "El equipo llenó una pared con los logros del año." },
    { en: "Northline's board wants to visit before voting.", es: "La junta de Northline quiere visitar antes de votar." },
    { en: "The visit is Thursday — one day before the decision.", es: "La visita es el jueves — un día antes de la decisión." },
  ],
  reviewWords: [
    { word: "achieved", es: "logrado" },
    { word: "wall", es: "pared" },
    { word: "visit", es: "visita" },
  ],
  blurb: {
    en: "Three board members walk through the school with notebooks. No presentation, no script — just a normal Thursday. Almost.",
    es: "Tres miembros de la junta recorren la escuela con libretas. Sin presentación, sin guion — solo un jueves normal. Casi.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Jueves ocho de la mañana: el equipo se prepara sin preparar nada.",
      text: "Thursday, eight in the morning. The plan: do exactly what we do every day.",
      es: "Jueves, ocho de la mañana. El plan: hacer exactamente lo que hacemos todos los días.",
      speaker: "narrator",
      lines: [
        { speaker: "dani", text: "Uniform ironed. Desk clean. Plants watered. I have been preparing since six.", es: "«Uniforme planchado. Escritorio limpio. Plantas regadas. Me he estado preparando desde las seis»." },
        { speaker: "vale", text: "Dani, the plan is to do exactly what we do every day.", es: "«Dani, el plan es hacer exactamente lo que hacemos todos los días»." },
        { speaker: "dani", text: "I know. That's why I have been practicing being normal all morning. I am terrible at being normal!", es: "«Lo sé. ¡Por eso he estado practicando ser normal toda la mañana! ¡Soy terrible siendo normal!»" },
      ],
      words: [
        { word: "ironed", es: "planchado" },
        { word: "watered", es: "regadas" },
        { word: "normal", es: "normal" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Tres personas de la junta entran con libretas; Morgan los acompaña.",
      text: "Three board members arrived with Morgan. Three notebooks. Zero smiles, so far.",
      es: "Tres miembros de la junta llegaron con Morgan. Tres libretas. Cero sonrisas, hasta ahora.",
      speaker: "narrator",
      lines: [
        { speaker: "morgan", text: "Vale, these are three members of our board. They have been reading reports all week.", es: "«Vale, estos son tres miembros de nuestra junta. Han estado leyendo informes toda la semana»." },
        { speaker: "vale", text: "Welcome. You have come on a normal Thursday, and that is exactly what we want to show you.", es: "«Bienvenidos. Han venido un jueves normal, y eso es exactamente lo que queremos mostrarles»." },
        { speaker: "herrera", text: "We have been visiting schools all month. Big ones, mostly. This is… different.", es: "«Hemos estado visitando escuelas todo el mes. Grandes, en su mayoría. Esta es… diferente»." },
      ],
      words: [
        { word: "reports", es: "informes" },
        { word: "mostly", es: "en su mayoría" },
        { word: "different", es: "diferente" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "La junta observa la clase de Camila: estudiantes hablando en parejas.",
      text: "In Camila's class, every student was speaking. Not listening — speaking.",
      es: "En la clase de Camila, cada estudiante estaba hablando. No escuchando: hablando.",
      speaker: "narrator",
      lines: [
        { speaker: "camila", text: "In this class, we have been practicing real conversations all week.", es: "«En esta clase, hemos estado practicando conversaciones reales toda la semana»." },
        { speaker: "herrera", text: "Why is everyone speaking at the same time?", es: "«¿Por qué todos están hablando al mismo tiempo?»" },
        { speaker: "camila", text: "Because speaking is the class. They have been sitting silently in school for years. Not here.", es: "«Porque hablar es la clase. Han estado sentados en silencio en la escuela por años. Aquí no»." },
      ],
      words: [
        { word: "practicing", es: "practicando" },
        { speaker: undefined, word: "silently", es: "en silencio" } as never,
        { word: "years", es: "años" },
      ].map(({ word, es }) => ({ word, es })),
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Un miembro de la junta pregunta a una estudiante directamente.",
      text: "A board member turned to a student. Do you like this school? A direct question, no warning.",
      es: "Un miembro de la junta se dirigió a una estudiante. «¿Te gusta esta escuela?» Una pregunta directa, sin aviso.",
      speaker: "narrator",
      lines: [
        { speaker: "herrera", text: "Excuse me. Do you like this school?", es: "«Disculpe. ¿Le gusta esta escuela?»" },
        { speaker: "vale", text: "…", es: "«…»" },
        { speaker: "camila", text: "Take your time, Ana.", es: "«Tómate tu tiempo, Ana»." },
      ],
      words: [
        { word: "direct", es: "directa" },
        { word: "warning", es: "aviso" },
        { word: "time", es: "tiempo" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Ana responde en inglés, despacio y con una sonrisa enorme.",
      text: "I have been studying here for six months, and my life has changed. I am not afraid of English anymore.",
      es: "«He estado estudiando aquí por seis meses, y mi vida ha cambiado. Ya no le tengo miedo al inglés».",
      speaker: "camila",
      lines: [
        { speaker: "camila", text: "I have been studying here for six months, and my life has changed.", es: "«He estado estudiando aquí por seis meses, y mi vida ha cambiado»." },
        { speaker: "camila", text: "I am not afraid of English anymore. English is my friend now.", es: "«Ya no le tengo miedo al inglés. El inglés ahora es mi amigo»." },
        { speaker: "herrera", text: "…Thank you. That is the best answer I have heard in any school.", es: "«…Gracias. Esa es la mejor respuesta que he escuchado en cualquier escuela»." },
      ],
      words: [
        { word: "changed", es: "cambiado" },
        { word: "afraid", es: "miedo" },
        { word: "anymore", es: "ya no / nunca más" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "La junta ve la pared de logros; uno toma una foto.",
      text: "The board found the achievement wall. One of them took a photo.",
      es: "La junta encontró la pared de logros. Uno tomó una foto.",
      speaker: "narrator",
      lines: [
        { speaker: "morgan", text: "What is this wall?", es: "«¿Qué es esta pared?»" },
        { speaker: "vale", text: "Our year. Everything we have achieved, and everything we have been building.", es: "«Nuestro año. Todo lo que hemos logrado y todo lo que hemos estado construyendo»." },
        { speaker: "morgan", text: "A hundred students. A second classroom. A free workshop. A waiting list…", es: "«Cien estudiantes. Un segundo salón. Un taller gratis. Una lista de espera…»" },
      ],
      words: [
        { word: "photo", es: "foto" },
        { word: "building", es: "construyendo" },
        { word: "list", es: "lista" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Pregunta difícil: qué han estado haciendo para mejorar; Vale responde con calma.",
      text: "What have you been doing to improve? Answer honestly.",
      es: "«¿Qué han estado haciendo para mejorar? Responde con honestidad».",
      speaker: "herrera",
      lines: [
        { speaker: "herrera", text: "Hard question. What have you been doing to improve, exactly?", es: "«Pregunta difícil. ¿Qué han estado haciendo para mejorar, exactamente?»" },
        { speaker: "vale", text: "We have been training a new teacher. We have been calling absent students. We have been fixing our weakest class.", es: "«Hemos estado entrenando a una maestra nueva. Hemos estado llamando a los estudiantes ausentes. Hemos estado arreglando nuestra clase más débil»." },
        { speaker: "vale", text: "And we have been doing it while a giant competitor tries to buy us. That is our normal Thursday.", es: "«Y lo hemos estado haciendo mientras un competidor gigante intenta comprarnos. Ese es nuestro jueves normal»." },
      ],
      words: [
        { word: "honestly", es: "con honestidad" },
        { word: "absent", es: "ausentes" },
        { word: "weakest", es: "más débil" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Sofía da su clase con el juego; hasta la junta sonríe.",
      text: "Then Sofía's class started, and for the first time, the notebooks closed.",
      es: "Entonces empezó la clase de Sofía, y por primera vez, las libretas se cerraron.",
      speaker: "narrator",
      lines: [
        { speaker: "sofia", text: "Welcome! Today we play. Who can make the funniest sentence?", es: "«¡Bienvenidos! Hoy jugamos. ¿Quién puede hacer la oración más graciosa?»" },
        { speaker: "morgan", text: "One of our board members just laughed. I have been working with him for six years. He never laughs.", es: "«Uno de los miembros de nuestra junta acaba de reírse. He estado trabajando con él por seis años. Nunca se ríe»." },
        { speaker: "sofia", text: "Laughter is the first sign of learning. Science. Well… almost science.", es: "«La risa es la primera señal de aprendizaje. Ciencia. Bueno… casi ciencia»." },
      ],
      words: [
        { word: "closed", es: "se cerraron" },
        { word: "laughed", es: "se rio" },
        { word: "sign", es: "señal" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Beto se acerca a la junta por iniciativa propia y habla.",
      text: "And then Beto — the quietest student in the school's history — walked up to the board members.",
      es: "Y entonces Beto — el estudiante más callado en la historia de la escuela — se acercó a los miembros de la junta.",
      speaker: "narrator",
      lines: [
        { speaker: "dani", text: "Is that… Beto? Walking? Toward the board? VOLUNTARILY?", es: "«¿Ese es… Beto? ¿Caminando? ¿Hacia la junta? ¿VOLUNTARIAMENTE?»" },
        { speaker: "vale", text: "Shhh. Let him.", es: "«Shhh. Déjalo»." },
        { speaker: "vale", text: "He has been preparing this moment for a year. He just didn't know it.", es: "«Ha estado preparando este momento por un año. Solo que no lo sabía»." },
      ],
      words: [
        { word: "voluntarily", es: "voluntariamente" },
        { word: "toward", es: "hacia" },
        { word: "moment", es: "momento" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Beto dice su oración: ha estado aprendiendo inglés y ya no se esconde.",
      text: "I have been learning English for one year. I used to hide. Now I am talking to you.",
      es: "«He estado aprendiendo inglés por un año. Antes me escondía. Ahora les estoy hablando a ustedes».",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "I have been learning English for one year. I used to hide from foreigners.", es: "«He estado aprendiendo inglés por un año. Antes me escondía de los extranjeros»." },
        { speaker: "vale", text: "Now I am talking to three foreigners. Voluntarily. So… the school works. Thank you.", es: "«Ahora les estoy hablando a tres extranjeros. Voluntariamente. Así que… la escuela funciona. Gracias»." },
        { speaker: "herrera", text: "…That is the best presentation I have ever seen. And it wasn't even a presentation.", es: "«…Esa es la mejor presentación que he visto en mi vida. Y ni siquiera fue una presentación»." },
      ],
      words: [
        { word: "foreigners", es: "extranjeros" },
        { word: "works", es: "funciona" },
        { word: "ever", es: "en mi vida" },
      ],
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "La junta se va; Morgan se queda un segundo y le guiña a Vale.",
      text: "The board left without promises. But Morgan stayed one second longer — and winked.",
      es: "La junta se fue sin promesas. Pero Morgan se quedó un segundo más — y guiñó.",
      speaker: "narrator",
      lines: [
        { speaker: "morgan", text: "The vote is tomorrow at noon. I can't say anything official.", es: "«El voto es mañana al mediodía. No puedo decir nada oficial»." },
        { speaker: "vale", text: "And unofficially?", es: "«¿Y extraoficialmente?»" },
        { speaker: "morgan", text: "Unofficially… I have been doing this for twenty years, and today was the best school visit of my career.", es: "«Extraoficialmente… he estado haciendo esto por veinte años, y hoy fue la mejor visita escolar de mi carrera»." },
      ],
      words: [
        { word: "vote", es: "voto" },
        { word: "winked", es: "guiñó" },
        { word: "career", es: "carrera" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s2",
      questionEn: "What had the board members been doing before the visit?",
      questionEs: "¿Qué habían estado haciendo los miembros de la junta antes de la visita?",
      options: [
        { label: "Reading reports and visiting big schools", emoji: "📊" },
        { label: "Learning to dance", emoji: "💃" },
        { label: "Selling pupusas", emoji: "🫓" },
      ],
      answer: 0,
      sayIt: "They have been reading reports and visiting schools all month.",
      sayItEs: "Ejemplo: «They have been reading reports and visiting schools all month.»",
      sayItAskEn: "What have you been doing this week? Tell me two things.",
      sayItAskEs: "¿Qué has estado haciendo esta semana? Dime dos cosas.",
      sayItCheck: {
        target: "I have been *ing",
        altTargets: ["I have been *ing and *ing", "This week, I have been *", "I've been *"],
      },
    },
    {
      id: "q2",
      afterScene: "s5",
      questionEn: "What did the student answer to 'do you like this school?'",
      questionEs: "¿Qué respondió la estudiante a «¿te gusta esta escuela?»?",
      options: [
        { label: "She has been studying for six months and isn't afraid anymore", emoji: "💪" },
        { label: "She ran away", emoji: "🏃" },
        { label: "She asked for a discount", emoji: "🏷️" },
      ],
      answer: 0,
      sayIt: "I have been studying here for six months, and I am not afraid of English anymore.",
      sayItEs: "Ejemplo: «I have been studying here for six months, and I am not afraid of English anymore.»",
      sayItAskEn: "How long have you been studying English? What has changed?",
      sayItAskEs: "¿Cuánto tiempo has estado estudiando inglés? ¿Qué ha cambiado?",
      sayItCheck: {
        target: "I have been studying English for *",
        altTargets: ["I have been learning English for *, and *", "For * months. * has changed", "I have been practicing for *"],
      },
    },
    {
      id: "q3",
      afterScene: "s10",
      questionEn: "What did Beto do that surprised everyone?",
      questionEs: "¿Qué hizo Beto que sorprendió a todos?",
      options: [
        { label: "He walked up to the board and spoke English voluntarily", emoji: "🗣️" },
        { label: "He hid under the desk", emoji: "🫣" },
        { label: "He sang a song", emoji: "🎵" },
      ],
      answer: 0,
      sayIt: "I used to hide from foreigners. Now I am talking to you, voluntarily.",
      sayItEs: "Ejemplo: «I used to hide from foreigners. Now I am talking to you, voluntarily.»",
      sayItAskEn: "Tell me something you used to be afraid of, and how you feel now.",
      sayItAskEs: "Cuéntame algo a lo que le tenías miedo y cómo te sientes ahora.",
      sayItCheck: {
        target: "I used to be afraid of *, but now *",
        altTargets: ["I used to *, but now I *", "Now I am not afraid of *", "I used to hide *, now I *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s9",
    phrase: "I can do it — even the thing I have been afraid of for a year.",
    es: "Puedo hacerlo — incluso eso que me ha dado miedo por un año.",
  },
  habitCard: {
    afterScene: "s3",
    phrase: "Mistakes are part of the process. Speaking badly first is how you speak well later.",
    es: "Los errores son parte del proceso. Hablar mal primero es como hablas bien después.",
    model: "camila",
    modelActionEs: "Camila defendió su clase ruidosa: hablar ES la clase.",
  },
  continuePrompt: {
    en: "Imagine a visitor asks you about this app. What have you been learning? What has changed in you?",
    es: "Imagina que un visitante te pregunta sobre esta app. ¿Qué has estado aprendiendo? ¿Qué ha cambiado en ti?",
  },
  continueWith: ["I have been learning ...", "I used to ..., but now ...", "The biggest change is ..."],
  cliffhanger: {
    en: "Episode 18: Friday, noon — the vote. The phone rings, and the whole street is listening.",
    es: "Episodio 18: Viernes, mediodía — el voto. El teléfono suena y toda la calle está escuchando.",
  },
};
