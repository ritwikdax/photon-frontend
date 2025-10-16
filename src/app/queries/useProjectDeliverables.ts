import { useQuery } from "@tanstack/react-query";
import useGenericQueries from "./useGenericQueries";
import { ProjectDeliverable } from "../interfaces/data/interface";
import { useDeliverableLookupMap } from "./lookup/useDeliverableLookup";

export function useProjectDeliverables(projectId?: string) {
//   const { data } = useGenericQueries<ProjectDeliverable[]>(
//     "projectDeliverables",
//     `projectId=${projectId}`
//   );
  const {data: map} = useDeliverableLookupMap();
  console.log(map);
}
