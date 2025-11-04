import { useQuery } from "@tanstack/react-query";
import { http } from "../utils/http";
import { ImageSelectionEntry } from "../interfaces/data/interface";

export default function useImageSelectionsDetails(projectId: string) {
  return useQuery({
    queryKey: ["imageSelections", projectId],
    queryFn: async () => {
      return await fetchImageSelectionDetails(projectId);
    },
    enabled: !!projectId,
  });
}

async function fetchImageSelectionDetails(id: string) {
  const { data } = await http.get<ImageSelectionEntry[]>(`/api/imageSelections?projectId=${id}`);
  return data;
}
