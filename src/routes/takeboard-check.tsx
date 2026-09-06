import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TakeBoard, TAKE_COUNT } from "@/components/fluency/TakeBoard";
import { SpanishProvider } from "@/components/fluency/TranslatableText";
import { AppLangProvider } from "@/lib/i18n";

export const Route = createFileRoute("/takeboard-check")({
  component: Page,
});

const noop = () => undefined;

function Page() {
  const off = typeof window !== "undefined" && window.location.search.includes("off");
  const supportOn = !off;
  if (typeof window !== "undefined") {
    const base = "fluency-reps:prefs:v1:guest";
    try {
      window.localStorage.setItem(`${base}:appLanguage`, JSON.stringify("es"));
      window.localStorage.setItem(`${base}:spanishSupport`, JSON.stringify(supportOn));
    } catch {
      /* ignore */
    }
  }
  const [takes] = useState<(null)[]>(() => Array(TAKE_COUNT).fill(null));
  return (
    <AppLangProvider>
      <SpanishProvider value={supportOn}>
        <div className="min-h-screen bg-background p-4">
          <TakeBoard
            takes={takes}
            finalIndex={null}
            goalSeconds={[20, 60]}
            onRecorded={noop}
            onDelete={noop}
            onSelectFinal={noop}
          />
        </div>
      </SpanishProvider>
    </AppLangProvider>
  );
}
