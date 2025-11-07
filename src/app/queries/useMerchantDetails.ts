import { useQuery } from "@tanstack/react-query";
import { http } from "../utils/http";
import { MerchantDetails } from "../interfaces/data/interface";

export function useMerchantDetails() {
  return useQuery({
    queryKey: ["merchantDetails"],
    queryFn: async () => {
      return await fetchMerchantDetails();
    },
  });
}

async function fetchMerchantDetails() {
  const { data } = await http.get<MerchantDetails>("/api/merchantDetails");
  return data;
}
