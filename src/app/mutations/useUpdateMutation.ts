import { useMutation, useQueryClient } from "@tanstack/react-query";
import { http } from "../utils/http";
import { useSnackbar } from "../context/SnackbarContext";
import { Collections } from "../interfaces/data/interface";

export default function useUpdateMutation(collection: Collections, queryParams: string) {
  const client = useQueryClient();
  const snackbar = useSnackbar();
  return useMutation({
    mutationFn: async (body: Record<string, any>) => {
      const response = await http.put(`/api/${collection}?${queryParams}`, body);
      return response.data;
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [collection] });
      snackbar.success("Updated successfully");
    },
    onError: ()=>{
      snackbar.error("Failed to update");
    }
  });
}
