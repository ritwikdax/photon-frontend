import { useMutation, useQueryClient } from "@tanstack/react-query";
import { http } from "../utils/http";
import { useSnackbar } from "../context/SnackbarContext";
import { Collections } from "../interfaces/data/interface";

type UpdateBody = Record<string, any> & { id: string };

export default function useUpdateMutationById(
  collection: Collections,
  onSuccess?: Function
) {
  const client = useQueryClient();
  const snackbar = useSnackbar();
  return useMutation({
    mutationFn: async (body: UpdateBody) => {
      const { id, ...restBody } = body;

      const response = await http.put(`/api/${collection}?id=${id}`, restBody);
      return response.data;
    },
    onSuccess: () => {
      onSuccess && onSuccess();
      client.invalidateQueries({ queryKey: [collection] });
      snackbar.success("Updated successfully");
    },
    onError: (err, newData, context) => {
      snackbar.error("Failed to update");
    },
  });
}
