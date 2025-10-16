import useGenericQueries from "./useGenericQueries";
import { ProjectDeliverable } from "../interfaces/data/interface";
import { useDeliverableLookupMap } from "./lookup/useDeliverableLookup";

export function useProjectDeliverables(
  projectId: string
): ProjectDeliverable[] | undefined {
  const { data: projectDeliverables } = useGenericQueries<ProjectDeliverable[]>(
    "projectDeliverables",
    `projectId=${projectId}`
  );
  const { data: map } = useDeliverableLookupMap();

  return projectDeliverables?.map((pd) => {
    const d = map?.get(pd.deliverableId);

    return {
      ...pd,
      displayName: d?.displayName || "Unknown Deliverable",
      type: d?.type || "other",
      additionalDetails: d?.additionalDetails || "",
      updateTemplates: d?.updateTemplates || [],
      deliveryTime: d?.deliveryTime || 0,
      assetType: d?.assetType || "digital",
    };
  });
}
