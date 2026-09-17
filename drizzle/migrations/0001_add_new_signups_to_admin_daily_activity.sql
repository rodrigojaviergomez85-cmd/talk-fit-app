CREATE OR REPLACE FUNCTION public.admin_daily_activity(_from date, _to date)
RETURNS jsonb
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
declare
  _res jsonb;
  _tz constant text := 'America/El_Salvador';
begin
  if not public.has_role(auth.uid(), 'admin') then
    raise exception 'Forbidden';
  end if;

  if _to < _from then
    raise exception 'Invalid range';
  end if;

  if (_to - _from) > 400 then
    raise exception 'Range too large';
  end if;

  with events as (
    select pa.local_day_key::date as d, pa.user_id, 'practice'::text as src, 1 as n
      from public.practice_attempts pa
     where pa.completed_at is not null
       and pa.module_id not like 'review-%'
       and pa.local_day_key::date between _from and _to
    union all
    select pa.local_day_key::date, pa.user_id, 'review', 1
      from public.practice_attempts pa
     where pa.completed_at is not null
       and pa.module_id like 'review-%'
       and pa.local_day_key::date between _from and _to
    union all
    select ia.local_day_key::date, ia.user_id, 'interview', 1
      from public.interview_attempts ia
     where ia.completed_at is not null
       and ia.local_day_key::date between _from and _to
    union all
    select v.d, v.user_id, 'story', 1
      from (
        select distinct sev.user_id, ((sev.first_opened_at at time zone _tz)::date) as d
          from public.story_episode_views sev
        union
        select distinct sev.user_id, ((sev.last_opened_at at time zone _tz)::date) as d
          from public.story_episode_views sev
      ) v
     where v.d between _from and _to
    union all
    select acu.period_key::date, acu.user_id, 'coach', acu.used
      from public.ai_coach_usage acu
     where acu.period_type = 'day'
       and acu.period_key ~ '^\d{4}-\d{2}-\d{2}$'
       and acu.period_key::date between _from and _to
  ),
  registrations as (
    select (u.created_at at time zone _tz)::date as d, count(*)::int as n
      from auth.users u
     where (u.created_at at time zone _tz)::date between _from and _to
     group by 1
  ),
  days as (
    select gs::date as d from generate_series(_from, _to, interval '1 day') gs
  )
  select coalesce(jsonb_agg(
           jsonb_build_object(
             'day', to_char(days.d, 'YYYY-MM-DD'),
             'active_users', (select count(distinct e.user_id) from events e where e.d = days.d)::int,
             'new_users', coalesce((select r.n from registrations r where r.d = days.d), 0),
             'practice', jsonb_build_object(
               'users', (select count(distinct e.user_id) from events e where e.d = days.d and e.src = 'practice')::int,
               'count', (select coalesce(sum(e.n),0) from events e where e.d = days.d and e.src = 'practice')::int
             ),
             'story', jsonb_build_object(
               'users', (select count(distinct e.user_id) from events e where e.d = days.d and e.src = 'story')::int,
               'count', (select coalesce(sum(e.n),0) from events e where e.d = days.d and e.src = 'story')::int
             ),
             'interview', jsonb_build_object(
               'users', (select count(distinct e.user_id) from events e where e.d = days.d and e.src = 'interview')::int,
               'count', (select coalesce(sum(e.n),0) from events e where e.d = days.d and e.src = 'interview')::int
             ),
             'review', jsonb_build_object(
               'users', (select count(distinct e.user_id) from events e where e.d = days.d and e.src = 'review')::int,
               'count', (select coalesce(sum(e.n),0) from events e where e.d = days.d and e.src = 'review')::int
             ),
             'coach', jsonb_build_object(
               'users', (select count(distinct e.user_id) from events e where e.d = days.d and e.src = 'coach')::int,
               'count', (select coalesce(sum(e.n),0) from events e where e.d = days.d and e.src = 'coach')::int
             )
           ) order by days.d
         ), '[]'::jsonb)
    into _res
    from days;

  return jsonb_build_object('generated_at', now(), 'from', to_char(_from,'YYYY-MM-DD'), 'to', to_char(_to,'YYYY-MM-DD'), 'days', _res);
end;
$function$;

REVOKE ALL ON FUNCTION public.admin_daily_activity(date, date) FROM public;
GRANT EXECUTE ON FUNCTION public.admin_daily_activity(date, date) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_daily_activity(date, date) TO service_role;