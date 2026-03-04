import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type MutualFund } from "@shared/schema";

export function useMutualFunds() {
  return useQuery<MutualFund[]>({
    queryKey: [api.mutualFunds.list.path],
    queryFn: async () => {
      const res = await fetch(api.mutualFunds.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch mutual funds");
      return res.json();
    },
  });
}
