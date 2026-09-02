import { useState } from "react";
import { Info, Flame, Repeat2, HeartHandshake } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { HABIT_EXPLANATION } from "@/lib/habit";
import { useAppLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Props = {
  /** "card" = subtle link on the habit card; "navy" = button on the dark 66-day celebration. */
  tone?: "card" | "navy";
};

/**
 * ¿POR QUÉ 66 DÍAS? — opens a bottom sheet explaining what the 66-day habit
 * challenge is and the research behind it. Self-contained trigger + sheet.
 */
export function HabitExplainer({ tone = "card" }: Props) {
  const { lang } = useAppLang();
  const es = lang === "es";
  const [open, setOpen] = useState(false);
  const label = es ? "¿Por qué 66 días?" : "Why 66 days?";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex min-h-[44px] items-center gap-1.5 rounded-full px-3 text-[12px] font-bold",
          tone === "navy"
            ? "border border-navy-foreground/25 text-navy-foreground"
            : "text-primary underline-offset-4 hover:underline",
        )}
      >
        <Info className="size-3.5 shrink-0" />
        {label}
      </button>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="max-h-[92vh]">
          <DrawerHeader className="sr-only">
            <DrawerTitle>{es ? HABIT_EXPLANATION.title.es : HABIT_EXPLANATION.title.en}</DrawerTitle>
            <DrawerDescription>
              {es ? "Explicación del reto de 66 días." : "Explanation of the 66-day challenge."}
            </DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-2">
            <div className="mx-auto w-full max-w-lg space-y-4">
              <h2 className="text-center text-[20px] font-extrabold tracking-tight">
                {es ? HABIT_EXPLANATION.title.es : HABIT_EXPLANATION.title.en}
              </h2>

              <section className="rounded-3xl border border-border bg-card p-5">
                <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                  <Flame className="size-4" />
                  {es ? HABIT_EXPLANATION.whatTitle.es : HABIT_EXPLANATION.whatTitle.en}
                </p>
                <p className="mt-2 text-[14px] font-medium leading-relaxed text-foreground/90">
                  {es ? HABIT_EXPLANATION.what.es : HABIT_EXPLANATION.what.en}
                </p>
              </section>

              <section className="rounded-3xl border border-border bg-card p-5">
                <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                  <Repeat2 className="size-4" />
                  {es ? HABIT_EXPLANATION.whyTitle.es : HABIT_EXPLANATION.whyTitle.en}
                </p>
                <p className="mt-2 text-[14px] font-medium leading-relaxed text-foreground/90">
                  {es ? HABIT_EXPLANATION.why.es : HABIT_EXPLANATION.why.en}
                </p>
              </section>

              <p className="flex items-start gap-2 rounded-2xl bg-secondary/60 px-4 py-3 text-[13px] font-semibold text-muted-foreground">
                <HeartHandshake className="mt-0.5 size-4 shrink-0 text-primary" />
                {es ? HABIT_EXPLANATION.noShame.es : HABIT_EXPLANATION.noShame.en}
              </p>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="min-h-[48px] w-full rounded-2xl border border-border px-4 text-[12px] font-bold uppercase tracking-[0.14em]"
              >
                {es ? "CERRAR" : "CLOSE"}
              </button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
