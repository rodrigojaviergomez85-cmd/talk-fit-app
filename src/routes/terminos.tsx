import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/fluency/AppShell";
import { useAppLang } from "@/lib/i18n";

export const Route = createFileRoute("/terminos")({
  head: () => ({
    meta: [
      { title: "Términos de uso — Fluency App" },
      { name: "description", content: "Términos de uso de Fluency App." },
      { property: "og:title", content: "Términos de uso — Fluency App" },
      { property: "og:description", content: "Términos de uso de Fluency App." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  const es = useAppLang().lang === "es";
  return (
    <AppShell title={es ? "Términos de uso" : "Terms of use"}>
      <div className="space-y-4 rounded-3xl bg-card p-5 text-[14px] leading-relaxed text-muted-foreground shadow-[var(--shadow-card)]">
        {es ? (
          <>
            <p>
              Fluency App es una herramienta de práctica de inglés hablado. Al usarla aceptas
              estos términos.
            </p>
            <p>
              Tu cuenta es personal. El progreso, las grabaciones y las recompensas se guardan en
              tu cuenta y no pueden transferirse.
            </p>
            <p>
              Podemos actualizar el contenido del curso y estas condiciones; te avisaremos dentro
              de la app cuando un cambio sea importante.
            </p>
            <p>
              Para dudas sobre estos términos escríbenos a{" "}
              <span className="font-bold text-foreground">desarrollo.aplicaciones@e4ccglobal.com</span>.
            </p>
          </>
        ) : (
          <>
            <p>Fluency App is a spoken-English practice tool. By using it you accept these terms.</p>
            <p>
              Your account is personal. Progress, recordings and rewards are stored in your account
              and cannot be transferred.
            </p>
            <p>
              We may update course content and these terms; we will let you know in the app when a
              change is significant.
            </p>
            <p>
              Questions about these terms:{" "}
              <span className="font-bold text-foreground">desarrollo.aplicaciones@e4ccglobal.com</span>.
            </p>
          </>
        )}
      </div>
    </AppShell>
  );
}
