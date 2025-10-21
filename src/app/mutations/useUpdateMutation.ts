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
    onMutate: async (newData: Record<string, any>) => {
      // Cancel any outgoing refetches to avoid overwriting our optimistic update
      await client.cancelQueries({ queryKey: [collection] });

      // Snapshot the previous value
      const previousData = client.getQueryData([collection]);

      // Optimistically update to the new value
      client.setQueryData([collection], (old: any) => {
        if (Array.isArray(old)) {
          // For array data, update the matching item
          return old.map((item: any) => {
            // Extract ID from queryParams (e.g., "id=123" -> "123")
            const idMatch = queryParams.match(/id=([^&]+)/);
            const targetId = idMatch ? idMatch[1] : null;
            
            if (targetId && item.id?.toString() === targetId) {
              return { ...item, ...newData };
            }
            return item;
          });
        }
        // For single object data
        return { ...old, ...newData };
      });

      // Return a context object with the snapshotted value
      return { previousData };
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [collection] });
      snackbar.success("Updated successfully");
    },
    onError: (err, newData, context) => {
      // Rollback to the previous value on error
      if (context?.previousData) {
        client.setQueryData([collection], context.previousData);
      }
      snackbar.error("Failed to update");
    },
  });
}
