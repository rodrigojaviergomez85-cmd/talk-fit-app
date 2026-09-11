CREATE TABLE IF NOT EXISTS public.job_tokens (
  name TEXT PRIMARY KEY,
  token TEXT NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT ALL ON public.job_tokens TO service_role;

ALTER TABLE public.job_tokens ENABLE ROW LEVEL SECURITY;

-- No policies on purpose: anon/authenticated can never read or write this table.

INSERT INTO public.job_tokens (name) VALUES ('purge-audio')
ON CONFLICT (name) DO NOTHING;