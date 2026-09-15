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
           count(*) FILTER (WHERE l.provider <> 'none') AS calls,
           count(*) FILTER (WHERE NOT l.ok AND l.provider <> 'none') AS failures,
           count(*) FILTER (WHERE l.error_code = 'quota') AS denials,
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
           denials = greatest(r.denials, _rec.denials),
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
    VALUES (_rec.day, _rec.endpoint, _rec.model, _rec.calls, _rec.failures, _rec.denials, 0,
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