CREATE TABLE public.review_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  review_module_id text NOT NULL,
  practice_number smallint NOT NULL,
  completed_count integer NOT NULL DEFAULT 0,
  last_completed_at timestamptz,
  last_speaking_seconds integer NOT NULL DEFAULT 0,
  last_idea_count integer,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT review_progress_practice_range CHECK (practice_number BETWEEN 1 AND 5),
  CONSTRAINT review_progress_unique UNIQUE (user_id, review_module_id, practice_number)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.review_progress TO authenticated;
GRANT ALL ON public.review_progress TO service_role;

ALTER TABLE public.review_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own review progress"
ON public.review_progress FOR ALL TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER review_progress_updated_at
BEFORE UPDATE ON public.review_progress
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();