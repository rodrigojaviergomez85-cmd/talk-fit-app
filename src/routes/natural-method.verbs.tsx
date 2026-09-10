import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/natural-method/verbs")({
  component: () => <Outlet />,
});
