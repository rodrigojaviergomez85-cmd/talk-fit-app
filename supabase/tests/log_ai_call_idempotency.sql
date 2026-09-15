-- Manual verification of log_ai_call atomicity, idempotency, and prune accounting.
-- NOT a migration. Run by hand in the SQL editor as an admin.
-- Cleans up after itself (rolls back at the end).

BEGIN;

DO $outer$
DECLARE
  _id uuid := gen_random_uuid();
  _cache_id uuid := gen_random_uuid();
  _uid uuid := gen_random_uuid();
  _endpoint text := 'test-idempotency-' || _id;
  _today date := (now() AT TIME ZONE 'UTC')::date;
  _first boolean;
  _second boolean;
  _rows integer;
  _calls integer;
  _cache_hits integer;
  _cost numeric;
BEGIN
  _first := public.log_ai_call(_id, _uid, _endpoint, 'groq', 'whisper-large-v3-turbo',
    NULL, NULL, 3, 10, NULL, NULL, NULL, true, NULL, 120, (10/3600.0)*0.04, false);
  _second := public.log_ai_call(_id, _uid, _endpoint, 'groq', 'whisper-large-v3-turbo',
    NULL, NULL, 3, 10, NULL, NULL, NULL, true, NULL, 120, (10/3600.0)*0.04, false);

  IF _first IS NOT TRUE THEN RAISE EXCEPTION 'FAIL: first call did not report new accounting'; END IF;
  IF _second IS NOT FALSE THEN RAISE EXCEPTION 'FAIL: duplicate call did not return false'; END IF;

  SELECT count(*) INTO _rows FROM public.ai_call_log WHERE id = _id;
  IF _rows <> 1 THEN RAISE EXCEPTION 'FAIL: expected 1 detail row, found %', _rows; END IF;

  SELECT calls, cache_hits, est_cost_usd INTO _calls, _cache_hits, _cost
  FROM public.ai_daily_rollup
  WHERE day = _today AND endpoint = _endpoint AND model = 'whisper-large-v3-turbo';

  IF _calls <> 1 THEN RAISE EXCEPTION 'FAIL: rollup counted % calls', _calls; END IF;
  IF _cache_hits <> 0 THEN RAISE EXCEPTION 'FAIL: rollup counted cache hits'; END IF;
  IF round(_cost, 8) <> round((10/3600.0)*0.04, 8) THEN RAISE EXCEPTION 'FAIL: cost double counted: %', _cost; END IF;
  RAISE NOTICE 'OK: duplicate write ignored, rollup counted once';

  -- A cache hit writes no detail row and increments only cache_hits.
  PERFORM public.log_ai_call(_cache_id, _uid, _endpoint, 'none', 'whisper-large-v3-turbo',
    NULL, NULL, NULL, 0, NULL, NULL, NULL, true, NULL, NULL, 0, true);

  SELECT count(*) INTO _rows FROM public.ai_call_log WHERE id = _cache_id;
  IF _rows <> 0 THEN RAISE EXCEPTION 'FAIL: cache hit wrote a detail row'; END IF;

  SELECT calls, cache_hits INTO _calls, _cache_hits
  FROM public.ai_daily_rollup
  WHERE day = _today AND endpoint = _endpoint AND model = 'whisper-large-v3-turbo';
  IF _calls <> 1 OR _cache_hits <> 1 THEN
    RAISE EXCEPTION 'FAIL: cache hit changed calls=% cache_hits=%', _calls, _cache_hits;
  END IF;
  RAISE NOTICE 'OK: cache hit incremented only cache_hits';
END;
$outer$;

-- Prune must count quota denials correctly when it recreates a missing rollup row.
DO $denialprune$
DECLARE
  _id uuid := gen_random_uuid();
  _uid uuid := gen_random_uuid();
  _endpoint text := 'test-denial-prune-' || _id;
  _model text := 'whisper-large-v3-turbo';
  _old_day date := ((now() - interval '2 days') AT TIME ZONE 'UTC')::date;
  _rows integer;
  _calls integer;
  _failures integer;
  _denials integer;
BEGIN
  INSERT INTO public.ai_call_log
    (id, created_at, user_id, endpoint, provider, model, day,
     audio_seconds, billed_audio_seconds, input_tokens, output_tokens, characters,
     ok, error_code, latency_ms, est_cost_usd)
  VALUES
    (gen_random_uuid(), now() - interval '2 days', _uid, _endpoint, 'none', _model, NULL,
     NULL, 0, NULL, NULL, NULL, false, 'quota', NULL, 0),
    (gen_random_uuid(), now() - interval '2 days', _uid, _endpoint, 'none', _model, NULL,
     NULL, 0, NULL, NULL, NULL, false, 'quota', NULL, 0),
    (gen_random_uuid(), now() - interval '2 days', _uid, _endpoint, 'none', _model, NULL,
     NULL, 0, NULL, NULL, NULL, false, 'quota', NULL, 0);

  SELECT count(*) INTO _rows
  FROM public.ai_daily_rollup
  WHERE day = _old_day AND endpoint = _endpoint AND model = _model;
  IF _rows <> 0 THEN RAISE EXCEPTION 'FAIL: rollup row already exists for denial test'; END IF;

  PERFORM public.prune_ai_call_log(1);

  SELECT calls, failures, denials INTO _calls, _failures, _denials
  FROM public.ai_daily_rollup
  WHERE day = _old_day AND endpoint = _endpoint AND model = _model;

  IF _calls IS NULL OR _failures IS NULL OR _denials IS NULL THEN
    RAISE EXCEPTION 'FAIL: rollup row not created after prune';
  END IF;
  IF _calls <> 0 THEN RAISE EXCEPTION 'FAIL: denials counted as calls: %', _calls; END IF;
  IF _failures <> 0 THEN RAISE EXCEPTION 'FAIL: denials counted as failures: %', _failures; END IF;
  IF _denials <> 3 THEN RAISE EXCEPTION 'FAIL: expected 3 denials, found %', _denials; END IF;

  RAISE NOTICE 'OK: prune recreated rollup with calls=0 failures=0 denials=3';
END;
$denialprune$;

ROLLBACK;
