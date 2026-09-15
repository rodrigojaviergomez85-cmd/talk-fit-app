import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/eagles-ep16-another-country/cover.jpg";
import s1 from "@/assets/storybook/eagles-ep16-another-country/s1.jpg";
import s2 from "@/assets/storybook/eagles-ep16-another-country/s2.jpg";
import s3 from "@/assets/storybook/eagles-ep16-another-country/s3.jpg";
import s4 from "@/assets/storybook/eagles-ep16-another-country/s4.jpg";
import s5 from "@/assets/storybook/eagles-ep16-another-country/s5.jpg";
import s6 from "@/assets/storybook/eagles-ep16-another-country/s6.jpg";
import s7 from "@/assets/storybook/eagles-ep16-another-country/s7.jpg";
import s8 from "@/assets/storybook/eagles-ep16-another-country/s8.jpg";
import s9 from "@/assets/storybook/eagles-ep16-another-country/s9.jpg";
import s10 from "@/assets/storybook/eagles-ep16-another-country/s10.jpg";

/**
 * Season 6 (Eagles) Episode 16 — "Another country".
 * Eagles day 16: simple future review — going to · will.
 */
export const EAGLES_EP16_ANOTHER_COUNTRY: StorybookEpisode = {
  id: "eagles-ep16-another-country",
  moduleId: "eagles-week-1",
  week: 4,
  title: "Another country",
  titleEs: "Otro país",
  episodeLabel: { en: "Season 6 · Episode 16", es: "Temporada 6 · Episodio 16" },
  previously: [
    { en: "The school hired a second teacher.", es: "La escuela contrató a una segunda maestra." },
    { en: "Morgan approved the pilot.", es: "Morgan aprobó el piloto." },
    { en: "Miami is in three weeks.", es: "Miami es en tres semanas." },
  ],
  reviewWords: [
    { word: "going to", es: "voy a" },
    { word: "will", es: "voy a / lo haré" },
    { word: "future", es: "futuro" },
  ],
  blurb: {
    en: "A passport, a mother's face and a plan for three weeks. Vale talks about the future out loud for the first time.",
    es: "Un pasaporte, la cara de una mamá y un plan de tres semanas. Vale habla del futuro en voz alta por primera vez.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale holds an empty passport folder at her kitchen table.",
      text: "7:00 a.m. The folder is empty.",
      es: "7:00 a.m. La carpeta está vacía.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "I am going to need a passport in eighteen days.", es: "«Voy a necesitar un pasaporte en dieciocho días»." },
        { speaker: "mom", text: "You are going to need a coat too. It is cold in airplanes.", es: "«También vas a necesitar un abrigo. Hace frío en los aviones»." },
        { speaker: "vale", text: "Mom, I have never taken an airplane.", es: "«Mamá, yo nunca he tomado un avión»." },
      ],
      words: [
        { word: "passport", es: "pasaporte" },
        { word: "coat", es: "abrigo" },
        { word: "airplane", es: "avión" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale and her mother stand in a long line at a government office.",
      text: "The line starts at five in the morning.",
      es: "La fila empieza a las cinco de la mañana.",
      speaker: "mom",
      lines: [
        { speaker: "mom", text: "I will wait with you. I am not going to leave.", es: "«Voy a esperar contigo. No me voy a ir»." },
        { speaker: "vale", text: "You are going to be late for work.", es: "«Vas a llegar tarde al trabajo»." },
        { speaker: "mom", text: "My daughter is going to another country. Work will understand.", es: "«Mi hija va a ir a otro país. El trabajo lo va a entender»." },
      ],
      words: [
        { word: "line", es: "fila" },
        { word: "wait", es: "esperar" },
        { word: "daughter", es: "hija" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Dani shows a printed three-week plan on the school wall.",
      text: "Dani turns eighteen days into a wall.",
      es: "Dani convierte dieciocho días en una pared.",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "Week one: documents. Week two: the pilot lesson. Week three: rehearsal.", es: "«Semana uno: documentos. Semana dos: la clase piloto. Semana tres: ensayo»." },
        { speaker: "vale", text: "And who will teach my groups?", es: "«¿Y quién va a dar mis grupos?»" },
        { speaker: "dani", text: "The new teacher will. You trained her for this.", es: "«La maestra nueva. La entrenaste para esto»." },
      ],
      words: [
        { word: "documents", es: "documentos" },
        { word: "rehearsal", es: "ensayo" },
        { word: "trained", es: "entrenaste" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Luis and his coworkers listen to Vale in the Northline office.",
      text: "Luis asks the question everybody is thinking.",
      es: "Luis hace la pregunta que todos piensan.",
      speaker: "luis",
      lines: [
        { speaker: "luis", text: "If they like you there, are you going to stay in Miami?", es: "«Si les gustas allá, ¿te vas a quedar en Miami?»" },
        { speaker: "vale", text: "No. I am going to come back and open a second classroom.", es: "«No. Voy a regresar y abrir un segundo salón»." },
        { speaker: "luis", text: "Then I will study harder. I want to be in that classroom.", es: "«Entonces voy a estudiar más. Quiero estar en ese salón»." },
      ],
      words: [
        { word: "stay", es: "quedarse" },
        { word: "classroom", es: "salón" },
        { word: "harder", es: "más duro" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Kat talks about her own future while cleaning a whiteboard.",
      text: "The future becomes contagious.",
      es: "El futuro se vuelve contagioso.",
      speaker: "kat",
      lines: [
        { speaker: "kat", text: "Next year I am going to apply for the bilingual position.", es: "«El otro año voy a aplicar al puesto bilingüe»." },
        { speaker: "beto", text: "I will finish high school first. Then I will study tourism.", es: "«Yo primero voy a terminar el bachillerato. Luego voy a estudiar turismo»." },
        { speaker: "vale", text: "Write both sentences down. Plans die when nobody says them.", es: "«Escriban las dos frases. Los planes se mueren cuando nadie los dice»." },
      ],
      words: [
        { word: "apply", es: "aplicar" },
        { word: "tourism", es: "turismo" },
        { word: "plans", es: "planes" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Camila prepares a budget for the trip with a calculator.",
      text: "Camila counts the money nobody wants to count.",
      es: "Camila cuenta el dinero que nadie quiere contar.",
      speaker: "camila",
      lines: [
        { speaker: "camila", text: "Northline will pay the flight. We are going to pay the hotel.", es: "«Northline va a pagar el vuelo. Nosotros vamos a pagar el hotel»." },
        { speaker: "vale", text: "Then I am going to sleep in the cheapest room in Florida.", es: "«Entonces voy a dormir en el cuarto más barato de Florida»." },
        { speaker: "camila", text: "You will sleep three hours anyway.", es: "«De todos modos vas a dormir tres horas»." },
      ],
      words: [
        { word: "flight", es: "vuelo" },
        { word: "hotel", es: "hotel" },
        { word: "sleep", es: "dormir" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Mateo helps Vale practice at the airport bus stop.",
      text: "Mateo becomes an immigration officer for practice.",
      es: "Mateo se vuelve oficial de migración para practicar.",
      speaker: "mateo",
      lines: [
        { speaker: "mateo", text: "What are you going to do in the United States?", es: "«¿Qué va a hacer en Estados Unidos?»" },
        { speaker: "vale", text: "I am going to teach a pilot class for a company. I will stay four days.", es: "«Voy a dar una clase piloto para una empresa. Me voy a quedar cuatro días»." },
        { speaker: "mateo", text: "Perfect. Say it exactly like that, without laughing.", es: "«Perfecto. Dilo exactamente así, sin reírte»." },
      ],
      words: [
        { word: "company", es: "empresa" },
        { word: "four", es: "cuatro" },
        { word: "exactly", es: "exactamente" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Morgan on a video call goes through the trip agenda.",
      text: "Morgan sends the agenda.",
      es: "Morgan manda la agenda.",
      speaker: "morgan",
      lines: [
        { speaker: "morgan", text: "You will meet two directors. They will ask about results.", es: "«Vas a conocer a dos directores. Van a preguntar por resultados»." },
        { speaker: "vale", text: "I will bring the students' recordings from day one.", es: "«Voy a llevar las grabaciones de los estudiantes del día uno»." },
        { speaker: "morgan", text: "Good. Numbers convince, but voices sell.", es: "«Bien. Los números convencen, pero las voces venden»." },
      ],
      words: [
        { word: "directors", es: "directores" },
        { word: "recordings", es: "grabaciones" },
        { word: "voices", es: "voces" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale holds her new passport with both hands outside the office.",
      text: "Day twelve. The passport arrives.",
      es: "Día doce. Llega el pasaporte.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "My name is here, with my photo, and it says my country.", es: "«Mi nombre está aquí, con mi foto, y dice mi país»." },
        { speaker: "mom", text: "You are going to use it many times.", es: "«Lo vas a usar muchas veces»." },
        { speaker: "vale", text: "I will. Everything is possible when I put in the effort.", es: "«Sí. Todo es posible cuando le pongo esfuerzo»." },
      ],
      words: [
        { word: "photo", es: "foto" },
        { word: "country", es: "país" },
        { word: "times", es: "veces" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale looks at a checklist on the school wall at night.",
      text: "10:40 p.m. The wall has too many empty boxes.",
      es: "10:40 p.m. La pared tiene demasiadas casillas vacías.",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "Six days left. What have we finished so far?", es: "«Quedan seis días. ¿Qué hemos terminado hasta ahora?»" },
        { speaker: "vale", text: "Less than I want.", es: "«Menos de lo que quiero»." },
        { speaker: "narrator", text: "Tomorrow the checklist becomes the whole day.", es: "Mañana la lista se vuelve todo el día." },
      ],
      words: [
        { word: "left", es: "quedan" },
        { word: "finished", es: "terminado" },
        { word: "tomorrow", es: "mañana" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s2",
      questionEn: "What does Vale's mother decide to do?",
      questionEs: "¿Qué decide hacer la mamá de Vale?",
      options: [
        { label: "She will wait in the line with her", emoji: "🧍‍♀️" },
        { label: "She will go to work first", emoji: "🏭" },
        { label: "She will pay for the trip", emoji: "💵" },
      ],
      answer: 0,
      sayIt: "She will wait in the line with her.",
      sayItEs: "Ejemplo: «She will wait in the line with her.»",
      sayItAskEn: "What are you going to do this weekend? Use: I am going to…",
      sayItAskEs: "¿Qué vas a hacer este fin de semana? Usa: I am going to…",
      sayItCheck: {
        target: "I am going to *",
        altTargets: ["I'm going to *", "I am going to study *", "I am going to work *"],
      },
    },
    {
      id: "q2",
      afterScene: "s4",
      questionEn: "What is Vale going to do after Miami?",
      questionEs: "¿Qué va a hacer Vale después de Miami?",
      options: [
        { label: "Come back and open a second classroom", emoji: "🏫" },
        { label: "Stay in the United States", emoji: "🇺🇸" },
        { label: "Close the school", emoji: "🔒" },
      ],
      answer: 0,
      sayIt: "She is going to come back and open a second classroom.",
      sayItEs: "Ejemplo: «She is going to come back and open a second classroom.»",
      sayItAskEn: "What will you do to improve your English this month? Use: I will…",
      sayItAskEs: "¿Qué harás para mejorar tu inglés este mes? Usa: I will…",
      sayItCheck: {
        target: "I will *",
        altTargets: ["I'll *", "I will practice *", "I will study *"],
      },
    },
    {
      id: "q3",
      afterScene: "s8",
      questionEn: "What will Vale bring to the meeting?",
      questionEs: "¿Qué va a llevar Vale a la reunión?",
      options: [
        { label: "The students' recordings from day one", emoji: "🎙️" },
        { label: "A cake for the directors", emoji: "🍰" },
        { label: "Nothing, only her ideas", emoji: "💭" },
      ],
      answer: 0,
      sayIt: "She will bring the students' recordings.",
      sayItEs: "Ejemplo: «She will bring the students' recordings.»",
      sayItAskEn: "Where are you going to use your English next year? Use: I am going to… and I will…",
      sayItAskEs: "¿Dónde vas a usar tu inglés el otro año? Usa: I am going to… and I will…",
      sayItCheck: {
        target: "I am going to * and I will *",
        altTargets: ["I am going to *", "I will *", "I'm going to * and I'll *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s9",
    phrase: "Everything is possible when I put in the effort.",
    es: "Todo es posible cuando le pongo esfuerzo.",
  },
  habitCard: {
    afterScene: "s5",
    phrase: "I say my plan out loud so it stops being a dream.",
    es: "Digo mi plan en voz alta para que deje de ser un sueño.",
    model: "kat",
    modelActionEs: "Kat dice en voz alta que va a aplicar al puesto bilingüe.",
  },
  continuePrompt: {
    en: "Tell me your plan for the next three months.",
    es: "Cuéntame tu plan para los próximos tres meses.",
  },
  continueWith: ["I am going to ...", "I will ...", "because ..."],
  cliffhanger: {
    en: "Episode 17: Six days, one checklist, and the question: what have we achieved so far?",
    es: "Episodio 17: Seis días, una lista y la pregunta: ¿qué hemos logrado hasta ahora?",
  },
};
