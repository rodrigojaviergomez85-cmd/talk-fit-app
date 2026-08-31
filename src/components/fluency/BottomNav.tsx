import { Link } from "@tanstack/react-router";
import { BarChart3, Dumbbell, Home, Mic, User } from "lucide-react";
import { useT, type TKey } from "@/lib/i18n";

const ITEMS = [
  { to: "/", key: "nav.home", icon: Home },
  { to: "/practice", key: "nav.practice", icon: Dumbbell },
  { to: "/progress", key: "nav.progress", icon: BarChart3 },
  { to: "/recordings", key: "nav.recordings", icon: Mic },
  { to: "/profile", key: "nav.account", icon: User },
] as const satisfies readonly { to: string; key: TKey; icon: typeof Home }[];


export function BottomNav() {
  const t = useT();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 backdrop-blur-md">
      <ul className="mx-auto flex w-full max-w-lg items-stretch justify-between px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2">
        {ITEMS.map(({ to, key, icon: Icon }) => {
          const label = t(key);
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                activeOptions={{ exact: to === "/" }}
                className="flex flex-col items-center gap-1 rounded-2xl py-2 text-[10px] font-semibold text-muted-foreground transition-colors"
                activeProps={{ className: "!text-primary" }}
                aria-label={label}
              >
                <Icon className="size-[22px]" />
                <span className="capitalize">{label.toLowerCase()}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
