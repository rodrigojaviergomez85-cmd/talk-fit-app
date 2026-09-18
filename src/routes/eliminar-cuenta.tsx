import { Link, createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/fluency/AppShell";
import { useAppLang } from "@/lib/i18n";

export const Route = createFileRoute("/eliminar-cuenta")({
  head: () => ({
    meta: [
      { title: "Eliminar cuenta — Fluency App" },
      { name: "description", content: "Cómo solicitar la eliminación de tu cuenta y tus datos de Fluency App." },
      { property: "og:title", content: "Eliminar cuenta — Fluency App" },
      { property: "og:description", content: "Cómo solicitar la eliminación de tu cuenta y tus datos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DeleteAccountPage,
});

function DeleteAccountPage() {
  const es = useAppLang().lang === "es";
  return (
    <AppShell title={es ? "Eliminar cuenta" : "Delete account"}>
      <div className="space-y-4">
        <div className="space-y-4 rounded-3xl bg-card p-5 text-[14px] leading-relaxed text-muted-foreground shadow-[var(--shadow-card)]">
          {es ? (
            <>
              <p>
                Puedes solicitar la eliminación de tu cuenta y de todos tus datos (progreso,
                grabaciones y perfil) escribiéndonos desde el correo con el que te registraste a{" "}
                <span className="font-bold text-foreground">desarrollo.aplicaciones@e4ccglobal.com</span>{" "}
                con el asunto «Eliminar mi cuenta».
              </p>
              <p>Confirmamos la eliminación en un máximo de 2 días hábiles. Esta acción no se puede deshacer.</p>
            </>
          ) : (
            <>
              <p>
                To delete your account and all your data (progress, recordings and profile), email us
                from the address you registered with at{" "}
                <span className="font-bold text-foreground">desarrollo.aplicaciones@e4ccglobal.com</span>{" "}
                with the subject “Delete my account”.
              </p>
              <p>We confirm deletion within 2 business days. This action cannot be undone.</p>
            </>
          )}
        </div>
        <Link
          to="/soporte"
          className="inline-flex min-h-[48px] w-full items-center justify-center rounded-2xl border border-border px-4 text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground"
        >
          {es ? "Volver a soporte" : "Back to support"}
        </Link>
      </div>
    </AppShell>
  );
}
