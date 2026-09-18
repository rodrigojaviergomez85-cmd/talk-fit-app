CREATE TABLE public.support_ticket_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id uuid NOT NULL REFERENCES public.support_tickets(id) ON DELETE CASCADE,
  author_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  author_email text,
  body text NOT NULL,
  is_internal boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX support_ticket_comments_ticket_idx ON public.support_ticket_comments (ticket_id, created_at);

GRANT SELECT ON public.support_ticket_comments TO authenticated;
GRANT ALL ON public.support_ticket_comments TO service_role;

ALTER TABLE public.support_ticket_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read public comments on their tickets"
ON public.support_ticket_comments FOR SELECT TO authenticated
USING (
  is_internal = false
  AND EXISTS (
    SELECT 1 FROM public.support_tickets t
    WHERE t.id = support_ticket_comments.ticket_id AND t.user_id = auth.uid()
  )
);

ALTER TABLE public.support_tickets ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

CREATE TRIGGER support_tickets_set_updated_at
BEFORE UPDATE ON public.support_tickets
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();