import { useEffect } from "react";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { stopPlayback } from "@/hooks/use-recording-playback";
import type { Comparison } from "@/lib/progress-moments";
import type { JourneyState } from "@/lib/types";
import { useAppLang } from "@/lib/i18n";
import { WeekMoment } from "./WeekMoment";
import { ModuleMoment } from "./ModuleMoment";

type Props = {
  comparison: Comparison | null;
  state: JourneyState;
  onClose: () => void;
};

/** Bottom sheet for revisiting a week / module comparison from Recordings or Progress. */
export function MomentSheet({ comparison, state, onClose }: Props) {
  const { lang } = useAppLang();
  const es = lang === "es";

  useEffect(() => {
    if (!comparison) stopPlayback();
  }, [comparison]);

  return (
    <Drawer open={Boolean(comparison)} onOpenChange={(open) => (!open ? onClose() : undefined)}>
      <DrawerContent className="max-h-[92vh]">
        <DrawerHeader className="sr-only">
          <DrawerTitle>
            {comparison?.type === "week"
              ? es
                ? "Escucha tu semana"
                : "Hear your week"
              : es
                ? "Escucha tu cambio"
                : "Hear your change"}
          </DrawerTitle>
          <DrawerDescription>{es ? "Compara tus grabaciones." : "Compare your recordings."}</DrawerDescription>
        </DrawerHeader>
        <div className="overflow-y-auto px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-2">
          <div className="mx-auto w-full max-w-lg">
            {comparison?.type === "week" ? <WeekMoment comparison={comparison} /> : null}
            {comparison?.type === "module" ? <ModuleMoment comparison={comparison} state={state} /> : null}
            <button
              type="button"
              onClick={onClose}
              className="mt-4 min-h-[48px] w-full rounded-2xl border border-border px-4 text-[12px] font-bold uppercase tracking-[0.14em]"
            >
              {es ? "CERRAR" : "CLOSE"}
            </button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
