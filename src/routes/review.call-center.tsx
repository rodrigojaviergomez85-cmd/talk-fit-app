import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRightLeft,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  HeartHandshake,
  Lock,
  Phone,
  UserCheck,
  Wrench,
} from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { SpeakButton } from "@/components/fluency/NaturalMethodPager";
import { useAppLang } from "@/lib/i18n";
import { CourseService } from "@/services/course-service";
import { CALL_CENTER_CATEGORIES } from "@/services/review/call-center-phrases";
import { getReviewAccessSnapshot } from "@/services/review/review-access";

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "greeting-opening": Phone,
  "asking-information": UserCheck,
  "hold-transfer": ArrowRightLeft,
  "calming-customer": HeartHandshake,
  "solving-troubleshooting": Wrench,
  "closing-followup": CheckCircle,
};

export const Route = createFileRoute("/review/call-center")({
  head: () => ({
    meta: [
      { title: "Call Center Phrases · Fluency App" },
      {
        name: "description",
        content: "Essential English phrases for call center calls, upset customers and daily work.",
      },
      { property: "og:title", content: "Call Center Phrases · Fluency App" },
      {
        property: "og:description",
        content: "Essential English phrases for call center calls, upset customers and daily work.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CallCenterPage,
});

function CallCenterPage() {
  const { lang } = useAppLang();
  const showEs = lang === "es";
  const [openId, setOpenId] = useState<string | null>(CALL_CENTER_CATEGORIES[0]?.id ?? null);
  const { currentModuleId, unlimited } = getReviewAccessSnapshot();
  const accessible = unlimited || CourseService.displayIndex(currentModuleId) >= CourseService.displayIndex("eagles-week-1");

  return (
    <AppShell>
      <div className="space-y-4 p-4">
        <Link
          to="/review/intermediate-advanced"
          className="inline-flex items-center gap-1 text-xs font-extrabold uppercase text-primary"
        >
          <ChevronLeft className="size-4" />
          {showEs ? "Intermedio + Avanzado" : "Intermediate + Advanced"}
        </Link>

        <header>
          <p className="text-[11px] font-extrabold uppercase text-primary">Review</p>
          <h1 className="text-2xl font-extrabold text-foreground">
            {showEs ? "Frases para Call Center" : "Call Center Phrases"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {showEs
              ? "48 frases útiles para atender llamadas, calmar clientes y sonar profesional."
              : "48 useful phrases for taking calls, calming customers and sounding professional."}
          </p>
        </header>

        {!accessible ? (
          <section className="rounded-2xl border border-border bg-card p-6 text-center">
            <Lock className="mx-auto mb-3 size-10 text-muted-foreground" aria-hidden="true" />
            <h2 className="mb-1 text-base font-extrabold text-foreground">
              {showEs ? "Guía bloqueada" : "Guide locked"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {showEs ? "Disponible desde Eagles. Sigue practicando para desbloquearla." : "Available from Eagles. Keep practicing to unlock it."}
            </p>
          </section>
        ) : (
          <div className="space-y-3">
            {CALL_CENTER_CATEGORIES.map((cat) => {
              const open = openId === cat.id;
              const Icon = CATEGORY_ICONS[cat.id];
              return (
                <section key={cat.id} className="overflow-hidden rounded-2xl border border-border bg-card">
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenId(open ? null : cat.id)}
                    className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                  >
                    <span className="flex items-center gap-3">
                      {Icon ? <Icon className="size-5 shrink-0 text-primary" aria-hidden="true" /> : null}
                      <span className="text-base font-extrabold text-foreground">{showEs ? cat.es : cat.en}</span>
                    </span>
                    <span className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                      {cat.phrases.length}
                      <ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
                    </span>
                  </button>

                  {open ? (
                    <ul className="divide-y divide-border border-t border-border">
                      {cat.phrases.map((phrase) => (
                        <li key={phrase.id} className="flex items-start justify-between gap-3 p-4">
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-extrabold leading-snug text-foreground">{phrase.en}</p>
                            <p className="text-xs leading-snug text-muted-foreground">{phrase.es}</p>
                          </div>
                          <SpeakButton text={phrase.en} showEs={showEs} className="shrink-0" />
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              );
            })}
          </div>
        )}
      </div>
    </AppShell>
  );
}
