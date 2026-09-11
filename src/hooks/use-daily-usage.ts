import { useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useAuth } from "@/lib/auth";
import { localDayKey } from "@/services/practice-attempts";
import { getSectionUsage, listSectionLimits, type SectionUsage } from "@/lib/limits.functions";

/**
 * useDailyUsage(sectionKey) — the ONLY way the UI should learn a section cap.
 *
 * `limit` already includes the Pro x4 multiplier, decided server-side. After
 * consuming a use (or after subscribing) invalidate ["daily-usage"].
 */
export function dailyUsageKey(sectionKey: string, userId: string | null) {
  return ["daily-usage", sectionKey, userId ?? "guest"] as const;
}

export function useDailyUsage(sectionKey: string) {
  const { user } = useAuth();
  const userId = user?.id ?? null;
  const queryClient = useQueryClient();
  const fetchUsage = useServerFn(getSectionUsage);

  const query = useQuery({
    queryKey: dailyUsageKey(sectionKey, userId),
    queryFn: async (): Promise<SectionUsage | null> =>
      fetchUsage({ data: { sectionKey, localDayKey: localDayKey() } }),
    enabled: Boolean(userId),
    staleTime: 15_000,
  });

  const data = query.data ?? null;
  const isPro = data?.isPro ?? false;
  const unlimited = data?.unlimited ?? false;
  const limit = data?.limit ?? 0;
  const used = data?.used ?? 0;

  const refresh = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: dailyUsageKey(sectionKey, userId) });
  }, [queryClient, sectionKey, userId]);

  return {
    label: data?.label ?? "",
    freeLimit: data?.freeLimit ?? 0,
    used,
    limit,
    remaining: Math.max(0, limit - used),
    isPro,
    unlimited,
    isLoading: query.isLoading,
    isAtLimit: !unlimited && limit > 0 && used >= limit,
    refresh,
  };
}

/** Free vs Pro table shown inside the limit dialog. */
export function useSectionLimits() {
  const fetchLimits = useServerFn(listSectionLimits);
  const { user } = useAuth();
  return useQuery({
    queryKey: ["section-limits", user?.id ?? "guest"],
    queryFn: () => fetchLimits({}),
    enabled: Boolean(user?.id),
    staleTime: 10 * 60_000,
  });
}
