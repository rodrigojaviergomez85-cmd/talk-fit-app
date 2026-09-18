import { createFileRoute, redirect } from "@tanstack/react-router";

// /contacto es solo un alias amable de la página de soporte.
export const Route = createFileRoute("/contacto")({
  beforeLoad: () => {
    throw redirect({ to: "/soporte" });
  },
  component: () => null,
});
