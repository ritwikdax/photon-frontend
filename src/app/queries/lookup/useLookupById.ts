import { useQuery } from "@tanstack/react-query";
import { Collections, Entity } from "../../interfaces/data/interface";
import useGenericQueries from "../useGenericQueries";

export function useLookupById<T extends Entity>(
  id: string,
  collection: Collections
) {
  const { data } = useGenericQueries<T[]>(collection);
  return useQuery({
    queryKey: ["lookup", collection, id],
    queryFn: () => {
      return new Map(data?.map((item) => [item.id, item]));
    },
    enabled: data !== undefined && !!id && !!collection,
  });
}
