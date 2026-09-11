import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAppLang } from "@/lib/i18n";
import slide1 from "@/assets/tour/slide-1.png.asset.json";
import slide4 from "@/assets/tour/slide-4.png.asset.json";
import slide5 from "@/assets/tour/slide-5.png.asset.json";

const TOUR_KEY = "fluency-reps:app-tour:v2";

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
        content: "Tutorial rápido de Fluency App: Inicio, Método Natural y Mi Cuenta.",
      },
      { property: "og:title", content: "Cómo usar la app — Fluency App" },
      { property: "og:description", content: "Aprende cómo practicar speaking cada día con Fluency App." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TutorialPage,
});

// Exact onboarding illustrations provided by the app owner (full tutorial
// slides with the Next/Skip controls baked into the artwork).
const SLIDES = [
  { image: slide1.url, alt: "Inicio: continúa tu lección, tu racha y muéstrale a tu coach" },
  { image: slide4.url, alt: "Método: verbos más comunes y audiolibros" },
  { image: slide5.url, alt: "Mi Cuenta: idioma, nivel y micrófono" },
];

function TutorialPage() {
  const { lang } = useAppLang();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const es = lang === "es";
  const last = index === SLIDES.length - 1;
  const slide = SLIDES[index]!;

  const finish = () => {
    markAppTourDone();
    void navigate({ to: "/" });
  };
  const next = () => (last ? finish() : setIndex((v) => v + 1));

  return (
    <main className="relative h-[100dvh] w-full overflow-hidden bg-black">
      <img
        src={slide.image}
        alt={slide.alt}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />

      {/* Invisible tap zones matching the buttons baked into the artwork. */}
      <button
        type="button"
        onClick={next}
        aria-label={last ? (es ? "¡Empezar!" : "Start!") : es ? "Siguiente" : "Next"}
        className="absolute inset-x-0 top-[84%] h-[8%] w-full cursor-pointer"
      />
      <button
        type="button"
        onClick={finish}
        aria-label={es ? "Saltar" : "Skip"}
        className="absolute bottom-[2%] right-0 h-[6%] w-1/3 cursor-pointer"
      />
    </main>
  );
}
