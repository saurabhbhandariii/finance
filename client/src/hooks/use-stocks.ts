import { useQuery, useMutation } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { type Stock } from "@shared/schema";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "./use-toast";

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

export function useBuyStock() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({ id, quantity }: { id: number; quantity: number }) => {
      const res = await apiRequest("POST", buildUrl(api.stocks.buy.path, { id }), { quantity });
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [api.auth.me.path] });
      toast({ title: "Success", description: data.message });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });
}

export function useSellStock() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({ id, quantity }: { id: number; quantity: number }) => {
      const res = await apiRequest("POST", buildUrl(api.stocks.sell.path, { id }), { quantity });
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [api.auth.me.path] });
      toast({ title: "Success", description: data.message });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });
}
