import { useMutation, useQueryClient } from "@tanstack/react-query";
import { http } from "../utils/http";
import { useSnackbar } from "../context/SnackbarContext";
import { useRouter } from "next/navigation";

export default function useAddMuttion(collection: string) {
  const client = useQueryClient();
  const snackbar = useSnackbar();
  const router = useRouter();
  return useMutation({
    mutationFn: async (body: Record<string, any>) => {
      const response = await http.post(`/api/${collection}`, body);
      return response.data;
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [collection] });
      router.back();
      snackbar.success("Added successfully");
    },
    onError: ()=>{
      snackbar.error("Failed to add");
    }
  });
}
