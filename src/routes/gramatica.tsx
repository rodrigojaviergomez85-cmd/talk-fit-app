import { createFileRoute, notFound } from "@tanstack/react-router";
import { AppShell } from "@/components/fluency/AppShell";
import { GrammarQuizScreen } from "@/components/fluency/GrammarQuizScreen";
import { AuthGate } from "@/components/fluency/AuthGate";
import { useAuth } from "@/lib/auth";
import { getGrammarQuiz } from "@/services/grammar-quiz";
import { useAppLang } from "@/lib/i18n";
import { DEFAULT_MODULE, isModuleId } from "@/services/course-service";
import type { ModuleId } from "@/lib/types";

export const Route = createFileRoute("/gramatica")({
  validateSearch: (search: Record<string, unknown>) => {
    const raw = search["module"];
    const module: ModuleId = isModuleId(raw) ? raw : DEFAULT_MODULE;
    return { module, day: Math.max(1, Math.min(200, Number(search["day"]) || 1)) };
  },
  beforeLoad: ({ search }) => {
    if (!getGrammarQuiz(search.module, search.day)) throw notFound();
  },
  head: () => ({
    meta: [
      { title: "Gramática del día · Fluency App" },
      {
        name: "description",
        content: "Veinte ejercicios de gramática del día: opción múltiple, encuentra el error y ordena la oración.",
      },
      { property: "og:title", content: "Gramática del día · Fluency App" },
      { property: "og:description", content: "Practica la gramática del día y gana puntos para tu liga semanal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: GrammarPage,
  notFoundComponent: () => (
    <AppShell>
      <div className="p-6 text-center text-sm text-muted-foreground">
        Esta evaluación todavía no está disponible.
      </div>
    </AppShell>
  ),
});

function GrammarPage() {
  const { module, day } = Route.useSearch();
  const { lang } = useAppLang();
  const { user, loading } = useAuth();
  const quiz = getGrammarQuiz(module, day);
  if (!quiz) return null;
  if (loading) {
    return (
      <AppShell>
        <div className="p-6 text-center text-[13px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
          {lang === "es" ? "CARGANDO…" : "LOADING…"}
        </div>
      </AppShell>
    );
  }
  if (!user) {
    return (
      <div className="min-h-screen bg-background px-4 py-8">
        <AuthGate blocking />
      </div>
    );
  }
  return <GrammarQuizScreen quiz={quiz} moduleId={module} day={day} es={lang === "es"} />;
}
