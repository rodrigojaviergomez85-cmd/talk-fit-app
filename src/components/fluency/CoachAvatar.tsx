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
    const timer = window.setInterval(() => setMouthOpen((v) => !v), 160);
    return () => window.clearInterval(timer);
  }, [state]);

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
        className="relative size-32 rounded-full object-cover shadow-sm"
        style={{
          animation: state === "idle" ? undefined : "coach-breathe 3.6s ease-in-out infinite",
        }}
      />
      <style>{`@keyframes coach-breathe{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}`}</style>
    </div>
  );
}
