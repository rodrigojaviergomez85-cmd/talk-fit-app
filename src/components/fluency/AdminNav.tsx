import { Link, useLocation } from "@tanstack/react-router";
import { useAppLang } from "@/lib/i18n";

const TABS = [
  { to: "/admin/metrics", es: "Métricas", en: "Metrics" },
  { to: "/admin/alertas", es: "Alertas", en: "Alerts" },
  { to: "/admin/limites", es: "Límites", en: "Limits" },
  { to: "/admin/soporte", es: "Soporte", en: "Support" },
  { to: "/admin/bug-reports", es: "Bugs", en: "Bugs" },
  { to: "/admin/course-audio", es: "Audio", en: "Audio" },
  { to: "/admin/storage-report", es: "Storage", en: "Storage" },
];

export function AdminNav() {
  const lang = useAppLang();
  const es = lang === "es";
  const { pathname } = useLocation();
  return (
    <nav
      aria-label={es ? "Navegación de administración" : "Admin navigation"}
      className="-mt-1 mb-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
    >
      {TABS.map((tab) => {
        const active = pathname === tab.to;
        return (
          <Link
            key={tab.to}
            to={tab.to}
            className={`shrink-0 rounded-full px-3 py-1.5 text-[12px] font-bold transition-colors ${
              active
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-foreground hover:bg-secondary/80"
            }`}
          >
            {es ? tab.es : tab.en}
          </Link>
        );
      })}
    </nav>
  );
}
