CREATE TABLE public.support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  nombre text NOT NULL,
  email text NOT NULL,
  categoria text NOT NULL,
  mensaje text NOT NULL,
  estado text NOT NULL DEFAULT 'nuevo',
  app_version text,
  user_agent text
);
GRANT INSERT ON public.support_tickets TO anon;
GRANT INSERT, SELECT ON public.support_tickets TO authenticated;
GRANT ALL ON public.support_tickets TO service_role;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can create support tickets"
ON public.support_tickets FOR INSERT TO anon, authenticated
WITH CHECK (true);
CREATE POLICY "Users can read their own tickets"
ON public.support_tickets FOR SELECT TO authenticated
USING (auth.uid() = user_id);