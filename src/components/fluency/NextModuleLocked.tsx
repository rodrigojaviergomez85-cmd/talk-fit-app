import { Lock } from "lucide-react";
import type { LadderEntry } from "@/services/progression";
import { CourseService } from "@/services/course-service";
import { ModuleBadge } from "@/components/fluency/ModuleBadge";
import type { ModuleId } from "@/lib/types";
import { useAppLang } from "@/lib/i18n";

/**
 * "Lo que sigue" — the single next ladder rung, shown as a locked preview
 * with its real module emblem in grey. Never a link: it opens only once the
 * current module is actually complete.
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

  return (
    <section
      aria-disabled="true"
      className="rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow-card)]"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">{t("home.upNext")}</p>
        <Lock className="size-4 text-muted-foreground" aria-hidden />
      </div>

      <div className="mt-3 flex items-center gap-4">
        {entry.kind === "module" ? (
          <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-secondary">
            <ModuleBadge moduleId={entry.module.id} size="md" locked es={es} />
          </div>
        ) : null}
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
          <p className="text-[20px] font-extrabold leading-tight tracking-tight">{title}</p>
          <p className="mt-1 text-[13px] font-semibold text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      <p className="mt-4 flex items-center gap-2 border-t border-border pt-3 text-[12px] font-semibold text-muted-foreground">
        <Lock className="size-3.5 shrink-0" aria-hidden /> {t("home.unlockAfter")} {after.title}
      </p>
    </section>
  );
}
