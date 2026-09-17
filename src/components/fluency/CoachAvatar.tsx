import { useEffect, useRef, useState } from "react";
import listeningImg from "@/assets/coach/vale-listening.jpg";
import thinkingImg from "@/assets/coach/vale-thinking.jpg";
import mouthSmallImg from "@/assets/coach/vale-mouth-small.webp";
import mouthMediumImg from "@/assets/coach/vale-mouth-medium.webp";
import mouthOpenImg from "@/assets/coach/vale-mouth-open.webp";

export type CoachState = "idle" | "listening" | "thinking" | "speaking";

type MouthShape = 0 | 1 | 2 | 3;

const mouthFrames = [mouthSmallImg, mouthMediumImg, mouthOpenImg] as const;

/**
 * Lightweight 2D coach avatar. Four illustrations plus CSS animation, so it
 * stays cheap on mid-range phones (no video, no 3D).
 */
export function CoachAvatar({ state, level = 0 }: { state: CoachState; level?: number }) {
  const [mouthShape, setMouthShape] = useState<MouthShape>(0);
  const shapeRef = useRef<MouthShape>(0);
  const lastChangeRef = useRef(0);

  useEffect(() => {
    if (state !== "speaking") {
      shapeRef.current = 0;
      setMouthShape(0);
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let next: MouthShape = 0;
    if (level > 0.52) next = 3;
    else if (level > 0.27) next = 2;
    else if (level > 0.07) next = 1;

    const now = performance.now();
    const minimumHold = reduceMotion ? 170 : next === 0 ? 85 : 65;
    if (next === shapeRef.current || now - lastChangeRef.current < minimumHold) return;

    shapeRef.current = next;
    lastChangeRef.current = now;
    setMouthShape(next);
  }, [level, state]);

  // Render all frames from the beginning so Safari decodes them before audio
  // starts. Only the small mouth area is revealed; the portrait never swaps.
  const portrait = state === "thinking" ? thinkingImg : listeningImg;

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
      <div
        className="coach-avatar-image relative size-32 overflow-hidden rounded-full shadow-sm"
        data-active={state === "listening" ? "true" : "false"}
      >
        <img src={portrait} alt="" width={512} height={512} className="absolute inset-0 size-full object-cover" />
        {mouthFrames.map((frame, index) => (
          <img
            key={frame}
            src={frame}
            alt=""
            width={512}
            height={512}
            aria-hidden
            className="coach-mouth-frame absolute inset-0 size-full object-cover"
            data-visible={state === "speaking" && mouthShape === index + 1 ? "true" : "false"}
          />
        ))}
      </div>
      <style>{`
        @keyframes coach-breathe{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
        .coach-avatar-image[data-active="true"]{animation:coach-breathe 3.6s ease-in-out infinite}
        .coach-mouth-frame{clip-path:ellipse(13% 8% at 50% 48%);opacity:0;transition:opacity 70ms linear;will-change:opacity}
        .coach-mouth-frame[data-visible="true"]{opacity:1}
        @media (prefers-reduced-motion:reduce){.coach-avatar-image[data-active="true"]{animation:none}}
      `}</style>
    </div>
  );
}
