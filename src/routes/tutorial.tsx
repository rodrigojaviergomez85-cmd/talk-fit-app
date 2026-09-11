import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAppLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import tourHome from "@/assets/tour/tour-home.png";
import tourProgress from "@/assets/tour/tour-progress.png";
import tourReview from "@/assets/tour/tour-review.png";
import tourMethod from "@/assets/tour/tour-method.png";
import tourAccount from "@/assets/tour/tour-account.png";

const TOUR_KEY = "fluency-reps:app-tour:v1";

export function isAppTourDone(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return window.localStorage.getItem(TOUR_KEY) === "done";
  } catch {
    return true;
  }
}

export function markAppTourDone() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(TOUR_KEY, "done");
  } catch {
    /* storage unavailable */
  }
}

export const Route = createFileRoute("/tutorial")({
  head: () => ({
    meta: [
      { title: "Cómo usar la app — Fluency App" },
      {
        name: "description",
        content: "Tutorial rápido de Fluency App: Inicio, Progreso, Review, Método Natural y Mi Cuenta.",
      },
      { property: "og:title", content: "Cómo usar la app — Fluency App" },
      { property: "og:description", content: "Aprende en 5 pasos cómo practicar speaking cada día con Fluency App." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TutorialPage,
});

type Slide = {
  image: string;
  es: { tag: string; title: string; body: string; bullets: string[] };
  en: { tag: string; title: string; body: string; bullets: string[] };
};

const SLIDES: Slide[] = [
  {
    image: tourHome,
    es: {
      tag: "Inicio",
      title: "Tu práctica de hoy",
      body: "Aquí empiezas cada día. Abre la tarjeta y haz los 5 pasos de speaking en 5–10 minutos.",
      bullets: ["Toca PRACTICAR HOY", "Habla en voz alta en cada paso", "Mira tu semana de constancia"],
    },
    en: {
      tag: "Home",
      title: "Today's practice",
      body: "This is where you start every day. Open the card and do the 5 speaking steps in 5–10 minutes.",
      bullets: ["Tap PRACTICE TODAY", "Speak out loud on every step", "Check your weekly consistency"],
    },
  },
  {
    image: tourProgress,
    es: {
      tag: "Progreso",
      title: "Mira cómo avanzas",
      body: "Tus días completados, tu racha y tus audios guardados están en un solo lugar.",
      bullets: ["Pestaña Avance: días y racha", "Pestaña Audios: escucha tus grabaciones", "Meta: 5 días por semana"],
    },
    en: {
      tag: "Progress",
      title: "See how you improve",
      body: "Your completed days, your streak and your saved recordings live in one place.",
      bullets: ["Progress tab: days and streak", "Audio tab: listen to your recordings", "Goal: 5 days a week"],
    },
  },
  {
    image: tourReview,
    es: {
      tag: "Review",
      title: "Repasa la gramática",
      body: "Si algo no te queda claro, entra a Review y practica ese tema por separado.",
      bullets: ["Explicación fácil de cada tema", "5 prácticas por tema", "Se desbloquean en orden"],
    },
    en: {
      tag: "Review",
      title: "Review the grammar",
      body: "If something is not clear, open Review and practice that topic on its own.",
      bullets: ["Easy explanation per topic", "5 practices per topic", "They unlock in order"],
    },
  },
  {
    image: tourMethod,
    es: {
      tag: "Método",
      title: "Vocabulario y audio",
      body: "100 verbos, phrasal verbs, idioms, pictionary y audiolibros para escuchar todos los días.",
      bullets: ["Escucha la pronunciación", "10 palabras nuevas al día", "Elige un audiolibro de tu nivel"],
    },
    en: {
      tag: "Method",
      title: "Vocabulary and audio",
      body: "100 verbs, phrasal verbs, idioms, pictionary and audiobooks to listen to every day.",
      bullets: ["Listen to the pronunciation", "10 new words a day", "Pick an audiobook for your level"],
    },
  },
  {
    image: tourAccount,
    es: {
      tag: "Mi Cuenta",
      title: "Tu perfil y ajustes",
      body: "Cambia el idioma de la app, revisa tu nivel y prueba tu micrófono antes de practicar.",
      bullets: ["Español / English", "Cambiar de nivel", "Probar micrófono"],
    },
    en: {
      tag: "My Account",
      title: "Your profile and settings",
      body: "Change the app language, check your level and test your microphone before practicing.",
      bullets: ["Español / English", "Change level", "Test microphone"],
    },
  },
];

function TutorialPage() {
  const { lang } = useAppLang();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const es = lang === "es";
  const slide = SLIDES[index]!;
  const copy = es ? slide.es : slide.en;
  const last = index === SLIDES.length - 1;

  const finish = () => {
    markAppTourDone();
    void navigate({ to: "/" });
  };

  return (
    <main className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col px-5 pb-8 pt-6">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-primary px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-primary-foreground">
          {copy.tag}
        </span>
        <button
          type="button"
          onClick={finish}
          className="min-h-[44px] px-2 text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground"
        >
          {es ? "Saltar" : "Skip"}
        </button>
      </div>

      <div className="mt-4 flex flex-1 flex-col items-center justify-center gap-5 text-center">
        <img
          src={slide.image}
          alt={copy.title}
          width={768}
          height={768}
          loading={index === 0 ? "eager" : "lazy"}
          className="h-52 w-52 object-contain"
        />
        <h1 className="text-[24px] font-extrabold leading-tight tracking-tight">{copy.title}</h1>
        <p className="text-[15px] leading-relaxed text-muted-foreground">{copy.body}</p>
        <ul className="w-full space-y-2 text-left">
          {copy.bullets.map((item) => (
            <li
              key={item}
              className="rounded-2xl border border-border bg-card px-4 py-3 text-[14px] font-semibold shadow-[var(--shadow-card)]"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex justify-center gap-2" aria-hidden>
        {SLIDES.map((s, i) => (
          <span
            key={s.es.tag}
            className={cn("h-2 rounded-full transition-all", i === index ? "w-6 bg-primary" : "w-2 bg-border")}
          />
        ))}
      </div>

      <div className="mt-5 flex gap-3">
        {index > 0 ? (
          <button
            type="button"
            onClick={() => setIndex((v) => v - 1)}
            className="min-h-[52px] flex-1 rounded-2xl border border-border text-[13px] font-bold uppercase tracking-[0.14em]"
          >
            {es ? "Atrás" : "Back"}
          </button>
        ) : null}
        <button
          type="button"
          onClick={() => (last ? finish() : setIndex((v) => v + 1))}
          className="min-h-[52px] flex-[2] rounded-2xl bg-primary text-[13px] font-extrabold uppercase tracking-[0.14em] text-primary-foreground"
        >
          {last ? (es ? "¡Empezar!" : "Start!") : es ? "Siguiente" : "Next"}
        </button>
      </div>
    </main>
  );
}
