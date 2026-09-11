import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createCheckoutSession } from "@/lib/subscription.functions";

export const Route = createFileRoute("/suscripcion/cancelado")({
  head: () => ({
    meta: [
      { title: "Pago cancelado · Fluency App" },
      { name: "description", content: "Cancelaste el pago de Fluency Pro. Puedes intentarlo cuando quieras." },
      { property: "og:title", content: "Pago cancelado · Fluency App" },
      { property: "og:description", content: "Cancelaste el pago de Fluency Pro." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CancelPage,
});

function CancelPage() {
  const navigate = useNavigate();
  const startCheckout = useServerFn(createCheckoutSession);
  const [loading, setLoading] = useState(false);

  async function retry() {
    setLoading(true);
    try {
      const { url } = await startCheckout({});
      window.location.href = url;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No se pudo iniciar el pago");
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-2xl font-bold text-foreground">No completaste el pago</h1>
      <p className="text-sm text-muted-foreground">
        No te cobramos nada. Puedes seguir usando tus intentos gratis y suscribirte cuando quieras.
      </p>
      <div className="mt-2 flex w-full flex-col gap-2">
        <Button className="w-full" onClick={retry} disabled={loading}>
          {loading ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
          Intentar de nuevo
        </Button>
        <Button variant="ghost" className="w-full" onClick={() => void navigate({ to: "/" })}>
          Volver al inicio
        </Button>
      </div>
    </main>
  );
}
