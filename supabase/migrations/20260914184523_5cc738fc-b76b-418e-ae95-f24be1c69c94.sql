CREATE OR REPLACE FUNCTION public.admin_health_snapshot()
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  _res jsonb;
  _max_conn int;
  _last_ok timestamptz;
  _last_run jsonb;
  _backlog int;
begin
  if not public.has_role(auth.uid(), 'admin') then
    raise exception 'Forbidden';
  end if;

  select coalesce(nullif(current_setting('max_connections', true), '')::int, 0) into _max_conn;

  select max(finished_at) into _last_ok
  from public.job_runs where job_name = 'purge-audio' and ok;

  select to_jsonb(j) into _last_run
  from (
    select started_at, finished_at, ok, deleted_files, marked_rows, error
    from public.job_runs
    where job_name = 'purge-audio'
    order by started_at desc
    limit 1
  ) j;

  select (
    (select count(*) from public.purge_candidates(50000, 48, 90, 20))
    + (select count(*) from public.purge_day_final_candidates(50000, 90, 20))
  )::int into _backlog;

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
    'purge', jsonb_build_object(
      'last_ok_at', _last_ok,
      'hours_since_ok', case when _last_ok is null then null
                             else round(extract(epoch from (now() - _last_ok)) / 3600.0, 1) end,
      'backlog_files', _backlog,
      'backlog_capped', (_backlog >= 100000),
      'last_run', coalesce(_last_run, 'null'::jsonb)
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