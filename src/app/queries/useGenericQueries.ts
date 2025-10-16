import { useQuery } from "@tanstack/react-query";
import { http } from "../utils/http";
import { Collections } from "../interfaces/data/interface";


export default function useGenericQueries<T>(
  collection: Collections,
  queryParams?: string
) {
  return useQuery({
    queryKey: queryParams ? [collection, queryParams] : [collection],
    queryFn: async () => {
      return await fetchData<T>(collection, queryParams);
    },
    enabled: !!collection,
  });
}

async function fetchData<T>(
  collection: Collections,
  queryParams?: string
): Promise<T> {
  const url = queryParams
    ? `/api/${collection}?${queryParams}`
    : `/api/${collection}`;
  const { data } = await http.get<T>(url);
  return data;
}
