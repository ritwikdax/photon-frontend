import { useQuery } from "@tanstack/react-query";
import { http } from "../utils/http";
import {
  SelectedImage,
} from "../interfaces/data/interface";

export default function useSelectedImages(projectId: string) {
  return useQuery({
    queryKey: ["selectedImages", projectId],
    queryFn: async () => {
      return await fetchSelectedImages(projectId);
    },
    enabled: !!projectId,
  });
}

async function fetchSelectedImages(id: string) {
  const { data } = await http.get<SelectedImage[]>(
    `/api/selectedImages?projectId=${id}`
  );
  return data;
}
