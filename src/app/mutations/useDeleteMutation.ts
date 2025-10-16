import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Collections } from "../interfaces/data/interface";
import { http } from "../utils/http";
import { useSnackbar } from "../context/SnackbarContext";

export function useDeleteMutation(collection: Collections) {
  const client = useQueryClient();
  const snackbar = useSnackbar();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await http.delete(`/api/${collection}?id=${id}`);
      return response.data;
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [collection] });
      snackbar.success("Deleted successfully");
    },
    onError: () => {
      snackbar.error("Failed to delete");
    },
  });
}
