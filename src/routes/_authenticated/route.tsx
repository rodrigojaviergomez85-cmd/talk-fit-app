import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

/**
 * Authenticated layout: any child route under /_authenticated requires a
 * signed-in session. Without it, the learner is redirected to onboarding.
 * SSR is disabled because the session lives in localStorage and cannot be
 * read on the server.
 */
export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/onboarding" });
    return { user: data.user };
  },
  component: () => <Outlet />,
});
