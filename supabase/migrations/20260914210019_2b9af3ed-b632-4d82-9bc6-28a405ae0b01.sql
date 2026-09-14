INSERT INTO public.job_tokens (name) VALUES ('prune-ai-log') ON CONFLICT (name) DO NOTHING;

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

  with ep_users as (
    select endpoint, count(distinct user_id)::int as users_30d
    from public.ai_call_log
    where created_at >= now() - interval '30 days'
      and provider <> 'none'
    group by endpoint
  ),
  ep as (
    select r.endpoint, r.model,
           sum(r.calls) filter (where r.day >= (now() AT TIME ZONE 'UTC')::date - 29)::int as requests_30d,
           sum(r.calls)::int as requests_total,
           coalesce(max(u.users_30d), 0)::int as users_30d,
           sum(r.failures) filter (where r.day >= (now() AT TIME ZONE 'UTC')::date - 29)::int as failures_30d,
           sum(r.denials) filter (where r.day >= (now() AT TIME ZONE 'UTC')::date - 29)::int as denials_30d,
           sum(r.cache_hits) filter (where r.day >= (now() AT TIME ZONE 'UTC')::date - 29)::int as cache_hits_30d,
           coalesce(sum(r.audio_seconds) filter (where r.day >= (now() AT TIME ZONE 'UTC')::date - 29), 0) as audio_seconds_30d,
           coalesce(sum(r.input_tokens) filter (where r.day >= (now() AT TIME ZONE 'UTC')::date - 29), 0)::bigint as input_tokens_30d,
           coalesce(sum(r.output_tokens) filter (where r.day >= (now() AT TIME ZONE 'UTC')::date - 29), 0)::bigint as output_tokens_30d,
           coalesce(sum(r.characters) filter (where r.day >= (now() AT TIME ZONE 'UTC')::date - 29), 0)::bigint as characters_30d,
           coalesce(sum(r.est_cost_usd) filter (where r.day >= (now() AT TIME ZONE 'UTC')::date - 29), 0) as est_cost_usd_30d,
           coalesce(sum(r.est_cost_usd), 0) as est_cost_usd_total,
           coalesce(sum(r.cache_hits), 0)::int as cache_hits_total,
           coalesce(sum(r.denials), 0)::int as denials_total,
           coalesce(sum(r.failures), 0)::int as failures_total
    from public.ai_daily_rollup r
    left join ep_users u on u.endpoint = r.endpoint
    group by r.endpoint, r.model
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