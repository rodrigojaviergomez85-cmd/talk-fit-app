import { Lock } from "lucide-react";
import type { LadderEntry } from "@/services/progression";
import { CourseService } from "@/services/course-service";
import { NEXT_UP } from "@/lib/progress-moments";
import type { ModuleId } from "@/lib/types";
import { useAppLang } from "@/lib/i18n";

/**
 * UP NEXT 🔒 — the single next ladder rung, shown as a small locked preview.
 * Never a link: it opens only once the current module is actually complete.
 */
export function NextModuleLocked({ entry, afterModuleId }: { entry: LadderEntry; afterModuleId: ModuleId }) {
  const { t, lang } = useAppLang();
  const es = lang === "es";
  const after = CourseService.getModule(afterModuleId);

  const label = entry.kind === "module" ? entry.module.label : entry.level.label;
  const title = entry.kind === "module" ? entry.module.title : entry.level.title;
  const subtitle =
    entry.kind === "module"
      ? es
        ? entry.module.subtitleEs
        : entry.module.subtitle
      : es
        ? entry.level.subtitleEs
        : entry.level.subtitle;
  const emoji = entry.kind === "module" ? NEXT_UP[entry.module.id]?.emoji : entry.level.emoji;

  return (
    <section
      aria-disabled="true"
      className="rounded-3xl border border-dashed border-border bg-secondary/40 p-5 text-muted-foreground"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em]">{t("home.upNext")}</p>
        {entry.kind === "upcoming" ? (
          <span className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em]">
            {t("status.soon")}
          </span>
        ) : null}
      </div>
      <div className="mt-3 flex items-center gap-3">
        {emoji ? (
          <span className="text-3xl opacity-70 grayscale" aria-hidden>
            {emoji}
          </span>
        ) : null}
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em]">{label}</p>
          <p className="text-[20px] font-extrabold leading-tight tracking-tight text-foreground/70">{title}</p>
        </div>
      </div>
      <p className="mt-2 text-[13px] font-semibold">{subtitle}</p>
      <p className="mt-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em]">
        <Lock className="size-3.5" aria-hidden /> {t("home.unlockAfter")} {after.title}
      </p>
    </section>
  );
}
