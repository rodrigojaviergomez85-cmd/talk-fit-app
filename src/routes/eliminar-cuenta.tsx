import { useEffect, useState } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { AppShell } from "@/components/fluency/AppShell";
import { LegalFooter } from "@/components/fluency/LegalFooter";
import { useAppLang } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { deleteMyAccount } from "@/lib/delete-account.functions";

export const Route = createFileRoute("/eliminar-cuenta")({
  head: () => ({
    meta: [
      { title: "Eliminar cuenta — Fluency App" },
      { name: "description", content: "Elimina tu cuenta y tus datos personales desde la app, al instante." },
      { property: "og:title", content: "Eliminar cuenta — Fluency App" },
      { property: "og:description", content: "Elimina tu cuenta y tus datos personales desde la app." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DeleteAccountPage,
});

const CONFIRM_WORD = "ELIMINAR";

function DeleteAccountPage() {
  const es = useAppLang().lang === "es";
  const navigate = useNavigate();
  const runDelete = useServerFn(deleteMyAccount);

  const [email, setEmail] = useState<string | null>(null);
  const [isGoogle, setIsGoogle] = useState(false);
  const [word, setWord] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null);
      const providers = (data.user?.app_metadata?.["providers"] as string[] | undefined) ?? [];
      setIsGoogle(providers.includes("google") && !providers.includes("email"));
    });
  }, []);

  const canSubmit = word.trim().toUpperCase() === CONFIRM_WORD && (isGoogle || password.length >= 6) && !busy;

  function goHome() {
    void navigate({ to: "/" });
  }

  function goToCreateAccount() {
    void navigate({ to: "/onboarding" });
  }

  async function reauthenticate(): Promise<boolean> {
    if (!email) return false;
    if (isGoogle) {
      const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.href });
      if (result.error) return false;
      if (result.redirected) return false;
      return true;
    }
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    return !signInError;
  }

  async function onDelete() {
    setBusy(true);
    setError(null);
    try {
      const ok = await reauthenticate();
      if (!ok) {
        setError(
          isGoogle
            ? es
              ? "No pudimos confirmar tu cuenta de Google. Inténtalo de nuevo."
              : "We could not confirm your Google account. Please try again."
            : es
              ? "La contraseña no es correcta."
              : "That password is not correct.",
        );
        setBusy(false);
        return;
      }
      const result = await runDelete();
      if (!result.ok) {
        setError(
          es
            ? "No pudimos eliminar tu cuenta. Inténtalo de nuevo en unos minutos."
            : "We could not delete your account. Please try again in a few minutes.",
        );
        setBusy(false);
        return;
      }
      await supabase.auth.signOut().catch(() => undefined);
      setDone(true);
    } catch {
      setError(es ? "Ocurrió un error inesperado." : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <AppShell title={es ? "Cuenta eliminada" : "Account deleted"}>
        <div className="space-y-5 rounded-3xl bg-card p-6 text-center shadow-[var(--shadow-card)]">
          <div className="space-y-2">
            <p className="text-[18px] font-extrabold tracking-tight">
              {es ? "Nos da mucha pena que te vayas" : "We're sad to see you go"}
            </p>
            <p className="text-[14px] leading-relaxed text-muted-foreground">
              {es
                ? "Tu cuenta y tus datos personales ya no existen. Puedes volver cuando quieras: solo crea una cuenta nueva y empezamos desde cero."
                : "Your account and personal data are gone. You can come back whenever you want: just create a new account and we'll start from scratch."}
            </p>
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={() => void goToCreateAccount()}
              className="min-h-[52px] w-full rounded-2xl bg-primary px-5 text-[13px] font-bold uppercase tracking-[0.14em] text-primary-foreground"
            >
              {es ? "Crear una cuenta nueva" : "Create a new account"}
            </button>

            <button
              type="button"
              onClick={() => void goHome()}
              className="min-h-[48px] w-full rounded-2xl border border-border px-5 text-[13px] font-bold uppercase tracking-[0.14em] text-muted-foreground"
            >
              {es ? "Cerrar" : "Close"}
            </button>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title={es ? "Eliminar cuenta" : "Delete account"}>
      <div className="space-y-4">
        <div className="space-y-4 rounded-3xl bg-card p-5 text-[14px] leading-relaxed text-muted-foreground shadow-[var(--shadow-card)]">
          <div className="flex items-start gap-2 text-destructive">
            <AlertTriangle className="mt-0.5 size-5 shrink-0" />
            <p className="text-[15px] font-extrabold">
              {es ? "Esto es inmediato e irreversible." : "This is immediate and irreversible."}
            </p>
          </div>

          <div>
            <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-foreground">
              {es ? "Se elimina para siempre" : "Deleted forever"}
            </p>
            <ul className="mt-1.5 list-disc space-y-1 pl-5">
              <li>{es ? "Tu acceso a la app" : "Your access to the app"}</li>
              <li>{es ? "Tu correo y tu nombre" : "Your email and your name"}</li>
              <li>{es ? "Tus grabaciones de voz" : "Your voice recordings"}</li>
              <li>{es ? "Tus transcripciones" : "Your transcripts"}</li>
            </ul>
            <p className="mt-1.5">
              {es
                ? "No podrás recuperar esta cuenta, pero puedes volver cuando quieras creando una cuenta nueva."
                : "You won't be able to recover this account, but you can come back anytime by creating a new one."}
            </p>
          </div>

          <div>
            <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-foreground">
              {es ? "Se conserva de forma anónima" : "Kept anonymously"}
            </p>
            <p className="mt-1.5">
              {es
                ? "Estadísticas de uso sin vínculo contigo: módulos completados, rachas y tiempo de práctica."
                : "Usage statistics with no link to you: completed modules, streaks and practice time."}
            </p>
          </div>
        </div>

        <div className="space-y-3 rounded-3xl border border-destructive/30 bg-card p-5">
          <label className="block text-[13px] font-bold" htmlFor="confirm-word">
            {es ? `Escribe ${CONFIRM_WORD} para confirmar` : `Type ${CONFIRM_WORD} to confirm`}
          </label>
          <input
            id="confirm-word"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            autoCapitalize="characters"
            autoComplete="off"
            className="min-h-[48px] w-full rounded-2xl border border-border bg-background px-4 text-[15px] font-bold tracking-[0.12em]"
          />

          {isGoogle ? (
            <p className="text-[13px] text-muted-foreground">
              {es
                ? "Te pediremos confirmar con Google antes de eliminar."
                : "We will ask you to confirm with Google before deleting."}
            </p>
          ) : (
            <>
              <label className="block text-[13px] font-bold" htmlFor="confirm-password">
                {es ? "Reintroduce tu contraseña" : "Re-enter your password"}
              </label>
              <input
                id="confirm-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="min-h-[48px] w-full rounded-2xl border border-border bg-background px-4 text-[15px]"
              />
            </>
          )}

          {error ? <p className="text-[13px] font-bold text-destructive">{error}</p> : null}

          <button
            type="button"
            disabled={!canSubmit}
            onClick={() => void onDelete()}
            className="min-h-[52px] w-full rounded-2xl bg-destructive px-5 text-[13px] font-bold uppercase tracking-[0.14em] text-destructive-foreground disabled:opacity-40"
          >
            {busy
              ? es
                ? "Eliminando…"
                : "Deleting…"
              : es
                ? "Eliminar mi cuenta para siempre"
                : "Delete my account forever"}
          </button>

          <Link
            to="/profile"
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-2xl border border-border px-4 text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground"
          >
            {es ? "Cancelar" : "Cancel"}
          </Link>
        </div>

        <LegalFooter current="eliminar" />
      </div>
    </AppShell>
  );
}
