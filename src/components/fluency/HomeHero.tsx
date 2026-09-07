import { Clock, Flame, Sparkles } from "lucide-react";
import type { JourneyState } from "@/lib/types";
import { habitDays } from "@/lib/habit";
import { useAppLang } from "@/lib/i18n";
import heroImage from "@/assets/home-hero.jpg";

/**
 * Visual-only Home hero: aspirational photo, motivational headline and three
 * at-a-glance metric chips. No logic lives here — every number is read from
 * the journey state that Home already loaded.
 */
export function HomeHero({ state }: { state: JourneyState }) {
  const { lang } = useAppLang();
  const es = lang === "es";
  const streak = state.streakDays || 0;
  const days = habitDays(state);
  const minutes = Math.round((state.totalSpeakingSeconds || 0) / 60);

  return (
    <section className="overflow-hidden rounded-3xl bg-navy shadow-[var(--shadow-card)]">
      <div className="relative h-44 w-full sm:h-52">
        <img
          src={heroImage}
          alt={es ? "Personas conversando en inglés" : "People speaking English together"}
          width={1280}
          height={960}
          className="size-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-navy/5" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
            {es ? "Hoy hablas inglés" : "Today you speak English"}
          </p>
          <h2 className="mt-1 text-[26px] font-extrabold leading-none tracking-tight text-navy-foreground">
            {es ? "¡Vamos a hablar!" : "Let's speak today!"}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 px-4 pb-4 pt-3">
        <Chip icon={<Flame className="size-3.5" />} value={`${streak}`} label={es ? "Racha" : "Streak"} />
        <Chip icon={<Sparkles className="size-3.5" />} value={`${days}`} label={es ? "Días" : "Days"} />
        <Chip icon={<Clock className="size-3.5" />} value={`${minutes}m`} label={es ? "Hablando" : "Speaking"} />
      </div>
    </section>
  );
}

function Chip({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-navy-soft px-3 py-2 text-center text-navy-foreground">
      <p className="flex items-center justify-center gap-1 text-primary">{icon}</p>
      <p className="mt-0.5 text-[17px] font-extrabold tabular-nums leading-none">{value}</p>
      <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.16em] text-navy-foreground/65">{label}</p>
    </div>
  );
}
