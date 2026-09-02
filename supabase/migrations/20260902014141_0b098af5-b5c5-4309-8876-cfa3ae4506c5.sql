CREATE TABLE public.test_ready_progress (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id text NOT NULL,
  day smallint NOT NULL,
  sprint_type text NOT NULL,
  completed_at timestamp with time zone NOT NULL DEFAULT now(),
  attempts integer NOT NULL DEFAULT 1,
  response_seconds integer NOT NULL DEFAULT 0,
  completion_seconds integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (user_id, module_id, day)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.test_ready_progress TO authenticated;
GRANT ALL ON public.test_ready_progress TO service_role;

ALTER TABLE public.test_ready_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own test ready progress"
ON public.test_ready_progress
FOR ALL TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER test_ready_progress_updated_at
BEFORE UPDATE ON public.test_ready_progress
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();