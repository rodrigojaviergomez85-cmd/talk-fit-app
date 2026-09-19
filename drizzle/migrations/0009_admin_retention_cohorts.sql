CREATE OR REPLACE FUNCTION public.admin_retention_cohorts()
RETURNS jsonb
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
declare
  _tz constant text := 'America/El_Salvador';
  _today date;
  _north jsonb;
  _hist jsonb;
  _first jsonb;
  _cohorts jsonb;
begin
  if not public.has_role(auth.uid(), 'admin') then
    raise exception 'Forbidden';
  end if;

  _today := (now() at time zone _tz)::date;

  -- a) North star: 4+ practice days in the last 7, over users active in the last 14.
  with recent as (
    select hp.user_id, hp.practice_date
      from public.habit_practice_days hp
     where hp.practice_date between _today - 13 and _today
  ),
  agg as (
    select user_id,
           count(distinct practice_date) filter (where practice_date >= _today - 6) as d7
      from recent
     group by user_id
  )
  select jsonb_build_object(
           'consistent_users', coalesce(count(*) filter (where d7 >= 4), 0)::int,
           'base_users', coalesce(count(*), 0)::int
         )
    into _north
    from agg;

  with weeks as (
    select (date_trunc('week', _today)::date - (i * 7)) as ws
      from generate_series(1, 8) as i
  ),
  bounds as (
    select ws, ws + 6 as we from weeks
  ),
  per as (
    select b.ws,
           (select count(*)::int from (
              select hp.user_id
                from public.habit_practice_days hp
               where hp.practice_date between b.we - 6 and b.we
               group by hp.user_id
              having count(distinct hp.practice_date) >= 4
            ) x) as consistent_users,
           (select count(distinct hp.user_id)::int
              from public.habit_practice_days hp
             where hp.practice_date between b.we - 13 and b.we) as base_users
      from bounds b
  )
  select jsonb_agg(
           jsonb_build_object(
             'week_start', to_char(ws, 'YYYY-MM-DD'),
             'consistent_users', consistent_users,
             'base_users', base_users
           ) order by ws
         )
    into _hist
    from per;

  _north := _north || jsonb_build_object('history', coalesce(_hist, '[]'::jsonb));

  -- b) First 24 hours, for signups in the last 14 days.
  with su as (
    select u.id, (u.created_at at time zone _tz)::date as sd
      from auth.users u
     where (u.created_at at time zone _tz)::date between _today - 13 and _today
  ),
  act as (
    select su.id,
           su.sd,
           (select min((pa.first_recording_at at time zone _tz)::date)
              from public.practice_attempts pa
             where pa.user_id = su.id and pa.first_recording_at is not null) as fr
      from su
  ),
  j as (
    select a.*,
           exists(select 1 from public.habit_practice_days hp
                   where hp.user_id = a.id and hp.practice_date = a.sd + 1) as d1
      from act a
  )
  select jsonb_build_object(
           'signups', coalesce(count(*), 0)::int,
           'activated', coalesce(count(*) filter (where fr is not null), 0)::int,
           'activated_same_day', coalesce(count(*) filter (where fr = sd), 0)::int,
           'returned_d1', coalesce(count(*) filter (where d1), 0)::int,
           'same_day_returned_d1', coalesce(count(*) filter (where fr = sd and d1), 0)::int
         )
    into _first
    from j;

  -- c) Weekly signup cohorts, windows computed over activated users only.
  with weeks as (
    select (date_trunc('week', _today)::date - (i * 7)) as ws
      from generate_series(0, 7) as i
  ),
  su as (
    select u.id,
           (u.created_at at time zone _tz)::date as sd,
           date_trunc('week', (u.created_at at time zone _tz)::date)::date as ws
      from auth.users u
     where (u.created_at at time zone _tz)::date >= date_trunc('week', _today)::date - 49
  ),
  act as (
    select su.*,
           exists(select 1 from public.practice_attempts pa
                   where pa.user_id = su.id and pa.first_recording_at is not null) as activated
      from su
  ),
  counts as (
    select ws,
           count(*)::int as signups,
           count(*) filter (where activated)::int as activated
      from act
     group by ws
  ),
  w as (
    select a.ws,
           (a.sd + 1 <= _today) as e1,
           exists(select 1 from public.habit_practice_days hp
                   where hp.user_id = a.id and hp.practice_date between a.sd + 1 and a.sd + 1) as r1,
           (a.sd + 3 <= _today) as e2,
           exists(select 1 from public.habit_practice_days hp
                   where hp.user_id = a.id and hp.practice_date between a.sd + 2 and a.sd + 3) as r2,
           (a.sd + 7 <= _today) as e3,
           exists(select 1 from public.habit_practice_days hp
                   where hp.user_id = a.id and hp.practice_date between a.sd + 4 and a.sd + 7) as r3,
           (a.sd + 14 <= _today) as e4,
           exists(select 1 from public.habit_practice_days hp
                   where hp.user_id = a.id and hp.practice_date between a.sd + 8 and a.sd + 14) as r4,
           (a.sd + 30 <= _today) as e5,
           exists(select 1 from public.habit_practice_days hp
                   where hp.user_id = a.id and hp.practice_date between a.sd + 15 and a.sd + 30) as r5
      from act a
     where a.activated
  ),
  wagg as (
    select ws,
           count(*) filter (where e1)::int as el1, count(*) filter (where e1 and r1)::int as rt1,
           count(*) filter (where e2)::int as el2, count(*) filter (where e2 and r2)::int as rt2,
           count(*) filter (where e3)::int as el3, count(*) filter (where e3 and r3)::int as rt3,
           count(*) filter (where e4)::int as el4, count(*) filter (where e4 and r4)::int as rt4,
           count(*) filter (where e5)::int as el5, count(*) filter (where e5 and r5)::int as rt5
      from w
     group by ws
  )
  select jsonb_agg(
           jsonb_build_object(
             'week_start', to_char(weeks.ws, 'YYYY-MM-DD'),
             'signups', coalesce(c.signups, 0),
             'activated', coalesce(c.activated, 0),
             'd1', jsonb_build_object('eligible', coalesce(g.el1, 0),
                   'returned', case when coalesce(g.el1,0) = 0 then null else to_jsonb(g.rt1) end),
             'd2_3', jsonb_build_object('eligible', coalesce(g.el2, 0),
                   'returned', case when coalesce(g.el2,0) = 0 then null else to_jsonb(g.rt2) end),
             'd4_7', jsonb_build_object('eligible', coalesce(g.el3, 0),
                   'returned', case when coalesce(g.el3,0) = 0 then null else to_jsonb(g.rt3) end),
             'd8_14', jsonb_build_object('eligible', coalesce(g.el4, 0),
                   'returned', case when coalesce(g.el4,0) = 0 then null else to_jsonb(g.rt4) end),
             'd15_30', jsonb_build_object('eligible', coalesce(g.el5, 0),
                   'returned', case when coalesce(g.el5,0) = 0 then null else to_jsonb(g.rt5) end)
           ) order by weeks.ws desc
         )
    into _cohorts
    from weeks
    left join counts c on c.ws = weeks.ws
    left join wagg g on g.ws = weeks.ws;

  return jsonb_build_object(
    'generated_at', now(),
    'today', to_char(_today, 'YYYY-MM-DD'),
    'north_star', _north,
    'first_24h', _first,
    'cohorts', coalesce(_cohorts, '[]'::jsonb)
  );
end;
$function$;

REVOKE ALL ON FUNCTION public.admin_retention_cohorts() FROM public;
GRANT EXECUTE ON FUNCTION public.admin_retention_cohorts() TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_retention_cohorts() TO service_role;
