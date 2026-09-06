import { createFileRoute } from "@tanstack/react-router";
import { PastVerbCards } from "@/components/fluency/PastVerbCards";
import { CourseService } from "@/services/course-service";
import { useEffect, useState } from "react";
import type { CourseDay } from "@/lib/types";

export const Route = createFileRoute("/dev-verbcards")({
  component: DevVerbCards,
});

function DevVerbCards() {
  const [day, setDay] = useState<CourseDay | null>(null);
  useEffect(() => {
    CourseService.loadModule("past-stories")
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
        <h2 className="mb-2 text-sm font-bold uppercase">ES support ON (forced via localStorage)</h2>
        <ForceEsSupport />
      </section>
      <section>
        <h2 className="mb-2 text-sm font-bold uppercase">Collapsed</h2>
        <PastVerbCards day={day} collapsed />
      </section>
    </div>
  );
}

function ForceEsSupport() {
  useEffect(() => {
    const prefs = JSON.parse(localStorage.getItem("fluency-reps:prefs") || "{}") as Record<string, unknown>;
    prefs.spanishSupport = true;
    localStorage.setItem("fluency-reps:prefs", JSON.stringify(prefs));
  }, []);
  return null;
}
