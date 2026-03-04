import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type Stock } from "@shared/schema";

export function useStocks() {
  return useQuery<Stock[]>({
    queryKey: [api.stocks.list.path],
    queryFn: async () => {
      const res = await fetch(api.stocks.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch stocks");
      return res.json();
    },
  });
}
