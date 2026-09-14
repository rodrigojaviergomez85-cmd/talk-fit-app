CREATE TABLE public.alert_thresholds (
  key text PRIMARY KEY,
  label text NOT NULL,
  warn numeric NOT NULL,
  critical numeric NOT NULL,
  unit text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, UPDATE ON public.alert_thresholds TO authenticated;
GRANT ALL ON public.alert_thresholds TO service_role;

ALTER TABLE public.alert_thresholds ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read alert thresholds"
  ON public.alert_thresholds FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update alert thresholds"
  ON public.alert_thresholds FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER alert_thresholds_updated_at
  BEFORE UPDATE ON public.alert_thresholds
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.alert_thresholds (key, label, warn, critical, unit, sort_order) VALUES
  ('ai_daily_usd', 'Gasto diario de IA', 25, 60, 'usd', 1),
  ('ai_spike_ratio', 'Salto vs promedio 7 días', 1.5, 2.5, 'x', 2),
  ('storage_disk_pct', 'Disco usado', 60, 80, 'pct', 3),
  ('storage_daily_mb', 'MB nuevos por día', 4000, 8000, 'mb', 4),
  ('peak_hour_sessions', 'Prácticas en la hora pico', 1200, 2500, 'count', 5),
  ('db_connections_pct', 'Conexiones usadas', 60, 80, 'pct', 6),
  ('db_size_gb', 'Tamaño de la base', 100, 300, 'gb', 7);

CREATE OR REPLACE FUNCTION public.admin_health_snapshot()
RETURNS jsonb
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
declare
  _res jsonb;
  _max_conn int;
begin
  if not public.has_role(auth.uid(), 'admin') then
    raise exception 'Forbidden';
  end if;

  select coalesce(nullif(current_setting('max_connections', true), '')::int, 0) into _max_conn;

  with ai_days as (
    select to_char(window_start, 'YYYY-MM-DD') as day_key,
           endpoint,
           sum(request_count)::int as requests
    from public.ai_usage_limits
    where window_start >= now() - interval '8 days'
    group by 1, 2
  ),
  rec_days as (
    select to_char(created_at, 'YYYY-MM-DD') as day_key,
           count(*)::int as files,
           round(coalesce(sum(duration_seconds), 0) * 3000 / 1048576.0, 1) as mb
    from public.recordings
    where created_at >= now() - interval '8 days'
    group by 1
  ),
  rec_totals as (
    select count(*)::int as files_total,
           round(coalesce(sum(duration_seconds), 0) * 3000 / 1048576.0, 1) as mb_total,
           count(*) filter (where audio_purged_at is not null)::int as purged_total
    from public.recordings
  ),
  active_days as (
    select local_day_key as day_key, count(distinct user_id)::int as users
    from public.practice_attempts
    where first_recording_at is not null
      and first_recording_at >= now() - interval '8 days'
    group by 1
  ),
  hours as (
    select to_char(date_trunc('hour', first_recording_at), 'YYYY-MM-DD HH24:00') as hour_key,
           count(*)::int as sessions
    from public.practice_attempts
    where first_recording_at >= now() - interval '24 hours'
    group by 1
  )
  select jsonb_build_object(
    'generated_at', now(),
    'ai', jsonb_build_object(
      'by_day', coalesce((select jsonb_agg(jsonb_build_object(
          'day_key', day_key, 'endpoint', endpoint, 'requests', requests) order by day_key desc) from ai_days), '[]'::jsonb),
      'coach_today', (select count(*)::int from public.final_audio_coach_feedback
                       where created_at >= date_trunc('day', now()) and status <> 'pending')
    ),
    'storage', jsonb_build_object(
      'by_day', coalesce((select jsonb_agg(jsonb_build_object(
          'day_key', day_key, 'files', files, 'mb', mb) order by day_key desc) from rec_days), '[]'::jsonb),
      'files_total', (select files_total from rec_totals),
      'mb_total', (select mb_total from rec_totals),
      'purged_total', (select purged_total from rec_totals),
      'disk_gb', 500
    ),
    'activity', jsonb_build_object(
      'by_day', coalesce((select jsonb_agg(jsonb_build_object(
          'day_key', day_key, 'users', users) order by day_key desc) from active_days), '[]'::jsonb),
      'by_hour', coalesce((select jsonb_agg(jsonb_build_object(
          'hour_key', hour_key, 'sessions', sessions) order by hour_key) from hours), '[]'::jsonb),
      'users_total', (select count(*)::int from auth.users)
    ),
    'database', jsonb_build_object(
      'size_gb', round((pg_database_size(current_database()) / 1073741824.0)::numeric, 2),
      'connections', (select count(*)::int from pg_stat_activity),
      'max_connections', _max_conn
    ),
    'thresholds', coalesce((select jsonb_agg(jsonb_build_object(
        'key', key, 'label', label, 'warn', warn, 'critical', critical, 'unit', unit, 'sort_order', sort_order)
        order by sort_order) from public.alert_thresholds), '[]'::jsonb)
  ) into _res;

  return _res;
end;
$function$;

REVOKE ALL ON FUNCTION public.admin_health_snapshot() FROM public, anon;
GRANT EXECUTE ON FUNCTION public.admin_health_snapshot() TO authenticated;