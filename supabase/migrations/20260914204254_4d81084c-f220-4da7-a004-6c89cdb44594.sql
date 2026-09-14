CREATE TABLE public.ai_call_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  user_id uuid NOT NULL,
  endpoint text NOT NULL,
  provider text NOT NULL CHECK (provider IN ('groq', 'lovable-gateway', 'none')),
  model text,
  module_id text,
  day integer,
  audio_seconds numeric(10,3),
  input_tokens integer,
  output_tokens integer,
  characters integer,
  ok boolean NOT NULL,
  error_code text,
  latency_ms integer,
  est_cost_usd numeric(12,8) NOT NULL DEFAULT 0
);
CREATE INDEX ai_call_log_created_at_idx ON public.ai_call_log (created_at);
CREATE INDEX ai_call_log_user_created_idx ON public.ai_call_log (user_id, created_at);
CREATE INDEX ai_call_log_endpoint_created_idx ON public.ai_call_log (endpoint, created_at);
REVOKE ALL ON public.ai_call_log FROM anon, authenticated;
GRANT ALL ON public.ai_call_log TO service_role;
ALTER TABLE public.ai_call_log ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.ai_daily_rollup (
  day date NOT NULL,
  endpoint text NOT NULL,
  model text NOT NULL DEFAULT '',
  calls integer NOT NULL DEFAULT 0,
  failures integer NOT NULL DEFAULT 0,
  denials integer NOT NULL DEFAULT 0,
  cache_hits integer NOT NULL DEFAULT 0,
  audio_seconds numeric(14,3) NOT NULL DEFAULT 0,
  input_tokens bigint NOT NULL DEFAULT 0,
  output_tokens bigint NOT NULL DEFAULT 0,
  characters bigint NOT NULL DEFAULT 0,
  est_cost_usd numeric(14,8) NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (day, endpoint, model)
);
REVOKE ALL ON public.ai_daily_rollup FROM anon, authenticated;
GRANT ALL ON public.ai_daily_rollup TO service_role;
ALTER TABLE public.ai_daily_rollup ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.bump_ai_rollup(
  _endpoint text, _model text, _calls integer, _failures integer, _denials integer,
  _cache_hits integer, _audio_seconds numeric, _input_tokens bigint, _output_tokens bigint,
  _characters bigint, _est_cost_usd numeric)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  INSERT INTO public.ai_daily_rollup AS r
    (day, endpoint, model, calls, failures, denials, cache_hits, audio_seconds,
     input_tokens, output_tokens, characters, est_cost_usd)
  VALUES ((now() AT TIME ZONE 'UTC')::date, _endpoint, coalesce(_model, ''),
     coalesce(_calls,0), coalesce(_failures,0), coalesce(_denials,0), coalesce(_cache_hits,0),
     coalesce(_audio_seconds,0), coalesce(_input_tokens,0), coalesce(_output_tokens,0),
     coalesce(_characters,0), coalesce(_est_cost_usd,0))
  ON CONFLICT (day, endpoint, model) DO UPDATE SET
    calls = r.calls + excluded.calls,
    failures = r.failures + excluded.failures,
    denials = r.denials + excluded.denials,
    cache_hits = r.cache_hits + excluded.cache_hits,
    audio_seconds = r.audio_seconds + excluded.audio_seconds,
    input_tokens = r.input_tokens + excluded.input_tokens,
    output_tokens = r.output_tokens + excluded.output_tokens,
    characters = r.characters + excluded.characters,
    est_cost_usd = r.est_cost_usd + excluded.est_cost_usd,
    updated_at = now();
$$;
REVOKE ALL ON FUNCTION public.bump_ai_rollup(text, text, integer, integer, integer, integer, numeric, bigint, bigint, bigint, numeric) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.bump_ai_rollup(text, text, integer, integer, integer, integer, numeric, bigint, bigint, bigint, numeric) TO service_role;

CREATE OR REPLACE FUNCTION public.prune_ai_call_log(_keep_days integer)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE _n integer;
BEGIN
  DELETE FROM public.ai_call_log WHERE created_at < now() - make_interval(days => greatest(_keep_days, 1));
  GET DIAGNOSTICS _n = ROW_COUNT;
  RETURN _n;
END;
$$;
REVOKE ALL ON FUNCTION public.prune_ai_call_log(integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.prune_ai_call_log(integer) TO service_role;

CREATE OR REPLACE FUNCTION public.admin_cost_center()
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  _res jsonb;
begin
  if not public.has_role(auth.uid(), 'admin') then
    raise exception 'Forbidden';
  end if;

  with ep as (
    select endpoint, model,
           sum(calls) filter (where day >= (now() AT TIME ZONE 'UTC')::date - 29)::int as requests_30d,
           sum(calls)::int as requests_total,
           0::int as users_30d,
           sum(failures) filter (where day >= (now() AT TIME ZONE 'UTC')::date - 29)::int as failures_30d,
           sum(denials) filter (where day >= (now() AT TIME ZONE 'UTC')::date - 29)::int as denials_30d,
           sum(cache_hits) filter (where day >= (now() AT TIME ZONE 'UTC')::date - 29)::int as cache_hits_30d,
           coalesce(sum(audio_seconds) filter (where day >= (now() AT TIME ZONE 'UTC')::date - 29), 0) as audio_seconds_30d,
           coalesce(sum(input_tokens) filter (where day >= (now() AT TIME ZONE 'UTC')::date - 29), 0)::bigint as input_tokens_30d,
           coalesce(sum(output_tokens) filter (where day >= (now() AT TIME ZONE 'UTC')::date - 29), 0)::bigint as output_tokens_30d,
           coalesce(sum(characters) filter (where day >= (now() AT TIME ZONE 'UTC')::date - 29), 0)::bigint as characters_30d,
           coalesce(sum(est_cost_usd) filter (where day >= (now() AT TIME ZONE 'UTC')::date - 29), 0) as est_cost_usd_30d,
           coalesce(sum(est_cost_usd), 0) as est_cost_usd_total,
           coalesce(sum(cache_hits), 0)::int as cache_hits_total,
           coalesce(sum(denials), 0)::int as denials_total,
           coalesce(sum(failures), 0)::int as failures_total
    from public.ai_daily_rollup
    group by endpoint, model
  ),
  rec as (
    select count(*)::int as count_total,
           count(*) filter (where created_at >= now() - interval '30 days')::int as count_30d,
           round(coalesce(sum(duration_seconds), 0) / 60.0, 1) as minutes_total,
           round(coalesce(sum(duration_seconds) filter (where created_at >= now() - interval '30 days'), 0) / 60.0, 1) as minutes_30d,
           round(avg(duration_seconds), 1) as avg_seconds
    from public.recordings
  ),
  coach as (
    select count(*)::int as total,
           count(*) filter (where created_at >= now() - interval '30 days')::int as d30
    from public.final_audio_coach_feedback
    where status <> 'pending'
  ),
  attempts as (
    select count(*)::int as total,
           count(*) filter (where first_recording_at >= now() - interval '30 days')::int as d30
    from public.practice_attempts
    where first_recording_at is not null
  ),
  users as (
    select count(*)::int as total,
           (select count(distinct user_id) from public.practice_attempts
             where first_recording_at >= now() - interval '30 days')::int as active_30d
    from auth.users
  )
  select jsonb_build_object(
    'generated_at', now(),
    'endpoints', coalesce((select jsonb_agg(jsonb_build_object(
        'endpoint', ep.endpoint,
        'model', ep.model,
        'requests_30d', ep.requests_30d,
        'requests_total', ep.requests_total,
        'users_30d', ep.users_30d,
        'calls_30d', ep.requests_30d,
        'calls_total', ep.requests_total,
        'failures_30d', ep.failures_30d,
        'failures_total', ep.failures_total,
        'denials_30d', ep.denials_30d,
        'denials_total', ep.denials_total,
        'cache_hits_30d', ep.cache_hits_30d,
        'cache_hits_total', ep.cache_hits_total,
        'audio_seconds_30d', ep.audio_seconds_30d,
        'input_tokens_30d', ep.input_tokens_30d,
        'output_tokens_30d', ep.output_tokens_30d,
        'characters_30d', ep.characters_30d,
        'est_cost_usd_30d', ep.est_cost_usd_30d,
        'est_cost_usd_total', ep.est_cost_usd_total
      ) order by ep.est_cost_usd_30d desc) from ep), '[]'::jsonb),
    'recordings', (select jsonb_build_object(
        'count_30d', count_30d, 'count_total', count_total,
        'minutes_30d', minutes_30d, 'minutes_total', minutes_total,
        'avg_seconds', avg_seconds) from rec),
    'coach', (select jsonb_build_object('analyses_30d', d30, 'analyses_total', total) from coach),
    'attempts', (select jsonb_build_object('sessions_30d', d30, 'sessions_total', total) from attempts),
    'users', (select jsonb_build_object('total', total, 'active_30d', active_30d) from users)
  ) into _res;
  return _res;
end
$function$;

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
    select to_char(day, 'YYYY-MM-DD') as day_key,
           endpoint,
           model,
           sum(calls)::int as requests,
           coalesce(sum(est_cost_usd), 0) as est_cost_usd
    from public.ai_daily_rollup
    where day >= (now() AT TIME ZONE 'UTC')::date - 7
    group by 1, 2, 3
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
          'day_key', day_key, 'endpoint', endpoint, 'model', model,
          'requests', requests, 'est_cost_usd', est_cost_usd) order by day_key desc) from ai_days), '[]'::jsonb),
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