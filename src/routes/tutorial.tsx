import { useCallback, useEffect, useRef, useState } from "react";
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

type Rect = { top: number; left: number; width: number; height: number };

function TutorialPage() {
  const { lang } = useAppLang();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const es = lang === "es";
  const last = index === SLIDES.length - 1;
  const slide = SLIDES[index]!;

  const measure = useCallback(() => {
    const img = imgRef.current;
    if (!img) return;
    const r = img.getBoundingClientRect();
    setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure, index]);

  const finish = () => {
    markAppTourDone();
    void navigate({ to: "/" });
  };
  const next = () => (last ? finish() : setIndex((v) => v + 1));
  const back = () => setIndex((v) => Math.max(0, v - 1));

  // Swipe: left = next slide, right = previous slide.
  const touch = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0]!;
    touch.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touch.current;
    touch.current = null;
    if (!start) return;
    const t = e.changedTouches[0]!;
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    if (dx < 0) next();
    else back();
  };

  // Buttons baked into the artwork: main CTA ~84%–92% height, "Saltar" bottom right.
  const zone = (topPct: number, heightPct: number, leftPct: number, widthPct: number) =>
    rect
      ? {
          top: rect.top + rect.height * topPct,
          left: rect.left + rect.width * leftPct,
          height: rect.height * heightPct,
          width: rect.width * widthPct,
        }
      : { display: "none" as const };

  return (
    <main
      className="relative flex h-[100dvh] w-full touch-pan-y items-center justify-center overflow-hidden bg-[#101418] select-none"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <img
        ref={imgRef}
        src={slide.image}
        alt={slide.alt}
        onLoad={measure}
        className="h-full w-full object-contain"
        draggable={false}
      />

      {/* Invisible tap zones matching the buttons baked into the artwork. */}
      <button
        type="button"
        onClick={next}
        aria-label={last ? (es ? "¡Empezar!" : "Start!") : es ? "Siguiente" : "Next"}
        style={zone(0.84, 0.08, 0, 1)}
        className="fixed cursor-pointer"
      />
      <button
        type="button"
        onClick={finish}
        aria-label={es ? "Saltar" : "Skip"}
        style={zone(0.915, 0.06, 0.66, 0.34)}
        className="fixed cursor-pointer"
      />
    </main>
  );
}
