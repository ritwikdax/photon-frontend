import { useQuery } from "@tanstack/react-query";
import { Deliverable } from "../../interfaces/data/interface";
import useGenericQueries from "../useGenericQueries";

export function useDeliverableLookupMap() {
  const { data } = useGenericQueries<Deliverable[]>("deliverables");
  return useQuery({
    queryKey: ["deliverableLookup"],
    queryFn: () => {
      return new Map(data?.map((deliverable) => [deliverable.id, deliverable]));
    },
    enabled: data !== undefined,
  });
}
