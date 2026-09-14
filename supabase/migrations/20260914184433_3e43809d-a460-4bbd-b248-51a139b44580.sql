CREATE TABLE public.job_runs (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_name text NOT NULL,
  started_at timestamptz NOT NULL DEFAULT now(),
  finished_at timestamptz,
  ok boolean NOT NULL DEFAULT false,
  deleted_files integer NOT NULL DEFAULT 0,
  marked_rows integer NOT NULL DEFAULT 0,
  error text,
  detail jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.job_runs TO service_role;
GRANT SELECT ON public.job_runs TO authenticated;

ALTER TABLE public.job_runs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read job runs"
  ON public.job_runs FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER job_runs_updated_at BEFORE UPDATE ON public.job_runs
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX job_runs_name_started_idx ON public.job_runs (job_name, started_at DESC);

CREATE INDEX IF NOT EXISTS recordings_unpurged_created_idx
  ON public.recordings (created_at)
  WHERE audio_purged_at IS NULL;

CREATE INDEX IF NOT EXISTS day_progress_unpurged_completed_idx
  ON public.day_progress (completed_at)
  WHERE recording_purged_at IS NULL;

CREATE OR REPLACE FUNCTION public.purge_candidates(
  _limit integer,
  _take_min_age_hours integer,
  _final_retention_days integer,
  _module_last_day integer
)
RETURNS TABLE(
  id uuid,
  user_id uuid,
  module_id text,
  day smallint,
  take_number smallint,
  is_final_rep boolean,
  storage_path text,
  created_at timestamptz,
  audio_purged_at timestamptz,
  duration_seconds numeric,
  mime_type text
)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT r.id, r.user_id, r.module_id, r.day, r.take_number, r.is_final_rep,
         r.storage_path, r.created_at, r.audio_purged_at, r.duration_seconds, r.mime_type
  FROM public.recordings r
  WHERE r.audio_purged_at IS NULL
    AND (
      CASE
        WHEN r.is_final_rep
          OR EXISTS (SELECT 1 FROM public.day_progress dp WHERE dp.recording_path = r.storage_path)
        THEN r.day NOT IN (1, _module_last_day)
             AND r.created_at < now() - make_interval(days => _final_retention_days)
        ELSE r.created_at < now() - make_interval(hours => _take_min_age_hours)
      END
    )
  ORDER BY r.created_at ASC
  LIMIT greatest(_limit, 0)
$$;

REVOKE ALL ON FUNCTION public.purge_candidates(integer, integer, integer, integer) FROM public, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.purge_candidates(integer, integer, integer, integer) TO service_role;

CREATE OR REPLACE FUNCTION public.purge_day_final_candidates(
  _limit integer,
  _final_retention_days integer,
  _module_last_day integer
)
RETURNS TABLE(
  user_id uuid,
  module_id text,
  day smallint,
  completed_at timestamptz,
  recording_path text,
  recording_purged_at timestamptz
)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT dp.user_id, dp.module_id, dp.day, dp.completed_at, dp.recording_path, dp.recording_purged_at
  FROM public.day_progress dp
  WHERE dp.recording_purged_at IS NULL
    AND dp.recording_path IS NOT NULL
    AND dp.day NOT IN (1, _module_last_day)
    AND dp.completed_at < now() - make_interval(days => _final_retention_days)
  ORDER BY dp.completed_at ASC
  LIMIT greatest(_limit, 0)
$$;

REVOKE ALL ON FUNCTION public.purge_day_final_candidates(integer, integer, integer) FROM public, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.purge_day_final_candidates(integer, integer, integer) TO service_role;

CREATE OR REPLACE FUNCTION public.purge_backlog(
  _take_min_age_hours integer,
  _final_retention_days integer,
  _module_last_day integer
)
RETURNS integer
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT (
    (SELECT count(*) FROM public.purge_candidates(1000000, _take_min_age_hours, _final_retention_days, _module_last_day))
    + (SELECT count(*) FROM public.purge_day_final_candidates(1000000, _final_retention_days, _module_last_day))
  )::int
$$;

REVOKE ALL ON FUNCTION public.purge_backlog(integer, integer, integer) FROM public, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.purge_backlog(integer, integer, integer) TO service_role;

INSERT INTO public.alert_thresholds (key, label, warn, critical, unit, sort_order)
VALUES
  ('purge_hours_since_ok', 'Horas sin limpieza exitosa', 24, 48, 'h', 6),
  ('purge_backlog_files', 'Archivos pendientes de borrar', 20000, 60000, 'count', 7)
ON CONFLICT (key) DO NOTHING;