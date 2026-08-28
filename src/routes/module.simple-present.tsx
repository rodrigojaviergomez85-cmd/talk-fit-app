import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { SpanishProvider, SpanishToggle } from "@/components/fluency/TranslatableText";
import { IntroStep } from "@/components/fluency/IntroStep";

export const Route = createFileRoute("/module/simple-present")({
  head: () => ({
    meta: [
      { title: "Step 0 — Simple Present | Fluency Reps" },
      {
        name: "description",
        content:
          "Learn to talk about your daily life using 'I' in the Simple Present. Friendly examples, a simple rule, and your mission for this module.",
      },
      { property: "og:title", content: "Step 0 — Simple Present | Fluency Reps" },
      {
        property: "og:description",
        content:
          "Learn to talk about your daily life using 'I' in the Simple Present. Friendly examples, a simple rule, and your mission.",
      },
    ],
  }),
  component: SimplePresentIntroPage,
});

function SimplePresentIntroPage() {
  const [showSpanish, setShowSpanish] = useState(false);
  const navigate = useNavigate();

  return (
    <SpanishProvider value={showSpanish}>
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-10 bg-navy px-4 py-3 text-navy-foreground">
          <div className="mx-auto flex w-full max-w-lg items-center justify-between">
            <Link
              to="/"
              className="-ml-2 inline-flex size-9 items-center justify-center rounded-full transition-colors hover:bg-white/10"
              aria-label="Go back"
            >
              <ChevronLeft className="size-5" />
            </Link>
            <p className="text-xs font-bold uppercase tracking-[0.2em]">Step 0</p>
            <Link
              to="/"
              className="rounded-full px-2 py-1 text-xs font-semibold uppercase tracking-wider text-navy-foreground/70 transition-colors hover:bg-white/10"
            >
              Exit
            </Link>
          </div>
        </header>

        <main className="mx-auto w-full max-w-lg px-4 pb-16 pt-6">
          <div className="mb-5">
            <SpanishToggle value={showSpanish} onChange={setShowSpanish} />
          </div>

          <IntroStep
            showSpanish={showSpanish}
            onStart={() => {
              void navigate({ to: "/practice" });
            }}
          />
        </main>
      </div>
    </SpanishProvider>
  );
}
