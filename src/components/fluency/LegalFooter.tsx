import { Link } from "@tanstack/react-router";
import { useAppLang } from "@/lib/i18n";

type LegalPage = "soporte" | "contacto" | "privacidad" | "terminos" | "eliminar";

const LINKS: { key: LegalPage; to: string; es: string; en: string }[] = [
  { key: "soporte", to: "/soporte", es: "Soporte", en: "Support" },
  { key: "contacto", to: "/contacto", es: "Contacto", en: "Contact" },
  { key: "privacidad", to: "/privacy-policy", es: "Política de privacidad", en: "Privacy policy" },
  { key: "terminos", to: "/terminos", es: "Términos y condiciones", en: "Terms & conditions" },
  { key: "eliminar", to: "/eliminar-cuenta", es: "Eliminar cuenta", en: "Delete account" },
];

/** Pie legal común: los mismos enlaces en soporte, contacto, privacidad y términos. */
export function LegalFooter({
  current,
  tone = "light",
}: {
  current: LegalPage;
  tone?: "light" | "dark";
}) {
  const es = useAppLang().lang === "es";
  const cls =
    tone === "dark"
      ? "text-primary-foreground underline underline-offset-4"
      : "text-primary underline underline-offset-2";

  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[12px] font-bold"
      aria-label={es ? "Enlaces legales" : "Legal links"}
    >
      {LINKS.filter((l) => l.key !== current).map((l) => (
        <Link key={l.key} to={l.to} className={cls}>
          {es ? l.es : l.en}
        </Link>
      ))}
    </nav>
  );
}
