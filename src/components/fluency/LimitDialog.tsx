import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { useDailyUsage, useSectionLimits } from "@/hooks/use-daily-usage";
import { createCheckoutSession } from "@/lib/subscription.functions";
import { useAppSettings } from "@/hooks/use-app-settings";

/**
 * LimitDialog — shown when a section's daily cap is reached.
 *
 * Every number comes from `section_limits` through the server; nothing here is
 * hardcoded. Free learners see the Pro offer, Pro learners only see when their
 * (already multiplied) cap resets.
 */
export function LimitDialog({
  sectionKey,
  open,
  onOpenChange,
}: {
  sectionKey: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { label, freeLimit, limit, isPro } = useDailyUsage(sectionKey);
  const sections = useSectionLimits();
  const settings = useAppSettings();
  const startCheckout = useServerFn(createCheckoutSession);
  const [loading, setLoading] = useState(false);

  // El x4 es un ajuste editable por el admin: nunca un número fijo en el código.
  const multiplier = settings.proMultiplier;
  const proLimit = sections.data?.find((s) => s.sectionKey === sectionKey)?.proLimit ?? freeLimit * multiplier;

  async function subscribe() {
    if (!user) {
      // Resume the flow after signing in.
      try {
        window.sessionStorage.setItem("fluency.resumeCheckout", "1");
      } catch {
        /* private mode */
      }
      void navigate({ to: "/onboarding" });
      return;
    }
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        {isPro ? (
          <>
            <DialogHeader>
              <DialogTitle>Alcanzaste tus {limit} intentos de hoy</DialogTitle>
              <DialogDescription>
                Tu plan Pro te da {limit} intentos diarios en {label}. Se reinician mañana.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex-col gap-2 sm:flex-col">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  onOpenChange(false);
                  void navigate({ to: "/cuenta" });
                }}
              >
                Ver mi consumo
              </Button>
              <Button className="w-full" onClick={() => onOpenChange(false)}>
                Entendido
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Llegaste a tu límite diario</DialogTitle>
              <DialogDescription>
                Usaste tus {freeLimit} intentos gratis de hoy en {label}. Con Pro multiplicas por {multiplier}
                tus intentos en todas las secciones: aquí tendrías {proLimit} al día, por 4.99 USD al
                mes. Renovación automática y cancelas cuando quieras.
              </DialogDescription>
            </DialogHeader>

            {sections.data && sections.data.length > 0 ? (
              <ul className="space-y-1 rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
                {sections.data.map((s) => (
                  <li key={s.sectionKey} className="flex items-center justify-between gap-3">
                    <span className="truncate">{s.label}</span>
                    <span className="shrink-0 font-semibold text-foreground">
                      {s.freeLimit} → {s.proLimit}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}

            <DialogFooter className="flex-col gap-2 sm:flex-col">
              {/* El admin puede apagar la venta sin tocar código. */}
              {settings.billingEnabled ? (
                <Button className="w-full" onClick={subscribe} disabled={loading}>
                  {loading ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
                  Suscribirme por $4.99/mes
                </Button>
              ) : null}
              <Button variant="ghost" className="w-full" onClick={() => onOpenChange(false)}>
                Ahora no
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
