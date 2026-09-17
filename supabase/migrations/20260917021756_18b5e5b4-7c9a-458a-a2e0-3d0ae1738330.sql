CREATE TABLE public.live_coach_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  local_day date NOT NULL,
  seconds integer NOT NULL DEFAULT 0 CHECK (seconds >= 0 AND seconds <= 3600),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX live_coach_sessions_user_day_idx ON public.live_coach_sessions (user_id, local_day);

GRANT SELECT ON public.live_coach_sessions TO authenticated;
GRANT ALL ON public.live_coach_sessions TO service_role;

ALTER TABLE public.live_coach_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Learners read their own live sessions"
ON public.live_coach_sessions FOR SELECT TO authenticated
USING (auth.uid() = user_id);