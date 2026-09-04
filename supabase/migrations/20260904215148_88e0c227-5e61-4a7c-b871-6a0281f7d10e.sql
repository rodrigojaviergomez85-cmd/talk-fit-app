CREATE TABLE public.habit_practice_days (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  practice_date date NOT NULL,
  first_qualified_at timestamptz NOT NULL DEFAULT now(),
  last_qualified_at timestamptz NOT NULL DEFAULT now(),
  module_id text,
  curriculum_day smallint,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, practice_date)
);

GRANT SELECT, INSERT, UPDATE ON public.habit_practice_days TO authenticated;
GRANT ALL ON public.habit_practice_days TO service_role;

ALTER TABLE public.habit_practice_days ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own habit days" ON public.habit_practice_days
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users insert own habit days" ON public.habit_practice_days
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own habit days" ON public.habit_practice_days
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER habit_practice_days_updated_at
  BEFORE UPDATE ON public.habit_practice_days
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX habit_practice_days_user_idx ON public.habit_practice_days (user_id, practice_date);

-- Backfill: one row per learner per real local calendar date already recorded.
INSERT INTO public.habit_practice_days (user_id, practice_date, first_qualified_at, last_qualified_at)
SELECT user_id,
       COALESCE(local_day_key, to_char(completed_at, 'YYYY-MM-DD'))::date,
       min(completed_at),
       max(completed_at)
FROM public.day_progress
WHERE COALESCE(local_day_key, to_char(completed_at, 'YYYY-MM-DD')) ~ '^\d{4}-\d{2}-\d{2}$'
GROUP BY user_id, COALESCE(local_day_key, to_char(completed_at, 'YYYY-MM-DD'))
ON CONFLICT (user_id, practice_date) DO NOTHING;

-- Remove habit badges that are not earned under the calendar-day rule.
DELETE FROM public.achievements a
WHERE a.achievement_id LIKE 'habit-%'
  AND (SELECT count(*) FROM public.habit_practice_days h WHERE h.user_id = a.user_id)
      < CASE a.achievement_id
          WHEN 'habit-7' THEN 7 WHEN 'habit-20' THEN 20 WHEN 'habit-30' THEN 30
          WHEN 'habit-40' THEN 40 WHEN 'habit-60' THEN 60 WHEN 'habit-66' THEN 66
          WHEN 'habit-100' THEN 100 ELSE 0 END;