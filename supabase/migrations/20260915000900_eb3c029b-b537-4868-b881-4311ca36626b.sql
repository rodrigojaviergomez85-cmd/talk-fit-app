-- SECTION A: billable seconds as stored columns
ALTER TABLE public.ai_call_log ADD COLUMN IF NOT EXISTS billed_audio_seconds numeric(10,3);
ALTER TABLE public.ai_daily_rollup ADD COLUMN IF NOT EXISTS billed_audio_seconds numeric(14,3) NOT NULL DEFAULT 0;

COMMENT ON COLUMN public.ai_call_log.billed_audio_seconds IS
  'audio_seconds is what the learner actually spoke (pedagogical measure); billed_audio_seconds is what the provider charges for (Groq bills a 10s minimum) and is the only input to est_cost_usd. Keeping both makes every stored cost reproducible from the stored units.';
COMMENT ON COLUMN public.ai_daily_rollup.billed_audio_seconds IS
  'audio_seconds is what learners actually spoke (pedagogical measure); billed_audio_seconds is what the provider charges for (Groq bills a 10s minimum) and is the only input to est_cost_usd. Keeping both makes every stored cost reproducible from the stored units.';

-- SECTION C: one atomic write (detail row + rollup bump in a single transaction)
CREATE OR REPLACE FUNCTION public.log_ai_call(
  _id uuid,
  _user_id uuid,
  _endpoint text,
  _provider text,
  _model text,
  _module_id text,
  _day integer,
  _audio_seconds numeric,
  _billed_audio_seconds numeric,
  _input_tokens integer,
  _output_tokens integer,
  _characters integer,
  _ok boolean,
  _error_code text,
  _latency_ms integer,
  _est_cost_usd numeric,
  _cache_hit boolean
) RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _inserted integer := 0;
  _cache boolean := coalesce(_cache_hit, false);
  _is_provider_call boolean;
BEGIN
  IF NOT _cache THEN
    INSERT INTO public.ai_call_log
      (id, user_id, endpoint, provider, model, module_id, day, audio_seconds,
       billed_audio_seconds, input_tokens, output_tokens, characters, ok,
       error_code, latency_ms, est_cost_usd)
    VALUES
      (_id, _user_id, _endpoint, _provider, _model, _module_id, _day, _audio_seconds,
       _billed_audio_seconds, _input_tokens, _output_tokens, _characters, coalesce(_ok, false),
       _error_code, _latency_ms, coalesce(_est_cost_usd, 0))
    ON CONFLICT (id) DO NOTHING;
    GET DIAGNOSTICS _inserted = ROW_COUNT;
    IF _inserted = 0 THEN
      -- Duplicate retry: nothing new to account for.
      RETURN false;
    END IF;
  END IF;

  _is_provider_call := (NOT _cache) AND coalesce(_provider, 'none') <> 'none';

  INSERT INTO public.ai_daily_rollup AS r
    (day, endpoint, model, calls, failures, denials, cache_hits, audio_seconds,
     billed_audio_seconds, input_tokens, output_tokens, characters, est_cost_usd)
  VALUES ((now() AT TIME ZONE 'UTC')::date, _endpoint, coalesce(_model, ''),
     CASE WHEN _is_provider_call THEN 1 ELSE 0 END,
     CASE WHEN (NOT coalesce(_ok, false)) AND coalesce(_provider,'none') <> 'none' AND NOT _cache THEN 1 ELSE 0 END,
     CASE WHEN _error_code = 'quota' THEN 1 ELSE 0 END,
     CASE WHEN _cache THEN 1 ELSE 0 END,
     coalesce(_audio_seconds, 0), coalesce(_billed_audio_seconds, 0),
     coalesce(_input_tokens, 0), coalesce(_output_tokens, 0),
     coalesce(_characters, 0), coalesce(_est_cost_usd, 0))
  ON CONFLICT (day, endpoint, model) DO UPDATE SET
    calls = r.calls + excluded.calls,
    failures = r.failures + excluded.failures,
    denials = r.denials + excluded.denials,
    cache_hits = r.cache_hits + excluded.cache_hits,
    audio_seconds = r.audio_seconds + excluded.audio_seconds,
    billed_audio_seconds = r.billed_audio_seconds + excluded.billed_audio_seconds,
    input_tokens = r.input_tokens + excluded.input_tokens,
    output_tokens = r.output_tokens + excluded.output_tokens,
    characters = r.characters + excluded.characters,
    est_cost_usd = r.est_cost_usd + excluded.est_cost_usd,
    updated_at = now();

  RETURN true;
END;
$$;

REVOKE ALL ON FUNCTION public.log_ai_call(uuid, uuid, text, text, text, text, integer, numeric, numeric, integer, integer, integer, boolean, text, integer, numeric, boolean) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.log_ai_call(uuid, uuid, text, text, text, text, integer, numeric, numeric, integer, integer, integer, boolean, text, integer, numeric, boolean) TO service_role;

-- SECTION E: reconcile the rollup before destroying the detail behind it
CREATE OR REPLACE FUNCTION public.prune_ai_call_log(_keep_days integer)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _n integer;
  _reconciled integer := 0;
  _cutoff timestamptz := now() - make_interval(days => greatest(_keep_days, 1));
  _rec record;
BEGIN
  FOR _rec IN
    SELECT (l.created_at AT TIME ZONE 'UTC')::date AS day,
           l.endpoint,
           coalesce(l.model, '') AS model,
           count(*) AS calls,
           count(*) FILTER (WHERE NOT l.ok) AS failures,
           coalesce(sum(l.audio_seconds), 0) AS audio_seconds,
           coalesce(sum(l.billed_audio_seconds), 0) AS billed_audio_seconds,
           coalesce(sum(l.input_tokens), 0) AS input_tokens,
           coalesce(sum(l.output_tokens), 0) AS output_tokens,
           coalesce(sum(l.characters), 0) AS characters,
           coalesce(sum(l.est_cost_usd), 0) AS est_cost_usd
    FROM public.ai_call_log l
    WHERE l.created_at < _cutoff
    GROUP BY 1, 2, 3
  LOOP
    -- Never lower a rollup value: it legitimately also contains cache hits and
    -- denials with no detail row, so rollup >= detail is expected. Only the
    -- "lower" direction proves a lost write.
    UPDATE public.ai_daily_rollup r
       SET calls = greatest(r.calls, _rec.calls),
           failures = greatest(r.failures, _rec.failures),
           audio_seconds = greatest(r.audio_seconds, _rec.audio_seconds),
           billed_audio_seconds = greatest(r.billed_audio_seconds, _rec.billed_audio_seconds),
           input_tokens = greatest(r.input_tokens, _rec.input_tokens),
           output_tokens = greatest(r.output_tokens, _rec.output_tokens),
           characters = greatest(r.characters, _rec.characters),
           est_cost_usd = _rec.est_cost_usd,
           updated_at = now()
     WHERE r.day = _rec.day AND r.endpoint = _rec.endpoint AND r.model = _rec.model
       AND r.est_cost_usd < _rec.est_cost_usd;
    IF FOUND THEN
      _reconciled := _reconciled + 1;
      RAISE NOTICE 'prune_ai_call_log: raised rollup for day % endpoint %', _rec.day, _rec.endpoint;
    END IF;

    -- A rollup row that never existed at all is also a lost write.
    INSERT INTO public.ai_daily_rollup
      (day, endpoint, model, calls, failures, denials, cache_hits, audio_seconds,
       billed_audio_seconds, input_tokens, output_tokens, characters, est_cost_usd)
    VALUES (_rec.day, _rec.endpoint, _rec.model, _rec.calls, _rec.failures, 0, 0,
            _rec.audio_seconds, _rec.billed_audio_seconds, _rec.input_tokens,
            _rec.output_tokens, _rec.characters, _rec.est_cost_usd)
    ON CONFLICT (day, endpoint, model) DO NOTHING;
  END LOOP;

  DELETE FROM public.ai_call_log WHERE created_at < _cutoff;
  GET DIAGNOSTICS _n = ROW_COUNT;
  RAISE NOTICE 'prune_ai_call_log: deleted % detail rows, reconciled % rollup rows', _n, _reconciled;
  RETURN _n;
END;
$$;

-- SECTION F: ONE-TIME correction of data already collected. Not a reusable
-- function: prices are inlined here only. Short Groq clips were priced on the
-- exact duration instead of the 10-second documented minimum.
DO $onetime$
DECLARE
  _rows integer := 0;
BEGIN
  CREATE TEMP TABLE _groq_fix ON COMMIT DROP AS
  SELECT l.id,
         (l.created_at AT TIME ZONE 'UTC')::date AS day,
         l.endpoint,
         coalesce(l.model, '') AS model,
         l.est_cost_usd AS old_cost,
         greatest(coalesce(l.audio_seconds, 0), 10)::numeric(10,3) AS new_billed,
         CASE WHEN l.ok THEN
           (greatest(coalesce(l.audio_seconds, 0), 10) / 3600.0)
           * CASE l.model WHEN 'whisper-large-v3-turbo' THEN 0.04 WHEN 'whisper-large-v3' THEN 0.111 END
         ELSE 0 END AS new_cost
  FROM public.ai_call_log l
  WHERE l.model IN ('whisper-large-v3-turbo', 'whisper-large-v3');

  UPDATE public.ai_call_log l
     SET billed_audio_seconds = f.new_billed,
         est_cost_usd = f.new_cost
    FROM _groq_fix f
   WHERE l.id = f.id;
  GET DIAGNOSTICS _rows = ROW_COUNT;

  UPDATE public.ai_daily_rollup r
     SET est_cost_usd = greatest(r.est_cost_usd + d.delta, 0),
         billed_audio_seconds = d.billed,
         updated_at = now()
    FROM (
      SELECT day, endpoint, model,
             sum(new_cost - old_cost) AS delta,
             sum(new_billed) AS billed
      FROM _groq_fix GROUP BY 1, 2, 3
    ) d
   WHERE r.day = d.day AND r.endpoint = d.endpoint AND r.model = d.model;

  RAISE NOTICE 'one-time Groq billing correction: % rows corrected', _rows;
END;
$onetime$;