import { createFileRoute } from "@tanstack/react-router";
import { PastVerbCards } from "@/components/fluency/PastVerbCards";
import { SpanishProvider } from "@/components/fluency/TranslatableText";
import { useModuleContent } from "@/hooks/use-module-content";

export const Route = createFileRoute("/dev-verbcards")({
  component: DevVerbCards,
});

function DevVerbCards() {
  const content = useModuleContent("past-stories");
  if (content.status !== "ready") return <p className="p-8">loading…</p>;
  const day = content.module.days.find((d) => d.day === 1)!;
  return (
    <div className="space-y-10 p-4">
      <section>
        <p className="mb-2 text-xs font-bold">ES SUPPORT OFF</p>
        <SpanishProvider value={false}>
          <PastVerbCards day={day} />
        </SpanishProvider>
      </section>
      <section>
        <p className="mb-2 text-xs font-bold">ES SUPPORT ON</p>
        <SpanishProvider value={true}>
          <PastVerbCards day={day} />
        </SpanishProvider>
      </section>
      <section>
        <p className="mb-2 text-xs font-bold">COLLAPSED</p>
        <SpanishProvider value={true}>
          <PastVerbCards day={day} collapsed={true} />
        </SpanishProvider>
      </section>
    </div>
  );
}
