import { useCallback, useEffect } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { checkSubscription } from "@/lib/subscription.functions";

/**
 * SUBSCRIPTION STATE — the single source of truth for "is this learner Pro".
 *
 * Truth comes from the `subscribers` row, which only the webhook (service role)
 * can write. Never from localStorage or the success URL. `checkSubscription`
 * re-syncs against live Stripe as a safety net for missed webhooks.
 */

export type SubscriptionSnapshot = {
  subscribed: boolean;
  status: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
};

const EMPTY: SubscriptionSnapshot = {
  subscribed: false,
  status: null,
  currentPeriodEnd: null,
  cancelAtPeriodEnd: false,
};

export function subscriptionQueryKey(userId: string | null) {
  return ["subscription", userId ?? "guest"] as const;
}

async function readSubscriberRow(userId: string): Promise<SubscriptionSnapshot> {
  const { data, error } = await supabase
    .from("subscribers")
    .select("subscribed, status, current_period_end, cancel_at_period_end")
    .eq("user_id", userId)
    .maybeSingle();
  if (error || !data) return EMPTY;
  return {
    subscribed: data.subscribed,
    status: data.status,
    currentPeriodEnd: data.current_period_end,
    cancelAtPeriodEnd: data.cancel_at_period_end,
  };
}

export function useSubscription(options?: { syncOnMount?: boolean }) {
  const { user } = useAuth();
  const userId = user?.id ?? null;
  const queryClient = useQueryClient();
  const syncWithStripe = useServerFn(checkSubscription);

  const query = useQuery({
    queryKey: subscriptionQueryKey(userId),
    queryFn: () => (userId ? readSubscriberRow(userId) : Promise.resolve(EMPTY)),
    enabled: Boolean(userId),
    staleTime: 60_000,
  });

  const sync = useMutation({
    mutationFn: async () => syncWithStripe({}),
    onSuccess: (state) => {
      queryClient.setQueryData<SubscriptionSnapshot>(subscriptionQueryKey(userId), {
        subscribed: state.subscribed,
        status: state.status,
        currentPeriodEnd: state.current_period_end,
        cancelAtPeriodEnd: state.cancel_at_period_end,
      });
      // New caps take effect immediately, without a reload.
      void queryClient.invalidateQueries({ queryKey: ["daily-usage"] });
    },
  });

  const refresh = useCallback(async () => {
    if (!userId) return;
    await sync.mutateAsync().catch(() => undefined);
    await queryClient.invalidateQueries({ queryKey: subscriptionQueryKey(userId) });
  }, [queryClient, sync, userId]);

  // Sign-in and account/success views re-check against live Stripe.
  const syncOnMount = options?.syncOnMount ?? false;
  useEffect(() => {
    if (!userId || !syncOnMount) return;
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, syncOnMount]);

  const data = query.data ?? EMPTY;
  return {
    isSubscribed: data.subscribed,
    status: data.status,
    currentPeriodEnd: data.currentPeriodEnd,
    cancelAtPeriodEnd: data.cancelAtPeriodEnd,
    isLoading: query.isLoading || sync.isPending,
    refresh,
  };
}
