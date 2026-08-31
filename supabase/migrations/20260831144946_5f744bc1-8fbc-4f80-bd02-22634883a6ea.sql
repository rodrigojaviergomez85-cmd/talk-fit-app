-- 1. practice_sessions
CREATE TABLE public.practice_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id text NOT NULL,
  day smallint NOT NULL,
  week smallint,
  stage smallint NOT NULL DEFAULT 0,
  sub_index smallint NOT NULL DEFAULT 0,
  attempted text[] NOT NULL DEFAULT '{}',
  skipped text[] NOT NULL DEFAULT '{}',
  status text NOT NULL DEFAULT 'in_progress',
  started_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, module_id, day)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.practice_sessions TO authenticated;
GRANT ALL ON public.practice_sessions TO service_role;
ALTER TABLE public.practice_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own practice sessions" ON public.practice_sessions
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER practice_sessions_updated_at BEFORE UPDATE ON public.practice_sessions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 2. recordings (one row per Rep 5 take)
CREATE TABLE public.recordings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id text NOT NULL,
  day smallint NOT NULL,
  take_number smallint NOT NULL,
  is_final_rep boolean NOT NULL DEFAULT false,
  duration_seconds numeric NOT NULL DEFAULT 0,
  estimated_idea_count integer,
  storage_path text NOT NULL,
  mime_type text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, module_id, day, take_number)
);
CREATE UNIQUE INDEX recordings_one_final_per_day
  ON public.recordings (user_id, module_id, day) WHERE is_final_rep;
CREATE INDEX recordings_user_created_idx ON public.recordings (user_id, created_at DESC);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.recordings TO authenticated;
GRANT ALL ON public.recordings TO service_role;
ALTER TABLE public.recordings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own recordings rows" ON public.recordings
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER recordings_updated_at BEFORE UPDATE ON public.recordings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 3. verb_progress
CREATE TABLE public.verb_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  verb_id text NOT NULL,
  discovered boolean NOT NULL DEFAULT false,
  first_discovered_at timestamptz,
  listen_count integer NOT NULL DEFAULT 0,
  practice_count integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, verb_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.verb_progress TO authenticated;
GRANT ALL ON public.verb_progress TO service_role;
ALTER TABLE public.verb_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own verb progress" ON public.verb_progress
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER verb_progress_updated_at BEFORE UPDATE ON public.verb_progress
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 4. user_preferences
CREATE TABLE public.user_preferences (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  app_language text NOT NULL DEFAULT 'es',
  spanish_support boolean NOT NULL DEFAULT false,
  onboarding_completed boolean NOT NULL DEFAULT false,
  migrated_local_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_preferences TO authenticated;
GRANT ALL ON public.user_preferences TO service_role;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own preferences" ON public.user_preferences
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER user_preferences_updated_at BEFORE UPDATE ON public.user_preferences
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();