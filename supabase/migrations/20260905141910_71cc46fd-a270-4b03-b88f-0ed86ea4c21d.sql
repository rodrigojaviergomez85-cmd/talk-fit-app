-- Durable single-flight lease for model-voice generation. One row per clip key.
-- Only trusted server code (service role) can touch it.
CREATE TABLE public.tts_generation_locks (
  clip_key TEXT PRIMARY KEY,
  owner_token TEXT NOT NULL,
  locked_until TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

REVOKE ALL ON public.tts_generation_locks FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.tts_generation_locks TO service_role;
ALTER TABLE public.tts_generation_locks ENABLE ROW LEVEL SECURITY;
-- No policies on purpose: learners never read or write locks.

-- Atomically takes the lease when free or expired. Returns true only for the winner.
CREATE OR REPLACE FUNCTION public.acquire_tts_lock(_clip_key TEXT, _owner TEXT, _lease_seconds INTEGER)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _now TIMESTAMPTZ := now();
  _rows INTEGER;
BEGIN
  INSERT INTO public.tts_generation_locks AS l (clip_key, owner_token, locked_until)
  VALUES (_clip_key, _owner, _now + make_interval(secs => _lease_seconds))
  ON CONFLICT (clip_key) DO UPDATE
    SET owner_token = EXCLUDED.owner_token,
        locked_until = EXCLUDED.locked_until,
        updated_at = _now
    WHERE l.locked_until < _now;
  GET DIAGNOSTICS _rows = ROW_COUNT;
  RETURN _rows > 0;
END;
$$;

-- Releases the lease only if the caller still owns it.
CREATE OR REPLACE FUNCTION public.release_tts_lock(_clip_key TEXT, _owner TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _rows INTEGER;
BEGIN
  DELETE FROM public.tts_generation_locks WHERE clip_key = _clip_key AND owner_token = _owner;
  GET DIAGNOSTICS _rows = ROW_COUNT;
  RETURN _rows > 0;
END;
$$;

REVOKE ALL ON FUNCTION public.acquire_tts_lock(TEXT, TEXT, INTEGER) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.acquire_tts_lock(TEXT, TEXT, INTEGER) TO service_role;
REVOKE ALL ON FUNCTION public.release_tts_lock(TEXT, TEXT) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.release_tts_lock(TEXT, TEXT) TO service_role;