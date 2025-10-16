import { useMutation, useQueryClient } from "@tanstack/react-query";
import { http } from "../utils/http";
import { useSnackbar } from "../context/SnackbarContext";

export default function useAddMuttion(collection: string) {
  const client = useQueryClient();
  const snackbar = useSnackbar();
  return useMutation({
    mutationFn: async (body: Record<string, any>) => {
      const response = await http.post(`/api/${collection}`, body);
      return response.data;
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [collection] });
      snackbar.success("Added successfully");
    },
    onError: ()=>{
      snackbar.error("Failed to add");
    }
  });
}
