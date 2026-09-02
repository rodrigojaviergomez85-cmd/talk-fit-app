CREATE TABLE public.progress_moments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id text NOT NULL,
  week smallint NOT NULL DEFAULT 0,
  comparison_type text NOT NULL,
  selected_reflections text[] NOT NULL DEFAULT '{}'::text[],
  comparison_completed_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, module_id, week, comparison_type)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.progress_moments TO authenticated;
GRANT ALL ON public.progress_moments TO service_role;

ALTER TABLE public.progress_moments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own progress moments"
ON public.progress_moments
FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER progress_moments_updated_at
BEFORE UPDATE ON public.progress_moments
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();