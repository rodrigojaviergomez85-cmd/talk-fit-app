import { createFileRoute } from "@tanstack/react-router";
import { PastVerbCards } from "@/components/fluency/PastVerbCards";
import { SpanishProvider } from "@/components/fluency/TranslatableText";
import { CourseService } from "@/services/course-service";
import { useEffect, useState } from "react";
import type { CourseDay } from "@/lib/types";

export const Route = createFileRoute("/dev-verbcards")({
  component: DevVerbCards,
});

function DevVerbCards() {
  const [day, setDay] = useState<CourseDay | null>(null);
  const [esOn, setEsOn] = useState(false);

  useEffect(() => {
    // Force Spanish support on for the second section, off for the first.
    const key = "fluency-reps:prefs";
    const raw = localStorage.getItem(key) || "{}";
    const prefs = JSON.parse(raw) as Record<string, unknown>;
    prefs["spanishSupport"] = false;
    localStorage.setItem(key, JSON.stringify(prefs));
    void CourseService.loadModule("past-stories")
      .then((m) => setDay(m.days.find((d) => d.day === 6) ?? null))
      .catch(console.error);
  }, []);

  if (!day) return <div className="p-4">Loading…</div>;

  return (
    <div className="space-y-8 p-4">
      <section>
        <h2 className="mb-2 text-sm font-bold uppercase">ES support OFF</h2>
        <PastVerbCards day={day} collapsed={false} />
      </section>
      <section>
        <h2 className="mb-2 text-sm font-bold uppercase">ES support ON</h2>
        <SpanishProvider value={true}>
          <PastVerbCards day={day} collapsed={false} />
        </SpanishProvider>
      </section>
      <section>
        <h2 className="mb-2 text-sm font-bold uppercase">Collapsed</h2>
        <PastVerbCards day={day} collapsed />
      </section>
    </div>
  );
}
