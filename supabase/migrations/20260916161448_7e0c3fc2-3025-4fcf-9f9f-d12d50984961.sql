CREATE TABLE IF NOT EXISTS public.league_participation_overrides (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  participates boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.league_participation_overrides TO authenticated;
GRANT ALL ON public.league_participation_overrides TO service_role;

ALTER TABLE public.league_participation_overrides ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users read own league override" ON public.league_participation_overrides;
CREATE POLICY "Users read own league override"
  ON public.league_participation_overrides FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

DROP TRIGGER IF EXISTS set_league_participation_overrides_updated_at ON public.league_participation_overrides;
CREATE TRIGGER set_league_participation_overrides_updated_at
  BEFORE UPDATE ON public.league_participation_overrides
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Per-account opt-in wins over the admin / unlimited exclusion.
CREATE OR REPLACE FUNCTION public.league_is_excluded(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT CASE
    WHEN EXISTS (
      SELECT 1 FROM public.league_participation_overrides o
       WHERE o.user_id = _user_id AND o.participates
    ) THEN false
    ELSE public.is_unlimited_test_user(_user_id) OR public.has_role(_user_id, 'admin'::app_role)
  END
$$;

INSERT INTO public.league_participation_overrides (user_id, participates)
SELECT id, true FROM auth.users WHERE email = 'english4callcenters@gmail.com'
ON CONFLICT (user_id) DO UPDATE SET participates = true, updated_at = now();

DO $$
DECLARE r record;
BEGIN
  FOR r IN SELECT module_id, curriculum_week FROM public.league_pilot_cohorts WHERE enabled LOOP
    PERFORM public.league_backfill_cohort(r.module_id, r.curriculum_week);
  END LOOP;
END $$;