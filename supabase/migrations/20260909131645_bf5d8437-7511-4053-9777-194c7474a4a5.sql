CREATE TYPE public.bug_report_status AS ENUM ('new', 'reviewed', 'resolved');

CREATE TABLE public.bug_reports (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  email text,
  message text NOT NULL,
  area text NOT NULL DEFAULT 'other',
  expected text,
  context jsonb NOT NULL DEFAULT '{}'::jsonb,
  screenshot_path text,
  status public.bug_report_status NOT NULL DEFAULT 'new',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT ALL ON public.bug_reports TO service_role;
GRANT SELECT, UPDATE ON public.bug_reports TO authenticated;

ALTER TABLE public.bug_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins read bug reports"
  ON public.bug_reports FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update bug reports"
  ON public.bug_reports FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER bug_reports_updated_at
  BEFORE UPDATE ON public.bug_reports
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX bug_reports_created_at_idx ON public.bug_reports (created_at DESC);
CREATE INDEX bug_reports_status_idx ON public.bug_reports (status, created_at DESC);