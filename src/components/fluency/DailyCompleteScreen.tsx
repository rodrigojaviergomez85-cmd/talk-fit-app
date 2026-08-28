import { useEffect, useMemo, useState } from "react";
import { Check, Flame, Star } from "lucide-react";
import { ProfileService } from "@/services/profile-service";
import { useSpanishAll } from "./TranslatableText";
import { cn } from "@/lib/utils";

type DailyCompleteScreenProps = {
  onComplete: () => void;
  className?: string;
};

/** Celebration + day-completion screen shown after the 5th daily Fluency Rep. */
export function DailyCompleteScreen({ onComplete, className }: DailyCompleteScreenProps) {
  const es = useSpanishAll();
  const [streak, setStreak] = useState(0);
  const [alreadyDone, setAlreadyDone] = useState(false);
  const [saving, setSaving] = useState(false);
  const [confetti, setConfetti] = useState(true);

  useEffect(() => {
    const profile = ProfileService.load();
    const done = ProfileService.isTodayCompleted(profile);
    setAlreadyDone(done);
    setStreak(done ? profile.streakDays : profile.streakDays + (isYesterday(profile.lastCompletedDate) ? 1 : 0) || 1);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setConfetti(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  const pieces = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        left: `${(i * 5.4 + (i % 3) * 7) % 96}%`,
        delay: `${(i % 6) * 0.12}s`,
        hue: i % 3,
      })),
    [],
  );

  const handleComplete = () => {
    if (saving) return;
    setSaving(true);
    const profile = ProfileService.load();
    const updated = ProfileService.completeToday(profile);
    setStreak(updated.streakDays);
    onComplete();
  };

  return (
    <div className={cn("relative space-y-5 pb-10", className)}>
      {confetti ? (
        <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-4 h-64 overflow-hidden motion-reduce:hidden">
          {pieces.map((p, i) => (
            <span
              key={i}
              className={cn(
                "absolute top-0 size-2 rounded-[2px] animate-[confetti-fall_1.6s_ease-in_forwards]",
                p.hue === 0 ? "bg-primary" : p.hue === 1 ? "bg-accent" : "bg-success",
              )}
              style={{ left: p.left, animationDelay: p.delay }}
            />
          ))}
        </div>
      ) : null}

      <header className="pt-4 text-center">
        <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-success/15 text-success animate-pop-check">
          <Check className="size-11" strokeWidth={3} />
        </div>
        <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight">🎉 {es ? "¡MUY BIEN!" : "GREAT JOB!"}</h1>
        <p className="mt-3 text-lg font-semibold text-muted-foreground">
          {es ? "¡Completaste tus 5 Fluency Reps de hoy!" : "You completed your 5 Fluency Reps today!"}
        </p>
        <p className="mt-2 text-[15px] text-muted-foreground">
          {es ? "Practicaste. Hablaste. Mejoraste." : "You practiced. You spoke. You improved."}
        </p>
      </header>

      <section className="rounded-3xl bg-navy p-7 text-center text-navy-foreground">
        <p className="text-[22px] font-extrabold leading-snug text-balance-tight">
          {es ? "Cada rep hace tu inglés más automático." : "Every rep makes your English more automatic."}
        </p>
      </section>

      <section className="rounded-3xl bg-card p-6 shadow-[var(--shadow-card)]">
        <p className="flex items-center justify-center gap-2 text-lg font-extrabold">
          🔥 5 / 5 {es ? "Reps completadas" : "Reps Completed"}
        </p>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-secondary">
          <div className="h-full w-full rounded-full bg-primary" />
        </div>
      </section>

      <section className="rounded-3xl bg-card p-6 shadow-[var(--shadow-card)]">
        <p className="text-[16px] leading-relaxed">
          {es
            ? "Hoy practicaste hablar en inglés. Mañana lo haremos otra vez y será más fácil, más rápido y más natural."
            : "Today you practiced speaking in English. Tomorrow, we'll do it again and make it easier, faster, and more natural."}
        </p>
        <p className="mt-5 flex items-center gap-2 text-[16px] font-extrabold">
          <Star className="size-5 fill-current text-primary" />
          {es ? "¡Sigue así!" : "Keep going!"}
        </p>
        <p className="mt-1 text-[15px] text-muted-foreground">
          {es ? "Práctica pequeña cada día = gran progreso." : "Small practice every day = big progress."}
        </p>
      </section>

      <section className="rounded-3xl border border-primary/25 bg-primary/8 p-6 text-center">
        <p className="flex items-center justify-center gap-2 text-2xl font-extrabold">
          <Flame className="size-6 text-primary" />
          {streak} {es ? (streak === 1 ? "día de racha" : "días de racha") : streak === 1 ? "Day Streak" : "Day Streak"}
        </p>
        <p className="mt-2 text-[15px] text-muted-foreground">
          {es ? "Vuelve mañana para mantener tu racha viva." : "Come back tomorrow to keep your streak alive."}
        </p>
      </section>

      <p className="pt-2 text-center text-xl font-extrabold">{es ? "¡Nos vemos mañana! 🚀" : "See you tomorrow! 🚀"}</p>

      <button
        type="button"
        onClick={handleComplete}
        disabled={saving}
        className="w-full rounded-2xl bg-primary px-6 py-6 text-lg font-extrabold tracking-wide text-primary-foreground shadow-[var(--shadow-lift)] transition-transform active:scale-[0.98] disabled:opacity-70"
      >
        {alreadyDone ? (es ? "IR AL INICIO ✓" : "GO TO HOME ✓") : es ? "COMPLETAR DÍA ✓" : "COMPLETE DAY ✓"}
      </button>
    </div>
  );
}

function isYesterday(date?: string): boolean {
  if (!date) return false;
  return date === ProfileService.dayKey(new Date(Date.now() - 24 * 60 * 60 * 1000));
}
