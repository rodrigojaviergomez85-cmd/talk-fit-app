import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";

export function AppShell({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-navy px-5 pb-6 pt-[max(1.25rem,env(safe-area-inset-top))] text-navy-foreground">
        <div className="mx-auto w-full max-w-lg">
          <p className="text-[13px] font-extrabold uppercase tracking-[0.28em] text-primary">Fluency Reps</p>
          {title ? <h1 className="mt-2 text-2xl font-extrabold tracking-tight">{title}</h1> : null}
        </div>
      </header>
      <main className="mx-auto w-full max-w-lg px-4 py-5">{children}</main>
      <BottomNav />
    </div>
  );
}
