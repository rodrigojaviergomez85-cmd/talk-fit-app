import { useEffect, useState } from "react";
import listeningImg from "@/assets/coach/vale-listening.jpg";
import thinkingImg from "@/assets/coach/vale-thinking.jpg";
import speakingAImg from "@/assets/coach/vale-speaking-a.jpg";
import speakingBImg from "@/assets/coach/vale-speaking-b.jpg";

export type CoachState = "idle" | "listening" | "thinking" | "speaking";

/**
 * Lightweight 2D coach avatar. Four illustrations plus CSS animation, so it
 * stays cheap on mid-range phones (no video, no 3D).
 */
export function CoachAvatar({ state, level = 0 }: { state: CoachState; level?: number }) {
  const [mouthOpen, setMouthOpen] = useState(false);

  useEffect(() => {
    if (state !== "speaking") {
      setMouthOpen(false);
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const threshold = reduceMotion ? 0.11 : mouthOpen ? 0.055 : 0.085;
    const nextOpen = level >= threshold;
    if (nextOpen === mouthOpen) return;

    // A short hold smooths consonants and prevents rapid image flicker.
    const timer = window.setTimeout(() => setMouthOpen(nextOpen), reduceMotion ? 180 : 75);
    return () => window.clearTimeout(timer);
  }, [level, mouthOpen, state]);

  const src =
    state === "speaking"
      ? mouthOpen
        ? speakingAImg
        : speakingBImg
      : state === "thinking"
        ? thinkingImg
        : listeningImg;

  const ringScale = state === "listening" ? 1 + Math.min(0.28, level * 1.6) : 1;

  return (
    <div className="relative flex size-40 items-center justify-center">
      <div
        className="absolute inset-0 rounded-full bg-primary/20 transition-transform duration-100"
        style={{ transform: `scale(${ringScale})` }}
        aria-hidden
      />
      {state === "thinking" ? (
        <div className="absolute inset-1 animate-pulse rounded-full bg-primary/25" aria-hidden />
      ) : null}
      <img
        src={src}
        alt=""
        width={512}
        height={512}
        loading="lazy"
        className="coach-avatar-image relative size-32 rounded-full object-cover shadow-sm"
        data-active={state === "idle" ? "false" : "true"}
      />
      <style>{`
        @keyframes coach-breathe{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
        .coach-avatar-image[data-active="true"]{animation:coach-breathe 3.6s ease-in-out infinite}
        @media (prefers-reduced-motion:reduce){.coach-avatar-image[data-active="true"]{animation:none}}
      `}</style>
    </div>
  );
}
