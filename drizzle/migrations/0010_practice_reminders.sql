-- Practice reminders: user schedule, push subscriptions and server send log.

CREATE TABLE public.practice_schedules (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  enabled boolean NOT NULL DEFAULT true,
  time_local text NOT NULL,
  days smallint[] NOT NULL DEFAULT '{1,2,3,4,5}',
  timezone text NOT NULL,
  channel text NOT NULL DEFAULT 'push' CHECK (channel IN ('push','email')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.practice_schedules TO authenticated;
GRANT ALL ON public.practice_schedules TO service_role;
ALTER TABLE public.practice_schedules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own schedule select" ON public.practice_schedules
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own schedule insert" ON public.practice_schedules
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own schedule update" ON public.practice_schedules
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own schedule delete" ON public.practice_schedules
  FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "service role schedules" ON public.practice_schedules
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE TRIGGER practice_schedules_set_updated_at
  BEFORE UPDATE ON public.practice_schedules
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.push_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  endpoint text NOT NULL UNIQUE,
  p256dh text NOT NULL,
  auth text NOT NULL,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  failed_at timestamptz
);

CREATE INDEX push_subscriptions_user_id_idx ON public.push_subscriptions(user_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.push_subscriptions TO authenticated;
GRANT ALL ON public.push_subscriptions TO service_role;
ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own push select" ON public.push_subscriptions
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own push insert" ON public.push_subscriptions
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own push update" ON public.push_subscriptions
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own push delete" ON public.push_subscriptions
  FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "service role push" ON public.push_subscriptions
  FOR ALL TO service_role USING (true) WITH CHECK (true);

ALTER TABLE public.user_preferences ADD COLUMN IF NOT EXISTS schedule_prompted_at timestamptz;

CREATE TABLE public.reminder_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  local_date date NOT NULL,
  kind text NOT NULL CHECK (kind IN ('first','second','activation_24h','activation_72h')),
  channel text NOT NULL,
  sent_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, local_date, kind)
);

GRANT ALL ON public.reminder_log TO service_role;
ALTER TABLE public.reminder_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service role reminder log" ON public.reminder_log
  FOR ALL TO service_role USING (true) WITH CHECK (true);
