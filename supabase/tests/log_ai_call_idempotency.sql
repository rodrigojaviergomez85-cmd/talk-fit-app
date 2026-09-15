-- Manual verification of log_ai_call atomicity and idempotency.
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

ROLLBACK;
