import { useEffect, useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, Loader2 } from "lucide-react";
import { AuthGate } from "@/components/fluency/AuthGate";
import { Button } from "@/components/ui/button";
import { checkSubscription } from "@/lib/subscription.functions";
import { useSectionLimits } from "@/hooks/use-daily-usage";

/**
 * Post-checkout confirmation. Pro status NEVER comes from the session_id in the
 * URL — only from `checkSubscription`, which reads Stripe + the subscribers row.
 * The webhook can take a couple of seconds, hence the retries.
 */
export const Route = createFileRoute("/suscripcion/exito")({
  head: () => ({
    meta: [
      { title: "Confirmando tu pago · Fluency App" },
      { name: "description", content: "Confirmación de tu suscripción a Fluency Pro." },
      { property: "og:title", content: "Confirmando tu pago · Fluency App" },
      { property: "og:description", content: "Confirmación de tu suscripción a Fluency Pro." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <AuthGate>
      <SuccessPage />
    </AuthGate>
  ),
});

const MAX_ATTEMPTS = 5;
const DELAY_MS = 2000;

function SuccessPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const sync = useServerFn(checkSubscription);
  const sections = useSectionLimits();
  const [state, setState] = useState<"checking" | "ok" | "pending">("checking");
  const [round, setRound] = useState(0);
  const cancelled = useRef(false);

  useEffect(() => {
    cancelled.current = false;
    setState("checking");

    async function run() {
      for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
        if (cancelled.current) return;
        try {
          const result = await sync({});
          if (result.subscribed) {
            if (cancelled.current) return;
            await queryClient.invalidateQueries({ queryKey: ["subscription"] });
            await queryClient.invalidateQueries({ queryKey: ["daily-usage"] });
            setState("ok");
            return;
          }
        } catch {
          /* keep retrying */
        }
        await new Promise((r) => setTimeout(r, DELAY_MS));
      }
      if (!cancelled.current) setState("pending");
    }

    void run();
    return () => {
      cancelled.current = true;
    };
  }, [queryClient, sync, round]);

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
      {state === "checking" ? (
        <>
          <Loader2 className="size-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Confirmando tu pago...</p>
        </>
      ) : null}

      {state === "ok" ? (
        <>
          <CheckCircle2 className="size-10 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">¡Ya eres Pro!</h1>
          <p className="text-sm text-muted-foreground">
            Multiplicamos por 4 tus intentos diarios en todas las secciones. Tus usos de hoy no se
            pierden: solo sube el tope.
          </p>
          {sections.data && sections.data.length > 0 ? (
            <ul className="w-full space-y-1 rounded-2xl border border-border bg-card p-4 text-sm">
              {sections.data.map((s) => (
                <li key={s.sectionKey} className="flex items-center justify-between gap-3">
                  <span className="truncate text-muted-foreground">{s.label}</span>
                  <span className="shrink-0 font-semibold text-foreground">
                    {s.freeLimit} → {s.proLimit}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
          <Button className="w-full" onClick={() => void navigate({ to: "/profile" })}>
            Ir a mi cuenta
          </Button>
        </>
      ) : null}

      {state === "pending" ? (
        <>
          <h1 className="text-xl font-bold text-foreground">Estamos procesando tu pago</h1>
          <p className="text-sm text-muted-foreground">
            Puede tardar un momento. Si ya pagaste, tu plan se activará solo.
          </p>
          <Button className="w-full" onClick={() => setRound((r) => r + 1)}>
            Reintentar
          </Button>
          <Button variant="ghost" className="w-full" onClick={() => void navigate({ to: "/profile" })}>
            Ir a mi cuenta
          </Button>
        </>
      ) : null}
    </main>
  );
}
