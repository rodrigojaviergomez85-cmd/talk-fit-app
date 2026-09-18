import { Link } from "@tanstack/react-router";
import { Dumbbell, Headphones, Home, MessageCircle, User } from "lucide-react";
import { useT, type TKey } from "@/lib/i18n";

type NavItem = { to: string; key: TKey; icon: typeof Home };
const ITEMS: readonly NavItem[] = [
  { to: "/", key: "nav.home", icon: Home },
  { to: "/practicar", key: "nav.practice", icon: Dumbbell },
  { to: "/natural-method", key: "nav.natural", icon: Headphones },
  { to: "/ai-coach", key: "nav.aiCoach", icon: MessageCircle },
  { to: "/profile", key: "nav.account", icon: User },
];




export function BottomNav() {
  const t = useT();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 backdrop-blur-md">
      <ul className="mx-auto flex w-full max-w-lg items-stretch justify-between px-1 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1.5">
        {ITEMS.map(({ to, key, icon: Icon }) => {
          const label = t(key);
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                activeOptions={{ exact: to === "/" }}
                className="flex flex-col items-center gap-0.5 rounded-2xl py-1.5 font-semibold leading-none text-muted-foreground transition-colors"
                activeProps={{ className: "!text-primary" }}
                aria-label={label}
              >
                <Icon className="size-5" />
                <span className="text-[9px] capitalize">{label.toLowerCase()}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

